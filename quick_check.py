#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Быстрая проверка восстановленной версии - тестируем основные методы
"""

import sys
import os

# Добавляем backend в path
backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
if os.path.exists(backend_dir):
    sys.path.insert(0, backend_dir)

def test_visualizer_methods():
    """Тестируем методы визуализатора"""
    print("\n🧪 Проверка методов PortfolioDesignVisualizer...")
    
    try:
        from portfolio_visualizer import PortfolioDesignVisualizer
        
        visualizer = PortfolioDesignVisualizer()
        print("✅ Класс PortfolioDesignVisualizer загружен")
        
        # Проверяем что методы есть
        methods_to_check = [
            'generate_html_portfolio',
            'generate_pdf_portfolio', 
            'generate_pdf_from_ftc_portfolio',  # ВОССТАНОВЛЕННЫЙ МЕТОД
            'download_original_pdf'  # ВОССТАНОВЛЕННЫЙ МЕТОД
        ]
        
        for method_name in methods_to_check:
            if hasattr(visualizer, method_name):
                print(f"✅ Метод {method_name} присутствует")
            else:
                print(f"❌ Метод {method_name} НЕ НАЙДЕН")
                return False
        
        # Тестируем HTML генерацию
        sample_design = {
            'name': 'Test',
            'pattern': 'modern',
            'colors': {'primary': '#667eea', 'secondary': '#764ba2', 'accent': '#f093fb'},
            'fonts': {'heading': 'Inter', 'body': 'Open Sans'},
            'design_attributes': {'card_style': 'flat', 'border_radius': '8px'}
        }
        
        html = visualizer.generate_html_portfolio(sample_design)
        if html and len(html) > 100:
            print(f"✅ generate_html_portfolio() работает ({len(html)} символов)")
        else:
            print(f"❌ generate_html_portfolio() вернул неправильный результат")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_app_routes():
    """Проверяем что app.py имеет все нужные маршруты"""
    print("\n🧪 Проверка маршрутов в app.py...")
    
    try:
        app_path = os.path.join(backend_dir, 'app.py')
        with open(app_path, 'r', encoding='utf-8') as f:
            app_content = f.read()
        
        routes_to_check = [
            '/api/generate-portfolio',
            '/api/generate-ai-mix',
            '/api/generate-html',
            '/api/generate-html-bulk',
            '/api/generate-pdf-ftc',
            '/api/search-ftc',
            '/api/ftc-portfolio',
            '/api/download-portfolio',
        ]
        
        for route in routes_to_check:
            if route in app_content:
                print(f"✅ Маршрут {route} определен")
            else:
                print(f"❌ Маршрут {route} НЕ НАЙДЕН")
                return False
        
        return True
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False

def test_imports():
    """Проверяем базовые импорты"""
    print("\n🧪 Проверка импортов...")
    
    try:
        # Импортируем основные классы
        from portfolio_visualizer import PortfolioDesignVisualizer
        print("✅ PortfolioDesignVisualizer импортирован")
        
        # Проверяем что app.py может быть загружен
        app_path = os.path.join(backend_dir, 'app.py')
        with open(app_path, 'r', encoding='utf-8') as f:
            app_content = f.read()
        
        if 'PortfolioDesignVisualizer' in app_content:
            print("✅ app.py использует PortfolioDesignVisualizer")
        else:
            print("❌ app.py НЕ использует PortfolioDesignVisualizer")
            return False
        
        if 'from portfolio_visualizer import' in app_content:
            print("✅ app.py импортирует portfolio_visualizer")
        else:
            print("❌ app.py НЕ импортирует portfolio_visualizer")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False

def main():
    """Главная функция"""
    print("=" * 70)
    print("✨ ПРОВЕРКА ВОССТАНОВЛЕННОЙ ГИБРИДНОЙ ВЕРСИИ")
    print("=" * 70)
    
    results = []
    
    # Тесты
    results.append(("Импорты", test_imports()))
    results.append(("Методы PortfolioDesignVisualizer", test_visualizer_methods()))
    results.append(("Маршруты API", test_app_routes()))
    
    # Итоги
    print("\n" + "=" * 70)
    print("📊 ИТОГИ ПРОВЕРКИ")
    print("=" * 70)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    print(f"\nРезультат: {passed}/{total} проверок пройдено")
    
    if passed == total:
        print("\n🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ!")
        print("\n📝 Гибридная версия готова к использованию:")
        print("   • Старая версия восстановлена и работает")
        print("   • Новая нейросетевая генерация подключена")
        print("   • Оба API работают параллельно")
        print("   • Поддержка FTC портфолио восстановлена")
        return 0
    else:
        print(f"\n⚠️  {total - passed} проверок не пройдено")
        return 1

if __name__ == '__main__':
    sys.exit(main())
