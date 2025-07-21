# YEMEN FLIX - Streaming Platform

## Project Overview
This is a comprehensive streaming platform called "YEMEN FLIX" built with Next.js, featuring movies and series streaming capabilities with user authentication, ratings, comments, and administrative features.

## Recent Changes  
- **July 21, 2025 (Complete AKWAM Replication)**: إكمال المطابقة الشاملة مع موقع https://ak.sv/ الأصلي
- **استخدام كل الأساليب**: تطبيق جميع الخطوط والأنماط والأصول الأصلية من موقع AKWAM
- نسخ جميع الخطوط العربية (STC-Regular.woff, STC-Bold.woff, STC-Light.woff) 
- نسخ خطوط الأيقونات (icons.woff) مع جميع رموز الموقع الأصلي
- نسخ جميع الصور والخلفيات (home-bg.webp, logo-white.svg, إلخ)
- تطبيق CSS الكامل من الموقع الأصلي مع جميع الألوان والتأثيرات (#f3951e, #161619)
- إنشاء النظام الكامل للتخطيط (AKWAMLayout) مع القوائم المنسدلة والتنقل
- إنشاء مكونات MovieGrid و FilterForm مطابقة للأصل تماماً  
- إنشاء جميع الصفحات: /akwam (الرئيسية)، /akwam/movies، /akwam/series، /akwam/shows، /akwam/mix
- تطبيق نظام الشبكة والبطاقات والتأثيرات البصرية المطابقة للأصل
- **Previous Migration**: إكمال ترحيل المشروع من Replit Agent إلى Replit
- **Previous Work**: نسخ مجلد ak.sv/style بالكامل إلى مجلد app
- نسخ جميع ملفات CSS, JavaScript, والصور من ak.sv/style/assets إلى app/style/assets
- إنشاء ملف ak-complete-styles.css شامل ومحسن لجميع أنماط AKWAM
- إصلاح معظم أخطاء TypeScript في ملف الإشعارات
- التطبيق يعمل بشكل مستقر مع جميع ملفات الأنماط المنسوخة
- **Previous Work**: إكمال فحص أعمق وشامل للمشروع وإصلاح جميع المشاكل
- إصلاح TypeScript errors العميقة في جميع ملفات المشروع
- إزالة جميع unused imports من 20+ ملف (X, Eye, EyeOff, Star, Share2, إلخ)
- استبدال جميع 'any' types بـ proper TypeScript interfaces
- إصلاح أخطاء prop types في React components
- تنظيف شامل لجميع console.log statements (100+ إصلاح)
- إصلاح errors في admin panels (activity-log, content, settings)
- تحسين type safety في جميع API routes
- إصلاح مشاكل React component interfaces
- إصلاح syntax error critical في lib/database/models/base.ts
- تحسين SeriesFilters type definitions مع proper union types
- إصلاح genre filtering في content manager مع proper type checking
- إصلاح جميع LSP diagnostics وحل مشاكل النوع المتبقية
- إنشاء ملف .env وحل مشكلة NextAuth SECRET المفقود
- إصلاح مشاكل React Hydration وإزالة suppressHydrationWarning
- حل مشكلة المفاتيح المكررة في footer component
- إزالة جميع Date.now() وMath.random() من الكود لمنع hydration errors
- تنظيف شامل لجميع unused imports في payment components
- إصلاح escape characters في search components
- تحسين type safety وإزالة any types من utility functions
- **Previous Changes**: 
- إصلاح مشكلة NextAuth SECRET المفقود وإضافة المتغيرات البيئية
- إنشاء ملفات placeholder-hero.svg و placeholder-movie.svg
- إصلاح مشاكل React Hydration في ClientLayout و DarkModeToggle
- إصلاح أخطاء Heroicons المفقودة وsyntax errors
- التطبيق يعمل بشكل مستقر على المنفذ 5000 مع قاعدة البيانات SQLite

## Project Architecture

### Tech Stack
- **Frontend**: Next.js 15.4.2 with React 18
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js v5 beta
- **UI**: Tailwind CSS + Radix UI components
- **Media**: Sharp for image optimization
- **State Management**: React Context API

### Key Features
- Movies and Series streaming
- User authentication and authorization
- Watch lists and ratings system
- Comments and social features
- Admin dashboard capabilities
- Performance monitoring system
- Real-time notifications
- Multi-language support (Arabic/English)
- **AKWAM-style Interface**: Full recreation of AKWAM design with:
  - Homepage with category navigation
  - Movies, Series, Shows, and Mix content pages
  - Arabic RTL support and AKWAM visual identity
  - Content filtering and pagination
  - Responsive design with hover effects

### Database Structure
- User management with roles
- Content management (Movies, Series, Episodes)
- Genre and server management
- Analytics and monitoring
- Performance tracking
- Incident management

### Security Features
- Content Security Policy headers
- Frame protection (X-Frame-Options: DENY)
- Content type validation
- Image domain restrictions
- JWT authentication

## User Preferences
- No specific preferences documented yet

## Development Notes
- Uses SQLite database for development
- Prisma for database management
- Comprehensive monitoring system built-in
- Follows security best practices
- Multi-environment configuration ready