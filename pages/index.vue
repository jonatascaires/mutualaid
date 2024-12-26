<template>
  <div class="w-full">
    <!-- Hero section -->
    <section id="hero" class="w-full pb-24">
      <BaseSection>
        <div class="col-span-12 lg:col-span-6 mt-12 xl:mt-10 space-y-4 sm:space-y-6 px-6 text-center sm:text-left">
          <span data-aos="fade-right" class="text-base text-gradient font-semibold uppercase">{{ $t(`Bem-vindo ao InvisTribe`) }}</span>
          <h1 data-aos="fade-right"
            class="text-[2.5rem] sm:text-5xl xl:text-6xl font-bold leading-tight capitalize sm:pr-8 xl:pr-10">
            {{ $t(`Unindo Pessoas em uma`) }} <span class="text-header-gradient">{{ $t(`Comunidade de Renda Passiva`)
              }}</span>
          </h1>
          <p data-aos="fade-down" data-aos-delay="300" class="paragraph hidden sm:block">
            {{ $t(`Bem-vindo ao nosso inovador sistema de renda passiva, onde os participantes podem ganhar recompensas financeiras realizando tarefas de forma transparente e sustentável. Gerenciado por um contrato inteligente na blockchain, garantimos segurança, transparência e imutabilidade das operações.`) }}
          </p>
          <div data-aos="fade-up" data-aos-delay="500"
            class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
            <BaseButton
              class="max-w-full px-8 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white"
              @click="$scrollTo('#purchase-emblem')">
              {{ $t(`Começar Agora`) }}
            </BaseButton>
            <!-- <BaseButton
              class="max-w-full px-6 py-4 bg-inherit text-gradient border border-[#0c66ee] flex items-center justify-center"
              @click="$scrollTo('#about')">
              <span>{{ $t('Saiba Mais') }}</span>
              <ChevronDownIcon :size="20" class="mt-1 text-[#0c66ee]" />
            </BaseButton> -->
          </div>
        </div>

        <div class="hidden sm:block col-span-12 lg:col-span-6">
          <div class="w-full">
            <img data-aos="fade-up" :src="require('~/assets/img/hero-image.webp')" class="-mt-4"
              :alt="$t('Comunidade de Renda Passiva')" />
          </div>
        </div>
      </BaseSection>
    </section>

    <!-- Fila de Ajuda Mútua section -->
    <section id="help-queue"
      class="max-w-screen-xl mt-10 mx-2 sm:mx-auto px-4 sm:px-6 lg:px-8 py-12 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg transform lg:-translate-y-12 relative">
      <div v-if="isUpdating" class="text-center my-6">
        <div class="spinner"></div>
        <p class="text-gray-600">{{ $t('Atualizando...') }}</p>
      </div>
      <div class="w-full text-center mb-12">
        <h2 class="text-4xl font-semibold text-gray-800">📜 {{ $t('Fila de Renda Passiva') }}</h2>
        <p class="text-gray-600 mt-4 text-lg">{{ $t('Visualize as próximas oportunidades de ganho no sistema.') }}</p>
      </div>

      <div v-if="loadingQueue" class="text-center my-6">
        <p class="text-gray-600">{{ $t('Carregando fila de recompensas...') }}</p>
      </div>

      <div v-else class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        <div v-if="queue.length === 0" class="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
          <p class="text-gray-600 text-lg font-semibold">{{ $t('A fila está vazia no momento.') }} 🚀</p>
          <p class="text-gray-500">{{ $t('Volte mais tarde para verificar novas oportunidades de ganho.') }}</p>
        </div>
        <div v-else v-for="(request, index) in getPaginatedQueue()" :key="index"
          class="p-6 bg-white rounded-xl shadow-md hover:shadow-lg">
          <!-- Card de Ordem -->
          <div class="flex items-center space-x-4 mb-4">
            <div class="text-2xl font-bold text-blue-600">#{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-800">{{ $t('Usuário:') }} {{ compactAddress(request.user) }}</h3>
            </div>
            <div>
              <span class="px-2 py-1 text-sm font-semibold rounded-full" :class="{
                'bg-green-100 text-green-600': request.status === 'Pending',
                'bg-yellow-100 text-yellow-600': request.status === 'Expired',
                'bg-gray-100 text-gray-600': request.status === 'Completed',
              }">
                {{ request.status }}
              </span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center">
              <CurrencyUsdIcon class="w-5 h-5 text-blue-600 mr-2" />
              <p class="text-gray-700">
                {{ $t('Ganho Total:') }} <span class="font-semibold text-green-500">{{ request.totalAidAmount }}
                  USDT</span>
              </p>
            </div>
            <div class="flex items-center">
              <CurrencyUsdIcon class="w-5 h-5 text-blue-600 mr-2" />
              <p class="text-gray-700">
                {{ $t('Recebido:') }} <span class="font-semibold text-blue-500">{{ request.receivedAmount }} USDT</span>
              </p>
            </div>
            <div class="flex items-center">
              <CurrencyUsdIcon class="w-5 h-5 text-blue-600 mr-2" />
              <p class="text-gray-700">
                {{ $t('Restante:') }} <span class="font-semibold text-red-500">{{ request.remainingAid }} USDT</span>
              </p>
            </div>
            <div class="flex items-center">
              <ClockIcon class="w-5 h-5 text-blue-600 mr-2" />
              <p class="text-gray-700">
                {{ $t('Tempo Restante:') }} {{ formatTime(request.timeRemaining) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="w-full flex justify-center mt-12">
        <button
          v-for="page in totalPages()"
          :key="page"
          @click="changePage(page)"
          :class="['px-4 py-2 mx-1 rounded-lg text-base border', {
            'bg-blue-500 text-white': page === currentPage,
            'bg-white text-gray-700 hover:bg-blue-50': page !== currentPage
          }]"
        >
          {{ page }}
        </button>
      </div>      
    </section>

    <!-- Seção de Compra de Emblema -->
    <section id="purchase-emblem" class="w-full my-24">
      <BaseSection>
        <LandingBuyTradeImage class="sm:hidden mb-8" />
        <div data-aos="fade-right" class="col-span-12 lg:col-span-6 mt-4 xl:mt-20 space-y-6 px-4">
          <h2 class="text-4xl font-semibold sm:pr-8 xl:pr-12">{{ $t('Adquira seu Emblema e Comece a Ganhar') }}</h2>
          <p class="paragraph">
            {{ $t(`Para ingressar na comunidade, adquira um emblema que representa seu nível de compromisso. Escolha o nível que melhor se adapta a você e comece a gerar renda passiva realizando tarefas.`) }}
          </p>

          <div class="space-y-6 lg:pr-12">
            <!-- Campo de seleção de nível do emblema -->
            <div>
              <label for="level" class="block text-gray-700 font-semibold mb-2">{{ $t(`Selecione o Nível do Emblema (1 a 50)`) }}</label>
              <input id="level" v-model.number="selectedLevel" type="number" min="1" max="50"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                :placeholder="$t('Digite um nível de 1 a 50')" />
            </div>

            <!-- Exibição do valor em USDT -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2">{{ $t('Valor do Emblema (USDT)') }}</label>
              <p class="text-xl font-bold text-gray-800">{{ emblemCostInUSDT }} USDT</p>
            </div>

            <div v-if="showDetails" class="bg-gray-100 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ $t('Detalhes do Emblema') }}</h3>

              <!-- Custo e frequência do compromisso -->
              <p class="text-gray-600">
                <span class="font-semibold text-blue-600">{{ $t('Compromisso:') }}</span> {{ commitmentCost }} {{ $t('USDT a cada') }} {{ commitmentPeriodDays }} {{ $t('dias') }}
              </p>

              <!-- Recompensa estimada -->
              <p class="text-gray-600 mt-2">
                <span class="font-semibold text-green-600">{{ $t('Recompensa:') }}</span> {{ estimatedReward }} {{ $t('USDT disponível a cada') }} {{ aidRequestPeriodDays }} {{ $t('dias') }}
              </p>

              <!-- Custo e frequência da renovação -->
              <p class="text-gray-600 mt-2">
                <span class="font-semibold text-purple-600">{{ $t('Renovação do Emblema:') }}</span> {{ renewalCost }} {{ $t('USDT a cada') }} {{ renewalPeriodDays }} {{ $t('dias') }}
              </p>

              <!-- Mostrar o Upline -->
              <p v-if="uplineAddress" class="text-gray-600 mt-2">
                <span class="font-semibold text-yellow-600">{{ $t('Upline:') }}</span> {{ compactAddress(uplineAddress) }}
              </p>
              <p v-else class="text-red-600 mt-2">
                {{ $t('Você não possui um upline configurado. Por favor, use um link de convite para continuar.') }}
              </p>

              <!-- Verificar se o upline é igual ao endereço do usuário -->
              <p v-if="uplineAddress && uplineAddress.toLowerCase() === userAddress.toLowerCase()" class="text-red-600 mt-2">
                {{ $t('O endereço do upline é o mesmo que o seu. Por favor, revise.') }}
              </p>
            </div>

            <!-- Botão de compra que muda para "Confirmar" após o clique -->
            <BaseButton class="w-full px-5 py-4 bg-blue-gradient text-white text-base font-medium mt-6"
              :disabled="isPurchasing" @click="handlePurchase">
              <span v-if="!isPurchasing">{{ $t(buttonLabel) }}</span>
              <span v-else>{{ $t('Processando...') }}</span>
            </BaseButton>

            <!-- Mensagem de sucesso ou erro -->
            <div v-if="purchaseStatus" :class="{
              'text-green-600': purchaseStatus === 'success',
              'text-red-600': purchaseStatus === 'error',
            }" class="mt-4 text-center">
              {{ $t(purchaseMessage) }}
            </div>
          </div>
        </div>
        <LandingBuyTradeImage data-aos="fade-left" class="hidden sm:block" />
      </BaseSection>
    </section>

    <!-- Sessão da Calculadora -->
    <section id="investment-calculator" class="w-full my-24">
      <BaseSection>
        <div class="col-span-12 mt-4 xl:mt-20 space-y-6 px-4">
          <h2 class="text-4xl font-semibold sm:pr-8 xl:pr-12">
            {{ $t('Simule Seus') }} <span class="text-header-gradient">{{ $t('Ganhos') }}</span>
          </h2>
          <p class="paragraph">
            {{ $t('Selecione o nível do seu emblema e descubra quanto você pode ganhar ao longo de 1 ano.') }}
          </p>

          <!-- Campo de seleção de nível do emblema -->
          <div>
            <label for="level" class="block text-gray-700 font-semibold mb-2">{{ $t('Selecione o Nível do Emblema (1 a 50)') }}</label>
            <input id="level" v-model.number="selectedLevelCalculator" type="number" min="1" max="50"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              :placeholder="$t('Digite um nível de 1 a 50')" />
          </div>

          <!-- Botão para calcular -->
          <BaseButton class="w-full px-6 py-4 bg-blue-gradient text-white text-base font-medium mt-4"
            @click="calculateSimulation">
            {{ $t('Calcular') }}
          </BaseButton>
        </div>
      </BaseSection>
    </section>

    <!-- Modal de Resultados da Calculadora -->
    <div v-if="showModalCalculator" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 overflow-hidden">
        <div class="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ $t('Resultados da Simulação') }}</h2>
          <button @click="showModalCalculator = false" class="text-white hover:text-gray-300">
            ✕
          </button>
        </div>
        <div class="p-6 overflow-auto max-h-[70vh]">
          <table class="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-2 border border-gray-300">{{ $t('Dia') }}</th>
                <th class="px-4 py-2 border border-gray-300">{{ $t('Descrição') }}</th>
                <th class="px-4 py-2 border border-gray-300">{{ $t('Transferência (USDT)') }}</th>
                <th class="px-4 py-2 border border-gray-300">{{ $t('Saldo (USDT)') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in calculatedData" :key="index"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-4 py-2 border border-gray-300">{{ row.day }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ row.description }}</td>
                <td class="px-4 py-2 border border-gray-300 text-right"
                  :class="row.amount > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ row.amount > 0 ? '+' : '' }}{{ row.amount.toFixed(2) }} USDT
                </td>
                <td class="px-4 py-2 border border-gray-300 text-right">{{ row.balance.toFixed(2) }} USDT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Parceria com o Token Invistech -->
    <section id="token-partnership" class="w-full my-24">
      <BaseSection>
        <!-- Primeira Coluna: Informações do Token -->
        <div 
          data-aos="fade-right"
          class="col-span-12 lg:col-span-6 mt-4 xl:mt-20 px-4 flex flex-col space-y-6 justify-center"
        >
          <h2 class="text-4xl font-semibold sm:pr-8 xl:pr-12">
            {{ $t('Parceria Estratégica com o') }}
            <span class="text-header-gradient">{{ $t('Token Invistech') }}</span>
          </h2>

          <p class="paragraph">
            {{ $t(`O InvisTribe utiliza o Token Invistech para garantir um ecossistema robusto e sustentável. O contrato do token é renunciado e possui taxas de compra/venda que ajudam a sustentar o projeto. Além disso, adicionamos liquidez continuamente, garantindo maior segurança para investidores, enquanto o mecanismo de queima (buyback & burn) eleva o preço de forma constante.`) }}
          </p>

          <ul class="space-y-3 sm:space-y-2">
            <LandingListItem :title="$t('Liquidez adicionada automaticamente para maior estabilidade')" />
            <LandingListItem :title="$t('Mecanismo de buyback e queima garantindo alta constante')" />
            <LandingListItem :title="$t('Contrato renunciado e taxas de compra/venda para sustentar o projeto')" />
          </ul>
        </div>

        <!-- Segunda Coluna: Saldo do usuário + botões + imagem menor -->
        <div
          data-aos="fade-left"
          class="col-span-12 lg:col-span-6 mt-4 lg:mt-20 px-4 flex flex-col space-y-6 justify-center"
        >
          <!-- Bloco de saldo + imagem menor -->
          <div class="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start space-x-4">
            <!-- Informações de saldo -->
            <div v-if="balanceLoading" class="flex items-center space-x-2 text-gray-600">
              <div class="spinner"></div>
              <span>{{ $t('Carregando saldo...') }}</span>
            </div>
            <div v-else class="flex-1">
              <h3 class="text-xl font-semibold mb-2">{{ $t('Seu Saldo de INVT') }}</h3>
              <p class="text-gray-700 mb-1">
                <strong>{{ $t('Saldo (INVT):') }}</strong> {{ userInvistechBalance }}
              </p>
              <p class="text-gray-700 mb-1">
                <strong>{{ $t('Preço (USDT):') }}</strong> {{ currentInvtPriceInUSD }}
              </p>
              <p class="text-gray-700">
                <strong>{{ $t('Valor Total (USDT):') }}</strong> {{ userInvtBalanceInUSD }}
              </p>
            </div>

            <!-- Imagem menor ao lado -->
            <div class="w-60 h-auto flex-shrink-0 mt-4 md:mt-0">
              <img
                :src="require('~/assets/img/img-sections/token_invistech.png')"
                class="object-contain w-full"
                :alt="$t('Token Invistech')"
              />
            </div>
          </div>

          <!-- Botões de ação (Comprar, Gráfico, Airdrop) -->
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <BaseButton
              class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              @click="navigateToBuyInvistech"
            >
              {{ $t('Comprar Tokens Invistech') }}
            </BaseButton>

            <BaseButton
              class="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
              @click="viewPriceChart"
            >
              {{ $t('Ver Gráfico de Preço') }}
            </BaseButton>

            <!-- <BaseButton
              class="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
              :disabled="isProcessing"
              @click="airdropAction"
            >
              <span v-if="!isProcessing">{{ $t('Receber INVT Grátis') }}</span>
              <span v-else>{{ $t('Processando...') }}</span>
            </BaseButton> -->
          </div>
        </div>
      </BaseSection>
    </section>
    
    <!-- Nova Seção: Bônus de Indicação -->
    <section id="referral-bonus" class="w-full my-24">
      <BaseSection>
        <div data-aos="fade-right" class="col-span-12 lg:col-span-6">
          <div class="w-full">
            <img :src="require('~/assets/img/img-sections/referral_bonus.png')" class="w-full"
              :alt="$t('Bônus de Indicação')" />
          </div>
        </div>
        <div data-aos="fade-left" class="col-span-12 lg:col-span-6 mt-4 xl:mt-20 space-y-6 px-4">
          <h2 class="text-4xl font-semibold sm:pr-8 xl:pr-12">
            {{ $t('Impulsione o Crescimento com Nosso') }} <span class="text-header-gradient">{{ $t('Bônus de Indicação') }}</span>
          </h2>
          <p class="paragraph">
            {{ $t('Convide amigos para se juntar à nossa comunidade e ganhe bônus sobre as compras, tarefas e renovações realizadas por eles, até o 10º nível de indicação.') }}
          </p>
          <ul class="space-y-4 sm:space-y-2">
            <LandingListItem :title="$t('Receba bônus direto de 10% no primeiro nível')" />
            <LandingListItem :title="$t('Receba 1% de bônus por cada nível adicional (até o 10° nível)')" />
            <LandingListItem :title="$t('Construa sua rede e aumente seus ganhos a longo prazo')" />
          </ul>

          <div class="mt-4 px-4">
            <p><strong>{{ $t('Já Recebido:') }}</strong> {{ userBonus.earnedBonus }} USDT</p>
            <p><strong>{{ $t('Limite Atual:') }}</strong> {{ userBonus.maxBonus }} USDT</p>
            <p><strong>{{ $t('Restante:') }}</strong> {{ userBonus.remaining }} USDT</p>
          </div>

          <button class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            @click="openFullReferralTreeModal">
            {{ $t('Ver Rede Completa de Indicações') }}
          </button>
        </div>
      </BaseSection>
    </section>

    <!-- Modal da Árvore Completa de Indicações -->
    <div v-if="showFullReferralTreeModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 overflow-hidden">
        <div class="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ $t('Endereços que Garantem seu Bônus') }}</h2>
          <button @click="showFullReferralTreeModal = false" class="text-white hover:text-gray-300">
            ✕
          </button>
        </div>
        <div class="p-6 overflow-auto max-h-[70vh]">

          <!-- Caso não haja referências -->
          <div v-if="fullReferralTree.length === 0" class="text-center">
            <p class="text-gray-600 text-lg font-semibold">{{ $t('Você ainda não possui indicações cadastradas.') }} 🙁
            </p>
          </div>

          <div v-else>
            <table class="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-2 border border-gray-300">{{ $t('Endereço') }}</th>
                  <th class="px-4 py-2 border border-gray-300">{{ $t('Data de Adesão') }}</th>
                  <!-- <th class="px-4 py-2 border border-gray-300">Bônus Recebido (USDT)</th>
                  <th class="px-4 py-2 border border-gray-300">Nível</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ref, index) in fullReferralTree" :key="index">
                  <td class="text-center">{{ formatAddress(ref.referredAddress) }}</td>
                  <td class="text-center">{{ new Date(ref.joinDate * 1000).toLocaleDateString('pt-BR') }}</td>
                  <!-- <td class="text-center">{{ ref.bonusReceived }} USDT</td>
                  <td class="text-center">{{ ref.level }}</td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Link de Convite -->
    <section id="invite-link" class="w-full my-24">
      <BaseSection>
        <div class="col-span-12 px-4">
          <h2 class="text-3xl sm:text-4xl font-semibold sm:pr-8 xl:pr-12 text-center sm:text-left">
            {{ $t('Compartilhe seu') }} <span class="text-header-gradient">{{ $t('Link de Convite') }}</span>
          </h2>
          <p class="paragraph text-sm sm:text-base text-center sm:text-left mt-4">
            {{ $t('Convide amigos para se juntarem ao nosso sistema de renda passiva utilizando seu link personalizado. Ganhe bônus ao trazer novos membros!') }}
          </p>

          <div v-if="userAddress" class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <input
              type="text"
              :value="inviteLink"
              readonly
              class="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-center sm:text-left"
            />
            <BaseButton
              class="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg"
              @click="copyInviteLink"
            >
              {{ $t('Copiar') }}
            </BaseButton>
          </div>

          <div v-else class="text-gray-600 mt-4 text-center">
            {{ $t('Por favor, conecte sua carteira para gerar seu link de convite.') }}
          </div>
        </div>
      </BaseSection>
    </section>

    <!-- Estatísticas da Comunidade -->
    <section id="community-stats"
      class="max-w-screen-xl mx-4 sm:mx-auto px-6 sm:px-8 lg:px-10 py-16 bg-gradient-to-b from-[#f9fcff] to-[#e6f7ff] rounded-lg shadow-lg">
      <div v-if="isUpdating" class="text-center my-6">
        <div class="spinner"></div>
        <p class="text-gray-600">{{ $t('Atualizando...') }}</p>
      </div>
      <div class="w-full text-center mb-12">
        <h2 data-aos="fade-up" class="text-4xl font-bold text-gray-800">📊 {{ $t('Estatísticas da Comunidade') }}</h2>
        <p data-aos="fade-up" data-aos-delay="200" class="text-gray-600 mt-4 text-lg">
          {{ $t('Acompanhe o desempenho e as interações da comunidade dentro da rede InvisTribe.') }}
        </p>
      </div>

      <div v-if="loadingStats" class="text-center my-6">
        <div class="spinner"></div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-center">
        <div v-for="(stat, index) in stats" :key="index"
          class="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-md">
          <div class="text-5xl font-bold text-blue-600">{{ stat.value }}</div>
          <div class="text-lg font-medium text-gray-700">{{ $t(stat.label) }}</div>
        </div>
      </div>
    </section>

    <!-- Segurança e Transparência section -->
    <section id="security" class="w-full my-36">
      <BaseSection data-aos="fade-down">
        <div class="col-span-12 lg:col-span-7">
          <div class="w-full">
            <img :src="require('~/assets/img/img-sections/security.png')" class="w-[95%]"
              alt="Segurança e Transparência" />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-5 space-y-6 px-4 sm:px-6 mt-20">
          <h2 class="text-4xl font-semibold">
            {{ $t('Transparência e') }} <span class="text-header-gradient">{{ $t('Segurança') }}</span> {{ $t('em Primeiro Lugar') }}
          </h2>
          <p class="paragraph">
            {{ $t('Todas as operações são gerenciadas por um contrato inteligente na blockchain, garantindo segurança, transparência e imutabilidade das regras do sistema.O uso de USDT protege os participantes da volatilidade do mercado cripto.') }}
          </p>
          <ul class="space-y-4 sm:space-y-2">
            <LandingListItem :title="$t('Transparência e Imutabilidade na Blockchain')" />
            <LandingListItem :title="$t('Segurança Financeira com USDT')" />
            <LandingListItem :title="$t('Auditoria Independente do Contrato')" />
          </ul>
          <BaseButton
            class="w-full sm:max-w-[240px] px-10 py-4 bg-inherit text-gradient border border-[#0c66ee] text-base"
            @click="showContractModal">
            {{ $t('Saiba Mais') }}
          </BaseButton>
        </div>
      </BaseSection>
    </section>

    <!-- Modal -->
    <ContractModal v-if="isContractModalVisible" :isContractModalVisible="isContractModalVisible"
      @close="isContractModalVisible = false" />

    <div class="w-full relative">
      <!-- Botão Flutuante -->
      <button
        class="fixed bottom-6 right-6 z-50 bg-blue-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        @click="showModal = true">
        {{ $t('Meus Emblemas') }}
      </button>

      <!-- Modal de Tela Cheia -->
      <div v-if="showModal" class="modal-emblem fixed inset-0 z-[9999] bg-white overflow-y-auto transition-opacity"
        @click.self="showModal = false">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-blue-500 text-white p-4 flex justify-between items-center">
          <h2 class="text-xl font-bold">{{ $t('Meus Emblemas') }}</h2>
          <button class="text-white hover:text-gray-200 focus:outline-none" @click="showModal = false">✕</button>
        </div>

        <!-- Emblemas do Usuário -->
        <div class="p-6 space-y-6">
          <!-- Verifica se o usuário tem emblemas -->
          <div v-if="userEmblems.length === 0" class="text-center py-8">
            <h3 class="text-2xl font-semibold text-white mb-4">{{ $t('Você ainda não possui emblemas.') }}</h3>
            <p class="text-white">{{ $t('Adquira seu primeiro emblema e comece a participar da comunidade de ajuda mútua.') }}</p>
            <BaseButton
              class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              @click="closeModalAndScroll">
              {{ $t('Adquirir Emblema') }}
            </BaseButton>
          </div>

          <!-- Exibe os emblemas caso existam -->
          <div v-else>
            <BaseSection>
              <div v-for="(emblem) in userEmblems" :key="emblem.id"
                class="col-span-12 md:col-span-6 lg:col-span-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center transform hover:scale-105 mt-4">
                <div class="flex flex-col items-center mb-4">
                  <h3 class="text-2xl font-semibold text-gray-800 mb-2">{{ $t('Emblema Nível') + ' ' + emblem.level }}
                  </h3>
                  <span class="px-3 py-1 text-sm font-semibold rounded-full" :class="{
                    'bg-green-100 text-green-600': emblem.active,
                    'bg-red-100 text-red-600': !emblem.active,
                  }">
                    {{ emblem.active ? $t('Ativo') : $t('Expirado') }}
                  </span>
                </div>
                <div class="text-gray-600 mb-4">
                  <p><strong>{{ $t('Data de Aquisição:') }}</strong> {{ formatDate(emblem.purchaseTime) }}</p>
                  <p><strong>{{ $t('Data de Expiração:') }}</strong> {{ formatDate(emblem.expiryTime) }}</p>
                  <p><strong>{{ $t('Ganho Total:') }}</strong> {{ formatTotalEarned(emblem.totalEarned) }} USDT</p>
                </div>

                <!-- Contador e barra de progresso para compromisso -->
                <div class="mb-2">
                  <p class="text-gray-700">{{ $t('Compromisso:') + ' ' + formatTimeRemaining(emblem, 'commitment') }}
                  </p>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: emblem.commitmentProgress + '%' }">
                    </div>
                  </div>
                </div>
                <BaseButton
                  class="w-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  :class="{ 'opacity-50 cursor-not-allowed': !isActionEnabled(emblem, 'commitment') || isProcessing }"
                  :disabled="!isActionEnabled(emblem, 'commitment') || isProcessing" @click="makeCommitment(emblem.id)">
                  <span v-if="!isProcessing">{{ $t('Fazer Compromisso') + ' (' + formatCommitmentCost(emblem.level) + ' USDT) ' }}</span>
                  <span v-else>{{ $t('Processando...') }}</span>
                </BaseButton>

                <!-- Contador e barra de progresso para solicitação de ajuda -->
                <div class="mb-2 mt-4">
                  <p class="text-gray-700">{{ $t('Recompensa:') + ' ' + formatTimeRemaining(emblem, 'aid') }}</p>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-green-500 h-2.5 rounded-full" :style="{ width: emblem.aidProgress + '%' }"></div>
                  </div>
                </div>
                <BaseButton
                  class="w-full px-4 py-3 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  :class="{ 'opacity-50 cursor-not-allowed': !isActionEnabled(emblem, 'aid') || isProcessing }"
                  :disabled="!isActionEnabled(emblem, 'aid') || isProcessing" @click="requestAid(emblem.id)">
                  <span v-if="!isProcessing">{{ $t('Recompensa (Estimativa:') + ' ' +
                    formatAidRequestReward(emblem.level) + ' USDT)' }}</span>
                  <span v-else>{{ $t('Processando...') }}</span>
                </BaseButton>

                <!-- Contador e barra de progresso para renovação -->
                <div class="mb-2 mt-4">
                  <p class="text-gray-700">{{ $t('Renovação:') + formatTimeRemaining(emblem, 'renewal') }}</p>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-purple-500 h-2.5 rounded-full" :style="{ width: emblem.renewalProgress + '%' }">
                    </div>
                  </div>
                </div>
                <BaseButton
                  class="w-full px-4 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  :class="{ 'opacity-50 cursor-not-allowed': !isActionEnabled(emblem, 'renewal') || isProcessing }"
                  :disabled="!isActionEnabled(emblem, 'renewal') || isProcessing" @click="renewEmblem(emblem.id)">
                  <span v-if="!isProcessing">{{ $t('Renovar Emblema') + ' (' + formatRenewalCost(emblem.level) + ' USDT) ' }}</span>
                  <span v-else>{{ $t('Processando...') }}</span>
                </BaseButton>
              </div>
            </BaseSection>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ section -->
    <section id="faq" class="w-full my-24">
      <BaseSection>
        <div data-aos="fade-right" data-aos-delay="150" class="col-span-12 lg:col-span-6">
          <div class="w-full">
            <img :src="require('~/assets/img/img-sections/faq.png')" class="w-full" :alt="$t('Perguntas Frequentes')" />
          </div>
        </div>
        <div data-aos="fade-left" data-aos-delay="150" class="col-span-12 lg:col-span-6 px-4 sm:px-6 mt-8">
          <span class="text-base text-gradient font-semibold uppercase mb-4 sm:mb-2">{{ $t('Suporte') }}</span>
          <h2 class="text-3xl sm:text-4xl font-semibold mb-10 sm:mb-6">{{ $t('Perguntas Frequentes') }}</h2>

          <ul class="shadow-box">
            <BaseAccordion v-for="(accordion, index) in accordions" :key="index" :accordion="accordion" />
          </ul>
        </div>
      </BaseSection>
    </section>

    <div class="w-full my-10 flex justify-center">
      <a v-smooth-scroll data-aos="flip-down" data-aos-delay="150" href="#hero"
        class="px-6 py-3 flex items-center space-x-2 bg-[#FAFAFA] hover:bg-gray-100 hover:shadow-md border border-[#DDDDDD] rounded-md text-gray-700">
        <span>{{ $t('Voltar ao Topo') }}</span>
        <ArrowUpIcon :size="20" />
      </a>
    </div>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import CurrencyUsdIcon from 'vue-material-design-icons/CurrencyUsd.vue'
