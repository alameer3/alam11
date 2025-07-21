'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  title: string;
  slug: string;
  backdrop: string;
  overview: string;
  rating?: number;
  year?: number;
  genre?: string;
  quality?: string;
}

interface HeroSectionProps {
  slides: HeroSlide[];
}

export function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const currentSlideData = slides[currentSlide];

  if (!currentSlideData) return null;

  return (
    <section className="akwam-hero">
      {/* Background Image */}
      <Image
        src={currentSlideData.backdrop}
        alt={currentSlideData.title}
        fill
        className="akwam-hero-bg"
        priority={true}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-2"></div>
      
      {/* Content */}
      <div className="akwam-hero-content">
        <div className="container mx-auto px-4 text-center">
          <h1 className="akwam-hero-title">
            {currentSlideData.title}
          </h1>
          
          <p className="akwam-hero-subtitle max-w-2xl mx-auto">
            {currentSlideData.overview}
          </p>
          
          {/* Movie Meta Info */}
          <div className="flex items-center justify-center gap-6 mb-8 text-lg">
            {currentSlideData.rating && (
              <div className="flex items-center gap-1 text-yellow-400">
                <i className="icon-star"></i>
                <span className="font-semibold">{currentSlideData.rating}</span>
              </div>
            )}
            
            {currentSlideData.year && (
              <span className="text-gray-300">{currentSlideData.year}</span>
            )}
            
            {currentSlideData.quality && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold">
                {currentSlideData.quality}
              </span>
            )}
            
            {currentSlideData.genre && (
              <span className="text-gray-300">{currentSlideData.genre}</span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Link 
              href={`/movie/${currentSlideData.slug}`}
              className="akwam-btn akwam-btn-primary text-lg px-8 py-4"
            >
              <i className="icon-play ml-3"></i>
              مشاهدة الآن
            </Link>
            
            <button 
              className="akwam-btn akwam-btn-secondary text-lg px-8 py-4"
              onClick={() => {/* Add to watchlist logic */}}
            >
              <i className="icon-plus ml-3"></i>
              إضافة للقائمة
            </button>
            
            <button 
              className="akwam-btn akwam-btn-ghost text-lg px-8 py-4"
            >
              <i className="icon-info ml-3"></i>
              المزيد
            </button>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        onClick={() => {
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
          setIsAutoPlaying(false);
        }}
      >
        <i className="icon-arrow-right text-xl"></i>
      </button>
      
      <button
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        onClick={() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
          setIsAutoPlaying(false);
        }}
      >
        <i className="icon-arrow-left text-xl"></i>
      </button>
    </section>
  );
}