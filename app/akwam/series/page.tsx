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

export default function AKWAMSeriesPage() {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    section: '0',
    category: '0',
    year: '0',
    language: '0',
    quality: '0',
    rating: '0'
  });

  // Sample series data matching AKWAM structure
  const series = [
    { 
      id: 8957, 
      title: 'مسلسل الدراما الجديد', 
      year: '2025', 
      image: '/placeholder-movie.svg', 
      rating: '8.8', 
      quality: 'HD',
      genres: ['دراما', 'عربي']
    },
    { 
      id: 8956, 
      title: 'Breaking Bad مترجم', 
      year: '2008', 
      image: '/placeholder-movie.svg', 
      rating: '9.5', 
      quality: 'BluRay',
      genres: ['دراما', 'جريمة', 'مترجم']
    },
    { 
      id: 8955, 
      title: 'مسلسل كوميدي مصري', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '7.2', 
      quality: 'WEB-DL',
      genres: ['كوميديا', 'عربي']
    },
    { 
      id: 8954, 
      title: 'Game of Thrones', 
      year: '2011', 
      image: '/placeholder-movie.svg', 
      rating: '9.3', 
      quality: 'BluRay',
      genres: ['فانتازيا', 'اثارة', 'مترجم']
    },
    { 
      id: 8953, 
      title: 'مسلسل تركي رومانسي', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '8.1', 
      quality: 'HD',
      genres: ['رومانسي', 'تركي']
    },
    { 
      id: 8952, 
      title: 'The Crown', 
      year: '2016', 
      image: '/placeholder-movie.svg', 
      rating: '8.7', 
      quality: 'WEB-DL',
      genres: ['دراما', 'تاريخي', 'مترجم']
    }
  ];

  return (
    <AKWAMLayout currentPage="series" pageTitle="اكوام - مسلسلات">
      <FilterForm currentPage="series" onFilterChange={setFilters} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <MovieGrid movies={series} />

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