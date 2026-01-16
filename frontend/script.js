// script.js - Red Lotus frontend (robust + UI improvements)
// Backend-first, safe fallbacks, and UI: thumbnail contain + tall input + "Подробнее" toggle.

const API_BASE = ''; // relative origin
const RECOMMEND_ENDPOINT = '/api/recommend';
const GENERATE_LAYOUTS_ENDPOINT = '/api/generate-layouts';
const PORTFOLIOS_ENDPOINT = '/api/portfolios';
const LOCAL_FALLBACK_JSON = 'data/final_portfolios.json';

const EMBEDDED_FALLBACK = {
  "portfolios": [
    {
      "id": "sample-1",
      "team_number": "0001",
      "team_name": "Demo Team",
      "achievement": "N/A",
      "portfolio_type": "pp",
      "pdf_url": "https://example.com/sample1.pdf",
      "thumbnail_url": "https://via.placeholder.com/640x400.png?text=Demo+1",
      "description": "Демо-портфолио: минималистичный макет, красные акценты. Полный текст для демонстрации работы кнопки Подробнее. Здесь больше описания, которое должно сворачиваться и раскрываться по кнопке.",
      "tags": ["minimal", "red", "teams"],
      "templates": ["https://example.com/sample1-template.pdf"]
    },
    {
      "id": "sample-2",
      "team_number": "0002",
      "team_name": "Demo Team 2",
      "achievement": "N/A",
      "portfolio_type": "cs",
      "pdf_url": "https://example.com/sample2.pdf",
      "thumbnail_url": "https://via.placeholder.com/640x400.png?text=Demo+2",
      "description": "Демо-портфолио: технический дизайн, графики и CAD-скетчи. Короткое описание.",
      "tags": ["technical","cad"],
      "templates": ["https://example.com/sample2-template.pdf"]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  checkBackendConnection();
});

function initializeUI() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = btn.dataset.tab;
      switchTab(tabName);
      rippleEffect(e);
    });
  });

  const form = document.getElementById('portfolioForm');
  if (form) form.addEventListener('submit', generatePortfolios);

  const searchInput = document.getElementById('templateSearch');
  if (searchInput) searchInput.addEventListener('input', debounce((ev) => searchTemplates(ev.target.value), 300));

  document.querySelectorAll('.layout-filter').forEach(cb => cb.addEventListener('change', filterTemplates));
  const randomBtn = document.getElementById('randomTemplateBtn');
  if (randomBtn) randomBtn.addEventListener('click', loadRandomTemplate);

  const scanBtn = document.getElementById('scanBtn');
  if (scanBtn) scanBtn.addEventListener('click', scanPortfolios);
  const genBtn = document.getElementById('generateTemplatesBtn');
  if (genBtn) genBtn.addEventListener('click', generateTemplates);
  const statsBtn = document.getElementById('statsBtn');
  if (statsBtn) statsBtn.addEventListener('click', loadStats);

  setupModals();
}

function switchTab(name) {
  document.querySelectorAll('.tab-content').forEach(t => { t.style.display = 'none'; t.classList.remove('active'); });
  const el = document.getElementById(name + '-tab');
  if (el) { el.style.display = ''; el.classList.add('active'); }
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-tab="${name}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (name === 'templates') setTimeout(loadTemplates, 60);
}

function rippleEffect(e){
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
  btn.appendChild(ripple);
  setTimeout(()=>ripple.remove(), 600);
}

function debounce(fn, t){ let timer; return (...args)=>{ clearTimeout(timer); timer = setTimeout(()=>fn(...args), t); }; }

