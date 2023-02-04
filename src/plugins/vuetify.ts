import type { ThemeDefinition } from 'vuetify';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { latte, mocha } from '~/utils/colors/catppuccin';

const catppucinMochaTheme: ThemeDefinition = {
  dark: true,
  colors: {
    ...mocha,
    background: mocha.base,
    surface: mocha.mantle,
    primary: mocha.lavender,
    secondary: mocha.mauve,
    error: mocha.red,
    info: mocha.blue,
    success: mocha.green,
    warning: mocha.yellow,
    text: mocha.text
  }
};

const catppuccinLatteTheme: ThemeDefinition = {
  dark: false,
  colors: {
    ...latte,
    background: latte.base,
    surface: latte.mantle,
    primary: latte.lavender,
    secondary: latte.mauve,
    error: latte.red,
    info: latte.blue,
    success: latte.green,
    warning: latte.yellow,
    text: latte.text
  }
};

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(
    createVuetify({
      ssr: true,
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi
        }
      },
      theme: {
        defaultTheme: 'dark',
        themes: {
          dark: catppucinMochaTheme,
          light: catppuccinLatteTheme,
          system: catppucinMochaTheme
        }
      }
    })
  );
});
