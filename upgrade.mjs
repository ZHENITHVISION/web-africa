import fs from 'node:fs';

export function upgrade(pages, { add, head, section, cta, prices, faq, steps, link, contact, eyebrow, assetVer, siteTypesGuide, sub100kBanner }) {
  const photo = (id, alt, eager = false) => `<img src="/photos/${id}.jpg" alt="${alt}" width="1280" height="${id === 'formation' ? 720 : id === 'ouaga' ? 525 : 853}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const caption = t => `<figcaption>${t} · <a href="/credits/">Crédits ↗</a></figcaption>`;

  const art = t => t === 'btp'
    ? `<div class="demo-art demo-art-photo"><picture><source srcset="/photos/demo-btp-cover.webp" type="image/webp"><img src="/photos/demo-btp-cover.jpg" alt="Horizon BTP — Plateforme Construction &amp; Génie Civil" class="demo-cover-img" width="720" height="520" loading="lazy" decoding="async"></picture><div class="demo-art-overlay"><small>HORIZON BTP / CORPORATE PLATFORM</small><strong>Bâtir l’avenir.<br>Avec solidité.</strong><span>BÂTIMENT / GÉNIE CIVIL / VRD</span></div></div>`
    : t === 'cabinet'
    ? `<div class="demo-art demo-art-photo"><picture><source srcset="/photos/demo-cabinet-cover.webp" type="image/webp"><img src="/photos/demo-cabinet-cover.jpg" alt="Cap Conseil — Modèle Cabinet &amp; Conseil" class="demo-cover-img" width="720" height="520" loading="lazy" decoding="async"></picture><div class="demo-art-overlay"><small>CAP CONSEIL / CONCEPT CABINET</small><strong>Un cap clair.<br>Des décisions utiles.</strong><span>COMPRENDRE → STRUCTURER → AVANCER</span></div></div>`
    : `<div class="demo-art demo-art-photo"><picture><source srcset="/photos/demo-restaurant-cover.webp" type="image/webp"><img src="/photos/demo-restaurant-cover.jpg" alt="Savana — Modèle Restaurant &amp; Gastronomie" class="demo-cover-img" width="720" height="520" loading="lazy" decoding="async"></picture><div class="demo-art-overlay"><small>SAVANA / CONCEPT RESTAURANT</small><strong>L’art culinaire d’Afrique.<br>Au cœur de Ouaga.</strong><span>GRILLADES / CUISINE SAHÉLIENNE / LOUNGE</span></div></div>`;

  const demos = [
    ['btp', 'Horizon BTP', 'Construction & Génie Civil', 'Une plateforme corporate pour valoriser les chantiers d’envergure, le parc d’engins lourds et les appels d’offres.'],
    ['cabinet', 'Cap Conseil', 'Conseil & expertise', 'Une identité expressive pour rendre les missions et la méthode faciles à comprendre.'],
    ['restaurant', 'Savana', 'Restaurant & Gastronomie', 'Une vitrine gourmande pour mettre en valeur les spécialités sahéliennes, la carte et booster les réservations WhatsApp.']
  ];

  const gallery = () => `<div class="demo-grid">${demos.map(([s, t, c, d]) => `<article class="demo-card" data-category="${s}" data-tilt><a href="/demos/${s}/" aria-label="Découvrir la démonstration ${t}">${art(s)}</a><div class="demo-caption"><span class="tag">${c} · Démonstration</span><h3><a href="/demos/${s}/">${t} ↗</a></h3><p>${d}</p></div></article>`).join('')}</div>`;

  // APERÇU SYNTHÉTIQUE & PERCUTANT POUR LA PAGE D'ACCUEIL (PAS DE SURCHARGE COGNITIVE)
  const homePricesOverview = () => `
    <div class="sectionhead">
      <div>
        <span class="eyebrow-cyan">— TARIFS CLAIRS &amp; TRANSPARENTS</span>
        <h2>Le bon site web, au juste prix en FCFA.</h2>
      </div>
      <p>Des formules tout compris sans frais cachés. Nom de domaine .com standard et hébergement 1 an offerts*.</p>
    </div>

    <div class="pricing-overview-grid">
      <article class="pricecard">
        <span class="ribbon">Formule Populaire</span>
        <h3>Pack Vitrine Essentiel</h3>
        <p>Idéal pour PME, artisans, cabinets et commerces voulant une présence claire et rapide.</p>
        <div class="price">119 000 <small>FCFA</small></div>
        <p class="price-sub">Création complète · 50% commande / 50% livraison</p>
        <ul>
          <li>Site statique rapide de 3 à 5 pages</li>
          <li>Nom de domaine .com + hébergement 1 an offerts*</li>
          <li>Design moderne 100% adapté aux smartphones</li>
          <li>Bouton WhatsApp 1-clic et formulaire de contact</li>
          <li>SEO local de base inclus</li>
        </ul>
        <div class="pricecard-actions">
          <a class="btn-popy-glass" href="/tarifs/#estimateur">Configurer cette formule ↗</a>
        </div>
        <p class="note"><strong>Délai :</strong> 3 à 7 jours ouvrés</p>
      </article>

      <article class="pricecard featured">
        <span class="ribbon">Recommandé Entreprises</span>
        <h3>Pack Vitrine Pro + Admin</h3>
        <p>Pour modifier vous-même certains textes et photos en toute autonomie.</p>
        <div class="price">250 000 à 450 000 <small>FCFA</small></div>
        <p class="price-sub">Selon volume de pages (5 à 10 pages) · Espace Admin inclus</p>
        <ul>
          <li>Tout ce qui est inclus dans le Pack Essentiel</li>
          <li>Tableau de bord administrateur simple et sécurisé</li>
          <li>Modification autonome de certains textes et photos</li>
          <li>Nombre de pages évolutif jusqu'à 10 pages</li>
          <li>Formation de 30 minutes offerte</li>
        </ul>
        <div class="pricecard-actions">
          <a class="btn-popy-primary" href="/tarifs/#estimateur"><span>Configurer avec Espace Admin</span> <span class="btn-arrow">↗</span></a>
        </div>
        <p class="note"><strong>Délai :</strong> 7 à 14 jours ouvrés</p>
      </article>

      <article class="pricecard">
        <span class="ribbon">Option Métier</span>
        <h3>Option Espace Membre</h3>
        <p>Pour les plateformes avec comptes membres privés, rôles et dépôt de dossiers.</p>
        <div class="price">+200 000 à +550 000 <small>FCFA</small></div>
        <p class="price-sub">Supplément cumulable sur Pack Essentiel ou Pro</p>
        <ul>
          <li>Authentification sécurisée (Firebase / Cloud)</li>
          <li>Définition et gestion des rôles (Admin, Membres...)</li>
          <li>Espace privé pour dépôt et suivi de dossiers</li>
          <li>Protection et chiffrement des données sensibles</li>
        </ul>
        <div class="pricecard-actions">
          <a class="btn-popy-glass" href="/tarifs/#estimateur">Ajouter cette option ↗</a>
        </div>
        <p class="note"><strong>Délai :</strong> +5 à 10 jours ouvrés</p>
      </article>
    </div>

    ${sub100kBanner}

    <div class="pricing-cta-center">
      <a href="/tarifs/#estimateur" class="btn-popy-primary">
        <span>Lancer l'Estimateur en direct &amp; calculer mon total</span> <span class="btn-arrow">↗</span>
      </a>
      <a href="/tarifs/" class="btn-popy-glass">
        <span>Consulter le guide pédagogique &amp; tous les tarifs</span> <span class="arrow">→</span>
      </a>
    </div>
  `;

  // MISE EN PAGE DE L'ACCUEIL : AÉRÉE, DYNAMIQUE & PUNCHY
  const homePage = pages.find(p => p.slug === '/');
  if (homePage) {
    homePage.body = `
      <section class="hero-v2">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <div class="hero-pill-badge">
              <span class="badge-dot-cyan"></span>
              <span>WEB AFRICA · STUDIO DIGITAL CRÉATIF · OUAGADOUGOU</span>
            </div>
            <h1>Votre savoir-faire mérite un site web <span class="gradient-cyan">remarquable, rapide &amp; rentable.</span></h1>
            <p class="hero-intro">Nous concevons des sites vitrines percutants, des identités visuelles fortes et des outils digitaux adaptés au Burkina Faso, directement connectés à votre WhatsApp.</p>
            <div class="actions">
              <a href="/tarifs/#estimateur" class="btn-popy-primary">
                <span>Calculer mon devis en direct</span> <span class="btn-arrow">↗</span>
              </a>
              <a class="btn-popy-glass" href="https://wa.me/22669291337?text=Bonjour%20Abdoul%20Salam%2C%20je%20souhaite%20un%20devis%20pour%20mon%20site%20web." target="_blank" rel="noopener noreferrer">
                <span>Discuter sur WhatsApp</span> <span class="wa-dot"></span>
              </a>
            </div>
            <div class="hero-points">
              <span class="tech-chip">⚡ Pack Vitrine dès 119 000 FCFA</span>
              <span class="tech-chip">🌐 Domaine .com + hébergement 1 an offerts*</span>
              <span class="tech-chip">📱 100% Fluide sur smartphone</span>
            </div>
          </div>
          <div class="hero-scene" data-tilt>
            <div class="hero-devices-showcase">
              <picture>
                <source media="(max-width: 760px)" srcset="/photos/devices-hero-mobile.webp?v=${assetVer}" type="image/webp">
                <source media="(max-width: 760px)" srcset="/photos/devices-hero-mobile.jpg?v=${assetVer}" type="image/jpeg">
                <source srcset="/photos/devices-hero.webp?v=${assetVer}" type="image/webp">
                <img src="/photos/devices-hero.jpg?v=${assetVer}" alt="Démonstration d'un site web professionnel sur smartphone et ordinateur par WEB AFRICA" width="1200" height="896" fetchpriority="high" decoding="async" class="hero-devices-img">
              </picture>
              <div class="devices-badge-floating">
                <span class="badge-glow-dot"></span>
                <div>
                  <strong>Affichage Multi-Écrans</strong>
                  <span>PC portable &amp; Smartphone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap hero-bottom">
          <span>OUAGADOUGOU · BURKINA FASO</span>
          <a href="#demos">Voir nos démonstrations en direct ↓</a>
        </div>
      </section>

      <div class="service-ribbon" aria-hidden="true">
        <div class="ribbon-track">
          <span>SITES VITRINES CLÉ EN MAIN</span><i class="dot-glow">●</i>
          <span>ESTIMATEUR EN DIRECT</span><i class="dot-glow">●</i>
          <span>IDENTITÉ VISUELLE &amp; LOGOS</span><i class="dot-glow">●</i>
          <span>RÉFÉRENCEMENT LOCAL GOOGLE</span><i class="dot-glow">●</i>
          <span>COMMANDES WHATSAPP</span><i class="dot-glow">●</i>
          <span>ESPACES MEMBRES SÉCURISÉS</span><i class="dot-glow">●</i>
          <span>MAINTENANCE PRO</span><i class="dot-glow">●</i>
          <span>SITES VITRINES CLÉ EN MAIN</span><i class="dot-glow">●</i>
          <span>ESTIMATEUR EN DIRECT</span><i class="dot-glow">●</i>
          <span>IDENTITÉ VISUELLE &amp; LOGOS</span><i class="dot-glow">●</i>
          <span>RÉFÉRENCEMENT LOCAL GOOGLE</span><i class="dot-glow">●</i>
          <span>COMMANDES WHATSAPP</span><i class="dot-glow">●</i>
          <span>ESPACES MEMBRES SÉCURISÉS</span><i class="dot-glow">●</i>
          <span>MAINTENANCE PRO</span><i class="dot-glow">●</i>
        </div>
      </div>

      <section class="popy-metrics-section">
        <div class="wrap">
          <div class="metrics-grid">
            <div class="metric-item">
              <strong class="metric-num" data-counter="119000">119 000 <small>FCFA</small></strong>
              <span class="metric-label">Pack Vitrine Essentiel</span>
              <p class="metric-sub">3 à 5 pages, domaine .com, hébergement 1 an &amp; SEO inclus</p>
            </div>
            <div class="metric-item">
              <strong class="metric-num">3 à 7 <small>Jours</small></strong>
              <span class="metric-label">Délais de livraison express</span>
              <p class="metric-sub">Process rigoureux et validation directe</p>
            </div>
            <div class="metric-item">
              <strong class="metric-num">&lt; 1 <small>Seconde</small></strong>
              <span class="metric-label">Chargement ultra-rapide</span>
              <p class="metric-sub">Zéro lenteur sur les réseaux mobiles 3G/4G</p>
            </div>
            <div class="metric-item">
              <strong class="metric-num">1-Clic</strong>
              <span class="metric-label">Commandes WhatsApp</span>
              <p class="metric-sub">Vos visiteurs deviennent des clients sans friction</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section popy-calc-spotlight">
        <div class="wrap">
          <div class="calc-spotlight-box">
            <div class="calc-spotlight-left">
              <span class="eyebrow-cyan">⚡ ESTIMATEUR EN DIRECT</span>
              <h2>Estimez votre projet en 30 secondes chrono.</h2>
              <p>Fini les devis opaques et les attentes interminables. Choisissez votre formule (Vitrine Essentiel, Vitrine Pro + Admin, Espace Membre, SEO) : votre tarif exact en FCFA se calcule en temps réel avec synthèse complète pour WhatsApp.</p>
              <div class="calc-features-list">
                <span>✓ 100% transparent &amp; sans engagement</span>
                <span>✓ Calcul dynamique selon vos options (Vitrine, Admin, Espace Membre)</span>
                <span>✓ Synthèse complète prête à envoyer sur WhatsApp</span>
              </div>
              <div class="calc-cta-group">
                <a href="/tarifs/#estimateur" class="btn-popy-primary">
                  <span>Lancer l'Estimateur en direct</span> <span class="btn-arrow">↗</span>
                </a>
              </div>
            </div>
            <div class="calc-spotlight-right">
              <div class="calc-mini-preview">
                <div class="preview-header">
                  <span class="preview-dot red"></span>
                  <span class="preview-dot yellow"></span>
                  <span class="preview-dot green"></span>
                  <span class="preview-title">estimateur.webafrica-bf.com</span>
                </div>
                <div class="preview-content">
                  <div class="preview-row">
                    <span>Formule choisie</span>
                    <strong>Pack Vitrine Essentiel</strong>
                  </div>
                  <div class="preview-row">
                    <span>Volume de pages</span>
                    <strong>3 à 5 pages incluses</strong>
                  </div>
                  <div class="preview-row">
                    <span>Espace Admin</span>
                    <strong>Optionnel (Pro dès 250k)</strong>
                  </div>
                  <div class="preview-row">
                    <span>Domaine + Hébergement</span>
                    <strong>Offerts la 1ʳᵉ année*</strong>
                  </div>
                  <div class="preview-total-box">
                    <span>MONTANT TOTAL ESTIMÉ</span>
                    <strong>119 000 <small>FCFA</small></strong>
                    <small class="preview-terms">50% commande · 50% livraison</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section demo-section" id="demos">
        <div class="wrap">
          <div class="sectionhead">
            <div>
              <span class="eyebrow-cyan">— PREUVES CONCRÈTES &amp; PROTOTYPES</span>
              <h2>Nos démonstrations réelles : projetez-vous tout de suite.</h2>
            </div>
            <p>Testez nos concepts fonctionnels créés pour les entreprises du Burkina Faso : affichage smartphone, fiches produits, devis et réservations WhatsApp.</p>
          </div>
          ${gallery()}
          <div class="section-foot">
            ${link('demonstrations', 'Explorer toutes les démonstrations ↗', 'btn-popy-glass')}
            <p>Des prototypes complets adaptés aux réalités du marché sahélien.</p>
          </div>
        </div>
      </section>

      <section class="section expertise-v2" id="expertises">
        <div class="wrap">
          <div class="sectionhead">
            <div>
              <span class="eyebrow-cyan">— NOS EXPERTISES DIGITALES</span>
              <h2>Tout pour donner de la force et du prestige à votre entreprise.</h2>
            </div>
            <p>Des outils modernes et percutants pour développer votre notoriété et déclencher des prises de contact concrètes.</p>
          </div>
          <div class="expertise-bento-grid">
            ${[
              ['01', 'Sites vitrines clé en main', 'Clairs, ultra-rapides sur smartphone et connectés directement à votre WhatsApp.', 'site-vitrine', 'site', '〈/〉', 'Dès 119 000 FCFA'],
              ['02', 'Logos & identité visuelle', 'Une signature visuelle soignée, vectorielle et mémorable sur tous vos supports.', 'identite-visuelle', 'logo', 'Aa', 'Dès 40 000 FCFA'],
              ['03', 'Référencement local Google', 'Des pages optimisées pour être trouvé facilement à Ouagadougou et au Burkina.', 'seo-local', 'seo', '◎', 'Audit dès 50 000 FCFA'],
              ['04', 'Vidéos publicitaires IA', 'Des formats percutants pour capter l’attention sur Facebook, TikTok et WhatsApp.', 'video-publicitaire-ia', 'video', '▷', 'Sur devis']
            ].map(([n, t, d, s, b, icon, price]) => `
              <article class="bento-card">
                <div class="bento-top">
                  <span class="bento-num">${n} / EXPERTISE</span>
                  <span class="bento-arrow">↗</span>
                </div>
                <div class="bento-icon-popy" aria-hidden="true">${icon}</div>
                <h3>${t}</h3>
                <p>${d}</p>
                <div class="bento-footer">
                  <span class="bento-price-tag">${price}</span>
                  ${link('services/' + s, 'Découvrir le service ↗', 'textlink')}
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      ${section(homePricesOverview(), 'pricing-v2')}
      ${section(`<span class="eyebrow-cyan">— MÉTHODE DE TRAVAIL</span><h2>Comment on avance ensemble, étape par étape.</h2>${steps()}`, 'process-v2')}
      ${section(`<h2>Questions fréquentes</h2>${faq(3)}`)}
      ${cta()}
    `;
  }

  // MISE À JOUR PROPRE DES PAGES DÉMONSTRATIONS (ZÉRO DUPLICATION AVEC RÉALISATIONS)
  for (const p of pages) {
    if (p.slug === 'demonstrations') {
      p.title = 'Nos démonstrations — Savoir-faire web | WEB AFRICA';
      p.body = head('Notre savoir-faire.<br>Vos prochaines idées.', 'Des concepts graphiques originaux pour montrer comment nous organisons les contenus, construisons une identité et préparons le contact.', 'Nos démonstrations') +
        section(`<p class="demo-intro"><strong>Des démonstrations conçues pour votre secteur.</strong> Horizon BTP, Cap Conseil et Savana sont des modèles prêts à être adaptés à votre entreprise, vos couleurs et vos contenus réels. Chaque site est consultable avec ses pages et son parcours de contact.</p><div class="filters" aria-label="Filtrer les démonstrations"><button aria-pressed="true" data-filter="all">Tout explorer</button><button aria-pressed="false" data-filter="btp">BTP</button><button aria-pressed="false" data-filter="cabinet">Conseil</button><button aria-pressed="false" data-filter="restaurant">Restaurant</button></div>${gallery()}`) +
        cta();
    } else if (p.slug.startsWith('demonstrations/')) {
      const type = p.slug.split('/')[1];
      const match = demos.find(d => d[0] === type);
      if (match) {
        const [, name, sector, desc] = match;
        p.title = `${name} — Démonstration créative | WEB AFRICA`;
        p.body = head(`${name}<br>${sector}.`, desc, 'Démonstration WEB AFRICA') +
          section(`<div class="demo-detail-art" data-tilt>${art(type)}</div><div class="split demo-detail"><article class="prose"><h2>L’intention</h2><p>${desc}</p><h2>Les choix graphiques</h2><p>${type === 'btp' ? 'Volumes architecturaux, grands titres et palette bleue : une identité structurée qui donne de la place aux chantiers.' : type === 'cabinet' ? 'Une typographie expressive, un signe directionnel et un contraste marqué pour souligner la clarté de l’accompagnement.' : 'Ambiance chaleureuse aux tons terre cuite et or, photographies de viandes braisées savoureuses et boutons WhatsApp directs pour éveiller l’appétit.'}</p><h2>Le parcours proposé</h2><ol><li>Comprendre l’ambiance et les spécialités de l’établissement.</li><li>Consulter la carte interactive avec prix clairs en FCFA.</li><li>Réserver sa table ou commander directement sur WhatsApp.</li></ol><h2>Ce que vous voyez ici</h2><p>Un modèle sectoriel prêt à l’emploi, créé pour vous projeter. Vos vrais contenus, photos de vos plats et coordonnées remplaceront ces éléments de démonstration.</p></article><aside class="aside"><h3>Une direction qui vous parle ?</h3><p>Adaptons-la à votre établissement, à votre carte et à vos spécialités.</p>${contact('Préparer mon brief', 'btn-popy-primary', '?offre=Pack%20Vitrine%20Essentiel')}<p><a class="btn-popy-glass" href="/demos/${type}/">Visiter le site de démonstration ↗</a></p>${link('demonstrations', 'Toutes les démonstrations', 'textlink')}</aside></div>`) +
          cta();
      }
    }

    if (p.slug === 'creation-site-web-ouagadougou') {
      p.body = p.body.replace('<div class="split">', `<figure class="local-page-photo">${photo('architecture', 'Bâtiments du 2iE à Ouagadougou en 2010')}${caption('2iE, Ouagadougou · Audrey Kameni / SuSanA, 2010. Illustration, sans partenariat.')}</figure><div class="split">`);
    }
  }

  const privacy = pages.find(p => p.slug === 'confidentialite');
  if (privacy) {
    privacy.body = head('Votre confiance<br>commence par la clarté.', 'Quelles informations sont utilisées, quand et pourquoi.', 'Politique de confidentialité') +
      section(`<article class="prose"><h2>Responsable du traitement</h2><p>Le traitement des demandes est assuré par <strong>KOANDA ABDOUL SALAM</strong>, freelance et prestataire indépendant exerçant en nom propre sous le nom commercial <strong>WEB AFRICA</strong> (sans structure sociétaire).<br>Adresse professionnelle : quartier Garghin, Ouagadougou, Burkina Faso.<br>WhatsApp &amp; Téléphone : <a href="https://wa.me/22669291337">+226 69 29 13 37</a><br>Téléphone direct : <a href="tel:+22665414899">+226 65 41 48 99</a><br>E-mail : <a href="mailto:abdousalamkoanda@gmail.com">abdousalamkoanda@gmail.com</a>.</p><h2>Les informations demandées</h2><p>Les formulaires de contact et questionnaires de brief recueillent des coordonnées professionnelles, des détails de projet, un budget indicatif, un calendrier et d’éventuels liens vers vos contenus. Les champs marqués * sont utiles pour établir un devis précis. Ne transmettez jamais de mot de passe ni d’information bancaire sensible.</p><h2>Avant votre envoi</h2><p>Les réponses sont préparées uniquement dans votre navigateur. Le site ne dispose pas de base de données de prospection ni d’enregistrement automatique à votre insu. Vous validez vous-même l’envoi final dans WhatsApp ou par e-mail.</p><h2>Après votre envoi</h2><p>Les données reçues sont utilisées exclusivement pour étudier votre projet, élaborer votre proposition et échanger avec vous. Elles ne sont ni vendues ni cédées à des tiers.</p><h2>Hébergement et services tiers</h2><p>Le site est hébergé par <strong>Hostinger International Ltd.</strong> (61 Lordou Vironos Street, 6023 Larnaca, Chypre - www.hostinger.com) assurant les connexions sécurisées HTTPS. WhatsApp et votre messagerie appliquent leurs propres conditions d'utilisation. Les polices d'écriture et visuels sont servis localement.</p><h2>Conservation et droits</h2><p>Vous disposez d’un droit permanent d’accès, de rectification ou de suppression des informations transmises en écrivant à <a href="mailto:abdousalamkoanda@gmail.com">abdousalamkoanda@gmail.com</a> ou par WhatsApp.</p><h2>Cookies</h2><p>Aucun traceur publicitaire ni cookie d’analyse d’audience n’est présent sur ce site. Un cookie technique facultatif peut être mémorisé uniquement pour vos préférences d’animations.</p>${link('cookies', 'Cookies et préférences', 'textlink')}<h2>Autorité de référence</h2><p>Vous pouvez vous renseigner auprès de la <a href="https://cil.bf/" target="_blank" rel="noopener noreferrer">Commission de l’Informatique et des Libertés du Burkina Faso (CIL)</a>.</p><p class="note">Notice mise à jour en octobre 2026. Prestations de création de sites web en freelance par Abdoul Salam Koanda.</p></article>`);
  }

  const cookies = pages.find(p => p.slug === 'cookies');
  if (cookies) {
    cookies.body = head('Votre navigation.<br>Vos préférences.', 'Des réglages utiles, sans suivi publicitaire ajouté.', 'Cookies & préférences') +
      section(`<article class="prose"><h2>Aucun pixel publicitaire ni outil d’audience</h2><p>Cette version ne charge ni Google Analytics, ni Meta Pixel, ni vidéo intégrée depuis un service tiers. Les fichiers visuels et les polices sont servis avec le site.</p><h2>Un réglage facultatif</h2><p>Si vous choisissez de mémoriser vos préférences, le cookie <code>wa_preferences</code> conserve votre choix d’animations, la version du réglage et sa date pendant six mois. Il ne contient ni nom, ni coordonnées, ni brief. Il est limité au site avec SameSite=Strict, et Secure en HTTPS.</p><h2>Continuer sans mémoriser</h2><p>Aucun cookie de préférence n’est alors créé. Le choix s’applique à la page actuelle. La réduction des animations demandée dans votre appareil reste prioritaire.</p><button class="btn orange" data-open-preferences>Gérer mes préférences</button><h2>Changer d’avis</h2><p>Le réglage reste accessible en bas de chaque page. Vous pouvez le modifier ou supprimer le cookie. Si un outil de suivi est ajouté à l’avenir, les informations et les choix proposés devront être adaptés avant son activation.</p></article>`);
  }

  const credits = JSON.parse(fs.readFileSync('photo-credits.json', 'utf8'));
  const creditsPage = pages.find(p => p.slug === 'credits');
  if (creditsPage) {
    creditsPage.body = head('Des images réelles.<br>Des auteurs crédités.', 'Ces photographies documentent le contexte local. Aucun partenariat, témoignage ou statut de client n’est sous-entendu.', 'Crédits photographiques') +
      section(`<div class="credits-grid">${credits.map(c => `<article>${photo(c.id, c.title.replaceAll('"', '&quot;'))}<h2>${c.id === 'architecture' ? 'Architecture à Ouagadougou' : c.id === 'formation' ? 'Formation Wiki Loves Africa 2025' : c.id === 'weaving' ? 'Design &amp; création web · Ouagadougou' : 'Ouagadougou–Loumbila'}</h2><p>${c.id === 'architecture' ? 'Audrey Kameni / SuSanA Secretariat ; recadrage de Saga City' : c.author.replace(/<[^>]+>/g, '')} · <a href="${c.licenseUrl}" target="_blank" rel="noopener noreferrer">${c.license}</a></p><p>Version réduite, cadrage d’affichage selon l’écran. Aucun visage généré ou remplacé. Les adaptations éventuelles de la photographie restent sous la licence indiquée.</p><a class="textlink" href="${c.url}" target="_blank" rel="noopener noreferrer">Source et licence</a></article>`).join('')}</div><p class="note">Maquettes et formes en relief créées pour WEB AFRICA. Marques de démonstration fictives. Logo fourni par le propriétaire. Polices DM Sans et Manrope sous licence SIL Open Font License, hébergées localement.</p>`);
  }
}
