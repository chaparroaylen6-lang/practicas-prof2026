import { obtenerEstado } from '../estado.js';
import { pesos, textoUnidades } from '../utilidades/formato.js';

export function Carrito() {
  const estado = obtenerEstado();

  if (estado.carrito.length === 0) {
    return `
      <div class="tarjeta vacio-carrito">
        <p class="emoji-grande">🛒</p>
        <h2>Tu carrito está vacío</h2>
        <a class="btn" href="#/">Ver el catálogo</a>
      </div>
    `;
  }

  const total = estado.carrito.reduce(function (suma, item) {
    return suma + item.precio * item.cantidad;
  }, 0);

  const totalFinal = total - (total * estado.descuento);

  const unidades = estado.carrito.reduce(function (suma, item) {
    return suma + item.cantidad;
  }, 0);

  const filas = estado.carrito.map(function (item) {
    return `
      <div class="fila-carrito">
        <span class="imagen chica"><img src="${item.imagen}" alt="${item.nombre}" style="width: 100%;"></span>
        <div class="info">
          <strong>${item.nombre}</strong>
          <span class="unitario">${pesos(item.precio)} c/u</span>
        </div>
        <div class="cantidad">
          <button class="mini" data-accion="restar" data-id="${item.id}">-</button>
          <span>${item.cantidad}</span>
          <button class="mini" data-accion="sumar" data-id="${item.id}">+</button>
        </div>
        <strong class="subtotal">${pesos(item.precio * item.cantidad)}</strong>
        <button class="mini quitar" data-accion="quitar" data-id="${item.id}">X</button>
      </div>
    `;
  }).join('');

  return `
    <a class="volver-link" href="#/">← Seguir comprando</a>
    <div class="tarjeta">
      ${filas}
      <div class="resumen">
        <span>${textoUnidades(unidades)}</span>
        ${estado.descuento > 0 ? `<span>Descuento: -${pesos(total * estado.descuento)}</span>` : ''}
        <strong class="total">Total: ${pesos(totalFinal)}</strong>
      </div>
      <input type="text" id="input-cupon" placeholder="Código"> <button data-accion="cupon">Aplicar</button>
      <div class="acciones-carrito">
        <button class="btn fantasma" data-accion="vaciar">Vaciar carrito</button>
        <button class="btn" data-accion="finalizar">Finalizar compra</button>
      </div>
    </div>
  `;
}