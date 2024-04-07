import type { H3Event } from 'h3';
import { serverQueryContent } from '#content/server';
import type { Post, PostInformation } from '~~/src/composables/posts';

export async function serverQueryPosts(event: H3Event, { locale = 'zh' } = {}) {
  const query = await serverQueryContent<Post>(event, '/posts')
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
    } else if (language === locale) {
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
}
