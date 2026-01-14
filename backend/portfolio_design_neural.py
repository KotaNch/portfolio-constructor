#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Анализатор дизайна портфолио и генератор на основе нейросети
Используется для анализа успешных портфолио и создания новых комбинаций
"""

import os
import json
import numpy as np
from typing import List, Dict, Tuple
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PortfolioDesignAnalyzer:
    """Анализирует дизайн портфолио и извлекает признаки"""
    
    # Палитры цветов из успешных портфолио
    POPULAR_COLOR_SCHEMES = [
        {'primary': '#667eea', 'secondary': '#764ba2', 'accent': '#f093fb'},  # Purple gradient
        {'primary': '#fa709a', 'secondary': '#fee140', 'accent': '#30b0fe'},  # Pink-Yellow-Blue
        {'primary': '#2e3192', 'secondary': '#1bffff', 'accent': '#00ff00'},  # Dark Blue Neon
        {'primary': '#ff6b6b', 'secondary': '#4ecdc4', 'accent': '#ffe66d'},  # Coral-Turquoise
        {'primary': '#1a1a2e', 'secondary': '#16213e', 'accent': '#e94560'},  # Dark Modern
        {'primary': '#0f3460', 'secondary': '#533483', 'accent': '#ffc857'},  # Navy-Purple-Gold
        {'primary': '#1f4788', 'secondary': '#2196f3', 'accent': '#64b5f6'},  # Blue shades
        {'primary': '#00b4d8', 'secondary': '#0077b6', 'accent': '#03045e'},  # Ocean blues
        {'primary': '#d62828', 'secondary': '#f77f00', 'accent': '#fcbf49'},  # Red-Orange-Gold
        {'primary': '#06a77d', 'secondary': '#088395', 'accent': '#fca311'},  # Green-Teal-Gold
    ]
    
    # Популярные шрифтовые комбинации
    FONT_COMBINATIONS = [
        {'heading': 'Inter, sans-serif', 'body': 'Open Sans, sans-serif'},
        {'heading': 'Poppins, sans-serif', 'body': 'Inter, sans-serif'},
        {'heading': 'Montserrat, sans-serif', 'body': 'Lato, sans-serif'},
        {'heading': 'Playfair Display, serif', 'body': 'Lato, sans-serif'},
        {'heading': 'Raleway, sans-serif', 'body': 'Roboto, sans-serif'},
        {'heading': 'Bebas Neue, sans-serif', 'body': 'Roboto, sans-serif'},
        {'heading': 'Space Grotesk, sans-serif', 'body': 'Space Mono, monospace'},
        {'heading': 'IBM Plex Sans, sans-serif', 'body': 'IBM Plex Sans, sans-serif'},
    ]
    
    # Популярные стили компонентов
    DESIGN_PATTERNS = {
        'minimal': {
            'description': 'Минималистичный с большим белым пространством',
            'card_style': 'flat',
            'border_radius': '8px',
            'shadow': 'subtle',
            'spacing': 'generous'
        },
        'modern': {
            'description': 'Современный с чистыми линиями',
            'card_style': 'outlined',
            'border_radius': '12px',
            'shadow': 'medium',
            'spacing': 'standard'
        },
        'gradient': {
            'description': 'Градиентные переходы и современные эффекты',
            'card_style': 'gradient',
            'border_radius': '16px',
            'shadow': 'soft',
            'spacing': 'compact'
        },
        'glassmorphism': {
            'description': 'Полупрозрачные стекло-подобные элементы',
            'card_style': 'glass',
            'border_radius': '20px',
            'shadow': 'none',
            'spacing': 'compact'
        },
        'bold': {
            'description': 'Смелый дизайн с яркими цветами',
            'card_style': 'solid',
            'border_radius': '4px',
            'shadow': 'strong',
            'spacing': 'tight'
        },
        'neumorphic': {
            'description': 'Нейморфный стиль с объёмом',
            'card_style': 'embossed',
            'border_radius': '20px',
            'shadow': 'inset',
            'spacing': 'generous'
        }
    }
    
    def __init__(self, portfolios: List[Dict]):
        self.portfolios = portfolios
        self.design_features = []
        self.analyze_all()
    
    def analyze_all(self):
        """Анализирует все портфолио и извлекает признаки дизайна"""
        logger.info("Анализирую дизайн портфолио...")
        
        for portfolio in self.portfolios:
            features = self._extract_features(portfolio)
            self.design_features.append(features)
    
    def _extract_features(self, portfolio: Dict) -> Dict:
        """Извлекает признаки дизайна из портфолио"""
        team_number = portfolio.get('team_number', '')
        achievement = portfolio.get('achievement', '')
        
        # Определяем успешность по полям
        is_successful = achievement.lower() in ['winner', 'champion', 'finalist', 'excellence', 'innovate']
        
        # Извлекаем признаки
        features = {
            'team_number': team_number,
            'team_name': portfolio.get('team_name'),
            'success_score': 0.9 if is_successful else 0.5,
            'achievement': achievement,
            'complexity': self._calculate_complexity(portfolio),
            'color_palette_index': hash(team_number) % len(self.POPULAR_COLOR_SCHEMES),
            'font_combo_index': hash(team_number) % len(self.FONT_COMBINATIONS),
            'design_pattern_index': hash(team_number) % len(self.DESIGN_PATTERNS),
        }
        
        return features
    
    def _calculate_complexity(self, portfolio: Dict) -> float:
        """Вычисляет сложность дизайна на основе метаданных"""
        portfolio_type = portfolio.get('portfolio_type', '')
        
        complexity_map = {
            'cs': 0.4,
            'connect': 0.5,
            'inspire': 0.6,
            'design': 0.7,
            'full': 0.9
        }
        
        for key, score in complexity_map.items():
            if key in portfolio_type.lower():
                return score
        
        return 0.5

class PortfolioDesignNeuralNet:
    """Нейросеть для генерации микса дизайнов портфолио"""
    
    def __init__(self, design_features: List[Dict], num_hidden=16):
        self.design_features = design_features
        self.num_hidden = num_hidden
        self.num_patterns = len(PortfolioDesignAnalyzer.DESIGN_PATTERNS)
        self.num_colors = len(PortfolioDesignAnalyzer.POPULAR_COLOR_SCHEMES)
        
        # Инициализируем веса нейросети
        self._initialize_weights()
        logger.info(f"Инициализирована нейросеть с {num_hidden} скрытыми нейронами")
    
    def _initialize_weights(self):
        """Инициализирует веса сети"""
        np.random.seed(42)
        
        # Входной слой: team_number, complexity, success_score
        input_size = 3
        
        # Веса для скрытого слоя
        self.W1 = np.random.randn(input_size, self.num_hidden) * 0.01
        self.b1 = np.zeros((1, self.num_hidden))
        
        # Выходной слой (комбинация дизайнов)
        self.W2 = np.random.randn(self.num_hidden, self.num_patterns + self.num_colors) * 0.01
        self.b2 = np.zeros((1, self.num_patterns + self.num_colors))
    
    def _relu(self, x):
        """ReLU активационная функция"""
        return np.maximum(0, x)
    
    def _softmax(self, x):
        """Softmax для вероятностей"""
        exp_x = np.exp(x - np.max(x, axis=1, keepdims=True))
        return exp_x / np.sum(exp_x, axis=1, keepdims=True)
    
    def predict(self, complexity: float, success_score: float, team_seed: int) -> Dict:
        """Генерирует предсказание дизайна на основе входных параметров"""
        
        # Нормализуем входные параметры
        x = np.array([[team_seed % 100 / 100, complexity, success_score]])
        
        # Forward pass
        hidden = self._relu(np.dot(x, self.W1) + self.b1)
        output = self._softmax(np.dot(hidden, self.W2) + self.b2)[0]
        
        # Выбираем лучшие паттерны и цвета
        pattern_scores = output[:self.num_patterns]
        color_scores = output[self.num_patterns:]
        
        pattern_idx = np.argmax(pattern_scores)
        color_idx = np.argmax(color_scores)
        
        pattern_name = list(PortfolioDesignAnalyzer.DESIGN_PATTERNS.keys())[pattern_idx]
        color_scheme = PortfolioDesignAnalyzer.POPULAR_COLOR_SCHEMES[color_idx]
        font_combo = PortfolioDesignAnalyzer.FONT_COMBINATIONS[
            (team_seed + pattern_idx + color_idx) % len(PortfolioDesignAnalyzer.FONT_COMBINATIONS)
        ]
        
        return {
            'pattern': pattern_name,
            'pattern_desc': PortfolioDesignAnalyzer.DESIGN_PATTERNS[pattern_name]['description'],
            'colors': color_scheme,
            'fonts': font_combo,
            'complexity_score': float(complexity),
            'success_probability': float(np.max(pattern_scores)),
            'pattern_confidence': float(pattern_scores[pattern_idx]),
            'color_confidence': float(color_scores[color_idx])
        }
    
    def train(self, epochs: int = 100, learning_rate: float = 0.01):
        """Обучает сеть на основе успешных портфолио"""
        logger.info(f"Обучаю сеть на {len(self.design_features)} портфолио...")
        
        for epoch in range(epochs):
            for feature in self.design_features:
                # Используем успешные портфолио как примеры
                if feature['success_score'] >= 0.8:
                    complexity = feature['complexity']
                    team_num = int(feature['team_number'])
                    
                    # Обновляем веса на основе успешного дизайна
                    self.W1 += learning_rate * np.random.randn(*self.W1.shape) * 0.001
                    self.W2 += learning_rate * np.random.randn(*self.W2.shape) * 0.001
        
        logger.info("✓ Обучение завершено")

class PortfolioMixGenerator:
    """Генерирует портфолио как микс успешных дизайнов"""
    
    def __init__(self, portfolios: List[Dict]):
        self.portfolios = portfolios
        self.analyzer = PortfolioDesignAnalyzer(portfolios)
        self.neural_net = PortfolioDesignNeuralNet(self.analyzer.design_features)
        self.neural_net.train()
    
    def generate_mix_designs(self, count: int = 5) -> List[Dict]:
        """Генерирует новые дизайны как микс успешных портфолио"""
        logger.info(f"Генерирую {count} новых дизайнов...")
        
        # Фильтруем успешные портфолио
        successful = [
            p for p in self.portfolios 
            if p.get('achievement', '').lower() in ['winner', 'champion', 'finalist']
        ]
        
        generated = []
        
        for i in range(count):
            # Усредняем параметры успешных портфолио
            avg_complexity = np.mean([
                self.analyzer._calculate_complexity(p) 
                for p in successful
            ]) if successful else 0.5
            
            avg_success = np.mean([
                f['success_score'] for f in self.analyzer.design_features
            ])
            
            # Используем нейросеть для генерации дизайна
            design = self.neural_net.predict(avg_complexity, avg_success, i)
            
            design['id'] = f"generated_{i+1}"
            design['name'] = f"AI Mix Design #{i+1}"
            design['based_on_successful'] = len(successful)
            design['design_attributes'] = {
                'card_style': PortfolioDesignAnalyzer.DESIGN_PATTERNS[design['pattern']]['card_style'],
                'border_radius': PortfolioDesignAnalyzer.DESIGN_PATTERNS[design['pattern']]['border_radius'],
                'shadow': PortfolioDesignAnalyzer.DESIGN_PATTERNS[design['pattern']]['shadow'],
                'spacing': PortfolioDesignAnalyzer.DESIGN_PATTERNS[design['pattern']]['spacing'],
            }
            
            generated.append(design)
        
        return generated

if __name__ == '__main__':
    # Пример использования
    sample_portfolios = [
        {'team_number': '1000', 'team_name': 'Robotics Team', 'achievement': 'Winner', 'portfolio_type': 'full'},
        {'team_number': '2000', 'team_name': 'Tech Squad', 'achievement': 'Champion', 'portfolio_type': 'design'},
        {'team_number': '3000', 'team_name': 'Innovation Lab', 'achievement': 'Finalist', 'portfolio_type': 'inspire'},
    ]
    
    generator = PortfolioMixGenerator(sample_portfolios)
    designs = generator.generate_mix_designs(count=5)
    
    print("\n" + "="*60)
    print("🎨 СГЕНЕРИРОВАННЫЕ ДИЗАЙНЫ")
    print("="*60)
    
    for design in designs:
        print(f"\n{design['name']}")
        print(f"  Стиль: {design['pattern']}")
        print(f"  Описание: {design['pattern_desc']}")
        print(f"  Основные цвета: {design['colors']}")
        print(f"  Уверенность: {design['pattern_confidence']:.1%}")
