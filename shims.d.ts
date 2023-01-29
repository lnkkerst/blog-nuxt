import type { AttributifyAttributes } from '@unocss/preset-attributify';

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
  interface GlobalComponents {
    OverlayScrollbars: typeof import('overlayscrollbars-vue')['OverlayScrollbarsComponent'];
  }
}
