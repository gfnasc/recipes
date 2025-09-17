<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useRecipesStore } from "~/store/recipes";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const recipesStore = useRecipesStore();
const { selectedRecipe, loading } = storeToRefs(recipesStore);

function goBack() {
  router.back();
}

onMounted(() => {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    recipesStore.fetchRecipeById(id);
  }
});
</script>

<template>
  <main class="container py-10">
    <button @click="goBack" class="mb-4 bg-dodgeroll-gold text-white px-4 py-2 rounded-md hover:bg-dodgeroll-gold/90">
      &larr;
    </button>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="selectedRecipe">
      <h1 class="text-4xl font-bold mb-4">{{ selectedRecipe.name }}</h1>
      <img :src="selectedRecipe.image" :alt="selectedRecipe.name" class="w-full h-auto rounded-lg mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul class="list-disc list-inside">
            <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">{{ ingredient }}</li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold mb-2">Instructions</h2>
          <ol class="list-decimal list-inside">
            <li v-for="(instruction, index) in selectedRecipe.instructions" :key="index">{{ instruction }}</li>
          </ol>
        </div>
      </div>
      <div class="mt-8">
        <p><strong>Cuisine:</strong> {{ selectedRecipe.cuisine }}</p>
        <p><strong>Difficulty:</strong> {{ selectedRecipe.difficulty }}</p>
        <p><strong>Prep Time:</strong> {{ selectedRecipe.prepTimeMinutes }} minutes</p>
        <p><strong>Cook Time:</strong> {{ selectedRecipe.cookTimeMinutes }} minutes</p>
        <p><strong>Servings:</strong> {{ selectedRecipe.servings }}</p>
        <p><strong>Rating:</strong> {{ selectedRecipe.rating }} ({{ selectedRecipe.reviewCount }} reviews)</p>
      </div>
    </div>
    <div v-else>
      <p>Recipe not found.</p>
    </div>
  </main>
</template>
