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

;
const goals={found:['VISIBILITÉ LOCALE','Répondre aux recherches de vos futurs clients.','Des pages sur vos services, des contenus utiles pour votre zone et une structure facile à explorer : les bases d’une présence durable sur Google.',['Une intention claire par page','Des titres propres à votre activité','Un suivi à organiser après la mise en ligne'],'/services/seo-local/','Comprendre le SEO local'],trust:['CRÉDIBILITÉ','Donner des raisons concrètes de vous choisir.','Une présentation soignée ne suffit pas. Les photos de votre activité, vos informations exactes et une offre compréhensible aident à rassurer.',['Des images réelles et autorisées','Une méthode et des prestations expliquées','Des références vérifiables lorsqu’elles existent'],'/services/identite-visuelle/','Construire votre identité'],contact:['CONVERSION','Préparer un premier échange utile.','Un visiteur intéressé doit comprendre quoi faire ensuite. Les briefs guident sa demande pour réduire les allers-retours et préparer un devis.',['Un appel à l’action visible','Un formulaire adapté à chaque prestation','Un message structuré vers WhatsApp ou e-mail'],'/demarrer/','Préparer mon projet']};
const tabs=[...document.querySelectorAll('[data-goal]')];
function selectGoal(btn){const data=goals[btn.dataset.goal];const panel=document.getElementById('goal-panel');tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===btn));t.tabIndex=t===btn?0:-1});panel.setAttribute('aria-labelledby',btn.id);panel.replaceChildren();for(const [tag,text,cls]of [['span',data[0],'eyebrow'],['h3',data[1],''],['p',data[2],'']]){const e=document.createElement(tag);e.textContent=text;e.className=cls;panel.append(e)}const ul=document.createElement('ul');data[3].forEach(t=>{const li=document.createElement('li');li.textContent=t;ul.append(li)});const a=document.createElement('a');a.href=data[4];a.textContent=data[5];a.className='textlink';panel.append(ul,a)}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectGoal(b));b.addEventListener('keydown',e=>{let n;if(['ArrowRight','ArrowDown'].includes(e.key))n=(i+1)%tabs.length;if(['ArrowLeft','ArrowUp'].includes(e.key))n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();selectGoal(tabs[n]);tabs[n].focus()}})});
const reduce=matchMedia('(prefers-reduced-motion: reduce)');let animations=true;let saved=false;const cookieName='wa_preferences';
try{const raw=document.cookie.split('; ').find(c=>c.startsWith(cookieName+'='));if(raw){const value=JSON.parse(decodeURIComponent(raw.split('=').slice(1).join('=')));if(value.v===1&&typeof value.motion==='boolean'){animations=value.motion;saved=true}}}catch{}
function applyMotion(){const allowed=animations&&!reduce.matches;document.documentElement.classList.toggle('motion-off',!allowed);document.documentElement.classList.toggle('motion-enabled',allowed);if(!allowed)document.querySelectorAll('[data-tilt]').forEach(x=>x.style.removeProperty('transform'))}
applyMotion();reduce.addEventListener('change',applyMotion);
const fine=matchMedia('(hover: hover) and (pointer: fine)');document.querySelectorAll('[data-tilt]').forEach(card=>{let frame=0;card.addEventListener('pointermove',e=>{if(!animations||reduce.matches||!fine.matches)return;cancelAnimationFrame(frame);const rect=card.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5;const y=(e.clientY-rect.top)/rect.height-.5;frame=requestAnimationFrame(()=>card.style.transform=`perspective(1100px) rotateX(${-y*5}deg) rotateY(${x*7}deg)`)});card.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);card.style.removeProperty('transform')})});
const dialog=document.getElementById('preferences');let opener;document.querySelectorAll('[data-open-preferences]').forEach(b=>b.addEventListener('click',()=>{opener=b;document.getElementById('pref-motion').checked=animations;document.getElementById('pref-remember').checked=saved;dialog.showModal()}));
function close(){dialog.close();opener?.focus()}
document.getElementById('preferences-close')?.addEventListener('click',close);
document.getElementById('preferences-save')?.addEventListener('click',()=>{animations=document.getElementById('pref-motion').checked;const remember=document.getElementById('pref-remember').checked;const secure=location.protocol==='https:'?'; Secure':'';if(remember){document.cookie=cookieName+'='+encodeURIComponent(JSON.stringify({v:1,motion:animations,date:new Date().toISOString().slice(0,10)}))+'; Max-Age=15552000; Path=/; SameSite=Strict'+secure;saved=true}else{document.cookie=cookieName+'=; Max-Age=0; Path=/; SameSite=Strict'+secure;saved=false}applyMotion();close()});
document.getElementById('preferences-delete')?.addEventListener('click',()=>{document.cookie=cookieName+'=; Max-Age=0; Path=/; SameSite=Strict'+(location.protocol==='https:'?'; Secure':'');saved=false;document.getElementById('pref-remember').checked=false;document.getElementById('pref-status').textContent='Votre préférence mémorisée a été supprimée.'});

