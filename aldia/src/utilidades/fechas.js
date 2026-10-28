export function aFecha(texto) {
    const partes = texto.split('-');
    const anio = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const dia = Number(partes[2]);
    return new Date(anio, mes, dia);
}

export function aTexto(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return anio + '-' + mes + '-' + dia;
}

export function hoy() {
    const ahora = new Date();
    return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
}

const UN_DIA = 1000 * 60 * 60 * 24;
export function diasHasta(textoFecha){
    const distinto = aFecha(textoFecha);
    const diferencia = distinto.getTime() - hoy().getTime();
    return Math.round(diferencia / UN_DIA);
}

export function estadoDe(dias){
    if (dias < 0) return 'vencido'; 
    if (dias <= 7) return 'critico';
    if (dias <= 30) return 'proximo';
    return 'aldia';
}

export function textoDias(dias){
    if (dias === 0) return 'Vence hoy';
    if (dias === 1) return 'Vence mañana';
    if (dias === -1) return 'Venció ayer';
    if (dias < 0) return 'Venció hace ' + (-dias) + ' días';
    if (dias <= 7) return 'Vence en ' + dias + ' días';
    if (dias <= 30) return 'Vence en ' + dias + ' días';
    return 'Vence en ' + dias + ' días';

    const meses = Math.floor(dias / 30);
    return 'Vence en ' + meses + ' mes' + (meses > 1 ? 'es' : '');
}


export function sumarMeses(textoFecha, meses){
    const fecha = aFecha(textoFecha);
    const diaOriginal = fecha.getDate();

    fecha.setMonth(fecha.getMonth() + meses);
    if (fecha.getDate() !== diaOriginal) {
        fecha.setDate(0);
    }
    return aTexto(fecha);
}   

