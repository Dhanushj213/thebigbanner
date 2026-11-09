import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { requestType, name, email, jurisdiction, details } = body;

    if (!requestType || !name || !email || !details) {
      return NextResponse.json({ error: 'Please provide all required privacy request fields' }, { status: 400 });
    }

    const ticketNumber = `PR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `priv_${Date.now()}`;
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO privacy_requests (id, ticket_number, request_type, name, email, jurisdiction, details, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'received', ?)
    `).run(id, ticketNumber, requestType, name, email, jurisdiction || 'Global', details, createdAt);

    // Audit log
    db.prepare(`
      INSERT INTO legal_audit_logs (id, action, actor_id, target_document, details, created_at)
      VALUES (?, 'PRIVACY_REQUEST_FILED', ?, 'privacy-policy', ?, datetime('now'))
    `).run(`log_${Date.now()}`, email, `Ticket: ${ticketNumber} (${requestType})`);

    return NextResponse.json({
      success: true,
      ticketNumber,
      message: `Your privacy inquiry has been logged as ${ticketNumber}. Our Data Protection desk will respond within the statutory timeframe.`,
      status: 'received',
      createdAt,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM privacy_requests ORDER BY created_at DESC').all();
    return NextResponse.json({ requests: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
