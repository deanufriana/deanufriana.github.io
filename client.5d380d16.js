import{i as N,g as p,h as x,j as M,k as O,l as I,m as z,p as P,q as w,s as B,v as q,x as D,y as _,z as W,d as $,A as u}from"./chunks/runtime-core.esm-bundler.4625726e.js";const j="http://www.w3.org/2000/svg",l=typeof document<"u"?document:null,g=l&&l.createElement("template"),F={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const r=t?l.createElementNS(j,e):l.createElement(e,n?{is:n}:void 0);return e==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:e=>l.createTextNode(e),createComment:e=>l.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>l.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,r,s){const c=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{g.innerHTML=i?`<svg>${e}</svg>`:e;const o=g.content;if(i){const f=o.firstChild;for(;f.firstChild;)o.appendChild(f.firstChild);o.removeChild(f)}t.insertBefore(o,n)}return[c?c.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function U(e,t,n){const i=e._vtc;i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function X(e,t,n){const i=e.style,r=p(n);if(n&&!r){for(const s in n)h(i,s,n[s]);if(t&&!p(t))for(const s in t)n[s]==null&&h(i,s,"")}else{const s=i.display;r?t!==n&&(i.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(i.display=s)}}const S=/\s*!important$/;function h(e,t,n){if(P(n))n.forEach(i=>h(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=G(e,t);S.test(n)?e.setProperty(w(i),n.replace(S,""),"important"):e[i]=n}}const b=["Webkit","Moz","ms"],d={};function G(e,t){const n=d[t];if(n)return n;let i=B(t);if(i!=="filter"&&i in e)return d[t]=i;i=q(i);for(let r=0;r<b.length;r++){const s=b[r]+i;if(s in e)return d[t]=s}return t}const A="http://www.w3.org/1999/xlink";function J(e,t,n,i,r){if(i&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(A,t.slice(6,t.length)):e.setAttributeNS(A,t,n);else{const s=D(t);n==null||s&&!_(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n)}}function K(e,t,n,i,r,s,c){if(t==="innerHTML"||t==="textContent"){i&&c(i,r,s),e[t]=n??"";return}if(t==="value"&&e.tagName!=="PROGRESS"&&!e.tagName.includes("-")){e._value=n;const f=n??"";(e.value!==f||e.tagName==="OPTION")&&(e.value=f),n==null&&e.removeAttribute(t);return}let o=!1;if(n===""||n==null){const f=typeof e[t];f==="boolean"?n=_(n):n==null&&f==="string"?(n="",o=!0):f==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(t)}function Q(e,t,n,i){e.addEventListener(t,n,i)}function Y(e,t,n,i){e.removeEventListener(t,n,i)}function Z(e,t,n,i,r=null){const s=e._vei||(e._vei={}),c=s[t];if(i&&c)c.value=i;else{const[o,f]=V(t);if(i){const R=s[t]=tt(i,r);Q(e,o,R,f)}else c&&(Y(e,o,c,f),s[t]=void 0)}}const E=/(?:Once|Passive|Capture)$/;function V(e){let t;if(E.test(e)){t={};let i;for(;i=e.match(E);)e=e.slice(0,e.length-i[0].length),t[i[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):w(e.slice(2)),t]}let m=0;const y=Promise.resolve(),k=()=>m||(y.then(()=>m=0),m=Date.now());function tt(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;W(et(i,n.value),t,5,[i])};return n.value=e,n.attached=k(),n}function et(e,t){if(P(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(i=>r=>!r._stopped&&i&&i(r))}else return t}const C=/^on[a-z]/,nt=(e,t,n,i,r=!1,s,c,o,f)=>{t==="class"?U(e,i,r):t==="style"?X(e,n,i):I(t)?z(t)||Z(e,t,n,i,c):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):it(e,t,i,r))?K(e,t,i,s,c,o,f):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),J(e,t,i,r))};function it(e,t,n,i){return i?!!(t==="innerHTML"||t==="textContent"||t in e&&C.test(t)&&N(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||C.test(t)&&p(n)?!1:t in e}const H=O({patchProp:nt},F);let a,v=!1;function rt(){return a||(a=x(H))}function st(){return a=v?a:M(H),v=!0,a}const ot=(...e)=>{const t=rt().createApp(...e),{mount:n}=t;return t.mount=i=>{const r=L(i);if(!r)return;const s=t._component;!N(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const c=n(r,!1,r instanceof SVGElement);return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),c},t},ct=(...e)=>{const t=st().createApp(...e),{mount:n}=t;return t.mount=i=>{const r=L(i);if(r)return n(r,!0,r instanceof SVGElement)},t};function L(e){return p(e)?document.querySelector(e):e}const T=()=>{},ft=$({props:{value:String,name:String},setup({name:e,value:t}){return t?()=>u("astro-slot",{name:e,innerHTML:t}):()=>null}}),at=e=>async(t,n,i,{client:r})=>{if(delete n.class,!e.hasAttribute("ssr"))return;const s=t.name?`${t.name} Host`:void 0,c={};for(const[o,f]of Object.entries(i))c[o]=()=>u(ft,{value:f,name:o==="default"?void 0:o});if(r==="only"){const o=ot({name:s,render:()=>u(t,n,c)});await T(),o.mount(e,!1)}else{const o=ct({name:s,render:()=>u(t,n,c)});await T(),o.mount(e,!0)}};export{at as default};
