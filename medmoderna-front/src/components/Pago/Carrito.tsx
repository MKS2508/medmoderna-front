// Carrito.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Carrito: React.FC = () => {
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Producto 1', cantidad: 1 },
        { id: 2, nombre: 'Producto 2', cantidad: 1 },
    ]);

    const modificarCantidad = (id: number, cantidad: number) => {
        setProductos(
            productos.map((producto) =>
                producto.id === id ? { ...producto, cantidad } : producto
            )
        );
    };

    const eliminarProducto = (id: number) => {
        setProductos(productos.filter((producto) => producto.id !== id));
    };

    return (
        <GlassContainer>
            <h2>Carrito</h2>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre}
                        <input
                            type="number"
                            value={producto.cantidad}
                            onChange={(e) =>
                                modificarCantidad(producto.id, parseInt(e.target.value))
                            }
                        />
                        <button onClick={() => eliminarProducto(producto.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </GlassContainer>
    );
};

export default Carrito;
