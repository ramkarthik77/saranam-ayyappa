import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const root=new URL("../dist/",import.meta.url);
const pages=["index.html",...["en","te"].flatMap(l=>["",...["pooja","prayers","deeksha","learn","pilgrimage","listen","search"]].map(s=>s?"/"+s:"")].map(s=>l+s+"/index.html"))];
for(const file of pages){
  const full=path.join(root.pathname,file);
  assert.ok(fs.existsSync(full),"Missing generated page: "+file);
  const html=fs.readFileSync(full,"utf8");
  assert.ok(html.includes("SARANAM"),"Missing brand: "+file);
  assert.ok(html.includes('name="robots" content="noindex,nofollow"'),"Draft preview must not be indexed: "+file);
}
for(const file of ["sw.js","manifest.webmanifest","styles/site.css","scripts/ui.js","search-index.json"]){
 assert.ok(fs.existsSync(path.join(root.pathname,file)),"Missing PWA asset: "+file);
}
console.log("SARANAM preview build verified:",pages.length,"HTML routes; no publication claims");
