(function () {
  var root = document.querySelector('.rev');
  if (!root) return;
  var buttons  = root.querySelectorAll('.rev__lang-btn');
  var contents = root.querySelectorAll('.rev__body');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      buttons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      contents.forEach(function (c) {
        if (c.getAttribute('data-content') === lang) {
          c.classList.add('is-active');
        } else {
          c.classList.remove('is-active');
        }
      });
    });
  });
})();
