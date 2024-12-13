<template>
  <nav id="navbar" class="relative z-10 w-full text-neutral-800 bg-white shadow-md">
    <div class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
      <div class="flex items-center">
        <div class="mr-4 lg:mr-8">
          <img :src="require('~/assets/img/logo/mutualaid-logo.svg')" class="w-24 xl:w-36" alt="MutualAid Logo" />
        </div>
        <!-- Menu para telas grandes -->
        <ul class="hidden lg:flex lg:space-x-6">
          <NavLink :name="$t('Início')" url="#hero" />
          <NavLink :name="$t('Comprar')" url="#purchase-emblem" />
          <NavLink :name="$t('Token')" url="#token-partnership" />
          <NavLink :name="$t('Bônus')" url="#referral-bonus" />
          <NavLink :name="$t('Estatísticas')" url="#community-stats" />
          <NavLink :name="$t('Segurança')" url="#security" />
        </ul>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Seletor de idiomas -->
        <div class="relative">
          <button @click="toggleLanguageDropdown"
            class="flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <img :src="currentFlag" alt="Current Language" class="w-6 h-6 mr-2" />
            <span>{{ currentLanguageLabel }}</span>
            <svg class="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="showDropdown"
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div v-for="(language, code) in languages" :key="code" @click="selectLanguage(code)"
              class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <img :src="language.flag" :alt="language.label" class="w-6 h-6 mr-2" />
              <span>{{ language.label }}</span>
            </div>
          </div>
        </div>
        <!-- Botão de menu para dispositivos móveis -->
        <button class="lg:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="toggleMenu">
          <SegmentIcon v-if="!open" :size="24" />
          <CloseIcon v-else :size="24" />
        </button>
        <!-- Informações de conexão para telas grandes -->
        <div class="hidden lg:flex items-center space-x-3">
          <button v-if="!isConnected"
            class="px-4 py-2 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] text-white rounded-lg" @click="connectWallet">
            {{ $t('Conectar Carteira') }}
          </button>
          <div v-else class="flex items-center space-x-2">
            <span class="px-3 py-1 bg-gray-100 rounded-full text-gray-800">{{ shortenedAddress }}</span>
            <span class="flex items-center px-3 py-1 bg-gray-100 rounded-full text-gray-800">
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" class="w-5 h-5 mr-1" />
              {{ usdtBalance }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Menu para dispositivos móveis -->
    <div v-if="open" class="lg:hidden mt-2 bg-white shadow-md w-full px-4 py-4">
      <ul class="flex flex-col space-y-3">
        <NavLink name="Início" url="#hero" />
        <NavLink name="Fila" url="#help-queue" />
        <NavLink name="Participar" url="#purchase-emblem" />
        <NavLink name="Token" url="#token-partnership" />
        <NavLink name="Bônus" url="#referral-bonus" />
        <NavLink name="Estatísticas" url="#community-stats" />
        <NavLink name="Segurança" url="#security" />
        <NavLink name="FAQ" url="#faq" />
        <!-- Informações de conexão para dispositivos móveis -->
        <li class="flex flex-col space-y-2 mt-4">
          <button v-if="!isConnected"
            class="w-full px-6 py-2 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] text-white rounded-lg"
            @click="connectWallet">
            {{ $t('Conectar Carteira') }}
          </button>
          <div v-else class="flex flex-col space-y-2 items-center">
            <span class="px-3 py-1 bg-gray-100 rounded-full text-gray-800">{{ shortenedAddress }}</span>
            <span class="flex items-center px-3 py-1 bg-gray-100 rounded-full text-gray-800">
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" class="w-5 h-5 mr-1" />
              {{ usdtBalance }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import SegmentIcon from 'vue-material-design-icons/Menu.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { ethers } from 'ethers'
import NavLink from '@/components/NavLink.vue'

// Endereço do contrato USDT na Binance Smart Chain
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955' // Coloque o endereço correto do contrato USDT
// ABI padrão de ERC-20 para consulta do saldo
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
]

export default {
  components: {
    SegmentIcon,
    CloseIcon,
    NavLink,
  },
  data() {
    return {
      open: false,
      address: null,
      networkId: null,
      usdtBalance: '0.00',
      requiredChainId: '56', // BSC Mainnet
      currentLanguage: 'en', // Idioma padrão
      showDropdown: false,
      languages: {
        en: { label: 'ENG', flag: 'https://flagcdn.com/w40/us.png' },
        pt: { label: 'PT', flag: 'https://flagcdn.com/w40/br.png' },
        es: { label: 'ES', flag: 'https://flagcdn.com/w40/es.png' },
      },
    }
  },
  computed: {
    isConnected() {
      return !!this.address
    },
    shortenedAddress() {
      return this.address ? `${this.address.slice(0, 6)}...${this.address.slice(-4)}` : ''
    },
    currentLanguageLabel() {
      return this.languages[this.currentLanguage].label;
    },
    currentFlag() {
      return this.languages[this.currentLanguage].flag;
    },
  },
  mounted() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', this.handleAccountsChanged)
      window.ethereum.on('chainChanged', this.handleChainChanged)

      window.ethereum.request({ method: 'net_version' }).then((netId) => {
        this.networkId = netId
        if (netId !== this.requiredChainId) {
          this.switchToBscNetwork()
        }
      })
    }
  },
  unmounted() {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', this.handleChainChanged)
    }
  },
  methods: {
    toggleLanguageDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectLanguage(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
      this.showDropdown = false;
    },
    toggleMenu() {
      this.open = !this.open
    },
    async connectWallet() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          this.address = accounts[0]
          this.networkId = await window.ethereum.request({ method: 'net_version' })

          if (this.networkId !== this.requiredChainId) {
            await this.switchToBscNetwork()
          }
          await this.fetchUsdtBalance()
        } catch (error) {
          console.error('Erro ao conectar a carteira:', error)
          this.toast().error('Erro ao conectar a carteira')
          if (error.code === -32002) {
            this.toast().error('Já existe uma solicitação de conexão pendente. Verifique no MetaMask.')
          }
        }
      } else {
        this.toast().error('Por favor, instale uma carteira Ethereum como o MetaMask.')
      }
    },
    parseWeiToEther(valueInWei, decimals = 18) {
      const valueInWeiBigInt = BigInt(valueInWei)

      const weiToEther = BigInt(10 ** decimals)

      const wholePart = valueInWeiBigInt / weiToEther
      const remainder = valueInWeiBigInt % weiToEther

      const remainderPadded = remainder.toString().padStart(decimals, '0')

      const result = `${wholePart}.${remainderPadded}`

      return result
    },
    async fetchUsdtBalance() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const usdtContract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, provider)

        // Busca o saldo bruto da conta
        const balance = await usdtContract.balanceOf(this.address)

        // Confere o formato correto de unidades com 6 casas decimais (para USDT)
        const formattedBalance = this.parseWeiToEther(balance)

        // Arredonda para duas casas decimais para exibição
        this.usdtBalance = parseFloat(formattedBalance).toFixed(2)
      } catch (error) {
        console.error('Erro ao buscar saldo de USDT:', error)
        this.toast().error('Erro ao buscar saldo de USDT')
      }
    },
    async switchToBscNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }],
        })
        this.toast().success('Rede trocada para Binance Smart Chain')
      } catch (error) {
        if (error.code === 4902) {
          this.toast().error('Rede BSC não encontrada. Adicionando a rede.')
          await this.addBscNetwork()
        } else {
          console.error('Erro ao trocar a rede:', error)
          this.toast().error('Erro ao trocar para a rede BSC')
        }
      }
    },
    async addBscNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x38',
              chainName: 'Binance Smart Chain Mainnet',
              nativeCurrency: {
                name: 'Binance Coin',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com'],
            },
          ],
        })
        this.toast().success('Rede BSC adicionada e selecionada')
      } catch (addError) {
        console.error('Erro ao adicionar a rede BSC:', addError)
        this.toast().error('Erro ao adicionar a rede BSC')
      }
    },
    handleAccountsChanged(accounts) {
      this.address = accounts[0] || null
      if (this.address) {
        this.fetchUsdtBalance()
      } else {
        this.usdtBalance = '0.00'
      }
    },
    async handleChainChanged(chainId) {
      this.networkId = chainId
      if (chainId !== this.requiredChainId) {
        await this.switchToBscNetwork()
      }
    },
  },
}
</script>

<style scoped>
#navbar {
  padding: 0.5rem;
}

@media (max-width: 1024px) {
  .flex.items-center.space-x-4 {
    padding: 0.5rem;
  }

  .lg\:hidden {
    padding: 1rem 0;
  }
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}
</style>
