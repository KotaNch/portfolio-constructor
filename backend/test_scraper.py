#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Тестирование скрэйпера портфолио"""

from scraper import FTCPortfolioScraper

print('🔍 Начинаем сканирование сайта...')
scraper = FTCPortfolioScraper()
print('⏳ Загружаем портфолио с https://portfolios.hivemindrobotics.net/ftc')

portfolios = scraper.get_detailed_info()
print(f'✓ Найдено портфолио: {len(portfolios)}')

if len(portfolios) > 0:
    print('\n📋 Первые 5 портфолио:')
    for i, p in enumerate(portfolios[:5], 1):
        team_num = p.get('team_number', 'N/A')
        team_name = p.get('team_name', 'N/A')
        achievement = p.get('achievement', 'N/A')
        print(f'{i}. Team {team_num}: {team_name} - {achievement}')
        
    # Сохраняем в JSON
    print('\n💾 Сохраняем в data/ftc_portfolios.json...')
    scraper.save_to_json('ftc_portfolios.json', detailed=True)
    print('✓ Готово!')
else:
    print('⚠️  Портфолио не найдены. Проверьте интернет соединение.')
