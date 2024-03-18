import React from 'react';
import Link from "next/link";
import { GoogleLogin } from '@react-oauth/google';

const SignInForm = ({
    handleChangeSignin,
    handleSubmitSignin,
    forgot,
    handleGoogleLoginSuccess,
    handleGoogleLoginError,
    signInData,
    setforgot,
    handleSubmitSigninForgot,
    forgotverificationCodeSent
}) => {
    return (
        < form >
            {forgot ?
                <>
                    <h1>Sign In</h1>
                    <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                    <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
                    <Link href="" onClick={() => {
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
                </> : <>
                    <h1>Forgot password</h1>
                    <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                    <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />

                    <button onClick={handleSubmitSigninForgot}>Submit</button>
                    <Link href="" onClick={() => {
                        setforgot(true)
                    }}>Sign in</Link>
                </>
                }
        </form >
    );
}

export default SignInForm;
