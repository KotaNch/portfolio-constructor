"""
PDF Templates API
API для поиска и скачивания готовых PDF шаблонов
"""

import os
import json
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from search_engine import TemplateSearchEngine

app = Flask(__name__)
CORS(app)

# Инициализируем поисковый движок
search_engine = TemplateSearchEngine()
PDF_DIR = 'pdf_templates'

# =============== ИНФОРМАЦИЯ ===============
@app.route('/api/info', methods=['GET'])
def get_info():
    """Информация об индексе шаблонов"""
    info = search_engine.get_info()
    return jsonify({
        'status': 'ok',
        'templates_available': info['total_templates'],
        'layout_types': info['layout_types'],
        'message': f'{info["total_templates"]} шаблонов готово к использованию'
    }), 200

# =============== ПОИСК ===============
@app.route('/api/search', methods=['POST'])
def search_templates():
    """
    Поиск шаблонов по промту
    
    Пример запроса:
    {
        "prompt": "Нужен современный синий дизайн",
        "limit": 5
    }
    """
    data = request.json
    prompt = data.get('prompt', '')
    limit = data.get('limit', 5)
    
    if not prompt:
        return jsonify({'error': 'Промт не может быть пустым'}), 400
    
    try:
        results = search_engine.search(prompt, limit=limit)
        
        return jsonify({
            'success': True,
            'query': prompt,
            'count': len(results),
            'templates': results
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============== ПОИСК ПО ТЕГАМ ===============
@app.route('/api/search-by-tags', methods=['POST'])
def search_by_tags():
    """
    Поиск шаблонов по тегам
    
    Пример запроса:
    {
        "tags": ["синий", "минималистичный"],
        "limit": 10
    }
    """
    data = request.json
    tags = data.get('tags', [])
    limit = data.get('limit', 10)
    
    if not tags:
        return jsonify({'error': 'Теги не указаны'}), 400
    
    try:
        results = search_engine.get_by_tags(tags, limit=limit)
        
        return jsonify({
            'success': True,
            'tags': tags,
            'count': len(results),
            'templates': results
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============== ПО ТИПУ МАКЕТА ===============
@app.route('/api/layout/<layout_type>', methods=['GET'])
def get_by_layout(layout_type):
    """Получает шаблоны определённого типа макета"""
    limit = request.args.get('limit', 10, type=int)
    
    try:
        results = search_engine.get_by_layout(layout_type, limit=limit)
        
        return jsonify({
            'success': True,
            'layout_type': layout_type,
            'count': len(results),
            'templates': results
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============== СЛУЧАЙНЫЕ ===============
@app.route('/api/random', methods=['GET'])
def get_random():
    """Получает случайные шаблоны"""
    count = request.args.get('count', 5, type=int)
    
    try:
        results = search_engine.get_random(count=count)
        
        return jsonify({
            'success': True,
            'count': len(results),
            'templates': results
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============== СКАЧИВАНИЕ ===============
@app.route('/api/download/<template_id>', methods=['GET'])
def download_template(template_id):
    """Скачивает PDF шаблон"""
    try:
        pdf_path = os.path.join(PDF_DIR, f'{template_id}.pdf')
        
        if not os.path.exists(pdf_path):
            return jsonify({'error': 'Шаблон не найден'}), 404
        
        # Проверяем что путь внутри PDF_DIR (безопасность)
        real_path = os.path.realpath(pdf_path)
        real_pdf_dir = os.path.realpath(PDF_DIR)
        
        if not real_path.startswith(real_pdf_dir):
            return jsonify({'error': 'Доступ запрещен'}), 403
        
        return send_file(
            pdf_path,
            as_attachment=True,
            download_name=f'{template_id}.pdf',
            mimetype='application/pdf'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============== ПОЛУЧИТЬ МЕТАДАННЫЕ ===============
@app.route('/api/metadata/<template_id>', methods=['GET'])
def get_metadata(template_id):
    """Получает метаданные шаблона"""
    try:
        metadata_path = os.path.join(PDF_DIR, 'metadata', f'{template_id}.json')
        
        if not os.path.exists(metadata_path):
            return jsonify({'error': 'Метаданные не найдены'}), 404
        
        with open(metadata_path, 'r', encoding='utf-8') as f:
            metadata = json.load(f)
        
        return jsonify({
            'success': True,
            'metadata': metadata
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============== СПИСОК ВСЕХ ТИПОВ МАКЕТОВ ===============
@app.route('/api/layout-types', methods=['GET'])
def get_layout_types():
    """Получает список всех доступных типов макетов"""
    try:
        info = search_engine.get_info()
        
        return jsonify({
            'success': True,
            'layout_types': info['layout_types']
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =============== ЗДОРОВЬЕ ===============
@app.route('/api/health', methods=['GET'])
def health():
    """Проверка здоровья сервиса"""
    info = search_engine.get_info()
    
    return jsonify({
        'status': 'healthy',
        'templates_loaded': info['total_templates'],
        'service': 'PDF Templates API'
    }), 200

if __name__ == '__main__':
    print("\n" + "="*60)
    print("📚 PDF TEMPLATES API")
    print("="*60)
    print(f"✓ Загружено шаблонов: {search_engine.get_info()['total_templates']}")
    print("🚀 Запуск на http://localhost:5001")
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5001)
