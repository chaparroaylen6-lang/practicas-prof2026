import { pesos } from '../utilidades/formato.js';

export function TarjetaProducto(producto) {
  const sinStock = producto.stock === 0;

  return `
    <article class="tarjeta producto ${sinStock ? 'agotado' : ''}">
     <a href="#/producto/${producto.id}" class="imagen"><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 100%; object-fit: contain;"></a>
      <h3>${producto.nombre}</h3>
      <p class="precio">${pesos(producto.precio)}</p>
      <p class="stock">${sinStock ? 'Sin stock' : producto.stock + ' disponibles'}</p>
      <button class="btn" data-accion="agregar" data-id="${producto.id}" ${sinStock ? 'disabled' : ''}>
        Agregar al carrito
      </button>
    </article>
  `;
}