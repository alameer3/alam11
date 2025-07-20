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
        <link rel="icon" href="/favicon.ico" />
        
        {/* خطوط اكوام الأصلية */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'akoam';
              src: url('/fonts/STC-Bold.woff2') format('woff2'),
                   url('/fonts/STC-Bold.woff') format('woff'),
                   url('/fonts/STC-Bold.ttf') format('truetype');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'akoam';
              src: url('/fonts/STC-Light.woff2') format('woff2'),
                   url('/fonts/STC-Light.woff') format('woff'),
                   url('/fonts/STC-Light.ttf') format('truetype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'akoam';
              src: url('/fonts/STC-Regular.woff2') format('woff2'),
                   url('/fonts/STC-Regular.woff') format('woff'),
                   url('/fonts/STC-Regular.ttf') format('truetype');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            
            body {
              font-family: 'akoam', 'Inter', sans-serif;
              background: linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url('/images/home-bg.webp');
              background-size: cover;
              background-attachment: fixed;
              background-position: center;
              color: white;
              min-height: 100vh;
            }
            
            /* تحسينات الأداء */
            * {
              box-sizing: border-box;
            }
            
            img {
              max-width: 100%;
              height: auto;
            }
            
            /* تحسينات RTL */
            html[dir="rtl"] {
              text-align: right;
            }
            
            /* تحسينات الاستجابة */
            @media (max-width: 768px) {
              .container {
                padding-left: 15px;
                padding-right: 15px;
              }
            }
          `
        }} />
        
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
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LYBJP286GM"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LYBJP286GM');
          `
        }} />
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