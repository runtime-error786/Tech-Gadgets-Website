"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import "./Style..css";
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Picset } from '@/Redux/Action';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const initialUserData = {
        name: '',
        email: '',
        country: '',
        picture: '',
        role: ''
    };

    const [userData, setUserData] = useState(initialUserData);
    const [editMode, setEditMode] = useState(false);
    let [image1, setimg] = useState(null);
    let [boolimg, setbool] = useState('false');

    const formData = new FormData();
    const Profilepic = useSelector((state) => state.Profilepic);
    let dis = useDispatch();


    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:2001/Showprofile', { withCredentials: true });
            setUserData(response.data.profile);
            console.log(response.data.profile.profilePicUrl);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            toast.error("Your session expire.Please Sign out & Sign in again");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
        setimg(null);
        setbool('false');
        fetchProfileData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            formData.append('name', userData.name);
            formData.append('email', userData.email);
            formData.append('country', userData.country);
            formData.append('image', image1);
            formData.append('boolimg', boolimg);

            const headers = {
                'Content-Type': 'multipart/form-data',
            };

            await axios.post('http://localhost:2001/upprofile', formData, {
                withCredentials: true,
                headers: headers
            });



            toggleEditMode();
            fetchProfileData();
            formData.delete('name');
            formData.delete('email');
            formData.delete('country');
            formData.delete('image');
            formData.delete('boolimg');
            dis(Picset());
            setimg(null);
            setbool('false');
        } catch (error) {
            console.error('Error updating profile data:', error);
            toast.error("Your session expire.Please Sign out & Sign in again");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        setUserData(prevData => ({
            ...prevData,
            picture: file
        }));
        console.log(file);
        setimg(file);
        setbool('true');
    };

    return (
        <>
        <div className="profile-container">
            <h2>Profile</h2>

            <div className="profile-picture-container">
                {
                    image1 === null ?
                        <>
                            {userData.profilePicUrl && (
                                <div className="profile-picture">
                                    <div className="image-wrapper">
                                        <Image id='img1' src={userData.profilePicUrl} width={200} height={200} alt="Profile Picture" />
                                        {editMode && (
                                            <label htmlFor="imageInput" className="camera-icon">
                                                📷
                                                <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}
                        </> : null
                }

                {image1 && (
                    <div className="preview-picture">
                        <img id='img1' src={URL.createObjectURL(image1)} width={200} height={200} alt="Preview" />
                    </div>
                )}
            </div>



            <form onSubmit={handleSubmit}>
                <div className="profile-details">
                    <div className='prof1'>
                        <TextField
                            id="outlined-read-only-input"
                            value={userData.name}
                            InputProps={{
                                readOnly: !editMode,
                            }}
                            label="Name"
                            variant="outlined"
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='prof1'>
                        <TextField
                            id="outlined-read-only-input"
                            value={userData.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Email"
                            variant="outlined"
                            name="Email"
                        />
                    </div>
                </div>

                <div className="profile-details">
                    <div className='prof1'>
                        <TextField
                            id="outlined-read-only-input"
                            value={userData.country}
                            InputProps={{
                                readOnly: !editMode,
                            }}
                            variant="outlined"
                            name="country"
                            label="Country"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='prof1'>
                        <TextField
                            id="outlined-read-only-input"
                            value={userData.role}
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Role"
                            variant="outlined"
                            name="role"
                        />
                    </div>
                </div>



                <div className="button-group">
                    <button
                        type="button"
                        onClick={toggleEditMode}
                        className={editMode ? "edit" : "discard"}
                    >
                        {editMode ? "Discard" : "Edit"}
                    </button>

                    {editMode && <button type="submit" id='action2' style={{ backgroundColor: "green", color: "white" }}>Save</button>}
                </div>
            </form>
           
        </div>
         <ToastContainer />
         </>
    );
};

export default Profile;
