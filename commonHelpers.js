import{a as y,i as m,S as d}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const g="45098988-0aca0e44808ea00320f5f0e3c";y.defaults.baseURL="https://pixabay.com/api/";async function h(o){try{return(await y.get("",{params:{key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch{throw new Error("Failed to fetch images")}}function b(o){return o.map(({webformatURL:t,largeImageURL:a,tags:i,likes:e,views:r,comments:s,downloads:p})=>` 
      <a href="${a}" class="gallery-link">
        <img src="${t}" alt="${i}" class="gallery-image" />
         <div class="info-gallery">
          <p class="info-gallery-item"><b>Likes</b>${e}</p>
          <p class="info-gallery-item"><b>Views</b>${r}</p>
          <p class="info-gallery-item"><b>Comments</b>${s}</p>
          <p class="info-gallery-item"><b>Downloads</b>${p}</p>
        </div>
        </a>
    `).join("")}function l(o){m.error({title:"Error",position:"topRight",message:o})}const c=document.querySelector(".form-search"),f=document.querySelector(".gallery"),u=document.querySelector(".loader");let n;c.addEventListener("submit",async o=>{o.preventDefault();const t=o.target.elements.query.value.trim();if(!t){l("Search field cannot be empty");return}u.style.display="flex";try{const a=await h(t);a.length===0?(l("Sorry, there are no images matching your search query. Please try again!"),f.innerHTML=""):(f.innerHTML=b(a),n==null||n.destroy(),n=new d(".gallery-link",{captionsData:"alt",captionDelay:250}))}catch{l("Failed to fetch images")}finally{u.style.display="none",c.reset()}});
//# sourceMappingURL=commonHelpers.js.map
