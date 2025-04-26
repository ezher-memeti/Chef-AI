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
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
        reEnterPassword: '',
        username: '',
        securityQuestion: '',
        securityAnswer: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormFields(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, username, securityQuestion, securityAnswer } = formFields;

        const formData = isLogin
            ? { email, password }
            : { email, username, password, securityQuestion, securityAnswer };

        onSubmit(formData);
        window.dispatchEvent(new Event('storage'));
    };

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const { email, password, reEnterPassword, username, securityQuestion, securityAnswer } = formFields;

    const isFormValid = isLogin
        ? email && password && isEmailValid(email)
        : username && email && password && reEnterPassword &&
        password === reEnterPassword &&
        securityQuestion && securityAnswer && isEmailValid(email);

    const InputField = ({ id, label, type = "text", placeholder, value, required = true, extra = {} }) => (
        <div className="mb-6">
            <label htmlFor={id} className="block text-white mb-2">{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required={required}
                className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                {...extra}
            />
        </div>
    );

    return (
        <div className="w-full md:w-1/2 flex justify-center items-center py-8 md:py-0">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 w-full max-w-md md:max-w-lg shadow-lg border border-white border-opacity-20">
                <h2 className="text-center text-3xl font-bold text-white mb-2">{heading}</h2>
                {subheading && <p className="text-center text-white mb-6 text-sm">{subheading}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && type !== "forgotPassword" && (
                        <InputField id="username" label="Username" placeholder="Enter your Username" value={username} />
                    )}

                    {type !== "forgotPassword" && (
                        <>
                            <InputField id="email" label="Email" placeholder="Enter your Email" value={email} type="email" />
                            {email && !isEmailValid(email) && (
                                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                            )}
                        </>
                    )}

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white mb-2">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your Password"
                                value={password}
                                onChange={handleChange}
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

                    {!isLogin && (
                        <>
                            <InputField
                                id="reEnterPassword"
                                label="Re-enter Password"
                                placeholder="Re-enter your Password"
                                type="password"
                                value={reEnterPassword}
                            />
                            {password && reEnterPassword && password !== reEnterPassword && (
                                <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                            )}

                            <div className="mb-6 flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/2">
                                    <label htmlFor="security-question" className="block text-white mb-2">Security Question</label>
                                    {type === "register" ? (
                                        <select
                                            id="securityQuestion"
                                            value={securityQuestion}
                                            onChange={handleChange}
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
                                    ) : (
                                        <div className="w-full p-3 rounded-md bg-white bg-opacity-80 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition">
                                            {securityQuestionFromBackend}
                                        </div>
                                    )}
                                </div>

                                <div className="w-full md:w-1/2">
                                    <InputField
                                        id="securityAnswer"
                                        label="Answer"
                                        placeholder="Your Answer"
                                        value={securityAnswer}
                                    />
                                </div>
                            </div>
                        </>
                    )}

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

                    {isLogin && (
                        <div className="text-center mt-4">
                            <a href="/forgot-password" className="text-myTextPrimary hover:underline text-sm">
                                Forgot Password?
                            </a>
                        </div>
                    )}

                    <div className="text-center mt-6 text-myTextPrimary text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <a
                            href={isLogin ? '/register' : '/login'}
                            className="ml-1 text-myLink hover:underline font-bold"
                        >
                            {isLogin ? 'Register here' : 'Log-in here'}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
