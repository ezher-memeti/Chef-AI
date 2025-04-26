// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form submitted:', { email, password });

            const fakeUserName = 'John Doe';
            localStorage.setItem('userName', fakeUserName);

            // Force a reload to re-run Navbar's useEffect
            window.location.href = '/';
        } catch (error) {
            console.error('Login error:', error);
        }
    };



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full flex justify-center items-center">
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
                <div className="w-full md:w-1/2 flex justify-center items-center py-8 md:py-0">
                    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 w-full max-w-md md:max-w-lg shadow-lg border border-white border-opacity-20">
                        <h2 className="text-center text-3xl font-bold text-white mb-8">Log-in</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-white mb-2">E-Mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                    placeholder="Enter your E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-white mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                        placeholder="Enter your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-my-button-gradient hover:text-white hover:scale-[1.02] transition-all duration-300 ease-in rounded-md text-black font-medium mt-4"
                            >
                                Log-in
                            </button>

                            <div className="text-center mt-4">
                                <a href="/forgot-password" className="text-myTextPrimary hover:underline text-sm">
                                    Forgot Password?
                                </a>
                            </div>

                            <div className="text-center mt-6 text-myTextPrimary text-sm">
                                Don't have an account?
                                <a href="/register" className="ml-1 text-myLink hover:underline font-bold">
                                    Register here
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;