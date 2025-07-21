export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  url?: string;
  stack?: string;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string;
  batchSize: number;
  batchTimeout: number;
  maxRetries: number;
  retryDelay: number;
}

class Logger {
  private config: LoggerConfig;
  private queue: LogEntry[] = [];
  private batchTimeout: NodeJS.Timeout | null = null;
  private retryCount = 0;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableRemote: true,
      remoteEndpoint: '/api/logs',
      batchSize: 10,
      batchTimeout: 5000,
      maxRetries: 3,
      retryDelay: 1000,
      ...config
    };
  }

  private getCurrentContext(): Partial<LogEntry> {
    const context: Partial<LogEntry> = {
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    };

    // إضافة معرف المستخدم إذا كان متاحاً
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        context.userId = userId;
      }
    }

    // إضافة معرف الجلسة
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const sessionId = sessionStorage.getItem('sessionId');
      if (sessionId) {
        context.sessionId = sessionId;
      } else {
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', newSessionId);
        context.sessionId = newSessionId;
      }
    }

    return context;
  }

  private formatMessage(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    const baseContext = this.getCurrentContext();
    
    return {
      level,
      message,
      timestamp: baseContext.timestamp!,
      context: { ...baseContext, ...context },
      userId: baseContext.userId,
      sessionId: baseContext.sessionId,
      userAgent: baseContext.userAgent,
      url: baseContext.url
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private logToConsole(entry: LogEntry): void {
    if (!this.config.enableConsole) return;

    const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
    const levelName = levelNames[entry.level];
    const timestamp = entry.timestamp.toISOString();
    const context = entry.context ? ` | ${JSON.stringify(entry.context)}` : '';

    const logMessage = `[${timestamp}] ${levelName}: ${entry.message}${context}`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        // // console.debug(logMessage);
        break;
      case LogLevel.INFO:
        // // console.info(logMessage);
        break;
      case LogLevel.WARN:
        // // // console.warn(logMessage);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        // // // console.error(logMessage);
        break;
    }
  }

  private async sendToRemote(entries: LogEntry[]): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) return;

    try {
      const response = await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs: entries }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      this.retryCount = 0; // إعادة تعيين عداد المحاولات
    } catch (error) {
      // // // console.error('Failed to send logs to remote:', error);
      
      if (this.retryCount < this.config.maxRetries) {
        this.retryCount++;
        setTimeout(() => {
          this.sendToRemote(entries);
        }, this.config.retryDelay * this.retryCount);
      }
    }
  }

  private scheduleBatchSend(): void {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }

    this.batchTimeout = setTimeout(() => {
      this.flushQueue();
    }, this.config.batchTimeout);
  }

  private flushQueue(): void {
    if (this.queue.length === 0) return;

    const entries = [...this.queue];
    this.queue = [];

    // إرسال إلى الخادم
    this.sendToRemote(entries);
  }

  private addToQueue(entry: LogEntry): void {
    this.queue.push(entry);

    // إرسال فوري إذا وصلنا للحد الأقصى
    if (this.queue.length >= this.config.batchSize) {
      this.flushQueue();
    } else {
      this.scheduleBatchSend();
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry = this.formatMessage(LogLevel.DEBUG, message, context);
    this.logToConsole(entry);
    this.addToQueue(entry);
  }

  info(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry = this.formatMessage(LogLevel.INFO, message, context);
    this.logToConsole(entry);
    this.addToQueue(entry);
  }

  warn(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry = this.formatMessage(LogLevel.WARN, message, context);
    this.logToConsole(entry);
    this.addToQueue(entry);
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const errorContext = {
      ...context,
      stack: error?.stack,
      errorName: error?.name,
      errorMessage: error?.message
    };

    const entry = this.formatMessage(LogLevel.ERROR, message, errorContext);
    this.logToConsole(entry);
    this.addToQueue(entry);
  }

  fatal(message: string, error?: Error, context?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.FATAL)) return;

    const errorContext = {
      ...context,
      stack: error?.stack,
      errorName: error?.name,
      errorMessage: error?.message
    };

    const entry = this.formatMessage(LogLevel.FATAL, message, errorContext);
    this.logToConsole(entry);
    this.addToQueue(entry);
  }

  // تسجيل أداء العمليات
  performance(operation: string, duration: number, context?: Record<string, any>): void {
    const message = `Performance: ${operation} took ${duration}ms`;
    this.info(message, { ...context, operation, duration });
  }

  // تسجيل أحداث المستخدم
  userEvent(event: string, userId: string, context?: Record<string, any>): void {
    const message = `User Event: ${event}`;
    this.info(message, { ...context, event, userId });
  }

  // تسجيل أخطاء API
  apiError(endpoint: string, status: number, message: string, context?: Record<string, any>): void {
    const logMessage = `API Error: ${endpoint} returned ${status}`;
    this.error(logMessage, undefined, { ...context, endpoint, status, apiMessage: message });
  }

  // تسجيل أخطاء الشبكة
  networkError(url: string, error: Error, context?: Record<string, any>): void {
    const message = `Network Error: Failed to fetch ${url}`;
    this.error(message, error, { ...context, url });
  }

  // تسجيل أخطاء التطبيق
  appError(component: string, error: Error, context?: Record<string, any>): void {
    const message = `App Error in ${component}`;
    this.error(message, error, { ...context, component });
  }

  // تسجيل معلومات الأمان
  security(event: string, userId?: string, context?: Record<string, any>): void {
    const message = `Security: ${event}`;
    this.warn(message, { ...context, event, userId });
  }

  // تسجيل معلومات الأعمال
  business(event: string, data: Record<string, any>, context?: Record<string, any>): void {
    const message = `Business: ${event}`;
    this.info(message, { ...context, event, data });
  }

  // إجبار إرسال جميع الرسائل المعلقة
  flush(): void {
    this.flushQueue();
  }

  // تحديث الإعدادات
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // الحصول على إحصائيات التسجيل
  getStats(): { queueSize: number; retryCount: number } {
    return {
      queueSize: this.queue.length,
      retryCount: this.retryCount
    };
  }
}

