import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fyswympbcriibpewkxnh.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5c3d5bXBiY3JpaWJwZXdreG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMjIwMTcsImV4cCI6MjA5Mjc5ODAxN30.l5gy0L9JU_8g0vIjoFWmUqP7T7zyHOsE0wdmkC2kBo0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface QuizLead {
  name: string
  email: string
  startup_name: string
  score: number
  traction: number
  team: number
  readiness: number
  stage: string
  plan: string
  answers?: Record<number, number>
  weakest_dimension?: string
}

export async function saveQuizLead(data: QuizLead): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('quiz_leads')
      .insert([data])

    if (error) {
      console.error('Supabase error:', error)
      return false
    }

    return true
  } catch (e) {
    console.error('Supabase:', e)
    return false
  }
}
