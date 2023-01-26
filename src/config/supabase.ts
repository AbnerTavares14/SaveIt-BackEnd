import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://qunnllukrmhgziyagwne.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey);
const supabase = createClient('https://qunnllukrmhgziyagwne.supabase.co', supabaseKey);

export default supabase;