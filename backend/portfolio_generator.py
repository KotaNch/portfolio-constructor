import json
from typing import List, Dict, Optional
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import requests
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from io import BytesIO
from datetime import datetime

class PortfolioGenerator:
    def __init__(self, use_ftc_data: bool = True):
        """Инициализация генератора портфолио"""
        self.use_ftc_data = use_ftc_data
        self.templates = self._load_templates()
        self.ftc_portfolios = self._load_ftc_portfolios() if use_ftc_data else []
        self.vectorizer = TfidfVectorizer(lowercase=True)
        
        # Подготавливаем данные для поиска
        self._prepare_search_index()
    
    def _load_templates(self) -> List[Dict]:
        """Загружает шаблоны портфолио из JSON файла"""
        try:
            template_path = os.path.join(os.path.dirname(__file__), 'data', 'portfolio_templates.json')
            with open(template_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get('templates', [])
        except Exception as e:
            print(f"Ошибка при загрузке шаблонов: {e}")
            return []
    
    def _load_ftc_portfolios(self) -> List[Dict]:
        """Загружает данные FTC портфолио"""
        try:
            ftc_path = os.path.join(os.path.dirname(__file__), 'data', 'ftc_portfolios.json')
            if os.path.exists(ftc_path):
                with open(ftc_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return data.get('portfolios', [])
        except Exception as e:
            print(f"Ошибка при загрузке FTC портфолио: {e}")
        return []
    
    def _prepare_search_index(self):
        """Подготавливает индекс для быстрого поиска похожих шаблонов"""
        # Создаем текстовое описание для каждого шаблона
        self.template_texts = []
        for template in self.templates:
            text = f"{template.get('name', '')} {template.get('description', '')} {' '.join(template.get('tags', []))}"
            self.template_texts.append(text)
        
        # Добавляем FTC портфолио в индекс поиска
        if self.ftc_portfolios:
            for portfolio in self.ftc_portfolios:
                text = f"{portfolio.get('team_name', '')} {portfolio.get('team_number', '')} {portfolio.get('achievement', '')} {portfolio.get('portfolio_type', '')}"
                self.template_texts.append(text)
        
        # Трансформируем тексты в векторы
        if self.template_texts:
            self.tfidf_matrix = self.vectorizer.fit_transform(self.template_texts)
    
    def generate_layouts(self, user_prompt: str, num_examples: int = 3) -> List[Dict]:
        """
        Находит наиболее подходящие макеты портфолио на основе промта пользователя
        
        Args:
            user_prompt: Описание требований пользователя
            num_examples: Количество примеров (по умолчанию 3)
            
        Returns:
            Список наиболее подходящих макетов портфолио
        """
        if not self.templates:
            return []
        
        try:
            # Трансформируем промт пользователя в вектор
            user_vector = self.vectorizer.transform([user_prompt])
            
            # Вычисляем сходство между промтом и всеми шаблонами
            similarities = cosine_similarity(user_vector, self.tfidf_matrix)[0]
            
            # Находим индексы самых похожих шаблонов
            top_indices = np.argsort(similarities)[::-1][:num_examples]
            
            # Возвращаем топ шаблоны
            result = []
            for idx in top_indices:
                if int(idx) < len(self.templates):
                    template = self.templates[int(idx)]
                    # Добавляем оценку релевантности
                    template_copy = template.copy()
                    template_copy['relevance_score'] = float(similarities[idx])
                    result.append(template_copy)
            
            return result
        
        except Exception as e:
            print(f"Ошибка при поиске шаблонов: {e}")
            # Возвращаем просто первые N шаблонов
            return self.templates[:num_examples]
    
    def search_ftc_portfolios(self, query: str, limit: int = 5) -> List[Dict]:
        """
        Поиск портфолио команд FTC по названию или номеру
        
        Args:
            query: Поисковой запрос (название команды, номер и т.д.)
            limit: Максимальное количество результатов
            
        Returns:
            Список найденных портфолио
        """
        if not self.ftc_portfolios:
            return []
        
        query_lower = query.lower()
        results = []
        
        for portfolio in self.ftc_portfolios:
            team_name = portfolio.get('team_name', '').lower()
            team_number = portfolio.get('team_number', '').lower()
            achievement = portfolio.get('achievement', '').lower()
            
            if (query_lower in team_name or 
                query_lower in team_number or 
                query_lower in achievement):
                results.append(portfolio)
                if len(results) >= limit:
                    break
        
        return results
    
    def get_all_ftc_portfolios(self, limit: Optional[int] = None) -> List[Dict]:
        """Получает все FTC портфолио"""
        if limit:
            return self.ftc_portfolios[:limit]
        return self.ftc_portfolios
    
    def generate_pdf_from_ftc_portfolio(self, portfolio_data: Dict) -> BytesIO:
        """
        Генерирует PDF портфолио на основе данных FTC команды
        
        Args:
            portfolio_data: Данные портфолио (должны содержать team_name, achievement и т.д.)
            
        Returns:
            BytesIO объект с PDF контентом
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter,
                                rightMargin=0.75*inch, leftMargin=0.75*inch,
                                topMargin=0.75*inch, bottomMargin=0.75*inch)
        
        # Создаем стили
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#0066cc'),
            spaceAfter=12,
            alignment=1  # Center
        )
        
        subtitle_style = ParagraphStyle(
            'CustomSubtitle',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#333333'),
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
        
        info_table = Table(info_data, colWidths=[2*inch, 4*inch])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f5f5f5')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e0e0e0'))
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
    
    def download_original_pdf(self, pdf_url: str) -> Optional[BytesIO]:
        """
        Загружает оригинальный PDF с сервера
        
        Args:
            pdf_url: URL оригинального PDF
            
        Returns:
            BytesIO объект с PDF контентом или None
        """
        try:
            response = requests.get(pdf_url, timeout=10)
            if response.status_code == 200:
                buffer = BytesIO(response.content)
                return buffer
        except Exception as e:
            print(f"Ошибка при загрузке PDF: {e}")
        
        return None
