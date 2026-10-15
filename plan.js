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
