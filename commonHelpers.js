import{i as m,S as p}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const d="45098988-0aca0e44808ea00320f5f0e3c",g="https://pixabay.com/api/";async function h(o){const r=await fetch(`${g}?key=${d}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`);if(!r.ok)throw new Error("Failed to fetch images");return(await r.json()).hits}function b(o){return o.map(({webformatURL:r,largeImageURL:a,tags:i,likes:e,views:t,comments:s,downloads:y})=>` 
      <a href="${a}" class="gallery-link">
        <img src="${r}" alt="${i}" class="gallery-image" />
         <div class="info-gallery">
          <p class="info-gallery-item"><b>Likes</b>${e}</p>
          <p class="info-gallery-item"><b>Views</b>${t}</p>
          <p class="info-gallery-item"><b>Comments</b>${s}</p>
          <p class="info-gallery-item"><b>Downloads</b>${y}</p>
        </div>
        </a>
    `).join("")}function l(o){m.error({title:"Error",position:"topRight",message:o})}const c=document.querySelector(".form-search"),f=document.querySelector(".gallery"),u=document.querySelector(".loader");let n;c.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements.query.value.trim();if(!r){l("Search field cannot be empty");return}u.style.display="flex";try{const a=await h(r);a.length===0?(l("Sorry, there are no images matching your search query. Please try again!"),f.innerHTML=""):(f.innerHTML=b(a),n==null||n.destroy(),n=new p(".gallery-link",{captionsData:"alt",captionDelay:250}))}catch{l("Failed to fetch images")}finally{u.style.display="none",c.reset()}});
//# sourceMappingURL=commonHelpers.js.map