;
/**
 * CONFIGURATEUR DE DEVIS — WEB AFRICA
 * Calculateur exact en temps réel · Approche humaine & transparente
 * Contact WhatsApp officiel WEB AFRICA : +226 69 29 13 37
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '22669291337';

  const form = document.getElementById('configurator-form');
  if (!form) return;

  // Sélecteurs Formule Principale
  const siteRadios = form.querySelectorAll('input[name="site_type"]');
  const pagesEssentielSubstep = document.getElementById('pages-essentiel-substep');
  const pagesEssentielRadios = form.querySelectorAll('input[name="pages_essentiel"]');
  const badgePagesEssentiel = document.getElementById('badge-pages-essentiel');

  const pagesProSubstep = document.getElementById('pages-pro-substep');
  const pagesProRadios = form.querySelectorAll('input[name="pages_pro"]');
  const badgePagesPro = document.getElementById('badge-pages-pro');

  // Sélecteurs Espace Membre
  const memberRadios = form.querySelectorAll('input[name="member_level"]');

  // Sélecteurs SEO
  const seoRadios = form.querySelectorAll('input[name="seo_level"]');

  // Sélecteurs Besoins Spécifiques (Sur devis)
  const customChecks = form.querySelectorAll('input[name="custom_interests"]');

  // DOM Récapitulatif Final en bas
  const proformaLines = document.getElementById('proforma-lines');
  const proformaTotalPrice = document.getElementById('proforma-total-price');
  const proformaCustomNotes = document.getElementById('proforma-custom-notes');
  const proformaCustomList = document.getElementById('proforma-custom-list');
  const btnWhatsapp = document.getElementById('btn-whatsapp');
  const btnCopy = document.getElementById('btn-copy');
  const copyStatus = document.getElementById('copy-status');

  function initFromURL() {
    const params = new URLSearchParams(window.location.search);
    const site = params.get('site');
    if (site && ['essentiel', 'pro_admin'].includes(site)) {
      const r = form.querySelector(`input[name="site_type"][value="${site}"]`);
      if (r) r.checked = true;
    }

    const pe = params.get('pe');
    if (pe) {
      const r = form.querySelector(`input[name="pages_essentiel"][value="${pe}"]`);
      if (r) r.checked = true;
    }

    const pp = params.get('pp');
    if (pp) {
      const r = form.querySelector(`input[name="pages_pro"][value="${pp}"]`);
      if (r) r.checked = true;
    }

    const member = params.get('member');
    if (member && ['none', 'standard', 'roles', 'dossiers'].includes(member)) {
      const r = form.querySelector(`input[name="member_level"][value="${member}"]`);
      if (r) r.checked = true;
    }

    const seo = params.get('seo');
    if (seo && ['base', 'cible'].includes(seo)) {
      const r = form.querySelector(`input[name="seo_level"][value="${seo}"]`);
      if (r) r.checked = true;
    }

    const custom = params.get('custom');
    if (custom) {
      const items = custom.split(';');
      customChecks.forEach(cb => {
        if (items.includes(cb.value)) cb.checked = true;
      });
    }
  }

  function syncURL(site, pagesNum, member, seo, customItems) {
    const params = new URLSearchParams();
    if (site) params.set('site', site);
    if (site === 'essentiel' && pagesNum && pagesNum !== '3') params.set('pe', pagesNum);
    if (site === 'pro_admin' && pagesNum && pagesNum !== '5') params.set('pp', pagesNum);
    if (member && member !== 'none') params.set('member', member);
    if (seo && seo !== 'base') params.set('seo', seo);
    if (customItems.length > 0) params.set('custom', customItems.join(';'));

    const query = params.toString() ? '?' + params.toString() : window.location.pathname;
    window.history.replaceState({}, '', query);
  }

  function formatFCFA(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
  }

  function recalculate() {
    // 1. Choix de la formule principale
    const siteInput = form.querySelector('input[name="site_type"]:checked');
    const site = siteInput ? siteInput.value : 'essentiel';

    // 2. Nombre de pages et calcul formule
    let pagesNum = '3';
    let baseFormulaCost = 119000;
    let extraPages = 0;
    let extraPagesCost = 0;
    let formulaTotal = 119000;

    if (site === 'essentiel') {
      const peInput = form.querySelector('input[name="pages_essentiel"]:checked');
      pagesNum = peInput ? peInput.value : '3';
      const p = parseInt(pagesNum, 10) || 3;
      baseFormulaCost = 119000;
      if (p > 5) {
        extraPages = p - 5;
        extraPagesCost = extraPages * 20000;
      }
      formulaTotal = baseFormulaCost + extraPagesCost;
    } else {
      const ppInput = form.querySelector('input[name="pages_pro"]:checked');
      pagesNum = ppInput ? ppInput.value : '5';
      const p = parseInt(pagesNum, 10) || 5;
      baseFormulaCost = 250000;
      if (p > 5) {
        extraPages = p - 5;
        extraPagesCost = extraPages * 40000;
      }
      formulaTotal = baseFormulaCost + extraPagesCost;
    }

    // 3. Option Espace Membre & Authentification
    const memberInput = form.querySelector('input[name="member_level"]:checked');
    const member = memberInput ? memberInput.value : 'none';
    let memberCost = 0;
    if (member === 'standard') memberCost = 200000;
    else if (member === 'roles') memberCost = 350000;
    else if (member === 'dossiers') memberCost = 550000;

    // 4. Référencement SEO
    const seoInput = form.querySelector('input[name="seo_level"]:checked');
    const seo = seoInput ? seoInput.value : 'base';
    const seoCost = seo === 'cible' ? 15000 : 0;

    // 5. Options sur devis
    const customItems = [];
    customChecks.forEach(cb => {
      if (cb.checked) customItems.push(cb.value);
    });

    // Mise à jour visuelle des sélections de formule
    document.querySelectorAll('.formula-box').forEach(box => {
      const r = box.querySelector('input[name="site_type"]');
      if (r && r.checked) box.classList.add('selected');
      else box.classList.remove('selected');
    });

    // Basculement entre sélecteur Essentiel et sélecteur Pro + Admin
    if (site === 'essentiel') {
      if (pagesEssentielSubstep) pagesEssentielSubstep.style.display = 'block';
      if (pagesProSubstep) pagesProSubstep.style.display = 'none';

      const p = parseInt(pagesNum, 10) || 3;
      if (badgePagesEssentiel) {
        if (p <= 5) {
          badgePagesEssentiel.textContent = `${p} pages (Inclus dans 119 000 FCFA)`;
        } else {
          badgePagesEssentiel.textContent = `${p} pages (Total formule : ${formatFCFA(formulaTotal)})`;
        }
      }
      document.querySelectorAll('#pages-essentiel-substep .page-btn-item').forEach(item => {
        const r = item.querySelector('input[name="pages_essentiel"]');
        if (r && r.checked) item.classList.add('selected');
        else item.classList.remove('selected');
      });
    } else {
      if (pagesEssentielSubstep) pagesEssentielSubstep.style.display = 'none';
      if (pagesProSubstep) pagesProSubstep.style.display = 'block';

      const p = parseInt(pagesNum, 10) || 5;
      if (badgePagesPro) {
        badgePagesPro.textContent = `${p} pages administrables (${formatFCFA(formulaTotal)})`;
      }
      document.querySelectorAll('#pages-pro-substep .page-btn-item').forEach(item => {
        const r = item.querySelector('input[name="pages_pro"]');
        if (r && r.checked) item.classList.add('selected');
        else item.classList.remove('selected');
      });
    }

    // Mise à jour visuelle des lignes d'options (Espace Membre, SEO)
    document.querySelectorAll('.option-row').forEach(row => {
      const r = row.querySelector('input[type="radio"]');
      if (r && r.checked) row.classList.add('selected');
      else row.classList.remove('selected');
    });

    // Total net
    const total = formulaTotal + memberCost + seoCost;

    // Rendu du récapitulatif proforma
    renderProforma({
      site,
      pagesNum,
      extraPages,
      extraPagesCost,
      formulaTotal,
      member,
      memberCost,
      seo,
      seoCost,
      total,
      customItems
    });

    // Synchronisation URL
    syncURL(site, pagesNum, member, seo, customItems);
  }

  function renderProforma(state) {
    if (!proformaLines) return;

    let linesHtml = '';

    // Ligne 1 : Formule de site
    if (state.site === 'essentiel') {
      const p = parseInt(state.pagesNum, 10) || 3;
      const extraText = p > 5 
        ? ` (${state.extraPages} page${state.extraPages > 1 ? 's' : ''} suppl. à +20 000 F/page)`
        : ' (3 à 5 pages incluses)';
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>Pack Vitrine Essentiel (${state.pagesNum} pages)</strong>
            <p>Site statique ultra-rapide${extraText} · Nom de domaine .com standard et hébergement 1 an offerts*</p>
          </div>
          <div class="summary-row-right">${formatFCFA(state.formulaTotal)}</div>
        </div>
      `;
    } else {
      const p = parseInt(state.pagesNum, 10) || 5;
      const extraText = p > 5
        ? ` (Base 5 pages à 250k + ${state.extraPages} page${state.extraPages > 1 ? 's' : ''} suppl. à +40 000 F/page)`
        : ' (5 pages avec espace administration sécurisé inclus)';
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>Pack Vitrine Pro + Admin (${state.pagesNum} pages)</strong>
            <p>Tableau de bord sécurisé inclus${extraText} · Nom de domaine .com standard et hébergement 1 an offerts*</p>
          </div>
          <div class="summary-row-right">${formatFCFA(state.formulaTotal)}</div>
        </div>
      `;
    }

    // Ligne 2 : Option Espace Membre & Authentification
    if (state.member === 'standard') {
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>Option Espace Membre Standard</strong>
            <p>Authentification sécurisée (Email/Google), base de données cloud (Firebase) et profils membres privés</p>
          </div>
          <div class="summary-row-right">+200 000 FCFA</div>
        </div>
      `;
    } else if (state.member === 'roles') {
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>Option Espace Membre + Définition des Rôles</strong>
            <p>Authentification + base de données Firebase + attribution des permissions et rôles utilisateurs</p>
          </div>
          <div class="summary-row-right">+350 000 FCFA</div>
        </div>
      `;
    } else if (state.member === 'dossiers') {
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>Option Espace Membre Complet + Dépôt de Dossiers</strong>
            <p>Authentification + gestion des rôles + espace sécurisé de téléversement et traitement de dossiers/fichiers</p>
          </div>
          <div class="summary-row-right">+550 000 FCFA</div>
        </div>
      `;
    } else {
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>Option Espace Membre</strong>
            <p>Aucun espace membre (Site web public accessible directement à tous)</p>
          </div>
          <div class="summary-row-right free">Inclus (0 FCFA)</div>
        </div>
      `;
    }

    // Ligne 3 : Référencement naturel
    if (state.seo === 'cible') {
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>SEO spécifique par cible</strong>
            <p>Mots-clés de niche ciblés et optimisation sémantique approfondie pour accélérer la découverte locale</p>
          </div>
          <div class="summary-row-right">+15 000 FCFA</div>
        </div>
      `;
    } else {
      linesHtml += `
        <div class="summary-row">
          <div class="summary-row-left">
            <strong>Référencement naturel de base</strong>
            <p>Titres, balises métadonnées et structure sémantique inclus dans votre forfait</p>
          </div>
          <div class="summary-row-right free">Inclus (0 FCFA)</div>
        </div>
      `;
    }

    proformaLines.innerHTML = linesHtml;

    // Affichage des besoins spécifiques sur devis
    if (state.customItems.length > 0) {
      proformaCustomNotes.style.display = 'block';
      proformaCustomList.innerHTML = state.customItems
        .map(item => `<span class="summary-custom-pill">${item} (Sur devis)</span>`)
        .join('');
    } else {
      proformaCustomNotes.style.display = 'none';
      proformaCustomList.innerHTML = '';
    }

    // Affichage du grand montant total en bas
    const formattedTotal = state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    if (proformaTotalPrice) {
      proformaTotalPrice.innerHTML = `${formattedTotal} <small>FCFA</small>`;
    }

    // Génération du message WhatsApp complet et soigné
    const siteLabel = state.site === 'essentiel' 
      ? `Pack Vitrine Essentiel (${state.pagesNum} pages, statique ultra-rapide)`
      : `Pack Vitrine Pro + Admin (${state.pagesNum} pages avec tableau de bord sécurisé)`;

    let memberLabel = 'Aucun (Site public standard)';
    if (state.member === 'standard') memberLabel = 'Espace Membre Standard (+200 000 FCFA)';
    else if (state.member === 'roles') memberLabel = 'Espace Membre + Rôles (+350 000 FCFA)';
    else if (state.member === 'dossiers') memberLabel = 'Espace Membre Complet + Dépôt de dossiers (+550 000 FCFA)';

    const seoLabel = state.seo === 'cible' 
      ? 'SEO spécifique par cible (+15 000 FCFA)' 
      : 'SEO de base local (Inclus 0 FCFA)';

    const customText = state.customItems.length > 0
      ? `\n- Besoins spécifiques complémentaires (Sur devis) : ${state.customItems.join(', ')}`
      : '';

    const waText = `Bonjour WEB AFRICA,

Je viens d'estimer mon devis sur votre estimateur en direct. Voici le récapitulatif de ma configuration :

- Formule choisie : ${siteLabel} [${formatFCFA(state.formulaTotal)}]
- Option Espace Membre : ${memberLabel}
- Référencement Google : ${seoLabel}${customText}

👉 Montant Total Estimé : ${formatFCFA(state.total)}
(Modalités : 50% à la commande · 50% à la livraison après validation)

Je souhaite échanger avec vous pour concrétiser ce projet.`;

    if (btnWhatsapp) {
      btnWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
    }

    if (btnCopy) {
      btnCopy.onclick = async function () {
        try {
          await navigator.clipboard.writeText(waText);
          if (copyStatus) {
            copyStatus.textContent = '✓ Détails du devis copiés dans le presse-papier !';
            setTimeout(() => { copyStatus.textContent = ''; }, 3500);
          }
        } catch (e) {
          if (copyStatus) {
            copyStatus.textContent = 'Sélectionnez le texte pour le copier manuellement.';
          }
        }
      };
    }
  }

  // Écouteurs d'événements
  form.addEventListener('change', recalculate);

  // Initialisation au chargement
  initFromURL();
  recalculate();

})();
