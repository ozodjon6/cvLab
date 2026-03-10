import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gfeaorrweuqepsvpmevv.supabase.co'
const supabaseKey = 'sb_publishable_rg3tJ07hnJcwnjPoRWgb9g_R9rhC70R'

export const supabase = createClient(supabaseUrl, supabaseKey)
