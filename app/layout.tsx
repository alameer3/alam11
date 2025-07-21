import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './akwam.css'

import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { MainFooter } from '@/components/layout/main-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'اكوام - AKWAM',
  description: 'موقع البث المتطور - أفلام، مسلسلات، برامج، منوعات',
  keywords: 'أفلام,مسلسلات,حلقات,مصارعة,برامج,العاب,اكوام,akwam',
  authors: [{ name: 'اكوام' }],
  creator: 'اكوام',
  publisher: 'اكوام',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'اكوام - AKWAM',
    description: 'موقع البث المتطور - أفلام، مسلسلات، برامج، منوعات',
    url: 'http://localhost:3000',
    siteName: 'اكوام',
    images: [
      {
        url: 'https://akw.to/files/social_logo.png',
        width: 1200,
        height: 630,
        alt: 'اكوام - AKWAM',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اكوام - AKWAM',
    description: 'موقع البث المتطور - أفلام، مسلسلات، برامج، منوعات',
    images: ['https://akw.to/files/social_logo.png'],
    creator: '@AKOAMsocial',
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
      <body className={`${inter.className} font-akoam`}>
        {/* Site overlay for menu */}
        <span className="site-overlay" />

        {/* Global header and menu */}
        <MainHeader />
        <MainMenu />

        {/* Page content */}
        {children}

        {/* Footer */}
        <MainFooter />
      </body>
    </html>
  )
}