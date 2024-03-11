"use client"
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Add_product = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async () => {
    if (!name || !company || !qty || !price || !description || !image || !category) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (qty <= 0 || price <= 0) {
      toast.error("Quantity and price must be greater than 0");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("company", company);
      formData.append("qty", qty);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image); 
  
      let response = await axios.post('http://localhost:2001/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
      setName("");
      setCompany("");
      setQty("");
      setPrice("");
      setDescription("");
      setImage(null);
      setCategory("");
      setUploadProgress(0);
    } catch (error) {
      toast.error("Error adding product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Add Product</h2>
        <form>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Company"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              placeholder="Quantity"
              required
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              placeholder="Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="input-container">
            <textarea
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{height:"40px",borderRadius:"7px",width:"360px",marginLeft:"2px"}}
            />
          </div>
          <div className="input-container" style={{textAlign:"center"}}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{borderRadius:"30px"}}
            >
              <option value="">Select Category</option>
              <option value="other">Other</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="desktop">Desktop</option>
              <option value="watch">Watch</option>
              <option value="tv">TV</option>
              <option value="others">Others</option>
            </select>
          </div>
          
          
          <div className="input-container" style={{ textAlign: "center" }}>
            <label htmlFor="imageInput" className="custom-file-upload">
              Pick Image
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
                setUploadProgress(100);
                }}
            />
          </div>
          {uploadProgress > 0 && (
            <div className="progress-container">
              <progress value={uploadProgress} max="100" />
            </div>
          )}
          <button id="add1" onClick={(e)=>{
            handleSubmit();
            e.preventDefault();
          }}>
            Add Product
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Add_product;
