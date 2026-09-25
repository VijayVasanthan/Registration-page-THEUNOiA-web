-- =============================================================================
-- THEUNOiA SUPABASE DATABASE SCHEMA SETUP
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- =============================================================================

-- 1. FREELANCER REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.freelancer_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    city TEXT NOT NULL,
    college_university TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    age_confirmation BOOLEAN NOT NULL DEFAULT FALSE,
    primary_skill_category TEXT NOT NULL,
    secondary_skills TEXT[] DEFAULT '{}',
    specific_tools_skills TEXT,
    portfolio_link TEXT,
    availability TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    preferred_contact_method TEXT NOT NULL,
    how_did_you_hear TEXT NOT NULL,
    terms_consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CLIENT REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.client_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    business_name TEXT,
    email_or_whatsapp TEXT NOT NULL,
    primary_category_needed TEXT NOT NULL,
    project_description TEXT NOT NULL,
    preferred_contact_method TEXT NOT NULL,
    terms_consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. INDEXES FOR FAST MATCHING & SEARCHING
CREATE INDEX IF NOT EXISTS idx_freelancers_email ON public.freelancer_registrations(email);
CREATE INDEX IF NOT EXISTS idx_freelancers_category ON public.freelancer_registrations(primary_skill_category);
CREATE INDEX IF NOT EXISTS idx_freelancers_city ON public.freelancer_registrations(city);
CREATE INDEX IF NOT EXISTS idx_clients_category ON public.client_registrations(primary_category_needed);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.freelancer_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to avoid duplication conflicts
DROP POLICY IF EXISTS "Allow public insert for freelancer registrations" ON public.freelancer_registrations;
DROP POLICY IF EXISTS "Allow public select for freelancer registrations" ON public.freelancer_registrations;
DROP POLICY IF EXISTS "Allow public insert for client registrations" ON public.client_registrations;
DROP POLICY IF EXISTS "Allow public select for client registrations" ON public.client_registrations;
DROP POLICY IF EXISTS "Allow public all for freelancer registrations" ON public.freelancer_registrations;
DROP POLICY IF EXISTS "Allow public all for client registrations" ON public.client_registrations;

-- Create permissive public policies for INSERT and SELECT
CREATE POLICY "Allow public insert for freelancer registrations" 
ON public.freelancer_registrations 
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public select for freelancer registrations" 
ON public.freelancer_registrations 
FOR SELECT 
TO public, anon, authenticated
USING (true);

CREATE POLICY "Allow public insert for client registrations" 
ON public.client_registrations 
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public select for client registrations" 
ON public.client_registrations 
FOR SELECT 
TO public, anon, authenticated
USING (true);
