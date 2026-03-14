import { Database, BarChart, Bot, Network, LineChart, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function SolutionsSection() {
  const { t, language } = useLanguage();
  
  const solutionIcons = [Database, BarChart, Bot, Network, LineChart];

  // Cores neon para cada solução: Ciano, Verde Neon, Vermelho, Amarelo, Roxo claro
  const neonColors = [
    {
      primary: '#22D3EE',      // Cyan
      secondary: '#38BDF8',
      gradient: 'from-cyan-400 to-cyan-500',
      border: 'rgba(34, 211, 238, 0.3)',
      glow: 'rgba(34, 211, 238, 0.4)',
      bg: 'rgba(34, 211, 238, 0.05)',
    },
    {
      primary: '#10FF00',      // Green Neon
      secondary: '#00FF88',
      gradient: 'from-green-400 to-emerald-400',
      border: 'rgba(16, 255, 0, 0.3)',
      glow: 'rgba(16, 255, 0, 0.4)',
      bg: 'rgba(16, 255, 0, 0.05)',
    },
    {
      primary: '#FF0080',      // Red Neon (Hot Pink)
      secondary: '#FF3399',
      gradient: 'from-pink-500 to-rose-500',
      border: 'rgba(255, 0, 128, 0.3)',
      glow: 'rgba(255, 0, 128, 0.4)',
      bg: 'rgba(255, 0, 128, 0.05)',
    },
    {
      primary: '#FFDD00',      // Yellow Neon
      secondary: '#FFEE66',
      gradient: 'from-yellow-400 to-amber-400',
      border: 'rgba(255, 221, 0, 0.3)',
      glow: 'rgba(255, 221, 0, 0.4)',
      bg: 'rgba(255, 221, 0, 0.05)',
    },
    {
      primary: '#C084FC',      // Light Purple
      secondary: '#E9D5FF',
      gradient: 'from-purple-300 to-purple-400',
      border: 'rgba(192, 132, 252, 0.3)',
      glow: 'rgba(192, 132, 252, 0.4)',
      bg: 'rgba(192, 132, 252, 0.05)',
    },
  ];

  const whatsappMessage = language === 'en' 
    ? `Hello! I'd like to learn more about {solutionName} from Dyoxy.`
    : `Olá! Gostaria de conhecer {solutionName} da Dyoxy.`;

  return (
    <section id="solutions" className="relative py-20 overflow-hidden">
      {/* Neon background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl" style={{ backgroundImage: 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full filter blur-3xl" style={{ backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Premium */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border rounded-full mb-4 backdrop-blur-sm" style={{ backgroundColor: 'rgba(34, 211, 238, 0.08)', borderColor: 'rgba(34, 211, 238, 0.25)' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 8px #22D3EE' }}></div>
            <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#22D3EE' }}>{t('solutions.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t('solutions.title')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base">
            {t('solutions.subtitle')}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {t('solutions.items').map((solution: any, index: number) => {
            const Icon = solutionIcons[index];
            const colors = neonColors[index];
            return (
              <div key={index} className="relative group h-full">
                <div
                  className="relative h-full bg-gray-950/40 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 flex flex-col"
                  style={{
                    borderColor: colors.border,
                    boxShadow: `0 2px 20px rgba(0, 0, 0, 0.3), 0 0 30px ${colors.bg}`
                  }}
                >
                  {/* Icon & Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
                      style={{ boxShadow: `0 4px 15px ${colors.glow}` }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-100 mb-1">{solution.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {solution.description}
                  </p>

                  {/* Examples */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {solution.examples.map((example: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} strokeWidth={2.5} />
                        <span className="text-gray-300 text-xs leading-relaxed">{example}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/5588997475684?text=${encodeURIComponent(whatsappMessage.replace('{solutionName}', solution.title))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center px-6 py-3.5 bg-gradient-to-r ${colors.gradient} rounded-xl font-semibold transition-all duration-300 group/btn hover:scale-[1.02] mt-auto`}
                    style={{ 
                      color: '#EDEDED',
                      boxShadow: `0 4px 20px ${colors.glow}`
                    }}
                  >
                    <span className="flex items-center justify-center gap-2 text-sm">
                      {language === 'en' ? 'Request Quote' : 'Solicitar Orçamento'}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </a>

                  {/* Subtle hover glow */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}