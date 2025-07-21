'use client';

import { signIn } from 'next-auth/react';
import { 
  FaGoogle, 
  FaFacebook, 
  FaApple, 
  FaTwitter,
  FaGithub,
  FaDiscord,
  FaLinkedin
} from 'react-icons/fa';

interface SocialLoginProps {
  callbackUrl?: string;
  className?: string;
}

const socialProviders = [
  {
    id: 'google',
    name: 'Google',
    icon: FaGoogle,
    color: 'bg-red-600 hover:bg-red-700',
    textColor: 'text-white',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebook,
    color: 'bg-blue-600 hover:bg-blue-700',
    textColor: 'text-white',
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: FaApple,
    color: 'bg-black hover:bg-gray-800',
    textColor: 'text-white',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: FaTwitter,
    color: 'bg-blue-400 hover:bg-blue-500',
    textColor: 'text-white',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: FaGithub,
    color: 'bg-gray-800 hover:bg-gray-900',
    textColor: 'text-white',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: FaDiscord,
    color: 'bg-indigo-600 hover:bg-indigo-700',
    textColor: 'text-white',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: FaLinkedin,
    color: 'bg-blue-700 hover:bg-blue-800',
    textColor: 'text-white',
  },
];

export default function SocialLogin({ callbackUrl = '/', className = '' }: SocialLoginProps) {
  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl });
    } catch (error) {
      // // // console.error('خطأ في تسجيل الدخول الاجتماعي:', error);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">أو استمر مع</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {socialProviders.map((provider) => {
          const Icon = provider.icon;
          return (
            <button
              key={provider.id}
              onClick={() => handleSocialLogin(provider.id)}
              className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${provider.color} ${provider.textColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">تسجيل الدخول بـ {provider.name}</span>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          بالاستمرار، أنت توافق على{' '}
          <a href="/terms" className="text-blue-600 hover:text-blue-500">
            شروط الخدمة
          </a>{' '}
          و{' '}
          <a href="/privacy" className="text-blue-600 hover:text-blue-500">
            سياسة الخصوصية
          </a>
        </p>
      </div>
    </div>
  );
}