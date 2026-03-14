import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SolutionsSection } from './components/SolutionsSection';
import { HowWeWork } from './components/HowWeWork';
import { Technology } from './components/Technology';
import { UseCasesSection } from './components/UseCasesSection';
import { ContactSection } from './components/ContactSection';
import { FounderSection } from './components/FounderSection';
import { Footer } from './components/Footer';
import { GeneticField } from './components/GeneticField';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div 
        className="min-h-screen font-inter" 
        style={{ 
          background: 'linear-gradient(180deg, #05070F 0%, #080B15 40%, #05070F 100%)'
        }}
      >
        {/* Minimalist Premium Genetic Background */}
        <GeneticField />
        
        {/* Main Content */}
        <div className="relative z-10">
          <Navbar onNavigate={scrollToSection} />
          <HeroSection onNavigate={scrollToSection} />
          <FounderSection />
          <HowWeWork />
          <UseCasesSection />
          <SolutionsSection />
          <Technology />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;