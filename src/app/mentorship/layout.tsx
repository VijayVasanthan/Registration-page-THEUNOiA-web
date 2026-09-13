import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentorship | THEUNOiA',
  description: 'Connect with industry mentors who\'ve walked the path.',
}

export default function MentorshipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
