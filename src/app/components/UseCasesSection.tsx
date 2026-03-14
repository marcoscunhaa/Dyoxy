import { Database, Bot, Zap, TrendingUp, BarChart3, GitBranch } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function UseCasesSection() {
  const { t } = useLanguage();

  const useCases = [
    {
      icon: BarChart3,
      title: t('useCases.items.0.title'),
      description: t('useCases.items.0.description'),
      color: '#22D3EE',
      gradient: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
      icon: Zap,
      title: t('useCases.items.1.title'),
      description: t('useCases.items.1.description'),
      color: '#A855F7',
      gradient: 'from-purple-500/20 to-purple-500/5',
    },
    {
      icon: Bot,
      title: t('useCases.items.2.title'),
      description: t('useCases.items.2.description'),
      color: '#38BDF8',
      gradient: 'from-cyan-400/20 to-cyan-400/5',
    },
    {
      icon: Database,
      title: t('useCases.items.3.title'),
      description: t('useCases.items.3.description'),
      color: '#C084FC',
      gradient: 'from-purple-400/20 to-purple-400/5',
    },
    {
      icon: TrendingUp,
      title: t('useCases.items.4.title'),
      description: t('useCases.items.4.description'),
      color: '#22D3EE',
      gradient: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
      icon: GitBranch,
      title: t('useCases.items.5.title'),
      description: t('useCases.items.5.description'),
      color: '#9333EA',
      gradient: 'from-purple-600/20 to-purple-600/5',
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 backdrop-blur-sm animate-fade-in"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))',
              borderColor: 'rgba(34, 211, 238, 0.3)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.15)'
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 8px #22D3EE' }}></div>
            <span className="text-xs uppercase tracking-wider font-semibold"
              style={{
                backgroundImage: 'linear-gradient(90deg, #22D3EE, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('useCases.badge')}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}
          >
            {t('useCases.title')}
          </h2>

          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#D1D5DB', lineHeight: '1.75' }}>
            {t('useCases.subtitle')}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(5, 7, 15, 0.7), rgba(8, 11, 21, 0.5))',
                borderColor: 'rgba(34, 211, 238, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = useCase.color + '60';
                e.currentTarget.style.boxShadow = `0 0 30px ${useCase.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${useCase.color}20, ${useCase.color}10)`,
                    border: `1px solid ${useCase.color}40`,
                  }}
                >
                  <useCase.icon className="w-7 h-7" style={{ color: useCase.color }} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 transition-all duration-300"
                  style={{
                    color: '#EDEDED',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  {useCase.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-sm"
                  style={{
                    color: '#9CA3AF',
                    lineHeight: '1.7'
                  }}
                >
                  {useCase.description}
                </p>

                {/* Decorative corner element */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-full h-full rounded-full filter blur-xl"
                    style={{ backgroundColor: useCase.color }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 h-px w-full max-w-4xl mx-auto"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.3), transparent)',
          }}
        ></div>
      </div>
    </section>
  );
}
