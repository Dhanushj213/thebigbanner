import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebigbanner.com';

  return {
    rules: [
      // General Search Engines (Google, Bing, Applebot, DuckDuckGo, etc.)
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/dashboard/',
          '/api/payments/create-order',
          '/api/payments/verify',
          '/api/payments/webhook',
        ],
      },
      // OpenAI ChatGPT / SearchGPT Web Crawler
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/dashboard/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/dashboard/'],
      },
      // Perplexity AI Answer Engine Crawler
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/dashboard/'],
      },
      // Anthropic Claude Web Crawler
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/dashboard/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/dashboard/'],
      },
      // Apple Siri & Spotlight Crawler
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/dashboard/'],
      },
      // Google SGE / Gemini AI Training & Indexing Crawler
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/admin/', '/dashboard/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
