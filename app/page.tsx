import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { AdSystem } from '@/components/ads/ad-system'
import { MovieSlider } from '@/components/ui/movie-slider'
import { ContentWidget } from '@/components/ui/content-widget'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div dir="rtl" className="header-fixed body-home min-h-screen bg-gradient-to-b from-black/55 to-black" 
         style={{ backgroundImage: 'url(/images/home-bg.webp)' }}>
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <MainMenu />
      
      {/* شريط البحث المتنقل */}
      <SearchBox />
      
      {/* حاوي الموقع */}
      <div className="site-container">
        {/* رأس الصفحة */}
        <MainHeader />
        
        {/* محتوى الصفحة الرئيسية */}
        <div className="main-content">
          {/* مساحة فاصلة */}
          <div style={{ marginBottom: '90px' }}></div>
          
          <div className="container">
            {/* ويدجت المحتوى المتميز - Swiper */}
            <div className="widget-2 widget mb-4">
              <div className="widget-body">
                <MovieSlider 
                  title="المختارات" 
                  items={[
                    {
                      id: '854',
                      type: 'series',
                      title: 'Lucifer الموسم الخامس',
                      image: 'https://img.downet.net/thumb/270x400/uploads/BgvPP.jpg',
                      url: '/series/854/lucifer-الموسم-الخامس'
                    },
                    {
                      id: '1377',
                      type: 'series',
                      title: 'WandaVision الموسم الاول',
                      image: 'https://img.downet.net/thumb/270x400/uploads/6ECRL.jpeg',
                      url: '/series/1377/wandavision-الموسم-الاول'
                    },
                    {
                      id: '9839',
                      type: 'movie',
                      title: 'Ballerina',
                      image: 'https://img.downet.net/thumb/270x400/uploads/vg3hV.jpg',
                      url: '/movie/9839/ballerina'
                    },
                    {
                      id: '9837',
                      type: 'movie',
                      title: 'Thunderbolts',
                      image: 'https://img.downet.net/thumb/270x400/uploads/bGttw.jpg',
                      url: '/movie/9837/thunderbolts'
                    },
                    {
                      id: '9805',
                      type: 'movie',
                      title: 'Squid Game الموسم الثالث',
                      image: 'https://img.downet.net/thumb/270x400/uploads/sapgq.jpg',
                      url: '/movie/9805/squid-game-الموسم-الثالث'
                    }
                  ]}
                />
              </div>
            </div>

            {/* إعلانات */}
            <div className="ads mb-3">
              <AdSystem 
                type="banner"
                position="content"
                desktop={{
                  key: 'c4dafd2afd106c16f2da137131642dc4',
                  width: 728,
                  height: 90
                }}
                mobile={{
                  key: '96a30fbd2b80990e89652a08f49b609f',
                  width: 300,
                  height: 250
                }}
              />
            </div>

            {/* ويدجت الأفلام */}
            <ContentWidget 
              title="أفلام"
              type="movies"
              headerMenuItems={[
                { name: 'عربي', url: '/movies?section=29' },
                { name: 'اجنبي', url: '/movies?section=30' },
                { name: 'هندي', url: '/movies?section=31' },
                { name: 'تركي', url: '/movies?section=32' },
                { name: 'اسيوي', url: '/movies?section=33' }
              ]}
              moreUrl="/movies"
              featuredItem={{
                id: '9946',
                title: 'Hera Pher',
                description: 'مشاهدة و تحميل فيلم Hera Pher حيث يدور العمل حول ينفصل الصديقان أجاي وفيجاي عن بعضهما البعض عندما يكتشفان أسرارًا عن ماضيهما',
                image: 'https://img.downet.net/thumb/1140x310/uploads/Ul3ES.webp',
                poster: 'https://img.downet.net/thumb/150x200/uploads/Ul3ES.webp',
                rating: '6.6',
                quality: 'WEB-DL',
                url: '/movie/9946/hera-pher',
                trailer: 'https://www.youtube.com/watch?v=cIPoW4VnZYk'
              }}
              items={[
                {
                  id: '9929',
                  title: 'Push',
                  image: 'https://img.downet.net/thumb/178x260/uploads/weU96.webp',
                  rating: '7.2',
                  year: '2024',
                  genres: ['اثارة', 'رعب'],
                  quality: 'WEB-DL',
                  url: '/movie/9929/push'
                }
                // المزيد من الأفلام...
              ]}
            />

            {/* ويدجت المسلسلات */}
            <ContentWidget 
              title="مسلسلات"
              type="series"
              headerMenuItems={[
                { name: 'عربي', url: '/series?section=29' },
                { name: 'اجنبي', url: '/series?section=30' },
                { name: 'هندي', url: '/series?section=31' },
                { name: 'تركي', url: '/series?section=32' },
                { name: 'اسيوي', url: '/series?section=33' }
              ]}
              moreUrl="/series"
              featuredItem={{
                id: '4994',
                title: 'Dexter: Resurrection',
                description: 'مشاهدة و تحميل مسلسل Dexter: Resurrection حيث يدور العمل حول يستيقظ دكستر مورغان من غيبوبته ليجد هاريسون قد اختفى دون أثر',
                image: 'https://img.downet.net/thumb/1140x310/uploads/ad99J.webp',
                poster: 'https://img.downet.net/thumb/150x200/uploads/cU3Wm.webp',
                rating: '7.9',
                quality: 'WEB-DL',
                url: '/series/4994/dexter-resurrection',
                trailer: 'https://www.youtube.com/watch?v=agNIhIWwi6U'
              }}
              items={[
                {
                  id: '4970',
                  title: 'فات الميعاد',
                  image: 'https://img.downet.net/thumb/178x260/uploads/u3No5.jpg',
                  rating: '6.0',
                  year: '2025',
                  genres: ['دراما'],
                  episodes: 27,
                  quality: 'WEB-DL',
                  url: '/series/4970/فات-الميعاد'
                },
                {
                  id: '4966',
                  title: 'خطيئة اخيرة',
                  image: 'https://img.downet.net/thumb/178x260/uploads/w4CQd.jpg',
                  rating: '6.1',
                  year: '2025',
                  genres: ['دراما'],
                  episodes: 41,
                  quality: 'WEB-DL',
                  url: '/series/4966/خطيئة-اخيرة'
                }
                // المزيد من المسلسلات...
              ]}
            />

            {/* ويدجت التلفزيون */}
            <ContentWidget 
              title="تلفزيون"
              type="shows"
              headerMenuItems={[
                { name: 'برامج', url: '/shows?category=برامج' },
                { name: 'توك شو', url: '/shows?category=توك-شو' },
                { name: 'مصارعة', url: '/shows?category=مصارعة' },
                { name: 'رياضة', url: '/shows?category=رياضة' }
              ]}
              moreUrl="/shows"
              items={[
                // محتوى التلفزيون...
              ]}
            />

            {/* ويدجت المنوعات */}
            <ContentWidget 
              title="منوعات"
              type="mix"
              headerMenuItems={[
                { name: 'العاب', url: '/mix?category=العاب' },
                { name: 'برامج', url: '/mix?category=برامج' },
                { name: 'تطبيقات', url: '/mix?category=تطبيقات' }
              ]}
              moreUrl="/mix"
              items={[
                // محتوى المنوعات...
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}