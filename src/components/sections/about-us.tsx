import { Check, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const aboutImages = [
  '/DJI_20260214172244_0534_D_DJD.JPG',
  '/DJI_20260214172405_0539_D_DJD.JPG',
  '/DJI_20260214172958_0547_D_DJD.JPG',
  '/DJI_20260214173010_0549_D_DJD.JPG',
];

export default function AboutUs() {
  const { t } = useLanguage();
  const values = t.aboutUs.valuesList;
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about-us" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.aboutUs.title}
          </h2>
          <p className="text-lg text-[#e3ca86] font-medium">
            {t.aboutUs.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div
            ref={imagesRef}
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              imagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {aboutImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[4/3] relative rounded-lg overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`ApeD'or Tour - Mercedes V-Class Premium Service ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div
            ref={contentRef}
            className={`space-y-6 transition-all duration-700 delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[#F5F5F5] text-lg leading-relaxed">
              {t.aboutUs.story1}
            </p>

            <p className="text-[#F5F5F5] text-lg leading-relaxed">
              {t.aboutUs.story2}
            </p>

            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#e3ca86]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e3ca86]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#e3ca86]" />
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {t.aboutUs.story3}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {t.aboutUs.values}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#e3ca86]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#e3ca86]" />
                    </div>
                    <span className="text-[#F5F5F5] text-sm">{value}</span>
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
