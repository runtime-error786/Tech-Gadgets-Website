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
import { Auth_direct, Test } from '@/Redux/Action';
import { usePathname,useRouter } from 'next/navigation'; 
import { faL } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
    const Test1 = useSelector((state) => state.Rol);
    const route = useRouter();
    let dispatch = useDispatch();
    const [uploadProgress, setUploadProgress] = useState(0);
    let [forgot,setforgot] = useState(true);

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
           
            if(response.data.user.role=="Customer")
            {
              
                await dispatch(Auth_direct("Customer"));
                console.log("hw");
                route.push("/customer");
               

           }
           else if(response.data.user.role=="Admin")
           {
            console.log(response.data.user.role);
            await dispatch(Auth_direct("Admin"));
            console.log("hw");
            route.push("/admin");
           }
           
        } catch (error) {
            console.error('Failed to sign in:');
            toast("Enter correct credentials");

           
        }
    };

    const handleSubmitSigninForgot = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", signInData);
        try {
            const response = await axios.post(`http://localhost:2001/signinForgot`, signInData, {
                withCredentials: true
            });

            toast("password change successful");
            setSignInData({
                email: "",
                password: ""
            });
           
          
           
        } catch (error) {
            console.error('Failed to sign in:');
            toast("Enter valid email");
        }
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
            setUploadProgress(0);
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
            await dispatch(Auth_direct("Customer"));
            console.log("hw");
            route.push("/customer");
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
                handleFileChange(e);
                setUploadProgress(100);
                }}
            />
          </div>
          {uploadProgress > 0 && (
            <div className="progress-container">
              <progress value={uploadProgress} max="100" />
            </div>
          )}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
           {forgot ?  <div className="form-container sign-in">
                <form >
                    <h1>Sign In</h1>
                    <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                    <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
                    <Link href="" onClick={()=>{
                    setforgot(false)
                }}>Forgot Password</Link>
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
            :<div className="form-container sign-in">
            <form >
                <h1>Forgot password</h1>
                <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
               
                <button onClick={handleSubmitSigninForgot}>Submit</button>
                <Link href="" onClick={()=>{
                    setforgot(true)
                }}>Sign in</Link>
            </form>
        </div>
          }
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
