/* RED LOTUS - Interactive Script with Animations */

const API_URL = 'http://localhost:5000/api';
const TEMPLATES_API = 'http://localhost:5001';

let currentPortfolio = null;
let currentTemplate = null;

// =============== ИНИЦИАЛИЗАЦИЯ ===============
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    checkBackendConnection();
    addInteractiveEffects();
});

function initializeUI() {
    // Вкладки с интерактивностью
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget;
            const tabName = target.dataset.tab;
            switchTab(tabName);
            
            // Визуальный эффект клика
            rippleEffect(e);
        });
        
        // Подсвечивание при наведении
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
    
    // ГЕНЕРАТОР
    document.getElementById('portfolioForm').addEventListener('submit', generatePortfolios);
    
    // ШАБЛОНЫ
    document.getElementById('templateSearch').addEventListener('input', (e) => {
        e.target.classList.add('active-input');
        searchTemplates(e);
    });
    
    document.querySelectorAll('.layout-filter').forEach(checkbox => {
        checkbox.addEventListener('change', filterTemplates);
    });
    document.getElementById('randomTemplateBtn').addEventListener('click', loadRandomTemplate);
    
    // АДМИНИСТРАТОР
    document.getElementById('scanBtn').addEventListener('click', scanPortfolios);
    document.getElementById('generateTemplatesBtn').addEventListener('click', generateTemplates);
    document.getElementById('statsBtn').addEventListener('click', loadStats);
    
    // МОДАЛЬНЫЕ ОКНА
    setupModals();
    
    // Загрузить шаблоны при открытии вкладки
    const templatesTab = document.querySelector('[data-tab="templates"]');
    if (templatesTab) {
        templatesTab.addEventListener('click', () => {
            setTimeout(loadTemplates, 100);
        });
    }
}

