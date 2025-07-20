import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'اكوام | موقع التحميل و المشاهدة العربي الاول',
  description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
  keywords: 'أفلام,مسلسلات,حلقات,مصارعة,برامج,العاب,مشاهدة مباشرة,تحميل مباشر,مشاهدة,تحميل,نتفلكس,اون لاين,مباشر,مدبلج,مترجم,رمضان,مصري,خليجي,سوري,او اس ان,ام بي سي,تركي,برامج تلفزيونية,توك شو,تبع كلو,akwam,akoam',
  authors: [{ name: 'AKWAM' }],
  robots: 'index,follow',
  openGraph: {
    title: 'اكوام | موقع التحميل و المشاهدة العربي الاول',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
    type: 'website',
    siteName: 'اكوام',
    images: [{
      url: 'https://akw.to/files/social_logo.png',
      width: 573,
      height: 300,
    }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AKOAMsocial',
    creator: '@AKOAMsocial',
    title: 'اكوام | موقع التحميل و المشاهدة العربي الاول',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
    images: ['https://akw.to/files/social_logo.png']
  },
  other: {
    'msapplication-TileColor': '#222222',
    'theme-color': '#222222',
    'rating': 'General',
    'copyright': 'جميع الحقوق محفوظة لـ شبكة اكوام © 2025'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}