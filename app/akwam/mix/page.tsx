'use client';

import { useState } from 'react';
import AKWAMLayout from '../components/AKWAMLayout';
import FilterForm from '../components/FilterForm';
import MovieGrid from '../components/MovieGrid';

interface FilterData {
  section: string;
  category: string;
  year: string;
  language: string;
  quality: string;
  rating: string;
}

export default function AKWAMMixPage() {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    section: '0',
    category: '0',
    year: '0',
    language: '0',
    quality: '0',
    rating: '0'
  });

  // Sample mix content data matching AKWAM structure
  const mixContent = [
    { 
      id: 6957, 
      title: 'وثائقي عن الطبيعة', 
      year: '2025', 
      image: '/placeholder-movie.svg', 
      rating: '8.4', 
      quality: '4K',
      genres: ['وثائقي', 'طبيعة']
    },
    { 
      id: 6956, 
      title: 'حفلة موسيقية شرقية', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '7.8', 
      quality: 'HD',
      genres: ['موسيقى', 'عربي']
    },
    { 
      id: 6955, 
      title: 'عرض مسرحي كوميدي', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '8.1', 
      quality: 'HD',
      genres: ['مسرح', 'كوميدي']
    },
    { 
      id: 6954, 
      title: 'برنامج سفر وسياحة', 
      year: '2025', 
      image: '/placeholder-movie.svg', 
      rating: '7.6', 
      quality: 'HD',
      genres: ['سفر', 'وثائقي']
    },
    { 
      id: 6953, 
      title: 'عرض ستاند أب كوميدي', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '8.9', 
      quality: 'WEB-DL',
      genres: ['كوميدي', 'عربي']
    },
    { 
      id: 6952, 
      title: 'وثائقي تاريخي', 
      year: '2023', 
      image: '/placeholder-movie.svg', 
      rating: '8.7', 
      quality: 'BluRay',
      genres: ['وثائقي', 'تاريخي']
    }
  ];

  return (
    <AKWAMLayout currentPage="mix" pageTitle="اكوام - منوعات">
      <FilterForm currentPage="mix" onFilterChange={setFilters} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <MovieGrid movies={mixContent} />

        {/* Pagination */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPageNum(page)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #555',
                backgroundColor: currentPageNum === page ? '#f3951e' : 'transparent',
                color: currentPageNum === page ? 'white' : '#ccc',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (currentPageNum !== page) {
                  e.currentTarget.style.backgroundColor = 'rgba(243, 149, 30, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPageNum !== page) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </AKWAMLayout>
  );
}