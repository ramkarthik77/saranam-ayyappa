#!/usr/bin/env node
import fs from "node:fs";
const path="content/approved-prayers.json";
export function checkPrayers(records){
 const errors=[];
 if(!Array.isArray(records))return ["Approved prayer catalog must be an array"];
 const ids=new Set(),slugs=new Set();
 for(const p of records){
  if(!p||typeof p.id!=="string"||!p.id||ids.has(p.id))errors.push("Invalid or duplicate prayer id");
  if(p?.id)ids.add(p.id);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p?.slug??"")||slugs.has(p.slug))errors.push("Invalid or duplicate prayer slug: "+p?.slug);
  if(p?.slug)slugs.add(p.slug);
  if(!p?.title||!p?.category||!Array.isArray(p.editions)||p.editions.length===0)errors.push("Missing required prayer metadata: "+p?.id);
  const editionIds=new Set();
  for(const e of Array.isArray(p?.editions)?p.editions:[]){
   if(!e?.id||editionIds.has(e.id))errors.push("Invalid or duplicate edition: "+p?.id);
   if(e?.id)editionIds.add(e.id);
   if(!["en","te"].includes(e?.language))errors.push("Invalid language: "+p?.id);
   for(const key of ["revision","tradition","sourceName","sourceUrl","rightsSummary","attribution","approvedAt","proofreadBy","approvalRef"]){
    if(typeof e?.[key]!=="string"||!e[key].trim())errors.push("Missing edition field "+key+": "+p?.id);
   }
   if(!/^https:\/\//.test(e?.sourceUrl??""))errors.push("Source URL must be https: "+p?.id);
   if(!Array.isArray(e?.verses)||e.verses.length===0)errors.push("Missing full verse text: "+p?.id);
   const verses=new Set();
   for(const v of Array.isArray(e?.verses)?e.verses:[]){
    if(!v?.id||verses.has(v.id)||typeof v.text!=="string"||!v.text.trim())errors.push("Invalid verse: "+p?.id);
    if(v?.id)verses.add(v.id);
   }
  }
 }
 return errors;
}
if(process.argv[1]?.endsWith("validate-approved-content.mjs")){
 const value=JSON.parse(fs.readFileSync(path,"utf8"));
 const errors=checkPrayers(value);
 if(errors.length){console.error(errors.join("\n"));process.exit(1)}
 console.log("Approved prayer data valid:",value.length,"entries. Empty content allowed in development only.");
}
