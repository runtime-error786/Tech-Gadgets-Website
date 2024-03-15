import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUpForm = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        country: "",
        password: "",
        file: null
    });
    const [uploadProgress, setUploadProgress] = useState(0);

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

    return (
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
    );
}

export default SignUpForm;