import contractABI from '../contracts/mutualaid_abi.json' // Certifique-se de que esta ABI corresponde ao seu contrato implantado
import IERC20ABI from '../contracts/IERC20.json' // ABI do IERC20 para interagir com o USDT
import ContractModal from "@/components/ContractModal.vue";
import aosMixin from '@/mixins/aos'

// IMPORTA a ABI (caso esteja em outro arquivo) 
import ADD_LIQUIDITY_INVT_ABI from '../contracts/add_liquidiy_invt.json'

// Se for outro endereço, coloque aqui o address do seu AddLiquidityINVT
const ADD_LIQUIDITY_INVT_ADDRESS = '0xE56cd20F9F3e1547c7aFB4DD6F5Beedea13512e8'

export default {
  name: 'IndexPage',
  components: {
    CurrencyUsdIcon,
    ClockIcon,
    ContractModal
  },
  mixins: [aosMixin],
  data() {
    return {
      isContractModalVisible: false,
      provider: null,
      contract: null,
      contractAddress: '0x9cC5a6dA4eA24f5ddD89Db1ACca9792De3D8BCE7',
      loadingStats: true,
      userAddress: null,
      inviteLink: '',
      userEmblems: [], // Armazena os emblemas do usuário
      isProcessing: false, // Controla o estado de processamento para evitar múltiplas ações simultâneas,
      showModal: false,
      isUpdating: false,
      selectedLevelCalculator: 1, // Nível do emblema para simulação
      calculatedData: [],
      showModalCalculator: false,
      showAffiliatesModal: false, // Controla a exibição do modal
      affiliates: [], // Lista de afiliados
      userInvistechBalance: '0.00',
      currentInvtPriceInUSD: '0.00',
      userInvtBalanceInUSD: '0.00',
      balanceLoading: true,
      userBonus: {
        earnedBonus: '0.00',
        maxBonus: '0.00',
        remaining: '0.00'
      },
      currentPage: 1,
      itemsPerPage: 6,
      loadingQueue: true,

      accordions: [
        {
          title: 'O que é o InvisTribe?',
          description:
            'O InvisTribe é um sistema descentralizado baseado em blockchain que conecta participantes interessados em contribuições financeiras de forma sustentável e transparente.',
        },
        {
          title: 'Como adquirir um emblema?',
          description:
            'A aquisição de emblemas é o primeiro passo para participar do sistema. Eles representam seu nível de engajamento, variando entre 1 e 50, com valores proporcionais ao nível escolhido.',
        },
        {
          title: 'Como funciona a contribuição?',
          description:
            'A cada período determinado, você realiza uma contribuição proporcional ao nível do seu emblema, garantindo a sustentabilidade do sistema.',
        },
        {
          title: 'Quando recebo distribuições?',
          description:
            'Distribuições podem ser solicitadas após intervalos específicos, calculadas com base no nível do seu emblema.',
        },
        {
          title: 'Como funciona o bônus por indicação?',
          description:
            'Ganhe 10% do valor movimentado por membros diretamente indicados por você, abrangendo aquisições de emblemas e contribuições regulares. Além disso, receba um bônus adicional de 1% para cada nível de indicação sucessivo, até o 10º nível, maximizando seus ganhos enquanto expande sua rede.',
        },
        {
          title: 'O que acontece se uma solicitação não for atendida em 24 horas?',
          description:
            'Os valores pendentes serão liquidados em tokens Invistech, que podem ser facilmente convertidos para outras criptomoedas ou stablecoins.',
        },
      ],

      // Dados da Fila de Ajuda
      queue: [],
      countdownInterval: null,

      // Dados para Compra de Emblema
      selectedLevel: 1, // Nível inicial do emblema
      emblemBaseCost: 30, // Custo base por nível em USDT
      commitmentBaseCost: 5, // Custo base do compromisso em USDT por nível
      renewalMultiplier: 30, // Custo de renovação = nível * renewalMultiplier USDT
      rewardMultiplier: 13, // Multiplicador para estimativa de recompensa
      commitmentPeriodDays: 6, // Período de compromisso em dias
      renewalPeriodDays: 150, // Período de renovação em dias
      aidRequestPeriodDays: 7, // Período para solicitar ajuda em dias
      showDetails: false, // Controla a exibição dos detalhes
      uplineAddress: '', // Endereço do referenciador (propriedade adicionada)

      commitmentPeriodSeg: 0,
      renewalPeriodSeg: 0,
      aidRequestPeriodSeg: 0,

      // Estatísticas da Comunidade
      stats: [],

      // Estados para Compra de Emblema (propriedades adicionadas)
      isPurchasing: false,
      purchaseStatus: '', // 'success' ou 'error'
      purchaseMessage: '',

      showFullReferralTreeModal: false,
      fullReferralTree: [],
    }
  },
  computed: {
    // Calcula o custo total do emblema com base no nível selecionado
    emblemCostInUSDT() {
      return this.selectedLevel * this.emblemBaseCost
    },
    // Calcula o custo do compromisso com base no nível selecionado
    commitmentCost() {
      return this.selectedLevel * this.commitmentBaseCost
    },
    // Calcula o custo de renovação com base no nível selecionado
    renewalCost() {
      return this.selectedLevel * this.renewalMultiplier
    },
    // Estima a recompensa com base no nível selecionado
    estimatedReward() {
      return this.selectedLevel * this.rewardMultiplier
    },
    // Define o rótulo do botão dinamicamente
    buttonLabel() {
      return this.showDetails ? 'Confirmar Compra' : 'Ver Detalhes'
    },
    totalQueueValue() {
      return this.queue.reduce((total, user) => total + user.requestAmount, 0)
    },
  },
  mounted() {
    this.initialize()
      .then(() => {

        // Verifica o link de convite
        this.checkInviteLink();

        // Carrega o uplineAddress do localStorage
        const storedUpline = localStorage.getItem('uplineAddress');
        this.uplineAddress = storedUpline || null;

        // Inicia atualizações constantes (progressos, fila, etc.)
        this.startProgressUpdater();
        this.startQueueUpdater();
        this.fetchQueueData();
        this.fetchUserBonusInfo();

        // Atualiza todas as seções a cada 30 segundos
        this.updateInterval = setInterval(() => {
          this.refreshAllSections();
        }, 60000);
      })
      .catch(error => {
        // Trate erros de inicialização se necessário
        // console.error("Erro na inicialização:", error);
      });
  },
  beforeDestroy() {
    // Para atualizações já existentes
    this.stopProgressUpdater();
    this.stopQueueUpdater();

    // Limpa o interval de atualização a cada 30s
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  },
  methods: {
    getPaginatedQueue() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.queue.slice(startIndex, endIndex);
    },
    changePage(page) {
      this.currentPage = page;
    },
    totalPages() {
      return Math.ceil(this.queue.length / this.itemsPerPage);
    },
    async fetchUserBonusInfo() {
      if (!this.contract || !this.userAddress) return;

      try {
        // 1) Lê quanto o usuário já recebeu de bônus
        const userData = await this.contract.users(this.userAddress);
        const earnedBonusBN = userData.earnedBonus; // BigNumber
        
        // 2) Soma o totalLevel dos Emblems ativos
        const emblems = await this.contract.getUserEmblems(this.userAddress);
        let totalLevel = 0;
        for (const emblem of emblems) {
          // emblem.level é BigNumber. Use toNumber() ou parseInt
          if (emblem.active) totalLevel += emblem.level.toNumber();
        }

        // 3) Lê do contrato os valores emblemBaseCost e maxUplineEarningsMultiplier
        const emblemBaseCostBN = await this.contract.emblemBaseCost(); // BigNumber (ex.: 30 * 1e18)
        const maxUplineMultBN = await this.contract.maxUplineEarningsMultiplier(); // BigNumber (ex.: 3)

        // 4) Constrói BigNumbers no front-end para calcular o maxBonus
        const totalLevelBN = ethers.BigNumber.from(totalLevel.toString());
        // maxBonusBN = totalLevel * emblemBaseCost * maxUplineEarningsMultiplier
        const maxBonusBN = totalLevelBN
          .mul(emblemBaseCostBN)
          .mul(maxUplineMultBN);

        // 5) Converte todos para decimal (float) antes de exibir
        const earnedBonus = parseFloat(ethers.utils.formatUnits(earnedBonusBN, 18));
        const maxBonus = parseFloat(ethers.utils.formatUnits(maxBonusBN, 18));

        // 6) Calcula quanto ainda falta para atingir o teto
        const remaining = Math.max(0, maxBonus - earnedBonus);

        // 7) Salva no data() (ou reactive state) para exibir no template
        this.userBonus.earnedBonus = earnedBonus.toFixed(2);
        this.userBonus.maxBonus    = maxBonus.toFixed(2);
        this.userBonus.remaining  = remaining.toFixed(2);

      } catch (error) {
        console.error("Erro ao buscar bônus do usuário:", error);
        // Exiba algum alerta ou toast de erro
      }
    },
    async airdropAction() {
      try {
        this.isProcessing = true;

        // Pega o saldo em USDT do contrato ADD_LIQUIDITY_INVT_ADDRESS
        const usdtContract = new ethers.Contract(
          await this.contract.usdtToken(),
          IERC20ABI,
          this.provider
        );
        const usdtBalance = await usdtContract.balanceOf(ADD_LIQUIDITY_INVT_ADDRESS);

        // Verifica se o saldo é suficiente
        const minimumBalance = ethers.utils.parseUnits("100", 18);
        if (usdtBalance.lt(minimumBalance)) {
          this.$toast.error(this.$t('Não foi possível coletar INVT grátis. Volte mais tarde.'));
          return;
        }

        // Passo 1: Conecte a carteira
        const signer = this.provider.getSigner();

        // Passo 2: Instancia o contrato AddLiquidityINVT
        const addLiquidityContract = new ethers.Contract(
          ADD_LIQUIDITY_INVT_ADDRESS,
          ADD_LIQUIDITY_INVT_ABI,
          signer
        );

        // Passo 3: Chama a função addLiquidity()
        const tx = await addLiquidityContract.addLiquidity();

        // Passo 4: Aguarda confirmação
        await tx.wait();

        // Exemplo de feedback
        this.$toast.success(this.$t('INVT grátis recebido com sucesso!'));
        await this.loadInvistechData();
      } catch (error) {
        this.$toast.error(this.$t('Falha ao executar ação de INVT grátis.'));
        console.error(this.$t('Erro ao receber INVT grátis:'), error);
      } finally {
        this.isProcessing = false;
      }
    },
    async ensureUsdtApproval(requiredAmount) {
      if (!this.provider || !this.contract) return

      const signer = this.provider.getSigner()
      const usdtAddress = await this.contract.usdtToken()
      const usdtContract = new ethers.Contract(usdtAddress, IERC20ABI, signer)

      const userAddress = await signer.getAddress()
      const usdtBalance = await usdtContract.balanceOf(userAddress)
      const required = ethers.utils.parseUnits(requiredAmount.toString(), 18)

      if (usdtBalance.lt(required)) {
        throw new Error('Saldo insuficiente de USDT.')
      }

      const allowance = await usdtContract.allowance(userAddress, this.contractAddress)
      if (allowance.lt(required)) {
        // Se não houver aprovação suficiente, solicite aprovação
        const approveTx = await usdtContract.approve(this.contractAddress, ethers.constants.MaxUint256)
        await approveTx.wait()
      }
    },
    showContractModal() {
      this.isContractModalVisible = true;
    },
    formatAddress(address) {
      if (!address || address.length !== 42) {
        return address; // Retorna o endereço original se for inválido
      }
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    },
    calculateSimulation() {
      if (!Number.isInteger(this.selectedLevelCalculator) || this.selectedLevelCalculator < 1 || this.selectedLevelCalculator > 50) {
        this.$toast.error(this.$t('O nível do emblema deve ser um número inteiro entre 1 e 50.'));
        return;
      }

      const level = this.selectedLevelCalculator;
      const initialCost = 30 * level; // Custo inicial do emblema
      const commitmentCost = 5 * level; // Compromisso financeiro
      const reward = 13 * level; // Recompensa
      const renewalCost = 30 * level; // Custo de renovação
      let balance = -initialCost; // Compra do emblema
      const simulationData = [];
      let day = 0;

      // Compra inicial do emblema
      simulationData.push({
        day: ++day,
        description: this.$t('Compra de Emblema'),
        amount: -initialCost,
        balance,
      });

      // Simular eventos até 1 ano (365 dias)
      for (let i = 1; i <= 365; i++) {
        day = i;

        // Compromisso a cada 5 dias
        if (day % 6 === 0) {
          balance -= commitmentCost;
          simulationData.push({
            day,
            description: this.$t('Compromisso'),
            amount: -commitmentCost,
            balance,
          });
        }

        // Recompensa a cada 6 dias
        if (day % 7 === 0) {
          balance += reward;
          simulationData.push({
            day,
            description: this.$t('Recompensa'),
            amount: reward,
            balance,
          });
        }

        // Renovação no dia 114 e 228
        if (day === 150 || day === 300) {
          balance -= renewalCost;
          simulationData.push({
            day,
            description: 'Renovação',
            amount: -renewalCost,
            balance,
          });
        }
      }

      this.calculatedData = simulationData;
      this.showModalCalculator = true; // Exibir o modal da calculadora
    },
    async refreshAllSections() {
      this.isUpdating = true; // Ativa o indicador de carregamento

      try {
        await Promise.all([
          this.fetchUserEmblems(),
          this.fetchStatistics(),
          this.fetchQueueData(),
        ]);
      } catch (error) {
        // console.error("Erro ao atualizar seções:", error);
      } finally {
        this.isUpdating = false; // Desativa o indicador de carregamento
      }
    },
    closeModalAndScroll() {
      // Fecha o modal
      this.showModal = false;

      // Aguarda um pequeno delay para evitar conflitos visuais antes de rolar
      this.$nextTick(() => {
        this.$scrollTo('#purchase-emblem', 500); // Duração de 500ms para o scroll
      });
    },
    startQueueUpdater() {
      this.queueInterval = setInterval(() => {
        this.queue = this.queue.map((request) => {
          const currentTime = Math.floor(Date.now() / 1000);
          const remainingTime = Math.max(request.expirationTime - currentTime, 0);

          return {
            ...request,
            timeRemaining: remainingTime,
            progress: this.calculateProgress(request.expirationTime),
          };
        });
      }, 1000); // Atualiza a cada segundo
    },
    stopQueueUpdater() {
      if (this.queueInterval) {
        clearInterval(this.queueInterval);
      }
    },
    calculateProgress(expirationTime) {
      const totalDuration = 24 * 3600; // 24 horas em segundos
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = Math.max(expirationTime - currentTime, 0);

      return (remainingTime / totalDuration) * 100;
    },
    startProgressUpdater() {
      this.progressInterval = setInterval(() => {
        this.userEmblems = this.userEmblems.map((emblem) => {
          return {
            ...emblem,
            commitmentProgress: this.getProgress(emblem, 'commitment'),
            aidProgress: this.getProgress(emblem, 'aid'),
            renewalProgress: this.getProgress(emblem, 'renewal'),
          };
        });
      }, 1000); // Atualiza a cada segundo
    },
    stopProgressUpdater() {
      if (this.progressInterval) {
        clearInterval(this.progressInterval);
      }
    },
    beforeDestroy() {
      this.stopProgressUpdater();
      this.stopQueueUpdater();
    },
    getProgress(emblem, action) {
      let period;
      let total;

      if (action === 'commitment') {
        period = emblem.commitmentTime.toNumber();
        total = this.commitmentPeriodSeg;
      } else if (action === 'renewal') {
        period = emblem.expiryTime.toNumber();
        total = this.renewalPeriodSeg;
      } else if (action === 'aid') {
        period = emblem.aidRequestTime.toNumber();
        total = this.aidRequestPeriodSeg;
      }

      const remaining = period - Math.floor(Date.now() / 1000);
      return Math.max((remaining / total) * 100, 0); // Evita valores negativos
    },
    formatTime(seconds) {
      const adjustedSeconds = Math.max(seconds - 604800, 0);

      const hours = Math.floor(adjustedSeconds / 3600);
      const minutes = Math.floor((adjustedSeconds % 3600) / 60);
      const secs = adjustedSeconds % 60;

      return `${hours}h ${minutes}m ${secs}s`;
    },
    formatTimeRemaining(emblem, action) {
      let period;
      if (action === 'commitment') {
        period = emblem.commitmentTime.toNumber();
      } else if (action === 'renewal') {
        period = emblem.expiryTime.toNumber();
      } else if (action === 'aid') {
        period = emblem.aidRequestTime.toNumber();
      }

      const remaining = period - Math.floor(Date.now() / 1000);

      if (remaining <= 0) {
        return `0h 0m 0s`;
      }

      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = Math.floor(remaining % 60);

      return `${hours}h ${minutes}m ${seconds}s`;
    },

    // Verifica se a ação está habilitada
    isActionEnabled(emblem, action) {
      let period;
      if (action === 'commitment') {
        period = emblem.commitmentTime.toNumber();
      } else if (action === 'renewal') {
        period = emblem.expiryTime.toNumber();
      } else if (action === 'aid') {
        period = emblem.aidRequestTime.toNumber();
      }

      const remaining = period - (Date.now() / 1000)

      if (remaining <= 0) {
        return true
      }

      return false
    },

    // Método para copiar o link de convite para a área de transferência
    async copyInviteLink() {
      try {
        await navigator.clipboard.writeText(this.inviteLink)
        this.$toast.success(this.$t('Link de convite copiado com sucesso!'))
      } catch (error) {
        // console.error('Erro ao copiar o link:', error)
        this.$toast.error(this.$t('Falha ao copiar o link.'))
      }
    },

    // Método para verificar e salvar o uplineAddress a partir da URL
    checkInviteLink() {
      const path = this.$route.path
      const inviteRegex = /^\/invite\/(0x[a-fA-F0-9]{40})$/
      const match = path.match(inviteRegex)
      if (match && match[1]) {
        localStorage.setItem('uplineAddress', match[1])
      }
    },

    // Atualize o método `initialize` para chamar `checkInviteLink`
    async initialize() {
      try {
        // Chama o método para verificar o link de convite
        this.checkInviteLink()

        // Verifica se o provedor Ethereum está disponível
        if (window.ethereum) {
          this.provider = new ethers.providers.Web3Provider(window.ethereum)

          // Solicita acesso à conta
          await window.ethereum.request({ method: 'eth_requestAccounts' })

          // Obtém o signer
          const signer = this.provider.getSigner()

          // Obtém o endereço do usuário
          this.userAddress = await this.provider.getSigner().getAddress()

          // Gera o link de convite
          this.inviteLink = `https://invistribe.com/invite/${this.userAddress}`

          // Inicializa o contrato com o signer
          this.contract = new ethers.Contract(this.contractAddress, contractABI, signer)

          // Busca as estatísticas
          await this.fetchStatistics();

          // Busca tempo dos emblemas
          await this.allPeriodSeg();

          await this.fetchQueueData();

          if (this.contract && this.userAddress) {
            await this.fetchUserEmblems()
          }

          await this.loadInvistechData();

          await this.fetchUserBonusInfo();

          // Escuta mudanças de conta na MetaMask
          window.ethereum.on('accountsChanged', async (accounts) => {
            if (accounts.length > 0) {
              this.userAddress = accounts[0];
              this.inviteLink = `https://invistribe.com/invite/${this.userAddress}`;
              await this.fetchUserEmblems(); // Atualiza os emblemas para o novo endereço
              await this.loadInvistechData();
              await this.fetchUserBonusInfo();
              this.$toast.info(this.$t('Conta da MetaMask alterada.'));
            }
          });
        } else {
          this.$toast.error(this.$t('Por favor, instale uma carteira Web3 como o MetaMask.'))
          // console.error('Ethereum provider not found')
        }
      } catch (error) {
        // console.error('Erro ao inicializar:', error)
        this.loadingStats = false
      }
    },
    async allPeriodSeg() {
      try {
        // Chama as funções assíncronas do contrato para obter os períodos
        const commitmentPeriod = await this.contract.commitmentPeriod(); // Pega o valor do compromisso
        const renewalPeriod = await this.contract.emblemExpiryPeriod(); // Pega o valor da renovação
        const aidRequestPeriod = await this.contract.aidRequestPeriod(); // Pega o valor da solicitação de ajuda

        // Converte os valores para o formato necessário
        this.commitmentPeriodSeg = commitmentPeriod.toNumber();
        this.renewalPeriodSeg = renewalPeriod.toNumber();
        this.aidRequestPeriodSeg = aidRequestPeriod.toNumber();

      } catch (error) {
        // console.error('Erro ao buscar os períodos do contrato:', error);
      }
    },
    async fetchStatistics() {
      try {
        const data = await this.contract.getStatistics();

        const totalDonated = parseFloat(ethers.utils.formatUnits(data._totalDonated || 0, 18));
        const totalBonusesPaid = parseFloat(ethers.utils.formatUnits(data._totalBonusesPaid || 0, 18));
        const totalSentToAdminWallet = parseFloat(ethers.utils.formatUnits(data._totalSentToAdminWallet || 0, 18));
        const totalLiquiditySent = parseFloat(ethers.utils.formatUnits(data._totalLiquiditySent || 0, 18));

        const totalContribuicoesAjustado = totalDonated - totalBonusesPaid;
        const enviadoParaGestaoAjustado = totalSentToAdminWallet - (0.3 * totalBonusesPaid);
        const valorLiquidezAjustado = totalLiquiditySent - (0.7 * totalBonusesPaid);

        // Cálculos das porcentagens baseadas em enviadoParaGestaoAjustado:
        const upgrade = enviadoParaGestaoAjustado * 0.40;
        const liquidityPools = enviadoParaGestaoAjustado * 0.40;
        const supportAndTraining = enviadoParaGestaoAjustado * 0.10;
        const videoYoutube = enviadoParaGestaoAjustado * 0.10;

        this.stats = [
          { label: 'Emblemas Adquiridos', value: data._totalEmblemsPurchased?.toNumber() || 0 },
          { label: 'Valor Total de Emblemas (USDT)', value: `${parseFloat(ethers.utils.formatUnits(data._totalValueEmblemsPurchased || 0, 18)).toFixed(2)}` },
          { label: 'Compromissos Realizados', value: data._totalCommitmentsMade?.toNumber() || 0 },
          { label: 'Valor Total em Compromissos (USDT)', value: `${parseFloat(ethers.utils.formatUnits(data._totalValueCommitmentsMade || 0, 18)).toFixed(2)}` },
          { label: 'Renovações Concluídas', value: data._totalRenewals?.toNumber() || 0 },
          { label: 'Valor Total em Renovações (USDT)', value: `${parseFloat(ethers.utils.formatUnits(data._totalValueRenewals || 0, 18)).toFixed(2)}` },
          { label: 'Contribuições Totais (USDT)', value: `${totalContribuicoesAjustado.toFixed(2)}` },

          { label: 'Bonificações Pagas (USDT)', value: `${totalBonusesPaid.toFixed(2)}` },
          { label: 'Valor Total na Fila de Distribuição (USDT)', value: `${parseFloat(ethers.utils.formatUnits(data._totalQueueValue || 0, 18)).toFixed(2)}` },
          { label: 'Distribuições Realizadas', value: data._totalHelpRequests?.toNumber() || 0 },
          { label: 'Valor Total em Distribuições (USDT)', value: `${parseFloat(ethers.utils.formatUnits(data._totalValueHelpRequests || 0, 18)).toFixed(2)}` },

          { label: 'Upgrade (USDT)', value: `${upgrade.toFixed(2)}` },                  
          { label: 'Pools de Liquidez (USDT)', value: `${liquidityPools.toFixed(2)}` }, 
          { label: 'Suporte e Treinamento (USDT)', value: `${supportAndTraining.toFixed(2)}` },                 
          { label: 'Vídeo Youtube (USDT)', value: `${videoYoutube.toFixed(2)}` },
          { label: 'Liquidez do INVT (USDT)', value: `${valorLiquidezAjustado.toFixed(2)}` },
        ];

      } catch (error) {
        // console.error('Erro ao obter estatísticas:', error.message);
      } finally {
        this.loadingStats = false;
      }
    },
    // Alterna entre mostrar detalhes e confirmar a compra
    toggleDetails() {
      this.showDetails = !this.showDetails
    },
    // Método para lidar com a compra do emblema
    async handlePurchase() {
      if (!Number.isInteger(this.selectedLevel) || this.selectedLevel < 1 || this.selectedLevel > 50) {
        this.$toast.error(this.$t('O nível do emblema deve ser um número inteiro entre 1 e 50.'));
        return;
      }

      if (this.showDetails) {
        // Se já estiver mostrando os detalhes, proceder com a compra
        await this.purchaseEmblem();
      } else {
        // Caso contrário, mostrar os detalhes
        this.toggleDetails();
      }
    },
    async purchaseEmblem() {
      this.isPurchasing = true;
      this.purchaseStatus = '';
      this.purchaseMessage = '';

      try {
        const upline = this.uplineAddress;

        // Obtém o endereço do usuário conectado
        const userAddress = await this.provider.getSigner().getAddress();

        // Verifica se o upline é igual ao endereço do usuário
        if (!upline || upline.toLowerCase() === userAddress.toLowerCase()) {
          throw new Error(this.$t('O endereço do upline não pode ser o mesmo que o seu.'));
        }

        // Validações básicas
        if (this.selectedLevel < 1 || this.selectedLevel > 50) {
          throw new Error(this.$t('O nível do emblema deve estar entre 1 e 50.'));
        }

        const cost = ethers.utils.parseUnits(this.emblemCostInUSDT.toString(), 18);

        // Instancia o contrato USDT usando a ABI IERC20
        const usdtAddress = await this.contract.usdtToken();
        const usdtContract = new ethers.Contract(usdtAddress, IERC20ABI, this.provider.getSigner());

        // Verifica o saldo de USDT do usuário
        const usdtBalance = await usdtContract.balanceOf(userAddress);

        if (usdtBalance.lt(cost)) {
          throw new Error(this.$t('Saldo insuficiente de USDT.'));
        }

        // Verifica se a aprovação é necessária
        const allowance = await usdtContract.allowance(userAddress, this.contractAddress);
        if (allowance.lt(cost)) {
          // Solicita aprovação
          const approveTx = await usdtContract.approve(this.contractAddress, ethers.constants.MaxUint256);
          await approveTx.wait();
        }

        console.log('upline', upline)

        // Realiza a compra do emblema
        const purchaseTx = await this.contract.purchaseEmblem(this.selectedLevel, upline);

        // Aguarda a confirmação da transação
        await purchaseTx.wait();

        // Atualiza as estatísticas após a compra
        await this.refreshAllSections();

        // Reseta os campos
        this.selectedLevel = 1;
        this.showDetails = false;

        // Exibe mensagem de sucesso
        this.purchaseStatus = 'success';
        this.purchaseMessage = this.$t('Emblema comprado com sucesso!');
        this.$toast.success(this.purchaseMessage); // Notificação de sucesso
      } catch (error) {
        if (error.code === 'ACTION_REJECTED') {
          this.purchaseStatus = 'error';
          this.purchaseMessage = this.$t('Transação cancelada pelo usuário.');
          this.$toast.error(this.purchaseMessage);
        } else {
          this.purchaseStatus = 'error';
          this.purchaseMessage = error.message || this.$t('Ocorreu um erro ao comprar o emblema.');
          this.$toast.error(this.purchaseMessage);
        }
      } finally {
        this.isPurchasing = false;
      }
    },
    timeRemaining(user) {
      const timeElapsed = (Date.now() - user.joinTime) / (1000 * 3600) // Horas desde a entrada na fila
      return Math.max(24 - timeElapsed, 0).toFixed(2) // Horas restantes
    },
    timeRemainingPercentage(user) {
      const totalDuration = 24 // duração total em horas
      const remaining = this.timeRemaining(user)
      return (remaining / totalDuration) * 100
    },

    async fetchUserEmblems() {
      if (!this.provider) return
      try {
        const emblems = await this.contract.getUserEmblems(this.userAddress)
        this.userEmblems = emblems
      } catch (error) {
        // console.error('Erro ao buscar emblemas do usuário:', error)
      }
    },

    // Método para fazer compromisso em um emblema
    async makeCommitment(emblemId) {
      this.isProcessing = true
      try {
        // Calcular o custo do compromisso baseado no nível do emblema
        // Você pode obter o nível do emblema do array userEmblems
        const emblem = this.userEmblems.find(e => e.id === emblemId)
        const level = emblem.level.toNumber()
        const commitmentCost = level * this.commitmentBaseCost

        // Verificar e aprovar USDT
        await this.ensureUsdtApproval(commitmentCost)

        // Agora que está aprovado, chame a função do contrato principal
        const tx = await this.contract.makeCommitment(emblemId)
        await tx.wait()

        this.$toast.success(this.$t('Compromisso realizado com sucesso.'))
        await this.refreshAllSections()
      } catch (error) {
        // console.error('Erro ao fazer compromisso:', error)
        this.$toast.error(this.$t('Falha ao realizar compromisso.'))
      } finally {
        this.isProcessing = false
      }
    },

    // Método para pedir ajuda em um emblema
    async requestAid(emblemId) {
      this.isProcessing = true
      try {
        // Cálculo da recompensa não necessita de aprovação, pois não é pagamento do usuário,
        // mas você pode querer garantir aprovações para cobrir taxas de gas ou algo mais,
        // caso o contrato exija algum custo em USDT (verifique seu contrato).
        // Se não houver custo, você pode pular a parte de approval.
        //
        // Caso não haja custo de USDT, pule a ensureUsdtApproval.
        // Se houver algum custo, adicione a linha:
        // await this.ensureUsdtApproval(valorNecessario)

        const tx = await this.contract.requestAid(emblemId)
        await tx.wait()

        this.$toast.success(this.$t('Pedido de recompensa realizado com sucesso.'))
        await this.refreshAllSections()
      } catch (error) {
        // console.error('Erro ao pedir ajuda:', error)
        this.$toast.error(this.$t('Falha ao solicitar ajuda.'))
      } finally {
        this.isProcessing = false
      }
    },

    // Método para renovar um emblema
    async renewEmblem(emblemId) {
      this.isProcessing = true
      try {
        // Calcular o custo da renovação baseado no nível do emblema
        const emblem = this.userEmblems.find(e => e.id === emblemId)
        const level = emblem.level.toNumber()
        const renewalCost = level * this.renewalMultiplier

        // Verificar e aprovar USDT
        await this.ensureUsdtApproval(renewalCost)

        const tx = await this.contract.renewEmblem(emblemId)
        await tx.wait()

        this.$toast.success(this.$t('Emblema renovado com sucesso.'))
        await this.refreshAllSections()
      } catch (error) {
        // console.error('Erro ao renovar emblema:', error)
        this.$toast.error(this.$t('Falha ao renovar o emblema.'))
      } finally {
        this.isProcessing = false
      }
    },

    formatTotalEarned(totalEarned) {
      if (!totalEarned) return "0.00"; // Caso o valor seja nulo ou indefinido
      try {
        // Converte de Wei para USDT e formata para duas casas decimais
        return parseFloat(ethers.utils.formatUnits(totalEarned, 18)).toFixed(2);
      } catch (error) {
        // console.error("Erro ao formatar o ganho total:", error);
        return "0.00"; // Retorna um valor padrão em caso de erro
      }
    },

    // Formata a data em formato legível
    formatDate(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString('pt-BR')
    },

    async fetchQueueData() {

      this.loadingQueue = true;

      if (!this.contract) return;

      try {
        // Obtém o índice de início da fila (ordens não processadas)
        const queueStartIndex = (await this.contract.queueStartIndex()).toNumber();

        // Define o número máximo de ordens para buscar (ajuste conforme necessário)
        const maxQueueSize = 60;

        // Busca os dados da fila a partir de `queueStartIndex`
        const queueData = await this.contract.getaidQueue(queueStartIndex, queueStartIndex + maxQueueSize, 2);

        // Define o horário atual em segundos
        const currentTime = Math.floor(Date.now() / 1000);

        // Processa os dados da fila
        this.queue = queueData.map((item) => {
          const expirationTime = item.expirationTime.toNumber();
          const currentTime = Math.floor(Date.now() / 1000);
          const originalRemainingTime = Math.max(expirationTime - currentTime, 0);

          return {
            user: item.user,
            emblemId: item.emblemId,
            totalAidAmount: parseFloat(ethers.utils.formatUnits(item.remainingAid.add(item.receivedAmount), 18)).toFixed(2),
            remainingAid: parseFloat(ethers.utils.formatUnits(item.remainingAid, 18)).toFixed(2),
            receivedAmount: parseFloat(ethers.utils.formatUnits(item.receivedAmount, 18)).toFixed(2),
            expirationTime,
            timeRemaining: Math.max(originalRemainingTime - 604800, 0),
            status: item.status,
          };
        });

        // Calcula o valor total restante na fila
        const totalRemainingAid = this.queue.reduce((total, item) => {
          return total + parseFloat(item.remainingAid);
        }, 0);

        // Atualiza a estatística "Valor Total na Fila"
        const index = this.stats.findIndex((stat) => stat.label === 'Valor Total na Fila de Distribuição (USDT)');
        if (index !== -1) {
          this.stats[index].value = `${totalRemainingAid.toFixed(2)} USDT`;
        } else {
          this.stats.push({
            label: 'Valor Total na Fila de Distribuição (USDT)',
            value: `${totalRemainingAid.toFixed(2)} USDT`,
          });
        }

        // Se não houver itens na fila, limpa o array para mostrar a mensagem de vazio
        if (this.queue.length === 0) {
          this.queue = [];
        }

        setTimeout(() => {
          this.loadingQueue = false;
        }, 2000)
        
      } catch (error) {
        setTimeout(() => {
          this.loadingQueue = false;
        }, 2000)
        // console.error('Erro ao buscar dados da fila:', error);
      }
    },
    // Formata o tempo restante para exibição no formato "Xh Ym"
    formatTimeRemainingForQueue(request) {
      const seconds = request.timeRemaining || 0;

      if (seconds <= 0) return 'Expirado';

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      return `${hours}h ${minutes}m`;
    },

    // Calcula a porcentagem de tempo restante para a barra de progresso
    timeRemainingPercentageForQueue(request) {
      const maxTime = 24 * 3600; // 24 horas em segundos
      return Math.min(((request.timeRemaining || 0) / maxTime) * 100, 100); // Limite em 100%
    },
    compactAddress(address) {
      if (!address || address.length !== 42) {
        throw new Error('Endereço inválido');
      }
      return address.substring(0, 6) + '...' + address.substring(address.length - 4);
    },
    formatCommitmentCost(level) {
      return (level * this.commitmentBaseCost).toFixed(2); // Cálculo do custo do compromisso
    },
    formatRenewalCost(level) {
      return (level * this.renewalMultiplier).toFixed(2); // Cálculo do custo da renovação
    },
    formatAidRequestReward(level) {
      return (level * this.rewardMultiplier).toFixed(2); // Estimativa de recompensa de ajuda
    },
    async fetchFullReferralTree() {
      if (!this.contract || !this.userAddress) return;

      try {
        // Chama a função do contrato para obter toda a rede
        const tree = await this.contract.getFullReferralTree(this.userAddress);

        const seenAddresses = new Set();

        // Processa os dados para corrigir os níveis e remover duplicados
        this.fullReferralTree = tree
          .map((ref) => ({
            referredAddress: ref.referredAddress,
            joinDate: ref.joinDate.toNumber(),
            bonusReceived: ethers.utils.formatUnits(ref.bonusReceived.toString(), 18), // Converte o valor
            level: ref.level, // Este nível já deve vir correto do contrato
          }))
          .filter((ref) => {
            if (seenAddresses.has(ref.referredAddress)) {
              return false; // Ignorar endereços duplicados
            }
            seenAddresses.add(ref.referredAddress); // Adicionar ao conjunto de endereços vistos
            return true; // Incluir no resultado final
          });

        // Ordena os dados pelo nível (caso necessário)
        this.fullReferralTree.sort((a, b) => a.level - b.level);
      } catch (error) {
        this.$toast.error(this.$t("Falha ao carregar a rede completa de indicações."));
      }
    },
    openFullReferralTreeModal() {
      // Antes de abrir o modal, buscarmos a árvore completa
      this.fetchFullReferralTree();
      this.showFullReferralTreeModal = true;
    },
    navigateToBuyInvistech() {
      window.open('https://pancakeswap.finance/?outputCurrency=0xAA217F7BAb90100419b99c027adCf5F0A005C192', '_blank');
    },
    // Redireciona para o gráfico de preço do token Invistech
    viewPriceChart() {
      window.open('https://dexscreener.com/bsc/0xcebb17c174195d99a1d121e8186bd3a5ab6911e0', '_blank');
    },
    formatBonus(bonus) {
      // Converte de Wei (10^18) para USDT, assumindo que bonusReceived veio em wei:
      const formatedValue = parseFloat(ethers.utils.formatUnits(bonus.toString(), 18)).toFixed(2);
      return formatedValue;
    },
    async loadInvistechData() {
      try {
        // Inicia o loading do saldo
        this.balanceLoading = true;

        const signer = this.provider.getSigner();
        const invtContract = new ethers.Contract(
          '0xAA217F7BAb90100419b99c027adCf5F0A005C192', // Endereço do token INVT
          IERC20ABI,
          signer
        );

        // 1) Busca o saldo do usuário em INVT
        const balanceRaw = await invtContract.balanceOf(this.userAddress);
        const balanceDecimal = parseFloat(ethers.utils.formatUnits(balanceRaw, 18));
        this.userInvistechBalance = balanceDecimal.toFixed(2);

        // 2) Obtém o preço do INVT em USDT (on-chain)
        const priceRaw = await this.contract.getInvtPriceInUSDT();
        const priceDecimal = parseFloat(ethers.utils.formatUnits(priceRaw, 18));
        this.currentInvtPriceInUSD = priceDecimal.toFixed(4);

        // 3) Multiplica saldo * preço => valor total em USDT
        const totalValue = balanceDecimal * priceDecimal;
        this.userInvtBalanceInUSD = totalValue.toFixed(2);

      } catch (error) {
        console.error('Erro ao carregar dados do INVT:', error);
      } finally {
        // Finaliza o loading do saldo
        this.balanceLoading = false;
      }
    },
  },
}
</script>

