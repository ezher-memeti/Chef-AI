// src/components/Layout.jsx
import React from 'react';
import '../styles/Layout.css';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper flex flex-col min-h-screen">
            <div className="background-overlay"></div>
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <div className="page-content">
                {children}
            </div>
            {/* Footer */}
            <Footer />
        </div >
    );
};

export default Layout;
