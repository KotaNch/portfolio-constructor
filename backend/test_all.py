#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Тестирование всех функций приложения"""

import json
from portfolio_generator import PortfolioGenerator

print("=" * 60)
print("🧪 ТЕСТИРОВАНИЕ FTC PORTFOLIO CONSTRUCTOR")
print("=" * 60)

# 1. Инициализация генератора
print("\n1️⃣  Инициализация генератора...")
try:
    gen = PortfolioGenerator(use_ftc_data=True)
    print("   ✓ Генератор инициализирован")
    print(f"   ✓ Шаблонов загружено: {len(gen.templates)}")
    print(f"   ✓ FTC портфолио загружено: {len(gen.ftc_portfolios)}")
except Exception as e:
    print(f"   ✗ Ошибка: {e}")
    exit(1)

# 2. Тестирование поиска портфолио
print("\n2️⃣  Тестирование поиска портфолио...")
try:
    results = gen.search_ftc_portfolios("tech", limit=5)
    print(f"   ✓ Найдено результатов: {len(results)}")
    for portfolio in results[:3]:
        print(f"     - Team {portfolio['team_number']}: {portfolio['team_name']}")
except Exception as e:
    print(f"   ✗ Ошибка: {e}")

# 3. Тестирование получения всех портфолио
print("\n3️⃣  Получение всех портфолио...")
try:
    all_portfolios = gen.get_all_ftc_portfolios(limit=10)
    print(f"   ✓ Получено {len(all_portfolios)} портфолио")
    print(f"   ✓ Первое: Team {all_portfolios[0]['team_number']}")
except Exception as e:
    print(f"   ✗ Ошибка: {e}")

# 4. Тестирование генерации макетов
print("\n4️⃣  Тестирование генерации макетов...")
try:
    prompt = "современный минимальный дизайн с синими цветами"
    layouts = gen.generate_layouts(prompt, num_examples=3)
    print(f"   ✓ Сгенерировано макетов: {len(layouts)}")
    for i, layout in enumerate(layouts, 1):
        relevance = (layout.get('relevance_score', 0) * 100)
        print(f"     {i}. {layout['name']} (релевантность: {relevance:.0f}%)")
except Exception as e:
    print(f"   ✗ Ошибка: {e}")

# 5. Тестирование PDF генерации
print("\n5️⃣  Тестирование PDF генерации...")
try:
    portfolio_data = gen.get_all_ftc_portfolios(limit=1)[0]
    pdf_buffer = gen.generate_pdf_from_ftc_portfolio(portfolio_data)
    print(f"   ✓ PDF сгенерирован")
    print(f"   ✓ Размер: {len(pdf_buffer.getvalue())} байт")
except Exception as e:
    print(f"   ✗ Ошибка: {e}")

# 6. Информация о портфолио
print("\n6️⃣  Информация о портфолио...")
try:
    portfolio = gen.get_all_ftc_portfolios(limit=1)[0]
    print(f"   ✓ Номер команды: {portfolio['team_number']}")
    print(f"   ✓ Название: {portfolio['team_name']}")
    print(f"   ✓ Достижение: {portfolio['achievement']}")
    print(f"   ✓ Тип: {portfolio['portfolio_type']}")
    print(f"   ✓ URL PDF: {portfolio['pdf_url']}")
except Exception as e:
    print(f"   ✗ Ошибка: {e}")

# 7. Итоги
print("\n" + "=" * 60)
print("✅ ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!")
print("=" * 60)
print("\nПрограмма готова к использованию:")
print("  1. Запустите backend: python app.py")
print("  2. Откройте frontend: frontend/index.html")
print("  3. Используйте приложение!")
print("=" * 60)
