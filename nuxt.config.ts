// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  alias: {
    '~': '/<rootDir>',
    '@': '/<rootDir>',
    assets: '/<rootDir>/assets',
    public: '/<rootDir>/public'
  },
  css: [
    'overlayscrollbars/overlayscrollbars.css',
    '@unocss/reset/tailwind.css',
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css'
  ],
  build: {
    transpile: ['vuetify', 'overlayscrollbars-vue']
  },
  experimental: {
    inlineSSRStyles: false,
    reactivityTransform: true
  },
  modules: [
    '@unocss/nuxt',
    'nuxt-headlessui',
    'nuxt-icons',
    'nuxt-typed-router',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/robots',
    'nuxt-swiper',
    '@nuxt/image-edge',
    '@pinia/nuxt'
  ],
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    typography: true,
    tagify: true,
    webFonts: {}
  },
  i18n: {
    locales: ['zh-CN', 'en'],
    defaultLocale: 'zh-CN',
    vueI18n: {
      legacy: false,
      locale: 'zh-CN',
      fallbackLocale: 'en'
    }
  },
  colorMode: {
    preference: 'system',
    fallback: 'light'
  }
});
