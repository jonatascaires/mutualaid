export default {
  // Alvo e modo SSR habilitados
  target: 'server',
  ssr: true,

  // Configuração do servidor
  server: {
    host: '0.0.0.0', // Permite acesso externo
    port: 3000, // Porta padrão
  },

  // Configurações de meta tags e cabeçalhos
  head: {
    title: 'InvisTribe - Your Path To Passive Income',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
    ],
  },

  // CSS global e de terceiros
  css: ['@/assets/css/main.css', 'aos/dist/aos.css'],

  // Plugins para carregar antes de montar o aplicativo
  plugins: [
    '~/plugins/smooth-scroll.js',
    '~/plugins/mdi.js',
    '~/plugins/toast.client.js',
    '~/plugins/vue-scrollto.js',
  ],

  // Diretório de componentes (autoimportação)
  components: true,

  // Módulos de build (desenvolvimento)
  buildModules: [
    '@nuxtjs/eslint-module', // ESLint
    '@nuxt/postcss8', // PostCSS 8
    '@nuxtjs/composition-api/module', // API de composição do Vue 3
  ],

  // Módulos padrão (pode adicionar outros se necessário)
  modules: [],

  // Configuração de build e PostCSS
  build: {
    postcss: {
      plugins: {
        tailwindcss: {}, // Configuração do Tailwind CSS
        autoprefixer: {}, // Configuração do Autoprefixer
      },
    },
    // Configuração adicional para lidar com arquivos `.psd` (caso precise manter)
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.psd$/,
        use: 'ignore-loader', // Ignora arquivos `.psd` durante o build
      });
    },
  },

  // Configuração de fallback para rotas inexistentes
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'not-found',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'), // Página personalizada para 404
      });
    },
  },
};
