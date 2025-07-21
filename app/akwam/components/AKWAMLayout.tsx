'use client';

import Link from 'next/link';
import { useState, ReactNode } from 'react';

interface AKWAMLayoutProps {
  children: ReactNode;
  currentPage?: string;
  pageTitle?: string;
}

export default function AKWAMLayout({ children, currentPage = '', pageTitle = 'اكوام' }: AKWAMLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="akwam-layout" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      {/* Site Overlay */}
      <span 
        className={`site-overlay ${isMenuOpen ? 'show' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 40,
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease'
        }}
      />

      {/* Main Menu */}
      <div 
        className={`main-menu ${isMenuOpen ? 'show' : ''}`}
        style={{
          position: 'fixed',
          right: 0,
          left: 0,
          bottom: 0,
          top: '70px',
          backgroundColor: '#27272c',
          borderTop: '1px solid #111114',
          zIndex: 45,
          overflowY: 'auto',
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ margin: 'auto 0', width: '100%' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
              <Link 
                href="/akwam/movies" 
                style={{
                  color: currentPage === 'movies' ? '#f3951e' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '20px',
                  fontSize: '22px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f3951e'}
                onMouseLeave={(e) => e.currentTarget.style.color = currentPage === 'movies' ? '#f3951e' : 'white'}
              >
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>
                  <i className="icon-video-camera" style={{ fontFamily: 'akwam-icons' }}>🎬</i>
                </div>
                <div>أفلام</div>
              </Link>

              <Link 
                href="/akwam/series" 
                style={{
                  color: currentPage === 'series' ? '#f3951e' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '20px',
                  fontSize: '22px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f3951e'}
                onMouseLeave={(e) => e.currentTarget.style.color = currentPage === 'series' ? '#f3951e' : 'white'}
              >
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>
                  <i className="icon-monitor" style={{ fontFamily: 'akwam-icons' }}>📺</i>
                </div>
                <div>مسلسلات</div>
              </Link>

              <Link 
                href="/akwam/shows" 
                style={{
                  color: currentPage === 'shows' ? '#f3951e' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '20px',
                  fontSize: '22px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f3951e'}
                onMouseLeave={(e) => e.currentTarget.style.color = currentPage === 'shows' ? '#f3951e' : 'white'}
              >
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>
                  <i className="icon-tv" style={{ fontFamily: 'akwam-icons' }}>📻</i>
                </div>
                <div>تلفزيون</div>
              </Link>

              <Link 
                href="/akwam/mix" 
                style={{
                  color: currentPage === 'mix' ? '#f3951e' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '20px',
                  fontSize: '22px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f3951e'}
                onMouseLeave={(e) => e.currentTarget.style.color = currentPage === 'mix' ? '#f3951e' : 'white'}
              >
                <div style={{ fontSize: '48px', marginLeft: '12px' }}>
                  <i className="icon-mix" style={{ fontFamily: 'akwam-icons' }}>🎭</i>
                </div>
                <div>منوعات</div>
              </Link>
            </div>
          </div>
          
          {/* Social Navigation */}
          <nav style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <a href="/" style={{ 
              width: '40px', 
              height: '40px', 
              lineHeight: '40px', 
              borderRadius: '50%', 
              border: '1px solid #777', 
              textAlign: 'center', 
              color: '#777', 
              margin: '0 8px', 
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f3951e';
              e.currentTarget.style.color = '#f3951e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#777';
              e.currentTarget.style.color = '#777';
            }}
            >
              🏠
            </a>
            <a href="https://www.facebook.com" target="_blank" style={{ 
              width: '40px', 
              height: '40px', 
              lineHeight: '40px', 
              borderRadius: '50%', 
              border: '1px solid #777', 
              textAlign: 'center', 
              color: '#777', 
              margin: '0 8px', 
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f3951e';
              e.currentTarget.style.color = '#f3951e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#777';
              e.currentTarget.style.color = '#777';
            }}
            >
              📘
            </a>
            <a href="https://www.youtube.com" target="_blank" style={{ 
              width: '40px', 
              height: '40px', 
              lineHeight: '40px', 
              borderRadius: '50%', 
              border: '1px solid #777', 
              textAlign: 'center', 
              color: '#777', 
              margin: '0 8px', 
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f3951e';
              e.currentTarget.style.color = '#f3951e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#777';
              e.currentTarget.style.color = '#777';
            }}
            >
              📺
            </a>
            <a href="/contactus" style={{ 
              width: '40px', 
              height: '40px', 
              lineHeight: '40px', 
              borderRadius: '50%', 
              border: '1px solid #777', 
              textAlign: 'center', 
              color: '#777', 
              margin: '0 8px', 
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f3951e';
              e.currentTarget.style.color = '#f3951e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#777';
              e.currentTarget.style.color = '#777';
            }}
            >
              ✉️
            </a>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: '70px',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 50,
        borderBottom: '1px solid #333'
      }}>
        <div style={{ 
          padding: '0 20px', 
          display: 'flex', 
          alignItems: 'center', 
          height: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '18px'
            }}
          >
            <span style={{
              width: '26px',
              height: '2px',
              backgroundColor: isMenuOpen ? '#f3951e' : 'white',
              position: 'relative',
              display: 'inline-block',
              transition: 'background-color 0.3s ease',
              '::before': {
                content: '""',
                position: 'absolute',
                right: 0,
                width: '100%',
                height: '2px',
                backgroundColor: isMenuOpen ? '#f3951e' : 'white',
                top: '-6px',
                transition: 'transform 0.3s ease, top 0.3s ease',
                transform: isMenuOpen ? 'rotate(-45deg)' : 'none',
                top: isMenuOpen ? 0 : '-6px'
              },
              '::after': {
                content: '""',
                position: 'absolute',
                right: 0,
                width: '100%',
                height: '2px',
                backgroundColor: isMenuOpen ? '#f3951e' : 'white',
                bottom: '-6px',
                transition: 'transform 0.3s ease, bottom 0.3s ease',
                transform: isMenuOpen ? 'rotate(45deg)' : 'none',
                bottom: isMenuOpen ? 0 : '-6px'
              }
            }}>
            </span>
            <div style={{ marginRight: '12px', color: isMenuOpen ? '#f3951e' : 'white' }}>
              الأقسام
            </div>
          </button>
          
          {/* Logo */}
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Link href="/akwam" style={{ 
              color: '#f3951e', 
              fontSize: '28px', 
              fontWeight: 'bold',
              textDecoration: 'none',
              fontFamily: 'akoam, Arial, sans-serif'
            }}>
              اكوام
            </Link>
          </div>
          
          {/* Search and User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link href="/search" style={{ 
              color: 'white', 
              fontSize: '20px', 
              textDecoration: 'none',
              padding: '8px'
            }}>
              🔍
            </Link>
            <Link href="/recent" style={{ 
              color: 'white', 
              fontSize: '16px', 
              textDecoration: 'none',
              padding: '8px 12px',
              backgroundColor: 'rgba(243, 149, 30, 0.2)',
              borderRadius: '5px',
              border: '1px solid #f3951e'
            }}>
              أضيف حديثا
            </Link>
            <Link href="/login" style={{ 
              color: 'white', 
              fontSize: '20px', 
              textDecoration: 'none',
              padding: '8px'
            }}>
              👤
            </Link>
          </div>
        </div>
      </header>

      {/* Search Box */}
      <div style={{
        marginTop: '70px',
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <form style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="ابحث هنا" 
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '25px',
                border: '1px solid #555',
                backgroundColor: '#2a2a2a',
                color: 'white',
                fontSize: '16px',
                outline: 'none'
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
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8851a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3951e'}
            >
              بحث
            </button>
          </form>
        </div>
      </div>

      {/* Page Content */}
      <main style={{ paddingTop: '20px' }}>
        {children}
      </main>
    </div>
  );
}