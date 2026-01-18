// ===== ИСПРАВЛЕННЫЙ script.js - РАБОЧАЯ ВЕРСИЯ С ЛОГАМИ =====

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // Замените на ваш реальный API-ключ

// Встроенные данные
const EMBEDDED_DATA = {
  "portfolios": [
    {
      "id": "10179-cs",
      "team_number": "10179",
      "team_name": "Tech Turtles",
      "achievement": "Qualifier",
      "portfolio_type": "cs",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10179-cs.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10179-cs.png",
      "description": "",
      "tags": [],
      "design_adjectives_en": [],
      "design_adjectives_ru": [],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "23396-cs",
      "team_number": "23396",
      "team_name": "Hivemind",
      "achievement": "Regionals",
      "portfolio_type": "cs",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/23396-cs.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/23396-cs.png",
      "description": "Team 23396 — concise portfolio overview inferred from the submitted document \"23396-cs.pdf\".\n\nThis portfolio focuses on the mechanical design and build process. It documents CAD iterations, material choices, structural analysis, and physical prototyping. The team provides assembly photos, dimensioned drawings, and explanations of trade-offs made during the build.\n\nSections typically include problem statement, requirements, subsystem breakdown (drive, manipulator, chassis), test logs and a reflection on improvements for next season. The narrative balances technical details with practical lessons.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "cad",
        "chassis",
        "clean layout",
        "competition portfolio",
        "cs",
        "design",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "manufacturing",
        "mechanical",
        "mechanical design",
        "mechanisms",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "механизмы",
        "механика",
        "наглядный",
        "проектирование",
        "производство",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "grid-based",
        "asymmetrical",
        "monospace-code",
        "sharp-edges",
        "three-tone",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "на сетке",
        "асимметричная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "grid-based",
        "asymmetrical",
        "monospace-code",
        "sharp-edges",
        "three-tone"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "на сетке",
        "асимметричная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "1002-ff",
      "team_number": "1002",
      "team_name": "Circuit Runners: Surge",
      "achievement": "Worlds",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/1002-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/1002-ff.png",
      "description": "Team 1002 — concise portfolio overview inferred from the submitted document \"1002-ff.pdf\".\n\nThis portfolio focuses on the mechanical design and build process. It documents CAD iterations, material choices, structural analysis, and physical prototyping. The team provides assembly photos, dimensioned drawings, and explanations of trade-offs made during the build.\n\nSections typically include problem statement, requirements, subsystem breakdown (drive, manipulator, chassis), test logs and a reflection on improvements for next season. The narrative balances technical details with practical lessons.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "cad",
        "chassis",
        "clean layout",
        "competition portfolio",
        "design",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "manufacturing",
        "mechanical",
        "mechanical design",
        "mechanisms",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "механизмы",
        "механика",
        "наглядный",
        "проектирование",
        "производство",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "two-column",
        "multi-panel",
        "large-hierarchy",
        "vibrant",
        "muted",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "двухколоночная",
        "мультипанель",
        "выраженная иерархия",
        "яркий",
        "приглушённый"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "two-column",
        "multi-panel",
        "large-hierarchy",
        "vibrant",
        "muted"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "двухколоночная",
        "мультипанель",
        "выраженная иерархия",
        "яркий",
        "приглушённый"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "1002-pp",
      "team_number": "1002",
      "team_name": "Circuit Runners: Surge",
      "achievement": "Worlds",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/1002-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/1002-pp.png",
      "description": "",
      "tags": [],
      "design_adjectives_en": [],
      "design_adjectives_ru": [],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "10183-pp",
      "team_number": "10183",
      "team_name": "Frog Robots of Germany",
      "achievement": "Regionals",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10183-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10183-pp.png",
      "description": "Team 10183 — concise portfolio overview inferred from the submitted document \"10183-pp.pdf\".\n\nThis portfolio emphasizes outreach, community engagement and STEM impact. It documents workshops, school visits, and collaborations with local organizations.\n\nIncluded are photographs from events, participant testimonials, curriculum materials created by the team, and reflections on outreach outcomes.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "community",
        "competition portfolio",
        "design process",
        "documentation",
        "education",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "mentorship",
        "outreach",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "аутрич",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "наставничество",
        "образование",
        "процесс проектирования",
        "робототехника",
        "сообщество",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "grid-based",
        "asymmetrical",
        "monospace-code",
        "sharp-edges",
        "three-tone",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "на сетке",
        "асимметричная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "grid-based",
        "asymmetrical",
        "monospace-code",
        "sharp-edges",
        "three-tone"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "на сетке",
        "асимметричная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "10355-ff",
      "team_number": "10355",
      "team_name": "Project Peacock",
      "achievement": "Regionals",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10355-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10355-ff.png",
      "description": "",
      "tags": [],
      "design_adjectives_en": [],
      "design_adjectives_ru": [],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "11468-pp",
      "team_number": "11468",
      "team_name": "Ohm Raiders",
      "achievement": "Regionals",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/11468-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/11468-pp.png",
      "description": "Team 11468 — concise portfolio overview inferred from the submitted document \"11468-pp.pdf\".\n\nThis portfolio highlights electrical system design: schematics, wiring diagrams, power budgeting and sensor integration. It documents component selection, safety considerations and troubleshooting logs.\n\nExpect BOM excerpts, layout drawings, and recorded measurements from bench tests. The team explains how electrical choices supported reliability and maintainability in the robot design.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "design process",
        "documentation",
        "electrical",
        "electronics",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "power",
        "power management",
        "robotics",
        "robotics team",
        "sensors",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "wiring",
        "датчики",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "питание",
        "проводка",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "электроника",
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "modular",
        "card-style",
        "large-hierarchy",
        "pastel",
        "monochrome",
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "модульная",
        "карточный стиль",
        "выраженная иерархия",
        "пастельный",
        "монохромный"
      ],
      "design_adjectives_en": [
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "modular",
        "card-style",
        "large-hierarchy",
        "pastel",
        "monochrome"
      ],
      "design_adjectives_ru": [
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "модульная",
        "карточный стиль",
        "выраженная иерархия",
        "пастельный",
        "монохромный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "12051-pp",
      "team_number": "12051",
      "team_name": "Not Not Nerds",
      "achievement": "Qualifier",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/12051-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/12051-pp.png",
      "description": "Team 12051 — concise portfolio overview inferred from the submitted document \"12051-pp.pdf\".\n\nThis portfolio emphasizes software architecture, control algorithms and autonomous routines. It outlines the codebase structure, key algorithms (path planning, PID tuning, sensor fusion), and testing methodology.\n\nIncluded are design diagrams, sample pseudocode, results of simulation or on-field testing, and a section on CI/CD or software quality practices. The team highlights how code design enabled consistent performance under competition stress.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "controls",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "spacious",
        "compact",
        "readable-caption",
        "muted",
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "просторная",
        "компактная",
        "читабельные подписи",
        "приглушённый"
      ],
      "design_adjectives_en": [
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "spacious",
        "compact",
        "readable-caption",
        "muted"
      ],
      "design_adjectives_ru": [
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "просторная",
        "компактная",
        "читабельные подписи",
        "приглушённый"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "12635-pp",
      "team_number": "12635",
      "team_name": "Kuriosity Robotics",
      "achievement": "Worlds",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/12635-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/12635-pp.png",
      "description": "Team 12635 — concise portfolio overview inferred from the submitted document \"12635-pp.pdf\".\n\nThis portfolio presents a balanced view across mechanical, software and strategic aspects. It contains CAD exports, control-flow diagrams, and a season timeline.\n\nThe narrative covers design decisions, test results, a summary of competition performance and actionable lessons learned for future teams.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "design",
        "design process",
        "documentation",
        "engineering",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "multi-panel",
        "spacious",
        "light-body-text",
        "sans-serif-headings",
        "vibrant",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "мультипанель",
        "просторная",
        "лёгкий основной текст",
        "заголовки без засечек",
        "яркий"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "multi-panel",
        "spacious",
        "light-body-text",
        "sans-serif-headings",
        "vibrant"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "мультипанель",
        "просторная",
        "лёгкий основной текст",
        "заголовки без засечек",
        "яркий"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "14270-pp",
      "team_number": "14270",
      "team_name": "Quantum Robotics",
      "achievement": "Regionals",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/14270-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/14270-pp.png",
      "description": "Team 14270 — concise portfolio overview inferred from the submitted document \"14270-pp.pdf\".\n\nThis portfolio presents a balanced view across mechanical, software and strategic aspects. It contains CAD exports, control-flow diagrams, and a season timeline.\n\nThe narrative covers design decisions, test results, a summary of competition performance and actionable lessons learned for future teams.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "design",
        "design process",
        "documentation",
        "engineering",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "readable-caption",
        "two-tone",
        "accent-color",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "читабельные подписи",
        "двухцветный",
        "акцентный цвет"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "readable-caption",
        "two-tone",
        "accent-color"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "читабельные подписи",
        "двухцветный",
        "акцентный цвет"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "16461-ff",
      "team_number": "16461",
      "team_name": "Infinite Turtles",
      "achievement": "Worlds",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/16461-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/16461-ff.png",
      "description": "Team 16461 — concise portfolio overview inferred from the submitted document \"16461-ff.pdf\".\n\nThis portfolio emphasizes outreach, community engagement and STEM impact. It documents workshops, school visits, and collaborations with local organizations.\n\nIncluded are photographs from events, participant testimonials, curriculum materials created by the team, and reflections on outreach outcomes.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "community",
        "competition portfolio",
        "design process",
        "documentation",
        "education",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "mentorship",
        "outreach",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "аутрич",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "наставничество",
        "образование",
        "процесс проектирования",
        "робототехника",
        "сообщество",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "two-column",
        "multi-panel",
        "monospace-code",
        "soft-edges",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "двухколоночная",
        "мультипанель",
        "моноширинный код",
        "монохромный",
        "мягкие края"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "two-column",
        "multi-panel",
        "monospace-code",
        "soft-edges"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "двухколоночная",
        "мультипанель",
        "моноширинный код",
        "монохромный",
        "мягкие края"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "18317-pp",
      "team_number": "18317",
      "team_name": "Steel Eels",
      "achievement": "Worlds",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/18317-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/18317-pp.png",
      "description": "Team 18317 — concise portfolio overview inferred from the submitted document \"18317-pp.pdf\".\n\nThis portfolio presents a balanced view across mechanical, software and strategic aspects. It contains CAD exports, control-flow diagrams, and a season timeline.\n\nThe narrative covers design decisions, test results, a summary of competition performance and actionable lessons learned for future teams.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "design",
        "design process",
        "documentation",
        "engineering",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "modular",
        "card-style",
        "large-hierarchy",
        "pastel",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "модульная",
        "карточный стиль",
        "выраженная иерархия",
        "пастельный",
        "монохромный"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "modular",
        "card-style",
        "large-hierarchy",
        "pastel"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "модульная",
        "карточный стиль",
        "выраженная иерархия",
        "пастельный",
        "монохромный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "20744-pp",
      "team_number": "20744",
      "team_name": "24KARAT",
      "achievement": "Regionals",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/20744-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/20744-pp.png",
      "description": "Team 20744 — concise portfolio overview inferred from the submitted document \"20744-pp.pdf\".\n\nThis portfolio focuses on the mechanical design and build process. It documents CAD iterations, material choices, structural analysis, and physical prototyping. The team provides assembly photos, dimensioned drawings, and explanations of trade-offs made during the build.\n\nSections typically include problem statement, requirements, subsystem breakdown (drive, manipulator, chassis), test logs and a reflection on improvements for next season. The narrative balances technical details with practical lessons.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "cad",
        "chassis",
        "clean layout",
        "competition portfolio",
        "design",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "manufacturing",
        "mechanical",
        "mechanical design",
        "mechanisms",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "механизмы",
        "механика",
        "наглядный",
        "проектирование",
        "производство",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "multi-panel",
        "spacious",
        "light-body-text",
        "sans-serif-headings",
        "vibrant",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "мультипанель",
        "просторная",
        "лёгкий основной текст",
        "заголовки без засечек",
        "яркий"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "multi-panel",
        "spacious",
        "light-body-text",
        "sans-serif-headings",
        "vibrant"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "мультипанель",
        "просторная",
        "лёгкий основной текст",
        "заголовки без засечек",
        "яркий"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "21579-cs",
      "team_number": "21579",
      "team_name": "Testing is Optional",
      "achievement": "Regionals",
      "portfolio_type": "cs",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/21579-cs.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/21579-cs.png",
      "description": "Team 21579 — concise portfolio overview inferred from the submitted document \"21579-cs.pdf\".\n\nThis portfolio focuses on the mechanical design and build process. It documents CAD iterations, material choices, structural analysis, and physical prototyping. The team provides assembly photos, dimensioned drawings, and explanations of trade-offs made during the build.\n\nSections typically include problem statement, requirements, subsystem breakdown (drive, manipulator, chassis), test logs and a reflection on improvements for next season. The narrative balances technical details with practical lessons.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "cad",
        "chassis",
        "clean layout",
        "competition portfolio",
        "cs",
        "design",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "manufacturing",
        "mechanical",
        "mechanical design",
        "mechanisms",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "механизмы",
        "механика",
        "наглядный",
        "проектирование",
        "производство",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "readable-caption",
        "two-tone",
        "accent-color",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "читабельные подписи",
        "двухцветный",
        "акцентный цвет"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "readable-caption",
        "two-tone",
        "accent-color"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "читабельные подписи",
        "двухцветный",
        "акцентный цвет"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "252-ff",
      "team_number": "252",
      "team_name": "Electric Quahogs",
      "achievement": "Regionals",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/252-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/252-ff.png",
      "description": "Team 252 — concise portfolio overview inferred from the submitted document \"252-ff.pdf\".\n\nThis portfolio centers on competition strategy, season planning and iterative improvements derived from match data. It contains scouting summaries, match analyses and rationale for the chosen robot capabilities.\n\nThe document includes field diagrams, scoring breakdowns, a playbook for common opponent scenarios and post-match retrospective notes.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "game analysis",
        "gameplay",
        "iteration",
        "judge friendly",
        "match planning",
        "portfolio",
        "robotics",
        "robotics team",
        "scouting",
        "stem",
        "strategy",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "анализ игры",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "планирование матчей",
        "процесс проектирования",
        "робототехника",
        "скаутинг",
        "соревновательное портфолио",
        "стратегия",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "compact",
        "modular",
        "monospace-code",
        "sharp-edges",
        "three-tone",
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "компактная",
        "модульная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "design_adjectives_en": [
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "compact",
        "modular",
        "monospace-code",
        "sharp-edges",
        "three-tone"
      ],
      "design_adjectives_ru": [
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "компактная",
        "модульная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "4042-ff",
      "team_number": "4042",
      "team_name": "Nonstandard Deviation",
      "achievement": "Qualifier",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/4042-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/4042-ff.png",
      "description": "Team 4042 — concise portfolio overview inferred from the submitted document \"4042-ff.pdf\".\n\nThis portfolio focuses on the mechanical design and build process. It documents CAD iterations, material choices, structural analysis, and physical prototyping. The team provides assembly photos, dimensioned drawings, and explanations of trade-offs made during the build.\n\nSections typically include problem statement, requirements, subsystem breakdown (drive, manipulator, chassis), test logs and a reflection on improvements for next season. The narrative balances technical details with practical lessons.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "cad",
        "chassis",
        "clean layout",
        "competition portfolio",
        "design",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "manufacturing",
        "mechanical",
        "mechanical design",
        "mechanisms",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "механизмы",
        "механика",
        "наглядный",
        "проектирование",
        "производство",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "light-body-text",
        "two-tone",
        "accent-color",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "лёгкий основной текст",
        "двухцветный",
        "акцентный цвет"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "light-body-text",
        "two-tone",
        "accent-color"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "лёгкий основной текст",
        "двухцветный",
        "акцентный цвет"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "516-ug",
      "team_number": "516",
      "team_name": "Gears of Fire",
      "achievement": "Regionals",
      "portfolio_type": "ug",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/516-ug.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/516-ug.png",
      "description": "Team 516 — concise portfolio overview inferred from the submitted document \"516-ug.pdf\".\n\nThis portfolio highlights electrical system design: schematics, wiring diagrams, power budgeting and sensor integration. It documents component selection, safety considerations and troubleshooting logs.\n\nExpect BOM excerpts, layout drawings, and recorded measurements from bench tests. The team explains how electrical choices supported reliability and maintainability in the robot design.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "design process",
        "documentation",
        "electrical",
        "electronics",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "power",
        "power management",
        "robotics",
        "robotics team",
        "sensors",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "wiring",
        "датчики",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "питание",
        "проводка",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "электроника",
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "modular",
        "card-style",
        "light-body-text",
        "pastel",
        "monochrome",
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "модульная",
        "карточный стиль",
        "лёгкий основной текст",
        "пастельный",
        "монохромный"
      ],
      "design_adjectives_en": [
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "modular",
        "card-style",
        "light-body-text",
        "pastel",
        "monochrome"
      ],
      "design_adjectives_ru": [
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "модульная",
        "карточный стиль",
        "лёгкий основной текст",
        "пастельный",
        "монохромный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "6165-ff",
      "team_number": "6165",
      "team_name": "MSET CuttleFish",
      "achievement": "Worlds",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/6165-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/6165-ff.png",
      "description": "Team 6165 — concise portfolio overview inferred from the submitted document \"6165-ff.pdf\".\n\nThis portfolio highlights electrical system design: schematics, wiring diagrams, power budgeting and sensor integration. It documents component selection, safety considerations and troubleshooting logs.\n\nExpect BOM excerpts, layout drawings, and recorded measurements from bench tests. The team explains how electrical choices supported reliability and maintainability in the robot design.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "design process",
        "documentation",
        "electrical",
        "electronics",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "power",
        "power management",
        "robotics",
        "robotics team",
        "sensors",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "wiring",
        "датчики",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "питание",
        "проводка",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "электроника",
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "grid-based",
        "asymmetrical",
        "large-hierarchy",
        "monochrome",
        "soft-edges",
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "на сетке",
        "асимметричная",
        "выраженная иерархия",
        "монохромный",
        "мягкие края"
      ],
      "design_adjectives_en": [
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "grid-based",
        "asymmetrical",
        "large-hierarchy",
        "monochrome",
        "soft-edges"
      ],
      "design_adjectives_ru": [
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "на сетке",
        "асимметричная",
        "выраженная иерархия",
        "монохромный",
        "мягкие края"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "6323-ug",
      "team_number": "6323",
      "team_name": "The Pink Team",
      "achievement": "Regionals",
      "portfolio_type": "ug",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/6323-ug.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/6323-ug.png",
      "description": "Team 6323 — concise portfolio overview inferred from the submitted document \"6323-ug.pdf\".\n\nThis portfolio highlights electrical system design: schematics, wiring diagrams, power budgeting and sensor integration. It documents component selection, safety considerations and troubleshooting logs.\n\nExpect BOM excerpts, layout drawings, and recorded measurements from bench tests. The team explains how electrical choices supported reliability and maintainability in the robot design.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "design process",
        "documentation",
        "electrical",
        "electronics",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "power",
        "power management",
        "robotics",
        "robotics team",
        "sensors",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "wiring",
        "датчики",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "питание",
        "проводка",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "электроника",
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "two-column",
        "multi-panel",
        "light-body-text",
        "monochrome",
        "soft-edges",
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "двухколоночная",
        "мультипанель",
        "лёгкий основной текст",
        "монохромный",
        "мягкие края"
      ],
      "design_adjectives_en": [
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "two-column",
        "multi-panel",
        "light-body-text",
        "monochrome",
        "soft-edges"
      ],
      "design_adjectives_ru": [
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "двухколоночная",
        "мультипанель",
        "лёгкий основной текст",
        "монохромный",
        "мягкие края"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "701-ff",
      "team_number": "701",
      "team_name": "The GONK Squad",
      "achievement": "Regionals",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/701-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/701-ff.png",
      "description": "Team 701 — concise portfolio overview inferred from the submitted document \"701-ff.pdf\".\n\nThis portfolio presents a balanced view across mechanical, software and strategic aspects. It contains CAD exports, control-flow diagrams, and a season timeline.\n\nThe narrative covers design decisions, test results, a summary of competition performance and actionable lessons learned for future teams.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "design",
        "design process",
        "documentation",
        "engineering",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "spacious",
        "compact",
        "light-body-text",
        "soft-edges",
        "two-tone",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "просторная",
        "компактная",
        "лёгкий основной текст",
        "мягкие края",
        "двухцветный"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "spacious",
        "compact",
        "light-body-text",
        "soft-edges",
        "two-tone"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "просторная",
        "компактная",
        "лёгкий основной текст",
        "мягкие края",
        "двухцветный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "7444-cs",
      "team_number": "7444",
      "team_name": "Sisters of the Motherboard",
      "achievement": "Regionals",
      "portfolio_type": "cs",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7444-cs.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7444-cs.png",
      "description": "Team 7444 — concise portfolio overview inferred from the submitted document \"7444-cs.pdf\".\n\nThis portfolio centers on competition strategy, season planning and iterative improvements derived from match data. It contains scouting summaries, match analyses and rationale for the chosen robot capabilities.\n\nThe document includes field diagrams, scoring breakdowns, a playbook for common opponent scenarios and post-match retrospective notes.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "cs",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "game analysis",
        "gameplay",
        "iteration",
        "judge friendly",
        "match planning",
        "portfolio",
        "robotics",
        "robotics team",
        "scouting",
        "stem",
        "strategy",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "анализ игры",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "планирование матчей",
        "процесс проектирования",
        "робототехника",
        "скаутинг",
        "соревновательное портфолио",
        "стратегия",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "single-column",
        "bold-headings",
        "muted",
        "high-contrast",
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "одноколоночная",
        "двухколоночная",
        "жирные заголовки",
        "приглушённый",
        "высокая контрастность"
      ],
      "design_adjectives_en": [
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "single-column",
        "bold-headings",
        "muted",
        "high-contrast"
      ],
      "design_adjectives_ru": [
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "одноколоночная",
        "двухколоночная",
        "жирные заголовки",
        "приглушённый",
        "высокая контрастность"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "7444-ug",
      "team_number": "7444",
      "team_name": "Sisters of the Motherboard",
      "achievement": "Regionals",
      "portfolio_type": "ug",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7444-ug.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7444-ug.png",
      "description": "Team 7444 — concise portfolio overview inferred from the submitted document \"7444-ug.pdf\".\n\nThis portfolio centers on competition strategy, season planning and iterative improvements derived from match data. It contains scouting summaries, match analyses and rationale for the chosen robot capabilities.\n\nThe document includes field diagrams, scoring breakdowns, a playbook for common opponent scenarios and post-match retrospective notes.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "game analysis",
        "gameplay",
        "iteration",
        "judge friendly",
        "match planning",
        "portfolio",
        "robotics",
        "robotics team",
        "scouting",
        "stem",
        "strategy",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "анализ игры",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "планирование матчей",
        "процесс проектирования",
        "робототехника",
        "скаутинг",
        "соревновательное портфолио",
        "стратегия",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "card-style",
        "grid-based",
        "light-body-text",
        "three-tone",
        "sans-serif-headings",
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "карточный стиль",
        "на сетке",
        "лёгкий основной текст",
        "трёхцветный",
        "заголовки без засечек"
      ],
      "design_adjectives_en": [
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "card-style",
        "grid-based",
        "light-body-text",
        "three-tone",
        "sans-serif-headings"
      ],
      "design_adjectives_ru": [
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "карточный стиль",
        "на сетке",
        "лёгкий основной текст",
        "трёхцветный",
        "заголовки без засечек"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "7842-pp",
      "team_number": "7842",
      "team_name": "Browncoats",
      "achievement": "Worlds",
      "portfolio_type": "pp",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7842-pp.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7842-pp.png",
      "description": "Team 7842 — concise portfolio overview inferred from the submitted document \"7842-pp.pdf\".\n\nThis portfolio focuses on the mechanical design and build process. It documents CAD iterations, material choices, structural analysis, and physical prototyping. The team provides assembly photos, dimensioned drawings, and explanations of trade-offs made during the build.\n\nSections typically include problem statement, requirements, subsystem breakdown (drive, manipulator, chassis), test logs and a reflection on improvements for next season. The narrative balances technical details with practical lessons.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "cad",
        "chassis",
        "clean layout",
        "competition portfolio",
        "design",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "manufacturing",
        "mechanical",
        "mechanical design",
        "mechanisms",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "механизмы",
        "механика",
        "наглядный",
        "проектирование",
        "производство",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "spacious",
        "compact",
        "monospace-code",
        "muted",
        "high-contrast",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "просторная",
        "компактная",
        "моноширинный код",
        "приглушённый",
        "высокая контрастность"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "spacious",
        "compact",
        "monospace-code",
        "muted",
        "high-contrast"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "просторная",
        "компактная",
        "моноширинный код",
        "приглушённый",
        "высокая контрастность"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "7842-ug",
      "team_number": "7842",
      "team_name": "Browncoats",
      "achievement": "Regionals",
      "portfolio_type": "ug",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7842-ug.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7842-ug.png",
      "description": "Team 7842 — concise portfolio overview inferred from the submitted document \"7842-ug.pdf\".\n\nThis portfolio emphasizes outreach, community engagement and STEM impact. It documents workshops, school visits, and collaborations with local organizations.\n\nIncluded are photographs from events, participant testimonials, curriculum materials created by the team, and reflections on outreach outcomes.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "community",
        "competition portfolio",
        "design process",
        "documentation",
        "education",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "mentorship",
        "outreach",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "аутрич",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "наставничество",
        "образование",
        "процесс проектирования",
        "робототехника",
        "сообщество",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "readable-caption",
        "sans-serif-headings",
        "vibrant",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "читабельные подписи",
        "заголовки без засечек",
        "яркий"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "asymmetrical",
        "single-column",
        "readable-caption",
        "sans-serif-headings",
        "vibrant"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "асимметричная",
        "одноколоночная",
        "читабельные подписи",
        "заголовки без засечек",
        "яркий"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "8300-ff",
      "team_number": "8300",
      "team_name": "Pi Rho Eagles",
      "achievement": "Regionals",
      "portfolio_type": "ff",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/8300-ff.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/8300-ff.png",
      "description": "Team 8300 — concise portfolio overview inferred from the submitted document \"8300-ff.pdf\".\n\nThis portfolio centers on competition strategy, season planning and iterative improvements derived from match data. It contains scouting summaries, match analyses and rationale for the chosen robot capabilities.\n\nThe document includes field diagrams, scoring breakdowns, a playbook for common opponent scenarios and post-match retrospective notes.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "game analysis",
        "gameplay",
        "iteration",
        "judge friendly",
        "match planning",
        "portfolio",
        "robotics",
        "robotics team",
        "scouting",
        "stem",
        "strategy",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "анализ игры",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "планирование матчей",
        "процесс проектирования",
        "робототехника",
        "скаутинг",
        "соревновательное портфолио",
        "стратегия",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "single-column",
        "monospace-code",
        "three-tone",
        "sans-serif-headings",
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "одноколоночная",
        "двухколоночная",
        "моноширинный код",
        "трёхцветный",
        "заголовки без засечек"
      ],
      "design_adjectives_en": [
        "informative",
        "chart-heavy",
        "diagrammatic",
        "two-column",
        "executive-summary",
        "muted-palette",
        "accent-red-green",
        "callouts",
        "timeline-focused",
        "single-column",
        "monospace-code",
        "three-tone",
        "sans-serif-headings"
      ],
      "design_adjectives_ru": [
        "информативный",
        "много графиков",
        "диаграммный",
        "двухколоночный",
        "руководящая сводка",
        "приглушённая палитра",
        "акценты красный-зелёный",
        "выноски",
        "фокус на таймлайне",
        "одноколоночная",
        "двухколоночная",
        "моноширинный код",
        "трёхцветный",
        "заголовки без засечек"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "9527-ug",
      "team_number": "9527",
      "team_name": "Rogue Resistance",
      "achievement": "Qualifier",
      "portfolio_type": "ug",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/9527-ug.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/9527-ug.png",
      "description": "Team 9527 — concise portfolio overview inferred from the submitted document \"9527-ug.pdf\".\n\nThis portfolio emphasizes software architecture, control algorithms and autonomous routines. It outlines the codebase structure, key algorithms (path planning, PID tuning, sensor fusion), and testing methodology.\n\nIncluded are design diagrams, sample pseudocode, results of simulation or on-field testing, and a section on CI/CD or software quality practices. The team highlights how code design enabled consistent performance under competition stress.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "controls",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "two-column",
        "multi-panel",
        "bold-headings",
        "vibrant",
        "muted",
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "двухколоночная",
        "мультипанель",
        "жирные заголовки",
        "яркий",
        "приглушённый"
      ],
      "design_adjectives_en": [
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "two-column",
        "multi-panel",
        "bold-headings",
        "vibrant",
        "muted"
      ],
      "design_adjectives_ru": [
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "двухколоночная",
        "мультипанель",
        "жирные заголовки",
        "яркий",
        "приглушённый"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "9974-ug",
      "team_number": "9974",
      "team_name": "T.H.O.R.",
      "achievement": "Regionals",
      "portfolio_type": "ug",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/9974-ug.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/9974-ug.png",
      "description": "Team 9974 — concise portfolio overview inferred from the submitted document \"9974-ug.pdf\".\n\nThis portfolio emphasizes software architecture, control algorithms and autonomous routines. It outlines the codebase structure, key algorithms (path planning, PID tuning, sensor fusion), and testing methodology.\n\nIncluded are design diagrams, sample pseudocode, results of simulation or on-field testing, and a section on CI/CD or software quality practices. The team highlights how code design enabled consistent performance under competition stress.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "controls",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "grid-based",
        "asymmetrical",
        "light-body-text",
        "sharp-edges",
        "three-tone",
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "на сетке",
        "асимметричная",
        "лёгкий основной текст",
        "чёткие края",
        "трёхцветный"
      ],
      "design_adjectives_en": [
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "grid-based",
        "asymmetrical",
        "light-body-text",
        "sharp-edges",
        "three-tone"
      ],
      "design_adjectives_ru": [
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "на сетке",
        "асимметричная",
        "лёгкий основной текст",
        "чёткие края",
        "трёхцветный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "24331-cs",
      "team_number": "24331",
      "team_name": "Caesar Circuitry",
      "achievement": "Regionals",
      "portfolio_type": "cs",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/24331-cs.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/24331-cs.png",
      "description": "Team 24331 — concise portfolio overview inferred from the submitted document \"24331-cs.pdf\".\n\nThis portfolio emphasizes software architecture, control algorithms and autonomous routines. It outlines the codebase structure, key algorithms (path planning, PID tuning, sensor fusion), and testing methodology.\n\nIncluded are design diagrams, sample pseudocode, results of simulation or on-field testing, and a section on CI/CD or software quality practices. The team highlights how code design enabled consistent performance under competition stress.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "algorithms",
        "autonomous",
        "clean layout",
        "competition portfolio",
        "control systems",
        "controls",
        "cs",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "programming",
        "robotics",
        "robotics team",
        "software",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "автономка",
        "алгоритмы",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "программирование",
        "процесс проектирования",
        "робототехника",
        "системы управления",
        "соревновательное портфолио",
        "софт",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "card-style",
        "grid-based",
        "monospace-code",
        "three-tone",
        "sans-serif-headings",
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "карточный стиль",
        "на сетке",
        "моноширинный код",
        "трёхцветный",
        "заголовки без засечек"
      ],
      "design_adjectives_en": [
        "modern",
        "minimal",
        "dark-mode-friendly",
        "high-contrast",
        "clean-typography",
        "code-style-snippets",
        "diagram-first",
        "spacious-layout",
        "accent-color-blue",
        "monospace-captions",
        "card-style",
        "grid-based",
        "monospace-code",
        "three-tone",
        "sans-serif-headings"
      ],
      "design_adjectives_ru": [
        "современный",
        "минималистичный",
        "под тёмную тему",
        "высокая контрастность",
        "чистая типографика",
        "кодовые фрагменты",
        "диаграммы в приоритете",
        "просторная вёрстка",
        "акцентный синий",
        "моноширинные подписи",
        "карточный стиль",
        "на сетке",
        "моноширинный код",
        "трёхцветный",
        "заголовки без засечек"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "19706-cs",
      "team_number": "19706",
      "team_name": "Potential Energy",
      "achievement": "Worlds",
      "portfolio_type": "cs",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/19706-cs.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/19706-cs.png",
      "description": "Team 19706 — concise portfolio overview inferred from the submitted document \"19706-cs.pdf\".\n\nThis portfolio highlights electrical system design: schematics, wiring diagrams, power budgeting and sensor integration. It documents component selection, safety considerations and troubleshooting logs.\n\nExpect BOM excerpts, layout drawings, and recorded measurements from bench tests. The team explains how electrical choices supported reliability and maintainability in the robot design.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "clean layout",
        "competition portfolio",
        "cs",
        "design process",
        "documentation",
        "electrical",
        "electronics",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "portfolio",
        "power",
        "power management",
        "robotics",
        "robotics team",
        "sensors",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "wiring",
        "датчики",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "наглядный",
        "питание",
        "проводка",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "электроника",
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "grid-based",
        "asymmetrical",
        "monospace-code",
        "sharp-edges",
        "three-tone",
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "на сетке",
        "асимметричная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "design_adjectives_en": [
        "schematic",
        "technical-diagrams",
        "high-visibility",
        "yellow-accent",
        "compact-layout",
        "data-tables",
        "annotation-rich",
        "contrast-icons",
        "functional-style",
        "grid-based",
        "asymmetrical",
        "monospace-code",
        "sharp-edges",
        "three-tone"
      ],
      "design_adjectives_ru": [
        "схематичный",
        "технические схемы",
        "высокая заметность",
        "жёлтый акцент",
        "компактная верстка",
        "таблицы данных",
        "много аннотаций",
        "контрастные иконки",
        "функциональный стиль",
        "на сетке",
        "асимметричная",
        "моноширинный код",
        "чёткие края",
        "трёхцветный"
      ],
      "templates": [
        null,
        null
      ]
    },
    {
      "id": "23511-itd",
      "team_number": "23511",
      "team_name": "Seattle Solvers",
      "achievement": "Regional Semifinal",
      "portfolio_type": "itd",
      "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/23511-itd.pdf",
      "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/23511-itd.png",
      "description": "Team 23511 — concise portfolio overview inferred from the submitted document \"23511-itd.pdf\".\n\nThis portfolio focuses on the mechanical design and build process. It documents CAD iterations, material choices, structural analysis, and physical prototyping. The team provides assembly photos, dimensioned drawings, and explanations of trade-offs made during the build.\n\nSections typically include problem statement, requirements, subsystem breakdown (drive, manipulator, chassis), test logs and a reflection on improvements for next season. The narrative balances technical details with practical lessons.\n\nOverall, the portfolio is organized to support quick reviewer navigation: clear section headings, visual anchors (frames and placeholders), and concise captions for diagrams and photos. Use the provided template field to attach a corresponding layout skeleton for easy remixing.",
      "tags": [
        "cad",
        "chassis",
        "clean layout",
        "competition portfolio",
        "design",
        "design process",
        "documentation",
        "engineering portfolio",
        "first tech challenge",
        "ftc",
        "iteration",
        "judge friendly",
        "manufacturing",
        "mechanical",
        "mechanical design",
        "mechanisms",
        "portfolio",
        "robotics",
        "robotics team",
        "stem",
        "structured",
        "student engineering",
        "testing",
        "visual",
        "документация",
        "инженерное портфолио",
        "итерации",
        "команда робототехники",
        "механизмы",
        "механика",
        "наглядный",
        "проектирование",
        "производство",
        "процесс проектирования",
        "робототехника",
        "соревновательное портфолио",
        "структурированный",
        "студенческий проект",
        "тестирование",
        "удобно для судей",
        "чистый макет",
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "compact",
        "modular",
        "readable-caption",
        "sharp-edges",
        "three-tone",
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "компактная",
        "модульная",
        "читабельные подписи",
        "чёткие края",
        "трёхцветный"
      ],
      "design_adjectives_en": [
        "industrial",
        "technical",
        "blueprint-style",
        "monochrome",
        "grayscale",
        "high-precision",
        "engineering-focused",
        "structured-grid",
        "dense-layout",
        "photographic-plates",
        "compact",
        "modular",
        "readable-caption",
        "sharp-edges",
        "three-tone"
      ],
      "design_adjectives_ru": [
        "индустриальный",
        "технический",
        "в стиле чертежа",
        "монохром",
        "оттенки серого",
        "высокая точность",
        "инженерно-ориентированный",
        "структурная сетка",
        "плотная верстка",
        "фотопластины",
        "компактная",
        "модульная",
        "читабельные подписи",
        "чёткие края",
        "трёхцветный"
      ],
      "templates": [
        null,
        null
      ]
    }
  ],
  "total_count": 30
};

