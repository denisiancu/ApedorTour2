import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageSelector';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqDataRo = [
  {
    question: 'Cum pot rezerva un serviciu de transport?',
    answer: 'Puteti rezerva prin telefon la +40 773 844 200, prin WhatsApp, sau completand formularul de pe site. Va recomandam sa rezervati cu cel putin 24 de ore inainte pentru a garanta disponibilitatea.',
  },
  {
    question: 'Ce tipuri de vehicule aveti disponibile?',
    answer: 'Flota noastra include Mercedes V-Class, vehiculul premium pentru transport VIP. Oferim spatiu generos pentru pana la 7 pasageri, bagaje ample si toate facilitatile premium: Wi-Fi, climatizare, apa complimentara.',
  },
  {
    question: 'Oferiti servicii de Meet & Greet la aeroport?',
    answer: 'Da, toate transferurile aeroportuare includ serviciul Meet & Greet. Soferul va asteapta cu o pancarta personalizata in zona de sosiri si va ajuta cu bagajele.',
  },
  {
    question: 'Ce se intampla daca zborul meu are intarziere?',
    answer: 'Monitorizam toate zborurile in timp real. Daca zborul are intarziere, soferul nostru isi va ajusta automat programul pentru a va intampina la sosire, fara costuri suplimentare.',
  },
  {
    question: 'Care este politica de anulare?',
    answer: 'Anularile cu mai mult de 24 de ore inainte sunt gratuite. Pentru anulari in mai putin de 24 de ore, se poate aplica o taxa de anulare partiala. Va rugam sa ne contactati pentru detalii.',
  },
  {
    question: 'Acceptati plati cu cardul?',
    answer: 'Da, acceptam plati cu cardul, transfer bancar si numerar. Pentru clientii corporate, oferim si facturare cu plata ulterioara.',
  },
  {
    question: 'Cate bagaje pot lua cu mine?',
    answer: 'Mercedes V-Class are un spatiu generos pentru bagaje. Pentru transferuri standard, fiecare pasager poate avea un bagaj mare si un bagaj de mana. Pentru grupuri mai mari sau bagaje speciale, va rugam sa ne informati in avans.',
  },
  {
    question: 'Oferiti servicii de transport international?',
    answer: 'Da, oferim transport international catre Ungaria, Austria, Germania si alte destinatii europene. Pretul include toate taxele de drum si vignete.',
  },
  {
    question: 'Soferii vorbesc limbi straine?',
    answer: 'Da, soferii nostri vorbesc romana si engleza. Pentru alte limbi, va rugam sa ne informati in avans si vom face tot posibilul sa va oferim un sofer potrivit.',
  },
  {
    question: 'Oferiti servicii de protectie/bodyguard?',
    answer: 'Da, oferim servicii de bodyguard si protectie executiva la cerere, in conformitate cu legislatia in vigoare. Acestea sunt disponibile pentru clientii care necesita un nivel suplimentar de securitate.',
  },
  {
    question: 'Pot solicita opriri suplimentare pe traseu?',
    answer: 'Da, puteti solicita opriri suplimentare. Va rugam sa mentionati acest lucru la rezervare pentru a include timpul suplimentar in planificarea calatoriei.',
  },
  {
    question: 'Oferiti tarife speciale pentru companii?',
    answer: 'Da, colaboram cu hoteluri, agentii de turism si companii, oferind tarife preferentiale, facturare si contracte pe termen lung. Contactati-ne pentru o oferta personalizata.',
  },
];

const faqDataEn = [
  {
    question: 'How can I book a transport service?',
    answer: 'You can book by phone at +40 773 844 200, via WhatsApp, or by filling out the form on our website. We recommend booking at least 24 hours in advance to guarantee availability.',
  },
  {
    question: 'What types of vehicles do you have available?',
    answer: 'Our fleet includes Mercedes V-Class, the premium vehicle for VIP transport. We offer generous space for up to 7 passengers, ample luggage room and all premium amenities: Wi-Fi, climate control, complimentary water.',
  },
  {
    question: 'Do you offer Meet & Greet service at the airport?',
    answer: 'Yes, all airport transfers include Meet & Greet service. The driver will wait for you with a personalized sign in the arrivals area and assist you with your luggage.',
  },
  {
    question: 'What happens if my flight is delayed?',
    answer: 'We monitor all flights in real-time. If your flight is delayed, our driver will automatically adjust their schedule to meet you upon arrival, at no extra cost.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Cancellations more than 24 hours in advance are free. For cancellations less than 24 hours before, a partial cancellation fee may apply. Please contact us for details.',
  },
  {
    question: 'Do you accept card payments?',
    answer: 'Yes, we accept card payments, bank transfers and cash. For corporate clients, we also offer invoicing with deferred payment.',
  },
  {
    question: 'How much luggage can I bring?',
    answer: 'The Mercedes V-Class has generous luggage space. For standard transfers, each passenger can have one large suitcase and one carry-on. For larger groups or special luggage, please inform us in advance.',
  },
  {
    question: 'Do you offer international transport services?',
    answer: 'Yes, we offer international transport to Hungary, Austria, Germany and other European destinations. The price includes all road taxes and vignettes.',
  },
  {
    question: 'Do the drivers speak foreign languages?',
    answer: 'Yes, our drivers speak Romanian and English. For other languages, please inform us in advance and we will do our best to provide a suitable driver.',
  },
  {
    question: 'Do you offer protection/bodyguard services?',
    answer: 'Yes, we offer bodyguard and executive protection services upon request, in compliance with applicable regulations. These are available for clients who require an additional level of security.',
  },
  {
    question: 'Can I request additional stops along the route?',
    answer: 'Yes, you can request additional stops. Please mention this when booking to include the extra time in the trip planning.',
  },
  {
    question: 'Do you offer special rates for companies?',
    answer: 'Yes, we partner with hotels, travel agencies and companies, offering preferential rates, invoicing and long-term contracts. Contact us for a personalized offer.',
  },
];

export default function FaqPage() {
  const { language } = useLanguage();
  const faqData = language === 'ro' ? faqDataRo : faqDataEn;

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [faqData]);

  useEffect(() => {
    document.title = language === 'ro'
      ? 'FAQ | ApeD\'or Tour - Intrebari Frecvente | Sibiu'
      : 'FAQ | ApeD\'or Tour - Frequently Asked Questions | Sibiu';
  }, [language]);

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/HIGH_Quality_Apedor_Tour_Logo_No_Background2.png"
              alt="ApeD'or Tour"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a
              href="/"
              className="flex items-center gap-2 text-white hover:text-[#e3ca86] transition text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              {language === 'ro' ? 'Inapoi' : 'Back'}
            </a>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === 'ro' ? 'Intrebari Frecvente' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-[#F5F5F5]/70 text-lg">
              {language === 'ro'
                ? 'Gasiti raspunsuri la cele mai frecvente intrebari despre serviciile noastre'
                : 'Find answers to the most common questions about our services'}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#111111] border border-[#1A1A1A] rounded-lg px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-white hover:text-[#e3ca86] py-5 text-base md:text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#F5F5F5] pb-5 text-sm md:text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-[#F5F5F5]/70 mb-4">
              {language === 'ro'
                ? 'Nu ati gasit raspunsul? Contactati-ne direct.'
                : "Didn't find your answer? Contact us directly."}
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3 bg-[#e3ca86] hover:bg-[#d4bb77] text-black font-semibold rounded-lg transition"
            >
              {language === 'ro' ? 'Contactati-ne' : 'Contact Us'}
            </a>
          </div>
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
