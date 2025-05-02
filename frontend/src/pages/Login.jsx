// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (formData) => {
        console.log('Login data:', formData);

        // Fake login logic
        const fakeUserName = 'John Doe';
        const fakeUserId = 12;
        localStorage.setItem('userName', fakeUserName);
        localStorage.setItem('userId', fakeUserId);

        // Redirect to homepage
        navigate('/');
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
            </div>
        </div>
    );
};

export default LoginPage;
