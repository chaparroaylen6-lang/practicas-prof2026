import { testimonialsDB } from './db.js';

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('testimonialTrack');
    const nav = document.getElementById('testimonialNav');

    testimonialsDB.forEach((testimonio, index) => {
        // Crear la tarjeta
        const slide = document.createElement('div');
        slide.classList.add('testimonial-slide');
        
        // Usamos los nombres exactos de tu db.js: image, name, caseType, testimonial
        slide.innerHTML = `
            <div class="testimonial-content">
                <p class="comentario">"${testimonio.testimonial}"</p>
                <div class="perfil">
                    <img src="${testimonio.image}" alt="Avatar de ${testimonio.name}" class="avatar">
                    <div class="info">
                        <h4>${testimonio.name}</h4>
                        <p>${testimonio.caseType}</p>
                    </div>
                </div>
            </div>
        `;
        track.appendChild(slide);

        // Crear los puntos de navegación
        const dot = document.createElement('button');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active'); 
        dot.dataset.index = index; 
        nav.appendChild(dot);
    });

    // Lógica del Slider
    const dots = document.querySelectorAll('.nav-dot');
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const targetIndex = e.target.dataset.index;

            dots.forEach(d => d.classList.remove('active'));
            e.target.classList.add('active');

            track.style.transform = `translateX(-${targetIndex * 100}%)`;
        });
    });
});