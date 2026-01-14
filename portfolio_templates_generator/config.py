"""
Конфигурация генератора шаблонов
"""

# Параметры генерирования
GENERATION_CONFIG = {
    'templates_dir': 'pdf_templates',
    'metadata_dir': 'pdf_templates/metadata',
    'index_file': 'pdf_templates/index.json',
    
    # Параметры PDF
    'page_size': 'A4',
    'pages_per_template': (10, 15),  # (min, max)
    'top_margin': 0.5,  # см
    'bottom_margin': 0.5,  # см
    'left_margin': 1.0,  # см
    'right_margin': 1.0,  # см
    
    # Количество вариантов
    'num_color_schemes': 10,
    'num_layout_types': 10,
    'num_templates': 1000,  # По умолчанию
}

# Типы макетов
LAYOUT_TYPES = [
    'modern_minimal',
    'corporate_bold',
    'creative_artistic',
    'tech_focused',
    'nature_inspired',
    'minimalist_clean',
    'dark_professional',
    'colorful_vibrant',
    'elegant_classic',
    'startup_modern',
]

# Цветовые схемы (RGB hex)
COLOR_SCHEMES = [
    {'primary': '#1E88E5', 'secondary': '#FFF3E0', 'accent': '#FF6F00'},
    {'primary': '#00796B', 'secondary': '#F1F8E9', 'accent': '#7B1FA2'},
    {'primary': '#C62828', 'secondary': '#F3E5F5', 'accent': '#FFB300'},
    {'primary': '#004D7A', 'secondary': '#EFF7FA', 'accent': '#FF6B6B'},
    {'primary': '#2E7D32', 'secondary': '#FCE4EC', 'accent': '#0277BD'},
    {'primary': '#5E35B1', 'secondary': '#E0F2F1', 'accent': '#F57C00'},
    {'primary': '#D32F2F', 'secondary': '#F1F8E9', 'accent': '#1976D2'},
    {'primary': '#0097A7', 'secondary': '#FFF8E1', 'accent': '#C62828'},
    {'primary': '#455A64', 'secondary': '#F3E5F5', 'accent': '#FFC400'},
    {'primary': '#6A1B9A', 'secondary': '#E8F5E9', 'accent': '#E53935'},
]

# Теги цветов
COLOR_TAGS = [
    'синий',
    'зелёный',
    'красный',
    'фиолетовый',
    'оранжевый',
    'серый',
    'чёрный',
    'белый',
    'жёлтый',
    'розовый',
]

# Теги стиля
STYLE_TAGS = [
    'современный',
    'минималистичный',
    'творческий',
    'профессиональный',
    'яркий',
    'элегантный',
    'простой',
    'детальный',
    'смелый',
    'нежный',
]

# Теги назначения
PURPOSE_TAGS = [
    'портфолио',
    'презентация',
    'каталог',
    'макет',
    'шаблон',
    'ftc',
    'резюме',
    'портфель',
    'проекты',
    'услуги',
]

# API конфигурация
API_CONFIG = {
    'host': '0.0.0.0',
    'port': 5001,
    'debug': True,
    'cors_enabled': True,
    'max_search_results': 100,
    'default_limit': 5,
}

# Поисковая система
SEARCH_CONFIG = {
    'vectorizer_type': 'tfidf',  # tfidf или word2vec
    'min_relevance_score': 0.0,  # Минимальный порог релевантности
    'use_cache': True,
    'cache_timeout': 3600,  # секунды
}

# Параметры безопасности
SECURITY_CONFIG = {
    'validate_paths': True,
    'max_file_size': 100 * 1024 * 1024,  # 100 МБ
    'allowed_extensions': ['pdf'],
}

# Логирование
LOGGING_CONFIG = {
    'level': 'INFO',
    'format': '[%(levelname)s] %(asctime)s - %(message)s',
    'file': 'logs/generator.log',
}
