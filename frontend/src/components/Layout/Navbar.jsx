import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const [userName, setUserName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleScroll = () => {
        const sections = ['how-it-works', 'about-us', 'faq'];

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveLink(section);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
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
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogOut = () => {
        setUserName('');
        localStorage.removeItem('userName');
        setDropdownOpen(false); // Close dropdown
        navigate('/');
    };

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
            <Link to="/">
                <img src={logo} alt="Logo" className="h-24 w-24 cursor-pointer" />
            </Link>

            <div className="flex-1"></div>

            <div className="navbar-container flex items-center gap-2">
                <NavLink href="#how-it-works">How it Works</NavLink>
                <NavLink href="#about-us">About Us</NavLink>
                <NavLink href="#faq">FAQ</NavLink>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => {
                            if (!userName) navigate('/login');
                            else setDropdownOpen(!dropdownOpen);
                        }}
                        className="bg-white text-[#3E3E3E] border-[0.1px] border-white px-6 py-2 rounded-lg bg-my-button-gradient hover:text-white transition flex items-center gap-2"
                    >
                        {userName ? `Profile` : 'Sign In'}
                        {userName && <ChevronDownIcon className="w-4 h-4" />}
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-50 text-sm text-gray-700">
                            <div className="px-4 py-2 font-semibold border-b">{userName}</div>
                            <Link to="/bookmarks" className="block px-4 py-2 hover:bg-gray-100">Bookmarks</Link>
                            <Link to="/preferences" className="block px-4 py-2 hover:bg-gray-100">Preferences</Link>
                            <Link to="/ChangePassword" className="block px-4 py-2 hover:bg-gray-100">Change Password</Link>
                            <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Log Out</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
