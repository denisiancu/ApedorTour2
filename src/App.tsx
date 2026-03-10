import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageModal } from '@/components/LanguageSelector';
import Navbar from '@/components/sections/navbar';
import Hero from '@/components/sections/hero';
import TrustStrip from '@/components/sections/trust-strip';
import Services from '@/components/sections/services';
import AboutUs from '@/components/sections/about-us';
import Fleet from '@/components/sections/fleet';
import Standards from '@/components/sections/standards';
import Pricing from '@/components/sections/pricing';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FaqPage from '@/pages/FaqPage';
import WhatsAppContact from '@/pages/WhatsAppContact';

function HomePage() {
  return (
    <div className="w-full bg-black">
      <LanguageModal />
      <Navbar />
      <Hero />
      <TrustStrip />
      <AboutUs />
      <Services />
      <Fleet />
      <Standards />
      <Pricing />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/whatsapp-contact" element={<WhatsAppContact />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
