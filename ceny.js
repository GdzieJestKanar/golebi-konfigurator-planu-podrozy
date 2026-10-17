/* Gołębie Latają: świeże ceny lotów na stronach statycznych. Plik generowany przez strony:generuj. */
(function () {
  var API = "https://api.golebielataja.pl", M = ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"], T = {"od":"od {c} zł","sprawdzono":"sprawdzone {d}","data":"{d} {m} {r}","krotka":"{d} {m}","zakres":"{od} do {do}"};
  var el = [].slice.call(document.querySelectorAll('[data-cena]'));
  if (!el.length || !window.fetch) return;
  var slugi = {};
  el.forEach(function (e) { slugi[e.getAttribute('data-cena').split('|')[0]] = 1; });
  var k = Object.keys(slugi).slice(0, 60).join(',');
  function dz(iso, rok) { var p = iso.slice(0, 10).split('-'), d = String(Number(p[2])), m = M[Number(p[1]) - 1]; return rok ? T.data.replace('{d}', d).replace('{m}', m).replace('{r}', p[0]) : T.krotka.replace('{d}', d).replace('{m}', m); }
  function zakres(od, d) {
    if (!d) return dz(od, true);
    if (od.slice(0, 4) !== d.slice(0, 4)) return T.zakres.replace('{od}', dz(od, true)).replace('{do}', dz(d, true));
    if (od.slice(0, 7) === d.slice(0, 7)) return T.zakres.replace('{od}', String(Number(od.slice(8, 10)))).replace('{do}', dz(d, true));
    return T.zakres.replace('{od}', dz(od, false)).replace('{do}', dz(d, true));
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (z) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[z]; }); }
  fetch(API + '/ceny.json?k=' + encodeURIComponent(k), { credentials: 'omit' }).then(function (r) { return r.ok ? r.json() : {}; }).then(function (d) {
    el.forEach(function (e) {
      var p = e.getAttribute('data-cena').split('|'), x = d[p[0]] && d[p[0]][p[2]] && d[p[0]][p[2]][p[1]];
      if (!x) return;
      var bylo = e.getAttribute('data-at'), c = e.getAttribute('data-c');
      if (bylo && String(x.c) === c && x.at <= bylo) return;
      var sub = /^[a-z0-9]{1,32}$/.test(p[3]) ? p[3] : '';
      var u = sub ? x.u.replace(/([?&]marker=\d+)(?=&|$)/, '$1.' + sub) : x.u;
      var dt = new Date(x.at), kiedy = dt.getDate() + ' ' + M[dt.getMonth()];
      var s = document.createElement('span');
      s.className = 'cena-zywa';
      s.setAttribute('data-cena', p.join('|'));
      s.setAttribute('data-at', x.at);
      s.setAttribute('data-c', String(x.c));
      s.innerHTML = '<a class="cena-lot" href="' + esc(u) + '" rel="sponsored nofollow noopener" target="_blank" data-goatcounter-click="p-aviasales-' + esc(sub) + '"><strong>' + esc(T.od.replace('{c}', x.c)) + '</strong></a> <small class="sprawdzono">' + esc(T.sprawdzono.replace('{d}', kiedy)) + '</small>';
      e.parentNode.replaceChild(s, e);
      var tr = s.closest && s.closest('tr'), kd = tr && tr.querySelector('[data-kiedy]');
      if (kd) kd.textContent = zakres(x.od, x.do);
    });
  }).catch(function () {});
})();
