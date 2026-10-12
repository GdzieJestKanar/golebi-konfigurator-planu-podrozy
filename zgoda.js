/* Gołębie Latają: zgoda na cookies partnera (DW21). Plik generowany przez strony:generuj. */
(function () {
  var K = 'gl-zgoda', DRIVE = "https://emrldtp.com/NTgxMDk5.js?t=581099", T = {"tekst":"Klimat, ceny lotów i długie weekendy są u gołębi za darmo, bo utrzymują je partnerzy. Zgoda na ich cookies pozwala nam dalej tak działać, a Ty nic nie dopłacasz. Bez zgody wszystko działa tak samo.","tak":"Jasne, zgoda","nie":"Nie, dziękuję","wiecej":"Kto i po co"};
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
  function pokaz() {
    if (pasek) { pasek.hidden = false; return; }
    var st = document.createElement('style');
    st.textContent = '.gl-zgoda{position:fixed;left:12px;right:12px;bottom:12px;max-width:760px;margin:0 auto;background:#FFFDF8;color:#2A2C31;border:1.5px solid #2A2C31;border-radius:16px;padding:14px 18px;box-shadow:3px 3px 0 #2A2C31;z-index:2147483000;font:500 16px/1.5 Nunito,system-ui,sans-serif}.gl-zgoda p{margin:0 0 10px}.gl-zgoda button{font:inherit;font-weight:800;border-radius:14px;padding:9px 16px;margin:0 8px 0 0;cursor:pointer;border:1.5px solid #DDD5C4;background:#FFFDF8;color:#1F3B6E;min-height:44px}.gl-zgoda button.tak{background:#D0402A;border-color:#D0402A;color:#FFFDF8}.gl-zgoda a{color:#1F3B6E}';
    document.head.appendChild(st);
    pasek = document.createElement('div');
    pasek.className = 'gl-zgoda'; pasek.id = 'zgoda'; pasek.setAttribute('role', 'region'); pasek.setAttribute('aria-label', 'Cookies');
    var p = document.createElement('p'); p.textContent = T.tekst + ' ';
    var a = document.createElement('a'); a.href = '/polityka-prywatnosci.html'; a.textContent = T.wiecej; p.appendChild(a);
    var tak = document.createElement('button'); tak.type = 'button'; tak.className = 'tak'; tak.textContent = T.tak;
    var nie = document.createElement('button'); nie.type = 'button'; nie.textContent = T.nie;
    tak.onclick = function () { zapisz('tak'); pasek.hidden = true; laduj(); };
    nie.onclick = function () { zapisz('nie'); pasek.hidden = true; };
    pasek.appendChild(p); pasek.appendChild(tak); pasek.appendChild(nie);
    document.body.appendChild(pasek);
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
