@echo off
REM Стартовый скрипт для гибридной версии портфолио генератора
REM Восстановлена старая версия + добавлена новая нейросетевая генерация

echo.
echo ========================================
echo  ПОРТФОЛИО ГЕНЕРАТОР - ГИБРИДНАЯ ВЕРСИЯ
echo ========================================
echo.
echo Старая версия: ВОССТАНОВЛЕНА ✓
echo Новая версия:  ДОБАВЛЕНА ✓
echo.

REM Переход в директорию backend
cd backend

echo [1/3] Проверка зависимостей...
pip show flask > nul 2>&1
if errorlevel 1 (
    echo ⚠️  Flask не установлен. Устанавливаю...
    pip install flask flask-cors reportlab numpy scikit-learn requests
) else (
    echo ✓ Зависимости найдены
)

echo.
echo [2/3] Подготовка данных...
if not exist "data\portfolio_templates.json" (
    echo ⚠️  Файлы данных не найдены
) else (
    echo ✓ Данные загружены
)

echo.
echo [3/3] Запуск сервера...
echo.
echo ✨ Сервер стартует на http://localhost:5000
echo.
echo Доступные маршруты:
echo   СТАРАЯ версия:
echo   - POST   /api/generate-portfolio
echo   - POST   /api/generate-ai-mix
echo   - GET    /api/search-ftc
echo   - GET    /api/ftc-portfolio/^<id^>
echo   - GET    /api/download-portfolio/^<id^>
echo   - POST   /api/generate-pdf-ftc
echo.
echo   НОВАЯ версия:
echo   - POST   /api/generate-html
echo   - POST   /api/generate-html-bulk
echo.

python app.py
