'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function AKWAMMoviesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample movies data matching AKWAM structure
  const movies = [
    { id: 1, title: 'فيلم أكشن 2025', year: '2025', image: '/placeholder-movie.svg', rating: '8.5', category: 'action' },
    { id: 2, title: 'كوميديا عربية', year: '2025', image: '/placeholder-movie.svg', rating: '7.8', category: 'comedy' },
    { id: 3, title: 'دراما رومانسية', year: '2024', image: '/placeholder-movie.svg', rating: '9.2', category: 'drama' },
    { id: 4, title: 'مغامرات الصحراء', year: '2024', image: '/placeholder-movie.svg', rating: '8.1', category: 'adventure' },
    { id: 5, title: 'إثارة وتشويق', year: '2025', image: '/placeholder-movie.svg', rating: '8.7', category: 'thriller' },
    { id: 6, title: 'خيال علمي', year: '2025', image: '/placeholder-movie.svg', rating: '7.9', category: 'scifi' },
  ];

  const categories = [
    { id: 'all', name: 'جميع الأفلام' },
    { id: 'action', name: 'أكشن' },
    { id: 'comedy', name: 'كوميديا' },
    { id: 'drama', name: 'دراما' },
    { id: 'adventure', name: 'مغامرات' },
    { id: 'thriller', name: 'إثارة' },
    { id: 'scifi', name: 'خيال علمي' },
  ];

  const filteredMovies = selectedCategory === 'all' 
    ? movies 
    : movies.filter(movie => movie.category === selectedCategory);

  return (
    <div className="akwam-movies-page" style={{ minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
      {/* Site Overlay */}
      <span className={`site-overlay ${isMenuOpen ? 'show' : ''}`} onClick={() => setIsMenuOpen(false)}></span>

      {/* Main Menu */}
      <div className={`main-menu ${isMenuOpen ? 'show' : ''}`} style={{
        position: 'fixed',
        right: 0,
        left: 0,
        bottom: 0,
        top: '70px',
        backgroundColor: '#27272c',
        borderTop: '1px solid #111114',
        zIndex: 45,
        opacity: isMenuOpen ? 1 : 0,
        visibility: isMenuOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ margin: 'auto 0', width: '100%' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/akwam/movies" style={{
                color: '#f3951e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px',
                fontSize: '22px',
                textDecoration: 'none'
              }}>
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>🎬</div>
                <div>أفلام</div>
              </Link>
              <Link href="/akwam/series" style={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px',
                fontSize: '22px',
                textDecoration: 'none'
              }}>
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>📺</div>
                <div>مسلسلات</div>
              </Link>
              <Link href="/akwam/shows" style={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px',
                fontSize: '22px',
                textDecoration: 'none'
              }}>
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>📻</div>
                <div>تلفزيون</div>
              </Link>
              <Link href="/akwam/mix" style={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px',
                fontSize: '22px',
                textDecoration: 'none'
              }}>
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>🎭</div>
                <div>منوعات</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: '70px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(6px)',
        zIndex: 50
      }}>
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', height: '100%' }}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '10px'
            }}
          >
            ☰
          </button>
          
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Link href="/akwam" style={{ 
              color: '#f3951e', 
              fontSize: '24px', 
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              اكوام
            </Link>
          </div>
          
          <div>
            <Link href="/search" style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
              🔍
            </Link>
          </div>
        </div>
      </header>

      {/* Search Box */}
      <div style={{
        marginTop: '70px',
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <form style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="ابحث عن فيلم..." 
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '25px',
                border: '1px solid #555',
                backgroundColor: '#2a2a2a',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '12px 25px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: '#f3951e',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              بحث
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ padding: '20px 0', minHeight: 'calc(100vh - 140px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Page Title */}
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h1 style={{ 
              color: '#f3951e', 
              fontSize: '36px', 
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              أفلام
            </h1>
            <p style={{ color: '#ccc', fontSize: '18px' }}>
              اكتشف أحدث الأفلام العربية والعالمية
            </p>
          </div>

          {/* Category Filter */}
          <div style={{ 
            marginBottom: '30px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '10px',
            justifyContent: 'center'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '20px',
                  border: '1px solid #555',
                  backgroundColor: selectedCategory === category.id ? '#f3951e' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : '#ccc',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Movies Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {filteredMovies.map((movie) => (
              <div 
                key={movie.id}
                style={{
                  backgroundColor: '#2a2a2a',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(243, 149, 30, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    width={200}
                    height={280}
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: '#f3951e',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ⭐ {movie.rating}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(243, 149, 30, 0.9)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {movie.year}
                  </div>
                </div>
                <div style={{ padding: '15px' }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    lineHeight: '1.2'
                  }}>
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px',
            marginTop: '40px'
          }}>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid #555',
                  backgroundColor: currentPage === page ? '#f3951e' : 'transparent',
                  color: currentPage === page ? 'white' : '#ccc',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}