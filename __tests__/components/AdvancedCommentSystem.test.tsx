import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdvancedCommentSystem from '../../components/ui/AdvancedCommentSystem';

describe('AdvancedCommentSystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders comment system header', () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" />);
    
    expect(screen.getByText('التعليقات والتقييمات')).toBeInTheDocument();
  });

  it('shows sentiment analysis when enabled', () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" showSentiment={true} />);
    
    expect(screen.getByText('تحليل المشاعر')).toBeInTheDocument();
    expect(screen.getByText('إيجابي')).toBeInTheDocument();
    expect(screen.getByText('محايد')).toBeInTheDocument();
    expect(screen.getByText('سلبي')).toBeInTheDocument();
  });

  it('handles new comment submission', async () => {
    const mockOnCommentSubmit = jest.fn();
    render(<AdvancedCommentSystem contentId="test" contentType="movie" onCommentSubmit={mockOnCommentSubmit} />);
    
    const commentTextarea = screen.getByPlaceholderText('اكتب تعليقك هنا...');
    const submitButton = screen.getByText('إرسال التعليق');
    
    fireEvent.change(commentTextarea, { target: { value: 'تعليق رائع!' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnCommentSubmit).toHaveBeenCalled();
    });
  });

  it('handles rating submission', async () => {
    const mockOnRatingSubmit = jest.fn();
    render(<AdvancedCommentSystem contentId="test" contentType="movie" onRatingSubmit={mockOnRatingSubmit} showRating={true} />);
    
    const starButtons = screen.getAllByRole('button', { name: /star/i });
    fireEvent.click(starButtons[4]); // 5 stars
    
    const ratingButton = screen.getByText('إرسال التقييم');
    fireEvent.click(ratingButton);
    
    await waitFor(() => {
      expect(mockOnRatingSubmit).toHaveBeenCalledWith(5);
    });
  });

  it('displays comments after loading', async () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" />);
    
    await waitFor(() => {
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
      expect(screen.getByText('فيلم رائع جداً! المؤثرات البصرية مذهلة والقصة مشوقة. أنصح الجميع بمشاهدته.')).toBeInTheDocument();
    });
  });

  it('handles comment like/dislike', async () => {
    const mockOnCommentLike = jest.fn();
    render(<AdvancedCommentSystem contentId="test" contentType="movie" onCommentLike={mockOnCommentLike} />);
    
    await waitFor(() => {
      const likeButtons = screen.getAllByRole('button', { name: /thumbs up/i });
      fireEvent.click(likeButtons[0]);
      
      expect(mockOnCommentLike).toHaveBeenCalledWith(expect.any(String), 'like');
    });
  });

  it('handles comment reply', async () => {
    const mockOnCommentReply = jest.fn();
    render(<AdvancedCommentSystem contentId="test" contentType="movie" onCommentReply={mockOnCommentReply} />);
    
    await waitFor(() => {
      const replyButtons = screen.getAllByText('رد');
      fireEvent.click(replyButtons[0]);
      
      const replyTextarea = screen.getByPlaceholderText('اكتب ردك...');
      fireEvent.change(replyTextarea, { target: { value: 'رد رائع!' } });
      
      const sendButton = screen.getByText('إرسال');
      fireEvent.click(sendButton);
      
      expect(mockOnCommentReply).toHaveBeenCalled();
    });
  });

  it('handles comment sorting', async () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" />);
    
    await waitFor(() => {
      const sortSelect = screen.getByDisplayValue('الأحدث');
      fireEvent.change(sortSelect, { target: { value: 'oldest' } });
      
      expect(sortSelect).toHaveValue('oldest');
    });
  });

  it('handles comment filtering', async () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" />);
    
    await waitFor(() => {
      const filterSelect = screen.getByDisplayValue('الكل');
      fireEvent.change(filterSelect, { target: { value: 'positive' } });
      
      expect(filterSelect).toHaveValue('positive');
    });
  });

  it('shows comment statistics', async () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" />);
    
    await waitFor(() => {
      expect(screen.getByText(/3 تعليق/)).toBeInTheDocument();
    });
  });

  it('displays user roles correctly', async () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" />);
    
    await waitFor(() => {
      expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
      expect(screen.getByText('محمد علي')).toBeInTheDocument();
    });
  });

  it('handles empty comments state', () => {
    render(<AdvancedCommentSystem contentId="test" contentType="movie" maxComments={0} />);
    
    expect(screen.getByText('لا توجد تعليقات حالياً')).toBeInTheDocument();
  });
});