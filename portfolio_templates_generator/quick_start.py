#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Быстрый старт генератора шаблонов
"""

import os
import sys
import subprocess

def main():
    print("\n" + "="*60)
    print("📚 PORTFOLIO TEMPLATES GENERATOR")
    print("="*60)
    
    # Установка зависимостей
    print("\n[1/3] 📦 Установка зависимостей...")
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', '-r', 'requirements.txt'])
    print("✓ Готово")
    
    # Генерирование
    print("\n[2/3] 🎨 Генерирование 100 шаблонов...")
    from generate_templates import PDFPortfolioGenerator
    generator = PDFPortfolioGenerator(output_dir='pdf_templates')
    generator.generate_batch(num_templates=100)
    
    # API
    print("\n[3/3] 🚀 Запуск API на http://localhost:5001\n")
    from api import app
    
    print("="*60)
    print("✅ Система готова!")
    print("="*60)
    print("\n🔗 API Endpoints:")
    print("  POST /api/search - поиск по промту")
    print("  GET  /api/random - случайные шаблоны")
    print("  GET  /api/info - информация\n")
    
    app.run(debug=True, host='0.0.0.0', port=5001)

if __name__ == '__main__':
    main()
