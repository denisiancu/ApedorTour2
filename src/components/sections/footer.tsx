import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const services = language === 'ro'
    ? ['Transfer Aeroport', 'Business Travel', 'Evenimente', 'Tururi Private', 'Security Driver']
    : ['Airport Transfer', 'Business Travel', 'Events', 'Private Tours', 'Security Driver'];

  const quickLinks = language === 'ro'
    ? [
        { href: '#about-us', label: 'Despre Noi' },
        { href: '#contact', label: 'Contact' },
        { href: '/faq', label: 'FAQ' },
      ]
    : [
        { href: '#about-us', label: 'About Us' },
        { href: '#contact', label: 'Contact' },
        { href: '/faq', label: 'FAQ' },
      ];

  return (
    <footer className="bg-[#0B0B0B] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/HIGH_Quality_Apedor_Tour_Logo_No_Background2.png"
                alt="ApeD'or Tour"
                className="h-14 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-[#F5F5F5] mb-6">
              {t.footer.description}
            </p>
            <p className="text-sm text-[#F5F5F5]/70">
              {t.footer.location}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t.footer.quickContact}</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#e3ca86] flex-shrink-0" />
                <a href="tel:+40773844200" className="hover:text-[#e3ca86] transition">
                  +40 773 844 200
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#e3ca86] flex-shrink-0" />
                <a href="mailto:apedortour@gmail.com" className="hover:text-[#e3ca86] transition">
                  apedortour@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e3ca86] flex-shrink-0 mt-1" />
                <span>Sibiu, Jud. Sibiu, Romania</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t.footer.services}</h4>
            <ul className="space-y-2 text-[#F5F5F5] text-sm">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="hover:text-[#e3ca86] transition">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{language === 'ro' ? 'Link-uri Rapide' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-[#F5F5F5] text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-[#e3ca86] transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#222222] pt-8">
          <div className="text-center text-sm text-[#F5F5F5]/70">
            <p>© {currentYear} APEDOR TOUR SRL. {t.footer.allRights}</p>
            <p className="mt-2">{t.footer.guaranteed}</p>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A] mt-8 pt-6">
          <p className="text-center text-xs text-[#F5F5F5]/50 leading-relaxed">
            © {currentYear} APEDOR TOUR S.R.L. &bull; CUI 52787314 &bull; J2025082483008 &bull; EUID ROONRC.J2025082483008 &bull; Registered office: Strada Lunga nr. 155, Oras Cisnadie, Sibiu, Romania &bull; CAEN 4939
          </p>
        </div>
      </div>
    </footer>
  );
}
