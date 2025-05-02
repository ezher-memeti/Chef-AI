// AboutUs.jsx
import React from 'react';
import Layout from '../components/navbarPagesLayout'

const AboutUs = () => {
    return (
        <Layout title="About Us">
            <p>
                We are a team of food enthusiasts, nutritionists, and AI engineers who believe everyone deserves meals that match their needs and tastes.
            </p>
            <p>
                Our mission is to simplify healthy eating using smart technology, making meal planning and cooking effortless and enjoyable for everyone.
            </p>
            <p>
                Whether you're vegan, allergic to certain foods, or just want new recipe ideas, our platform is built to help you eat better with ease.
            </p>
        </Layout>
    );
};

export default AboutUs;
