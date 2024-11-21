<template>
  <footer class="w-full bg-gray-100 py-6">
    <div class="max-w-screen-xl mx-auto flex flex-col items-center space-y-4 px-8 text-center">
      <!-- Logo -->
      <div>
        <img :src="require('~/assets/img/logo/mutualaid-logo.svg')" class="w-32 xl:w-36" alt="MutualAid Logo" />
      </div>

      <!-- Descrição -->
      <p class="text-gray-700 text-sm">
        MutualAid é uma comunidade de ajuda mútua que une pessoas para apoio financeiro em um ambiente transparente e
        seguro.
      </p>

      <!-- Direitos autorais -->
      <div class="text-gray-500 text-xs">&copy; 2024 MutualAid. Todos os direitos reservados.</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SimpleFooter',
}
</script>

<style scoped>
/* Estilos adicionais, se necessários */
</style>
