#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Отладка скрэйпера"""

import requests
from bs4 import BeautifulSoup

url = "https://portfolios.hivemindrobotics.net/ftc"

print("Загружаем сайт...")
response = requests.get(url, timeout=10)
response.encoding = 'utf-8'
soup = BeautifulSoup(response.content, 'html.parser')

print(f"Статус ответа: {response.status_code}")
print(f"Размер контента: {len(response.content)} байт")

# Ищем ссылки на PDF
pdf_links = soup.find_all('a', {'href': lambda x: x and '/portfolios/' in x if x else False})
print(f"\nНайдено ссылок на PDF: {len(pdf_links)}")

if len(pdf_links) > 0:
    print("\nПервые 5 ссылок:")
    for link in pdf_links[:5]:
        href = link.get('href', '')
        text = link.get_text(strip=True)
        print(f"  - {href}")
        print(f"    Текст: {text}")

# Ищем заголовки
headers = soup.find_all(['h1', 'h2', 'h3'])
print(f"\nНайдено заголовков: {len(headers)}")

if len(headers) > 0:
    print("\nПервые 10 заголовков:")
    for h in headers[:10]:
        text = h.get_text(strip=True)
        if text and len(text) < 100:
            print(f"  - {text}")

# Ищем элементы с информацией о портфолио
divs = soup.find_all('div')
print(f"\nВсего div элементов: {len(divs)}")
