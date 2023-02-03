<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

interface Post {
  title: string;
  description: string;
  excerpt: ParsedContent;
  slug: string;
  language: string;
  languages: string[];
}

const { locale, t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

const { data: query } = await useAsyncData(() =>
  queryContent('/posts')
    .only(['title', 'description', 'excerpt', '_dir', '_path'])
    .find()
);

const posts = computed(() => {
  if (query === null) {
    return [];
  }

  const res: { [name: string]: Post } = {};

  query.value?.forEach(post => {
    const { title, description, excerpt, _dir: slug, _path } = post;
    const language = _path.split('.').at(-1);
    if (!res[slug]) {
      res[slug] = {
        slug,
        title,
        description,
        excerpt,
        language,
        languages: [language]
      };
    } else if (language === locale.value) {
      res[slug] = { ...res[slug], language, description, title, excerpt };
      res[slug].languages.push(language);
    }
  });

  return res;
});
</script>

<template>
  <div>
    <div>
      <template v-for="post in posts" :key="post.title">
        <v-card mb-4>
          <v-card-title>
            {{ post.title }}
          </v-card-title>

          <v-card-text>
            {{ post.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              variant="text"
              color="primary"
              @click="router.push(localePath(`/posts/${post.slug}`))"
            >
              {{ t('read_more') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<i18n lang="yaml">
zh:
  read_more: 查看全文

en:
  read_more: READ MORE
</i18n>
