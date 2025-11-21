import React, { useState, useEffect } from 'react';
import { getRecipes, updateRecipe } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import AnimatedTooltipPreview from '../components/animated-tooltip-demo';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCuisine, setFilterCuisine] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await getRecipes();
            setRecipes(response.data);
            const uniqueCuisines = [...new Set(response.data.map(r => r.cuisine))];
            setCuisines(uniqueCuisines);
        } catch (error) {
            toast.error('Failed to load recipes');
        }
    };

    const toggleFavorite = async (recipe) => {
        try {
            const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
            await updateRecipe(recipe.id, updatedRecipe);
            setRecipes(recipes.map(r => r.id === recipe.id ? updatedRecipe : r));
            toast.success(updatedRecipe.isFavorite ? 'Added to favorites' : 'Removed from favorites');
        } catch (error) {
            toast.error('Failed to update favorite status');
        }
    };

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCuisine = filterCuisine ? recipe.cuisine === filterCuisine : true;
        return matchesSearch && matchesCuisine;
    }).sort((a, b) => {
        if (sortBy === 'newest') return b.id - a.id;
        if (sortBy === 'oldest') return a.id - b.id;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'time') {
            const timeA = parseInt(a.prepTime) || 0;
            const timeB = parseInt(b.prepTime) || 0;
            return timeA - timeB;
        }
        return 0;
    });

    const getDisplayName = () => {
        if (!user?.name) return 'Chef';
        // Remove numbers and special characters, keep letters and spaces
        const nameWithoutNumbers = user.name.replace(/[0-9]/g, '').trim();
        // Get first name only (split by space and take first part)
        const firstName = nameWithoutNumbers.split(' ')[0];
        // Capitalize first letter
        return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() || 'Chef';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Greeting Section */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
                    Hi, {getDisplayName()}! 👋
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 animate-slide-up">
                    What would you like to cook today?
                </p>
            </div>

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCuisine={filterCuisine}
                setFilterCuisine={setFilterCuisine}
                cuisines={cuisines}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {
                filteredRecipes.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No recipes found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} toggleFavorite={toggleFavorite} />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Home;
