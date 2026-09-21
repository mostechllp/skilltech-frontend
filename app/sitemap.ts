import { MetadataRoute } from 'next';
import { fetchSitemapData } from '@/lib/api';

const BASE_URL = 'https://skilltechonline.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchSitemapData();

  const staticRoutes = [
    '',
    '/about',
    '/service',
    '/support',
    '/gallery',
    '/career',
    '/blog',
    '/contact',
    '/terms-conditions',
    '/privacy-policy',
    '/refund-policy',
    '/category',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = data.categories.map((cat: any) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const subcategoryRoutes = data.subcategories.map((sub: any) => ({
    url: `${BASE_URL}/${sub.category__slug}/${sub.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const productRoutes = data.products.map((prod: any) => ({
    url: `${BASE_URL}/${prod.slug_path}`,
    lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const blogRoutes = data.blogs.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.created_at ? new Date(post.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
