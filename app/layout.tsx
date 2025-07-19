import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StreamHub - أفضل موقع لمشاهدة الأفلام والمسلسلات',
  description: 'استمتع بمشاهدة أحدث الأفلام والمسلسلات العربية والأجنبية بجودة عالية ومجاناً',
  keywords: 'أفلام, مسلسلات, مشاهدة مباشرة, تحميل, عربي, أجنبي',
  authors: [{ name: 'StreamHub Team' }],
  openGraph: {
    title: 'StreamHub - أفضل موقع لمشاهدة الأفلام والمسلسلات',
    description: 'استمتع بمشاهدة أحدث الأفلام والمسلسلات العربية والأجنبية بجودة عالية ومجاناً',
    type: 'website',
  },
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