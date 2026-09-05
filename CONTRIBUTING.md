# Contributing to DevTools

Thank you for your interest in contributing to **DevTools**!

DevTools is an open-source, minimalist, distraction-free suite of developer utilities designed for speed, privacy, and simplicity. All contributions — whether adding new tools, enhancing existing features, fixing bugs, or improving documentation — are warmly welcomed.

---

## Core Guiding Principles

Before building or proposing a feature, please keep our fundamental philosophy in mind:

1. **100% Client-Side & Local-First**: No user data, files, hashes, or code snippets must ever leave the user's browser. We do **not** use telemetry, remote APIs, or tracking scripts.
2. **Zero Runtime Dependencies**: The project relies strictly on standard web technologies (HTML5, Vanilla CSS, and modern JavaScript ES6+). Do not introduce runtime npm packages, bundlers, or heavy UI frameworks.
3. **Minimalist & Distraction-Free Aesthetic**: We maintain a high-contrast monochrome design system with unified typography, consistent spacing, and flawless dark/light mode compatibility.
4. **Single Source of Truth**: All shared navigation, footers, theme state, and global keybindings are hydrated via `components.js`.

---

## Getting Started

### Local Development Setup

DevTools has **zero build steps** and requires no build tools to get started.

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/<your-username>/devtools.git
   cd devtools
   ```

2. **Run a Local Static Server**:
   You can use any lightweight HTTP server:
   ```bash
   # Option A: Python 3
   python -m http.server 3000

   # Option B: Node.js (npx)
   npx serve .

   # Option C: PHP
   php -S localhost:3000
   ```

3. **Open the App**:
   Navigate to `http://localhost:3000` in your web browser.

---

## How to Add a New Tool

Follow this step-by-step checklist whenever creating a new utility:

### Step 1: Create the Tool Page (`tools/<your-tool-id>.html`)
Create a new HTML file inside the `tools/` directory. Use the standard structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Tool Name - DevTools</title>
  <meta name="description" content="A brief, clear description of what your tool accomplishes.">
  <link rel="icon" type="image/x-icon" href="../favicon_io/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
  <script src="../components.js"></script>
</head>
<body>
  <!-- Header (automatically hydrated by components.js) -->
  <header id="site-header" class="site-header"></header>

  <main class="main-content">
    <div class="container">
      <div class="tool-page-header">
        <a href="../index.html" class="back-link">&larr; Back to all tools</a>
        <div class="tool-page-title-row">
          <h1 class="tool-page-title">Your Tool Name</h1>
          <span class="tool-badge">Category</span>
        </div>
        <p class="tool-page-desc">Clear explanation of what the tool does.</p>
      </div>

      <!-- Main Tool Workspace -->
      <div class="tool-workspace">
        <!-- Input Panel -->
        <div class="tool-panel">
          <div class="panel-header">
            <span class="panel-title">Input</span>
          </div>
          <!-- Form controls, textarea, inputs -->
        </div>

        <!-- Output Panel -->
        <div class="tool-panel">
          <div class="panel-header">
            <span class="panel-title">Output</span>
            <button id="btn-copy" class="btn-sm">Copy</button>
          </div>
          <!-- Results, preview, export -->
        </div>
      </div>
    </div>
  </main>

  <!-- Footer (automatically hydrated by components.js) -->
  <footer id="site-footer" class="site-footer"></footer>

  <script src="common.js"></script>
  <script>
    // Tool logic here
  </script>
</body>
</html>
```

### Step 2: Use Shared Helper Functions (`common.js`)
Take advantage of existing utility functions provided in `tools/common.js`:
- `showToast(title, message)`: Display non-intrusive feedback to the user.
- `copyToClipboard(text, label)`: Copy content with graceful fallback.
- `downloadTextFile(filename, content, mimeType)`: Trigger instant text file download.
- `downloadZip(filename, files)`: Pack files client-side and download as a single `.zip` archive.

### Step 3: Register in `app.js`
Open `app.js` and add an entry for your new tool in the `TOOLS` array:

```javascript
{
  id: 'your-tool-id',
  name: 'Your Tool Name',
  description: 'Descriptive summary of the utility and what problem it solves.',
  category: 'generators', // 'generators', 'converters', 'seo', or 'formatters'
  categoryLabel: 'Generators',
  badge: 'Category',
  url: 'tools/your-tool-id.html',
  tags: ['keyword1', 'keyword2', 'keyword3'],
  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- SVG outline icon -->
  </svg>`
}
```

### Step 4: Add Navigation Link in `components.js`
Open `components.js` and add a link to the appropriate column in `getFooterHtml()`:
```html
<li><a href="${toolsPrefix}your-tool-id.html">Your Tool Name</a></li>
```

### Step 5: Test & Validate
- Verify the page loads cleanly with no console errors in both Light and Dark themes.
- Test keyboard navigation and responsive mobile layout.
- Validate JavaScript syntax:
  ```bash
  node --check app.js
  node --check components.js
  node --check tools/common.js
  ```

---

## Coding Standards & Design Guidelines

- **Vanilla CSS Tokens**: Always use design system variables defined in `style.css`:
  - Backgrounds: `var(--bg-primary)`, `var(--bg-secondary)`, `var(--bg-tertiary)`
  - Borders: `var(--border-color)`, `var(--border-subtle)`, `var(--border-hover)`
  - Text: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
  - Fonts: `var(--font-sans)` for UI, `var(--font-mono)` for code/hashes/numbers
- **Responsive Layout**: Tools must render cleanly on mobile viewports (minimum 320px width).
- **Semantics & Accessibility**: Use proper labels for `<input>` fields, meaningful `aria-label` attributes on icon buttons, and logical heading hierarchy (`h1`, `h2`, `h3`).

---

## Submitting a Pull Request

1. **Create a branch** for your feature or bugfix:
   ```bash
   git checkout -b feat/my-new-tool
   ```
2. **Commit your changes** with clear, semantic commit messages:
   ```bash
   git commit -m "feat: add SVG optimizer tool"
   ```
3. **Push to your fork**:
   ```bash
   git push origin feat/my-new-tool
   ```
4. **Open a Pull Request** against the `main` branch of `ichshakib/devtools`. Provide a brief summary of the tool or fix and any testing steps.

---

## Community & Questions

If you have questions, need guidance, or want to discuss an idea before implementing it, please open an issue in the [GitHub Issues](https://github.com/ichshakib/devtools/issues) tracker.

Thank you for helping make developer workflows faster, simpler, and more private!
