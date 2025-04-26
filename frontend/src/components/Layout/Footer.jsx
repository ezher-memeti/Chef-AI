import logo from '../../assets/logo.svg';

export default function Footer() {
    return (
        <footer className="text-gray-800 mt-auto text-[10px]">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row  border-2 py-2 border-transparent border-t-[#00000011] justify-around items-start space-y-10 md:space-y-0">
                    {/* Logo */}
                    <div>
                        <img src={logo} alt="Logo" className="h-24" />
                    </div>

                    {/* Pages Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Pages</h3>
                        <ul className="space-y-2">
                            <li><a href="#how-it-workds" className="hover:underline">How it Works</a></li>
                            <li><a href="#about-us" className="hover:underline">About Us</a></li>
                            <li><a href="#faq" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold">Pages</h3>
                        <ul className="space-y-2">
                            <li><a href="#privacy" className="hover:underline">Privacy</a></li>
                            <li><a href="#terms" className="hover:underline">Terms</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>


                    {/* Follow Us Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Follow Us</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Instagram</a></li>
                            <li><a href="#" className="hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:underline">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 text-center text-sm">
                    Copyright © ChefAI 2025
                </div>
            </div>
        </footer>
    );
}
