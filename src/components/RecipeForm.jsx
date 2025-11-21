import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Save, X, Clock, Users, Utensils, Image as ImageIcon, Tag, AlignLeft, Type } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const RecipeForm = ({ initialData, onSubmit, isEdit }) => {
    const navigate = useNavigate();
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            ingredients: [''],
            steps: [''],
            prepTime: '',
            cookTime: '',
            servings: 2,
            image: '',
            cuisine: '',
            tags: '',
            isFavorite: false
        }
    });

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: "ingredients"
    });

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: "steps"
    });

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                tags: initialData.tags ? initialData.tags.join(', ') : ''
            });
        }
    }, [initialData, reset]);

    const onFormSubmit = (data) => {
        const formattedData = {
            ...data,
            tags: typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : data.tags
        };
        onSubmit(formattedData);
    };

    const inputWrapperClasses = "relative group";
    const inputClasses = "w-full pl-12 pr-4 py-3 bg-surfaceHighlight/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-textMuted/50 transition-all hover:bg-surfaceHighlight/50";
    const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors";
    const labelClasses = "block text-sm font-medium text-textMuted mb-2 ml-1";

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onFormSubmit)}
            className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    <label className={labelClasses}>Recipe Title</label>
                    <div className={inputWrapperClasses}>
                        <Type size={20} className={iconClasses} />
                        <input
                            {...register("title", { required: "Title is required" })}
                            className={inputClasses}
                            placeholder="e.g. Spaghetti Carbonara"
                        />
                    </div>
                    {errors.title && <span className="text-red-400 text-xs mt-1 ml-1">{errors.title.message}</span>}
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className={labelClasses}>Description</label>
                    <div className={inputWrapperClasses}>
                        <AlignLeft size={20} className="absolute left-4 top-4 text-textMuted group-focus-within:text-primary transition-colors" />
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="3"
                            className={`${inputClasses} pl-12 pt-3`}
                            placeholder="Brief description of the dish..."
                        />
                    </div>
                    {errors.description && <span className="text-red-400 text-xs mt-1 ml-1">{errors.description.message}</span>}
                </div>

                <div>
                    <label className={labelClasses}>Prep Time</label>
                    <div className={inputWrapperClasses}>
                        <Clock size={20} className={iconClasses} />
                        <input
                            {...register("prepTime", { required: "Prep time is required" })}
                            className={inputClasses}
                            placeholder="e.g. 15 mins"
                        />
                    </div>
                    {errors.prepTime && <span className="text-red-400 text-xs mt-1 ml-1">{errors.prepTime.message}</span>}
                </div>

                <div>
                    <label className={labelClasses}>Cook Time</label>
                    <div className={inputWrapperClasses}>
                        <Clock size={20} className={iconClasses} />
                        <input
                            {...register("cookTime", { required: "Cook time is required" })}
                            className={inputClasses}
                            placeholder="e.g. 30 mins"
                        />
                    </div>
                    {errors.cookTime && <span className="text-red-400 text-xs mt-1 ml-1">{errors.cookTime.message}</span>}
                </div>

                <div>
                    <label className={labelClasses}>Servings</label>
                    <div className={inputWrapperClasses}>
                        <Users size={20} className={iconClasses} />
                        <input
                            type="number"
                            {...register("servings", { required: "Servings is required", min: 1 })}
                            className={inputClasses}
                        />
                    </div>
                    {errors.servings && <span className="text-red-400 text-xs mt-1 ml-1">{errors.servings.message}</span>}
                </div>

                <div>
                    <label className={labelClasses}>Cuisine</label>
                    <div className={inputWrapperClasses}>
                        <Utensils size={20} className={iconClasses} />
                        <input
                            {...register("cuisine", { required: "Cuisine is required" })}
                            className={inputClasses}
                            placeholder="e.g. Italian"
                        />
                    </div>
                    {errors.cuisine && <span className="text-red-400 text-xs mt-1 ml-1">{errors.cuisine.message}</span>}
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className={labelClasses}>Image URL</label>
                    <div className={inputWrapperClasses}>
                        <ImageIcon size={20} className={iconClasses} />
                        <input
                            {...register("image", { required: "Image URL is required" })}
                            className={inputClasses}
                            placeholder="https://..."
                        />
                    </div>
                    {errors.image && <span className="text-red-400 text-xs mt-1 ml-1">{errors.image.message}</span>}
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className={labelClasses}>Tags (comma separated)</label>
                    <div className={inputWrapperClasses}>
                        <Tag size={20} className={iconClasses} />
                        <input
                            {...register("tags")}
                            className={inputClasses}
                            placeholder="Dinner, Healthy, Quick"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">1</span>
                        Ingredients
                    </label>
                    <button
                        type="button"
                        onClick={() => appendIngredient('')}
                        className="text-primary hover:text-primaryHover text-sm flex items-center font-bold transition-colors bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20"
                    >
                        <Plus size={16} className="mr-1" /> Add Ingredient
                    </button>
                </div>
                <div className="space-y-3">
                    {ingredientFields.map((field, index) => (
                        <motion.div
                            key={field.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3"
                        >
                            <div className="relative flex-1">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/50"></div>
                                <input
                                    {...register(`ingredients.${index}`, { required: true })}
                                    className={`${inputClasses} pl-10`}
                                    placeholder={`Ingredient ${index + 1}`}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="text-textMuted hover:text-red-400 p-3 bg-surfaceHighlight/30 hover:bg-red-500/10 rounded-xl transition-colors border border-white/5 hover:border-red-500/30"
                                disabled={ingredientFields.length === 1}
                            >
                                <Trash2 size={20} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">2</span>
                        Instructions
                    </label>
                    <button
                        type="button"
                        onClick={() => appendStep('')}
                        className="text-secondary hover:text-secondaryHover text-sm flex items-center font-bold transition-colors bg-secondary/10 px-4 py-2 rounded-full hover:bg-secondary/20"
                    >
                        <Plus size={16} className="mr-1" /> Add Step
                    </button>
                </div>
                <div className="space-y-3">
                    {stepFields.map((field, index) => (
                        <motion.div
                            key={field.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3"
                        >
                            <span className="py-3 text-textMuted font-bold w-8 text-center pt-4">{index + 1}.</span>
                            <textarea
                                {...register(`steps.${index}`, { required: true })}
                                rows="2"
                                className={`${inputClasses} pl-4`}
                                placeholder={`Step ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeStep(index)}
                                className="text-textMuted hover:text-red-400 p-3 bg-surfaceHighlight/30 hover:bg-red-500/10 rounded-xl self-start transition-colors border border-white/5 hover:border-red-500/30"
                                disabled={stepFields.length === 1}
                            >
                                <Trash2 size={20} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-8 border-t border-white/10">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 border border-white/10 rounded-xl text-textMuted hover:text-white hover:bg-white/5 transition-colors flex items-center font-medium"
                >
                    <X size={20} className="mr-2" /> Cancel
                </button>
                <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primaryHover hover:to-secondary text-white rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center font-bold hover:scale-105 active:scale-95"
                >
                    <Save size={20} className="mr-2" /> {isEdit ? 'Update Recipe' : 'Save Recipe'}
                </button>
            </div>
        </motion.form>
    );
};

export default RecipeForm;
