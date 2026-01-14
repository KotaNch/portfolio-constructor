#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Главный скрипт для генерирования и запуска API шаблонов
"""

import os
import sys
import subprocess
import argparse

def install_requirements():
    """Установка зависимостей"""
    print("\n📦 Установка зависимостей...")
    try:
        subprocess.run(
            [sys.executable, '-m', 'pip', 'install', '-q', '-r', 'requirements.txt'],
            check=True
        )
        print("✓ Зависимости установлены\n")
        return True
    except Exception as e:
        print(f"❌ Ошибка при установке: {e}")
        return False

def generate_templates(count=100):
    """Генерирует шаблоны"""
    print(f"\n🎨 Генерирование {count} шаблонов PDF...")
    
    try:
        from generate_templates import PDFPortfolioGenerator
        
        generator = PDFPortfolioGenerator(output_dir='pdf_templates')
        generator.generate_batch(num_templates=count)
        
        print(f"✅ Генерирование завершено!\n")
        return True
    except Exception as e:
        print(f"❌ Ошибка при генерировании: {e}")
        return False

def test_search():
    """Тестирует поисковую систему"""
    print("\n🔍 Тестирование поисковой системы...\n")
    
    try:
        from search_engine import test_search
        test_search()
        return True
    except Exception as e:
        print(f"❌ Ошибка при тестировании: {e}")
        return False

def run_api():
    """Запускает API сервер"""
    print("\n🚀 Запуск API на порту 5001...")
    print("   Откройте: http://localhost:5001/api/info\n")
    
    try:
        from api import app
        app.run(debug=True, host='0.0.0.0', port=5001)
    except Exception as e:
        print(f"❌ Ошибка при запуске API: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Portfolio Templates Generator')
    parser.add_argument('--generate', type=int, default=0, help='Генерировать N шаблонов')
    parser.add_argument('--test', action='store_true', help='Тестировать поиск')
    parser.add_argument('--api', action='store_true', help='Запустить API')
    parser.add_argument('--full', action='store_true', help='Полный процесс (генерировать + тестировать + API)')
    
    args = parser.parse_args()
    
    print("\n" + "="*70)
    print("📚 PORTFOLIO TEMPLATES GENERATOR v1.0")
    print("="*70)
    
    # Установка зависимостей
    if not install_requirements():
        sys.exit(1)
    
    # Полный процесс
    if args.full:
        if not generate_templates(100):
            sys.exit(1)
        if not test_search():
            sys.exit(1)
        run_api()
    
    # Генерирование
    elif args.generate > 0:
        if not generate_templates(args.generate):
            sys.exit(1)
    
    # Тестирование
    elif args.test:
        if not test_search():
            sys.exit(1)
    
    # API
    elif args.api:
        run_api()
    
    # Справка
    else:
        print("\n📖 ИСПОЛЬЗОВАНИЕ:\n")
        print("  python main.py --full              # Полный процесс")
        print("  python main.py --generate 1000     # Генерировать 1000 шаблонов")
        print("  python main.py --test              # Тестировать поиск")
        print("  python main.py --api               # Запустить API\n")
        print("📚 API ДОКУМЕНТАЦИЯ:")
        print("  http://localhost:5001/api/info              - Информация")
        print("  http://localhost:5001/api/search            - Поиск по промту (POST)")
        print("  http://localhost:5001/api/random?count=5    - Случайные")
        print("  http://localhost:5001/api/download/<id>     - Скачать PDF\n")

if __name__ == '__main__':
    main()
