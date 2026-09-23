import { useState } from "react"; // <-- Faltaba esta línea
import { useCart } from "../CartContext/CartContext";
import "./Cart.css";

const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart(); 
  const [compraExitosa, setCompraExitosa] = useState(false); // Estado para el mensaje final

  const costoDeEnvio = 10;
  const subTotal = carrito.reduce((acc, producto) => 
    acc + producto.precio * producto.cantidad, 0
  );

  const total = subTotal + costoDeEnvio;

  const handleAumentarCantidad = (productoId) => {
    actualizarCantidad(productoId, 1);
  };

  const handleDisminuirCantidad = (productoId) => {
    const producto = carrito.find((item) => item.id === productoId);
    if(producto.cantidad > 1) {
      actualizarCantidad(productoId, -1);
    }
  };

  const handleFinalizarCompra = () => {
    setCompraExitosa(true);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu <span>Colección</span></h2>
      
      {/* 1. Si la compra fue exitosa, mostramos el mensaje de agradecimiento */}
      {compraExitosa ? (
        <div className="empty-cart">
          <p>¡Gracias por tu compra! Tu pedido está siendo preparado con delicadeza.</p>
          <span className="empty-icon">❀</span>
        </div>
      ) : 
      
      /* 2. Si no hay compra exitosa y el carrito está vacío */
      carrito.length === 0 ? (
        <div className="empty-cart">
          <p>Aún no has añadido fragancias a tu colección.</p>
          <span className="empty-icon">♡</span>
        </div>
      ) : 
      
      /* 3. Si hay productos en el carrito, mostramos la lista */
      (
        <div className="cart-content-wrapper">
          <div className="cart-items-section">
            <div className="cart-header">
              <p>Producto</p>
              <p>Precio</p>
              <p>Cantidad</p>
              <p>Total</p>
              <p>Acción</p>
            </div>
            <ul className="cart-items">
              {carrito.map((producto) => {
                const totalPrecio = producto.precio * producto.cantidad;
                return (
                  <li className="cart-item" key={producto.id}>
                    <div className="product-info">
                      <img 
                        src={producto.imagen || "https://via.placeholder.com/150"} 
                        alt={producto.nombre}
                        className="product-images"
                      />
                      <span className="cart-product-name">{producto.nombre}</span>
                    </div>
                    <p className="cart-price">${producto.precio.toFixed(2)}</p>

                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => handleDisminuirCantidad(producto.id)}>
                        -
                      </button>
                      <input 
                        type="number"
                        className="quantity-input"
                        readOnly
                        value={producto.cantidad}
                      />
                      <button className="quantity-btn" onClick={() => handleAumentarCantidad(producto.id)}>
                        +
                      </button>
                    </div>

                    <p className="cart-total-price">${totalPrecio.toFixed(2)}</p>
                    <button className="delete-btn" onClick={() => eliminarProducto(producto.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="cart-summary">
            <h3>Resumen del <span>Pedido</span></h3>
            <div className="summary-details">
              <p>Subtotal: <span>${subTotal.toFixed(2)}</span></p>
              <p>Envío: <span>${costoDeEnvio.toFixed(2)}</span></p>
            </div>
            <p className="total">Total: <span>${total.toFixed(2)}</span></p>
            {/* Botón enlazado a la función que cambia el estado a compra exitosa */}
            <button className="checkout-btn" onClick={handleFinalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;