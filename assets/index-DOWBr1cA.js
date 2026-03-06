(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const VD="modulepreload",KD=function(e){return"/"+e},iy={},wo=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=KD(l),l in iy)return;iy[l]=!0;const u=l.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":VD,u||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),u)return new Promise((f,p)=>{d.addEventListener("load",f),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};const ry=new WeakMap,sy=e=>{if((n=>n.pattern!==void 0)(e))return e.pattern;let t=ry.get(e);return t===void 0&&ry.set(e,t=new URLPattern({pathname:e.path})),t};let GD=class{constructor(t,n,i){this.routes=[],this.o=[],this.t={},this.i=r=>{if(r.routes===this)return;const s=r.routes;this.o.push(s),s.h=this,r.stopImmediatePropagation(),r.onDisconnect=()=>{this.o?.splice(this.o.indexOf(s)>>>0,1)};const o=oy(this.t);o!==void 0&&s.goto(o)},(this.l=t).addController(this),this.routes=[...n],this.fallback=i?.fallback}link(t){if(t?.startsWith("/"))return t;if(t?.startsWith("."))throw Error("Not implemented");return t??=this.u,(this.h?.link()??"")+t}async goto(t){let n;if(this.routes.length===0&&this.fallback===void 0)n=t,this.u="",this.t={0:n};else{const i=this.p(t);if(i===void 0)throw Error("No route found for "+t);const r=sy(i).exec({pathname:t}),s=r?.pathname.groups??{};if(n=oy(s),typeof i.enter=="function"&&await i.enter(s)===!1)return;this.v=i,this.t=s,this.u=n===void 0?t:t.substring(0,t.length-n.length)}if(n!==void 0)for(const i of this.o)i.goto(n);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(t){const n=this.routes.find((i=>sy(i).test({pathname:t})));return n||this.fallback===void 0?n:this.fallback?{...this.fallback,path:"/*"}:void 0}hostConnected(){this.l.addEventListener(Mm.eventName,this.i);const t=new Mm(this);this.l.dispatchEvent(t),this._=t.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}};const oy=e=>{let t;for(const n of Object.keys(e))/\d+/.test(n)&&(t===void 0||n>t)&&(t=n);return t&&e[t]};let Mm=class r1 extends Event{constructor(t){super(r1.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}};Mm.eventName="lit-routes-connected";const XD=location.origin||location.protocol+"//"+location.host;let QD=class extends GD{constructor(){super(...arguments),this.m=t=>{const n=t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey;if(t.defaultPrevented||n)return;const i=t.composedPath().find((o=>o.tagName==="A"));if(i===void 0||i.target!==""||i.hasAttribute("download")||i.getAttribute("rel")==="external")return;const r=i.href;if(r===""||r.startsWith("mailto:"))return;const s=window.location;i.origin===XD&&(t.preventDefault(),r!==s.href&&(window.history.pushState({},"",r),this.goto(i.pathname)))},this.R=t=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener("click",this.m),window.addEventListener("popstate",this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener("click",this.m),window.removeEventListener("popstate",this.R)}};const Fh=globalThis,n0=Fh.ShadowRoot&&(Fh.ShadyCSS===void 0||Fh.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i0=Symbol(),ay=new WeakMap;let s1=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==i0)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(n0&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=ay.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ay.set(n,t))}return t}toString(){return this.cssText}};const ZD=e=>new s1(typeof e=="string"?e:e+"",void 0,i0),dt=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new s1(n,e,i0)},JD=(e,t)=>{if(n0)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),r=Fh.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}},cy=n0?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return ZD(n)})(e):e;const{is:t$,defineProperty:e$,getOwnPropertyDescriptor:n$,getOwnPropertyNames:i$,getOwnPropertySymbols:r$,getPrototypeOf:s$}=Object,Sf=globalThis,ly=Sf.trustedTypes,o$=ly?ly.emptyScript:"",a$=Sf.reactiveElementPolyfillSupport,$l=(e,t)=>e,_d={toAttribute(e,t){switch(t){case Boolean:e=e?o$:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},r0=(e,t)=>!t$(e,t),uy={attribute:!0,type:String,converter:_d,reflect:!1,useDefault:!1,hasChanged:r0};Symbol.metadata??=Symbol("metadata"),Sf.litPropertyMetadata??=new WeakMap;let ba=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=uy){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,n);r!==void 0&&e$(this.prototype,t,r)}}static getPropertyDescriptor(t,n,i){const{get:r,set:s}=n$(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:r,set(o){const a=r?.call(this);s?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??uy}static _$Ei(){if(this.hasOwnProperty($l("elementProperties")))return;const t=s$(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($l("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($l("properties"))){const n=this.properties,i=[...i$(n),...r$(n)];for(const r of i)this.createProperty(r,n[r])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,r]of n)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const r=this._$Eu(n,i);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)n.unshift(cy(r))}else t!==void 0&&n.push(cy(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return JD(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:_d).toAttribute(n,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,n){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:_d;this._$Em=r;const a=o.fromAttribute(n,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,n,i,r=!1,s){if(t!==void 0){const o=this.constructor;if(r===!1&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??r0)(s,n)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),s!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};ba.elementStyles=[],ba.shadowRootOptions={mode:"open"},ba[$l("elementProperties")]=new Map,ba[$l("finalized")]=new Map,a$?.({ReactiveElement:ba}),(Sf.reactiveElementVersions??=[]).push("2.1.2");const s0=globalThis,hy=e=>e,wd=s0.trustedTypes,dy=wd?wd.createPolicy("lit-html",{createHTML:e=>e}):void 0,o1="$lit$",ds=`lit$${Math.random().toFixed(9).slice(2)}$`,a1="?"+ds,c$=`<${a1}>`,$o=document,Ql=()=>$o.createComment(""),Zl=e=>e===null||typeof e!="object"&&typeof e!="function",o0=Array.isArray,l$=e=>o0(e)||typeof e?.[Symbol.iterator]=="function",Sp=`[ 	
\f\r]`,Fc=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fy=/-->/g,py=/>/g,Qs=RegExp(`>|${Sp}(?:([^\\s"'>=/]+)(${Sp}*=${Sp}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),my=/'/g,gy=/"/g,c1=/^(?:script|style|textarea|title)$/i,u$=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),E=u$(1),Is=Symbol.for("lit-noChange"),tt=Symbol.for("lit-nothing"),vy=new WeakMap,go=$o.createTreeWalker($o,129);function l1(e,t){if(!o0(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return dy!==void 0?dy.createHTML(t):t}const h$=(e,t)=>{const n=e.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",o=Fc;for(let a=0;a<n;a++){const c=e[a];let l,u,h=-1,d=0;for(;d<c.length&&(o.lastIndex=d,u=o.exec(c),u!==null);)d=o.lastIndex,o===Fc?u[1]==="!--"?o=fy:u[1]!==void 0?o=py:u[2]!==void 0?(c1.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=Qs):u[3]!==void 0&&(o=Qs):o===Qs?u[0]===">"?(o=r??Fc,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?Qs:u[3]==='"'?gy:my):o===gy||o===my?o=Qs:o===fy||o===py?o=Fc:(o=Qs,r=void 0);const f=o===Qs&&e[a+1].startsWith("/>")?" ":"";s+=o===Fc?c+c$:h>=0?(i.push(l),c.slice(0,h)+o1+c.slice(h)+ds+f):c+ds+(h===-2?a:f)}return[l1(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let Dm=class u1{constructor({strings:t,_$litType$:n},i){let r;this.parts=[];let s=0,o=0;const a=t.length-1,c=this.parts,[l,u]=h$(t,n);if(this.el=u1.createElement(l,i),go.currentNode=this.el.content,n===2||n===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=go.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(o1)){const d=u[o++],f=r.getAttribute(h).split(ds),p=/([.?@])?(.*)/.exec(d);c.push({type:1,index:s,name:p[2],strings:f,ctor:p[1]==="."?f$:p[1]==="?"?p$:p[1]==="@"?m$:Ef}),r.removeAttribute(h)}else h.startsWith(ds)&&(c.push({type:6,index:s}),r.removeAttribute(h));if(c1.test(r.tagName)){const h=r.textContent.split(ds),d=h.length-1;if(d>0){r.textContent=wd?wd.emptyScript:"";for(let f=0;f<d;f++)r.append(h[f],Ql()),go.nextNode(),c.push({type:2,index:++s});r.append(h[d],Ql())}}}else if(r.nodeType===8)if(r.data===a1)c.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(ds,h+1))!==-1;)c.push({type:7,index:s}),h+=ds.length-1}s++}}static createElement(t,n){const i=$o.createElement("template");return i.innerHTML=t,i}};function Ya(e,t,n=e,i){if(t===Is)return t;let r=i!==void 0?n._$Co?.[i]:n._$Cl;const s=Zl(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=r:n._$Cl=r),r!==void 0&&(t=Ya(e,r._$AS(e,t.values),r,i)),t}let d$=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,r=(t?.creationScope??$o).importNode(n,!0);go.currentNode=r;let s=go.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new a0(s,s.nextSibling,this,t):c.type===1?l=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(l=new g$(s,this,t)),this._$AV.push(l),c=i[++a]}o!==c?.index&&(s=go.nextNode(),o++)}return go.currentNode=$o,r}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}},a0=class h1{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,r){this.type=2,this._$AH=tt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Ya(this,t,n),Zl(t)?t===tt||t==null||t===""?(this._$AH!==tt&&this._$AR(),this._$AH=tt):t!==this._$AH&&t!==Is&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):l$(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tt&&Zl(this._$AH)?this._$AA.nextSibling.data=t:this.T($o.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Dm.createElement(l1(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(n);else{const s=new d$(r,this),o=s.u(this.options);s.p(n),this.T(o),this._$AH=s}}_$AC(t){let n=vy.get(t.strings);return n===void 0&&vy.set(t.strings,n=new Dm(t)),n}k(t){o0(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,r=0;for(const s of t)r===n.length?n.push(i=new h1(this.O(Ql()),this.O(Ql()),this,this.options)):i=n[r],i._$AI(s),r++;r<n.length&&(this._$AR(i&&i._$AB.nextSibling,r),n.length=r)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=hy(t).nextSibling;hy(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ef=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,r,s){this.type=1,this._$AH=tt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=tt}_$AI(t,n=this,i,r){const s=this.strings;let o=!1;if(s===void 0)t=Ya(this,t,n,0),o=!Zl(t)||t!==this._$AH&&t!==Is,o&&(this._$AH=t);else{const a=t;let c,l;for(t=s[0],c=0;c<s.length-1;c++)l=Ya(this,a[i+c],n,c),l===Is&&(l=this._$AH[c]),o||=!Zl(l)||l!==this._$AH[c],l===tt?t=tt:t!==tt&&(t+=(l??"")+s[c+1]),this._$AH[c]=l}o&&!r&&this.j(t)}j(t){t===tt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},f$=class extends Ef{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tt?void 0:t}},p$=class extends Ef{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tt)}},m$=class extends Ef{constructor(t,n,i,r,s){super(t,n,i,r,s),this.type=5}_$AI(t,n=this){if((t=Ya(this,t,n,0)??tt)===Is)return;const i=this._$AH,r=t===tt&&i!==tt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==tt&&(i===tt||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},g$=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ya(this,t)}};const v$=s0.litHtmlPolyfillSupport;v$?.(Dm,a0),(s0.litHtmlVersions??=[]).push("3.3.2");const y$=(e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const s=n?.renderBefore??null;i._$litPart$=r=new a0(t.insertBefore(Ql(),s),s,void 0,n??{})}return r._$AI(e),r};const c0=globalThis;let gt=class extends ba{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=y$(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Is}};gt._$litElement$=!0,gt.finalized=!0,c0.litElementHydrateSupport?.({LitElement:gt});const b$=c0.litElementPolyfillSupport;b$?.({LitElement:gt});(c0.litElementVersions??=[]).push("4.2.2");const Et=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const _$={attribute:!0,type:String,converter:_d,reflect:!1,hasChanged:r0},w$=(e=_$,t,n)=>{const{kind:i,metadata:r}=n;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,e,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const c=this[o];t.call(this,a),this.requestUpdate(o,c,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function H(e){return(t,n)=>typeof n=="object"?w$(e,t,n):((i,r,s)=>{const o=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),o?Object.getOwnPropertyDescriptor(r,s):void 0})(e,t,n)}function P(e){return H({...e,state:!0,attribute:!1})}const d1={ATTRIBUTE:1,CHILD:2},l0=e=>(...t)=>({_$litDirective$:e,values:t});let f1=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const u0=l0(class extends f1{constructor(e){if(super(e),e.type!==d1.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const n=e.element.classList;for(const i of this.st)i in t||(n.remove(i),this.st.delete(i));for(const i in t){const r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return Is}});class xd extends f1{constructor(t){if(super(t),this.it=tt,t.type!==d1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tt||t==null)return this._t=void 0,this.it=t;if(t===Is)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}xd.directiveName="unsafeHTML",xd.resultType=1;const yy=l0(xd);let $m=class extends xd{};$m.directiveName="unsafeSVG",$m.resultType=2;const ye=l0($m);function Jl(e){"@babel/helpers - typeof";return Jl=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Jl(e)}function x$(e,t){if(Jl(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(Jl(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function C$(e){var t=x$(e,"string");return Jl(t)=="symbol"?t:t+""}function k$(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,C$(i.key),i)}}function Hs(e,t,n){return t&&k$(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function S$(e){return e[e.length-1]}function Cd(e){return Array.isArray(e)?e.slice(0):[e]}function E$(e,t){e=e.slice(0);for(var n=[];e.length;){var i=e.splice(0,t);n.push(i)}return n}function kd(e){return Array.isArray(e)}function M$(e){return e!=null}function Ep(e,t){var n=0,i=-1;for(var r of e){i=i+1;var s=t(r,i);if(s)n=n+1;else break}return n}function To(e,t){var n=t.length;if(n!==0){var i=e.length;e.length=i+t.length;for(var r=0;r<n;++r)e[i+r]=t[r]}}function mB(e){return e.filter(function(t,n,i){return i.indexOf(t)===n})}function Os(e){for(var t="",n=0;n<e.length;n++){var i=e[n];if(i==="-")return parseInt(t,10);t+=i}throw new Error("malformatted revision: "+e)}function jr(e,t){var n=t?Os(t._rev)+1:1;return n+"-"+e}function D$(e){var t=e.split("."),n=t.length;return n===1?i=>i[e]:i=>{for(var r=i,s=0;s<n;++s){var o=t[s];if(r=r[o],typeof r>"u")return r}return r}}function qt(e){return Object.assign({},e)}function $$(e){return Object.keys(e)[0]}function Sd(e,t=!1){if(!e)return e;if(!t&&Array.isArray(e))return e.sort((i,r)=>typeof i=="string"&&typeof r=="string"?i.localeCompare(r):typeof i=="object"?1:-1).map(i=>Sd(i,t));if(typeof e=="object"&&!Array.isArray(e)){var n={};return Object.keys(e).sort((i,r)=>i.localeCompare(r)).forEach(i=>{n[i]=Sd(e[i],t)}),n}return e}function Tm(e){if(!e||e===null||typeof e!="object")return e;if(Array.isArray(e)){for(var t=new Array(e.length),n=t.length;n--;)t[n]=Tm(e[n]);return t}var i={};for(var r in e)i[r]=Tm(e[r]);return i}var Fn=Tm;function Or(e,t,n){return Object.defineProperty(e,t,{get:function(){return n}}),n}var h0=1;function yc(){return{lwt:h0}}function Ii(){return""}function T$(e){return Object.assign({},e,{_meta:void 0,_deleted:void 0,_rev:void 0})}function I$(e,t,n){if(t.length!==n.length)return!1;for(var i=0,r=t.length;i<r;){var s=t[i],o=n[i];if(i++,s[e]!==o[e]||s._rev!==o._rev||s._meta.lwt!==o._meta.lwt)return!1}return!0}function tu(e,t){return tu=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,i){return n.__proto__=i,n},tu(e,t)}function d0(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,tu(e,t)}function Im(e){return Im=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Im(e)}function O$(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}function p1(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(p1=function(){return!!e})()}function P$(e,t,n){if(p1())return Reflect.construct.apply(null,arguments);var i=[null];i.push.apply(i,t);var r=new(e.bind.apply(e,i));return n&&tu(r,n.prototype),r}function Ed(e){var t=typeof Map=="function"?new Map:void 0;return Ed=function(i){if(i===null||!O$(i))return i;if(typeof i!="function")throw new TypeError("Super expression must either be null or a function");if(t!==void 0){if(t.has(i))return t.get(i);t.set(i,r)}function r(){return P$(i,arguments,Im(this).constructor)}return r.prototype=Object.create(i.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),tu(r,i)},Ed(e)}var At={isDevMode(){return!1},deepFreezeWhenDevMode(e){return e},tunnelErrorMessage(e){return`
        RxDB Error-Code: `+e+`.
        Hint: Error messages are not included in RxDB core to reduce build size.
        To show the full error messages and to ensure that you do not make any mistakes when using RxDB,
        use the dev-mode plugin when you are in development mode: https://rxdb.info/dev-mode.html?console=error
        `}};function R$(e){var t="";return Object.keys(e).length===0||(t+="-".repeat(20)+`
`,t+=`Parameters:
`,t+=Object.keys(e).map(n=>{var i="[object Object]";try{n==="errors"?i=e[n].map(r=>JSON.stringify(r,Object.getOwnPropertyNames(r))):i=JSON.stringify(e[n],function(r,s){return s===void 0?null:s},2)}catch{}return n+": "+i}).join(`
`),t+=`
`),t}function m1(e,t,n){return`
`+e+`
`+R$(n)}var A$=(function(e){function t(i,r,s={}){var o,a=m1(r,i,s);return o=e.call(this,a)||this,o.code=i,o.message=a,o.url=f0(i),o.parameters=s,o.rxdb=!0,o}d0(t,e);var n=t.prototype;return n.toString=function(){return this.message},Hs(t,[{key:"name",get:function(){return"RxError ("+this.code+")"}},{key:"typeError",get:function(){return!1}}])})(Ed(Error)),L$=(function(e){function t(i,r,s={}){var o,a=m1(r,i,s);return o=e.call(this,a)||this,o.code=i,o.message=a,o.url=f0(i),o.parameters=s,o.rxdb=!0,o}d0(t,e);var n=t.prototype;return n.toString=function(){return this.message},Hs(t,[{key:"name",get:function(){return"RxTypeError ("+this.code+")"}},{key:"typeError",get:function(){return!0}}])})(Ed(TypeError));function f0(e){return"https://rxdb.info/errors.html?console=errors#"+e}function g1(e){return`
Find out more about this error here: `+f0(e)+` 
`}function U(e,t){return new A$(e,At.tunnelErrorMessage(e)+g1(e),t)}function Md(e,t){return new L$(e,At.tunnelErrorMessage(e)+g1(e),t)}function qa(e){return e&&e.status===409?e:!1}var N$={409:"document write conflict",422:"schema validation error",510:"attachment data missing"};function v1(e){return U("COL20",{name:N$[e.status],document:e.documentId,writeError:e})}var ph;function F$(){if(ph)return ph;if(typeof crypto>"u"||typeof crypto.subtle>"u"||typeof crypto.subtle.digest!="function")throw U("UT8",{args:{typeof_crypto:typeof crypto,typeof_crypto_subtle:typeof crypto?.subtle,typeof_crypto_subtle_digest:typeof crypto?.subtle?.digest}});return ph=crypto.subtle.digest.bind(crypto.subtle),ph}async function z$(e){var t=new TextEncoder().encode(e),n=await F$()("SHA-256",t),i=Array.prototype.map.call(new Uint8Array(n),r=>("00"+r.toString(16)).slice(-2)).join("");return i}var y1=z$;function j$(){return new Promise(e=>setTimeout(e,0))}function B$(e=0){return new Promise(t=>setTimeout(t,e))}function b1(e){return e&&typeof e.then=="function"?e:Promise.resolve(e)}var p0=Promise.resolve(!0),er=Promise.resolve(!1),m0=Promise.resolve(null),di=Promise.resolve();function Mf(e=1e4){return typeof requestIdleCallback=="function"?new Promise(t=>{requestIdleCallback(()=>t(),{timeout:e})}):B$(0)}var Mp=di;function W$(e=void 0){return Mp=Mp.then(()=>Mf(e)),Mp}function H$(e,t){return e.reduce((n,i)=>n.then(i),Promise.resolve(t))}var U$=/\./g,by="abcdefghijklmnopqrstuvwxyz";function Qo(e=10){for(var t="",n=0;n<e;n++)t+=by.charAt(Math.floor(Math.random()*by.length));return t}function _1(e){e+="";var t=e.charAt(0).toUpperCase();return t+e.substr(1)}function el(e){for(;e.charAt(0)===".";)e=e.substr(1);for(;e.slice(-1)===".";)e=e.slice(0,-1);return e}function eu(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,i;if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(i=n;i--!==0;)if(!eu(e[i],t[i]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();var r=Object.keys(e);if(n=r.length,n!==Object.keys(t).length)return!1;for(i=n;i--!==0;)if(!Object.prototype.hasOwnProperty.call(t,r[i]))return!1;for(i=n;i--!==0;){var s=r[i];if(!eu(e[s],t[s]))return!1}return!0}return e!==e&&t!==t}var Om=e=>{var t=typeof e;return e!==null&&(t==="object"||t==="function")},Dp=new Set(["__proto__","prototype","constructor"]),Y$=new Set("0123456789");function w1(e){var t=[],n="",i="start",r=!1;for(var s of e)switch(s){case"\\":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");r&&(n+=s),i="property",r=!r;break}case".":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="property";break}if(r){r=!1,n+=s;break}if(Dp.has(n))return[];t.push(n),n="",i="property";break}case"[":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="index";break}if(r){r=!1,n+=s;break}if(i==="property"){if(Dp.has(n))return[];t.push(n),n=""}i="index";break}case"]":{if(i==="index"){t.push(Number.parseInt(n,10)),n="",i="indexEnd";break}if(i==="indexEnd")throw new Error("Invalid character after an index")}default:{if(i==="index"&&!Y$.has(s))throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");i==="start"&&(i="property"),r&&(r=!1,n+="\\"),n+=s}}switch(r&&(n+="\\"),i){case"property":{if(Dp.has(n))return[];t.push(n);break}case"index":throw new Error("Index was not closed");case"start":{t.push("");break}}return t}function x1(e,t){if(typeof t!="number"&&Array.isArray(e)){var n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}function q$(e,t){if(x1(e,t))throw new Error("Cannot use string index")}function Va(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!t.includes(".")&&!t.includes("["))return e[t];if(!Om(e)||typeof t!="string")return n===void 0?e:n;var i=w1(t);if(i.length===0)return n;for(var r=0;r<i.length;r++){var s=i[r];if(x1(e,s)?e=r===i.length-1?void 0:null:e=e[s],e==null){if(r!==i.length-1)return n;break}}return e===void 0?n:e}function gB(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!Om(e)||typeof t!="string")return e;for(var i=e,r=w1(t),s=0;s<r.length;s++){var o=r[s];q$(e,o),s===r.length-1?e[o]=n:Om(e[o])||(e[o]=typeof r[s+1]=="number"?[]:{}),e=e[o]}return i}function Ka(e,t){var n=e.get(t);if(typeof n>"u")throw new Error("missing value from map "+t);return n}function yi(e,t,n,i){var r=e.get(t);return typeof r>"u"&&(r=n(),e.set(t,r)),r}function Rt(e){var t=e.split("-"),n="RxDB";return t.forEach(i=>{n+=_1(i)}),n+="Plugin",new Error(`You are using a function which must be overwritten by a plugin.
        You should either prevent the usage of this function or add the plugin via:
            import { `+n+" } from 'rxdb/plugins/"+e+`';
            addRxPlugin(`+n+`);
        `)}function Dd(e){var t={name:e.name,message:e.message,rxdb:e.rxdb,parameters:e.parameters,extensions:e.extensions,code:e.code,url:e.url,stack:e.stack?e.stack.replace(/\n/g,` 
 `):void 0};return t}var $p=0;function Ri(){var e=Date.now();e=e+.01,e<=$p&&(e=$p+.01);var t=parseFloat(e.toFixed(2));return $p=t,t}function Q(e,t){if(!e)throw t||(t=""),new Error("ensureNotFalsy() is falsy: "+t);return e}var Au={bufferSize:1,refCount:!0},V$="16.21.1",Tp={},K$="6da4936d1425ff3a5c44c02342c6daf791d266be3ae8479b8ec59e261df41b93",_y=16,Ip=er,wy=!1;async function G$(){return wy||(wy=!0,Ip=(async()=>!!(Tp.premium&&typeof Tp.premium=="string"&&await y1(Tp.premium)===K$))()),Ip}var nu={preAddRxPlugin:[],preCreateRxDatabase:[],createRxDatabase:[],preCreateRxCollection:[],createRxCollection:[],createRxState:[],postCloseRxCollection:[],postRemoveRxCollection:[],preCreateRxSchema:[],createRxSchema:[],prePrepareRxQuery:[],preCreateRxQuery:[],prePrepareQuery:[],createRxDocument:[],postCreateRxDocument:[],preCreateRxStorageInstance:[],preStorageWrite:[],preMigrateDocument:[],postMigrateDocument:[],preCloseRxDatabase:[],postRemoveRxDatabase:[],postCleanup:[],preReplicationMasterWrite:[],preReplicationMasterWriteDocumentsHandle:[]};function zn(e,t){nu[e].length>0&&nu[e].forEach(n=>n(t))}async function Io(e,t){for(var n of nu[e])await n(t)}function iu(e,t){var n=t;n=n.replace(U$,".properties."),n="properties."+n,n=el(n);var i=Va(e,n);return i}function X$(e,t,n){if(typeof t.primaryKey=="string")return n;var i=Us(t,n),r=n[e];if(r&&r!==i)throw U("DOC19",{args:{documentData:n,existingPrimary:r,newPrimary:i},schema:t});return n[e]=i,n}function Ai(e){return typeof e=="string"?e:e.key}function Q$(e){var t=Ai(e.primaryKey),n=iu(e,t);return Q(n.maxLength)}function Us(e,t){if(typeof e.primaryKey=="string")return t[e.primaryKey];var n=e.primaryKey;return n.fields.map(i=>{var r=Va(t,i);if(typeof r>"u")throw U("DOC18",{args:{field:i,documentData:t}});return r}).join(n.separator)}function Z$(e){var t=Sd(e,!0);return t}function J$(e){return["_deleted",e]}function Df(e){e=qt(e);var t=Ai(e.primaryKey);e.properties=qt(e.properties),e.additionalProperties=!1,Object.prototype.hasOwnProperty.call(e,"keyCompression")||(e.keyCompression=!1),e.indexes=e.indexes?e.indexes.slice(0):[],e.required=e.required?e.required.slice(0):[],e.encrypted=e.encrypted?e.encrypted.slice(0):[],e.properties._rev={type:"string",minLength:1},e.properties._attachments={type:"object"},e.properties._deleted={type:"boolean"},e.properties._meta=eT,e.required=e.required?e.required.slice(0):[],e.required.push("_deleted"),e.required.push("_rev"),e.required.push("_meta"),e.required.push("_attachments");var n=C1(e);To(e.required,n),e.required=e.required.filter(s=>!s.includes(".")).filter((s,o,a)=>a.indexOf(s)===o),e.version=e.version||0;var i=e.indexes.map(s=>{var o=kd(s)?s.slice(0):[s];return o.includes(t)||o.push(t),o[0]!=="_deleted"&&o.unshift("_deleted"),o});i.length===0&&i.push(J$(t)),i.push(["_meta.lwt",t]),e.internalIndexes&&e.internalIndexes.map(s=>{i.push(s)});var r=new Set;return i.filter(s=>{var o=s.join(",");return r.has(o)?!1:(r.add(o),!0)}),e.indexes=i,e}var tT=1e15,eT={type:"object",properties:{lwt:{type:"number",minimum:h0,maximum:tT,multipleOf:.01}},additionalProperties:!0,required:["lwt"]};function C1(e){var t=Object.keys(e.properties).filter(i=>e.properties[i].final),n=Ai(e.primaryKey);return t.push(n),typeof e.primaryKey!="string"&&e.primaryKey.fields.forEach(i=>t.push(i)),t}function nT(e,t){for(var n=Object.keys(e.defaultValues),i=0;i<n.length;++i){var r=n[i];(!Object.prototype.hasOwnProperty.call(t,r)||typeof t[r]>"u")&&(t[r]=e.defaultValues[r])}return t}var k1=(function(){function e(n,i){if(this.jsonSchema=n,this.hashFunction=i,this.indexes=iT(this.jsonSchema),this.primaryPath=Ai(this.jsonSchema.primaryKey),!n.properties[this.primaryPath].maxLength)throw U("SC39",{schema:n});this.finalFields=C1(this.jsonSchema)}var t=e.prototype;return t.validateChange=function(i,r){this.finalFields.forEach(s=>{if(!eu(i[s],r[s]))throw U("DOC9",{dataBefore:i,dataAfter:r,fieldName:s,schema:this.jsonSchema})})},t.getDocumentPrototype=function(){var i={},r=iu(this.jsonSchema,"");return Object.keys(r).forEach(s=>{var o=s;i.__defineGetter__(s,function(){if(!(!this.get||typeof this.get!="function")){var a=this.get(o);return a}}),Object.defineProperty(i,s+"$",{get:function(){return this.get$(o)},enumerable:!1,configurable:!1}),Object.defineProperty(i,s+"$$",{get:function(){return this.get$$(o)},enumerable:!1,configurable:!1}),Object.defineProperty(i,s+"_",{get:function(){return this.populate(o)},enumerable:!1,configurable:!1})}),Or(this,"getDocumentPrototype",()=>i),i},t.getPrimaryOfDocumentData=function(i){return Us(this.jsonSchema,i)},Hs(e,[{key:"version",get:function(){return this.jsonSchema.version}},{key:"defaultValues",get:function(){var n={};return Object.entries(this.jsonSchema.properties).filter(([,i])=>Object.prototype.hasOwnProperty.call(i,"default")).forEach(([i,r])=>n[i]=r.default),Or(this,"defaultValues",n)}},{key:"hash",get:function(){return Or(this,"hash",this.hashFunction(JSON.stringify(this.jsonSchema)))}}])})();function iT(e){return(e.indexes||[]).map(t=>kd(t)?t:[t])}function rT(e){var t=e.version?e.version:0,n=0;return new Array(t).fill(0).map(()=>n++)}function sT(e,t,n=!0){n&&zn("preCreateRxSchema",e);var i=Df(e);i=Z$(i),At.deepFreezeWhenDevMode(i);var r=new k1(i,t);return zn("createRxSchema",r),r}function be(e){return typeof e=="function"}function oT(e){return be(e?.lift)}function dr(e){return function(t){if(oT(t))return t.lift(function(n){try{return e(n,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}var Pm=function(e,t){return Pm=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])},Pm(e,t)};function Zo(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");Pm(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function aT(e,t,n,i){function r(s){return s instanceof n?s:new n(function(o){o(s)})}return new(n||(n=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(h){o(h)}}function c(u){try{l(i.throw(u))}catch(h){o(h)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(e,t||[])).next())})}function S1(e,t){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},i,r,s,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=a(0),o.throw=a(1),o.return=a(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(l){return function(u){return c([l,u])}}function c(l){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(n=0)),n;)try{if(i=1,r&&(s=l[0]&2?r.return:l[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,l[1])).done)return s;switch(r=0,s&&(l=[l[0]&2,s.value]),l[0]){case 0:case 1:s=l;break;case 4:return n.label++,{value:l[1],done:!1};case 5:n.label++,r=l[1],l=[0];continue;case 7:l=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(l[0]===6||l[0]===2)){n=0;continue}if(l[0]===3&&(!s||l[1]>s[0]&&l[1]<s[3])){n.label=l[1];break}if(l[0]===6&&n.label<s[1]){n.label=s[1],s=l;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(l);break}s[2]&&n.ops.pop(),n.trys.pop();continue}l=t.call(e,n)}catch(u){l=[6,u],r=0}finally{i=s=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function Ga(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],i=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Oo(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),r,s=[],o;try{for(;(t===void 0||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}function Po(e,t,n){if(n||arguments.length===2)for(var i=0,r=t.length,s;i<r;i++)(s||!(i in t))&&(s||(s=Array.prototype.slice.call(t,0,i)),s[i]=t[i]);return e.concat(s||Array.prototype.slice.call(t))}function Aa(e){return this instanceof Aa?(this.v=e,this):new Aa(e)}function cT(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(e,t||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(f){return function(p){return Promise.resolve(p).then(f,h)}}function a(f,p){i[f]&&(r[f]=function(m){return new Promise(function(g,b){s.push([f,m,g,b])>1||c(f,m)})},p&&(r[f]=p(r[f])))}function c(f,p){try{l(i[f](p))}catch(m){d(s[0][3],m)}}function l(f){f.value instanceof Aa?Promise.resolve(f.value.v).then(u,h):d(s[0][2],f)}function u(f){c("next",f)}function h(f){c("throw",f)}function d(f,p){f(p),s.shift(),s.length&&c(s[0][0],s[0][1])}}function lT(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof Ga=="function"?Ga(e):e[Symbol.iterator](),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(s){n[s]=e[s]&&function(o){return new Promise(function(a,c){o=e[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var E1=(function(e){return e&&typeof e.length=="number"&&typeof e!="function"});function M1(e){return be(e?.then)}function g0(e){var t=function(i){Error.call(i),i.stack=new Error().stack},n=e(t);return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Op=g0(function(e){return function(n){e(this),this.message=n?n.length+` errors occurred during unsubscription:
`+n.map(function(i,r){return r+1+") "+i.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=n}});function Rm(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var $f=(function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var t,n,i,r,s;if(!this.closed){this.closed=!0;var o=this._parentage;if(o)if(this._parentage=null,Array.isArray(o))try{for(var a=Ga(o),c=a.next();!c.done;c=a.next()){var l=c.value;l.remove(this)}}catch(m){t={error:m}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(t)throw t.error}}else o.remove(this);var u=this.initialTeardown;if(be(u))try{u()}catch(m){s=m instanceof Op?m.errors:[m]}var h=this._finalizers;if(h){this._finalizers=null;try{for(var d=Ga(h),f=d.next();!f.done;f=d.next()){var p=f.value;try{xy(p)}catch(m){s=s??[],m instanceof Op?s=Po(Po([],Oo(s)),Oo(m.errors)):s.push(m)}}}catch(m){i={error:m}}finally{try{f&&!f.done&&(r=d.return)&&r.call(d)}finally{if(i)throw i.error}}}if(s)throw new Op(s)}},e.prototype.add=function(t){var n;if(t&&t!==this)if(this.closed)xy(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}},e.prototype._hasParent=function(t){var n=this._parentage;return n===t||Array.isArray(n)&&n.includes(t)},e.prototype._addParent=function(t){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t},e.prototype._removeParent=function(t){var n=this._parentage;n===t?this._parentage=null:Array.isArray(n)&&Rm(n,t)},e.prototype.remove=function(t){var n=this._finalizers;n&&Rm(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e})(),D1=$f.EMPTY;function $1(e){return e instanceof $f||e&&"closed"in e&&be(e.remove)&&be(e.add)&&be(e.unsubscribe)}function xy(e){be(e)?e():e.unsubscribe()}var uT={Promise:void 0},hT={setTimeout:function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];return setTimeout.apply(void 0,Po([e,t],Oo(n)))},clearTimeout:function(e){return clearTimeout(e)},delegate:void 0};function T1(e){hT.setTimeout(function(){throw e})}function Cy(){}function zh(e){e()}var v0=(function(e){Zo(t,e);function t(n){var i=e.call(this)||this;return i.isStopped=!1,n?(i.destination=n,$1(n)&&n.add(i)):i.destination=pT,i}return t.create=function(n,i,r){return new Xa(n,i,r)},t.prototype.next=function(n){this.isStopped||this._next(n)},t.prototype.error=function(n){this.isStopped||(this.isStopped=!0,this._error(n))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(n){this.destination.next(n)},t.prototype._error=function(n){try{this.destination.error(n)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t})($f),dT=(function(){function e(t){this.partialObserver=t}return e.prototype.next=function(t){var n=this.partialObserver;if(n.next)try{n.next(t)}catch(i){mh(i)}},e.prototype.error=function(t){var n=this.partialObserver;if(n.error)try{n.error(t)}catch(i){mh(i)}else mh(t)},e.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(n){mh(n)}},e})(),Xa=(function(e){Zo(t,e);function t(n,i,r){var s=e.call(this)||this,o;return be(n)||!n?o={next:n??void 0,error:i??void 0,complete:r??void 0}:o=n,s.destination=new dT(o),s}return t})(v0);function mh(e){T1(e)}function fT(e){throw e}var pT={closed:!0,next:Cy,error:fT,complete:Cy},y0=(function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"})();function Lu(e){return e}function mT(e){return e.length===0?Lu:e.length===1?e[0]:function(n){return e.reduce(function(i,r){return r(i)},n)}}var ti=(function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(t,n,i){var r=this,s=vT(t)?t:new Xa(t,n,i);return zh(function(){var o=r,a=o.operator,c=o.source;s.add(a?a.call(s,c):c?r._subscribe(s):r._trySubscribe(s))}),s},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(n){t.error(n)}},e.prototype.forEach=function(t,n){var i=this;return n=ky(n),new n(function(r,s){var o=new Xa({next:function(a){try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});i.subscribe(o)})},e.prototype._subscribe=function(t){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(t)},e.prototype[y0]=function(){return this},e.prototype.pipe=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return mT(t)(this)},e.prototype.toPromise=function(t){var n=this;return t=ky(t),new t(function(i,r){var s;n.subscribe(function(o){return s=o},function(o){return r(o)},function(){return i(s)})})},e.create=function(t){return new e(t)},e})();function ky(e){var t;return(t=e??uT.Promise)!==null&&t!==void 0?t:Promise}function gT(e){return e&&be(e.next)&&be(e.error)&&be(e.complete)}function vT(e){return e&&e instanceof v0||gT(e)&&$1(e)}function I1(e){return be(e[y0])}function O1(e){return Symbol.asyncIterator&&be(e?.[Symbol.asyncIterator])}function P1(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function yT(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var R1=yT();function A1(e){return be(e?.[R1])}function L1(e){return cT(this,arguments,function(){var n,i,r,s;return S1(this,function(o){switch(o.label){case 0:n=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,Aa(n.read())];case 3:return i=o.sent(),r=i.value,s=i.done,s?[4,Aa(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return[4,Aa(r)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return n.releaseLock(),[7];case 10:return[2]}})})}function N1(e){return be(e?.getReader)}function Xr(e){if(e instanceof ti)return e;if(e!=null){if(I1(e))return bT(e);if(E1(e))return _T(e);if(M1(e))return wT(e);if(O1(e))return F1(e);if(A1(e))return xT(e);if(N1(e))return CT(e)}throw P1(e)}function bT(e){return new ti(function(t){var n=e[y0]();if(be(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function _T(e){return new ti(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function wT(e){return new ti(function(t){e.then(function(n){t.closed||(t.next(n),t.complete())},function(n){return t.error(n)}).then(null,T1)})}function xT(e){return new ti(function(t){var n,i;try{for(var r=Ga(e),s=r.next();!s.done;s=r.next()){var o=s.value;if(t.next(o),t.closed)return}}catch(a){n={error:a}}finally{try{s&&!s.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}t.complete()})}function F1(e){return new ti(function(t){kT(e,t).catch(function(n){return t.error(n)})})}function CT(e){return F1(L1(e))}function kT(e,t){var n,i,r,s;return aT(this,void 0,void 0,function(){var o,a;return S1(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),n=lT(e),c.label=1;case 1:return[4,n.next()];case 2:if(i=c.sent(),!!i.done)return[3,4];if(o=i.value,t.next(o),t.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=c.sent(),r={error:a},[3,11];case 6:return c.trys.push([6,,9,10]),i&&!i.done&&(s=n.return)?[4,s.call(n)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(r)throw r.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function Br(e,t,n,i,r){return new ST(e,t,n,i,r)}var ST=(function(e){Zo(t,e);function t(n,i,r,s,o,a){var c=e.call(this,n)||this;return c.onFinalize=o,c.shouldUnsubscribe=a,c._next=i?function(l){try{i(l)}catch(u){n.error(u)}}:e.prototype._next,c._error=s?function(l){try{s(l)}catch(u){n.error(u)}finally{this.unsubscribe()}}:e.prototype._error,c._complete=r?function(){try{r()}catch(l){n.error(l)}finally{this.unsubscribe()}}:e.prototype._complete,c}return t.prototype.unsubscribe=function(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var i=this.closed;e.prototype.unsubscribe.call(this),!i&&((n=this.onFinalize)===null||n===void 0||n.call(this))}},t})(v0),z1={now:function(){return(z1.delegate||Date).now()},delegate:void 0};function ET(e){return e&&be(e.schedule)}function b0(e){return e[e.length-1]}function MT(e){return be(b0(e))?e.pop():void 0}function bc(e){return ET(b0(e))?e.pop():void 0}function j1(e,t){return typeof b0(e)=="number"?e.pop():t}function Es(e,t,n,i,r){i===void 0&&(i=0),r===void 0&&(r=!1);var s=t.schedule(function(){n(),r?e.add(this.schedule(null,i)):this.unsubscribe()},i);if(e.add(s),!r)return s}var DT=Array.isArray,$T=Object.getPrototypeOf,TT=Object.prototype,IT=Object.keys;function OT(e){if(e.length===1){var t=e[0];if(DT(t))return{args:t,keys:null};if(PT(t)){var n=IT(t);return{args:n.map(function(i){return t[i]}),keys:n}}}return{args:e,keys:null}}function PT(e){return e&&typeof e=="object"&&$T(e)===TT}function B1(e,t){return t===void 0&&(t=0),dr(function(n,i){n.subscribe(Br(i,function(r){return Es(i,e,function(){return i.next(r)},t)},function(){return Es(i,e,function(){return i.complete()},t)},function(r){return Es(i,e,function(){return i.error(r)},t)}))})}function W1(e,t){return t===void 0&&(t=0),dr(function(n,i){i.add(e.schedule(function(){return n.subscribe(i)},t))})}function RT(e,t){return Xr(e).pipe(W1(t),B1(t))}function AT(e,t){return Xr(e).pipe(W1(t),B1(t))}function LT(e,t){return new ti(function(n){var i=0;return t.schedule(function(){i===e.length?n.complete():(n.next(e[i++]),n.closed||this.schedule())})})}function NT(e,t){return new ti(function(n){var i;return Es(n,t,function(){i=e[R1](),Es(n,t,function(){var r,s,o;try{r=i.next(),s=r.value,o=r.done}catch(a){n.error(a);return}o?n.complete():n.next(s)},0,!0)}),function(){return be(i?.return)&&i.return()}})}function H1(e,t){if(!e)throw new Error("Iterable cannot be null");return new ti(function(n){Es(n,t,function(){var i=e[Symbol.asyncIterator]();Es(n,t,function(){i.next().then(function(r){r.done?n.complete():n.next(r.value)})},0,!0)})})}function FT(e,t){return H1(L1(e),t)}function zT(e,t){if(e!=null){if(I1(e))return RT(e,t);if(E1(e))return LT(e,t);if(M1(e))return AT(e,t);if(O1(e))return H1(e,t);if(A1(e))return NT(e,t);if(N1(e))return FT(e,t)}throw P1(e)}function _c(e,t){return t?zT(e,t):Xr(e)}function Ht(e,t){return dr(function(n,i){var r=0;n.subscribe(Br(i,function(s){i.next(e.call(t,s,r++))}))})}var jT=Array.isArray;function BT(e,t){return jT(t)?e.apply(void 0,Po([],Oo(t))):e(t)}function WT(e){return Ht(function(t){return BT(e,t)})}function HT(e,t){return e.reduce(function(n,i,r){return n[i]=t[r],n},{})}function _0(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=bc(e),i=MT(e),r=OT(e),s=r.args,o=r.keys;if(s.length===0)return _c([],n);var a=new ti(UT(s,n,o?function(c){return HT(o,c)}:Lu));return i?a.pipe(WT(i)):a}function UT(e,t,n){return n===void 0&&(n=Lu),function(i){Sy(t,function(){for(var r=e.length,s=new Array(r),o=r,a=r,c=function(u){Sy(t,function(){var h=_c(e[u],t),d=!1;h.subscribe(Br(i,function(f){s[u]=f,d||(d=!0,a--),a||i.next(n(s.slice()))},function(){--o||i.complete()}))},i)},l=0;l<r;l++)c(l)},i)}}function Sy(e,t,n){e?Es(n,e,t):t()}function YT(e,t,n,i,r,s,o,a){var c=[],l=0,u=0,h=!1,d=function(){h&&!c.length&&!l&&t.complete()},f=function(m){return l<i?p(m):c.push(m)},p=function(m){l++;var g=!1;Xr(n(m,u++)).subscribe(Br(t,function(b){t.next(b)},function(){g=!0},void 0,function(){if(g)try{l--;for(var b=function(){var _=c.shift();o||p(_)};c.length&&l<i;)b();d()}catch(_){t.error(_)}}))};return e.subscribe(Br(t,f,function(){h=!0,d()})),function(){}}function nr(e,t,n){return n===void 0&&(n=1/0),be(t)?nr(function(i,r){return Ht(function(s,o){return t(i,s,r,o)})(Xr(e(i,r)))},n):(typeof t=="number"&&(n=t),dr(function(i,r){return YT(i,r,e,n)}))}function w0(e){return e===void 0&&(e=1/0),nr(Lu,e)}function qT(){return w0(1)}var VT=g0(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Fe=(function(e){Zo(t,e);function t(){var n=e.call(this)||this;return n.closed=!1,n.currentObservers=null,n.observers=[],n.isStopped=!1,n.hasError=!1,n.thrownError=null,n}return t.prototype.lift=function(n){var i=new Ey(this,this);return i.operator=n,i},t.prototype._throwIfClosed=function(){if(this.closed)throw new VT},t.prototype.next=function(n){var i=this;zh(function(){var r,s;if(i._throwIfClosed(),!i.isStopped){i.currentObservers||(i.currentObservers=Array.from(i.observers));try{for(var o=Ga(i.currentObservers),a=o.next();!a.done;a=o.next()){var c=a.value;c.next(n)}}catch(l){r={error:l}}finally{try{a&&!a.done&&(s=o.return)&&s.call(o)}finally{if(r)throw r.error}}}})},t.prototype.error=function(n){var i=this;zh(function(){if(i._throwIfClosed(),!i.isStopped){i.hasError=i.isStopped=!0,i.thrownError=n;for(var r=i.observers;r.length;)r.shift().error(n)}})},t.prototype.complete=function(){var n=this;zh(function(){if(n._throwIfClosed(),!n.isStopped){n.isStopped=!0;for(var i=n.observers;i.length;)i.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(n){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,n)},t.prototype._subscribe=function(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)},t.prototype._innerSubscribe=function(n){var i=this,r=this,s=r.hasError,o=r.isStopped,a=r.observers;return s||o?D1:(this.currentObservers=null,a.push(n),new $f(function(){i.currentObservers=null,Rm(a,n)}))},t.prototype._checkFinalizedStatuses=function(n){var i=this,r=i.hasError,s=i.thrownError,o=i.isStopped;r?n.error(s):o&&n.complete()},t.prototype.asObservable=function(){var n=new ti;return n.source=this,n},t.create=function(n,i){return new Ey(n,i)},t})(ti),Ey=(function(e){Zo(t,e);function t(n,i){var r=e.call(this)||this;return r.destination=n,r.source=i,r}return t.prototype.next=function(n){var i,r;(r=(i=this.destination)===null||i===void 0?void 0:i.next)===null||r===void 0||r.call(i,n)},t.prototype.error=function(n){var i,r;(r=(i=this.destination)===null||i===void 0?void 0:i.error)===null||r===void 0||r.call(i,n)},t.prototype.complete=function(){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||i===void 0||i.call(n)},t.prototype._subscribe=function(n){var i,r;return(r=(i=this.source)===null||i===void 0?void 0:i.subscribe(n))!==null&&r!==void 0?r:D1},t})(Fe);function My(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return qT()(_c(e,bc(e)))}var KT=new ti(function(e){return e.complete()});function Dy(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=bc(e);return _c(e,n)}function ru(e,t){return t===void 0&&(t=Lu),e=e??GT,dr(function(n,i){var r,s=!0;n.subscribe(Br(i,function(o){var a=t(o);(s||!e(r,a))&&(s=!1,r=a,i.next(o))}))})}function GT(e,t){return e===t}function It(e,t){return dr(function(n,i){var r=0;n.subscribe(Br(i,function(s){return e.call(t,s,r++)&&i.next(s)}))})}var XT=g0(function(e){return function(){e(this),this.name="EmptyError",this.message="no elements in sequence"}});function QT(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=bc(e),i=j1(e,1/0);return dr(function(r,s){w0(i)(_c(Po([r],Oo(e)),n)).subscribe(s)})}function ZT(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return QT.apply(void 0,Po([],Oo(e)))}var ui=(function(e){Zo(t,e);function t(n){var i=e.call(this)||this;return i._value=n,i}return Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),t.prototype._subscribe=function(n){var i=e.prototype._subscribe.call(this,n);return!i.closed&&n.next(this._value),i},t.prototype.getValue=function(){var n=this,i=n.hasError,r=n.thrownError,s=n._value;if(i)throw r;return this._throwIfClosed(),s},t.prototype.next=function(n){e.prototype.next.call(this,this._value=n)},t})(Fe),JT=(function(e){Zo(t,e);function t(n,i,r){n===void 0&&(n=1/0),i===void 0&&(i=1/0),r===void 0&&(r=z1);var s=e.call(this)||this;return s._bufferSize=n,s._windowTime=i,s._timestampProvider=r,s._buffer=[],s._infiniteTimeWindow=!0,s._infiniteTimeWindow=i===1/0,s._bufferSize=Math.max(1,n),s._windowTime=Math.max(1,i),s}return t.prototype.next=function(n){var i=this,r=i.isStopped,s=i._buffer,o=i._infiniteTimeWindow,a=i._timestampProvider,c=i._windowTime;r||(s.push(n),!o&&s.push(a.now()+c)),this._trimBuffer(),e.prototype.next.call(this,n)},t.prototype._subscribe=function(n){this._throwIfClosed(),this._trimBuffer();for(var i=this._innerSubscribe(n),r=this,s=r._infiniteTimeWindow,o=r._buffer,a=o.slice(),c=0;c<a.length&&!n.closed;c+=s?1:2)n.next(a[c]);return this._checkFinalizedStatuses(n),i},t.prototype._trimBuffer=function(){var n=this,i=n._bufferSize,r=n._timestampProvider,s=n._buffer,o=n._infiniteTimeWindow,a=(o?1:2)*i;if(i<1/0&&a<s.length&&s.splice(0,s.length-a),!o){for(var c=r.now(),l=0,u=1;u<s.length&&s[u]<=c;u+=2)l=u;l&&s.splice(0,l+1)}},t})(Fe);function tI(e){e===void 0&&(e={});var t=e.connector,n=t===void 0?function(){return new Fe}:t,i=e.resetOnError,r=i===void 0?!0:i,s=e.resetOnComplete,o=s===void 0?!0:s,a=e.resetOnRefCountZero,c=a===void 0?!0:a;return function(l){var u,h,d,f=0,p=!1,m=!1,g=function(){h?.unsubscribe(),h=void 0},b=function(){g(),u=d=void 0,p=m=!1},_=function(){var C=u;b(),C?.unsubscribe()};return dr(function(C,S){f++,!m&&!p&&g();var k=d=d??n();S.add(function(){f--,f===0&&!m&&!p&&(h=Pp(_,c))}),k.subscribe(S),!u&&f>0&&(u=new Xa({next:function($){return k.next($)},error:function($){m=!0,g(),h=Pp(b,r,$),k.error($)},complete:function(){p=!0,g(),h=Pp(b,o),k.complete()}}),Xr(C).subscribe(u))})(l)}}function Pp(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(t===!0){e();return}if(t!==!1){var r=new Xa({next:function(){r.unsubscribe(),e()}});return Xr(t.apply(void 0,Po([],Oo(n)))).subscribe(r)}}function Nu(e,t,n){var i,r,s,o,a=!1;return e&&typeof e=="object"?(i=e.bufferSize,o=i===void 0?1/0:i,r=e.windowTime,t=r===void 0?1/0:r,s=e.refCount,a=s===void 0?!1:s,n=e.scheduler):o=e??1/0,tI({connector:function(){return new JT(o,t,n)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:a})}function Fu(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=bc(e);return dr(function(i,r){(n?My(e,i,n):My(e,i)).subscribe(r)})}function U1(e,t){return dr(function(n,i){var r=null,s=0,o=!1,a=function(){return o&&!r&&i.complete()};n.subscribe(Br(i,function(c){r?.unsubscribe();var l=0,u=s++;Xr(e(c,u)).subscribe(r=Br(i,function(h){return i.next(t?t(c,h,u,l++):h)},function(){r=null,a()}))},function(){o=!0,a()}))})}function Y1(e){return e.documentData?e.documentData:e.previousDocumentData}function eI(e){switch(e.operation){case"INSERT":return{operation:e.operation,id:e.documentId,doc:e.documentData,previous:null};case"UPDATE":return{operation:e.operation,id:e.documentId,doc:At.deepFreezeWhenDevMode(e.documentData),previous:e.previousDocumentData?e.previousDocumentData:"UNKNOWN"};case"DELETE":return{operation:e.operation,id:e.documentId,doc:null,previous:e.previousDocumentData}}}var nI=new Map;function q1(e){return yi(nI,e,()=>{for(var t=new Array(e.events.length),n=e.events,i=e.collectionName,r=e.isLocal,s=At.deepFreezeWhenDevMode,o=0;o<n.length;o++){var a=n[o];t[o]={documentId:a.documentId,collectionName:i,isLocal:r,operation:a.operation,documentData:s(a.documentData),previousDocumentData:s(a.previousDocumentData)}}return t})}function Pr(e,t){return new Promise(function(n,i){var r=new Xa({next:function(s){n(s),r.unsubscribe()},error:i,complete:function(){i(new XT)}});e.subscribe(r)})}function Am(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=bc(e),i=j1(e,1/0),r=e;return r.length?r.length===1?Xr(r[0]):w0(i)(_c(r,n)):KT}var Tl="￿",Il=Number.MIN_SAFE_INTEGER;function iI(e,t){var n=t.selector,i=e.indexes?e.indexes.slice(0):[];t.index&&(i=[t.index]);var r=!!t.sort.find(u=>Object.values(u)[0]==="desc"),s=new Set;Object.keys(n).forEach(u=>{var h=iu(e,u);h&&h.type==="boolean"&&Object.prototype.hasOwnProperty.call(n[u],"$eq")&&s.add(u)});var o=t.sort.map(u=>Object.keys(u)[0]),a=o.filter(u=>!s.has(u)).join(","),c=-1,l;if(i.forEach(u=>{var h=!0,d=!0,f=u.map(_=>{var C=n[_],S=C?Object.keys(C):[],k={};if(!C||!S.length){var $=d?Il:Tl;k={startKey:$,endKey:h?Tl:Il,inclusiveStart:!0,inclusiveEnd:!0}}else S.forEach(D=>{if(x0.has(D)){var w=C[D],x=aI(D,w);k=Object.assign(k,x)}});return typeof k.startKey>"u"&&(k.startKey=Il),typeof k.endKey>"u"&&(k.endKey=Tl),typeof k.inclusiveStart>"u"&&(k.inclusiveStart=!0),typeof k.inclusiveEnd>"u"&&(k.inclusiveEnd=!0),d&&!k.inclusiveStart&&(d=!1),h&&!k.inclusiveEnd&&(h=!1),k}),p=f.map(_=>_.startKey),m=f.map(_=>_.endKey),g={index:u,startKeys:p,endKeys:m,inclusiveEnd:h,inclusiveStart:d,sortSatisfiedByIndex:!r&&a===u.filter(_=>!s.has(_)).join(","),selectorSatisfiedByIndex:oI(u,t.selector,p,m)},b=cI(e,t,g);(b>=c||t.index)&&(c=b,l=g)}),!l)throw U("SNH",{query:t});return l}var x0=new Set(["$eq","$gt","$gte","$lt","$lte"]),rI=new Set(["$eq","$gt","$gte"]),sI=new Set(["$eq","$lt","$lte"]);function oI(e,t,n,i){var r=Object.entries(t),s=r.find(([D,w])=>{if(!e.includes(D))return!0;var x=Object.entries(w).find(([M,I])=>!x0.has(M));return x});if(s||t.$and||t.$or)return!1;var o=[],a=new Set;for(var[c,l]of Object.entries(t)){if(!e.includes(c))return!1;var u=Object.keys(l).filter(D=>rI.has(D));if(u.length>1)return!1;var h=u[0];if(h&&a.add(c),h!=="$eq"){if(o.length>0)return!1;o.push(h)}}var d=[],f=new Set;for(var[p,m]of Object.entries(t)){if(!e.includes(p))return!1;var g=Object.keys(m).filter(D=>sI.has(D));if(g.length>1)return!1;var b=g[0];if(b&&f.add(p),b!=="$eq"){if(d.length>0)return!1;d.push(b)}}var _=0;for(var C of e){for(var S of[a,f]){if(!S.has(C)&&S.size>0)return!1;S.delete(C)}var k=n[_],$=i[_];if(k!==$&&a.size>0&&f.size>0)return!1;_++}return!0}function aI(e,t){switch(e){case"$eq":return{startKey:t,endKey:t,inclusiveEnd:!0,inclusiveStart:!0};case"$lte":return{endKey:t,inclusiveEnd:!0};case"$gte":return{startKey:t,inclusiveStart:!0};case"$lt":return{endKey:t,inclusiveEnd:!1};case"$gt":return{startKey:t,inclusiveStart:!1};default:throw new Error("SNH")}}function cI(e,t,n){var i=0,r=u=>{u>0&&(i=i+u)},s=10,o=Ep(n.startKeys,u=>u!==Il&&u!==Tl);r(o*s);var a=Ep(n.startKeys,u=>u!==Tl&&u!==Il);r(a*s);var c=Ep(n.startKeys,(u,h)=>u===n.endKeys[h]);r(c*s*1.5);var l=n.sortSatisfiedByIndex?5:0;return r(l),i}class Tf extends Error{}const su=Symbol("missing"),V1=Object.freeze(new Error("mingo: cycle detected while processing object/array")),If=e=>{const t=jh(e);let n=0,i=t.length;for(;i;)n=(n<<5)-n^t.charCodeAt(--i);return n>>>0},gs=e=>typeof e!="object"&&typeof e!="function"||e===null,K1=e=>gs(e)||au(e)||xo(e),G1={undefined:1,null:2,number:3,string:4,symbol:5,object:6,array:7,arraybuffer:8,boolean:9,date:10,regexp:11,function:12},Ps=(e,t)=>{e===su&&(e=void 0),t===su&&(t=void 0);const[n,i]=[e,t].map(r=>G1[ou(r)]||0);return n!==i?n-i:Ms(e,t)?0:e<t?-1:e>t?1:0};class $d extends Map{#t=If;#n=new Map;#e=t=>{const n=this.#t(t);return[(this.#n.get(n)||[]).find(i=>Ms(i,t)),n]};constructor(){super()}static init(t){const n=new $d;return t&&(n.#t=t),n}clear(){super.clear(),this.#n.clear()}delete(t){if(gs(t))return super.delete(t);const[n,i]=this.#e(t);return super.delete(n)?(this.#n.set(i,this.#n.get(i).filter(r=>!Ms(r,n))),!0):!1}get(t){if(gs(t))return super.get(t);const[n,i]=this.#e(t);return super.get(n)}has(t){if(gs(t))return super.has(t);const[n,i]=this.#e(t);return super.has(n)}set(t,n){if(gs(t))return super.set(t,n);const[i,r]=this.#e(t);if(super.has(i))super.set(i,n);else{super.set(t,n);const s=this.#n.get(r)||[];s.push(t),this.#n.set(r,s)}return this}get size(){return super.size}}function Ie(e,t){if(!e)throw new Tf(t)}const lI=Object.keys(G1).reduce((e,t)=>(e["[object "+t[0].toUpperCase()+t.substring(1)+"]"]=t,e),{});function ou(e){const t=Object.prototype.toString.call(e);return t==="[object Object]"?e?.constructor?.name?.toLowerCase()||"object":lI[t]||t.substring(8,t.length-1).toLowerCase()}const La=e=>typeof e=="boolean",Oi=e=>typeof e=="string",uI=e=>typeof e=="symbol",Vn=e=>!isNaN(e)&&typeof e=="number",Pt=Array.isArray;function wn(e){if(!e)return!1;const t=Object.getPrototypeOf(e);return(t===Object.prototype||t===null)&&ou(e)==="object"}const X1=e=>!gs(e),au=e=>e instanceof Date,xo=e=>e instanceof RegExp,C0=e=>typeof e=="function",ei=e=>e==null,hI=(e,t=!0)=>!!e||t&&e==="",k0=e=>ei(e)||Oi(e)&&!e||Pt(e)&&e.length===0||wn(e)&&Object.keys(e).length===0,zu=e=>Pt(e)?e:[e],Qa=(e,t)=>!!e&&Object.prototype.hasOwnProperty.call(e,t),dI=e=>typeof ArrayBuffer<"u"&&ArrayBuffer.isView(e),cu=(e,t)=>{if(ei(e)||La(e)||Vn(e)||Oi(e))return e;if(au(e))return new Date(e);if(xo(e))return new RegExp(e);if(dI(e)){const n=e.constructor;return new n(e)}if(t instanceof Set||(t=new Set),t.has(e))throw V1;t.add(e);try{if(Pt(e)){const n=new Array(e.length);for(let i=0;i<e.length;i++)n[i]=cu(e[i],t);return n}if(wn(e)){const n={};for(const i of Object.keys(e))n[i]=cu(e[i],t);return n}}finally{t.delete(e)}return e},$y=e=>e===su;function Lm(e,t){if($y(e)||ei(e))return t;if($y(t)||ei(t))return e;if(gs(e)||gs(t))return t;Pt(e)&&Pt(t)&&Ie(e.length===t.length,"arrays must be of equal length to merge.");for(const n of Object.keys(t))e[n]=Lm(e[n],t[n]);return e}function fI(e,t=If){const n=[$d.init(t),$d.init(t)];if(e.length===0)return[];if(e.some(i=>i.length===0))return[];if(e.length===1)return[...e];e[e.length-1].forEach(i=>n[0].set(i,!0));for(let i=e.length-2;i>-1;i--){if(e[i].forEach(r=>{n[0].has(r)&&n[1].set(r,!0)}),n[1].size===0)return[];n.reverse(),n[1].clear()}return Array.from(n[0].keys())}function Q1(e,t=1){const n=new Array;function i(r,s){for(let o=0,a=r.length;o<a;o++)Pt(r[o])&&(s>0||s<0)?i(r[o],Math.max(-1,s-1)):n.push(r[o])}return i(e,t),n}function pI(e){const t={};for(;e;){for(const n of Object.getOwnPropertyNames(e))n in t||(t[n]=e[n]);e=Object.getPrototypeOf(e)}return t}function Z1(e){for(;e;){if(Object.getOwnPropertyNames(e).includes("toString"))return e.toString!==Object.prototype.toString;e=Object.getPrototypeOf(e)}return!1}function Ms(e,t){if(e===t||Object.is(e,t))return!0;if(e===null||t===null||typeof e!=typeof t||typeof e!="object"||e.constructor!==t.constructor)return!1;if(e instanceof Date)return+e==+t;if(e instanceof RegExp)return e.toString()===t.toString();const n=e.constructor;if(n===Array||n===Object){const i=Object.keys(e).sort(),r=Object.keys(t).sort();if(i.length!==r.length)return!1;for(let s=0,o=i[s];s<i.length;o=i[++s])if(o!==r[s]||!Ms(e[o],t[o]))return!1;return!0}return Z1(e)&&e.toString()===t.toString()}const jh=(e,t)=>{if(e===null)return"null";if(e===void 0)return"undefined";if(Oi(e)||Vn(e)||La(e))return JSON.stringify(e);if(au(e))return e.toISOString();if(xo(e)||uI(e)||C0(e))return e.toString();if(t instanceof Set||(t=new Set),t.has(e))throw V1;try{if(t.add(e),Pt(e))return"["+e.map(i=>jh(i,t)).join(",")+"]";if(wn(e))return"{"+Object.keys(e).sort().map(r=>`${r}:${jh(e[r],t)}`).join()+"}";const n=Z1(e)?e.toString():jh(pI(e),t);return ou(e)+"("+n+")"}finally{t.delete(e)}};function mI(e,t){return ei(e)?null:(t=t||If,t(e))}function gI(e,t,n=If){if(e.length<1)return new Map;const i=new Map,r=new Map;for(let s=0;s<e.length;s++){const o=e[s],a=t(o,s),c=mI(a,n);if(c===null)r.has(null)?r.get(null).push(o):r.set(null,[o]);else{const l=i.has(c)?i.get(c).find(u=>Ms(u,a)):null;ei(l)?(r.set(a,[o]),i.has(c)?i.get(c).push(a):i.set(c,[a])):r.get(l).push(o)}}return r}function Nm(e,t){return X1(e)?e[t]:void 0}function vI(e,t){if(t<1)return e;for(;t--&&e.length===1;)e=e[0];return e}function Ro(e,t,n){let i=0;function r(o,a){let c=o;for(let l=0;l<a.length;l++){const u=a[l];if(/^\d+$/.exec(u)===null&&Pt(c)){if(l===0&&i>0)break;i+=1;const d=a.slice(l);c=c.reduce((f,p)=>{const m=r(p,d);return m!==void 0&&f.push(m),f},[]);break}else c=Nm(c,u);if(c===void 0)break}return c}const s=K1(e)?e:r(e,t.split("."));return Pt(s)&&n?.unwrapArray?vI(s,i):s}function Ol(e,t,n){const i=t.indexOf("."),r=i==-1?t:t.substring(0,i),s=t.substring(i+1),o=i!=-1;if(Pt(e)){const l=/^\d+$/.test(r),u=l&&n?.preserveIndex?[...e]:[];if(l){const h=parseInt(r);let d=Nm(e,h);o&&(d=Ol(d,s,n)),n?.preserveIndex?u[h]=d:u.push(d)}else for(const h of e){const d=Ol(h,t,n);n?.preserveMissing?u.push(d??su):(d!=null||n?.preserveIndex)&&u.push(d)}return u}const a=n?.preserveKeys?{...e}:{};let c=Nm(e,r);if(o&&(c=Ol(c,s,n)),c!==void 0)return a[r]=c,a}function Fm(e){if(Pt(e))for(let t=e.length-1;t>=0;t--)e[t]===su?e.splice(t,1):Fm(e[t]);else if(wn(e))for(const t in e)Qa(e,t)&&Fm(e[t])}const Ty=/^\d+$/;function Td(e,t,n,i){const r=t.split("."),s=r[0],o=r.slice(1).join(".");if(r.length===1)(wn(e)||Pt(e)&&Ty.test(s))&&n(e,s);else{i?.buildGraph&&ei(e[s])&&(e[s]={});const a=e[s];if(!a)return;const c=!!(r.length>1&&Ty.test(r[1]));Pt(a)&&i?.descendArray&&!c?a.forEach(l=>Td(l,o,n,i)):Td(a,o,n,i)}}function yI(e,t,n){Td(e,t,(i,r)=>{i[r]=C0(n)?n(i[r]):n},{buildGraph:!0})}function Iy(e,t,n){Td(e,t,(i,r)=>{if(Pt(i)){if(/^\d+$/.test(r))i.splice(parseInt(r),1);else if(n&&n.descendArray)for(const s of i)wn(s)&&delete s[r]}else wn(i)&&delete i[r]},n)}const bI=/^\$[a-zA-Z0-9_]+$/;function Jo(e){return bI.test(e)}function J1(e){if(K1(e))return xo(e)?{$regex:e}:{$eq:e};if(X1(e)){if(!Object.keys(e).some(Jo))return{$eq:e};if(Qa(e,"$regex")){const t={...e};return t.$regex=new RegExp(e.$regex,e.$options),delete t.$options,t}}return e}var zm=(e=>(e[e.CLONE_OFF=0]="CLONE_OFF",e[e.CLONE_INPUT=1]="CLONE_INPUT",e[e.CLONE_OUTPUT=2]="CLONE_OUTPUT",e[e.CLONE_ALL=3]="CLONE_ALL",e))(zm||{});class Co{#t;#n;#e;constructor(t,n,i){this.#t=t,this.update(n,i)}static init(t,n,i){return t instanceof Co?new Co(t.#t,t.root??n,{...t.#e,...i,variables:Object.assign({},t.#e?.variables,i?.variables)}):new Co(t,n,i)}update(t,n){this.#n=t;const i=Object.assign({},this.#e?.variables,n?.variables);return Object.keys(i).length?this.#e={...n,variables:i}:this.#e=n??{},this}getOptions(){return Object.freeze({...this.#t,context:Ao.from(this.#t.context)})}get root(){return this.#n}get local(){return this.#e}get idKey(){return this.#t.idKey}get collation(){return this.#t?.collation}get processingMode(){return this.#t?.processingMode||0}get useStrictMode(){return this.#t?.useStrictMode}get scriptEnabled(){return this.#t?.scriptEnabled}get useGlobalContext(){return this.#t?.useGlobalContext}get hashFunction(){return this.#t?.hashFunction}get collectionResolver(){return this.#t?.collectionResolver}get jsonSchemaValidator(){return this.#t?.jsonSchemaValidator}get variables(){return this.#t?.variables}get context(){return this.#t?.context}}function _I(e){return e instanceof Co?e.getOptions():Object.freeze({idKey:"_id",scriptEnabled:!0,useStrictMode:!0,useGlobalContext:!0,processingMode:0,...e,context:e?.context?Ao.from(e?.context):Ao.init()})}class Ao{#t=new Map;constructor(){}static init(){return new Ao}static from(t){const n=Ao.init();return ei(t)||t.#t.forEach((i,r)=>n.addOperators(r,i)),n}addOperators(t,n){this.#t.has(t)||this.#t.set(t,{});for(const[i,r]of Object.entries(n))this.getOperator(t,i)||(this.#t.get(t)[i]=r);return this}getOperator(t,n){return(this.#t.get(t)??{})[n]??null}addAccumulatorOps(t){return this.addOperators("accumulator",t)}addExpressionOps(t){return this.addOperators("expression",t)}addQueryOps(t){return this.addOperators("query",t)}addPipelineOps(t){return this.addOperators("pipeline",t)}addProjectionOps(t){return this.addOperators("projection",t)}addWindowOps(t){return this.addOperators("window",t)}}const oo=Ao.init();function Oy(e,t){for(const[n,i]of Object.entries(t)){Ie(C0(i)&&Jo(n),`'${n}' is not a valid operator`);const r=lu(e,n,null);Ie(!r||i===r,`${n} already exists for '${e}' operators. Cannot change operator function once registered.`)}switch(e){case"accumulator":oo.addAccumulatorOps(t);break;case"expression":oo.addExpressionOps(t);break;case"pipeline":oo.addPipelineOps(t);break;case"projection":oo.addProjectionOps(t);break;case"query":oo.addQueryOps(t);break;case"window":oo.addWindowOps(t);break}}function lu(e,t,n){const{context:i,useGlobalContext:r}=n||{},s=i?i.getOperator(e,t):null;return!s&&r?oo.getOperator(e,t):s}function _a(e,t,n,i){const r=Co.init(i,e);return n&&Jo(n)?tx(e,t,n,r):Id(e,t,r)}const wI=["$$ROOT","$$CURRENT","$$REMOVE","$$NOW"];function Id(e,t,n){if(Oi(t)&&t.length>0&&t[0]==="$"){if(xI.includes(t))return t;let i=n.root;const r=t.split(".");if(wI.includes(r[0])){switch(r[0]){case"$$ROOT":break;case"$$CURRENT":i=e;break;case"$$REMOVE":i=void 0;break;case"$$NOW":i=new Date;break}t=t.slice(r[0].length+1)}else if(r[0].slice(0,2)==="$$"){i=Object.assign({},n.variables,{this:e},n?.local?.variables);const s=r[0].slice(2);Ie(Qa(i,s),`Use of undefined variable: ${s}`),t=t.slice(2)}else t=t.slice(1);return t===""?i:Ro(i,t)}if(Pt(t))return t.map(i=>Id(e,i,n));if(wn(t)){const i={},r=Object.entries(t);for(const[s,o]of r){if(Jo(s))return Ie(r.length==1,"expression must have single operator."),tx(e,o,s,n);i[s]=Id(e,o,n)}return i}return t}function tx(e,t,n,i){const r=lu("expression",n,i);if(r)return r(e,t,i);const s=lu("accumulator",n,i);return Ie(!!s,`accumulator '${n}' is not registered.`),Pt(e)||(e=Id(e,t,i),t=null),Ie(Pt(e),`arguments must resolve to array for ${n}.`),s(e,t,i)}const xI=["$$KEEP","$$PRUNE","$$DESCEND"];function uu(e){return e instanceof Py?e:new Py(e)}function CI(...e){let t=0;return uu(()=>{for(;t<e.length;){const n=e[t].next();if(!n.done)return n;t++}return{done:!0}})}function kI(e){return!!e&&typeof e=="object"&&e?.next instanceof Function}function SI(e,t){const n=e.slice(t+1);e.splice(t),Array.prototype.push.apply(e,n)}const jm=new Error;function EI(e,t,n){let i=!1,r=-1,s=0;return function(o){try{t:for(;!i;){let a=e();r++;let c=-1;const l=t.length;let u=!1;for(;++c<l;){const h=t[c];switch(h.action){case 0:a=h.func(a,r);break;case 1:if(!h.func(a,r))continue t;break;case 2:--h.count,h.count||(u=!0);break;case 3:--h.count,h.count||SI(t,c);continue t;default:break t}}if(i=u,o)n[s++]=a;else return{value:a,done:!1}}}catch(a){if(a!==jm)throw a}return i=!0,{done:i}}}let Py=class{constructor(t){this.#t=[],this.#n=[],this.isDone=!1;let n;if(t instanceof Function&&(t={next:t}),kI(t)){const i=t;n=()=>{const r=i.next();if(r.done)throw jm;return r.value}}else if(Pt(t)){const i=t,r=i.length;let s=0;n=()=>{if(s<r)return i[s++];throw jm}}else if(!(t instanceof Function))throw new Tf("Lazy must be initialized with an array, generator, or function.");this.#e=EI(n,this.#t,this.#n)}#t;#n;#e;push(t,n){return typeof n=="function"?this.#t.push({action:t,func:n}):typeof n=="number"&&this.#t.push({action:t,count:n}),this}next(){return this.#e()}map(t){return this.push(0,t)}filter(t){return this.push(1,t)}take(t){return t>0?this.push(2,t):this}drop(t){return t>0?this.push(3,t):this}transform(t){const n=this;let i;return uu(()=>(i||(i=uu(t(n.value()))),i.next()))}value(){return this.isDone||(this.isDone=this.#e(!0).done),this.#n}each(t){for(;;){const n=this.next();if(n.done)break;if(t(n.value)===!1)return!1}return!0}reduce(t,n){let i=this.next();for(n===void 0&&!i.done&&(n=i.value,i=this.next());!i.done;)n=t(n,i.value),i=this.next();return n}size(){return this.reduce((t,n)=>++t,0)}[Symbol.iterator](){return this}};const MI=(e,t,n)=>e.take(t),ex=(e,t,n)=>k0(t)?e:(ix(t,n),e.map(nx(t,Co.init(n))));function nx(e,t,n=!0){const i=t.idKey,r=Object.keys(e),s=new Array,o=new Array,a={};for(const f of r){const p=e[f];if(Vn(p)||La(p))p?o.push(f):s.push(f);else if(Pt(p))a[f]=m=>p.map(g=>_a(m,g,null,t.update(m))??null);else if(wn(p)){const m=Object.keys(p),g=m.length==1?m[0]:"",b=lu("projection",g,t);b?g==="$slice"&&!zu(p[g]).every(Vn)?a[f]=C=>_a(C,p,f,t.update(C)):a[f]=C=>b(C,p[g],f,t.update(C)):Jo(g)?a[f]=_=>_a(_,p[g],g,t):(ix(p,t),a[f]=_=>{if(!Qa(_,f))return _a(_,p,null,t);n&&t.update(_);const C=Ro(_,f),S=nx(p,t,!1);return Pt(C)?C.map(S):wn(C)?S(C):S(_)})}else a[f]=Oi(p)&&p[0]==="$"?m=>_a(m,p,f,t):m=>p}const c=Object.keys(a),l=s.includes(i);if(n&&l&&s.length===1&&!o.length&&!c.length)return f=>{const p={...f};return delete p[i],p};const h=n&&!l&&!o.includes(i),d={preserveMissing:!0};return f=>{const p={};if(s.length&&!o.length){Lm(p,f);for(const m of s)Iy(p,m,{descendArray:!0})}for(const m of o){const g=Ol(f,m,d)??{};Lm(p,g)}o.length&&Fm(p);for(const m of c){const g=a[m](f);g===void 0?Iy(p,m,{descendArray:!0}):yI(p,m,g)}return h&&Qa(f,i)&&(p[i]=Ro(f,i)),p}}function ix(e,t){let n=!1,i=!1;for(const[r,s]of Object.entries(e))Ie(!r.startsWith("$"),"Field names may not start with '$'."),Ie(!r.endsWith(".$"),"Positional projection operator '$' is not supported."),r!==t?.idKey&&(s===0||s===!1?n=!0:(s===1||s===!0)&&(i=!0),Ie(!(n&&i),"Projection cannot have a mix of inclusion and exclusion."))}const DI=(e,t,n)=>e.drop(t),rx=(e,t,n)=>{if(k0(t)||!wn(t))return e;let i=Ps;const r=n.collation;return wn(r)&&Oi(r.locale)&&(i=TI(r)),e.transform(s=>{const o=Object.keys(t);for(const a of o.reverse()){const c=gI(s,h=>Ro(h,a),n.hashFunction),l=Array.from(c.keys()).sort(i);t[a]===-1&&l.reverse();let u=0;for(const h of l)for(const d of c.get(h))s[u++]=d;Ie(u==s.length,"bug: counter must match collection size.")}return s})},$I={1:"base",2:"accent",3:"variant"};function TI(e){const t={sensitivity:$I[e.strength||3],caseFirst:e.caseFirst==="off"?"false":e.caseFirst||"false",numeric:e.numericOrdering||!1,ignorePunctuation:e.alternate==="shifted"};(e.caseLevel||!1)===!0&&(t.sensitivity==="base"&&(t.sensitivity="case"),t.sensitivity==="accent"&&(t.sensitivity="variant"));const n=new Intl.Collator(e.locale,t);return(i,r)=>{if(!Oi(i)||!Oi(r))return Ps(i,r);const s=n.compare(i,r);return s<0?-1:s>0?1:0}}const II={$sort:rx,$skip:DI,$limit:MI};class OI{#t;#n;#e;#r;#o={};#i=null;#s=[];constructor(t,n,i,r){this.#t=t,this.#n=n,this.#e=i,this.#r=r}fetch(){if(this.#i)return this.#i;this.#i=uu(this.#t).filter(this.#n);const t=this.#r.processingMode;t&zm.CLONE_INPUT&&this.#i.map(cu);for(const n of["$sort","$skip","$limit"])Qa(this.#o,n)&&(this.#i=II[n](this.#i,this.#o[n],this.#r));return Object.keys(this.#e).length&&(this.#i=ex(this.#i,this.#e,this.#r)),t&zm.CLONE_OUTPUT&&this.#i.map(cu),this.#i}fetchAll(){const t=uu([...this.#s]);return this.#s=[],CI(t,this.fetch())}all(){return this.fetchAll().value()}count(){return this.all().length}skip(t){return this.#o.$skip=t,this}limit(t){return this.#o.$limit=t,this}sort(t){return this.#o.$sort=t,this}collation(t){return this.#r={...this.#r,collation:t},this}next(){if(this.#s.length>0)return this.#s.pop();const t=this.fetch().next();if(!t.done)return t.value}hasNext(){if(this.#s.length>0)return!0;const t=this.fetch().next();return t.done?!1:(this.#s.push(t.value),!0)}map(t){return this.all().map(t)}forEach(t){this.all().forEach(t)}[Symbol.iterator](){return this.fetchAll()}}const PI=new Set(Array.from(["$and","$or","$nor","$expr","$jsonSchema"]));class ju{#t;#n;#e;constructor(t,n){this.#e=cu(t),this.#n=_I(n),this.#t=[],this.compile()}compile(){Ie(wn(this.#e),`query criteria must be an object: ${JSON.stringify(this.#e)}`);const t={};for(const[n,i]of Object.entries(this.#e)){if(n==="$where")Ie(this.#n.scriptEnabled,"$where operator requires 'scriptEnabled' option to be true."),Object.assign(t,{field:n,expr:i});else if(PI.has(n))this.processOperator(n,n,i);else{Ie(!Jo(n),`unknown top level operator: ${n}`);for(const[r,s]of Object.entries(J1(i)))this.processOperator(n,r,s)}t.field&&this.processOperator(t.field,t.field,t.expr)}}processOperator(t,n,i){const r=lu("query",n,this.#n);Ie(!!r,`unknown query operator ${n}`),this.#t.push(r(t,i,this.#n))}test(t){return this.#t.every(n=>n(t))}find(t,n){return new OI(t,i=>this.test(i),n||{},this.#n)}remove(t){return t.reduce((n,i)=>(this.test(i)||n.push(i),n),[])}}const RI=["monday","mon","tuesday","tue","wednesday","wed","thursday","thu","friday","fri","saturday","sat","sunday","sun"];new Set(RI);function ii(e){return(n,i,r)=>{const s={unwrapArray:!0},o=Math.max(1,n.split(".").length-1);return a=>{const c=Ro(a,n,s);return e(c,i,{...r,depth:o})}}}function sx(e,t,n){return Ms(e,t)||ei(e)&&ei(t)?!0:Pt(e)?e.some(i=>Ms(i,t))||Q1(e,n?.depth).some(i=>Ms(i,t)):!1}function AI(e,t,n){return!sx(e,t,n)}function ox(e,t,n){return ei(e)?t.some(i=>i===null):fI([zu(e),t],n?.hashFunction).length>0}function LI(e,t,n){return!ox(e,t,n)}function NI(e,t,n){return Of(e,t,(i,r)=>Ps(i,r)<0)}function FI(e,t,n){return Of(e,t,(i,r)=>Ps(i,r)<=0)}function zI(e,t,n){return Of(e,t,(i,r)=>Ps(i,r)>0)}function jI(e,t,n){return Of(e,t,(i,r)=>Ps(i,r)>=0)}function BI(e,t,n){return zu(e).some(i=>t.length===2&&i%t[0]===t[1])}function WI(e,t,n){const i=zu(e),r=s=>Oi(s)&&hI(t.exec(s),n?.useStrictMode);return i.some(r)||Q1(i,1).some(r)}function HI(e,t,n){return Array.isArray(e)&&e.length===t}function UI(e){return Jo(e)&&["$and","$or","$nor"].indexOf(e)===-1}function YI(e,t,n){if(Pt(e)&&!k0(e)){let i=o=>o,r=t;Object.keys(t).every(UI)&&(r={temp:t},i=o=>({temp:o}));const s=new ju(r,n);for(let o=0,a=e.length;o<a;o++)if(s.test(i(e[o])))return!0}return!1}const Ry=e=>e===null,qI={array:Pt,boolean:La,bool:La,date:au,number:Vn,int:Vn,long:Vn,double:Vn,decimal:Vn,null:Ry,object:wn,regexp:xo,regex:xo,string:Oi,undefined:ei,function:e=>{throw new Tf("unsupported type key `function`.")},1:Vn,2:Oi,3:wn,4:Pt,6:ei,8:La,9:au,10:Ry,11:xo,16:Vn,18:Vn,19:Vn};function Ay(e,t,n){const i=qI[t];return i?i(e):!1}function VI(e,t,n){return Pt(t)?t.findIndex(i=>Ay(e,i))>=0:Ay(e,t)}function Of(e,t,n){return zu(e).some(i=>ou(i)===ou(t)&&n(i,t))}const Ly=(e,t)=>{const n={};return e.split("").forEach((i,r)=>n[i]=t*(r+1)),n};({...Ly("ABCDEFGHIKLM",1),...Ly("NOPQRSTUVWXY",-1)});const Ny={undefined:null,null:null,NaN:NaN,Infinity:new Error,"-Infinity":new Error};function ri(e,t=Ny){const n=Object.assign({},Ny,t),i=new Set(Object.keys(n));return(r,s,o)=>{const a=_a(r,s,null,o);if(i.has(`${a}`)){const c=n[`${a}`];if(c instanceof Error)throw new Tf(`cannot apply $${e.name} to -inf, value must in (-inf,inf)`);return c}return e(a)}}ri(Math.acos,{Infinity:1/0,0:new Error});ri(Math.acosh,{Infinity:1/0,0:new Error});ri(Math.asin);ri(Math.asinh,{Infinity:1/0,"-Infinity":-1/0});ri(Math.atan);ri(Math.atanh,{1:1/0,"-1":-1/0});ri(Math.cos);ri(Math.cosh,{"-Infinity":1/0,Infinity:1/0});const KI=Math.PI/180;ri(e=>e*KI,{Infinity:1/0,"-Infinity":1/0});const GI=180/Math.PI;ri(e=>e*GI,{Infinity:1/0,"-Infinity":-1/0});ri(Math.sin);ri(Math.sinh,{"-Infinity":-1/0,Infinity:1/0});ri(Math.tan);const XI=(e,t,n)=>{Ie(Pt(t),"Invalid expression: $and expects value to be an Array.");const i=t.map(r=>new ju(r,n));return r=>i.every(s=>s.test(r))},ax=(e,t,n)=>{Ie(Pt(t),"Invalid expression. $or expects value to be an Array");const i=t.map(r=>new ju(r,n));return r=>i.some(s=>s.test(r))},QI=(e,t,n)=>{Ie(Pt(t),"Invalid expression. $nor expects value to be an array.");const i=ax("$or",t,n);return r=>!i(r)},ZI=(e,t,n)=>{const i={};i[e]=J1(t);const r=new ju(i,n);return s=>!r.test(s)},JI=ii(sx),tO=ii(zI),eO=ii(jI),nO=ii(ox),iO=ii(NI),rO=ii(FI),sO=ii(AI),oO=ii(LI),aO=ii(BI),cO=ii(WI),lO=ii(YI),uO=ii(HI),hO=(e,t,n)=>{const i=e.includes("."),r=!!t;return!i||e.match(/\.\d+$/)?s=>Ro(s,e)!==void 0===r:s=>{const o=Ol(s,e,{preserveIndex:!0}),a=Ro(o,e.substring(0,e.lastIndexOf(".")));return Pt(a)?a.some(c=>c!==void 0)===r:a!==void 0===r}},dO=ii(VI);var Fy=!1;function fO(e){return Fy||(Oy("pipeline",{$sort:rx,$project:ex}),Oy("query",{$and:XI,$eq:JI,$elemMatch:lO,$exists:hO,$gt:tO,$gte:eO,$in:nO,$lt:iO,$lte:rO,$ne:sO,$nin:oO,$mod:aO,$nor:QI,$not:ZI,$or:ax,$regex:cO,$size:uO,$type:dO}),Fy=!0),new ju(e)}function Na(e,t){var n=Ai(e.primaryKey);t=qt(t);var i=Fn(t);if(typeof i.skip!="number"&&(i.skip=0),i.selector?(i.selector=i.selector,Object.entries(i.selector).forEach(([h,d])=>{(typeof d!="object"||d===null)&&(i.selector[h]={$eq:d})})):i.selector={},i.index){var r=Cd(i.index);r.includes(n)||r.push(n),i.index=r}if(i.sort){var u=i.sort.find(h=>$$(h)===n);u||(i.sort=i.sort.slice(0),i.sort.push({[n]:"asc"}))}else if(i.index)i.sort=i.index.map(h=>({[h]:"asc"}));else{if(e.indexes){var s=new Set;Object.entries(i.selector).forEach(([h,d])=>{var f=!1;typeof d=="object"&&d!==null?f=!!Object.keys(d).find(p=>x0.has(p)):f=!0,f&&s.add(h)});var o=-1,a;e.indexes.forEach(h=>{var d=kd(h)?h:[h],f=d.findIndex(p=>!s.has(p));f>0&&f>o&&(o=f,a=d)}),a&&(i.sort=a.map(h=>({[h]:"asc"})))}if(!i.sort)if(e.indexes&&e.indexes.length>0){var c=e.indexes[0],l=kd(c)?c:[c];i.sort=l.map(h=>({[h]:"asc"}))}else i.sort=[{[n]:"asc"}]}return i}function pO(e,t){if(!t.sort)throw U("SNH",{query:t});var n=[];t.sort.forEach(r=>{var s=Object.keys(r)[0],o=Object.values(r)[0];n.push({key:s,direction:o,getValueFn:D$(s)})});var i=(r,s)=>{for(var o=0;o<n.length;++o){var a=n[o],c=a.getValueFn(r),l=a.getValueFn(s);if(c!==l){var u=a.direction==="asc"?Ps(c,l):Ps(l,c);return u}}};return i}function cx(e,t){if(!t.sort)throw U("SNH",{query:t});var n=fO(t.selector),i=r=>n.test(r);return i}async function zc(e,t){var n=await e.exec();if(!n)return null;if(Array.isArray(n))return Promise.all(n.map(r=>t(r)));if(n instanceof Map)return Promise.all([...n.values()].map(r=>t(r)));var i=await t(n);return i}function Pf(e,t){if(!t.sort)throw U("SNH",{query:t});var n=iI(e,t);return{query:t,queryPlan:n}}var mO="_rxdb_internal";async function wc(e,t){var n=await e.findDocumentsById([t],!1),i=n[0];if(i)return i}async function Za(e,t,n){var i=await e.bulkWrite([t],n);if(i.error.length>0){var r=i.error[0];throw r}else{var s=Ai(e.schema.primaryKey),o=bi(s,[t],i),a=o[0];return a}}function gO(e,t){var n=wc(e,t),i=e.changeStream().pipe(Ht(r=>r.events.find(s=>s.documentId===t)),It(r=>!!r),Ht(r=>Promise.resolve(Q(r).documentData)),Fu(n),U1(r=>r),It(r=>!!r));return i}function hu(e){return Object.assign({},...e.filter(t=>!!t))}function Od(e,t,n,i){if(i)throw i.status===409?U("CONFLICT",{collection:e.name,id:t,writeError:i,data:n}):i.status===422?U("VD2",{collection:e.name,id:t,writeError:i,data:n}):i}function yB(e,t,n,i,r,s,o){for(var a=!!e.schema.attachments,c=[],l=[],u=[],h=Qo(10),d={id:h,events:[],checkpoint:null,context:r},f=d.events,p=[],m=[],g=[],b=n.size>0,_,C=i.length,S=function(){var $=i[k],D=$.document,w=$.previous,x=D[t],M=D._deleted,I=w&&w._deleted,T=void 0;b&&(T=n.get(x));var R;if(T){var Y=T._rev;if(!w||w&&Y!==w._rev){var F={isError:!0,status:409,documentId:x,writeRow:$,documentInDb:T};return u.push(F),1}var G=a?Rp($):$;a&&(M?w&&Object.keys(w._attachments).forEach(L=>{m.push({documentId:x,attachmentId:L,digest:Q(w)._attachments[L].digest})}):(Object.entries(D._attachments).find(([L,ot])=>{var kt=w?w._attachments[L]:void 0;return!kt&&!ot.data&&(R={documentId:x,documentInDb:T,isError:!0,status:510,writeRow:$,attachmentId:L}),!0}),R||Object.entries(D._attachments).forEach(([L,ot])=>{var kt=w?w._attachments[L]:void 0;if(!kt)p.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest});else{var Lt=G.document._attachments[L].digest;ot.data&&kt.digest!==Lt&&g.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest})}}))),R?u.push(R):(a?l.push(Rp(G)):l.push(G),_=G);var B=null,q=null,W=null;if(I&&!M)W="INSERT",B=a?Vi(D):D;else if(w&&!I&&!M)W="UPDATE",B=a?Vi(D):D,q=w;else if(M)W="DELETE",B=Q(D),q=w;else throw U("SNH",{args:{writeRow:$}});var V={documentId:x,documentData:B,previousDocumentData:q,operation:W};f.push(V)}else{var j=!!M;if(a&&Object.entries(D._attachments).forEach(([L,ot])=>{ot.data?p.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest}):(R={documentId:x,isError:!0,status:510,writeRow:$,attachmentId:L},u.push(R))}),R||(a?c.push(Rp($)):c.push($),_=$),!j){var z={documentId:x,operation:"INSERT",documentData:a?Vi(D):D,previousDocumentData:a&&w?Vi(w):w};f.push(z)}}},k=0;k<C;k++)S();return{bulkInsertDocs:c,bulkUpdateDocs:l,newestRow:_,errors:u,eventBulk:d,attachmentsAdd:p,attachmentsRemove:m,attachmentsUpdate:g}}function Rp(e){return{previous:e.previous,document:Vi(e.document)}}function vO(e){return atob(e).length}function yO(e){var t=e.data;if(!t)return e;var n={length:vO(t),digest:e.digest,type:e.type};return n}function Vi(e){if(!e._attachments||Object.keys(e._attachments).length===0)return e;var t=qt(e);return t._attachments={},Object.entries(e._attachments).forEach(([n,i])=>{t._attachments[n]=yO(i)}),t}function Rf(e){return Object.assign({},e,{_meta:qt(e._meta)})}function S0(e,t,n){At.deepFreezeWhenDevMode(n);var i=Ai(t.schema.primaryKey),r={originalStorageInstance:t,schema:t.schema,internals:t.internals,collectionName:t.collectionName,databaseName:t.databaseName,options:t.options,async bulkWrite(s,o){for(var a=e.token,c=new Array(s.length),l=Ri(),u=0;u<s.length;u++){var h=s[u],d=Rf(h.document);d._meta.lwt=l;var f=h.previous;d._rev=jr(a,f),c[u]={document:d,previous:f}}zn("preStorageWrite",{storageInstance:this.originalStorageInstance,rows:c});var p=await e.lockedRun(()=>t.bulkWrite(c,o)),m={error:[]};ux.set(m,c);var g=p.error.length===0?[]:p.error.filter($=>$.status===409&&!$.writeRow.previous&&!$.writeRow.document._deleted&&Q($.documentInDb)._deleted?!0:(m.error.push($),!1));if(g.length>0){var b=new Set,_=g.map($=>(b.add($.documentId),{previous:$.documentInDb,document:Object.assign({},$.writeRow.document,{_rev:jr(e.token,$.documentInDb)})})),C=await e.lockedRun(()=>t.bulkWrite(_,o));To(m.error,C.error);var S=bi(i,c,m,b),k=bi(i,_,C);return To(S,k),m}return m},query(s){return e.lockedRun(()=>t.query(s))},count(s){return e.lockedRun(()=>t.count(s))},findDocumentsById(s,o){return e.lockedRun(()=>t.findDocumentsById(s,o))},getAttachmentData(s,o,a){return e.lockedRun(()=>t.getAttachmentData(s,o,a))},getChangedDocumentsSince:t.getChangedDocumentsSince?(s,o)=>e.lockedRun(()=>t.getChangedDocumentsSince(Q(s),o)):void 0,cleanup(s){return e.lockedRun(()=>t.cleanup(s))},remove(){return e.storageInstances.delete(r),e.lockedRun(()=>t.remove())},close(){return e.storageInstances.delete(r),e.lockedRun(()=>t.close())},changeStream(){return t.changeStream()}};return e.storageInstances.add(r),r}function bB(e){if(e.schema.keyCompression)throw U("UT5",{args:{params:e}});if(Pd(e.schema))throw U("UT6",{args:{params:e}});if(e.schema.attachments&&e.schema.attachments.compression)throw U("UT7",{args:{params:e}})}function Pd(e){return!!(e.encrypted&&e.encrypted.length>0||e.attachments&&e.attachments.encrypted)}function bO(e,t,n){var i=Ai(e.schema.primaryKey),r=n?n.lwt:h0,s=n?n.id:"";return Na(e.schema,{selector:{$or:[{"_meta.lwt":{$gt:r}},{"_meta.lwt":{$eq:r},[i]:{$gt:n?s:""}}],"_meta.lwt":{$gte:r}},sort:[{"_meta.lwt":"asc"},{[i]:"asc"}],skip:0,limit:t})}async function lx(e,t,n){if(e.getChangedDocumentsSince)return e.getChangedDocumentsSince(t,n);var i=Ai(e.schema.primaryKey),r=Pf(e.schema,bO(e,t,n)),s=await e.query(r),o=s.documents,a=S$(o);return{documents:o,checkpoint:a?{id:a[i],lwt:a._meta.lwt}:n||{id:"",lwt:0}}}var ux=new WeakMap,_O=new WeakMap;function bi(e,t,n,i){return yi(_O,n,()=>{var r=[],s=ux.get(n);if(s||(s=t),n.error.length>0||i){for(var o=i||new Set,a=0;a<n.error.length;a++){var c=n.error[a];o.add(c.documentId)}for(var l=0;l<s.length;l++){var u=s[l].document;o.has(u[e])||r.push(Vi(u))}}else{r.length=t.length-n.error.length;for(var h=0;h<s.length;h++){var d=s[h].document;r[h]=Vi(d)}}return r})}var hx=(function(){function e(n,i,r,s){this.queueByDocId=new Map,this.isRunning=!1,this.storageInstance=n,this.primaryPath=i,this.preWrite=r,this.postWrite=s}var t=e.prototype;return t.addWrite=function(i,r){var s=i[this.primaryPath],o=yi(this.queueByDocId,s,()=>[]),a=new Promise((c,l)=>{var u={lastKnownDocumentState:i,modifier:r,resolve:c,reject:l};Q(o).push(u),this.triggerRun()});return a},t.triggerRun=async function(){if(!(this.isRunning===!0||this.queueByDocId.size===0)){this.isRunning=!0;var i=[],r=this.queueByDocId;this.queueByDocId=new Map,await Promise.all(Array.from(r.entries()).map(async([o,a])=>{var c=wO(a.map(h=>h.lastKnownDocumentState)),l=c;for(var u of a)try{l=await u.modifier(Fn(l))}catch(h){u.reject(h),u.reject=()=>{},u.resolve=()=>{}}try{await this.preWrite(l,c)}catch(h){a.forEach(d=>d.reject(h));return}i.push({previous:c,document:l})}));var s=i.length>0?await this.storageInstance.bulkWrite(i,"incremental-write"):{error:[]};return await Promise.all(bi(this.primaryPath,i,s).map(o=>{var a=o[this.primaryPath];this.postWrite(o);var c=Ka(r,a);c.forEach(l=>l.resolve(o))})),s.error.forEach(o=>{var a=o.documentId,c=Ka(r,a),l=qa(o);if(l){var u=yi(this.queueByDocId,a,()=>[]);c.reverse().forEach(d=>{d.lastKnownDocumentState=Q(l.documentInDb),Q(u).unshift(d)})}else{var h=v1(o);c.forEach(d=>d.reject(h))}}),this.isRunning=!1,this.triggerRun()}},e})();function zy(e){var t=async n=>{var i=T$(n);i._deleted=n._deleted;var r=await e(i),s=Object.assign({},r,{_meta:n._meta,_attachments:n._attachments,_rev:n._rev,_deleted:typeof r._deleted<"u"?r._deleted:n._deleted});return typeof s._deleted>"u"&&(s._deleted=!1),s};return t}function wO(e){var t=e[0],n=Os(t._rev);return e.forEach(i=>{var r=Os(i._rev);r>n&&(t=i,n=r)}),t}var Af={get primaryPath(){var e=this;if(e.isInstanceOfRxDocument)return e.collection.schema.primaryPath},get primary(){var e=this;if(e.isInstanceOfRxDocument)return e._data[e.primaryPath]},get revision(){var e=this;if(e.isInstanceOfRxDocument)return e._data._rev},get deleted$(){var e=this;if(e.isInstanceOfRxDocument)return e.$.pipe(Ht(t=>t._data._deleted))},get deleted$$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.deleted$,e.getLatest().deleted,e.collection.database)},get deleted(){var e=this;if(e.isInstanceOfRxDocument)return e._data._deleted},getLatest(){var e=this.collection._docCache.getLatestDocumentData(this.primary);return this.collection._docCache.getCachedRxDocument(e)},get $(){var e=this,t=this.primary;return e.collection.eventBulks$.pipe(It(n=>!n.isLocal),Ht(n=>n.events.find(i=>i.documentId===t)),It(n=>!!n),Ht(n=>Y1(Q(n))),Fu(e.collection._docCache.getLatestDocumentData(t)),ru((n,i)=>n._rev===i._rev),Ht(n=>this.collection._docCache.getCachedRxDocument(n)),Nu(Au))},get $$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.$,e.getLatest()._data,e.collection.database)},get$(e){if(At.isDevMode()){if(e.includes(".item."))throw U("DOC1",{path:e});if(e===this.primaryPath)throw U("DOC2");if(this.collection.schema.finalFields.includes(e))throw U("DOC3",{path:e});var t=iu(this.collection.schema.jsonSchema,e);if(!t)throw U("DOC4",{path:e})}return this.$.pipe(Ht(n=>Va(n,e)),ru())},get$$(e){var t=this.get$(e),n=this.collection.database.getReactivityFactory();return n.fromObservable(t,this.getLatest().get(e),this.collection.database)},populate(e){var t=iu(this.collection.schema.jsonSchema,e),n=this.get(e);if(!n)return m0;if(!t)throw U("DOC5",{path:e});if(!t.ref)throw U("DOC6",{path:e,schemaObj:t});var i=this.collection.database.collections[t.ref];if(!i)throw U("DOC7",{ref:t.ref,path:e,schemaObj:t});return t.type==="array"?i.findByIds(n).exec().then(r=>{var s=r.values();return Array.from(s)}):i.findOne(n).exec()},get(e){return px(this,e)},toJSON(e=!1){if(e)return At.deepFreezeWhenDevMode(this._data);var t=qt(this._data);return delete t._rev,delete t._attachments,delete t._deleted,delete t._meta,At.deepFreezeWhenDevMode(t)},toMutableJSON(e=!1){return Fn(this.toJSON(e))},update(e){throw Rt("update")},incrementalUpdate(e){throw Rt("update")},updateCRDT(e){throw Rt("crdt")},putAttachment(){throw Rt("attachments")},putAttachmentBase64(){throw Rt("attachments")},getAttachment(){throw Rt("attachments")},allAttachments(){throw Rt("attachments")},get allAttachments$(){throw Rt("attachments")},async modify(e,t){var n=this._data,i=await zy(e)(n);return this._saveData(i,n)},incrementalModify(e,t){return this.collection.incrementalWriteQueue.addWrite(this._data,zy(e)).then(n=>this.collection._docCache.getCachedRxDocument(n))},patch(e){var t=this._data,n=Fn(t);return Object.entries(e).forEach(([i,r])=>{n[i]=r}),this._saveData(n,t)},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e,t){if(e=qt(e),this._data._deleted)throw U("DOC11",{id:this.primary,document:this});await fx(this.collection,e,t);var n=[{previous:t,document:e}],i=await this.collection.storageInstance.bulkWrite(n,"rx-document-save-data"),r=i.error[0];return Od(this.collection,this.primary,e,r),await this.collection._runHooks("post","save",e,this),this.collection._docCache.getCachedRxDocument(bi(this.collection.schema.primaryPath,n,i)[0])},async remove(){if(this.deleted)return Promise.reject(U("DOC13",{document:this,id:this.primary}));var e=await this.collection.bulkRemove([this]);if(e.error.length>0){var t=e.error[0];Od(this.collection,this.primary,this._data,t)}return e.success[0]},incrementalRemove(){return this.incrementalModify(async e=>(await this.collection._runHooks("pre","remove",e,this),e._deleted=!0,e)).then(async e=>(await this.collection._runHooks("post","remove",e._data,e),e))},close(){throw U("DOC14")}};function dx(e=Af){var t=function(i,r){this.collection=i,this._data=r,this._propertyCache=new Map,this.isInstanceOfRxDocument=!0};return t.prototype=e,t}function xO(e,t,n){var i=new e(t,n);return zn("createRxDocument",i),i}function fx(e,t,n){return t._meta=Object.assign({},n._meta,t._meta),At.isDevMode()&&e.schema.validateChange(n,t),e._runHooks("pre","save",t,n)}function px(e,t){return yi(e._propertyCache,t,()=>{var n=Va(e._data,t);if(typeof n!="object"||n===null||Array.isArray(n))return At.deepFreezeWhenDevMode(n);var i=new Proxy(qt(n),{get(r,s){if(typeof s!="string")return r[s];var o=s.charAt(s.length-1);if(o==="$")if(s.endsWith("$$")){var a=s.slice(0,-2);return e.get$$(el(t+"."+a))}else{var c=s.slice(0,-1);return e.get$(el(t+"."+c))}else if(o==="_"){var l=s.slice(0,-1);return e.populate(el(t+"."+l))}else{var u=r[s];return typeof u=="number"||typeof u=="string"||typeof u=="boolean"?u:px(e,el(t+"."+s))}}});return i})}function E0(e){return e[e.length-1]}function CO(e){const t=typeof e;return e!==null&&(t==="object"||t==="function")}function jy(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!CO(e)||typeof t!="string")return e;const i=t.split(".");if(i.length===0)return n;for(let r=0;r<i.length;r++){const s=i[r];if(kO(e,s)?e=r===i.length-1?void 0:null:e=e[s],e==null){if(r!==i.length-1)return n;break}}return e===void 0?n:e}function kO(e,t){if(typeof t!="number"&&Array.isArray(e)){const n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}const mx=e=>!!e.queryParams.limit,SO=e=>e.queryParams.limit===1,EO=e=>!!(e.queryParams.skip&&e.queryParams.skip>0),MO=e=>e.changeEvent.operation==="DELETE",DO=e=>e.changeEvent.operation==="INSERT",$O=e=>e.changeEvent.operation==="UPDATE",TO=e=>mx(e)&&e.previousResults.length>=e.queryParams.limit,IO=e=>{const t=e.queryParams.sortFields,n=e.changeEvent.previous,i=e.changeEvent.doc;if(!i)return!1;if(!n)return!0;for(let r=0;r<t.length;r++){const s=t[r],o=jy(n,s),a=jy(i,s);if(o!==a)return!0}return!1},OO=e=>{const t=e.changeEvent.id;if(e.keyDocumentMap)return e.keyDocumentMap.has(t);{const n=e.queryParams.primaryKey,i=e.previousResults;for(let r=0;r<i.length;r++)if(i[r][n]===t)return!0;return!1}},PO=e=>{const t=e.previousResults[0];return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},RO=e=>{const t=E0(e.previousResults);return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},AO=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},LO=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=E0(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},NO=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},FO=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=E0(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},zO=e=>{const t=e.changeEvent.previous;return t?e.queryParams.queryMatcher(t):!1},jO=e=>{const t=e.changeEvent.doc;return t?e.queryParams.queryMatcher(t):!1},BO=e=>e.previousResults.length===0,WO={0:DO,1:$O,2:MO,3:mx,4:SO,5:EO,6:BO,7:TO,8:PO,9:RO,10:IO,11:OO,12:AO,13:LO,14:NO,15:FO,16:zO,17:jO};function HO(e,t,n,i){var r=e.length,s=r-1,o=0;if(r===0)return e.push(t),0;for(var a;i<=s;)o=i+(s-i>>1),a=e[o],n(a,t)<=0?i=o+1:s=o-1;return n(a,t)<=0&&o++,e.splice(o,0,t),o}const UO=e=>{},M0=e=>{e.previousResults.unshift(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},D0=e=>{e.previousResults.push(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},$0=e=>{const t=e.previousResults.shift();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},T0=e=>{const t=e.previousResults.pop();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},YO=e=>{$0(e),D0(e)},qO=e=>{T0(e),M0(e)},VO=e=>{$0(e),M0(e)},KO=e=>{T0(e),D0(e)},gx=e=>{e.keyDocumentMap&&e.keyDocumentMap.delete(e.changeEvent.id);const t=e.queryParams.primaryKey,n=e.previousResults;for(let i=0;i<n.length;i++)if(n[i][t]===e.changeEvent.id){n.splice(i,1);break}},GO=e=>{const t=e.changeEvent.doc,n=e.queryParams.primaryKey,i=e.previousResults;for(let r=0;r<i.length;r++)if(i[r][n]===e.changeEvent.id){i[r]=t,e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,t);break}},XO=e=>{const t={_id:"wrongHuman"+new Date().getTime()};e.previousResults.length=0,e.previousResults.push(t),e.keyDocumentMap&&(e.keyDocumentMap.clear(),e.keyDocumentMap.set(t._id,t))},vx=e=>{const t=e.changeEvent.id,n=e.changeEvent.doc;if(e.keyDocumentMap){if(e.keyDocumentMap.has(t))return;e.keyDocumentMap.set(t,n)}else if(e.previousResults.find(r=>r[e.queryParams.primaryKey]===t))return;HO(e.previousResults,n,e.queryParams.sortComparator,0)},QO=e=>{gx(e),vx(e)},ZO=e=>{throw new Error("Action runFullQueryAgain must be implemented by yourself")},JO=e=>{throw new Error("Action unknownAction should never be called")},tP=["doNothing","insertFirst","insertLast","removeFirstItem","removeLastItem","removeFirstInsertLast","removeLastInsertFirst","removeFirstInsertFirst","removeLastInsertLast","removeExisting","replaceExisting","alwaysWrong","insertAtSortPosition","removeExistingAndInsertAtSortPosition","runFullQueryAgain","unknownAction"],eP={doNothing:UO,insertFirst:M0,insertLast:D0,removeFirstItem:$0,removeLastItem:T0,removeFirstInsertLast:YO,removeLastInsertFirst:qO,removeFirstInsertFirst:VO,removeLastInsertLast:KO,removeExisting:gx,replaceExisting:GO,alwaysWrong:XO,insertAtSortPosition:vx,removeExistingAndInsertAtSortPosition:QO,runFullQueryAgain:ZO,unknownAction:JO},nP=40;function Ap(e){return e.charCodeAt(0)-nP}function iP(e){return e?"1":"0"}function By(e,t){const n=[];for(let i=0,r=e.length;i<r;i+=t)n.push(e.substring(i,i+t));return n}function rP(e){const t=new Map,i=2+parseInt(e.charAt(0)+e.charAt(1),10)*2,r=e.substring(2,i),s=By(r,2);for(let m=0;m<s.length;m++){const g=s[m],b=g.charAt(0),_=Ap(g.charAt(1));t.set(b,_)}const o=e.substring(i,e.length-3),a=By(o,4);for(let m=0;m<a.length;m++){const g=a[m],b=g.charAt(0),_=g.charAt(1),C=g.charAt(2),S=Ap(g.charAt(3));if(!t.has(_))throw new Error("missing node with id "+_);if(!t.has(C))throw new Error("missing node with id "+C);const k=t.get(_),$=t.get(C),D={l:S,0:k,1:$};t.set(b,D)}const c=e.slice(-3),l=c.charAt(0),u=c.charAt(1),h=Ap(c.charAt(2)),d=t.get(l),f=t.get(u);return{l:h,0:d,1:f}}function sP(e,t,n){let i=e,r=e.l;for(;;){const s=t[r](n),o=iP(s);if(i=i[o],typeof i=="number"||typeof i=="string")return i;r=i.l}}const oP="14a1b,c+d2e5f0g/h.i4j*k-l)m(n6oeh6pnm6qen6ril6snh6tin6ubo9vce9wmh9xns9yne9zmi9{cm9|ad9}cp9~aq9ae9¡bf9¢bq9£cg9¤ck9¥cn9¦nd9§np9¨nq9©nf9ªng9«nm9¬nk9­mr9®ms9¯mt9°mj9±mk9²ml9³mn9´mc8µ³{8¶¯}8·°¤8¸³§8¹mn8º³«8»³m8¼m´4½z²4¾³w4¿zµ4À¯¶4Á°·4Â³º4Ã³¸4Äm¹4Åv¤7Æyn7ÇÀÁ7È~7É¥¤7ÊÃÄ7Ë¨n7Ìº¹7Í­°7Î®m7Ï¯°7Ð±m7Ñ³m7Ò¼m5ÓÄm5Ô¹m5Õ½°5Ö¾m5×¿°5ØÇÏ5ÙÂm5ÚÊÑ5Û±m5Üºm5ÝÌÑ5ÞÕÍ2ß|2à¡u2á£Å2âÖÎ2ã¦Æ2ä©x2åªÆ2æ×Ø2ç|È2è¡¢2é£É2ê¤¥2ëÙÚ2ì¦Ë2í©n2îªn2ïÛÐ2ðÜÝ2ñ¬n2òÒÓ/óan/ôbn/õcn/öÞâ/÷ßã/øàä/ùáå/úæë/ûçì/üèí/ýéî/þÍÎ/ÿÏÑ/ĀòÔ,ācn,Ăöï,ă¤ñ,Ąúð,ąêñ,ĆþÐ,ćÿÑ,Ĉac0ĉbc0Ċóõ0ċôā0Čßá0čà¤0Ďçé0ďèê0Đ÷ù0đøă0Ēûý0ēüą0ĔmÒ-ĕmĀ-ĖÞæ-ėČĎ-Ęčď-ęĂĄ-ĚĐĒ-ěđē-Ĝ²»-ĝÍÏ-ĞĆć-ğ²³-ĠĔĈ3ġĕĊ3ĢĖė3ģęĚ3ĤĢĝ(ĥĜğ(ĦģĞ(ħĠġ+Ĩĉċ+ĩĤĦ+ĪĘě+īħĨ1ĬĩĪ1ĭĬī*Įĥm*ĭĮ.";let Lp;function aP(){return Lp||(Lp=rP(oP)),Lp}const cP=e=>sP(aP(),WO,e);function lP(e){const t=cP(e);return tP[t]}function uP(e,t,n,i,r){const s=eP[e];return s({queryParams:t,changeEvent:n,previousResults:i,keyDocumentMap:r}),i}function hP(e,t){return!t.sort||t.sort.length===0?[e]:t.sort.map(n=>Object.keys(n)[0])}var dP=new WeakMap;function fP(e){return yi(dP,e,()=>{var t=e.collection,n=Na(t.storageInstance.schema,Fn(e.mangoQuery)),i=t.schema.primaryPath,r=pO(t.schema.jsonSchema,n),s=(l,u)=>{var h={docA:l,docB:u};return r(h.docA,h.docB)},o=cx(t.schema.jsonSchema,n),a=l=>{var u={doc:l};return o(u.doc)},c={primaryKey:e.collection.schema.primaryPath,skip:n.skip,limit:n.limit,sortFields:hP(i,n),sortComparator:s,queryMatcher:a};return c})}function pP(e,t){if(!e.collection.database.eventReduce)return{runFullQueryAgain:!0};for(var n=fP(e),i=Q(e._result).docsData.slice(0),r=Q(e._result).docsDataMap,s=!1,o=[],a=0;a<t.length;a++){var c=t[a],l=eI(c);l&&o.push(l)}var u=o.find(h=>{var d={queryParams:n,changeEvent:h,previousResults:i,keyDocumentMap:r},f=lP(d);if(f==="runFullQueryAgain")return!0;if(f!=="doNothing")return s=!0,uP(f,n,h,i,r),!1});return u?{runFullQueryAgain:!0}:{runFullQueryAgain:!1,changed:s,newResults:i}}var mP=(function(){function e(){this._map=new Map}var t=e.prototype;return t.getByQuery=function(i){var r=i.toString(),s=yi(this._map,r,()=>i);return s},e})();function gP(){return new mP}function Wy(e,t){t.uncached=!0;var n=t.toString();e._map.delete(n)}function vP(e){return e.refCount$.observers.length}var yP=100,bP=30*1e3,_P=(e,t)=>(n,i)=>{if(!(i._map.size<e)){var r=Ri()-t,s=[],o=Array.from(i._map.values());for(var a of o)if(!(vP(a)>0)){if(a._lastEnsureEqual===0&&a._creationTime<r){Wy(i,a);continue}s.push(a)}var c=s.length-e;if(!(c<=0)){var l=s.sort((h,d)=>h._lastEnsureEqual-d._lastEnsureEqual),u=l.slice(0,c);u.forEach(h=>Wy(i,h))}}},yx=_P(yP,bP),Np=new WeakSet;function wP(e){Np.has(e)||(Np.add(e),j$().then(()=>W$(200)).then(()=>{e.closed||e.cacheReplacementPolicy(e,e._queryCache),Np.delete(e)}))}var bx=(function(){function e(n,i,r){this.cacheItemByDocId=new Map,this.tasks=new Set,this.registry=typeof FinalizationRegistry=="function"?new FinalizationRegistry(s=>{var o=s.docId,a=this.cacheItemByDocId.get(o);a&&(a[0].delete(s.revisionHeight+s.lwt+""),a[0].size===0&&this.cacheItemByDocId.delete(o))}):void 0,this.primaryPath=n,this.changes$=i,this.documentCreator=r,i.subscribe(s=>{this.tasks.add(()=>{for(var o=this.cacheItemByDocId,a=0;a<s.length;a++){var c=s[a],l=o.get(c.documentId);if(l){var u=c.documentData;u||(u=c.previousDocumentData),l[1]=u}}}),this.tasks.size<=1&&Mf().then(()=>{this.processTasks()})})}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(r=>r()),this.tasks.clear()}},t.getLatestDocumentData=function(i){this.processTasks();var r=Ka(this.cacheItemByDocId,i);return r[1]},t.getLatestDocumentDataIfExists=function(i){this.processTasks();var r=this.cacheItemByDocId.get(i);if(r)return r[1]},Hs(e,[{key:"getCachedRxDocuments",get:function(){var n=Hy(this);return Or(this,"getCachedRxDocuments",n)}},{key:"getCachedRxDocument",get:function(){var n=Hy(this);return Or(this,"getCachedRxDocument",i=>n([i])[0])}}])})();function Hy(e){var t=e.primaryPath,n=e.cacheItemByDocId,i=e.registry,r=At.deepFreezeWhenDevMode,s=e.documentCreator,o=a=>{for(var c=new Array(a.length),l=[],u=0;u<a.length;u++){var h=a[u],d=h[t],f=Os(h._rev),p=void 0,m=void 0,g=n.get(d);g?(p=g[0],m=p.get(f+h._meta.lwt+"")):(p=new Map,g=[p,h],n.set(d,g));var b=m?m.deref():void 0;b||(h=r(h),b=s(h),p.set(f+h._meta.lwt+"",CP(b)),i&&l.push(b)),c[u]=b}return l.length>0&&i&&(e.tasks.add(()=>{for(var _=0;_<l.length;_++){var C=l[_];i.register(C,{docId:C.primary,revisionHeight:Os(C.revision),lwt:C._data._meta.lwt})}}),e.tasks.size<=1&&Mf().then(()=>{e.processTasks()})),c};return o}function Bm(e,t){var n=e.getCachedRxDocuments;return n(t)}var xP=typeof WeakRef=="function",CP=xP?kP:SP;function kP(e){return new WeakRef(e)}function SP(e){return{deref(){return e}}}var Uy=(function(){function e(n,i,r){this.time=Ri(),this.query=n,this.count=r,this.documents=Bm(this.query.collection._docCache,i)}var t=e.prototype;return t.getValue=function(i){var r=this.query.op;if(r==="count")return this.count;if(r==="findOne"){var s=this.documents.length===0?null:this.documents[0];if(!s&&i)throw U("QU10",{collection:this.query.collection.name,query:this.query.mangoQuery,op:r});return s}else return r==="findByIds"?this.docsMap:this.documents.slice(0)},Hs(e,[{key:"docsData",get:function(){return Or(this,"docsData",this.documents.map(n=>n._data))}},{key:"docsDataMap",get:function(){var n=new Map;return this.documents.forEach(i=>{n.set(i.primary,i._data)}),Or(this,"docsDataMap",n)}},{key:"docsMap",get:function(){for(var n=new Map,i=this.documents,r=0;r<i.length;r++){var s=i[r];n.set(s.primary,s)}return Or(this,"docsMap",n)}}])})(),EP=0,MP=function(){return++EP},_x=(function(){function e(n,i,r,s={}){this.id=MP(),this._execOverDatabaseCount=0,this._creationTime=Ri(),this._lastEnsureEqual=0,this.uncached=!1,this.refCount$=new ui(null),this._result=null,this._latestChangeEvent=-1,this._ensureEqualQueue=er,this.op=n,this.mangoQuery=i,this.collection=r,this.other=s,i||(this.mangoQuery=Bh()),this.isFindOneByIdQuery=OP(this.collection.schema.primaryPath,i)}var t=e.prototype;return t._setResultData=function(i){if(typeof i>"u")throw U("QU18",{database:this.collection.database.name,collection:this.collection.name});if(typeof i=="number"){this._result=new Uy(this,[],i);return}else i instanceof Map&&(i=Array.from(i.values()));var r=new Uy(this,i,i.length);this._result=r},t._execOverDatabase=async function(){if(this._execOverDatabaseCount=this._execOverDatabaseCount+1,this.op==="count"){var i=this.getPreparedQuery(),r=await this.collection.storageInstance.count(i);if(r.mode==="slow"&&!this.collection.database.allowSlowCount)throw U("QU14",{collection:this.collection,queryObj:this.mangoQuery});return{result:r.count,counter:this.collection._changeEventBuffer.getCounter()}}if(this.op==="findByIds"){var s=Q(this.mangoQuery.selector)[this.collection.schema.primaryPath].$in,o=new Map,a=[];if(s.forEach(u=>{var h=this.collection._docCache.getLatestDocumentDataIfExists(u);if(h){if(!h._deleted){var d=this.collection._docCache.getCachedRxDocument(h);o.set(u,d)}}else a.push(u)}),a.length>0){var c=await this.collection.storageInstance.findDocumentsById(a,!1);c.forEach(u=>{var h=this.collection._docCache.getCachedRxDocument(u);o.set(h.primary,h)})}return{result:o,counter:this.collection._changeEventBuffer.getCounter()}}var l=await IP(this);return{result:l.docs,counter:l.counter}},t.exec=async function(i){if(i&&this.op!=="findOne")throw U("QU9",{collection:this.collection.name,query:this.mangoQuery,op:this.op});await Yy(this);var r=Q(this._result);return r.getValue(i)},t.toString=function(){var i=Sd({op:this.op,query:Na(this.collection.schema.jsonSchema,this.mangoQuery),other:this.other},!0),r=JSON.stringify(i);return this.toString=()=>r,r},t.getPreparedQuery=function(){var i={rxQuery:this,mangoQuery:Na(this.collection.schema.jsonSchema,this.mangoQuery)};i.mangoQuery.selector._deleted={$eq:!1},i.mangoQuery.index&&i.mangoQuery.index.unshift("_deleted"),zn("prePrepareQuery",i);var r=Pf(this.collection.schema.jsonSchema,i.mangoQuery);return this.getPreparedQuery=()=>r,r},t.doesDocumentDataMatch=function(i){return i._deleted?!1:this.queryMatcher(i)},t.remove=async function(){var i=await this.exec();if(Array.isArray(i)){var r=await this.collection.bulkRemove(i);if(r.error.length>0)throw v1(r.error[0]);return r.success}else return i.remove()},t.incrementalRemove=function(){return zc(this.asRxQuery,i=>i.incrementalRemove())},t.update=function(i){throw Rt("update")},t.patch=function(i){return zc(this.asRxQuery,r=>r.patch(i))},t.incrementalPatch=function(i){return zc(this.asRxQuery,r=>r.incrementalPatch(i))},t.modify=function(i){return zc(this.asRxQuery,r=>r.modify(i))},t.incrementalModify=function(i){return zc(this.asRxQuery,r=>r.incrementalModify(i))},t.where=function(i){throw Rt("query-builder")},t.sort=function(i){throw Rt("query-builder")},t.skip=function(i){throw Rt("query-builder")},t.limit=function(i){throw Rt("query-builder")},Hs(e,[{key:"$",get:function(){if(!this._$){var n=this.collection.eventBulks$.pipe(It(i=>!i.isLocal),Fu(null),nr(()=>Yy(this)),Ht(()=>this._result),Nu(Au),ru((i,r)=>!!(i&&i.time===Q(r).time)),It(i=>!!i),Ht(i=>Q(i).getValue()));this._$=Am(n,this.refCount$.pipe(It(()=>!1)))}return this._$}},{key:"$$",get:function(){var n=this.collection.database.getReactivityFactory();return n.fromObservable(this.$,void 0,this.collection.database)}},{key:"queryMatcher",get:function(){var n=this.collection.schema.jsonSchema,i=Na(this.collection.schema.jsonSchema,this.mangoQuery);return Or(this,"queryMatcher",cx(n,i))}},{key:"asRxQuery",get:function(){return this}}])})();function Bh(){return{selector:{}}}function DP(e){return e.collection._queryCache.getByQuery(e)}function jc(e,t,n,i){zn("preCreateRxQuery",{op:e,queryObj:t,collection:n,other:i});var r=new _x(e,t,n,i);return r=DP(r),wP(n),r}function $P(e){var t=e.asRxQuery.collection._changeEventBuffer.getCounter();return e._latestChangeEvent>=t}async function Yy(e){return e.collection.awaitBeforeReads.size>0&&await Promise.all(Array.from(e.collection.awaitBeforeReads).map(t=>t())),e._ensureEqualQueue=e._ensureEqualQueue.then(()=>TP(e)),e._ensureEqualQueue}function TP(e){if(e._lastEnsureEqual=Ri(),e.collection.database.closed||$P(e))return er;var t=!1,n=!1;if(e._latestChangeEvent===-1&&(n=!0),!n){var i=e.asRxQuery.collection._changeEventBuffer.getFrom(e._latestChangeEvent+1);if(i===null)n=!0;else{e._latestChangeEvent=e.asRxQuery.collection._changeEventBuffer.getCounter();var r=e.asRxQuery.collection._changeEventBuffer.reduceByLastOfDoc(i);if(e.op==="count"){var s=Q(e._result).count,o=s;r.forEach(c=>{var l=c.previousDocumentData&&e.doesDocumentDataMatch(c.previousDocumentData),u=e.doesDocumentDataMatch(c.documentData);!l&&u&&o++,l&&!u&&o--}),o!==s&&(t=!0,e._setResultData(o))}else{var a=pP(e,r);a.runFullQueryAgain?n=!0:a.changed&&(t=!0,e._setResultData(a.newResults))}}}return n?e._execOverDatabase().then(c=>{var l=c.result;return e._latestChangeEvent=c.counter,typeof l=="number"?((!e._result||l!==e._result.count)&&(t=!0,e._setResultData(l)),t):((!e._result||!I$(e.collection.schema.primaryPath,l,e._result.docsData))&&(t=!0,e._setResultData(l)),t)}):Promise.resolve(t)}async function IP(e){var t=[],n=e.collection;if(e.isFindOneByIdQuery)if(Array.isArray(e.isFindOneByIdQuery)){var i=e.isFindOneByIdQuery;if(i=i.filter(u=>{var h=e.collection._docCache.getLatestDocumentDataIfExists(u);return h?(h._deleted||t.push(h),!1):!0}),i.length>0){var r=await n.storageInstance.findDocumentsById(i,!1);To(t,r)}}else{var s=e.isFindOneByIdQuery,o=e.collection._docCache.getLatestDocumentDataIfExists(s);if(!o){var a=await n.storageInstance.findDocumentsById([s],!1);a[0]&&(o=a[0])}o&&!o._deleted&&t.push(o)}else{var c=e.getPreparedQuery(),l=await n.storageInstance.query(c);t=l.documents}return{docs:t,counter:n._changeEventBuffer.getCounter()}}function OP(e,t){if(!t.skip&&t.selector&&Object.keys(t.selector).length===1&&t.selector[e]){var n=t.selector[e];if(typeof n=="string")return n;if(Object.keys(n).length===1&&typeof n.$eq=="string"||Object.keys(n).length===1&&Array.isArray(n.$eq)&&!n.$eq.find(i=>typeof i!="string"))return n.$eq}return!1}var Ds="collection",I0="storage-token",Wh="rx-migration-status",PP="rx-pipeline-checkpoint",RP="RxInternalDocument",O0=Df({version:0,title:RP,primaryKey:{key:"id",fields:["context","key"],separator:"|"},type:"object",properties:{id:{type:"string",maxLength:200},key:{type:"string"},context:{type:"string",enum:[Ds,I0,Wh,PP,"OTHER"]},data:{type:"object",additionalProperties:!0}},indexes:[],required:["key","context","data"],additionalProperties:!1,sharding:{shards:1,mode:"collection"}});function Lo(e,t){return Us(O0,{key:e,context:t})}async function wx(e){var t=Pf(e.schema,{selector:{context:Ds,_deleted:{$eq:!1}},sort:[{id:"asc"}],skip:0}),n=await e.query(t),i=n.documents;return i}var xx="storageToken",AP=Lo(xx,I0);async function LP(e){var t=Qo(10),n=e.password?await e.hashFunction(JSON.stringify(e.password)):void 0,i={id:AP,context:I0,key:xx,data:{rxdbVersion:e.rxdbVersion,token:t,instanceToken:e.token,passwordHash:n},_deleted:!1,_meta:yc(),_rev:Ii(),_attachments:{}},r=[{document:i}],s=await e.internalStore.bulkWrite(r,"internal-add-storage-token");if(!s.error[0])return bi("id",r,s)[0];var o=Q(s.error[0]);if(o.isError&&qa(o)){var a=o;if(!NP(a.documentInDb.data.rxdbVersion,e.rxdbVersion))throw U("DM5",{args:{database:e.name,databaseStateVersion:a.documentInDb.data.rxdbVersion,codeVersion:e.rxdbVersion}});if(n&&n!==a.documentInDb.data.passwordHash)throw U("DB1",{passwordHash:n,existingPasswordHash:a.documentInDb.data.passwordHash});var c=a.documentInDb;return Q(c)}throw o}function NP(e,t){if(!e)return!1;var n=e.split(".")[0],i=t.split(".")[0];return n==="15"&&i==="16"?!0:n===i}async function Cx(e,t,n){if(e.schema.version!==n.version)throw U("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=Rd(e.name,e.schema.jsonSchema),r=Lo(i,Ds);;){var s=await wc(e.database.internalStore,r),o=Fn(Q(s)),a=o.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(a)return;o.data.connectedStorages.push({collectionName:t,schema:n});try{await Za(e.database.internalStore,{previous:Q(s),document:o},"add-connected-storage-to-collection")}catch(c){if(!qa(c))throw c}}}async function FP(e,t,n){if(e.schema.version!==n.version)throw U("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=Rd(e.name,e.schema.jsonSchema),r=Lo(i,Ds);;){var s=await wc(e.database.internalStore,r),o=Fn(Q(s)),a=o.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(!a)return;o.data.connectedStorages=o.data.connectedStorages.filter(c=>c.collectionName!==t);try{await Za(e.database.internalStore,{previous:Q(s),document:o},"remove-connected-storage-from-collection")}catch(c){if(!qa(c))throw c}}}function Rd(e,t){return e+"-"+t.version}function gh(e,t){return t=qt(t),t=nT(e,t),typeof e.jsonSchema.primaryKey!="string"&&(t=X$(e.primaryPath,e.jsonSchema,t)),t._meta=yc(),Object.prototype.hasOwnProperty.call(t,"_deleted")||(t._deleted=!1),Object.prototype.hasOwnProperty.call(t,"_attachments")||(t._attachments={}),Object.prototype.hasOwnProperty.call(t,"_rev")||(t._rev=Ii()),t}async function zP(e,t){t.multiInstance=e.multiInstance;var n=await e.storage.createStorageInstance(t);return n}async function kx(e,t,n,i,r,s,o,a){var c=await wx(t),l=c.filter(f=>f.data.name===r),u=[];l.forEach(f=>{u.push({collectionName:f.data.name,schema:f.data.schema,isCollection:!0}),f.data.connectedStorages.forEach(p=>u.push({collectionName:p.collectionName,isCollection:!1,schema:p.schema}))});var h=new Set;if(u=u.filter(f=>{var p=f.collectionName+"||"+f.schema.version;return h.has(p)?!1:(h.add(p),!0)}),await Promise.all(u.map(async f=>{var p=await e.createStorageInstance({collectionName:f.collectionName,databaseInstanceToken:n,databaseName:i,multiInstance:s,options:{},schema:f.schema,password:o,devMode:At.isDevMode()});await p.remove(),f.isCollection&&await Io("postRemoveRxCollection",{storage:e,databaseName:i,collectionName:r})})),a){var d=l.map(f=>{var p=Rf(f);return p._deleted=!0,p._meta.lwt=Ri(),p._rev=jr(n,f),{previous:f,document:p}});await t.bulkWrite(d,"rx-database-remove-collection-all")}}function oi(e){if(e.closed)throw U("COL21",{collection:e.name,version:e.schema.version})}var jP=(function(){function e(n){this.subs=[],this.counter=0,this.eventCounterMap=new WeakMap,this.buffer=[],this.limit=100,this.tasks=new Set,this.collection=n,this.subs.push(this.collection.eventBulks$.pipe(It(i=>!i.isLocal)).subscribe(i=>{this.tasks.add(()=>this._handleChangeEvents(i.events)),this.tasks.size<=1&&Mf().then(()=>{this.processTasks()})}))}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(r=>r()),this.tasks.clear()}},t._handleChangeEvents=function(i){var r=this.counter;this.counter=this.counter+i.length,i.length>this.limit?this.buffer=i.slice(i.length*-1):(To(this.buffer,i),this.buffer=this.buffer.slice(this.limit*-1));for(var s=r+1,o=this.eventCounterMap,a=0;a<i.length;a++){var c=i[a];o.set(c,s+a)}},t.getCounter=function(){return this.processTasks(),this.counter},t.getBuffer=function(){return this.processTasks(),this.buffer},t.getArrayIndexByPointer=function(i){this.processTasks();var r=this.buffer[0],s=this.eventCounterMap.get(r);if(i<s)return null;var o=i-s;return o},t.getFrom=function(i){this.processTasks();var r=[],s=this.getArrayIndexByPointer(i);if(s===null)return null;for(;;){var o=this.buffer[s];if(s++,o)r.push(o);else return r}},t.runFrom=function(i,r){this.processTasks();var s=this.getFrom(i);if(s===null)throw new Error("out of bounds");s.forEach(o=>r(o))},t.reduceByLastOfDoc=function(i){return this.processTasks(),i.slice(0)},t.close=function(){this.tasks.clear(),this.subs.forEach(i=>i.unsubscribe())},e})();function BP(e){return new jP(e)}var WP=new WeakMap;function HP(e){var t=e.schema.getDocumentPrototype(),n=qP(e),i=Af,r={};return[t,n,i].forEach(s=>{var o=Object.getOwnPropertyNames(s);o.forEach(a=>{var c=Object.getOwnPropertyDescriptor(s,a),l=!0;(a.startsWith("_")||a.endsWith("_")||a.startsWith("$")||a.endsWith("$"))&&(l=!1),typeof c.value=="function"?Object.defineProperty(r,a,{get(){return c.value.bind(this)},enumerable:l,configurable:!1}):(c.enumerable=l,c.configurable=!1,c.writable&&(c.writable=!1),Object.defineProperty(r,a,c))})}),r}function UP(e){return yi(WP,e,()=>dx(HP(e)))}function YP(e,t,n){var i=xO(t,e,At.deepFreezeWhenDevMode(n));return e._runHooksSync("post","create",n,i),zn("postCreateRxDocument",i),i}function qP(e){var t={};return Object.entries(e.methods).forEach(([n,i])=>{t[n]=i}),t}var Ad={isEqual(e,t,n){e=qy(e),t=qy(t);var i=eu(Vi(e),Vi(t));return i},resolve(e){return e.realMasterState}};function qy(e){return e._attachments||(e=qt(e),e._attachments={}),e}var Sx=["pre","post"],Ex=["insert","save","remove","create"],Vy=!1,wa=new Set,Mx=(function(){function e(n,i,r,s,o={},a={},c={},l={},u={},h=yx,d={},f=Ad){this.storageInstance={},this.timeouts=new Set,this.incrementalWriteQueue={},this.awaitBeforeReads=new Set,this._incrementalUpsertQueues=new Map,this.synced=!1,this.hooks={},this._subs=[],this._docCache={},this._queryCache=gP(),this.$={},this.checkpoint$={},this._changeEventBuffer={},this.eventBulks$={},this.onClose=[],this.closed=!1,this.onRemove=[],this.database=n,this.name=i,this.schema=r,this.internalStorageInstance=s,this.instanceCreationOptions=o,this.migrationStrategies=a,this.methods=c,this.attachments=l,this.options=u,this.cacheReplacementPolicy=h,this.statics=d,this.conflictHandler=f,VP(this.asRxCollection),n&&(this.eventBulks$=n.eventBulks$.pipe(It(p=>p.collectionName===this.name))),this.database&&wa.add(this)}var t=e.prototype;return t.prepare=async function(){if(!await G$()){for(var i=0;i<10&&wa.size>_y;)i++,await this.promiseWait(30);if(wa.size>_y)throw U("COL23",{database:this.database.name,collection:this.name,args:{existing:Array.from(wa.values()).map(c=>({db:c.database?c.database.name:"",c:c.name}))}})}this.storageInstance=S0(this.database,this.internalStorageInstance,this.schema.jsonSchema),this.incrementalWriteQueue=new hx(this.storageInstance,this.schema.primaryPath,(c,l)=>fx(this,c,l),c=>this._runHooks("post","save",c)),this.$=this.eventBulks$.pipe(nr(c=>q1(c))),this.checkpoint$=this.eventBulks$.pipe(Ht(c=>c.checkpoint)),this._changeEventBuffer=BP(this.asRxCollection);var r;this._docCache=new bx(this.schema.primaryPath,this.eventBulks$.pipe(It(c=>!c.isLocal),Ht(c=>c.events)),c=>(r||(r=UP(this.asRxCollection)),YP(this.asRxCollection,r,c)));var s=this.database.internalStore.changeStream().pipe(It(c=>{var l=this.name+"-"+this.schema.version,u=c.events.find(h=>h.documentData.context==="collection"&&h.documentData.key===l&&h.operation==="DELETE");return!!u})).subscribe(async()=>{await this.close(),await Promise.all(this.onRemove.map(c=>c()))});this._subs.push(s);var o=await this.database.storageToken,a=this.storageInstance.changeStream().subscribe(c=>{var l={id:c.id,isLocal:!1,internal:!1,collectionName:this.name,storageToken:o,events:c.events,databaseToken:this.database.token,checkpoint:c.checkpoint,context:c.context};this.database.$emit(l)});return this._subs.push(a),di},t.cleanup=function(i){throw oi(this),Rt("cleanup")},t.migrationNeeded=function(){throw Rt("migration-schema")},t.getMigrationState=function(){throw Rt("migration-schema")},t.startMigration=function(i=10){return oi(this),this.getMigrationState().startMigration(i)},t.migratePromise=function(i=10){return this.getMigrationState().migratePromise(i)},t.insert=async function(i){oi(this);var r=await this.bulkInsert([i]),s=r.error[0];Od(this,i[this.schema.primaryPath],i,s);var o=Q(r.success[0]);return o},t.insertIfNotExists=async function(i){var r=await this.bulkInsert([i]);if(r.error.length>0){var s=r.error[0];if(s.status===409){var o=s.documentInDb;return Bm(this._docCache,[o])[0]}else throw s}return r.success[0]},t.bulkInsert=async function(i){if(oi(this),i.length===0)return{success:[],error:[]};var r=this.schema.primaryPath,s=new Set,o;if(this.hasHooks("pre","insert"))o=await Promise.all(i.map(g=>{var b=gh(this.schema,g);return this._runHooks("pre","insert",b).then(()=>(s.add(b[r]),{document:b}))}));else{o=new Array(i.length);for(var a=this.schema,c=0;c<i.length;c++){var l=i[c],u=gh(a,l);s.add(u[r]),o[c]={document:u}}}if(s.size!==i.length)throw U("COL22",{collection:this.name,args:{documents:i}});var h=await this.storageInstance.bulkWrite(o,"rx-collection-bulk-insert"),d,f=this,p={get success(){if(!d){var g=bi(f.schema.primaryPath,o,h);d=Bm(f._docCache,g)}return d},error:h.error};if(this.hasHooks("post","insert")){var m=new Map;o.forEach(g=>{var b=g.document;m.set(b[r],b)}),await Promise.all(p.success.map(g=>this._runHooks("post","insert",m.get(g.primary),g)))}return p},t.bulkRemove=async function(i){oi(this);var r=this.schema.primaryPath;if(i.length===0)return{success:[],error:[]};var s;typeof i[0]=="string"?s=await this.findByIds(i).exec():(s=new Map,i.forEach(f=>s.set(f.primary,f)));var o=[],a=new Map;Array.from(s.values()).forEach(f=>{var p=f.toMutableJSON(!0);o.push(p),a.set(f.primary,p)}),await Promise.all(o.map(f=>{var p=f[this.schema.primaryPath];return this._runHooks("pre","remove",f,s.get(p))}));var c=o.map(f=>{var p=qt(f);return p._deleted=!0,{previous:f,document:p}}),l=await this.storageInstance.bulkWrite(c,"rx-collection-bulk-remove"),u=bi(this.schema.primaryPath,c,l),h=[],d=u.map(f=>{var p=f[r],m=this._docCache.getCachedRxDocument(f);return h.push(m),p});return await Promise.all(d.map(f=>this._runHooks("post","remove",a.get(f),s.get(f)))),{success:h,error:l.error}},t.bulkUpsert=async function(i){oi(this);var r=[],s=new Map;i.forEach(l=>{var u=gh(this.schema,l),h=u[this.schema.primaryPath];if(!h)throw U("COL3",{primaryPath:this.schema.primaryPath,data:u,schema:this.schema.jsonSchema});s.set(h,u),r.push(u)});var o=await this.bulkInsert(r),a=o.success.slice(0),c=[];return await Promise.all(o.error.map(async l=>{if(l.status!==409)c.push(l);else{var u=l.documentId,h=Ka(s,u),d=Q(l.documentInDb),f=this._docCache.getCachedRxDocuments([d])[0],p=await f.incrementalModify(()=>h);a.push(p)}})),{error:c,success:a}},t.upsert=async function(i){oi(this);var r=await this.bulkUpsert([i]);return Od(this.asRxCollection,i[this.schema.primaryPath],i,r.error[0]),r.success[0]},t.incrementalUpsert=function(i){oi(this);var r=gh(this.schema,i),s=r[this.schema.primaryPath];if(!s)throw U("COL4",{data:i});var o=this._incrementalUpsertQueues.get(s);return o||(o=di),o=o.then(()=>GP(this,s,r)).then(a=>a.inserted?a.doc:KP(a.doc,r)),this._incrementalUpsertQueues.set(s,o),o},t.find=function(i){oi(this),zn("prePrepareRxQuery",{op:"find",queryObj:i,collection:this}),i||(i=Bh());var r=jc("find",i,this);return r},t.findOne=function(i){oi(this),zn("prePrepareRxQuery",{op:"findOne",queryObj:i,collection:this});var r;if(typeof i=="string")r=jc("findOne",{selector:{[this.schema.primaryPath]:i},limit:1},this);else{if(i||(i=Bh()),i.limit)throw U("QU6");i=qt(i),i.limit=1,r=jc("findOne",i,this)}return r},t.count=function(i){oi(this),i||(i=Bh());var r=jc("count",i,this);return r},t.findByIds=function(i){oi(this);var r={selector:{[this.schema.primaryPath]:{$in:i.slice(0)}}},s=jc("findByIds",r,this);return s},t.exportJSON=function(){throw Rt("json-dump")},t.importJSON=function(i){throw Rt("json-dump")},t.insertCRDT=function(i){throw Rt("crdt")},t.addPipeline=function(i){throw Rt("pipeline")},t.addHook=function(i,r,s,o=!1){if(typeof s!="function")throw Md("COL7",{key:r,when:i});if(!Sx.includes(i))throw Md("COL8",{key:r,when:i});if(!Ex.includes(r))throw U("COL9",{key:r});if(i==="post"&&r==="create"&&o===!0)throw U("COL10",{when:i,key:r,parallel:o});var a=s.bind(this),c=o?"parallel":"series";this.hooks[r]=this.hooks[r]||{},this.hooks[r][i]=this.hooks[r][i]||{series:[],parallel:[]},this.hooks[r][i][c].push(a)},t.getHooks=function(i,r){return!this.hooks[r]||!this.hooks[r][i]?{series:[],parallel:[]}:this.hooks[r][i]},t.hasHooks=function(i,r){if(!this.hooks[r]||!this.hooks[r][i])return!1;var s=this.getHooks(i,r);return s?s.series.length>0||s.parallel.length>0:!1},t._runHooks=function(i,r,s,o){var a=this.getHooks(i,r);if(!a)return di;var c=a.series.map(l=>()=>l(s,o));return H$(c).then(()=>Promise.all(a.parallel.map(l=>l(s,o))))},t._runHooksSync=function(i,r,s,o){if(this.hasHooks(i,r)){var a=this.getHooks(i,r);a&&a.series.forEach(c=>c(s,o))}},t.promiseWait=function(i){var r=new Promise(s=>{var o=setTimeout(()=>{this.timeouts.delete(o),s()},i);this.timeouts.add(o)});return r},t.close=async function(){return this.closed?er:(wa.delete(this),await Promise.all(this.onClose.map(i=>i())),this.closed=!0,Array.from(this.timeouts).forEach(i=>clearTimeout(i)),this._changeEventBuffer&&this._changeEventBuffer.close(),this.database.requestIdlePromise().then(()=>this.storageInstance.close()).then(()=>(this._subs.forEach(i=>i.unsubscribe()),delete this.database.collections[this.name],Io("postCloseRxCollection",this).then(()=>!0))))},t.remove=async function(){await this.close(),await Promise.all(this.onRemove.map(i=>i())),await kx(this.database.storage,this.database.internalStore,this.database.token,this.database.name,this.name,this.database.multiInstance,this.database.password,this.database.hashFunction)},Hs(e,[{key:"insert$",get:function(){return this.$.pipe(It(n=>n.operation==="INSERT"))}},{key:"update$",get:function(){return this.$.pipe(It(n=>n.operation==="UPDATE"))}},{key:"remove$",get:function(){return this.$.pipe(It(n=>n.operation==="DELETE"))}},{key:"asRxCollection",get:function(){return this}}])})();function VP(e){if(!Vy){Vy=!0;var t=Object.getPrototypeOf(e);Ex.forEach(n=>{Sx.map(i=>{var r=i+_1(n);t[r]=function(s,o){return this.addHook(i,n,s,o)}})})}}function KP(e,t){return e.incrementalModify(n=>t)}function GP(e,t,n){var i=e._docCache.getLatestDocumentDataIfExists(t);return i?Promise.resolve({doc:e._docCache.getCachedRxDocuments([i])[0],inserted:!1}):e.findOne(t).exec().then(r=>r?{doc:r,inserted:!1}:e.insert(n).then(s=>({doc:s,inserted:!0})))}async function XP({database:e,name:t,schema:n,instanceCreationOptions:i={},migrationStrategies:r={},autoMigrate:s=!0,statics:o={},methods:a={},attachments:c={},options:l={},localDocuments:u=!1,cacheReplacementPolicy:h=yx,conflictHandler:d=Ad}){var f={databaseInstanceToken:e.token,databaseName:e.name,collectionName:t,schema:n.jsonSchema,options:i,multiInstance:e.multiInstance,password:e.password,devMode:At.isDevMode()};zn("preCreateRxStorageInstance",f);var p=await zP(e,f),m=new Mx(e,t,n,p,i,r,a,c,l,h,o,d);try{await m.prepare(),Object.entries(o).forEach(([g,b])=>{Object.defineProperty(m,g,{get:()=>b.bind(m)})}),zn("createRxCollection",{collection:m,creator:{name:t,schema:n,storageInstance:p,instanceCreationOptions:i,migrationStrategies:r,methods:a,attachments:c,options:l,cacheReplacementPolicy:h,localDocuments:u,statics:o}}),s&&m.schema.version!==0&&await m.migratePromise()}catch(g){throw wa.delete(m),await p.close(),g}return m}var Dx=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;this._parallels=t||1,this._qC=0,this._iC=new Set,this._lHN=0,this._hPM=new Map,this._pHM=new Map};Dx.prototype={isIdle:function(){return this._qC<this._parallels},lock:function(){this._qC++},unlock:function(){this._qC--,Wm(this)},wrapCall:function(t){var n=this;this._qC++;var i;try{i=t()}catch(r){throw this.unlock(),r}return!i.then||typeof i.then!="function"?(this.unlock(),i):i.then(function(r){return n.unlock(),r}).catch(function(r){throw n.unlock(),r})},requestIdlePromise:function(t){var n=this;t=t||{};var i,r=new Promise(function(a){return i=a}),s=function(){Fp(n,r),i()};if(r._manRes=s,t.timeout){var o=setTimeout(function(){r._manRes()},t.timeout);r._timeoutObj=o}return this._iC.add(r),Wm(this),r},cancelIdlePromise:function(t){Fp(this,t)},requestIdleCallback:function(t,n){var i=this._lHN++,r=this.requestIdlePromise(n);return this._hPM.set(i,r),this._pHM.set(r,i),r.then(function(){return t()}),i},cancelIdleCallback:function(t){var n=this._hPM.get(t);this.cancelIdlePromise(n)},clear:function(){var t=this;this._iC.forEach(function(n){return Fp(t,n)}),this._qC=0,this._iC.clear(),this._hPM=new Map,this._pHM=new Map}};function QP(e){if(e._iC.size!==0){var t=e._iC.values(),n=t.next().value;n._manRes(),setTimeout(function(){return Wm(e)},0)}}function Fp(e,t){if(t){if(t._timeoutObj&&clearTimeout(t._timeoutObj),e._pHM.has(t)){var n=e._pHM.get(t);e._hPM.delete(n),e._pHM.delete(t)}e._iC.delete(t)}}function Wm(e){e._tryIR||e._iC.size===0||(e._tryIR=!0,setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}QP(e),e._tryIR=!1},0)},0))}let ZP=class{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){return this.map.has(t)}add(t){this.map.set(t,$x()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,JP(this)},0))}clear(){this.map.clear()}};function JP(e){const t=$x()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)return;const r=i[0];if(i[1]<t)e.map.delete(r);else return}}function $x(){return Date.now()}var Hm=new Set,Ky=new Map,P0=(function(){function e(n,i,r,s,o,a,c=!1,l={},u,h,d,f,p,m){this.idleQueue=new Dx,this.rxdbVersion=V$,this.storageInstances=new Set,this._subs=[],this.startupErrors=[],this.onClose=[],this.closed=!1,this.collections={},this.states={},this.eventBulks$=new Fe,this.closePromise=null,this.observable$=this.eventBulks$.pipe(nr(g=>q1(g))),this.storageToken=er,this.storageTokenDocument=er,this.emittedEventBulkIds=new ZP(60*1e3),this.name=n,this.token=i,this.storage=r,this.instanceCreationOptions=s,this.password=o,this.multiInstance=a,this.eventReduce=c,this.options=l,this.internalStore=u,this.hashFunction=h,this.cleanupPolicy=d,this.allowSlowCount=f,this.reactivity=p,this.onClosed=m,this.name!=="pseudoInstance"&&(this.internalStore=S0(this.asRxDatabase,u,O0),this.storageTokenDocument=LP(this.asRxDatabase).catch(g=>this.startupErrors.push(g)),this.storageToken=this.storageTokenDocument.then(g=>g.data.token).catch(g=>this.startupErrors.push(g)))}var t=e.prototype;return t.getReactivityFactory=function(){if(!this.reactivity)throw U("DB14",{database:this.name});return this.reactivity},t.$emit=function(i){this.emittedEventBulkIds.has(i.id)||(this.emittedEventBulkIds.add(i.id),this.eventBulks$.next(i))},t.removeCollectionDoc=async function(i,r){var s=await wc(this.internalStore,Lo(Rd(i,r),Ds));if(!s)throw U("SNH",{name:i,schema:r});var o=Rf(s);o._deleted=!0,await this.internalStore.bulkWrite([{document:o,previous:s}],"rx-database-remove-collection")},t.addCollections=async function(i){var r={},s={},o=[],a={};await Promise.all(Object.entries(i).map(async([u,h])=>{var d=u,f=h.schema;r[d]=f;var p=sT(f,this.hashFunction);if(s[d]=p,this.collections[u])throw U("DB3",{name:u});var m=Rd(u,f),g={id:Lo(m,Ds),key:m,context:Ds,data:{name:d,schemaHash:await p.hash,schema:p.jsonSchema,version:p.version,connectedStorages:[]},_deleted:!1,_meta:yc(),_rev:Ii(),_attachments:{}};o.push({document:g});var b=Object.assign({},h,{name:d,schema:p,database:this}),_=qt(h);_.database=this,_.name=u,zn("preCreateRxCollection",_),b.conflictHandler=_.conflictHandler,a[d]=b}));var c=await this.internalStore.bulkWrite(o,"rx-database-add-collection");await rR(this),await Promise.all(c.error.map(async u=>{if(u.status!==409)throw U("DB12",{database:this.name,writeError:u});var h=Q(u.documentInDb),d=h.data.name,f=s[d];if(h.data.schemaHash!==await f.hash)throw U("DB6",{database:this.name,collection:d,previousSchemaHash:h.data.schemaHash,schemaHash:await f.hash,previousSchema:h.data.schema,schema:Q(r[d])})}));var l={};return await Promise.all(Object.keys(i).map(async u=>{var h=a[u],d=await XP(h);l[u]=d,this.collections[u]=d,this[u]||Object.defineProperty(this,u,{get:()=>this.collections[u]})})),l},t.lockedRun=function(i){return this.idleQueue.wrapCall(i)},t.requestIdlePromise=function(){return this.idleQueue.requestIdlePromise()},t.exportJSON=function(i){throw Rt("json-dump")},t.addState=function(i){throw Rt("state")},t.importJSON=function(i){throw Rt("json-dump")},t.backup=function(i){throw Rt("backup")},t.leaderElector=function(){throw Rt("leader-election")},t.isLeader=function(){throw Rt("leader-election")},t.waitForLeadership=function(){throw Rt("leader-election")},t.migrationStates=function(){throw Rt("migration-schema")},t.close=function(){if(this.closePromise)return this.closePromise;var{promise:i,resolve:r}=Tx(),s=o=>{this.onClosed&&this.onClosed(),this.closed=!0,r(o)};return this.closePromise=i,(async()=>{if(await Io("preCloseRxDatabase",this),this.eventBulks$.complete(),this._subs.map(o=>o.unsubscribe()),this.name==="pseudoInstance"){s(!1);return}return this.requestIdlePromise().then(()=>Promise.all(this.onClose.map(o=>o()))).then(()=>Promise.all(Object.keys(this.collections).map(o=>this.collections[o]).map(o=>o.close()))).then(()=>this.internalStore.close()).then(()=>s(!0))})(),i},t.remove=function(){return this.close().then(()=>nR(this.name,this.storage,this.multiInstance,this.password))},Hs(e,[{key:"$",get:function(){return this.observable$}},{key:"asRxDatabase",get:function(){return this}}])})();function tR(e,t){if(Hm.has(Ix(e,t)))throw U("DB8",{name:e,storage:t.name,link:"https://rxdb.info/rx-database.html#ignoreduplicate"})}function Tx(){var e,t,n=new Promise((i,r)=>{e=i,t=r});return{promise:n,resolve:e,reject:t}}function Ix(e,t){return t.name+"|"+e}async function Ox(e,t,n,i,r,s){var o=await t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:mO,schema:O0,options:i,multiInstance:r,password:s,devMode:At.isDevMode()});return o}function eR({storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r=!0,eventReduce:s=!0,ignoreDuplicate:o=!1,options:a={},cleanupPolicy:c,closeDuplicates:l=!1,allowSlowCount:u=!1,localDocuments:h=!1,hashFunction:d=y1,reactivity:f}){zn("preCreateRxDatabase",{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r,eventReduce:s,ignoreDuplicate:o,options:a,localDocuments:h});var p=Ix(n,e),m=Ky.get(p)||new Set,g=Tx(),b=Array.from(m),_=()=>{m.delete(g.promise),Hm.delete(p)};return m.add(g.promise),Ky.set(p,m),(async()=>{if(l&&await Promise.all(b.map($=>$.catch(()=>null).then(D=>D&&D.close()))),o){if(!At.isDevMode())throw U("DB9",{database:n})}else tR(n,e);Hm.add(p);var C=Qo(10),S=await Ox(C,e,n,t,r,i),k=new P0(n,C,e,t,i,r,s,a,S,d,c,u,f,_);return await Io("createRxDatabase",{database:k,creator:{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r,eventReduce:s,ignoreDuplicate:o,options:a,localDocuments:h}}),k})().then(C=>{g.resolve(C)}).catch(C=>{g.reject(C),_()}),g.promise}async function nR(e,t,n=!0,i){var r=Qo(10),s=await Ox(r,t,e,{},n,i),o=await wx(s),a=new Set;o.forEach(l=>a.add(l.data.name));var c=Array.from(a);return await Promise.all(c.map(l=>kx(t,s,r,e,l,n,i))),await Io("postRemoveRxDatabase",{databaseName:e,storage:t}),await s.remove(),c}function iR(e){return e instanceof P0}async function rR(e){if(await e.storageToken,e.startupErrors[0])throw e.startupErrors[0]}var sR={RxSchema:k1.prototype,RxDocument:Af,RxQuery:_x.prototype,RxCollection:Mx.prototype,RxDatabase:P0.prototype},zp=new Set,Gy=new Set;function R0(e){if(zn("preAddRxPlugin",{plugin:e,plugins:zp}),!zp.has(e)){{if(Gy.has(e.name))throw U("PL3",{name:e.name,plugin:e});zp.add(e),Gy.add(e.name)}if(!e.rxdb)throw Md("PL1",{plugin:e});e.init&&e.init(),e.prototypes&&Object.entries(e.prototypes).forEach(([t,n])=>n(sR[t])),e.overwritable&&Object.assign(At,e.overwritable),e.hooks&&Object.entries(e.hooks).forEach(([t,n])=>{n.after&&nu[t].push(n.after),n.before&&nu[t].unshift(n.before)})}}async function Ld(e,t){var n=Us(e.input.metaInstance.schema,{isCheckpoint:"1",itemId:t}),i=await e.input.metaInstance.findDocumentsById([n],!1),r=i[0];if(e.lastCheckpointDoc[t]=r,r)return r.checkpointData}async function Nd(e,t,n){e.checkpointQueue=e.checkpointQueue.then(async()=>{var i=e.lastCheckpointDoc[t];if(n&&!e.events.canceled.getValue()&&(!i||JSON.stringify(i.checkpointData)!==JSON.stringify(n))){var r={id:"",isCheckpoint:"1",itemId:t,_deleted:!1,_attachments:{},checkpointData:n,_meta:yc(),_rev:Ii()};for(r.id=Us(e.input.metaInstance.schema,r);!e.events.canceled.getValue();){if(i&&(r.checkpointData=hu([i.checkpointData,r.checkpointData])),r._meta.lwt=Ri(),r._rev=jr(await e.checkpointKey,i),e.events.canceled.getValue())return;var s=[{previous:i,document:r}],o=await e.input.metaInstance.bulkWrite(s,"replication-set-checkpoint"),a=bi(e.primaryPath,s,o)[0];if(a){e.lastCheckpointDoc[t]=a;return}else{var c=o.error[0];if(c.status!==409)throw c;i=Q(c.documentInDb),r._rev=jr(await e.checkpointKey,i)}}}}),await e.checkpointQueue}async function oR(e){var t=await e.hashFunction([e.identifier,e.forkInstance.databaseName,e.forkInstance.collectionName].join("||"));return"rx_storage_replication_"+t}function Xy(e,t,n,i,r){var s=Object.assign({},i,{_attachments:t&&i._attachments?i._attachments:{},_meta:n?i._meta:Object.assign({},r?r._meta:{},{lwt:Ri()}),_rev:n?i._rev:Ii()});return s._rev||(s._rev=jr(e,r)),s}function os(e,t,n){var i=qt(e);return t||delete i._attachments,n||(delete i._meta,delete i._rev),i}function Um(e,t){return e.hasAttachments?t.map(n=>{var i=Fn(n.document);return i.docData=Vi(i.docData),{document:i,previous:n.previous}}):t}function Ym(e){for(;;)if(e.underlyingPersistentStorage)e=e.underlyingPersistentStorage;else return e}var Hh="RxReplicationProtocolMetaData";function qm(e,t){var n=Q$(e),i={title:Hh,primaryKey:{key:"id",fields:["itemId","isCheckpoint"],separator:"|"},type:"object",version:e.version,additionalProperties:!1,properties:{id:{type:"string",minLength:1,maxLength:n+2},isCheckpoint:{type:"string",enum:["0","1"],minLength:1,maxLength:1},itemId:{type:"string",maxLength:n>4?n:4},checkpointData:{type:"object",additionalProperties:!0},docData:{type:"object",properties:e.properties},isResolvedConflict:{type:"string"}},keyCompression:e.keyCompression,required:["id","isCheckpoint","itemId"]};t&&(i.encrypted=["docData"]);var r=Df(i);return r}function Px(e,t){return e.input.metaInstance.findDocumentsById(t.map(n=>{var i=Us(e.input.metaInstance.schema,{itemId:n,isCheckpoint:"0"});return i}),!0).then(n=>{var i={};return Object.values(n).forEach(r=>{i[r.itemId]={docData:r.docData,metaDocument:r}}),i})}async function Fd(e,t,n,i){var r=t[e.primaryPath],s=n?Rf(n):{id:"",isCheckpoint:"0",itemId:r,docData:t,_attachments:{},_deleted:!1,_rev:Ii(),_meta:{lwt:0}};s.docData=t,i&&(s.isResolvedConflict=i),s._meta.lwt=Ri(),s.id=Us(e.input.metaInstance.schema,s),s._rev=jr(await e.checkpointKey,n);var o={previous:n,document:s};return o}async function aR(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.downstream){var t=await Ld(e,"down");t||await Nd(e,"down",e.input.initialCheckpoint.downstream)}var n=await e.input.hashFunction(e.input.identifier),i=e.input.replicationHandler,r=0,s=[];function o(p){e.stats.down.addNewTask=e.stats.down.addNewTask+1;var m={time:r++,task:p};s.push(m),e.streamQueue.down=e.streamQueue.down.then(()=>{for(var g=[];s.length>0;){e.events.active.down.next(!0);var b=Q(s.shift());if(!(b.time<c)){if(b.task==="RESYNC")if(g.length===0){g.push(b.task);break}else break;g.push(b.task)}}if(g.length!==0)return g[0]==="RESYNC"?l():u(g)}).then(()=>{e.events.active.down.next(!1),!e.firstSyncDone.down.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.down.next(!0)})}if(o("RESYNC"),!e.events.canceled.getValue()){var a=i.masterChangeStream$.pipe(nr(async p=>(await Pr(e.events.active.up.pipe(It(m=>!m))),p))).subscribe(p=>{e.stats.down.masterChangeStreamEmit=e.stats.down.masterChangeStreamEmit+1,o(p)});Pr(e.events.canceled.pipe(It(p=>!!p))).then(()=>a.unsubscribe())}var c=-1;async function l(){if(e.stats.down.downstreamResyncOnce=e.stats.down.downstreamResyncOnce+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>Ld(e,"down"));for(var p=await e.checkpointQueue,m=[];!e.events.canceled.getValue();){c=r++;var g=await i.masterChangesSince(p,e.input.pullBatchSize);if(g.documents.length===0||(p=hu([p,g.checkpoint]),m.push(f(g.documents,p)),g.documents.length<e.input.pullBatchSize))break}await Promise.all(m)}}function u(p){e.stats.down.downstreamProcessChanges=e.stats.down.downstreamProcessChanges+1;var m=[],g=null;return p.forEach(b=>{if(b==="RESYNC")throw new Error("SNH");To(m,b.documents),g=hu([g,b.checkpoint])}),f(m,Q(g))}var h=di,d={docs:{}};function f(p,m){var g=e.primaryPath;return e.stats.down.persistFromMaster=e.stats.down.persistFromMaster+1,p.forEach(b=>{var _=b[g];d.docs[_]=b}),d.checkpoint=m,h=h.then(()=>{var b=d.docs;d.docs={};var _=d.checkpoint,C=Object.keys(b);if(e.events.canceled.getValue()||C.length===0)return di;var S=[],k={},$={},D=[];return Promise.all([e.input.forkInstance.findDocumentsById(C,!0),Px(e,C)]).then(([w,x])=>{var M=new Map;return w.forEach(I=>M.set(I[g],I)),Promise.all(C.map(async I=>{var T=M.get(I),R=T?os(T,e.hasAttachments,!1):void 0,j=b[I],z=x[I];z&&T&&z.metaDocument.isResolvedConflict===T._rev&&await e.streamQueue.up;var Y=!z||!R?!1:e.input.conflictHandler.isEqual(z.docData,R,"downstream-check-if-equal-0");if(!Y&&z&&z.docData._rev&&T&&T._meta[e.input.identifier]&&Os(T._rev)===T._meta[e.input.identifier]&&(Y=!0),T&&z&&Y===!1||T&&!z)return di;var F=R?e.input.conflictHandler.isEqual(j,R,"downstream-check-if-equal-1"):!1;if(R&&F)return(!z||Y===!1)&&D.push(await Fd(e,R,z?z.metaDocument:void 0)),di;var G=Object.assign({},j,T?{_meta:qt(T._meta),_attachments:e.hasAttachments&&j._attachments?j._attachments:{},_rev:Ii()}:{_meta:{lwt:Ri()},_rev:Ii(),_attachments:e.hasAttachments&&j._attachments?j._attachments:{}});if(j._rev){var B=T?Os(T._rev)+1:1;G._meta[e.input.identifier]=B,e.input.keepMeta&&(G._rev=j._rev)}e.input.keepMeta&&j._meta&&(G._meta=j._meta);var q={previous:T,document:G};q.document._rev=q.document._rev?q.document._rev:jr(n,q.previous),S.push(q),k[I]=q,$[I]=await Fd(e,j,z?z.metaDocument:void 0)}))}).then(async()=>{if(S.length>0)return e.input.forkInstance.bulkWrite(S,await e.downstreamBulkWriteFlag).then(w=>{var x=bi(e.primaryPath,S,w);x.forEach(I=>{var T=I[g];e.events.processed.down.next(k[T]),D.push($[T])});var M;if(w.error.forEach(I=>{if(I.status!==409){var T=U("RC_PULL",{writeError:I});e.events.error.next(T),M=T}}),M)throw M})}).then(()=>{if(D.length>0)return e.input.metaInstance.bulkWrite(Um(e,D),"replication-down-write-meta").then(w=>{w.error.forEach(x=>{e.events.error.next(U("RC_PULL",{id:x.documentId,writeError:x}))})})}).then(()=>{Nd(e,"down",_)})}).catch(b=>e.events.error.next(b)),h}}async function cR(e,t,n){var i=e.input.conflictHandler,r=i.isEqual(t.realMasterState,t.newDocumentState,"replication-resolve-conflict");if(!r){var s=await i.resolve(t,"replication-resolve-conflict"),o=Object.assign({},s,{_meta:qt(n._meta),_rev:Ii(),_attachments:qt(n._attachments)});return o._meta.lwt=Ri(),o._rev=jr(await e.checkpointKey,n),o}}async function Vm(e,t,n,i){if(!n._attachments||i&&!i._attachments)throw new Error("_attachments missing");var r=n[e],s=new Set(i&&i._attachments?Object.keys(i._attachments):[]);return await Promise.all(Object.entries(n._attachments).map(async([o,a])=>{if((!s.has(o)||i&&Q(i._attachments)[o].digest!==a.digest)&&!a.data){var c=await t.getAttachmentData(r,o,a.digest);a.data=c}})),n}async function lR(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.upstream){var t=await Ld(e,"up");t||await Nd(e,"up",e.input.initialCheckpoint.upstream)}var n=e.input.replicationHandler;e.streamQueue.up=e.streamQueue.up.then(()=>u().then(()=>h()));var i=0,r=-1,s=[],o=er,a={docs:{}},c=e.input.forkInstance.changeStream().subscribe(f=>{if(!e.events.paused.getValue())return e.stats.up.forkChangeStreamEmit=e.stats.up.forkChangeStreamEmit+1,s.push({task:f,time:i++}),e.events.active.up.getValue()||e.events.active.up.next(!0),e.input.waitBeforePersist?e.input.waitBeforePersist().then(()=>h()):h()}),l=n.masterChangeStream$.pipe(It(f=>f==="RESYNC")).subscribe(()=>{s.push({task:"RESYNC",time:i++}),h()});Pr(e.events.canceled.pipe(It(f=>!!f))).then(()=>{c.unsubscribe(),l.unsubscribe()});async function u(){if(e.stats.up.upstreamInitialSync=e.stats.up.upstreamInitialSync+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>Ld(e,"up"));for(var f=await e.checkpointQueue,p=new Set,m=async function(){r=i++,p.size>3&&await Promise.race(Array.from(p));var _=await lx(e.input.forkInstance,e.input.pushBatchSize,f);if(_.documents.length===0)return 1;f=hu([f,_.checkpoint]);var C=d(_.documents,Q(f));p.add(C),C.catch().then(()=>p.delete(C))};!e.events.canceled.getValue()&&!await m(););var g=await Promise.all(p),b=g.find(_=>!!_);b?await u():!e.firstSyncDone.up.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.up.next(!0)}}function h(){if(e.events.canceled.getValue()||s.length===0){e.events.active.up.next(!1);return}e.stats.up.processTasks=e.stats.up.processTasks+1,e.events.active.up.next(!0),e.streamQueue.up=e.streamQueue.up.then(async()=>{for(var f=[],p;s.length>0;){var m=Q(s.shift());if(!(m.time<r)){if(m.task==="RESYNC"){e.events.active.up.next(!1),await u();return}m.task.context!==await e.downstreamBulkWriteFlag&&To(f,m.task.events.map(g=>g.documentData)),p=hu([p,m.task.checkpoint])}}if(await d(f,p),s.length===0)e.events.active.up.next(!1);else return h()})}function d(f,p){return e.stats.up.persistToMaster=e.stats.up.persistToMaster+1,f.forEach(m=>{var g=m[e.primaryPath];a.docs[g]=m}),a.checkpoint=p,o=o.then(async()=>{if(e.events.canceled.getValue())return!1;var m=a.docs;a.docs={};var g=a.checkpoint,b=Object.keys(m);function _(){return Nd(e,"up",g)}if(b.length===0)return _(),!1;var C=await Px(e,b),S={},k=[],$={},D={};if(await Promise.all(b.map(async q=>{var W=m[q];D[q]=W;var V=os(W,e.hasAttachments,!!e.input.keepMeta),L=C[q];L&&L.metaDocument.isResolvedConflict!==W._rev&&e.input.conflictHandler.isEqual(L.docData,V,"upstream-check-if-equal")||L&&L.docData._rev&&Os(W._rev)===W._meta[e.input.identifier]||(k.push(q),S[q]={assumedMasterState:L?L.docData:void 0,newDocumentState:V},$[q]=await Fd(e,V,L?L.metaDocument:void 0))})),k.length===0)return _(),!1;var w=Object.values(S),x=new Set,M={},I=E$(w,e.input.pushBatchSize);await Promise.all(I.map(async q=>{e.hasAttachments&&await Promise.all(q.map(async V=>{V.newDocumentState=await Vm(e.primaryPath,e.input.forkInstance,Fn(V.newDocumentState),V.assumedMasterState)}));var W=await n.masterWrite(q);W.forEach(V=>{var L=V[e.primaryPath];x.add(L),M[L]=V})}));var T=[];if(k.forEach(q=>{x.has(q)||(e.events.processed.up.next(S[q]),T.push($[q]))}),e.events.canceled.getValue())return!1;T.length>0&&await e.input.metaInstance.bulkWrite(Um(e,T),"replication-up-write-meta");var R=!1;if(x.size>0){e.stats.up.persistToMasterHadConflicts=e.stats.up.persistToMasterHadConflicts+1;var j=[],z={};if(await Promise.all(Object.entries(M).map(([q,W])=>{var V=S[q],L={newDocumentState:V.newDocumentState,assumedMasterState:V.assumedMasterState,realMasterState:W};return cR(e,L,D[q]).then(async ot=>{if(ot){e.events.resolvedConflicts.next({input:L,output:ot}),j.push({previous:D[q],document:ot});var kt=C[q];z[q]=await Fd(e,Q(W),kt?kt.metaDocument:void 0,ot._rev)}})})),j.length>0){R=!0,e.stats.up.persistToMasterConflictWrites=e.stats.up.persistToMasterConflictWrites+1;var Y=await e.input.forkInstance.bulkWrite(j,"replication-up-write-conflict"),F;if(Y.error.forEach(q=>{if(q.status!==409){var W=U("RC_PUSH",{writeError:q});e.events.error.next(W),F=W}}),F)throw F;var G=[],B=bi(e.primaryPath,j,Y);B.forEach(q=>{var W=q[e.primaryPath];G.push(z[W])}),G.length>0&&await e.input.metaInstance.bulkWrite(Um(e,G),"replication-up-write-conflict-meta")}}return _(),R}).catch(m=>(e.events.error.next(m),!1)),o}}function Rx(e){e=qt(e),e.forkInstance=Ym(e.forkInstance),e.metaInstance=Ym(e.metaInstance);var t=oR(e),n={primaryPath:Ai(e.forkInstance.schema.primaryKey),hasAttachments:!!e.forkInstance.schema.attachments,input:e,checkpointKey:t,downstreamBulkWriteFlag:t.then(i=>"replication-downstream-"+i),events:{canceled:new ui(!1),paused:new ui(!1),active:{down:new ui(!0),up:new ui(!0)},processed:{down:new Fe,up:new Fe},resolvedConflicts:new Fe,error:new Fe},stats:{down:{addNewTask:0,downstreamProcessChanges:0,downstreamResyncOnce:0,masterChangeStreamEmit:0,persistFromMaster:0},up:{forkChangeStreamEmit:0,persistToMaster:0,persistToMasterConflictWrites:0,persistToMasterHadConflicts:0,processTasks:0,upstreamInitialSync:0}},firstSyncDone:{down:new ui(!1),up:new ui(!1)},streamQueue:{down:di,up:di},checkpointQueue:di,lastCheckpointDoc:{}};return aR(n),lR(n),n}function Uh(e){return Pr(_0([e.firstSyncDone.down.pipe(It(t=>!!t)),e.firstSyncDone.up.pipe(It(t=>!!t))])).then(()=>{})}function Km(e){return Promise.all([e.streamQueue.up,e.streamQueue.down,e.checkpointQueue])}function uR(e,t,n,i=!1){e=Ym(e);var r=!!e.schema.attachments,s=Ai(e.schema.primaryKey),o={masterChangeStream$:e.changeStream().pipe(nr(async a=>{var c={checkpoint:a.checkpoint,documents:await Promise.all(a.events.map(async l=>{var u=os(l.documentData,r,i);return r&&(u=await Vm(s,e,Fn(u),void 0)),u}))};return c})),masterChangesSince(a,c){return lx(e,c,a).then(async l=>({checkpoint:l.documents.length>0?l.checkpoint:a,documents:await Promise.all(l.documents.map(async u=>{var h=os(u,r,i);return r&&(h=await Vm(s,e,Fn(h),void 0)),h}))}))},async masterWrite(a){var c={};a.forEach(m=>{var g=m.newDocumentState[s];c[g]=m});var l=Object.keys(c),u=await e.findDocumentsById(l,!0),h=new Map;u.forEach(m=>h.set(m[s],m));var d=[],f=[];if(await Promise.all(Object.entries(c).map(([m,g])=>{var b=h.get(m);b?b&&!g.assumedMasterState?d.push(os(b,r,i)):t.isEqual(os(b,r,i),Q(g.assumedMasterState),"rxStorageInstanceToReplicationHandler-masterWrite")===!0?f.push({previous:b,document:Xy(n,r,i,g.newDocumentState,b)}):d.push(os(b,r,i)):f.push({document:Xy(n,r,i,g.newDocumentState)})})),f.length>0){var p=await e.bulkWrite(f,"replication-master-write");p.error.forEach(m=>{if(m.status!==409)throw U("SNH",{name:"non conflict error",error:m});d.push(os(Q(m.documentInDb),r,i))})}return d}};return o}async function Ax(e){e.events.canceled.next(!0),e.events.active.up.complete(),e.events.active.down.complete(),e.events.processed.up.complete(),e.events.processed.down.complete(),e.events.resolvedConflicts.complete(),e.events.canceled.complete(),await e.checkpointQueue}function hR(e){return e&&typeof e.then=="function"}Promise.resolve(!1);var dR=Promise.resolve(!0),Rr=Promise.resolve();function vo(e,t){return e||(e=0),new Promise(function(n){return setTimeout(function(){return n(t)},e)})}function fR(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function Bu(){return Math.random().toString(36).substring(2)}var jp=0;function Wu(){var e=Date.now()*1e3;return e<=jp&&(e=jp+1),jp=e,e}function pR(){return typeof navigator<"u"&&typeof navigator.locks<"u"&&typeof navigator.locks.request=="function"}var mR=Wu,gR="native";function vR(e){var t={time:Wu(),messagesCallback:null,bc:new BroadcastChannel(e),subFns:[]};return t.bc.onmessage=function(n){t.messagesCallback&&t.messagesCallback(n.data)},t}function yR(e){e.bc.close(),e.subFns=[]}function bR(e,t){try{return e.bc.postMessage(t,!1),Rr}catch(n){return Promise.reject(n)}}function _R(e,t){e.messagesCallback=t}function wR(){if(typeof globalThis<"u"&&globalThis.Deno&&globalThis.Deno.args)return!0;if((typeof window<"u"||typeof self<"u")&&typeof BroadcastChannel=="function"){if(BroadcastChannel._pubkey)throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");return!0}else return!1}function xR(){return 150}var CR={create:vR,close:yR,onMessage:_R,postMessage:bR,canBeUsed:wR,type:gR,averageResponseTime:xR,microSeconds:mR};class Lx{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){const n=this.map.get(t);return typeof n>"u"?!1:n<Gm()-this.ttl?(this.map.delete(t),!1):!0}add(t){this.map.delete(t),this.map.set(t,Gm()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,kR(this)},0))}clear(){this.map.clear()}}function kR(e){const t=Gm()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)break;const r=i[0];if(i[1]<t)e.map.delete(r);else break}}function Gm(){return Date.now()}function A0(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=JSON.parse(JSON.stringify(e));return typeof t.webWorkerSupport>"u"&&(t.webWorkerSupport=!0),t.idb||(t.idb={}),t.idb.ttl||(t.idb.ttl=1e3*45),t.idb.fallbackInterval||(t.idb.fallbackInterval=150),e.idb&&typeof e.idb.onclose=="function"&&(t.idb.onclose=e.idb.onclose),t.localstorage||(t.localstorage={}),t.localstorage.removeTimeout||(t.localstorage.removeTimeout=1e3*60),e.methods&&(t.methods=e.methods),t.node||(t.node={}),t.node.ttl||(t.node.ttl=1e3*60*2),t.node.maxParallelWrites||(t.node.maxParallelWrites=2048),typeof t.node.useFastPath>"u"&&(t.node.useFastPath=!0),t}var SR=Wu,ER="pubkey.broadcast-channel-0-",Wr="messages",Lf={durability:"relaxed"},MR="idb";function Nx(){if(typeof indexedDB<"u")return indexedDB;if(typeof window<"u"){if(typeof window.mozIndexedDB<"u")return window.mozIndexedDB;if(typeof window.webkitIndexedDB<"u")return window.webkitIndexedDB;if(typeof window.msIndexedDB<"u")return window.msIndexedDB}return!1}function L0(e){e.commit&&e.commit()}function DR(e){var t=Nx(),n=ER+e,i=t.open(n);return i.onupgradeneeded=function(r){var s=r.target.result;s.createObjectStore(Wr,{keyPath:"id",autoIncrement:!0})},new Promise(function(r,s){i.onerror=function(o){return s(o)},i.onsuccess=function(){r(i.result)}})}function $R(e,t,n){var i=Date.now(),r={uuid:t,time:i,data:n},s=e.transaction([Wr],"readwrite",Lf);return new Promise(function(o,a){s.oncomplete=function(){return o()},s.onerror=function(l){return a(l)};var c=s.objectStore(Wr);c.add(r),L0(s)})}function TR(e,t){var n=e.transaction(Wr,"readonly",Lf),i=n.objectStore(Wr),r=[],s=IDBKeyRange.bound(t+1,1/0);if(i.getAll){var o=i.getAll(s);return new Promise(function(c,l){o.onerror=function(u){return l(u)},o.onsuccess=function(u){c(u.target.result)}})}function a(){try{return s=IDBKeyRange.bound(t+1,1/0),i.openCursor(s)}catch{return i.openCursor()}}return new Promise(function(c,l){var u=a();u.onerror=function(h){return l(h)},u.onsuccess=function(h){var d=h.target.result;d?d.value.id<t+1?d.continue(t+1):(r.push(d.value),d.continue()):(L0(n),c(r))}})}function IR(e,t){if(e.closed)return Promise.resolve([]);var n=e.db.transaction(Wr,"readwrite",Lf),i=n.objectStore(Wr);return Promise.all(t.map(function(r){var s=i.delete(r);return new Promise(function(o){s.onsuccess=function(){return o()}})}))}function OR(e,t){var n=Date.now()-t,i=e.transaction(Wr,"readonly",Lf),r=i.objectStore(Wr),s=[];return new Promise(function(o){r.openCursor().onsuccess=function(a){var c=a.target.result;if(c){var l=c.value;l.time<n?(s.push(l),c.continue()):(L0(i),o(s))}else o(s)}})}function PR(e){return OR(e.db,e.options.idb.ttl).then(function(t){return IR(e,t.map(function(n){return n.id}))})}function RR(e,t){return t=A0(t),DR(e).then(function(n){var i={closed:!1,lastCursorId:0,channelName:e,options:t,uuid:Bu(),eMIs:new Lx(t.idb.ttl*2),writeBlockPromise:Rr,messagesCallback:null,readQueuePromises:[],db:n};return n.onclose=function(){i.closed=!0,t.idb.onclose&&t.idb.onclose()},Fx(i),i})}function Fx(e){e.closed||zx(e).then(function(){return vo(e.options.idb.fallbackInterval)}).then(function(){return Fx(e)})}function AR(e,t){return!(e.uuid===t.uuid||t.eMIs.has(e.id)||e.data.time<t.messagesCallbackTime)}function zx(e){return e.closed||!e.messagesCallback?Rr:TR(e.db,e.lastCursorId).then(function(t){var n=t.filter(function(i){return!!i}).map(function(i){return i.id>e.lastCursorId&&(e.lastCursorId=i.id),i}).filter(function(i){return AR(i,e)}).sort(function(i,r){return i.time-r.time});return n.forEach(function(i){e.messagesCallback&&(e.eMIs.add(i.id),e.messagesCallback(i.data))}),Rr})}function LR(e){e.closed=!0,e.db.close()}function NR(e,t){return e.writeBlockPromise=e.writeBlockPromise.then(function(){return $R(e.db,e.uuid,t)}).then(function(){fR(0,10)===0&&PR(e)}),e.writeBlockPromise}function FR(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t,zx(e)}function zR(){return!!Nx()}function jR(e){return e.idb.fallbackInterval*2}var BR={create:RR,close:LR,onMessage:FR,postMessage:NR,canBeUsed:zR,type:MR,averageResponseTime:jR,microSeconds:SR},WR=Wu,HR="pubkey.broadcastChannel-",UR="localstorage";function jx(){var e;if(typeof window>"u")return null;try{e=window.localStorage,e=window["ie8-eventlistener/storage"]||window.localStorage}catch{}return e}function Bx(e){return HR+e}function YR(e,t){return new Promise(function(n){vo().then(function(){var i=Bx(e.channelName),r={token:Bu(),time:Date.now(),data:t,uuid:e.uuid},s=JSON.stringify(r);jx().setItem(i,s);var o=document.createEvent("Event");o.initEvent("storage",!0,!0),o.key=i,o.newValue=s,window.dispatchEvent(o),n()})})}function qR(e,t){var n=Bx(e),i=function(s){s.key===n&&t(JSON.parse(s.newValue))};return window.addEventListener("storage",i),i}function VR(e){window.removeEventListener("storage",e)}function KR(e,t){if(t=A0(t),!Wx())throw new Error("BroadcastChannel: localstorage cannot be used");var n=Bu(),i=new Lx(t.localstorage.removeTimeout),r={channelName:e,uuid:n,eMIs:i};return r.listener=qR(e,function(s){r.messagesCallback&&s.uuid!==n&&(!s.token||i.has(s.token)||s.data.time&&s.data.time<r.messagesCallbackTime||(i.add(s.token),r.messagesCallback(s.data)))}),r}function GR(e){VR(e.listener)}function XR(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t}function Wx(){var e=jx();if(!e)return!1;try{var t="__broadcastchannel_check";e.setItem(t,"works"),e.removeItem(t)}catch{return!1}return!0}function QR(){var e=120,t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")?e*2:e}var ZR={create:KR,close:GR,onMessage:XR,postMessage:YR,canBeUsed:Wx,type:UR,averageResponseTime:QR,microSeconds:WR},Hx=Wu,JR="simulate",N0=new Set;function tA(e){var t={time:Hx(),name:e,messagesCallback:null};return N0.add(t),t}function eA(e){N0.delete(e)}var Ux=5;function nA(e,t){return new Promise(function(n){return setTimeout(function(){var i=Array.from(N0);i.forEach(function(r){r.name===e.name&&r!==e&&r.messagesCallback&&r.time<t.time&&r.messagesCallback(t)}),n()},Ux)})}function iA(e,t){e.messagesCallback=t}function rA(){return!0}function sA(){return Ux}var oA={create:tA,close:eA,onMessage:iA,postMessage:nA,canBeUsed:rA,type:JR,averageResponseTime:sA,microSeconds:Hx},Qy=[CR,BR,ZR];function aA(e){var t=[].concat(e.methods,Qy).filter(Boolean);if(e.type){if(e.type==="simulate")return oA;var n=t.find(function(r){return r.type===e.type});if(n)return n;throw new Error("method-type "+e.type+" not found")}e.webWorkerSupport||(t=t.filter(function(r){return r.type!=="idb"}));var i=t.find(function(r){return r.canBeUsed()});if(i)return i;throw new Error("No usable method found in "+JSON.stringify(Qy.map(function(r){return r.type})))}var Yx=new Set,cA=0,Nf=function(t,n){this.id=cA++,Yx.add(this),this.name=t,this.options=A0(n),this.method=aA(this.options),this._iL=!1,this._onML=null,this._addEL={message:[],internal:[]},this._uMP=new Set,this._befC=[],this._prepP=null,lA(this)};Nf._pubkey=!0;Nf.prototype={postMessage:function(t){if(this.closed)throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed "+JSON.stringify(t));return Zy(this,"message",t)},postInternal:function(t){return Zy(this,"internal",t)},set onmessage(e){var t=this.method.microSeconds(),n={time:t,fn:e};tb(this,"message",this._onML),e&&typeof e=="function"?(this._onML=n,Jy(this,"message",n)):this._onML=null},addEventListener:function(t,n){var i=this.method.microSeconds(),r={time:i,fn:n};Jy(this,t,r)},removeEventListener:function(t,n){var i=this._addEL[t].find(function(r){return r.fn===n});tb(this,t,i)},close:function(){var t=this;if(!this.closed){Yx.delete(this),this.closed=!0;var n=this._prepP?this._prepP:Rr;return this._onML=null,this._addEL.message=[],n.then(function(){return Promise.all(Array.from(t._uMP))}).then(function(){return Promise.all(t._befC.map(function(i){return i()}))}).then(function(){return t.method.close(t._state)})}},get type(){return this.method.type},get isClosed(){return this.closed}};function Zy(e,t,n){var i=e.method.microSeconds(),r={time:i,type:t,data:n},s=e._prepP?e._prepP:Rr;return s.then(function(){var o=e.method.postMessage(e._state,r);return e._uMP.add(o),o.catch().then(function(){return e._uMP.delete(o)}),o})}function lA(e){var t=e.method.create(e.name,e.options);hR(t)?(e._prepP=t,t.then(function(n){e._state=n})):e._state=t}function qx(e){return e._addEL.message.length>0||e._addEL.internal.length>0}function Jy(e,t,n){e._addEL[t].push(n),uA(e)}function tb(e,t,n){e._addEL[t]=e._addEL[t].filter(function(i){return i!==n}),hA(e)}function uA(e){if(!e._iL&&qx(e)){var t=function(r){e._addEL[r.type].forEach(function(s){r.time>=s.time&&s.fn(r.data)})},n=e.method.microSeconds();e._prepP?e._prepP.then(function(){e._iL=!0,e.method.onMessage(e._state,t,n)}):(e._iL=!0,e.method.onMessage(e._state,t,n))}}function hA(e){if(e._iL&&!qx(e)){e._iL=!1;var t=e.method.microSeconds();e.method.onMessage(e._state,null,t)}}function dA(e){if(typeof WorkerGlobalScope=="function"&&self instanceof WorkerGlobalScope){var t=self.close.bind(self);self.close=function(){return e(),t()}}else{if(typeof window.addEventListener!="function")return;window.addEventListener("beforeunload",function(){e()},!0),window.addEventListener("unload",function(){e()},!0)}}function fA(e){process.on("exit",function(){return e()}),process.on("beforeExit",function(){return e().then(function(){return process.exit()})}),process.on("SIGINT",function(){return e().then(function(){return process.exit()})}),process.on("uncaughtException",function(t){return e().then(function(){console.trace(t),process.exit(101)})})}var pA=Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]",mA=pA?fA:dA,Pl=new Set,eb=!1;function gA(){eb||(eb=!0,mA(yA))}function vA(e){if(gA(),typeof e!="function")throw new Error("Listener is no function");Pl.add(e);var t={remove:function(){return Pl.delete(e)},run:function(){return Pl.delete(e),e()}};return t}function yA(){var e=[];return Pl.forEach(function(t){e.push(t()),Pl.delete(t)}),Promise.all(e)}function ko(e,t){var n={context:"leader",action:t,token:e.token};return e.broadcastChannel.postInternal(n)}function Vx(e){e.isLeader=!0,e._hasLeader=!0;var t=vA(function(){return e.die()});e._unl.push(t);var n=function(r){r.context==="leader"&&r.action==="apply"&&ko(e,"tell"),r.context==="leader"&&r.action==="tell"&&!e._dpLC&&(e._dpLC=!0,e._dpL(),ko(e,"tell"))};return e.broadcastChannel.addEventListener("internal",n),e._lstns.push(n),ko(e,"tell")}var Kx=function(t,n){var i=this;this.broadcastChannel=t,t._befC.push(function(){return i.die()}),this._options=n,this.isLeader=!1,this.isDead=!1,this.token=Bu(),this._lstns=[],this._unl=[],this._dpL=function(){},this._dpLC=!1,this._wKMC={},this.lN="pubkey-bc||"+t.method.type+"||"+t.name};Kx.prototype={hasLeader:function(){var t=this;return navigator.locks.query().then(function(n){var i=n.held?n.held.filter(function(r){return r.name===t.lN}):[];return!!(i&&i.length>0)})},awaitLeadership:function(){var t=this;if(!this._wLMP){this._wKMC.c=new AbortController;var n=new Promise(function(i,r){t._wKMC.res=i,t._wKMC.rej=r});this._wLMP=new Promise(function(i,r){navigator.locks.request(t.lN,{signal:t._wKMC.c.signal},function(){return t._wKMC.c=void 0,Vx(t),i(),n}).catch(function(s){t._wKMC.rej&&t._wKMC.rej(s),r(s)})})}return this._wLMP},set onduplicate(e){},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this.isLeader=!1),this.isDead=!0,this._wKMC.res&&this._wKMC.res(),this._wKMC.c&&this._wKMC.c.abort("LeaderElectionWebLock.die() called"),ko(this,"death")}};var Gx=function(t,n){var i=this;this.broadcastChannel=t,this._options=n,this.isLeader=!1,this._hasLeader=!1,this.isDead=!1,this.token=Bu(),this._aplQ=Rr,this._aplQC=0,this._unl=[],this._lstns=[],this._dpL=function(){},this._dpLC=!1;var r=function(o){o.context==="leader"&&(o.action==="death"&&(i._hasLeader=!1),o.action==="tell"&&(i._hasLeader=!0))};this.broadcastChannel.addEventListener("internal",r),this._lstns.push(r)};Gx.prototype={hasLeader:function(){return Promise.resolve(this._hasLeader)},applyOnce:function(t){var n=this;if(this.isLeader)return vo(0,!0);if(this.isDead)return vo(0,!1);if(this._aplQC>1)return this._aplQ;var i=function(){if(n.isLeader)return dR;var s=!1,o,a=new Promise(function(u){o=function(){s=!0,u()}}),c=function(h){h.context==="leader"&&h.token!=n.token&&(h.action==="apply"&&h.token>n.token&&o(),h.action==="tell"&&(o(),n._hasLeader=!0))};n.broadcastChannel.addEventListener("internal",c);var l=t?n._options.responseTime*4:n._options.responseTime;return ko(n,"apply").then(function(){return Promise.race([vo(l),a.then(function(){return Promise.reject(new Error)})])}).then(function(){return ko(n,"apply")}).then(function(){return Promise.race([vo(l),a.then(function(){return Promise.reject(new Error)})])}).catch(function(){}).then(function(){return n.broadcastChannel.removeEventListener("internal",c),s?!1:Vx(n).then(function(){return!0})})};return this._aplQC=this._aplQC+1,this._aplQ=this._aplQ.then(function(){return i()}).then(function(){n._aplQC=n._aplQC-1}),this._aplQ.then(function(){return n.isLeader})},awaitLeadership:function(){return this._aLP||(this._aLP=bA(this)),this._aLP},set onduplicate(e){this._dpL=e},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this._hasLeader=!1,this.isLeader=!1),this.isDead=!0,ko(this,"death")}};function bA(e){return e.isLeader?Rr:new Promise(function(t){var n=!1;function i(){n||(n=!0,e.broadcastChannel.removeEventListener("internal",s),t(!0))}e.applyOnce().then(function(){e.isLeader&&i()});var r=function(){return vo(e._options.fallbackInterval).then(function(){if(!(e.isDead||n))if(e.isLeader)i();else return e.applyOnce(!0).then(function(){e.isLeader?i():r()})})};r();var s=function(a){a.context==="leader"&&a.action==="death"&&(e._hasLeader=!1,e.applyOnce().then(function(){e.isLeader&&i()}))};e.broadcastChannel.addEventListener("internal",s),e._lstns.push(s)})}function _A(e,t){return e||(e={}),e=JSON.parse(JSON.stringify(e)),e.fallbackInterval||(e.fallbackInterval=3e3),e.responseTime||(e.responseTime=t.method.averageResponseTime(t.options)),e}function Xx(e,t){if(e._leaderElector)throw new Error("BroadcastChannel already has a leader-elector");t=_A(t,e);var n=pR()?new Kx(e,t):new Gx(e,t);return e._befC.push(function(){return n.die()}),e._leaderElector=n,n}var zd=new Map;function Qx(e,t,n,i){var r=zd.get(t);return r||(r={bc:new Nf(["RxDB:",e,n].join("|")),refs:new Set},zd.set(t,r)),r.refs.add(i),r.bc}function Xm(e,t){var n=zd.get(e);if(n&&(n.refs.delete(t),n.refs.size===0))return zd.delete(e),n.bc.close()}function wB(e,t,n,i){if(t.multiInstance){var r=Qx(e,t.databaseInstanceToken,n.databaseName,n),s=new Fe,o=d=>{d.storageName===e&&d.databaseName===t.databaseName&&d.collectionName===t.collectionName&&d.version===t.schema.version&&s.next(d.eventBulk)};r.addEventListener("message",o);var a=n.changeStream(),c=!1,l=a.subscribe(d=>{c||r.postMessage({storageName:e,databaseName:t.databaseName,collectionName:t.collectionName,version:t.schema.version,eventBulk:d})});n.changeStream=function(){return s.asObservable().pipe(ZT(a))};var u=n.close.bind(n);n.close=async function(){return c=!0,l.unsubscribe(),r.removeEventListener("message",o),await Xm(t.databaseInstanceToken,n),u()};var h=n.remove.bind(n);n.remove=async function(){return c=!0,l.unsubscribe(),r.removeEventListener("message",o),await Xm(t.databaseInstanceToken,n),h()}}}async function Zx(e){var t=rT(e.collection.schema.jsonSchema).map(s=>e.collection.name+"-"+s),n=await e.database.internalStore.findDocumentsById(t.map(s=>Lo(s,Ds)),!1),i={};n.forEach(s=>i[s.key]=s);var r=t.find(s=>i[s]);return r?i[r]:void 0}function wA(e,t,n){var i=qt(n._attachments),r=Fn(n),s=r._meta;delete r._meta,r._attachments=i;for(var o=t+1,a=Promise.resolve(r),c=function(){var l=o;a=a.then(u=>xA(e,l,u)),o++};o<=e.schema.version;)c();return a.then(l=>l===null?m0:(s&&(l._meta=s),l))}function xA(e,t,n){if(n===null)return m0;var i=e.migrationStrategies[t](n,e),r=b1(i);return r}async function Jx(e){if(e.collection.schema.version===0)return er;var t=await Zx(e);return!!t}var CA=200,t2=new WeakMap;function kA(e){var t=e2(e.database),n=t.getValue().slice(0);n.push(e),t.next(n)}function e2(e){return yi(t2,e,()=>new ui([]))}function SA(e){var t=t2.get(e);t&&t.complete()}var EA=(function(){function e(n,i,r=[n.name,"v",n.schema.version].join("-")){this.started=!1,this.canceled=!1,this.updateStatusHandlers=[],this.updateStatusQueue=p0,this.collection=n,this.migrationStrategies=i,this.statusDocKey=r,this.database=n.database,this.oldCollectionMeta=Zx(this),this.mustMigrate=Jx(this),this.statusDocId=Lo(this.statusDocKey,Wh),kA(this),this.$=gO(this.database.internalStore,this.statusDocId).pipe(It(s=>!!s),Ht(s=>Q(s).data),Nu(Au))}var t=e.prototype;return t.getStatus=function(){return Pr(this.$)},t.startMigration=async function(i=CA){var r=await this.mustMigrate;if(r){if(this.started)throw U("DM1");if(this.started=!0,this.database.multiInstance){this.broadcastChannel=new Nf(["rx-migration-state",this.database.name,this.collection.name,this.collection.schema.version].join("|"));var s=Xx(this.broadcastChannel);await s.awaitLeadership()}var o=await this.oldCollectionMeta,a=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:this.collection.name,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:Q(o).data.schema,password:this.database.password,devMode:At.isDevMode()}),c=await this.getConnectedStorageInstances(),l=await this.countAllDocuments([a].concat(c.map(h=>h.oldStorage)));await this.updateStatus(h=>(h.count.total=l,h));try{await Promise.all(c.map(async h=>{await Cx(this.collection,h.newStorage.collectionName,h.newStorage.schema),await this.migrateStorage(h.oldStorage,h.newStorage,i),await h.newStorage.close()})),await this.migrateStorage(a,this.collection.storageInstance.originalStorageInstance,i)}catch(h){await a.close(),await this.updateStatus(d=>(d.status="ERROR",d.error=Dd(h),d));return}try{await Za(this.database.internalStore,{previous:o,document:Object.assign({},o,{_deleted:!0})},"rx-migration-remove-collection-meta")}catch(h){var u=qa(h);if(!(u&&u.documentInDb._deleted))throw h}await this.updateStatus(h=>(h.status="DONE",h)),this.broadcastChannel&&await this.broadcastChannel.close()}},t.updateStatus=function(i){return this.updateStatusHandlers.push(i),this.updateStatusQueue=this.updateStatusQueue.then(async()=>{if(this.updateStatusHandlers.length!==0){var r=this.updateStatusHandlers;for(this.updateStatusHandlers=[];;){var s=await wc(this.database.internalStore,this.statusDocId),o=Fn(s);s||(o={id:this.statusDocId,key:this.statusDocKey,context:Wh,data:{collectionName:this.collection.name,status:"RUNNING",count:{total:0,handled:0,percent:0}},_deleted:!1,_meta:yc(),_rev:Ii(),_attachments:{}});var a=Q(o).data;for(var c of r)a=c(a);if(a.count.percent=Math.round(a.count.handled/a.count.total*100),o&&s&&eu(o.data,s.data))break;try{await Za(this.database.internalStore,{previous:s,document:Q(o)},Wh);break}catch(l){if(!qa(l))throw l}}}}),this.updateStatusQueue},t.migrateStorage=async function(i,r,s){this.collection.onClose.push(()=>this.cancel()),this.database.onClose.push(()=>this.cancel());var o=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:"rx-migration-state-meta-"+i.collectionName+"-"+i.schema.version,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:qm(i.schema,Pd(i.schema)),password:this.database.password,devMode:At.isDevMode()}),a=uR(r,Ad,this.database.token,!0),c=Rx({keepMeta:!0,identifier:["rx-migration-state",i.collectionName,i.schema.version,this.collection.schema.version].join("-"),replicationHandler:{masterChangesSince(){return Promise.resolve({checkpoint:null,documents:[]})},masterWrite:async u=>{var h=await Promise.all(u.map(async f=>{var p=f.newDocumentState;if(r.schema.title===Hh&&(p=f.newDocumentState.docData,f.newDocumentState.isCheckpoint==="1"))return{assumedMasterState:void 0,newDocumentState:f.newDocumentState};var m=await wA(this.collection,i.schema.version,p);if(m===null)return null;var g={assumedMasterState:void 0,newDocumentState:r.schema.title===Hh?Object.assign({},f.newDocumentState,{docData:m}):m};return g}));h=h.filter(f=>!!f&&!!f.newDocumentState);var d=await a.masterWrite(h);return d},masterChangeStream$:new Fe().asObservable()},forkInstance:i,metaInstance:o,pushBatchSize:s,pullBatchSize:0,conflictHandler:Ad,hashFunction:this.database.hashFunction}),l=!1;if(c.events.error.subscribe(u=>l=u),c.events.processed.up.subscribe(()=>{this.updateStatus(u=>(u.count.handled=u.count.handled+1,u))}),await Uh(c),await Km(c),await this.updateStatusQueue,l)throw await o.close(),l;await Promise.all([i.remove(),o.remove()]),await this.cancel()},t.cancel=async function(){this.canceled=!0,this.replicationState&&await Ax(this.replicationState),this.broadcastChannel&&await this.broadcastChannel.close()},t.countAllDocuments=async function(i){var r=0;return await Promise.all(i.map(async s=>{var o=Pf(s.schema,Na(s.schema,{selector:{}})),a=await s.count(o);r+=a.count})),r},t.getConnectedStorageInstances=async function(){var i=Q(await this.oldCollectionMeta),r=[];return await Promise.all(await Promise.all(i.data.connectedStorages.map(async s=>{if(s.schema.title!==Hh)throw new Error("unknown migration handling for schema");var o=qm(Fn(this.collection.schema.jsonSchema),Pd(s.schema));o.version=this.collection.schema.version;var[a,c]=await Promise.all([this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:At.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:s.schema,password:this.database.password,collectionName:s.collectionName}),this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:At.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:o,password:this.database.password,collectionName:s.collectionName})]);r.push({oldStorage:a,newStorage:c})}))),r},t.migratePromise=async function(i){this.startMigration(i);var r=await this.mustMigrate;if(!r)return{status:"DONE",collectionName:this.collection.name,count:{handled:0,percent:0,total:0}};var s=await Promise.race([Pr(this.$.pipe(It(o=>o.status==="DONE"))),Pr(this.$.pipe(It(o=>o.status==="ERROR")))]);if(s.status==="ERROR")throw U("DM4",{collection:this.collection.name,error:s.error});return s},e})(),jd=new WeakMap,Qm=new WeakMap;function Rl(e){var t=jd.get(e);if(!t){var n=e.database?e.database:e,i=e.database?e.name:"";throw U("LD8",{database:n.name,collection:i})}return t}function n2(e,t,n,i,r,s){return t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:MA(i),schema:i2,options:r,multiInstance:s,devMode:At.isDevMode()})}function nb(e){var t=jd.get(e);if(t)return jd.delete(e),t.then(n=>n.storageInstance.close())}async function ib(e,t,n){var i=Qo(10),r=await n2(i,e,t,n,{},!1);await r.remove()}function MA(e){return"plugin-local-documents-"+e}var i2=Df({title:"RxLocalDocument",version:0,primaryKey:"id",type:"object",properties:{id:{type:"string",maxLength:128},data:{type:"object",additionalProperties:!0}},required:["id","data"]});async function rb(e,t){var n=await Rl(this),i={id:e,data:t,_deleted:!1,_meta:yc(),_rev:Ii(),_attachments:{}};return Za(n.storageInstance,{document:i},"local-document-insert").then(r=>n.docCache.getCachedRxDocument(r))}function sb(e,t){return this.getLocal(e).then(n=>{if(n)return n.incrementalModify(()=>t);var i=this.insertLocal(e,t);return i})}async function ob(e){var t=await Rl(this),n=t.docCache,i=n.getLatestDocumentDataIfExists(e);return i?Promise.resolve(n.getCachedRxDocument(i)):wc(t.storageInstance,e).then(r=>r?t.docCache.getCachedRxDocument(r):null)}function ab(e){return this.$.pipe(Fu(null),nr(async t=>{if(t)return{changeEvent:t};var n=await this.getLocal(e);return{doc:n}}),nr(async t=>{if(t.changeEvent){var n=t.changeEvent;if(!n.isLocal||n.documentId!==e)return{use:!1};var i=await this.getLocal(e);return{use:!0,doc:i}}else return{use:!0,doc:t.doc}}),It(t=>t.use),Ht(t=>t.doc))}var DA=dx(),$A=(function(e){function t(n,i,r){var s;return s=e.call(this,null,i)||this,s.id=n,s.parent=r,s}return d0(t,e),t})(DA),Al={get isLocal(){return!0},get allAttachments$(){throw U("LD1",{document:this})},get primaryPath(){return"id"},get primary(){return this.id},get $(){var e=this,t=Ka(Qm,this.parent),n=this.primary;return e.parent.eventBulks$.pipe(It(i=>!!i.isLocal),Ht(i=>i.events.find(r=>r.documentId===n)),It(i=>!!i),Ht(i=>Y1(Q(i))),Fu(t.docCache.getLatestDocumentData(this.primary)),ru((i,r)=>i._rev===r._rev),Ht(i=>t.docCache.getCachedRxDocument(i)),Nu(Au))},get $$(){var e=this,t=Bp(e),n=t.getReactivityFactory();return n.fromObservable(e.$,e.getLatest()._data,t)},get deleted$$(){var e=this,t=Bp(e),n=t.getReactivityFactory();return n.fromObservable(e.deleted$,e.getLatest().deleted,t)},getLatest(){var e=Ka(Qm,this.parent),t=e.docCache.getLatestDocumentData(this.primary);return e.docCache.getCachedRxDocument(t)},get(e){if(e="data."+e,!!this._data){if(typeof e!="string")throw Md("LD2",{objPath:e});var t=Va(this._data,e);return t=At.deepFreezeWhenDevMode(t),t}},get$(e){if(e="data."+e,At.isDevMode()){if(e.includes(".item."))throw U("LD3",{objPath:e});if(e===this.primaryPath)throw U("LD4")}return this.$.pipe(Ht(t=>t._data),Ht(t=>Va(t,e)),ru())},get$$(e){var t=Bp(this),n=t.getReactivityFactory();return n.fromObservable(this.get$(e),this.getLatest().get(e),t)},async incrementalModify(e){var t=await Rl(this.parent);return t.incrementalWriteQueue.addWrite(this._data,async n=>(n.data=await e(n.data,this),n)).then(n=>t.docCache.getCachedRxDocument(n))},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e){var t=await Rl(this.parent),n=this._data;e.id=this.id;var i=[{previous:n,document:e}];return t.storageInstance.bulkWrite(i,"local-document-save-data").then(r=>{if(r.error[0])throw r.error[0];var s=bi(this.collection.schema.primaryPath,i,r)[0];e=qt(e),e._rev=s._rev})},async remove(){var e=await Rl(this.parent),t=qt(this._data);return t._deleted=!0,Za(e.storageInstance,{previous:this._data,document:t},"local-document-remove").then(n=>e.docCache.getCachedRxDocument(n))}},cb=!1,TA=()=>{if(!cb){cb=!0;var e=Af,t=Object.getOwnPropertyNames(e);t.forEach(i=>{var r=Object.getOwnPropertyDescriptor(Al,i);if(!r){var s=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(Al,i,s)}});var n=i=>()=>{throw U("LD6",{functionName:i})};["populate","update","putAttachment","putAttachmentBase64","getAttachment","allAttachments"].forEach(i=>Al[i]=n(i))}};function IA(e,t){TA();var n=new $A(e.id,e,t);return Object.setPrototypeOf(n,Al),n.prototype=Al,n}function Bp(e){var t=e.parent;return iR(t)?t:t.database}function lb(e){var t=e.database?e.database:e,n=e.database?e.name:"",i=(async()=>{var r=await n2(t.token,t.storage,t.name,n,t.instanceCreationOptions,t.multiInstance);r=S0(t,r,i2);var s=new bx("id",t.eventBulks$.pipe(It(u=>{var h=!1;return(n===""&&!u.collectionName||n!==""&&u.collectionName===n)&&(h=!0),h&&u.isLocal}),Ht(u=>u.events)),u=>IA(u,e)),o=new hx(r,"id",()=>{},()=>{}),a=await t.storageToken,c=r.changeStream().subscribe(u=>{for(var h=new Array(u.events.length),d=u.events,f=e.database?e.name:void 0,p=0;p<d.length;p++){var m=d[p];h[p]={documentId:m.documentId,collectionName:f,isLocal:!0,operation:m.operation,documentData:At.deepFreezeWhenDevMode(m.documentData),previousDocumentData:At.deepFreezeWhenDevMode(m.previousDocumentData)}}var g={id:u.id,isLocal:!0,internal:!1,collectionName:e.database?e.name:void 0,storageToken:a,events:h,databaseToken:t.token,checkpoint:u.checkpoint,context:u.context};t.$emit(g)});e._subs.push(c);var l={database:t,parent:e,storageInstance:r,docCache:s,incrementalWriteQueue:o};return Qm.set(e,l),l})();jd.set(e,i)}var OA={name:"local-documents",rxdb:!0,prototypes:{RxCollection:e=>{e.insertLocal=rb,e.upsertLocal=sb,e.getLocal=ob,e.getLocal$=ab},RxDatabase:e=>{e.insertLocal=rb,e.upsertLocal=sb,e.getLocal=ob,e.getLocal$=ab}},hooks:{createRxDatabase:{before:e=>{e.creator.localDocuments&&lb(e.database)}},createRxCollection:{before:e=>{e.creator.localDocuments&&lb(e.collection)}},preCloseRxDatabase:{after:e=>nb(e)},postCloseRxCollection:{after:e=>nb(e)},postRemoveRxDatabase:{after:e=>ib(e.storage,e.databaseName,"")},postRemoveRxCollection:{after:e=>ib(e.storage,e.databaseName,e.collectionName)}},overwritable:{}},PA=new WeakMap,RA={name:"migration-schema",rxdb:!0,init(){R0(OA)},hooks:{preCloseRxDatabase:{after:SA}},prototypes:{RxDatabase:e=>{e.migrationStates=function(){return e2(this).pipe(Nu(Au))}},RxCollection:e=>{e.getMigrationState=function(){return yi(PA,this,()=>new EA(this.asRxCollection,this.migrationStrategies))},e.migrationNeeded=function(){return this.schema.version===0?er:Jx(this.getMigrationState())}}}},AA=RA;R0(AA);class r2 extends Error{constructor(t,n){super(t),this.name="SchemaVersionError",this.cause=n}}const Qr={type:"string",maxLength:100},LA={version:1,primaryKey:"id",type:"object",properties:{id:Qr,date:{type:"string",maxLength:10},amount:{type:"number"},description:{type:"string"},memo:{type:"string"},merchantId:{type:"string",maxLength:100},accountId:{type:"string",maxLength:100},tagIds:{type:"array",items:{type:"string"}}},required:["id","date","amount","description","tagIds"],indexes:["date"]},NA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,name:{type:"string",maxLength:200},icon:{type:"string"},color:{type:"string"}},required:["id","name"],indexes:["name"]},FA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,name:{type:"string",maxLength:200}},required:["id","name"],indexes:["name"]},zA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,name:{type:"string"},type:{type:"string"}},required:["id","name"]},jA={version:1,primaryKey:"id",type:"object",properties:{id:Qr,logic:{type:"string"},conditions:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}},merchantId:{type:"string"},accountId:{type:"string"},tagIds:{type:"array",items:{type:"string"}}},required:["id","logic","conditions","tagIds"]},BA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,title:{type:"string"},chartType:{type:"string"},granularity:{type:"string"},startDate:{type:"string"},endDate:{type:"string"},tagId:{type:"string"},merchantId:{type:"string"},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"},excludedTagIds:{type:"array",items:{type:"string"}},excludedMerchantIds:{type:"array",items:{type:"string"}},direction:{type:"string"},descriptionFilter:{type:"string"},descriptionFilterMode:{type:"string"},legendPosition:{type:"string"},filters:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}}},required:["id","title","chartType","granularity","position"]},WA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,title:{type:"string"},model:{type:"string"},columns:{type:"array",items:{type:"string"}},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"}},required:["id","title","model","columns","position"]},HA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,value:{type:"number"}},required:["id","value"]},UA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,data:{type:"string"}},required:["id"]};class gr{#t;constructor(t){this.#t=t}get rxCollection(){return this.#t}async get(t){const n=await this.#t.findOne(t).exec();if(!n)throw new Error(`Document not found: ${t}`);return n.toJSON(!0)}async put(t){return await this.#t.upsert(t),{id:t.id}}async bulkDocs(t){await this.#t.bulkUpsert(t)}async remove(t){const n=await this.#t.findOne(t).exec();n&&await n.remove()}async find(t){return(await this.#t.find(t).exec()).map(i=>i.toJSON(!0))}async all(){return(await this.#t.find().exec()).map(n=>n.toJSON(!0))}async clear(){const t=await this.#t.find().exec();await Promise.all(t.map(n=>n.remove()))}async count(){return this.#t.count().exec()}subscribe(t){const n=this.#t.$.subscribe(t);return{unsubscribe:()=>n.unsubscribe()}}}async function YA(e){const n=new TextEncoder().encode(e);if(typeof crypto<"u"&&crypto.subtle?.digest){const r=await crypto.subtle.digest("SHA-256",n),s=new Uint8Array(r);return Array.from(s,o=>o.toString(16).padStart(2,"0")).join("")}let i=2166136261;for(let r=0;r<n.length;r++)i^=n[r],i=Math.imul(i,16777619);return(i>>>0).toString(16).padStart(8,"0")}async function ub(e,t="budgee"){const n=await eR({name:t,storage:e,hashFunction:YA});try{await n.addCollections({transactions:{schema:LA,migrationStrategies:{1:i=>(i.description=i.originalDescription,delete i.originalDescription,i)}},tags:{schema:NA},merchants:{schema:FA},accounts:{schema:zA},merchant_rules:{schema:jA,migrationStrategies:{1:i=>i}},dashboard_charts:{schema:BA},dashboard_tables:{schema:WA},meta:{schema:HA},backups:{schema:UA}})}catch(i){throw(i instanceof Error?i.message:String(i)).includes("DB6")?new r2("Database schema version mismatch (DB6)",i):i}return{rxdb:n,transactions:new gr(n.transactions),tags:new gr(n.tags),merchants:new gr(n.merchants),accounts:new gr(n.accounts),merchantRules:new gr(n.merchant_rules),dashboardCharts:new gr(n.dashboard_charts),dashboardTables:new gr(n.dashboard_tables),meta:new gr(n.meta),backups:new gr(n.backups)}}const fo=typeof window<"u"&&new URLSearchParams(window.location.search).get("demo")==="1";async function qA(){if(fo){const{getRxStorageMemory:t}=await wo(async()=>{const{getRxStorageMemory:n}=await import("./index-EIxudF2q.js");return{getRxStorageMemory:n}},[]);return ub(t(),"budgee_demo")}const{getRxStorageDexie:e}=await wo(async()=>{const{getRxStorageDexie:t}=await import("./index-Cmimz4tf.js");return{getRxStorageDexie:t}},[]);return ub(e())}const VA=qA().then(e=>e);function Z(){return VA}function ir(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=new Uint8Array(16);crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Zs(e){if(!e)return{docs:[],idMap:new Map};const t=new Map;return{docs:e.map(i=>{if(i.id)return i;const s=String(i._id??""),o=ir();return s&&t.set(s,o),{...i,id:o}}),idMap:t}}function Bc(e,t){return t&&(e.get(t)??t)}function vh(e,t){return t&&t.map(n=>e.get(n)??n)}async function s2(e){const t=await e.text(),n=JSON.parse(t),{migrateExport:i,LATEST_VERSION:r}=await wo(async()=>{const{migrateExport:_,LATEST_VERSION:C}=await Promise.resolve().then(()=>t4);return{migrateExport:_,LATEST_VERSION:C}},void 0),s=i(n),o=await Z();await o.transactions.clear(),await o.tags.clear(),await o.merchants.clear(),await o.accounts.clear(),await o.merchantRules.clear(),await o.dashboardCharts.clear(),await o.dashboardTables.clear();const{docs:a,idMap:c}=Zs(s.tags),{docs:l,idMap:u}=Zs(s.merchants),{docs:h,idMap:d}=Zs(s.accounts),f=c.size>0||u.size>0||d.size>0,{docs:p}=Zs(s.transactions),{docs:m}=Zs(s.merchantRules),{docs:g}=Zs(s.dashboardCharts),{docs:b}=Zs(s.dashboardTables);if(f){for(const _ of p)_.merchantId=Bc(u,_.merchantId),_.accountId=Bc(d,_.accountId),_.tagIds=vh(c,_.tagIds)??_.tagIds;for(const _ of m)_.merchantId=Bc(u,_.merchantId),_.tagIds=vh(c,_.tagIds)??_.tagIds;for(const _ of g)_.tagId=Bc(c,_.tagId),_.merchantId=Bc(u,_.merchantId),_.excludedTagIds=vh(c,_.excludedTagIds),_.excludedMerchantIds=vh(u,_.excludedMerchantIds)}p.length&&await o.transactions.bulkDocs(p),a.length&&await o.tags.bulkDocs(a),l.length&&await o.merchants.bulkDocs(l),h.length&&await o.accounts.bulkDocs(h),m.length&&await o.merchantRules.bulkDocs(m),g.length&&await o.dashboardCharts.bulkDocs(g),b.length&&await o.dashboardTables.bulkDocs(b);try{const _=await o.meta.get("schema_version");await o.meta.put({..._,value:r})}catch{await o.meta.put({id:"schema_version",value:r})}}const o2=[],Yi=o2.length;function a2(e){let t=e.version??Yi,n=e;for(;t<Yi;)n=o2[t](n),t=n.version??t+1;return n}async function KA(e){return{version:Yi,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()}}async function GA(e,t){const n=`backup_${new Date().toISOString()}`;await e.backups.put({id:n,data:JSON.stringify(t)}),await XA(e,10)}async function XA(e,t){const n=await e.backups.all();if(n.length<=t)return;const r=n.sort((s,o)=>o.id.localeCompare(s.id)).slice(t);for(const s of r)await e.backups.remove(s.id)}async function QA(e){try{return(await e.meta.get("schema_version")).value}catch{return null}}async function ZA(e,t){await e.meta.put({id:"schema_version",value:t})}async function JA(e,t){await e.transactions.clear(),await e.tags.clear(),await e.merchants.clear(),await e.accounts.clear(),await e.merchantRules.clear(),await e.dashboardCharts.clear(),await e.dashboardTables.clear(),t.transactions?.length&&await e.transactions.bulkDocs(t.transactions),t.tags?.length&&await e.tags.bulkDocs(t.tags),t.merchants?.length&&await e.merchants.bulkDocs(t.merchants),t.accounts?.length&&await e.accounts.bulkDocs(t.accounts),t.merchantRules?.length&&await e.merchantRules.bulkDocs(t.merchantRules),t.dashboardCharts?.length&&await e.dashboardCharts.bulkDocs(t.dashboardCharts),t.dashboardTables?.length&&await e.dashboardTables.bulkDocs(t.dashboardTables)}async function c2(e){const t=await QA(e);if(t!=null&&t>=Yi)return;const n=await KA(e);if(n.version=t??Yi,console.log(`[migrate] Current data at version ${n.version}`),(n.version??Yi)<Yi){await GA(e,n),console.log("[migrate] Backup saved");const i=a2(n);console.log(`[migrate] Migrated to version ${i.version}`),await JA(e,i)}await ZA(e,Yi),console.log("[migrate] Migration complete")}const t4=Object.freeze(Object.defineProperty({__proto__:null,LATEST_VERSION:Yi,migrateDatabase:c2,migrateExport:a2},Symbol.toStringTag,{value:"Module"}));var l2=new WeakMap,e4=new WeakMap;function hb(e){return yi(e4,e,()=>Xx(e))}function n4(){var e=Qx(this.storage.name,this.token,this.name,this),t=this.close.bind(this);this.close=function(){return Xm(this.token,this),t()};var n=hb(e);return n||(n=hb(e),l2.set(this,n)),this.leaderElector=()=>n,n}function i4(){return this.multiInstance?this.leaderElector().isLeader:!0}function r4(){return this.multiInstance?this.leaderElector().awaitLeadership().then(()=>!0):p0}function s4(e){var t=l2.get(e);t&&t.die()}var o4=!0,a4={RxDatabase:e=>{e.leaderElector=n4,e.isLeader=i4,e.waitForLeadership=r4}},c4={name:"leader-election",rxdb:o4,prototypes:a4,hooks:{preCloseRxDatabase:{after:s4}}},db=e=>Promise.resolve(e);function fb(e,t){if(e==="_deleted")return t;t=qt(t);var n=!!t._deleted;return t[e]=n,delete t._deleted,t}function Wp(e,t,n){return n.map(i=>{var r=qt(i);if(t!=="_deleted"){var s=!!r[t];r._deleted=s,delete r[t]}else r._deleted=!!r._deleted;var o=e.schema.primaryPath;return r[o]=Us(e.schema.jsonSchema,r),r})}function pb(e,t){if(typeof window>"u"||typeof window!="object"||typeof window.addEventListener>"u"||navigator.onLine)return e.promiseWait(t);var n,i=new Promise(r=>{n=()=>{window.removeEventListener("online",n),r()},window.addEventListener("online",n)});return Promise.race([i,e.promiseWait(t)]).then(()=>{window.removeEventListener("online",n)})}function l4(e){function t(){if(!(typeof document>"u"||typeof document.dispatchEvent!="function")){var i=new Event("mousemove");document.dispatchEvent(i)}}var n=setInterval(t,20*1e3);e.onCancel.push(()=>clearInterval(n))}var u4=new WeakMap,h4=(function(){function e(n,i,r,s,o,a,c,l,u){this.subs=[],this.subjects={received:new Fe,sent:new Fe,error:new Fe,canceled:new ui(!1),active:new ui(!1)},this.received$=this.subjects.received.asObservable(),this.sent$=this.subjects.sent.asObservable(),this.error$=this.subjects.error.asObservable(),this.canceled$=this.subjects.canceled.asObservable(),this.active$=this.subjects.active.asObservable(),this.wasStarted=!1,this.startQueue=di,this.onCancel=[],this.callOnStart=void 0,this.remoteEvents$=new Fe,this.replicationIdentifier=n,this.collection=i,this.deletedField=r,this.pull=s,this.push=o,this.live=a,this.retryTime=c,this.autoStart=l,this.toggleOnDocumentVisible=u,this.metaInfoPromise=(async()=>{var f="rx-replication-meta-"+await i.database.hashFunction([this.collection.name,this.replicationIdentifier].join("-")),p=qm(this.collection.schema.jsonSchema,Pd(this.collection.schema.jsonSchema));return{collectionName:f,schema:p}})();var h=yi(u4,i,()=>[]);h.push(this),this.collection.onClose.push(()=>this.cancel()),Object.keys(this.subjects).forEach(f=>{Object.defineProperty(this,f+"$",{get:function(){return this.subjects[f].asObservable()}})});var d=new Promise(f=>{this.callOnStart=f});this.startPromise=d}var t=e.prototype;return t.start=function(){return this.startQueue=this.startQueue.then(()=>this._start()),this.startQueue},t._start=async function(){if(!this.isStopped()){if(this.internalReplicationState&&this.internalReplicationState.events.paused.next(!1),this.wasStarted){this.reSync();return}this.wasStarted=!0,this.toggleOnDocumentVisible||l4(this);var i=this.pull&&this.pull.modifier?this.pull.modifier:db,r=this.push&&this.push.modifier?this.push.modifier:db,s=this.collection.database,o=await this.metaInfoPromise,[a]=await Promise.all([this.collection.database.storage.createStorageInstance({databaseName:s.name,collectionName:o.collectionName,databaseInstanceToken:s.token,multiInstance:s.multiInstance,options:{},schema:o.schema,password:s.password,devMode:At.isDevMode()}),Cx(this.collection,o.collectionName,o.schema)]);this.metaInstance=a,this.internalReplicationState=Rx({pushBatchSize:this.push&&this.push.batchSize?this.push.batchSize:100,pullBatchSize:this.pull&&this.pull.batchSize?this.pull.batchSize:100,initialCheckpoint:{upstream:this.push?this.push.initialCheckpoint:void 0,downstream:this.pull?this.pull.initialCheckpoint:void 0},forkInstance:this.collection.storageInstance,metaInstance:this.metaInstance,hashFunction:s.hashFunction,identifier:"rxdbreplication"+this.replicationIdentifier,conflictHandler:this.collection.conflictHandler,replicationHandler:{masterChangeStream$:this.remoteEvents$.asObservable().pipe(It(c=>!!this.pull),nr(async c=>{if(c==="RESYNC")return c;var l=qt(c);return l.documents=Wp(this.collection,this.deletedField,l.documents),l.documents=await Promise.all(l.documents.map(u=>i(u))),l})),masterChangesSince:async(c,l)=>{if(!this.pull)return{checkpoint:null,documents:[]};for(var u=!1,h={};!u&&!this.isStoppedOrPaused();)try{h=await this.pull.handler(c,l),u=!0}catch(p){var d=U("RC_PULL",{checkpoint:c,errors:Cd(p).map(m=>Dd(m)),direction:"pull"});this.subjects.error.next(d),await pb(this.collection,Q(this.retryTime))}if(this.isStoppedOrPaused())return{checkpoint:null,documents:[]};var f=qt(h);return f.documents=Wp(this.collection,this.deletedField,f.documents),f.documents=await Promise.all(f.documents.map(p=>i(p))),f},masterWrite:async c=>{if(!this.push)return[];var l=!1;await Io("preReplicationMasterWrite",{rows:c,collection:this.collection});var u=await Promise.all(c.map(async m=>(m.newDocumentState=await r(m.newDocumentState),m.newDocumentState===null?null:(m.assumedMasterState&&(m.assumedMasterState=await r(m.assumedMasterState)),this.deletedField!=="_deleted"&&(m.newDocumentState=fb(this.deletedField,m.newDocumentState),m.assumedMasterState&&(m.assumedMasterState=fb(this.deletedField,m.assumedMasterState))),m)))),h=u.filter(M$),d=null;for(h.length===0&&(l=!0,d=[]);!l&&!this.isStoppedOrPaused();)try{if(d=await this.push.handler(h),!Array.isArray(d))throw U("RC_PUSH_NO_AR",{pushRows:c,direction:"push",args:{result:d}});l=!0}catch(m){var f=m.rxdb?m:U("RC_PUSH",{pushRows:c,errors:Cd(m).map(g=>Dd(g)),direction:"push"});this.subjects.error.next(f),await pb(this.collection,Q(this.retryTime))}if(this.isStoppedOrPaused())return[];await Io("preReplicationMasterWriteDocumentsHandle",{result:d,collection:this.collection});var p=Wp(this.collection,this.deletedField,Q(d));return p}}}),this.subs.push(this.internalReplicationState.events.error.subscribe(c=>{this.subjects.error.next(c)}),this.internalReplicationState.events.processed.down.subscribe(c=>this.subjects.received.next(c.document)),this.internalReplicationState.events.processed.up.subscribe(c=>{this.subjects.sent.next(c.newDocumentState)}),_0([this.internalReplicationState.events.active.down,this.internalReplicationState.events.active.up]).subscribe(([c,l])=>{var u=c||l;this.subjects.active.next(u)})),this.pull&&this.pull.stream$&&this.live&&this.subs.push(this.pull.stream$.subscribe({next:c=>{this.isStoppedOrPaused()||this.remoteEvents$.next(c)},error:c=>{this.subjects.error.next(c)}})),this.live||(await Uh(this.internalReplicationState),await Km(this.internalReplicationState),await this._cancel()),this.callOnStart()}},t.pause=function(){return this.startQueue=this.startQueue.then(()=>{this.internalReplicationState&&this.internalReplicationState.events.paused.next(!0)}),this.startQueue},t.isPaused=function(){return!!(this.internalReplicationState&&this.internalReplicationState.events.paused.getValue())},t.isStopped=function(){return!!this.subjects.canceled.getValue()},t.isStoppedOrPaused=function(){return this.isPaused()||this.isStopped()},t.awaitInitialReplication=async function(){return await this.startPromise,Uh(Q(this.internalReplicationState))},t.awaitInSync=async function(){await this.startPromise,await Uh(Q(this.internalReplicationState));for(var i=2;i>0;)i--,await this.collection.database.requestIdlePromise(),await Km(Q(this.internalReplicationState));return!0},t.reSync=function(){this.remoteEvents$.next("RESYNC")},t.emitEvent=function(i){this.remoteEvents$.next(i)},t.cancel=async function(){this.startQueue=this.startQueue.catch(()=>{}).then(async()=>{await this._cancel()}),await this.startQueue},t._cancel=async function(i=!1){if(this.isStopped())return er;var r=this.onCancel.map(s=>b1(s()));return this.internalReplicationState&&await Ax(this.internalReplicationState),this.metaInstance&&!i&&r.push(Q(this.internalReplicationState).checkpointQueue.then(()=>Q(this.metaInstance).close())),this.subs.forEach(s=>s.unsubscribe()),this.subjects.canceled.next(!0),this.subjects.active.complete(),this.subjects.canceled.complete(),this.subjects.error.complete(),this.subjects.received.complete(),this.subjects.sent.complete(),Promise.all(r)},t.remove=async function(){return this.startQueue=this.startQueue.then(async()=>{var i=await this.metaInfoPromise;await this._cancel(!0),await Q(this.internalReplicationState).checkpointQueue.then(()=>Q(this.metaInstance).remove()),await FP(this.collection,i.collectionName,i.schema)}),this.startQueue},e})();function d4({replicationIdentifier:e,collection:t,deletedField:n="_deleted",pull:i,push:r,live:s=!0,retryTime:o=1e3*5,waitForLeadership:a=!0,autoStart:c=!0,toggleOnDocumentVisible:l=!1}){if(R0(c4),!i&&!r)throw U("UT3",{collection:t.name,args:{replicationIdentifier:e}});var u=new h4(e,t,n,i,r,s,o,c,l);if(l&&typeof document<"u"&&typeof document.addEventListener=="function"&&typeof document.visibilityState=="string"){var h=()=>{if(!u.isStopped()){var d=document.visibilityState==="visible";d?u.start():t.database.isLeader()||u.pause()}};document.addEventListener("visibilitychange",h),u.onCancel.push(()=>document.removeEventListener("visibilitychange",h))}return f4(a,u),u}function f4(e,t){var n=e&&t.collection.database.multiInstance,i=n?t.collection.database.waitForLeadership():p0;return i.then(()=>{t.isStopped()||t.autoStart&&t.start()})}var Zm=function(e,t){return Zm=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)i.hasOwnProperty(r)&&(n[r]=i[r])},Zm(e,t)};function u2(e,t){Zm(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function p4(e){var t=typeof Symbol=="function"&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function m4(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),r,s=[],o;try{for(;(t===void 0||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}function g4(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(m4(arguments[t]));return e}var h2=(function(){function e(t,n){this.target=n,this.type=t}return e})(),v4=(function(e){u2(t,e);function t(n,i){var r=e.call(this,"error",i)||this;return r.message=n.message,r.error=n,r}return t})(h2),y4=(function(e){u2(t,e);function t(n,i,r){n===void 0&&(n=1e3),i===void 0&&(i="");var s=e.call(this,"close",r)||this;return s.wasClean=!0,s.code=n,s.reason=i,s}return t})(h2);var b4=function(){if(typeof WebSocket<"u")return WebSocket},_4=function(e){return typeof e<"u"&&!!e&&e.CLOSING===2},Js={maxReconnectionDelay:1e4,minReconnectionDelay:1e3+Math.random()*4e3,minUptime:5e3,reconnectionDelayGrowFactor:1.3,connectionTimeout:4e3,maxRetries:1/0,maxEnqueuedMessages:1/0},w4=(function(){function e(t,n,i){var r=this;i===void 0&&(i={}),this._listeners={error:[],message:[],open:[],close:[]},this._retryCount=-1,this._shouldReconnect=!0,this._connectLock=!1,this._binaryType="blob",this._closeCalled=!1,this._messageQueue=[],this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this._handleOpen=function(s){r._debug("open event");var o=r._options.minUptime,a=o===void 0?Js.minUptime:o;clearTimeout(r._connectTimeout),r._uptimeTimeout=setTimeout(function(){return r._acceptOpen()},a),r._ws.binaryType=r._binaryType,r._messageQueue.forEach(function(c){return r._ws.send(c)}),r._messageQueue=[],r.onopen&&r.onopen(s),r._listeners.open.forEach(function(c){return r._callEventListener(s,c)})},this._handleMessage=function(s){r._debug("message event"),r.onmessage&&r.onmessage(s),r._listeners.message.forEach(function(o){return r._callEventListener(s,o)})},this._handleError=function(s){r._debug("error event",s.message),r._disconnect(void 0,s.message==="TIMEOUT"?"timeout":void 0),r.onerror&&r.onerror(s),r._debug("exec error listeners"),r._listeners.error.forEach(function(o){return r._callEventListener(s,o)}),r._connect()},this._handleClose=function(s){r._debug("close event"),r._clearTimeouts(),r._shouldReconnect&&r._connect(),r.onclose&&r.onclose(s),r._listeners.close.forEach(function(o){return r._callEventListener(s,o)})},this._url=t,this._protocols=n,this._options=i,this._options.startClosed&&(this._shouldReconnect=!1),this._connect()}return Object.defineProperty(e,"CONNECTING",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(e,"OPEN",{get:function(){return 1},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSING",{get:function(){return 2},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSED",{get:function(){return 3},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CONNECTING",{get:function(){return e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"OPEN",{get:function(){return e.OPEN},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSING",{get:function(){return e.CLOSING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSED",{get:function(){return e.CLOSED},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"binaryType",{get:function(){return this._ws?this._ws.binaryType:this._binaryType},set:function(t){this._binaryType=t,this._ws&&(this._ws.binaryType=t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"retryCount",{get:function(){return Math.max(this._retryCount,0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var t=this._messageQueue.reduce(function(n,i){return typeof i=="string"?n+=i.length:i instanceof Blob?n+=i.size:n+=i.byteLength,n},0);return t+(this._ws?this._ws.bufferedAmount:0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this._ws?this._ws.extensions:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this._ws?this._ws.protocol:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this._ws?this._ws.readyState:this._options.startClosed?e.CLOSED:e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this._ws?this._ws.url:""},enumerable:!0,configurable:!0}),e.prototype.close=function(t,n){if(t===void 0&&(t=1e3),this._closeCalled=!0,this._shouldReconnect=!1,this._clearTimeouts(),!this._ws){this._debug("close enqueued: no ws instance");return}if(this._ws.readyState===this.CLOSED){this._debug("close: already closed");return}this._ws.close(t,n)},e.prototype.reconnect=function(t,n){this._shouldReconnect=!0,this._closeCalled=!1,this._retryCount=-1,!this._ws||this._ws.readyState===this.CLOSED?this._connect():(this._disconnect(t,n),this._connect())},e.prototype.send=function(t){if(this._ws&&this._ws.readyState===this.OPEN)this._debug("send",t),this._ws.send(t);else{var n=this._options.maxEnqueuedMessages,i=n===void 0?Js.maxEnqueuedMessages:n;this._messageQueue.length<i&&(this._debug("enqueue",t),this._messageQueue.push(t))}},e.prototype.addEventListener=function(t,n){this._listeners[t]&&this._listeners[t].push(n)},e.prototype.dispatchEvent=function(t){var n,i,r=this._listeners[t.type];if(r)try{for(var s=p4(r),o=s.next();!o.done;o=s.next()){var a=o.value;this._callEventListener(t,a)}}catch(c){n={error:c}}finally{try{o&&!o.done&&(i=s.return)&&i.call(s)}finally{if(n)throw n.error}}return!0},e.prototype.removeEventListener=function(t,n){this._listeners[t]&&(this._listeners[t]=this._listeners[t].filter(function(i){return i!==n}))},e.prototype._debug=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this._options.debug&&console.log.apply(console,g4(["RWS>"],t))},e.prototype._getNextDelay=function(){var t=this._options,n=t.reconnectionDelayGrowFactor,i=n===void 0?Js.reconnectionDelayGrowFactor:n,r=t.minReconnectionDelay,s=r===void 0?Js.minReconnectionDelay:r,o=t.maxReconnectionDelay,a=o===void 0?Js.maxReconnectionDelay:o,c=0;return this._retryCount>0&&(c=s*Math.pow(i,this._retryCount-1),c>a&&(c=a)),this._debug("next delay",c),c},e.prototype._wait=function(){var t=this;return new Promise(function(n){setTimeout(n,t._getNextDelay())})},e.prototype._getNextUrl=function(t){if(typeof t=="string")return Promise.resolve(t);if(typeof t=="function"){var n=t();if(typeof n=="string")return Promise.resolve(n);if(n.then)return n}throw Error("Invalid URL")},e.prototype._connect=function(){var t=this;if(!(this._connectLock||!this._shouldReconnect)){this._connectLock=!0;var n=this._options,i=n.maxRetries,r=i===void 0?Js.maxRetries:i,s=n.connectionTimeout,o=s===void 0?Js.connectionTimeout:s,a=n.WebSocket,c=a===void 0?b4():a;if(this._retryCount>=r){this._debug("max retries reached",this._retryCount,">=",r);return}if(this._retryCount++,this._debug("connect",this._retryCount),this._removeListeners(),!_4(c))throw Error("No valid WebSocket class provided");this._wait().then(function(){return t._getNextUrl(t._url)}).then(function(l){t._closeCalled||(t._debug("connect",{url:l,protocols:t._protocols}),t._ws=t._protocols?new c(l,t._protocols):new c(l),t._ws.binaryType=t._binaryType,t._connectLock=!1,t._addListeners(),t._connectTimeout=setTimeout(function(){return t._handleTimeout()},o))})}},e.prototype._handleTimeout=function(){this._debug("timeout event"),this._handleError(new v4(Error("TIMEOUT"),this))},e.prototype._disconnect=function(t,n){if(t===void 0&&(t=1e3),this._clearTimeouts(),!!this._ws){this._removeListeners();try{this._ws.close(t,n),this._handleClose(new y4(t,n,this))}catch{}}},e.prototype._acceptOpen=function(){this._debug("accept open"),this._retryCount=0},e.prototype._callEventListener=function(t,n){"handleEvent"in n?n.handleEvent(t):n(t)},e.prototype._removeListeners=function(){this._ws&&(this._debug("removeListeners"),this._ws.removeEventListener("open",this._handleOpen),this._ws.removeEventListener("close",this._handleClose),this._ws.removeEventListener("message",this._handleMessage),this._ws.removeEventListener("error",this._handleError))},e.prototype._addListeners=function(){this._ws&&(this._debug("addListeners"),this._ws.addEventListener("open",this._handleOpen),this._ws.addEventListener("close",this._handleClose),this._ws.addEventListener("message",this._handleMessage),this._ws.addEventListener("error",this._handleError))},e.prototype._clearTimeouts=function(){clearTimeout(this._connectTimeout),clearTimeout(this._uptimeTimeout)},e})(),po=null;typeof WebSocket<"u"?po=WebSocket:typeof MozWebSocket<"u"?po=MozWebSocket:typeof global<"u"?po=global.WebSocket||global.MozWebSocket:typeof window<"u"?po=window.WebSocket||window.MozWebSocket:typeof self<"u"&&(po=self.WebSocket||self.MozWebSocket);function x4(e){var t=typeof e<"u"&&!!e&&e.CLOSING===2;if(!t)throw console.dir(e),new Error("websocket not valid")}async function C4(e){x4(po);var t=new w4(e.url,[],{WebSocket:po}),n=new ui(!1),i=new Fe,r=new Fe;return t.onerror=s=>{var o=U("RC_STREAM",{errors:Cd(s).map(a=>Dd(a)),direction:"pull"});r.next(o)},await new Promise(s=>{t.onopen=()=>{if(e.headers){var o={collection:e.collection.name,id:Qo(10),params:[e.headers],method:"auth"};t.send(JSON.stringify(o))}n.next(!0),s()}}),t.onclose=()=>{n.next(!1)},t.onmessage=s=>{var o=JSON.parse(s.data);i.next(o)},{url:e.url,socket:t,connected$:n,message$:i,error$:r}}async function k4(e){var t=await C4(e),n=t.socket,i=t.message$,r=0,s=Qo(10);function o(){var c=r++;return e.collection.database.token+"|"+s+"|"+c}var a=d4({collection:e.collection,replicationIdentifier:e.replicationIdentifier,live:e.live,pull:{batchSize:e.batchSize,stream$:i.pipe(It(c=>c.id==="stream"&&c.collection===e.collection.name),Ht(c=>c.result)),async handler(c,l){var u=o(),h={id:u,collection:e.collection.name,method:"masterChangesSince",params:[c,l]};n.send(JSON.stringify(h));var d=await Pr(i.pipe(It(f=>f.id===u),Ht(f=>f.result)));return d}},push:{batchSize:e.batchSize,handler(c){var l=o(),u={id:l,collection:e.collection.name,method:"masterWrite",params:[c]};return n.send(JSON.stringify(u)),Pr(i.pipe(It(h=>h.id===l),Ht(h=>h.result)))}}});return t.error$.subscribe(c=>a.subjects.error.next(c)),t.connected$.subscribe(c=>{if(c){a.reSync();var l={id:"stream",collection:e.collection.name,method:"masterChangeStream$",params:[]};n.send(JSON.stringify(l))}}),e.collection.onClose.push(()=>t.socket.close()),a}async function S4(e){const t=await fetch(`${e}/health`);if(!t.ok)throw new Error(`Server returned ${t.status} ${t.statusText}`)}const E4=["transactions","tags","merchants","accounts","merchant_rules","dashboard_charts","dashboard_tables"],Yh=new ui({state:"not-configured"}),M4=Yh.pipe(U1(e=>{if(e.state==="not-configured")return Dy("not-configured");if(e.state==="connecting")return Dy("connecting");const{replications:t}=e,n=Am(...t.map(r=>r.error$)).pipe(Ht(()=>"error")),i=_0(t.map(r=>r.active$)).pipe(Ht(r=>r.some(Boolean)?"syncing":"synced"));return Am(i,n)}));async function D4(e){Yh.next({state:"connecting"});const n=(await Z()).rxdb,i=e.replace(/^http/,"ws")+"/ws",r=await Promise.all(E4.map(async s=>{const o=n[s],a=`budgee--${s}`;try{await fetch(`${e}/databases`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:a,schema:o.schema.jsonSchema})})}catch(c){console.warn(`Failed to register schema for ${s}:`,c)}return k4({collection:o,replicationIdentifier:a,url:`${i}/${a}`,live:!0})}));return Yh.next({state:"connected",replications:r}),async()=>{Yh.next({state:"not-configured"}),await Promise.all(r.map(s=>s.cancel().catch(console.error)))}}function $4(e){let t=e|0;return()=>{t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const T4=[{id:"tag-groceries",name:"groceries",icon:"shopping-cart",color:"#4caf50"},{id:"tag-dining",name:"dining out",icon:"utensils",color:"#ff9800"},{id:"tag-coffee",name:"coffee",icon:"coffee",color:"#795548"},{id:"tag-transport",name:"transport",icon:"car",color:"#2196f3"},{id:"tag-entertainment",name:"entertainment",icon:"tv",color:"#9c27b0"},{id:"tag-utilities",name:"utilities",icon:"lightbulb",color:"#607d8b"},{id:"tag-healthcare",name:"healthcare",icon:"heart",color:"#f44336"},{id:"tag-shopping",name:"shopping",icon:"shopping-bag",color:"#e91e63"},{id:"tag-travel",name:"travel",icon:"plane",color:"#00bcd4"},{id:"tag-income",name:"income",icon:"wallet",color:"#8bc34a"}],I4=[{id:"m-freshmart",name:"FreshMart"},{id:"m-wholefoods",name:"Whole Foods"},{id:"m-traderjoes",name:"Trader Joe's"},{id:"m-sakura",name:"Sakura Japanese"},{id:"m-pizzaplace",name:"Tony's Pizza"},{id:"m-burgerbar",name:"The Burger Bar"},{id:"m-beanbrew",name:"Bean & Brew"},{id:"m-dailygrind",name:"The Daily Grind"},{id:"m-metrogas",name:"Metro Gas"},{id:"m-rideshare",name:"QuickRide"},{id:"m-streamflix",name:"StreamFlix"},{id:"m-gamepass",name:"GamePass"},{id:"m-powerco",name:"PowerCo Electric"},{id:"m-aquautil",name:"AquaUtil Water"},{id:"m-cityclinic",name:"City Clinic"},{id:"m-pharmacy",name:"HealthPlus Pharmacy"},{id:"m-urbanstyle",name:"Urban Style"},{id:"m-techstore",name:"TechZone"},{id:"m-skyair",name:"SkyAir"},{id:"m-employer",name:"Acme Corp"}],O4=[{id:"acc-chequing",name:"Main Chequing",type:"chequing"},{id:"acc-savings",name:"Savings",type:"savings"},{id:"acc-credit",name:"Visa Platinum",type:"credit_card"}],P4=[{id:"rule-freshmart",logic:"and",conditions:[{field:"description",operator:"contains",value:"FRESHMART"}],merchantId:"m-freshmart",tagIds:["tag-groceries"]},{id:"rule-beanbrew",logic:"and",conditions:[{field:"description",operator:"contains",value:"BEAN & BREW"}],merchantId:"m-beanbrew",tagIds:["tag-coffee"]},{id:"rule-streamflix",logic:"and",conditions:[{field:"description",operator:"contains",value:"STREAMFLIX"}],merchantId:"m-streamflix",tagIds:["tag-entertainment"]},{id:"rule-powerco",logic:"and",conditions:[{field:"description",operator:"contains",value:"POWERCO"}],merchantId:"m-powerco",tagIds:["tag-utilities"]},{id:"rule-acme",logic:"and",conditions:[{field:"description",operator:"contains",value:"ACME CORP"}],merchantId:"m-employer",tagIds:["tag-income"]}],R4=[{id:"chart-monthly",title:"Monthly Spending",chartType:"bar",granularity:"month",direction:"debit",position:0,colSpan:8,rowSpan:4},{id:"chart-by-tag",title:"Spending by Category",chartType:"doughnut",granularity:"byTag",direction:"debit",position:1,colSpan:4,rowSpan:4},{id:"chart-yearly",title:"Yearly Trend",chartType:"line",granularity:"year",direction:"debit",position:2,colSpan:6,rowSpan:4},{id:"chart-income-expense",title:"Income vs Expenses",chartType:"bar",granularity:"month",position:3,colSpan:6,rowSpan:4}],A4=[{id:"table-recent",title:"Recent Transactions",model:"transactions",columns:["date","amount","description","merchant","tags"],position:4,colSpan:8,rowSpan:4},{id:"table-merchants",title:"Top Merchants",model:"merchants",columns:["name","transactionCount","totalAmount"],position:5,colSpan:4,rowSpan:4}],L4=[{merchantId:"m-freshmart",tagIds:["tag-groceries"],accountId:"acc-credit",amountMin:30,amountMax:120,frequency:"weekly",perWeek:1,description:"FRESHMART #1042"},{merchantId:"m-wholefoods",tagIds:["tag-groceries"],accountId:"acc-credit",amountMin:40,amountMax:150,frequency:"weekly",perWeek:.7,description:"WHOLE FOODS MKT"},{merchantId:"m-traderjoes",tagIds:["tag-groceries"],accountId:"acc-credit",amountMin:25,amountMax:80,frequency:"weekly",perWeek:.5,description:"TRADER JOE'S #219"},{merchantId:"m-beanbrew",tagIds:["tag-coffee"],accountId:"acc-credit",amountMin:4,amountMax:8,frequency:"weekly",perWeek:2,description:"BEAN & BREW CAFE"},{merchantId:"m-dailygrind",tagIds:["tag-coffee"],accountId:"acc-credit",amountMin:4,amountMax:7,frequency:"weekly",perWeek:1,description:"THE DAILY GRIND"},{merchantId:"m-sakura",tagIds:["tag-dining"],accountId:"acc-credit",amountMin:25,amountMax:60,frequency:"weekly",perWeek:.4,description:"SAKURA JAPANESE REST"},{merchantId:"m-pizzaplace",tagIds:["tag-dining"],accountId:"acc-credit",amountMin:15,amountMax:40,frequency:"weekly",perWeek:.3,description:"TONY'S PIZZA"},{merchantId:"m-burgerbar",tagIds:["tag-dining"],accountId:"acc-credit",amountMin:12,amountMax:30,frequency:"weekly",perWeek:.3,description:"THE BURGER BAR"},{merchantId:"m-metrogas",tagIds:["tag-transport"],accountId:"acc-chequing",amountMin:35,amountMax:70,frequency:"biweekly",description:"METRO GAS STATION"},{merchantId:"m-rideshare",tagIds:["tag-transport"],accountId:"acc-credit",amountMin:8,amountMax:25,frequency:"weekly",perWeek:1,description:"QUICKRIDE *TRIP"},{merchantId:"m-streamflix",tagIds:["tag-entertainment"],accountId:"acc-credit",amountMin:15.99,amountMax:15.99,frequency:"monthly",description:"STREAMFLIX MONTHLY"},{merchantId:"m-gamepass",tagIds:["tag-entertainment"],accountId:"acc-credit",amountMin:9.99,amountMax:9.99,frequency:"monthly",description:"GAMEPASS SUBSCRIPTION"},{merchantId:"m-powerco",tagIds:["tag-utilities"],accountId:"acc-chequing",amountMin:60,amountMax:150,frequency:"monthly",description:"POWERCO ELECTRIC"},{merchantId:"m-aquautil",tagIds:["tag-utilities"],accountId:"acc-chequing",amountMin:30,amountMax:60,frequency:"monthly",description:"AQUAUTIL WATER SVC"},{merchantId:"m-cityclinic",tagIds:["tag-healthcare"],accountId:"acc-credit",amountMin:50,amountMax:200,frequency:"sporadic",perYear:4,description:"CITY CLINIC COPAY"},{merchantId:"m-pharmacy",tagIds:["tag-healthcare"],accountId:"acc-credit",amountMin:10,amountMax:80,frequency:"sporadic",perYear:8,description:"HEALTHPLUS PHARMACY"},{merchantId:"m-urbanstyle",tagIds:["tag-shopping"],accountId:"acc-credit",amountMin:30,amountMax:200,frequency:"sporadic",perYear:10,description:"URBAN STYLE CLOTHING"},{merchantId:"m-techstore",tagIds:["tag-shopping"],accountId:"acc-credit",amountMin:20,amountMax:500,frequency:"sporadic",perYear:6,description:"TECHZONE ELECTRONICS"},{merchantId:"m-skyair",tagIds:["tag-travel"],accountId:"acc-credit",amountMin:200,amountMax:800,frequency:"sporadic",perYear:3,description:"SKYAIR AIRLINES"},{merchantId:"m-employer",tagIds:["tag-income"],accountId:"acc-chequing",amountMin:4200,amountMax:4200,frequency:"monthly",description:"ACME CORP PAYROLL",isCredit:!0}];function yh(e){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function N4(e){const t=[],n=new Date,i=new Date(n.getFullYear()-3,n.getMonth(),1);let r=0;for(const s of L4){const o=new Date(i);if(s.frequency==="weekly"){const a=s.perWeek??1;for(;o<=n;){if(e()<a/7){const c=bh(s.amountMin+e()*(s.amountMax-s.amountMin));t.push({id:`demo-tx-${r++}`,date:yh(o),amount:s.isCredit?c:-c,description:s.description,merchantId:s.merchantId,accountId:s.accountId,tagIds:[...s.tagIds]})}o.setDate(o.getDate()+1)}}else if(s.frequency==="biweekly")for(;o<=n;){const a=o.getDate();if(a===1||a===15){const c=bh(s.amountMin+e()*(s.amountMax-s.amountMin));t.push({id:`demo-tx-${r++}`,date:yh(o),amount:s.isCredit?c:-c,description:s.description,merchantId:s.merchantId,accountId:s.accountId,tagIds:[...s.tagIds]})}o.setDate(o.getDate()+1)}else if(s.frequency==="monthly")for(;o<=n;){const a=Math.floor(e()*25)+1,c=new Date(o.getFullYear(),o.getMonth(),a);if(c<=n){const l=bh(s.amountMin+e()*(s.amountMax-s.amountMin));t.push({id:`demo-tx-${r++}`,date:yh(c),amount:s.isCredit?l:-l,description:s.description,merchantId:s.merchantId,accountId:s.accountId,tagIds:[...s.tagIds]})}o.setMonth(o.getMonth()+1)}else if(s.frequency==="sporadic"){const c=(s.perYear??4)/365;for(;o<=n;){if(e()<c){const l=bh(s.amountMin+e()*(s.amountMax-s.amountMin));t.push({id:`demo-tx-${r++}`,date:yh(o),amount:s.isCredit?l:-l,description:s.description,merchantId:s.merchantId,accountId:s.accountId,tagIds:[...s.tagIds]})}o.setDate(o.getDate()+1)}}}return t}function bh(e){return Math.round(e*100)/100}async function F4(e){const t=$4(42),n=N4(t);await Promise.all([e.tags.bulkDocs(T4),e.merchants.bulkDocs(I4),e.accounts.bulkDocs(O4),e.merchantRules.bulkDocs(P4),e.dashboardCharts.bulkDocs(R4),e.dashboardTables.bulkDocs(A4),e.transactions.bulkDocs(n)])}const Li=dt`
  button {
    padding: 4px 12px;
    cursor: pointer;
    background-color: var(--budgee-primary);
    color: white;
    border: none;
    border-radius: 4px;
  }
  button:hover:not(:disabled) {
    background-color: var(--budgee-primary-hover);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  button.secondary {
    background-color: var(--budgee-secondary);
  }
  button.secondary:hover:not(:disabled) {
    background-color: var(--budgee-secondary-hover);
  }
  button.danger {
    background-color: var(--budgee-danger);
  }
  button.danger:hover:not(:disabled) {
    background-color: var(--budgee-danger-hover);
  }
`,d2=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`;var z4=Object.defineProperty,j4=Object.getOwnPropertyDescriptor,f2=e=>{throw TypeError(e)},p2=(e,t,n,i)=>{for(var r=i>1?void 0:i?j4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&z4(t,n,r),r},B4=(e,t,n)=>t.has(e)||f2("Cannot "+n),W4=(e,t,n)=>t.has(e)?f2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),mb=(e,t,n)=>(B4(e,t,"access private method"),n),qh,m2,g2;let Bd=class extends gt{constructor(){super(...arguments),W4(this,qh),this.heading=""}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.shadowRoot?.getElementById("popover");e?.showPopover?.(),e?.addEventListener("toggle",t=>{t.newState==="closed"&&this.dispatchEvent(new CustomEvent("modal-close"))}),mb(this,qh,m2).call(this)})}render(){return E`
      <div id="popover" popover="auto" role="dialog" aria-modal="true" aria-label=${this.heading}>
        <div class="header">
          <h3>${this.heading}</h3>
          <button class="close" aria-label="Close" @click=${mb(this,qh,g2)}>${ye(d2)}</button>
        </div>
        <slot></slot>
      </div>
    `}};qh=new WeakSet;m2=function(){const e=this.shadowRoot?.getElementById("popover");e&&e.addEventListener("keydown",t=>{if(t.key!=="Tab")return;const n='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',i=[...Array.from(e.querySelectorAll(n)),...Array.from(this.querySelectorAll(n))];if(i.length===0)return;const r=i[0],s=i[i.length-1];t.shiftKey&&document.activeElement===r?(t.preventDefault(),s.focus()):!t.shiftKey&&document.activeElement===s&&(t.preventDefault(),r.focus())})};g2=function(){this.shadowRoot?.getElementById("popover")?.hidePopover?.()};Bd.styles=dt`
    [popover] {
      background: var(--budgee-surface);
      border-radius: 8px;
      padding: 1.5rem;
      max-width: 800px;
      width: min(90vw, 800px);
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 24px lch(0% 0 none / 0.2);
      border: none;
      margin: auto;
      position: fixed;
      inset: 0;
      height: fit-content;
    }
    [popover]::backdrop {
      background: var(--budgee-overlay);
      backdrop-filter: blur(1px);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h3 {
      margin: 0;
    }
    .close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--budgee-text-muted);
      padding: 4px;
      line-height: 1;
    }
    .close:hover {
      color: var(--budgee-text);
    }
    .close svg {
      width: 20px;
      height: 20px;
    }
  `;p2([H({type:String})],Bd.prototype,"heading",2);Bd=p2([Et("budgee-modal")],Bd);var H4=Object.defineProperty,U4=Object.getOwnPropertyDescriptor,v2=e=>{throw TypeError(e)},xc=(e,t,n,i)=>{for(var r=i>1?void 0:i?U4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&H4(t,n,r),r},F0=(e,t,n)=>t.has(e)||v2("Cannot "+n),z0=(e,t,n)=>(F0(e,t,"read from private field"),n?n.call(e):t.get(e)),gb=(e,t,n)=>t.has(e)?v2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Y4=(e,t,n,i)=>(F0(e,t,"write to private field"),t.set(e,n),n),Hp=(e,t,n)=>(F0(e,t,"access private method"),n),Ja,nl,y2,b2,_2;let _i=class extends gt{constructor(){super(...arguments),gb(this,nl),this.heading="Are you sure?",this.message="",this.confirmLabel="Confirm",this.cancelLabel="Cancel",this.danger=!1,gb(this,Ja)}static show(e){return new Promise(t=>{const n=document.createElement("budgee-confirm-dialog");e.heading&&(n.heading=e.heading),n.message=e.message,e.confirmLabel&&(n.confirmLabel=e.confirmLabel),e.cancelLabel&&(n.cancelLabel=e.cancelLabel),e.danger&&(n.danger=e.danger),Y4(n,Ja,i=>{n.remove(),t(i)}),document.body.appendChild(n)})}render(){return E`
      <budgee-modal heading=${this.heading} @modal-close=${Hp(this,nl,_2)}>
        <div class="message">${this.message}</div>
        <div class="actions">
          <button class="secondary" @click=${Hp(this,nl,b2)}>${this.cancelLabel}</button>
          <button class=${this.danger?"danger":""} @click=${Hp(this,nl,y2)}>
            ${this.confirmLabel}
          </button>
        </div>
      </budgee-modal>
    `}};Ja=new WeakMap;nl=new WeakSet;y2=function(){var e;(e=z0(this,Ja))==null||e.call(this,!0)};b2=function(){var e;(e=z0(this,Ja))==null||e.call(this,!1)};_2=function(){var e;(e=z0(this,Ja))==null||e.call(this,!1)};_i.styles=[Li,dt`
      .message {
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      button {
        padding: 0.5rem 1rem;
      }
    `];xc([H()],_i.prototype,"heading",2);xc([H()],_i.prototype,"message",2);xc([H({attribute:"confirm-label"})],_i.prototype,"confirmLabel",2);xc([H({attribute:"cancel-label"})],_i.prototype,"cancelLabel",2);xc([H({type:Boolean})],_i.prototype,"danger",2);_i=xc([Et("budgee-confirm-dialog")],_i);var q4=Object.defineProperty,V4=Object.getOwnPropertyDescriptor,w2=e=>{throw TypeError(e)},Hu=(e,t,n,i)=>{for(var r=i>1?void 0:i?V4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&q4(t,n,r),r},K4=(e,t,n)=>t.has(e)||w2("Cannot "+n),G4=(e,t,n)=>t.has(e)?w2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Wd=(e,t,n)=>(K4(e,t,"access private method"),n),Fa,x2,C2,k2,S2;let No=class extends gt{constructor(){super(...arguments),G4(this,Fa),this.error="An unexpected error occurred.",this.isDatabaseError=!1,this._exporting=!1,this._deleting=!1}render(){return E`
      <div class="card">
        <h2>${this.isDatabaseError?"Database Error":"Something Went Wrong"}</h2>
        <p>${this.error}</p>
        <div class="actions">
          ${this.isDatabaseError?Wd(this,Fa,x2).call(this):Wd(this,Fa,C2).call(this)}
        </div>
      </div>
    `}};Fa=new WeakSet;x2=function(){return E`
      <button class="export-btn" ?disabled=${this._exporting} @click=${Wd(this,Fa,k2)}>
        ${this._exporting?"Exporting…":"Export raw data"}
      </button>
      <button class="delete-btn" ?disabled=${this._deleting} @click=${Wd(this,Fa,S2)}>
        ${this._deleting?"Deleting…":"Delete database and reload"}
      </button>
    `};C2=function(){return E`
      <button class="reload-btn" @click=${()=>window.location.reload()}>Reload</button>
    `};k2=async function(){this._exporting=!0;try{const e=await X4(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`budgee-raw-export-${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(n)}catch(e){console.error("Export failed:",e),alert("Export failed. Check the browser console for details.")}finally{this._exporting=!1}};S2=async function(){if(await _i.show({heading:"Delete Database",message:"This will permanently delete all local data. Are you sure?",confirmLabel:"Delete",danger:!0})){this._deleting=!0;try{const n=(await indexedDB.databases()).filter(i=>i.name?.startsWith("budgee"));await Promise.all(n.map(i=>new Promise((r,s)=>{const o=indexedDB.deleteDatabase(i.name);o.onsuccess=()=>r(),o.onerror=()=>s(o.error)}))),window.location.reload()}catch(t){console.error("Delete failed:",t),alert("Delete failed. Check the browser console for details."),this._deleting=!1}}};No.styles=dt`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: sans-serif;
      color: white;
    }

    .card {
      background: var(--budgee-surface, #1e1e2e);
      border: 1px solid var(--budgee-border, #444);
      border-radius: 12px;
      padding: 2rem;
      max-width: 480px;
      text-align: center;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.4rem;
    }

    p {
      color: var(--budgee-text-muted, #aaa);
      line-height: 1.5;
      margin: 0 0 1.5rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .export-btn {
      background: var(--budgee-primary, #7c3aed);
      color: white;
    }

    .delete-btn {
      background: var(--budgee-danger);
      color: white;
    }

    .reload-btn {
      background: var(--budgee-primary, #7c3aed);
      color: white;
    }
  `;Hu([H()],No.prototype,"error",2);Hu([H({type:Boolean})],No.prototype,"isDatabaseError",2);Hu([P()],No.prototype,"_exporting",2);Hu([P()],No.prototype,"_deleting",2);No=Hu([Et("budgee-error-overlay")],No);async function X4(){const t=(await indexedDB.databases()).filter(i=>i.name?.startsWith("budgee")),n={};for(const i of t){const r=i.name,s=await new Promise((c,l)=>{const u=indexedDB.open(r);u.onsuccess=()=>c(u.result),u.onerror=()=>l(u.error)}),o={},a=Array.from(s.objectStoreNames);if(a.length>0){const c=s.transaction(a,"readonly");for(const l of a)o[l]=await new Promise((u,h)=>{const d=c.objectStore(l).getAll();d.onsuccess=()=>u(d.result),d.onerror=()=>h(d.error)})}s.close(),n[r]=o}return n}function Jm(e,t){if(document.querySelector("budgee-error-overlay"))return;const i=document.createElement("budgee-error-overlay");i.error=e,i.isDatabaseError=t?.isDatabaseError??!1,document.body.appendChild(i)}function Q4(){window.addEventListener("error",e=>{const t=e.message||"An unknown error occurred.";Jm(t)}),window.addEventListener("unhandledrejection",e=>{const t=e.reason,n=t instanceof Error?t.message:t?String(t):"An unhandled promise rejection occurred.";Jm(n)})}const E2=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-bird"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 7h.01" />
  <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
  <path d="m20 7 2 .5-2 .5" />
  <path d="M10 18v3" />
  <path d="M14 17.75V21" />
  <path d="M7 18a6 6 0 0 0 3.84-10.61" />
</svg>
`;var Z4=Object.defineProperty,J4=Object.getOwnPropertyDescriptor,M2=(e,t,n,i)=>{for(var r=i>1?void 0:i?J4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Z4(t,n,r),r};let Hd=class extends gt{constructor(){super(...arguments),this.message=""}render(){return E`
      <div class="icon">${ye(E2)}</div>
      <div class="message">${this.message}</div>
    `}};Hd.styles=dt`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      gap: 1rem;
    }

    .icon {
      animation: pulse 1.2s ease-in-out infinite;
    }

    .icon svg {
      width: 3rem;
      height: 3rem;
      color: white;
    }

    .message {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      font-family: sans-serif;
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.15);
        opacity: 1;
      }
    }
  `;M2([H()],Hd.prototype,"message",2);Hd=M2([Et("budgee-loading-overlay")],Hd);let fs=null;function j0(e){if(fs){fs.message=e;return}fs=document.createElement("budgee-loading-overlay"),fs.message=e,document.body.appendChild(fs)}function B0(){fs&&(fs.remove(),fs=null)}let Wc=null,vb=!1;async function Up(){if(Wc)return Wc;const e=await Z();return Wc=(await e.transactions.all()).map(n=>new _e(n)),vb||(vb=!0,e.transactions.subscribe(()=>{Wc=null})),Wc}class _e{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).transactions.subscribe(t)}static async all(){return Up()}static async get(t){const n=await Z();try{return new _e(await n.transactions.get(t))}catch{return}}static async update(t,n){const i=await Z(),r=await i.transactions.get(t);await i.transactions.put({...r,...n})}static async bulkPut(t){await(await Z()).transactions.bulkDocs(t.map(i=>({...i,id:i.id??ir()})))}static async bulkAdd(t){await(await Z()).transactions.bulkDocs(t.map(i=>({...i,id:ir()})))}static async forMerchant(t){return(await Up()).filter(i=>i.merchantId===t).sort((i,r)=>r.date.localeCompare(i.date))}static async forAccount(t){return(await Up()).filter(i=>i.accountId===t).sort((i,r)=>r.date.localeCompare(i.date))}static async bulkRemove(t){const n=await Z();await Promise.all(t.map(i=>n.transactions.remove(i)))}static async deleteAll(){const t=await Z(),n=await t.transactions.all();return await Promise.all(n.map(i=>t.transactions.remove(i.id))),n.length}static async deleteForAccount(t){const n=await Z(),r=(await n.transactions.all()).filter(s=>s.accountId===t);return await Promise.all(r.map(s=>n.transactions.remove(s.id))),r.length}}class Oe{constructor(t){this.id=t.id,this.name=t.name}static async subscribe(t){return(await Z()).merchants.subscribe(t)}static async all(){return(await(await Z()).merchants.all()).map(n=>new Oe(n))}static async get(t){const n=await Z();try{return new Oe(await n.merchants.get(t))}catch{return}}static async create(t){const n=await Z(),i={id:ir(),name:t};return await n.merchants.put(i),new Oe(i)}static async update(t,n){const i=await Z(),r=await i.merchants.get(t);await i.merchants.put({...r,...n})}static async remove(t){await(await Z()).merchants.remove(t)}static async byName(t){const r=(await(await Z()).merchants.all()).find(s=>s.name.toLowerCase()===t.toLowerCase());return r?new Oe(r):void 0}}function tL(){const e=40+Math.floor(Math.random()*20),t=20+Math.floor(Math.random()*30),n=Math.floor(Math.random()*360);return`lch(${e} ${t} ${n})`}class pe{constructor(t){this.id=t.id,this.name=t.name,this.icon=t.icon,this.color=t.color}static async subscribe(t){return(await Z()).tags.subscribe(t)}static async all(){return(await(await Z()).tags.all()).map(n=>new pe(n))}static async create(t,n){const i=await Z(),r={id:ir(),name:t,color:tL(),...n};return await i.tags.put(r),new pe(r)}static async update(t,n){const i=await Z(),r=await i.tags.get(t);await i.tags.put({...r,...n})}static async remove(t){await(await Z()).tags.remove(t)}static async byName(t){const r=(await(await Z()).tags.all()).find(s=>s.name.toLowerCase()===t.toLowerCase());return r?new pe(r):void 0}}class ke{constructor(t){this.id=t.id,this.name=t.name,this.type=t.type}static async subscribe(t){return(await Z()).accounts.subscribe(t)}static async all(){return(await(await Z()).accounts.all()).map(n=>new ke(n))}static async get(t){const n=await Z();try{return new ke(await n.accounts.get(t))}catch{return}}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.accounts.put(i),new ke(i)}static async update(t,n){const i=await Z(),r=await i.accounts.get(t);await i.accounts.put({...r,...n})}static async remove(t){await(await Z()).accounts.remove(t)}static toLookup(t){const n={};for(const i of t)n[i.id]=i;return n}}function Cc(e){const t=new URL(e,window.location.origin),n=new URLSearchParams(window.location.search).get("demo");n&&t.searchParams.set("demo",n),window.history.pushState({},"",t.pathname+t.search),window.dispatchEvent(new PopStateEvent("popstate"))}var eL=Object.defineProperty,nL=Object.getOwnPropertyDescriptor,D2=e=>{throw TypeError(e)},Uu=(e,t,n,i)=>{for(var r=i>1?void 0:i?nL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&eL(t,n,r),r},W0=(e,t,n)=>t.has(e)||D2("Cannot "+n),tg=(e,t,n)=>(W0(e,t,"read from private field"),n?n.call(e):t.get(e)),Yp=(e,t,n)=>t.has(e)?D2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),iL=(e,t,n,i)=>(W0(e,t,"write to private field"),t.set(e,n),n),li=(e,t,n)=>(W0(e,t,"access private method"),n),Ud,Vh,In,$2,Ff,T2,I2,O2,H0,P2,R2,A2;let Fo=class extends gt{constructor(){super(...arguments),Yp(this,In),this._open=!1,this._query="",this._results=[],this._activeIndex=0,Yp(this,Ud),Yp(this,Vh,e=>{(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),li(this,In,$2).call(this))})}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",tg(this,Vh))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",tg(this,Vh))}render(){if(!this._open)return tt;const e=li(this,In,R2).call(this);let t=0;return E`
      <div @click=${li(this,In,P2)}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Search">
          <input
            type="text"
            placeholder="Search transactions, merchants, tags, accounts…"
            .value=${this._query}
            @input=${li(this,In,T2)}
            @keydown=${li(this,In,O2)}
            aria-label="Search"
          />
          <div class="results">
            ${this._results.length===0&&this._query.trim()?E`
                    <div class="empty">No results found</div>
                  `:""}
            ${[...e.entries()].map(([n,i])=>E`
                <div class="group-label">${li(this,In,A2).call(this,n)}</div>
                ${i.map(r=>{const s=t++;return E`
                    <div
                      class=${u0({result:!0,active:s===this._activeIndex})}
                      @click=${()=>li(this,In,H0).call(this,r)}
                      @mouseenter=${()=>{this._activeIndex=s}}
                    >
                      <span class="result-label">${r.label}</span>
                      ${r.detail?E`<span class="result-detail">${r.detail}</span>`:""}
                    </div>
                  `})}
              `)}
          </div>
          <div class="hint">
            <span><kbd>↑↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Open</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    `}};Ud=new WeakMap;Vh=new WeakMap;In=new WeakSet;$2=function(){this._open=!0,this.setAttribute("open",""),this._query="",this._results=[],this._activeIndex=0,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};Ff=function(){this._open=!1,this.removeAttribute("open"),this._query="",this._results=[]};T2=function(e){this._query=e.target.value,this._activeIndex=0,clearTimeout(tg(this,Ud)),this._query.trim()?iL(this,Ud,setTimeout(()=>li(this,In,I2).call(this),150)):this._results=[]};I2=async function(){const e=this._query.trim().toLowerCase();if(!e)return;const t=[],[n,i,r,s]=await Promise.all([_e.all(),Oe.all(),pe.all(),ke.all()]);for(const a of i)a.name.toLowerCase().includes(e)&&t.push({type:"merchant",id:a.id,label:a.name,href:`/merchants/${a.id}`});for(const a of r)a.name.toLowerCase().includes(e)&&t.push({type:"tag",id:a.id,label:a.name,href:"/tags"});for(const a of s)a.name.toLowerCase().includes(e)&&t.push({type:"account",id:a.id,label:a.name,href:`/accounts/${a.id}`});let o=0;for(const a of n){if(o>=5)break;a.description.toLowerCase().includes(e)&&(t.push({type:"transaction",id:a.id,label:a.description,detail:`${a.date} · ${a.amount.toFixed(2)}`,href:`/transactions/${a.id}`}),o++)}this._results=t};O2=function(e){e.key==="Escape"?li(this,In,Ff).call(this):e.key==="ArrowDown"?(e.preventDefault(),this._activeIndex=Math.min(this._activeIndex+1,this._results.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._activeIndex=Math.max(this._activeIndex-1,0)):e.key==="Enter"&&this._results[this._activeIndex]&&li(this,In,H0).call(this,this._results[this._activeIndex])};H0=function(e){li(this,In,Ff).call(this),Cc(e.href)};P2=function(e){e.target===e.currentTarget&&li(this,In,Ff).call(this)};R2=function(){const e=new Map;for(const t of this._results){const n=e.get(t.type)??[];n.push(t),e.set(t.type,n)}return e};A2=function(e){return{merchant:"Merchants",tag:"Tags",account:"Accounts",transaction:"Transactions"}[e]??e};Fo.styles=dt`
    :host {
      display: none;
    }

    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
      background: var(--budgee-overlay);
    }

    .panel {
      background: var(--budgee-surface);
      border: 1px solid var(--budgee-border);
      border-radius: 8px;
      width: min(90vw, 500px);
      max-height: 60vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 32px lch(0% 0 none / 0.2);
    }

    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-bottom: 1px solid var(--budgee-border);
      background: transparent;
      color: var(--budgee-text);
      font-size: 1rem;
      outline: none;
      box-sizing: border-box;
    }

    .results {
      overflow-y: auto;
      max-height: 50vh;
    }

    .group-label {
      padding: 0.4rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--budgee-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .result {
      padding: 0.5rem 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .result:hover,
    .result.active {
      background: var(--budgee-row-hover);
    }

    .result-label {
      font-size: 0.9rem;
    }

    .result-detail {
      font-size: 0.8rem;
      color: var(--budgee-text-muted);
    }

    .empty {
      padding: 2rem 1rem;
      text-align: center;
      color: var(--budgee-text-muted);
      font-size: 0.9rem;
    }

    .hint {
      padding: 0.5rem 1rem;
      border-top: 1px solid var(--budgee-border);
      font-size: 0.75rem;
      color: var(--budgee-text-muted);
      display: flex;
      gap: 1rem;
    }

    kbd {
      background: var(--budgee-bg);
      border: 1px solid var(--budgee-border);
      border-radius: 3px;
      padding: 0 4px;
      font-size: 0.7rem;
    }
  `;Uu([P()],Fo.prototype,"_open",2);Uu([P()],Fo.prototype,"_query",2);Uu([P()],Fo.prototype,"_results",2);Uu([P()],Fo.prototype,"_activeIndex",2);Fo=Uu([Et("budgee-global-search")],Fo);var rL=Object.defineProperty,sL=Object.getOwnPropertyDescriptor,L2=e=>{throw TypeError(e)},N2=(e,t,n,i)=>{for(var r=i>1?void 0:i?sL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&rL(t,n,r),r},F2=(e,t,n)=>t.has(e)||L2("Cannot "+n),mo=(e,t,n)=>(F2(e,t,"read from private field"),n?n.call(e):t.get(e)),qp=(e,t,n)=>t.has(e)?L2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),yb=(e,t,n)=>(F2(e,t,"access private method"),n),yo,Kh,Gh,eg;let oL=0,Yd=class extends gt{constructor(){super(...arguments),qp(this,Gh),this._toasts=[],qp(this,yo,new Map),qp(this,Kh,e=>{const{message:t,type:n="info",duration:i=4e3}=e.detail,r=oL++;this._toasts=[...this._toasts,{id:r,message:t,type:n,dismissing:!1}],mo(this,yo).set(r,setTimeout(()=>yb(this,Gh,eg).call(this,r),i))})}connectedCallback(){super.connectedCallback(),document.addEventListener("budgee-toast",mo(this,Kh))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-toast",mo(this,Kh));for(const e of mo(this,yo).values())clearTimeout(e);mo(this,yo).clear()}render(){return E`
      <div aria-live="polite" aria-atomic="false">
        ${this._toasts.map(e=>E`
            <div class=${u0({toast:!0,[e.type]:!0,dismissing:e.dismissing})}>
              <span class="message">${e.message}</span>
              <button class="close" aria-label="Dismiss" @click=${()=>yb(this,Gh,eg).call(this,e.id)}>
                ${ye(d2)}
              </button>
            </div>
          `)}
      </div>
    `}};yo=new WeakMap;Kh=new WeakMap;Gh=new WeakSet;eg=function(e){const t=mo(this,yo).get(e);t&&clearTimeout(t),mo(this,yo).delete(e),this._toasts=this._toasts.map(n=>n.id===e?{...n,dismissing:!0}:n),setTimeout(()=>{this._toasts=this._toasts.filter(n=>n.id!==e)},200)};Yd.styles=dt`
    :host {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 10000;
      display: flex;
      flex-direction: column-reverse;
      gap: 0.5rem;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      color: white;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 4px 12px lch(0% 0 none / 0.15);
      pointer-events: auto;
      animation: slide-in 0.2s ease-out;
      min-width: 250px;
      max-width: 400px;
    }

    .toast.dismissing {
      animation: slide-out 0.2s ease-in forwards;
    }

    .toast.success {
      background: var(--budgee-success);
    }
    .toast.error {
      background: var(--budgee-danger);
    }
    .toast.info {
      background: var(--budgee-primary);
    }

    .message {
      flex: 1;
    }

    .close {
      display: inline-flex;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 2px;
      opacity: 0.8;
      line-height: 1;
    }
    .close:hover {
      opacity: 1;
    }
    .close svg {
      width: 16px;
      height: 16px;
    }

    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;N2([P()],Yd.prototype,"_toasts",2);Yd=N2([Et("budgee-toast-manager")],Yd);const z2=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-banknote"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="12" x="2" y="6" rx="2" />
  <circle cx="12" cy="12" r="2" />
  <path d="M6 12h.01M18 12h.01" />
</svg>
`,aL=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-chart-column"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
  <path d="M18 17V9" />
  <path d="M13 17V5" />
  <path d="M8 17v-3" />
</svg>
`,cL=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-landmark"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 18v-7" />
  <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
  <path d="M14 18v-7" />
  <path d="M18 18v-7" />
  <path d="M3 22h18" />
  <path d="M6 18v-7" />
</svg>
`,lL=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-list-filter"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 5h20" />
  <path d="M6 12h12" />
  <path d="M9 19h6" />
</svg>
`,uL=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-settings"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,j2=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-store"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
  <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
  <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
</svg>
`,hL=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-tag"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
</svg>
`;function zf(e,t){const n=new Map;for(const i of e)for(const r of t(i)){if(r==null)continue;const s=n.get(r)??{count:0,total:0};s.count++,s.total+=i.amount,n.set(r,s)}return n}const xB=["chequing","savings","credit_card","investment"],dL={chequing:"Chequing",savings:"Savings",credit_card:"Credit Card",investment:"Investment"};function fL(e){return dL[e]}function ta(e,t){let n;return()=>{clearTimeout(n),n=setTimeout(e,t)}}var pL=Object.defineProperty,mL=Object.getOwnPropertyDescriptor,jf=(e,t,n,i)=>{for(var r=i>1?void 0:i?mL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&pL(t,n,r),r};let tc=class extends gt{constructor(){super(...arguments),this.icon="",this.heading="",this.description=""}render(){return E`
      ${this.icon?E`<div class="icon">${ye(this.icon)}</div>`:""}
      <h3>${this.heading}</h3>
      <p>${this.description}</p>
      <slot></slot>
    `}};tc.styles=dt`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
    }
    .icon {
      color: var(--budgee-text-muted);
      margin-bottom: 1rem;
    }
    .icon svg {
      width: 48px;
      height: 48px;
    }
    h3 {
      margin: 0 0 0.5rem;
      color: var(--budgee-text);
    }
    p {
      margin: 0 0 1rem;
      color: var(--budgee-text-muted);
      max-width: 300px;
    }
  `;jf([H()],tc.prototype,"icon",2);jf([H()],tc.prototype,"heading",2);jf([H()],tc.prototype,"description",2);tc=jf([Et("budgee-empty-state")],tc);const fr=dt`
  input,
  select,
  textarea {
    background: var(--budgee-surface);
    color: var(--budgee-text);
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
  }
`;var gL=Object.defineProperty,vL=Object.getOwnPropertyDescriptor,B2=e=>{throw TypeError(e)},ea=(e,t,n,i)=>{for(var r=i>1?void 0:i?vL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&gL(t,n,r),r},yL=(e,t,n)=>t.has(e)||B2("Cannot "+n),bL=(e,t,n)=>t.has(e)?B2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Di=(e,t,n)=>(yL(e,t,"access private method"),n),Gn,ec,W2,H2,U2,Y2,ng;let Hr=class extends gt{constructor(){super(...arguments),bL(this,Gn),this.totalItems=0,this.defaultPageSize=10,this.storageKey="",this.filterable=!1,this._currentPage=1,this._pageSize=0,this._filterDebounce=null}connectedCallback(){if(super.connectedCallback(),this.storageKey)try{const e=localStorage.getItem(`budgee:pageSize:${this.storageKey}`);e&&(this._pageSize=Number(e))}catch{}}get _effectivePageSize(){return this._pageSize||this.defaultPageSize}get _totalPages(){return Math.max(1,Math.ceil(this.totalItems/this._effectivePageSize))}firstUpdated(){Di(this,Gn,ec).call(this)}willUpdate(e){e.has("totalItems")&&(this._currentPage=1)}reset(){this._currentPage=1,Di(this,Gn,ec).call(this)}render(){return E`
      ${Di(this,Gn,ng).call(this)}
      <slot></slot>
      ${Di(this,Gn,ng).call(this)}
    `}};Gn=new WeakSet;ec=function(){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:this._currentPage,pageSize:this._effectivePageSize},bubbles:!0,composed:!0}))};W2=function(e){if(this._pageSize=Number(e.target.value),this._currentPage=1,this.storageKey)try{localStorage.setItem(`budgee:pageSize:${this.storageKey}`,String(this._pageSize))}catch{}Di(this,Gn,ec).call(this)};H2=function(){this._currentPage>1&&(this._currentPage--,Di(this,Gn,ec).call(this))};U2=function(){this._currentPage<this._totalPages&&(this._currentPage++,Di(this,Gn,ec).call(this))};Y2=function(e){const t=e.target.value;this._filterDebounce!==null&&clearTimeout(this._filterDebounce),this._filterDebounce=setTimeout(()=>{this._filterDebounce=null,this._currentPage=1,this.dispatchEvent(new CustomEvent("filter-change",{detail:{filter:t},bubbles:!0,composed:!0}))},200)};ng=function(){const e=this._effectivePageSize,t=(this._currentPage-1)*e+1,n=Math.min(this._currentPage*e,this.totalItems);return E`
      <div class="pagination-bar">
        <div class="pagination-controls">
          ${this.filterable?E`<input
                class="filter-input"
                type="text"
                placeholder="Filter..."
                aria-label="Filter table"
                @input=${Di(this,Gn,Y2)}
              />`:""}
          <label>
            Rows per page:
            <select @change=${Di(this,Gn,W2)}>
              ${[10,25,50,100].map(i=>E`<option value=${i} ?selected=${i===e}>${i}</option>`)}
            </select>
          </label>
        </div>
        <span>Showing ${t}–${n} of ${this.totalItems}</span>
        <div class="pagination-controls">
          <button class="secondary" aria-label="Previous page" ?disabled=${this._currentPage<=1} @click=${Di(this,Gn,H2)}>Prev</button>
          <button class="secondary" aria-label="Next page" ?disabled=${this._currentPage>=this._totalPages} @click=${Di(this,Gn,U2)}>Next</button>
        </div>
      </div>
    `};Hr.styles=[Li,fr,dt`
      .pagination-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        font-size: 0.875rem;
        color: var(--budgee-text-muted);
      }
      .pagination-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      select {
        padding: 2px 6px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
      }
      .filter-input {
        padding: 4px 8px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        font-size: 0.875rem;
      }
    `];ea([H({type:Number})],Hr.prototype,"totalItems",2);ea([H({type:Number})],Hr.prototype,"defaultPageSize",2);ea([H()],Hr.prototype,"storageKey",2);ea([H({type:Boolean})],Hr.prototype,"filterable",2);ea([P()],Hr.prototype,"_currentPage",2);ea([P()],Hr.prototype,"_pageSize",2);Hr=ea([Et("paginated-table")],Hr);var _L=Object.defineProperty,wL=Object.getOwnPropertyDescriptor,U0=(e,t,n,i)=>{for(var r=i>1?void 0:i?wL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&_L(t,n,r),r};let du=class extends gt{constructor(){super(...arguments),this.variant="table",this.rows=5}render(){const e=Array.from({length:this.rows});return this.variant==="table"?E`
        <div aria-live="polite" aria-label="Loading">
          ${e.map(()=>E`
              <div class="table-row">
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
              </div>
            `)}
        </div>
      `:this.variant==="card"?E`
        <div class="card" aria-live="polite" aria-label="Loading">
          <div class="skeleton-line" style="width: 40%; height: 1.2rem"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      `:E`
      <div class="text" aria-live="polite" aria-label="Loading">
        ${e.map(()=>E`
              <div class="skeleton-line"></div>
            `)}
      </div>
    `}};du.styles=dt`
    :host {
      display: block;
    }
    .skeleton-line {
      height: 1rem;
      background: var(--budgee-border);
      border-radius: 4px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    .table-row {
      display: flex;
      gap: 1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--budgee-border);
    }
    .table-row .skeleton-line {
      flex: 1;
    }
    .table-row .skeleton-line:first-child {
      flex: 2;
    }
    .card {
      border: 1px solid var(--budgee-border);
      border-radius: 8px;
      padding: 1rem;
    }
    .card .skeleton-line {
      margin-bottom: 0.75rem;
    }
    .card .skeleton-line:last-child {
      margin-bottom: 0;
      width: 60%;
    }
    .text .skeleton-line {
      margin-bottom: 0.5rem;
    }
    .text .skeleton-line:last-child {
      width: 70%;
    }
    @keyframes pulse {
      0%,
      100% {
        opacity: 0.4;
      }
      50% {
        opacity: 1;
      }
    }
  `;U0([H()],du.prototype,"variant",2);U0([H({type:Number})],du.prototype,"rows",2);du=U0([Et("budgee-skeleton")],du);const Zr=dt`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid var(--budgee-border);
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: var(--budgee-primary);
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }
  th.sortable {
    cursor: pointer;
    user-select: none;
  }
  th.sortable:hover {
    background-color: var(--budgee-primary-hover);
  }
  tbody tr:nth-child(even) {
    background-color: var(--budgee-row-alt);
  }
  tbody tr:hover {
    background-color: var(--budgee-row-hover);
  }
  .clickable-row {
    cursor: pointer;
  }
  .col-amount {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .amount-negative {
    color: var(--budgee-negative);
  }
  .amount-positive {
    color: var(--budgee-positive);
  }
`;var xL=Object.defineProperty,CL=Object.getOwnPropertyDescriptor,q2=e=>{throw TypeError(e)},na=(e,t,n,i)=>{for(var r=i>1?void 0:i?CL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&xL(t,n,r),r},Y0=(e,t,n)=>t.has(e)||q2("Cannot "+n),kL=(e,t,n)=>(Y0(e,t,"read from private field"),n?n.call(e):t.get(e)),bb=(e,t,n)=>t.has(e)?q2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),_b=(e,t,n,i)=>(Y0(e,t,"write to private field"),t.set(e,n),n),Ye=(e,t,n)=>(Y0(e,t,"access private method"),n),il,Me,ig,V2,K2,G2,X2,rl,sl,Q2,Z2;let Ur=class extends gt{constructor(){super(...arguments),bb(this,Me),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",bb(this,il,[])}connectedCallback(){super.connectedCallback(),Ye(this,Me,ig).call(this);const e=ta(()=>Ye(this,Me,ig).call(this),300);Promise.all([ke.subscribe(e),_e.subscribe(e)]).then(t=>{_b(this,il,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of kL(this,il))e.unsubscribe();_b(this,il,[])}render(){if(this._rows===null)return E`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;if(this._rows.length===0)return E`
        <budgee-empty-state
          heading="No accounts yet"
          description="Accounts are created when you import transactions from a CSV."
        ></budgee-empty-state>
      `;const e=this._rows.filter(r=>Ye(this,Me,X2).call(this,r)),t=Ye(this,Me,Q2).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="accounts"
        ?filterable=${!0}
        @page-change=${Ye(this,Me,K2)}
        @filter-change=${Ye(this,Me,G2)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>Ye(this,Me,rl).call(this,"name")}>
                Name${Ye(this,Me,sl).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>Ye(this,Me,rl).call(this,"type")}>
                Type${Ye(this,Me,sl).call(this,"type")}
              </th>
              <th class="sortable" @click=${()=>Ye(this,Me,rl).call(this,"count")}>
                Transactions${Ye(this,Me,sl).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>Ye(this,Me,rl).call(this,"balance")}>
                Balance${Ye(this,Me,sl).call(this,"balance")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>E`
              <tr @click=${()=>Ye(this,Me,Z2).call(this,r.account.id)}>
                <td>${r.account.name}</td>
                <td>${r.account.type?fL(r.account.type):""}</td>
                <td>${r.transactionCount??"…"}</td>
                <td class="col-amount ${r.balance!=null&&r.balance<0?"amount-negative":r.balance!=null?"amount-positive":""}">
                  ${r.balance!=null?r.balance.toFixed(2):"…"}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};il=new WeakMap;Me=new WeakSet;ig=async function(){const e=await ke.all();this._rows=e.map(t=>({account:t,transactionCount:null,balance:null})),Ye(this,Me,V2).call(this)};V2=async function(){const e=await _e.all(),t=zf(e,n=>[n.accountId]);this._rows=this._rows.map(n=>{const i=t.get(n.account.id);return{...n,transactionCount:i?.count??0,balance:i?.total??0}})};K2=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};G2=function(e){this._filter=e.detail.filter,this._currentPage=1};X2=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.account.name.toLowerCase().includes(t)||e.account.type?.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.balance!=null&&e.balance.toFixed(2).includes(t))};rl=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};sl=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};Q2=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.account.name.localeCompare(r.account.name):t==="type"?s=(i.account.type??"").localeCompare(r.account.type??""):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="balance"&&(s=(i.balance??0)-(r.balance??0)),s*n})};Z2=function(e){Cc(`/accounts/${e}`)};Ur.styles=[Zr,dt`
      tbody tr {
        cursor: pointer;
      }
    `];na([P()],Ur.prototype,"_rows",2);na([P()],Ur.prototype,"_currentPage",2);na([P()],Ur.prototype,"_pageSize",2);na([P()],Ur.prototype,"_filter",2);na([P()],Ur.prototype,"_sortCol",2);na([P()],Ur.prototype,"_sortDir",2);Ur=na([Et("account-list")],Ur);class v extends Array{constructor(t,n){if(super(t),this.sign=n,Object.setPrototypeOf(this,v.prototype),t>v.__kMaxLength)throw new RangeError("Maximum BigInt size exceeded")}static BigInt(t){var n=Math.floor,i=Number.isFinite;if(typeof t=="number"){if(t===0)return v.__zero();if(v.__isOneDigitInt(t))return 0>t?v.__oneDigit(-t,!0):v.__oneDigit(t,!1);if(!i(t)||n(t)!==t)throw new RangeError("The number "+t+" cannot be converted to BigInt because it is not an integer");return v.__fromDouble(t)}if(typeof t=="string"){const r=v.__fromString(t);if(r===null)throw new SyntaxError("Cannot convert "+t+" to a BigInt");return r}if(typeof t=="boolean")return t===!0?v.__oneDigit(1,!1):v.__zero();if(typeof t=="object"){if(t.constructor===v)return t;const r=v.__toPrimitive(t);return v.BigInt(r)}throw new TypeError("Cannot convert "+t+" to a BigInt")}toDebugString(){const t=["BigInt["];for(const n of this)t.push((n&&(n>>>0).toString(16))+", ");return t.push("]"),t.join("")}toString(t=10){if(2>t||36<t)throw new RangeError("toString() radix argument must be between 2 and 36");return this.length===0?"0":(t&t-1)==0?v.__toStringBasePowerOfTwo(this,t):v.__toStringGeneric(this,t,!1)}valueOf(){throw new Error("Convert JSBI instances to native numbers using `toNumber`.")}static toNumber(t){const n=t.length;if(n===0)return 0;if(n===1){const g=t.__unsignedDigit(0);return t.sign?-g:g}const i=t.__digit(n-1),r=v.__clz30(i),s=30*n-r;if(1024<s)return t.sign?-1/0:1/0;let o=s-1,a=i,c=n-1;const l=r+3;let u=l===32?0:a<<l;u>>>=12;const h=l-12;let d=12<=l?0:a<<20+l,f=20+l;for(0<h&&0<c&&(c--,a=t.__digit(c),u|=a>>>30-h,d=a<<h+2,f=h+2);0<f&&0<c;)c--,a=t.__digit(c),d|=30<=f?a<<f-30:a>>>30-f,f-=30;const p=v.__decideRounding(t,f,c,a);if((p===1||p===0&&(1&d)==1)&&(d=d+1>>>0,d===0&&(u++,u>>>20!=0&&(u=0,o++,1023<o))))return t.sign?-1/0:1/0;const m=t.sign?-2147483648:0;return o=o+1023<<20,v.__kBitConversionInts[v.__kBitConversionIntHigh]=m|o|u,v.__kBitConversionInts[v.__kBitConversionIntLow]=d,v.__kBitConversionDouble[0]}static unaryMinus(t){if(t.length===0)return t;const n=t.__copy();return n.sign=!t.sign,n}static bitwiseNot(t){return t.sign?v.__absoluteSubOne(t).__trim():v.__absoluteAddOne(t,!0)}static exponentiate(t,n){if(n.sign)throw new RangeError("Exponent must be positive");if(n.length===0)return v.__oneDigit(1,!1);if(t.length===0)return t;if(t.length===1&&t.__digit(0)===1)return t.sign&&(1&n.__digit(0))==0?v.unaryMinus(t):t;if(1<n.length)throw new RangeError("BigInt too big");let i=n.__unsignedDigit(0);if(i===1)return t;if(i>=v.__kMaxLengthBits)throw new RangeError("BigInt too big");if(t.length===1&&t.__digit(0)===2){const o=1+(0|i/30),a=t.sign&&(1&i)!=0,c=new v(o,a);c.__initializeDigits();const l=1<<i%30;return c.__setDigit(o-1,l),c}let r=null,s=t;for((1&i)!=0&&(r=t),i>>=1;i!==0;i>>=1)s=v.multiply(s,s),(1&i)!=0&&(r===null?r=s:r=v.multiply(r,s));return r}static multiply(t,n){if(t.length===0)return t;if(n.length===0)return n;let i=t.length+n.length;30<=t.__clzmsd()+n.__clzmsd()&&i--;const r=new v(i,t.sign!==n.sign);r.__initializeDigits();for(let s=0;s<t.length;s++)v.__multiplyAccumulate(n,t.__digit(s),r,s);return r.__trim()}static divide(t,n){if(n.length===0)throw new RangeError("Division by zero");if(0>v.__absoluteCompare(t,n))return v.__zero();const i=t.sign!==n.sign,r=n.__unsignedDigit(0);let s;if(n.length===1&&32767>=r){if(r===1)return i===t.sign?t:v.unaryMinus(t);s=v.__absoluteDivSmall(t,r,null)}else s=v.__absoluteDivLarge(t,n,!0,!1);return s.sign=i,s.__trim()}static remainder(t,n){if(n.length===0)throw new RangeError("Division by zero");if(0>v.__absoluteCompare(t,n))return t;const i=n.__unsignedDigit(0);if(n.length===1&&32767>=i){if(i===1)return v.__zero();const s=v.__absoluteModSmall(t,i);return s===0?v.__zero():v.__oneDigit(s,t.sign)}const r=v.__absoluteDivLarge(t,n,!1,!0);return r.sign=t.sign,r.__trim()}static add(t,n){const i=t.sign;return i===n.sign?v.__absoluteAdd(t,n,i):0<=v.__absoluteCompare(t,n)?v.__absoluteSub(t,n,i):v.__absoluteSub(n,t,!i)}static subtract(t,n){const i=t.sign;return i===n.sign?0<=v.__absoluteCompare(t,n)?v.__absoluteSub(t,n,i):v.__absoluteSub(n,t,!i):v.__absoluteAdd(t,n,i)}static leftShift(t,n){return n.length===0||t.length===0?t:n.sign?v.__rightShiftByAbsolute(t,n):v.__leftShiftByAbsolute(t,n)}static signedRightShift(t,n){return n.length===0||t.length===0?t:n.sign?v.__leftShiftByAbsolute(t,n):v.__rightShiftByAbsolute(t,n)}static unsignedRightShift(){throw new TypeError("BigInts have no unsigned right shift; use >> instead")}static lessThan(t,n){return 0>v.__compareToBigInt(t,n)}static lessThanOrEqual(t,n){return 0>=v.__compareToBigInt(t,n)}static greaterThan(t,n){return 0<v.__compareToBigInt(t,n)}static greaterThanOrEqual(t,n){return 0<=v.__compareToBigInt(t,n)}static equal(t,n){if(t.sign!==n.sign||t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t.__digit(i)!==n.__digit(i))return!1;return!0}static notEqual(t,n){return!v.equal(t,n)}static bitwiseAnd(t,n){var i=Math.max;if(!t.sign&&!n.sign)return v.__absoluteAnd(t,n).__trim();if(t.sign&&n.sign){const r=i(t.length,n.length)+1;let s=v.__absoluteSubOne(t,r);const o=v.__absoluteSubOne(n);return s=v.__absoluteOr(s,o,s),v.__absoluteAddOne(s,!0,s).__trim()}return t.sign&&([t,n]=[n,t]),v.__absoluteAndNot(t,v.__absoluteSubOne(n)).__trim()}static bitwiseXor(t,n){var i=Math.max;if(!t.sign&&!n.sign)return v.__absoluteXor(t,n).__trim();if(t.sign&&n.sign){const o=i(t.length,n.length),a=v.__absoluteSubOne(t,o),c=v.__absoluteSubOne(n);return v.__absoluteXor(a,c,a).__trim()}const r=i(t.length,n.length)+1;t.sign&&([t,n]=[n,t]);let s=v.__absoluteSubOne(n,r);return s=v.__absoluteXor(s,t,s),v.__absoluteAddOne(s,!0,s).__trim()}static bitwiseOr(t,n){var i=Math.max;const r=i(t.length,n.length);if(!t.sign&&!n.sign)return v.__absoluteOr(t,n).__trim();if(t.sign&&n.sign){let o=v.__absoluteSubOne(t,r);const a=v.__absoluteSubOne(n);return o=v.__absoluteAnd(o,a,o),v.__absoluteAddOne(o,!0,o).__trim()}t.sign&&([t,n]=[n,t]);let s=v.__absoluteSubOne(n,r);return s=v.__absoluteAndNot(s,t,s),v.__absoluteAddOne(s,!0,s).__trim()}static asIntN(t,n){var i=Math.floor;if(n.length===0)return n;if(t=i(t),0>t)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(t===0)return v.__zero();if(t>=v.__kMaxLengthBits)return n;const r=0|(t+29)/30;if(n.length<r)return n;const s=n.__unsignedDigit(r-1),o=1<<(t-1)%30;if(n.length===r&&s<o)return n;if((s&o)!==o)return v.__truncateToNBits(t,n);if(!n.sign)return v.__truncateAndSubFromPowerOfTwo(t,n,!0);if((s&o-1)==0){for(let a=r-2;0<=a;a--)if(n.__digit(a)!==0)return v.__truncateAndSubFromPowerOfTwo(t,n,!1);return n.length===r&&s===o?n:v.__truncateToNBits(t,n)}return v.__truncateAndSubFromPowerOfTwo(t,n,!1)}static asUintN(t,n){var i=Math.floor;if(n.length===0)return n;if(t=i(t),0>t)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(t===0)return v.__zero();if(n.sign){if(t>v.__kMaxLengthBits)throw new RangeError("BigInt too big");return v.__truncateAndSubFromPowerOfTwo(t,n,!1)}if(t>=v.__kMaxLengthBits)return n;const r=0|(t+29)/30;if(n.length<r)return n;const s=t%30;return n.length==r&&(s===0||!(n.__digit(r-1)>>>s))?n:v.__truncateToNBits(t,n)}static ADD(t,n){if(t=v.__toPrimitive(t),n=v.__toPrimitive(n),typeof t=="string")return typeof n!="string"&&(n=n.toString()),t+n;if(typeof n=="string")return t.toString()+n;if(t=v.__toNumeric(t),n=v.__toNumeric(n),v.__isBigInt(t)&&v.__isBigInt(n))return v.add(t,n);if(typeof t=="number"&&typeof n=="number")return t+n;throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")}static LT(t,n){return v.__compare(t,n,0)}static LE(t,n){return v.__compare(t,n,1)}static GT(t,n){return v.__compare(t,n,2)}static GE(t,n){return v.__compare(t,n,3)}static EQ(t,n){for(;;){if(v.__isBigInt(t))return v.__isBigInt(n)?v.equal(t,n):v.EQ(n,t);if(typeof t=="number"){if(v.__isBigInt(n))return v.__equalToNumber(n,t);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="string"){if(v.__isBigInt(n))return t=v.__fromString(t),t!==null&&v.equal(t,n);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="boolean"){if(v.__isBigInt(n))return v.__equalToNumber(n,+t);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="symbol"){if(v.__isBigInt(n))return!1;if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="object"){if(typeof n=="object"&&n.constructor!==v)return t==n;t=v.__toPrimitive(t)}else return t==n}}static NE(t,n){return!v.EQ(t,n)}static DataViewGetBigInt64(t,n,i=!1){return v.asIntN(64,v.DataViewGetBigUint64(t,n,i))}static DataViewGetBigUint64(t,n,i=!1){const[r,s]=i?[4,0]:[0,4],o=t.getUint32(n+r,i),a=t.getUint32(n+s,i),c=new v(3,!1);return c.__setDigit(0,1073741823&a),c.__setDigit(1,(268435455&o)<<2|a>>>30),c.__setDigit(2,o>>>28),c.__trim()}static DataViewSetBigInt64(t,n,i,r=!1){v.DataViewSetBigUint64(t,n,i,r)}static DataViewSetBigUint64(t,n,i,r=!1){i=v.asUintN(64,i);let s=0,o=0;if(0<i.length&&(o=i.__digit(0),1<i.length)){const l=i.__digit(1);o|=l<<30,s=l>>>2,2<i.length&&(s|=i.__digit(2)<<28)}const[a,c]=r?[4,0]:[0,4];t.setUint32(n+a,s,r),t.setUint32(n+c,o,r)}static __zero(){return new v(0,!1)}static __oneDigit(t,n){const i=new v(1,n);return i.__setDigit(0,t),i}__copy(){const t=new v(this.length,this.sign);for(let n=0;n<this.length;n++)t[n]=this[n];return t}__trim(){let t=this.length,n=this[t-1];for(;n===0;)t--,n=this[t-1],this.pop();return t===0&&(this.sign=!1),this}__initializeDigits(){for(let t=0;t<this.length;t++)this[t]=0}static __decideRounding(t,n,i,r){if(0<n)return-1;let s;if(0>n)s=-n-1;else{if(i===0)return-1;i--,r=t.__digit(i),s=29}let o=1<<s;if((r&o)==0)return-1;if(o-=1,(r&o)!=0)return 1;for(;0<i;)if(i--,t.__digit(i)!==0)return 1;return 0}static __fromDouble(t){v.__kBitConversionDouble[0]=t;const n=2047&v.__kBitConversionInts[v.__kBitConversionIntHigh]>>>20,i=n-1023,r=(0|i/30)+1,s=new v(r,0>t);let o=1048575&v.__kBitConversionInts[v.__kBitConversionIntHigh]|1048576,a=v.__kBitConversionInts[v.__kBitConversionIntLow];const c=20,l=i%30;let u,h=0;if(l<20){const d=c-l;h=d+32,u=o>>>d,o=o<<32-d|a>>>d,a<<=32-d}else if(l===20)h=32,u=o,o=a,a=0;else{const d=l-c;h=32-d,u=o<<d|a>>>32-d,o=a<<d,a=0}s.__setDigit(r-1,u);for(let d=r-2;0<=d;d--)0<h?(h-=30,u=o>>>2,o=o<<30|a>>>2,a<<=30):u=0,s.__setDigit(d,u);return s.__trim()}static __isWhitespace(t){return 13>=t&&9<=t||(159>=t?t==32:131071>=t?t==160||t==5760:196607>=t?(t&=131071,10>=t||t==40||t==41||t==47||t==95||t==4096):t==65279)}static __fromString(t,n=0){let i=0;const r=t.length;let s=0;if(s===r)return v.__zero();let o=t.charCodeAt(s);for(;v.__isWhitespace(o);){if(++s===r)return v.__zero();o=t.charCodeAt(s)}if(o===43){if(++s===r)return null;o=t.charCodeAt(s),i=1}else if(o===45){if(++s===r)return null;o=t.charCodeAt(s),i=-1}if(n===0){if(n=10,o===48){if(++s===r)return v.__zero();if(o=t.charCodeAt(s),o===88||o===120){if(n=16,++s===r)return null;o=t.charCodeAt(s)}else if(o===79||o===111){if(n=8,++s===r)return null;o=t.charCodeAt(s)}else if(o===66||o===98){if(n=2,++s===r)return null;o=t.charCodeAt(s)}}}else if(n===16&&o===48){if(++s===r)return v.__zero();if(o=t.charCodeAt(s),o===88||o===120){if(++s===r)return null;o=t.charCodeAt(s)}}if(i!=0&&n!==10)return null;for(;o===48;){if(++s===r)return v.__zero();o=t.charCodeAt(s)}const a=r-s;let c=v.__kMaxBitsPerChar[n],l=v.__kBitsPerCharTableMultiplier-1;if(a>1073741824/c)return null;const u=c*a+l>>>v.__kBitsPerCharTableShift,h=new v(0|(u+29)/30,!1),d=10>n?n:10,f=10<n?n-10:0;if((n&n-1)==0){c>>=v.__kBitsPerCharTableShift;const p=[],m=[];let g=!1;do{let b=0,_=0;for(;;){let C;if(o-48>>>0<d)C=o-48;else if((32|o)-97>>>0<f)C=(32|o)-87;else{g=!0;break}if(_+=c,b=b<<c|C,++s===r){g=!0;break}if(o=t.charCodeAt(s),30<_+c)break}p.push(b),m.push(_)}while(!g);v.__fillFromParts(h,p,m)}else{h.__initializeDigits();let p=!1,m=0;do{let g=0,b=1;for(;;){let C;if(o-48>>>0<d)C=o-48;else if((32|o)-97>>>0<f)C=(32|o)-87;else{p=!0;break}const S=b*n;if(1073741823<S)break;if(b=S,g=g*n+C,m++,++s===r){p=!0;break}o=t.charCodeAt(s)}l=30*v.__kBitsPerCharTableMultiplier-1;const _=0|(c*m+l>>>v.__kBitsPerCharTableShift)/30;h.__inplaceMultiplyAdd(b,g,_)}while(!p)}if(s!==r){if(!v.__isWhitespace(o))return null;for(s++;s<r;s++)if(o=t.charCodeAt(s),!v.__isWhitespace(o))return null}return h.sign=i==-1,h.__trim()}static __fillFromParts(t,n,i){let r=0,s=0,o=0;for(let a=n.length-1;0<=a;a--){const c=n[a],l=i[a];s|=c<<o,o+=l,o===30?(t.__setDigit(r++,s),o=0,s=0):30<o&&(t.__setDigit(r++,1073741823&s),o-=30,s=c>>>l-o)}if(s!==0){if(r>=t.length)throw new Error("implementation bug");t.__setDigit(r++,s)}for(;r<t.length;r++)t.__setDigit(r,0)}static __toStringBasePowerOfTwo(t,n){const i=t.length;let r=n-1;r=(85&r>>>1)+(85&r),r=(51&r>>>2)+(51&r),r=(15&r>>>4)+(15&r);const s=r,o=n-1,a=t.__digit(i-1),c=v.__clz30(a);let l=0|(30*i-c+s-1)/s;if(t.sign&&l++,268435456<l)throw new Error("string too long");const u=Array(l);let h=l-1,d=0,f=0;for(let m=0;m<i-1;m++){const g=t.__digit(m),b=(d|g<<f)&o;u[h--]=v.__kConversionChars[b];const _=s-f;for(d=g>>>_,f=30-_;f>=s;)u[h--]=v.__kConversionChars[d&o],d>>>=s,f-=s}const p=(d|a<<f)&o;for(u[h--]=v.__kConversionChars[p],d=a>>>s-f;d!==0;)u[h--]=v.__kConversionChars[d&o],d>>>=s;if(t.sign&&(u[h--]="-"),h!=-1)throw new Error("implementation bug");return u.join("")}static __toStringGeneric(t,n,i){const r=t.length;if(r===0)return"";if(r===1){let m=t.__unsignedDigit(0).toString(n);return i===!1&&t.sign&&(m="-"+m),m}const s=30*r-v.__clz30(t.__digit(r-1)),o=v.__kMaxBitsPerChar[n],a=o-1;let c=s*v.__kBitsPerCharTableMultiplier;c+=a-1,c=0|c/a;const l=c+1>>1,u=v.exponentiate(v.__oneDigit(n,!1),v.__oneDigit(l,!1));let h,d;const f=u.__unsignedDigit(0);if(u.length===1&&32767>=f){h=new v(t.length,!1),h.__initializeDigits();let m=0;for(let g=2*t.length-1;0<=g;g--){const b=m<<15|t.__halfDigit(g);h.__setHalfDigit(g,0|b/f),m=0|b%f}d=m.toString(n)}else{const m=v.__absoluteDivLarge(t,u,!0,!0);h=m.quotient;const g=m.remainder.__trim();d=v.__toStringGeneric(g,n,!0)}h.__trim();let p=v.__toStringGeneric(h,n,!0);for(;d.length<l;)d="0"+d;return i===!1&&t.sign&&(p="-"+p),p+d}static __unequalSign(t){return t?-1:1}static __absoluteGreater(t){return t?-1:1}static __absoluteLess(t){return t?1:-1}static __compareToBigInt(t,n){const i=t.sign;if(i!==n.sign)return v.__unequalSign(i);const r=v.__absoluteCompare(t,n);return 0<r?v.__absoluteGreater(i):0>r?v.__absoluteLess(i):0}static __compareToNumber(t,n){if(v.__isOneDigitInt(n)){const i=t.sign,r=0>n;if(i!==r)return v.__unequalSign(i);if(t.length===0){if(r)throw new Error("implementation bug");return n===0?0:-1}if(1<t.length)return v.__absoluteGreater(i);const s=Math.abs(n),o=t.__unsignedDigit(0);return o>s?v.__absoluteGreater(i):o<s?v.__absoluteLess(i):0}return v.__compareToDouble(t,n)}static __compareToDouble(t,n){if(n!==n)return n;if(n===1/0)return-1;if(n===-1/0)return 1;const i=t.sign;if(i!==0>n)return v.__unequalSign(i);if(n===0)throw new Error("implementation bug: should be handled elsewhere");if(t.length===0)return-1;v.__kBitConversionDouble[0]=n;const r=2047&v.__kBitConversionInts[v.__kBitConversionIntHigh]>>>20;if(r==2047)throw new Error("implementation bug: handled elsewhere");const s=r-1023;if(0>s)return v.__absoluteGreater(i);const o=t.length;let a=t.__digit(o-1);const c=v.__clz30(a),l=30*o-c,u=s+1;if(l<u)return v.__absoluteLess(i);if(l>u)return v.__absoluteGreater(i);let h=1048576|1048575&v.__kBitConversionInts[v.__kBitConversionIntHigh],d=v.__kBitConversionInts[v.__kBitConversionIntLow];const f=20,p=29-c;if(p!==(0|(l-1)%30))throw new Error("implementation bug");let m,g=0;if(20>p){const b=f-p;g=b+32,m=h>>>b,h=h<<32-b|d>>>b,d<<=32-b}else if(p===20)g=32,m=h,h=d,d=0;else{const b=p-f;g=32-b,m=h<<b|d>>>32-b,h=d<<b,d=0}if(a>>>=0,m>>>=0,a>m)return v.__absoluteGreater(i);if(a<m)return v.__absoluteLess(i);for(let b=o-2;0<=b;b--){0<g?(g-=30,m=h>>>2,h=h<<30|d>>>2,d<<=30):m=0;const _=t.__unsignedDigit(b);if(_>m)return v.__absoluteGreater(i);if(_<m)return v.__absoluteLess(i)}if(h!==0||d!==0){if(g===0)throw new Error("implementation bug");return v.__absoluteLess(i)}return 0}static __equalToNumber(t,n){var i=Math.abs;return v.__isOneDigitInt(n)?n===0?t.length===0:t.length===1&&t.sign===0>n&&t.__unsignedDigit(0)===i(n):v.__compareToDouble(t,n)===0}static __comparisonResultToBool(t,n){return n===0?0>t:n===1?0>=t:n===2?0<t:n===3?0<=t:void 0}static __compare(t,n,i){if(t=v.__toPrimitive(t),n=v.__toPrimitive(n),typeof t=="string"&&typeof n=="string")switch(i){case 0:return t<n;case 1:return t<=n;case 2:return t>n;case 3:return t>=n}if(v.__isBigInt(t)&&typeof n=="string")return n=v.__fromString(n),n!==null&&v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(typeof t=="string"&&v.__isBigInt(n))return t=v.__fromString(t),t!==null&&v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(t=v.__toNumeric(t),n=v.__toNumeric(n),v.__isBigInt(t)){if(v.__isBigInt(n))return v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(typeof n!="number")throw new Error("implementation bug");return v.__comparisonResultToBool(v.__compareToNumber(t,n),i)}if(typeof t!="number")throw new Error("implementation bug");if(v.__isBigInt(n))return v.__comparisonResultToBool(v.__compareToNumber(n,t),2^i);if(typeof n!="number")throw new Error("implementation bug");return i===0?t<n:i===1?t<=n:i===2?t>n:i===3?t>=n:void 0}__clzmsd(){return v.__clz30(this.__digit(this.length-1))}static __absoluteAdd(t,n,i){if(t.length<n.length)return v.__absoluteAdd(n,t,i);if(t.length===0)return t;if(n.length===0)return t.sign===i?t:v.unaryMinus(t);let r=t.length;(t.__clzmsd()===0||n.length===t.length&&n.__clzmsd()===0)&&r++;const s=new v(r,i);let o=0,a=0;for(;a<n.length;a++){const c=t.__digit(a)+n.__digit(a)+o;o=c>>>30,s.__setDigit(a,1073741823&c)}for(;a<t.length;a++){const c=t.__digit(a)+o;o=c>>>30,s.__setDigit(a,1073741823&c)}return a<s.length&&s.__setDigit(a,o),s.__trim()}static __absoluteSub(t,n,i){if(t.length===0)return t;if(n.length===0)return t.sign===i?t:v.unaryMinus(t);const r=new v(t.length,i);let s=0,o=0;for(;o<n.length;o++){const a=t.__digit(o)-n.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}for(;o<t.length;o++){const a=t.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}return r.__trim()}static __absoluteAddOne(t,n,i=null){const r=t.length;i===null?i=new v(r,n):i.sign=n;let s=1;for(let o=0;o<r;o++){const a=t.__digit(o)+s;s=a>>>30,i.__setDigit(o,1073741823&a)}return s!=0&&i.__setDigitGrow(r,1),i}static __absoluteSubOne(t,n){const i=t.length;n=n||i;const r=new v(n,!1);let s=1;for(let o=0;o<i;o++){const a=t.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}if(s!=0)throw new Error("implementation bug");for(let o=i;o<n;o++)r.__setDigit(o,0);return r}static __absoluteAnd(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=o;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)&n.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteAndNot(t,n,i=null){const r=t.length,s=n.length;let o=s;r<s&&(o=r);let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)&~n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteOr(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)|n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteXor(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)^n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteCompare(t,n){const i=t.length-n.length;if(i!=0)return i;let r=t.length-1;for(;0<=r&&t.__digit(r)===n.__digit(r);)r--;return 0>r?0:t.__unsignedDigit(r)>n.__unsignedDigit(r)?1:-1}static __multiplyAccumulate(t,n,i,r){if(n===0)return;const s=32767&n,o=n>>>15;let a=0,c=0;for(let l,u=0;u<t.length;u++,r++){l=i.__digit(r);const h=t.__digit(u),d=32767&h,f=h>>>15,p=v.__imul(d,s),m=v.__imul(d,o),g=v.__imul(f,s),b=v.__imul(f,o);l+=c+p+a,a=l>>>30,l&=1073741823,l+=((32767&m)<<15)+((32767&g)<<15),a+=l>>>30,c=b+(m>>>15)+(g>>>15),i.__setDigit(r,1073741823&l)}for(;a!=0||c!==0;r++){let l=i.__digit(r);l+=a+c,c=0,a=l>>>30,i.__setDigit(r,1073741823&l)}}static __internalMultiplyAdd(t,n,i,r,s){let o=i,a=0;for(let c=0;c<r;c++){const l=t.__digit(c),u=v.__imul(32767&l,n),h=v.__imul(l>>>15,n),d=u+((32767&h)<<15)+a+o;o=d>>>30,a=h>>>15,s.__setDigit(c,1073741823&d)}if(s.length>r)for(s.__setDigit(r++,o+a);r<s.length;)s.__setDigit(r++,0);else if(o+a!==0)throw new Error("implementation bug")}__inplaceMultiplyAdd(t,n,i){i>this.length&&(i=this.length);const r=32767&t,s=t>>>15;let o=0,a=n;for(let c=0;c<i;c++){const l=this.__digit(c),u=32767&l,h=l>>>15,d=v.__imul(u,r),f=v.__imul(u,s),p=v.__imul(h,r),m=v.__imul(h,s);let g=a+d+o;o=g>>>30,g&=1073741823,g+=((32767&f)<<15)+((32767&p)<<15),o+=g>>>30,a=m+(f>>>15)+(p>>>15),this.__setDigit(c,1073741823&g)}if(o!=0||a!==0)throw new Error("implementation bug")}static __absoluteDivSmall(t,n,i=null){i===null&&(i=new v(t.length,!1));let r=0;for(let s,o=2*t.length-1;0<=o;o-=2){s=(r<<15|t.__halfDigit(o))>>>0;const a=0|s/n;r=0|s%n,s=(r<<15|t.__halfDigit(o-1))>>>0;const c=0|s/n;r=0|s%n,i.__setDigit(o>>>1,a<<15|c)}return i}static __absoluteModSmall(t,n){let i=0;for(let r=2*t.length-1;0<=r;r--)i=0|((i<<15|t.__halfDigit(r))>>>0)%n;return i}static __absoluteDivLarge(t,n,i,r){const s=n.__halfDigitLength(),o=n.length,a=t.__halfDigitLength()-s;let c=null;i&&(c=new v(a+2>>>1,!1),c.__initializeDigits());const l=new v(s+2>>>1,!1);l.__initializeDigits();const u=v.__clz15(n.__halfDigit(s-1));0<u&&(n=v.__specialLeftShift(n,u,0));const h=v.__specialLeftShift(t,u,1),d=n.__halfDigit(s-1);let f=0;for(let p,m=a;0<=m;m--){p=32767;const g=h.__halfDigit(m+s);if(g!==d){const _=(g<<15|h.__halfDigit(m+s-1))>>>0;p=0|_/d;let C=0|_%d;const S=n.__halfDigit(s-2),k=h.__halfDigit(m+s-2);for(;v.__imul(p,S)>>>0>(C<<16|k)>>>0&&(p--,C+=d,!(32767<C)););}v.__internalMultiplyAdd(n,p,0,o,l);let b=h.__inplaceSub(l,m,s+1);b!==0&&(b=h.__inplaceAdd(n,m,s),h.__setHalfDigit(m+s,32767&h.__halfDigit(m+s)+b),p--),i&&(1&m?f=p<<15:c.__setDigit(m>>>1,f|p))}if(r)return h.__inplaceRightShift(u),i?{quotient:c,remainder:h}:h;if(i)return c;throw new Error("unreachable")}static __clz15(t){return v.__clz30(t)-15}__inplaceAdd(t,n,i){let r=0;for(let s=0;s<i;s++){const o=this.__halfDigit(n+s)+t.__halfDigit(s)+r;r=o>>>15,this.__setHalfDigit(n+s,32767&o)}return r}__inplaceSub(t,n,i){let r=0;if(1&n){n>>=1;let s=this.__digit(n),o=32767&s,a=0;for(;a<i-1>>>1;a++){const u=t.__digit(a),h=(s>>>15)-(32767&u)-r;r=1&h>>>15,this.__setDigit(n+a,(32767&h)<<15|32767&o),s=this.__digit(n+a+1),o=(32767&s)-(u>>>15)-r,r=1&o>>>15}const c=t.__digit(a),l=(s>>>15)-(32767&c)-r;if(r=1&l>>>15,this.__setDigit(n+a,(32767&l)<<15|32767&o),n+a+1>=this.length)throw new RangeError("out of bounds");(1&i)==0&&(s=this.__digit(n+a+1),o=(32767&s)-(c>>>15)-r,r=1&o>>>15,this.__setDigit(n+t.length,1073709056&s|32767&o))}else{n>>=1;let s=0;for(;s<t.length-1;s++){const u=this.__digit(n+s),h=t.__digit(s),d=(32767&u)-(32767&h)-r;r=1&d>>>15;const f=(u>>>15)-(h>>>15)-r;r=1&f>>>15,this.__setDigit(n+s,(32767&f)<<15|32767&d)}const o=this.__digit(n+s),a=t.__digit(s),c=(32767&o)-(32767&a)-r;r=1&c>>>15;let l=0;(1&i)==0&&(l=(o>>>15)-(a>>>15)-r,r=1&l>>>15),this.__setDigit(n+s,(32767&l)<<15|32767&c)}return r}__inplaceRightShift(t){if(t===0)return;let n=this.__digit(0)>>>t;const i=this.length-1;for(let r=0;r<i;r++){const s=this.__digit(r+1);this.__setDigit(r,1073741823&s<<30-t|n),n=s>>>t}this.__setDigit(i,n)}static __specialLeftShift(t,n,i){const r=t.length,s=new v(r+i,!1);if(n===0){for(let a=0;a<r;a++)s.__setDigit(a,t.__digit(a));return 0<i&&s.__setDigit(r,0),s}let o=0;for(let a=0;a<r;a++){const c=t.__digit(a);s.__setDigit(a,1073741823&c<<n|o),o=c>>>30-n}return 0<i&&s.__setDigit(r,o),s}static __leftShiftByAbsolute(t,n){const i=v.__toShiftAmount(n);if(0>i)throw new RangeError("BigInt too big");const r=0|i/30,s=i%30,o=t.length,a=s!==0&&t.__digit(o-1)>>>30-s!=0,c=o+r+(a?1:0),l=new v(c,t.sign);if(s===0){let u=0;for(;u<r;u++)l.__setDigit(u,0);for(;u<c;u++)l.__setDigit(u,t.__digit(u-r))}else{let u=0;for(let h=0;h<r;h++)l.__setDigit(h,0);for(let h=0;h<o;h++){const d=t.__digit(h);l.__setDigit(h+r,1073741823&d<<s|u),u=d>>>30-s}if(a)l.__setDigit(o+r,u);else if(u!==0)throw new Error("implementation bug")}return l.__trim()}static __rightShiftByAbsolute(t,n){const i=t.length,r=t.sign,s=v.__toShiftAmount(n);if(0>s)return v.__rightShiftByMaximum(r);const o=0|s/30,a=s%30;let c=i-o;if(0>=c)return v.__rightShiftByMaximum(r);let l=!1;if(r){if((t.__digit(o)&(1<<a)-1)!=0)l=!0;else for(let h=0;h<o;h++)if(t.__digit(h)!==0){l=!0;break}}l&&a===0&&~t.__digit(i-1)==0&&c++;let u=new v(c,r);if(a===0){u.__setDigit(c-1,0);for(let h=o;h<i;h++)u.__setDigit(h-o,t.__digit(h))}else{let h=t.__digit(o)>>>a;const d=i-o-1;for(let f=0;f<d;f++){const p=t.__digit(f+o+1);u.__setDigit(f,1073741823&p<<30-a|h),h=p>>>a}u.__setDigit(d,h)}return l&&(u=v.__absoluteAddOne(u,!0,u)),u.__trim()}static __rightShiftByMaximum(t){return t?v.__oneDigit(1,!0):v.__zero()}static __toShiftAmount(t){if(1<t.length)return-1;const n=t.__unsignedDigit(0);return n>v.__kMaxLengthBits?-1:n}static __toPrimitive(t,n="default"){if(typeof t!="object"||t.constructor===v)return t;if(typeof Symbol<"u"&&typeof Symbol.toPrimitive=="symbol"&&t[Symbol.toPrimitive]){const s=t[Symbol.toPrimitive](n);if(typeof s!="object")return s;throw new TypeError("Cannot convert object to primitive value")}const i=t.valueOf;if(i){const s=i.call(t);if(typeof s!="object")return s}const r=t.toString;if(r){const s=r.call(t);if(typeof s!="object")return s}throw new TypeError("Cannot convert object to primitive value")}static __toNumeric(t){return v.__isBigInt(t)?t:+t}static __isBigInt(t){return typeof t=="object"&&t!==null&&t.constructor===v}static __truncateToNBits(t,n){const i=0|(t+29)/30,r=new v(i,n.sign),s=i-1;for(let a=0;a<s;a++)r.__setDigit(a,n.__digit(a));let o=n.__digit(s);if(t%30!=0){const a=32-t%30;o=o<<a>>>a}return r.__setDigit(s,o),r.__trim()}static __truncateAndSubFromPowerOfTwo(t,n,i){var r=Math.min;const s=0|(t+29)/30,o=new v(s,i);let a=0;const c=s-1;let l=0;for(const f=r(c,n.length);a<f;a++){const p=0-n.__digit(a)-l;l=1&p>>>30,o.__setDigit(a,1073741823&p)}for(;a<c;a++)o.__setDigit(a,0|1073741823&-l);let u=c<n.length?n.__digit(c):0;const h=t%30;let d;if(h==0)d=0-u-l,d&=1073741823;else{const f=32-h;u=u<<f>>>f;const p=1<<32-f;d=p-u-l,d&=p-1}return o.__setDigit(c,d),o.__trim()}__digit(t){return this[t]}__unsignedDigit(t){return this[t]>>>0}__setDigit(t,n){this[t]=0|n}__setDigitGrow(t,n){this[t]=0|n}__halfDigitLength(){const t=this.length;return 32767>=this.__unsignedDigit(t-1)?2*t-1:2*t}__halfDigit(t){return 32767&this[t>>>1]>>>15*(1&t)}__setHalfDigit(t,n){const i=t>>>1,r=this.__digit(i),s=1&t?32767&r|n<<15:1073709056&r|32767&n;this.__setDigit(i,s)}static __digitPow(t,n){let i=1;for(;0<n;)1&n&&(i*=t),n>>>=1,t*=t;return i}static __detectBigEndian(){return v.__kBitConversionDouble[0]=-0,v.__kBitConversionInts[0]!==0}static __isOneDigitInt(t){return(1073741823&t)===t}}v.__kMaxLength=33554432,v.__kMaxLengthBits=v.__kMaxLength<<5,v.__kMaxBitsPerChar=[0,0,32,51,64,75,83,90,96,102,107,111,115,119,122,126,128,131,134,136,139,141,143,145,147,149,151,153,154,156,158,159,160,162,163,165,166],v.__kBitsPerCharTableShift=5,v.__kBitsPerCharTableMultiplier=1<<v.__kBitsPerCharTableShift,v.__kConversionChars=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],v.__kBitConversionBuffer=new ArrayBuffer(8),v.__kBitConversionDouble=new Float64Array(v.__kBitConversionBuffer),v.__kBitConversionInts=new Int32Array(v.__kBitConversionBuffer),v.__kBitConversionIntHigh=v.__detectBigEndian()?0:1,v.__kBitConversionIntLow=v.__detectBigEndian()?1:0,v.__clz30=Math.clz32?function(e){return Math.clz32(e)-2}:function(e){return e===0?30:0|29-(0|Math.log(e>>>0)/Math.LN2)},v.__imul=Math.imul||function(e,t){return 0|e*t};const Xn=v.BigInt(0),fu=v.BigInt(1),q0=v.BigInt(2),SL=v.BigInt(10),EL=v.BigInt(24),ML=v.BigInt(60),DL=v.BigInt(1e3),Yu=v.BigInt(1e6),Ll=v.BigInt(1e9),J2=v.multiply(v.BigInt(3600),Ll),$L=v.multiply(ML,Ll),Rs=v.multiply(J2,EL);function Cr(e){return typeof e=="bigint"?v.BigInt(e.toString(10)):e}function tC(e){return v.equal(v.remainder(e,q0),Xn)}function ao(e){return v.lessThan(e,Xn)?v.unaryMinus(e):e}function qd(e,t){return v.lessThan(e,t)?-1:v.greaterThan(e,t)?1:0}function ol(e,t){return{quotient:v.divide(e,t),remainder:v.remainder(e,t)}}var wb,xb;const it="slot-epochNanoSeconds",rt="slot-iso-date",Ut="slot-iso-date-time",ie="slot-time",A="slot-calendar",eC="slot-date-brand",nC="slot-year-month-brand",iC="slot-month-day-brand",Tt="slot-time-zone",cn="slot-years",ln="slot-months",On="slot-weeks",un="slot-days",hn="slot-hours",dn="slot-minutes",fn="slot-seconds",pn="slot-milliseconds",mn="slot-microseconds",Pn="slot-nanoseconds",rC="date",sC="ym",oC="md",aC="time",cC="datetime",lC="instant",ia="original",xa="timezone-canonical",rg="timezone-original",al="calendar-id",uC="locale",sg="options",hC=new WeakMap,og=Symbol.for("@@Temporal__GetSlots");(wb=globalThis)[og]||(wb[og]=function(e){return hC.get(e)});const Bf=globalThis[og],ag=Symbol.for("@@Temporal__CreateSlots");(xb=globalThis)[ag]||(xb[ag]=function(e){hC.set(e,Object.create(null))});const Jr=globalThis[ag];function xn(e,...t){if(!e||typeof e!="object")return!1;const n=Bf(e);return!!n&&t.every((i=>i in n))}function y(e,t){const n=Bf(e)?.[t];if(n===void 0)throw new TypeError(`Missing internal slot ${t}`);return n}function ht(e,t,n){const i=Bf(e);if(i===void 0)throw new TypeError("Missing slots for the given container");if(i[t])throw new TypeError(`${t} already has set`);i[t]=n}const cg={};function ts(e,t){Object.defineProperty(e.prototype,Symbol.toStringTag,{value:t,writable:!1,enumerable:!1,configurable:!0});const n=Object.getOwnPropertyNames(e);for(let r=0;r<n.length;r++){const s=n[r],o=Object.getOwnPropertyDescriptor(e,s);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e,s,o))}const i=Object.getOwnPropertyNames(e.prototype);for(let r=0;r<i.length;r++){const s=i[r],o=Object.getOwnPropertyDescriptor(e.prototype,s);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e.prototype,s,o))}lg(t,e),lg(`${t}.prototype`,e.prototype)}function lg(e,t){const n=`%${e}%`;if(cg[n]!==void 0)throw new Error(`intrinsic ${e} already exists`);cg[n]=t}function je(e){return cg[e]}function Ia(e,t){let n=e;if(n===0)return{div:n,mod:n};const i=Math.sign(n);n=Math.abs(n);const r=Math.trunc(1+Math.log10(n));if(t>=r)return{div:0*i,mod:i*n};if(t===0)return{div:i*n,mod:0*i};const s=n.toPrecision(r);return{div:i*Number.parseInt(s.slice(0,r-t),10),mod:i*Number.parseInt(s.slice(r-t),10)}}function Vp(e,t,n){let i=e,r=n;if(i===0)return r;const s=Math.sign(i)||Math.sign(r);i=Math.abs(i),r=Math.abs(r);const o=i.toPrecision(Math.trunc(1+Math.log10(i)));if(r===0)return s*Number.parseInt(o+"0".repeat(t),10);const a=o+r.toPrecision(Math.trunc(1+Math.log10(r))).padStart(t,"0");return s*Number.parseInt(a,10)}function Wf(e,t){const n=t==="negative";switch(e){case"ceil":return n?"zero":"infinity";case"floor":return n?"infinity":"zero";case"expand":return"infinity";case"trunc":return"zero";case"halfCeil":return n?"half-zero":"half-infinity";case"halfFloor":return n?"half-infinity":"half-zero";case"halfExpand":return"half-infinity";case"halfTrunc":return"half-zero";case"halfEven":return"half-even"}}function Hf(e,t,n,i,r){return r==="zero"?e:r==="infinity"?t:n<0?e:n>0?t:r==="half-zero"?e:r==="half-infinity"?t:i?e:t}class pt{constructor(t){this.totalNs=Cr(t),this.sec=v.toNumber(v.divide(this.totalNs,Ll)),this.subsec=v.toNumber(v.remainder(this.totalNs,Ll))}static validateNew(t,n){if(v.greaterThan(ao(t),pt.MAX))throw new RangeError(`${n} of duration time units cannot exceed ${pt.MAX} s`);return new pt(t)}static fromEpochNsDiff(t,n){const i=v.subtract(Cr(t),Cr(n));return new pt(i)}static fromComponents(t,n,i,r,s,o){const a=v.add(v.add(v.add(v.add(v.add(v.BigInt(o),v.multiply(v.BigInt(s),DL)),v.multiply(v.BigInt(r),Yu)),v.multiply(v.BigInt(i),Ll)),v.multiply(v.BigInt(n),$L)),v.multiply(v.BigInt(t),J2));return pt.validateNew(a,"total")}abs(){return new pt(ao(this.totalNs))}add(t){return pt.validateNew(v.add(this.totalNs,t.totalNs),"sum")}add24HourDays(t){return pt.validateNew(v.add(this.totalNs,v.multiply(v.BigInt(t),Rs)),"sum")}addToEpochNs(t){return v.add(Cr(t),this.totalNs)}cmp(t){return qd(this.totalNs,t.totalNs)}divmod(t){const{quotient:n,remainder:i}=ol(this.totalNs,v.BigInt(t));return{quotient:v.toNumber(n),remainder:new pt(i)}}fdiv(t){const n=Cr(t),i=v.BigInt(n);let{quotient:r,remainder:s}=ol(this.totalNs,i);const o=[];let a;const c=(v.lessThan(this.totalNs,Xn)?-1:1)*Math.sign(v.toNumber(n));for(;!v.equal(s,Xn)&&o.length<50;)s=v.multiply(s,SL),{quotient:a,remainder:s}=ol(s,i),o.push(Math.abs(v.toNumber(a)));return c*+(ao(r).toString()+"."+o.join(""))}isZero(){return v.equal(this.totalNs,Xn)}round(t,n){const i=Cr(t);if(v.equal(i,fu))return this;const{quotient:r,remainder:s}=ol(this.totalNs,i),o=v.lessThan(this.totalNs,Xn)?"negative":"positive",a=v.multiply(ao(r),i),c=v.add(a,i),l=qd(ao(v.multiply(s,q0)),i),u=Wf(n,o),h=v.equal(ao(this.totalNs),a)?a:Hf(a,c,l,tC(r),u),d=o==="positive"?h:v.unaryMinus(h);return pt.validateNew(d,"rounding")}sign(){return this.cmp(new pt(Xn))}subtract(t){return pt.validateNew(v.subtract(this.totalNs,t.totalNs),"difference")}}pt.MAX=v.BigInt("9007199254740991999999999"),pt.ZERO=new pt(Xn);const Cb=/[A-Za-z._][A-Za-z._0-9+-]*/,qu=new RegExp(`(?:${/(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/.source}|(?:${Cb.source})(?:\\/(?:${Cb.source}))*)`),dC=/(?:[+-]\d{6}|\d{4})/,Vd=/(?:0[1-9]|1[0-2])/,ug=/(?:0[1-9]|[12]\d|3[01])/,TL=new RegExp(`(${dC.source})(?:-(${Vd.source})-(${ug.source})|(${Vd.source})(${ug.source}))`),fC=/(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/,pC=/((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/,mC=new RegExp(`([zZ])|${pC.source}?`),nc=/\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g,IL=new RegExp([`^${TL.source}`,`(?:(?:[tT]|\\s+)${fC.source}(?:${mC.source})?)?`,`(?:\\[!?(${qu.source})\\])?`,`((?:${nc.source})*)$`].join("")),OL=new RegExp([`^[tT]?${fC.source}`,`(?:${mC.source})?`,`(?:\\[!?${qu.source}\\])?`,`((?:${nc.source})*)$`].join("")),PL=new RegExp(`^(${dC.source})-?(${Vd.source})(?:\\[!?${qu.source}\\])?((?:${nc.source})*)$`),RL=new RegExp(`^(?:--)?(${Vd.source})-?(${ug.source})(?:\\[!?${qu.source}\\])?((?:${nc.source})*)$`),Kp=/(\d+)(?:[.,](\d{1,9}))?/,AL=new RegExp(`(?:${Kp.source}H)?(?:${Kp.source}M)?(?:${Kp.source}S)?`),LL=new RegExp(`^([+-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${AL.source})?$`,"i"),As=864e5,Kd=1e6*As,NL=6e10,gC=1e8*As,ic=Xi(gC),pu=v.unaryMinus(ic),FL=v.add(v.subtract(pu,Rs),fu),zL=v.subtract(v.add(ic,Rs),fu),jL=146097*As,kb=-271821,Sb=275760,Nl=Date.UTC(1847,0,1),BL=["iso8601","hebrew","islamic","islamic-umalqura","islamic-tbla","islamic-civil","islamic-rgsa","islamicc","persian","ethiopic","ethioaa","ethiopic-amete-alem","coptic","chinese","dangi","roc","indian","buddhist","japanese","gregory"],WL=new Set(["ACT","AET","AGT","ART","AST","BET","BST","CAT","CNT","CST","CTT","EAT","ECT","IET","IST","JST","MIT","NET","NST","PLT","PNT","PRT","PST","SST","VST"]);function re(e){return typeof e=="object"&&e!==null||typeof e=="function"}function Uf(e){if(typeof e=="bigint")throw new TypeError("Cannot convert BigInt to number");return Number(e)}function Yf(e){if(typeof e=="symbol")throw new TypeError("Cannot convert a Symbol value to a String");return String(e)}function st(e){const t=Uf(e);if(t===0)return 0;if(Number.isNaN(t)||t===1/0||t===-1/0)throw new RangeError("invalid number value");const n=Math.trunc(t);return n===0?0:n}function Eb(e,t){const n=st(e);if(n<=0)throw t!==void 0?new RangeError(`property '${t}' cannot be a a number less than one`):new RangeError("Cannot convert a number less than one to a positive integer");return n}function Ei(e){const t=Uf(e);if(Number.isNaN(t))throw new RangeError("not a number");if(t===1/0||t===-1/0)throw new RangeError("infinity is out of range");if(!(function(n){if(typeof n!="number"||Number.isNaN(n)||n===1/0||n===-1/0)return!1;const i=Math.abs(n);return Math.floor(i)===i})(t))throw new RangeError(`unsupported fractional value ${e}`);return t===0?0:t}function mu(e,t){return String(e).padStart(t,"0")}function Se(e){if(typeof e!="string")throw new TypeError(`expected a string, not ${String(e)}`);return e}function hg(e,t){if(re(e)){const n=e?.toString();if(typeof n=="string"||typeof n=="number")return n;throw new TypeError("Cannot convert object to primitive value")}return e}const dg=["era","eraYear","year","month","monthCode","day","hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],HL={era:Yf,eraYear:st,year:st,month:Eb,monthCode:function(e){const t=Se(hg(e));if(t.length<3||t.length>4||t[0]!=="M"||"0123456789".indexOf(t[1])===-1||"0123456789".indexOf(t[2])===-1||t[1]+t[2]==="00"&&t[3]!=="L"||t[3]!=="L"&&t[3]!==void 0)throw new RangeError(`bad month code ${t}; must match M01-M99 or M00L-M99L`);return t},day:Eb,hour:st,minute:st,second:st,millisecond:st,microsecond:st,nanosecond:st,offset:function(e){const t=Se(hg(e));return Mc(t),t},timeZone:yn},UL={hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},rc=[["years","year","date"],["months","month","date"],["weeks","week","date"],["days","day","date"],["hours","hour","time"],["minutes","minute","time"],["seconds","second","time"],["milliseconds","millisecond","time"],["microseconds","microsecond","time"],["nanoseconds","nanosecond","time"]],Mb=Object.fromEntries(rc.map((e=>[e[0],e[1]]))),YL=Object.fromEntries(rc.map((([e,t])=>[t,e]))),Fl=rc.map((([,e])=>e)),sc={day:Kd,hour:36e11,minute:6e10,second:1e9,millisecond:1e6,microsecond:1e3,nanosecond:1},Gd=["days","hours","microseconds","milliseconds","minutes","months","nanoseconds","seconds","weeks","years"],qL=Intl.DateTimeFormat,Db=new Map;function vC(e){const t=_u(e);let n=Db.get(t);return n===void 0&&(n=new qL("en-us",{timeZone:t,hour12:!1,era:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}),Db.set(t,n)),n}function Ae(e){return xn(e,it)&&!xn(e,Tt,A)}function te(e){return xn(e,cn,ln,un,hn,dn,fn,pn,mn,Pn)}function ne(e){return xn(e,eC)}function ce(e){return xn(e,ie)}function jt(e){return xn(e,Ut)}function Le(e){return xn(e,nC)}function Kn(e){return xn(e,iC)}function ft(e){return xn(e,it,Tt,A)}function O(e,t){if(!t(e))throw new TypeError("invalid receiver: method called with the wrong type of this-object")}function kc(e){if(xn(e,A)||xn(e,Tt))throw new TypeError("with() does not support a calendar or timeZone property");if(ce(e))throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");if(e.calendar!==void 0)throw new TypeError("with() does not support a calendar property");if(e.timeZone!==void 0)throw new TypeError("with() does not support a timeZone property")}function Vu(e,t){return t==="never"||t==="auto"&&e==="iso8601"?"":`[${t==="critical"?"!":""}u-ca=${e}]`}function qf(e){let t,n,i=!1;for(nc.lastIndex=0;n=nc.exec(e);){const{1:r,2:s,3:o}=n;if(s==="u-ca"){if(t===void 0)t=o,i=r==="!";else if(r==="!"||i)throw new RangeError(`Invalid annotations in ${e}: more than one u-ca present with critical flag`)}else if(r==="!")throw new RangeError(`Unrecognized annotation: !${s}=${o}`)}return t}function pr(e){const t=IL.exec(e);if(!t)throw new RangeError(`invalid RFC 9557 string: ${e}`);const n=qf(t[16]);let i=t[1];if(i==="-000000")throw new RangeError(`invalid RFC 9557 string: ${e}`);const r=+i,s=+(t[2]??t[4]??1),o=+(t[3]??t[5]??1),a=t[6]!==void 0,c=+(t[6]??0),l=+(t[7]??t[10]??0);let u=+(t[8]??t[11]??0);u===60&&(u=59);const h=(t[9]??t[12]??"")+"000000000",d=+h.slice(0,3),f=+h.slice(3,6),p=+h.slice(6,9);let m,g=!1;t[13]?(m=void 0,g=!0):t[14]&&(m=t[14]);const b=t[15];return Z0(r,s,o,c,l,u,d,f,p),{year:r,month:s,day:o,time:a?{hour:c,minute:l,second:u,millisecond:d,microsecond:f,nanosecond:p}:"start-of-day",tzAnnotation:b,offset:m,z:g,calendar:n}}function yC(e){const t=OL.exec(e);let n,i,r,s,o,a,c;if(t){c=qf(t[10]),n=+(t[1]??0),i=+(t[2]??t[5]??0),r=+(t[3]??t[6]??0),r===60&&(r=59);const l=(t[4]??t[7]??"")+"000000000";if(s=+l.slice(0,3),o=+l.slice(3,6),a=+l.slice(6,9),t[8])throw new RangeError("Z designator not supported for PlainTime")}else{let l,u;if({time:l,z:u,calendar:c}=pr(e),l==="start-of-day")throw new RangeError(`time is missing in string: ${e}`);if(u)throw new RangeError("Z designator not supported for PlainTime");({hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a}=l)}if(Xf(n,i,r,s,o,a),/[tT ][0-9][0-9]/.test(e))return{hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a,calendar:c};try{const{month:l,day:u}=K0(e);jo(1972,l,u)}catch{try{const{year:l,month:u}=V0(e);jo(l,u,1)}catch{return{hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a,calendar:c}}}throw new RangeError(`invalid RFC 9557 time-only string ${e}; may need a T prefix`)}function V0(e){const t=PL.exec(e);let n,i,r,s;if(t){r=qf(t[3]);let o=t[1];if(o==="-000000")throw new RangeError(`invalid RFC 9557 string: ${e}`);if(n=+o,i=+t[2],s=1,r!==void 0&&r!=="iso8601")throw new RangeError("YYYY-MM format is only valid with iso8601 calendar")}else{let o;if({year:n,month:i,calendar:r,day:s,z:o}=pr(e),o)throw new RangeError("Z designator not supported for PlainYearMonth")}return{year:n,month:i,calendar:r,referenceISODay:s}}function K0(e){const t=RL.exec(e);let n,i,r,s;if(t){if(r=qf(t[3]),n=+t[1],i=+t[2],r!==void 0&&r!=="iso8601")throw new RangeError("MM-DD format is only valid with iso8601 calendar")}else{let o;if({month:n,day:i,calendar:r,year:s,z:o}=pr(e),o)throw new RangeError("Z designator not supported for PlainMonthDay")}return{month:n,day:i,calendar:r,referenceISOYear:s}}const bC=new RegExp(`^${qu.source}$`,"i"),_C=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/.source}$`);function wC(e){const t=KL.test(e)?"Seconds not allowed in offset time zone":"Invalid time zone";throw new RangeError(`${t}: ${e}`)}function $s(e){return bC.test(e)||wC(e),_C.test(e)?{offsetMinutes:Mc(e)/6e10}:{tzName:e}}function zl(e,t,n,i){let r=e,s=t,o=n;switch(i){case"reject":jo(r,s,o);break;case"constrain":({year:r,month:s,day:o}=FC(r,s,o))}return{year:r,month:s,day:o}}function Vf(e,t,n,i,r,s,o){let a=e,c=t,l=n,u=i,h=r,d=s;switch(o){case"reject":Xf(a,c,l,u,h,d);break;case"constrain":a=gn(a,0,23),c=gn(c,0,59),l=gn(l,0,59),u=gn(u,0,999),h=gn(h,0,999),d=gn(d,0,999)}return{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}function xC(e){if(!re(e))throw new TypeError("invalid duration-like");const t={years:void 0,months:void 0,weeks:void 0,days:void 0,hours:void 0,minutes:void 0,seconds:void 0,milliseconds:void 0,microseconds:void 0,nanoseconds:void 0};let n=!1;for(let i=0;i<Gd.length;i++){const r=Gd[i],s=e[r];s!==void 0&&(n=!0,t[r]=Ei(s))}if(!n)throw new TypeError("invalid duration-like");return t}function Xe({years:e,months:t,weeks:n,days:i},r,s,o){return{years:e,months:o??t,weeks:s??n,days:r??i}}function Mt(e,t){return{isoDate:e,time:t}}function St(e){return Nr(e,"overflow",["constrain","reject"],"constrain")}function jl(e){return Nr(e,"disambiguation",["compatible","earlier","later","reject"],"compatible")}function Pi(e,t){return Nr(e,"roundingMode",["ceil","floor","expand","trunc","halfCeil","halfFloor","halfExpand","halfTrunc","halfEven"],t)}function Xh(e,t){return Nr(e,"offset",["prefer","use","ignore","reject"],t)}function Ku(e){return Nr(e,"calendarName",["auto","always","never","critical"],"auto")}function Sc(e){let t=e.roundingIncrement;if(t===void 0)return 1;const n=st(t);if(n<1||n>1e9)throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t}`);return n}function Ec(e,t,n){const i=n?t:t-1;if(e>i)throw new RangeError(`roundingIncrement must be at least 1 and less than ${i}, not ${e}`);if(t%e!=0)throw new RangeError(`Rounding increment must divide evenly into ${t}`)}function Gu(e){const t=e.fractionalSecondDigits;if(t===void 0)return"auto";if(typeof t!="number"){if(Yf(t)!=="auto")throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return"auto"}const n=Math.floor(t);if(!Number.isFinite(n)||n<0||n>9)throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return n}function Xu(e,t){switch(e){case"minute":return{precision:"minute",unit:"minute",increment:1};case"second":return{precision:0,unit:"second",increment:1};case"millisecond":return{precision:3,unit:"millisecond",increment:1};case"microsecond":return{precision:6,unit:"microsecond",increment:1};case"nanosecond":return{precision:9,unit:"nanosecond",increment:1}}switch(t){case"auto":return{precision:t,unit:"nanosecond",increment:1};case 0:return{precision:t,unit:"second",increment:1};case 1:case 2:case 3:return{precision:t,unit:"millisecond",increment:10**(3-t)};case 4:case 5:case 6:return{precision:t,unit:"microsecond",increment:10**(6-t)};case 7:case 8:case 9:return{precision:t,unit:"nanosecond",increment:10**(9-t)};default:throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`)}}const Yr=Symbol("~required~");function Nn(e,t,n,i,r=[]){let s=[];for(let l=0;l<rc.length;l++){const u=rc[l],h=u[1],d=u[2];n!=="datetime"&&n!==d||s.push(h)}s=s.concat(r);let o=i;o===Yr?o=void 0:o!==void 0&&s.push(o);let a=[];a=a.concat(s);for(let l=0;l<s.length;l++){const u=s[l],h=YL[u];h!==void 0&&a.push(h)}let c=Nr(e,t,a,o);if(c===void 0&&i===Yr)throw new RangeError(`${t} is required`);return c&&c in Mb?Mb[c]:c}function Gp(e){const t=e.relativeTo;if(t===void 0)return{};let n,i,r,s,o,a="option",c=!1;if(re(t)){if(ft(t))return{zonedRelativeTo:t};if(ne(t))return{plainRelativeTo:t};if(jt(t))return{plainRelativeTo:vn(y(t,Ut).isoDate,y(t,A))};r=eh(t);const l=ni(r,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],[]);({isoDate:n,time:i}=Zu(r,l,"constrain")),{offset:o,timeZone:s}=l,o===void 0&&(a="wall")}else{let l,u,h,d,f;if({year:h,month:d,day:f,time:i,calendar:r,tzAnnotation:l,offset:o,z:u}=pr(Se(t)),l)s=yn(l),u?a="exact":o||(a="wall"),c=!0;else if(u)throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");r||(r="iso8601"),r=Cn(r),n={year:h,month:d,day:f}}return s===void 0?{plainRelativeTo:vn(n,r)}:{zonedRelativeTo:Ge(Xd(n,i,a,a==="option"?Mc(o):0,s,"compatible","reject",c),s,r)}}function Sr(e){return y(e,cn)!==0?"year":y(e,ln)!==0?"month":y(e,On)!==0?"week":y(e,un)!==0?"day":y(e,hn)!==0?"hour":y(e,dn)!==0?"minute":y(e,fn)!==0?"second":y(e,pn)!==0?"millisecond":y(e,mn)!==0?"microsecond":"nanosecond"}function Ar(e,t){return Fl.indexOf(e)>Fl.indexOf(t)?t:e}function Ui(e){return e==="year"||e==="month"||e==="week"}function Er(e){return Ui(e)||e==="day"?"date":"time"}function Ys(e){return je("%calendarImpl%")(e)}function Qu(e){return je("%calendarImpl%")(y(e,A))}function _n(e,t,n="date"){const i=Object.create(null),r=Ys(e).isoToDate(t,{year:!0,monthCode:!0,day:!0});return i.monthCode=r.monthCode,n!=="month-day"&&n!=="date"||(i.day=r.day),n!=="year-month"&&n!=="date"||(i.year=r.year),i}function ni(e,t,n,i,r){const s=Ys(e).extraFields(n),o=n.concat(i,s),a=Object.create(null);let c=!1;o.sort();for(let l=0;l<o.length;l++){const u=o[l],h=t[u];if(h!==void 0)c=!0,a[u]=(0,HL[u])(h);else if(r!=="partial"){if(r.includes(u))throw new TypeError(`required property '${u}' missing or undefined`);a[u]=UL[u]}}if(r==="partial"&&!c)throw new TypeError("no supported properties found");return a}function fg(e,t="complete"){const n=["hour","microsecond","millisecond","minute","nanosecond","second"];let i=!1;const r=Object.create(null);for(let s=0;s<n.length;s++){const o=n[s],a=e[o];a!==void 0?(r[o]=st(a),i=!0):t==="complete"&&(r[o]=0)}if(!i)throw new TypeError("invalid time-like");return r}function cl(e,t){if(re(e)){if(ne(e))return St(K(t)),vn(y(e,rt),y(e,A));if(ft(e)){const c=wi(y(e,Tt),y(e,it));return St(K(t)),vn(c.isoDate,y(e,A))}if(jt(e))return St(K(t)),vn(y(e,Ut).isoDate,y(e,A));const a=eh(e);return vn(Ls(a,ni(a,e,["year","month","monthCode","day"],[],[]),St(K(t))),a)}let{year:n,month:i,day:r,calendar:s,z:o}=pr(Se(e));if(o)throw new RangeError("Z designator not supported for PlainDate");return s||(s="iso8601"),s=Cn(s),St(K(t)),vn({year:n,month:i,day:r},s)}function Zu(e,t,n){return Mt(Ls(e,t,n),Vf(t.hour,t.minute,t.second,t.millisecond,t.microsecond,t.nanosecond,n))}function ll(e,t){let n,i,r;if(re(e)){if(jt(e))return St(K(t)),fi(y(e,Ut),y(e,A));if(ft(e)){const a=wi(y(e,Tt),y(e,it));return St(K(t)),fi(a,y(e,A))}if(ne(e))return St(K(t)),fi(Mt(y(e,rt),{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),y(e,A));r=eh(e);const s=ni(r,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],[]),o=St(K(t));({isoDate:n,time:i}=Zu(r,s,o))}else{let s,o,a,c;if({year:o,month:a,day:c,time:i,calendar:r,z:s}=pr(Se(e)),s)throw new RangeError("Z designator not supported for PlainDateTime");i==="start-of-day"&&(i={deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Z0(o,a,c,i.hour,i.minute,i.second,i.millisecond,i.microsecond,i.nanosecond),r||(r="iso8601"),r=Cn(r),St(K(t)),n={year:o,month:a,day:c}}return fi(Mt(n,i),r)}function gi(e){const t=je("%Temporal.Duration%");if(te(e))return new t(y(e,cn),y(e,ln),y(e,On),y(e,un),y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,mn),y(e,Pn));if(!re(e))return(function(r){const{years:s,months:o,weeks:a,days:c,hours:l,minutes:u,seconds:h,milliseconds:d,microseconds:f,nanoseconds:p}=(function(m){const g=LL.exec(m);if(!g)throw new RangeError(`invalid duration: ${m}`);if(g.every(((G,B)=>B<2||G===void 0)))throw new RangeError(`invalid duration: ${m}`);const b=g[1]==="-"?-1:1,_=g[2]===void 0?0:st(g[2])*b,C=g[3]===void 0?0:st(g[3])*b,S=g[4]===void 0?0:st(g[4])*b,k=g[5]===void 0?0:st(g[5])*b,$=g[6]===void 0?0:st(g[6])*b,D=g[7],w=g[8],x=g[9],M=g[10],I=g[11];let T=0,R=0,j=0;if(D!==void 0){if(w??x??M??I)throw new RangeError("only the smallest unit can be fractional");j=3600*st((D+"000000000").slice(0,9))*b}else if(T=w===void 0?0:st(w)*b,x!==void 0){if(M??I)throw new RangeError("only the smallest unit can be fractional");j=60*st((x+"000000000").slice(0,9))*b}else R=M===void 0?0:st(M)*b,I!==void 0&&(j=st((I+"000000000").slice(0,9))*b);const z=j%1e3,Y=Math.trunc(j/1e3)%1e3,F=Math.trunc(j/1e6)%1e3;return R+=Math.trunc(j/1e9)%60,T+=Math.trunc(j/6e10),Qf(_,C,S,k,$,T,R,F,Y,z),{years:_,months:C,weeks:S,days:k,hours:$,minutes:T,seconds:R,milliseconds:F,microseconds:Y,nanoseconds:z}})(r);return new(je("%Temporal.Duration%"))(s,o,a,c,l,u,h,d,f,p)})(Se(e));const n={years:0,months:0,weeks:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};let i=xC(e);for(let r=0;r<Gd.length;r++){const s=Gd[r],o=i[s];o!==void 0&&(n[s]=o)}return new t(n.years,n.months,n.weeks,n.days,n.hours,n.minutes,n.seconds,n.milliseconds,n.microseconds,n.nanoseconds)}function ul(e){let t;if(re(e)){if(Ae(e)||ft(e))return Ki(y(e,it));t=hg(e)}else t=e;const{year:n,month:i,day:r,time:s,offset:o,z:a}=(function(m){const g=pr(m);if(!g.z&&!g.offset)throw new RangeError("Temporal.Instant requires a time zone offset");return g})(Se(t)),{hour:c=0,minute:l=0,second:u=0,millisecond:h=0,microsecond:d=0,nanosecond:f=0}=s==="start-of-day"?{}:s,p=bu(n,i,r,c,l,u,h,d,f-(a?0:Mc(o)));return ja(p.isoDate),Ki(ze(p))}function $b(e,t){if(re(e)){if(Kn(e))return St(K(t)),Oa(y(e,rt),y(e,A));let a;return xn(e,A)?a=y(e,A):(a=e.calendar,a===void 0&&(a="iso8601"),a=th(a)),Oa(Qd(a,ni(a,e,["year","month","monthCode","day"],[],[]),St(K(t))),a)}let{month:n,day:i,referenceISOYear:r,calendar:s}=K0(Se(e));if(s===void 0&&(s="iso8601"),s=Cn(s),St(K(t)),s==="iso8601")return Oa({year:1972,month:n,day:i},s);let o={year:r,month:n,day:i};return ra(o),o=Qd(s,_n(s,o,"month-day"),"constrain"),Oa(o,s)}function vs(e,t){let n;if(re(e)){if(ce(e))return St(K(t)),Mr(y(e,ie));if(jt(e))return St(K(t)),Mr(y(e,Ut).time);if(ft(e)){const l=wi(y(e,Tt),y(e,it));return St(K(t)),Mr(l.time)}const{hour:i,minute:r,second:s,millisecond:o,microsecond:a,nanosecond:c}=fg(e);n=Vf(i,r,s,o,a,c,St(K(t)))}else n=yC(Se(e)),St(K(t));return Mr(n)}function CC(e){return e===void 0?{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}:y(vs(e),ie)}function hl(e,t){if(re(e)){if(Le(e))return St(K(t)),za(y(e,rt),y(e,A));const a=eh(e);return za(gu(a,ni(a,e,["year","month","monthCode"],[],[]),St(K(t))),a)}let{year:n,month:i,referenceISODay:r,calendar:s}=V0(Se(e));s===void 0&&(s="iso8601"),s=Cn(s),St(K(t));let o={year:n,month:i,day:r};return J0(o),o=gu(s,_n(s,o,"year-month"),"constrain"),za(o,s)}function Xd(e,t,n,i,r,s,o,a){if(t==="start-of-day")return as(r,e);const c=Mt(e,t);if(n==="wall"||o==="ignore")return Ze(r,c,s);if(n==="exact"||o==="use"){const h=bu(e.year,e.month,e.day,t.hour,t.minute,t.second,t.millisecond,t.microsecond,t.nanosecond-i);ja(h.isoDate);const d=ze(h);return sr(d),d}ja(e);const l=ze(c),u=vu(r,c);for(let h=0;h<u.length;h++){const d=u[h],f=v.toNumber(v.subtract(l,d)),p=ys(f,6e10,"halfExpand");if(f===i||a&&p===i)return d}if(o==="reject"){const h=pg(i),d=yu(c,"iso8601","auto");throw new RangeError(`Offset ${h} is invalid for ${d} in ${r}`)}return OC(u,r,c,s)}function dl(e,t){let n,i,r,s,o,a,c,l=!1,u="option";if(re(e)){if(ft(e)){const m=K(t);return jl(m),Xh(m,"reject"),St(m),Ge(y(e,it),y(e,Tt),y(e,A))}o=eh(e);const d=ni(o,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],["timeZone"]);({offset:s,timeZone:r}=d),s===void 0&&(u="wall");const f=K(t);a=jl(f),c=Xh(f,"reject");const p=St(f);({isoDate:n,time:i}=Zu(o,d,p))}else{let d,f,p,m,g;({year:p,month:m,day:g,time:i,tzAnnotation:d,offset:s,z:f,calendar:o}=(function(_){const C=pr(_);if(!C.tzAnnotation)throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");return C})(Se(e))),r=yn(d),f?u="exact":s||(u="wall"),o||(o="iso8601"),o=Cn(o),l=!0;const b=K(t);a=jl(b),c=Xh(b,"reject"),St(b),n={year:p,month:m,day:g}}let h=0;return u==="option"&&(h=Mc(s)),Ge(Xd(n,i,u,h,r,a,c,l),r,o)}function kC(e,t,n){ra(t),Jr(e),ht(e,rt,t),ht(e,A,n),ht(e,eC,!0)}function vn(e,t){const n=je("%Temporal.PlainDate%"),i=Object.create(n.prototype);return kC(i,e,t),i}function SC(e,t,n){Bo(t),Jr(e),ht(e,Ut,t),ht(e,A,n)}function fi(e,t){const n=je("%Temporal.PlainDateTime%"),i=Object.create(n.prototype);return SC(i,e,t),i}function EC(e,t,n){ra(t),Jr(e),ht(e,rt,t),ht(e,A,n),ht(e,iC,!0)}function Oa(e,t){const n=je("%Temporal.PlainMonthDay%"),i=Object.create(n.prototype);return EC(i,e,t),i}function MC(e,t){Jr(e),ht(e,ie,t)}function Mr(e){const t=je("%Temporal.PlainTime%"),n=Object.create(t.prototype);return MC(n,e),n}function DC(e,t,n){J0(t),Jr(e),ht(e,rt,t),ht(e,A,n),ht(e,nC,!0)}function za(e,t){const n=je("%Temporal.PlainYearMonth%"),i=Object.create(n.prototype);return DC(i,e,t),i}function $C(e,t){sr(t),Jr(e),ht(e,it,t)}function Ki(e){const t=je("%Temporal.Instant%"),n=Object.create(t.prototype);return $C(n,e),n}function TC(e,t,n,i){sr(t),Jr(e),ht(e,it,t),ht(e,Tt,n),ht(e,A,i)}function Ge(e,t,n="iso8601"){const i=je("%Temporal.ZonedDateTime%"),r=Object.create(i.prototype);return TC(r,e,t,n),r}function Tb(e){return dg.filter((t=>e[t]!==void 0))}function zo(e,t,n){const i=Tb(n),r=Ys(e).fieldKeysToIgnore(i),s=Object.create(null),o=Tb(t);for(let a=0;a<dg.length;a++){let c;const l=dg[a];o.includes(l)&&!r.includes(l)&&(c=t[l]),i.includes(l)&&(c=n[l]),c!==void 0&&(s[l]=c)}return s}function Zn(e,t,n,i){const r=Ys(e).dateAdd(t,n,i);return ra(r),r}function Ju(e,t,n,i){return Ys(e).dateUntil(t,n,i)}function th(e){if(re(e)&&xn(e,A))return y(e,A);const t=Se(e);try{return Cn(t)}catch{}let n;try{({calendar:n}=pr(t))}catch{try{({calendar:n}=yC(t))}catch{try{({calendar:n}=V0(t))}catch{({calendar:n}=K0(t))}}}return n||(n="iso8601"),Cn(n)}function eh(e){if(xn(e,A))return y(e,A);const{calendar:t}=e;return t===void 0?"iso8601":th(t)}function rr(e,t){return Cn(e)===Cn(t)}function Ls(e,t,n){const i=Ys(e);i.resolveFields(t,"date");const r=i.dateToISO(t,n);return ra(r),r}function gu(e,t,n){const i=Ys(e);i.resolveFields(t,"year-month"),t.day=1;const r=i.dateToISO(t,n);return J0(r),r}function Qd(e,t,n){const i=Ys(e);i.resolveFields(t,"month-day");const r=i.monthDayToISOReferenceDate(t,n);return ra(r),r}function yn(e){if(re(e)&&ft(e))return y(e,Tt);const t=Se(e);if(t==="UTC")return"UTC";const{tzName:n,offsetMinutes:i}=(function(s){const{tzAnnotation:o,offset:a,z:c}=(function(l){if(bC.test(l))return{tzAnnotation:l,offset:void 0,z:!1};try{const{tzAnnotation:u,offset:h,z:d}=pr(l);if(d||u||h)return{tzAnnotation:u,offset:h,z:d}}catch{}wC(l)})(s);return o?$s(o):c?$s("UTC"):a?$s(a):void 0})(t);if(i!==void 0)return G0(i);const r=Zd(n);if(!r)throw new RangeError(`Unrecognized time zone ${n}`);return r.identifier}function IC(e,t){if(e===t)return!0;const n=$s(e).offsetMinutes,i=$s(t).offsetMinutes;if(n===void 0&&i===void 0){const r=Zd(t);if(!r)return!1;const s=Zd(e);return!!s&&s.primaryIdentifier===r.primaryIdentifier}return n===i}function Dr(e,t){const n=$s(e).offsetMinutes;return n!==void 0?6e10*n:mg(e,t)}function pg(e){const t=e<0?"-":"+",n=Math.abs(e),i=Math.floor(n/36e11),r=Math.floor(n/6e10)%60,s=Math.floor(n/1e9)%60,o=n%1e9;return`${t}${Kf(i,r,s,o,s===0&&o===0?"minute":"auto")}`}function wi(e,t){const n=Dr(e,t);let{isoDate:{year:i,month:r,day:s},time:{hour:o,minute:a,second:c,millisecond:l,microsecond:u,nanosecond:h}}=AC(t);return bu(i,r,s,o,a,c,l,u,h+n)}function Ze(e,t,n){return OC(vu(e,t),e,t,n)}function OC(e,t,n,i){const r=e.length;if(r===1)return e[0];if(r)switch(i){case"compatible":case"earlier":return e[0];case"later":return e[r-1];case"reject":throw new RangeError("multiple instants found")}if(i==="reject")throw new RangeError("multiple instants found");const s=ze(n),o=v.subtract(s,Rs);sr(o);const a=Dr(t,o),c=v.add(s,Rs);sr(c);const l=Dr(t,c)-a;switch(i){case"earlier":{const u=pt.fromComponents(0,0,0,0,0,-l),h=oc(n.time,u);return vu(t,Mt(jn(n.isoDate.year,n.isoDate.month,n.isoDate.day+h.deltaDays),h))[0]}case"compatible":case"later":{const u=pt.fromComponents(0,0,0,0,0,l),h=oc(n.time,u),d=vu(t,Mt(jn(n.isoDate.year,n.isoDate.month,n.isoDate.day+h.deltaDays),h));return d[d.length-1]}}}function vu(e,t){if(e==="UTC")return ja(t.isoDate),[ze(t)];const n=$s(e).offsetMinutes;if(n!==void 0){const i=bu(t.isoDate.year,t.isoDate.month,t.isoDate.day,t.time.hour,t.time.minute-n,t.time.second,t.time.millisecond,t.time.microsecond,t.time.nanosecond);ja(i.isoDate);const r=ze(i);return sr(r),[r]}return ja(t.isoDate),(function(i,r){let s=ze(r),o=v.subtract(s,Rs);v.lessThan(o,pu)&&(o=s);let a=v.add(s,Rs);v.greaterThan(a,ic)&&(a=s);const c=mg(i,o),l=mg(i,a);return(c===l?[c]:[c,l]).map((h=>{const d=v.subtract(s,v.BigInt(h)),f=(function(p,m){const{epochMilliseconds:g,time:{millisecond:b,microsecond:_,nanosecond:C}}=AC(m),{year:S,month:k,day:$,hour:D,minute:w,second:x}=LC(p,g);return bu(S,k,$,D,w,x,b,_,C)})(i,d);if(ac(r,f)===0)return sr(d),d})).filter((h=>h!==void 0))})(e,t)}function as(e,t){const n=Mt(t,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),i=vu(e,n);if(i.length)return i[0];const r=ze(n),s=v.subtract(r,Rs);return sr(s),Q0(e,s)}function nh(e){let t;return t=e<0||e>9999?(e<0?"-":"+")+mu(Math.abs(e),6):mu(e,4),t}function Jn(e){return mu(e,2)}function PC(e,t){let n;if(t==="auto"){if(e===0)return"";n=mu(e,9).replace(/0+$/,"")}else{if(t===0)return"";n=mu(e,9).slice(0,t)}return`.${n}`}function Kf(e,t,n,i,r){let s=`${Jn(e)}:${Jn(t)}`;return r==="minute"||(s+=`:${Jn(n)}`,s+=PC(i,r)),s}function Ib(e,t,n){let i=t;i===void 0&&(i="UTC");const r=y(e,it),s=yu(wi(i,r),"iso8601",n,"never");let o="Z";return t!==void 0&&(o=RC(Dr(i,r))),`${s}${o}`}function _h(e,t){const n=y(e,cn),i=y(e,ln),r=y(e,On),s=y(e,un),o=y(e,hn),a=y(e,dn),c=tf(e);let l="";n!==0&&(l+=`${Math.abs(n)}Y`),i!==0&&(l+=`${Math.abs(i)}M`),r!==0&&(l+=`${Math.abs(r)}W`),s!==0&&(l+=`${Math.abs(s)}D`);let u="";o!==0&&(u+=`${Math.abs(o)}H`),a!==0&&(u+=`${Math.abs(a)}M`);const h=pt.fromComponents(0,0,y(e,fn),y(e,pn),y(e,mn),y(e,Pn));h.isZero()&&!["second","millisecond","microsecond","nanosecond"].includes(Sr(e))&&t==="auto"||(u+=`${Math.abs(h.sec)}${PC(Math.abs(h.subsec),t)}S`);let d=`${c<0?"-":""}P${l}`;return u&&(d=`${d}T${u}`),d}function Ob(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);return`${nh(n)}-${Jn(i)}-${Jn(r)}${Vu(y(e,A),t)}`}function Pb({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o){return Kf(e,t,n,1e6*i+1e3*r+s,o)}function yu(e,t,n,i="auto"){const{isoDate:{year:r,month:s,day:o},time:{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}=e;return`${nh(r)}-${Jn(s)}-${Jn(o)}T${Kf(a,c,l,1e6*u+1e3*h+d,n)}${Vu(t,i)}`}function Rb(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);let s=`${Jn(i)}-${Jn(r)}`;const o=y(e,A);t!=="always"&&t!=="critical"&&o==="iso8601"||(s=`${nh(n)}-${s}`);const a=Vu(o,t);return a&&(s+=a),s}function Ab(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);let s=`${nh(n)}-${Jn(i)}`;const o=y(e,A);t!=="always"&&t!=="critical"&&o==="iso8601"||(s+=`-${Jn(r)}`);const a=Vu(o,t);return a&&(s+=a),s}function Lb(e,t,n="auto",i="auto",r="auto",s=void 0){let o=y(e,it);if(s){const{unit:u,increment:h,roundingMode:d}=s;o=bg(o,h,u,d)}const a=y(e,Tt),c=Dr(a,o);let l=yu(wi(a,o),"iso8601",t,"never");return r!=="never"&&(l+=RC(c)),i!=="never"&&(l+=`[${i==="critical"?"!":""}${a}]`),l+=Vu(y(e,A),n),l}function Nb(e){return _C.test(e)}function Mc(e){const t=GL.exec(e);if(!t)throw new RangeError(`invalid time zone offset: ${e}; must match ±HH:MM[:SS.SSSSSSSSS]`);return(t[1]==="-"?-1:1)*(1e9*(60*(60*+t[2]+ +(t[3]||0))+ +(t[4]||0))+ +((t[5]||0)+"000000000").slice(0,9))}let Hc;const VL=Object.assign(Object.create(null),{"/":!0,"-":!0,_:!0});function Zd(e){if(Hc===void 0){const s=Intl.supportedValuesOf?.("timeZone");if(s){Hc=new Map;for(let o=0;o<s.length;o++){const a=s[o];Hc.set(_u(a),a)}}else Hc=null}const t=_u(e);let n=Hc?.get(t);if(n)return{identifier:n,primaryIdentifier:n};try{n=vC(e).resolvedOptions().timeZone}catch{return}if(t==="antarctica/south_pole"&&(n="Antarctica/McMurdo"),WL.has(e))throw new RangeError(`${e} is a legacy time zone identifier from ICU. Use ${n} instead`);const i=[...t].map(((s,o)=>o===0||VL[t[o-1]]?s.toUpperCase():s)).join("").split("/");if(i.length===1)return t==="gb-eire"?{identifier:"GB-Eire",primaryIdentifier:n}:{identifier:t.length<=3||/[-0-9]/.test(t)?t.toUpperCase():i[0],primaryIdentifier:n};if(i[0]==="Etc")return{identifier:`Etc/${["Zulu","Greenwich","Universal"].includes(i[1])?i[1]:i[1].toUpperCase()}`,primaryIdentifier:n};if(i[0]==="Us")return{identifier:`US/${i[1]}`,primaryIdentifier:n};const r=new Map([["Act","ACT"],["Lhi","LHI"],["Nsw","NSW"],["Dar_Es_Salaam","Dar_es_Salaam"],["Port_Of_Spain","Port_of_Spain"],["Port-Au-Prince","Port-au-Prince"],["Isle_Of_Man","Isle_of_Man"],["Comodrivadavia","ComodRivadavia"],["Knox_In","Knox_IN"],["Dumontdurville","DumontDUrville"],["Mcmurdo","McMurdo"],["Denoronha","DeNoronha"],["Easterisland","EasterIsland"],["Bajanorte","BajaNorte"],["Bajasur","BajaSur"]]);return i[1]=r.get(i[1])??i[1],i.length>2&&(i[2]=r.get(i[2])??i[2]),{identifier:i.join("/"),primaryIdentifier:n}}function So(e,t){const{year:n,month:i,day:r,hour:s,minute:o,second:a}=LC(e,t);let c=t%1e3;return c<0&&(c+=1e3),1e6*(X0({isoDate:{year:n,month:i,day:r},time:{hour:s,minute:o,second:a,millisecond:c}})-t)}function mg(e,t){return So(e,xi(t,"floor"))}function G0(e){const t=e<0?"-":"+",n=Math.abs(e);return`${t}${Kf(Math.floor(n/60),n%60,0,0,"minute")}`}function RC(e){return G0(ys(e,NL,"halfExpand")/6e10)}function X0({isoDate:{year:e,month:t,day:n},time:{hour:i,minute:r,second:s,millisecond:o}}){const a=e%400,c=(e-a)/400,l=new Date;return l.setUTCHours(i,r,s,o),l.setUTCFullYear(a,t-1,n),l.getTime()+jL*c}function ze(e){const t=X0(e),n=1e3*e.time.microsecond+e.time.nanosecond;return v.add(Xi(t),v.BigInt(n))}function AC(e){let t=xi(e,"trunc"),n=v.toNumber(v.remainder(e,Yu));n<0&&(n+=1e6,t-=1);const i=Math.floor(n/1e3)%1e3,r=n%1e3,s=new Date(t);return{epochMilliseconds:t,isoDate:{year:s.getUTCFullYear(),month:s.getUTCMonth()+1,day:s.getUTCDate()},time:{hour:s.getUTCHours(),minute:s.getUTCMinutes(),second:s.getUTCSeconds(),millisecond:s.getUTCMilliseconds(),microsecond:i,nanosecond:r}}}function Q0(e,t){if(e==="UTC")return null;const n=xi(t,"floor");if(n<Nl)return Q0(e,Xi(Nl));const i=Date.now(),r=Math.max(n,i)+366*As*3;let s=n,o=So(e,s),a=s,c=o;for(;o===c&&s<r;){if(a=s+2*As*7,a>gC)return null;c=So(e,a),o===c&&(s=a)}return o===c?null:Xi(qC((l=>So(e,l)),s,a,o,c))}function gg(e,t){if(e==="UTC")return null;const n=xi(t,"ceil"),i=Date.now(),r=i+366*As*3;if(n>r){const l=gg(e,Xi(r));if(l===null||v.lessThan(l,Xi(i)))return l}if(e==="Africa/Casablanca"||e==="Africa/El_Aaiun"){const l=Date.UTC(2088,0,1);if(l<n)return gg(e,Xi(l))}let s=n-1;if(s<Nl)return null;let o=So(e,s),a=s,c=o;for(;o===c&&s>Nl;){if(a=s-2*As*7,a<Nl)return null;c=So(e,a),o===c&&(s=a)}return o===c?null:Xi(qC((l=>So(e,l)),a,s,c,o))}function LC(e,t){return(function(n){const i=n.split(/[^\w]+/);if(i.length!==7)throw new RangeError(`expected 7 parts in "${n}`);const r=+i[0],s=+i[1];let o=+i[2];const a=i[3];if(a[0]==="b"||a[0]==="B")o=1-o;else if(a[0]!=="a"&&a[0]!=="A")throw new RangeError(`Unknown era ${a} in "${n}`);const c=i[4]==="24"?0:+i[4],l=+i[5],u=+i[6];if(!(Number.isFinite(o)&&Number.isFinite(r)&&Number.isFinite(s)&&Number.isFinite(c)&&Number.isFinite(l)&&Number.isFinite(u)))throw new RangeError(`Invalid number in "${n}`);return{year:o,month:r,day:s,hour:c,minute:l,second:u}})(vC(e).format(t))}function Jd(e){return e!==void 0&&!(e%4!=0||e%100==0&&e%400!=0)}function Eo(e,t){return{standard:[31,28,31,30,31,30,31,31,30,31,30,31],leapyear:[31,29,31,30,31,30,31,31,30,31,30,31]}[Jd(e)?"leapyear":"standard"][t-1]}function tf(e){const t=[y(e,cn),y(e,ln),y(e,On),y(e,un),y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,mn),y(e,Pn)];for(let n=0;n<t.length;n++){const i=t[n];if(i!==0)return i<0?-1:1}return 0}function Gf(e){const t=["years","months","weeks","days"];for(let n=0;n<t.length;n++){const i=e[t[n]];if(i!==0)return i<0?-1:1}return 0}function NC(e){const t=Gf(e.date);return t!==0?t:e.time.sign()}function bo(e,t){let n=e,i=t;if(!Number.isFinite(n)||!Number.isFinite(i))throw new RangeError("infinity is out of range");return i-=1,n+=Math.floor(i/12),i%=12,i<0&&(i+=12),i+=1,{year:n,month:i}}function jn(e,t,n){let i=e,r=t,s=n;if(!Number.isFinite(s))throw new RangeError("infinity is out of range");({year:i,month:r}=bo(i,r));const o=146097;if(Math.abs(s)>o){const l=Math.trunc(s/o);i+=400*l,s-=l*o}let a=0,c=r>2?i:i-1;for(;a=Jd(c)?366:365,s<-a;)i-=1,c-=1,s+=a;for(c+=1;a=Jd(c)?366:365,s>a;)i+=1,c+=1,s-=a;for(;s<1;)({year:i,month:r}=bo(i,r-1)),s+=Eo(i,r);for(;s>Eo(i,r);)s-=Eo(i,r),{year:i,month:r}=bo(i,r+1);return{year:i,month:r,day:s}}function bu(e,t,n,i,r,s,o,a,c){const l=cs(i,r,s,o,a,c);return Mt(jn(e,t,n+l.deltaDays),l)}function cs(e,t,n,i,r,s){let o,a=e,c=t,l=n,u=i,h=r,d=s;({div:o,mod:d}=Ia(d,3)),h+=o,d<0&&(h-=1,d+=1e3),{div:o,mod:h}=Ia(h,3),u+=o,h<0&&(u-=1,h+=1e3),l+=Math.trunc(u/1e3),u%=1e3,u<0&&(l-=1,u+=1e3),c+=Math.trunc(l/60),l%=60,l<0&&(c-=1,l+=60),a+=Math.trunc(c/60),c%=60,c<0&&(a-=1,c+=60);let f=Math.trunc(a/24);return a%=24,a<0&&(f-=1,a+=24),f+=0,a+=0,c+=0,l+=0,u+=0,h+=0,d+=0,{deltaDays:f,hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}function Fb(e,t){const n=Xe(e,0);if(Gf(n)===0)return e.days;const i=y(t,rt),r=Zn(y(t,A),i,n,"constrain"),s=Wo(i.year,i.month-1,i.day),o=Wo(r.year,r.month-1,r.day)-s;return e.days+o}function Bn(e){return new(je("%Temporal.Duration%"))(-y(e,cn),-y(e,ln),-y(e,On),-y(e,un),-y(e,hn),-y(e,dn),-y(e,fn),-y(e,pn),-y(e,mn),-y(e,Pn))}function gn(e,t,n){return Math.min(n,Math.max(t,e))}function FC(e,t,n){const i=gn(t,1,12);return{year:e,month:i,day:gn(n,1,Eo(e,i))}}function Te(e,t,n){if(e<t||e>n)throw new RangeError(`value out of range: ${t} <= ${e} <= ${n}`)}function jo(e,t,n){Te(t,1,12),Te(n,1,Eo(e,t))}function ra(e){Bo(Mt(e,{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}))}function Xf(e,t,n,i,r,s){Te(e,0,23),Te(t,0,59),Te(n,0,59),Te(i,0,999),Te(r,0,999),Te(s,0,999)}function Z0(e,t,n,i,r,s,o,a,c){jo(e,t,n),Xf(i,r,s,o,a,c)}function Bo(e){const t=ze(e);(v.lessThan(t,FL)||v.greaterThan(t,zL))&&sr(t)}function vg(e){ze(e)}function sr(e){if(v.lessThan(e,pu)||v.greaterThan(e,ic))throw new RangeError("date/time value is outside of supported range")}function J0({year:e,month:t}){Te(e,kb,Sb),e===kb?Te(t,4,12):e===Sb&&Te(t,1,9)}function Qf(e,t,n,i,r,s,o,a,c,l){let u=0;const h=[e,t,n,i,r,s,o,a,c,l];for(let b=0;b<h.length;b++){const _=h[b];if(_===1/0||_===-1/0)throw new RangeError("infinite values not allowed as duration fields");if(_!==0){const C=_<0?-1:1;if(u!==0&&C!==u)throw new RangeError("mixed-sign values not allowed as duration fields");u=C}}if(Math.abs(e)>=2**32||Math.abs(t)>=2**32||Math.abs(n)>=2**32)throw new RangeError("years, months, and weeks must be < 2³²");const d=Ia(a,3),f=Ia(c,6),p=Ia(l,9),m=Ia(1e6*d.mod+1e3*f.mod+p.mod,9).div,g=86400*i+3600*r+60*s+o+d.div+f.div+p.div+m;if(!Number.isSafeInteger(g))throw new RangeError("total of duration time units cannot exceed 9007199254740991.999999999 s")}function Ca(e){return{date:{years:y(e,cn),months:y(e,ln),weeks:y(e,On),days:y(e,un)},time:pt.fromComponents(y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,mn),y(e,Pn))}}function Gi(e){const t=pt.fromComponents(y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,mn),y(e,Pn)).add24HourDays(y(e,un));return{date:{years:y(e,cn),months:y(e,ln),weeks:y(e,On),days:0},time:t}}function zC(e){const t=Gi(e),n=Math.trunc(t.time.sec/86400);return Qf(t.date.years,t.date.months,t.date.weeks,n,0,0,0,0,0,0),{...t.date,days:n}}function pi(e,t){const n=e.time.sign();let i=e.time.abs().subsec,r=0,s=0,o=e.time.abs().sec,a=0,c=0,l=0;switch(t){case"year":case"month":case"week":case"day":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60,c=Math.trunc(a/60),a%=60,l=Math.trunc(c/24),c%=24;break;case"hour":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60,c=Math.trunc(a/60),a%=60;break;case"minute":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60;break;case"second":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3;break;case"millisecond":r=Math.trunc(i/1e3),i%=1e3,s=Vp(o,3,Math.trunc(r/1e3)),r%=1e3,o=0;break;case"microsecond":r=Vp(o,6,Math.trunc(i/1e3)),i%=1e3,o=0;break;case"nanosecond":i=Vp(o,9,i),o=0}return new(je("%Temporal.Duration%"))(e.date.years,e.date.months,e.date.weeks,e.date.days+n*l,n*c,n*a,n*o,n*s,n*r,n*i)}function Lr(e,t){return Gf(e),t.sign(),{date:e,time:t}}function Wo(e,t,n){return X0({isoDate:{year:e,month:t+1,day:n},time:{hour:0,minute:0,second:0,millisecond:0}})/As}function ja({year:e,month:t,day:n}){if(Math.abs(Wo(e,t-1,n))>1e8)throw new RangeError("date/time value is outside the supported range")}function tv(e,t){const n=t.hour-e.hour,i=t.minute-e.minute,r=t.second-e.second,s=t.millisecond-e.millisecond,o=t.microsecond-e.microsecond,a=t.nanosecond-e.nanosecond;return pt.fromComponents(n,i,r,s,o,a)}function ev(e,t,n,i,r){let s=pt.fromEpochNsDiff(t,e);return s=ef(s,n,i,r),Lr({years:0,months:0,weeks:0,days:0},s)}function jC(e,t,n,i){vg(e),vg(t);let r=tv(e.time,t.time);const s=r.sign(),o=or(e.isoDate,t.isoDate);let a=t.isoDate;o===s&&(a=jn(a.year,a.month,a.day+s),r=r.add24HourDays(-s));const c=Ar("day",i),l=Ju(n,e.isoDate,a,c);return i!==c&&(r=r.add24HourDays(l.days),l.days=0),Lr(l,r)}function BC(e,t,n,i,r){const s=v.subtract(t,e);if(v.equal(s,Xn))return{date:{years:0,months:0,weeks:0,days:0},time:pt.ZERO};const o=v.lessThan(s,Xn)?-1:1,a=wi(n,e),c=wi(n,t);let l,u=0,h=o===1?2:1,d=tv(a.time,c.time);for(d.sign()===-o&&u++;u<=h;u++){l=Mt(jn(c.isoDate.year,c.isoDate.month,c.isoDate.day-u*o),a.time);const p=Ze(n,l,"compatible");if(d=pt.fromEpochNsDiff(t,p),d.sign()!==-o)break}const f=Ar("day",r);return Lr(Ju(i,a.isoDate,l.isoDate,f),d)}function WC(e,t,n,i,r,s,o,a,c){let l,u,h,d,f=t;switch(a){case"year":{const T=ys(f.date.years,o,"trunc");l=T,u=T+o*e,h={years:l,months:0,weeks:0,days:0},d={...h,years:u};break}case"month":{const T=ys(f.date.months,o,"trunc");l=T,u=T+o*e,h=Xe(f.date,0,0,l),d=Xe(f.date,0,0,u);break}case"week":{const T=Xe(f.date,0,0),R=Zn(s,i.isoDate,T,"constrain"),j=Ju(s,R,jn(R.year,R.month,R.day+f.date.days),"week"),z=ys(f.date.weeks+j.weeks,o,"trunc");l=z,u=z+o*e,h=Xe(f.date,0,l),d=Xe(f.date,0,u);break}case"day":{const T=ys(f.date.days,o,"trunc");l=T,u=T+o*e,h=Xe(f.date,l),d=Xe(f.date,u);break}}const p=Zn(s,i.isoDate,h,"constrain"),m=Zn(s,i.isoDate,d,"constrain");let g,b;const _=Mt(p,i.time),C=Mt(m,i.time);r?(g=Ze(r,_,"compatible"),b=Ze(r,C,"compatible")):(g=ze(_),b=ze(C));const S=pt.fromEpochNsDiff(n,g),k=pt.fromEpochNsDiff(b,g),$=Wf(c,e<0?"negative":"positive"),D=S.add(S).abs().subtract(k.abs()).sign(),w=Math.abs(l)/o%2==0,x=S.isZero()?Math.abs(l):S.cmp(k)?Hf(Math.abs(l),Math.abs(u),D,w,$):Math.abs(u),M=new pt(v.add(v.multiply(k.totalNs,v.BigInt(l)),v.multiply(S.totalNs,v.BigInt(o*e)))).fdiv(k.totalNs),I=x===Math.abs(u);return f={date:I?d:h,time:pt.ZERO},{nudgeResult:{duration:f,nudgedEpochNs:I?b:g,didExpandCalendarUnit:I},total:M}}function Zf(e,t,n,i,r,s,o,a,c){let l=e;const u=Ui(a)||i&&a==="day",h=NC(l)<0?-1:1;let d;return u?{nudgeResult:d}=WC(h,l,t,n,i,r,o,a,c):d=i?(function(f,p,m,g,b,_,C,S){let k=p;const $=Zn(b,m.isoDate,k.date,"constrain"),D=Mt($,m.time),w=Mt(jn($.year,$.month,$.day+f),m.time),x=Ze(g,D,"compatible"),M=Ze(g,w,"compatible"),I=pt.fromEpochNsDiff(M,x);if(I.sign()!==f)throw new RangeError("time zone returned inconsistent Instants");const T=v.BigInt(sc[C]*_);let R=k.time.round(T,S);const j=R.subtract(I),z=j.sign()!==-f;let Y,F;return z?(Y=f,R=j.round(T,S),F=R.addToEpochNs(M)):(Y=0,F=R.addToEpochNs(x)),{duration:Lr(Xe(k.date,k.date.days+Y),R),nudgedEpochNs:F,didExpandCalendarUnit:z}})(h,l,n,i,r,o,a,c):(function(f,p,m,g,b,_){let C=f;const S=C.time.add24HourDays(C.date.days),k=S.round(v.BigInt(g*sc[b]),_),$=k.subtract(S),{quotient:D}=S.divmod(Kd),{quotient:w}=k.divmod(Kd),x=Math.sign(w-D)===S.sign(),M=$.addToEpochNs(p);let I=0,T=k;return Er(m)==="date"&&(I=w,T=k.add(pt.fromComponents(24*-w,0,0,0,0,0))),{duration:{date:Xe(C.date,I),time:T},nudgedEpochNs:M,didExpandCalendarUnit:x}})(l,t,s,o,a,c),l=d.duration,d.didExpandCalendarUnit&&a!=="week"&&(l=(function(f,p,m,g,b,_,C,S){let k=p;if(S===C)return k;const $=Fl.indexOf(C);for(let D=Fl.indexOf(S)-1;D>=$;D--){const w=Fl[D];if(w==="week"&&C!=="week")continue;let x;switch(w){case"year":x={years:k.date.years+f,months:0,weeks:0,days:0};break;case"month":{const T=k.date.months+f;x=Xe(k.date,0,0,T);break}case"week":{const T=k.date.weeks+f;x=Xe(k.date,0,T);break}}const M=Mt(Zn(_,g.isoDate,x,"constrain"),g.time);let I;if(I=b?Ze(b,M,"compatible"):ze(M),qd(m,I)===-f)break;k={date:x,time:pt.ZERO}}return k})(h,l,d.nudgedEpochNs,n,i,r,s,Ar(a,"day"))),l}function zb(e,t,n,i,r,s){return Ui(s)||i&&s==="day"?WC(NC(e)<0?-1:1,e,t,n,i,r,1,s,"trunc").total:Bl(e.time.add24HourDays(e.date.days),s)}function HC(e,t,n,i,r,s,o){if(ac(e,t)==0)return{date:{years:0,months:0,weeks:0,days:0},time:pt.ZERO};Bo(e),Bo(t);const a=jC(e,t,n,i);return s==="nanosecond"&&r===1?a:Zf(a,ze(t),e,null,n,i,r,s,o)}function UC(e,t,n,i,r,s,o,a){if(Er(r)==="time")return ev(e,t,s,o,a);const c=BC(e,t,n,i,r);return o==="nanosecond"&&s===1?c:Zf(c,t,wi(n,e),n,i,r,s,o,a)}function Dc(e,t,n,i,r,s){const o=rc.reduce(((f,p)=>{const m=p[0],g=p[1],b=p[2];return n!=="datetime"&&b!==n||i.includes(g)||f.push(g,m),f}),[]);let a=Nn(t,"largestUnit",n,"auto");if(i.includes(a))throw new RangeError(`largestUnit must be one of ${o.join(", ")}, not ${a}`);const c=Sc(t);let l=Pi(t,"trunc");e==="since"&&(l=(function(f){switch(f){case"ceil":return"floor";case"floor":return"ceil";case"halfCeil":return"halfFloor";case"halfFloor":return"halfCeil";default:return f}})(l));const u=Nn(t,"smallestUnit",n,r);if(i.includes(u))throw new RangeError(`smallestUnit must be one of ${o.join(", ")}, not ${u}`);const h=Ar(s,u);if(a==="auto"&&(a=h),Ar(a,u)!==a)throw new RangeError(`largestUnit ${a} cannot be smaller than smallestUnit ${u}`);const d={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[u];return d!==void 0&&Ec(c,d,!1),{largestUnit:a,roundingIncrement:c,roundingMode:l,smallestUnit:u}}function jb(e,t,n,i){const r=ul(n),s=Dc(e,K(i),"time",[],"nanosecond","second");let o=pi(ev(y(t,it),y(r,it),s.roundingIncrement,s.smallestUnit,s.roundingMode),s.largestUnit);return e==="since"&&(o=Bn(o)),o}function Bb(e,t,n,i){const r=cl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Dc(e,K(i),"date",[],"day","day"),c=je("%Temporal.Duration%"),l=y(t,rt),u=y(r,rt);if(or(l,u)===0)return new c;let h={date:Ju(s,l,u,a.largestUnit),time:pt.ZERO};if(a.smallestUnit!=="day"||a.roundingIncrement!==1){const f=Mt(l,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});h=Zf(h,ze(Mt(u,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),f,null,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode)}let d=pi(h,"day");return e==="since"&&(d=Bn(d)),d}function Wb(e,t,n,i){const r=ll(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Dc(e,K(i),"datetime",[],"nanosecond","day"),c=je("%Temporal.Duration%"),l=y(t,Ut),u=y(r,Ut);if(ac(l,u)===0)return new c;let h=pi(HC(l,u,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode),a.largestUnit);return e==="since"&&(h=Bn(h)),h}function Hb(e,t,n,i){const r=vs(n),s=Dc(e,K(i),"time",[],"nanosecond","hour");let o=tv(y(t,ie),y(r,ie));o=ef(o,s.roundingIncrement,s.smallestUnit,s.roundingMode);let a=pi(Lr({years:0,months:0,weeks:0,days:0},o),s.largestUnit);return e==="since"&&(a=Bn(a)),a}function Ub(e,t,n,i){const r=hl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between months of ${s} and ${o} calendars`);const a=Dc(e,K(i),"date",["week","day"],"month","year"),c=je("%Temporal.Duration%");if(or(y(t,rt),y(r,rt))==0)return new c;const l=_n(s,y(t,rt),"year-month");l.day=1;const u=Ls(s,l,"constrain"),h=_n(s,y(r,rt),"year-month");h.day=1;const d=Ls(s,h,"constrain");let f={date:Xe(Ju(s,u,d,a.largestUnit),0,0),time:pt.ZERO};if(a.smallestUnit!=="month"||a.roundingIncrement!==1){const m=Mt(u,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});f=Zf(f,ze(Mt(d,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),m,null,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode)}let p=pi(f,"day");return e==="since"&&(p=Bn(p)),p}function Yb(e,t,n,i){const r=dl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Dc(e,K(i),"datetime",[],"nanosecond","hour"),c=y(t,it),l=y(r,it),u=je("%Temporal.Duration%");let h;if(Er(a.largestUnit)!=="date")h=pi(ev(c,l,a.roundingIncrement,a.smallestUnit,a.roundingMode),a.largestUnit);else{const d=y(t,Tt);if(!IC(d,y(r,Tt)))throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");if(v.equal(c,l))return new u;h=pi(UC(c,l,d,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode),"hour")}return e==="since"&&(h=Bn(h)),h}function oc({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o){let a=n,c=s;return a+=o.sec,c+=o.subsec,cs(e,t,a,i,r,c)}function yg(e,t){const n=t.addToEpochNs(e);return sr(n),n}function fl(e,t,n,i,r="constrain"){if(Gf(i.date)===0)return yg(e,i.time);const s=wi(t,e);return yg(Ze(t,Mt(Zn(n,s.isoDate,i.date,r),s.time),"compatible"),i.time)}function qb(e,t,n){let i=gi(n);e==="subtract"&&(i=Bn(i));const r=Ar(Sr(t),Sr(i));if(Ui(r))throw new RangeError("For years, months, or weeks arithmetic, use date arithmetic relative to a starting point");const s=Gi(t),o=Gi(i);return pi(Lr({years:0,months:0,weeks:0,days:0},s.time.add(o.time)),r)}function Vb(e,t,n){let i=gi(n);e==="subtract"&&(i=Bn(i));const r=Sr(i);if(Er(r)==="date")throw new RangeError(`Duration field ${r} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);const s=Gi(i);return Ki(yg(y(t,it),s.time))}function Kb(e,t,n,i){const r=y(t,A);let s=gi(n);e==="subtract"&&(s=Bn(s));const o=zC(s),a=St(K(i));return vn(Zn(r,y(t,rt),o,a),r)}function Gb(e,t,n,i){let r=gi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=y(t,A),a=Gi(r),c=y(t,Ut),l=oc(c.time,a.time),u=Xe(a.date,l.deltaDays);return Qf(u.years,u.months,u.weeks,u.days,0,0,0,0,0,0),fi(Mt(Zn(o,c.isoDate,u,s),l),o)}function Xb(e,t,n){let i=gi(n);e==="subtract"&&(i=Bn(i));const r=Gi(i),{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=oc(y(t,ie),r.time);return Mr(Vf(s,o,a,c,l,u,"reject"))}function Qb(e,t,n,i){let r=gi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=tf(r),a=y(t,A),c=_n(a,y(t,rt),"year-month");c.day=1;let l=Ls(a,c,"constrain");if(o<0){const h=Zn(a,l,{months:1},"constrain");l=jn(h.year,h.month,h.day-1)}const u=zC(r);return ra(l),za(gu(a,_n(a,Zn(a,l,u,s),"year-month"),s),a)}function Zb(e,t,n,i){let r=gi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=y(t,Tt),a=y(t,A),c=Ca(r);return Ge(fl(y(t,it),o,a,c,s),o,a)}function ys(e,t,n){const i=Math.trunc(e/t),r=e%t,s=e<0?"negative":"positive",o=Math.abs(i),a=o+1,c=Rn(Math.abs(2*r)-t),l=o%2==0,u=Wf(n,s),h=r===0?o:Hf(o,a,c,l,u);return t*(s==="positive"?h:-h)}function bg(e,t,n,i){const r=sc[n]*t;return(function(s,o,a){const c=Cr(s),l=Cr(o),u=v.divide(c,l),h=v.remainder(c,l),d=Wf(a,"positive");let f,p;v.lessThan(c,Xn)?(f=v.subtract(u,fu),p=u):(f=u,p=v.add(u,fu));const m=qd(ao(v.multiply(h,q0)),l)*(v.lessThan(c,Xn)?-1:1)+0,g=v.equal(h,Xn)?u:Hf(f,p,m,tC(f),d);return v.multiply(g,l)})(e,v.BigInt(r),i)}function _g(e,t,n,i){vg(e);const{year:r,month:s,day:o}=e.isoDate,a=wg(e.time,t,n,i);return Mt(jn(r,s,o+a.deltaDays),a)}function wg({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o,a,c){let l;switch(a){case"day":case"hour":l=1e3*(1e3*(1e3*(60*(60*e+t)+n)+i)+r)+s;break;case"minute":l=1e3*(1e3*(1e3*(60*t+n)+i)+r)+s;break;case"second":l=1e3*(1e3*(1e3*n+i)+r)+s;break;case"millisecond":l=1e3*(1e3*i+r)+s;break;case"microsecond":l=1e3*r+s;break;case"nanosecond":l=s}const u=sc[a],h=ys(l,u*o,c)/u;switch(a){case"day":return{deltaDays:h,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0};case"hour":return cs(h,0,0,0,0,0);case"minute":return cs(e,h,0,0,0,0);case"second":return cs(e,t,h,0,0,0);case"millisecond":return cs(e,t,n,h,0,0);case"microsecond":return cs(e,t,n,i,h,0);case"nanosecond":return cs(e,t,n,i,r,h);default:throw new Error(`Invalid unit ${a}`)}}function ef(e,t,n,i){const r=sc[n];return e.round(v.BigInt(r*t),i)}function Bl(e,t){const n=sc[t];return e.fdiv(v.BigInt(n))}function or(e,t){return e.year!==t.year?Rn(e.year-t.year):e.month!==t.month?Rn(e.month-t.month):e.day!==t.day?Rn(e.day-t.day):0}function xg(e,t){return e.hour!==t.hour?Rn(e.hour-t.hour):e.minute!==t.minute?Rn(e.minute-t.minute):e.second!==t.second?Rn(e.second-t.second):e.millisecond!==t.millisecond?Rn(e.millisecond-t.millisecond):e.microsecond!==t.microsecond?Rn(e.microsecond-t.microsecond):e.nanosecond!==t.nanosecond?Rn(e.nanosecond-t.nanosecond):0}function ac(e,t){const n=or(e.isoDate,t.isoDate);return n!==0?n:xg(e.time,t.time)}function YC(e){const t=nf(e);return globalThis.BigInt!==void 0?globalThis.BigInt(t.toString(10)):t}function xi(e,t){const n=Cr(e),{quotient:i,remainder:r}=ol(n,Yu);let s=v.toNumber(i);return t==="floor"&&v.toNumber(r)<0&&(s-=1),t==="ceil"&&v.toNumber(r)>0&&(s+=1),s}function Xi(e){if(!Number.isInteger(e))throw new RangeError("epoch milliseconds must be an integer");return v.multiply(v.BigInt(e),Yu)}function nf(e){let t=e;if(typeof e=="object"){const n=e[Symbol.toPrimitive];n&&typeof n=="function"&&(t=n.call(e,"number"))}if(typeof t=="number")throw new TypeError("cannot convert number to bigint");return typeof t=="bigint"?v.BigInt(t.toString(10)):v.BigInt(t)}const Cg=(()=>{let e=v.BigInt(Date.now()%1e6);return()=>{const t=Date.now(),n=v.BigInt(t),i=v.add(Xi(t),e);return e=v.remainder(n,Yu),v.greaterThan(i,ic)?ic:v.lessThan(i,pu)?pu:i}})();function Uc(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}function Rn(e){return e<0?-1:e>0?1:e}function K(e){if(e===void 0)return Object.create(null);if(re(e)&&e!==null)return e;throw new TypeError("Options parameter must be an object, not "+(e===null?"null":typeof e))}function Ho(e,t){const n=Object.create(null);return n[e]=t,n}function Nr(e,t,n,i){let r=e[t];if(r!==void 0){if(r=Yf(r),!n.includes(r))throw new RangeError(`${t} must be one of ${n.join(", ")}, not ${r}`);return r}if(i===Yr)throw new RangeError(`${t} option is required`);return i}function Cn(e){const t=_u(e);if(!BL.includes(_u(t)))throw new RangeError(`invalid calendar identifier ${t}`);switch(t){case"ethiopic-amete-alem":return"ethioaa";case"islamicc":return"islamic-civil"}return t}function _u(e){let t="";for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);t+=i>=65&&i<=90?String.fromCharCode(i+32):String.fromCharCode(i)}return t}function qs(e){throw new TypeError(`Do not use built-in arithmetic operators with Temporal objects. When comparing, use ${e==="PlainMonthDay"?"Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))":`Temporal.${e}.compare(obj1, obj2)`}, not obj1 > obj2. When coercing to strings, use \`\${obj}\` or String(obj), not '' + obj. When coercing to numbers, use properties or methods of the object, not \`+obj\`. When concatenating with strings, use \`\${str}\${obj}\` or str.concat(obj), not str + obj. In React, coerce to a string before rendering a Temporal object.`)}const KL=new RegExp(`^${pC.source}$`),GL=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/.source}$`);function qC(e,t,n,i=e(t),r=e(n)){let s=t,o=n,a=i,c=r;for(;o-s>1;){let l=Math.trunc((s+o)/2);const u=e(l);u===a?(s=l,a=u):u===c&&(o=l,c=u)}return o}function VC(e){return[...e]}function KC(e,t){if(e!=="gregory"&&e!=="iso8601")return;const n=ih[e];let i=t.year;const{dayOfWeek:r,dayOfYear:s,daysInYear:o}=n.isoToDate(t,{dayOfWeek:!0,dayOfYear:!0,daysInYear:!0}),a=n.getFirstDayOfWeek(),c=n.getMinimalDaysInFirstWeek();let l=(r+7-a)%7,u=(r-s+7001-a)%7,h=Math.floor((s-1+u)/7);if(7-u>=c&&++h,h==0)h=(function(d,f,p,m){let g=(m-d-p+1)%7;g<0&&(g+=7);let b=Math.floor((p+g-1)/7);return 7-g>=f&&++b,b})(a,c,s+n.isoToDate(n.dateAdd(t,{years:-1},"constrain"),{daysInYear:!0}).daysInYear,r),i--;else if(s>=o-5){let d=(l+o-s)%7;d<0&&(d+=7),6-d>=c&&s+7-l>o&&(h=1,i++)}return{week:h,year:i}}function Jb(e,t,n,i,r){if(t!==r.year){if(e*(t-r.year)>0)return!0}else if(n!==r.month){if(e*(n-r.month)>0)return!0}else if(i!==r.day&&e*(i-r.day)>0)return!0;return!1}const ih={};function Uo(e){if(!e.startsWith("M"))throw new RangeError(`Invalid month code: ${e}.  Month codes must start with M.`);const t=+e.slice(1);if(Number.isNaN(t))throw new RangeError(`Invalid month code: ${e}`);return t}function Zi(e,t=!1){return`M${`${e}`.padStart(2,"0")}${t?"L":""}`}function nv(e,t=void 0,n=12){let{month:i,monthCode:r}=e;if(r===void 0){if(i===void 0)throw new TypeError("Either month or monthCode are required");t==="reject"&&Te(i,1,n),t==="constrain"&&(i=gn(i,1,n)),r=Zi(i)}else{const s=Uo(r);if(r!==Zi(s))throw new RangeError(`Invalid month code: ${r}`);if(i!==void 0&&i!==s)throw new RangeError(`monthCode ${r} and month ${i} must match if both are present`);if(i=s,i<1||i>n)throw new RangeError(`Invalid monthCode: ${r}`)}return{...e,month:i,monthCode:r}}ih.iso8601={resolveFields(e,t){if((t==="date"||t==="year-month")&&e.year===void 0)throw new TypeError("year is required");if((t==="date"||t==="month-day")&&e.day===void 0)throw new TypeError("day is required");Object.assign(e,nv(e))},dateToISO:(e,t)=>zl(e.year,e.month,e.day,t),monthDayToISOReferenceDate(e,t){const{month:n,day:i}=zl(e.year??1972,e.month,e.day,t);return{month:n,day:i,year:1972}},extraFields:()=>[],fieldKeysToIgnore(e){const t=new Set;for(let n=0;n<e.length;n++){const i=e[n];t.add(i),i==="month"?t.add("monthCode"):i==="monthCode"&&t.add("month")}return VC(t)},dateAdd(e,{years:t=0,months:n=0,weeks:i=0,days:r=0},s){let{year:o,month:a,day:c}=e;return o+=t,a+=n,{year:o,month:a}=bo(o,a),{year:o,month:a,day:c}=zl(o,a,c,s),c+=r+7*i,jn(o,a,c)},dateUntil(e,t,n){const i=-or(e,t);if(i===0)return{years:0,months:0,weeks:0,days:0};let r,s=0,o=0;if(n==="year"||n==="month"){let u=t.year-e.year;for(u!==0&&(u-=i);!Jb(i,e.year+u,e.month,e.day,t);)s=u,u+=i;let h=i;for(r=bo(e.year+s,e.month+h);!Jb(i,r.year,r.month,e.day,t);)o=h,h+=i,r=bo(r.year,r.month+i);n==="month"&&(o+=12*s,s=0)}r=bo(e.year+s,e.month+o);const a=FC(r.year,r.month,e.day);let c=0,l=Wo(t.year,t.month-1,t.day)-Wo(a.year,a.month-1,a.day);return n==="week"&&(c=Math.trunc(l/7),l%=7),{years:s,months:o,weeks:c,days:l}},isoToDate({year:e,month:t,day:n},i){const r={era:void 0,eraYear:void 0,year:e,month:t,day:n,daysInWeek:7,monthsInYear:12};if(i.monthCode&&(r.monthCode=Zi(t)),i.dayOfWeek){const s=t+(t<3?10:-2),o=e-(t<3?1:0),a=Math.floor(o/100),c=o-100*a,l=(n+Math.floor(2.6*s-.2)+(c+Math.floor(c/4))+(Math.floor(a/4)-2*a))%7;r.dayOfWeek=l+(l<=0?7:0)}if(i.dayOfYear){let s=n;for(let o=t-1;o>0;o--)s+=Eo(e,o);r.dayOfYear=s}return i.weekOfYear&&(r.weekOfYear=KC("iso8601",{year:e,month:t,day:n})),i.daysInMonth&&(r.daysInMonth=Eo(e,t)),(i.daysInYear||i.inLeapYear)&&(r.inLeapYear=Jd(e),r.daysInYear=r.inLeapYear?366:365),r},getFirstDayOfWeek:()=>1,getMinimalDaysInFirstWeek:()=>4};class $e{constructor(t){if(this.map=new Map,this.calls=0,this.hits=0,this.misses=0,t!==void 0){let n=0;for(const i of t.map.entries()){if(++n>$e.MAX_CACHE_ENTRIES)break;this.map.set(...i)}}}get(t){const n=this.map.get(t);return n&&(this.hits++,this.report()),this.calls++,n}set(t,n){this.map.set(t,n),this.misses++,this.report()}report(){}setObject(t){if($e.objectMap.get(t))throw new RangeError("object already cached");$e.objectMap.set(t,this),this.report()}static getCacheForObject(t){let n=$e.objectMap.get(t);return n||(n=new $e,$e.objectMap.set(t,n)),n}}function GC({isoYear:e,isoMonth:t,isoDay:n}){return`${nh(e)}-${Jn(t)}-${Jn(n)}T00:00Z`}function Xp(e,t){return{years:e.year-t.year,months:e.month-t.month,days:e.day-t.day}}$e.objectMap=new WeakMap,$e.MAX_CACHE_ENTRIES=1e3;class sa{constructor(){this.eras=[],this.hasEra=!1,this.erasBeginMidYear=!1}getFormatter(){return this.formatter===void 0&&(this.formatter=new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`,{day:"numeric",month:"numeric",year:"numeric",era:"short",timeZone:"UTC"})),this.formatter}getCalendarParts(t){let n=this.getFormatter(),i=new Date(t);if(t==="-271821-04-19T00:00Z"){const r=n.resolvedOptions();n=new Intl.DateTimeFormat(r.locale,{...r,timeZone:"Etc/GMT+1"}),i=new Date("-271821-04-20T00:00Z")}try{return n.formatToParts(i)}catch{throw new RangeError(`Invalid ISO date: ${t}`)}}isoToCalendarDate(t,n){const{year:i,month:r,day:s}=t,o=JSON.stringify({func:"isoToCalendarDate",isoYear:i,isoMonth:r,isoDay:s,id:this.id}),a=n.get(o);if(a)return a;const c=GC({isoYear:i,isoMonth:r,isoDay:s}),l=this.getCalendarParts(c),u={};for(let d=0;d<l.length;d++){const{type:f,value:p}=l[d];if(f!=="year"&&f!=="relatedYear"||(this.hasEra?u.eraYear=+p:u.year=+p),f==="month"){const m=/^([0-9]*)(.*?)$/.exec(p);if(!m||m.length!=3||!m[1]&&!m[2])throw new RangeError(`Unexpected month: ${p}`);if(u.month=m[1]?+m[1]:1,u.month<1)throw new RangeError(`Invalid month ${p} from ${c}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);if(u.month>13)throw new RangeError(`Invalid month ${p} from ${c}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);m[2]&&(u.monthExtra=m[2])}f==="day"&&(u.day=+p),this.hasEra&&f==="era"&&p!=null&&p!==""&&(u.era=p.split(" (")[0].normalize("NFD").replace(/[^-0-9 \p{L}]/gu,"").replace(/ /g,"-").toLowerCase())}if(this.hasEra&&u.eraYear===void 0)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);if(this.hasEra){const d=this.eras.find((f=>u.era===f.genericName));d&&(u.era=d.code)}if(this.reviseIntlEra){const{era:d,eraYear:f}=this.reviseIntlEra(u,t);u.era=d,u.eraYear=f}this.checkIcuBugs&&this.checkIcuBugs(t);const h=this.adjustCalendarDate(u,n,"constrain",!0);if(h.year===void 0)throw new RangeError(`Missing year converting ${JSON.stringify(t)}`);if(h.month===void 0)throw new RangeError(`Missing month converting ${JSON.stringify(t)}`);if(h.day===void 0)throw new RangeError(`Missing day converting ${JSON.stringify(t)}`);return n.set(o,h),["constrain","reject"].forEach((d=>{const f=JSON.stringify({func:"calendarToIsoDate",year:h.year,month:h.month,day:h.day,overflow:d,id:this.id});n.set(f,t)})),h}validateCalendarDate(t){const{month:n,year:i,day:r,eraYear:s,monthCode:o,monthExtra:a}=t;if(a!==void 0)throw new RangeError("Unexpected `monthExtra` value");if(i===void 0&&s===void 0)throw new TypeError("year or eraYear is required");if(n===void 0&&o===void 0)throw new TypeError("month or monthCode is required");if(r===void 0)throw new RangeError("Missing day");if(o!==void 0){if(typeof o!="string")throw new RangeError("monthCode must be a string, not "+typeof o);if(!/^M([01]?\d)(L?)$/.test(o))throw new RangeError(`Invalid monthCode: ${o}`)}if(this.hasEra&&t.era===void 0!=(t.eraYear===void 0))throw new TypeError("properties era and eraYear must be provided together")}adjustCalendarDate(t,n=void 0,i="constrain",r=!1){if(this.calendarType==="lunisolar")throw new RangeError("Override required for lunisolar calendars");let s=t;this.validateCalendarDate(s);const o=this.monthsInYear(s,n);let{month:a,monthCode:c}=s;return{month:a,monthCode:c}=nv(s,i,o),{...s,month:a,monthCode:c}}regulateMonthDayNaive(t,n,i){const r=this.monthsInYear(t,i);let{month:s,day:o}=t;return n==="reject"?(Te(s,1,r),Te(o,1,this.maximumMonthLength(t))):(s=gn(s,1,r),o=gn(o,1,this.maximumMonthLength({...t,month:s}))),{...t,month:s,day:o}}calendarToIsoDate(t,n="constrain",i){const r=t;let s=this.adjustCalendarDate(t,i,n,!1);s=this.regulateMonthDayNaive(s,n,i);const{year:o,month:a,day:c}=s,l=JSON.stringify({func:"calendarToIsoDate",year:o,month:a,day:c,overflow:n,id:this.id});let u,h=i.get(l);if(h||r.year!==void 0&&r.month!==void 0&&r.day!==void 0&&(r.year!==s.year||r.month!==s.month||r.day!==s.day)&&(u=JSON.stringify({func:"calendarToIsoDate",year:r.year,month:r.month,day:r.day,overflow:n,id:this.id}),h=i.get(u),h))return h;let d=this.estimateIsoDate({year:o,month:a,day:c});const f=_=>{let C=this.addDaysIso(d,_);if(s.day>this.minimumMonthLength(s)){let S=this.isoToCalendarDate(C,i);for(;S.month!==a||S.year!==o;){if(n==="reject")throw new RangeError(`day ${c} does not exist in month ${a} of year ${o}`);C=this.addDaysIso(C,-1),S=this.isoToCalendarDate(C,i)}}return C};let p=0,m=this.isoToCalendarDate(d,i),g=Xp(s,m);if(g.years!==0||g.months!==0||g.days!==0){const _=365*g.years+30*g.months+g.days;d=this.addDaysIso(d,_),m=this.isoToCalendarDate(d,i),g=Xp(s,m),g.years===0&&g.months===0?d=f(g.days):p=this.compareCalendarDates(s,m)}let b=8;for(;p;){d=this.addDaysIso(d,p*b);const _=m;m=this.isoToCalendarDate(d,i);const C=p;if(p=this.compareCalendarDates(s,m),p){if(g=Xp(s,m),g.years===0&&g.months===0)d=f(g.days),p=0;else if(C&&p!==C)if(b>1)b/=2;else{if(n==="reject")throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({...r})}`);this.compareCalendarDates(m,_)>0&&(d=this.addDaysIso(d,-1)),p=0}}}if(i.set(l,d),u&&i.set(u,d),s.year===void 0||s.month===void 0||s.day===void 0||s.monthCode===void 0||this.hasEra&&(s.era===void 0||s.eraYear===void 0))throw new RangeError("Unexpected missing property");return d}compareCalendarDates(t,n){return t.year!==n.year?Rn(t.year-n.year):t.month!==n.month?Rn(t.month-n.month):t.day!==n.day?Rn(t.day-n.day):0}regulateDate(t,n="constrain",i){const r=this.calendarToIsoDate(t,n,i);return this.isoToCalendarDate(r,i)}addDaysIso(t,n){return jn(t.year,t.month,t.day+n)}addDaysCalendar(t,n,i){const r=this.calendarToIsoDate(t,"constrain",i),s=this.addDaysIso(r,n);return this.isoToCalendarDate(s,i)}addMonthsCalendar(t,n,i,r){let s=t;const{day:o}=s;for(let a=0,c=Math.abs(n);a<c;a++){const{month:l}=s,u=s,h=n<0?-Math.max(o,this.daysInPreviousMonth(s,r)):this.daysInMonth(s,r),d=this.calendarToIsoDate(s,"constrain",r);let f=this.addDaysIso(d,h);if(s=this.isoToCalendarDate(f,r),n>0){const p=this.monthsInYear(u,r);for(;s.month-1!=l%p;)f=this.addDaysIso(f,-1),s=this.isoToCalendarDate(f,r)}s.day!==o&&(s=this.regulateDate({...s,day:o},"constrain",r))}if(i==="reject"&&s.day!==o)throw new RangeError(`Day ${o} does not exist in resulting calendar month`);return s}addCalendar(t,{years:n=0,months:i=0,weeks:r=0,days:s=0},o,a){const{year:c,day:l,monthCode:u}=t,h=this.adjustCalendarDate({year:c+n,monthCode:u,day:l},a),d=this.addMonthsCalendar(h,i,o,a),f=s+7*r;return this.addDaysCalendar(d,f,a)}untilCalendar(t,n,i,r){let s=0,o=0,a=0,c=0;switch(i){case"day":s=this.calendarDaysUntil(t,n,r);break;case"week":{const l=this.calendarDaysUntil(t,n,r);s=l%7,o=(l-s)/7;break}case"month":case"year":{const l=this.compareCalendarDates(n,t);if(!l)return{years:0,months:0,weeks:0,days:0};const u=n.year-t.year,h=n.day-t.day;if(i==="year"&&u){let p=0;n.monthCode>t.monthCode&&(p=1),n.monthCode<t.monthCode&&(p=-1),p||(p=Math.sign(h)),c=p*l<0?u-l:u}let d,f=c?this.addCalendar(t,{years:c},"constrain",r):t;do a+=l,d=f,f=this.addMonthsCalendar(d,l,"constrain",r),f.day!==t.day&&(f=this.regulateDate({...f,day:t.day},"constrain",r));while(this.compareCalendarDates(n,f)*l>=0);a-=l,s=this.calendarDaysUntil(d,n,r);break}}return{years:c,months:a,weeks:o,days:s}}daysInMonth(t,n){const{day:i}=t,r=this.maximumMonthLength(t),s=this.minimumMonthLength(t);if(s===r)return s;const o=i<=r-s?r:s,a=this.calendarToIsoDate(t,"constrain",n),c=this.addDaysIso(a,o),l=this.isoToCalendarDate(c,n),u=this.addDaysIso(c,-l.day);return this.isoToCalendarDate(u,n).day}daysInPreviousMonth(t,n){const{day:i,month:r,year:s}=t;let o={year:r>1?s:s-1,month:r,day:1};const a=r>1?r-1:this.monthsInYear(o,n);o={...o,month:a};const c=this.minimumMonthLength(o),l=this.maximumMonthLength(o);if(c===l)return l;const u=this.calendarToIsoDate(t,"constrain",n),h=this.addDaysIso(u,-i);return this.isoToCalendarDate(h,n).day}startOfCalendarYear(t){return{year:t.year,month:1,monthCode:"M01",day:1}}startOfCalendarMonth(t){return{year:t.year,month:t.month,day:1}}calendarDaysUntil(t,n,i){const r=this.calendarToIsoDate(t,"constrain",i),s=this.calendarToIsoDate(n,"constrain",i);return Wo(s.year,s.month-1,s.day)-Wo(r.year,r.month-1,r.day)}monthDaySearchStartYear(t,n){return 1972}monthDayFromFields(t,n,i){let r,s,o,a,c,{era:l,eraYear:u,year:h,month:d,monthCode:f,day:p}=t;if(d!==void 0&&h===void 0&&(!this.hasEra||l===void 0||u===void 0))throw new TypeError("when month is present, year (or era and eraYear) are required");(f===void 0||h!==void 0||this.hasEra&&u!==void 0)&&({monthCode:f,day:p}=this.isoToCalendarDate(this.calendarToIsoDate(t,n,i),i));const m={year:this.monthDaySearchStartYear(f,p),month:12,day:31},g=this.isoToCalendarDate(m,i),b=g.monthCode>f||g.monthCode===f&&g.day>=p?g.year:g.year-1;for(let _=0;_<20;_++){const C=this.adjustCalendarDate({day:p,monthCode:f,year:b-_},i),S=this.calendarToIsoDate(C,"constrain",i),k=this.isoToCalendarDate(S,i);if({year:r,month:s,day:o}=S,k.monthCode===f&&k.day===p)return{month:s,day:o,year:r};if(n==="constrain"){const $=this.maxLengthOfMonthCodeInAnyYear(k.monthCode);if(k.monthCode===f&&k.day===$&&p>$)return{month:s,day:o,year:r};(a===void 0||k.monthCode===a.monthCode&&k.day>a.day)&&(a=k,c=S)}}if(n==="constrain"&&c!==void 0)return c;throw new RangeError(`No recent ${this.id} year with monthCode ${f} and day ${p}`)}getFirstDayOfWeek(){}getMinimalDaysInFirstWeek(){}}class XL extends sa{constructor(){super(...arguments),this.id="hebrew",this.calendarType="lunisolar",this.months={Tishri:{leap:1,regular:1,monthCode:"M01",days:30},Heshvan:{leap:2,regular:2,monthCode:"M02",days:{min:29,max:30}},Kislev:{leap:3,regular:3,monthCode:"M03",days:{min:29,max:30}},Tevet:{leap:4,regular:4,monthCode:"M04",days:29},Shevat:{leap:5,regular:5,monthCode:"M05",days:30},Adar:{leap:void 0,regular:6,monthCode:"M06",days:29},"Adar I":{leap:6,regular:void 0,monthCode:"M05L",days:30},"Adar II":{leap:7,regular:void 0,monthCode:"M06",days:29},Nisan:{leap:8,regular:7,monthCode:"M07",days:30},Iyar:{leap:9,regular:8,monthCode:"M08",days:29},Sivan:{leap:10,regular:9,monthCode:"M09",days:30},Tamuz:{leap:11,regular:10,monthCode:"M10",days:29},Av:{leap:12,regular:11,monthCode:"M11",days:30},Elul:{leap:13,regular:12,monthCode:"M12",days:29}}}inLeapYear(t){const{year:n}=t;return(7*n+1)%19<7}monthsInYear(t){return this.inLeapYear(t)?13:12}minimumMonthLength(t){return this.minMaxMonthLength(t,"min")}maximumMonthLength(t){return this.minMaxMonthLength(t,"max")}minMaxMonthLength(t,n){const{month:i,year:r}=t,s=this.getMonthCode(r,i),o=Object.entries(this.months).find((c=>c[1].monthCode===s));if(o===void 0)throw new RangeError(`unmatched Hebrew month: ${i}`);const a=o[1].days;return typeof a=="number"?a:a[n]}maxLengthOfMonthCodeInAnyYear(t){return["M04","M06","M08","M10","M12"].includes(t)?29:30}estimateIsoDate(t){const{year:n}=t;return{year:n-3760,month:1,day:1}}getMonthCode(t,n){return this.inLeapYear({year:t})?n===6?Zi(5,!0):Zi(n<6?n:n-1):Zi(n)}adjustCalendarDate(t,n,i="constrain",r=!1){let{year:s,month:o,monthCode:a,day:c,monthExtra:l}=t;if(s===void 0)throw new TypeError("Missing property: year");if(r){if(l){const u=this.months[l];if(!u)throw new RangeError(`Unrecognized month from formatToParts: ${l}`);o=this.inLeapYear({year:s})?u.leap:u.regular}return a=this.getMonthCode(s,o),{year:s,month:o,day:c,monthCode:a}}if(this.validateCalendarDate(t),o===void 0)if(a.endsWith("L")){if(a!=="M05L")throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${a}`);if(o=6,!this.inLeapYear({year:s})){if(i==="reject")throw new RangeError(`Hebrew monthCode M05L is invalid in year ${s} which is not a leap year`);o=6,a="M06"}}else{o=Uo(a),this.inLeapYear({year:s})&&o>=6&&o++;const u=this.monthsInYear({year:s});if(o<1||o>u)throw new RangeError(`Invalid monthCode: ${a}`)}else if(i==="reject"?(Te(o,1,this.monthsInYear({year:s})),Te(c,1,this.maximumMonthLength({year:s,month:o}))):(o=gn(o,1,this.monthsInYear({year:s})),c=gn(c,1,this.maximumMonthLength({year:s,month:o}))),a===void 0)a=this.getMonthCode(s,o);else if(this.getMonthCode(s,o)!==a)throw new RangeError(`monthCode ${a} doesn't correspond to month ${o} in Hebrew year ${s}`);return{...t,day:c,month:o,monthCode:a,year:s}}}class $c extends sa{constructor(){super(...arguments),this.calendarType="lunar",this.DAYS_PER_ISLAMIC_YEAR=354+11/30,this.DAYS_PER_ISO_YEAR=365.2425}inLeapYear(t,n){const i={year:t.year,month:1,monthCode:"M01",day:1},r={year:t.year+1,month:1,monthCode:"M01",day:1};return this.calendarDaysUntil(i,r,n)===355}monthsInYear(){return 12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(){return 30}estimateIsoDate(t){const{year:n}=this.adjustCalendarDate(t);return{year:Math.floor(n*this.DAYS_PER_ISLAMIC_YEAR/this.DAYS_PER_ISO_YEAR)+622,month:1,day:1}}}class QL extends $c{constructor(){super(...arguments),this.id="islamic"}}class ZL extends $c{constructor(){super(...arguments),this.id="islamic-umalqura"}}class JL extends $c{constructor(){super(...arguments),this.id="islamic-tbla"}}class t5 extends $c{constructor(){super(...arguments),this.id="islamic-civil"}}class e5 extends $c{constructor(){super(...arguments),this.id="islamic-rgsa"}}class n5 extends $c{constructor(){super(...arguments),this.id="islamicc"}}class i5 extends sa{constructor(){super(...arguments),this.id="persian",this.calendarType="solar"}inLeapYear(t,n){return this.daysInMonth({year:t.year,month:12,day:1},n)===30}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===12?29:n<=6?31:30}maximumMonthLength(t){const{month:n}=t;return n===12?30:n<=6?31:30}maxLengthOfMonthCodeInAnyYear(t){return Uo(t)<=6?31:30}estimateIsoDate(t){const{year:n}=this.adjustCalendarDate(t);return{year:n+621,month:1,day:1}}}class r5 extends sa{constructor(){super(...arguments),this.id="indian",this.calendarType="solar",this.months={1:{length:30,month:3,day:22,leap:{length:31,month:3,day:21}},2:{length:31,month:4,day:21},3:{length:31,month:5,day:22},4:{length:31,month:6,day:22},5:{length:31,month:7,day:23},6:{length:31,month:8,day:23},7:{length:30,month:9,day:23},8:{length:30,month:10,day:23},9:{length:30,month:11,day:22},10:{length:30,month:12,day:22},11:{length:30,month:1,nextYear:!0,day:21},12:{length:30,month:2,nextYear:!0,day:20}},this.vulnerableToBceBug=new Date("0000-01-01T00:00Z").toLocaleDateString("en-US-u-ca-indian",{timeZone:"UTC"})!=="10/11/-79 Saka"}inLeapYear(t){return iv(t.year+78)}monthsInYear(){return 12}minimumMonthLength(t){return this.getMonthInfo(t).length}maximumMonthLength(t){return this.getMonthInfo(t).length}maxLengthOfMonthCodeInAnyYear(t){const n=Uo(t);let i=this.months[n];return i=i.leap??i,i.length}getMonthInfo(t){const{month:n}=t;let i=this.months[n];if(i===void 0)throw new RangeError(`Invalid month: ${n}`);return this.inLeapYear(t)&&i.leap&&(i=i.leap),i}estimateIsoDate(t){const n=this.adjustCalendarDate(t),i=this.getMonthInfo(n);return jn(n.year+78+(i.nextYear?1:0),i.month,i.day+n.day-1)}checkIcuBugs(t){if(this.vulnerableToBceBug&&t.year<1)throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`)}}function iv(e){return e%4==0&&(e%100!=0||e%400==0)}class XC extends sa{constructor(t,n){super(),this.calendarType="solar",this.id=t,this.isoEpoch=n}inLeapYear(t){const{year:n}=this.estimateIsoDate({month:1,day:1,year:t.year});return iv(n)}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===2?this.inLeapYear(t)?29:28:[4,6,9,11].indexOf(n)>=0?30:31}maximumMonthLength(t){return this.minimumMonthLength(t)}maxLengthOfMonthCodeInAnyYear(t){return[31,29,31,30,31,30,31,31,30,31,30,31][Uo(t)-1]}estimateIsoDate(t){const n=this.adjustCalendarDate(t);return zl(n.year+this.isoEpoch.year,n.month+this.isoEpoch.month,n.day+this.isoEpoch.day,"constrain")}}class QC extends sa{constructor(t,n){super(),this.hasEra=!0,this.calendarType="solar",this.id=t;const{eras:i,anchorEra:r}=(function(s){let o,a=s;if(a.length===0)throw new RangeError("Invalid era data: eras are required");if(a.length===1&&a[0].reverseOf)throw new RangeError("Invalid era data: anchor era cannot count years backwards");if(a.length===1&&!a[0].code)throw new RangeError("Invalid era data: at least one named era is required");if(a.filter((l=>l.reverseOf!=null)).length>1)throw new RangeError("Invalid era data: only one era can count years backwards");a.forEach((l=>{if(l.isAnchor||!l.anchorEpoch&&!l.reverseOf){if(o)throw new RangeError("Invalid era data: cannot have multiple anchor eras");o=l,l.anchorEpoch={year:l.hasYearZero?0:1}}else if(!l.code)throw new RangeError("If era name is blank, it must be the anchor era")})),a=a.filter((l=>l.code)),a.forEach((l=>{const{reverseOf:u}=l;if(u){const h=a.find((d=>d.code===u));if(h===void 0)throw new RangeError(`Invalid era data: unmatched reverseOf era: ${u}`);l.reverseOf=h,l.anchorEpoch=h.anchorEpoch,l.isoEpoch=h.isoEpoch}l.anchorEpoch.month===void 0&&(l.anchorEpoch.month=1),l.anchorEpoch.day===void 0&&(l.anchorEpoch.day=1)})),a.sort(((l,u)=>{if(l.reverseOf)return 1;if(u.reverseOf)return-1;if(!l.isoEpoch||!u.isoEpoch)throw new RangeError("Invalid era data: missing ISO epoch");return u.isoEpoch.year-l.isoEpoch.year}));const c=a[a.length-1].reverseOf;if(c&&c!==a[a.length-2])throw new RangeError("Invalid era data: invalid reverse-sign era");return a.forEach(((l,u)=>{l.genericName="era"+(a.length-1-u)})),{eras:a,anchorEra:o||a[0]}})(n);this.anchorEra=r,this.eras=i}inLeapYear(t){const{year:n}=this.estimateIsoDate({month:1,day:1,year:t.year});return iv(n)}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===2?this.inLeapYear(t)?29:28:[4,6,9,11].indexOf(n)>=0?30:31}maximumMonthLength(t){return this.minimumMonthLength(t)}maxLengthOfMonthCodeInAnyYear(t){return[31,29,31,30,31,30,31,31,30,31,30,31][Uo(t)-1]}completeEraYear(t){const n=(a,c,l)=>{const u=t[a];if(u!=null&&u!=c&&!(l||[]).includes(u)){const h=l?.[0];throw new RangeError(`Input ${a} ${u} doesn't match calculated value ${h?`${c} (also called ${h})`:c}`)}},i=a=>{let c;const l={...t,year:a},u=this.eras.find(((h,d)=>{if(d===this.eras.length-1){if(h.reverseOf){if(a>0)throw new RangeError(`Signed year ${a} is invalid for era ${h.code}`);return c=h.anchorEpoch.year-a,!0}return c=a-h.anchorEpoch.year+(h.hasYearZero?0:1),!0}return this.compareCalendarDates(l,h.anchorEpoch)>=0&&(c=a-h.anchorEpoch.year+(h.hasYearZero?0:1),!0)}));if(!u)throw new RangeError(`Year ${a} was not matched by any era`);return{eraYear:c,era:u.code,eraNames:u.names}};let{year:r,eraYear:s,era:o}=t;if(r!=null){const a=i(r);({eraYear:s,era:o}=a),n("era",o,a?.eraNames),n("eraYear",s)}else{if(s==null)throw new RangeError("Either year or eraYear and era are required");{if(o===void 0)throw new RangeError("era and eraYear must be provided together");const a=this.eras.find((({code:c,names:l=[]})=>c===o||l.includes(o)));if(!a)throw new RangeError(`Era ${o} (ISO year ${s}) was not matched by any era`);r=a.reverseOf?a.anchorEpoch.year-s:s+a.anchorEpoch.year-(a.hasYearZero?0:1),n("year",r),{eraYear:s,era:o}=i(r)}}return{...t,year:r,eraYear:s,era:o}}adjustCalendarDate(t,n,i="constrain"){let r=t;const{month:s,monthCode:o}=r;return s===void 0&&(r={...r,month:Uo(o)}),this.validateCalendarDate(r),r=this.completeEraYear(r),super.adjustCalendarDate(r,n,i)}estimateIsoDate(t){const n=this.adjustCalendarDate(t),{year:i,month:r,day:s}=n,{anchorEra:o}=this;return zl(i+o.isoEpoch.year-(o.hasYearZero?0:1),r,s,"constrain")}}class rv extends QC{constructor(t,n){super(t,n)}isoToCalendarDate(t){const{year:n,month:i,day:r}=t,s=Zi(i),o=n-this.anchorEra.isoEpoch.year+1;return this.completeEraYear({year:o,month:i,monthCode:s,day:r})}}const qi={inLeapYear(e){const{year:t}=e;return(t+1)%4==0},monthsInYear:()=>13,minimumMonthLength(e){const{month:t}=e;return t===13?this.inLeapYear(e)?6:5:30},maximumMonthLength(e){return this.minimumMonthLength(e)},maxLengthOfMonthCodeInAnyYear:e=>e==="M13"?6:30};class s5 extends XC{constructor(t,n){super(t,n),this.inLeapYear=qi.inLeapYear,this.monthsInYear=qi.monthsInYear,this.minimumMonthLength=qi.minimumMonthLength,this.maximumMonthLength=qi.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=qi.maxLengthOfMonthCodeInAnyYear}}class ZC extends QC{constructor(t,n){super(t,n),this.inLeapYear=qi.inLeapYear,this.monthsInYear=qi.monthsInYear,this.minimumMonthLength=qi.minimumMonthLength,this.maximumMonthLength=qi.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=qi.maxLengthOfMonthCodeInAnyYear}}class o5 extends s5{constructor(){super("ethioaa",{year:-5492,month:7,day:17})}}class a5 extends ZC{constructor(){super("coptic",[{code:"coptic",isoEpoch:{year:284,month:8,day:29}},{code:"coptic-inverse",reverseOf:"coptic"}])}}class c5 extends ZC{constructor(){super("ethiopic",[{code:"ethioaa",names:["ethiopic-amete-alem","mundi"],isoEpoch:{year:-5492,month:7,day:17}},{code:"ethiopic",names:["incar"],isoEpoch:{year:8,month:8,day:27},anchorEpoch:{year:5501}}])}}class l5 extends rv{constructor(){super("roc",[{code:"roc",names:["minguo"],isoEpoch:{year:1912,month:1,day:1}},{code:"roc-inverse",names:["before-roc"],reverseOf:"roc"}])}}class u5 extends XC{constructor(){super("buddhist",{year:-543,month:1,day:1})}}class h5 extends rv{constructor(){super("gregory",[{code:"gregory",names:["ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"gregory-inverse",names:["be","bce"],reverseOf:"gregory"}])}reviseIntlEra(t){let{era:n,eraYear:i}=t;return n==="b"&&(n="gregory-inverse"),n==="a"&&(n="gregory"),{era:n,eraYear:i}}getFirstDayOfWeek(){return 1}getMinimalDaysInFirstWeek(){return 1}}class d5 extends rv{constructor(){super("japanese",[{code:"reiwa",isoEpoch:{year:2019,month:5,day:1},anchorEpoch:{year:2019,month:5,day:1}},{code:"heisei",isoEpoch:{year:1989,month:1,day:8},anchorEpoch:{year:1989,month:1,day:8}},{code:"showa",isoEpoch:{year:1926,month:12,day:25},anchorEpoch:{year:1926,month:12,day:25}},{code:"taisho",isoEpoch:{year:1912,month:7,day:30},anchorEpoch:{year:1912,month:7,day:30}},{code:"meiji",isoEpoch:{year:1868,month:9,day:8},anchorEpoch:{year:1868,month:9,day:8}},{code:"japanese",names:["japanese","gregory","ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"japanese-inverse",names:["japanese-inverse","gregory-inverse","bc","bce"],reverseOf:"japanese"}]),this.erasBeginMidYear=!0}reviseIntlEra(t,n){const{era:i,eraYear:r}=t,{year:s}=n;return this.eras.find((o=>o.code===i))?{era:i,eraYear:r}:s<1?{era:"japanese-inverse",eraYear:1-s}:{era:"japanese",eraYear:s}}}class JC extends sa{constructor(){super(...arguments),this.calendarType="lunisolar"}inLeapYear(t,n){const i=this.getMonthList(t.year,n);return Object.entries(i).length===13}monthsInYear(t,n){return this.inLeapYear(t,n)?13:12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(t){return["M01L","M09L","M10L","M11L","M12L"].includes(t)?29:30}monthDaySearchStartYear(t,n){const i={M01L:[1651,1651],M02L:[1947,1765],M03L:[1966,1955],M04L:[1963,1944],M05L:[1971,1952],M06L:[1960,1941],M07L:[1968,1938],M08L:[1957,1718],M09L:[1832,1832],M10L:[1870,1870],M11L:[1814,1814],M12L:[1890,1890]}[t]??[1972,1972];return n<30?i[0]:i[1]}getMonthList(t,n){if(t===void 0)throw new TypeError("Missing year");const i=JSON.stringify({func:"getMonthList",calendarYear:t,id:this.id}),r=n.get(i);if(r)return r;const s=this.getFormatter(),o=(g,b)=>{const _=GC({isoYear:g,isoMonth:2,isoDay:1}),C=new Date(_);C.setUTCDate(b+1);const S=s.formatToParts(C),k=S.find((x=>x.type==="month")).value,$=+S.find((x=>x.type==="day")).value,D=S.find((x=>x.type==="relatedYear"));let w;if(D===void 0)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);return w=+D.value,{calendarMonthString:k,calendarDay:$,calendarYearToVerify:w}};let a=17,{calendarMonthString:c,calendarDay:l,calendarYearToVerify:u}=o(t,a);c!=="1"&&(a+=29,{calendarMonthString:c,calendarDay:l}=o(t,a)),a-=l-5;const h={};let d,f,p=1,m=!1;do({calendarMonthString:c,calendarDay:l,calendarYearToVerify:u}=o(t,a)),d&&(h[f].daysInMonth=d+30-l),u!==t?m=!0:(h[c]={monthIndex:p++},a+=30),d=l,f=c;while(!m);return h[f].daysInMonth=d+30-l,n.set(i,h),h}estimateIsoDate(t){const{year:n,month:i}=t;return{year:n,month:i>=12?12:i+1,day:1}}adjustCalendarDate(t,n,i="constrain",r=!1){let{year:s,month:o,monthExtra:a,day:c,monthCode:l}=t;if(s===void 0)throw new TypeError("Missing property: year");if(r){if(a&&a!=="bis")throw new RangeError(`Unexpected leap month suffix: ${a}`);const u=Zi(o,a!==void 0),h=`${o}${a||""}`,d=this.getMonthList(s,n)[h];if(d===void 0)throw new RangeError(`Unmatched month ${h} in Chinese year ${s}`);return o=d.monthIndex,{year:s,month:o,day:c,monthCode:u}}if(this.validateCalendarDate(t),o===void 0){const u=this.getMonthList(s,n);let h=l.replace(/^M|L$/g,(f=>f==="L"?"bis":""));h[0]==="0"&&(h=h.slice(1));let d=u[h];if(o=d&&d.monthIndex,o===void 0&&l.endsWith("L")&&l!="M13L"&&i==="constrain"){const f=+l.replace(/^M0?|L$/g,"");d=u[f],d&&(o=d.monthIndex,l=Zi(f))}if(o===void 0)throw new RangeError(`Unmatched month ${l} in Chinese year ${s}`)}else if(l===void 0){const u=this.getMonthList(s,n),h=Object.entries(u),d=h.length;i==="reject"?(Te(o,1,d),Te(c,1,this.maximumMonthLength())):(o=gn(o,1,d),c=gn(c,1,this.maximumMonthLength()));const f=h.find((p=>p[1].monthIndex===o));if(f===void 0)throw new RangeError(`Invalid month ${o} in Chinese year ${s}`);l=Zi(+f[0].replace("bis",""),f[0].indexOf("bis")!==-1)}else{const u=this.getMonthList(s,n);let h=l.replace(/^M|L$/g,(f=>f==="L"?"bis":""));h[0]==="0"&&(h=h.slice(1));const d=u[h];if(!d)throw new RangeError(`Unmatched monthCode ${l} in Chinese year ${s}`);if(o!==d.monthIndex)throw new RangeError(`monthCode ${l} doesn't correspond to month ${o} in Chinese year ${s}`)}return{...t,year:s,month:o,monthCode:l,day:c}}}class f5 extends JC{constructor(){super(...arguments),this.id="chinese"}}class p5 extends JC{constructor(){super(...arguments),this.id="dangi"}}class m5{constructor(t){this.helper=t}extraFields(t){return this.helper.hasEra&&t.includes("year")?["era","eraYear"]:[]}resolveFields(t){if(this.helper.calendarType!=="lunisolar"){const n=new $e;nv(t,void 0,this.helper.monthsInYear({year:t.year??1972},n))}}dateToISO(t,n){const i=new $e,r=this.helper.calendarToIsoDate(t,n,i);return i.setObject(r),r}monthDayToISOReferenceDate(t,n){const i=new $e,r=this.helper.monthDayFromFields(t,n,i);return i.setObject(r),r}fieldKeysToIgnore(t){const n=new Set;for(let i=0;i<t.length;i++){const r=t[i];switch(n.add(r),r){case"era":n.add("eraYear"),n.add("year");break;case"eraYear":n.add("era"),n.add("year");break;case"year":n.add("era"),n.add("eraYear");break;case"month":n.add("monthCode"),this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"));break;case"monthCode":n.add("month"),this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"));break;case"day":this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"))}}return VC(n)}dateAdd(t,{years:n,months:i,weeks:r,days:s},o){const a=$e.getCacheForObject(t),c=this.helper.isoToCalendarDate(t,a),l=this.helper.addCalendar(c,{years:n,months:i,weeks:r,days:s},o,a),u=this.helper.calendarToIsoDate(l,"constrain",a);return $e.getCacheForObject(u)||new $e(a).setObject(u),u}dateUntil(t,n,i){const r=$e.getCacheForObject(t),s=$e.getCacheForObject(n),o=this.helper.isoToCalendarDate(t,r),a=this.helper.isoToCalendarDate(n,s);return this.helper.untilCalendar(o,a,i,r)}isoToDate(t,n){const i=$e.getCacheForObject(t),r=this.helper.isoToCalendarDate(t,i);if(n.dayOfWeek&&(r.dayOfWeek=ih.iso8601.isoToDate(t,{dayOfWeek:!0}).dayOfWeek),n.dayOfYear){const s=this.helper.startOfCalendarYear(r),o=this.helper.calendarDaysUntil(s,r,i);r.dayOfYear=o+1}if(n.weekOfYear&&(r.weekOfYear=KC(this.helper.id,t)),r.daysInWeek=7,n.daysInMonth&&(r.daysInMonth=this.helper.daysInMonth(r,i)),n.daysInYear){const s=this.helper.startOfCalendarYear(r),o=this.helper.addCalendar(s,{years:1},"constrain",i);r.daysInYear=this.helper.calendarDaysUntil(s,o,i)}return n.monthsInYear&&(r.monthsInYear=this.helper.monthsInYear(r,i)),n.inLeapYear&&(r.inLeapYear=this.helper.inLeapYear(r,i)),r}getFirstDayOfWeek(){return this.helper.getFirstDayOfWeek()}getMinimalDaysInFirstWeek(){return this.helper.getMinimalDaysInFirstWeek()}}for(const e of[XL,i5,c5,o5,a5,f5,p5,l5,r5,u5,h5,d5,QL,ZL,JL,t5,e5,n5]){const t=new e;ih[t.id]=new m5(t)}lg("calendarImpl",(function(e){return ih[e]}));const wu=Intl.DateTimeFormat;function da(e,t){let n=y(e,t);return typeof n=="function"&&(n=new wu(y(e,uC),n(y(e,sg))),(function(i,r,s){const o=Bf(i);if(o===void 0)throw new TypeError("Missing slots for the given container");if(o[r]===void 0)throw new TypeError(`tried to reset ${r} which was not set`);o[r]=s})(e,t,n)),n}function Yc(e){return xn(e,ia)}class xu{constructor(t=void 0,n=void 0){(function(i,r,s){const o=s!==void 0;let a;if(o){const h=["localeMatcher","calendar","numberingSystem","hour12","hourCycle","timeZone","weekday","era","year","month","day","dayPeriod","hour","minute","second","fractionalSecondDigits","timeZoneName","formatMatcher","dateStyle","timeStyle"];a=(function(f){if(f==null)throw new TypeError(`Expected object not ${f}`);return Object(f)})(s);const d=Object.create(null);for(let f=0;f<h.length;f++){const p=h[f];Object.prototype.hasOwnProperty.call(a,p)&&(d[p]=a[p])}a=d}else a=Object.create(null);const c=new wu(r,a),l=c.resolvedOptions();if(Jr(i),o){const h=Object.assign(Object.create(null),l);for(const d in h)Object.prototype.hasOwnProperty.call(a,d)||delete h[d];h.hour12=a.hour12,h.hourCycle=a.hourCycle,ht(i,sg,h)}else ht(i,sg,a);ht(i,uC,l.locale),ht(i,ia,c),ht(i,xa,l.timeZone),ht(i,al,l.calendar),ht(i,rC,k5),ht(i,sC,x5),ht(i,oC,C5),ht(i,aC,w5),ht(i,cC,S5),ht(i,lC,E5);const u=o?a.timeZone:void 0;if(u===void 0)ht(i,rg,l.timeZone);else{const h=Yf(u);if(h.startsWith("−"))throw new RangeError("Unicode minus (U+2212) is not supported in time zone offsets");ht(i,rg,yn(h))}})(this,t,n)}get format(){O(this,Yc);const t=v5.bind(this);return Object.defineProperties(t,{length:{value:1,enumerable:!1,writable:!1,configurable:!0},name:{value:"",enumerable:!1,writable:!1,configurable:!0}}),t}formatRange(t,n){return O(this,Yc),b5.call(this,t,n)}formatToParts(t,...n){return O(this,Yc),y5.call(this,t,...n)}formatRangeToParts(t,n){return O(this,Yc),_5.call(this,t,n)}resolvedOptions(){return O(this,Yc),g5.call(this)}}"formatToParts"in wu.prototype||delete xu.prototype.formatToParts,"formatRangeToParts"in wu.prototype||delete xu.prototype.formatRangeToParts;const mi=function(e=void 0,t=void 0){return new xu(e,t)};function g5(){const e=y(this,ia).resolvedOptions();return e.timeZone=y(this,rg),e}function v5(e,...t){let n,i,r=cc(e,this);return r.formatter?(n=r.formatter,i=[xi(r.epochNs,"floor")]):(n=y(this,ia),i=[e,...t]),n.format(...i)}function y5(e,...t){let n,i,r=cc(e,this);return r.formatter?(n=r.formatter,i=[xi(r.epochNs,"floor")]):(n=y(this,ia),i=[e,...t]),n.formatToParts(...i)}function b5(e,t){if(e===void 0||t===void 0)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=rf(e),i=rf(t);let r,s=[n,i];if(Fr(n)!==Fr(i))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");if(Fr(n)){if(!tk(n,i))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");const{epochNs:o,formatter:a}=cc(n,this),{epochNs:c,formatter:l}=cc(i,this);a&&(r=a,s=[xi(o,"floor"),xi(c,"floor")])}return r||(r=y(this,ia)),r.formatRange(...s)}function _5(e,t){if(e===void 0||t===void 0)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=rf(e),i=rf(t);let r,s=[n,i];if(Fr(n)!==Fr(i))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");if(Fr(n)){if(!tk(n,i))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");const{epochNs:o,formatter:a}=cc(n,this),{epochNs:c,formatter:l}=cc(i,this);a&&(r=a,s=[xi(o,"floor"),xi(c,"floor")])}return r||(r=y(this,ia)),r.formatRangeToParts(...s)}function rh(e={},t={}){const n=Object.assign({},e),i=["year","month","day","hour","minute","second","weekday","dayPeriod","timeZoneName","dateStyle","timeStyle"];for(let r=0;r<i.length;r++){const s=i[r];n[s]=s in t?t[s]:n[s],n[s]!==!1&&n[s]!==void 0||delete n[s]}return n}function w5(e){const t=rh(e,{year:!1,month:!1,day:!1,weekday:!1,timeZoneName:!1,dateStyle:!1});if(t.timeStyle!=="long"&&t.timeStyle!=="full"||(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"})),!tp(t)){if(sh(e))throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(e)}]`);Object.assign(t,{hour:"numeric",minute:"numeric",second:"numeric"})}return t}function x5(e){const t={short:{year:"2-digit",month:"numeric"},medium:{year:"numeric",month:"short"},long:{year:"numeric",month:"long"},full:{year:"numeric",month:"long"}},n=rh(e,{day:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const i=n.dateStyle;delete n.dateStyle,Object.assign(n,t[i])}if(!("year"in n||"month"in n||"era"in n)){if(sh(e))throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(e)}]`);Object.assign(n,{year:"numeric",month:"numeric"})}return n}function C5(e){const t={short:{month:"numeric",day:"numeric"},medium:{month:"short",day:"numeric"},long:{month:"long",day:"numeric"},full:{month:"long",day:"numeric"}},n=rh(e,{year:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const i=n.dateStyle;delete n.dateStyle,Object.assign(n,t[i])}if(!("month"in n)&&!("day"in n)){if(sh(e))throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(e)}]`);Object.assign(n,{month:"numeric",day:"numeric"})}return n}function k5(e){const t=rh(e,{hour:!1,minute:!1,second:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if(!Jf(t)){if(sh(e))throw new TypeError(`cannot format PlainDate with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric"})}return t}function S5(e){const t=rh(e,{timeZoneName:!1});if((t.timeStyle==="long"||t.timeStyle==="full")&&(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"}),t.dateStyle)&&(Object.assign(t,{short:{year:"numeric",month:"numeric",day:"numeric"},medium:{year:"numeric",month:"short",day:"numeric"},long:{year:"numeric",month:"long",day:"numeric"},full:{year:"numeric",month:"long",day:"numeric",weekday:"long"}}[t.dateStyle]),delete t.dateStyle),!tp(t)&&!Jf(t)){if(sh(e))throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}return t}function E5(e){let t=e;return tp(t)||Jf(t)||(t=Object.assign({},t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),t}function Jf(e){return"year"in e||"month"in e||"day"in e||"weekday"in e||"dateStyle"in e||"era"in e}function tp(e){return"hour"in e||"minute"in e||"second"in e||"timeStyle"in e||"dayPeriod"in e||"fractionalSecondDigits"in e}function sh(e){return Jf(e)||tp(e)||"dateStyle"in e||"timeStyle"in e||"timeZoneName"in e}function Fr(e){return ne(e)||ce(e)||jt(e)||ft(e)||Le(e)||Kn(e)||Ae(e)}function rf(e){return Fr(e)?e:Uf(e)}function tk(e,t){return!(!Fr(e)||!Fr(t)||ce(e)&&!ce(t)||ne(e)&&!ne(t)||jt(e)&&!jt(t)||ft(e)&&!ft(t)||Le(e)&&!Le(t)||Kn(e)&&!Kn(t)||Ae(e)&&!Ae(t))}function cc(e,t){if(ce(e)){const n={isoDate:{year:1970,month:1,day:1},time:y(e,ie)};return{epochNs:Ze(y(t,xa),n,"compatible"),formatter:da(t,aC)}}if(Le(e)){const n=y(e,A),i=y(t,al);if(n!==i)throw new RangeError(`cannot format PlainYearMonth with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,xa),r,"compatible"),formatter:da(t,sC)}}if(Kn(e)){const n=y(e,A),i=y(t,al);if(n!==i)throw new RangeError(`cannot format PlainMonthDay with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,xa),r,"compatible"),formatter:da(t,oC)}}if(ne(e)){const n=y(e,A),i=y(t,al);if(n!=="iso8601"&&n!==i)throw new RangeError(`cannot format PlainDate with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,xa),r,"compatible"),formatter:da(t,rC)}}if(jt(e)){const n=y(e,A),i=y(t,al);if(n!=="iso8601"&&n!==i)throw new RangeError(`cannot format PlainDateTime with calendar ${n} in locale with calendar ${i}`);const r=y(e,Ut);return{epochNs:Ze(y(t,xa),r,"compatible"),formatter:da(t,cC)}}if(ft(e))throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");return Ae(e)?{epochNs:y(e,it),formatter:da(t,lC)}:{}}function ek(e){const t=Object.create(null);return t.years=y(e,cn),t.months=y(e,ln),t.weeks=y(e,On),t.days=y(e,un),t.hours=y(e,hn),t.minutes=y(e,dn),t.seconds=y(e,fn),t.milliseconds=y(e,pn),t.microseconds=y(e,mn),t.nanoseconds=y(e,Pn),t}xu.prototype.constructor=mi,Object.defineProperty(mi,"prototype",{value:xu.prototype,writable:!1,enumerable:!1,configurable:!1}),mi.supportedLocalesOf=wu.supportedLocalesOf,ts(mi,"Intl.DateTimeFormat");const{format:M5,formatToParts:D5}=Intl.DurationFormat?.prototype??Object.create(null);function nk(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=ek(gi(e));return M5.call(this,t)}Intl.DurationFormat?.prototype&&(Intl.DurationFormat.prototype.format=nk,Intl.DurationFormat.prototype.formatToParts=function(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=ek(gi(e));return D5.call(this,t)});class sv{constructor(t){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");$C(this,nf(t))}get epochMilliseconds(){return O(this,Ae),xi(y(this,it),"floor")}get epochNanoseconds(){return O(this,Ae),YC(v.BigInt(y(this,it)))}add(t){return O(this,Ae),Vb("add",this,t)}subtract(t){return O(this,Ae),Vb("subtract",this,t)}until(t,n=void 0){return O(this,Ae),jb("until",this,t,n)}since(t,n=void 0){return O(this,Ae),jb("since",this,t,n)}round(t){if(O(this,Ae),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Ho("smallestUnit",t):K(t),i=Sc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr);return Ec(i,{hour:24,minute:1440,second:86400,millisecond:864e5,microsecond:864e8,nanosecond:864e11}[s],!0),Ki(bg(y(this,it),i,s,r))}equals(t){O(this,Ae);const n=ul(t),i=y(this,it),r=y(n,it);return v.equal(v.BigInt(i),v.BigInt(r))}toString(t=void 0){O(this,Ae);const n=K(t),i=Gu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');let o=n.timeZone;o!==void 0&&(o=yn(o));const{precision:a,unit:c,increment:l}=Xu(s,i);return Ib(Ki(bg(y(this,it),l,c,r)),o,a)}toJSON(){return O(this,Ae),Ib(this,void 0,"auto")}toLocaleString(t=void 0,n=void 0){return O(this,Ae),new mi(t,n).format(this)}valueOf(){qs("Instant")}toZonedDateTimeISO(t){O(this,Ae);const n=yn(t);return Ge(y(this,it),n,"iso8601")}static fromEpochMilliseconds(t){return Ki(Xi(Uf(t)))}static fromEpochNanoseconds(t){return Ki(nf(t))}static from(t){return ul(t)}static compare(t,n){const i=ul(t),r=ul(n),s=y(i,it),o=y(r,it);return v.lessThan(s,o)?-1:v.greaterThan(s,o)?1:0}}ts(sv,"Temporal.Instant");class ov{constructor(t,n,i,r="iso8601"){const s=st(t),o=st(n),a=st(i),c=Cn(r===void 0?"iso8601":Se(r));jo(s,o,a),kC(this,{year:s,month:o,day:a},c)}get calendarId(){return O(this,ne),y(this,A)}get era(){return rn(this,"era")}get eraYear(){return rn(this,"eraYear")}get year(){return rn(this,"year")}get month(){return rn(this,"month")}get monthCode(){return rn(this,"monthCode")}get day(){return rn(this,"day")}get dayOfWeek(){return rn(this,"dayOfWeek")}get dayOfYear(){return rn(this,"dayOfYear")}get weekOfYear(){return rn(this,"weekOfYear")?.week}get yearOfWeek(){return rn(this,"weekOfYear")?.year}get daysInWeek(){return rn(this,"daysInWeek")}get daysInMonth(){return rn(this,"daysInMonth")}get daysInYear(){return rn(this,"daysInYear")}get monthsInYear(){return rn(this,"monthsInYear")}get inLeapYear(){return rn(this,"inLeapYear")}with(t,n=void 0){if(O(this,ne),!re(t))throw new TypeError("invalid argument");kc(t);const i=y(this,A);let r=_n(i,y(this,rt));return r=zo(i,r,ni(i,t,["year","month","monthCode","day"],[],"partial")),vn(Ls(i,r,St(K(n))),i)}withCalendar(t){O(this,ne);const n=th(t);return vn(y(this,rt),n)}add(t,n=void 0){return O(this,ne),Kb("add",this,t,n)}subtract(t,n=void 0){return O(this,ne),Kb("subtract",this,t,n)}until(t,n=void 0){return O(this,ne),Bb("until",this,t,n)}since(t,n=void 0){return O(this,ne),Bb("since",this,t,n)}equals(t){O(this,ne);const n=cl(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return O(this,ne),Ob(this,Ku(K(t)))}toJSON(){return O(this,ne),Ob(this)}toLocaleString(t=void 0,n=void 0){return O(this,ne),new mi(t,n).format(this)}valueOf(){qs("PlainDate")}toPlainDateTime(t=void 0){O(this,ne);const n=CC(t);return fi(Mt(y(this,rt),n),y(this,A))}toZonedDateTime(t){let n,i;if(O(this,ne),re(t)){const o=t.timeZone;o===void 0?n=yn(t):(n=yn(o),i=t.plainTime)}else n=yn(t);const r=y(this,rt);let s;return i===void 0?s=as(n,r):(i=vs(i),s=Ze(n,Mt(r,y(i,ie)),"compatible")),Ge(s,n,y(this,A))}toPlainYearMonth(){O(this,ne);const t=y(this,A);return za(gu(t,_n(t,y(this,rt)),"constrain"),t)}toPlainMonthDay(){O(this,ne);const t=y(this,A);return Oa(Qd(t,_n(t,y(this,rt)),"constrain"),t)}static from(t,n=void 0){return cl(t,n)}static compare(t,n){const i=cl(t),r=cl(n);return or(y(i,rt),y(r,rt))}}function rn(e,t){O(e,ne);const n=y(e,rt);return Qu(e).isoToDate(n,{[t]:!0})[t]}ts(ov,"Temporal.PlainDate");class av{constructor(t,n,i,r=0,s=0,o=0,a=0,c=0,l=0,u="iso8601"){const h=st(t),d=st(n),f=st(i),p=r===void 0?0:st(r),m=s===void 0?0:st(s),g=o===void 0?0:st(o),b=a===void 0?0:st(a),_=c===void 0?0:st(c),C=l===void 0?0:st(l),S=Cn(u===void 0?"iso8601":Se(u));Z0(h,d,f,p,m,g,b,_,C),SC(this,{isoDate:{year:h,month:d,day:f},time:{hour:p,minute:m,second:g,millisecond:b,microsecond:_,nanosecond:C}},S)}get calendarId(){return O(this,jt),y(this,A)}get year(){return sn(this,"year")}get month(){return sn(this,"month")}get monthCode(){return sn(this,"monthCode")}get day(){return sn(this,"day")}get hour(){return fa(this,"hour")}get minute(){return fa(this,"minute")}get second(){return fa(this,"second")}get millisecond(){return fa(this,"millisecond")}get microsecond(){return fa(this,"microsecond")}get nanosecond(){return fa(this,"nanosecond")}get era(){return sn(this,"era")}get eraYear(){return sn(this,"eraYear")}get dayOfWeek(){return sn(this,"dayOfWeek")}get dayOfYear(){return sn(this,"dayOfYear")}get weekOfYear(){return sn(this,"weekOfYear")?.week}get yearOfWeek(){return sn(this,"weekOfYear")?.year}get daysInWeek(){return sn(this,"daysInWeek")}get daysInYear(){return sn(this,"daysInYear")}get daysInMonth(){return sn(this,"daysInMonth")}get monthsInYear(){return sn(this,"monthsInYear")}get inLeapYear(){return sn(this,"inLeapYear")}with(t,n=void 0){if(O(this,jt),!re(t))throw new TypeError("invalid argument");kc(t);const i=y(this,A),r=y(this,Ut);let s={..._n(i,r.isoDate),...r.time};return s=zo(i,s,ni(i,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],"partial")),fi(Zu(i,s,St(K(n))),i)}withPlainTime(t=void 0){O(this,jt);const n=CC(t);return fi(Mt(y(this,Ut).isoDate,n),y(this,A))}withCalendar(t){O(this,jt);const n=th(t);return fi(y(this,Ut),n)}add(t,n=void 0){return O(this,jt),Gb("add",this,t,n)}subtract(t,n=void 0){return O(this,jt),Gb("subtract",this,t,n)}until(t,n=void 0){return O(this,jt),Wb("until",this,t,n)}since(t,n=void 0){return O(this,jt),Wb("since",this,t,n)}round(t){if(O(this,jt),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Ho("smallestUnit",t):K(t),i=Sc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr,["day"]),o={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s];Ec(i,o,o===1);const a=y(this,Ut);return fi(i===1&&s==="nanosecond"?a:_g(a,i,s,r),y(this,A))}equals(t){O(this,jt);const n=ll(t);return ac(y(this,Ut),y(n,Ut))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){O(this,jt);const n=K(t),i=Ku(n),r=Gu(n),s=Pi(n,"trunc"),o=Nn(n,"smallestUnit","time",void 0);if(o==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:a,unit:c,increment:l}=Xu(o,r),u=_g(y(this,Ut),l,c,s);return Bo(u),yu(u,y(this,A),a,i)}toJSON(){return O(this,jt),yu(y(this,Ut),y(this,A),"auto")}toLocaleString(t=void 0,n=void 0){return O(this,jt),new mi(t,n).format(this)}valueOf(){qs("PlainDateTime")}toZonedDateTime(t,n=void 0){O(this,jt);const i=yn(t),r=jl(K(n));return Ge(Ze(i,y(this,Ut),r),i,y(this,A))}toPlainDate(){return O(this,jt),vn(y(this,Ut).isoDate,y(this,A))}toPlainTime(){return O(this,jt),Mr(y(this,Ut).time)}static from(t,n=void 0){return ll(t,n)}static compare(t,n){const i=ll(t),r=ll(n);return ac(y(i,Ut),y(r,Ut))}}function sn(e,t){O(e,jt);const n=y(e,Ut).isoDate;return Qu(e).isoToDate(n,{[t]:!0})[t]}function fa(e,t){return O(e,jt),y(e,Ut).time[t]}ts(av,"Temporal.PlainDateTime");class lc{constructor(t=0,n=0,i=0,r=0,s=0,o=0,a=0,c=0,l=0,u=0){const h=t===void 0?0:Ei(t),d=n===void 0?0:Ei(n),f=i===void 0?0:Ei(i),p=r===void 0?0:Ei(r),m=s===void 0?0:Ei(s),g=o===void 0?0:Ei(o),b=a===void 0?0:Ei(a),_=c===void 0?0:Ei(c),C=l===void 0?0:Ei(l),S=u===void 0?0:Ei(u);Qf(h,d,f,p,m,g,b,_,C,S),Jr(this),ht(this,cn,h),ht(this,ln,d),ht(this,On,f),ht(this,un,p),ht(this,hn,m),ht(this,dn,g),ht(this,fn,b),ht(this,pn,_),ht(this,mn,C),ht(this,Pn,S)}get years(){return O(this,te),y(this,cn)}get months(){return O(this,te),y(this,ln)}get weeks(){return O(this,te),y(this,On)}get days(){return O(this,te),y(this,un)}get hours(){return O(this,te),y(this,hn)}get minutes(){return O(this,te),y(this,dn)}get seconds(){return O(this,te),y(this,fn)}get milliseconds(){return O(this,te),y(this,pn)}get microseconds(){return O(this,te),y(this,mn)}get nanoseconds(){return O(this,te),y(this,Pn)}get sign(){return O(this,te),tf(this)}get blank(){return O(this,te),tf(this)===0}with(t){O(this,te);const n=xC(t),{years:i=y(this,cn),months:r=y(this,ln),weeks:s=y(this,On),days:o=y(this,un),hours:a=y(this,hn),minutes:c=y(this,dn),seconds:l=y(this,fn),milliseconds:u=y(this,pn),microseconds:h=y(this,mn),nanoseconds:d=y(this,Pn)}=n;return new lc(i,r,s,o,a,c,l,u,h,d)}negated(){return O(this,te),Bn(this)}abs(){return O(this,te),new lc(Math.abs(y(this,cn)),Math.abs(y(this,ln)),Math.abs(y(this,On)),Math.abs(y(this,un)),Math.abs(y(this,hn)),Math.abs(y(this,dn)),Math.abs(y(this,fn)),Math.abs(y(this,pn)),Math.abs(y(this,mn)),Math.abs(y(this,Pn)))}add(t){return O(this,te),qb("add",this,t)}subtract(t){return O(this,te),qb("subtract",this,t)}round(t){if(O(this,te),t===void 0)throw new TypeError("options parameter is required");const n=Sr(this),i=typeof t=="string"?Ho("smallestUnit",t):K(t);let r=Nn(i,"largestUnit","datetime",void 0,["auto"]),{plainRelativeTo:s,zonedRelativeTo:o}=Gp(i);const a=Sc(i),c=Pi(i,"halfExpand");let l=Nn(i,"smallestUnit","datetime",void 0),u=!0;l||(u=!1,l="nanosecond");const h=Ar(n,l);let d=!0;if(r||(d=!1,r=h),r==="auto"&&(r=h),!u&&!d)throw new RangeError("at least one of smallestUnit or largestUnit is required");if(Ar(r,l)!==r)throw new RangeError(`largestUnit ${r} cannot be smaller than smallestUnit ${l}`);const f={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[l];if(f!==void 0&&Ec(a,f,!1),a>1&&Er(l)==="date"&&r!==l)throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");if(o){let m=Ca(this);const g=y(o,Tt),b=y(o,A),_=y(o,it);return m=UC(_,fl(_,g,b,m),g,b,r,a,l,c),Er(r)==="date"&&(r="hour"),pi(m,r)}if(s){let m=Gi(this);const g=oc({hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},m.time),b=y(s,rt),_=y(s,A),C=Zn(_,b,Xe(m.date,g.deltaDays),"constrain");return m=HC(Mt(b,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Mt(C,g),_,r,a,l,c),pi(m,r)}if(Ui(n))throw new RangeError(`a starting point is required for ${n}s balancing`);if(Ui(r))throw new RangeError(`a starting point is required for ${r}s balancing`);let p=Gi(this);if(l==="day"){const{quotient:m,remainder:g}=p.time.divmod(Kd);let b=p.date.days+m+Bl(g,"day");b=ys(b,a,c),p=Lr({years:0,months:0,weeks:0,days:b},pt.ZERO)}else p=Lr({years:0,months:0,weeks:0,days:0},ef(p.time,a,l,c));return pi(p,r)}total(t){if(O(this,te),t===void 0)throw new TypeError("options argument is required");const n=typeof t=="string"?Ho("unit",t):K(t);let{plainRelativeTo:i,zonedRelativeTo:r}=Gp(n);const s=Nn(n,"unit","datetime",Yr);if(r){const a=Ca(this),c=y(r,Tt),l=y(r,A),u=y(r,it);return(function(h,d,f,p,m){return Er(m)==="time"?Bl(pt.fromEpochNsDiff(d,h),m):zb(BC(h,d,f,p,m),d,wi(f,h),f,p,m)})(u,fl(u,c,l,a),c,l,s)}if(i){const a=Gi(this);let c=oc({hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},a.time);const l=y(i,rt),u=y(i,A),h=Zn(u,l,Xe(a.date,c.deltaDays),"constrain");return(function(d,f,p,m){if(ac(d,f)==0)return 0;Bo(d),Bo(f);const g=jC(d,f,p,m);return m==="nanosecond"?v.toNumber(g.time.totalNs):zb(g,ze(f),d,null,p,m)})(Mt(l,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Mt(h,c),u,s)}const o=Sr(this);if(Ui(o))throw new RangeError(`a starting point is required for ${o}s total`);if(Ui(s))throw new RangeError(`a starting point is required for ${s}s total`);return Bl(Gi(this).time,s)}toString(t=void 0){O(this,te);const n=K(t),i=Gu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour"||s==="minute")throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');const{precision:o,unit:a,increment:c}=Xu(s,i);if(a==="nanosecond"&&c===1)return _h(this,o);const l=Sr(this);let u=Ca(this);const h=ef(u.time,c,a,r);return u=Lr(u.date,h),_h(pi(u,Ar(l,"second")),o)}toJSON(){return O(this,te),_h(this,"auto")}toLocaleString(t=void 0,n=void 0){if(O(this,te),typeof Intl.DurationFormat=="function"){const i=new Intl.DurationFormat(t,n);return nk.call(i,this)}return console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."),_h(this,"auto")}valueOf(){qs("Duration")}static from(t){return gi(t)}static compare(t,n,i=void 0){const r=gi(t),s=gi(n),o=K(i),{plainRelativeTo:a,zonedRelativeTo:c}=Gp(o);if(y(r,cn)===y(s,cn)&&y(r,ln)===y(s,ln)&&y(r,On)===y(s,On)&&y(r,un)===y(s,un)&&y(r,hn)===y(s,hn)&&y(r,dn)===y(s,dn)&&y(r,fn)===y(s,fn)&&y(r,pn)===y(s,pn)&&y(r,mn)===y(s,mn)&&y(r,Pn)===y(s,Pn))return 0;const l=Sr(r),u=Sr(s),h=Ca(r),d=Ca(s);if(c&&(Er(l)==="date"||Er(u)==="date")){const b=y(c,Tt),_=y(c,A),C=y(c,it),S=fl(C,b,_,h),k=fl(C,b,_,d);return Rn(v.toNumber(v.subtract(S,k)))}let f=h.date.days,p=d.date.days;if(Ui(l)||Ui(u)){if(!a)throw new RangeError("A starting point is required for years, months, or weeks comparison");f=Fb(h.date,a),p=Fb(d.date,a)}const m=h.time.add24HourDays(f),g=d.time.add24HourDays(p);return m.cmp(g)}}ts(lc,"Temporal.Duration");class cv{constructor(t,n,i="iso8601",r=1972){const s=st(t),o=st(n),a=Cn(i===void 0?"iso8601":Se(i)),c=st(r);jo(c,s,o),EC(this,{year:c,month:s,day:o},a)}get monthCode(){return t_(this,"monthCode")}get day(){return t_(this,"day")}get calendarId(){return O(this,Kn),y(this,A)}with(t,n=void 0){if(O(this,Kn),!re(t))throw new TypeError("invalid argument");kc(t);const i=y(this,A);let r=_n(i,y(this,rt),"month-day");return r=zo(i,r,ni(i,t,["year","month","monthCode","day"],[],"partial")),Oa(Qd(i,r,St(K(n))),i)}equals(t){O(this,Kn);const n=$b(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return O(this,Kn),Rb(this,Ku(K(t)))}toJSON(){return O(this,Kn),Rb(this)}toLocaleString(t=void 0,n=void 0){return O(this,Kn),new mi(t,n).format(this)}valueOf(){qs("PlainMonthDay")}toPlainDate(t){if(O(this,Kn),!re(t))throw new TypeError("argument should be an object");const n=y(this,A);return vn(Ls(n,zo(n,_n(n,y(this,rt),"month-day"),ni(n,t,["year"],[],[])),"constrain"),n)}static from(t,n=void 0){return $b(t,n)}}function t_(e,t){O(e,Kn);const n=y(e,rt);return Qu(e).isoToDate(n,{[t]:!0})[t]}function Qp(e){return wi(e,Cg())}ts(cv,"Temporal.PlainMonthDay");const ik={instant:()=>Ki(Cg()),plainDateTimeISO:(e=Uc())=>fi(Qp(yn(e)),"iso8601"),plainDateISO:(e=Uc())=>vn(Qp(yn(e)).isoDate,"iso8601"),plainTimeISO:(e=Uc())=>Mr(Qp(yn(e)).time),timeZoneId:()=>Uc(),zonedDateTimeISO:(e=Uc())=>{const t=yn(e);return Ge(Cg(),t,"iso8601")},[Symbol.toStringTag]:"Temporal.Now"};Object.defineProperty(ik,Symbol.toStringTag,{value:"Temporal.Now",writable:!1,enumerable:!1,configurable:!0});class oh{constructor(t=0,n=0,i=0,r=0,s=0,o=0){const a=t===void 0?0:st(t),c=n===void 0?0:st(n),l=i===void 0?0:st(i),u=r===void 0?0:st(r),h=s===void 0?0:st(s),d=o===void 0?0:st(o);Xf(a,c,l,u,h,d),MC(this,{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d})}get hour(){return O(this,ce),y(this,ie).hour}get minute(){return O(this,ce),y(this,ie).minute}get second(){return O(this,ce),y(this,ie).second}get millisecond(){return O(this,ce),y(this,ie).millisecond}get microsecond(){return O(this,ce),y(this,ie).microsecond}get nanosecond(){return O(this,ce),y(this,ie).nanosecond}with(t,n=void 0){if(O(this,ce),!re(t))throw new TypeError("invalid argument");kc(t);const i=fg(t,"partial"),r=fg(this);let{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=Object.assign(r,i);const h=St(K(n));return{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=Vf(s,o,a,c,l,u,h),new oh(s,o,a,c,l,u)}add(t){return O(this,ce),Xb("add",this,t)}subtract(t){return O(this,ce),Xb("subtract",this,t)}until(t,n=void 0){return O(this,ce),Hb("until",this,t,n)}since(t,n=void 0){return O(this,ce),Hb("since",this,t,n)}round(t){if(O(this,ce),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Ho("smallestUnit",t):K(t),i=Sc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr);return Ec(i,{hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s],!1),Mr(wg(y(this,ie),i,s,r))}equals(t){O(this,ce);const n=vs(t);return xg(y(this,ie),y(n,ie))===0}toString(t=void 0){O(this,ce);const n=K(t),i=Gu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:o,unit:a,increment:c}=Xu(s,i);return Pb(wg(y(this,ie),c,a,r),o)}toJSON(){return O(this,ce),Pb(y(this,ie),"auto")}toLocaleString(t=void 0,n=void 0){return O(this,ce),new mi(t,n).format(this)}valueOf(){qs("PlainTime")}static from(t,n=void 0){return vs(t,n)}static compare(t,n){const i=vs(t),r=vs(n);return xg(y(i,ie),y(r,ie))}}ts(oh,"Temporal.PlainTime");class lv{constructor(t,n,i="iso8601",r=1){const s=st(t),o=st(n),a=Cn(i===void 0?"iso8601":Se(i)),c=st(r);jo(s,o,c),DC(this,{year:s,month:o,day:c},a)}get year(){return vr(this,"year")}get month(){return vr(this,"month")}get monthCode(){return vr(this,"monthCode")}get calendarId(){return O(this,Le),y(this,A)}get era(){return vr(this,"era")}get eraYear(){return vr(this,"eraYear")}get daysInMonth(){return vr(this,"daysInMonth")}get daysInYear(){return vr(this,"daysInYear")}get monthsInYear(){return vr(this,"monthsInYear")}get inLeapYear(){return vr(this,"inLeapYear")}with(t,n=void 0){if(O(this,Le),!re(t))throw new TypeError("invalid argument");kc(t);const i=y(this,A);let r=_n(i,y(this,rt),"year-month");return r=zo(i,r,ni(i,t,["year","month","monthCode"],[],"partial")),za(gu(i,r,St(K(n))),i)}add(t,n=void 0){return O(this,Le),Qb("add",this,t,n)}subtract(t,n=void 0){return O(this,Le),Qb("subtract",this,t,n)}until(t,n=void 0){return O(this,Le),Ub("until",this,t,n)}since(t,n=void 0){return O(this,Le),Ub("since",this,t,n)}equals(t){O(this,Le);const n=hl(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return O(this,Le),Ab(this,Ku(K(t)))}toJSON(){return O(this,Le),Ab(this)}toLocaleString(t=void 0,n=void 0){return O(this,Le),new mi(t,n).format(this)}valueOf(){qs("PlainYearMonth")}toPlainDate(t){if(O(this,Le),!re(t))throw new TypeError("argument should be an object");const n=y(this,A);return vn(Ls(n,zo(n,_n(n,y(this,rt),"year-month"),ni(n,t,["day"],[],[])),"constrain"),n)}static from(t,n=void 0){return hl(t,n)}static compare(t,n){const i=hl(t),r=hl(n);return or(y(i,rt),y(r,rt))}}function vr(e,t){O(e,Le);const n=y(e,rt);return Qu(e).isoToDate(n,{[t]:!0})[t]}ts(lv,"Temporal.PlainYearMonth");const $5=mi.prototype.resolvedOptions;class uv{constructor(t,n,i="iso8601"){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");const r=nf(t);let s=Se(n);const{tzName:o,offsetMinutes:a}=$s(s);if(a===void 0){const c=Zd(o);if(!c)throw new RangeError(`unknown time zone ${o}`);s=c.identifier}else s=G0(a);TC(this,r,s,Cn(i===void 0?"iso8601":Se(i)))}get calendarId(){return O(this,ft),y(this,A)}get timeZoneId(){return O(this,ft),y(this,Tt)}get year(){return on(this,"year")}get month(){return on(this,"month")}get monthCode(){return on(this,"monthCode")}get day(){return on(this,"day")}get hour(){return pa(this,"hour")}get minute(){return pa(this,"minute")}get second(){return pa(this,"second")}get millisecond(){return pa(this,"millisecond")}get microsecond(){return pa(this,"microsecond")}get nanosecond(){return pa(this,"nanosecond")}get era(){return on(this,"era")}get eraYear(){return on(this,"eraYear")}get epochMilliseconds(){return O(this,ft),xi(y(this,it),"floor")}get epochNanoseconds(){return O(this,ft),YC(y(this,it))}get dayOfWeek(){return on(this,"dayOfWeek")}get dayOfYear(){return on(this,"dayOfYear")}get weekOfYear(){return on(this,"weekOfYear")?.week}get yearOfWeek(){return on(this,"weekOfYear")?.year}get hoursInDay(){O(this,ft);const t=y(this,Tt),n=Bi(this).isoDate,i=jn(n.year,n.month,n.day+1),r=as(t,n),s=as(t,i);return Bl(pt.fromEpochNsDiff(s,r),"hour")}get daysInWeek(){return on(this,"daysInWeek")}get daysInMonth(){return on(this,"daysInMonth")}get daysInYear(){return on(this,"daysInYear")}get monthsInYear(){return on(this,"monthsInYear")}get inLeapYear(){return on(this,"inLeapYear")}get offset(){return O(this,ft),pg(Dr(y(this,Tt),y(this,it)))}get offsetNanoseconds(){return O(this,ft),Dr(y(this,Tt),y(this,it))}with(t,n=void 0){if(O(this,ft),!re(t))throw new TypeError("invalid zoned-date-time-like");kc(t);const i=y(this,A),r=y(this,Tt),s=Dr(r,y(this,it)),o=Bi(this);let a={..._n(i,o.isoDate),...o.time,offset:pg(s)};a=zo(i,a,ni(i,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset"],"partial"));const c=K(n),l=jl(c),u=Xh(c,"prefer"),h=Zu(i,a,St(c)),d=Mc(a.offset);return Ge(Xd(h.isoDate,h.time,"option",d,r,l,u,!1),r,i)}withPlainTime(t=void 0){O(this,ft);const n=y(this,Tt),i=y(this,A),r=Bi(this).isoDate;let s;return s=t===void 0?as(n,r):Ze(n,Mt(r,y(vs(t),ie)),"compatible"),Ge(s,n,i)}withTimeZone(t){O(this,ft);const n=yn(t);return Ge(y(this,it),n,y(this,A))}withCalendar(t){O(this,ft);const n=th(t);return Ge(y(this,it),y(this,Tt),n)}add(t,n=void 0){return O(this,ft),Zb("add",this,t,n)}subtract(t,n=void 0){return O(this,ft),Zb("subtract",this,t,n)}until(t,n=void 0){return O(this,ft),Yb("until",this,t,n)}since(t,n=void 0){return O(this,ft),Yb("since",this,t,n)}round(t){if(O(this,ft),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Ho("smallestUnit",t):K(t),i=Sc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr,["day"]),o={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s];if(Ec(i,o,o===1),s==="nanosecond"&&i===1)return Ge(y(this,it),y(this,Tt),y(this,A));const a=y(this,Tt),c=y(this,it),l=Bi(this);let u;if(s==="day"){const h=l.isoDate,d=jn(h.year,h.month,h.day+1),f=as(a,h),p=as(a,d),m=v.subtract(p,f);u=pt.fromEpochNsDiff(c,f).round(m,r).addToEpochNs(f)}else{const h=_g(l,i,s,r),d=Dr(a,c);u=Xd(h.isoDate,h.time,"option",d,a,"compatible","prefer",!1)}return Ge(u,a,y(this,A))}equals(t){O(this,ft);const n=dl(t),i=y(this,it),r=y(n,it);return!!v.equal(v.BigInt(i),v.BigInt(r))&&!!IC(y(this,Tt),y(n,Tt))&&rr(y(this,A),y(n,A))}toString(t=void 0){O(this,ft);const n=K(t),i=Ku(n),r=Gu(n),s=(function(d){return Nr(d,"offset",["auto","never"],"auto")})(n),o=Pi(n,"trunc"),a=Nn(n,"smallestUnit","time",void 0);if(a==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const c=(function(d){return Nr(d,"timeZoneName",["auto","never","critical"],"auto")})(n),{precision:l,unit:u,increment:h}=Xu(a,r);return Lb(this,l,i,c,s,{unit:u,increment:h,roundingMode:o})}toLocaleString(t=void 0,n=void 0){O(this,ft);const i=K(n),r=Object.create(null);if((function(c,l,u,h){if(l==null)return;const d=Reflect.ownKeys(l);for(let f=0;f<d.length;f++){const p=d[f];if(!u.some((m=>Object.is(m,p)))&&Object.prototype.propertyIsEnumerable.call(l,p)){const m=l[p];c[p]=m}}})(r,i,["timeZone"]),i.timeZone!==void 0)throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");if(r.year===void 0&&r.month===void 0&&r.day===void 0&&r.era===void 0&&r.weekday===void 0&&r.dateStyle===void 0&&r.hour===void 0&&r.minute===void 0&&r.second===void 0&&r.fractionalSecondDigits===void 0&&r.timeStyle===void 0&&r.dayPeriod===void 0&&r.timeZoneName===void 0&&(r.timeZoneName="short"),r.timeZone=y(this,Tt),Nb(r.timeZone))throw new RangeError("toLocaleString does not currently support offset time zones");const s=new mi(t,r),o=$5.call(s).calendar,a=y(this,A);if(a!=="iso8601"&&o!=="iso8601"&&!rr(o,a))throw new RangeError(`cannot format ZonedDateTime with calendar ${a} in locale with calendar ${o}`);return s.format(Ki(y(this,it)))}toJSON(){return O(this,ft),Lb(this,"auto")}valueOf(){qs("ZonedDateTime")}startOfDay(){O(this,ft);const t=y(this,Tt);return Ge(as(t,Bi(this).isoDate),t,y(this,A))}getTimeZoneTransition(t){O(this,ft);const n=y(this,Tt);if(t===void 0)throw new TypeError("options parameter is required");const i=Nr(typeof t=="string"?Ho("direction",t):K(t),"direction",["next","previous"],Yr);if(i===void 0)throw new TypeError("direction option is required");if(Nb(n)||n==="UTC")return null;const r=y(this,it),s=i==="next"?Q0(n,r):gg(n,r);return s===null?null:Ge(s,n,y(this,A))}toInstant(){return O(this,ft),Ki(y(this,it))}toPlainDate(){return O(this,ft),vn(Bi(this).isoDate,y(this,A))}toPlainTime(){return O(this,ft),Mr(Bi(this).time)}toPlainDateTime(){return O(this,ft),fi(Bi(this),y(this,A))}static from(t,n=void 0){return dl(t,n)}static compare(t,n){const i=dl(t),r=dl(n),s=y(i,it),o=y(r,it);return v.lessThan(v.BigInt(s),v.BigInt(o))?-1:v.greaterThan(v.BigInt(s),v.BigInt(o))?1:0}}function Bi(e){return wi(y(e,Tt),y(e,it))}function on(e,t){O(e,ft);const n=Bi(e).isoDate;return Qu(e).isoToDate(n,{[t]:!0})[t]}function pa(e,t){return O(e,ft),Bi(e).time[t]}ts(uv,"Temporal.ZonedDateTime");var Ba=Object.freeze({__proto__:null,Duration:lc,Instant:sv,Now:ik,PlainDate:ov,PlainDateTime:av,PlainMonthDay:cv,PlainTime:oh,PlainYearMonth:lv,ZonedDateTime:uv});const T5=[sv,ov,av,lc,cv,oh,lv,uv];for(const e of T5){const t=Object.getOwnPropertyDescriptor(e,"prototype");(t.configurable||t.enumerable||t.writable)&&(t.configurable=!1,t.enumerable=!1,t.writable=!1,Object.defineProperty(e,"prototype",t))}function I5(e,t,n){return(t=A5(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qr(){return qr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)({}).hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},qr.apply(null,arguments)}function e_(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,i)}return n}function ar(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?e_(Object(n),!0).forEach(function(i){I5(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):e_(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function O5(e,t){if(e==null)return{};var n,i,r=P5(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function P5(e,t){if(e==null)return{};var n={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.indexOf(i)!==-1)continue;n[i]=e[i]}return n}function R5(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function A5(e){var t=R5(e,"string");return typeof t=="symbol"?t:t+""}function kg(e){"@babel/helpers - typeof";return kg=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},kg(e)}var L5="1.15.7";function zr(e){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(e)}var es=zr(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),ah=zr(/Edge/i),n_=zr(/firefox/i),Wl=zr(/safari/i)&&!zr(/chrome/i)&&!zr(/android/i),hv=zr(/iP(ad|od|hone)/i),rk=zr(/chrome/i)&&zr(/android/i),sk={capture:!1,passive:!1};function Ct(e,t,n){e.addEventListener(t,n,!es&&sk)}function yt(e,t,n){e.removeEventListener(t,n,!es&&sk)}function sf(e,t){if(t){if(t[0]===">"&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch{return!1}return!1}}function ok(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function Mi(e,t,n,i){if(e){n=n||document;do{if(t!=null&&(t[0]===">"?e.parentNode===n&&sf(e,t):sf(e,t))||i&&e===n)return e;if(e===n)break}while(e=ok(e))}return null}var i_=/\s+/g;function Un(e,t,n){if(e&&t)if(e.classList)e.classList[n?"add":"remove"](t);else{var i=(" "+e.className+" ").replace(i_," ").replace(" "+t+" "," ");e.className=(i+(n?" "+t:"")).replace(i_," ")}}function et(e,t,n){var i=e&&e.style;if(i){if(n===void 0)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(n=e.currentStyle),t===void 0?n:n[t];!(t in i)&&t.indexOf("webkit")===-1&&(t="-webkit-"+t),i[t]=n+(typeof n=="string"?"":"px")}}function Wa(e,t){var n="";if(typeof e=="string")n=e;else do{var i=et(e,"transform");i&&i!=="none"&&(n=i+" "+n)}while(!t&&(e=e.parentNode));var r=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return r&&new r(n)}function ak(e,t,n){if(e){var i=e.getElementsByTagName(t),r=0,s=i.length;if(n)for(;r<s;r++)n(i[r],r);return i}return[]}function Ji(){var e=document.scrollingElement;return e||document.documentElement}function ve(e,t,n,i,r){if(!(!e.getBoundingClientRect&&e!==window)){var s,o,a,c,l,u,h;if(e!==window&&e.parentNode&&e!==Ji()?(s=e.getBoundingClientRect(),o=s.top,a=s.left,c=s.bottom,l=s.right,u=s.height,h=s.width):(o=0,a=0,c=window.innerHeight,l=window.innerWidth,u=window.innerHeight,h=window.innerWidth),(t||n)&&e!==window&&(r=r||e.parentNode,!es))do if(r&&r.getBoundingClientRect&&(et(r,"transform")!=="none"||n&&et(r,"position")!=="static")){var d=r.getBoundingClientRect();o-=d.top+parseInt(et(r,"border-top-width")),a-=d.left+parseInt(et(r,"border-left-width")),c=o+s.height,l=a+s.width;break}while(r=r.parentNode);if(i&&e!==window){var f=Wa(r||e),p=f&&f.a,m=f&&f.d;f&&(o/=m,a/=p,h/=p,u/=m,c=o+u,l=a+h)}return{top:o,left:a,bottom:c,right:l,width:h,height:u}}}function r_(e,t,n){for(var i=bs(e,!0),r=ve(e)[t];i;){var s=ve(i)[n],o=void 0;if(o=r>=s,!o)return i;if(i===Ji())break;i=bs(i,!1)}return!1}function uc(e,t,n,i){for(var r=0,s=0,o=e.children;s<o.length;){if(o[s].style.display!=="none"&&o[s]!==nt.ghost&&(i||o[s]!==nt.dragged)&&Mi(o[s],n.draggable,e,!1)){if(r===t)return o[s];r++}s++}return null}function dv(e,t){for(var n=e.lastElementChild;n&&(n===nt.ghost||et(n,"display")==="none"||t&&!sf(n,t));)n=n.previousElementSibling;return n||null}function ci(e,t){var n=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)e.nodeName.toUpperCase()!=="TEMPLATE"&&e!==nt.clone&&(!t||sf(e,t))&&n++;return n}function s_(e){var t=0,n=0,i=Ji();if(e)do{var r=Wa(e),s=r.a,o=r.d;t+=e.scrollLeft*s,n+=e.scrollTop*o}while(e!==i&&(e=e.parentNode));return[t,n]}function N5(e,t){for(var n in e)if(e.hasOwnProperty(n)){for(var i in t)if(t.hasOwnProperty(i)&&t[i]===e[n][i])return Number(n)}return-1}function bs(e,t){if(!e||!e.getBoundingClientRect)return Ji();var n=e,i=!1;do if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var r=et(n);if(n.clientWidth<n.scrollWidth&&(r.overflowX=="auto"||r.overflowX=="scroll")||n.clientHeight<n.scrollHeight&&(r.overflowY=="auto"||r.overflowY=="scroll")){if(!n.getBoundingClientRect||n===document.body)return Ji();if(i||t)return n;i=!0}}while(n=n.parentNode);return Ji()}function F5(e,t){if(e&&t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function Zp(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}var Hl;function ck(e,t){return function(){if(!Hl){var n=arguments,i=this;n.length===1?e.call(i,n[0]):e.apply(i,n),Hl=setTimeout(function(){Hl=void 0},t)}}}function z5(){clearTimeout(Hl),Hl=void 0}function lk(e,t,n){e.scrollLeft+=t,e.scrollTop+=n}function uk(e){var t=window.Polymer,n=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):n?n(e).clone(!0)[0]:e.cloneNode(!0)}function hk(e,t,n){var i={};return Array.from(e.children).forEach(function(r){var s,o,a,c;if(!(!Mi(r,t.draggable,e,!1)||r.animated||r===n)){var l=ve(r);i.left=Math.min((s=i.left)!==null&&s!==void 0?s:1/0,l.left),i.top=Math.min((o=i.top)!==null&&o!==void 0?o:1/0,l.top),i.right=Math.max((a=i.right)!==null&&a!==void 0?a:-1/0,l.right),i.bottom=Math.max((c=i.bottom)!==null&&c!==void 0?c:-1/0,l.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var An="Sortable"+new Date().getTime();function j5(){var e=[],t;return{captureAnimationState:function(){if(e=[],!!this.options.animation){var i=[].slice.call(this.el.children);i.forEach(function(r){if(!(et(r,"display")==="none"||r===nt.ghost)){e.push({target:r,rect:ve(r)});var s=ar({},e[e.length-1].rect);if(r.thisAnimationDuration){var o=Wa(r,!0);o&&(s.top-=o.f,s.left-=o.e)}r.fromRect=s}})}},addAnimationState:function(i){e.push(i)},removeAnimationState:function(i){e.splice(N5(e,{target:i}),1)},animateAll:function(i){var r=this;if(!this.options.animation){clearTimeout(t),typeof i=="function"&&i();return}var s=!1,o=0;e.forEach(function(a){var c=0,l=a.target,u=l.fromRect,h=ve(l),d=l.prevFromRect,f=l.prevToRect,p=a.rect,m=Wa(l,!0);m&&(h.top-=m.f,h.left-=m.e),l.toRect=h,l.thisAnimationDuration&&Zp(d,h)&&!Zp(u,h)&&(p.top-h.top)/(p.left-h.left)===(u.top-h.top)/(u.left-h.left)&&(c=W5(p,d,f,r.options)),Zp(h,u)||(l.prevFromRect=u,l.prevToRect=h,c||(c=r.options.animation),r.animate(l,p,h,c)),c&&(s=!0,o=Math.max(o,c),clearTimeout(l.animationResetTimer),l.animationResetTimer=setTimeout(function(){l.animationTime=0,l.prevFromRect=null,l.fromRect=null,l.prevToRect=null,l.thisAnimationDuration=null},c),l.thisAnimationDuration=c)}),clearTimeout(t),s?t=setTimeout(function(){typeof i=="function"&&i()},o):typeof i=="function"&&i(),e=[]},animate:function(i,r,s,o){if(o){et(i,"transition",""),et(i,"transform","");var a=Wa(this.el),c=a&&a.a,l=a&&a.d,u=(r.left-s.left)/(c||1),h=(r.top-s.top)/(l||1);i.animatingX=!!u,i.animatingY=!!h,et(i,"transform","translate3d("+u+"px,"+h+"px,0)"),this.forRepaintDummy=B5(i),et(i,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),et(i,"transform","translate3d(0,0,0)"),typeof i.animated=="number"&&clearTimeout(i.animated),i.animated=setTimeout(function(){et(i,"transition",""),et(i,"transform",""),i.animated=!1,i.animatingX=!1,i.animatingY=!1},o)}}}}function B5(e){return e.offsetWidth}function W5(e,t,n,i){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-n.top,2)+Math.pow(t.left-n.left,2))*i.animation}var ma=[],Jp={initializeByDefault:!0},ch={mount:function(t){for(var n in Jp)Jp.hasOwnProperty(n)&&!(n in t)&&(t[n]=Jp[n]);ma.forEach(function(i){if(i.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")}),ma.push(t)},pluginEvent:function(t,n,i){var r=this;this.eventCanceled=!1,i.cancel=function(){r.eventCanceled=!0};var s=t+"Global";ma.forEach(function(o){n[o.pluginName]&&(n[o.pluginName][s]&&n[o.pluginName][s](ar({sortable:n},i)),n.options[o.pluginName]&&n[o.pluginName][t]&&n[o.pluginName][t](ar({sortable:n},i)))})},initializePlugins:function(t,n,i,r){ma.forEach(function(a){var c=a.pluginName;if(!(!t.options[c]&&!a.initializeByDefault)){var l=new a(t,n,t.options);l.sortable=t,l.options=t.options,t[c]=l,qr(i,l.defaults)}});for(var s in t.options)if(t.options.hasOwnProperty(s)){var o=this.modifyOption(t,s,t.options[s]);typeof o<"u"&&(t.options[s]=o)}},getEventProperties:function(t,n){var i={};return ma.forEach(function(r){typeof r.eventProperties=="function"&&qr(i,r.eventProperties.call(n[r.pluginName],t))}),i},modifyOption:function(t,n,i){var r;return ma.forEach(function(s){t[s.pluginName]&&s.optionListeners&&typeof s.optionListeners[n]=="function"&&(r=s.optionListeners[n].call(t[s.pluginName],i))}),r}};function H5(e){var t=e.sortable,n=e.rootEl,i=e.name,r=e.targetEl,s=e.cloneEl,o=e.toEl,a=e.fromEl,c=e.oldIndex,l=e.newIndex,u=e.oldDraggableIndex,h=e.newDraggableIndex,d=e.originalEvent,f=e.putSortable,p=e.extraEventProperties;if(t=t||n&&n[An],!!t){var m,g=t.options,b="on"+i.charAt(0).toUpperCase()+i.substr(1);window.CustomEvent&&!es&&!ah?m=new CustomEvent(i,{bubbles:!0,cancelable:!0}):(m=document.createEvent("Event"),m.initEvent(i,!0,!0)),m.to=o||n,m.from=a||n,m.item=r||n,m.clone=s,m.oldIndex=c,m.newIndex=l,m.oldDraggableIndex=u,m.newDraggableIndex=h,m.originalEvent=d,m.pullMode=f?f.lastPutMode:void 0;var _=ar(ar({},p),ch.getEventProperties(i,t));for(var C in _)m[C]=_[C];n&&n.dispatchEvent(m),g[b]&&g[b].call(t,m)}}var U5=["evt"],Mn=function(t,n){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=i.evt,s=O5(i,U5);ch.pluginEvent.bind(nt)(t,n,ar({dragEl:N,parentEl:ae,ghostEl:ct,rootEl:Vt,nextEl:co,lastDownEl:Qh,cloneEl:ee,cloneHidden:ps,dragStarted:pl,putSortable:Re,activeSortable:nt.active,originalEvent:r,oldIndex:Pa,oldDraggableIndex:Ul,newIndex:Yn,newDraggableIndex:ls,hideGhostForTarget:mk,unhideGhostForTarget:gk,cloneNowHidden:function(){ps=!0},cloneNowShown:function(){ps=!1},dispatchSortableEvent:function(a){an({sortable:n,name:a,originalEvent:r})}},s))};function an(e){H5(ar({putSortable:Re,cloneEl:ee,targetEl:N,rootEl:Vt,oldIndex:Pa,oldDraggableIndex:Ul,newIndex:Yn,newDraggableIndex:ls},e))}var N,ae,ct,Vt,co,Qh,ee,ps,Pa,Yn,Ul,ls,wh,Re,ka=!1,of=!1,af=[],to,Si,tm,em,o_,a_,pl,ga,Yl,ql=!1,xh=!1,Zh,Ue,nm=[],Sg=!1,cf=[],ep=typeof document<"u",Ch=hv,c_=ah||es?"cssFloat":"float",Y5=ep&&!rk&&!hv&&"draggable"in document.createElement("div"),dk=(function(){if(ep){if(es)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto",e.style.pointerEvents==="auto"}})(),fk=function(t,n){var i=et(t),r=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),s=uc(t,0,n),o=uc(t,1,n),a=s&&et(s),c=o&&et(o),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+ve(s).width,u=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+ve(o).width;if(i.display==="flex")return i.flexDirection==="column"||i.flexDirection==="column-reverse"?"vertical":"horizontal";if(i.display==="grid")return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(s&&a.float&&a.float!=="none"){var h=a.float==="left"?"left":"right";return o&&(c.clear==="both"||c.clear===h)?"vertical":"horizontal"}return s&&(a.display==="block"||a.display==="flex"||a.display==="table"||a.display==="grid"||l>=r&&i[c_]==="none"||o&&i[c_]==="none"&&l+u>r)?"vertical":"horizontal"},q5=function(t,n,i){var r=i?t.left:t.top,s=i?t.right:t.bottom,o=i?t.width:t.height,a=i?n.left:n.top,c=i?n.right:n.bottom,l=i?n.width:n.height;return r===a||s===c||r+o/2===a+l/2},V5=function(t,n){var i;return af.some(function(r){var s=r[An].options.emptyInsertThreshold;if(!(!s||dv(r))){var o=ve(r),a=t>=o.left-s&&t<=o.right+s,c=n>=o.top-s&&n<=o.bottom+s;if(a&&c)return i=r}}),i},pk=function(t){function n(s,o){return function(a,c,l,u){var h=a.options.group.name&&c.options.group.name&&a.options.group.name===c.options.group.name;if(s==null&&(o||h))return!0;if(s==null||s===!1)return!1;if(o&&s==="clone")return s;if(typeof s=="function")return n(s(a,c,l,u),o)(a,c,l,u);var d=(o?a:c).options.group.name;return s===!0||typeof s=="string"&&s===d||s.join&&s.indexOf(d)>-1}}var i={},r=t.group;(!r||kg(r)!="object")&&(r={name:r}),i.name=r.name,i.checkPull=n(r.pull,!0),i.checkPut=n(r.put),i.revertClone=r.revertClone,t.group=i},mk=function(){!dk&&ct&&et(ct,"display","none")},gk=function(){!dk&&ct&&et(ct,"display","")};ep&&!rk&&document.addEventListener("click",function(e){if(of)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),of=!1,!1},!0);var eo=function(t){if(N){t=t.touches?t.touches[0]:t;var n=V5(t.clientX,t.clientY);if(n){var i={};for(var r in t)t.hasOwnProperty(r)&&(i[r]=t[r]);i.target=i.rootEl=n,i.preventDefault=void 0,i.stopPropagation=void 0,n[An]._onDragOver(i)}}},K5=function(t){N&&N.parentNode[An]._isOutsideThisEl(t.target)};function nt(e,t){if(!(e&&e.nodeType&&e.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=qr({},t),e[An]=this;var n={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return fk(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(o,a){o.setData("Text",a.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:nt.supportPointer!==!1&&"PointerEvent"in window&&(!Wl||hv),emptyInsertThreshold:5};ch.initializePlugins(this,e,n);for(var i in n)!(i in t)&&(t[i]=n[i]);pk(t);for(var r in this)r.charAt(0)==="_"&&typeof this[r]=="function"&&(this[r]=this[r].bind(this));this.nativeDraggable=t.forceFallback?!1:Y5,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?Ct(e,"pointerdown",this._onTapStart):(Ct(e,"mousedown",this._onTapStart),Ct(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(Ct(e,"dragover",this),Ct(e,"dragenter",this)),af.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),qr(this,j5())}nt.prototype={constructor:nt,_isOutsideThisEl:function(t){!this.el.contains(t)&&t!==this.el&&(ga=null)},_getDirection:function(t,n){return typeof this.options.direction=="function"?this.options.direction.call(this,t,n,N):this.options.direction},_onTapStart:function(t){if(t.cancelable){var n=this,i=this.el,r=this.options,s=r.preventOnFilter,o=t.type,a=t.touches&&t.touches[0]||t.pointerType&&t.pointerType==="touch"&&t,c=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||c,u=r.filter;if(n3(i),!N&&!(/mousedown|pointerdown/.test(o)&&t.button!==0||r.disabled)&&!l.isContentEditable&&!(!this.nativeDraggable&&Wl&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=Mi(c,r.draggable,i,!1),!(c&&c.animated)&&Qh!==c)){if(Pa=ci(c),Ul=ci(c,r.draggable),typeof u=="function"){if(u.call(this,t,c,this)){an({sortable:n,rootEl:l,name:"filter",targetEl:c,toEl:i,fromEl:i}),Mn("filter",n,{evt:t}),s&&t.preventDefault();return}}else if(u&&(u=u.split(",").some(function(h){if(h=Mi(l,h.trim(),i,!1),h)return an({sortable:n,rootEl:h,name:"filter",targetEl:c,fromEl:i,toEl:i}),Mn("filter",n,{evt:t}),!0}),u)){s&&t.preventDefault();return}r.handle&&!Mi(l,r.handle,i,!1)||this._prepareDragStart(t,a,c)}}},_prepareDragStart:function(t,n,i){var r=this,s=r.el,o=r.options,a=s.ownerDocument,c;if(i&&!N&&i.parentNode===s){var l=ve(i);if(Vt=s,N=i,ae=N.parentNode,co=N.nextSibling,Qh=i,wh=o.group,nt.dragged=N,to={target:N,clientX:(n||t).clientX,clientY:(n||t).clientY},o_=to.clientX-l.left,a_=to.clientY-l.top,this._lastX=(n||t).clientX,this._lastY=(n||t).clientY,N.style["will-change"]="all",c=function(){if(Mn("delayEnded",r,{evt:t}),nt.eventCanceled){r._onDrop();return}r._disableDelayedDragEvents(),!n_&&r.nativeDraggable&&(N.draggable=!0),r._triggerDragStart(t,n),an({sortable:r,name:"choose",originalEvent:t}),Un(N,o.chosenClass,!0)},o.ignore.split(",").forEach(function(u){ak(N,u.trim(),im)}),Ct(a,"dragover",eo),Ct(a,"mousemove",eo),Ct(a,"touchmove",eo),o.supportPointer?(Ct(a,"pointerup",r._onDrop),!this.nativeDraggable&&Ct(a,"pointercancel",r._onDrop)):(Ct(a,"mouseup",r._onDrop),Ct(a,"touchend",r._onDrop),Ct(a,"touchcancel",r._onDrop)),n_&&this.nativeDraggable&&(this.options.touchStartThreshold=4,N.draggable=!0),Mn("delayStart",this,{evt:t}),o.delay&&(!o.delayOnTouchOnly||n)&&(!this.nativeDraggable||!(ah||es))){if(nt.eventCanceled){this._onDrop();return}o.supportPointer?(Ct(a,"pointerup",r._disableDelayedDrag),Ct(a,"pointercancel",r._disableDelayedDrag)):(Ct(a,"mouseup",r._disableDelayedDrag),Ct(a,"touchend",r._disableDelayedDrag),Ct(a,"touchcancel",r._disableDelayedDrag)),Ct(a,"mousemove",r._delayedDragTouchMoveHandler),Ct(a,"touchmove",r._delayedDragTouchMoveHandler),o.supportPointer&&Ct(a,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=setTimeout(c,o.delay)}else c()}},_delayedDragTouchMoveHandler:function(t){var n=t.touches?t.touches[0]:t;Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){N&&im(N),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;yt(t,"mouseup",this._disableDelayedDrag),yt(t,"touchend",this._disableDelayedDrag),yt(t,"touchcancel",this._disableDelayedDrag),yt(t,"pointerup",this._disableDelayedDrag),yt(t,"pointercancel",this._disableDelayedDrag),yt(t,"mousemove",this._delayedDragTouchMoveHandler),yt(t,"touchmove",this._delayedDragTouchMoveHandler),yt(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,n){n=n||t.pointerType=="touch"&&t,!this.nativeDraggable||n?this.options.supportPointer?Ct(document,"pointermove",this._onTouchMove):n?Ct(document,"touchmove",this._onTouchMove):Ct(document,"mousemove",this._onTouchMove):(Ct(N,"dragend",this),Ct(Vt,"dragstart",this._onDragStart));try{document.selection?Jh(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(t,n){if(ka=!1,Vt&&N){Mn("dragStarted",this,{evt:n}),this.nativeDraggable&&Ct(document,"dragover",K5);var i=this.options;!t&&Un(N,i.dragClass,!1),Un(N,i.ghostClass,!0),nt.active=this,t&&this._appendGhost(),an({sortable:this,name:"start",originalEvent:n})}else this._nulling()},_emulateDragOver:function(){if(Si){this._lastX=Si.clientX,this._lastY=Si.clientY,mk();for(var t=document.elementFromPoint(Si.clientX,Si.clientY),n=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(Si.clientX,Si.clientY),t!==n);)n=t;if(N.parentNode[An]._isOutsideThisEl(t),n)do{if(n[An]){var i=void 0;if(i=n[An]._onDragOver({clientX:Si.clientX,clientY:Si.clientY,target:t,rootEl:n}),i&&!this.options.dragoverBubble)break}t=n}while(n=ok(n));gk()}},_onTouchMove:function(t){if(to){var n=this.options,i=n.fallbackTolerance,r=n.fallbackOffset,s=t.touches?t.touches[0]:t,o=ct&&Wa(ct,!0),a=ct&&o&&o.a,c=ct&&o&&o.d,l=Ch&&Ue&&s_(Ue),u=(s.clientX-to.clientX+r.x)/(a||1)+(l?l[0]-nm[0]:0)/(a||1),h=(s.clientY-to.clientY+r.y)/(c||1)+(l?l[1]-nm[1]:0)/(c||1);if(!nt.active&&!ka){if(i&&Math.max(Math.abs(s.clientX-this._lastX),Math.abs(s.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(ct){o?(o.e+=u-(tm||0),o.f+=h-(em||0)):o={a:1,b:0,c:0,d:1,e:u,f:h};var d="matrix(".concat(o.a,",").concat(o.b,",").concat(o.c,",").concat(o.d,",").concat(o.e,",").concat(o.f,")");et(ct,"webkitTransform",d),et(ct,"mozTransform",d),et(ct,"msTransform",d),et(ct,"transform",d),tm=u,em=h,Si=s}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!ct){var t=this.options.fallbackOnBody?document.body:Vt,n=ve(N,!0,Ch,!0,t),i=this.options;if(Ch){for(Ue=t;et(Ue,"position")==="static"&&et(Ue,"transform")==="none"&&Ue!==document;)Ue=Ue.parentNode;Ue!==document.body&&Ue!==document.documentElement?(Ue===document&&(Ue=Ji()),n.top+=Ue.scrollTop,n.left+=Ue.scrollLeft):Ue=Ji(),nm=s_(Ue)}ct=N.cloneNode(!0),Un(ct,i.ghostClass,!1),Un(ct,i.fallbackClass,!0),Un(ct,i.dragClass,!0),et(ct,"transition",""),et(ct,"transform",""),et(ct,"box-sizing","border-box"),et(ct,"margin",0),et(ct,"top",n.top),et(ct,"left",n.left),et(ct,"width",n.width),et(ct,"height",n.height),et(ct,"opacity","0.8"),et(ct,"position",Ch?"absolute":"fixed"),et(ct,"zIndex","100000"),et(ct,"pointerEvents","none"),nt.ghost=ct,t.appendChild(ct),et(ct,"transform-origin",o_/parseInt(ct.style.width)*100+"% "+a_/parseInt(ct.style.height)*100+"%")}},_onDragStart:function(t,n){var i=this,r=t.dataTransfer,s=i.options;if(Mn("dragStart",this,{evt:t}),nt.eventCanceled){this._onDrop();return}Mn("setupClone",this),nt.eventCanceled||(ee=uk(N),ee.removeAttribute("id"),ee.draggable=!1,ee.style["will-change"]="",this._hideClone(),Un(ee,this.options.chosenClass,!1),nt.clone=ee),i.cloneId=Jh(function(){Mn("clone",i),!nt.eventCanceled&&(i.options.removeCloneOnHide||Vt.insertBefore(ee,N),i._hideClone(),an({sortable:i,name:"clone"}))}),!n&&Un(N,s.dragClass,!0),n?(of=!0,i._loopId=setInterval(i._emulateDragOver,50)):(yt(document,"mouseup",i._onDrop),yt(document,"touchend",i._onDrop),yt(document,"touchcancel",i._onDrop),r&&(r.effectAllowed="move",s.setData&&s.setData.call(i,r,N)),Ct(document,"drop",i),et(N,"transform","translateZ(0)")),ka=!0,i._dragStartId=Jh(i._dragStarted.bind(i,n,t)),Ct(document,"selectstart",i),pl=!0,window.getSelection().removeAllRanges(),Wl&&et(document.body,"user-select","none")},_onDragOver:function(t){var n=this.el,i=t.target,r,s,o,a=this.options,c=a.group,l=nt.active,u=wh===c,h=a.sort,d=Re||l,f,p=this,m=!1;if(Sg)return;function g(G,B){Mn(G,p,ar({evt:t,isOwner:u,axis:f?"vertical":"horizontal",revert:o,dragRect:r,targetRect:s,canSort:h,fromSortable:d,target:i,completed:_,onMove:function(W,V){return kh(Vt,n,N,r,W,ve(W),t,V)},changed:C},B))}function b(){g("dragOverAnimationCapture"),p.captureAnimationState(),p!==d&&d.captureAnimationState()}function _(G){return g("dragOverCompleted",{insertion:G}),G&&(u?l._hideClone():l._showClone(p),p!==d&&(Un(N,Re?Re.options.ghostClass:l.options.ghostClass,!1),Un(N,a.ghostClass,!0)),Re!==p&&p!==nt.active?Re=p:p===nt.active&&Re&&(Re=null),d===p&&(p._ignoreWhileAnimating=i),p.animateAll(function(){g("dragOverAnimationComplete"),p._ignoreWhileAnimating=null}),p!==d&&(d.animateAll(),d._ignoreWhileAnimating=null)),(i===N&&!N.animated||i===n&&!i.animated)&&(ga=null),!a.dragoverBubble&&!t.rootEl&&i!==document&&(N.parentNode[An]._isOutsideThisEl(t.target),!G&&eo(t)),!a.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),m=!0}function C(){Yn=ci(N),ls=ci(N,a.draggable),an({sortable:p,name:"change",toEl:n,newIndex:Yn,newDraggableIndex:ls,originalEvent:t})}if(t.preventDefault!==void 0&&t.cancelable&&t.preventDefault(),i=Mi(i,a.draggable,n,!0),g("dragOver"),nt.eventCanceled)return m;if(N.contains(t.target)||i.animated&&i.animatingX&&i.animatingY||p._ignoreWhileAnimating===i)return _(!1);if(of=!1,l&&!a.disabled&&(u?h||(o=ae!==Vt):Re===this||(this.lastPutMode=wh.checkPull(this,l,N,t))&&c.checkPut(this,l,N,t))){if(f=this._getDirection(t,i)==="vertical",r=ve(N),g("dragOverValid"),nt.eventCanceled)return m;if(o)return ae=Vt,b(),this._hideClone(),g("revert"),nt.eventCanceled||(co?Vt.insertBefore(N,co):Vt.appendChild(N)),_(!0);var S=dv(n,a.draggable);if(!S||Z5(t,f,this)&&!S.animated){if(S===N)return _(!1);if(S&&n===t.target&&(i=S),i&&(s=ve(i)),kh(Vt,n,N,r,i,s,t,!!i)!==!1)return b(),S&&S.nextSibling?n.insertBefore(N,S.nextSibling):n.appendChild(N),ae=n,C(),_(!0)}else if(S&&Q5(t,f,this)){var k=uc(n,0,a,!0);if(k===N)return _(!1);if(i=k,s=ve(i),kh(Vt,n,N,r,i,s,t,!1)!==!1)return b(),n.insertBefore(N,k),ae=n,C(),_(!0)}else if(i.parentNode===n){s=ve(i);var $=0,D,w=N.parentNode!==n,x=!q5(N.animated&&N.toRect||r,i.animated&&i.toRect||s,f),M=f?"top":"left",I=r_(i,"top","top")||r_(N,"top","top"),T=I?I.scrollTop:void 0;ga!==i&&(D=s[M],ql=!1,xh=!x&&a.invertSwap||w),$=J5(t,i,s,f,x?1:a.swapThreshold,a.invertedSwapThreshold==null?a.swapThreshold:a.invertedSwapThreshold,xh,ga===i);var R;if($!==0){var j=ci(N);do j-=$,R=ae.children[j];while(R&&(et(R,"display")==="none"||R===ct))}if($===0||R===i)return _(!1);ga=i,Yl=$;var z=i.nextElementSibling,Y=!1;Y=$===1;var F=kh(Vt,n,N,r,i,s,t,Y);if(F!==!1)return(F===1||F===-1)&&(Y=F===1),Sg=!0,setTimeout(X5,30),b(),Y&&!z?n.appendChild(N):i.parentNode.insertBefore(N,Y?z:i),I&&lk(I,0,T-I.scrollTop),ae=N.parentNode,D!==void 0&&!xh&&(Zh=Math.abs(D-ve(i)[M])),C(),_(!0)}if(n.contains(N))return _(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){yt(document,"mousemove",this._onTouchMove),yt(document,"touchmove",this._onTouchMove),yt(document,"pointermove",this._onTouchMove),yt(document,"dragover",eo),yt(document,"mousemove",eo),yt(document,"touchmove",eo)},_offUpEvents:function(){var t=this.el.ownerDocument;yt(t,"mouseup",this._onDrop),yt(t,"touchend",this._onDrop),yt(t,"pointerup",this._onDrop),yt(t,"pointercancel",this._onDrop),yt(t,"touchcancel",this._onDrop),yt(document,"selectstart",this)},_onDrop:function(t){var n=this.el,i=this.options;if(Yn=ci(N),ls=ci(N,i.draggable),Mn("drop",this,{evt:t}),ae=N&&N.parentNode,Yn=ci(N),ls=ci(N,i.draggable),nt.eventCanceled){this._nulling();return}ka=!1,xh=!1,ql=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Eg(this.cloneId),Eg(this._dragStartId),this.nativeDraggable&&(yt(document,"drop",this),yt(n,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Wl&&et(document.body,"user-select",""),et(N,"transform",""),t&&(pl&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),ct&&ct.parentNode&&ct.parentNode.removeChild(ct),(Vt===ae||Re&&Re.lastPutMode!=="clone")&&ee&&ee.parentNode&&ee.parentNode.removeChild(ee),N&&(this.nativeDraggable&&yt(N,"dragend",this),im(N),N.style["will-change"]="",pl&&!ka&&Un(N,Re?Re.options.ghostClass:this.options.ghostClass,!1),Un(N,this.options.chosenClass,!1),an({sortable:this,name:"unchoose",toEl:ae,newIndex:null,newDraggableIndex:null,originalEvent:t}),Vt!==ae?(Yn>=0&&(an({rootEl:ae,name:"add",toEl:ae,fromEl:Vt,originalEvent:t}),an({sortable:this,name:"remove",toEl:ae,originalEvent:t}),an({rootEl:ae,name:"sort",toEl:ae,fromEl:Vt,originalEvent:t}),an({sortable:this,name:"sort",toEl:ae,originalEvent:t})),Re&&Re.save()):Yn!==Pa&&Yn>=0&&(an({sortable:this,name:"update",toEl:ae,originalEvent:t}),an({sortable:this,name:"sort",toEl:ae,originalEvent:t})),nt.active&&((Yn==null||Yn===-1)&&(Yn=Pa,ls=Ul),an({sortable:this,name:"end",toEl:ae,originalEvent:t}),this.save()))),this._nulling()},_nulling:function(){Mn("nulling",this),Vt=N=ae=ct=co=ee=Qh=ps=to=Si=pl=Yn=ls=Pa=Ul=ga=Yl=Re=wh=nt.dragged=nt.ghost=nt.clone=nt.active=null;var t=this.el;cf.forEach(function(n){t.contains(n)&&(n.checked=!0)}),cf.length=tm=em=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":N&&(this._onDragOver(t),G5(t));break;case"selectstart":t.preventDefault();break}},toArray:function(){for(var t=[],n,i=this.el.children,r=0,s=i.length,o=this.options;r<s;r++)n=i[r],Mi(n,o.draggable,this.el,!1)&&t.push(n.getAttribute(o.dataIdAttr)||e3(n));return t},sort:function(t,n){var i={},r=this.el;this.toArray().forEach(function(s,o){var a=r.children[o];Mi(a,this.options.draggable,r,!1)&&(i[s]=a)},this),n&&this.captureAnimationState(),t.forEach(function(s){i[s]&&(r.removeChild(i[s]),r.appendChild(i[s]))}),n&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,n){return Mi(t,n||this.options.draggable,this.el,!1)},option:function(t,n){var i=this.options;if(n===void 0)return i[t];var r=ch.modifyOption(this,t,n);typeof r<"u"?i[t]=r:i[t]=n,t==="group"&&pk(i)},destroy:function(){Mn("destroy",this);var t=this.el;t[An]=null,yt(t,"mousedown",this._onTapStart),yt(t,"touchstart",this._onTapStart),yt(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(yt(t,"dragover",this),yt(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(n){n.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),af.splice(af.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!ps){if(Mn("hideClone",this),nt.eventCanceled)return;et(ee,"display","none"),this.options.removeCloneOnHide&&ee.parentNode&&ee.parentNode.removeChild(ee),ps=!0}},_showClone:function(t){if(t.lastPutMode!=="clone"){this._hideClone();return}if(ps){if(Mn("showClone",this),nt.eventCanceled)return;N.parentNode==Vt&&!this.options.group.revertClone?Vt.insertBefore(ee,N):co?Vt.insertBefore(ee,co):Vt.appendChild(ee),this.options.group.revertClone&&this.animate(N,ee),et(ee,"display",""),ps=!1}}};function G5(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}function kh(e,t,n,i,r,s,o,a){var c,l=e[An],u=l.options.onMove,h;return window.CustomEvent&&!es&&!ah?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=t,c.from=e,c.dragged=n,c.draggedRect=i,c.related=r||t,c.relatedRect=s||ve(t),c.willInsertAfter=a,c.originalEvent=o,e.dispatchEvent(c),u&&(h=u.call(l,c,o)),h}function im(e){e.draggable=!1}function X5(){Sg=!1}function Q5(e,t,n){var i=ve(uc(n.el,0,n.options,!0)),r=hk(n.el,n.options,ct),s=10;return t?e.clientX<r.left-s||e.clientY<i.top&&e.clientX<i.right:e.clientY<r.top-s||e.clientY<i.bottom&&e.clientX<i.left}function Z5(e,t,n){var i=ve(dv(n.el,n.options.draggable)),r=hk(n.el,n.options,ct),s=10;return t?e.clientX>r.right+s||e.clientY>i.bottom&&e.clientX>i.left:e.clientY>r.bottom+s||e.clientX>i.right&&e.clientY>i.top}function J5(e,t,n,i,r,s,o,a){var c=i?e.clientY:e.clientX,l=i?n.height:n.width,u=i?n.top:n.left,h=i?n.bottom:n.right,d=!1;if(!o){if(a&&Zh<l*r){if(!ql&&(Yl===1?c>u+l*s/2:c<h-l*s/2)&&(ql=!0),ql)d=!0;else if(Yl===1?c<u+Zh:c>h-Zh)return-Yl}else if(c>u+l*(1-r)/2&&c<h-l*(1-r)/2)return t3(t)}return d=d||o,d&&(c<u+l*s/2||c>h-l*s/2)?c>u+l/2?1:-1:0}function t3(e){return ci(N)<ci(e)?1:-1}function e3(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,n=t.length,i=0;n--;)i+=t.charCodeAt(n);return i.toString(36)}function n3(e){cf.length=0;for(var t=e.getElementsByTagName("input"),n=t.length;n--;){var i=t[n];i.checked&&cf.push(i)}}function Jh(e){return setTimeout(e,0)}function Eg(e){return clearTimeout(e)}ep&&Ct(document,"touchmove",function(e){(nt.active||ka)&&e.cancelable&&e.preventDefault()});nt.utils={on:Ct,off:yt,css:et,find:ak,is:function(t,n){return!!Mi(t,n,t,!1)},extend:F5,throttle:ck,closest:Mi,toggleClass:Un,clone:uk,index:ci,nextTick:Jh,cancelNextTick:Eg,detectDirection:fk,getChild:uc,expando:An};nt.get=function(e){return e[An]};nt.mount=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t[0].constructor===Array&&(t=t[0]),t.forEach(function(i){if(!i.prototype||!i.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));i.utils&&(nt.utils=ar(ar({},nt.utils),i.utils)),ch.mount(i)})};nt.create=function(e,t){return new nt(e,t)};nt.version=L5;var me=[],ml,Mg,Dg=!1,rm,sm,lf,gl;function i3(){function e(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var t in this)t.charAt(0)==="_"&&typeof this[t]=="function"&&(this[t]=this[t].bind(this))}return e.prototype={dragStarted:function(n){var i=n.originalEvent;this.sortable.nativeDraggable?Ct(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Ct(document,"pointermove",this._handleFallbackAutoScroll):i.touches?Ct(document,"touchmove",this._handleFallbackAutoScroll):Ct(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(n){var i=n.originalEvent;!this.options.dragOverBubble&&!i.rootEl&&this._handleAutoScroll(i)},drop:function(){this.sortable.nativeDraggable?yt(document,"dragover",this._handleAutoScroll):(yt(document,"pointermove",this._handleFallbackAutoScroll),yt(document,"touchmove",this._handleFallbackAutoScroll),yt(document,"mousemove",this._handleFallbackAutoScroll)),l_(),td(),z5()},nulling:function(){lf=Mg=ml=Dg=gl=rm=sm=null,me.length=0},_handleFallbackAutoScroll:function(n){this._handleAutoScroll(n,!0)},_handleAutoScroll:function(n,i){var r=this,s=(n.touches?n.touches[0]:n).clientX,o=(n.touches?n.touches[0]:n).clientY,a=document.elementFromPoint(s,o);if(lf=n,i||this.options.forceAutoScrollFallback||ah||es||Wl){om(n,this.options,a,i);var c=bs(a,!0);Dg&&(!gl||s!==rm||o!==sm)&&(gl&&l_(),gl=setInterval(function(){var l=bs(document.elementFromPoint(s,o),!0);l!==c&&(c=l,td()),om(n,r.options,l,i)},10),rm=s,sm=o)}else{if(!this.options.bubbleScroll||bs(a,!0)===Ji()){td();return}om(n,this.options,bs(a,!1),!1)}}},qr(e,{pluginName:"scroll",initializeByDefault:!0})}function td(){me.forEach(function(e){clearInterval(e.pid)}),me=[]}function l_(){clearInterval(gl)}var om=ck(function(e,t,n,i){if(t.scroll){var r=(e.touches?e.touches[0]:e).clientX,s=(e.touches?e.touches[0]:e).clientY,o=t.scrollSensitivity,a=t.scrollSpeed,c=Ji(),l=!1,u;Mg!==n&&(Mg=n,td(),ml=t.scroll,u=t.scrollFn,ml===!0&&(ml=bs(n,!0)));var h=0,d=ml;do{var f=d,p=ve(f),m=p.top,g=p.bottom,b=p.left,_=p.right,C=p.width,S=p.height,k=void 0,$=void 0,D=f.scrollWidth,w=f.scrollHeight,x=et(f),M=f.scrollLeft,I=f.scrollTop;f===c?(k=C<D&&(x.overflowX==="auto"||x.overflowX==="scroll"||x.overflowX==="visible"),$=S<w&&(x.overflowY==="auto"||x.overflowY==="scroll"||x.overflowY==="visible")):(k=C<D&&(x.overflowX==="auto"||x.overflowX==="scroll"),$=S<w&&(x.overflowY==="auto"||x.overflowY==="scroll"));var T=k&&(Math.abs(_-r)<=o&&M+C<D)-(Math.abs(b-r)<=o&&!!M),R=$&&(Math.abs(g-s)<=o&&I+S<w)-(Math.abs(m-s)<=o&&!!I);if(!me[h])for(var j=0;j<=h;j++)me[j]||(me[j]={});(me[h].vx!=T||me[h].vy!=R||me[h].el!==f)&&(me[h].el=f,me[h].vx=T,me[h].vy=R,clearInterval(me[h].pid),(T!=0||R!=0)&&(l=!0,me[h].pid=setInterval((function(){i&&this.layer===0&&nt.active._onTouchMove(lf);var z=me[this.layer].vy?me[this.layer].vy*a:0,Y=me[this.layer].vx?me[this.layer].vx*a:0;typeof u=="function"&&u.call(nt.dragged.parentNode[An],Y,z,e,lf,me[this.layer].el)!=="continue"||lk(me[this.layer].el,Y,z)}).bind({layer:h}),24))),h++}while(t.bubbleScroll&&d!==c&&(d=bs(d,!1)));Dg=l}},30),vk=function(t){var n=t.originalEvent,i=t.putSortable,r=t.dragEl,s=t.activeSortable,o=t.dispatchSortableEvent,a=t.hideGhostForTarget,c=t.unhideGhostForTarget;if(n){var l=i||s;a();var u=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:n,h=document.elementFromPoint(u.clientX,u.clientY);c(),l&&!l.el.contains(h)&&(o("spill"),this.onSpill({dragEl:r,putSortable:i}))}};function fv(){}fv.prototype={startIndex:null,dragStart:function(t){var n=t.oldDraggableIndex;this.startIndex=n},onSpill:function(t){var n=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var r=uc(this.sortable.el,this.startIndex,this.options);r?this.sortable.el.insertBefore(n,r):this.sortable.el.appendChild(n),this.sortable.animateAll(),i&&i.animateAll()},drop:vk};qr(fv,{pluginName:"revertOnSpill"});function pv(){}pv.prototype={onSpill:function(t){var n=t.dragEl,i=t.putSortable,r=i||this.sortable;r.captureAnimationState(),n.parentNode&&n.parentNode.removeChild(n),r.animateAll()},drop:vk};qr(pv,{pluginName:"removeOnSpill"});nt.mount(new i3);nt.mount(pv,fv);class vi{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).dashboardCharts.subscribe(t)}static async all(){return(await(await Z()).dashboardCharts.all()).sort((i,r)=>i.position-r.position).map(i=>new vi(i))}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.dashboardCharts.put(i),new vi(i)}static async update(t,n){const i=await Z(),r=await i.dashboardCharts.get(t);await i.dashboardCharts.put({...r,...n})}static async remove(t){await(await Z()).dashboardCharts.remove(t)}static async reorder(t){const n=await Z();await Promise.all(t.map(async(i,r)=>{const s=await n.dashboardCharts.get(i);await n.dashboardCharts.put({...s,position:r})}))}}class cr{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).dashboardTables.subscribe(t)}static async all(){return(await(await Z()).dashboardTables.all()).sort((i,r)=>i.position-r.position).map(i=>new cr(i))}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.dashboardTables.put(i),new cr(i)}static async update(t,n){const i=await Z(),r=await i.dashboardTables.get(t);await i.dashboardTables.put({...r,...n})}static async remove(t){await(await Z()).dashboardTables.remove(t)}static async reorder(t){const n=await Z();await Promise.all(t.map(async(i,r)=>{const s=await n.dashboardTables.get(i);await n.dashboardTables.put({...s,position:r})}))}}const Tc=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-trash-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,Ic=dt`
  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    color: var(--budgee-text-muted);
    transition:
      color 0.15s,
      background-color 0.15s;
  }
  .icon-btn:hover {
    color: var(--budgee-text);
    background-color: color-mix(in lch, var(--budgee-text) 10%, transparent);
  }
  .icon-btn svg {
    width: 20px;
    height: 20px;
  }
  .icon-btn--danger:hover {
    color: var(--budgee-danger);
    background-color: color-mix(in lch, var(--budgee-danger) 15%, transparent);
  }
`;var r3=Object.defineProperty,s3=Object.getOwnPropertyDescriptor,yk=e=>{throw TypeError(e)},lh=(e,t,n,i)=>{for(var r=i>1?void 0:i?s3(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&r3(t,n,r),r},o3=(e,t,n)=>t.has(e)||yk("Cannot "+n),a3=(e,t,n)=>t.has(e)?yk("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),$i=(e,t,n)=>(o3(e,t,"access private method"),n),Qn,np,bk,_k,vl,wk,xk;const c3=[{value:"tag",label:"Tag"},{value:"merchant",label:"Merchant"},{value:"amount",label:"Amount"},{value:"description",label:"Description"}],Ck={tag:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],merchant:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],amount:[{value:"lt",label:"<"},{value:"gt",label:">"},{value:"lte",label:"<="},{value:"gte",label:">="}],description:[{value:"contains",label:"contains"},{value:"excludes",label:"excludes"}]};let Yo=class extends gt{constructor(){super(...arguments),a3(this,Qn),this.condition={field:"tag",operator:"is",value:""},this.index=0,this.tags=[],this.merchants=[]}render(){const e=Ck[this.condition.field];return E`
      <select @change=${$i(this,Qn,bk)}>
        ${c3.map(t=>E`<option value=${t.value} ?selected=${this.condition.field===t.value}>${t.label}</option>`)}
      </select>
      <select @change=${$i(this,Qn,_k)}>
        ${e.map(t=>E`<option value=${t.value} ?selected=${this.condition.operator===t.value}>${t.label}</option>`)}
      </select>
      ${$i(this,Qn,xk).call(this)}
      <button class="icon-btn icon-btn--danger" title="Remove filter" aria-label="Remove filter" @click=${$i(this,Qn,wk)}>${ye(Tc)}</button>
    `}};Qn=new WeakSet;np=function(e){this.dispatchEvent(new CustomEvent("filter-changed",{detail:{index:this.index,condition:e}}))};bk=function(e){const t=e.target.value,n=Ck[t];$i(this,Qn,np).call(this,{field:t,operator:n[0].value,value:""})};_k=function(e){const t=e.target.value;$i(this,Qn,np).call(this,{...this.condition,operator:t})};vl=function(e){const t=e.target.value;$i(this,Qn,np).call(this,{...this.condition,value:t})};wk=function(){this.dispatchEvent(new CustomEvent("filter-removed",{detail:{index:this.index}}))};xk=function(){const{field:e}=this.condition;return e==="tag"?E`
        <select @change=${$i(this,Qn,vl)}>
          <option value="">--</option>
          ${this.tags.map(t=>E`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="merchant"?E`
        <select @change=${$i(this,Qn,vl)}>
          <option value="">--</option>
          ${this.merchants.map(t=>E`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="amount"?E`
        <input
          type="number"
          placeholder="e.g. 0"
          .value=${this.condition.value}
          @input=${$i(this,Qn,vl)}
        />
      `:E`
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${$i(this,Qn,vl)}
      />
    `};Yo.styles=[Ic,fr,dt`
      :host {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.25rem;
      }
      select,
      input {
        padding: 4px 8px;
      }
      input {
        flex: 1;
      }
    `];lh([H({type:Object})],Yo.prototype,"condition",2);lh([H({type:Number})],Yo.prototype,"index",2);lh([H({type:Array})],Yo.prototype,"tags",2);lh([H({type:Array})],Yo.prototype,"merchants",2);Yo=lh([Et("chart-filter-row")],Yo);var l3=Object.defineProperty,u3=Object.getOwnPropertyDescriptor,kk=e=>{throw TypeError(e)},Wn=(e,t,n,i)=>{for(var r=i>1?void 0:i?u3(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&l3(t,n,r),r},h3=(e,t,n)=>t.has(e)||kk("Cannot "+n),d3=(e,t,n)=>t.has(e)?kk("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),lo=(e,t,n)=>(h3(e,t,"access private method"),n),xr,Sk,Ek,Mk,Dk,$k,Tk,Ik;const am=new Set(["pie","doughnut"]);let tn=class extends gt{constructor(){super(...arguments),d3(this,xr),this.transactions=[],this.tags=[],this.merchants=[],this._title="",this._chartType="bar",this._granularity="month",this._filters=[],this._excludedTagIds=[],this._excludedMerchantIds=[],this._legendPosition="top",this._showExclusions=!1,this._initialized=!1}updated(e){e.has("editingChart")&&this.editingChart&&!this._initialized&&(this._title=this.editingChart.title,this._chartType=this.editingChart.chartType,this._granularity=this.editingChart.granularity,this._filters=this.editingChart.filters??lo(this,xr,Sk).call(this,this.editingChart),this._excludedTagIds=this.editingChart.excludedTagIds??[],this._excludedMerchantIds=this.editingChart.excludedMerchantIds??[],this._legendPosition=this.editingChart.legendPosition??"top",this._initialized=!0)}render(){return E`
      <h4>${this.editingChart?"Edit Chart":"Add Chart"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${e=>{this._title=e.target.value}}
        />
        <label>Type:</label>
        <select @change=${e=>{this._chartType=e.target.value,am.has(this._chartType)&&!["byTag","byMerchant","month"].includes(this._granularity)&&(this._granularity="byTag")}}>
          <option value="bar" ?selected=${this._chartType==="bar"}>Bar</option>
          <option value="line" ?selected=${this._chartType==="line"}>Line</option>
          <option value="pie" ?selected=${this._chartType==="pie"}>Pie</option>
          <option value="doughnut" ?selected=${this._chartType==="doughnut"}>Doughnut</option>
        </select>
        <label>${am.has(this._chartType)?"Split by:":"Group by:"}</label>
        <select @change=${e=>{this._granularity=e.target.value}}>
          ${am.has(this._chartType)?E`
              <option value="byTag" ?selected=${this._granularity==="byTag"}>Tag</option>
              <option value="byMerchant" ?selected=${this._granularity==="byMerchant"}>Merchant</option>
              <option value="month" ?selected=${this._granularity==="month"}>Month</option>
            `:E`
              <option value="day" ?selected=${this._granularity==="day"}>Day</option>
              <option value="month" ?selected=${this._granularity==="month"}>Month</option>
              <option value="year" ?selected=${this._granularity==="year"}>Year</option>
              <option value="byTag" ?selected=${this._granularity==="byTag"}>Tag</option>
              <option value="byMerchant" ?selected=${this._granularity==="byMerchant"}>Merchant</option>
            `}
        </select>
      </div>
      <div class="filters">
        ${this._filters.map((e,t)=>E`
          <chart-filter-row
            .condition=${e}
            .index=${t}
            .tags=${this.tags}
            .merchants=${this.merchants}
            @filter-changed=${lo(this,xr,Ek)}
            @filter-removed=${lo(this,xr,Mk)}
          ></chart-filter-row>
        `)}
        <button class="add-filter" @click=${lo(this,xr,Dk)}>+ Add filter</button>
      </div>
      <div class="form-grid">
        <label>Legend:</label>
        <select @change=${e=>{this._legendPosition=e.target.value}}>
          <option value="top" ?selected=${this._legendPosition==="top"}>Top</option>
          <option value="bottom" ?selected=${this._legendPosition==="bottom"}>Bottom</option>
          <option value="left" ?selected=${this._legendPosition==="left"}>Left</option>
          <option value="right" ?selected=${this._legendPosition==="right"}>Right</option>
          <option value="hidden" ?selected=${this._legendPosition==="hidden"}>Hidden</option>
        </select>
      </div>
      ${lo(this,xr,Tk).call(this)}
      <button @click=${lo(this,xr,$k)}>${this.editingChart?"Update Chart":"Save to Dashboard"}</button>
    `}};xr=new WeakSet;Sk=function(e){const t=[];return e.tagId&&t.push({field:"tag",operator:"is",value:e.tagId}),e.merchantId&&t.push({field:"merchant",operator:"is",value:e.merchantId}),e.direction==="debit"?t.push({field:"amount",operator:"lt",value:"0"}):e.direction==="credit"&&t.push({field:"amount",operator:"gt",value:"0"}),e.descriptionFilter&&t.push({field:"description",operator:e.descriptionFilterMode==="include"?"contains":"excludes",value:e.descriptionFilter}),t};Ek=function(e){const{index:t,condition:n}=e.detail;this._filters=this._filters.map((i,r)=>r===t?n:i)};Mk=function(e){const{index:t}=e.detail;this._filters=this._filters.filter((n,i)=>i!==t)};Dk=function(){this._filters=[...this._filters,{field:"tag",operator:"is",value:""}]};$k=function(){const e=this._title.trim();if(!e)return;const t=this._filters.filter(n=>n.value.trim());this.dispatchEvent(new CustomEvent("chart-saved",{detail:{id:this.editingChart?.id,title:e,chartType:this._chartType,granularity:this._granularity,excludedTagIds:this._excludedTagIds.length>0?this._excludedTagIds:void 0,excludedMerchantIds:this._excludedMerchantIds.length>0?this._excludedMerchantIds:void 0,legendPosition:this._legendPosition,filters:t.length>0?t:void 0}})),this._title="",this._initialized=!1};Tk=function(){if(this._granularity!=="byTag"&&this._granularity!=="byMerchant")return"";const e=this._granularity==="byTag"?this.tags:this.merchants,t=this._granularity==="byTag"?this._excludedTagIds:this._excludedMerchantIds,n=this._granularity==="byTag"?"tags":"merchants";return E`
      <details class="exclusions" ?open=${this._showExclusions} @toggle=${i=>{this._showExclusions=i.target.open}}>
        <summary>Exclude ${n}</summary>
        <div class="checkbox-list">
          ${e.map(i=>E`
            <label>
              <input
                type="checkbox"
                ?checked=${t.includes(i.id)}
                @change=${r=>lo(this,xr,Ik).call(this,i.id,r.target.checked)}
              />
              ${i.name}
            </label>
          `)}
        </div>
      </details>
    `};Ik=function(e,t){this._granularity==="byTag"?this._excludedTagIds=t?[...this._excludedTagIds,e]:this._excludedTagIds.filter(n=>n!==e):this._excludedMerchantIds=t?[...this._excludedMerchantIds,e]:this._excludedMerchantIds.filter(n=>n!==e)};tn.styles=[Li,fr,dt`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      h4 {
        margin-top: 0;
      }
      .form-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 1rem;
      }
      input,
      select {
        padding: 4px 8px;
      }
      button {
        margin-right: 0.5rem;
      }
      .exclusions {
        margin-bottom: 1rem;
      }
      .exclusions summary {
        cursor: pointer;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .checkbox-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        max-height: 200px;
        overflow-y: auto;
      }
      .checkbox-list label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.9rem;
      }
      .filters {
        margin-bottom: 1rem;
      }
      .add-filter {
        font-size: 0.85rem;
      }
    `];Wn([H({type:Array})],tn.prototype,"transactions",2);Wn([H({type:Array})],tn.prototype,"tags",2);Wn([H({type:Array})],tn.prototype,"merchants",2);Wn([H({type:Object})],tn.prototype,"editingChart",2);Wn([P()],tn.prototype,"_title",2);Wn([P()],tn.prototype,"_chartType",2);Wn([P()],tn.prototype,"_granularity",2);Wn([P()],tn.prototype,"_filters",2);Wn([P()],tn.prototype,"_excludedTagIds",2);Wn([P()],tn.prototype,"_excludedMerchantIds",2);Wn([P()],tn.prototype,"_legendPosition",2);Wn([P()],tn.prototype,"_showExclusions",2);Wn([P()],tn.prototype,"_initialized",2);tn=Wn([Et("chart-configurator")],tn);function uh(e){return e+.5|0}const _s=(e,t,n)=>Math.max(Math.min(e,n),t);function yl(e){return _s(uh(e*2.55),0,255)}function Ts(e){return _s(uh(e*255),0,255)}function kr(e){return _s(uh(e/2.55)/100,0,1)}function u_(e){return _s(uh(e*100),0,100)}const ai={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},$g=[..."0123456789ABCDEF"],f3=e=>$g[e&15],p3=e=>$g[(e&240)>>4]+$g[e&15],Sh=e=>(e&240)>>4===(e&15),m3=e=>Sh(e.r)&&Sh(e.g)&&Sh(e.b)&&Sh(e.a);function g3(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&ai[e[1]]*17,g:255&ai[e[2]]*17,b:255&ai[e[3]]*17,a:t===5?ai[e[4]]*17:255}:(t===7||t===9)&&(n={r:ai[e[1]]<<4|ai[e[2]],g:ai[e[3]]<<4|ai[e[4]],b:ai[e[5]]<<4|ai[e[6]],a:t===9?ai[e[7]]<<4|ai[e[8]]:255})),n}const v3=(e,t)=>e<255?t(e):"";function y3(e){var t=m3(e)?f3:p3;return e?"#"+t(e.r)+t(e.g)+t(e.b)+v3(e.a,t):void 0}const b3=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Ok(e,t,n){const i=t*Math.min(n,1-n),r=(s,o=(s+e/30)%12)=>n-i*Math.max(Math.min(o-3,9-o,1),-1);return[r(0),r(8),r(4)]}function _3(e,t,n){const i=(r,s=(r+e/60)%6)=>n-n*t*Math.max(Math.min(s,4-s,1),0);return[i(5),i(3),i(1)]}function w3(e,t,n){const i=Ok(e,1,.5);let r;for(t+n>1&&(r=1/(t+n),t*=r,n*=r),r=0;r<3;r++)i[r]*=1-t-n,i[r]+=t;return i}function x3(e,t,n,i,r){return e===r?(t-n)/i+(t<n?6:0):t===r?(n-e)/i+2:(e-t)/i+4}function mv(e){const n=e.r/255,i=e.g/255,r=e.b/255,s=Math.max(n,i,r),o=Math.min(n,i,r),a=(s+o)/2;let c,l,u;return s!==o&&(u=s-o,l=a>.5?u/(2-s-o):u/(s+o),c=x3(n,i,r,u,s),c=c*60+.5),[c|0,l||0,a]}function gv(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(Ts)}function vv(e,t,n){return gv(Ok,e,t,n)}function C3(e,t,n){return gv(w3,e,t,n)}function k3(e,t,n){return gv(_3,e,t,n)}function Pk(e){return(e%360+360)%360}function S3(e){const t=b3.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?yl(+t[5]):Ts(+t[5]));const r=Pk(+t[2]),s=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?i=C3(r,s,o):t[1]==="hsv"?i=k3(r,s,o):i=vv(r,s,o),{r:i[0],g:i[1],b:i[2],a:n}}function E3(e,t){var n=mv(e);n[0]=Pk(n[0]+t),n=vv(n),e.r=n[0],e.g=n[1],e.b=n[2]}function M3(e){if(!e)return;const t=mv(e),n=t[0],i=u_(t[1]),r=u_(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${r}%, ${kr(e.a)})`:`hsl(${n}, ${i}%, ${r}%)`}const h_={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},d_={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function D3(){const e={},t=Object.keys(d_),n=Object.keys(h_);let i,r,s,o,a;for(i=0;i<t.length;i++){for(o=a=t[i],r=0;r<n.length;r++)s=n[r],a=a.replace(s,h_[s]);s=parseInt(d_[o],16),e[a]=[s>>16&255,s>>8&255,s&255]}return e}let Eh;function $3(e){Eh||(Eh=D3(),Eh.transparent=[0,0,0,0]);const t=Eh[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const T3=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function I3(e){const t=T3.exec(e);let n=255,i,r,s;if(t){if(t[7]!==i){const o=+t[7];n=t[8]?yl(o):_s(o*255,0,255)}return i=+t[1],r=+t[3],s=+t[5],i=255&(t[2]?yl(i):_s(i,0,255)),r=255&(t[4]?yl(r):_s(r,0,255)),s=255&(t[6]?yl(s):_s(s,0,255)),{r:i,g:r,b:s,a:n}}}function O3(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${kr(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const cm=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,va=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function P3(e,t,n){const i=va(kr(e.r)),r=va(kr(e.g)),s=va(kr(e.b));return{r:Ts(cm(i+n*(va(kr(t.r))-i))),g:Ts(cm(r+n*(va(kr(t.g))-r))),b:Ts(cm(s+n*(va(kr(t.b))-s))),a:e.a+n*(t.a-e.a)}}function Mh(e,t,n){if(e){let i=mv(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=vv(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function Rk(e,t){return e&&Object.assign(t||{},e)}function f_(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Ts(e[3]))):(t=Rk(e,{r:0,g:0,b:0,a:1}),t.a=Ts(t.a)),t}function R3(e){return e.charAt(0)==="r"?I3(e):S3(e)}class Cu{constructor(t){if(t instanceof Cu)return t;const n=typeof t;let i;n==="object"?i=f_(t):n==="string"&&(i=g3(t)||$3(t)||R3(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Rk(this._rgb);return t&&(t.a=kr(t.a)),t}set rgb(t){this._rgb=f_(t)}rgbString(){return this._valid?O3(this._rgb):void 0}hexString(){return this._valid?y3(this._rgb):void 0}hslString(){return this._valid?M3(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,r=t.rgb;let s;const o=n===s?.5:n,a=2*o-1,c=i.a-r.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;s=1-l,i.r=255&l*i.r+s*r.r+.5,i.g=255&l*i.g+s*r.g+.5,i.b=255&l*i.b+s*r.b+.5,i.a=o*i.a+(1-o)*r.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=P3(this._rgb,t._rgb,n)),this}clone(){return new Cu(this.rgb)}alpha(t){return this._rgb.a=Ts(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=uh(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Mh(this._rgb,2,t),this}darken(t){return Mh(this._rgb,2,-t),this}saturate(t){return Mh(this._rgb,1,t),this}desaturate(t){return Mh(this._rgb,1,-t),this}rotate(t){return E3(this._rgb,t),this}}function yr(){}const A3=(()=>{let e=0;return()=>e++})();function vt(e){return e==null}function Xt(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function _t(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function ue(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function qn(e,t){return ue(e)?e:t}function lt(e,t){return typeof e>"u"?t:e}const L3=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,Ak=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function Wt(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function Ot(e,t,n,i){let r,s,o;if(Xt(e))for(s=e.length,r=0;r<s;r++)t.call(n,e[r],r);else if(_t(e))for(o=Object.keys(e),s=o.length,r=0;r<s;r++)t.call(n,e[o[r]],o[r])}function uf(e,t){let n,i,r,s;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(r=e[n],s=t[n],r.datasetIndex!==s.datasetIndex||r.index!==s.index)return!1;return!0}function hf(e){if(Xt(e))return e.map(hf);if(_t(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let r=0;for(;r<i;++r)t[n[r]]=hf(e[n[r]]);return t}return e}function Lk(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function N3(e,t,n,i){if(!Lk(e))return;const r=t[e],s=n[e];_t(r)&&_t(s)?hc(r,s,i):t[e]=hf(s)}function hc(e,t,n){const i=Xt(t)?t:[t],r=i.length;if(!_t(e))return e;n=n||{};const s=n.merger||N3;let o;for(let a=0;a<r;++a){if(o=i[a],!_t(o))continue;const c=Object.keys(o);for(let l=0,u=c.length;l<u;++l)s(c[l],e,o,n)}return e}function Vl(e,t){return hc(e,t,{merger:F3})}function F3(e,t,n){if(!Lk(e))return;const i=t[e],r=n[e];_t(i)&&_t(r)?Vl(i,r):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=hf(r))}const p_={"":e=>e,x:e=>e.x,y:e=>e.y};function z3(e){const t=e.split("."),n=[];let i="";for(const r of t)i+=r,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function j3(e){const t=z3(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function Ns(e,t){return(p_[t]||(p_[t]=j3(t)))(e)}function yv(e){return e.charAt(0).toUpperCase()+e.slice(1)}const ku=e=>typeof e<"u",Fs=e=>typeof e=="function",m_=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function B3(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Dt=Math.PI,Yt=2*Dt,W3=Yt+Dt,df=Number.POSITIVE_INFINITY,H3=Dt/180,fe=Dt/2,no=Dt/4,g_=Dt*2/3,ws=Math.log10,tr=Math.sign;function Kl(e,t,n){return Math.abs(e-t)<n}function v_(e){const t=Math.round(e);e=Kl(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(ws(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function U3(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((r,s)=>r-s).pop(),t}function Y3(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function dc(e){return!Y3(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function q3(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function Nk(e,t,n){let i,r,s;for(i=0,r=e.length;i<r;i++)s=e[i][n],isNaN(s)||(t.min=Math.min(t.min,s),t.max=Math.max(t.max,s))}function Ti(e){return e*(Dt/180)}function bv(e){return e*(180/Dt)}function y_(e){if(!ue(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function Fk(e,t){const n=t.x-e.x,i=t.y-e.y,r=Math.sqrt(n*n+i*i);let s=Math.atan2(i,n);return s<-.5*Dt&&(s+=Yt),{angle:s,distance:r}}function Tg(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function V3(e,t){return(e-t+W3)%Yt-Dt}function Qe(e){return(e%Yt+Yt)%Yt}function Su(e,t,n,i){const r=Qe(e),s=Qe(t),o=Qe(n),a=Qe(s-r),c=Qe(o-r),l=Qe(r-s),u=Qe(r-o);return r===s||r===o||i&&s===o||a>c&&l<u}function Pe(e,t,n){return Math.max(t,Math.min(n,e))}function K3(e){return Pe(e,-32768,32767)}function $r(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function _v(e,t,n){n=n||(o=>e[o]<t);let i=e.length-1,r=0,s;for(;i-r>1;)s=r+i>>1,n(s)?r=s:i=s;return{lo:r,hi:i}}const Tr=(e,t,n,i)=>_v(e,n,i?r=>{const s=e[r][t];return s<n||s===n&&e[r+1][t]===n}:r=>e[r][t]<n),G3=(e,t,n)=>_v(e,n,i=>e[i][t]>=n);function X3(e,t,n){let i=0,r=e.length;for(;i<r&&e[i]<t;)i++;for(;r>i&&e[r-1]>n;)r--;return i>0||r<e.length?e.slice(i,r):e}const zk=["push","pop","shift","splice","unshift"];function Q3(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),zk.forEach(n=>{const i="_onData"+yv(n),r=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...s){const o=r.apply(this,s);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...s)}),o}})})}function b_(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,r=i.indexOf(t);r!==-1&&i.splice(r,1),!(i.length>0)&&(zk.forEach(s=>{delete e[s]}),delete e._chartjs)}function jk(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Bk=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Wk(e,t){let n=[],i=!1;return function(...r){n=r,i||(i=!0,Bk.call(window,()=>{i=!1,e.apply(t,n)}))}}function Z3(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const wv=e=>e==="start"?"left":e==="end"?"right":"center",Ve=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,J3=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function Hk(e,t,n){const i=t.length;let r=0,s=i;if(e._sorted){const{iScale:o,vScale:a,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,u=o.axis,{min:h,max:d,minDefined:f,maxDefined:p}=o.getUserBounds();if(f){if(r=Math.min(Tr(c,u,h).lo,n?i:Tr(t,u,o.getPixelForValue(h)).lo),l){const m=c.slice(0,r+1).reverse().findIndex(g=>!vt(g[a.axis]));r-=Math.max(0,m)}r=Pe(r,0,i-1)}if(p){let m=Math.max(Tr(c,o.axis,d,!0).hi+1,n?0:Tr(t,u,o.getPixelForValue(d),!0).hi+1);if(l){const g=c.slice(m-1).findIndex(b=>!vt(b[a.axis]));m+=Math.max(0,g)}s=Pe(m,r,i)-r}else s=i-r}return{start:r,count:s}}function Uk(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,r={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=r,!0;const s=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,r),s}const Dh=e=>e===0||e===1,__=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*Yt/n)),w_=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*Yt/n)+1,Gl={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*fe)+1,easeOutSine:e=>Math.sin(e*fe),easeInOutSine:e=>-.5*(Math.cos(Dt*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>Dh(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Dh(e)?e:__(e,.075,.3),easeOutElastic:e=>Dh(e)?e:w_(e,.075,.3),easeInOutElastic(e){return Dh(e)?e:e<.5?.5*__(e*2,.1125,.45):.5+.5*w_(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Gl.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?Gl.easeInBounce(e*2)*.5:Gl.easeOutBounce(e*2-1)*.5+.5};function xv(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function x_(e){return xv(e)?e:new Cu(e)}function lm(e){return xv(e)?e:new Cu(e).saturate(.5).darken(.1).hexString()}const tN=["x","y","borderWidth","radius","tension"],eN=["color","borderColor","backgroundColor"];function nN(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:eN},numbers:{type:"number",properties:tN}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function iN(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const C_=new Map;function rN(e,t){t=t||{};const n=e+JSON.stringify(t);let i=C_.get(n);return i||(i=new Intl.NumberFormat(e,t),C_.set(n,i)),i}function hh(e,t,n){return rN(t,n).format(e)}const Yk={values(e){return Xt(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let r,s=e;if(n.length>1){const l=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(l<1e-4||l>1e15)&&(r="scientific"),s=sN(e,n)}const o=ws(Math.abs(s)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:r,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(c,this.options.ticks.format),hh(e,i,c)},logarithmic(e,t,n){if(e===0)return"0";const i=n[t].significand||e/Math.pow(10,Math.floor(ws(e)));return[1,2,3,5,10,15].includes(i)||t>.8*n.length?Yk.numeric.call(this,e,t,n):""}};function sN(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var ip={formatters:Yk};function oN(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:ip.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const qo=Object.create(null),Ig=Object.create(null);function Xl(e,t){if(!t)return e;const n=t.split(".");for(let i=0,r=n.length;i<r;++i){const s=n[i];e=e[s]||(e[s]=Object.create(null))}return e}function um(e,t,n){return typeof t=="string"?hc(Xl(e,t),n):hc(Xl(e,""),t)}class aN{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,r)=>lm(r.backgroundColor),this.hoverBorderColor=(i,r)=>lm(r.borderColor),this.hoverColor=(i,r)=>lm(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return um(this,t,n)}get(t){return Xl(this,t)}describe(t,n){return um(Ig,t,n)}override(t,n){return um(qo,t,n)}route(t,n,i,r){const s=Xl(this,t),o=Xl(this,i),a="_"+n;Object.defineProperties(s,{[a]:{value:s[n],writable:!0},[n]:{enumerable:!0,get(){const c=this[a],l=o[r];return _t(c)?Object.assign({},l,c):lt(c,l)},set(c){this[a]=c}}})}apply(t){t.forEach(n=>n(this))}}var Zt=new aN({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[nN,iN,oN]);function cN(e){return!e||vt(e.size)||vt(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function ff(e,t,n,i,r){let s=t[r];return s||(s=t[r]=e.measureText(r).width,n.push(r)),s>i&&(i=s),i}function lN(e,t,n,i){i=i||{};let r=i.data=i.data||{},s=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(r=i.data={},s=i.garbageCollect=[],i.font=t),e.save(),e.font=t;let o=0;const a=n.length;let c,l,u,h,d;for(c=0;c<a;c++)if(h=n[c],h!=null&&!Xt(h))o=ff(e,r,s,o,h);else if(Xt(h))for(l=0,u=h.length;l<u;l++)d=h[l],d!=null&&!Xt(d)&&(o=ff(e,r,s,o,d));e.restore();const f=s.length/2;if(f>n.length){for(c=0;c<f;c++)delete r[s[c]];s.splice(0,f)}return o}function io(e,t,n){const i=e.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((t-r)*i)/i+r}function k_(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function Og(e,t,n,i){qk(e,t,n,i,null)}function qk(e,t,n,i,r){let s,o,a,c,l,u,h,d;const f=t.pointStyle,p=t.rotation,m=t.radius;let g=(p||0)*H3;if(f&&typeof f=="object"&&(s=f.toString(),s==="[object HTMLImageElement]"||s==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(g),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(m)||m<=0)){switch(e.beginPath(),f){default:r?e.ellipse(n,i,r/2,m,0,0,Yt):e.arc(n,i,m,0,Yt),e.closePath();break;case"triangle":u=r?r/2:m,e.moveTo(n+Math.sin(g)*u,i-Math.cos(g)*m),g+=g_,e.lineTo(n+Math.sin(g)*u,i-Math.cos(g)*m),g+=g_,e.lineTo(n+Math.sin(g)*u,i-Math.cos(g)*m),e.closePath();break;case"rectRounded":l=m*.516,c=m-l,o=Math.cos(g+no)*c,h=Math.cos(g+no)*(r?r/2-l:c),a=Math.sin(g+no)*c,d=Math.sin(g+no)*(r?r/2-l:c),e.arc(n-h,i-a,l,g-Dt,g-fe),e.arc(n+d,i-o,l,g-fe,g),e.arc(n+h,i+a,l,g,g+fe),e.arc(n-d,i+o,l,g+fe,g+Dt),e.closePath();break;case"rect":if(!p){c=Math.SQRT1_2*m,u=r?r/2:c,e.rect(n-u,i-c,2*u,2*c);break}g+=no;case"rectRot":h=Math.cos(g)*(r?r/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,d=Math.sin(g)*(r?r/2:m),e.moveTo(n-h,i-a),e.lineTo(n+d,i-o),e.lineTo(n+h,i+a),e.lineTo(n-d,i+o),e.closePath();break;case"crossRot":g+=no;case"cross":h=Math.cos(g)*(r?r/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,d=Math.sin(g)*(r?r/2:m),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"star":h=Math.cos(g)*(r?r/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,d=Math.sin(g)*(r?r/2:m),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o),g+=no,h=Math.cos(g)*(r?r/2:m),o=Math.cos(g)*m,a=Math.sin(g)*m,d=Math.sin(g)*(r?r/2:m),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"line":o=r?r/2:Math.cos(g)*m,a=Math.sin(g)*m,e.moveTo(n-o,i-a),e.lineTo(n+o,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(g)*(r?r/2:m),i+Math.sin(g)*m);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Ir(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function rp(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function sp(e){e.restore()}function uN(e,t,n,i,r){if(!t)return e.lineTo(n.x,n.y);if(r==="middle"){const s=(t.x+n.x)/2;e.lineTo(s,t.y),e.lineTo(s,n.y)}else r==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function hN(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function dN(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),vt(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function fN(e,t,n,i,r){if(r.strikethrough||r.underline){const s=e.measureText(i),o=t-s.actualBoundingBoxLeft,a=t+s.actualBoundingBoxRight,c=n-s.actualBoundingBoxAscent,l=n+s.actualBoundingBoxDescent,u=r.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=r.decorationWidth||2,e.moveTo(o,u),e.lineTo(a,u),e.stroke()}}function pN(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function Vo(e,t,n,i,r,s={}){const o=Xt(t)?t:[t],a=s.strokeWidth>0&&s.strokeColor!=="";let c,l;for(e.save(),e.font=r.string,dN(e,s),c=0;c<o.length;++c)l=o[c],s.backdrop&&pN(e,s.backdrop),a&&(s.strokeColor&&(e.strokeStyle=s.strokeColor),vt(s.strokeWidth)||(e.lineWidth=s.strokeWidth),e.strokeText(l,n,i,s.maxWidth)),e.fillText(l,n,i,s.maxWidth),fN(e,n,i,l,s),i+=Number(r.lineHeight);e.restore()}function Eu(e,t){const{x:n,y:i,w:r,h:s,radius:o}=t;e.arc(n+o.topLeft,i+o.topLeft,o.topLeft,1.5*Dt,Dt,!0),e.lineTo(n,i+s-o.bottomLeft),e.arc(n+o.bottomLeft,i+s-o.bottomLeft,o.bottomLeft,Dt,fe,!0),e.lineTo(n+r-o.bottomRight,i+s),e.arc(n+r-o.bottomRight,i+s-o.bottomRight,o.bottomRight,fe,0,!0),e.lineTo(n+r,i+o.topRight),e.arc(n+r-o.topRight,i+o.topRight,o.topRight,0,-fe,!0),e.lineTo(n+o.topLeft,i)}const mN=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,gN=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function vN(e,t){const n=(""+e).match(mN);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const yN=e=>+e||0;function Cv(e,t){const n={},i=_t(t),r=i?Object.keys(t):t,s=_t(e)?i?o=>lt(e[o],e[t[o]]):o=>e[o]:()=>e;for(const o of r)n[o]=yN(s(o));return n}function Vk(e){return Cv(e,{top:"y",right:"x",bottom:"y",left:"x"})}function Mo(e){return Cv(e,["topLeft","topRight","bottomLeft","bottomRight"])}function en(e){const t=Vk(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Ce(e,t){e=e||{},t=t||Zt.font;let n=lt(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=lt(e.style,t.style);i&&!(""+i).match(gN)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const r={family:lt(e.family,t.family),lineHeight:vN(lt(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:lt(e.weight,t.weight),string:""};return r.string=cN(r),r}function bl(e,t,n,i){let r,s,o;for(r=0,s=e.length;r<s;++r)if(o=e[r],o!==void 0&&o!==void 0)return o}function bN(e,t,n){const{min:i,max:r}=e,s=Ak(t,(r-i)/2),o=(a,c)=>n&&a===0?0:a+c;return{min:o(i,-Math.abs(s)),max:o(r,s)}}function Vs(e,t){return Object.assign(Object.create(e),t)}function kv(e,t=[""],n,i,r=()=>e[0]){const s=n||e;typeof i>"u"&&(i=Qk("_fallback",e));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:s,_fallback:i,_getTarget:r,override:a=>kv([a,...e],t,s,i)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete e[0][c],!0},get(a,c){return Gk(a,c,()=>MN(c,t,e,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,c){return E_(a).includes(c)},ownKeys(a){return E_(a)},set(a,c,l){const u=a._storage||(a._storage=r());return a[c]=u[c]=l,delete a._keys,!0}})}function fc(e,t,n,i){const r={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Kk(e,i),setContext:s=>fc(e,s,n,i),override:s=>fc(e.override(s),t,n,i)};return new Proxy(r,{deleteProperty(s,o){return delete s[o],delete e[o],!0},get(s,o,a){return Gk(s,o,()=>wN(s,o,a))},getOwnPropertyDescriptor(s,o){return s._descriptors.allKeys?Reflect.has(e,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,o)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(s,o){return Reflect.has(e,o)},ownKeys(){return Reflect.ownKeys(e)},set(s,o,a){return e[o]=a,delete s[o],!0}})}function Kk(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:r=t.allKeys}=e;return{allKeys:r,scriptable:n,indexable:i,isScriptable:Fs(n)?n:()=>n,isIndexable:Fs(i)?i:()=>i}}const _N=(e,t)=>e?e+yv(t):t,Sv=(e,t)=>_t(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Gk(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function wN(e,t,n){const{_proxy:i,_context:r,_subProxy:s,_descriptors:o}=e;let a=i[t];return Fs(a)&&o.isScriptable(t)&&(a=xN(t,a,e,n)),Xt(a)&&a.length&&(a=CN(t,a,e,o.isIndexable)),Sv(t,a)&&(a=fc(a,r,s&&s[t],o)),a}function xN(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let c=t(s,o||i);return a.delete(e),Sv(e,c)&&(c=Ev(r._scopes,r,e,c)),c}function CN(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_descriptors:a}=n;if(typeof s.index<"u"&&i(e))return t[s.index%t.length];if(_t(t[0])){const c=t,l=r._scopes.filter(u=>u!==c);t=[];for(const u of c){const h=Ev(l,r,e,u);t.push(fc(h,s,o&&o[e],a))}}return t}function Xk(e,t,n){return Fs(e)?e(t,n):e}const kN=(e,t)=>e===!0?t:typeof e=="string"?Ns(t,e):void 0;function SN(e,t,n,i,r){for(const s of t){const o=kN(n,s);if(o){e.add(o);const a=Xk(o._fallback,n,r);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(o===!1&&typeof i<"u"&&n!==i)return null}return!1}function Ev(e,t,n,i){const r=t._rootScopes,s=Xk(t._fallback,n,i),o=[...e,...r],a=new Set;a.add(i);let c=S_(a,o,n,s||n,i);return c===null||typeof s<"u"&&s!==n&&(c=S_(a,o,s,c,i),c===null)?!1:kv(Array.from(a),[""],r,s,()=>EN(t,n,i))}function S_(e,t,n,i,r){for(;n;)n=SN(e,t,n,i,r);return n}function EN(e,t,n){const i=e._getTarget();t in i||(i[t]={});const r=i[t];return Xt(r)&&_t(n)?n:r||{}}function MN(e,t,n,i){let r;for(const s of t)if(r=Qk(_N(s,e),n),typeof r<"u")return Sv(e,r)?Ev(n,i,e,r):r}function Qk(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function E_(e){let t=e._keys;return t||(t=e._keys=DN(e._scopes)),t}function DN(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(r=>!r.startsWith("_")))t.add(i);return Array.from(t)}function Zk(e,t,n,i){const{iScale:r}=e,{key:s="r"}=this._parsing,o=new Array(i);let a,c,l,u;for(a=0,c=i;a<c;++a)l=a+n,u=t[l],o[a]={r:r.parse(Ns(u,s),l)};return o}const $N=Number.EPSILON||1e-14,pc=(e,t)=>t<e.length&&!e[t].skip&&e[t],Jk=e=>e==="x"?"y":"x";function TN(e,t,n,i){const r=e.skip?t:e,s=t,o=n.skip?t:n,a=Tg(s,r),c=Tg(o,s);let l=a/(a+c),u=c/(a+c);l=isNaN(l)?0:l,u=isNaN(u)?0:u;const h=i*l,d=i*u;return{previous:{x:s.x-h*(o.x-r.x),y:s.y-h*(o.y-r.y)},next:{x:s.x+d*(o.x-r.x),y:s.y+d*(o.y-r.y)}}}function IN(e,t,n){const i=e.length;let r,s,o,a,c,l=pc(e,0);for(let u=0;u<i-1;++u)if(c=l,l=pc(e,u+1),!(!c||!l)){if(Kl(t[u],0,$N)){n[u]=n[u+1]=0;continue}r=n[u]/t[u],s=n[u+1]/t[u],a=Math.pow(r,2)+Math.pow(s,2),!(a<=9)&&(o=3/Math.sqrt(a),n[u]=r*o*t[u],n[u+1]=s*o*t[u])}}function ON(e,t,n="x"){const i=Jk(n),r=e.length;let s,o,a,c=pc(e,0);for(let l=0;l<r;++l){if(o=a,a=c,c=pc(e,l+1),!a)continue;const u=a[n],h=a[i];o&&(s=(u-o[n])/3,a[`cp1${n}`]=u-s,a[`cp1${i}`]=h-s*t[l]),c&&(s=(c[n]-u)/3,a[`cp2${n}`]=u+s,a[`cp2${i}`]=h+s*t[l])}}function PN(e,t="x"){const n=Jk(t),i=e.length,r=Array(i).fill(0),s=Array(i);let o,a,c,l=pc(e,0);for(o=0;o<i;++o)if(a=c,c=l,l=pc(e,o+1),!!c){if(l){const u=l[t]-c[t];r[o]=u!==0?(l[n]-c[n])/u:0}s[o]=a?l?tr(r[o-1])!==tr(r[o])?0:(r[o-1]+r[o])/2:r[o-1]:r[o]}IN(e,r,s),ON(e,s,t)}function $h(e,t,n){return Math.max(Math.min(e,n),t)}function RN(e,t){let n,i,r,s,o,a=Ir(e[0],t);for(n=0,i=e.length;n<i;++n)o=s,s=a,a=n<i-1&&Ir(e[n+1],t),s&&(r=e[n],o&&(r.cp1x=$h(r.cp1x,t.left,t.right),r.cp1y=$h(r.cp1y,t.top,t.bottom)),a&&(r.cp2x=$h(r.cp2x,t.left,t.right),r.cp2y=$h(r.cp2y,t.top,t.bottom)))}function AN(e,t,n,i,r){let s,o,a,c;if(t.spanGaps&&(e=e.filter(l=>!l.skip)),t.cubicInterpolationMode==="monotone")PN(e,r);else{let l=i?e[e.length-1]:e[0];for(s=0,o=e.length;s<o;++s)a=e[s],c=TN(l,a,e[Math.min(s+1,o-(i?0:1))%o],t.tension),a.cp1x=c.previous.x,a.cp1y=c.previous.y,a.cp2x=c.next.x,a.cp2y=c.next.y,l=a}t.capBezierPoints&&RN(e,n)}function Mv(){return typeof window<"u"&&typeof document<"u"}function Dv(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function pf(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const op=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function LN(e,t){return op(e).getPropertyValue(t)}const NN=["top","right","bottom","left"];function Do(e,t,n){const i={};n=n?"-"+n:"";for(let r=0;r<4;r++){const s=NN[r];i[s]=parseFloat(e[t+"-"+s+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const FN=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function zN(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:r,offsetY:s}=i;let o=!1,a,c;if(FN(r,s,e.target))a=r,c=s;else{const l=t.getBoundingClientRect();a=i.clientX-l.left,c=i.clientY-l.top,o=!0}return{x:a,y:c,box:o}}function uo(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,r=op(n),s=r.boxSizing==="border-box",o=Do(r,"padding"),a=Do(r,"border","width"),{x:c,y:l,box:u}=zN(e,n),h=o.left+(u&&a.left),d=o.top+(u&&a.top);let{width:f,height:p}=t;return s&&(f-=o.width+a.width,p-=o.height+a.height),{x:Math.round((c-h)/f*n.width/i),y:Math.round((l-d)/p*n.height/i)}}function jN(e,t,n){let i,r;if(t===void 0||n===void 0){const s=e&&Dv(e);if(!s)t=e.clientWidth,n=e.clientHeight;else{const o=s.getBoundingClientRect(),a=op(s),c=Do(a,"border","width"),l=Do(a,"padding");t=o.width-l.width-c.width,n=o.height-l.height-c.height,i=pf(a.maxWidth,s,"clientWidth"),r=pf(a.maxHeight,s,"clientHeight")}}return{width:t,height:n,maxWidth:i||df,maxHeight:r||df}}const xs=e=>Math.round(e*10)/10;function BN(e,t,n,i){const r=op(e),s=Do(r,"margin"),o=pf(r.maxWidth,e,"clientWidth")||df,a=pf(r.maxHeight,e,"clientHeight")||df,c=jN(e,t,n);let{width:l,height:u}=c;if(r.boxSizing==="content-box"){const d=Do(r,"border","width"),f=Do(r,"padding");l-=f.width+d.width,u-=f.height+d.height}return l=Math.max(0,l-s.width),u=Math.max(0,i?l/i:u-s.height),l=xs(Math.min(l,o,c.maxWidth)),u=xs(Math.min(u,a,c.maxHeight)),l&&!u&&(u=xs(l/2)),(t!==void 0||n!==void 0)&&i&&c.height&&u>c.height&&(u=c.height,l=xs(Math.floor(u*i))),{width:l,height:u}}function M_(e,t,n){const i=t||1,r=xs(e.height*i),s=xs(e.width*i);e.height=xs(e.height),e.width=xs(e.width);const o=e.canvas;return o.style&&(n||!o.style.height&&!o.style.width)&&(o.style.height=`${e.height}px`,o.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||o.height!==r||o.width!==s?(e.currentDevicePixelRatio=i,o.height=r,o.width=s,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const WN=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};Mv()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function D_(e,t){const n=LN(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function ho(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function HN(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function UN(e,t,n,i){const r={x:e.cp2x,y:e.cp2y},s={x:t.cp1x,y:t.cp1y},o=ho(e,r,n),a=ho(r,s,n),c=ho(s,t,n),l=ho(o,a,n),u=ho(a,c,n);return ho(l,u,n)}const YN=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},qN=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Ha(e,t,n){return e?YN(t,n):qN()}function tS(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function eS(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function nS(e){return e==="angle"?{between:Su,compare:V3,normalize:Qe}:{between:$r,compare:(t,n)=>t-n,normalize:t=>t}}function $_({start:e,end:t,count:n,loop:i,style:r}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:r}}function VN(e,t,n){const{property:i,start:r,end:s}=n,{between:o,normalize:a}=nS(i),c=t.length;let{start:l,end:u,loop:h}=e,d,f;if(h){for(l+=c,u+=c,d=0,f=c;d<f&&o(a(t[l%c][i]),r,s);++d)l--,u--;l%=c,u%=c}return u<l&&(u+=c),{start:l,end:u,loop:h,style:e.style}}function iS(e,t,n){if(!n)return[e];const{property:i,start:r,end:s}=n,o=t.length,{compare:a,between:c,normalize:l}=nS(i),{start:u,end:h,loop:d,style:f}=VN(e,t,n),p=[];let m=!1,g=null,b,_,C;const S=()=>c(r,C,b)&&a(r,C)!==0,k=()=>a(s,b)===0||c(s,C,b),$=()=>m||S(),D=()=>!m||k();for(let w=u,x=u;w<=h;++w)_=t[w%o],!_.skip&&(b=l(_[i]),b!==C&&(m=c(b,r,s),g===null&&$()&&(g=a(b,r)===0?w:x),g!==null&&D()&&(p.push($_({start:g,end:w,loop:d,count:o,style:f})),g=null),x=w,C=b));return g!==null&&p.push($_({start:g,end:h,loop:d,count:o,style:f})),p}function rS(e,t){const n=[],i=e.segments;for(let r=0;r<i.length;r++){const s=iS(i[r],e.points,t);s.length&&n.push(...s)}return n}function KN(e,t,n,i){let r=0,s=t-1;if(n&&!i)for(;r<t&&!e[r].skip;)r++;for(;r<t&&e[r].skip;)r++;for(r%=t,n&&(s+=r);s>r&&e[s%t].skip;)s--;return s%=t,{start:r,end:s}}function GN(e,t,n,i){const r=e.length,s=[];let o=t,a=e[t],c;for(c=t+1;c<=n;++c){const l=e[c%r];l.skip||l.stop?a.skip||(i=!1,s.push({start:t%r,end:(c-1)%r,loop:i}),t=o=l.stop?c:null):(o=c,a.skip&&(t=c)),a=l}return o!==null&&s.push({start:t%r,end:o%r,loop:i}),s}function XN(e,t){const n=e.points,i=e.options.spanGaps,r=n.length;if(!r)return[];const s=!!e._loop,{start:o,end:a}=KN(n,r,s,i);if(i===!0)return T_(e,[{start:o,end:a,loop:s}],n,t);const c=a<o?a+r:a,l=!!e._fullLoop&&o===0&&a===r-1;return T_(e,GN(n,o,c,l),n,t)}function T_(e,t,n,i){return!i||!i.setContext||!n?t:QN(e,t,n,i)}function QN(e,t,n,i){const r=e._chart.getContext(),s=I_(e.options),{_datasetIndex:o,options:{spanGaps:a}}=e,c=n.length,l=[];let u=s,h=t[0].start,d=h;function f(p,m,g,b){const _=a?-1:1;if(p!==m){for(p+=c;n[p%c].skip;)p-=_;for(;n[m%c].skip;)m+=_;p%c!==m%c&&(l.push({start:p%c,end:m%c,loop:g,style:b}),u=b,h=m%c)}}for(const p of t){h=a?h:p.start;let m=n[h%c],g;for(d=h+1;d<=p.end;d++){const b=n[d%c];g=I_(i.setContext(Vs(r,{type:"segment",p0:m,p1:b,p0DataIndex:(d-1)%c,p1DataIndex:d%c,datasetIndex:o}))),ZN(g,u)&&f(h,d-1,p.loop,u),m=b,u=g}h<d-1&&f(h,d-1,p.loop,u)}return l}function I_(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function ZN(e,t){if(!t)return!1;const n=[],i=function(r,s){return xv(s)?(n.includes(s)||n.push(s),n.indexOf(s)):s};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Th(e,t,n){return e.options.clip?e[n]:t[n]}function JN(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Th(n,t,"left"),right:Th(n,t,"right"),top:Th(i,t,"top"),bottom:Th(i,t,"bottom")}:t}function sS(e,t){const n=t._clip;if(n.disabled)return!1;const i=JN(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}class t6{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,r){const s=n.listeners[r],o=n.duration;s.forEach(a=>a({chart:t,initial:n.initial,numSteps:o,currentStep:Math.min(i-n.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=Bk.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,r)=>{if(!i.running||!i.items.length)return;const s=i.items;let o=s.length-1,a=!1,c;for(;o>=0;--o)c=s[o],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),a=!0):(s[o]=s[s.length-1],s.pop());a&&(r.draw(),this._notify(r,i,t,"progress")),s.length||(i.running=!1,this._notify(r,i,t,"complete"),i.initial=!1),n+=s.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,r)=>Math.max(i,r._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let r=i.length-1;for(;r>=0;--r)i[r].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var br=new t6;const O_="transparent",e6={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=x_(e||O_),r=i.valid&&x_(t||O_);return r&&r.valid?r.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class n6{constructor(t,n,i,r){const s=n[i];r=bl([t.to,r,s,t.from]);const o=bl([t.from,s,r]);this._active=!0,this._fn=t.fn||e6[t.type||typeof o],this._easing=Gl[t.easing]||Gl.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=o,this._to=r,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const r=this._target[this._prop],s=i-this._start,o=this._duration-s;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=s,this._loop=!!t.loop,this._to=bl([t.to,n,r,t.from]),this._from=bl([t.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,r=this._prop,s=this._from,o=this._loop,a=this._to;let c;if(this._active=s!==a&&(o||n<i),!this._active){this._target[r]=a,this._notify(!0);return}if(n<0){this._target[r]=s;return}c=n/i%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[r]=this._fn(s,a,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let r=0;r<i.length;r++)i[r][n]()}}class oS{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!_t(t))return;const n=Object.keys(Zt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(r=>{const s=t[r];if(!_t(s))return;const o={};for(const a of n)o[a]=s[a];(Xt(s.properties)&&s.properties||[r]).forEach(a=>{(a===r||!i.has(a))&&i.set(a,o)})})}_animateOptions(t,n){const i=n.options,r=r6(t,i);if(!r)return[];const s=this._createAnimations(r,i);return i.$shared&&i6(t.options.$animations,i).then(()=>{t.options=i},()=>{}),s}_createAnimations(t,n){const i=this._properties,r=[],s=t.$animations||(t.$animations={}),o=Object.keys(n),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const l=o[c];if(l.charAt(0)==="$")continue;if(l==="options"){r.push(...this._animateOptions(t,n));continue}const u=n[l];let h=s[l];const d=i.get(l);if(h)if(d&&h.active()){h.update(d,u,a);continue}else h.cancel();if(!d||!d.duration){t[l]=u;continue}s[l]=h=new n6(d,t,l,u),r.push(h)}return r}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return br.add(this._chart,i),!0}}function i6(e,t){const n=[],i=Object.keys(t);for(let r=0;r<i.length;r++){const s=e[i[r]];s&&s.active()&&n.push(s.wait())}return Promise.all(n)}function r6(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function P_(e,t){const n=e&&e.options||{},i=n.reverse,r=n.min===void 0?t:0,s=n.max===void 0?t:0;return{start:i?s:r,end:i?r:s}}function s6(e,t,n){if(n===!1)return!1;const i=P_(e,n),r=P_(t,n);return{top:r.end,right:i.end,bottom:r.start,left:i.start}}function o6(e){let t,n,i,r;return _t(e)?(t=e.top,n=e.right,i=e.bottom,r=e.left):t=n=i=r=e,{top:t,right:n,bottom:i,left:r,disabled:e===!1}}function aS(e,t){const n=[],i=e._getSortedDatasetMetas(t);let r,s;for(r=0,s=i.length;r<s;++r)n.push(i[r].index);return n}function R_(e,t,n,i={}){const r=e.keys,s=i.mode==="single";let o,a,c,l;if(t===null)return;let u=!1;for(o=0,a=r.length;o<a;++o){if(c=+r[o],c===n){if(u=!0,i.all)continue;break}l=e.values[c],ue(l)&&(s||t===0||tr(t)===tr(l))&&(t+=l)}return!u&&!i.all?0:t}function a6(e,t){const{iScale:n,vScale:i}=t,r=n.axis==="x"?"x":"y",s=i.axis==="x"?"x":"y",o=Object.keys(e),a=new Array(o.length);let c,l,u;for(c=0,l=o.length;c<l;++c)u=o[c],a[c]={[r]:u,[s]:e[u]};return a}function hm(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function c6(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function l6(e){const{min:t,max:n,minDefined:i,maxDefined:r}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function u6(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function A_(e,t,n,i){for(const r of t.getMatchingVisibleMetas(i).reverse()){const s=e[r.index];if(n&&s>0||!n&&s<0)return r.index}return null}function L_(e,t){const{chart:n,_cachedMeta:i}=e,r=n._stacks||(n._stacks={}),{iScale:s,vScale:o,index:a}=i,c=s.axis,l=o.axis,u=c6(s,o,i),h=t.length;let d;for(let f=0;f<h;++f){const p=t[f],{[c]:m,[l]:g}=p,b=p._stacks||(p._stacks={});d=b[l]=u6(r,u,m),d[a]=g,d._top=A_(d,o,!0,i.type),d._bottom=A_(d,o,!1,i.type);const _=d._visualValues||(d._visualValues={});_[a]=g}}function dm(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function h6(e,t){return Vs(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function d6(e,t,n){return Vs(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function qc(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const r of t){const s=r._stacks;if(!s||s[i]===void 0||s[i][n]===void 0)return;delete s[i][n],s[i]._visualValues!==void 0&&s[i]._visualValues[n]!==void 0&&delete s[i]._visualValues[n]}}}const fm=e=>e==="reset"||e==="none",N_=(e,t)=>t?e:Object.assign({},e),f6=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:aS(n,!0),values:null};class Ks{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=hm(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&qc(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),r=(h,d,f,p)=>h==="x"?d:h==="r"?p:f,s=n.xAxisID=lt(i.xAxisID,dm(t,"x")),o=n.yAxisID=lt(i.yAxisID,dm(t,"y")),a=n.rAxisID=lt(i.rAxisID,dm(t,"r")),c=n.indexAxis,l=n.iAxisID=r(c,s,o,a),u=n.vAxisID=r(c,o,s,a);n.xScale=this.getScaleForId(s),n.yScale=this.getScaleForId(o),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(l),n.vScale=this.getScaleForId(u)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&b_(this._data,this),t._stacked&&qc(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(_t(n)){const r=this._cachedMeta;this._data=a6(n,r)}else if(i!==n){if(i){b_(i,this);const r=this._cachedMeta;qc(r),r._parsed=[]}n&&Object.isExtensible(n)&&Q3(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let r=!1;this._dataCheck();const s=n._stacked;n._stacked=hm(n.vScale,n),n.stack!==i.stack&&(r=!0,qc(n),n.stack=i.stack),this._resyncElements(t),(r||s!==n._stacked)&&(L_(this,n._parsed),n._stacked=hm(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:r}=this,{iScale:s,_stacked:o}=i,a=s.axis;let c=t===0&&n===r.length?!0:i._sorted,l=t>0&&i._parsed[t-1],u,h,d;if(this._parsing===!1)i._parsed=r,i._sorted=!0,d=r;else{Xt(r[t])?d=this.parseArrayData(i,r,t,n):_t(r[t])?d=this.parseObjectData(i,r,t,n):d=this.parsePrimitiveData(i,r,t,n);const f=()=>h[a]===null||l&&h[a]<l[a];for(u=0;u<n;++u)i._parsed[u+t]=h=d[u],c&&(f()&&(c=!1),l=h);i._sorted=c}o&&L_(this,d)}parsePrimitiveData(t,n,i,r){const{iScale:s,vScale:o}=t,a=s.axis,c=o.axis,l=s.getLabels(),u=s===o,h=new Array(r);let d,f,p;for(d=0,f=r;d<f;++d)p=d+i,h[d]={[a]:u||s.parse(l[p],p),[c]:o.parse(n[p],p)};return h}parseArrayData(t,n,i,r){const{xScale:s,yScale:o}=t,a=new Array(r);let c,l,u,h;for(c=0,l=r;c<l;++c)u=c+i,h=n[u],a[c]={x:s.parse(h[0],u),y:o.parse(h[1],u)};return a}parseObjectData(t,n,i,r){const{xScale:s,yScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(r);let u,h,d,f;for(u=0,h=r;u<h;++u)d=u+i,f=n[d],l[u]={x:s.parse(Ns(f,a),d),y:o.parse(Ns(f,c),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const r=this.chart,s=this._cachedMeta,o=n[t.axis],a={keys:aS(r,!0),values:n._stacks[t.axis]._visualValues};return R_(a,o,s.index,{mode:i})}updateRangeFromParsed(t,n,i,r){const s=i[n.axis];let o=s===null?NaN:s;const a=r&&i._stacks[n.axis];r&&a&&(r.values=a,o=R_(r,s,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,n){const i=this._cachedMeta,r=i._parsed,s=i._sorted&&t===i.iScale,o=r.length,a=this._getOtherScale(t),c=f6(n,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:u,max:h}=l6(a);let d,f;function p(){f=r[d];const m=f[a.axis];return!ue(f[t.axis])||u>m||h<m}for(d=0;d<o&&!(!p()&&(this.updateRangeFromParsed(l,t,f,c),s));++d);if(s){for(d=o-1;d>=0;--d)if(!p()){this.updateRangeFromParsed(l,t,f,c);break}}return l}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let r,s,o;for(r=0,s=n.length;r<s;++r)o=n[r][t.axis],ue(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,r=n.vScale,s=this.getParsed(t);return{label:i?""+i.getLabelForValue(s[i.axis]):"",value:r?""+r.getLabelForValue(s[r.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=o6(lt(this.options.clip,s6(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,r=i.data||[],s=n.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||r.length-a,l=this.options.drawActiveElementsOnTop;let u;for(i.dataset&&i.dataset.draw(t,s,a,c),u=a;u<a+c;++u){const h=r[u];h.hidden||(h.active&&l?o.push(h):h.draw(t,s))}for(u=0;u<o.length;++u)o[u].draw(t,s)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const r=this.getDataset();let s;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];s=o.$context||(o.$context=d6(this.getContext(),t,o)),s.parsed=this.getParsed(t),s.raw=r.data[t],s.index=s.dataIndex=t}else s=this.$context||(this.$context=h6(this.chart.getContext(),this.index)),s.dataset=r,s.index=s.datasetIndex=this.index;return s.active=!!n,s.mode=i,s}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const r=n==="active",s=this._cachedDataOpts,o=t+"-"+n,a=s[o],c=this.enableOptionSharing&&ku(i);if(a)return N_(a,c);const l=this.chart.config,u=l.datasetElementScopeKeys(this._type,t),h=r?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),u),f=Object.keys(Zt.elements[t]),p=()=>this.getContext(i,r,n),m=l.resolveNamedOptions(d,f,p,h);return m.$shared&&(m.$shared=c,s[o]=Object.freeze(N_(m,c))),m}_resolveAnimations(t,n,i){const r=this.chart,s=this._cachedDataOpts,o=`animation-${n}`,a=s[o];if(a)return a;let c;if(r.options.animation!==!1){const u=this.chart.config,h=u.datasetAnimationScopeKeys(this._type,n),d=u.getOptionScopes(this.getDataset(),h);c=u.createResolver(d,this.getContext(t,i,n))}const l=new oS(r,c&&c.animations);return c&&c._cacheable&&(s[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||fm(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),r=this._sharedOptions,s=this.getSharedOptions(i),o=this.includeOptions(n,s)||s!==r;return this.updateSharedOptions(s,n,i),{sharedOptions:s,includeOptions:o}}updateElement(t,n,i,r){fm(r)?Object.assign(t,i):this._resolveAnimations(n,r).update(t,i)}updateSharedOptions(t,n,i){t&&!fm(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,r){t.active=r;const s=this.getStyle(n,r);this._resolveAnimations(n,i,r).update(t,{options:!r&&this.getSharedOptions(s)||s})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const r=i.length,s=n.length,o=Math.min(s,r);o&&this.parse(0,o),s>r?this._insertElements(r,s-r,t):s<r&&this._removeElements(s,r-s)}_insertElements(t,n,i=!0){const r=this._cachedMeta,s=r.data,o=t+n;let a;const c=l=>{for(l.length+=n,a=l.length-1;a>=o;a--)l[a]=l[a-n]};for(c(s),a=t;a<o;++a)s[a]=new this.dataElementType;this._parsing&&c(r._parsed),this.parse(t,n),i&&this.updateElements(s,t,n,"reset")}updateElements(t,n,i,r){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const r=i._parsed.splice(t,n);i._stacked&&qc(i,r)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,r]=t;this[n](i,r)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function p6(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let i=[];for(let r=0,s=n.length;r<s;r++)i=i.concat(n[r].controller.getAllParsedValues(e));e._cache.$bar=jk(i.sort((r,s)=>r-s))}return e._cache.$bar}function m6(e){const t=e.iScale,n=p6(t,e.type);let i=t._length,r,s,o,a;const c=()=>{o===32767||o===-32768||(ku(a)&&(i=Math.min(i,Math.abs(o-a)||i)),a=o)};for(r=0,s=n.length;r<s;++r)o=t.getPixelForValue(n[r]),c();for(a=void 0,r=0,s=t.ticks.length;r<s;++r)o=t.getPixelForTick(r),c();return i}function g6(e,t,n,i){const r=n.barThickness;let s,o;return vt(r)?(s=t.min*n.categoryPercentage,o=n.barPercentage):(s=r*i,o=1),{chunk:s/i,ratio:o,start:t.pixels[e]-s/2}}function v6(e,t,n,i){const r=t.pixels,s=r[e];let o=e>0?r[e-1]:null,a=e<r.length-1?r[e+1]:null;const c=n.categoryPercentage;o===null&&(o=s-(a===null?t.end-t.start:a-s)),a===null&&(a=s+s-o);const l=s-(s-Math.min(o,a))/2*c;return{chunk:Math.abs(a-o)/2*c/i,ratio:n.barPercentage,start:l}}function y6(e,t,n,i){const r=n.parse(e[0],i),s=n.parse(e[1],i),o=Math.min(r,s),a=Math.max(r,s);let c=o,l=a;Math.abs(o)>Math.abs(a)&&(c=a,l=o),t[n.axis]=l,t._custom={barStart:c,barEnd:l,start:r,end:s,min:o,max:a}}function cS(e,t,n,i){return Xt(e)?y6(e,t,n,i):t[n.axis]=n.parse(e,i),t}function F_(e,t,n,i){const r=e.iScale,s=e.vScale,o=r.getLabels(),a=r===s,c=[];let l,u,h,d;for(l=n,u=n+i;l<u;++l)d=t[l],h={},h[r.axis]=a||r.parse(o[l],l),c.push(cS(d,h,s,l));return c}function pm(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function b6(e,t,n){return e!==0?tr(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function _6(e){let t,n,i,r,s;return e.horizontal?(t=e.base>e.x,n="left",i="right"):(t=e.base<e.y,n="bottom",i="top"),t?(r="end",s="start"):(r="start",s="end"),{start:n,end:i,reverse:t,top:r,bottom:s}}function w6(e,t,n,i){let r=t.borderSkipped;const s={};if(!r){e.borderSkipped=s;return}if(r===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:c,top:l,bottom:u}=_6(e);r==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===i?r=l:(n._bottom||0)===i?r=u:(s[z_(u,o,a,c)]=!0,r=l)),s[z_(r,o,a,c)]=!0,e.borderSkipped=s}function z_(e,t,n,i){return i?(e=x6(e,t,n),e=j_(e,n,t)):e=j_(e,t,n),e}function x6(e,t,n){return e===t?n:e===n?t:e}function j_(e,t,n){return e==="start"?t:e==="end"?n:e}function C6(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class k6 extends Ks{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,n,i,r){return F_(t,n,i,r)}parseArrayData(t,n,i,r){return F_(t,n,i,r)}parseObjectData(t,n,i,r){const{iScale:s,vScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=s.axis==="x"?a:c,u=o.axis==="x"?a:c,h=[];let d,f,p,m;for(d=i,f=i+r;d<f;++d)m=n[d],p={},p[s.axis]=s.parse(Ns(m,l),d),h.push(cS(Ns(m,u),p,o,d));return h}updateRangeFromParsed(t,n,i,r){super.updateRangeFromParsed(t,n,i,r);const s=i._custom;s&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,s.min),t.max=Math.max(t.max,s.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:i,vScale:r}=n,s=this.getParsed(t),o=s._custom,a=pm(o)?"["+o.start+", "+o.end+"]":""+r.getLabelForValue(s[r.axis]);return{label:""+i.getLabelForValue(s[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,i,r){const s=r==="reset",{index:o,_cachedMeta:{vScale:a}}=this,c=a.getBasePixel(),l=a.isHorizontal(),u=this._getRuler(),{sharedOptions:h,includeOptions:d}=this._getSharedOptions(n,r);for(let f=n;f<n+i;f++){const p=this.getParsed(f),m=s||vt(p[a.axis])?{base:c,head:c}:this._calculateBarValuePixels(f),g=this._calculateBarIndexPixels(f,u),b=(p._stacks||{})[a.axis],_={horizontal:l,base:m.base,enableBorderRadius:!b||pm(p._custom)||o===b._top||o===b._bottom,x:l?m.head:g.center,y:l?g.center:m.head,height:l?g.size:Math.abs(m.size),width:l?Math.abs(m.size):g.size};d&&(_.options=h||this.resolveDataElementOptions(f,t[f].active?"active":r));const C=_.options||t[f].options;w6(_,C,b,o),C6(_,C,u.ratio),this.updateElement(t[f],f,_,r)}}_getStacks(t,n){const{iScale:i}=this._cachedMeta,r=i.getMatchingVisibleMetas(this._type).filter(u=>u.controller.options.grouped),s=i.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(n),c=a&&a[i.axis],l=u=>{const h=u._parsed.find(f=>f[i.axis]===c),d=h&&h[u.vScale.axis];if(vt(d)||isNaN(d))return!0};for(const u of r)if(!(n!==void 0&&l(u))&&((s===!1||o.indexOf(u.stack)===-1||s===void 0&&u.stack===void 0)&&o.push(u.stack),u.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[lt(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,i){const r=this._getStacks(t,i),s=n!==void 0?r.indexOf(n):-1;return s===-1?r.length-1:s}_getRuler(){const t=this.options,n=this._cachedMeta,i=n.iScale,r=[];let s,o;for(s=0,o=n.data.length;s<o;++s)r.push(i.getPixelForValue(this.getParsed(s)[i.axis],s));const a=t.barThickness;return{min:a||m6(n),pixels:r,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:i,index:r},options:{base:s,minBarLength:o}}=this,a=s||0,c=this.getParsed(t),l=c._custom,u=pm(l);let h=c[n.axis],d=0,f=i?this.applyStack(n,c,i):h,p,m;f!==h&&(d=f-h,f=h),u&&(h=l.barStart,f=l.barEnd-l.barStart,h!==0&&tr(h)!==tr(l.barEnd)&&(d=0),d+=h);const g=!vt(s)&&!u?s:d;let b=n.getPixelForValue(g);if(this.chart.getDataVisibility(t)?p=n.getPixelForValue(d+f):p=b,m=p-b,Math.abs(m)<o){m=b6(m,n,a)*o,h===a&&(b-=m/2);const _=n.getPixelForDecimal(0),C=n.getPixelForDecimal(1),S=Math.min(_,C),k=Math.max(_,C);b=Math.max(Math.min(b,k),S),p=b+m,i&&!u&&(c._stacks[n.axis]._visualValues[r]=n.getValueForPixel(p)-n.getValueForPixel(b))}if(b===n.getPixelForValue(a)){const _=tr(m)*n.getLineWidthForValue(a)/2;b+=_,m-=_}return{size:m,base:b,head:p,center:p+m/2}}_calculateBarIndexPixels(t,n){const i=n.scale,r=this.options,s=r.skipNull,o=lt(r.maxBarThickness,1/0);let a,c;const l=this._getAxisCount();if(n.grouped){const u=s?this._getStackCount(t):n.stackCount,h=r.barThickness==="flex"?v6(t,n,r,u*l):g6(t,n,r,u*l),d=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(lt(d,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,s?t:void 0)+f;a=h.start+h.chunk*p+h.chunk/2,c=Math.min(o,h.chunk*h.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(o,n.min*n.ratio);return{base:a-c/2,head:a+c/2,center:a,size:c}}draw(){const t=this._cachedMeta,n=t.vScale,i=t.data,r=i.length;let s=0;for(;s<r;++s)this.getParsed(s)[n.axis]!==null&&!i[s].hidden&&i[s].draw(this._ctx)}}class S6 extends Ks{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,i,r){const s=super.parsePrimitiveData(t,n,i,r);for(let o=0;o<s.length;o++)s[o]._custom=this.resolveDataElementOptions(o+i).radius;return s}parseArrayData(t,n,i,r){const s=super.parseArrayData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=lt(a[2],this.resolveDataElementOptions(o+i).radius)}return s}parseObjectData(t,n,i,r){const s=super.parseObjectData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=lt(a&&a.r&&+a.r,this.resolveDataElementOptions(o+i).radius)}return s}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let i=t.length-1;i>=0;--i)n=Math.max(n,t[i].size(this.resolveDataElementOptions(i))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y),l=o._custom;return{label:i[t]||"",value:"("+a+", "+c+(l?", "+l:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:c,includeOptions:l}=this._getSharedOptions(n,r),u=o.axis,h=a.axis;for(let d=n;d<n+i;d++){const f=t[d],p=!s&&this.getParsed(d),m={},g=m[u]=s?o.getPixelForDecimal(.5):o.getPixelForValue(p[u]),b=m[h]=s?a.getBasePixel():a.getPixelForValue(p[h]);m.skip=isNaN(g)||isNaN(b),l&&(m.options=c||this.resolveDataElementOptions(d,f.active?"active":r),s&&(m.options.radius=0)),this.updateElement(f,d,m,r)}}resolveDataElementOptions(t,n){const i=this.getParsed(t);let r=super.resolveDataElementOptions(t,n);r.$shared&&(r=Object.assign({},r,{$shared:!1}));const s=r.radius;return n!=="active"&&(r.radius=0),r.radius+=lt(i&&i._custom,s),r}}function E6(e,t,n){let i=1,r=1,s=0,o=0;if(t<Yt){const a=e,c=a+t,l=Math.cos(a),u=Math.sin(a),h=Math.cos(c),d=Math.sin(c),f=(C,S,k)=>Su(C,a,c,!0)?1:Math.max(S,S*n,k,k*n),p=(C,S,k)=>Su(C,a,c,!0)?-1:Math.min(S,S*n,k,k*n),m=f(0,l,h),g=f(fe,u,d),b=p(Dt,l,h),_=p(Dt+fe,u,d);i=(m-b)/2,r=(g-_)/2,s=-(m+b)/2,o=-(g+_)/2}return{ratioX:i,ratioY:r,offsetX:s,offsetY:o}}class $v extends Ks{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((c,l)=>{const h=t.getDatasetMeta(0).controller.getStyle(l);return{text:c,fillStyle:h.backgroundColor,fontColor:s,hidden:!t.getDataVisibility(l),lineDash:h.borderDash,lineDashOffset:h.borderDashOffset,lineJoin:h.borderJoinStyle,lineWidth:h.borderWidth,strokeStyle:h.borderColor,textAlign:r,pointStyle:i,borderRadius:o&&(a||h.borderRadius),index:l}}):[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}}};constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const i=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=i;else{let s=c=>+i[c];if(_t(i[t])){const{key:c="value"}=this._parsing;s=l=>+Ns(i[l],c)}let o,a;for(o=t,a=t+n;o<a;++o)r._parsed[o]=s(o)}}_getRotation(){return Ti(this.options.rotation-90)}_getCircumference(){return Ti(this.options.circumference)}_getRotationExtents(){let t=Yt,n=-Yt;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const r=this.chart.getDatasetMeta(i).controller,s=r._getRotation(),o=r._getCircumference();t=Math.min(t,s),n=Math.max(n,s+o)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:i}=n,r=this._cachedMeta,s=r.data,o=this.getMaxBorderWidth()+this.getMaxOffset(s)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),c=Math.min(L3(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:u,rotation:h}=this._getRotationExtents(),{ratioX:d,ratioY:f,offsetX:p,offsetY:m}=E6(h,u,c),g=(i.width-o)/d,b=(i.height-o)/f,_=Math.max(Math.min(g,b)/2,0),C=Ak(this.options.radius,_),S=Math.max(C*c,0),k=(C-S)/this._getVisibleDatasetWeightTotal();this.offsetX=p*C,this.offsetY=m*C,r.total=this.calculateTotal(),this.outerRadius=C-k*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-k*l,0),this.updateElements(s,0,s.length,t)}_circumference(t,n){const i=this.options,r=this._cachedMeta,s=this._getCircumference();return n&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||r._parsed[t]===null||r.data[t].hidden?0:this.calculateCircumference(r._parsed[t]*s/Yt)}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,a=o.chartArea,l=o.options.animation,u=(a.left+a.right)/2,h=(a.top+a.bottom)/2,d=s&&l.animateScale,f=d?0:this.innerRadius,p=d?0:this.outerRadius,{sharedOptions:m,includeOptions:g}=this._getSharedOptions(n,r);let b=this._getRotation(),_;for(_=0;_<n;++_)b+=this._circumference(_,s);for(_=n;_<n+i;++_){const C=this._circumference(_,s),S=t[_],k={x:u+this.offsetX,y:h+this.offsetY,startAngle:b,endAngle:b+C,circumference:C,outerRadius:p,innerRadius:f};g&&(k.options=m||this.resolveDataElementOptions(_,S.active?"active":r)),b+=C,this.updateElement(S,_,k,r)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let i=0,r;for(r=0;r<n.length;r++){const s=t._parsed[r];s!==null&&!isNaN(s)&&this.chart.getDataVisibility(r)&&!n[r].hidden&&(i+=Math.abs(s))}return i}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?Yt*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=hh(n._parsed[t],i.options.locale);return{label:r[t]||"",value:s}}getMaxBorderWidth(t){let n=0;const i=this.chart;let r,s,o,a,c;if(!t){for(r=0,s=i.data.datasets.length;r<s;++r)if(i.isDatasetVisible(r)){o=i.getDatasetMeta(r),t=o.data,a=o.controller;break}}if(!t)return 0;for(r=0,s=t.length;r<s;++r)c=a.resolveDataElementOptions(r),c.borderAlign!=="inner"&&(n=Math.max(n,c.borderWidth||0,c.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let i=0,r=t.length;i<r;++i){const s=this.resolveDataElementOptions(i);n=Math.max(n,s.offset||0,s.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(n+=this._getRingWeight(i));return n}_getRingWeight(t){return Math.max(lt(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class M6 extends Ks{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:r=[],_dataset:s}=n,o=this.chart._animationsDisabled;let{start:a,count:c}=Hk(n,r,o);this._drawStart=a,this._drawCount=c,Uk(n)&&(a=0,c=r.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!s._decimated,i.points=r;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:l},t),this.updateElements(r,a,c,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,{sharedOptions:u,includeOptions:h}=this._getSharedOptions(n,r),d=o.axis,f=a.axis,{spanGaps:p,segment:m}=this.options,g=dc(p)?p:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||s||r==="none",_=n+i,C=t.length;let S=n>0&&this.getParsed(n-1);for(let k=0;k<C;++k){const $=t[k],D=b?$:{};if(k<n||k>=_){D.skip=!0;continue}const w=this.getParsed(k),x=vt(w[f]),M=D[d]=o.getPixelForValue(w[d],k),I=D[f]=s||x?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,w,c):w[f],k);D.skip=isNaN(M)||isNaN(I)||x,D.stop=k>0&&Math.abs(w[d]-S[d])>g,m&&(D.parsed=w,D.raw=l.data[k]),h&&(D.options=u||this.resolveDataElementOptions(k,$.active?"active":r)),b||this.updateElement($,k,D,r),S=w}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,r=t.data||[];if(!r.length)return i;const s=r[0].size(this.resolveDataElementOptions(0)),o=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(i,s,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}class lS extends Ks{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:i,color:r}}=t.legend.options;return n.labels.map((s,o)=>{const c=t.getDatasetMeta(0).controller.getStyle(o);return{text:s,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:r,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=hh(n._parsed[t].r,i.options.locale);return{label:r[t]||"",value:s}}parseObjectData(t,n,i,r){return Zk.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,r)=>{const s=this.getParsed(r).r;!isNaN(s)&&this.chart.getDataVisibility(r)&&(s<n.min&&(n.min=s),s>n.max&&(n.max=s))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,i=t.options,r=Math.min(n.right-n.left,n.bottom-n.top),s=Math.max(r/2,0),o=Math.max(i.cutoutPercentage?s/100*i.cutoutPercentage:1,0),a=(s-o)/t.getVisibleDatasetCount();this.outerRadius=s-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,c=o.options.animation,l=this._cachedMeta.rScale,u=l.xCenter,h=l.yCenter,d=l.getIndexAngle(0)-.5*Dt;let f=d,p;const m=360/this.countVisibleElements();for(p=0;p<n;++p)f+=this._computeAngle(p,r,m);for(p=n;p<n+i;p++){const g=t[p];let b=f,_=f+this._computeAngle(p,r,m),C=o.getDataVisibility(p)?l.getDistanceFromCenterForValue(this.getParsed(p).r):0;f=_,s&&(c.animateScale&&(C=0),c.animateRotate&&(b=_=d));const S={x:u,y:h,innerRadius:0,outerRadius:C,startAngle:b,endAngle:_,options:this.resolveDataElementOptions(p,g.active?"active":r)};this.updateElement(g,p,S,r)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((i,r)=>{!isNaN(this.getParsed(r).r)&&this.chart.getDataVisibility(r)&&n++}),n}_computeAngle(t,n,i){return this.chart.getDataVisibility(t)?Ti(this.resolveDataElementOptions(t,n).angle||i):0}}class D6 extends $v{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}class $6 extends Ks{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const n=this._cachedMeta.vScale,i=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(i[n.axis])}}parseObjectData(t,n,i,r){return Zk.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta,i=n.dataset,r=n.data||[],s=n.iScale.getLabels();if(i.points=r,t!=="resize"){const o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);const a={_loop:!0,_fullLoop:s.length===r.length,options:o};this.updateElement(i,void 0,a,t)}this.updateElements(r,0,r.length,t)}updateElements(t,n,i,r){const s=this._cachedMeta.rScale,o=r==="reset";for(let a=n;a<n+i;a++){const c=t[a],l=this.resolveDataElementOptions(a,c.active?"active":r),u=s.getPointPositionForValue(a,this.getParsed(a).r),h=o?s.xCenter:u.x,d=o?s.yCenter:u.y,f={x:h,y:d,angle:u.angle,skip:isNaN(h)||isNaN(d),options:l};this.updateElement(c,a,f,r)}}}class T6 extends Ks{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y);return{label:i[t]||"",value:"("+a+", "+c+")"}}update(t){const n=this._cachedMeta,{data:i=[]}=n,r=this.chart._animationsDisabled;let{start:s,count:o}=Hk(n,i,r);if(this._drawStart=s,this._drawCount=o,Uk(n)&&(s=0,o=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:c}=n;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!c._decimated,a.points=i;const l=this.resolveDatasetElementOptions(t);l.segment=this.options.segment,this.updateElement(a,void 0,{animated:!r,options:l},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(i,s,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,u=this.resolveDataElementOptions(n,r),h=this.getSharedOptions(u),d=this.includeOptions(r,h),f=o.axis,p=a.axis,{spanGaps:m,segment:g}=this.options,b=dc(m)?m:Number.POSITIVE_INFINITY,_=this.chart._animationsDisabled||s||r==="none";let C=n>0&&this.getParsed(n-1);for(let S=n;S<n+i;++S){const k=t[S],$=this.getParsed(S),D=_?k:{},w=vt($[p]),x=D[f]=o.getPixelForValue($[f],S),M=D[p]=s||w?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,$,c):$[p],S);D.skip=isNaN(x)||isNaN(M)||w,D.stop=S>0&&Math.abs($[f]-C[f])>b,g&&(D.parsed=$,D.raw=l.data[S]),d&&(D.options=h||this.resolveDataElementOptions(S,k.active?"active":r)),_||this.updateElement(k,S,D,r),C=$}this.updateSharedOptions(h,r,u)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let a=0;for(let c=n.length-1;c>=0;--c)a=Math.max(a,n[c].size(this.resolveDataElementOptions(c))/2);return a>0&&a}const i=t.dataset,r=i.options&&i.options.borderWidth||0;if(!n.length)return r;const s=n[0].size(this.resolveDataElementOptions(0)),o=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(r,s,o)/2}}var I6=Object.freeze({__proto__:null,BarController:k6,BubbleController:S6,DoughnutController:$v,LineController:M6,PieController:D6,PolarAreaController:lS,RadarController:$6,ScatterController:T6});function ro(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Tv{static override(t){Object.assign(Tv.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return ro()}parse(){return ro()}format(){return ro()}add(){return ro()}diff(){return ro()}startOf(){return ro()}endOf(){return ro()}}var O6={_date:Tv};function P6(e,t,n,i){const{controller:r,data:s,_sorted:o}=e,a=r._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&s.length){const l=a._reversePixels?G3:Tr;if(i){if(r._sharedOptions){const u=s[0],h=typeof u.getRange=="function"&&u.getRange(t);if(h){const d=l(s,t,n-h),f=l(s,t,n+h);return{lo:d.lo,hi:f.hi}}}}else{const u=l(s,t,n);if(c){const{vScale:h}=r._cachedMeta,{_parsed:d}=e,f=d.slice(0,u.lo+1).reverse().findIndex(m=>!vt(m[h.axis]));u.lo-=Math.max(0,f);const p=d.slice(u.hi).findIndex(m=>!vt(m[h.axis]));u.hi+=Math.max(0,p)}return u}}return{lo:0,hi:s.length-1}}function ap(e,t,n,i,r){const s=e.getSortedVisibleDatasetMetas(),o=n[t];for(let a=0,c=s.length;a<c;++a){const{index:l,data:u}=s[a],{lo:h,hi:d}=P6(s[a],t,o,r);for(let f=h;f<=d;++f){const p=u[f];p.skip||i(p,l,f)}}}function R6(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,r){const s=t?Math.abs(i.x-r.x):0,o=n?Math.abs(i.y-r.y):0;return Math.sqrt(Math.pow(s,2)+Math.pow(o,2))}}function mm(e,t,n,i,r){const s=[];return!r&&!e.isPointInArea(t)||ap(e,n,t,function(a,c,l){!r&&!Ir(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&s.push({element:a,datasetIndex:c,index:l})},!0),s}function A6(e,t,n,i){let r=[];function s(o,a,c){const{startAngle:l,endAngle:u}=o.getProps(["startAngle","endAngle"],i),{angle:h}=Fk(o,{x:t.x,y:t.y});Su(h,l,u)&&r.push({element:o,datasetIndex:a,index:c})}return ap(e,n,t,s),r}function L6(e,t,n,i,r,s){let o=[];const a=R6(n);let c=Number.POSITIVE_INFINITY;function l(u,h,d){const f=u.inRange(t.x,t.y,r);if(i&&!f)return;const p=u.getCenterPoint(r);if(!(!!s||e.isPointInArea(p))&&!f)return;const g=a(t,p);g<c?(o=[{element:u,datasetIndex:h,index:d}],c=g):g===c&&o.push({element:u,datasetIndex:h,index:d})}return ap(e,n,t,l),o}function gm(e,t,n,i,r,s){return!s&&!e.isPointInArea(t)?[]:n==="r"&&!i?A6(e,t,n,r):L6(e,t,n,i,r,s)}function B_(e,t,n,i,r){const s=[],o=n==="x"?"inXRange":"inYRange";let a=!1;return ap(e,n,t,(c,l,u)=>{c[o]&&c[o](t[n],r)&&(s.push({element:c,datasetIndex:l,index:u}),a=a||c.inRange(t.x,t.y,r))}),i&&!a?[]:s}var N6={modes:{index(e,t,n,i){const r=uo(t,e),s=n.axis||"x",o=n.includeInvisible||!1,a=n.intersect?mm(e,r,s,i,o):gm(e,r,s,!1,i,o),c=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(l=>{const u=a[0].index,h=l.data[u];h&&!h.skip&&c.push({element:h,datasetIndex:l.index,index:u})}),c):[]},dataset(e,t,n,i){const r=uo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;let a=n.intersect?mm(e,r,s,i,o):gm(e,r,s,!1,i,o);if(a.length>0){const c=a[0].datasetIndex,l=e.getDatasetMeta(c).data;a=[];for(let u=0;u<l.length;++u)a.push({element:l[u],datasetIndex:c,index:u})}return a},point(e,t,n,i){const r=uo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return mm(e,r,s,i,o)},nearest(e,t,n,i){const r=uo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return gm(e,r,s,n.intersect,i,o)},x(e,t,n,i){const r=uo(t,e);return B_(e,r,"x",n.intersect,i)},y(e,t,n,i){const r=uo(t,e);return B_(e,r,"y",n.intersect,i)}}};const uS=["left","top","right","bottom"];function Vc(e,t){return e.filter(n=>n.pos===t)}function W_(e,t){return e.filter(n=>uS.indexOf(n.pos)===-1&&n.box.axis===t)}function Kc(e,t){return e.sort((n,i)=>{const r=t?i:n,s=t?n:i;return r.weight===s.weight?r.index-s.index:r.weight-s.weight})}function F6(e){const t=[];let n,i,r,s,o,a;for(n=0,i=(e||[]).length;n<i;++n)r=e[n],{position:s,options:{stack:o,stackWeight:a=1}}=r,t.push({index:n,box:r,pos:s,horizontal:r.isHorizontal(),weight:r.weight,stack:o&&s+o,stackWeight:a});return t}function z6(e){const t={};for(const n of e){const{stack:i,pos:r,stackWeight:s}=n;if(!i||!uS.includes(r))continue;const o=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=s}return t}function j6(e,t){const n=z6(e),{vBoxMaxWidth:i,hBoxMaxHeight:r}=t;let s,o,a;for(s=0,o=e.length;s<o;++s){a=e[s];const{fullSize:c}=a.box,l=n[a.stack],u=l&&a.stackWeight/l.weight;a.horizontal?(a.width=u?u*i:c&&t.availableWidth,a.height=r):(a.width=i,a.height=u?u*r:c&&t.availableHeight)}return n}function B6(e){const t=F6(e),n=Kc(t.filter(l=>l.box.fullSize),!0),i=Kc(Vc(t,"left"),!0),r=Kc(Vc(t,"right")),s=Kc(Vc(t,"top"),!0),o=Kc(Vc(t,"bottom")),a=W_(t,"x"),c=W_(t,"y");return{fullSize:n,leftAndTop:i.concat(s),rightAndBottom:r.concat(c).concat(o).concat(a),chartArea:Vc(t,"chartArea"),vertical:i.concat(r).concat(c),horizontal:s.concat(o).concat(a)}}function H_(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function hS(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function W6(e,t,n,i){const{pos:r,box:s}=n,o=e.maxPadding;if(!_t(r)){n.size&&(e[r]-=n.size);const h=i[n.stack]||{size:0,count:1};h.size=Math.max(h.size,n.horizontal?s.height:s.width),n.size=h.size/h.count,e[r]+=n.size}s.getPadding&&hS(o,s.getPadding());const a=Math.max(0,t.outerWidth-H_(o,e,"left","right")),c=Math.max(0,t.outerHeight-H_(o,e,"top","bottom")),l=a!==e.w,u=c!==e.h;return e.w=a,e.h=c,n.horizontal?{same:l,other:u}:{same:u,other:l}}function H6(e){const t=e.maxPadding;function n(i){const r=Math.max(t[i]-e[i],0);return e[i]+=r,r}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function U6(e,t){const n=t.maxPadding;function i(r){const s={left:0,top:0,right:0,bottom:0};return r.forEach(o=>{s[o]=Math.max(t[o],n[o])}),s}return i(e?["left","right"]:["top","bottom"])}function _l(e,t,n,i){const r=[];let s,o,a,c,l,u;for(s=0,o=e.length,l=0;s<o;++s){a=e[s],c=a.box,c.update(a.width||t.w,a.height||t.h,U6(a.horizontal,t));const{same:h,other:d}=W6(t,n,a,i);l|=h&&r.length,u=u||d,c.fullSize||r.push(a)}return l&&_l(r,t,n,i)||u}function Ih(e,t,n,i,r){e.top=n,e.left=t,e.right=t+i,e.bottom=n+r,e.width=i,e.height=r}function U_(e,t,n,i){const r=n.padding;let{x:s,y:o}=t;for(const a of e){const c=a.box,l=i[a.stack]||{placed:0,weight:1},u=a.stackWeight/l.weight||1;if(a.horizontal){const h=t.w*u,d=l.size||c.height;ku(l.start)&&(o=l.start),c.fullSize?Ih(c,r.left,o,n.outerWidth-r.right-r.left,d):Ih(c,t.left+l.placed,o,h,d),l.start=o,l.placed+=h,o=c.bottom}else{const h=t.h*u,d=l.size||c.width;ku(l.start)&&(s=l.start),c.fullSize?Ih(c,s,r.top,d,n.outerHeight-r.bottom-r.top):Ih(c,s,t.top+l.placed,d,h),l.start=s,l.placed+=h,s=c.right}}t.x=s,t.y=o}var Je={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const r=en(e.options.layout.padding),s=Math.max(t-r.width,0),o=Math.max(n-r.height,0),a=B6(e.boxes),c=a.vertical,l=a.horizontal;Ot(e.boxes,m=>{typeof m.beforeLayout=="function"&&m.beforeLayout()});const u=c.reduce((m,g)=>g.box.options&&g.box.options.display===!1?m:m+1,0)||1,h=Object.freeze({outerWidth:t,outerHeight:n,padding:r,availableWidth:s,availableHeight:o,vBoxMaxWidth:s/2/u,hBoxMaxHeight:o/2}),d=Object.assign({},r);hS(d,en(i));const f=Object.assign({maxPadding:d,w:s,h:o,x:r.left,y:r.top},r),p=j6(c.concat(l),h);_l(a.fullSize,f,h,p),_l(c,f,h,p),_l(l,f,h,p)&&_l(c,f,h,p),H6(f),U_(a.leftAndTop,f,h,p),f.x+=f.w,f.y+=f.h,U_(a.rightAndBottom,f,h,p),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},Ot(a.chartArea,m=>{const g=m.box;Object.assign(g,e.chartArea),g.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class dS{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,r){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,r?Math.floor(n/r):i)}}isAttached(t){return!0}updateConfig(t){}}class Y6 extends dS{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const ed="$chartjs",q6={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Y_=e=>e===null||e==="";function V6(e,t){const n=e.style,i=e.getAttribute("height"),r=e.getAttribute("width");if(e[ed]={initial:{height:i,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Y_(r)){const s=D_(e,"width");s!==void 0&&(e.width=s)}if(Y_(i))if(e.style.height==="")e.height=e.width/(t||2);else{const s=D_(e,"height");s!==void 0&&(e.height=s)}return e}const fS=WN?{passive:!0}:!1;function K6(e,t,n){e&&e.addEventListener(t,n,fS)}function G6(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,fS)}function X6(e,t){const n=q6[e.type]||e.type,{x:i,y:r}=uo(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:r!==void 0?r:null}}function mf(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function Q6(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||mf(a.addedNodes,i),o=o&&!mf(a.removedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function Z6(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||mf(a.removedNodes,i),o=o&&!mf(a.addedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const Mu=new Map;let q_=0;function pS(){const e=window.devicePixelRatio;e!==q_&&(q_=e,Mu.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function J6(e,t){Mu.size||window.addEventListener("resize",pS),Mu.set(e,t)}function tF(e){Mu.delete(e),Mu.size||window.removeEventListener("resize",pS)}function eF(e,t,n){const i=e.canvas,r=i&&Dv(i);if(!r)return;const s=Wk((a,c)=>{const l=r.clientWidth;n(a,c),l<r.clientWidth&&n()},window),o=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,u=c.contentRect.height;l===0&&u===0||s(l,u)});return o.observe(r),J6(e,s),o}function vm(e,t,n){n&&n.disconnect(),t==="resize"&&tF(e)}function nF(e,t,n){const i=e.canvas,r=Wk(s=>{e.ctx!==null&&n(X6(s,e))},e);return K6(i,t,r),r}class iF extends dS{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(V6(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[ed])return!1;const i=n[ed].initial;["height","width"].forEach(s=>{const o=i[s];vt(o)?n.removeAttribute(s):n.setAttribute(s,o)});const r=i.style||{};return Object.keys(r).forEach(s=>{n.style[s]=r[s]}),n.width=n.width,delete n[ed],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const r=t.$proxies||(t.$proxies={}),o={attach:Q6,detach:Z6,resize:eF}[n]||nF;r[n]=o(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),r=i[n];if(!r)return;({attach:vm,detach:vm,resize:vm}[n]||G6)(t,n,r),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,r){return BN(t,n,i,r)}isAttached(t){const n=t&&Dv(t);return!!(n&&n.isConnected)}}function rF(e){return!Mv()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?Y6:iF}class ns{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return dc(this.x)&&dc(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const r={};return t.forEach(s=>{r[s]=i[s]&&i[s].active()?i[s]._to:this[s]}),r}}function sF(e,t){const n=e.options.ticks,i=oF(e),r=Math.min(n.maxTicksLimit||i,i),s=n.major.enabled?cF(t):[],o=s.length,a=s[0],c=s[o-1],l=[];if(o>r)return lF(t,l,s,o/r),l;const u=aF(s,t,r);if(o>0){let h,d;const f=o>1?Math.round((c-a)/(o-1)):null;for(Oh(t,l,u,vt(f)?0:a-f,a),h=0,d=o-1;h<d;h++)Oh(t,l,u,s[h],s[h+1]);return Oh(t,l,u,c,vt(f)?t.length:c+f),l}return Oh(t,l,u),l}function oF(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),r=e._maxLength/n;return Math.floor(Math.min(i,r))}function aF(e,t,n){const i=uF(e),r=t.length/n;if(!i)return Math.max(r,1);const s=U3(i);for(let o=0,a=s.length-1;o<a;o++){const c=s[o];if(c>r)return c}return Math.max(r,1)}function cF(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function lF(e,t,n,i){let r=0,s=n[0],o;for(i=Math.ceil(i),o=0;o<e.length;o++)o===s&&(t.push(e[o]),r++,s=n[r*i])}function Oh(e,t,n,i,r){const s=lt(i,0),o=Math.min(lt(r,e.length),e.length);let a=0,c,l,u;for(n=Math.ceil(n),r&&(c=r-i,n=c/Math.floor(c/n)),u=s;u<0;)a++,u=Math.round(s+a*n);for(l=Math.max(s,0);l<o;l++)l===u&&(t.push(e[l]),a++,u=Math.round(s+a*n))}function uF(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const hF=e=>e==="left"?"right":e==="right"?"left":e,V_=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,K_=(e,t)=>Math.min(t||e,e);function G_(e,t){const n=[],i=e.length/t,r=e.length;let s=0;for(;s<r;s+=i)n.push(e[Math.floor(s)]);return n}function dF(e,t,n){const i=e.ticks.length,r=Math.min(t,i-1),s=e._startPixel,o=e._endPixel,a=1e-6;let c=e.getPixelForTick(r),l;if(!(n&&(i===1?l=Math.max(c-s,o-c):t===0?l=(e.getPixelForTick(1)-c)/2:l=(c-e.getPixelForTick(r-1))/2,c+=r<t?l:-l,c<s-a||c>o+a)))return c}function fF(e,t){Ot(e,n=>{const i=n.gc,r=i.length/2;let s;if(r>t){for(s=0;s<r;++s)delete n.data[i[s]];i.splice(0,r)}})}function Gc(e){return e.drawTicks?e.tickLength:0}function X_(e,t){if(!e.display)return 0;const n=Ce(e.font,t),i=en(e.padding);return(Xt(e.text)?e.text.length:1)*n.lineHeight+i.height}function pF(e,t){return Vs(e,{scale:t,type:"scale"})}function mF(e,t,n){return Vs(e,{tick:n,index:t,type:"tick"})}function gF(e,t,n){let i=wv(e);return(n&&t!=="right"||!n&&t==="right")&&(i=hF(i)),i}function vF(e,t,n,i){const{top:r,left:s,bottom:o,right:a,chart:c}=e,{chartArea:l,scales:u}=c;let h=0,d,f,p;const m=o-r,g=a-s;if(e.isHorizontal()){if(f=Ve(i,s,a),_t(n)){const b=Object.keys(n)[0],_=n[b];p=u[b].getPixelForValue(_)+m-t}else n==="center"?p=(l.bottom+l.top)/2+m-t:p=V_(e,n,t);d=a-s}else{if(_t(n)){const b=Object.keys(n)[0],_=n[b];f=u[b].getPixelForValue(_)-g+t}else n==="center"?f=(l.left+l.right)/2-g+t:f=V_(e,n,t);p=Ve(i,o,r),h=n==="left"?-fe:fe}return{titleX:f,titleY:p,maxWidth:d,rotation:h}}class oa extends ns{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:r}=this;return t=qn(t,Number.POSITIVE_INFINITY),n=qn(n,Number.NEGATIVE_INFINITY),i=qn(i,Number.POSITIVE_INFINITY),r=qn(r,Number.NEGATIVE_INFINITY),{min:qn(t,i),max:qn(n,r),minDefined:ue(t),maxDefined:ue(n)}}getMinMax(t){let{min:n,max:i,minDefined:r,maxDefined:s}=this.getUserBounds(),o;if(r&&s)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)o=a[c].controller.getMinMax(this,t),r||(n=Math.min(n,o.min)),s||(i=Math.max(i,o.max));return n=s&&n>i?i:n,i=r&&n>i?n:i,{min:qn(n,qn(i,n)),max:qn(i,qn(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Wt(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:r,grace:s,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=bN(this,s,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?G_(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=sF(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Wt(this.options.afterUpdate,[this])}beforeSetDimensions(){Wt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Wt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),Wt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Wt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,r,s;for(i=0,r=t.length;i<r;i++)s=t[i],s.label=Wt(n.callback,[s.value,i,t],this)}afterTickToLabelConversion(){Wt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Wt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=K_(this.ticks.length,t.ticks.maxTicksLimit),r=n.minRotation||0,s=n.maxRotation;let o=r,a,c,l;if(!this._isVisible()||!n.display||r>=s||i<=1||!this.isHorizontal()){this.labelRotation=r;return}const u=this._getLabelSizes(),h=u.widest.width,d=u.highest.height,f=Pe(this.chart.width-h,0,this.maxWidth);a=t.offset?this.maxWidth/i:f/(i-1),h+6>a&&(a=f/(i-(t.offset?.5:1)),c=this.maxHeight-Gc(t.grid)-n.padding-X_(t.title,this.chart.options.font),l=Math.sqrt(h*h+d*d),o=bv(Math.min(Math.asin(Pe((u.highest.height+6)/a,-1,1)),Math.asin(Pe(c/l,-1,1))-Math.asin(Pe(d/l,-1,1)))),o=Math.max(r,Math.min(s,o))),this.labelRotation=o}afterCalculateLabelRotation(){Wt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Wt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:r,grid:s}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=X_(r,n.options.font);if(a?(t.width=this.maxWidth,t.height=Gc(s)+c):(t.height=this.maxHeight,t.width=Gc(s)+c),i.display&&this.ticks.length){const{first:l,last:u,widest:h,highest:d}=this._getLabelSizes(),f=i.padding*2,p=Ti(this.labelRotation),m=Math.cos(p),g=Math.sin(p);if(a){const b=i.mirror?0:g*h.width+m*d.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=i.mirror?0:m*h.width+g*d.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(l,u,g,m)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,r){const{ticks:{align:s,padding:o},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const u=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1);let d=0,f=0;c?l?(d=r*t.width,f=i*n.height):(d=i*t.height,f=r*n.width):s==="start"?f=n.width:s==="end"?d=t.width:s!=="inner"&&(d=t.width/2,f=n.width/2),this.paddingLeft=Math.max((d-u+o)*this.width/(this.width-u),0),this.paddingRight=Math.max((f-h+o)*this.width/(this.width-h),0)}else{let u=n.height/2,h=t.height/2;s==="start"?(u=0,h=t.height):s==="end"&&(u=n.height,h=0),this.paddingTop=u+o,this.paddingBottom=h+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Wt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)vt(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=G_(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:r,_longestTextCache:s}=this,o=[],a=[],c=Math.floor(n/K_(n,i));let l=0,u=0,h,d,f,p,m,g,b,_,C,S,k;for(h=0;h<n;h+=c){if(p=t[h].label,m=this._resolveTickFontOptions(h),r.font=g=m.string,b=s[g]=s[g]||{data:{},gc:[]},_=m.lineHeight,C=S=0,!vt(p)&&!Xt(p))C=ff(r,b.data,b.gc,C,p),S=_;else if(Xt(p))for(d=0,f=p.length;d<f;++d)k=p[d],!vt(k)&&!Xt(k)&&(C=ff(r,b.data,b.gc,C,k),S+=_);o.push(C),a.push(S),l=Math.max(C,l),u=Math.max(S,u)}fF(s,n);const $=o.indexOf(l),D=a.indexOf(u),w=x=>({width:o[x]||0,height:a[x]||0});return{first:w(0),last:w(n-1),widest:w($),highest:w(D),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return K3(this._alignToPixels?io(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=mF(this.getContext(),t,i))}return this.$context||(this.$context=pF(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=Ti(this.labelRotation),i=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),s=this._getLabelSizes(),o=t.autoSkipPadding||0,a=s?s.widest.width+o:0,c=s?s.highest.height+o:0;return this.isHorizontal()?c*i>a*r?a/i:c/r:c*r<a*i?c/i:a/r}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,r=this.options,{grid:s,position:o,border:a}=r,c=s.offset,l=this.isHorizontal(),h=this.ticks.length+(c?1:0),d=Gc(s),f=[],p=a.setContext(this.getContext()),m=p.display?p.width:0,g=m/2,b=function(Y){return io(i,Y,m)};let _,C,S,k,$,D,w,x,M,I,T,R;if(o==="top")_=b(this.bottom),D=this.bottom-d,x=_-g,I=b(t.top)+g,R=t.bottom;else if(o==="bottom")_=b(this.top),I=t.top,R=b(t.bottom)-g,D=_+g,x=this.top+d;else if(o==="left")_=b(this.right),$=this.right-d,w=_-g,M=b(t.left)+g,T=t.right;else if(o==="right")_=b(this.left),M=t.left,T=b(t.right)-g,$=_+g,w=this.left+d;else if(n==="x"){if(o==="center")_=b((t.top+t.bottom)/2+.5);else if(_t(o)){const Y=Object.keys(o)[0],F=o[Y];_=b(this.chart.scales[Y].getPixelForValue(F))}I=t.top,R=t.bottom,D=_+g,x=D+d}else if(n==="y"){if(o==="center")_=b((t.left+t.right)/2);else if(_t(o)){const Y=Object.keys(o)[0],F=o[Y];_=b(this.chart.scales[Y].getPixelForValue(F))}$=_-g,w=$-d,M=t.left,T=t.right}const j=lt(r.ticks.maxTicksLimit,h),z=Math.max(1,Math.ceil(h/j));for(C=0;C<h;C+=z){const Y=this.getContext(C),F=s.setContext(Y),G=a.setContext(Y),B=F.lineWidth,q=F.color,W=G.dash||[],V=G.dashOffset,L=F.tickWidth,ot=F.tickColor,kt=F.tickBorderDash||[],Lt=F.tickBorderDashOffset;S=dF(this,C,c),S!==void 0&&(k=io(i,S,B),l?$=w=M=T=k:D=x=I=R=k,f.push({tx1:$,ty1:D,tx2:w,ty2:x,x1:M,y1:I,x2:T,y2:R,width:B,color:q,borderDash:W,borderDashOffset:V,tickWidth:L,tickColor:ot,tickBorderDash:kt,tickBorderDashOffset:Lt}))}return this._ticksLength=h,this._borderValue=_,f}_computeLabelItems(t){const n=this.axis,i=this.options,{position:r,ticks:s}=i,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:u,mirror:h}=s,d=Gc(i.grid),f=d+u,p=h?-u:f,m=-Ti(this.labelRotation),g=[];let b,_,C,S,k,$,D,w,x,M,I,T,R="middle";if(r==="top")$=this.bottom-p,D=this._getXAxisLabelAlignment();else if(r==="bottom")$=this.top+p,D=this._getXAxisLabelAlignment();else if(r==="left"){const z=this._getYAxisLabelAlignment(d);D=z.textAlign,k=z.x}else if(r==="right"){const z=this._getYAxisLabelAlignment(d);D=z.textAlign,k=z.x}else if(n==="x"){if(r==="center")$=(t.top+t.bottom)/2+f;else if(_t(r)){const z=Object.keys(r)[0],Y=r[z];$=this.chart.scales[z].getPixelForValue(Y)+f}D=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")k=(t.left+t.right)/2-f;else if(_t(r)){const z=Object.keys(r)[0],Y=r[z];k=this.chart.scales[z].getPixelForValue(Y)}D=this._getYAxisLabelAlignment(d).textAlign}n==="y"&&(c==="start"?R="top":c==="end"&&(R="bottom"));const j=this._getLabelSizes();for(b=0,_=a.length;b<_;++b){C=a[b],S=C.label;const z=s.setContext(this.getContext(b));w=this.getPixelForTick(b)+s.labelOffset,x=this._resolveTickFontOptions(b),M=x.lineHeight,I=Xt(S)?S.length:1;const Y=I/2,F=z.color,G=z.textStrokeColor,B=z.textStrokeWidth;let q=D;o?(k=w,D==="inner"&&(b===_-1?q=this.options.reverse?"left":"right":b===0?q=this.options.reverse?"right":"left":q="center"),r==="top"?l==="near"||m!==0?T=-I*M+M/2:l==="center"?T=-j.highest.height/2-Y*M+M:T=-j.highest.height+M/2:l==="near"||m!==0?T=M/2:l==="center"?T=j.highest.height/2-Y*M:T=j.highest.height-I*M,h&&(T*=-1),m!==0&&!z.showLabelBackdrop&&(k+=M/2*Math.sin(m))):($=w,T=(1-I)*M/2);let W;if(z.showLabelBackdrop){const V=en(z.backdropPadding),L=j.heights[b],ot=j.widths[b];let kt=T-V.top,Lt=0-V.left;switch(R){case"middle":kt-=L/2;break;case"bottom":kt-=L;break}switch(D){case"center":Lt-=ot/2;break;case"right":Lt-=ot;break;case"inner":b===_-1?Lt-=ot:b>0&&(Lt-=ot/2);break}W={left:Lt,top:kt,width:ot+V.width,height:L+V.height,color:z.backdropColor}}g.push({label:S,font:x,textOffset:T,options:{rotation:m,color:F,strokeColor:G,strokeWidth:B,textAlign:q,textBaseline:R,translation:[k,$],backdrop:W}})}return g}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-Ti(this.labelRotation))return t==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:r,padding:s}}=this.options,o=this._getLabelSizes(),a=t+s,c=o.widest.width;let l,u;return n==="left"?r?(u=this.right+s,i==="near"?l="left":i==="center"?(l="center",u+=c/2):(l="right",u+=c)):(u=this.right-a,i==="near"?l="right":i==="center"?(l="center",u-=c/2):(l="left",u=this.left)):n==="right"?r?(u=this.left+s,i==="near"?l="right":i==="center"?(l="center",u-=c/2):(l="left",u-=c)):(u=this.left+a,i==="near"?l="left":i==="center"?(l="center",u+=c/2):(l="right",u=this.right)):l="right",{textAlign:l,x:u}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:r,width:s,height:o}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,r,s,o),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(s=>s.value===t);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let s,o;const a=(c,l,u)=>{!u.width||!u.color||(i.save(),i.lineWidth=u.width,i.strokeStyle=u.color,i.setLineDash(u.borderDash||[]),i.lineDashOffset=u.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(n.display)for(s=0,o=r.length;s<o;++s){const c=r[s];n.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),n.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:r}}=this,s=i.setContext(this.getContext()),o=i.display?s.width:0;if(!o)return;const a=r.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,u,h,d;this.isHorizontal()?(l=io(t,this.left,o)-o/2,u=io(t,this.right,a)+a/2,h=d=c):(h=io(t,this.top,o)-o/2,d=io(t,this.bottom,a)+a/2,l=u=c),n.save(),n.lineWidth=s.width,n.strokeStyle=s.color,n.beginPath(),n.moveTo(l,h),n.lineTo(u,d),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,r=this._computeLabelArea();r&&rp(i,r);const s=this.getLabelItems(t);for(const o of s){const a=o.options,c=o.font,l=o.label,u=o.textOffset;Vo(i,l,0,u,c,a)}r&&sp(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:r}}=this;if(!i.display)return;const s=Ce(i.font),o=en(i.padding),a=i.align;let c=s.lineHeight/2;n==="bottom"||n==="center"||_t(n)?(c+=o.bottom,Xt(i.text)&&(c+=s.lineHeight*(i.text.length-1))):c+=o.top;const{titleX:l,titleY:u,maxWidth:h,rotation:d}=vF(this,c,n,a);Vo(t,i.text,0,0,s,{color:i.color,maxWidth:h,rotation:d,textAlign:gF(a,n,r),textBaseline:"middle",translation:[l,u]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=lt(t.grid&&t.grid.z,-1),r=lt(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==oa.prototype.draw?[{z:n,draw:s=>{this.draw(s)}}]:[{z:i,draw:s=>{this.drawBackground(),this.drawGrid(s),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:s=>{this.drawLabels(s)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",r=[];let s,o;for(s=0,o=n.length;s<o;++s){const a=n[s];a[i]===this.id&&(!t||a.type===t)&&r.push(a)}return r}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Ce(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Ph{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;_F(n)&&(i=this.register(n));const r=this.items,s=t.id,o=this.scope+"."+s;if(!s)throw new Error("class does not have id: "+t);return s in r||(r[s]=t,yF(t,o,i),this.override&&Zt.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,r=this.scope;i in n&&delete n[i],r&&i in Zt[r]&&(delete Zt[r][i],this.override&&delete qo[i])}}function yF(e,t,n){const i=hc(Object.create(null),[n?Zt.get(n):{},Zt.get(t),e.defaults]);Zt.set(t,i),e.defaultRoutes&&bF(t,e.defaultRoutes),e.descriptors&&Zt.describe(t,e.descriptors)}function bF(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),r=i.pop(),s=[e].concat(i).join("."),o=t[n].split("."),a=o.pop(),c=o.join(".");Zt.route(s,r,c,a)})}function _F(e){return"id"in e&&"defaults"in e}class wF{constructor(){this.controllers=new Ph(Ks,"datasets",!0),this.elements=new Ph(ns,"elements"),this.plugins=new Ph(Object,"plugins"),this.scales=new Ph(oa,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(r=>{const s=i||this._getRegistryForType(r);i||s.isForType(r)||s===this.plugins&&r.id?this._exec(t,s,r):Ot(r,o=>{const a=i||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,n,i){const r=yv(t);Wt(i["before"+r],[],i),n[t](i),Wt(i["after"+r],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const r=n.get(t);if(r===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return r}}var Wi=new wF;class xF{constructor(){this._init=void 0}notify(t,n,i,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const s=r?this._descriptors(t).filter(r):this._descriptors(t),o=this._notify(s,t,n,i);return n==="afterDestroy"&&(this._notify(s,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,n,i,r){r=r||{};for(const s of t){const o=s.plugin,a=o[i],c=[n,r,s.options];if(Wt(a,c,o)===!1&&r.cancelable)return!1}return!0}invalidate(){vt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,r=lt(i.options&&i.options.plugins,{}),s=CF(i);return r===!1&&!n?[]:SF(t,s,r,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,r=(s,o)=>s.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(r(n,i),t,"stop"),this._notify(r(i,n),t,"start")}}function CF(e){const t={},n=[],i=Object.keys(Wi.plugins.items);for(let s=0;s<i.length;s++)n.push(Wi.getPlugin(i[s]));const r=e.plugins||[];for(let s=0;s<r.length;s++){const o=r[s];n.indexOf(o)===-1&&(n.push(o),t[o.id]=!0)}return{plugins:n,localIds:t}}function kF(e,t){return!t&&e===!1?null:e===!0?{}:e}function SF(e,{plugins:t,localIds:n},i,r){const s=[],o=e.getContext();for(const a of t){const c=a.id,l=kF(i[c],r);l!==null&&s.push({plugin:a,options:EF(e.config,{plugin:a,local:n[c]},l,o)})}return s}function EF(e,{plugin:t,local:n},i,r){const s=e.pluginScopeKeys(t),o=e.getOptionScopes(i,s);return n&&t.defaults&&o.push(t.defaults),e.createResolver(o,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Pg(e,t){const n=Zt.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function MF(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function DF(e,t){return e===t?"_index_":"_value_"}function Q_(e){if(e==="x"||e==="y"||e==="r")return e}function $F(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function Rg(e,...t){if(Q_(e))return e;for(const n of t){const i=n.axis||$F(n.position)||e.length>1&&Q_(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Z_(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function TF(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return Z_(e,"x",n[0])||Z_(e,"y",n[0])}return{}}function IF(e,t){const n=qo[e.type]||{scales:{}},i=t.scales||{},r=Pg(e.type,t),s=Object.create(null);return Object.keys(i).forEach(o=>{const a=i[o];if(!_t(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=Rg(o,a,TF(o,e),Zt.scales[a.type]),l=DF(c,r),u=n.scales||{};s[o]=Vl(Object.create(null),[{axis:c},a,u[c],u[l]])}),e.data.datasets.forEach(o=>{const a=o.type||e.type,c=o.indexAxis||Pg(a,t),u=(qo[a]||{}).scales||{};Object.keys(u).forEach(h=>{const d=MF(h,c),f=o[d+"AxisID"]||d;s[f]=s[f]||Object.create(null),Vl(s[f],[{axis:d},i[f],u[h]])})}),Object.keys(s).forEach(o=>{const a=s[o];Vl(a,[Zt.scales[a.type],Zt.scale])}),s}function mS(e){const t=e.options||(e.options={});t.plugins=lt(t.plugins,{}),t.scales=IF(e,t)}function gS(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function OF(e){return e=e||{},e.data=gS(e.data),mS(e),e}const J_=new Map,vS=new Set;function Rh(e,t){let n=J_.get(e);return n||(n=t(),J_.set(e,n),vS.add(n)),n}const Xc=(e,t,n)=>{const i=Ns(t,n);i!==void 0&&e.add(i)};class PF{constructor(t){this._config=OF(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=gS(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),mS(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Rh(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Rh(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Rh(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Rh(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let r=i.get(t);return(!r||n)&&(r=new Map,i.set(t,r)),r}getOptionScopes(t,n,i){const{options:r,type:s}=this,o=this._cachedScopes(t,i),a=o.get(n);if(a)return a;const c=new Set;n.forEach(u=>{t&&(c.add(t),u.forEach(h=>Xc(c,t,h))),u.forEach(h=>Xc(c,r,h)),u.forEach(h=>Xc(c,qo[s]||{},h)),u.forEach(h=>Xc(c,Zt,h)),u.forEach(h=>Xc(c,Ig,h))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),vS.has(n)&&o.set(n,l),l}chartOptionScopes(){const{options:t,type:n}=this;return[t,qo[n]||{},Zt.datasets[n]||{},{type:n},Zt,Ig]}resolveNamedOptions(t,n,i,r=[""]){const s={$shared:!0},{resolver:o,subPrefixes:a}=tw(this._resolverCache,t,r);let c=o;if(AF(o,n)){s.$shared=!1,i=Fs(i)?i():i;const l=this.createResolver(t,i,a);c=fc(o,i,l)}for(const l of n)s[l]=c[l];return s}createResolver(t,n,i=[""],r){const{resolver:s}=tw(this._resolverCache,t,i);return _t(n)?fc(s,n,void 0,r):s}}function tw(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const r=n.join();let s=i.get(r);return s||(s={resolver:kv(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(r,s)),s}const RF=e=>_t(e)&&Object.getOwnPropertyNames(e).some(t=>Fs(e[t]));function AF(e,t){const{isScriptable:n,isIndexable:i}=Kk(e);for(const r of t){const s=n(r),o=i(r),a=(o||s)&&e[r];if(s&&(Fs(a)||RF(a))||o&&Xt(a))return!0}return!1}var LF="4.5.1";const NF=["top","bottom","left","right","chartArea"];function ew(e,t){return e==="top"||e==="bottom"||NF.indexOf(e)===-1&&t==="x"}function nw(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function iw(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),Wt(n&&n.onComplete,[e],t)}function FF(e){const t=e.chart,n=t.options.animation;Wt(n&&n.onProgress,[e],t)}function yS(e){return Mv()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const nd={},rw=e=>{const t=yS(e);return Object.values(nd).filter(n=>n.canvas===t).pop()};function zF(e,t,n){const i=Object.keys(e);for(const r of i){const s=+r;if(s>=t){const o=e[r];delete e[r],(n>0||s>t)&&(e[s+n]=o)}}}function jF(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class Du{static defaults=Zt;static instances=nd;static overrides=qo;static registry=Wi;static version=LF;static getChart=rw;static register(...t){Wi.add(...t),sw()}static unregister(...t){Wi.remove(...t),sw()}constructor(t,n){const i=this.config=new PF(n),r=yS(t),s=rw(r);if(s)throw new Error("Canvas is already in use. Chart with ID '"+s.id+"' must be destroyed before the canvas with ID '"+s.canvas.id+"' can be reused.");const o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||rF(r)),this.platform.updateConfig(i);const a=this.platform.acquireContext(r,o.aspectRatio),c=a&&a.canvas,l=c&&c.height,u=c&&c.width;if(this.id=A3(),this.ctx=a,this.canvas=c,this.width=u,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new xF,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=Z3(h=>this.update(h),o.resizeDelay||0),this._dataChanges=[],nd[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}br.listen(this,"complete",iw),br.listen(this,"progress",FF),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:r,_aspectRatio:s}=this;return vt(t)?n&&s?s:r?i/r:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Wi}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():M_(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return k_(this.canvas,this.ctx),this}stop(){return br.stop(this),this}resize(t,n){br.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,r=this.canvas,s=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(r,t,n,s),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,M_(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),Wt(i.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};Ot(n,(i,r)=>{i.id=r})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,r=Object.keys(i).reduce((o,a)=>(o[a]=!1,o),{});let s=[];n&&(s=s.concat(Object.keys(n).map(o=>{const a=n[o],c=Rg(o,a),l=c==="r",u=c==="x";return{options:a,dposition:l?"chartArea":u?"bottom":"left",dtype:l?"radialLinear":u?"category":"linear"}}))),Ot(s,o=>{const a=o.options,c=a.id,l=Rg(c,a),u=lt(a.type,o.dtype);(a.position===void 0||ew(a.position,l)!==ew(o.dposition))&&(a.position=o.dposition),r[c]=!0;let h=null;if(c in i&&i[c].type===u)h=i[c];else{const d=Wi.getScale(u);h=new d({id:c,type:u,ctx:this.ctx,chart:this}),i[h.id]=h}h.init(a,t)}),Ot(r,(o,a)=>{o||delete i[a]}),Ot(i,o=>{Je.configure(this,o,o.options),Je.addBox(this,o)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((r,s)=>r.index-s.index),i>n){for(let r=n;r<i;++r)this._destroyDatasetMeta(r);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(nw("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,r)=>{n.filter(s=>s===i._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,r;for(this._removeUnreferencedMetasets(),i=0,r=n.length;i<r;i++){const s=n[i];let o=this.getDatasetMeta(i);const a=s.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=a,o.indexAxis=s.indexAxis||Pg(a,this.options),o.order=s.order||0,o.index=i,o.label=""+s.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const c=Wi.getController(a),{datasetElementType:l,dataElementType:u}=Zt.datasets[a];Object.assign(c,{dataElementType:Wi.getElement(u),datasetElementType:l&&Wi.getElement(l)}),o.controller=new c(this,i),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){Ot(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const s=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,u=this.data.datasets.length;l<u;l++){const{controller:h}=this.getDatasetMeta(l),d=!r&&s.indexOf(h)===-1;h.buildOrUpdateElements(d),o=Math.max(+h.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),r||Ot(s,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(nw("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){Ot(this.scales,t=>{Je.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!m_(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:r,count:s}of n){const o=i==="_removeElements"?-s:s;zF(t,r,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=s=>new Set(t.filter(o=>o[0]===s).map((o,a)=>a+","+o.splice(1).join(","))),r=i(0);for(let s=1;s<n;s++)if(!m_(r,i(s)))return;return Array.from(r).map(s=>s.split(",")).map(s=>({method:s[1],start:+s[2],count:+s[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Je.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],Ot(this.boxes,r=>{i&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,s)=>{r._idx=s}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,Fs(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),r={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(i.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(br.has(this)?this.attached&&!br.running(this)&&br.start(this):(this.draw(),iw({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let r,s;for(r=0,s=n.length;r<s;++r){const o=n[r];(!t||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},r=sS(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(r&&rp(n,r),t.controller.draw(),r&&sp(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Ir(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,r){const s=N6.modes[n];return typeof s=="function"?s(this,t,i,r):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let r=i.filter(s=>s&&s._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(r)),r}getContext(){return this.$context||(this.$context=Vs(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const r=i?"show":"hide",s=this.getDatasetMeta(t),o=s.controller._resolveAnimations(void 0,r);ku(n)?(s.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(s,{visible:i}),this.update(a=>a.datasetIndex===t?r:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),br.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),k_(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete nd[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(s,o)=>{n.addEventListener(this,s,o),t[s]=o},r=(s,o,a)=>{s.offsetX=o,s.offsetY=a,this._eventHandler(s)};Ot(this.options.events,s=>i(s,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(c,l)=>{n.addEventListener(this,c,l),t[c]=l},r=(c,l)=>{t[c]&&(n.removeEventListener(this,c,l),delete t[c])},s=(c,l)=>{this.canvas&&this.resize(c,l)};let o;const a=()=>{r("attach",a),this.attached=!0,this.resize(),i("resize",s),i("detach",o)};o=()=>{this.attached=!1,r("resize",s),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():o()}unbindEvents(){Ot(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},Ot(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const r=i?"set":"remove";let s,o,a,c;for(n==="dataset"&&(s=this.getDatasetMeta(t[0].datasetIndex),s.controller["_"+r+"DatasetHoverStyle"]()),a=0,c=t.length;a<c;++a){o=t[a];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[r+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:s,index:o})=>{const a=this.getDatasetMeta(s);if(!a)throw new Error("No dataset found at index "+s);return{datasetIndex:s,element:a.data[o],index:o}});!uf(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const r=this.options.hover,s=(c,l)=>c.filter(u=>!l.some(h=>u.datasetIndex===h.datasetIndex&&u.index===h.index)),o=s(n,t),a=i?t:s(t,n);o.length&&this.updateHoverStyle(o,r.mode,!1),a.length&&r.mode&&this.updateHoverStyle(a,r.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},r=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,r)===!1)return;const s=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,r),(s||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:r=[],options:s}=this,o=n,a=this._getActiveElements(t,r,i,o),c=B3(t),l=jF(t,this._lastEvent,i,c);i&&(this._lastEvent=null,Wt(s.onHover,[t,a,this],this),c&&Wt(s.onClick,[t,a,this],this));const u=!uf(a,r);return(u||n)&&(this._active=a,this._updateHoverStyles(a,r,n)),this._lastEvent=l,u}_getActiveElements(t,n,i,r){if(t.type==="mouseout")return[];if(!i)return n;const s=this.options.hover;return this.getElementsAtEventForMode(t,s.mode,s,r)}}function sw(){return Ot(Du.instances,e=>e._plugins.invalidate())}function BF(e,t,n){const{startAngle:i,x:r,y:s,outerRadius:o,innerRadius:a,options:c}=t,{borderWidth:l,borderJoinStyle:u}=c,h=Math.min(l/o,Qe(i-n));if(e.beginPath(),e.arc(r,s,o-l/2,i+h/2,n-h/2),a>0){const d=Math.min(l/a,Qe(i-n));e.arc(r,s,a+l/2,n-d/2,i+d/2,!0)}else{const d=Math.min(l/2,o*Qe(i-n));if(u==="round")e.arc(r,s,d,n-Dt/2,i+Dt/2,!0);else if(u==="bevel"){const f=2*d*d,p=-f*Math.cos(n+Dt/2)+r,m=-f*Math.sin(n+Dt/2)+s,g=f*Math.cos(i+Dt/2)+r,b=f*Math.sin(i+Dt/2)+s;e.lineTo(p,m),e.lineTo(g,b)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function WF(e,t,n){const{startAngle:i,pixelMargin:r,x:s,y:o,outerRadius:a,innerRadius:c}=t;let l=r/a;e.beginPath(),e.arc(s,o,a,i-l,n+l),c>r?(l=r/c,e.arc(s,o,c,n+l,i-l,!0)):e.arc(s,o,r,n+fe,i-fe),e.closePath(),e.clip()}function HF(e){return Cv(e,["outerStart","outerEnd","innerStart","innerEnd"])}function UF(e,t,n,i){const r=HF(e.options.borderRadius),s=(n-t)/2,o=Math.min(s,i*t/2),a=c=>{const l=(n-Math.min(s,c))*i/2;return Pe(c,0,Math.min(s,l))};return{outerStart:a(r.outerStart),outerEnd:a(r.outerEnd),innerStart:Pe(r.innerStart,0,o),innerEnd:Pe(r.innerEnd,0,o)}}function ya(e,t,n,i){return{x:n+e*Math.cos(t),y:i+e*Math.sin(t)}}function gf(e,t,n,i,r,s){const{x:o,y:a,startAngle:c,pixelMargin:l,innerRadius:u}=t,h=Math.max(t.outerRadius+i+n-l,0),d=u>0?u+i+n+l:0;let f=0;const p=r-c;if(i){const z=u>0?u-i:0,Y=h>0?h-i:0,F=(z+Y)/2,G=F!==0?p*F/(F+i):p;f=(p-G)/2}const m=Math.max(.001,p*h-n/Dt)/h,g=(p-m)/2,b=c+g+f,_=r-g-f,{outerStart:C,outerEnd:S,innerStart:k,innerEnd:$}=UF(t,d,h,_-b),D=h-C,w=h-S,x=b+C/D,M=_-S/w,I=d+k,T=d+$,R=b+k/I,j=_-$/T;if(e.beginPath(),s){const z=(x+M)/2;if(e.arc(o,a,h,x,z),e.arc(o,a,h,z,M),S>0){const B=ya(w,M,o,a);e.arc(B.x,B.y,S,M,_+fe)}const Y=ya(T,_,o,a);if(e.lineTo(Y.x,Y.y),$>0){const B=ya(T,j,o,a);e.arc(B.x,B.y,$,_+fe,j+Math.PI)}const F=(_-$/d+(b+k/d))/2;if(e.arc(o,a,d,_-$/d,F,!0),e.arc(o,a,d,F,b+k/d,!0),k>0){const B=ya(I,R,o,a);e.arc(B.x,B.y,k,R+Math.PI,b-fe)}const G=ya(D,b,o,a);if(e.lineTo(G.x,G.y),C>0){const B=ya(D,x,o,a);e.arc(B.x,B.y,C,b-fe,x)}}else{e.moveTo(o,a);const z=Math.cos(x)*h+o,Y=Math.sin(x)*h+a;e.lineTo(z,Y);const F=Math.cos(M)*h+o,G=Math.sin(M)*h+a;e.lineTo(F,G)}e.closePath()}function YF(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a}=t;let c=t.endAngle;if(s){gf(e,t,n,i,c,r);for(let l=0;l<s;++l)e.fill();isNaN(a)||(c=o+(a%Yt||Yt))}return gf(e,t,n,i,c,r),e.fill(),c}function qF(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a,options:c}=t,{borderWidth:l,borderJoinStyle:u,borderDash:h,borderDashOffset:d,borderRadius:f}=c,p=c.borderAlign==="inner";if(!l)return;e.setLineDash(h||[]),e.lineDashOffset=d,p?(e.lineWidth=l*2,e.lineJoin=u||"round"):(e.lineWidth=l,e.lineJoin=u||"bevel");let m=t.endAngle;if(s){gf(e,t,n,i,m,r);for(let g=0;g<s;++g)e.stroke();isNaN(a)||(m=o+(a%Yt||Yt))}p&&WF(e,t,m),c.selfJoin&&m-o>=Dt&&f===0&&u!=="miter"&&BF(e,t,m),s||(gf(e,t,n,i,m,r),e.stroke())}class VF extends ns{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.getProps(["x","y"],i),{angle:s,distance:o}=Fk(r,{x:t,y:n}),{startAngle:a,endAngle:c,innerRadius:l,outerRadius:u,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),d=(this.options.spacing+this.options.borderWidth)/2,f=lt(h,c-a),p=Su(s,a,c)&&a!==c,m=f>=Yt||p,g=$r(o,l+d,u+d);return m&&g}getCenterPoint(t){const{x:n,y:i,startAngle:r,endAngle:s,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:c,spacing:l}=this.options,u=(r+s)/2,h=(o+a+l+c)/2;return{x:n+Math.cos(u)*h,y:i+Math.sin(u)*h}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:n,circumference:i}=this,r=(n.offset||0)/4,s=(n.spacing||0)/2,o=n.circular;if(this.pixelMargin=n.borderAlign==="inner"?.33:0,this.fullCircles=i>Yt?Math.floor(i/Yt):0,i===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*r,Math.sin(a)*r);const c=1-Math.sin(Math.min(Dt,i||0)),l=r*c;t.fillStyle=n.backgroundColor,t.strokeStyle=n.borderColor,YF(t,this,l,s,o),qF(t,this,l,s,o),t.restore()}}function bS(e,t,n=t){e.lineCap=lt(n.borderCapStyle,t.borderCapStyle),e.setLineDash(lt(n.borderDash,t.borderDash)),e.lineDashOffset=lt(n.borderDashOffset,t.borderDashOffset),e.lineJoin=lt(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=lt(n.borderWidth,t.borderWidth),e.strokeStyle=lt(n.borderColor,t.borderColor)}function KF(e,t,n){e.lineTo(n.x,n.y)}function GF(e){return e.stepped?uN:e.tension||e.cubicInterpolationMode==="monotone"?hN:KF}function _S(e,t,n={}){const i=e.length,{start:r=0,end:s=i-1}=n,{start:o,end:a}=t,c=Math.max(r,o),l=Math.min(s,a),u=r<o&&s<o||r>a&&s>a;return{count:i,start:c,loop:t.loop,ilen:l<c&&!u?i+l-c:l-c}}function XF(e,t,n,i){const{points:r,options:s}=t,{count:o,start:a,loop:c,ilen:l}=_S(r,n,i),u=GF(s);let{move:h=!0,reverse:d}=i||{},f,p,m;for(f=0;f<=l;++f)p=r[(a+(d?l-f:f))%o],!p.skip&&(h?(e.moveTo(p.x,p.y),h=!1):u(e,m,p,d,s.stepped),m=p);return c&&(p=r[(a+(d?l:0))%o],u(e,m,p,d,s.stepped)),!!c}function QF(e,t,n,i){const r=t.points,{count:s,start:o,ilen:a}=_S(r,n,i),{move:c=!0,reverse:l}=i||{};let u=0,h=0,d,f,p,m,g,b;const _=S=>(o+(l?a-S:S))%s,C=()=>{m!==g&&(e.lineTo(u,g),e.lineTo(u,m),e.lineTo(u,b))};for(c&&(f=r[_(0)],e.moveTo(f.x,f.y)),d=0;d<=a;++d){if(f=r[_(d)],f.skip)continue;const S=f.x,k=f.y,$=S|0;$===p?(k<m?m=k:k>g&&(g=k),u=(h*u+S)/++h):(C(),e.lineTo(S,k),p=$,h=0,m=g=k),b=k}C()}function Ag(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?QF:XF}function ZF(e){return e.stepped?HN:e.tension||e.cubicInterpolationMode==="monotone"?UN:ho}function JF(e,t,n,i){let r=t._path;r||(r=t._path=new Path2D,t.path(r,n,i)&&r.closePath()),bS(e,t.options),e.stroke(r)}function tz(e,t,n,i){const{segments:r,options:s}=t,o=Ag(t);for(const a of r)bS(e,s,a.style),e.beginPath(),o(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const ez=typeof Path2D=="function";function nz(e,t,n,i){ez&&!t.options.segment?JF(e,t,n,i):tz(e,t,n,i)}class cp extends ns{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const r=i.spanGaps?this._loop:this._fullLoop;AN(this._points,i,t,r,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=XN(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,r=t[n],s=this.points,o=rS(this,{property:n,start:r,end:r});if(!o.length)return;const a=[],c=ZF(i);let l,u;for(l=0,u=o.length;l<u;++l){const{start:h,end:d}=o[l],f=s[h],p=s[d];if(f===p){a.push(f);continue}const m=Math.abs((r-f[n])/(p[n]-f[n])),g=c(f,p,m,i.stepped);g[n]=t[n],a.push(g)}return a.length===1?a[0]:a}pathSegment(t,n,i){return Ag(this)(t,this,n,i)}path(t,n,i){const r=this.segments,s=Ag(this);let o=this._loop;n=n||0,i=i||this.points.length-n;for(const a of r)o&=s(t,this,a,{start:n,end:n+i-1});return!!o}draw(t,n,i,r){const s=this.options||{};(this.points||[]).length&&s.borderWidth&&(t.save(),nz(t,this,i,r),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function ow(e,t,n,i){const r=e.options,{[n]:s}=e.getProps([n],i);return Math.abs(t-s)<r.radius+r.hitRadius}class iz extends ns{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.options,{x:s,y:o}=this.getProps(["x","y"],i);return Math.pow(t-s,2)+Math.pow(n-o,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(t,n){return ow(this,t,"x",n)}inYRange(t,n){return ow(this,t,"y",n)}getCenterPoint(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}size(t){t=t||this.options||{};let n=t.radius||0;n=Math.max(n,n&&t.hoverRadius||0);const i=n&&t.borderWidth||0;return(n+i)*2}draw(t,n){const i=this.options;this.skip||i.radius<.1||!Ir(this,n,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,Og(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function wS(e,t){const{x:n,y:i,base:r,width:s,height:o}=e.getProps(["x","y","base","width","height"],t);let a,c,l,u,h;return e.horizontal?(h=o/2,a=Math.min(n,r),c=Math.max(n,r),l=i-h,u=i+h):(h=s/2,a=n-h,c=n+h,l=Math.min(i,r),u=Math.max(i,r)),{left:a,top:l,right:c,bottom:u}}function Cs(e,t,n,i){return e?0:Pe(t,n,i)}function rz(e,t,n){const i=e.options.borderWidth,r=e.borderSkipped,s=Vk(i);return{t:Cs(r.top,s.top,0,n),r:Cs(r.right,s.right,0,t),b:Cs(r.bottom,s.bottom,0,n),l:Cs(r.left,s.left,0,t)}}function sz(e,t,n){const{enableBorderRadius:i}=e.getProps(["enableBorderRadius"]),r=e.options.borderRadius,s=Mo(r),o=Math.min(t,n),a=e.borderSkipped,c=i||_t(r);return{topLeft:Cs(!c||a.top||a.left,s.topLeft,0,o),topRight:Cs(!c||a.top||a.right,s.topRight,0,o),bottomLeft:Cs(!c||a.bottom||a.left,s.bottomLeft,0,o),bottomRight:Cs(!c||a.bottom||a.right,s.bottomRight,0,o)}}function oz(e){const t=wS(e),n=t.right-t.left,i=t.bottom-t.top,r=rz(e,n/2,i/2),s=sz(e,n/2,i/2);return{outer:{x:t.left,y:t.top,w:n,h:i,radius:s},inner:{x:t.left+r.l,y:t.top+r.t,w:n-r.l-r.r,h:i-r.t-r.b,radius:{topLeft:Math.max(0,s.topLeft-Math.max(r.t,r.l)),topRight:Math.max(0,s.topRight-Math.max(r.t,r.r)),bottomLeft:Math.max(0,s.bottomLeft-Math.max(r.b,r.l)),bottomRight:Math.max(0,s.bottomRight-Math.max(r.b,r.r))}}}}function ym(e,t,n,i){const r=t===null,s=n===null,a=e&&!(r&&s)&&wS(e,i);return a&&(r||$r(t,a.left,a.right))&&(s||$r(n,a.top,a.bottom))}function az(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function cz(e,t){e.rect(t.x,t.y,t.w,t.h)}function bm(e,t,n={}){const i=e.x!==n.x?-t:0,r=e.y!==n.y?-t:0,s=(e.x+e.w!==n.x+n.w?t:0)-i,o=(e.y+e.h!==n.y+n.h?t:0)-r;return{x:e.x+i,y:e.y+r,w:e.w+s,h:e.h+o,radius:e.radius}}class lz extends ns{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:i,backgroundColor:r}}=this,{inner:s,outer:o}=oz(this),a=az(o.radius)?Eu:cz;t.save(),(o.w!==s.w||o.h!==s.h)&&(t.beginPath(),a(t,bm(o,n,s)),t.clip(),a(t,bm(s,-n,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,bm(s,n)),t.fillStyle=r,t.fill(),t.restore()}inRange(t,n,i){return ym(this,t,n,i)}inXRange(t,n){return ym(this,t,null,n)}inYRange(t,n){return ym(this,null,t,n)}getCenterPoint(t){const{x:n,y:i,base:r,horizontal:s}=this.getProps(["x","y","base","horizontal"],t);return{x:s?(n+r)/2:n,y:s?i:(i+r)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}var uz=Object.freeze({__proto__:null,ArcElement:VF,BarElement:lz,LineElement:cp,PointElement:iz});const Lg=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],aw=Lg.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function xS(e){return Lg[e%Lg.length]}function CS(e){return aw[e%aw.length]}function hz(e,t){return e.borderColor=xS(t),e.backgroundColor=CS(t),++t}function dz(e,t){return e.backgroundColor=e.data.map(()=>xS(t++)),t}function fz(e,t){return e.backgroundColor=e.data.map(()=>CS(t++)),t}function pz(e){let t=0;return(n,i)=>{const r=e.getDatasetMeta(i).controller;r instanceof $v?t=dz(n,t):r instanceof lS?t=fz(n,t):r&&(t=hz(n,t))}}function cw(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function mz(e){return e&&(e.borderColor||e.backgroundColor)}function gz(){return Zt.borderColor!=="rgba(0,0,0,0.1)"||Zt.backgroundColor!=="rgba(0,0,0,0.1)"}var vz={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:i},options:r}=e.config,{elements:s}=r,o=cw(i)||mz(r)||s&&cw(s)||gz();if(!n.forceOverride&&o)return;const a=pz(e);i.forEach(a)}};function yz(e,t,n,i,r){const s=r.samples||i;if(s>=n)return e.slice(t,t+n);const o=[],a=(n-2)/(s-2);let c=0;const l=t+n-1;let u=t,h,d,f,p,m;for(o[c++]=e[u],h=0;h<s-2;h++){let g=0,b=0,_;const C=Math.floor((h+1)*a)+1+t,S=Math.min(Math.floor((h+2)*a)+1,n)+t,k=S-C;for(_=C;_<S;_++)g+=e[_].x,b+=e[_].y;g/=k,b/=k;const $=Math.floor(h*a)+1+t,D=Math.min(Math.floor((h+1)*a)+1,n)+t,{x:w,y:x}=e[u];for(f=p=-1,_=$;_<D;_++)p=.5*Math.abs((w-g)*(e[_].y-x)-(w-e[_].x)*(b-x)),p>f&&(f=p,d=e[_],m=_);o[c++]=d,u=m}return o[c++]=e[l],o}function bz(e,t,n,i){let r=0,s=0,o,a,c,l,u,h,d,f,p,m;const g=[],b=t+n-1,_=e[t].x,S=e[b].x-_;for(o=t;o<t+n;++o){a=e[o],c=(a.x-_)/S*i,l=a.y;const k=c|0;if(k===u)l<p?(p=l,h=o):l>m&&(m=l,d=o),r=(s*r+a.x)/++s;else{const $=o-1;if(!vt(h)&&!vt(d)){const D=Math.min(h,d),w=Math.max(h,d);D!==f&&D!==$&&g.push({...e[D],x:r}),w!==f&&w!==$&&g.push({...e[w],x:r})}o>0&&$!==f&&g.push(e[$]),g.push(a),u=k,s=0,p=m=l,h=d=f=o}}return g}function kS(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function lw(e){e.data.datasets.forEach(t=>{kS(t)})}function _z(e,t){const n=t.length;let i=0,r;const{iScale:s}=e,{min:o,max:a,minDefined:c,maxDefined:l}=s.getUserBounds();return c&&(i=Pe(Tr(t,s.axis,o).lo,0,n-1)),l?r=Pe(Tr(t,s.axis,a).hi+1,i,n)-i:r=n-i,{start:i,count:r}}var wz={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){lw(e);return}const i=e.width;e.data.datasets.forEach((r,s)=>{const{_data:o,indexAxis:a}=r,c=e.getDatasetMeta(s),l=o||r.data;if(bl([a,e.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const u=e.scales[c.xAxisID];if(u.type!=="linear"&&u.type!=="time"||e.options.parsing)return;let{start:h,count:d}=_z(c,l);const f=n.threshold||4*i;if(d<=f){kS(r);return}vt(o)&&(r._data=l,delete r.data,Object.defineProperty(r,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(m){this._data=m}}));let p;switch(n.algorithm){case"lttb":p=yz(l,h,d,i,n);break;case"min-max":p=bz(l,h,d,i);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}r._decimated=p})},destroy(e){lw(e)}};function xz(e,t,n){const i=e.segments,r=e.points,s=t.points,o=[];for(const a of i){let{start:c,end:l}=a;l=lp(c,l,r);const u=Ng(n,r[c],r[l],a.loop);if(!t.segments){o.push({source:a,target:u,start:r[c],end:r[l]});continue}const h=rS(t,u);for(const d of h){const f=Ng(n,s[d.start],s[d.end],d.loop),p=iS(a,r,f);for(const m of p)o.push({source:m,target:d,start:{[n]:uw(u,f,"start",Math.max)},end:{[n]:uw(u,f,"end",Math.min)}})}}return o}function Ng(e,t,n,i){if(i)return;let r=t[e],s=n[e];return e==="angle"&&(r=Qe(r),s=Qe(s)),{property:e,start:r,end:s}}function Cz(e,t){const{x:n=null,y:i=null}=e||{},r=t.points,s=[];return t.segments.forEach(({start:o,end:a})=>{a=lp(o,a,r);const c=r[o],l=r[a];i!==null?(s.push({x:c.x,y:i}),s.push({x:l.x,y:i})):n!==null&&(s.push({x:n,y:c.y}),s.push({x:n,y:l.y}))}),s}function lp(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function uw(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function SS(e,t){let n=[],i=!1;return Xt(e)?(i=!0,n=e):n=Cz(e,t),n.length?new cp({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function hw(e){return e&&e.fill!==!1}function kz(e,t,n){let r=e[t].fill;const s=[t];let o;if(!n)return r;for(;r!==!1&&s.indexOf(r)===-1;){if(!ue(r))return r;if(o=e[r],!o)return!1;if(o.visible)return r;s.push(r),r=o.fill}return!1}function Sz(e,t,n){const i=$z(e);if(_t(i))return isNaN(i.value)?!1:i;let r=parseFloat(i);return ue(r)&&Math.floor(r)===r?Ez(i[0],t,r,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function Ez(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function Mz(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:_t(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function Dz(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:_t(e)?i=e.value:i=t.getBaseValue(),i}function $z(e){const t=e.options,n=t.fill;let i=lt(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function Tz(e){const{scale:t,index:n,line:i}=e,r=[],s=i.segments,o=i.points,a=Iz(t,n);a.push(SS({x:null,y:t.bottom},i));for(let c=0;c<s.length;c++){const l=s[c];for(let u=l.start;u<=l.end;u++)Oz(r,o[u],a)}return new cp({points:r,options:{}})}function Iz(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let r=0;r<i.length;r++){const s=i[r];if(s.index===t)break;s.hidden||n.unshift(s.dataset)}return n}function Oz(e,t,n){const i=[];for(let r=0;r<n.length;r++){const s=n[r],{first:o,last:a,point:c}=Pz(s,t,"x");if(!(!c||o&&a)){if(o)i.unshift(c);else if(e.push(c),!a)break}}e.push(...i)}function Pz(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const r=i[n],s=e.segments,o=e.points;let a=!1,c=!1;for(let l=0;l<s.length;l++){const u=s[l],h=o[u.start][n],d=o[u.end][n];if($r(r,h,d)){a=r===h,c=r===d;break}}return{first:a,last:c,point:i}}class ES{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:r,y:s,radius:o}=this;return n=n||{start:0,end:Yt},t.arc(r,s,o,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:r}=this,s=t.angle;return{x:n+Math.cos(s)*r,y:i+Math.sin(s)*r,angle:s}}}function Rz(e){const{chart:t,fill:n,line:i}=e;if(ue(n))return Az(t,n);if(n==="stack")return Tz(e);if(n==="shape")return!0;const r=Lz(e);return r instanceof ES?r:SS(r,i)}function Az(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function Lz(e){return(e.scale||{}).getPointPositionForValue?Fz(e):Nz(e)}function Nz(e){const{scale:t={},fill:n}=e,i=Mz(n,t);if(ue(i)){const r=t.isHorizontal();return{x:r?i:null,y:r?null:i}}return null}function Fz(e){const{scale:t,fill:n}=e,i=t.options,r=t.getLabels().length,s=i.reverse?t.max:t.min,o=Dz(n,t,s),a=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,s);return new ES({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(o)})}for(let c=0;c<r;++c)a.push(t.getPointPositionForValue(c,o));return a}function _m(e,t,n){const i=Rz(t),{chart:r,index:s,line:o,scale:a,axis:c}=t,l=o.options,u=l.fill,h=l.backgroundColor,{above:d=h,below:f=h}=u||{},p=r.getDatasetMeta(s),m=sS(r,p);i&&o.points.length&&(rp(e,n),zz(e,{line:o,target:i,above:d,below:f,area:n,scale:a,axis:c,clip:m}),sp(e))}function zz(e,t){const{line:n,target:i,above:r,below:s,area:o,scale:a,clip:c}=t,l=n._loop?"angle":t.axis;e.save();let u=s;s!==r&&(l==="x"?(dw(e,i,o.top),wm(e,{line:n,target:i,color:r,scale:a,property:l,clip:c}),e.restore(),e.save(),dw(e,i,o.bottom)):l==="y"&&(fw(e,i,o.left),wm(e,{line:n,target:i,color:s,scale:a,property:l,clip:c}),e.restore(),e.save(),fw(e,i,o.right),u=r)),wm(e,{line:n,target:i,color:u,scale:a,property:l,clip:c}),e.restore()}function dw(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,u=r[c],h=r[lp(c,l,r)];s?(e.moveTo(u.x,u.y),s=!1):(e.lineTo(u.x,n),e.lineTo(u.x,u.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(h.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function fw(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,u=r[c],h=r[lp(c,l,r)];s?(e.moveTo(u.x,u.y),s=!1):(e.lineTo(n,u.y),e.lineTo(u.x,u.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(n,h.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function wm(e,t){const{line:n,target:i,property:r,color:s,scale:o,clip:a}=t,c=xz(n,i,r);for(const{source:l,target:u,start:h,end:d}of c){const{style:{backgroundColor:f=s}={}}=l,p=i!==!0;e.save(),e.fillStyle=f,jz(e,o,a,p&&Ng(r,h,d)),e.beginPath();const m=!!n.pathSegment(e,l);let g;if(p){m?e.closePath():pw(e,i,d,r);const b=!!i.pathSegment(e,u,{move:m,reverse:!0});g=m&&b,g||pw(e,i,h,r)}e.closePath(),e.fill(g?"evenodd":"nonzero"),e.restore()}}function jz(e,t,n,i){const r=t.chart.chartArea,{property:s,start:o,end:a}=i||{};if(s==="x"||s==="y"){let c,l,u,h;s==="x"?(c=o,l=r.top,u=a,h=r.bottom):(c=r.left,l=o,u=r.right,h=a),e.beginPath(),n&&(c=Math.max(c,n.left),u=Math.min(u,n.right),l=Math.max(l,n.top),h=Math.min(h,n.bottom)),e.rect(c,l,u-c,h-l),e.clip()}}function pw(e,t,n,i){const r=t.interpolate(n,i);r&&e.lineTo(r.x,r.y)}var Bz={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,r=[];let s,o,a,c;for(o=0;o<i;++o)s=e.getDatasetMeta(o),a=s.dataset,c=null,a&&a.options&&a instanceof cp&&(c={visible:e.isDatasetVisible(o),index:o,fill:Sz(a,o,i),chart:e,axis:s.controller.options.indexAxis,scale:s.vScale,line:a}),s.$filler=c,r.push(c);for(o=0;o<i;++o)c=r[o],!(!c||c.fill===!1)&&(c.fill=kz(r,o,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",r=e.getSortedVisibleDatasetMetas(),s=e.chartArea;for(let o=r.length-1;o>=0;--o){const a=r[o].$filler;a&&(a.line.updateControlPoints(s,a.axis),i&&a.fill&&_m(e.ctx,a,s))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let r=i.length-1;r>=0;--r){const s=i[r].$filler;hw(s)&&_m(e.ctx,s,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!hw(i)||n.drawTime!=="beforeDatasetDraw"||_m(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const mw=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},Wz=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class gw extends ns{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=Wt(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,r)=>t.sort(i,r,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,r=Ce(i.font),s=r.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=mw(i,s);let l,u;n.font=r.string,this.isHorizontal()?(l=this.maxWidth,u=this._fitRows(o,s,a,c)+10):(u=this.maxHeight,l=this._fitCols(o,r,a,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(u,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,r){const{ctx:s,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],u=r+a;let h=t;s.textAlign="left",s.textBaseline="middle";let d=-1,f=-u;return this.legendItems.forEach((p,m)=>{const g=i+n/2+s.measureText(p.text).width;(m===0||l[l.length-1]+g+2*a>o)&&(h+=u,l[l.length-(m>0?0:1)]=0,f+=u,d++),c[m]={left:0,top:f,row:d,width:g,height:r},l[l.length-1]+=g+a}),h}_fitCols(t,n,i,r){const{ctx:s,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],u=o-t;let h=a,d=0,f=0,p=0,m=0;return this.legendItems.forEach((g,b)=>{const{itemWidth:_,itemHeight:C}=Hz(i,n,s,g,r);b>0&&f+C+2*a>u&&(h+=d+a,l.push({width:d,height:f}),p+=d+a,m++,d=f=0),c[b]={left:p,top:f,col:m,width:_,height:C},d=Math.max(d,_),f+=C+a}),h+=d,l.push({width:d,height:f}),h}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:r},rtl:s}}=this,o=Ha(s,this.left,this.width);if(this.isHorizontal()){let a=0,c=Ve(i,this.left+r,this.right-this.lineWidths[a]);for(const l of n)a!==l.row&&(a=l.row,c=Ve(i,this.left+r,this.right-this.lineWidths[a])),l.top+=this.top+t+r,l.left=o.leftForLtr(o.x(c),l.width),c+=l.width+r}else{let a=0,c=Ve(i,this.top+t+r,this.bottom-this.columnSizes[a].height);for(const l of n)l.col!==a&&(a=l.col,c=Ve(i,this.top+t+r,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+r,l.left=o.leftForLtr(o.x(l.left),l.width),c+=l.height+r}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;rp(t,this),this._draw(),sp(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:r}=this,{align:s,labels:o}=t,a=Zt.color,c=Ha(t.rtl,this.left,this.width),l=Ce(o.font),{padding:u}=o,h=l.size,d=h/2;let f;this.drawTitle(),r.textAlign=c.textAlign("left"),r.textBaseline="middle",r.lineWidth=.5,r.font=l.string;const{boxWidth:p,boxHeight:m,itemHeight:g}=mw(o,h),b=function($,D,w){if(isNaN(p)||p<=0||isNaN(m)||m<0)return;r.save();const x=lt(w.lineWidth,1);if(r.fillStyle=lt(w.fillStyle,a),r.lineCap=lt(w.lineCap,"butt"),r.lineDashOffset=lt(w.lineDashOffset,0),r.lineJoin=lt(w.lineJoin,"miter"),r.lineWidth=x,r.strokeStyle=lt(w.strokeStyle,a),r.setLineDash(lt(w.lineDash,[])),o.usePointStyle){const M={radius:m*Math.SQRT2/2,pointStyle:w.pointStyle,rotation:w.rotation,borderWidth:x},I=c.xPlus($,p/2),T=D+d;qk(r,M,I,T,o.pointStyleWidth&&p)}else{const M=D+Math.max((h-m)/2,0),I=c.leftForLtr($,p),T=Mo(w.borderRadius);r.beginPath(),Object.values(T).some(R=>R!==0)?Eu(r,{x:I,y:M,w:p,h:m,radius:T}):r.rect(I,M,p,m),r.fill(),x!==0&&r.stroke()}r.restore()},_=function($,D,w){Vo(r,w.text,$,D+g/2,l,{strikethrough:w.hidden,textAlign:c.textAlign(w.textAlign)})},C=this.isHorizontal(),S=this._computeTitleHeight();C?f={x:Ve(s,this.left+u,this.right-i[0]),y:this.top+u+S,line:0}:f={x:this.left+u,y:Ve(s,this.top+S+u,this.bottom-n[0].height),line:0},tS(this.ctx,t.textDirection);const k=g+u;this.legendItems.forEach(($,D)=>{r.strokeStyle=$.fontColor,r.fillStyle=$.fontColor;const w=r.measureText($.text).width,x=c.textAlign($.textAlign||($.textAlign=o.textAlign)),M=p+d+w;let I=f.x,T=f.y;c.setWidth(this.width),C?D>0&&I+M+u>this.right&&(T=f.y+=k,f.line++,I=f.x=Ve(s,this.left+u,this.right-i[f.line])):D>0&&T+k>this.bottom&&(I=f.x=I+n[f.line].width+u,f.line++,T=f.y=Ve(s,this.top+S+u,this.bottom-n[f.line].height));const R=c.x(I);if(b(R,T,$),I=J3(x,I+p+d,C?I+M:this.right,t.rtl),_(c.x(I),T,$),C)f.x+=M+u;else if(typeof $.text!="string"){const j=l.lineHeight;f.y+=MS($,j)+u}else f.y+=k}),eS(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=Ce(n.font),r=en(n.padding);if(!n.display)return;const s=Ha(t.rtl,this.left,this.width),o=this.ctx,a=n.position,c=i.size/2,l=r.top+c;let u,h=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),u=this.top+l,h=Ve(t.align,h,this.right-d);else{const p=this.columnSizes.reduce((m,g)=>Math.max(m,g.height),0);u=l+Ve(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const f=Ve(a,h,h+d);o.textAlign=s.textAlign(wv(a)),o.textBaseline="middle",o.strokeStyle=n.color,o.fillStyle=n.color,o.font=i.string,Vo(o,n.text,f,u,i)}_computeTitleHeight(){const t=this.options.title,n=Ce(t.font),i=en(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,r,s;if($r(t,this.left,this.right)&&$r(n,this.top,this.bottom)){for(s=this.legendHitBoxes,i=0;i<s.length;++i)if(r=s[i],$r(t,r.left,r.left+r.width)&&$r(n,r.top,r.top+r.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!qz(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const r=this._hoveredItem,s=Wz(r,i);r&&!s&&Wt(n.onLeave,[t,r,this],this),this._hoveredItem=i,i&&!s&&Wt(n.onHover,[t,i,this],this)}else i&&Wt(n.onClick,[t,i,this],this)}}function Hz(e,t,n,i,r){const s=Uz(i,e,t,n),o=Yz(r,i,t.lineHeight);return{itemWidth:s,itemHeight:o}}function Uz(e,t,n,i){let r=e.text;return r&&typeof r!="string"&&(r=r.reduce((s,o)=>s.length>o.length?s:o)),t+n.size/2+i.measureText(r).width}function Yz(e,t,n){let i=e;return typeof t.text!="string"&&(i=MS(t,n)),i}function MS(e,t){const n=e.text?e.text.length:0;return t*n}function qz(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var Vz={id:"legend",_element:gw,start(e,t,n){const i=e.legend=new gw({ctx:e.ctx,options:n,chart:e});Je.configure(e,i,n),Je.addBox(e,i)},stop(e){Je.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;Je.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,r=n.chart;r.isDatasetVisible(i)?(r.hide(i),t.hidden=!0):(r.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(n?0:void 0),u=en(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:s,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(u.width+u.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:r||l.textAlign,borderRadius:o&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class Iv extends ns{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const r=Xt(i.text)?i.text.length:1;this._padding=en(i.padding);const s=r*Ce(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=s:this.width=s}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:i,bottom:r,right:s,options:o}=this,a=o.align;let c=0,l,u,h;return this.isHorizontal()?(u=Ve(a,i,s),h=n+t,l=s-i):(o.position==="left"?(u=i+t,h=Ve(a,r,n),c=Dt*-.5):(u=s-t,h=Ve(a,n,r),c=Dt*.5),l=r-n),{titleX:u,titleY:h,maxWidth:l,rotation:c}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const i=Ce(n.font),s=i.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:c,rotation:l}=this._drawArgs(s);Vo(t,n.text,0,0,i,{color:n.color,maxWidth:c,rotation:l,textAlign:wv(n.align),textBaseline:"middle",translation:[o,a]})}}function Kz(e,t){const n=new Iv({ctx:e.ctx,options:t,chart:e});Je.configure(e,n,t),Je.addBox(e,n),e.titleBlock=n}var Gz={id:"title",_element:Iv,start(e,t,n){Kz(e,n)},stop(e){const t=e.titleBlock;Je.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const i=e.titleBlock;Je.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ah=new WeakMap;var Xz={id:"subtitle",start(e,t,n){const i=new Iv({ctx:e.ctx,options:n,chart:e});Je.configure(e,i,n),Je.addBox(e,i),Ah.set(e,i)},stop(e){Je.removeBox(e,Ah.get(e)),Ah.delete(e)},beforeUpdate(e,t,n){const i=Ah.get(e);Je.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const wl={average(e){if(!e.length)return!1;let t,n,i=new Set,r=0,s=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const c=a.tooltipPosition();i.add(c.x),r+=c.y,++s}}return s===0||i.size===0?!1:{x:[...i].reduce((a,c)=>a+c)/i.size,y:r/s}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,r=Number.POSITIVE_INFINITY,s,o,a;for(s=0,o=e.length;s<o;++s){const c=e[s].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),u=Tg(t,l);u<r&&(r=u,a=c)}}if(a){const c=a.tooltipPosition();n=c.x,i=c.y}return{x:n,y:i}}};function ji(e,t){return t&&(Xt(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function _r(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function Qz(e,t){const{element:n,datasetIndex:i,index:r}=t,s=e.getDatasetMeta(i).controller,{label:o,value:a}=s.getLabelAndValue(r);return{chart:e,label:o,parsed:s.getParsed(r),raw:e.data.datasets[i].data[r],formattedValue:a,dataset:s.getDataset(),dataIndex:r,datasetIndex:i,element:n}}function vw(e,t){const n=e.chart.ctx,{body:i,footer:r,title:s}=e,{boxWidth:o,boxHeight:a}=t,c=Ce(t.bodyFont),l=Ce(t.titleFont),u=Ce(t.footerFont),h=s.length,d=r.length,f=i.length,p=en(t.padding);let m=p.height,g=0,b=i.reduce((S,k)=>S+k.before.length+k.lines.length+k.after.length,0);if(b+=e.beforeBody.length+e.afterBody.length,h&&(m+=h*l.lineHeight+(h-1)*t.titleSpacing+t.titleMarginBottom),b){const S=t.displayColors?Math.max(a,c.lineHeight):c.lineHeight;m+=f*S+(b-f)*c.lineHeight+(b-1)*t.bodySpacing}d&&(m+=t.footerMarginTop+d*u.lineHeight+(d-1)*t.footerSpacing);let _=0;const C=function(S){g=Math.max(g,n.measureText(S).width+_)};return n.save(),n.font=l.string,Ot(e.title,C),n.font=c.string,Ot(e.beforeBody.concat(e.afterBody),C),_=t.displayColors?o+2+t.boxPadding:0,Ot(i,S=>{Ot(S.before,C),Ot(S.lines,C),Ot(S.after,C)}),_=0,n.font=u.string,Ot(e.footer,C),n.restore(),g+=p.width,{width:g,height:m}}function Zz(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function Jz(e,t,n,i){const{x:r,width:s}=i,o=n.caretSize+n.caretPadding;if(e==="left"&&r+s+o>t.width||e==="right"&&r-s-o<0)return!0}function t8(e,t,n,i){const{x:r,width:s}=n,{width:o,chartArea:{left:a,right:c}}=e;let l="center";return i==="center"?l=r<=(a+c)/2?"left":"right":r<=s/2?l="left":r>=o-s/2&&(l="right"),Jz(l,e,t,n)&&(l="center"),l}function yw(e,t,n){const i=n.yAlign||t.yAlign||Zz(e,n);return{xAlign:n.xAlign||t.xAlign||t8(e,t,n,i),yAlign:i}}function e8(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function n8(e,t,n){let{y:i,height:r}=e;return t==="top"?i+=n:t==="bottom"?i-=r+n:i-=r/2,i}function bw(e,t,n,i){const{caretSize:r,caretPadding:s,cornerRadius:o}=e,{xAlign:a,yAlign:c}=n,l=r+s,{topLeft:u,topRight:h,bottomLeft:d,bottomRight:f}=Mo(o);let p=e8(t,a);const m=n8(t,c,l);return c==="center"?a==="left"?p+=l:a==="right"&&(p-=l):a==="left"?p-=Math.max(u,d)+r:a==="right"&&(p+=Math.max(h,f)+r),{x:Pe(p,0,i.width-t.width),y:Pe(m,0,i.height-t.height)}}function Lh(e,t,n){const i=en(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function _w(e){return ji([],_r(e))}function i8(e,t,n){return Vs(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function ww(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const DS={beforeTitle:yr,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:yr,beforeBody:yr,beforeLabel:yr,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return vt(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:yr,afterBody:yr,beforeFooter:yr,footer:yr,afterFooter:yr};function Dn(e,t,n,i){const r=e[t].call(n,i);return typeof r>"u"?DS[t].call(n,i):r}class xw extends ns{static positioners=wl;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),r=i.enabled&&n.options.animation&&i.animations,s=new oS(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(s)),s}getContext(){return this.$context||(this.$context=i8(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,r=Dn(i,"beforeTitle",this,t),s=Dn(i,"title",this,t),o=Dn(i,"afterTitle",this,t);let a=[];return a=ji(a,_r(r)),a=ji(a,_r(s)),a=ji(a,_r(o)),a}getBeforeBody(t,n){return _w(Dn(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,r=[];return Ot(t,s=>{const o={before:[],lines:[],after:[]},a=ww(i,s);ji(o.before,_r(Dn(a,"beforeLabel",this,s))),ji(o.lines,Dn(a,"label",this,s)),ji(o.after,_r(Dn(a,"afterLabel",this,s))),r.push(o)}),r}getAfterBody(t,n){return _w(Dn(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,r=Dn(i,"beforeFooter",this,t),s=Dn(i,"footer",this,t),o=Dn(i,"afterFooter",this,t);let a=[];return a=ji(a,_r(r)),a=ji(a,_r(s)),a=ji(a,_r(o)),a}_createItems(t){const n=this._active,i=this.chart.data,r=[],s=[],o=[];let a=[],c,l;for(c=0,l=n.length;c<l;++c)a.push(Qz(this.chart,n[c]));return t.filter&&(a=a.filter((u,h,d)=>t.filter(u,h,d,i))),t.itemSort&&(a=a.sort((u,h)=>t.itemSort(u,h,i))),Ot(a,u=>{const h=ww(t.callbacks,u);r.push(Dn(h,"labelColor",this,u)),s.push(Dn(h,"labelPointStyle",this,u)),o.push(Dn(h,"labelTextColor",this,u))}),this.labelColors=r,this.labelPointStyles=s,this.labelTextColors=o,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),r=this._active;let s,o=[];if(!r.length)this.opacity!==0&&(s={opacity:0});else{const a=wl[i.position].call(this,r,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const c=this._size=vw(this,i),l=Object.assign({},a,c),u=yw(this.chart,i,l),h=bw(i,l,u,this.chart);this.xAlign=u.xAlign,this.yAlign=u.yAlign,s={opacity:1,x:h.x,y:h.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,s&&this._resolveAnimations().update(this,s),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,r){const s=this.getCaretPosition(t,i,r);n.lineTo(s.x1,s.y1),n.lineTo(s.x2,s.y2),n.lineTo(s.x3,s.y3)}getCaretPosition(t,n,i){const{xAlign:r,yAlign:s}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:c,topRight:l,bottomLeft:u,bottomRight:h}=Mo(a),{x:d,y:f}=t,{width:p,height:m}=n;let g,b,_,C,S,k;return s==="center"?(S=f+m/2,r==="left"?(g=d,b=g-o,C=S+o,k=S-o):(g=d+p,b=g+o,C=S-o,k=S+o),_=g):(r==="left"?b=d+Math.max(c,u)+o:r==="right"?b=d+p-Math.max(l,h)-o:b=this.caretX,s==="top"?(C=f,S=C-o,g=b-o,_=b+o):(C=f+m,S=C+o,g=b+o,_=b-o),k=C),{x1:g,x2:b,x3:_,y1:C,y2:S,y3:k}}drawTitle(t,n,i){const r=this.title,s=r.length;let o,a,c;if(s){const l=Ha(i.rtl,this.x,this.width);for(t.x=Lh(this,i.titleAlign,i),n.textAlign=l.textAlign(i.titleAlign),n.textBaseline="middle",o=Ce(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=o.string,c=0;c<s;++c)n.fillText(r[c],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,c+1===s&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,r,s){const o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=s,u=Ce(s.bodyFont),h=Lh(this,"left",s),d=r.x(h),f=c<u.lineHeight?(u.lineHeight-c)/2:0,p=n.y+f;if(s.usePointStyle){const m={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},g=r.leftForLtr(d,l)+l/2,b=p+c/2;t.strokeStyle=s.multiKeyBackground,t.fillStyle=s.multiKeyBackground,Og(t,m,g,b),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,Og(t,m,g,b)}else{t.lineWidth=_t(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const m=r.leftForLtr(d,l),g=r.leftForLtr(r.xPlus(d,1),l-2),b=Mo(o.borderRadius);Object.values(b).some(_=>_!==0)?(t.beginPath(),t.fillStyle=s.multiKeyBackground,Eu(t,{x:m,y:p,w:l,h:c,radius:b}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),Eu(t,{x:g,y:p+1,w:l-2,h:c-2,radius:b}),t.fill()):(t.fillStyle=s.multiKeyBackground,t.fillRect(m,p,l,c),t.strokeRect(m,p,l,c),t.fillStyle=o.backgroundColor,t.fillRect(g,p+1,l-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:r}=this,{bodySpacing:s,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:u}=i,h=Ce(i.bodyFont);let d=h.lineHeight,f=0;const p=Ha(i.rtl,this.x,this.width),m=function(w){n.fillText(w,p.x(t.x+f),t.y+d/2),t.y+=d+s},g=p.textAlign(o);let b,_,C,S,k,$,D;for(n.textAlign=o,n.textBaseline="middle",n.font=h.string,t.x=Lh(this,g,i),n.fillStyle=i.bodyColor,Ot(this.beforeBody,m),f=a&&g!=="right"?o==="center"?l/2+u:l+2+u:0,S=0,$=r.length;S<$;++S){for(b=r[S],_=this.labelTextColors[S],n.fillStyle=_,Ot(b.before,m),C=b.lines,a&&C.length&&(this._drawColorBox(n,t,S,p,i),d=Math.max(h.lineHeight,c)),k=0,D=C.length;k<D;++k)m(C[k]),d=h.lineHeight;Ot(b.after,m)}f=0,d=h.lineHeight,Ot(this.afterBody,m),t.y-=s}drawFooter(t,n,i){const r=this.footer,s=r.length;let o,a;if(s){const c=Ha(i.rtl,this.x,this.width);for(t.x=Lh(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=c.textAlign(i.footerAlign),n.textBaseline="middle",o=Ce(i.footerFont),n.fillStyle=i.footerColor,n.font=o.string,a=0;a<s;++a)n.fillText(r[a],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,n,i,r){const{xAlign:s,yAlign:o}=this,{x:a,y:c}=t,{width:l,height:u}=i,{topLeft:h,topRight:d,bottomLeft:f,bottomRight:p}=Mo(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(a+h,c),o==="top"&&this.drawCaret(t,n,i,r),n.lineTo(a+l-d,c),n.quadraticCurveTo(a+l,c,a+l,c+d),o==="center"&&s==="right"&&this.drawCaret(t,n,i,r),n.lineTo(a+l,c+u-p),n.quadraticCurveTo(a+l,c+u,a+l-p,c+u),o==="bottom"&&this.drawCaret(t,n,i,r),n.lineTo(a+f,c+u),n.quadraticCurveTo(a,c+u,a,c+u-f),o==="center"&&s==="left"&&this.drawCaret(t,n,i,r),n.lineTo(a,c+h),n.quadraticCurveTo(a,c,a+h,c),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,r=i&&i.x,s=i&&i.y;if(r||s){const o=wl[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=vw(this,t),c=Object.assign({},o,this._size),l=yw(n,t,c),u=bw(t,c,l,n);(r._to!==u.x||s._to!==u.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,u))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},s={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=en(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(s,t,r,n),tS(t,n.textDirection),s.y+=o.top,this.drawTitle(s,t,n),this.drawBody(s,t,n),this.drawFooter(s,t,n),eS(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,r=t.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),s=!uf(i,r),o=this._positionChanged(r,n);(s||o)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,s=this._active||[],o=this._getActiveElements(t,s,n,i),a=this._positionChanged(o,t),c=n||!uf(o,s)||a;return c&&(this._active=o,(r.enabled||r.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),c}_getActiveElements(t,n,i,r){const s=this.options;if(t.type==="mouseout")return[];if(!r)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,s.mode,s,i);return s.reverse&&o.reverse(),o}_positionChanged(t,n){const{caretX:i,caretY:r,options:s}=this,o=wl[s.position].call(this,t,n);return o!==!1&&(i!==o.x||r!==o.y)}}var r8={id:"tooltip",_element:xw,positioners:wl,afterInit(e,t,n){n&&(e.tooltip=new xw({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:DS},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},s8=Object.freeze({__proto__:null,Colors:vz,Decimation:wz,Filler:Bz,Legend:Vz,SubTitle:Xz,Title:Gz,Tooltip:r8});const o8=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function a8(e,t,n,i){const r=e.indexOf(t);if(r===-1)return o8(e,t,n,i);const s=e.lastIndexOf(t);return r!==s?n:r}const c8=(e,t)=>e===null?null:Pe(Math.round(e),0,t);function Cw(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class l8 extends oa{static id="category";static defaults={ticks:{callback:Cw}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:r,label:s}of n)i[r]===s&&i.splice(r,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(vt(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:a8(i,t,lt(n,t),this._addedLabels),c8(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:r}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(r=this.getLabels().length-1)),this.min=i,this.max=r}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,r=[];let s=this.getLabels();s=t===0&&n===s.length-1?s:s.slice(t,n+1),this._valueRange=Math.max(s.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let o=t;o<=n;o++)r.push({value:o});return r}getLabelForValue(t){return Cw.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function u8(e,t){const n=[],{bounds:r,step:s,min:o,max:a,precision:c,count:l,maxTicks:u,maxDigits:h,includeBounds:d}=e,f=s||1,p=u-1,{min:m,max:g}=t,b=!vt(o),_=!vt(a),C=!vt(l),S=(g-m)/(h+1);let k=v_((g-m)/p/f)*f,$,D,w,x;if(k<1e-14&&!b&&!_)return[{value:m},{value:g}];x=Math.ceil(g/k)-Math.floor(m/k),x>p&&(k=v_(x*k/p/f)*f),vt(c)||($=Math.pow(10,c),k=Math.ceil(k*$)/$),r==="ticks"?(D=Math.floor(m/k)*k,w=Math.ceil(g/k)*k):(D=m,w=g),b&&_&&s&&q3((a-o)/s,k/1e3)?(x=Math.round(Math.min((a-o)/k,u)),k=(a-o)/x,D=o,w=a):C?(D=b?o:D,w=_?a:w,x=l-1,k=(w-D)/x):(x=(w-D)/k,Kl(x,Math.round(x),k/1e3)?x=Math.round(x):x=Math.ceil(x));const M=Math.max(y_(k),y_(D));$=Math.pow(10,vt(c)?M:c),D=Math.round(D*$)/$,w=Math.round(w*$)/$;let I=0;for(b&&(d&&D!==o?(n.push({value:o}),D<o&&I++,Kl(Math.round((D+I*k)*$)/$,o,kw(o,S,e))&&I++):D<o&&I++);I<x;++I){const T=Math.round((D+I*k)*$)/$;if(_&&T>a)break;n.push({value:T})}return _&&d&&w!==a?n.length&&Kl(n[n.length-1].value,a,kw(a,S,e))?n[n.length-1].value=a:n.push({value:a}):(!_||w===a)&&n.push({value:w}),n}function kw(e,t,{horizontal:n,minRotation:i}){const r=Ti(i),s=(n?Math.sin(r):Math.cos(r))||.001,o=.75*t*(""+e).length;return Math.min(t/s,o)}class vf extends oa{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return vt(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:r,max:s}=this;const o=c=>r=n?r:c,a=c=>s=i?s:c;if(t){const c=tr(r),l=tr(s);c<0&&l<0?a(0):c>0&&l>0&&o(0)}if(r===s){let c=s===0?1:Math.abs(s*.05);a(s+c),t||o(r-c)}this.min=r,this.max=s}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,r;return i?(r=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const r={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},s=this._range||this,o=u8(r,s);return t.bounds==="ticks"&&Nk(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const r=(i-n)/Math.max(t.length-1,1)/2;n-=r,i+=r}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return hh(t,this.chart.options.locale,this.options.ticks.format)}}class h8 extends vf{static id="linear";static defaults={ticks:{callback:ip.formatters.numeric}};determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ue(t)?t:0,this.max=ue(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=Ti(this.options.ticks.minRotation),r=(t?Math.sin(i):Math.cos(i))||.001,s=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,s.lineHeight/r))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const $u=e=>Math.floor(ws(e)),so=(e,t)=>Math.pow(10,$u(e)+t);function Sw(e){return e/Math.pow(10,$u(e))===1}function Ew(e,t,n){const i=Math.pow(10,n),r=Math.floor(e/i);return Math.ceil(t/i)-r}function d8(e,t){const n=t-e;let i=$u(n);for(;Ew(e,t,i)>10;)i++;for(;Ew(e,t,i)<10;)i--;return Math.min(i,$u(e))}function f8(e,{min:t,max:n}){t=qn(e.min,t);const i=[],r=$u(t);let s=d8(t,n),o=s<0?Math.pow(10,Math.abs(s)):1;const a=Math.pow(10,s),c=r>s?Math.pow(10,r):0,l=Math.round((t-c)*o)/o,u=Math.floor((t-c)/a/10)*a*10;let h=Math.floor((l-u)/Math.pow(10,s)),d=qn(e.min,Math.round((c+u+h*Math.pow(10,s))*o)/o);for(;d<n;)i.push({value:d,major:Sw(d),significand:h}),h>=10?h=h<15?15:20:h++,h>=20&&(s++,h=2,o=s>=0?1:o),d=Math.round((c+u+h*Math.pow(10,s))*o)/o;const f=qn(e.max,d);return i.push({value:f,major:Sw(f),significand:h}),i}class p8 extends oa{static id="logarithmic";static defaults={ticks:{callback:ip.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const i=vf.prototype.parse.apply(this,[t,n]);if(i===0){this._zero=!0;return}return ue(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ue(t)?Math.max(0,t):null,this.max=ue(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!ue(this._userMin)&&(this.min=t===so(this.min,0)?so(this.min,-1):so(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let i=this.min,r=this.max;const s=a=>i=t?i:a,o=a=>r=n?r:a;i===r&&(i<=0?(s(1),o(10)):(s(so(i,-1)),o(so(r,1)))),i<=0&&s(so(r,-1)),r<=0&&o(so(i,1)),this.min=i,this.max=r}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},i=f8(n,this);return t.bounds==="ticks"&&Nk(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":hh(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=ws(t),this._valueRange=ws(this.max)-ws(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(ws(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}function Fg(e){const t=e.ticks;if(t.display&&e.display){const n=en(t.backdropPadding);return lt(t.font&&t.font.size,Zt.font.size)+n.height}return 0}function m8(e,t,n){return n=Xt(n)?n:[n],{w:lN(e,t.string,n),h:n.length*t.lineHeight}}function Mw(e,t,n,i,r){return e===i||e===r?{start:t-n/2,end:t+n/2}:e<i||e>r?{start:t-n,end:t}:{start:t,end:t+n}}function g8(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),i=[],r=[],s=e._pointLabels.length,o=e.options.pointLabels,a=o.centerPointLabels?Dt/s:0;for(let c=0;c<s;c++){const l=o.setContext(e.getPointLabelContext(c));r[c]=l.padding;const u=e.getPointPosition(c,e.drawingArea+r[c],a),h=Ce(l.font),d=m8(e.ctx,h,e._pointLabels[c]);i[c]=d;const f=Qe(e.getIndexAngle(c)+a),p=Math.round(bv(f)),m=Mw(p,u.x,d.w,0,180),g=Mw(p,u.y,d.h,90,270);v8(n,t,f,m,g)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=_8(e,i,r)}function v8(e,t,n,i,r){const s=Math.abs(Math.sin(n)),o=Math.abs(Math.cos(n));let a=0,c=0;i.start<t.l?(a=(t.l-i.start)/s,e.l=Math.min(e.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/s,e.r=Math.max(e.r,t.r+a)),r.start<t.t?(c=(t.t-r.start)/o,e.t=Math.min(e.t,t.t-c)):r.end>t.b&&(c=(r.end-t.b)/o,e.b=Math.max(e.b,t.b+c))}function y8(e,t,n){const i=e.drawingArea,{extra:r,additionalAngle:s,padding:o,size:a}=n,c=e.getPointPosition(t,i+r+o,s),l=Math.round(bv(Qe(c.angle+fe))),u=C8(c.y,a.h,l),h=w8(l),d=x8(c.x,a.w,h);return{visible:!0,x:c.x,y:u,textAlign:h,left:d,top:u,right:d+a.w,bottom:u+a.h}}function b8(e,t){if(!t)return!0;const{left:n,top:i,right:r,bottom:s}=e;return!(Ir({x:n,y:i},t)||Ir({x:n,y:s},t)||Ir({x:r,y:i},t)||Ir({x:r,y:s},t))}function _8(e,t,n){const i=[],r=e._pointLabels.length,s=e.options,{centerPointLabels:o,display:a}=s.pointLabels,c={extra:Fg(s)/2,additionalAngle:o?Dt/r:0};let l;for(let u=0;u<r;u++){c.padding=n[u],c.size=t[u];const h=y8(e,u,c);i.push(h),a==="auto"&&(h.visible=b8(h,l),h.visible&&(l=h))}return i}function w8(e){return e===0||e===180?"center":e<180?"left":"right"}function x8(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function C8(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function k8(e,t,n){const{left:i,top:r,right:s,bottom:o}=n,{backdropColor:a}=t;if(!vt(a)){const c=Mo(t.borderRadius),l=en(t.backdropPadding);e.fillStyle=a;const u=i-l.left,h=r-l.top,d=s-i+l.width,f=o-r+l.height;Object.values(c).some(p=>p!==0)?(e.beginPath(),Eu(e,{x:u,y:h,w:d,h:f,radius:c}),e.fill()):e.fillRect(u,h,d,f)}}function S8(e,t){const{ctx:n,options:{pointLabels:i}}=e;for(let r=t-1;r>=0;r--){const s=e._pointLabelItems[r];if(!s.visible)continue;const o=i.setContext(e.getPointLabelContext(r));k8(n,o,s);const a=Ce(o.font),{x:c,y:l,textAlign:u}=s;Vo(n,e._pointLabels[r],c,l+a.lineHeight/2,a,{color:o.color,textAlign:u,textBaseline:"middle"})}}function $S(e,t,n,i){const{ctx:r}=e;if(n)r.arc(e.xCenter,e.yCenter,t,0,Yt);else{let s=e.getPointPosition(0,t);r.moveTo(s.x,s.y);for(let o=1;o<i;o++)s=e.getPointPosition(o,t),r.lineTo(s.x,s.y)}}function E8(e,t,n,i,r){const s=e.ctx,o=t.circular,{color:a,lineWidth:c}=t;!o&&!i||!a||!c||n<0||(s.save(),s.strokeStyle=a,s.lineWidth=c,s.setLineDash(r.dash||[]),s.lineDashOffset=r.dashOffset,s.beginPath(),$S(e,n,o,i),s.closePath(),s.stroke(),s.restore())}function M8(e,t,n){return Vs(e,{label:n,index:t,type:"pointLabel"})}class D8 extends vf{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:ip.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=en(Fg(this.options)/2),n=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=ue(t)&&!isNaN(t)?t:0,this.max=ue(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Fg(this.options))}generateTickLabels(t){vf.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,i)=>{const r=Wt(this.options.pointLabels.callback,[n,i],this);return r||r===0?r:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?g8(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,i,r){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((i-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,i,r))}getIndexAngle(t){const n=Yt/(this._pointLabels.length||1),i=this.options.startAngle||0;return Qe(t*n+Ti(i))}getDistanceFromCenterForValue(t){if(vt(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(vt(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const i=n[t];return M8(this.getContext(),t,i)}}getPointPosition(t,n,i=0){const r=this.getIndexAngle(t)-fe+i;return{x:Math.cos(r)*n+this.xCenter,y:Math.sin(r)*n+this.yCenter,angle:r}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:i,right:r,bottom:s}=this._pointLabelItems[t];return{left:n,top:i,right:r,bottom:s}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),$S(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:i,grid:r,border:s}=n,o=this._pointLabels.length;let a,c,l;if(n.pointLabels.display&&S8(this,o),r.display&&this.ticks.forEach((u,h)=>{if(h!==0||h===0&&this.min<0){c=this.getDistanceFromCenterForValue(u.value);const d=this.getContext(h),f=r.setContext(d),p=s.setContext(d);E8(this,f,c,o,p)}}),i.display){for(t.save(),a=o-1;a>=0;a--){const u=i.setContext(this.getPointLabelContext(a)),{color:h,lineWidth:d}=u;!d||!h||(t.lineWidth=d,t.strokeStyle=h,t.setLineDash(u.borderDash),t.lineDashOffset=u.borderDashOffset,c=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),l=this.getPointPosition(a,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;const r=this.getIndexAngle(0);let s,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(r),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,c)=>{if(c===0&&this.min>=0&&!n.reverse)return;const l=i.setContext(this.getContext(c)),u=Ce(l.font);if(s=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){t.font=u.string,o=t.measureText(a.label).width,t.fillStyle=l.backdropColor;const h=en(l.backdropPadding);t.fillRect(-o/2-h.left,-s-u.size/2-h.top,o+h.width,u.size+h.height)}Vo(t,a.label,0,-s,u,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),t.restore()}drawTitle(){}}const up={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Ln=Object.keys(up);function Dw(e,t){return e-t}function $w(e,t){if(vt(t))return null;const n=e._adapter,{parser:i,round:r,isoWeekday:s}=e._parseOpts;let o=t;return typeof i=="function"&&(o=i(o)),ue(o)||(o=typeof i=="string"?n.parse(o,i):n.parse(o)),o===null?null:(r&&(o=r==="week"&&(dc(s)||s===!0)?n.startOf(o,"isoWeek",s):n.startOf(o,r)),+o)}function Tw(e,t,n,i){const r=Ln.length;for(let s=Ln.indexOf(e);s<r-1;++s){const o=up[Ln[s]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((n-t)/(a*o.size))<=i)return Ln[s]}return Ln[r-1]}function $8(e,t,n,i,r){for(let s=Ln.length-1;s>=Ln.indexOf(n);s--){const o=Ln[s];if(up[o].common&&e._adapter.diff(r,i,o)>=t-1)return o}return Ln[n?Ln.indexOf(n):0]}function T8(e){for(let t=Ln.indexOf(e)+1,n=Ln.length;t<n;++t)if(up[Ln[t]].common)return Ln[t]}function Iw(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:r}=_v(n,t),s=n[i]>=t?n[i]:n[r];e[s]=!0}}function I8(e,t,n,i){const r=e._adapter,s=+r.startOf(t[0].value,i),o=t[t.length-1].value;let a,c;for(a=s;a<=o;a=+r.add(a,1,i))c=n[a],c>=0&&(t[c].major=!0);return t}function Ow(e,t,n){const i=[],r={},s=t.length;let o,a;for(o=0;o<s;++o)a=t[o],r[a]=o,i.push({value:a,major:!1});return s===0||!n?i:I8(e,i,r,n)}class zg extends oa{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),r=this._adapter=new O6._date(t.adapters.date);r.init(n),Vl(i.displayFormats,r.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:$w(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:r,max:s,minDefined:o,maxDefined:a}=this.getUserBounds();function c(l){!o&&!isNaN(l.min)&&(r=Math.min(r,l.min)),!a&&!isNaN(l.max)&&(s=Math.max(s,l.max))}(!o||!a)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),r=ue(r)&&!isNaN(r)?r:+n.startOf(Date.now(),i),s=ue(s)&&!isNaN(s)?s:+n.endOf(Date.now(),i)+1,this.min=Math.min(r,s-1),this.max=Math.max(r+1,s)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,r=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const s=this.min,o=this.max,a=X3(r,s,o);return this._unit=n.unit||(i.autoSkip?Tw(n.minUnit,this.min,this.max,this._getLabelCapacity(s)):$8(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:T8(this._unit),this.initOffsets(r),t.reverse&&a.reverse(),Ow(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,r,s;this.options.offset&&t.length&&(r=this.getDecimalForValue(t[0]),t.length===1?n=1-r:n=(this.getDecimalForValue(t[1])-r)/2,s=this.getDecimalForValue(t[t.length-1]),t.length===1?i=s:i=(s-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;n=Pe(n,0,o),i=Pe(i,0,o),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,r=this.options,s=r.time,o=s.unit||Tw(s.minUnit,n,i,this._getLabelCapacity(n)),a=lt(r.ticks.stepSize,1),c=o==="week"?s.isoWeekday:!1,l=dc(c)||c===!0,u={};let h=n,d,f;if(l&&(h=+t.startOf(h,"isoWeek",c)),h=+t.startOf(h,l?"day":o),t.diff(i,n,o)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+o);const p=r.ticks.source==="data"&&this.getDataTimestamps();for(d=h,f=0;d<i;d=+t.add(d,a,o),f++)Iw(u,d,p);return(d===i||r.bounds==="ticks"||f===1)&&Iw(u,d,p),Object.keys(u).sort(Dw).map(m=>+m)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const r=this.options.time.displayFormats,s=this._unit,o=n||r[s];return this._adapter.format(t,o)}_tickFormatFunction(t,n,i,r){const s=this.options,o=s.ticks.callback;if(o)return Wt(o,[t,n,i],this);const a=s.time.displayFormats,c=this._unit,l=this._majorUnit,u=c&&a[c],h=l&&a[l],d=i[n],f=l&&h&&d&&d.major;return this._adapter.format(t,r||(f?h:u))}generateTickLabels(t){let n,i,r;for(n=0,i=t.length;n<i;++n)r=t[n],r.label=this._tickFormatFunction(r.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,r=Ti(this.isHorizontal()?n.maxRotation:n.minRotation),s=Math.cos(r),o=Math.sin(r),a=this._resolveTickFontOptions(0).size;return{w:i*s+a*o,h:i*o+a*s}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,r=i[n.unit]||i.millisecond,s=this._tickFormatFunction(t,0,Ow(this,[t],this._majorUnit),r),o=this._getLabelSize(s),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,i=r.length;n<i;++n)t=t.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const r=this.getLabels();for(n=0,i=r.length;n<i;++n)t.push($w(this,r[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return jk(t.sort(Dw))}}function Nh(e,t,n){let i=0,r=e.length-1,s,o,a,c;n?(t>=e[i].pos&&t<=e[r].pos&&({lo:i,hi:r}=Tr(e,"pos",t)),{pos:s,time:a}=e[i],{pos:o,time:c}=e[r]):(t>=e[i].time&&t<=e[r].time&&({lo:i,hi:r}=Tr(e,"time",t)),{time:s,pos:a}=e[i],{time:o,pos:c}=e[r]);const l=o-s;return l?a+(c-a)*(t-s)/l:a}class O8 extends zg{static id="timeseries";static defaults=zg.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Nh(n,this.min),this._tableRange=Nh(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,r=[],s=[];let o,a,c,l,u;for(o=0,a=t.length;o<a;++o)l=t[o],l>=n&&l<=i&&r.push(l);if(r.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(o=0,a=r.length;o<a;++o)u=r[o+1],c=r[o-1],l=r[o],Math.round((u+c)/2)!==l&&s.push({time:l,pos:o/(a-1)});return s}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((r,s)=>r-s)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Nh(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Nh(this._table,i*this._tableRange+this._minPos,!0)}}var P8=Object.freeze({__proto__:null,CategoryScale:l8,LinearScale:h8,LogarithmicScale:p8,RadialLinearScale:D8,TimeScale:zg,TimeSeriesScale:O8});const R8=[I6,uz,s8,P8];var A8=Object.defineProperty,L8=Object.getOwnPropertyDescriptor,TS=e=>{throw TypeError(e)},dh=(e,t,n,i)=>{for(var r=i>1?void 0:i?L8(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&A8(t,n,r),r},N8=(e,t,n)=>t.has(e)||TS("Cannot "+n),F8=(e,t,n)=>t.has(e)?TS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),id=(e,t,n)=>(N8(e,t,"access private method"),n),Ra,jg,Ov;Du.register(...R8);Du.defaults.animation=!1;let Ko=class extends gt{constructor(){super(...arguments),F8(this,Ra),this.chartType="bar",this.data={labels:[],datasets:[]},this.options={},this.ariaChartLabel="Chart"}render(){return E`
      <canvas aria-label=${this.ariaChartLabel} role="img"></canvas>
    `}updated(e){if(!this._chart){id(this,Ra,jg).call(this);return}e.has("chartType")?(this._chart.destroy(),id(this,Ra,jg).call(this)):(e.has("data")||e.has("options"))&&(this._chart.data=this.data,e.has("options")&&(this._chart.options=id(this,Ra,Ov).call(this)),this._chart.update())}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>{if(!this._chart)return;const e=this.clientWidth,t=this.clientHeight;if(e===0||t===0)return;const n=window.devicePixelRatio,i=this._chart.canvas;i.style.width=`${e}px`,i.style.height=`${t}px`,i.width=Math.round(e*n),i.height=Math.round(t*n),this._chart.width=e,this._chart.height=t,this._chart.ctx.setTransform(n,0,0,n,0,0),this._chart.update()}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._chart?.destroy(),this._chart=void 0}};Ra=new WeakSet;jg=function(){const t=this.shadowRoot.querySelector("canvas").getContext("2d");if(!t)return;Du.defaults.color=getComputedStyle(document.documentElement).getPropertyValue("--budgee-text").trim();const n=this.chartType==="pie"||this.chartType==="doughnut";this._chart=new Du(t,{type:this.chartType,data:this.data,options:id(this,Ra,Ov).call(this),plugins:n?[{id:"squareChartArea",afterLayout(i){const r=i.chartArea,s=r.right-r.left,o=r.bottom-r.top;if(s===o)return;const a=i.legend,c=a?.position;if(s>o){const u=(s-o)/2;r.left+=u,r.right-=u,a&&c==="right"?(a.left-=u,a.right-=u):a&&c==="left"&&(a.left+=u,a.right+=u)}else{const u=(o-s)/2;r.top+=u,r.bottom-=u,a&&c==="bottom"?(a.top-=u,a.bottom-=u):a&&c==="top"&&(a.top+=u,a.bottom+=u)}}}]:[]})};Ov=function(){return hc({responsive:!1,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{sort:(e,t)=>(e.text??"").localeCompare(t.text??"")}}}},this.options)};Ko.styles=dt`
    :host {
      display: block;
      position: relative;
      flex: 1;
      min-height: 0;
    }
  `;dh([H({type:String})],Ko.prototype,"chartType",2);dh([H({type:Object})],Ko.prototype,"data",2);dh([H({type:Object})],Ko.prototype,"options",2);dh([H({type:String,attribute:"aria-chart-label"})],Ko.prototype,"ariaChartLabel",2);Ko=dh([Et("chart-wrapper")],Ko);var z8=Object.defineProperty,j8=Object.getOwnPropertyDescriptor,IS=e=>{throw TypeError(e)},OS=(e,t,n,i)=>{for(var r=i>1?void 0:i?j8(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&z8(t,n,r),r},B8=(e,t,n)=>t.has(e)||IS("Cannot "+n),W8=(e,t,n)=>t.has(e)?IS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Pw=(e,t,n)=>(B8(e,t,"access private method"),n),rd,PS,RS;const H8=[{value:Ba.Duration.from({months:1}),label:"1M"},{value:Ba.Duration.from({months:6}),label:"6M"},{value:Ba.Duration.from({years:1}),label:"1Y"},{value:null,label:"All"}];class U8 extends Event{constructor(t){super("time-range-change",{bubbles:!0}),this.timeRange=t}}let yf=class extends gt{constructor(){super(...arguments),W8(this,rd),this.value=null}render(){return H8.map(({value:e,label:t})=>E`<button
          class=${Pw(this,rd,PS).call(this,e)?"active":""}
          @click=${()=>Pw(this,rd,RS).call(this,e)}
        >${t}</button>`)}};rd=new WeakSet;PS=function(e){if(this.value===null||e===null)return this.value===e;const t=Ba.Now.plainDateISO();return Ba.Duration.compare(this.value,e,{relativeTo:t})===0};RS=function(e){this.value=e,this.dispatchEvent(new U8(e))};yf.styles=dt`
    :host {
      display: inline-flex;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: normal;
    }
    button {
      background: none;
      border: none;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      color: var(--budgee-text-muted);
    }
    button:hover {
      color: var(--budgee-text);
    }
    button.active {
      color: var(--budgee-text);
      font-weight: 600;
      background: var(--budgee-bg);
    }
  `;OS([H({attribute:!1})],yf.prototype,"value",2);yf=OS([Et("time-range-picker")],yf);const hp=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-wrench"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
</svg>
`;function Bg(e,t){const n=new Map;for(const i of e)for(const r of t(i))n.set(r,(n.get(r)??0)+i.amount);return n}function Rw(e,t){const n=new Map;for(const i of t){const r=e.get(i.id);r!==void 0&&n.set(i.name,r)}return n}function Y8(e,t){switch(t){case"day":return e.slice(0,10);case"month":return e.slice(0,7);case"year":return e.slice(0,4)}}function Aw(e,t){return Bg(e,n=>[Y8(n.date,t)])}function q8(e,t){return e.filter(n=>{if(t.tagId!==void 0&&!n.tagIds.includes(t.tagId)||t.excludedTagId!==void 0&&n.tagIds.includes(t.excludedTagId)||t.merchantId!==void 0&&n.merchantId!==t.merchantId||t.excludedMerchantId!==void 0&&n.merchantId===t.excludedMerchantId||t.startDate&&n.date<t.startDate||t.endDate&&n.date>t.endDate)return!1;if(t.amountFilter){const{operator:i,value:r}=t.amountFilter;if(i==="lt"&&!(n.amount<r)||i==="gt"&&!(n.amount>r)||i==="lte"&&!(n.amount<=r)||i==="gte"&&!(n.amount>=r))return!1}if(t.descriptionFilter){const i=n.description.toLowerCase().includes(t.descriptionFilter.toLowerCase());if(t.descriptionFilterMode==="exclude"&&i||t.descriptionFilterMode==="include"&&!i)return!1}return!0})}function V8(e,t){return t<2?e.map(n=>n):e.map((n,i)=>{const r=Math.max(0,i-t+1),s=e.slice(r,i+1).sort((a,c)=>a-c),o=Math.floor(s.length/2);return s.length%2===0?(s[o-1]+s[o])/2:s[o]})}function K8(e){return Math.max(6,Math.min(12,Math.round(e*.1)))}function Ke(e,t){const n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();if(t==null)return n;const i=n.match(/^lch\(([^)]+)\)$/);return i?`lch(${i[1]} / ${t})`:`color-mix(in srgb, ${n} ${Math.round(t*100)}%, transparent)`}function G8(e){const{allEntries:t,displayEntries:n,label:i,formatLabel:r}=e,s=t.map(([,m])=>m),o=K8(s.length),a=V8(s,o),c=n[0]?.[0],l=c?t.findIndex(([m])=>m===c):0,u=n.map(([,m])=>m),h=u.map(Math.abs),d=a.slice(l,l+n.length).map(Math.abs),f=r?n.map(([m])=>r(m)):n.map(([m])=>m),p=[{label:i,data:h,backgroundColor:u.map(m=>m<0?Ke("--budgee-negative",.5):Ke("--budgee-positive",.5)),hoverBackgroundColor:u.map(m=>m<0?Ke("--budgee-negative",.75):Ke("--budgee-positive",.75)),borderColor:u.map(m=>m<0?Ke("--budgee-negative"):Ke("--budgee-positive")),borderWidth:1,maxBarThickness:50}];return h.length>=2&&p.push({type:"line",label:`${i} (${o}-pt median)`,data:d,borderColor:Ke("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}),{labels:f,datasets:p}}const AS=dt`
  .resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    transition: background 0.15s;
  }
  .resize-handle:hover,
  :host([data-resizing]) .resize-handle {
    background: var(--budgee-primary);
  }
  .resize-handle-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    cursor: row-resize;
    background: transparent;
    transition: background 0.15s;
  }
  .resize-handle-bottom:hover,
  :host([data-resizing-vertical]) .resize-handle-bottom {
    background: var(--budgee-primary);
  }
  .resize-handle-corner {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    cursor: nwse-resize;
    background: transparent;
    z-index: 1;
  }
  .resize-handle-corner:hover,
  :host([data-resizing-corner]) .resize-handle-corner {
    background: var(--budgee-primary);
  }
`;function LS(e){return E`
    <div class="resize-handle" @pointerdown=${t=>e.startResize(t,{horizontal:!0})}></div>
    <div class="resize-handle-bottom" @pointerdown=${t=>e.startResize(t,{vertical:!0})}></div>
    <div class="resize-handle-corner" @pointerdown=${t=>e.startResize(t,{horizontal:!0,vertical:!0})}></div>
  `}function NS(e){class t extends e{constructor(){super(...arguments),this.maxColumns=12,this.maxRows=4}get _resizableConfig(){return{}}_onResized(i){}_onLiveColSpan(i){}startResize(i,{horizontal:r,vertical:s}){i.preventDefault(),i.stopPropagation();const o=i.currentTarget;o.setPointerCapture(i.pointerId);const a=this.closest(".chart-grid")??this.closest(".table-grid")??this.parentElement;if(!a)return;const c=a.getBoundingClientRect(),l=getComputedStyle(a),u=r?l.gridTemplateColumns.split(" ").length:0,h=s?parseFloat(l.gridTemplateRows.split(" ")[0])||200:0,d=s&&parseFloat(l.rowGap)||0,f=this._resizableConfig;let p=f.colSpan??1,m=f.rowSpan??1;const g=r&&s?"data-resizing-corner":r?"data-resizing":"data-resizing-vertical";this.setAttribute(g,"");const b=C=>{if(r){const k=(C.clientX-c.left)/c.width,$=Math.round(k*u),D=this.getBoundingClientRect().left-c.left,w=Math.round(D/c.width*u);p=Math.max(1,Math.min(u-w,$-w)),this.style.gridColumn=`span ${p}`,this._onLiveColSpan(p)}if(s){const S=this.getBoundingClientRect().top-c.top,$=C.clientY-c.top-S;m=Math.max(1,Math.round(($+d)/(h+d))),this.style.gridRow=`span ${m}`}},_=()=>{this.removeAttribute(g),this._onLiveColSpan(void 0),o.removeEventListener("pointermove",b),o.removeEventListener("pointerup",_),this._onResized({...r&&{colSpan:Math.max(1,Math.min(this.maxColumns,p))},...s&&{rowSpan:Math.max(1,Math.min(this.maxRows,m))}})};o.addEventListener("pointermove",b),o.addEventListener("pointerup",_)}}return t}var X8=Object.defineProperty,Q8=Object.getOwnPropertyDescriptor,FS=e=>{throw TypeError(e)},Oc=(e,t,n,i)=>{for(var r=i>1?void 0:i?Q8(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&X8(t,n,r),r},zS=(e,t,n)=>t.has(e)||FS("Cannot "+n),Lw=(e,t,n)=>(zS(e,t,"read from private field"),n?n.call(e):t.get(e)),Z8=(e,t,n)=>t.has(e)?FS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ks=(e,t,n)=>(zS(e,t,"access private method"),n),hi,jS,BS,Wg,WS,HS,Hg,US,YS;const Nw=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Fw(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,n,i]=e.split("-");return`${Nw[Number(n)-1]} ${Number(i)}, ${t}`}if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-");return`${Nw[Number(n)-1]} ${t}`}return e}function J8(e){const t={};for(const n of e)switch(n.field){case"tag":n.operator==="is"&&(t.tagId=n.value),n.operator==="isNot"&&(t.excludedTagId=n.value);break;case"merchant":n.operator==="is"&&(t.merchantId=n.value),n.operator==="isNot"&&(t.excludedMerchantId=n.value);break;case"amount":t.amountFilter={operator:n.operator,value:Number(n.value)};break;case"description":t.descriptionFilter=n.value,t.descriptionFilterMode=n.operator==="contains"?"include":"exclude";break}return t}let zs=class extends NS(gt){constructor(){super(...arguments),Z8(this,hi),this.transactions=[],this.tags=[],this.merchants=[]}get _resizableConfig(){return this.config}_onResized(e){this.dispatchEvent(new CustomEvent("chart-resized",{detail:{id:this.config.id,...e}}))}_onLiveColSpan(e){this._liveColSpan=e}render(){return E`
      ${LS(this)}
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${ks(this,hi,US)}>${ye(hp)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${ks(this,hi,YS)}>${ye(Tc)}</button>
        </div>
      </div>
      <chart-wrapper
        .chartType=${this.config.chartType}
        .data=${Lw(this,hi,jS)}
        .options=${Lw(this,hi,BS)}
      ></chart-wrapper>
    `}};hi=new WeakSet;jS=function(){const e=this.config.filters?J8(this.config.filters):{tagId:this.config.tagId,merchantId:this.config.merchantId,amountFilter:this.config.direction==="debit"?{operator:"lt",value:0}:this.config.direction==="credit"?{operator:"gt",value:0}:void 0,descriptionFilter:this.config.descriptionFilter,descriptionFilterMode:this.config.descriptionFilterMode},t=q8(this.transactions,e),{granularity:n}=this.config,i=n==="byTag"?Rw(Bg(t,f=>f.tagIds),ks(this,hi,Wg).call(this,this.tags,this.config.excludedTagIds)):n==="byMerchant"?Rw(Bg(t,f=>f.merchantId?[f.merchantId]:[]),ks(this,hi,Wg).call(this,this.merchants,this.config.excludedMerchantIds)):Aw(t,n),r=n==="byTag"||n==="byMerchant",s=this.config.chartType==="pie"||this.config.chartType==="doughnut";let o=[...i.entries()].sort(([f],[p])=>f.localeCompare(p));if(s&&(o=ks(this,hi,WS).call(this,o),o.sort(([,f],[,p])=>Math.abs(p)-Math.abs(f))),!r&&this.config.chartType==="bar"){const p=[...Aw(t,n).entries()].sort(([m],[g])=>m.localeCompare(g));return G8({allEntries:p,displayEntries:o,label:this.config.title,formatLabel:Fw})}const a=this.config.chartType==="bar",c=o.map(([,f])=>f),l=s||a?c.map(Math.abs):c,u=s?ks(this,hi,HS).call(this,o):a?c.map(f=>f<0?Ke("--budgee-negative",.5):Ke("--budgee-positive",.5)):Ke("--budgee-primary",.5),h=s?Ke("--budgee-surface"):a?c.map(f=>f<0?Ke("--budgee-negative"):Ke("--budgee-positive")):Ke("--budgee-primary"),d=a?c.map(f=>f<0?Ke("--budgee-negative",.75):Ke("--budgee-positive",.75)):void 0;return{labels:o.map(([f])=>Fw(f)),datasets:[{label:this.config.title,data:l,backgroundColor:u,hoverBackgroundColor:d,borderColor:h,borderWidth:1,maxBarThickness:50}]}};BS=function(){const e=this.config.chartType==="pie"||this.config.chartType==="doughnut",t=this.config.legendPosition??"top",n=t==="hidden"?{display:!1}:{position:t},i=this._liveColSpan??this.config.colSpan??1,r=Math.max(2,Math.round(i/this.maxColumns*12));return{...e&&{interaction:{mode:"nearest",intersect:!0}},...!e&&{scales:{x:{ticks:{autoSkip:!0,maxTicksLimit:r}}}},plugins:{legend:n}}};Wg=function(e,t){if(!t?.length)return e;const n=new Set(t);return e.filter(i=>!n.has(i.id))};WS=function(e){const t=e.reduce((s,[,o])=>s+Math.abs(o),0);if(t===0)return e;const n=t*.01,i=[];let r=0;for(const[s,o]of e)Math.abs(o)<n?r+=o:i.push([s,o]);return r!==0&&i.push(["other",r]),i};HS=function(e){if(this.config.granularity==="byTag"){const t=new Map(this.tags.map(n=>[n.name,n]));return e.map(([n])=>t.get(n)?.color??ks(this,hi,Hg).call(this,n))}return e.map(([t])=>ks(this,hi,Hg).call(this,t))};Hg=function(e){let t=0;for(let i=0;i<e.length;i++)t=t*31+e.charCodeAt(i)|0;return`lch(55% 50 ${(t%360+360)%360})`};US=function(){this.dispatchEvent(new CustomEvent("chart-edit",{detail:{chart:this.config}}))};YS=function(){this.dispatchEvent(new CustomEvent("chart-deleted",{detail:{id:this.config.id}}))};zs.styles=[Ic,AS,dt`
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      h4 {
        margin: 0;
      }
      .actions {
        display: flex;
        gap: 0.25rem;
      }
      chart-wrapper {
        flex: 1;
        min-height: 0;
      }
    `];Oc([H({type:Object})],zs.prototype,"config",2);Oc([H({type:Array})],zs.prototype,"transactions",2);Oc([H({type:Array})],zs.prototype,"tags",2);Oc([H({type:Array})],zs.prototype,"merchants",2);Oc([P()],zs.prototype,"_liveColSpan",2);zs=Oc([Et("dashboard-chart-card")],zs);function tj(e){if(!ej())return e;const t=e.match(/lch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(t)return`lch(${100-Number(t[1])}% ${t[3]} ${t[4]})`;const{r:n,g:i,b:r}=nj(e),s=.2126*xm(n)+.7152*xm(i)+.0722*xm(r),o=s>.008856?116*Math.cbrt(s)-16:903.3*s,a=100-o,c=o>0?a/o:2,l=u=>Math.min(255,Math.max(0,Math.round(u*c+(c>1?30:0))));return`rgb(${l(n)}, ${l(i)}, ${l(r)})`}function ej(){const e=document.documentElement.dataset.theme;return e==="dark"?!0:e==="light"?!1:window.matchMedia("(prefers-color-scheme: dark)").matches}function nj(e){const t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function xm(e){const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4}function qS(e){if(e.startsWith("#"))return ij(e);const t=rj(e);if(t)return t;const n=e.match(/hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\s*\)/);return n?sj(Number(n[1]),Number(n[2]),Number(n[3])):{r:0,g:0,b:0}}function ij(e){const t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function rj(e){const t=e.match(/lch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(!t)return null;const n=Number(t[1]),i=Number(t[2]),s=Number(t[3])*Math.PI/180,o=i*Math.cos(s),a=i*Math.sin(s),c=(n+16)/116,l=o/500+c,u=c-a/200,h=.008856,d=903.3,f=l**3>h?l**3:(116*l-16)/d,p=n>d*h?((n+16)/116)**3:n/d,m=u**3>h?u**3:(116*u-16)/d,g=f*.95047,b=p*1,_=m*1.08883,C=3.2404542*g-1.5371385*b-.4985314*_,S=-.969266*g+1.8760108*b+.041556*_,k=.0556434*g-.2040259*b+1.0572252*_,$=D=>{const w=Math.max(0,Math.min(1,D));return w<=.0031308?12.92*w:1.055*w**(1/2.4)-.055};return{r:Math.round($(C)*255),g:Math.round($(S)*255),b:Math.round($(k)*255)}}function sj(e,t,n){const i=t/100,r=n/100,s=(1-Math.abs(2*r-1))*i,o=s*(1-Math.abs(e/60%2-1)),a=r-s/2;let c=0,l=0,u=0;return e<60?(c=s,l=o):e<120?(c=o,l=s):e<180?(l=s,u=o):e<240?(l=o,u=s):e<300?(c=o,u=s):(c=s,u=o),{r:Math.round((c+a)*255),g:Math.round((l+a)*255),b:Math.round((u+a)*255)}}function VS(e){return oj(e)>70?"black":"white"}function oj(e){const t=e.match(/lch\(\s*([\d.]+)\s/);if(t)return Number(t[1]);const{r:n,g:i,b:r}=qS(e),[s,o,a]=[n,i,r].map(l=>{const u=l/255;return u<=.03928?u/12.92:((u+.055)/1.055)**2.4}),c=.2126*s+.7152*o+.0722*a;return c>.008856?116*Math.cbrt(c)-16:903.3*c}const aj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-apple"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 6.528V3a1 1 0 0 1 1-1h0" />
  <path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21" />
</svg>
`,cj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-beaker"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4.5 3h15" />
  <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
  <path d="M6 14h12" />
</svg>
`,lj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-beer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
  <path d="M9 12v6" />
  <path d="M13 12v6" />
  <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
  <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
</svg>
`,uj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-bell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
</svg>
`,hj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-bike"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="18.5" cy="17.5" r="3.5" />
  <circle cx="5.5" cy="17.5" r="3.5" />
  <circle cx="15" cy="5" r="1" />
  <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
</svg>
`,dj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-book-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 7v14" />
  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
`,fj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-box"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
  <path d="m3.3 7 8.7 5 8.7-5" />
  <path d="M12 22V12" />
</svg>
`,pj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-briefcase"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  <rect width="20" height="14" x="2" y="6" rx="2" />
</svg>
`,mj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-bug"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20v-9" />
  <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
  <path d="M14.12 3.88 16 2" />
  <path d="M21 21a4 4 0 0 0-3.81-4" />
  <path d="M21 5a4 4 0 0 1-3.55 3.97" />
  <path d="M22 13h-4" />
  <path d="M3 21a4 4 0 0 1 3.81-4" />
  <path d="M3 5a4 4 0 0 0 3.55 3.97" />
  <path d="M6 13H2" />
  <path d="m8 2 1.88 1.88" />
  <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
</svg>
`,gj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-cake"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
  <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
  <path d="M2 21h20" />
  <path d="M7 8v3" />
  <path d="M12 8v3" />
  <path d="M17 8v3" />
  <path d="M7 4h.01" />
  <path d="M12 4h.01" />
  <path d="M17 4h.01" />
</svg>
`,vj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-calculator"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="16" height="20" x="4" y="2" rx="2" />
  <line x1="8" x2="16" y1="6" y2="6" />
  <line x1="16" x2="16" y1="14" y2="18" />
  <path d="M16 10h.01" />
  <path d="M12 10h.01" />
  <path d="M8 10h.01" />
  <path d="M12 14h.01" />
  <path d="M8 14h.01" />
  <path d="M12 18h.01" />
  <path d="M8 18h.01" />
</svg>
`,yj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-calendar"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v4" />
  <path d="M16 2v4" />
  <rect width="18" height="18" x="3" y="4" rx="2" />
  <path d="M3 10h18" />
</svg>
`,bj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-camera"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
  <circle cx="12" cy="13" r="3" />
</svg>
`,_j=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-car"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
  <circle cx="7" cy="17" r="2" />
  <path d="M9 17h6" />
  <circle cx="17" cy="17" r="2" />
</svg>
`,wj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-carrot"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46" />
  <path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z" />
  <path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z" />
</svg>
`,xj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-chef-hat"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
  <path d="M6 17h12" />
</svg>
`,Cj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-circle-dollar-sign"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
  <path d="M12 18V6" />
</svg>
`,kj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-circle-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M8 12h8" />
  <path d="M12 8v8" />
</svg>
`,Sj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-circle-question-mark"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
  <path d="M12 17h.01" />
</svg>
`,KS=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 6v6l4 2" />
  <circle cx="12" cy="12" r="10" />
</svg>
`,Ej=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-cloud"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
</svg>
`,Mj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-coffee"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 2v2" />
  <path d="M14 2v2" />
  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
  <path d="M6 2v2" />
</svg>
`,Dj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-credit-card"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="14" x="2" y="5" rx="2" />
  <line x1="2" x2="22" y1="10" y2="10" />
</svg>
`,$j=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-cup-soda"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
  <path d="M5 8h14" />
  <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
  <path d="m12 8 1-6h2" />
</svg>
`,Tj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-dumbbell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
  <path d="m2.5 21.5 1.4-1.4" />
  <path d="m20.1 3.9 1.4-1.4" />
  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
  <path d="m9.6 14.4 4.8-4.8" />
</svg>
`,Ij=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-flask-conical"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
  <path d="M6.453 15h11.094" />
  <path d="M8.5 2h7" />
</svg>
`,Oj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-gamepad-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="6" x2="10" y1="11" y2="11" />
  <line x1="8" x2="8" y1="9" y2="13" />
  <line x1="15" x2="15.01" y1="12" y2="12" />
  <line x1="18" x2="18.01" y1="10" y2="10" />
  <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
</svg>
`,Pj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-gift"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="3" y="8" width="18" height="4" rx="1" />
  <path d="M12 8v13" />
  <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
  <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
</svg>
`,Rj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-globe"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
  <path d="M2 12h20" />
</svg>
`,Aj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-graduation-cap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
  <path d="M22 10v6" />
  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
</svg>
`,Lj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-hamburger"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" />
  <path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" />
  <path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" />
  <path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
</svg>
`,Nj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-heart"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
</svg>
`,Fj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-home"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
</svg>
`,zj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-joystick"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z" />
  <path d="M6 15v-2" />
  <path d="M12 15V9" />
  <circle cx="12" cy="6" r="3" />
</svg>
`,jj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-key"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
  <path d="m21 2-9.6 9.6" />
  <circle cx="7.5" cy="15.5" r="5.5" />
</svg>
`,Bj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-lightbulb"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
  <path d="M9 18h6" />
  <path d="M10 22h4" />
</svg>
`,Wj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-mail"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
  <rect x="2" y="4" width="20" height="16" rx="2" />
</svg>
`,Hj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-map-pin"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
  <circle cx="12" cy="10" r="3" />
</svg>
`,Uj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-milk"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2h8" />
  <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
  <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
</svg>
`,Yj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-monitor"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="14" x="2" y="3" rx="2" />
  <line x1="8" x2="16" y1="21" y2="21" />
  <line x1="12" x2="12" y1="17" y2="21" />
</svg>
`,qj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-music"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 18V5l12-2v13" />
  <circle cx="6" cy="18" r="3" />
  <circle cx="18" cy="16" r="3" />
</svg>
`,Vj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-newspaper"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 18h-5" />
  <path d="M18 14h-8" />
  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
  <rect width="8" height="4" x="10" y="6" rx="1" />
</svg>
`,Kj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-paintbrush"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m14.622 17.897-10.68-2.913" />
  <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
  <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
</svg>
`,Gj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-paw-print"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="11" cy="4" r="2" />
  <circle cx="18" cy="8" r="2" />
  <circle cx="20" cy="16" r="2" />
  <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
</svg>
`,Xj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-phone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
</svg>
`,Qj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-pizza"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m12 14-1 1" />
  <path d="m13.75 18.25-1.25 1.42" />
  <path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" />
  <path d="M18.8 9.3a1 1 0 0 0 2.1 7.7" />
  <path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" />
</svg>
`,Zj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-plane"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
</svg>
`,Jj=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-puzzle"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
</svg>
`,t7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-receipt"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
  <path d="M12 17.5v-11" />
</svg>
`,e7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-scale"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v18" />
  <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
  <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
  <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
  <path d="M7 21h10" />
</svg>
`,n7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-scissors"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="6" cy="6" r="3" />
  <path d="M8.12 8.12 12 12" />
  <path d="M20 4 8.12 15.88" />
  <circle cx="6" cy="18" r="3" />
  <path d="M14.8 14.8 20 20" />
</svg>
`,i7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-shield-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" />
</svg>
`,r7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-shirt"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
</svg>
`,s7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-shopping-bag"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 10a4 4 0 0 1-8 0" />
  <path d="M3.103 6.034h17.794" />
  <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
</svg>
`,o7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-shopping-cart"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="8" cy="21" r="1" />
  <circle cx="19" cy="21" r="1" />
  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
</svg>
`,a7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`,c7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-star"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
</svg>
`,l7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-sun"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2" />
  <path d="M12 20v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m17.66 17.66 1.41 1.41" />
  <path d="M2 12h2" />
  <path d="M20 12h2" />
  <path d="m6.34 17.66-1.41 1.41" />
  <path d="m19.07 4.93-1.41 1.41" />
</svg>
`,u7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-ticket"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
  <path d="M13 5v2" />
  <path d="M13 17v2" />
  <path d="M13 11v2" />
</svg>
`,h7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-trophy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
  <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
  <path d="M4 22h16" />
  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
  <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
</svg>
`,d7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-truck"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
  <path d="M15 18H9" />
  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
  <circle cx="17" cy="18" r="2" />
  <circle cx="7" cy="18" r="2" />
</svg>`,f7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-tv"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m17 2-5 5-5-5" />
  <rect width="20" height="15" x="2" y="7" rx="2" />
</svg>
`,p7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-user"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</svg>
`,m7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-users"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  <circle cx="9" cy="7" r="4" />
</svg>
`,g7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-utensils"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
  <path d="M7 2v20" />
  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
</svg>
`,v7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-wallet"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
</svg>
`,y7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-wifi"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20h.01" />
  <path d="M2 8.82a15 15 0 0 1 20 0" />
  <path d="M5 12.859a10 10 0 0 1 14 0" />
  <path d="M8.5 16.429a5 5 0 0 1 7 0" />
</svg>
`,b7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-wine"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 22h8" />
  <path d="M7 10h10" />
  <path d="M12 15v7" />
  <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
</svg>
`,_7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-zap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
</svg>
`;var w7=Object.defineProperty,x7=Object.getOwnPropertyDescriptor,GS=e=>{throw TypeError(e)},dp=(e,t,n,i)=>{for(var r=i>1?void 0:i?x7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&w7(t,n,r),r},XS=(e,t,n)=>t.has(e)||GS("Cannot "+n),Qc=(e,t,n)=>(XS(e,t,"read from private field"),n?n.call(e):t.get(e)),Cm=(e,t,n)=>t.has(e)?GS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),xl=(e,t,n)=>(XS(e,t,"access private method"),n),sd,od,us,QS,Pv,ZS,JS,tE;const fp={apple:aj,banknote:z2,beaker:cj,beer:lj,bell:uj,bike:hj,"book-open":dj,briefcase:pj,bug:mj,cake:gj,calculator:vj,calendar:yj,camera:bj,car:_j,carrot:wj,"chef-hat":xj,"circle-dollar-sign":Cj,"circle-plus":kj,clock:KS,cloud:Ej,coffee:Mj,"credit-card":Dj,box:fj,"cup-soda":$j,dumbbell:Tj,flask:Ij,gamepad:Oj,gift:Pj,globe:Rj,"graduation-cap":Aj,hamburger:Lj,heart:Nj,home:Fj,joystick:zj,key:jj,lightbulb:Bj,mail:Wj,"map-pin":Hj,milk:Uj,monitor:Yj,music:qj,newspaper:Vj,paintbrush:Kj,"paw-print":Gj,phone:Xj,pizza:Qj,plane:Zj,puzzle:Jj,question:Sj,receipt:t7,scale:e7,scissors:n7,"shield-check":i7,shirt:r7,"shopping-bag":s7,"shopping-cart":o7,sparkles:a7,star:c7,store:j2,sun:l7,ticket:u7,trophy:h7,truck:d7,tv:f7,user:p7,users:m7,utensils:g7,wallet:v7,wifi:y7,wine:b7,wrench:hp,zap:_7},zw=Object.entries(fp);let mc=class extends gt{constructor(){super(...arguments),Cm(this,us),this.value="",this._open=!1,this._search="",Cm(this,sd,e=>{if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._search="")}),Cm(this,od,()=>{this._open&&xl(this,us,Pv).call(this)})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",Qc(this,sd),!0),window.addEventListener("scroll",Qc(this,od),!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",Qc(this,sd),!0),window.removeEventListener("scroll",Qc(this,od),!0)}render(){const e=this.value?fp[this.value]:null;return E`
      <button
        class="trigger ${e?"":"placeholder"}"
        @click=${xl(this,us,QS)}
        title="Pick icon"
      >
        ${e?ye(e):"?"}
      </button>
      ${this._open?E`
            <div class="popup">
              <input
                class="search"
                type="text"
                placeholder="Search icons..."
                .value=${this._search}
                @input=${t=>{this._search=t.target.value}}
              />
              <div class="grid">
                ${Qc(this,us,tE).map(([t,n])=>E`
                    <button
                      class="icon-option ${this.value===t?"selected":""}"
                      title=${t}
                      @click=${()=>xl(this,us,ZS).call(this,t)}
                    >
                      ${ye(n)}
                    </button>
                  `)}
              </div>
              ${this.value?E`<button class="clear-btn" @click=${xl(this,us,JS)}>Clear icon</button>`:tt}
            </div>
          `:tt}
    `}};sd=new WeakMap;od=new WeakMap;us=new WeakSet;QS=function(){this._open=!this._open,this._search="",this._open&&this.updateComplete.then(()=>xl(this,us,Pv).call(this))};Pv=function(){const e=this.shadowRoot?.querySelector(".trigger"),t=this.shadowRoot?.querySelector(".popup");if(!e||!t)return;const n=e.getBoundingClientRect(),i=t.offsetHeight,r=window.innerHeight-n.bottom;r<i+4&&n.top>r?t.style.top=`${n.top-i-4}px`:t.style.top=`${n.bottom+4}px`,t.style.left=`${n.left}px`};ZS=function(e){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:e}})),this._open=!1,this._search=""};JS=function(){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:""}})),this._open=!1,this._search=""};tE=function(){if(!this._search)return zw;const e=this._search.toLowerCase();return zw.filter(([t])=>t.includes(e))};mc.styles=dt`
    :host {
      display: inline-block;
      position: relative;
    }
    .trigger {
      background: none;
      border: 1px solid var(--budgee-border);
      border-radius: 4px;
      padding: 4px;
      cursor: pointer;
      color: inherit;
      width: 2.2rem;
      height: 2.2rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .trigger:hover {
      background-color: var(--budgee-bg);
    }
    .trigger svg {
      width: 1.2rem;
      height: 1.2rem;
    }
    .trigger.placeholder {
      color: var(--budgee-text-muted);
    }
    .popup {
      position: fixed;
      z-index: 1200;
      background: var(--budgee-surface);
      border: 1px solid var(--budgee-border);
      border-radius: 8px;
      box-shadow: 0 4px 16px lch(0% 0 none / 0.15);
      padding: 0.5rem;
      width: 280px;
    }
    .search {
      width: 100%;
      box-sizing: border-box;
      padding: 4px 8px;
      margin-bottom: 0.5rem;
      border: 1px solid var(--budgee-border);
      border-radius: 4px;
      font-size: 0.85rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 2px;
      max-height: 200px;
      overflow-y: auto;
    }
    .icon-option {
      background: none;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }
    .icon-option:hover {
      background-color: var(--budgee-bg);
      border-color: var(--budgee-border);
    }
    .icon-option.selected {
      background-color: var(--budgee-primary);
      color: white;
    }
    .icon-option svg {
      width: 1.2rem;
      height: 1.2rem;
    }
    .clear-btn {
      width: 100%;
      margin-top: 0.5rem;
      padding: 4px;
      background: none;
      border: 1px solid var(--budgee-border);
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      color: var(--budgee-text-muted);
    }
    .clear-btn:hover {
      background-color: var(--budgee-bg);
    }
  `;dp([H({type:String})],mc.prototype,"value",2);dp([P()],mc.prototype,"_open",2);dp([P()],mc.prototype,"_search",2);mc=dp([Et("icon-picker")],mc);var C7=Object.defineProperty,k7=Object.getOwnPropertyDescriptor,eE=e=>{throw TypeError(e)},Rv=(e,t,n,i)=>{for(var r=i>1?void 0:i?k7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&C7(t,n,r),r},S7=(e,t,n)=>t.has(e)||eE("Cannot "+n),E7=(e,t,n)=>t.has(e)?eE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),M7=(e,t,n)=>(S7(e,t,"access private method"),n),Ug,nE;let Tu=class extends gt{constructor(){super(...arguments),E7(this,Ug),this.tags=[],this.tagIds=[]}render(){return E`${this.tagIds.map(e=>{const t=this.tags.find(s=>s.id===e),n=t?.color?tj(t.color):null,i=n??"var(--budgee-primary)",r=n?VS(n):"white";return E`<span class="tag-pill" style="background:${i};color:${r}">${M7(this,Ug,nE).call(this,e)}</span>`})}`}};Ug=new WeakSet;nE=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?fp[t.icon]:null;return n?E`<span class="pill-icon">${ye(n)}</span> ${t.name}`:t.name};Tu.styles=dt`
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
    .tag-pill {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: var(--budgee-primary);
      color: white;
      padding: 1px 6px;
      border-radius: 8px;
      font-size: 0.75rem;
      white-space: nowrap;
    }
    .pill-icon {
      display: inline-flex;
      align-items: center;
    }
    .pill-icon svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  `;Rv([H({type:Array})],Tu.prototype,"tags",2);Rv([H({type:Array})],Tu.prototype,"tagIds",2);Tu=Rv([Et("tag-pills")],Tu);var D7=Object.defineProperty,$7=Object.getOwnPropertyDescriptor,iE=e=>{throw TypeError(e)},Gs=(e,t,n,i)=>{for(var r=i>1?void 0:i?$7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&D7(t,n,r),r},T7=(e,t,n)=>t.has(e)||iE("Cannot "+n),I7=(e,t,n)=>t.has(e)?iE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),le=(e,t,n)=>(T7(e,t,"access private method"),n),Qt,rE,sE,pp,oE,aE,mp,gp,cE,lE,uE,hE,dE,fE,pE,mE,gE;let lr=class extends NS(gt){constructor(){super(...arguments),I7(this,Qt),this.transactions=[],this.tags=[],this.merchants=[],this.accounts=[],this._page=1,this._pageSize=10}get _resizableConfig(){return this.config}_onResized(e){this.dispatchEvent(new CustomEvent("table-resized",{detail:{id:this.config.id,...e}}))}render(){return E`
      ${LS(this)}
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${le(this,Qt,rE)}>${ye(hp)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${le(this,Qt,sE)}>${ye(Tc)}</button>
        </div>
      </div>
      ${le(this,Qt,gE).call(this)}
    `}};Qt=new WeakSet;rE=function(){this.dispatchEvent(new CustomEvent("table-edit",{detail:{table:this.config}}))};sE=function(){this.dispatchEvent(new CustomEvent("table-deleted",{detail:{id:this.config.id}}))};pp=function(e){this._page=e.detail.page,this._pageSize=e.detail.pageSize};oE=function(e){return e?this.merchants.find(t=>t.id===e)?.name??"":""};aE=function(e){return e?this.accounts.find(t=>t.id===e)?.name??"":""};mp=function(e){return{date:"Date",amount:"Amount",description:"Description",merchant:"Merchant",tags:"Tags",account:"Account",name:"Name",transactionCount:"Transactions",totalAmount:"Total Amount"}[e]};gp=function(e){return e==="amount"||e==="totalAmount"};cE=function(){const e=[...this.transactions].sort((r,s)=>s.date.localeCompare(r.date)),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,pp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,gp).call(this,r)?"col-amount":""}>${le(this,Qt,mp).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,lE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};lE=function(e,t){switch(t){case"date":return E`<td>${e.date}</td>`;case"amount":return E`<td class="col-amount ${e.amount<0?"amount-negative":"amount-positive"}">${e.amount.toFixed(2)}</td>`;case"description":return E`<td>${e.description}</td>`;case"merchant":return E`<td>${le(this,Qt,oE).call(this,e.merchantId)}</td>`;case"tags":return E`<td><tag-pills .tags=${this.tags} .tagIds=${e.tagIds}></tag-pills></td>`;case"account":return E`<td>${le(this,Qt,aE).call(this,e.accountId)}</td>`;default:return E`
          <td></td>
        `}};uE=function(){const e=zf(this.transactions,t=>[t.merchantId]);return this.merchants.map(t=>{const n=e.get(t.id);return{merchant:t,transactionCount:n?.count??0,totalAmount:n?.total??0}})};hE=function(){const e=le(this,Qt,uE).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,pp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,gp).call(this,r)?"col-amount":""}>${le(this,Qt,mp).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,dE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};dE=function(e,t){switch(t){case"name":return E`<td>${e.merchant.name}</td>`;case"transactionCount":return E`<td>${e.transactionCount}</td>`;case"totalAmount":return E`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return E`
          <td></td>
        `}};fE=function(){const e=zf(this.transactions,t=>t.tagIds);return this.tags.map(t=>{const n=e.get(t.id);return{tag:t,transactionCount:n?.count??0,totalAmount:n?.total??0}})};pE=function(){const e=le(this,Qt,fE).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,pp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,gp).call(this,r)?"col-amount":""}>${le(this,Qt,mp).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,mE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};mE=function(e,t){switch(t){case"name":return E`<td>${e.tag.name}</td>`;case"transactionCount":return E`<td>${e.transactionCount}</td>`;case"totalAmount":return E`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return E`
          <td></td>
        `}};gE=function(){switch(this.config.model){case"transactions":return le(this,Qt,cE).call(this);case"merchants":return le(this,Qt,hE).call(this);case"tags":return le(this,Qt,pE).call(this);default:return tt}};lr.styles=[Zr,Ic,AS,dt`
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      h4 {
        margin: 0;
      }
      .actions {
        display: flex;
        gap: 0.25rem;
      }
    `];Gs([H({type:Object})],lr.prototype,"config",2);Gs([H({type:Array})],lr.prototype,"transactions",2);Gs([H({type:Array})],lr.prototype,"tags",2);Gs([H({type:Array})],lr.prototype,"merchants",2);Gs([H({type:Array})],lr.prototype,"accounts",2);Gs([P()],lr.prototype,"_page",2);Gs([P()],lr.prototype,"_pageSize",2);lr=Gs([Et("dashboard-table-card")],lr);var O7=Object.defineProperty,P7=Object.getOwnPropertyDescriptor,vE=e=>{throw TypeError(e)},Pc=(e,t,n,i)=>{for(var r=i>1?void 0:i?P7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&O7(t,n,r),r},R7=(e,t,n)=>t.has(e)||vE("Cannot "+n),A7=(e,t,n)=>t.has(e)?vE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),km=(e,t,n)=>(R7(e,t,"access private method"),n),Cl,yE,bE,_E;const Av={transactions:[{id:"date",label:"Date"},{id:"amount",label:"Amount"},{id:"description",label:"Description"},{id:"merchant",label:"Merchant"},{id:"tags",label:"Tags"},{id:"account",label:"Account"}],merchants:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}],tags:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}]};function wE(e){return Av[e].map(t=>t.id)}let js=class extends gt{constructor(){super(...arguments),A7(this,Cl),this._title="",this._model="transactions",this._columns=wE("transactions"),this._initialized=!1}updated(e){e.has("editingTable")&&this.editingTable&&!this._initialized&&(this._title=this.editingTable.title,this._model=this.editingTable.model,this._columns=[...this.editingTable.columns],this._initialized=!0)}render(){const e=Av[this._model];return E`
      <h4>${this.editingTable?"Edit Table":"Add Table"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${t=>{this._title=t.target.value}}
        />
        <label>Model:</label>
        <select @change=${t=>{km(this,Cl,yE).call(this,t.target.value)}}>
          <option value="transactions" ?selected=${this._model==="transactions"}>Transactions</option>
          <option value="merchants" ?selected=${this._model==="merchants"}>Merchants</option>
          <option value="tags" ?selected=${this._model==="tags"}>Tags</option>
        </select>
      </div>
      <label>Columns:</label>
      <div class="checkbox-list">
        ${e.map(t=>E`
          <label>
            <input
              type="checkbox"
              ?checked=${this._columns.includes(t.id)}
              @change=${n=>km(this,Cl,bE).call(this,t.id,n.target.checked)}
            />
            ${t.label}
          </label>
        `)}
      </div>
      <button @click=${km(this,Cl,_E)}>${this.editingTable?"Update Table":"Save to Dashboard"}</button>
    `}};Cl=new WeakSet;yE=function(e){this._model=e,this._columns=wE(e)};bE=function(e,t){if(t){const n=Av[this._model].map(i=>i.id);this._columns=n.filter(i=>this._columns.includes(i)||i===e)}else this._columns=this._columns.filter(n=>n!==e)};_E=function(){const e=this._title.trim();!e||this._columns.length===0||(this.dispatchEvent(new CustomEvent("table-saved",{detail:{id:this.editingTable?.id,title:e,model:this._model,columns:this._columns}})),this._title="",this._initialized=!1)};js.styles=[Li,fr,dt`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      h4 {
        margin-top: 0;
      }
      .form-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        align-items: center;
        max-width: 400px;
        margin-bottom: 1rem;
      }
      input,
      select {
        padding: 4px 8px;
      }
      button {
        margin-right: 0.5rem;
      }
      .checkbox-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        margin-bottom: 1rem;
      }
      .checkbox-list label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.9rem;
      }
    `];Pc([H({type:Object})],js.prototype,"editingTable",2);Pc([P()],js.prototype,"_title",2);Pc([P()],js.prototype,"_model",2);Pc([P()],js.prototype,"_columns",2);Pc([P()],js.prototype,"_initialized",2);js=Pc([Et("table-configurator")],js);var L7=Object.defineProperty,N7=Object.getOwnPropertyDescriptor,xE=e=>{throw TypeError(e)},Hn=(e,t,n,i)=>{for(var r=i>1?void 0:i?N7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&L7(t,n,r),r},Lv=(e,t,n)=>t.has(e)||xE("Cannot "+n),jw=(e,t,n)=>(Lv(e,t,"read from private field"),n?n.call(e):t.get(e)),Bw=(e,t,n)=>t.has(e)?xE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ww=(e,t,n,i)=>(Lv(e,t,"write to private field"),t.set(e,n),n),de=(e,t,n)=>(Lv(e,t,"access private method"),n),kl,Kt,ur,Yg,CE,kE,SE,EE,ME,DE,$E,TE,IE,OE,PE;let nn=class extends gt{constructor(){super(...arguments),Bw(this,Kt),this._transactions=null,this._tags=[],this._merchants=[],this._accounts=[],this._charts=[],this._tables=[],this._timeRange=null,this.columns=12,this.rows=12,this._showChartConfigurator=!1,this._showTableConfigurator=!1,Bw(this,kl,[])}willUpdate(){this.style.setProperty("--grid-columns",String(this.columns)),this.style.setProperty("--grid-row-height",`${800/this.rows}px`)}connectedCallback(){super.connectedCallback(),de(this,Kt,ur).call(this);const e=ta(()=>de(this,Kt,ur).call(this),300);Promise.all([_e.subscribe(e),pe.subscribe(e),Oe.subscribe(e),ke.subscribe(e),vi.subscribe(e),cr.subscribe(e)]).then(t=>{Ww(this,kl,t)})}disconnectedCallback(){super.disconnectedCallback(),this._chartSortable?.destroy(),this._tableSortable?.destroy();for(const e of jw(this,kl))e.unsubscribe();Ww(this,kl,[])}updated(){de(this,Kt,Yg).call(this,".chart-grid","chart",e=>{this._chartSortable=e}),de(this,Kt,Yg).call(this,".table-grid","table",e=>{this._tableSortable=e})}render(){return this._transactions===null?E`
        <h3>Dashboard</h3>
        <p>Loading…</p>
      `:this._transactions.length===0?E`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `:E`
      <div class="dashboard-header">
        <time-range-picker .value=${this._timeRange} @time-range-change=${de(this,Kt,EE)}></time-range-picker>
      </div>

      ${this._charts.length>0?E`
            <div class="chart-grid">
              ${this._charts.map(e=>E`
                <dashboard-chart-card
                  data-chart-id=${e.id}
                  style="grid-column: span ${e.colSpan??1}; grid-row: span ${e.rowSpan??1}"
                  .config=${e}
                  .maxColumns=${this.columns}
                  .maxRows=${this.rows}
                  .transactions=${jw(this,Kt,SE)}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  @chart-edit=${de(this,Kt,ME)}
                  @chart-resized=${de(this,Kt,DE)}
                  @chart-deleted=${de(this,Kt,$E)}
                ></dashboard-chart-card>
              `)}
            </div>
          `:tt}

      ${this._tables.length>0?E`
            <div class="table-grid">
              ${this._tables.map(e=>E`
                <dashboard-table-card
                  data-table-id=${e.id}
                  style="grid-column: span ${e.colSpan??1}; grid-row: span ${e.rowSpan??1}"
                  .config=${e}
                  .maxColumns=${this.columns}
                  .maxRows=${this.rows}
                  .transactions=${this._transactions}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  .accounts=${this._accounts}
                  @table-edit=${de(this,Kt,IE)}
                  @table-resized=${de(this,Kt,OE)}
                  @table-deleted=${de(this,Kt,PE)}
                ></dashboard-table-card>
              `)}
            </div>
          `:tt}

      <div class="button-bar">
        <button @click=${()=>{this._showChartConfigurator=!0,this._editingChart=void 0}}>
          Add Chart
        </button>
        <button @click=${()=>{this._showTableConfigurator=!0,this._editingTable=void 0}}>
          Add Table
        </button>
      </div>

      ${this._showChartConfigurator?E`
            <budgee-modal
              heading=${this._editingChart?"Edit Chart":"Add Chart"}
              @modal-close=${()=>{this._showChartConfigurator=!1,this._editingChart=void 0}}
            >
              <chart-configurator
                .transactions=${this._transactions}
                .tags=${this._tags}
                .merchants=${this._merchants}
                .editingChart=${this._editingChart}
                @chart-saved=${de(this,Kt,kE)}
              ></chart-configurator>
            </budgee-modal>
          `:tt}

      ${this._showTableConfigurator?E`
            <budgee-modal
              heading=${this._editingTable?"Edit Table":"Add Table"}
              @modal-close=${()=>{this._showTableConfigurator=!1,this._editingTable=void 0}}
            >
              <table-configurator
                .editingTable=${this._editingTable}
                @table-saved=${de(this,Kt,TE)}
              ></table-configurator>
            </budgee-modal>
          `:tt}
    `}};kl=new WeakMap;Kt=new WeakSet;ur=async function(){this._transactions=await _e.all(),this._tags=await pe.all(),this._merchants=await Oe.all(),this._accounts=await ke.all(),this._charts=await vi.all(),this._tables=await cr.all(),this._charts.length===0&&(await vi.create({title:"Monthly Overview",chartType:"bar",granularity:"month",colSpan:this.columns,position:0}),this._charts=await vi.all())};Yg=function(e,t,n){const i=t==="chart"?this._chartSortable:this._tableSortable,r=this.shadowRoot?.querySelector(e);if(!r){i?.destroy(),n(void 0);return}i?.el!==r&&(i?.destroy(),n(nt.create(r,{animation:150,onEnd:()=>de(this,Kt,CE).call(this,t)})))};CE=async function(e){const t=e==="chart"?".chart-grid":".table-grid",n=e==="chart"?"data-chart-id":"data-table-id",i=this.shadowRoot?.querySelector(t);if(!i)return;const r=i.querySelectorAll(`[${n}]`),s=[];r.forEach(o=>{const a=o.getAttribute(n);a&&s.push(a)}),e==="chart"?await vi.reorder(s):await cr.reorder(s),await de(this,Kt,ur).call(this)};kE=async function(e){const t=e.detail;t.id?await vi.update(t.id,{title:t.title,chartType:t.chartType,granularity:t.granularity,excludedTagIds:t.excludedTagIds,excludedMerchantIds:t.excludedMerchantIds,legendPosition:t.legendPosition,filters:t.filters}):await vi.create({...t,colSpan:this.columns,position:this._charts.length}),this._showChartConfigurator=!1,this._editingChart=void 0,await de(this,Kt,ur).call(this)};SE=function(){if(this._transactions===null)return null;if(this._timeRange===null)return this._transactions;const e=Ba.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(t=>t.date>=e)};EE=function(e){this._timeRange=e.timeRange};ME=function(e){this._editingChart=e.detail.chart,this._showChartConfigurator=!0};DE=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await vi.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await de(this,Kt,ur).call(this)};$E=async function(e){await vi.remove(e.detail.id),await de(this,Kt,ur).call(this)};TE=async function(e){const t=e.detail;t.id?await cr.update(t.id,{title:t.title,model:t.model,columns:t.columns,colSpan:t.colSpan,rowSpan:t.rowSpan}):await cr.create({...t,position:this._tables.length}),this._showTableConfigurator=!1,this._editingTable=void 0,await de(this,Kt,ur).call(this)};IE=function(e){this._editingTable=e.detail.table,this._showTableConfigurator=!0};OE=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await cr.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await de(this,Kt,ur).call(this)};PE=async function(e){await cr.remove(e.detail.id),await de(this,Kt,ur).call(this)};nn.styles=[Li,Zr,dt`
      :host {
        display: block;
      }
      .card {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .card h3 {
        margin-top: 0;
      }
      .chart-grid,
      .table-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: var(--grid-row-height);
        gap: 1rem;
        margin-bottom: 1rem;
      }
      @media (min-width: 700px) {
        .chart-grid,
        .table-grid {
          grid-template-columns: repeat(calc(var(--grid-columns) / 2), 1fr);
        }
      }
      @media (min-width: 1200px) {
        .chart-grid,
        .table-grid {
          grid-template-columns: repeat(var(--grid-columns), 1fr);
        }
      }
      button {
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
      }
      .dashboard-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: space-between;
      }
      .button-bar {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
    `];Hn([P()],nn.prototype,"_transactions",2);Hn([P()],nn.prototype,"_tags",2);Hn([P()],nn.prototype,"_merchants",2);Hn([P()],nn.prototype,"_accounts",2);Hn([P()],nn.prototype,"_charts",2);Hn([P()],nn.prototype,"_tables",2);Hn([P()],nn.prototype,"_timeRange",2);Hn([H({type:Number})],nn.prototype,"columns",2);Hn([H({type:Number})],nn.prototype,"rows",2);Hn([P()],nn.prototype,"_showChartConfigurator",2);Hn([P()],nn.prototype,"_editingChart",2);Hn([P()],nn.prototype,"_showTableConfigurator",2);Hn([P()],nn.prototype,"_editingTable",2);nn=Hn([Et("budgee-dashboard")],nn);var F7=Object.defineProperty,z7=Object.getOwnPropertyDescriptor,RE=e=>{throw TypeError(e)},aa=(e,t,n,i)=>{for(var r=i>1?void 0:i?z7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&F7(t,n,r),r},Nv=(e,t,n)=>t.has(e)||RE("Cannot "+n),j7=(e,t,n)=>(Nv(e,t,"read from private field"),n?n.call(e):t.get(e)),Hw=(e,t,n)=>t.has(e)?RE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Uw=(e,t,n,i)=>(Nv(e,t,"write to private field"),t.set(e,n),n),$n=(e,t,n)=>(Nv(e,t,"access private method"),n),Sl,qe,qg,AE,LE,NE,FE,ad,cd,zE,jE;let Vr=class extends gt{constructor(){super(...arguments),Hw(this,qe),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",Hw(this,Sl,[])}connectedCallback(){super.connectedCallback(),$n(this,qe,qg).call(this);const e=ta(()=>$n(this,qe,qg).call(this),300);Promise.all([Oe.subscribe(e),_e.subscribe(e)]).then(t=>{Uw(this,Sl,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of j7(this,Sl))e.unsubscribe();Uw(this,Sl,[])}render(){if(this._rows===null)return E`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;if(this._rows.length===0)return E`
        <budgee-empty-state
          heading="No merchants yet"
          description="Merchants are created automatically when you assign them to transactions or rules."
        ></budgee-empty-state>
      `;const e=this._rows.filter(r=>$n(this,qe,FE).call(this,r)),t=$n(this,qe,zE).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="merchants"
        ?filterable=${!0}
        @page-change=${$n(this,qe,LE)}
        @filter-change=${$n(this,qe,NE)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>$n(this,qe,ad).call(this,"name")}>
                Name${$n(this,qe,cd).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>$n(this,qe,ad).call(this,"count")}>
                Transactions${$n(this,qe,cd).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>$n(this,qe,ad).call(this,"spend")}>
                Total Spend${$n(this,qe,cd).call(this,"spend")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>E`
              <tr @click=${()=>$n(this,qe,jE).call(this,r.merchant.id)}>
                <td>${r.merchant.name}</td>
                <td>${r.transactionCount??"…"}</td>
                <td class="col-amount ${r.totalSpend!=null&&r.totalSpend<0?"amount-negative":"amount-positive"}">
                  ${r.totalSpend!=null?r.totalSpend.toFixed(2):"…"}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};Sl=new WeakMap;qe=new WeakSet;qg=async function(){const e=await Oe.all();this._rows=e.map(t=>({merchant:t,transactionCount:null,totalSpend:null})),$n(this,qe,AE).call(this)};AE=async function(){const e=await _e.all(),t=zf(e,n=>[n.merchantId]);this._rows=this._rows.map(n=>{const i=t.get(n.merchant.id);return{...n,transactionCount:i?.count??0,totalSpend:i?.total??0}})};LE=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};NE=function(e){this._filter=e.detail.filter,this._currentPage=1};FE=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.merchant.name.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.totalSpend!=null&&e.totalSpend.toFixed(2).includes(t))};ad=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};cd=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};zE=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.merchant.name.localeCompare(r.merchant.name):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="spend"&&(s=(i.totalSpend??0)-(r.totalSpend??0)),s*n})};jE=function(e){Cc(`/merchants/${e}`)};Vr.styles=[Zr,dt`
      tbody tr {
        cursor: pointer;
      }
    `];aa([P()],Vr.prototype,"_rows",2);aa([P()],Vr.prototype,"_currentPage",2);aa([P()],Vr.prototype,"_pageSize",2);aa([P()],Vr.prototype,"_filter",2);aa([P()],Vr.prototype,"_sortCol",2);aa([P()],Vr.prototype,"_sortDir",2);Vr=aa([Et("merchant-list")],Vr);const B7=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-triangle-alert"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
  <path d="M12 9v4" />
  <path d="M12 17h.01" />
</svg>
`;let Zc=null,Yw=!1;async function W7(){if(Zc)return Zc;const e=await Z();return Zc=(await e.merchantRules.all()).map(n=>new bn(n)),Yw||(Yw=!0,e.merchantRules.subscribe(()=>{Zc=null})),Zc}function vp(e,t={}){const n=e.accountId?t[e.accountId]:void 0;return{description:e.description.toLowerCase(),accountId:e.accountId,account:n?.name.toLowerCase()??e.accountId?.toLowerCase()}}function H7(e,t){if(e===void 0)return!1;switch(t.operator){case"contains":return e.includes(t.value);case"startsWith":return e.startsWith(t.value);case"equals":return e===t.value;case"regex":return t.regex.test(e)}}class bn{#t;constructor(t){Object.assign(this,t),this.#t=this.conditions.map(n=>({field:n.field,operator:n.operator,value:n.value.toLowerCase(),regex:n.operator==="regex"?new RegExp(n.value,"i"):void 0}))}matches(t){if(this.accountId&&this.accountId!==t.accountId)return!1;const n=i=>H7(t[i.field],i);return this.logic==="and"?this.#t.every(n):this.#t.some(n)}static async subscribe(t){return(await Z()).merchantRules.subscribe(t)}static async all(){return W7()}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.merchantRules.put(i),new bn(i)}static async put(t){const n=await Z();t.id?await n.merchantRules.put(t):await n.merchantRules.put({...t,id:ir()})}static async update(t,n){const i=await Z(),r=await i.merchantRules.get(t);await i.merchantRules.put({...r,...n})}static async remove(t){await(await Z()).merchantRules.remove(t)}static async applyToTransactions(t){const n=await Z(),i=await n.transactions.all(),r=ke.toLookup(await n.accounts.all()),s=new bn(t),o=[];for(const a of i)s.matches(vp(a,r))&&o.push({...a,merchantId:t.merchantId??a.merchantId,tagIds:[...new Set([...a.tagIds,...t.tagIds])]});return o.length>0&&await n.transactions.bulkDocs(o),o.length}}function Ci(e){document.dispatchEvent(new CustomEvent("budgee-toast",{detail:e}))}const U7=Object.freeze(Object.defineProperty({__proto__:null,showToast:Ci},Symbol.toStringTag,{value:"Module"})),yp=dt`
  :host([busy]) {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
`;function bp(e){class t extends e{constructor(){super(...arguments),this._busy=!1}async withBusy(i){this._busy=!0,this.toggleAttribute("busy",!0),this.requestUpdate();try{return await i()}finally{this._busy=!1,this.toggleAttribute("busy",!1),this.requestUpdate()}}get busy(){return this._busy}}return t}const Y7=/^(SQ \*|TST\* |SP \*?|PAYPAL \*)/i,q7=/((St.\s+)?[^\s]+)?\s*,\s*\w{2}$/,V7=e=>e.replace(Y7,"").trim().replace(q7,"").trim().toLocaleLowerCase().split(" ").map(n=>n.charAt(0).toLocaleUpperCase()+n.slice(1)).join(" ");var K7=Object.defineProperty,G7=Object.getOwnPropertyDescriptor,BE=e=>{throw TypeError(e)},Rc=(e,t,n,i)=>{for(var r=i>1?void 0:i?G7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&K7(t,n,r),r},WE=(e,t,n)=>t.has(e)||BE("Cannot "+n),HE=(e,t,n)=>(WE(e,t,"read from private field"),n?n.call(e):t.get(e)),X7=(e,t,n)=>t.has(e)?BE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Sa=(e,t,n)=>(WE(e,t,"access private method"),n),Hi,Fv,UE,YE,qE,VE,zv;let Bs=class extends gt{constructor(){super(...arguments),X7(this,Hi),this.items=[],this.value="",this.placeholder="",this._highlightIndex=-1,this._open=!1}render(){const e=HE(this,Hi,Fv),t=this.value.trim()&&e.some(i=>i.toLowerCase()===this.value.trim().toLowerCase()),n=this._open&&e.length>0&&!t;return E`
      <input
        type="text"
        .placeholder=${this.placeholder}
        .value=${this.value}
        @input=${Sa(this,Hi,UE)}
        @keydown=${Sa(this,Hi,YE)}
        @focus=${Sa(this,Hi,qE)}
        @blur=${Sa(this,Hi,VE)}
      />
      ${n?E`
          <div class="suggestions">
            ${e.map((i,r)=>E`
              <div
                class="suggestion ${r===this._highlightIndex?"highlighted":""}"
                @click=${()=>Sa(this,Hi,zv).call(this,i)}
              >
                ${i}
              </div>
            `)}
          </div>
        `:tt}
    `}};Hi=new WeakSet;Fv=function(){const e=this.value.toLowerCase().trim();return e?this.items.filter(t=>t.toLowerCase().includes(e)):[]};UE=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t}})),this._highlightIndex=-1,this._open=t.trim().length>0};YE=function(e){const t=HE(this,Hi,Fv);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,t.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"&&this._highlightIndex>=0&&this._highlightIndex<t.length?(e.preventDefault(),Sa(this,Hi,zv).call(this,t[this._highlightIndex])):e.key==="Escape"&&(this._open=!1)};qE=function(){this.value.trim().length>0&&(this._open=!0)};VE=function(){setTimeout(()=>{this._open=!1},150)};zv=function(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e}})),this._open=!1,this._highlightIndex=-1};Bs.styles=[fr,dt`
      :host {
        display: inline-block;
        position: relative;
      }
      input {
        padding: 4px 8px;
      }
      .suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--budgee-surface);
        border: 1px solid var(--budgee-border);
        border-radius: 0 0 4px 4px;
        max-height: 150px;
        overflow-y: auto;
        z-index: 10;
        min-width: 180px;
      }
      .suggestion {
        padding: 4px 6px;
        cursor: pointer;
        font-size: 0.85rem;
      }
      .suggestion:hover,
      .suggestion.highlighted {
        background: var(--budgee-bg);
      }
    `];Rc([H({type:Array})],Bs.prototype,"items",2);Rc([H({type:String})],Bs.prototype,"value",2);Rc([H({type:String})],Bs.prototype,"placeholder",2);Rc([P()],Bs.prototype,"_highlightIndex",2);Rc([P()],Bs.prototype,"_open",2);Bs=Rc([Et("autocomplete-input")],Bs);var Q7=Object.defineProperty,Z7=Object.getOwnPropertyDescriptor,KE=e=>{throw TypeError(e)},jv=(e,t,n,i)=>{for(var r=i>1?void 0:i?Z7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Q7(t,n,r),r},GE=(e,t,n)=>t.has(e)||KE("Cannot "+n),qw=(e,t,n)=>(GE(e,t,"read from private field"),n?n.call(e):t.get(e)),J7=(e,t,n)=>t.has(e)?KE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Vw=(e,t,n)=>(GE(e,t,"access private method"),n),Ea,XE,QE,ZE,JE;let Iu=class extends gt{constructor(){super(...arguments),J7(this,Ea),this.merchants=[],this.value=""}render(){const e=qw(this,Ea,QE),t=this.value.trim();return E`
      <div class="input-wrapper">
        <autocomplete-input
          .items=${qw(this,Ea,XE)}
          .value=${this.value}
          placeholder="Merchant name (optional)"
          @value-changed=${Vw(this,Ea,ZE)}
          @paste=${Vw(this,Ea,JE)}
        ></autocomplete-input>
        ${t?e?E`
                  <span class="status existing">existing</span>
                `:E`
                  <span class="status new">new</span>
                `:tt}
      </div>
    `}};Ea=new WeakSet;XE=function(){return this.merchants.map(e=>e.name)};QE=function(){const e=this.value.trim().toLowerCase();return e.length>0&&this.merchants.some(t=>t.name.toLowerCase()===e)};ZE=function(e){this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:e.detail.value}}))};JE=function(e){e.preventDefault();const n=(e.clipboardData?.getData("text")??"").toLowerCase().replace(/(?:^|\s)\S/g,r=>r.toUpperCase()),i=e.composedPath().find(r=>r instanceof HTMLInputElement);i&&(i.value=n),this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:n}}))};Iu.styles=dt`
    :host {
      display: inline-block;
      position: relative;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .status {
      font-size: 0.75rem;
      white-space: nowrap;
    }
    .status.existing {
      color: var(--budgee-success);
    }
    .status.new {
      color: var(--budgee-text-muted);
      font-style: italic;
    }
  `;jv([H({type:Array})],Iu.prototype,"merchants",2);jv([H({type:String})],Iu.prototype,"value",2);Iu=jv([Et("merchant-autocomplete")],Iu);var t9=Object.defineProperty,e9=Object.getOwnPropertyDescriptor,tM=e=>{throw TypeError(e)},ca=(e,t,n,i)=>{for(var r=i>1?void 0:i?e9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&t9(t,n,r),r},eM=(e,t,n)=>t.has(e)||tM("Cannot "+n),ms=(e,t,n)=>(eM(e,t,"read from private field"),n?n.call(e):t.get(e)),n9=(e,t,n)=>t.has(e)?tM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ne=(e,t,n)=>(eM(e,t,"access private method"),n),Ft,Bv,_o,nM,Wv,iM,rM,sM,oM,aM,bf,_f,_p;let Kr=class extends gt{constructor(){super(...arguments),n9(this,Ft),this.tags=[],this.selectedTagIds=[],this.excludeIds=[],this._query="",this._highlightIndex=-1,this._open=!1}updated(e){e.has("_open")&&this._open&&this.updateComplete.then(()=>Ne(this,Ft,iM).call(this))}render(){const e=ms(this,Ft,Bv);return E`
      <div class="input-wrapper" @click=${()=>this.shadowRoot?.querySelector("input")?.focus()}>
        ${this.selectedTagIds.map(t=>{const n=this.tags.find(s=>s.id===t),i=n?.color??"var(--budgee-primary)",r=n?.color?VS(n.color):"white";return E`
          <span class="tag-pill" style="background:${i};color:${r}" @click=${s=>{s.stopPropagation(),Ne(this,Ft,Wv).call(this,t)}}>
            ${Ne(this,Ft,nM).call(this,t)} &times;
          </span>
        `})}
        <input
          type="text"
          placeholder=${this.selectedTagIds.length>0?"":"Add tag..."}
          .value=${this._query}
          @input=${Ne(this,Ft,rM)}
          @keydown=${Ne(this,Ft,sM)}
          @focus=${Ne(this,Ft,oM)}
          @blur=${Ne(this,Ft,aM)}
        />
      </div>
      ${this._open&&(e.length>0||ms(this,Ft,_o))?E`
            <div class="suggestions">
              ${e.map((t,n)=>E`
                <div
                  class="suggestion ${n===this._highlightIndex?"highlighted":""}"
                  @click=${()=>Ne(this,Ft,bf).call(this,t)}
                >
                  ${t.name}
                </div>
              `)}
              ${ms(this,Ft,_o)?E`
                    <div
                      class="suggestion create ${e.length===this._highlightIndex?"highlighted":""}"
                      @click=${Ne(this,Ft,_f)}
                    >
                      Create "${this._query.trim()}"
                    </div>
                  `:tt}
            </div>
          `:tt}
    `}};Ft=new WeakSet;Bv=function(){const e=this._query.toLowerCase();return this.tags.filter(t=>!this.selectedTagIds.includes(t.id)&&!this.excludeIds.includes(t.id)&&t.name.toLowerCase().includes(e)).sort((t,n)=>{const i=t.name.toLowerCase().startsWith(e)?0:1,r=n.name.toLowerCase().startsWith(e)?0:1;return i-r||t.name.localeCompare(n.name)})};_o=function(){const e=this._query.trim();return e?!this.tags.some(t=>t.name.toLowerCase()===e.toLowerCase()):!1};nM=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?fp[t.icon]:null;return n?E`<span class="pill-icon">${ye(n)}</span> ${t.name}`:t.name};Wv=function(e){this.dispatchEvent(new CustomEvent("tag-removed",{detail:{tagId:e}}))};iM=function(){const e=this.shadowRoot?.querySelector("input"),t=this.shadowRoot?.querySelector(".suggestions");if(!e||!t)return;const n=e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.left}px`,t.style.width=`${n.width}px`};rM=function(e){this._query=e.target.value,this._highlightIndex=-1,this._open=this._query.length>0};sM=function(e){const t=ms(this,Ft,Bv),n=t.length+(ms(this,Ft,_o)?1:0);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,n-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"?(e.preventDefault(),this._highlightIndex>=0&&this._highlightIndex<t.length?Ne(this,Ft,bf).call(this,t[this._highlightIndex]):ms(this,Ft,_o)&&(this._highlightIndex===t.length||this._highlightIndex===-1)?Ne(this,Ft,_f).call(this):t.length===1&&!ms(this,Ft,_o)?Ne(this,Ft,bf).call(this,t[0]):ms(this,Ft,_o)&&Ne(this,Ft,_f).call(this)):e.key==="Backspace"&&this._query===""&&this.selectedTagIds.length>0?(e.preventDefault(),Ne(this,Ft,Wv).call(this,this.selectedTagIds[this.selectedTagIds.length-1])):e.key==="Escape"&&Ne(this,Ft,_p).call(this)};oM=function(){this._query.length>0&&(this._open=!0)};aM=function(){setTimeout(()=>{this._open=!1},150)};bf=function(e){this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:e}})),Ne(this,Ft,_p).call(this)};_f=function(){const e=this._query.trim();e&&(this.dispatchEvent(new CustomEvent("tag-created",{detail:{name:e}})),Ne(this,Ft,_p).call(this))};_p=function(){this._query="",this._highlightIndex=-1,this._open=!1,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};Kr.styles=dt`
    :host {
      display: inline-block;
      position: relative;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 2px;
      padding: 2px 4px;
      border: 1px solid var(--budgee-border);
      border-radius: 12px;
      min-width: 120px;
      cursor: text;
      background: var(--budgee-surface);
    }
    .input-wrapper:focus-within {
      outline: 2px solid var(--budgee-primary);
      outline-offset: -1px;
    }
    .tag-pill {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: var(--budgee-primary);
      color: white;
      padding: 1px 6px;
      border-radius: 8px;
      font-size: 0.75rem;
      cursor: pointer;
      white-space: nowrap;
    }
    .pill-icon {
      display: inline-flex;
      align-items: center;
    }
    .pill-icon svg {
      width: 0.75rem;
      height: 0.75rem;
    }
    input {
      border: none;
      outline: none;
      padding: 2px 4px;
      font-size: 0.85rem;
      flex: 1;
      min-width: 60px;
      background: transparent;
    }
    .suggestions {
      position: fixed;
      background: var(--budgee-surface);
      border: 1px solid var(--budgee-border);
      border-radius: 0 0 4px 4px;
      max-height: 150px;
      overflow-y: auto;
      z-index: 1100;
      min-width: 120px;
    }
    .suggestion {
      padding: 4px 6px;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .suggestion:hover,
    .suggestion.highlighted {
      background: var(--budgee-bg);
    }
    .suggestion.create {
      font-style: italic;
      color: var(--budgee-text-muted);
    }
  `;ca([H({type:Array})],Kr.prototype,"tags",2);ca([H({type:Array})],Kr.prototype,"selectedTagIds",2);ca([H({type:Array})],Kr.prototype,"excludeIds",2);ca([P()],Kr.prototype,"_query",2);ca([P()],Kr.prototype,"_highlightIndex",2);ca([P()],Kr.prototype,"_open",2);Kr=ca([Et("tag-autocomplete")],Kr);var i9=Object.defineProperty,r9=Object.getOwnPropertyDescriptor,cM=e=>{throw TypeError(e)},wp=(e,t,n,i)=>{for(var r=i>1?void 0:i?r9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&i9(t,n,r),r},lM=(e,t,n)=>t.has(e)||cM("Cannot "+n),Kw=(e,t,n)=>(lM(e,t,"read from private field"),n?n.call(e):t.get(e)),s9=(e,t,n)=>t.has(e)?cM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Jc=(e,t,n)=>(lM(e,t,"access private method"),n),wr,uM,hM,dM,fM,pM,mM,gM;const o9=[{value:"description",label:"description"},{value:"account",label:"account"}],a9=[{value:"contains",label:"contains"},{value:"startsWith",label:"starts with"},{value:"equals",label:"equals"},{value:"regex",label:"regex"}];let gc=class extends gt{constructor(){super(...arguments),s9(this,wr),this.condition={field:"description",operator:"equals",value:""},this.index=0,this.accounts=[]}render(){return E`
      <select @change=${Jc(this,wr,uM)}>
        ${o9.map(e=>E`
          <option value=${e.value} ?selected=${this.condition.field===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      <select @change=${Jc(this,wr,hM)}>
        ${a9.map(e=>E`
          <option value=${e.value} ?selected=${this.condition.operator===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      ${Kw(this,wr,pM)?E`<autocomplete-input
            .items=${Kw(this,wr,mM)}
            .value=${this.condition.value}
            placeholder="account name"
            @value-changed=${Jc(this,wr,fM)}
          ></autocomplete-input>`:E`<input
            type="text"
            placeholder="value"
            .value=${this.condition.value}
            @input=${Jc(this,wr,dM)}
          />`}
      <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" @click=${Jc(this,wr,gM)}>${ye(Tc)}</button>
    `}};wr=new WeakSet;uM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,field:t}}}))};hM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,operator:t}}}))};dM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};fM=function(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};pM=function(){return this.condition.field==="account"&&this.condition.operator==="equals"};mM=function(){return this.accounts.map(e=>e.name)};gM=function(){this.dispatchEvent(new CustomEvent("condition-removed",{detail:{index:this.index}}))};gc.styles=[Ic,fr,dt`
      :host {
        display: contents;
      }
      select,
      input {
        padding: 4px 8px;
      }
    `];wp([H({type:Object})],gc.prototype,"condition",2);wp([H({type:Number})],gc.prototype,"index",2);wp([H({type:Array})],gc.prototype,"accounts",2);gc=wp([Et("condition-row")],gc);var c9=Object.defineProperty,l9=Object.getOwnPropertyDescriptor,vM=e=>{throw TypeError(e)},kn=(e,t,n,i)=>{for(var r=i>1?void 0:i?l9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&c9(t,n,r),r},yM=(e,t,n)=>t.has(e)||vM("Cannot "+n),bM=(e,t,n)=>(yM(e,t,"read from private field"),n?n.call(e):t.get(e)),Gw=(e,t,n)=>t.has(e)?vM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Gt=(e,t,n)=>(yM(e,t,"access private method"),n),xp,Bt,_M,wM,xM,CM,kM,SM,EM,MM,Vg,Cp,Hv,Kg,Gg,Uv,DM,$M,TM;let Be=class extends gt{constructor(){super(...arguments),Gw(this,Bt),this.tags=[],this.merchants=[],this.rules=[],this.accounts=[],this.prefillDescription="",this.editingRule=null,this.editingMerchantName="",this._prefillPristine=!1,this._logic="or",this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._previewCount=null,Gw(this,xp,ta(()=>Gt(this,Bt,_M).call(this),300))}updated(e){e.has("editingRule")&&this.editingRule?(this._conditions=[...this.editingRule.conditions],this._logic=this.editingRule.logic,this._selectedTagIds=[...this.editingRule.tagIds],this._merchantName=this.editingMerchantName,this._pendingTagNames=[]):e.has("prefillDescription")&&this.prefillDescription&&(this._conditions=[{field:"description",operator:"equals",value:this.prefillDescription}],this._logic="or",this._merchantName=V7(this.prefillDescription),this._prefillPristine=!0,this._pendingTagNames=[])}render(){const e=Gt(this,Bt,Uv).call(this).length>0;return E`
      <div class="section-header">Conditions</div>
      <div class="form-grid">
        ${this._conditions.map((t,n)=>E`
          <condition-row
            .condition=${t}
            .index=${n}
            .accounts=${this.accounts}
            @condition-changed=${Gt(this,Bt,wM)}
            @condition-removed=${Gt(this,Bt,xM)}
          ></condition-row>
        `)}
      </div>
      ${this._conditions.length>1?E`
            <div class="form-row">
              <label>Logic:</label>
              <select @change=${t=>{this._logic=t.target.value}}>
                <option value="and" ?selected=${this._logic==="and"}>All match (AND)</option>
                <option value="or" ?selected=${this._logic==="or"}>Any match (OR)</option>
              </select>
            </div>
          `:""}
      <button class="add-condition secondary" @click=${Gt(this,Bt,CM)}>+ Add Condition</button>
      <div class="section-header">Actions</div>
      <div class="form-grid">
        <label>Merchant:</label>
        <merchant-autocomplete class="field-value"
          .merchants=${this.merchants}
          .value=${this._merchantName}
          @merchant-changed=${t=>{this._merchantName=t.detail.name}}
        ></merchant-autocomplete>
        <label>Tags:</label>
        <div class="tags-row">
          ${this._pendingTagNames.map(t=>E`
            <span class="tag-badge" @click=${()=>Gt(this,Bt,EM).call(this,t)}>
              ${t} &times;
            </span>
          `)}
          <tag-autocomplete
            .tags=${this.tags}
            .selectedTagIds=${this._selectedTagIds}
            @tag-selected=${Gt(this,Bt,kM)}
            @tag-created=${Gt(this,Bt,SM)}
            @tag-removed=${t=>Gt(this,Bt,MM).call(this,t.detail.tagId)}
          ></tag-autocomplete>
        </div>
      </div>
      ${e?Gt(this,Bt,TM).call(this):Gt(this,Bt,$M).call(this)}
      ${this._previewCount!==null?E`<p class="preview">${this._previewCount} transaction${this._previewCount===1?"":"s"} would match</p>`:""}
      <div class="save-row">
        <button class="secondary" ?disabled=${!Gt(this,Bt,Vg).call(this)} @click=${()=>Gt(this,Bt,Kg).call(this,!1)}>${this.editingRule?"Save":"Create"}</button>
        <button ?disabled=${!Gt(this,Bt,Vg).call(this)} @click=${()=>Gt(this,Bt,Kg).call(this,!0)}>${this.editingRule?"Save":"Create"} and apply</button>
      </div>
    `}};xp=new WeakMap;Bt=new WeakSet;_M=async function(){const e=Gt(this,Bt,Cp).call(this);if(e.length===0){this._previewCount=null;return}const t=new bn({id:"",logic:this._logic,conditions:e,tagIds:[]}),n=await _e.all(),i=ke.toLookup(this.accounts);let r=0;for(const s of n)t.matches(vp(s,i))&&r++;this._previewCount=r};wM=function(e){const{index:t,condition:n}=e.detail;let i=n;this._prefillPristine&&t===0&&n.operator==="equals"&&n.value!==this._conditions[0]?.value&&(i={...n,operator:"contains"},this._prefillPristine=!1),this._conditions=this._conditions.map((r,s)=>s===t?i:r),bM(this,xp).call(this)};xM=function(e){const{index:t}=e.detail;this._conditions=this._conditions.filter((n,i)=>i!==t),bM(this,xp).call(this)};CM=function(){this._conditions=[...this._conditions,{field:"description",operator:"equals",value:""}]};kM=function(e){const t=e.detail.tag;this._selectedTagIds.includes(t.id)||(this._selectedTagIds=[...this._selectedTagIds,t.id])};SM=function(e){const t=e.detail.name;this._pendingTagNames.includes(t)||(this._pendingTagNames=[...this._pendingTagNames,t])};EM=function(e){this._pendingTagNames=this._pendingTagNames.filter(t=>t!==e)};MM=function(e){this._selectedTagIds=this._selectedTagIds.filter(t=>t!==e)};Vg=function(){return this._merchantName.trim()!==""||this._selectedTagIds.length>0||this._pendingTagNames.length>0};Cp=function(){return this._conditions.filter(e=>e.value.trim())};Hv=function(){this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._logic="or"};Kg=function(e){const t=Gt(this,Bt,Cp).call(this);t.length!==0&&(this.dispatchEvent(new CustomEvent("rule-saved",{detail:{id:this.editingRule?.id,logic:this._logic,conditions:t,tagIds:this._selectedTagIds,newTagNames:this._pendingTagNames,merchantName:this._merchantName.trim()||void 0,apply:e}})),Gt(this,Bt,Hv).call(this))};Gg=function(e,t){const n=Gt(this,Bt,Cp).call(this);n.length!==0&&(this.dispatchEvent(new CustomEvent("rule-merge",{detail:{existingRuleId:e.id,conditions:n,apply:t}})),Gt(this,Bt,Hv).call(this))};Uv=function(){if(!this._merchantName.trim())return[];const e=this.merchants.find(t=>t.name.toLowerCase()===this._merchantName.trim().toLowerCase());return e?this.rules.filter(t=>t.merchantId===e.id&&t.id!==this.editingRule?.id):[]};DM=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};$M=function(){return E`
      <div class="existing-rules spacer">
        <h5>Existing rules for this merchant</h5>
        <div class="existing-rule-item">
          <span class="existing-rule-conditions">placeholder</span>
          <button class="merge-btn">Merge</button>
        </div>
      </div>
    `};TM=function(){const e=Gt(this,Bt,Uv).call(this);return e.length===0?tt:E`
      <div class="existing-rules">
        <h5>Existing rules for this merchant</h5>
        ${e.map(t=>E`
            <div class="existing-rule-item">
              <span class="existing-rule-conditions">${Gt(this,Bt,DM).call(this,t)}</span>
              ${t.tagIds.length>0?E`<tag-pills .tags=${this.tags} .tagIds=${t.tagIds}></tag-pills>`:tt}
              <button class="merge-btn secondary" @click=${()=>Gt(this,Bt,Gg).call(this,t,!1)}>Merge</button>
              <button class="merge-btn secondary" @click=${()=>Gt(this,Bt,Gg).call(this,t,!0)}>Merge and apply</button>
            </div>
          `)}
      </div>
    `};Be.styles=[Li,fr,dt`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .form-grid {
        display: grid;
        grid-template-columns: auto auto 1fr auto;
        gap: 0.25rem 0.5rem;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      .form-grid label {
        grid-column: 1 / 3;
      }
      .form-grid .field-value {
        grid-column: 3 / 5;
      }
      .form-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      select,
      input {
        padding: 4px 8px;
      }
      .add-condition {
        font-size: 0.85rem;
        margin-bottom: 0.5rem;
      }
      .tags-row {
        grid-column: 3 / 5;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
      }
      .tag-badge {
        display: inline-block;
        background: var(--budgee-primary);
        color: white;
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 0.8rem;
        cursor: pointer;
      }
      .section-header {
        font-weight: bold;
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }
      .section-header:not(:first-child) {
        margin-top: 1rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--budgee-border);
      }
      .existing-rules {
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        background: var(--budgee-bg);
        border-radius: 4px;
        font-size: 0.85rem;
      }
      .existing-rules h5 {
        margin: 0 0 0.25rem;
      }
      .existing-rule-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0;
      }
      .existing-rule-conditions {
        color: var(--budgee-text-muted);
      }
      tag-pills {
        flex-grow: 1;
      }
      .merge-btn {
        font-size: 0.8rem;
        padding: 2px 8px;
        flex-shrink: 0;
      }
      .preview {
        font-size: 0.85rem;
        color: var(--budgee-text-muted);
        margin-bottom: 0.5rem;
      }
      .save-row {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      .spacer {
        visibility: hidden;
      }
    `];kn([H({type:Array})],Be.prototype,"tags",2);kn([H({type:Array})],Be.prototype,"merchants",2);kn([H({type:Array})],Be.prototype,"rules",2);kn([H({type:Array})],Be.prototype,"accounts",2);kn([H({type:String})],Be.prototype,"prefillDescription",2);kn([H({attribute:!1})],Be.prototype,"editingRule",2);kn([H({type:String})],Be.prototype,"editingMerchantName",2);kn([P()],Be.prototype,"_prefillPristine",2);kn([P()],Be.prototype,"_logic",2);kn([P()],Be.prototype,"_conditions",2);kn([P()],Be.prototype,"_selectedTagIds",2);kn([P()],Be.prototype,"_merchantName",2);kn([P()],Be.prototype,"_pendingTagNames",2);kn([P()],Be.prototype,"_previewCount",2);Be=kn([Et("rule-editor")],Be);var u9=Object.defineProperty,h9=Object.getOwnPropertyDescriptor,IM=e=>{throw TypeError(e)},Yv=(e,t,n,i)=>{for(var r=i>1?void 0:i?h9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&u9(t,n,r),r},d9=(e,t,n)=>t.has(e)||IM("Cannot "+n),f9=(e,t,n)=>t.has(e)?IM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Xw=(e,t,n)=>(d9(e,t,"access private method"),n),ld,Xg;let Ou=class extends gt{constructor(){super(...arguments),f9(this,ld),this.overlaps=[],this.merchants=new Map}render(){return this.overlaps.length===0?E`
        <div class="section">
          <h3>Rule Overlap</h3>
          <p>No overlapping rules found.</p>
        </div>
      `:E`
      <div class="section">
      <h3>Rule Overlap</h3>
      <p>${this.overlaps.length} overlapping rule pair${this.overlaps.length===1?"":"s"} found.</p>
      <table>
        <thead>
          <tr>
            <th>Rule A</th>
            <th>Rule B</th>
            <th>Overlapping Transactions</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          ${this.overlaps.map(e=>E`
            <tr>
              <td class="condition-summary">${Xw(this,ld,Xg).call(this,e.ruleA)}</td>
              <td class="condition-summary">${Xw(this,ld,Xg).call(this,e.ruleB)}</td>
              <td>${e.count}</td>
              <td class="samples">${e.samples.values().take(3).toArray().join(`

`)}</td>
            </tr>
          `)}
        </tbody>
      </table>
      </div>
    `}};ld=new WeakSet;Xg=function(e){const t=e.merchantId?this.merchants.get(e.merchantId)??"":"",n=e.conditions.map(i=>`${i.operator} "${i.value}"`).join(e.logic==="and"?" AND ":" OR ");return t?`${t}: ${n}`:n};Ou.styles=[Zr,dt`
      :host {
        display: block;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .section h3 {
        margin-top: 0;
      }
      .condition-summary {
        font-size: 0.85rem;
        color: var(--budgee-text-muted);
      }
      .samples {
        font-size: 0.8rem;
        color: var(--budgee-text-muted);
        font-style: italic;
        white-space: pre-wrap;
      }
    `];Yv([H({attribute:!1})],Ou.prototype,"overlaps",2);Yv([H({attribute:!1})],Ou.prototype,"merchants",2);Ou=Yv([Et("rule-overlap")],Ou);var p9=Object.defineProperty,m9=Object.getOwnPropertyDescriptor,OM=e=>{throw TypeError(e)},we=(e,t,n,i)=>{for(var r=i>1?void 0:i?m9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&p9(t,n,r),r},qv=(e,t,n)=>t.has(e)||OM("Cannot "+n),g9=(e,t,n)=>(qv(e,t,"read from private field"),n?n.call(e):t.get(e)),Qw=(e,t,n)=>t.has(e)?OM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Zw=(e,t,n,i)=>(qv(e,t,"write to private field"),t.set(e,n),n),bt=(e,t,n)=>(qv(e,t,"access private method"),n),El,mt,vc,PM,RM,AM,LM,wf,xf,NM,FM,zM,jM,ud,hd,BM,WM,HM,UM,Vv,YM,qM,VM,KM,GM;let he=class extends bp(gt){constructor(){super(...arguments),Qw(this,mt),this._rules=[],this._tags=[],this._merchants=[],this._unmerchanted=[],this._accounts=[],this._prefillDescription="",this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._rulesPage=1,this._rulesPageSize=10,this._rulesFilter="",this._rulesSortCol="conditions",this._rulesSortDir="asc",this._unmerchantedPage=1,this._unmerchantedPageSize=20,this._unmerchantedFilter="",this._unmatchedRuleIds=new Set,this._overlapData=[],Qw(this,El,[])}connectedCallback(){super.connectedCallback(),bt(this,mt,vc).call(this);const e=ta(()=>bt(this,mt,vc).call(this),300);Promise.all([bn.subscribe(e),pe.subscribe(e),Oe.subscribe(e),_e.subscribe(e)]).then(t=>{Zw(this,El,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of g9(this,El))e.unsubscribe();Zw(this,El,[])}render(){const e=new Map(this._merchants.map(t=>[t.id,t.name]));return E`
      <div class="sections-grid">
        ${bt(this,mt,KM).call(this)}
        ${bt(this,mt,VM).call(this)}
        <rule-overlap .overlaps=${this._overlapData} .merchants=${e}></rule-overlap>
        ${bt(this,mt,qM).call(this)}
      </div>

      ${bt(this,mt,GM).call(this)}
    `}};El=new WeakMap;mt=new WeakSet;vc=async function(){this._rules=await bn.all(),this._tags=await pe.all(),this._merchants=await Oe.all(),this._accounts=await ke.all();const e=ke.toLookup(this._accounts),t=await _e.all();this._unmerchanted=t.filter(o=>o.merchantId===void 0);const n=this._rules,i=new Set,r=new Map,s=t.map(o=>vp(o,e));for(let o=0;o<t.length;o++){const a=t[o],c=s[o],l=[];for(const u of n)u.matches(c)&&(i.add(u.id),l.push(u));if(l.length>=2)for(let u=0;u<l.length;u++)for(let h=u+1;h<l.length;h++){const d=[l[u].id,l[h].id].sort().join("-"),f=r.get(d);f?(f.count++,f.samples.add(a.description)):r.set(d,{ruleA:l[u],ruleB:l[h],count:1,samples:new Set([a.description])})}}this._unmatchedRuleIds=new Set(n.filter(o=>!i.has(o.id)).map(o=>o.id)),this._overlapData=[...r.values()].sort((o,a)=>a.count-o.count)};PM=async function(e){await this.withBusy(async()=>{const{id:t,logic:n,conditions:i,tagIds:r,newTagNames:s,merchantName:o,apply:a}=e.detail,c=[...r];if(s?.length)for(const d of s){const p=(await pe.byName(d))?.id??(await pe.create(d)).id;c.push(p)}let l;o&&(l=(await Oe.byName(o))?.id??(await Oe.create(o)).id);const u={logic:n,conditions:i,merchantId:l,tagIds:c};let h;t?(await bn.put({...u,id:t}),h=new bn({...u,id:t})):h=await bn.create(u),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",a&&await bn.applyToTransactions(h),Ci({message:t?"Rule updated":"Rule created",type:"success"}),await bt(this,mt,vc).call(this)})};RM=async function(e){await this.withBusy(async()=>{const{existingRuleId:t,conditions:n,apply:i}=e.detail,r=this._rules.find(o=>o.id===t);if(!r)return;const s={id:r.id,logic:"or",conditions:[...r.conditions,...n],merchantId:r.merchantId,accountId:r.accountId,tagIds:r.tagIds};await bn.put(s),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",i&&await bn.applyToTransactions(s),Ci({message:"Rules merged",type:"success"}),await bt(this,mt,vc).call(this)})};AM=async function(e){await this.withBusy(async()=>{await bn.remove(e),Ci({message:"Rule deleted",type:"success"}),await bt(this,mt,vc).call(this)})};LM=async function(e){let t="";e.merchantId&&(t=(await Oe.get(e.merchantId))?.name??""),this._editingRule=e,this._editingMerchantName=t,this._showEditor=!0};wf=function(e){return this._tags.find(t=>t.id===e)?.name??`#${e}`};xf=function(e){return e?this._merchants.find(t=>t.id===e)?.name??"":""};NM=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};FM=function(e){this._rulesPage=e.detail.page,this._rulesPageSize=e.detail.pageSize};zM=function(e){this._rulesFilter=e.detail.filter,this._rulesPage=1};jM=function(e){if(!this._rulesFilter)return!0;const t=this._rulesFilter.toLowerCase();return!!(e.conditions.some(n=>n.value.toLowerCase().includes(t))||e.merchantId&&this._merchants.find(i=>i.id===e.merchantId)?.name.toLowerCase().includes(t)||e.tagIds.some(n=>bt(this,mt,wf).call(this,n).toLowerCase().includes(t)))};ud=function(e){this._rulesSortCol===e?this._rulesSortDir=this._rulesSortDir==="asc"?"desc":"asc":(this._rulesSortCol=e,this._rulesSortDir="asc"),this._rulesPage=1};hd=function(e){return this._rulesSortCol!==e?"":this._rulesSortDir==="asc"?" ▲":" ▼"};BM=function(e){const t=this._rulesSortCol,n=this._rulesSortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="conditions"){const o=i.conditions[0]?.value??"",a=r.conditions[0]?.value??"";s=o.localeCompare(a)}else if(t==="merchant")s=bt(this,mt,xf).call(this,i.merchantId).localeCompare(bt(this,mt,xf).call(this,r.merchantId));else if(t==="tags"){const o=i.tagIds.map(c=>bt(this,mt,wf).call(this,c)).join(","),a=r.tagIds.map(c=>bt(this,mt,wf).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};WM=function(e){this._unmerchantedPage=e.detail.page,this._unmerchantedPageSize=e.detail.pageSize};HM=function(e){this._unmerchantedFilter=e.detail.filter,this._unmerchantedPage=1};UM=function(e){this._prefillDescription=e.description,this._showEditor=!0};Vv=function(e){return E`
      <tr>
        <td class="condition-summary">
          ${bt(this,mt,NM).call(this,e)}
          ${this._unmatchedRuleIds.has(e.id)?E`<span class="unmatched-warning" title="This rule matches no transactions">${ye(B7)} No matches</span>`:tt}
        </td>
        <td>${bt(this,mt,xf).call(this,e.merchantId)}</td>
        <td>
          ${e.tagIds.length>0?E`<tag-pills .tags=${this._tags} .tagIds=${e.tagIds}></tag-pills>`:"None"}
        </td>
        <td class="actions">
          <button class="icon-btn" title="Edit rule" aria-label="Edit rule" @click=${()=>bt(this,mt,LM).call(this,e)}>${ye(hp)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete rule" aria-label="Delete rule" @click=${()=>bt(this,mt,AM).call(this,e.id)}>${ye(Tc)}</button>
        </td>
      </tr>
    `};YM=function(e){return E`
      <table>
        <thead>
          <tr>
            <th>Conditions</th>
            <th>Merchant</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${e.map(t=>bt(this,mt,Vv).call(this,t))}
        </tbody>
      </table>
    `};qM=function(){if(this._rules.length===0)return E`
        <budgee-empty-state
          heading="No rules yet"
          description="Create a rule to automatically assign merchants and tags to transactions."
        >
          <button @click=${()=>{this._showEditor=!0}}>Create Rule</button>
        </budgee-empty-state>
      `;const e=this._rules.filter(r=>bt(this,mt,jM).call(this,r)),t=bt(this,mt,BM).call(this,e),n=(this._rulesPage-1)*this._rulesPageSize,i=t.slice(n,n+this._rulesPageSize);return E`
      <div class="section">
        <h3>Existing Rules</h3>
        <paginated-table
          .totalItems=${e.length}
          .defaultPageSize=${10}
          storageKey="rules"
          ?filterable=${!0}
          @page-change=${bt(this,mt,FM)}
          @filter-change=${bt(this,mt,zM)}
        >
          <table>
            <thead>
              <tr>
                <th class="sortable" @click=${()=>bt(this,mt,ud).call(this,"conditions")}>
                  Conditions${bt(this,mt,hd).call(this,"conditions")}
                </th>
                <th class="sortable" @click=${()=>bt(this,mt,ud).call(this,"merchant")}>
                  Merchant${bt(this,mt,hd).call(this,"merchant")}
                </th>
                <th class="sortable" @click=${()=>bt(this,mt,ud).call(this,"tags")}>
                  Tags${bt(this,mt,hd).call(this,"tags")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${i.map(r=>bt(this,mt,Vv).call(this,r))}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};VM=function(){const e=this._rules.filter(n=>this._unmatchedRuleIds.has(n.id));if(e.length===0)return tt;const t=e.length;return E`
      <div class="section">
        <h3>Unmatched Rules</h3>
        <p>${t} rule${t===1?"":"s"} matching no transactions.</p>
        ${bt(this,mt,YM).call(this,e)}
      </div>
    `};KM=function(){if(this._unmerchanted.length===0)return tt;const e=this._unmerchantedFilter.toLowerCase(),t=e?this._unmerchanted.filter(r=>r.description.toLowerCase().includes(e)):this._unmerchanted,n=(this._unmerchantedPage-1)*this._unmerchantedPageSize,i=t.slice(n,n+this._unmerchantedPageSize);return E`
      <div class="section">
        <h3>Unmerchanted Transactions</h3>
        <paginated-table
          .totalItems=${t.length}
          .defaultPageSize=${20}
          storageKey="unmerchanted"
          ?filterable=${!0}
          @page-change=${bt(this,mt,WM)}
          @filter-change=${bt(this,mt,HM)}
        >
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${i.map(r=>E`
                  <tr class="clickable-row" @click=${()=>bt(this,mt,UM).call(this,r)}>
                    <td>${r.date}</td>
                    <td>${r.description}</td>
                    <td class=${r.amount<0?"amount-negative":"amount-positive"}>${r.amount.toFixed(2)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};GM=function(){if(!this._showEditor)return tt;const e=this._editingRule?"Edit Rule":"Create Rule";return E`
      <budgee-modal
        heading=${e}
        @modal-close=${()=>{this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription=""}}
      >
        <rule-editor
          .tags=${this._tags}
          .merchants=${this._merchants}
          .rules=${this._rules}
          .prefillDescription=${this._prefillDescription}
          .accounts=${this._accounts}
          .editingRule=${this._editingRule}
          .editingMerchantName=${this._editingMerchantName}
          @rule-saved=${bt(this,mt,PM)}
          @rule-merge=${bt(this,mt,RM)}
        ></rule-editor>
      </budgee-modal>
    `};he.styles=[Li,yp,Zr,Ic,dt`
      :host {
        display: block;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .section h3 {
        margin-top: 0;
      }
      .condition-summary {
        font-size: 0.85rem;
        color: var(--budgee-text-muted);
      }
      .actions {
        white-space: nowrap;
      }
      .unmatched-warning {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--budgee-warning, #b5850a);
        font-size: 0.8rem;
      }
      .unmatched-warning svg {
        width: 14px;
        height: 14px;
      }
      .sections-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 1600px) {
        .section {
          margin-bottom: 0;
        }
        .sections-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `];we([P()],he.prototype,"_rules",2);we([P()],he.prototype,"_tags",2);we([P()],he.prototype,"_merchants",2);we([P()],he.prototype,"_unmerchanted",2);we([P()],he.prototype,"_accounts",2);we([P()],he.prototype,"_prefillDescription",2);we([P()],he.prototype,"_showEditor",2);we([P()],he.prototype,"_editingRule",2);we([P()],he.prototype,"_editingMerchantName",2);we([P()],he.prototype,"_rulesPage",2);we([P()],he.prototype,"_rulesPageSize",2);we([P()],he.prototype,"_rulesFilter",2);we([P()],he.prototype,"_rulesSortCol",2);we([P()],he.prototype,"_rulesSortDir",2);we([P()],he.prototype,"_unmerchantedPage",2);we([P()],he.prototype,"_unmerchantedPageSize",2);we([P()],he.prototype,"_unmerchantedFilter",2);we([P()],he.prototype,"_unmatchedRuleIds",2);we([P()],he.prototype,"_overlapData",2);he=we([Et("rule-manager")],he);async function v9(){const e=await Z(),t={version:Yi,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=`budgee-export-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(i);const{showToast:s}=await wo(async()=>{const{showToast:o}=await Promise.resolve().then(()=>U7);return{showToast:o}},void 0);s({message:"Database exported",type:"success"})}var y9=Object.defineProperty,b9=Object.getOwnPropertyDescriptor,XM=e=>{throw TypeError(e)},Ac=(e,t,n,i)=>{for(var r=i>1?void 0:i?b9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&y9(t,n,r),r},QM=(e,t,n)=>t.has(e)||XM("Cannot "+n),_9=(e,t,n)=>(QM(e,t,"read from private field"),n?n.call(e):t.get(e)),w9=(e,t,n)=>t.has(e)?XM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),tl=(e,t,n)=>(QM(e,t,"access private method"),n),ss,ZM,JM,tD,eD,nD,iD;let Ws=class extends gt{constructor(){super(...arguments),w9(this,ss),this._url="",this._testResult=null,this._testError="",this._testedUrl="",this._theme="system"}connectedCallback(){super.connectedCallback(),this._url=localStorage.getItem("budgee-sync-url")??"";const e=localStorage.getItem("budgee-theme");this._theme=e==="light"||e==="dark"?e:"system"}render(){return E`
      <section>
        <h2>Appearance</h2>
        <div class="field">
          <label for="theme-select">Theme</label>
          <select id="theme-select" @change=${tl(this,ss,ZM)}>
            <option value="system" ?selected=${this._theme==="system"}>System</option>
            <option value="light" ?selected=${this._theme==="light"}>Light</option>
            <option value="dark" ?selected=${this._theme==="dark"}>Dark</option>
          </select>
        </div>
      </section>

      <section>
        <h2>Import / Export</h2>
        <h3>Import Database</h3>
        <p>Restore from a full JSON backup. This will replace all existing data.</p>
        <input type="file" accept=".json" @change=${tl(this,ss,iD)} />

        <h3>Export Database</h3>
        <p>Download a full backup of your data as JSON.</p>
        <button @click=${v9}>Export</button>
      </section>

      ${fo?E`
              <section>
                <h2>Sync</h2>
                <p class="hint">Sync is disabled in demo mode.</p>
              </section>
            `:E`<section>
        <h2>Sync</h2>
        <p class="hint">Sync your data across devices using a sync server. Save a valid URL to enable sync; clear it to disable.</p>
        <div class="field">
          <label for="sync-url">Server URL</label>
          <input type="url" id="sync-url" .value=${this._url} @change=${tl(this,ss,JM)}
            placeholder="http://your-server:3001" />
          <p class="hint">The URL of your sync server.</p>
        </div>
        ${this._url?E`
              <div class="field">
                <button ?disabled=${this._testResult==="testing"} @click=${tl(this,ss,tD)}>
                  ${this._testResult==="testing"?"Testing...":"Test Connection"}
                </button>
                ${this._testResult==="success"?E`
                        <p class="test-result success">Connection successful.</p>
                      `:this._testResult==="error"?E`<p class="test-result error">Connection failed: ${this._testError}</p>`:tt}
              </div>
            `:tt}
        <div class="field">
          <button ?disabled=${!_9(this,ss,eD)} @click=${tl(this,ss,nD)}>Save</button>
        </div>
      </section>`}
    `}};ss=new WeakSet;ZM=function(e){const t=e.target.value;this._theme=t,t==="system"?(localStorage.removeItem("budgee-theme"),delete document.documentElement.dataset.theme):(localStorage.setItem("budgee-theme",t),document.documentElement.dataset.theme=t)};JM=function(e){this._url=e.target.value,this._testResult=null,this._testError="",this._testedUrl=""};tD=async function(){this._testResult="testing",this._testError="";try{await S4(this._url),this._testResult="success",this._testedUrl=this._url,Ci({message:"Connection successful",type:"success"})}catch(e){this._testResult="error",this._testError=e instanceof Error?e.message:String(e),Ci({message:"Connection failed",type:"error"}),this._testedUrl=""}};eD=function(){const e=localStorage.getItem("budgee-sync-url")??"";return this._url===e?!1:this._url?this._testResult==="success"&&this._testedUrl===this._url:!0};nD=function(){localStorage.setItem("budgee-sync-url",this._url),localStorage.removeItem("budgee-ice-server"),localStorage.removeItem("budgee-turn-server"),this.dispatchEvent(new CustomEvent("budgee-sync-settings-changed",{bubbles:!0,composed:!0})),Ci({message:"Sync settings saved",type:"success"}),this.requestUpdate()};iD=async function(e){const t=e.target;if(!t.files?.length)return;if(!await _i.show({heading:"Import Database",message:"This will replace all existing data. Are you sure?",confirmLabel:"Import",danger:!0})){t.value="";return}j0("Importing database...");try{await s2(t.files[0]),t.value="",window.location.reload()}finally{B0()}};Ws.styles=[Li,dt`
      :host {
        display: block;
      }

      section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }

      h2 {
        margin-top: 0;
      }

      .field {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      select {
        padding: 0.4rem 0.6rem;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        color: var(--budgee-text);
        font-size: 0.9rem;
      }

      input[type="url"] {
        width: 100%;
        max-width: 400px;
        padding: 0.4rem 0.6rem;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        color: var(--budgee-text);
        font-size: 0.9rem;
      }

      .hint {
        font-size: 0.8rem;
        color: var(--budgee-text-muted);
        margin-top: 0.25rem;
      }

      button {
        padding: 0.5rem 1rem;
      }

      .test-result {
        font-size: 0.85rem;
        margin-top: 0.25rem;
      }

      .test-result.success {
        color: var(--budgee-positive, green);
      }

      .test-result.error {
        color: var(--budgee-negative, red);
      }
    `];Ac([P()],Ws.prototype,"_url",2);Ac([P()],Ws.prototype,"_testResult",2);Ac([P()],Ws.prototype,"_testError",2);Ac([P()],Ws.prototype,"_testedUrl",2);Ac([P()],Ws.prototype,"_theme",2);Ws=Ac([Et("budgee-settings")],Ws);var x9=Object.defineProperty,C9=Object.getOwnPropertyDescriptor,rD=e=>{throw TypeError(e)},sD=(e,t,n,i)=>{for(var r=i>1?void 0:i?C9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&x9(t,n,r),r},oD=(e,t,n)=>t.has(e)||rD("Cannot "+n),k9=(e,t,n)=>(oD(e,t,"read from private field"),t.get(e)),S9=(e,t,n)=>t.has(e)?rD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),E9=(e,t,n,i)=>(oD(e,t,"write to private field"),t.set(e,n),n),dd;const M9='<svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362l-.08-9.127c-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126l-.08 13.526c0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>',D9="https://github.com/thegedge/budgee";function $9(e){const t=Math.floor((Date.now()-new Date(e).getTime())/1e3),n=[[31536e3,"year"],[2592e3,"month"],[86400,"day"],[3600,"hour"],[60,"minute"]];for(const[i,r]of n){const s=Math.floor(t/i);if(s>=1)return`${s} ${r}${s>1?"s":""} ago`}return"just now"}const T9={"not-configured":"not configured",connecting:"connecting",syncing:"syncing",synced:"synced",error:"error"};let Cf=class extends gt{constructor(){super(...arguments),this._status="not-configured",S9(this,dd)}connectedCallback(){super.connectedCallback(),E9(this,dd,M4.subscribe(e=>{this._status=e}))}disconnectedCallback(){super.disconnectedCallback(),k9(this,dd)?.unsubscribe()}render(){return E`
      <a href="${D9}/commit/${"638e097"}" target="_blank" rel="noopener">${yy(M9)} <span>${"638e097"}</span></a>
      ${yy(KS)} <span class="published">published ${$9("2026-03-06T13:15:31-05:00")}</span>
      ${this._status!=="not-configured"?E`<span class="dot ${this._status}"></span> ${T9[this._status]}`:""}
    `}};dd=new WeakMap;Cf.styles=dt`
    :host {
      display: grid;
      grid-template-columns: 0.85rem 1fr;
      align-items: center;
      gap: 0.25rem 0.35rem;
      font-size: 0.75rem;
      color: var(--budgee-text-muted);
      padding: 0.5rem 1rem;
    }

    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      justify-self: center;
    }

    .dot.not-configured {
      background: var(--budgee-text-muted, gray);
    }

    .dot.connecting {
      background: var(--budgee-warning, orange);
      animation: pulse 1s infinite;
    }

    .dot.syncing {
      background: var(--budgee-warning, orange);
      animation: pulse 1s infinite;
    }

    .dot.synced {
      background: var(--budgee-positive, green);
    }

    .dot.error {
      background: var(--budgee-negative, red);
    }

    a {
      display: contents;
      color: inherit;
      text-decoration: none;
    }

    a:hover {
      color: var(--budgee-text);
    }

    svg {
      width: 0.85rem;
      height: 0.85rem;
    }

    .published {
      font-style: italic;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
  `;sD([P()],Cf.prototype,"_status",2);Cf=sD([Et("sync-status-indicator")],Cf);function I9(e){if(e.startsWith("#"))return e;const{r:t,g:n,b:i}=qS(e),r=s=>s.toString(16).padStart(2,"0");return`#${r(t)}${r(n)}${r(i)}`}var O9=Object.defineProperty,P9=Object.getOwnPropertyDescriptor,aD=e=>{throw TypeError(e)},Xs=(e,t,n,i)=>{for(var r=i>1?void 0:i?P9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&O9(t,n,r),r},Kv=(e,t,n)=>t.has(e)||aD("Cannot "+n),R9=(e,t,n)=>(Kv(e,t,"read from private field"),n?n.call(e):t.get(e)),Jw=(e,t,n)=>t.has(e)?aD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),t1=(e,t,n,i)=>(Kv(e,t,"write to private field"),t.set(e,n),n),De=(e,t,n)=>(Kv(e,t,"access private method"),n),Ml,ge,Go,Gv,cD,lD,uD,hD,dD,fD,pD,mD,gD,vD;let hr=class extends bp(gt){constructor(){super(...arguments),Jw(this,ge),this._tags=[],this._newTagName="",this._error="",this._filter="",this._currentPage=1,this._pageSize=25,this._sortDir="asc",Jw(this,Ml,[])}connectedCallback(){super.connectedCallback(),De(this,ge,Go).call(this);const e=ta(()=>De(this,ge,Go).call(this),300);pe.subscribe(e).then(t=>{t1(this,Ml,[t])})}disconnectedCallback(){super.disconnectedCallback();for(const e of R9(this,Ml))e.unsubscribe();t1(this,Ml,[])}render(){return E`
      <div class="tag-form">
        <input
          type="text"
          placeholder="New tag name"
          .value=${this._newTagName}
          @input=${De(this,ge,dD)}
          @keydown=${De(this,ge,fD)}
        />
        <button @click=${De(this,ge,Gv)}>Add</button>
      </div>
      ${this._error?E`<p class="error">${this._error}</p>`:""}
      ${this._tags.length===0?E`
              <budgee-empty-state
                heading="No tags yet"
                description="Create a tag above to get started."
              ></budgee-empty-state>
            `:""}
      ${(()=>{if(this._tags.length===0)return"";const e=this._filter.toLowerCase(),t=e?this._tags.filter(o=>o.name.toLowerCase().includes(e)):this._tags,n=De(this,ge,vD).call(this,t),i=(this._currentPage-1)*this._pageSize,r=n.slice(i,i+this._pageSize),s=this._sortDir==="asc"?" ▲":" ▼";return E`
          <paginated-table
            .totalItems=${t.length}
            .defaultPageSize=${25}
            storageKey="tags"
            ?filterable=${!0}
            @page-change=${De(this,ge,pD)}
            @filter-change=${De(this,ge,mD)}
          >
            <table>
              <thead>
                <tr>
                  <th class="col-icon">Icon</th>
                  <th class="col-color">Color</th>
                  <th class="sortable" @click=${De(this,ge,gD)}>Name${s}</th>
                  <th class="col-remove"></th>
                </tr>
              </thead>
              <tbody>
                ${r.map(o=>E`
                  <tr>
                    <td class="col-icon">
                      <icon-picker
                        .value=${o.icon??""}
                        @icon-selected=${a=>De(this,ge,lD).call(this,o,a.detail.icon)}
                      ></icon-picker>
                    </td>
                    <td class="col-color">
                      <input
                        type="color"
                        class="color-swatch"
                        .value=${De(this,ge,uD).call(this,o.color)}
                        @change=${a=>De(this,ge,hD).call(this,o,a.target.value)}
                      />
                    </td>
                    <td>
                      ${o.name}
                    </td>
                    <td class="col-remove">
                      <button class="icon-btn icon-btn--danger" title="Remove tag" aria-label="Remove tag" @click=${()=>De(this,ge,cD).call(this,o.id)}>
                        ${ye(Tc)}
                      </button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </paginated-table>
        `})()}
    `}};Ml=new WeakMap;ge=new WeakSet;Go=async function(){this._tags=await pe.all()};Gv=async function(){const e=this._newTagName.trim();if(!e)return;if(this._error="",await pe.byName(e)){this._error=`Tag "${e}" already exists.`;return}await this.withBusy(async()=>{await pe.create(e),this._newTagName="",Ci({message:"Tag created",type:"success"}),await De(this,ge,Go).call(this)})};cD=async function(e){await this.withBusy(async()=>{await pe.remove(e),Ci({message:"Tag deleted",type:"success"}),await De(this,ge,Go).call(this)})};lD=async function(e,t){await this.withBusy(async()=>{await pe.update(e.id,{icon:t||void 0}),await De(this,ge,Go).call(this)})};uD=function(e){return e?I9(e):"#7eb8da"};hD=async function(e,t){await this.withBusy(async()=>{await pe.update(e.id,{color:t}),await De(this,ge,Go).call(this)})};dD=function(e){this._newTagName=e.target.value};fD=function(e){e.key==="Enter"&&De(this,ge,Gv).call(this)};pD=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};mD=function(e){this._filter=e.detail.filter,this._currentPage=1};gD=function(){this._sortDir=this._sortDir==="asc"?"desc":"asc",this._currentPage=1};vD=function(e){const t=this._sortDir==="asc"?1:-1;return[...e].sort((n,i)=>n.name.localeCompare(i.name)*t)};hr.styles=[Li,yp,Zr,Ic,fr,dt`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .tag-form {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        align-items: center;
      }
      input {
        padding: 4px 8px;
        flex: 1;
      }
      .error {
        color: var(--budgee-danger-hover);
        font-size: 0.85rem;
      }
      .col-icon,
      .col-color,
      .col-remove {
        width: 1%;
        white-space: nowrap;
      }
      .color-swatch {
        width: 2rem;
        height: 1.5rem;
        border: none;
        padding: 0;
        cursor: pointer;
        border-radius: 4px;
      }
    `];Xs([P()],hr.prototype,"_tags",2);Xs([P()],hr.prototype,"_newTagName",2);Xs([P()],hr.prototype,"_error",2);Xs([P()],hr.prototype,"_filter",2);Xs([P()],hr.prototype,"_currentPage",2);Xs([P()],hr.prototype,"_pageSize",2);Xs([P()],hr.prototype,"_sortDir",2);hr=Xs([Et("tag-manager")],hr);function A9(e,t){if(!t)return e;const n=e.toLowerCase(),i=t.toLowerCase(),r=n.indexOf(i);if(r===-1)return e;const s=e.slice(0,r),o=e.slice(r,r+t.length),a=e.slice(r+t.length);return E`${s}<mark>${o}</mark>${a}`}function L9(e,t,n={}){const i=vp(e,n);for(const r of t){if(!r.matches(i))continue;const s=[...new Set([...e.tagIds,...r.tagIds])],o=r.merchantId??e.merchantId;return{...e,tagIds:s,merchantId:o}}return e}async function N9(e,t,n){const i=await bn.all(),r=ke.toLookup(await ke.all()),s=t.account?await F9(e,t.account):void 0,o=e.map(a=>z9(a,t,s?.get(a[t.account])??n.accountId)).filter(a=>a!==void 0).map(a=>L9(a,i,r));return n.importMode==="replace"&&await _e.deleteAll(),await _e.bulkAdd(o),o.length}async function F9(e,t){const n=[...new Set(e.map(o=>o[t]).filter(Boolean))],i=await ke.all(),r=new Map;for(const o of i)r.set(o.name.toLowerCase(),o.id);const s=new Map;for(const o of n){const a=r.get(o.toLowerCase());if(a)s.set(o,a);else{const c=await ke.create({name:o});s.set(o,c.id),r.set(o.toLowerCase(),c.id)}}return s}function z9(e,t,n){const i=t.date?e[t.date]:void 0,r=t.amount?e[t.amount]:void 0,s=t.credit?e[t.credit]:void 0,o=t.description?e[t.description]:void 0;if(!i||!o)return;const a=r?Number.parseFloat(r):NaN,c=s?Number.parseFloat(s):NaN;if(Number.isNaN(a)&&Number.isNaN(c))return;const l=(Number.isNaN(a)?0:-a)+(Number.isNaN(c)?0:c);return{date:i,amount:l,description:o,tagIds:[],accountId:n}}var CB=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function j9(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var fd={exports:{}};var B9=fd.exports,e1;function W9(){return e1||(e1=1,(function(e,t){((n,i)=>{e.exports=i()})(B9,function n(){var i=typeof self<"u"?self:typeof window<"u"?window:i!==void 0?i:{},r,s=!i.document&&!!i.postMessage,o=i.IS_PAPA_WORKER||!1,a={},c=0,l={};function u(w){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(x){var M=k(x);M.chunkSize=parseInt(M.chunkSize),x.step||x.chunk||(M.chunkSize=null),this._handle=new m(M),(this._handle.streamer=this)._config=M}).call(this,w),this.parseChunk=function(x,M){var I=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<I){let R=this._config.newline;R||(T=this._config.quoteChar||'"',R=this._handle.guessLineEndings(x,T)),x=[...x.split(R).slice(I)].join(R)}this.isFirstChunk&&D(this._config.beforeFirstChunk)&&(T=this._config.beforeFirstChunk(x))!==void 0&&(x=T),this.isFirstChunk=!1,this._halted=!1;var I=this._partialLine+x,T=(this._partialLine="",this._handle.parse(I,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(x=T.meta.cursor,I=(this._finished||(this._partialLine=I.substring(x-this._baseIndex),this._baseIndex=x),T&&T.data&&(this._rowCount+=T.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),o)i.postMessage({results:T,workerId:l.WORKER_ID,finished:I});else if(D(this._config.chunk)&&!M){if(this._config.chunk(T,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=T=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(T.data),this._completeResults.errors=this._completeResults.errors.concat(T.errors),this._completeResults.meta=T.meta),this._completed||!I||!D(this._config.complete)||T&&T.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),I||T&&T.meta.paused||this._nextChunk(),T}this._halted=!0},this._sendError=function(x){D(this._config.error)?this._config.error(x):o&&this._config.error&&i.postMessage({workerId:l.WORKER_ID,error:x,finished:!1})}}function h(w){var x;(w=w||{}).chunkSize||(w.chunkSize=l.RemoteChunkSize),u.call(this,w),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(M){this._input=M,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(x=new XMLHttpRequest,this._config.withCredentials&&(x.withCredentials=this._config.withCredentials),s||(x.onload=$(this._chunkLoaded,this),x.onerror=$(this._chunkError,this)),x.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var M,I=this._config.downloadRequestHeaders;for(M in I)x.setRequestHeader(M,I[M])}var T;this._config.chunkSize&&(T=this._start+this._config.chunkSize-1,x.setRequestHeader("Range","bytes="+this._start+"-"+T));try{x.send(this._config.downloadRequestBody)}catch(R){this._chunkError(R.message)}s&&x.status===0&&this._chunkError()}},this._chunkLoaded=function(){x.readyState===4&&(x.status<200||400<=x.status?this._chunkError():(this._start+=this._config.chunkSize||x.responseText.length,this._finished=!this._config.chunkSize||this._start>=(M=>(M=M.getResponseHeader("Content-Range"))!==null?parseInt(M.substring(M.lastIndexOf("/")+1)):-1)(x),this.parseChunk(x.responseText)))},this._chunkError=function(M){M=x.statusText||M,this._sendError(new Error(M))}}function d(w){(w=w||{}).chunkSize||(w.chunkSize=l.LocalChunkSize),u.call(this,w);var x,M,I=typeof FileReader<"u";this.stream=function(T){this._input=T,M=T.slice||T.webkitSlice||T.mozSlice,I?((x=new FileReader).onload=$(this._chunkLoaded,this),x.onerror=$(this._chunkError,this)):x=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var T=this._input,R=(this._config.chunkSize&&(R=Math.min(this._start+this._config.chunkSize,this._input.size),T=M.call(T,this._start,R)),x.readAsText(T,this._config.encoding));I||this._chunkLoaded({target:{result:R}})},this._chunkLoaded=function(T){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(T.target.result)},this._chunkError=function(){this._sendError(x.error)}}function f(w){var x;u.call(this,w=w||{}),this.stream=function(M){return x=M,this._nextChunk()},this._nextChunk=function(){var M,I;if(!this._finished)return M=this._config.chunkSize,x=M?(I=x.substring(0,M),x.substring(M)):(I=x,""),this._finished=!x,this.parseChunk(I)}}function p(w){u.call(this,w=w||{});var x=[],M=!0,I=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(T){this._input=T,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){I&&x.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),x.length?this.parseChunk(x.shift()):M=!0},this._streamData=$(function(T){try{x.push(typeof T=="string"?T:T.toString(this._config.encoding)),M&&(M=!1,this._checkIsFinished(),this.parseChunk(x.shift()))}catch(R){this._streamError(R)}},this),this._streamError=$(function(T){this._streamCleanUp(),this._sendError(T)},this),this._streamEnd=$(function(){this._streamCleanUp(),I=!0,this._streamData("")},this),this._streamCleanUp=$(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function m(w){var x,M,I,T,R=Math.pow(2,53),j=-R,z=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,Y=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,F=this,G=0,B=0,q=!1,W=!1,V=[],L={data:[],errors:[],meta:{}};function ot(wt){return w.skipEmptyLines==="greedy"?wt.join("").trim()==="":wt.length===1&&wt[0].length===0}function kt(){if(L&&I&&(si("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),I=!1),w.skipEmptyLines&&(L.data=L.data.filter(function(at){return!ot(at)})),Lt()){let at=function(oe,xe){D(w.transformHeader)&&(oe=w.transformHeader(oe,xe)),V.push(oe)};if(L)if(Array.isArray(L.data[0])){for(var wt=0;Lt()&&wt<L.data.length;wt++)L.data[wt].forEach(at);L.data.splice(0,1)}else L.data.forEach(at)}function $t(at,oe){for(var xe=w.header?{}:[],Nt=0;Nt<at.length;Nt++){var zt=Nt,xt=at[Nt],xt=((ki,ut)=>(Jt=>(w.dynamicTypingFunction&&w.dynamicTyping[Jt]===void 0&&(w.dynamicTyping[Jt]=w.dynamicTypingFunction(Jt)),(w.dynamicTyping[Jt]||w.dynamicTyping)===!0))(ki)?ut==="true"||ut==="TRUE"||ut!=="false"&&ut!=="FALSE"&&((Jt=>{if(z.test(Jt)&&(Jt=parseFloat(Jt),j<Jt&&Jt<R))return 1})(ut)?parseFloat(ut):Y.test(ut)?new Date(ut):ut===""?null:ut):ut)(zt=w.header?Nt>=V.length?"__parsed_extra":V[Nt]:zt,xt=w.transform?w.transform(xt,zt):xt);zt==="__parsed_extra"?(xe[zt]=xe[zt]||[],xe[zt].push(xt)):xe[zt]=xt}return w.header&&(Nt>V.length?si("FieldMismatch","TooManyFields","Too many fields: expected "+V.length+" fields but parsed "+Nt,B+oe):Nt<V.length&&si("FieldMismatch","TooFewFields","Too few fields: expected "+V.length+" fields but parsed "+Nt,B+oe)),xe}var se;L&&(w.header||w.dynamicTyping||w.transform)&&(se=1,!L.data.length||Array.isArray(L.data[0])?(L.data=L.data.map($t),se=L.data.length):L.data=$t(L.data,0),w.header&&L.meta&&(L.meta.fields=V),B+=se)}function Lt(){return w.header&&V.length===0}function si(wt,$t,se,at){wt={type:wt,code:$t,message:se},at!==void 0&&(wt.row=at),L.errors.push(wt)}D(w.step)&&(T=w.step,w.step=function(wt){L=wt,Lt()?kt():(kt(),L.data.length!==0&&(G+=wt.data.length,w.preview&&G>w.preview?M.abort():(L.data=L.data[0],T(L,F))))}),this.parse=function(wt,$t,se){var at=w.quoteChar||'"',at=(w.newline||(w.newline=this.guessLineEndings(wt,at)),I=!1,w.delimiter?D(w.delimiter)&&(w.delimiter=w.delimiter(wt),L.meta.delimiter=w.delimiter):((at=((oe,xe,Nt,zt,xt)=>{var ki,ut,Jt,is;xt=xt||[",","	","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var ua=0;ua<xt.length;ua++){for(var Ni,Lc=xt[ua],He=0,Fi=0,Ee=0,En=(Jt=void 0,new b({comments:zt,delimiter:Lc,newline:xe,preview:10}).parse(oe)),mr=0;mr<En.data.length;mr++)Nt&&ot(En.data[mr])?Ee++:(Ni=En.data[mr].length,Fi+=Ni,Jt===void 0?Jt=Ni:0<Ni&&(He+=Math.abs(Ni-Jt),Jt=Ni));0<En.data.length&&(Fi/=En.data.length-Ee),(ut===void 0||He<=ut)&&(is===void 0||is<Fi)&&1.99<Fi&&(ut=He,ki=Lc,is=Fi)}return{successful:!!(w.delimiter=ki),bestDelimiter:ki}})(wt,w.newline,w.skipEmptyLines,w.comments,w.delimitersToGuess)).successful?w.delimiter=at.bestDelimiter:(I=!0,w.delimiter=l.DefaultDelimiter),L.meta.delimiter=w.delimiter),k(w));return w.preview&&w.header&&at.preview++,x=wt,M=new b(at),L=M.parse(x,$t,se),kt(),q?{meta:{paused:!0}}:L||{meta:{paused:!1}}},this.paused=function(){return q},this.pause=function(){q=!0,M.abort(),x=D(w.chunk)?"":x.substring(M.getCharIndex())},this.resume=function(){F.streamer._halted?(q=!1,F.streamer.parseChunk(x,!0)):setTimeout(F.resume,3)},this.aborted=function(){return W},this.abort=function(){W=!0,M.abort(),L.meta.aborted=!0,D(w.complete)&&w.complete(L),x=""},this.guessLineEndings=function(oe,at){oe=oe.substring(0,1048576);var at=new RegExp(g(at)+"([^]*?)"+g(at),"gm"),se=(oe=oe.replace(at,"")).split("\r"),at=oe.split(`
`),oe=1<at.length&&at[0].length<se[0].length;if(se.length===1||oe)return`
`;for(var xe=0,Nt=0;Nt<se.length;Nt++)se[Nt][0]===`
`&&xe++;return xe>=se.length/2?`\r
`:"\r"}}function g(w){return w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function b(w){var x=(w=w||{}).delimiter,M=w.newline,I=w.comments,T=w.step,R=w.preview,j=w.fastMode,z=null,Y=!1,F=w.quoteChar==null?'"':w.quoteChar,G=F;if(w.escapeChar!==void 0&&(G=w.escapeChar),(typeof x!="string"||-1<l.BAD_DELIMITERS.indexOf(x))&&(x=","),I===x)throw new Error("Comment character same as delimiter");I===!0?I="#":(typeof I!="string"||-1<l.BAD_DELIMITERS.indexOf(I))&&(I=!1),M!==`
`&&M!=="\r"&&M!==`\r
`&&(M=`
`);var B=0,q=!1;this.parse=function(W,V,L){if(typeof W!="string")throw new Error("Input must be a string");var ot=W.length,kt=x.length,Lt=M.length,si=I.length,wt=D(T),$t=[],se=[],at=[],oe=B=0;if(!W)return He();if(j||j!==!1&&W.indexOf(F)===-1){for(var xe=W.split(M),Nt=0;Nt<xe.length;Nt++){if(at=xe[Nt],B+=at.length,Nt!==xe.length-1)B+=M.length;else if(L)return He();if(!I||at.substring(0,si)!==I){if(wt){if($t=[],is(at.split(x)),Fi(),q)return He()}else is(at.split(x));if(R&&R<=Nt)return $t=$t.slice(0,R),He(!0)}}return He()}for(var zt=W.indexOf(x,B),xt=W.indexOf(M,B),ki=new RegExp(g(G)+g(F),"g"),ut=W.indexOf(F,B);;)if(W[B]===F)for(ut=B,B++;;){if((ut=W.indexOf(F,ut+1))===-1)return L||se.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:$t.length,index:B}),Ni();if(ut===ot-1)return Ni(W.substring(B,ut).replace(ki,F));if(F===G&&W[ut+1]===G)ut++;else if(F===G||ut===0||W[ut-1]!==G){zt!==-1&&zt<ut+1&&(zt=W.indexOf(x,ut+1));var Jt=ua((xt=xt!==-1&&xt<ut+1?W.indexOf(M,ut+1):xt)===-1?zt:Math.min(zt,xt));if(W.substr(ut+1+Jt,kt)===x){at.push(W.substring(B,ut).replace(ki,F)),W[B=ut+1+Jt+kt]!==F&&(ut=W.indexOf(F,B)),zt=W.indexOf(x,B),xt=W.indexOf(M,B);break}if(Jt=ua(xt),W.substring(ut+1+Jt,ut+1+Jt+Lt)===M){if(at.push(W.substring(B,ut).replace(ki,F)),Lc(ut+1+Jt+Lt),zt=W.indexOf(x,B),ut=W.indexOf(F,B),wt&&(Fi(),q))return He();if(R&&$t.length>=R)return He(!0);break}se.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:$t.length,index:B}),ut++}}else if(I&&at.length===0&&W.substring(B,B+si)===I){if(xt===-1)return He();B=xt+Lt,xt=W.indexOf(M,B),zt=W.indexOf(x,B)}else if(zt!==-1&&(zt<xt||xt===-1))at.push(W.substring(B,zt)),B=zt+kt,zt=W.indexOf(x,B);else{if(xt===-1)break;if(at.push(W.substring(B,xt)),Lc(xt+Lt),wt&&(Fi(),q))return He();if(R&&$t.length>=R)return He(!0)}return Ni();function is(Ee){$t.push(Ee),oe=B}function ua(Ee){var En=0;return En=Ee!==-1&&(Ee=W.substring(ut+1,Ee))&&Ee.trim()===""?Ee.length:En}function Ni(Ee){return L||(Ee===void 0&&(Ee=W.substring(B)),at.push(Ee),B=ot,is(at),wt&&Fi()),He()}function Lc(Ee){B=Ee,is(at),at=[],xt=W.indexOf(M,B)}function He(Ee){if(w.header&&!V&&$t.length&&!Y){var En=$t[0],mr=Object.create(null),kp=new Set(En);let ey=!1;for(let ha=0;ha<En.length;ha++){let zi=En[ha];if(mr[zi=D(w.transformHeader)?w.transformHeader(zi,ha):zi]){let Nc,ny=mr[zi];for(;Nc=zi+"_"+ny,ny++,kp.has(Nc););kp.add(Nc),En[ha]=Nc,mr[zi]++,ey=!0,(z=z===null?{}:z)[Nc]=zi}else mr[zi]=1,En[ha]=zi;kp.add(zi)}ey&&console.warn("Duplicate headers found and renamed."),Y=!0}return{data:$t,errors:se,meta:{delimiter:x,linebreak:M,aborted:q,truncated:!!Ee,cursor:oe+(V||0),renamedHeaders:z}}}function Fi(){T(He()),$t=[],se=[]}},this.abort=function(){q=!0},this.getCharIndex=function(){return B}}function _(w){var x=w.data,M=a[x.workerId],I=!1;if(x.error)M.userError(x.error,x.file);else if(x.results&&x.results.data){var T={abort:function(){I=!0,C(x.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:S,resume:S};if(D(M.userStep)){for(var R=0;R<x.results.data.length&&(M.userStep({data:x.results.data[R],errors:x.results.errors,meta:x.results.meta},T),!I);R++);delete x.results}else D(M.userChunk)&&(M.userChunk(x.results,T,x.file),delete x.results)}x.finished&&!I&&C(x.workerId,x.results)}function C(w,x){var M=a[w];D(M.userComplete)&&M.userComplete(x),M.terminate(),delete a[w]}function S(){throw new Error("Not implemented.")}function k(w){if(typeof w!="object"||w===null)return w;var x,M=Array.isArray(w)?[]:{};for(x in w)M[x]=k(w[x]);return M}function $(w,x){return function(){w.apply(x,arguments)}}function D(w){return typeof w=="function"}return l.parse=function(w,x){var M=(x=x||{}).dynamicTyping||!1;if(D(M)&&(x.dynamicTypingFunction=M,M={}),x.dynamicTyping=M,x.transform=!!D(x.transform)&&x.transform,!x.worker||!l.WORKERS_SUPPORTED)return M=null,l.NODE_STREAM_INPUT,typeof w=="string"?(w=(I=>I.charCodeAt(0)!==65279?I:I.slice(1))(w),M=new(x.download?h:f)(x)):w.readable===!0&&D(w.read)&&D(w.on)?M=new p(x):(i.File&&w instanceof File||w instanceof Object)&&(M=new d(x)),M.stream(w);(M=(()=>{var I;return!!l.WORKERS_SUPPORTED&&(I=(()=>{var T=i.URL||i.webkitURL||null,R=n.toString();return l.BLOB_URL||(l.BLOB_URL=T.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",R,")();"],{type:"text/javascript"})))})(),(I=new i.Worker(I)).onmessage=_,I.id=c++,a[I.id]=I)})()).userStep=x.step,M.userChunk=x.chunk,M.userComplete=x.complete,M.userError=x.error,x.step=D(x.step),x.chunk=D(x.chunk),x.complete=D(x.complete),x.error=D(x.error),delete x.worker,M.postMessage({input:w,config:x,workerId:M.id})},l.unparse=function(w,x){var M=!1,I=!0,T=",",R=`\r
`,j='"',z=j+j,Y=!1,F=null,G=!1,B=((()=>{if(typeof x=="object"){if(typeof x.delimiter!="string"||l.BAD_DELIMITERS.filter(function(V){return x.delimiter.indexOf(V)!==-1}).length||(T=x.delimiter),typeof x.quotes!="boolean"&&typeof x.quotes!="function"&&!Array.isArray(x.quotes)||(M=x.quotes),typeof x.skipEmptyLines!="boolean"&&typeof x.skipEmptyLines!="string"||(Y=x.skipEmptyLines),typeof x.newline=="string"&&(R=x.newline),typeof x.quoteChar=="string"&&(j=x.quoteChar),typeof x.header=="boolean"&&(I=x.header),Array.isArray(x.columns)){if(x.columns.length===0)throw new Error("Option columns is empty");F=x.columns}x.escapeChar!==void 0&&(z=x.escapeChar+j),x.escapeFormulae instanceof RegExp?G=x.escapeFormulae:typeof x.escapeFormulae=="boolean"&&x.escapeFormulae&&(G=/^[=+\-@\t\r].*$/)}})(),new RegExp(g(j),"g"));if(typeof w=="string"&&(w=JSON.parse(w)),Array.isArray(w)){if(!w.length||Array.isArray(w[0]))return q(null,w,Y);if(typeof w[0]=="object")return q(F||Object.keys(w[0]),w,Y)}else if(typeof w=="object")return typeof w.data=="string"&&(w.data=JSON.parse(w.data)),Array.isArray(w.data)&&(w.fields||(w.fields=w.meta&&w.meta.fields||F),w.fields||(w.fields=Array.isArray(w.data[0])?w.fields:typeof w.data[0]=="object"?Object.keys(w.data[0]):[]),Array.isArray(w.data[0])||typeof w.data[0]=="object"||(w.data=[w.data])),q(w.fields||[],w.data||[],Y);throw new Error("Unable to serialize unrecognized input");function q(V,L,ot){var kt="",Lt=(typeof V=="string"&&(V=JSON.parse(V)),typeof L=="string"&&(L=JSON.parse(L)),Array.isArray(V)&&0<V.length),si=!Array.isArray(L[0]);if(Lt&&I){for(var wt=0;wt<V.length;wt++)0<wt&&(kt+=T),kt+=W(V[wt],wt);0<L.length&&(kt+=R)}for(var $t=0;$t<L.length;$t++){var se=(Lt?V:L[$t]).length,at=!1,oe=Lt?Object.keys(L[$t]).length===0:L[$t].length===0;if(ot&&!Lt&&(at=ot==="greedy"?L[$t].join("").trim()==="":L[$t].length===1&&L[$t][0].length===0),ot==="greedy"&&Lt){for(var xe=[],Nt=0;Nt<se;Nt++){var zt=si?V[Nt]:Nt;xe.push(L[$t][zt])}at=xe.join("").trim()===""}if(!at){for(var xt=0;xt<se;xt++){0<xt&&!oe&&(kt+=T);var ki=Lt&&si?V[xt]:xt;kt+=W(L[$t][ki],xt)}$t<L.length-1&&(!ot||0<se&&!oe)&&(kt+=R)}}return kt}function W(V,L){var ot,kt;return V==null?"":V.constructor===Date?JSON.stringify(V).slice(1,25):(kt=!1,G&&typeof V=="string"&&G.test(V)&&(V="'"+V,kt=!0),ot=V.toString().replace(B,z),(kt=kt||M===!0||typeof M=="function"&&M(V,L)||Array.isArray(M)&&M[L]||((Lt,si)=>{for(var wt=0;wt<si.length;wt++)if(-1<Lt.indexOf(si[wt]))return!0;return!1})(ot,l.BAD_DELIMITERS)||-1<ot.indexOf(T)||ot.charAt(0)===" "||ot.charAt(ot.length-1)===" ")?j+ot+j:ot)}},l.RECORD_SEP="",l.UNIT_SEP="",l.BYTE_ORDER_MARK="\uFEFF",l.BAD_DELIMITERS=["\r",`
`,'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!s&&!!i.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=b,l.ParserHandle=m,l.NetworkStreamer=h,l.FileStreamer=d,l.StringStreamer=f,l.ReadableStreamStreamer=p,i.jQuery&&((r=i.jQuery).fn.parse=function(w){var x=w.config||{},M=[];return this.each(function(R){if(!(r(this).prop("tagName").toUpperCase()==="INPUT"&&r(this).attr("type").toLowerCase()==="file"&&i.FileReader)||!this.files||this.files.length===0)return!0;for(var j=0;j<this.files.length;j++)M.push({file:this.files[j],inputElem:this,instanceConfig:r.extend({},x)})}),I(),this;function I(){if(M.length===0)D(w.complete)&&w.complete();else{var R,j,z,Y,F=M[0];if(D(w.before)){var G=w.before(F.file,F.inputElem);if(typeof G=="object"){if(G.action==="abort")return R="AbortError",j=F.file,z=F.inputElem,Y=G.reason,void(D(w.error)&&w.error({name:R},j,z,Y));if(G.action==="skip")return void T();typeof G.config=="object"&&(F.instanceConfig=r.extend(F.instanceConfig,G.config))}else if(G==="skip")return void T()}var B=F.instanceConfig.complete;F.instanceConfig.complete=function(q){D(B)&&B(q,F.file,F.inputElem),T()},l.parse(F.file,F.instanceConfig)}}function T(){M.splice(0,1),I()}}),o&&(i.onmessage=function(w){w=w.data,l.WORKER_ID===void 0&&w&&(l.WORKER_ID=w.workerId),typeof w.input=="string"?i.postMessage({workerId:l.WORKER_ID,results:l.parse(w.input,w.config),finished:!0}):(i.File&&w.input instanceof File||w.input instanceof Object)&&(w=l.parse(w.input,w.config))&&i.postMessage({workerId:l.WORKER_ID,results:w,finished:!0})}),(h.prototype=Object.create(u.prototype)).constructor=h,(d.prototype=Object.create(u.prototype)).constructor=d,(f.prototype=Object.create(f.prototype)).constructor=f,(p.prototype=Object.create(u.prototype)).constructor=p,l})})(fd)),fd.exports}var H9=W9();const U9=j9(H9),Y9=e=>{const t=e.map(i=>i.toLocaleLowerCase()),n=i=>{const r=t.findIndex(s=>i.some(o=>s.includes(o)));return r!==-1?e[r]:void 0};return{date:n(["date","time"]),amount:n(["amount","value","cost","price","debit"]),credit:n(["credit","payment"]),description:n(["description","merchant","payee","name","memo"]),account:n(["account","source","card"])}},q9=e=>new Promise((t,n)=>{U9.parse(e,{header:!0,skipEmptyLines:!0,complete:({data:i,meta:r,errors:s})=>{const o=Y9(r.fields||[]);t({data:i,meta:r,errors:s,suggestedMapping:o})},error:i=>{n(i)}})});var V9=Object.defineProperty,K9=Object.getOwnPropertyDescriptor,yD=e=>{throw TypeError(e)},la=(e,t,n,i)=>{for(var r=i>1?void 0:i?K9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&V9(t,n,r),r},G9=(e,t,n)=>t.has(e)||yD("Cannot "+n),X9=(e,t,n)=>t.has(e)?yD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ss=(e,t,n)=>(G9(e,t,"access private method"),n),Qi,bD,_D,wD,xD,CD,kD,SD,ED;const Q9=[{key:"date",label:"Date"},{key:"amount",label:"Debit"},{key:"credit",label:"Credit"},{key:"description",label:"Description"},{key:"account",label:"Account"}];let Gr=class extends bp(gt){constructor(){super(...arguments),X9(this,Qi),this._step="upload",this._mapping={},this._accounts=[],this._accountName="",this._importMode="append"}async loadFile(e){await this.withBusy(async()=>{this._accounts=await ke.all(),this._result=await q9(e),this._mapping={...this._result.suggestedMapping},this._step="mapping"})}render(){return E`
      ${this._step==="upload"?Ss(this,Qi,SD).call(this):Ss(this,Qi,ED).call(this)}
    `}};Qi=new WeakSet;bD=async function(e){const t=e.target;!t.files||t.files.length===0||await this.loadFile(t.files[0])};_D=function(e){this._accountName=e.target.value};wD=function(e){this._importMode=e.target.value};xD=function(e,t){const i=t.target.value||void 0;this._mapping={...this._mapping,[e]:i}};CD=async function(){if(this._mapping.account)return;const e=this._accountName.trim();if(!e)return;const t=this._accounts.find(n=>n.name.toLowerCase()===e.toLowerCase());return t?t.id:(await ke.create({name:e})).id};kD=async function(){this._result&&await this.withBusy(async()=>{const e=!this._mapping.account,t=await Ss(this,Qi,CD).call(this);if(!(e&&t===void 0)){j0("Importing transactions...");try{const n=await N9(this._result.data,this._mapping,{accountId:t,importMode:this._importMode});this.dispatchEvent(new CustomEvent("imported",{detail:{count:n}})),this._step="upload",this._result=void 0,this._mapping={},this._accountName="",this._importMode="append"}finally{B0()}}})};SD=function(){return E`
      <label for="file-upload">Select a CSV file:</label>
      <input type="file" id="file-upload" accept=".csv" @change=${Ss(this,Qi,bD)} />
    `};ED=function(){if(!this._result)return tt;const e=this._result.meta.fields??[],t=this._result.data.slice(0,5);return E`
      <h4>Column Mapping</h4>
      <div class="mapping-form">
        ${Q9.map(({key:n,label:i})=>E`
          <label>${i}:</label>
          <select @change=${r=>Ss(this,Qi,xD).call(this,n,r)}>
            <option value="">-- Unmapped --</option>
            ${e.map(r=>E`
              <option value=${r} ?selected=${this._mapping[n]===r}>${r}</option>
            `)}
          </select>
        `)}
      </div>

      ${this._mapping.account?tt:E`
        <h4>Account</h4>
        <div class="mapping-form">
          <label>Account:</label>
          <input
            type="text"
            list="account-options"
            .value=${this._accountName}
            @input=${Ss(this,Qi,_D)}
            placeholder="Type or select an account"
          />
          <datalist id="account-options">
            ${this._accounts.map(n=>E`<option value=${n.name}></option>`)}
          </datalist>
        </div>
      `}

      <div class="mapping-form">
        <label>Mode:</label>
        <select @change=${Ss(this,Qi,wD)}>
          <option value="append" ?selected=${this._importMode==="append"}>Append to existing</option>
          <option value="replace" ?selected=${this._importMode==="replace"}>Replace existing transactions</option>
        </select>
      </div>

      <button @click=${Ss(this,Qi,kD)}>Import</button>

      <h4>Preview</h4>
      <div class="preview">
        <table>
          <thead>
            <tr>${e.map(n=>E`<th>${n}</th>`)}</tr>
          </thead>
          <tbody>
            ${t.map(n=>E`
              <tr>${e.map(i=>E`<td>${n[i]}</td>`)}</tr>
            `)}
          </tbody>
        </table>
      </div>
    `};Gr.styles=[Li,fr,yp,Zr,dt`
      :host {
        display: block;
      }
      .mapping-form {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        align-items: center;
        max-width: 400px;
      }
      select {
        padding: 4px 8px;
      }
      button {
        padding: 0.5rem 1rem;
      }
    `];la([P()],Gr.prototype,"_step",2);la([P()],Gr.prototype,"_result",2);la([P()],Gr.prototype,"_mapping",2);la([P()],Gr.prototype,"_accounts",2);la([P()],Gr.prototype,"_accountName",2);la([P()],Gr.prototype,"_importMode",2);Gr=la([Et("transaction-importer")],Gr);var Z9=Object.defineProperty,J9=Object.getOwnPropertyDescriptor,MD=e=>{throw TypeError(e)},Sn=(e,t,n,i)=>{for(var r=i>1?void 0:i?J9(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Z9(t,n,r),r},Xv=(e,t,n)=>t.has(e)||MD("Cannot "+n),Sm=(e,t,n)=>(Xv(e,t,"read from private field"),n?n.call(e):t.get(e)),Em=(e,t,n)=>t.has(e)?MD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),n1=(e,t,n,i)=>(Xv(e,t,"write to private field"),t.set(e,n),n),J=(e,t,n)=>(Xv(e,t,"access private method"),n),Dl,pd,X,Qg,Xo,DD,Pu,$D,TD,ID,Ma,Da,Zg,OD,PD,RD,AD,LD,ND,fh,FD,zD,Qv,jD,BD,Jg,t0,WD,HD;let We=class extends bp(gt){constructor(){super(...arguments),Em(this,X),this._transactions=null,this._tags=[],this._tagMap=new Map,this._merchants=new Map,this._merchantList=[],this._currentPage=1,this._pageSize=50,this._filter="",this._sortCol="date",this._sortDir="desc",this._selectedIds=new Set,this._excludeTagIds=new Set,this._noMerchant=!1,this._bulkMerchantName="",this._showImporter=!1,Em(this,Dl,[]),Em(this,pd,e=>{const t=e.detail.file;this._showImporter=!0,this.updateComplete.then(()=>{const n=this.shadowRoot?.querySelector("transaction-importer");n&&n.loadFile(t)})})}connectedCallback(){super.connectedCallback(),J(this,X,Xo).call(this),document.addEventListener("budgee-import-csv",Sm(this,pd));const e=ta(()=>J(this,X,Xo).call(this),300);Promise.all([_e.subscribe(e),pe.subscribe(e),Oe.subscribe(e)]).then(t=>{n1(this,Dl,t)})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-import-csv",Sm(this,pd));for(const e of Sm(this,Dl))e.unsubscribe();n1(this,Dl,[])}render(){if(this._transactions===null)return E`
        <budgee-skeleton variant="table" rows="8"></budgee-skeleton>
      `;if(this._transactions.length===0)return E`
        <budgee-empty-state
          heading="No transactions yet"
          description="Import a CSV file to get started."
        >
          <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>Import CSV</button>
        </budgee-empty-state>
        ${this._showImporter?E`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${J(this,X,Qg)}></transaction-importer></budgee-modal>`:""}
      `;const e=this._transactions.filter(o=>J(this,X,ID).call(this,o)),t=J(this,X,PD).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize),r=i.map(o=>o.id),s=r.length>0&&r.every(o=>this._selectedIds.has(o));return E`
      <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>
        Import CSV
      </button>
      ${this._showImporter?E`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${J(this,X,Qg)}></transaction-importer></budgee-modal>`:tt}
      ${J(this,X,WD).call(this)}
      ${J(this,X,HD).call(this)}
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${50}
        storageKey="transactions"
        ?filterable=${!0}
        @page-change=${J(this,X,$D)}
        @filter-change=${J(this,X,TD)}
      >
        <table>
          <thead>
            <tr>
              <th class="col-checkbox">
                <input
                  type="checkbox"
                  .checked=${s}
                  @change=${()=>J(this,X,ND).call(this,i)}
                />
              </th>
              <th class="sortable col-date" @click=${()=>J(this,X,Ma).call(this,"date")}>
                Date${J(this,X,Da).call(this,"date")}
              </th>
              <th class="sortable" @click=${()=>J(this,X,Ma).call(this,"merchant")}>
                Merchant${J(this,X,Da).call(this,"merchant")}
              </th>
              <th class="sortable" @click=${()=>J(this,X,Ma).call(this,"description")}>
                Description${J(this,X,Da).call(this,"description")}
              </th>
              <th class="sortable col-amount" @click=${()=>J(this,X,Ma).call(this,"amount")}>
                Amount${J(this,X,Da).call(this,"amount")}
              </th>
              <th class="sortable col-tags" @click=${()=>J(this,X,Ma).call(this,"tags")}>
                Tags${J(this,X,Da).call(this,"tags")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(o=>E`
              <tr @click=${()=>J(this,X,AD).call(this,o.id)}>
                <td class="col-checkbox" @click=${a=>a.stopPropagation()}>
                  <input
                    type="checkbox"
                    .checked=${this._selectedIds.has(o.id)}
                    @change=${()=>J(this,X,LD).call(this,o.id)}
                  />
                </td>
                <td class="col-date">${J(this,X,OD).call(this,o.date)}</td>
                <td>${o.merchantId&&this._merchants.has(o.merchantId)?E`<a class="merchant-link" @click=${a=>{a.stopPropagation(),J(this,X,RD).call(this,o.merchantId)}}>${this._merchants.get(o.merchantId)}</a>`:""}</td>
                <td>${this._filter?A9(o.description,this._filter):o.description}</td>
                <td class="col-amount ${o.amount<0?"amount-negative":"amount-positive"}">
                  ${o.amount.toFixed(2)}
                </td>
                <td class="col-tags">
                  <tag-pills .tags=${this._tags} .tagIds=${o.tagIds}></tag-pills>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};Dl=new WeakMap;pd=new WeakMap;X=new WeakSet;Qg=async function(){await this.withBusy(async()=>{this._showImporter=!1,await J(this,X,Xo).call(this)})};Xo=async function(){const[e,t,n]=await Promise.all([_e.all(),pe.all(),Oe.all()]);this._transactions=e,this._tags=t,this._tagMap=new Map(t.map(i=>[i.id,i])),this._merchants=new Map(n.map(i=>[i.id,i.name])),this._merchantList=n};DD=function(e){return this._tagMap.get(e)};Pu=function(e){return J(this,X,DD).call(this,e)?.name??`#${e}`};$D=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};TD=function(e){this._filter=e.detail.filter,this._currentPage=1};ID=function(e){if(this._noMerchant&&e.merchantId||e.tagIds.some(n=>this._excludeTagIds.has(n)))return!1;if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.description.toLowerCase().includes(t)||e.tagIds.some(n=>J(this,X,Pu).call(this,n).toLowerCase().includes(t))||e.merchantId&&this._merchants.get(e.merchantId)?.toLowerCase().includes(t)||e.date.includes(t)||e.amount.toFixed(2).includes(t))};Ma=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};Da=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};Zg=function(e){return e?this._merchants.get(e)??"":""};OD=function(e){const[t,n,i]=e.split("-");return new Date(Number(t),Number(n)-1,Number(i)).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})};PD=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="date")s=i.date.localeCompare(r.date);else if(t==="merchant")s=J(this,X,Zg).call(this,i.merchantId).localeCompare(J(this,X,Zg).call(this,r.merchantId));else if(t==="description")s=i.description.localeCompare(r.description);else if(t==="amount")s=i.amount-r.amount;else if(t==="tags"){const o=i.tagIds.map(c=>J(this,X,Pu).call(this,c)).join(","),a=r.tagIds.map(c=>J(this,X,Pu).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};RD=function(e){Cc(`/merchants/${e}`)};AD=function(e){Cc(`/transactions/${e}`)};LD=function(e){const t=new Set(this._selectedIds);t.has(e)?t.delete(e):t.add(e),this._selectedIds=t};ND=function(e){const t=e.map(i=>i.id);if(t.every(i=>this._selectedIds.has(i))){const i=new Set(this._selectedIds);for(const r of t)i.delete(r);this._selectedIds=i}else this._selectedIds=new Set([...this._selectedIds,...t])};fh=function(){this._selectedIds=new Set,this._bulkMerchantName=""};FD=async function(e){const n=e.detail.tag.id;await J(this,X,Qv).call(this,n)};zD=async function(e){const t=e.detail.name,n=await pe.create(t);await J(this,X,Qv).call(this,n.id)};Qv=async function(e){this._transactions&&await this.withBusy(async()=>{const t=this._transactions.filter(n=>this._selectedIds.has(n.id)&&!n.tagIds.includes(e)).map(n=>({...n,tagIds:[...n.tagIds,e]}));t.length>0&&await _e.bulkPut(t),Ci({message:`Tag applied to ${t.length} transaction(s)`,type:"success"}),J(this,X,fh).call(this),await J(this,X,Xo).call(this)})};jD=async function(){const e=this._bulkMerchantName.trim();!e||!this._transactions||await this.withBusy(async()=>{let t=this._merchantList.find(i=>i.name.toLowerCase()===e.toLowerCase());t||(t=await Oe.create(e));const n=this._transactions.filter(i=>this._selectedIds.has(i.id)).map(i=>({...i,merchantId:t.id}));n.length>0&&await _e.bulkPut(n),Ci({message:`Merchant assigned to ${n.length} transaction(s)`,type:"success"}),J(this,X,fh).call(this),await J(this,X,Xo).call(this)})};BD=async function(){if(!this._transactions)return;const e=this._selectedIds.size;await _i.show({heading:"Delete Transactions",message:`Delete ${e} selected transaction${e===1?"":"s"}? This cannot be undone.`,confirmLabel:"Delete",danger:!0})&&await this.withBusy(async()=>{const n=[...this._selectedIds];await _e.bulkRemove(n),Ci({message:`${n.length} transaction(s) deleted`,type:"success"}),J(this,X,fh).call(this),await J(this,X,Xo).call(this)})};Jg=function(e){const t=new Set(this._excludeTagIds);t.has(e)?t.delete(e):t.add(e),this._excludeTagIds=t,this._currentPage=1};t0=function(){this._noMerchant=!this._noMerchant,this._currentPage=1};WD=function(){const e=this._excludeTagIds.size>0||this._noMerchant;return E`
      <div class="filter-bar">
        <div class="filter-group">
          <label>Exclude tag:</label>
          <select @change=${t=>{const n=t.target.value;n&&J(this,X,Jg).call(this,n),t.target.value=""}}>
            <option value="">Select…</option>
            ${this._tags.filter(t=>!this._excludeTagIds.has(t.id)).map(t=>E`<option value=${t.id}>${t.name}</option>`)}
          </select>
        </div>
        <div class="filter-group">
          <label>
            <input type="checkbox" .checked=${this._noMerchant} @change=${J(this,X,t0)} />
            No merchant
          </label>
        </div>
        ${e?E`
            <div class="active-filters">
              ${[...this._excludeTagIds].map(t=>E`
                  <span class="filter-chip">
                    Not: ${J(this,X,Pu).call(this,t)}
                    <button class="chip-remove" @click=${()=>J(this,X,Jg).call(this,t)}>×</button>
                  </span>
                `)}
              ${this._noMerchant?E`<span class="filter-chip">
                    No merchant
                    <button class="chip-remove" @click=${J(this,X,t0)}>×</button>
                  </span>`:tt}
            </div>
          `:tt}
      </div>
    `};HD=function(){return this._selectedIds.size===0?tt:E`
      <div class="bulk-bar">
        <span class="selected-count">${this._selectedIds.size} selected</span>
        <div class="bulk-action">
          <label>Tag:</label>
          <tag-autocomplete
            .tags=${this._tags}
            .selectedTagIds=${[]}
            .excludeIds=${[]}
            @tag-selected=${J(this,X,FD)}
            @tag-created=${J(this,X,zD)}
          ></tag-autocomplete>
        </div>
        <div class="bulk-action">
          <label>Merchant:</label>
          <merchant-autocomplete
            .merchants=${this._merchantList}
            .value=${this._bulkMerchantName}
            @merchant-changed=${e=>{this._bulkMerchantName=e.detail.name}}
          ></merchant-autocomplete>
          <button @click=${J(this,X,jD)} ?disabled=${!this._bulkMerchantName.trim()}>
            Set
          </button>
        </div>
        <button class="danger" @click=${J(this,X,BD)}>Delete selected</button>
        <button @click=${J(this,X,fh)}>Clear selection</button>
      </div>
    `};We.styles=[Li,yp,fr,Zr,dt`
      tbody tr {
        cursor: pointer;
      }
      .merchant-link {
        color: var(--budgee-primary);
        cursor: pointer;
        text-decoration: underline;
      }
      .col-amount {
        width: 8rem;
      }
      .col-date {
        white-space: nowrap;
      }
      .col-checkbox {
        width: min-content;
      }
      .bulk-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0.75rem;
        background: var(--budgee-bg);
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
      }
      .bulk-bar .selected-count {
        font-weight: 600;
        white-space: nowrap;
      }
      .bulk-bar label {
        font-size: 0.85rem;
        white-space: nowrap;
      }
      .bulk-bar .bulk-action {
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      .bulk-bar button {
        padding: 4px 10px;
        cursor: pointer;
      }
      .filter-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
        font-size: 0.85rem;
      }
      .filter-group {
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      .filter-group select {
        padding: 2px 6px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        font-size: 0.85rem;
      }
      .active-filters {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 2px 8px;
        border-radius: 12px;
        background: var(--budgee-bg);
        border: 1px solid var(--budgee-border);
        font-size: 0.8rem;
      }
      .chip-remove {
        all: unset;
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1;
        padding: 0 2px;
      }
      .import-toggle {
        padding: 0.4rem 0.8rem;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
      }
      mark {
        background: lch(from var(--budgee-primary) l c h / 0.2);
        color: inherit;
        border-radius: 2px;
        padding: 0 1px;
      }
    `];Sn([P()],We.prototype,"_transactions",2);Sn([P()],We.prototype,"_tags",2);Sn([P()],We.prototype,"_merchants",2);Sn([P()],We.prototype,"_merchantList",2);Sn([P()],We.prototype,"_currentPage",2);Sn([P()],We.prototype,"_pageSize",2);Sn([P()],We.prototype,"_filter",2);Sn([P()],We.prototype,"_sortCol",2);Sn([P()],We.prototype,"_sortDir",2);Sn([P()],We.prototype,"_selectedIds",2);Sn([P()],We.prototype,"_excludeTagIds",2);Sn([P()],We.prototype,"_noMerchant",2);Sn([P()],We.prototype,"_bulkMerchantName",2);Sn([P()],We.prototype,"_showImporter",2);We=Sn([Et("transaction-list")],We);var tB=Object.defineProperty,eB=Object.getOwnPropertyDescriptor,UD=e=>{throw TypeError(e)},Zv=(e,t,n,i)=>{for(var r=i>1?void 0:i?eB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&tB(t,n,r),r},Jv=(e,t,n)=>t.has(e)||UD("Cannot "+n),Tn=(e,t,n)=>(Jv(e,t,"read from private field"),n?n.call(e):t.get(e)),rs=(e,t,n)=>t.has(e)?UD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),kf=(e,t,n,i)=>(Jv(e,t,"write to private field"),t.set(e,n),n),$a=(e,t,n)=>(Jv(e,t,"access private method"),n),i1=(e,t,n,i)=>({set _(r){kf(e,t,r)},get _(){return Tn(e,t,i)}}),Ta,Ua,hs,e0,md,YD,gd,vd,yd,bd,ty,qD;let Ru=class extends gt{constructor(){super(...arguments),rs(this,hs),this._dragOver=!1,this._showShortcuts=!1,rs(this,Ta,0),rs(this,Ua),this._router=new QD(this,[{path:"/",render:()=>E`
          <budgee-dashboard></budgee-dashboard>
        `},{path:"/transactions",render:()=>E`
          <transaction-list></transaction-list>
        `},{path:"/transactions/:id",render:({id:e})=>E`<transaction-detail .transactionId=${e}></transaction-detail>`,enter:async()=>(await wo(()=>import("./TransactionDetail-CVHIgDR7.js"),[]),!0)},{path:"/accounts",render:()=>E`
          <account-list></account-list>
        `},{path:"/accounts/:id",render:({id:e})=>E`<account-detail .accountId=${e}></account-detail>`,enter:async()=>(await wo(()=>import("./AccountDetail-Cu2o1fHP.js"),[]),!0)},{path:"/merchants",render:()=>E`
          <merchant-list></merchant-list>
        `},{path:"/merchants/:id",render:({id:e})=>E`<merchant-detail .merchantId=${e}></merchant-detail>`,enter:async()=>(await wo(()=>import("./MerchantDetail-Cu9p0LRL.js"),[]),!0)},{path:"/tags",render:()=>E`
          <tag-manager></tag-manager>
        `},{path:"/rules",render:()=>E`
          <rule-manager></rule-manager>
        `},{path:"/settings",render:()=>E`
          <budgee-settings @budgee-sync-settings-changed=${()=>$a(this,hs,e0).call(this)}></budgee-settings>
        `}]),rs(this,md,e=>{const t=e.target,n=t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable;e.key==="?"&&!n&&!e.metaKey&&!e.ctrlKey&&(e.preventDefault(),this._showShortcuts=!this._showShortcuts)}),rs(this,gd,e=>{e.preventDefault()}),rs(this,vd,e=>{e.preventDefault(),i1(this,Ta)._++,this._dragOver=!0}),rs(this,yd,e=>{i1(this,Ta)._--,Tn(this,Ta)===0&&(this._dragOver=!1)}),rs(this,bd,async e=>{e.preventDefault(),kf(this,Ta,0),this._dragOver=!1;const t=e.dataTransfer?.files[0];if(t){if(t.name.endsWith(".csv"))Cc("/transactions"),await this.updateComplete,document.dispatchEvent(new CustomEvent("budgee-import-csv",{detail:{file:t}}));else if(t.name.endsWith(".json")){if(!await _i.show({heading:"Import Database",message:"This will replace all existing data. Are you sure?",confirmLabel:"Import",danger:!0}))return;j0("Importing database...");try{await s2(t),window.location.reload()}finally{B0()}}}})}connectedCallback(){super.connectedCallback(),fo&&this.classList.add("demo-mode"),$a(this,hs,YD).call(this),document.addEventListener("keydown",Tn(this,md)),this.addEventListener("dragover",Tn(this,gd)),this.addEventListener("dragenter",Tn(this,vd)),this.addEventListener("dragleave",Tn(this,yd)),this.addEventListener("drop",Tn(this,bd)),Q4(),Z().then(async e=>{await c2(e),fo&&await F4(e)}).catch(e=>{console.error(e);const t=e instanceof r2,n=t?"The database schema is incompatible with this version of the app and can't be opened. You can export the raw data for safekeeping, then delete the database to get unstuck.":e instanceof Error?e.message:String(e);Jm(n,{isDatabaseError:t})}),fo||$a(this,hs,e0).call(this)}disconnectedCallback(){var e;super.disconnectedCallback(),document.removeEventListener("keydown",Tn(this,md)),this.removeEventListener("dragover",Tn(this,gd)),this.removeEventListener("dragenter",Tn(this,vd)),this.removeEventListener("dragleave",Tn(this,yd)),this.removeEventListener("drop",Tn(this,bd)),(e=Tn(this,Ua))==null||e.call(this)}navLink(e,t,n){const i=window.location.pathname,r=e==="/"?i==="/":i.startsWith(e),s=fo?`${e}${e.includes("?")?"&":"?"}demo=1`:e;return E`<a href=${s} class=${u0({active:r})}>${ye(n)} ${t}</a>`}render(){return E`
      ${fo?E`<div class="demo-banner">Demo Mode — changes won't be saved <a href=${$a(this,hs,ty).call(this)} @click=${$a(this,hs,qD)}>Exit demo</a></div>`:tt}
      <h1 class="app-name">${ye(E2)} Budgee</h1>
      <nav>
        ${this.navLink("/","Dashboard",aL)}
        ${this.navLink("/transactions","Transactions",z2)}
        ${this.navLink("/accounts","Accounts",cL)}
        ${this.navLink("/merchants","Merchants",j2)}
        ${this.navLink("/tags","Tags",hL)}
        ${this.navLink("/rules","Rules",lL)}
        ${this.navLink("/settings","Settings",uL)}
        <div style="flex:1"></div>
        <sync-status-indicator></sync-status-indicator>
      </nav>
      <main>${this._router.outlet()}</main>
      <budgee-global-search></budgee-global-search>
      <budgee-toast-manager></budgee-toast-manager>
      ${this._showShortcuts?E`<budgee-modal heading="Keyboard Shortcuts" @modal-close=${()=>{this._showShortcuts=!1}}>
            <table style="width:100%;border-collapse:collapse">
              <tbody>
                <tr><td style="padding:0.4rem 0"><kbd style="background:var(--budgee-bg);border:1px solid var(--budgee-border);border-radius:3px;padding:2px 6px">⌘K</kbd></td><td style="padding:0.4rem 0.5rem">Open search</td></tr>
                <tr><td style="padding:0.4rem 0"><kbd style="background:var(--budgee-bg);border:1px solid var(--budgee-border);border-radius:3px;padding:2px 6px">?</kbd></td><td style="padding:0.4rem 0.5rem">Show shortcuts</td></tr>
                <tr><td style="padding:0.4rem 0"><kbd style="background:var(--budgee-bg);border:1px solid var(--budgee-border);border-radius:3px;padding:2px 6px">Esc</kbd></td><td style="padding:0.4rem 0.5rem">Close modal</td></tr>
              </tbody>
            </table>
          </budgee-modal>`:tt}
      ${this._dragOver?E`
              <div class="drop-overlay">Drop file to import</div>
            `:tt}
    `}};Ta=new WeakMap;Ua=new WeakMap;hs=new WeakSet;e0=async function(){const e=Tn(this,Ua);kf(this,Ua,void 0),await e?.();let t;try{t=localStorage.getItem("budgee-sync-url")}catch{return}if(t)try{kf(this,Ua,await D4(t))}catch(n){console.error("Failed to start replication:",n)}};md=new WeakMap;YD=function(){try{const e=localStorage.getItem("budgee-theme");e==="light"||e==="dark"?document.documentElement.dataset.theme=e:delete document.documentElement.dataset.theme}catch{}};gd=new WeakMap;vd=new WeakMap;yd=new WeakMap;bd=new WeakMap;ty=function(){const e=new URL(window.location.href);return e.searchParams.delete("demo"),e.pathname+e.search};qD=function(e){e.preventDefault(),window.location.href=$a(this,hs,ty).call(this)};Ru.styles=dt`
    :host {
      width: 100vw;
      max-width: 100vw;
      min-height: 100vh;

      display: grid;
      grid-template-areas:
        "app-name main"
        "nav main";
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr;
      gap: 0;

      color: var(--budgee-text);
      font-family: sans-serif;
    }

    svg.lucide {
      display: inline-block;
      width: 1rem;
      height: 1rem;
    }

    .app-name {
      grid-area: app-name;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--budgee-text);
      background: var(--budgee-surface);
      margin: 0;

      width: stretch;
      padding-block: 1rem;
      padding-inline-end: 0.5rem;
      border-right: 1px solid var(--budgee-border);

      svg.lucide {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    nav {
      grid-area: nav;
      display: flex;
      flex-direction: column;
      background: var(--budgee-surface);
      border-right: 1px solid var(--budgee-border);
      width: 220px;
      flex-shrink: 0;
      sync-status-indicator {
        position: sticky;
        bottom: 0;
        background: var(--budgee-surface);
      }

      a,
      button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: var(--budgee-text-muted);
        font-size: 0.9rem;
        border-left: 3px solid transparent;
        transition:
          color 0.15s,
          border-color 0.15s;

        &:hover {
          color: var(--budgee-primary);
        }

        &.active {
          color: var(--budgee-primary);
          border-left-color: var(--budgee-primary);
        }
      }
    }

    main {
      grid-area: main;
      padding: 1.5rem 2rem;
    }

    .drop-overlay {
      position: fixed;
      inset: 0;
      background: var(--budgee-overlay);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      pointer-events: none;

      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .demo-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9000;
      background: var(--budgee-warning, #f59e0b);
      color: #000;
      text-align: center;
      padding: 0.35rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;

      a {
        color: inherit;
        margin-left: 0.5rem;
      }
    }

    :host(.demo-mode) {
      padding-top: 2rem;
    }

    @media (max-width: 1024px) {
      :host {
        grid-template-areas:
          "app-name nav"
          "main main";
      }

      .app-name {
        width: auto;
        height: stretch;
        padding: 1rem;
        border-bottom: 1px solid var(--budgee-border);
      }

      nav {
        flex-direction: row;
        flex-wrap: wrap;
        width: auto;
        border-right: none;
        border-bottom: 1px solid var(--budgee-border);
        padding: 0 0.5rem;

        a,
        button {
          border-left: none;
          border-bottom: 2px solid transparent;
          padding: 0.5rem 0.75rem;

          &.active {
            border-bottom-color: var(--budgee-primary);
          }
        }
      }

      main {
        padding: 1rem;
      }
    }
  `;Zv([P()],Ru.prototype,"_dragOver",2);Zv([P()],Ru.prototype,"_showShortcuts",2);Ru=Zv([Et("budgee-app")],Ru);export{wB as $,tt as A,bp as B,U as C,Ai as D,Cd as E,Qo as F,eu as G,yB as H,Il as I,Mf as J,cx as K,pO as L,Oe as M,Ri as N,di as O,p0 as P,bB as Q,V$ as R,Fe as S,_e as T,CB as U,j9 as V,yi as W,qt as X,mB as Y,Va as Z,gB as _,pe as a,G$ as a0,Rf as a1,E as b,Ke as c,ta as d,V8 as e,Li as f,yp as g,dt as h,gt as i,H as j,Et as k,ke as l,K8 as m,Cc as n,xB as o,fL as p,Ba as q,P as r,G8 as s,Zr as t,Aw as u,iu as v,D$ as w,Tl as x,Q as y,HO as z};
