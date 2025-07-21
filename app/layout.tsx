import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './akwam.css'
import './style/akwam-enhanced.css'

import { StaticLayout } from '@/components/StaticLayout'
import { ClientLayout } from '@/components/ClientLayout'
import { Providers } from '@/components/providers'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'يمن فليكس | موقع الأفلام والمسلسلات العربي الأول',
  description: 'يمن فليكس - موقع البث العربي الأول لمشاهدة وتحميل الأفلام والمسلسلات والبرامج التلفزيونية. مشاهدة مباشرة بجودة عالية وبدون إعلانات مزعجة.',
  keywords: 'أفلام,مسلسلات,حلقات,برامج,يمن فليكس,مشاهدة مباشرة,تحميل مباشر,مشاهدة,تحميل,اون لاين,مباشر,مدبلج,مترجم,عربي,خليجي,مصري,سوري,تركي,هندي,كوري',
  authors: [{ name: 'Yemen Flix' }],
  creator: 'Yemen Flix',
  publisher: 'Yemen Flix',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:5000'),
  openGraph: {
    title: 'يمن فليكس | موقع الأفلام والمسلسلات العربي الأول',
    description: 'يمن فليكس - موقع البث العربي الأول لمشاهدة وتحميل الأفلام والمسلسلات والبرامج التلفزيونية',
    url: 'http://localhost:5000',
    siteName: 'يمن فليكس',
    images: [
      {
        url: 'https://akw.to/files/social_logo.png',
        width: 1200,
        height: 630,
        alt: 'يمن فليكس - موقع الأفلام والمسلسلات العربي',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'يمن فليكس | موقع الأفلام والمسلسلات العربي الأول',
    description: 'يمن فليكس - موقع البث العربي الأول لمشاهدة وتحميل الأفلام والمسلسلات',
    images: ['https://akw.to/files/social_logo.png'],
    creator: '@YemenFlix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <Providers>
          {/* Site overlay for menu */}
          <span className="site-overlay" />
          {/* Combined layout with hydration protection */}
          <StaticLayout />
          <ClientLayout />
          {/* Page content */}
          {children}
        </Providers>
      </body>
    </html>
  )
}