import React, { useState, useEffect } from 'react';
import { getRecipes, getUserFavorites, removeFavorite } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, [user?.id]);

    const fetchFavorites = async () => {
        try {
            // Fetch user's favorites
            const favoritesResponse = await getUserFavorites(user.id);
            setUserFavorites(favoritesResponse.data);

            // Fetch all recipes
            const recipesResponse = await getRecipes();

            // Filter recipes to only show favorited ones
            const favoriteRecipeIds = favoritesResponse.data.map(fav => fav.recipeId);
            const favoriteRecipes = recipesResponse.data.filter(recipe =>
                favoriteRecipeIds.includes(recipe.id)
            );

            setRecipes(favoriteRecipes);
        } catch (error) {
            toast.error('Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (recipe) => {
        if (!user) {
            toast.error('Please login to manage favorites');
            return;
        }

        try {
            const existingFavorite = userFavorites.find(
                fav => fav.userId === user.id && fav.recipeId === recipe.id
            );

            if (existingFavorite) {
                await removeFavorite(existingFavorite.id);
                setUserFavorites(userFavorites.filter(fav => fav.id !== existingFavorite.id));
                setRecipes(recipes.filter(r => r.id !== recipe.id));
                toast.success('Removed from favorites');
            }
        } catch (error) {
            toast.error('Failed to update favorite status');
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
            >
                <Heart className="text-primary fill-primary" size={32} />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Favorites</h1>
                <span className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-white px-3 py-1 rounded-full text-sm font-medium border border-gray-200 dark:border-slate-600">
                    {recipes.length}
                </span>
            </motion.div>

            {recipes.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-surface/30 border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-sm dark:shadow-none"
                >
                    <div className="bg-gray-100 dark:bg-surfaceHighlight/30 p-6 rounded-full mb-6">
                        <Heart size={48} className="text-gray-400 dark:text-textMuted" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h2>
                    <p className="text-gray-600 dark:text-textMuted mb-8 max-w-md">
                        Start exploring our collection of delicious recipes and save the ones you love!
                    </p>
                    <Link
                        to="/"
                        className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primaryHover hover:to-secondary text-white rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center font-bold hover:scale-105"
                    >
                        <Search size={20} className="mr-2" /> Browse Recipes
                    </Link>
                </motion.div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {recipes.map(recipe => (
                        <motion.div key={recipe.id} variants={item}>
                            <RecipeCard recipe={recipe} toggleFavorite={toggleFavorite} isFavorite={true} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Favorites;
