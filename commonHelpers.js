import{a as p,i as E,S as g}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const S="45098988-0aca0e44808ea00320f5f0e3c";p.defaults.baseURL="https://pixabay.com/api/";async function b(r,t=1,a=15){try{return(await p.get("",{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:a}})).data.hits}catch{throw new Error("Failed to fetch images")}}function w(r){return r.map(({webformatURL:t,largeImageURL:a,tags:n,likes:e,views:s,comments:c,downloads:v})=>` 
      <a href="${a}" class="gallery-link">
        <img src="${t}" alt="${n}" class="gallery-image" />
         <div class="info-gallery">
          <p class="info-gallery-item"><b>Likes</b>${e}</p>
          <p class="info-gallery-item"><b>Views</b>${s}</p>
          <p class="info-gallery-item"><b>Comments</b>${c}</p>
          <p class="info-gallery-item"><b>Downloads</b>${v}</p>
        </div>
        </a>
    `).join("")}function i(r){E.error({title:"Error",position:"topRight",message:r})}const f=document.querySelector(".form-search"),y=document.querySelector(".gallery"),u=document.querySelector(".loader"),L=document.querySelector('[data-action="load-more"]');let o,h=1,m=0,d="";class q{constructor(t,a){this.buttonEl=t,this.hiddenClass=a}hide(){this.buttonEl.classList.add(this.hiddenClass)}show(){this.buttonEl.classList.remove(this.hiddenClass)}disable(){this.buttonEl.disabled=!0}enable(){this.buttonEl.disabled=!1}}const l=new q(L,"is-hidden");f.addEventListener("submit",async r=>{if(r.preventDefault(),d=r.target.elements.query.value.trim(),!d){i("Search field cannot be empty");return}u.style.display="flex",l.hide();try{const t=await b(d,h);t.length===0?(i("Sorry, there are no images matching your search query. Please try again!"),y.innerHTML="",l.hide()):(y.innerHTML=w(t),o==null||o.destroy(),o=new g(".gallery-link",{captionsData:"alt",captionDelay:250}),o.refresh(),m=t.length,l.show(),m<15&&(l.hide(),i("We're sorry, but you've reached the end of search results.")))}catch{i("Failed to fetch images")}finally{u.style.display="none",f.reset()}});L.addEventListener("click",async()=>{h+=1,u.style.display="flex";try{const r=await b(d,h);if(r.length===0)l.hide(),i("We're sorry, but you've reached the end of search results.");else{y.insertAdjacentHTML("beforeend",w(r)),o==null||o.destroy(),o=new g(".gallery-link",{captionsData:"alt",captionDelay:250}),o.refresh();const{height:t}=document.querySelector(".gallery-image").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),r.length<15&&(l.hide(),i("We're sorry, but you've reached the end of search results."))}}catch{i("Failed to load images")}finally{u.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
