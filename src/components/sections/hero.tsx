import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import QuoteModal from '@/components/QuoteModal';

const VIDEO_ID = 'ny_3bztYHwI';
const VIDEO_DURATION_MS = 55000;
const PHOTO_CYCLE_DURATION_MS = 6000;
const PHOTOS_DISPLAY_COUNT = 4;
const MOTTO_ROTATION_MS = 4000;

const mottosRo = [
  'Excelenta in fiecare calatorie',
  'Discretie. Eleganta. Control.',
  'Servicii premium, fara compromis',
  'Confort VIP, punctualitate impecabila',
  'Securitate la cerere',
];

const mottosEn = [
  'Excellence in every journey',
  'Discretion. Elegance. Control.',
  'Premium service, no compromises',
  'VIP comfort, flawless punctuality',
  'Security upon request',
];

const photoSlides = [
  '/DJI_20260214172244_0534_D_DJD.JPG',
  '/DJI_20260214172405_0539_D_DJD.JPG',
  '/DJI_20260214172958_0547_D_DJD.JPG',
  '/DJI_20260214173010_0549_D_DJD.JPG'
];

export default function Hero() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showingVideo, setShowingVideo] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoKey, setVideoKey] = useState(0);
  const [currentMottoIndex, setCurrentMottoIndex] = useState(0);
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const photoCountRef = useRef(0);
  const mottos = language === 'ro' ? mottosRo : mottosEn;

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photoSlides.length);
  }, []);

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photoSlides.length) % photoSlides.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!videoLoaded || !showingVideo) return;
    const timer = setTimeout(() => {
      setShowingVideo(false);
      photoCountRef.current = 0;
      setCurrentPhotoIndex(0);
    }, VIDEO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [videoLoaded, showingVideo, videoKey]);

  useEffect(() => {
    if (showingVideo || isPaused) return;
    const interval = setInterval(() => {
      photoCountRef.current += 1;
      if (photoCountRef.current >= PHOTOS_DISPLAY_COUNT) {
        setShowingVideo(true);
        setVideoKey((prev) => prev + 1);
        photoCountRef.current = 0;
      } else {
        nextPhoto();
      }
    }, PHOTO_CYCLE_DURATION_MS);
    return () => clearInterval(interval);
  }, [showingVideo, isPaused, nextPhoto]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMottoIndex((prev) => (prev + 1) % mottos.length);
    }, MOTTO_ROTATION_MS);
    return () => clearInterval(interval);
  }, [mottos.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showingVideo ? (
          <div className="absolute inset-0 overflow-hidden">
            {videoLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <iframe
                  key={videoKey}
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&vq=hd2160&modestbranding=1`}
                  className="absolute w-[300%] h-[300%] md:w-[177.78vh] md:h-full md:min-w-full md:min-h-[56.25vw] pointer-events-none"
                  allow="autoplay; encrypted-media"
                  title="ApeD'or Tour Background"
                  style={{ border: 'none' }}
                  loading="eager"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <img
                  src="/DJI_20260214172958_0547_D_DJD.JPG"
                  alt="ApeD'or Tour - Servicii VIP sofer Sibiu"
                  className="w-full h-full object-cover opacity-50"
                />
                <button
                  onClick={() => setVideoLoaded(true)}
                  className="absolute w-20 h-20 rounded-full bg-[#e3ca86]/80 hover:bg-[#e3ca86] flex items-center justify-center transition"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 text-black ml-1" />
                </button>
              </div>
            )}
          </div>
        ) : (
          photoSlides.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={photo}
                alt="ApeD'or Tour - Premium Chauffeur Services"
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))
        )}

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-center px-6 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl tracking-tight">
              ApeD'or Tour
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-md max-w-3xl mx-auto font-light tracking-wide">
              {t.hero.tagline}
            </p>
            <p className="text-lg text-gray-200 drop-shadow-md">
              {t.hero.subtitle}
            </p>

            <div className="h-10 flex items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-md">
                {mottos.map((motto, index) => (
                  <p
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center text-[#e3ca86] text-lg md:text-xl italic font-light transition-opacity duration-700 ${
                      index === currentMottoIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {motto}
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setQuoteOpen(true)}
                className="px-8 py-3 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-semibold rounded-lg transition transform hover:scale-105 shadow-lg"
              >
                {t.hero.cta}
              </button>
              <a
                href="#services"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
              >
                {t.hero.discover}
              </a>
            </div>
          </div>
        </div>

        {!showingVideo && photoSlides.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 rounded-full transition text-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 rounded-full transition text-white"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {photoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPhotoIndex ? 'bg-[#e3ca86] w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
