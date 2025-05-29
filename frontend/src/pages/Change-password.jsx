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
        const username = localStorage.getItem('userName'); // assuming login stores this
        const { password } = formData;

        const payload = {
            username,
            newPassword: password
        };

        try {
            const response = await fetch('http://localhost:5004/api/User/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log(formData);
            console.log(payload);

            if (response.ok) {
                setIsError(false);
                setMessage('Password changed successfully!');
            } else {
                const errorText = await response.text();
                setIsError(true);
                setMessage(errorText || 'Failed to change password.');
            }
        } catch (error) {
            setIsError(true);
            setMessage(error.message || 'An error occurred.');
        }
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
