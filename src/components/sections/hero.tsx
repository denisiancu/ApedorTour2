import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import QuoteModal from '@/components/QuoteModal';

const PHOTO_DURATION = 3000;
const MOTTO_INTERVAL = 4000;

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

const photos = [
  '/poza3.JPG',
  '/poza4.JPG',
  '/DJI_20260214172244_0534_D_DJD.JPG',
  '/DJI_20260227124309_0076_D_DJD.JPG',
];

const videoIds = ['D2Aah32TOWw', 'LQ6La5DFiM0', 'S-h7Y-B-D8M', 'dKbWlwHLSHc'];

type Slide =
  | { kind: 'photo'; src: string; photoIdx: number }
  | { kind: 'video'; id: string; vidIdx: number };

const slides: Slide[] = [];
for (let i = 0; i < Math.max(photos.length, videoIds.length); i++) {
  if (i < photos.length) slides.push({ kind: 'photo', src: photos[i], photoIdx: i });
  if (i < videoIds.length) slides.push({ kind: 'video', id: videoIds[i], vidIdx: i });
}

const photoSlideIndex: number[] = [];
const videoSlideIndex: number[] = [];
slides.forEach((s, i) => {
  if (s.kind === 'photo') photoSlideIndex[s.photoIdx] = i;
  else videoSlideIndex[s.vidIdx] = i;
});

function embedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`;
}

function ytCmd(iframe: HTMLIFrameElement | null, func: string, args: (string | number | boolean)[] = []) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args }),
    '*'
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [mottoIdx, setMottoIdx] = useState(0);
  const { t, language } = useLanguage();
  const iframes = useRef<(HTMLIFrameElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const mottos = language === 'ro' ? mottosRo : mottosEn;
  const slide = slides[active];
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (typeof e.data !== 'string') return;
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }

      let state: number | null = null;
      if (data.event === 'onStateChange' && typeof data.info === 'number') {
        state = data.info;
      } else if (
        data.event === 'infoDelivery' &&
        typeof data.info === 'object' &&
        data.info !== null &&
        typeof (data.info as Record<string, unknown>).playerState === 'number'
      ) {
        state = (data.info as Record<string, number>).playerState;
      }

      if (state === 0) {
        const vidIdx = iframes.current.findIndex(el => el?.contentWindow === e.source);
        if (vidIdx >= 0) {
          const slideIdx = videoSlideIndex[vidIdx];
          if (activeRef.current === slideIdx) {
            setActive((slideIdx + 1) % slides.length);
          }
        }
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const registerListening = useCallback((idx: number) => {
    const el = iframes.current[idx];
    if (!el?.contentWindow) return;
    el.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
  }, []);

  useEffect(() => {
    if (paused) return;
    if (slide.kind === 'video') return;
    timer.current = setTimeout(() => setActive(p => (p + 1) % slides.length), PHOTO_DURATION);
    return () => clearTimeout(timer.current);
  }, [active, paused, slide.kind]);

  useEffect(() => {
    videoIds.forEach((_, i) => {
      const el = iframes.current[i];
      if (!el) return;
      if (active === videoSlideIndex[i]) {
        ytCmd(el, 'seekTo', [0, true]);
        setTimeout(() => {
          ytCmd(el, 'playVideo');
          registerListening(i);
        }, 150);
      } else {
        ytCmd(el, 'pauseVideo');
      }
    });
  }, [active, registerListening]);

  useEffect(() => {
    const id = setInterval(
      () => setMottoIdx(p => (p + 1) % mottos.length),
      MOTTO_INTERVAL
    );
    return () => clearInterval(id);
  }, [mottos.length]);

  const go = useCallback((i: number) => setActive(i), []);
  const next = useCallback(() => setActive(p => (p + 1) % slides.length), []);
  const prev = useCallback(() => setActive(p => (p - 1 + slides.length) % slides.length), []);
  const goVid = useCallback((vi: number) => {
    if (videoSlideIndex[vi] != null) setActive(videoSlideIndex[vi]);
  }, []);

  return (
    <>
      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ height: '100vh', minHeight: '600px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {photos.map((src, i) => (
          <div
            key={`p${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active === photoSlideIndex[i] ? 'opacity-100 z-[2]' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={src}
              alt="ApeD'or Tour - Premium Chauffeur Services"
              className="w-full h-full object-cover object-center"
              style={{ display: 'block', width: '100%', height: '100%' }}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          </div>
        ))}

        {videoIds.map((id, i) => {
          const isOn = active === videoSlideIndex[i];
          return (
            <div
              key={`v${i}`}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
                isOn ? 'opacity-100 z-[2]' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <iframe
                ref={el => { iframes.current[i] = el; }}
                src={embedUrl(id)}
                onLoad={() => registerListening(i)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: 'max(177.78vh, 100vw)',
                  height: 'max(100vh, 56.25vw)',
                  border: 'none',
                }}
                allow="autoplay; encrypted-media"
                title={`ApeD'or Tour Video ${i + 1}`}
                loading="eager"
              />
            </div>
          );
        })}

        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.35) 100%)',
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-[4]">
          <div className="text-center px-6 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              ApeD'or Tour
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light tracking-wide" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
              {t.hero.tagline}
            </p>
            <p className="text-lg text-gray-200" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
              {t.hero.subtitle}
            </p>

            <div className="h-10 flex items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-md">
                {mottos.map((m, i) => (
                  <p
                    key={i}
                    className={`absolute inset-0 flex items-center justify-center text-[#e3ca86] text-lg md:text-xl italic font-light transition-opacity duration-700 ${
                      i === mottoIdx ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                  >
                    {m}
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

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[5] p-2 bg-black/30 hover:bg-black/50 rounded-full transition text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[5] p-2 bg-black/30 hover:bg-black/50 rounded-full transition text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {videoIds.map((_, i) => (
              <button
                key={`vb${i}`}
                onClick={() => goVid(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active === videoSlideIndex[i]
                    ? 'bg-[#e3ca86] text-black shadow-lg'
                    : 'bg-black/40 text-white/80 hover:bg-black/60 hover:text-white backdrop-blur-sm border border-white/10'
                }`}
                aria-label={`Play video ${i + 1}`}
              >
                <Film className="w-3 h-3" />
                V{i + 1}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={`d${i}`}
                onClick={() => go(i)}
                className={`rounded-full transition-all ${
                  i === active
                    ? 'bg-[#e3ca86] w-6 h-2'
                    : s.kind === 'video'
                      ? 'bg-white/30 hover:bg-white/60 w-2 h-2 ring-1 ring-white/40'
                      : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
