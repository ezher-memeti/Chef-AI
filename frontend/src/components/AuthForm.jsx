// src/components/AuthForm.jsx
import React, { useState } from 'react';

const AuthForm = ({
    onSubmit,
    type,
    isLogin = true,
    heading,
    subheading,
    securityQuestions = [],
    securityQuestionFromBackend
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [username, setUsername] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData;
        if (isLogin) {
            formData = { email, password };
        } else if (type === "forgotPassword") {
            formData = { email, password, securityAnswer };
        } else if (type === "register") {
            formData = { email, username, password, securityQuestion, securityAnswer };
        }


        onSubmit(formData);
        window.dispatchEvent(new Event('storage'));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isFormValid = isLogin
        ? email && password && isEmailValid(email)
        : (username &&
            email &&
            password &&
            reEnterPassword &&
            password === reEnterPassword &&
            securityQuestion &&
            securityAnswer &&
            isEmailValid(email))
        ||
        (email && isEmailValid(email) && password && reEnterPassword && password === reEnterPassword && securityAnswer && type === 'forgotPassword');

    return (
        <div className="w-full md:w-1/2 flex justify-center items-center py-8 md:py-0">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 w-full max-w-md md:max-w-lg shadow-lg border border-white border-opacity-20">
                <h2 className="text-center text-3xl font-bold text-white mb-2">{heading}</h2>
                {subheading && (
                    <p className="text-center text-white mb-6 text-sm">{subheading}</p>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Username field for register*/}
                    {(type === "register") && (
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-white mb-2">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                            />
                        </div>
                    )}
                    {/* Email for all */}
                    {(
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-white mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                            />
                            {email && !isEmailValid(email) && (
                                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                            )}
                        </div>
                    )}
                    {/* Password for all pages */}

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white mb-2">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {/*Re enter password for register and reset password  */}
                    {!isLogin && (
                        <>
                            <div className="mb-6">
                                <label htmlFor="reenter-password" className="block text-white mb-2">Re-enter Password</label>
                                <input
                                    id="reenter-password"
                                    type="password"
                                    placeholder="Re-enter your Password"
                                    value={reEnterPassword}
                                    onChange={(e) => setReEnterPassword(e.target.value)}
                                    required
                                    className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                />
                                {password && reEnterPassword && password !== reEnterPassword && (
                                    <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                                )}
                            </div>

                            <div className="mb-6 flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/2">
                                    <label htmlFor="security-question" className="block text-white mb-2">Security Question</label>
                                    {/* Dropdown of security questions for register */}
                                    {(type === "register") && (
                                        <select
                                            id="security-question"
                                            value={securityQuestion}
                                            onChange={(e) => setSecurityQuestion(e.target.value)}
                                            required
                                            className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                        >
                                            <option value="" disabled>Select a question</option>
                                            {securityQuestions.map((question, index) => (
                                                <option key={index} value={question}>
                                                    {question}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    {/* Predefined security question for forgot password */}
                                    {(type === "forgotPassword") && (
                                        <div className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition">a{securityQuestionFromBackend}</div>
                                    )}
                                </div>

                                <div className="w-full md:w-1/2">
                                    <label htmlFor="security-answer" className="block text-white mb-2">Answer</label>
                                    <input
                                        id="security-answer"
                                        type="text"
                                        placeholder="Your Answer"
                                        value={securityAnswer}
                                        onChange={(e) => setSecurityAnswer(e.target.value)}
                                        required
                                        className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full py-3 bg-my-button-gradient transition-all duration-300 ease-in rounded-md text-black font-medium mt-4 ${isFormValid ? 'hover:text-white hover:scale-[1.02]' : 'cursor-not-allowed'
                            }`}
                    >
                        {isLogin ? 'Log-in' : type === 'forgotPassword' ? 'Reset Password' : 'Register'}
                    </button>

                    {/* Extra options below button */}
                    <div className="text-center mt-4 text-myTextPrimary text-sm">
                        {isLogin && (
                            <>
                                <a href="/forgot-password" className="hover:underline block mb-2">
                                    Forgot Password?
                                </a>
                                <span>
                                    Don't have an account?{' '}
                                    <a href="/register" className="text-myLink hover:underline font-bold ml-1">
                                        Register here
                                    </a>
                                </span>
                            </>
                        )}

                        {!isLogin && type === 'register' && (
                            <span>
                                Already have an account?{' '}
                                <a href="/login" className="text-myLink hover:underline font-bold ml-1">
                                    Log-in here
                                </a>
                            </span>
                        )}

                        {type === 'forgotPassword' && (
                            <span>
                                Remember your password?{' '}
                                <a href="/login" className="text-myLink hover:underline font-bold ml-1">
                                    Log-in here
                                </a>
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
