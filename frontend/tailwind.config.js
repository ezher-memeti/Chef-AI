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
                'my-text-gradient': 'linear-gradient(140deg,white 0%, #A9D6E5 50%)',
                'my-navbar-active-gradient': 'linear-gradient(55deg, #FFFFFFA1 1%, transparent 100%)',
                // you can add more custom gradients here
            },
        },
    },
    plugins: [],
};
