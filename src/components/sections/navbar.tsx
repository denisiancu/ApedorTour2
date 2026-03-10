import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageSelector';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#about-us', label: t.nav.aboutUs },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src="/Logo_Apedor_Tour_nou.png"
            alt="ApeD'or Tour"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-[#e3ca86] transition text-sm font-medium tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle />
          <a
            href="#contact"
            className="px-5 py-2 bg-[#e3ca86] hover:bg-[#d4bb77] text-black text-sm font-semibold rounded-lg transition"
          >
            {t.nav.bookNow}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-[#222222]">
          <div className="px-6 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-white hover:text-[#e3ca86] transition py-2 text-sm font-medium uppercase"
              >
                {link.label}
              </a>
            ))}
            <div className="py-2">
              <LanguageToggle />
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-center px-5 py-2 bg-[#e3ca86] hover:bg-[#d4bb77] text-black text-sm font-semibold rounded-lg transition mt-4"
            >
              {t.nav.bookNow}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
