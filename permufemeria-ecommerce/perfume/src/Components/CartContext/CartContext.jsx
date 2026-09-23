import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Inicializamos el estado leyendo el LocalStorage (si hay datos guardados)
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem("anthousae_carrito");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    // 2. Efecto mágico: Cada vez que el 'carrito' cambie, lo guardamos automáticamente
    useEffect(() => {
        localStorage.setItem("anthousae_carrito", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        setCarrito((carritoAnterior) => {
            const yaExisteElproducto = carritoAnterior.findIndex(
                (articulo) => articulo.id === producto.id
            );
            
            if (yaExisteElproducto >= 0) {
                const carritoActualizado = [...carritoAnterior];
                carritoActualizado[yaExisteElproducto].cantidad += 1;
                return carritoActualizado;
            } else {
                return [...carritoAnterior, { ...producto, cantidad: 1 }];
            }
        });
    };

    const actualizarCantidad = (productoId, cantidad) => {
        setCarrito((carritoAnterior) =>
            carritoAnterior.map((producto) =>
                producto.id === productoId
                    // Math.max evita que por error la cantidad baje de 1 en la base de datos
                    ? { ...producto, cantidad: Math.max(1, producto.cantidad + cantidad) }
                    : producto
            )
        );
    };

    const eliminarProducto = (productoId) => {
        setCarrito((carritoAnterior) =>
            carritoAnterior.filter((producto) => producto.id !== productoId)
        );
    };

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, actualizarCantidad, eliminarProducto }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);