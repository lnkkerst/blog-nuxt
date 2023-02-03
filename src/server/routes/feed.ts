import RSS from 'rss';
import { serverQueryContent } from '#content/server';
// Fetch all documents

export default defineEventHandler(async event => {
  const docs = await serverQueryContent(event).find();
  const { hostname } = useRuntimeConfig();

  const feed = new RSS({
    title: "lnkkerst's blog",
    description: "lnkkerst's blog",
    feed_url: `${hostname}/feed`,
    site_url: hostname,
    language: 'zh-CN'
  });

  for (const doc of docs) {
    const { title, description, _dir }: { [name: string]: string } = doc;
    feed.item({ title, description, url: _dir, date: new Date() });
  }

  return feed.xml();
});
