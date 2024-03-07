"use client"
import React, { useState } from 'react';
import Script from "next/script";
import Script1 from './Script';
import { GoogleLogin } from '@react-oauth/google';
import "./Style.css";
import Link from "next/link";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { Test } from '@/Redux/Action';
const Form = () => {
    const Test1 = useSelector((state) => state.Test);
  
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        country: "",
        password: "",
        file: null
    });

    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });

    const handleChangeSignin = (e) => {
        const { name, value } = e.target;
        setSignInData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitSignin = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", signInData);
        try {
            const response = await axios.post(`http://localhost:2001/signin`, signInData, {
                withCredentials: true
            });

            toast("sign in successful");
            setSignInData({
                email: "",
                password: ""
            });
        } catch (error) {
            console.error('Failed to sign in:');
            toast("Enter correct credentials");

           
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSignupData(prevState => ({
            ...prevState,
            file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', signupData.name);
        formData.append('email', signupData.email);
        formData.append('country', signupData.country);
        formData.append('password', signupData.password);
        formData.append('file', signupData.file);

        console.log("Form submitted:", signupData);
        try {
            const response = await axios.post('http://localhost:2001/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast("Register Successfully");
            setSignupData({
                name: "",
                email: "",
                country: "",
                password: "",
                file: null
            });
        } catch (error) {
            console.error('Failed to submit form:', error.response.data);
            toast("Register Failed");
        }
    };

    const handleGoogleLoginSuccess = async(data) => {
        const token = data.credential;
        console.log(token);

        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        try {
            const response = await axios.post(`http://localhost:2001/signingoogle`, {token}, {
                withCredentials: true
            });

            toast("sign in successful");
        } catch (error) {
            console.error('Failed to sign in:');
            toast("Enter correct credentials");

        }
    };

    const handleGoogleLoginError = (error) => {
        
    };
    return (
        <div className="container1" id="container1">
            <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input type="text" name="name" value={signupData.name} onChange={handleChange} placeholder="Name" required />
                    <input type="email" name="email" value={signupData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="text" name="country" value={signupData.country} onChange={handleChange} placeholder="Country" required />
                    <input type="password" name="password" value={signupData.password} onChange={handleChange} placeholder="Password" required />
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form >
                    <h1>Sign In</h1>
                    <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                    <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
                    <div id='google'>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        shape="circle"
                        text='signin'
                        type='icon'
                    />
                    </div>
                    <button onClick={handleSubmitSignin}>Sign in</button>
                    <Link href="/customer">Home</Link>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all site features</p>
                        <button className="hidden" id="login">Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, User!</h1>
                        <p>Register with your personal details to use all site features</p>
                        <button className="hidden" id="register">Sign Up</button>
                    </div>
                </div>
            </div>
            <Script1></Script1>
            <ToastContainer />
        </div>

    );
}

export default Form;
