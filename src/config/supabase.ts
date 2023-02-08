import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.SUPABASE_KEY;
const supabaseURL = process.env.SUPABASE_URL;
const supabase = createClient(supabaseURL, supabaseKey);

export async function getFileOnSupabase(filename: string) {
    const { data } = await supabase.storage.from('update').getPublicUrl(`upload/${filename}`);
    return data;
}

export async function uploadFileOnSupabase(filename: string, file: any) {
    const { data } = await supabase
        .storage
        .from('update')
        .upload(`upload/${filename}}`, file, {
            upsert: false
        });
    // console.log(data)
    return data;
}

export default supabase;