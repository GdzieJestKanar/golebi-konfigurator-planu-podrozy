(function () {
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
