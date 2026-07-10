/* Goal Labs — menú hamburguesa compartido para mobile/tablet (md:hidden).
   Agnóstico de contenido: cada página define su propio panel de links; este script
   solo maneja el toggle abrir/cerrar, así que sumar un ítem nuevo al nav (blog,
   recursos, soporte...) es solo agregar un <a> al panel, sin tocar este archivo. */
(function () {
  document.querySelectorAll('[data-mobile-menu-toggle]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    var iconOpen = btn.querySelector('.icon-open');
    var iconClose = btn.querySelector('.icon-close');

    function setOpen(open) {
      panel.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (iconOpen) iconOpen.classList.toggle('hidden', open);
      if (iconClose) iconClose.classList.toggle('hidden', !open);
    }

    btn.addEventListener('click', function () {
      setOpen(panel.classList.contains('hidden'));
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) setOpen(false);
    });
  });
})();
