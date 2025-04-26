// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import backgroundImage1 from '../../assets/background-1-login.png';
import backgroundImage2 from '../../assets/background-2-login.png';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-[1000px] w-full relative bg-[#DCD7C9]">
            {/* First background image */}
            <div
                className="absolute top-0 left-0 w-full h-[490px] bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url(${backgroundImage1})` }}
            ></div>

            {/* Second background image overlay */}
            <div
                className="absolute top-0 left-0 w-full h-[70%] bg-cover bg-center bg-no-repeat z-1"
                style={{ backgroundImage: `url(${backgroundImage2})` }}
            ></div>

            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <div className="flex-grow relative z-10 p-8 mt-8 flex justify-center items-center">
                {children}
            </div>


            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;