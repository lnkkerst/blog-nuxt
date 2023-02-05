import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';

export interface Post extends MarkdownParsedContent {
  pubDate: string;
  tags: string[];
  category: string;
  meta: any;
}

export interface PostInformation {
  title: string;
  description: string;
  excerpt: any;
  slug: string;
  pubDate: string;
  language: string;
  languages: string[];
}

export const usePosts = () => {
  const { locale } = useI18n();

  return useAsyncData('posts-list', async () => {
    const query = await queryContent<Post>('/posts')
      .only([
        'title',
        'description',
        'excerpt',
        '_dir',
        '_path',
        'pubDate',
        'tags',
        'category'
      ])
      .sort({ pubDate: -1 })
      .find();

    const record: { [name: string]: PostInformation } = {};

    query.forEach(post => {
      const { title, description, excerpt, _dir: slug, _path, pubDate } = post;
      const language = _path.split('.').at(-1);
      // Remove title in excerpt
      excerpt.children.shift();
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
        record[slug] = {
          ...record[slug],
          language,
          description,
          title,
          excerpt
        };
        record[slug].languages.push(language);
      }
    });

    const res = [];
    for (const i of Reflect.ownKeys(record)) {
      res.push(record[i as string]);
    }

    return res;
  });
};
