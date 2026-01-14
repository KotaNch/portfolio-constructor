@echo off
REM AI Portfolio Generator v2.0 - API Server
REM Запуск Flask сервера с AI функциями

echo.
echo ========================================
echo   AI PORTFOLIO GENERATOR v2.0
echo   API Server
echo ========================================
echo.

cd /d "%~dp0backend"

echo 1. Проверка Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python не найден! Установите Python 3.8+
    pause
    exit /b 1
)
echo ✓ Python найден

echo.
echo 2. Установка зависимостей...
pip install -q -r requirements.txt
echo ✓ Зависимости установлены

echo.
echo 3. Запуск Flask API сервера...
echo    API будет доступен на: http://localhost:5000
echo    Открыть фронтенд: file:///c:/Users/ilaci/portfolio%%20constructor/portfolio-constructor/frontend/index_v2.html
echo.
echo Нажмите Ctrl+C для остановки сервера
echo.

python app_v2.py

pause
