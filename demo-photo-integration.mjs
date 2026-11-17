import fs from 'node:fs';
const alts={
  btp:'Villa contemporaine à cour intérieure inspirée de l’architecture du Burkina Faso — image générée',
  cabinet:'Professionnels africains en réunion de conseil — image générée',
  restaurant:'Grillades au feu de bois et spécialités sahéliennes à Ouagadougou — présentation'
};
for(const [id,alt] of Object.entries(alts)){
  const file=`dist/demos/${id}/index.html`;
  if(!fs.existsSync(file)) continue;
  let h=fs.readFileSync(file,'utf8');
  const imgPath = id==='restaurant' ? '/photos/demo-restaurant-cover.jpg' : `/photos/demo-${id}-generated.png`;
  const figure=`<figure class="generated-hero"><img src="${imgPath}" alt="${alt}" width="1536" height="1024" fetchpriority="high"><figcaption>✦ Modèle sectoriel haute performance conçu par WEB AFRICA</figcaption></figure>`;
  if(id==='btp')h=h.replace(/<div class="architectural-hero">[\s\S]*?<\/section>/,figure+'</section>');
  else if(id==='cabinet')h=h.replace(/<div class="consult-visual"[\s\S]*?<\/section>/,figure+'</section>');
  else h=h.replace(/<figure class="visual">[\s\S]*?<\/figure>/,figure);
  fs.writeFileSync(file,h);
}
