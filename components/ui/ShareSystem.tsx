'use client';

import { useState } from 'react';
import { Share2, Copy, Link as LinkIcon, Facebook, Twitter, MessageCircle, Mail, QrCode, Download } from 'lucide-react';

interface ShareSystemProps {
  contentId: string;
  contentType: 'movie' | 'series' | 'show';
  title: string;
  description: string;
  image: string;
}

export default function ShareSystem({ contentId, contentType, title, description, image }: ShareSystemProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/${contentType}/${contentId}`;
    setShareUrl(url);
    return url;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // // // console.error('Failed to copy:', error);
    }
  };

  const shareToSocial = (platform: string) => {
    const url = generateShareUrl();
    const text = `${title}\n\n${description}\n\nشاهد الآن على منصة أكوام: ${url}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, show instructions
        alert('للمشاركة على إنستغرام، انسخ الرابط وشاركه في قصتك أو منشورك');
        return;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`;
        break;
      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const downloadQRCode = () => {
    // This would generate and download a QR code
    alert('سيتم تحميل رمز QR قريباً');
  };

  const shareOptions = [
    {
      name: 'نسخ الرابط',
      icon: <Copy className="w-5 h-5" />,
      color: 'bg-gray-500 hover:bg-gray-600',
      action: () => copyToClipboard(generateShareUrl())
    },
    {
      name: 'فيسبوك',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => shareToSocial('facebook')
    },
    {
      name: 'تويتر',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => shareToSocial('twitter')
    },
    {
      name: 'واتساب',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => shareToSocial('whatsapp')
    },
    {
      name: 'تليجرام',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => shareToSocial('telegram')
    },
    {
      name: 'إنستغرام',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-pink-500 hover:bg-pink-600',
      action: () => shareToSocial('instagram')
    },
    {
      name: 'البريد الإلكتروني',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => shareToSocial('email')
    },
    {
      name: 'رسالة نصية',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => shareToSocial('sms')
    },
    {
      name: 'رمز QR',
      icon: <QrCode className="w-5 h-5" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: downloadQRCode
    }
  ];

  return (
    <>
      {/* زر المشاركة */}
      <button
        onClick={() => setShowShareModal(true)}
        className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">مشاركة</span>
      </button>

      {/* نافذة المشاركة */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* خلفية معتمة */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          />
          
          {/* النافذة */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                مشاركة المحتوى
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* معلومات المحتوى */}
            <div className="flex items-center space-x-3 space-x-reverse mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img
                src={image}
                alt={title}
                className="w-16 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {description}
                </p>
              </div>
            </div>

            {/* رابط المشاركة */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                رابط المشاركة
              </label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="text"
                  value={shareUrl || generateShareUrl()}
                  readOnly
                  className="flex-1 input text-sm"
                />
                <button
                  onClick={() => copyToClipboard(shareUrl || generateShareUrl())}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {copied ? 'تم النسخ!' : 'نسخ'}
                </button>
              </div>
            </div>

            {/* خيارات المشاركة */}
            <div className="grid grid-cols-3 gap-3">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className={`flex flex-col items-center space-y-2 space-y-reverse p-4 rounded-lg transition-all duration-200 hover:scale-105 ${option.color} text-white`}
                >
                  {option.icon}
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>

            {/* إحصائيات المشاركة */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>عدد المشاركات</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>عدد المشاهدات</span>
                <span className="font-semibold">5,678</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}