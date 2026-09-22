document.addEventListener("DOMContentLoaded", function() {
const CATEGORIAS = ['comida', 'transporte', 'servicios', 'ocio', 'otros'];
let gastos = [];
let filtro = 'todas';
let busqueda = '';
let editandoId = null;
let desde = '';
let hasta = '';
let orden = { campo: 'fecha', direccion: -1 };
let presupuestos = JSON.parse(localStorage.getItem('gestor-presupuestos-v1') || '{}');
let borradoPendiente = null;
//   accion del usuario  ->  modifica el ESTADO  ->  llama a render()
//                                                      |
//                                          render() LEE el estado
//                                          y dibuja la pantalla

const form = document.getElementById('form');
const inputDescripcion = document.getElementById('descripcion');
const inputMonto = document.getElementById('monto');
const inputCategoria = document.getElementById('categoria');
const inputFecha = document.getElementById('fecha');
const inputBusqueda = document.getElementById('busqueda');
const selectFiltro = document.getElementById('filtroCategoria');
const lista = document.getElementById('lista');
const pError = document.getElementById('error');
const pVacio = document.getElementById('vacio');
const tituloForm = document.getElementById('tituloForm');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');

const controlesExtra = document.createElement('div');
controlesExtra.innerHTML = '<label>Desde <input type="date" id="fechaDesde"></label> <label>Hasta <input type="date" id="fechaHasta"></label> <button type="button" id="btnCsv">Exportar CSV</button>';
selectFiltro.parentNode.appendChild(controlesExtra);
const inputDesde = controlesExtra.querySelector('#fechaDesde');
const inputHasta = controlesExtra.querySelector('#fechaHasta');
const btnCsv = controlesExtra.querySelector('#btnCsv');
const avisoDeshacer = document.createElement('div');
document.body.appendChild(avisoDeshacer);
const controlesPresupuesto = document.createElement('div');
controlesPresupuesto.innerHTML = '<strong>Presupuesto mensual</strong> ' + CATEGORIAS.map(function (cat) { return '<label>' + cat + ': <input type="number" min="0" data-presupuesto="' + cat + '" placeholder="sin tope"></label>'; }).join(' ');
document.getElementById('porCategoria').parentNode.appendChild(controlesPresupuesto);

function formatearPesos(numero) {
  return '$ ' + numero.toLocaleString('es-AR', { minimumFractionDigits: 2 });
}

function formatearFecha(texto) {
  const partes = texto.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}
function gastosVisibles() {
  return gastos
    .filter(function (g) {
      return filtro === 'todas' || g.categoria === filtro;
    })
    .filter(function (g) {
      return g.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    })
    .filter(function (g) {
      return (!desde || g.fecha >= desde) && (!hasta || g.fecha <= hasta);
    })
    .sort(function (a, b) {
      const resultado = orden.campo === 'monto'
        ? a.monto - b.monto
        : String(a[orden.campo]).localeCompare(String(b[orden.campo]));
      return resultado * orden.direccion;
    });
}
function renderTabla() {
  const visibles = gastosVisibles();
  lista.innerHTML = '';

  visibles.forEach(function (g) {
    const fila = document.createElement('tr');

    fila.innerHTML =
      '<td>' + formatearFecha(g.fecha) + '</td>' +
      '<td>' + g.descripcion + '</td>' +
      '<td><span class="pastilla">' + g.categoria + '</span></td>' +
      '<td class="der">' + formatearPesos(g.monto) + '</td>' +
      '<td><div class="acciones-fila">' +
        '<button class="mini" data-accion="editar" data-id="' + g.id + '">Editar</button>' +
        '<button class="mini" data-accion="borrar" data-id="' + g.id + '">Borrar</button>' +
      '</div></td>';

    lista.appendChild(fila);
  });

  const encabezados = lista.closest('table').querySelectorAll('thead th');
  encabezados.forEach(function (th, indice) {
    if (indice > 3) return;
    const campo = ['fecha', 'descripcion', 'categoria', 'monto'][indice];
    th.style.cursor = 'pointer';
    th.textContent = th.textContent.replace(/ [▲▼]$/, '') + (orden.campo === campo ? (orden.direccion === 1 ? ' ▲' : ' ▼') : '');
  });

  pVacio.classList.toggle('oculto', visibles.length > 0);
}
function renderTotales() {
  const visibles = gastosVisibles();

  const total = visibles.reduce(function (suma, g) {
    return suma + g.monto;
  }, 0);

  document.getElementById('total').textContent = formatearPesos(total);
  document.getElementById('cantidad').textContent = visibles.length;
  document.getElementById('promedio').textContent =
    formatearPesos(visibles.length ? total / visibles.length : 0);

  const porCat = visibles.reduce(function (acum, g) {
    acum[g.categoria] = (acum[g.categoria] || 0) + g.monto;
    return acum;
  }, {});

  const contenedor = document.getElementById('porCategoria');
  contenedor.innerHTML = '';

  CATEGORIAS.forEach(function (cat) {
    const monto = porCat[cat] || 0;
    if (monto === 0) return;

    const porcentaje = (monto / total) * 100;
    const linea = document.createElement('div');
    const tope = Number(presupuestos[cat] || 0);
    const excedido = tope > 0 && monto > tope;
    if (excedido) linea.style.color = 'red';
    linea.classList.add('linea-cat');
    linea.innerHTML =
      '<span class="nombre">' + cat + '</span>' +
      '<span class="pista"><span class="relleno" style="width:' + porcentaje + '%"></span></span>' +
      '<span>' + formatearPesos(monto) + (excedido ? ' (exceso ' + Math.round((monto / tope - 1) * 100) + '%)' : '') + '</span>';

    contenedor.appendChild(linea);
  });
}

function render() {
  renderTabla();
  renderTotales();
  guardar();
}

function validar(datos) {
  if (datos.descripcion.length < 2) {
    return 'La descripción debe tener al menos 2 caracteres.';
  }

  if (isNaN(datos.monto) || datos.monto <= 0) {
    return 'El monto tiene que ser un número mayor a cero.';
  }

  if (datos.monto > 100000000) {
    return 'Ese monto parece un error. Revisalo.';
  }

  const hoy = new Date().toISOString().slice(0, 10);
  if (datos.fecha > hoy) {
    return 'No se pueden cargar gastos con fecha futura.';
  }

  return '';
}

form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const datos = {
    descripcion: inputDescripcion.value.trim(),
    monto: parseFloat(inputMonto.value),
    categoria: inputCategoria.value,
    fecha: inputFecha.value
  };

  const problema = validar(datos);
  if (problema !== '') {
    pError.textContent = problema;
    return;
  }

  pError.textContent = '';

  if (editandoId === null) {
    datos.id = Date.now();
    gastos.push(datos);
  } else {
    const gasto = gastos.find(function (g) {
      return g.id === editandoId;
    });
    gasto.descripcion = datos.descripcion;
    gasto.monto = datos.monto;
    gasto.categoria = datos.categoria;
    gasto.fecha = datos.fecha;
  }

  salirDeEdicion();
  render();
});

