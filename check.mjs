import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {common,finalFields,briefs} from './dist/brief-data.js';
const pages=JSON.parse(fs.readFileSync('pages.json'));
const titles=new Set();let linkCount=0;
for(const p of pages){const file=p.slug==='/'?'dist/index.html':`dist/${p.slug}/index.html`;const h=fs.readFileSync(file,'utf8');assert.equal((h.match(/<h1[ >]/g)||[]).length,1,`${file}: H1`);assert(!titles.has(p.title),'Duplicate title');titles.add(p.title);assert(h.includes('name="description"'));assert(h.includes('rel="canonical"'));assert(!/Zenith Vision|ZENITH VISION/.test(h),'Old brand');for(const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(m[1]);for(const m of h.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[^\"]*)"/g)){let target=m[1];if(target.endsWith('/'))target+='index.html';assert(fs.existsSync(path.join('dist',target)),`${file}: broken link ${target}`);linkCount++}}
for(const [key,s]of Object.entries(briefs)){const ids=[...common,...s.fields,...finalFields].map(f=>f.id);assert.equal(ids.length,new Set(ids).size,`${key}: duplicate fields`);assert(fs.existsSync(`dist/brief/${key}/index.html`));}
assert(fs.readFileSync('dist/brief.js','utf8').includes('22669291337'));
console.log(`PASS: ${pages.length} pages; ${linkCount} liens internes; titres uniques, H1, JSON-LD, marque et contact; 4 questionnaires sans champs dupliqués.`);
