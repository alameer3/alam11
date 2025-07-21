'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  Zap, 
  Clock, 
  Wifi, 
  WifiOff, 
  Download, 
  Upload,
  Activity,
  Battery,
  Settings,
  RefreshCw
} from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  memoryUsage: number;
  networkSpeed: number;
  cacheHitRate: number;
  fps: number;
  isOnline: boolean;
}

interface PerformanceOptimizerProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  enableAutoOptimization?: boolean;
  showMetrics?: boolean;
}

export default function PerformanceOptimizer({ 
  onMetricsUpdate, 
  enableAutoOptimization = true,
  showMetrics = false 
}: PerformanceOptimizerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    memoryUsage: 0,
    networkSpeed: 0,
    cacheHitRate: 0,
    fps: 60,
    isOnline: navigator.onLine
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationHistory, setOptimizationHistory] = useState<PerformanceMetrics[]>([]);

  // قياس الأداء
  const measurePerformance = useCallback(() => {
    const startTime = performance.now();
    
    // قياس وقت التحميل
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // قياس استخدام الذاكرة
    const memoryUsage = (performance as any).memory ? 
      (performance as any).memory.usedJSHeapSize / (performance as any).memory.jsHeapSizeLimit * 100 : 0;
    
    // قياس سرعة الشبكة
    const connection = (navigator as any).connection;
    const networkSpeed = connection ? connection.effectiveType === '4g' ? 100 : 
      connection.effectiveType === '3g' ? 75 : 
      connection.effectiveType === '2g' ? 50 : 25 : 100;
    
    // قياس معدل الكاش
    const cacheHitRate = caches ? 85 : 0; // تقدير
    
    // قياس FPS
    let fps = 60;
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    measureFPS();
    
    const newMetrics: PerformanceMetrics = {
      loadTime,
      memoryUsage,
      networkSpeed,
      cacheHitRate,
      fps,
      isOnline: navigator.onLine
    };
    
    setMetrics(newMetrics);
    setOptimizationHistory(prev => [...prev.slice(-9), newMetrics]);
    
    if (onMetricsUpdate) {
      onMetricsUpdate(newMetrics);
    }
  }, [onMetricsUpdate]);

  // تحسين تلقائي
  const autoOptimize = useCallback(async () => {
    if (!enableAutoOptimization) return;
    
    setIsOptimizing(true);
    
    try {
      // تحسين الصور
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        if (!img.decoding) {
          img.decoding = 'async';
        }
      });
      
      // تحسين الروابط
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        if (link.href && !link.href.startsWith('javascript:')) {
          link.rel = 'prefetch';
        }
      });
      
      // تنظيف الذاكرة
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          // تحذير من استخدام الذاكرة العالي
          // console.warn('High memory usage detected');
        }
      }
      
      // تحسين الكاش
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          if (requests.length > 100) {
            // حذف العناصر القديمة
            const oldRequests = requests.slice(0, requests.length - 50);
            await Promise.all(oldRequests.map(request => cache.delete(request)));
          }
        }
      }
      
      // تحسين الشبكة
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType === 'slow-2g') {
          // تحميل أقل للمحتوى في الشبكة البطيئة
          const heavyElements = document.querySelectorAll('video, audio, iframe');
          heavyElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
        }
      }
      
    } catch (error) {
      // console.error('Auto optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, [enableAutoOptimization]);

  // تحسين يدوي
  const manualOptimize = useCallback(async () => {
    setIsOptimizing(true);
    
    try {
      // إعادة تحميل الصفحة مع تحسينات
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('optimized', 'true');
      window.location.href = currentUrl.toString();
    } catch (error) {
      // console.error('Manual optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  // مراقبة الأداء
  useEffect(() => {
    const interval = setInterval(measurePerformance, 5000);
    
    // مراقبة حالة الشبكة
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // تحسين تلقائي كل دقيقة
    const autoOptimizeInterval = setInterval(autoOptimize, 60000);
    
    return () => {
      clearInterval(interval);
      clearInterval(autoOptimizeInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [measurePerformance, autoOptimize]);

  // حساب متوسط الأداء
  const averageMetrics = useMemo(() => {
    if (optimizationHistory.length === 0) return metrics;
    
    const sum = optimizationHistory.reduce((acc, curr) => ({
      loadTime: acc.loadTime + curr.loadTime,
      memoryUsage: acc.memoryUsage + curr.memoryUsage,
      networkSpeed: acc.networkSpeed + curr.networkSpeed,
      cacheHitRate: acc.cacheHitRate + curr.cacheHitRate,
      fps: acc.fps + curr.fps,
      isOnline: curr.isOnline
    }));
    
    const count = optimizationHistory.length;
    
    return {
      loadTime: sum.loadTime / count,
      memoryUsage: sum.memoryUsage / count,
      networkSpeed: sum.networkSpeed / count,
      cacheHitRate: sum.cacheHitRate / count,
      fps: sum.fps / count,
      isOnline: sum.isOnline
    };
  }, [optimizationHistory, metrics]);

  // تقييم الأداء
  const performanceScore = useMemo(() => {
    const scores = [
      metrics.loadTime < 2000 ? 100 : Math.max(0, 100 - (metrics.loadTime - 2000) / 50),
      metrics.memoryUsage < 50 ? 100 : Math.max(0, 100 - (metrics.memoryUsage - 50) * 2),
      metrics.networkSpeed,
      metrics.cacheHitRate,
      metrics.fps > 30 ? 100 : Math.max(0, metrics.fps * 3.33),
      metrics.isOnline ? 100 : 0
    ];
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [metrics]);

  if (!showMetrics) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={manualOptimize}
          disabled={isOptimizing}
          className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
        >
          {isOptimizing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {isOptimizing ? 'جاري التحسين...' : 'تحسين الأداء'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center">
          <Activity className="w-4 h-4 ml-2" />
          أداء النظام
        </h3>
        <button
          onClick={manualOptimize}
          disabled={isOptimizing}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          {isOptimizing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Settings className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {/* تقييم الأداء */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">تقييم الأداء</span>
          <span className={`text-sm font-semibold ${
            performanceScore >= 80 ? 'text-green-400' :
            performanceScore >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {performanceScore}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              performanceScore >= 80 ? 'bg-green-500' :
              performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${performanceScore}%` }}
          />
        </div>
      </div>
      
      {/* المقاييس التفصيلية */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 ml-2" />
            <span className="text-gray-300 text-sm">وقت التحميل</span>
          </div>
          <span className="text-white text-sm">
            {Math.round(metrics.loadTime)}ms
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Battery className="w-4 h-4 text-gray-400 ml-2" />
            <span className="text-gray-300 text-sm">استخدام الذاكرة</span>
          </div>
          <span className="text-white text-sm">
            {Math.round(metrics.memoryUsage)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {metrics.isOnline ? (
              <Wifi className="w-4 h-4 text-green-400 ml-2" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400 ml-2" />
            )}
            <span className="text-gray-300 text-sm">سرعة الشبكة</span>
          </div>
          <span className="text-white text-sm">
            {metrics.networkSpeed}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Download className="w-4 h-4 text-gray-400 ml-2" />
            <span className="text-gray-300 text-sm">معدل الكاش</span>
          </div>
          <span className="text-white text-sm">
            {Math.round(metrics.cacheHitRate)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Upload className="w-4 h-4 text-gray-400 ml-2" />
            <span className="text-gray-300 text-sm">معدل الإطارات</span>
          </div>
          <span className="text-white text-sm">
            {Math.round(metrics.fps)} FPS
          </span>
        </div>
      </div>
      
      {/* متوسط الأداء */}
      {optimizationHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">متوسط الأداء</span>
            <span className="text-white text-sm">
              {Math.round(averageMetrics.loadTime)}ms
            </span>
          </div>
        </div>
      )}
    </div>
  );
}