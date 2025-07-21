"use client"

import { useEffect, useState } from 'react'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'

export function ClientLayout() {
  const [isClient, setIsClient] = useState(false)
  const [isStaticLayoutHidden, setIsStaticLayoutHidden] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !isStaticLayoutHidden) {
      // Hide static layout after client mounts safely
      const staticLayout = document.querySelector('.static-layout') as HTMLElement
      if (staticLayout) {
        staticLayout.style.display = 'none'
        setIsStaticLayoutHidden(true)
      }
    }
  }, [isClient, isStaticLayoutHidden])

  if (!isClient) {
    return null
  }

  return (
    <div className="client-layout">
      <MainHeader />
      <MainMenu />
    </div>
  )
}