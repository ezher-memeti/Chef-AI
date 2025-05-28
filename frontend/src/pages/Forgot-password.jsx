import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [error, setError] = useState('');
    const [questionFetched, setQuestionFetched] = useState(false);
    const [storedUsername, setStoredUsername] = useState('');

    const navigate = useNavigate();

    const fetchSecurityQuestion = async (userName) => {
        setError('');
        try {
            const response = await fetch(`http://localhost:5004/api/User/security-question?username=${userName}`);
            const data = await response.json();

            if (response.ok) {
                setSecurityQuestion(data.question);
                setStoredUsername(userName); // Store to use later for validation/reset
                setQuestionFetched(true);
            } else {
                setError('Unable to retrieve security question. Please check your username.');
                setSecurityQuestion('');
                setQuestionFetched(false);
            }
        } catch (error) {
            setError('Error fetching the security question.');
            setSecurityQuestion('');
            setQuestionFetched(false);
        }
    };

    const handleForgotPasswordSubmit = async (formData) => {
        const { username, password, securityAnswer } = formData;

        try {
            // Step 1: Validate the security answer
            const answerRes = await fetch('http://localhost:5004/api/User/validate-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    answer: securityAnswer,
                }),
            });

            if (!answerRes.ok) {
                setError('Incorrect security answer.');
                return;
            }

            // Step 2: Reset the password
            const resetRes = await fetch('http://localhost:5004/api/User/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    newPassword: password,
                }),
            });

            if (!resetRes.ok) {
                setError('Failed to update password. Try again.');
                return;
            }

            // Success
            // alert('Password reset successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <AuthForm
                heading="Reset Password"
                subheading="Answer your security question to reset your password"
                type="forgotPassword"
                onSubmit={handleForgotPasswordSubmit}
                fetchSecurityQuestion={fetchSecurityQuestion}
                securityQuestionFromBackend={securityQuestion}
                Error={error}
            />
        </div>
    );
};

export default ForgotPassword;
