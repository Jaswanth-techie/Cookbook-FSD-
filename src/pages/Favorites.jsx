import React, { useState, useEffect } from 'react';
import { getRecipes, updateRecipe } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await getRecipes();
            setRecipes(response.data.filter(r => r.isFavorite));
        } catch (error) {
            toast.error('Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (recipe) => {
        try {
            const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
            await updateRecipe(recipe.id, updatedRecipe);
            // Remove from list if unfavorited
            if (!updatedRecipe.isFavorite) {
                setRecipes(recipes.filter(r => r.id !== recipe.id));
            }
            toast.success('Removed from favorites');
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
                <h1 className="text-3xl font-bold text-white">My Favorites</h1>
                <span className="bg-surfaceHighlight/50 text-textMuted px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                    {recipes.length}
                </span>
            </motion.div>

            {recipes.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center bg-surface/30 border border-white/5 rounded-3xl p-8"
                >
                    <div className="bg-surfaceHighlight/30 p-6 rounded-full mb-6">
                        <Heart size={48} className="text-textMuted" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No favorites yet</h2>
                    <p className="text-textMuted mb-8 max-w-md">
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
                            <RecipeCard recipe={recipe} toggleFavorite={toggleFavorite} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Favorites;
