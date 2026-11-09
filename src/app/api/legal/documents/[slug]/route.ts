import { NextResponse } from 'next/server';
import { getLegalDocumentBySlug } from '@/data/legalDocuments';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const document = getLegalDocumentBySlug(slug);

    if (!document) {
      return NextResponse.json({ error: 'Legal document not found' }, { status: 404 });
    }

    return NextResponse.json({
      document,
      serverTime: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
