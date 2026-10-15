(function () {
  var f = document.querySelector('.pocztowka-form');
  if (!f) return;
  var s = f.parentNode.querySelector('[data-status]');
  var b = f.querySelector('button');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (f.firma.value) return;
    var email = f.email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { s.textContent = f.dataset.zly; return; }
    b.disabled = true;
    var tekst = b.textContent;
    b.textContent = f.dataset.wysylam;
    var body = new URLSearchParams({ access_key: f.dataset.k, subject: 'Nowy zapis na pocztówki', email: email, message: 'Zapis na pocztówki: ' + location.pathname });
    fetch('https://splitforms.com/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }, body: body.toString() })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        f.reset();
        s.textContent = f.dataset.gotowe;
        var a = document.createElement('a');
        a.href = f.dataset.raport;
        a.textContent = f.dataset.raportTekst;
        s.appendChild(a);
        b.textContent = tekst;
        if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'pocztowka-zapis', title: 'pocztowka-zapis', event: true });
      })
      .catch(function () { s.textContent = f.dataset.blad; b.disabled = false; b.textContent = tekst; });
  });
})();
