import { obtenerEstado } from '../estado.js';

export function Cabecera() {
  const estado = obtenerEstado();

  const cantidad = estado.carrito.reduce(function (suma, item) {
    return suma + item.cantidad;
  }, 0);

  return `
    <header class="barra">
      <a href="#/" class="logo">Tienda</a>
      <nav>
        <a href="#/">Catálogo</a>
        <a href="#/carrito" class="link-carrito">
          Carrito
          ${cantidad > 0 ? `<span class="globo">` + cantidad + `</span>` : ''}
        </a>
      </nav>
    </header>
  `;
}