// إنشاء مثيل افتراضي
export const logger = new Logger();

// دوال مساعدة للاستخدام السريع
export const logDebug = (message: string, context?: Record<string, any>) => logger.debug(message, context);
export const logInfo = (message: string, context?: Record<string, any>) => logger.info(message, context);
export const logWarn = (message: string, context?: Record<string, any>) => logger.warn(message, context);
export const logError = (message: string, error?: Error, context?: Record<string, any>) => logger.error(message, error, context);
export const logFatal = (message: string, error?: Error, context?: Record<string, any>) => logger.fatal(message, error, context);

// Hook للاستخدام في React
export const useLogger = () => {
  return {
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    fatal: logger.fatal.bind(logger),
    performance: logger.performance.bind(logger),
    userEvent: logger.userEvent.bind(logger),
    apiError: logger.apiError.bind(logger),
    networkError: logger.networkError.bind(logger),
    appError: logger.appError.bind(logger),
    security: logger.security.bind(logger),
    business: logger.business.bind(logger),
    flush: logger.flush.bind(logger)
  };
};

// Middleware للاستخدام مع Next.js
export const createLoggerMiddleware = (config?: Partial<LoggerConfig>) => {
  const middlewareLogger = new Logger(config);
  
  return (req: any, res: any, next: any) => {
    const startTime = new Date("2025-07-21T14:00:00Z").getTime();
    
    // تسجيل بداية الطلب
    middlewareLogger.info('Request started', {
      method: req.method,
      url: req.url,
      userAgent: req.headers['user-agent'],
      ip: req.ip
    });

    // تسجيل انتهاء الطلب
    res.on('finish', () => {
      const duration = new Date("2025-07-21T14:00:00Z").getTime() - startTime;
      middlewareLogger.info('Request finished', {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration
      });
    });

    next();
  };
};

// تصدير الأنواع
export { Logger };