import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    nav: {
      methodology: "Methodology",
      solutions: "Solutions",
      technology: "Technologies",
      contact: "Contact",
    },
    hero: {
      badge: "Technology for those who lead, not compete",
      title: "From Data to Decisions",
      subtitle: "",
      description: "Dyoxy helps companies solve complex challenges with artificial intelligence, data engineering and automation. We analyze your business and develop custom technological solutions to automate processes, integrate systems and transform data into strategic intelligence.",
      primaryCta: "Free Consultation",
      secondaryCta: "Explore Solutions",
      capabilities: [
        {
          title: "AI-Powered Integrations",
          description: "Intelligent automation and machine learning solutions.",
        },
        {
          title: "Data-Driven Decisions",
          description: "Transform raw data into strategic insights.",
        },
        {
          title: "Automation Platforms",
          description: "Automate workflows and eliminate repetitive processes.",
        },
        {
          title: "Enterprise Data Security",
          description: "Scalable and secure data infrastructure.",
        },
      ],
    },
    solutions: {
      badge: "Solutions",
      title: "Intelligent Data & AI Solutions",
      subtitle: "We design intelligent systems that transform data into automation, insights and scalable decision platforms.",
      items: [
        {
          title: "Data Automation",
          description: "Automate repetitive processes and eliminate manual work. We design data pipelines, ETL systems and automated reporting processes.",
          examples: [
            "Excel automation",
            "Data pipelines",
            "Automated reports",
            "Web Scraping & Market Intelligence",
          ],
        },
        {
          title: "Corporate Dashboards",
          description: "Transform business data into visual intelligence through modern and interactive dashboards designed for strategic decision-making.",
          examples: [
            "Financial dashboards",
            "Sales analytics dashboards",
            "Operational metrics",
            "Business intelligence systems",
          ],
        },
        {
          title: "AI Agents",
          description: "AI-powered agents capable of analyzing information, executing tasks and automating business operations.",
          examples: [
            "Customer support AI",
            "Data analysis agents",
            "Internal automation assistants",
            "Workflow orchestration",
            "WhatsApp integration",
          ],
        },
        {
          title: "Data Engineering & Big Data",
          description: "Design and implementation of scalable data architectures capable of processing large volumes of information.",
          examples: [
            "Data pipelines",
            "Data lakes",
            "Big data processing",
            "Cloud data infrastructure",
          ],
        },
        {
          title: "Data Science & Predictive Analytics",
          description: "Advanced analytics and machine learning models that identify patterns and predict future business outcomes.",
          examples: [
            "Demand prediction",
            "Sales forecasting",
            "Customer behavior analysis",
            "Machine learning models",
          ],
        },
      ],
    },
    howWeWork: {
      badge: "Our Process",
      title: "Our Methodology",
      subtitle: "Consulting approach from problem diagnosis to cloud deployment",
      steps: [
        {
          title: "Consulting",
          description: "We identify your business challenges and data needs",
        },
        {
          title: "Proposal",
          description: "We present a custom solution designed for your goals",
        },
        {
          title: "Development",
          description: "We build the intelligent solution with best practices",
        },
        {
          title: "Testing",
          description: "Quality assurance and validation of all functionalities",
        },
        {
          title: "Cloud",
          description: "Scalable deployment to production environment",
        },
      ],
    },
    technology: {
      badge: "Technology Stack",
      title: "AI, Data & Cloud Technologies",
      subtitle: "Industry-leading tools for data intelligence and automation",
      categories: {
        ai: "AI & Machine Learning",
        data: "Data Engineering",
        visualization: "Data Visualization",
        cloud: "Cloud & Infrastructure",
      },
      techs: {
        ai: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Scikit-learn", "LangChain"],
        data: ["Python", "Julia", "Pandas", "NumPy", "Scrapy", "Apache Spark", "Kafka", "Airflow"],
        visualization: ["Power BI", "Tableau", "Metabase", "Superset", "Plotly"],
        cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "Snowflake", "BigQuery"],
      },
    },
    useCases: {
      badge: "Real Business Challenges",
      title: "Problems We Solve",
      subtitle: "Real-world business challenges that our AI, data and automation solutions address",
      items: [
        {
          title: "Scattered Data Across Systems",
          description: "Your business data is spread across multiple spreadsheets, databases and platforms, making it impossible to see the complete picture and make informed decisions quickly.",
        },
        {
          title: "Manual Repetitive Work",
          description: "Your team spends hours every week doing the same manual tasks in spreadsheets: copying data, generating reports, updating tables. This repetitive work wastes time and creates errors.",
        },
        {
          title: "Slow Customer Support",
          description: "Your support team is overwhelmed with repetitive customer questions, leading to slow response times, frustrated customers and burnt-out employees.",
        },
        {
          title: "Unorganized Data Infrastructure",
          description: "Your company data is scattered across disconnected systems with no central repository, making analytics impossible and forcing teams to manually consolidate information.",
        },
        {
          title: "Unable to Predict Trends",
          description: "You rely on gut feeling instead of data to forecast demand, plan inventory and predict business outcomes, leading to missed opportunities and poor resource allocation.",
        },
        {
          title: "Disconnected Systems",
          description: "Your enterprise systems don't talk to each other, forcing employees to manually transfer data between platforms, creating delays, errors and duplicate work.",
        },
      ],
    },
    projects: {
      badge: "Portfolio",
      title: "Projects in Progress",
      subtitle: "Practical examples of projects built with AI, data and automation",
      items: [
        {
          title: "Corporate KPI Dashboard",
          description: "Interactive dashboard that tracks business metrics and KPIs in real time, integrating multiple data sources for executive decision-making.",
          features: ["KPI monitoring", "Financial metrics", "Charts & filters", "Real-time analytics"],
          tech: "Power BI • Python • SQL",
        },
        {
          title: "Excel Automation System",
          description: "Automated Excel workflows that process large datasets and generate reports automatically, eliminating manual spreadsheet work.",
          features: ["Automated reports", "Data processing", "Spreadsheet automation", "System integrations"],
          tech: "Python • Pandas • Excel Automation",
        },
        {
          title: "AI Business Assistant",
          description: "AI agent capable of analyzing company data and answering questions using natural language.",
          features: ["AI chat interface", "Data analysis", "Automated insights", "Natural language"],
          tech: "OpenAI GPT • Python • APIs",
        },
      ],
    },
    contact: {
      badge: "Get in Touch",
      title: "Let's Transform Your Data Into Intelligence",
      subtitle: "Talk with our specialists to discover how AI, data analytics and automation can transform your business operations.",
      whatsapp: {
        title: "Talk on WhatsApp",
        description: "Our data and AI specialists are ready to understand your needs and propose intelligent solutions.",
        cta: "Start Conversation",
        status: "Online now",
        quickResponse: "Quick response",
        message: "Hello! I would like to learn about Dyoxy's data and AI solutions and receive a personalized proposal.",
      },
      email: "Email",
      phone: "Phone",
      whyChoose: {
        title: "Why choose Dyoxy?",
        items: [
          {
            title: "Data Intelligence Focus",
            description: "Specialists in AI, analytics and automation",
          },
          {
            title: "Tailored Solutions",
            description: "Custom architecture for your data needs",
          },
          {
            title: "Cutting-edge Technology",
            description: "Latest generation AI and data tools",
          },
          {
            title: "Measurable Results",
            description: "Real business impact, not just technology",
          },
          {
            title: "Scalable Infrastructure",
            description: "Solutions that grow with your data",
          },
        ],
      },
    },
    footer: {
      slogan: "DATA INTELLIGENCE FOR THE FUTURE",
      description: "AI, Data Engineering and Automation",
      longDescription: "Dyoxy designs intelligent solutions that transform business data into strategic intelligence for faster and more efficient decisions.",
      services: {
        title: "Services",
        items: [
          "AI Systems",
          "Data Engineering",
          "Dashboards",
          "Automation",
          "Data Science",
        ],
      },
      quickLinks: {
        title: "Quick Links",
      },
      rights: "All rights reserved.",
    },
    founder: {
      badge: "Leadership & Vision",
      name: "Marcos Cunha",
      title: "Founder & CEO",
      description: "Marcos Cunha is a Solutions Architect & Strategic Consultant of Dyoxy.\nHis work is to analyze business challenges, define metrics and design custom technological solutions using data engineering, artificial intelligence and automation to solve real business problems.",
      expertise: ["Software Architecture", "Data Engineering", "Business Intelligence", "AI & Automation", "Cloud Infrastructure"],
      contact: "Get in Touch",
    },
  },
  pt: {
    nav: {
      methodology: "Metodologia",
      solutions: "Soluções",
      technology: "Tecnologias",
      contact: "Contato",
    },
    hero: {
      badge: "Tecnologia para quem lidera, não compete",
      title: "De Dados a Decisões",
      subtitle: "",
      description: "A Dyoxy ajuda empresas a resolver desafios complexos com inteligência artificial, engenharia de dados e automação. Analisamos o seu negócio e desenvolvemos soluções tecnológicas sob medida para automatizar processos, integrar sistemas e transformar dados em inteligência estratégica.",
      primaryCta: "Consultoria Gratuita",
      secondaryCta: "Explorar Soluções",
      capabilities: [
        {
          title: "Integrações com IA",
          description: "Automação inteligente e soluções de machine learning.",
        },
        {
          title: "Decisões Orientadas por Dados",
          description: "Transforme dados brutos em insights estratégicos.",
        },
        {
          title: "Plataformas de Automação",
          description: "Automatize workflows e elimine processos repetitivos.",
        },
        {
          title: "Segurança de Dados Empresarial",
          description: "Infraestrutura de dados escalável e segura.",
        },
      ],
    },
    solutions: {
      badge: "Soluções",
      title: "Soluções Inteligentes de Dados & IA",
      subtitle: "Projetamos sistemas inteligentes que transformam dados em automação, insights e plataformas de decisão escaláveis.",
      items: [
        {
          title: "Automação de Dados",
          description: "Automatize processos repetitivos e elimine trabalho manual. Projetamos pipelines de dados, sistemas ETL e processos de relatórios automatizados.",
          examples: [
            "Automação de Excel",
            "Pipelines de dados",
            "Relatórios automatizados",
            "Coleta Automatizada de Dados da Web",
          ],
        },
        {
          title: "Dashboards Corporativos",
          description: "Transforme dados empresariais em inteligência visual através de dashboards modernos e interativos projetados para tomada de decisão estratégica.",
          examples: [
            "Dashboards financeiros",
            "Dashboards de análise de vendas",
            "Métricas operacionais",
            "Sistemas de business intelligence",
          ],
        },
        {
          title: "Agentes de IA",
          description: "Agentes alimentados por IA capazes de analisar informações, executar tarefas e automatizar operações empresariais.",
          examples: [
            "IA de suporte ao cliente",
            "Agentes de análise de dados",
            "Assistentes de automação interna",
            "Orquestração de workflows",
            "Integração com WhatsApp",
          ],
        },
        {
          title: "Engenharia de Dados & Big Data",
          description: "Design e implementação de arquiteturas de dados escaláveis capazes de processar grandes volumes de informação.",
          examples: [
            "Pipelines de dados",
            "Data lakes",
            "Processamento de big data",
            "Infraestrutura de dados em cloud",
          ],
        },
        {
          title: "Data Science & Analytics Preditivo",
          description: "Análises avançadas e modelos de machine learning que identificam padrões e preveem resultados empresariais futuros.",
          examples: [
            "Previsão de demanda",
            "Forecasting de vendas",
            "Análise de comportamento de clientes",
            "Modelos de machine learning",
          ],
        },
      ],
    },
    howWeWork: {
      badge: "Nosso Processo",
      title: "Nossa Metodologia",
      subtitle: "Abordagem de consultoria desde o diagnóstico até a implantação na nuvem",
      steps: [
        {
          title: "Consultoria",
          description: "Identificamos os desafios do seu negócio e necessidades de dados",
        },
        {
          title: "Proposta",
          description: "Apresentamos uma solução sob medida projetada para seus objetivos",
        },
        {
          title: "Desenvolvimento",
          description: "Construímos a solução inteligente com as melhores práticas",
        },
        {
          title: "Testes",
          description: "Garantia de qualidade e validação de todas as funcionalidades",
        },
        {
          title: "Cloud",
          description: "Implantação escalável no ambiente de produção",
        },
      ],
    },
    technology: {
      badge: "Stack Tecnológico",
      title: "Tecnologias de IA, Dados & Cloud",
      subtitle: "Ferramentas líderes de mercado para inteligência de dados e automação",
      categories: {
        ai: "IA & Machine Learning",
        data: "Engenharia de Dados",
        visualization: "Visualização de Dados",
        cloud: "Cloud & Infraestrutura",
      },
      techs: {
        ai: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Scikit-learn", "LangChain"],
        data: ["Python", "Julia", "Pandas", "NumPy", "Scrapy", "Apache Spark", "Kafka", "Airflow"],
        visualization: ["Power BI", "Tableau", "Metabase", "Superset", "Plotly"],
        cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "Snowflake", "BigQuery"],
      },
    },
    useCases: {
      badge: "Desafios Empresariais Reais",
      title: "Problemas que Resolvemos",
      subtitle: "Desafios empresariais do mundo real que nossas soluções de IA, dados e automação resolvem",
      items: [
        {
          title: "Dados Espalhados em Vários Sistemas",
          description: "Os dados da sua empresa estão espalhados em múltiplas planilhas, bancos de dados e plataformas, tornando impossível ver o quadro completo e tomar decisões informadas rapidamente.",
        },
        {
          title: "Trabalho Manual Repetitivo",
          description: "Sua equipe gasta horas toda semana fazendo as mesmas tarefas manuais em planilhas: copiando dados, gerando relatórios, atualizando tabelas. Este trabalho repetitivo desperdiça tempo e cria erros.",
        },
        {
          title: "Atendimento ao Cliente Lento",
          description: "Sua equipe de suporte está sobrecarregada com perguntas repetitivas de clientes, resultando em tempos de resposta lentos, clientes frustrados e funcionários esgotados.",
        },
        {
          title: "Infraestrutura de Dados Desorganizada",
          description: "Os dados da sua empresa estão espalhados em sistemas desconectados sem repositório central, tornando análises impossíveis e forçando equipes a consolidar informações manualmente.",
        },
        {
          title: "Incapaz de Prever Tendências",
          description: "Você depende de intuição ao invés de dados para prever demanda, planejar estoque e prever resultados empresariais, levando a oportunidades perdidas e má alocação de recursos.",
        },
        {
          title: "Sistemas Desconectados",
          description: "Seus sistemas empresariais não conversam entre si, forçando funcionários a transferir dados manualmente entre plataformas, criando atrasos, erros e retrabalho.",
        },
      ],
    },
    projects: {
      badge: "Portfolio",
      title: "Projetos em Execução",
      subtitle: "Exemplos práticos de projetos construídos com IA, dados e automação",
      items: [
        {
          title: "Dashboard Corporativo de KPIs",
          description: "Dashboard interativo que rastreia métricas e KPIs empresariais em tempo real, integrando múltiplas fontes de dados para tomada de decisão executiva.",
          features: ["Monitoramento de KPIs", "Métricas financeiras", "Gráficos e filtros", "Análise em tempo real"],
          tech: "Power BI • Python • SQL",
        },
        {
          title: "Sistema de Automação Excel",
          description: "Fluxos de trabalho automatizados em Excel que processam grandes volumes de dados e geram relatórios automaticamente, eliminando trabalho manual.",
          features: ["Relatórios automatizados", "Processamento de dados", "Automação de planilhas", "Integrações de sistemas"],
          tech: "Python • Pandas • Automação Excel",
        },
        {
          title: "Assistente Empresarial com IA",
          description: "Agente de IA capaz de analisar dados da empresa e responder perguntas usando linguagem natural.",
          features: ["Interface de chat IA", "Análise de dados", "Insights automatizados", "Linguagem natural"],
          tech: "OpenAI GPT • Python • APIs",
        },
      ],
    },
    contact: {
      badge: "Entre em Contato",
      title: "Vamos Transformar Seus Dados em Inteligência",
      subtitle: "Converse com nossos especialistas para descobrir como IA, analytics de dados e automação podem transformar suas operações empresariais.",
      whatsapp: {
        title: "Fale pelo WhatsApp",
        description: "Nossos especialistas em dados e IA estão prontos para entender suas necessidades e propor soluções inteligentes.",
        cta: "Iniciar Conversa",
        status: "Online agora",
        quickResponse: "Resposta rápida",
        message: "Olá! Gostaria de saber mais sobre as soluções de dados e IA da Dyoxy e receber uma proposta personalizada.",
      },
      email: "E-mail",
      phone: "Telefone",
      whyChoose: {
        title: "Por que escolher a Dyoxy?",
        items: [
          {
            title: "Foco em Inteligência de Dados",
            description: "Especialistas em IA, analytics e automação",
          },
          {
            title: "Soluções Sob Medida",
            description: "Arquitetura personalizada para suas necessidades de dados",
          },
          {
            title: "Tecnologia de Ponta",
            description: "Ferramentas de IA e dados de última geração",
          },
          {
            title: "Resultados Mensuráveis",
            description: "Impacto empresarial real, não apenas tecnologia",
          },
          {
            title: "Infraestrutura Escalável",
            description: "Soluções que crescem com seus dados",
          },
        ],
      },
    },
    footer: {
      slogan: "INTELIGÊNCIA DE DADOS PARA O FUTURO",
      description: "IA, Engenharia de Dados e Automação",
      longDescription: "A Dyoxy projeta soluções inteligentes que transformam dados empresariais em inteligência estratégica para decisões mais rápidas e eficientes.",
      services: {
        title: "Serviços",
        items: [
          "Sistemas de IA",
          "Engenharia de Dados",
          "Dashboards",
          "Automação",
          "Data Science",
        ],
      },
      quickLinks: {
        title: "Links Rápidos",
      },
      rights: "Todos os direitos reservados.",
    },
    founder: {
      badge: "Liderança & Visão",
      name: "Marcos Cunha",
      title: "Fundador & CEO",
      description: "Marcos Cunha é arquiteto de soluções e consultor estratégico da Dyoxy.\nSeu trabalho é analisar desafios empresariais, definir métricas e projetar soluções tecnológicas sob medida utilizando engenharia de dados, inteligência artificial e automação para resolver problemas reais de negócio.",
      expertise: ["Arquitetura de Software", "Engenharia de Dados", "Inteligência de Negócios", "IA & Automação", "Infraestrutura Cloud"],
      contact: "Entre em Contato",
    },
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"));
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value ?? '';
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}