/* Gołębie Latają: zgoda na cookies partnera (DW21). Plik generowany przez strony:generuj. */
(function () {
  var K = 'gl-zgoda', DRIVE = "https://emrldtp.com/NTgxMDk5.js?t=581099", T = {"tekst":"Linki partnerów mogą zapisać cookies. Cena dla Ciebie się nie zmienia.","tak":"Zgoda","nie":"Nie, dziękuję","wiecej":"Kto i po co"};
  function laduj() {
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
  function zdarzenie(n) { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'zgoda-' + n, title: 'Zgoda: ' + n, event: true }); } catch (e) {} }
  function zamknij(v) { pasek.hidden = true; zdarzenie(v); try { document.dispatchEvent(new Event('gl-zgoda')); } catch (e) {} }
  function pokaz() {
    if (pasek) { pasek.hidden = false; document.dispatchEvent(new Event('gl-zgoda')); return; }
    var st = document.createElement('style');
    st.textContent = '.gl-zgoda{position:fixed;left:8px;right:8px;bottom:8px;max-width:760px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;background:#FFFDF8;color:#2A2C31;border:1.5px solid #2A2C31;border-radius:14px;padding:8px 12px;z-index:2147483000;font:500 15px/1.35 Nunito,system-ui,sans-serif}.gl-zgoda[hidden]{display:none}.gl-zgoda p{margin:0;flex:1 1 260px}.gl-zgoda button{font:inherit;font-weight:800;border-radius:12px;padding:6px 14px;cursor:pointer;border:1.5px solid #1F3B6E;background:#FFFDF8;color:#1F3B6E;min-height:40px}.gl-zgoda a{color:#1F3B6E}@media(max-width:640px){.gl-zgoda{font-size:14px;padding:8px 10px}.gl-zgoda p{flex-basis:100%}.gl-zgoda button{min-height:38px;padding:5px 14px}}';
    document.head.appendChild(st);
    pasek = document.createElement('div');
    pasek.className = 'gl-zgoda'; pasek.id = 'zgoda'; pasek.setAttribute('role', 'region'); pasek.setAttribute('aria-label', 'Cookies');
    var p = document.createElement('p'); p.textContent = T.tekst + ' ';
    var a = document.createElement('a'); a.href = '/polityka-prywatnosci.html'; a.textContent = T.wiecej; p.appendChild(a);
    var tak = document.createElement('button'); tak.type = 'button'; tak.className = 'tak'; tak.textContent = T.tak;
    var nie = document.createElement('button'); nie.type = 'button'; nie.textContent = T.nie;
    tak.onclick = function () { zapisz('tak'); zamknij('tak'); laduj(); };
    nie.onclick = function () { zapisz('nie'); zamknij('nie'); };
    pasek.appendChild(p); pasek.appendChild(tak); pasek.appendChild(nie);
    document.body.appendChild(pasek);
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
