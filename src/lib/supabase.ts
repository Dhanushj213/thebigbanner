import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_ID = 'mnxljurcalpjngwdgihy';
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback dummy key to prevent client crash during build if environment variable isn't injected yet
const anonKey = SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key';

export const supabase = createClient(SUPABASE_URL, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
