# YEMEN FLIX - Streaming Platform

## Project Overview
This is a comprehensive streaming platform called "YEMEN FLIX" built with Next.js, featuring movies and series streaming capabilities with user authentication, ratings, comments, and administrative features.

## Recent Changes
- **July 21, 2025**: إكمال الهجرة من Replit Agent إلى Replit مع فحص شامل ودقيق
- إصلاح مشكلة NextAuth SECRET المفقود وإضافة المتغيرات البيئية
- إنشاء ملفات placeholder-hero.svg و placeholder-movie.svg لحل مشكلة الصور المفقودة
- تحديث next.config.js لإضافة النطاق الحالي في allowedDevOrigins
- إصلاح أخطاء LSP في ErrorBoundary.tsx (syntax errors في catch blocks)
- تنظيف جميع console.log statements المتبقية في المشروع
- **July 21, 2025**: إكمال فحص شامل ودقيق لجميع مكونات المشروع
- إصلاح مشاكل React Hydration في ClientLayout و DarkModeToggle
- استبدال جميع Date.now() و Math.random() بقيم ثابتة لمنع hydration mismatch
- إصلاح أخطاء Heroicons المفقودة (BanIcon, EmojiHappyIcon)
- إصلاح مشكلة syntax error في lib/database/models/base.ts
- إزالة خيار fileMustExist المهجور من Database connection
- إصلاح صفحة movie/[slug] بإزالة 'use client' من Server Component
- فحص وإصلاح جميع LSP diagnostics errors
- تنظيف console.log statements من المشروع
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