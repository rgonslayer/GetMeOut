import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://inzvyhojekccgfnotsum.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluenZ5aG9qZWtjY2dmbm90c3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMwMjg2MzUsImV4cCI6MTk2ODYwNDYzNX0.zDXYs0SuVfJxuL5a9pyN0d8xNU2FdJOf401YMJPncEg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)