import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, documentSlug, documentVersion, context } = body;

    if (!userId || !documentSlug || !documentVersion) {
      return NextResponse.json({ error: 'Missing required acceptance parameters' }, { status: 400 });
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Browser Client';
    const id = `acc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const acceptedAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO legal_document_acceptances (id, user_id, document_slug, document_version, acceptance_context, ip_address, user_agent, accepted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, userId, documentSlug, documentVersion, context || 'general', ipAddress, userAgent, acceptedAt);

    // Also record in audit log
    db.prepare(`
      INSERT INTO legal_audit_logs (id, action, actor_id, target_document, details, created_at)
      VALUES (?, 'ACCEPTANCE_RECORDED', ?, ?, ?, datetime('now'))
    `).run(`log_${Date.now()}`, userId, documentSlug, `Accepted version ${documentVersion} via ${context || 'general'}`);

    return NextResponse.json({
      success: true,
      acceptanceId: id,
      documentSlug,
      documentVersion,
      acceptedAt,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      // Return recent global acceptances for admin
      const rows = db.prepare('SELECT * FROM legal_document_acceptances ORDER BY accepted_at DESC LIMIT 50').all();
      return NextResponse.json({ acceptances: rows });
    }

    const rows = db.prepare('SELECT * FROM legal_document_acceptances WHERE user_id = ? ORDER BY accepted_at DESC').all(userId);
    return NextResponse.json({ acceptances: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
