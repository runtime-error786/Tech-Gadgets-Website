"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Style.css'; // Import CSS for styling
import { Showcart } from '@/Redux/Action';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const Prod = useSelector((state) => state.Record);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Showcart());
    console.log(Prod);
    setCartItems(Prod.map(product => ({ ...product})));
  }, []);

  
  const addItem = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  
  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  
  const incrementQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  
  const decrementQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Actual Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Prod.map((item) => (
              <tr key={item}>
                <td>{item.product_name}</td>
                <td>${item.price}</td>
                <td>
                  <div className="quantity-container">
                    <button className="quantity-button" disabled={item.quantity === 1} onClick={() => decrementQuantity(item.id)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    {item.cart_qty}
                    <button className="quantity-button" onClick={() => incrementQuantity(item.id)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </td>
                <td>${item.price * item.cart_qty}</td>
                <td><button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-price">Total Price: ${getTotalPrice()}</div>
      <div className="button-container">
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
