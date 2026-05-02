import './globals.css'

export const metadata = {
  title: '/GREEN — Project Bootstrap Workflow',
  description: 'Greenfield project framework for Claude Code.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
