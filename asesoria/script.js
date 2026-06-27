// main.js
import { testimonios } from './db.js';

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('testimonialTrack');
    const nav = document.getElementById('testimonialNav');


    testimonios.forEach((testimonio, index) => {
        
        const slide = document.createElement('div');
        slide.classList.add('testimonial-slide');
        slide.innerHTML = `
            <div class="testimonial-content">
                <p class="comentario">"${testimonio.comentario}"</p>
                <div class="perfil">
                    <img src="${testimonio.avatar}" alt="Avatar de ${testimonio.nombre}" class="avatar">
                    <div class="info">
                        <h4>${testimonio.nombre}</h4>
                        <p>${testimonio.cargo}</p>
                    </div>
                </div>
            </div>
        `;
        track.appendChild(slide);

        
        const dot = document.createElement('button');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active'); 
        dot.dataset.index = index; 
        nav.appendChild(dot);
    });

  
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