<style scoped>
.text-header-gradient {
  background: linear-gradient(169.4deg, #3984f4 -6.01%, #0cd3ff 36.87%, #2f7cf0 78.04%, #0e65e8 103.77%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Estilos para mensagens de sucesso e erro */
.text-success {
  color: #38a169;
  /* Verde */
}

.text-error {
  color: #e53e3e;
  /* Vermelho */
}

/* Botão flutuante */
button.fixed {
  transition: transform 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button.fixed:hover {
  transform: scale(1.1);
}

/* Modal de Emblemas */
.modal-emblem {
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
}

.modal-emblem .sticky {
  position: sticky;
  top: 0;
}

.modal-emblem .p-6 {
  padding: 1.5rem;
}

/* Modal de Gráfico de Preço */
.modal-price {
  background: rgba(0, 0, 0, 0.75);
  /* Fundo escuro translúcido */
}

.modal-price iframe {
  border: none;
}

.modal-price .w-full {
  width: 100%;
  height: 100%;
}

.progress-bar {
  background-color: #d1d5db; /* Cor de fundo da barra */
  border-radius: 9999px; /* Barra arredondada */
  height: 0.625rem; /* Altura da barra */
  width: 100%; /* Largura total */
  position: relative;
}

.progress-bar-inner {
  background-color: #2563eb; /* Cor azul para a barra de progresso */
  border-radius: 9999px;
  height: 100%; /* Altura total da barra interna */
  transition: width 0.3s ease-in-out; /* Animação suave */
}
</style>
