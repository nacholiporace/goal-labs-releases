/* Goal Labs — motor compartido para páginas secundarias (partners/creadores/analistas).
   Requiere que la página defina `window.I18N = { es: {...}, en: {...}, it: {...} }` en un
   <script> ANTES de cargar este archivo. Misma lógica de detección/persistencia que index.html,
   sin GSAP/Lenis: el reveal-on-scroll usa IntersectionObserver simple. */
(function () {
  var I18N = window.I18N || { es: {}, en: {}, it: {} };
  var SUPPORTED = ['es', 'en', 'it'];
  var STORAGE_KEY = 'gl_lang';
  var current = 'es';

  function detect() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var code = (langs[i] || '').toLowerCase().slice(0, 2);
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return 'en';
  }

  function apply(lang) {
    var d = I18N[lang] || I18N.es;
    current = lang;
    document.documentElement.lang = lang;
    if (d['meta.title']) document.title = d['meta.title'];
    var md = document.querySelector('meta[name="description"]');
    if (md && d['meta.description']) md.setAttribute('content', d['meta.description']);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (d[k] != null) el.textContent = d[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      if (d[k] != null) el.innerHTML = d[k];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (d[k] != null) el.setAttribute('aria-label', d[k]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt');
      if (d[k] != null) el.setAttribute('alt', d[k]);
    });

    var sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;
  }

  window.GLi18n = { apply: apply, t: function (k) { var d = I18N[current] || I18N.es; return d[k]; }, get lang() { return current; } };

  apply(detect());

  var sel = document.getElementById('lang-select');
  if (sel) {
    sel.addEventListener('change', function () {
      var lang = sel.value;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      apply(lang);
    });
  }

  // Reveal-on-scroll liviano (sin GSAP)
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  // Descarga directa: trae el asset .exe del último release de GitHub
  (function () {
    fetch('https://api.github.com/repos/nacholiporace/goal-labs-releases/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (!data) return;
        var asset = (data.assets || []).find(function (a) { return a.name.endsWith('.exe'); });
        if (!asset) return;
        document.querySelectorAll('[data-download]').forEach(function (btn) {
          btn.href = asset.browser_download_url;
          btn.removeAttribute('target');
          btn.setAttribute('download', asset.name);
        });
        var versionNum = document.getElementById('version-num');
        if (versionNum && data.tag_name) versionNum.textContent = data.tag_name;
      })
      .catch(function () {});
  })();

  // Cinta de fotos (si la página la incluye)
  document.querySelectorAll('.glcinta .glcinta-track').forEach(function (track) {
    if (track.children.length === 1) { track.appendChild(track.firstElementChild.cloneNode(true)); }
    var speed = parseFloat(track.getAttribute('data-speed')) || 55;
    var setDur = function () {
      var w = track.firstElementChild.offsetWidth;
      if (!w) return;
      var dur = w / speed;
      var prev = parseFloat(track.style.getPropertyValue('--dur')) || 0;
      if (!prev || Math.abs(dur - prev) / dur > 0.05) { track.style.setProperty('--dur', dur.toFixed(2) + 's'); }
    };
    if (window.ResizeObserver) { new ResizeObserver(setDur).observe(track.firstElementChild); }
    window.addEventListener('load', setDur);
    setDur();
  });
})();
