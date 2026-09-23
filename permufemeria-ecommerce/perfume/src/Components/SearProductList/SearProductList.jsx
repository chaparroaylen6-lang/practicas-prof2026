import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../../data/db.json";
import "./SearProductList.css";
import Search from "../Search/Search";

const SearProductList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setProductos(db.products);
    } catch (err) {
      setError("Error al cargar los productos");
    }
  }, []);

  const params = new URLSearchParams(location.search);
  const buscarTermino = params.get("query") || "";

  const normalizarTexto = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const productosFiltrados = productos.filter(
    (producto) =>
      normalizarTexto(producto.nombre).includes(normalizarTexto(buscarTermino)) ||
      normalizarTexto(producto.descripcion).includes(normalizarTexto(buscarTermino))
  );

  const handleImageClick = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <section className="main-contents">
      <div className="results-container">
        <h2>Resultados para: <span>"{buscarTermino}"</span></h2>
        <Search />
      </div>

      <div className="products">
        {error ? (
          <p className="no-results error-message">{error}</p>
        ) : productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className={`product-card ${producto.nuevo ? 'is-new' : ''}`}>
              <img
                src={producto.image}
                alt={producto.nombre}
                className="product-image"
                onClick={() => handleImageClick(producto.id)}
              />
              <h3 className="product-name">{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No hay productos que coincidan con "<i>{buscarTermino}</i>"</p>
        )}
      </div>
    </section>
  );
};

export default SearProductList;