<script setup lang="ts">
import { ref } from 'vue';

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <header class="py-4 shadow-md">
    <nav class="flex container items-center">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <NuxtImg
          width="48px"
          format="webp"
          densities="x1"
          src="/recipe.png"
          alt=""
        />
        <span class="text-3xl font-bold">Recipes</span>
      </NuxtLink>
      <ul class="hidden md:flex gap-6 ml-auto text-xl font-bold capitalize">
        <li>
          <NuxtLink to="/" class="hover:text-dodgeroll-gold transition-colors">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="hover:text-dodgeroll-gold transition-colors">About</NuxtLink>
        </li>
      </ul>
      <button @click="toggleSidebar" class="md:hidden ml-auto">
        <Icon name="mdi:menu" size="32" />
      </button>
    </nav>
  </header>

  <!-- Sidebar -->
  <div v-if="isSidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black/25 z-10"></div>
  <div :class="['fixed top-0 right-0 h-full bg-white w-64 z-20 transform transition-transform', isSidebarOpen ? 'translate-x-0' : 'translate-x-full']">
    <ul class="flex flex-col p-4 gap-6 text-xl font-bold capitalize">
      <li>
        <NuxtLink to="/" @click="toggleSidebar" class="hover:text-dodgeroll-gold transition-colors">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" @click="toggleSidebar" class="hover:text-dodgeroll-gold transition-colors">About</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
