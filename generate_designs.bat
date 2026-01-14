@echo off
REM AI Portfolio Generator v2.0 - Launcher
REM Avtomatski pokretanje punog ciklusa generisanja

echo.
echo ========================================
echo   AI PORTFOLIO GENERATOR v2.0
echo   Automatski generator dizajna
echo ========================================
echo.

cd /d "%~dp0backend"

echo 1. Provera Python...
python.exe --version >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Python nije pronaden! Instalirajte Python 3.8+
    pause
    exit /b 1
)
echo [OK] Python pronaden

echo.
echo 2. Instalacija zavisnosti...
python.exe -m pip install -q -r requirements.txt 2>nul
echo [OK] Zavisnosti instalirane

echo.
echo 3. Pokretanje AI generatora...
echo    (Ovo ce trajati 1-2 minuta...)
python.exe "run_generator.py"

echo.
echo ========================================
echo [OK] GENERISANJE ZAVRSENO!
echo ========================================
echo.
echo Rezultati sacuvani u: backend/generated_portfolios/
echo.
echo Otvorite gallery.html u pregledniku da vidite sve dizajne
echo.
pause
