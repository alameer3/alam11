'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  year: string;
  rating: string;
  quality: string;
  image: string;
  genres: string[];
}

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(178px, 1fr))',
      gap: '20px',
      padding: '20px 0'
    }}>
      {movies.map((movie) => (
        <div 
          key={movie.id}
          className="entry-box entry-box-1"
          style={{
            backgroundColor: '#2a2a2a',
            borderRadius: '10px',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(243, 149, 30, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Labels */}
          <div 
            className="labels d-flex"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              right: '10px',
              zIndex: 10,
              justifyContent: 'space-between'
            }}
          >
            <span 
              className="label rating"
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: '#f3951e',
                padding: '4px 8px',
                borderRadius: '5px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              ⭐ {movie.rating}
            </span>
            <span 
              className="label quality"
              style={{
                backgroundColor: 'rgba(243, 149, 30, 0.9)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '5px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {movie.quality}
            </span>
          </div>

          {/* Movie Image */}
          <div className="entry-image" style={{ position: 'relative' }}>
            <Link href={`/akwam/movie/${movie.id}`}>
              <div style={{ position: 'relative', width: '100%', height: '260px' }}>
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="178px"
                />
                {/* Hover overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <div style={{
                    color: 'white',
                    fontSize: '48px'
                  }}>
                    ▶️
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Movie Details */}
          <div className="entry-body" style={{ padding: '15px', textAlign: 'center' }}>
            {/* Action Buttons */}
            <div 
              className="actions d-flex justify-content-center"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}
            >
              <Link 
                href={`/akwam/movie/${movie.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#f3951e',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#f3951e'}
              >
                <div style={{ fontSize: '16px', marginBottom: '5px' }}>▶️</div>
                <div>مشاهدة</div>
              </Link>
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f3951e'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                <div style={{ fontSize: '16px', marginBottom: '5px' }}>➕</div>
                <div>قائمتي</div>
              </button>
            </div>

            {/* Divider */}
            <div 
              style={{
                height: '1px',
                backgroundColor: '#555',
                margin: '12px 0'
              }}
            />

            {/* Movie Title */}
            <h3 style={{
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
              lineHeight: '1.3',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Link 
                href={`/akwam/movie/${movie.id}`}
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f3951e'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                {movie.title}
              </Link>
            </h3>

            {/* Movie Meta */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '5px',
              minHeight: '25px'
            }}>
              <span 
                style={{
                  backgroundColor: '#666',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px'
                }}
              >
                {movie.year}
              </span>
              {movie.genres.slice(0, 2).map((genre, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: '#f3951e',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px'
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}