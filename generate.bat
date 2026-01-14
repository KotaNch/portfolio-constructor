@echo off
REM AI Portfolio Generator v2.0 - Simple Launcher
REM Prostori pokretac koji izbegava probleme sa PowerShell kodiranjem

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   AI PORTFOLIO GENERATOR v2.0
echo   Automatski generator dizajna
echo ========================================
echo.

REM Get the directory where this batch file is located
set SCRIPT_DIR=%~dp0

REM Check Python is installed
python.exe --version >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Python nije pronaden!
    echo Molim vas instalirajte Python 3.8+ sa https://www.python.org
    pause
    exit /b 1
)

echo [OK] Python je pronaden

echo.
echo Pokretanje generatora...
python.exe "%SCRIPT_DIR%launcher.py"

if errorlevel 1 (
    echo.
    echo [ERROR] Greska pri izvrsavanju!
    pause
    exit /b 1
)

echo.
echo ========================================
echo [OK] GENERISANJE ZAVRSENO!
echo ========================================
echo.
echo Rezultati su u: backend\generated_portfolios\
echo Otvorite gallery.html u pregledniku
echo.
pause
