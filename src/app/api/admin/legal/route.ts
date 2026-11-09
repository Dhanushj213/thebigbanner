import { NextResponse } from 'next/server';
import { LEGAL_DOCUMENTS } from '@/data/legalDocuments';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const totalAcceptances = db.prepare('SELECT COUNT(*) as count FROM legal_document_acceptances').get() as { count: number };
    const acceptancesByDoc = db.prepare(`
      SELECT document_slug, COUNT(*) as count 
      FROM legal_document_acceptances 
      GROUP BY document_slug
    `).all();

    const recentAuditLogs = db.prepare('SELECT * FROM legal_audit_logs ORDER BY created_at DESC LIMIT 25').all();
    const grievanceStats = db.prepare('SELECT COUNT(*) as count FROM grievance_requests').get() as { count: number };
    const privacyStats = db.prepare('SELECT COUNT(*) as count FROM privacy_requests').get() as { count: number };

    return NextResponse.json({
      totalDocuments: LEGAL_DOCUMENTS.length,
      publishedCount: LEGAL_DOCUMENTS.filter(d => d.status === 'Published').length,
      underReviewCount: LEGAL_DOCUMENTS.filter(d => d.requiresLegalReview).length,
      totalAcceptances: totalAcceptances.count,
      acceptancesByDoc,
      grievanceCount: grievanceStats.count,
      privacyCount: privacyStats.count,
      recentAuditLogs,
      operator: 'AXIOMIS Technologies',
      businessType: 'Proprietorship (India)',
      operatorDomain: 'https://axiomis.in',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, documentSlug, actorId, details } = body;

    if (!action || !documentSlug) {
      return NextResponse.json({ error: 'Missing action or documentSlug' }, { status: 400 });
    }

    const logId = `admin_log_${Date.now()}`;
    db.prepare(`
      INSERT INTO legal_audit_logs (id, action, actor_id, target_document, details, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).run(logId, action, actorId || 'admin_usr', details || `Admin action: ${action} on ${documentSlug}`);

    return NextResponse.json({ success: true, logId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
