import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const getRecipes = () => api.get('/recipes');
export const getRecipe = (id) => api.get(`/recipes/${id}`);
export const createRecipe = (recipe) => api.post('/recipes', recipe);
export const updateRecipe = (id, recipe) => api.put(`/recipes/${id}`, recipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

// User APIs
export const getUsers = () => api.get('/users');
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);

// Favorites APIs
export const getFavorites = () => api.get('/favorites');
export const getUserFavorites = (userId) => api.get(`/favorites?userId=${userId}`);
export const addFavorite = (userId, recipeId) => api.post('/favorites', { userId, recipeId });
export const removeFavorite = (id) => api.delete(`/favorites/${id}`);

export default api;
