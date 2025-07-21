'use client';

import { useState } from 'react';

interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBox({ isOpen, onClose }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Search Overlay */}
      <div 
        className={`site-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      ></div>

      {/* Search Box */}
      <div style={{
        position: 'fixed',
        top: isOpen ? '70px' : '-200px',
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: 'rgba(22, 22, 25, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #333',
        transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '30px 20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="ابحث عن أفلام، مسلسلات، أو أي محتوى..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 25px',
                  fontSize: '18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '2px solid transparent',
                  borderRadius: '50px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'akoam, Arial, sans-serif'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#f3951e';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                autoFocus={isOpen}
              />
            </div>
            
            <button
              style={{
                padding: '18px 30px',
                backgroundColor: '#f3951e',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(243, 149, 30, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e8851a';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(243, 149, 30, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3951e';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(243, 149, 30, 0.4)';
              }}
            >
              بحث 🔍
            </button>
            
            <button
              onClick={onClose}
              style={{
                padding: '18px',
                backgroundColor: 'transparent',
                color: '#ccc',
                border: '1px solid #555',
                borderRadius: '50%',
                width: '54px',
                height: '54px',
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = '#f3951e';
                e.currentTarget.style.color = '#f3951e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#555';
                e.currentTarget.style.color = '#ccc';
              }}
            >
              ✕
            </button>
          </div>

          {/* Quick Search Suggestions */}
          {searchQuery.length > 0 && (
            <div style={{
              marginTop: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{ 
                color: '#f3951e', 
                marginBottom: '15px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                البحث السريع
              </h4>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '10px' 
              }}>
                {['أفلام عربية', 'مسلسلات تركية', 'أفلام أكشن', 'كوميديا'].map((suggestion) => (
                  <button
                    key={suggestion}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'rgba(243, 149, 30, 0.2)',
                      color: 'white',
                      border: '1px solid rgba(243, 149, 30, 0.3)',
                      borderRadius: '20px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(243, 149, 30, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(243, 149, 30, 0.2)';
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}