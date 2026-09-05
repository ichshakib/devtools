/**
 * Shared utility functions for DevTools Tool Pages
 * Theme toggling, clipboard copy, file download, and toast alerts
 */

function initTheme() {
  if (window.DevToolsComponents) return;
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

// Zero-dependency pure JavaScript ZIP file generator (PKZIP 2.0 Store format)
const CRC32_TABLE = (function() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
})();

function calculateCrc32(uint8Array) {
  let crc = -1;
  for (let i = 0; i < uint8Array.length; i++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ uint8Array[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

/**
 * Builds a ZIP archive (Blob) from an array of file objects
 * @param {Array<{ name: string, data: Uint8Array|ArrayBuffer|Blob|string }>} files
 * @returns {Promise<Blob>}
 */
async function createZipBlob(files) {
  const enc = new TextEncoder();
  const entries = [];
  let offset = 0;

  const now = new Date();
  const time = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) & 0xFFFF;
  const date = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xFFFF;

  for (const item of files) {
    const nameBytes = enc.encode(item.name);
    let dataBytes;

    if (item.data instanceof Blob) {
      const ab = await item.data.arrayBuffer();
      dataBytes = new Uint8Array(ab);
    } else if (item.data instanceof ArrayBuffer) {
      dataBytes = new Uint8Array(item.data);
    } else if (typeof item.data === 'string') {
      dataBytes = enc.encode(item.data);
    } else if (item.data instanceof Uint8Array) {
      dataBytes = item.data;
    } else {
      dataBytes = new Uint8Array(0);
    }

    const crc = calculateCrc32(dataBytes);
    const size = dataBytes.length;

    // Local file header (30 bytes + name length)
    const lh = new Uint8Array(30 + nameBytes.length);
    const dv = new DataView(lh.buffer);
    dv.setUint32(0, 0x04034b50, true); // signature
    dv.setUint16(4, 20, true);         // version needed
    dv.setUint16(6, 0x0800, true);     // flags: UTF-8 filename
    dv.setUint16(8, 0, true);          // compression method: 0 (Store)
    dv.setUint16(10, time, true);      // mod time
    dv.setUint16(12, date, true);      // mod date
    dv.setUint32(14, crc, true);       // crc32
    dv.setUint32(18, size, true);      // compressed size
    dv.setUint32(22, size, true);      // uncompressed size
    dv.setUint16(26, nameBytes.length, true); // filename length
    dv.setUint16(28, 0, true);         // extra field length
    lh.set(nameBytes, 30);

    entries.push({
      nameBytes,
      dataBytes,
      crc,
      size,
      time,
      date,
      offset,
      lh
    });

    offset += lh.length + size;
  }

  // Central Directory
  const cdOffset = offset;
  let cdSize = 0;
  const cds = [];

  for (const e of entries) {
    const cd = new Uint8Array(46 + e.nameBytes.length);
    const dv = new DataView(cd.buffer);
    dv.setUint32(0, 0x02014b50, true); // signature
    dv.setUint16(4, 20, true);         // version made by
    dv.setUint16(6, 20, true);         // version needed
    dv.setUint16(8, 0x0800, true);     // flags: UTF-8
    dv.setUint16(10, 0, true);         // compression method: Store
    dv.setUint16(12, e.time, true);    // mod time
    dv.setUint16(14, e.date, true);    // mod date
    dv.setUint32(16, e.crc, true);     // crc32
    dv.setUint32(20, e.size, true);    // compressed size
    dv.setUint32(24, e.size, true);    // uncompressed size
    dv.setUint16(28, e.nameBytes.length, true); // filename length
    dv.setUint16(30, 0, true);         // extra field length
    dv.setUint16(32, 0, true);         // comment length
    dv.setUint16(34, 0, true);         // disk number start
    dv.setUint16(36, 0, true);         // internal file attributes
    dv.setUint32(38, 0x81a40000, true);// external file attributes (normal file)
    dv.setUint32(42, e.offset, true);  // relative offset of local header
    cd.set(e.nameBytes, 46);

    cds.push(cd);
    cdSize += cd.length;
  }

  // End of Central Directory (22 bytes)
  const eocd = new Uint8Array(22);
  const edv = new DataView(eocd.buffer);
  edv.setUint32(0, 0x06054b50, true);  // signature
  edv.setUint16(4, 0, true);           // disk number
  edv.setUint16(6, 0, true);           // disk number with start of CD
  edv.setUint16(8, entries.length, true); // number of CD records on disk
  edv.setUint16(10, entries.length, true);// total number of CD records
  edv.setUint32(12, cdSize, true);     // size of central directory
  edv.setUint32(16, cdOffset, true);   // offset of start of CD
  edv.setUint16(20, 0, true);          // comment length

  const totalLength = cdOffset + cdSize + 22;
  const out = new Uint8Array(totalLength);
  let pos = 0;

  for (const e of entries) {
    out.set(e.lh, pos);
    pos += e.lh.length;
    out.set(e.dataBytes, pos);
    pos += e.dataBytes.length;
  }

  for (const cd of cds) {
    out.set(cd, pos);
    pos += cd.length;
  }

  out.set(eocd, pos);

  return new Blob([out], { type: 'application/zip' });
}

/**
 * Downloads a ZIP archive client-side
 * @param {string} filename
 * @param {Array<{ name: string, data: Uint8Array|ArrayBuffer|Blob|string }>} files
 */
async function downloadZip(filename, files) {
  if (!files || files.length === 0) {
    showToast('Nothing to ZIP', 'No files provided for archive.');
    return;
  }
  showToast('Creating ZIP', `Packing ${files.length} files...`);
  const blob = await createZipBlob(files);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.zip') ? filename : `${filename}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded ZIP', `Saved ${a.download}`);
}

function initSharedUI() {
  if (window.DevToolsComponents) return;

  initTheme();

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Ctrl+K or / navigates back to index search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      window.location.href = '../index.html#tool-search';
    }
  });
}

document.addEventListener('DOMContentLoaded', initSharedUI);
