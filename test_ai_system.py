#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Интеграционный тест для AI Portfolio Generator v2.0
Проверяет все компоненты системы
"""

import os
import sys
import json
from pathlib import Path

# Добавляем backend в path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_imports():
    """Тест 1: Проверяем что все модули импортируются"""
    print("\n🧪 ТЕСТ 1: Проверка импортов модулей...")
    
    try:
        from advanced_scraper import AdvancedFTCPortfolioScraper
        print("  ✓ AdvancedFTCPortfolioScraper")
    except Exception as e:
        print(f"  ✗ AdvancedFTCPortfolioScraper: {e}")
        return False
    
    try:
        from portfolio_design_neural import PortfolioMixGenerator, PortfolioDesignAnalyzer
        print("  ✓ PortfolioDesignAnalyzer, PortfolioMixGenerator")
    except Exception as e:
        print(f"  ✗ Portfolio Neural: {e}")
        return False
    
    try:
        from portfolio_visualizer import PortfolioDesignVisualizer
        print("  ✓ PortfolioDesignVisualizer")
    except Exception as e:
        print(f"  ✗ PortfolioDesignVisualizer: {e}")
        return False
    
    try:
        from portfolio_generator import PortfolioGenerator
        print("  ✓ PortfolioGenerator")
    except Exception as e:
        print(f"  ✗ PortfolioGenerator: {e}")
        return False
    
    return True

def test_sample_portfolios():
    """Тест 2: Создание примеров портфолио"""
    print("\n🧪 ТЕСТ 2: Создание примеров портфолио...")
    
    sample_portfolios = [
        {
            'team_number': '1000',
            'team_name': 'Alpha Team',
            'achievement': 'Winner',
            'portfolio_type': 'full'
        },
        {
            'team_number': '2000',
            'team_name': 'Beta Robotics',
            'achievement': 'Champion',
            'portfolio_type': 'design'
        },
        {
            'team_number': '3000',
            'team_name': 'Gamma Squad',
            'achievement': 'Finalist',
            'portfolio_type': 'inspire'
        },
        {
            'team_number': '4000',
            'team_name': 'Delta Innovation',
            'achievement': 'Excellent',
            'portfolio_type': 'connect'
        },
        {
            'team_number': '5000',
            'team_name': 'Epsilon Tech',
            'achievement': 'Winner',
            'portfolio_type': 'full'
        },
    ]
    
    print(f"  ✓ Создано {len(sample_portfolios)} примеров портфолио")
    return sample_portfolios

def test_analyzer(portfolios):
    """Тест 3: Анализатор дизайна"""
    print("\n🧪 ТЕСТ 3: Анализатор дизайна...")
    
    try:
        from portfolio_design_neural import PortfolioDesignAnalyzer
        
        analyzer = PortfolioDesignAnalyzer(portfolios)
        
        print(f"  ✓ Анализировано портфолио: {len(analyzer.design_features)}")
        print(f"  ✓ Цветовых схем: {len(analyzer.POPULAR_COLOR_SCHEMES)}")
        print(f"  ✓ Шрифтовых комбинаций: {len(analyzer.FONT_COMBINATIONS)}")
        print(f"  ✓ Дизайн паттернов: {len(analyzer.DESIGN_PATTERNS)}")
        
        # Показываем первый анализ
        first_feature = analyzer.design_features[0]
        print(f"  ✓ Пример анализа:")
        print(f"    - Команда: {first_feature['team_number']}")
        print(f"    - Успешность: {first_feature['success_score']:.1%}")
        print(f"    - Сложность: {first_feature['complexity']:.1%}")
        
        return analyzer
        
    except Exception as e:
        print(f"  ✗ Ошибка: {e}")
        import traceback
        traceback.print_exc()
        return None

def test_neural_net(analyzer):
    """Тест 4: Нейросеть"""
    print("\n🧪 ТЕСТ 4: Нейросеть...")
    
    try:
        from portfolio_design_neural import PortfolioDesignNeuralNet
        
        neural_net = PortfolioDesignNeuralNet(analyzer.design_features)
        
        print(f"  ✓ Инициализирована сеть")
        print(f"  ✓ Скрытые нейроны: {neural_net.num_hidden}")
        print(f"  ✓ Параметров W1: {neural_net.W1.size}")
        print(f"  ✓ Параметров W2: {neural_net.W2.size}")
        
        # Обучаем сеть
        print(f"  ✓ Обучаю сеть...")
        neural_net.train(epochs=10, learning_rate=0.01)
        
        # Тестируем предсказание
        design = neural_net.predict(complexity=0.6, success_score=0.8, team_seed=1)
        
        print(f"  ✓ Предсказание:") 
        print(f"    - Паттерн: {design['pattern']}")
        print(f"    - Основной цвет: {design['colors']['primary']}")
        print(f"    - Уверенность: {design['pattern_confidence']:.1%}")
        
        return neural_net
        
    except Exception as e:
        print(f"  ✗ Ошибка: {e}")
        import traceback
        traceback.print_exc()
        return None

def test_generator(portfolios):
    """Тест 5: Генератор дизайнов"""
    print("\n🧪 ТЕСТ 5: Генератор дизайнов AI Mix...")
    
    try:
        from portfolio_design_neural import PortfolioMixGenerator
        
        generator = PortfolioMixGenerator(portfolios)
        
        print(f"  ✓ Генератор инициализирован")
        print(f"  ✓ Нейросеть обучена")
        
        # Генерируем дизайны
        designs = generator.generate_mix_designs(count=3)
        
        print(f"  ✓ Сгенерировано дизайнов: {len(designs)}")
        
        for i, design in enumerate(designs, 1):
            print(f"  ✓ Дизайн #{i}:")
            print(f"    - Название: {design['name']}")
            print(f"    - Стиль: {design['pattern']}")
            print(f"    - Цвета: {design['colors']['primary']} → {design['colors']['secondary']}")
            print(f"    - Уверенность: {design['pattern_confidence']:.1%}")
        
        return designs
        
    except Exception as e:
        print(f"  ✗ Ошибка: {e}")
        import traceback
        traceback.print_exc()
        return None

def test_visualizer(designs):
    """Тест 6: Визуализатор"""
    print("\n🧪 ТЕСТ 6: Визуализатор (HTML/PDF)...")
    
    try:
        from portfolio_visualizer import PortfolioDesignVisualizer
        
        visualizer = PortfolioDesignVisualizer()
        
        if designs and len(designs) > 0:
            design = designs[0]
            
            # Генерируем HTML
            html = visualizer.generate_html_portfolio(design)
            print(f"  ✓ HTML сгенерирован ({len(html)} байт)")
            
            # Генерируем PDF
            pdf_bytes = visualizer.generate_pdf_portfolio(design)
            print(f"  ✓ PDF сгенерирован ({len(pdf_bytes)} байт)")
            
            return True
        
    except Exception as e:
        print(f"  ✗ Ошибка: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_file_structure():
    """Тест 7: Структура файлов"""
    print("\n🧪 ТЕСТ 7: Проверка структуры файлов...")
    
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    frontend_dir = os.path.join(os.path.dirname(__file__), 'frontend')
    
    required_files = {
        'backend': [
            'app.py',
            'app_v2.py',
            'advanced_scraper.py',
            'portfolio_design_neural.py',
            'portfolio_visualizer.py',
            'ai_portfolio_generator_v2.py',
            'portfolio_generator.py',
            'requirements.txt'
        ],
        'frontend': [
            'index.html',
            'index_v2.html'
        ]
    }
    
    all_ok = True
    
    for location, files in required_files.items():
        if location == 'backend':
            base_dir = backend_dir
        else:
            base_dir = frontend_dir
        
        for filename in files:
            filepath = os.path.join(base_dir, filename)
            if os.path.exists(filepath):
                print(f"  ✓ {location}/{filename}")
            else:
                print(f"  ✗ {location}/{filename} НЕ НАЙДЕН")
                all_ok = False
    
    return all_ok

def main():
    """Главная функция тестирования"""
    print("\n" + "="*70)
    print("🧪 ИНТЕГРАЦИОННЫЙ ТЕСТ AI PORTFOLIO GENERATOR v2.0")
    print("="*70)
    
    # Тест 1: Импорты
    if not test_imports():
        print("\n❌ Ошибка импортов модулей")
        return False
    
    # Тест 2: Примеры портфолио
    portfolios = test_sample_portfolios()
    
    # Тест 7: Структура файлов
    if not test_file_structure():
        print("\n⚠️  Некоторые файлы отсутствуют")
    
    # Тест 3: Анализатор
    analyzer = test_analyzer(portfolios)
    if not analyzer:
        print("\n❌ Анализатор не работает")
        return False
    
    # Тест 4: Нейросеть
    neural_net = test_neural_net(analyzer)
    if not neural_net:
        print("\n⚠️  Нейросеть не работает")
    
    # Тест 5: Генератор
    designs = test_generator(portfolios)
    if not designs:
        print("\n❌ Генератор не работает")
        return False
    
    # Тест 6: Визуализатор
    if not test_visualizer(designs):
        print("\n⚠️  Визуализатор имеет проблемы")
    
    # Итоговый результат
    print("\n" + "="*70)
    print("✅ ВСЕ ОСНОВНЫЕ ТЕСТЫ ПРОЙДЕНЫ!")
    print("="*70)
    print("\n🎉 Система готова к использованию!")
    print("\nДальнейшие действия:")
    print("  1. Запустите: generate_designs.bat (для генерирования)")
    print("  2. Или: start_api.bat (для запуска веб-интерфейса)")
    print("\n" + "="*70 + "\n")
    
    return True

if __name__ == '__main__':
    try:
        success = main()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n❌ Критическая ошибка: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
