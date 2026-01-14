# 📊 Архитектура Portfolio Templates Generator

## Общая структура

```
┌─────────────────────────────────────────────────────────────┐
│                    ПОЛЬЗОВАТЕЛЬ                              │
│              (браузер/приложение)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
        ┌────────────────────────────┐
        │   ОСНОВНОЕ ПРИЛОЖЕНИЕ      │
        │  (backend/app.py)          │
        │                            │
        │  /api/templates/search    │
        │  /api/templates/download  │
        └────────────┬───────────────┘
                     │
                     ↓
     ┌───────────────────────────────────────┐
     │  TEMPLATES GENERATOR                  │
     │  (отдельный сервис)                   │
     └─────────────────────────────────────┬─┘
           │         │            │       │
           ↓         ↓            ↓       ↓
    ┌────────────┐ ┌──────────┐ ┌──────┐ ┌─────┐
    │ Генератор  │ │ Поиск    │ │ API  │ │ Конфиг
    │   PDF      │ │ TF-IDF   │ │Flask │ │
    └────────────┘ └──────────┘ └──────┘ └─────┘
           │
           ↓
    ┌──────────────────────────┐
    │   pdf_templates/         │
    │  ├── template_*.pdf      │ (1000+)
    │  ├── metadata/           │
    │  │   └── *.json          │ (1000+)
    │  └── index.json          │
    └──────────────────────────┘
```

## Поток данных для поиска

```
Пользователь
    │
    ↓ (вводит "синий минималистичный")
    │
Фронтенд (JavaScript)
    │
    ↓ POST /api/templates/search
    │
Backend (Flask)
    │
    ↓ 
TemplateSearchEngine
    │
    ├─ Загружает index.json
    │
    ├─ Превращает промт в TF-IDF вектор
    │
    ├─ Ищет косинусное сходство
    │
    ↓
ТОП-5 результатов
    │
    ↓ JSON с метаданными
    │
Пользователь видит результаты
    │
    ↓ (выбирает понравившийся)
    │
GET /api/download/template_00123
    │
    ↓
Скачивается template_00123.pdf
```

## Генерирование шаблонов

```
main.py --generate 1000
    │
    ↓
PDFPortfolioGenerator.generate_batch()
    │
    ├─ Для каждого шаблона (1 из 1000):
    │   │
    │   ├─ Выбрать случайные:
    │   │   ├─ layout_type (10 вариантов)
    │   │   ├─ color_scheme (10 вариантов)
    │   │   ├─ pages (10-15)
    │   │
    │   ├─ Создать PDF файл:
    │   │   ├─ Титульная страница
    │   │   ├─ О команде
    │   │   ├─ Проекты
    │   │   ├─ Контент
    │   │   └─ Достижения
    │   │
    │   └─ Сохранить метаданные:
    │       ├── template_XXXXX.json
    │       └── layout, colors, tags, description
    │
    ↓
Создано 1000 PDF + 1000 JSON
    │
    ↓
Построен index.json (индекс всех)
```

## Поисковый движок

```
TemplateSearchEngine инициализация:
    │
    ├─ Загрузить index.json
    │
    ├─ Для каждого шаблона создать текст:
    │   "modern_minimal синий минималистичный..."
    │
    ├─ Выполнить TF-IDF transform:
    │   Текст → Векторы (многомерные)
    │
    └─ Сохранить матрицу в памяти
       (используется для поиска)

При поиске:
    │
    ├─ Промт: "современный синий"
    │
    ├─ Преобразовать в TF-IDF вектор
    │
    ├─ Вычислить косинусное сходство
    │   со всеми 1000 векторами
    │
    ├─ Отсортировать по релевантности
    │
    └─ Вернуть топ-5
```

## API структура

