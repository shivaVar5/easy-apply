import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://syodjwlesigdtplgslku.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5b2Rqd2xlc2lnZHRwbGdzbGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MjYxODgsImV4cCI6MjA1MjUwMjE4OH0.s40hdC7rX6nAIukW4bqpgksamePC6dNIJc3VYp3zrJ4";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;