export function pesos(numero) {
  return '$ ' + numero.toLocaleString('es-AR');
}

export function textoUnidades(cantidad) {
  return cantidad === 1 ? '1 artículo' : cantidad + ' artículos';
}