import { defineStore } from 'pinia';
import { type RecipesResponse, type Recipe } from '~/types';

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([]);

  async function fetchRecipes() {
    const { data } = await useApiFetch<RecipesResponse>('/recipes?limit=10');
    if (data.value) {
      recipes.value = data.value.recipes;
    }
  }

  return { recipes, fetchRecipes };
});
