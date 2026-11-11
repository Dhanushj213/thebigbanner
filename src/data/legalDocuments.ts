export interface LegalSubclause {
  number: string;
  title: string;
  text: string;
}

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  content: string[];
  subclauses?: LegalSubclause[];
}

export interface LegalDocument {
  slug: string;
  docNumber: string;
  title: string;
  subtitle: string;
  category:
    | 'Platform Agreements'
    | 'Privacy & Data Protection'
    | 'Auctions, Payments & Ownership'
    | 'Advertising & Intellectual Property'
    | 'Trust, Safety & Compliance'
    | 'Operator Information';
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  status: 'Published' | 'Under Review' | 'Draft';
  requiresLegalReview: boolean;
  operatorStatement: string;
  description: string;
  sections: LegalSection[];
  relatedLinks: { title: string; slug: string }[];
}

export const OPERATOR_DECLARATION =
  'THE BIG BANNER is a digital advertising auction platform operated by AXIOMIS Technologies, operating from India.';

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  // ============================================================================
  // DOCUMENT 01: TERMS & CONDITIONS
  // ============================================================================
  {
    slug: 'terms-and-conditions',
    docNumber: '01',
    title: 'Terms & Conditions',
    subtitle: 'The primary contractual terms governing your access to and use of THE BIG BANNER.',
    category: 'Platform Agreements',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This document sets forth the legally binding terms and conditions between you and AXIOMIS Technologies governing all access to, bidding on, and use of THE BIG BANNER platform.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Introduction & Operator Identity',
        content: [
          'Welcome to THE BIG BANNER. These Terms and Conditions ("Terms") constitute a legally binding agreement entered into between you (whether individually or as an authorized representative of a business entity, "User", "Advertiser", or "Bidder") and AXIOMIS Technologies ("Operator", "we", "us", or "our"), operating from India.',
          'THE BIG BANNER is a commercial brand and digital platform operated by AXIOMIS Technologies. THE BIG BANNER is not a separately incorporated company, private limited company, or limited liability partnership. All commercial arrangements, auction mechanics, escrow settlements, and legal commitments are contracted directly with AXIOMIS Technologies.',
          'The platform operates as a global, exclusive digital advertising marketplace with a single primary digital advertising billboard located prominently on the platform homepage (https://thebigbanner.com). Only one verified advertiser owns that advertising placement during any defined ownership tenure. Prospective advertisers compete through transparent online auctions to secure subsequent ownership periods.',
          'Users access THE BIG BANNER internationally. By accessing, browsing, registering for, or bidding upon the platform, you expressly confirm that you have read, understood, and agreed to be legally bound by these Terms, our Privacy Policy, Auction & Bidding Rules, and all incorporated policies.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Definitions & Interpretation',
        content: [
          'For the purpose of these Terms and all incorporated platform policies, the following capitalized terms shall have the meanings assigned below:'
        ],
        subclauses: [
          {
            number: '2.1',
            title: 'Platform',
            text: 'Refers to the website, digital infrastructure, APIs, databases, and interfaces operating under the brand THE BIG BANNER, currently accessible at https://thebigbanner.com.'
          },
          {
            number: '2.2',
            title: 'Operator',
            text: 'Refers strictly to AXIOMIS Technologies, operating from India, maintaining its operator web portal at https://axiomis.in.'
          },
          {
            number: '2.3',
            title: 'Advertiser',
            text: 'Any individual, corporate entity, brand, or authorized agency that registers an account, places bids, or completes an acquisition of an advertising ownership tenure on the Platform.'
          },
          {
            number: '2.4',
            title: 'Bid & Valid Bid',
            text: 'An electronic submission transmitted to the server offering to purchase the designated Ownership Period for a specified canonical USD amount. A Valid Bid is one accepted and validated by our server as meeting or exceeding the minimum qualifying threshold.'
          },
          {
            number: '2.5',
            title: 'Ownership Period (Tenure)',
            text: 'The strictly defined duration (ordinarily 14 consecutive calendar days, unless explicitly scheduled otherwise) during which the approved Advertisement Creative of the winning Advertiser is broadcast exclusively on the platform homepage.'
          },
          {
            number: '2.6',
            title: 'Canonical USD Currency',
            text: 'The United States Dollar (USD), which serves as the sole authoritative and binding accounting, bidding, and price escalation currency across the Platform.'
          },
          {
            number: '2.7',
            title: 'Public Ownership Record',
            text: 'The permanent, immutable, cryptographically referenced historical entry recording successful tenure acquisitions, verified purchase amounts, brand names, and country attributions.'
          }
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Acceptance & Modifications',
        content: [
          'Access to the Platform is conditioned on your full acceptance of these Terms. If you do not agree to every clause, you must discontinue your use of the Platform immediately.',
          'Account creation, auction participation, and payment checkouts each require separate, affirmative electronic consent. We maintain an immutable digital audit log recording the timestamp, IP address, user identifier, and specific document version accepted by you.',
          'Material amendments will be published on the Platform with an updated Version and Last Updated date. Continued participation in auctions or ownership management following publication constitutes acceptance of the amended terms.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Eligibility & Business Authority',
        content: [
          'You must be at least 18 years of age (or the legal age of majority in your jurisdiction) and possess full legal capacity to enter into binding contracts.',
          'If you register or bid on behalf of a corporation, partnership, or commercial brand, you warrant and represent under penalty of law that you hold actual corporate authority to bind that entity to financial liabilities and creative warranties.',
          'Access is strictly prohibited to individuals or entities located in, or organized under the laws of, any jurisdiction subject to comprehensive international trade sanctions or designated as a prohibited party by international regulatory bodies.'
        ]
      },
      {
        id: 'sec-5',
        number: '5',
        title: 'Account Registration & Credential Security',
        content: [
          'To participate in auctions or submit creatives, you must register a verified advertiser account. You agree to provide true, accurate, current, and complete corporate and contact information.',
          'You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. AXIOMIS Technologies is not liable for any losses caused by unauthorized credential access resulting from your failure to safeguard your account.',
          'Duplicate accounts created to circumvent bidding limits, conceal bidder identities, or engage in artificial bid manipulation are strictly prohibited and will result in immediate termination.'
        ]
      },
      {
        id: 'sec-6',
        number: '6',
        title: 'Description of Business Model & Core Distinctions',
        content: [
          'THE BIG BANNER provides a singular, exclusive commercial advertising placement. It is fundamentally distinct from conventional ad networks, programmatic exchanges, or subscription software landing pages.',
          'The Platform enforces the following foundational distinctions across all operational activities:',
          '1. A bid is not a completed purchase. A bid constitutes a conditional offer to purchase.',
          '2. The highest bid is not automatically a successful transaction until fully cleared by our payment gateway.',
          '3. Payment settlement does not automatically approve an advertisement creative. Creative assets must pass separate editorial and technical moderation.',
          '4. Advertising tenure approval does not grant any ownership of THE BIG BANNER, its domain, brand, software, codebase, or intellectual property. Ownership is strictly limited to the right to broadcast an approved creative in the primary slot during the agreed period.',
          '5. Ownership does not guarantee any specific volume of impressions, clicks, conversions, sales, or commercial revenue.'
        ]
      },
      {
        id: 'sec-7',
        number: '7',
        title: 'Auction Mechanics & Bidding Obligations',
        content: [
          'Auctions for subsequent ownership tenures run transparently on the Platform under server-authoritative timestamps.',
          'Every qualifying bid must meet or exceed the server-calculated minimum qualification threshold. Once an auction is live, each qualifying bid must increment above the leading bid by the designated minimum hike amount.',
          'Submitted valid bids are binding and cannot be retracted, canceled, or amended by the bidder. Anti-sniping dynamic clock extensions apply: any valid bid placed within the final 120 seconds of an auction automatically extends the closing countdown by 120 seconds.',
          'Full operational rules are governed by Document 05 (Auction & Bidding Rules), which is incorporated herein by reference.'
        ]
      },
      {
        id: 'sec-8',
        number: '8',
        title: 'Purchase, Escrow Settlement & Canonical USD Architecture',
        content: [
          'The winning bidder is obligated to complete full payment within twenty-four (24) hours of auction closure. All auctions are denominated in canonical USD ($).',
          'While the platform displays indicative currency conversions (e.g. INR, EUR, GBP, JPY, AED, SGD) for visitor convenience, the actual binding clearing amount is determined in canonical USD.',
          'Payments are collected and processed through our verified payment gateway partner (Cashfree Payments) and affiliated banking rails. The charged amount, conversion rate, and transaction identifiers are recorded in the public financial transparency ledger.'
        ]
      },
      {
        id: 'sec-9',
        number: '9',
        title: 'Advertisement Submission, Moderation & Editorial Approval',
        content: [
          'Upon completing payment settlement, the winning advertiser must submit desktop and mobile creative assets alongside the destination URL within the designated submission window.',
          'All creatives undergo mandatory editorial review by our verification desk to verify compliance with technical specifications, intellectual property ownership, and our Advertising & Content Policy.',
          'AXIOMIS Technologies reserves the absolute right to reject any creative containing illegal, deceptive, harmful, infringing, or inappropriate material. The advertiser will be granted opportunities to submit compliant revised assets.'
        ]
      },
      {
        id: 'sec-10',
        number: '10',
        title: 'Scope & Limitations of Advertising Ownership',
        content: [
          'Ownership commences at the scheduled start timestamp and concludes automatically at the scheduled end timestamp. The current owner enjoys 100% share of voice on the primary banner slot during their active tenure.',
          'No advertising tenure transfers any title, equity, partnership, or intellectual property rights in THE BIG BANNER or AXIOMIS Technologies.',
          'Advertising ownership cannot be assigned, sublet, resold, or transferred to any third party without express prior written consent from AXIOMIS Technologies.'
        ]
      },
      {
        id: 'sec-11',
        number: '11',
        title: 'User Representations & Warranties',
        content: [
          'You expressly warrant that: (a) all information supplied by you is authentic and complete; (b) your submitted creative does not violate any third-party copyright, trademark, trade secret, or privacy right; (c) your destination URL is secure, active, and does not distribute malware; and (d) your advertised goods or services comply with all applicable laws in every target jurisdiction.'
        ]
      },
      {
        id: 'sec-12',
        number: '12',
        title: 'Prohibited Activities & Anti-Manipulation',
        content: [
          'Users shall not: (a) employ automated scripts, bots, or scraping tools to manipulate auctions; (b) engage in shill bidding, bid collusion, or artificial price escalation; (c) execute denial-of-service attacks or tamper with server infrastructure; (d) submit fraudulent or unauthorized payment instruments; or (e) alter destination URL landing pages post-approval to display non-compliant content.'
        ]
      },
      {
        id: 'sec-13',
        number: '13',
        title: 'Intellectual Property Rights',
        content: [
          'All software, UI design, visual assets, trademarks, the "β." logo, and proprietary compilation databases of THE BIG BANNER are the exclusive intellectual property of AXIOMIS Technologies.',
          'Advertisers retain full ownership of their underlying brand names and creative assets. By submitting a creative, you grant AXIOMIS Technologies an irrevocable, worldwide, royalty-free license to display, broadcast, and permanently archive the creative in the public ownership historical ledger.'
        ]
      },
      {
        id: 'sec-14',
        number: '14',
        title: 'Third-Party Services & Integrations',
        content: [
          'The Platform integrates third-party services including payment gateway infrastructure (Cashfree Payments), foreign exchange data feeds, and cloud hosting. AXIOMIS Technologies does not control third-party banking rails and is not liable for external network interruptions.'
        ]
      },
      {
        id: 'sec-15',
        number: '15',
        title: 'Account Suspension & Termination',
        content: [
          'AXIOMIS Technologies may suspend or terminate your account immediately upon reasonable belief that you have breached these Terms, engaged in bid manipulation, or submitted non-compliant creatives. Forfeiture of bids and remedies are governed by Document 13.'
        ]
      },
      {
        id: 'sec-16',
        number: '16',
        title: 'Disclaimers of Warranties',
        content: [
          'THE PLATFORM AND ALL ADVERTISING PLACEMENTS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. AXIOMIS TECHNOLOGIES EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
          'WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, NOR DO WE GUARANTEE ANY SPECIFIC AUDIENCE SIZE, CLICK-THROUGH RATE, OR COMMERCIAL RETURN.'
        ]
      },
      {
        id: 'sec-17',
        number: '17',
        title: 'Limitation of Liability',
        content: [
          'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL AXIOMIS TECHNOLOGIES, ITS OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.',
          'OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO ANY ADVERTISING TENURE SHALL BE STRICTLY LIMITED TO THE ACTUAL AMOUNT PAID BY YOU TO AXIOMIS TECHNOLOGIES FOR THAT SPECIFIC TENURE.'
        ]
      },
      {
        id: 'sec-18',
        number: '18',
        title: 'Governing Law & Dispute Resolution',
        content: [
          'These Terms and all disputes arising out of or related to THE BIG BANNER shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.',
          'Subject to applicable mandatory statutory consumer rights, any legal proceeding arising out of these Terms shall be subject to the exclusive jurisdiction of the competent courts having jurisdiction over the registered operations of AXIOMIS Technologies in India [Administrative Note: Specific judicial seat pending verified legal counsel designation].'
        ]
      },
      {
        id: 'sec-19',
        number: '19',
        title: 'Severability & Entire Agreement',
        content: [
          'If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions. These Terms, together with all incorporated policies, constitute the entire agreement between the parties.'
        ]
      },
      {
        id: 'sec-20',
        number: '20',
        title: 'Operator Contact & Legal Inquiries',
        content: [
          'All notices, legal correspondence, and compliance communications regarding THE BIG BANNER must be directed to AXIOMIS Technologies at governance@thebigbanner.com or via https://axiomis.in.',
          'Registered Operator: AXIOMIS Technologies. [Registered Business Address: Populated from verified business records upon counsel sign-off].'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Privacy Policy', slug: 'privacy-policy' },
      { title: 'Auction & Bidding Rules', slug: 'auction-rules' },
      { title: 'Refund & Cancellation Policy', slug: 'refund-policy' },
      { title: 'Legal Notice & Operator Information', slug: 'legal-notice' }
    ]
  },

  // ============================================================================
  // DOCUMENT 02: PRIVACY POLICY
  // ============================================================================
  {
    slug: 'privacy-policy',
    docNumber: '02',
    title: 'Privacy Policy',
    subtitle: 'How THE BIG BANNER collects, uses, protects and manages personal and corporate information.',
    category: 'Privacy & Data Protection',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This Privacy Policy describes our practices regarding the collection, processing, storage, and protection of personal data across the THE BIG BANNER platform, operated by AXIOMIS Technologies.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Introduction & Data Controller Identity',
        content: [
          'AXIOMIS Technologies ("Operator", "we", "us"), operating from India, is the Data Controller responsible for the processing of your personal data when you visit, register, bid, or advertise on THE BIG BANNER (https://thebigbanner.com).',
          'We are committed to processing digital personal data in strict compliance with the Digital Personal Data Protection Act, 2023 (India), the Information Technology Act, 2000, the General Data Protection Regulation (EU GDPR), the UK GDPR, and other applicable global data privacy statutes.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Personal Information Collected',
        content: [
          'We collect information necessary to operate an exclusive advertising auction platform, categorized as follows:',
          '• Account & Identity Data: Full legal name, business email address, company name, country, country code, and hashed authentication credentials.',
          '• Auction & Bidding Data: Bid amounts, timestamps, auction identifier, bidder identifier, bid validation status, and winning outcomes.',
          '• Payment & Transaction Metadata: Transaction references, settlement currency, converted amounts, gateway confirmation IDs, and payment status. Notice: We never store complete credit card numbers or banking secrets; payment data is handled directly by PCI-DSS compliant gateway partners (Cashfree Payments).',
          '• Advertisement Creative Data: Brand name, marketing headline, asset files, destination URLs, and moderation review notes.',
          '• Technical & Access Logs: IP address, device type, browser specifications, access timestamps, and security event logs.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Lawful Bases & Purposes of Processing',
        content: [
          'We process data only where a recognized lawful basis exists:',
          '1. Contractual Necessity: To administer your account, process bids, validate auction qualifications, enforce anti-sniping timers, and allocate advertising tenures.',
          '2. Legal Obligation: For tax reporting, regulatory compliance, foreign exchange records, and statutory accounting.',
          '3. Legitimate Interests: To safeguard our infrastructure against fraudulent bidding, maintain platform security, and operate the public transparency ledger.',
          '4. Consent: For optional cookie analytics and non-essential commercial announcements. Consent may be revoked at any time.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Public Information & Immutable Historical Records',
        content: [
          'THE BIG BANNER operates a permanent, public ownership history and financial transparency ledger.',
          'When you successfully win an auction and complete settlement, the following elements become part of the public historical record: (a) Brand Name; (b) Country of operation; (c) Successful purchase amount in canonical USD; (d) Ownership tenure number and dates; and (e) Approved creative thumbnail and cryptographic transaction hash.',
          'Private credentials, internal email addresses, phone numbers, and banking details are strictly confidential and will never be published in the public ledger.'
        ]
      },
      {
        id: 'sec-5',
        number: '5',
        title: 'Service Providers & Subprocessors',
        content: [
          'We share data with verified third-party subprocessors strictly to facilitate platform operations:',
          '• Payment Gateway: Cashfree Payments (PCI-DSS Level 1 certified gateway and escrow settlement partner).',
          '• Database & Infrastructure: Supabase Inc. (PostgreSQL database, secure API endpoints, and authentication infrastructure).',
          '• Cloud Hosting & Edge: Vercel Inc. (serverless edge execution and website delivery).',
          'All service providers are bound by strict data protection agreements and prohibited from utilizing personal data for independent commercial purposes.'
        ]
      },
      {
        id: 'sec-6',
        number: '6',
        title: 'Data Retention & Safeguards',
        content: [
          'We retain personal data for as long as your account remains active or as required by applicable Indian tax and corporate laws (minimum statutory periods for financial audit trails).',
          'We implement state-of-the-art security safeguards including TLS 1.3 encryption in transit, AES-256 database encryption at rest, role-based access controls, and immutable security audit logs.'
        ]
      },
      {
        id: 'sec-7',
        number: '7',
        title: 'Individual Rights (DPDP, GDPR & International)',
        content: [
          'Depending on your location, you hold statutory rights including:',
          '• Right to Access: Request confirmation of whether we process your data and obtain a summary of processing.',
          '• Right to Correction & Completion: Update inaccurate or incomplete registration information.',
          '• Right to Erasure: Request deletion of account data, subject to statutory retention obligations for financial and auction audit records.',
          '• Right to Grievance Redressal: Lodge complaints regarding privacy processing directly with our Grievance Officer.'
        ]
      },
      {
        id: 'sec-8',
        number: '8',
        title: 'Privacy Contact & Grievance Mechanism',
        content: [
          'To exercise any data protection right or submit a formal inquiry, use our interactive Privacy Request Form or email privacy@thebigbanner.com.',
          'Data Protection & Grievance Contact: AXIOMIS Technologies [Designated Grievance Officer details pending formal administrative notice].'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Cookie Policy', slug: 'cookie-policy' },
      { title: 'Data Retention & Deletion Policy', slug: 'data-retention' },
      { title: 'Grievance Redressal Policy', slug: 'grievance-redressal' }
    ]
  },

  // ============================================================================
  // DOCUMENT 03: COOKIE POLICY
  // ============================================================================
  {
    slug: 'cookie-policy',
    docNumber: '03',
    title: 'Cookie Policy',
    subtitle: 'Transparent disclosures regarding cookies, local storage and interactive consent preferences.',
    category: 'Privacy & Data Protection',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This Cookie Policy explains how THE BIG BANNER uses cookies and similar storage technologies, and how you can control your preferences.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'What Are Cookies & Local Storage',
        content: [
          'Cookies are small text files placed on your device by websites you visit. Similar technologies include web storage (HTML5 localStorage and sessionStorage), which allow websites to preserve session state, security tokens, and user preferences across visits.',
          'THE BIG BANNER (operated by AXIOMIS Technologies) uses these technologies to ensure core platform functionality, security, and transparent bidding operations.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Categories of Cookies We Use',
        content: [
          'We classify all cookies into three clear operational categories:',
          '1. Essential Cookies (Strictly Necessary): Required for the platform to function. These include session tokens, anti-CSRF protections, authentication state, and currency selector preference. They cannot be disabled in our preference centre.',
          '2. Security & Integrity Cookies: Used to detect anomalous automated bidding, rate-limiting violations, and bot traffic. These safeguard auction fairness.',
          '3. Optional Analytics & Performance Cookies: Used only with your prior consent to measure traffic volume and page performance. We never deploy invasive third-party cross-site advertising tracking cookies.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Interactive Cookie Preference Centre',
        content: [
          'We provide an interactive Cookie Preference Centre accessible at any time on this page and via our global banner.',
          'You may toggle optional analytics cookies on or off at will. Your preferences are saved in your browser localStorage and honored across all sessions.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Managing Cookies in Your Browser',
        content: [
          'Most web browsers allow you to manage or block cookies through browser settings. Note that disabling essential cookies will prevent you from authenticating or participating in live auctions.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Privacy Policy', slug: 'privacy-policy' },
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' }
    ]
  },

  // ============================================================================
  // DOCUMENT 04: REFUND & CANCELLATION POLICY
  // ============================================================================
  {
    slug: 'refund-policy',
    docNumber: '04',
    title: 'Refund & Cancellation Policy',
    subtitle: 'Clear rules governing purchase finality, non-refundable circumstances, failed payments, and mandatory legal exceptions.',
    category: 'Auctions, Payments & Ownership',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v2.0.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'THE BIG BANNER does not offer voluntary refunds, returns, cancellations or reversals of successfully completed auction purchases at the request of an advertiser. All successful purchases are final, subject to mandatory rights under applicable law.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'General Policy',
        content: [
          'THE BIG BANNER operates an exclusive digital advertising auction platform where advertisers compete to acquire the right to display their advertisements in a single primary advertising space for a defined ownership period.',
          'All successful auction purchases are considered final.',
          'THE BIG BANNER does not offer voluntary refunds, returns, cancellations or reversals of successfully completed auction purchases at the request of an advertiser.',
          'By participating in an auction and completing a purchase, advertisers acknowledge and agree to this policy, subject to mandatory rights and exceptions under applicable law.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Successful Auction Purchases',
        content: [
          'Once an advertiser has successfully completed an auction purchase and the payment has been confirmed:',
          '• The purchase is considered final.',
          '• The advertiser cannot voluntarily cancel the purchase.',
          '• The advertiser cannot request a refund merely because they have changed their mind.',
          '• The advertiser cannot request a refund because they no longer wish to use the advertising placement.',
          '• Failure to submit an advertisement within the prescribed deadline does not automatically create a right to a voluntary refund.',
          '• Failure to achieve expected advertising performance, impressions, clicks, leads, conversions or sales does not create a voluntary refund entitlement.',
          'The advertiser is responsible for reviewing the auction conditions, purchase amount, ownership period and advertising requirements before completing the purchase.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Non-Refundable Circumstances',
        content: [
          'Subject to applicable mandatory legal requirements, the following circumstances do not qualify for voluntary refunds:',
          '• Change of mind after purchase.',
          '• Failure to use the purchased advertising placement.',
          '• Failure to submit advertising creative within the specified deadline.',
          '• Advertiser dissatisfaction with the performance of the advertisement.',
          '• Low traffic, impressions, clicks or conversions.',
          '• Incorrect information supplied by the advertiser.',
          '• Failure to obtain the advertiser\'s own required permissions or approvals.',
          '• Advertisement rejection resulting from violation of the Advertising & Content Policy.',
          '• Failure to comply with the advertiser\'s submission requirements.',
          '• Voluntary withdrawal after winning an auction.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Advertisement Approval',
        content: [
          'All advertisements are subject to THE BIG BANNER\'s Advertising & Content Policy.',
          'Advertisers must ensure that their creative, claims, destination URLs and associated materials comply with applicable laws and platform requirements.',
          'Payment confirmation does not guarantee advertisement approval. An advertisement that violates the platform\'s policies may be rejected or removed.',
          'The advertiser may be provided an opportunity to submit a corrected or alternative creative within the applicable deadline, where permitted by the platform.',
          'Advertisement rejection due to advertiser non-compliance does not automatically entitle the advertiser to a voluntary refund, subject to applicable law.'
        ]
      },
      {
        id: 'sec-5',
        number: '5',
        title: 'Failed, Duplicate and Unsuccessful Payments',
        content: [
          'A payment that has not resulted in a confirmed successful transaction will be investigated.',
          'Where a payment is duplicated, incorrectly collected or otherwise eligible for correction under applicable law or payment-provider requirements, the operator will investigate and take the appropriate corrective action.',
          'A payment marked as pending or failed by the payment gateway will not automatically be treated as a successful auction purchase.'
        ]
      },
      {
        id: 'sec-6',
        number: '6',
        title: 'Mandatory Legal Exceptions',
        content: [
          'Nothing in this policy is intended to exclude, restrict or waive any refund, cancellation, compensation or other right that cannot lawfully be excluded under applicable legislation or a binding order of a competent authority.',
          'Where a refund or payment reversal is legally required, the operator will process it in accordance with applicable requirements.'
        ]
      },
      {
        id: 'sec-7',
        number: '7',
        title: 'Payment Disputes',
        content: [
          'Advertisers experiencing an incorrect charge, duplicate payment or unauthorised transaction should contact the platform\'s official support channel.',
          'Each report will be reviewed against the relevant payment records and transaction information.'
        ]
      },
      {
        id: 'sec-8',
        number: '8',
        title: 'Policy Acceptance',
        content: [
          'By registering, participating in an auction or completing a purchase, advertisers acknowledge that successful auction purchases are intended to be final and that voluntary refunds are not offered, subject to applicable mandatory legal rights.'
        ]
      },
      {
        id: 'sec-9',
        number: '9',
        title: 'Contact',
        content: [
          'For payment-related questions and transaction investigations, contact the official support channel published on THE BIG BANNER\'s website.',
          'THE BIG BANNER is operated by AXIOMIS Technologies, operating from India (Website: https://axiomis.in).'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' },
      { title: 'Payment & Billing Policy', slug: 'payment-policy' },
      { title: 'Ownership & Display Policy', slug: 'ownership-policy' },
      { title: 'Advertising Policy', slug: 'advertising-policy' }
    ]
  },

  // ============================================================================
  // DOCUMENT 05: AUCTION & BIDDING RULES
  // ============================================================================
  {
    slug: 'auction-rules',
    docNumber: '05',
    title: 'Auction & Bidding Rules',
    subtitle: 'The authoritative rules governing auction schedules, bidding increments, anti-sniping and winning outcomes.',
    category: 'Auctions, Payments & Ownership',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This document defines the formal rules governing auction openings, bid submission validation, increments, clock extensions, and winner determination.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Exclusive Single-Banner Auction Model',
        content: [
          'THE BIG BANNER hosts sequential auctions to allocate successive 14-day advertising ownership tenures for its exclusive homepage billboard.',
          'Auctions are conducted under server-authoritative timestamps, mathematical qualification rules, and complete cryptographic transparency.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Authoritative Pricing & Escalation Architecture',
        content: [
          'All auction bids, opening reserve amounts, and minimum qualifying thresholds are strictly denominated and calculated in canonical USD ($).',
          'Tenure Qualification Rule: The opening qualification floor for each new auction tenure is anchored to previous successful transaction benchmarks.',
          'Minimum Bid Hike Rule: Once an auction is live with a leading bid, every subsequent valid bid must increment by at least the platform-configured minimum hike (+$5 USD) above the current highest bid.',
          'Bids submitted below the server-calculated minimum qualifying amount are automatically rejected by the server.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Bid Submission & Binding Irrevocability',
        content: [
          'Bidders must be authenticated with verified advertiser profiles before transmitting bids.',
          'Every bid submitted through the platform interface or API represents an unconditional, binding legal offer to purchase the designated ownership tenure if verified as the winning bid at closing.',
          'Bids cannot be withdrawn, canceled, or reduced under any circumstances once received and accepted by the server.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Anti-Sniping Dynamic Clock Protection',
        content: [
          'To ensure fair competition and prevent latency exploitation, THE BIG BANNER operates an automated anti-sniping extension engine.',
          'If any valid qualifying bid is accepted when the remaining auction timer is less than one hundred twenty (120) seconds, the auction closing time is automatically extended by exactly +120 seconds.',
          'This extension triggers iteratively until a full 120-second window elapses with no further qualifying bids, ensuring all participants have adequate time to respond.'
        ]
      },
      {
        id: 'sec-5',
        number: '5',
        title: 'Winner Determination & Settlement Obligation',
        content: [
          'Upon auction expiration, the bidder holding the highest valid server-accepted bid is declared the winning bidder.',
          'The winning bidder is granted twenty-four (24) hours from auction closing to complete payment settlement through our authorized payment gateway.',
          'If the winning bidder defaults on payment within the 24-hour window, AXIOMIS Technologies reserves the right to disqualify the bidder, suspend the account, and re-allocate the tenure or offer it to the next qualifying bidder.'
        ]
      },
      {
        id: 'sec-6',
        number: '6',
        title: 'Prohibition of Manipulation & Collusion',
        content: [
          'Shill bidding, collusive bidding rings, multi-account bid spoofing, and automated bot networks designed to manipulate price progression are strictly prohibited.',
          'Violations will result in immediate disqualification, forfeiture of rights, and permanent bans across the platform.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' },
      { title: 'Payment & Billing Policy', slug: 'payment-policy' },
      { title: 'Ownership & Display Policy', slug: 'ownership-policy' }
    ]
  },

  // ============================================================================
  // DOCUMENT 06: ADVERTISING & CONTENT POLICY
  // ============================================================================
  {
    slug: 'advertising-policy',
    docNumber: '06',
    title: 'Advertising & Content Policy',
    subtitle: 'Standards, prohibited categories, technical specifications and moderation procedures for creatives.',
    category: 'Advertising & Intellectual Property',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This policy defines the acceptable standards, restricted categories, technical creative specifications, and moderation standards enforced on THE BIG BANNER.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'General Advertising Standards',
        content: [
          'Because THE BIG BANNER features only ONE primary banner commanding undivided homepage attention, we maintain an uncompromising standard of truthfulness, visual elegance, and legal compliance.',
          'All advertisements published on THE BIG BANNER must be truthful, non-deceptive, properly substantiated, and fully compliant with applicable domestic and international advertising regulations.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Strictly Prohibited Content',
        content: [
          'The following categories are absolutely banned from publication on THE BIG BANNER:',
          '• Illegal goods, contraband, weapons, ammunition, or regulated substances.',
          '• Deceptive financial schemes, unauthorized multi-level marketing (MLM), or guaranteed-return investment scams.',
          '• Phishing links, malware, spyware, ransomware, or drive-by download URLs.',
          '• Unlicensed gambling, sports betting, or unregulated online casinos.',
          '• Hate speech, discriminatory slurs, harassment, or violent extremist promotion.',
          '• Explicit adult entertainment, pornography, or sexually suggestive exploitation.',
          '• Counterfeit goods, pirated digital media, or intellectual property infringements.',
          '• Unverified or dangerous medical claims, miracle cures, or prescription pharmaceutical sales.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Restricted & Regulated Categories',
        content: [
          'Certain categories require express advance editorial clearance and verified regulatory licensing: (a) Licensed financial institutions; (b) Enterprise blockchain / cryptocurrency software (subject to jurisdictional compliance); (c) Health wellness products; and (d) Institutional corporate public notices.',
          'AXIOMIS Technologies reserves the right to demand documentary evidence of regulatory authorization prior to approving creatives in restricted categories.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Technical Creative Specifications',
        content: [
          'To ensure pristine visual quality across devices, advertisers must submit assets meeting the following technical standards:',
          '• Desktop Banner: High-resolution PNG, WebP, or SVG format; minimum dimensions 1920x480px (4:1 aspect ratio); maximum file size 5MB.',
          '• Mobile Banner: High-resolution PNG or WebP; minimum dimensions 1080x1080px (1:1 square) or 1080x1350px (4:5 ratio); maximum file size 3MB.',
          '• Destination URL: Must resolve to an active, secure (HTTPS) corporate landing page matching the advertised brand.'
        ]
      },
      {
        id: 'sec-5',
        number: '5',
        title: 'Moderation, Removal & Appeals',
        content: [
          'All creatives undergo rigorous pre-broadcast review. Our verification desk conducts automated malware checks, destination SSL validation, and human editorial review.',
          'If a published advertisement is subsequently found to violate policies or if the destination URL is altered post-approval to host malicious content, AXIOMIS Technologies will immediately suspend the live broadcast.',
          'Advertisers may appeal moderation decisions by contacting editorial@thebigbanner.com.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Intellectual Property Policy', slug: 'intellectual-property-policy' },
      { title: 'Ownership & Display Policy', slug: 'ownership-policy' }
    ]
  },

  // ============================================================================
  // DOCUMENT 07: PAYMENT & BILLING POLICY
  // ============================================================================
  {
    slug: 'payment-policy',
    docNumber: '07',
    title: 'Payment & Billing Policy',
    subtitle: 'Payment rails, canonical USD denomination, local currency conversions, invoicing and taxes.',
    category: 'Auctions, Payments & Ownership',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This document explains the commercial payment framework, currency conversions, billing records, and tax considerations for transactions on THE BIG BANNER.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Canonical USD Architecture',
        content: [
          'THE BIG BANNER operates authoritatively in United States Dollars (USD). All auction bids, qualification formulas, and historical ledger records are denominated strictly in canonical USD.',
          'Where the Platform displays converted estimates in local currencies (EUR, GBP, INR, JPY, CAD, AUD, AED, SGD, CHF), such figures are indicative and calculated using reliable cached exchange rate feeds.',
          'The final checkout order session explicitly specifies the authoritative USD amount and the exact currency and charge amount transmitted to the payment gateway.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Authorized Payment Rails & Gateways',
        content: [
          'Payments are collected and processed through our verified gateway partner, Cashfree Payments India Private Limited, and its international banking associates.',
          'Supported payment methods include: International and Domestic Corporate Credit Cards, Debit Cards, Verified Institutional Wire / Net Banking, and supported digital settlement protocols.',
          'All card transmissions occur over 256-bit encrypted SSL connections directly to PCI-DSS Level 1 compliant gateway endpoints.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Taxes & Commercial Invoicing',
        content: [
          'Applicable taxes (including Indian Goods and Services Tax, where applicable to the operator based on statutory registration thresholds) are calculated in accordance with relevant statutory provisions.',
          'Following verified payment settlement, an official electronic commercial invoice / escrow receipt is issued identifying AXIOMIS Technologies as the legal operating entity, displaying the canonical USD purchase amount, gateway reference, and tenure number.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Chargebacks & Dispute Protocol',
        content: [
          'In the event of an unjustified chargeback or payment reversal initiated without prior consultation with our billing team, the advertiser account will be suspended immediately and all active and future tenures will be frozen pending formal legal investigation.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Refund & Cancellation Policy', slug: 'refund-policy' },
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' }
    ]
  },

  // ============================================================================
  // DOCUMENT 08: OWNERSHIP & DISPLAY POLICY
  // ============================================================================
  {
    slug: 'ownership-policy',
    docNumber: '08',
    title: 'Ownership & Display Policy',
    subtitle: 'Definition of advertising ownership, display specifications, certificate issuance and archiving.',
    category: 'Auctions, Payments & Ownership',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This policy defines the rights, parameters, and limitations associated with owning an advertising placement on THE BIG BANNER.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Commercial Meaning of Advertising "Ownership"',
        content: [
          'Within the context of THE BIG BANNER, "Ownership" is a defined commercial advertising term signifying the exclusive, limited contractual right to have your approved advertising creative displayed in the primary banner placement during your purchased tenure.',
          '"Ownership" DOES NOT grant: (a) Any corporate equity, partnership, or share in AXIOMIS Technologies; (b) Any ownership of THE BIG BANNER domain name, website, trademark, codebase, or infrastructure; or (c) Any intellectual property rights beyond the advertiser\'s own creative assets.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Tenure Duration & Operational Scheduling',
        content: [
          'Each standard Ownership Period runs for fourteen (14) consecutive calendar days (336 hours), commencing at 00:00:00 UTC on the scheduled start date and terminating at 23:59:59 UTC on the scheduled end date.',
          'There is no automatic renewal. To secure future tenures, advertisers must participate in the applicable upcoming auctions.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Performance & Commercial Disclaimers',
        content: [
          'Ownership guarantees 100% share of voice on the primary homepage placement without ad rotation or competing banners.',
          'However, ownership does not constitute a performance guarantee. AXIOMIS Technologies does not warrant or guarantee any specific number of impressions, unique visitors, click-through rates, commercial leads, conversions, or revenue.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Ownership Certificates & Historical Enshrinement',
        content: [
          'Upon successful tenure conclusion, the advertiser is issued an official Digital Ownership Certificate featuring a unique serial identifier (e.g. TBB-CERT-2026-XXXX) and cryptographic transaction hash.',
          'The brand name, country, purchase price, and creative thumbnail are permanently enshrined in the Public Ownership Record, establishing an immutable historical legacy of verified platform owners.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Auction & Bidding Rules', slug: 'auction-rules' },
      { title: 'Intellectual Property Policy', slug: 'intellectual-property-policy' }
    ]
  },

  // ============================================================================
  // DOCUMENT 09: INTELLECTUAL PROPERTY POLICY
  // ============================================================================
  {
    slug: 'intellectual-property-policy',
    docNumber: '09',
    title: 'Intellectual Property Policy',
    subtitle: 'Brand assets, advertiser creative licenses, copyright compliance and takedown procedures.',
    category: 'Advertising & Intellectual Property',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This policy outlines the intellectual property rights of AXIOMIS Technologies, advertiser creative licenses, and our procedures for addressing infringement claims.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Operator Intellectual Property',
        content: [
          'All software, source code, database architectures, graphics, layout designs, user interfaces, editorial text, the commercial brand "THE BIG BANNER", and the official stylized "β." logo are the proprietary intellectual property of AXIOMIS Technologies.',
          'No user or advertiser may copy, decompile, reverse engineer, scrape, or reproduce any platform element without express written authorization.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Advertiser Creative Ownership & Display License',
        content: [
          'Advertisers retain all pre-existing copyrights, trademarks, and intellectual property rights in the creative assets they submit to the Platform.',
          'By submitting an advertisement creative, the advertiser grants AXIOMIS Technologies a worldwide, royalty-free, non-exclusive license to: (a) display the creative on the homepage during the purchased tenure; (b) permanently display the creative thumbnail in the historical ownership archive; and (c) feature the placement in platform marketing case studies.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Copyright & Trademark Infringement Takedown Notices',
        content: [
          'AXIOMIS Technologies respects third-party intellectual property rights and adheres to statutory notice-and-takedown procedures under Indian IT Rules and international copyright principles (DMCA).',
          'If you believe a creative displayed on THE BIG BANNER infringes your copyright or trademark, submit a formal notice to legal@thebigbanner.com containing: (a) Identification of the copyrighted work; (b) Identification of the infringing banner creative; (c) Evidence of your ownership authority; (d) Your contact details; and (e) A signed statement of good faith belief.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Advertising & Content Policy', slug: 'advertising-policy' },
      { title: 'Grievance Redressal Policy', slug: 'grievance-redressal' }
    ]
  },

  // ============================================================================
  // DOCUMENT 10: DISCLAIMER & LIMITATION OF LIABILITY
  // ============================================================================
  {
    slug: 'disclaimer',
    docNumber: '10',
    title: 'Disclaimer & Limitation of Liability',
    subtitle: 'Important legal disclaimers, service availability limitations and liability caps.',
    category: 'Trust, Safety & Compliance',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This document sets forth comprehensive disclaimers regarding website uptime, third-party systems, advertising ROI, and the legal limits of liability of AXIOMIS Technologies.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Informational & Commercial Nature of Platform',
        content: [
          'THE BIG BANNER provides an online marketplace for digital advertising space. It does not provide financial investment advisory services, securities trading, or guaranteed marketing yields.',
          'Historical purchase prices and price appreciation metrics published in our transparency ledger reflect past auction clearing prices and must not be construed as promises or forecasts of future advertising value.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Service Availability & Third-Party Dependencies',
        content: [
          'While we endeavor to maintain 99.9% uptime, AXIOMIS Technologies does not guarantee uninterrupted or error-free platform access. Operations may be affected by routine maintenance, cloud infrastructure outages, telecommunications interruptions, or distributed denial-of-service (DDoS) events.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Third-Party Destination Websites Disclaimer',
        content: [
          'THE BIG BANNER is not responsible for the contents, products, services, or privacy practices of destination websites linked from advertising banners. Visitors access third-party destination links entirely at their own risk.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Comprehensive Limitation of Liability',
        content: [
          'TO THE MAXIMUM EXTENT PERMISSIBLE BY APPLICABLE LAW, IN NO EVENT SHALL AXIOMIS TECHNOLOGIES, ITS OFFICERS, CONTRACTORS, OR AGENTS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA LOSS, BUSINESS INTERRUPTION, OR REPUTATIONAL HARM.',
          'OUR MAXIMUM AGGREGATE LIABILITY ARISING FROM ANY CLAIM RELATED TO A PLACEMENT SHALL NOT EXCEED THE ACTUAL FEES RECEIVED BY US FOR THAT SPECIFIC ADVERTISING TENURE.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' },
      { title: 'Refund & Cancellation Policy', slug: 'refund-policy' }
    ]
  },

  // ============================================================================
  // DOCUMENT 11: ACCEPTABLE USE POLICY
  // ============================================================================
  {
    slug: 'acceptable-use-policy',
    docNumber: '11',
    title: 'Acceptable Use Policy',
    subtitle: 'Standards of conduct, anti-abuse rules, scraping restrictions and system integrity protections.',
    category: 'Trust, Safety & Compliance',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This Acceptable Use Policy establishes the standards of conduct required of all visitors, registered bidders, and advertisers across THE BIG BANNER.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Core Standard of Platform Integrity',
        content: [
          'THE BIG BANNER relies upon transparent, honest bidding competition and dignified digital advertising. Users agree to utilize the Platform in good faith and in full compliance with all applicable laws.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Prohibited Behaviors',
        content: [
          'The following actions constitute severe violations of this Policy:',
          '• Bidding Abuse: Utilizing automated scripts or bots to spam bids; collaborating with other bidders to suppress bids; or placing bad-faith bids with no intention of payment.',
          '• Infrastructure Attacks: Attempting to probe, scan, or test vulnerabilities of our servers, or launching denial-of-service attacks.',
          '• Content Swapping: Altering the destination URL landing page post-approval to display misleading, fraudulent, or harmful content.',
          '• Data Scraping: Systematic harvesting of platform data, user information, or proprietary compilations without express written consent.',
          '• Impersonation: Registering accounts under false corporate identities or misrepresenting authority to act for a brand.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Enforcement, Suspension & Remedial Measures',
        content: [
          'AXIOMIS Technologies actively monitors platform logs. Any user found violating this Policy is subject to immediate account suspension, bid cancellation, forfeiture of pending auction outcomes, and potential civil or criminal referral.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' },
      { title: 'Advertising & Content Policy', slug: 'advertising-policy' }
    ]
  },

  // ============================================================================
  // DOCUMENT 12: GRIEVANCE REDRESSAL POLICY
  // ============================================================================
  {
    slug: 'grievance-redressal',
    docNumber: '12',
    title: 'Grievance Redressal Policy',
    subtitle: 'Formal grievance escalation, statutory dispute resolution under Indian IT Rules, and consumer redressal.',
    category: 'Trust, Safety & Compliance',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This document establishes the formal grievance redressal mechanism maintained by AXIOMIS Technologies under the Information Technology (Intermediary Guidelines) Rules, 2021 and Consumer Protection (E-Commerce) Rules, 2020.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Statutory Grievance Mandate',
        content: [
          'In compliance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Consumer Protection (E-Commerce) Rules, 2020, AXIOMIS Technologies maintains a dedicated Grievance Redressal Officer and structured complaint resolution workflow.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Types of Grievances Covered',
        content: [
          'This mechanism processes formal complaints concerning:',
          '1. Unlawful, infringing, or objectionable advertisement creatives displayed on the homepage.',
          '2. Privacy and digital personal data processing disputes under the DPDP Act, 2023.',
          '3. Auction outcome disputes, anti-sniping clock concerns, and winner verification.',
          '4. Payment reconciliation, gateway discrepancies, and refund processing.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Filing Procedure & Mandatory Information',
        content: [
          'Grievances must be submitted through our interactive Grievance Submission Form on this page or by emailing grievance@thebigbanner.com.',
          'Complaints must include: (a) Complainant full legal name and verified contact details; (b) Category of grievance; (c) Specific factual narrative and URL / screenshot evidence; and (d) Specific legal relief requested.'
        ]
      },
      {
        id: 'sec-4',
        number: '4',
        title: 'Statutory Timelines & Redressal Protocol',
        content: [
          '• Acknowledgment: We issue an automated formal acknowledgment and tracking ticket reference within twenty-four (24) hours of receipt.',
          '• Review & Investigation: The Grievance Officer reviews all evidence and may contact relevant parties for clarification.',
          '• Resolution: We provide a reasoned written resolution within fifteen (15) calendar days from receipt, in accordance with applicable statutory standards.'
        ]
      },
      {
        id: 'sec-5',
        number: '5',
        title: 'Grievance Redressal Officer Details',
        content: [
          'Designated Operator: AXIOMIS Technologies.',
          'Official Grievance Email: grievance@thebigbanner.com.',
          '[Administrative Disclosure: Specific name and physical address of the Grievance Officer are maintained on corporate file and populated from verified business records].'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' },
      { title: 'Privacy Policy', slug: 'privacy-policy' },
      { title: 'Legal Notice & Operator Information', slug: 'legal-notice' }
    ]
  },

  // ============================================================================
  // DOCUMENT 13: ACCOUNT SUSPENSION & TERMINATION POLICY
  // ============================================================================
  {
    slug: 'account-termination',
    docNumber: '13',
    title: 'Account Suspension & Termination Policy',
    subtitle: 'Grounds, procedures and consequences of account suspension, closure and permanent termination.',
    category: 'Trust, Safety & Compliance',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This policy defines the grounds, processes, and consequences surrounding voluntary account closure and administrative suspension or termination by AXIOMIS Technologies.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Voluntary Account Closure',
        content: [
          'Users may request voluntary account closure at any time by contacting support@thebigbanner.com, provided there are no active leading bids, unsettled auction wins, or active advertising tenures associated with the account.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Grounds for Involuntary Suspension & Termination',
        content: [
          'AXIOMIS Technologies may immediately suspend or terminate an account for: (a) Material breach of Terms or incorporated policies; (b) Failure to complete payment for a winning auction bid within 24 hours; (c) Submission of fraudulent, infringing, or malicious creatives; (d) Collusive or automated bid manipulation; (e) Unjustified chargebacks; or (f) Legal mandate from law enforcement or judicial authorities.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Effect of Termination on Bids & Historical Records',
        content: [
          'Upon account termination: (a) All active bids placed by the account in ongoing auctions are immediately invalidated; and (b) Account access is revoked.',
          'Crucially, termination of an account DOES NOT erase historical public ownership records of completed prior tenures. Public ledger entries reflect historical facts and remain permanently archived for platform transparency.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' },
      { title: 'Acceptable Use Policy', slug: 'acceptable-use-policy' }
    ]
  },

  // ============================================================================
  // DOCUMENT 14: DATA RETENTION & DELETION POLICY
  // ============================================================================
  {
    slug: 'data-retention',
    docNumber: '14',
    title: 'Data Retention & Deletion Policy',
    subtitle: 'Detailed retention schedules, statutory preservation criteria and data subject deletion processing.',
    category: 'Privacy & Data Protection',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This document sets forth our data retention schedules, statutory record-keeping baselines, and protocols for processing data erasure requests.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Data Retention Objectives',
        content: [
          'AXIOMIS Technologies retains personal and corporate records only for as long as necessary to fulfill operational purposes, satisfy statutory accounting and tax mandates, and resolve legal disputes.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Retention Schedules by Category',
        content: [
          '• Active Account Profile Data: Retained for the duration of the active account relationship plus 180 days following voluntary closure.',
          '• Financial & Invoicing Records: Retained for eight (8) years to comply with statutory accounting and Goods and Services Tax (GST) requirements under Indian law.',
          '• Auction Bidding Audit Logs: Retained for five (5) years to ensure historical dispute verification and anti-fraud auditing.',
          '• Security Access & IP Logs: Retained for one (1) year in compliance with statutory cybersecurity directives (CERT-In).',
          '• Public Ownership Ledger: Retained permanently as an immutable historical record of platform tenures.'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Erasure & Anonymization Protocol',
        content: [
          'Upon receiving a valid statutory deletion request under the DPDP Act or GDPR, we delete non-statutory personal identifiers. Records required by law are archived in cold, encrypted storage with restricted access until statutory limitation periods expire.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Privacy Policy', slug: 'privacy-policy' },
      { title: 'Grievance Redressal Policy', slug: 'grievance-redressal' }
    ]
  },

  // ============================================================================
  // DOCUMENT 15: LEGAL NOTICE & OPERATOR INFORMATION
  // ============================================================================
  {
    slug: 'legal-notice',
    docNumber: '15',
    title: 'Legal Notice & Operator Information',
    subtitle: 'Official corporate disclosures, operating entity structure and statutory governance details.',
    category: 'Operator Information',
    effectiveDate: 'January 15, 2026',
    lastUpdated: 'November 10, 2026',
    version: 'v1.2.0',
    status: 'Published',
    requiresLegalReview: true,
    operatorStatement: OPERATOR_DECLARATION,
    description:
      'This Legal Notice sets forth the official legal contracting identity, ownership structure, and regulatory details of THE BIG BANNER and its operating entity.',
    sections: [
      {
        id: 'sec-1',
        number: '1',
        title: 'Operating Entity & Commercial Brand Structure',
        content: [
          'THE BIG BANNER is a digital advertising auction platform operated by AXIOMIS Technologies, operating from India.',
          'THE BIG BANNER is a commercial brand and online platform operated by AXIOMIS Technologies and is not represented as an independently incorporated company, private limited company, or limited liability partnership.',
          'All contracts, commercial billing, auction engagements, and legal obligations are executed directly with AXIOMIS Technologies.'
        ]
      },
      {
        id: 'sec-2',
        number: '2',
        title: 'Verified Corporate Information',
        content: [
          '• Commercial Brand: THE BIG BANNER',
          '• Operating Entity: AXIOMIS Technologies',
          '• Country of Operation: India',
          '• Official Operator Website: https://axiomis.in',
          '• Official Platform Website: https://thebigbanner.com',
          '• Official Corporate Email: governance@thebigbanner.com',
          '• Customer Support Email: support@thebigbanner.com',
          '• Legal & Grievance Contact: grievance@thebigbanner.com',
          '• Operator Legal Representative: [Maintained on file — Populated from verified business records upon legal counsel sign-off]',
          '• Principal Business Address: [India — Populated from verified business records upon legal counsel sign-off]',
          '• Tax Identification / GSTIN: [Subject to statutory threshold & registration status — Populated from verified business records]'
        ]
      },
      {
        id: 'sec-3',
        number: '3',
        title: 'Regulatory & Legal Framework',
        content: [
          'AXIOMIS Technologies conducts all commercial operations under the governing legal framework of India, including the Information Technology Act, 2000, the Consumer Protection Act, 2019, the Digital Personal Data Protection Act, 2023, and applicable commercial contracting statutes.'
        ]
      }
    ],
    relatedLinks: [
      { title: 'Terms & Conditions', slug: 'terms-and-conditions' },
      { title: 'Grievance Redressal Policy', slug: 'grievance-redressal' },
      { title: 'Privacy Policy', slug: 'privacy-policy' }
    ]
  }
];

export const LEGAL_CATEGORIES = [
  'Platform Agreements',
  'Privacy & Data Protection',
  'Auctions, Payments & Ownership',
  'Advertising & Intellectual Property',
  'Trust, Safety & Compliance',
  'Operator Information'
] as const;

export function getLegalDocumentBySlug(slug: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find(doc => doc.slug === slug);
}
