import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
