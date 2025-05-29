import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // or any icon library you're using

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
    const isLoggedIn = !!localStorage.getItem('userName'); // or check for 'userId'
    return (
        <nav className="w-full fixed top-0 left-0 flex items-center justify-between px-8 bg-transparent z-50">
            {isLoggedIn ? (
                <Link to="/searchRecipePage">
                    <img src={logo} alt="Logo" className="h-24 w-24 cursor-pointer" />
                </Link>
            ) : (
                <img src={logo} alt="Logo" className="h-24 w-24 opacity-50 cursor-default" />
            )}

            <div className="flex-1"></div>

            <div className="navbar-container flex items-center gap-2">
                <NavLink href="/howItWorks">How it Works</NavLink>
                <NavLink href="/aboutUs">About Us</NavLink>
                <NavLink href="/FAQ">FAQ</NavLink>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => {
                            if (!userName) navigate('/');
                            else setDropdownOpen(!dropdownOpen);
                        }}
                        className="relative focus:outline-none"
                    >
                        <div className="flex items-center gap-1 p-2 rounded-full">
                            <UserCircleIcon className="w-8 h-8 text-white hover:text-black transition" />
                        </div>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-50 text-sm text-gray-700">
                            <div className="px-4 py-2 font-semibold border-b">{userName}</div>
                            <Link
                                to="/bookmarks"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Bookmarks
                            </Link>
                            <Link
                                to="/preferences"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Preferences
                            </Link>
                            <Link
                                to="/ChangePassword"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Change Password
                            </Link>
                            <button
                                onClick={() => {
                                    setDropdownOpen(false);
                                    handleLogOut();
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Log Out
                            </button>
                        </div>

                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
