import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, Heart, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

const Profile = () => {
    const { user, logout } = useAuth();

    // Mock stats for now
    const stats = [
        { label: 'Recipes Created', value: 0, icon: BookOpen, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/10' },
        { label: 'Favorites', value: 5, icon: Heart, color: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-500/10' },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface dark:bg-[#1e293b] border border-black/5 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 mt-4">
                    <div className="w-32 h-32 rounded-full bg-surfaceHighlight dark:bg-[#334155] border-4 border-surface dark:border-[#1e293b] shadow-xl flex items-center justify-center text-4xl font-bold text-primary overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                            <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
                        )}
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-textMain dark:text-white mb-2">{user?.name || user?.username || 'User'}</h1>
                        <div className="flex items-center justify-center md:justify-start text-textMuted dark:text-slate-400 gap-2">
                            <Mail size={16} />
                            <span>{user?.email || 'user@example.com'}</span>
                        </div>
                    </div>
                    <div className="md:ml-auto self-start mt-2">
                        <button
                            onClick={logout}
                            className="px-6 py-2 bg-gray-100 dark:bg-[#334155]/50 hover:bg-red-50 dark:hover:bg-red-500/20 text-gray-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-white/5 hover:border-red-200 dark:hover:border-red-500/30 rounded-xl transition-all flex items-center gap-2"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="bg-gray-50 dark:bg-[#334155]/30 border border-gray-200 dark:border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-[#334155]/50 transition-colors"
                        >
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-textMain dark:text-white">{stat.value}</div>
                                <div className="text-textMuted dark:text-slate-400 text-sm">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
