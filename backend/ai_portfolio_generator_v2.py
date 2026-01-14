#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
ГЛАВНЫЙ МОДУЛЬ: AI Портфолио Генератор v2.0
Скачивает успешные портфолио, анализирует их, обучает нейросеть и генерирует новые комбинации
"""

import os
import sys
import json
import logging
from pathlib import Path

# Импортируем наши модули
from advanced_scraper import AdvancedFTCPortfolioScraper
from portfolio_design_neural import PortfolioMixGenerator, PortfolioDesignAnalyzer
from portfolio_visualizer import PortfolioDesignVisualizer

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AIPortfolioGeneratorV2:
    """Полная система генерации портфолио на основе AI"""
    
    def __init__(self):
        self.backend_dir = os.path.dirname(__file__)
        self.data_dir = os.path.join(self.backend_dir, 'data')
        self.output_dir = os.path.join(self.backend_dir, 'generated_portfolios')
        os.makedirs(self.data_dir, exist_ok=True)
        os.makedirs(self.output_dir, exist_ok=True)
    
    def step1_scrape_portfolios(self) -> list:
        """Шаг 1: Скачиваем портфолио со страницы"""
        print("\n" + "="*70)
        print("STEP 1: SKACHIVANJE PORTFOLIA SA STRANICE")
        print("="*70)
        
        scraper = AdvancedFTCPortfolioScraper()
        
        # Пытаемся скачать с помощью Selenium
        portfolios = scraper.scrape_with_selenium()
        
        if len(portfolios) == 0:
            print("[WARN] Selenium nije mogao dobiti portfolio, koristim fallback...")
            portfolios = scraper.scrape_fallback()
        
        print(f"\n[OK] Najdeno portfolio: {len(portfolios)}")
        
        # Сохраняем метаданные
        scraper.save_metadata()
        
        return portfolios
    
    def step2_download_pdfs(self, portfolios: list) -> int:
        """Шаг 2: Скачиваем PDF файлы портфолио"""
        print("\n" + "="*70)
        print("ШАГИ 2️⃣  СКАЧИВАНИЕ PDF ПОРТФОЛИО")
        print("="*70)
        print("(это может занять время...)")
        
        scraper = AdvancedFTCPortfolioScraper()
        scraper.portfolios = portfolios
        
        downloaded = scraper.download_portfolio_pdfs(
            os.path.join(self.data_dir, 'portfolio_pdfs')
        )
        
        print(f"\n[OK] Skachano fajlova: {downloaded}/{len(portfolios)}")
        return downloaded
    
    def step3_analyze_designs(self, portfolios: list):
        """Шаг 3: Анализируем дизайн успешных портфолио"""
        print("\n" + "="*70)
        print("STEP 3: ANALIZA DIZAJNA PORTFOLIA")
        print("="*70)
        
        analyzer = PortfolioDesignAnalyzer(portfolios)
        
        # Фильтруем успешные
        successful = [f for f in analyzer.design_features if f['success_score'] >= 0.8]
        
        print(f"\n[OK] Uspesnih portfolia: {len(successful)}/{len(portfolios)}")
        print(f"[OK] Popularne seme boja: {len(analyzer.POPULAR_COLOR_SCHEMES)}")
        print(f"[OK] Kombinacija fontova: {len(analyzer.FONT_COMBINATIONS)}")
        print(f"[OK] Dizajn-paterna: {len(analyzer.DESIGN_PATTERNS)}")
        
        return analyzer
    
    def step4_train_neural_net(self, analyzer) -> PortfolioMixGenerator:
        """Шаг 4: Обучаем нейросеть на успешных дизайнах"""
        print("\n" + "="*70)
        print("STEP 4: OBUCAVANJE NEURONSKE MREZE")
        print("="*70)
        
        generator = PortfolioMixGenerator(analyzer.portfolios)
        
        print("\n[OK] Neuronska mreza obucena!")
        print(f"[OK] Skriveni neuroni: {generator.neural_net.num_hidden}")
        print(f"[OK] Ukupno parametara: {generator.neural_net.W1.size + generator.neural_net.W2.size}")
        
        return generator
    
    def step5_generate_designs(self, generator: PortfolioMixGenerator, count: int = 10):
        """Шаг 5: Генерируем новые дизайны как микс успешных"""
        print("\n" + "="*70)
        print(f"ШАГИ 5️⃣  ГЕНЕРИРОВАНИЕ {count} НОВЫХ ДИЗАЙНОВ")
        print("="*70)
        
        designs = generator.generate_mix_designs(count=count)
        
        for i, design in enumerate(designs, 1):
            print(f"\n{i}. {design['name']}")
            print(f"   Стиль: {design['pattern']}")
            print(f"   Цвета: {design['colors']['primary']} → {design['colors']['secondary']}")
            print(f"   Шрифты: {design['fonts']['heading']}")
            print(f"   Уверенность: {design['pattern_confidence']:.1%}")
        
        return designs
    
    def step6_visualize_and_export(self, designs: list) -> dict:
        """Шаг 6: Визуализируем дизайны и экспортируем в HTML/PDF"""
        print("\n" + "="*70)
        print(f"ШАГИ 6️⃣  ЭКСПОРТ ДИЗАЙНОВ (HTML + PDF)")
        print("="*70)
        
        visualizer = PortfolioDesignVisualizer()
        results = {}
        
        for design in designs:
            design_id = design['id']
            
            # Генерируем HTML
            html = visualizer.generate_html_portfolio(design)
            html_path = os.path.join(self.output_dir, f"{design_id}.html")
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(html)
            
            # Генерируем PDF
            pdf_path = os.path.join(self.output_dir, f"{design_id}.pdf")
            pdf_bytes = visualizer.generate_pdf_portfolio(design, pdf_path)
            
            results[design_id] = {
                'html_path': html_path,
                'pdf_path': pdf_path,
                'pdf_size': len(pdf_bytes),
                'design': design
            }
            
            print(f"[OK] {design_id}: HTML ({len(html)} bytes) + PDF ({len(pdf_bytes)} bytes)")
        
        # Сохраняем индекс дизайнов
        index_path = os.path.join(self.output_dir, 'designs_index.json')
        with open(index_path, 'w', encoding='utf-8') as f:
            json.dump({
                'total_designs': len(designs),
                'designs': [d['id'] for d in designs],
                'output_directory': self.output_dir
            }, f, ensure_ascii=False, indent=2)
        
        print(f"\n[OK] Indeks sacuvan: {index_path}")
        
        return results
    
    def step7_create_gallery(self, designs: list):
        """Шаг 7: Создаём галерею всех дизайнов"""
        print("\n" + "="*70)
        print(f"ШАГИ 7️⃣  СОЗДАНИЕ ГАЛЕРЕИ")
        print("="*70)
        
        gallery_html = """<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Generated Portfolio Designs Gallery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 50px;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
        }
        
        .design-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .design-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .design-preview {
            height: 200px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5em;
            position: relative;
            overflow: hidden;
        }
        
        .design-preview::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0,0,0,0.1) 0%, transparent 50%);
            pointer-events: none;
        }
        
        .design-info {
            padding: 20px;
        }
        
        .design-name {
            font-size: 1.3em;
            font-weight: bold;
            color: var(--primary);
            margin-bottom: 10px;
        }
        
        .design-pattern {
            color: #666;
            margin-bottom: 12px;
            font-size: 0.95em;
        }
        
        .color-samples {
            display: flex;
            gap: 8px;
            margin-bottom: 15px;
        }
        
        .color-sample {
            width: 30px;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #ddd;
        }
        
        .confidence {
            color: #999;
            font-size: 0.9em;
            margin-bottom: 15px;
        }
        
        .confidence-bar {
            width: 100%;
            height: 4px;
            background: #eee;
            border-radius: 2px;
            overflow: hidden;
        }
        
        .confidence-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--accent) 0%, var(--secondary) 100%);
            border-radius: 2px;
        }
        
        .design-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .btn {
            flex: 1;
            padding: 10px 15px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.2s;
            text-align: center;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
        }
        
        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .btn-secondary {
            background: #f0f0f0;
            color: var(--primary);
        }
        
        .btn-secondary:hover {
            background: #e0e0e0;
        }
        
        .stats {
            background: rgba(255,255,255,0.1);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 40px;
            backdrop-filter: blur(10px);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            text-align: center;
        }
        
        .stat {
            font-size: 2em;
            font-weight: bold;
        }
        
        .stat-label {
            font-size: 0.9em;
            opacity: 0.8;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 AI Generated Portfolio Gallery</h1>
            <p>Дизайны сгенерированы нейросетью на основе анализа успешных портфолио</p>
        </div>
        
        <div class="stats">
            <div>
                <div class="stat">{}</div>
                <div class="stat-label">Дизайнов</div>
            </div>
            <div>
                <div class="stat">✨</div>
                <div class="stat-label">AI-Generated</div>
            </div>
            <div>
                <div class="stat">🎯</div>
                <div class="stat-label">Оптимизировано</div>
            </div>
        </div>
        
        <div class="gallery">
"""
        
        # Добавляем карточки дизайнов
        for design in designs:
            colors = design['colors']
            confidence = design['pattern_confidence']
            
            gallery_html += f"""
            <div class="design-card" style="--primary: {colors['primary']}; --secondary: {colors['secondary']}; --accent: {colors['accent']};">
                <div class="design-preview">
                    <span>Design #{design['id'].split('_')[1]}</span>
                </div>
                <div class="design-info">
                    <div class="design-name">{design['name']}</div>
                    <div class="design-pattern">📐 {design['pattern']}</div>
                    <div class="design-pattern">{design['pattern_desc']}</div>
                    
                    <div class="color-samples">
                        <div class="color-sample" style="background: {colors['primary']};"></div>
                        <div class="color-sample" style="background: {colors['secondary']};"></div>
                        <div class="color-sample" style="background: {colors['accent']};"></div>
                    </div>
                    
                    <div class="confidence">
                        Уверенность AI: {confidence:.0%}
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: {confidence:.0%};"></div>
                        </div>
                    </div>
                    
                    <div class="design-actions">
                        <a href="{design['id']}.html" class="btn btn-primary" target="_blank">Просмотр HTML</a>
                        <a href="{design['id']}.pdf" class="btn btn-secondary" download>Скачать PDF</a>
                    </div>
                </div>
            </div>
"""
        
        gallery_html += """
        </div>
    </div>
</body>
</html>
"""
        
        gallery_path = os.path.join(self.output_dir, 'gallery.html')
        gallery_html = gallery_html.format(len(designs))
        
        with open(gallery_path, 'w', encoding='utf-8') as f:
            f.write(gallery_html)
        
        print(f"[OK] Galerija kreirana: {gallery_path}")
        print(f"[OK] Otvorite u pregledniku da vidite sve dizajne")
        
        return gallery_path
    
    def run_full_pipeline(self, generate_count: int = 10):
        """Запускает полный цикл генерации"""
        print("\n" + "="*70)
        print("=" + " "*68 + "=")
        print("=" + "  AI PORTFOLIO GENERATOR v2.0".center(68) + "=")
        print("=" + "  Polnaya sistema generacii na osnove nejroseti".center(68) + "=")
        print("=" + " "*68 + "=")
        print("="*70)
        
        try:
            # Шаг 1: Скачиваем портфолио
            portfolios = self.step1_scrape_portfolios()
            
            if len(portfolios) == 0:
                print("\n[FAIL] Ne udaos se dobiti portfolio!")
                return
            
            # Шаг 2: Скачиваем PDF (опционально)
            # self.step2_download_pdfs(portfolios)
            
            # Шаг 3: Анализируем дизайн
            analyzer = self.step3_analyze_designs(portfolios)
            
            # Шаг 4: Обучаем нейросеть
            generator = self.step4_train_neural_net(analyzer)
            
            # Шаг 5: Генерируем дизайны
            designs = self.step5_generate_designs(generator, count=generate_count)
            
            # Шаг 6: Экспортируем
            self.step6_visualize_and_export(designs)
            
            # Шаг 7: Создаём галерею
            gallery_path = self.step7_create_gallery(designs)
            
            # Финальная статистика
            print("\n" + "="*70)
            print("[OK] GENERIRANJE ZAVERSENO USPESNO!")
            print("="*70)
            print(f"\nRezultati sacuvani u: {self.output_dir}")
            print(f"\nSkachivajte:")
            print(f"  * Galerija: file:///{os.path.abspath(gallery_path).replace(chr(92), '/')}")
            print(f"  * Otdelni dizajni u formatu HTML i PDF")
            print(f"\nUkupno dizajna: {generate_count}")
            print("="*70 + "\n")
            
        except Exception as e:
            print(f"\n[ERROR] Greska: {e}")
            import traceback
            traceback.print_exc()

if __name__ == '__main__':
    generator = AIPortfolioGeneratorV2()
    
    # Запускаем полный цикл с генерацией 10 дизайнов
    generator.run_full_pipeline(generate_count=10)
