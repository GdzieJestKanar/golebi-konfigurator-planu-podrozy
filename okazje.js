/* Gołębie Latają: świeże okazje z kanału na stronach statycznych. Plik generowany przez strony:generuj. */
(function () {
  var API = "https://api.golebielataja.pl";
  if (!window.fetch) return;
  function pobierz(q, el, ramka) {
    fetch(API + '/okazje/fragment' + q, { credentials: 'omit' }).then(function (r) { return r.ok ? r.text() : null; }).then(function (h) {
      if (h === null) return;
      if (ramka) { if (h) { el.innerHTML = h; el.hidden = false; } return; }
      if (h) { el.innerHTML = h; if (el === document.querySelector('[data-okazje-lista]')) filtr(el); }
    }).catch(function () {});
  }
  /* Filtr lotniska i rodzaju na /okazje/: przyciski z tego, co jest na liście, najwyżej N kart na start. */
  var stan = { z: '', typ: '', wszystkie: false };
  try { stan.z = localStorage.getItem('gl-okazje-z') || ''; } catch (e) {}
  function filtr(lista) {
    var pole = document.querySelector('[data-okazje-filtr]');
    if (!pole) return;
    var T; try { T = JSON.parse(pole.getAttribute('data-okazje-filtr')); } catch (e) { return; }
    var karty = [].slice.call(lista.querySelectorAll('article.okazja'));
    var lotniska = [], typy = [];
    karty.forEach(function (k) {
      (k.getAttribute('data-z') || '').split(' ').forEach(function (z) { if (z && T.lotniska[z] && lotniska.indexOf(z) < 0) lotniska.push(z); });
      var t = k.getAttribute('data-typ'); if (t && T.typy[t] && typy.indexOf(t) < 0) typy.push(t);
    });
    if (lotniska.indexOf(stan.z) < 0) stan.z = '';
    if (typy.indexOf(stan.typ) < 0) stan.typ = '';
    lotniska.sort(function (a, b) { return T.lotniska[a].localeCompare(T.lotniska[b], 'pl'); });
    function rzad(tytul, klucz, pierwszy, wartosci, nazwy) {
      if (wartosci.length < 2) return;
      var p = document.createElement('p'); p.textContent = tytul; pole.appendChild(p);
      var d = document.createElement('div'); d.className = 'chipy'; pole.appendChild(d);
      [''].concat(wartosci).forEach(function (w) {
        var b = document.createElement('button'); b.type = 'button';
        b.textContent = w ? nazwy[w] : pierwszy;
        b.setAttribute('aria-pressed', stan[klucz] === w ? 'true' : 'false');
        b.addEventListener('click', function () {
          stan[klucz] = w; stan.wszystkie = false;
          if (klucz === 'z') { try { localStorage.setItem('gl-okazje-z', w); } catch (e) {} }
          filtr(lista);
        });
        d.appendChild(b);
      });
    }
    pole.textContent = '';
    rzad(T.skad, 'z', T.wszystkieLotniska, lotniska, T.lotniska);
    rzad(T.rodzaj, 'typ', T.wszystko, typy, T.typy);
    pole.hidden = !pole.firstChild;
    var stare = lista.querySelectorAll('.okazje-wiecej, .okazje-brak, .okazje-foto-zrodla');
    for (var i = 0; i < stare.length; i++) stare[i].parentNode.removeChild(stare[i]);
    var pasuje = 0, ukryte = 0;
    karty.forEach(function (k) {
      var z = (k.getAttribute('data-z') || '').split(' ').filter(Boolean);
      /* Oferta bez lotniska (wycieczki z wielu miast) pasuje do każdego lotniska. */
      var ok = (!stan.z || !z.length || z.indexOf(stan.z) > -1) && (!stan.typ || k.getAttribute('data-typ') === stan.typ);
      if (ok) pasuje++;
      var widac = ok && (stan.wszystkie || pasuje <= T.naStart);
      if (ok && !widac) ukryte++;
      k.hidden = !widac;
    });
    /* Zdjęcie kierunku na widocznych kartach i podpisy autorów pod listą (wymóg licencji zdjęć). */
    var podpisy = {}, sa = false;
    karty.forEach(function (k) {
      var slug = k.getAttribute('data-k'), f = slug && T.foto && T.foto[slug];
      if (!f) return;
      if (!k.hidden && !k.querySelector('.okazja-foto')) {
        var pic = document.createElement('picture'); pic.className = 'okazja-foto';
        var src = document.createElement('source'); src.type = 'image/avif'; src.srcset = f[0] + '-480.avif';
        var img = document.createElement('img'); img.src = f[0] + '-480.webp'; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.width = 480; img.height = 320;
        pic.appendChild(src); pic.appendChild(img); k.insertBefore(pic, k.firstChild);
      }
      if (k.querySelector('.okazja-foto')) { podpisy[slug] = f; sa = true; }
    });
    if (karty.length && !pasuje) {
      var brak = document.createElement('p'); brak.className = 'okazje-brak'; brak.textContent = T.brak; lista.appendChild(brak);
    }
    if (ukryte) {
      var w = document.createElement('button'); w.type = 'button'; w.className = 'okazje-wiecej';
      w.textContent = T.wiecej.replace('%n', ukryte);
      w.addEventListener('click', function () { stan.wszystkie = true; filtr(lista); });
      lista.appendChild(w);
    }
    if (sa) {
      var zr = document.createElement('p'); zr.className = 'okazje-foto-zrodla'; zr.appendChild(document.createTextNode('Fot. '));
      Object.keys(podpisy).forEach(function (slug, i) {
        var f = podpisy[slug], a = document.createElement('a');
        a.href = f[3]; a.rel = 'nofollow noopener'; a.textContent = f[1] + ': ' + f[2];
        if (i) zr.appendChild(document.createTextNode(', '));
        zr.appendChild(a);
      });
      lista.appendChild(zr);
    }
  }
  var lista = document.querySelector('[data-okazje-lista]');
  if (lista) { filtr(lista); pobierz('', lista, false); }
  var cz = document.querySelector('[data-okazje-typ="czarter"]');
  if (cz) pobierz('?typ=czarter', cz, false);
  var r = document.querySelector('[data-okazje-k]');
  if (r && /^[a-z0-9-]{2,60}$/.test(r.getAttribute('data-okazje-k'))) pobierz('?k=' + r.getAttribute('data-okazje-k'), r, true);
})();
