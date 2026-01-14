@echo off
echo ============================================
echo FTC Portfolio Constructor - Launcher
echo ============================================
echo.

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ============================================
echo Starting FTC Portfolio Constructor
echo ============================================
echo.
echo Backend will start on: http://localhost:5000
echo Frontend should be opened at: file:///%CD%\..\frontend\index.html
echo.
echo Starting Flask server...
echo.

python app.py
