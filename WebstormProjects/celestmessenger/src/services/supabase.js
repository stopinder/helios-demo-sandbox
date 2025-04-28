import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rczpofxgpeanxnztipav.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjenBvZnhncGVhbnhuenRpcGF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mzg5MDQsImV4cCI6MjA2MDAxNDkwNH0.FdRuvUlHM5OwYNaZqdEXpcOAUWfINwW-0IY9r4HHiHY';

export const supabase = createClient(supabaseUrl, supabaseKey);
