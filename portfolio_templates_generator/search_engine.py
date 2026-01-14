"""
Template Search Engine
Система поиска подходящих шаблонов по промту
"""

import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class TemplateSearchEngine:
    def __init__(self, metadata_dir='pdf_templates/metadata', index_file='pdf_templates/index.json'):
        """Инициализация поискового движка"""
        self.metadata_dir = metadata_dir
        self.index_file = index_file
        self.templates = []
        self.template_texts = []
        self.vectorizer = TfidfVectorizer(lowercase=True)
        self.tfidf_matrix = None
        
        self._load_templates()
    
    def _load_templates(self):
        """Загружает все шаблоны и их метаданные"""
        print("📚 Загрузка метаданных шаблонов...")
        
        if os.path.exists(self.index_file):
            with open(self.index_file, 'r', encoding='utf-8') as f:
                index = json.load(f)
                self.templates = index.get('templates', [])
        
        # Создаем текстовые представления для каждого шаблона
        for template in self.templates:
            text = self._create_search_text(template)
            self.template_texts.append(text)
        
        # Если есть шаблоны - создаем TF-IDF матрицу
        if self.template_texts:
            self.tfidf_matrix = self.vectorizer.fit_transform(self.template_texts)
            print(f"✓ Загружено {len(self.templates)} шаблонов")
        else:
            print("⚠ Шаблоны не найдены. Запустите generate_templates.py первым")
    
    def _create_search_text(self, template):
        """Создает текст для поиска из метаданных"""
        parts = [
            template.get('layout_type', ''),
            template.get('description', ''),
            ' '.join(template.get('tags', [])),
        ]
        return ' '.join(parts).lower()
    
    def search(self, prompt, limit=5):
        """
        Ищет подходящие шаблоны по промту
        
        Args:
            prompt: Описание требований (на русском или английском)
            limit: Количество результатов
            
        Returns:
            Список найденных шаблонов с оценками релевантности
        """
        if self.tfidf_matrix is None or self.tfidf_matrix.shape[0] == 0:
            return []
        
        # Преобразуем промт в вектор
        prompt_vector = self.vectorizer.transform([prompt.lower()])
        
        # Вычисляем сходство
        similarities = cosine_similarity(prompt_vector, self.tfidf_matrix)[0]
        
        # Находим топ результаты
        top_indices = np.argsort(similarities)[::-1][:limit]
        
        results = []
        for idx in top_indices:
            score = float(similarities[idx])  # Конвертируем в обычный float
            if score > 0:  # Только если есть хоть какое-то совпадение
                template = self.templates[int(idx)].copy()
                template['relevance_score'] = score
                
                # Убедимся что теги это список строк
                if 'tags' in template and not isinstance(template['tags'], list):
                    template['tags'] = list(template['tags'])
                
                results.append(template)
        
        return results
    
    def get_by_tags(self, tags, limit=10):
        """
        Получает шаблоны по тегам
        
        Args:
            tags: Список тегов для поиска
            limit: Максимум результатов
            
        Returns:
            Список подходящих шаблонов
        """
        results = []
        for template in self.templates:
            template_tags = set(template.get('tags', []))
            search_tags = set(tags)
            
            # Считаем совпадение
            matches = len(template_tags & search_tags)
            if matches > 0:
                template_copy = template.copy()
                template_copy['matches'] = matches
                results.append(template_copy)
        
        # Сортируем по количеству совпадений
        results.sort(key=lambda x: x['matches'], reverse=True)
        return results[:limit]
    
    def get_by_layout(self, layout_type, limit=10):
        """Получает шаблоны по типу макета"""
        results = [t for t in self.templates if t.get('layout_type') == layout_type]
        return results[:limit]
    
    def get_random(self, count=5):
        """Получает случайные шаблоны"""
        import random
        if len(self.templates) < count:
            return self.templates
        return random.sample(self.templates, count)
    
    def get_info(self):
        """Возвращает информацию об индексе"""
        return {
            'total_templates': len(self.templates),
            'layout_types': list(set(t.get('layout_type') for t in self.templates)),
            'total_tags': len(set(tag for t in self.templates for tag in t.get('tags', []))),
        }


def test_search():
    """Тестирует поисковую систему"""
    engine = TemplateSearchEngine()
    
    test_prompts = [
        'Современный синий дизайн',
        'Творческий и яркий макет',
        'Профессиональный корпоративный стиль',
        'Минималистичный чистый дизайн',
        'Технологичный для IT проекта',
    ]
    
    print("\n" + "="*60)
    print("🔍 ТЕСТИРОВАНИЕ ПОИСКА")
    print("="*60)
    
    for prompt in test_prompts:
        print(f"\n📝 Промт: '{prompt}'")
        results = engine.search(prompt, limit=3)
        
        for i, result in enumerate(results, 1):
            print(f"  {i}. {result['filename']}")
            print(f"     Макет: {result['layout_type']}")
            print(f"     Релевантность: {result['relevance_score']:.2%}")
            print(f"     Теги: {', '.join(result['tags'][:3])}")

if __name__ == '__main__':
    test_search()
