#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Тестирование восстановленной гибридной версии портфолио генератора
"""

import sys
import os

# Проверяем что все модули импортируются правильно
def test_imports():
    """Тестируем импорты"""
    print("🧪 Проверка импортов...")
    try:
        from portfolio_generator import PortfolioGenerator
        print("✅ PortfolioGenerator импортирован")
    except Exception as e:
        print(f"❌ Ошибка PortfolioGenerator: {e}")
        return False
    
    try:
        from portfolio_visualizer import PortfolioDesignVisualizer
        print("✅ PortfolioDesignVisualizer импортирован")
    except Exception as e:
        print(f"❌ Ошибка PortfolioDesignVisualizer: {e}")
        return False
    
    try:
        from scraper import FTCPortfolioScraper
        print("✅ FTCPortfolioScraper импортирован")
    except Exception as e:
        print(f"❌ Ошибка FTCPortfolioScraper: {e}")
        return False
    
    return True

def test_generator():
    """Тестируем генератор"""
    print("\n🧪 Тестирование PortfolioGenerator...")
    try:
        from portfolio_generator import PortfolioGenerator
        
        gen = PortfolioGenerator(use_ftc_data=True)
        print(f"✅ Генератор инициализирован")
        
        # Тестируем поиск
        layouts = gen.generate_layouts("modern design", num_examples=2)
        print(f"✅ Найдено {len(layouts)} шаблонов")
        
        # Тестируем FTC портфолио
        all_portfolios = gen.get_all_ftc_portfolios(limit=5)
        print(f"✅ Загружено {len(all_portfolios)} FTC портфолио")
        
        return True
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False

def test_visualizer():
    """Тестируем визуализатор"""
    print("\n🧪 Тестирование PortfolioDesignVisualizer...")
    try:
        from portfolio_visualizer import PortfolioDesignVisualizer
        
        visualizer = PortfolioDesignVisualizer()
        print(f"✅ Визуализатор инициализирован")
        
        # Тестовый дизайн
        sample_design = {
            'name': 'Тестовый дизайн',
            'pattern': 'modern',
            'pattern_desc': 'Современный стиль',
            'colors': {'primary': '#667eea', 'secondary': '#764ba2', 'accent': '#f093fb'},
            'fonts': {'heading': 'Inter, sans-serif', 'body': 'Open Sans, sans-serif'},
            'pattern_confidence': 0.85,
            'success_probability': 0.78,
            'based_on_successful': 15,
            'design_attributes': {
                'card_style': 'outlined',
                'border_radius': '12px',
                'shadow': 'medium',
                'spacing': 'standard'
            }
        }
        
        # Тестируем HTML генерацию
        html = visualizer.generate_html_portfolio(sample_design)
        if html and len(html) > 100:
            print(f"✅ HTML сгенерирован ({len(html)} символов)")
        else:
            print(f"❌ HTML слишком короткий")
            return False
        
        # Тестируем PDF генерацию
        pdf_bytes = visualizer.generate_pdf_portfolio(sample_design)
        if pdf_bytes and len(pdf_bytes) > 1000:
            print(f"✅ PDF сгенерирован ({len(pdf_bytes)} байт)")
        else:
            print(f"❌ PDF слишком маленький или пуст")
            return False
        
        # Тестируем FTC методы
        ftc_data = {
            'team_name': 'Test Team',
            'team_number': '12345',
            'achievement': 'Test Achievement',
            'portfolio_type': 'engineering',
            'pdf_url': 'https://example.com/test.pdf'
        }
        
        ftc_pdf = visualizer.generate_pdf_from_ftc_portfolio(ftc_data)
        if ftc_pdf and len(ftc_pdf.getvalue()) > 500:
            print(f"✅ FTC PDF сгенерирован ({len(ftc_pdf.getvalue())} байт)")
        else:
            print(f"❌ FTC PDF слишком маленький")
            return False
        
        return True
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Главная функция тестирования"""
    print("=" * 60)
    print("🚀 ТЕСТИРОВАНИЕ ВОССТАНОВЛЕННОЙ ВЕРСИИ")
    print("=" * 60)
    
    # Переходим в директорию backend
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    if os.path.exists(backend_dir):
        os.chdir(backend_dir)
        sys.path.insert(0, backend_dir)  # Добавляем backend в path
        print(f"📁 Текущая директория: {os.getcwd()}")
        print(f"📦 sys.path обновлен")
    
    results = []
    
    # Тесты
    results.append(("Импорты", test_imports()))
    results.append(("PortfolioGenerator", test_generator()))
    results.append(("PortfolioDesignVisualizer", test_visualizer()))
    
    # Итоги
    print("\n" + "=" * 60)
    print("📊 ИТОГИ ТЕСТИРОВАНИЯ")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    print(f"\nРезультат: {passed}/{total} тестов пройдено")
    
    if passed == total:
        print("\n🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ! Версия готова к использованию.")
        return 0
    else:
        print(f"\n⚠️  {total - passed} тестов не пройдено")
        return 1

if __name__ == '__main__':
    sys.exit(main())
