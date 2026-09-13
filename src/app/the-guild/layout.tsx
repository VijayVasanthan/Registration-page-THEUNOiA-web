import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Guild | THEUNOiA',
  description: 'THEUNOiA\'s on-ground initiative bridging talent, industry, and community across India.',
}

export default function TheGuildLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
