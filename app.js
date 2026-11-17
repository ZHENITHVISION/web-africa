// Navigation menu toggle
const menu = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    menu.focus();
  }
});

// Category filtering
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelectorAll('[data-category]').forEach(card => card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter);
  });
});

// Brief form handling
const form = document.querySelector('#brief');
if (form) {
  const params = new URLSearchParams(location.search);
  for (const [param, id] of [['offre', 'offer'], ['secteur', 'sector']]) {
    const el = document.getElementById(id);
    if (el && [...el.options].some(x => x.value === params.get(param))) el.value = params.get(param);
  }
  let message = '';
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const f = new FormData(form);
    message = `Bonjour WEB AFRICA,\n\nJe souhaite un devis pour mon projet.\nNom : ${f.get('name')}\nEntreprise : ${f.get('company') || 'À préciser'}\nSecteur : ${f.get('sector')}\nBesoin : ${f.get('offer')}\nBudget : ${f.get('budget')}\nDélai : ${f.get('deadline') || 'À préciser'}\n\n${f.get('message')}`;
    document.getElementById('brief-text').textContent = message;
    document.getElementById('send-wa').href = 'https://wa.me/22669291337?text=' + encodeURIComponent(message);
    document.getElementById('send-mail').href = 'mailto:abdousalamkoanda@gmail.com?subject=' + encodeURIComponent('Demande de devis — WEB AFRICA') + '&body=' + encodeURIComponent(message);
    const result = document.getElementById('result');
    result.hidden = false;
    result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    document.getElementById('copy-status').textContent = '';
  });
  const copyBtn = document.getElementById('copy-brief');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(message);
        document.getElementById('copy-status').textContent = 'Demande copiée.';
      } catch {
        document.getElementById('copy-status').textContent = 'La copie automatique est indisponible. Sélectionnez le texte de votre demande pour le copier.';
      }
    });
  }
}

// ========================================================
// DYNAMISME & ANIMATIONS INTERACTIVES (SCROLL REVEAL & COUNTERS)
// ========================================================
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReduced.matches) {
  // 1. Observer pour le Scroll Reveal fluide sur TOUTES les pages
  const revealElements = document.querySelectorAll(
    '.bento-card, .pricecard, .metric-item, .guide-card, .demo-card, .step, .calc-spotlight-box, .sub-100k-banner, .site-types-guide, .sectionhead, .sector, .card, .aside, .prose, .brief-choice, .faq details, .tablewrap, .pricing-overview-grid article'
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Animation fluide de compteur pour les chiffres clés
  const counterElements = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.dataset.counter, 10);
        if (!isNaN(targetNum)) {
          let startTimestamp = null;
          const duration = 1200;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easedProgress * targetNum);
            const formatted = currentVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            el.innerHTML = `${formatted} <small>FCFA</small>`;
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              const finalFormatted = targetNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
              el.innerHTML = `${finalFormatted} <small>FCFA</small>`;
            }
          };
          window.requestAnimationFrame(step);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => counterObserver.observe(el));

  // 3. Effet curseur lumineux (Radial Glow) sur les cartes
  const interactiveCards = document.querySelectorAll('.bento-card, .guide-card, .pricecard, .calc-spotlight-box, .sub-100k-banner, .card, .aside, .sector, .brief-choice');
  interactiveCards.forEach(card => {
    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. Header Glassmorphism au scroll
  const siteHeader = document.querySelector('header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('header-scrolled');
      } else {
        siteHeader.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }
}
