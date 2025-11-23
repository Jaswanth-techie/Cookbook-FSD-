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

                {/* Login/Signup Card */}
                <div className="w-full max-w-md animate-slide-up">
                    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
                        {/* Tab Switcher */}
                        <div className="flex gap-2 mb-8 bg-black/40 p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setIsSignUp(false)}
                                className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${!isSignUp
                                    ? 'bg-orange-500 text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setIsSignUp(true)}
                                className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${isSignUp
                                    ? 'bg-orange-500 text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
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
                                    <label className="block text-sm font-semibold text-white/90 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-black/30 border-2 border-white/10 rounded-xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-white placeholder:text-white/30 backdrop-blur-sm"
                                        required={isSignUp}
                                    />
                                </div>
                            )}

                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-white/90 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={20} className="text-white/50" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="chef@cookbook.com"
                                        className="w-full pl-12 pr-4 py-3 bg-black/30 border-2 border-white/10 rounded-xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-white placeholder:text-white/30 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-white/90 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={20} className="text-white/50" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3 bg-black/30 border-2 border-white/10 rounded-xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-white placeholder:text-white/30 backdrop-blur-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
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
                                            className="w-4 h-4 text-orange-500 border-white/30 rounded focus:ring-orange-500 focus:ring-2 bg-black/30"
                                        />
                                        <span className="ml-2 text-sm text-white/70 group-hover:text-white transition-colors">
                                            Remember me
                                        </span>
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-white/70 hover:text-orange-400 font-semibold transition-colors"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
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
