(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={carrito:[],filtro:`todas`,busqueda:``,orden:`defecto`,descuento:0,productos:[],cargando:!0,error:null},t=[];function n(t){let n=Number(t);e.favoritos.includes(n)?e.favoritos=e.favoritos.filter(e=>e!==n):e.favoritos.push(n),s()}async function r(){try{e.productos=(await(await fetch(`https://fakestoreapi.com/products`)).json()).map(e=>({id:e.id,nombre:e.title,precio:e.price*1e3,categoria:e.category,imagen:e.image,descripcion:e.description,stock:10})),e.cargando=!1}catch{e.error=`No se pudo cargar el catálogo.`,e.cargando=!1}s()}function i(t){e.orden=t,s()}function a(t){e.descuento={DESC10:.1,OFERTA20:.2}[t.toUpperCase()]||0,e.descuento===0&&alert(`Cupón inválido`),s()}function o(e){t.push(e)}function s(){u(),t.forEach(function(t){t(e)})}function c(){return e}var l=`tienda-carrito-v1`;function u(){try{localStorage.setItem(l,JSON.stringify(e.carrito))}catch(e){console.error(`No se pudo guardar el carrito:`,e)}}function d(){try{let t=JSON.parse(localStorage.getItem(l));Array.isArray(t)&&(e.carrito=t)}catch{e.carrito=[]}}function f(t){let n=e.productos.find(function(e){return e.id===Number(t)});if(!n||n.stock===0)return;let r=e.carrito.find(function(e){return e.id===n.id});if(r){if(r.cantidad>=n.stock)return;r.cantidad+=1}else e.carrito.push({id:n.id,nombre:n.nombre,precio:n.precio,emoji:n.emoji,cantidad:1});s()}function p(t,n){let r=e.carrito.find(function(e){return e.id===Number(t)});if(!r)return;let i=e.productos.find(function(e){return e.id===r.id}),a=r.cantidad+n;a<=0?m(t):a>i.stock||(r.cantidad=a,s())}function m(t){e.carrito=e.carrito.filter(function(e){return e.id!==Number(t)}),s()}function h(){e.carrito=[],s()}function g(t){e.filtro=t,s()}function _(t){e.busqueda=t,s()}function v(){let e=c().carrito.reduce(function(e,t){return e+t.cantidad},0);return`
    <header class="barra">
      <a href="#/" class="logo">Tienda</a>
      <nav>
        <a href="#/">Catálogo</a>
        <a href="#/carrito" class="link-carrito">
          Carrito
          ${e>0?`<span class="globo">`+e+`</span>`:``}
        </a>
      </nav>
    </header>
  `}function y(e){return`$ `+e.toLocaleString(`es-AR`)}function b(e){return e===1?`1 artículo`:e+` artículos`}function x(e){let t=e.stock===0;return`
    <article class="tarjeta producto ${t?`agotado`:``}">
     <a href="#/producto/${e.id}" class="imagen"><img src="${e.imagen}" alt="${e.nombre}" style="width: 100%; height: 100%; object-fit: contain;"></a>
      <h3>${e.nombre}</h3>
      <p class="precio">${y(e.precio)}</p>
      <p class="stock">${t?`Sin stock`:e.stock+` disponibles`}</p>
      <button class="btn" data-accion="agregar" data-id="${e.id}" ${t?`disabled`:``}>
        Agregar al carrito
      </button>
    </article>
  `}function S(){let e=c();if(e.cargando)return`<p>Cargando productos...</p>`;if(e.error)return`<p>`+e.error+`</p>`;let t=e.productos||[],n=[...new Set(t.map(function(e){return e.categoria}))],r=t.filter(function(t){return e.filtro===`todas`||t.categoria===e.filtro}).filter(function(t){return t.nombre.toLowerCase().includes(e.busqueda.toLowerCase())});r.sort((t,n)=>e.orden===`precio-asc`?t.precio-n.precio:e.orden===`precio-desc`?n.precio-t.precio:e.orden===`nombre`?t.nombre.localeCompare(n.nombre):0);let i=[`todas`].concat(n).map(function(t){return`<button class="chip ${e.filtro===t?`activa`:``}" data-accion="filtrar" data-cat="${t}">${t}</button>`}).join(``),a=r.length?r.map(x).join(``):`<p class="vacio">No encontramos productos con esos criterios.</p>`;return`
    <div class="herramientas">
      <input type="search" id="busqueda" placeholder="Buscar productos..." value="${e.busqueda}">
      <div class="chips">${i}</div>
      <select id="ordenador" data-accion="ordenar">
        <option value="defecto">Defecto</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="nombre">Nombre</option>
      </select>
    </div>
    <div class="grilla">${a}</div>
  `}function C(e){let t=c();if(t.cargando)return`<p>Cargando productos...</p>`;if(t.error)return`<p>`+t.error+`</p>`;let n=t.productos.find(function(t){return t.id===Number(e)});return n?`
    <a class="volver-link" href="#/">← Volver al catálogo</a>
    <div class="tarjeta detalle">
      <div class="imagen grande"><img src="${n.imagen}" alt="${n.nombre}" style="max-width: 100%;"></div>
      <div>
        <h2>${n.nombre}</h2>
        <p class="categoria">${n.categoria}</p>
        <p class="descripcion">${n.descripcion}</p>
        <p class="precio grande">${y(n.precio)}</p>
        <button class="btn" data-accion="agregar" data-id="${n.id}"
          ${n.stock===0?`disabled`:``}>
          ${n.stock===0?`Sin stock`:`Agregar al carrito`}
        </button>
      </div>
    </div>
  `:`
      <div class="tarjeta">
        <h2>Producto no encontrado</h2>
        <p class="vacio">Puede que ya no esté disponible.</p>
        <a class="btn" href="#/">Volver al catálogo</a>
      </div>
    `}function w(){let e=c();if(e.carrito.length===0)return`
      <div class="tarjeta vacio-carrito">
        <p class="emoji-grande">🛒</p>
        <h2>Tu carrito está vacío</h2>
        <a class="btn" href="#/">Ver el catálogo</a>
      </div>
    `;let t=e.carrito.reduce(function(e,t){return e+t.precio*t.cantidad},0),n=t-t*e.descuento,r=e.carrito.reduce(function(e,t){return e+t.cantidad},0);return`
    <a class="volver-link" href="#/">← Seguir comprando</a>
    <div class="tarjeta">
      ${e.carrito.map(function(e){return`
      <div class="fila-carrito">
        <span class="imagen chica"><img src="${e.imagen}" alt="${e.nombre}" style="width: 100%;"></span>
        <div class="info">
          <strong>${e.nombre}</strong>
          <span class="unitario">${y(e.precio)} c/u</span>
        </div>
        <div class="cantidad">
          <button class="mini" data-accion="restar" data-id="${e.id}">-</button>
          <span>${e.cantidad}</span>
          <button class="mini" data-accion="sumar" data-id="${e.id}">+</button>
        </div>
        <strong class="subtotal">${y(e.precio*e.cantidad)}</strong>
        <button class="mini quitar" data-accion="quitar" data-id="${e.id}">X</button>
      </div>
    `}).join(``)}
      <div class="resumen">
        <span>${b(r)}</span>
        ${e.descuento>0?`<span>Descuento: -${y(t*e.descuento)}</span>`:``}
        <strong class="total">Total: ${y(n)}</strong>
      </div>
      <input type="text" id="input-cupon" placeholder="Código"> <button data-accion="cupon">Aplicar</button>
      <div class="acciones-carrito">
        <button class="btn fantasma" data-accion="vaciar">Vaciar carrito</button>
        <button class="btn" data-accion="finalizar">Finalizar compra</button>
      </div>
    </div>
  `}var T=document.getElementById(`contenido`),E=document.getElementById(`cabecera`),D=document.getElementById(`toast`);D||(D=document.createElement(`div`),D.id=`toast`,D.className=`toast oculto`,D.textContent=`Producto agregado`,document.body.appendChild(D));function O(){let e=location.hash.slice(1)||`/`;if(e===`/carrito`)return w();if(e.startsWith(`/producto/`)){let t=e.split(`/`)[2];return C(t)}return S()}function k(){E.innerHTML=v(),T.innerHTML=O()}window.addEventListener(`hashchange`,k),o(k),document.addEventListener(`click`,function(e){let t=e.target.closest(`[data-accion]`);if(!t)return;let r=t.dataset.id,i=t.dataset.accion;if(i===`agregar`&&(f(r),D.classList.remove(`oculto`),setTimeout(()=>D.classList.add(`oculto`),2e3)),i===`sumar`&&p(r,1),i===`restar`&&p(r,-1),i===`quitar`&&m(r),i===`vaciar`&&h(),i===`filtrar`&&g(t.dataset.cat),i===`favorito`&&n(r),i===`cupon`){let e=document.getElementById(`input-cupon`);e&&a(e.value)}i===`finalizar`&&(alert(`¡Gracias por tu compra!`),h(),location.hash=`#/`)}),document.addEventListener(`input`,function(e){if(e.target.id===`busqueda`){_(e.target.value);let t=document.getElementById(`busqueda`);t.focus(),t.setSelectionRange(t.value.length,t.value.length)}}),document.addEventListener(`change`,e=>{e.target.id===`ordenador`&&i(e.target.value)}),d(),r(),k();