/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'my-button-gradient': 'linear-gradient(55deg, #A3B18A 30%, white 100%)',
                // you can add more custom gradients here
            },
        },
    },
    plugins: [],
};
