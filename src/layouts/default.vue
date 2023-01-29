<script setup lang="ts"></script>

<template>
  <OverlayScrollbars
    h="screen"
    w="screen"
    :options="{ scrollbars: { autoHide: 'move', clickScroll: true } }"
    defer
  >
    <slot />
  </OverlayScrollbars>
</template>

<style scoped></style>
