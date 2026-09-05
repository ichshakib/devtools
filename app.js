/**
 * DevTools Portal Application Logic
 * Minimalist, distraction-free developer utilities portal
 * Features: live search, category filtering, dark/light theme toggle
 */

const TOOLS = [
  {
    id: 'base64-converter',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode and decode text, binary files, data URIs, and ASCII strings to and from Base64 format with instant preview.',
    category: 'converters',
    categoryLabel: 'Converters',
    badge: 'Encoder',
    url: 'tools/base64.html',
    tags: ['base64', 'encode', 'decode', 'binary', 'ascii'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>`
  },
  {
    id: 'android-icon-generator',
    name: 'Android Icon & Splash Generator',
    description: 'Generate complete Android asset packs: adaptive launcher icons, legacy mipmaps, Play Store 512px, and customizable splash screens with background colors and branding.',
    category: 'generators',
    categoryLabel: 'Generators',
    badge: 'Android',
    url: 'tools/android-icon-generator.html',
    tags: ['android', 'icon', 'splash', 'splash screen', 'adaptive icon', 'mipmap', 'play store', 'mobile'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="6" width="14" height="15" rx="2"></rect>
      <circle cx="9" cy="11" r="1"></circle>
      <circle cx="15" cy="11" r="1"></circle>
      <path d="M9 3l1.5 3"></path>
      <path d="M15 3l-1.5 3"></path>
      <line x1="2" y1="12" x2="5" y2="12"></line>
      <line x1="19" y1="12" x2="22" y2="12"></line>
    </svg>`
  },
  {
    id: 'ios-icon-generator',
    name: 'iOS App Icon Generator',
    description: 'Generate App Store-compliant iOS icon sets for iPhone and iPad with ready-to-use Xcode Contents.json asset catalogs and background fill controls.',
    category: 'generators',
    categoryLabel: 'Generators',
    badge: 'iOS',
    url: 'tools/ios-icon-generator.html',
    tags: ['ios', 'icon', 'iphone', 'ipad', 'apple', 'xcode', 'contents.json', 'app store', 'mobile'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>`
  },
  {
    id: 'electron-icon-generator',
    name: 'Electron & Desktop Icon Generator',
    description: 'Generate multi-resolution Windows .ico binaries, macOS Retina PNGs, and Linux desktop icons with Electron and electron-builder configs.',
    category: 'generators',
    categoryLabel: 'Generators',
    badge: 'Desktop',
    url: 'tools/electron-icon-generator.html',
    tags: ['electron', 'desktop', 'windows', 'ico', 'macos', 'linux', 'tauri', 'app icon'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>`
  },
  {
    id: 'favicon-generator',
    name: 'Web Favicon & Manifest Generator',
    description: 'Generate multi-resolution favicon.ico binaries, modern PNG favicons, Apple Touch icons, and site.webmanifest with live browser tab preview.',
    category: 'generators',
    categoryLabel: 'Generators',
    badge: 'Favicon',
    url: 'tools/favicon-generator.html',
    tags: ['favicon', 'ico', 'webmanifest', 'pwa', 'apple touch', 'browser', 'web'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>`
  },
  {
    id: 'app-icon-generator',
    name: 'Universal App Icon Generator',
    description: 'Generate all-in-one multi-platform icon asset sets for Desktop, iOS, Android, and Web Favicons in a single pass.',
    category: 'generators',
    categoryLabel: 'Generators',
    badge: 'All-in-One',
    url: 'tools/app-icon-generator.html',
    tags: ['icon', 'app icon', 'universal', 'desktop', 'electron', 'ico', 'windows', 'macos', 'mobile', 'ios', 'android', 'pwa', 'favicon', 'assets'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>`
  },
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    description: 'Convert titles, headlines, or sentences into clean, human-friendly, SEO-optimized URL slugs with custom delimiters.',
    category: 'generators',
    categoryLabel: 'Generators',
    badge: 'Text',
    url: 'tools/slug-generator.html',
    tags: ['slug', 'url', 'seo', 'string', 'permalink'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>`
  },
  {
    id: 'cron-job-generator',
    name: 'Cron Job Generator',
    description: 'Build, decipher, and validate standard 5-part crontab expressions with natural language descriptions and schedule previews.',
    category: 'generators',
    categoryLabel: 'Generators',
    badge: 'Schedule',
    url: 'tools/cron-generator.html',
    tags: ['cron', 'schedule', 'timer', 'crontab', 'devops'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    description: 'Configure web crawler access rules, user-agent directives, disallow paths, crawl-delay, and sitemap locations.',
    category: 'seo',
    categoryLabel: 'SEO & Web',
    badge: 'SEO',
    url: 'tools/robots-txt.html',
    tags: ['robots', 'txt', 'seo', 'crawler', 'disallow'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>`
  },
  {
    id: 'sitemap-xml-generator',
    name: 'Sitemap.xml Generator',
    description: 'Build XML sitemaps with URL entries, change frequency, priority scores, and lastmod timestamps for search indexing.',
    category: 'seo',
    categoryLabel: 'SEO & Web',
    badge: 'SEO',
    url: 'tools/sitemap-generator.html',
    tags: ['sitemap', 'xml', 'seo', 'urls', 'indexing'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>`
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Beautify, inspect, minfy, and validate JSON payloads with syntax error detection and clean indentation.',
    category: 'formatters',
    categoryLabel: 'Formatters',
    badge: 'Format',
    url: 'tools/json-formatter.html',
    tags: ['json', 'format', 'lint', 'validate', 'minify'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>`
  },
  {
    id: 'hash-generator',
    name: 'Hash & Checksum Generator',
    description: 'Compute client-side cryptographic hashes including MD5, SHA-1, SHA-256, and SHA-512 for texts and strings.',
    category: 'converters',
    categoryLabel: 'Converters',
    badge: 'Crypto',
    url: 'tools/hash-generator.html',
    tags: ['hash', 'sha256', 'md5', 'crypto', 'checksum'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>`
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder / Decoder',
    description: 'Safely escape and unescape query parameters, URIs, and special percent-encoded characters according to standard specifications.',
    category: 'converters',
    categoryLabel: 'Converters',
    badge: 'URI',
    url: 'tools/url-encoder.html',
    tags: ['url', 'uri', 'encode', 'decode', 'escape'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>`
  }
];

// State Management
let currentCategory = 'all';
let searchQuery = '';
let toastTimeout = null;

// DOM Elements
const toolsGrid = document.getElementById('tools-grid');
const emptyState = document.getElementById('empty-state');
const emptyMessage = document.getElementById('empty-message');
const searchInput = document.getElementById('tool-search');
const searchClearBtn = document.getElementById('search-clear');
const resetFilterBtn = document.getElementById('reset-filter-btn');
const resultsStats = document.getElementById('results-stats');
const filterPills = document.querySelectorAll('.filter-pill');
const themeToggle = document.getElementById('theme-toggle');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastMessage = document.getElementById('toast-message');
const toastClose = document.getElementById('toast-close');

// Initialize Application
function init() {
  if (!window.DevToolsComponents) {
    initTheme();
  }
  updateCategoryCounts();
  renderTools();
  attachEventListeners();
}

// Theme handling (dark mode default)
function initTheme() {
  const savedTheme = localStorage.getItem('devtools_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('devtools_theme', newTheme);
}

// Update count numbers in filter tabs
function updateCategoryCounts() {
  const counts = {
    all: TOOLS.length,
    generators: TOOLS.filter(t => t.category === 'generators').length,
    converters: TOOLS.filter(t => t.category === 'converters').length,
    seo: TOOLS.filter(t => t.category === 'seo').length,
    formatters: TOOLS.filter(t => t.category === 'formatters').length
  };

  Object.keys(counts).forEach(cat => {
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = counts[cat];
  });
}

// Filter tools based on query & category
function getFilteredTools() {
  const query = searchQuery.trim().toLowerCase();

  return TOOLS.filter(tool => {
    const matchesCategory = (currentCategory === 'all') || (tool.category === currentCategory);

    if (!matchesCategory) return false;
    if (!query) return true;

    const matchesName = tool.name.toLowerCase().includes(query);
    const matchesDesc = tool.description.toLowerCase().includes(query);
    const matchesTags = tool.tags.some(t => t.toLowerCase().includes(query));

    return matchesName || matchesDesc || matchesTags;
  });
}

// Render cards into grid
function renderTools() {
  const filtered = getFilteredTools();

  resultsStats.textContent = `Showing ${filtered.length} of ${TOOLS.length} tools`;

  if (filtered.length === 0) {
    toolsGrid.innerHTML = '';
    emptyState.style.display = 'block';
    if (searchQuery) {
      emptyMessage.textContent = `No utilities matched "${searchQuery}". Try a different keyword or reset filters.`;
    } else {
      emptyMessage.textContent = `No utilities currently found in the selected category.`;
    }
    return;
  }

  emptyState.style.display = 'none';

  toolsGrid.innerHTML = filtered.map(tool => `
    <a href="${tool.url}" class="tool-card" 
      data-id="${tool.id}" 
      aria-label="${escapeHtml(tool.name)} tool">
      <div class="card-header">
        <div class="tool-icon-wrapper" aria-hidden="true">
          ${tool.icon}
        </div>
        <span class="tool-badge">${tool.badge}</span>
      </div>
      <div class="card-body">
        <h3 class="tool-title">
          <span>${escapeHtml(tool.name)}</span>
        </h3>
        <p class="tool-desc">${escapeHtml(tool.description)}</p>
      </div>
      <div class="card-footer">
        <div class="tool-tags">
          ${tool.tags.slice(0, 3).map(tag => `<span class="tag-item">#${escapeHtml(tag)}</span>`).join('')}
        </div>
        <span class="card-action-btn">
          Open
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </a>
  `).join('');
}

// Feedback toast
function showToast(title, message) {
  if (toastTimeout) clearTimeout(toastTimeout);

  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Event Listeners setup
function attachEventListeners() {
  if (!window.DevToolsComponents && themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    searchClearBtn.style.display = searchQuery ? 'flex' : 'none';
    renderTools();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClearBtn.style.display = 'none';
    searchInput.focus();
    renderTools();
  });

  resetFilterBtn.addEventListener('click', () => {
    searchQuery = '';
    searchInput.value = '';
    searchClearBtn.style.display = 'none';
    currentCategory = 'all';

    filterPills.forEach(pill => {
      const isAll = pill.dataset.category === 'all';
      pill.classList.toggle('active', isAll);
      pill.setAttribute('aria-selected', isAll);
    });

    renderTools();
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });

      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      currentCategory = pill.dataset.category;
      renderTools();
    });
  });

  toolsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.tool-card');
    if (!card) return;
    handleCardSelect(card.dataset.id);
  });

  toolsGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.tool-card');
      if (card) {
        e.preventDefault();
        handleCardSelect(card.dataset.id);
      }
    }
  });

  // Back to top button
  if (!window.DevToolsComponents) {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Footer tool navigation links
  document.querySelectorAll('[data-footer-tool]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const toolId = link.getAttribute('data-footer-tool');
      
      // Reset search if query is hiding this tool
      if (searchQuery) {
        searchQuery = '';
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
      }

      // Ensure category matches or reset to 'all'
      const tool = TOOLS.find(t => t.id === toolId);
      if (tool && currentCategory !== 'all' && tool.category !== currentCategory) {
        currentCategory = 'all';
        filterPills.forEach(p => {
          const isAll = p.dataset.category === 'all';
          p.classList.toggle('active', isAll);
          p.setAttribute('aria-selected', isAll);
        });
      }

      renderTools();

      // Scroll to card and focus
      setTimeout(() => {
        const card = document.querySelector(`.tool-card[data-id="${toolId}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.focus();
        }
        handleCardSelect(toolId);
      }, 50);
    });
  });

  // Global Shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement !== searchInput)) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      if (searchInput.value) {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        renderTools();
      }
      searchInput.blur();
    }
  });
}

function handleCardSelect(toolId) {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;
  window.location.href = tool.url;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', init);
