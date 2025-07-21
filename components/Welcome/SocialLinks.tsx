'use client'

export function SocialLinks() {
  const socialLinks = [
    {
      href: 'https://facebook.com/yemenflix',
      icon: '📘',
      label: 'Facebook',
      color: 'hover:text-blue-500'
    },
    {
      href: 'https://youtube.com/yemenflix',
      icon: '📺',
      label: 'YouTube',
      color: 'hover:text-red-500'
    },
    {
      href: 'https://twitter.com/yemenflix',
      icon: '🐦',
      label: 'Twitter',
      color: 'hover:text-sky-500'
    },
    {
      href: 'https://instagram.com/yemenflix',
      icon: '📷',
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    {
      href: 'mailto:contact@yemenflix.com',
      icon: '✉️',
      label: 'Email',
      color: 'hover:text-green-500'
    },
    {
      href: '/app',
      icon: '📱',
      label: 'تطبيق الموبايل',
      color: 'hover:text-orange-500'
    }
  ]

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <nav className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`text-white ${link.color} transition-colors text-2xl`}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            جميع الحقوق محفوظة لـ 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗 © 2025
          </p>
        </div>
      </div>
    </footer>
  )
}