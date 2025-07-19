import Link from 'next/link'
import { Film, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    about: [
      { name: 'من نحن', href: '/about' },
      { name: 'سياسة الخصوصية', href: '/privacy' },
      { name: 'شروط الاستخدام', href: '/terms' },
      { name: 'اتصل بنا', href: '/contact' },
    ],
    categories: [
      { name: 'أفلام عربية', href: '/movies?genre=arabic' },
      { name: 'أفلام أجنبية', href: '/movies?genre=foreign' },
      { name: 'مسلسلات عربية', href: '/series?genre=arabic' },
      { name: 'مسلسلات أجنبية', href: '/series?genre=foreign' },
    ],
    support: [
      { name: 'مركز المساعدة', href: '/help' },
      { name: 'الأسئلة الشائعة', href: '/faq' },
      { name: 'بلاغ عن مشكلة', href: '/report' },
      { name: 'طلب محتوى', href: '/request' },
    ],
  }

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Film className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">StreamHub</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              أفضل منصة لمشاهدة الأفلام والمسلسلات العربية والأجنبية بجودة عالية ومجاناً. 
              استمتع بمكتبة ضخمة من المحتوى المتنوع.
            </p>
            <div className="flex space-x-4 space-x-reverse text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="h-4 w-4" />
                <span>info@streamhub.com</span>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">حول الموقع</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">التصنيفات</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">الدعم</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} StreamHub. جميع الحقوق محفوظة.
          </p>
          
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
            <span>تم التطوير بـ ❤️ في المملكة العربية السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  )
}