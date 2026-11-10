import React from 'react';

/**
 * Authoritative JSON-LD Structured Data Component for AEO (Answer Engine Optimization),
 * GEO (Generative Engine Optimization for AI Overviews / SearchGPT / Perplexity), and Google Rich Results.
 */
export const JsonLd: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Organization & Legal Operator Identity
      {
        '@type': 'Organization',
        '@id': 'https://thebigbanner.com/#organization',
        name: 'THE BIG BANNER',
        alternateName: ['The Big Banner', 'THEBIGBANNER', 'Big Banner'],
        legalName: 'AXIOMIS Technologies',
        url: 'https://thebigbanner.com',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://thebigbanner.com/#logo',
          url: 'https://thebigbanner.com/thebigbannerlogo1.png',
          caption: 'THE BIG BANNER Official Logo',
        },
        image: 'https://thebigbanner.com/thebigbannerlogo1.png',
        description:
          'THE BIG BANNER is a global exclusive digital advertising marketplace operated by AXIOMIS Technologies. One primary billboard, one verified brand owner at a time, competing in a transparent, $5 USD minimum hike auction.',
        foundingLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
          },
        },
        sameAs: [
          'https://axiomis.in',
          'https://github.com/Dhanushj213/thebigbanner',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'Customer Support & Transaction Disputes',
            email: 'support@thebigbanner.com',
            url: 'https://thebigbanner.com/contact',
          },
          {
            '@type': 'ContactPoint',
            contactType: 'Grievance Redressal (Rule 3(2) IT Rules 2021)',
            email: 'grievance@thebigbanner.com',
            url: 'https://thebigbanner.com/legal/grievance-redressal',
          },
          {
            '@type': 'ContactPoint',
            contactType: 'Data Protection & Privacy Officer (DPDP Act 2023)',
            email: 'privacy@thebigbanner.com',
            url: 'https://thebigbanner.com/legal/privacy-policy',
          },
        ],
      },

      // 2. WebSite with Sitelinks SearchBox
      {
        '@type': 'WebSite',
        '@id': 'https://thebigbanner.com/#website',
        url: 'https://thebigbanner.com',
        name: 'THE BIG BANNER',
        description: 'One Banner. One Owner. Global Attention.',
        publisher: {
          '@id': 'https://thebigbanner.com/#organization',
        },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://thebigbanner.com/ownership?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },

      // 3. Service & Commercial Offering
      {
        '@type': 'Service',
        '@id': 'https://thebigbanner.com/#service',
        name: 'THE BIG BANNER Exclusive Homepage Placement Tenure',
        serviceType: 'Exclusive Digital Billboard Advertising Placement',
        provider: {
          '@id': 'https://thebigbanner.com/#organization',
        },
        description:
          'Exclusive 14-day homepage advertising tenure commanding 100% share of voice with no competing advertisements, backed by an immutable public historical ownership ledger and cryptographic certificates.',
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'THE BIG BANNER Ownership Tenures',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '14-Day Exclusive Homepage Banner Tenure',
              },
              priceCurrency: 'USD',
              price: '100',
              priceValidUntil: '2026-12-31',
              availability: 'https://schema.org/InStock',
              url: 'https://thebigbanner.com/auction',
              seller: {
                '@id': 'https://thebigbanner.com/#organization',
              },
            },
          ],
        },
      },

      // 4. AEO & GEO FAQPage for SearchGPT, Perplexity, Claude & Google AI Overviews
      {
        '@type': 'FAQPage',
        '@id': 'https://thebigbanner.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is THE BIG BANNER?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'THE BIG BANNER is a global, exclusive digital advertising marketplace where brands, businesses, creators, and individuals compete to own a single primary advertising space on the homepage for a 14-day tenure. Unlike traditional ad networks that show thousands of ads simultaneously, THE BIG BANNER features one advertisement and one verified owner at a time.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who operates THE BIG BANNER?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'THE BIG BANNER is a commercial brand and digital platform owned and operated by AXIOMIS Technologies, operating from India (official operator website: https://axiomis.in). All contractual relationships, merchant gateway settlements, and statutory compliance obligations run through AXIOMIS Technologies.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the auction bidding mechanism work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Advertisers participate in a server-authoritative online auction denominated in canonical USD ($). Every qualifying bid must advance the price by at least $5 USD over the current highest bid. An anti-sniping dynamic clock extends the closing countdown by 120 seconds if any valid bid is placed in the final 120 seconds.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the refund policy for auction purchases?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All successful auction purchases are final. THE BIG BANNER does not offer voluntary refunds, returns, cancellations, or reversals of successfully completed auction purchases at the request of an advertiser. Advertisers are responsible for reviewing auction terms prior to completing settlement.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the required creative dimensions for the banner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The desktop canvas requires a 1920 × 600 px image (ultra-wide 16:5 or 16:6 aspect ratio) up to 5MB in PNG, JPG, or WebP. The mobile canvas requires a 900 × 1200 px image (3:4 aspect ratio) up to 5MB. Destination landing links must resolve via secure HTTPS.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the minimum price increase for each bid on THE BIG BANNER?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Each new bid must increment by at least $5 USD above the current highest bid. All auction bids and price escalation calculations are computed strictly in canonical USD on the backend.',
            },
          },
        ],
      },

      // 5. Breadcrumb Navigation
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://thebigbanner.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://thebigbanner.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Live Auction',
            item: 'https://thebigbanner.com/auction',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Ownership History',
            item: 'https://thebigbanner.com/ownership',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Financial Transparency',
            item: 'https://thebigbanner.com/transparency',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Legal Centre',
            item: 'https://thebigbanner.com/legal',
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
