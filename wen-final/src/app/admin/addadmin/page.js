"use client";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Add_admin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async () => {
    if (!name || !email || !country || !password || !image) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("country", country);
      formData.append("password", password);
      formData.append("image", image); 
  
      let response = await axios.post('http://localhost:2001/addAdmin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true 
      });
      
      toast.success(response.data.message);
      setName("");
      setCountry("");
      setEmail("");
      setPassword("");
      setImage(null);
      setUploadProgress(0);
    } catch (error) {
      toast.error("Error adding admin");
      console.error("Error adding admin:", error);
    }
  };
  

  return (
    <>
      <div className="login-container">
        <h2>Add Admin</h2>
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
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
            Add Admin
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Add_admin;
