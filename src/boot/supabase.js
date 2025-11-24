import { boot } from 'quasar/wrappers';
import { createClient } from '@supabase/supabase-js';

// Remove extra spaces in the URL (critical!)
const supabaseUrl = 'https://pgqqtktujnxyseazgcoe.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// This is the boot file pattern for Quasar
export default boot(({ app }) => {
  // Make supabase available throughout the app
  app.config.globalProperties.$supabase = supabase;
  
  // For Composition API
  app.provide('supabase', supabase);
});