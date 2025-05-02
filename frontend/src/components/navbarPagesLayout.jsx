import React from 'react';

const NavbarPagesLayout = ({ title, children }) => {
    return (
        <div className="flex justify-center items-center min-h-screen to-black text-myTextPrimary">
            <div className="w-full max-w-4xl p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-myTextPrimary">{title}</h1>
                <div className="space-y-4">{children}</div>
            </div>
        </div>
    );
};

export default NavbarPagesLayout;