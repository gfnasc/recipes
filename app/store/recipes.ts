import { defineStore } from 'pinia';
import { type RecipesResponse, type Recipe } from '~~/types/types';

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([]);

  async function fetchRecipes(query?: string) {
    const url = query ? `/recipes/search?q=${query}` : '/recipes?limit=10';
    const { data } = await useApiFetch<RecipesResponse>(url);
    if (data.value) {
      recipes.value = data.value.recipes;
    }
  }

  return { recipes, fetchRecipes };
});
