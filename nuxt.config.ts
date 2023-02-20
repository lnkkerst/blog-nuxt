// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';
import transformerDirectives from '@unocss/transformer-directives';

// I don't know why it doesn't work :(
const isCustomElement = (tag: string) => {
  return [
    'annotation',
    'maction',
    'math',
    'menclose',
    'merror',
    'mfenced',
    'mfrac',
    'mglyph',
    'mi',
    'mlabeledtr',
    'mmultiscripts',
    'mn',
    'mo',
    'mover',
    'mpadded',
    'mphantom',
    'mroot',
    'mrow',
    'ms',
    'mspace',
    'msqrt',
    'mstyle',
    'msub',
    'msubsup',
    'msup',
    'mtable',
    'mtd',
    'mtext',
    'mtr',
    'munder',
    'munderover',
    'semantics'
  ].includes(tag);
};

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
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement
        }
      }
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement
    }
  },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/robots',
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
    typography: {
      selectorName: 'markdown-body'
    },
    tagify: {
      prefix: 'un-'
    },
    webFonts: {
      provider: 'google',
      fonts: { mono: ['Jetbrains Mono', 'Fira Code'] }
    },
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
      preload: ['javascript', 'typescript'],
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    },
    markdown: {
      remarkPlugins: {
        'remark-math': {},
        'remark-toc': {}
      },
      rehypePlugins: {
        'rehype-katex': {
          output: 'html'
        }
      }
    }
  }
});
