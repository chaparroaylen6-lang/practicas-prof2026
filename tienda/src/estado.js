const estado = {
  carrito: [],
  filtro: 'todas',
  busqueda: '',
  orden: 'defecto',
  descuento: 0,
  productos: [],
  cargando: true,
  error: null
};

const suscriptores = [];
export function alternarFavorito(id) {
  const numId = Number(id);
  if (estado.favoritos.includes(numId)) {
    estado.favoritos = estado.favoritos.filter(f => f !== numId);
  } else {
    estado.favoritos.push(numId);
  }
  notificar();
}
export async function cargarCatalogoAPI() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    estado.productos = data.map(p => ({
      id: p.id,
      nombre: p.title,
      precio: p.price * 1000,
      categoria: p.category,
      imagen: p.image,
      descripcion: p.description,
      stock: 10
    }));
    estado.cargando = false;
  } catch (e) {
    estado.error = 'No se pudo cargar el catálogo.';
    estado.cargando = false;
  }
  notificar();
}

export function cambiarOrden(criterio) { estado.orden = criterio; notificar(); }
export function aplicarCupon(codigo) {
  const cupones = { 'DESC10': 0.10, 'OFERTA20': 0.20 };
  estado.descuento = cupones[codigo.toUpperCase()] || 0;
  if (estado.descuento === 0) alert('Cupón inválido');
  notificar();
}
export function suscribir(funcion) {
  suscriptores.push(funcion);
}

function notificar() {
  guardarCarrito();
  suscriptores.forEach(function (funcion) {
    funcion(estado);
  });
}

export function obtenerEstado() {
  return estado;
}

const CLAVE = 'tienda-carrito-v1';

function guardarCarrito() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado.carrito));
  } catch (error) {
    console.error('No se pudo guardar el carrito:', error);
  }
}

export function recuperarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    if (Array.isArray(guardado)) estado.carrito = guardado;
  } catch (error) {
    estado.carrito = [];
  }
}
export function agregarAlCarrito(id) {
  const producto = estado.productos.find(function (p) {
    return p.id === Number(id);
  });
  if (!producto || producto.stock === 0) return;

  const item = estado.carrito.find(function (i) {
    return i.id === producto.id;
  });

  if (item) {
    if (item.cantidad >= producto.stock) return;
    item.cantidad = item.cantidad + 1;
  } else {
    estado.carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      emoji: producto.emoji,
      cantidad: 1
    });
  }
  notificar();
}

export function cambiarCantidad(id, delta) {
  const item = estado.carrito.find(function (i) {
    return i.id === Number(id);
  });
  if (!item) return;

  const producto = estado.productos.find(function (p) { return p.id === item.id; });
  const nueva = item.cantidad + delta;

  if (nueva <= 0) {
    quitarDelCarrito(id);
    return;
  }
  if (nueva > producto.stock) return;

  item.cantidad = nueva;
  notificar();
}

export function quitarDelCarrito(id) {
  estado.carrito = estado.carrito.filter(function (i) {
    return i.id !== Number(id);
  });
  notificar();
}

export function vaciarCarrito() {
  estado.carrito = [];
  notificar();
}

export function cambiarFiltro(categoria) {
  estado.filtro = categoria;
  notificar();
}

export function cambiarBusqueda(texto) {
  estado.busqueda = texto;
  notificar();
}