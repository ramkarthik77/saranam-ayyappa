(() => {
  "use strict";
  const safeStorage={
    get(k){try{return localStorage.getItem(k)}catch{return null}},
    put(k,v){try{localStorage.setItem(k,v)}catch{}}
  };
  const key="saranam:reduced-motion";
  const toggle=document.querySelector("[data-motion-toggle]");
  const prefers=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??false;
  function setMotion(value){
    document.documentElement.dataset.reduceMotion=value?"true":"false";
    if(toggle)toggle.setAttribute("aria-pressed",String(value));
    safeStorage.put(key,String(value));
  }
  const saved=safeStorage.get(key);
  setMotion(saved===null?prefers:saved==="true");
  toggle?.addEventListener("click",()=>setMotion(document.documentElement.dataset.reduceMotion!=="true"));
  const form=document.querySelector("#site-search");
  if(form){
    const results=document.querySelector("#search-results"),input=document.querySelector("#search-text");
    const locale=document.documentElement.lang==="te"?"te":"en";
    form.addEventListener("submit",async event=>{
      event.preventDefault();
      const q=input.value.trim().toLocaleLowerCase();
      if(!q){results.replaceChildren();return}
      try{
        const r=await fetch("/search-index.json",{cache:"force-cache"});
        if(!r.ok)throw new Error("Search index unavailable");
        const index=await r.json();
        const matches=index.filter(item=>item.href.startsWith("/"+locale+"/") &&
          [item.title,...item.aliases].some(term=>term.toLocaleLowerCase().includes(q))).slice(0,12);
        results.replaceChildren();
        if(!matches.length){const p=document.createElement("p");p.textContent=locale==="te"?"ఫలితాలు లేవు":"No matches yet";results.append(p);return}
        for(const hit of matches){
          const a=document.createElement("a");a.href=hit.href;a.className="result-link";
          const label=document.createElement("strong");label.textContent=hit.title;
          const note=document.createElement("small");note.textContent=locale==="te"?"విభాగం":"Section · Verified prayer text pending";
          a.append(label,note);results.append(a);
        }
      }catch{
        results.textContent=locale==="te"?"వెతకడం సాధ్యం కాలేదు":"Search unavailable. Please try again.";
      }
    });
  }
  if("serviceWorker" in navigator && location.protocol==="https:" &&
     !new URLSearchParams(location.search).has("no-sw")){
    window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
  }
})();
