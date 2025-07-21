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

export default function AKWAMShowsPage() {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    section: '0',
    category: '0',
    year: '0',
    language: '0',
    quality: '0',
    rating: '0'
  });

  // Sample shows data matching AKWAM structure
  const shows = [
    { 
      id: 7957, 
      title: 'برنامج البرايم تايم', 
      year: '2025', 
      image: '/placeholder-movie.svg', 
      rating: '7.5', 
      quality: 'HD',
      genres: ['منوعات', 'عربي']
    },
    { 
      id: 7956, 
      title: 'توك شو مساء الخير', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '8.2', 
      quality: 'HD',
      genres: ['منوعات', 'عربي']
    },
    { 
      id: 7955, 
      title: 'برنامج الطبخ المميز', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '6.8', 
      quality: 'WEB-DL',
      genres: ['طبخ', 'عربي']
    },
    { 
      id: 7954, 
      title: 'الأخبار المسائية', 
      year: '2025', 
      image: '/placeholder-movie.svg', 
      rating: '7.1', 
      quality: 'HD',
      genres: ['أخبار', 'عربي']
    },
    { 
      id: 7953, 
      title: 'برنامج رياضي', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '7.9', 
      quality: 'HD',
      genres: ['رياضة', 'عربي']
    },
    { 
      id: 7952, 
      title: 'مسابقة الذكاء', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '8.0', 
      quality: 'WEB-DL',
      genres: ['مسابقات', 'عربي']
    }
  ];

  return (
    <AKWAMLayout currentPage="shows" pageTitle="اكوام - تلفزيون">
      <FilterForm currentPage="shows" onFilterChange={setFilters} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <MovieGrid movies={shows} />

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