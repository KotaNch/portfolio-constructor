#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import sys

# Add backend to path before changing directory
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)
os.chdir(backend_path)

from run_generator import *
