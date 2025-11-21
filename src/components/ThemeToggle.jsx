import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-surface dark:bg-surface border-2 border-black/5 dark:border-white/10 shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun size={24} className="text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
                <Moon size={24} className="text-primary group-hover:-rotate-12 transition-transform duration-500" />
            )}
        </button>
    );
};

export default ThemeToggle;
