#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Safe wrapper to run AI Portfolio Generator with proper encoding
"""

import sys
import os

# Force UTF-8 output for Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Run the generator
from ai_portfolio_generator_v2 import AIPortfolioGeneratorV2

if __name__ == '__main__':
    try:
        generator = AIPortfolioGeneratorV2()
        generator.run_full_pipeline(generate_count=10)
    except Exception as e:
        print(f"[ERROR] {e}")
        import traceback
        traceback.print_exc()
