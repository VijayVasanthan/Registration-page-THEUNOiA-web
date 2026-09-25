'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LogoAnimated from '@/components/ui/LogoAnimated'
import {
  SHARED_SKILL_CATEGORIES,
  REGISTRATION_CITIES,
  YEAR_OF_STUDY_OPTIONS,
  AVAILABILITY_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  MARKETING_SOURCE_OPTIONS,
  SUGGESTED_SECONDARY_SKILLS,
} from '@/lib/registrationConstants'
import {
  registerFreelancer,
  registerClient,
  isSupabaseConfigured,
  FreelancerRegistrationData,
  ClientRegistrationData,
} from '@/lib/supabase'
import {
  validateEmail,
  validatePhoneNumber,
  validateClientContact,
  ValidationResult,
} from '@/lib/validation'

export default function RegisterPage() {
  // Active Form Tab: 'freelancer' | 'client'
  const [activeTab, setActiveTab] = useState<'freelancer' | 'client'>('freelancer')

  // Smart Validation States
  const [emailValidation, setEmailValidation] = useState<ValidationResult | null>(null)
  const [phoneValidation, setPhoneValidation] = useState<ValidationResult | null>(null)
  const [clientContactValidation, setClientContactValidation] = useState<ValidationResult | null>(null)

  // Check URL query param on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const roleParam = params.get('role')
      if (roleParam === 'client') {
        setActiveTab('client')
      } else if (roleParam === 'freelancer') {
        setActiveTab('freelancer')
      }
    }
  }, [])

  // ---------------- Freelancer Form State ----------------
  const [freelancerData, setFreelancerData] = useState<FreelancerRegistrationData>({
    full_name: '',
    email: '',
    whatsapp_number: '',
    city: 'Nagpur',
    college_university: '',
    year_of_study: '1st Year (Undergrad)',
    age_confirmation: false,
    primary_skill_category: SHARED_SKILL_CATEGORIES[0],
    secondary_skills: [],
    specific_tools_skills: '',
    portfolio_link: '',
    availability: AVAILABILITY_OPTIONS[1], // 5–10 hrs/week
    experience_level: 'beginner',
    preferred_contact_method: 'whatsapp',
    how_did_you_hear: MARKETING_SOURCE_OPTIONS[0],
    terms_consent: false,
  })
  const [customCity, setCustomCity] = useState('')

  // ---------------- Client Form State ----------------
  const [clientData, setClientData] = useState<ClientRegistrationData>({
    name: '',
    business_name: '',
    email_or_whatsapp: '',
    primary_category_needed: SHARED_SKILL_CATEGORIES[0],
    project_description: '',
    preferred_contact_method: 'whatsapp',
    terms_consent: false,
  })

  // ---------------- UI & Submission State ----------------
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successModal, setSuccessModal] = useState<{
    show: boolean
    message: string
    isSimulated?: boolean
    role: 'freelancer' | 'client'
  }>({ show: false, message: '', role: 'freelancer' })

  // Secondary skills toggle helper
  const handleSecondarySkillToggle = (skill: string) => {
    setFreelancerData((prev) => {
      const exists = prev.secondary_skills.includes(skill)
      if (exists) {
        return {
          ...prev,
          secondary_skills: prev.secondary_skills.filter((s) => s !== skill),
        }
      } else {
        return {
          ...prev,
          secondary_skills: [...prev.secondary_skills, skill],
        }
      }
    })
  }

  // Submit Freelancer Registration
  const handleFreelancerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Basic Validation
    if (!freelancerData.full_name.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }

    // Smart Email Validation
    const emailRes = validateEmail(freelancerData.email)
    setEmailValidation(emailRes)
    if (!emailRes.isValid) {
      setErrorMessage(emailRes.error || 'Please enter a valid email address.')
      return
    }

    // Smart Phone Validation (exactly 10 digits)
    const phoneRes = validatePhoneNumber(freelancerData.whatsapp_number)
    setPhoneValidation(phoneRes)
    if (!phoneRes.isValid) {
      setErrorMessage(phoneRes.error || 'Please enter a valid 10-digit WhatsApp number.')
      return
    }

    if (!freelancerData.college_university.trim()) {
      setErrorMessage('Please specify your College or University.')
      return
    }
    if (!freelancerData.age_confirmation) {
      setErrorMessage('Please confirm your age criteria (18–25).')
      return
    }
    if (!freelancerData.terms_consent) {
      setErrorMessage('You must accept the terms and community consent guidelines.')
      return
    }

    const payload: FreelancerRegistrationData = {
      ...freelancerData,
      email: emailRes.cleanedValue || freelancerData.email.trim(),
      whatsapp_number: phoneRes.cleanedValue || freelancerData.whatsapp_number,
      city: freelancerData.city === 'Other' ? (customCity.trim() || 'Other') : freelancerData.city,
    }

    setIsSubmitting(true)
    const res = await registerFreelancer(payload)
    setIsSubmitting(false)

    if (res.success) {
      setSuccessModal({
        show: true,
        message: res.message || 'Thank you for registering with THEUNOiA! Our intake team will review your profile and reach out to you shortly.',
        isSimulated: res.simulated,
        role: 'freelancer',
      })
    } else {
      setErrorMessage(res.error || 'Failed to submit registration. Please try again.')
    }
  }

  // Submit Client Registration
  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!clientData.name.trim()) {
      setErrorMessage('Please enter your name.')
      return
    }

    // Smart Client Contact Validation (Email or 10-digit Phone)
    const contactRes = validateClientContact(clientData.email_or_whatsapp)
    setClientContactValidation(contactRes)
    if (!contactRes.isValid) {
      setErrorMessage(contactRes.error || 'Please enter a valid Email or 10-digit WhatsApp number.')
      return
    }

    if (!clientData.project_description.trim()) {
      setErrorMessage('Please provide a brief description of what you need done.')
      return
    }
    if (!clientData.terms_consent) {
      setErrorMessage('You must accept the terms & consent.')
      return
    }

    const payload: ClientRegistrationData = {
      ...clientData,
      email_or_whatsapp: contactRes.cleanedValue || clientData.email_or_whatsapp.trim(),
    }

    setIsSubmitting(true)
    const res = await registerClient(payload)
    setIsSubmitting(false)

    if (res.success) {
      setSuccessModal({
        show: true,
        message: res.message || 'Your project request has been logged! A member of the THEUNOiA intake team will reach out to understand your requirement and match top talent.',
        isSimulated: res.simulated,
        role: 'client',
      })
    } else {
      setErrorMessage(res.error || 'Failed to submit request. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0118] text-white selection:bg-purple-500/30 relative overflow-hidden font-body">
      {/* Visual Ambient Glowing Background Orbs */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-purple-800/30 via-fuchsia-600/20 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-900/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] left-[-150px] w-[400px] h-[400px] bg-fuchsia-900/15 blur-[130px] pointer-events-none rounded-full" />

      {/* Navigation Header */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <LogoAnimated variant="secondary" />
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="text-xs font-medium text-purple-200/80 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-purple-500/20 rounded-full px-4 py-2 flex items-center gap-1.5"
          >
            About Ecosystem →
          </Link>
        </div>
      </nav>

      {/* Hero Header Section (Directly aligned with screenshot aesthetics) */}
      <header className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-6 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-pink-400 drop-shadow-[0_0_25px_rgba(217,70,239,0.4)]">Revolution</span>
        </h1>
        <p className="text-lg sm:text-xl font-medium text-purple-200/90 mb-3 tracking-wide">
          THEUNOiA isn&apos;t just a Webapp — it&apos;s a mindset.
        </p>
        <p className="text-sm sm:text-base text-purple-300/70 max-w-xl mx-auto mb-4 leading-relaxed">
          A calm, human space where tasks meet solvers and everyday problems turn into opportunities.
        </p>
        <p className="text-xs sm:text-sm text-purple-300/60 max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re posting work or picking it up, THEUNOiA makes the process effortless, ethical, and beautifully simple.
        </p>

        {/* Role Toggle Pills (Styled exactly like the screenshot design) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab('freelancer')
              setErrorMessage(null)
            }}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'freelancer'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-purple-300/40 scale-[1.03]'
                : 'bg-purple-950/40 text-purple-300/70 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
            }`}
          >
            Freelancer Registration
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('client')
              setErrorMessage(null)
            }}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'client'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-purple-300/40 scale-[1.03]'
                : 'bg-purple-950/40 text-purple-300/70 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
            }`}
          >
            Client Registration
          </button>
        </div>

        {/* Supabase connection indicator badge */}
        <div className="mt-4 flex justify-center items-center">
          <span
            className={`text-[11px] px-3 py-1 rounded-full border flex items-center gap-1.5 ${
              isSupabaseConfigured
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            {isSupabaseConfigured ? 'Connected to Supabase Database' : 'Database Ready (Supabase Config Pending)'}
          </span>
        </div>
      </header>

      {/* Main Registration Form Area */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 pb-20">
        <div className="bg-[#150426]/70 backdrop-blur-2xl border border-purple-500/25 rounded-3xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center gap-3">
              <span className="text-lg">⚠️</span>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* =========================================================================
              FREELANCER REGISTRATION FORM (STUDENT)
             ========================================================================= */}
          {activeTab === 'freelancer' && (
            <form onSubmit={handleFreelancerSubmit} className="space-y-8">
              <div>
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400">Student & Freelancer Intake</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Full Registration Form</h2>
                  </div>
                  <span className="text-xs text-purple-300/60 bg-purple-900/30 px-3 py-1.5 rounded-lg border border-purple-500/20">
                    Step 1 of 1
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-purple-300/70 mb-6">
                  Students are actively seeking work. Fill in your skills and availability so our intake engine can match you with client projects.
                </p>
              </div>

              {/* Personal Details Group */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wider text-opacity-80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-400" /> Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Full Name <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={freelancerData.full_name}
                      onChange={(e) => setFreelancerData({ ...freelancerData, full_name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Email Address <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav@college.edu.in"
                      value={freelancerData.email}
                      onChange={(e) => {
                        const val = e.target.value
                        setFreelancerData({ ...freelancerData, email: val })
                        if (val.trim()) {
                          setEmailValidation(validateEmail(val))
                        } else {
                          setEmailValidation(null)
                        }
                      }}
                      onBlur={() => {
                        if (freelancerData.email.trim()) {
                          setEmailValidation(validateEmail(freelancerData.email))
                        }
                      }}
                      className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all ${
                        emailValidation && !emailValidation.isValid
                          ? 'border-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
                          : 'border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20'
                      }`}
                    />
                    {emailValidation && !emailValidation.isValid && (
                      <div className="mt-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span>⚠️</span> <span>{emailValidation.error}</span>
                        </div>
                        {emailValidation.suggestion && (
                          <button
                            type="button"
                            onClick={() => {
                              if (emailValidation.suggestion) {
                                setFreelancerData({ ...freelancerData, email: emailValidation.suggestion })
                                setEmailValidation(validateEmail(emailValidation.suggestion))
                              }
                            }}
                            className="text-left text-[11px] underline text-fuchsia-300 hover:text-white font-mono cursor-pointer mt-0.5"
                          >
                            💡 Fix to: {emailValidation.suggestion}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* WhatsApp Number with +91 Prefix */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      WhatsApp Number <span className="text-fuchsia-400">*</span>
                    </label>
                    <div className={`flex rounded-xl overflow-hidden border transition-all ${
                      phoneValidation && !phoneValidation.isValid
                        ? 'border-amber-400 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20'
                        : 'border-purple-500/25 focus-within:border-fuchsia-400 focus-within:ring-2 focus-within:ring-fuchsia-500/20'
                    }`}>
                      <span className="bg-purple-950/80 px-3.5 py-3 text-sm text-purple-300 font-mono flex items-center border-r border-purple-500/20">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={freelancerData.whatsapp_number}
                        onChange={(e) => {
                          const val = e.target.value
                          setFreelancerData({ ...freelancerData, whatsapp_number: val })
                          if (val.trim()) {
                            setPhoneValidation(validatePhoneNumber(val))
                          } else {
                            setPhoneValidation(null)
                          }
                        }}
                        onBlur={() => {
                          if (freelancerData.whatsapp_number.trim()) {
                            setPhoneValidation(validatePhoneNumber(freelancerData.whatsapp_number))
                          }
                        }}
                        className="w-full bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none"
                      />
                    </div>
                    {phoneValidation && !phoneValidation.isValid && (
                      <div className="mt-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 flex items-center gap-1.5 font-medium">
                        <span>⚠️</span> <span>{phoneValidation.error}</span>
                      </div>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      City <span className="text-fuchsia-400">*</span>
                    </label>
                    <select
                      value={freelancerData.city}
                      onChange={(e) => setFreelancerData({ ...freelancerData, city: e.target.value })}
                      className="w-full bg-[#1b0633] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer"
                    >
                      {REGISTRATION_CITIES.map((c) => (
                        <option key={c} value={c} className="bg-[#1b0633] text-white">
                          {c}
                        </option>
                      ))}
                    </select>

                    {freelancerData.city === 'Other' && (
                      <input
                        type="text"
                        placeholder="Specify your city name"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        className="mt-2.5 w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-300/30 outline-none"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* College / University */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      College / University <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VNIT Nagpur / IIT Bombay"
                      value={freelancerData.college_university}
                      onChange={(e) => setFreelancerData({ ...freelancerData, college_university: e.target.value })}
                      className="w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all"
                    />
                  </div>

                  {/* Year of Study */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Year of Study <span className="text-fuchsia-400">*</span>
                    </label>
                    <select
                      value={freelancerData.year_of_study}
                      onChange={(e) => setFreelancerData({ ...freelancerData, year_of_study: e.target.value })}
                      className="w-full bg-[#1b0633] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer"
                    >
                      {YEAR_OF_STUDY_OPTIONS.map((y) => (
                        <option key={y} value={y} className="bg-[#1b0633] text-white">
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Age Confirmation Checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={freelancerData.age_confirmation}
                      onChange={(e) => setFreelancerData({ ...freelancerData, age_confirmation: e.target.checked })}
                      className="w-4 h-4 rounded border-purple-500/40 text-fuchsia-600 focus:ring-fuchsia-500/40 bg-purple-950 accent-fuchsia-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-purple-200/90 group-hover:text-white transition-colors">
                      I confirm I am between 18–25 years old <span className="text-fuchsia-400">*</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Skills & Matching Section */}
              <div className="space-y-5 border-t border-purple-500/20 pt-6">
                <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wider text-opacity-80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-400" /> Skills & Matching Profile
                </h3>

                {/* Primary Skill Category (Required single select) */}
                <div>
                  <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                    Primary Skill Category <span className="text-fuchsia-400">*</span>
                  </label>
                  <select
                    value={freelancerData.primary_skill_category}
                    onChange={(e) => setFreelancerData({ ...freelancerData, primary_skill_category: e.target.value })}
                    className="w-full bg-[#1b0633] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer font-medium"
                  >
                    {SHARED_SKILL_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#1b0633] text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-purple-300/50 mt-1">
                    Matching runs on this locked list so clients and intake agents can filter instantly.
                  </p>
                </div>

                {/* Secondary Skills Tag Select */}
                <div>
                  <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                    Secondary Skills / Tags <span className="text-purple-400/60">(Select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTED_SECONDARY_SKILLS.map((skill) => {
                      const active = freelancerData.secondary_skills.includes(skill)
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSecondarySkillToggle(skill)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                            active
                              ? 'bg-fuchsia-600/30 border-fuchsia-400 text-fuchsia-200 font-medium shadow-[0_0_10px_rgba(217,70,239,0.3)]'
                              : 'bg-white/[0.03] border-purple-500/20 text-purple-300/70 hover:border-purple-400/40 hover:text-white'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {skill}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Specific tools / skills text input */}
                <div>
                  <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                    Specific Tools & Software
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Figma, Framer, React.js, Adobe Premiere Pro, VS Code"
                    value={freelancerData.specific_tools_skills}
                    onChange={(e) => setFreelancerData({ ...freelancerData, specific_tools_skills: e.target.value })}
                    className="w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all"
                  />
                </div>

                {/* Portfolio Link */}
                <div>
                  <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                    Portfolio Link / GitHub / Drive <span className="text-purple-400/60">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://behance.net/yourname or https://github.com/yourname"
                    value={freelancerData.portfolio_link}
                    onChange={(e) => setFreelancerData({ ...freelancerData, portfolio_link: e.target.value })}
                    className="w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Availability */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Weekly Availability <span className="text-fuchsia-400">*</span>
                    </label>
                    <select
                      value={freelancerData.availability}
                      onChange={(e) => setFreelancerData({ ...freelancerData, availability: e.target.value })}
                      className="w-full bg-[#1b0633] border border-purple-500/25 focus:border-fuchsia-400 rounded-xl px-4 py-3 text-sm text-white outline-none cursor-pointer"
                    >
                      {AVAILABILITY_OPTIONS.map((a) => (
                        <option key={a} value={a} className="bg-[#1b0633] text-white">
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Experience Level <span className="text-fuchsia-400">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {EXPERIENCE_LEVEL_OPTIONS.map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setFreelancerData({ ...freelancerData, experience_level: lvl.id })}
                          className={`py-2.5 px-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                            freelancerData.experience_level === lvl.id
                              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                              : 'bg-white/[0.03] border-purple-500/20 text-purple-300/70 hover:text-white'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Preference & Consent Section */}
              <div className="space-y-5 border-t border-purple-500/20 pt-6">
                <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wider text-opacity-80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-400" /> Preferences & Consent
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-2">
                      Preferred Contact Method <span className="text-fuchsia-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      {CONTACT_METHOD_OPTIONS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setFreelancerData({ ...freelancerData, preferred_contact_method: m.id })}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            freelancerData.preferred_contact_method === m.id
                              ? 'bg-fuchsia-600/30 border-fuchsia-400 text-white shadow-[0_0_10px_rgba(217,70,239,0.3)]'
                              : 'bg-white/[0.03] border-purple-500/20 text-purple-300/70 hover:text-white'
                          }`}
                        >
                          <span>{m.icon}</span>
                          <span>{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      How did you hear about us?
                    </label>
                    <select
                      value={freelancerData.how_did_you_hear}
                      onChange={(e) => setFreelancerData({ ...freelancerData, how_did_you_hear: e.target.value })}
                      className="w-full bg-[#1b0633] border border-purple-500/25 focus:border-fuchsia-400 rounded-xl px-4 py-3 text-sm text-white outline-none cursor-pointer"
                    >
                      {MARKETING_SOURCE_OPTIONS.map((src) => (
                        <option key={src} value={src} className="bg-[#1b0633] text-white">
                          {src}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={freelancerData.terms_consent}
                      onChange={(e) => setFreelancerData({ ...freelancerData, terms_consent: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-purple-500/40 text-fuchsia-600 focus:ring-fuchsia-500/40 bg-purple-950 accent-fuchsia-500 cursor-pointer"
                    />
                    <span className="text-xs text-purple-200/80 group-hover:text-white transition-colors leading-relaxed">
                      I agree to THEUNOiA&apos;s community ethics guidelines & terms. I confirm my details are accurate for matching with verified clients. <span className="text-fuchsia-400">*</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white font-semibold text-base shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] border border-purple-300/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Student Profile...
                    </>
                  ) : (
                    <>Complete Freelancer Registration →</>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              CLIENT REGISTRATION FORM ("QUICK INTEREST")
             ========================================================================= */}
          {activeTab === 'client' && (
            <form onSubmit={handleClientSubmit} className="space-y-8">
              <div>
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400">Client Quick Interest Intake</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Tell Us What You Need</h2>
                  </div>
                  <span className="text-xs text-fuchsia-300 bg-fuchsia-950/60 px-3 py-1.5 rounded-lg border border-fuchsia-500/30">
                    Low-Friction Brief
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-purple-300/70 mb-4">
                  A lighter ask — post your project idea or immediate requirement. Our intake team will get back to you via your preferred channel to discuss details, scope, and matches.
                </p>

                {/* Callout box describing Pilot vs Post-Launch phase */}
                <div className="p-4 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-purple-200/90 text-xs leading-relaxed space-y-1.5">
                  <div className="font-semibold text-fuchsia-300 flex items-center gap-2">
                    <span>⚡ Fast-Track Matching</span>
                  </div>
                  <p>
                    No lengthy budget forms upfront. Share a brief summary of what you need done, and we&apos;ll match you with top verified student talent from Bharat&apos;s premier universities.
                  </p>
                </div>
              </div>

              {/* Client Form Fields */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Your Name <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Mehta"
                      value={clientData.name}
                      onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all"
                    />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Business or Startup Name <span className="text-purple-400/60">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Studio Vertex / Freelance Client"
                      value={clientData.business_name}
                      onChange={(e) => setClientData({ ...clientData, business_name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email or WhatsApp */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Email or WhatsApp Contact <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="priya@startup.com or 9876543210"
                      value={clientData.email_or_whatsapp}
                      onChange={(e) => {
                        const val = e.target.value
                        setClientData({ ...clientData, email_or_whatsapp: val })
                        if (val.trim()) {
                          setClientContactValidation(validateClientContact(val))
                        } else {
                          setClientContactValidation(null)
                        }
                      }}
                      onBlur={() => {
                        if (clientData.email_or_whatsapp.trim()) {
                          setClientContactValidation(validateClientContact(clientData.email_or_whatsapp))
                        }
                      }}
                      className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all ${
                        clientContactValidation && !clientContactValidation.isValid
                          ? 'border-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
                          : 'border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20'
                      }`}
                    />
                    {clientContactValidation && !clientContactValidation.isValid && (
                      <div className="mt-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span>⚠️</span> <span>{clientContactValidation.error}</span>
                        </div>
                        {clientContactValidation.suggestion && (
                          <button
                            type="button"
                            onClick={() => {
                              if (clientContactValidation.suggestion) {
                                setClientData({ ...clientData, email_or_whatsapp: clientContactValidation.suggestion })
                                setClientContactValidation(validateClientContact(clientContactValidation.suggestion))
                              }
                            }}
                            className="text-left text-[11px] underline text-fuchsia-300 hover:text-white font-mono cursor-pointer mt-0.5"
                          >
                            💡 Fix to: {clientContactValidation.suggestion}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Primary Service / Category Needed */}
                  <div>
                    <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                      Primary Service Category Needed <span className="text-fuchsia-400">*</span>
                    </label>
                    <select
                      value={clientData.primary_category_needed}
                      onChange={(e) => setClientData({ ...clientData, primary_category_needed: e.target.value })}
                      className="w-full bg-[#1b0633] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer font-medium"
                    >
                      {SHARED_SKILL_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#1b0633] text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* One line / Brief Requirement */}
                <div>
                  <label className="block text-xs font-medium text-purple-200/90 mb-1.5">
                    What do you need done? <span className="text-fuchsia-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="e.g. Need a mobile app landing page in Figma + Next.js code within 2 weeks for our AI SaaS."
                    value={clientData.project_description}
                    onChange={(e) => setClientData({ ...clientData, project_description: e.target.value })}
                    className="w-full bg-white/[0.04] border border-purple-500/25 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 outline-none transition-all resize-none"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-medium text-purple-200/90 mb-2">
                    Preferred Contact Method for Outreach <span className="text-fuchsia-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {CONTACT_METHOD_OPTIONS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setClientData({ ...clientData, preferred_contact_method: m.id })}
                        className={`py-3 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          clientData.preferred_contact_method === m.id
                            ? 'bg-fuchsia-600/30 border-fuchsia-400 text-white shadow-[0_0_12px_rgba(217,70,239,0.3)]'
                            : 'bg-white/[0.03] border-purple-500/20 text-purple-300/70 hover:text-white'
                        }`}
                      >
                        <span>{m.icon}</span>
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={clientData.terms_consent}
                      onChange={(e) => setClientData({ ...clientData, terms_consent: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-purple-500/40 text-fuchsia-600 focus:ring-fuchsia-500/40 bg-purple-950 accent-fuchsia-500 cursor-pointer"
                    />
                    <span className="text-xs text-purple-200/80 group-hover:text-white transition-colors leading-relaxed">
                      I agree to THEUNOiA&apos;s intake terms and consent to being contacted regarding my project request. <span className="text-fuchsia-400">*</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white font-semibold text-base shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] border border-purple-300/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging Client Requirement...
                    </>
                  ) : (
                    <>Submit Client Interest Request →</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Success Modal Notification */}
      {successModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1a0530] border border-fuchsia-500/40 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(168,85,247,0.5)] text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-[0_0_20px_rgba(217,70,239,0.5)]">
              ✨
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Registration Received!</h3>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed mb-6">
              {successModal.message}
            </p>

            {successModal.isSimulated && (
              <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] text-left">
                💡 <strong>Demo Note:</strong> Supabase environment variables are currently pending. This test submission succeeded in demo mode! You can view SQL setup instructions in <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-amber-300">supabase_setup.sql</code>.
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setSuccessModal({ show: false, message: '', role: 'freelancer' })
                  // Reset forms
                  setFreelancerData({
                    full_name: '',
                    email: '',
                    whatsapp_number: '',
                    city: 'Nagpur',
                    college_university: '',
                    year_of_study: '1st Year (Undergrad)',
                    age_confirmation: false,
                    primary_skill_category: SHARED_SKILL_CATEGORIES[0],
                    secondary_skills: [],
                    specific_tools_skills: '',
                    portfolio_link: '',
                    availability: AVAILABILITY_OPTIONS[1],
                    experience_level: 'beginner',
                    preferred_contact_method: 'whatsapp',
                    how_did_you_hear: MARKETING_SOURCE_OPTIONS[0],
                    terms_consent: false,
                  })
                  setClientData({
                    name: '',
                    business_name: '',
                    email_or_whatsapp: '',
                    primary_category_needed: SHARED_SKILL_CATEGORIES[0],
                    project_description: '',
                    preferred_contact_method: 'whatsapp',
                    terms_consent: false,
                  })
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:brightness-110 cursor-pointer"
              >
                Register Another Response
              </button>

              <Link
                href="/about"
                className="w-full py-3 rounded-xl bg-white/5 border border-purple-500/20 text-purple-200 text-xs font-medium hover:bg-white/10 text-center no-underline"
              >
                Explore Ecosystem Overview →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
