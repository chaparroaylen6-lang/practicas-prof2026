import { TarjetaProducto } from '../componentes/tarjetaproducto.js';
import { obtenerEstado } from '../estado.js';

export function Catalogo() {
  const estado = obtenerEstado();

  if (estado.cargando) return '<p>Cargando productos...</p>';
  if (estado.error) return '<p>' + estado.error + '</p>';

  const productos = estado.productos || [];
  const categorias = [...new Set(productos.map(function (p) { return p.categoria; }))];

  const visibles = productos
    .filter(function (p) {
      return estado.filtro === 'todas' || p.categoria === estado.filtro;
    })
    .filter(function (p) {
      return p.nombre.toLowerCase().includes(estado.busqueda.toLowerCase());
    });

  visibles.sort((a, b) => {
    if (estado.orden === 'precio-asc') return a.precio - b.precio;
    if (estado.orden === 'precio-desc') return b.precio - a.precio;
    if (estado.orden === 'nombre') return a.nombre.localeCompare(b.nombre);
    return 0;
  });

  const botones = ['todas'].concat(categorias).map(function (cat) {
    const activa = estado.filtro === cat ? 'activa' : '';
    return `<button class="chip ${activa}" data-accion="filtrar" data-cat="${cat}">${cat}</button>`;
  }).join('');

  const tarjetas = visibles.length
    ? visibles.map(TarjetaProducto).join('')
    : '<p class="vacio">No encontramos productos con esos criterios.</p>';

  return `
    <div class="herramientas">
      <input type="search" id="busqueda" placeholder="Buscar productos..." value="${estado.busqueda}">
      <div class="chips">${botones}</div>
      <select id="ordenador" data-accion="ordenar">
        <option value="defecto">Defecto</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="nombre">Nombre</option>
      </select>
    </div>
    <div class="grilla">${tarjetas}</div>
  `;
}