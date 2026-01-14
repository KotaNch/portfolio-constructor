#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Визуализатор дизайна - генерирует HTML/CSS на основе параметров дизайна
Преобразует параметры нейросети в конкретный HTML портфолио
Гибридная версия: старый рабочий генератор + новая нейросетевая генерация
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
import io
from typing import Dict, List, Optional
import logging
import requests
from datetime import datetime
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PortfolioDesignVisualizer:
    """Преобразует параметры дизайна в визуальные элементы"""
    
    @staticmethod
    def generate_html_portfolio(design: Dict, portfolio_data: Dict = None) -> str:
        """Генерирует HTML портфолио на основе дизайн-параметров"""
        
        colors = design['colors']
        fonts = design['fonts']
        pattern = design['pattern']
        attributes = design.get('design_attributes', {})
        
        card_style = attributes.get('card_style', 'flat')
        border_radius = attributes.get('border_radius', '8px')
        shadow = attributes.get('shadow', 'subtle')
        spacing = attributes.get('spacing', 'standard')
        
        # Определяем CSS классы для стилей
        card_styles = {
            'flat': 'box-shadow: none; border: 1px solid rgba(0,0,0,0.1);',
            'outlined': f'border: 2px solid {colors["primary"]}; box-shadow: none;',
            'gradient': f'background: linear-gradient(135deg, {colors["primary"]} 0%, {colors["secondary"]} 100%); color: white;',
            'glass': 'background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);',
            'solid': f'background: {colors["primary"]}; color: white;',
            'embossed': f'box-shadow: 5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.5); border-radius: 20px;'
        }
        
        shadow_styles = {
            'none': 'box-shadow: none;',
            'subtle': 'box-shadow: 0 2px 4px rgba(0,0,0,0.05);',
            'medium': 'box-shadow: 0 4px 12px rgba(0,0,0,0.1);',
            'soft': 'box-shadow: 0 8px 24px rgba(0,0,0,0.08);',
            'strong': 'box-shadow: 0 12px 32px rgba(0,0,0,0.15);',
            'inset': 'box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);'
        }
        
        spacing_styles = {
            'tight': '16px',
            'compact': '20px',
            'standard': '24px',
            'generous': '32px'
        }
        
        spacing_value = spacing_styles.get(spacing, '24px')
        
        html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{design.get('name', 'Portfolio Design')}</title>
    <link href="https://fonts.googleapis.com/css2?family={fonts['heading'].split(',')[0].replace(' ', '+')}&family={fonts['body'].split(',')[0].replace(' ', '+')}&display=swap" rel="stylesheet">
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: {fonts['body']};
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: {spacing_value};
        }}
        
        h1, h2, h3, h4, h5, h6 {{
            font-family: {fonts['heading']};
            color: {colors['primary']};
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
        }}
        
        .header {{
            text-align: center;
            padding: {spacing_value};
            margin-bottom: {spacing_value};
            background: linear-gradient(135deg, {colors['primary']} 0%, {colors['secondary']} 100%);
            color: white;
            border-radius: {border_radius};
        }}
        
        .header h1 {{
            font-size: 2.5em;
            color: white;
            margin-bottom: 10px;
        }}
        
        .header p {{
            font-size: 1.1em;
            opacity: 0.95;
        }}
        
        .accent-line {{
            width: 60px;
            height: 4px;
            background: {colors['accent']};
            margin: 15px auto;
            border-radius: 2px;
        }}
        
        .card {{
            background: white;
            border-radius: {border_radius};
            padding: {spacing_value};
            margin-bottom: {spacing_value};
            {card_styles.get(card_style, card_styles['flat'])}
            {shadow_styles.get(shadow, shadow_styles['subtle'])}
            transition: all 0.3s ease;
        }}
        
        .card:hover {{
            transform: translateY(-4px);
            {shadow_styles.get(shadow, shadow_styles['subtle']).replace('rgba(0,0,0,', 'rgba(0,0,0,')}
        }}
        
        .card h2 {{
            margin-bottom: 15px;
            font-size: 1.5em;
            border-bottom: 3px solid {colors['accent']};
            padding-bottom: 10px;
        }}
        
        .card p {{
            color: #555;
            line-height: 1.6;
            margin-bottom: 10px;
        }}
        
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: {spacing_value};
            margin-bottom: {spacing_value};
        }}
        
        .badge {{
            display: inline-block;
            background: {colors['accent']};
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            margin-right: 8px;
            margin-bottom: 8px;
        }}
        
        .button {{
            background: linear-gradient(135deg, {colors['primary']} 0%, {colors['secondary']} 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: {border_radius};
            font-size: 1em;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-block;
            margin-top: 15px;
        }}
        
        .button:hover {{
            transform: scale(1.05);
            {shadow_styles.get(shadow, shadow_styles['medium'])}
        }}
        
        .pattern-info {{
            background: {colors['primary']}15;
            border-left: 4px solid {colors['primary']};
            padding: 15px;
            margin-top: 20px;
            border-radius: 4px;
        }}
        
        .footer {{
            text-align: center;
            padding: {spacing_value};
            color: #888;
            margin-top: {spacing_value};
            border-top: 1px solid #eee;
        }}
        
        @media (max-width: 768px) {{
            body {{
                padding: 12px;
            }}
            
            .header h1 {{
                font-size: 1.8em;
            }}
            
            .grid {{
                grid-template-columns: 1fr;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Portfolio Design</h1>
            <p>{design.get('name', 'AI Generated Design')}</p>
            <div class="accent-line"></div>
        </div>
        
        <div class="grid">
            <div class="card">
                <h2>✨ О Дизайне</h2>
                <p><strong>Стиль:</strong> {design['pattern']}</p>
                <p><strong>Описание:</strong> {design['pattern_desc']}</p>
                <p><strong>Базирован на успешных портфолио:</strong> {design.get('based_on_successful', 0)}</p>
                <p><strong>Уверенность AI:</strong> {design['pattern_confidence']:.1%}</p>
            </div>
            
            <div class="card">
                <h2>🎨 Цветовая Схема</h2>
                <p><strong>Основной:</strong> {colors['primary']}</p>
                <p><strong>Вторичный:</strong> {colors['secondary']}</p>
                <p><strong>Акцент:</strong> {colors['accent']}</p>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <div style="width: 50px; height: 50px; background: {colors['primary']}; border-radius: {border_radius};"></div>
                    <div style="width: 50px; height: 50px; background: {colors['secondary']}; border-radius: {border_radius};"></div>
                    <div style="width: 50px; height: 50px; background: {colors['accent']}; border-radius: {border_radius};"></div>
                </div>
            </div>
            
            <div class="card">
                <h2>📝 Типография</h2>
                <p><strong>Заголовки:</strong> {fonts['heading']}</p>
                <p><strong>Текст:</strong> {fonts['body']}</p>
                <div style="margin-top: 15px;">
                    <h3 style="font-family: {fonts['heading']};">Пример заголовка</h3>
                    <p style="font-family: {fonts['body']};">Это пример основного текста с выбранным шрифтом.</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>🎯 Характеристики Дизайна</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div>
                    <span class="badge">Стиль карт</span>
                    <p>{attributes.get('card_style', 'flat')}</p>
                </div>
                <div>
                    <span class="badge">Скругление</span>
                    <p>{attributes.get('border_radius', '8px')}</p>
                </div>
                <div>
                    <span class="badge">Тень</span>
                    <p>{attributes.get('shadow', 'subtle')}</p>
                </div>
                <div>
                    <span class="badge">Расстояние</span>
                    <p>{attributes.get('spacing', 'standard')}</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>🚀 Примеры Элементов</h2>
            <div style="margin-top: 15px;">
                <div class="badge">Успешный дизайн</div>
                <div class="badge">AI-сгенерирован</div>
                <div class="badge">Миксированный</div>
            </div>
            <button class="button">Скачать Портфолио</button>
            <button class="button" style="background: {colors['accent']}; margin-left: 10px;">Просмотр Live</button>
        </div>
        
        <div class="pattern-info">
            <strong>ℹ️ Информация о паттерне:</strong>
            <p style="margin-top: 8px;">Этот дизайн был сгенерирован AI на основе анализа {design.get('based_on_successful', 0)} успешных портфолио. 
            Система выбрала оптимальное сочетание стиля, цветов и типографии для максимального визуального воздействия.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Portfolio AI Design System</p>
            <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.7;">Дизайн #{design.get('id', 'unknown')} | Уверенность: {design['success_probability']:.1%}</p>
        </div>
    </div>
</body>
</html>"""
        
        return html
    
    @staticmethod
    def generate_pdf_portfolio(design: Dict, output_path: str = None) -> bytes:
        """Генерирует PDF портфолио на основе дизайн-параметров"""
        
        colors = design['colors']
        fonts = design['fonts']
        pattern = design['pattern']
        
        # Создаём PDF документ в памяти
        pdf_buffer = io.BytesIO()
        doc = SimpleDocTemplate(pdf_buffer, pagesize=A4)
        styles = getSampleStyleSheet()
        
        # Кастомные стили для нашего дизайна
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=36,
            textColor=HexColor('#' + colors['primary']),
            spaceAfter=12,
            fontName='Helvetica-Bold',
            alignment=TA_CENTER
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=18,
            textColor=HexColor('#' + colors['primary']),
            spaceAfter=12,
            fontName='Helvetica-Bold',
            borderColor=HexColor('#' + colors['accent']),
            borderWidth=2,
            borderPadding=6
        )
        
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['BodyText'],
            fontSize=11,
            alignment=TA_JUSTIFY,
            spaceAfter=12,
            leading=14
        )
        
        # Элементы документа
        elements = []
        
        # Заголовок
        elements.append(Paragraph(design.get('name', 'Portfolio Design'), title_style))
        elements.append(Spacer(1, 0.2*inch))
        
        # Информация о дизайне
        elements.append(Paragraph(f"<b>Стиль:</b> {design['pattern']}", body_style))
        elements.append(Paragraph(f"<b>Описание:</b> {design['pattern_desc']}", body_style))
        elements.append(Spacer(1, 0.3*inch))
        
        # Цветовая схема
        elements.append(Paragraph("Цветовая Схема", heading_style))
        
        color_data = [
            ['Тип', 'Цвет', 'Образец'],
            ['Основной', colors['primary'], ''],
            ['Вторичный', colors['secondary'], ''],
            ['Акцент', colors['accent'], ''],
        ]
        
        color_table = Table(color_data, colWidths=[2*inch, 2*inch, 1.5*inch])
        color_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), HexColor('#' + colors['primary'])),
            ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#FFFFFF')),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (1, 1), HexColor('#' + colors['primary'])),
            ('BACKGROUND', (0, 2), (1, 2), HexColor('#' + colors['secondary'])),
            ('BACKGROUND', (0, 3), (1, 3), HexColor('#' + colors['accent'])),
            ('GRID', (0, 0), (-1, -1), 1, HexColor('#CCCCCC')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), HexColor('#F0F0F0')])
        ]))
        
        elements.append(color_table)
        elements.append(Spacer(1, 0.3*inch))
        
        # Типография
        elements.append(Paragraph("Типография", heading_style))
        elements.append(Paragraph(f"<b>Заголовки:</b> {fonts['heading']}", body_style))
        elements.append(Paragraph(f"<b>Текст:</b> {fonts['body']}", body_style))
        elements.append(Spacer(1, 0.3*inch))
        
        # Характеристики
        elements.append(Paragraph("Характеристики Дизайна", heading_style))
        
        attributes = design.get('design_attributes', {})
        elements.append(Paragraph(f"<b>Стиль карт:</b> {attributes.get('card_style', 'flat')}", body_style))
        elements.append(Paragraph(f"<b>Скругление углов:</b> {attributes.get('border_radius', '8px')}", body_style))
        elements.append(Paragraph(f"<b>Тень:</b> {attributes.get('shadow', 'subtle')}", body_style))
        elements.append(Paragraph(f"<b>Расстояния:</b> {attributes.get('spacing', 'standard')}", body_style))
        elements.append(Spacer(1, 0.2*inch))
        
        # Информация о генерации
        elements.append(Paragraph(f"<b>На основе портфолио:</b> {design.get('based_on_successful', 0)} успешных примеров", body_style))
        elements.append(Paragraph(f"<b>Уверенность AI:</b> {design['pattern_confidence']:.1%}", body_style))
        
        # Построение PDF
        doc.build(elements)
        
        pdf_bytes = pdf_buffer.getvalue()
        
        # Сохраняем если указан путь
        if output_path:
            with open(output_path, 'wb') as f:
                f.write(pdf_bytes)
            logger.info(f"PDF сохранен: {output_path}")
        
        return pdf_bytes
    
    # ==================== СТАРАЯ РАБОЧАЯ ВЕРСИЯ - FTC ПОРТФОЛИО ====================
    
    @staticmethod
    def generate_pdf_from_ftc_portfolio(portfolio_data: Dict) -> io.BytesIO:
        """
        Генерирует PDF портфолио на основе данных FTC команды
        СТАРЫЙ РАБОЧИЙ МЕТОД, восстановлен из portfolio_generator.py
        
        Args:
            portfolio_data: Данные портфолио (должны содержать team_name, achievement и т.д.)
            
        Returns:
            BytesIO объект с PDF контентом
        """
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter,
                                rightMargin=0.75*inch, leftMargin=0.75*inch,
                                topMargin=0.75*inch, bottomMargin=0.75*inch)
        
        # Создаем стили
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=HexColor('#0066cc'),
            spaceAfter=12,
            alignment=1  # Center
        )
        
        subtitle_style = ParagraphStyle(
            'CustomSubtitle',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=HexColor('#333333'),
            spaceAfter=6
        )
        
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['Normal'],
            fontSize=11,
            spaceAfter=8
        )
        
        # Содержимое PDF
        content = []
        
        # Заголовок
        team_name = portfolio_data.get('team_name', 'FTC Team')
        team_number = portfolio_data.get('team_number', '')
        content.append(Paragraph(f"FTC Team {team_number}", title_style))
        content.append(Paragraph(team_name, subtitle_style))
        content.append(Spacer(1, 0.2*inch))
        
        # Информация о достижении
        achievement = portfolio_data.get('achievement', 'N/A')
        portfolio_type = portfolio_data.get('portfolio_type', 'N/A')
        
        info_data = [
            ['Достижение:', achievement],
            ['Тип портфолио:', portfolio_type.upper()],
            ['Дата создания:', datetime.now().strftime('%d.%m.%Y')]
        ]
        
        from reportlab.lib import colors
        info_table = Table(info_data, colWidths=[2*inch, 4*inch])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), HexColor('#f5f5f5')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, HexColor('#e0e0e0'))
        ]))
        
        content.append(info_table)
        content.append(Spacer(1, 0.3*inch))
        
        # Ссылка на оригинальный PDF
        pdf_url = portfolio_data.get('pdf_url', '')
        if pdf_url:
            content.append(Paragraph('<b>Исходный портфолио:</b>', body_style))
            content.append(Paragraph(f'<a href="{pdf_url}">{pdf_url}</a>', body_style))
        
        # Сборка документа
        doc.build(content)
        buffer.seek(0)
        
        return buffer
    
    @staticmethod
    def download_original_pdf(pdf_url: str) -> Optional[io.BytesIO]:
        """
        Загружает оригинальный PDF с сервера
        СТАРЫЙ РАБОЧИЙ МЕТОД
        
        Args:
            pdf_url: URL оригинального PDF
            
        Returns:
            BytesIO объект с PDF контентом или None
        """
        try:
            response = requests.get(pdf_url, timeout=10)
            if response.status_code == 200:
                buffer = io.BytesIO(response.content)
                return buffer
        except Exception as e:
            logger.error(f"Ошибка при загрузке PDF: {e}")
        
        return None

if __name__ == '__main__':
    sample_design = {
        'name': 'Тестовый дизайн',
        'pattern': 'modern',
        'pattern_desc': 'Современный минималистичный стиль',
        'colors': {'primary': '#667eea', 'secondary': '#764ba2', 'accent': '#f093fb'},
        'fonts': {'heading': 'Inter, sans-serif', 'body': 'Open Sans, sans-serif'},
        'pattern_confidence': 0.85,
        'success_probability': 0.78,
        'based_on_successful': 15,
        'design_attributes': {
            'card_style': 'outlined',
            'border_radius': '12px',
            'shadow': 'medium',
            'spacing': 'standard'
        }
    }
    
    visualizer = PortfolioDesignVisualizer()
    
    # Генерируем HTML
    html = visualizer.generate_html_portfolio(sample_design)
    with open('sample_portfolio.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("✓ HTML сгенерирован: sample_portfolio.html")
    
    # Генерируем PDF
    pdf_bytes = visualizer.generate_pdf_portfolio(sample_design, 'sample_portfolio.pdf')
    print(f"✓ PDF сгенерирован: sample_portfolio.pdf ({len(pdf_bytes)} bytes)")
