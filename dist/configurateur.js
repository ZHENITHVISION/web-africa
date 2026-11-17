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

  // Écouteurs d'événements exhaustifs (change + input + click direct pour mobile/touch)
  form.addEventListener('change', recalculate);
  form.addEventListener('input', recalculate);

  // Clic tactile / souris direct sur les cartes et options
  document.querySelectorAll('.formula-box').forEach(box => {
    box.style.cursor = 'pointer';
    box.addEventListener('click', (e) => {
      const radio = box.querySelector('input[name="site_type"]');
      if (radio && !radio.checked) {
        radio.checked = true;
        recalculate();
      }
    });
  });

  document.querySelectorAll('.page-btn-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', (e) => {
      const radio = item.querySelector('input[type="radio"]');
      if (radio && !radio.checked) {
        radio.checked = true;
        recalculate();
      }
    });
  });

  document.querySelectorAll('.option-row').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      const radio = row.querySelector('input[type="radio"]');
      if (radio && !radio.checked) {
        radio.checked = true;
        recalculate();
      }
    });
  });

  // Initialisation au chargement
  initFromURL();
  recalculate();

})();
