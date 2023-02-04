<script setup lang="ts">
import {
  mdiBrightnessAuto,
  mdiThemeLightDark,
  mdiTranslate,
  mdiWeatherNight,
  mdiWhiteBalanceSunny
} from '@mdi/js';
import { LocaleObject } from 'vue-i18n-routing';
import { useTheme } from 'vuetify/lib/framework.mjs';

const router = useRouter();
const { t } = useI18n();
const vuetifyTheme = useTheme();
const colorMode = useColorMode();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const colorCookie = useCookie('color-mode', { maxAge: 31536000 });

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
        class="bg-surface"
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

        <v-menu>
          <template #activator="{ props }">
            <v-btn :icon="mdiTranslate" v-bind="props" variant="flat"></v-btn>
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
              variant="flat"
              ml-1
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

en:
  colorMode:
    system: Auto
    light: Light
    dark: Dark
  legacy_version: Legacy version
</i18n>
