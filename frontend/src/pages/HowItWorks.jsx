// HowItWorks.jsx
import React from 'react';
import Layout from '../components/navbarPagesLayout'

const HowItWorks = () => {
    return (
        <Layout title="How It Works">
            <p>
                Our personalized recipe recommendation engine analyzes your dietary preferences and allergy information to provide you with meals tailored just for you.
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li>Create an account and set your preferences</li>
                <li>Explore AI-curated recipes daily</li>
                <li>Bookmark your favorites for quick access</li>
                <li>Update your preferences anytime to refine results</li>
            </ul>
            <p>
                With a focus on your health and taste, we make cooking easier, smarter, and more personalized.
            </p>
        </Layout>
    );
};

export default HowItWorks;
