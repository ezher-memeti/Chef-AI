// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const handleLogin = async (formData) => {
        try {
            console.log('Login data:', formData);

            const response = await fetch('http://localhost:5004/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Optionally extract additional user data from backend response if needed
                localStorage.setItem('userName', formData.Username);
                // localStorage.setItem('userId', userId); // If backend sends this info

                // Redirect to homepage
                setError(''); // Clear any previous error
                navigate('/searchRecipePage');
            } else {
                const errorText = await response.text();
                setError(errorText); // Show error inside card
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred while logging in.');
        }
    };


    return (
        <div className="w-full py-[100px] flex justify-center items-center">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row">
                {/* Left side with welcome message */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pl-16 text-white text-center md:text-left py-8 md:py-0">
                    <h1 className="text-5xl font-bold bg-my-text-gradient bg-clip-text text-transparent md:text-6xl mb-4 leading-tight">
                        Welcome<br />Back!
                    </h1>

                    <p className="text-xl text-myTextPrimary opacity-90">
                        Ready to create your next<br />
                        AI-powered recipe?
                    </p>
                </div>

                {/* Right side with login form */}
                <AuthForm
                    onSubmit={handleLogin}
                    isLogin={true}
                    type="login"
                    heading="Log In"
                    subheading="Access your account and manage your tasks"
                />
                {error && (
                    <div className="text-red-500 bg-red-100 border border-red-300 rounded-md px-4 py-2 mb-4">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
