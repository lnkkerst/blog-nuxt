<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-fade-in'
  }
});

const { t } = useI18n();
useHead({
  title: t('title')
});

interface Link {
  title: string;
  url: string;
  iconUrl?: string;
  description?: string;
}

const links = useState<Link[]>('pages-links', () => [
  {
    title: 'Y0ungSのBlog',
    url: 'http://101.37.81.166/'
  },
  {
    title: "lnkkerst's blog",
    url: 'https://blog.lnkkerst.me'
  }
]);
</script>

<template>
  <v-card max-w="540px" mx="auto">
    <v-list lines="two">
      <template v-for="link in links" :key="link.title">
        <NuxtLink :to="link.url" target="_blank">
          <v-list-item
            :title="link.title"
            :subtitle="link.description"
            :value="link.title"
          >
            <template #prepend>
              <v-avatar>
                <v-img :src="link.iconUrl ?? `${link.url}/favicon.ico`"></v-img>
              </v-avatar>
            </template>
          </v-list-item>
        </NuxtLink>
      </template>
    </v-list>
  </v-card>
</template>

<style scoped></style>

<i18n lang="yaml">
zh:
  title: 友链

en:
  title: Links
</i18n>
