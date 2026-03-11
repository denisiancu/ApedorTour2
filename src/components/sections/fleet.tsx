import { Users, Briefcase, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Fleet() {
  const { t } = useLanguage();

  const features = [
    t.fleet.leatherSeats,
    t.fleet.climateControl,
    t.fleet.wifi,
    t.fleet.water,
    t.fleet.usbCharging,
    t.fleet.tintedWindows
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
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/DJI_20260227124309_0076_D_DJD.JPG"
                alt="Mercedes V-Class"
                className="w-full h-auto block"
                loading="lazy"
              />
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
                  <p className="text-2xl font-bold text-white">7</p>
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
                {features.map((feature, index) => (
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
