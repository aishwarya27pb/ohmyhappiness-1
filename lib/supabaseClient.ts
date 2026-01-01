
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcgdvhehpqqytqndunuw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZ2R2aGVocHFxeXRxbmR1bnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MDAzMDQsImV4cCI6MjA4MjQ3NjMwNH0.ES8T1eN-oA-1Iyd8FtTl37KVnev3bdo413jHitlX9tM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
