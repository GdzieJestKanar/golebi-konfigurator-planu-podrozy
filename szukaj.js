(function () {
  var f = document.querySelector('form[data-szukaj]');
  if (!f) return;
  var pole = f.querySelector('input');
  var brak = document.querySelector('.szukaj-brak');
  var main = f.closest('main');
  function norm(x) { return x.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u0142/g, 'l').trim(); }
  var sekcje = [].slice.call(document.querySelectorAll('section[data-kraj]')).map(function (s) {
    return { el: s, li: [].slice.call(s.querySelectorAll('li[data-s]')).map(function (li) {
      var t = li.getAttribute('data-s').split('|');
      return { el: li, t: t, n: t[0] || '', a: li.querySelector('a'), f: ' ' + (li.getAttribute('data-f') || '') + ' ' };
    }) };
  });
  var wybrana = '';
  function pasuje(t, q) {
    for (var i = 0; i < t.length; i++) {
      if (q.length >= 3 && t[i].indexOf(q) >= 0) return true;
      var slowa = t[i].split(/[\s:()\/-]+/);
      for (var j = 0; j < slowa.length; j++) if (slowa[j].indexOf(q) === 0) return true;
    }
    return false;
  }
  function filtruj() {
    var q = norm(pole.value), ile = 0, najlepszy = null, pierwszy = null;
    var cecha = wybrana ? ' ' + wybrana + ' ' : '';
    sekcje.forEach(function (s) {
      var w = 0;
      s.li.forEach(function (x) {
        var ok = (!q || pasuje(x.t, q)) && (!cecha || x.f.indexOf(cecha) >= 0);
        x.el.hidden = !ok;
        if (!ok) return;
        w++;
        if (!pierwszy) pierwszy = x;
        if (!najlepszy && q && x.n.indexOf(q) === 0) najlepszy = x;
      });
      s.el.hidden = w === 0;
      ile += w;
    });
    if (brak) brak.hidden = ile > 0;
    if (main) main.classList.toggle('szukam', Boolean(q || wybrana));
    return q ? najlepszy || pierwszy : null;
  }
  // Audyt 15.11.2026: filtry listy (nad morzem, miasta, do 3 godzin lotu) łączą się z wpisanym tekstem.
  var pasek = document.querySelector('[data-szukaj-filtr]');
  if (pasek) {
    pasek.hidden = false;
    pasek.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-f]');
      if (!b) return;
      wybrana = b.getAttribute('data-f');
      [].forEach.call(pasek.querySelectorAll('button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      filtruj();
    });
  }
  pole.addEventListener('input', filtruj);
  pole.addEventListener('keydown', function (e) { if (e.key === 'Escape') { pole.value = ''; filtruj(); } });
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var x = filtruj();
    if (x && x.a) location.href = x.a.href;
  });
  var q = new URLSearchParams(location.search).get('q');
  if (q) { pole.value = q; filtruj(); }
  if (location.hash === '#szukaj') pole.focus();
})();
