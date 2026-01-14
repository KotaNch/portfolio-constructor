#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Создание начальной базы данных FTC портфолио"""

import json
import os

# Пример данных FTC портфолио на основе информации с сайта
ftc_portfolios_data = [
    {"team_number": "10179", "team_name": "Tech Turtles", "achievement": "Qualifier", "portfolio_type": "cs", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10179-cs.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10179-cs.png"},
    {"team_number": "23396", "team_name": "Hivemind", "achievement": "Regionals", "portfolio_type": "cs", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/23396-cs.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/23396-cs.png"},
    {"team_number": "1002", "team_name": "Circuit Runners: Surge", "achievement": "Worlds", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/1002-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/1002-ff.png"},
    {"team_number": "1002", "team_name": "Circuit Runners: Surge", "achievement": "Worlds", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/1002-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/1002-pp.png"},
    {"team_number": "10183", "team_name": "Frog Robots of Germany", "achievement": "Regionals", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10183-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10183-pp.png"},
    {"team_number": "10355", "team_name": "Project Peacock", "achievement": "Regionals", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/10355-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/10355-ff.png"},
    {"team_number": "11468", "team_name": "Ohm Raiders", "achievement": "Regionals", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/11468-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/11468-pp.png"},
    {"team_number": "12051", "team_name": "Not Not Nerds", "achievement": "Qualifier", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/12051-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/12051-pp.png"},
    {"team_number": "12635", "team_name": "Kuriosity Robotics", "achievement": "Worlds", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/12635-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/12635-pp.png"},
    {"team_number": "14270", "team_name": "Quantum Robotics", "achievement": "Regionals", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/14270-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/14270-pp.png"},
    {"team_number": "16461", "team_name": "Infinite Turtles", "achievement": "Worlds", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/16461-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/16461-ff.png"},
    {"team_number": "18317", "team_name": "Steel Eels", "achievement": "Worlds", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/18317-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/18317-pp.png"},
    {"team_number": "20744", "team_name": "24KARAT", "achievement": "Regionals", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/20744-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/20744-pp.png"},
    {"team_number": "21579", "team_name": "Testing is Optional", "achievement": "Regionals", "portfolio_type": "cs", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/21579-cs.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/21579-cs.png"},
    {"team_number": "252", "team_name": "Electric Quahogs", "achievement": "Regionals", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/252-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/252-ff.png"},
    {"team_number": "4042", "team_name": "Nonstandard Deviation", "achievement": "Qualifier", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/4042-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/4042-ff.png"},
    {"team_number": "516", "team_name": "Gears of Fire", "achievement": "Regionals", "portfolio_type": "ug", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/516-ug.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/516-ug.png"},
    {"team_number": "6165", "team_name": "MSET CuttleFish", "achievement": "Worlds", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/6165-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/6165-ff.png"},
    {"team_number": "6323", "team_name": "The Pink Team", "achievement": "Regionals", "portfolio_type": "ug", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/6323-ug.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/6323-ug.png"},
    {"team_number": "701", "team_name": "The GONK Squad", "achievement": "Regionals", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/701-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/701-ff.png"},
    {"team_number": "7444", "team_name": "Sisters of the Motherboard", "achievement": "Regionals", "portfolio_type": "cs", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7444-cs.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7444-cs.png"},
    {"team_number": "7444", "team_name": "Sisters of the Motherboard", "achievement": "Regionals", "portfolio_type": "ug", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7444-ug.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7444-ug.png"},
    {"team_number": "7842", "team_name": "Browncoats", "achievement": "Worlds", "portfolio_type": "pp", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7842-pp.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7842-pp.png"},
    {"team_number": "7842", "team_name": "Browncoats", "achievement": "Regionals", "portfolio_type": "ug", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/7842-ug.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/7842-ug.png"},
    {"team_number": "8300", "team_name": "Pi Rho Eagles", "achievement": "Regionals", "portfolio_type": "ff", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/8300-ff.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/8300-ff.png"},
    {"team_number": "9527", "team_name": "Rogue Resistance", "achievement": "Qualifier", "portfolio_type": "ug", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/9527-ug.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/9527-ug.png"},
    {"team_number": "9974", "team_name": "T.H.O.R.", "achievement": "Regionals", "portfolio_type": "ug", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/9974-ug.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/9974-ug.png"},
    {"team_number": "24331", "team_name": "Caesar Circuitry", "achievement": "Regionals", "portfolio_type": "cs", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/24331-cs.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/24331-cs.png"},
    {"team_number": "19706", "team_name": "Potential Energy", "achievement": "Worlds", "portfolio_type": "cs", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/19706-cs.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/19706-cs.png"},
    {"team_number": "23511", "team_name": "Seattle Solvers", "achievement": "Regional Semifinal", "portfolio_type": "itd", "pdf_url": "https://cdn.hivemindrobotics.net/portfolios/23511-itd.pdf", "thumbnail_url": "https://cdn.hivemindrobotics.net/thumbnails/23511-itd.png"},
]

output_path = os.path.join(os.path.dirname(__file__), 'data', 'ftc_portfolios.json')
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump({
        'portfolios': ftc_portfolios_data,
        'total_count': len(ftc_portfolios_data),
        'note': 'Начальная база данных портфолио. Обновите через админ-панель.'
    }, f, ensure_ascii=False, indent=2)

print(f"✓ Создана начальная база данных: {output_path}")
print(f"✓ Загружено портфолио: {len(ftc_portfolios_data)}")
print("\nПримеры:")
for p in ftc_portfolios_data[:5]:
    print(f"  - Team {p['team_number']}: {p['team_name']} ({p['achievement']})")
