import fs from 'node:fs';

const datasets = {
  btp: {
    label: 'PROJETS DE RÉFÉRENCE',
    title: 'Des chantiers d’exception.<br>À Ouagadougou et en régions.',
    cards: [
      ['Villa Patio Contemporaine', 'Ouaga 2000', 'Conception bioclimatique avec patio central, toiture ventilée et finitions soignées en pierre taillée.', '280 m² · Résidentiel', 'Architecture moderne'],
      ['Siège Corporatif & Bureaux', 'Zone d’Activités', 'Espaces de travail ouverts, salles de conférence équipées et isolation thermique renforcée.', '16 bureaux · Tertiaire', 'Aménagement pro'],
      ['Réhabilitation de Villa Familiale', 'Kamboinsin', 'Rénovation complète des réseaux, modernisation de la façade et extension d’une terrasse couverte.', '4 mois · Rénovation', 'Réhabilitation clé en main']
    ],
    parts: ['Étude du site & plans d’implantation', 'Choix des matériaux & devis estimatif', 'Suivi hebdomadaire & réception des travaux'],
    color: 'terre'
  },
  cabinet: {
    label: 'EXEMPLES DE MISSIONS',
    title: 'Des résultats concrets.<br>Une gestion clarifiée.',
    cards: [
      ['Optimisation d’une PME d’importation', 'Commerce', 'Structuration des achats, réduction des délais de livraison et pilotage de la marge commerciale.', 'Cas pratique · PME Ouaga', 'Commerce & Import'],
      ['Stratégie de lancement de marque', 'Distribution', 'Positionnement prix, argumentaire de vente pour revendeurs et plan de prospection commerciale.', 'Cas pratique · FMCG', 'Stratégie & Vente'],
      ['Tableau de bord de gestion & trésorerie', 'Services', 'Mise en place d’un outil de prévision de trésorerie sur 3 mois pour éviter les tensions de liquidités.', 'Cas pratique · Services', 'Finance & Pilotage']
    ],
    parts: ['Audit initial & diagnostic partagé', 'Plan d’action priorisé sous 15 jours', 'Mise en œuvre et formation des équipes'],
    color: 'vert'
  },
  restaurant: {
    label: 'LES SIGNATURES DU CHEF',
    title: 'Des viandes braisées.<br>Des saveurs sahéliennes.',
    cards: [
      ['Poulet Bicyclette Braisé au Feu de Bois', 'Grillades', 'Poulet fermier mariné 24h aux aromates locaux, braisé minute et servi avec alloco doré.', 'Spécialité · 4 500 F CFA', 'Braisé minute'],
      ['Capitaine Braisé du Mouhoun', 'Poissons', 'Capitaine frais entier cuit à la flamme, sauce vierge pimentée, oignons caramélisés et semoule d’attiéké.', 'Pêche locale · 6 000 F CFA', 'Fraîcheur garantie'],
      ['Cocktail Signature Savana Lounge', 'Boissons', 'Infusion artisanale de bissap royal, menthe fraîche froissée, jus de citron vert et nectar de gingembre.', 'Cocktail · 2 000 F CFA', 'Fraîcheur']
    ],
    parts: ['Sélection d’ingrédients frais du terroir', 'Cuisson traditionnelle au feu de bois', 'Service aux petits soins en terrasse lounge'],
    color: 'ambre'
  }
};

const illustrations = (id, i) => id === 'btp'
  ? `<div class="building building-${i}"><div class="sun"></div><div class="block block-a"><i></i><i></i><i></i></div><div class="block block-b"><i></i><i></i></div><div class="ground"></div><span>ÉTUDE ARCHITECTURALE / 0${i + 1}</span></div>`
  : id === 'cabinet'
    ? `<div class="report report-${i}"><span>CAP / NOTE DE TRAVAIL 0${i + 1}</span><strong>${['01 → 03', 'CAP ↗', '↗  /  ↘'][i]}</strong><div class="chart"><i></i><i></i><i></i><i></i><i></i></div><small>EXEMPLE DE LIVRABLE · PILOTAGE PME</small></div>`
    : `<div class="course-art course-${i}"><span>SAVANA / 0${i + 1}</span><strong>${['🍗', '🐟', '🍹'][i]}</strong><b>${['Braisé. Doré. Savoureux.', 'Frais. Pimenté. Authentique.', 'Glacé. Parfumé. Rafraîchissant.'][i]}</b></div>`;

