import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SmartRecommendationSystem from '../../components/ui/SmartRecommendationSystem';

describe('SmartRecommendationSystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders recommendation system header', () => {
    render(<SmartRecommendationSystem />);
    
    expect(screen.getByText('توصيات ذكية')).toBeInTheDocument();
    expect(screen.getByText('شخصية')).toBeInTheDocument();
    expect(screen.getByText('ترند')).toBeInTheDocument();
    expect(screen.getByText('جديد')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<SmartRecommendationSystem />);
    
    expect(screen.getByText('جاري تحليل تفضيلاتك...')).toBeInTheDocument();
  });

  it('displays recommendations after loading', async () => {
    render(<SmartRecommendationSystem />);
    
    await waitFor(() => {
      expect(screen.getByText('The Matrix Reloaded')).toBeInTheDocument();
      expect(screen.getByText('Better Call Saul')).toBeInTheDocument();
    });
  });

  it('handles tab switching', async () => {
    render(<SmartRecommendationSystem />);
    
    await waitFor(() => {
      const trendingTab = screen.getByText('ترند');
      fireEvent.click(trendingTab);
      
      expect(trendingTab).toHaveClass('bg-blue-600');
    });
  });

  it('shows user preferences analysis', async () => {
    render(<SmartRecommendationSystem />);
    
    await waitFor(() => {
      const detailsButton = screen.getByRole('button', { name: /maximize/i });
      fireEvent.click(detailsButton);
      
      expect(screen.getByText('تحليل تفضيلاتك')).toBeInTheDocument();
    });
  });

  it('handles recommendation item click', async () => {
    const mockOnItemClick = jest.fn();
    render(<SmartRecommendationSystem onItemClick={mockOnItemClick} />);
    
    await waitFor(() => {
      const recommendationItem = screen.getByText('The Matrix Reloaded');
      fireEvent.click(recommendationItem);
      
      expect(mockOnItemClick).toHaveBeenCalled();
    });
  });

  it('handles feedback actions', async () => {
    const mockOnFeedback = jest.fn();
    render(<SmartRecommendationSystem onFeedback={mockOnFeedback} />);
    
    await waitFor(() => {
      const likeButtons = screen.getAllByRole('button', { name: /thumbs up/i });
      fireEvent.click(likeButtons[0]);
      
      expect(mockOnFeedback).toHaveBeenCalledWith(expect.any(String), 'like');
    });
  });

  it('displays recommendation reasons', async () => {
    render(<SmartRecommendationSystem />);
    
    await waitFor(() => {
      expect(screen.getByText(/بناءً على إعجابك بـ The Matrix/)).toBeInTheDocument();
    });
  });

  it('shows match scores', async () => {
    render(<SmartRecommendationSystem />);
    
    await waitFor(() => {
      expect(screen.getByText('95% تطابق')).toBeInTheDocument();
    });
  });

  it('handles refresh recommendations', async () => {
    render(<SmartRecommendationSystem />);
    
    await waitFor(() => {
      const refreshButton = screen.getByRole('button', { name: /refresh/i });
      fireEvent.click(refreshButton);
      
      expect(screen.getByText('جاري تحليل تفضيلاتك...')).toBeInTheDocument();
    });
  });

  it('displays empty state when no recommendations', () => {
    render(<SmartRecommendationSystem maxItems={0} />);
    
    expect(screen.getByText('لا توجد توصيات حالياً')).toBeInTheDocument();
  });
});