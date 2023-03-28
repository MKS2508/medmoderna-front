// App.tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Carrito from "../../components/Pago/Carrito";
import Pago from "../../components/Pago/Pago";
import PasarelaPago from "../../components/Pago/PasarelaPago";
import LayoutBase from "../../components/LayoutBase/LayoutBase";


const stripePromise = loadStripe('pk_test_51MqQWnLXltkSeDhWSm4OTUnr6dFWUUJaVnW4Bk61q2vbtVxniDyg6rYyXXMmn3ehQeGFWysF0fK7rNqPTMiGk0JB00r5FdEeTm');

const Pagos: React.FC = () => {
    return (
        <LayoutBase  useBaseAutoHeightHeader={false}>
            <Carrito />
            <Pago />
            <Elements stripe={stripePromise}>
                <PasarelaPago />
            </Elements>
        </LayoutBase>
    );
};

export default Pagos;
