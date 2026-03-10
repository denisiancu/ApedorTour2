import { Check, Plane, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  const mainPrices = [
    {
      service: t.pricing.airportSibiu,
      price: '50 - 69',
      icon: Plane
    },
    {
      service: t.pricing.sibiuCluj,
      price: '202 - 252',
      icon: MapPin
    },
    {
      service: t.pricing.sibiuBrasov,
      price: '172 - 215',
      icon: MapPin
    },
    {
      service: t.pricing.hourlyRental,
      price: '40 - 60',
      icon: Clock
    }
  ];

  const includedServices = [
    t.pricing.professionalDriver,
    t.pricing.water,
    t.pricing.meetGreet,
    t.pricing.luggageAssist,
    t.pricing.cleanVehicle
  ];

  const optionalServices = [
    { text: t.pricing.waitingTime, note: t.pricing.onRequest },
    { text: t.pricing.extraStops, note: t.pricing.onRequest },
    { text: t.pricing.nightWeekend, note: '+20-40%' },
    { text: t.pricing.driverAccommodation, note: t.pricing.onRequest },
    { text: t.pricing.parkingTolls, note: t.pricing.included },
    { text: t.pricing.cancellationFee, note: '25-50%' }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-lg text-[#F5F5F5] max-w-3xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainPrices.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-t-4 border-[#e3ca86] hover:bg-[#222222]"
              >
                <div className="w-12 h-12 rounded-full bg-[#e3ca86]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#e3ca86]" />
                </div>
                <p className="text-sm text-[#F5F5F5] mb-3 h-12 flex items-center justify-center">
                  {item.service}
                </p>
                <p className="text-3xl font-bold text-[#e3ca86]">
                  {item.price}
                </p>
                <p className="text-sm text-[#F5F5F5]/70 mt-2">EUR</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#1A1A1A] rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-white mb-6">{t.pricing.includedServices}</h3>
            <ul className="space-y-4">
              {includedServices.map((service, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e3ca86]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#e3ca86]" />
                  </div>
                  <span className="text-white">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1A1A1A] rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-white mb-6">{t.pricing.additionalOptions}</h3>
            <div className="space-y-3">
              {optionalServices.map((option, index) => (
                <div key={index} className="pb-3 border-b border-[#222222] last:border-0">
                  <p className="text-white font-medium">{option.text}</p>
                  <p className="text-sm text-[#e3ca86] font-semibold">{option.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-8 text-center border border-[#e3ca86]/20">
          <p className="text-white mb-4">
            <strong>{t.pricing.otherRoutes}</strong> {t.pricing.customQuote}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-semibold rounded-lg transition"
          >
            {t.pricing.requestQuote}
          </a>
        </div>
      </div>
    </section>
  );
}
