import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.css";

const Hero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <header className="hero-section" data-aos="fade-in">
            {/* Esta capa le da el tono rosita suave a la imagen de fondo */}
            <div className="hero-overlay"></div> 
            
            <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                <h1 className="brand-title">Anthousae</h1>
                <h2 className="slogan">Aromas que florecen en tu piel</h2>
                <div className="search-bar-soft">
                    <input type="text" placeholder="Encuentra tu fragancia ideal..." />
                    <button className="btn-soft">Buscar</button>
                </div>
            </div>
        </header>
    );
};

export default Hero;