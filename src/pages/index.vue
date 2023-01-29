<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    {{ t('hello') }}
  </div>
</template>

<style lang="scss" scoped></style>

<i18n lang="yaml">
en:
  hello: hello world
zh-CN:
  hello: 你好，世界
</i18n>
