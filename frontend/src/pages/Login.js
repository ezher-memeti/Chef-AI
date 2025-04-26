// src/pages/Login.jsx
import React from 'react';

export default function Login() {
    return (
        <div className="login-page">
            <h1>Chef AI</h1>
            <form className="login-form">
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
