<template>
    <div v-if="isContractModalVisible" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ $t('Conheça os Detalhes dos Contratos') }}</h2>
          <button @click="closeModal" class="text-white hover:text-gray-300 text-xl">✕</button>
        </div>
  
        <!-- Conteúdo do Modal -->
        <div class="p-6 overflow-y-auto max-h-[70vh]">
          <!-- Introdução -->
          <section class="mb-12">
            <h1 class="text-4xl font-bold text-blue-600 mb-6">{{ $t('O Que São Contratos Inteligentes?') }}</h1>
            <p class="text-lg text-gray-700 leading-relaxed">
              {{ $t('Contratos inteligentes são o coração do') }} <strong>InvisTribe</strong>. {{ $t('Eles garantem que todas as transações e processos sejam automáticos, transparentes e seguros. Imagine um sistema que elimina a burocracia, intermediários e incertezas: isso é o poder dos contratos inteligentes!') }}
            </p>
          </section>
  
          <!-- Benefícios -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">{{ $t('Por que Confiar em Contratos Inteligentes?') }}</h2>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>{{ $t('Transparência:') }}</strong> {{ $t('Regras e transações públicas na blockchain.') }}</li>
              <li><strong>{{ $t('Segurança:') }}</strong> {{ $t('Imutabilidade após implantação.') }}</li>
              <li><strong>{{ $t('Automação:') }}</strong> {{ $t('Processos eficientes sem intervenção humana.') }}</li>
              <li><strong>{{ $t('Confiabilidade:') }}</strong> {{ $t('Sistema auditado e confiável.') }}</li>
            </ul>
          </section>
  
          <!-- Contrato do Token Invistech -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">{{ $t('Contrato do Token Invistech (INVT)') }}</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              {{ $t('O token') }} <strong>Invistech (INVT)</strong> {{ $t('é o pilar financeiro do ecossistema, projetado para oferecer valor sustentável.') }}
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>{{ $t('Liquidez Trancada:') }}</strong> {{ $t('Proteção contra manipulações.') }}</li>
              <li><strong>{{ $t('Contrato Renunciado:') }}</strong> {{ $t('Imutabilidade do código.') }}</li>
              <li><strong>{{ $t('Sistema de Queima:') }}</strong> {{ $t('Reduz o supply e aumenta o valor dos tokens restantes.') }}</li>
            </ul>
            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h3 class="font-semibold text-lg">{{ $t('Endereço do Contrato:') }}</h3>
              <p class="text-blue-500 font-mono break-words">
                0xAA217F7BAb90100419b99c027adCf5F0A005C192
              </p>
              <div class="text-center mt-4">
                <BaseButton
                  class="px-6 py-3 bg-blue-500 text-white rounded-lg"
                  @click="openBscScan('0xAA217F7BAb90100419b99c027adCf5F0A005C192')"
                >
                  {{ $t('Ver no BscScan') }}
                </BaseButton>
              </div>
            </div>
          </section>
  
          <!-- Contrato do Sistema de Renda Passiva -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">{{ $t('Contrato do Sistema de Renda Passiva') }}</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              {{ $t('O sistema de renda passiva foi desenvolvido para oferecer ganhos consistentes de forma sustentável. Ele gerencia:') }}
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>{{ $t('Compra de Emblemas:') }}</strong> {{ $t('Representam o nível de participação no sistema.') }}</li>
              <li><strong>{{ $t('Compromissos Periódicos:') }}</strong> {{ $t('Sustentam a rede de forma contínua.') }}</li>
              <li><strong>{{ $t('Distribuição de Recompensas:') }}</strong> {{ $t('Automática e proporcional ao nível de contribuição.') }}</li>
              <li><strong>{{ $t('Conversão Automática:') }}</strong> {{ $t('Valores não processados em 24 horas são convertidos em tokens INVT.') }}</li>
            </ul>
            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h3 class="font-semibold text-lg">{{ $t('Endereço do Contrato:') }}</h3>
              <p class="text-blue-500 font-mono break-words">
                0x9cC5a6dA4eA24f5ddD89Db1ACca9792De3D8BCE7
              </p>
              <div class="text-center mt-4">
                <BaseButton
                  class="px-6 py-3 bg-blue-500 text-white rounded-lg"
                  @click="openBscScan('0x9cC5a6dA4eA24f5ddD89Db1ACca9792De3D8BCE7')"
                >
                  {{ $t('Ver no BscScan') }}
                </BaseButton>
              </div>
            </div>
          </section>
  
          <!-- Segurança e Auditoria -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">{{ $t('Segurança e Auditoria') }}</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              {{ $t('Nosso compromisso com a segurança é inabalável. Todos os contratos são auditados por especialistas independentes.') }}
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>{{ $t('Auditoria Independente:') }}</strong> {{ $t('Reforça nossa credibilidade.') }}</li>
              <li><strong>{{ $t('Prova de Transparência:') }}</strong> {{ $t('Todas as transações podem ser verificadas na blockchain.') }}</li>
              <li><strong>{{ $t('Execução Automática:') }}</strong> {{ $t('Regras claras sem interferência humana.') }}</li>
            </ul>
          </section>
  
          <!-- Mensagem Final -->
          <section class="text-center mt-8">
            <p class="text-lg text-gray-700 font-semibold">
              {{ $t('O') }} <strong>InvisTribe</strong> {{ $t('combina tecnologia inovadora com uma visão sustentável para criar um ecossistema financeiro onde todos ganham. Invista com confiança e torne-se parte desta revolução!') }}
            </p>
          </section>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isContractModalVisible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      openBscScan(address) {
        window.open(`https://bscscan.com/address/${address}`, "_blank");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Permitir rolagem */
  .overflow-y-auto {
    overflow-y: auto;
  }
  </style>
  