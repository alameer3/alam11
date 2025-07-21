'use client';

interface ArchiveCoverProps {
  currentPage: string;
  title: string;
  icon: string;
  description: string;
}

export default function ArchiveCover({ currentPage, title, icon, description }: ArchiveCoverProps) {
  return (
    <div className="archive-cover" style={{
      background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(22,22,25,0.9) 100%), url(/home-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '60px 0',
      borderBottom: '1px solid #333',
      position: 'relative'
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(243,149,30,0.1) 0%, rgba(0,0,0,0.7) 100%)'
      }}></div>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          {/* Page Icon and Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(243, 149, 30, 0.15)',
            border: '2px solid rgba(243, 149, 30, 0.3)',
            borderRadius: '15px',
            padding: '30px 40px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              fontSize: '64px',
              marginLeft: '20px',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
            }}>
              {icon}
            </div>
            <div>
              <h1 style={{
                fontSize: '42px',
                fontWeight: 'bold',
                margin: 0,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontFamily: 'akoam, Arial, sans-serif'
              }}>
                {title}
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#ccc',
                margin: '8px 0 0 0',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}