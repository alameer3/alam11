'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface SiteSettings {
  id: number
  site_name: string
  site_logo: string
  site_description: string
  site_keywords: string
  social_facebook?: string
  social_twitter?: string
  social_instagram?: string
  social_telegram?: string
  contact_email?: string
  ads_enabled: boolean
  maintenance_mode: boolean
  allow_registration: boolean
  max_users: number
  created_at: string
  updated_at: string
}

interface SiteSettingsContextType {
  settings: SiteSettings | null
  loading: boolean
  error: string | null
  refreshSettings: () => Promise<void>
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined)

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/settings')
      if (!response.ok) {
        throw new Error('Failed to fetch settings')
      }
      
      const data = await response.json()
      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings')
      
      // استخدام إعدادات افتراضية في حالة الخطأ
      setSettings({
        id: 1,
        site_name: '𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗',
        site_logo: '/images/logo.png',
        site_description: 'موقع التحميل والمشاهدة العربي الأول',
        site_keywords: 'أفلام, مسلسلات, 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗, مشاهدة',
        social_facebook: '',
        social_twitter: '',
        social_instagram: '',
        social_telegram: '',
        contact_email: '',
        ads_enabled: true,
        maintenance_mode: false,
        allow_registration: true,
        max_users: 10000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshSettings()
  }, [])

  const value: SiteSettingsContextType = {
    settings,
    loading,
    error,
    refreshSettings
  }

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}

export type { SiteSettings }