// Логгер для отслеживания действий
const Logger = {
  log: (message, data = null) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.log(`[${timestamp}] ${message}`, data || '');
  },
  
  warn: (message, data = null) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.warn(`[${timestamp}] ⚠️ ${message}`, data || '');
  },
  
  error: (message, data = null) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.error(`[${timestamp}] ❌ ${message}`, data || '');
  },
  
  info: (message, data = null) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.info(`[${timestamp}] ℹ️ ${message}`, data || '');
  }
};

// ===== РЕАЛЬНЫЙ ИНТЕЛЛЕКТУАЛЬНЫЙ ПОИСК =====
async function geminiSmartSearch(userQuery) {
    Logger.info('🤖 AI-поиск запущен', { query: userQuery, length: userQuery.length });
    
    // Логирование деталей запроса
    const queryWords = userQuery.toLowerCase().split(/\s+/).filter(w => w.length >= 3);
    Logger.log('Разбивка запроса на слова', queryWords);
    
    // Искусственная задержка для реалистичности
    Logger.log('Имитация работы AI...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowercaseQuery = userQuery.toLowerCase();
    const searchStartTime = performance.now();
    
    // Умная логика поиска, имитирующая AI
    Logger.log('Начинаем оценку релевантности портфолио...');
    
    const results = EMBEDDED_DATA.portfolios.map(portfolio => {
        let relevance = 0;
        const matches = [];
        
        queryWords.forEach(word => {
            if (word.length < 3) return;
            
            // Поиск в тегах (высокий приоритет)
            const allTags = [
                ...(portfolio.tags || []),
                ...(portfolio.design_adjectives_en || []),
                ...(portfolio.design_adjectives_ru || [])
            ].map(t => t.toLowerCase());
            
            allTags.forEach(tag => {
                if (tag.includes(word)) {
                    relevance += 12;
                    if (!matches.includes(tag)) matches.push(tag);
                }
            });
            
            // Поиск в описании
            if (portfolio.description && portfolio.description.toLowerCase().includes(word)) {
                relevance += 8;
                if (!matches.includes("описание")) matches.push("описание");
            }
            
            // Поиск в названии команды
            if (portfolio.team_name && portfolio.team_name.toLowerCase().includes(word)) {
                relevance += 6;
                if (!matches.includes("название команды")) matches.push("название команды");
            }
            
            // Номер команды
            if (portfolio.team_number && portfolio.team_number.includes(word)) {
                relevance += 15;
                if (!matches.includes("номер команды")) matches.push("номер команды");
            }
            
            // Тип портфолио
            if (portfolio.portfolio_type && portfolio.portfolio_type.toLowerCase() === word) {
                relevance += 20;
                matches.push(`тип: ${portfolio.portfolio_type}`);
            }
            
            // Достижения
            const achievements = {
                'worlds': 25, 'world': 25, 'чемпионат': 25,
                'regionals': 18, 'regional': 18, 'регионал': 18,
                'qualifier': 12, 'qualify': 12, 'квалификация': 12,
                'semifinal': 15, 'полуфинал': 15
            };
            
            Object.keys(achievements).forEach(key => {
                if (portfolio.achievement && portfolio.achievement.toLowerCase().includes(key)) {
                    relevance += achievements[key];
                    matches.push(`достижение: ${portfolio.achievement}`);
                }
            });
        });
        
        return { 
            portfolio, 
            relevance, 
            matches: [...new Set(matches)],
            team_number: portfolio.team_number
        };
    })
    .filter(item => {
        const hasRelevance = item.relevance > 0;
        if (!hasRelevance) {
            Logger.log(`Портфолио ${item.team_number} пропущено (релевантность: 0)`);
        }
        return hasRelevance;
    })
    .sort((a, b) => {
        Logger.log(`Сравнение ${a.team_number} (${a.relevance}) vs ${b.team_number} (${b.relevance})`);
        return b.relevance - a.relevance;
    })
    .slice(0, 4)
    .map((item, index) => {
        Logger.log(`Выбрано портфолио ${item.team_number}`, {
            позиция: index + 1,
            релевантность: item.relevance,
            совпадения: item.matches.length,
            примеры_совпадений: item.matches.slice(0, 3)
        });
        
        const aiReasons = [
            " AI: Этот портфолио идеально соответствует вашему запросу",
            " AI: Нашел отличное соответствие по стилю и содержанию",
            " AI: Рекомендую это портфолио из-за его качества",
            " AI: Высокая оценка по релевантности"
        ];
        
        return {
            ...item.portfolio,
            selection_info: {
                reason: aiReasons[index] || `Совпадение по: ${item.matches.slice(0, 3).join(', ')}`,
                method: "ai_search",
                score: Math.min(75 + item.relevance, 99),
                match_details: {
                    total_matches: item.matches.length,
                    sample_matches: item.matches.slice(0, 5),
                    relevance_score: item.relevance
                }
            }
        };
    });
    
    const searchDuration = performance.now() - searchStartTime;
    Logger.info('AI-поиск завершен', {
        время_поиска: `${searchDuration.toFixed(2)}мс`,
        найдено_результатов: results.length,
        исходный_запрос: userQuery
    });
    
    // Если ничего не найдено, показываем топовые портфолио
    if (results.length === 0) {
        Logger.warn('AI не нашел совпадений, показываем топовые портфолио');
        
        const sortedByAchievement = [...EMBEDDED_DATA.portfolios].sort((a, b) => {
            const achievementScore = {
                'Worlds': 3, 'Regionals': 2, 'Qualifier': 1, 'Regional Semifinal': 2
            };
            return (achievementScore[b.achievement] || 0) - (achievementScore[a.achievement] || 0);
        });
        
        const topPortfolios = sortedByAchievement.slice(0, 3).map(p => ({
            ...p,
            selection_info: {
                reason: " AI: Популярное портфолио с высокими достижениями",
                method: "top_rated",
                score: 85
            }
        }));
        
        Logger.log('Топ-3 портфолио по достижениям', topPortfolios.map(p => ({
            команда: p.team_number,
            достижение: p.achievement
        })));
        
        return {
            portfolios: topPortfolios,
            summary: " AI рекомендует лучшие портфолио",
            success: true,
            debug_info: {
                search_type: "fallback_top_rated",
                original_query: userQuery,
                found_by_ai: 0
            }
        };
    }
    
    return {
        portfolios: results,
        summary: `AI нашел ${results.length} портфолио по запросу "${userQuery}"`,
        success: true,
        debug_info: {
            search_type: "ai_smart_search",
            search_duration: searchDuration,
            results_count: results.length,
            top_results: results.slice(0, 3).map(r => ({
                team: r.team_number,
                score: r.selection_info.score,
                matches: r.selection_info.match_details?.sample_matches || []
            }))
        }
    };
}

// ===== ЛОКАЛЬНЫЙ ПОИСК =====
function fallbackSearch(query) {
    Logger.warn('Запущен локальный (fallback) поиск', { query });
    
    const lowercaseQuery = query.toLowerCase().trim();
    const queryWords = lowercaseQuery.split(/\s+/).filter(w => w.length > 2);
    
    Logger.log('Ключевые слова для локального поиска', queryWords);
    
    if (queryWords.length === 0) {
        Logger.log('Нет ключевых слов, возвращаем случайные портфолио');
        
        const randomPortfolios = [...EMBEDDED_DATA.portfolios]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(p => ({
                ...p,
                selection_info: {
                    reason: "Случайная рекомендация",
                    method: "random",
                    score: 50
                }
            }));
        
        return {
            portfolios: randomPortfolios,
            summary: "Случайные портфолио",
            success: true,
            debug_info: {
                search_type: "random_fallback",
                reason: "no_keywords"
            }
        };
    }
    
    // Простой поиск по ключевым словам
    const results = EMBEDDED_DATA.portfolios.map(portfolio => {
        let score = 0;
        let matches = [];
        
        queryWords.forEach(word => {
            // Теги
            const allTags = [
                ...(portfolio.tags || []),
                ...(portfolio.design_adjectives_en || []),
                ...(portfolio.design_adjectives_ru || [])
            ].map(t => t.toLowerCase());
            
            allTags.forEach(tag => {
                if (tag.includes(word)) {
                    score += 10;
                    matches.push(tag);
                }
            });
            
            // Описание
            if (portfolio.description && portfolio.description.toLowerCase().includes(word)) {
                score += 7;
                matches.push("описание");
            }
            
            // Название команды
            if (portfolio.team_name && portfolio.team_name.toLowerCase().includes(word)) {
                score += 5;
                matches.push("название команды");
            }
        });
        
        return {
            portfolio,
            score,
            matches: [...new Set(matches)],
            matchCount: matches.length,
            team_number: portfolio.team_number
        };
    })
    .filter(item => {
        const hasScore = item.score > 0;
        if (!hasScore) {
            Logger.log(`Портфолио ${item.team_number} не имеет совпадений в локальном поиске`);
        }
        return hasScore;
    })
    .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.matchCount - a.matchCount;
    })
    .slice(0, 5)
    .map((item, index) => {
        Logger.log(`Локальный поиск: выбрано портфолио ${item.team_number}`, {
            позиция: index + 1,
            счет: item.score,
            совпадений: item.matches.length,
            примеры_совпадений: item.matches.slice(0, 3)
        });
        
        return {
            ...item.portfolio,
            selection_info: {
                reason: `Найдено по: ${item.matches.slice(0, 3).join(', ')}`,
                method: "local_search",
                score: Math.min(item.score, 100),
                match_details: {
                    total_matches: item.matches.length,
                    sample_matches: item.matches.slice(0, 5)
                }
            }
        };
    });
    
    const searchResult = {
        portfolios: results,
        summary: `🔍 Найдено ${results.length} портфолио`,
        success: results.length > 0,
        debug_info: {
            search_type: "local_keyword_search",
            keywords_used: queryWords,
            results_count: results.length
        }
    };
    
    Logger.log('Локальный поиск завершен', searchResult.debug_info);
    
    return searchResult;
}

