import fs from 'node:fs';

const data = [
  {
    id: 'btp',
    name: 'HORIZON BTP',
    tag: 'BÂTIMENT · GÉNIE CIVIL & VRD',
    hero: 'Bâtir l’avenir.<br>Avec solidité et rigueur.',
    intro: 'Leader en construction de bâtiments modernes, génie civil, voiries (VRD) et grands travaux au Burkina Faso. 15 ans d’excellence technique de Ouagadougou à Bobo-Dioulasso.',
    accent: 'Solidité, expertise et respect des normes.',
    image: 'btp-hero',
    nav: 'Chantiers & Ouvrages',
    services: [
      ['Génie Civil & VRD', 'Voiries, réseaux divers et assainissement', 'Terrassement lourd, bitumage, caniveaux d’évacuation et viabilisation de zones résidentielles.'],
      ['Bâtiments & Sièges Corporatifs', 'Immeubles R+4, sièges et villas de standing', 'Gros œuvre béton armé certifié, finitions haute précision et conformité architecturale.'],
      ['Parc d’Engins Lourds', 'Terrassement et travaux d’envergure', 'Pelles hydrauliques, compacteurs et camions bennes avec opérateurs qualifiés.']
    ],
    items: [
      ['Immeuble Horizon R+4', 'Ouaga 2000 · Bureaux Modernes', 'Structure en béton armé antisismique avec façade bioclimatique et parking sous-terrain.'],
      ['Axe Routier & VRD Zone Industrielle', 'Kossodo · Voiries & Réseaux', 'Aménagement de 4,5 km de voirie lourde avec assainissement pluvial renforcé.'],
      ['Complexe Résidentiel Les Palmiers', 'Ouaga · Villas Haut Standing', 'Construction clé en main de 8 villas contemporaines avec isolation thermique sahélienne.']
    ],
    steps: ['Étude géotechnique & plans techniques validés', 'Mobilisation des engins & approvisionnement contrôlé', 'Exécution aux normes et livraison clé en main avec garantie décennale'],
    question: 'Quel est votre projet de construction ou d’infrastructure ?',
    cta: 'Demander un devis BTP'
  },
  {
    id: 'cabinet',
    name: 'CAP CONSEIL',
    tag: 'STRATÉGIE · ORGANISATION · CROISSANCE PME',
    hero: 'Un cap clair.<br>Une gestion maîtrisée.',
    intro: 'Conseil en management, organisation et pilotage financier pour les PME et commerces du Burkina Faso. Transformez vos défis quotidiens en rentabilité concrète et durable.',
    accent: 'Structurer pour durer.',
    nav: 'Missions & Cas',
    services: [
      ['Stratégie & développement commercial', 'Positionnez votre entreprise pour accélérer', 'Étude de marché locale, clarification de votre offre, positionnement tarifaire et plan d’action commercial.'],
      ['Organisation & gestion des équipes', 'Fluidifiez vos opérations au quotidien', 'Fiches de postes claires, circuits de décision rapides, formation des responsables et autonomie de vos équipes.'],
      ['Pilotage financier & trésorerie', 'Maîtrisez votre rentabilité et vos liquidités', 'Mise en place de tableaux de bord hebdomadaires simples, suivi des marges et prévisions de trésorerie.']
    ],
    items: [
      ['Restructuration d’une PME d’import-export', 'Commerce · Organisation', 'Clarification de la chaîne d’approvisionnement et mise en place d’un contrôle des stocks en temps réel.'],
      ['Lancement d’un réseau de distribution', 'Stratégie · Vente', 'Modélisation des marges distributeurs et lancement d’une campagne ciblée sur Ouagadougou et Bobo.'],
      ['Tableau de bord financier pour cabinet médical', 'Pilotage · Gestion', 'Visibilité instantanée sur les encaissements, les charges fixes et la trésorerie prévisionnelle.']
    ],
    steps: ['Diagnostic flash de votre situation', 'Feuille de route stratégique avec priorités', 'Accompagnement pratique et mesure des résultats'],
    question: 'Quel est le défi prioritaire de votre entreprise ?',
    cta: 'Échanger sur mes enjeux'
  },
  {
    id: 'restaurant',
    name: 'SAVANA',
    tag: 'RESTAURANT GASTRONOMIQUE & GRILLADES',
    hero: 'L’art culinaire d’Afrique.<br>Au cœur de Ouagadougou.',
    intro: 'Poulet bicyclette croustillant, capitaine braisé du Mouhoun, cocktails de fruits frais et terrasse VIP sous les étoiles de Ouagadougou. Réservez votre table ou commandez sur WhatsApp.',
    accent: 'L’excellence culinaire et le goût authentique.',
    image: 'restaurant',
    nav: 'La Carte & Grillades',
    services: [
      ['Grillades & Braisés au feu de bois', 'Poulet bicyclette, Capitaine du Mouhoun & Agneau Suya', 'Viandes et poissons frais marinés aux épices de savane, braisés lentement à la braise de bois de neem.'],
      ['Spécialités Sahéliennes & Terroir', 'Recettes traditionnelles et accompagnements savoureux', 'Riz gras au soumbala, alloco doré, attiéké frais de Grand-Bassam et sauces artisanales du chef.'],
      ['Terrasse Lounge VIP & Événements', 'Cadre intimiste en plein air & salon climatisé', 'Cocktails signatures (Bissap menthe, Gingembre tonique, Baobab velouté), service voiturier et espace privatisable.']
    ],
    items: [
      ['Poulet Bicyclette Braisé du Chef', 'Grillade · Spécialité Ouaga', 'Poulet fermier entier mariné aux aromates locaux, servi avec alloco croustillant et piment doux.'],
      ['Capitaine Braisé du Mouhoun', 'Poisson · Fraîcheur du Fleuve', 'Poisson frais entier cuit à la flamme, sauce vierge pimentée, oignons caramélisés et semoule d’attiéké.'],
      ['Cocktail Signature Savana Lounge', 'Boisson · Fraîcheur Sahélienne', 'Infusion artisanale de bissap royal, menthe fraîche froissée, jus de citron vert et nectar de gingembre.']
    ],
    steps: ['Consultez la carte et choisissez vos spécialités', 'Réservez votre table ou commandez en 1 clic WhatsApp', 'Dégustez dans une ambiance conviviale et raffinée'],
    question: 'Quelle réservation ou commande souhaitez-vous passer ?',
    cta: 'Consulter la carte'
  }
];

