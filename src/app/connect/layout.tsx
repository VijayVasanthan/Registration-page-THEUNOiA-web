import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CONNECT | THEUNOiA',
  description: 'THEUNOiA\'s on-ground initiative bridging talent, industry, and community across India.',
}

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
