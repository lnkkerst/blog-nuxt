// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';
import transformerDirectives from '@unocss/transformer-directives';

export default defineNuxtConfig({
  srcDir: 'src/',
  css: ['assets/styles/main.scss'],
  build: {
    transpile: ['vuetify', 'overlayscrollbars-vue']
  },
  experimental: {
    inlineSSRStyles: false,
    reactivityTransform: true
  },
  runtimeConfig: {
    public: {
      hostname: process.env.BLOG_HOSTNAME ?? 'https://example.com'
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      title: "lnkkerst's blog",
      meta: [{ name: 'description', content: "lnkkerst's blog" }]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@unocss/nuxt',
    'nuxt-headlessui',
    'nuxt-icons',
    'nuxt-icon',
    // 'nuxt-typed-router',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/robots',
    'nuxt-swiper',
    '@nuxt/image-edge',
    '@pinia/nuxt',
    '@nuxt/content',
    async (_options, nuxt) => {
      nuxt.hooks.hook(
        'vite:extendConfig',
        config => config.plugins?.push(vuetify()) as any
      );
    }
  ],
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    typography: true,
    tagify: {
      prefix: 'un-'
    },
    webFonts: {},
    transformers: [transformerDirectives()]
  },
  i18n: {
    defaultLocale: 'zh',
    locales: [
      { code: 'zh', iso: 'zh-CN', file: 'zh-CN.yaml', name: '简体中文' },
      { code: 'en', iso: 'en-US', file: 'en-US.yaml', name: 'English' }
    ],
    langDir: 'src/locales/',
    vueI18n: {
      legacy: false,
      locale: 'zh',
      fallbackLocale: 'en'
    }
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: ''
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: ['javascript', 'typescript']
    }
  }
});
