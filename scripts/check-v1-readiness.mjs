#!/usr/bin/env node
import fs from "node:fs";
import { pathToFileURL } from "node:url";

export const requiredGates = ["catalog","sarana108","morning","evening","deeksha","bhiksha","text-rights","visual-rights","recordings","bilingual","search","offline","accessibility","performance","security","migration","approval","rollback","privacy"];
export const requiredAudioCategories = ["chant","bhajan","devotional"];

export function inspect(manifest) {
  const errors = [],blockers = [];
  if (!manifest || typeof manifest!=="object" || manifest.schemaVersion!==1 || manifest.product!=="SARANAM")
    return {ready:false,errors:["Invalid manifest header"],blockers};
  if (!Array.isArray(manifest.gates) || !Array.isArray(manifest.recordings) || !Array.isArray(manifest.catalogEntries))
    return {ready:false,errors:["gates, recordings and catalogEntries must be arrays"],blockers};
  const seen = new Set(), map = new Map();
  for (const g of manifest.gates) {
    if (!g || typeof g.id!=="string" || seen.has(g.id)) {errors.push("Duplicate or invalid gate ID");continue;}
    seen.add(g.id);map.set(g.id,g);
    if (!requiredGates.includes(g.id)) errors.push("Unexpected gate: "+g.id);
    if (!["pending","failed","passed"].includes(g.status)) errors.push("Invalid status for "+g.id);
    if (!Array.isArray(g.evidenceRefs)) errors.push("Missing evidenceRefs for "+g.id);
    if (g.status==="passed" && (
      !Array.isArray(g.evidenceRefs) || g.evidenceRefs.length===0 ||
      g.evidenceRefs.some(v=>typeof v!=="string" || !v.trim()) ||
      g.ownerApproved!==true || !g.reviewedAt || Number.isNaN(Date.parse(g.reviewedAt))
    )) errors.push("Passed gate lacks reviewed evidence or owner approval: "+g.id);
  }
  for (const id of requiredGates) {
    if(!map.has(id)) errors.push("Missing gate: "+id);
    else if(map.get(id).status!=="passed") blockers.push(id);
  }
  const eligible=manifest.recordings.filter(r=>r && r.humanRecorded===true &&
    r.permission?.onSite===true && typeof r.permission?.evidenceRef==="string" &&
    r.permission.evidenceRef.trim() && r.tests?.ios===true && r.tests?.android===true &&
    requiredAudioCategories.includes(r.category));
  if(eligible.length<3 || requiredAudioCategories.some(category=>!eligible.some(t=>t.category===category)))
    blockers.push("three-licensed-audio-categories");
  if(new Set(eligible.map(t=>t.id)).size!==eligible.length) errors.push("Duplicate audio IDs");
  if(manifest.catalogEntries.length<28 || manifest.catalogEntries.some(e=>!e || !e.id || !e.sourceUrl || e.reviewState!=="reviewed" || e.sourceVerified!==true || !e.reviewEvidenceRef))
    blockers.push("28-reconciled-catalog-candidates");
  if(new Set(manifest.catalogEntries.map(e=>e?.id)).size!==manifest.catalogEntries.length)
    errors.push("Duplicate catalog IDs");
  return {ready:errors.length===0&&blockers.length===0,errors,blockers,passed:requiredGates.filter(id=>map.get(id)?.status==="passed").length,total:requiredGates.length,eligibleAudio:eligible.length,catalogCount:manifest.catalogEntries.length};
}
export function run(args=process.argv.slice(2)) {
  const manifestPath=args.find(a=>a.startsWith("--manifest="))?.split("=")[1] || "content/v1-launch-manifest.json";
  const strict=args.includes("--strict"),json=args.includes("--json");
  let report;
  try {report=inspect(JSON.parse(fs.readFileSync(manifestPath,"utf8")));}
  catch(e){report={ready:false,errors:["Manifest read failed: "+e.message],blockers:[],passed:0,total:requiredGates.length};}
  if(json) console.log(JSON.stringify(report,null,2));
  else {
    console.log("SARANAM v1 readiness:",report.ready?"READY":"BLOCKED",report.passed+"/"+report.total);
    for(const x of report.errors) console.error("INVALID:",x);
    for(const x of report.blockers) console.log("PENDING:",x);
    if(!strict) console.log("Informational report only; Gate C needs --strict plus independent acceptance.");
  }
  if(report.errors.length || (strict && !report.ready)) process.exitCode=1;
  return report;
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) run();
