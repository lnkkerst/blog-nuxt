<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { gsap } from 'gsap';

interface Post {
  title: string;
  description: string;
  excerpt: ParsedContent;
  slug: string;
  pubDate: string;
  language: string;
  languages: string[];
}

const { locale, t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

const { data: query } = await useAsyncData(() =>
  queryContent('/posts')
    .only(['title', 'description', 'excerpt', '_dir', '_path', 'pubDate'])
    .sort({ pubDate: -1 })
    .find()
);

const fl = ref(true);

const posts = computed(() => {
  if (fl.value) {
    return [];
  }

  if (query.value === null) {
    return [];
  }

  const record: { [name: string]: Post } = {};

  query.value?.forEach(post => {
    const { title, description, excerpt, _dir: slug, _path, pubDate } = post;
    const language = _path.split('.').at(-1);
    if (!record[slug]) {
      record[slug] = {
        slug,
        title,
        description,
        excerpt,
        pubDate,
        language,
        languages: [language]
      };
    } else if (language === locale.value) {
      record[slug] = { ...record[slug], language, description, title, excerpt };
      record[slug].languages.push(language);
    }
  });

  const res = [];
  for (const i of Reflect.ownKeys(record)) {
    res.push(record[i as string]);
  }

  return res;
});

function onBeforeEnter(el: any) {
  el.style.opacity = 0;
  el.style.transform = 'translateY(32px)';
}

function onEnter(el: any, done: gsap.Callback) {
  gsap.to(el, {
    opacity: 1,
    translateY: '0px',
    delay: el.dataset.index * 0.15,
    onComplete: done
  });
}

function onLeave(el: any, done: gsap.Callback) {
  gsap.to(el, {
    opacity: 0,
    translateY: '32px',
    delay: el.dataset.index * 0.15,
    onComplete: done
  });
}

onMounted(() => {
  fl.value = false;
});
</script>

<template>
  <div>
    <transition-group
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <v-card
        v-for="(post, index) in posts"
        :key="post.title"
        mb-4
        variant="tonal"
        :data-index="index"
      >
        <v-card-title>
          <NuxtLink :to="localePath(`/posts/${post.slug}`)">
            {{ post.title }}
          </NuxtLink>
        </v-card-title>

        <v-card-subtitle>
          <span>{{ post.pubDate }}</span>
          <span text="0.9rem" class="text-primary">{{ ' | ' }}</span>
          <span>{{ post.languages.join(' + ') }}</span>
        </v-card-subtitle>

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
    </transition-group>
  </div>
</template>

<style lang="scss" scoped></style>

<i18n lang="yaml">
zh:
  read_more: 查看全文

en:
  read_more: READ MORE
</i18n>
