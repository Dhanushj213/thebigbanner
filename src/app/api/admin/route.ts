import { NextResponse } from 'next/server';
import {
  moderateAdvertisement,
  seedVerifiedDemonstrationRecords,
  resetDatabaseToFreshGenesis,
} from '@/lib/services';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === 'moderate_ad') {
      const { adminId, adId, status, notes } = payload;
      moderateAdvertisement(adminId || 'usr_admin', adId, status, notes || '');
      return NextResponse.json({ success: true, message: `Creative set to ${status}.` });
    }

    if (action === 'seed_demo') {
      seedVerifiedDemonstrationRecords();
      return NextResponse.json({ success: true, message: 'Verified demonstration records loaded.' });
    }

    if (action === 'reset_genesis') {
      resetDatabaseToFreshGenesis();
      return NextResponse.json({ success: true, message: 'Database reset to clean Genesis state (0 owners).' });
    }

    if (action === 'swap_live_banner') {
      const { ownershipId } = payload;
      db.prepare("UPDATE ownerships SET status = 'completed' WHERE status = 'active'").run();
      db.prepare("UPDATE ownerships SET status = 'active' WHERE id = ?").run(ownershipId);
      return NextResponse.json({ success: true, message: 'Live billboard banner swapped successfully.' });
    }

    return NextResponse.json({ error: 'Unrecognized action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
