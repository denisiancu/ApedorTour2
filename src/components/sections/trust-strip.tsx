import { Award, Users, Plane, Wifi, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TrustStrip() {
  const { t } = useLanguage();

  const trustItems = [
    { icon: Award, title: t.trust.licensed, desc: t.trust.licensedDesc },
    { icon: Users, title: t.trust.meetGreet, desc: t.trust.meetGreetDesc },
    { icon: Plane, title: t.trust.flightTracking, desc: t.trust.flightTrackingDesc },
    { icon: Wifi, title: t.trust.amenities, desc: t.trust.amenitiesDesc },
    { icon: Shield, title: t.trust.insured, desc: t.trust.insuredDesc }
  ];

  return (
    <section className="bg-[#0B0B0B] py-8 border-y border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-[#e3ca86]/10 flex items-center justify-center mb-3 group-hover:bg-[#e3ca86]/20 transition">
                  <Icon className="w-6 h-6 text-[#e3ca86]" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#F5F5F5]/70">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
