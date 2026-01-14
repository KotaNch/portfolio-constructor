#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 Простой запуск FTC Portfolio Constructor
Минимальная конфигурация для работы
"""
import subprocess
import sys
import os

def run_command(cmd, cwd=None, description=""):
    """Выполняет команду и выводит результат"""
    if description:
        print(f"\n📌 {description}")
    try:
        result = subprocess.run(
            cmd,
            cwd=cwd,
            shell=True,
            capture_output=True,
            text=True
        )
        if result.returncode != 0:
            print(f"⚠️ {result.stderr}")
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False

def main():
    root = os.path.dirname(os.path.abspath(__file__))
    backend = os.path.join(root, 'backend')
    frontend = os.path.join(root, 'frontend')
    
    print("\n" + "="*70)
    print("🤖 FTC PORTFOLIO CONSTRUCTOR")
    print("="*70)
    
    # 1. Установка зависимостей
    print("\n[ЭТАП 1] Установка зависимостей Python...")
    if not run_command(
        f'"{sys.executable}" -m pip install -r requirements.txt',
        cwd=backend,
        description="Устанавливаем Flask, scikit-learn и другие пакеты..."
    ):
        print("❌ Не удалось установить зависимости")
        return 1
    print("✅ Зависимости установлены")
    
    # 2. Запуск Flask приложения
    print("\n[ЭТАП 2] Запуск веб-сервера...")
    print("🌐 Сервер запускается на http://localhost:5000")
    print("🖥️  Приложение будет доступно по адресу выше")
    print("\n" + "="*70)
    print("💡 ИСПОЛЬЗОВАНИЕ:")
    print("  1. Откройте браузер на http://localhost:5000")
    print("  2. Перейдите на вкладку 'Генератор'")
    print("  3. Введите описание портфолио (например:")
    print("     'Нужен современный дизайн с синей палитрой')")
    print("  4. Нажмите 'Сгенерировать макеты'")
    print("  5. Выберите понравившийся макет")
    print("="*70)
    print("\n")
    
    # Запускаем Flask
    try:
        os.chdir(backend)
        os.execvp(sys.executable, [sys.executable, 'app.py'])
    except Exception as e:
        print(f"❌ Ошибка запуска сервера: {e}")
        return 1

if __name__ == '__main__':
    sys.exit(main())
