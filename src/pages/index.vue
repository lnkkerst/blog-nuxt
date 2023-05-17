<script setup lang="ts">
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();
useHead({
  title: `lnkkerst's blog`
});

const { data: posts } = await usePosts();
</script>

<template>
  <div max-w="640px" mx="auto" relative>
    <v-card v-for="post in posts" :key="post.title" mb-4 variant="tonal">
      <v-card-title>
        <NuxtLink :to="localePath(`/posts/${post.slug}`)" text-xl>
          {{ post.title }}
        </NuxtLink>
      </v-card-title>

      <v-card-subtitle>
        <span>{{ post.pubDate }}</span>
        <span text="0.9rem" class="text-primary">{{ ' | ' }}</span>
        <span>{{ post.languages.join(' + ') }}</span>
      </v-card-subtitle>

      <v-card-text>
        <!-- <ContentRenderer -->
        <!--   text-sm -->
        <!--   :value="{ _type: 'markdown', body: post.excerpt }" -->
        <!-- > -->
        <!--   <template #empty> -->
        <!--     {{ post.description ?? t('excerpt_empty') }} -->
        <!--   </template> -->
        <!-- </ContentRenderer> -->
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
  </div>
</template>

<style lang="scss" scoped></style>

<i18n lang="yaml">
zh:
  read_more: 查看全文
  excerpt_empty: 没有摘要
  index: 首页

en:
  read_more: READ MORE
  excerpt_empty: No excerpt
  index: Home
</i18n>
