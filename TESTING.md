# Testing Checklist

## 1. Recipe List (Home)
- [ ] Verify all recipes from `db.json` are displayed.
- [ ] Check if images are loading correctly.
- [ ] Test the "View Recipe" button on a card.
- [ ] Test the "Favorite" heart icon on a card.

## 2. Search & Filter
- [ ] Type "pasta" in the search bar. Verify only pasta recipes show up.
- [ ] Select "Italian" from the cuisine dropdown. Verify filtering works.
- [ ] Combine search and filter (e.g., "chicken" + "Indian").

## 3. Recipe Details
- [ ] Click on a recipe. Verify all details (title, description, ingredients, steps) are shown.
- [ ] Check the "Back" button functionality.
- [ ] Verify the "Edit" and "Delete" buttons are present.

## 4. Create Recipe
- [ ] Navigate to "Add Recipe".
- [ ] Try submitting an empty form. Verify validation errors appear.
- [ ] Fill in valid data (including multiple ingredients and steps).
- [ ] Submit. Verify redirection to Home and success toast.
- [ ] Verify the new recipe appears in the list.

## 5. Edit Recipe
- [ ] Go to a recipe detail page and click "Edit".
- [ ] Verify the form is pre-filled with existing data.
- [ ] Change the title and add an ingredient.
- [ ] Save. Verify changes are reflected in the detail page.

## 6. Delete Recipe
- [ ] Click "Delete" on a recipe detail page.
- [ ] Confirm the dialog.
- [ ] Verify redirection to Home and the recipe is gone.

## 7. Favorites
- [ ] Mark a recipe as favorite from the Home page or Detail page.
- [ ] Navigate to "Favorites" page.
- [ ] Verify the recipe appears there.
- [ ] Unfavorite it and verify it disappears from the list.
