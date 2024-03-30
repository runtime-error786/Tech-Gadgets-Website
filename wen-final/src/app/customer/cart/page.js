"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Style.css';
import { cart_count, Showcart } from '@/Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const Prod = useSelector((state) => state.Record);
  const dispatch = useDispatch();
  const price = useSelector((state) => state.Price);
  const Check = useSelector((state) => state.checkbtn);
  
  let fetchdata = async () => {
    await dispatch(Showcart());
    const updatedProd = Prod.map(product => ({ ...product }));
    setCartItems(updatedProd);
    dispatch(cart_count());
  };
  

  useEffect(() => {
    fetchdata();
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

  const removeItem = async (productId) => {
    await axios.delete('http://localhost:2001/removecart', {
      data: { productId },
      withCredentials: true
    })
      .then(response => {
        fetchdata();
        dispatch(cart_count());
      })
      .catch(error => {
        toast.error("Your session expired. Please sign out and sign in again.");
      });
  };

  const incrementQuantity = async (productId, qty) => {
    await axios.put('http://localhost:2001/Updatecart', { productId, qty }, { withCredentials: true })
      .then(response => {
        fetchdata();
      })
      .catch(error => {
        toast.error("Your session expired. Please sign out and sign in again.");
      });
  };

  const decrementQuantity = async (productId, qty) => {
    await axios.put('http://localhost:2001/Updatecart', { productId, qty }, { withCredentials: true })
      .then(response => {
        fetchdata();
      })
      .catch(error => {
        toast.error("Your session expired. Please sign out and sign in again.");
      });
  };

  const getTotalPrice = () => {
    return price;
  };

  const checkout = async () => {
    try {

      const response = await axios.post('http://localhost:2001/checkout', null, {
        withCredentials: true
      });


      if (response.status === 200) {
        console.log('Checkout successful');
        fetchdata();
        dispatch(cart_count());
      } else {
        console.error('Checkout failed');

      }
    } catch (error) {
      console.error('Error during checkout:', error);

    }
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
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.price}</td>
                <td>
                  <div className="quantity-container">
                    <button
                      className={`quantity-button ${item.cart_qty === 1 ? 'disabled1' : ''}`}
                      disabled={item.cart_qty === 1}
                      onClick={() => decrementQuantity(item.id, item.cart_qty - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    {item.cart_qty}
                    <button
                      className={`quantity-button ${item.cart_qty >= item.original_qty ? 'disabled1' : ''}`}
                      disabled={item.cart_qty === item.original_qty}
                      onClick={() => incrementQuantity(item.id, item.cart_qty + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  {item.original_qty < item.cart_qty && <div className='out1'>Out of Stock</div>}
                </td>
                <td>${item.price * item.cart_qty}</td>
                <td>
                  <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-price">Total Price: ${getTotalPrice()}</div>
      <div className="button-container">
        <button
          onClick={checkout}
          disabled={Check}
          className={`checkout-button ${Check ? 'disabled2' : ''}`}
        >
          Checkout
        </button>

      </div>
      <Toaster />
    </div>
  );
};

export default Cart;
