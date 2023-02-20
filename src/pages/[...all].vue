<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <div class="markdown-body">
    <p>404</p>
    <NuxtLink :to="localePath('/')">{{ t('back_to_home') }}</NuxtLink>
  </div>
</template>

<i18n lang="yaml">
zh:
  back_to_home: 回到首页

en:
  back_to_home: Back to home
</i18n>
