import { useState, useEffect, useCallback, useRef } from 'react';
import { Users, Briefcase, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { OptimizedImage } from '@/components/OptimizedImage';

const vClassPhotos = [
  '/IMG_7138.JPG',
  '/IMG_7140.JPG',
  '/IMG_7146.JPG',
  '/IMG_7173.JPG',
];

const CYCLE_INTERVAL = 2000;

export default function Fleet() {
  const { t } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(
      () => setActivePhoto(p => (p + 1) % vClassPhotos.length),
      CYCLE_INTERVAL
    );
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const prev = useCallback(() => {
    setActivePhoto(p => (p - 1 + vClassPhotos.length) % vClassPhotos.length);
  }, []);

  const next = useCallback(() => {
    setActivePhoto(p => (p + 1) % vClassPhotos.length);
  }, []);

  const vClassFeatures = [
    t.fleet.leatherSeats,
    t.fleet.climateControl,
    t.fleet.wifi,
    t.fleet.water,
    t.fleet.usbCharging,
    t.fleet.tintedWindows
  ];

  const sprinterFeatures = [
    t.fleet.sprinterLeather,
    t.fleet.sprinterClimate,
    t.fleet.sprinterWifi,
    t.fleet.sprinterWater,
    t.fleet.sprinterUsb,
    t.fleet.sprinterSpace
  ];

  return (
    <section id="fleet" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.fleet.title}
          </h2>
          <p className="text-lg text-[#F5F5F5]">
            {t.fleet.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[3/4]">
              {vClassPhotos.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Mercedes V-Class interior ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === activePhoto ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}

              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition text-white"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition text-white"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {vClassPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`rounded-full transition-all ${
                      i === activePhoto
                        ? 'bg-[#e3ca86] w-5 h-2'
                        : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                    }`}
                    aria-label={`Go to photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Mercedes V-Class</h3>
              <p className="text-[#e3ca86] font-medium">Premium Business Van</p>
            </div>

            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#e3ca86]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#e3ca86]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">6</p>
                  <p className="text-sm text-[#F5F5F5]/70">{t.fleet.seats}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#e3ca86]/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#e3ca86]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">6+</p>
                  <p className="text-sm text-[#F5F5F5]/70">{t.fleet.luggage}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.fleet.features}</h4>
              <div className="grid grid-cols-2 gap-3">
                {vClassFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#e3ca86] flex-shrink-0" />
                    <span className="text-[#F5F5F5] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-semibold rounded-lg transition"
            >
              {t.nav.bookNow}
            </a>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A] my-16" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative md:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/flota.jpg"
                alt="Mercedes Sprinter"
                className="w-full h-auto block"
              />
            </div>
          </div>

          <div className="space-y-8 md:order-1">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Mercedes Sprinter</h3>
              <p className="text-[#e3ca86] font-medium">{t.fleet.sprinterSubtitle}</p>
            </div>

            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#e3ca86]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#e3ca86]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{t.fleet.sprinterSeats}</p>
                  <p className="text-sm text-[#F5F5F5]/70">{t.fleet.seats}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#e3ca86]/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#e3ca86]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{t.fleet.sprinterLuggage}</p>
                  <p className="text-sm text-[#F5F5F5]/70">{t.fleet.luggage}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.fleet.features}</h4>
              <div className="grid grid-cols-2 gap-3">
                {sprinterFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#e3ca86] flex-shrink-0" />
                    <span className="text-[#F5F5F5] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-semibold rounded-lg transition"
            >
              {t.nav.bookNow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
