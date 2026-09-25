/**
 * Smart Validation Helpers for THEUNOiA Registration
 * Catches format errors, domain typos, disposable/temp emails, and phone number errors.
 */

// Common email domain typos mapping -> correct domain
const DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmeil.com': 'gmail.com',
  'gmai.co': 'gmail.com',
  'gmai.in': 'gmail.com',
  'gamil.in': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmali.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'outlok.co': 'outlook.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yaho.co': 'yahoo.com',
  'yaho.in': 'yahoo.in',
  'iclod.com': 'icloud.com',
  'icld.com': 'icloud.com',
  'iclloud.com': 'icloud.com',
  'redifmail.com': 'rediffmail.com',
  'redif.com': 'rediffmail.com',
}

// Known disposable / temp-mail domains list
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com',
  'temp-mail.org',
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.block',
  '10minutemail.com',
  'throwawaymail.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'trashmail.com',
  'trashmail.net',
  'fakeinbox.com',
  'sharklasers.com',
  'dispostable.com',
  'getnada.com',
  'maildrop.cc',
  'crazymailing.com',
  'boun.cr',
  'mailnesia.com',
  'inboxkitten.com',
  'disposablemail.com',
  'mohmal.com',
  'tempmail.net',
  'burnermail.io',
  'generator.email',
  'emailondeck.com',
  'tempail.com',
  'byom.de',
  '0815.ru',
  '10minutemail.co.uk',
  'mytemp.email',
])

export interface ValidationResult {
  isValid: boolean
  error?: string
  suggestion?: string
  cleanedValue?: string
}

/**
 * Validates an email address for format, domain typos, and disposable email providers.
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim().toLowerCase()
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' }
  }

  // Standard RFC 5322 regex check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: "Email format doesn't look real. Please enter a valid email address (e.g. name@example.com)." }
  }

  const parts = trimmed.split('@')
  if (parts.length !== 2) {
    return { isValid: false, error: "Email address doesn't look real." }
  }

  const [, domain] = parts

  // Check for disposable / temporary email domain
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Email doesn't look real. Temporary/disposable emails are not allowed.",
    }
  }

  // Check for common domain typos (e.g. gmial.com)
  if (DOMAIN_TYPOS[domain]) {
    const suggestedDomain = DOMAIN_TYPOS[domain]
    const suggestedEmail = `${parts[0]}@${suggestedDomain}`
    return {
      isValid: false,
      error: `Email domain doesn't look real. Did you mean ${suggestedEmail}?`,
      suggestion: suggestedEmail,
    }
  }

  return { isValid: true, cleanedValue: trimmed }
}

/**
 * Validates a 10-digit phone/WhatsApp number.
 */
export function validatePhoneNumber(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: false, error: 'WhatsApp phone number is required.' }
  }

  // Extract digits only
  let digitsOnly = phone.replace(/\D/g, '')

  // If user included +91 or 91 country code (12 digits starting with 91), strip leading 91
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    digitsOnly = digitsOnly.slice(2)
  }

  // If user typed 0 at the start of 11 digits, strip 0
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    digitsOnly = digitsOnly.slice(1)
  }

  // Must be exactly 10 digits
  if (digitsOnly.length !== 10) {
    return {
      isValid: false,
      error: `Phone number must be exactly 10 digits (currently ${digitsOnly.length} digits).`,
      cleanedValue: digitsOnly,
    }
  }

  // Check for repeated digits like 0000000000, 1111111111, 9999999999
  if (/^(\d)\1{9}$/.test(digitsOnly)) {
    return {
      isValid: false,
      error: "Phone number doesn't look real. Please enter your genuine 10-digit mobile number.",
      cleanedValue: digitsOnly,
    }
  }

  // Mobile numbers in India start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(digitsOnly)) {
    return {
      isValid: false,
      error: "Phone number doesn't look real. Mobile numbers must start with 6, 7, 8, or 9.",
      cleanedValue: digitsOnly,
    }
  }

  return { isValid: true, cleanedValue: digitsOnly }
}

/**
 * Validates Client Contact (accepts either valid 10-digit phone OR valid email).
 */
export function validateClientContact(contact: string): ValidationResult {
  const trimmed = contact.trim()
  if (!trimmed) {
    return { isValid: false, error: 'Email or WhatsApp contact is required.' }
  }

  // If contains @, validate as email
  if (trimmed.includes('@')) {
    return validateEmail(trimmed)
  }

  // Otherwise validate as phone number
  return validatePhoneNumber(trimmed)
}
