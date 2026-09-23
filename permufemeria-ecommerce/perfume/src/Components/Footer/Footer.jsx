import "./Footer.css";
import logo from "../../assets/logo2.png"; // Asegúrate de que sea tu logo en versión clara/oscura según necesites

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sección izquierda */}
        <div className="footer-section">
          <img src={logo} alt="Anthousae Logo" className="logo-footer" />
          <p className="footer-text">
            En Anthousae, nos especializamos en capturar la delicadeza de la naturaleza en fragancias exclusivas para todos los gustos. ❀
          </p>
        </div>

        {/* Sección del medio */}
        <div className="footer-section">
          <h3 className="footer-heading">COMPAÑÍA</h3>
          <ul className="footer-links">
            <li>Inicio</li>
            <li>Nuestra Esencia</li>
            <li>Envíos</li>
            <li>Política de privacidad</li>
          </ul>
        </div>

        {/* Sección derecha */}
        <div className="footer-section">
          <h3 className="footer-heading">CONTÁCTENOS</h3>
          <ul className="footer-links">
            <li>+502 45378292-33212326</li>
            <li>Alta Verapaz, Guatemala, C.A</li>
            <li>contacto@anthousae.com</li>
            <li>Instagram ✧ TikTok</li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria y pie inferior */}
      <div className="footer-bottom">
        <hr className="footer-divider" />
        <p>Copyright 2026 ✧ Anthousae ✧ Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;