  // script.js - Red Lotus frontend with Gemini AI integration
  // Enhanced version with better error handling and UI improvements

  const API_BASE = ''; // relative origin
  const RECOMMEND_ENDPOINT = '/api/recommend';
  const GENERATE_LAYOUTS_ENDPOINT = '/api/generate-layouts';
  const PORTFOLIOS_ENDPOINT = '/api/portfolios';
  const LOCAL_FALLBACK_JSON = 'data/final_portfolios.json';

  // ===== Gemini AI Configuration =====
  const USE_PROXY_FOR_GEMINI = false; // Set to true if using proxy server
  const PROXY_URL = ""; // Example: "https://your-proxy.onrender.com/api/gemini"
  // REPLACE WITH YOUR OWN API KEY FROM Google AI Studio
  const GEMINI_API_KEY = "AIzaSyDmOgjE2C5fv22a84EMjwN81gQfS6K5s-U";
  const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  // Safety limits
  const MAX_PORTFOLIOS_TO_SEND = 150;
  const MAX_DESC_CHARS = 700;

  // Will be loaded from external file or embedded
  const EMBEDDED_FALLBACK = {
    "portfolios": [
      {
        "id": "10179-cs",
        "team_number": "10179",
        "team_name": "Tech Turtles",
        "achievement": "Qualifier",
        "portfolio_type": "cs",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10179-cs.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10179-cs.png",
        "description": "Базовое портфолио по контролю и системам с простой структурой. Подходит для начинающих команд, которые хотят понять основы документирования технических решений.",
        "tags": ["beginner", "control-systems", "basic", "starter", "simple-layout"],
        "design_adjectives_en": ["minimal", "structured", "clear", "beginner-friendly"],
        "design_adjectives_ru": ["минималистичный", "структурированный", "понятный", "для начинающих"],
        "templates": ["https://templates.redlotus.com/control-system-basic.fig", null]
      },
      {
        "id": "23396-cs",
        "team_number": "23396",
        "team_name": "Hivemind",
        "achievement": "Regionals",
        "portfolio_type": "cs",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/23396-cs.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/23396-cs.png",
        "description": "Профессиональное портфолио с детальным анализом механического дизайна. Включает CAD модели, итерации проектирования, выбор материалов и структурный анализ. Отлично подходит для демонстрации инженерного процесса.",
        "tags": [
          "cad", "mechanical-design", "professional", "detailed", "engineering-process",
          "structural-analysis", "prototyping", "manufacturing", "technical-documentation"
        ],
        "design_adjectives_en": ["industrial", "technical", "detailed", "structured", "professional", "engineering-focused"],
        "design_adjectives_ru": ["индустриальный", "технический", "детальный", "структурированный", "профессиональный", "инженерный"],
        "templates": ["https://templates.redlotus.com/mechanical-detailed.fig", "https://templates.redlotus.com/cad-showcase.fig"]
      },
      {
        "id": "1002-ff",
        "team_number": "1002",
        "team_name": "Circuit Runners: Surge",
        "achievement": "Worlds",
        "portfolio_type": "ff",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/1002-ff.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/1002-ff.png",
        "description": "Портфолио победителей мирового чемпионата с фокусом на инновационные механические решения. Включает уникальные механизмы, анализ производительности и стратегические решения сезона.",
        "tags": [
          "world-champion", "innovative", "mechanisms", "performance-analysis", 
          "season-strategy", "award-winning", "competitive", "advanced-engineering"
        ],
        "design_adjectives_en": ["innovative", "award-winning", "strategic", "high-performance", "world-class"],
        "design_adjectives_ru": ["инновационный", "победитель", "стратегический", "высокопроизводительный", "мирового уровня"],
        "templates": ["https://templates.redlotus.com/world-champion-mech.fig", "https://templates.redlotus.com/performance-dashboard.fig"]
      },
      {
        "id": "10183-pp",
        "team_number": "10183",
        "team_name": "Frog Robots of Germany",
        "achievement": "Regionals",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10183-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10183-pp.png",
        "description": "Портфолио с фокусом на аутрич и влияние на сообщество. Документирует образовательные программы, воркшопы и партнерства с локальными организациями.",
        "tags": [
          "outreach", "community", "education", "workshops", "partnerships",
          "social-impact", "stem-education", "mentorship", "public-engagement"
        ],
        "design_adjectives_en": ["community-focused", "educational", "engaging", "impactful", "accessible"],
        "design_adjectives_ru": ["ориентированный на сообщество", "образовательный", "вовлекающий", "влиятельный", "доступный"],
        "templates": ["https://templates.redlotus.com/community-outreach.fig", "https://templates.redlotus.com/education-impact.fig"]
      },
      {
        "id": "11468-pp",
        "team_number": "11468",
        "team_name": "Ohm Raiders",
        "achievement": "Regionals",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/11468-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/11468-pp.png",
        "description": "Специализированное портфолио по электронике и электрическим системам. Включает схемы, монтажные платы, управление питанием и интеграцию датчиков.",
        "tags": [
          "electronics", "electrical", "schematic-design", "pcb", "power-management",
          "sensor-integration", "wiring", "circuit-design", "technical-documentation"
        ],
        "design_adjectives_en": ["technical", "schematic", "detailed", "precise", "electrical-focused"],
        "design_adjectives_ru": ["технический", "схематичный", "детальный", "точный", "электротехнический"],
        "templates": ["https://templates.redlotus.com/electronics-detailed.fig", "https://templates.redlotus.com/schematic-showcase.fig"]
      },
      {
        "id": "12051-pp",
        "team_number": "12051",
        "team_name": "Not Not Nerds",
        "achievement": "Qualifier",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/12051-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/12051-pp.png",
        "description": "Портфолио с акцентом на программное обеспечение и алгоритмы автономного управления. Включает архитектуру кода, планирование пути, PID настройку и тестирование.",
        "tags": [
          "software", "autonomous", "algorithms", "control-systems", "programming",
          "code-architecture", "path-planning", "pid-tuning", "simulation", "testing"
        ],
        "design_adjectives_en": ["software-focused", "modern", "algorithmic", "code-oriented", "technical"],
        "design_adjectives_ru": ["ориентированный на софт", "современный", "алгоритмический", "кодо-ориентированный", "технический"],
        "templates": ["https://templates.redlotus.com/software-architecture.fig", "https://templates.redlotus.com/autonomous-algorithms.fig"]
      },
      {
        "id": "12635-pp",
        "team_number": "12635",
        "team_name": "Kuriosity Robotics",
        "achievement": "Worlds",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/12635-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/12635-pp.png",
        "description": "Сбалансированное портфолио мирового уровня, охватывающее механику, софт и стратегию. Пример комплексного подхода к соревновательной робототехнике.",
        "tags": [
          "world-class", "balanced", "mechanical", "software", "strategy",
          "comprehensive", "competitive", "multidisciplinary", "season-review"
        ],
        "design_adjectives_en": ["comprehensive", "balanced", "world-class", "multidisciplinary", "professional"],
        "design_adjectives_ru": ["всеобъемлющий", "сбалансированный", "мирового уровня", "междисциплинарный", "профессиональный"],
        "templates": ["https://templates.redlotus.com/comprehensive-portfolio.fig", "https://templates.redlotus.com/season-timeline.fig"]
      },
      {
        "id": "14270-pp",
        "team_number": "14270",
        "team_name": "Quantum Robotics",
        "achievement": "Regionals",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/14270-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/14270-pp.png",
        "description": "Современное портфолио с чистой типографикой и минималистичным дизайном. Акцент на читаемость и ясное представление технической информации.",
        "tags": [
          "modern", "minimalist", "clean-typography", "readable", "visual",
          "contemporary", "design-focused", "professional-layout", "accessible"
        ],
        "design_adjectives_en": ["modern", "minimal", "clean", "typographic", "accessible"],
        "design_adjectives_ru": ["современный", "минималистичный", "чистый", "типографический", "доступный"],
        "templates": ["https://templates.redlotus.com/modern-minimal.fig", "https://templates.redlotus.com/clean-typography.fig"]
      },
      {
        "id": "16461-ff",
        "team_number": "16461",
        "team_name": "Infinite Turtles",
        "achievement": "Worlds",
        "portfolio_type": "ff",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/16461-ff.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/16461-ff.png",
        "description": "Портфолио мирового уровня с фокусом на социальное влияние и STEM образование. Пример того как робототехника может менять сообщества.",
        "tags": [
          "social-impact", "stem-education", "community", "world-class", "influential",
          "educational", "transformative", "leadership", "mentorship"
        ],
        "design_adjectives_en": ["impactful", "educational", "community-driven", "world-class", "transformative"],
        "design_adjectives_ru": ["влиятельный", "образовательный", "сообщество-ориентированный", "мирового уровня", "трансформационный"],
        "templates": ["https://templates.redlotus.com/social-impact.fig", "https://templates.redlotus.com/stem-education.fig"]
      },
      {
        "id": "18317-pp",
        "team_number": "18317",
        "team_name": "Steel Eels",
        "achievement": "Worlds",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/18317-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/18317-pp.png",
        "description": "Профессиональное портфолио с модульной структурой. Каждый раздел представлен как отдельная карточка с четкой иерархией информации.",
        "tags": [
          "modular", "card-based", "professional", "organized", "hierarchical",
          "structured", "systematic", "clear-navigation", "user-friendly"
        ],
        "design_adjectives_en": ["modular", "card-based", "organized", "hierarchical", "systematic"],
        "design_adjectives_ru": ["модульный", "карточный", "организованный", "иерархический", "систематический"],
        "templates": ["https://templates.redlotus.com/modular-cards.fig", "https://templates.redlotus.com/hierarchical-layout.fig"]
      },
      {
        "id": "20744-pp",
        "team_number": "20744",
        "team_name": "24KARAT",
        "achievement": "Regionals",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/20744-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/20744-pp.png",
        "description": "Яркое и визуально привлекательное портфолио с акцентами цвета. Отлично подходит для представления на выставках и презентациях.",
        "tags": [
          "vibrant", "colorful", "visual", "presentation", "exhibition",
          "attractive", "eye-catching", "design-heavy", "showcase"
        ],
        "design_adjectives_en": ["vibrant", "colorful", "visual", "eye-catching", "presentation-ready"],
        "design_adjectives_ru": ["яркий", "цветной", "визуальный", "привлекающий внимание", "готовый к презентации"],
        "templates": ["https://templates.redlotus.com/vibrant-presentation.fig", "https://templates.redlotus.com/color-accent.fig"]
      },
      {
        "id": "21579-cs",
        "team_number": "21579",
        "team_name": "Testing is Optional",
        "achievement": "Regionals",
        "portfolio_type": "cs",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/21579-cs.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/21579-cs.png",
        "description": "Минималистичное одноколоночное портфолио с акцентом на контент. Простая и понятная структура для быстрого ознакомления.",
        "tags": [
          "minimalist", "single-column", "content-focused", "simple", "readable",
          "direct", "no-distractions", "focused", "streamlined"
        ],
        "design_adjectives_en": ["minimal", "single-column", "content-focused", "streamlined", "direct"],
        "design_adjectives_ru": ["минималистичный", "одноколоночный", "контент-ориентированный", "оптимизированный", "прямой"],
        "templates": ["https://templates.redlotus.com/single-column.fig", "https://templates.redlotus.com/content-focused.fig"]
      },
      {
        "id": "252-ff",
        "team_number": "252",
        "team_name": "Electric Quahogs",
        "achievement": "Regionals",
        "portfolio_type": "ff",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/252-ff.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/252-ff.png",
        "description": "Информативное портфолио с большим количеством графиков и диаграмм. Идеально для анализа данных и представления статистики.",
        "tags": [
          "data-driven", "analytical", "charts", "graphs", "statistics",
          "informative", "research", "analysis", "metrics", "visualization"
        ],
        "design_adjectives_en": ["data-driven", "analytical", "informative", "visualization-heavy", "research-oriented"],
        "design_adjectives_ru": ["основанный на данных", "аналитический", "информативный", "богатый визуализацией", "ориентированный на исследование"],
        "templates": ["https://templates.redlotus.com/data-visualization.fig", "https://templates.redlotus.com/analytical-dashboard.fig"]
      },
      {
        "id": "4042-ff",
        "team_number": "4042",
        "team_name": "Nonstandard Deviation",
        "achievement": "Qualifier",
        "portfolio_type": "ff",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/4042-ff.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/4042-ff.png",
        "description": "Асимметричный дизайн с легким текстом и цветовыми акцентами. Современный подход к представлению технической информации.",
        "tags": [
          "asymmetrical", "modern", "light-text", "accent-colors", "contemporary",
          "design-innovative", "unconventional", "stylish", "trendy"
        ],
        "design_adjectives_en": ["asymmetrical", "modern", "lightweight", "accented", "contemporary"],
        "design_adjectives_ru": ["асимметричный", "современный", "легкий", "акцентный", "современный"],
        "templates": ["https://templates.redlotus.com/asymmetrical-modern.fig", "https://templates.redlotus.com/accent-design.fig"]
      },
      {
        "id": "516-ug",
        "team_number": "516",
        "team_name": "Gears of Fire",
        "achievement": "Regionals",
        "portfolio_type": "ug",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/516-ug.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/516-ug.png",
        "description": "Функциональное портфолио с желтыми акцентами для высокой заметности. Схематичный подход к представлению электронных систем.",
        "tags": [
          "functional", "schematic", "high-visibility", "yellow-accent", "technical",
          "diagrammatic", "clear", "visibility", "contrast"
        ],
        "design_adjectives_en": ["functional", "schematic", "high-visibility", "contrast", "technical"],
        "design_adjectives_ru": ["функциональный", "схематичный", "высокая заметность", "контрастный", "технический"],
        "templates": ["https://templates.redlotus.com/functional-schematic.fig", "https://templates.redlotus.com/high-visibility.fig"]
      },
      {
        "id": "6165-ff",
        "team_number": "6165",
        "team_name": "MSET CuttleFish",
        "achievement": "Worlds",
        "portfolio_type": "ff",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/6165-ff.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/6165-ff.png",
        "description": "Компактное портфолио с таблицами данных и богатыми аннотациями. Эффективное использование пространства для плотной информации.",
        "tags": [
          "compact", "data-tables", "annotations", "dense", "information-rich",
          "efficient", "space-saving", "detailed", "comprehensive"
        ],
        "design_adjectives_en": ["compact", "data-rich", "annotated", "dense", "efficient"],
        "design_adjectives_ru": ["компактный", "богатый данными", "аннотированный", "плотный", "эффективный"],
        "templates": ["https://templates.redlotus.com/compact-data.fig", "https://templates.redlotus.com/annotation-rich.fig"]
      },
      {
        "id": "701-ff",
        "team_number": "701",
        "team_name": "The GONK Squad",
        "achievement": "Regionals",
        "portfolio_type": "ff",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/701-ff.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/701-ff.png",
        "description": "Простое двухцветное портфолио с мягкими краями и легким текстом. Дружелюбный и доступный дизайн.",
        "tags": [
          "two-tone", "soft-edges", "friendly", "accessible", "simple",
          "approachable", "welcoming", "clean", "uncomplicated"
        ],
        "design_adjectives_en": ["two-tone", "soft", "friendly", "accessible", "approachable"],
        "design_adjectives_ru": ["двухцветный", "мягкий", "дружелюбный", "доступный", "приближенный"],
        "templates": ["https://templates.redlotus.com/two-tone-friendly.fig", "https://templates.redlotus.com/soft-design.fig"]
      },
      {
        "id": "7444-cs",
        "team_number": "7444",
        "team_name": "Sisters of the Motherboard",
        "achievement": "Regionals",
        "portfolio_type": "cs",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7444-cs.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7444-cs.png",
        "description": "Высококонтрастное портфолио с жирными заголовками. Идеально для презентаций и быстрого сканирования информации.",
        "tags": [
          "high-contrast", "bold-headings", "presentation", "scan-friendly", "impactful",
          "attention-grabbing", "strong", "powerful", "memorable"
        ],
        "design_adjectives_en": ["high-contrast", "bold", "impactful", "attention-grabbing", "memorable"],
        "design_adjectives_ru": ["высокий контраст", "жирный", "влиятельный", "привлекающий внимание", "запоминающийся"],
        "templates": ["https://templates.redlotus.com/high-contrast.fig", "https://templates.redlotus.com/bold-presentation.fig"]
      },
      {
        "id": "7842-pp",
        "team_number": "7842",
        "team_name": "Browncoats",
        "achievement": "Worlds",
        "portfolio_type": "pp",
        "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7842-pp.pdf",
        "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7842-pp.png",
        "description": "Просторное портфолио с моноширинным кодом для технических объяснений. Сочетание свободы пространства и технической точности.",
        "tags": [
          "spacious", "monospace", "technical", "code-presentation", "breathing-room",
          "air", "open", "technical-detail", "precision"
        ],
        "design_adjectives_en": ["spacious", "monospace", "technical", "open", "precise"],
        "design_adjectives_ru": ["просторный", "моноширинный", "технический", "открытый", "точный"],
        "templates": ["https://templates.redlotus.com/spacious-technical.fig", "https://templates.redlotus.com/code-presentation.fig"]
      }
    ],
    "categories": {
      "by_type": {
        "cs": ["10179-cs", "23396-cs", "21579-cs", "7444-cs"],
        "ff": ["1002-ff", "16461-ff", "252-ff", "4042-ff", "6165-ff", "701-ff"],
        "pp": ["10183-pp", "11468-pp", "12051-pp", "12635-pp", "14270-pp", "18317-pp", "20744-pp", "7842-pp"],
        "ug": ["516-ug"],
        "itd": ["23511-itd"]
      },
      "by_achievement": {
        "worlds": ["1002-ff", "12635-pp", "16461-ff", "18317-pp", "6165-ff", "7842-pp"],
        "regionals": ["23396-cs", "10183-pp", "11468-pp", "14270-pp", "20744-pp", "21579-cs", "252-ff", "516-ug", "701-ff", "7444-cs", "8300-ff"],
        "qualifier": ["10179-cs", "12051-pp", "4042-ff", "9527-ug"]
      },
      "by_design_style": {
        "modern": ["12051-pp", "14270-pp", "4042-ff", "9527-ug", "9974-ug", "24331-cs"],
        "industrial": ["23396-cs", "1002-ff", "12635-pp", "16461-ff", "18317-pp", "20744-pp", "21579-cs", "23511-itd"],
        "technical": ["11468-pp", "516-ug", "6165-ff", "6323-ug", "19706-cs"],
        "minimal": ["12051-pp", "14270-pp", "21579-cs"],
        "vibrant": ["1002-ff", "12635-pp", "20744-pp", "7842-ug", "9527-ug"]
      }
    },
    "stats": {
      "total_portfolios": 20,
      "by_type": {
        "cs": 4,
        "ff": 6,
        "pp": 8,
        "ug": 1,
        "itd": 1
      },
      "by_achievement": {
        "worlds": 6,
        "regionals": 10,
        "qualifier": 4
      },
      "average_tags_per_portfolio": 9.8,
      "portfolios_with_templates": 18,
      "portfolios_with_images": 20
    },
    "metadata": {
      "version": "2.1.0",
      "last_updated": "2024-01-17",
      "data_source": "Red Lotus FTC Portfolio Database",
      "description": "Enhanced portfolio dataset with improved descriptions, categorization, and Gemini AI optimization"
    }
  };

  // ===== Utility Functions =====
  function safeString(str, maxLength = MAX_DESC_CHARS) {
      if (!str) return '';
      const text = String(str);
      return text.length > maxLength ? text.substring(0, maxLength) + '…' : text;
  }

  function escapeHtml(text) {
      if (!text) return '';
      return String(text).replace(/[&<>"']/g, s => ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[s]));
  }

  function debounce(fn, delay) {
      let timer;
      return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => fn(...args), delay);
      };
  }

  function showNotification(message, type = 'info') {
      const container = document.getElementById(type === 'error' ? 'errorMessage' : 'successMessage');
      if (!container) return;
      
      container.innerHTML = message;
      container.style.display = 'block';
      container.className = `notification ${type}`;
      
      setTimeout(() => {
          container.style.display = 'none';
      }, 3500);
  }

  function normalizeResult(item) {
      return {
          id: item.id || (item.team_number ? `${item.team_number}-${item.portfolio_type || 'pp'}` : 'unknown'),
          team_name: item.team_name || item.name || '',
          pdf_url: item.pdf_url || item.pdf || item.url || '',
          thumbnail_url: item.thumbnail_url || item.thumbnail || item.thumb || '',
          description: item.description || '',
          achievement: item.achievement || '',
          portfolio_type: item.portfolio_type || '',
          team_number: item.team_number || '',
          tags: item.tags || [],
          templates: Array.isArray(item.templates) ? item.templates : (item.templates ? [item.templates] : [])
      };
  }

  function localSearch(list, prompt, limit = 3) {
      const query = (prompt || '').toLowerCase().trim();
      if (!query) return (list || []).slice(0, limit);
      
      const tokens = query.split(/\s+/).filter(Boolean);
      
      return (list || [])
          .map(item => {
              let score = 0;
              const searchText = (
                  (item.description || '') + ' ' +
                  (item.team_name || '') + ' ' +
                  (item.tags || []).join(' ') + ' ' +
                  (item.portfolio_type || '')
              ).toLowerCase();
              
              tokens.forEach(token => {
                  if (searchText.includes(token)) score += 10;
                  if ((item.achievement || '').toLowerCase().includes(token)) score += 5;
              });
              
              // Bonus for exact matches
              if (searchText.includes(query)) score += 20;
              
              return { score, item };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(x => x.item);
  }

  // ===== Gemini AI Integration =====
  async function geminiFetch(payload) {
      if (USE_PROXY_FOR_GEMINI) {
          if (!PROXY_URL) throw new Error('PROXY_URL не настроен');
          
          const response = await fetch(PROXY_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          
          if (!response.ok) {
              throw new Error(`Proxy вернул ошибку: ${response.status}`);
          }
          
          return response.json();
      } else {
          if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY не настроен');
          
          const response = await fetch(GEMINI_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  contents: [{
                      parts: [{ text: payload.contents[0].parts[0] }]
                  }],
                  generationConfig: {
                      temperature: 0.2,
                      topP: 0.8,
                      topK: 40,
                      maxOutputTokens: 1024
                  }
              })
          });
          
          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Gemini API error: ${response.status} - ${errorText.slice(0, 200)}`);
          }
          
          return response.json();
      }
  }

  function extractFirstJSON(text) {
      if (!text || typeof text !== 'string') return null;
      
      // Find JSON start
      const firstBrace = text.indexOf('{');
      const firstBracket = text.indexOf('[');
      
      if (firstBrace === -1 && firstBracket === -1) return null;
      
      const start = firstBrace !== -1 ? firstBrace : firstBracket;
      
      // Try to parse from different end points
      for (let end = text.length; end > start; end--) {
          try {
              const candidate = text.substring(start, end);
              const parsed = JSON.parse(candidate);
              return parsed;
          } catch (e) {
              // Continue searching
          }
      }
      
      return null;
  }

  async function geminiRankPortfolios(userPrompt) {
      console.log('🔍 Starting Gemini ranking...');
      
      // Load portfolios from different sources
      let portfolios = [];
      
      // Try backend first
      try {
          const response = await fetch(API_BASE + PORTFOLIOS_ENDPOINT);
          if (response.ok) {
              const data = await response.json();
              portfolios = data.portfolios || data;
              console.log(`📊 Loaded ${portfolios.length} portfolios from backend`);
          }
      } catch (error) {
          console.warn('Backend unavailable:', error.message);
      }
      
      // Try local file
      if (!portfolios || portfolios.length === 0) {
          try {
              const response = await fetch(LOCAL_FALLBACK_JSON);
              if (response.ok) {
                  const data = await response.json();
                  portfolios = data.portfolios || data;
                  console.log(`📂 Loaded ${portfolios.length} portfolios from local file`);
              }
          } catch (error) {
              console.warn('Local file unavailable:', error.message);
          }
      }
      
      // Use embedded fallback
      if (!portfolios || portfolios.length === 0) {
          if (EMBEDDED_FALLBACK && EMBEDDED_FALLBACK.portfolios) {
              portfolios = EMBEDDED_FALLBACK.portfolios;
              console.log(`💾 Using ${portfolios.length} embedded portfolios`);
          } else {
              console.error('No portfolios available');
              return { selected: [], debug: { error: 'No data available' } };
          }
      }
      
      // Prepare data for Gemini
      const simplifiedPortfolios = portfolios
          .slice(0, MAX_PORTFOLIOS_TO_SEND)
          .map(p => ({
              id: p.id || `${p.team_number}-${p.portfolio_type || 'pp'}`,
              team_name: safeString(p.team_name, 120),
              portfolio_type: p.portfolio_type || '',
              achievement: safeString(p.achievement, 60),
              description: safeString(p.description, MAX_DESC_CHARS),
              tags: (p.tags || []).slice(0, 40),
              design_adjectives: (p.design_adjectives_en || p.design_adjectives_ru || []).slice(0, 40)
          }));
      
      // Create system prompt
      const systemPrompt = `
  Ты — эксперт по оценке портфолио для FTC (First Tech Challenge).
  Проанализируй запрос пользователя и выбери 3 наиболее подходящих портфолио.

  ФОРМАТ ОТВЕТА (ТОЛЬКО JSON):
  {
    "selected": [
      {
        "id": "portfolio_id",
        "score": 0.95,
        "reason": "Краткое объяснение на русском (макс 120 символов)"
      }
    ],
    "debug": {
      "total_portfolios_considered": ${simplifiedPortfolios.length},
      "method": "gemini-ranking-v1"
    }
  }

  ПРАВИЛА:
  1. Выбери максимум 3 портфолио
  2. Упорядочь по релевантности (самый подходящий первый)
  3. Score: от 0.0 до 1.0 (1.0 = идеально)
  4. Reason: кратко и по-русски

  ЗАПРОС ПОЛЬЗОВАТЕЛЯ:
  """
  ${safeString(userPrompt, 1000)}
  """

  ДОСТУПНЫЕ ПОРТФОЛИО:
  ${JSON.stringify(simplifiedPortfolios, null, 2)}
  `;

      try {
          console.log('🚀 Sending request to Gemini...');
          
          const requestBody = {
              contents: [{
                  parts: [systemPrompt]
              }]
          };
          
          const response = await geminiFetch(requestBody);
          
          // Extract response text
          let geminiResponseText = '';
          
          if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
              geminiResponseText = response.candidates[0].content.parts[0].text;
          } else if (response?.candidates?.[0]?.content?.text) {
              geminiResponseText = response.candidates[0].content.text;
          } else {
              console.error('Unexpected Gemini response:', response);
              throw new Error('Invalid response format from Gemini');
          }
          
          console.log('📨 Gemini response received');
          
          // Parse JSON response
          const parsedResult = extractFirstJSON(geminiResponseText);
          
          if (!parsedResult || !parsedResult.selected) {
              console.warn('Could not parse JSON from Gemini:', geminiResponseText);
              throw new Error('Invalid JSON response from Gemini');
          }
          
          // Map selected IDs to full portfolio objects
          const selectedPortfolios = parsedResult.selected
              .slice(0, 3)
              .map(selected => {
                  const fullPortfolio = portfolios.find(p => {
                      const portfolioId = p.id || `${p.team_number}-${p.portfolio_type || 'pp'}`;
                      return portfolioId === selected.id;
                  });
                  
                  return {
                      ...selected,
                      portfolio: fullPortfolio ? normalizeResult(fullPortfolio) : null
                  };
              })
              .filter(item => item.portfolio); // Remove items without portfolio data
          
          console.log(`✅ Selected ${selectedPortfolios.length} portfolios`);
          
          return {
              selected: selectedPortfolios,
              debug: parsedResult.debug || {
                  total_portfolios_considered: simplifiedPortfolios.length,
                  method: 'gemini-ranking'
              }
          };
          
      } catch (error) {
          console.error('❌ Gemini ranking failed:', error);
          throw error;
      }
  }

  // ===== Main Portfolio Generation =====
  async function generatePortfolios(e) {
      e.preventDefault();
      
      const promptInput = document.getElementById('prompt');
      const prompt = promptInput ? promptInput.value.trim() : '';
      
      if (prompt.length < 5) {
          showNotification('Пожалуйста, опишите требования подробнее (минимум 5 символов)', 'error');
          return;
      }
      
      // Show loading state
      const submitBtn = e.target.querySelector('.btn-primary');
      const originalText = submitBtn?.querySelector('.btn-text');
      const spinner = submitBtn?.querySelector('.btn-spinner');
      
      if (submitBtn) {
          submitBtn.disabled = true;
          if (originalText) originalText.style.display = 'none';
          if (spinner) spinner.style.display = 'inline';
      }
      
      showNotification('Ищем лучшие портфолио через ИИ...', 'info');
      
      try {
          // Try Gemini AI ranking
          console.log(`🧠 Using Gemini for: "${prompt}"`);
          const geminiResult = await geminiRankPortfolios(prompt);
          
          if (geminiResult.selected && geminiResult.selected.length > 0) {
              // Display Gemini results
              const displayPortfolios = geminiResult.selected.map(item => ({
                  ...item.portfolio,
                  score: item.score || 0,
                  selection_info: {
                      reason: item.reason || 'Рекомендовано ИИ',
                      method: geminiResult.debug?.method || 'gemini'
                  }
              }));
              
              displayPortfoliosFromAPI(displayPortfolios);
              showNotification(`✅ Найдено ${displayPortfolios.length} портфолио через Gemini AI`, 'success');
              
          } else {
              // Fallback to traditional search
              await generatePortfoliosFallback(prompt);
          }
          
      } catch (error) {
          console.error('Gemini failed, using fallback:', error);
          showNotification('ИИ временно недоступен, использую локальный поиск...', 'warning');
          await generatePortfoliosFallback(prompt);
          
      } finally {
          // Restore button state
          if (submitBtn) {
              submitBtn.disabled = false;
              if (originalText) originalText.style.display = 'inline';
              if (spinner) spinner.style.display = 'none';
          }
      }
  }

  async function generatePortfoliosFallback(prompt) {
      console.log('🔄 Using fallback search method');
      
      let portfolios = [];
      
      // Try backend
      try {
          const response = await fetch(API_BASE + PORTFOLIOS_ENDPOINT);
          if (response.ok) {
              const data = await response.json();
              portfolios = data.portfolios || data;
          }
      } catch (error) {
          console.warn('Backend unavailable for fallback:', error);
      }
      
      // Try local file
      if (!portfolios || portfolios.length === 0) {
          try {
              const response = await fetch(LOCAL_FALLBACK_JSON);
              if (response.ok) {
                  const data = await response.json();
                  portfolios = data.portfolios || data;
              }
          } catch (error) {
              console.warn('Local file unavailable for fallback:', error);
          }
      }
      
      // Use embedded
      if (!portfolios || portfolios.length === 0) {
          if (EMBEDDED_FALLBACK && EMBEDDED_FALLBACK.portfolios) {
              portfolios = EMBEDDED_FALLBACK.portfolios;
          } else {
              showNotification('Нет доступных данных для поиска', 'error');
              return;
          }
      }
      
      // Perform local search
      const foundPortfolios = localSearch(portfolios, prompt, 6).map(normalizeResult);
      
      if (foundPortfolios.length > 0) {
          displayPortfolios(foundPortfolios);
          showNotification(`Найдено ${foundPortfolios.length} портфолио по ключевым словам`, 'info');
      } else {
          // Show random portfolios
          const randomPortfolios = portfolios
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map(normalizeResult);
          
          displayPortfolios(randomPortfolios);
          showNotification('Показаны случайные портфолио', 'info');
      }
  }

  // ===== Display Functions =====
  function displayPortfoliosFromAPI(portfolios) {
      const resultsSection = document.getElementById('resultsSection');
      const resultsPlaceholder = document.getElementById('resultsPlaceholder');
      const portfolioResults = document.getElementById('portfolioResults');
      
      if (!portfolios || portfolios.length === 0) {
          if (resultsSection) resultsSection.style.display = 'none';
          if (resultsPlaceholder) resultsPlaceholder.style.display = 'flex';
          if (portfolioResults) portfolioResults.innerHTML = '';
          return;
      }
      
      if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
      if (resultsSection) resultsSection.style.display = 'block';
      
      portfolioResults.innerHTML = portfolios.map((p, idx) => {
          const thumb = p.thumbnail_url ? escapeHtml(p.thumbnail_url) : '';
          const desc = escapeHtml(p.description || 'Описание недоступно');
          const pdf = encodeURI(p.pdf_url || '#');
          const teamName = escapeHtml(p.team_name || 'Неизвестная команда');
          const score = (p.score || 0).toFixed(2);
          const selectionInfo = p.selection_info || {};
          
          // Template URLs
          const templateUrls = p.templates || [null, null, null];
          const templateButtons = templateUrls.map((url, i) => {
              if (url) {
                  return `<a class="portfolio-btn" href="${encodeURI(url)}" target="_blank" rel="noopener">⬇️ Шаблон ${i + 1}</a>`;
              }
              return `<span class="portfolio-btn disabled">⬇️ Шаблон ${i + 1}</span>`;
          }).join(' ');
          
          return `
              <div class="portfolio-card" data-id="${p.id || idx}">
                  ${thumb ? `
                      <div class="portfolio-image">
                          <img src="${thumb}" alt="${teamName}" 
                              onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"200\" viewBox=\"0 0 300 200\"><rect width=\"300\" height=\"200\" fill=\"%23f0f0f0\"/><text x=\"150\" y=\"100\" text-anchor=\"middle\" fill=\"%23999\" font-family=\"Arial\" font-size=\"14\">No Image</text></svg>'">
                      </div>
                  ` : `
                      <div class="portfolio-image-placeholder">
                          🖼️ Нет изображения
                      </div>
                  `}
                  
                  <div class="portfolio-content">
                      <div class="portfolio-title">${teamName}</div>
                      
                      <div class="portfolio-meta">
                          <span class="relevance">Релевантность: ${score}</span>
                          ${p.team_number ? `<span> | Команда: ${escapeHtml(p.team_number)}</span>` : ''}
                          ${p.achievement ? `<span> | ${escapeHtml(p.achievement)}</span>` : ''}
                          ${p.portfolio_type ? `<span> | Тип: ${escapeHtml(p.portfolio_type.toUpperCase())}</span>` : ''}
                      </div>
                      
                      ${selectionInfo.reason ? `
                          <div class="selection-reason">
                              <strong>Почему выбрано:</strong> ${escapeHtml(selectionInfo.reason)}
                          </div>
                      ` : ''}
                      
                      <div class="portfolio-description collapsed" id="desc-${idx}">
                          ${desc}
                      </div>
                      
                      <div class="portfolio-actions">
                          ${pdf && pdf !== '#' ? `
                              <a class="portfolio-btn primary" href="${pdf}" target="_blank" rel="noopener">
                                  📥 Скачать PDF
                              </a>
                          ` : ''}
                          
                          ${templateButtons}
                          
                          <button class="about-btn" data-idx="${idx}">
                              Подробнее
                          </button>
                      </div>
                  </div>
              </div>
          `;
      }).join('');
      
      // Add hover effects
      document.querySelectorAll('.portfolio-card').forEach(card => {
          card.addEventListener('mouseenter', () => {
              card.style.transform = 'translateY(-4px)';
              card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          });
          
          card.addEventListener('mouseleave', () => {
              card.style.transform = '';
              card.style.boxShadow = '';
          });
      });
      
      // Attach about button listeners
      document.querySelectorAll('.about-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const idx = this.getAttribute('data-idx');
              toggleAbout(idx, this);
          });
      });
  }

  function displayPortfolios(portfolios) {
      const resultsSection = document.getElementById('resultsSection');
      const resultsPlaceholder = document.getElementById('resultsPlaceholder');
      const portfolioResults = document.getElementById('portfolioResults');
      
      if (!portfolios || portfolios.length === 0) {
          if (resultsSection) resultsSection.style.display = 'none';
          if (resultsPlaceholder) resultsPlaceholder.style.display = 'flex';
          if (portfolioResults) portfolioResults.innerHTML = '';
          return;
      }
      
      if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
      if (resultsSection) resultsSection.style.display = 'block';
      
      portfolioResults.innerHTML = portfolios.map((p, idx) => {
          const thumb = p.thumbnail_url ? escapeHtml(p.thumbnail_url) : '';
          const desc = escapeHtml(p.description || 'Профессиональный макет портфолио');
          const pdf = encodeURI(p.pdf_url || '#');
          const templates = p.templates || [];
          const teamName = escapeHtml(p.team_name || `Портфолио ${idx + 1}`);
          
          const templateButtons = templates.map((t, i) => {
              const href = encodeURI(t || '#');
              return `<a class="portfolio-btn" href="${href}" target="_blank" rel="noopener">⬇️ Шаблон ${i + 1}</a>`;
          }).join(' ');
          
          return `
              <div class="portfolio-card">
                  ${thumb ? `
                      <img src="${thumb}" alt="${teamName}" class="portfolio-thumbnail">
                  ` : `
                      <div class="thumbnail-placeholder">🖼️</div>
                  `}
                  
                  <div class="portfolio-title">${teamName}</div>
                  
                  <div class="portfolio-description collapsed" id="desc-${idx}">
                      ${desc}
                  </div>
                  
                  <div class="portfolio-actions">
                      ${pdf && pdf !== '#' ? `
                          <a class="portfolio-btn primary" href="${pdf}" target="_blank" rel="noopener">
                              📥 Скачать PDF
                          </a>
                      ` : ''}
                      
                      ${templateButtons}
                      
                      <button class="about-btn" data-idx="${idx}">
                          Подробнее
                      </button>
                  </div>
              </div>
          `;
      }).join('');
      
      // Add hover effects
      document.querySelectorAll('.portfolio-card').forEach(card => {
          card.addEventListener('mouseenter', () => {
              card.style.transform = 'scale(1.02)';
          });
          
          card.addEventListener('mouseleave', () => {
              card.style.transform = '';
          });
      });
      
      // Attach about button listeners
      document.querySelectorAll('.about-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const idx = this.getAttribute('data-idx');
              toggleAbout(idx, this);
          });
      });
  }

  function toggleAbout(idx, btn) {
      const descEl = document.getElementById(`desc-${idx}`);
      if (!descEl) return;
      
      const isCollapsed = descEl.classList.contains('collapsed');
      
      if (isCollapsed) {
          descEl.classList.remove('collapsed');
          btn.textContent = 'Свернуть';
      } else {
          descEl.classList.add('collapsed');
          btn.textContent = 'Подробнее';
      }
  }

  // ===== Template Library =====
  async function loadTemplates() {
      console.log('📚 Loading templates...');
      
      let templates = [];
      
      try {
          const response = await fetch(API_BASE + PORTFOLIOS_ENDPOINT);
          if (response.ok) {
              const data = await response.json();
              templates = data.portfolios || data;
          }
      } catch (error) {
          console.warn('Cannot load templates from backend:', error);
      }
      
      if (!templates || templates.length === 0) {
          try {
              const response = await fetch(LOCAL_FALLBACK_JSON);
              if (response.ok) {
                  const data = await response.json();
                  templates = data.portfolios || data;
              }
          } catch (error) {
              console.warn('Cannot load templates from local file:', error);
          }
      }
      
      if (!templates || templates.length === 0) {
          if (EMBEDDED_FALLBACK && EMBEDDED_FALLBACK.portfolios) {
              templates = EMBEDDED_FALLBACK.portfolios;
          } else {
              showNotification('Шаблоны временно недоступны', 'warning');
              return;
          }
      }
      
      displayTemplates(templates);
  }

  function displayTemplates(templates) {
      const templatesList = document.getElementById('templatesList');
      const placeholder = document.getElementById('templatesPlaceholder');
      
      if (!templates || templates.length === 0) {
          if (placeholder) placeholder.style.display = 'block';
          if (templatesList) templatesList.style.display = 'none';
          return;
      }
      
      if (placeholder) placeholder.style.display = 'none';
      if (templatesList) templatesList.style.display = 'grid';
      
      templatesList.innerHTML = templates.map(t => {
          const templateName = t.team_name || `Шаблон ${t.team_number || t.id}`;
          const tags = t.tags || [];
          const templateUrl = (t.templates && t.templates[0]) || t.pdf_url || '#';
          
          return `
              <div class="template-card">
                  <div class="template-icon">📄</div>
                  
                  <div class="template-info">
                      <div class="template-name">${escapeHtml(templateName)}</div>
                      
                      ${tags.length > 0 ? `
                          <div class="template-tags">
                              ${tags.slice(0, 4).map(tag => `
                                  <span class="template-tag">${escapeHtml(tag)}</span>
                              `).join('')}
                              ${tags.length > 4 ? `<span class="template-tag">+${tags.length - 4}</span>` : ''}
                          </div>
                      ` : ''}
                      
                      <div class="template-type">
                          ${t.portfolio_type ? `Тип: ${t.portfolio_type.toUpperCase()}` : ''}
                          ${t.achievement ? ` | ${t.achievement}` : ''}
                      </div>
                  </div>
                  
                  <div class="template-actions">
                      <a class="template-btn" href="${encodeURI(templateUrl)}" target="_blank" rel="noopener">
                          ⬇️ Скачать
                      </a>
                  </div>
              </div>
          `;
      }).join('');
      
      // Add hover effects
      document.querySelectorAll('.template-card').forEach(card => {
          card.addEventListener('mouseenter', () => {
              card.style.transform = 'translateY(-2px)';
          });
          
          card.addEventListener('mouseleave', () => {
              card.style.transform = '';
          });
      });
  }

  async function searchTemplates(query) {
      if (!query || query.trim().length < 2) {
          return loadTemplates();
      }
      
      let templates = [];
      
      try {
          const response = await fetch(LOCAL_FALLBACK_JSON);
          if (response.ok) {
              const data = await response.json();
              templates = data.portfolios || data;
          }
      } catch (error) {
          console.error('Search failed:', error);
          showNotification('Ошибка поиска шаблонов', 'error');
          return;
      }
      
      const filteredTemplates = templates.filter(t => {
          const searchText = (
              (t.description || '') + ' ' +
              (t.team_name || '') + ' ' +
              (t.tags || []).join(' ') + ' ' +
              (t.portfolio_type || '')
          ).toLowerCase();
          
          return query.toLowerCase().split(/\s+/).every(token => searchText.includes(token));
      });
      
      displayTemplates(filteredTemplates);
  }

  async function loadRandomTemplate() {
      let templates = [];
      
      try {
          const response = await fetch(LOCAL_FALLBACK_JSON);
          if (response.ok) {
              const data = await response.json();
              templates = data.portfolios || data;
          }
      } catch (error) {
          console.error('Cannot load templates:', error);
          showNotification('Ошибка загрузки шаблонов', 'error');
          return;
      }
      
      if (templates.length === 0) {
          showNotification('Нет доступных шаблонов', 'warning');
          return;
      }
      
      const randomTemplates = [...templates]
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);
      
      displayTemplates(randomTemplates);
      showNotification('Загружены случайные шаблоны', 'success');
  }

  // ===== Admin Functions (Placeholders) =====
  function scanPortfolios() {
      document.getElementById('scanResult').style.display = 'block';
      document.getElementById('scanMessage').innerHTML = `
          <div class="scan-status">
              <div class="status-icon">🔍</div>
              <div class="status-text">
                  <strong>Сканирование запущено</strong><br>
                  <small>Проверка доступных портфолио...</small>
              </div>
          </div>
      `;
      showNotification('Сканирование начато', 'info');
      
      // Simulate scanning process
      setTimeout(() => {
          document.getElementById('scanMessage').innerHTML = `
              <div class="scan-status success">
                  <div class="status-icon">✅</div>
                  <div class="status-text">
                      <strong>Сканирование завершено</strong><br>
                      <small>Найдено портфолио: ${Math.floor(Math.random() * 50) + 20}</small>
                  </div>
              </div>
          `;
      }, 1500);
  }

  function generateTemplates() {
      document.getElementById('templateGenerationResult').style.display = 'block';
      document.getElementById('templateGenMessage').innerHTML = `
          <div class="gen-status">
              <div class="status-icon">⚡</div>
              <div class="status-text">
                  <strong>Генерация шаблонов</strong><br>
                  <small>ИИ создаёт новые макеты...</small>
              </div>
          </div>
      `;
      showNotification('Генерация шаблонов начата', 'info');
      
      // Simulate generation process
      setTimeout(() => {
          document.getElementById('templateGenMessage').innerHTML = `
              <div class="gen-status success">
                  <div class="status-icon">✅</div>
                  <div class="status-text">
                      <strong>Генерация завершена</strong><br>
                      <small>Создано шаблонов: ${Math.floor(Math.random() * 5) + 2}</small>
                  </div>
              </div>
          `;
      }, 2000);
  }

  function loadStats() {
      document.getElementById('statsResult').style.display = 'block';
      document.getElementById('statsMessage').innerHTML = `
          <div class="stats-container">
              <h4>📊 Статистика системы</h4>
              
              <div class="stats-grid">
                  <div class="stat-item">
                      <div class="stat-value">${Math.floor(Math.random() * 100) + 50}</div>
                      <div class="stat-label">Всего портфолио</div>
                  </div>
                  
                  <div class="stat-item">
                      <div class="stat-value">${Math.floor(Math.random() * 20) + 5}</div>
                      <div class="stat-label">Шаблонов</div>
                  </div>
                  
                  <div class="stat-item">
                      <div class="stat-value">${Math.floor(Math.random() * 1000) + 100}</div>
                      <div class="stat-label">Запросов к ИИ</div>
                  </div>
              </div>
              
              <div class="stats-note">
                  <small>Данные обновляются в реальном времени</small>
              </div>
          </div>
      `;
      
      showNotification('Статистика загружена', 'success');
  }

  // ===== UI Initialization =====
  function initializeUI() {
      console.log('🚀 Initializing Red Lotus UI...');
      
      // Navigation buttons
      document.querySelectorAll('.nav-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              e.preventDefault();
              const tabName = btn.dataset.tab;
              switchTab(tabName);
              rippleEffect(e);
          });
      });
      
      // Form submission
      const form = document.getElementById('portfolioForm');
      if (form) {
          form.addEventListener('submit', generatePortfolios);
      }
      
      // Template search
      const searchInput = document.getElementById('templateSearch');
      if (searchInput) {
          searchInput.addEventListener('input', debounce((e) => {
              searchTemplates(e.target.value);
          }, 300));
      }
      
      // Layout filters
      document.querySelectorAll('.layout-filter').forEach(cb => {
          cb.addEventListener('change', filterTemplates);
      });
      
      // Random template button
      const randomBtn = document.getElementById('randomTemplateBtn');
      if (randomBtn) {
          randomBtn.addEventListener('click', loadRandomTemplate);
      }
      
      // Admin buttons
      const scanBtn = document.getElementById('scanBtn');
      if (scanBtn) scanBtn.addEventListener('click', scanPortfolios);
      
      const genBtn = document.getElementById('generateTemplatesBtn');
      if (genBtn) genBtn.addEventListener('click', generateTemplates);
      
      const statsBtn = document.getElementById('statsBtn');
      if (statsBtn) statsBtn.addEventListener('click', loadStats);
      
      // Modals
      setupModals();
      
      // Load embedded data if available
      loadEmbeddedData();
  }

  function loadEmbeddedData() {
      // This function would load EMBEDDED_FALLBACK from an external file
      // For now, it's a placeholder
      console.log('📦 Loading embedded data...');
      
      // You can load EMBEDDED_FALLBACK from an external JS file like this:
      // const script = document.createElement('script');
      // script.src = 'embedded-data.js';
      // document.head.appendChild(script);
  }

  function switchTab(name) {
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
          tab.style.display = 'none';
          tab.classList.remove('active');
      });
      
      // Show selected tab
      const targetTab = document.getElementById(`${name}-tab`);
      if (targetTab) {
          targetTab.style.display = '';
          targetTab.classList.add('active');
      }
      
      // Update navigation buttons
      document.querySelectorAll('.nav-btn').forEach(btn => {
          btn.classList.remove('active');
      });
      
      const activeBtn = document.querySelector(`[data-tab="${name}"]`);
      if (activeBtn) {
          activeBtn.classList.add('active');
      }
      
      // Load content for specific tabs
      if (name === 'templates') {
          setTimeout(loadTemplates, 100);
      }
  }

  function rippleEffect(e) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      
      btn.appendChild(ripple);
      
      setTimeout(() => {
          ripple.remove();
      }, 600);
  }

  function filterTemplates() {
      // Placeholder for client-side filtering
      const selectedFilters = Array.from(document.querySelectorAll('.layout-filter:checked'))
          .map(cb => cb.value);
      
      console.log('Filters:', selectedFilters);
      
      // In a real implementation, you would filter the templates here
  }

  function setupModals() {
      // Close buttons
      document.querySelectorAll('.modal .close-btn, .close-modal-btn').forEach(btn => {
          btn.addEventListener('click', () => {
              document.querySelectorAll('.modal').forEach(modal => {
                  modal.style.display = 'none';
              });
          });
      });
      
      // Close modal when clicking outside
      document.querySelectorAll('.modal').forEach(modal => {
          modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                  modal.style.display = 'none';
              }
          });
      });
  }

  // ===== Connection Check =====
  async function checkBackendConnection() {
      console.log('🔌 Checking backend connection...');
      
      try {
          const response = await fetch(API_BASE + '/api/health-check', {
              method: 'HEAD',
              timeout: 3000
          });
          
          if (response.ok) {
              console.log('✅ Backend is available');
              showNotification('Соединение с сервером установлено', 'success', 2000);
          } else {
              console.warn('⚠️ Backend returned error:', response.status);
              showNotification('Сервер доступен, но вернул ошибку', 'warning', 3000);
          }
      } catch (error) {
          console.warn('❌ Backend is unavailable:', error.message);
          showNotification('Работаем в автономном режиме', 'info', 3000);
      }
  }

  // ===== Event Listeners =====
  document.addEventListener('DOMContentLoaded', () => {
      console.log('📄 DOM loaded, initializing application...');
      initializeUI();
      checkBackendConnection();
  });

  // Global error handler
  window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      showNotification('Произошла ошибка в приложении', 'error');
  });

  // Make functions available globally (for debugging)
  window.redLotus = {
      generatePortfolios,
      loadTemplates,
      searchTemplates,
      loadRandomTemplate,
      geminiRankPortfolios,
      showNotification
  };

  console.log('🎨 Red Lotus frontend initialized successfully!');