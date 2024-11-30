<template>
  <div></div>
</template>

<script>
export default {
  beforeMount() {
    const { uplineAddress } = this.$route.params;

    if (uplineAddress) {
      // Salva o parâmetro no localStorage
      localStorage.setItem('uplineAddress', uplineAddress);
    }

    // Redireciona para a página inicial
    this.$router.push('/');
  },
};
</script>
