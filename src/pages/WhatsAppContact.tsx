import { useState, useEffect } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageSelector';

const PHONE_NUMBER = '40773844200';

export default function WhatsAppContact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    passengers: '1',
    message: '',
  });

  useEffect(() => {
    document.title = language === 'ro'
      ? 'Contact WhatsApp | ApeD\'or Tour | Sibiu'
      : 'WhatsApp Contact | ApeD\'or Tour | Sibiu';
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageLines = [
      language === 'ro' ? 'Buna ziua! As dori sa fac o rezervare:' : 'Hello! I would like to make a booking:',
      '',
      `${language === 'ro' ? 'Nume' : 'Name'}: ${formData.name}`,
      `${language === 'ro' ? 'Preluare' : 'Pickup'}: ${formData.pickup}`,
      `${language === 'ro' ? 'Destinatie' : 'Dropoff'}: ${formData.dropoff}`,
      `${language === 'ro' ? 'Data' : 'Date'}: ${formData.date}`,
      `${language === 'ro' ? 'Ora' : 'Time'}: ${formData.time}`,
      `${language === 'ro' ? 'Pasageri' : 'Passengers'}: ${formData.passengers}`,
    ];

    if (formData.message) {
      messageLines.push('');
      messageLines.push(`${language === 'ro' ? 'Mesaj' : 'Message'}: ${formData.message}`);
    }

    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const labels = {
    ro: {
      title: 'Rezervare prin WhatsApp',
      subtitle: 'Completati formularul si va vom contacta imediat pe WhatsApp',
      name: 'Nume complet',
      pickup: 'Locatie preluare',
      dropoff: 'Destinatie',
      date: 'Data',
      time: 'Ora',
      passengers: 'Numar pasageri',
      message: 'Mesaj suplimentar (optional)',
      messagePlaceholder: 'Informatii suplimentare, bagaje speciale, etc.',
      submit: 'Trimite pe WhatsApp',
      back: 'Inapoi',
    },
    en: {
      title: 'Book via WhatsApp',
      subtitle: 'Fill out the form and we will contact you immediately on WhatsApp',
      name: 'Full name',
      pickup: 'Pickup location',
      dropoff: 'Destination',
      date: 'Date',
      time: 'Time',
      passengers: 'Number of passengers',
      message: 'Additional message (optional)',
      messagePlaceholder: 'Additional information, special luggage, etc.',
      submit: 'Send via WhatsApp',
      back: 'Back',
    },
  };

  const t = labels[language];

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/HIGH_Quality_Apedor_Tour_Logo_No_Background2.png"
              alt="ApeD'or Tour"
              className="h-10 md:h-12 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </a>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a
              href="/"
              className="flex items-center gap-2 text-white hover:text-[#e3ca86] transition text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.back}
            </a>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#e3ca86] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-black" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t.title}</h1>
            <p className="text-[#F5F5F5]/70">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white mb-2">{t.name}</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">{t.pickup}</label>
              <input
                type="text"
                name="pickup"
                required
                value={formData.pickup}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">{t.dropoff}</label>
              <input
                type="text"
                name="dropoff"
                required
                value={formData.dropoff}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white mb-2">{t.date}</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm text-white mb-2">{t.time}</label>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white mb-2">{t.passengers}</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent transition"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-white mb-2">{t.message}</label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-3 bg-[#111111] border border-[#222222] rounded-lg text-white placeholder:text-[#F5F5F5]/50 focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {t.submit}
            </button>
          </form>
        </div>
      </main>

      <footer className="border-t border-[#1A1A1A] py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[#F5F5F5]/50">
          <p>© {new Date().getFullYear()} APEDOR TOUR SRL. {language === 'ro' ? 'Toate drepturile rezervate.' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}
