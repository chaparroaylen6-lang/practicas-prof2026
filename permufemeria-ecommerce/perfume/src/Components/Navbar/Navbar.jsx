import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo1.png"; 
import { useCart } from "../CartContext/CartContext";

const Navbar = () => {
  const { carrito } = useCart();
  const navigate = useNavigate();

  const totalProducts = carrito ? carrito.reduce((acc, producto) => acc + producto.cantidad, 0) : 0;

  const handleHome = () => {
    navigate("/");
  };

  return (
    <section className="header">
      <img src={logo} onClick={handleHome} alt="Anthousae Logo" className="logo-navbar" />
      
      <div className="icons">
        <Link to="/carrito" className="icon-button">
          <i className="fas fa-shopping-cart"></i>
          {totalProducts > 0 && <span className="counter">{totalProducts}</span>}
        </Link>
      </div>
    </section>
  );
};

export default Navbar;