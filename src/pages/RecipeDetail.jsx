import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipe, deleteRecipe, getUserFavorites, addFavorite, removeFavorite } from '../services/api';
import { Clock, Users, ArrowLeft, Edit, Trash2, Heart, ChefHat } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        fetchRecipe();
        if (user?.id) {
            checkIfFavorite();
        }
    }, [id, user?.id]);

    useEffect(() => {
        // Reset checklist when recipe changes
        if (recipe) {
            setCheckedIngredients(new Array(recipe.ingredients.length).fill(false));
        }
    }, [recipe]);

    const fetchRecipe = async () => {
        try {
            const response = await getRecipe(id);
            setRecipe(response.data);
        } catch (error) {
            toast.error('Failed to load recipe');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const checkIfFavorite = async () => {
        try {
            const response = await getUserFavorites(user.id);
            const favorite = response.data.find(fav => fav.recipeId === id);
            if (favorite) {
                setIsFavorite(true);
                setFavoriteId(favorite.id);
            } else {
                setIsFavorite(false);
                setFavoriteId(null);
            }
        } catch (error) {
            console.error('Failed to check favorite status');
        }
    };

    const toggleIngredient = (index) => {
        const newChecked = [...checkedIngredients];
        newChecked[index] = !newChecked[index];
        setCheckedIngredients(newChecked);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await deleteRecipe(id);
                toast.success('Recipe deleted successfully');
                navigate('/');
            } catch (error) {
                toast.error('Failed to delete recipe');
            }
        }
    };

    const toggleFavorite = async () => {
        if (!user) {
            toast.error('Please login to add favorites');
            return;
        }

        try {
            if (isFavorite && favoriteId) {
                await removeFavorite(favoriteId);
                setIsFavorite(false);
                setFavoriteId(null);
                toast.success('Removed from favorites');
            } else {
                const response = await addFavorite(user.id, id);
                setIsFavorite(true);
                setFavoriteId(response.data.id);
                toast.success('Added to favorites');
            }
        } catch (error) {
            toast.error('Failed to update favorite status');
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
    if (!recipe) return null;

    return (
        <div className="min-h-screen bg-background dark:bg-slate-900 pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] w-full">
                <div className="absolute inset-0">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-slate-900 via-background/60 dark:via-slate-900/40 to-transparent" />
                </div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center px-4 py-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-primary transition-all duration-300 group border border-white/10"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
                    <div className="container mx-auto max-w-5xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg tracking-wide">
                                        {recipe.cuisine}
                                    </span>
                                    {isFavorite && (
                                        <span className="px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium flex items-center gap-1">
                                            <Heart size={14} fill="currentColor" /> Favorite
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight shadow-sm">
                                    {recipe.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed font-medium">
                                    {recipe.description}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={toggleFavorite}
                                    className={`p-4 rounded-full backdrop-blur-xl border-2 transition-all duration-300 shadow-xl ${isFavorite ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' : 'bg-white dark:bg-white/10 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/20'}`}
                                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                                </button>
                                {user?.isAdmin && (
                                    <>
                                        <Link
                                            to={`/edit/${recipe.id}`}
                                            className="p-4 rounded-full bg-white dark:bg-white/10 text-gray-700 dark:text-white backdrop-blur-xl border-2 border-gray-300 dark:border-white/20 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-xl"
                                            title="Edit Recipe"
                                        >
                                            <Edit size={24} />
                                        </Link>
                                        <button
                                            onClick={handleDelete}
                                            className="p-4 rounded-full bg-white dark:bg-white/10 text-gray-700 dark:text-white backdrop-blur-xl border-2 border-gray-300 dark:border-white/20 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-xl"
                                            title="Delete Recipe"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="container mx-auto max-w-5xl px-4 mt-12 mb-8 relative z-20">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 relative z-20">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    <div className="bg-surface dark:bg-slate-800/90 border-2 border-gray-200 dark:border-slate-600 p-6 rounded-2xl flex flex-col items-center justify-center shadow-xl hover:border-primary/50 transition-colors">
                        <Clock className="text-secondary dark:text-cyan-400 mb-3" size={32} />
                        <p className="text-textMuted dark:text-slate-300 text-sm uppercase tracking-wider font-semibold mb-1">Prep Time</p>
                        <p className="text-2xl font-bold text-textMain dark:text-white">{recipe.prepTime}</p>
                    </div>
                    <div className="bg-surface dark:bg-slate-800/90 border-2 border-gray-200 dark:border-slate-600 p-6 rounded-2xl flex flex-col items-center justify-center shadow-xl hover:border-primary/50 transition-colors">
                        <ChefHat className="text-secondary dark:text-cyan-400 mb-3" size={32} />
                        <p className="text-textMuted dark:text-slate-300 text-sm uppercase tracking-wider font-semibold mb-1">Cook Time</p>
                        <p className="text-2xl font-bold text-textMain dark:text-white">{recipe.cookTime}</p>
                    </div>
                    <div className="bg-surface dark:bg-slate-800/90 border-2 border-gray-200 dark:border-slate-600 p-6 rounded-2xl flex flex-col items-center justify-center shadow-xl hover:border-primary/50 transition-colors">
                        <Users className="text-secondary dark:text-cyan-400 mb-3" size={32} />
                        <p className="text-textMuted dark:text-slate-300 text-sm uppercase tracking-wider font-semibold mb-1">Servings</p>
                        <p className="text-2xl font-bold text-textMain dark:text-white">{recipe.servings}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Ingredients Column */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Ingredients Container */}
                        <div className="bg-white dark:bg-slate-800 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 rounded-3xl p-8 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-textMain dark:text-white flex items-center">
                                    <span className="w-1.5 h-8 bg-primary rounded-full mr-3"></span>
                                    Ingredients
                                </h2>
                                <div className="text-sm font-semibold text-textMuted dark:text-slate-300">
                                    {checkedIngredients.filter(Boolean).length}/{recipe.ingredients.length}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                                        style={{
                                            width: `${(checkedIngredients.filter(Boolean).length / recipe.ingredients.length) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="group cursor-pointer"
                                        onClick={() => toggleIngredient(index)}
                                    >
                                        <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all duration-200">
                                            {/* Custom Checkbox */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${checkedIngredients[index]
                                                    ? 'bg-primary border-primary'
                                                    : 'border-gray-300 dark:border-slate-500 group-hover:border-primary'
                                                    }`}>
                                                    {checkedIngredients[index] && (
                                                        <svg
                                                            className="w-4 h-4 text-white"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="3"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={`text-textMain dark:text-slate-100 text-lg leading-relaxed font-medium transition-all duration-300 ${checkedIngredients[index]
                                                ? 'line-through opacity-50'
                                                : ''
                                                }`}>
                                                {ingredient}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Order Missing Items - Separate Container */}
                        <div className="bg-white dark:bg-slate-800 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 rounded-3xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-textMain dark:text-white mb-4 flex items-center">
                                <span className="mr-2">🛒</span>
                                Missing Items? Order Here
                            </h3>
                            <div className="flex items-center justify-center gap-4">
                                {/* BigBasket */}
                                <a
                                    href="https://www.bigbasket.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-gray-200 dark:border-slate-600 hover:border-green-400 p-2 overflow-hidden"
                                    title="Order on BigBasket"
                                >
                                    <img
                                        src="/bigbasket-logo.png"
                                        alt="BigBasket"
                                        className="w-full h-full object-contain"
                                    />
                                </a>

                                {/* Zepto */}
                                <a
                                    href="https://www.zeptonow.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-gray-200 dark:border-slate-600 hover:border-purple-400 p-2 overflow-hidden"
                                    title="Order on Zepto"
                                >
                                    <img
                                        src="/zepto-logo.png"
                                        alt="Zepto"
                                        className="w-full h-full object-contain"
                                    />
                                </a>

                                {/* Blinkit */}
                                <a
                                    href="https://blinkit.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-gray-200 dark:border-slate-600 hover:border-yellow-400 p-2 overflow-hidden"
                                    title="Order on Blinkit"
                                >
                                    <img
                                        src="/blinkit-logo.png"
                                        alt="Blinkit"
                                        className="w-full h-full object-contain"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Instructions Column */}
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-slate-800 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 rounded-3xl p-8 md:p-10 shadow-lg">
                            <h2 className="text-3xl font-bold text-textMain dark:text-white mb-8 flex items-center">
                                <span className="w-1.5 h-10 bg-primary rounded-full mr-4"></span>
                                Instructions
                            </h2>
                            <div className="space-y-10">
                                {recipe.steps.map((step, index) => (
                                    <div key={index} className="flex gap-6 group">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 text-primary dark:text-violet-400 rounded-2xl flex items-center justify-center font-bold text-xl border-2 border-gray-300 dark:border-slate-600 shadow-lg group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 group-hover:scale-110">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="flex-grow pt-1">
                                            <p className="text-textMain dark:text-slate-100 text-xl leading-relaxed font-medium">
                                                {step}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
