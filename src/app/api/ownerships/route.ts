import { NextResponse } from 'next/server';
import { getOwnershipHistory, getOwnershipById } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search') || undefined;
    const country = searchParams.get('country') || undefined;
    const sortBy = searchParams.get('sortBy') || undefined;

    if (id) {
      const record = getOwnershipById(id);
      if (!record) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
      return NextResponse.json({ record });
    }

    const records = getOwnershipHistory({ search, country, sortBy });
    return NextResponse.json({ records, totalCount: records.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
