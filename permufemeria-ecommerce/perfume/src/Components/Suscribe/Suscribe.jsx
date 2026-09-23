import React, { useState } from 'react';
import './Suscribe.css';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    alert(`¡Gracias por unirte a Anthousae! Tu descuento ha sido enviado a: ${email}`);
    setEmail(''); // Limpia el input después de suscribirse
  };

  return (
    <section className="subscribe">
      <div className="subscribe-container">
        <h2 className="subscribe-title">Únete a nuestra esencia</h2>
        <p className="subscribe-description">
          Suscríbete y recibe un 20% de descuento en tu primera compra. 
          Descubre nuevas colecciones y secretos botánicos antes que nadie.
        </p>
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Tu correo electrónico..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="subscribe-input" 
            required 
          />
          <button type="submit" className="subscribe-btn">Descubrir</button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;