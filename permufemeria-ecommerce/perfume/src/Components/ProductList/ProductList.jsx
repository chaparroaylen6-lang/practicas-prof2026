import { useState, useEffect } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import db from "../../data/db.json";
import AOS from "aos";
import "aos/dist/aos.css";

const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            setProductos(db.products);
            AOS.refresh();
        } catch (err) {
            console.error("Error al cargar los productos", err);
        }
    }, []);

    const handleImageClick = (id) => {
        navigate(`/producto/${id}`);
    };

    return (
        <section className="main-content">
            <main className="collections">
                <h2>Todas las Colecciones</h2>
                <div className="products">
                    {productos.length === 0 ? (
                        <p className="no-results">No hay productos disponibles</p>
                    ) : (
                        productos.map((producto, index) => (
                            <div className={`product-card ${producto.nuevo ? 'is-new' : ''}`} key={producto.id} 
                                data-aos="fade-up"
                                data-aos-delay={index * 100}  
                                data-aos-duration="800"
                            >
                                <img 
                                    src={producto.image} 
                                    alt={producto.nombre} 
                                    className="product-image"
                                    onClick={() => handleImageClick(producto.id)}
                                />
                                <h3 className="product-title">{producto.nombre}</h3>
                                <p className="product-price">${producto.precio}</p>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </section>
    );
};

export default ProductList;
