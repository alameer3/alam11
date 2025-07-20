#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 بدء إعداد مشروع أكوام...\n');

// خطوات الإعداد
const setupSteps = [
  {
    name: 'تثبيت التبعيات',
    command: 'npm install',
    description: 'تثبيت جميع الحزم المطلوبة'
  },
  {
    name: 'إنشاء قاعدة البيانات',
    command: 'npx prisma generate && npx prisma db push',
    description: 'إعداد قاعدة البيانات وإنشاء الجداول'
  },
  {
    name: 'إضافة بيانات تجريبية',
    command: 'npm run seed',
    description: 'إضافة بيانات تجريبية للموقع'
  }
];

// تنفيذ الخطوات
async function runSetup() {
  for (const step of setupSteps) {
    console.log(`📦 ${step.name}...`);
    console.log(`   ${step.description}`);
    
    try {
      await executeCommand(step.command);
      console.log(`✅ ${step.name} مكتمل\n`);
    } catch (error) {
      console.error(`❌ خطأ في ${step.name}:`, error.message);
      process.exit(1);
    }
  }

  // إنشاء مجلدات مطلوبة
  createDirectories();
  
  // عرض رسالة الإكمال
  showCompletionMessage();
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

function createDirectories() {
  const directories = [
    'public/uploads',
    'public/uploads/movies',
    'public/uploads/series',
    'public/uploads/shows',
    'public/uploads/mix',
    'public/uploads/avatars'
  ];

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 تم إنشاء مجلد: ${dir}`);
    }
  });
}

function showCompletionMessage() {
  console.log('\n🎉 تم إعداد المشروع بنجاح!\n');
  console.log('📋 الخطوات التالية:');
  console.log('   1. npm run dev - لتشغيل المشروع');
  console.log('   2. افتح المتصفح على: http://localhost:3000');
  console.log('   3. لوحة الإدارة: http://localhost:3000/admin');
  console.log('\n🔑 بيانات الإدارة:');
  console.log('   البريد: admin@akwam.com');
  console.log('   كلمة المرور: admin123456');
  console.log('\n✨ استمتع بموقعك الجديد!');
}

// تشغيل الإعداد
runSetup().catch(console.error);