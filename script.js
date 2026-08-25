// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after tapping a link (mobile)
  siteNav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR NAV
// (CSS handles most of this via `scroll-behavior: smooth`;
// this covers browsers that ignore it and accounts for the
// fixed header height so headings aren't hidden underneath it.)
// ============================================================
const header = document.getElementById('site-header');

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

// ============================================================
// FOOTER YEAR
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================================
// CALENDLY EMBED (optional — wire up when you have a link)
//
// 1. In index.html, replace [YOUR-CALENDLY-URL] in the
//    #calendly-embed div's data-url attribute with your real
//    scheduling link, e.g. https://calendly.com/your-handle/intro-call
//
// 2. Add these two lines before </body> in index.html:
//      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
//      <script src="https://assets.calendly.com/assets/external/widget.js"></script>
//
// 3. That's it — the code below detects the script and renders
//    the inline widget automatically once both are present.
// ============================================================
const calendlyEl = document.getElementById('calendly-embed');
if (calendlyEl) {
  const calendlyUrl = calendlyEl.dataset.url;
  const isPlaceholder = !calendlyUrl || calendlyUrl.startsWith('[');

  if (!isPlaceholder && window.Calendly) {
    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: calendlyEl,
    });
  }
}
