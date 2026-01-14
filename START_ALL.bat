@echo off
chcp 65001 > nul
echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                                                                    ║
echo ║            🤖 PORTFOLIO CONSTRUCTOR - СТАРТ ВСЕХ СЕРВИСОВ          ║
echo ║                                                                    ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Создаем новые окна PowerShell для каждого сервиса
echo 📍 Открываю терминалы для запуска сервисов...
echo.

REM Главное приложение (портал 5000)
start "FTC Portfolio - Backend" powershell -NoExit -Command "cd '%~dp0' && python backend/app.py"
timeout /t 2 /nobreak

REM Генератор шаблонов (портал 5001)
start "Templates Generator - API" powershell -NoExit -Command "cd '%~dp0\portfolio_templates_generator' && python quick_start.py"
timeout /t 2 /nobreak

echo.
echo ✅ Сервисы запускаются...
echo.
echo 🌐 Откройте в браузере:
echo    🔵 ГЛАВНОЕ ПРИЛОЖЕНИЕ:   http://localhost:5000
echo    📚 ГЕНЕРАТОР ШАБЛОНОВ:   http://localhost:5001
echo.
echo ⌛ Дождитесь загрузки сервисов (обычно 5-10 секунд)
echo.
echo Для остановки: Закройте окна терминалов
echo.
pause
