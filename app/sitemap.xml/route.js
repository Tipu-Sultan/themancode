import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://themancode.vercel.app';
  const pages = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/projects', changefreq: 'monthly', priority: 0.8 },
    { path: '/blog', changefreq: 'weekly', priority: 0.8 },
    { path: '/snippets', changefreq: 'monthly', priority: 0.7 },
    { path: '/contact', changefreq: 'yearly', priority: 0.6 },
  ];

  // Add dynamic routes if applicable (e.g., blog posts)
  /*
  const blogPosts = await fetchBlogPosts(); // Replace with your data source
  const dynamicPages = blogPosts.map(post => ({
    path: `/blog/${post.slug}`,
    changefreq: 'weekly',
    priority: 0.7,
  }));
  pages.push(...dynamicPages);
  */

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page.path}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}