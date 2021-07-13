!function(){const e=["index.html"];self.addEventListener("install",(t=>{t.waitUntil(caches.open("vund-karte").then((t=>t.addAll(e))))})),self.addEventListener("activate",(e=>{})),self.addEventListener("fetch",(e=>{console.log("Fetch intercepted for:",e.request.url),e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request))))}))}();
//# sourceMappingURL=sw.js.map
