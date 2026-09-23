import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Gallery.css";

const Gallery = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="gallery-section">
      <div className="gallery-item" data-aos="fade-up">
        <img
          src="/gallery/g1.png"
          alt="Perfume elegante"
          className="gallery-image"
        />
        <div className="gallery-overlay"></div>
        <div className="gallery-text">
          <h2>✧ DESCUBRE</h2>
          <h1>
            LA ESENCIA<br /> <span>DEL LUJO</span>
          </h1>
        </div>
      </div>

      <div className="gallery-item" data-aos="fade-up" data-aos-delay="200">
        <img
          src="/gallery/g2.png"
          alt="Perfume sofisticado"
          className="gallery-image"
        />
        <div className="gallery-overlay"></div>
        <div className="gallery-text">
          <h2>❀ ENCUENTRA</h2>
          <h1>
            EL AROMA<br /> <span>QUE TE DEFINE</span>
          </h1>
        </div>
      </div>

      <div className="gallery-item" data-aos="fade-up" data-aos-delay="400">
        <img
          src="/gallery/g3.png"
          alt="Perfume único"
          className="gallery-image"
        />
        <div className="gallery-overlay"></div>
        <div className="gallery-text">
          <h2>♡ EXPERIMENTA</h2>
          <h1>
            LA MAGIA<br /> <span>DE LOS PERFUMES</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Gallery;