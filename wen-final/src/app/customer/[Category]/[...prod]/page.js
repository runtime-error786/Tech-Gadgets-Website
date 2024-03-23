"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Style.css";
import Image from "next/image";

const ProductDetails = ({ params }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); 
   
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:2001/showproductwithid', {
                    params: {
                        productId: params.prod
                    },
                    withCredentials: true
                });
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [params.prod]);

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        // Check if new quantity exceeds the available stock
        if (newQuantity <= product.quantity && newQuantity >= 0) {
            setQuantity(newQuantity);
        } else if (newQuantity < 0) {
            setQuantity(0); // Prevent negative quantity
        } else {
            setQuantity(product.quantity); // Set quantity to available stock
        }
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} ${product.name}(s) to cart`);
    };

    return (
        <div className="product-details-container1">
            {product && (
                <div className="product-details1">
                    <div className="product-image1">
                        <Image src={product.imagepath} width={400} height={400} style={{borderRadius:"20px"}} alt={product.name} />
                        
                    </div>
                    <div className="product-info1">
                        <h2>{product.name}</h2>
                        <p>Brand: {product.company}</p>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>
                        {product.quantity > 0 ? (
                            <span className="in-stock">In Stock: {product.quantity}</span>
                        ) : (
                            <span className="out-of-stock">Out of Stock</span>
                        )}
                        <div className="quantity-controls1">
                            <button onClick={() => handleQuantityChange(-1)} disabled={product.quantity <= 0 || quantity <= 0}>-</button>
                            <input type="number" value={quantity} readOnly />
                            <button onClick={() => handleQuantityChange(1)} disabled={product.quantity <= 0 || quantity >= product.quantity}>+</button>
                        </div>
                        <button onClick={handleAddToCart} disabled={product.quantity <= 0 || quantity <= 0}>Add to Cart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
