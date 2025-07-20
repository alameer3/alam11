import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AISearchSystem from '../../components/ui/AISearchSystem';

describe('AISearchSystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(<AISearchSystem />);
    
    expect(screen.getByPlaceholderText('ابحث عن فيلم، مسلسل، برنامج...')).toBeInTheDocument();
  });

  it('handles search query input', () => {
    const mockOnSearch = jest.fn();
    render(<AISearchSystem onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('ابحث عن فيلم، مسلسل، برنامج...');
    fireEvent.change(searchInput, { target: { value: 'The Matrix' } });
    
    expect(searchInput).toHaveValue('The Matrix');
  });

  it('handles search submission', async () => {
    const mockOnSearch = jest.fn();
    render(<AISearchSystem onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('ابحث عن فيلم، مسلسل، برنامج...');
    const searchButton = screen.getByText('بحث');
    
    fireEvent.change(searchInput, { target: { value: 'The Matrix' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('جاري البحث...')).toBeInTheDocument();
    });
  });

  it('shows advanced filters when enabled', () => {
    render(<AISearchSystem showAdvancedFilters={true} />);
    
    expect(screen.getByText('فلاتر متقدمة')).toBeInTheDocument();
    expect(screen.getByText('النوع')).toBeInTheDocument();
    expect(screen.getByText('الجودة')).toBeInTheDocument();
  });

  it('handles voice search when enabled', async () => {
    render(<AISearchSystem enableVoiceSearch={true} />);
    
    const voiceButton = screen.getByRole('button', { name: /microphone/i });
    fireEvent.click(voiceButton);
    
    await waitFor(() => {
      expect(screen.getByText('جاري البحث...')).toBeInTheDocument();
    });
  });

  it('displays search results correctly', async () => {
    render(<AISearchSystem />);
    
    const searchInput = screen.getByPlaceholderText('ابحث عن فيلم، مسلسل، برنامج...');
    fireEvent.change(searchInput, { target: { value: 'The Matrix' } });
    
    await waitFor(() => {
      expect(screen.getByText('The Matrix')).toBeInTheDocument();
    });
  });

  it('handles filter changes', () => {
    render(<AISearchSystem showAdvancedFilters={true} />);
    
    const typeFilter = screen.getByDisplayValue('الكل');
    fireEvent.change(typeFilter, { target: { value: 'movie' } });
    
    expect(typeFilter).toHaveValue('movie');
  });

  it('shows AI suggestions when enabled', () => {
    render(<AISearchSystem enableAISuggestions={true} />);
    
    const searchInput = screen.getByPlaceholderText('ابحث عن فيلم، مسلسل، برنامج...');
    fireEvent.change(searchInput, { target: { value: 'أفلام' } });
    
    expect(screen.getByText('البحث الذكي')).toBeInTheDocument();
  });
});