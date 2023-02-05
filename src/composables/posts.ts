interface Post {
  title: string;
  description: string;
  excerpt: any;
  slug: string;
  pubDate: string;
  language: string;
  languages: string[];
}

export const usePosts = async () =>
  await useAsyncData('posts-list', () =>
    queryContent('/posts')
      .only(['title', 'description', 'excerpt', '_dir', '_path', 'pubDate'])
      .sort({ pubDate: -1 })
      .find()
  );
