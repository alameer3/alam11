import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'

export default function ContactPage() {
  return (
    <div dir="rtl" className="body-home header-fixed">
      <span className="site-overlay"></span>
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="page-content">
          <div className="main-header-top"></div>
          <MainHeader />
          <div className="main-header-height"></div>
          
          <div className="container py-5 my-5">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
              <h1 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl ml-3">✉️</span>
                اتصل بنا
              </h1>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#26baee] mb-4">معلومات التواصل</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-xl ml-3">📧</span>
                      <div>
                        <h4 className="text-white font-medium">البريد الإلكتروني</h4>
                        <p className="text-gray-400">admin@akwam.net</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-xl ml-3">🌐</span>
                      <div>
                        <h4 className="text-white font-medium">الموقع الرسمي</h4>
                        <p className="text-gray-400">https://akw.to</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-xl ml-3">📱</span>
                      <div>
                        <h4 className="text-white font-medium">التطبيق</h4>
                        <p className="text-gray-400">https://akw.net.in</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-3">تابعنا على</h4>
                    <div className="flex gap-3">
                      <a href="https://www.facebook.com/akwamnet" target="_blank" className="text-2xl hover:text-[#26baee]">📘</a>
                      <a href="https://www.youtube.com/c/AKWAMnetwork" target="_blank" className="text-2xl hover:text-[#26baee]">📺</a>
                      <a href="https://www.facebook.com/groups/AKOAMweb" target="_blank" className="text-2xl hover:text-[#26baee]">👥</a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#26baee] mb-4">أرسل رسالة</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">الاسم</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-[#222] border border-[#333] rounded text-white focus:border-[#26baee] focus:outline-none" 
                        placeholder="اكتب اسمك"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        className="w-full p-3 bg-[#222] border border-[#333] rounded text-white focus:border-[#26baee] focus:outline-none" 
                        placeholder="اكتب بريدك الإلكتروني"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">الموضوع</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-[#222] border border-[#333] rounded text-white focus:border-[#26baee] focus:outline-none" 
                        placeholder="موضوع الرسالة"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">الرسالة</label>
                      <textarea 
                        rows={5}
                        className="w-full p-3 bg-[#222] border border-[#333] rounded text-white focus:border-[#26baee] focus:outline-none" 
                        placeholder="اكتب رسالتك هنا..."
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-[#26baee] hover:bg-[#0d82ab] text-white font-bold py-3 rounded transition-colors"
                    >
                      إرسال الرسالة
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}