import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    browse: [
      { name: 'الأفلام', href: '/movies' },
      { name: 'المسلسلات', href: '/series' },
      { name: 'البرامج', href: '/shows' },
      { name: 'المختلط', href: '/mix' },
    ],
    genres: [
      { name: 'أكشن', href: '/movies?genre=action' },
      { name: 'كوميدي', href: '/movies?genre=comedy' },
      { name: 'دراما', href: '/movies?genre=drama' },
      { name: 'رعب', href: '/movies?genre=horror' },
    ],
    support: [
      { name: 'مركز المساعدة', href: '/help' },
      { name: 'اتصل بنا', href: '/contact' },
      { name: 'الأسئلة الشائعة', href: '/faq' },
      { name: 'الإبلاغ عن مشكلة', href: '/report' },
    ],
    legal: [
      { name: 'شروط الاستخدام', href: '/terms' },
      { name: 'سياسة الخصوصية', href: '/privacy' },
      { name: 'إخلاء المسؤولية', href: '/disclaimer' },
      { name: 'حقوق الطبع والنشر', href: '/copyright' },
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' },
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-white">
                <span className="text-xl font-bold">AK</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">AK</span>
                <span className="text-xl text-gray-300">.SV</span>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4 leading-relaxed">
              أفضل موقع لمشاهدة وتحميل الأفلام والمسلسلات العربية والأجنبية بجودة عالية.
              استمتع بأحدث الإصدارات والكلاسيكيات المميزة مجاناً.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@ak.sv</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Browse Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">تصفح</h3>
            <ul className="space-y-2">
              {footerLinks.browse.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Genres Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">التصنيفات</h3>
            <ul className="space-y-2">
              {footerLinks.genres.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">الدعم</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold mb-2">اشترك في النشرة الإخبارية</h3>
              <p className="text-gray-400 text-sm">احصل على أحدث الأفلام والمسلسلات فور إضافتها</p>
            </div>
            <div className="flex gap-2 max-w-md w-full md:w-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-red-500 focus:outline-none"
              />
              <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200">
                اشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-gray-800">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <p>© {currentYear} AK.SV. جميع الحقوق محفوظة.</p>
            <p className="mt-1">موقع AK.SV لا يستضيف أي ملفات على خوادمه، جميع الروابط خارجية.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">تابعنا:</span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-gray-800 mt-4">
          {footerLinks.legal.map((link, index) => (
            <span key={link.name} className="flex items-center">
              <Link 
                href={link.href}
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200"
              >
                {link.name}
              </Link>
              {index < footerLinks.legal.length - 1 && (
                <span className="text-gray-600 mx-2">•</span>
              )}
            </span>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
          <p className="text-yellow-300 text-xs text-center leading-relaxed">
            <strong>تنبيه:</strong> هذا الموقع لا يستضيف أو يخزن أي ملفات فيديو على خوادمه. 
            جميع المحتويات المعروضة هي روابط خارجية يتم جمعها من مصادر متاحة على الإنترنت. 
            إذا كنت مالك المحتوى وتريد إزالته، يرجى التواصل معنا.
          </p>
        </div>
      </div>
    </footer>
  )
}