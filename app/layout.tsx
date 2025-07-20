import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo'
})

export const metadata: Metadata = {
  title: 'AKWAM - شمس المواقع',
  description: 'الموقع العربي الأول لمشاهدة الأفلام والمسلسلات أونلاين',
  keywords: 'أفلام, مسلسلات, مشاهدة أونلاين, عربي, ترفيه',
  openGraph: {
    title: 'AKWAM - شمس المواقع',
    description: 'الموقع العربي الأول لمشاهدة الأفلام والمسلسلات أونلاين',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AKWAM - شمس المواقع',
    description: 'الموقع العربي الأول لمشاهدة الأفلام والمسلسلات أونلاين',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <body className={`${cairo.className} antialiased`}>
        <div className="min-h-screen bg-gray-950 text-white">
          <Header />
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}