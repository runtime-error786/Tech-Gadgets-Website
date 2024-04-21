import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { faL } from '@fortawesome/free-solid-svg-icons';

const SignUpForm = ({
    handleChange,
    handleFileChange,
    uploadProgress,
    handleSendVerificationCode,
    verificationCodeSent,
    userVerificationCode,
    setUserVerificationCode,
    signupData,
    handleSubmit,
    setUploadProgress,
    setVerificationCodeSent,
    setmsg,
    msg
}) => {
    

   
    const isPasswordValid = (password) => {
        // Check if password contains at least 7 characters with at least one special character
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/.test(password);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (uploadProgress !== 100) {
            setmsg(true);
            return; 
        }
        if (!isPasswordValid(signupData.password)) {
          
            toast.error('Password must contain at least 7 characters with at least one special character and one English character');
            return; 
        }
        console.log("s");
        setmsg(false);
        handleSendVerificationCode(e);
    };
    const handleVerification = (e) => {
        e.preventDefault();
        handleSubmit(e);
       
    };
    

    return (
        <form onSubmit={verificationCodeSent ? handleVerification : handleSignUp}>
            {!verificationCodeSent ? (
                <>
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
                            name='file'
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            
                            onChange={(e) => {
                                handleFileChange(e);
                            }}
                        />
                    </div>
                    {uploadProgress > 0 && (
                        <div className="progress-container">
                            <progress value={uploadProgress} max="100" />
                        </div>
                    )}
                    {msg && <p className="insert-image-message">Insert image</p>}

                    <button type="submit">Sign Up</button>
                </>
            ) : (
                <>
                    <h1>Verify Email</h1>
                    <input type="text" value={userVerificationCode} onChange={(e) => setUserVerificationCode(e.target.value)} placeholder="Enter Verification Code" required />
                    <button type="submit">Verify</button>
                    <h6 className='mt-4' onClick={() => {
                        setVerificationCodeSent(false);
                    }}>Back</h6>
                </>
            )}
        </form>
    );
}

export default SignUpForm;
