import { Award, Sparkles } from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';

export function FounderSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full filter blur-3xl opacity-20" 
          style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 border rounded-full backdrop-blur-md animate-fade-in" 
            style={{ 
              backgroundImage: 'linear-gradient(90deg, rgba(34, 211, 238, 0.12), rgba(168, 85, 247, 0.12))', 
              borderColor: 'rgba(168, 85, 247, 0.4)', 
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' 
            }}
          >
            <Award className="w-4 h-4" style={{ color: '#A855F7' }} />
            <span className="text-sm font-semibold" 
              style={{ 
                backgroundImage: 'linear-gradient(90deg, #22D3EE, #A855F7)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text' 
              }}
            >
              {t('founder.badge')}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative group">
              {/* Glowing rings */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.2)',
                }}
              ></div>

              {/* Outer ring */}
              <div className="absolute -inset-4 rounded-full opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.3))',
                  filter: 'blur(20px)',
                }}
              ></div>

              {/* Border ring */}
              <div className="relative w-80 h-80 rounded-full p-1.5"
                style={{
                  background: 'linear-gradient(135deg, #22D3EE, #A855F7)',
                  boxShadow: '0 0 60px rgba(34, 211, 238, 0.3), 0 0 100px rgba(168, 85, 247, 0.2)',
                }}
              >
                {/* Inner dark ring */}
                <div className="w-full h-full rounded-full p-2"
                  style={{
                    background: 'linear-gradient(135deg, #05070F, #080B15)',
                  }}
                >
                  {/* Image container */}
                  <div className="w-full h-full rounded-full overflow-hidden border-2"
                    style={{
                      borderColor: 'rgba(34, 211, 238, 0.2)',
                    }}
                  >
                    <img
                      src="https://i.ibb.co/nqRLZpfd/Chat-GPT-Image-24-de-mar-de-2026-09-23-43.png"
                      alt="Marcos Cunha - Founder & CEO"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute top-0 right-0 w-3 h-3 rounded-full animate-pulse"
                style={{ background: '#22D3EE', boxShadow: '0 0 20px #22D3EE' }}
              ></div>
              <div className="absolute bottom-8 left-0 w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#A855F7', boxShadow: '0 0 15px #A855F7', animationDelay: '0.5s' }}
              ></div>
              <div className="absolute top-1/4 -right-4 w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#38BDF8', boxShadow: '0 0 15px #38BDF8', animationDelay: '1s' }}
              ></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            {/* Name */}
            <h2 
              className="text-5xl lg:text-6xl font-bold mb-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(34, 211, 238, 0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              {t('founder.name')}
            </h2>

            {/* Title */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
              <Sparkles className="w-5 h-5" style={{ color: '#A855F7' }} />
              <h3 
                className="text-xl font-semibold tracking-wide"
                style={{
                  color: '#C084FC',
                  textShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                }}
              >
                {t('founder.title')}
              </h3>
            </div>

            {/* Description */}
            <p 
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{
                color: '#D1D5DB',
                lineHeight: '1.8',
              }}
              dangerouslySetInnerHTML={{ __html: t('founder.description') || '' }}
            />

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {(t('founder.expertise') || []).map((skill: string, index: number) => (
                <div
                  key={index}
                  className="group px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(168, 85, 247, 0.08))',
                    borderColor: 'rgba(34, 211, 238, 0.3)',
                  }}
                >
                  <span 
                    className="text-sm font-medium"
                    style={{
                      color: '#E5E7EB',
                    }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-20 h-px w-full max-w-4xl mx-auto"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.3), transparent)',
          }}
        ></div>
      </div>
    </section>
  );
}