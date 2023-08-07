const removeChildElementsById=e=>{const t=document.querySelector(e);if(t)for(;t.firstChild;)t.removeChild(t.firstChild)},fillElements=async()=>{document.querySelectorAll("#publish-targets .custom-domains").forEach((async(e,t)=>{let a=e.querySelector('[data-automation-id="publish-open-new-tab"]'),l=e.querySelector("#lock-"+t),o=e.querySelector("#unlock-"+t);const n=new URL(a.href).hostname;let i=await getItem(globalThis.collectionExEvent._id,n);if(o.classList.remove("f3_hidden"),l.classList.add("f3_hidden"),i.count>0){let a=i.items[0];if(a.domain==n&&!a.allow){document.getElementById("toggle-"+t).click();let n=e.querySelector(".wf-1apt7pe");childSideCheckbox=n.querySelector("div");let i=e.querySelector("#textarea-"+t);childSideCheckbox.classList.add("wf-fotvco"),childSideCheckbox.classList.remove("wf-1w47aue");n.querySelector("input").checked=!1,i.classList.remove("f3_hidden"),i.value=a.comment,l.classList.remove("f3_hidden"),o.classList.add("f3_hidden")}}}))},appendElements=()=>{setTimeout((()=>{let e=document.querySelector("#publish-targets .loader");null!=e&&e.classList.remove("f3_spinner"),document.querySelectorAll("#publish-targets .custom-domains").forEach(((e,t)=>{let a=document.getElementById("toggle-"+t),l=document.getElementById("textarea-"+t);if(!a&&!l){let a=document.createElement("li"),l=document.createElement("div");l.className="f3_container-flex";let o=document.createElement("div");o.className="f3_content-side";let n=document.createElement("div");n.className="f3_content-locks";let i=document.createElement("div");i.className="f3_lock f3_hidden",i.id="lock-"+t;let s=document.createElement("div");s.className="f3_unlock f3_hidden",s.id="unlock-"+t;let c=document.createElement("label");c.id="label-"+t,c.className="f3-inputs f3_label",c.textContent="Block Deploy *";let r=document.createElement("label");r.id="labelChbox-"+t,r.className="f3_switch-wrapper";let d=document.createElement("div");d.id="divChbox-"+t,d.className="f3_switch";let m=document.createElement("input");m.type="checkbox",m.id="toggle-"+t,m.className="f3-inputs f3_switch-checkbox",r.appendChild(m),r.appendChild(d);let u=document.createElement("textarea");u.id="textarea-"+t,u.className="f3-inputs f3_code f3_hidden",u.placeholder="Write a message to inform why",a.appendChild(l),n.appendChild(s),n.appendChild(i),n.appendChild(c),o.appendChild(n),o.appendChild(r),l.appendChild(o),a.appendChild(u),e.appendChild(a),document.getElementById(m.id).addEventListener("change",(async function(){let e=this.closest(".custom-domains"),t=e.querySelector(".wf-fotvco"),a=e.querySelector(".wf-1apt7pe");childSideCheckbox=a.querySelector("div");let l=e.querySelector("#"+u.id),o=e.querySelector("#"+i.id),n=e.querySelector("#"+s.id);const c=a.querySelector("input"),r=new MouseEvent("click",{bubbles:!0});if(this.checked)t||c.dispatchEvent(r),l.classList.remove("f3_hidden"),o.classList.remove("f3_hidden"),n.classList.add("f3_hidden"),l.value="";else{let a=e.querySelector('[data-automation-id="publish-open-new-tab"]'),i=e.querySelector(".f3_switch-checkbox");const s=new URL(a.href).hostname;let d={staging:!0,fields:{name:s+"-"+Date.now(),domain:s,user:globalThis.site.user.email,allow:!i.checked,comment:"",_archived:!1,_draft:!0}};t&&c.dispatchEvent(r),l.classList.add("f3_hidden"),l.value="",o.classList.add("f3_hidden"),n.classList.remove("f3_hidden"),await createItem(globalThis.collectionExEvent._id,d)}})),document.getElementById(u.id).addEventListener("change",(async function(){let e=this.closest(".custom-domains"),t=e.querySelector('[data-automation-id="publish-open-new-tab"]'),a=e.querySelector(".f3_switch-checkbox");const l=new URL(t.href).hostname;let o={staging:!0,fields:{name:l+"-"+Date.now(),domain:l,user:globalThis.site.user.email,allow:!a.checked,comment:this.value,_archived:!1,_draft:!0}};await createItem(globalThis.collectionExEvent._id,o)}))}})),fillElements()}),1e3)},getCSRFToken=()=>document.head.querySelector('meta[name="_csrf"]')?.getAttribute("content")||"",createCollection=async()=>{try{let e=new Headers;e.append("Content-Type","application/json"),e.append("X-XSRF-Token",getCSRFToken());let t={method:"POST",headers:e,body:JSON.stringify({name:"exEvents",slug:"exevents",singularName:"Extension Events",fields:[{name:"domain",type:"PlainText"},{name:"user",type:"PlainText"},{name:"allow",type:"Bool"},{name:"comment",type:"PlainText"}]}),redirect:"follow"},a=await fetch("https://webflow.com/api/sites/"+getSiteName()+"/collectionPage",t);if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);return await a.json()}catch(e){return[]}},createDatabase=async()=>{try{let e={name:getSiteName()+"'s' Database",description:getSiteName()+"'s' Database",collections:[],assetSize:0,createdOn:"2023-05-16T20:16:14.377Z",lastUpdated:"2023-05-16T20:16:14.417Z",archived:!1,stagingMeta:{},maxItemRefs:10,maxFieldLimit:100,maxItemLimit:2e4,maxEcomItemLimit:2500,maxLocales:2,maxCollectionLimit:100},t=new Headers;t.append("Content-Type","application/json"),t.append("X-XSRF-Token",getCSRFToken());let a={method:"POST",headers:t,body:JSON.stringify(e),redirect:"follow"},l=await fetch("https://webflow.com/api/sites/"+getSiteName()+"/database",a);if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);return await l.json()}catch(e){return[]}},createItem=async(e,t)=>{try{let a=new Headers;a.append("Content-Type","application/json"),a.append("X-XSRF-Token",getCSRFToken());let l={method:"POST",headers:a,body:JSON.stringify(t),redirect:"follow"},o=await fetch("https://webflow.com/api/v1/collections/"+e+"/items",l);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);return await o.json()}catch(e){return[]}},getItem=async(e,t)=>{try{let a=new Headers;a.append("Content-Type","application/json"),a.append("X-XSRF-Token",getCSRFToken());let l={method:"GET",headers:a,redirect:"follow"},o=await fetch("https://webflow.com/api/v1/collections/"+e+"/items?target=staging&offset=0&limit=1&sort%5B%5D=-created-on&format=withoutHeavyFields&text="+t,l);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);return await o.json()}catch(e){return[]}},getAllItems=async e=>{try{let t=new Headers;t.append("Content-Type","application/json"),t.append("X-XSRF-Token",getCSRFToken());let a={method:"GET",headers:t,redirect:"follow"},l=await fetch("https://webflow.com/api/v1/collections/"+e+"/items?target=staging&offset=10&limit=10&sort%5B%5D=-created-on&format=withoutHeavyFields",a);if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);return await l.json()}catch(e){return[]}},getCollections=async e=>{try{let t=new Headers;t.append("Content-Type","application/json"),t.append("X-XSRF-Token",getCSRFToken());let a={method:"GET",headers:t,redirect:"follow"},l=await fetch("https://webflow.com/api/v1/databases/"+e+"/collections",a);if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);return await l.json()}catch(e){return[]}},deleteItems=async(e,t)=>{try{let a=new Headers;a.append("Content-Type","application/json"),a.append("X-XSRF-Token",getCSRFToken());let l={method:"DELETE",headers:a,body:JSON.stringify(t),redirect:"follow"},o=await fetch("https://webflow.com/api/v1/collections/"+e+"/items",l);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);return await o.json()}catch(e){return[]}},getSiteName=()=>{let e=window.location.href,t="";return e.includes("https://webflow.com/design/")&&(t=e.split("https://webflow.com/design/")[1].split("/")[0]),t},getSite=async()=>{const e={method:"GET",headers:{"Content-Type":"application/json"}};try{let t=await fetch("https://webflow.com/api/sites/"+getSiteName(),e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(e){}},existPublishButton=()=>null!=document.querySelector('[data-automation-id="publish-menu-button"]'),existLoader=()=>null!=document.querySelector("#publish-targets .loader"),publishHandler=()=>{let e=document.querySelector('[data-automation-id="publish-menu-button"]');null==e||setTimeout((()=>{e.onclick=appendElements;let t=document.querySelector("#publish-targets .loader");null!=t&&(t.classList.remove("f3_spinner"),appendElements())}),4e3)},loaderHandler=()=>{let e=document.querySelector("#publish-targets .loader");null==e||e.classList.add("f3_spinner")},init=async()=>{if(globalThis.site=await getSite(),globalThis.collectionExEvent=null,null==globalThis.site.site.database){let e=await createDatabase();globalThis.site.site.database=e._id}if(globalThis.collections=await getCollections(globalThis.site.site.database),globalThis.collectionExEvent=globalThis.collections.collections.find((e=>"exEvents"==e.name)),null==collectionExEvent&&(globalThis.collectionExEvent=await createCollection()),globalThis.collectionExEvent.totalNumberOfItems>10){let e=(await getAllItems(globalThis.collectionExEvent._id)).items.map((e=>e._id));await deleteItems(globalThis.collectionExEvent._id,{itemIds:e})}const e=setInterval(loaderHandler,500),t=setInterval(publishHandler,1e4),a=setInterval((()=>{null!=document.querySelector('[data-automation-id="publish-menu-button"]')&&(clearInterval(t),clearInterval(a))}),1e4),l=setInterval((()=>{null!=document.querySelector("#publish-targets .loader")&&(clearInterval(e),clearInterval(l))}),500)};init();