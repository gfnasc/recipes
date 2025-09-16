<script setup lang="ts">
import { ref, watch } from "vue";
import { useRecipesStore } from "~/store/recipes";
import { storeToRefs } from "pinia";
import { useDebounce } from "~/composables/useDebounce";

const recipesStore = useRecipesStore();
const { recipes } = storeToRefs(recipesStore);

const searchQuery = ref("");

const debouncedSearchQuery = useDebounce(searchQuery, 500);

await recipesStore.fetchRecipes();

watch(debouncedSearchQuery, (newQuery) => {
  const query = newQuery as string;
  if (query.length >= 3) {
    recipesStore.fetchRecipes(query);
  } else if (query.length === 0) {
    recipesStore.fetchRecipes();
  }
});
</script>

<template>
  <main>
    <section class="bg-cream">
      <div
        class="container flex flex-col lg:flex-row items-center py-10 gap-10"
      >
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for recipes..."
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </section>
    <section class="py-10 container">
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
      <RecipeList :recipes="recipes" />
    </section>
  </main>
</template>
