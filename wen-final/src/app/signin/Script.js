"use client"
import { useEffect } from 'react';

const Script1 = () => {
    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        const handleRegisterClick = () => {
            container.classList.add("active");
        };

        const handleLoginClick = () => {
            container.classList.remove("active");
        };

        registerBtn.addEventListener('click', handleRegisterClick);
        loginBtn.addEventListener('click', handleLoginClick);

        // Cleanup event listeners
        return () => {
            registerBtn.removeEventListener('click', handleRegisterClick);
            loginBtn.removeEventListener('click', handleLoginClick);
        };
    }, []); // Empty dependency array ensures it only runs on mount and unmount

    return null; // Script doesn't render any components
}

export default Script1;
