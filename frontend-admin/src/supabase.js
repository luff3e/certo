import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pkmnvshibtkmdikeneyz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbW52c2hpYnRrbWRpa2VuZXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzkyNjEsImV4cCI6MjA2NTU1NTI2MX0.tz-WjLm2fknoIODMVPePHGx3e31eHsCJHXGegv55WV4'
);

export default supabase;
