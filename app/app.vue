<script setup lang="ts">
import Footer from '~/components/Footer.vue';
</script>

<template>
  <div class="font-Montserrat flex flex-col min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
  </div>
</template>

/* TO DO: * Adicionar um rodapé * Criar página de detalhes da receita * Filtros:
Criar filtro por tags e ordenação por parâmetros da receita * Refinar design *
Melhorar o readme adicionando tecnologias, funcionalidades e finalidade da
criação do projeto */
