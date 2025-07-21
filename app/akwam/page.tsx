'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AKWAMHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>اكوام | موقع التحميل و المشاهدة العربي الاول</title>
        <meta name="description" content="شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/style/assets/css/style.css" />
        <link rel="stylesheet" href="/style/assets/css/akwam.css" />
        <link rel="stylesheet" href="/style/assets/css/plugins.css" />
      </head>
      <body className={`header-fixed body-home ${isMenuOpen ? 'main-menu-active' : ''}`} style={{
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(/style/assets/images/home-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}>
        
        {/* Site Overlay */}
        <span className={`site-overlay ${isMenuOpen ? 'show' : ''}`} onClick={() => setIsMenuOpen(false)}></span>

        {/* Main Menu */}
        <div className={`main-menu ${isMenuOpen ? 'show' : ''}`}>
          <div className="d-flex flex-column h-100">
            <div className="my-auto w-100">
              <div className="menu d-flex flex-wrap justify-content-center">
                <Link href="/akwam/movies" className="item">
                  <div className="icn ml-3"><i className="icon-video-camera"></i></div>
                  <div className="text">أفلام</div>
                </Link>
                <Link href="/akwam/series" className="item">
                  <div className="icn ml-3"><i className="icon-monitor"></i></div>
                  <div className="text">مسلسلات</div>
                </Link>
                <Link href="/akwam/shows" className="item">
                  <div className="icn ml-3"><i className="icon-tv"></i></div>
                  <div className="text">تلفزيون</div>
                </Link>
                <Link href="/akwam/mix" className="item">
                  <div className="icn ml-3"><i className="icon-mix"></i></div>
                  <div className="text">منوعات</div>
                </Link>
              </div>
            </div>
            <nav className="social d-flex justify-content-center">
              <a href="/" className="home mx-2"><i className="icon-home"></i></a>
              <a href="https://www.facebook.com" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
              <a href="/notifications" className="app-store mx-2"><i className="icon-app-store"></i></a>
              <a href="https://www.youtube.com" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
              <a href="/contactus" className="email mx-2"><i className="icon-email"></i></a>
            </nav>
          </div>
        </div>

        {/* Header */}
        <header className="main-header">
          <div className="container-fluid">
            <div className="d-flex align-items-center h-100">
              <button className="menu-toggle d-flex align-items-center" onClick={toggleMenu}>
                <span className="icn"></span>
              </button>
              
              <div className="mx-auto">
                <Link href="/akwam" className="logo">
                  <h1 style={{ color: '#f3951e', fontSize: '24px', fontFamily: 'akoam', margin: 0 }}>
                    اكوام
                  </h1>
                </Link>
              </div>
              
              <div className="header-actions d-flex align-items-center">
                <Link href="/search" className="search-btn">
                  <i className="icon-search" style={{ color: 'white', fontSize: '20px' }}></i>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="hero-section" style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            padding: '100px 20px 50px'
          }}>
            <div className="hero-content">
              <h1 style={{ 
                fontSize: '48px', 
                color: '#f3951e', 
                fontFamily: 'akoam', 
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                اكوام
              </h1>
              <p style={{ 
                fontSize: '20px', 
                color: 'white', 
                marginBottom: '40px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام
              </p>
              
              <div className="hero-categories" style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '20px', 
                justifyContent: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <Link 
                  href="/akwam/movies" 
                  className="hero-category-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px 20px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '10px',
                    minWidth: '150px',
                    transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
                    textDecoration: 'none',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.backgroundColor = 'rgba(243, 149, 30, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                  }}
                >
                  <i className="icon-video-camera" style={{ fontSize: '48px', marginBottom: '15px', color: '#f3951e' }}></i>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>أفلام</span>
                </Link>

                <Link 
                  href="/akwam/series" 
                  className="hero-category-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px 20px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '10px',
                    minWidth: '150px',
                    transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
                    textDecoration: 'none',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.backgroundColor = 'rgba(243, 149, 30, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                  }}
                >
                  <i className="icon-monitor" style={{ fontSize: '48px', marginBottom: '15px', color: '#f3951e' }}></i>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>مسلسلات</span>
                </Link>

                <Link 
                  href="/akwam/shows" 
                  className="hero-category-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px 20px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '10px',
                    minWidth: '150px',
                    transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
                    textDecoration: 'none',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.backgroundColor = 'rgba(243, 149, 30, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                  }}
                >
                  <i className="icon-tv" style={{ fontSize: '48px', marginBottom: '15px', color: '#f3951e' }}></i>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>تلفزيون</span>
                </Link>

                <Link 
                  href="/akwam/mix" 
                  className="hero-category-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px 20px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '10px',
                    minWidth: '150px',
                    transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
                    textDecoration: 'none',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.backgroundColor = 'rgba(243, 149, 30, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                  }}
                >
                  <i className="icon-mix" style={{ fontSize: '48px', marginBottom: '15px', color: '#f3951e' }}></i>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>منوعات</span>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Scripts */}
        <script src="/style/assets/js/plugins.js"></script>
        <script src="/style/assets/js/script.js"></script>
      </body>
    </html>
  );
}