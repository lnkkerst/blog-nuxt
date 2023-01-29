import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(createVuetify({ ssr: true, components, directives }));
});
