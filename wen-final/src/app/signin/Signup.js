import React from 'react';

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
    setVerificationCodeSent
}) => {
    return (
        <form >
            {!verificationCodeSent ? (<>
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
                <button type="submit" onClick={(e) => {
                    handleSendVerificationCode(e);
                }}>Sign Up</button>

            </>) : (
                <>
                    <h1>Verify Email</h1>
                    <input type="text" value={userVerificationCode} onChange={(e) => setUserVerificationCode(e.target.value)} placeholder="Enter Verification Code" required />
                    <button type="submit" onClick={(e) => {
                        handleSubmit(e);
                    }}>Verify</button>
                     <h6 className='mt-4' onClick={()=>{
                        setVerificationCodeSent(false);
                     }}>Back</h6>
                </>

            )}
        </form>
    );
}

export default SignUpForm;
