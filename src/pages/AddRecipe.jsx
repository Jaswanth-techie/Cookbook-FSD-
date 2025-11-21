import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';

const AddRecipe = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            await createRecipe(data);
            toast.success('Recipe created successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to create recipe');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Add New Recipe</h1>
            <div className="max-w-3xl mx-auto">
                <RecipeForm onSubmit={handleSubmit} isEdit={false} />
            </div>
        </div>
    );
};

export default AddRecipe;
