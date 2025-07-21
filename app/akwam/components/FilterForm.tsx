'use client';

import { useState } from 'react';
import ArchiveCover from './ArchiveCover';

interface FilterFormProps {
  currentPage: string;
  onFilterChange?: (filters: FilterData) => void;
}

interface FilterData {
  section: string;
  category: string;
  year: string;
  language: string;
  quality: string;
  rating: string;
}

export default function FilterForm({ currentPage, onFilterChange }: FilterFormProps) {
  const [filters, setFilters] = useState<FilterData>({
    section: '0',
    category: '0',
    year: '0',
    language: '0',
    quality: '0',
    rating: '0'
  });

  const sections = [
    { value: '0', label: 'القسم' },
    { value: '29', label: 'عربي' },
    { value: '30', label: 'اجنبي' }, 
    { value: '31', label: 'هندي' },
    { value: '32', label: 'تركي' },
    { value: '33', label: 'اسيوي' },
    { value: '34', label: 'اطفال' }
  ];

  const categories = [
    { value: '0', label: 'التصنيف' },
    { value: '87', label: 'رمضان' },
    { value: '30', label: 'انمي' },
    { value: '18', label: 'اكشن' },
    { value: '71', label: 'مدبلج' },
    { value: '72', label: 'NETFLIX' },
    { value: '20', label: 'كوميدي' },
    { value: '35', label: 'اثارة' },
    { value: '34', label: 'غموض' },
    { value: '33', label: 'عائلي' },
    { value: '25', label: 'حربي' },
    { value: '32', label: 'رياضي' },
    { value: '43', label: 'فانتازيا' },
    { value: '24', label: 'خيال علمي' },
    { value: '27', label: 'رومانسي' },
    { value: '26', label: 'تاريخي' },
    { value: '23', label: 'دراما' },
    { value: '22', label: 'رعب' },
    { value: '21', label: 'جريمة' },
    { value: '19', label: 'مغامرة' }
  ];

  const years = [
    { value: '0', label: 'سنة الإنتاج' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: '2011', label: '2011' },
    { value: '2010', label: '2010' }
  ];

  const languages = [
    { value: '0', label: 'اللغة' },
    { value: '1', label: 'العربية' },
    { value: '2', label: 'الإنجليزية' },
    { value: '3', label: 'الهندية' },
    { value: '4', label: 'الاسبانية' },
    { value: '5', label: 'الصينية' },
    { value: '8', label: 'الفرنسية' },
    { value: '9', label: 'الروسية' },
    { value: '10', label: 'اليابانية' },
    { value: '11', label: 'الألمانية' },
    { value: '12', label: 'الكورية' },
    { value: '16', label: 'التركية' }
  ];

  const qualities = [
    { value: '0', label: 'الجودة' },
    { value: 'BluRay', label: 'BluRay' },
    { value: 'WebRip', label: 'WebRip' },
    { value: 'BRRIP', label: 'BRRIP' },
    { value: 'DVDrip', label: 'DVDrip' },
    { value: 'DVDSCR', label: 'DVDSCR' },
    { value: 'HD', label: 'HD' },
    { value: 'HDTS', label: 'HDTS' },
    { value: 'HDTV', label: 'HDTV' },
    { value: 'CAM', label: 'CAM' },
    { value: 'WEB-DL', label: 'WEB-DL' },
    { value: 'HDTC', label: 'HDTC' },
    { value: 'BDRIP', label: 'BDRIP' },
    { value: 'HDRIP', label: 'HDRIP' },
    { value: 'HC HDRIP', label: 'HC HDRIP' },
    { value: '4K', label: '4K' },
    { value: '3D', label: '3D' }
  ];

  const ratings = [
    { value: '0', label: 'التقييم' },
    { value: '1', label: '+1' },
    { value: '2', label: '+2' },
    { value: '3', label: '+3' },
    { value: '4', label: '+4' },
    { value: '5', label: '+5' },
    { value: '6', label: '+6' },
    { value: '7', label: '+7' },
    { value: '8', label: '+8' },
    { value: '9', label: '+9' }
  ];

  const handleFilterChange = (key: keyof FilterData, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const selectStyle = {
    backgroundColor: '#2a2a2a',
    color: 'white',
    border: '1px solid #555',
    borderRadius: '5px',
    padding: '10px 15px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    cursor: 'pointer'
  };

  const pageInfo = {
    movies: { title: 'أفلام', icon: '🎬', description: 'أحدث وأفضل الأفلام العربية والأجنبية' },
    series: { title: 'مسلسلات', icon: '📺', description: 'مسلسلات عربية وأجنبية بجودة عالية' },
    shows: { title: 'تلفزيون', icon: '📻', description: 'برامج تلفزيونية وتوك شو ومسابقات' },
    mix: { title: 'منوعات', icon: '🎭', description: 'وثائقيات وحفلات وعروض متنوعة' }
  };

  const info = pageInfo[currentPage as keyof typeof pageInfo] || pageInfo.movies;

  return (
    <div>
      <ArchiveCover 
        currentPage={currentPage} 
        title={info.title}
        icon={info.icon}
        description={info.description}
      />
      
      <div style={{
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid #333',
        padding: '25px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

          <form>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <select
                  style={selectStyle}
                  value={filters.section}
                  onChange={(e) => handleFilterChange('section', e.target.value)}
                >
                  {sections.map(section => (
                    <option key={section.value} value={section.value}>
                      {section.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  style={selectStyle}
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  style={selectStyle}
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                >
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  style={selectStyle}
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                >
                  {years.map(year => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  style={selectStyle}
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                >
                  {languages.map(language => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  style={selectStyle}
                  value={filters.quality}
                  onChange={(e) => handleFilterChange('quality', e.target.value)}
                >
                  {qualities.map(quality => (
                    <option key={quality.value} value={quality.value}>
                      {quality.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}