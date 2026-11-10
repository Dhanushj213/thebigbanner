export interface ComplianceEntry {
  jurisdiction: string;
  framework: string;
  applicabilityTrigger: string;
  platformActivity: string;
  complianceMeasures: string[];
  legalReviewStatus: 'Confirmed' | 'Pending Counsel Sign-off' | 'Under Review';
  responsibleOperator: string;
  lastReviewedDate: string;
}

export const COMPLIANCE_MATRIX: ComplianceEntry[] = [
  {
    jurisdiction: 'India (Domestic)',
    framework: 'Digital Personal Data Protection Act, 2023 (DPDP Act) & Rules 2025',
    applicabilityTrigger: 'Processing of digital personal data within India and digital data of advertisers/visitors in India.',
    platformActivity: 'User account creation, billing contact storage, KYC identity verification, and security audit logging.',
    complianceMeasures: [
      'Specific, unconditional consent notices at registration and checkout.',
      'Explicit separation of mandatory account consent from optional marketing communications.',
      'Data Principal access, correction, erasure, and grievance redressal mechanisms.',
      'Designated Grievance Redressal Officer and response mechanism.',
      'Data minimization and security safeguards against unauthorized access.'
    ],
    legalReviewStatus: 'Pending Counsel Sign-off',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  },
  {
    jurisdiction: 'India (Domestic)',
    framework: 'Information Technology Act, 2000 & IT (Intermediary Guidelines) Rules, 2021',
    applicabilityTrigger: 'Operating an electronic marketplace platform that transmits, hosts, and publishes advertiser creatives.',
    platformActivity: 'Creative upload, public banner broadcast on homepage, destination URL forwarding, and user moderation.',
    complianceMeasures: [
      'Prominently published Terms & Conditions, Privacy Policy, and Content Policy.',
      'Strict editorial moderation of all creatives prior to public broadcast.',
      '24-hour statutory takedown protocol upon receipt of actual knowledge/court order.',
      'Published Grievance Redressal mechanism with acknowledgment and resolution tracking.',
      'Preservation of transaction and access logs for statutory evidentiary compliance.'
    ],
    legalReviewStatus: 'Pending Counsel Sign-off',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  },
  {
    jurisdiction: 'India (Domestic)',
    framework: 'Consumer Protection Act, 2019 & E-Commerce Rules, 2020 (as amended)',
    applicabilityTrigger: 'Operating an online advertising marketplace offering commercial digital ad placement tenures.',
    platformActivity: 'Live online auctions, escrow pricing, payments, refunds, and advertiser dispute management.',
    complianceMeasures: [
      'Clear disclosure of legal operator identity (AXIOMIS Technologies, India).',
      'Transparent display of canonical auction currency (USD) and estimated local currency rates.',
      'Clear Refund & Cancellation Policy stating purchase finality, no voluntary refunds, and failed payment investigation protocol.',
      'Fair, non-manipulative bidding rules with automatic anti-sniping clock extensions.',
      'Accurate representation of gross transaction volumes and historical ledger records.'
    ],
    legalReviewStatus: 'Pending Counsel Sign-off',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  },
  {
    jurisdiction: 'India (Domestic)',
    framework: 'Central Goods and Services Tax Act, 2017 (CGST / IGST) & Invoicing Norms',
    applicabilityTrigger: 'Supply of online information and database access or retrieval (OIDAR) / advertising space services.',
    platformActivity: 'Invoicing successful auction winners, collecting payments via Cashfree, and commercial accounting.',
    complianceMeasures: [
      'Operator identity clearly designated as AXIOMIS Technologies on all tax invoices and receipts.',
      'Domestic Indian supplies subject to GST based on business registration status.',
      'Cross-border export of service documentation maintained for foreign business transactions.',
      'Segregation of gross collections from payment gateway processing fees in public transparency ledger.'
    ],
    legalReviewStatus: 'Under Review',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  },
  {
    jurisdiction: 'European Union (Cross-Border)',
    framework: 'General Data Protection Regulation (EU GDPR - 2016/679)',
    applicabilityTrigger: 'Offering advertising auction services to corporate and individual advertisers located within the EU / EEA.',
    platformActivity: 'Processing personal and business data of EU users, setting web cookies, and public ownership enshrinement.',
    complianceMeasures: [
      'Lawful basis identified: Contractual necessity for account/auction execution; Legitimate interests for security; Consent for cookies.',
      'Dedicated Cookie Preference Centre with granular toggles prior to setting optional analytics/marketing cookies.',
      'Data subject rights mechanism for access, rectification, and erasure of non-statutory records.',
      'Clarification that historical public ownership records constitute an immutable public transparency ledger.'
    ],
    legalReviewStatus: 'Pending Counsel Sign-off',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  },
  {
    jurisdiction: 'United Kingdom (Cross-Border)',
    framework: 'UK Data Protection Act 2018 & UK GDPR',
    applicabilityTrigger: 'Offering bidding participation and advertising tenure services to UK-based commercial entities.',
    platformActivity: 'UK advertiser onboarding, currency estimations in GBP (£), and escrow settlement.',
    complianceMeasures: [
      'Aligned privacy disclosures and Individual Rights Request processing.',
      'Clear distinction between canonical USD auction denomination and indicative GBP settlement.'
    ],
    legalReviewStatus: 'Pending Counsel Sign-off',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  },
  {
    jurisdiction: 'United States (Cross-Border)',
    framework: 'FTC Act Section 5, CAN-SPAM Act & State Privacy Legislation (CCPA / CPRA)',
    applicabilityTrigger: 'Commercial advertising services offered to US advertisers and homepage visitors.',
    platformActivity: 'Displaying commercial creatives, collecting contact details, and marketing notifications.',
    complianceMeasures: [
      'Truth-in-advertising enforcement: Mandatory non-deceptive creative warranties by advertisers.',
      'No sale or sharing of user personal data for cross-context behavioral advertising without opt-out.',
      'Strict prohibition of fraudulent, predatory, or misleading claims in published banner creatives.'
    ],
    legalReviewStatus: 'Pending Counsel Sign-off',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  },
  {
    jurisdiction: 'International Sanctions',
    framework: 'Global Trade Sanctions & Anti-Money Laundering (AML) Compliance',
    applicabilityTrigger: 'Facilitating cross-border escrow transactions across global participants.',
    platformActivity: 'Processing auction bids, corporate identity verification, and gateway settlements.',
    complianceMeasures: [
      'Automatic exclusion of users and advertisers from internationally sanctioned jurisdictions.',
      'Restricted business categories: strict prohibition of illegal financial schemes, malware, and unlicensed gambling.',
      'Payment gateway AML screening through Cashfree and affiliated banking partners.'
    ],
    legalReviewStatus: 'Confirmed',
    responsibleOperator: 'AXIOMIS Technologies (India)',
    lastReviewedDate: '2026-11-10'
  }
];
