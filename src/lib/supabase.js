import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function testPeriodsFetch() {
  const { data, error } = await supabase.from('periods').select('*')

  if (error) {
    console.error('Error fetching periods:', error)
    return null
  }

  console.log('Periods:', data)
  return data
}
