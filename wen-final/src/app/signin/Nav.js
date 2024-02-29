"use client"
import React from 'react';
import Script from "next/script";
import Script1 from './Script';
import { GoogleLogin } from '@react-oauth/google';
import "./Style.css";
import Link from "next/link";
const Sidebar = () => {
    let hello = ()=>{
    
    }
    return (
        <div className="container1" id="container1">
            <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <input type="text"
                        placeholder="Name" />
                    <input type="email"
                        placeholder="Email" />
                    <input type="password"
                        placeholder="Password" />
                        <input type="file"/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <input type="email"
                        placeholder="Email" />
                    <input type="password"
                        placeholder="Password" />
                        <GoogleLogin/>
                    <button>Sign in</button>
                    <Link href="/home">Home</Link>
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
        </div>
        
    );
}

export default Sidebar;
