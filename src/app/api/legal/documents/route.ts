import { NextResponse } from 'next/server';
import { LEGAL_DOCUMENTS, LEGAL_CATEGORIES } from '@/data/legalDocuments';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Return all legal documents summary metadata
    const documents = LEGAL_DOCUMENTS.map(doc => ({
      slug: doc.slug,
      docNumber: doc.docNumber,
      title: doc.title,
      subtitle: doc.subtitle,
      category: doc.category,
      effectiveDate: doc.effectiveDate,
      lastUpdated: doc.lastUpdated,
      version: doc.version,
      status: doc.status,
      requiresLegalReview: doc.requiresLegalReview,
      sectionsCount: doc.sections.length,
    }));

    return NextResponse.json({
      documents,
      categories: LEGAL_CATEGORIES,
      operator: 'AXIOMIS Technologies',
      brand: 'THE BIG BANNER',
      lastSystemAudit: '2026-11-10',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
