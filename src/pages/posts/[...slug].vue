<script lang="ts" setup>
import { mdiAlert } from '@mdi/js';
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

const { locale, t } = useI18n();
const route = useRoute();

const loading = useState('loading', () => true);
const contentLanguage = useState('content-language', () => locale.value);
const { data } = useAsyncData('content', async () => {
  loading.value = true;
  let res: ParsedContent | null;
  try {
    res = await queryContent(
      `/posts/${(route.params as any).slug[0]}/index.${locale.value}`
    ).findOne();
  } catch (_e) {
    res = await queryContent(
      `/posts/${(route.params as any).slug[0]}/index.zh`
    ).findOne();
    contentLanguage.value = 'zh';
  }
  loading.value = false;
  return res;
});
</script>

<template>
  <div relative>
    <client-only>
      <div v-if="loading" mt="xl">
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
      </div>
    </client-only>

    <div v-show="!loading">
      <div v-if="contentLanguage !== locale" pb="sm" class="text-warning">
        <v-icon :icon="mdiAlert"></v-icon>
        {{ t('other_language') }}
      </div>
      <ContentRenderer
        prose
        max-w-full
        class="markdown-body"
        :value="data as any"
      >
        <template #empty>{{ t('not_found') }}</template>
      </ContentRenderer>
    </div>
  </div>
</template>

<style lang="scss" src="~/assets/styles/markdown.scss"></style>

<i18n lang="yaml">
zh:
  not_found: 请求的文章不存在
  other_language: 此文章没有简体中文的版本，按理说应该有的，现在显示的不知道是什么

en:
  not_found: Not found
  other_language: 'This article does not have the English version, but now shows the 简体中文 version.'
</i18n>
