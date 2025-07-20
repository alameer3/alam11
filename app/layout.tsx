import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { SiteSettingsProvider } from '@/context/site-settings-context'
import { AdProvider } from '@/context/ad-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'اكوام - شمس المواقع',
  description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
  openGraph: {
    title: 'اكوام - شمس المواقع',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
    url: 'https://ak.sv',
    siteName: 'اكوام',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اكوام - شمس المواقع',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة'
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#26baee',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' }
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
        {/* Google Fonts للخط العربي */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Meta tags إضافية */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Akwam Team" />
        <meta name="keywords" content="اكوام، أفلام، مسلسلات، ألعاب، برامج، تطبيقات، تلفزيون، مسرحيات، مصارعة، رياضة، تحميل، مشاهدة، مباشرة، عربي" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "اكوام",
              "alternateName": "Akwam",
              "url": "https://ak.sv",
              "description": "شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات",
              "inLanguage": "ar",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ak.sv/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <SiteSettingsProvider>
          <AdProvider>
            {children}
            <Toaster />
          </AdProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  )
}