"use client"

import { useState, useEffect } from 'react'

interface SafeClientWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function SafeClientWrapper({ children, fallback = null }: SafeClientWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}