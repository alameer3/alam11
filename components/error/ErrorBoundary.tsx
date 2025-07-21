'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Bug, Shield, Zap } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorId: `error_${new Date("2025-07-21T14:00:00Z").getTime()}_${0.5.toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // // // console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      errorId: `error_${new Date("2025-07-21T14:00:00Z").getTime()}_${0.5.toString(36).substr(2, 9)}`
    });

    // استدعاء callback إذا تم تمريره
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // إرسال الخطأ إلى خدمة التتبع (مثل Sentry)
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // هنا يمكن إرسال الخطأ إلى خدمة التتبع
      const errorData = {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      // إرسال إلى API للتتبع
      fetch('/api/error-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      }).catch(() => {
        // Error logging silently handled
      });

    } catch (logError) {
      // // // console.error('Failed to log error:', logError);
    }
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportError = () => {
    const errorData = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // فتح نافذة جديدة لإرسال تقرير الخطأ
    const reportUrl = `/error-report?data=${encodeURIComponent(JSON.stringify(errorData))}`;
    window.open(reportUrl, '_blank');
  };

  private getErrorType = (error: Error): string => {
    if (error.name === 'TypeError') return 'خطأ في النوع';
    if (error.name === 'ReferenceError') return 'خطأ في المرجع';
    if (error.name === 'SyntaxError') return 'خطأ في التركيب';
    if (error.name === 'RangeError') return 'خطأ في النطاق';
    if (error.name === 'URIError') return 'خطأ في الرابط';
    if (error.name === 'EvalError') return 'خطأ في التقييم';
    return 'خطأ غير معروف';
  };

  private getErrorSeverity = (error: Error): 'low' | 'medium' | 'high' => {
    const criticalErrors = ['TypeError', 'ReferenceError', 'SyntaxError'];
    const mediumErrors = ['RangeError', 'URIError'];
    
    if (criticalErrors.includes(error.name)) return 'high';
    if (mediumErrors.includes(error.name)) return 'medium';
    return 'low';
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorId } = this.state;
      const errorType = error ? this.getErrorType(error) : 'خطأ غير معروف';
      const severity = error ? this.getErrorSeverity(error) : 'low';

      // إذا تم تمرير fallback مخصص
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${
                  severity === 'high' ? 'bg-red-100 dark:bg-red-900' :
                  severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900' :
                  'bg-blue-100 dark:bg-blue-900'
                }`}>
                  <AlertTriangle className={`w-8 h-8 ${
                    severity === 'high' ? 'text-red-600 dark:text-red-400' :
                    severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`} />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                عذراً، حدث خطأ غير متوقع
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {errorType} - {errorId}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* تفاصيل الخطأ */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  تفاصيل الخطأ:
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {error?.message || 'خطأ غير معروف'}
                </p>
              </div>

              {/* معلومات إضافية */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>تم تسجيل الخطأ تلقائياً</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Zap className="w-4 h-4" />
                  <span>سيتم إصلاحه قريباً</span>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleRetry}
                  className="flex-1"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  إعادة المحاولة
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  className="flex-1"
                  variant="outline"
                >
                  <Home className="w-4 h-4 mr-2" />
                  العودة للرئيسية
                </Button>
                
                <Button 
                  onClick={this.handleReportError}
                  className="flex-1"
                  variant="outline"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  إبلاغ عن الخطأ
                </Button>
              </div>

              {/* معلومات تقنية للمطورين */}
              {process.env.NODE_ENV === 'development' && errorInfo && (
                <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                    معلومات تقنية (للمطورين)
                  </summary>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 font-mono">
                    <pre className="whitespace-pre-wrap">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              {/* نصائح للمستخدم */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  نصائح لحل المشكلة:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• تحديث الصفحة</li>
                  <li>• مسح ذاكرة التخزين المؤقت</li>
                  <li>• التأكد من اتصال الإنترنت</li>
                  <li>• تجربة متصفح مختلف</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook للاستخدام في المكونات الوظيفية
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: ErrorInfo) => {
    // // // console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // إرسال الخطأ إلى خدمة التتبع
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    fetch('/api/error-tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData),
    }).catch(() => {
      // Error logging silently handled
    });
  };

  return { handleError };
};

// مكون للخطأ العام
export const GlobalErrorFallback = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            حدث خطأ في التطبيق
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            عذراً، حدث خطأ غير متوقع
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button onClick={reset} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            إعادة المحاولة
          </Button>
          
          <Button onClick={() => window.location.href = '/'} variant="outline" className="w-full">
            <Home className="w-4 h-4 mr-2" />
            العودة للرئيسية
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};