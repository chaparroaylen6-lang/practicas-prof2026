import { useState, useEffect } from "react";
import "./NewProductList.css"; // Puedes crear estilos específicos para este componente
import { useNavigate } from "react-router-dom";
import db from "../../data/db.json";
import AOS from "aos"; // Importar AOS
import "aos/dist/aos.css"; // Importar los estilos de AOS

const NewProductList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setProductos(db.products); // Asegúrate de que "products" es la clave correcta en tu JSON
    } catch (err) {
      setError("Error al cargar los productos");
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Filtrar productos que sean nuevos
  const productosNuevos = productos.filter((producto) => producto.nuevo);

  const handleImageClick = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <section className="new-products">
      <h2>Nuevos Productos</h2>
      <div className="products">
        {error ? (
          <p className="error-message">{error}</p>
        ) : productosNuevos.length > 0 ? (
          productosNuevos.map((producto, index) => (
            <div
              className={`product-card ${producto.nuevo ? 'is-new' : ''}`}
              key={producto.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={producto.image}
                alt={producto.nombre}
                className="product-image"
                onClick={() => handleImageClick(producto.id)}
              />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No hay productos nuevos disponibles.</p>
        )}
      </div>
    </section>
  );
};

export default NewProductList;
