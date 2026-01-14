@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

cd /d "%~dp0backend"

echo Starting FTC Portfolio Constructor...
echo.

python -m pip install -q -r requirements.txt

echo.
echo ========================================
echo Server starting on http://localhost:5000
echo ========================================
echo.

python app.py

pause
