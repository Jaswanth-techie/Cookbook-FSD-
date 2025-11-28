import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const Settings = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || user?.username || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await updateProfile({ name });
        if (result?.success !== false) { // Handle void return or success object
            toast.success('Profile updated successfully!');
        } else {
            toast.error(result?.message || 'Failed to update profile');
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-textMuted hover:text-textMain dark:hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface dark:bg-[#1e293b] border border-black/5 dark:border-white/5 rounded-3xl p-8 shadow-2xl"
            >
                <div className="flex items-center gap-4 mb-8 border-b border-black/5 dark:border-white/5 pb-6">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <User size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-textMain dark:text-white">Account Settings</h1>
                        <p className="text-textMuted dark:text-slate-400">Manage your profile information</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-textMain dark:text-white mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#334155]/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-textMain dark:text-white mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-[#334155]/30 border border-gray-200 dark:border-white/5 rounded-xl text-gray-500 dark:text-slate-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-textMuted mt-2">Email cannot be changed</p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primaryHover hover:to-secondary text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            ) : (
                                <Save size={20} className="mr-2" />
                            )}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Settings;
