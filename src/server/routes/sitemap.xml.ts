import { SitemapStream, streamToPromise } from 'sitemap';

export default defineEventHandler(async event => {
  // Fetch all documents
  const posts = await serverQueryPosts(event);
  const { hostname } = useRuntimeConfig().public;
  const sitemap = new SitemapStream({
    hostname
  });

  sitemap.write({
    url: '/',
    changefreq: 'daily',
    priority: 1
  });

  ['/about', '/links'].forEach(route => {
    sitemap.write({
      url: route,
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  for (const post of posts) {
    post.languages.forEach(l => {
      const route = l === 'zh' ? '' : `${l}/`;
      sitemap.write({
        url: `${hostname}/${route}posts/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.8
      });
    });
  }
  sitemap.end();

  return streamToPromise(sitemap);
});
