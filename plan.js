(function () {
  // Czytanie (bez cookies, GoatCounter): czy ktoś doszedł do połowy i do końca strony, i które sekcje wybiera ze spisu treści.
  var czesci = location.pathname.split('/').filter(Boolean);
  var typ = (czesci[0] || 'glowna').slice(0, 24) + (czesci[0] === 'kierunki' && czesci.length >= 3 ? '-miesiac' : '');
  function zdarzenie(nazwa, tytul) {
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: nazwa, title: tytul, event: true });
  }
  var wyslane = {};
  function czytanie() {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (h <= 0) return;
    var proc = (scrollY / h) * 100;
    [50, 90].forEach(function (x) {
      if (proc >= x && !wyslane[x]) {
        wyslane[x] = 1;
        zdarzenie('czyt-' + x + '-' + typ, 'Przeczytane ' + x + '%: ' + typ);
      }
    });
  }
  addEventListener('scroll', czytanie, { passive: true });
  document.querySelectorAll('nav.spis a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () { zdarzenie('spis-' + a.getAttribute('href').slice(1, 30) + '-' + typ, 'Spis: ' + a.textContent); });
  });
  // Audyt 15.11.2026: formularz zamówienia to osobna aplikacja (ok. 700 kB skryptów, na telefonie 9,7 s do pierwszego
  // ekranu). Gdy ktoś najedzie na przycisk „Zamów plan” albo go dotknie, zaczynamy pobierać jej skrypty, zanim otworzy
  // się strona. Raz na wizytę i nie przy oszczędzaniu danych.
  var rozgrzane = false;
  function rozgrzej(e) {
    var a = e.target && e.target.closest && e.target.closest('a[href*="/nowy/start"]');
    if (!a || rozgrzane || !window.fetch) return;
    var siec = navigator.connection;
    if (siec && siec.saveData) return;
    rozgrzane = true;
    fetch(a.pathname, { credentials: 'omit' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (h) {
      var re = /<(?:script[^>]+src|link[^>]+rel="preload"[^>]+href)="([^"]+\.(?:js|ttf))"/g, m;
      while ((m = re.exec(h))) {
        var l = document.createElement('link');
        l.rel = 'prefetch';
        l.href = m[1];
        if (/\.ttf$/.test(m[1])) { l.as = 'font'; l.crossOrigin = 'anonymous'; } else l.as = 'script';
        document.head.appendChild(l);
      }
    }).catch(function () {});
  }
  ['pointerover', 'touchstart', 'focusin'].forEach(function (n) { document.addEventListener(n, rozgrzej, { passive: true, capture: true }); });
  var p = document.querySelector('.plan-pasek');
  if (!p) return;
  var koniec = document.getElementById('plan');
  var widacKoniec = false;
  if (koniec && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (w) { widacKoniec = w[0].isIntersecting; licz(); }).observe(koniec);
  }
  function licz() {
    var h = document.documentElement.scrollHeight - innerHeight;
    var zgoda = document.querySelector('.gl-zgoda:not([hidden])');
    p.hidden = !(h > 0 && scrollY / h > 0.25) || widacKoniec || !!zgoda;
  }
  addEventListener('scroll', licz, { passive: true });
  addEventListener('resize', licz);
  document.addEventListener('gl-zgoda', licz);
  licz();
})();
