import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipe, deleteRecipe, updateRecipe } from '../services/api';
import { Clock, Users, ArrowLeft, Edit, Trash2, Heart, ChefHat } from 'lucide-react';
import toast from 'react-hot-toast';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipe();
    }, [id]);

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
        try {
            const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
            await updateRecipe(recipe.id, updatedRecipe);
            setRecipe(updatedRecipe);
            toast.success(updatedRecipe.isFavorite ? 'Added to favorites' : 'Removed from favorites');
        } catch (error) {
            toast.error('Failed to update favorite status');
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
    if (!recipe) return null;

    return (
        <div className="min-h-screen bg-background pb-20">
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
                                    {recipe.isFavorite && (
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
                                    className={`p-4 rounded-full backdrop-blur-xl border-2 transition-all duration-300 shadow-xl ${recipe.isFavorite ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' : 'bg-white dark:bg-white/10 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/20'}`}
                                    title={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Heart size={24} fill={recipe.isFavorite ? "currentColor" : "none"} />
                                </button>
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
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 rounded-3xl p-8 sticky top-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-textMain dark:text-white mb-6 flex items-center">
                                <span className="w-1.5 h-8 bg-primary rounded-full mr-3"></span>
                                Ingredients
                            </h2>
                            <ul className="space-y-4">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-start space-x-3 group">
                                        <div className="w-2 h-2 bg-secondary dark:bg-cyan-400 rounded-full mt-2.5 group-hover:scale-125 transition-transform" />
                                        <span className="text-textMain dark:text-slate-100 text-lg leading-relaxed font-medium">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-slate-600">
                                <h3 className="text-sm font-bold text-textMuted dark:text-slate-300 uppercase tracking-wider mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-700 text-textMain dark:text-slate-100 text-sm font-medium border-2 border-gray-200 dark:border-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-default">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructions Column */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 rounded-3xl p-8 md:p-10 shadow-lg">
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
