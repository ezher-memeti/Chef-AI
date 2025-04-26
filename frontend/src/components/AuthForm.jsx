// src/components/AuthForm.jsx
import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isLogin = true, heading, subheading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [username, setUsername] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // For registration, check password match
        if (!isLogin && password !== reEnterPassword) {
            alert("Passwords do not match!");
            return;
        }

        onSubmit({ email, password, username, securityQuestion, securityAnswer });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const securityQuestions = [
        "What was your first car?",
        "What city were you born in?",
    ];

    const isFormValid = isLogin
        ? email && password
        : username && email && password && reEnterPassword && securityQuestion && securityAnswer;

    return (
        <div className="w-full md:w-1/2 flex justify-center items-center py-8 md:py-0">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 w-full max-w-md md:max-w-lg shadow-lg border border-white border-opacity-20">
                <h2 className="text-center text-3xl font-bold text-white mb-8">{heading}</h2>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    {!isLogin && (
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-white mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                placeholder="Enter your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Re-enter Password */}
                    {!isLogin && (
                        <div className="mb-6">
                            <label htmlFor="reenter-password" className="block text-white mb-2">Re-enter Password</label>
                            <input
                                type="password"
                                id="reenter-password"
                                className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                placeholder="Re-enter your Password"
                                value={reEnterPassword}
                                onChange={(e) => setReEnterPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* Security Question */}
                    {!isLogin && (
                        <div className="mb-6 flex flex-col md:flex-row gap-4">
                            {/* Security Question */}
                            <div className="w-full md:w-1/2">
                                <label htmlFor="security-question" className="block text-white mb-2">Security Question</label>
                                <select
                                    id="security-question"
                                    className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                    value={securityQuestion}
                                    onChange={(e) => setSecurityQuestion(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select a question</option>
                                    {securityQuestions.map((question, index) => (
                                        <option key={index} value={question}>{question}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Security Answer */}
                            <div className="w-full md:w-1/2">
                                <label htmlFor="security-answer" className="block text-white mb-2">Answer</label>
                                <input
                                    type="text"
                                    id="security-answer"
                                    className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                    placeholder="Your Answer"
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full py-3 ${isFormValid
                            ? 'bg-my-button-gradient hover:text-white hover:scale-[1.02]'
                            : 'bg-my-button-gradient cursor-not-allowed'
                            } transition-all duration-300 ease-in rounded-md text-black font-medium mt-4`}
                    >
                        {isLogin ? 'Log-in' : 'Register'}
                    </button>

                    {/* Forgot Password */}
                    {isLogin && (
                        <div className="text-center mt-4">
                            <a href="/forgot-password" className="text-myTextPrimary hover:underline text-sm">
                                Forgot Password?
                            </a>
                        </div>
                    )}

                    {/* Switch Between Login and Register */}
                    <div className="text-center mt-6 text-myTextPrimary text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <a href={isLogin ? "/register" : "/login"} className="ml-1 text-myLink hover:underline font-bold">
                            {isLogin ? "Register here" : "Log-in here"}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
