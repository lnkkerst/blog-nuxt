<script lang="ts" setup>
definePageMeta({
  pageTransition: {
    name: 'slide-fade-in'
  }
});
</script>

<template>
  <div>
    <ContentDoc path="/pages/about.zh" class="markdown-body" prose></ContentDoc>
  </div>
</template>
