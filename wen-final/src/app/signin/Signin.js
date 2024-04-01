import React from 'react';
import Link from "next/link";
import { GoogleLogin } from '@react-oauth/google';
import { faL } from '@fortawesome/free-solid-svg-icons';

const SignInForm = ({
    handleChangeSignin,
    handleSubmitSignin,
    forgot,
    handleGoogleLoginSuccess,
    handleGoogleLoginError,
    signInData,
    setforgot,
    handleSubmitSigninForgot,
    forgotverificationCodeSent,
    forgotverificationCodeFromAPI,
    forgotuserVerificationCode,
    confirmforgot,
    ForgothandleSendVerificationCode,
    setforgotVerificationCodeSent,
    setforgotUserVerificationCode,
    setforgotVerificationCodeFromAPI,
    setconfirmforgot,
    setshowpasswordchange,
    showpasswordchange,
    CkeckPin
}) => {
    return (
        < form >
            {forgot ?
                <>
                    <h1>Sign In</h1>
                    <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                    <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
                    <Link href="" onClick={() => {
                        setforgot(false);
                        setconfirmforgot(false)
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
                    <Link href="/customer/all">Home</Link>
                </> : <>

                    {
                        !confirmforgot ?
                            <>
                                <h1>Verify Email</h1>
                                <input type="email" name="email" value={signInData.email} onChange={handleChangeSignin} placeholder="Email" required />
                                <button type="submit" onClick={(e) => {
                                    ForgothandleSendVerificationCode(e);
                                    setconfirmforgot(true);
                                }}>Send OTP</button>
                                <h6 className='mt-4' onClick={() => {
                                    setforgot(true);
                                }}>Back</h6>
                            </> :
                            <>
                                {
                                    showpasswordchange ?

                                        <>
                                            <h1>Enter Code</h1>
                                            <input type="text" value={forgotuserVerificationCode} onChange={(e) => setforgotUserVerificationCode(e.target.value)} placeholder="Enter Verification Code" required />
                                            <button type="submit" onClick={(e) => {
                                                CkeckPin(e);
                                                
                                            }}>Verify</button>
                                            <h6 className='mt-4' onClick={() => {
                                                setconfirmforgot(false);
                                            }}>Back</h6>
                                        </> :
                                        <>
                                            <h1>Enter New Password</h1>
                                            <input type="password" name="password" value={signInData.password} onChange={handleChangeSignin} placeholder="Password" required />
                                            <button onClick={handleSubmitSigninForgot}>Submit</button>
                                            <Link href="" onClick={() => {
                                                setforgot(true)
                                                setshowpasswordchange(true)
                                            }}>Sign in</Link>
                                        </>
                                }


                            </>
                    }






                </>
            }
        </form >
    );
}

export default SignInForm;
