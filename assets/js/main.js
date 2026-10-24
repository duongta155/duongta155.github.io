// Theme toggle (remembers choice), mobile menu, active-section highlighting, image lightbox.
(function () {
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const saved = store.get('theme');
  if (saved) root.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    // Theme
    const tbtn = document.getElementById('theme-toggle');
    if (tbtn) tbtn.addEventListener('click', function () {
      const cur = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set('theme', next);
    });

    // Mobile menu
    const mbtn = document.getElementById('menu-toggle');
    const links = document.querySelector('.nav-links');
    if (mbtn && links) {
      mbtn.addEventListener('click', function () {
        const open = links.classList.toggle('open');
        mbtn.setAttribute('aria-expanded', open);
      });
      links.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') { links.classList.remove('open'); mbtn.setAttribute('aria-expanded', 'false'); }
      });
    }

    // Active nav link
    const navAs = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const map = new Map(navAs.map(a => [a.getAttribute('href').slice(1), a]));
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting && map.has(en.target.id)) {
            navAs.forEach(a => a.classList.remove('active'));
            map.get(en.target.id).classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      map.forEach((_, id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
    }

    // Lightbox
    const lb = document.getElementById('lightbox');
    const lbImg = lb && lb.querySelector('img');
    const lbCap = lb && lb.querySelector('figcaption');
    let lastFocus = null;
    function close() { lb.classList.remove('open'); lbImg.src = ''; if (lastFocus) lastFocus.focus(); }
    document.querySelectorAll('[data-full]').forEach(btn => {
      btn.addEventListener('click', function () {
        lastFocus = btn;
        lbImg.src = btn.getAttribute('data-full');
        lbImg.alt = btn.getAttribute('data-caption') || '';
        lbCap.textContent = btn.getAttribute('data-caption') || '';
        lb.classList.add('open');
        lb.querySelector('.close').focus();
      });
    });
    if (lb) {
      lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('close')) close(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
    }

    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
