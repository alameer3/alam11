#!/usr/bin/env tsx

import { connectToDatabase, db } from '../lib/database/connection'
import fs from 'fs'
import path from 'path'

async function initializeDatabase() {
  // console.log('🚀 بدء تهيئة قاعدة البيانات...')

  try {
    // الاتصال بقاعدة البيانات
    // console.log('📊 الاتصال بقاعدة البيانات...')
    await connectToDatabase()

    // التحقق من حالة قاعدة البيانات
    const dbInfo = db.getInfo()
    // console.log('ℹ️ معلومات قاعدة البيانات:', JSON.stringify(dbInfo, null, 2))

    // إنشاء نسخة احتياطية
    // console.log('💾 إنشاء نسخة احتياطية...')
    const backupPath = await db.backup()
    // console.log('✅ تم إنشاء نسخة احتياطية:', backupPath)

    // التحقق من البيانات
    await checkDatabaseData()

    // console.log('🎉 تم تهيئة قاعدة البيانات بنجاح!')
    
  } catch (error) {
    // console.error('❌ خطأ في تهيئة قاعدة البيانات:', error)
    process.exit(1)
  }
}

async function checkDatabaseData() {
  // console.log('🔍 التحقق من البيانات...')

  // التحقق من الجداول الأساسية
  const tables = [
    'site_settings', 'sections', 'categories', 'countries', 'languages', 
    'qualities', 'movies', 'series', 'episodes', 'people', 'users'
  ]

  for (const table of tables) {
    try {
      const count = await db.queryOne(`SELECT COUNT(*) as count FROM ${table}`)
      // console.log(`📋 ${table}: ${count?.count || 0} سجل`)
    } catch (error) {
      // console.warn(`⚠️ خطأ في التحقق من جدول ${table}:`, error instanceof Error ? error.message : error)
    }
  }

  // عرض إحصائيات سريعة
  await showQuickStats()
}

async function showQuickStats() {
  // console.log('\n📊 إحصائيات سريعة:')
  
  try {
    const stats = await Promise.all([
      db.queryOne(`SELECT COUNT(*) as count FROM movies WHERE is_active = 1`),
      db.queryOne(`SELECT COUNT(*) as count FROM series WHERE is_active = 1`),
      db.queryOne(`SELECT COUNT(*) as count FROM episodes WHERE is_active = 1`),
      db.queryOne(`SELECT COUNT(*) as count FROM users WHERE is_active = 1`),
      db.queryOne(`SELECT COUNT(*) as count FROM categories WHERE is_active = 1`),
      db.queryOne(`SELECT 
        (SELECT COALESCE(SUM(views_count), 0) FROM movies WHERE is_active = 1) +
        (SELECT COALESCE(SUM(views_count), 0) FROM series WHERE is_active = 1) +
        (SELECT COALESCE(SUM(views_count), 0) FROM episodes WHERE is_active = 1)
        as total_views`),
    ])

    // console.log(`🎬 الأفلام: ${(stats[0] as any)?.count || 0}`)
    // console.log(`📺 المسلسلات: ${(stats[1] as any)?.count || 0}`)
    // console.log(`🎞️ الحلقات: ${(stats[2] as any)?.count || 0}`)
    // console.log(`👥 المستخدمون: ${(stats[3] as any)?.count || 0}`)
    // console.log(`🏷️ التصنيفات: ${(stats[4] as any)?.count || 0}`)
    // console.log(`👁️ إجمالي المشاهدات: ${(stats[5] as any)?.total_views || 0}`)

    // عرض أشهر المحتوى
    const popularMovies = await db.query(`
      SELECT title, views_count, imdb_rating
      FROM movies 
      WHERE is_active = 1 
      ORDER BY views_count DESC 
      LIMIT 3
    `)

    const popularSeries = await db.query(`
      SELECT title, views_count, imdb_rating
      FROM series 
      WHERE is_active = 1 
      ORDER BY views_count DESC 
      LIMIT 3
    `)

    if (popularMovies.length > 0) {
      // console.log('\n🔥 أشهر الأفلام:')
      popularMovies.forEach((movie, index) => {
        // console.log(`   ${index + 1}. ${movie.title} (${movie.views_count} مشاهدة, تقييم: ${movie.imdb_rating})`)
      })
    }

    if (popularSeries.length > 0) {
      // console.log('\n🔥 أشهر المسلسلات:')
      popularSeries.forEach((series, index) => {
        // console.log(`   ${index + 1}. ${series.title} (${series.views_count} مشاهدة, تقييم: ${series.imdb_rating})`)
      })
    }

  } catch (error) {
    // console.warn('⚠️ خطأ في عرض الإحصائيات:', error instanceof Error ? error.message : error)
  }
}

// تشغيل script التهيئة
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      // console.log('\n✨ انتهت عملية التهيئة بنجاح!')
      process.exit(0)
    })
    .catch((error) => {
      // console.error('💥 فشلت عملية التهيئة:', error)
      process.exit(1)
    })
}

export { initializeDatabase }