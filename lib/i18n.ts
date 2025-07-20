import { createI18nClient } from 'next-international/client';
import { createI18nServer } from 'next-international/server';

// الترجمة العربية
const ar = {
  // الصفحة الرئيسية
  home: {
    title: 'أكوام كلون - منصة البث المتقدمة',
    description: 'شاهد أحدث الأفلام والمسلسلات والأنمي بجودة عالية',
    hero: {
      title: 'أفضل منصة بث في العالم العربي',
      subtitle: 'محتوى حصري ومجاني للأفلام والمسلسلات والأنمي',
      cta: 'ابدأ المشاهدة الآن',
      features: {
        quality: 'جودة عالية',
        free: 'مجاني تماماً',
        unlimited: 'محتوى غير محدود',
        mobile: 'متوافق مع جميع الأجهزة'
      }
    },
    categories: {
      movies: 'الأفلام',
      series: 'المسلسلات',
      anime: 'الأنمي',
      shows: 'البرامج'
    },
    sections: {
      trending: 'الترند',
      new: 'الجديد',
      recommended: 'موصى به',
      popular: 'الأكثر شعبية'
    }
  },

  // التنقل
  navigation: {
    home: 'الرئيسية',
    movies: 'الأفلام',
    series: 'المسلسلات',
    anime: 'الأنمي',
    shows: 'البرامج',
    search: 'البحث',
    trending: 'الترند',
    new: 'الجديد',
    categories: 'التصنيفات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج'
  },

  // البحث
  search: {
    placeholder: 'ابحث عن فيلم، مسلسل، برنامج...',
    button: 'بحث',
    filters: {
      title: 'فلاتر متقدمة',
      type: 'النوع',
      quality: 'الجودة',
      year: 'السنة',
      rating: 'التقييم',
      duration: 'المدة',
      language: 'اللغة',
      genre: 'النوع',
      all: 'الكل',
      movie: 'فيلم',
      series: 'مسلسل',
      anime: 'أنمي',
      show: 'برنامج'
    },
    results: {
      title: 'نتائج البحث',
      noResults: 'لا توجد نتائج',
      loading: 'جاري البحث...',
      count: 'نتيجة'
    }
  },

  // المحتوى
  content: {
    watch: 'شاهد الآن',
    download: 'تحميل',
    like: 'إعجاب',
    dislike: 'عدم إعجاب',
    share: 'مشاركة',
    favorite: 'المفضلة',
    addToList: 'إضافة إلى القائمة',
    removeFromList: 'إزالة من القائمة',
    quality: {
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية',
      ultra: 'فائقة'
    },
    status: {
      available: 'متاح',
      unavailable: 'غير متاح',
      comingSoon: 'قريباً',
      expired: 'منتهي الصلاحية'
    },
    info: {
      title: 'العنوان',
      year: 'السنة',
      duration: 'المدة',
      rating: 'التقييم',
      genre: 'النوع',
      director: 'المخرج',
      cast: 'الطاقم',
      description: 'الوصف',
      trailer: 'الإعلان التشويقي',
      reviews: 'التقييمات',
      comments: 'التعليقات',
      related: 'مشابه'
    }
  },

  // المشغل
  player: {
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    stop: 'إيقاف',
    fullscreen: 'ملء الشاشة',
    exitFullscreen: 'خروج من ملء الشاشة',
    mute: 'كتم الصوت',
    unmute: 'إلغاء كتم الصوت',
    volume: 'الصوت',
    quality: 'الجودة',
    speed: 'السرعة',
    subtitles: 'الترجمة',
    audio: 'الصوت',
    settings: 'الإعدادات',
    loading: 'جاري التحميل...',
    buffering: 'جاري التخزين المؤقت...',
    error: 'حدث خطأ في التشغيل',
    retry: 'إعادة المحاولة'
  },

  // التعليقات
  comments: {
    title: 'التعليقات والتقييمات',
    addComment: 'إضافة تعليق',
    reply: 'رد',
    edit: 'تعديل',
    delete: 'حذف',
    like: 'إعجاب',
    dislike: 'عدم إعجاب',
    report: 'إبلاغ',
    sortBy: 'ترتيب حسب',
    filterBy: 'تصفية حسب',
    loading: 'جاري تحميل التعليقات...',
    noComments: 'لا توجد تعليقات',
    placeholder: 'اكتب تعليقك هنا...',
    submit: 'إرسال التعليق',
    cancel: 'إلغاء',
    save: 'حفظ',
    characters: 'حرف',
    remaining: 'متبقي'
  },

  // الإشعارات
  notifications: {
    title: 'الإشعارات',
    all: 'الكل',
    unread: 'غير مقروء',
    important: 'مهم',
    pinned: 'مثبت',
    markAllRead: 'تحديد الكل كمقروء',
    clearAll: 'مسح الكل',
    noNotifications: 'لا توجد إشعارات',
    newContent: 'محتوى جديد متاح',
    newComment: 'تعليق جديد',
    newLike: 'إعجاب جديد',
    newReply: 'رد جديد',
    systemUpdate: 'تحديث النظام',
    maintenance: 'صيانة مجدولة'
  },

  // الملف الشخصي
  profile: {
    title: 'الملف الشخصي',
    edit: 'تعديل الملف الشخصي',
    save: 'حفظ التغييرات',
    cancel: 'إلغاء',
    avatar: 'الصورة الشخصية',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    bio: 'نبذة شخصية',
    preferences: 'التفضيلات',
    privacy: 'الخصوصية',
    security: 'الأمان',
    notifications: 'الإشعارات',
    language: 'اللغة',
    theme: 'المظهر',
    deleteAccount: 'حذف الحساب',
    logout: 'تسجيل الخروج'
  },

  // الإعدادات
  settings: {
    title: 'الإعدادات',
    general: 'عام',
    appearance: 'المظهر',
    privacy: 'الخصوصية',
    notifications: 'الإشعارات',
    playback: 'التشغيل',
    download: 'التحميل',
    language: 'اللغة',
    theme: {
      light: 'فاتح',
      dark: 'داكن',
      auto: 'تلقائي'
    },
    quality: {
      auto: 'تلقائي',
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية',
      ultra: 'فائقة'
    },
    autoplay: 'تشغيل تلقائي',
    subtitles: 'الترجمة',
    audio: 'الصوت',
    downloadQuality: 'جودة التحميل',
    downloadLocation: 'موقع التحميل',
    maxDownloads: 'الحد الأقصى للتحميلات'
  },

  // المدفوعات
  payment: {
    title: 'خطط الاشتراك',
    basic: 'الخطة الأساسية',
    premium: 'الخطة المميزة',
    family: 'خطة العائلة',
    monthly: 'شهرياً',
    yearly: 'سنوياً',
    features: {
      noAds: 'بدون إعلانات',
      hdQuality: 'جودة عالية',
      unlimitedDownloads: 'تحميل غير محدود',
      multipleDevices: 'أجهزة متعددة',
      exclusiveContent: 'محتوى حصري',
      prioritySupport: 'دعم مميز'
    },
    paymentMethods: {
      card: 'بطاقة ائتمان',
      paypal: 'PayPal',
      applePay: 'Apple Pay',
      googlePay: 'Google Pay'
    },
    secure: 'دفع آمن ومشفر',
    terms: 'الشروط والأحكام',
    privacy: 'سياسة الخصوصية'
  },

  // البث المباشر
  live: {
    title: 'البث المباشر',
    live: 'مباشر',
    viewers: 'مشاهد',
    streamer: 'المذيع',
    chat: 'المحادثة',
    sendMessage: 'إرسال رسالة',
    messagePlaceholder: 'اكتب رسالتك...',
    quality: 'الجودة',
    networkQuality: 'جودة الشبكة',
    streamSettings: 'إعدادات البث',
    startStream: 'بدء البث',
    endStream: 'إنهاء البث',
    shareStream: 'مشاركة البث'
  },

  // التحليلات
  analytics: {
    title: 'التحليلات المتقدمة',
    overview: 'نظرة عامة',
    content: 'المحتوى',
    demographics: 'الجمهور',
    engagement: 'التفاعل',
    realtime: 'مباشر',
    views: 'المشاهدات',
    likes: 'الإعجابات',
    comments: 'التعليقات',
    downloads: 'التحميلات',
    growth: 'النمو',
    engagement: 'التفاعل',
    export: 'تصدير التقرير',
    share: 'مشاركة',
    settings: 'الإعدادات'
  },

  // الأخطاء
  errors: {
    general: 'حدث خطأ',
    network: 'خطأ في الشبكة',
    notFound: 'الصفحة غير موجودة',
    unauthorized: 'غير مصرح',
    forbidden: 'محظور',
    serverError: 'خطأ في الخادم',
    tryAgain: 'حاول مرة أخرى',
    goHome: 'العودة للرئيسية',
    contactSupport: 'اتصل بالدعم'
  },

  // الرسائل
  messages: {
    success: 'تم بنجاح',
    error: 'حدث خطأ',
    warning: 'تحذير',
    info: 'معلومات',
    loading: 'جاري التحميل...',
    saving: 'جاري الحفظ...',
    deleting: 'جاري الحذف...',
    uploading: 'جاري الرفع...',
    downloading: 'جاري التحميل...',
    processing: 'جاري المعالجة...',
    pleaseWait: 'يرجى الانتظار...',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    yes: 'نعم',
    no: 'لا',
    ok: 'موافق',
    close: 'إغلاق'
  },

  // التواريخ والأوقات
  dateTime: {
    today: 'اليوم',
    yesterday: 'أمس',
    tomorrow: 'غداً',
    thisWeek: 'هذا الأسبوع',
    lastWeek: 'الأسبوع الماضي',
    thisMonth: 'هذا الشهر',
    lastMonth: 'الشهر الماضي',
    thisYear: 'هذا العام',
    lastYear: 'العام الماضي',
    ago: 'منذ',
    in: 'في',
    at: 'في',
    on: 'في'
  }
};

