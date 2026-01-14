@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ===============================================
echo   PDF Templates Generator
echo ===============================================
echo.

echo [1/3] Установка зависимостей...
python -m pip install -q -r requirements.txt

echo [2/3] Генерирование 100 шаблонов...
python main.py --generate 100

echo [3/3] Запуск API...
echo.
echo Сервер запускается на http://localhost:5001
echo.
echo Для поиска: POST http://localhost:5001/api/search
echo.

python api.py

pause
