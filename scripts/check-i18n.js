const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const en=JSON.parse(read('i18n/en.json')),te=JSON.parse(read('i18n/te.json')), review=JSON.parse(read('i18n/te-review.json'));
const errors=[],used=new Set();
const has=(obj,key)=>Object.hasOwn(obj,key);
const tokens=s=>[...String(s).matchAll(/\{(\w+)\}/g)].map(x=>x[1]).sort().join(',');
for(const k of new Set([...Object.keys(en),...Object.keys(te)])){
 if(!has(en,k)||!has(te,k))errors.push('Locale key mismatch: '+k);
 else if(typeof en[k]!=='string'||typeof te[k]!=='string'||!en[k].trim()||!te[k].trim()||tokens(en[k])!==tokens(te[k]))errors.push('Invalid translation or placeholders: '+k);
 if(review[k]!=='needs review')errors.push('Missing review flag: '+k);
}
const decode=s=>s.replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
for(const file of ['index.html','ayyappa-guide.html','episode-01.html','script.js','i18n/ui.js']){
 const src=read(file);
 const keys=[...src.matchAll(/\b(?:saranamText|tr)\s*\(\s*(['"])((?:\\.|(?!\1)[^\\])*)\1/g)].map(x=>x[2]);
 keys.push(...[...src.matchAll(/\bdata-ui(?:-aria|-title|-initial)?="([^"]+)"/g)].map(x=>decode(x[1])));
 keys.push(...[...src.matchAll(/\[\s*i\s*[+-]\s*1\s*,\s*'([^']+)'/g)].map(x=>x[1]));
 keys.push(...[...src.matchAll(/dataset\.ui(?:Aria|Title)?\s*=\s*'([^']+)'/g)].map(x=>x[1]));
 for(const k of keys){used.add(k);if(!has(en,k)||!has(te,k))errors.push(file+': missing key '+k)}
 if(file.endsWith('.html'))for(const m of src.matchAll(/<script>([\s\S]*?)<\/script>/g))new Function(m[1]);
 else new Function(src);
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}
else console.log('i18n OK: '+Object.keys(en).length+' matching locale keys; '+used.size+' distinct source keys checked; all Telugu keys marked needs review.');
