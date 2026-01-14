#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Launcher for AI Portfolio Generator
Обходит проблемы с PowerShell кодировкой
"""
import subprocess
import sys
import os

def main():
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    os.chdir(backend_dir)
    
    # Install dependencies
    print("[*] Instalacija zavisnosti...")
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', '-r', 'requirements.txt'])
    
    # Run generator
    print("[*] Pokretanje AI generatora...")
    os.execvp(sys.executable, [sys.executable, 'run_generator.py'])

if __name__ == '__main__':
    main()
