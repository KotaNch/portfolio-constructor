
import json
import os
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize

METADATA_JSON = os.path.join(os.path.dirname(__file__), 'data', 'final_portfolios.json')
TFIDF_NGRAM = (1,2)

def load_metadata(path=METADATA_JSON):
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    # handles different structures
    if isinstance(data, dict) and data.get('entries') is not None:
        items = data['entries']
    elif isinstance(data, dict) and data.get('portfolios') is not None:
        items = data['portfolios']
    elif isinstance(data, dict) and data.get('generated_count') is not None and data.get('entries') is not None:
        items = data['entries']
    else:
        # fallback try 'portfolios' key or treat as list
        items = data.get('entries') or data.get('portfolios') or data
    return items

def normalize_text(s):
    if not s:
        return ""
    s = s.lower()
    s = re.sub(r'[^0-9a-zа-яё\s\-]', ' ', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def build_corpus(items):
    corpus = []
    for it in items:
        parts = []
        parts.append(it.get('team_name',''))
        parts.append(it.get('description',''))
        tags = it.get('tags', [])
        if isinstance(tags, list):
            parts.append(" ".join(tags))
        for field in ['design_adjectives_en', 'design_adjectives_ru']:
            if it.get(field):
                parts.append(" ".join(it.get(field)))
        text = normalize_text(" ".join(parts))
        corpus.append(text)
    return corpus

class PortfolioRecommender:
    def __init__(self, metadata_path=METADATA_JSON):
        self.items = load_metadata(metadata_path)
        self.corpus = build_corpus(self.items)
        self.vectorizer = TfidfVectorizer(ngram_range=TFIDF_NGRAM, min_df=1)
        self.tfidf = self.vectorizer.fit_transform(self.corpus)
        self.tfidf = normalize(self.tfidf, norm='l2', axis=1)

    def _text_similarity(self, query):
        q = normalize_text(query)
        if not q.strip():
            return np.zeros(len(self.items))
        qv = self.vectorizer.transform([q])
        qv = normalize(qv, norm='l2', axis=1)
        sims = (self.tfidf @ qv.T).toarray().ravel()
        return sims

    def _jaccard_score(self, user_tags, item_tags):
        if not user_tags:
            return 0.0
        a = set([t.lower() for t in user_tags])
        b = set([t.lower() for t in (item_tags or [])])
        inter = len(a & b)
        union = len(a | b)
        return inter / union if union > 0 else 0.0

    def _design_score(self, user_design_adjs, item_design_adjs):
        if not user_design_adjs:
            return 0.0
        a = set([t.lower() for t in user_design_adjs])
        b = set([t.lower() for t in (item_design_adjs or [])])
        inter = len(a & b)
        return inter / len(a) if len(a) > 0 else 0.0

    def recommend(self, prompt, user_tags=None, user_design_adjs=None, top_n=3,
                  weights=None):
        if weights is None:
            weights = {'text': 0.6, 'tags': 0.25, 'design': 0.15}
        text_sims = self._text_similarity(prompt) if prompt else np.zeros(len(self.items))
        results = []
        for i, it in enumerate(self.items):
            tag_score = self._jaccard_score(user_tags, it.get('tags', []))
            item_design = []
            if it.get('design_adjectives_en'):
                item_design += it.get('design_adjectives_en')
            if it.get('design_adjectives_ru'):
                item_design += it.get('design_adjectives_ru')
            design_score = self._design_score(user_design_adjs, item_design)
            total = weights['text'] * float(text_sims[i]) + \
                    weights['tags'] * float(tag_score) + \
                    weights['design'] * float(design_score)
            results.append({
                'index': i,
                'id': it.get('id') or it.get('team_number') or f"idx_{i}",
                'team_name': it.get('team_name'),
                'score': total,
                'components': {
                    'text_sim': float(text_sims[i]),
                    'tag_score': float(tag_score),
                    'design_score': float(design_score)
                },
                'pdf_url': it.get('pdf_url') or it.get('pdf_path_local'),
                'thumbnail_url': it.get('thumbnail_url') or it.get('thumbnail_path'),
                'metadata': it
            })
        results.sort(key=lambda x: x['score'], reverse=True)
        return results[:top_n]

# Convenience function to build a recommender instance
def build_recommender():
    return PortfolioRecommender()
