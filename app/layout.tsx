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
  other: {
    'msapplication-TileColor': '#222222',
    'theme-color': '#222222',
    'rating': 'General',
    'copyright': 'جميع الحقوق محفوظة لـ شبكة اكوام © 2025',
    'fb:app_id': '437560843555258'
  },
  openGraph: {
    title: 'اكوام | موقع التحميل و المشاهدة العربي الاول',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
    url: 'https://ak.sv',
    siteName: 'اكوام',
    images: [
      {
        url: 'https://akw.to/files/social_logo.png',
        width: 573,
        height: 300
      }
    ],
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اكوام | موقع التحميل و المشاهدة العربي الاول',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
    site: '@AKOAMsocial',
    creator: '@AKOAMsocial',
    images: ['https://akw.to/files/social_logo.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="canonical" href="https://ak.sv" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@id": "https://ak.sv/main",
                      "name": "اكوام | موقع التحميل و المشاهدة العربي الاول"
                    }
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}