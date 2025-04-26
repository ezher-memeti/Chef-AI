import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 flex items-center justify-between px-8 bg-transparent z-50">
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-[99px] w-[95px]" />

            {/* Empty Middle */}
            <div className="flex-1"></div>

            {/* Links + Sign Up Button */}
            <div className="navbar-container flex items-center gap-8">
                <a href="#how-it-works" className="text-white hover:text-gray-300 transition">
                    How it Works
                </a>
                <a href="#about-us" className="text-white hover:text-gray-300 transition">
                    About Us
                </a>
                <a href="#faq" className="text-white hover:text-gray-300 transition">
                    FAQ
                </a>
                <button className="bg-white text-[#3E3E3E] border-[1px] border-solid border-white px-6 py-2 rounded-lg bg-my-button-gradient hover:text-white transition">
                    Sign In
                </button>
            </div>
        </nav>
    );
};

export default Navbar;