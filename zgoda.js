/* Gołębie Latają: zgoda na cookies partnera (DW21). Plik generowany przez strony:generuj. */
(function () {
  // Klucz v2 od 15.10.2026: zgoda obejmuje też Microsoft Clarity, więc wcześniejsze „tak” pytamy jeszcze raz.
  var K = 'gl-zgoda-v2', DRIVE = "https://emrldtp.com/NTgxMDk5.js?t=581099", CLARITY = "yy9c57o9pl", T = {"w":{"a":{"tekst":"Ten przewodnik jest darmowy, bo utrzymują go linki partnerów, a mapa kliknięć (Microsoft Clarity) pokazuje nam, co poprawić. Oba zapisują cookies. Zgoda nic Cię nie kosztuje, a nam bardzo pomaga.","tak":"Zgoda, pomagam","nie":"Nie, dziękuję"},"c":{"tekst":"Gołąb pyta, zanim zajrzy: możemy zapisać cookies linków partnerów i mapy kliknięć (Microsoft Clarity)? Dzięki temu wiemy, co ulepszyć, a przewodnik zostaje za darmo.","tak":"Jasne","nie":"Nie, dziękuję"}},"wiecej":"Kto i po co","uk":{"w":{"a":{"tekst":"Цей путівник безкоштовний, бо його утримують партнерські посилання, а мапа кліків (Microsoft Clarity) показує нам, що покращити. Обидва зберігають cookies. Згода нічого вам не коштує, а нам дуже допомагає.","tak":"Згода, допомагаю","nie":"Ні, дякую"},"c":{"tekst":"Голуб питає, перш ніж зазирнути: можемо зберегти cookies партнерських посилань і мапи кліків (Microsoft Clarity)? Так ми знаємо, що покращити, а путівник лишається безкоштовним.","tak":"Звісно","nie":"Ні, дякую"}},"wiecej":"Хто і навіщо"}};
  function clarity() {
    if (!CLARITY || window.__glClarity) return;
    window.__glClarity = 1;
    (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, 'clarity', 'script', CLARITY);
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  }
  function laduj() {
    clarity();
    if (!DRIVE || window.__glDrive) return;
    window.__glDrive = 1;
    var s = document.createElement('script');
    s.async = 1; s.setAttribute('data-cmp-ab', '2'); s.src = DRIVE;
    document.head.appendChild(s);
  }
  function czytaj() { try { return localStorage.getItem(K); } catch (e) { return null; } }
  function zapisz(v) { try { localStorage.setItem(K, v); } catch (e) {} }
  var pasek = null;
  // N27: wybór w pasku jako zdarzenie GoatCounter (bez cookies), N22: pasek planu na telefonie wraca po zamknięciu.
  // N44: wersja tekstu losowana bez zapisu w przeglądarce (zapis przed zgodą wymagałby zgody).
  var L = document.documentElement.lang === 'uk' ? T.uk : T;
  var WK = Math.random() < 0.5 ? 'a' : 'c', W = L.w[WK];
  function zdarzenie(n) { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'zgoda-' + n + '-' + WK, title: 'Zgoda: ' + n + ' (' + WK + ')', event: true }); } catch (e) {} }
  function zamknij(v) { pasek.hidden = true; zdarzenie(v); try { document.dispatchEvent(new Event('gl-zgoda')); } catch (e) {} }
  function pokaz() {
    if (pasek) { pasek.hidden = false; document.dispatchEvent(new Event('gl-zgoda')); return; }
    var st = document.createElement('style');
    st.textContent = '.gl-zgoda{position:fixed;left:8px;right:8px;bottom:8px;max-width:760px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;background:#FFFDF8;color:#2A2C31;border:1.5px solid #2A2C31;border-radius:14px;padding:8px 12px;z-index:2147483000;font:500 15px/1.35 Nunito,system-ui,sans-serif}.gl-zgoda[hidden]{display:none}.gl-zgoda p{margin:0;flex:1 1 260px}.gl-zgoda button{font:inherit;font-weight:800;border-radius:12px;padding:6px 14px;cursor:pointer;border:1.5px solid #1F3B6E;background:#FFFDF8;color:#1F3B6E;min-height:40px}.gl-zgoda a{color:#1F3B6E;white-space:nowrap}.gl-zgoda .przyciski{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:8px}@media(max-width:640px){.gl-zgoda{font-size:14px;padding:8px 10px}.gl-zgoda p{flex-basis:100%}.gl-zgoda .przyciski{flex:1 1 100%}.gl-zgoda button{min-height:40px;padding:5px 14px}}';
    document.head.appendChild(st);
    pasek = document.createElement('div');
    pasek.className = 'gl-zgoda'; pasek.id = 'zgoda'; pasek.setAttribute('role', 'region'); pasek.setAttribute('aria-label', 'Cookies');
    var p = document.createElement('p'); p.textContent = W.tekst + ' ';
    var a = document.createElement('a'); a.href = '/polityka-prywatnosci.html'; a.textContent = L.wiecej; p.appendChild(a);
    var tak = document.createElement('button'); tak.type = 'button'; tak.className = 'tak'; tak.textContent = W.tak;
    var nie = document.createElement('button'); nie.type = 'button'; nie.textContent = W.nie;
    tak.onclick = function () { zapisz('tak'); zamknij('tak'); laduj(); };
    nie.onclick = function () { zapisz('nie'); zamknij('nie'); };
    // Oba przyciski zawsze tej samej szerokości (siatka 1fr 1fr): zgoda i odmowa równie widoczne.
    var pr = document.createElement('div'); pr.className = 'przyciski'; pr.appendChild(tak); pr.appendChild(nie);
    pasek.appendChild(p); pasek.appendChild(pr);
    document.body.appendChild(pasek);
    zdarzenie('pokaz');
    document.dispatchEvent(new Event('gl-zgoda'));
  }
  function start() {
    var z = czytaj();
    if (z === 'tak') laduj(); else if (z !== 'nie') pokaz();
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('[data-cookies]') : null;
      if (el) { e.preventDefault(); pokaz(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
