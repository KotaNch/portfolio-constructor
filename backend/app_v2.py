from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from portfolio_generator import PortfolioGenerator
from scraper import FTCPortfolioScraper
from portfolio_design_neural import PortfolioMixGenerator, PortfolioDesignAnalyzer
from portfolio_visualizer import PortfolioDesignVisualizer
import os
import json
import io
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Инициализация генератора портфолио
generator = PortfolioGenerator(use_ftc_data=True)

# Инициализация AI компонентов (ленивая загрузка)
ai_generator = None
visualizer = PortfolioDesignVisualizer()

def get_ai_generator():
    """Ленивая инициализация AI генератора"""
    global ai_generator
    if ai_generator is None:
        try:
            # Загружаем портфолио
            portfolios_path = os.path.join(
                os.path.dirname(__file__), 
                'data', 
                'ftc_portfolios.json'
            )
            if os.path.exists(portfolios_path):
                with open(portfolios_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    portfolios = data.get('portfolios', []) if isinstance(data, dict) else data
                    ai_generator = PortfolioMixGenerator(portfolios)
        except Exception as e:
            print(f"Ошибка инициализации AI: {e}")
    return ai_generator

@app.route('/api/health', methods=['GET'])
def health():
    """Проверка статуса API"""
    try:
        portfolios = generator.get_all_portfolios()
        return jsonify({
            'status': 'ok',
            'total_portfolios': len(portfolios),
            'ai_enabled': True,
            'features': ['search', 'generate', 'ai-mix', 'download']
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/search-ftc', methods=['GET'])
def search_ftc():
    """Поиск портфолио по запросу"""
    try:
        query = request.args.get('q', '')
        limit = int(request.args.get('limit', 10))
        
        results = generator.search_ftc_portfolios(query, limit)
        return jsonify({
            'success': True,
            'query': query,
            'results': results,
            'count': len(results)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/portfolios', methods=['GET'])
def get_portfolios():
    """Получить все портфолио"""
    try:
        limit = int(request.args.get('limit', 50))
        portfolios = generator.get_all_portfolios()[:limit]
        return jsonify({
            'success': True,
            'portfolios': portfolios,
            'count': len(portfolios)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/generate-portfolio', methods=['POST'])
def generate_portfolio():
    """Генерирует макеты портфолио на основе промта"""
    try:
        data = request.json
        prompt = data.get('prompt', '')
        count = int(data.get('count', 3))
        
        layouts = generator.generate_layouts(prompt, count)
        
        return jsonify({
            'success': True,
            'prompt': prompt,
            'layouts': layouts,
            'count': len(layouts)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/generate-ai-mix', methods=['POST'])
def generate_ai_mix():
    """Генерирует новые дизайны как микс успешных портфолио (AI)"""
    try:
        data = request.json
        count = int(data.get('count', 5))
        
        ai_gen = get_ai_generator()
        if ai_gen is None:
            return jsonify({'success': False, 'error': 'AI не инициализирован'}), 500
        
        designs = ai_gen.generate_mix_designs(count=count)
        
        return jsonify({
            'success': True,
            'count': len(designs),
            'designs': designs,
            'message': f'Сгенерировано {len(designs)} дизайнов на основе анализа успешных портфолио'
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/preview-design/<design_id>', methods=['GET'])
def preview_design():
    """Получить информацию о сгенерированном дизайне"""
    try:
        # Это обычно идёт как POST с дизайн данными
        return jsonify({'success': False, 'error': 'Используйте /api/design-to-html'}), 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/design-to-html', methods=['POST'])
def design_to_html():
    """Преобразует параметры дизайна в HTML"""
    try:
        design = request.json
        
        html = visualizer.generate_html_portfolio(design)
        
        return jsonify({
            'success': True,
            'html': html,
            'size': len(html)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/design-to-pdf', methods=['POST'])
def design_to_pdf():
    """Преобразует параметры дизайна в PDF и отправляет файл"""
    try:
        design = request.json
        
        pdf_bytes = visualizer.generate_pdf_portfolio(design)
        
        # Создаём файловый объект для отправки
        pdf_io = io.BytesIO(pdf_bytes)
        
        design_name = design.get('name', 'portfolio').replace(' ', '_')
        
        return send_file(
            pdf_io,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'{design_name}.pdf'
        )
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/download-portfolio/<team_number>-<portfolio_type>', methods=['GET'])
def download_portfolio(team_number, portfolio_type):
    """Скачивает оригинальное портфолио в формате PDF"""
    try:
        portfolios = generator.get_all_portfolios()
        portfolio = None
        
        for p in portfolios:
            if p['team_number'] == team_number and p.get('portfolio_type') == portfolio_type:
                portfolio = p
                break
        
        if not portfolio:
            return jsonify({'success': False, 'error': 'Портфолио не найдено'}), 404
        
        pdf_url = portfolio.get('pdf_url')
        if not pdf_url:
            return jsonify({'success': False, 'error': 'PDF URL не найден'}), 404
        
        # Скачиваем PDF с CDN
        pdf_bytes = generator.download_original_pdf(pdf_url)
        
        if not pdf_bytes:
            return jsonify({'success': False, 'error': 'Не удалось скачать PDF'}), 500
        
        pdf_io = io.BytesIO(pdf_bytes)
        
        return send_file(
            pdf_io,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'{team_number}_{portfolio_type}.pdf'
        )
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/scan-portfolios', methods=['POST'])
def scan_portfolios():
    """Сканирует сайт и обновляет базу портфолио"""
    try:
        scraper = FTCPortfolioScraper()
        portfolios = scraper.get_detailed_info()
        scraper.save_to_json()
        
        return jsonify({
            'success': True,
            'message': 'База портфолио обновлена',
            'count': len(portfolios)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Получить статистику по портфолио"""
    try:
        portfolios = generator.get_all_portfolios()
        
        # Анализируем портфолио
        analyzer = PortfolioDesignAnalyzer(portfolios)
        
        achievements = {}
        for p in portfolios:
            ach = p.get('achievement', 'Unknown')
            achievements[ach] = achievements.get(ach, 0) + 1
        
        return jsonify({
            'success': True,
            'total_portfolios': len(portfolios),
            'design_patterns': len(analyzer.DESIGN_PATTERNS),
            'color_schemes': len(analyzer.POPULAR_COLOR_SCHEMES),
            'font_combinations': len(analyzer.FONT_COMBINATIONS),
            'achievements': achievements
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
