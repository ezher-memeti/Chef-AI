// FAQ.jsx
import React from 'react';
import Layout from '../components/navbarPagesLayout'

const FAQ = () => {
    const questions = [
        {
            q: "Is this service free to use?",
            a: "Yes! All core features including recipe suggestions and preferences are free."
        },
        {
            q: "Can I change my preferences later?",
            a: "Absolutely. You can update your allergy or dietary preferences anytime from your profile."
        },
        {
            q: "How are the recipes selected?",
            a: "Our AI model matches your preferences with a vast database of recipes and ranks them based on relevance."
        },
        {
            q: "Do you support multiple dietary preferences?",
            a: "Yes, you can select more than one dietary category such as Vegan and Gluten-Free."
        },
    ];

    return (
        <Layout title="Frequently Asked Questions">
            {questions.map((item, i) => (
                <div key={i} className="p-4 border border-black rounded-lg">
                    <h3 className="font-semibold text-myTextPrimary mb-2">{item.q}</h3>
                    <p className="text-myTextPrimary">-{item.a}</p>
                </div>
            ))}
        </Layout>
    );
};

export default FAQ;
