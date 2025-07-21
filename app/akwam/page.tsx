'use client';

import { useState } from 'react';
import AKWAMLayout from './components/AKWAMLayout';
import Link from 'next/link';

export default function AKWAMHomePage() {
  // Featured content data matching AKWAM structure
  const featuredContent = [
    { 
      id: 9957, 
      title: 'The Phoenician Scheme', 
      year: '1025', 
      image: '/placeholder-movie.svg', 
      rating: '6.8', 
      quality: 'BluRay',
      type: 'movie'
    },
    { 
      id: 9956, 
      title: 'Fool N Final مدبلج', 
      year: '2007', 
      image: '/placeholder-movie.svg', 
      rating: '4.0', 
      quality: 'WEB-DL',
      type: 'movie'
    },
    { 
      id: 9955, 
      title: 'مسلسل درامي جديد', 
      year: '2025', 
      image: '/placeholder-movie.svg', 
      rating: '8.5', 
      quality: 'HD',
      type: 'series'
    }
  ];

  return (
    <AKWAMLayout currentPage="home" pageTitle="اكوام - الصفحة الرئيسية">
      {/* Hero Section */}
      <div 
        style={{
          height: '60vh',
          minHeight: '400px',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(243,149,30,0.3)), url(/home-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}>
            مرحباً بكم في اكوام
          </h1>
          <p style={{
            fontSize: '24px',
            marginBottom: '30px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
          }}>
            أفضل موقع لمشاهدة الأفلام والمسلسلات العربية والأجنبية
          </p>
          
          {/* Quick Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginTop: '30px'
          }}>
            <Link 
              href="/akwam/movies"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.backgroundColor = 'rgba(243,149,30,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎬</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>أفلام</div>
            </Link>
            
            <Link 
              href="/akwam/series"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.backgroundColor = 'rgba(243,149,30,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📺</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>مسلسلات</div>
            </Link>
            
            <Link 
              href="/akwam/shows"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.backgroundColor = 'rgba(243,149,30,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📻</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>تلفزيون</div>
            </Link>
            
            <Link 
              href="/akwam/mix"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.backgroundColor = 'rgba(243,149,30,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎭</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>منوعات</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Content Section */}
      <div style={{ backgroundColor: '#161619', padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{
            color: '#f3951e',
            fontSize: '36px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            المحتوى المميز
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            {featuredContent.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#2a2a2a',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(243, 149, 30, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  height: '200px', 
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: '#f3951e',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ⭐ {item.rating}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(243, 149, 30, 0.9)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {item.quality}
                  </div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#ccc',
                    fontSize: '14px',
                    marginBottom: '15px'
                  }}>
                    {item.year} • {item.type === 'movie' ? 'فيلم' : 'مسلسل'}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      flex: 1,
                      backgroundColor: '#f3951e',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '5px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}>
                      ▶️ مشاهدة
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '1px solid #555',
                      padding: '12px',
                      borderRadius: '5px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s ease, color 0.3s ease'
                    }}>
                      ➕ قائمتي
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{
            color: '#f3951e',
            fontSize: '36px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            استكشف التصنيفات
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              { name: 'أكشن', icon: '💥', count: '1,234' },
              { name: 'كوميديا', icon: '😂', count: '856' },
              { name: 'دراما', icon: '🎭', count: '2,341' },
              { name: 'رعب', icon: '👻', count: '567' },
              { name: 'رومانسي', icon: '💕', count: '789' },
              { name: 'خيال علمي', icon: '🚀', count: '432' }
            ].map((category) => (
              <div
                key={category.name}
                style={{
                  backgroundColor: '#2a2a2a',
                  padding: '25px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.backgroundColor = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>
                  {category.icon}
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  color: '#f3951e',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {category.count} عنصر
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AKWAMLayout>
  );
}