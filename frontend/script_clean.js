const API_URL = 'http://localhost:5000/api';

// =============== ИНИЦИАЛИЗАЦИЯ ===============
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    checkBackendConnection();
});

function initializeUI() {
    // Обработчик вкладок
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });
    
    // Генератор макетов
    document.getElementById('portfolioForm').addEventListener('submit', generatePortfolios);
    
    // Администратор
    document.getElementById('scanBtn').addEventListener('click', scanPortfolios);
    
    // Модальное окно
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('portfolioModal');
        if (e.target === modal) closeModal();
    });
}

// =============== УПРАВЛЕНИЕ ВКЛАДКАМИ ===============
function switchTab(tabName) {
    // Скрываем все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Убираем активный класс со всех кнопок
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    // Добавляем активный класс к кнопке
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// =============== ГЕНЕРАТОР МАКЕТОВ ===============
async function generatePortfolios(e) {
    e.preventDefault();
    
    const prompt = document.getElementById('prompt').value.trim();
    const btn = document.querySelector('#generate-tab .btn-primary');
    const buttonText = document.getElementById('buttonText');
    const spinner = document.getElementById('loadingSpinner');
    const resultsSection = document.getElementById('resultsSection');
    
    if (!prompt) {
        showError('Пожалуйста, введите описание требований');
        return;
    }
    
    btn.disabled = true;
    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    
    try {
        const response = await fetch(`${API_URL}/generate-portfolio`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при генерации');
        }
        
        const data = await response.json();
        
        if (data.success && data.portfolios.length > 0) {
            displayGeneratedLayouts(data.portfolios);
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            showError('Не удалось сгенерировать макеты');
        }
    } catch (error) {
        showError(`Ошибка: ${error.message}`);
    } finally {
        btn.disabled = false;
        buttonText.style.display = 'inline';
        spinner.style.display = 'none';
    }
}

function displayGeneratedLayouts(layouts) {
    const resultsDiv = document.getElementById('portfolioResults');
    resultsDiv.innerHTML = '';
    
    layouts.forEach((layout, index) => {
        const card = document.createElement('div');
        card.className = 'layout-card';
        
        const html = `
            <div class="layout-header">
                <h3>${layout.name || `Макет ${index + 1}`}</h3>
                <span class="relevance-score">Релевантность: ${(layout.relevance_score * 100).toFixed(0)}%</span>
            </div>
            <div class="layout-body">
                <p>${layout.description || 'Без описания'}</p>
                ${layout.tags ? `<div class="tags">${layout.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
                <div class="color-scheme-preview">
                    ${layout.colorScheme ? layout.colorScheme.map(color => 
                        `<div class="color-swatch" style="background-color: ${color};" title="${color}"></div>`
                    ).join('') : ''}
                </div>
            </div>
        `;
        
        card.innerHTML = html;
        resultsDiv.appendChild(card);
    });
}

// =============== АДМИНИСТРАТОР ===============
async function scanPortfolios() {
    const btn = document.getElementById('scanBtn');
    const scanText = document.getElementById('scanText');
    const spinner = document.getElementById('scanSpinner');
    const scanResult = document.getElementById('scanResult');
    const scanMessage = document.getElementById('scanMessage');
    
    btn.disabled = true;
    scanText.style.display = 'none';
    spinner.style.display = 'inline-block';
    scanResult.style.display = 'none';
    
    try {
        const response = await fetch(`${API_URL}/scan-portfolios`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            scanMessage.innerHTML = `
                <strong>✓ Успешно!</strong><br>
                Обновлено портфолио: <strong>${data.total_count}</strong><br>
                Сообщение: ${data.message}
            `;
            showSuccess(data.message);
        } else {
            throw new Error(data.error);
        }
        
        scanResult.style.display = 'block';
        
    } catch (error) {
        scanMessage.innerHTML = `<strong>✗ Ошибка:</strong> ${error.message}`;
        showError(`Ошибка при сканировании: ${error.message}`);
    } finally {
        scanResult.style.display = 'block';
        btn.disabled = false;
        scanText.style.display = 'inline';
        spinner.style.display = 'none';
    }
}

function closeModal() {
    document.getElementById('portfolioModal').style.display = 'none';
}

// =============== УТИЛИТЫ ===============
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

async function checkBackendConnection() {
    try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
            const data = await response.json();
            console.log('✓ Backend connected. FTC portfolios loaded:', data.total_ftc_portfolios);
        }
    } catch (error) {
        console.warn('⚠ Backend not available. Make sure Flask server is running on http://localhost:5000');
        showError('⚠ Соединение с сервером не установлено. Убедитесь, что Flask запущен на http://localhost:5000');
    }
}
