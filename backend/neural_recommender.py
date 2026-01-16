#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Нейросетевой рекомендатель портфолио
Использует sentence-transformers для семантического поиска вместо простого TF-IDF
"""

import json
import os
import numpy as np
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Попытка импортировать sentence-transformers
try:
    from sentence_transformers import SentenceTransformer
    SENTENCE_TRANSFORMERS_AVAILABLE = True
except ImportError:
    SENTENCE_TRANSFORMERS_AVAILABLE = False
    logger.warning("sentence-transformers не установлен. Используется fallback на TF-IDF")

METADATA_JSON = os.path.join(os.path.dirname(__file__), 'data', 'final_portfolios.json')

class NeuralPortfolioRecommender:
    """
    Нейросетевой рекомендатель портфолио на основе семантического поиска
    """
    
    def __init__(self, metadata_path: str = METADATA_JSON, model_name: str = None):
        """
        Инициализация рекомендателя
        
        Args:
            metadata_path: Путь к JSON файлу с портфолио
            model_name: Название модели sentence-transformers (по умолчанию многоязычная модель)
        """
        self.items = self._load_metadata(metadata_path)
        self.embeddings = None
        self.model = None
        
        if SENTENCE_TRANSFORMERS_AVAILABLE:
            # Используем многоязычную модель для поддержки русского и английского
            if model_name is None:
                model_name = 'paraphrase-multilingual-MiniLM-L12-v2'
            
            try:
                logger.info(f"Загрузка модели {model_name}...")
                self.model = SentenceTransformer(model_name)
                logger.info("Модель загружена успешно")
                self._build_embeddings()
            except Exception as e:
                logger.error(f"Ошибка при загрузке модели: {e}")
                logger.warning("Используется fallback на TF-IDF")
                self.model = None
        else:
            logger.warning("sentence-transformers недоступен, используется fallback")
            self._build_tfidf_fallback()
    
    def _load_metadata(self, path: str) -> List[Dict]:
        """Загружает метаданные портфолио"""
        try:
            with open(path, encoding='utf-8') as f:
                data = json.load(f)
            
            if isinstance(data, dict) and data.get('entries') is not None:
                items = data['entries']
            elif isinstance(data, dict) and data.get('portfolios') is not None:
                items = data['portfolios']
            else:
                items = data.get('entries') or data.get('portfolios') or data
            
            logger.info(f"Загружено {len(items)} портфолио")
            return items
        except Exception as e:
            logger.error(f"Ошибка при загрузке метаданных: {e}")
            return []
    
    def _build_text_representation(self, item: Dict) -> str:
        """
        Создает текстовое представление портфолио для эмбеддинга
        Объединяет описание, теги и прилагательные дизайна
        УЛУЧШЕНО: повторяет важные ключевые слова для повышения точности
        """
        parts = []
        
        # Описание (самое важное - добавляем первым и с большим весом)
        description = item.get('description', '')
        if description:
            parts.append(description)
            parts.append(description)  # Повторяем для увеличения веса
        
        # Теги (очень важны - повторяем несколько раз)
        tags = item.get('tags', [])
        if isinstance(tags, list) and tags:
            tags_str = ' '.join(tags)
            parts.append(tags_str)
            parts.append(tags_str)  # Повторяем теги для увеличения веса
            # Добавляем каждый тег отдельно для лучшего поиска
            for tag in tags[:10]:  # Берем первые 10 тегов
                parts.append(tag)
        
        # Прилагательные дизайна (английские и русские) - повторяем
        design_en = item.get('design_adjectives_en', [])
        design_ru = item.get('design_adjectives_ru', [])
        if isinstance(design_en, list) and design_en:
            design_en_str = ' '.join(design_en)
            parts.append(design_en_str)
            parts.append(design_en_str)  # Повторяем
        if isinstance(design_ru, list) and design_ru:
            design_ru_str = ' '.join(design_ru)
            parts.append(design_ru_str)
            parts.append(design_ru_str)  # Повторяем
        
        # Название команды
        team_name = item.get('team_name', '')
        if team_name:
            parts.append(team_name)
        
        # Тип портфолио и достижение (повторяем для важности)
        portfolio_type = item.get('portfolio_type', '')
        achievement = item.get('achievement', '')
        if portfolio_type:
            parts.append(portfolio_type)
            parts.append(portfolio_type)  # Повторяем
        if achievement:
            parts.append(achievement)
            parts.append(achievement)  # Повторяем
        
        return ' '.join(parts)
    
    def _build_embeddings(self):
        """Строит эмбеддинги для всех портфолио"""
        if not self.model:
            return
        
        logger.info("Построение эмбеддингов для портфолио...")
        texts = []
        for item in self.items:
            text = self._build_text_representation(item)
            texts.append(text)
        
        # Генерируем эмбеддинги батчами для экономии памяти
        batch_size = 32
        embeddings_list = []
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            batch_embeddings = self.model.encode(
                batch,
                show_progress_bar=False,
                convert_to_numpy=True,
                normalize_embeddings=True
            )
            embeddings_list.append(batch_embeddings)
        
        self.embeddings = np.vstack(embeddings_list)
        logger.info(f"Эмбеддинги построены: {self.embeddings.shape}")
    
    def _build_tfidf_fallback(self):
        """Fallback на TF-IDF если нейросеть недоступна"""
        try:
            from sklearn.feature_extraction.text import TfidfVectorizer
            from sklearn.preprocessing import normalize
            
            texts = []
            for item in self.items:
                text = self._build_text_representation(item)
                texts.append(text)
            
            self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
            self.tfidf_matrix = self.vectorizer.fit_transform(texts)
            self.tfidf_matrix = normalize(self.tfidf_matrix, norm='l2', axis=1)
            logger.info("TF-IDF fallback инициализирован")
        except Exception as e:
            logger.error(f"Ошибка при инициализации TF-IDF fallback: {e}")
            self.vectorizer = None
            self.tfidf_matrix = None
    
    def _compute_similarity(self, query: str) -> np.ndarray:
        """
        Вычисляет семантическое сходство между запросом и портфолио
        
        Returns:
            Массив оценок сходства для каждого портфолио
        """
        if self.model and self.embeddings is not None:
            # Используем нейросеть
            query_embedding = self.model.encode(
                [query],
                convert_to_numpy=True,
                normalize_embeddings=True
            )[0]
            
            # Косинусное сходство
            similarities = np.dot(self.embeddings, query_embedding)
            return similarities
        elif hasattr(self, 'vectorizer') and self.vectorizer is not None:
            # Fallback на TF-IDF
            from sklearn.preprocessing import normalize
            query_vector = self.vectorizer.transform([query])
            query_vector = normalize(query_vector, norm='l2', axis=1)
            similarities = (self.tfidf_matrix @ query_vector.T).toarray().ravel()
            return similarities
        else:
            # Если ничего не работает, возвращаем нули
            logger.warning("Нейросеть и TF-IDF недоступны, возвращаем нулевые оценки")
            return np.zeros(len(self.items))
    
    def _jaccard_score(self, user_tags: List[str], item_tags: List[str]) -> float:
        """Вычисляет Jaccard сходство между тегами"""
        if not user_tags:
            return 0.0
        
        a = set([t.lower() for t in user_tags])
        b = set([t.lower() for t in (item_tags or [])])
        inter = len(a & b)
        union = len(a | b)
        return inter / union if union > 0 else 0.0
    
    def _design_score(self, user_design_adjs: List[str], item_design_adjs: List[str]) -> float:
        """Вычисляет сходство по прилагательным дизайна"""
        if not user_design_adjs:
            return 0.0
        
        a = set([t.lower() for t in user_design_adjs])
        b = set([t.lower() for t in (item_design_adjs or [])])
        inter = len(a & b)
        return inter / len(a) if len(a) > 0 else 0.0
    
    def recommend(
        self,
        prompt: str,
        user_tags: Optional[List[str]] = None,
        user_design_adjs: Optional[List[str]] = None,
        top_n: int = 3,
        weights: Optional[Dict[str, float]] = None
    ) -> List[Dict]:
        """
        Рекомендует топ N портфолио на основе промта и опциональных фильтров
        
        Args:
            prompt: Текстовый запрос пользователя
            user_tags: Опциональные теги для фильтрации
            user_design_adjs: Опциональные прилагательные дизайна
            top_n: Количество результатов
            weights: Веса для разных компонентов оценки (text, tags, design)
        
        Returns:
            Список рекомендованных портфолио с оценками
        """
        if weights is None:
            # Увеличиваем вес текстового поиска для более точного выбора
            weights = {'text': 0.85, 'tags': 0.1, 'design': 0.05}
        
        # Семантическое сходство по тексту
        text_similarities = self._compute_similarity(prompt) if prompt else np.zeros(len(self.items))
        
        results = []
        for i, item in enumerate(self.items):
            # Оценка по тегам
            tag_score = self._jaccard_score(user_tags or [], item.get('tags', []))
            
            # Оценка по прилагательным дизайна
            item_design = []
            if item.get('design_adjectives_en'):
                item_design += item.get('design_adjectives_en')
            if item.get('design_adjectives_ru'):
                item_design += item.get('design_adjectives_ru')
            design_score = self._design_score(user_design_adjs or [], item_design)
            
            # Итоговая оценка
            total_score = (
                weights['text'] * float(text_similarities[i]) +
                weights['tags'] * float(tag_score) +
                weights['design'] * float(design_score)
            )
            
            results.append({
                'index': i,
                'id': item.get('id') or item.get('team_number') or f"idx_{i}",
                'team_name': item.get('team_name'),
                'score': total_score,
                'components': {
                    'text_sim': float(text_similarities[i]),
                    'tag_score': float(tag_score),
                    'design_score': float(design_score)
                },
                'pdf_url': item.get('pdf_url') or item.get('pdf_path_local'),
                'thumbnail_url': item.get('thumbnail_url') or item.get('thumbnail_path'),
                'metadata': item
            })
        
        # Сортируем по убыванию оценки
        results.sort(key=lambda x: x['score'], reverse=True)
        
        return results[:top_n]


def build_neural_recommender(metadata_path: str = METADATA_JSON) -> NeuralPortfolioRecommender:
    """Удобная функция для создания рекомендателя"""
    return NeuralPortfolioRecommender(metadata_path)
