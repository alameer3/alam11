import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdvancedNotificationSystem from '../../components/ui/AdvancedNotificationSystem';

describe('AdvancedNotificationSystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notification system header', () => {
    render(<AdvancedNotificationSystem />);
    
    expect(screen.getByText('الإشعارات')).toBeInTheDocument();
  });

  it('shows unread count badge', () => {
    render(<AdvancedNotificationSystem />);
    
    expect(screen.getByText('3')).toBeInTheDocument(); // Mock unread count
  });

  it('displays notification tabs', () => {
    render(<AdvancedNotificationSystem />);
    
    expect(screen.getByText('الكل (6)')).toBeInTheDocument();
    expect(screen.getByText('غير مقروء (3)')).toBeInTheDocument();
    expect(screen.getByText('مهم (2)')).toBeInTheDocument();
    expect(screen.getByText('مثبت (1)')).toBeInTheDocument();
  });

  it('handles tab switching', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      const unreadTab = screen.getByText('غير مقروء (3)');
      fireEvent.click(unreadTab);
      
      expect(unreadTab).toHaveClass('bg-blue-600');
    });
  });

  it('shows notification settings when clicked', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(settingsButton);
      
      expect(screen.getByText('إعدادات الإشعارات')).toBeInTheDocument();
    });
  });

  it('handles mark all as read', async () => {
    const mockOnMarkAllRead = jest.fn();
    render(<AdvancedNotificationSystem onMarkAllRead={mockOnMarkAllRead} />);
    
    await waitFor(() => {
      const markAllReadButton = screen.getByText('تحديد الكل كمقروء');
      fireEvent.click(markAllReadButton);
      
      expect(mockOnMarkAllRead).toHaveBeenCalled();
    });
  });

  it('displays notifications after loading', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      expect(screen.getByText('فيلم جديد في الترند')).toBeInTheDocument();
      expect(screen.getByText('توصية شخصية لك')).toBeInTheDocument();
    });
  });

  it('handles notification click', async () => {
    const mockOnNotificationClick = jest.fn();
    render(<AdvancedNotificationSystem onNotificationClick={mockOnNotificationClick} />);
    
    await waitFor(() => {
      const notification = screen.getByText('فيلم جديد في الترند');
      fireEvent.click(notification);
      
      expect(mockOnNotificationClick).toHaveBeenCalled();
    });
  });

  it('handles notification actions', async () => {
    const mockOnNotificationAction = jest.fn();
    render(<AdvancedNotificationSystem onNotificationAction={mockOnNotificationAction} />);
    
    await waitFor(() => {
      const actionButtons = screen.getAllByText('شاهد الآن');
      fireEvent.click(actionButtons[0]);
      
      expect(mockOnNotificationAction).toHaveBeenCalledWith(expect.any(String), 'watch');
    });
  });

  it('handles notification dismiss', async () => {
    const mockOnNotificationDismiss = jest.fn();
    render(<AdvancedNotificationSystem onNotificationDismiss={mockOnNotificationDismiss} />);
    
    await waitFor(() => {
      const dismissButtons = screen.getAllByRole('button', { name: /close/i });
      fireEvent.click(dismissButtons[0]);
      
      expect(mockOnNotificationDismiss).toHaveBeenCalled();
    });
  });

  it('handles notification pin/unpin', async () => {
    const mockOnNotificationPin = jest.fn();
    render(<AdvancedNotificationSystem onNotificationPin={mockOnNotificationPin} />);
    
    await waitFor(() => {
      const pinButtons = screen.getAllByRole('button', { name: /pin/i });
      fireEvent.click(pinButtons[0]);
      
      expect(mockOnNotificationPin).toHaveBeenCalled();
    });
  });

  it('handles search functionality', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('البحث في الإشعارات...');
      fireEvent.change(searchInput, { target: { value: 'فيلم' } });
      
      expect(searchInput).toHaveValue('فيلم');
    });
  });

  it('handles priority filtering', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      const priorityFilter = screen.getByDisplayValue('كل الأولويات');
      fireEvent.change(priorityFilter, { target: { value: 'urgent' } });
      
      expect(priorityFilter).toHaveValue('urgent');
    });
  });

  it('handles category filtering', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      const categoryFilter = screen.getByDisplayValue('كل الفئات');
      fireEvent.change(categoryFilter, { target: { value: 'content' } });
      
      expect(categoryFilter).toHaveValue('content');
    });
  });

  it('handles sorting', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      const sortSelect = screen.getByDisplayValue('الأحدث');
      fireEvent.change(sortSelect, { target: { value: 'priority' } });
      
      expect(sortSelect).toHaveValue('priority');
    });
  });

  it('handles clear all notifications', async () => {
    const mockOnClearAll = jest.fn();
    render(<AdvancedNotificationSystem onClearAll={mockOnClearAll} />);
    
    await waitFor(() => {
      const clearAllButton = screen.getByText('مسح الكل');
      fireEvent.click(clearAllButton);
      
      expect(mockOnClearAll).toHaveBeenCalled();
    });
  });

  it('displays notification priorities correctly', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      expect(screen.getByText('عالية')).toBeInTheDocument();
      expect(screen.getByText('متوسطة')).toBeInTheDocument();
      expect(screen.getByText('عاجل')).toBeInTheDocument();
    });
  });

  it('shows notification timestamps', async () => {
    render(<AdvancedNotificationSystem />);
    
    await waitFor(() => {
      expect(screen.getByText('منذ 5 دقائق')).toBeInTheDocument();
      expect(screen.getByText('منذ 15 دقيقة')).toBeInTheDocument();
    });
  });

  it('handles empty notifications state', () => {
    render(<AdvancedNotificationSystem maxNotifications={0} />);
    
    expect(screen.getByText('لا توجد إشعارات')).toBeInTheDocument();
  });
});