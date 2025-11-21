import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-black/5 dark:border-white/5 bg-surface/50 dark:bg-[#1e293b]/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-6 py-12 text-center">
                <h3 className="text-2xl font-bold text-textMain dark:text-white mb-2">CookBook</h3>
                <p className="text-textMuted dark:text-[#94a3b8] text-sm mb-8">Crafted with passion for the culinary arts.</p>
                <div className="flex justify-center space-x-6 text-textMuted dark:text-[#94a3b8] text-sm">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>
                <p className="text-textMuted/50 dark:text-[#94a3b8]/50 text-xs mt-12">&copy; {new Date().getFullYear()} CookBook Inc.</p>
            </div>
        </footer>
    );
};

export default Footer;