// الترجمة الإنجليزية
const en = {
  // Home page
  home: {
    title: 'Akwam Clone - Advanced Streaming Platform',
    description: 'Watch the latest movies, series and anime in high quality',
    hero: {
      title: 'Best streaming platform in the Arab world',
      subtitle: 'Exclusive and free content for movies, series and anime',
      cta: 'Start Watching Now',
      features: {
        quality: 'High Quality',
        free: 'Completely Free',
        unlimited: 'Unlimited Content',
        mobile: 'Compatible with all devices'
      }
    },
    categories: {
      movies: 'Movies',
      series: 'Series',
      anime: 'Anime',
      shows: 'Shows'
    },
    sections: {
      trending: 'Trending',
      new: 'New',
      recommended: 'Recommended',
      popular: 'Popular'
    }
  },

  // Navigation
  navigation: {
    home: 'Home',
    movies: 'Movies',
    series: 'Series',
    anime: 'Anime',
    shows: 'Shows',
    search: 'Search',
    trending: 'Trending',
    new: 'New',
    categories: 'Categories',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout'
  },

  // Search
  search: {
    placeholder: 'Search for movie, series, show...',
    button: 'Search',
    filters: {
      title: 'Advanced Filters',
      type: 'Type',
      quality: 'Quality',
      year: 'Year',
      rating: 'Rating',
      duration: 'Duration',
      language: 'Language',
      genre: 'Genre',
      all: 'All',
      movie: 'Movie',
      series: 'Series',
      anime: 'Anime',
      show: 'Show'
    },
    results: {
      title: 'Search Results',
      noResults: 'No results found',
      loading: 'Searching...',
      count: 'results'
    }
  },

  // Content
  content: {
    watch: 'Watch Now',
    download: 'Download',
    like: 'Like',
    dislike: 'Dislike',
    share: 'Share',
    favorite: 'Favorite',
    addToList: 'Add to List',
    removeFromList: 'Remove from List',
    quality: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      ultra: 'Ultra'
    },
    status: {
      available: 'Available',
      unavailable: 'Unavailable',
      comingSoon: 'Coming Soon',
      expired: 'Expired'
    },
    info: {
      title: 'Title',
      year: 'Year',
      duration: 'Duration',
      rating: 'Rating',
      genre: 'Genre',
      director: 'Director',
      cast: 'Cast',
      description: 'Description',
      trailer: 'Trailer',
      reviews: 'Reviews',
      comments: 'Comments',
      related: 'Related'
    }
  },

  // Player
  player: {
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    mute: 'Mute',
    unmute: 'Unmute',
    volume: 'Volume',
    quality: 'Quality',
    speed: 'Speed',
    subtitles: 'Subtitles',
    audio: 'Audio',
    settings: 'Settings',
    loading: 'Loading...',
    buffering: 'Buffering...',
    error: 'Playback error occurred',
    retry: 'Retry'
  },

  // Comments
  comments: {
    title: 'Comments and Ratings',
    addComment: 'Add Comment',
    reply: 'Reply',
    edit: 'Edit',
    delete: 'Delete',
    like: 'Like',
    dislike: 'Dislike',
    report: 'Report',
    sortBy: 'Sort by',
    filterBy: 'Filter by',
    loading: 'Loading comments...',
    noComments: 'No comments',
    placeholder: 'Write your comment here...',
    submit: 'Submit Comment',
    cancel: 'Cancel',
    save: 'Save',
    characters: 'characters',
    remaining: 'remaining'
  },

  // Notifications
  notifications: {
    title: 'Notifications',
    all: 'All',
    unread: 'Unread',
    important: 'Important',
    pinned: 'Pinned',
    markAllRead: 'Mark All as Read',
    clearAll: 'Clear All',
    noNotifications: 'No notifications',
    newContent: 'New content available',
    newComment: 'New comment',
    newLike: 'New like',
    newReply: 'New reply',
    systemUpdate: 'System update',
    maintenance: 'Scheduled maintenance'
  },

  // Profile
  profile: {
    title: 'Profile',
    edit: 'Edit Profile',
    save: 'Save Changes',
    cancel: 'Cancel',
    avatar: 'Avatar',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    bio: 'Bio',
    preferences: 'Preferences',
    privacy: 'Privacy',
    security: 'Security',
    notifications: 'Notifications',
    language: 'Language',
    theme: 'Theme',
    deleteAccount: 'Delete Account',
    logout: 'Logout'
  },

  // Settings
  settings: {
    title: 'Settings',
    general: 'General',
    appearance: 'Appearance',
    privacy: 'Privacy',
    notifications: 'Notifications',
    playback: 'Playback',
    download: 'Download',
    language: 'Language',
    theme: {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto'
    },
    quality: {
      auto: 'Auto',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      ultra: 'Ultra'
    },
    autoplay: 'Autoplay',
    subtitles: 'Subtitles',
    audio: 'Audio',
    downloadQuality: 'Download Quality',
    downloadLocation: 'Download Location',
    maxDownloads: 'Max Downloads'
  },

  // Payment
  payment: {
    title: 'Subscription Plans',
    basic: 'Basic Plan',
    premium: 'Premium Plan',
    family: 'Family Plan',
    monthly: 'Monthly',
    yearly: 'Yearly',
    features: {
      noAds: 'No Ads',
      hdQuality: 'HD Quality',
      unlimitedDownloads: 'Unlimited Downloads',
      multipleDevices: 'Multiple Devices',
      exclusiveContent: 'Exclusive Content',
      prioritySupport: 'Priority Support'
    },
    paymentMethods: {
      card: 'Credit Card',
      paypal: 'PayPal',
      applePay: 'Apple Pay',
      googlePay: 'Google Pay'
    },
    secure: 'Secure and encrypted payment',
    terms: 'Terms and Conditions',
    privacy: 'Privacy Policy'
  },

  // Live Streaming
  live: {
    title: 'Live Streaming',
    live: 'Live',
    viewers: 'Viewers',
    streamer: 'Streamer',
    chat: 'Chat',
    sendMessage: 'Send Message',
    messagePlaceholder: 'Type your message...',
    quality: 'Quality',
    networkQuality: 'Network Quality',
    streamSettings: 'Stream Settings',
    startStream: 'Start Stream',
    endStream: 'End Stream',
    shareStream: 'Share Stream'
  },

  // Analytics
  analytics: {
    title: 'Advanced Analytics',
    overview: 'Overview',
    content: 'Content',
    demographics: 'Demographics',
    engagement: 'Engagement',
    realtime: 'Realtime',
    views: 'Views',
    likes: 'Likes',
    comments: 'Comments',
    downloads: 'Downloads',
    growth: 'Growth',
    engagement: 'Engagement',
    export: 'Export Report',
    share: 'Share',
    settings: 'Settings'
  },

  // Errors
  errors: {
    general: 'An error occurred',
    network: 'Network error',
    notFound: 'Page not found',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    serverError: 'Server error',
    tryAgain: 'Try again',
    goHome: 'Go home',
    contactSupport: 'Contact support'
  },

  // Messages
  messages: {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
    loading: 'Loading...',
    saving: 'Saving...',
    deleting: 'Deleting...',
    uploading: 'Uploading...',
    downloading: 'Downloading...',
    processing: 'Processing...',
    pleaseWait: 'Please wait...',
    confirm: 'Confirm',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    close: 'Close'
  },

  // Date and Time
  dateTime: {
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    lastWeek: 'Last Week',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisYear: 'This Year',
    lastYear: 'Last Year',
    ago: 'ago',
    in: 'in',
    at: 'at',
    on: 'on'
  }
};

// إنشاء مثيلات i18n
export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  ar,
  en
});

export const { getI18n, getScopedI18n, I18nProviderServer } = createI18nServer({
  ar,
  en
});

// أنواع TypeScript
export type Locale = 'ar' | 'en';
export type TranslationKey = keyof typeof ar;

// دوال مساعدة
export const getLocaleFromPath = (pathname: string): Locale => {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  return locale === 'en' ? 'en' : 'ar';
};

export const getPathWithoutLocale = (pathname: string): string => {
  const segments = pathname.split('/');
  if (segments[1] === 'en' || segments[1] === 'ar') {
    return '/' + segments.slice(2).join('/');
  }
  return pathname;
};

export const createLocalizedPath = (path: string, locale: Locale): string => {
  if (locale === 'en') {
    return `/en${path}`;
  }
  return path;
};