import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging to see what we're getting
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables missing:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  })
  throw new Error('Supabase integration not properly configured. Please ensure Supabase is connected to your Lovable project.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)