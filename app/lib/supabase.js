import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage"


const supabaseUrl = "https://ujlkhstujddqdrtwmswz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbGtoc3R1amRkcWRydHdtc3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgyNDkzNDUsImV4cCI6MTk2MzgyNTM0NX0.K0QumFNAe4bbSFe7zpvltD4AQkCIhqOUlzuUQgTpFTY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});