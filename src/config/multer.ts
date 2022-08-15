import multer from "multer";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient('https://ctckxiastyejyypkghob.supabase.co', 'IxaLW/0uDNbQTFB7lbWqwnxX2dESzf1o4PFy+fLfxHstFsKveauy4FU4rw36PvbEqznTwGYczvE1Vlk0ID6KvQ==');
let data: any;
const promise = supabase.storage.createBucket('pictures');
promise.then((dataPromise) => (
    data = dataPromise
)).catch((err) => {
    console.log(err);
});