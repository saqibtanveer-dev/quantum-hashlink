import { MetadataRoute } from 'next';
import { allBlogs } from 'contentlayer/generated';
import { coursesMetaData } from '@/data/coursesMetaData';

const BASE_URL = 'https://quantum-hashlink.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/enrollment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = allBlogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const coursePages: MetadataRoute.Sitemap = coursesMetaData
    .filter((course) => course.id !== 'all')
    .map((course) => ({
      url: `${BASE_URL}/course-details/${course.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticPages, ...blogPages, ...coursePages];
}
