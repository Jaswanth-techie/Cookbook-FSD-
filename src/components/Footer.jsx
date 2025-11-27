import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Footer = () => {
    return (
        <footer className="relative bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 pt-20 pb-10 overflow-hidden border-t border-gray-100 dark:border-white/5 transition-colors duration-300">


            {/* Background Glow Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[128px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group w-fit">
                            <img
                                src={logo}
                                alt="CookBook"
                                className="h-12 w-12 rounded-full object-cover border-2 border-gray-100 dark:border-white/10 shadow-lg group-hover:scale-105 transition-transform"
                            />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                                    CookBook
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-slate-500 font-medium">
                                    The Flavor Lab
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">
                            Discover, create, and share culinary masterpieces with a community of passionate food lovers. Your journey to chef mastery starts here.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Discover Recipes', href: '/' },
                                { label: 'Trending Now', href: '/' },
                                { label: 'Master Chefs', href: '/about' },
                                { label: 'Culinary Events', href: '#' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600 group-hover:bg-primary transition-colors"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Support</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Help Center', href: '#' },
                                { label: 'Privacy Policy', href: '#' },
                                { label: 'Terms of Service', href: '#' },
                                { label: 'Cookie Policy', href: '#' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600 group-hover:bg-primary transition-colors"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Stay Updated</h4>
                        <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest recipes and cooking tips.
                        </p>
                        <form className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={18} />
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primaryHover hover:to-secondary text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group"
                            >
                                Subscribe
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 dark:text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} CookBook Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-slate-500">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Systems Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
