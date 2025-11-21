import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PillNav from './PillNav';
import logo from '../assets/logo.jpg';

const Header = () => {
    const location = useLocation();

    return (
        <div className="relative h-24">
            {/* Logo and Brand Name on the left */}
            <div className="absolute left-6 top-4 z-[1001]">
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src={logo}
                        alt="The Flavor Lab - CookBook & Recipes"
                        className="h-16 w-16 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-all border-2 border-primary/20 group-hover:border-primary/40 group-hover:scale-105"
                    />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-textMain dark:text-white tracking-tight group-hover:text-primary transition-colors">
                            CookBook
                        </span>
                        <span className="text-xs text-textMuted dark:text-[#94a3b8] font-medium tracking-wide">
                            The Flavor Lab
                        </span>
                    </div>
                </Link>
            </div>

            {/* Centered Navigation */}
            <PillNav
                items={[
                    { label: 'Discover', href: '/' },
                    { label: 'Favorites', href: '/favorites' },
                    { label: 'About Us', href: '/about' },
                    { label: 'Create', href: '/add' }
                ]}
                activeHref={location.pathname}
                baseColor="transparent"
                pillColor="#8b5cf6"
                pillTextColor="#111827"
                hoveredPillTextColor="#ffffff"
                className="mx-auto"
            />
        </div>
    );
};

export default Header;
