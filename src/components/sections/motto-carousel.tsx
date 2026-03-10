import { useState, useEffect } from 'react';
import { Star, Shield, Clock, Heart, Settings, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const mottoIcons = [Star, Lock, Heart, Clock, Settings, Shield];

export default function MottoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const mottos = [
    t.mottos.excellence,
    t.mottos.discretion,
    t.mottos.comfort,
    t.mottos.punctuality,
    t.mottos.tailored,
    t.mottos.security
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mottos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mottos.length]);

  const CurrentIcon = mottoIcons[currentIndex];

  return (
    <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-6 border-y border-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 h-12">
          <div className="flex items-center justify-center gap-3 transition-all duration-500">
            <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center">
              <CurrentIcon className="w-4 h-4 text-amber-500" />
            </div>
            <span
              key={currentIndex}
              className="text-gray-100 font-medium tracking-wide text-lg animate-fade-in"
            >
              {mottos[currentIndex]}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-4">
          {mottos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-amber-500 w-4' : 'bg-gray-600'
              }`}
              aria-label={`Go to motto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
