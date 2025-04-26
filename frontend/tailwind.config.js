/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                myTextPrimary: '#3E3E3E',
                myTextSecondary: 'white',
                myLink: '#A3B18A',
            },
            backgroundImage: {
                'my-button-gradient': 'linear-gradient(30deg, #A3B18A 10%, white 80%)',
                'my-text-gradient': 'linear-gradient(110deg,white 20%, #A9D6E5 70%)',
                'my-navbar-active-gradient': 'linear-gradient(55deg, #FFFFFFA1 1%, transparent 100%)',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'fade-in': 'fade-in 1s ease-in forwards',
            },
        },
    },
    plugins: [],
};
