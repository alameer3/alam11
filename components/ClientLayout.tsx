"use client"

import dynamic from 'next/dynamic'

const MainHeader = dynamic(() => import('@/components/layout/main-header').then(mod => ({ default: mod.MainHeader })), {
  ssr: false,
  loading: () => (
    <header className="main-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h2 className="main-logo m-0">
              <a href="/" className="inline-flex">
                <img src="/logo.svg" alt="YEMEN FLIX" style={{ height: '40px' }} />
              </a>
            </h2>
          </div>
        </div>
      </div>
    </header>
  )
})

const MainMenu = dynamic(() => import('@/components/layout/main-menu').then(mod => ({ default: mod.MainMenu })), {
  ssr: false
})

export function ClientLayout() {
  return (
    <>
      <MainHeader />
      <MainMenu />
    </>
  )
}