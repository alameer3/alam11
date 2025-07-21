# YEMEN FLIX - Streaming Platform

## Project Overview
This is a comprehensive streaming platform called "YEMEN FLIX" built with Next.js, featuring movies and series streaming capabilities with user authentication, ratings, comments, and administrative features.

## Recent Changes
- **July 21, 2025**: تم إكمال ترحيل المشروع من Replit Agent إلى بيئة Replit بنجاح
- إصلاح جميع الأخطاء الأساسية في التطبيق
- إعداد النظام ليعمل على المنفذ 5000
- إنشاء الصور المفقودة (placeholder-hero.svg و placeholder-movie.svg)
- إصلاح مشكلة NextAuth Secret وإعداد متغيرات البيئة
- إصلاح خطأ TypeScript في ClientLayout.tsx
- تحديث next.config.js لدعم allowedDevOrigins الحالي
- التحقق من عمل جميع APIs (health, movies, categories, auth)
- فحص شامل لجميع المكونات وإصلاح الأخطاء
- التطبيق يعمل بالكامل مع NextAuth وقاعدة البيانات دون أخطاء

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