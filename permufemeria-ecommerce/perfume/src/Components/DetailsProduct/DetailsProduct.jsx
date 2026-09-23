import { useParams } from "react-router-dom";
import "./DetailsProduct.css";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import db from "../../data/db.json";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Notification from "../Notification/Notification";
import Gallery from "../Gallery/Gallery";

const DetailsProduct = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCart();
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito({
        id: producto.id,
        imagen: producto.image,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      });
      setNotification("¡Fragancia añadida a tu colección!");
      setNotificationType("success");
    } else {
      setNotification("No se pudo agregar el producto");
      setNotificationType("error");
    }
  };

  useEffect(() => {
    // Al cambiar de producto, nos aseguramos de que la página suba al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const productoEncontrado = db.products.find(
        (prod) => prod.id === parseInt(id, 10)
      );

      if (!productoEncontrado) {
        throw new Error("Fragancia no encontrada");
      }

      setProducto(productoEncontrado);
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  if (error) {
    return <h2 className="error-message no-results">{error}</h2>;
  }

  return (
    <>
      <Notification
        message={notification}
        type={notificationType}
        onClose={() => setNotification("")}
      />
      
      <section className="product-details-wrapper">
        <div className="product-details">
          {producto ? (
            <>
              {/* Contenedor izquierdo: Imágenes */}
              <div className="product-images-container">
                <div className="thumbnail-gallery">
                  <img src={producto.image} alt={producto.nombre} className="image-small" />
                </div>
                <div className="main-image-wrapper">
                  <img src={producto.image} alt={producto.nombre} className="image-main" />
                </div>
              </div>

              {/* Contenedor derecho: Información */}
              <div className="product-infos">
                <h1 className="detail-title">{producto.nombre}</h1>
                <p className="detail-price">${producto.precio}</p>
                <div className="detail-divider"></div>
                <p className="detail-description">{producto.descripcion}</p>
                
                <button className="add-to-cart-soft" onClick={handleAgregarAlCarrito}>
                  Añadir al carrito
                </button>
                
                <div className="detail-perks">
                  <p>✧ Producto 100% original</p>
                  <p>❀ Pago contra reembolso disponible</p>
                  <p>♡ Devolución y cambio fácil en 7 días</p>
                </div>
              </div>
            </>
          ) : (
            <p className="no-results">Preparando tu fragancia...</p>
          )}
        </div>
      </section>

      <RelatedProducts currentProduct={producto} products={db.products} />
      <Gallery />
    </>
  );
};

export default DetailsProduct;