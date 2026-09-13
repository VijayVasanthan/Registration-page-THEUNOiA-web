import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'hunr — Bharat\'s student-first freelancing platform | THEUNOiA',
  description: 'THEUNOiA\'s talent-meets-opportunity platform. AI-powered freelance matching for verified student talent.',
}

export default function HunrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
