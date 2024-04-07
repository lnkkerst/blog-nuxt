import dayjs from 'dayjs';
import RSS from 'rss';
import { serverQueryPosts } from '~/server/utils/posts';

export default defineEventHandler(async event => {
  const posts = await serverQueryPosts(event);
  const { hostname } = useRuntimeConfig().public;

  const feed = new RSS({
    title: "lnkkerst's blog",
    description: "lnkkerst's blog",
    feed_url: `${hostname}/feed`,
    site_url: hostname,
    language: 'zh-CN'
  });

  for (const post of posts) {
    const { title, description, slug, pubDate } = post;
    feed.item({
      title,
      description,
      url: `${hostname}/posts/${slug}`,
      date: dayjs(pubDate).toDate()
    });
  }

  return feed.xml();
});
