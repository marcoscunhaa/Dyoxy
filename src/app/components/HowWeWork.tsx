import { Search, FileText, Code, TestTube, Cloud } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function HowWeWork() {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: Search,
      title: t('howWeWork.steps.0.title'),
      description: t('howWeWork.steps.0.description'),
    },
    {
      icon: FileText,
      title: t('howWeWork.steps.1.title'),
      description: t('howWeWork.steps.1.description'),
    },
    {
      icon: Code,
      title: t('howWeWork.steps.2.title'),
      description: t('howWeWork.steps.2.description'),
    },
    {
      icon: TestTube,
      title: t('howWeWork.steps.3.title'),
      description: t('howWeWork.steps.3.description'),
    },
    {
      icon: Cloud,
      title: t('howWeWork.steps.4.title'),
      description: t('howWeWork.steps.4.description'),
    },
  ];

  return (
    <section id="methodology" className="relative py-20 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4 backdrop-blur-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-purple-300 uppercase tracking-wider">{t('howWeWork.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {t('howWeWork.title')}
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('howWeWork.subtitle')}
          </p>
        </div>

        {/* Steps Grid - Horizontal Layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={`group relative text-center ${index === 4 ? 'col-span-2 md:col-span-1 flex justify-center' : ''}`}>
              <div className={index === 4 ? 'w-full md:w-auto' : 'w-full'}>
              {/* Connection line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-purple-500/30 to-transparent z-0"></div>
              )}
              
              {/* Icon */}
              <div className="relative mb-4 inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl flex items-center justify-center group-hover:border-purple-500/50 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-purple-400" />
                </div>
                
                {/* Number badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-purple-500/50">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold text-gray-100 mb-1">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}