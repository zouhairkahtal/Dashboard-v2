import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/Dashboard' },
        { name: 'Budgets', path: '/BudgetForm' },
    ];

    return (
        <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 bg-white/20 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40 px-6">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <NavLink to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        FinDash
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                        : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    <NavLink
                        to="/LogIn"
                        className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-white/50"
                    >
                        Log in
                    </NavLink>
                    <NavLink
                        to="/SignUp"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Sign up
                    </NavLink>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            <svg className="block h-6 w-6 transform rotate-90 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                <div className="px-3 pt-3 pb-4 space-y-2 sm:px-4 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 relative z-50">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl text-base font-semibold transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-800 hover:bg-white/80 hover:text-blue-600'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-200/60 flex flex-col space-y-3 px-1">
                        <NavLink
                            to="/LogIn"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center px-4 py-3 text-base font-semibold text-gray-800 hover:text-blue-600 hover:bg-white/80 rounded-xl transition-colors duration-200"
                        >
                            Log in
                        </NavLink>
                        <NavLink
                            to="/SignUp"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Sign up
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
