<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRecipesStore } from "~/store/recipes";
import { storeToRefs } from "pinia";
import { useDebounce } from "~/composables/useDebounce";
import { useIntersectionObserver } from "~/composables/useIntersectionObserver";
import Spinner from "~/components/Spinner.vue";
import RecipeCardSkeleton from "~/components/RecipeCardSkeleton.vue";

const recipesStore = useRecipesStore();
const { recipes, loading, hasMore } = storeToRefs(recipesStore);

const searchQuery = ref("");
const sentinel = ref<Element | null>(null);

const debouncedSearchQuery = useDebounce(searchQuery, 500);

const { isIntersecting } = useIntersectionObserver(sentinel);

onMounted(() => {
  if (recipes.value.length === 0) {
    recipesStore.fetchRecipes();
  }
});

watch(debouncedSearchQuery, (newQuery) => {
  const query = newQuery as string;
  if (query.length >= 3) {
    recipesStore.fetchRecipes(query);
  } else if (query.length === 0) {
    recipesStore.fetchRecipes();
  }
});

watch(isIntersecting, (isIntersecting) => {
  if (isIntersecting && hasMore.value && !loading.value) {
    recipesStore.fetchRecipes(searchQuery.value, true);
  }
});
</script>

<template>
  <main>
    <section class="bg-cream py-12">
      <div class="container">
        <div class="max-w-2xl mx-auto">
          <label for="search" class="block text-2xl font-semibold mb-2 text-center">Find Your Next Favorite Recipe</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="mdi:magnify" class="text-gray-400" size="24" />
            </div>
            <input
              id="search"
              type="text"
              v-model="searchQuery"
              placeholder="Search for recipes..."
              class="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-sm focus:ring-dodgeroll-gold focus:border-dodgeroll-gold transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="py-10 container">
      <div v-if="loading && recipes.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <RecipeCardSkeleton v-for="n in 6" :key="n" />
      </div>
      <RecipeList v-else :recipes="recipes" />
      <div ref="sentinel"></div>
      <div v-if="loading && recipes.length > 0" class="py-8">
        <Spinner />
      </div>
    </section>
  </main>
</template>
