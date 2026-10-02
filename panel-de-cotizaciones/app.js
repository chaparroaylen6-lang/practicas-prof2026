
const API = 'https://dolarapi.com/v1/dolares';
const API_HISTORICO = 'https://api.argentinadatos.com/v1/cotizaciones/dolares/blue/';

const NOMBRES = {
  oficial: 'Oficial', blue: 'Blue', bolsa: 'MEP', contadoconliqui: 'CCL', mayorista: 'Mayorista', tarjeta: 'Tarjeta', cripto: 'Cripto'
};

let cotizaciones = [];


const seccionCargando = document.getElementById('cargando');
const seccionError = document.getElementById('error');
const seccionDatos = document.getElementById('datos');
const mensajeError = document.getElementById('mensajeError');
const grilla = document.getElementById('grilla');
const pActualizado = document.getElementById('actualizado');
const avisoCache = document.getElementById('avisoCache');
const btnActualizar = document.getElementById('btnActualizar');


async function pedirCotizaciones(intentos = 0) {
  const controlador = new AbortController();
  const reloj = setTimeout(() => controlador.abort(), 8000);

  try {
    const respuesta = await fetch(API, { signal: controlador.signal });
    if (!respuesta.ok) throw new Error('El servidor respondió ' + respuesta.status);
    const datos = await respuesta.json();
    if (!Array.isArray(datos) || datos.length === 0) throw new Error('Formato inesperado');
    return datos;
  } catch (error) {
    if (intentos < 3) {
      const espera = Math.pow(2, intentos + 1) * 1000; 
      console.warn(`Fallo en el intento ${intentos + 1}. Reintentando en ${espera/1000} segundos...`);
      await new Promise(resolve => setTimeout(resolve, espera));
      return pedirCotizaciones(intentos + 1); 
    }
    throw error; 
  } finally {
    clearTimeout(reloj);
  }
}


function pesos(n) {
  return '$ ' + n.toLocaleString('es-AR', { minimumFractionDigits: 2 });
}


function render() {
  const oficial = cotizaciones.find(c => c.casa === 'oficial');
  const cotizacionesOrdenadas = [...cotizaciones]
    .filter(c => c.venta > 0)
    .sort((a, b) => a.venta - b.venta);

  grilla.innerHTML = '';

  cotizacionesOrdenadas.forEach((c, index) => {
    const brecha = oficial && c.venta ? ((c.venta - oficial.venta) / oficial.venta) * 100 : 0;
    const claseBrecha = brecha > 0 ? 'sube' : 'baja';

    const tarjeta = document.createElement('article');
    tarjeta.classList.add('tarjeta', 'cotizacion');

    if (index === 0) tarjeta.classList.add('mas-barato');
    if (index === cotizacionesOrdenadas.length - 1) tarjeta.classList.add('mas-caro');

    tarjeta.innerHTML =
      `<h3>${NOMBRES[c.casa] || c.nombre}</h3>
      <div class="valores">
        <div class="valor"><span class="etiqueta">Compra</span><strong>${pesos(c.compra)}</strong></div>
        <div class="valor"><span class="etiqueta">Venta</span><strong>${pesos(c.venta)}</strong></div>
      </div>
      <p class="brecha">Brecha vs oficial: <span class="${claseBrecha}">${brecha.toFixed(1)}%</span></p>`;

    grilla.appendChild(tarjeta);
  });
}


