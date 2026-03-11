import { CircleCheck as CheckCircle, Shield, Car, Wifi } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Standards() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      title: t.standards.professionalDriver,
      description: t.standards.professionalDriverDesc
    },
    {
      icon: Car,
      title: t.standards.mercedesVClass,
      description: t.standards.mercedesVClassDesc
    },
    {
      icon: Wifi,
      title: t.standards.premiumComfort,
      description: t.standards.premiumComfortDesc
    },
    {
      icon: CheckCircle,
      title: t.standards.discretion,
      description: t.standards.discretionDesc
    }
  ];

  const additionalServices = [
    t.standards.meetGreetAirport,
    t.standards.cleanInterior,
    t.standards.flexibility,
    t.standards.passengerInsurance,
    t.standards.securityDriver,
    t.standards.riskAssessment
  ];

  return (
    <section id="standards" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.standards.title}
          </h2>
          <p className="text-lg text-[#F5F5F5]">
            {t.standards.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="space-y-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[#e3ca86]/10 flex items-center justify-center group-hover:bg-[#e3ca86]/20 transition">
                      <Icon className="w-6 h-6 text-[#e3ca86]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[#F5F5F5]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative">
            <img
              src="/DJI_20260214172244_0534_D_DJD.JPG"
              alt="ApeD'or Tour - Premium Chauffeur Services"
              className="w-full rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#e3ca86] text-black text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
              Mercedes V-Class
            </div>
          </div>
        </div>

        <div className="bg-[#111111] rounded-xl p-10">
          <h3 className="text-2xl font-bold text-white mb-8">
            {t.standards.includedServices}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {additionalServices.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#e3ca86] flex-shrink-0 mt-0.5" />
                <span className="text-white">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-[#1A1A1A] text-white rounded-xl p-10 border border-[#e3ca86]/20">
          <h3 className="text-2xl font-bold mb-6">{t.standards.additionalServices}</h3>
          <p className="text-[#F5F5F5] leading-relaxed">
            {t.standards.additionalServicesDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
