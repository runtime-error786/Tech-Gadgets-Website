"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Style.css';
import { cart_count, Showcart } from '@/Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { showinput } from '@/Redux/Action';

const Cart = ({ params }) => {
  const [cartItems, setCartItems] = useState([]);
  const Prod = useSelector((state) => state.Record);
  const dispatch = useDispatch();
  const [apiCalled, setApiCalled] = useState(); // Add state variable to track API call
  const price = useSelector((state) => state.Price);
  const Check = useSelector((state) => state.checkbtn);
  let urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  console.log(sessionId);

  let fetchdata = async () => {
    await dispatch(Showcart());
    const updatedProd = Prod.map(product => ({ ...product }));
    setCartItems(updatedProd);
    dispatch(cart_count());
  };

  let makepay = async () => {
    if (sessionId && !apiCalled) {
      await axios.delete('http://localhost:2001/checkout/webhook', {
        data: { sessionId },
        withCredentials: true
      })
        .then(response => {
          setApiCalled(true);
         
        })
        .catch(error => {
          toast.error("Your session expired. Please sign out and sign in again.");
        });
        await dispatch(Showcart());
        const updatedProd = Prod.map(product => ({ ...product }));
        setCartItems(updatedProd);
        dispatch(cart_count());
      urlParams = new URLSearchParams(window.location.search);
      urlParams.delete('session_id');
      const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
      window.history.replaceState({}, document.title, newUrl);

    }

  };



  useEffect(() => {
    fetchdata();
    dispatch(showinput(false));
  }, []);

  useEffect(() => {
    if (sessionId && !apiCalled) {
      const makePayment = async () => {
        await makepay();

      };
      makePayment();
    }
    fetchdata();
  }, [sessionId, apiCalled]); // useEffect watches changes in sessionId

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

      setApiCalled(false);
      if (response.status === 200) {
        console.log('Checkout successful');
        const stripePromise = await loadStripe('pk_test_51P0cjlP8GjJIjxDGEgyDXqRqhQThEMQl5KySJ1F7bhigoblE6MDvutJnx3n7LlTQx3HiA3zL9xYhnGwHTba03QpR00JWEq159G');

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (error) {
          console.error(error);
        } else {
          // Run your function here after successful payment
          console.log('Payment successful!');
        }
        fetchdata();
        dispatch(cart_count());
      } else {
        console.error('Checkout failed');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error("Your session expired. Please sign out and sign in again.");
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