async function cargarGrafico() {
  const contenedor = document.getElementById('contenedorGrafico');
  try {
    const res = await fetch(API_HISTORICO);
    if (!res.ok) throw new Error();
    const data = await res.json();
    
    const ultimos30 = data.slice(-30);
    const puntos = ultimos30.map(d => d.venta);
    const max = Math.max(...puntos);
    const min = Math.min(...puntos);
    const rango = max - min || 1; 

 
    const puntosSVG = puntos.map((precio, i) => {
        let x = (i / (puntos.length - 1)) * 100;
        let y = 50 - ((precio - min) / rango) * 50;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

    contenedor.innerHTML = `
      <svg viewBox="-2 -2 104 54" class="svg-grafico">
          <polyline fill="none" stroke="var(--acento)" stroke-width="2" points="${puntosSVG}" />
      </svg>
      <div style="display:flex; justify-content:space-between; font-size: 0.7rem; color: var(--apagado); margin-top: 5px;">
          <span>${new Date(ultimos30[0].fecha).toLocaleDateString('es-AR')}</span>
          <span>Hoy</span>
      </div>`;
  } catch (error) {
    contenedor.innerHTML = '<p style="color: var(--apagado); font-size: 0.85rem;">No se pudo cargar el historial.</p>';
  }
}

function mostrarEstado(estado) {
  seccionCargando.classList.toggle('oculto', estado !== 'cargando');
  seccionError.classList.toggle('oculto', estado !== 'error');
  seccionDatos.classList.toggle('oculto', estado !== 'datos');
}

function traducirError(error) {
  if (error.name === 'AbortError') return 'El servidor tardó demasiado en responder.';
  if (error.message.includes('Failed to fetch')) return 'No hay conexión a internet.';
  return 'Ocurrió un error inesperado: ' + error.message;
}

async function actualizar() {
  btnActualizar.disabled = true;

  const cacheGuardado = localStorage.getItem('cotizaciones_cache');
  const tiempoCache = localStorage.getItem('cotizaciones_tiempo');
  
  if (cacheGuardado && tiempoCache) {
      cotizaciones = JSON.parse(cacheGuardado);
      render();
      llenarSelectorConversor();
      
      const minutos = Math.floor((Date.now() - parseInt(tiempoCache)) / 60000);
      avisoCache.textContent = `(Datos guardados hace ${minutos} min)`;
      mostrarEstado('datos');
  
      if (minutos < 1) {
          btnActualizar.disabled = false;
          cargarGrafico();
          return; 
      }
  } else {
      mostrarEstado('cargando');
  }

  try {
    cotizaciones = await pedirCotizaciones(0);
    
    localStorage.setItem('cotizaciones_cache', JSON.stringify(cotizaciones));
    localStorage.setItem('cotizaciones_tiempo', Date.now().toString());

    render();
    llenarSelectorConversor();
    cargarGrafico(); 
    
    avisoCache.textContent = ''; 
    pActualizado.innerHTML = `Actualizado a las ${new Date().toLocaleTimeString('es-AR')} <span id="avisoCache"></span>`;
    
    mostrarEstado('datos');
  } catch (error) {
    console.error(error);
    if (!cacheGuardado) { 
        mensajeError.textContent = traducirError(error);
        mostrarEstado('error');
    } else {
        avisoCache.textContent += ' (Fallo al buscar datos nuevos)';
    }
  } finally {
    btnActualizar.disabled = false;
  }
}

const inputPesos = document.getElementById('pesos');
const inputDolares = document.getElementById('dolares');
const selectCasa = document.getElementById('casaConversor');

function llenarSelectorConversor() {
  const elegida = selectCasa.value;
  selectCasa.innerHTML = '';
  cotizaciones.forEach(c => {
    if(c.venta > 0) { // Solo agregar si tiene precio válido
        const opcion = document.createElement('option');
        opcion.value = c.casa;
        opcion.textContent = NOMBRES[c.casa] || c.nombre;
        selectCasa.appendChild(opcion);
    }
  });
  if (elegida && selectCasa.querySelector(`option[value="${elegida}"]`)) {
      selectCasa.value = elegida;
  }
  convertirDesdePesos();
}

function obtenerCotizacionElegida() {
    const casa = selectCasa.value;
    return cotizaciones.find(c => c.casa === casa);
}

function convertirDesdePesos() {
  const pesos = parseFloat(inputPesos.value);
  const cotizacion = obtenerCotizacionElegida();

  if (isNaN(pesos) || !cotizacion || !cotizacion.venta) {
    inputDolares.value = '';
    return;
  }
  inputDolares.value = (pesos / cotizacion.venta).toFixed(2);
}

function convertirDesdeDolares() {
  const dolares = parseFloat(inputDolares.value);
  const cotizacion = obtenerCotizacionElegida();

  if (isNaN(dolares) || !cotizacion || !cotizacion.venta) {
    inputPesos.value = '';
    return;
  }
  inputPesos.value = (dolares * cotizacion.venta).toFixed(2);
}


inputPesos.addEventListener('input', convertirDesdePesos);
inputDolares.addEventListener('input', convertirDesdeDolares);
selectCasa.addEventListener('change', convertirDesdePesos);


btnActualizar.addEventListener('click', actualizar);
document.getElementById('btnReintentar').addEventListener('click', actualizar);

setInterval(actualizar, 5 * 60 * 1000);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) actualizar();
});

actualizar();