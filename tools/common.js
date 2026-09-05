/**
 * Shared utility functions for DevTools Tool Pages
 * Theme toggling, clipboard copy, file download, and toast alerts
 */

function initTheme() {
  const savedTheme = localStorage.getItem('devtools_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('devtools_theme', next);
    });
  }
}

function showToast(title, message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-indicator"></span>
        <div class="toast-body">
          <strong id="toast-title"></strong>
          <p id="toast-message"></p>
        </div>
      </div>
      <button class="toast-close" id="toast-close" aria-label="Dismiss">&times;</button>
    `;
    document.body.appendChild(toast);
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-message').textContent = message;
  toast.classList.add('show');

  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function copyToClipboard(text, label = 'Content') {
  if (!text) {
    showToast('Nothing to copy', 'Input or output is currently empty.');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied!', `${label} copied to clipboard.`);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Copied!', `${label} copied to clipboard.`);
  });
}

function downloadTextFile(filename, content, mimeType = 'text/plain') {
  if (!content) {
    showToast('Nothing to save', 'Output content is currently empty.');
    return;
  }
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded', `Saved ${filename}`);
}

document.addEventListener('DOMContentLoaded', initTheme);
