import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visitorId, essential, analytics, marketing } = body;

    const vid = visitorId || `vis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const id = `cp_${vid}`;

    db.prepare(`
      INSERT INTO cookie_preferences (id, visitor_id, essential, analytics, marketing, updated_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(id) DO UPDATE SET
        essential = excluded.essential,
        analytics = excluded.analytics,
        marketing = excluded.marketing,
        updated_at = excluded.updated_at
    `).run(id, vid, 1, analytics ? 1 : 0, marketing ? 1 : 0);

    return NextResponse.json({
      success: true,
      visitorId: vid,
      preferences: {
        essential: true,
        analytics: Boolean(analytics),
        marketing: Boolean(marketing),
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
