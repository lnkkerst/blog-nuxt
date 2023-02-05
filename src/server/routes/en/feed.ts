import RSS from 'rss';
import dayjs from 'dayjs';
import { serverQueryPosts } from '~/server/utils/posts';

export default defineEventHandler(async event => {
  const posts = await serverQueryPosts(event, { locale: 'en' });
  const { hostname } = useRuntimeConfig().public;

  const feed = new RSS({
    title: "lnkkerst's blog",
    description: "lnkkerst's blog",
    feed_url: `${hostname}/en/feed`,
    site_url: hostname,
    language: 'en-US'
  });

  for (const post of posts) {
    const { title, description, slug, pubDate } = post;
    feed.item({
      title,
      description,
      url: `${hostname}/en/posts/${slug}`,
      date: dayjs(pubDate).toDate()
    });
  }

  return feed.xml();
});
