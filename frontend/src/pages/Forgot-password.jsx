import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm'; // adjust the path if needed

const ForgotPassword = () => {
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // Fetch the security question based on email (or username)
    const fetchSecurityQuestion = async (email) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/get-security-question?email=${email}`);
            const data = await response.json();

            if (response.ok) {
                setSecurityQuestion(data.question);
            } else {
                setError('Unable to retrieve security question. Please check your email.');
            }
        } catch (error) {
            setError('Error fetching the security question.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPasswordSubmit = (formData) => {
        console.log('Forgot Password Submit:', formData);
        // Your forgot password logic here
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <AuthForm
                heading="Reset Password"
                subheading="Answer your security question to reset your password"
                isLogin={false} // Because forgot password usually behaves like registration flow
                type="forgotPassword"
                onSubmit={handleForgotPasswordSubmit}
                securityQuestionFromBackend="TestQuestion"
            />
        </div>
    );
};

export default ForgotPassword;
