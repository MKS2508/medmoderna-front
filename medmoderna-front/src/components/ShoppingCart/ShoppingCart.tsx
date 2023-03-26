import React, { useState } from 'react';
import styled from 'styled-components';

const CartButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const CartList = styled.ul`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 6px;
  list-style-type: none;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  color: #fff;
`;

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Producto 1', price: 50 },
        { id: 2, name: 'Producto 2', price: 100 },
    ]);

    const handleRemoveItem = (id:any) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <CartButton>Carrito ({cartItems.length})</CartButton>
            <CartList>
                {cartItems.map((item) => (
                    <CartItem key={item.id}>
                        <span>{item.name}</span>
                        <span>
              ${item.price}{' '}
                            <button onClick={() => handleRemoveItem(item.id)}>&times;</button>
            </span>
                    </CartItem>
                ))}
                <hr />
                <CartItem>
                    <strong>Total:</strong>
                    <strong>${totalPrice}</strong>
                </CartItem>
            </CartList>
        </div>
    );
};

export default Cart;
