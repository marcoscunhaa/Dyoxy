import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// WhatsApp Icon Component
function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export function ContactSection() {
  const { t } = useLanguage();
  
  const whyChooseItems = t('contact.whyChoose.items');
  
  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{ backgroundColor: '#22D3EE' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{ backgroundColor: '#A855F7', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#A855F7' }}></div>
            <span className="text-xs uppercase tracking-wider" style={{ color: '#C084FC' }}>{t('contact.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #A855F7, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('contact.title')}
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left side - WhatsApp CTA - Elegante e Minimalista */}
          <div className="space-y-6">
            <div 
              className="relative backdrop-blur-md rounded-2xl p-10 transition-all duration-500 group/whatsapp overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))', 
                border: '1px solid rgba(16, 185, 129, 0.2)',
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.1)';
              }}
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover/whatsapp:scale-105" 
                      style={{ 
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <WhatsAppIcon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl blur-2xl opacity-50 group-hover/whatsapp:opacity-70 transition-opacity" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}></div>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl font-bold mb-3 text-center tracking-tight" 
                  style={{ 
                    color: '#EDEDED',
                    textShadow: '0 2px 10px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  {t('contact.whatsapp.title')}
                </h3>

                {/* Description */}
                <p className="mb-8 text-center leading-relaxed max-w-sm mx-auto" style={{ color: '#9CA3AF', fontSize: '14px' }}>
                  {t('contact.whatsapp.description')}
                </p>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/5588997475684?text=${encodeURIComponent(t('contact.whatsapp.message'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-4 text-white rounded-xl font-semibold transition-all duration-300 group/btn"
                  style={{ 
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <WhatsAppIcon className="w-5 h-5" />
                    {t('contact.whatsapp.cta')}
                    <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </a>

                {/* Status indicator */}
                <div className="mt-6 flex items-center justify-center gap-2" style={{ fontSize: '12px' }}>
                  <div className="relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#10B981' }}></div>
                    <div className="absolute w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#10B981', opacity: 0.75 }}></div>
                  </div>
                  <span style={{ color: '#10B981', fontWeight: 500 }}>{t('contact.whatsapp.status')}</span>
                  <span style={{ color: '#6B7280' }}>• {t('contact.whatsapp.quickResponse')}</span>
                </div>
              </div>
            </div>

            {/* Additional contact info */}
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <a
                href="mailto:dyoxyis@gmail.com"
                className="group flex flex-col items-center gap-3 p-4 border rounded-lg transition-all duration-300 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(5, 7, 15, 0.5), rgba(10, 14, 26, 0.5))', border: '1px solid rgba(168, 85, 247, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.1)';
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #22D3EE, #A855F7)' }}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs mb-1" style={{ color: '#E5E7EB' }}>{t('contact.email')}</h4>
                  <p className="text-xs transition-colors" style={{ color: '#9CA3AF' }}>dyoxyis@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+5588997475684"
                className="group flex flex-col items-center gap-3 p-4 border rounded-lg transition-all duration-300 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(5, 7, 15, 0.5), rgba(10, 14, 26, 0.5))', border: '1px solid rgba(168, 85, 247, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.1)';
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs mb-1" style={{ color: '#E5E7EB' }}>{t('contact.phone')}</h4>
                  <p className="text-xs transition-colors" style={{ color: '#9CA3AF' }}>+55 88 9 9747-5684</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - Value proposition */}
          <div className="border rounded-xl p-8 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: '#EDEDED' }}>{t('contact.whyChoose.title')}</h3>
            
            <div className="space-y-4">
              {whyChooseItems.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-gray-200 font-semibold text-sm mb-0.5">{item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}