import { MetadataRoute } from 'next';
import { LEGAL_DOCUMENTS } from '@/data/legalDocuments';
import { getOwnershipHistory } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebigbanner.com';
  const now = new Date();

  // 1. Core Primary Pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/auction`,
      lastModified: now,
      changeFrequency: 'always',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ownership`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transparency`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advertise`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auction/history`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/compliance`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. All 15 Legal Documentation Routes
  const legalRoutes: MetadataRoute.Sitemap = LEGAL_DOCUMENTS.map((doc) => ({
    url: `${baseUrl}/legal/${doc.slug}`,
    lastModified: new Date(doc.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 3. Dynamic Public Ownership History Records
  let ownershipRoutes: MetadataRoute.Sitemap = [];
  try {
    const owners = getOwnershipHistory();
    ownershipRoutes = owners.map((owner) => ({
      url: `${baseUrl}/ownership/${owner.id}`,
      lastModified: new Date(owner.startDate || now),
      changeFrequency: 'monthly',
      priority: 0.65,
    }));
  } catch (err) {
    console.warn('Sitemap dynamic owners retrieval fallback:', err);
  }

  return [...coreRoutes, ...legalRoutes, ...ownershipRoutes];
}
