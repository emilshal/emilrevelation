(function () {
  var NAMESPACE = 'emilrevelation';
  var KEY = 'site-visits';
  var SESSION_FLAG = 'er_visit_counted';
  var BASE = 'https://abacus.jasoncameron.dev';

  function render(value) {
    var el = document.getElementById('visit-count');
    if (!el) return;
    el.textContent = (typeof value === 'number') ? value.toLocaleString() : '—';
  }

  function load() {
    var counted = false;
    try { counted = sessionStorage.getItem(SESSION_FLAG) === '1'; } catch (e) {}

    var url = counted
      ? BASE + '/get/' + NAMESPACE + '/' + KEY
      : BASE + '/hit/' + NAMESPACE + '/' + KEY;

    fetch(url)
      .then(function (res) {
        if (!res.ok) {
          // /get fails if counter doesn't exist yet — fall back to /hit once.
          if (counted) return fetch(BASE + '/hit/' + NAMESPACE + '/' + KEY).then(function (r) { return r.json(); });
          throw new Error('counter request failed');
        }
        return res.json();
      })
      .then(function (data) {
        render(data && typeof data.value === 'number' ? data.value : null);
        if (!counted) {
          try { sessionStorage.setItem(SESSION_FLAG, '1'); } catch (e) {}
        }
      })
      .catch(function () { render(null); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
