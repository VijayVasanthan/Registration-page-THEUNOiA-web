export const BRAND = {
  name: "THEUNOiA",
  tagline: "Independence starts here.",
  description:
    "Bharat's student-first freelance ecosystem. Where beautiful thinking finds its ocean.",
  mascot: "Luna",
  pronunciation: "the-yoo-NOY-uh",
} as const;

export const SECTIONS = [
  { id: "hero", label: "Surface" },
  { id: "behind-name", label: "Descending" },
  { id: "ocean-theory", label: "The Deep" },
  { id: "pillars", label: "The Deep" },
  { id: "stats", label: "Rising" },
  { id: "team-teaser", label: "Rising" },
  { id: "cta", label: "Shoreline" },
] as const;

export const NAV_LINKS = [
  { label: "hunr", href: "/hunr" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "CONNECT", href: "/connect" },
  { label: "Team", href: "#team-teaser" },
  { label: "Get Started", href: "#cta" },
] as const;

export const CONNECT_CITIES = [
  "Nagpur",
  "Bengaluru",
  "Mumbai",
  "Raipur",
  "Coimbatore",
  "Bhubaneswar",
] as const;

export const STATS = [
  { value: 72, suffix: "%", label: "Freelance economy growth, India" },
  { value: 6, suffix: "", label: "CONNECT chapter cities" },
  { value: 1000, suffix: "+", label: "Individuals reached by CONNECT" },
  { value: 18, suffix: "–25", label: "hunr target age range" },
] as const;

export const PILLARS = [
  {
    title: "hunr",
    description:
      "Bharat's student-first freelancing platform. AI-assisted skill verification and flexible bidding — talent judged on capability, not certificates alone.",
    link: { label: "Explore hunr →", href: "/hunr" },
    icon: "skillbridge" as const,
  },
  {
    title: "Mentorship",
    description:
      "Not lectures — guidance. Mentors who've walked the path, helping students build direction, confidence, and their first real opportunities.",
    link: { label: "Meet the mentors →", href: "/mentorship" },
    icon: "mentorship" as const,
  },
  {
    title: "CONNECT",
    description:
      "Our on-ground initiative across Nagpur, Bengaluru, Mumbai, Raipur, Coimbatore, and Bhubaneswar — bridging talent, industry, and community.",
    link: { label: "Find your city →", href: "/connect" },
    icon: "connect" as const,
  },
] as const;
