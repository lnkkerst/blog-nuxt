<script setup lang="ts">
import {
  mdiBrightnessAuto,
  mdiEmail,
  mdiGithub,
  mdiThemeLightDark,
  mdiTranslate,
  mdiTwitter,
  mdiWeatherNight,
  mdiWhiteBalanceSunny
} from '@mdi/js';
import { LocaleObject } from 'vue-i18n-routing';
import { useTheme } from 'vuetify/lib/framework.mjs';
import mdiTelegramSvg from '~/assets/svgs/MdiTelegram.svg?raw';

const router = useRouter();
const { t } = useI18n();
const vuetifyTheme = useTheme();
const colorMode = useColorMode();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const colorCookie = useCookie('color-mode', { maxAge: 31536000 });
const mdiTelegram = mdiTelegramSvg.match(/path d="(.*?)"/)[1];
const links = ref([
  {
    url: 'https://github.com/lnkkerst',
    icon: mdiGithub
  },
  {
    url: 'https://twitter.com/lnkkerst1',
    icon: mdiTwitter
  },
  {
    url: 'https://t.me/lnkkerst',
    icon: mdiTelegram
  },
  {
    url: 'mailto:lnkkerst04@gmail.com',
    icon: mdiEmail
  }
]);

if (['dark', 'light'].includes(colorCookie.value as string)) {
  vuetifyTheme.global.name.value = colorCookie.value as string;
}

onMounted(() => {
  setTimeout(() => {
    watchEffect(() => {
      vuetifyTheme.global.name.value = colorMode.value;
      colorCookie.value = colorMode.value;
    });
  });
});
</script>

<template>
  <OverlayScrollbars
    class="page-os"
    overflow="auto"
    h="screen"
    w="screen"
    :options="{
      paddingAbsolute: true,
      scrollbars: { autoHide: 'move', clickScroll: true }
    }"
    defer
  >
    <NuxtLoadingIndicator
      :color="colorMode.value === 'light' ? '#1e66f5' : '#89b4fa'"
      :height="2"
    ></NuxtLoadingIndicator>

    <v-app class="text-text">
      <header
        fixed
        left="0"
        right="0"
        z="1001"
        flex
        items-center
        h="56px"
        px-4
        rounded-b-2
        ring="#b4befe 1"
        class="bg-surface text-text"
      >
        <div text-xl>
          <NuxtLink :to="localePath('/')">lnkkerst's blog</NuxtLink>
        </div>

        <v-btn ml="1" variant="text" color="text" size="x-small">
          <NuxtLink to="https://blog-legacy.lnkkerst.me/">
            {{ t('legacy_version') }}
          </NuxtLink>
        </v-btn>

        <div grow></div>

        <div
          relative
          hidden
          sm:flex
          items-center
          mr="6"
          class="text-text"
          gap="6"
          text="sm"
        >
          <NuxtLink
            v-for="page in ['about', 'links']"
            :key="page"
            :to="localePath(`/${page}`)"
            hover:opacity="72"
            font-medium
          >
            {{ t(`pages.${page}`) }}
          </NuxtLink>
        </div>

        <div relative hidden md:flex item-center mr="3" class="text-text">
          <NuxtLink
            v-for="link in links"
            :key="link.url"
            :to="link.url"
            target="_blank"
          >
            <v-btn :icon="link.icon" variant="text"></v-btn>
          </NuxtLink>
        </div>

        <div relative flex items-center>
          <v-menu>
            <template #activator="{ props }">
              <v-btn :icon="mdiTranslate" v-bind="props" variant="text"></v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in (locales as LocaleObject[])"
                :key="item.code"
                color="primary"
                :value="item.code"
                :active="item.code === locale"
                @click="router.push(switchLocalePath(item.code))"
              >
                {{ item.name }}
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu>
            <template #activator="{ props }">
              <v-btn
                :icon="mdiThemeLightDark"
                v-bind="props"
                variant="text"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="color of ['system', 'light', 'dark']"
                :key="color"
                color="primary"
                :value="color"
                :active="color === $colorMode.preference"
                @click="$colorMode.preference = color"
              >
                <v-icon
                  :icon="
                    {
                      system: mdiBrightnessAuto,
                      light: mdiWhiteBalanceSunny,
                      dark: mdiWeatherNight
                    }[color]
                  "
                ></v-icon>
                <span ml="sm">{{ t(`colorMode.${color}`) }}</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </header>

      <main pt="56px">
        <v-container>
          <slot />
        </v-container>
      </main>

      <footer>
        <v-container>
          <div class="text-subtext0" text-center>
            <NuxtLink
              to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              opacity-72
              hover:opacity-100
            >
              CC BY-NC-SA 4.0
            </NuxtLink>
            {{ '© 2022-PRESENT  lnkkerst' }}
          </div>
        </v-container>
      </footer>
    </v-app>
  </OverlayScrollbars>
</template>

<style lang="scss" scoped>
.page-os:deep(.os-viewport) {
  scroll-padding-top: 72px;
}
</style>

<i18n lang="yaml">
zh:
  colorMode:
    system: 自动
    light: 亮色
    dark: 暗色
  legacy_version: 旧版入口
  pages:
    about: 关于
    links: 友链

en:
  colorMode:
    system: Auto
    light: Light
    dark: Dark
  legacy_version: Legacy version
  pages:
    about: About
    links: Links
</i18n>
