from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from portfolio_generator import PortfolioGenerator
from portfolio_visualizer import PortfolioDesignVisualizer
from scraper import FTCPortfolioScraper
from layout_generator import PortfolioLayoutGenerator
import os
import json

# Определяем пути
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), 'frontend')

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path='')
CORS(app)

from recommender import build_recommender

# Initialize recommender (с нейросетью по умолчанию)
recommender = build_recommender(use_neural=True)

# Initialize layout generator
layout_generator = PortfolioLayoutGenerator()

# Инициализация генератора портфолио с поддержкой FTC данных
generator = PortfolioGenerator(use_ftc_data=True)
visualizer = PortfolioDesignVisualizer()

# =============== СТАТИЧЕСКИЕ ФАЙЛЫ ===============
@app.route('/')
def index():
    """Главная страница"""
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Раздача статических файлов (CSS, JS, images)"""
    return send_from_directory(FRONTEND_DIR, filename)

# =============== API МАРШРУТЫ ===============
@app.route('/api/generate-portfolio', methods=['POST'])
def generate_portfolio():
    """
    Генерирует 3 примера макетов портфолио на основе промта
    ВОССТАНОВЛЕНО: СТАРЫЙ РАБОЧИЙ МЕТОД
    """
    try:
        data = request.json
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'Промт не может быть пустым'}), 400
        
        # Генерируем 3 примера портфолио
        portfolios = generator.generate_layouts(prompt, num_examples=3)
        
        return jsonify({
            'success': True,
            'portfolios': portfolios
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-html', methods=['POST'])
def generate_html():
    """
    Генерирует HTML портфолио на основе параметров дизайна
    НОВЫЙ МЕТОД: использует PortfolioDesignVisualizer
    """
    try:
        data = request.json
        design = data.get('design', {})
        portfolio_data = data.get('portfolio_data', None)
        
        if not design:
            return jsonify({'error': 'Параметры дизайна не переданы'}), 400
        
        # Генерируем HTML
        html = visualizer.generate_html_portfolio(design, portfolio_data)
        
        return jsonify({
            'success': True,
            'html': html,
            'design_id': design.get('id', 'generated')
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-html-bulk', methods=['POST'])
def generate_html_bulk():
    """
    Генерирует несколько HTML портфолио за раз
    """
    try:
        data = request.json
        designs = data.get('designs', [])
        portfolio_data = data.get('portfolio_data', None)
        
        if not designs:
            return jsonify({'error': 'Дизайны не переданы'}), 400
        
        results = []
        for design in designs:
            try:
                html = visualizer.generate_html_portfolio(design, portfolio_data)
                results.append({
                    'success': True,
                    'design_id': design.get('id', 'generated'),
                    'html': html
                })
            except Exception as e:
                results.append({
                    'success': False,
                    'design_id': design.get('id', 'generated'),
                    'error': str(e)
                })
        
        return jsonify({
            'success': True,
            'total': len(designs),
            'generated': sum(1 for r in results if r['success']),
            'results': results
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-ai-mix', methods=['POST', 'OPTIONS'])
def generate_ai_mix():
    """
    Генерирует портфолио с использованием ИИ микса
    ВОССТАНОВЛЕНО: СТАРЫЙ РАБОЧИЙ МЕТОД
    """
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.json
        count = data.get('count', 3)
        
        # Генерируем портфолио
        templates = generator.generate_layouts("", num_examples=count)
        
        # Преобразуем в формат, ожидаемый фронтенд
        designs = []
        for i, template in enumerate(templates):
            colors = template.get('colorScheme', ['#0066cc', '#ffffff', '#333333'])
            design = {
                'id': f'design_{i+1}',
                'name': template.get('name', f'Design {i+1}'),
                'pattern': 'neural_mix',
                'pattern_confidence': template.get('relevance_score', 0.9),
                'colors': {
                    'primary': colors[0] if len(colors) > 0 else '#0066cc',
                    'secondary': colors[1] if len(colors) > 1 else '#ffffff',
                    'accent': colors[2] if len(colors) > 2 else '#333333'
                }
            }
            designs.append(design)
        
        return jsonify({
            'success': True,
            'count': len(designs),
            'designs': designs
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-pdf-ftc', methods=['POST'])
def generate_pdf_ftc():
    """
    Генерирует PDF на основе FTC портфолио
    ВОССТАНОВЛЕНО: СТАРЫЙ РАБОЧИЙ МЕТОД
    """
    try:
        data = request.json
        portfolio_data = data.get('portfolio_data', {})
        
        if not portfolio_data:
            return jsonify({'error': 'Данные портфолио не переданы'}), 400
        
        # Генерируем PDF
        pdf_buffer = visualizer.generate_pdf_from_ftc_portfolio(portfolio_data)
        
        team_number = portfolio_data.get('team_number', 'unknown')
        portfolio_type = portfolio_data.get('portfolio_type', 'unknown')
        filename = f"FTC_{team_number}_{portfolio_type}.pdf"
        
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search-ftc', methods=['GET'])
def search_ftc_portfolios():
    """
    Поиск портфолио команд FTC по названию или номеру
    ВОССТАНОВЛЕНО: СТАРЫЙ РАБОЧИЙ МЕТОД
    """
    try:
        query = request.args.get('q', '')
        limit = request.args.get('limit', 10, type=int)
        
        if not query:
            # Если нет запроса, возвращаем все портфолио
            portfolios = generator.get_all_ftc_portfolios(limit)
        else:
            portfolios = generator.search_ftc_portfolios(query, limit)
        
        return jsonify({
            'success': True,
            'count': len(portfolios),
            'portfolios': portfolios
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ftc-portfolio/<team_number>-<portfolio_type>', methods=['GET'])
def get_ftc_portfolio(team_number, portfolio_type):
    """
    Получает конкретное портфолио команды FTC
    ВОССТАНОВЛЕНО: СТАРЫЙ РАБОЧИЙ МЕТОД
    """
    try:
        full_type = f"{team_number}-{portfolio_type}"
        
        # Ищем портфолио в загруженных данных
        portfolios = generator.get_all_ftc_portfolios()
        portfolio = None
        
        for p in portfolios:
            if (p.get('team_number') == team_number and 
                p.get('portfolio_type') == portfolio_type):
                portfolio = p
                break
        
        if not portfolio:
            return jsonify({'error': 'Портфолио не найдено'}), 404
        
        return jsonify({
            'success': True,
            'portfolio': portfolio
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-portfolio/<team_number>-<portfolio_type>', methods=['GET'])
def download_portfolio(team_number, portfolio_type):
    """
    Скачивает оригинальный PDF портфолио
    ВОССТАНОВЛЕНО: СТАРЫЙ РАБОЧИЙ МЕТОД
    """
    try:
        # Ищем портфолио
        portfolios = generator.get_all_ftc_portfolios()
        portfolio = None
        
        for p in portfolios:
            if (p.get('team_number') == team_number and 
                p.get('portfolio_type') == portfolio_type):
                portfolio = p
                break
        
        if not portfolio:
            return jsonify({'error': 'Портфолио не найдено'}), 404
        
        pdf_url = portfolio.get('pdf_url')
        if not pdf_url:
            return jsonify({'error': 'URL портфолио недоступен'}), 400
        
        # Загружаем оригинальный PDF
        pdf_buffer = visualizer.download_original_pdf(pdf_url)
        
        if not pdf_buffer:
            return jsonify({'error': 'Не удалось загрузить портфолио'}), 500
        
        filename = f"FTC_{portfolio.get('team_number')}_{portfolio.get('portfolio_type')}.pdf"
        
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/scan-portfolios', methods=['POST'])
def scan_portfolios():
    """
    Сканирует сайт и обновляет базу портфолио (может занять время)
    """
    try:
        scraper = FTCPortfolioScraper()
        print("Начинаем сканирование портфолио...")
        scraper.scrape_portfolios()
        output_path = scraper.save_to_json('ftc_portfolios.json', detailed=True)
        
        # Перезагружаем генератор с новыми данными
        global generator
        generator = PortfolioGenerator(use_ftc_data=True)
        
        portfolios = generator.get_all_ftc_portfolios()
        
        return jsonify({
            'success': True,
            'message': 'Портфолио успешно обновлены',
            'total_count': len(portfolios)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-template/<portfolio_id>', methods=['GET'])
def download_template_pdf(portfolio_id):
    """Скачивание PDF шаблона"""
    try:
        # Генерируем PDF портфолио
        from reportlab.lib.pagesizes import letter
        from reportlab.lib.units import inch
        from reportlab.pdfgen import canvas
        from io import BytesIO
        
        pdf_buffer = BytesIO()
        c = canvas.Canvas(pdf_buffer, pagesize=letter)
        width, height = letter
        
        # Заголовок
        c.setFont("Helvetica-Bold", 24)
        c.drawString(inch, height - inch, "Portfolio - " + portfolio_id)
        
        # Информация
        c.setFont("Helvetica", 12)
        c.drawString(inch, height - 1.5*inch, "Generated portfolio")
        c.drawString(inch, height - 2*inch, "FTC Portfolio Constructor")
        
        c.save()
        pdf_buffer.seek(0)
        
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'portfolio-{portfolio_id}.pdf'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Проверка здоровья сервера"""
    ftc_count = len(generator.get_all_ftc_portfolios())
    return jsonify({
        'status': 'ok',
        'ftc_portfolios_loaded': ftc_count > 0,
        'total_ftc_portfolios': ftc_count
    }), 200



