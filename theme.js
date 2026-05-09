(function () {
  var KEY = 'er_theme';

  function readTheme() {
    try { return localStorage.getItem(KEY) || 'dark'; } catch (e) { return 'dark'; }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  function init() {
    applyTheme(readTheme());
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
