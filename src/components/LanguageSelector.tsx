import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageModal() {
  const { showSelector, setLanguage, t } = useLanguage();

  if (!showSelector) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <Globe className="w-12 h-12 text-[#e3ca86] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            {t.language.selectLanguage}
          </h2>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setLanguage('ro')}
            className="w-full px-6 py-4 bg-[#1A1A1A] hover:bg-[#e3ca86] hover:text-black text-white font-medium rounded-xl transition flex items-center justify-center gap-3 border border-[#222222] hover:border-[#e3ca86]"
          >
            <span className="text-2xl">RO</span>
            <span>Romana</span>
          </button>
          <button
            onClick={() => setLanguage('en')}
            className="w-full px-6 py-4 bg-[#1A1A1A] hover:bg-[#e3ca86] hover:text-black text-white font-medium rounded-xl transition flex items-center justify-center gap-3 border border-[#222222] hover:border-[#e3ca86]"
          >
            <span className="text-2xl">EN</span>
            <span>English</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'ro' ? 'en' : 'ro')}
      className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#222222] rounded-lg transition text-sm font-medium text-white"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-[#e3ca86]" />
      <span className="uppercase">{language}</span>
    </button>
  );
}
