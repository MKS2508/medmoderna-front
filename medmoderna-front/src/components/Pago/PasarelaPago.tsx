import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { PayPalButton } from "react-paypal-button-v2";

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const PasarelaPago: React.FC = () => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleStripeSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message || 'Ocurrió un error al procesar el pago');
        } else {
            // Aquí debes enviar el ID de paymentMethod a tu servidor para procesar el pago
            console.log('PaymentMethod ID:', paymentMethod?.id);
        }
    };

    const handlePayPalSuccess = (details: any) => {
        // Aquí debes enviar el ID de transacción de PayPal a tu servidor para procesar el pago
        console.log('PayPal Transaction ID:', details.transaction.id);
    }

    return (
        <GlassContainer>
            <h2>Pasarela de pago</h2>
            <form onSubmit={handleStripeSubmit}>
                <CardElement />
                <button disabled={!stripe} type="submit">
                    Pagar con Stripe
                </button>
                {error && <p>{error}</p>}
            </form>
            <PayPalButton
                amount="10.00"
                onSuccess={handlePayPalSuccess}
                options={{
                    clientId: "Afd4zHN8F2GDtyhjSpZkOaRd6h8lW6-LNk7kczZjEE0AXXjTvA1OP2syXyTnSs98KwNB-wvXrglwSSjl"
                }}
            />
        </GlassContainer>
    );
};

export default PasarelaPago;
