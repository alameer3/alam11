// Static layout for initial server render - prevents hydration mismatch
export function StaticLayout() {
  return (
    <div className="static-layout">
      {/* Static Header - matches exactly what client expects */}
      <header className="main-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* الشعار */}
            <div className="flex items-center">
              <h2 className="main-logo m-0">
                <a href="/" className="inline-flex">
                  <img
                    src="/logo.svg"
                    className="img-fluid"
                    alt="𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗"
                    style={{ height: '40px' }}
                  />
                </a>
              </h2>
            </div>

            {/* زر القائمة */}
            <div className="flex items-center ml-4">
              <button className="menu-toggle flex items-center text-white" disabled>
                <span className="icn ml-3"></span>
                <div className="text text-lg">الأقسام</div>
              </button>
            </div>

            {/* شريط البحث - مخفي على الهاتف */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="search-container w-full">
                <div className="search-form">
                  <form className="flex items-center">
                    <input
                      type="text"
                      placeholder="ابحث عن فيلم او مسلسل ..."
                      className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                      disabled
                    />
                    <button type="button" className="p-2" disabled>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* الأزرار الجانبية */}
            <div className="flex items-center gap-4">
              {/* زر أضيف حديثاً */}
              <a href="/recent" className="btn-recently hidden md:flex">
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>أضيف حديثاً</span>
              </a>

              {/* لوحة المستخدم */}
              <div className="user-panel">
                <a href="/auth/signin" className="user-toggle text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Static Menu - hidden by default */}
      <div className="main-menu">
        <div className="flex flex-col h-full">
          {/* القائمة الرئيسية */}
          <div className="flex-1">
            <div className="menu flex flex-col justify-center">
              <a href="/movies" className="item">
                <div className="icn ml-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 00-1-1H4a1 1 0 00-1 1v2H1a1 1 0 000 2h2v2a1 1 0 001 1h2a1 1 0 001-1V6h2a1 1 0 000-2H7z"/>
                  </svg>
                </div>
                <div className="text">أفلام</div>
              </a>
              <a href="/series" className="item">
                <div className="icn ml-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="text">مسلسلات</div>
              </a>
              <a href="/shows" className="item">
                <div className="icn ml-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="text">تلفزيون</div>
              </a>
              <a href="/mix" className="item">
                <div className="icn ml-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </div>
                <div className="text">منوعات</div>
              </a>
            </div>
          </div>

          {/* الشبكات الاجتماعية */}
          <nav className="social flex justify-center flex-wrap">
            <a href="https://akw.to" target="_blank" className="mx-2 mb-2" rel="noopener noreferrer">
              <span className="text-xl">🏠</span>
            </a>
            <a href="https://www.facebook.com/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗net" target="_blank" className="mx-2 mb-2" rel="noopener noreferrer">
              <span className="text-xl">📘</span>
            </a>
            <a href="/notifications" className="mx-2 mb-2">
              <span className="text-xl">🔔</span>
            </a>
            <a href="/contactus" className="mx-2 mb-2">
              <span className="text-xl">✉️</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}