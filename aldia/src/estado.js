
const estado = {
    vehiculo: {alias: 'Mi vehiculo', tipo: 'auto', patente: ''},
    vencimientos: [],
    filtro: 'todos',
    vista: 'tablero'
};

const suscriptores = [];

export function suscribir(fn) {
    suscriptores.push(fn);
}

function notificar() {
   guardar();
    suscriptores.forEach(function (fn) { fn(estado); });
}

export function obtenerEstado() {
    return estado;
}

export function irA(vista){
estado.vista = vista;
notificar();
}

export function cambiarFiltro(filtro){
    estado.filtro = filtro;
    notificar();
}

export function guardarVehiculos(datos){
    estado.vehiculo = datos;
    notificar();
}

const CLAVE = 'eldia-datos'
const VERSION = 1;

function guardar(){
    try{
        localStorage.setItem(CLAVE, JSON.stringify({
            version: VERSION,
            vehiculo: estado.vehiculo,
            vencimientos: estado.vencimientos
        }));
    } catch(error) {
        console.error('No se pudo guardar:', error);
    }
}

export function recuperar(){
    try{
        const crudo = JSON.parse(localStorage.getItem(CLAVE));
        if(!crudo) return;
        const datos = json.parse(crudo);
        if(datos.version !== VERSION){
            console.warn('formato de datos no compatible, se reiniciará el estado');
            return;
        }
        if (datos.vehiculo) estado.vehiculo = datos.vehiculo;
        if (Array.isArray(datos.vencimientos)) estado.vencimientos = datos.vencimientos;
    } catch(error) {
        console.error('Datos corruptos:', error);
    }
}

import { tipos } from './datos/tipos.js';
import { sumarMeses, aTexto, hoy } from './utilidades/fechas.js';

export function crearVencimiento(datos) {
  estado.vencimientos.push({
    id: Date.now(),
    tipo: datos.tipo,
    detalle: datos.detalle,
    vence: datos.vence,
    costo: datos.costo,
    historial: []
  });
  estado.vista = 'tablero';
  notificar();
}

export function borrarVencimiento(id) {
  estado.vencimientos = estado.vencimientos.filter(function (v) {
    return v.id !== Number(id);
  });
  notificar();
}

export function registrarPago(id, costoNuevo) {
  const v = estado.vencimientos.find(function (x) {
    return x.id === Number(id);
  });
  if (!v) return;

  v.historial.push({ fecha: aTexto(hoy()), costo: costoNuevo });
  const meses = (tipos[v.tipo] || tipos.otro).meses;
  v.vence = sumarMeses(v.vence, meses);

  v.costo = costoNuevo;

  notificar();
}