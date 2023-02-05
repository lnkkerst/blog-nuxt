<script lang="ts" setup>
import { mdiAlert } from '@mdi/js';

const { locale, t } = useI18n();
const route = useRoute();

const slug = (route.params.slug as string[]).join('/');
</script>

<template>
  <div relative>
    <ContentDoc :path="`/posts/${slug}/index.${locale}`" class="markdown-body">
      <template #not-found>
        <div class="text-warning" flex items-center>
          <v-icon :icon="mdiAlert" size="small"></v-icon>
          <span text="sm">
            {{ t('other_language') }}
          </span>
        </div>

        <ContentDoc :path="`posts/${slug}/index.zh`" class="markdown-body">
          <template #not-found>{{ t('not_found') }}</template>
          <template #empty>{{ t('empty') }}</template>
        </ContentDoc>
      </template>
      <template #empty>{{ t('empty') }}</template>
    </ContentDoc>
  </div>
</template>

<i18n lang="yaml">
zh:
  not_found: 请求的文章不存在
  empty: 文章没有内容
  other_language: 此文章没有简体中文的版本，按理说应该有的，现在显示的不知道是什么

en:
  not_found: Not found
  empty: This post is empty
  other_language: 'This article does not have the English version, but now shows the 简体中文 version.'
</i18n>
