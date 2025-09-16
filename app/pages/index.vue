<script setup lang="ts">
import { useRecipesStore } from "~/store/recipes";
import { storeToRefs } from "pinia";

const recipesStore = useRecipesStore();
const { recipes } = storeToRefs(recipesStore);

await recipesStore.fetchRecipes();
</script>

<template>
  <main>
    <section class="bg-cream">
      <div
        class="container flex flex-col lg:flex-row items-center py-10 gap-10"
      ></div>
    </section>
    <section class="py-10 container">
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
      <RecipeList :recipes="recipes" />
    </section>
  </main>
</template>
