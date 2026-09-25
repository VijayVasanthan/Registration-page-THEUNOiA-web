// Shared Categories for both Freelancers and Clients (Locked list of 7-8 categories)
export const SHARED_SKILL_CATEGORIES = [
  "UI/UX & Product Design",
  "Web & App Development",
  "Content & Copywriting",
  "Graphic Design & Branding",
  "Video Editing & Motion",
  "Digital Marketing & SEO",
  "Data & AI Solutions",
  "Operations & Virtual Support",
] as const

// Shared Guild Cities
export const REGISTRATION_CITIES = [
  "Nagpur",
  "Bengaluru",
  "Mumbai",
  "Raipur",
  "Coimbatore",
  "Bhubaneswar",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Other",
] as const

// Academic Years
export const YEAR_OF_STUDY_OPTIONS = [
  "1st Year (Undergrad)",
  "2nd Year (Undergrad)",
  "3rd Year (Undergrad)",
  "4th Year (Undergrad)",
  "Postgraduate",
  "Recent Graduate",
] as const

// Availability Options
export const AVAILABILITY_OPTIONS = [
  "< 5 hrs/week",
  "5–10 hrs/week",
  "10–20 hrs/week",
  "20+ hrs/week",
] as const

// Experience Level Options
export const EXPERIENCE_LEVEL_OPTIONS = [
  { id: "beginner", label: "Beginner", description: "Learning skills & ready for first real projects" },
  { id: "intermediate", label: "Intermediate", description: "1-2 years experience with portfolio samples" },
  { id: "advanced", label: "Advanced", description: "Pro level skills with verified client deliverables" },
] as const

// Preferred Contact Method Options
export const CONTACT_METHOD_OPTIONS = [
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "email", label: "Email", icon: "✉️" },
  { id: "phone", label: "Phone Call", icon: "📞" },
] as const

// How did you hear about us Options
export const MARKETING_SOURCE_OPTIONS = [
  "Social Media (Instagram / LinkedIn / X)",
  "Campus Guild / College Ambassador",
  "Friend or Peer Referral",
  "College Event or Workshop",
  "Search Engine / Online",
  "Other",
] as const

// Popular secondary skills by category for quick tag selection
export const SUGGESTED_SECONDARY_SKILLS = [
  "Figma",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Premiere Pro",
  "After Effects",
  "Illustrator",
  "Photoshop",
  "Copywriting",
  "SEO",
  "Social Media",
  "Canva",
  "TypeScript",
  "Flutter",
] as const
