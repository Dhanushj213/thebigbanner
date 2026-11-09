import type { Metadata } from 'next';
import { getOwnershipById } from '@/lib/services';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const record = getOwnershipById(params.id);

  if (!record) {
    return {
      title: 'Ownership Certificate Not Found',
      description: 'The requested advertising ownership certificate could not be located in the register.',
    };
  }

  const title = `Ownership Certificate #${record.ownership_number} — ${record.brand_name}`;
  const priceFormatted = Number(record.purchase_price || 0).toLocaleString('en-US');
  const description = `Official verifiable digital ownership certificate for ${record.brand_name} (${record.country}) on THE BIG BANNER. Clearing price: $${priceFormatted} USD. Certificate Serial: ${record.certificate_serial || record.transaction_hash}.`;
  const canonical = `https://thebigbanner.com/ownership/${params.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | THE BIG BANNER`,
      description,
      url: canonical,
      type: 'article',
      images: [
        {
          url: record.desktop_creative_url || '/thebigbannerlogo1.png',
          alt: `${record.brand_name} on THE BIG BANNER`,
        },
      ],
    },
  };
}

export default function OwnershipDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
