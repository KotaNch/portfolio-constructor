"""
PDF Portfolio Template Generator
Генерирует 1000+ шаблонов портфолио PDF
Каждый шаблон - это 10-15 страниц с разными макетами
"""

from reportlab.lib.pagesizes import A4, letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image, Frame, PageTemplate
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import json
import os
import random
from datetime import datetime
import math

class PDFPortfolioGenerator:
    def __init__(self, output_dir='pdf_templates'):
        """Инициализация генератора"""
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        os.makedirs(os.path.join(output_dir, 'metadata'), exist_ok=True)
        
        # Стили оформления
        self.color_schemes = [
            {'primary': '#1E88E5', 'secondary': '#FFF3E0', 'accent': '#FF6F00'},
            {'primary': '#00796B', 'secondary': '#F1F8E9', 'accent': '#7B1FA2'},
            {'primary': '#C62828', 'secondary': '#F3E5F5', 'accent': '#FFB300'},
            {'primary': '#004D7A', 'secondary': '#EFF7FA', 'accent': '#FF6B6B'},
            {'primary': '#2E7D32', 'secondary': '#FCE4EC', 'accent': '#0277BD'},
            {'primary': '#5E35B1', 'secondary': '#E0F2F1', 'accent': '#F57C00'},
            {'primary': '#D32F2F', 'secondary': '#F1F8E9', 'accent': '#1976D2'},
            {'primary': '#0097A7', 'secondary': '#FFF8E1', 'accent': '#C62828'},
            {'primary': '#455A64', 'secondary': '#F3E5F5', 'accent': '#FFC400'},
            {'primary': '#6A1B9A', 'secondary': '#E8F5E9', 'accent': '#E53935'},
        ]
        
        self.layout_types = [
            'modern_minimal',
            'corporate_bold',
            'creative_artistic',
            'tech_focused',
            'nature_inspired',
            'minimalist_clean',
            'dark_professional',
            'colorful_vibrant',
            'elegant_classic',
            'startup_modern',
        ]
        
        self.templates = []
        
    def generate_batch(self, num_templates=100):
        """Генерирует пакет шаблонов"""
        print(f"🚀 Начинаем генерирование {num_templates} шаблонов...")
        
        for i in range(num_templates):
            template_id = f"template_{i+1:05d}"
            self._generate_single_template(template_id, i)
            
            if (i + 1) % 10 == 0:
                print(f"✓ Готово: {i + 1}/{num_templates}")
        
        # Сохраняем индекс
        self._save_index()
        print(f"✅ Генерирование завершено! {num_templates} шаблонов готово")
        
    def _generate_single_template(self, template_id, index):
        """Генерирует один шаблон"""
        # Выбираем параметры
        colors_scheme = random.choice(self.color_schemes)
        layout_type = random.choice(self.layout_types)
        num_pages = random.randint(10, 15)
        
        # Создаем PDF
        pdf_path = os.path.join(self.output_dir, f'{template_id}.pdf')
        doc = SimpleDocTemplate(pdf_path, pagesize=A4, topMargin=0.5*cm, bottomMargin=0.5*cm,
                               leftMargin=1*cm, rightMargin=1*cm)
        
        story = []
        
        # Генерируем страницы
        for page_num in range(num_pages):
            if page_num == 0:
                story.extend(self._create_title_page(colors_scheme, layout_type))
            elif page_num == 1:
                story.extend(self._create_about_page(colors_scheme))
            elif page_num % 3 == 0:
                story.extend(self._create_gallery_page(colors_scheme))
            elif page_num % 3 == 1:
                story.extend(self._create_content_page(colors_scheme, layout_type))
            else:
                story.extend(self._create_achievements_page(colors_scheme))
            
            if page_num < num_pages - 1:
                story.append(PageBreak())
        
        # Строим PDF
        doc.build(story)
        
        # Сохраняем метаданные
        metadata = {
            'id': template_id,
            'filename': f'{template_id}.pdf',
            'layout_type': layout_type,
            'colors': colors_scheme,
            'pages': num_pages,
            'created_at': datetime.now().isoformat(),
            'tags': self._generate_tags(layout_type),
            'description': self._generate_description(layout_type, colors_scheme),
            'index': index
        }
        
        metadata_path = os.path.join(self.output_dir, 'metadata', f'{template_id}.json')
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
        
        self.templates.append(metadata)
    
    def _create_title_page(self, colors, layout_type):
        """Создает титульную страницу"""
        style = getSampleStyleSheet()
        story = []
        
        # Заголовок
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=style['Heading1'],
            fontSize=32,
            textColor=colors['primary'],
            spaceAfter=0.3*inch,
            alignment=1,
            fontName='Helvetica-Bold'
        )
        
        story.append(Spacer(1, 1.5*inch))
        story.append(Paragraph('ПОРТФОЛИО', title_style))
        
        # Прямоугольник
        data = [['']]
        t = Table(data, colWidths=[5*inch], rowHeights=[2*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors['secondary']),
            ('BORDER', (0, 0), (-1, -1), 1, colors['primary']),
        ]))
        story.append(t)
        story.append(Spacer(1, 0.5*inch))
        
        # Описание
        desc_style = ParagraphStyle(
            'Description',
            parent=style['Normal'],
            fontSize=12,
            textColor=colors['accent'],
            alignment=1
        )
        story.append(Paragraph(f'Макет: {layout_type}', desc_style))
        
        return story
    
    def _create_about_page(self, colors):
        """Создает страницу "О команде"""""
        style = getSampleStyleSheet()
        story = []
        
        # Заголовок
        title_style = ParagraphStyle(
            'Title',
            parent=style['Heading1'],
            fontSize=24,
            textColor=colors['primary'],
            spaceAfter=0.2*inch,
            fontName='Helvetica-Bold'
        )
        
        story.append(Paragraph('О КОМАНДЕ', title_style))
        story.append(Spacer(1, 0.2*inch))
        
        # Две колонки с прямоугольниками
        data = [
            ['ОПЫТ', 'ДОСТИЖЕНИЯ'],
            ['', '']
        ]
        t = Table(data, colWidths=[3*inch, 3*inch], rowHeights=[0.4*inch, 2*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors['accent']),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors['secondary']),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BORDER', (0, 0), (-1, -1), 1, colors['primary']),
            ('BACKGROUND', (0, 1), (-1, -1), colors['secondary']),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
        ]))
        story.append(t)
        
        return story
    
    def _create_gallery_page(self, colors):
        """Создает галерею проектов"""
        style = getSampleStyleSheet()
        story = []
        
        title_style = ParagraphStyle(
            'Title',
            parent=style['Heading1'],
            fontSize=24,
            textColor=colors['primary'],
            spaceAfter=0.2*inch,
            fontName='Helvetica-Bold'
        )
        
        story.append(Paragraph('ПРОЕКТЫ', title_style))
        story.append(Spacer(1, 0.2*inch))
        
        # Сетка 2x2
        data = [['', ''], ['', '']]
        t = Table(data, colWidths=[2.8*inch, 2.8*inch], rowHeights=[1.8*inch, 1.8*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors['secondary']),
            ('BORDER', (0, 0), (-1, -1), 1, colors['primary']),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        story.append(t)
        
        return story
    
    def _create_content_page(self, colors, layout_type):
        """Создает страницу с контентом"""
        style = getSampleStyleSheet()
        story = []
        
        title_style = ParagraphStyle(
            'Title',
            parent=style['Heading1'],
            fontSize=24,
            textColor=colors['primary'],
            spaceAfter=0.2*inch,
            fontName='Helvetica-Bold'
        )
        
        story.append(Paragraph('ОПИСАНИЕ', title_style))
        story.append(Spacer(1, 0.2*inch))
        
        # 3 колонки текста
        data = [['', '', ''], ['', '', '']]
        t = Table(data, colWidths=[1.8*inch, 1.8*inch, 1.8*inch], rowHeights=[0.4*inch, 2*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors['accent']),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors['secondary']),
            ('BORDER', (0, 0), (-1, -1), 1, colors['primary']),
            ('BACKGROUND', (0, 1), (-1, -1), colors['secondary']),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        story.append(t)
        
        return story
    
    def _create_achievements_page(self, colors):
        """Создает страницу достижений"""
        style = getSampleStyleSheet()
        story = []
        
        title_style = ParagraphStyle(
            'Title',
            parent=style['Heading1'],
            fontSize=24,
            textColor=colors['primary'],
            spaceAfter=0.2*inch,
            fontName='Helvetica-Bold'
        )
        
        story.append(Paragraph('ДОСТИЖЕНИЯ', title_style))
        story.append(Spacer(1, 0.2*inch))
        
        # Список достижений
        achievements = ['НАГРАДА 1', 'НАГРАДА 2', 'НАГРАДА 3', 'НАГРАДА 4']
        data = [[a] for a in achievements]
        
        t = Table(data, colWidths=[5*inch], rowHeights=[0.8*inch]*len(achievements))
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors['secondary']),
            ('BORDER', (0, 0), (-1, -1), 1, colors['primary']),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors['accent']),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ]))
        story.append(t)
        
        return story
    
    def _generate_tags(self, layout_type):
        """Генерирует теги для шаблона"""
        base_tags = [layout_type]
        
        # Добавляем цветовые теги
        color_tags = ['синий', 'зелёный', 'красный', 'фиолетовый', 'оранжевый']
        base_tags.extend(random.sample(color_tags, 2))
        
        # Добавляем стиль-теги
        style_tags = ['современный', 'минималистичный', 'творческий', 'профессиональный', 
                     'яркий', 'элегантный', 'простой', 'детальный']
        base_tags.extend(random.sample(style_tags, 2))
        
        # Добавляем теги назначения
        purpose_tags = ['портфолио', 'презентация', 'каталог', 'макет', 'шаблон', 'ftc']
        base_tags.extend(random.sample(purpose_tags, 2))
        
        return list(set(base_tags))
    
    def _generate_description(self, layout_type, colors):
        """Генерирует описание шаблона"""
        descriptions = {
            'modern_minimal': 'Современный минималистичный дизайн с фокусом на контент',
            'corporate_bold': 'Корпоративный стиль с смелыми цветовыми акцентами',
            'creative_artistic': 'Творческий дизайн для инновационных проектов',
            'tech_focused': 'Технологичный стиль для IT проектов и стартапов',
            'nature_inspired': 'Дизайн вдохновлённый природой с органичными формами',
            'minimalist_clean': 'Чистый дизайн с максимальной простотой',
            'dark_professional': 'Профессиональный тёмный дизайн для солидных организаций',
            'colorful_vibrant': 'Яркий многоцветный дизайн для молодёжных проектов',
            'elegant_classic': 'Классический элегантный стиль с традиционными элементами',
            'startup_modern': 'Современный дизайн для стартапов и инновационных компаний',
        }
        return descriptions.get(layout_type, 'Красивый шаблон портфолио')
    
    def _save_index(self):
        """Сохраняет индекс всех шаблонов"""
        index = {
            'total_templates': len(self.templates),
            'generated_at': datetime.now().isoformat(),
            'templates': self.templates
        }
        
        index_path = os.path.join(self.output_dir, 'index.json')
        with open(index_path, 'w', encoding='utf-8') as f:
            json.dump(index, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    generator = PDFPortfolioGenerator(output_dir='pdf_templates')
    
    # Генерируем 1000 шаблонов
    generator.generate_batch(num_templates=1000)
    
    print("\n" + "="*60)
    print("✅ ГЕНЕРИРОВАНИЕ ЗАВЕРШЕНО")
    print("="*60)
    print(f"📁 Папка: pdf_templates/")
    print(f"📄 Всего PDF: 1000+")
    print(f"📊 Метаданные: pdf_templates/metadata/")
    print(f"🔍 Индекс: pdf_templates/index.json")
