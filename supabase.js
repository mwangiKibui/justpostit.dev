import { createClient } from '@supabase/supabase-js';


export const initializeSupabase = (url,key) => {
    let supabase = createClient(url,key);
    return supabase;
}