const manifest = JSON.parse(fs.readFileSync('demo-pages.json'));

for (const [id, d] of Object.entries(datasets)) {
  const base = '/demos/' + id + '/';
  const cards = d.cards.map((c, i) => `
    <article class="rich-card" data-category="${c[1]}">
      <a class="art-link" href="${base}detail-${i + 1}/" aria-label="Découvrir ${c[0]}">${illustrations(id, i)}</a>
      <div class="rich-copy">
        <span class="kicker">${c[1]} · ${c[3]}</span>
        <h3><a href="${base}detail-${i + 1}/">${c[0]} ↗</a></h3>
        <p>${c[2]}</p>
        <a class="underlink" href="${base}detail-${i + 1}/">${id === 'restaurant' ? 'Découvrir la spécialité' : 'Explorer le dossier'} →</a>
      </div>
    </article>
  `).join('');

  const collection = `
    <section class="wrap section rich-collection">
      <p class="eyebrow">${d.label}</p>
      <div class="collection-head">
        <h2>${d.title}</h2>
        <p>${id === 'btp' ? 'Trois réalisations emblématiques, trois manières de valoriser les espaces au Burkina Faso.' : id === 'cabinet' ? 'Des situations professionnelles concrètes et des outils opérationnels pour accélérer votre PME.' : 'Des plats signatures préparés à la commande pour faire voyager vos papilles au cœur du Sahel.'}</p>
      </div>
      <div class="filterbar" aria-label="Filtrer les contenus">
        ${['Tout', ...d.cards.map(c => c[1])].map((c, i) => `<button data-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join('')}
        <span id="filter-count" role="status">3 résultats</span>
      </div>
      <div class="rich-grid">${cards}</div>
    </section>
  `;

  const feature = id === 'btp'
    ? `<section class="signature"><div class="wrap signature-grid"><div><p class="eyebrow">LE SENS DU DÉTAIL</p><h2>Un chantier réussi commence<br>par une écoute rigoureuse.</h2><p>Orientation bioclimatique, ventilation naturelle, matériaux durables et respect du budget : chaque choix est pensé pour durer.</p><a class="button" href="${base}contact/">Demander une étude de projet ↗</a></div><div class="spec-list"><details open><summary>01 / Climat sahélien & orientation</summary><p>Étude des vents dominants, protection contre l’ensoleillement direct et valorisation de la lumière naturelle.</p></details><details><summary>02 / Qualité des matériaux locaux</summary><p>Béton armé dosé selon les normes, briques BTC de qualité et ferraillage contrôlé à chaque coulage.</p></details><details><summary>03 / Respect des délais et des coûts</summary><p>Planning d’approvisionnement strict pour éviter tout blocage de chantier et devis transparent.</p></details></div></div></section>`
    : id === 'cabinet'
      ? `<section class="signature"><div class="wrap signature-grid"><div><p class="eyebrow">DIAGNOSTIC FLASH</p><h2>Quel est le défi prioritaire<br>de votre entreprise ?</h2><p>Sélectionnez votre situation pour découvrir notre démarche d’accompagnement sur mesure.</p></div><div class="diagnostic"><label>Votre priorité actuelle<select id="diagnostic"><option value="0">Structurer mon équipe et mes opérations</option><option value="1">Accélérer mes ventes et mes marges</option><option value="2">Maîtriser ma trésorerie et mes dépenses</option></select></label><div id="diagnostic-result"><h3>Rendre les rôles explicites</h3><p>Un organigramme fonctionnel, une matrice de responsabilités et trois règles de décision partagées.</p><a href="${base}detail-1/">Voir le cas pratique →</a></div></div></div></section>`
      : `<section class="signature"><div class="wrap signature-grid"><div><p class="eyebrow">SAVOIR-FAIRE DU CHEF</p><h2>100% Frais du terroir.<br>Cuisson minute au feu de bois.</h2><p>Chaque pièce de viande et chaque poisson est mariné aux épices locales pour une explosion de saveurs authentiques.</p><a class="button" href="${base}explorer/">Découvrir notre carte ↗</a></div><ol class="learning"><li><b>Sélection rigoureuse</b><span>Poulets fermiers bicyclette et capitaines frais du Mouhoun.</span></li><li><b>Marinade secrète</b><span>Herbes sahéliennes, ail frais, gingembre et piments doux.</span></li><li><b>Braisé à la perfection</b><span>Cuisson lente à la braise de neem pour un goût fumé unique.</span></li></ol></div></section>`;

  for (const slug of ['', 'explorer/']) {
    const file = 'dist' + base + slug + 'index.html';
    let h = fs.readFileSync(file, 'utf8');

    if (!slug) {
      const start = h.indexOf('<section class="wrap section"><p class="eyebrow">POUR VOUS PROJETER');
      const end = h.indexOf('</section>', start) + 10;
      h = h.slice(0, start) + collection + feature + h.slice(end);
      h = h.replace('class="hero wrap"', 'class="hero wrap premium-hero"');
      if (id === 'btp') {
        h = h.replace(/<figure class="visual">[\s\S]*?<\/figure>/, `<div class="architectural-hero">${illustrations(id, 0)}<div class="hero-stamp">L’EXCELLENCE<br>CONSTRUITE.<small>CONCEPTION & GROS ŒUVRE</small></div></div>`);
      }
    } else {
      h = h.replace(/<main>[\s\S]*?<\/main>/, `<main><section class="wrap catalog-intro"><p class="eyebrow">${d.label}</p><h1>${d.title}</h1><p class="intro">${id === 'restaurant' ? 'Explorez nos spécialités gastronomiques sahéliennes, grillades au feu de bois et cocktails frais à Ouaga 2000.' : 'Découvrez nos réalisations et nos méthodes d’intervention au service de vos projets à Ouagadougou et en régions.'}</p></section>${collection.replace(`<p class="eyebrow">${d.label}</p>`, '').replace(`<h2>${d.title}</h2>`, `<h2>${id === 'restaurant' ? 'Nos spécialités de la savane' : 'Nos réalisations sectorielles'}</h2>`)}${feature}</main>`);
    }

    fs.writeFileSync(file, h);
  }

  const template = fs.readFileSync('dist' + base + 'services/index.html', 'utf8');
  for (let i = 0; i < 3; i++) {
    const c = d.cards[i];
    const detail = `
      <section class="wrap detail-intro">
        <a class="underlink" href="${base}explorer/">← Retour à ${id === 'formation' ? 'tous les programmes' : 'la sélection'}</a>
        <p class="eyebrow">${c[1]} · ÉTUDE COMPLÈTE</p>
        <h1>${c[0]}</h1>
        <p class="intro">${c[2]}</p>
      </section>
      <div class="wrap detail-art">${illustrations(id, i)}</div>
      <section class="wrap section detail-grid">
        <article>
          <p class="eyebrow">${id === 'formation' ? 'DÉROULEMENT DU PROGRAMME' : 'DÉMARCHE & INTERVENTION'}</p>
          <h2>${id === 'formation' ? 'De l’apprentissage à la maîtrise opérationnelle.' : 'Une méthode structurée pour un résultat garanti.'}</h2>
          <p>${id === 'btp' ? 'Chaque projet fait l’objet d’une analyse technique approfondie : topographie du terrain, contraintes d’urbanisme, choix des matériaux et phasage des travaux pour une maîtrise complète des coûts et des délais.' : id === 'cabinet' ? 'Notre méthode repose sur une immersion rapide dans vos opérations : identifier les goulots d’étranglement, co-construire les solutions avec vous et suivre les indicateurs clés chaque semaine.' : 'Nos modules sont animés par des praticiens du terrain. Vous travaillez directement sur les cas concrets de votre entreprise pour un retour sur investissement immédiat.'}</p>
          ${d.parts.map((p, j) => `
            <div class="chapter">
              <span>0${j + 1}</span>
              <div>
                <h3>${p}</h3>
                <p>${(id === 'btp' ? ['Relevé précis des dimensions, étude du sol et analyse de l’exposition solaire pour optimiser le confort thermique.', 'Conception des plans 2D/3D et élaboration d’un calendrier d’exécution détaillé avec jalons de contrôle.', 'Sélection rigoureuse des ouvriers qualifiés, contrôle de la qualité du béton et réunions de chantier régulières.'] : id === 'cabinet' ? ['Entretiens ciblés avec le dirigeant et les équipes clés pour dresser une cartographie exacte des blocages.', 'Définition de 3 chantiers prioritaires à fort impact sur la rentabilité avec attribution claire des responsabilités.', 'Déploiement progressif des outils, formation pratique et ajustement des procédures selon les premiers retours.'] : ['Assimilation des principes fondamentaux grâce à des exemples visuels et concrets du marché burkinabè.', 'Mise en application immédiate : paramétrage de vos outils, rédaction de vos messages ou calcul de vos marges.', 'Évaluation des compétences acquises, remise des kits d’outils personnalisés et attestation de fin de formation.'])[j]}</p>
              </div>
            </div>
          `).join('')}
          <h3>${id === 'formation' ? 'Ce que vous emportez à la fin' : 'Les livrables inclus'}</h3>
          <ul>
            ${(id === 'btp' ? ['Dossier complet de plans d’exécution', 'Calendrier de phasage des travaux', 'Garantie de conformité et procès-verbal de réception'] : id === 'cabinet' ? ['Rapport de diagnostic synthétique', 'Tableau de bord de pilotage sur mesure', 'Guide des procédures internes simplifiées'] : ['Kit complet de modèles & fiches pratiques', 'Accès aux supports de formation mis à jour', 'Attestation de compétences reconnue']).map(x => `<li>${x}</li>`).join('')}
          </ul>
        </article>
        <aside class="detail-aside">
          <p class="eyebrow">FICHE SYNTHÉTIQUE</p>
          <h3>${c[3]}</h3>
          <p>${id === 'formation' ? 'Public cible : commerçants, chefs de projet, indépendants et salariés souhaitant booster leurs résultats.' : 'Type de prestation : intervention clé en main avec engagement de qualité et respect du planning convenu.'}</p>
          <hr>
          <p>${id === 'formation' ? 'Horaires flexibles : sessions en soirée ou le week-end adaptées aux professionnels en activité.' : 'Zone d’intervention : Ouagadougou et tout le Burkina Faso (missions provinciales sur devis).'}</p>
          <a class="button" href="${base}contact/?sujet=${encodeURIComponent(c[0])}">${id === 'formation' ? 'S’inscrire à cette session ↗' : 'Demander une proposition ↗'}</a>
          <p class="micro">✦ Contact direct sous 24h ouvrées</p>
        </aside>
      </section>
    `;

    const h = template
      .replace(/<title>.*?<\/title>/, `<title>${c[0]} | Démonstration WEB AFRICA</title>`)
      .replace(/<main>[\s\S]*?<\/main>/, `<main>${detail}</main>`);

    const file = 'dist' + base + 'detail-' + (i + 1) + '/index.html';
    fs.mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
    fs.writeFileSync(file, h);
    manifest.push({ file, url: base + 'detail-' + (i + 1) + '/' });
  }

  let contact = fs.readFileSync('dist' + base + 'contact/index.html', 'utf8');
  contact = contact.replace(
    '<label>Échéance envisagée',
    `<label>${id === 'btp' ? 'Localisation du projet' : id === 'cabinet' ? 'Taille de votre structure' : 'Format souhaité'}<input name="contexte" maxlength="100" placeholder="${id === 'btp' ? 'Exemple : Ouaga 2000, Kamboinsin…' : id === 'cabinet' ? 'Exemple : 5 à 15 salariés' : 'Exemple : En présentiel à Ouagadougou'}"></label><label>Échéance envisagée`
  );
  fs.writeFileSync('dist' + base + 'contact/index.html', contact);
}

fs.writeFileSync('demo-pages.json', JSON.stringify(manifest, null, 2));
