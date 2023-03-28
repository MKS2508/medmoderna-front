// Pago.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Pago: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');

    const realizarPago = () => {
        // Aquí debes agregar la lógica para procesar el pago usando Stripe o PayPal
        console.log('Realizando pago', nombre, direccion);
    };

    return (
        <GlassContainer>
            <h2>Pago</h2>
            <label>
                Nombre:
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </label>
            <label>
                Dirección:
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
            </label>
            <button onClick={realizarPago}>Pagar</button>
        </GlassContainer>
    );
};

export default Pago;
