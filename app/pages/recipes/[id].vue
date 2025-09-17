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
    <div class="flex items-center gap-4 mb-8">
      <button @click="goBack" class="bg-dodgeroll-gold text-white px-4 py-2 rounded-md hover:bg-dodgeroll-gold-darker transition-colors">
        &larr; Back
      </button>
      <div v-if="selectedRecipe" class="text-sm">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-500">{{ selectedRecipe.name }}</span>
      </div>
    </div>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else-if="selectedRecipe">
      <h1 class="text-4xl lg:text-5xl font-bold mb-4">{{ selectedRecipe.name }}</h1>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <img :src="selectedRecipe.image" :alt="selectedRecipe.name" class="w-full h-auto rounded-lg mb-8 shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-3xl font-semibold mb-4 border-b pb-2">Ingredients</h2>
              <ul class="list-disc list-inside space-y-2">
                <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">{{ ingredient }}</li>
              </ul>
            </div>
            <div>
              <h2 class="text-3xl font-semibold mb-4 border-b pb-2">Instructions</h2>
              <ol class="list-decimal list-inside space-y-2">
                <li v-for="(instruction, index) in selectedRecipe.instructions" :key="index">{{ instruction }}</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="bg-cream p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Recipe Details</h2>
            <div class="space-y-4">
              <p><strong>Cuisine:</strong> {{ selectedRecipe.cuisine }}</p>
              <p><strong>Difficulty:</strong> {{ selectedRecipe.difficulty }}</p>
              <p><strong>Prep Time:</strong> {{ selectedRecipe.prepTimeMinutes }} minutes</p>
              <p><strong>Cook Time:</strong> {{ selectedRecipe.cookTimeMinutes }} minutes</p>
              <p><strong>Servings:</strong> {{ selectedRecipe.servings }}</p>
              <p class="flex items-center gap-1">
                <Icon name="mdi:star" class="text-dodgeroll-gold" />
                <strong>Rating:</strong> {{ selectedRecipe.rating }} ({{ selectedRecipe.reviewCount }} reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Recipe not found.</p>
    </div>
  </main>
</template>
