import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fbhnargeikrixumlrpjr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaG5hcmdlaWtyaXh1bWxycGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2MzYxMDcsImV4cCI6MjAyMDIxMjEwN30.3BCqW4M7NkOLgTMBrY3cEqKWoKIoPKVWgNaFFXP9cHk';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;