import {
  Sparkles,
  ArrowRight,
  Database,
  Brain,
  Zap,
  Shield,
} from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';

interface HeroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t, language } = useLanguage();

  const capabilityIcons = [Brain, Database, Zap, Shield];

  // Function to render description with highlighted keywords
  const renderDescription = () => {
    const description = t('hero.description');
    
    if (language === 'en') {
      const parts = description.split(/(artificial intelligence|data engineering|automation)/gi);
      return parts.map((part: string, index: number) => {
        const lowerPart = part.toLowerCase();
        
        if (lowerPart === 'artificial intelligence') {
          return (
            <span 
              key={index}
              style={{
                color: '#22D3EE',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)',
              }}
            >
              {part}
            </span>
          );
        } else if (lowerPart === 'data engineering') {
          return (
            <span 
              key={index}
              style={{
                color: '#A855F7',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)',
              }}
            >
              {part}
            </span>
          );
        } else if (lowerPart === 'automation') {
          return (
            <span 
              key={index}
              style={{
                color: '#60A5FA',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.4)',
              }}
            >
              {part}
            </span>
          );
        }
        return part;
      });
    } else {
      const parts = description.split(/(inteligência artificial|engenharia de dados|automação)/gi);
      return parts.map((part: string, index: number) => {
        const lowerPart = part.toLowerCase();
        
        if (lowerPart === 'inteligência artificial') {
          return (
            <span 
              key={index}
              style={{
                color: '#22D3EE',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)',
              }}
            >
              {part}
            </span>
          );
        } else if (lowerPart === 'engenharia de dados') {
          return (
            <span 
              key={index}
              style={{
                color: '#A855F7',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)',
              }}
            >
              {part}
            </span>
          );
        } else if (lowerPart === 'automação') {
          return (
            <span 
              key={index}
              style={{
                color: '#60A5FA',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.4)',
              }}
            >
              {part}
            </span>
          );
        }
        return part;
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Cosmic Tech gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent"></div>
      </div>

      {/* Floating Cosmic orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{ backgroundImage: 'radial-gradient(circle, rgba(91, 124, 255, 0.15), transparent)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s', backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Premium Badge */}
        <div 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 animate-fade-in-up backdrop-blur-sm"
          style={{
            animationDelay: "0s",
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            boxShadow: '0 4px 16px rgba(34, 211, 238, 0.1), 0 0 0 1px rgba(168, 85, 247, 0.05) inset'
          }}
        >
          <span 
            className="text-sm font-medium tracking-wide"
            style={{
              background: 'linear-gradient(90deg, #22D3EE, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('hero.badge')}
          </span>
          <Sparkles className="w-4 h-4" style={{ color: '#A855F7', filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))' }} />
        </div>

        {/* Hero Title */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl mb-6 max-w-6xl mx-auto leading-tight animate-fade-in-up"
          style={{
            animationDelay: "0.1s",
            letterSpacing: "-0.02em",
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('hero.title')}
        </h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in-up"
          style={{
            animationDelay: "0.2s",
          }}
        >
          {renderDescription()}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Primary CTA */}
          <button
            onClick={() => onNavigate?.("contact")}
            className="group px-10 py-5 rounded-2xl transition-all duration-500 hover:scale-[1.02] font-semibold relative overflow-hidden shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1) inset'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34, 211, 238, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(34, 211, 238, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.2) inset';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(34, 211, 238, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1) inset';
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            ></div>

            <span className="flex items-center gap-3 relative z-10">
              <span 
                className="text-lg tracking-wide"
                style={{ 
                  backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px rgba(34, 211, 238, 0.3))'
                }}
              >
                {t('hero.primaryCta')}
              </span>
              <ArrowRight 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                style={{ color: '#22D3EE', filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.6))' }} 
              />
            </span>

            <div 
              className="absolute bottom-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent, #22D3EE, #A855F7, transparent)' }}
            ></div>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => onNavigate?.("solutions")}
            className="group px-10 py-5 rounded-2xl transition-all duration-500 hover:scale-[1.02] font-semibold relative overflow-hidden shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1) inset'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34, 211, 238, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(34, 211, 238, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.2) inset';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(34, 211, 238, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1) inset';
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            ></div>

            <span className="flex items-center gap-2 relative z-10">
              <span
                className="text-lg tracking-wide"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px rgba(34, 211, 238, 0.3))'
                }}
              >
                {t('hero.secondaryCta')}
              </span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" style={{ color: '#A855F7', filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))' }} />
            </span>

            <div 
              className="absolute bottom-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent, #22D3EE, #A855F7, transparent)' }}
            ></div>
          </button>
        </div>

        {/* Key Capabilities - Replacing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-6xl mx-auto">
          {t('hero.capabilities').map((capability: any, index: number) => {
            const Icon = capabilityIcons[index];
            return (
              <div
                key={index}
                className="group relative p-8 bg-gray-950/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-1"
                style={{ 
                  boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)' 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <Icon 
                    className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" 
                    style={{ 
                      color: '#22D3EE',
                      filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))'
                    }} 
                  />
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #22D3EE, #A855F7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {capability.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {capability.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Scroll indicator - Cosmic Tech */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#E5E7EB', opacity: 0.7 }}>
              Explore
            </span>
            <div className="w-6 h-10 border-2 rounded-full flex justify-center p-2" style={{ borderColor: 'rgba(34, 211, 238, 0.5)', boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)' }}>
              <div className="w-1 h-2 rounded-full animate-pulse" style={{ backgroundImage: 'linear-gradient(to bottom, #22D3EE, transparent)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}