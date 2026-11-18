/* EwaPay — barre d'action mobile + fermeture du menu au toucher extérieur.
   À charger en fin de page (balise script avec src="/assets/ewapay-mobile.js" et defer).
   Aucun effet au-dessus de 900 px de large. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  var mq = window.matchMedia('(max-width:900px)');
  var hero = document.querySelector('.hero .ctas');
  var head = document.querySelector('.site-head');
  var burger = document.getElementById('burger');

  // Menu : fermer en touchant en dehors
  if (head && burger) {
    document.addEventListener('click', function (e) {
      if (head.classList.contains('is-open') && !head.contains(e.target)) burger.click();
    });
  }

  // Simulateur : partie remplie des curseurs (variable CSS --p)
  [].forEach.call(document.querySelectorAll('.field input[type=range]'), function (r) {
    function fill() { var min = +r.min || 0, max = +r.max || 100; r.style.setProperty('--p', ((r.value - min) / (max - min)) * 100 + '%'); }
    r.addEventListener('input', fill); fill();
  });

  if (!hero) return; // barre uniquement sur l'accueil

  var bar = document.createElement('div');
  bar.className = 'm-cta';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Action rapide');
  bar.innerHTML =
    '<a class="btn" href="https://frontendprod.ewapay.app/login" target="_blank" rel="noopener">Commencer mon achat</a>' +
    '<a class="btn btn--ghost" href="#simulateur">Simuler</a>';
  document.body.appendChild(bar);

  var heroVisible = true, endVisible = false;
  function render() {
    var on = mq.matches && !heroVisible && !endVisible && !(head && head.classList.contains('is-open'));
    bar.classList.toggle('is-on', on);
    bar.inert = !on;
    bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    document.body.classList.toggle('has-m-cta', mq.matches);
  }

  new IntersectionObserver(function (es) {
    heroVisible = es[0].isIntersecting; render();
  }).observe(hero);

  // Masquée quand le simulateur, le bloc final ou le pied de page sont à l'écran :
  // ils ont déjà leur propre bouton.
  var seen = new Set();
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.isIntersecting ? seen.add(e.target) : seen.delete(e.target); });
    endVisible = seen.size > 0; render();
  });
  ['.ticket .btn', '#telecharger', 'footer'].forEach(function (s) {
    var el = document.querySelector(s); if (el) io.observe(el);
  });

  if (burger) burger.addEventListener('click', function () { setTimeout(render, 0); });
  (mq.addEventListener ? mq.addEventListener('change', render) : mq.addListener(render));
  render();
})();