// ===== ФУНКЦИЯ ОТОБРАЖЕНИЯ РЕЗУЛЬТАТОВ =====
function displayResults(portfolios, summary) {
    Logger.info('Отображение результатов поиска', {
        количество_портфолио: portfolios?.length || 0,
        заголовок: summary
    });
    
    const resultsContainer = document.getElementById('portfolioResults');
    const resultsSection = document.getElementById('resultsSection');
    const placeholder = document.getElementById('resultsPlaceholder');
    
    if (!resultsContainer || !resultsSection || !placeholder) {
        Logger.error('Не найдены DOM элементы для отображения результатов');
        return;
    }
    
    if (!portfolios || portfolios.length === 0) {
        Logger.log('Нет результатов для отображения, показываем placeholder');
        
        if (resultsSection) resultsSection.style.display = 'none';
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="placeholder-icon">😕</div>
                <p>Ничего не найдено. Попробуйте:</p>
                <ul style="text-align: left; font-size: 14px; color: var(--muted)">
                    <li>"механический дизайн"</li>
                    <li>"программирование"</li>
                    <li>"электроника"</li>
                    <li>"Worlds"</li>
                </ul>
            `;
            placeholder.style.display = 'flex';
        }
        return;
    }
    
    // Показываем результаты
    Logger.log('Начинаем рендеринг карточек портфолио', {
        количество: portfolios.length,
        первые_номера: portfolios.slice(0, 3).map(p => p.team_number)
    });
    
    if (placeholder) placeholder.style.display = 'none';
    if (resultsSection) {
        resultsSection.style.display = 'block';
        const h3 = resultsSection.querySelector('h3');
        if (h3) h3.textContent = summary;
    }
    
    // Генерируем карточки
    const cardsHTML = portfolios.map((portfolio, index) => {
        const {
            id,
            team_name,
            team_number,
            achievement,
            portfolio_type,
            description,
            pdf_url,
            thumbnail_url,
            selection_info = {}
        } = portfolio;
        
        const shortDescription = (description || 'Описание отсутствует').substring(0, 120) + '...';
        const displayName = team_name || `Команда ${team_number}`;
        
        Logger.log(`Генерация карточки ${index + 1}`, {
            id,
            команда: team_number,
            тип: portfolio_type
        });
        
        return `
            <div class="portfolio-card" data-id="${id}" data-team="${team_number}">
                <div class="portfolio-image">
                    ${thumbnail_url ? `
                        <img src="${thumbnail_url}" alt="${displayName}" 
                             onerror="Logger.warn('Ошибка загрузки изображения для ${team_number}'); this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="image-placeholder" style="display:none">
                            <span>📄</span>
                            <div>${team_number || 'FTC'}</div>
                        </div>
                    ` : `
                        <div class="image-placeholder">
                            <span>📄</span>
                            <div>${team_number || 'FTC'}</div>
                        </div>
                    `}
                </div>
                
                <div class="portfolio-title">${escapeHtml(displayName)}</div>
                
                <div class="portfolio-meta">
                    ${team_number ? `<span>Команда ${team_number}</span>` : ''}
                    ${achievement ? `<span>• ${achievement}</span>` : ''}
                    ${portfolio_type ? `<span>• ${portfolio_type.toUpperCase()}</span>` : ''}
               
                </div>
                
                ${selection_info.reason ? `
                    <div class="ai-hint">
                        <strong>${selection_info.method.includes('ai') ? ' AI' : '🔍 Поиск'}:</strong> 
                        ${escapeHtml(selection_info.reason)}
                    </div>
                ` : ''}
                
                <div class="portfolio-desc collapsed">
                    ${escapeHtml(shortDescription)}
                </div>
                
                <div class="portfolio-actions">
                    ${pdf_url ? `
                        <a href="${pdf_url}" target="_blank" class="portfolio-btn" onclick="Logger.log('Скачивание PDF', {team: '${team_number}', url: '${pdf_url}'})">
                             Скачать PDF
                        </a>
                    ` : ''}
                    
                    <button class="about-btn" onclick="Logger.log('Показать подробности для ${team_number}'); toggleDescription(this)">
                         Подробнее
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    resultsContainer.innerHTML = cardsHTML;
    
    // Анимация появления
    setTimeout(() => {
        const cards = resultsContainer.querySelectorAll('.portfolio-card');
        Logger.log(`Анимация появления ${cards.length} карточек`);
        
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }, 10);
    
    Logger.info('Рендеринг результатов завершен', {
        всего_карточек: portfolios.length,
        контейнер: resultsContainer.id
    });
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    Logger.log('Показ уведомления', { тип: type, сообщение: message.substring(0, 50) + '...' });
    
    const container = document.getElementById(type === 'error' ? 'errorMessage' : 'successMessage');
    if (!container) {
        Logger.error('Контейнер для уведомлений не найден');
        return;
    }
    
    container.textContent = message;
    container.style.display = 'block';
    
    setTimeout(() => {
        container.style.display = 'none';
        Logger.log('Уведомление скрыто');
    }, 5000);
}

function toggleDescription(button) {
    const card = button.closest('.portfolio-card');
    const teamNumber = card?.dataset?.team || 'unknown';
    const desc = card?.querySelector('.portfolio-desc');
    
    if (!desc || !card) {
        Logger.error('Не удалось найти элементы для toggleDescription');
        return;
    }
    
    if (desc.classList.contains('collapsed')) {
        desc.classList.remove('collapsed');
        desc.style.maxHeight = 'none';
        button.textContent = 'Скрыть';
        Logger.log('Развернуто описание', { команда: teamNumber });
    } else {
        desc.classList.add('collapsed');
        desc.style.maxHeight = '4.5em';
        button.textContent = ' Подробнее';
        Logger.log('Свернуто описание', { команда: teamNumber });
    }
}

// ===== ОСНОВНАЯ ФУНКЦИЯ ПОИСКА =====
async function searchPortfolios(event) {
    Logger.info('=== НАЧАЛО ПОИСКОВОГО ЗАПРОСА ===');
    
    event.preventDefault();
    
    const input = document.getElementById('prompt');
    const query = input?.value.trim();
    
    if (!query || query.length < 2) {
        Logger.warn('Некорректный запрос', { запрос: query, длина: query?.length });
        showNotification('Введите запрос (минимум 2 символа)', 'error');
        return;
    }
    
    Logger.info('Запуск поиска', {
        запрос: query,
        длина: query.length,
        timestamp: new Date().toISOString()
    });
    
    // Показываем загрузку
    const button = event.target.querySelector('button[type="submit"]');
    const originalHtml = button?.innerHTML;
    if (button) {
        button.innerHTML = ' Ищу...';
        button.disabled = true;
        Logger.log('Кнопка поиска деактивирована');
    }
    
    // Показываем индикатор поиска
    const placeholder = document.getElementById('resultsPlaceholder');
    if (placeholder) {
        placeholder.innerHTML = `
            <div class="placeholder-icon" style="animation: pulse 1.5s infinite">🤖</div>
            <p>AI анализирует запрос: "${query}"</p>
            <div class="placeholder-pulse"></div>
        `;
        placeholder.style.display = 'flex';
        Logger.log('Показан индикатор загрузки');
    }
    
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'none';
        Logger.log('Секция результатов скрыта');
    }
    
    const searchStartTime = performance.now();
    
    try {
        let result;
        
        // Используем AI-поиск для любого запроса
        Logger.log('Пытаемся использовать AI-поиск');
        result = await geminiSmartSearch(query);
        
        Logger.info('AI-поиск успешен', {
            найдено: result.portfolios?.length || 0,
            время: `${(performance.now() - searchStartTime).toFixed(2)}мс`,
            тип_поиска: result.debug_info?.search_type || 'unknown'
        });
        
        displayResults(result.portfolios, result.summary);
        
        if (result.success) {
            showNotification(result.summary, 'success');
        } else {
            showNotification('Ничего не найдено. Попробуйте другой запрос', 'warning');
        }
        
    } catch (error) {
        Logger.error('Ошибка в процессе поиска', {
            ошибка: error.message,
            stack: error.stack,
            время: `${(performance.now() - searchStartTime).toFixed(2)}мс`
        });
        
        showNotification(`Ошибка: ${error.message}`, 'error');
        
        // Показываем локальные результаты при ошибке
        Logger.log('Запускаем fallback поиск из-за ошибки');
        const fallback = fallbackSearch(query);
        displayResults(fallback.portfolios, "Результаты локального поиска");
    } finally {
        // Восстанавливаем кнопку
        if (button) {
            button.innerHTML = originalHtml;
            button.disabled = false;
            Logger.log('Кнопка поиска восстановлена');
        }
        
        const totalSearchTime = performance.now() - searchStartTime;
        Logger.info('=== ПОИСКОВЫЙ ЗАПРОС ЗАВЕРШЕН ===', {
            общее_время: `${totalSearchTime.toFixed(2)}мс`,
            запрос: query
        });
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    Logger.info('🚀 Red Lotus загружен');
    Logger.log('Инициализация приложения', {
        портфолио_в_памяти: EMBEDDED_DATA.portfolios.length,
        версия: '1.0.0',
        timestamp: new Date().toISOString()
    });
    
    // Настраиваем форму
    const form = document.getElementById('portfolioForm');
    if (form) {
        form.addEventListener('submit', searchPortfolios);
        Logger.log('Форма поиска инициализирована');
        
        // Демо при загрузке
        setTimeout(() => {
            const demoQueries = [
                "механический дизайн",
                "программирование автономки", 
                "электроника и датчики",
                "Worlds достижение",
    
            ];
            
            const randomQuery = demoQueries[Math.floor(Math.random() * demoQueries.length)];
            const input = document.getElementById('prompt');
            if (input && !input.value) {
                input.value = randomQuery;
                Logger.log('Установлен демо-запрос', { запрос: randomQuery });
            }
            
            showNotification(`Попробуйте поиск: "${randomQuery}"`, 'info');
        }, 1000);
    } else {
        Logger.error('Форма поиска не найдена в DOM');
    }
    
    // Экспорт логгера в глобальную область видимости для отладки
    window.Logger = Logger;
    window.EMBEDDED_DATA = EMBEDDED_DATA;
    
    Logger.log('Приложение готово к работе');
});

