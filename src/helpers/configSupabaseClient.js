import { createClient } from "@supabase/supabase-js";

const getSupabaseClient = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    return supabase;
}

const supabase = getSupabaseClient();

export {supabase};