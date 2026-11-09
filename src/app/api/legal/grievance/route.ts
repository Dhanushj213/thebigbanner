import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, complainantName, complainantEmail, subject, details, evidenceUrl } = body;

    if (!category || !complainantName || !complainantEmail || !subject || !details) {
      return NextResponse.json({ error: 'Please provide all required grievance fields' }, { status: 400 });
    }

    const ticketNumber = `GR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `grv_${Date.now()}`;
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO grievance_requests (id, ticket_number, category, complainant_name, complainant_email, subject, details, evidence_url, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'acknowledged', ?)
    `).run(id, ticketNumber, category, complainantName, complainantEmail, subject, details, evidenceUrl || null, createdAt);

    // Audit log
    db.prepare(`
      INSERT INTO legal_audit_logs (id, action, actor_id, target_document, details, created_at)
      VALUES (?, 'GRIEVANCE_FILED', ?, 'grievance-redressal', ?, datetime('now'))
    `).run(`log_${Date.now()}`, complainantEmail, `Ticket: ${ticketNumber} (${category}) - ${subject}`);

    return NextResponse.json({
      success: true,
      ticketNumber,
      message: `Your grievance complaint has been formally acknowledged with tracking ticket ${ticketNumber}. Our Grievance Redressal Officer will provide a reasoned written resolution within fifteen (15) calendar days.`,
      status: 'acknowledged',
      createdAt,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM grievance_requests ORDER BY created_at DESC').all();
    return NextResponse.json({ grievances: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