const esc = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const manifest = [];

for (const d of data) {
  const base = '/demos/' + d.id + '/';
  const a = (path, text, cl = '') => `<a class="${cl}" href="${base + path}">${text}</a>`;
  
  const cards = d.services.map((x, i) => `
    <article class="card">
      <span class="num">0${i + 1}</span>
      <h3>${x[0]}</h3>
      <h4>${x[1]}</h4>
      <p>${x[2]}</p>
      ${a('contact/?sujet=' + encodeURIComponent(x[0]), 'Discuter de ce besoin ↗', 'textlink')}
    </article>
  `).join('');

  const itemcards = d.items.map((x, i) => `
    <article class="case">
      <div class="case-art art-${i}">
        <span>0${i + 1}</span>
        <b>${x[1]}</b>
      </div>
      <div class="case-copy">
        <small>PROJET DE RÉFÉRENCE</small>
        <h2>${x[0]}</h2>
        <p>${x[2]}</p>
        <details>
          <summary>${d.id === 'restaurant' ? 'Voir la recette & accompagnements' : 'Découvrir la démarche'}</summary>
          <p>${d.services[i][2]}</p>
          <p>Préparation soignée : sélection d’ingrédients frais locaux, marinade maison, cuisson au feu de bois et service attentionné.</p>
          ${a('contact/?sujet=' + encodeURIComponent(x[0]), 'Réserver ou commander ce plat ↗')}
        </details>
      </div>
    </article>
  `).join('');

  const visual = d.image
    ? `<figure class="visual"><img src="/photos/${d.image === 'restaurant' ? 'demo-restaurant-cover' : d.image}.jpg" alt="${d.id === 'btp' ? 'Architecture contemporaine au Burkina Faso' : 'Grillades et spécialités sahéliennes à Ouagadougou'}"><figcaption>Gastronomie & cadre chaleureux à Ouagadougou.</figcaption></figure>`
    : `<div class="consult-visual" aria-label="Illustration de la méthode de conseil"><span>VOTRE FEUILLE DE ROUTE</span><strong>↗</strong><div><b>01 Comprendre</b><b>02 Structurer</b><b>03 Avancer</b></div></div>`;

  const bodies = {
    '': `<section class="hero wrap"><div><p class="eyebrow">${d.tag} · BURKINA FASO</p><h1>${d.hero}</h1><p class="intro">${d.intro}</p><div class="actions">${a(d.id === 'restaurant' ? 'explorer/' : 'contact/', d.cta, 'button')}${a('services/', 'Découvrir nos spécialités ↗', 'secondary')}</div><p class="micro">✦ Modèle de démonstration sectoriel conçu par WEB AFRICA</p></div>${visual}</section><div class="ribbon">${d.accent} <span>✳</span> Des produits frais et un savoir-faire passionné.</div><section class="wrap section"><div class="section-title"><p class="eyebrow">NOTRE CARTE & SPÉCIALITÉS</p><h2>${d.id === 'restaurant' ? 'Des saveurs authentiques et des viandes d’exception.' : 'Des solutions concrètes pour vos projets.'}</h2></div><div class="cards">${cards}</div></section><section class="method"><div class="wrap"><p class="eyebrow">NOTRE ENGAGEMENT QUALITÉ</p><h2>L’exigence du goût, à chaque service.</h2><div class="cards">${d.steps.map((x, i) => `<div><span class="num">0${i + 1}</span><h3>${x}</h3><p>Un accueil chaleureux, des produits 100% frais du pays et une préparation minute pour sublimer vos repas.</p></div>`).join('')}</div></div></section><section class="wrap section"><p class="eyebrow">CARTE & GRILLADES</p><h2>${d.nav}</h2><p>Découvrez nos créations culinaires et spécialités à la braise.</p>${a('explorer/', 'Consulter toute la carte ↗', 'button')}</section>`,

    'services/': `<section class="wrap section"><p class="eyebrow">${d.tag}</p><h1>Une offre claire.<br>Un accompagnement sur mesure.</h1><p class="intro">Comprenez ce qui est inclus, les délais indicatifs et comment nous collaborons ensemble.</p><div class="cards">${cards}</div></section><section class="method"><div class="wrap"><h2>Comment se déroule votre projet ?</h2>${d.steps.map((x, i) => `<details open><summary>0${i + 1} — ${x}</summary><p>${['Nous partons de votre contexte, de vos objectifs et de votre budget pour cadrer précisément le besoin.','Une proposition détaillée fixe le calendrier, les livrables précis et les étapes de validation.','Des points réguliers permettent de suivre l’avancée des travaux et de garantir la conformité.'][i]}</p></details>`).join('')}</div></section><section class="wrap section"><h2>Questions fréquentes</h2><details><summary>Quels sont les délais habituels d’intervention ?</summary><p>Chaque projet fait l’objet d’un calendrier validé ensemble dès le départ. Les délais dépendent du périmètre retenu.</p></details><details><summary>Comment obtenir un devis ?</summary><p>Remplissez le formulaire de contact ou écrivez-nous directement sur WhatsApp pour convenir d’un échange.</p></details></section>`,

    'explorer/': `<section class="wrap section"><p class="eyebrow">PORTFOLIO & RÉFÉRENCES</p><h1>${d.nav}.<br>Des réalisations concrètes.</h1><p class="intro">Découvrez un aperçu de nos projets menés avec rigueur et souci du détail au Burkina Faso.</p><div class="cases">${itemcards}</div></section>`,

    'contact/': `<section class="wrap section contact-layout"><div><p class="eyebrow">PARLONS DE VOTRE PROJET</p><h1>Un échange direct<br>pour concrétiser votre idée.</h1><p class="intro">${d.question}</p><p>Présentez votre projet en quelques lignes ci-contre. Vous pouvez également nous contacter directement sur WhatsApp pour une réponse rapide sous 24h.</p><div class="note"><strong>Vous aimez ce modèle de site ?</strong><p>WEB AFRICA crée le vôtre sur mesure, adapté à votre activité, dès 119 000 FCFA avec nom de domaine .com offert.</p><a href="https://wa.me/22669291337?text=${encodeURIComponent('Bonjour Abdoul Salam, je souhaite un site internet dans le style de la démo ' + d.name)}" target="_blank" rel="noopener">Commander ce design sur WhatsApp ↗</a></div></div><form id="demo-form"><h2>Demander une étude</h2><label>Votre nom complet *<input name="nom" required maxlength="80" placeholder="Ex. : Idrissa Sawadogo"></label><label>Votre besoin prioritaire<select name="sujet">${d.services.map(x => `<option>${x[0]}</option>`).join('')}<option>Autre prestation</option></select></label><label>Présentez votre projet<textarea name="message" rows="5" required maxlength="1500" placeholder="Localisation, délais souhaités, budget indicatif ou questions…"></textarea></label><label>Échéance envisagée<select name="delai"><option>Immédiate (moins d’un mois)</option><option>Dans 1 à 3 mois</option><option>À planifier ensemble</option></select></label><button class="button" type="submit">Valider ma simulation ↗</button><p class="micro">Simulation interactive immédiate.</p><div id="result" role="status" hidden></div></form></section>`
  };

  for (const [slug, body] of Object.entries(bodies)) {
    const title = (slug === '' ? 'Accueil' : slug === 'services/' ? 'Services' : slug === 'explorer/' ? d.nav : 'Contact') + ' — ' + d.name + ' | Démonstration WEB AFRICA';
    const waUrl = `https://wa.me/22669291337?text=${encodeURIComponent('Bonjour Abdoul Salam, je regarde la démo ' + d.name + ' et je souhaite un devis similaire pour mon entreprise.')}`;
    
    const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title><meta name="description" content="${esc(d.intro)}"><link rel="stylesheet" href="/fonts.css"><link rel="stylesheet" href="/demos/demo.css"><script src="/demos/demo.js" defer></script></head><body class="${d.id}"><div class="demo-bar"><div class="demo-bar-left"><span class="demo-pill">✨ MODÈLE SECTEUR ${d.name}</span><span class="demo-note">Personnalisable pour votre entreprise en 3 à 7 jours</span></div><div class="demo-bar-right"><a class="demo-cta-btn" href="${waUrl}" target="_blank" rel="noopener">Commander ce design sur WhatsApp ↗</a><a class="demo-back" href="/demonstrations/">← Retour aux démos</a></div></div><header class="wrap"><a class="logo" href="${base}">${d.name}<span>BURKINA FASO</span></a><button class="menu" aria-expanded="false" aria-controls="demo-nav">Menu ☰</button><nav id="demo-nav" aria-label="Navigation principale">${a('', 'Accueil')}${a('services/', 'Expertises')}${a('explorer/', d.nav)}${a('contact/', 'Demander un devis ↗', 'nav-cta')}</nav></header><main>${body}</main><footer><div class="wrap footer-grid"><div class="logo">${d.name}<p>${d.accent}</p><span class="footer-tagline">Site optimisé pour smartphones & commandes WhatsApp</span></div><div>${a('services/', 'Nos expertises')}${a('explorer/', d.nav)}${a('contact/', 'Demander une étude')}</div><div class="demo-footer-agency"><strong>Vous souhaitez ce site pour votre entreprise ?</strong><p>WEB AFRICA réalise votre vitrine professionnelle clé en main dès 119 000 FCFA avec nom de domaine .com offert.</p><a class="btn-demo-contact" href="${waUrl}" target="_blank" rel="noopener">Discuter avec Abdoul Salam sur WhatsApp ↗</a></div></div></footer><a class="demo-wa-float" href="${waUrl}" target="_blank" rel="noopener" aria-label="Contacter sur WhatsApp"><span class="wa-icon">💬</span><span class="wa-text">WhatsApp</span></a></body></html>`;
    
    const file = 'dist' + base + slug + 'index.html';
    fs.mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
    fs.writeFileSync(file, html);
    manifest.push({ file, url: base + slug });
  }
}

fs.writeFileSync('demo-pages.json', JSON.stringify(manifest, null, 2));
console.log('12 pages de démonstration générées');