```
API Server (Flask)
│
├─ /api/info
│  └─ Возвращает: total_templates, layout_types
│
├─ /api/search (POST)
│  ├─ Вход: {prompt, limit}
│  └─ Выход: список шаблонов с оценками
│
├─ /api/search-by-tags (POST)
│  ├─ Вход: {tags: [], limit}
│  └─ Выход: список по тегам
│
├─ /api/layout/<type> (GET)
│  └─ Выход: шаблоны определённого типа
│
├─ /api/random (GET)
│  └─ Выход: случайные шаблоны
│
├─ /api/download/<id> (GET)
│  └─ Возвращает: PDF файл
│
├─ /api/metadata/<id> (GET)
│  └─ Возвращает: JSON метаданные
│
└─ /api/health (GET)
   └─ Статус сервиса
```

## Метаданные каждого шаблона

```json
{
  "id": "template_00001",
  "filename": "template_00001.pdf",
  "layout_type": "modern_minimal",
  "colors": {
    "primary": "#1E88E5",      ← Основной цвет
    "secondary": "#FFF3E0",    ← Вторичный
    "accent": "#FF6F00"        ← Акцент
  },
  "pages": 12,
  "tags": [
    "modern_minimal",          ← Тип макета
    "синий",                   ← Цвет
    "минималистичный",         ← Стиль
    "профессиональный",        ← Стиль
    "портфолио",              ← Назначение
    "ftc"                      ← Назначение
  ],
  "description": "...",
  "relevance_score": 0.85      ← Добавляется при поиске
}
```

## Папки и файлы

```
portfolio_templates_generator/
│
├─ Исходные файлы:
│  ├─ main.py                    (главный скрипт)
│  ├─ generate_templates.py      (генератор)
│  ├─ search_engine.py          (поиск)
│  ├─ api.py                    (REST API)
│  ├─ config.py                 (конфигурация)
│  └─ requirements.txt           (зависимости)
│
├─ Документация:
│  ├─ README.md                  (техническая)
│  ├─ USAGE.md                   (пользовательская)
│  ├─ SETUP_COMPLETE.md          (установка)
│  └─ INTEGRATION_EXAMPLE.py     (примеры)
│
├─ Запуск:
│  ├─ quick_start.py             (быстрый старт)
│  └─ START.bat                  (для Windows)
│
└─ Выход:
   └─ pdf_templates/
      ├─ template_00001.pdf
      ├─ template_00002.pdf
      ├─ ... (1000+ файлов)
      │
      ├─ metadata/
      │  ├─ template_00001.json
      │  ├─ template_00002.json
      │  └─ ...
      │
      └─ index.json               (индекс всех)
```

## Интеграция с основным приложением

```
Main App (backend/)
│
├─ app.py
│  │
│  ├─ import TemplateSearchEngine
│  │
│  ├─ templates_engine = TemplateSearchEngine(...)
│  │
│  └─ @app.route('/api/templates/search')
│     └─ return templates_engine.search(prompt)
│
├─ requirements.txt (добавить зависимости)
│
└─ portfolio_templates_generator/
   (вся папка генератора)
```

## Производительность

```
Генерирование:
  100 шт   → 2-3 мин   (50-70 МБ)
  1000 шт  → 20-30 мин (500-700 МБ)
  10000 шт → 200+ мин  (5-7 ГБ)

Работа:
  Загрузка индекса → < 1 сек
  Поиск по промту  → < 100 мс
  Поиск по тегам   → < 50 мс
  Скачивание PDF   → зависит от сети
```

## Примеры использования

### Python
```python
from search_engine import TemplateSearchEngine

engine = TemplateSearchEngine()
results = engine.search('Синий минималистичный', limit=5)

for result in results:
    print(f"{result['filename']}: {result['relevance_score']:.0%}")
```

### HTTP API
```bash
curl -X POST http://localhost:5001/api/search \
  -H "Content-Type: application/json" \
  -d '{"prompt": "синий", "limit": 5}'
```

### JavaScript
```javascript
const res = await fetch('/api/templates/search', {
  method: 'POST',
  body: JSON.stringify({prompt: 'синий'})
});
const templates = await res.json();
```

---

**Версия:** 1.0.0  
**Архитектура:** Микросервис + основное приложение
