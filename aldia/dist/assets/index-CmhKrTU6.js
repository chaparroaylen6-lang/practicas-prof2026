(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={vtv:{nombre:`VTV`,emoji:`🔧`,meses:12},seguro:{nombre:`Seguro`,emoji:`🛡️`,meses:12},patente:{nombre:`Patente`,emoji:`📄`,meses:3},licencia:{nombre:`Licencia`,emoji:`🪪`,meses:60},service:{nombre:`Service`,emoji:`🛠️`,meses:6},matafuegos:{nombre:`Matafuegos`,emoji:`🧯`,meses:12},otro:{nombre:`Otro`,emoji:`📌`,meses:12}};function t(e){let t=e.split(`-`),n=Number(t[0]),r=Number(t[1])-1,i=Number(t[2]);return new Date(n,r,i)}function n(e){let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`);return t+`-`+n+`-`+r}function r(){let e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}var i=864e5;function a(e){let n=t(e).getTime()-r().getTime();return Math.round(n/i)}function o(e){return e<0?`vencido`:e<=7?`critico`:e<=30?`proximo`:`aldia`}function s(e){return e===0?`Vence hoy`:e===1?`Vence mañana`:e===-1?`Venció ayer`:e<0?`Venció hace `+-e+` días`:`Vence en `+e+` días`}function c(e,r){let i=t(e),a=i.getDate();return i.setMonth(i.getMonth()+r),i.getDate()!==a&&i.setDate(0),n(i)}var l={vehiculo:{alias:`Mi vehiculo`,tipo:`auto`,patente:``},vencimientos:[],filtro:`todos`,vista:`tablero`},u=[];function d(e){u.push(e)}function f(){v(),u.forEach(function(e){e(l)})}function p(){return l}function m(e){l.vista=e,f()}function h(e){l.filtro=e,f()}var g=`eldia-datos`,_=1;function v(){try{localStorage.setItem(g,JSON.stringify({version:_,vehiculo:l.vehiculo,vencimientos:l.vencimientos}))}catch(e){console.error(`No se pudo guardar:`,e)}}function y(){try{let e=JSON.parse(localStorage.getItem(g));if(!e)return;let t=json.parse(e);if(t.version!==_){console.warn(`formato de datos no compatible, se reiniciará el estado`);return}t.vehiculo&&(l.vehiculo=t.vehiculo),Array.isArray(t.vencimientos)&&(l.vencimientos=t.vencimientos)}catch(e){console.error(`Datos corruptos:`,e)}}function b(e){l.vencimientos.push({id:Date.now(),tipo:e.tipo,detalle:e.detalle,vence:e.vence,costo:e.costo,historial:[]}),l.vista=`tablero`,f()}function x(e){l.vencimientos=l.vencimientos.filter(function(t){return t.id!==Number(e)}),f()}function S(t,i){let a=l.vencimientos.find(function(e){return e.id===Number(t)});if(!a)return;a.historial.push({fecha:n(r()),costo:i});let o=(e[a.tipo]||e.otro).meses;a.vence=c(a.vence,o),a.costo=i,f()}function C(e){return`$`+e.toLocaleString(`es-AR`,{minimumFractionDigits:2,maximumFractionDigits:2})}function w(t){let n=e[t.tipo]||e.otro,r=a(t.vence),i=o(r),c=aFecha(t.vence).toLocaleDateString(`es-AR`,{day:`numeric`,month:`long`,year:`numeric`});return`
<article class="tarjeta venc ${i}">
  <span class="emoji">${n.emoji}</span>
  <div class="info">
    <h3>${n.nombre}</h3>
    ${t.detalle?`<p class="detalle">`+t.detalle+`</p>`:``}
    <p class="cuando">${s(r)}</p>
    <p class="fecha">${c} · ${C(t.costo)}</p>
  </div>
  <div class="acciones">
    <button class="btn chico" data-accion="pagar" data-id="${t.id}">Registrar pago</button>
    <button class="btn chico fantasma" data-accion="borrar" data-id="${t.id}">✕</button>
  </div>
</article>
`}function T(){let e=p(),t=e.vencimientos.slice().sort(function(e,t){return a(e.vence)-a(t.vence)}),n=t.filter(function(t){return e.filtro===`todos`||o(a(t.vence))===e.filtro}),r=function(e){return t.filter(function(t){return o(a(t.vence))===e}).length};return`<div class="chips">${[[`todos`,`Todos`,t.length],[`vencido`,`Vencidos`,r(`vencido`)],[`critico`,`Esta semana`,r(`critico`)],[`proximo`,`Este mes`,r(`proximo`)]].map(function(t){return`<button class="chip ${e.filtro===t[0]?`activo`:``}" data-accion="filtrar" data-f="${t[0]}">${t[1]} (${t[2]})</button>`}).join(``)}</div>${n.length?n.map(w).join(``):`<p class="vacio">No hay vencimientos en esta categoría.</p>`}`}function E(){return`
    <div class="tarjeta">
      <h2 style="font-size:1rem;margin-bottom:14px">Nuevo vencimiento</h2>
      <div class="campos">
        <label>Tipo<select id="f-tipo">${Object.entries(e).map(function(e){let t=e[0],n=e[1];return`<option value="${t}">${n.emoji} ${n.nombre}</option>`}).join(``)}</select></label>
        <label>Detalle (opcional)<input type="text" id="f-detalle" maxlength="30" placeholder="Planta Santa Fe"></label>
        <label>Vence el <input type="date" id="f-vence"></label>
        <label>Costo<input type="number" id="f-costo" min="0" step="100" placeholder="0"></label>
      </div>
      <p class="vacio" id="f-error" style="color:var(--vencido);padding:0 10px"></p>
      <button class="btn" data-accion="crear">Agregar</button>
      <button class="btn fantasma" data-accion="ir" data-vista="tablero">Cancelar</button>
    </div>
  `}function D(){let t=p(),n=String(new Date().getFullYear()),r=t.vencimientos.flatMap(function(e){return e.historial.map(function(t){return{tipo:e.tipo,fecha:t.fecha,costo:t.costo}})}).filter(function(e){return e.fecha.startsWith(n)});if(r.length===0)return`
      <div class="tarjeta">
        <p class="vacio">Todavía no registraste ningún pago este año.<br>
        Cuando registres uno, acá vas a ver cuánto llevás gastado.</p>
      </div>
    `;let i=r.reduce(function(e,t){return e+t.costo},0),a=r.reduce(function(e,t){return e[t.tipo]=(e[t.tipo]||0)+t.costo,e},{}),o=Object.keys(a).sort(function(e,t){return a[t]-a[e]}).map(function(t){let n=e[t]||e.otro,r=(a[t]/i*100).toFixed(0);return`
      <div class="venc tarjeta aldia">
        <span class="emoji">${n.emoji}</span>
        <div class="info">
          <h3>${n.nombre}</h3>
          <p class="detalle">${r}% del total del año</p>
        </div>
        <strong>${C(a[t])}</strong>
      </div>
    `}).join(``);return`
    <div class="tarjeta">
      <p class="detalle" style="color:var(--apagado);font-size:.8rem">Gastado en ${n}</p>
      <strong style="font-size:1.9rem">${C(i)}</strong>
    </div>
    ${o}
  `}var O=document.getElementById(`app`);function k(){let e=p(),t=T();e.vista===`nuevo`&&(t=E()),e.vista===`costos`&&(t=D()),O.innerHTML=`
    <div class="app">
      <header class="cabecera">
        <h1>AlDía</h1>
        <span class="patente">${e.vehiculo.patente||`SIN PATENTE`}</span>
      </header>
      ${t}
    </div>
    <nav class="barra-inferior">
      <button class="btn fantasma" data-accion="ir" data-vista="tablero">Vencimientos</button>
      <button class="btn fantasma" data-accion="ir" data-vista="costos">Costos</button>
      <button class="btn" data-accion="ir" data-vista="nuevo">+ Agregar</button>
    </nav>
  `}document.addEventListener(`click`,function(e){let t=e.target.closest(`[data-accion]`);if(!t)return;let n=t.dataset.accion;if(n===`ir`&&m(t.dataset.vista),n===`filtrar`&&h(t.dataset.f),n===`borrar`&&confirm(`¿Borrar este vencimiento?`)&&x(t.dataset.id),n===`pagar`){let e=prompt(`¿Cuánto pagaste?`);if(e===null)return;let n=parseFloat(e);if(isNaN(n)||n<0){alert(`Ingresá un número válido.`);return}S(t.dataset.id,n)}if(n===`crear`){let e={tipo:document.getElementById(`f-tipo`).value,detalle:document.getElementById(`f-detalle`).value.trim(),vence:document.getElementById(`f-vence`).value,costo:parseFloat(document.getElementById(`f-costo`).value)||0};if(!e.vence){document.getElementById(`f-error`).textContent=`Elegí una fecha de vencimiento.`;return}b(e)}}),d(k),y(),k(),`serviceWorker`in navigator&&window.addEventListener(`load`,function(){navigator.serviceWorker.register(`/sw.js`).then(function(){console.log(`Service Worker registrado con éxito`)}).catch(function(e){console.log(`Error al registrar el Service Worker:`,e)})});function A(){let e=p().vencimientos.filter(function(e){return a(e.vence)<=7});if(e.length===0)return;let t=e.length===1?`Vencimiento próximo: ${e[0].detalle||e[0].tipo}`:`Tenés ${e.length} vencimientos próximos.`;Notification.permission===`granted`?new Notification(`AlDía`,{body:t,icon:`/icon-192.png`}):Notification.permission!==`denied`&&Notification.requestPermission()}A();