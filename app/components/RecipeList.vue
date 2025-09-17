<script setup lang="ts">
import type { Recipe } from "~/types/types";

defineProps<{
  recipes: Recipe[];
}>();
</script>

<template>
  <TransitionGroup
    tag="div"
    name="recipe-card"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8"
  >
    <NuxtLink
      v-for="recipe in recipes"
      :key="recipe.id"
      :to="`/recipes/${recipe.id}`"
      class="flex flex-col shadow rounded-md"
    >
      <NuxtImg
        :src="recipe.image"
        sizes="xs:100vw sm:50vw lg:400px"
        format="webp"
        densities="x1"
        :alt="recipe.name"
        class="rounded-t-md"
      />
      <div class="flex flex-col py-6 px-4 flex-1">
        <p class="text-xl lg:text-2xl font-semibold mb-2">
          {{ recipe.name }}
        </p>
        <div
          class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-4 mt-auto"
        >
          <div class="flex items-center gap-1">
            <Icon name="mdi:clock-time-eight-outline" style="color: #f79f1a" />
            <span>{{ recipe.cookTimeMinutes }}min</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="mdi:fire" style="color: #f79f1a" />
            <span>{{ recipe.caloriesPerServing }}kcal</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="mdi:star" style="color: #f79f1a" />
            <span>{{ recipe.rating }}</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </TransitionGroup>
</template>

<style>
.recipe-card-move,
.recipe-card-enter-active,
.recipe-card-leave-active {
  transition: all 0.5s ease;
}
.recipe-card-enter-from,
.recipe-card-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.recipe-card-leave-active {
  position: absolute;
}
</style>
