import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
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

export default api;
