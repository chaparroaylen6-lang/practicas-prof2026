document.addEventListener('DOMContentLoaded', function () {
  // Inicializa AOS si está presente
  try { if (window.AOS) AOS.init({ once: true, duration: 700 }); } catch (e) { }

  // Toggle del menú hamburguesa
  (function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
    // Cerrar menú al clicar en un enlace (móvil)
    navMenu.addEventListener('click', function (e) {
      if (e.target.matches('a')) navMenu.classList.remove('active');
    });
  })();

  // Smooth scroll para enlaces a anclas
  (function () {
    const links = document.querySelectorAll('a.nav-link[href^="#"], a[href^="#inicio"], a[href^="#productos"], a[href^="#ventajas"], a[href^="#testimonios"], a[href^="#contacto"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  })();

  // Slider de testimonios
  (function () {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    const slides = slider.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let index = 0;
    function show(i) {
      if (!slider) return;
      index = (i + slides.length) % slides.length;
      slider.style.transform = 'translateX(-' + (index * 100) + '%)';
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { show(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(index + 1); });
    // Auto-play
    let autoplay = setInterval(function () { show(index + 1); }, 5000);
    // Pause on hover
    slider.addEventListener('mouseenter', function () { clearInterval(autoplay); });
    slider.addEventListener('mouseleave', function () { autoplay = setInterval(function () { show(index + 1); }, 5000); });
    // Inicializa posición
    show(0);
  })();

  // Formulario de contacto (simulado)
  (function () {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submit = form.querySelector('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        const previous = submit.textContent;
        submit.textContent = 'Enviando...';
        setTimeout(function () {
          submit.disabled = false;
          submit.textContent = previous;
          alert('Mensaje enviado (simulado). Gracias por contactar.');
          form.reset();
        }, 1200);
      }
    });
  })();

  // Mejora de accesibilidad: añadir focus visible a botones dinámicos
  (function () {
    const focusables = document.querySelectorAll('button, a, input, textarea');
    focusables.forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') el.click();
      });
    });
  })();
});
