(() => {
  "use strict";
  const root=document.getElementById("deeksha-app");
  if(!root)return;
  const te=document.documentElement.lang==="te";
  const tr=(a,b)=>te?b:a;
  const status=root.querySelector("#deeksha-status");
  const currentEl=root.querySelector("#deeksha-current");
  const archiveEl=root.querySelector("#deeksha-archive");
  const startForm=root.querySelector("#deeksha-start");
  const backupInput=root.querySelector("#deeksha-import");
  const preview=root.querySelector("#deeksha-preview");
  const tell=message=>status.textContent=message;
  const node=(tag,cls,text)=>{
    const x=document.createElement(tag);
    if(cls)x.className=cls;
    if(text!==undefined)x.textContent=text;
    return x;
  };
  const safeDate=str=>/^\d{4}-\d{2}-\d{2}$/.test(str)&&
    Number.isFinite(Date.parse(str+"T00:00:00Z")) &&
    new Date(str+"T00:00:00Z").toISOString().slice(0,10)===str;
  const validZone=str=>{try{new Intl.DateTimeFormat("en-US",{timeZone:str});return true}catch{return false}};
  const serial=str=>Date.parse(str+"T00:00:00Z")/86400000;
  const zoneToday=zone=>{
    const parts=new Intl.DateTimeFormat("en-US",{timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
    const vals=Object.fromEntries(parts.map(p=>[p.type,p.value]));
    return vals.year+"-"+vals.month+"-"+vals.day;
  };
  const dayDate=(start,index)=>new Date((serial(start)+index-1)*86400000).toISOString().slice(0,10);
  const requestResult=req=>new Promise((resolve,reject)=>{
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
  const dbPromise=new Promise((resolve,reject)=>{
    if(!window.indexedDB)return reject(new Error("IndexedDB is not available"));
    const req=indexedDB.open("saranam-private-v1",1);
    req.onupgradeneeded=()=>{
      const db=req.result;
      for(const name of ["cycles","bookmarks","preferences"]){
        if(!db.objectStoreNames.contains(name))db.createObjectStore(name,{keyPath:name==="preferences"?"key":"id"});
      }
    };
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
  const dbOp=async(action,record)=>{
    const db=await dbPromise;
    return requestResult((db.transaction("cycles",action==="all"?"readonly":"readwrite")
      .objectStore("cycles"))[action==="all"?"getAll":"put"](...(action==="all"?[]:[record])));
  };
  const getCycles=()=>dbOp("all");
  const putCycle=c=>dbOp("put",c);
  const cycleDay=(c,n)=>c.days[String(n)]??{completed:false,practices:{},reflection:""};
  let selected=1;
  const validateCycle=c=>
    c&&typeof c.id==="string"&&c.id.length<=90&&safeDate(c.start)&&
    typeof c.timeZone==="string"&&validZone(c.timeZone)&&
    ["active","archived"].includes(c.status)&&c.days&&typeof c.days==="object"&&
    Object.keys(c.days).length<=41&&Object.entries(c.days).every(([key,x])=>
      /^([1-9]|[1-3][0-9]|4[01])$/.test(key)&&
      x&&typeof x.completed==="boolean"&&typeof x.reflection==="string"&&
      x.reflection.length<=1000&&x.practices&&typeof x.practices==="object"
    );
  async function render(){
    const cycles=await getCycles();
    const active=cycles.find(c=>c.status==="active");
    currentEl.replaceChildren();archiveEl.replaceChildren();
    startForm.hidden=Boolean(active);
    if(!active)currentEl.append(node("p","muted",tr("No active cycle on this device.","ఈ పరికరంలో దీక్ష ప్రారంభించలేదు.")));
    else{
      const today=Math.max(1,Math.min(41,serial(zoneToday(active.timeZone))-serial(active.start)+1));
      currentEl.append(node("h2","",tr("Deeksha · Day ","దీక్ష · రోజు ")+today+" / 41"));
      currentEl.append(node("p","muted small",active.start+" · "+active.timeZone));
      const grid=node("div","tracker-grid");grid.setAttribute("aria-label","41-day Deeksha tracker");
      for(let n=1;n<=41;n++){
        const marked=cycleDay(active,n).completed;
        const button=node("button","tracker-day"+(marked?" marked":"")+(n===selected?" selected":"")+(n===today?" today":""),String(n));
        button.type="button";
        button.setAttribute("aria-pressed",String(n===selected));
        button.setAttribute("aria-label",tr("Day ","రోజు ")+n+" · "+dayDate(active.start,n)+(marked?" · ✓":""));
        button.onclick=()=>{selected=n;render().catch(()=>tell(tr("Storage unavailable","డేటా అందుబాటులో లేదు")))};
        grid.append(button);
      }
      currentEl.append(grid);
      const form=node("form","day-editor");
      form.append(node("h3","",tr("Day ","రోజు ")+selected+" · "+dayDate(active.start,selected)));
      const data=cycleDay(active,selected);
      const checkbox=(label,key,value)=>{
        const l=node("label","tracker-check");
        const input=node("input");input.type="checkbox";input.name=key;input.checked=Boolean(value);
        l.append(input,document.createTextNode(label));return l;
      };
      form.append(checkbox(tr("I completed this day","ఈ రోజు పూర్తయింది"),"completed",data.completed));
      const extras=node("div","tracker-extras");
      for(const [label,key] of [
        [tr("Pooja","పూజ"),"pooja"],
        [tr("Prayers","ప్రార్థనలు"),"prayers"],
        [tr("Reflection","ఆత్మపరిశీలన"),"reflection"]
      ])extras.append(checkbox(label,key,data.practices[key]));
      form.append(extras);
      const l=node("label","label",tr("Private note (optional)","వ్యక్తిగత గమనిక (ఐచ్ఛికం)"));
      const notes=node("textarea","tracker-notes");
      notes.rows=3;notes.maxLength=1000;notes.value=data.reflection;
      l.append(notes);form.append(l);
      const save=node("button","cta primary",tr("Save on this device","ఈ పరికరంలో సేవ్ చేయండి"));save.type="submit";
      form.append(save);
      form.onsubmit=async e=>{
        e.preventDefault();
        const check=k=>form.querySelector('[name="'+k+'"]').checked;
        active.days[String(selected)]={
          completed:check("completed"),
          practices:{pooja:check("pooja"),prayers:check("prayers"),reflection:check("reflection")},
          reflection:notes.value.slice(0,1000)
        };
        active.updatedAt=new Date().toISOString();
        try{await putCycle(active);tell(tr("Saved on this device.","ఈ పరికరంలో సేవ్ అయ్యింది."));await render()}
        catch{tell(tr("Could not save. Export any existing records before clearing browser data.","డేటాను సేవ్ చేయడం సాధ్యం కాలేదు."))}
      };
      currentEl.append(form);
      const archiveButton=node("button","cta secondary",tr("Archive this cycle","ఈ దీక్షను భద్రపరచండి"));
      archiveButton.type="button";
      archiveButton.onclick=async()=>{
        if(!confirm(tr("Archive this Deeksha? You can view it in the history.","ఈ దీక్షను భద్రపరచాలా?")))return;
        active.status="archived";active.updatedAt=new Date().toISOString();
        try{await putCycle(active);selected=1;await render()}catch{tell(tr("Save failed","సేవ్ కాలేదు"))}
      };
      currentEl.append(archiveButton);
    }
    const archived=cycles.filter(c=>c.status==="archived").sort((a,b)=>b.start.localeCompare(a.start));
    if(!archived.length)archiveEl.append(node("p","muted small",tr("No archived observances.","మునుపటి దీక్షలు లేవు.")));
    else for(const c of archived){
      const row=node("div","archive-row");
      row.append(node("strong","",c.start),node("span","muted small",c.timeZone));
      archiveEl.append(row);
    }
  }
  const date=startForm.querySelector('[name="start"]');
  const zone=startForm.querySelector('[name="zone"]');
  zone.value=Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC";
  date.value=zoneToday(zone.value);
  startForm.onsubmit=async e=>{
    e.preventDefault();
    if(!safeDate(date.value)||!validZone(zone.value.trim())){tell(tr("Invalid date or time zone.","తేదీ లేదా సమయ మండలం సరిగా లేదు."));return}
    try{
      const all=await getCycles();
      if(all.some(c=>c.status==="active")){tell("Archive the current cycle first.");return}
      await putCycle({id:crypto.randomUUID(),schemaVersion:1,status:"active",
        start:date.value,timeZone:zone.value.trim(),days:{},updatedAt:new Date().toISOString()});
      selected=1;await render();
    }catch{tell(tr("Could not start local cycle.","దీక్ష ప్రారంభం కాలేదు."))}
  };
  root.querySelector("#deeksha-export").onclick=async()=>{
    if(!confirm(tr("Backup may contain sensitive devotional notes. Store it privately.","బ్యాకప్‌లో వ్యక్తిగత గమనికలు ఉండవచ్చు. జాగ్రత్తగా ఉంచండి.")))return;
    try{
      const backup={format:"saranam-private-backup",schemaVersion:1,
        exportedAt:new Date().toISOString(),cycles:await getCycles()};
      const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)],{type:"application/json"}));
      const a=node("a");a.href=url;a.download="saranam-private-backup.json";
      document.body.append(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),5000);
    }catch{tell(tr("Backup failed.","బ్యాకప్ విఫలమైంది."))}
  };
  backupInput.onchange=async()=>{
    preview.replaceChildren();const file=backupInput.files?.[0];if(!file)return;
    try{
      if(file.size>1024*1024)throw new Error("File too large");
      const raw=JSON.parse(await file.text());
      if(raw.format!=="saranam-private-backup"||raw.schemaVersion!==1||
        !Array.isArray(raw.cycles)||raw.cycles.length>50||
        !raw.cycles.every(validateCycle)||new Set(raw.cycles.map(c=>c.id)).size!==raw.cycles.length)
        throw new Error("Backup failed validation");
      const current=new Map((await getCycles()).map(c=>[c.id,c]));
      preview.append(node("h3","",tr("Review import conflicts","దిగుమతి వివరాలను సమీక్షించండి")));
      const choices=[];
      for(const c of raw.cycles){
        const row=node("div","import-row");
        row.append(node("strong","",c.start+" · "+c.timeZone));
        const select=node("select","import-choice");
        const options=current.has(c.id)?[
          ["keep",tr("Keep current record","ప్రస్తుత వివరాలు ఉంచు")],
          ["replace",tr("Use imported record","దిగుమతి చేసినవి వాడు")]
        ]:[
          ["replace",tr("Import record","దిగుమతి చేయండి")],
          ["keep",tr("Skip record","దాటవేయండి")]
        ];
        for(const [value,label] of options){
          const option=node("option","",label);option.value=value;select.append(option);
        }
        row.append(select);preview.append(row);choices.push([c,select]);
      }
      const apply=node("button","cta primary",tr("Apply selected imports","ఎంచుకున్నవి దిగుమతి చేయండి"));
      apply.type="button";
      apply.onclick=async()=>{
        const selectedRecords=choices.filter(([,select])=>select.value==="replace").map(([record])=>record);
        const merged=new Map(current);
        for(const c of selectedRecords)merged.set(c.id,c);
        if([...merged.values()].filter(c=>c.status==="active").length>1){
          tell(tr("Only one active Deeksha is allowed. Archive a conflicting record first.","ఒకేసారి ఒక దీక్ష మాత్రమే కొనసాగాలి."));return;
        }
        try{
          for(const c of selectedRecords)await putCycle(c);
          preview.replaceChildren();backupInput.value="";selected=1;await render();
          tell(tr("Import finished. Your choices were saved locally.","దిగుమతి పూర్తయింది."));
        }catch{tell(tr("Import could not finish.","దిగుమతి పూర్తి కాలేదు."))}
      };
      preview.append(apply);
      tell("");
    }catch{tell(tr("This backup is invalid or too large.","బ్యాకప్ సరిగా లేదు."))}
  };
  dbPromise.then(render).catch(()=>{tell(tr("Private browser storage is unavailable.","వ్యక్తిగత డేటా నిల్వ అందుబాటులో లేదు."));startForm.hidden=true});
})();
