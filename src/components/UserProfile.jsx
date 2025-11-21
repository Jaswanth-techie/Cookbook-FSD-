import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Heart, ChefHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully! 👋');
        navigate('/login');
        setIsOpen(false);
    };

    if (!user) return null;

    // Get first letter of name or email
    const getInitial = () => {
        if (user.name) {
            return user.name.charAt(0).toUpperCase();
        }
        if (user.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    // Generate color based on initial
    const getAvatarColor = () => {
        const initial = getInitial();
        const colors = [
            'bg-gradient-to-br from-violet-500 to-purple-600',
            'bg-gradient-to-br from-blue-500 to-cyan-600',
            'bg-gradient-to-br from-green-500 to-emerald-600',
            'bg-gradient-to-br from-orange-500 to-red-600',
            'bg-gradient-to-br from-pink-500 to-rose-600',
            'bg-gradient-to-br from-indigo-500 to-blue-600',
        ];
        const index = initial.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-white/20 dark:border-white/10`}
                aria-label="User menu"
            >
                {getInitial()}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-slate-700 overflow-hidden animate-slide-up z-[1003]">
                    {/* User Info */}
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border-b-2 border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                {getInitial()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-textMain dark:text-white truncate">
                                    {user.name || 'User'}
                                </p>
                                <p className="text-sm text-textMuted dark:text-slate-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-textMain dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                        >
                            <User size={20} className="text-textMuted dark:text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="font-medium">My Profile</span>
                        </Link>

                        <Link
                            to="/favorites"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-textMain dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                        >
                            <Heart size={20} className="text-textMuted dark:text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="font-medium">My Favorites</span>
                        </Link>

                        <Link
                            to="/add"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-textMain dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                        >
                            <ChefHat size={20} className="text-textMuted dark:text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="font-medium">Add Recipe</span>
                        </Link>

                        <Link
                            to="/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-textMain dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                        >
                            <Settings size={20} className="text-textMuted dark:text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="font-medium">Settings</span>
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t-2 border-gray-200 dark:border-slate-700 p-2">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-xl group font-medium"
                        >
                            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
