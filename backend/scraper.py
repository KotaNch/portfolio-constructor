import requests
from bs4 import BeautifulSoup
import json
import os
from typing import List, Dict

class FTCPortfolioScraper:
    """Парсер портфолио команд FTC с официального сайта"""
    
    def __init__(self):
        self.base_url = "https://portfolios.hivemindrobotics.net/ftc"
        self.cdn_url = "https://cdn.hivemindrobotics.net"
        self.portfolios = []
    
    def scrape_portfolios(self) -> List[Dict]:
        """Собирает данные о портфолио с сайта"""
        try:
            response = requests.get(self.base_url, timeout=10)
            response.encoding = 'utf-8'
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Ищем все элементы портфолио
            portfolio_elements = soup.find_all('a', {'href': lambda x: x and '/portfolios/' in x})
            
            portfolios_dict = {}  # Используем dict для избежания дубликатов
            
            for elem in portfolio_elements:
                href = elem.get('href', '')
                if not href.startswith('http'):
                    href = self.cdn_url + href
                
                # Парсим команду, номер и тип портфолио из URL
                # Формат: /portfolios/10179-cs.pdf
                if '/portfolios/' in href and href.endswith('.pdf'):
                    try:
                        filename = href.split('/portfolios/')[-1]
                        parts = filename.replace('.pdf', '').split('-')
                        
                        if len(parts) >= 2:
                            team_number = parts[0]
                            portfolio_type = '-'.join(parts[1:])
                            
                            # Получаем метаинформацию из текста рядом с ссылкой
                            parent = elem.find_parent()
                            team_name = ""
                            achievement = ""
                            
                            # Ищем текст команды и достижения
                            text_elements = parent.get_text(strip=True) if parent else ""
                            
                            # Используем team_number как ключ для избежания дубликатов
                            key = f"{team_number}-{portfolio_type}"
                            
                            if key not in portfolios_dict:
                                portfolios_dict[key] = {
                                    'team_number': team_number,
                                    'portfolio_type': portfolio_type,
                                    'pdf_url': href,
                                    'thumbnail_url': href.replace('/portfolios/', '/thumbnails/'),
                                    'team_name': team_name,
                                    'achievement': achievement
                                }
                    except (ValueError, IndexError):
                        continue
            
            self.portfolios = list(portfolios_dict.values())
            print(f"Собрано {len(self.portfolios)} портфолио")
            return self.portfolios
            
        except Exception as e:
            print(f"Ошибка при парсинге: {e}")
            return []
    
    def get_detailed_info(self) -> List[Dict]:
        """Получает расширенную информацию о портфолио"""
        # Парсим основную информацию со страницы
        try:
            response = requests.get(self.base_url, timeout=10)
            response.encoding = 'utf-8'
            soup = BeautifulSoup(response.content, 'html.parser')
            
            detailed_portfolios = {}
            
            # Ищем каждое портфолио с информацией
            # Структура: team name -> achievement -> portfolio link
            
            # Находим все заголовки (они содержат информацию о команде)
            for h in soup.find_all(['h1', 'h2', 'h3']):
                text = h.get_text(strip=True)
                if text and '•' in text:
                    # Формат: "Team Name • Achievement/Level"
                    parts = text.split('•')
                    if len(parts) >= 2:
                        team_name = parts[0].strip()
                        achievement = parts[1].strip()
                        
                        # Ищем ссылку на PDF после этого заголовка
                        next_link = h.find_next('a', {'href': lambda x: x and '/portfolios/' in x})
                        if next_link and next_link.get('href'):
                            href = next_link.get('href')
                            if not href.startswith('http'):
                                href = self.cdn_url + href
                            
                            filename = href.split('/portfolios/')[-1].replace('.pdf', '')
                            parts_file = filename.split('-')
                            if len(parts_file) >= 2:
                                team_number = parts_file[0]
                                portfolio_type = '-'.join(parts_file[1:])
                                
                                key = f"{team_number}-{portfolio_type}"
                                if key not in detailed_portfolios:
                                    detailed_portfolios[key] = {
                                        'team_number': team_number,
                                        'team_name': team_name,
                                        'achievement': achievement,
                                        'portfolio_type': portfolio_type,
                                        'pdf_url': href,
                                        'thumbnail_url': href.replace('/portfolios/', '/thumbnails/')
                                    }
            
            return list(detailed_portfolios.values())
            
        except Exception as e:
            print(f"Ошибка при получении детальной информации: {e}")
            return []
    
    def save_to_json(self, filename: str = 'ftc_portfolios.json', detailed: bool = True):
        """Сохраняет собранные данные в JSON файл"""
        if detailed:
            data = self.get_detailed_info()
        else:
            data = self.portfolios
        
        output_path = os.path.join(os.path.dirname(__file__), 'data', filename)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump({
                'portfolios': data,
                'total_count': len(data)
            }, f, ensure_ascii=False, indent=2)
        
        print(f"Данные сохранены в {output_path}")
        return output_path

if __name__ == '__main__':
    scraper = FTCPortfolioScraper()
    print("Парсинг портфолио FTC...")
    scraper.scrape_portfolios()
    scraper.save_to_json('ftc_portfolios.json', detailed=True)
    print(f"Всего собрано: {len(scraper.portfolios)} портфолио")
