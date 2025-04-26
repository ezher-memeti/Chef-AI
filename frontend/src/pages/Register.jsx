// src/pages/RegisterPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    const securityQuestions = [
        'What was your childhood nickname?',
        'In what city did you meet your spouse?',
        'What is the name of your favorite childhood friend?',
        'What street did you live on in third grade?',
        'What is your oldest sibling’s birthday month and year?'
    ];

    const navigate = useNavigate();

    const handleRegister = ({ formData }) => {
        console.log('Register form data:', formData);

        // Example: send this data to your backend
        /*
        {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          securityQuestion: formData.securityQuestion,
          securityAnswer: formData.securityAnswer
        }
        */

        // Redirect after successful register
        navigate('/');

    };

    return (
        <div className="w-full py-[50px] flex justify-center items-center">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row">
                {/* Left side with welcome message */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pl-16 text-white text-center md:text-left py-8 md:py-0">
                    <h1 className="text-5xl font-bold bg-my-text-gradient bg-clip-text text-transparent md:text-6xl mb-4 leading-tight">
                        Join the<br />Creative
                        Revolution
                    </h1>

                    <p className="text-xl text-myTextPrimary opacity-90">
                        Get Started with AI Recipe Creation!
                    </p>
                </div>

                {/* Right side with register form */}
                <AuthForm
                    onSubmit={handleRegister}
                    isLogin={false}
                    type="register"
                    heading="Create Account"
                    subheading="Join the platform and get started"
                    securityQuestions={securityQuestions}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
