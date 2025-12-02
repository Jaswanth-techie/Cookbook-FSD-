import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipe(id);
                setRecipe(response.data);
            } catch (error) {
                toast.error('Failed to load recipe');
                navigate('/');
            }
        };
        fetchRecipe();
    }, [id, navigate]);

    const handleSubmit = async (data) => {
        try {
            await updateRecipe(id, data);
            toast.success('Recipe updated successfully!');
            navigate(`/recipe/${id}`);
        } catch (error) {
            toast.error('Failed to update recipe');
        }
    };

    // Check if user is admin
    if (!user?.isAdmin) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-lg border-2 border-red-200 dark:border-red-900">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-6">
                                <ShieldAlert size={64} className="text-red-500 dark:text-red-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Access Denied
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Only administrators can edit recipes.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                <ArrowLeft size={20} />
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!recipe) return <div className="text-center py-12">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Edit Recipe</h1>
            <div className="max-w-3xl mx-auto">
                <RecipeForm initialData={recipe} onSubmit={handleSubmit} isEdit={true} />
            </div>
        </div>
    );
};

export default EditRecipe;
