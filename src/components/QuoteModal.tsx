import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    passengers: '1',
    luggage: '',
    phone: '',
    email: ''
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = language === 'ro'
      ? `Buna ziua! Solicit o oferta pentru:\n\nPreluare: ${form.pickup}\nDestinatie: ${form.dropoff}\nData: ${form.date}\nOra: ${form.time}\nPasageri: ${form.passengers}\nBagaje: ${form.luggage || 'Nespecificat'}\n\nContact: ${form.phone} / ${form.email}`
      : `Hello! I would like a quote for:\n\nPickup: ${form.pickup}\nDrop-off: ${form.dropoff}\nDate: ${form.date}\nTime: ${form.time}\nPassengers: ${form.passengers}\nLuggage: ${form.luggage || 'Not specified'}\n\nContact: ${form.phone} / ${form.email}`;

    const whatsappUrl = `https://wa.me/40773844200?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{t.quote.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1A1A1A] rounded-lg transition text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              {t.quote.pickup}
            </label>
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              required
              placeholder={t.quote.pickupPlaceholder}
              className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              {t.quote.dropoff}
            </label>
            <input
              type="text"
              name="dropoff"
              value={form.dropoff}
              onChange={handleChange}
              required
              placeholder={t.quote.dropoffPlaceholder}
              className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                {t.quote.date}
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                {t.quote.time}
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                {t.quote.passengers}
              </label>
              <select
                name="passengers"
                value={form.passengers}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                {t.quote.luggageNotes}
              </label>
              <input
                type="text"
                name="luggage"
                value={form.luggage}
                onChange={handleChange}
                placeholder={t.quote.luggagePlaceholder}
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                {t.quote.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+40 700 000 000"
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-semibold rounded-lg transition mt-6"
          >
            {t.quote.submitWhatsApp}
          </button>
        </form>
      </div>
    </div>
  );
}
