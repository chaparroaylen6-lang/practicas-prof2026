export function pesos(numeros){
    return '$' + numeros.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}