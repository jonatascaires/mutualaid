<template>
    <div class="w-full h-screen flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">404 - Página Não Encontrada</h1>
      <p class="text-lg mt-4">Desculpe, a página que você está procurando não existe.</p>
      <nuxt-link to="/" class="mt-6 text-blue-500 underline">Voltar à Página Inicial</nuxt-link>
    </div>
  </template>

<script>
export default {
    name: 'errorPage404'
}
</script>