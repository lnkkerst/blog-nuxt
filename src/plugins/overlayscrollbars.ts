import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('OverlayScrollbars', OverlayScrollbarsComponent);
});
