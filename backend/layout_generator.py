#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Генератор макетов портфолио
Создает HTML разметку с полями, квадратиками и стилистикой на основе найденных портфолио
БЕЗ текста и фотографий - только структура и дизайн
"""

import json
import random
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class PortfolioLayoutGenerator:
    """
    Генерирует HTML макеты портфолио на основе найденных примеров
    Создает только структуру: поля, квадратики, стилистика
    """
    
    # Типичные секции для FTC портфолио
    COMMON_SECTIONS = [
        "О команде",
        "Проекты",
        "Достижения",
        "Расписание",
        "Галерея",
        "Контакты",
        "Технические детали",
        "Процесс разработки",
        "Тестирование",
        "Рефлексия"
    ]
    
    # Цветовые схемы на основе дизайн-прилагательных
    COLOR_SCHEMES = {
        'industrial': {'primary': '#2c3e50', 'secondary': '#34495e', 'accent': '#e74c3c'},
        'technical': {'primary': '#3498db', 'secondary': '#2980b9', 'accent': '#f39c12'},
        'blueprint-style': {'primary': '#1a1a2e', 'secondary': '#16213e', 'accent': '#0f3460'},
        'monochrome': {'primary': '#2c2c2c', 'secondary': '#4a4a4a', 'accent': '#6c6c6c'},
        'grayscale': {'primary': '#333333', 'secondary': '#666666', 'accent': '#999999'},
        'minimal': {'primary': '#ffffff', 'secondary': '#f5f5f5', 'accent': '#000000'},
        'modern': {'primary': '#667eea', 'secondary': '#764ba2', 'accent': '#f093fb'},
        'clean': {'primary': '#ffffff', 'secondary': '#f8f9fa', 'accent': '#007bff'},
    }
    
    # Стили макетов
    LAYOUT_STYLES = {
        'grid': 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
        'columns': 'grid-template-columns: 1fr 1fr;',
        'rows': 'grid-template-columns: 1fr;',
        'asymmetrical': 'grid-template-columns: 2fr 1fr;',
        'masonry': 'grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));',
    }
    
    def __init__(self):
        """Инициализация генератора"""
        pass
    
    def _extract_design_attributes(self, portfolio: Dict) -> Dict:
        """
        Извлекает атрибуты дизайна из портфолио
        """
        design_adjs_en = portfolio.get('design_adjectives_en', [])
        design_adjs_ru = portfolio.get('design_adjectives_ru', [])
        tags = portfolio.get('tags', [])
        
        all_adjectives = design_adjs_en + design_adjs_ru + tags
        
        # Определяем цветовую схему
        color_scheme = self._determine_color_scheme(all_adjectives)
        
        # Определяем стиль макета
        layout_style = self._determine_layout_style(all_adjectives)
        
        # Определяем стилистику
        card_style = 'flat'
        if 'outlined' in all_adjectives or 'outline' in all_adjectives:
            card_style = 'outlined'
        elif 'gradient' in all_adjectives:
            card_style = 'gradient'
        elif 'glass' in all_adjectives:
            card_style = 'glass'
        
        border_radius = '8px'
        if 'sharp' in ' '.join(all_adjectives).lower() or 'чёткие края' in ' '.join(all_adjectives):
            border_radius = '0px'
        elif 'rounded' in ' '.join(all_adjectives).lower():
            border_radius = '16px'
        
        shadow = 'subtle'
        if 'strong' in ' '.join(all_adjectives).lower():
            shadow = 'strong'
        elif 'none' in ' '.join(all_adjectives).lower():
            shadow = 'none'
        
        return {
            'color_scheme': color_scheme,
            'layout_style': layout_style,
            'card_style': card_style,
            'border_radius': border_radius,
            'shadow': shadow,
            'spacing': 'standard'
        }
    
    def _determine_color_scheme(self, adjectives: List[str]) -> Dict[str, str]:
        """Определяет цветовую схему на основе прилагательных"""
        adj_str = ' '.join(adjectives).lower()
        
        for key, scheme in self.COLOR_SCHEMES.items():
            if key in adj_str:
                return scheme
        
        # Дефолтная схема
        return {'primary': '#0066cc', 'secondary': '#ffffff', 'accent': '#333333'}
    
    def _determine_layout_style(self, adjectives: List[str]) -> str:
        """Определяет стиль макета"""
        adj_str = ' '.join(adjectives).lower()
        
        if 'grid' in adj_str or 'grid-based' in adj_str or 'на сетке' in adj_str:
            return 'grid'
        elif 'asymmetrical' in adj_str or 'асимметричная' in adj_str:
            return 'asymmetrical'
        elif 'columns' in adj_str:
            return 'columns'
        elif 'dense' in adj_str or 'плотная' in adj_str:
            return 'masonry'
        else:
            return 'grid'
    
    def generate_layout_html(self, portfolio: Dict, layout_id: str = None) -> str:
        """
        Генерирует HTML макет на основе портфолио
        
        Args:
            portfolio: Данные портфолио
            layout_id: Уникальный ID макета
        
        Returns:
            HTML строка с макетом
        """
        if layout_id is None:
            layout_id = portfolio.get('id', f"layout_{random.randint(1000, 9999)}")
        
        # Извлекаем атрибуты дизайна
        design_attrs = self._extract_design_attributes(portfolio)
        
        colors = design_attrs['color_scheme']
        layout_style = design_attrs['layout_style']
        card_style = design_attrs['card_style']
        border_radius = design_attrs['border_radius']
        shadow = design_attrs['shadow']
        
        # Генерируем секции (случайный набор из типичных)
        num_sections = random.randint(4, 7)
        sections = random.sample(self.COMMON_SECTIONS, num_sections)
        
        # Генерируем HTML
        html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Макет портфолио - {layout_id}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: {colors['secondary']};
            padding: 20px;
            min-height: 100vh;
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: {colors['secondary']};
        }}
        
        .header {{
            background: {colors['primary']};
            color: white;
            padding: 40px 30px;
            border-radius: {border_radius};
            margin-bottom: 30px;
            text-align: center;
        }}
        
        .header-placeholder {{
            width: 200px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            margin: 0 auto 15px;
            border-radius: {border_radius};
        }}
        
        .header-subtitle {{
            width: 150px;
            height: 20px;
            background: rgba(255, 255, 255, 0.15);
            margin: 0 auto;
            border-radius: {border_radius};
        }}
        
        .sections-grid {{
            display: grid;
            {self.LAYOUT_STYLES[layout_style]}
            gap: 20px;
            margin-bottom: 30px;
        }}
        
        .section-card {{
            background: {colors['secondary']};
            border-radius: {border_radius};
            padding: 25px;
            min-height: 200px;
        }}
        
        .section-card.outlined {{
            border: 2px solid {colors['primary']};
            background: transparent;
        }}
        
        .section-card.gradient {{
            background: linear-gradient(135deg, {colors['primary']} 0%, {colors['accent']} 100%);
            color: white;
        }}
        
        .section-card.flat {{
            border: 1px solid rgba(0, 0, 0, 0.1);
        }}
        
        .section-title {{
            width: 60%;
            height: 24px;
            background: {colors['primary']};
            margin-bottom: 20px;
            border-radius: {border_radius};
        }}
        
        .section-content {{
            display: flex;
            flex-direction: column;
            gap: 15px;
        }}
        
        .content-block {{
            width: 100%;
            height: 80px;
            background: {colors['accent']};
            opacity: 0.3;
            border-radius: {border_radius};
        }}
        
        .content-block.large {{
            height: 120px;
        }}
        
        .content-block.small {{
            height: 50px;
        }}
        
        .grid-items {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }}
        
        .grid-item {{
            aspect-ratio: 1;
            background: {colors['accent']};
            opacity: 0.2;
            border-radius: {border_radius};
        }}
        
        .footer {{
            background: {colors['primary']};
            color: white;
            padding: 30px;
            border-radius: {border_radius};
            text-align: center;
        }}
        
        .footer-placeholder {{
            width: 300px;
            height: 20px;
            background: rgba(255, 255, 255, 0.2);
            margin: 0 auto;
            border-radius: {border_radius};
        }}
        
        @media (max-width: 768px) {{
            .sections-grid {{
                grid-template-columns: 1fr;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-placeholder"></div>
            <div class="header-subtitle"></div>
        </div>
        
        <div class="sections-grid">
"""
        
        # Генерируем секции
        for i, section in enumerate(sections):
            card_class = card_style
            html += f"""            <div class="section-card {card_class}">
                <div class="section-title"></div>
                <div class="section-content">
                    <div class="content-block"></div>
                    <div class="content-block small"></div>
"""
            
            # Добавляем сетку элементов для некоторых секций
            if i % 2 == 0:
                html += """                    <div class="grid-items">
                        <div class="grid-item"></div>
                        <div class="grid-item"></div>
                        <div class="grid-item"></div>
                        <div class="grid-item"></div>
                    </div>
"""
            
            html += """                </div>
            </div>
"""
        
        html += """        </div>
        
        <div class="footer">
            <div class="footer-placeholder"></div>
        </div>
    </div>
</body>
</html>"""
        
        return html
    
    def generate_layouts_from_portfolios(
        self,
        portfolios: List[Dict],
        num_layouts: int = 3
    ) -> List[Dict]:
        """
        Генерирует несколько макетов на основе списка портфолио
        
        Args:
            portfolios: Список портфолио для генерации макетов
            num_layouts: Количество макетов для генерации
        
        Returns:
            Список словарей с макетами (id, html, metadata)
        """
        results = []
        
        # Берем первые num_layouts портфолио
        selected = portfolios[:num_layouts]
        
        for i, portfolio in enumerate(selected):
            layout_id = f"layout_{i+1}_{portfolio.get('id', 'unknown')}"
            html = self.generate_layout_html(portfolio, layout_id)
            
            # Извлекаем метаданные
            design_attrs = self._extract_design_attributes(portfolio)
            
            results.append({
                'id': layout_id,
                'html': html,
                'metadata': {
                    'portfolio_id': portfolio.get('id'),
                    'team_name': portfolio.get('team_name'),
                    'score': portfolio.get('score', 0.0),
                    'design_attributes': design_attrs,
                    'colors': design_attrs['color_scheme'],
                    'layout_style': design_attrs['layout_style']
                }
            })
        
        return results