async function generatePortfolios(e){
  e.preventDefault();
  const prompt = (document.getElementById('prompt') || {}).value || '';
  if (prompt.trim().length < 10) {
    showNotification('Опишите требования минимум 10 символов', 'error');
    return;
  }

  const submitBtn = e.target.querySelector('.btn-primary');
  const spinner = submitBtn && submitBtn.querySelector('.btn-spinner');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.querySelector('.btn-text').style.display = 'none'; if (spinner) spinner.style.display = 'inline'; }

  // Try new generate-layouts endpoint (with neural network)
  try {
    const resp = await fetch(API_BASE + GENERATE_LAYOUTS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, count: 3 })
    });

    if (resp.ok) {
      const json = await resp.json();
      if (json.success && json.portfolios) {
        displayPortfoliosFromAPI(json.portfolios);
        showNotification('Найдено подходящих портфолио!', 'success');
        finalizeSubmitButton(submitBtn, spinner);
        return;
      }
    } else {
      console.warn('Generate layouts failed status:', resp.status);
    }
  } catch (err) {
    console.warn('Generate layouts request failed:', err.message);
  }

  // Fallback: Try backend recommend
  try {
    const resp = await fetch(API_BASE + RECOMMEND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, top_n: 3 })
    });

    if (resp.ok) {
      const json = await resp.json();
      const results = json.results || json.portfolios || [];
      const mapped = (results || []).map(normalizeResult);
      displayPortfolios(mapped);
      showNotification('Макеты успешно сгенерированы!', 'success');
      finalizeSubmitButton(submitBtn, spinner);
      return;
    } else {
      console.warn('Recommend failed status:', resp.status);
    }
  } catch (err) {
    console.warn('Recommend request failed:', err.message);
  }

  // Fallback1: backend portfolios endpoint
  try {
    const resp2 = await fetch(API_BASE + PORTFOLIOS_ENDPOINT);
    if (resp2.ok) {
      const json = await resp2.json();
      const list = json.portfolios || json;
      const found = localSearch(list, prompt, 6).map(normalizeResult);
      displayPortfolios(found);
      showNotification('Результаты из серверной базы (fallback)', 'info');
      finalizeSubmitButton(submitBtn, spinner);
      return;
    }
  } catch (err) { console.warn('Portfolios endpoint not available:', err.message); }

  // Fallback2: local file in frontend/data
  try {
    const l = await fetch(LOCAL_FALLBACK_JSON);
    if (l.ok) {
      const json = await l.json();
      const list = json.portfolios || json;
      const found = localSearch(list, prompt, 6).map(normalizeResult);
      displayPortfolios(found);
      showNotification('Режим офлайн: результаты из локального файла', 'info');
      finalizeSubmitButton(submitBtn, spinner);
      return;
    }
  } catch (err) { console.warn('Local JSON fallback failed:', err.message); }

  // Final embedded fallback
  const sample = (EMBEDDED_FALLBACK.portfolios || []).map(normalizeResult);
  displayPortfolios(sample);
  showNotification('Режим демо: встроенные примеры', 'info');
  finalizeSubmitButton(submitBtn, spinner);
}

function finalizeSubmitButton(btn, spinner){
  if (btn) { btn.disabled = false; btn.querySelector('.btn-text').style.display = 'inline'; if (spinner) spinner.style.display = 'none'; }
}

function normalizeResult(item){
  return {
    id: item.id || (item.team_number ? `${item.team_number}-${item.portfolio_type||'pp'}` : 'unknown'),
    team_name: item.team_name || item.name || '',
    pdf_url: item.pdf_url || item.pdf || item.url || '',
    thumbnail_url: item.thumbnail_url || item.thumbnail || item.thumb || '',
    description: item.description || '',
    templates: Array.isArray(item.templates) ? item.templates : (item.templates ? [item.templates] : [])
  };
}

function localSearch(list, prompt, limit=3){
  const q = (prompt||'').toLowerCase().trim();
  if (!q) return (list||[]).slice(0,limit);
  const tokens = q.split(/\s+/).filter(Boolean);
  return (list||[]).map(item => {
    let score = 0;
    const text = ((item.description||'') + ' ' + (item.team_name||'') + ' ' + ((item.tags||[]).join(' '))).toLowerCase();
    tokens.forEach(t => { if (text.includes(t)) score += 10; });
    if ((item.achievement||'').toLowerCase().includes('world')) score += 3;
    return { score, item };
  }).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.item);
}

