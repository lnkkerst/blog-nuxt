import { SitemapStream, streamToPromise } from 'sitemap';
import { serverQueryContent } from '#content/server';

export default defineEventHandler(async event => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find();
  const sitemap = new SitemapStream({
    hostname: useRuntimeConfig().hostname
  });

  for (const doc of docs) {
    sitemap.write({
      url: doc._dir,
      changefreq: 'monthly'
    });
  }
  sitemap.end();

  return streamToPromise(sitemap);
});
