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

export default function AKWAMMoviesPage() {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    section: '0',
    category: '0',
    year: '0',
    language: '0',
    quality: '0',
    rating: '0'
  });

  // Sample movies data matching AKWAM structure with proper typing
  const movies = [
    { 
      id: 9957, 
      title: 'The Phoenician Scheme', 
      year: '1025', 
      image: '/placeholder-movie.svg', 
      rating: '6.8', 
      quality: 'BluRay',
      genres: ['اكشن', 'مغامرة']
    },
    { 
      id: 9956, 
      title: 'Fool N Final مدبلج', 
      year: '2007', 
      image: '/placeholder-movie.svg', 
      rating: '4.0', 
      quality: 'WEB-DL',
      genres: ['اكشن', 'مدبلج', 'كوميدي']
    },
    { 
      id: 9955, 
      title: 'dil vil pyar vyar مدبلج', 
      year: '2002', 
      image: '/placeholder-movie.svg', 
      rating: '6.0', 
      quality: 'WEB-DL',
      genres: ['رومانسي', 'مدبلج']
    },
    { 
      id: 9954, 
      title: 'فيلم دراما عربية', 
      year: '2025', 
      image: '/placeholder-movie.svg', 
      rating: '8.5', 
      quality: 'BluRay',
      genres: ['دراما', 'عربي']
    },
    { 
      id: 9953, 
      title: 'أكشن هوليوود', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '7.8', 
      quality: 'HD',
      genres: ['اكشن', 'اجنبي']
    },
    { 
      id: 9952, 
      title: 'كوميديا تركية', 
      year: '2024', 
      image: '/placeholder-movie.svg', 
      rating: '7.2', 
      quality: 'WEB-DL',
      genres: ['كوميدي', 'تركي']
    }
  ];

  return (
    <AKWAMLayout currentPage="movies" pageTitle="اكوام - أفلام">
      <FilterForm currentPage="movies" onFilterChange={setFilters} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <MovieGrid movies={movies} />

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