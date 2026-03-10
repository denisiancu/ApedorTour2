import { Plane, Briefcase, Music, MapPin, Users, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Services() {
  const { t } = useLanguage();
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal<HTMLDivElement>(0.05);

  const services = [
    {
      icon: Plane,
      title: t.services.airportTransfer,
      description: t.services.airportTransferDesc,
      routes: ['Sibiu', 'Cluj', 'Bucuresti', 'Timisoara', 'Brasov']
    },
    {
      icon: Briefcase,
      title: t.services.businessTravel,
      description: t.services.businessTravelDesc,
    },
    {
      icon: Music,
      title: t.services.events,
      description: t.services.eventsDesc,
    },
    {
      icon: MapPin,
      title: t.services.privateTours,
      description: t.services.privateToursDesc,
    },
    {
      icon: Users,
      title: t.services.vipGuests,
      description: t.services.vipGuestsDesc,
    },
    {
      icon: Globe,
      title: t.services.international,
      description: t.services.internationalDesc,
    },
    {
      icon: Shield,
      title: t.services.bodyguard,
      description: t.services.bodyguardDesc,
      premium: true
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-[#F5F5F5] max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`bg-[#1A1A1A] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-l-4 hover:bg-[#222222] group ${
                  service.premium ? 'border-[#e3ca86] bg-[#1A1A1A]' : 'border-[#e3ca86]'
                } ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: cardsVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-[#e3ca86]/20 transition ${
                    service.premium ? 'bg-[#e3ca86]/10' : 'bg-[#e3ca86]/10'
                  }`}>
                    <Icon className="w-7 h-7 text-[#e3ca86]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-[#F5F5F5] mb-4">
                  {service.description}
                </p>
                {service.routes && (
                  <div className="flex flex-wrap gap-2">
                    {service.routes.map((route, i) => (
                      <span key={i} className="text-xs bg-[#e3ca86]/20 text-[#e3ca86] px-3 py-1 rounded-full">
                        {route}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