lista.addEventListener('click', function (evento) {
  const boton = evento.target.closest('[data-accion]');
  if (!boton) return;

  const id = Number(boton.dataset.id);

  if (boton.dataset.accion === 'borrar') {
    if (!confirm('¿Seguro que querés borrar este gasto?')) return;
    borradoPendiente = gastos.find(function (g) { return g.id === id; });
    gastos = gastos.filter(function (g) {
      return g.id !== id;
    });
    if (editandoId === id) salirDeEdicion();
    render();
    avisoDeshacer.innerHTML = 'Gasto eliminado. <button type="button">Deshacer</button>';
    const temporizador = setTimeout(function () { borradoPendiente = null; avisoDeshacer.textContent = ''; }, 5000);
    avisoDeshacer.querySelector('button').addEventListener('click', function () {
      clearTimeout(temporizador);
      if (borradoPendiente) gastos.push(borradoPendiente);
      borradoPendiente = null;
      avisoDeshacer.textContent = '';
      render();
    });
  }

  if (boton.dataset.accion === 'editar') {
    const gasto = gastos.find(function (g) {
      return g.id === id;
    });
    inputDescripcion.value = gasto.descripcion;
    inputMonto.value = gasto.monto;
    inputCategoria.value = gasto.categoria;
    inputFecha.value = gasto.fecha;

    editandoId = id;
    tituloForm.textContent = 'Editando gasto';
    btnGuardar.textContent = 'Guardar cambios';
    btnCancelar.classList.remove('oculto');
    inputDescripcion.focus();
  }
});

function salirDeEdicion() {
  editandoId = null;
  form.reset();
  inputFecha.value = new Date().toISOString().slice(0, 10);
  tituloForm.textContent = 'Nuevo gasto';
  btnGuardar.textContent = 'Agregar gasto';
  btnCancelar.classList.add('oculto');
  pError.textContent = '';
}

btnCancelar.addEventListener('click', salirDeEdicion);

inputBusqueda.addEventListener('input', function () {
  busqueda = inputBusqueda.value;
  render();
});

selectFiltro.addEventListener('change', function () {
  filtro = selectFiltro.value;
  render();
});

inputDesde.addEventListener('change', function () { desde = inputDesde.value; render(); });
inputHasta.addEventListener('change', function () { hasta = inputHasta.value; render(); });
controlesPresupuesto.addEventListener('change', function (evento) {
  const campo = evento.target;
  if (!campo.dataset.presupuesto) return;
  presupuestos[campo.dataset.presupuesto] = campo.value;
  localStorage.setItem('gestor-presupuestos-v1', JSON.stringify(presupuestos));
  render();
});
btnCsv.addEventListener('click', function () {
  const filas = [['Fecha', 'Descripción', 'Categoría', 'Monto']].concat(gastosVisibles().map(function (g) { return [g.fecha, g.descripcion, g.categoria, g.monto]; }));
  const csv = filas.map(function (fila) { return fila.map(function (valor) { return '"' + String(valor).replace(/"/g, '""') + '"'; }).join(';'); }).join('\r\n');
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
  enlace.download = 'gastos.csv';
  enlace.click();
  URL.revokeObjectURL(enlace.href);
});
lista.closest('table').querySelector('thead').addEventListener('click', function (evento) {
  const th = evento.target.closest('th');
  if (!th) return;
  const indice = Array.from(th.parentNode.children).indexOf(th);
  if (indice > 3) return;
  const campo = ['fecha', 'descripcion', 'categoria', 'monto'][indice];
  orden = { campo: campo, direccion: orden.campo === campo ? -orden.direccion : 1 };
  render();
});

const CLAVE = 'gestor-gastos-v1';

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(gastos));
  } catch (error) {
    console.error('No se pudieron guardar los datos:', error);
  }
}

function cargar() {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (texto === null) return [];

    const datos = JSON.parse(texto);
    if (!Array.isArray(datos)) return [];

    return datos;
  } catch (error) {
    console.error('Datos corruptos, empezando de cero:', error);
    return [];
  }
}

function iniciar() {
  gastos = cargar();
  inputFecha.value = new Date().toISOString().slice(0, 10);
  render();
}

iniciar();
});