function displayPortfoliosFromAPI(portfolios){
  const resultsSection = document.getElementById('resultsSection');
  const resultsPlaceholder = document.getElementById('resultsPlaceholder');
  const portfolioResults = document.getElementById('portfolioResults');

  if (!portfolios || portfolios.length === 0) {
    if (resultsSection) resultsSection.style.display = 'none';
    if (resultsPlaceholder) resultsPlaceholder.style.display = 'flex';
    if (portfolioResults) portfolioResults.innerHTML = '';
    return;
  }

  if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
  if (resultsSection) resultsSection.style.display = 'block';

  portfolioResults.innerHTML = portfolios.map((p, idx) => {
    const thumb = escapeHtml(p.thumbnail_url || '');
    const desc = escapeHtml(p.extended_description || p.description || 'Профессиональный макет портфолио');
    const pdf = encodeURI(p.pdf_url || '#');
    const teamName = escapeHtml(p.team_name || 'Неизвестная команда');
    const score = (p.score || 0).toFixed(2);
    const selectionInfo = p.selection_info || {};
    const textSim = (selectionInfo.text_similarity || 0).toFixed(2);
    
    // 3 ссылки на шаблоны (пока заглушки)
    const templateUrls = p.template_urls || [null, null, null];
    const templateButtons = templateUrls.map((url, i) => {
      if (url) {
        return `<a class="portfolio-btn" href="${encodeURI(url)}" target="_blank" rel="noopener noreferrer">⬇️ Шаблон ${i+1}</a>`;
      } else {
        return `<span class="portfolio-btn" style="opacity: 0.5; cursor: not-allowed;">⬇️ Шаблон ${i+1} (скоро)</span>`;
      }
    }).join(' ');

    return `
      <div class="portfolio-card" data-index="${idx}">
        ${thumb ? `<img src="${thumb}" alt="thumbnail" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px;" />` : '<div style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; color: #999;">Нет изображения</div>'}
        <div class="portfolio-title">${teamName}</div>
        <div class="portfolio-meta" style="font-size: 0.9em; color: #666; margin-bottom: 10px;">
          <span>Релевантность: ${score}</span>
          ${p.team_number ? `<span> | Команда: ${escapeHtml(p.team_number)}</span>` : ''}
          ${p.achievement ? `<span> | ${escapeHtml(p.achievement)}</span>` : ''}
          ${p.portfolio_type ? `<span> | Тип: ${escapeHtml(p.portfolio_type.toUpperCase())}</span>` : ''}
        </div>
        <div style="font-size: 0.85em; color: #888; margin-bottom: 10px; padding: 8px; background: #f9f9f9; border-radius: 4px;">
          <strong>Почему выбрано:</strong> Семантическое сходство: ${textSim} | Метод: ${selectionInfo.method || 'tfidf'}
        </div>
        <div class="portfolio-desc collapsed" id="desc-${idx}">${desc}</div>
        <div class="portfolio-actions">
          ${pdf && pdf !== '#' ? `<a class="portfolio-btn" href="${pdf}" target="_blank" rel="noopener noreferrer">⬇️ Скачать PDF</a>` : ''}
          ${templateButtons}
          <button class="about-btn" data-idx="${idx}">Подробнее</button>
        </div>
      </div>
    `;
  }).join('');

  // add basic hover scale
  document.querySelectorAll('.portfolio-card').forEach(card=>{
    card.addEventListener('mouseenter', ()=> card.style.transform = 'scale(1.02)');
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
  });

  // attach about button listeners
  document.querySelectorAll('.about-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-idx');
      toggleAbout(idx, btn);
    });
  });
}

function displayPortfolios(portfolios){
  const resultsSection = document.getElementById('resultsSection');
  const resultsPlaceholder = document.getElementById('resultsPlaceholder');
  const portfolioResults = document.getElementById('portfolioResults');

  if (!portfolios || portfolios.length === 0) {
    if (resultsSection) resultsSection.style.display = 'none';
    if (resultsPlaceholder) resultsPlaceholder.style.display = 'flex';
    if (portfolioResults) portfolioResults.innerHTML = '';
    return;
  }

  if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
  if (resultsSection) resultsSection.style.display = 'block';

  portfolioResults.innerHTML = portfolios.map((p, idx) => {
    const thumb = escapeHtml(p.thumbnail_url || p.pdf_url || '');
    const desc = escapeHtml(p.description || 'Профессиональный макет портфолио');
    const pdf = encodeURI(p.pdf_url || '#');
    const templates = Array.isArray(p.templates) ? p.templates : (p.templates ? [p.templates] : []);
    const templateButtons = templates.map((t, i) => {
      const href = encodeURI(t || '#');
      return `<a class="portfolio-btn" href="${href}" target="_blank" rel="noopener noreferrer">⬇️ Шаблон ${i+1}</a>`;
    }).join(' ');

    return `
      <div class="portfolio-card" data-index="${idx}">
        <img src="${thumb}" alt="thumbnail" />
        <div class="portfolio-title">Макет ${idx + 1}</div>
        <div class="portfolio-desc collapsed" id="desc-${idx}">${desc}</div>
        <div class="portfolio-actions">
          <a class="portfolio-btn" href="${pdf}" target="_blank" rel="noopener noreferrer">⬇️ Скачать пример (PDF)</a>
          ${templateButtons}
          <button class="about-btn" data-idx="${idx}">Подробнее</button>
        </div>
      </div>
    `;
  }).join('');

  // add basic hover scale
  document.querySelectorAll('.portfolio-card').forEach(card=>{
    card.addEventListener('mouseenter', ()=> card.style.transform = 'scale(1.02)');
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
  });

  // attach about button listeners
  document.querySelectorAll('.about-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-idx');
      toggleAbout(idx, btn);
    });
  });
}

function toggleAbout(idx, btn){
  const el = document.getElementById(`desc-${idx}`);
  if (!el) return;
  const expanded = el.classList.toggle('collapsed') ? false : true; // if remove collapsed => expanded true
  // Actually our class collapsed limits height; toggle collapsed -> if it was collapsed removed -> expanded true
  if (el.classList.contains('collapsed')) {
    btn.textContent = 'Подробнее';
  } else {
    btn.textContent = 'Свернуть';
  }
}

// ---------- Templates (library) ----------
async function loadTemplates(){
  try {
    const resp = await fetch(API_BASE + PORTFOLIOS_ENDPOINT);
    if (resp.ok) {
      const j = await resp.json();
      const list = (j.portfolios || j).map(p => ({
        id: p.id || `${p.team_number}-${p.portfolio_type}`,
        name: p.team_name || ('Template ' + (p.id || '')),
        tags: p.tags || [],
        url: (p.templates && p.templates[0]) || p.pdf_url || p.thumbnail_url || ''
      }));
      displayTemplates(list);
      return;
    }
  } catch (err) { console.warn('templates backend not available:', err.message); }

  try {
    const resp2 = await fetch(LOCAL_FALLBACK_JSON);
    if (resp2.ok) {
      const j = await resp2.json();
      const list = (j.portfolios || j).map(p => ({
        id: p.id || `${p.team_number}-${p.portfolio_type}`,
        name: p.team_name || ('Template ' + (p.id || '')),
        tags: p.tags || [],
        url: (p.templates && p.templates[0]) || p.pdf_url || p.thumbnail_url || ''
      }));
      displayTemplates(list);
      return;
    }
  } catch (err) { console.warn('local templates fallback failed:', err.message); }

  const embedded = (EMBEDDED_FALLBACK.portfolios || []).map(p => ({ id: p.id, name: p.team_name, tags: p.tags || [], url: p.templates && p.templates[0] || p.pdf_url }));
  displayTemplates(embedded);
}

function displayTemplates(templates){
  const templatesList = document.getElementById('templatesList');
  const placeholder = document.getElementById('templatesPlaceholder');

  if (!templates || templates.length === 0) {
    if (placeholder) placeholder.style.display = 'block';
    if (templatesList) templatesList.style.display = 'none';
    return;
  }

  if (placeholder) placeholder.style.display = 'none';
  if (templatesList) templatesList.style.display = 'grid';

  templatesList.innerHTML = templates.map(t => `
    <div class="template-card" data-id="${escapeHtml(t.id)}">
      <div class="template-header">🖼️</div>
      <div class="template-body">
        <div class="template-name">${escapeHtml(t.name)}</div>
        <div class="template-tags">
          ${(t.tags||[]).slice(0,3).map(tag=>`<span class="template-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
      <div class="template-footer">
        <a class="template-btn" href="${encodeURI(t.url||'#')}" target="_blank" rel="noopener">⬇️ Скачать</a>
      </div>
    </div>
  `).join('');
}

async function searchTemplates(query){
  if (!query || query.trim().length < 2) { return loadTemplates(); }
  try {
    const resp = await fetch(LOCAL_FALLBACK_JSON);
    if (!resp.ok) throw new Error('no local file');
    const j = await resp.json();
    const list = (j.portfolios || []).filter(p => {
      const hay = ((p.description||'') + ' ' + (p.team_name||'') + ' ' + ((p.tags||[]).join(' '))).toLowerCase();
      return query.toLowerCase().split(/\s+/).every(token => hay.includes(token));
    }).map(p => ({ id:p.id || `${p.team_number}-${p.portfolio_type}`, name: p.team_name, tags: p.tags || [], url: (p.templates && p.templates[0]) || p.pdf_url }));
    displayTemplates(list);
  } catch (err) {
    showNotification('Ошибка поиска шаблонов: ' + err.message, 'error');
  }
}

function filterTemplates(){
  // Placeholder for client-side filtering
}

async function loadRandomTemplate(){
  try {
    const resp = await fetch(LOCAL_FALLBACK_JSON);
    if (!resp.ok) throw new Error('no local file');
    const j = await resp.json();
    const list = (j.portfolios || []).slice().sort(()=>0.5 - Math.random()).slice(0,6).map(p => ({ id:p.id || `${p.team_number}-${p.portfolio_type}`, name:p.team_name, tags:p.tags||[], url:(p.templates && p.templates[0]) || p.pdf_url }));
    displayTemplates(list);
    showNotification('Загружены случайные шаблоны', 'success');
  } catch (err) {
    showNotification('Ошибка загрузки: ' + err.message, 'error');
  }
}

// ---------- Admin placeholders ----------
function scanPortfolios(){
  document.getElementById('scanResult').style.display = 'block';
  document.getElementById('scanMessage').innerHTML = `✅ Сканирование запущено (заглушка)`;
  showNotification('Сканирование (заглушка)', 'info');
}

function generateTemplates(){
  document.getElementById('templateGenerationResult').style.display = 'block';
  document.getElementById('templateGenMessage').innerHTML = `✅ Генерация: (заглушка)`;
  showNotification('Генерация шаблонов (заглушка)', 'info');
}

function loadStats(){
  document.getElementById('statsResult').style.display = 'block';
  document.getElementById('statsMessage').innerHTML = `
    <strong>📊 Статистика (локальная)</strong><br>
    Используется локальная/встроенная база.
  `;
  showNotification('Статистика показана', 'success');
}

// ---------- Modals ----------
function setupModals(){
  document.querySelectorAll('.modal .close-btn').forEach(b => b.addEventListener('click', closeAllModals));
  document.querySelectorAll('.close-modal-btn').forEach(b => b.addEventListener('click', closeAllModals));
}
function closeAllModals(){ document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); }

// ---------- Connection check ----------
async function checkBackendConnection(){
  try {
    const r = await fetch(API_BASE + '/api/health-check');
    if (r.ok) console.log('Backend OK');
  } catch (err) { console.warn('Backend unreachable:', err.message); }
}

// ---------- Notifications & utils ----------
function showNotification(message, type='info'){
  const container = (type === 'error') ? document.getElementById('errorMessage') : document.getElementById('successMessage');
  if(!container) return;
  container.innerHTML = message;
  container.style.display = 'block';
  setTimeout(()=> container.style.display = 'none', 3200);
}
function escapeHtml(text){ if (!text) return ''; return String(text).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
