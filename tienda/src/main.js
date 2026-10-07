import './estilos.css';
import { Cabecera } from './componentes/cabecera.js';
import { Catalogo } from './vistas/catalogo.js';
import { Detalle } from './vistas/detalle.js';
import { Carrito } from './vistas/carrito.js';
import {
  suscribir, recuperarCarrito, alternarFavorito, aplicarCupon,
  cargarCatalogoAPI
} from './estado.js';

const contenido = document.getElementById('contenido');
const cabecera = document.getElementById('cabecera');

let toast = document.getElementById('toast');
if (!toast) {
  toast = document
  .createElement('div');
  toast.id = 'toast';
  toast.className = 'toast oculto';
  toast.textContent = 'Producto agregado';
  document.body.appendChild(toast);
}

function vistaActual() {
  const ruta = location.hash.slice(1) || '/';

  if (ruta === '/carrito') return Carrito();

  if (ruta.startsWith('/producto/')) {
    const id = ruta.split('/')[2];
    return Detalle(id);
  }

  return Catalogo();
}

function render() {
  cabecera.innerHTML = Cabecera();
  contenido.innerHTML = vistaActual();
}

window.addEventListener('hashchange', render);
suscribir(render);

// 4.4 Conectar los eventos y arrancar
import {
  agregarAlCarrito, cambiarCantidad, quitarDelCarrito,
  vaciarCarrito, cambiarFiltro, cambiarBusqueda, cambiarOrden
} from './estado.js';

document.addEventListener('click', function (evento) {
  const elemento = evento.target.closest('[data-accion]');
  if (!elemento) return;

  const id = elemento.dataset.id;
  const accion = elemento.dataset.accion;

  if (accion === 'agregar') {
    agregarAlCarrito(id);
    toast.classList.remove('oculto');
    setTimeout(() => toast.classList.add('oculto'), 2000);
  }
  if (accion === 'sumar') cambiarCantidad(id, 1);
  if (accion === 'restar') cambiarCantidad(id, -1);
  if (accion === 'quitar') quitarDelCarrito(id);
  if (accion === 'vaciar') vaciarCarrito();
  if (accion === 'filtrar') cambiarFiltro(elemento.dataset.cat);
  if (accion === 'favorito') alternarFavorito(id);
  if (accion === 'cupon') {
    const campoCupon = document.getElementById('input-cupon');
    if (campoCupon) aplicarCupon(campoCupon.value);
  }

  if (accion === 'finalizar') {
    alert('¡Gracias por tu compra!');
    vaciarCarrito();
    location.hash = '#/';
  }
});

document.addEventListener('input', function (evento) {
  if (evento.target.id === 'busqueda') {
    cambiarBusqueda(evento.target.value);
    
    const campo = document.getElementById('busqueda');
    campo.focus();
    campo.setSelectionRange(campo.value.length, campo.value.length);
  }
});

document.addEventListener('change', (evento) => {
  if (evento.target.id === 'ordenador') cambiarOrden(evento.target.value);
});

// ===== Arranque =====
recuperarCarrito();
cargarCatalogoAPI();
render();