import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChefHat, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignUp) {
                const result = await register(formData.name, formData.email, formData.password);
                if (result.success) {
                    toast.success('Account created successfully! 🎉');
                    navigate('/');
                } else {
                    toast.error(result.message);
                }
            } else {
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    toast.success('Welcome back to CookBook! 👨‍🍳');
                    navigate('/');
                } else {
                    toast.error(result.message);
                }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Full Background Chef Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80"
                    alt="Professional Chef Cooking"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <div className="absolute top-20 left-20 w-20 h-20 bg-primary/20 backdrop-blur-md rounded-2xl rotate-12 animate-float"></div>
                <div className="absolute bottom-40 left-40 w-16 h-16 bg-secondary/20 backdrop-blur-md rounded-full animate-float delay-500"></div>
                <div className="absolute top-1/3 right-20 w-12 h-12 bg-primary/20 backdrop-blur-md rounded-lg -rotate-12 animate-float delay-1000"></div>
                <div className="absolute bottom-20 right-1/4 w-14 h-14 bg-secondary/20 backdrop-blur-md rounded-2xl rotate-45 animate-float"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6">

                {/* Branding & Stats - Now at the top */}
                <div className="text-center mb-8 animate-fade-in">
                    {/* Logo */}
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-2xl animate-bounce-slow">
                        <ChefHat size={48} className="text-white" />
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        Your Culinary Journey
                        <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            Starts Here
                        </span>
                    </h1>
                </div>

                {/* Login/Signup Card - Now below the text */}
                <div className="w-full max-w-md animate-slide-up">
                    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
                        {/* Tab Switcher */}
                        <div className="flex gap-2 mb-8 bg-black/20 p-1 rounded-xl">
                            <button
                                onClick={() => setIsSignUp(false)}
                                className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${!isSignUp
                                    ? 'bg-white text-primary shadow-lg'
                                    : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setIsSignUp(true)}
                                className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${isSignUp
                                    ? 'bg-white text-primary shadow-lg'
                                    : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Input (Sign Up Only) */}
                            {isSignUp && (
                                <div className="group">
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-white/50 backdrop-blur-xl"
                                        required={isSignUp}
                                    />
                                </div>
                            )}

                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={20} className="text-white/70" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="chef@cookbook.com"
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-white/50 backdrop-blur-xl"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={20} className="text-white/70" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-white/50 backdrop-blur-xl"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/70 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password (Sign In Only) */}
                            {!isSignUp && (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-primary border-white/30 rounded focus:ring-primary focus:ring-2 bg-white/10"
                                        />
                                        <span className="ml-2 text-sm text-white/80 group-hover:text-white transition-colors">
                                            Remember me
                                        </span>
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-white/80 hover:text-white font-semibold transition-colors"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primaryHover hover:to-secondary text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-primary/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        {isSignUp ? 'Creating Account...' : 'Signing in...'}
                                    </>
                                ) : (
                                    <>
                                        {isSignUp ? 'Create Account' : 'Sign In'}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-transparent text-white/70">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all font-semibold text-white"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all font-semibold text-white"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    GitHub
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center mt-6 text-white/70 text-sm">
                    By continuing, you agree to CookBook's{' '}
                    <Link to="/terms" className="text-white hover:text-primary transition-colors font-semibold">
                        Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-white hover:text-primary transition-colors font-semibold">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
