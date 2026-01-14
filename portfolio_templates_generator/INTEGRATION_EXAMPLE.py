"""
Пример интеграции PDF Templates Generator с основным приложением
"""

# Добавьте этот код в backend/app.py

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'portfolio_templates_generator'))

try:
    from search_engine import TemplateSearchEngine
    
    # Инициализируем поисковый движок
    TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), '..', 'portfolio_templates_generator')
    templates_engine = TemplateSearchEngine(
        metadata_dir=os.path.join(TEMPLATES_DIR, 'pdf_templates', 'metadata'),
        index_file=os.path.join(TEMPLATES_DIR, 'pdf_templates', 'index.json')
    )
    TEMPLATES_AVAILABLE = True
except Exception as e:
    print(f"⚠️  PDF Templates Generator не найден: {e}")
    TEMPLATES_AVAILABLE = False

# =============== ДОБАВЬТЕ ЭТИ МАРШРУТЫ В app.py ===============

def register_templates_routes(app):
    """Регистрирует маршруты для работы с PDF шаблонами"""
    
    @app.route('/api/templates/search', methods=['POST'])
    def search_templates():
        """Поиск PDF шаблонов по промту"""
        if not TEMPLATES_AVAILABLE:
            return jsonify({'error': 'PDF Templates Generator не инициализирован'}), 503
        
        data = request.json
        prompt = data.get('prompt', '')
        limit = data.get('limit', 5)
        
        if not prompt:
            return jsonify({'error': 'Промт не может быть пустым'}), 400
        
        try:
            results = templates_engine.search(prompt, limit=limit)
            
            return jsonify({
                'success': True,
                'query': prompt,
                'count': len(results),
                'templates': results
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/templates/random', methods=['GET'])
    def get_random_templates():
        """Получает случайные PDF шаблоны"""
        if not TEMPLATES_AVAILABLE:
            return jsonify({'error': 'PDF Templates Generator не инициализирован'}), 503
        
        count = request.args.get('count', 5, type=int)
        
        try:
            results = templates_engine.get_random(count=count)
            
            return jsonify({
                'success': True,
                'count': len(results),
                'templates': results
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/templates/info', methods=['GET'])
    def templates_info():
        """Информация о доступных PDF шаблонах"""
        if not TEMPLATES_AVAILABLE:
            return jsonify({
                'status': 'not_available',
                'message': 'PDF Templates Generator не инициализирован'
            }), 503
        
        try:
            info = templates_engine.get_info()
            
            return jsonify({
                'status': 'available',
                'total_templates': info['total_templates'],
                'layout_types': info['layout_types'],
                'message': f'{info["total_templates"]} готовых PDF шаблонов'
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/templates/download/<template_id>', methods=['GET'])
    def download_template(template_id):
        """Скачивает PDF шаблон"""
        if not TEMPLATES_AVAILABLE:
            return jsonify({'error': 'PDF Templates Generator не инициализирован'}), 503
        
        try:
            pdf_path = os.path.join(TEMPLATES_DIR, 'pdf_templates', f'{template_id}.pdf')
            
            if not os.path.exists(pdf_path):
                return jsonify({'error': 'Шаблон не найден'}), 404
            
            # Проверяем безопасность пути
            real_path = os.path.realpath(pdf_path)
            real_templates_dir = os.path.realpath(os.path.join(TEMPLATES_DIR, 'pdf_templates'))
            
            if not real_path.startswith(real_templates_dir):
                return jsonify({'error': 'Доступ запрещен'}), 403
            
            return send_file(
                pdf_path,
                as_attachment=True,
                download_name=f'{template_id}.pdf',
                mimetype='application/pdf'
            )
        except Exception as e:
            return jsonify({'error': str(e)}), 500

# =============== В ГЛАВНОМ app.py ДОБАВЬТЕ ===============
# if __name__ == '__main__':
#     # ... остальной код ...
#     
#     # Регистрируем маршруты для шаблонов
#     from integrations.pdf_templates_integration import register_templates_routes
#     register_templates_routes(app)
#     
#     app.run(debug=True, host='0.0.0.0', port=5000)

# =============== ПРИМЕР ИСПОЛЬЗОВАНИЯ В JAVASCRIPT ===============
"""
// Поиск шаблонов по промту
fetch('http://localhost:5000/api/templates/search', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    prompt: 'Современный синий минималистичный дизайн',
    limit: 5
  })
})
.then(r => r.json())
.then(data => {
  console.log('Найдено шаблонов:', data.count);
  data.templates.forEach(t => {
    console.log(`${t.filename}: релевантность ${(t.relevance_score * 100).toFixed(0)}%`);
  });
});

// Получить случайные
fetch('http://localhost:5000/api/templates/random?count=3')
  .then(r => r.json())
  .then(data => console.log(data));

// Информация о системе
fetch('http://localhost:5000/api/templates/info')
  .then(r => r.json())
  .then(data => console.log(`Доступно ${data.total_templates} шаблонов`));

// Скачать шаблон
window.location.href = 'http://localhost:5000/api/templates/download/template_00001';
"""
