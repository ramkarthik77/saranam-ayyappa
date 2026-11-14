const cacheName = 'saranam-v__SARANAM_RELEASE__';
const pages = new Map([['/', '/'], ['/index.html', '/'], ['/ayyappa-guide', '/ayyappa-guide'], ['/ayyappa-guide.html', '/ayyappa-guide'], ['/episode-01', '/episode-01'], ['/episode-01.html', '/episode-01']]);
const assets = ['/styles.css','/script.js','/assets/hero-poster.jpg','/assets/ayyappa-forest.mp4',...Array.from({length:5},(_,i)=>'/assets/story/episode-01-'+(i+1)+'.webp')];
self.addEventListener('install', event => event.waitUntil((async()=>{
  const cache=await caches.open(cacheName);
  await cache.addAll([...new Set(pages.values()), ...assets].map(path=>new Request(path,{cache:'reload'})));
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async()=>{
  await Promise.all((await caches.keys()).filter(key=>key.startsWith('saranam-v')&&key!==cacheName).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event=>{
  const {request}=event,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||request.headers.has('range'))return;
  const path=pages.get(url.pathname);
  if(!path&&!assets.includes(url.pathname))return;
  event.respondWith((async()=>{
    try{return await fetch(request,path?{cache:'no-store'}:undefined)}
    catch(error){const cache=await caches.open(cacheName);return await cache.match(path||url.pathname)||Response.error()}
  })());
});
