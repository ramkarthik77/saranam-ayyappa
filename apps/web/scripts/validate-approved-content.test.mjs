import test from "node:test";
import assert from "node:assert/strict";
import {checkPrayers} from "./validate-approved-content.mjs";
const edition={id:"te-1",language:"te",revision:"r1",tradition:"Tradition A",
 sourceName:"Reviewed source",sourceUrl:"https://example.org/source",rightsSummary:"Authorized",
 attribution:"Example author",approvedAt:"2026-11-21",proofreadBy:"reviewer-id",approvalRef:"owner-approval-id",
 verses:[{id:"v1",text:"Reviewed placeholder fixture"}]};
const prayer={id:"p1",slug:"test-prayer",title:"Test prayer",category:"mantra",editions:[edition]};
test("an empty reviewed catalog is valid for an unpublished scaffold",()=>assert.deepEqual(checkPrayers([]),[]));
test("a complete synthetic metadata fixture validates",()=>assert.deepEqual(checkPrayers([prayer]),[]));
test("unattributed, unsourced or empty editions are rejected",()=>{
 const bad=structuredClone(prayer);bad.editions[0].verses=[];bad.editions[0].approvalRef="";
 assert.ok(checkPrayers([bad]).length>0);
});
test("verse and slug collisions are rejected",()=>{
 const bad=structuredClone(prayer);bad.editions[0].verses.push({id:"v1",text:"same id"});
 assert.ok(checkPrayers([bad]).some(x=>x.includes("Invalid verse")));
 assert.ok(checkPrayers([prayer,prayer]).some(x=>x.includes("slug")));
});
