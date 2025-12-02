import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import logo from '../assets/logo.jpg';
import TopRightControls from './TopRightControls';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user } = useAuth();
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const allNavItems = [
        { label: 'Discover', href: '/' },
        { label: 'Favorites', href: '/favorites' },
        { label: 'About Us', href: '/about' },
        { label: 'Create', href: '/add', adminOnly: true }
    ];

    // Filter nav items based on user role
    const navItems = allNavItems.filter(item => !item.adminOnly || user?.isAdmin);

    // Use standard theme-aware colors for all pages
    const textColorClass = 'text-gray-900 dark:text-white';
    const subTextColorClass = 'text-gray-500 dark:text-slate-400';

    const navBgClass = scrolled
        ? 'bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/10'
        : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5';

    const getNavTextClass = (isActive) => {
        if (isActive) return 'text-white shadow-md';
        return 'text-gray-900 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10';
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg py-3 border-b border-black/5 dark:border-white/5'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
                        <img
                            src={logo}
                            alt="CookBook"
                            className="relative h-12 w-12 rounded-full object-cover border-2 border-white/20 shadow-lg group-hover:scale-105 transition-transform"
                        />
                    </div>
                    <div className="hidden md:flex flex-col">
                        <span className={`text-xl font-bold tracking-tight transition-colors ${textColorClass}`}>
                            CookBook
                        </span>
                        <span className={`text-[10px] uppercase tracking-widest font-medium transition-colors ${subTextColorClass}`}>
                            The Flavor Lab
                        </span>
                    </div>
                </Link>

                {/* Navigation - Hide on login page if not logged in */}
                {!(isLoginPage && !user) && (
                    <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md border shadow-sm transition-all ${navBgClass}`}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                className={({ isActive }) => `
                                    relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${getNavTextClass(isActive)}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                )}

                {/* Controls */}
                <TopRightControls />
            </div>
        </header>
    );
};

export default Header;