@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    """
    Recommend top N portfolios for a given prompt, optional tags and design adjectives.
    Payload: { "prompt": "...", "tags": ["tag1","tag2"], "design_adjectives": ["minimal","blue"], "top_n": 3 }
    """
    try:
        payload = request.get_json(force=True)
        prompt = payload.get('prompt','')
        tags = payload.get('tags', [])
        design = payload.get('design_adjectives', [])
        top_n = int(payload.get('top_n', 3))
        weights = payload.get('weights')  # optional dict

        results = recommender.recommend(prompt, user_tags=tags, user_design_adjs=design, top_n=top_n, weights=weights)
        # prepare response
        out = []
        for r in results:
            m = r['metadata']
            out.append({
                'id': r['id'],
                'team_name': r.get('team_name'),
                'score': r['score'],
                'components': r['components'],
                'pdf_url': r['pdf_url'],
                'thumbnail_url': r['thumbnail_url'],
                'description': m.get('description',''),
                'tags': m.get('tags', []),
                'design_adjectives_en': m.get('design_adjectives_en', []),
                'design_adjectives_ru': m.get('design_adjectives_ru', []),
                'templates': m.get('templates', [])
            })
        return jsonify({'results': out}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-layouts', methods=['POST'])
def generate_layouts():
    """
    Находит подходящие портфолио на основе промта и возвращает реальные данные
    Использует нейросеть для поиска подходящих портфолио
    Payload: { "prompt": "...", "count": 3 }
    """
    try:
        payload = request.get_json(force=True)
        prompt = payload.get('prompt', '')
        count = int(payload.get('count', 3))
        
        if not prompt or len(prompt.strip()) < 10:
            return jsonify({'error': 'Промт должен содержать минимум 10 символов'}), 400
        
        # Находим подходящие портфолио с помощью нейросети
        recommended = recommender.recommend(prompt, top_n=count)
        
        if not recommended:
            return jsonify({'error': 'Не найдено подходящих портфолио'}), 404
        
        # Формируем ответ с реальными данными портфолио
        result = {
            'success': True,
            'count': len(recommended),
            'portfolios': []
        }
        
        for i, portfolio in enumerate(recommended):
            # Извлекаем метаданные
            metadata = portfolio.get('metadata', {})
            
            # Формируем данные портфолио с расширенным описанием
            description = metadata.get('description', '')
            tags = metadata.get('tags', [])
            design_en = metadata.get('design_adjectives_en', [])
            design_ru = metadata.get('design_adjectives_ru', [])
            
            # Создаем расширенное описание
            extended_description = description
            if tags:
                extended_description += f"\n\nТеги: {', '.join(tags[:15])}"  # Первые 15 тегов
            if design_en or design_ru:
                design_all = design_en + design_ru
                extended_description += f"\n\nСтиль дизайна: {', '.join(design_all[:10])}"  # Первые 10 прилагательных
            
            portfolio_data = {
                'id': portfolio.get('id'),
                'team_name': portfolio.get('team_name') or metadata.get('team_name', ''),
                'team_number': metadata.get('team_number', ''),
                'achievement': metadata.get('achievement', ''),
                'portfolio_type': metadata.get('portfolio_type', ''),
                'thumbnail_url': portfolio.get('thumbnail_url') or metadata.get('thumbnail_url', ''),
                'pdf_url': portfolio.get('pdf_url') or metadata.get('pdf_url', ''),
                'description': description,  # Оригинальное описание
                'extended_description': extended_description,  # Расширенное описание
                'tags': tags,
                'design_adjectives_en': design_en,
                'design_adjectives_ru': design_ru,
                'score': portfolio.get('score', 0.0),
                'components': portfolio.get('components', {}),
                # Информация о том, как был выбран этот портфолио
                'selection_info': {
                    'text_similarity': portfolio.get('components', {}).get('text_sim', 0.0),
                    'tag_match': portfolio.get('components', {}).get('tag_score', 0.0),
                    'design_match': portfolio.get('components', {}).get('design_score', 0.0),
                    'method': 'neural_network' if (hasattr(recommender, 'use_neural') and recommender.use_neural) or (hasattr(recommender, 'neural_recommender') and recommender.neural_recommender) else 'tfidf'
                },
                # 3 ссылки на шаблоны (пока заглушки, будут добавлены позже)
                'template_urls': [
                    None,  # Будет добавлено позже
                    None,  # Будет добавлено позже
                    None   # Будет добавлено позже
                ]
            }
            
            result['portfolios'].append(portfolio_data)
        
        return jsonify(result), 200
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

