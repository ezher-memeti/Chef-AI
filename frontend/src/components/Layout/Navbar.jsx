import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';


const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const [userName, setUserName] = useState('');

    // Function to determine which section is currently in view
    const handleScroll = () => {
        const sections = ['how-it-works', 'about-us', 'faq'];

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Check if section is in viewport
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveLink(section);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Initial check for active section
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUserName = localStorage.getItem('userName');
            setUserName(storedUserName || '');
        };

        window.addEventListener('storage', handleStorageChange);

        // Load initially
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleAuthAction = () => {
        if (userName) {
            // User is logged in -> Log out
            setUserName('');
            localStorage.removeItem('userName');
        } else {
            // User is not logged in -> Redirect to login
            window.location.href = '/login';
        }
    };

    // Link component with active state handling
    const NavLink = ({ href, children }) => {
        const sectionId = href.replace('#', '');
        const isActive = activeLink === sectionId;

        return (
            <a
                href={href}
                className={`px-4 py-2 rounded transition flex items-center justify-center h-10 w-32 ${isActive
                    ? 'bg-my-navbar-active-gradient backdrop-blur-[2px] transition text-black'
                    : 'text-white hover:text-gray-300'
                    }`}
                onClick={() => setActiveLink(sectionId)}
            >
                {children}
            </a>
        );
    };

    return (
        <nav className="w-full fixed top-0 left-0 flex items-center justify-between px-8 bg-transparent z-50">
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-24 w-24" />

            {/* Empty Middle */}
            <div className="flex-1"></div>

            {/* Links + Sign Up Button */}
            <div className="navbar-container flex items-center gap-2">
                <NavLink href="#how-it-works">How it Works</NavLink>
                <NavLink href="#about-us">About Us</NavLink>
                <NavLink href="#faq">FAQ</NavLink>
                <div className="flex items-center gap-4">
                    {userName && (
                        <span className="text-white font-medium animate-fade-in">
                            Welcome, {userName}
                        </span>
                    )}
                    <button
                        onClick={handleAuthAction}
                        className="bg-white text-[#3E3E3E] border-[0.1px] border-solid border-white px-6 py-2 rounded-lg bg-my-button-gradient hover:text-white transition"
                    >
                        {userName ? 'Log Out' : 'Sign In'}
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;