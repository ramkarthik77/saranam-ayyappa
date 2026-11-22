import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {inspect,requiredGates} from "./check-v1-readiness.mjs";

const baseline=JSON.parse(fs.readFileSync("content/v1-launch-manifest.json","utf8"));
const copy=()=>structuredClone(baseline);

test("current manifest accurately reports an incomplete launch",()=>{
  const report=inspect(copy());
  assert.equal(report.ready,false);
  assert.equal(report.errors.length,0);
  assert.equal(report.passed,0);
  assert.equal(report.total,requiredGates.length);
});
test("passing a gate requires evidence and owner review",()=>{
  const m=copy();m.gates[0].status="passed";
  assert.ok(inspect(m).errors.some(x=>x.includes("reviewed evidence")));
});
test("missing or repeated gate is a schema error",()=>{
  const m=copy();m.gates.pop();
  assert.ok(inspect(m).errors.some(x=>x.includes("Missing gate")));
  m.gates.push({...m.gates[0]});
  assert.ok(inspect(m).errors.some(x=>x.includes("Duplicate")));
});
test("unlicensed audio cannot pass readiness",()=>{
  const m=copy();m.recordings=[{id:"track",category:"chant",humanRecorded:true,permission:{onSite:false,evidenceRef:"none"},tests:{ios:true,android:true}}];
  assert.equal(inspect(m).eligibleAudio,0);
});
test("complete synthetic test data demonstrates checker logic, not actual approval",()=>{
  const m=copy();
  for(const g of m.gates){g.status="passed";g.ownerApproved=true;g.reviewedAt="2026-11-21T00:00:00Z";g.evidenceRefs=["fixture:"+g.id];}
  m.recordings=["chant","bhajan","devotional"].map(category=>({id:"fixture-"+category,category,humanRecorded:true,permission:{onSite:true,evidenceRef:"fixture:"+category},tests:{ios:true,android:true}}));
  m.catalogEntries=Array.from({length:28},(_,i)=>({id:"fixture-"+i,sourceUrl:"https://example.org/"+i,reviewState:"reviewed"}));
  const report=inspect(m);
  assert.equal(report.ready,true);
  assert.deepEqual(report.errors,[]);
});
