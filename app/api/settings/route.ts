import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { SiteSettingsModel } from '@/lib/database/models'

export async function GET() {
  try {
    await connectToDatabase()
    
    const settings = await SiteSettingsModel.getSettings()
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    
    // إرجاع إعدادات افتراضية في حالة الخطأ
    const defaultSettings = {
      id: 1,
      site_name: 'اكوام',
      site_logo: '/images/logo.png',
      site_description: 'موقع التحميل والمشاهدة العربي الأول',
      site_keywords: 'أفلام, مسلسلات, اكوام, مشاهدة',
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
    }
    
    return NextResponse.json(defaultSettings)
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    const updatedSettings = await SiteSettingsModel.updateSettings(body)
    
    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}