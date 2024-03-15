"use client"
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInForm from './Signin';
import SignUpForm from './Signup';
import ForgotPasswordForm from './Forgot';
import "./Style.css";
import Script1 from './Script';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
    const [forgot, setForgot] = useState(true);
    let dispatch = useDispatch();
    let For = useSelector(State => State.Forgot) ;

    return (
        <div className="container1" id="container1">
            {For ? 
            <>
            <SignInForm />  
            <SignUpForm></SignUpForm>
            </>
            : 
            <>
            <ForgotPasswordForm />
            <SignUpForm></SignUpForm>
            </>
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
