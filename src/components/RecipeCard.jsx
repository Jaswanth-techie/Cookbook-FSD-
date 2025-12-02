import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Heart, ArrowRight } from 'lucide-react';

const RecipeCard = ({ recipe, toggleFavorite, isFavorite = false }) => {
    return (
        <div className="group relative bg-surface dark:bg-[#1e293b] border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface dark:from-[#1e293b] via-transparent to-transparent z-10 opacity-60" />
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80";
                    }}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(recipe);
                    }}
                    className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 ${isFavorite ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-black/30 text-white/70 hover:bg-black/50 hover:text-white'}`}
                >
                    <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-white backdrop-blur-sm shadow-lg">
                        {recipe.cuisine}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative">
                <h3 className="text-xl font-bold text-textMain dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {recipe.title}
                </h3>
                <p className="text-textMuted dark:text-[#94a3b8] text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {recipe.description}
                </p>

                <div className="flex items-center justify-between text-textMuted dark:text-[#94a3b8] text-xs font-medium bg-surfaceHighlight/30 dark:bg-[#334155]/30 rounded-xl p-3 mb-4">
                    <div className="flex items-center space-x-1.5">
                        <Clock size={14} className="text-secondary" />
                        <span>{recipe.prepTime}</span>
                    </div>
                    <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
                    <div className="flex items-center space-x-1.5">
                        <Users size={14} className="text-secondary" />
                        <span>{recipe.servings} ppl</span>
                    </div>
                </div>

                <Link
                    to={`/recipe/${recipe.id}`}
                    className="w-full flex items-center justify-center space-x-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-textMain dark:text-white py-3 rounded-xl transition-all duration-300 group-hover:bg-primary group-hover:text-white font-medium border border-black/5 dark:border-white/5 group-hover:border-primary/50"
                >
                    <span>View Details</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
