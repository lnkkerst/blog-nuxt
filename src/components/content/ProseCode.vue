<script lang="ts" setup>
import { mdiCheck, mdiClipboard } from '@mdi/js';

const props = withDefaults(
  defineProps<{
    code: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
    meta?: string | null;
  }>(),
  {
    code: '',
    language: null,
    filename: null,
    highlights: () => [],
    meta: null
  }
);

const copying = ref(false);
const copyIcon = ref(mdiClipboard);

const handleCopy = async () => {
  copying.value = true;
  await navigator.clipboard.writeText(props.code);
  copying.value = false;
  copyIcon.value = mdiCheck;
  setTimeout(() => {
    copyIcon.value = mdiClipboard;
  }, 800);
};
</script>

<template>
  <div relative class="code-block bg-surface0" rounded-md>
    <div h="2.5rem" flex items-center p="1" class="text-text">
      <span text="sm" font="bold" ml="3" cursor="default">
        {{ props.language?.toUpperCase() }}
      </span>
      <span ml="2" text="xs" cursor="default">{{ props.filename }}</span>

      <div grow></div>

      <v-btn
        :loading="copying"
        variant="text"
        size="small"
        color="text"
        :icon="copyIcon"
        @click="handleCopy"
      ></v-btn>
    </div>

    <OverlayScrollbars :options="{ overflow: { x: 'scroll', y: 'scroll' } }">
      <slot />
    </OverlayScrollbars>
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>

<style lang="scss" scoped>
.code-block:deep(pre) {
  margin: 0 0;
  width: fit-content;
  min-width: 100%;
}
</style>
