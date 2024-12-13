<template>
    <div v-if="isContractModalVisible" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h2 class="text-lg font-semibold">Conheça os Detalhes dos Contratos</h2>
          <button @click="closeModal" class="text-white hover:text-gray-300 text-xl">✕</button>
        </div>
  
        <!-- Conteúdo do Modal -->
        <div class="p-6 overflow-y-auto max-h-[70vh]">
          <!-- Introdução -->
          <section class="mb-12">
            <h1 class="text-4xl font-bold text-blue-600 mb-6">O Que São Contratos Inteligentes?</h1>
            <p class="text-lg text-gray-700 leading-relaxed">
              Contratos inteligentes são o coração do <strong>InvisTribe</strong>. Eles garantem que todas as transações e processos sejam automáticos,
              transparentes e seguros. Imagine um sistema que elimina a burocracia, intermediários e incertezas: isso é o poder dos contratos inteligentes!
            </p>
          </section>
  
          <!-- Benefícios -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">Por que Confiar em Contratos Inteligentes?</h2>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>Transparência:</strong> Regras e transações públicas na blockchain.</li>
              <li><strong>Segurança:</strong> Imutabilidade após implantação.</li>
              <li><strong>Automação:</strong> Processos eficientes sem intervenção humana.</li>
              <li><strong>Confiabilidade:</strong> Sistema auditado e confiável.</li>
            </ul>
          </section>
  
          <!-- Contrato do Token Invistech -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">Contrato do Token Invistech (INVT)</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              O token <strong>Invistech (INVT)</strong> é o pilar financeiro do ecossistema, projetado para oferecer valor sustentável.
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>Liquidez Trancada:</strong> Proteção contra manipulações.</li>
              <li><strong>Contrato Renunciado:</strong> Imutabilidade do código.</li>
              <li><strong>Sistema de Queima:</strong> Reduz o supply e aumenta o valor dos tokens restantes.</li>
            </ul>
            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h3 class="font-semibold text-lg">Endereço do Contrato:</h3>
              <p class="text-blue-500 font-mono break-words">
                0xAA217F7BAb90100419b99c027adCf5F0A005C192
              </p>
              <div class="text-center mt-4">
                <BaseButton
                  class="px-6 py-3 bg-blue-500 text-white rounded-lg"
                  @click="openBscScan('0xAA217F7BAb90100419b99c027adCf5F0A005C192')"
                >
                  Ver no BscScan
                </BaseButton>
              </div>
            </div>
          </section>
  
          <!-- Contrato do Sistema de Renda Passiva -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">Contrato do Sistema de Renda Passiva</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              O sistema de renda passiva foi desenvolvido para oferecer ganhos consistentes de forma sustentável. Ele gerencia:
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>Compra de Emblemas:</strong> Representam o nível de participação no sistema.</li>
              <li><strong>Compromissos Periódicos:</strong> Sustentam a rede de forma contínua.</li>
              <li><strong>Distribuição de Recompensas:</strong> Automática e proporcional ao nível de contribuição.</li>
              <li><strong>Conversão Automática:</strong> Valores não processados em 24 horas são convertidos em tokens INVT.</li>
            </ul>
            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h3 class="font-semibold text-lg">Endereço do Contrato:</h3>
              <p class="text-blue-500 font-mono break-words">
                0x9cC5a6dA4eA24f5ddD89Db1ACca9792De3D8BCE7
              </p>
              <div class="text-center mt-4">
                <BaseButton
                  class="px-6 py-3 bg-blue-500 text-white rounded-lg"
                  @click="openBscScan('0x9cC5a6dA4eA24f5ddD89Db1ACca9792De3D8BCE7')"
                >
                  Ver no BscScan
                </BaseButton>
              </div>
            </div>
          </section>
  
          <!-- Segurança e Auditoria -->
          <section class="mb-12">
            <h2 class="text-3xl font-semibold text-blue-600 mb-4">Segurança e Auditoria</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              Nosso compromisso com a segurança é inabalável. Todos os contratos são auditados por especialistas independentes.
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li><strong>Auditoria Independente:</strong> Reforça nossa credibilidade.</li>
              <li><strong>Prova de Transparência:</strong> Todas as transações podem ser verificadas na blockchain.</li>
              <li><strong>Execução Automática:</strong> Regras claras sem interferência humana.</li>
            </ul>
          </section>
  
          <!-- Mensagem Final -->
          <section class="text-center mt-8">
            <p class="text-lg text-gray-700 font-semibold">
              O <strong>InvisTribe</strong> combina tecnologia inovadora com uma visão sustentável para criar um ecossistema financeiro
              onde todos ganham. Invista com confiança e torne-se parte desta revolução!
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
  