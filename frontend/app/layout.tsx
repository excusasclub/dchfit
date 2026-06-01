import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "dchfit",
  description: "registro personal de salud y deporte",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}