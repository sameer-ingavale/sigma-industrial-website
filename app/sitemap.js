import { products, categories } from '@/lib/products';
import { brands } from '@/lib/brands';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site-config';

export default function sitemap() {
  const staticPages = [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/products` },
    { url: `${siteConfig.url}/categories` },
    { url: `${siteConfig.url}/brands` },
    { url: `${siteConfig.url}/blog` },
    { url: `${siteConfig.url}/about` },
    { url: `${siteConfig.url}/contact` },
  ];
  const categoryPages = categories.map((c) => ({
    url: `${siteConfig.url}/categories/${c.slug}`,
  }));
  const brandPages = brands.map((b) => ({
    url: `${siteConfig.url}/brands/${b.slug}`,
  }));
  const productPages = products.map((p) => ({
    url: `${siteConfig.url}/products/${p.slug}`,
  }));
  const postPages = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
  }));
  return [...staticPages, ...categoryPages, ...brandPages, ...productPages, ...postPages];
}
