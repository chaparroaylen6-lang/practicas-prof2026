import React, { useEffect } from 'react';
import './Features.css';
import AOS from 'aos'; // Importar AOS
import 'aos/dist/aos.css'; // Importar estilos de AOS

const Features = () => {
  useEffect(() => {
    AOS.refresh()
  }, []);

  return (
    <section className="features">
      <div className="feature-card" data-aos="fade-up">
        <i className="fas fa-tshirt feature-icon"></i>
        <h3>Ropa de Calidad</h3>
        <p>Encuentra ropa para todas las ocasiones, con la mejor calidad y los mejores precios.</p>
      </div>
      <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
        <i className="fas fa-shoe-prints feature-icon"></i>
        <h3>Zapatos de Moda</h3>
        <p>Zapatos cómodos y elegantes para cada temporada, siempre a la vanguardia.</p>
      </div>
      <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
        <i className="fas fa-gift feature-icon"></i>
        <h3>Regalos Perfectos</h3>
        <p>Encuentra el regalo ideal para esa persona especial, desde ropa hasta accesorios.</p>
      </div>
      <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
        <i className="fas fa-truck feature-icon"></i>
        <h3>Envíos Rápidos</h3>
        <p>Realizamos envíos rápidos a cualquier parte para que recibas tus productos a tiempo.</p>
      </div>
    </section>
  );
};

export default Features;
