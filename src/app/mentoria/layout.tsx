import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentoria | THEUNOiA',
  description: 'Connect with industry mentors who\'ve walked the path.',
}

export default function MentoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
