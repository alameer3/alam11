"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <div className={mounted ? '' : 'opacity-0'}>
          {children}
        </div>
      </SessionProvider>
    </ThemeProvider>
  )
}