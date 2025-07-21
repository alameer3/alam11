"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface ClientOnlySessionProps {
  children: (session: Session | null, loading: boolean) => React.ReactNode
}

export function ClientOnlySession({ children }: ClientOnlySessionProps) {
  const [mounted, setMounted] = useState(false)
  const { data: session, status } = useSession()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return children(null, true)
  }

  return children(session, status === 'loading')
}