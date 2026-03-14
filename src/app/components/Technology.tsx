import { Brain, Database, BarChart, Cloud, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Technology() {
  const { t } = useLanguage();

  const techCategories = [
    {
      icon: Brain,
      title: t('technology.categories.ai'),
      technologies: t('technology.techs.ai'),
      color: '#A855F7',
      gradient: 'from-purple-500 to-pink-500',
      borderColor: 'rgba(168, 85, 247, 0.3)',
      bgColor: 'rgba(168, 85, 247, 0.05)',
      glowColor: 'rgba(168, 85, 247, 0.4)',
    },
    {
      icon: Database,
      title: t('technology.categories.data'),
      technologies: t('technology.techs.data'),
      color: '#22D3EE',
      gradient: 'from-cyan-400 to-blue-500',
      borderColor: 'rgba(34, 211, 238, 0.3)',
      bgColor: 'rgba(34, 211, 238, 0.05)',
      glowColor: 'rgba(34, 211, 238, 0.4)',
    },
    {
      icon: BarChart,
      title: t('technology.categories.visualization'),
      technologies: t('technology.techs.visualization'),
      color: '#10FF00',
      gradient: 'from-green-400 to-emerald-500',
      borderColor: 'rgba(16, 255, 0, 0.3)',
      bgColor: 'rgba(16, 255, 0, 0.05)',
      glowColor: 'rgba(16, 255, 0, 0.4)',
    },
    {
      icon: Cloud,
      title: t('technology.categories.cloud'),
      technologies: t('technology.techs.cloud'),
      color: '#FFDD00',
      gradient: 'from-yellow-400 to-orange-500',
      borderColor: 'rgba(255, 221, 0, 0.3)',
      bgColor: 'rgba(255, 221, 0, 0.05)',
      glowColor: 'rgba(255, 221, 0, 0.4)',
    },
  ];

  return (
    <section id="technology" className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 backdrop-blur-sm"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(34, 211, 238, 0.1))',
              borderColor: 'rgba(168, 85, 247, 0.3)',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)'
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-semibold"
              style={{
                backgroundImage: 'linear-gradient(90deg, #A855F7, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('technology.badge')}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              backgroundImage: 'linear-gradient(135deg, #A855F7 0%, #22D3EE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}
          >
            {t('technology.title')}
          </h2>

          <p className="text-lg max-w-3xl mx-auto text-gray-400">
            {t('technology.subtitle')}
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-gray-950/40 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
              style={{
                borderColor: category.borderColor,
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.3), 0 0 40px ${category.bgColor}`
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 8px 24px ${category.glowColor}` }}
                >
                  <category.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-100">{category.title}</h3>
              </div>

              {/* Technologies Grid */}
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech: string, idx: number) => (
                  <div
                    key={idx}
                    className="group/tech relative px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: category.bgColor,
                      borderColor: `${category.color}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = category.color;
                      e.currentTarget.style.boxShadow = `0 0 20px ${category.glowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${category.color}40`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span
                      className="text-sm font-medium transition-all duration-300"
                      style={{ color: category.color }}
                    >
                      {tech}
                    </span>

                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover/tech:opacity-20 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${category.color}, transparent)`,
                        filter: 'blur(8px)'
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Card Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 flex justify-center">
          <div className="h-px w-full max-w-3xl"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), rgba(34, 211, 238, 0.4), transparent)'
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}