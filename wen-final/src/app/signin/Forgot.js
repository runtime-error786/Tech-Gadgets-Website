import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { For_got } from '@/Redux/Action';
import Link from "next/link";

const ForgotPasswordForm = () => {
    let dispatch = useDispatch();
    let For = useSelector(State => State.Forgot) ;

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

    const handleSubmitSigninForgot = async (e) => {
        e.preventDefault();
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

    return (
        <div className="form-container sign-in">
            <form onSubmit={handleSubmitSigninForgot}>
                <h1>Forgot password</h1>
                <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
                <button type="submit">Submit</button>
                <Link href="#" onClick={() => dispatch(For_got(!For))}>Sign In</Link>

            </form>
        </div>
    );
}

export default ForgotPasswordForm;