// =============== ИНТЕРАКТИВНЫЕ ЭФФЕКТЫ ===============
function addInteractiveEffects() {
    // Эффект при наведении на карточки
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.portfolio-card, .template-card, .admin-card')) {
            const card = e.target.closest('.portfolio-card, .template-card, .admin-card');
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        }
    });
    
    // Отслеживание активного таба
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function rippleEffect(e) {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;
    
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// =============== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ===============
function switchTab(tabName) {
    // Скрыть все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Показать выбранную вкладку
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Обновить активную кнопку
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Загрузить данные при переходе на вкладку шаблонов
    if (tabName === 'templates') {
        loadTemplates();
    }
}

// =============== ГЕНЕРАТОР ===============
async function generatePortfolios(e) {
    e.preventDefault();
    
    const prompt = document.getElementById('prompt').value.trim();
    
    if (prompt.length < 10) {
        showNotification('Опишите требования минимум 10 символов', 'error');
        return;
    }
    
    const btn = e.target.querySelector('.btn-primary');
    const spinner = btn.querySelector('.btn-spinner');
    btn.disabled = true;
    btn.querySelector('.btn-text').style.display = 'none';
    spinner.style.display = 'inline';
    
    try {
        const response = await fetch(`${API_URL}/generate-portfolio`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        
        const data = await response.json();
        displayPortfolios(data.portfolios || []);
        showNotification('Макеты успешно сгенерированы!', 'success');
    } catch (error) {
        showNotification('Ошибка при генерации: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.querySelector('.btn-text').style.display = 'inline';
        spinner.style.display = 'none';
    }
}

function displayPortfolios(portfolios) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsPlaceholder = document.getElementById('resultsPlaceholder');
    const portfolioResults = document.getElementById('portfolioResults');
    
    if (portfolios.length === 0) {
        resultsSection.style.display = 'none';
        resultsPlaceholder.style.display = 'block';
        return;
    }
    
    resultsPlaceholder.style.display = 'none';
    resultsSection.style.display = 'block';
    
    portfolioResults.innerHTML = portfolios.map((p, idx) => `
        <div class="portfolio-card" data-index="${idx}">
            <div class="portfolio-title">Макет ${idx + 1}</div>
            <div class="portfolio-desc">${p.description || 'Профессиональный макет портфолио'}</div>
            <button class="portfolio-btn" onclick="downloadGeneratedPDF(${idx})">
                ⬇️ Скачать PDF
            </button>
        </div>
    `).join('');
    
    // Добавить интерактивность к карточкам
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

async function downloadGeneratedPDF(index) {
    try {
        showNotification('Загрузка PDF...', 'info');
        const response = await fetch(`${API_URL}/download-template/${index}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio_${index + 1}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        showNotification('PDF успешно загружен!', 'success');
    } catch (error) {
        showNotification('Ошибка загрузки: ' + error.message, 'error');
    }
}

// =============== ШАБЛОНЫ ===============
async function loadTemplates() {
    try {
        const response = await fetch(`${TEMPLATES_API}/api/info`);
        const data = await response.json();
        displayTemplates(data.templates || []);
    } catch (error) {
        console.error('Ошибка загрузки шаблонов:', error);
    }
}

function displayTemplates(templates) {
    const templatesList = document.getElementById('templatesList');
    const placeholder = document.getElementById('templatesPlaceholder');
    
    if (!templates || templates.length === 0) {
        placeholder.style.display = 'block';
        templatesList.style.display = 'none';
        return;
    }
    
    placeholder.style.display = 'none';
    templatesList.style.display = 'grid';
    
    templatesList.innerHTML = templates.map(t => `
        <div class="template-card" data-id="${t.id}">
            <div class="template-header">🖼️</div>
            <div class="template-body">
                <div class="template-name">${t.name || 'Шаблон'}</div>
                <div class="template-tags">
                    ${(t.tags || []).slice(0, 3).map(tag => `
                        <span class="template-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>
            <div class="template-footer">
                <button class="template-btn" onclick="quickDownloadTemplate('${t.id}')">
                    ⬇️ Скачать
                </button>
            </div>
        </div>
    `).join('');
}

async function quickDownloadTemplate(templateId) {
    try {
        showNotification('Загрузка шаблона...', 'info');
        const response = await fetch(`${TEMPLATES_API}/api/download/${templateId}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `template_${templateId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        showNotification('Шаблон успешно загружен!', 'success');
    } catch (error) {
        showNotification('Ошибка загрузки: ' + error.message, 'error');
    }
}

async function searchTemplates(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
        loadTemplates();
        return;
    }
    
    try {
        const response = await fetch(`${TEMPLATES_API}/api/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: query, limit: 20 })
        });
        const data = await response.json();
        displayTemplates(data.results || []);
    } catch (error) {
        showNotification('Ошибка поиска: ' + error.message, 'error');
    }
}

function filterTemplates() {
    // Фильтрация по выбранным чекбоксам
    const checked = Array.from(document.querySelectorAll('.layout-filter:checked'))
        .map(cb => cb.value);
    
    const cards = document.querySelectorAll('.template-card');
    cards.forEach(card => {
        if (checked.length === 0) {
            card.style.display = '';
        }
    });
}

async function loadRandomTemplate() {
    try {
        const response = await fetch(`${TEMPLATES_API}/api/random?count=5`);
        const data = await response.json();
        displayTemplates(data.templates || []);
        showNotification('Загружены случайные шаблоны!', 'success');
    } catch (error) {
        showNotification('Ошибка загрузки: ' + error.message, 'error');
    }
}

// =============== АДМИНИСТРАТОР ===============
async function scanPortfolios() {
    const btn = document.getElementById('scanBtn');
    const spinner = btn.querySelector('.btn-spinner');
    btn.disabled = true;
    btn.querySelector('.btn-text').style.display = 'none';
    spinner.style.display = 'inline';
    
    try {
        const response = await fetch(`${API_URL}/scan-portfolios`, {
            method: 'POST'
        });
        const data = await response.json();
        
        const result = document.getElementById('scanResult');
        result.style.display = 'block';
        document.getElementById('scanMessage').innerHTML = 
            `✅ Сканирование завершено<br>Найдено портфолио: ${data.count || 0}`;
        
        showNotification('Сканирование завершено!', 'success');
    } catch (error) {
        document.getElementById('scanResult').style.display = 'block';
        document.getElementById('scanMessage').innerHTML = `❌ Ошибка: ${error.message}`;
        showNotification('Ошибка сканирования', 'error');
    } finally {
        btn.disabled = false;
        btn.querySelector('.btn-text').style.display = 'inline';
        spinner.style.display = 'none';
    }
}

async function generateTemplates() {
    const count = parseInt(document.getElementById('templateCount').value) || 100;
    const btn = document.getElementById('generateTemplatesBtn');
    const spinner = btn.querySelector('.btn-spinner');
    btn.disabled = true;
    btn.querySelector('.btn-text').style.display = 'none';
    spinner.style.display = 'inline';
    
    try {
        const response = await fetch(`${TEMPLATES_API}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count })
        });
        
        const data = await response.json();
        const result = document.getElementById('templateGenerationResult');
        result.style.display = 'block';
        document.getElementById('templateGenMessage').innerHTML = 
            `✅ Сгенерировано шаблонов: ${data.count || count}`;
        
        showNotification('Шаблоны успешно сгенерированы!', 'success');
    } catch (error) {
        document.getElementById('templateGenerationResult').style.display = 'block';
        document.getElementById('templateGenMessage').innerHTML = `❌ Ошибка: ${error.message}`;
        showNotification('Ошибка генерации', 'error');
    } finally {
        btn.disabled = false;
        btn.querySelector('.btn-text').style.display = 'inline';
        spinner.style.display = 'none';
    }
}

async function loadStats() {
    const btn = document.getElementById('statsBtn');
    btn.disabled = true;
    
    try {
        const response = await fetch(`${TEMPLATES_API}/api/info`);
        const data = await response.json();
        
        const result = document.getElementById('statsResult');
        result.style.display = 'block';
        document.getElementById('statsMessage').innerHTML = `
            <strong>📊 Статистика системы:</strong><br>
            Всего шаблонов: ${data.total_templates || 0}<br>
            Доступных: ${data.templates?.length || 0}<br>
            API версия: ${data.version || '1.0'}
        `;
        
        showNotification('Статистика загружена!', 'success');
    } catch (error) {
        document.getElementById('statsResult').style.display = 'block';
        document.getElementById('statsMessage').innerHTML = `❌ Ошибка: ${error.message}`;
        showNotification('Ошибка загрузки статистики', 'error');
    } finally {
        btn.disabled = false;
    }
}

// =============== МОДАЛЬНЫЕ ОКНА ===============
function setupModals() {
    const portfolioModal = document.getElementById('portfolioModal');
    const templateModal = document.getElementById('templateModal');
    
    if (portfolioModal) {
        portfolioModal.querySelector('.modal-overlay').addEventListener('click', () => {
            closeAllModals();
        });
        portfolioModal.querySelector('.close-btn').addEventListener('click', () => {
            closeAllModals();
        });
        portfolioModal.querySelector('.close-modal-btn')?.addEventListener('click', () => {
            closeAllModals();
        });
    }
    
    if (templateModal) {
        templateModal.querySelector('.modal-overlay').addEventListener('click', () => {
            closeAllModals();
        });
        templateModal.querySelector('.close-btn').addEventListener('click', () => {
            closeAllModals();
        });
        templateModal.querySelector('.close-modal-btn')?.addEventListener('click', () => {
            closeAllModals();
        });
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// =============== ПРОВЕРКА ПОДКЛЮЧЕНИЯ ===============
async function checkBackendConnection() {
    try {
        const response = await fetch(`${API_URL}/health-check`);
        if (response.ok) {
            console.log('✅ Подключение к бэкенду успешно');
        }
    } catch (error) {
        showNotification('⚠️ Ошибка подключения к серверу', 'error');
    }
}

// =============== УВЕДОМЛЕНИЯ ===============
function showNotification(message, type = 'info') {
    const container = type === 'error' ? 
        document.getElementById('errorMessage') : 
        document.getElementById('successMessage');
    
    container.innerHTML = message;
    container.style.display = 'block';
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 3000);
}

// =============== УТИЛИТЫ ===============
// Добавить CSS для ripple эффекта
const style = document.createElement('style');
style.textContent = `
    .nav-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .active-input {
        box-shadow: 0 0 15px rgba(220, 38, 38, 0.5) !important;
    }
`;
document.head.appendChild(style);
