/* Gołębie Latają: świeże okazje z kanału na stronach statycznych. Plik generowany przez strony:generuj. */
(function () {
  var API = "https://api.golebielataja.pl";
  if (!window.fetch) return;
  function pobierz(q, el, ramka) {
    fetch(API + '/okazje/fragment' + q, { credentials: 'omit' }).then(function (r) { return r.ok ? r.text() : null; }).then(function (h) {
      if (h === null) return;
      if (ramka) { if (h) { el.innerHTML = h; el.hidden = false; } return; }
      if (h) el.innerHTML = h;
    }).catch(function () {});
  }
  var lista = document.querySelector('[data-okazje-lista]');
  if (lista) pobierz('', lista, false);
  var cz = document.querySelector('[data-okazje-typ="czarter"]');
  if (cz) pobierz('?typ=czarter', cz, false);
  var r = document.querySelector('[data-okazje-k]');
  if (r && /^[a-z0-9-]{2,60}$/.test(r.getAttribute('data-okazje-k'))) pobierz('?k=' + r.getAttribute('data-okazje-k'), r, true);
})();