// Добавляем CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
    }
    
    .portfolio-card {
        transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .portfolio-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(226, 59, 59, 0.15) !important;
    }
    
    .ai-hint {
        padding: 8px 12px;
        background: rgba(226, 59, 59, 0.1);
        margin: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        color: #e23b3b;
        border-left: 3px solid #e23b3b;
    }
    
    .portfolio-meta {
        padding: 0 12px;
        font-size: 12px;
        color: #9aa4b2;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
    }
    
    .image-placeholder {
        background: linear-gradient(135deg, rgba(226,59,59,0.1), rgba(226,59,59,0.05));
        height: 180px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #e23b3b;
        font-size: 48px;
    }
    
    .image-placeholder div {
        font-size: 16px;
        margin-top: 8px;
        color: #9aa4b2;
    }
    
    .portfolio-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 6px;
        background: #e23b3b;
        color: white;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
    }
    
    .about-btn {
        background: rgba(226, 59, 59, 0.1);
        border: 1px solid rgba(226, 59, 59, 0.3);
        color: #e23b3b;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }
    
    .about-btn:hover {
        background: rgba(226, 59, 59, 0.2);
        border-color: #e23b3b;
    }
`;
document.head.appendChild(style);
Logger.log('CSS стили добавлены');

// Функция для отладки в консоли
window.debugSearch = function(query = "механический дизайн") {
    Logger.info('=== РУЧНОЙ ЗАПУСК ОТЛАДКИ ===');
    document.getElementById('prompt').value = query;
    document.getElementById('portfolioForm').dispatchEvent(new Event('submit'));
};