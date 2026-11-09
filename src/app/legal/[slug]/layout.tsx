import type { Metadata } from 'next';
import { getLegalDocumentBySlug } from '@/data/legalDocuments';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const doc = getLegalDocumentBySlug(params.slug);

  if (!doc) {
    return {
      title: 'Legal Policy Not Found',
      description: 'The requested legal policy could not be found.',
    };
  }

  const title = `${doc.title} — Official Legal Policy`;
  const description = `${doc.subtitle}. ${doc.description} Binding legal documentation for THE BIG BANNER operated by AXIOMIS Technologies.`;
  const canonical = `https://thebigbanner.com/legal/${doc.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${doc.title} | THE BIG BANNER Legal Centre`,
      description,
      url: canonical,
      type: 'article',
      publishedTime: doc.effectiveDate,
      modifiedTime: doc.lastUpdated,
      authors: ['AXIOMIS Technologies'],
    },
  };
}

export default function LegalDocumentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
