import { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = language === 'ro'
      ? `Salut! Sunt ${formData.name} si as dori o oferta pentru: ${formData.service || 'servicii de transport'}. Mesaj: ${formData.message || 'Nu am detalii suplimentare'}. Va contactez la: ${formData.email} / ${formData.phone}`
      : `Hello! I am ${formData.name} and I would like a quote for: ${formData.service || 'transport services'}. Message: ${formData.message || 'No additional details'}. Contact me at: ${formData.email} / ${formData.phone}`;
    const whatsappUrl = `https://wa.me/40773844200?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const serviceOptions = language === 'ro'
    ? [
        { value: '', label: t.contact.selectService },
        { value: 'Transfer Aeroport', label: 'Transfer Aeroport' },
        { value: 'Business Travel', label: 'Business Travel' },
        { value: 'Evenimente', label: 'Transport evenimente' },
        { value: 'Tururi Private', label: 'Tururi Private' },
        { value: 'Security Driver', label: 'Security Driver' },
        { value: 'Altul', label: 'Altul' }
      ]
    : [
        { value: '', label: t.contact.selectService },
        { value: 'Airport Transfer', label: 'Airport Transfer' },
        { value: 'Business Travel', label: 'Business Travel' },
        { value: 'Events', label: 'Event Transportation' },
        { value: 'Private Tours', label: 'Private Tours' },
        { value: 'Security Driver', label: 'Security Driver' },
        { value: 'Other', label: 'Other' }
      ];

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-[#F5F5F5]">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">{t.contact.contactInfo}</h3>

              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#e3ca86]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e3ca86]/20 transition">
                    <Phone className="w-6 h-6 text-[#e3ca86]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.contact.phoneWhatsApp}</p>
                    <a href="tel:+40773844200" className="text-[#e3ca86] hover:text-[#d4bb77] font-medium">
                      +40 773 844 200
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#e3ca86]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e3ca86]/20 transition">
                    <Mail className="w-6 h-6 text-[#e3ca86]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.contact.email}</p>
                    <a href="mailto:apedortour@gmail.com" className="text-[#e3ca86] hover:text-[#d4bb77] font-medium">
                      apedortour@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#e3ca86]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e3ca86]/20 transition">
                    <MapPin className="w-6 h-6 text-[#e3ca86]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.contact.location}</p>
                    <p className="text-[#F5F5F5]/70">Sibiu, Jud. Sibiu, Romania</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.contact.followUs}</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/apedortour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#e3ca86]/30 text-white rounded-lg hover:bg-[#222222] transition"
                >
                  <Instagram className="w-5 h-5 text-[#e3ca86]" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61583266621950"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#e3ca86]/30 text-white rounded-lg hover:bg-[#222222] transition"
                >
                  <Facebook className="w-5 h-5 text-[#e3ca86]" />
                  Facebook
                </a>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#e3ca86]/20">
              <h4 className="font-bold text-white mb-3">{t.contact.b2b}</h4>
              <p className="text-sm text-[#F5F5F5] mb-4">
                {t.contact.b2bDesc}
              </p>
              <ul className="text-sm text-[#F5F5F5] space-y-2">
                <li>• {t.contact.partnerRates}</li>
                <li>• {t.contact.invoicing}</li>
                <li>• {t.contact.availability}</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t.contact.fullName}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#222222] bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
                placeholder="Ion Ionescu"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#222222] bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
                placeholder="ionescu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t.contact.phoneWhatsApp}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#222222] bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
                placeholder="+40 700 000 000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t.contact.serviceType}
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#222222] bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {t.contact.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-[#222222] bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3ca86] focus:border-transparent"
                placeholder={t.contact.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-bold rounded-lg transition transform hover:scale-[1.02]"
            >
              {t.contact.sendWhatsApp}
            </button>

            <p className="text-xs text-[#F5F5F5]/50 text-center">
              {t.contact.formDisclaimer}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
