#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Продвинутый скрэйпер для скачивания всех портфолио со страницы
Использует Selenium для парсинга JavaScript-rendered контента
"""

import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import os
import time
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AdvancedFTCPortfolioScraper:
    """Продвинутый скрэйпер для получения всех портфолио FTC"""
    
    def __init__(self):
        self.base_url = "https://portfolios.hivemindrobotics.net/ftc"
        self.cdn_url = "https://cdn.hivemindrobotics.net"
        self.portfolios = []
        
    def scrape_with_selenium(self) -> List[Dict]:
        """Скрэйпит сайт используя Selenium (для JavaScript контента)"""
        logger.info("Запуск Selenium для скрэйпинга...")
        
        options = webdriver.ChromeOptions()
        options.add_argument('--start-maximized')
        options.add_argument('--disable-notifications')
        
        try:
            driver = webdriver.Chrome(options=options)
            driver.get(self.base_url)
            
            # Ждём загрузки контента
            time.sleep(3)
            
            # Скролим вниз для загрузки всех элементов
            last_height = driver.execute_script("return document.body.scrollHeight")
            while True:
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)
                new_height = driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
            
            logger.info("Контент загружен, парсим...")
            
            # Ищем все ссылки на портфолио
            pdf_links = driver.find_elements(By.XPATH, "//a[contains(@href, '/portfolios/')]")
            logger.info(f"Найдено ссылок на PDF: {len(pdf_links)}")
            
            portfolios_dict = {}
            
            for link in pdf_links:
                try:
                    href = link.get_attribute('href')
                    if not href or '/portfolios/' not in href:
                        continue
                    
                    if not href.startswith('http'):
                        href = self.cdn_url + href
                    
                    # Парсим URL
                    filename = href.split('/portfolios/')[-1].replace('.pdf', '')
                    parts = filename.split('-')
                    
                    if len(parts) >= 2:
                        team_number = parts[0]
                        portfolio_type = '-'.join(parts[1:])
                        
                        # Ищем информацию рядом с ссылкой
                        parent = link.find_element(By.XPATH, "..")
                        
                        # Ищем текст с информацией о команде
                        try:
                            heading = parent.find_element(By.XPATH, ".//h1 | .//h2 | .//h3")
                            text = heading.text
                            if '•' in text:
                                parts_text = text.split('•')
                                team_name = parts_text[0].strip()
                                achievement = parts_text[1].strip() if len(parts_text) > 1 else "N/A"
                            else:
                                team_name = text
                                achievement = "N/A"
                        except:
                            team_name = "Unknown"
                            achievement = "N/A"
                        
                        key = f"{team_number}-{portfolio_type}"
                        if key not in portfolios_dict:
                            portfolios_dict[key] = {
                                'team_number': team_number,
                                'team_name': team_name,
                                'achievement': achievement,
                                'portfolio_type': portfolio_type,
                                'pdf_url': href,
                                'thumbnail_url': href.replace('/portfolios/', '/thumbnails/'),
                                'page_url': self.base_url
                            }
                except Exception as e:
                    logger.warning(f"Ошибка при парсинге элемента: {e}")
                    continue
            
            self.portfolios = list(portfolios_dict.values())
            driver.quit()
            
            return self.portfolios
            
        except Exception as e:
            logger.error(f"Ошибка Selenium: {e}")
            logger.info("Попытаюсь использовать fallback метод...")
            return self.scrape_fallback()
    
    def scrape_fallback(self) -> List[Dict]:
        """Альтернативный метод если Selenium не работает"""
        logger.info("Использую fallback метод (BeautifulSoup)...")
        
        try:
            response = requests.get(self.base_url, timeout=10)
            response.encoding = 'utf-8'
            
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')
            
            portfolios_dict = {}
            
            # Ищем все ссылки на PDF
            pdf_links = soup.find_all('a', {'href': lambda x: x and '/portfolios/' in x})
            logger.info(f"Найдено ссылок: {len(pdf_links)}")
            
            for link in pdf_links:
                try:
                    href = link.get('href', '')
                    if not href.startswith('http'):
                        href = self.cdn_url + href
                    
                    filename = href.split('/portfolios/')[-1].replace('.pdf', '')
                    parts = filename.split('-')
                    
                    if len(parts) >= 2:
                        team_number = parts[0]
                        portfolio_type = '-'.join(parts[1:])
                        
                        # Ищем информацию в родительском элементе
                        parent = link.parent
                        team_name = "Unknown"
                        achievement = "N/A"
                        
                        if parent:
                            text = parent.get_text(strip=True)
                            if '•' in text:
                                parts_text = text.split('•')
                                team_name = parts_text[0].strip()
                                achievement = parts_text[1].strip() if len(parts_text) > 1 else "N/A"
                        
                        key = f"{team_number}-{portfolio_type}"
                        if key not in portfolios_dict:
                            portfolios_dict[key] = {
                                'team_number': team_number,
                                'team_name': team_name,
                                'achievement': achievement,
                                'portfolio_type': portfolio_type,
                                'pdf_url': href,
                                'thumbnail_url': href.replace('/portfolios/', '/thumbnails/')
                            }
                except Exception as e:
                    logger.warning(f"Ошибка при парсинге: {e}")
                    continue
            
            self.portfolios = list(portfolios_dict.values())
            return self.portfolios
            
        except Exception as e:
            logger.error(f"Ошибка fallback: {e}")
            return []
    
    def download_portfolio_pdfs(self, output_dir: str = 'downloaded_portfolios') -> int:
        """Скачивает все портфолио PDF файлы"""
        os.makedirs(output_dir, exist_ok=True)
        
        downloaded = 0
        for i, portfolio in enumerate(self.portfolios, 1):
            try:
                url = portfolio['pdf_url']
                filename = f"Team_{portfolio['team_number']}_{portfolio['portfolio_type']}.pdf"
                filepath = os.path.join(output_dir, filename)
                
                # Пропускаем если уже скачано
                if os.path.exists(filepath):
                    logger.info(f"{i}/{len(self.portfolios)} ✓ {filename} (уже есть)")
                    downloaded += 1
                    continue
                
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    with open(filepath, 'wb') as f:
                        f.write(response.content)
                    logger.info(f"{i}/{len(self.portfolios)} ✓ {filename}")
                    downloaded += 1
                else:
                    logger.warning(f"{i}/{len(self.portfolios)} ✗ {filename} (статус {response.status_code})")
                
                time.sleep(0.5)  # Не перегружаем сервер
                
            except Exception as e:
                logger.error(f"Ошибка при скачивании {portfolio['team_number']}: {e}")
                continue
        
        return downloaded
    
    def save_metadata(self, filename: str = 'ftc_portfolios_full.json'):
        """Сохраняет метаданные всех портфолио"""
        output_path = os.path.join(os.path.dirname(__file__), 'data', filename)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump({
                'portfolios': self.portfolios,
                'total_count': len(self.portfolios),
                'timestamp': str(__import__('datetime').datetime.now())
            }, f, ensure_ascii=False, indent=2)
        
        logger.info(f"Метаданные сохранены: {output_path}")
        return output_path

if __name__ == '__main__':
    scraper = AdvancedFTCPortfolioScraper()
    
    print("=" * 60)
    print("🚀 ПРОДВИНУТЫЙ СКРЭЙПЕР ПОРТФОЛИО FTC")
    print("=" * 60)
    print()
    
    # 1. Скрэйпим сайт
    print("1️⃣  Скрэйпим сайт...")
    portfolios = scraper.scrape_with_selenium()
    print(f"✓ Найдено портфолио: {len(portfolios)}")
    
    if len(portfolios) > 0:
        print("\nПримеры портфолио:")
        for p in portfolios[:5]:
            print(f"  - Team {p['team_number']}: {p['team_name']} ({p['achievement']})")
        
        # 2. Сохраняем метаданные
        print("\n2️⃣  Сохраняем метаданные...")
        scraper.save_metadata()
        print("✓ Метаданные сохранены")
        
        # 3. Скачиваем PDF
        print("\n3️⃣  Скачиваем PDF портфолио...")
        print("(это может занять время, так как нужно скачать много файлов)")
        downloaded = scraper.download_portfolio_pdfs()
        print(f"✓ Скачано файлов: {downloaded}/{len(portfolios)}")
    
    print("\n" + "=" * 60)
    print(f"✅ ГОТОВО! Всего портфолио: {len(portfolios)}")
    print("=" * 60)
