/**
 * DevTools Shared Components (Header & Footer)
 * Single-source of truth for site-wide navigation, footer, branding, and theme.
 * Edit this file to update the header or footer across all pages at once.
 */

(function () {
  'use strict';

  // Apply saved theme immediately to prevent FOUC
  const savedTheme = localStorage.getItem('devtools_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Determine if running from inside /tools/ subdirectory
  const inToolsDir = window.location.pathname.includes('/tools/') || 
                     window.location.href.includes('/tools/');

  const homeUrl = inToolsDir ? '../index.html' : 'index.html';
  const toolsPrefix = inToolsDir ? '' : 'tools/';
  const licenseUrl = inToolsDir ? '../LICENSE' : 'LICENSE';
  const brandIconClass = 'brand-icon';

  // SVG Logo Definition
  const LOGO_SVG = `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect class="logo-accent" x="10" y="23" width="22" height="4.5" rx="2.25"/>
      <rect class="logo-accent" x="19" y="33" width="12" height="4.5" rx="2.25"/>
      <rect class="logo-accent" x="19" y="43" width="6" height="4.5" rx="2.25"/>
      <rect class="logo-accent" x="19" y="58" width="16" height="4.5" rx="2.25"/>
      <rect class="logo-accent" x="18" y="68" width="18" height="4.5" rx="2.25"/>
      <rect class="logo-accent" x="71" y="32" width="14" height="4.5" rx="2.25"/>
      <circle class="logo-glass" cx="48" cy="46" r="23"/>
      <path class="logo-refl" d="M 36 43 A 15 15 0 0 1 47 33" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
      <rect class="logo-main" x="43" y="41" width="17" height="4.5" rx="1.5"/>
      <rect class="logo-accent" x="35" y="50" width="17" height="4.5" rx="1.5"/>
      <circle class="logo-rim" cx="48" cy="46" r="23" stroke-width="7.5"/>
      <path class="logo-rim" d="M 64.5 62.5 L 82.5 80.5" stroke-width="8.5" stroke-linecap="round"/>
    </svg>
  `;

  // Header Template
  function getHeaderHtml() {
    return `
      <div class="container header-inner">
        <a href="${homeUrl}" class="brand" aria-label="DevTools Home">
          <div class="${brandIconClass}" aria-hidden="true">
            ${LOGO_SVG}
          </div>
          <span class="brand-name">DevTools</span>
          <span class="brand-badge">v1.0</span>
        </a>

        <div class="header-actions">
          <button id="theme-toggle" class="icon-button" aria-label="Toggle theme" title="Toggle dark/light mode">
            <!-- Sun icon -->
            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- Moon icon -->
            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <a href="https://github.com/ichshakib/devtools" target="_blank" rel="noopener noreferrer" class="icon-button github-link" aria-label="GitHub Repository" title="GitHub Repository">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  // Footer Template
  function getFooterHtml() {
    return `
      <div class="container footer-content">
        <div class="footer-grid">
          <!-- Col 1: Brand & Local-First Philosophy -->
          <div class="footer-col footer-about">
            <a href="${homeUrl}" class="footer-brand" style="text-decoration: none; color: inherit;" aria-label="DevTools Home">
              <div class="brand-icon small" aria-hidden="true">
                ${LOGO_SVG}
              </div>
              <span class="brand-name">DevTools</span>
              <span class="brand-badge">v1.0</span>
            </a>
            <p class="footer-bio">
              An open-source, minimalist suite of developer utilities designed for speed and privacy. All computations happen client-side in your browser.
            </p>
          </div>

          <!-- Col 2: Featured Utilities (Generators & SEO) -->
          <div class="footer-col">
            <h4 class="footer-heading">Generators & SEO</h4>
            <ul class="footer-links">
              <li><a href="${toolsPrefix}android-icon-generator.html">Android Icon & Splash</a></li>
              <li><a href="${toolsPrefix}ios-icon-generator.html">iOS App Icon Generator</a></li>
              <li><a href="${toolsPrefix}electron-icon-generator.html">Electron & Desktop Icons</a></li>
              <li><a href="${toolsPrefix}favicon-generator.html">Web Favicon Generator</a></li>
              <li><a href="${toolsPrefix}app-icon-generator.html">Universal Icon Generator</a></li>
              <li><a href="${toolsPrefix}slug-generator.html">URL Slug Generator</a></li>
              <li><a href="${toolsPrefix}cron-generator.html">Cron Expression Builder</a></li>
              <li><a href="${toolsPrefix}robots-txt.html">Robots.txt Generator</a></li>
              <li><a href="${toolsPrefix}sitemap-generator.html">Sitemap.xml Generator</a></li>
            </ul>
          </div>

          <!-- Col 3: Encoders & Data -->
          <div class="footer-col">
            <h4 class="footer-heading">Encoders & Formatters</h4>
            <ul class="footer-links">
              <li><a href="${toolsPrefix}base64.html">Base64 Encoder / Decoder</a></li>
              <li><a href="${toolsPrefix}json-formatter.html">JSON Formatter & Validator</a></li>
              <li><a href="${toolsPrefix}hash-generator.html">Hash & Checksum (SHA-256)</a></li>
              <li><a href="${toolsPrefix}url-encoder.html">URL / URI Percent Encoder</a></li>
            </ul>
          </div>

          <!-- Col 4: Open Source & Shortcuts -->
          <div class="footer-col">
            <h4 class="footer-heading">Open Source</h4>
            <ul class="footer-links">
              <li><a href="https://github.com/ichshakib/devtools" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
              <li><a href="https://github.com/ichshakib/devtools/issues" target="_blank" rel="noopener noreferrer">Request a Tool / Issue</a></li>
              <li><a href="https://github.com/ichshakib/devtools/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License (MIT)</a></li>
              <li><a href="https://github.com/ichshakib" target="_blank" rel="noopener noreferrer">Author (@ichshakib)</a></li>
            </ul>
            
            <div class="footer-keymap">
              <span class="keymap-label">Quick Search</span>
              <div class="keymap-keys">
                <kbd class="kbd-inline">Ctrl</kbd> + <kbd class="kbd-inline">K</kbd> or <kbd class="kbd-inline">/</kbd>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Sub-Footer Bar -->
        <div class="footer-bottom">
          <div class="footer-bottom-left">
            <span>&copy; 2026 Shakib Khan. Distributed under the <a href="${licenseUrl}">MIT License</a>.</span>
          </div>
          <div class="footer-bottom-right">
            <button id="back-to-top" class="back-to-top-btn" aria-label="Scroll to top of page">
              <span>Back to top</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Inject Header and Footer into containers
  function renderLayout() {
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
      headerEl.innerHTML = getHeaderHtml();
    }

    const footerEl = document.getElementById('site-footer');
    if (footerEl) {
      footerEl.innerHTML = getFooterHtml();
    }

    initTheme();
    attachGlobalHandlers();
  }

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem('devtools_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle && !themeToggle._bound) {
      themeToggle._bound = true;
      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('devtools_theme', next);
      });
    }
  }

  // Shared Interactions: Back to top & Global Search Shortcut
  function attachGlobalHandlers() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn && !backToTopBtn._bound) {
      backToTopBtn._bound = true;
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (!window._devtoolsShortcutsBound) {
      window._devtoolsShortcutsBound = true;
      document.addEventListener('keydown', (e) => {
        const isSearchShortcut = (e.ctrlKey && e.key.toLowerCase() === 'k') || 
                                 (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA');
        if (isSearchShortcut) {
          e.preventDefault();
          const searchInput = document.getElementById('tool-search');
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          } else {
            window.location.href = `${homeUrl}#tool-search`;
          }
        }
      });
    }
  }

  // Run immediately if DOM is already loaded, otherwise listen for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderLayout);
  } else {
    renderLayout();
  }

  // Export functions to global scope for optional programmatic calls
  window.DevToolsComponents = {
    renderLayout,
    getHeaderHtml,
    getFooterHtml,
    initTheme
  };
})();
