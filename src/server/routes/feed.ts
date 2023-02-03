import RSS from 'rss';
import dayjs from 'dayjs';
import { serverQueryContent } from '#content/server';

export default defineEventHandler(async event => {
  const docs = await serverQueryContent(event).sort({ pubDate: -1 }).find();
  const { hostname } = useRuntimeConfig().public;

  const feed = new RSS({
    title: "lnkkerst's blog",
    description: "lnkkerst's blog",
    feed_url: `${hostname}/feed`,
    site_url: hostname,
    language: 'zh-CN'
  });

  for (const doc of docs) {
    const { title, description, _dir, pubDate }: { [name: string]: string } =
      doc;
    feed.item({
      title,
      description,
      url: `${hostname}/${_dir}`,
      date: dayjs(pubDate).toDate()
    });
  }

  return feed.xml();
});
