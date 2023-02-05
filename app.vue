<script lang="ts" setup>
const { locale } = useI18n();

useHead({
  title: "lnkkerst's blog",
  htmlAttrs: {
    lang: { zh: 'zh-CN', en: 'en-US' }[locale.value]
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
