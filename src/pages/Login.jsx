import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import loginHero from '../assets/login_hero_clean.png';

const Login = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true); // Default to Sign Up to match image
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

        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a] p-4 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row w-full max-w-5xl transition-colors duration-300">
                {/* Left Side - Image & Graphics */}
                <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px]">
                    <img
                        src={loginHero}
                        alt="Cooking with friends"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg font-outfit leading-tight">
                            Welcome to <br /> CookBook
                        </h1>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 bg-white dark:bg-slate-900 transition-colors duration-300">
                    <div className="w-full max-w-md mx-auto space-y-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {isSignUp ? 'Create your Free Account' : 'Welcome Back'}
                            </h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                {isSignUp ? 'Join our community of food lovers' : 'Enter your details to access your account'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {isSignUp && (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your Full Name here"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#fde047] focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-gray-500"
                                            required={isSignUp}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your Email here"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#fde047] focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-gray-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your Password here"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#fde047] focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-gray-500 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#fde047] hover:bg-[#facc15] text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        Processing...
                                    </span>
                                ) : (
                                    isSignUp ? 'Create Account' : 'Log In'
                                )}
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <button
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="text-[#eab308] font-bold hover:underline ml-1"
                                >
                                    {isSignUp ? 'Log in' : 'Sign up'}
                                </button>
                            </p>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                Reserved directs to CookBook
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
