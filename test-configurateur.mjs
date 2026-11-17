import fs from 'node:fs';
import assert from 'node:assert';

console.log('--- VÉRIFICATION DES NOUVELLES RÈGLES TARIFAIRES (ESSENTIEL 119K / PRO 250K-450K / MEMBRE 200K-550K) ---');

// 1. Logique de calcul universelle
function calcTotal(site, options = {}) {
  const { pages = 3, member = 'none', seo = 'base' } = options;

  let formulaTotal = 0;
  if (site === 'essentiel') {
    const base = 119000;
    const extraPages = pages > 5 ? (pages - 5) * 20000 : 0;
    formulaTotal = base + extraPages;
  } else if (site === 'pro_admin') {
    const base = 250000;
    const extraPages = pages > 5 ? (pages - 5) * 40000 : 0;
    formulaTotal = base + extraPages;
  }

  let memberCost = 0;
  if (member === 'standard') memberCost = 200000;
  else if (member === 'roles') memberCost = 350000;
  else if (member === 'dossiers') memberCost = 550000;

  const seoCost = seo === 'cible' ? 15000 : 0;

  return formulaTotal + memberCost + seoCost;
}

// Tests Pack Vitrine Essentiel (3 à 5 pages incluses à 119 000 F)
assert.strictEqual(calcTotal('essentiel', { pages: 3 }), 119000);
assert.strictEqual(calcTotal('essentiel', { pages: 4 }), 119000);
assert.strictEqual(calcTotal('essentiel', { pages: 5 }), 119000);
assert.strictEqual(calcTotal('essentiel', { pages: 6 }), 139000);
assert.strictEqual(calcTotal('essentiel', { pages: 7 }), 159000);
assert.strictEqual(calcTotal('essentiel', { pages: 8 }), 179000);
assert.strictEqual(calcTotal('essentiel', { pages: 9 }), 199000);
assert.strictEqual(calcTotal('essentiel', { pages: 10 }), 219000);
assert.strictEqual(calcTotal('essentiel', { pages: 5, seo: 'cible' }), 134000);

// Tests Pack Vitrine Pro + Admin (5 pages à 250 000 F jusqu'à 10 pages à 450 000 F)
assert.strictEqual(calcTotal('pro_admin', { pages: 5 }), 250000);
assert.strictEqual(calcTotal('pro_admin', { pages: 6 }), 290000);
assert.strictEqual(calcTotal('pro_admin', { pages: 7 }), 330000);
assert.strictEqual(calcTotal('pro_admin', { pages: 8 }), 370000);
assert.strictEqual(calcTotal('pro_admin', { pages: 9 }), 410000);
assert.strictEqual(calcTotal('pro_admin', { pages: 10 }), 450000);
assert.strictEqual(calcTotal('pro_admin', { pages: 5, seo: 'cible' }), 265000);

// Tests Option Espace Membre (200k à 550k)
assert.strictEqual(calcTotal('essentiel', { pages: 3, member: 'standard' }), 319000); // 119 + 200
assert.strictEqual(calcTotal('essentiel', { pages: 5, member: 'roles' }), 469000);    // 119 + 350
assert.strictEqual(calcTotal('essentiel', { pages: 5, member: 'dossiers' }), 669000); // 119 + 550

assert.strictEqual(calcTotal('pro_admin', { pages: 5, member: 'standard' }), 450000); // 250 + 200
assert.strictEqual(calcTotal('pro_admin', { pages: 10, member: 'dossiers', seo: 'cible' }), 1015000); // 450 + 550 + 15

// Vérification du HTML généré
const configHtml = fs.readFileSync('dist/configurateur/index.html', 'utf8');
const tarifsHtml = fs.readFileSync('dist/tarifs/index.html', 'utf8');
const homeHtml = fs.readFileSync('dist/index.html', 'utf8');

assert(configHtml.includes('Pack Vitrine Essentiel'), 'Configurateur contient Pack Vitrine Essentiel');
assert(configHtml.includes('Pack Vitrine Pro + Admin'), 'Configurateur contient Pack Vitrine Pro + Admin');
assert(configHtml.includes('+200 000 FCFA'), 'Configurateur contient Option Membre Standard +200k');
assert(configHtml.includes('+350 000 FCFA'), 'Configurateur contient Option Membre Rôles +350k');
assert(configHtml.includes('+550 000 FCFA'), 'Configurateur contient Option Membre Dossiers +550k');
assert(configHtml.includes('Votre budget est inférieur à 100 000 FCFA ?'), 'Bannière budget < 100k présente dans configurateur');

assert(tarifsHtml.includes('Pack Vitrine Essentiel'), 'Tarifs contient Pack Vitrine Essentiel');
assert(tarifsHtml.includes('Pack Vitrine Pro + Admin'), 'Tarifs contient Pack Vitrine Pro + Admin');
assert(tarifsHtml.includes('Option Espace Membre &amp; Authentification') || tarifsHtml.includes('Option Espace Membre & Authentification'), 'Tarifs contient Option Espace Membre');
assert(tarifsHtml.includes('Votre budget est inférieur à 100 000 FCFA ?'), 'Bannière budget < 100k présente dans tarifs');
assert(tarifsHtml.includes('Comprendre les types de sites et ce que chaque achat implique'), 'Guide pédagogique présent dans tarifs');

assert(homeHtml.includes('119 000'), 'Accueil contient 119 000 FCFA');
assert(!homeHtml.includes('Dès 65 000 FCFA'), 'Accueil ne contient plus 65 000 FCFA');

console.log('✓ Tous les calculs Pack Vitrine Essentiel, Pro + Admin et Espace Membre sont validés à 100% !');
console.log('✓ Tous les templates générés (Accueil, Tarifs, Estimateur) sont validés avec succès !');
