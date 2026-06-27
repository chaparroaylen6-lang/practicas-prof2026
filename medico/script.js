document.addEventListener('DOMContentLoaded', () => {
    
    // 1. RENDERIZAR DOCTORES
    const doctorsContainer = document.getElementById('doctors-container');
    
    // Verificamos que el contenedor y la base de datos existan
    if (doctorsContainer && typeof doctors !== 'undefined') {
        doctors.forEach(doctor => {
            // Creamos el elemento div para la tarjeta
            const card = document.createElement('div');
            card.className = 'doctor-card';
            
            // Inyectamos el HTML usando los datos del array
            card.innerHTML = `
                <img src="${doctor.image}" alt="Foto de ${doctor.name}" loading="lazy">
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <span class="specialty">${doctor.specialty}</span>
                    <p>${doctor.bio}</p>
                </div>
            `;
            
            // Lo añadimos al contenedor principal
            doctorsContainer.appendChild(card);
        });
    }

    // 2. RENDERIZAR TESTIMONIOS
    const testimonialsContainer = document.getElementById('testimonials-container');
    
    if (testimonialsContainer && typeof testimonials !== 'undefined') {
        testimonials.forEach(testimonio => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            
            card.innerHTML = `
                <p class="content">"${testimonio.content}"</p>
                <div class="patient-info">
                    <img src="${testimonio.avatar}" alt="Avatar de ${testimonio.name}" loading="lazy">
                    <div>
                        <h4>${testimonio.name}</h4>
                        <span>${testimonio.position}</span>
                    </div>
                </div>
            `;
            
            testimonialsContainer.appendChild(card);
        });
    }

    // 3. LÓGICA DEL MENÚ HAMBURGUESA (Para celulares)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            // Activa o desactiva la clase 'active' para mostrar/ocultar el menú
            navMenu.classList.toggle('active');
        });
    }
});