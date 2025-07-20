import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PerformanceOptimizer from '../../components/ui/PerformanceOptimizer';

// Mock performance API
const mockPerformance = {
  timing: {
    loadEventEnd: 1000,
    navigationStart: 500
  },
  memory: {
    usedJSHeapSize: 50000000,
    jsHeapSizeLimit: 100000000
  },
  now: jest.fn(() => 1000)
};

Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true
});

// Mock navigator
Object.defineProperty(navigator, 'onLine', {
  value: true,
  writable: true
});

describe('PerformanceOptimizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders performance optimization button', () => {
    render(<PerformanceOptimizer showMetrics={false} />);
    
    expect(screen.getByText('تحسين الأداء')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows metrics when showMetrics is true', () => {
    render(<PerformanceOptimizer showMetrics={true} />);
    
    expect(screen.getByText('أداء النظام')).toBeInTheDocument();
    expect(screen.getByText('تقييم الأداء')).toBeInTheDocument();
  });

  it('handles manual optimization', async () => {
    const mockOptimize = jest.fn();
    render(<PerformanceOptimizer showMetrics={false} onMetricsUpdate={mockOptimize} />);
    
    const optimizeButton = screen.getByText('تحسين الأداء');
    fireEvent.click(optimizeButton);
    
    await waitFor(() => {
      expect(screen.getByText('جاري التحسين...')).toBeInTheDocument();
    });
  });

  it('displays performance metrics correctly', () => {
    render(<PerformanceOptimizer showMetrics={true} />);
    
    expect(screen.getByText('وقت التحميل')).toBeInTheDocument();
    expect(screen.getByText('استخدام الذاكرة')).toBeInTheDocument();
    expect(screen.getByText('سرعة الشبكة')).toBeInTheDocument();
  });

  it('handles offline state', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true
    });
    
    render(<PerformanceOptimizer showMetrics={true} />);
    
    expect(screen.getByText('سرعة الشبكة')).toBeInTheDocument();
  });
});