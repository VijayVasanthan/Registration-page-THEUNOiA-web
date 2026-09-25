import { createClient } from '@supabase/supabase-js'

// Types for Freelancer and Client registrations
export interface FreelancerRegistrationData {
  full_name: string
  email: string
  whatsapp_number: string
  city: string
  college_university: string
  year_of_study: string
  age_confirmation: boolean
  primary_skill_category: string
  secondary_skills: string[]
  specific_tools_skills: string
  portfolio_link?: string
  availability: string
  experience_level: string
  preferred_contact_method: string
  how_did_you_hear: string
  terms_consent: boolean
}

export interface ClientRegistrationData {
  name: string
  business_name?: string
  email_or_whatsapp: string
  primary_category_needed: string
  project_description: string
  preferred_contact_method: string
  terms_consent: boolean
}

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co'
)

// Initialize Supabase Client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * Submit Freelancer Registration
 */
export async function registerFreelancer(data: FreelancerRegistrationData) {
  if (!isSupabaseConfigured || !supabase) {
    console.warn(
      '⚠️ Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
    )
    // Simulate API delay for demo/testing without Supabase credentials
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      success: true,
      simulated: true,
      message: 'Registration received in demo mode! Configure Supabase credentials to save directly to database.',
    }
  }

  try {
    const { data: insertedData, error } = await supabase
      .from('freelancer_registrations')
      .insert([
        {
          full_name: data.full_name,
          email: data.email,
          whatsapp_number: data.whatsapp_number,
          city: data.city,
          college_university: data.college_university,
          year_of_study: data.year_of_study,
          age_confirmation: data.age_confirmation,
          primary_skill_category: data.primary_skill_category,
          secondary_skills: data.secondary_skills,
          specific_tools_skills: data.specific_tools_skills,
          portfolio_link: data.portfolio_link || null,
          availability: data.availability,
          experience_level: data.experience_level,
          preferred_contact_method: data.preferred_contact_method,
          how_did_you_hear: data.how_did_you_hear,
          terms_consent: data.terms_consent,
          created_at: new Date().toISOString(),
        },
      ])

    if (error) {
      console.error('Supabase Error (Freelancer):', error)
      if (error.code === 'PGRST301' || error.message?.includes('schema cache')) {
        return {
          success: false,
          error: "Database table 'freelancer_registrations' does not exist in your Supabase project yet. Please run the supabase_setup.sql script in your Supabase SQL Editor to create the tables.",
        }
      }
      if (error.message?.includes('row-level security') || error.code === '42501') {
        return {
          success: false,
          error: "Row Level Security policy is blocking inserts. Please run the updated RLS policy SQL script in your Supabase SQL Editor.",
        }
      }
      throw error
    }

    return { success: true, data: insertedData }
  } catch (err: any) {
    if (err?.message?.includes('schema cache')) {
      return {
        success: false,
        error: "Database table 'freelancer_registrations' does not exist in your Supabase project yet. Please run the supabase_setup.sql script in your Supabase SQL Editor to create the tables.",
      }
    }
    if (err?.message?.includes('row-level security')) {
      return {
        success: false,
        error: "Row Level Security policy is blocking inserts. Please run the updated RLS policy SQL script in your Supabase SQL Editor.",
      }
    }
    return {
      success: false,
      error: err.message || 'An unexpected error occurred during freelancer registration.',
    }
  }
}

/**
 * Submit Client Registration
 */
export async function registerClient(data: ClientRegistrationData) {
  if (!isSupabaseConfigured || !supabase) {
    console.warn(
      '⚠️ Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
    )
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      success: true,
      simulated: true,
      message: 'Client interest registered in demo mode! Configure Supabase credentials to save directly to database.',
    }
  }

  try {
    const { data: insertedData, error } = await supabase
      .from('client_registrations')
      .insert([
        {
          name: data.name,
          business_name: data.business_name || null,
          email_or_whatsapp: data.email_or_whatsapp,
          primary_category_needed: data.primary_category_needed,
          project_description: data.project_description,
          preferred_contact_method: data.preferred_contact_method,
          terms_consent: data.terms_consent,
          created_at: new Date().toISOString(),
        },
      ])

    if (error) {
      console.error('Supabase Error (Client):', error)
      if (error.code === 'PGRST301' || error.message?.includes('schema cache')) {
        return {
          success: false,
          error: "Database table 'client_registrations' does not exist in your Supabase project yet. Please run the supabase_setup.sql script in your Supabase SQL Editor to create the tables.",
        }
      }
      if (error.message?.includes('row-level security') || error.code === '42501') {
        return {
          success: false,
          error: "Row Level Security policy is blocking inserts. Please run the updated RLS policy SQL script in your Supabase SQL Editor.",
        }
      }
      throw error
    }

    return { success: true, data: insertedData }
  } catch (err: any) {
    if (err?.message?.includes('schema cache')) {
      return {
        success: false,
        error: "Database table 'client_registrations' does not exist in your Supabase project yet. Please run the supabase_setup.sql script in your Supabase SQL Editor to create the tables.",
      }
    }
    if (err?.message?.includes('row-level security')) {
      return {
        success: false,
        error: "Row Level Security policy is blocking inserts. Please run the updated RLS policy SQL script in your Supabase SQL Editor.",
      }
    }
    return {
      success: false,
      error: err.message || 'An unexpected error occurred during client registration.',
    }
  }
}
