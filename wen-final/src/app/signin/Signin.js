"use client"
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Auth_direct, For_got } from '@/Redux/Action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import Link from "next/link"; 
import {  useSelector } from 'react-redux';

const SignInForm = ({ setForgot }) => {
   
    let For = useSelector(State => State.Forgot) ;

    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });

    const route = useRouter();
    const dispatch = useDispatch();

    const handleChangeSignin = (e) => {
        const { name, value } = e.target;
        setSignInData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:2001/signin`, signInData, {
                withCredentials: true
            });

            toast("sign in successful");
            setSignInData({
                email: "",
                password: ""
            });
           
            if(response.data.user.role === "Customer") {
                await dispatch(Auth_direct("Customer"));
                route.push("/customer");
            } else if(response.data.user.role === "Admin") {
                await dispatch(Auth_direct("Admin"));
                route.push("/admin");
            }
           
        } catch (error) {
            console.error('Failed to sign in:');
            toast("Enter correct credentials");
        }
    };

    const handleGoogleLoginSuccess = async(data) => {
        const token = data.credential;
        const decodedToken = jwtDecode(token);

        try {
            const response = await axios.post(`http://localhost:2001/signingoogle`, {token}, {
                withCredentials: true
            });

            toast("sign in successful");
            await dispatch(Auth_direct("Customer"));
            route.push("/customer");
        } catch (error) {
            console.error('Failed to sign in:');
            toast("Enter correct credentials");
        }
    };

    const handleGoogleLoginError = (error) => {
        
    };

    return (
        <div className="form-container sign-in">
            <form onSubmit={handleSubmitSignin}>
                <h1>Sign In</h1>
                <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
                <Link href="#" onClick={() => dispatch(For_got(!For))}>Forgot password</Link>
                <div id='google'>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        shape="circle"
                        text='signin'
                        type='icon'
                    />
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default SignInForm;
