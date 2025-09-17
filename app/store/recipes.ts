import { defineStore } from 'pinia';
import { type RecipesResponse, type Recipe } from '~/types/types';

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([]);
  const selectedRecipe = ref<Recipe | null>(null);
  const loading = ref(false);
  const skip = ref(0);
  const limit = 12;
  const hasMore = ref(true);

  async function fetchRecipes(query?: string, loadMore = false) {
    if (loading.value) return;
    loading.value = true;

    if (!loadMore) {
      skip.value = 0;
      recipes.value = [];
      hasMore.value = true;
    }

    const url = query
      ? `/recipes/search?q=${query}&limit=${limit}&skip=${skip.value}`
      : `/recipes?limit=${limit}&skip=${skip.value}`;

    const { data } = await useApiFetch<RecipesResponse>(url);

    if (data.value) {
      if (data.value.recipes.length < limit) {
        hasMore.value = false;
      }
      recipes.value.push(...data.value.recipes);
      skip.value += data.value.recipes.length;
    }
    loading.value = false;
  }

  async function fetchRecipeById(id: number) {
    if (loading.value) return;
    loading.value = true;
    const { data } = await useApiFetch<Recipe>(`/recipes/${id}`);
    if (data.value) {
      selectedRecipe.value = data.value;
    }
    loading.value = false;
  }

  return { recipes, selectedRecipe, loading, hasMore, fetchRecipes, fetchRecipeById };
});
