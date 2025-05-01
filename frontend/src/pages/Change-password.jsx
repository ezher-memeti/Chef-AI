import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';

const ChangePassword = () => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('userName');
        if (storedUserId && storedUsername) {
            setUserId(storedUserId);
            setUsername(storedUsername);
        }
    }, []);

    const handleChangePasswordSubmit = async (formData) => {
        const payload = {
            ...formData,
            userId,
            username
        };

        //test remove when backend included
        console.log('Sending to backend:', payload);
        setIsError(false);
        setMessage('Password changed successfully!');

        // try {
        //     const response = await fetch('/api/change-password', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(payload)
        //     });

        //     if (response.ok) {
        //         setIsError(false);
        //         setMessage('Password changed successfully!');
        //     } else {
        //         const error = await response.json();
        //         setIsError(true);
        //         setMessage(error.message || 'Failed to change password.');
        //     }
        // } catch (error) {
        //     setIsError(true);
        //     setMessage(error.message || 'An error occurred.');
        // }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
            <AuthForm
                heading="Change Password"
                type="changePassword"
                isLogin={false}
                onSubmit={handleChangePasswordSubmit}
            />
            {message && (
                <div className={`mt-4 font-medium text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
