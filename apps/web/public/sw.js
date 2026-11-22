// Preview-only offline shell: does NOT claim verified essential prayer readiness.
const CACHE="saranam-v1-preview-shell-v1";
const CORE=["/","/en/","/te/","/styles/site.css","/scripts/ui.js","/manifest.webmanifest","/icon.svg"];
self.addEventListener("install",event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(CORE);
})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith("saranam-v1-preview-shell-")&&key!==CACHE)await caches.delete(key);
})()));
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET"||request.headers.has("range"))return;
  const url=new URL(request.url);if(url.origin!==self.location.origin)return;
  event.respondWith((async()=>{
    try{
      const result=await fetch(request);
      if(result.ok && (request.mode==="navigate"||url.pathname==="/search-index.json")){
        const cache=await caches.open(CACHE);await cache.put(request,result.clone());
      }
      return result;
    }catch{
      const cached=await caches.match(request);
      return cached??Response.error();
    }
  })());
});
