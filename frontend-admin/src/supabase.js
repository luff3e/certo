import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qojoyxhjjysnilqtltnk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvam95eGhqanlzbmlscXRsdG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTQyODksImV4cCI6MjA2NTU3MDI4OX0.mqLCWdKyKw8yJq5fvpNw2PCSZN3SrGTWkaj8_99jAh8';

export const supabase = createClient(supabaseUrl, supabaseKey);
