import { obtenerEstado } from '../estado.js';
import { pesos } from '../utilidades/formato.js';

export function Detalle(id) {
  const estado = obtenerEstado();
  if (estado.cargando) return '<p>Cargando productos...</p>';
  if (estado.error) return '<p>' + estado.error + '</p>';

  const producto = estado.productos.find(function (p) {
    return p.id === Number(id);
  });

  if (!producto) {
    return `
      <div class="tarjeta">
        <h2>Producto no encontrado</h2>
        <p class="vacio">Puede que ya no esté disponible.</p>
        <a class="btn" href="#/">Volver al catálogo</a>
      </div>
    `;
  }

  return `
    <a class="volver-link" href="#/">← Volver al catálogo</a>
    <div class="tarjeta detalle">
      <div class="imagen grande"><img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 100%;"></div>
      <div>
        <h2>${producto.nombre}</h2>
        <p class="categoria">${producto.categoria}</p>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio grande">${pesos(producto.precio)}</p>
        <button class="btn" data-accion="agregar" data-id="${producto.id}"
          ${producto.stock === 0 ? 'disabled' : ''}>
          ${producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  `;
}