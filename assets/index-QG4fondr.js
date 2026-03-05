(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const zD="modulepreload",jD=function(e){return"/"+e},Z0={},Ia=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=jD(l),l in Z0)return;Z0[l]=!0;const u=l.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":zD,u||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),u)return new Promise((f,p)=>{d.addEventListener("load",f),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};const J0=new WeakMap,ty=e=>{if((n=>n.pattern!==void 0)(e))return e.pattern;let t=J0.get(e);return t===void 0&&J0.set(e,t=new URLPattern({pathname:e.path})),t};let BD=class{constructor(t,n,i){this.routes=[],this.o=[],this.t={},this.i=r=>{if(r.routes===this)return;const s=r.routes;this.o.push(s),s.h=this,r.stopImmediatePropagation(),r.onDisconnect=()=>{this.o?.splice(this.o.indexOf(s)>>>0,1)};const o=ey(this.t);o!==void 0&&s.goto(o)},(this.l=t).addController(this),this.routes=[...n],this.fallback=i?.fallback}link(t){if(t?.startsWith("/"))return t;if(t?.startsWith("."))throw Error("Not implemented");return t??=this.u,(this.h?.link()??"")+t}async goto(t){let n;if(this.routes.length===0&&this.fallback===void 0)n=t,this.u="",this.t={0:n};else{const i=this.p(t);if(i===void 0)throw Error("No route found for "+t);const r=ty(i).exec({pathname:t}),s=r?.pathname.groups??{};if(n=ey(s),typeof i.enter=="function"&&await i.enter(s)===!1)return;this.v=i,this.t=s,this.u=n===void 0?t:t.substring(0,t.length-n.length)}if(n!==void 0)for(const i of this.o)i.goto(n);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(t){const n=this.routes.find((i=>ty(i).test({pathname:t})));return n||this.fallback===void 0?n:this.fallback?{...this.fallback,path:"/*"}:void 0}hostConnected(){this.l.addEventListener(Cg.eventName,this.i);const t=new Cg(this);this.l.dispatchEvent(t),this._=t.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}};const ey=e=>{let t;for(const n of Object.keys(e))/\d+/.test(n)&&(t===void 0||n>t)&&(t=n);return t&&e[t]};let Cg=class Qw extends Event{constructor(t){super(Qw.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}};Cg.eventName="lit-routes-connected";const WD=location.origin||location.protocol+"//"+location.host;let HD=class extends BD{constructor(){super(...arguments),this.m=t=>{const n=t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey;if(t.defaultPrevented||n)return;const i=t.composedPath().find((o=>o.tagName==="A"));if(i===void 0||i.target!==""||i.hasAttribute("download")||i.getAttribute("rel")==="external")return;const r=i.href;if(r===""||r.startsWith("mailto:"))return;const s=window.location;i.origin===WD&&(t.preventDefault(),r!==s.href&&(window.history.pushState({},"",r),this.goto(i.pathname)))},this.R=t=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener("click",this.m),window.addEventListener("popstate",this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener("click",this.m),window.removeEventListener("popstate",this.R)}};const Rh=globalThis,Jm=Rh.ShadowRoot&&(Rh.ShadyCSS===void 0||Rh.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tv=Symbol(),ny=new WeakMap;let Zw=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==tv)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Jm&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=ny.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ny.set(n,t))}return t}toString(){return this.cssText}};const UD=e=>new Zw(typeof e=="string"?e:e+"",void 0,tv),dt=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new Zw(n,e,tv)},YD=(e,t)=>{if(Jm)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),r=Rh.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}},iy=Jm?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return UD(n)})(e):e;const{is:VD,defineProperty:qD,getOwnPropertyDescriptor:KD,getOwnPropertyNames:GD,getOwnPropertySymbols:XD,getPrototypeOf:QD}=Object,_f=globalThis,ry=_f.trustedTypes,ZD=ry?ry.emptyScript:"",JD=_f.reactiveElementPolyfillSupport,Ml=(e,t)=>e,md={toAttribute(e,t){switch(t){case Boolean:e=e?ZD:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ev=(e,t)=>!VD(e,t),sy={attribute:!0,type:String,converter:md,reflect:!1,useDefault:!1,hasChanged:ev};Symbol.metadata??=Symbol("metadata"),_f.litPropertyMetadata??=new WeakMap;let va=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=sy){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,n);r!==void 0&&qD(this.prototype,t,r)}}static getPropertyDescriptor(t,n,i){const{get:r,set:s}=KD(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:r,set(o){const a=r?.call(this);s?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??sy}static _$Ei(){if(this.hasOwnProperty(Ml("elementProperties")))return;const t=QD(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ml("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ml("properties"))){const n=this.properties,i=[...GD(n),...XD(n)];for(const r of i)this.createProperty(r,n[r])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,r]of n)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const r=this._$Eu(n,i);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)n.unshift(iy(r))}else t!==void 0&&n.push(iy(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return YD(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:md).toAttribute(n,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,n){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:md;this._$Em=r;const a=o.fromAttribute(n,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,n,i,r=!1,s){if(t!==void 0){const o=this.constructor;if(r===!1&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??ev)(s,n)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),s!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};va.elementStyles=[],va.shadowRootOptions={mode:"open"},va[Ml("elementProperties")]=new Map,va[Ml("finalized")]=new Map,JD?.({ReactiveElement:va}),(_f.reactiveElementVersions??=[]).push("2.1.2");const nv=globalThis,oy=e=>e,vd=nv.trustedTypes,ay=vd?vd.createPolicy("lit-html",{createHTML:e=>e}):void 0,Jw="$lit$",ds=`lit$${Math.random().toFixed(9).slice(2)}$`,t1="?"+ds,t$=`<${t1}>`,Mo=document,Gl=()=>Mo.createComment(""),Xl=e=>e===null||typeof e!="object"&&typeof e!="function",iv=Array.isArray,e$=e=>iv(e)||typeof e?.[Symbol.iterator]=="function",_p=`[ 	
\f\r]`,Ac=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cy=/-->/g,ly=/>/g,Qs=RegExp(`>|${_p}(?:([^\\s"'>=/]+)(${_p}*=${_p}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),uy=/'/g,hy=/"/g,e1=/^(?:script|style|textarea|title)$/i,n$=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),E=n$(1),Os=Symbol.for("lit-noChange"),nt=Symbol.for("lit-nothing"),dy=new WeakMap,go=Mo.createTreeWalker(Mo,129);function n1(e,t){if(!iv(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ay!==void 0?ay.createHTML(t):t}const i$=(e,t)=>{const n=e.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",o=Ac;for(let a=0;a<n;a++){const c=e[a];let l,u,h=-1,d=0;for(;d<c.length&&(o.lastIndex=d,u=o.exec(c),u!==null);)d=o.lastIndex,o===Ac?u[1]==="!--"?o=cy:u[1]!==void 0?o=ly:u[2]!==void 0?(e1.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=Qs):u[3]!==void 0&&(o=Qs):o===Qs?u[0]===">"?(o=r??Ac,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?Qs:u[3]==='"'?hy:uy):o===hy||o===uy?o=Qs:o===cy||o===ly?o=Ac:(o=Qs,r=void 0);const f=o===Qs&&e[a+1].startsWith("/>")?" ":"";s+=o===Ac?c+t$:h>=0?(i.push(l),c.slice(0,h)+Jw+c.slice(h)+ds+f):c+ds+(h===-2?a:f)}return[n1(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let kg=class i1{constructor({strings:t,_$litType$:n},i){let r;this.parts=[];let s=0,o=0;const a=t.length-1,c=this.parts,[l,u]=i$(t,n);if(this.el=i1.createElement(l,i),go.currentNode=this.el.content,n===2||n===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=go.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(Jw)){const d=u[o++],f=r.getAttribute(h).split(ds),p=/([.?@])?(.*)/.exec(d);c.push({type:1,index:s,name:p[2],strings:f,ctor:p[1]==="."?s$:p[1]==="?"?o$:p[1]==="@"?a$:wf}),r.removeAttribute(h)}else h.startsWith(ds)&&(c.push({type:6,index:s}),r.removeAttribute(h));if(e1.test(r.tagName)){const h=r.textContent.split(ds),d=h.length-1;if(d>0){r.textContent=vd?vd.emptyScript:"";for(let f=0;f<d;f++)r.append(h[f],Gl()),go.nextNode(),c.push({type:2,index:++s});r.append(h[d],Gl())}}}else if(r.nodeType===8)if(r.data===t1)c.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(ds,h+1))!==-1;)c.push({type:7,index:s}),h+=ds.length-1}s++}}static createElement(t,n){const i=Mo.createElement("template");return i.innerHTML=t,i}};function Ha(e,t,n=e,i){if(t===Os)return t;let r=i!==void 0?n._$Co?.[i]:n._$Cl;const s=Xl(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=r:n._$Cl=r),r!==void 0&&(t=Ha(e,r._$AS(e,t.values),r,i)),t}let r$=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,r=(t?.creationScope??Mo).importNode(n,!0);go.currentNode=r;let s=go.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new rv(s,s.nextSibling,this,t):c.type===1?l=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(l=new c$(s,this,t)),this._$AV.push(l),c=i[++a]}o!==c?.index&&(s=go.nextNode(),o++)}return go.currentNode=Mo,r}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}},rv=class r1{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,r){this.type=2,this._$AH=nt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Ha(this,t,n),Xl(t)?t===nt||t==null||t===""?(this._$AH!==nt&&this._$AR(),this._$AH=nt):t!==this._$AH&&t!==Os&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):e$(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==nt&&Xl(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mo.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=kg.createElement(n1(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(n);else{const s=new r$(r,this),o=s.u(this.options);s.p(n),this.T(o),this._$AH=s}}_$AC(t){let n=dy.get(t.strings);return n===void 0&&dy.set(t.strings,n=new kg(t)),n}k(t){iv(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,r=0;for(const s of t)r===n.length?n.push(i=new r1(this.O(Gl()),this.O(Gl()),this,this.options)):i=n[r],i._$AI(s),r++;r<n.length&&(this._$AR(i&&i._$AB.nextSibling,r),n.length=r)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=oy(t).nextSibling;oy(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},wf=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,r,s){this.type=1,this._$AH=nt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=nt}_$AI(t,n=this,i,r){const s=this.strings;let o=!1;if(s===void 0)t=Ha(this,t,n,0),o=!Xl(t)||t!==this._$AH&&t!==Os,o&&(this._$AH=t);else{const a=t;let c,l;for(t=s[0],c=0;c<s.length-1;c++)l=Ha(this,a[i+c],n,c),l===Os&&(l=this._$AH[c]),o||=!Xl(l)||l!==this._$AH[c],l===nt?t=nt:t!==nt&&(t+=(l??"")+s[c+1]),this._$AH[c]=l}o&&!r&&this.j(t)}j(t){t===nt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},s$=class extends wf{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===nt?void 0:t}},o$=class extends wf{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==nt)}},a$=class extends wf{constructor(t,n,i,r,s){super(t,n,i,r,s),this.type=5}_$AI(t,n=this){if((t=Ha(this,t,n,0)??nt)===Os)return;const i=this._$AH,r=t===nt&&i!==nt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==nt&&(i===nt||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},c$=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ha(this,t)}};const l$=nv.litHtmlPolyfillSupport;l$?.(kg,rv),(nv.litHtmlVersions??=[]).push("3.3.2");const u$=(e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const s=n?.renderBefore??null;i._$litPart$=r=new rv(t.insertBefore(Gl(),s),s,void 0,n??{})}return r._$AI(e),r};const sv=globalThis;let mt=class extends va{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=u$(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Os}};mt._$litElement$=!0,mt.finalized=!0,sv.litElementHydrateSupport?.({LitElement:mt});const h$=sv.litElementPolyfillSupport;h$?.({LitElement:mt});(sv.litElementVersions??=[]).push("4.2.2");const Et=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const d$={attribute:!0,type:String,converter:md,reflect:!1,hasChanged:ev},f$=(e=d$,t,n)=>{const{kind:i,metadata:r}=n;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,e,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const c=this[o];t.call(this,a),this.requestUpdate(o,c,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function H(e){return(t,n)=>typeof n=="object"?f$(e,t,n):((i,r,s)=>{const o=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),o?Object.getOwnPropertyDescriptor(r,s):void 0})(e,t,n)}function P(e){return H({...e,state:!0,attribute:!1})}const s1={ATTRIBUTE:1,CHILD:2},o1=e=>(...t)=>({_$litDirective$:e,values:t});let a1=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const ov=o1(class extends a1{constructor(e){if(super(e),e.type!==s1.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const n=e.element.classList;for(const i of this.st)i in t||(n.remove(i),this.st.delete(i));for(const i in t){const r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return Os}});class Sg extends a1{constructor(t){if(super(t),this.it=nt,t.type!==s1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===nt||t==null)return this._t=void 0,this.it=t;if(t===Os)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Sg.directiveName="unsafeHTML",Sg.resultType=1;let Eg=class extends Sg{};Eg.directiveName="unsafeSVG",Eg.resultType=2;const ye=o1(Eg);function Ql(e){"@babel/helpers - typeof";return Ql=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ql(e)}function p$(e,t){if(Ql(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(Ql(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function g$(e){var t=p$(e,"string");return Ql(t)=="symbol"?t:t+""}function m$(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,g$(i.key),i)}}function Ws(e,t,n){return t&&m$(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function v$(e){return e[e.length-1]}function yd(e){return Array.isArray(e)?e.slice(0):[e]}function y$(e,t){e=e.slice(0);for(var n=[];e.length;){var i=e.splice(0,t);n.push(i)}return n}function bd(e){return Array.isArray(e)}function b$(e){return e!=null}function wp(e,t){var n=0,i=-1;for(var r of e){i=i+1;var s=t(r,i);if(s)n=n+1;else break}return n}function Do(e,t){var n=t.length;if(n!==0){var i=e.length;e.length=i+t.length;for(var r=0;r<n;++r)e[i+r]=t[r]}}function XB(e){return e.filter(function(t,n,i){return i.indexOf(t)===n})}function Is(e){for(var t="",n=0;n<e.length;n++){var i=e[n];if(i==="-")return parseInt(t,10);t+=i}throw new Error("malformatted revision: "+e)}function Br(e,t){var n=t?Is(t._rev)+1:1;return n+"-"+e}function _$(e){var t=e.split("."),n=t.length;return n===1?i=>i[e]:i=>{for(var r=i,s=0;s<n;++s){var o=t[s];if(r=r[o],typeof r>"u")return r}return r}}function Vt(e){return Object.assign({},e)}function w$(e){return Object.keys(e)[0]}function _d(e,t=!1){if(!e)return e;if(!t&&Array.isArray(e))return e.sort((i,r)=>typeof i=="string"&&typeof r=="string"?i.localeCompare(r):typeof i=="object"?1:-1).map(i=>_d(i,t));if(typeof e=="object"&&!Array.isArray(e)){var n={};return Object.keys(e).sort((i,r)=>i.localeCompare(r)).forEach(i=>{n[i]=_d(e[i],t)}),n}return e}function Mg(e){if(!e||e===null||typeof e!="object")return e;if(Array.isArray(e)){for(var t=new Array(e.length),n=t.length;n--;)t[n]=Mg(e[n]);return t}var i={};for(var r in e)i[r]=Mg(e[r]);return i}var Fn=Mg;function Pr(e,t,n){return Object.defineProperty(e,t,{get:function(){return n}}),n}var av=1;function mc(){return{lwt:av}}function Oi(){return""}function x$(e){return Object.assign({},e,{_meta:void 0,_deleted:void 0,_rev:void 0})}function C$(e,t,n){if(t.length!==n.length)return!1;for(var i=0,r=t.length;i<r;){var s=t[i],o=n[i];if(i++,s[e]!==o[e]||s._rev!==o._rev||s._meta.lwt!==o._meta.lwt)return!1}return!0}function Zl(e,t){return Zl=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,i){return n.__proto__=i,n},Zl(e,t)}function cv(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Zl(e,t)}function Dg(e){return Dg=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Dg(e)}function k$(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}function c1(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(c1=function(){return!!e})()}function S$(e,t,n){if(c1())return Reflect.construct.apply(null,arguments);var i=[null];i.push.apply(i,t);var r=new(e.bind.apply(e,i));return n&&Zl(r,n.prototype),r}function wd(e){var t=typeof Map=="function"?new Map:void 0;return wd=function(i){if(i===null||!k$(i))return i;if(typeof i!="function")throw new TypeError("Super expression must either be null or a function");if(t!==void 0){if(t.has(i))return t.get(i);t.set(i,r)}function r(){return S$(i,arguments,Dg(this).constructor)}return r.prototype=Object.create(i.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),Zl(r,i)},wd(e)}var At={isDevMode(){return!1},deepFreezeWhenDevMode(e){return e},tunnelErrorMessage(e){return`
        RxDB Error-Code: `+e+`.
        Hint: Error messages are not included in RxDB core to reduce build size.
        To show the full error messages and to ensure that you do not make any mistakes when using RxDB,
        use the dev-mode plugin when you are in development mode: https://rxdb.info/dev-mode.html?console=error
        `}};function E$(e){var t="";return Object.keys(e).length===0||(t+="-".repeat(20)+`
`,t+=`Parameters:
`,t+=Object.keys(e).map(n=>{var i="[object Object]";try{n==="errors"?i=e[n].map(r=>JSON.stringify(r,Object.getOwnPropertyNames(r))):i=JSON.stringify(e[n],function(r,s){return s===void 0?null:s},2)}catch{}return n+": "+i}).join(`
`),t+=`
`),t}function l1(e,t,n){return`
`+e+`
`+E$(n)}var M$=(function(e){function t(i,r,s={}){var o,a=l1(r,i,s);return o=e.call(this,a)||this,o.code=i,o.message=a,o.url=lv(i),o.parameters=s,o.rxdb=!0,o}cv(t,e);var n=t.prototype;return n.toString=function(){return this.message},Ws(t,[{key:"name",get:function(){return"RxError ("+this.code+")"}},{key:"typeError",get:function(){return!1}}])})(wd(Error)),D$=(function(e){function t(i,r,s={}){var o,a=l1(r,i,s);return o=e.call(this,a)||this,o.code=i,o.message=a,o.url=lv(i),o.parameters=s,o.rxdb=!0,o}cv(t,e);var n=t.prototype;return n.toString=function(){return this.message},Ws(t,[{key:"name",get:function(){return"RxTypeError ("+this.code+")"}},{key:"typeError",get:function(){return!0}}])})(wd(TypeError));function lv(e){return"https://rxdb.info/errors.html?console=errors#"+e}function u1(e){return`
Find out more about this error here: `+lv(e)+` 
`}function U(e,t){return new M$(e,At.tunnelErrorMessage(e)+u1(e),t)}function xd(e,t){return new D$(e,At.tunnelErrorMessage(e)+u1(e),t)}function Ua(e){return e&&e.status===409?e:!1}var $$={409:"document write conflict",422:"schema validation error",510:"attachment data missing"};function h1(e){return U("COL20",{name:$$[e.status],document:e.documentId,writeError:e})}var dh;function T$(){if(dh)return dh;if(typeof crypto>"u"||typeof crypto.subtle>"u"||typeof crypto.subtle.digest!="function")throw U("UT8",{args:{typeof_crypto:typeof crypto,typeof_crypto_subtle:typeof crypto?.subtle,typeof_crypto_subtle_digest:typeof crypto?.subtle?.digest}});return dh=crypto.subtle.digest.bind(crypto.subtle),dh}async function O$(e){var t=new TextEncoder().encode(e),n=await T$()("SHA-256",t),i=Array.prototype.map.call(new Uint8Array(n),r=>("00"+r.toString(16)).slice(-2)).join("");return i}var d1=O$;function I$(){return new Promise(e=>setTimeout(e,0))}function P$(e=0){return new Promise(t=>setTimeout(t,e))}function f1(e){return e&&typeof e.then=="function"?e:Promise.resolve(e)}var uv=Promise.resolve(!0),er=Promise.resolve(!1),hv=Promise.resolve(null),di=Promise.resolve();function xf(e=1e4){return typeof requestIdleCallback=="function"?new Promise(t=>{requestIdleCallback(()=>t(),{timeout:e})}):P$(0)}var xp=di;function R$(e=void 0){return xp=xp.then(()=>xf(e)),xp}function A$(e,t){return e.reduce((n,i)=>n.then(i),Promise.resolve(t))}var L$=/\./g,fy="abcdefghijklmnopqrstuvwxyz";function Go(e=10){for(var t="",n=0;n<e;n++)t+=fy.charAt(Math.floor(Math.random()*fy.length));return t}function p1(e){e+="";var t=e.charAt(0).toUpperCase();return t+e.substr(1)}function Zc(e){for(;e.charAt(0)===".";)e=e.substr(1);for(;e.slice(-1)===".";)e=e.slice(0,-1);return e}function Jl(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,i;if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(i=n;i--!==0;)if(!Jl(e[i],t[i]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();var r=Object.keys(e);if(n=r.length,n!==Object.keys(t).length)return!1;for(i=n;i--!==0;)if(!Object.prototype.hasOwnProperty.call(t,r[i]))return!1;for(i=n;i--!==0;){var s=r[i];if(!Jl(e[s],t[s]))return!1}return!0}return e!==e&&t!==t}var $g=e=>{var t=typeof e;return e!==null&&(t==="object"||t==="function")},Cp=new Set(["__proto__","prototype","constructor"]),N$=new Set("0123456789");function g1(e){var t=[],n="",i="start",r=!1;for(var s of e)switch(s){case"\\":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");r&&(n+=s),i="property",r=!r;break}case".":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="property";break}if(r){r=!1,n+=s;break}if(Cp.has(n))return[];t.push(n),n="",i="property";break}case"[":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="index";break}if(r){r=!1,n+=s;break}if(i==="property"){if(Cp.has(n))return[];t.push(n),n=""}i="index";break}case"]":{if(i==="index"){t.push(Number.parseInt(n,10)),n="",i="indexEnd";break}if(i==="indexEnd")throw new Error("Invalid character after an index")}default:{if(i==="index"&&!N$.has(s))throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");i==="start"&&(i="property"),r&&(r=!1,n+="\\"),n+=s}}switch(r&&(n+="\\"),i){case"property":{if(Cp.has(n))return[];t.push(n);break}case"index":throw new Error("Index was not closed");case"start":{t.push("");break}}return t}function m1(e,t){if(typeof t!="number"&&Array.isArray(e)){var n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}function F$(e,t){if(m1(e,t))throw new Error("Cannot use string index")}function Ya(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!t.includes(".")&&!t.includes("["))return e[t];if(!$g(e)||typeof t!="string")return n===void 0?e:n;var i=g1(t);if(i.length===0)return n;for(var r=0;r<i.length;r++){var s=i[r];if(m1(e,s)?e=r===i.length-1?void 0:null:e=e[s],e==null){if(r!==i.length-1)return n;break}}return e===void 0?n:e}function QB(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!$g(e)||typeof t!="string")return e;for(var i=e,r=g1(t),s=0;s<r.length;s++){var o=r[s];F$(e,o),s===r.length-1?e[o]=n:$g(e[o])||(e[o]=typeof r[s+1]=="number"?[]:{}),e=e[o]}return i}function Va(e,t){var n=e.get(t);if(typeof n>"u")throw new Error("missing value from map "+t);return n}function yi(e,t,n,i){var r=e.get(t);return typeof r>"u"&&(r=n(),e.set(t,r)),r}function Rt(e){var t=e.split("-"),n="RxDB";return t.forEach(i=>{n+=p1(i)}),n+="Plugin",new Error(`You are using a function which must be overwritten by a plugin.
        You should either prevent the usage of this function or add the plugin via:
            import { `+n+" } from 'rxdb/plugins/"+e+`';
            addRxPlugin(`+n+`);
        `)}function Cd(e){var t={name:e.name,message:e.message,rxdb:e.rxdb,parameters:e.parameters,extensions:e.extensions,code:e.code,url:e.url,stack:e.stack?e.stack.replace(/\n/g,` 
 `):void 0};return t}var kp=0;function Ri(){var e=Date.now();e=e+.01,e<=kp&&(e=kp+.01);var t=parseFloat(e.toFixed(2));return kp=t,t}function Q(e,t){if(!e)throw t||(t=""),new Error("ensureNotFalsy() is falsy: "+t);return e}var Pu={bufferSize:1,refCount:!0},z$="16.21.1",Sp={},j$="6da4936d1425ff3a5c44c02342c6daf791d266be3ae8479b8ec59e261df41b93",py=16,Ep=er,gy=!1;async function B$(){return gy||(gy=!0,Ep=(async()=>!!(Sp.premium&&typeof Sp.premium=="string"&&await d1(Sp.premium)===j$))()),Ep}var tu={preAddRxPlugin:[],preCreateRxDatabase:[],createRxDatabase:[],preCreateRxCollection:[],createRxCollection:[],createRxState:[],postCloseRxCollection:[],postRemoveRxCollection:[],preCreateRxSchema:[],createRxSchema:[],prePrepareRxQuery:[],preCreateRxQuery:[],prePrepareQuery:[],createRxDocument:[],postCreateRxDocument:[],preCreateRxStorageInstance:[],preStorageWrite:[],preMigrateDocument:[],postMigrateDocument:[],preCloseRxDatabase:[],postRemoveRxDatabase:[],postCleanup:[],preReplicationMasterWrite:[],preReplicationMasterWriteDocumentsHandle:[]};function zn(e,t){tu[e].length>0&&tu[e].forEach(n=>n(t))}async function $o(e,t){for(var n of tu[e])await n(t)}function eu(e,t){var n=t;n=n.replace(L$,".properties."),n="properties."+n,n=Zc(n);var i=Ya(e,n);return i}function W$(e,t,n){if(typeof t.primaryKey=="string")return n;var i=Hs(t,n),r=n[e];if(r&&r!==i)throw U("DOC19",{args:{documentData:n,existingPrimary:r,newPrimary:i},schema:t});return n[e]=i,n}function Ai(e){return typeof e=="string"?e:e.key}function H$(e){var t=Ai(e.primaryKey),n=eu(e,t);return Q(n.maxLength)}function Hs(e,t){if(typeof e.primaryKey=="string")return t[e.primaryKey];var n=e.primaryKey;return n.fields.map(i=>{var r=Ya(t,i);if(typeof r>"u")throw U("DOC18",{args:{field:i,documentData:t}});return r}).join(n.separator)}function U$(e){var t=_d(e,!0);return t}function Y$(e){return["_deleted",e]}function Cf(e){e=Vt(e);var t=Ai(e.primaryKey);e.properties=Vt(e.properties),e.additionalProperties=!1,Object.prototype.hasOwnProperty.call(e,"keyCompression")||(e.keyCompression=!1),e.indexes=e.indexes?e.indexes.slice(0):[],e.required=e.required?e.required.slice(0):[],e.encrypted=e.encrypted?e.encrypted.slice(0):[],e.properties._rev={type:"string",minLength:1},e.properties._attachments={type:"object"},e.properties._deleted={type:"boolean"},e.properties._meta=q$,e.required=e.required?e.required.slice(0):[],e.required.push("_deleted"),e.required.push("_rev"),e.required.push("_meta"),e.required.push("_attachments");var n=v1(e);Do(e.required,n),e.required=e.required.filter(s=>!s.includes(".")).filter((s,o,a)=>a.indexOf(s)===o),e.version=e.version||0;var i=e.indexes.map(s=>{var o=bd(s)?s.slice(0):[s];return o.includes(t)||o.push(t),o[0]!=="_deleted"&&o.unshift("_deleted"),o});i.length===0&&i.push(Y$(t)),i.push(["_meta.lwt",t]),e.internalIndexes&&e.internalIndexes.map(s=>{i.push(s)});var r=new Set;return i.filter(s=>{var o=s.join(",");return r.has(o)?!1:(r.add(o),!0)}),e.indexes=i,e}var V$=1e15,q$={type:"object",properties:{lwt:{type:"number",minimum:av,maximum:V$,multipleOf:.01}},additionalProperties:!0,required:["lwt"]};function v1(e){var t=Object.keys(e.properties).filter(i=>e.properties[i].final),n=Ai(e.primaryKey);return t.push(n),typeof e.primaryKey!="string"&&e.primaryKey.fields.forEach(i=>t.push(i)),t}function K$(e,t){for(var n=Object.keys(e.defaultValues),i=0;i<n.length;++i){var r=n[i];(!Object.prototype.hasOwnProperty.call(t,r)||typeof t[r]>"u")&&(t[r]=e.defaultValues[r])}return t}var y1=(function(){function e(n,i){if(this.jsonSchema=n,this.hashFunction=i,this.indexes=G$(this.jsonSchema),this.primaryPath=Ai(this.jsonSchema.primaryKey),!n.properties[this.primaryPath].maxLength)throw U("SC39",{schema:n});this.finalFields=v1(this.jsonSchema)}var t=e.prototype;return t.validateChange=function(i,r){this.finalFields.forEach(s=>{if(!Jl(i[s],r[s]))throw U("DOC9",{dataBefore:i,dataAfter:r,fieldName:s,schema:this.jsonSchema})})},t.getDocumentPrototype=function(){var i={},r=eu(this.jsonSchema,"");return Object.keys(r).forEach(s=>{var o=s;i.__defineGetter__(s,function(){if(!(!this.get||typeof this.get!="function")){var a=this.get(o);return a}}),Object.defineProperty(i,s+"$",{get:function(){return this.get$(o)},enumerable:!1,configurable:!1}),Object.defineProperty(i,s+"$$",{get:function(){return this.get$$(o)},enumerable:!1,configurable:!1}),Object.defineProperty(i,s+"_",{get:function(){return this.populate(o)},enumerable:!1,configurable:!1})}),Pr(this,"getDocumentPrototype",()=>i),i},t.getPrimaryOfDocumentData=function(i){return Hs(this.jsonSchema,i)},Ws(e,[{key:"version",get:function(){return this.jsonSchema.version}},{key:"defaultValues",get:function(){var n={};return Object.entries(this.jsonSchema.properties).filter(([,i])=>Object.prototype.hasOwnProperty.call(i,"default")).forEach(([i,r])=>n[i]=r.default),Pr(this,"defaultValues",n)}},{key:"hash",get:function(){return Pr(this,"hash",this.hashFunction(JSON.stringify(this.jsonSchema)))}}])})();function G$(e){return(e.indexes||[]).map(t=>bd(t)?t:[t])}function X$(e){var t=e.version?e.version:0,n=0;return new Array(t).fill(0).map(()=>n++)}function Q$(e,t,n=!0){n&&zn("preCreateRxSchema",e);var i=Cf(e);i=U$(i),At.deepFreezeWhenDevMode(i);var r=new y1(i,t);return zn("createRxSchema",r),r}function be(e){return typeof e=="function"}function Z$(e){return be(e?.lift)}function fr(e){return function(t){if(Z$(t))return t.lift(function(n){try{return e(n,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}var Tg=function(e,t){return Tg=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])},Tg(e,t)};function Xo(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");Tg(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function J$(e,t,n,i){function r(s){return s instanceof n?s:new n(function(o){o(s)})}return new(n||(n=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(h){o(h)}}function c(u){try{l(i.throw(u))}catch(h){o(h)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(e,t||[])).next())})}function b1(e,t){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},i,r,s,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=a(0),o.throw=a(1),o.return=a(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(l){return function(u){return c([l,u])}}function c(l){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(n=0)),n;)try{if(i=1,r&&(s=l[0]&2?r.return:l[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,l[1])).done)return s;switch(r=0,s&&(l=[l[0]&2,s.value]),l[0]){case 0:case 1:s=l;break;case 4:return n.label++,{value:l[1],done:!1};case 5:n.label++,r=l[1],l=[0];continue;case 7:l=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(l[0]===6||l[0]===2)){n=0;continue}if(l[0]===3&&(!s||l[1]>s[0]&&l[1]<s[3])){n.label=l[1];break}if(l[0]===6&&n.label<s[1]){n.label=s[1],s=l;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(l);break}s[2]&&n.ops.pop(),n.trys.pop();continue}l=t.call(e,n)}catch(u){l=[6,u],r=0}finally{i=s=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function qa(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],i=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function To(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),r,s=[],o;try{for(;(t===void 0||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}function Oo(e,t,n){if(n||arguments.length===2)for(var i=0,r=t.length,s;i<r;i++)(s||!(i in t))&&(s||(s=Array.prototype.slice.call(t,0,i)),s[i]=t[i]);return e.concat(s||Array.prototype.slice.call(t))}function Pa(e){return this instanceof Pa?(this.v=e,this):new Pa(e)}function tT(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(e,t||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(f){return function(p){return Promise.resolve(p).then(f,h)}}function a(f,p){i[f]&&(r[f]=function(g){return new Promise(function(m,b){s.push([f,g,m,b])>1||c(f,g)})},p&&(r[f]=p(r[f])))}function c(f,p){try{l(i[f](p))}catch(g){d(s[0][3],g)}}function l(f){f.value instanceof Pa?Promise.resolve(f.value.v).then(u,h):d(s[0][2],f)}function u(f){c("next",f)}function h(f){c("throw",f)}function d(f,p){f(p),s.shift(),s.length&&c(s[0][0],s[0][1])}}function eT(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof qa=="function"?qa(e):e[Symbol.iterator](),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(s){n[s]=e[s]&&function(o){return new Promise(function(a,c){o=e[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var _1=(function(e){return e&&typeof e.length=="number"&&typeof e!="function"});function w1(e){return be(e?.then)}function dv(e){var t=function(i){Error.call(i),i.stack=new Error().stack},n=e(t);return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Mp=dv(function(e){return function(n){e(this),this.message=n?n.length+` errors occurred during unsubscription:
`+n.map(function(i,r){return r+1+") "+i.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=n}});function Og(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var kf=(function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var t,n,i,r,s;if(!this.closed){this.closed=!0;var o=this._parentage;if(o)if(this._parentage=null,Array.isArray(o))try{for(var a=qa(o),c=a.next();!c.done;c=a.next()){var l=c.value;l.remove(this)}}catch(g){t={error:g}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(t)throw t.error}}else o.remove(this);var u=this.initialTeardown;if(be(u))try{u()}catch(g){s=g instanceof Mp?g.errors:[g]}var h=this._finalizers;if(h){this._finalizers=null;try{for(var d=qa(h),f=d.next();!f.done;f=d.next()){var p=f.value;try{my(p)}catch(g){s=s??[],g instanceof Mp?s=Oo(Oo([],To(s)),To(g.errors)):s.push(g)}}}catch(g){i={error:g}}finally{try{f&&!f.done&&(r=d.return)&&r.call(d)}finally{if(i)throw i.error}}}if(s)throw new Mp(s)}},e.prototype.add=function(t){var n;if(t&&t!==this)if(this.closed)my(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}},e.prototype._hasParent=function(t){var n=this._parentage;return n===t||Array.isArray(n)&&n.includes(t)},e.prototype._addParent=function(t){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t},e.prototype._removeParent=function(t){var n=this._parentage;n===t?this._parentage=null:Array.isArray(n)&&Og(n,t)},e.prototype.remove=function(t){var n=this._finalizers;n&&Og(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e})(),x1=kf.EMPTY;function C1(e){return e instanceof kf||e&&"closed"in e&&be(e.remove)&&be(e.add)&&be(e.unsubscribe)}function my(e){be(e)?e():e.unsubscribe()}var nT={Promise:void 0},iT={setTimeout:function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];return setTimeout.apply(void 0,Oo([e,t],To(n)))},clearTimeout:function(e){return clearTimeout(e)},delegate:void 0};function k1(e){iT.setTimeout(function(){throw e})}function vy(){}function Ah(e){e()}var fv=(function(e){Xo(t,e);function t(n){var i=e.call(this)||this;return i.isStopped=!1,n?(i.destination=n,C1(n)&&n.add(i)):i.destination=oT,i}return t.create=function(n,i,r){return new Ka(n,i,r)},t.prototype.next=function(n){this.isStopped||this._next(n)},t.prototype.error=function(n){this.isStopped||(this.isStopped=!0,this._error(n))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(n){this.destination.next(n)},t.prototype._error=function(n){try{this.destination.error(n)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t})(kf),rT=(function(){function e(t){this.partialObserver=t}return e.prototype.next=function(t){var n=this.partialObserver;if(n.next)try{n.next(t)}catch(i){fh(i)}},e.prototype.error=function(t){var n=this.partialObserver;if(n.error)try{n.error(t)}catch(i){fh(i)}else fh(t)},e.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(n){fh(n)}},e})(),Ka=(function(e){Xo(t,e);function t(n,i,r){var s=e.call(this)||this,o;return be(n)||!n?o={next:n??void 0,error:i??void 0,complete:r??void 0}:o=n,s.destination=new rT(o),s}return t})(fv);function fh(e){k1(e)}function sT(e){throw e}var oT={closed:!0,next:vy,error:sT,complete:vy},pv=(function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"})();function Ru(e){return e}function aT(e){return e.length===0?Ru:e.length===1?e[0]:function(n){return e.reduce(function(i,r){return r(i)},n)}}var ti=(function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(t,n,i){var r=this,s=lT(t)?t:new Ka(t,n,i);return Ah(function(){var o=r,a=o.operator,c=o.source;s.add(a?a.call(s,c):c?r._subscribe(s):r._trySubscribe(s))}),s},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(n){t.error(n)}},e.prototype.forEach=function(t,n){var i=this;return n=yy(n),new n(function(r,s){var o=new Ka({next:function(a){try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});i.subscribe(o)})},e.prototype._subscribe=function(t){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(t)},e.prototype[pv]=function(){return this},e.prototype.pipe=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return aT(t)(this)},e.prototype.toPromise=function(t){var n=this;return t=yy(t),new t(function(i,r){var s;n.subscribe(function(o){return s=o},function(o){return r(o)},function(){return i(s)})})},e.create=function(t){return new e(t)},e})();function yy(e){var t;return(t=e??nT.Promise)!==null&&t!==void 0?t:Promise}function cT(e){return e&&be(e.next)&&be(e.error)&&be(e.complete)}function lT(e){return e&&e instanceof fv||cT(e)&&C1(e)}function S1(e){return be(e[pv])}function E1(e){return Symbol.asyncIterator&&be(e?.[Symbol.asyncIterator])}function M1(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function uT(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var D1=uT();function $1(e){return be(e?.[D1])}function T1(e){return tT(this,arguments,function(){var n,i,r,s;return b1(this,function(o){switch(o.label){case 0:n=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,Pa(n.read())];case 3:return i=o.sent(),r=i.value,s=i.done,s?[4,Pa(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return[4,Pa(r)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return n.releaseLock(),[7];case 10:return[2]}})})}function O1(e){return be(e?.getReader)}function Qr(e){if(e instanceof ti)return e;if(e!=null){if(S1(e))return hT(e);if(_1(e))return dT(e);if(w1(e))return fT(e);if(E1(e))return I1(e);if($1(e))return pT(e);if(O1(e))return gT(e)}throw M1(e)}function hT(e){return new ti(function(t){var n=e[pv]();if(be(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function dT(e){return new ti(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function fT(e){return new ti(function(t){e.then(function(n){t.closed||(t.next(n),t.complete())},function(n){return t.error(n)}).then(null,k1)})}function pT(e){return new ti(function(t){var n,i;try{for(var r=qa(e),s=r.next();!s.done;s=r.next()){var o=s.value;if(t.next(o),t.closed)return}}catch(a){n={error:a}}finally{try{s&&!s.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}t.complete()})}function I1(e){return new ti(function(t){mT(e,t).catch(function(n){return t.error(n)})})}function gT(e){return I1(T1(e))}function mT(e,t){var n,i,r,s;return J$(this,void 0,void 0,function(){var o,a;return b1(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),n=eT(e),c.label=1;case 1:return[4,n.next()];case 2:if(i=c.sent(),!!i.done)return[3,4];if(o=i.value,t.next(o),t.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=c.sent(),r={error:a},[3,11];case 6:return c.trys.push([6,,9,10]),i&&!i.done&&(s=n.return)?[4,s.call(n)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(r)throw r.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function Wr(e,t,n,i,r){return new vT(e,t,n,i,r)}var vT=(function(e){Xo(t,e);function t(n,i,r,s,o,a){var c=e.call(this,n)||this;return c.onFinalize=o,c.shouldUnsubscribe=a,c._next=i?function(l){try{i(l)}catch(u){n.error(u)}}:e.prototype._next,c._error=s?function(l){try{s(l)}catch(u){n.error(u)}finally{this.unsubscribe()}}:e.prototype._error,c._complete=r?function(){try{r()}catch(l){n.error(l)}finally{this.unsubscribe()}}:e.prototype._complete,c}return t.prototype.unsubscribe=function(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var i=this.closed;e.prototype.unsubscribe.call(this),!i&&((n=this.onFinalize)===null||n===void 0||n.call(this))}},t})(fv),P1={now:function(){return(P1.delegate||Date).now()},delegate:void 0};function yT(e){return e&&be(e.schedule)}function gv(e){return e[e.length-1]}function bT(e){return be(gv(e))?e.pop():void 0}function vc(e){return yT(gv(e))?e.pop():void 0}function R1(e,t){return typeof gv(e)=="number"?e.pop():t}function Es(e,t,n,i,r){i===void 0&&(i=0),r===void 0&&(r=!1);var s=t.schedule(function(){n(),r?e.add(this.schedule(null,i)):this.unsubscribe()},i);if(e.add(s),!r)return s}var _T=Array.isArray,wT=Object.getPrototypeOf,xT=Object.prototype,CT=Object.keys;function kT(e){if(e.length===1){var t=e[0];if(_T(t))return{args:t,keys:null};if(ST(t)){var n=CT(t);return{args:n.map(function(i){return t[i]}),keys:n}}}return{args:e,keys:null}}function ST(e){return e&&typeof e=="object"&&wT(e)===xT}function A1(e,t){return t===void 0&&(t=0),fr(function(n,i){n.subscribe(Wr(i,function(r){return Es(i,e,function(){return i.next(r)},t)},function(){return Es(i,e,function(){return i.complete()},t)},function(r){return Es(i,e,function(){return i.error(r)},t)}))})}function L1(e,t){return t===void 0&&(t=0),fr(function(n,i){i.add(e.schedule(function(){return n.subscribe(i)},t))})}function ET(e,t){return Qr(e).pipe(L1(t),A1(t))}function MT(e,t){return Qr(e).pipe(L1(t),A1(t))}function DT(e,t){return new ti(function(n){var i=0;return t.schedule(function(){i===e.length?n.complete():(n.next(e[i++]),n.closed||this.schedule())})})}function $T(e,t){return new ti(function(n){var i;return Es(n,t,function(){i=e[D1](),Es(n,t,function(){var r,s,o;try{r=i.next(),s=r.value,o=r.done}catch(a){n.error(a);return}o?n.complete():n.next(s)},0,!0)}),function(){return be(i?.return)&&i.return()}})}function N1(e,t){if(!e)throw new Error("Iterable cannot be null");return new ti(function(n){Es(n,t,function(){var i=e[Symbol.asyncIterator]();Es(n,t,function(){i.next().then(function(r){r.done?n.complete():n.next(r.value)})},0,!0)})})}function TT(e,t){return N1(T1(e),t)}function OT(e,t){if(e!=null){if(S1(e))return ET(e,t);if(_1(e))return DT(e,t);if(w1(e))return MT(e,t);if(E1(e))return N1(e,t);if($1(e))return $T(e,t);if(O1(e))return TT(e,t)}throw M1(e)}function yc(e,t){return t?OT(e,t):Qr(e)}function Ht(e,t){return fr(function(n,i){var r=0;n.subscribe(Wr(i,function(s){i.next(e.call(t,s,r++))}))})}var IT=Array.isArray;function PT(e,t){return IT(t)?e.apply(void 0,Oo([],To(t))):e(t)}function RT(e){return Ht(function(t){return PT(e,t)})}function AT(e,t){return e.reduce(function(n,i,r){return n[i]=t[r],n},{})}function mv(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=vc(e),i=bT(e),r=kT(e),s=r.args,o=r.keys;if(s.length===0)return yc([],n);var a=new ti(LT(s,n,o?function(c){return AT(o,c)}:Ru));return i?a.pipe(RT(i)):a}function LT(e,t,n){return n===void 0&&(n=Ru),function(i){by(t,function(){for(var r=e.length,s=new Array(r),o=r,a=r,c=function(u){by(t,function(){var h=yc(e[u],t),d=!1;h.subscribe(Wr(i,function(f){s[u]=f,d||(d=!0,a--),a||i.next(n(s.slice()))},function(){--o||i.complete()}))},i)},l=0;l<r;l++)c(l)},i)}}function by(e,t,n){e?Es(n,e,t):t()}function NT(e,t,n,i,r,s,o,a){var c=[],l=0,u=0,h=!1,d=function(){h&&!c.length&&!l&&t.complete()},f=function(g){return l<i?p(g):c.push(g)},p=function(g){l++;var m=!1;Qr(n(g,u++)).subscribe(Wr(t,function(b){t.next(b)},function(){m=!0},void 0,function(){if(m)try{l--;for(var b=function(){var _=c.shift();o||p(_)};c.length&&l<i;)b();d()}catch(_){t.error(_)}}))};return e.subscribe(Wr(t,f,function(){h=!0,d()})),function(){}}function nr(e,t,n){return n===void 0&&(n=1/0),be(t)?nr(function(i,r){return Ht(function(s,o){return t(i,s,r,o)})(Qr(e(i,r)))},n):(typeof t=="number"&&(n=t),fr(function(i,r){return NT(i,r,e,n)}))}function vv(e){return e===void 0&&(e=1/0),nr(Ru,e)}function FT(){return vv(1)}var zT=dv(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Fe=(function(e){Xo(t,e);function t(){var n=e.call(this)||this;return n.closed=!1,n.currentObservers=null,n.observers=[],n.isStopped=!1,n.hasError=!1,n.thrownError=null,n}return t.prototype.lift=function(n){var i=new _y(this,this);return i.operator=n,i},t.prototype._throwIfClosed=function(){if(this.closed)throw new zT},t.prototype.next=function(n){var i=this;Ah(function(){var r,s;if(i._throwIfClosed(),!i.isStopped){i.currentObservers||(i.currentObservers=Array.from(i.observers));try{for(var o=qa(i.currentObservers),a=o.next();!a.done;a=o.next()){var c=a.value;c.next(n)}}catch(l){r={error:l}}finally{try{a&&!a.done&&(s=o.return)&&s.call(o)}finally{if(r)throw r.error}}}})},t.prototype.error=function(n){var i=this;Ah(function(){if(i._throwIfClosed(),!i.isStopped){i.hasError=i.isStopped=!0,i.thrownError=n;for(var r=i.observers;r.length;)r.shift().error(n)}})},t.prototype.complete=function(){var n=this;Ah(function(){if(n._throwIfClosed(),!n.isStopped){n.isStopped=!0;for(var i=n.observers;i.length;)i.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(n){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,n)},t.prototype._subscribe=function(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)},t.prototype._innerSubscribe=function(n){var i=this,r=this,s=r.hasError,o=r.isStopped,a=r.observers;return s||o?x1:(this.currentObservers=null,a.push(n),new kf(function(){i.currentObservers=null,Og(a,n)}))},t.prototype._checkFinalizedStatuses=function(n){var i=this,r=i.hasError,s=i.thrownError,o=i.isStopped;r?n.error(s):o&&n.complete()},t.prototype.asObservable=function(){var n=new ti;return n.source=this,n},t.create=function(n,i){return new _y(n,i)},t})(ti),_y=(function(e){Xo(t,e);function t(n,i){var r=e.call(this)||this;return r.destination=n,r.source=i,r}return t.prototype.next=function(n){var i,r;(r=(i=this.destination)===null||i===void 0?void 0:i.next)===null||r===void 0||r.call(i,n)},t.prototype.error=function(n){var i,r;(r=(i=this.destination)===null||i===void 0?void 0:i.error)===null||r===void 0||r.call(i,n)},t.prototype.complete=function(){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||i===void 0||i.call(n)},t.prototype._subscribe=function(n){var i,r;return(r=(i=this.source)===null||i===void 0?void 0:i.subscribe(n))!==null&&r!==void 0?r:x1},t})(Fe);function wy(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return FT()(yc(e,vc(e)))}var jT=new ti(function(e){return e.complete()});function xy(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=vc(e);return yc(e,n)}function nu(e,t){return t===void 0&&(t=Ru),e=e??BT,fr(function(n,i){var r,s=!0;n.subscribe(Wr(i,function(o){var a=t(o);(s||!e(r,a))&&(s=!1,r=a,i.next(o))}))})}function BT(e,t){return e===t}function Ot(e,t){return fr(function(n,i){var r=0;n.subscribe(Wr(i,function(s){return e.call(t,s,r++)&&i.next(s)}))})}var WT=dv(function(e){return function(){e(this),this.name="EmptyError",this.message="no elements in sequence"}});function HT(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=vc(e),i=R1(e,1/0);return fr(function(r,s){vv(i)(yc(Oo([r],To(e)),n)).subscribe(s)})}function UT(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return HT.apply(void 0,Oo([],To(e)))}var ui=(function(e){Xo(t,e);function t(n){var i=e.call(this)||this;return i._value=n,i}return Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),t.prototype._subscribe=function(n){var i=e.prototype._subscribe.call(this,n);return!i.closed&&n.next(this._value),i},t.prototype.getValue=function(){var n=this,i=n.hasError,r=n.thrownError,s=n._value;if(i)throw r;return this._throwIfClosed(),s},t.prototype.next=function(n){e.prototype.next.call(this,this._value=n)},t})(Fe),YT=(function(e){Xo(t,e);function t(n,i,r){n===void 0&&(n=1/0),i===void 0&&(i=1/0),r===void 0&&(r=P1);var s=e.call(this)||this;return s._bufferSize=n,s._windowTime=i,s._timestampProvider=r,s._buffer=[],s._infiniteTimeWindow=!0,s._infiniteTimeWindow=i===1/0,s._bufferSize=Math.max(1,n),s._windowTime=Math.max(1,i),s}return t.prototype.next=function(n){var i=this,r=i.isStopped,s=i._buffer,o=i._infiniteTimeWindow,a=i._timestampProvider,c=i._windowTime;r||(s.push(n),!o&&s.push(a.now()+c)),this._trimBuffer(),e.prototype.next.call(this,n)},t.prototype._subscribe=function(n){this._throwIfClosed(),this._trimBuffer();for(var i=this._innerSubscribe(n),r=this,s=r._infiniteTimeWindow,o=r._buffer,a=o.slice(),c=0;c<a.length&&!n.closed;c+=s?1:2)n.next(a[c]);return this._checkFinalizedStatuses(n),i},t.prototype._trimBuffer=function(){var n=this,i=n._bufferSize,r=n._timestampProvider,s=n._buffer,o=n._infiniteTimeWindow,a=(o?1:2)*i;if(i<1/0&&a<s.length&&s.splice(0,s.length-a),!o){for(var c=r.now(),l=0,u=1;u<s.length&&s[u]<=c;u+=2)l=u;l&&s.splice(0,l+1)}},t})(Fe);function VT(e){e===void 0&&(e={});var t=e.connector,n=t===void 0?function(){return new Fe}:t,i=e.resetOnError,r=i===void 0?!0:i,s=e.resetOnComplete,o=s===void 0?!0:s,a=e.resetOnRefCountZero,c=a===void 0?!0:a;return function(l){var u,h,d,f=0,p=!1,g=!1,m=function(){h?.unsubscribe(),h=void 0},b=function(){m(),u=d=void 0,p=g=!1},_=function(){var C=u;b(),C?.unsubscribe()};return fr(function(C,S){f++,!g&&!p&&m();var k=d=d??n();S.add(function(){f--,f===0&&!g&&!p&&(h=Dp(_,c))}),k.subscribe(S),!u&&f>0&&(u=new Ka({next:function($){return k.next($)},error:function($){g=!0,m(),h=Dp(b,r,$),k.error($)},complete:function(){p=!0,m(),h=Dp(b,o),k.complete()}}),Qr(C).subscribe(u))})(l)}}function Dp(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(t===!0){e();return}if(t!==!1){var r=new Ka({next:function(){r.unsubscribe(),e()}});return Qr(t.apply(void 0,Oo([],To(n)))).subscribe(r)}}function Au(e,t,n){var i,r,s,o,a=!1;return e&&typeof e=="object"?(i=e.bufferSize,o=i===void 0?1/0:i,r=e.windowTime,t=r===void 0?1/0:r,s=e.refCount,a=s===void 0?!1:s,n=e.scheduler):o=e??1/0,VT({connector:function(){return new YT(o,t,n)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:a})}function Lu(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=vc(e);return fr(function(i,r){(n?wy(e,i,n):wy(e,i)).subscribe(r)})}function F1(e,t){return fr(function(n,i){var r=null,s=0,o=!1,a=function(){return o&&!r&&i.complete()};n.subscribe(Wr(i,function(c){r?.unsubscribe();var l=0,u=s++;Qr(e(c,u)).subscribe(r=Wr(i,function(h){return i.next(t?t(c,h,u,l++):h)},function(){r=null,a()}))},function(){o=!0,a()}))})}function z1(e){return e.documentData?e.documentData:e.previousDocumentData}function qT(e){switch(e.operation){case"INSERT":return{operation:e.operation,id:e.documentId,doc:e.documentData,previous:null};case"UPDATE":return{operation:e.operation,id:e.documentId,doc:At.deepFreezeWhenDevMode(e.documentData),previous:e.previousDocumentData?e.previousDocumentData:"UNKNOWN"};case"DELETE":return{operation:e.operation,id:e.documentId,doc:null,previous:e.previousDocumentData}}}var KT=new Map;function j1(e){return yi(KT,e,()=>{for(var t=new Array(e.events.length),n=e.events,i=e.collectionName,r=e.isLocal,s=At.deepFreezeWhenDevMode,o=0;o<n.length;o++){var a=n[o];t[o]={documentId:a.documentId,collectionName:i,isLocal:r,operation:a.operation,documentData:s(a.documentData),previousDocumentData:s(a.previousDocumentData)}}return t})}function Rr(e,t){return new Promise(function(n,i){var r=new Ka({next:function(s){n(s),r.unsubscribe()},error:i,complete:function(){i(new WT)}});e.subscribe(r)})}function Ig(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=vc(e),i=R1(e,1/0),r=e;return r.length?r.length===1?Qr(r[0]):vv(i)(yc(r,n)):jT}var Dl="￿",$l=Number.MIN_SAFE_INTEGER;function GT(e,t){var n=t.selector,i=e.indexes?e.indexes.slice(0):[];t.index&&(i=[t.index]);var r=!!t.sort.find(u=>Object.values(u)[0]==="desc"),s=new Set;Object.keys(n).forEach(u=>{var h=eu(e,u);h&&h.type==="boolean"&&Object.prototype.hasOwnProperty.call(n[u],"$eq")&&s.add(u)});var o=t.sort.map(u=>Object.keys(u)[0]),a=o.filter(u=>!s.has(u)).join(","),c=-1,l;if(i.forEach(u=>{var h=!0,d=!0,f=u.map(_=>{var C=n[_],S=C?Object.keys(C):[],k={};if(!C||!S.length){var $=d?$l:Dl;k={startKey:$,endKey:h?Dl:$l,inclusiveStart:!0,inclusiveEnd:!0}}else S.forEach(D=>{if(yv.has(D)){var w=C[D],x=JT(D,w);k=Object.assign(k,x)}});return typeof k.startKey>"u"&&(k.startKey=$l),typeof k.endKey>"u"&&(k.endKey=Dl),typeof k.inclusiveStart>"u"&&(k.inclusiveStart=!0),typeof k.inclusiveEnd>"u"&&(k.inclusiveEnd=!0),d&&!k.inclusiveStart&&(d=!1),h&&!k.inclusiveEnd&&(h=!1),k}),p=f.map(_=>_.startKey),g=f.map(_=>_.endKey),m={index:u,startKeys:p,endKeys:g,inclusiveEnd:h,inclusiveStart:d,sortSatisfiedByIndex:!r&&a===u.filter(_=>!s.has(_)).join(","),selectorSatisfiedByIndex:ZT(u,t.selector,p,g)},b=tO(e,t,m);(b>=c||t.index)&&(c=b,l=m)}),!l)throw U("SNH",{query:t});return l}var yv=new Set(["$eq","$gt","$gte","$lt","$lte"]),XT=new Set(["$eq","$gt","$gte"]),QT=new Set(["$eq","$lt","$lte"]);function ZT(e,t,n,i){var r=Object.entries(t),s=r.find(([D,w])=>{if(!e.includes(D))return!0;var x=Object.entries(w).find(([M,O])=>!yv.has(M));return x});if(s||t.$and||t.$or)return!1;var o=[],a=new Set;for(var[c,l]of Object.entries(t)){if(!e.includes(c))return!1;var u=Object.keys(l).filter(D=>XT.has(D));if(u.length>1)return!1;var h=u[0];if(h&&a.add(c),h!=="$eq"){if(o.length>0)return!1;o.push(h)}}var d=[],f=new Set;for(var[p,g]of Object.entries(t)){if(!e.includes(p))return!1;var m=Object.keys(g).filter(D=>QT.has(D));if(m.length>1)return!1;var b=m[0];if(b&&f.add(p),b!=="$eq"){if(d.length>0)return!1;d.push(b)}}var _=0;for(var C of e){for(var S of[a,f]){if(!S.has(C)&&S.size>0)return!1;S.delete(C)}var k=n[_],$=i[_];if(k!==$&&a.size>0&&f.size>0)return!1;_++}return!0}function JT(e,t){switch(e){case"$eq":return{startKey:t,endKey:t,inclusiveEnd:!0,inclusiveStart:!0};case"$lte":return{endKey:t,inclusiveEnd:!0};case"$gte":return{startKey:t,inclusiveStart:!0};case"$lt":return{endKey:t,inclusiveEnd:!1};case"$gt":return{startKey:t,inclusiveStart:!1};default:throw new Error("SNH")}}function tO(e,t,n){var i=0,r=u=>{u>0&&(i=i+u)},s=10,o=wp(n.startKeys,u=>u!==$l&&u!==Dl);r(o*s);var a=wp(n.startKeys,u=>u!==Dl&&u!==$l);r(a*s);var c=wp(n.startKeys,(u,h)=>u===n.endKeys[h]);r(c*s*1.5);var l=n.sortSatisfiedByIndex?5:0;return r(l),i}class Sf extends Error{}const iu=Symbol("missing"),B1=Object.freeze(new Error("mingo: cycle detected while processing object/array")),Ef=e=>{const t=Lh(e);let n=0,i=t.length;for(;i;)n=(n<<5)-n^t.charCodeAt(--i);return n>>>0},ms=e=>typeof e!="object"&&typeof e!="function"||e===null,W1=e=>ms(e)||su(e)||_o(e),H1={undefined:1,null:2,number:3,string:4,symbol:5,object:6,array:7,arraybuffer:8,boolean:9,date:10,regexp:11,function:12},Ps=(e,t)=>{e===iu&&(e=void 0),t===iu&&(t=void 0);const[n,i]=[e,t].map(r=>H1[ru(r)]||0);return n!==i?n-i:Ms(e,t)?0:e<t?-1:e>t?1:0};class kd extends Map{#t=Ef;#n=new Map;#e=t=>{const n=this.#t(t);return[(this.#n.get(n)||[]).find(i=>Ms(i,t)),n]};constructor(){super()}static init(t){const n=new kd;return t&&(n.#t=t),n}clear(){super.clear(),this.#n.clear()}delete(t){if(ms(t))return super.delete(t);const[n,i]=this.#e(t);return super.delete(n)?(this.#n.set(i,this.#n.get(i).filter(r=>!Ms(r,n))),!0):!1}get(t){if(ms(t))return super.get(t);const[n,i]=this.#e(t);return super.get(n)}has(t){if(ms(t))return super.has(t);const[n,i]=this.#e(t);return super.has(n)}set(t,n){if(ms(t))return super.set(t,n);const[i,r]=this.#e(t);if(super.has(i))super.set(i,n);else{super.set(t,n);const s=this.#n.get(r)||[];s.push(t),this.#n.set(r,s)}return this}get size(){return super.size}}function Oe(e,t){if(!e)throw new Sf(t)}const eO=Object.keys(H1).reduce((e,t)=>(e["[object "+t[0].toUpperCase()+t.substring(1)+"]"]=t,e),{});function ru(e){const t=Object.prototype.toString.call(e);return t==="[object Object]"?e?.constructor?.name?.toLowerCase()||"object":eO[t]||t.substring(8,t.length-1).toLowerCase()}const Ra=e=>typeof e=="boolean",Ii=e=>typeof e=="string",nO=e=>typeof e=="symbol",qn=e=>!isNaN(e)&&typeof e=="number",Pt=Array.isArray;function wn(e){if(!e)return!1;const t=Object.getPrototypeOf(e);return(t===Object.prototype||t===null)&&ru(e)==="object"}const U1=e=>!ms(e),su=e=>e instanceof Date,_o=e=>e instanceof RegExp,bv=e=>typeof e=="function",ei=e=>e==null,iO=(e,t=!0)=>!!e||t&&e==="",_v=e=>ei(e)||Ii(e)&&!e||Pt(e)&&e.length===0||wn(e)&&Object.keys(e).length===0,Nu=e=>Pt(e)?e:[e],Ga=(e,t)=>!!e&&Object.prototype.hasOwnProperty.call(e,t),rO=e=>typeof ArrayBuffer<"u"&&ArrayBuffer.isView(e),ou=(e,t)=>{if(ei(e)||Ra(e)||qn(e)||Ii(e))return e;if(su(e))return new Date(e);if(_o(e))return new RegExp(e);if(rO(e)){const n=e.constructor;return new n(e)}if(t instanceof Set||(t=new Set),t.has(e))throw B1;t.add(e);try{if(Pt(e)){const n=new Array(e.length);for(let i=0;i<e.length;i++)n[i]=ou(e[i],t);return n}if(wn(e)){const n={};for(const i of Object.keys(e))n[i]=ou(e[i],t);return n}}finally{t.delete(e)}return e},Cy=e=>e===iu;function Pg(e,t){if(Cy(e)||ei(e))return t;if(Cy(t)||ei(t))return e;if(ms(e)||ms(t))return t;Pt(e)&&Pt(t)&&Oe(e.length===t.length,"arrays must be of equal length to merge.");for(const n of Object.keys(t))e[n]=Pg(e[n],t[n]);return e}function sO(e,t=Ef){const n=[kd.init(t),kd.init(t)];if(e.length===0)return[];if(e.some(i=>i.length===0))return[];if(e.length===1)return[...e];e[e.length-1].forEach(i=>n[0].set(i,!0));for(let i=e.length-2;i>-1;i--){if(e[i].forEach(r=>{n[0].has(r)&&n[1].set(r,!0)}),n[1].size===0)return[];n.reverse(),n[1].clear()}return Array.from(n[0].keys())}function Y1(e,t=1){const n=new Array;function i(r,s){for(let o=0,a=r.length;o<a;o++)Pt(r[o])&&(s>0||s<0)?i(r[o],Math.max(-1,s-1)):n.push(r[o])}return i(e,t),n}function oO(e){const t={};for(;e;){for(const n of Object.getOwnPropertyNames(e))n in t||(t[n]=e[n]);e=Object.getPrototypeOf(e)}return t}function V1(e){for(;e;){if(Object.getOwnPropertyNames(e).includes("toString"))return e.toString!==Object.prototype.toString;e=Object.getPrototypeOf(e)}return!1}function Ms(e,t){if(e===t||Object.is(e,t))return!0;if(e===null||t===null||typeof e!=typeof t||typeof e!="object"||e.constructor!==t.constructor)return!1;if(e instanceof Date)return+e==+t;if(e instanceof RegExp)return e.toString()===t.toString();const n=e.constructor;if(n===Array||n===Object){const i=Object.keys(e).sort(),r=Object.keys(t).sort();if(i.length!==r.length)return!1;for(let s=0,o=i[s];s<i.length;o=i[++s])if(o!==r[s]||!Ms(e[o],t[o]))return!1;return!0}return V1(e)&&e.toString()===t.toString()}const Lh=(e,t)=>{if(e===null)return"null";if(e===void 0)return"undefined";if(Ii(e)||qn(e)||Ra(e))return JSON.stringify(e);if(su(e))return e.toISOString();if(_o(e)||nO(e)||bv(e))return e.toString();if(t instanceof Set||(t=new Set),t.has(e))throw B1;try{if(t.add(e),Pt(e))return"["+e.map(i=>Lh(i,t)).join(",")+"]";if(wn(e))return"{"+Object.keys(e).sort().map(r=>`${r}:${Lh(e[r],t)}`).join()+"}";const n=V1(e)?e.toString():Lh(oO(e),t);return ru(e)+"("+n+")"}finally{t.delete(e)}};function aO(e,t){return ei(e)?null:(t=t||Ef,t(e))}function cO(e,t,n=Ef){if(e.length<1)return new Map;const i=new Map,r=new Map;for(let s=0;s<e.length;s++){const o=e[s],a=t(o,s),c=aO(a,n);if(c===null)r.has(null)?r.get(null).push(o):r.set(null,[o]);else{const l=i.has(c)?i.get(c).find(u=>Ms(u,a)):null;ei(l)?(r.set(a,[o]),i.has(c)?i.get(c).push(a):i.set(c,[a])):r.get(l).push(o)}}return r}function Rg(e,t){return U1(e)?e[t]:void 0}function lO(e,t){if(t<1)return e;for(;t--&&e.length===1;)e=e[0];return e}function Io(e,t,n){let i=0;function r(o,a){let c=o;for(let l=0;l<a.length;l++){const u=a[l];if(/^\d+$/.exec(u)===null&&Pt(c)){if(l===0&&i>0)break;i+=1;const d=a.slice(l);c=c.reduce((f,p)=>{const g=r(p,d);return g!==void 0&&f.push(g),f},[]);break}else c=Rg(c,u);if(c===void 0)break}return c}const s=W1(e)?e:r(e,t.split("."));return Pt(s)&&n?.unwrapArray?lO(s,i):s}function Tl(e,t,n){const i=t.indexOf("."),r=i==-1?t:t.substring(0,i),s=t.substring(i+1),o=i!=-1;if(Pt(e)){const l=/^\d+$/.test(r),u=l&&n?.preserveIndex?[...e]:[];if(l){const h=parseInt(r);let d=Rg(e,h);o&&(d=Tl(d,s,n)),n?.preserveIndex?u[h]=d:u.push(d)}else for(const h of e){const d=Tl(h,t,n);n?.preserveMissing?u.push(d??iu):(d!=null||n?.preserveIndex)&&u.push(d)}return u}const a=n?.preserveKeys?{...e}:{};let c=Rg(e,r);if(o&&(c=Tl(c,s,n)),c!==void 0)return a[r]=c,a}function Ag(e){if(Pt(e))for(let t=e.length-1;t>=0;t--)e[t]===iu?e.splice(t,1):Ag(e[t]);else if(wn(e))for(const t in e)Ga(e,t)&&Ag(e[t])}const ky=/^\d+$/;function Sd(e,t,n,i){const r=t.split("."),s=r[0],o=r.slice(1).join(".");if(r.length===1)(wn(e)||Pt(e)&&ky.test(s))&&n(e,s);else{i?.buildGraph&&ei(e[s])&&(e[s]={});const a=e[s];if(!a)return;const c=!!(r.length>1&&ky.test(r[1]));Pt(a)&&i?.descendArray&&!c?a.forEach(l=>Sd(l,o,n,i)):Sd(a,o,n,i)}}function uO(e,t,n){Sd(e,t,(i,r)=>{i[r]=bv(n)?n(i[r]):n},{buildGraph:!0})}function Sy(e,t,n){Sd(e,t,(i,r)=>{if(Pt(i)){if(/^\d+$/.test(r))i.splice(parseInt(r),1);else if(n&&n.descendArray)for(const s of i)wn(s)&&delete s[r]}else wn(i)&&delete i[r]},n)}const hO=/^\$[a-zA-Z0-9_]+$/;function Qo(e){return hO.test(e)}function q1(e){if(W1(e))return _o(e)?{$regex:e}:{$eq:e};if(U1(e)){if(!Object.keys(e).some(Qo))return{$eq:e};if(Ga(e,"$regex")){const t={...e};return t.$regex=new RegExp(e.$regex,e.$options),delete t.$options,t}}return e}var Lg=(e=>(e[e.CLONE_OFF=0]="CLONE_OFF",e[e.CLONE_INPUT=1]="CLONE_INPUT",e[e.CLONE_OUTPUT=2]="CLONE_OUTPUT",e[e.CLONE_ALL=3]="CLONE_ALL",e))(Lg||{});class wo{#t;#n;#e;constructor(t,n,i){this.#t=t,this.update(n,i)}static init(t,n,i){return t instanceof wo?new wo(t.#t,t.root??n,{...t.#e,...i,variables:Object.assign({},t.#e?.variables,i?.variables)}):new wo(t,n,i)}update(t,n){this.#n=t;const i=Object.assign({},this.#e?.variables,n?.variables);return Object.keys(i).length?this.#e={...n,variables:i}:this.#e=n??{},this}getOptions(){return Object.freeze({...this.#t,context:Po.from(this.#t.context)})}get root(){return this.#n}get local(){return this.#e}get idKey(){return this.#t.idKey}get collation(){return this.#t?.collation}get processingMode(){return this.#t?.processingMode||0}get useStrictMode(){return this.#t?.useStrictMode}get scriptEnabled(){return this.#t?.scriptEnabled}get useGlobalContext(){return this.#t?.useGlobalContext}get hashFunction(){return this.#t?.hashFunction}get collectionResolver(){return this.#t?.collectionResolver}get jsonSchemaValidator(){return this.#t?.jsonSchemaValidator}get variables(){return this.#t?.variables}get context(){return this.#t?.context}}function dO(e){return e instanceof wo?e.getOptions():Object.freeze({idKey:"_id",scriptEnabled:!0,useStrictMode:!0,useGlobalContext:!0,processingMode:0,...e,context:e?.context?Po.from(e?.context):Po.init()})}class Po{#t=new Map;constructor(){}static init(){return new Po}static from(t){const n=Po.init();return ei(t)||t.#t.forEach((i,r)=>n.addOperators(r,i)),n}addOperators(t,n){this.#t.has(t)||this.#t.set(t,{});for(const[i,r]of Object.entries(n))this.getOperator(t,i)||(this.#t.get(t)[i]=r);return this}getOperator(t,n){return(this.#t.get(t)??{})[n]??null}addAccumulatorOps(t){return this.addOperators("accumulator",t)}addExpressionOps(t){return this.addOperators("expression",t)}addQueryOps(t){return this.addOperators("query",t)}addPipelineOps(t){return this.addOperators("pipeline",t)}addProjectionOps(t){return this.addOperators("projection",t)}addWindowOps(t){return this.addOperators("window",t)}}const oo=Po.init();function Ey(e,t){for(const[n,i]of Object.entries(t)){Oe(bv(i)&&Qo(n),`'${n}' is not a valid operator`);const r=au(e,n,null);Oe(!r||i===r,`${n} already exists for '${e}' operators. Cannot change operator function once registered.`)}switch(e){case"accumulator":oo.addAccumulatorOps(t);break;case"expression":oo.addExpressionOps(t);break;case"pipeline":oo.addPipelineOps(t);break;case"projection":oo.addProjectionOps(t);break;case"query":oo.addQueryOps(t);break;case"window":oo.addWindowOps(t);break}}function au(e,t,n){const{context:i,useGlobalContext:r}=n||{},s=i?i.getOperator(e,t):null;return!s&&r?oo.getOperator(e,t):s}function ya(e,t,n,i){const r=wo.init(i,e);return n&&Qo(n)?K1(e,t,n,r):Ed(e,t,r)}const fO=["$$ROOT","$$CURRENT","$$REMOVE","$$NOW"];function Ed(e,t,n){if(Ii(t)&&t.length>0&&t[0]==="$"){if(pO.includes(t))return t;let i=n.root;const r=t.split(".");if(fO.includes(r[0])){switch(r[0]){case"$$ROOT":break;case"$$CURRENT":i=e;break;case"$$REMOVE":i=void 0;break;case"$$NOW":i=new Date;break}t=t.slice(r[0].length+1)}else if(r[0].slice(0,2)==="$$"){i=Object.assign({},n.variables,{this:e},n?.local?.variables);const s=r[0].slice(2);Oe(Ga(i,s),`Use of undefined variable: ${s}`),t=t.slice(2)}else t=t.slice(1);return t===""?i:Io(i,t)}if(Pt(t))return t.map(i=>Ed(e,i,n));if(wn(t)){const i={},r=Object.entries(t);for(const[s,o]of r){if(Qo(s))return Oe(r.length==1,"expression must have single operator."),K1(e,o,s,n);i[s]=Ed(e,o,n)}return i}return t}function K1(e,t,n,i){const r=au("expression",n,i);if(r)return r(e,t,i);const s=au("accumulator",n,i);return Oe(!!s,`accumulator '${n}' is not registered.`),Pt(e)||(e=Ed(e,t,i),t=null),Oe(Pt(e),`arguments must resolve to array for ${n}.`),s(e,t,i)}const pO=["$$KEEP","$$PRUNE","$$DESCEND"];function cu(e){return e instanceof My?e:new My(e)}function gO(...e){let t=0;return cu(()=>{for(;t<e.length;){const n=e[t].next();if(!n.done)return n;t++}return{done:!0}})}function mO(e){return!!e&&typeof e=="object"&&e?.next instanceof Function}function vO(e,t){const n=e.slice(t+1);e.splice(t),Array.prototype.push.apply(e,n)}const Ng=new Error;function yO(e,t,n){let i=!1,r=-1,s=0;return function(o){try{t:for(;!i;){let a=e();r++;let c=-1;const l=t.length;let u=!1;for(;++c<l;){const h=t[c];switch(h.action){case 0:a=h.func(a,r);break;case 1:if(!h.func(a,r))continue t;break;case 2:--h.count,h.count||(u=!0);break;case 3:--h.count,h.count||vO(t,c);continue t;default:break t}}if(i=u,o)n[s++]=a;else return{value:a,done:!1}}}catch(a){if(a!==Ng)throw a}return i=!0,{done:i}}}let My=class{constructor(t){this.#t=[],this.#n=[],this.isDone=!1;let n;if(t instanceof Function&&(t={next:t}),mO(t)){const i=t;n=()=>{const r=i.next();if(r.done)throw Ng;return r.value}}else if(Pt(t)){const i=t,r=i.length;let s=0;n=()=>{if(s<r)return i[s++];throw Ng}}else if(!(t instanceof Function))throw new Sf("Lazy must be initialized with an array, generator, or function.");this.#e=yO(n,this.#t,this.#n)}#t;#n;#e;push(t,n){return typeof n=="function"?this.#t.push({action:t,func:n}):typeof n=="number"&&this.#t.push({action:t,count:n}),this}next(){return this.#e()}map(t){return this.push(0,t)}filter(t){return this.push(1,t)}take(t){return t>0?this.push(2,t):this}drop(t){return t>0?this.push(3,t):this}transform(t){const n=this;let i;return cu(()=>(i||(i=cu(t(n.value()))),i.next()))}value(){return this.isDone||(this.isDone=this.#e(!0).done),this.#n}each(t){for(;;){const n=this.next();if(n.done)break;if(t(n.value)===!1)return!1}return!0}reduce(t,n){let i=this.next();for(n===void 0&&!i.done&&(n=i.value,i=this.next());!i.done;)n=t(n,i.value),i=this.next();return n}size(){return this.reduce((t,n)=>++t,0)}[Symbol.iterator](){return this}};const bO=(e,t,n)=>e.take(t),G1=(e,t,n)=>_v(t)?e:(Q1(t,n),e.map(X1(t,wo.init(n))));function X1(e,t,n=!0){const i=t.idKey,r=Object.keys(e),s=new Array,o=new Array,a={};for(const f of r){const p=e[f];if(qn(p)||Ra(p))p?o.push(f):s.push(f);else if(Pt(p))a[f]=g=>p.map(m=>ya(g,m,null,t.update(g))??null);else if(wn(p)){const g=Object.keys(p),m=g.length==1?g[0]:"",b=au("projection",m,t);b?m==="$slice"&&!Nu(p[m]).every(qn)?a[f]=C=>ya(C,p,f,t.update(C)):a[f]=C=>b(C,p[m],f,t.update(C)):Qo(m)?a[f]=_=>ya(_,p[m],m,t):(Q1(p,t),a[f]=_=>{if(!Ga(_,f))return ya(_,p,null,t);n&&t.update(_);const C=Io(_,f),S=X1(p,t,!1);return Pt(C)?C.map(S):wn(C)?S(C):S(_)})}else a[f]=Ii(p)&&p[0]==="$"?g=>ya(g,p,f,t):g=>p}const c=Object.keys(a),l=s.includes(i);if(n&&l&&s.length===1&&!o.length&&!c.length)return f=>{const p={...f};return delete p[i],p};const h=n&&!l&&!o.includes(i),d={preserveMissing:!0};return f=>{const p={};if(s.length&&!o.length){Pg(p,f);for(const g of s)Sy(p,g,{descendArray:!0})}for(const g of o){const m=Tl(f,g,d)??{};Pg(p,m)}o.length&&Ag(p);for(const g of c){const m=a[g](f);m===void 0?Sy(p,g,{descendArray:!0}):uO(p,g,m)}return h&&Ga(f,i)&&(p[i]=Io(f,i)),p}}function Q1(e,t){let n=!1,i=!1;for(const[r,s]of Object.entries(e))Oe(!r.startsWith("$"),"Field names may not start with '$'."),Oe(!r.endsWith(".$"),"Positional projection operator '$' is not supported."),r!==t?.idKey&&(s===0||s===!1?n=!0:(s===1||s===!0)&&(i=!0),Oe(!(n&&i),"Projection cannot have a mix of inclusion and exclusion."))}const _O=(e,t,n)=>e.drop(t),Z1=(e,t,n)=>{if(_v(t)||!wn(t))return e;let i=Ps;const r=n.collation;return wn(r)&&Ii(r.locale)&&(i=xO(r)),e.transform(s=>{const o=Object.keys(t);for(const a of o.reverse()){const c=cO(s,h=>Io(h,a),n.hashFunction),l=Array.from(c.keys()).sort(i);t[a]===-1&&l.reverse();let u=0;for(const h of l)for(const d of c.get(h))s[u++]=d;Oe(u==s.length,"bug: counter must match collection size.")}return s})},wO={1:"base",2:"accent",3:"variant"};function xO(e){const t={sensitivity:wO[e.strength||3],caseFirst:e.caseFirst==="off"?"false":e.caseFirst||"false",numeric:e.numericOrdering||!1,ignorePunctuation:e.alternate==="shifted"};(e.caseLevel||!1)===!0&&(t.sensitivity==="base"&&(t.sensitivity="case"),t.sensitivity==="accent"&&(t.sensitivity="variant"));const n=new Intl.Collator(e.locale,t);return(i,r)=>{if(!Ii(i)||!Ii(r))return Ps(i,r);const s=n.compare(i,r);return s<0?-1:s>0?1:0}}const CO={$sort:Z1,$skip:_O,$limit:bO};class kO{#t;#n;#e;#r;#o={};#i=null;#s=[];constructor(t,n,i,r){this.#t=t,this.#n=n,this.#e=i,this.#r=r}fetch(){if(this.#i)return this.#i;this.#i=cu(this.#t).filter(this.#n);const t=this.#r.processingMode;t&Lg.CLONE_INPUT&&this.#i.map(ou);for(const n of["$sort","$skip","$limit"])Ga(this.#o,n)&&(this.#i=CO[n](this.#i,this.#o[n],this.#r));return Object.keys(this.#e).length&&(this.#i=G1(this.#i,this.#e,this.#r)),t&Lg.CLONE_OUTPUT&&this.#i.map(ou),this.#i}fetchAll(){const t=cu([...this.#s]);return this.#s=[],gO(t,this.fetch())}all(){return this.fetchAll().value()}count(){return this.all().length}skip(t){return this.#o.$skip=t,this}limit(t){return this.#o.$limit=t,this}sort(t){return this.#o.$sort=t,this}collation(t){return this.#r={...this.#r,collation:t},this}next(){if(this.#s.length>0)return this.#s.pop();const t=this.fetch().next();if(!t.done)return t.value}hasNext(){if(this.#s.length>0)return!0;const t=this.fetch().next();return t.done?!1:(this.#s.push(t.value),!0)}map(t){return this.all().map(t)}forEach(t){this.all().forEach(t)}[Symbol.iterator](){return this.fetchAll()}}const SO=new Set(Array.from(["$and","$or","$nor","$expr","$jsonSchema"]));class Fu{#t;#n;#e;constructor(t,n){this.#e=ou(t),this.#n=dO(n),this.#t=[],this.compile()}compile(){Oe(wn(this.#e),`query criteria must be an object: ${JSON.stringify(this.#e)}`);const t={};for(const[n,i]of Object.entries(this.#e)){if(n==="$where")Oe(this.#n.scriptEnabled,"$where operator requires 'scriptEnabled' option to be true."),Object.assign(t,{field:n,expr:i});else if(SO.has(n))this.processOperator(n,n,i);else{Oe(!Qo(n),`unknown top level operator: ${n}`);for(const[r,s]of Object.entries(q1(i)))this.processOperator(n,r,s)}t.field&&this.processOperator(t.field,t.field,t.expr)}}processOperator(t,n,i){const r=au("query",n,this.#n);Oe(!!r,`unknown query operator ${n}`),this.#t.push(r(t,i,this.#n))}test(t){return this.#t.every(n=>n(t))}find(t,n){return new kO(t,i=>this.test(i),n||{},this.#n)}remove(t){return t.reduce((n,i)=>(this.test(i)||n.push(i),n),[])}}const EO=["monday","mon","tuesday","tue","wednesday","wed","thursday","thu","friday","fri","saturday","sat","sunday","sun"];new Set(EO);function ii(e){return(n,i,r)=>{const s={unwrapArray:!0},o=Math.max(1,n.split(".").length-1);return a=>{const c=Io(a,n,s);return e(c,i,{...r,depth:o})}}}function J1(e,t,n){return Ms(e,t)||ei(e)&&ei(t)?!0:Pt(e)?e.some(i=>Ms(i,t))||Y1(e,n?.depth).some(i=>Ms(i,t)):!1}function MO(e,t,n){return!J1(e,t,n)}function tx(e,t,n){return ei(e)?t.some(i=>i===null):sO([Nu(e),t],n?.hashFunction).length>0}function DO(e,t,n){return!tx(e,t,n)}function $O(e,t,n){return Mf(e,t,(i,r)=>Ps(i,r)<0)}function TO(e,t,n){return Mf(e,t,(i,r)=>Ps(i,r)<=0)}function OO(e,t,n){return Mf(e,t,(i,r)=>Ps(i,r)>0)}function IO(e,t,n){return Mf(e,t,(i,r)=>Ps(i,r)>=0)}function PO(e,t,n){return Nu(e).some(i=>t.length===2&&i%t[0]===t[1])}function RO(e,t,n){const i=Nu(e),r=s=>Ii(s)&&iO(t.exec(s),n?.useStrictMode);return i.some(r)||Y1(i,1).some(r)}function AO(e,t,n){return Array.isArray(e)&&e.length===t}function LO(e){return Qo(e)&&["$and","$or","$nor"].indexOf(e)===-1}function NO(e,t,n){if(Pt(e)&&!_v(e)){let i=o=>o,r=t;Object.keys(t).every(LO)&&(r={temp:t},i=o=>({temp:o}));const s=new Fu(r,n);for(let o=0,a=e.length;o<a;o++)if(s.test(i(e[o])))return!0}return!1}const Dy=e=>e===null,FO={array:Pt,boolean:Ra,bool:Ra,date:su,number:qn,int:qn,long:qn,double:qn,decimal:qn,null:Dy,object:wn,regexp:_o,regex:_o,string:Ii,undefined:ei,function:e=>{throw new Sf("unsupported type key `function`.")},1:qn,2:Ii,3:wn,4:Pt,6:ei,8:Ra,9:su,10:Dy,11:_o,16:qn,18:qn,19:qn};function $y(e,t,n){const i=FO[t];return i?i(e):!1}function zO(e,t,n){return Pt(t)?t.findIndex(i=>$y(e,i))>=0:$y(e,t)}function Mf(e,t,n){return Nu(e).some(i=>ru(i)===ru(t)&&n(i,t))}const Ty=(e,t)=>{const n={};return e.split("").forEach((i,r)=>n[i]=t*(r+1)),n};({...Ty("ABCDEFGHIKLM",1),...Ty("NOPQRSTUVWXY",-1)});const Oy={undefined:null,null:null,NaN:NaN,Infinity:new Error,"-Infinity":new Error};function ri(e,t=Oy){const n=Object.assign({},Oy,t),i=new Set(Object.keys(n));return(r,s,o)=>{const a=ya(r,s,null,o);if(i.has(`${a}`)){const c=n[`${a}`];if(c instanceof Error)throw new Sf(`cannot apply $${e.name} to -inf, value must in (-inf,inf)`);return c}return e(a)}}ri(Math.acos,{Infinity:1/0,0:new Error});ri(Math.acosh,{Infinity:1/0,0:new Error});ri(Math.asin);ri(Math.asinh,{Infinity:1/0,"-Infinity":-1/0});ri(Math.atan);ri(Math.atanh,{1:1/0,"-1":-1/0});ri(Math.cos);ri(Math.cosh,{"-Infinity":1/0,Infinity:1/0});const jO=Math.PI/180;ri(e=>e*jO,{Infinity:1/0,"-Infinity":1/0});const BO=180/Math.PI;ri(e=>e*BO,{Infinity:1/0,"-Infinity":-1/0});ri(Math.sin);ri(Math.sinh,{"-Infinity":-1/0,Infinity:1/0});ri(Math.tan);const WO=(e,t,n)=>{Oe(Pt(t),"Invalid expression: $and expects value to be an Array.");const i=t.map(r=>new Fu(r,n));return r=>i.every(s=>s.test(r))},ex=(e,t,n)=>{Oe(Pt(t),"Invalid expression. $or expects value to be an Array");const i=t.map(r=>new Fu(r,n));return r=>i.some(s=>s.test(r))},HO=(e,t,n)=>{Oe(Pt(t),"Invalid expression. $nor expects value to be an array.");const i=ex("$or",t,n);return r=>!i(r)},UO=(e,t,n)=>{const i={};i[e]=q1(t);const r=new Fu(i,n);return s=>!r.test(s)},YO=ii(J1),VO=ii(OO),qO=ii(IO),KO=ii(tx),GO=ii($O),XO=ii(TO),QO=ii(MO),ZO=ii(DO),JO=ii(PO),tI=ii(RO),eI=ii(NO),nI=ii(AO),iI=(e,t,n)=>{const i=e.includes("."),r=!!t;return!i||e.match(/\.\d+$/)?s=>Io(s,e)!==void 0===r:s=>{const o=Tl(s,e,{preserveIndex:!0}),a=Io(o,e.substring(0,e.lastIndexOf(".")));return Pt(a)?a.some(c=>c!==void 0)===r:a!==void 0===r}},rI=ii(zO);var Iy=!1;function sI(e){return Iy||(Ey("pipeline",{$sort:Z1,$project:G1}),Ey("query",{$and:WO,$eq:YO,$elemMatch:eI,$exists:iI,$gt:VO,$gte:qO,$in:KO,$lt:GO,$lte:XO,$ne:QO,$nin:ZO,$mod:JO,$nor:HO,$not:UO,$or:ex,$regex:tI,$size:nI,$type:rI}),Iy=!0),new Fu(e)}function Aa(e,t){var n=Ai(e.primaryKey);t=Vt(t);var i=Fn(t);if(typeof i.skip!="number"&&(i.skip=0),i.selector?(i.selector=i.selector,Object.entries(i.selector).forEach(([h,d])=>{(typeof d!="object"||d===null)&&(i.selector[h]={$eq:d})})):i.selector={},i.index){var r=yd(i.index);r.includes(n)||r.push(n),i.index=r}if(i.sort){var u=i.sort.find(h=>w$(h)===n);u||(i.sort=i.sort.slice(0),i.sort.push({[n]:"asc"}))}else if(i.index)i.sort=i.index.map(h=>({[h]:"asc"}));else{if(e.indexes){var s=new Set;Object.entries(i.selector).forEach(([h,d])=>{var f=!1;typeof d=="object"&&d!==null?f=!!Object.keys(d).find(p=>yv.has(p)):f=!0,f&&s.add(h)});var o=-1,a;e.indexes.forEach(h=>{var d=bd(h)?h:[h],f=d.findIndex(p=>!s.has(p));f>0&&f>o&&(o=f,a=d)}),a&&(i.sort=a.map(h=>({[h]:"asc"})))}if(!i.sort)if(e.indexes&&e.indexes.length>0){var c=e.indexes[0],l=bd(c)?c:[c];i.sort=l.map(h=>({[h]:"asc"}))}else i.sort=[{[n]:"asc"}]}return i}function oI(e,t){if(!t.sort)throw U("SNH",{query:t});var n=[];t.sort.forEach(r=>{var s=Object.keys(r)[0],o=Object.values(r)[0];n.push({key:s,direction:o,getValueFn:_$(s)})});var i=(r,s)=>{for(var o=0;o<n.length;++o){var a=n[o],c=a.getValueFn(r),l=a.getValueFn(s);if(c!==l){var u=a.direction==="asc"?Ps(c,l):Ps(l,c);return u}}};return i}function nx(e,t){if(!t.sort)throw U("SNH",{query:t});var n=sI(t.selector),i=r=>n.test(r);return i}async function Lc(e,t){var n=await e.exec();if(!n)return null;if(Array.isArray(n))return Promise.all(n.map(r=>t(r)));if(n instanceof Map)return Promise.all([...n.values()].map(r=>t(r)));var i=await t(n);return i}function Df(e,t){if(!t.sort)throw U("SNH",{query:t});var n=GT(e,t);return{query:t,queryPlan:n}}var aI="_rxdb_internal";async function bc(e,t){var n=await e.findDocumentsById([t],!1),i=n[0];if(i)return i}async function Xa(e,t,n){var i=await e.bulkWrite([t],n);if(i.error.length>0){var r=i.error[0];throw r}else{var s=Ai(e.schema.primaryKey),o=bi(s,[t],i),a=o[0];return a}}function cI(e,t){var n=bc(e,t),i=e.changeStream().pipe(Ht(r=>r.events.find(s=>s.documentId===t)),Ot(r=>!!r),Ht(r=>Promise.resolve(Q(r).documentData)),Lu(n),F1(r=>r),Ot(r=>!!r));return i}function lu(e){return Object.assign({},...e.filter(t=>!!t))}function Md(e,t,n,i){if(i)throw i.status===409?U("CONFLICT",{collection:e.name,id:t,writeError:i,data:n}):i.status===422?U("VD2",{collection:e.name,id:t,writeError:i,data:n}):i}function JB(e,t,n,i,r,s,o){for(var a=!!e.schema.attachments,c=[],l=[],u=[],h=Go(10),d={id:h,events:[],checkpoint:null,context:r},f=d.events,p=[],g=[],m=[],b=n.size>0,_,C=i.length,S=function(){var $=i[k],D=$.document,w=$.previous,x=D[t],M=D._deleted,O=w&&w._deleted,T=void 0;b&&(T=n.get(x));var R;if(T){var Y=T._rev;if(!w||w&&Y!==w._rev){var F={isError:!0,status:409,documentId:x,writeRow:$,documentInDb:T};return u.push(F),1}var G=a?$p($):$;a&&(M?w&&Object.keys(w._attachments).forEach(L=>{g.push({documentId:x,attachmentId:L,digest:Q(w)._attachments[L].digest})}):(Object.entries(D._attachments).find(([L,ot])=>{var kt=w?w._attachments[L]:void 0;return!kt&&!ot.data&&(R={documentId:x,documentInDb:T,isError:!0,status:510,writeRow:$,attachmentId:L}),!0}),R||Object.entries(D._attachments).forEach(([L,ot])=>{var kt=w?w._attachments[L]:void 0;if(!kt)p.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest});else{var Lt=G.document._attachments[L].digest;ot.data&&kt.digest!==Lt&&m.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest})}}))),R?u.push(R):(a?l.push($p(G)):l.push(G),_=G);var B=null,V=null,W=null;if(O&&!M)W="INSERT",B=a?qi(D):D;else if(w&&!O&&!M)W="UPDATE",B=a?qi(D):D,V=w;else if(M)W="DELETE",B=Q(D),V=w;else throw U("SNH",{args:{writeRow:$}});var q={documentId:x,documentData:B,previousDocumentData:V,operation:W};f.push(q)}else{var j=!!M;if(a&&Object.entries(D._attachments).forEach(([L,ot])=>{ot.data?p.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest}):(R={documentId:x,isError:!0,status:510,writeRow:$,attachmentId:L},u.push(R))}),R||(a?c.push($p($)):c.push($),_=$),!j){var z={documentId:x,operation:"INSERT",documentData:a?qi(D):D,previousDocumentData:a&&w?qi(w):w};f.push(z)}}},k=0;k<C;k++)S();return{bulkInsertDocs:c,bulkUpdateDocs:l,newestRow:_,errors:u,eventBulk:d,attachmentsAdd:p,attachmentsRemove:g,attachmentsUpdate:m}}function $p(e){return{previous:e.previous,document:qi(e.document)}}function lI(e){return atob(e).length}function uI(e){var t=e.data;if(!t)return e;var n={length:lI(t),digest:e.digest,type:e.type};return n}function qi(e){if(!e._attachments||Object.keys(e._attachments).length===0)return e;var t=Vt(e);return t._attachments={},Object.entries(e._attachments).forEach(([n,i])=>{t._attachments[n]=uI(i)}),t}function $f(e){return Object.assign({},e,{_meta:Vt(e._meta)})}function wv(e,t,n){At.deepFreezeWhenDevMode(n);var i=Ai(t.schema.primaryKey),r={originalStorageInstance:t,schema:t.schema,internals:t.internals,collectionName:t.collectionName,databaseName:t.databaseName,options:t.options,async bulkWrite(s,o){for(var a=e.token,c=new Array(s.length),l=Ri(),u=0;u<s.length;u++){var h=s[u],d=$f(h.document);d._meta.lwt=l;var f=h.previous;d._rev=Br(a,f),c[u]={document:d,previous:f}}zn("preStorageWrite",{storageInstance:this.originalStorageInstance,rows:c});var p=await e.lockedRun(()=>t.bulkWrite(c,o)),g={error:[]};rx.set(g,c);var m=p.error.length===0?[]:p.error.filter($=>$.status===409&&!$.writeRow.previous&&!$.writeRow.document._deleted&&Q($.documentInDb)._deleted?!0:(g.error.push($),!1));if(m.length>0){var b=new Set,_=m.map($=>(b.add($.documentId),{previous:$.documentInDb,document:Object.assign({},$.writeRow.document,{_rev:Br(e.token,$.documentInDb)})})),C=await e.lockedRun(()=>t.bulkWrite(_,o));Do(g.error,C.error);var S=bi(i,c,g,b),k=bi(i,_,C);return Do(S,k),g}return g},query(s){return e.lockedRun(()=>t.query(s))},count(s){return e.lockedRun(()=>t.count(s))},findDocumentsById(s,o){return e.lockedRun(()=>t.findDocumentsById(s,o))},getAttachmentData(s,o,a){return e.lockedRun(()=>t.getAttachmentData(s,o,a))},getChangedDocumentsSince:t.getChangedDocumentsSince?(s,o)=>e.lockedRun(()=>t.getChangedDocumentsSince(Q(s),o)):void 0,cleanup(s){return e.lockedRun(()=>t.cleanup(s))},remove(){return e.storageInstances.delete(r),e.lockedRun(()=>t.remove())},close(){return e.storageInstances.delete(r),e.lockedRun(()=>t.close())},changeStream(){return t.changeStream()}};return e.storageInstances.add(r),r}function t9(e){if(e.schema.keyCompression)throw U("UT5",{args:{params:e}});if(Dd(e.schema))throw U("UT6",{args:{params:e}});if(e.schema.attachments&&e.schema.attachments.compression)throw U("UT7",{args:{params:e}})}function Dd(e){return!!(e.encrypted&&e.encrypted.length>0||e.attachments&&e.attachments.encrypted)}function hI(e,t,n){var i=Ai(e.schema.primaryKey),r=n?n.lwt:av,s=n?n.id:"";return Aa(e.schema,{selector:{$or:[{"_meta.lwt":{$gt:r}},{"_meta.lwt":{$eq:r},[i]:{$gt:n?s:""}}],"_meta.lwt":{$gte:r}},sort:[{"_meta.lwt":"asc"},{[i]:"asc"}],skip:0,limit:t})}async function ix(e,t,n){if(e.getChangedDocumentsSince)return e.getChangedDocumentsSince(t,n);var i=Ai(e.schema.primaryKey),r=Df(e.schema,hI(e,t,n)),s=await e.query(r),o=s.documents,a=v$(o);return{documents:o,checkpoint:a?{id:a[i],lwt:a._meta.lwt}:n||{id:"",lwt:0}}}var rx=new WeakMap,dI=new WeakMap;function bi(e,t,n,i){return yi(dI,n,()=>{var r=[],s=rx.get(n);if(s||(s=t),n.error.length>0||i){for(var o=i||new Set,a=0;a<n.error.length;a++){var c=n.error[a];o.add(c.documentId)}for(var l=0;l<s.length;l++){var u=s[l].document;o.has(u[e])||r.push(qi(u))}}else{r.length=t.length-n.error.length;for(var h=0;h<s.length;h++){var d=s[h].document;r[h]=qi(d)}}return r})}var sx=(function(){function e(n,i,r,s){this.queueByDocId=new Map,this.isRunning=!1,this.storageInstance=n,this.primaryPath=i,this.preWrite=r,this.postWrite=s}var t=e.prototype;return t.addWrite=function(i,r){var s=i[this.primaryPath],o=yi(this.queueByDocId,s,()=>[]),a=new Promise((c,l)=>{var u={lastKnownDocumentState:i,modifier:r,resolve:c,reject:l};Q(o).push(u),this.triggerRun()});return a},t.triggerRun=async function(){if(!(this.isRunning===!0||this.queueByDocId.size===0)){this.isRunning=!0;var i=[],r=this.queueByDocId;this.queueByDocId=new Map,await Promise.all(Array.from(r.entries()).map(async([o,a])=>{var c=fI(a.map(h=>h.lastKnownDocumentState)),l=c;for(var u of a)try{l=await u.modifier(Fn(l))}catch(h){u.reject(h),u.reject=()=>{},u.resolve=()=>{}}try{await this.preWrite(l,c)}catch(h){a.forEach(d=>d.reject(h));return}i.push({previous:c,document:l})}));var s=i.length>0?await this.storageInstance.bulkWrite(i,"incremental-write"):{error:[]};return await Promise.all(bi(this.primaryPath,i,s).map(o=>{var a=o[this.primaryPath];this.postWrite(o);var c=Va(r,a);c.forEach(l=>l.resolve(o))})),s.error.forEach(o=>{var a=o.documentId,c=Va(r,a),l=Ua(o);if(l){var u=yi(this.queueByDocId,a,()=>[]);c.reverse().forEach(d=>{d.lastKnownDocumentState=Q(l.documentInDb),Q(u).unshift(d)})}else{var h=h1(o);c.forEach(d=>d.reject(h))}}),this.isRunning=!1,this.triggerRun()}},e})();function Py(e){var t=async n=>{var i=x$(n);i._deleted=n._deleted;var r=await e(i),s=Object.assign({},r,{_meta:n._meta,_attachments:n._attachments,_rev:n._rev,_deleted:typeof r._deleted<"u"?r._deleted:n._deleted});return typeof s._deleted>"u"&&(s._deleted=!1),s};return t}function fI(e){var t=e[0],n=Is(t._rev);return e.forEach(i=>{var r=Is(i._rev);r>n&&(t=i,n=r)}),t}var Tf={get primaryPath(){var e=this;if(e.isInstanceOfRxDocument)return e.collection.schema.primaryPath},get primary(){var e=this;if(e.isInstanceOfRxDocument)return e._data[e.primaryPath]},get revision(){var e=this;if(e.isInstanceOfRxDocument)return e._data._rev},get deleted$(){var e=this;if(e.isInstanceOfRxDocument)return e.$.pipe(Ht(t=>t._data._deleted))},get deleted$$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.deleted$,e.getLatest().deleted,e.collection.database)},get deleted(){var e=this;if(e.isInstanceOfRxDocument)return e._data._deleted},getLatest(){var e=this.collection._docCache.getLatestDocumentData(this.primary);return this.collection._docCache.getCachedRxDocument(e)},get $(){var e=this,t=this.primary;return e.collection.eventBulks$.pipe(Ot(n=>!n.isLocal),Ht(n=>n.events.find(i=>i.documentId===t)),Ot(n=>!!n),Ht(n=>z1(Q(n))),Lu(e.collection._docCache.getLatestDocumentData(t)),nu((n,i)=>n._rev===i._rev),Ht(n=>this.collection._docCache.getCachedRxDocument(n)),Au(Pu))},get $$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.$,e.getLatest()._data,e.collection.database)},get$(e){if(At.isDevMode()){if(e.includes(".item."))throw U("DOC1",{path:e});if(e===this.primaryPath)throw U("DOC2");if(this.collection.schema.finalFields.includes(e))throw U("DOC3",{path:e});var t=eu(this.collection.schema.jsonSchema,e);if(!t)throw U("DOC4",{path:e})}return this.$.pipe(Ht(n=>Ya(n,e)),nu())},get$$(e){var t=this.get$(e),n=this.collection.database.getReactivityFactory();return n.fromObservable(t,this.getLatest().get(e),this.collection.database)},populate(e){var t=eu(this.collection.schema.jsonSchema,e),n=this.get(e);if(!n)return hv;if(!t)throw U("DOC5",{path:e});if(!t.ref)throw U("DOC6",{path:e,schemaObj:t});var i=this.collection.database.collections[t.ref];if(!i)throw U("DOC7",{ref:t.ref,path:e,schemaObj:t});return t.type==="array"?i.findByIds(n).exec().then(r=>{var s=r.values();return Array.from(s)}):i.findOne(n).exec()},get(e){return cx(this,e)},toJSON(e=!1){if(e)return At.deepFreezeWhenDevMode(this._data);var t=Vt(this._data);return delete t._rev,delete t._attachments,delete t._deleted,delete t._meta,At.deepFreezeWhenDevMode(t)},toMutableJSON(e=!1){return Fn(this.toJSON(e))},update(e){throw Rt("update")},incrementalUpdate(e){throw Rt("update")},updateCRDT(e){throw Rt("crdt")},putAttachment(){throw Rt("attachments")},putAttachmentBase64(){throw Rt("attachments")},getAttachment(){throw Rt("attachments")},allAttachments(){throw Rt("attachments")},get allAttachments$(){throw Rt("attachments")},async modify(e,t){var n=this._data,i=await Py(e)(n);return this._saveData(i,n)},incrementalModify(e,t){return this.collection.incrementalWriteQueue.addWrite(this._data,Py(e)).then(n=>this.collection._docCache.getCachedRxDocument(n))},patch(e){var t=this._data,n=Fn(t);return Object.entries(e).forEach(([i,r])=>{n[i]=r}),this._saveData(n,t)},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e,t){if(e=Vt(e),this._data._deleted)throw U("DOC11",{id:this.primary,document:this});await ax(this.collection,e,t);var n=[{previous:t,document:e}],i=await this.collection.storageInstance.bulkWrite(n,"rx-document-save-data"),r=i.error[0];return Md(this.collection,this.primary,e,r),await this.collection._runHooks("post","save",e,this),this.collection._docCache.getCachedRxDocument(bi(this.collection.schema.primaryPath,n,i)[0])},async remove(){if(this.deleted)return Promise.reject(U("DOC13",{document:this,id:this.primary}));var e=await this.collection.bulkRemove([this]);if(e.error.length>0){var t=e.error[0];Md(this.collection,this.primary,this._data,t)}return e.success[0]},incrementalRemove(){return this.incrementalModify(async e=>(await this.collection._runHooks("pre","remove",e,this),e._deleted=!0,e)).then(async e=>(await this.collection._runHooks("post","remove",e._data,e),e))},close(){throw U("DOC14")}};function ox(e=Tf){var t=function(i,r){this.collection=i,this._data=r,this._propertyCache=new Map,this.isInstanceOfRxDocument=!0};return t.prototype=e,t}function pI(e,t,n){var i=new e(t,n);return zn("createRxDocument",i),i}function ax(e,t,n){return t._meta=Object.assign({},n._meta,t._meta),At.isDevMode()&&e.schema.validateChange(n,t),e._runHooks("pre","save",t,n)}function cx(e,t){return yi(e._propertyCache,t,()=>{var n=Ya(e._data,t);if(typeof n!="object"||n===null||Array.isArray(n))return At.deepFreezeWhenDevMode(n);var i=new Proxy(Vt(n),{get(r,s){if(typeof s!="string")return r[s];var o=s.charAt(s.length-1);if(o==="$")if(s.endsWith("$$")){var a=s.slice(0,-2);return e.get$$(Zc(t+"."+a))}else{var c=s.slice(0,-1);return e.get$(Zc(t+"."+c))}else if(o==="_"){var l=s.slice(0,-1);return e.populate(Zc(t+"."+l))}else{var u=r[s];return typeof u=="number"||typeof u=="string"||typeof u=="boolean"?u:cx(e,Zc(t+"."+s))}}});return i})}function xv(e){return e[e.length-1]}function gI(e){const t=typeof e;return e!==null&&(t==="object"||t==="function")}function Ry(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!gI(e)||typeof t!="string")return e;const i=t.split(".");if(i.length===0)return n;for(let r=0;r<i.length;r++){const s=i[r];if(mI(e,s)?e=r===i.length-1?void 0:null:e=e[s],e==null){if(r!==i.length-1)return n;break}}return e===void 0?n:e}function mI(e,t){if(typeof t!="number"&&Array.isArray(e)){const n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}const lx=e=>!!e.queryParams.limit,vI=e=>e.queryParams.limit===1,yI=e=>!!(e.queryParams.skip&&e.queryParams.skip>0),bI=e=>e.changeEvent.operation==="DELETE",_I=e=>e.changeEvent.operation==="INSERT",wI=e=>e.changeEvent.operation==="UPDATE",xI=e=>lx(e)&&e.previousResults.length>=e.queryParams.limit,CI=e=>{const t=e.queryParams.sortFields,n=e.changeEvent.previous,i=e.changeEvent.doc;if(!i)return!1;if(!n)return!0;for(let r=0;r<t.length;r++){const s=t[r],o=Ry(n,s),a=Ry(i,s);if(o!==a)return!0}return!1},kI=e=>{const t=e.changeEvent.id;if(e.keyDocumentMap)return e.keyDocumentMap.has(t);{const n=e.queryParams.primaryKey,i=e.previousResults;for(let r=0;r<i.length;r++)if(i[r][n]===t)return!0;return!1}},SI=e=>{const t=e.previousResults[0];return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},EI=e=>{const t=xv(e.previousResults);return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},MI=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},DI=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=xv(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},$I=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},TI=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=xv(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},OI=e=>{const t=e.changeEvent.previous;return t?e.queryParams.queryMatcher(t):!1},II=e=>{const t=e.changeEvent.doc;return t?e.queryParams.queryMatcher(t):!1},PI=e=>e.previousResults.length===0,RI={0:_I,1:wI,2:bI,3:lx,4:vI,5:yI,6:PI,7:xI,8:SI,9:EI,10:CI,11:kI,12:MI,13:DI,14:$I,15:TI,16:OI,17:II};function AI(e,t,n,i){var r=e.length,s=r-1,o=0;if(r===0)return e.push(t),0;for(var a;i<=s;)o=i+(s-i>>1),a=e[o],n(a,t)<=0?i=o+1:s=o-1;return n(a,t)<=0&&o++,e.splice(o,0,t),o}const LI=e=>{},Cv=e=>{e.previousResults.unshift(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},kv=e=>{e.previousResults.push(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},Sv=e=>{const t=e.previousResults.shift();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},Ev=e=>{const t=e.previousResults.pop();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},NI=e=>{Sv(e),kv(e)},FI=e=>{Ev(e),Cv(e)},zI=e=>{Sv(e),Cv(e)},jI=e=>{Ev(e),kv(e)},ux=e=>{e.keyDocumentMap&&e.keyDocumentMap.delete(e.changeEvent.id);const t=e.queryParams.primaryKey,n=e.previousResults;for(let i=0;i<n.length;i++)if(n[i][t]===e.changeEvent.id){n.splice(i,1);break}},BI=e=>{const t=e.changeEvent.doc,n=e.queryParams.primaryKey,i=e.previousResults;for(let r=0;r<i.length;r++)if(i[r][n]===e.changeEvent.id){i[r]=t,e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,t);break}},WI=e=>{const t={_id:"wrongHuman"+new Date().getTime()};e.previousResults.length=0,e.previousResults.push(t),e.keyDocumentMap&&(e.keyDocumentMap.clear(),e.keyDocumentMap.set(t._id,t))},hx=e=>{const t=e.changeEvent.id,n=e.changeEvent.doc;if(e.keyDocumentMap){if(e.keyDocumentMap.has(t))return;e.keyDocumentMap.set(t,n)}else if(e.previousResults.find(r=>r[e.queryParams.primaryKey]===t))return;AI(e.previousResults,n,e.queryParams.sortComparator,0)},HI=e=>{ux(e),hx(e)},UI=e=>{throw new Error("Action runFullQueryAgain must be implemented by yourself")},YI=e=>{throw new Error("Action unknownAction should never be called")},VI=["doNothing","insertFirst","insertLast","removeFirstItem","removeLastItem","removeFirstInsertLast","removeLastInsertFirst","removeFirstInsertFirst","removeLastInsertLast","removeExisting","replaceExisting","alwaysWrong","insertAtSortPosition","removeExistingAndInsertAtSortPosition","runFullQueryAgain","unknownAction"],qI={doNothing:LI,insertFirst:Cv,insertLast:kv,removeFirstItem:Sv,removeLastItem:Ev,removeFirstInsertLast:NI,removeLastInsertFirst:FI,removeFirstInsertFirst:zI,removeLastInsertLast:jI,removeExisting:ux,replaceExisting:BI,alwaysWrong:WI,insertAtSortPosition:hx,removeExistingAndInsertAtSortPosition:HI,runFullQueryAgain:UI,unknownAction:YI},KI=40;function Tp(e){return e.charCodeAt(0)-KI}function GI(e){return e?"1":"0"}function Ay(e,t){const n=[];for(let i=0,r=e.length;i<r;i+=t)n.push(e.substring(i,i+t));return n}function XI(e){const t=new Map,i=2+parseInt(e.charAt(0)+e.charAt(1),10)*2,r=e.substring(2,i),s=Ay(r,2);for(let g=0;g<s.length;g++){const m=s[g],b=m.charAt(0),_=Tp(m.charAt(1));t.set(b,_)}const o=e.substring(i,e.length-3),a=Ay(o,4);for(let g=0;g<a.length;g++){const m=a[g],b=m.charAt(0),_=m.charAt(1),C=m.charAt(2),S=Tp(m.charAt(3));if(!t.has(_))throw new Error("missing node with id "+_);if(!t.has(C))throw new Error("missing node with id "+C);const k=t.get(_),$=t.get(C),D={l:S,0:k,1:$};t.set(b,D)}const c=e.slice(-3),l=c.charAt(0),u=c.charAt(1),h=Tp(c.charAt(2)),d=t.get(l),f=t.get(u);return{l:h,0:d,1:f}}function QI(e,t,n){let i=e,r=e.l;for(;;){const s=t[r](n),o=GI(s);if(i=i[o],typeof i=="number"||typeof i=="string")return i;r=i.l}}const ZI="14a1b,c+d2e5f0g/h.i4j*k-l)m(n6oeh6pnm6qen6ril6snh6tin6ubo9vce9wmh9xns9yne9zmi9{cm9|ad9}cp9~aq9ae9¡bf9¢bq9£cg9¤ck9¥cn9¦nd9§np9¨nq9©nf9ªng9«nm9¬nk9­mr9®ms9¯mt9°mj9±mk9²ml9³mn9´mc8µ³{8¶¯}8·°¤8¸³§8¹mn8º³«8»³m8¼m´4½z²4¾³w4¿zµ4À¯¶4Á°·4Â³º4Ã³¸4Äm¹4Åv¤7Æyn7ÇÀÁ7È~7É¥¤7ÊÃÄ7Ë¨n7Ìº¹7Í­°7Î®m7Ï¯°7Ð±m7Ñ³m7Ò¼m5ÓÄm5Ô¹m5Õ½°5Ö¾m5×¿°5ØÇÏ5ÙÂm5ÚÊÑ5Û±m5Üºm5ÝÌÑ5ÞÕÍ2ß|2à¡u2á£Å2âÖÎ2ã¦Æ2ä©x2åªÆ2æ×Ø2ç|È2è¡¢2é£É2ê¤¥2ëÙÚ2ì¦Ë2í©n2îªn2ïÛÐ2ðÜÝ2ñ¬n2òÒÓ/óan/ôbn/õcn/öÞâ/÷ßã/øàä/ùáå/úæë/ûçì/üèí/ýéî/þÍÎ/ÿÏÑ/ĀòÔ,ācn,Ăöï,ă¤ñ,Ąúð,ąêñ,ĆþÐ,ćÿÑ,Ĉac0ĉbc0Ċóõ0ċôā0Čßá0čà¤0Ďçé0ďèê0Đ÷ù0đøă0Ēûý0ēüą0ĔmÒ-ĕmĀ-ĖÞæ-ėČĎ-Ęčď-ęĂĄ-ĚĐĒ-ěđē-Ĝ²»-ĝÍÏ-ĞĆć-ğ²³-ĠĔĈ3ġĕĊ3ĢĖė3ģęĚ3ĤĢĝ(ĥĜğ(ĦģĞ(ħĠġ+Ĩĉċ+ĩĤĦ+ĪĘě+īħĨ1ĬĩĪ1ĭĬī*Įĥm*ĭĮ.";let Op;function JI(){return Op||(Op=XI(ZI)),Op}const tP=e=>QI(JI(),RI,e);function eP(e){const t=tP(e);return VI[t]}function nP(e,t,n,i,r){const s=qI[e];return s({queryParams:t,changeEvent:n,previousResults:i,keyDocumentMap:r}),i}function iP(e,t){return!t.sort||t.sort.length===0?[e]:t.sort.map(n=>Object.keys(n)[0])}var rP=new WeakMap;function sP(e){return yi(rP,e,()=>{var t=e.collection,n=Aa(t.storageInstance.schema,Fn(e.mangoQuery)),i=t.schema.primaryPath,r=oI(t.schema.jsonSchema,n),s=(l,u)=>{var h={docA:l,docB:u};return r(h.docA,h.docB)},o=nx(t.schema.jsonSchema,n),a=l=>{var u={doc:l};return o(u.doc)},c={primaryKey:e.collection.schema.primaryPath,skip:n.skip,limit:n.limit,sortFields:iP(i,n),sortComparator:s,queryMatcher:a};return c})}function oP(e,t){if(!e.collection.database.eventReduce)return{runFullQueryAgain:!0};for(var n=sP(e),i=Q(e._result).docsData.slice(0),r=Q(e._result).docsDataMap,s=!1,o=[],a=0;a<t.length;a++){var c=t[a],l=qT(c);l&&o.push(l)}var u=o.find(h=>{var d={queryParams:n,changeEvent:h,previousResults:i,keyDocumentMap:r},f=eP(d);if(f==="runFullQueryAgain")return!0;if(f!=="doNothing")return s=!0,nP(f,n,h,i,r),!1});return u?{runFullQueryAgain:!0}:{runFullQueryAgain:!1,changed:s,newResults:i}}var aP=(function(){function e(){this._map=new Map}var t=e.prototype;return t.getByQuery=function(i){var r=i.toString(),s=yi(this._map,r,()=>i);return s},e})();function cP(){return new aP}function Ly(e,t){t.uncached=!0;var n=t.toString();e._map.delete(n)}function lP(e){return e.refCount$.observers.length}var uP=100,hP=30*1e3,dP=(e,t)=>(n,i)=>{if(!(i._map.size<e)){var r=Ri()-t,s=[],o=Array.from(i._map.values());for(var a of o)if(!(lP(a)>0)){if(a._lastEnsureEqual===0&&a._creationTime<r){Ly(i,a);continue}s.push(a)}var c=s.length-e;if(!(c<=0)){var l=s.sort((h,d)=>h._lastEnsureEqual-d._lastEnsureEqual),u=l.slice(0,c);u.forEach(h=>Ly(i,h))}}},dx=dP(uP,hP),Ip=new WeakSet;function fP(e){Ip.has(e)||(Ip.add(e),I$().then(()=>R$(200)).then(()=>{e.closed||e.cacheReplacementPolicy(e,e._queryCache),Ip.delete(e)}))}var fx=(function(){function e(n,i,r){this.cacheItemByDocId=new Map,this.tasks=new Set,this.registry=typeof FinalizationRegistry=="function"?new FinalizationRegistry(s=>{var o=s.docId,a=this.cacheItemByDocId.get(o);a&&(a[0].delete(s.revisionHeight+s.lwt+""),a[0].size===0&&this.cacheItemByDocId.delete(o))}):void 0,this.primaryPath=n,this.changes$=i,this.documentCreator=r,i.subscribe(s=>{this.tasks.add(()=>{for(var o=this.cacheItemByDocId,a=0;a<s.length;a++){var c=s[a],l=o.get(c.documentId);if(l){var u=c.documentData;u||(u=c.previousDocumentData),l[1]=u}}}),this.tasks.size<=1&&xf().then(()=>{this.processTasks()})})}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(r=>r()),this.tasks.clear()}},t.getLatestDocumentData=function(i){this.processTasks();var r=Va(this.cacheItemByDocId,i);return r[1]},t.getLatestDocumentDataIfExists=function(i){this.processTasks();var r=this.cacheItemByDocId.get(i);if(r)return r[1]},Ws(e,[{key:"getCachedRxDocuments",get:function(){var n=Ny(this);return Pr(this,"getCachedRxDocuments",n)}},{key:"getCachedRxDocument",get:function(){var n=Ny(this);return Pr(this,"getCachedRxDocument",i=>n([i])[0])}}])})();function Ny(e){var t=e.primaryPath,n=e.cacheItemByDocId,i=e.registry,r=At.deepFreezeWhenDevMode,s=e.documentCreator,o=a=>{for(var c=new Array(a.length),l=[],u=0;u<a.length;u++){var h=a[u],d=h[t],f=Is(h._rev),p=void 0,g=void 0,m=n.get(d);m?(p=m[0],g=p.get(f+h._meta.lwt+"")):(p=new Map,m=[p,h],n.set(d,m));var b=g?g.deref():void 0;b||(h=r(h),b=s(h),p.set(f+h._meta.lwt+"",gP(b)),i&&l.push(b)),c[u]=b}return l.length>0&&i&&(e.tasks.add(()=>{for(var _=0;_<l.length;_++){var C=l[_];i.register(C,{docId:C.primary,revisionHeight:Is(C.revision),lwt:C._data._meta.lwt})}}),e.tasks.size<=1&&xf().then(()=>{e.processTasks()})),c};return o}function Fg(e,t){var n=e.getCachedRxDocuments;return n(t)}var pP=typeof WeakRef=="function",gP=pP?mP:vP;function mP(e){return new WeakRef(e)}function vP(e){return{deref(){return e}}}var Fy=(function(){function e(n,i,r){this.time=Ri(),this.query=n,this.count=r,this.documents=Fg(this.query.collection._docCache,i)}var t=e.prototype;return t.getValue=function(i){var r=this.query.op;if(r==="count")return this.count;if(r==="findOne"){var s=this.documents.length===0?null:this.documents[0];if(!s&&i)throw U("QU10",{collection:this.query.collection.name,query:this.query.mangoQuery,op:r});return s}else return r==="findByIds"?this.docsMap:this.documents.slice(0)},Ws(e,[{key:"docsData",get:function(){return Pr(this,"docsData",this.documents.map(n=>n._data))}},{key:"docsDataMap",get:function(){var n=new Map;return this.documents.forEach(i=>{n.set(i.primary,i._data)}),Pr(this,"docsDataMap",n)}},{key:"docsMap",get:function(){for(var n=new Map,i=this.documents,r=0;r<i.length;r++){var s=i[r];n.set(s.primary,s)}return Pr(this,"docsMap",n)}}])})(),yP=0,bP=function(){return++yP},px=(function(){function e(n,i,r,s={}){this.id=bP(),this._execOverDatabaseCount=0,this._creationTime=Ri(),this._lastEnsureEqual=0,this.uncached=!1,this.refCount$=new ui(null),this._result=null,this._latestChangeEvent=-1,this._ensureEqualQueue=er,this.op=n,this.mangoQuery=i,this.collection=r,this.other=s,i||(this.mangoQuery=Nh()),this.isFindOneByIdQuery=kP(this.collection.schema.primaryPath,i)}var t=e.prototype;return t._setResultData=function(i){if(typeof i>"u")throw U("QU18",{database:this.collection.database.name,collection:this.collection.name});if(typeof i=="number"){this._result=new Fy(this,[],i);return}else i instanceof Map&&(i=Array.from(i.values()));var r=new Fy(this,i,i.length);this._result=r},t._execOverDatabase=async function(){if(this._execOverDatabaseCount=this._execOverDatabaseCount+1,this.op==="count"){var i=this.getPreparedQuery(),r=await this.collection.storageInstance.count(i);if(r.mode==="slow"&&!this.collection.database.allowSlowCount)throw U("QU14",{collection:this.collection,queryObj:this.mangoQuery});return{result:r.count,counter:this.collection._changeEventBuffer.getCounter()}}if(this.op==="findByIds"){var s=Q(this.mangoQuery.selector)[this.collection.schema.primaryPath].$in,o=new Map,a=[];if(s.forEach(u=>{var h=this.collection._docCache.getLatestDocumentDataIfExists(u);if(h){if(!h._deleted){var d=this.collection._docCache.getCachedRxDocument(h);o.set(u,d)}}else a.push(u)}),a.length>0){var c=await this.collection.storageInstance.findDocumentsById(a,!1);c.forEach(u=>{var h=this.collection._docCache.getCachedRxDocument(u);o.set(h.primary,h)})}return{result:o,counter:this.collection._changeEventBuffer.getCounter()}}var l=await CP(this);return{result:l.docs,counter:l.counter}},t.exec=async function(i){if(i&&this.op!=="findOne")throw U("QU9",{collection:this.collection.name,query:this.mangoQuery,op:this.op});await zy(this);var r=Q(this._result);return r.getValue(i)},t.toString=function(){var i=_d({op:this.op,query:Aa(this.collection.schema.jsonSchema,this.mangoQuery),other:this.other},!0),r=JSON.stringify(i);return this.toString=()=>r,r},t.getPreparedQuery=function(){var i={rxQuery:this,mangoQuery:Aa(this.collection.schema.jsonSchema,this.mangoQuery)};i.mangoQuery.selector._deleted={$eq:!1},i.mangoQuery.index&&i.mangoQuery.index.unshift("_deleted"),zn("prePrepareQuery",i);var r=Df(this.collection.schema.jsonSchema,i.mangoQuery);return this.getPreparedQuery=()=>r,r},t.doesDocumentDataMatch=function(i){return i._deleted?!1:this.queryMatcher(i)},t.remove=async function(){var i=await this.exec();if(Array.isArray(i)){var r=await this.collection.bulkRemove(i);if(r.error.length>0)throw h1(r.error[0]);return r.success}else return i.remove()},t.incrementalRemove=function(){return Lc(this.asRxQuery,i=>i.incrementalRemove())},t.update=function(i){throw Rt("update")},t.patch=function(i){return Lc(this.asRxQuery,r=>r.patch(i))},t.incrementalPatch=function(i){return Lc(this.asRxQuery,r=>r.incrementalPatch(i))},t.modify=function(i){return Lc(this.asRxQuery,r=>r.modify(i))},t.incrementalModify=function(i){return Lc(this.asRxQuery,r=>r.incrementalModify(i))},t.where=function(i){throw Rt("query-builder")},t.sort=function(i){throw Rt("query-builder")},t.skip=function(i){throw Rt("query-builder")},t.limit=function(i){throw Rt("query-builder")},Ws(e,[{key:"$",get:function(){if(!this._$){var n=this.collection.eventBulks$.pipe(Ot(i=>!i.isLocal),Lu(null),nr(()=>zy(this)),Ht(()=>this._result),Au(Pu),nu((i,r)=>!!(i&&i.time===Q(r).time)),Ot(i=>!!i),Ht(i=>Q(i).getValue()));this._$=Ig(n,this.refCount$.pipe(Ot(()=>!1)))}return this._$}},{key:"$$",get:function(){var n=this.collection.database.getReactivityFactory();return n.fromObservable(this.$,void 0,this.collection.database)}},{key:"queryMatcher",get:function(){var n=this.collection.schema.jsonSchema,i=Aa(this.collection.schema.jsonSchema,this.mangoQuery);return Pr(this,"queryMatcher",nx(n,i))}},{key:"asRxQuery",get:function(){return this}}])})();function Nh(){return{selector:{}}}function _P(e){return e.collection._queryCache.getByQuery(e)}function Nc(e,t,n,i){zn("preCreateRxQuery",{op:e,queryObj:t,collection:n,other:i});var r=new px(e,t,n,i);return r=_P(r),fP(n),r}function wP(e){var t=e.asRxQuery.collection._changeEventBuffer.getCounter();return e._latestChangeEvent>=t}async function zy(e){return e.collection.awaitBeforeReads.size>0&&await Promise.all(Array.from(e.collection.awaitBeforeReads).map(t=>t())),e._ensureEqualQueue=e._ensureEqualQueue.then(()=>xP(e)),e._ensureEqualQueue}function xP(e){if(e._lastEnsureEqual=Ri(),e.collection.database.closed||wP(e))return er;var t=!1,n=!1;if(e._latestChangeEvent===-1&&(n=!0),!n){var i=e.asRxQuery.collection._changeEventBuffer.getFrom(e._latestChangeEvent+1);if(i===null)n=!0;else{e._latestChangeEvent=e.asRxQuery.collection._changeEventBuffer.getCounter();var r=e.asRxQuery.collection._changeEventBuffer.reduceByLastOfDoc(i);if(e.op==="count"){var s=Q(e._result).count,o=s;r.forEach(c=>{var l=c.previousDocumentData&&e.doesDocumentDataMatch(c.previousDocumentData),u=e.doesDocumentDataMatch(c.documentData);!l&&u&&o++,l&&!u&&o--}),o!==s&&(t=!0,e._setResultData(o))}else{var a=oP(e,r);a.runFullQueryAgain?n=!0:a.changed&&(t=!0,e._setResultData(a.newResults))}}}return n?e._execOverDatabase().then(c=>{var l=c.result;return e._latestChangeEvent=c.counter,typeof l=="number"?((!e._result||l!==e._result.count)&&(t=!0,e._setResultData(l)),t):((!e._result||!C$(e.collection.schema.primaryPath,l,e._result.docsData))&&(t=!0,e._setResultData(l)),t)}):Promise.resolve(t)}async function CP(e){var t=[],n=e.collection;if(e.isFindOneByIdQuery)if(Array.isArray(e.isFindOneByIdQuery)){var i=e.isFindOneByIdQuery;if(i=i.filter(u=>{var h=e.collection._docCache.getLatestDocumentDataIfExists(u);return h?(h._deleted||t.push(h),!1):!0}),i.length>0){var r=await n.storageInstance.findDocumentsById(i,!1);Do(t,r)}}else{var s=e.isFindOneByIdQuery,o=e.collection._docCache.getLatestDocumentDataIfExists(s);if(!o){var a=await n.storageInstance.findDocumentsById([s],!1);a[0]&&(o=a[0])}o&&!o._deleted&&t.push(o)}else{var c=e.getPreparedQuery(),l=await n.storageInstance.query(c);t=l.documents}return{docs:t,counter:n._changeEventBuffer.getCounter()}}function kP(e,t){if(!t.skip&&t.selector&&Object.keys(t.selector).length===1&&t.selector[e]){var n=t.selector[e];if(typeof n=="string")return n;if(Object.keys(n).length===1&&typeof n.$eq=="string"||Object.keys(n).length===1&&Array.isArray(n.$eq)&&!n.$eq.find(i=>typeof i!="string"))return n.$eq}return!1}var Ds="collection",Mv="storage-token",Fh="rx-migration-status",SP="rx-pipeline-checkpoint",EP="RxInternalDocument",Dv=Cf({version:0,title:EP,primaryKey:{key:"id",fields:["context","key"],separator:"|"},type:"object",properties:{id:{type:"string",maxLength:200},key:{type:"string"},context:{type:"string",enum:[Ds,Mv,Fh,SP,"OTHER"]},data:{type:"object",additionalProperties:!0}},indexes:[],required:["key","context","data"],additionalProperties:!1,sharding:{shards:1,mode:"collection"}});function Ro(e,t){return Hs(Dv,{key:e,context:t})}async function gx(e){var t=Df(e.schema,{selector:{context:Ds,_deleted:{$eq:!1}},sort:[{id:"asc"}],skip:0}),n=await e.query(t),i=n.documents;return i}var mx="storageToken",MP=Ro(mx,Mv);async function DP(e){var t=Go(10),n=e.password?await e.hashFunction(JSON.stringify(e.password)):void 0,i={id:MP,context:Mv,key:mx,data:{rxdbVersion:e.rxdbVersion,token:t,instanceToken:e.token,passwordHash:n},_deleted:!1,_meta:mc(),_rev:Oi(),_attachments:{}},r=[{document:i}],s=await e.internalStore.bulkWrite(r,"internal-add-storage-token");if(!s.error[0])return bi("id",r,s)[0];var o=Q(s.error[0]);if(o.isError&&Ua(o)){var a=o;if(!$P(a.documentInDb.data.rxdbVersion,e.rxdbVersion))throw U("DM5",{args:{database:e.name,databaseStateVersion:a.documentInDb.data.rxdbVersion,codeVersion:e.rxdbVersion}});if(n&&n!==a.documentInDb.data.passwordHash)throw U("DB1",{passwordHash:n,existingPasswordHash:a.documentInDb.data.passwordHash});var c=a.documentInDb;return Q(c)}throw o}function $P(e,t){if(!e)return!1;var n=e.split(".")[0],i=t.split(".")[0];return n==="15"&&i==="16"?!0:n===i}async function vx(e,t,n){if(e.schema.version!==n.version)throw U("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=$d(e.name,e.schema.jsonSchema),r=Ro(i,Ds);;){var s=await bc(e.database.internalStore,r),o=Fn(Q(s)),a=o.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(a)return;o.data.connectedStorages.push({collectionName:t,schema:n});try{await Xa(e.database.internalStore,{previous:Q(s),document:o},"add-connected-storage-to-collection")}catch(c){if(!Ua(c))throw c}}}async function TP(e,t,n){if(e.schema.version!==n.version)throw U("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=$d(e.name,e.schema.jsonSchema),r=Ro(i,Ds);;){var s=await bc(e.database.internalStore,r),o=Fn(Q(s)),a=o.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(!a)return;o.data.connectedStorages=o.data.connectedStorages.filter(c=>c.collectionName!==t);try{await Xa(e.database.internalStore,{previous:Q(s),document:o},"remove-connected-storage-from-collection")}catch(c){if(!Ua(c))throw c}}}function $d(e,t){return e+"-"+t.version}function ph(e,t){return t=Vt(t),t=K$(e,t),typeof e.jsonSchema.primaryKey!="string"&&(t=W$(e.primaryPath,e.jsonSchema,t)),t._meta=mc(),Object.prototype.hasOwnProperty.call(t,"_deleted")||(t._deleted=!1),Object.prototype.hasOwnProperty.call(t,"_attachments")||(t._attachments={}),Object.prototype.hasOwnProperty.call(t,"_rev")||(t._rev=Oi()),t}async function OP(e,t){t.multiInstance=e.multiInstance;var n=await e.storage.createStorageInstance(t);return n}async function yx(e,t,n,i,r,s,o,a){var c=await gx(t),l=c.filter(f=>f.data.name===r),u=[];l.forEach(f=>{u.push({collectionName:f.data.name,schema:f.data.schema,isCollection:!0}),f.data.connectedStorages.forEach(p=>u.push({collectionName:p.collectionName,isCollection:!1,schema:p.schema}))});var h=new Set;if(u=u.filter(f=>{var p=f.collectionName+"||"+f.schema.version;return h.has(p)?!1:(h.add(p),!0)}),await Promise.all(u.map(async f=>{var p=await e.createStorageInstance({collectionName:f.collectionName,databaseInstanceToken:n,databaseName:i,multiInstance:s,options:{},schema:f.schema,password:o,devMode:At.isDevMode()});await p.remove(),f.isCollection&&await $o("postRemoveRxCollection",{storage:e,databaseName:i,collectionName:r})})),a){var d=l.map(f=>{var p=$f(f);return p._deleted=!0,p._meta.lwt=Ri(),p._rev=Br(n,f),{previous:f,document:p}});await t.bulkWrite(d,"rx-database-remove-collection-all")}}function oi(e){if(e.closed)throw U("COL21",{collection:e.name,version:e.schema.version})}var IP=(function(){function e(n){this.subs=[],this.counter=0,this.eventCounterMap=new WeakMap,this.buffer=[],this.limit=100,this.tasks=new Set,this.collection=n,this.subs.push(this.collection.eventBulks$.pipe(Ot(i=>!i.isLocal)).subscribe(i=>{this.tasks.add(()=>this._handleChangeEvents(i.events)),this.tasks.size<=1&&xf().then(()=>{this.processTasks()})}))}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(r=>r()),this.tasks.clear()}},t._handleChangeEvents=function(i){var r=this.counter;this.counter=this.counter+i.length,i.length>this.limit?this.buffer=i.slice(i.length*-1):(Do(this.buffer,i),this.buffer=this.buffer.slice(this.limit*-1));for(var s=r+1,o=this.eventCounterMap,a=0;a<i.length;a++){var c=i[a];o.set(c,s+a)}},t.getCounter=function(){return this.processTasks(),this.counter},t.getBuffer=function(){return this.processTasks(),this.buffer},t.getArrayIndexByPointer=function(i){this.processTasks();var r=this.buffer[0],s=this.eventCounterMap.get(r);if(i<s)return null;var o=i-s;return o},t.getFrom=function(i){this.processTasks();var r=[],s=this.getArrayIndexByPointer(i);if(s===null)return null;for(;;){var o=this.buffer[s];if(s++,o)r.push(o);else return r}},t.runFrom=function(i,r){this.processTasks();var s=this.getFrom(i);if(s===null)throw new Error("out of bounds");s.forEach(o=>r(o))},t.reduceByLastOfDoc=function(i){return this.processTasks(),i.slice(0)},t.close=function(){this.tasks.clear(),this.subs.forEach(i=>i.unsubscribe())},e})();function PP(e){return new IP(e)}var RP=new WeakMap;function AP(e){var t=e.schema.getDocumentPrototype(),n=FP(e),i=Tf,r={};return[t,n,i].forEach(s=>{var o=Object.getOwnPropertyNames(s);o.forEach(a=>{var c=Object.getOwnPropertyDescriptor(s,a),l=!0;(a.startsWith("_")||a.endsWith("_")||a.startsWith("$")||a.endsWith("$"))&&(l=!1),typeof c.value=="function"?Object.defineProperty(r,a,{get(){return c.value.bind(this)},enumerable:l,configurable:!1}):(c.enumerable=l,c.configurable=!1,c.writable&&(c.writable=!1),Object.defineProperty(r,a,c))})}),r}function LP(e){return yi(RP,e,()=>ox(AP(e)))}function NP(e,t,n){var i=pI(t,e,At.deepFreezeWhenDevMode(n));return e._runHooksSync("post","create",n,i),zn("postCreateRxDocument",i),i}function FP(e){var t={};return Object.entries(e.methods).forEach(([n,i])=>{t[n]=i}),t}var Td={isEqual(e,t,n){e=jy(e),t=jy(t);var i=Jl(qi(e),qi(t));return i},resolve(e){return e.realMasterState}};function jy(e){return e._attachments||(e=Vt(e),e._attachments={}),e}var bx=["pre","post"],_x=["insert","save","remove","create"],By=!1,ba=new Set,wx=(function(){function e(n,i,r,s,o={},a={},c={},l={},u={},h=dx,d={},f=Td){this.storageInstance={},this.timeouts=new Set,this.incrementalWriteQueue={},this.awaitBeforeReads=new Set,this._incrementalUpsertQueues=new Map,this.synced=!1,this.hooks={},this._subs=[],this._docCache={},this._queryCache=cP(),this.$={},this.checkpoint$={},this._changeEventBuffer={},this.eventBulks$={},this.onClose=[],this.closed=!1,this.onRemove=[],this.database=n,this.name=i,this.schema=r,this.internalStorageInstance=s,this.instanceCreationOptions=o,this.migrationStrategies=a,this.methods=c,this.attachments=l,this.options=u,this.cacheReplacementPolicy=h,this.statics=d,this.conflictHandler=f,zP(this.asRxCollection),n&&(this.eventBulks$=n.eventBulks$.pipe(Ot(p=>p.collectionName===this.name))),this.database&&ba.add(this)}var t=e.prototype;return t.prepare=async function(){if(!await B$()){for(var i=0;i<10&&ba.size>py;)i++,await this.promiseWait(30);if(ba.size>py)throw U("COL23",{database:this.database.name,collection:this.name,args:{existing:Array.from(ba.values()).map(c=>({db:c.database?c.database.name:"",c:c.name}))}})}this.storageInstance=wv(this.database,this.internalStorageInstance,this.schema.jsonSchema),this.incrementalWriteQueue=new sx(this.storageInstance,this.schema.primaryPath,(c,l)=>ax(this,c,l),c=>this._runHooks("post","save",c)),this.$=this.eventBulks$.pipe(nr(c=>j1(c))),this.checkpoint$=this.eventBulks$.pipe(Ht(c=>c.checkpoint)),this._changeEventBuffer=PP(this.asRxCollection);var r;this._docCache=new fx(this.schema.primaryPath,this.eventBulks$.pipe(Ot(c=>!c.isLocal),Ht(c=>c.events)),c=>(r||(r=LP(this.asRxCollection)),NP(this.asRxCollection,r,c)));var s=this.database.internalStore.changeStream().pipe(Ot(c=>{var l=this.name+"-"+this.schema.version,u=c.events.find(h=>h.documentData.context==="collection"&&h.documentData.key===l&&h.operation==="DELETE");return!!u})).subscribe(async()=>{await this.close(),await Promise.all(this.onRemove.map(c=>c()))});this._subs.push(s);var o=await this.database.storageToken,a=this.storageInstance.changeStream().subscribe(c=>{var l={id:c.id,isLocal:!1,internal:!1,collectionName:this.name,storageToken:o,events:c.events,databaseToken:this.database.token,checkpoint:c.checkpoint,context:c.context};this.database.$emit(l)});return this._subs.push(a),di},t.cleanup=function(i){throw oi(this),Rt("cleanup")},t.migrationNeeded=function(){throw Rt("migration-schema")},t.getMigrationState=function(){throw Rt("migration-schema")},t.startMigration=function(i=10){return oi(this),this.getMigrationState().startMigration(i)},t.migratePromise=function(i=10){return this.getMigrationState().migratePromise(i)},t.insert=async function(i){oi(this);var r=await this.bulkInsert([i]),s=r.error[0];Md(this,i[this.schema.primaryPath],i,s);var o=Q(r.success[0]);return o},t.insertIfNotExists=async function(i){var r=await this.bulkInsert([i]);if(r.error.length>0){var s=r.error[0];if(s.status===409){var o=s.documentInDb;return Fg(this._docCache,[o])[0]}else throw s}return r.success[0]},t.bulkInsert=async function(i){if(oi(this),i.length===0)return{success:[],error:[]};var r=this.schema.primaryPath,s=new Set,o;if(this.hasHooks("pre","insert"))o=await Promise.all(i.map(m=>{var b=ph(this.schema,m);return this._runHooks("pre","insert",b).then(()=>(s.add(b[r]),{document:b}))}));else{o=new Array(i.length);for(var a=this.schema,c=0;c<i.length;c++){var l=i[c],u=ph(a,l);s.add(u[r]),o[c]={document:u}}}if(s.size!==i.length)throw U("COL22",{collection:this.name,args:{documents:i}});var h=await this.storageInstance.bulkWrite(o,"rx-collection-bulk-insert"),d,f=this,p={get success(){if(!d){var m=bi(f.schema.primaryPath,o,h);d=Fg(f._docCache,m)}return d},error:h.error};if(this.hasHooks("post","insert")){var g=new Map;o.forEach(m=>{var b=m.document;g.set(b[r],b)}),await Promise.all(p.success.map(m=>this._runHooks("post","insert",g.get(m.primary),m)))}return p},t.bulkRemove=async function(i){oi(this);var r=this.schema.primaryPath;if(i.length===0)return{success:[],error:[]};var s;typeof i[0]=="string"?s=await this.findByIds(i).exec():(s=new Map,i.forEach(f=>s.set(f.primary,f)));var o=[],a=new Map;Array.from(s.values()).forEach(f=>{var p=f.toMutableJSON(!0);o.push(p),a.set(f.primary,p)}),await Promise.all(o.map(f=>{var p=f[this.schema.primaryPath];return this._runHooks("pre","remove",f,s.get(p))}));var c=o.map(f=>{var p=Vt(f);return p._deleted=!0,{previous:f,document:p}}),l=await this.storageInstance.bulkWrite(c,"rx-collection-bulk-remove"),u=bi(this.schema.primaryPath,c,l),h=[],d=u.map(f=>{var p=f[r],g=this._docCache.getCachedRxDocument(f);return h.push(g),p});return await Promise.all(d.map(f=>this._runHooks("post","remove",a.get(f),s.get(f)))),{success:h,error:l.error}},t.bulkUpsert=async function(i){oi(this);var r=[],s=new Map;i.forEach(l=>{var u=ph(this.schema,l),h=u[this.schema.primaryPath];if(!h)throw U("COL3",{primaryPath:this.schema.primaryPath,data:u,schema:this.schema.jsonSchema});s.set(h,u),r.push(u)});var o=await this.bulkInsert(r),a=o.success.slice(0),c=[];return await Promise.all(o.error.map(async l=>{if(l.status!==409)c.push(l);else{var u=l.documentId,h=Va(s,u),d=Q(l.documentInDb),f=this._docCache.getCachedRxDocuments([d])[0],p=await f.incrementalModify(()=>h);a.push(p)}})),{error:c,success:a}},t.upsert=async function(i){oi(this);var r=await this.bulkUpsert([i]);return Md(this.asRxCollection,i[this.schema.primaryPath],i,r.error[0]),r.success[0]},t.incrementalUpsert=function(i){oi(this);var r=ph(this.schema,i),s=r[this.schema.primaryPath];if(!s)throw U("COL4",{data:i});var o=this._incrementalUpsertQueues.get(s);return o||(o=di),o=o.then(()=>BP(this,s,r)).then(a=>a.inserted?a.doc:jP(a.doc,r)),this._incrementalUpsertQueues.set(s,o),o},t.find=function(i){oi(this),zn("prePrepareRxQuery",{op:"find",queryObj:i,collection:this}),i||(i=Nh());var r=Nc("find",i,this);return r},t.findOne=function(i){oi(this),zn("prePrepareRxQuery",{op:"findOne",queryObj:i,collection:this});var r;if(typeof i=="string")r=Nc("findOne",{selector:{[this.schema.primaryPath]:i},limit:1},this);else{if(i||(i=Nh()),i.limit)throw U("QU6");i=Vt(i),i.limit=1,r=Nc("findOne",i,this)}return r},t.count=function(i){oi(this),i||(i=Nh());var r=Nc("count",i,this);return r},t.findByIds=function(i){oi(this);var r={selector:{[this.schema.primaryPath]:{$in:i.slice(0)}}},s=Nc("findByIds",r,this);return s},t.exportJSON=function(){throw Rt("json-dump")},t.importJSON=function(i){throw Rt("json-dump")},t.insertCRDT=function(i){throw Rt("crdt")},t.addPipeline=function(i){throw Rt("pipeline")},t.addHook=function(i,r,s,o=!1){if(typeof s!="function")throw xd("COL7",{key:r,when:i});if(!bx.includes(i))throw xd("COL8",{key:r,when:i});if(!_x.includes(r))throw U("COL9",{key:r});if(i==="post"&&r==="create"&&o===!0)throw U("COL10",{when:i,key:r,parallel:o});var a=s.bind(this),c=o?"parallel":"series";this.hooks[r]=this.hooks[r]||{},this.hooks[r][i]=this.hooks[r][i]||{series:[],parallel:[]},this.hooks[r][i][c].push(a)},t.getHooks=function(i,r){return!this.hooks[r]||!this.hooks[r][i]?{series:[],parallel:[]}:this.hooks[r][i]},t.hasHooks=function(i,r){if(!this.hooks[r]||!this.hooks[r][i])return!1;var s=this.getHooks(i,r);return s?s.series.length>0||s.parallel.length>0:!1},t._runHooks=function(i,r,s,o){var a=this.getHooks(i,r);if(!a)return di;var c=a.series.map(l=>()=>l(s,o));return A$(c).then(()=>Promise.all(a.parallel.map(l=>l(s,o))))},t._runHooksSync=function(i,r,s,o){if(this.hasHooks(i,r)){var a=this.getHooks(i,r);a&&a.series.forEach(c=>c(s,o))}},t.promiseWait=function(i){var r=new Promise(s=>{var o=setTimeout(()=>{this.timeouts.delete(o),s()},i);this.timeouts.add(o)});return r},t.close=async function(){return this.closed?er:(ba.delete(this),await Promise.all(this.onClose.map(i=>i())),this.closed=!0,Array.from(this.timeouts).forEach(i=>clearTimeout(i)),this._changeEventBuffer&&this._changeEventBuffer.close(),this.database.requestIdlePromise().then(()=>this.storageInstance.close()).then(()=>(this._subs.forEach(i=>i.unsubscribe()),delete this.database.collections[this.name],$o("postCloseRxCollection",this).then(()=>!0))))},t.remove=async function(){await this.close(),await Promise.all(this.onRemove.map(i=>i())),await yx(this.database.storage,this.database.internalStore,this.database.token,this.database.name,this.name,this.database.multiInstance,this.database.password,this.database.hashFunction)},Ws(e,[{key:"insert$",get:function(){return this.$.pipe(Ot(n=>n.operation==="INSERT"))}},{key:"update$",get:function(){return this.$.pipe(Ot(n=>n.operation==="UPDATE"))}},{key:"remove$",get:function(){return this.$.pipe(Ot(n=>n.operation==="DELETE"))}},{key:"asRxCollection",get:function(){return this}}])})();function zP(e){if(!By){By=!0;var t=Object.getPrototypeOf(e);_x.forEach(n=>{bx.map(i=>{var r=i+p1(n);t[r]=function(s,o){return this.addHook(i,n,s,o)}})})}}function jP(e,t){return e.incrementalModify(n=>t)}function BP(e,t,n){var i=e._docCache.getLatestDocumentDataIfExists(t);return i?Promise.resolve({doc:e._docCache.getCachedRxDocuments([i])[0],inserted:!1}):e.findOne(t).exec().then(r=>r?{doc:r,inserted:!1}:e.insert(n).then(s=>({doc:s,inserted:!0})))}async function WP({database:e,name:t,schema:n,instanceCreationOptions:i={},migrationStrategies:r={},autoMigrate:s=!0,statics:o={},methods:a={},attachments:c={},options:l={},localDocuments:u=!1,cacheReplacementPolicy:h=dx,conflictHandler:d=Td}){var f={databaseInstanceToken:e.token,databaseName:e.name,collectionName:t,schema:n.jsonSchema,options:i,multiInstance:e.multiInstance,password:e.password,devMode:At.isDevMode()};zn("preCreateRxStorageInstance",f);var p=await OP(e,f),g=new wx(e,t,n,p,i,r,a,c,l,h,o,d);try{await g.prepare(),Object.entries(o).forEach(([m,b])=>{Object.defineProperty(g,m,{get:()=>b.bind(g)})}),zn("createRxCollection",{collection:g,creator:{name:t,schema:n,storageInstance:p,instanceCreationOptions:i,migrationStrategies:r,methods:a,attachments:c,options:l,cacheReplacementPolicy:h,localDocuments:u,statics:o}}),s&&g.schema.version!==0&&await g.migratePromise()}catch(m){throw ba.delete(g),await p.close(),m}return g}var xx=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;this._parallels=t||1,this._qC=0,this._iC=new Set,this._lHN=0,this._hPM=new Map,this._pHM=new Map};xx.prototype={isIdle:function(){return this._qC<this._parallels},lock:function(){this._qC++},unlock:function(){this._qC--,zg(this)},wrapCall:function(t){var n=this;this._qC++;var i;try{i=t()}catch(r){throw this.unlock(),r}return!i.then||typeof i.then!="function"?(this.unlock(),i):i.then(function(r){return n.unlock(),r}).catch(function(r){throw n.unlock(),r})},requestIdlePromise:function(t){var n=this;t=t||{};var i,r=new Promise(function(a){return i=a}),s=function(){Pp(n,r),i()};if(r._manRes=s,t.timeout){var o=setTimeout(function(){r._manRes()},t.timeout);r._timeoutObj=o}return this._iC.add(r),zg(this),r},cancelIdlePromise:function(t){Pp(this,t)},requestIdleCallback:function(t,n){var i=this._lHN++,r=this.requestIdlePromise(n);return this._hPM.set(i,r),this._pHM.set(r,i),r.then(function(){return t()}),i},cancelIdleCallback:function(t){var n=this._hPM.get(t);this.cancelIdlePromise(n)},clear:function(){var t=this;this._iC.forEach(function(n){return Pp(t,n)}),this._qC=0,this._iC.clear(),this._hPM=new Map,this._pHM=new Map}};function HP(e){if(e._iC.size!==0){var t=e._iC.values(),n=t.next().value;n._manRes(),setTimeout(function(){return zg(e)},0)}}function Pp(e,t){if(t){if(t._timeoutObj&&clearTimeout(t._timeoutObj),e._pHM.has(t)){var n=e._pHM.get(t);e._hPM.delete(n),e._pHM.delete(t)}e._iC.delete(t)}}function zg(e){e._tryIR||e._iC.size===0||(e._tryIR=!0,setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}HP(e),e._tryIR=!1},0)},0))}let UP=class{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){return this.map.has(t)}add(t){this.map.set(t,Cx()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,YP(this)},0))}clear(){this.map.clear()}};function YP(e){const t=Cx()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)return;const r=i[0];if(i[1]<t)e.map.delete(r);else return}}function Cx(){return Date.now()}var jg=new Set,Wy=new Map,$v=(function(){function e(n,i,r,s,o,a,c=!1,l={},u,h,d,f,p,g){this.idleQueue=new xx,this.rxdbVersion=z$,this.storageInstances=new Set,this._subs=[],this.startupErrors=[],this.onClose=[],this.closed=!1,this.collections={},this.states={},this.eventBulks$=new Fe,this.closePromise=null,this.observable$=this.eventBulks$.pipe(nr(m=>j1(m))),this.storageToken=er,this.storageTokenDocument=er,this.emittedEventBulkIds=new UP(60*1e3),this.name=n,this.token=i,this.storage=r,this.instanceCreationOptions=s,this.password=o,this.multiInstance=a,this.eventReduce=c,this.options=l,this.internalStore=u,this.hashFunction=h,this.cleanupPolicy=d,this.allowSlowCount=f,this.reactivity=p,this.onClosed=g,this.name!=="pseudoInstance"&&(this.internalStore=wv(this.asRxDatabase,u,Dv),this.storageTokenDocument=DP(this.asRxDatabase).catch(m=>this.startupErrors.push(m)),this.storageToken=this.storageTokenDocument.then(m=>m.data.token).catch(m=>this.startupErrors.push(m)))}var t=e.prototype;return t.getReactivityFactory=function(){if(!this.reactivity)throw U("DB14",{database:this.name});return this.reactivity},t.$emit=function(i){this.emittedEventBulkIds.has(i.id)||(this.emittedEventBulkIds.add(i.id),this.eventBulks$.next(i))},t.removeCollectionDoc=async function(i,r){var s=await bc(this.internalStore,Ro($d(i,r),Ds));if(!s)throw U("SNH",{name:i,schema:r});var o=$f(s);o._deleted=!0,await this.internalStore.bulkWrite([{document:o,previous:s}],"rx-database-remove-collection")},t.addCollections=async function(i){var r={},s={},o=[],a={};await Promise.all(Object.entries(i).map(async([u,h])=>{var d=u,f=h.schema;r[d]=f;var p=Q$(f,this.hashFunction);if(s[d]=p,this.collections[u])throw U("DB3",{name:u});var g=$d(u,f),m={id:Ro(g,Ds),key:g,context:Ds,data:{name:d,schemaHash:await p.hash,schema:p.jsonSchema,version:p.version,connectedStorages:[]},_deleted:!1,_meta:mc(),_rev:Oi(),_attachments:{}};o.push({document:m});var b=Object.assign({},h,{name:d,schema:p,database:this}),_=Vt(h);_.database=this,_.name=u,zn("preCreateRxCollection",_),b.conflictHandler=_.conflictHandler,a[d]=b}));var c=await this.internalStore.bulkWrite(o,"rx-database-add-collection");await XP(this),await Promise.all(c.error.map(async u=>{if(u.status!==409)throw U("DB12",{database:this.name,writeError:u});var h=Q(u.documentInDb),d=h.data.name,f=s[d];if(h.data.schemaHash!==await f.hash)throw U("DB6",{database:this.name,collection:d,previousSchemaHash:h.data.schemaHash,schemaHash:await f.hash,previousSchema:h.data.schema,schema:Q(r[d])})}));var l={};return await Promise.all(Object.keys(i).map(async u=>{var h=a[u],d=await WP(h);l[u]=d,this.collections[u]=d,this[u]||Object.defineProperty(this,u,{get:()=>this.collections[u]})})),l},t.lockedRun=function(i){return this.idleQueue.wrapCall(i)},t.requestIdlePromise=function(){return this.idleQueue.requestIdlePromise()},t.exportJSON=function(i){throw Rt("json-dump")},t.addState=function(i){throw Rt("state")},t.importJSON=function(i){throw Rt("json-dump")},t.backup=function(i){throw Rt("backup")},t.leaderElector=function(){throw Rt("leader-election")},t.isLeader=function(){throw Rt("leader-election")},t.waitForLeadership=function(){throw Rt("leader-election")},t.migrationStates=function(){throw Rt("migration-schema")},t.close=function(){if(this.closePromise)return this.closePromise;var{promise:i,resolve:r}=kx(),s=o=>{this.onClosed&&this.onClosed(),this.closed=!0,r(o)};return this.closePromise=i,(async()=>{if(await $o("preCloseRxDatabase",this),this.eventBulks$.complete(),this._subs.map(o=>o.unsubscribe()),this.name==="pseudoInstance"){s(!1);return}return this.requestIdlePromise().then(()=>Promise.all(this.onClose.map(o=>o()))).then(()=>Promise.all(Object.keys(this.collections).map(o=>this.collections[o]).map(o=>o.close()))).then(()=>this.internalStore.close()).then(()=>s(!0))})(),i},t.remove=function(){return this.close().then(()=>KP(this.name,this.storage,this.multiInstance,this.password))},Ws(e,[{key:"$",get:function(){return this.observable$}},{key:"asRxDatabase",get:function(){return this}}])})();function VP(e,t){if(jg.has(Sx(e,t)))throw U("DB8",{name:e,storage:t.name,link:"https://rxdb.info/rx-database.html#ignoreduplicate"})}function kx(){var e,t,n=new Promise((i,r)=>{e=i,t=r});return{promise:n,resolve:e,reject:t}}function Sx(e,t){return t.name+"|"+e}async function Ex(e,t,n,i,r,s){var o=await t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:aI,schema:Dv,options:i,multiInstance:r,password:s,devMode:At.isDevMode()});return o}function qP({storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r=!0,eventReduce:s=!0,ignoreDuplicate:o=!1,options:a={},cleanupPolicy:c,closeDuplicates:l=!1,allowSlowCount:u=!1,localDocuments:h=!1,hashFunction:d=d1,reactivity:f}){zn("preCreateRxDatabase",{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r,eventReduce:s,ignoreDuplicate:o,options:a,localDocuments:h});var p=Sx(n,e),g=Wy.get(p)||new Set,m=kx(),b=Array.from(g),_=()=>{g.delete(m.promise),jg.delete(p)};return g.add(m.promise),Wy.set(p,g),(async()=>{if(l&&await Promise.all(b.map($=>$.catch(()=>null).then(D=>D&&D.close()))),o){if(!At.isDevMode())throw U("DB9",{database:n})}else VP(n,e);jg.add(p);var C=Go(10),S=await Ex(C,e,n,t,r,i),k=new $v(n,C,e,t,i,r,s,a,S,d,c,u,f,_);return await $o("createRxDatabase",{database:k,creator:{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r,eventReduce:s,ignoreDuplicate:o,options:a,localDocuments:h}}),k})().then(C=>{m.resolve(C)}).catch(C=>{m.reject(C),_()}),m.promise}async function KP(e,t,n=!0,i){var r=Go(10),s=await Ex(r,t,e,{},n,i),o=await gx(s),a=new Set;o.forEach(l=>a.add(l.data.name));var c=Array.from(a);return await Promise.all(c.map(l=>yx(t,s,r,e,l,n,i))),await $o("postRemoveRxDatabase",{databaseName:e,storage:t}),await s.remove(),c}function GP(e){return e instanceof $v}async function XP(e){if(await e.storageToken,e.startupErrors[0])throw e.startupErrors[0]}var QP={RxSchema:y1.prototype,RxDocument:Tf,RxQuery:px.prototype,RxCollection:wx.prototype,RxDatabase:$v.prototype},Rp=new Set,Hy=new Set;function Tv(e){if(zn("preAddRxPlugin",{plugin:e,plugins:Rp}),!Rp.has(e)){{if(Hy.has(e.name))throw U("PL3",{name:e.name,plugin:e});Rp.add(e),Hy.add(e.name)}if(!e.rxdb)throw xd("PL1",{plugin:e});e.init&&e.init(),e.prototypes&&Object.entries(e.prototypes).forEach(([t,n])=>n(QP[t])),e.overwritable&&Object.assign(At,e.overwritable),e.hooks&&Object.entries(e.hooks).forEach(([t,n])=>{n.after&&tu[t].push(n.after),n.before&&tu[t].unshift(n.before)})}}async function Od(e,t){var n=Hs(e.input.metaInstance.schema,{isCheckpoint:"1",itemId:t}),i=await e.input.metaInstance.findDocumentsById([n],!1),r=i[0];if(e.lastCheckpointDoc[t]=r,r)return r.checkpointData}async function Id(e,t,n){e.checkpointQueue=e.checkpointQueue.then(async()=>{var i=e.lastCheckpointDoc[t];if(n&&!e.events.canceled.getValue()&&(!i||JSON.stringify(i.checkpointData)!==JSON.stringify(n))){var r={id:"",isCheckpoint:"1",itemId:t,_deleted:!1,_attachments:{},checkpointData:n,_meta:mc(),_rev:Oi()};for(r.id=Hs(e.input.metaInstance.schema,r);!e.events.canceled.getValue();){if(i&&(r.checkpointData=lu([i.checkpointData,r.checkpointData])),r._meta.lwt=Ri(),r._rev=Br(await e.checkpointKey,i),e.events.canceled.getValue())return;var s=[{previous:i,document:r}],o=await e.input.metaInstance.bulkWrite(s,"replication-set-checkpoint"),a=bi(e.primaryPath,s,o)[0];if(a){e.lastCheckpointDoc[t]=a;return}else{var c=o.error[0];if(c.status!==409)throw c;i=Q(c.documentInDb),r._rev=Br(await e.checkpointKey,i)}}}}),await e.checkpointQueue}async function ZP(e){var t=await e.hashFunction([e.identifier,e.forkInstance.databaseName,e.forkInstance.collectionName].join("||"));return"rx_storage_replication_"+t}function Uy(e,t,n,i,r){var s=Object.assign({},i,{_attachments:t&&i._attachments?i._attachments:{},_meta:n?i._meta:Object.assign({},r?r._meta:{},{lwt:Ri()}),_rev:n?i._rev:Oi()});return s._rev||(s._rev=Br(e,r)),s}function as(e,t,n){var i=Vt(e);return t||delete i._attachments,n||(delete i._meta,delete i._rev),i}function Bg(e,t){return e.hasAttachments?t.map(n=>{var i=Fn(n.document);return i.docData=qi(i.docData),{document:i,previous:n.previous}}):t}function Wg(e){for(;;)if(e.underlyingPersistentStorage)e=e.underlyingPersistentStorage;else return e}var zh="RxReplicationProtocolMetaData";function Hg(e,t){var n=H$(e),i={title:zh,primaryKey:{key:"id",fields:["itemId","isCheckpoint"],separator:"|"},type:"object",version:e.version,additionalProperties:!1,properties:{id:{type:"string",minLength:1,maxLength:n+2},isCheckpoint:{type:"string",enum:["0","1"],minLength:1,maxLength:1},itemId:{type:"string",maxLength:n>4?n:4},checkpointData:{type:"object",additionalProperties:!0},docData:{type:"object",properties:e.properties},isResolvedConflict:{type:"string"}},keyCompression:e.keyCompression,required:["id","isCheckpoint","itemId"]};t&&(i.encrypted=["docData"]);var r=Cf(i);return r}function Mx(e,t){return e.input.metaInstance.findDocumentsById(t.map(n=>{var i=Hs(e.input.metaInstance.schema,{itemId:n,isCheckpoint:"0"});return i}),!0).then(n=>{var i={};return Object.values(n).forEach(r=>{i[r.itemId]={docData:r.docData,metaDocument:r}}),i})}async function Pd(e,t,n,i){var r=t[e.primaryPath],s=n?$f(n):{id:"",isCheckpoint:"0",itemId:r,docData:t,_attachments:{},_deleted:!1,_rev:Oi(),_meta:{lwt:0}};s.docData=t,i&&(s.isResolvedConflict=i),s._meta.lwt=Ri(),s.id=Hs(e.input.metaInstance.schema,s),s._rev=Br(await e.checkpointKey,n);var o={previous:n,document:s};return o}async function JP(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.downstream){var t=await Od(e,"down");t||await Id(e,"down",e.input.initialCheckpoint.downstream)}var n=await e.input.hashFunction(e.input.identifier),i=e.input.replicationHandler,r=0,s=[];function o(p){e.stats.down.addNewTask=e.stats.down.addNewTask+1;var g={time:r++,task:p};s.push(g),e.streamQueue.down=e.streamQueue.down.then(()=>{for(var m=[];s.length>0;){e.events.active.down.next(!0);var b=Q(s.shift());if(!(b.time<c)){if(b.task==="RESYNC")if(m.length===0){m.push(b.task);break}else break;m.push(b.task)}}if(m.length!==0)return m[0]==="RESYNC"?l():u(m)}).then(()=>{e.events.active.down.next(!1),!e.firstSyncDone.down.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.down.next(!0)})}if(o("RESYNC"),!e.events.canceled.getValue()){var a=i.masterChangeStream$.pipe(nr(async p=>(await Rr(e.events.active.up.pipe(Ot(g=>!g))),p))).subscribe(p=>{e.stats.down.masterChangeStreamEmit=e.stats.down.masterChangeStreamEmit+1,o(p)});Rr(e.events.canceled.pipe(Ot(p=>!!p))).then(()=>a.unsubscribe())}var c=-1;async function l(){if(e.stats.down.downstreamResyncOnce=e.stats.down.downstreamResyncOnce+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>Od(e,"down"));for(var p=await e.checkpointQueue,g=[];!e.events.canceled.getValue();){c=r++;var m=await i.masterChangesSince(p,e.input.pullBatchSize);if(m.documents.length===0||(p=lu([p,m.checkpoint]),g.push(f(m.documents,p)),m.documents.length<e.input.pullBatchSize))break}await Promise.all(g)}}function u(p){e.stats.down.downstreamProcessChanges=e.stats.down.downstreamProcessChanges+1;var g=[],m=null;return p.forEach(b=>{if(b==="RESYNC")throw new Error("SNH");Do(g,b.documents),m=lu([m,b.checkpoint])}),f(g,Q(m))}var h=di,d={docs:{}};function f(p,g){var m=e.primaryPath;return e.stats.down.persistFromMaster=e.stats.down.persistFromMaster+1,p.forEach(b=>{var _=b[m];d.docs[_]=b}),d.checkpoint=g,h=h.then(()=>{var b=d.docs;d.docs={};var _=d.checkpoint,C=Object.keys(b);if(e.events.canceled.getValue()||C.length===0)return di;var S=[],k={},$={},D=[];return Promise.all([e.input.forkInstance.findDocumentsById(C,!0),Mx(e,C)]).then(([w,x])=>{var M=new Map;return w.forEach(O=>M.set(O[m],O)),Promise.all(C.map(async O=>{var T=M.get(O),R=T?as(T,e.hasAttachments,!1):void 0,j=b[O],z=x[O];z&&T&&z.metaDocument.isResolvedConflict===T._rev&&await e.streamQueue.up;var Y=!z||!R?!1:e.input.conflictHandler.isEqual(z.docData,R,"downstream-check-if-equal-0");if(!Y&&z&&z.docData._rev&&T&&T._meta[e.input.identifier]&&Is(T._rev)===T._meta[e.input.identifier]&&(Y=!0),T&&z&&Y===!1||T&&!z)return di;var F=R?e.input.conflictHandler.isEqual(j,R,"downstream-check-if-equal-1"):!1;if(R&&F)return(!z||Y===!1)&&D.push(await Pd(e,R,z?z.metaDocument:void 0)),di;var G=Object.assign({},j,T?{_meta:Vt(T._meta),_attachments:e.hasAttachments&&j._attachments?j._attachments:{},_rev:Oi()}:{_meta:{lwt:Ri()},_rev:Oi(),_attachments:e.hasAttachments&&j._attachments?j._attachments:{}});if(j._rev){var B=T?Is(T._rev)+1:1;G._meta[e.input.identifier]=B,e.input.keepMeta&&(G._rev=j._rev)}e.input.keepMeta&&j._meta&&(G._meta=j._meta);var V={previous:T,document:G};V.document._rev=V.document._rev?V.document._rev:Br(n,V.previous),S.push(V),k[O]=V,$[O]=await Pd(e,j,z?z.metaDocument:void 0)}))}).then(async()=>{if(S.length>0)return e.input.forkInstance.bulkWrite(S,await e.downstreamBulkWriteFlag).then(w=>{var x=bi(e.primaryPath,S,w);x.forEach(O=>{var T=O[m];e.events.processed.down.next(k[T]),D.push($[T])});var M;if(w.error.forEach(O=>{if(O.status!==409){var T=U("RC_PULL",{writeError:O});e.events.error.next(T),M=T}}),M)throw M})}).then(()=>{if(D.length>0)return e.input.metaInstance.bulkWrite(Bg(e,D),"replication-down-write-meta").then(w=>{w.error.forEach(x=>{e.events.error.next(U("RC_PULL",{id:x.documentId,writeError:x}))})})}).then(()=>{Id(e,"down",_)})}).catch(b=>e.events.error.next(b)),h}}async function tR(e,t,n){var i=e.input.conflictHandler,r=i.isEqual(t.realMasterState,t.newDocumentState,"replication-resolve-conflict");if(!r){var s=await i.resolve(t,"replication-resolve-conflict"),o=Object.assign({},s,{_meta:Vt(n._meta),_rev:Oi(),_attachments:Vt(n._attachments)});return o._meta.lwt=Ri(),o._rev=Br(await e.checkpointKey,n),o}}async function Ug(e,t,n,i){if(!n._attachments||i&&!i._attachments)throw new Error("_attachments missing");var r=n[e],s=new Set(i&&i._attachments?Object.keys(i._attachments):[]);return await Promise.all(Object.entries(n._attachments).map(async([o,a])=>{if((!s.has(o)||i&&Q(i._attachments)[o].digest!==a.digest)&&!a.data){var c=await t.getAttachmentData(r,o,a.digest);a.data=c}})),n}async function eR(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.upstream){var t=await Od(e,"up");t||await Id(e,"up",e.input.initialCheckpoint.upstream)}var n=e.input.replicationHandler;e.streamQueue.up=e.streamQueue.up.then(()=>u().then(()=>h()));var i=0,r=-1,s=[],o=er,a={docs:{}},c=e.input.forkInstance.changeStream().subscribe(f=>{if(!e.events.paused.getValue())return e.stats.up.forkChangeStreamEmit=e.stats.up.forkChangeStreamEmit+1,s.push({task:f,time:i++}),e.events.active.up.getValue()||e.events.active.up.next(!0),e.input.waitBeforePersist?e.input.waitBeforePersist().then(()=>h()):h()}),l=n.masterChangeStream$.pipe(Ot(f=>f==="RESYNC")).subscribe(()=>{s.push({task:"RESYNC",time:i++}),h()});Rr(e.events.canceled.pipe(Ot(f=>!!f))).then(()=>{c.unsubscribe(),l.unsubscribe()});async function u(){if(e.stats.up.upstreamInitialSync=e.stats.up.upstreamInitialSync+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>Od(e,"up"));for(var f=await e.checkpointQueue,p=new Set,g=async function(){r=i++,p.size>3&&await Promise.race(Array.from(p));var _=await ix(e.input.forkInstance,e.input.pushBatchSize,f);if(_.documents.length===0)return 1;f=lu([f,_.checkpoint]);var C=d(_.documents,Q(f));p.add(C),C.catch().then(()=>p.delete(C))};!e.events.canceled.getValue()&&!await g(););var m=await Promise.all(p),b=m.find(_=>!!_);b?await u():!e.firstSyncDone.up.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.up.next(!0)}}function h(){if(e.events.canceled.getValue()||s.length===0){e.events.active.up.next(!1);return}e.stats.up.processTasks=e.stats.up.processTasks+1,e.events.active.up.next(!0),e.streamQueue.up=e.streamQueue.up.then(async()=>{for(var f=[],p;s.length>0;){var g=Q(s.shift());if(!(g.time<r)){if(g.task==="RESYNC"){e.events.active.up.next(!1),await u();return}g.task.context!==await e.downstreamBulkWriteFlag&&Do(f,g.task.events.map(m=>m.documentData)),p=lu([p,g.task.checkpoint])}}if(await d(f,p),s.length===0)e.events.active.up.next(!1);else return h()})}function d(f,p){return e.stats.up.persistToMaster=e.stats.up.persistToMaster+1,f.forEach(g=>{var m=g[e.primaryPath];a.docs[m]=g}),a.checkpoint=p,o=o.then(async()=>{if(e.events.canceled.getValue())return!1;var g=a.docs;a.docs={};var m=a.checkpoint,b=Object.keys(g);function _(){return Id(e,"up",m)}if(b.length===0)return _(),!1;var C=await Mx(e,b),S={},k=[],$={},D={};if(await Promise.all(b.map(async V=>{var W=g[V];D[V]=W;var q=as(W,e.hasAttachments,!!e.input.keepMeta),L=C[V];L&&L.metaDocument.isResolvedConflict!==W._rev&&e.input.conflictHandler.isEqual(L.docData,q,"upstream-check-if-equal")||L&&L.docData._rev&&Is(W._rev)===W._meta[e.input.identifier]||(k.push(V),S[V]={assumedMasterState:L?L.docData:void 0,newDocumentState:q},$[V]=await Pd(e,q,L?L.metaDocument:void 0))})),k.length===0)return _(),!1;var w=Object.values(S),x=new Set,M={},O=y$(w,e.input.pushBatchSize);await Promise.all(O.map(async V=>{e.hasAttachments&&await Promise.all(V.map(async q=>{q.newDocumentState=await Ug(e.primaryPath,e.input.forkInstance,Fn(q.newDocumentState),q.assumedMasterState)}));var W=await n.masterWrite(V);W.forEach(q=>{var L=q[e.primaryPath];x.add(L),M[L]=q})}));var T=[];if(k.forEach(V=>{x.has(V)||(e.events.processed.up.next(S[V]),T.push($[V]))}),e.events.canceled.getValue())return!1;T.length>0&&await e.input.metaInstance.bulkWrite(Bg(e,T),"replication-up-write-meta");var R=!1;if(x.size>0){e.stats.up.persistToMasterHadConflicts=e.stats.up.persistToMasterHadConflicts+1;var j=[],z={};if(await Promise.all(Object.entries(M).map(([V,W])=>{var q=S[V],L={newDocumentState:q.newDocumentState,assumedMasterState:q.assumedMasterState,realMasterState:W};return tR(e,L,D[V]).then(async ot=>{if(ot){e.events.resolvedConflicts.next({input:L,output:ot}),j.push({previous:D[V],document:ot});var kt=C[V];z[V]=await Pd(e,Q(W),kt?kt.metaDocument:void 0,ot._rev)}})})),j.length>0){R=!0,e.stats.up.persistToMasterConflictWrites=e.stats.up.persistToMasterConflictWrites+1;var Y=await e.input.forkInstance.bulkWrite(j,"replication-up-write-conflict"),F;if(Y.error.forEach(V=>{if(V.status!==409){var W=U("RC_PUSH",{writeError:V});e.events.error.next(W),F=W}}),F)throw F;var G=[],B=bi(e.primaryPath,j,Y);B.forEach(V=>{var W=V[e.primaryPath];G.push(z[W])}),G.length>0&&await e.input.metaInstance.bulkWrite(Bg(e,G),"replication-up-write-conflict-meta")}}return _(),R}).catch(g=>(e.events.error.next(g),!1)),o}}function Dx(e){e=Vt(e),e.forkInstance=Wg(e.forkInstance),e.metaInstance=Wg(e.metaInstance);var t=ZP(e),n={primaryPath:Ai(e.forkInstance.schema.primaryKey),hasAttachments:!!e.forkInstance.schema.attachments,input:e,checkpointKey:t,downstreamBulkWriteFlag:t.then(i=>"replication-downstream-"+i),events:{canceled:new ui(!1),paused:new ui(!1),active:{down:new ui(!0),up:new ui(!0)},processed:{down:new Fe,up:new Fe},resolvedConflicts:new Fe,error:new Fe},stats:{down:{addNewTask:0,downstreamProcessChanges:0,downstreamResyncOnce:0,masterChangeStreamEmit:0,persistFromMaster:0},up:{forkChangeStreamEmit:0,persistToMaster:0,persistToMasterConflictWrites:0,persistToMasterHadConflicts:0,processTasks:0,upstreamInitialSync:0}},firstSyncDone:{down:new ui(!1),up:new ui(!1)},streamQueue:{down:di,up:di},checkpointQueue:di,lastCheckpointDoc:{}};return JP(n),eR(n),n}function jh(e){return Rr(mv([e.firstSyncDone.down.pipe(Ot(t=>!!t)),e.firstSyncDone.up.pipe(Ot(t=>!!t))])).then(()=>{})}function Yg(e){return Promise.all([e.streamQueue.up,e.streamQueue.down,e.checkpointQueue])}function nR(e,t,n,i=!1){e=Wg(e);var r=!!e.schema.attachments,s=Ai(e.schema.primaryKey),o={masterChangeStream$:e.changeStream().pipe(nr(async a=>{var c={checkpoint:a.checkpoint,documents:await Promise.all(a.events.map(async l=>{var u=as(l.documentData,r,i);return r&&(u=await Ug(s,e,Fn(u),void 0)),u}))};return c})),masterChangesSince(a,c){return ix(e,c,a).then(async l=>({checkpoint:l.documents.length>0?l.checkpoint:a,documents:await Promise.all(l.documents.map(async u=>{var h=as(u,r,i);return r&&(h=await Ug(s,e,Fn(h),void 0)),h}))}))},async masterWrite(a){var c={};a.forEach(g=>{var m=g.newDocumentState[s];c[m]=g});var l=Object.keys(c),u=await e.findDocumentsById(l,!0),h=new Map;u.forEach(g=>h.set(g[s],g));var d=[],f=[];if(await Promise.all(Object.entries(c).map(([g,m])=>{var b=h.get(g);b?b&&!m.assumedMasterState?d.push(as(b,r,i)):t.isEqual(as(b,r,i),Q(m.assumedMasterState),"rxStorageInstanceToReplicationHandler-masterWrite")===!0?f.push({previous:b,document:Uy(n,r,i,m.newDocumentState,b)}):d.push(as(b,r,i)):f.push({document:Uy(n,r,i,m.newDocumentState)})})),f.length>0){var p=await e.bulkWrite(f,"replication-master-write");p.error.forEach(g=>{if(g.status!==409)throw U("SNH",{name:"non conflict error",error:g});d.push(as(Q(g.documentInDb),r,i))})}return d}};return o}async function $x(e){e.events.canceled.next(!0),e.events.active.up.complete(),e.events.active.down.complete(),e.events.processed.up.complete(),e.events.processed.down.complete(),e.events.resolvedConflicts.complete(),e.events.canceled.complete(),await e.checkpointQueue}function iR(e){return e&&typeof e.then=="function"}Promise.resolve(!1);var rR=Promise.resolve(!0),Ar=Promise.resolve();function mo(e,t){return e||(e=0),new Promise(function(n){return setTimeout(function(){return n(t)},e)})}function sR(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function zu(){return Math.random().toString(36).substring(2)}var Ap=0;function ju(){var e=Date.now()*1e3;return e<=Ap&&(e=Ap+1),Ap=e,e}function oR(){return typeof navigator<"u"&&typeof navigator.locks<"u"&&typeof navigator.locks.request=="function"}var aR=ju,cR="native";function lR(e){var t={time:ju(),messagesCallback:null,bc:new BroadcastChannel(e),subFns:[]};return t.bc.onmessage=function(n){t.messagesCallback&&t.messagesCallback(n.data)},t}function uR(e){e.bc.close(),e.subFns=[]}function hR(e,t){try{return e.bc.postMessage(t,!1),Ar}catch(n){return Promise.reject(n)}}function dR(e,t){e.messagesCallback=t}function fR(){if(typeof globalThis<"u"&&globalThis.Deno&&globalThis.Deno.args)return!0;if((typeof window<"u"||typeof self<"u")&&typeof BroadcastChannel=="function"){if(BroadcastChannel._pubkey)throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");return!0}else return!1}function pR(){return 150}var gR={create:lR,close:uR,onMessage:dR,postMessage:hR,canBeUsed:fR,type:cR,averageResponseTime:pR,microSeconds:aR};class Tx{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){const n=this.map.get(t);return typeof n>"u"?!1:n<Vg()-this.ttl?(this.map.delete(t),!1):!0}add(t){this.map.delete(t),this.map.set(t,Vg()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,mR(this)},0))}clear(){this.map.clear()}}function mR(e){const t=Vg()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)break;const r=i[0];if(i[1]<t)e.map.delete(r);else break}}function Vg(){return Date.now()}function Ov(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=JSON.parse(JSON.stringify(e));return typeof t.webWorkerSupport>"u"&&(t.webWorkerSupport=!0),t.idb||(t.idb={}),t.idb.ttl||(t.idb.ttl=1e3*45),t.idb.fallbackInterval||(t.idb.fallbackInterval=150),e.idb&&typeof e.idb.onclose=="function"&&(t.idb.onclose=e.idb.onclose),t.localstorage||(t.localstorage={}),t.localstorage.removeTimeout||(t.localstorage.removeTimeout=1e3*60),e.methods&&(t.methods=e.methods),t.node||(t.node={}),t.node.ttl||(t.node.ttl=1e3*60*2),t.node.maxParallelWrites||(t.node.maxParallelWrites=2048),typeof t.node.useFastPath>"u"&&(t.node.useFastPath=!0),t}var vR=ju,yR="pubkey.broadcast-channel-0-",Hr="messages",Of={durability:"relaxed"},bR="idb";function Ox(){if(typeof indexedDB<"u")return indexedDB;if(typeof window<"u"){if(typeof window.mozIndexedDB<"u")return window.mozIndexedDB;if(typeof window.webkitIndexedDB<"u")return window.webkitIndexedDB;if(typeof window.msIndexedDB<"u")return window.msIndexedDB}return!1}function Iv(e){e.commit&&e.commit()}function _R(e){var t=Ox(),n=yR+e,i=t.open(n);return i.onupgradeneeded=function(r){var s=r.target.result;s.createObjectStore(Hr,{keyPath:"id",autoIncrement:!0})},new Promise(function(r,s){i.onerror=function(o){return s(o)},i.onsuccess=function(){r(i.result)}})}function wR(e,t,n){var i=Date.now(),r={uuid:t,time:i,data:n},s=e.transaction([Hr],"readwrite",Of);return new Promise(function(o,a){s.oncomplete=function(){return o()},s.onerror=function(l){return a(l)};var c=s.objectStore(Hr);c.add(r),Iv(s)})}function xR(e,t){var n=e.transaction(Hr,"readonly",Of),i=n.objectStore(Hr),r=[],s=IDBKeyRange.bound(t+1,1/0);if(i.getAll){var o=i.getAll(s);return new Promise(function(c,l){o.onerror=function(u){return l(u)},o.onsuccess=function(u){c(u.target.result)}})}function a(){try{return s=IDBKeyRange.bound(t+1,1/0),i.openCursor(s)}catch{return i.openCursor()}}return new Promise(function(c,l){var u=a();u.onerror=function(h){return l(h)},u.onsuccess=function(h){var d=h.target.result;d?d.value.id<t+1?d.continue(t+1):(r.push(d.value),d.continue()):(Iv(n),c(r))}})}function CR(e,t){if(e.closed)return Promise.resolve([]);var n=e.db.transaction(Hr,"readwrite",Of),i=n.objectStore(Hr);return Promise.all(t.map(function(r){var s=i.delete(r);return new Promise(function(o){s.onsuccess=function(){return o()}})}))}function kR(e,t){var n=Date.now()-t,i=e.transaction(Hr,"readonly",Of),r=i.objectStore(Hr),s=[];return new Promise(function(o){r.openCursor().onsuccess=function(a){var c=a.target.result;if(c){var l=c.value;l.time<n?(s.push(l),c.continue()):(Iv(i),o(s))}else o(s)}})}function SR(e){return kR(e.db,e.options.idb.ttl).then(function(t){return CR(e,t.map(function(n){return n.id}))})}function ER(e,t){return t=Ov(t),_R(e).then(function(n){var i={closed:!1,lastCursorId:0,channelName:e,options:t,uuid:zu(),eMIs:new Tx(t.idb.ttl*2),writeBlockPromise:Ar,messagesCallback:null,readQueuePromises:[],db:n};return n.onclose=function(){i.closed=!0,t.idb.onclose&&t.idb.onclose()},Ix(i),i})}function Ix(e){e.closed||Px(e).then(function(){return mo(e.options.idb.fallbackInterval)}).then(function(){return Ix(e)})}function MR(e,t){return!(e.uuid===t.uuid||t.eMIs.has(e.id)||e.data.time<t.messagesCallbackTime)}function Px(e){return e.closed||!e.messagesCallback?Ar:xR(e.db,e.lastCursorId).then(function(t){var n=t.filter(function(i){return!!i}).map(function(i){return i.id>e.lastCursorId&&(e.lastCursorId=i.id),i}).filter(function(i){return MR(i,e)}).sort(function(i,r){return i.time-r.time});return n.forEach(function(i){e.messagesCallback&&(e.eMIs.add(i.id),e.messagesCallback(i.data))}),Ar})}function DR(e){e.closed=!0,e.db.close()}function $R(e,t){return e.writeBlockPromise=e.writeBlockPromise.then(function(){return wR(e.db,e.uuid,t)}).then(function(){sR(0,10)===0&&SR(e)}),e.writeBlockPromise}function TR(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t,Px(e)}function OR(){return!!Ox()}function IR(e){return e.idb.fallbackInterval*2}var PR={create:ER,close:DR,onMessage:TR,postMessage:$R,canBeUsed:OR,type:bR,averageResponseTime:IR,microSeconds:vR},RR=ju,AR="pubkey.broadcastChannel-",LR="localstorage";function Rx(){var e;if(typeof window>"u")return null;try{e=window.localStorage,e=window["ie8-eventlistener/storage"]||window.localStorage}catch{}return e}function Ax(e){return AR+e}function NR(e,t){return new Promise(function(n){mo().then(function(){var i=Ax(e.channelName),r={token:zu(),time:Date.now(),data:t,uuid:e.uuid},s=JSON.stringify(r);Rx().setItem(i,s);var o=document.createEvent("Event");o.initEvent("storage",!0,!0),o.key=i,o.newValue=s,window.dispatchEvent(o),n()})})}function FR(e,t){var n=Ax(e),i=function(s){s.key===n&&t(JSON.parse(s.newValue))};return window.addEventListener("storage",i),i}function zR(e){window.removeEventListener("storage",e)}function jR(e,t){if(t=Ov(t),!Lx())throw new Error("BroadcastChannel: localstorage cannot be used");var n=zu(),i=new Tx(t.localstorage.removeTimeout),r={channelName:e,uuid:n,eMIs:i};return r.listener=FR(e,function(s){r.messagesCallback&&s.uuid!==n&&(!s.token||i.has(s.token)||s.data.time&&s.data.time<r.messagesCallbackTime||(i.add(s.token),r.messagesCallback(s.data)))}),r}function BR(e){zR(e.listener)}function WR(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t}function Lx(){var e=Rx();if(!e)return!1;try{var t="__broadcastchannel_check";e.setItem(t,"works"),e.removeItem(t)}catch{return!1}return!0}function HR(){var e=120,t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")?e*2:e}var UR={create:jR,close:BR,onMessage:WR,postMessage:NR,canBeUsed:Lx,type:LR,averageResponseTime:HR,microSeconds:RR},Nx=ju,YR="simulate",Pv=new Set;function VR(e){var t={time:Nx(),name:e,messagesCallback:null};return Pv.add(t),t}function qR(e){Pv.delete(e)}var Fx=5;function KR(e,t){return new Promise(function(n){return setTimeout(function(){var i=Array.from(Pv);i.forEach(function(r){r.name===e.name&&r!==e&&r.messagesCallback&&r.time<t.time&&r.messagesCallback(t)}),n()},Fx)})}function GR(e,t){e.messagesCallback=t}function XR(){return!0}function QR(){return Fx}var ZR={create:VR,close:qR,onMessage:GR,postMessage:KR,canBeUsed:XR,type:YR,averageResponseTime:QR,microSeconds:Nx},Yy=[gR,PR,UR];function JR(e){var t=[].concat(e.methods,Yy).filter(Boolean);if(e.type){if(e.type==="simulate")return ZR;var n=t.find(function(r){return r.type===e.type});if(n)return n;throw new Error("method-type "+e.type+" not found")}e.webWorkerSupport||(t=t.filter(function(r){return r.type!=="idb"}));var i=t.find(function(r){return r.canBeUsed()});if(i)return i;throw new Error("No usable method found in "+JSON.stringify(Yy.map(function(r){return r.type})))}var zx=new Set,tA=0,If=function(t,n){this.id=tA++,zx.add(this),this.name=t,this.options=Ov(n),this.method=JR(this.options),this._iL=!1,this._onML=null,this._addEL={message:[],internal:[]},this._uMP=new Set,this._befC=[],this._prepP=null,eA(this)};If._pubkey=!0;If.prototype={postMessage:function(t){if(this.closed)throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed "+JSON.stringify(t));return Vy(this,"message",t)},postInternal:function(t){return Vy(this,"internal",t)},set onmessage(e){var t=this.method.microSeconds(),n={time:t,fn:e};Ky(this,"message",this._onML),e&&typeof e=="function"?(this._onML=n,qy(this,"message",n)):this._onML=null},addEventListener:function(t,n){var i=this.method.microSeconds(),r={time:i,fn:n};qy(this,t,r)},removeEventListener:function(t,n){var i=this._addEL[t].find(function(r){return r.fn===n});Ky(this,t,i)},close:function(){var t=this;if(!this.closed){zx.delete(this),this.closed=!0;var n=this._prepP?this._prepP:Ar;return this._onML=null,this._addEL.message=[],n.then(function(){return Promise.all(Array.from(t._uMP))}).then(function(){return Promise.all(t._befC.map(function(i){return i()}))}).then(function(){return t.method.close(t._state)})}},get type(){return this.method.type},get isClosed(){return this.closed}};function Vy(e,t,n){var i=e.method.microSeconds(),r={time:i,type:t,data:n},s=e._prepP?e._prepP:Ar;return s.then(function(){var o=e.method.postMessage(e._state,r);return e._uMP.add(o),o.catch().then(function(){return e._uMP.delete(o)}),o})}function eA(e){var t=e.method.create(e.name,e.options);iR(t)?(e._prepP=t,t.then(function(n){e._state=n})):e._state=t}function jx(e){return e._addEL.message.length>0||e._addEL.internal.length>0}function qy(e,t,n){e._addEL[t].push(n),nA(e)}function Ky(e,t,n){e._addEL[t]=e._addEL[t].filter(function(i){return i!==n}),iA(e)}function nA(e){if(!e._iL&&jx(e)){var t=function(r){e._addEL[r.type].forEach(function(s){r.time>=s.time&&s.fn(r.data)})},n=e.method.microSeconds();e._prepP?e._prepP.then(function(){e._iL=!0,e.method.onMessage(e._state,t,n)}):(e._iL=!0,e.method.onMessage(e._state,t,n))}}function iA(e){if(e._iL&&!jx(e)){e._iL=!1;var t=e.method.microSeconds();e.method.onMessage(e._state,null,t)}}function rA(e){if(typeof WorkerGlobalScope=="function"&&self instanceof WorkerGlobalScope){var t=self.close.bind(self);self.close=function(){return e(),t()}}else{if(typeof window.addEventListener!="function")return;window.addEventListener("beforeunload",function(){e()},!0),window.addEventListener("unload",function(){e()},!0)}}function sA(e){process.on("exit",function(){return e()}),process.on("beforeExit",function(){return e().then(function(){return process.exit()})}),process.on("SIGINT",function(){return e().then(function(){return process.exit()})}),process.on("uncaughtException",function(t){return e().then(function(){console.trace(t),process.exit(101)})})}var oA=Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]",aA=oA?sA:rA,Ol=new Set,Gy=!1;function cA(){Gy||(Gy=!0,aA(uA))}function lA(e){if(cA(),typeof e!="function")throw new Error("Listener is no function");Ol.add(e);var t={remove:function(){return Ol.delete(e)},run:function(){return Ol.delete(e),e()}};return t}function uA(){var e=[];return Ol.forEach(function(t){e.push(t()),Ol.delete(t)}),Promise.all(e)}function xo(e,t){var n={context:"leader",action:t,token:e.token};return e.broadcastChannel.postInternal(n)}function Bx(e){e.isLeader=!0,e._hasLeader=!0;var t=lA(function(){return e.die()});e._unl.push(t);var n=function(r){r.context==="leader"&&r.action==="apply"&&xo(e,"tell"),r.context==="leader"&&r.action==="tell"&&!e._dpLC&&(e._dpLC=!0,e._dpL(),xo(e,"tell"))};return e.broadcastChannel.addEventListener("internal",n),e._lstns.push(n),xo(e,"tell")}var Wx=function(t,n){var i=this;this.broadcastChannel=t,t._befC.push(function(){return i.die()}),this._options=n,this.isLeader=!1,this.isDead=!1,this.token=zu(),this._lstns=[],this._unl=[],this._dpL=function(){},this._dpLC=!1,this._wKMC={},this.lN="pubkey-bc||"+t.method.type+"||"+t.name};Wx.prototype={hasLeader:function(){var t=this;return navigator.locks.query().then(function(n){var i=n.held?n.held.filter(function(r){return r.name===t.lN}):[];return!!(i&&i.length>0)})},awaitLeadership:function(){var t=this;if(!this._wLMP){this._wKMC.c=new AbortController;var n=new Promise(function(i,r){t._wKMC.res=i,t._wKMC.rej=r});this._wLMP=new Promise(function(i,r){navigator.locks.request(t.lN,{signal:t._wKMC.c.signal},function(){return t._wKMC.c=void 0,Bx(t),i(),n}).catch(function(s){t._wKMC.rej&&t._wKMC.rej(s),r(s)})})}return this._wLMP},set onduplicate(e){},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this.isLeader=!1),this.isDead=!0,this._wKMC.res&&this._wKMC.res(),this._wKMC.c&&this._wKMC.c.abort("LeaderElectionWebLock.die() called"),xo(this,"death")}};var Hx=function(t,n){var i=this;this.broadcastChannel=t,this._options=n,this.isLeader=!1,this._hasLeader=!1,this.isDead=!1,this.token=zu(),this._aplQ=Ar,this._aplQC=0,this._unl=[],this._lstns=[],this._dpL=function(){},this._dpLC=!1;var r=function(o){o.context==="leader"&&(o.action==="death"&&(i._hasLeader=!1),o.action==="tell"&&(i._hasLeader=!0))};this.broadcastChannel.addEventListener("internal",r),this._lstns.push(r)};Hx.prototype={hasLeader:function(){return Promise.resolve(this._hasLeader)},applyOnce:function(t){var n=this;if(this.isLeader)return mo(0,!0);if(this.isDead)return mo(0,!1);if(this._aplQC>1)return this._aplQ;var i=function(){if(n.isLeader)return rR;var s=!1,o,a=new Promise(function(u){o=function(){s=!0,u()}}),c=function(h){h.context==="leader"&&h.token!=n.token&&(h.action==="apply"&&h.token>n.token&&o(),h.action==="tell"&&(o(),n._hasLeader=!0))};n.broadcastChannel.addEventListener("internal",c);var l=t?n._options.responseTime*4:n._options.responseTime;return xo(n,"apply").then(function(){return Promise.race([mo(l),a.then(function(){return Promise.reject(new Error)})])}).then(function(){return xo(n,"apply")}).then(function(){return Promise.race([mo(l),a.then(function(){return Promise.reject(new Error)})])}).catch(function(){}).then(function(){return n.broadcastChannel.removeEventListener("internal",c),s?!1:Bx(n).then(function(){return!0})})};return this._aplQC=this._aplQC+1,this._aplQ=this._aplQ.then(function(){return i()}).then(function(){n._aplQC=n._aplQC-1}),this._aplQ.then(function(){return n.isLeader})},awaitLeadership:function(){return this._aLP||(this._aLP=hA(this)),this._aLP},set onduplicate(e){this._dpL=e},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this._hasLeader=!1,this.isLeader=!1),this.isDead=!0,xo(this,"death")}};function hA(e){return e.isLeader?Ar:new Promise(function(t){var n=!1;function i(){n||(n=!0,e.broadcastChannel.removeEventListener("internal",s),t(!0))}e.applyOnce().then(function(){e.isLeader&&i()});var r=function(){return mo(e._options.fallbackInterval).then(function(){if(!(e.isDead||n))if(e.isLeader)i();else return e.applyOnce(!0).then(function(){e.isLeader?i():r()})})};r();var s=function(a){a.context==="leader"&&a.action==="death"&&(e._hasLeader=!1,e.applyOnce().then(function(){e.isLeader&&i()}))};e.broadcastChannel.addEventListener("internal",s),e._lstns.push(s)})}function dA(e,t){return e||(e={}),e=JSON.parse(JSON.stringify(e)),e.fallbackInterval||(e.fallbackInterval=3e3),e.responseTime||(e.responseTime=t.method.averageResponseTime(t.options)),e}function Ux(e,t){if(e._leaderElector)throw new Error("BroadcastChannel already has a leader-elector");t=dA(t,e);var n=oR()?new Wx(e,t):new Hx(e,t);return e._befC.push(function(){return n.die()}),e._leaderElector=n,n}var Rd=new Map;function Yx(e,t,n,i){var r=Rd.get(t);return r||(r={bc:new If(["RxDB:",e,n].join("|")),refs:new Set},Rd.set(t,r)),r.refs.add(i),r.bc}function qg(e,t){var n=Rd.get(e);if(n&&(n.refs.delete(t),n.refs.size===0))return Rd.delete(e),n.bc.close()}function n9(e,t,n,i){if(t.multiInstance){var r=Yx(e,t.databaseInstanceToken,n.databaseName,n),s=new Fe,o=d=>{d.storageName===e&&d.databaseName===t.databaseName&&d.collectionName===t.collectionName&&d.version===t.schema.version&&s.next(d.eventBulk)};r.addEventListener("message",o);var a=n.changeStream(),c=!1,l=a.subscribe(d=>{c||r.postMessage({storageName:e,databaseName:t.databaseName,collectionName:t.collectionName,version:t.schema.version,eventBulk:d})});n.changeStream=function(){return s.asObservable().pipe(UT(a))};var u=n.close.bind(n);n.close=async function(){return c=!0,l.unsubscribe(),r.removeEventListener("message",o),await qg(t.databaseInstanceToken,n),u()};var h=n.remove.bind(n);n.remove=async function(){return c=!0,l.unsubscribe(),r.removeEventListener("message",o),await qg(t.databaseInstanceToken,n),h()}}}async function Vx(e){var t=X$(e.collection.schema.jsonSchema).map(s=>e.collection.name+"-"+s),n=await e.database.internalStore.findDocumentsById(t.map(s=>Ro(s,Ds)),!1),i={};n.forEach(s=>i[s.key]=s);var r=t.find(s=>i[s]);return r?i[r]:void 0}function fA(e,t,n){var i=Vt(n._attachments),r=Fn(n),s=r._meta;delete r._meta,r._attachments=i;for(var o=t+1,a=Promise.resolve(r),c=function(){var l=o;a=a.then(u=>pA(e,l,u)),o++};o<=e.schema.version;)c();return a.then(l=>l===null?hv:(s&&(l._meta=s),l))}function pA(e,t,n){if(n===null)return hv;var i=e.migrationStrategies[t](n,e),r=f1(i);return r}async function qx(e){if(e.collection.schema.version===0)return er;var t=await Vx(e);return!!t}var gA=200,Kx=new WeakMap;function mA(e){var t=Gx(e.database),n=t.getValue().slice(0);n.push(e),t.next(n)}function Gx(e){return yi(Kx,e,()=>new ui([]))}function vA(e){var t=Kx.get(e);t&&t.complete()}var yA=(function(){function e(n,i,r=[n.name,"v",n.schema.version].join("-")){this.started=!1,this.canceled=!1,this.updateStatusHandlers=[],this.updateStatusQueue=uv,this.collection=n,this.migrationStrategies=i,this.statusDocKey=r,this.database=n.database,this.oldCollectionMeta=Vx(this),this.mustMigrate=qx(this),this.statusDocId=Ro(this.statusDocKey,Fh),mA(this),this.$=cI(this.database.internalStore,this.statusDocId).pipe(Ot(s=>!!s),Ht(s=>Q(s).data),Au(Pu))}var t=e.prototype;return t.getStatus=function(){return Rr(this.$)},t.startMigration=async function(i=gA){var r=await this.mustMigrate;if(r){if(this.started)throw U("DM1");if(this.started=!0,this.database.multiInstance){this.broadcastChannel=new If(["rx-migration-state",this.database.name,this.collection.name,this.collection.schema.version].join("|"));var s=Ux(this.broadcastChannel);await s.awaitLeadership()}var o=await this.oldCollectionMeta,a=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:this.collection.name,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:Q(o).data.schema,password:this.database.password,devMode:At.isDevMode()}),c=await this.getConnectedStorageInstances(),l=await this.countAllDocuments([a].concat(c.map(h=>h.oldStorage)));await this.updateStatus(h=>(h.count.total=l,h));try{await Promise.all(c.map(async h=>{await vx(this.collection,h.newStorage.collectionName,h.newStorage.schema),await this.migrateStorage(h.oldStorage,h.newStorage,i),await h.newStorage.close()})),await this.migrateStorage(a,this.collection.storageInstance.originalStorageInstance,i)}catch(h){await a.close(),await this.updateStatus(d=>(d.status="ERROR",d.error=Cd(h),d));return}try{await Xa(this.database.internalStore,{previous:o,document:Object.assign({},o,{_deleted:!0})},"rx-migration-remove-collection-meta")}catch(h){var u=Ua(h);if(!(u&&u.documentInDb._deleted))throw h}await this.updateStatus(h=>(h.status="DONE",h)),this.broadcastChannel&&await this.broadcastChannel.close()}},t.updateStatus=function(i){return this.updateStatusHandlers.push(i),this.updateStatusQueue=this.updateStatusQueue.then(async()=>{if(this.updateStatusHandlers.length!==0){var r=this.updateStatusHandlers;for(this.updateStatusHandlers=[];;){var s=await bc(this.database.internalStore,this.statusDocId),o=Fn(s);s||(o={id:this.statusDocId,key:this.statusDocKey,context:Fh,data:{collectionName:this.collection.name,status:"RUNNING",count:{total:0,handled:0,percent:0}},_deleted:!1,_meta:mc(),_rev:Oi(),_attachments:{}});var a=Q(o).data;for(var c of r)a=c(a);if(a.count.percent=Math.round(a.count.handled/a.count.total*100),o&&s&&Jl(o.data,s.data))break;try{await Xa(this.database.internalStore,{previous:s,document:Q(o)},Fh);break}catch(l){if(!Ua(l))throw l}}}}),this.updateStatusQueue},t.migrateStorage=async function(i,r,s){this.collection.onClose.push(()=>this.cancel()),this.database.onClose.push(()=>this.cancel());var o=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:"rx-migration-state-meta-"+i.collectionName+"-"+i.schema.version,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:Hg(i.schema,Dd(i.schema)),password:this.database.password,devMode:At.isDevMode()}),a=nR(r,Td,this.database.token,!0),c=Dx({keepMeta:!0,identifier:["rx-migration-state",i.collectionName,i.schema.version,this.collection.schema.version].join("-"),replicationHandler:{masterChangesSince(){return Promise.resolve({checkpoint:null,documents:[]})},masterWrite:async u=>{var h=await Promise.all(u.map(async f=>{var p=f.newDocumentState;if(r.schema.title===zh&&(p=f.newDocumentState.docData,f.newDocumentState.isCheckpoint==="1"))return{assumedMasterState:void 0,newDocumentState:f.newDocumentState};var g=await fA(this.collection,i.schema.version,p);if(g===null)return null;var m={assumedMasterState:void 0,newDocumentState:r.schema.title===zh?Object.assign({},f.newDocumentState,{docData:g}):g};return m}));h=h.filter(f=>!!f&&!!f.newDocumentState);var d=await a.masterWrite(h);return d},masterChangeStream$:new Fe().asObservable()},forkInstance:i,metaInstance:o,pushBatchSize:s,pullBatchSize:0,conflictHandler:Td,hashFunction:this.database.hashFunction}),l=!1;if(c.events.error.subscribe(u=>l=u),c.events.processed.up.subscribe(()=>{this.updateStatus(u=>(u.count.handled=u.count.handled+1,u))}),await jh(c),await Yg(c),await this.updateStatusQueue,l)throw await o.close(),l;await Promise.all([i.remove(),o.remove()]),await this.cancel()},t.cancel=async function(){this.canceled=!0,this.replicationState&&await $x(this.replicationState),this.broadcastChannel&&await this.broadcastChannel.close()},t.countAllDocuments=async function(i){var r=0;return await Promise.all(i.map(async s=>{var o=Df(s.schema,Aa(s.schema,{selector:{}})),a=await s.count(o);r+=a.count})),r},t.getConnectedStorageInstances=async function(){var i=Q(await this.oldCollectionMeta),r=[];return await Promise.all(await Promise.all(i.data.connectedStorages.map(async s=>{if(s.schema.title!==zh)throw new Error("unknown migration handling for schema");var o=Hg(Fn(this.collection.schema.jsonSchema),Dd(s.schema));o.version=this.collection.schema.version;var[a,c]=await Promise.all([this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:At.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:s.schema,password:this.database.password,collectionName:s.collectionName}),this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:At.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:o,password:this.database.password,collectionName:s.collectionName})]);r.push({oldStorage:a,newStorage:c})}))),r},t.migratePromise=async function(i){this.startMigration(i);var r=await this.mustMigrate;if(!r)return{status:"DONE",collectionName:this.collection.name,count:{handled:0,percent:0,total:0}};var s=await Promise.race([Rr(this.$.pipe(Ot(o=>o.status==="DONE"))),Rr(this.$.pipe(Ot(o=>o.status==="ERROR")))]);if(s.status==="ERROR")throw U("DM4",{collection:this.collection.name,error:s.error});return s},e})(),Ad=new WeakMap,Kg=new WeakMap;function Il(e){var t=Ad.get(e);if(!t){var n=e.database?e.database:e,i=e.database?e.name:"";throw U("LD8",{database:n.name,collection:i})}return t}function Xx(e,t,n,i,r,s){return t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:bA(i),schema:Qx,options:r,multiInstance:s,devMode:At.isDevMode()})}function Xy(e){var t=Ad.get(e);if(t)return Ad.delete(e),t.then(n=>n.storageInstance.close())}async function Qy(e,t,n){var i=Go(10),r=await Xx(i,e,t,n,{},!1);await r.remove()}function bA(e){return"plugin-local-documents-"+e}var Qx=Cf({title:"RxLocalDocument",version:0,primaryKey:"id",type:"object",properties:{id:{type:"string",maxLength:128},data:{type:"object",additionalProperties:!0}},required:["id","data"]});async function Zy(e,t){var n=await Il(this),i={id:e,data:t,_deleted:!1,_meta:mc(),_rev:Oi(),_attachments:{}};return Xa(n.storageInstance,{document:i},"local-document-insert").then(r=>n.docCache.getCachedRxDocument(r))}function Jy(e,t){return this.getLocal(e).then(n=>{if(n)return n.incrementalModify(()=>t);var i=this.insertLocal(e,t);return i})}async function tb(e){var t=await Il(this),n=t.docCache,i=n.getLatestDocumentDataIfExists(e);return i?Promise.resolve(n.getCachedRxDocument(i)):bc(t.storageInstance,e).then(r=>r?t.docCache.getCachedRxDocument(r):null)}function eb(e){return this.$.pipe(Lu(null),nr(async t=>{if(t)return{changeEvent:t};var n=await this.getLocal(e);return{doc:n}}),nr(async t=>{if(t.changeEvent){var n=t.changeEvent;if(!n.isLocal||n.documentId!==e)return{use:!1};var i=await this.getLocal(e);return{use:!0,doc:i}}else return{use:!0,doc:t.doc}}),Ot(t=>t.use),Ht(t=>t.doc))}var _A=ox(),wA=(function(e){function t(n,i,r){var s;return s=e.call(this,null,i)||this,s.id=n,s.parent=r,s}return cv(t,e),t})(_A),Pl={get isLocal(){return!0},get allAttachments$(){throw U("LD1",{document:this})},get primaryPath(){return"id"},get primary(){return this.id},get $(){var e=this,t=Va(Kg,this.parent),n=this.primary;return e.parent.eventBulks$.pipe(Ot(i=>!!i.isLocal),Ht(i=>i.events.find(r=>r.documentId===n)),Ot(i=>!!i),Ht(i=>z1(Q(i))),Lu(t.docCache.getLatestDocumentData(this.primary)),nu((i,r)=>i._rev===r._rev),Ht(i=>t.docCache.getCachedRxDocument(i)),Au(Pu))},get $$(){var e=this,t=Lp(e),n=t.getReactivityFactory();return n.fromObservable(e.$,e.getLatest()._data,t)},get deleted$$(){var e=this,t=Lp(e),n=t.getReactivityFactory();return n.fromObservable(e.deleted$,e.getLatest().deleted,t)},getLatest(){var e=Va(Kg,this.parent),t=e.docCache.getLatestDocumentData(this.primary);return e.docCache.getCachedRxDocument(t)},get(e){if(e="data."+e,!!this._data){if(typeof e!="string")throw xd("LD2",{objPath:e});var t=Ya(this._data,e);return t=At.deepFreezeWhenDevMode(t),t}},get$(e){if(e="data."+e,At.isDevMode()){if(e.includes(".item."))throw U("LD3",{objPath:e});if(e===this.primaryPath)throw U("LD4")}return this.$.pipe(Ht(t=>t._data),Ht(t=>Ya(t,e)),nu())},get$$(e){var t=Lp(this),n=t.getReactivityFactory();return n.fromObservable(this.get$(e),this.getLatest().get(e),t)},async incrementalModify(e){var t=await Il(this.parent);return t.incrementalWriteQueue.addWrite(this._data,async n=>(n.data=await e(n.data,this),n)).then(n=>t.docCache.getCachedRxDocument(n))},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e){var t=await Il(this.parent),n=this._data;e.id=this.id;var i=[{previous:n,document:e}];return t.storageInstance.bulkWrite(i,"local-document-save-data").then(r=>{if(r.error[0])throw r.error[0];var s=bi(this.collection.schema.primaryPath,i,r)[0];e=Vt(e),e._rev=s._rev})},async remove(){var e=await Il(this.parent),t=Vt(this._data);return t._deleted=!0,Xa(e.storageInstance,{previous:this._data,document:t},"local-document-remove").then(n=>e.docCache.getCachedRxDocument(n))}},nb=!1,xA=()=>{if(!nb){nb=!0;var e=Tf,t=Object.getOwnPropertyNames(e);t.forEach(i=>{var r=Object.getOwnPropertyDescriptor(Pl,i);if(!r){var s=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(Pl,i,s)}});var n=i=>()=>{throw U("LD6",{functionName:i})};["populate","update","putAttachment","putAttachmentBase64","getAttachment","allAttachments"].forEach(i=>Pl[i]=n(i))}};function CA(e,t){xA();var n=new wA(e.id,e,t);return Object.setPrototypeOf(n,Pl),n.prototype=Pl,n}function Lp(e){var t=e.parent;return GP(t)?t:t.database}function ib(e){var t=e.database?e.database:e,n=e.database?e.name:"",i=(async()=>{var r=await Xx(t.token,t.storage,t.name,n,t.instanceCreationOptions,t.multiInstance);r=wv(t,r,Qx);var s=new fx("id",t.eventBulks$.pipe(Ot(u=>{var h=!1;return(n===""&&!u.collectionName||n!==""&&u.collectionName===n)&&(h=!0),h&&u.isLocal}),Ht(u=>u.events)),u=>CA(u,e)),o=new sx(r,"id",()=>{},()=>{}),a=await t.storageToken,c=r.changeStream().subscribe(u=>{for(var h=new Array(u.events.length),d=u.events,f=e.database?e.name:void 0,p=0;p<d.length;p++){var g=d[p];h[p]={documentId:g.documentId,collectionName:f,isLocal:!0,operation:g.operation,documentData:At.deepFreezeWhenDevMode(g.documentData),previousDocumentData:At.deepFreezeWhenDevMode(g.previousDocumentData)}}var m={id:u.id,isLocal:!0,internal:!1,collectionName:e.database?e.name:void 0,storageToken:a,events:h,databaseToken:t.token,checkpoint:u.checkpoint,context:u.context};t.$emit(m)});e._subs.push(c);var l={database:t,parent:e,storageInstance:r,docCache:s,incrementalWriteQueue:o};return Kg.set(e,l),l})();Ad.set(e,i)}var kA={name:"local-documents",rxdb:!0,prototypes:{RxCollection:e=>{e.insertLocal=Zy,e.upsertLocal=Jy,e.getLocal=tb,e.getLocal$=eb},RxDatabase:e=>{e.insertLocal=Zy,e.upsertLocal=Jy,e.getLocal=tb,e.getLocal$=eb}},hooks:{createRxDatabase:{before:e=>{e.creator.localDocuments&&ib(e.database)}},createRxCollection:{before:e=>{e.creator.localDocuments&&ib(e.collection)}},preCloseRxDatabase:{after:e=>Xy(e)},postCloseRxCollection:{after:e=>Xy(e)},postRemoveRxDatabase:{after:e=>Qy(e.storage,e.databaseName,"")},postRemoveRxCollection:{after:e=>Qy(e.storage,e.databaseName,e.collectionName)}},overwritable:{}},SA=new WeakMap,EA={name:"migration-schema",rxdb:!0,init(){Tv(kA)},hooks:{preCloseRxDatabase:{after:vA}},prototypes:{RxDatabase:e=>{e.migrationStates=function(){return Gx(this).pipe(Au(Pu))}},RxCollection:e=>{e.getMigrationState=function(){return yi(SA,this,()=>new yA(this.asRxCollection,this.migrationStrategies))},e.migrationNeeded=function(){return this.schema.version===0?er:qx(this.getMigrationState())}}}},MA=EA;Tv(MA);class Zx extends Error{constructor(t,n){super(t),this.name="SchemaVersionError",this.cause=n}}const Zr={type:"string",maxLength:100},DA={version:1,primaryKey:"id",type:"object",properties:{id:Zr,date:{type:"string",maxLength:10},amount:{type:"number"},description:{type:"string"},memo:{type:"string"},merchantId:{type:"string",maxLength:100},accountId:{type:"string",maxLength:100},tagIds:{type:"array",items:{type:"string"}}},required:["id","date","amount","description","tagIds"],indexes:["date"]},$A={version:0,primaryKey:"id",type:"object",properties:{id:Zr,name:{type:"string",maxLength:200},icon:{type:"string"},color:{type:"string"}},required:["id","name"],indexes:["name"]},TA={version:0,primaryKey:"id",type:"object",properties:{id:Zr,name:{type:"string",maxLength:200}},required:["id","name"],indexes:["name"]},OA={version:0,primaryKey:"id",type:"object",properties:{id:Zr,name:{type:"string"},type:{type:"string"}},required:["id","name"]},IA={version:1,primaryKey:"id",type:"object",properties:{id:Zr,logic:{type:"string"},conditions:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}},merchantId:{type:"string"},accountId:{type:"string"},tagIds:{type:"array",items:{type:"string"}}},required:["id","logic","conditions","tagIds"]},PA={version:0,primaryKey:"id",type:"object",properties:{id:Zr,title:{type:"string"},chartType:{type:"string"},granularity:{type:"string"},startDate:{type:"string"},endDate:{type:"string"},tagId:{type:"string"},merchantId:{type:"string"},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"},excludedTagIds:{type:"array",items:{type:"string"}},excludedMerchantIds:{type:"array",items:{type:"string"}},direction:{type:"string"},descriptionFilter:{type:"string"},descriptionFilterMode:{type:"string"},legendPosition:{type:"string"},filters:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}}},required:["id","title","chartType","granularity","position"]},RA={version:0,primaryKey:"id",type:"object",properties:{id:Zr,title:{type:"string"},model:{type:"string"},columns:{type:"array",items:{type:"string"}},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"}},required:["id","title","model","columns","position"]},AA={version:0,primaryKey:"id",type:"object",properties:{id:Zr,value:{type:"number"}},required:["id","value"]},LA={version:0,primaryKey:"id",type:"object",properties:{id:Zr,data:{type:"string"}},required:["id"]};class vr{#t;constructor(t){this.#t=t}get rxCollection(){return this.#t}async get(t){const n=await this.#t.findOne(t).exec();if(!n)throw new Error(`Document not found: ${t}`);return n.toJSON(!0)}async put(t){return await this.#t.upsert(t),{id:t.id}}async bulkDocs(t){await this.#t.bulkUpsert(t)}async remove(t){const n=await this.#t.findOne(t).exec();n&&await n.remove()}async find(t){return(await this.#t.find(t).exec()).map(i=>i.toJSON(!0))}async all(){return(await this.#t.find().exec()).map(n=>n.toJSON(!0))}async clear(){const t=await this.#t.find().exec();await Promise.all(t.map(n=>n.remove()))}async count(){return this.#t.count().exec()}subscribe(t){const n=this.#t.$.subscribe(t);return{unsubscribe:()=>n.unsubscribe()}}}async function NA(e){const n=new TextEncoder().encode(e);if(typeof crypto<"u"&&crypto.subtle?.digest){const r=await crypto.subtle.digest("SHA-256",n),s=new Uint8Array(r);return Array.from(s,o=>o.toString(16).padStart(2,"0")).join("")}let i=2166136261;for(let r=0;r<n.length;r++)i^=n[r],i=Math.imul(i,16777619);return(i>>>0).toString(16).padStart(8,"0")}async function FA(e,t="budgee"){const n=await qP({name:t,storage:e,hashFunction:NA});try{await n.addCollections({transactions:{schema:DA,migrationStrategies:{1:i=>(i.description=i.originalDescription,delete i.originalDescription,i)}},tags:{schema:$A},merchants:{schema:TA},accounts:{schema:OA},merchant_rules:{schema:IA,migrationStrategies:{1:i=>i}},dashboard_charts:{schema:PA},dashboard_tables:{schema:RA},meta:{schema:AA},backups:{schema:LA}})}catch(i){throw(i instanceof Error?i.message:String(i)).includes("DB6")?new Zx("Database schema version mismatch (DB6)",i):i}return{rxdb:n,transactions:new vr(n.transactions),tags:new vr(n.tags),merchants:new vr(n.merchants),accounts:new vr(n.accounts),merchantRules:new vr(n.merchant_rules),dashboardCharts:new vr(n.dashboard_charts),dashboardTables:new vr(n.dashboard_tables),meta:new vr(n.meta),backups:new vr(n.backups)}}async function zA(){const{getRxStorageDexie:e}=await Ia(async()=>{const{getRxStorageDexie:t}=await import("./index-B58Ua7xj.js");return{getRxStorageDexie:t}},[]);return FA(e())}const jA=zA().then(e=>e);function Z(){return jA}function ir(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=new Uint8Array(16);crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Zs(e){if(!e)return{docs:[],idMap:new Map};const t=new Map;return{docs:e.map(i=>{if(i.id)return i;const s=String(i._id??""),o=ir();return s&&t.set(s,o),{...i,id:o}}),idMap:t}}function Fc(e,t){return t&&(e.get(t)??t)}function gh(e,t){return t&&t.map(n=>e.get(n)??n)}async function Jx(e){const t=await e.text(),n=JSON.parse(t),{migrateExport:i,LATEST_VERSION:r}=await Ia(async()=>{const{migrateExport:_,LATEST_VERSION:C}=await Promise.resolve().then(()=>qA);return{migrateExport:_,LATEST_VERSION:C}},void 0),s=i(n),o=await Z();await o.transactions.clear(),await o.tags.clear(),await o.merchants.clear(),await o.accounts.clear(),await o.merchantRules.clear(),await o.dashboardCharts.clear(),await o.dashboardTables.clear();const{docs:a,idMap:c}=Zs(s.tags),{docs:l,idMap:u}=Zs(s.merchants),{docs:h,idMap:d}=Zs(s.accounts),f=c.size>0||u.size>0||d.size>0,{docs:p}=Zs(s.transactions),{docs:g}=Zs(s.merchantRules),{docs:m}=Zs(s.dashboardCharts),{docs:b}=Zs(s.dashboardTables);if(f){for(const _ of p)_.merchantId=Fc(u,_.merchantId),_.accountId=Fc(d,_.accountId),_.tagIds=gh(c,_.tagIds)??_.tagIds;for(const _ of g)_.merchantId=Fc(u,_.merchantId),_.tagIds=gh(c,_.tagIds)??_.tagIds;for(const _ of m)_.tagId=Fc(c,_.tagId),_.merchantId=Fc(u,_.merchantId),_.excludedTagIds=gh(c,_.excludedTagIds),_.excludedMerchantIds=gh(u,_.excludedMerchantIds)}p.length&&await o.transactions.bulkDocs(p),a.length&&await o.tags.bulkDocs(a),l.length&&await o.merchants.bulkDocs(l),h.length&&await o.accounts.bulkDocs(h),g.length&&await o.merchantRules.bulkDocs(g),m.length&&await o.dashboardCharts.bulkDocs(m),b.length&&await o.dashboardTables.bulkDocs(b);try{const _=await o.meta.get("schema_version");await o.meta.put({..._,value:r})}catch{await o.meta.put({id:"schema_version",value:r})}}const t2=[],Yi=t2.length;function e2(e){let t=e.version??Yi,n=e;for(;t<Yi;)n=t2[t](n),t=n.version??t+1;return n}async function BA(e){return{version:Yi,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()}}async function WA(e,t){const n=`backup_${new Date().toISOString()}`;await e.backups.put({id:n,data:JSON.stringify(t)}),await HA(e,10)}async function HA(e,t){const n=await e.backups.all();if(n.length<=t)return;const r=n.sort((s,o)=>o.id.localeCompare(s.id)).slice(t);for(const s of r)await e.backups.remove(s.id)}async function UA(e){try{return(await e.meta.get("schema_version")).value}catch{return null}}async function YA(e,t){await e.meta.put({id:"schema_version",value:t})}async function VA(e,t){await e.transactions.clear(),await e.tags.clear(),await e.merchants.clear(),await e.accounts.clear(),await e.merchantRules.clear(),await e.dashboardCharts.clear(),await e.dashboardTables.clear(),t.transactions?.length&&await e.transactions.bulkDocs(t.transactions),t.tags?.length&&await e.tags.bulkDocs(t.tags),t.merchants?.length&&await e.merchants.bulkDocs(t.merchants),t.accounts?.length&&await e.accounts.bulkDocs(t.accounts),t.merchantRules?.length&&await e.merchantRules.bulkDocs(t.merchantRules),t.dashboardCharts?.length&&await e.dashboardCharts.bulkDocs(t.dashboardCharts),t.dashboardTables?.length&&await e.dashboardTables.bulkDocs(t.dashboardTables)}async function n2(e){const t=await UA(e);if(t!=null&&t>=Yi)return;const n=await BA(e);if(n.version=t??Yi,console.log(`[migrate] Current data at version ${n.version}`),(n.version??Yi)<Yi){await WA(e,n),console.log("[migrate] Backup saved");const i=e2(n);console.log(`[migrate] Migrated to version ${i.version}`),await VA(e,i)}await YA(e,Yi),console.log("[migrate] Migration complete")}const qA=Object.freeze(Object.defineProperty({__proto__:null,LATEST_VERSION:Yi,migrateDatabase:n2,migrateExport:e2},Symbol.toStringTag,{value:"Module"}));var i2=new WeakMap,KA=new WeakMap;function rb(e){return yi(KA,e,()=>Ux(e))}function GA(){var e=Yx(this.storage.name,this.token,this.name,this),t=this.close.bind(this);this.close=function(){return qg(this.token,this),t()};var n=rb(e);return n||(n=rb(e),i2.set(this,n)),this.leaderElector=()=>n,n}function XA(){return this.multiInstance?this.leaderElector().isLeader:!0}function QA(){return this.multiInstance?this.leaderElector().awaitLeadership().then(()=>!0):uv}function ZA(e){var t=i2.get(e);t&&t.die()}var JA=!0,t4={RxDatabase:e=>{e.leaderElector=GA,e.isLeader=XA,e.waitForLeadership=QA}},e4={name:"leader-election",rxdb:JA,prototypes:t4,hooks:{preCloseRxDatabase:{after:ZA}}},sb=e=>Promise.resolve(e);function ob(e,t){if(e==="_deleted")return t;t=Vt(t);var n=!!t._deleted;return t[e]=n,delete t._deleted,t}function Np(e,t,n){return n.map(i=>{var r=Vt(i);if(t!=="_deleted"){var s=!!r[t];r._deleted=s,delete r[t]}else r._deleted=!!r._deleted;var o=e.schema.primaryPath;return r[o]=Hs(e.schema.jsonSchema,r),r})}function ab(e,t){if(typeof window>"u"||typeof window!="object"||typeof window.addEventListener>"u"||navigator.onLine)return e.promiseWait(t);var n,i=new Promise(r=>{n=()=>{window.removeEventListener("online",n),r()},window.addEventListener("online",n)});return Promise.race([i,e.promiseWait(t)]).then(()=>{window.removeEventListener("online",n)})}function n4(e){function t(){if(!(typeof document>"u"||typeof document.dispatchEvent!="function")){var i=new Event("mousemove");document.dispatchEvent(i)}}var n=setInterval(t,20*1e3);e.onCancel.push(()=>clearInterval(n))}var i4=new WeakMap,r4=(function(){function e(n,i,r,s,o,a,c,l,u){this.subs=[],this.subjects={received:new Fe,sent:new Fe,error:new Fe,canceled:new ui(!1),active:new ui(!1)},this.received$=this.subjects.received.asObservable(),this.sent$=this.subjects.sent.asObservable(),this.error$=this.subjects.error.asObservable(),this.canceled$=this.subjects.canceled.asObservable(),this.active$=this.subjects.active.asObservable(),this.wasStarted=!1,this.startQueue=di,this.onCancel=[],this.callOnStart=void 0,this.remoteEvents$=new Fe,this.replicationIdentifier=n,this.collection=i,this.deletedField=r,this.pull=s,this.push=o,this.live=a,this.retryTime=c,this.autoStart=l,this.toggleOnDocumentVisible=u,this.metaInfoPromise=(async()=>{var f="rx-replication-meta-"+await i.database.hashFunction([this.collection.name,this.replicationIdentifier].join("-")),p=Hg(this.collection.schema.jsonSchema,Dd(this.collection.schema.jsonSchema));return{collectionName:f,schema:p}})();var h=yi(i4,i,()=>[]);h.push(this),this.collection.onClose.push(()=>this.cancel()),Object.keys(this.subjects).forEach(f=>{Object.defineProperty(this,f+"$",{get:function(){return this.subjects[f].asObservable()}})});var d=new Promise(f=>{this.callOnStart=f});this.startPromise=d}var t=e.prototype;return t.start=function(){return this.startQueue=this.startQueue.then(()=>this._start()),this.startQueue},t._start=async function(){if(!this.isStopped()){if(this.internalReplicationState&&this.internalReplicationState.events.paused.next(!1),this.wasStarted){this.reSync();return}this.wasStarted=!0,this.toggleOnDocumentVisible||n4(this);var i=this.pull&&this.pull.modifier?this.pull.modifier:sb,r=this.push&&this.push.modifier?this.push.modifier:sb,s=this.collection.database,o=await this.metaInfoPromise,[a]=await Promise.all([this.collection.database.storage.createStorageInstance({databaseName:s.name,collectionName:o.collectionName,databaseInstanceToken:s.token,multiInstance:s.multiInstance,options:{},schema:o.schema,password:s.password,devMode:At.isDevMode()}),vx(this.collection,o.collectionName,o.schema)]);this.metaInstance=a,this.internalReplicationState=Dx({pushBatchSize:this.push&&this.push.batchSize?this.push.batchSize:100,pullBatchSize:this.pull&&this.pull.batchSize?this.pull.batchSize:100,initialCheckpoint:{upstream:this.push?this.push.initialCheckpoint:void 0,downstream:this.pull?this.pull.initialCheckpoint:void 0},forkInstance:this.collection.storageInstance,metaInstance:this.metaInstance,hashFunction:s.hashFunction,identifier:"rxdbreplication"+this.replicationIdentifier,conflictHandler:this.collection.conflictHandler,replicationHandler:{masterChangeStream$:this.remoteEvents$.asObservable().pipe(Ot(c=>!!this.pull),nr(async c=>{if(c==="RESYNC")return c;var l=Vt(c);return l.documents=Np(this.collection,this.deletedField,l.documents),l.documents=await Promise.all(l.documents.map(u=>i(u))),l})),masterChangesSince:async(c,l)=>{if(!this.pull)return{checkpoint:null,documents:[]};for(var u=!1,h={};!u&&!this.isStoppedOrPaused();)try{h=await this.pull.handler(c,l),u=!0}catch(p){var d=U("RC_PULL",{checkpoint:c,errors:yd(p).map(g=>Cd(g)),direction:"pull"});this.subjects.error.next(d),await ab(this.collection,Q(this.retryTime))}if(this.isStoppedOrPaused())return{checkpoint:null,documents:[]};var f=Vt(h);return f.documents=Np(this.collection,this.deletedField,f.documents),f.documents=await Promise.all(f.documents.map(p=>i(p))),f},masterWrite:async c=>{if(!this.push)return[];var l=!1;await $o("preReplicationMasterWrite",{rows:c,collection:this.collection});var u=await Promise.all(c.map(async g=>(g.newDocumentState=await r(g.newDocumentState),g.newDocumentState===null?null:(g.assumedMasterState&&(g.assumedMasterState=await r(g.assumedMasterState)),this.deletedField!=="_deleted"&&(g.newDocumentState=ob(this.deletedField,g.newDocumentState),g.assumedMasterState&&(g.assumedMasterState=ob(this.deletedField,g.assumedMasterState))),g)))),h=u.filter(b$),d=null;for(h.length===0&&(l=!0,d=[]);!l&&!this.isStoppedOrPaused();)try{if(d=await this.push.handler(h),!Array.isArray(d))throw U("RC_PUSH_NO_AR",{pushRows:c,direction:"push",args:{result:d}});l=!0}catch(g){var f=g.rxdb?g:U("RC_PUSH",{pushRows:c,errors:yd(g).map(m=>Cd(m)),direction:"push"});this.subjects.error.next(f),await ab(this.collection,Q(this.retryTime))}if(this.isStoppedOrPaused())return[];await $o("preReplicationMasterWriteDocumentsHandle",{result:d,collection:this.collection});var p=Np(this.collection,this.deletedField,Q(d));return p}}}),this.subs.push(this.internalReplicationState.events.error.subscribe(c=>{this.subjects.error.next(c)}),this.internalReplicationState.events.processed.down.subscribe(c=>this.subjects.received.next(c.document)),this.internalReplicationState.events.processed.up.subscribe(c=>{this.subjects.sent.next(c.newDocumentState)}),mv([this.internalReplicationState.events.active.down,this.internalReplicationState.events.active.up]).subscribe(([c,l])=>{var u=c||l;this.subjects.active.next(u)})),this.pull&&this.pull.stream$&&this.live&&this.subs.push(this.pull.stream$.subscribe({next:c=>{this.isStoppedOrPaused()||this.remoteEvents$.next(c)},error:c=>{this.subjects.error.next(c)}})),this.live||(await jh(this.internalReplicationState),await Yg(this.internalReplicationState),await this._cancel()),this.callOnStart()}},t.pause=function(){return this.startQueue=this.startQueue.then(()=>{this.internalReplicationState&&this.internalReplicationState.events.paused.next(!0)}),this.startQueue},t.isPaused=function(){return!!(this.internalReplicationState&&this.internalReplicationState.events.paused.getValue())},t.isStopped=function(){return!!this.subjects.canceled.getValue()},t.isStoppedOrPaused=function(){return this.isPaused()||this.isStopped()},t.awaitInitialReplication=async function(){return await this.startPromise,jh(Q(this.internalReplicationState))},t.awaitInSync=async function(){await this.startPromise,await jh(Q(this.internalReplicationState));for(var i=2;i>0;)i--,await this.collection.database.requestIdlePromise(),await Yg(Q(this.internalReplicationState));return!0},t.reSync=function(){this.remoteEvents$.next("RESYNC")},t.emitEvent=function(i){this.remoteEvents$.next(i)},t.cancel=async function(){this.startQueue=this.startQueue.catch(()=>{}).then(async()=>{await this._cancel()}),await this.startQueue},t._cancel=async function(i=!1){if(this.isStopped())return er;var r=this.onCancel.map(s=>f1(s()));return this.internalReplicationState&&await $x(this.internalReplicationState),this.metaInstance&&!i&&r.push(Q(this.internalReplicationState).checkpointQueue.then(()=>Q(this.metaInstance).close())),this.subs.forEach(s=>s.unsubscribe()),this.subjects.canceled.next(!0),this.subjects.active.complete(),this.subjects.canceled.complete(),this.subjects.error.complete(),this.subjects.received.complete(),this.subjects.sent.complete(),Promise.all(r)},t.remove=async function(){return this.startQueue=this.startQueue.then(async()=>{var i=await this.metaInfoPromise;await this._cancel(!0),await Q(this.internalReplicationState).checkpointQueue.then(()=>Q(this.metaInstance).remove()),await TP(this.collection,i.collectionName,i.schema)}),this.startQueue},e})();function s4({replicationIdentifier:e,collection:t,deletedField:n="_deleted",pull:i,push:r,live:s=!0,retryTime:o=1e3*5,waitForLeadership:a=!0,autoStart:c=!0,toggleOnDocumentVisible:l=!1}){if(Tv(e4),!i&&!r)throw U("UT3",{collection:t.name,args:{replicationIdentifier:e}});var u=new r4(e,t,n,i,r,s,o,c,l);if(l&&typeof document<"u"&&typeof document.addEventListener=="function"&&typeof document.visibilityState=="string"){var h=()=>{if(!u.isStopped()){var d=document.visibilityState==="visible";d?u.start():t.database.isLeader()||u.pause()}};document.addEventListener("visibilitychange",h),u.onCancel.push(()=>document.removeEventListener("visibilitychange",h))}return o4(a,u),u}function o4(e,t){var n=e&&t.collection.database.multiInstance,i=n?t.collection.database.waitForLeadership():uv;return i.then(()=>{t.isStopped()||t.autoStart&&t.start()})}var Gg=function(e,t){return Gg=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)i.hasOwnProperty(r)&&(n[r]=i[r])},Gg(e,t)};function r2(e,t){Gg(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function a4(e){var t=typeof Symbol=="function"&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function c4(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),r,s=[],o;try{for(;(t===void 0||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}function l4(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(c4(arguments[t]));return e}var s2=(function(){function e(t,n){this.target=n,this.type=t}return e})(),u4=(function(e){r2(t,e);function t(n,i){var r=e.call(this,"error",i)||this;return r.message=n.message,r.error=n,r}return t})(s2),h4=(function(e){r2(t,e);function t(n,i,r){n===void 0&&(n=1e3),i===void 0&&(i="");var s=e.call(this,"close",r)||this;return s.wasClean=!0,s.code=n,s.reason=i,s}return t})(s2);var d4=function(){if(typeof WebSocket<"u")return WebSocket},f4=function(e){return typeof e<"u"&&!!e&&e.CLOSING===2},Js={maxReconnectionDelay:1e4,minReconnectionDelay:1e3+Math.random()*4e3,minUptime:5e3,reconnectionDelayGrowFactor:1.3,connectionTimeout:4e3,maxRetries:1/0,maxEnqueuedMessages:1/0},p4=(function(){function e(t,n,i){var r=this;i===void 0&&(i={}),this._listeners={error:[],message:[],open:[],close:[]},this._retryCount=-1,this._shouldReconnect=!0,this._connectLock=!1,this._binaryType="blob",this._closeCalled=!1,this._messageQueue=[],this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this._handleOpen=function(s){r._debug("open event");var o=r._options.minUptime,a=o===void 0?Js.minUptime:o;clearTimeout(r._connectTimeout),r._uptimeTimeout=setTimeout(function(){return r._acceptOpen()},a),r._ws.binaryType=r._binaryType,r._messageQueue.forEach(function(c){return r._ws.send(c)}),r._messageQueue=[],r.onopen&&r.onopen(s),r._listeners.open.forEach(function(c){return r._callEventListener(s,c)})},this._handleMessage=function(s){r._debug("message event"),r.onmessage&&r.onmessage(s),r._listeners.message.forEach(function(o){return r._callEventListener(s,o)})},this._handleError=function(s){r._debug("error event",s.message),r._disconnect(void 0,s.message==="TIMEOUT"?"timeout":void 0),r.onerror&&r.onerror(s),r._debug("exec error listeners"),r._listeners.error.forEach(function(o){return r._callEventListener(s,o)}),r._connect()},this._handleClose=function(s){r._debug("close event"),r._clearTimeouts(),r._shouldReconnect&&r._connect(),r.onclose&&r.onclose(s),r._listeners.close.forEach(function(o){return r._callEventListener(s,o)})},this._url=t,this._protocols=n,this._options=i,this._options.startClosed&&(this._shouldReconnect=!1),this._connect()}return Object.defineProperty(e,"CONNECTING",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(e,"OPEN",{get:function(){return 1},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSING",{get:function(){return 2},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSED",{get:function(){return 3},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CONNECTING",{get:function(){return e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"OPEN",{get:function(){return e.OPEN},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSING",{get:function(){return e.CLOSING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSED",{get:function(){return e.CLOSED},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"binaryType",{get:function(){return this._ws?this._ws.binaryType:this._binaryType},set:function(t){this._binaryType=t,this._ws&&(this._ws.binaryType=t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"retryCount",{get:function(){return Math.max(this._retryCount,0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var t=this._messageQueue.reduce(function(n,i){return typeof i=="string"?n+=i.length:i instanceof Blob?n+=i.size:n+=i.byteLength,n},0);return t+(this._ws?this._ws.bufferedAmount:0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this._ws?this._ws.extensions:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this._ws?this._ws.protocol:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this._ws?this._ws.readyState:this._options.startClosed?e.CLOSED:e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this._ws?this._ws.url:""},enumerable:!0,configurable:!0}),e.prototype.close=function(t,n){if(t===void 0&&(t=1e3),this._closeCalled=!0,this._shouldReconnect=!1,this._clearTimeouts(),!this._ws){this._debug("close enqueued: no ws instance");return}if(this._ws.readyState===this.CLOSED){this._debug("close: already closed");return}this._ws.close(t,n)},e.prototype.reconnect=function(t,n){this._shouldReconnect=!0,this._closeCalled=!1,this._retryCount=-1,!this._ws||this._ws.readyState===this.CLOSED?this._connect():(this._disconnect(t,n),this._connect())},e.prototype.send=function(t){if(this._ws&&this._ws.readyState===this.OPEN)this._debug("send",t),this._ws.send(t);else{var n=this._options.maxEnqueuedMessages,i=n===void 0?Js.maxEnqueuedMessages:n;this._messageQueue.length<i&&(this._debug("enqueue",t),this._messageQueue.push(t))}},e.prototype.addEventListener=function(t,n){this._listeners[t]&&this._listeners[t].push(n)},e.prototype.dispatchEvent=function(t){var n,i,r=this._listeners[t.type];if(r)try{for(var s=a4(r),o=s.next();!o.done;o=s.next()){var a=o.value;this._callEventListener(t,a)}}catch(c){n={error:c}}finally{try{o&&!o.done&&(i=s.return)&&i.call(s)}finally{if(n)throw n.error}}return!0},e.prototype.removeEventListener=function(t,n){this._listeners[t]&&(this._listeners[t]=this._listeners[t].filter(function(i){return i!==n}))},e.prototype._debug=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this._options.debug&&console.log.apply(console,l4(["RWS>"],t))},e.prototype._getNextDelay=function(){var t=this._options,n=t.reconnectionDelayGrowFactor,i=n===void 0?Js.reconnectionDelayGrowFactor:n,r=t.minReconnectionDelay,s=r===void 0?Js.minReconnectionDelay:r,o=t.maxReconnectionDelay,a=o===void 0?Js.maxReconnectionDelay:o,c=0;return this._retryCount>0&&(c=s*Math.pow(i,this._retryCount-1),c>a&&(c=a)),this._debug("next delay",c),c},e.prototype._wait=function(){var t=this;return new Promise(function(n){setTimeout(n,t._getNextDelay())})},e.prototype._getNextUrl=function(t){if(typeof t=="string")return Promise.resolve(t);if(typeof t=="function"){var n=t();if(typeof n=="string")return Promise.resolve(n);if(n.then)return n}throw Error("Invalid URL")},e.prototype._connect=function(){var t=this;if(!(this._connectLock||!this._shouldReconnect)){this._connectLock=!0;var n=this._options,i=n.maxRetries,r=i===void 0?Js.maxRetries:i,s=n.connectionTimeout,o=s===void 0?Js.connectionTimeout:s,a=n.WebSocket,c=a===void 0?d4():a;if(this._retryCount>=r){this._debug("max retries reached",this._retryCount,">=",r);return}if(this._retryCount++,this._debug("connect",this._retryCount),this._removeListeners(),!f4(c))throw Error("No valid WebSocket class provided");this._wait().then(function(){return t._getNextUrl(t._url)}).then(function(l){t._closeCalled||(t._debug("connect",{url:l,protocols:t._protocols}),t._ws=t._protocols?new c(l,t._protocols):new c(l),t._ws.binaryType=t._binaryType,t._connectLock=!1,t._addListeners(),t._connectTimeout=setTimeout(function(){return t._handleTimeout()},o))})}},e.prototype._handleTimeout=function(){this._debug("timeout event"),this._handleError(new u4(Error("TIMEOUT"),this))},e.prototype._disconnect=function(t,n){if(t===void 0&&(t=1e3),this._clearTimeouts(),!!this._ws){this._removeListeners();try{this._ws.close(t,n),this._handleClose(new h4(t,n,this))}catch{}}},e.prototype._acceptOpen=function(){this._debug("accept open"),this._retryCount=0},e.prototype._callEventListener=function(t,n){"handleEvent"in n?n.handleEvent(t):n(t)},e.prototype._removeListeners=function(){this._ws&&(this._debug("removeListeners"),this._ws.removeEventListener("open",this._handleOpen),this._ws.removeEventListener("close",this._handleClose),this._ws.removeEventListener("message",this._handleMessage),this._ws.removeEventListener("error",this._handleError))},e.prototype._addListeners=function(){this._ws&&(this._debug("addListeners"),this._ws.addEventListener("open",this._handleOpen),this._ws.addEventListener("close",this._handleClose),this._ws.addEventListener("message",this._handleMessage),this._ws.addEventListener("error",this._handleError))},e.prototype._clearTimeouts=function(){clearTimeout(this._connectTimeout),clearTimeout(this._uptimeTimeout)},e})(),fo=null;typeof WebSocket<"u"?fo=WebSocket:typeof MozWebSocket<"u"?fo=MozWebSocket:typeof global<"u"?fo=global.WebSocket||global.MozWebSocket:typeof window<"u"?fo=window.WebSocket||window.MozWebSocket:typeof self<"u"&&(fo=self.WebSocket||self.MozWebSocket);function g4(e){var t=typeof e<"u"&&!!e&&e.CLOSING===2;if(!t)throw console.dir(e),new Error("websocket not valid")}async function m4(e){g4(fo);var t=new p4(e.url,[],{WebSocket:fo}),n=new ui(!1),i=new Fe,r=new Fe;return t.onerror=s=>{var o=U("RC_STREAM",{errors:yd(s).map(a=>Cd(a)),direction:"pull"});r.next(o)},await new Promise(s=>{t.onopen=()=>{if(e.headers){var o={collection:e.collection.name,id:Go(10),params:[e.headers],method:"auth"};t.send(JSON.stringify(o))}n.next(!0),s()}}),t.onclose=()=>{n.next(!1)},t.onmessage=s=>{var o=JSON.parse(s.data);i.next(o)},{url:e.url,socket:t,connected$:n,message$:i,error$:r}}async function v4(e){var t=await m4(e),n=t.socket,i=t.message$,r=0,s=Go(10);function o(){var c=r++;return e.collection.database.token+"|"+s+"|"+c}var a=s4({collection:e.collection,replicationIdentifier:e.replicationIdentifier,live:e.live,pull:{batchSize:e.batchSize,stream$:i.pipe(Ot(c=>c.id==="stream"&&c.collection===e.collection.name),Ht(c=>c.result)),async handler(c,l){var u=o(),h={id:u,collection:e.collection.name,method:"masterChangesSince",params:[c,l]};n.send(JSON.stringify(h));var d=await Rr(i.pipe(Ot(f=>f.id===u),Ht(f=>f.result)));return d}},push:{batchSize:e.batchSize,handler(c){var l=o(),u={id:l,collection:e.collection.name,method:"masterWrite",params:[c]};return n.send(JSON.stringify(u)),Rr(i.pipe(Ot(h=>h.id===l),Ht(h=>h.result)))}}});return t.error$.subscribe(c=>a.subjects.error.next(c)),t.connected$.subscribe(c=>{if(c){a.reSync();var l={id:"stream",collection:e.collection.name,method:"masterChangeStream$",params:[]};n.send(JSON.stringify(l))}}),e.collection.onClose.push(()=>t.socket.close()),a}async function y4(e){const t=await fetch(`${e}/health`);if(!t.ok)throw new Error(`Server returned ${t.status} ${t.statusText}`)}const b4=["transactions","tags","merchants","accounts","merchant_rules","dashboard_charts","dashboard_tables"],Bh=new ui({state:"not-configured"}),_4=Bh.pipe(F1(e=>{if(e.state==="not-configured")return xy("not-configured");if(e.state==="connecting")return xy("connecting");const{replications:t}=e,n=Ig(...t.map(r=>r.error$)).pipe(Ht(()=>"error")),i=mv(t.map(r=>r.active$)).pipe(Ht(r=>r.some(Boolean)?"syncing":"synced"));return Ig(i,n)}));async function w4(e){Bh.next({state:"connecting"});const n=(await Z()).rxdb,i=e.replace(/^http/,"ws")+"/ws",r=await Promise.all(b4.map(async s=>{const o=n[s],a=`budgee--${s}`;try{await fetch(`${e}/databases`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:a,schema:o.schema.jsonSchema})})}catch(c){console.warn(`Failed to register schema for ${s}:`,c)}return v4({collection:o,replicationIdentifier:a,url:`${i}/${a}`,live:!0})}));return Bh.next({state:"connected",replications:r}),async()=>{Bh.next({state:"not-configured"}),await Promise.all(r.map(s=>s.cancel().catch(console.error)))}}const Li=dt`
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
`,o2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var x4=Object.defineProperty,C4=Object.getOwnPropertyDescriptor,a2=e=>{throw TypeError(e)},c2=(e,t,n,i)=>{for(var r=i>1?void 0:i?C4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&x4(t,n,r),r},k4=(e,t,n)=>t.has(e)||a2("Cannot "+n),S4=(e,t,n)=>t.has(e)?a2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),cb=(e,t,n)=>(k4(e,t,"access private method"),n),Wh,l2,u2;let Ld=class extends mt{constructor(){super(...arguments),S4(this,Wh),this.heading=""}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.shadowRoot?.getElementById("popover");e?.showPopover?.(),e?.addEventListener("toggle",t=>{t.newState==="closed"&&this.dispatchEvent(new CustomEvent("modal-close"))}),cb(this,Wh,l2).call(this)})}render(){return E`
      <div id="popover" popover="auto" role="dialog" aria-modal="true" aria-label=${this.heading}>
        <div class="header">
          <h3>${this.heading}</h3>
          <button class="close" aria-label="Close" @click=${cb(this,Wh,u2)}>${ye(o2)}</button>
        </div>
        <slot></slot>
      </div>
    `}};Wh=new WeakSet;l2=function(){const e=this.shadowRoot?.getElementById("popover");e&&e.addEventListener("keydown",t=>{if(t.key!=="Tab")return;const n='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',i=[...Array.from(e.querySelectorAll(n)),...Array.from(this.querySelectorAll(n))];if(i.length===0)return;const r=i[0],s=i[i.length-1];t.shiftKey&&document.activeElement===r?(t.preventDefault(),s.focus()):!t.shiftKey&&document.activeElement===s&&(t.preventDefault(),r.focus())})};u2=function(){this.shadowRoot?.getElementById("popover")?.hidePopover?.()};Ld.styles=dt`
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
  `;c2([H({type:String})],Ld.prototype,"heading",2);Ld=c2([Et("budgee-modal")],Ld);var E4=Object.defineProperty,M4=Object.getOwnPropertyDescriptor,h2=e=>{throw TypeError(e)},_c=(e,t,n,i)=>{for(var r=i>1?void 0:i?M4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&E4(t,n,r),r},Rv=(e,t,n)=>t.has(e)||h2("Cannot "+n),Av=(e,t,n)=>(Rv(e,t,"read from private field"),n?n.call(e):t.get(e)),lb=(e,t,n)=>t.has(e)?h2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),D4=(e,t,n,i)=>(Rv(e,t,"write to private field"),t.set(e,n),n),Fp=(e,t,n)=>(Rv(e,t,"access private method"),n),Qa,Jc,d2,f2,p2;let _i=class extends mt{constructor(){super(...arguments),lb(this,Jc),this.heading="Are you sure?",this.message="",this.confirmLabel="Confirm",this.cancelLabel="Cancel",this.danger=!1,lb(this,Qa)}static show(e){return new Promise(t=>{const n=document.createElement("budgee-confirm-dialog");e.heading&&(n.heading=e.heading),n.message=e.message,e.confirmLabel&&(n.confirmLabel=e.confirmLabel),e.cancelLabel&&(n.cancelLabel=e.cancelLabel),e.danger&&(n.danger=e.danger),D4(n,Qa,i=>{n.remove(),t(i)}),document.body.appendChild(n)})}render(){return E`
      <budgee-modal heading=${this.heading} @modal-close=${Fp(this,Jc,p2)}>
        <div class="message">${this.message}</div>
        <div class="actions">
          <button class="secondary" @click=${Fp(this,Jc,f2)}>${this.cancelLabel}</button>
          <button class=${this.danger?"danger":""} @click=${Fp(this,Jc,d2)}>
            ${this.confirmLabel}
          </button>
        </div>
      </budgee-modal>
    `}};Qa=new WeakMap;Jc=new WeakSet;d2=function(){var e;(e=Av(this,Qa))==null||e.call(this,!0)};f2=function(){var e;(e=Av(this,Qa))==null||e.call(this,!1)};p2=function(){var e;(e=Av(this,Qa))==null||e.call(this,!1)};_i.styles=[Li,dt`
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
    `];_c([H()],_i.prototype,"heading",2);_c([H()],_i.prototype,"message",2);_c([H({attribute:"confirm-label"})],_i.prototype,"confirmLabel",2);_c([H({attribute:"cancel-label"})],_i.prototype,"cancelLabel",2);_c([H({type:Boolean})],_i.prototype,"danger",2);_i=_c([Et("budgee-confirm-dialog")],_i);var $4=Object.defineProperty,T4=Object.getOwnPropertyDescriptor,g2=e=>{throw TypeError(e)},Bu=(e,t,n,i)=>{for(var r=i>1?void 0:i?T4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&$4(t,n,r),r},O4=(e,t,n)=>t.has(e)||g2("Cannot "+n),I4=(e,t,n)=>t.has(e)?g2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Nd=(e,t,n)=>(O4(e,t,"access private method"),n),La,m2,v2,y2,b2;let Ao=class extends mt{constructor(){super(...arguments),I4(this,La),this.error="An unexpected error occurred.",this.isDatabaseError=!1,this._exporting=!1,this._deleting=!1}render(){return E`
      <div class="card">
        <h2>${this.isDatabaseError?"Database Error":"Something Went Wrong"}</h2>
        <p>${this.error}</p>
        <div class="actions">
          ${this.isDatabaseError?Nd(this,La,m2).call(this):Nd(this,La,v2).call(this)}
        </div>
      </div>
    `}};La=new WeakSet;m2=function(){return E`
      <button class="export-btn" ?disabled=${this._exporting} @click=${Nd(this,La,y2)}>
        ${this._exporting?"Exporting…":"Export raw data"}
      </button>
      <button class="delete-btn" ?disabled=${this._deleting} @click=${Nd(this,La,b2)}>
        ${this._deleting?"Deleting…":"Delete database and reload"}
      </button>
    `};v2=function(){return E`
      <button class="reload-btn" @click=${()=>window.location.reload()}>Reload</button>
    `};y2=async function(){this._exporting=!0;try{const e=await P4(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`budgee-raw-export-${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(n)}catch(e){console.error("Export failed:",e),alert("Export failed. Check the browser console for details.")}finally{this._exporting=!1}};b2=async function(){if(await _i.show({heading:"Delete Database",message:"This will permanently delete all local data. Are you sure?",confirmLabel:"Delete",danger:!0})){this._deleting=!0;try{const n=(await indexedDB.databases()).filter(i=>i.name?.startsWith("budgee"));await Promise.all(n.map(i=>new Promise((r,s)=>{const o=indexedDB.deleteDatabase(i.name);o.onsuccess=()=>r(),o.onerror=()=>s(o.error)}))),window.location.reload()}catch(t){console.error("Delete failed:",t),alert("Delete failed. Check the browser console for details."),this._deleting=!1}}};Ao.styles=dt`
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
  `;Bu([H()],Ao.prototype,"error",2);Bu([H({type:Boolean})],Ao.prototype,"isDatabaseError",2);Bu([P()],Ao.prototype,"_exporting",2);Bu([P()],Ao.prototype,"_deleting",2);Ao=Bu([Et("budgee-error-overlay")],Ao);async function P4(){const t=(await indexedDB.databases()).filter(i=>i.name?.startsWith("budgee")),n={};for(const i of t){const r=i.name,s=await new Promise((c,l)=>{const u=indexedDB.open(r);u.onsuccess=()=>c(u.result),u.onerror=()=>l(u.error)}),o={},a=Array.from(s.objectStoreNames);if(a.length>0){const c=s.transaction(a,"readonly");for(const l of a)o[l]=await new Promise((u,h)=>{const d=c.objectStore(l).getAll();d.onsuccess=()=>u(d.result),d.onerror=()=>h(d.error)})}s.close(),n[r]=o}return n}function Xg(e,t){if(document.querySelector("budgee-error-overlay"))return;const i=document.createElement("budgee-error-overlay");i.error=e,i.isDatabaseError=t?.isDatabaseError??!1,document.body.appendChild(i)}function R4(){window.addEventListener("error",e=>{const t=e.message||"An unknown error occurred.";Xg(t)}),window.addEventListener("unhandledrejection",e=>{const t=e.reason,n=t instanceof Error?t.message:t?String(t):"An unhandled promise rejection occurred.";Xg(n)})}const _2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var A4=Object.defineProperty,L4=Object.getOwnPropertyDescriptor,w2=(e,t,n,i)=>{for(var r=i>1?void 0:i?L4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&A4(t,n,r),r};let Fd=class extends mt{constructor(){super(...arguments),this.message=""}render(){return E`
      <div class="icon">${ye(_2)}</div>
      <div class="message">${this.message}</div>
    `}};Fd.styles=dt`
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
  `;w2([H()],Fd.prototype,"message",2);Fd=w2([Et("budgee-loading-overlay")],Fd);let fs=null;function Lv(e){if(fs){fs.message=e;return}fs=document.createElement("budgee-loading-overlay"),fs.message=e,document.body.appendChild(fs)}function Nv(){fs&&(fs.remove(),fs=null)}let zc=null,ub=!1;async function zp(){if(zc)return zc;const e=await Z();return zc=(await e.transactions.all()).map(n=>new _e(n)),ub||(ub=!0,e.transactions.subscribe(()=>{zc=null})),zc}class _e{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).transactions.subscribe(t)}static async all(){return zp()}static async get(t){const n=await Z();try{return new _e(await n.transactions.get(t))}catch{return}}static async update(t,n){const i=await Z(),r=await i.transactions.get(t);await i.transactions.put({...r,...n})}static async bulkPut(t){await(await Z()).transactions.bulkDocs(t.map(i=>({...i,id:i.id??ir()})))}static async bulkAdd(t){await(await Z()).transactions.bulkDocs(t.map(i=>({...i,id:ir()})))}static async forMerchant(t){return(await zp()).filter(i=>i.merchantId===t).sort((i,r)=>r.date.localeCompare(i.date))}static async forAccount(t){return(await zp()).filter(i=>i.accountId===t).sort((i,r)=>r.date.localeCompare(i.date))}static async bulkRemove(t){const n=await Z();await Promise.all(t.map(i=>n.transactions.remove(i)))}static async deleteAll(){const t=await Z(),n=await t.transactions.all();return await Promise.all(n.map(i=>t.transactions.remove(i.id))),n.length}static async deleteForAccount(t){const n=await Z(),r=(await n.transactions.all()).filter(s=>s.accountId===t);return await Promise.all(r.map(s=>n.transactions.remove(s.id))),r.length}}class Ie{constructor(t){this.id=t.id,this.name=t.name}static async subscribe(t){return(await Z()).merchants.subscribe(t)}static async all(){return(await(await Z()).merchants.all()).map(n=>new Ie(n))}static async get(t){const n=await Z();try{return new Ie(await n.merchants.get(t))}catch{return}}static async create(t){const n=await Z(),i={id:ir(),name:t};return await n.merchants.put(i),new Ie(i)}static async update(t,n){const i=await Z(),r=await i.merchants.get(t);await i.merchants.put({...r,...n})}static async remove(t){await(await Z()).merchants.remove(t)}static async byName(t){const r=(await(await Z()).merchants.all()).find(s=>s.name.toLowerCase()===t.toLowerCase());return r?new Ie(r):void 0}}function N4(){const e=40+Math.floor(Math.random()*20),t=20+Math.floor(Math.random()*30),n=Math.floor(Math.random()*360);return`lch(${e} ${t} ${n})`}class pe{constructor(t){this.id=t.id,this.name=t.name,this.icon=t.icon,this.color=t.color}static async subscribe(t){return(await Z()).tags.subscribe(t)}static async all(){return(await(await Z()).tags.all()).map(n=>new pe(n))}static async create(t,n){const i=await Z(),r={id:ir(),name:t,color:N4(),...n};return await i.tags.put(r),new pe(r)}static async update(t,n){const i=await Z(),r=await i.tags.get(t);await i.tags.put({...r,...n})}static async remove(t){await(await Z()).tags.remove(t)}static async byName(t){const r=(await(await Z()).tags.all()).find(s=>s.name.toLowerCase()===t.toLowerCase());return r?new pe(r):void 0}}class ke{constructor(t){this.id=t.id,this.name=t.name,this.type=t.type}static async subscribe(t){return(await Z()).accounts.subscribe(t)}static async all(){return(await(await Z()).accounts.all()).map(n=>new ke(n))}static async get(t){const n=await Z();try{return new ke(await n.accounts.get(t))}catch{return}}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.accounts.put(i),new ke(i)}static async update(t,n){const i=await Z(),r=await i.accounts.get(t);await i.accounts.put({...r,...n})}static async remove(t){await(await Z()).accounts.remove(t)}static toLookup(t){const n={};for(const i of t)n[i.id]=i;return n}}function wc(e){window.history.pushState({},"",e),window.dispatchEvent(new PopStateEvent("popstate"))}var F4=Object.defineProperty,z4=Object.getOwnPropertyDescriptor,x2=e=>{throw TypeError(e)},Wu=(e,t,n,i)=>{for(var r=i>1?void 0:i?z4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&F4(t,n,r),r},Fv=(e,t,n)=>t.has(e)||x2("Cannot "+n),Qg=(e,t,n)=>(Fv(e,t,"read from private field"),n?n.call(e):t.get(e)),jp=(e,t,n)=>t.has(e)?x2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),j4=(e,t,n,i)=>(Fv(e,t,"write to private field"),t.set(e,n),n),li=(e,t,n)=>(Fv(e,t,"access private method"),n),zd,Hh,On,C2,Pf,k2,S2,E2,zv,M2,D2,$2;let Lo=class extends mt{constructor(){super(...arguments),jp(this,On),this._open=!1,this._query="",this._results=[],this._activeIndex=0,jp(this,zd),jp(this,Hh,e=>{(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),li(this,On,C2).call(this))})}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",Qg(this,Hh))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",Qg(this,Hh))}render(){if(!this._open)return nt;const e=li(this,On,D2).call(this);let t=0;return E`
      <div @click=${li(this,On,M2)}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Search">
          <input
            type="text"
            placeholder="Search transactions, merchants, tags, accounts…"
            .value=${this._query}
            @input=${li(this,On,k2)}
            @keydown=${li(this,On,E2)}
            aria-label="Search"
          />
          <div class="results">
            ${this._results.length===0&&this._query.trim()?E`
                    <div class="empty">No results found</div>
                  `:""}
            ${[...e.entries()].map(([n,i])=>E`
                <div class="group-label">${li(this,On,$2).call(this,n)}</div>
                ${i.map(r=>{const s=t++;return E`
                    <div
                      class=${ov({result:!0,active:s===this._activeIndex})}
                      @click=${()=>li(this,On,zv).call(this,r)}
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
    `}};zd=new WeakMap;Hh=new WeakMap;On=new WeakSet;C2=function(){this._open=!0,this.setAttribute("open",""),this._query="",this._results=[],this._activeIndex=0,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};Pf=function(){this._open=!1,this.removeAttribute("open"),this._query="",this._results=[]};k2=function(e){this._query=e.target.value,this._activeIndex=0,clearTimeout(Qg(this,zd)),this._query.trim()?j4(this,zd,setTimeout(()=>li(this,On,S2).call(this),150)):this._results=[]};S2=async function(){const e=this._query.trim().toLowerCase();if(!e)return;const t=[],[n,i,r,s]=await Promise.all([_e.all(),Ie.all(),pe.all(),ke.all()]);for(const a of i)a.name.toLowerCase().includes(e)&&t.push({type:"merchant",id:a.id,label:a.name,href:`/merchants/${a.id}`});for(const a of r)a.name.toLowerCase().includes(e)&&t.push({type:"tag",id:a.id,label:a.name,href:"/tags"});for(const a of s)a.name.toLowerCase().includes(e)&&t.push({type:"account",id:a.id,label:a.name,href:`/accounts/${a.id}`});let o=0;for(const a of n){if(o>=5)break;a.description.toLowerCase().includes(e)&&(t.push({type:"transaction",id:a.id,label:a.description,detail:`${a.date} · ${a.amount.toFixed(2)}`,href:`/transactions/${a.id}`}),o++)}this._results=t};E2=function(e){e.key==="Escape"?li(this,On,Pf).call(this):e.key==="ArrowDown"?(e.preventDefault(),this._activeIndex=Math.min(this._activeIndex+1,this._results.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._activeIndex=Math.max(this._activeIndex-1,0)):e.key==="Enter"&&this._results[this._activeIndex]&&li(this,On,zv).call(this,this._results[this._activeIndex])};zv=function(e){li(this,On,Pf).call(this),wc(e.href)};M2=function(e){e.target===e.currentTarget&&li(this,On,Pf).call(this)};D2=function(){const e=new Map;for(const t of this._results){const n=e.get(t.type)??[];n.push(t),e.set(t.type,n)}return e};$2=function(e){return{merchant:"Merchants",tag:"Tags",account:"Accounts",transaction:"Transactions"}[e]??e};Lo.styles=dt`
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
  `;Wu([P()],Lo.prototype,"_open",2);Wu([P()],Lo.prototype,"_query",2);Wu([P()],Lo.prototype,"_results",2);Wu([P()],Lo.prototype,"_activeIndex",2);Lo=Wu([Et("budgee-global-search")],Lo);var B4=Object.defineProperty,W4=Object.getOwnPropertyDescriptor,T2=e=>{throw TypeError(e)},O2=(e,t,n,i)=>{for(var r=i>1?void 0:i?W4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&B4(t,n,r),r},I2=(e,t,n)=>t.has(e)||T2("Cannot "+n),po=(e,t,n)=>(I2(e,t,"read from private field"),n?n.call(e):t.get(e)),Bp=(e,t,n)=>t.has(e)?T2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),hb=(e,t,n)=>(I2(e,t,"access private method"),n),vo,Uh,Yh,Zg;let H4=0,jd=class extends mt{constructor(){super(...arguments),Bp(this,Yh),this._toasts=[],Bp(this,vo,new Map),Bp(this,Uh,e=>{const{message:t,type:n="info",duration:i=4e3}=e.detail,r=H4++;this._toasts=[...this._toasts,{id:r,message:t,type:n,dismissing:!1}],po(this,vo).set(r,setTimeout(()=>hb(this,Yh,Zg).call(this,r),i))})}connectedCallback(){super.connectedCallback(),document.addEventListener("budgee-toast",po(this,Uh))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-toast",po(this,Uh));for(const e of po(this,vo).values())clearTimeout(e);po(this,vo).clear()}render(){return E`
      <div aria-live="polite" aria-atomic="false">
        ${this._toasts.map(e=>E`
            <div class=${ov({toast:!0,[e.type]:!0,dismissing:e.dismissing})}>
              <span class="message">${e.message}</span>
              <button class="close" aria-label="Dismiss" @click=${()=>hb(this,Yh,Zg).call(this,e.id)}>
                ${ye(o2)}
              </button>
            </div>
          `)}
      </div>
    `}};vo=new WeakMap;Uh=new WeakMap;Yh=new WeakSet;Zg=function(e){const t=po(this,vo).get(e);t&&clearTimeout(t),po(this,vo).delete(e),this._toasts=this._toasts.map(n=>n.id===e?{...n,dismissing:!0}:n),setTimeout(()=>{this._toasts=this._toasts.filter(n=>n.id!==e)},200)};jd.styles=dt`
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
  `;O2([P()],jd.prototype,"_toasts",2);jd=O2([Et("budgee-toast-manager")],jd);const P2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,U4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Y4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,V4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,q4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,R2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,K4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;function Rf(e,t){const n=new Map;for(const i of e)for(const r of t(i)){if(r==null)continue;const s=n.get(r)??{count:0,total:0};s.count++,s.total+=i.amount,n.set(r,s)}return n}const i9=["chequing","savings","credit_card","investment"],G4={chequing:"Chequing",savings:"Savings",credit_card:"Credit Card",investment:"Investment"};function X4(e){return G4[e]}function Zo(e,t){let n;return()=>{clearTimeout(n),n=setTimeout(e,t)}}var Q4=Object.defineProperty,Z4=Object.getOwnPropertyDescriptor,Af=(e,t,n,i)=>{for(var r=i>1?void 0:i?Z4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Q4(t,n,r),r};let Za=class extends mt{constructor(){super(...arguments),this.icon="",this.heading="",this.description=""}render(){return E`
      ${this.icon?E`<div class="icon">${ye(this.icon)}</div>`:""}
      <h3>${this.heading}</h3>
      <p>${this.description}</p>
      <slot></slot>
    `}};Za.styles=dt`
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
  `;Af([H()],Za.prototype,"icon",2);Af([H()],Za.prototype,"heading",2);Af([H()],Za.prototype,"description",2);Za=Af([Et("budgee-empty-state")],Za);const pr=dt`
  input,
  select,
  textarea {
    background: var(--budgee-surface);
    color: var(--budgee-text);
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
  }
`;var J4=Object.defineProperty,tL=Object.getOwnPropertyDescriptor,A2=e=>{throw TypeError(e)},Jo=(e,t,n,i)=>{for(var r=i>1?void 0:i?tL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&J4(t,n,r),r},eL=(e,t,n)=>t.has(e)||A2("Cannot "+n),nL=(e,t,n)=>t.has(e)?A2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Di=(e,t,n)=>(eL(e,t,"access private method"),n),Gn,Ja,L2,N2,F2,z2,Jg;let Ur=class extends mt{constructor(){super(...arguments),nL(this,Gn),this.totalItems=0,this.defaultPageSize=10,this.storageKey="",this.filterable=!1,this._currentPage=1,this._pageSize=0,this._filterDebounce=null}connectedCallback(){if(super.connectedCallback(),this.storageKey)try{const e=localStorage.getItem(`budgee:pageSize:${this.storageKey}`);e&&(this._pageSize=Number(e))}catch{}}get _effectivePageSize(){return this._pageSize||this.defaultPageSize}get _totalPages(){return Math.max(1,Math.ceil(this.totalItems/this._effectivePageSize))}firstUpdated(){Di(this,Gn,Ja).call(this)}willUpdate(e){e.has("totalItems")&&(this._currentPage=1)}reset(){this._currentPage=1,Di(this,Gn,Ja).call(this)}render(){return E`
      ${Di(this,Gn,Jg).call(this)}
      <slot></slot>
      ${Di(this,Gn,Jg).call(this)}
    `}};Gn=new WeakSet;Ja=function(){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:this._currentPage,pageSize:this._effectivePageSize},bubbles:!0,composed:!0}))};L2=function(e){if(this._pageSize=Number(e.target.value),this._currentPage=1,this.storageKey)try{localStorage.setItem(`budgee:pageSize:${this.storageKey}`,String(this._pageSize))}catch{}Di(this,Gn,Ja).call(this)};N2=function(){this._currentPage>1&&(this._currentPage--,Di(this,Gn,Ja).call(this))};F2=function(){this._currentPage<this._totalPages&&(this._currentPage++,Di(this,Gn,Ja).call(this))};z2=function(e){const t=e.target.value;this._filterDebounce!==null&&clearTimeout(this._filterDebounce),this._filterDebounce=setTimeout(()=>{this._filterDebounce=null,this._currentPage=1,this.dispatchEvent(new CustomEvent("filter-change",{detail:{filter:t},bubbles:!0,composed:!0}))},200)};Jg=function(){const e=this._effectivePageSize,t=(this._currentPage-1)*e+1,n=Math.min(this._currentPage*e,this.totalItems);return E`
      <div class="pagination-bar">
        <div class="pagination-controls">
          ${this.filterable?E`<input
                class="filter-input"
                type="text"
                placeholder="Filter..."
                aria-label="Filter table"
                @input=${Di(this,Gn,z2)}
              />`:""}
          <label>
            Rows per page:
            <select @change=${Di(this,Gn,L2)}>
              ${[10,25,50,100].map(i=>E`<option value=${i} ?selected=${i===e}>${i}</option>`)}
            </select>
          </label>
        </div>
        <span>Showing ${t}–${n} of ${this.totalItems}</span>
        <div class="pagination-controls">
          <button class="secondary" aria-label="Previous page" ?disabled=${this._currentPage<=1} @click=${Di(this,Gn,N2)}>Prev</button>
          <button class="secondary" aria-label="Next page" ?disabled=${this._currentPage>=this._totalPages} @click=${Di(this,Gn,F2)}>Next</button>
        </div>
      </div>
    `};Ur.styles=[Li,pr,dt`
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
    `];Jo([H({type:Number})],Ur.prototype,"totalItems",2);Jo([H({type:Number})],Ur.prototype,"defaultPageSize",2);Jo([H()],Ur.prototype,"storageKey",2);Jo([H({type:Boolean})],Ur.prototype,"filterable",2);Jo([P()],Ur.prototype,"_currentPage",2);Jo([P()],Ur.prototype,"_pageSize",2);Ur=Jo([Et("paginated-table")],Ur);var iL=Object.defineProperty,rL=Object.getOwnPropertyDescriptor,jv=(e,t,n,i)=>{for(var r=i>1?void 0:i?rL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&iL(t,n,r),r};let uu=class extends mt{constructor(){super(...arguments),this.variant="table",this.rows=5}render(){const e=Array.from({length:this.rows});return this.variant==="table"?E`
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
    `}};uu.styles=dt`
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
  `;jv([H()],uu.prototype,"variant",2);jv([H({type:Number})],uu.prototype,"rows",2);uu=jv([Et("budgee-skeleton")],uu);const Jr=dt`
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
`;var sL=Object.defineProperty,oL=Object.getOwnPropertyDescriptor,j2=e=>{throw TypeError(e)},ta=(e,t,n,i)=>{for(var r=i>1?void 0:i?oL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&sL(t,n,r),r},Bv=(e,t,n)=>t.has(e)||j2("Cannot "+n),aL=(e,t,n)=>(Bv(e,t,"read from private field"),n?n.call(e):t.get(e)),db=(e,t,n)=>t.has(e)?j2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),fb=(e,t,n,i)=>(Bv(e,t,"write to private field"),t.set(e,n),n),Ye=(e,t,n)=>(Bv(e,t,"access private method"),n),tl,Me,tm,B2,W2,H2,U2,el,nl,Y2,V2;let Yr=class extends mt{constructor(){super(...arguments),db(this,Me),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",db(this,tl,[])}connectedCallback(){super.connectedCallback(),Ye(this,Me,tm).call(this);const e=Zo(()=>Ye(this,Me,tm).call(this),300);Promise.all([ke.subscribe(e),_e.subscribe(e)]).then(t=>{fb(this,tl,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of aL(this,tl))e.unsubscribe();fb(this,tl,[])}render(){if(this._rows===null)return E`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;if(this._rows.length===0)return E`
        <budgee-empty-state
          heading="No accounts yet"
          description="Accounts are created when you import transactions from a CSV."
        ></budgee-empty-state>
      `;const e=this._rows.filter(r=>Ye(this,Me,U2).call(this,r)),t=Ye(this,Me,Y2).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="accounts"
        ?filterable=${!0}
        @page-change=${Ye(this,Me,W2)}
        @filter-change=${Ye(this,Me,H2)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>Ye(this,Me,el).call(this,"name")}>
                Name${Ye(this,Me,nl).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>Ye(this,Me,el).call(this,"type")}>
                Type${Ye(this,Me,nl).call(this,"type")}
              </th>
              <th class="sortable" @click=${()=>Ye(this,Me,el).call(this,"count")}>
                Transactions${Ye(this,Me,nl).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>Ye(this,Me,el).call(this,"balance")}>
                Balance${Ye(this,Me,nl).call(this,"balance")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>E`
              <tr @click=${()=>Ye(this,Me,V2).call(this,r.account.id)}>
                <td>${r.account.name}</td>
                <td>${r.account.type?X4(r.account.type):""}</td>
                <td>${r.transactionCount??"…"}</td>
                <td class="col-amount ${r.balance!=null&&r.balance<0?"amount-negative":r.balance!=null?"amount-positive":""}">
                  ${r.balance!=null?r.balance.toFixed(2):"…"}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};tl=new WeakMap;Me=new WeakSet;tm=async function(){const e=await ke.all();this._rows=e.map(t=>({account:t,transactionCount:null,balance:null})),Ye(this,Me,B2).call(this)};B2=async function(){const e=await _e.all(),t=Rf(e,n=>[n.accountId]);this._rows=this._rows.map(n=>{const i=t.get(n.account.id);return{...n,transactionCount:i?.count??0,balance:i?.total??0}})};W2=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};H2=function(e){this._filter=e.detail.filter,this._currentPage=1};U2=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.account.name.toLowerCase().includes(t)||e.account.type?.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.balance!=null&&e.balance.toFixed(2).includes(t))};el=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};nl=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};Y2=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.account.name.localeCompare(r.account.name):t==="type"?s=(i.account.type??"").localeCompare(r.account.type??""):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="balance"&&(s=(i.balance??0)-(r.balance??0)),s*n})};V2=function(e){wc(`/accounts/${e}`)};Yr.styles=[Jr,dt`
      tbody tr {
        cursor: pointer;
      }
    `];ta([P()],Yr.prototype,"_rows",2);ta([P()],Yr.prototype,"_currentPage",2);ta([P()],Yr.prototype,"_pageSize",2);ta([P()],Yr.prototype,"_filter",2);ta([P()],Yr.prototype,"_sortCol",2);ta([P()],Yr.prototype,"_sortDir",2);Yr=ta([Et("account-list")],Yr);class v extends Array{constructor(t,n){if(super(t),this.sign=n,Object.setPrototypeOf(this,v.prototype),t>v.__kMaxLength)throw new RangeError("Maximum BigInt size exceeded")}static BigInt(t){var n=Math.floor,i=Number.isFinite;if(typeof t=="number"){if(t===0)return v.__zero();if(v.__isOneDigitInt(t))return 0>t?v.__oneDigit(-t,!0):v.__oneDigit(t,!1);if(!i(t)||n(t)!==t)throw new RangeError("The number "+t+" cannot be converted to BigInt because it is not an integer");return v.__fromDouble(t)}if(typeof t=="string"){const r=v.__fromString(t);if(r===null)throw new SyntaxError("Cannot convert "+t+" to a BigInt");return r}if(typeof t=="boolean")return t===!0?v.__oneDigit(1,!1):v.__zero();if(typeof t=="object"){if(t.constructor===v)return t;const r=v.__toPrimitive(t);return v.BigInt(r)}throw new TypeError("Cannot convert "+t+" to a BigInt")}toDebugString(){const t=["BigInt["];for(const n of this)t.push((n&&(n>>>0).toString(16))+", ");return t.push("]"),t.join("")}toString(t=10){if(2>t||36<t)throw new RangeError("toString() radix argument must be between 2 and 36");return this.length===0?"0":(t&t-1)==0?v.__toStringBasePowerOfTwo(this,t):v.__toStringGeneric(this,t,!1)}valueOf(){throw new Error("Convert JSBI instances to native numbers using `toNumber`.")}static toNumber(t){const n=t.length;if(n===0)return 0;if(n===1){const m=t.__unsignedDigit(0);return t.sign?-m:m}const i=t.__digit(n-1),r=v.__clz30(i),s=30*n-r;if(1024<s)return t.sign?-1/0:1/0;let o=s-1,a=i,c=n-1;const l=r+3;let u=l===32?0:a<<l;u>>>=12;const h=l-12;let d=12<=l?0:a<<20+l,f=20+l;for(0<h&&0<c&&(c--,a=t.__digit(c),u|=a>>>30-h,d=a<<h+2,f=h+2);0<f&&0<c;)c--,a=t.__digit(c),d|=30<=f?a<<f-30:a>>>30-f,f-=30;const p=v.__decideRounding(t,f,c,a);if((p===1||p===0&&(1&d)==1)&&(d=d+1>>>0,d===0&&(u++,u>>>20!=0&&(u=0,o++,1023<o))))return t.sign?-1/0:1/0;const g=t.sign?-2147483648:0;return o=o+1023<<20,v.__kBitConversionInts[v.__kBitConversionIntHigh]=g|o|u,v.__kBitConversionInts[v.__kBitConversionIntLow]=d,v.__kBitConversionDouble[0]}static unaryMinus(t){if(t.length===0)return t;const n=t.__copy();return n.sign=!t.sign,n}static bitwiseNot(t){return t.sign?v.__absoluteSubOne(t).__trim():v.__absoluteAddOne(t,!0)}static exponentiate(t,n){if(n.sign)throw new RangeError("Exponent must be positive");if(n.length===0)return v.__oneDigit(1,!1);if(t.length===0)return t;if(t.length===1&&t.__digit(0)===1)return t.sign&&(1&n.__digit(0))==0?v.unaryMinus(t):t;if(1<n.length)throw new RangeError("BigInt too big");let i=n.__unsignedDigit(0);if(i===1)return t;if(i>=v.__kMaxLengthBits)throw new RangeError("BigInt too big");if(t.length===1&&t.__digit(0)===2){const o=1+(0|i/30),a=t.sign&&(1&i)!=0,c=new v(o,a);c.__initializeDigits();const l=1<<i%30;return c.__setDigit(o-1,l),c}let r=null,s=t;for((1&i)!=0&&(r=t),i>>=1;i!==0;i>>=1)s=v.multiply(s,s),(1&i)!=0&&(r===null?r=s:r=v.multiply(r,s));return r}static multiply(t,n){if(t.length===0)return t;if(n.length===0)return n;let i=t.length+n.length;30<=t.__clzmsd()+n.__clzmsd()&&i--;const r=new v(i,t.sign!==n.sign);r.__initializeDigits();for(let s=0;s<t.length;s++)v.__multiplyAccumulate(n,t.__digit(s),r,s);return r.__trim()}static divide(t,n){if(n.length===0)throw new RangeError("Division by zero");if(0>v.__absoluteCompare(t,n))return v.__zero();const i=t.sign!==n.sign,r=n.__unsignedDigit(0);let s;if(n.length===1&&32767>=r){if(r===1)return i===t.sign?t:v.unaryMinus(t);s=v.__absoluteDivSmall(t,r,null)}else s=v.__absoluteDivLarge(t,n,!0,!1);return s.sign=i,s.__trim()}static remainder(t,n){if(n.length===0)throw new RangeError("Division by zero");if(0>v.__absoluteCompare(t,n))return t;const i=n.__unsignedDigit(0);if(n.length===1&&32767>=i){if(i===1)return v.__zero();const s=v.__absoluteModSmall(t,i);return s===0?v.__zero():v.__oneDigit(s,t.sign)}const r=v.__absoluteDivLarge(t,n,!1,!0);return r.sign=t.sign,r.__trim()}static add(t,n){const i=t.sign;return i===n.sign?v.__absoluteAdd(t,n,i):0<=v.__absoluteCompare(t,n)?v.__absoluteSub(t,n,i):v.__absoluteSub(n,t,!i)}static subtract(t,n){const i=t.sign;return i===n.sign?0<=v.__absoluteCompare(t,n)?v.__absoluteSub(t,n,i):v.__absoluteSub(n,t,!i):v.__absoluteAdd(t,n,i)}static leftShift(t,n){return n.length===0||t.length===0?t:n.sign?v.__rightShiftByAbsolute(t,n):v.__leftShiftByAbsolute(t,n)}static signedRightShift(t,n){return n.length===0||t.length===0?t:n.sign?v.__leftShiftByAbsolute(t,n):v.__rightShiftByAbsolute(t,n)}static unsignedRightShift(){throw new TypeError("BigInts have no unsigned right shift; use >> instead")}static lessThan(t,n){return 0>v.__compareToBigInt(t,n)}static lessThanOrEqual(t,n){return 0>=v.__compareToBigInt(t,n)}static greaterThan(t,n){return 0<v.__compareToBigInt(t,n)}static greaterThanOrEqual(t,n){return 0<=v.__compareToBigInt(t,n)}static equal(t,n){if(t.sign!==n.sign||t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t.__digit(i)!==n.__digit(i))return!1;return!0}static notEqual(t,n){return!v.equal(t,n)}static bitwiseAnd(t,n){var i=Math.max;if(!t.sign&&!n.sign)return v.__absoluteAnd(t,n).__trim();if(t.sign&&n.sign){const r=i(t.length,n.length)+1;let s=v.__absoluteSubOne(t,r);const o=v.__absoluteSubOne(n);return s=v.__absoluteOr(s,o,s),v.__absoluteAddOne(s,!0,s).__trim()}return t.sign&&([t,n]=[n,t]),v.__absoluteAndNot(t,v.__absoluteSubOne(n)).__trim()}static bitwiseXor(t,n){var i=Math.max;if(!t.sign&&!n.sign)return v.__absoluteXor(t,n).__trim();if(t.sign&&n.sign){const o=i(t.length,n.length),a=v.__absoluteSubOne(t,o),c=v.__absoluteSubOne(n);return v.__absoluteXor(a,c,a).__trim()}const r=i(t.length,n.length)+1;t.sign&&([t,n]=[n,t]);let s=v.__absoluteSubOne(n,r);return s=v.__absoluteXor(s,t,s),v.__absoluteAddOne(s,!0,s).__trim()}static bitwiseOr(t,n){var i=Math.max;const r=i(t.length,n.length);if(!t.sign&&!n.sign)return v.__absoluteOr(t,n).__trim();if(t.sign&&n.sign){let o=v.__absoluteSubOne(t,r);const a=v.__absoluteSubOne(n);return o=v.__absoluteAnd(o,a,o),v.__absoluteAddOne(o,!0,o).__trim()}t.sign&&([t,n]=[n,t]);let s=v.__absoluteSubOne(n,r);return s=v.__absoluteAndNot(s,t,s),v.__absoluteAddOne(s,!0,s).__trim()}static asIntN(t,n){var i=Math.floor;if(n.length===0)return n;if(t=i(t),0>t)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(t===0)return v.__zero();if(t>=v.__kMaxLengthBits)return n;const r=0|(t+29)/30;if(n.length<r)return n;const s=n.__unsignedDigit(r-1),o=1<<(t-1)%30;if(n.length===r&&s<o)return n;if((s&o)!==o)return v.__truncateToNBits(t,n);if(!n.sign)return v.__truncateAndSubFromPowerOfTwo(t,n,!0);if((s&o-1)==0){for(let a=r-2;0<=a;a--)if(n.__digit(a)!==0)return v.__truncateAndSubFromPowerOfTwo(t,n,!1);return n.length===r&&s===o?n:v.__truncateToNBits(t,n)}return v.__truncateAndSubFromPowerOfTwo(t,n,!1)}static asUintN(t,n){var i=Math.floor;if(n.length===0)return n;if(t=i(t),0>t)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(t===0)return v.__zero();if(n.sign){if(t>v.__kMaxLengthBits)throw new RangeError("BigInt too big");return v.__truncateAndSubFromPowerOfTwo(t,n,!1)}if(t>=v.__kMaxLengthBits)return n;const r=0|(t+29)/30;if(n.length<r)return n;const s=t%30;return n.length==r&&(s===0||!(n.__digit(r-1)>>>s))?n:v.__truncateToNBits(t,n)}static ADD(t,n){if(t=v.__toPrimitive(t),n=v.__toPrimitive(n),typeof t=="string")return typeof n!="string"&&(n=n.toString()),t+n;if(typeof n=="string")return t.toString()+n;if(t=v.__toNumeric(t),n=v.__toNumeric(n),v.__isBigInt(t)&&v.__isBigInt(n))return v.add(t,n);if(typeof t=="number"&&typeof n=="number")return t+n;throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")}static LT(t,n){return v.__compare(t,n,0)}static LE(t,n){return v.__compare(t,n,1)}static GT(t,n){return v.__compare(t,n,2)}static GE(t,n){return v.__compare(t,n,3)}static EQ(t,n){for(;;){if(v.__isBigInt(t))return v.__isBigInt(n)?v.equal(t,n):v.EQ(n,t);if(typeof t=="number"){if(v.__isBigInt(n))return v.__equalToNumber(n,t);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="string"){if(v.__isBigInt(n))return t=v.__fromString(t),t!==null&&v.equal(t,n);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="boolean"){if(v.__isBigInt(n))return v.__equalToNumber(n,+t);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="symbol"){if(v.__isBigInt(n))return!1;if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="object"){if(typeof n=="object"&&n.constructor!==v)return t==n;t=v.__toPrimitive(t)}else return t==n}}static NE(t,n){return!v.EQ(t,n)}static DataViewGetBigInt64(t,n,i=!1){return v.asIntN(64,v.DataViewGetBigUint64(t,n,i))}static DataViewGetBigUint64(t,n,i=!1){const[r,s]=i?[4,0]:[0,4],o=t.getUint32(n+r,i),a=t.getUint32(n+s,i),c=new v(3,!1);return c.__setDigit(0,1073741823&a),c.__setDigit(1,(268435455&o)<<2|a>>>30),c.__setDigit(2,o>>>28),c.__trim()}static DataViewSetBigInt64(t,n,i,r=!1){v.DataViewSetBigUint64(t,n,i,r)}static DataViewSetBigUint64(t,n,i,r=!1){i=v.asUintN(64,i);let s=0,o=0;if(0<i.length&&(o=i.__digit(0),1<i.length)){const l=i.__digit(1);o|=l<<30,s=l>>>2,2<i.length&&(s|=i.__digit(2)<<28)}const[a,c]=r?[4,0]:[0,4];t.setUint32(n+a,s,r),t.setUint32(n+c,o,r)}static __zero(){return new v(0,!1)}static __oneDigit(t,n){const i=new v(1,n);return i.__setDigit(0,t),i}__copy(){const t=new v(this.length,this.sign);for(let n=0;n<this.length;n++)t[n]=this[n];return t}__trim(){let t=this.length,n=this[t-1];for(;n===0;)t--,n=this[t-1],this.pop();return t===0&&(this.sign=!1),this}__initializeDigits(){for(let t=0;t<this.length;t++)this[t]=0}static __decideRounding(t,n,i,r){if(0<n)return-1;let s;if(0>n)s=-n-1;else{if(i===0)return-1;i--,r=t.__digit(i),s=29}let o=1<<s;if((r&o)==0)return-1;if(o-=1,(r&o)!=0)return 1;for(;0<i;)if(i--,t.__digit(i)!==0)return 1;return 0}static __fromDouble(t){v.__kBitConversionDouble[0]=t;const n=2047&v.__kBitConversionInts[v.__kBitConversionIntHigh]>>>20,i=n-1023,r=(0|i/30)+1,s=new v(r,0>t);let o=1048575&v.__kBitConversionInts[v.__kBitConversionIntHigh]|1048576,a=v.__kBitConversionInts[v.__kBitConversionIntLow];const c=20,l=i%30;let u,h=0;if(l<20){const d=c-l;h=d+32,u=o>>>d,o=o<<32-d|a>>>d,a<<=32-d}else if(l===20)h=32,u=o,o=a,a=0;else{const d=l-c;h=32-d,u=o<<d|a>>>32-d,o=a<<d,a=0}s.__setDigit(r-1,u);for(let d=r-2;0<=d;d--)0<h?(h-=30,u=o>>>2,o=o<<30|a>>>2,a<<=30):u=0,s.__setDigit(d,u);return s.__trim()}static __isWhitespace(t){return 13>=t&&9<=t||(159>=t?t==32:131071>=t?t==160||t==5760:196607>=t?(t&=131071,10>=t||t==40||t==41||t==47||t==95||t==4096):t==65279)}static __fromString(t,n=0){let i=0;const r=t.length;let s=0;if(s===r)return v.__zero();let o=t.charCodeAt(s);for(;v.__isWhitespace(o);){if(++s===r)return v.__zero();o=t.charCodeAt(s)}if(o===43){if(++s===r)return null;o=t.charCodeAt(s),i=1}else if(o===45){if(++s===r)return null;o=t.charCodeAt(s),i=-1}if(n===0){if(n=10,o===48){if(++s===r)return v.__zero();if(o=t.charCodeAt(s),o===88||o===120){if(n=16,++s===r)return null;o=t.charCodeAt(s)}else if(o===79||o===111){if(n=8,++s===r)return null;o=t.charCodeAt(s)}else if(o===66||o===98){if(n=2,++s===r)return null;o=t.charCodeAt(s)}}}else if(n===16&&o===48){if(++s===r)return v.__zero();if(o=t.charCodeAt(s),o===88||o===120){if(++s===r)return null;o=t.charCodeAt(s)}}if(i!=0&&n!==10)return null;for(;o===48;){if(++s===r)return v.__zero();o=t.charCodeAt(s)}const a=r-s;let c=v.__kMaxBitsPerChar[n],l=v.__kBitsPerCharTableMultiplier-1;if(a>1073741824/c)return null;const u=c*a+l>>>v.__kBitsPerCharTableShift,h=new v(0|(u+29)/30,!1),d=10>n?n:10,f=10<n?n-10:0;if((n&n-1)==0){c>>=v.__kBitsPerCharTableShift;const p=[],g=[];let m=!1;do{let b=0,_=0;for(;;){let C;if(o-48>>>0<d)C=o-48;else if((32|o)-97>>>0<f)C=(32|o)-87;else{m=!0;break}if(_+=c,b=b<<c|C,++s===r){m=!0;break}if(o=t.charCodeAt(s),30<_+c)break}p.push(b),g.push(_)}while(!m);v.__fillFromParts(h,p,g)}else{h.__initializeDigits();let p=!1,g=0;do{let m=0,b=1;for(;;){let C;if(o-48>>>0<d)C=o-48;else if((32|o)-97>>>0<f)C=(32|o)-87;else{p=!0;break}const S=b*n;if(1073741823<S)break;if(b=S,m=m*n+C,g++,++s===r){p=!0;break}o=t.charCodeAt(s)}l=30*v.__kBitsPerCharTableMultiplier-1;const _=0|(c*g+l>>>v.__kBitsPerCharTableShift)/30;h.__inplaceMultiplyAdd(b,m,_)}while(!p)}if(s!==r){if(!v.__isWhitespace(o))return null;for(s++;s<r;s++)if(o=t.charCodeAt(s),!v.__isWhitespace(o))return null}return h.sign=i==-1,h.__trim()}static __fillFromParts(t,n,i){let r=0,s=0,o=0;for(let a=n.length-1;0<=a;a--){const c=n[a],l=i[a];s|=c<<o,o+=l,o===30?(t.__setDigit(r++,s),o=0,s=0):30<o&&(t.__setDigit(r++,1073741823&s),o-=30,s=c>>>l-o)}if(s!==0){if(r>=t.length)throw new Error("implementation bug");t.__setDigit(r++,s)}for(;r<t.length;r++)t.__setDigit(r,0)}static __toStringBasePowerOfTwo(t,n){const i=t.length;let r=n-1;r=(85&r>>>1)+(85&r),r=(51&r>>>2)+(51&r),r=(15&r>>>4)+(15&r);const s=r,o=n-1,a=t.__digit(i-1),c=v.__clz30(a);let l=0|(30*i-c+s-1)/s;if(t.sign&&l++,268435456<l)throw new Error("string too long");const u=Array(l);let h=l-1,d=0,f=0;for(let g=0;g<i-1;g++){const m=t.__digit(g),b=(d|m<<f)&o;u[h--]=v.__kConversionChars[b];const _=s-f;for(d=m>>>_,f=30-_;f>=s;)u[h--]=v.__kConversionChars[d&o],d>>>=s,f-=s}const p=(d|a<<f)&o;for(u[h--]=v.__kConversionChars[p],d=a>>>s-f;d!==0;)u[h--]=v.__kConversionChars[d&o],d>>>=s;if(t.sign&&(u[h--]="-"),h!=-1)throw new Error("implementation bug");return u.join("")}static __toStringGeneric(t,n,i){const r=t.length;if(r===0)return"";if(r===1){let g=t.__unsignedDigit(0).toString(n);return i===!1&&t.sign&&(g="-"+g),g}const s=30*r-v.__clz30(t.__digit(r-1)),o=v.__kMaxBitsPerChar[n],a=o-1;let c=s*v.__kBitsPerCharTableMultiplier;c+=a-1,c=0|c/a;const l=c+1>>1,u=v.exponentiate(v.__oneDigit(n,!1),v.__oneDigit(l,!1));let h,d;const f=u.__unsignedDigit(0);if(u.length===1&&32767>=f){h=new v(t.length,!1),h.__initializeDigits();let g=0;for(let m=2*t.length-1;0<=m;m--){const b=g<<15|t.__halfDigit(m);h.__setHalfDigit(m,0|b/f),g=0|b%f}d=g.toString(n)}else{const g=v.__absoluteDivLarge(t,u,!0,!0);h=g.quotient;const m=g.remainder.__trim();d=v.__toStringGeneric(m,n,!0)}h.__trim();let p=v.__toStringGeneric(h,n,!0);for(;d.length<l;)d="0"+d;return i===!1&&t.sign&&(p="-"+p),p+d}static __unequalSign(t){return t?-1:1}static __absoluteGreater(t){return t?-1:1}static __absoluteLess(t){return t?1:-1}static __compareToBigInt(t,n){const i=t.sign;if(i!==n.sign)return v.__unequalSign(i);const r=v.__absoluteCompare(t,n);return 0<r?v.__absoluteGreater(i):0>r?v.__absoluteLess(i):0}static __compareToNumber(t,n){if(v.__isOneDigitInt(n)){const i=t.sign,r=0>n;if(i!==r)return v.__unequalSign(i);if(t.length===0){if(r)throw new Error("implementation bug");return n===0?0:-1}if(1<t.length)return v.__absoluteGreater(i);const s=Math.abs(n),o=t.__unsignedDigit(0);return o>s?v.__absoluteGreater(i):o<s?v.__absoluteLess(i):0}return v.__compareToDouble(t,n)}static __compareToDouble(t,n){if(n!==n)return n;if(n===1/0)return-1;if(n===-1/0)return 1;const i=t.sign;if(i!==0>n)return v.__unequalSign(i);if(n===0)throw new Error("implementation bug: should be handled elsewhere");if(t.length===0)return-1;v.__kBitConversionDouble[0]=n;const r=2047&v.__kBitConversionInts[v.__kBitConversionIntHigh]>>>20;if(r==2047)throw new Error("implementation bug: handled elsewhere");const s=r-1023;if(0>s)return v.__absoluteGreater(i);const o=t.length;let a=t.__digit(o-1);const c=v.__clz30(a),l=30*o-c,u=s+1;if(l<u)return v.__absoluteLess(i);if(l>u)return v.__absoluteGreater(i);let h=1048576|1048575&v.__kBitConversionInts[v.__kBitConversionIntHigh],d=v.__kBitConversionInts[v.__kBitConversionIntLow];const f=20,p=29-c;if(p!==(0|(l-1)%30))throw new Error("implementation bug");let g,m=0;if(20>p){const b=f-p;m=b+32,g=h>>>b,h=h<<32-b|d>>>b,d<<=32-b}else if(p===20)m=32,g=h,h=d,d=0;else{const b=p-f;m=32-b,g=h<<b|d>>>32-b,h=d<<b,d=0}if(a>>>=0,g>>>=0,a>g)return v.__absoluteGreater(i);if(a<g)return v.__absoluteLess(i);for(let b=o-2;0<=b;b--){0<m?(m-=30,g=h>>>2,h=h<<30|d>>>2,d<<=30):g=0;const _=t.__unsignedDigit(b);if(_>g)return v.__absoluteGreater(i);if(_<g)return v.__absoluteLess(i)}if(h!==0||d!==0){if(m===0)throw new Error("implementation bug");return v.__absoluteLess(i)}return 0}static __equalToNumber(t,n){var i=Math.abs;return v.__isOneDigitInt(n)?n===0?t.length===0:t.length===1&&t.sign===0>n&&t.__unsignedDigit(0)===i(n):v.__compareToDouble(t,n)===0}static __comparisonResultToBool(t,n){return n===0?0>t:n===1?0>=t:n===2?0<t:n===3?0<=t:void 0}static __compare(t,n,i){if(t=v.__toPrimitive(t),n=v.__toPrimitive(n),typeof t=="string"&&typeof n=="string")switch(i){case 0:return t<n;case 1:return t<=n;case 2:return t>n;case 3:return t>=n}if(v.__isBigInt(t)&&typeof n=="string")return n=v.__fromString(n),n!==null&&v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(typeof t=="string"&&v.__isBigInt(n))return t=v.__fromString(t),t!==null&&v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(t=v.__toNumeric(t),n=v.__toNumeric(n),v.__isBigInt(t)){if(v.__isBigInt(n))return v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(typeof n!="number")throw new Error("implementation bug");return v.__comparisonResultToBool(v.__compareToNumber(t,n),i)}if(typeof t!="number")throw new Error("implementation bug");if(v.__isBigInt(n))return v.__comparisonResultToBool(v.__compareToNumber(n,t),2^i);if(typeof n!="number")throw new Error("implementation bug");return i===0?t<n:i===1?t<=n:i===2?t>n:i===3?t>=n:void 0}__clzmsd(){return v.__clz30(this.__digit(this.length-1))}static __absoluteAdd(t,n,i){if(t.length<n.length)return v.__absoluteAdd(n,t,i);if(t.length===0)return t;if(n.length===0)return t.sign===i?t:v.unaryMinus(t);let r=t.length;(t.__clzmsd()===0||n.length===t.length&&n.__clzmsd()===0)&&r++;const s=new v(r,i);let o=0,a=0;for(;a<n.length;a++){const c=t.__digit(a)+n.__digit(a)+o;o=c>>>30,s.__setDigit(a,1073741823&c)}for(;a<t.length;a++){const c=t.__digit(a)+o;o=c>>>30,s.__setDigit(a,1073741823&c)}return a<s.length&&s.__setDigit(a,o),s.__trim()}static __absoluteSub(t,n,i){if(t.length===0)return t;if(n.length===0)return t.sign===i?t:v.unaryMinus(t);const r=new v(t.length,i);let s=0,o=0;for(;o<n.length;o++){const a=t.__digit(o)-n.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}for(;o<t.length;o++){const a=t.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}return r.__trim()}static __absoluteAddOne(t,n,i=null){const r=t.length;i===null?i=new v(r,n):i.sign=n;let s=1;for(let o=0;o<r;o++){const a=t.__digit(o)+s;s=a>>>30,i.__setDigit(o,1073741823&a)}return s!=0&&i.__setDigitGrow(r,1),i}static __absoluteSubOne(t,n){const i=t.length;n=n||i;const r=new v(n,!1);let s=1;for(let o=0;o<i;o++){const a=t.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}if(s!=0)throw new Error("implementation bug");for(let o=i;o<n;o++)r.__setDigit(o,0);return r}static __absoluteAnd(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=o;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)&n.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteAndNot(t,n,i=null){const r=t.length,s=n.length;let o=s;r<s&&(o=r);let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)&~n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteOr(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)|n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteXor(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)^n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteCompare(t,n){const i=t.length-n.length;if(i!=0)return i;let r=t.length-1;for(;0<=r&&t.__digit(r)===n.__digit(r);)r--;return 0>r?0:t.__unsignedDigit(r)>n.__unsignedDigit(r)?1:-1}static __multiplyAccumulate(t,n,i,r){if(n===0)return;const s=32767&n,o=n>>>15;let a=0,c=0;for(let l,u=0;u<t.length;u++,r++){l=i.__digit(r);const h=t.__digit(u),d=32767&h,f=h>>>15,p=v.__imul(d,s),g=v.__imul(d,o),m=v.__imul(f,s),b=v.__imul(f,o);l+=c+p+a,a=l>>>30,l&=1073741823,l+=((32767&g)<<15)+((32767&m)<<15),a+=l>>>30,c=b+(g>>>15)+(m>>>15),i.__setDigit(r,1073741823&l)}for(;a!=0||c!==0;r++){let l=i.__digit(r);l+=a+c,c=0,a=l>>>30,i.__setDigit(r,1073741823&l)}}static __internalMultiplyAdd(t,n,i,r,s){let o=i,a=0;for(let c=0;c<r;c++){const l=t.__digit(c),u=v.__imul(32767&l,n),h=v.__imul(l>>>15,n),d=u+((32767&h)<<15)+a+o;o=d>>>30,a=h>>>15,s.__setDigit(c,1073741823&d)}if(s.length>r)for(s.__setDigit(r++,o+a);r<s.length;)s.__setDigit(r++,0);else if(o+a!==0)throw new Error("implementation bug")}__inplaceMultiplyAdd(t,n,i){i>this.length&&(i=this.length);const r=32767&t,s=t>>>15;let o=0,a=n;for(let c=0;c<i;c++){const l=this.__digit(c),u=32767&l,h=l>>>15,d=v.__imul(u,r),f=v.__imul(u,s),p=v.__imul(h,r),g=v.__imul(h,s);let m=a+d+o;o=m>>>30,m&=1073741823,m+=((32767&f)<<15)+((32767&p)<<15),o+=m>>>30,a=g+(f>>>15)+(p>>>15),this.__setDigit(c,1073741823&m)}if(o!=0||a!==0)throw new Error("implementation bug")}static __absoluteDivSmall(t,n,i=null){i===null&&(i=new v(t.length,!1));let r=0;for(let s,o=2*t.length-1;0<=o;o-=2){s=(r<<15|t.__halfDigit(o))>>>0;const a=0|s/n;r=0|s%n,s=(r<<15|t.__halfDigit(o-1))>>>0;const c=0|s/n;r=0|s%n,i.__setDigit(o>>>1,a<<15|c)}return i}static __absoluteModSmall(t,n){let i=0;for(let r=2*t.length-1;0<=r;r--)i=0|((i<<15|t.__halfDigit(r))>>>0)%n;return i}static __absoluteDivLarge(t,n,i,r){const s=n.__halfDigitLength(),o=n.length,a=t.__halfDigitLength()-s;let c=null;i&&(c=new v(a+2>>>1,!1),c.__initializeDigits());const l=new v(s+2>>>1,!1);l.__initializeDigits();const u=v.__clz15(n.__halfDigit(s-1));0<u&&(n=v.__specialLeftShift(n,u,0));const h=v.__specialLeftShift(t,u,1),d=n.__halfDigit(s-1);let f=0;for(let p,g=a;0<=g;g--){p=32767;const m=h.__halfDigit(g+s);if(m!==d){const _=(m<<15|h.__halfDigit(g+s-1))>>>0;p=0|_/d;let C=0|_%d;const S=n.__halfDigit(s-2),k=h.__halfDigit(g+s-2);for(;v.__imul(p,S)>>>0>(C<<16|k)>>>0&&(p--,C+=d,!(32767<C)););}v.__internalMultiplyAdd(n,p,0,o,l);let b=h.__inplaceSub(l,g,s+1);b!==0&&(b=h.__inplaceAdd(n,g,s),h.__setHalfDigit(g+s,32767&h.__halfDigit(g+s)+b),p--),i&&(1&g?f=p<<15:c.__setDigit(g>>>1,f|p))}if(r)return h.__inplaceRightShift(u),i?{quotient:c,remainder:h}:h;if(i)return c;throw new Error("unreachable")}static __clz15(t){return v.__clz30(t)-15}__inplaceAdd(t,n,i){let r=0;for(let s=0;s<i;s++){const o=this.__halfDigit(n+s)+t.__halfDigit(s)+r;r=o>>>15,this.__setHalfDigit(n+s,32767&o)}return r}__inplaceSub(t,n,i){let r=0;if(1&n){n>>=1;let s=this.__digit(n),o=32767&s,a=0;for(;a<i-1>>>1;a++){const u=t.__digit(a),h=(s>>>15)-(32767&u)-r;r=1&h>>>15,this.__setDigit(n+a,(32767&h)<<15|32767&o),s=this.__digit(n+a+1),o=(32767&s)-(u>>>15)-r,r=1&o>>>15}const c=t.__digit(a),l=(s>>>15)-(32767&c)-r;if(r=1&l>>>15,this.__setDigit(n+a,(32767&l)<<15|32767&o),n+a+1>=this.length)throw new RangeError("out of bounds");(1&i)==0&&(s=this.__digit(n+a+1),o=(32767&s)-(c>>>15)-r,r=1&o>>>15,this.__setDigit(n+t.length,1073709056&s|32767&o))}else{n>>=1;let s=0;for(;s<t.length-1;s++){const u=this.__digit(n+s),h=t.__digit(s),d=(32767&u)-(32767&h)-r;r=1&d>>>15;const f=(u>>>15)-(h>>>15)-r;r=1&f>>>15,this.__setDigit(n+s,(32767&f)<<15|32767&d)}const o=this.__digit(n+s),a=t.__digit(s),c=(32767&o)-(32767&a)-r;r=1&c>>>15;let l=0;(1&i)==0&&(l=(o>>>15)-(a>>>15)-r,r=1&l>>>15),this.__setDigit(n+s,(32767&l)<<15|32767&c)}return r}__inplaceRightShift(t){if(t===0)return;let n=this.__digit(0)>>>t;const i=this.length-1;for(let r=0;r<i;r++){const s=this.__digit(r+1);this.__setDigit(r,1073741823&s<<30-t|n),n=s>>>t}this.__setDigit(i,n)}static __specialLeftShift(t,n,i){const r=t.length,s=new v(r+i,!1);if(n===0){for(let a=0;a<r;a++)s.__setDigit(a,t.__digit(a));return 0<i&&s.__setDigit(r,0),s}let o=0;for(let a=0;a<r;a++){const c=t.__digit(a);s.__setDigit(a,1073741823&c<<n|o),o=c>>>30-n}return 0<i&&s.__setDigit(r,o),s}static __leftShiftByAbsolute(t,n){const i=v.__toShiftAmount(n);if(0>i)throw new RangeError("BigInt too big");const r=0|i/30,s=i%30,o=t.length,a=s!==0&&t.__digit(o-1)>>>30-s!=0,c=o+r+(a?1:0),l=new v(c,t.sign);if(s===0){let u=0;for(;u<r;u++)l.__setDigit(u,0);for(;u<c;u++)l.__setDigit(u,t.__digit(u-r))}else{let u=0;for(let h=0;h<r;h++)l.__setDigit(h,0);for(let h=0;h<o;h++){const d=t.__digit(h);l.__setDigit(h+r,1073741823&d<<s|u),u=d>>>30-s}if(a)l.__setDigit(o+r,u);else if(u!==0)throw new Error("implementation bug")}return l.__trim()}static __rightShiftByAbsolute(t,n){const i=t.length,r=t.sign,s=v.__toShiftAmount(n);if(0>s)return v.__rightShiftByMaximum(r);const o=0|s/30,a=s%30;let c=i-o;if(0>=c)return v.__rightShiftByMaximum(r);let l=!1;if(r){if((t.__digit(o)&(1<<a)-1)!=0)l=!0;else for(let h=0;h<o;h++)if(t.__digit(h)!==0){l=!0;break}}l&&a===0&&~t.__digit(i-1)==0&&c++;let u=new v(c,r);if(a===0){u.__setDigit(c-1,0);for(let h=o;h<i;h++)u.__setDigit(h-o,t.__digit(h))}else{let h=t.__digit(o)>>>a;const d=i-o-1;for(let f=0;f<d;f++){const p=t.__digit(f+o+1);u.__setDigit(f,1073741823&p<<30-a|h),h=p>>>a}u.__setDigit(d,h)}return l&&(u=v.__absoluteAddOne(u,!0,u)),u.__trim()}static __rightShiftByMaximum(t){return t?v.__oneDigit(1,!0):v.__zero()}static __toShiftAmount(t){if(1<t.length)return-1;const n=t.__unsignedDigit(0);return n>v.__kMaxLengthBits?-1:n}static __toPrimitive(t,n="default"){if(typeof t!="object"||t.constructor===v)return t;if(typeof Symbol<"u"&&typeof Symbol.toPrimitive=="symbol"&&t[Symbol.toPrimitive]){const s=t[Symbol.toPrimitive](n);if(typeof s!="object")return s;throw new TypeError("Cannot convert object to primitive value")}const i=t.valueOf;if(i){const s=i.call(t);if(typeof s!="object")return s}const r=t.toString;if(r){const s=r.call(t);if(typeof s!="object")return s}throw new TypeError("Cannot convert object to primitive value")}static __toNumeric(t){return v.__isBigInt(t)?t:+t}static __isBigInt(t){return typeof t=="object"&&t!==null&&t.constructor===v}static __truncateToNBits(t,n){const i=0|(t+29)/30,r=new v(i,n.sign),s=i-1;for(let a=0;a<s;a++)r.__setDigit(a,n.__digit(a));let o=n.__digit(s);if(t%30!=0){const a=32-t%30;o=o<<a>>>a}return r.__setDigit(s,o),r.__trim()}static __truncateAndSubFromPowerOfTwo(t,n,i){var r=Math.min;const s=0|(t+29)/30,o=new v(s,i);let a=0;const c=s-1;let l=0;for(const f=r(c,n.length);a<f;a++){const p=0-n.__digit(a)-l;l=1&p>>>30,o.__setDigit(a,1073741823&p)}for(;a<c;a++)o.__setDigit(a,0|1073741823&-l);let u=c<n.length?n.__digit(c):0;const h=t%30;let d;if(h==0)d=0-u-l,d&=1073741823;else{const f=32-h;u=u<<f>>>f;const p=1<<32-f;d=p-u-l,d&=p-1}return o.__setDigit(c,d),o.__trim()}__digit(t){return this[t]}__unsignedDigit(t){return this[t]>>>0}__setDigit(t,n){this[t]=0|n}__setDigitGrow(t,n){this[t]=0|n}__halfDigitLength(){const t=this.length;return 32767>=this.__unsignedDigit(t-1)?2*t-1:2*t}__halfDigit(t){return 32767&this[t>>>1]>>>15*(1&t)}__setHalfDigit(t,n){const i=t>>>1,r=this.__digit(i),s=1&t?32767&r|n<<15:1073709056&r|32767&n;this.__setDigit(i,s)}static __digitPow(t,n){let i=1;for(;0<n;)1&n&&(i*=t),n>>>=1,t*=t;return i}static __detectBigEndian(){return v.__kBitConversionDouble[0]=-0,v.__kBitConversionInts[0]!==0}static __isOneDigitInt(t){return(1073741823&t)===t}}v.__kMaxLength=33554432,v.__kMaxLengthBits=v.__kMaxLength<<5,v.__kMaxBitsPerChar=[0,0,32,51,64,75,83,90,96,102,107,111,115,119,122,126,128,131,134,136,139,141,143,145,147,149,151,153,154,156,158,159,160,162,163,165,166],v.__kBitsPerCharTableShift=5,v.__kBitsPerCharTableMultiplier=1<<v.__kBitsPerCharTableShift,v.__kConversionChars=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],v.__kBitConversionBuffer=new ArrayBuffer(8),v.__kBitConversionDouble=new Float64Array(v.__kBitConversionBuffer),v.__kBitConversionInts=new Int32Array(v.__kBitConversionBuffer),v.__kBitConversionIntHigh=v.__detectBigEndian()?0:1,v.__kBitConversionIntLow=v.__detectBigEndian()?1:0,v.__clz30=Math.clz32?function(e){return Math.clz32(e)-2}:function(e){return e===0?30:0|29-(0|Math.log(e>>>0)/Math.LN2)},v.__imul=Math.imul||function(e,t){return 0|e*t};const Xn=v.BigInt(0),hu=v.BigInt(1),Wv=v.BigInt(2),cL=v.BigInt(10),lL=v.BigInt(24),uL=v.BigInt(60),hL=v.BigInt(1e3),Hu=v.BigInt(1e6),Rl=v.BigInt(1e9),q2=v.multiply(v.BigInt(3600),Rl),dL=v.multiply(uL,Rl),Rs=v.multiply(q2,lL);function kr(e){return typeof e=="bigint"?v.BigInt(e.toString(10)):e}function K2(e){return v.equal(v.remainder(e,Wv),Xn)}function ao(e){return v.lessThan(e,Xn)?v.unaryMinus(e):e}function Bd(e,t){return v.lessThan(e,t)?-1:v.greaterThan(e,t)?1:0}function il(e,t){return{quotient:v.divide(e,t),remainder:v.remainder(e,t)}}var pb,gb;const it="slot-epochNanoSeconds",rt="slot-iso-date",Ut="slot-iso-date-time",ie="slot-time",A="slot-calendar",G2="slot-date-brand",X2="slot-year-month-brand",Q2="slot-month-day-brand",Tt="slot-time-zone",cn="slot-years",ln="slot-months",In="slot-weeks",un="slot-days",hn="slot-hours",dn="slot-minutes",fn="slot-seconds",pn="slot-milliseconds",gn="slot-microseconds",Pn="slot-nanoseconds",Z2="date",J2="ym",tC="md",eC="time",nC="datetime",iC="instant",ea="original",_a="timezone-canonical",em="timezone-original",rl="calendar-id",rC="locale",nm="options",sC=new WeakMap,im=Symbol.for("@@Temporal__GetSlots");(pb=globalThis)[im]||(pb[im]=function(e){return sC.get(e)});const Lf=globalThis[im],rm=Symbol.for("@@Temporal__CreateSlots");(gb=globalThis)[rm]||(gb[rm]=function(e){sC.set(e,Object.create(null))});const ts=globalThis[rm];function xn(e,...t){if(!e||typeof e!="object")return!1;const n=Lf(e);return!!n&&t.every((i=>i in n))}function y(e,t){const n=Lf(e)?.[t];if(n===void 0)throw new TypeError(`Missing internal slot ${t}`);return n}function ht(e,t,n){const i=Lf(e);if(i===void 0)throw new TypeError("Missing slots for the given container");if(i[t])throw new TypeError(`${t} already has set`);i[t]=n}const sm={};function es(e,t){Object.defineProperty(e.prototype,Symbol.toStringTag,{value:t,writable:!1,enumerable:!1,configurable:!0});const n=Object.getOwnPropertyNames(e);for(let r=0;r<n.length;r++){const s=n[r],o=Object.getOwnPropertyDescriptor(e,s);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e,s,o))}const i=Object.getOwnPropertyNames(e.prototype);for(let r=0;r<i.length;r++){const s=i[r],o=Object.getOwnPropertyDescriptor(e.prototype,s);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e.prototype,s,o))}om(t,e),om(`${t}.prototype`,e.prototype)}function om(e,t){const n=`%${e}%`;if(sm[n]!==void 0)throw new Error(`intrinsic ${e} already exists`);sm[n]=t}function je(e){return sm[e]}function Da(e,t){let n=e;if(n===0)return{div:n,mod:n};const i=Math.sign(n);n=Math.abs(n);const r=Math.trunc(1+Math.log10(n));if(t>=r)return{div:0*i,mod:i*n};if(t===0)return{div:i*n,mod:0*i};const s=n.toPrecision(r);return{div:i*Number.parseInt(s.slice(0,r-t),10),mod:i*Number.parseInt(s.slice(r-t),10)}}function Wp(e,t,n){let i=e,r=n;if(i===0)return r;const s=Math.sign(i)||Math.sign(r);i=Math.abs(i),r=Math.abs(r);const o=i.toPrecision(Math.trunc(1+Math.log10(i)));if(r===0)return s*Number.parseInt(o+"0".repeat(t),10);const a=o+r.toPrecision(Math.trunc(1+Math.log10(r))).padStart(t,"0");return s*Number.parseInt(a,10)}function Nf(e,t){const n=t==="negative";switch(e){case"ceil":return n?"zero":"infinity";case"floor":return n?"infinity":"zero";case"expand":return"infinity";case"trunc":return"zero";case"halfCeil":return n?"half-zero":"half-infinity";case"halfFloor":return n?"half-infinity":"half-zero";case"halfExpand":return"half-infinity";case"halfTrunc":return"half-zero";case"halfEven":return"half-even"}}function Ff(e,t,n,i,r){return r==="zero"?e:r==="infinity"?t:n<0?e:n>0?t:r==="half-zero"?e:r==="half-infinity"?t:i?e:t}class pt{constructor(t){this.totalNs=kr(t),this.sec=v.toNumber(v.divide(this.totalNs,Rl)),this.subsec=v.toNumber(v.remainder(this.totalNs,Rl))}static validateNew(t,n){if(v.greaterThan(ao(t),pt.MAX))throw new RangeError(`${n} of duration time units cannot exceed ${pt.MAX} s`);return new pt(t)}static fromEpochNsDiff(t,n){const i=v.subtract(kr(t),kr(n));return new pt(i)}static fromComponents(t,n,i,r,s,o){const a=v.add(v.add(v.add(v.add(v.add(v.BigInt(o),v.multiply(v.BigInt(s),hL)),v.multiply(v.BigInt(r),Hu)),v.multiply(v.BigInt(i),Rl)),v.multiply(v.BigInt(n),dL)),v.multiply(v.BigInt(t),q2));return pt.validateNew(a,"total")}abs(){return new pt(ao(this.totalNs))}add(t){return pt.validateNew(v.add(this.totalNs,t.totalNs),"sum")}add24HourDays(t){return pt.validateNew(v.add(this.totalNs,v.multiply(v.BigInt(t),Rs)),"sum")}addToEpochNs(t){return v.add(kr(t),this.totalNs)}cmp(t){return Bd(this.totalNs,t.totalNs)}divmod(t){const{quotient:n,remainder:i}=il(this.totalNs,v.BigInt(t));return{quotient:v.toNumber(n),remainder:new pt(i)}}fdiv(t){const n=kr(t),i=v.BigInt(n);let{quotient:r,remainder:s}=il(this.totalNs,i);const o=[];let a;const c=(v.lessThan(this.totalNs,Xn)?-1:1)*Math.sign(v.toNumber(n));for(;!v.equal(s,Xn)&&o.length<50;)s=v.multiply(s,cL),{quotient:a,remainder:s}=il(s,i),o.push(Math.abs(v.toNumber(a)));return c*+(ao(r).toString()+"."+o.join(""))}isZero(){return v.equal(this.totalNs,Xn)}round(t,n){const i=kr(t);if(v.equal(i,hu))return this;const{quotient:r,remainder:s}=il(this.totalNs,i),o=v.lessThan(this.totalNs,Xn)?"negative":"positive",a=v.multiply(ao(r),i),c=v.add(a,i),l=Bd(ao(v.multiply(s,Wv)),i),u=Nf(n,o),h=v.equal(ao(this.totalNs),a)?a:Ff(a,c,l,K2(r),u),d=o==="positive"?h:v.unaryMinus(h);return pt.validateNew(d,"rounding")}sign(){return this.cmp(new pt(Xn))}subtract(t){return pt.validateNew(v.subtract(this.totalNs,t.totalNs),"difference")}}pt.MAX=v.BigInt("9007199254740991999999999"),pt.ZERO=new pt(Xn);const mb=/[A-Za-z._][A-Za-z._0-9+-]*/,Uu=new RegExp(`(?:${/(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/.source}|(?:${mb.source})(?:\\/(?:${mb.source}))*)`),oC=/(?:[+-]\d{6}|\d{4})/,Wd=/(?:0[1-9]|1[0-2])/,am=/(?:0[1-9]|[12]\d|3[01])/,fL=new RegExp(`(${oC.source})(?:-(${Wd.source})-(${am.source})|(${Wd.source})(${am.source}))`),aC=/(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/,cC=/((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/,lC=new RegExp(`([zZ])|${cC.source}?`),tc=/\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g,pL=new RegExp([`^${fL.source}`,`(?:(?:[tT]|\\s+)${aC.source}(?:${lC.source})?)?`,`(?:\\[!?(${Uu.source})\\])?`,`((?:${tc.source})*)$`].join("")),gL=new RegExp([`^[tT]?${aC.source}`,`(?:${lC.source})?`,`(?:\\[!?${Uu.source}\\])?`,`((?:${tc.source})*)$`].join("")),mL=new RegExp(`^(${oC.source})-?(${Wd.source})(?:\\[!?${Uu.source}\\])?((?:${tc.source})*)$`),vL=new RegExp(`^(?:--)?(${Wd.source})-?(${am.source})(?:\\[!?${Uu.source}\\])?((?:${tc.source})*)$`),Hp=/(\d+)(?:[.,](\d{1,9}))?/,yL=new RegExp(`(?:${Hp.source}H)?(?:${Hp.source}M)?(?:${Hp.source}S)?`),bL=new RegExp(`^([+-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${yL.source})?$`,"i"),As=864e5,Hd=1e6*As,_L=6e10,uC=1e8*As,ec=Xi(uC),du=v.unaryMinus(ec),wL=v.add(v.subtract(du,Rs),hu),xL=v.subtract(v.add(ec,Rs),hu),CL=146097*As,vb=-271821,yb=275760,Al=Date.UTC(1847,0,1),kL=["iso8601","hebrew","islamic","islamic-umalqura","islamic-tbla","islamic-civil","islamic-rgsa","islamicc","persian","ethiopic","ethioaa","ethiopic-amete-alem","coptic","chinese","dangi","roc","indian","buddhist","japanese","gregory"],SL=new Set(["ACT","AET","AGT","ART","AST","BET","BST","CAT","CNT","CST","CTT","EAT","ECT","IET","IST","JST","MIT","NET","NST","PLT","PNT","PRT","PST","SST","VST"]);function re(e){return typeof e=="object"&&e!==null||typeof e=="function"}function zf(e){if(typeof e=="bigint")throw new TypeError("Cannot convert BigInt to number");return Number(e)}function jf(e){if(typeof e=="symbol")throw new TypeError("Cannot convert a Symbol value to a String");return String(e)}function st(e){const t=zf(e);if(t===0)return 0;if(Number.isNaN(t)||t===1/0||t===-1/0)throw new RangeError("invalid number value");const n=Math.trunc(t);return n===0?0:n}function bb(e,t){const n=st(e);if(n<=0)throw t!==void 0?new RangeError(`property '${t}' cannot be a a number less than one`):new RangeError("Cannot convert a number less than one to a positive integer");return n}function Ei(e){const t=zf(e);if(Number.isNaN(t))throw new RangeError("not a number");if(t===1/0||t===-1/0)throw new RangeError("infinity is out of range");if(!(function(n){if(typeof n!="number"||Number.isNaN(n)||n===1/0||n===-1/0)return!1;const i=Math.abs(n);return Math.floor(i)===i})(t))throw new RangeError(`unsupported fractional value ${e}`);return t===0?0:t}function fu(e,t){return String(e).padStart(t,"0")}function Se(e){if(typeof e!="string")throw new TypeError(`expected a string, not ${String(e)}`);return e}function cm(e,t){if(re(e)){const n=e?.toString();if(typeof n=="string"||typeof n=="number")return n;throw new TypeError("Cannot convert object to primitive value")}return e}const lm=["era","eraYear","year","month","monthCode","day","hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],EL={era:jf,eraYear:st,year:st,month:bb,monthCode:function(e){const t=Se(cm(e));if(t.length<3||t.length>4||t[0]!=="M"||"0123456789".indexOf(t[1])===-1||"0123456789".indexOf(t[2])===-1||t[1]+t[2]==="00"&&t[3]!=="L"||t[3]!=="L"&&t[3]!==void 0)throw new RangeError(`bad month code ${t}; must match M01-M99 or M00L-M99L`);return t},day:bb,hour:st,minute:st,second:st,millisecond:st,microsecond:st,nanosecond:st,offset:function(e){const t=Se(cm(e));return Sc(t),t},timeZone:yn},ML={hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},nc=[["years","year","date"],["months","month","date"],["weeks","week","date"],["days","day","date"],["hours","hour","time"],["minutes","minute","time"],["seconds","second","time"],["milliseconds","millisecond","time"],["microseconds","microsecond","time"],["nanoseconds","nanosecond","time"]],_b=Object.fromEntries(nc.map((e=>[e[0],e[1]]))),DL=Object.fromEntries(nc.map((([e,t])=>[t,e]))),Ll=nc.map((([,e])=>e)),ic={day:Hd,hour:36e11,minute:6e10,second:1e9,millisecond:1e6,microsecond:1e3,nanosecond:1},Ud=["days","hours","microseconds","milliseconds","minutes","months","nanoseconds","seconds","weeks","years"],$L=Intl.DateTimeFormat,wb=new Map;function hC(e){const t=yu(e);let n=wb.get(t);return n===void 0&&(n=new $L("en-us",{timeZone:t,hour12:!1,era:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}),wb.set(t,n)),n}function Ae(e){return xn(e,it)&&!xn(e,Tt,A)}function te(e){return xn(e,cn,ln,un,hn,dn,fn,pn,gn,Pn)}function ne(e){return xn(e,G2)}function ce(e){return xn(e,ie)}function jt(e){return xn(e,Ut)}function Le(e){return xn(e,X2)}function Kn(e){return xn(e,Q2)}function ft(e){return xn(e,it,Tt,A)}function I(e,t){if(!t(e))throw new TypeError("invalid receiver: method called with the wrong type of this-object")}function xc(e){if(xn(e,A)||xn(e,Tt))throw new TypeError("with() does not support a calendar or timeZone property");if(ce(e))throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");if(e.calendar!==void 0)throw new TypeError("with() does not support a calendar property");if(e.timeZone!==void 0)throw new TypeError("with() does not support a timeZone property")}function Yu(e,t){return t==="never"||t==="auto"&&e==="iso8601"?"":`[${t==="critical"?"!":""}u-ca=${e}]`}function Bf(e){let t,n,i=!1;for(tc.lastIndex=0;n=tc.exec(e);){const{1:r,2:s,3:o}=n;if(s==="u-ca"){if(t===void 0)t=o,i=r==="!";else if(r==="!"||i)throw new RangeError(`Invalid annotations in ${e}: more than one u-ca present with critical flag`)}else if(r==="!")throw new RangeError(`Unrecognized annotation: !${s}=${o}`)}return t}function gr(e){const t=pL.exec(e);if(!t)throw new RangeError(`invalid RFC 9557 string: ${e}`);const n=Bf(t[16]);let i=t[1];if(i==="-000000")throw new RangeError(`invalid RFC 9557 string: ${e}`);const r=+i,s=+(t[2]??t[4]??1),o=+(t[3]??t[5]??1),a=t[6]!==void 0,c=+(t[6]??0),l=+(t[7]??t[10]??0);let u=+(t[8]??t[11]??0);u===60&&(u=59);const h=(t[9]??t[12]??"")+"000000000",d=+h.slice(0,3),f=+h.slice(3,6),p=+h.slice(6,9);let g,m=!1;t[13]?(g=void 0,m=!0):t[14]&&(g=t[14]);const b=t[15];return Kv(r,s,o,c,l,u,d,f,p),{year:r,month:s,day:o,time:a?{hour:c,minute:l,second:u,millisecond:d,microsecond:f,nanosecond:p}:"start-of-day",tzAnnotation:b,offset:g,z:m,calendar:n}}function dC(e){const t=gL.exec(e);let n,i,r,s,o,a,c;if(t){c=Bf(t[10]),n=+(t[1]??0),i=+(t[2]??t[5]??0),r=+(t[3]??t[6]??0),r===60&&(r=59);const l=(t[4]??t[7]??"")+"000000000";if(s=+l.slice(0,3),o=+l.slice(3,6),a=+l.slice(6,9),t[8])throw new RangeError("Z designator not supported for PlainTime")}else{let l,u;if({time:l,z:u,calendar:c}=gr(e),l==="start-of-day")throw new RangeError(`time is missing in string: ${e}`);if(u)throw new RangeError("Z designator not supported for PlainTime");({hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a}=l)}if(Yf(n,i,r,s,o,a),/[tT ][0-9][0-9]/.test(e))return{hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a,calendar:c};try{const{month:l,day:u}=Uv(e);Fo(1972,l,u)}catch{try{const{year:l,month:u}=Hv(e);Fo(l,u,1)}catch{return{hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a,calendar:c}}}throw new RangeError(`invalid RFC 9557 time-only string ${e}; may need a T prefix`)}function Hv(e){const t=mL.exec(e);let n,i,r,s;if(t){r=Bf(t[3]);let o=t[1];if(o==="-000000")throw new RangeError(`invalid RFC 9557 string: ${e}`);if(n=+o,i=+t[2],s=1,r!==void 0&&r!=="iso8601")throw new RangeError("YYYY-MM format is only valid with iso8601 calendar")}else{let o;if({year:n,month:i,calendar:r,day:s,z:o}=gr(e),o)throw new RangeError("Z designator not supported for PlainYearMonth")}return{year:n,month:i,calendar:r,referenceISODay:s}}function Uv(e){const t=vL.exec(e);let n,i,r,s;if(t){if(r=Bf(t[3]),n=+t[1],i=+t[2],r!==void 0&&r!=="iso8601")throw new RangeError("MM-DD format is only valid with iso8601 calendar")}else{let o;if({month:n,day:i,calendar:r,year:s,z:o}=gr(e),o)throw new RangeError("Z designator not supported for PlainMonthDay")}return{month:n,day:i,calendar:r,referenceISOYear:s}}const fC=new RegExp(`^${Uu.source}$`,"i"),pC=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/.source}$`);function gC(e){const t=OL.test(e)?"Seconds not allowed in offset time zone":"Invalid time zone";throw new RangeError(`${t}: ${e}`)}function $s(e){return fC.test(e)||gC(e),pC.test(e)?{offsetMinutes:Sc(e)/6e10}:{tzName:e}}function Nl(e,t,n,i){let r=e,s=t,o=n;switch(i){case"reject":Fo(r,s,o);break;case"constrain":({year:r,month:s,day:o}=IC(r,s,o))}return{year:r,month:s,day:o}}function Wf(e,t,n,i,r,s,o){let a=e,c=t,l=n,u=i,h=r,d=s;switch(o){case"reject":Yf(a,c,l,u,h,d);break;case"constrain":a=mn(a,0,23),c=mn(c,0,59),l=mn(l,0,59),u=mn(u,0,999),h=mn(h,0,999),d=mn(d,0,999)}return{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}function mC(e){if(!re(e))throw new TypeError("invalid duration-like");const t={years:void 0,months:void 0,weeks:void 0,days:void 0,hours:void 0,minutes:void 0,seconds:void 0,milliseconds:void 0,microseconds:void 0,nanoseconds:void 0};let n=!1;for(let i=0;i<Ud.length;i++){const r=Ud[i],s=e[r];s!==void 0&&(n=!0,t[r]=Ei(s))}if(!n)throw new TypeError("invalid duration-like");return t}function Xe({years:e,months:t,weeks:n,days:i},r,s,o){return{years:e,months:o??t,weeks:s??n,days:r??i}}function Mt(e,t){return{isoDate:e,time:t}}function St(e){return Fr(e,"overflow",["constrain","reject"],"constrain")}function Fl(e){return Fr(e,"disambiguation",["compatible","earlier","later","reject"],"compatible")}function Pi(e,t){return Fr(e,"roundingMode",["ceil","floor","expand","trunc","halfCeil","halfFloor","halfExpand","halfTrunc","halfEven"],t)}function Vh(e,t){return Fr(e,"offset",["prefer","use","ignore","reject"],t)}function Vu(e){return Fr(e,"calendarName",["auto","always","never","critical"],"auto")}function Cc(e){let t=e.roundingIncrement;if(t===void 0)return 1;const n=st(t);if(n<1||n>1e9)throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t}`);return n}function kc(e,t,n){const i=n?t:t-1;if(e>i)throw new RangeError(`roundingIncrement must be at least 1 and less than ${i}, not ${e}`);if(t%e!=0)throw new RangeError(`Rounding increment must divide evenly into ${t}`)}function qu(e){const t=e.fractionalSecondDigits;if(t===void 0)return"auto";if(typeof t!="number"){if(jf(t)!=="auto")throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return"auto"}const n=Math.floor(t);if(!Number.isFinite(n)||n<0||n>9)throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return n}function Ku(e,t){switch(e){case"minute":return{precision:"minute",unit:"minute",increment:1};case"second":return{precision:0,unit:"second",increment:1};case"millisecond":return{precision:3,unit:"millisecond",increment:1};case"microsecond":return{precision:6,unit:"microsecond",increment:1};case"nanosecond":return{precision:9,unit:"nanosecond",increment:1}}switch(t){case"auto":return{precision:t,unit:"nanosecond",increment:1};case 0:return{precision:t,unit:"second",increment:1};case 1:case 2:case 3:return{precision:t,unit:"millisecond",increment:10**(3-t)};case 4:case 5:case 6:return{precision:t,unit:"microsecond",increment:10**(6-t)};case 7:case 8:case 9:return{precision:t,unit:"nanosecond",increment:10**(9-t)};default:throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`)}}const Vr=Symbol("~required~");function Nn(e,t,n,i,r=[]){let s=[];for(let l=0;l<nc.length;l++){const u=nc[l],h=u[1],d=u[2];n!=="datetime"&&n!==d||s.push(h)}s=s.concat(r);let o=i;o===Vr?o=void 0:o!==void 0&&s.push(o);let a=[];a=a.concat(s);for(let l=0;l<s.length;l++){const u=s[l],h=DL[u];h!==void 0&&a.push(h)}let c=Fr(e,t,a,o);if(c===void 0&&i===Vr)throw new RangeError(`${t} is required`);return c&&c in _b?_b[c]:c}function Up(e){const t=e.relativeTo;if(t===void 0)return{};let n,i,r,s,o,a="option",c=!1;if(re(t)){if(ft(t))return{zonedRelativeTo:t};if(ne(t))return{plainRelativeTo:t};if(jt(t))return{plainRelativeTo:vn(y(t,Ut).isoDate,y(t,A))};r=Ju(t);const l=ni(r,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],[]);({isoDate:n,time:i}=Xu(r,l,"constrain")),{offset:o,timeZone:s}=l,o===void 0&&(a="wall")}else{let l,u,h,d,f;if({year:h,month:d,day:f,time:i,calendar:r,tzAnnotation:l,offset:o,z:u}=gr(Se(t)),l)s=yn(l),u?a="exact":o||(a="wall"),c=!0;else if(u)throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");r||(r="iso8601"),r=Cn(r),n={year:h,month:d,day:f}}return s===void 0?{plainRelativeTo:vn(n,r)}:{zonedRelativeTo:Ge(Yd(n,i,a,a==="option"?Sc(o):0,s,"compatible","reject",c),s,r)}}function Er(e){return y(e,cn)!==0?"year":y(e,ln)!==0?"month":y(e,In)!==0?"week":y(e,un)!==0?"day":y(e,hn)!==0?"hour":y(e,dn)!==0?"minute":y(e,fn)!==0?"second":y(e,pn)!==0?"millisecond":y(e,gn)!==0?"microsecond":"nanosecond"}function Lr(e,t){return Ll.indexOf(e)>Ll.indexOf(t)?t:e}function Ui(e){return e==="year"||e==="month"||e==="week"}function Mr(e){return Ui(e)||e==="day"?"date":"time"}function Us(e){return je("%calendarImpl%")(e)}function Gu(e){return je("%calendarImpl%")(y(e,A))}function _n(e,t,n="date"){const i=Object.create(null),r=Us(e).isoToDate(t,{year:!0,monthCode:!0,day:!0});return i.monthCode=r.monthCode,n!=="month-day"&&n!=="date"||(i.day=r.day),n!=="year-month"&&n!=="date"||(i.year=r.year),i}function ni(e,t,n,i,r){const s=Us(e).extraFields(n),o=n.concat(i,s),a=Object.create(null);let c=!1;o.sort();for(let l=0;l<o.length;l++){const u=o[l],h=t[u];if(h!==void 0)c=!0,a[u]=(0,EL[u])(h);else if(r!=="partial"){if(r.includes(u))throw new TypeError(`required property '${u}' missing or undefined`);a[u]=ML[u]}}if(r==="partial"&&!c)throw new TypeError("no supported properties found");return a}function um(e,t="complete"){const n=["hour","microsecond","millisecond","minute","nanosecond","second"];let i=!1;const r=Object.create(null);for(let s=0;s<n.length;s++){const o=n[s],a=e[o];a!==void 0?(r[o]=st(a),i=!0):t==="complete"&&(r[o]=0)}if(!i)throw new TypeError("invalid time-like");return r}function sl(e,t){if(re(e)){if(ne(e))return St(K(t)),vn(y(e,rt),y(e,A));if(ft(e)){const c=wi(y(e,Tt),y(e,it));return St(K(t)),vn(c.isoDate,y(e,A))}if(jt(e))return St(K(t)),vn(y(e,Ut).isoDate,y(e,A));const a=Ju(e);return vn(Ls(a,ni(a,e,["year","month","monthCode","day"],[],[]),St(K(t))),a)}let{year:n,month:i,day:r,calendar:s,z:o}=gr(Se(e));if(o)throw new RangeError("Z designator not supported for PlainDate");return s||(s="iso8601"),s=Cn(s),St(K(t)),vn({year:n,month:i,day:r},s)}function Xu(e,t,n){return Mt(Ls(e,t,n),Wf(t.hour,t.minute,t.second,t.millisecond,t.microsecond,t.nanosecond,n))}function ol(e,t){let n,i,r;if(re(e)){if(jt(e))return St(K(t)),fi(y(e,Ut),y(e,A));if(ft(e)){const a=wi(y(e,Tt),y(e,it));return St(K(t)),fi(a,y(e,A))}if(ne(e))return St(K(t)),fi(Mt(y(e,rt),{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),y(e,A));r=Ju(e);const s=ni(r,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],[]),o=St(K(t));({isoDate:n,time:i}=Xu(r,s,o))}else{let s,o,a,c;if({year:o,month:a,day:c,time:i,calendar:r,z:s}=gr(Se(e)),s)throw new RangeError("Z designator not supported for PlainDateTime");i==="start-of-day"&&(i={deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Kv(o,a,c,i.hour,i.minute,i.second,i.millisecond,i.microsecond,i.nanosecond),r||(r="iso8601"),r=Cn(r),St(K(t)),n={year:o,month:a,day:c}}return fi(Mt(n,i),r)}function mi(e){const t=je("%Temporal.Duration%");if(te(e))return new t(y(e,cn),y(e,ln),y(e,In),y(e,un),y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn));if(!re(e))return(function(r){const{years:s,months:o,weeks:a,days:c,hours:l,minutes:u,seconds:h,milliseconds:d,microseconds:f,nanoseconds:p}=(function(g){const m=bL.exec(g);if(!m)throw new RangeError(`invalid duration: ${g}`);if(m.every(((G,B)=>B<2||G===void 0)))throw new RangeError(`invalid duration: ${g}`);const b=m[1]==="-"?-1:1,_=m[2]===void 0?0:st(m[2])*b,C=m[3]===void 0?0:st(m[3])*b,S=m[4]===void 0?0:st(m[4])*b,k=m[5]===void 0?0:st(m[5])*b,$=m[6]===void 0?0:st(m[6])*b,D=m[7],w=m[8],x=m[9],M=m[10],O=m[11];let T=0,R=0,j=0;if(D!==void 0){if(w??x??M??O)throw new RangeError("only the smallest unit can be fractional");j=3600*st((D+"000000000").slice(0,9))*b}else if(T=w===void 0?0:st(w)*b,x!==void 0){if(M??O)throw new RangeError("only the smallest unit can be fractional");j=60*st((x+"000000000").slice(0,9))*b}else R=M===void 0?0:st(M)*b,O!==void 0&&(j=st((O+"000000000").slice(0,9))*b);const z=j%1e3,Y=Math.trunc(j/1e3)%1e3,F=Math.trunc(j/1e6)%1e3;return R+=Math.trunc(j/1e9)%60,T+=Math.trunc(j/6e10),Vf(_,C,S,k,$,T,R,F,Y,z),{years:_,months:C,weeks:S,days:k,hours:$,minutes:T,seconds:R,milliseconds:F,microseconds:Y,nanoseconds:z}})(r);return new(je("%Temporal.Duration%"))(s,o,a,c,l,u,h,d,f,p)})(Se(e));const n={years:0,months:0,weeks:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};let i=mC(e);for(let r=0;r<Ud.length;r++){const s=Ud[r],o=i[s];o!==void 0&&(n[s]=o)}return new t(n.years,n.months,n.weeks,n.days,n.hours,n.minutes,n.seconds,n.milliseconds,n.microseconds,n.nanoseconds)}function al(e){let t;if(re(e)){if(Ae(e)||ft(e))return Ki(y(e,it));t=cm(e)}else t=e;const{year:n,month:i,day:r,time:s,offset:o,z:a}=(function(g){const m=gr(g);if(!m.z&&!m.offset)throw new RangeError("Temporal.Instant requires a time zone offset");return m})(Se(t)),{hour:c=0,minute:l=0,second:u=0,millisecond:h=0,microsecond:d=0,nanosecond:f=0}=s==="start-of-day"?{}:s,p=vu(n,i,r,c,l,u,h,d,f-(a?0:Sc(o)));return Fa(p.isoDate),Ki(ze(p))}function xb(e,t){if(re(e)){if(Kn(e))return St(K(t)),$a(y(e,rt),y(e,A));let a;return xn(e,A)?a=y(e,A):(a=e.calendar,a===void 0&&(a="iso8601"),a=Zu(a)),$a(Vd(a,ni(a,e,["year","month","monthCode","day"],[],[]),St(K(t))),a)}let{month:n,day:i,referenceISOYear:r,calendar:s}=Uv(Se(e));if(s===void 0&&(s="iso8601"),s=Cn(s),St(K(t)),s==="iso8601")return $a({year:1972,month:n,day:i},s);let o={year:r,month:n,day:i};return na(o),o=Vd(s,_n(s,o,"month-day"),"constrain"),$a(o,s)}function vs(e,t){let n;if(re(e)){if(ce(e))return St(K(t)),Dr(y(e,ie));if(jt(e))return St(K(t)),Dr(y(e,Ut).time);if(ft(e)){const l=wi(y(e,Tt),y(e,it));return St(K(t)),Dr(l.time)}const{hour:i,minute:r,second:s,millisecond:o,microsecond:a,nanosecond:c}=um(e);n=Wf(i,r,s,o,a,c,St(K(t)))}else n=dC(Se(e)),St(K(t));return Dr(n)}function vC(e){return e===void 0?{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}:y(vs(e),ie)}function cl(e,t){if(re(e)){if(Le(e))return St(K(t)),Na(y(e,rt),y(e,A));const a=Ju(e);return Na(pu(a,ni(a,e,["year","month","monthCode"],[],[]),St(K(t))),a)}let{year:n,month:i,referenceISODay:r,calendar:s}=Hv(Se(e));s===void 0&&(s="iso8601"),s=Cn(s),St(K(t));let o={year:n,month:i,day:r};return Gv(o),o=pu(s,_n(s,o,"year-month"),"constrain"),Na(o,s)}function Yd(e,t,n,i,r,s,o,a){if(t==="start-of-day")return cs(r,e);const c=Mt(e,t);if(n==="wall"||o==="ignore")return Ze(r,c,s);if(n==="exact"||o==="use"){const h=vu(e.year,e.month,e.day,t.hour,t.minute,t.second,t.millisecond,t.microsecond,t.nanosecond-i);Fa(h.isoDate);const d=ze(h);return sr(d),d}Fa(e);const l=ze(c),u=gu(r,c);for(let h=0;h<u.length;h++){const d=u[h],f=v.toNumber(v.subtract(l,d)),p=ys(f,6e10,"halfExpand");if(f===i||a&&p===i)return d}if(o==="reject"){const h=hm(i),d=mu(c,"iso8601","auto");throw new RangeError(`Offset ${h} is invalid for ${d} in ${r}`)}return EC(u,r,c,s)}function ll(e,t){let n,i,r,s,o,a,c,l=!1,u="option";if(re(e)){if(ft(e)){const g=K(t);return Fl(g),Vh(g,"reject"),St(g),Ge(y(e,it),y(e,Tt),y(e,A))}o=Ju(e);const d=ni(o,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],["timeZone"]);({offset:s,timeZone:r}=d),s===void 0&&(u="wall");const f=K(t);a=Fl(f),c=Vh(f,"reject");const p=St(f);({isoDate:n,time:i}=Xu(o,d,p))}else{let d,f,p,g,m;({year:p,month:g,day:m,time:i,tzAnnotation:d,offset:s,z:f,calendar:o}=(function(_){const C=gr(_);if(!C.tzAnnotation)throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");return C})(Se(e))),r=yn(d),f?u="exact":s||(u="wall"),o||(o="iso8601"),o=Cn(o),l=!0;const b=K(t);a=Fl(b),c=Vh(b,"reject"),St(b),n={year:p,month:g,day:m}}let h=0;return u==="option"&&(h=Sc(s)),Ge(Yd(n,i,u,h,r,a,c,l),r,o)}function yC(e,t,n){na(t),ts(e),ht(e,rt,t),ht(e,A,n),ht(e,G2,!0)}function vn(e,t){const n=je("%Temporal.PlainDate%"),i=Object.create(n.prototype);return yC(i,e,t),i}function bC(e,t,n){zo(t),ts(e),ht(e,Ut,t),ht(e,A,n)}function fi(e,t){const n=je("%Temporal.PlainDateTime%"),i=Object.create(n.prototype);return bC(i,e,t),i}function _C(e,t,n){na(t),ts(e),ht(e,rt,t),ht(e,A,n),ht(e,Q2,!0)}function $a(e,t){const n=je("%Temporal.PlainMonthDay%"),i=Object.create(n.prototype);return _C(i,e,t),i}function wC(e,t){ts(e),ht(e,ie,t)}function Dr(e){const t=je("%Temporal.PlainTime%"),n=Object.create(t.prototype);return wC(n,e),n}function xC(e,t,n){Gv(t),ts(e),ht(e,rt,t),ht(e,A,n),ht(e,X2,!0)}function Na(e,t){const n=je("%Temporal.PlainYearMonth%"),i=Object.create(n.prototype);return xC(i,e,t),i}function CC(e,t){sr(t),ts(e),ht(e,it,t)}function Ki(e){const t=je("%Temporal.Instant%"),n=Object.create(t.prototype);return CC(n,e),n}function kC(e,t,n,i){sr(t),ts(e),ht(e,it,t),ht(e,Tt,n),ht(e,A,i)}function Ge(e,t,n="iso8601"){const i=je("%Temporal.ZonedDateTime%"),r=Object.create(i.prototype);return kC(r,e,t,n),r}function Cb(e){return lm.filter((t=>e[t]!==void 0))}function No(e,t,n){const i=Cb(n),r=Us(e).fieldKeysToIgnore(i),s=Object.create(null),o=Cb(t);for(let a=0;a<lm.length;a++){let c;const l=lm[a];o.includes(l)&&!r.includes(l)&&(c=t[l]),i.includes(l)&&(c=n[l]),c!==void 0&&(s[l]=c)}return s}function Zn(e,t,n,i){const r=Us(e).dateAdd(t,n,i);return na(r),r}function Qu(e,t,n,i){return Us(e).dateUntil(t,n,i)}function Zu(e){if(re(e)&&xn(e,A))return y(e,A);const t=Se(e);try{return Cn(t)}catch{}let n;try{({calendar:n}=gr(t))}catch{try{({calendar:n}=dC(t))}catch{try{({calendar:n}=Hv(t))}catch{({calendar:n}=Uv(t))}}}return n||(n="iso8601"),Cn(n)}function Ju(e){if(xn(e,A))return y(e,A);const{calendar:t}=e;return t===void 0?"iso8601":Zu(t)}function rr(e,t){return Cn(e)===Cn(t)}function Ls(e,t,n){const i=Us(e);i.resolveFields(t,"date");const r=i.dateToISO(t,n);return na(r),r}function pu(e,t,n){const i=Us(e);i.resolveFields(t,"year-month"),t.day=1;const r=i.dateToISO(t,n);return Gv(r),r}function Vd(e,t,n){const i=Us(e);i.resolveFields(t,"month-day");const r=i.monthDayToISOReferenceDate(t,n);return na(r),r}function yn(e){if(re(e)&&ft(e))return y(e,Tt);const t=Se(e);if(t==="UTC")return"UTC";const{tzName:n,offsetMinutes:i}=(function(s){const{tzAnnotation:o,offset:a,z:c}=(function(l){if(fC.test(l))return{tzAnnotation:l,offset:void 0,z:!1};try{const{tzAnnotation:u,offset:h,z:d}=gr(l);if(d||u||h)return{tzAnnotation:u,offset:h,z:d}}catch{}gC(l)})(s);return o?$s(o):c?$s("UTC"):a?$s(a):void 0})(t);if(i!==void 0)return Yv(i);const r=qd(n);if(!r)throw new RangeError(`Unrecognized time zone ${n}`);return r.identifier}function SC(e,t){if(e===t)return!0;const n=$s(e).offsetMinutes,i=$s(t).offsetMinutes;if(n===void 0&&i===void 0){const r=qd(t);if(!r)return!1;const s=qd(e);return!!s&&s.primaryIdentifier===r.primaryIdentifier}return n===i}function $r(e,t){const n=$s(e).offsetMinutes;return n!==void 0?6e10*n:dm(e,t)}function hm(e){const t=e<0?"-":"+",n=Math.abs(e),i=Math.floor(n/36e11),r=Math.floor(n/6e10)%60,s=Math.floor(n/1e9)%60,o=n%1e9;return`${t}${Hf(i,r,s,o,s===0&&o===0?"minute":"auto")}`}function wi(e,t){const n=$r(e,t);let{isoDate:{year:i,month:r,day:s},time:{hour:o,minute:a,second:c,millisecond:l,microsecond:u,nanosecond:h}}=$C(t);return vu(i,r,s,o,a,c,l,u,h+n)}function Ze(e,t,n){return EC(gu(e,t),e,t,n)}function EC(e,t,n,i){const r=e.length;if(r===1)return e[0];if(r)switch(i){case"compatible":case"earlier":return e[0];case"later":return e[r-1];case"reject":throw new RangeError("multiple instants found")}if(i==="reject")throw new RangeError("multiple instants found");const s=ze(n),o=v.subtract(s,Rs);sr(o);const a=$r(t,o),c=v.add(s,Rs);sr(c);const l=$r(t,c)-a;switch(i){case"earlier":{const u=pt.fromComponents(0,0,0,0,0,-l),h=rc(n.time,u);return gu(t,Mt(jn(n.isoDate.year,n.isoDate.month,n.isoDate.day+h.deltaDays),h))[0]}case"compatible":case"later":{const u=pt.fromComponents(0,0,0,0,0,l),h=rc(n.time,u),d=gu(t,Mt(jn(n.isoDate.year,n.isoDate.month,n.isoDate.day+h.deltaDays),h));return d[d.length-1]}}}function gu(e,t){if(e==="UTC")return Fa(t.isoDate),[ze(t)];const n=$s(e).offsetMinutes;if(n!==void 0){const i=vu(t.isoDate.year,t.isoDate.month,t.isoDate.day,t.time.hour,t.time.minute-n,t.time.second,t.time.millisecond,t.time.microsecond,t.time.nanosecond);Fa(i.isoDate);const r=ze(i);return sr(r),[r]}return Fa(t.isoDate),(function(i,r){let s=ze(r),o=v.subtract(s,Rs);v.lessThan(o,du)&&(o=s);let a=v.add(s,Rs);v.greaterThan(a,ec)&&(a=s);const c=dm(i,o),l=dm(i,a);return(c===l?[c]:[c,l]).map((h=>{const d=v.subtract(s,v.BigInt(h)),f=(function(p,g){const{epochMilliseconds:m,time:{millisecond:b,microsecond:_,nanosecond:C}}=$C(g),{year:S,month:k,day:$,hour:D,minute:w,second:x}=TC(p,m);return vu(S,k,$,D,w,x,b,_,C)})(i,d);if(sc(r,f)===0)return sr(d),d})).filter((h=>h!==void 0))})(e,t)}function cs(e,t){const n=Mt(t,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),i=gu(e,n);if(i.length)return i[0];const r=ze(n),s=v.subtract(r,Rs);return sr(s),qv(e,s)}function th(e){let t;return t=e<0||e>9999?(e<0?"-":"+")+fu(Math.abs(e),6):fu(e,4),t}function Jn(e){return fu(e,2)}function MC(e,t){let n;if(t==="auto"){if(e===0)return"";n=fu(e,9).replace(/0+$/,"")}else{if(t===0)return"";n=fu(e,9).slice(0,t)}return`.${n}`}function Hf(e,t,n,i,r){let s=`${Jn(e)}:${Jn(t)}`;return r==="minute"||(s+=`:${Jn(n)}`,s+=MC(i,r)),s}function kb(e,t,n){let i=t;i===void 0&&(i="UTC");const r=y(e,it),s=mu(wi(i,r),"iso8601",n,"never");let o="Z";return t!==void 0&&(o=DC($r(i,r))),`${s}${o}`}function mh(e,t){const n=y(e,cn),i=y(e,ln),r=y(e,In),s=y(e,un),o=y(e,hn),a=y(e,dn),c=Gd(e);let l="";n!==0&&(l+=`${Math.abs(n)}Y`),i!==0&&(l+=`${Math.abs(i)}M`),r!==0&&(l+=`${Math.abs(r)}W`),s!==0&&(l+=`${Math.abs(s)}D`);let u="";o!==0&&(u+=`${Math.abs(o)}H`),a!==0&&(u+=`${Math.abs(a)}M`);const h=pt.fromComponents(0,0,y(e,fn),y(e,pn),y(e,gn),y(e,Pn));h.isZero()&&!["second","millisecond","microsecond","nanosecond"].includes(Er(e))&&t==="auto"||(u+=`${Math.abs(h.sec)}${MC(Math.abs(h.subsec),t)}S`);let d=`${c<0?"-":""}P${l}`;return u&&(d=`${d}T${u}`),d}function Sb(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);return`${th(n)}-${Jn(i)}-${Jn(r)}${Yu(y(e,A),t)}`}function Eb({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o){return Hf(e,t,n,1e6*i+1e3*r+s,o)}function mu(e,t,n,i="auto"){const{isoDate:{year:r,month:s,day:o},time:{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}=e;return`${th(r)}-${Jn(s)}-${Jn(o)}T${Hf(a,c,l,1e6*u+1e3*h+d,n)}${Yu(t,i)}`}function Mb(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);let s=`${Jn(i)}-${Jn(r)}`;const o=y(e,A);t!=="always"&&t!=="critical"&&o==="iso8601"||(s=`${th(n)}-${s}`);const a=Yu(o,t);return a&&(s+=a),s}function Db(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);let s=`${th(n)}-${Jn(i)}`;const o=y(e,A);t!=="always"&&t!=="critical"&&o==="iso8601"||(s+=`-${Jn(r)}`);const a=Yu(o,t);return a&&(s+=a),s}function $b(e,t,n="auto",i="auto",r="auto",s=void 0){let o=y(e,it);if(s){const{unit:u,increment:h,roundingMode:d}=s;o=mm(o,h,u,d)}const a=y(e,Tt),c=$r(a,o);let l=mu(wi(a,o),"iso8601",t,"never");return r!=="never"&&(l+=DC(c)),i!=="never"&&(l+=`[${i==="critical"?"!":""}${a}]`),l+=Yu(y(e,A),n),l}function Tb(e){return pC.test(e)}function Sc(e){const t=IL.exec(e);if(!t)throw new RangeError(`invalid time zone offset: ${e}; must match ±HH:MM[:SS.SSSSSSSSS]`);return(t[1]==="-"?-1:1)*(1e9*(60*(60*+t[2]+ +(t[3]||0))+ +(t[4]||0))+ +((t[5]||0)+"000000000").slice(0,9))}let jc;const TL=Object.assign(Object.create(null),{"/":!0,"-":!0,_:!0});function qd(e){if(jc===void 0){const s=Intl.supportedValuesOf?.("timeZone");if(s){jc=new Map;for(let o=0;o<s.length;o++){const a=s[o];jc.set(yu(a),a)}}else jc=null}const t=yu(e);let n=jc?.get(t);if(n)return{identifier:n,primaryIdentifier:n};try{n=hC(e).resolvedOptions().timeZone}catch{return}if(t==="antarctica/south_pole"&&(n="Antarctica/McMurdo"),SL.has(e))throw new RangeError(`${e} is a legacy time zone identifier from ICU. Use ${n} instead`);const i=[...t].map(((s,o)=>o===0||TL[t[o-1]]?s.toUpperCase():s)).join("").split("/");if(i.length===1)return t==="gb-eire"?{identifier:"GB-Eire",primaryIdentifier:n}:{identifier:t.length<=3||/[-0-9]/.test(t)?t.toUpperCase():i[0],primaryIdentifier:n};if(i[0]==="Etc")return{identifier:`Etc/${["Zulu","Greenwich","Universal"].includes(i[1])?i[1]:i[1].toUpperCase()}`,primaryIdentifier:n};if(i[0]==="Us")return{identifier:`US/${i[1]}`,primaryIdentifier:n};const r=new Map([["Act","ACT"],["Lhi","LHI"],["Nsw","NSW"],["Dar_Es_Salaam","Dar_es_Salaam"],["Port_Of_Spain","Port_of_Spain"],["Port-Au-Prince","Port-au-Prince"],["Isle_Of_Man","Isle_of_Man"],["Comodrivadavia","ComodRivadavia"],["Knox_In","Knox_IN"],["Dumontdurville","DumontDUrville"],["Mcmurdo","McMurdo"],["Denoronha","DeNoronha"],["Easterisland","EasterIsland"],["Bajanorte","BajaNorte"],["Bajasur","BajaSur"]]);return i[1]=r.get(i[1])??i[1],i.length>2&&(i[2]=r.get(i[2])??i[2]),{identifier:i.join("/"),primaryIdentifier:n}}function Co(e,t){const{year:n,month:i,day:r,hour:s,minute:o,second:a}=TC(e,t);let c=t%1e3;return c<0&&(c+=1e3),1e6*(Vv({isoDate:{year:n,month:i,day:r},time:{hour:s,minute:o,second:a,millisecond:c}})-t)}function dm(e,t){return Co(e,xi(t,"floor"))}function Yv(e){const t=e<0?"-":"+",n=Math.abs(e);return`${t}${Hf(Math.floor(n/60),n%60,0,0,"minute")}`}function DC(e){return Yv(ys(e,_L,"halfExpand")/6e10)}function Vv({isoDate:{year:e,month:t,day:n},time:{hour:i,minute:r,second:s,millisecond:o}}){const a=e%400,c=(e-a)/400,l=new Date;return l.setUTCHours(i,r,s,o),l.setUTCFullYear(a,t-1,n),l.getTime()+CL*c}function ze(e){const t=Vv(e),n=1e3*e.time.microsecond+e.time.nanosecond;return v.add(Xi(t),v.BigInt(n))}function $C(e){let t=xi(e,"trunc"),n=v.toNumber(v.remainder(e,Hu));n<0&&(n+=1e6,t-=1);const i=Math.floor(n/1e3)%1e3,r=n%1e3,s=new Date(t);return{epochMilliseconds:t,isoDate:{year:s.getUTCFullYear(),month:s.getUTCMonth()+1,day:s.getUTCDate()},time:{hour:s.getUTCHours(),minute:s.getUTCMinutes(),second:s.getUTCSeconds(),millisecond:s.getUTCMilliseconds(),microsecond:i,nanosecond:r}}}function qv(e,t){if(e==="UTC")return null;const n=xi(t,"floor");if(n<Al)return qv(e,Xi(Al));const i=Date.now(),r=Math.max(n,i)+366*As*3;let s=n,o=Co(e,s),a=s,c=o;for(;o===c&&s<r;){if(a=s+2*As*7,a>uC)return null;c=Co(e,a),o===c&&(s=a)}return o===c?null:Xi(jC((l=>Co(e,l)),s,a,o,c))}function fm(e,t){if(e==="UTC")return null;const n=xi(t,"ceil"),i=Date.now(),r=i+366*As*3;if(n>r){const l=fm(e,Xi(r));if(l===null||v.lessThan(l,Xi(i)))return l}if(e==="Africa/Casablanca"||e==="Africa/El_Aaiun"){const l=Date.UTC(2088,0,1);if(l<n)return fm(e,Xi(l))}let s=n-1;if(s<Al)return null;let o=Co(e,s),a=s,c=o;for(;o===c&&s>Al;){if(a=s-2*As*7,a<Al)return null;c=Co(e,a),o===c&&(s=a)}return o===c?null:Xi(jC((l=>Co(e,l)),a,s,c,o))}function TC(e,t){return(function(n){const i=n.split(/[^\w]+/);if(i.length!==7)throw new RangeError(`expected 7 parts in "${n}`);const r=+i[0],s=+i[1];let o=+i[2];const a=i[3];if(a[0]==="b"||a[0]==="B")o=1-o;else if(a[0]!=="a"&&a[0]!=="A")throw new RangeError(`Unknown era ${a} in "${n}`);const c=i[4]==="24"?0:+i[4],l=+i[5],u=+i[6];if(!(Number.isFinite(o)&&Number.isFinite(r)&&Number.isFinite(s)&&Number.isFinite(c)&&Number.isFinite(l)&&Number.isFinite(u)))throw new RangeError(`Invalid number in "${n}`);return{year:o,month:r,day:s,hour:c,minute:l,second:u}})(hC(e).format(t))}function Kd(e){return e!==void 0&&!(e%4!=0||e%100==0&&e%400!=0)}function ko(e,t){return{standard:[31,28,31,30,31,30,31,31,30,31,30,31],leapyear:[31,29,31,30,31,30,31,31,30,31,30,31]}[Kd(e)?"leapyear":"standard"][t-1]}function Gd(e){const t=[y(e,cn),y(e,ln),y(e,In),y(e,un),y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn)];for(let n=0;n<t.length;n++){const i=t[n];if(i!==0)return i<0?-1:1}return 0}function Uf(e){const t=["years","months","weeks","days"];for(let n=0;n<t.length;n++){const i=e[t[n]];if(i!==0)return i<0?-1:1}return 0}function OC(e){const t=Uf(e.date);return t!==0?t:e.time.sign()}function yo(e,t){let n=e,i=t;if(!Number.isFinite(n)||!Number.isFinite(i))throw new RangeError("infinity is out of range");return i-=1,n+=Math.floor(i/12),i%=12,i<0&&(i+=12),i+=1,{year:n,month:i}}function jn(e,t,n){let i=e,r=t,s=n;if(!Number.isFinite(s))throw new RangeError("infinity is out of range");({year:i,month:r}=yo(i,r));const o=146097;if(Math.abs(s)>o){const l=Math.trunc(s/o);i+=400*l,s-=l*o}let a=0,c=r>2?i:i-1;for(;a=Kd(c)?366:365,s<-a;)i-=1,c-=1,s+=a;for(c+=1;a=Kd(c)?366:365,s>a;)i+=1,c+=1,s-=a;for(;s<1;)({year:i,month:r}=yo(i,r-1)),s+=ko(i,r);for(;s>ko(i,r);)s-=ko(i,r),{year:i,month:r}=yo(i,r+1);return{year:i,month:r,day:s}}function vu(e,t,n,i,r,s,o,a,c){const l=ls(i,r,s,o,a,c);return Mt(jn(e,t,n+l.deltaDays),l)}function ls(e,t,n,i,r,s){let o,a=e,c=t,l=n,u=i,h=r,d=s;({div:o,mod:d}=Da(d,3)),h+=o,d<0&&(h-=1,d+=1e3),{div:o,mod:h}=Da(h,3),u+=o,h<0&&(u-=1,h+=1e3),l+=Math.trunc(u/1e3),u%=1e3,u<0&&(l-=1,u+=1e3),c+=Math.trunc(l/60),l%=60,l<0&&(c-=1,l+=60),a+=Math.trunc(c/60),c%=60,c<0&&(a-=1,c+=60);let f=Math.trunc(a/24);return a%=24,a<0&&(f-=1,a+=24),f+=0,a+=0,c+=0,l+=0,u+=0,h+=0,d+=0,{deltaDays:f,hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}function Ob(e,t){const n=Xe(e,0);if(Uf(n)===0)return e.days;const i=y(t,rt),r=Zn(y(t,A),i,n,"constrain"),s=jo(i.year,i.month-1,i.day),o=jo(r.year,r.month-1,r.day)-s;return e.days+o}function Bn(e){return new(je("%Temporal.Duration%"))(-y(e,cn),-y(e,ln),-y(e,In),-y(e,un),-y(e,hn),-y(e,dn),-y(e,fn),-y(e,pn),-y(e,gn),-y(e,Pn))}function mn(e,t,n){return Math.min(n,Math.max(t,e))}function IC(e,t,n){const i=mn(t,1,12);return{year:e,month:i,day:mn(n,1,ko(e,i))}}function Te(e,t,n){if(e<t||e>n)throw new RangeError(`value out of range: ${t} <= ${e} <= ${n}`)}function Fo(e,t,n){Te(t,1,12),Te(n,1,ko(e,t))}function na(e){zo(Mt(e,{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}))}function Yf(e,t,n,i,r,s){Te(e,0,23),Te(t,0,59),Te(n,0,59),Te(i,0,999),Te(r,0,999),Te(s,0,999)}function Kv(e,t,n,i,r,s,o,a,c){Fo(e,t,n),Yf(i,r,s,o,a,c)}function zo(e){const t=ze(e);(v.lessThan(t,wL)||v.greaterThan(t,xL))&&sr(t)}function pm(e){ze(e)}function sr(e){if(v.lessThan(e,du)||v.greaterThan(e,ec))throw new RangeError("date/time value is outside of supported range")}function Gv({year:e,month:t}){Te(e,vb,yb),e===vb?Te(t,4,12):e===yb&&Te(t,1,9)}function Vf(e,t,n,i,r,s,o,a,c,l){let u=0;const h=[e,t,n,i,r,s,o,a,c,l];for(let b=0;b<h.length;b++){const _=h[b];if(_===1/0||_===-1/0)throw new RangeError("infinite values not allowed as duration fields");if(_!==0){const C=_<0?-1:1;if(u!==0&&C!==u)throw new RangeError("mixed-sign values not allowed as duration fields");u=C}}if(Math.abs(e)>=2**32||Math.abs(t)>=2**32||Math.abs(n)>=2**32)throw new RangeError("years, months, and weeks must be < 2³²");const d=Da(a,3),f=Da(c,6),p=Da(l,9),g=Da(1e6*d.mod+1e3*f.mod+p.mod,9).div,m=86400*i+3600*r+60*s+o+d.div+f.div+p.div+g;if(!Number.isSafeInteger(m))throw new RangeError("total of duration time units cannot exceed 9007199254740991.999999999 s")}function wa(e){return{date:{years:y(e,cn),months:y(e,ln),weeks:y(e,In),days:y(e,un)},time:pt.fromComponents(y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn))}}function Gi(e){const t=pt.fromComponents(y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn)).add24HourDays(y(e,un));return{date:{years:y(e,cn),months:y(e,ln),weeks:y(e,In),days:0},time:t}}function PC(e){const t=Gi(e),n=Math.trunc(t.time.sec/86400);return Vf(t.date.years,t.date.months,t.date.weeks,n,0,0,0,0,0,0),{...t.date,days:n}}function pi(e,t){const n=e.time.sign();let i=e.time.abs().subsec,r=0,s=0,o=e.time.abs().sec,a=0,c=0,l=0;switch(t){case"year":case"month":case"week":case"day":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60,c=Math.trunc(a/60),a%=60,l=Math.trunc(c/24),c%=24;break;case"hour":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60,c=Math.trunc(a/60),a%=60;break;case"minute":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60;break;case"second":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3;break;case"millisecond":r=Math.trunc(i/1e3),i%=1e3,s=Wp(o,3,Math.trunc(r/1e3)),r%=1e3,o=0;break;case"microsecond":r=Wp(o,6,Math.trunc(i/1e3)),i%=1e3,o=0;break;case"nanosecond":i=Wp(o,9,i),o=0}return new(je("%Temporal.Duration%"))(e.date.years,e.date.months,e.date.weeks,e.date.days+n*l,n*c,n*a,n*o,n*s,n*r,n*i)}function Nr(e,t){return Uf(e),t.sign(),{date:e,time:t}}function jo(e,t,n){return Vv({isoDate:{year:e,month:t+1,day:n},time:{hour:0,minute:0,second:0,millisecond:0}})/As}function Fa({year:e,month:t,day:n}){if(Math.abs(jo(e,t-1,n))>1e8)throw new RangeError("date/time value is outside the supported range")}function Xv(e,t){const n=t.hour-e.hour,i=t.minute-e.minute,r=t.second-e.second,s=t.millisecond-e.millisecond,o=t.microsecond-e.microsecond,a=t.nanosecond-e.nanosecond;return pt.fromComponents(n,i,r,s,o,a)}function Qv(e,t,n,i,r){let s=pt.fromEpochNsDiff(t,e);return s=Xd(s,n,i,r),Nr({years:0,months:0,weeks:0,days:0},s)}function RC(e,t,n,i){pm(e),pm(t);let r=Xv(e.time,t.time);const s=r.sign(),o=or(e.isoDate,t.isoDate);let a=t.isoDate;o===s&&(a=jn(a.year,a.month,a.day+s),r=r.add24HourDays(-s));const c=Lr("day",i),l=Qu(n,e.isoDate,a,c);return i!==c&&(r=r.add24HourDays(l.days),l.days=0),Nr(l,r)}function AC(e,t,n,i,r){const s=v.subtract(t,e);if(v.equal(s,Xn))return{date:{years:0,months:0,weeks:0,days:0},time:pt.ZERO};const o=v.lessThan(s,Xn)?-1:1,a=wi(n,e),c=wi(n,t);let l,u=0,h=o===1?2:1,d=Xv(a.time,c.time);for(d.sign()===-o&&u++;u<=h;u++){l=Mt(jn(c.isoDate.year,c.isoDate.month,c.isoDate.day-u*o),a.time);const p=Ze(n,l,"compatible");if(d=pt.fromEpochNsDiff(t,p),d.sign()!==-o)break}const f=Lr("day",r);return Nr(Qu(i,a.isoDate,l.isoDate,f),d)}function LC(e,t,n,i,r,s,o,a,c){let l,u,h,d,f=t;switch(a){case"year":{const T=ys(f.date.years,o,"trunc");l=T,u=T+o*e,h={years:l,months:0,weeks:0,days:0},d={...h,years:u};break}case"month":{const T=ys(f.date.months,o,"trunc");l=T,u=T+o*e,h=Xe(f.date,0,0,l),d=Xe(f.date,0,0,u);break}case"week":{const T=Xe(f.date,0,0),R=Zn(s,i.isoDate,T,"constrain"),j=Qu(s,R,jn(R.year,R.month,R.day+f.date.days),"week"),z=ys(f.date.weeks+j.weeks,o,"trunc");l=z,u=z+o*e,h=Xe(f.date,0,l),d=Xe(f.date,0,u);break}case"day":{const T=ys(f.date.days,o,"trunc");l=T,u=T+o*e,h=Xe(f.date,l),d=Xe(f.date,u);break}}const p=Zn(s,i.isoDate,h,"constrain"),g=Zn(s,i.isoDate,d,"constrain");let m,b;const _=Mt(p,i.time),C=Mt(g,i.time);r?(m=Ze(r,_,"compatible"),b=Ze(r,C,"compatible")):(m=ze(_),b=ze(C));const S=pt.fromEpochNsDiff(n,m),k=pt.fromEpochNsDiff(b,m),$=Nf(c,e<0?"negative":"positive"),D=S.add(S).abs().subtract(k.abs()).sign(),w=Math.abs(l)/o%2==0,x=S.isZero()?Math.abs(l):S.cmp(k)?Ff(Math.abs(l),Math.abs(u),D,w,$):Math.abs(u),M=new pt(v.add(v.multiply(k.totalNs,v.BigInt(l)),v.multiply(S.totalNs,v.BigInt(o*e)))).fdiv(k.totalNs),O=x===Math.abs(u);return f={date:O?d:h,time:pt.ZERO},{nudgeResult:{duration:f,nudgedEpochNs:O?b:m,didExpandCalendarUnit:O},total:M}}function qf(e,t,n,i,r,s,o,a,c){let l=e;const u=Ui(a)||i&&a==="day",h=OC(l)<0?-1:1;let d;return u?{nudgeResult:d}=LC(h,l,t,n,i,r,o,a,c):d=i?(function(f,p,g,m,b,_,C,S){let k=p;const $=Zn(b,g.isoDate,k.date,"constrain"),D=Mt($,g.time),w=Mt(jn($.year,$.month,$.day+f),g.time),x=Ze(m,D,"compatible"),M=Ze(m,w,"compatible"),O=pt.fromEpochNsDiff(M,x);if(O.sign()!==f)throw new RangeError("time zone returned inconsistent Instants");const T=v.BigInt(ic[C]*_);let R=k.time.round(T,S);const j=R.subtract(O),z=j.sign()!==-f;let Y,F;return z?(Y=f,R=j.round(T,S),F=R.addToEpochNs(M)):(Y=0,F=R.addToEpochNs(x)),{duration:Nr(Xe(k.date,k.date.days+Y),R),nudgedEpochNs:F,didExpandCalendarUnit:z}})(h,l,n,i,r,o,a,c):(function(f,p,g,m,b,_){let C=f;const S=C.time.add24HourDays(C.date.days),k=S.round(v.BigInt(m*ic[b]),_),$=k.subtract(S),{quotient:D}=S.divmod(Hd),{quotient:w}=k.divmod(Hd),x=Math.sign(w-D)===S.sign(),M=$.addToEpochNs(p);let O=0,T=k;return Mr(g)==="date"&&(O=w,T=k.add(pt.fromComponents(24*-w,0,0,0,0,0))),{duration:{date:Xe(C.date,O),time:T},nudgedEpochNs:M,didExpandCalendarUnit:x}})(l,t,s,o,a,c),l=d.duration,d.didExpandCalendarUnit&&a!=="week"&&(l=(function(f,p,g,m,b,_,C,S){let k=p;if(S===C)return k;const $=Ll.indexOf(C);for(let D=Ll.indexOf(S)-1;D>=$;D--){const w=Ll[D];if(w==="week"&&C!=="week")continue;let x;switch(w){case"year":x={years:k.date.years+f,months:0,weeks:0,days:0};break;case"month":{const T=k.date.months+f;x=Xe(k.date,0,0,T);break}case"week":{const T=k.date.weeks+f;x=Xe(k.date,0,T);break}}const M=Mt(Zn(_,m.isoDate,x,"constrain"),m.time);let O;if(O=b?Ze(b,M,"compatible"):ze(M),Bd(g,O)===-f)break;k={date:x,time:pt.ZERO}}return k})(h,l,d.nudgedEpochNs,n,i,r,s,Lr(a,"day"))),l}function Ib(e,t,n,i,r,s){return Ui(s)||i&&s==="day"?LC(OC(e)<0?-1:1,e,t,n,i,r,1,s,"trunc").total:zl(e.time.add24HourDays(e.date.days),s)}function NC(e,t,n,i,r,s,o){if(sc(e,t)==0)return{date:{years:0,months:0,weeks:0,days:0},time:pt.ZERO};zo(e),zo(t);const a=RC(e,t,n,i);return s==="nanosecond"&&r===1?a:qf(a,ze(t),e,null,n,i,r,s,o)}function FC(e,t,n,i,r,s,o,a){if(Mr(r)==="time")return Qv(e,t,s,o,a);const c=AC(e,t,n,i,r);return o==="nanosecond"&&s===1?c:qf(c,t,wi(n,e),n,i,r,s,o,a)}function Ec(e,t,n,i,r,s){const o=nc.reduce(((f,p)=>{const g=p[0],m=p[1],b=p[2];return n!=="datetime"&&b!==n||i.includes(m)||f.push(m,g),f}),[]);let a=Nn(t,"largestUnit",n,"auto");if(i.includes(a))throw new RangeError(`largestUnit must be one of ${o.join(", ")}, not ${a}`);const c=Cc(t);let l=Pi(t,"trunc");e==="since"&&(l=(function(f){switch(f){case"ceil":return"floor";case"floor":return"ceil";case"halfCeil":return"halfFloor";case"halfFloor":return"halfCeil";default:return f}})(l));const u=Nn(t,"smallestUnit",n,r);if(i.includes(u))throw new RangeError(`smallestUnit must be one of ${o.join(", ")}, not ${u}`);const h=Lr(s,u);if(a==="auto"&&(a=h),Lr(a,u)!==a)throw new RangeError(`largestUnit ${a} cannot be smaller than smallestUnit ${u}`);const d={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[u];return d!==void 0&&kc(c,d,!1),{largestUnit:a,roundingIncrement:c,roundingMode:l,smallestUnit:u}}function Pb(e,t,n,i){const r=al(n),s=Ec(e,K(i),"time",[],"nanosecond","second");let o=pi(Qv(y(t,it),y(r,it),s.roundingIncrement,s.smallestUnit,s.roundingMode),s.largestUnit);return e==="since"&&(o=Bn(o)),o}function Rb(e,t,n,i){const r=sl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Ec(e,K(i),"date",[],"day","day"),c=je("%Temporal.Duration%"),l=y(t,rt),u=y(r,rt);if(or(l,u)===0)return new c;let h={date:Qu(s,l,u,a.largestUnit),time:pt.ZERO};if(a.smallestUnit!=="day"||a.roundingIncrement!==1){const f=Mt(l,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});h=qf(h,ze(Mt(u,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),f,null,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode)}let d=pi(h,"day");return e==="since"&&(d=Bn(d)),d}function Ab(e,t,n,i){const r=ol(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Ec(e,K(i),"datetime",[],"nanosecond","day"),c=je("%Temporal.Duration%"),l=y(t,Ut),u=y(r,Ut);if(sc(l,u)===0)return new c;let h=pi(NC(l,u,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode),a.largestUnit);return e==="since"&&(h=Bn(h)),h}function Lb(e,t,n,i){const r=vs(n),s=Ec(e,K(i),"time",[],"nanosecond","hour");let o=Xv(y(t,ie),y(r,ie));o=Xd(o,s.roundingIncrement,s.smallestUnit,s.roundingMode);let a=pi(Nr({years:0,months:0,weeks:0,days:0},o),s.largestUnit);return e==="since"&&(a=Bn(a)),a}function Nb(e,t,n,i){const r=cl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between months of ${s} and ${o} calendars`);const a=Ec(e,K(i),"date",["week","day"],"month","year"),c=je("%Temporal.Duration%");if(or(y(t,rt),y(r,rt))==0)return new c;const l=_n(s,y(t,rt),"year-month");l.day=1;const u=Ls(s,l,"constrain"),h=_n(s,y(r,rt),"year-month");h.day=1;const d=Ls(s,h,"constrain");let f={date:Xe(Qu(s,u,d,a.largestUnit),0,0),time:pt.ZERO};if(a.smallestUnit!=="month"||a.roundingIncrement!==1){const g=Mt(u,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});f=qf(f,ze(Mt(d,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),g,null,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode)}let p=pi(f,"day");return e==="since"&&(p=Bn(p)),p}function Fb(e,t,n,i){const r=ll(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Ec(e,K(i),"datetime",[],"nanosecond","hour"),c=y(t,it),l=y(r,it),u=je("%Temporal.Duration%");let h;if(Mr(a.largestUnit)!=="date")h=pi(Qv(c,l,a.roundingIncrement,a.smallestUnit,a.roundingMode),a.largestUnit);else{const d=y(t,Tt);if(!SC(d,y(r,Tt)))throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");if(v.equal(c,l))return new u;h=pi(FC(c,l,d,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode),"hour")}return e==="since"&&(h=Bn(h)),h}function rc({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o){let a=n,c=s;return a+=o.sec,c+=o.subsec,ls(e,t,a,i,r,c)}function gm(e,t){const n=t.addToEpochNs(e);return sr(n),n}function ul(e,t,n,i,r="constrain"){if(Uf(i.date)===0)return gm(e,i.time);const s=wi(t,e);return gm(Ze(t,Mt(Zn(n,s.isoDate,i.date,r),s.time),"compatible"),i.time)}function zb(e,t,n){let i=mi(n);e==="subtract"&&(i=Bn(i));const r=Lr(Er(t),Er(i));if(Ui(r))throw new RangeError("For years, months, or weeks arithmetic, use date arithmetic relative to a starting point");const s=Gi(t),o=Gi(i);return pi(Nr({years:0,months:0,weeks:0,days:0},s.time.add(o.time)),r)}function jb(e,t,n){let i=mi(n);e==="subtract"&&(i=Bn(i));const r=Er(i);if(Mr(r)==="date")throw new RangeError(`Duration field ${r} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);const s=Gi(i);return Ki(gm(y(t,it),s.time))}function Bb(e,t,n,i){const r=y(t,A);let s=mi(n);e==="subtract"&&(s=Bn(s));const o=PC(s),a=St(K(i));return vn(Zn(r,y(t,rt),o,a),r)}function Wb(e,t,n,i){let r=mi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=y(t,A),a=Gi(r),c=y(t,Ut),l=rc(c.time,a.time),u=Xe(a.date,l.deltaDays);return Vf(u.years,u.months,u.weeks,u.days,0,0,0,0,0,0),fi(Mt(Zn(o,c.isoDate,u,s),l),o)}function Hb(e,t,n){let i=mi(n);e==="subtract"&&(i=Bn(i));const r=Gi(i),{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=rc(y(t,ie),r.time);return Dr(Wf(s,o,a,c,l,u,"reject"))}function Ub(e,t,n,i){let r=mi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=Gd(r),a=y(t,A),c=_n(a,y(t,rt),"year-month");c.day=1;let l=Ls(a,c,"constrain");if(o<0){const h=Zn(a,l,{months:1},"constrain");l=jn(h.year,h.month,h.day-1)}const u=PC(r);return na(l),Na(pu(a,_n(a,Zn(a,l,u,s),"year-month"),s),a)}function Yb(e,t,n,i){let r=mi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=y(t,Tt),a=y(t,A),c=wa(r);return Ge(ul(y(t,it),o,a,c,s),o,a)}function ys(e,t,n){const i=Math.trunc(e/t),r=e%t,s=e<0?"negative":"positive",o=Math.abs(i),a=o+1,c=Rn(Math.abs(2*r)-t),l=o%2==0,u=Nf(n,s),h=r===0?o:Ff(o,a,c,l,u);return t*(s==="positive"?h:-h)}function mm(e,t,n,i){const r=ic[n]*t;return(function(s,o,a){const c=kr(s),l=kr(o),u=v.divide(c,l),h=v.remainder(c,l),d=Nf(a,"positive");let f,p;v.lessThan(c,Xn)?(f=v.subtract(u,hu),p=u):(f=u,p=v.add(u,hu));const g=Bd(ao(v.multiply(h,Wv)),l)*(v.lessThan(c,Xn)?-1:1)+0,m=v.equal(h,Xn)?u:Ff(f,p,g,K2(f),d);return v.multiply(m,l)})(e,v.BigInt(r),i)}function vm(e,t,n,i){pm(e);const{year:r,month:s,day:o}=e.isoDate,a=ym(e.time,t,n,i);return Mt(jn(r,s,o+a.deltaDays),a)}function ym({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o,a,c){let l;switch(a){case"day":case"hour":l=1e3*(1e3*(1e3*(60*(60*e+t)+n)+i)+r)+s;break;case"minute":l=1e3*(1e3*(1e3*(60*t+n)+i)+r)+s;break;case"second":l=1e3*(1e3*(1e3*n+i)+r)+s;break;case"millisecond":l=1e3*(1e3*i+r)+s;break;case"microsecond":l=1e3*r+s;break;case"nanosecond":l=s}const u=ic[a],h=ys(l,u*o,c)/u;switch(a){case"day":return{deltaDays:h,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0};case"hour":return ls(h,0,0,0,0,0);case"minute":return ls(e,h,0,0,0,0);case"second":return ls(e,t,h,0,0,0);case"millisecond":return ls(e,t,n,h,0,0);case"microsecond":return ls(e,t,n,i,h,0);case"nanosecond":return ls(e,t,n,i,r,h);default:throw new Error(`Invalid unit ${a}`)}}function Xd(e,t,n,i){const r=ic[n];return e.round(v.BigInt(r*t),i)}function zl(e,t){const n=ic[t];return e.fdiv(v.BigInt(n))}function or(e,t){return e.year!==t.year?Rn(e.year-t.year):e.month!==t.month?Rn(e.month-t.month):e.day!==t.day?Rn(e.day-t.day):0}function bm(e,t){return e.hour!==t.hour?Rn(e.hour-t.hour):e.minute!==t.minute?Rn(e.minute-t.minute):e.second!==t.second?Rn(e.second-t.second):e.millisecond!==t.millisecond?Rn(e.millisecond-t.millisecond):e.microsecond!==t.microsecond?Rn(e.microsecond-t.microsecond):e.nanosecond!==t.nanosecond?Rn(e.nanosecond-t.nanosecond):0}function sc(e,t){const n=or(e.isoDate,t.isoDate);return n!==0?n:bm(e.time,t.time)}function zC(e){const t=Qd(e);return globalThis.BigInt!==void 0?globalThis.BigInt(t.toString(10)):t}function xi(e,t){const n=kr(e),{quotient:i,remainder:r}=il(n,Hu);let s=v.toNumber(i);return t==="floor"&&v.toNumber(r)<0&&(s-=1),t==="ceil"&&v.toNumber(r)>0&&(s+=1),s}function Xi(e){if(!Number.isInteger(e))throw new RangeError("epoch milliseconds must be an integer");return v.multiply(v.BigInt(e),Hu)}function Qd(e){let t=e;if(typeof e=="object"){const n=e[Symbol.toPrimitive];n&&typeof n=="function"&&(t=n.call(e,"number"))}if(typeof t=="number")throw new TypeError("cannot convert number to bigint");return typeof t=="bigint"?v.BigInt(t.toString(10)):v.BigInt(t)}const _m=(()=>{let e=v.BigInt(Date.now()%1e6);return()=>{const t=Date.now(),n=v.BigInt(t),i=v.add(Xi(t),e);return e=v.remainder(n,Hu),v.greaterThan(i,ec)?ec:v.lessThan(i,du)?du:i}})();function Bc(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}function Rn(e){return e<0?-1:e>0?1:e}function K(e){if(e===void 0)return Object.create(null);if(re(e)&&e!==null)return e;throw new TypeError("Options parameter must be an object, not "+(e===null?"null":typeof e))}function Bo(e,t){const n=Object.create(null);return n[e]=t,n}function Fr(e,t,n,i){let r=e[t];if(r!==void 0){if(r=jf(r),!n.includes(r))throw new RangeError(`${t} must be one of ${n.join(", ")}, not ${r}`);return r}if(i===Vr)throw new RangeError(`${t} option is required`);return i}function Cn(e){const t=yu(e);if(!kL.includes(yu(t)))throw new RangeError(`invalid calendar identifier ${t}`);switch(t){case"ethiopic-amete-alem":return"ethioaa";case"islamicc":return"islamic-civil"}return t}function yu(e){let t="";for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);t+=i>=65&&i<=90?String.fromCharCode(i+32):String.fromCharCode(i)}return t}function Ys(e){throw new TypeError(`Do not use built-in arithmetic operators with Temporal objects. When comparing, use ${e==="PlainMonthDay"?"Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))":`Temporal.${e}.compare(obj1, obj2)`}, not obj1 > obj2. When coercing to strings, use \`\${obj}\` or String(obj), not '' + obj. When coercing to numbers, use properties or methods of the object, not \`+obj\`. When concatenating with strings, use \`\${str}\${obj}\` or str.concat(obj), not str + obj. In React, coerce to a string before rendering a Temporal object.`)}const OL=new RegExp(`^${cC.source}$`),IL=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/.source}$`);function jC(e,t,n,i=e(t),r=e(n)){let s=t,o=n,a=i,c=r;for(;o-s>1;){let l=Math.trunc((s+o)/2);const u=e(l);u===a?(s=l,a=u):u===c&&(o=l,c=u)}return o}function BC(e){return[...e]}function WC(e,t){if(e!=="gregory"&&e!=="iso8601")return;const n=eh[e];let i=t.year;const{dayOfWeek:r,dayOfYear:s,daysInYear:o}=n.isoToDate(t,{dayOfWeek:!0,dayOfYear:!0,daysInYear:!0}),a=n.getFirstDayOfWeek(),c=n.getMinimalDaysInFirstWeek();let l=(r+7-a)%7,u=(r-s+7001-a)%7,h=Math.floor((s-1+u)/7);if(7-u>=c&&++h,h==0)h=(function(d,f,p,g){let m=(g-d-p+1)%7;m<0&&(m+=7);let b=Math.floor((p+m-1)/7);return 7-m>=f&&++b,b})(a,c,s+n.isoToDate(n.dateAdd(t,{years:-1},"constrain"),{daysInYear:!0}).daysInYear,r),i--;else if(s>=o-5){let d=(l+o-s)%7;d<0&&(d+=7),6-d>=c&&s+7-l>o&&(h=1,i++)}return{week:h,year:i}}function Vb(e,t,n,i,r){if(t!==r.year){if(e*(t-r.year)>0)return!0}else if(n!==r.month){if(e*(n-r.month)>0)return!0}else if(i!==r.day&&e*(i-r.day)>0)return!0;return!1}const eh={};function Wo(e){if(!e.startsWith("M"))throw new RangeError(`Invalid month code: ${e}.  Month codes must start with M.`);const t=+e.slice(1);if(Number.isNaN(t))throw new RangeError(`Invalid month code: ${e}`);return t}function Zi(e,t=!1){return`M${`${e}`.padStart(2,"0")}${t?"L":""}`}function Zv(e,t=void 0,n=12){let{month:i,monthCode:r}=e;if(r===void 0){if(i===void 0)throw new TypeError("Either month or monthCode are required");t==="reject"&&Te(i,1,n),t==="constrain"&&(i=mn(i,1,n)),r=Zi(i)}else{const s=Wo(r);if(r!==Zi(s))throw new RangeError(`Invalid month code: ${r}`);if(i!==void 0&&i!==s)throw new RangeError(`monthCode ${r} and month ${i} must match if both are present`);if(i=s,i<1||i>n)throw new RangeError(`Invalid monthCode: ${r}`)}return{...e,month:i,monthCode:r}}eh.iso8601={resolveFields(e,t){if((t==="date"||t==="year-month")&&e.year===void 0)throw new TypeError("year is required");if((t==="date"||t==="month-day")&&e.day===void 0)throw new TypeError("day is required");Object.assign(e,Zv(e))},dateToISO:(e,t)=>Nl(e.year,e.month,e.day,t),monthDayToISOReferenceDate(e,t){const{month:n,day:i}=Nl(e.year??1972,e.month,e.day,t);return{month:n,day:i,year:1972}},extraFields:()=>[],fieldKeysToIgnore(e){const t=new Set;for(let n=0;n<e.length;n++){const i=e[n];t.add(i),i==="month"?t.add("monthCode"):i==="monthCode"&&t.add("month")}return BC(t)},dateAdd(e,{years:t=0,months:n=0,weeks:i=0,days:r=0},s){let{year:o,month:a,day:c}=e;return o+=t,a+=n,{year:o,month:a}=yo(o,a),{year:o,month:a,day:c}=Nl(o,a,c,s),c+=r+7*i,jn(o,a,c)},dateUntil(e,t,n){const i=-or(e,t);if(i===0)return{years:0,months:0,weeks:0,days:0};let r,s=0,o=0;if(n==="year"||n==="month"){let u=t.year-e.year;for(u!==0&&(u-=i);!Vb(i,e.year+u,e.month,e.day,t);)s=u,u+=i;let h=i;for(r=yo(e.year+s,e.month+h);!Vb(i,r.year,r.month,e.day,t);)o=h,h+=i,r=yo(r.year,r.month+i);n==="month"&&(o+=12*s,s=0)}r=yo(e.year+s,e.month+o);const a=IC(r.year,r.month,e.day);let c=0,l=jo(t.year,t.month-1,t.day)-jo(a.year,a.month-1,a.day);return n==="week"&&(c=Math.trunc(l/7),l%=7),{years:s,months:o,weeks:c,days:l}},isoToDate({year:e,month:t,day:n},i){const r={era:void 0,eraYear:void 0,year:e,month:t,day:n,daysInWeek:7,monthsInYear:12};if(i.monthCode&&(r.monthCode=Zi(t)),i.dayOfWeek){const s=t+(t<3?10:-2),o=e-(t<3?1:0),a=Math.floor(o/100),c=o-100*a,l=(n+Math.floor(2.6*s-.2)+(c+Math.floor(c/4))+(Math.floor(a/4)-2*a))%7;r.dayOfWeek=l+(l<=0?7:0)}if(i.dayOfYear){let s=n;for(let o=t-1;o>0;o--)s+=ko(e,o);r.dayOfYear=s}return i.weekOfYear&&(r.weekOfYear=WC("iso8601",{year:e,month:t,day:n})),i.daysInMonth&&(r.daysInMonth=ko(e,t)),(i.daysInYear||i.inLeapYear)&&(r.inLeapYear=Kd(e),r.daysInYear=r.inLeapYear?366:365),r},getFirstDayOfWeek:()=>1,getMinimalDaysInFirstWeek:()=>4};class $e{constructor(t){if(this.map=new Map,this.calls=0,this.hits=0,this.misses=0,t!==void 0){let n=0;for(const i of t.map.entries()){if(++n>$e.MAX_CACHE_ENTRIES)break;this.map.set(...i)}}}get(t){const n=this.map.get(t);return n&&(this.hits++,this.report()),this.calls++,n}set(t,n){this.map.set(t,n),this.misses++,this.report()}report(){}setObject(t){if($e.objectMap.get(t))throw new RangeError("object already cached");$e.objectMap.set(t,this),this.report()}static getCacheForObject(t){let n=$e.objectMap.get(t);return n||(n=new $e,$e.objectMap.set(t,n)),n}}function HC({isoYear:e,isoMonth:t,isoDay:n}){return`${th(e)}-${Jn(t)}-${Jn(n)}T00:00Z`}function Yp(e,t){return{years:e.year-t.year,months:e.month-t.month,days:e.day-t.day}}$e.objectMap=new WeakMap,$e.MAX_CACHE_ENTRIES=1e3;class ia{constructor(){this.eras=[],this.hasEra=!1,this.erasBeginMidYear=!1}getFormatter(){return this.formatter===void 0&&(this.formatter=new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`,{day:"numeric",month:"numeric",year:"numeric",era:"short",timeZone:"UTC"})),this.formatter}getCalendarParts(t){let n=this.getFormatter(),i=new Date(t);if(t==="-271821-04-19T00:00Z"){const r=n.resolvedOptions();n=new Intl.DateTimeFormat(r.locale,{...r,timeZone:"Etc/GMT+1"}),i=new Date("-271821-04-20T00:00Z")}try{return n.formatToParts(i)}catch{throw new RangeError(`Invalid ISO date: ${t}`)}}isoToCalendarDate(t,n){const{year:i,month:r,day:s}=t,o=JSON.stringify({func:"isoToCalendarDate",isoYear:i,isoMonth:r,isoDay:s,id:this.id}),a=n.get(o);if(a)return a;const c=HC({isoYear:i,isoMonth:r,isoDay:s}),l=this.getCalendarParts(c),u={};for(let d=0;d<l.length;d++){const{type:f,value:p}=l[d];if(f!=="year"&&f!=="relatedYear"||(this.hasEra?u.eraYear=+p:u.year=+p),f==="month"){const g=/^([0-9]*)(.*?)$/.exec(p);if(!g||g.length!=3||!g[1]&&!g[2])throw new RangeError(`Unexpected month: ${p}`);if(u.month=g[1]?+g[1]:1,u.month<1)throw new RangeError(`Invalid month ${p} from ${c}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);if(u.month>13)throw new RangeError(`Invalid month ${p} from ${c}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);g[2]&&(u.monthExtra=g[2])}f==="day"&&(u.day=+p),this.hasEra&&f==="era"&&p!=null&&p!==""&&(u.era=p.split(" (")[0].normalize("NFD").replace(/[^-0-9 \p{L}]/gu,"").replace(/ /g,"-").toLowerCase())}if(this.hasEra&&u.eraYear===void 0)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);if(this.hasEra){const d=this.eras.find((f=>u.era===f.genericName));d&&(u.era=d.code)}if(this.reviseIntlEra){const{era:d,eraYear:f}=this.reviseIntlEra(u,t);u.era=d,u.eraYear=f}this.checkIcuBugs&&this.checkIcuBugs(t);const h=this.adjustCalendarDate(u,n,"constrain",!0);if(h.year===void 0)throw new RangeError(`Missing year converting ${JSON.stringify(t)}`);if(h.month===void 0)throw new RangeError(`Missing month converting ${JSON.stringify(t)}`);if(h.day===void 0)throw new RangeError(`Missing day converting ${JSON.stringify(t)}`);return n.set(o,h),["constrain","reject"].forEach((d=>{const f=JSON.stringify({func:"calendarToIsoDate",year:h.year,month:h.month,day:h.day,overflow:d,id:this.id});n.set(f,t)})),h}validateCalendarDate(t){const{month:n,year:i,day:r,eraYear:s,monthCode:o,monthExtra:a}=t;if(a!==void 0)throw new RangeError("Unexpected `monthExtra` value");if(i===void 0&&s===void 0)throw new TypeError("year or eraYear is required");if(n===void 0&&o===void 0)throw new TypeError("month or monthCode is required");if(r===void 0)throw new RangeError("Missing day");if(o!==void 0){if(typeof o!="string")throw new RangeError("monthCode must be a string, not "+typeof o);if(!/^M([01]?\d)(L?)$/.test(o))throw new RangeError(`Invalid monthCode: ${o}`)}if(this.hasEra&&t.era===void 0!=(t.eraYear===void 0))throw new TypeError("properties era and eraYear must be provided together")}adjustCalendarDate(t,n=void 0,i="constrain",r=!1){if(this.calendarType==="lunisolar")throw new RangeError("Override required for lunisolar calendars");let s=t;this.validateCalendarDate(s);const o=this.monthsInYear(s,n);let{month:a,monthCode:c}=s;return{month:a,monthCode:c}=Zv(s,i,o),{...s,month:a,monthCode:c}}regulateMonthDayNaive(t,n,i){const r=this.monthsInYear(t,i);let{month:s,day:o}=t;return n==="reject"?(Te(s,1,r),Te(o,1,this.maximumMonthLength(t))):(s=mn(s,1,r),o=mn(o,1,this.maximumMonthLength({...t,month:s}))),{...t,month:s,day:o}}calendarToIsoDate(t,n="constrain",i){const r=t;let s=this.adjustCalendarDate(t,i,n,!1);s=this.regulateMonthDayNaive(s,n,i);const{year:o,month:a,day:c}=s,l=JSON.stringify({func:"calendarToIsoDate",year:o,month:a,day:c,overflow:n,id:this.id});let u,h=i.get(l);if(h||r.year!==void 0&&r.month!==void 0&&r.day!==void 0&&(r.year!==s.year||r.month!==s.month||r.day!==s.day)&&(u=JSON.stringify({func:"calendarToIsoDate",year:r.year,month:r.month,day:r.day,overflow:n,id:this.id}),h=i.get(u),h))return h;let d=this.estimateIsoDate({year:o,month:a,day:c});const f=_=>{let C=this.addDaysIso(d,_);if(s.day>this.minimumMonthLength(s)){let S=this.isoToCalendarDate(C,i);for(;S.month!==a||S.year!==o;){if(n==="reject")throw new RangeError(`day ${c} does not exist in month ${a} of year ${o}`);C=this.addDaysIso(C,-1),S=this.isoToCalendarDate(C,i)}}return C};let p=0,g=this.isoToCalendarDate(d,i),m=Yp(s,g);if(m.years!==0||m.months!==0||m.days!==0){const _=365*m.years+30*m.months+m.days;d=this.addDaysIso(d,_),g=this.isoToCalendarDate(d,i),m=Yp(s,g),m.years===0&&m.months===0?d=f(m.days):p=this.compareCalendarDates(s,g)}let b=8;for(;p;){d=this.addDaysIso(d,p*b);const _=g;g=this.isoToCalendarDate(d,i);const C=p;if(p=this.compareCalendarDates(s,g),p){if(m=Yp(s,g),m.years===0&&m.months===0)d=f(m.days),p=0;else if(C&&p!==C)if(b>1)b/=2;else{if(n==="reject")throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({...r})}`);this.compareCalendarDates(g,_)>0&&(d=this.addDaysIso(d,-1)),p=0}}}if(i.set(l,d),u&&i.set(u,d),s.year===void 0||s.month===void 0||s.day===void 0||s.monthCode===void 0||this.hasEra&&(s.era===void 0||s.eraYear===void 0))throw new RangeError("Unexpected missing property");return d}compareCalendarDates(t,n){return t.year!==n.year?Rn(t.year-n.year):t.month!==n.month?Rn(t.month-n.month):t.day!==n.day?Rn(t.day-n.day):0}regulateDate(t,n="constrain",i){const r=this.calendarToIsoDate(t,n,i);return this.isoToCalendarDate(r,i)}addDaysIso(t,n){return jn(t.year,t.month,t.day+n)}addDaysCalendar(t,n,i){const r=this.calendarToIsoDate(t,"constrain",i),s=this.addDaysIso(r,n);return this.isoToCalendarDate(s,i)}addMonthsCalendar(t,n,i,r){let s=t;const{day:o}=s;for(let a=0,c=Math.abs(n);a<c;a++){const{month:l}=s,u=s,h=n<0?-Math.max(o,this.daysInPreviousMonth(s,r)):this.daysInMonth(s,r),d=this.calendarToIsoDate(s,"constrain",r);let f=this.addDaysIso(d,h);if(s=this.isoToCalendarDate(f,r),n>0){const p=this.monthsInYear(u,r);for(;s.month-1!=l%p;)f=this.addDaysIso(f,-1),s=this.isoToCalendarDate(f,r)}s.day!==o&&(s=this.regulateDate({...s,day:o},"constrain",r))}if(i==="reject"&&s.day!==o)throw new RangeError(`Day ${o} does not exist in resulting calendar month`);return s}addCalendar(t,{years:n=0,months:i=0,weeks:r=0,days:s=0},o,a){const{year:c,day:l,monthCode:u}=t,h=this.adjustCalendarDate({year:c+n,monthCode:u,day:l},a),d=this.addMonthsCalendar(h,i,o,a),f=s+7*r;return this.addDaysCalendar(d,f,a)}untilCalendar(t,n,i,r){let s=0,o=0,a=0,c=0;switch(i){case"day":s=this.calendarDaysUntil(t,n,r);break;case"week":{const l=this.calendarDaysUntil(t,n,r);s=l%7,o=(l-s)/7;break}case"month":case"year":{const l=this.compareCalendarDates(n,t);if(!l)return{years:0,months:0,weeks:0,days:0};const u=n.year-t.year,h=n.day-t.day;if(i==="year"&&u){let p=0;n.monthCode>t.monthCode&&(p=1),n.monthCode<t.monthCode&&(p=-1),p||(p=Math.sign(h)),c=p*l<0?u-l:u}let d,f=c?this.addCalendar(t,{years:c},"constrain",r):t;do a+=l,d=f,f=this.addMonthsCalendar(d,l,"constrain",r),f.day!==t.day&&(f=this.regulateDate({...f,day:t.day},"constrain",r));while(this.compareCalendarDates(n,f)*l>=0);a-=l,s=this.calendarDaysUntil(d,n,r);break}}return{years:c,months:a,weeks:o,days:s}}daysInMonth(t,n){const{day:i}=t,r=this.maximumMonthLength(t),s=this.minimumMonthLength(t);if(s===r)return s;const o=i<=r-s?r:s,a=this.calendarToIsoDate(t,"constrain",n),c=this.addDaysIso(a,o),l=this.isoToCalendarDate(c,n),u=this.addDaysIso(c,-l.day);return this.isoToCalendarDate(u,n).day}daysInPreviousMonth(t,n){const{day:i,month:r,year:s}=t;let o={year:r>1?s:s-1,month:r,day:1};const a=r>1?r-1:this.monthsInYear(o,n);o={...o,month:a};const c=this.minimumMonthLength(o),l=this.maximumMonthLength(o);if(c===l)return l;const u=this.calendarToIsoDate(t,"constrain",n),h=this.addDaysIso(u,-i);return this.isoToCalendarDate(h,n).day}startOfCalendarYear(t){return{year:t.year,month:1,monthCode:"M01",day:1}}startOfCalendarMonth(t){return{year:t.year,month:t.month,day:1}}calendarDaysUntil(t,n,i){const r=this.calendarToIsoDate(t,"constrain",i),s=this.calendarToIsoDate(n,"constrain",i);return jo(s.year,s.month-1,s.day)-jo(r.year,r.month-1,r.day)}monthDaySearchStartYear(t,n){return 1972}monthDayFromFields(t,n,i){let r,s,o,a,c,{era:l,eraYear:u,year:h,month:d,monthCode:f,day:p}=t;if(d!==void 0&&h===void 0&&(!this.hasEra||l===void 0||u===void 0))throw new TypeError("when month is present, year (or era and eraYear) are required");(f===void 0||h!==void 0||this.hasEra&&u!==void 0)&&({monthCode:f,day:p}=this.isoToCalendarDate(this.calendarToIsoDate(t,n,i),i));const g={year:this.monthDaySearchStartYear(f,p),month:12,day:31},m=this.isoToCalendarDate(g,i),b=m.monthCode>f||m.monthCode===f&&m.day>=p?m.year:m.year-1;for(let _=0;_<20;_++){const C=this.adjustCalendarDate({day:p,monthCode:f,year:b-_},i),S=this.calendarToIsoDate(C,"constrain",i),k=this.isoToCalendarDate(S,i);if({year:r,month:s,day:o}=S,k.monthCode===f&&k.day===p)return{month:s,day:o,year:r};if(n==="constrain"){const $=this.maxLengthOfMonthCodeInAnyYear(k.monthCode);if(k.monthCode===f&&k.day===$&&p>$)return{month:s,day:o,year:r};(a===void 0||k.monthCode===a.monthCode&&k.day>a.day)&&(a=k,c=S)}}if(n==="constrain"&&c!==void 0)return c;throw new RangeError(`No recent ${this.id} year with monthCode ${f} and day ${p}`)}getFirstDayOfWeek(){}getMinimalDaysInFirstWeek(){}}class PL extends ia{constructor(){super(...arguments),this.id="hebrew",this.calendarType="lunisolar",this.months={Tishri:{leap:1,regular:1,monthCode:"M01",days:30},Heshvan:{leap:2,regular:2,monthCode:"M02",days:{min:29,max:30}},Kislev:{leap:3,regular:3,monthCode:"M03",days:{min:29,max:30}},Tevet:{leap:4,regular:4,monthCode:"M04",days:29},Shevat:{leap:5,regular:5,monthCode:"M05",days:30},Adar:{leap:void 0,regular:6,monthCode:"M06",days:29},"Adar I":{leap:6,regular:void 0,monthCode:"M05L",days:30},"Adar II":{leap:7,regular:void 0,monthCode:"M06",days:29},Nisan:{leap:8,regular:7,monthCode:"M07",days:30},Iyar:{leap:9,regular:8,monthCode:"M08",days:29},Sivan:{leap:10,regular:9,monthCode:"M09",days:30},Tamuz:{leap:11,regular:10,monthCode:"M10",days:29},Av:{leap:12,regular:11,monthCode:"M11",days:30},Elul:{leap:13,regular:12,monthCode:"M12",days:29}}}inLeapYear(t){const{year:n}=t;return(7*n+1)%19<7}monthsInYear(t){return this.inLeapYear(t)?13:12}minimumMonthLength(t){return this.minMaxMonthLength(t,"min")}maximumMonthLength(t){return this.minMaxMonthLength(t,"max")}minMaxMonthLength(t,n){const{month:i,year:r}=t,s=this.getMonthCode(r,i),o=Object.entries(this.months).find((c=>c[1].monthCode===s));if(o===void 0)throw new RangeError(`unmatched Hebrew month: ${i}`);const a=o[1].days;return typeof a=="number"?a:a[n]}maxLengthOfMonthCodeInAnyYear(t){return["M04","M06","M08","M10","M12"].includes(t)?29:30}estimateIsoDate(t){const{year:n}=t;return{year:n-3760,month:1,day:1}}getMonthCode(t,n){return this.inLeapYear({year:t})?n===6?Zi(5,!0):Zi(n<6?n:n-1):Zi(n)}adjustCalendarDate(t,n,i="constrain",r=!1){let{year:s,month:o,monthCode:a,day:c,monthExtra:l}=t;if(s===void 0)throw new TypeError("Missing property: year");if(r){if(l){const u=this.months[l];if(!u)throw new RangeError(`Unrecognized month from formatToParts: ${l}`);o=this.inLeapYear({year:s})?u.leap:u.regular}return a=this.getMonthCode(s,o),{year:s,month:o,day:c,monthCode:a}}if(this.validateCalendarDate(t),o===void 0)if(a.endsWith("L")){if(a!=="M05L")throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${a}`);if(o=6,!this.inLeapYear({year:s})){if(i==="reject")throw new RangeError(`Hebrew monthCode M05L is invalid in year ${s} which is not a leap year`);o=6,a="M06"}}else{o=Wo(a),this.inLeapYear({year:s})&&o>=6&&o++;const u=this.monthsInYear({year:s});if(o<1||o>u)throw new RangeError(`Invalid monthCode: ${a}`)}else if(i==="reject"?(Te(o,1,this.monthsInYear({year:s})),Te(c,1,this.maximumMonthLength({year:s,month:o}))):(o=mn(o,1,this.monthsInYear({year:s})),c=mn(c,1,this.maximumMonthLength({year:s,month:o}))),a===void 0)a=this.getMonthCode(s,o);else if(this.getMonthCode(s,o)!==a)throw new RangeError(`monthCode ${a} doesn't correspond to month ${o} in Hebrew year ${s}`);return{...t,day:c,month:o,monthCode:a,year:s}}}class Mc extends ia{constructor(){super(...arguments),this.calendarType="lunar",this.DAYS_PER_ISLAMIC_YEAR=354+11/30,this.DAYS_PER_ISO_YEAR=365.2425}inLeapYear(t,n){const i={year:t.year,month:1,monthCode:"M01",day:1},r={year:t.year+1,month:1,monthCode:"M01",day:1};return this.calendarDaysUntil(i,r,n)===355}monthsInYear(){return 12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(){return 30}estimateIsoDate(t){const{year:n}=this.adjustCalendarDate(t);return{year:Math.floor(n*this.DAYS_PER_ISLAMIC_YEAR/this.DAYS_PER_ISO_YEAR)+622,month:1,day:1}}}class RL extends Mc{constructor(){super(...arguments),this.id="islamic"}}class AL extends Mc{constructor(){super(...arguments),this.id="islamic-umalqura"}}class LL extends Mc{constructor(){super(...arguments),this.id="islamic-tbla"}}class NL extends Mc{constructor(){super(...arguments),this.id="islamic-civil"}}class FL extends Mc{constructor(){super(...arguments),this.id="islamic-rgsa"}}class zL extends Mc{constructor(){super(...arguments),this.id="islamicc"}}class jL extends ia{constructor(){super(...arguments),this.id="persian",this.calendarType="solar"}inLeapYear(t,n){return this.daysInMonth({year:t.year,month:12,day:1},n)===30}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===12?29:n<=6?31:30}maximumMonthLength(t){const{month:n}=t;return n===12?30:n<=6?31:30}maxLengthOfMonthCodeInAnyYear(t){return Wo(t)<=6?31:30}estimateIsoDate(t){const{year:n}=this.adjustCalendarDate(t);return{year:n+621,month:1,day:1}}}class BL extends ia{constructor(){super(...arguments),this.id="indian",this.calendarType="solar",this.months={1:{length:30,month:3,day:22,leap:{length:31,month:3,day:21}},2:{length:31,month:4,day:21},3:{length:31,month:5,day:22},4:{length:31,month:6,day:22},5:{length:31,month:7,day:23},6:{length:31,month:8,day:23},7:{length:30,month:9,day:23},8:{length:30,month:10,day:23},9:{length:30,month:11,day:22},10:{length:30,month:12,day:22},11:{length:30,month:1,nextYear:!0,day:21},12:{length:30,month:2,nextYear:!0,day:20}},this.vulnerableToBceBug=new Date("0000-01-01T00:00Z").toLocaleDateString("en-US-u-ca-indian",{timeZone:"UTC"})!=="10/11/-79 Saka"}inLeapYear(t){return Jv(t.year+78)}monthsInYear(){return 12}minimumMonthLength(t){return this.getMonthInfo(t).length}maximumMonthLength(t){return this.getMonthInfo(t).length}maxLengthOfMonthCodeInAnyYear(t){const n=Wo(t);let i=this.months[n];return i=i.leap??i,i.length}getMonthInfo(t){const{month:n}=t;let i=this.months[n];if(i===void 0)throw new RangeError(`Invalid month: ${n}`);return this.inLeapYear(t)&&i.leap&&(i=i.leap),i}estimateIsoDate(t){const n=this.adjustCalendarDate(t),i=this.getMonthInfo(n);return jn(n.year+78+(i.nextYear?1:0),i.month,i.day+n.day-1)}checkIcuBugs(t){if(this.vulnerableToBceBug&&t.year<1)throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`)}}function Jv(e){return e%4==0&&(e%100!=0||e%400==0)}class UC extends ia{constructor(t,n){super(),this.calendarType="solar",this.id=t,this.isoEpoch=n}inLeapYear(t){const{year:n}=this.estimateIsoDate({month:1,day:1,year:t.year});return Jv(n)}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===2?this.inLeapYear(t)?29:28:[4,6,9,11].indexOf(n)>=0?30:31}maximumMonthLength(t){return this.minimumMonthLength(t)}maxLengthOfMonthCodeInAnyYear(t){return[31,29,31,30,31,30,31,31,30,31,30,31][Wo(t)-1]}estimateIsoDate(t){const n=this.adjustCalendarDate(t);return Nl(n.year+this.isoEpoch.year,n.month+this.isoEpoch.month,n.day+this.isoEpoch.day,"constrain")}}class YC extends ia{constructor(t,n){super(),this.hasEra=!0,this.calendarType="solar",this.id=t;const{eras:i,anchorEra:r}=(function(s){let o,a=s;if(a.length===0)throw new RangeError("Invalid era data: eras are required");if(a.length===1&&a[0].reverseOf)throw new RangeError("Invalid era data: anchor era cannot count years backwards");if(a.length===1&&!a[0].code)throw new RangeError("Invalid era data: at least one named era is required");if(a.filter((l=>l.reverseOf!=null)).length>1)throw new RangeError("Invalid era data: only one era can count years backwards");a.forEach((l=>{if(l.isAnchor||!l.anchorEpoch&&!l.reverseOf){if(o)throw new RangeError("Invalid era data: cannot have multiple anchor eras");o=l,l.anchorEpoch={year:l.hasYearZero?0:1}}else if(!l.code)throw new RangeError("If era name is blank, it must be the anchor era")})),a=a.filter((l=>l.code)),a.forEach((l=>{const{reverseOf:u}=l;if(u){const h=a.find((d=>d.code===u));if(h===void 0)throw new RangeError(`Invalid era data: unmatched reverseOf era: ${u}`);l.reverseOf=h,l.anchorEpoch=h.anchorEpoch,l.isoEpoch=h.isoEpoch}l.anchorEpoch.month===void 0&&(l.anchorEpoch.month=1),l.anchorEpoch.day===void 0&&(l.anchorEpoch.day=1)})),a.sort(((l,u)=>{if(l.reverseOf)return 1;if(u.reverseOf)return-1;if(!l.isoEpoch||!u.isoEpoch)throw new RangeError("Invalid era data: missing ISO epoch");return u.isoEpoch.year-l.isoEpoch.year}));const c=a[a.length-1].reverseOf;if(c&&c!==a[a.length-2])throw new RangeError("Invalid era data: invalid reverse-sign era");return a.forEach(((l,u)=>{l.genericName="era"+(a.length-1-u)})),{eras:a,anchorEra:o||a[0]}})(n);this.anchorEra=r,this.eras=i}inLeapYear(t){const{year:n}=this.estimateIsoDate({month:1,day:1,year:t.year});return Jv(n)}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===2?this.inLeapYear(t)?29:28:[4,6,9,11].indexOf(n)>=0?30:31}maximumMonthLength(t){return this.minimumMonthLength(t)}maxLengthOfMonthCodeInAnyYear(t){return[31,29,31,30,31,30,31,31,30,31,30,31][Wo(t)-1]}completeEraYear(t){const n=(a,c,l)=>{const u=t[a];if(u!=null&&u!=c&&!(l||[]).includes(u)){const h=l?.[0];throw new RangeError(`Input ${a} ${u} doesn't match calculated value ${h?`${c} (also called ${h})`:c}`)}},i=a=>{let c;const l={...t,year:a},u=this.eras.find(((h,d)=>{if(d===this.eras.length-1){if(h.reverseOf){if(a>0)throw new RangeError(`Signed year ${a} is invalid for era ${h.code}`);return c=h.anchorEpoch.year-a,!0}return c=a-h.anchorEpoch.year+(h.hasYearZero?0:1),!0}return this.compareCalendarDates(l,h.anchorEpoch)>=0&&(c=a-h.anchorEpoch.year+(h.hasYearZero?0:1),!0)}));if(!u)throw new RangeError(`Year ${a} was not matched by any era`);return{eraYear:c,era:u.code,eraNames:u.names}};let{year:r,eraYear:s,era:o}=t;if(r!=null){const a=i(r);({eraYear:s,era:o}=a),n("era",o,a?.eraNames),n("eraYear",s)}else{if(s==null)throw new RangeError("Either year or eraYear and era are required");{if(o===void 0)throw new RangeError("era and eraYear must be provided together");const a=this.eras.find((({code:c,names:l=[]})=>c===o||l.includes(o)));if(!a)throw new RangeError(`Era ${o} (ISO year ${s}) was not matched by any era`);r=a.reverseOf?a.anchorEpoch.year-s:s+a.anchorEpoch.year-(a.hasYearZero?0:1),n("year",r),{eraYear:s,era:o}=i(r)}}return{...t,year:r,eraYear:s,era:o}}adjustCalendarDate(t,n,i="constrain"){let r=t;const{month:s,monthCode:o}=r;return s===void 0&&(r={...r,month:Wo(o)}),this.validateCalendarDate(r),r=this.completeEraYear(r),super.adjustCalendarDate(r,n,i)}estimateIsoDate(t){const n=this.adjustCalendarDate(t),{year:i,month:r,day:s}=n,{anchorEra:o}=this;return Nl(i+o.isoEpoch.year-(o.hasYearZero?0:1),r,s,"constrain")}}class t0 extends YC{constructor(t,n){super(t,n)}isoToCalendarDate(t){const{year:n,month:i,day:r}=t,s=Zi(i),o=n-this.anchorEra.isoEpoch.year+1;return this.completeEraYear({year:o,month:i,monthCode:s,day:r})}}const Vi={inLeapYear(e){const{year:t}=e;return(t+1)%4==0},monthsInYear:()=>13,minimumMonthLength(e){const{month:t}=e;return t===13?this.inLeapYear(e)?6:5:30},maximumMonthLength(e){return this.minimumMonthLength(e)},maxLengthOfMonthCodeInAnyYear:e=>e==="M13"?6:30};class WL extends UC{constructor(t,n){super(t,n),this.inLeapYear=Vi.inLeapYear,this.monthsInYear=Vi.monthsInYear,this.minimumMonthLength=Vi.minimumMonthLength,this.maximumMonthLength=Vi.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=Vi.maxLengthOfMonthCodeInAnyYear}}class VC extends YC{constructor(t,n){super(t,n),this.inLeapYear=Vi.inLeapYear,this.monthsInYear=Vi.monthsInYear,this.minimumMonthLength=Vi.minimumMonthLength,this.maximumMonthLength=Vi.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=Vi.maxLengthOfMonthCodeInAnyYear}}class HL extends WL{constructor(){super("ethioaa",{year:-5492,month:7,day:17})}}class UL extends VC{constructor(){super("coptic",[{code:"coptic",isoEpoch:{year:284,month:8,day:29}},{code:"coptic-inverse",reverseOf:"coptic"}])}}class YL extends VC{constructor(){super("ethiopic",[{code:"ethioaa",names:["ethiopic-amete-alem","mundi"],isoEpoch:{year:-5492,month:7,day:17}},{code:"ethiopic",names:["incar"],isoEpoch:{year:8,month:8,day:27},anchorEpoch:{year:5501}}])}}class VL extends t0{constructor(){super("roc",[{code:"roc",names:["minguo"],isoEpoch:{year:1912,month:1,day:1}},{code:"roc-inverse",names:["before-roc"],reverseOf:"roc"}])}}class qL extends UC{constructor(){super("buddhist",{year:-543,month:1,day:1})}}class KL extends t0{constructor(){super("gregory",[{code:"gregory",names:["ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"gregory-inverse",names:["be","bce"],reverseOf:"gregory"}])}reviseIntlEra(t){let{era:n,eraYear:i}=t;return n==="b"&&(n="gregory-inverse"),n==="a"&&(n="gregory"),{era:n,eraYear:i}}getFirstDayOfWeek(){return 1}getMinimalDaysInFirstWeek(){return 1}}class GL extends t0{constructor(){super("japanese",[{code:"reiwa",isoEpoch:{year:2019,month:5,day:1},anchorEpoch:{year:2019,month:5,day:1}},{code:"heisei",isoEpoch:{year:1989,month:1,day:8},anchorEpoch:{year:1989,month:1,day:8}},{code:"showa",isoEpoch:{year:1926,month:12,day:25},anchorEpoch:{year:1926,month:12,day:25}},{code:"taisho",isoEpoch:{year:1912,month:7,day:30},anchorEpoch:{year:1912,month:7,day:30}},{code:"meiji",isoEpoch:{year:1868,month:9,day:8},anchorEpoch:{year:1868,month:9,day:8}},{code:"japanese",names:["japanese","gregory","ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"japanese-inverse",names:["japanese-inverse","gregory-inverse","bc","bce"],reverseOf:"japanese"}]),this.erasBeginMidYear=!0}reviseIntlEra(t,n){const{era:i,eraYear:r}=t,{year:s}=n;return this.eras.find((o=>o.code===i))?{era:i,eraYear:r}:s<1?{era:"japanese-inverse",eraYear:1-s}:{era:"japanese",eraYear:s}}}class qC extends ia{constructor(){super(...arguments),this.calendarType="lunisolar"}inLeapYear(t,n){const i=this.getMonthList(t.year,n);return Object.entries(i).length===13}monthsInYear(t,n){return this.inLeapYear(t,n)?13:12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(t){return["M01L","M09L","M10L","M11L","M12L"].includes(t)?29:30}monthDaySearchStartYear(t,n){const i={M01L:[1651,1651],M02L:[1947,1765],M03L:[1966,1955],M04L:[1963,1944],M05L:[1971,1952],M06L:[1960,1941],M07L:[1968,1938],M08L:[1957,1718],M09L:[1832,1832],M10L:[1870,1870],M11L:[1814,1814],M12L:[1890,1890]}[t]??[1972,1972];return n<30?i[0]:i[1]}getMonthList(t,n){if(t===void 0)throw new TypeError("Missing year");const i=JSON.stringify({func:"getMonthList",calendarYear:t,id:this.id}),r=n.get(i);if(r)return r;const s=this.getFormatter(),o=(m,b)=>{const _=HC({isoYear:m,isoMonth:2,isoDay:1}),C=new Date(_);C.setUTCDate(b+1);const S=s.formatToParts(C),k=S.find((x=>x.type==="month")).value,$=+S.find((x=>x.type==="day")).value,D=S.find((x=>x.type==="relatedYear"));let w;if(D===void 0)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);return w=+D.value,{calendarMonthString:k,calendarDay:$,calendarYearToVerify:w}};let a=17,{calendarMonthString:c,calendarDay:l,calendarYearToVerify:u}=o(t,a);c!=="1"&&(a+=29,{calendarMonthString:c,calendarDay:l}=o(t,a)),a-=l-5;const h={};let d,f,p=1,g=!1;do({calendarMonthString:c,calendarDay:l,calendarYearToVerify:u}=o(t,a)),d&&(h[f].daysInMonth=d+30-l),u!==t?g=!0:(h[c]={monthIndex:p++},a+=30),d=l,f=c;while(!g);return h[f].daysInMonth=d+30-l,n.set(i,h),h}estimateIsoDate(t){const{year:n,month:i}=t;return{year:n,month:i>=12?12:i+1,day:1}}adjustCalendarDate(t,n,i="constrain",r=!1){let{year:s,month:o,monthExtra:a,day:c,monthCode:l}=t;if(s===void 0)throw new TypeError("Missing property: year");if(r){if(a&&a!=="bis")throw new RangeError(`Unexpected leap month suffix: ${a}`);const u=Zi(o,a!==void 0),h=`${o}${a||""}`,d=this.getMonthList(s,n)[h];if(d===void 0)throw new RangeError(`Unmatched month ${h} in Chinese year ${s}`);return o=d.monthIndex,{year:s,month:o,day:c,monthCode:u}}if(this.validateCalendarDate(t),o===void 0){const u=this.getMonthList(s,n);let h=l.replace(/^M|L$/g,(f=>f==="L"?"bis":""));h[0]==="0"&&(h=h.slice(1));let d=u[h];if(o=d&&d.monthIndex,o===void 0&&l.endsWith("L")&&l!="M13L"&&i==="constrain"){const f=+l.replace(/^M0?|L$/g,"");d=u[f],d&&(o=d.monthIndex,l=Zi(f))}if(o===void 0)throw new RangeError(`Unmatched month ${l} in Chinese year ${s}`)}else if(l===void 0){const u=this.getMonthList(s,n),h=Object.entries(u),d=h.length;i==="reject"?(Te(o,1,d),Te(c,1,this.maximumMonthLength())):(o=mn(o,1,d),c=mn(c,1,this.maximumMonthLength()));const f=h.find((p=>p[1].monthIndex===o));if(f===void 0)throw new RangeError(`Invalid month ${o} in Chinese year ${s}`);l=Zi(+f[0].replace("bis",""),f[0].indexOf("bis")!==-1)}else{const u=this.getMonthList(s,n);let h=l.replace(/^M|L$/g,(f=>f==="L"?"bis":""));h[0]==="0"&&(h=h.slice(1));const d=u[h];if(!d)throw new RangeError(`Unmatched monthCode ${l} in Chinese year ${s}`);if(o!==d.monthIndex)throw new RangeError(`monthCode ${l} doesn't correspond to month ${o} in Chinese year ${s}`)}return{...t,year:s,month:o,monthCode:l,day:c}}}class XL extends qC{constructor(){super(...arguments),this.id="chinese"}}class QL extends qC{constructor(){super(...arguments),this.id="dangi"}}class ZL{constructor(t){this.helper=t}extraFields(t){return this.helper.hasEra&&t.includes("year")?["era","eraYear"]:[]}resolveFields(t){if(this.helper.calendarType!=="lunisolar"){const n=new $e;Zv(t,void 0,this.helper.monthsInYear({year:t.year??1972},n))}}dateToISO(t,n){const i=new $e,r=this.helper.calendarToIsoDate(t,n,i);return i.setObject(r),r}monthDayToISOReferenceDate(t,n){const i=new $e,r=this.helper.monthDayFromFields(t,n,i);return i.setObject(r),r}fieldKeysToIgnore(t){const n=new Set;for(let i=0;i<t.length;i++){const r=t[i];switch(n.add(r),r){case"era":n.add("eraYear"),n.add("year");break;case"eraYear":n.add("era"),n.add("year");break;case"year":n.add("era"),n.add("eraYear");break;case"month":n.add("monthCode"),this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"));break;case"monthCode":n.add("month"),this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"));break;case"day":this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"))}}return BC(n)}dateAdd(t,{years:n,months:i,weeks:r,days:s},o){const a=$e.getCacheForObject(t),c=this.helper.isoToCalendarDate(t,a),l=this.helper.addCalendar(c,{years:n,months:i,weeks:r,days:s},o,a),u=this.helper.calendarToIsoDate(l,"constrain",a);return $e.getCacheForObject(u)||new $e(a).setObject(u),u}dateUntil(t,n,i){const r=$e.getCacheForObject(t),s=$e.getCacheForObject(n),o=this.helper.isoToCalendarDate(t,r),a=this.helper.isoToCalendarDate(n,s);return this.helper.untilCalendar(o,a,i,r)}isoToDate(t,n){const i=$e.getCacheForObject(t),r=this.helper.isoToCalendarDate(t,i);if(n.dayOfWeek&&(r.dayOfWeek=eh.iso8601.isoToDate(t,{dayOfWeek:!0}).dayOfWeek),n.dayOfYear){const s=this.helper.startOfCalendarYear(r),o=this.helper.calendarDaysUntil(s,r,i);r.dayOfYear=o+1}if(n.weekOfYear&&(r.weekOfYear=WC(this.helper.id,t)),r.daysInWeek=7,n.daysInMonth&&(r.daysInMonth=this.helper.daysInMonth(r,i)),n.daysInYear){const s=this.helper.startOfCalendarYear(r),o=this.helper.addCalendar(s,{years:1},"constrain",i);r.daysInYear=this.helper.calendarDaysUntil(s,o,i)}return n.monthsInYear&&(r.monthsInYear=this.helper.monthsInYear(r,i)),n.inLeapYear&&(r.inLeapYear=this.helper.inLeapYear(r,i)),r}getFirstDayOfWeek(){return this.helper.getFirstDayOfWeek()}getMinimalDaysInFirstWeek(){return this.helper.getMinimalDaysInFirstWeek()}}for(const e of[PL,jL,YL,HL,UL,XL,QL,VL,BL,qL,KL,GL,RL,AL,LL,NL,FL,zL]){const t=new e;eh[t.id]=new ZL(t)}om("calendarImpl",(function(e){return eh[e]}));const bu=Intl.DateTimeFormat;function ua(e,t){let n=y(e,t);return typeof n=="function"&&(n=new bu(y(e,rC),n(y(e,nm))),(function(i,r,s){const o=Lf(i);if(o===void 0)throw new TypeError("Missing slots for the given container");if(o[r]===void 0)throw new TypeError(`tried to reset ${r} which was not set`);o[r]=s})(e,t,n)),n}function Wc(e){return xn(e,ea)}class _u{constructor(t=void 0,n=void 0){(function(i,r,s){const o=s!==void 0;let a;if(o){const h=["localeMatcher","calendar","numberingSystem","hour12","hourCycle","timeZone","weekday","era","year","month","day","dayPeriod","hour","minute","second","fractionalSecondDigits","timeZoneName","formatMatcher","dateStyle","timeStyle"];a=(function(f){if(f==null)throw new TypeError(`Expected object not ${f}`);return Object(f)})(s);const d=Object.create(null);for(let f=0;f<h.length;f++){const p=h[f];Object.prototype.hasOwnProperty.call(a,p)&&(d[p]=a[p])}a=d}else a=Object.create(null);const c=new bu(r,a),l=c.resolvedOptions();if(ts(i),o){const h=Object.assign(Object.create(null),l);for(const d in h)Object.prototype.hasOwnProperty.call(a,d)||delete h[d];h.hour12=a.hour12,h.hourCycle=a.hourCycle,ht(i,nm,h)}else ht(i,nm,a);ht(i,rC,l.locale),ht(i,ea,c),ht(i,_a,l.timeZone),ht(i,rl,l.calendar),ht(i,Z2,a5),ht(i,J2,s5),ht(i,tC,o5),ht(i,eC,r5),ht(i,nC,c5),ht(i,iC,l5);const u=o?a.timeZone:void 0;if(u===void 0)ht(i,em,l.timeZone);else{const h=jf(u);if(h.startsWith("−"))throw new RangeError("Unicode minus (U+2212) is not supported in time zone offsets");ht(i,em,yn(h))}})(this,t,n)}get format(){I(this,Wc);const t=t5.bind(this);return Object.defineProperties(t,{length:{value:1,enumerable:!1,writable:!1,configurable:!0},name:{value:"",enumerable:!1,writable:!1,configurable:!0}}),t}formatRange(t,n){return I(this,Wc),n5.call(this,t,n)}formatToParts(t,...n){return I(this,Wc),e5.call(this,t,...n)}formatRangeToParts(t,n){return I(this,Wc),i5.call(this,t,n)}resolvedOptions(){return I(this,Wc),JL.call(this)}}"formatToParts"in bu.prototype||delete _u.prototype.formatToParts,"formatRangeToParts"in bu.prototype||delete _u.prototype.formatRangeToParts;const gi=function(e=void 0,t=void 0){return new _u(e,t)};function JL(){const e=y(this,ea).resolvedOptions();return e.timeZone=y(this,em),e}function t5(e,...t){let n,i,r=oc(e,this);return r.formatter?(n=r.formatter,i=[xi(r.epochNs,"floor")]):(n=y(this,ea),i=[e,...t]),n.format(...i)}function e5(e,...t){let n,i,r=oc(e,this);return r.formatter?(n=r.formatter,i=[xi(r.epochNs,"floor")]):(n=y(this,ea),i=[e,...t]),n.formatToParts(...i)}function n5(e,t){if(e===void 0||t===void 0)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=Zd(e),i=Zd(t);let r,s=[n,i];if(zr(n)!==zr(i))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");if(zr(n)){if(!KC(n,i))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");const{epochNs:o,formatter:a}=oc(n,this),{epochNs:c,formatter:l}=oc(i,this);a&&(r=a,s=[xi(o,"floor"),xi(c,"floor")])}return r||(r=y(this,ea)),r.formatRange(...s)}function i5(e,t){if(e===void 0||t===void 0)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=Zd(e),i=Zd(t);let r,s=[n,i];if(zr(n)!==zr(i))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");if(zr(n)){if(!KC(n,i))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");const{epochNs:o,formatter:a}=oc(n,this),{epochNs:c,formatter:l}=oc(i,this);a&&(r=a,s=[xi(o,"floor"),xi(c,"floor")])}return r||(r=y(this,ea)),r.formatRangeToParts(...s)}function nh(e={},t={}){const n=Object.assign({},e),i=["year","month","day","hour","minute","second","weekday","dayPeriod","timeZoneName","dateStyle","timeStyle"];for(let r=0;r<i.length;r++){const s=i[r];n[s]=s in t?t[s]:n[s],n[s]!==!1&&n[s]!==void 0||delete n[s]}return n}function r5(e){const t=nh(e,{year:!1,month:!1,day:!1,weekday:!1,timeZoneName:!1,dateStyle:!1});if(t.timeStyle!=="long"&&t.timeStyle!=="full"||(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"})),!Gf(t)){if(ih(e))throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(e)}]`);Object.assign(t,{hour:"numeric",minute:"numeric",second:"numeric"})}return t}function s5(e){const t={short:{year:"2-digit",month:"numeric"},medium:{year:"numeric",month:"short"},long:{year:"numeric",month:"long"},full:{year:"numeric",month:"long"}},n=nh(e,{day:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const i=n.dateStyle;delete n.dateStyle,Object.assign(n,t[i])}if(!("year"in n||"month"in n||"era"in n)){if(ih(e))throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(e)}]`);Object.assign(n,{year:"numeric",month:"numeric"})}return n}function o5(e){const t={short:{month:"numeric",day:"numeric"},medium:{month:"short",day:"numeric"},long:{month:"long",day:"numeric"},full:{month:"long",day:"numeric"}},n=nh(e,{year:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const i=n.dateStyle;delete n.dateStyle,Object.assign(n,t[i])}if(!("month"in n)&&!("day"in n)){if(ih(e))throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(e)}]`);Object.assign(n,{month:"numeric",day:"numeric"})}return n}function a5(e){const t=nh(e,{hour:!1,minute:!1,second:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if(!Kf(t)){if(ih(e))throw new TypeError(`cannot format PlainDate with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric"})}return t}function c5(e){const t=nh(e,{timeZoneName:!1});if((t.timeStyle==="long"||t.timeStyle==="full")&&(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"}),t.dateStyle)&&(Object.assign(t,{short:{year:"numeric",month:"numeric",day:"numeric"},medium:{year:"numeric",month:"short",day:"numeric"},long:{year:"numeric",month:"long",day:"numeric"},full:{year:"numeric",month:"long",day:"numeric",weekday:"long"}}[t.dateStyle]),delete t.dateStyle),!Gf(t)&&!Kf(t)){if(ih(e))throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}return t}function l5(e){let t=e;return Gf(t)||Kf(t)||(t=Object.assign({},t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),t}function Kf(e){return"year"in e||"month"in e||"day"in e||"weekday"in e||"dateStyle"in e||"era"in e}function Gf(e){return"hour"in e||"minute"in e||"second"in e||"timeStyle"in e||"dayPeriod"in e||"fractionalSecondDigits"in e}function ih(e){return Kf(e)||Gf(e)||"dateStyle"in e||"timeStyle"in e||"timeZoneName"in e}function zr(e){return ne(e)||ce(e)||jt(e)||ft(e)||Le(e)||Kn(e)||Ae(e)}function Zd(e){return zr(e)?e:zf(e)}function KC(e,t){return!(!zr(e)||!zr(t)||ce(e)&&!ce(t)||ne(e)&&!ne(t)||jt(e)&&!jt(t)||ft(e)&&!ft(t)||Le(e)&&!Le(t)||Kn(e)&&!Kn(t)||Ae(e)&&!Ae(t))}function oc(e,t){if(ce(e)){const n={isoDate:{year:1970,month:1,day:1},time:y(e,ie)};return{epochNs:Ze(y(t,_a),n,"compatible"),formatter:ua(t,eC)}}if(Le(e)){const n=y(e,A),i=y(t,rl);if(n!==i)throw new RangeError(`cannot format PlainYearMonth with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,_a),r,"compatible"),formatter:ua(t,J2)}}if(Kn(e)){const n=y(e,A),i=y(t,rl);if(n!==i)throw new RangeError(`cannot format PlainMonthDay with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,_a),r,"compatible"),formatter:ua(t,tC)}}if(ne(e)){const n=y(e,A),i=y(t,rl);if(n!=="iso8601"&&n!==i)throw new RangeError(`cannot format PlainDate with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,_a),r,"compatible"),formatter:ua(t,Z2)}}if(jt(e)){const n=y(e,A),i=y(t,rl);if(n!=="iso8601"&&n!==i)throw new RangeError(`cannot format PlainDateTime with calendar ${n} in locale with calendar ${i}`);const r=y(e,Ut);return{epochNs:Ze(y(t,_a),r,"compatible"),formatter:ua(t,nC)}}if(ft(e))throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");return Ae(e)?{epochNs:y(e,it),formatter:ua(t,iC)}:{}}function GC(e){const t=Object.create(null);return t.years=y(e,cn),t.months=y(e,ln),t.weeks=y(e,In),t.days=y(e,un),t.hours=y(e,hn),t.minutes=y(e,dn),t.seconds=y(e,fn),t.milliseconds=y(e,pn),t.microseconds=y(e,gn),t.nanoseconds=y(e,Pn),t}_u.prototype.constructor=gi,Object.defineProperty(gi,"prototype",{value:_u.prototype,writable:!1,enumerable:!1,configurable:!1}),gi.supportedLocalesOf=bu.supportedLocalesOf,es(gi,"Intl.DateTimeFormat");const{format:u5,formatToParts:h5}=Intl.DurationFormat?.prototype??Object.create(null);function XC(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=GC(mi(e));return u5.call(this,t)}Intl.DurationFormat?.prototype&&(Intl.DurationFormat.prototype.format=XC,Intl.DurationFormat.prototype.formatToParts=function(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=GC(mi(e));return h5.call(this,t)});class e0{constructor(t){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");CC(this,Qd(t))}get epochMilliseconds(){return I(this,Ae),xi(y(this,it),"floor")}get epochNanoseconds(){return I(this,Ae),zC(v.BigInt(y(this,it)))}add(t){return I(this,Ae),jb("add",this,t)}subtract(t){return I(this,Ae),jb("subtract",this,t)}until(t,n=void 0){return I(this,Ae),Pb("until",this,t,n)}since(t,n=void 0){return I(this,Ae),Pb("since",this,t,n)}round(t){if(I(this,Ae),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Bo("smallestUnit",t):K(t),i=Cc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Vr);return kc(i,{hour:24,minute:1440,second:86400,millisecond:864e5,microsecond:864e8,nanosecond:864e11}[s],!0),Ki(mm(y(this,it),i,s,r))}equals(t){I(this,Ae);const n=al(t),i=y(this,it),r=y(n,it);return v.equal(v.BigInt(i),v.BigInt(r))}toString(t=void 0){I(this,Ae);const n=K(t),i=qu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');let o=n.timeZone;o!==void 0&&(o=yn(o));const{precision:a,unit:c,increment:l}=Ku(s,i);return kb(Ki(mm(y(this,it),l,c,r)),o,a)}toJSON(){return I(this,Ae),kb(this,void 0,"auto")}toLocaleString(t=void 0,n=void 0){return I(this,Ae),new gi(t,n).format(this)}valueOf(){Ys("Instant")}toZonedDateTimeISO(t){I(this,Ae);const n=yn(t);return Ge(y(this,it),n,"iso8601")}static fromEpochMilliseconds(t){return Ki(Xi(zf(t)))}static fromEpochNanoseconds(t){return Ki(Qd(t))}static from(t){return al(t)}static compare(t,n){const i=al(t),r=al(n),s=y(i,it),o=y(r,it);return v.lessThan(s,o)?-1:v.greaterThan(s,o)?1:0}}es(e0,"Temporal.Instant");class n0{constructor(t,n,i,r="iso8601"){const s=st(t),o=st(n),a=st(i),c=Cn(r===void 0?"iso8601":Se(r));Fo(s,o,a),yC(this,{year:s,month:o,day:a},c)}get calendarId(){return I(this,ne),y(this,A)}get era(){return rn(this,"era")}get eraYear(){return rn(this,"eraYear")}get year(){return rn(this,"year")}get month(){return rn(this,"month")}get monthCode(){return rn(this,"monthCode")}get day(){return rn(this,"day")}get dayOfWeek(){return rn(this,"dayOfWeek")}get dayOfYear(){return rn(this,"dayOfYear")}get weekOfYear(){return rn(this,"weekOfYear")?.week}get yearOfWeek(){return rn(this,"weekOfYear")?.year}get daysInWeek(){return rn(this,"daysInWeek")}get daysInMonth(){return rn(this,"daysInMonth")}get daysInYear(){return rn(this,"daysInYear")}get monthsInYear(){return rn(this,"monthsInYear")}get inLeapYear(){return rn(this,"inLeapYear")}with(t,n=void 0){if(I(this,ne),!re(t))throw new TypeError("invalid argument");xc(t);const i=y(this,A);let r=_n(i,y(this,rt));return r=No(i,r,ni(i,t,["year","month","monthCode","day"],[],"partial")),vn(Ls(i,r,St(K(n))),i)}withCalendar(t){I(this,ne);const n=Zu(t);return vn(y(this,rt),n)}add(t,n=void 0){return I(this,ne),Bb("add",this,t,n)}subtract(t,n=void 0){return I(this,ne),Bb("subtract",this,t,n)}until(t,n=void 0){return I(this,ne),Rb("until",this,t,n)}since(t,n=void 0){return I(this,ne),Rb("since",this,t,n)}equals(t){I(this,ne);const n=sl(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return I(this,ne),Sb(this,Vu(K(t)))}toJSON(){return I(this,ne),Sb(this)}toLocaleString(t=void 0,n=void 0){return I(this,ne),new gi(t,n).format(this)}valueOf(){Ys("PlainDate")}toPlainDateTime(t=void 0){I(this,ne);const n=vC(t);return fi(Mt(y(this,rt),n),y(this,A))}toZonedDateTime(t){let n,i;if(I(this,ne),re(t)){const o=t.timeZone;o===void 0?n=yn(t):(n=yn(o),i=t.plainTime)}else n=yn(t);const r=y(this,rt);let s;return i===void 0?s=cs(n,r):(i=vs(i),s=Ze(n,Mt(r,y(i,ie)),"compatible")),Ge(s,n,y(this,A))}toPlainYearMonth(){I(this,ne);const t=y(this,A);return Na(pu(t,_n(t,y(this,rt)),"constrain"),t)}toPlainMonthDay(){I(this,ne);const t=y(this,A);return $a(Vd(t,_n(t,y(this,rt)),"constrain"),t)}static from(t,n=void 0){return sl(t,n)}static compare(t,n){const i=sl(t),r=sl(n);return or(y(i,rt),y(r,rt))}}function rn(e,t){I(e,ne);const n=y(e,rt);return Gu(e).isoToDate(n,{[t]:!0})[t]}es(n0,"Temporal.PlainDate");class i0{constructor(t,n,i,r=0,s=0,o=0,a=0,c=0,l=0,u="iso8601"){const h=st(t),d=st(n),f=st(i),p=r===void 0?0:st(r),g=s===void 0?0:st(s),m=o===void 0?0:st(o),b=a===void 0?0:st(a),_=c===void 0?0:st(c),C=l===void 0?0:st(l),S=Cn(u===void 0?"iso8601":Se(u));Kv(h,d,f,p,g,m,b,_,C),bC(this,{isoDate:{year:h,month:d,day:f},time:{hour:p,minute:g,second:m,millisecond:b,microsecond:_,nanosecond:C}},S)}get calendarId(){return I(this,jt),y(this,A)}get year(){return sn(this,"year")}get month(){return sn(this,"month")}get monthCode(){return sn(this,"monthCode")}get day(){return sn(this,"day")}get hour(){return ha(this,"hour")}get minute(){return ha(this,"minute")}get second(){return ha(this,"second")}get millisecond(){return ha(this,"millisecond")}get microsecond(){return ha(this,"microsecond")}get nanosecond(){return ha(this,"nanosecond")}get era(){return sn(this,"era")}get eraYear(){return sn(this,"eraYear")}get dayOfWeek(){return sn(this,"dayOfWeek")}get dayOfYear(){return sn(this,"dayOfYear")}get weekOfYear(){return sn(this,"weekOfYear")?.week}get yearOfWeek(){return sn(this,"weekOfYear")?.year}get daysInWeek(){return sn(this,"daysInWeek")}get daysInYear(){return sn(this,"daysInYear")}get daysInMonth(){return sn(this,"daysInMonth")}get monthsInYear(){return sn(this,"monthsInYear")}get inLeapYear(){return sn(this,"inLeapYear")}with(t,n=void 0){if(I(this,jt),!re(t))throw new TypeError("invalid argument");xc(t);const i=y(this,A),r=y(this,Ut);let s={..._n(i,r.isoDate),...r.time};return s=No(i,s,ni(i,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],"partial")),fi(Xu(i,s,St(K(n))),i)}withPlainTime(t=void 0){I(this,jt);const n=vC(t);return fi(Mt(y(this,Ut).isoDate,n),y(this,A))}withCalendar(t){I(this,jt);const n=Zu(t);return fi(y(this,Ut),n)}add(t,n=void 0){return I(this,jt),Wb("add",this,t,n)}subtract(t,n=void 0){return I(this,jt),Wb("subtract",this,t,n)}until(t,n=void 0){return I(this,jt),Ab("until",this,t,n)}since(t,n=void 0){return I(this,jt),Ab("since",this,t,n)}round(t){if(I(this,jt),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Bo("smallestUnit",t):K(t),i=Cc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Vr,["day"]),o={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s];kc(i,o,o===1);const a=y(this,Ut);return fi(i===1&&s==="nanosecond"?a:vm(a,i,s,r),y(this,A))}equals(t){I(this,jt);const n=ol(t);return sc(y(this,Ut),y(n,Ut))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){I(this,jt);const n=K(t),i=Vu(n),r=qu(n),s=Pi(n,"trunc"),o=Nn(n,"smallestUnit","time",void 0);if(o==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:a,unit:c,increment:l}=Ku(o,r),u=vm(y(this,Ut),l,c,s);return zo(u),mu(u,y(this,A),a,i)}toJSON(){return I(this,jt),mu(y(this,Ut),y(this,A),"auto")}toLocaleString(t=void 0,n=void 0){return I(this,jt),new gi(t,n).format(this)}valueOf(){Ys("PlainDateTime")}toZonedDateTime(t,n=void 0){I(this,jt);const i=yn(t),r=Fl(K(n));return Ge(Ze(i,y(this,Ut),r),i,y(this,A))}toPlainDate(){return I(this,jt),vn(y(this,Ut).isoDate,y(this,A))}toPlainTime(){return I(this,jt),Dr(y(this,Ut).time)}static from(t,n=void 0){return ol(t,n)}static compare(t,n){const i=ol(t),r=ol(n);return sc(y(i,Ut),y(r,Ut))}}function sn(e,t){I(e,jt);const n=y(e,Ut).isoDate;return Gu(e).isoToDate(n,{[t]:!0})[t]}function ha(e,t){return I(e,jt),y(e,Ut).time[t]}es(i0,"Temporal.PlainDateTime");class ac{constructor(t=0,n=0,i=0,r=0,s=0,o=0,a=0,c=0,l=0,u=0){const h=t===void 0?0:Ei(t),d=n===void 0?0:Ei(n),f=i===void 0?0:Ei(i),p=r===void 0?0:Ei(r),g=s===void 0?0:Ei(s),m=o===void 0?0:Ei(o),b=a===void 0?0:Ei(a),_=c===void 0?0:Ei(c),C=l===void 0?0:Ei(l),S=u===void 0?0:Ei(u);Vf(h,d,f,p,g,m,b,_,C,S),ts(this),ht(this,cn,h),ht(this,ln,d),ht(this,In,f),ht(this,un,p),ht(this,hn,g),ht(this,dn,m),ht(this,fn,b),ht(this,pn,_),ht(this,gn,C),ht(this,Pn,S)}get years(){return I(this,te),y(this,cn)}get months(){return I(this,te),y(this,ln)}get weeks(){return I(this,te),y(this,In)}get days(){return I(this,te),y(this,un)}get hours(){return I(this,te),y(this,hn)}get minutes(){return I(this,te),y(this,dn)}get seconds(){return I(this,te),y(this,fn)}get milliseconds(){return I(this,te),y(this,pn)}get microseconds(){return I(this,te),y(this,gn)}get nanoseconds(){return I(this,te),y(this,Pn)}get sign(){return I(this,te),Gd(this)}get blank(){return I(this,te),Gd(this)===0}with(t){I(this,te);const n=mC(t),{years:i=y(this,cn),months:r=y(this,ln),weeks:s=y(this,In),days:o=y(this,un),hours:a=y(this,hn),minutes:c=y(this,dn),seconds:l=y(this,fn),milliseconds:u=y(this,pn),microseconds:h=y(this,gn),nanoseconds:d=y(this,Pn)}=n;return new ac(i,r,s,o,a,c,l,u,h,d)}negated(){return I(this,te),Bn(this)}abs(){return I(this,te),new ac(Math.abs(y(this,cn)),Math.abs(y(this,ln)),Math.abs(y(this,In)),Math.abs(y(this,un)),Math.abs(y(this,hn)),Math.abs(y(this,dn)),Math.abs(y(this,fn)),Math.abs(y(this,pn)),Math.abs(y(this,gn)),Math.abs(y(this,Pn)))}add(t){return I(this,te),zb("add",this,t)}subtract(t){return I(this,te),zb("subtract",this,t)}round(t){if(I(this,te),t===void 0)throw new TypeError("options parameter is required");const n=Er(this),i=typeof t=="string"?Bo("smallestUnit",t):K(t);let r=Nn(i,"largestUnit","datetime",void 0,["auto"]),{plainRelativeTo:s,zonedRelativeTo:o}=Up(i);const a=Cc(i),c=Pi(i,"halfExpand");let l=Nn(i,"smallestUnit","datetime",void 0),u=!0;l||(u=!1,l="nanosecond");const h=Lr(n,l);let d=!0;if(r||(d=!1,r=h),r==="auto"&&(r=h),!u&&!d)throw new RangeError("at least one of smallestUnit or largestUnit is required");if(Lr(r,l)!==r)throw new RangeError(`largestUnit ${r} cannot be smaller than smallestUnit ${l}`);const f={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[l];if(f!==void 0&&kc(a,f,!1),a>1&&Mr(l)==="date"&&r!==l)throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");if(o){let g=wa(this);const m=y(o,Tt),b=y(o,A),_=y(o,it);return g=FC(_,ul(_,m,b,g),m,b,r,a,l,c),Mr(r)==="date"&&(r="hour"),pi(g,r)}if(s){let g=Gi(this);const m=rc({hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},g.time),b=y(s,rt),_=y(s,A),C=Zn(_,b,Xe(g.date,m.deltaDays),"constrain");return g=NC(Mt(b,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Mt(C,m),_,r,a,l,c),pi(g,r)}if(Ui(n))throw new RangeError(`a starting point is required for ${n}s balancing`);if(Ui(r))throw new RangeError(`a starting point is required for ${r}s balancing`);let p=Gi(this);if(l==="day"){const{quotient:g,remainder:m}=p.time.divmod(Hd);let b=p.date.days+g+zl(m,"day");b=ys(b,a,c),p=Nr({years:0,months:0,weeks:0,days:b},pt.ZERO)}else p=Nr({years:0,months:0,weeks:0,days:0},Xd(p.time,a,l,c));return pi(p,r)}total(t){if(I(this,te),t===void 0)throw new TypeError("options argument is required");const n=typeof t=="string"?Bo("unit",t):K(t);let{plainRelativeTo:i,zonedRelativeTo:r}=Up(n);const s=Nn(n,"unit","datetime",Vr);if(r){const a=wa(this),c=y(r,Tt),l=y(r,A),u=y(r,it);return(function(h,d,f,p,g){return Mr(g)==="time"?zl(pt.fromEpochNsDiff(d,h),g):Ib(AC(h,d,f,p,g),d,wi(f,h),f,p,g)})(u,ul(u,c,l,a),c,l,s)}if(i){const a=Gi(this);let c=rc({hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},a.time);const l=y(i,rt),u=y(i,A),h=Zn(u,l,Xe(a.date,c.deltaDays),"constrain");return(function(d,f,p,g){if(sc(d,f)==0)return 0;zo(d),zo(f);const m=RC(d,f,p,g);return g==="nanosecond"?v.toNumber(m.time.totalNs):Ib(m,ze(f),d,null,p,g)})(Mt(l,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Mt(h,c),u,s)}const o=Er(this);if(Ui(o))throw new RangeError(`a starting point is required for ${o}s total`);if(Ui(s))throw new RangeError(`a starting point is required for ${s}s total`);return zl(Gi(this).time,s)}toString(t=void 0){I(this,te);const n=K(t),i=qu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour"||s==="minute")throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');const{precision:o,unit:a,increment:c}=Ku(s,i);if(a==="nanosecond"&&c===1)return mh(this,o);const l=Er(this);let u=wa(this);const h=Xd(u.time,c,a,r);return u=Nr(u.date,h),mh(pi(u,Lr(l,"second")),o)}toJSON(){return I(this,te),mh(this,"auto")}toLocaleString(t=void 0,n=void 0){if(I(this,te),typeof Intl.DurationFormat=="function"){const i=new Intl.DurationFormat(t,n);return XC.call(i,this)}return console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."),mh(this,"auto")}valueOf(){Ys("Duration")}static from(t){return mi(t)}static compare(t,n,i=void 0){const r=mi(t),s=mi(n),o=K(i),{plainRelativeTo:a,zonedRelativeTo:c}=Up(o);if(y(r,cn)===y(s,cn)&&y(r,ln)===y(s,ln)&&y(r,In)===y(s,In)&&y(r,un)===y(s,un)&&y(r,hn)===y(s,hn)&&y(r,dn)===y(s,dn)&&y(r,fn)===y(s,fn)&&y(r,pn)===y(s,pn)&&y(r,gn)===y(s,gn)&&y(r,Pn)===y(s,Pn))return 0;const l=Er(r),u=Er(s),h=wa(r),d=wa(s);if(c&&(Mr(l)==="date"||Mr(u)==="date")){const b=y(c,Tt),_=y(c,A),C=y(c,it),S=ul(C,b,_,h),k=ul(C,b,_,d);return Rn(v.toNumber(v.subtract(S,k)))}let f=h.date.days,p=d.date.days;if(Ui(l)||Ui(u)){if(!a)throw new RangeError("A starting point is required for years, months, or weeks comparison");f=Ob(h.date,a),p=Ob(d.date,a)}const g=h.time.add24HourDays(f),m=d.time.add24HourDays(p);return g.cmp(m)}}es(ac,"Temporal.Duration");class r0{constructor(t,n,i="iso8601",r=1972){const s=st(t),o=st(n),a=Cn(i===void 0?"iso8601":Se(i)),c=st(r);Fo(c,s,o),_C(this,{year:c,month:s,day:o},a)}get monthCode(){return qb(this,"monthCode")}get day(){return qb(this,"day")}get calendarId(){return I(this,Kn),y(this,A)}with(t,n=void 0){if(I(this,Kn),!re(t))throw new TypeError("invalid argument");xc(t);const i=y(this,A);let r=_n(i,y(this,rt),"month-day");return r=No(i,r,ni(i,t,["year","month","monthCode","day"],[],"partial")),$a(Vd(i,r,St(K(n))),i)}equals(t){I(this,Kn);const n=xb(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return I(this,Kn),Mb(this,Vu(K(t)))}toJSON(){return I(this,Kn),Mb(this)}toLocaleString(t=void 0,n=void 0){return I(this,Kn),new gi(t,n).format(this)}valueOf(){Ys("PlainMonthDay")}toPlainDate(t){if(I(this,Kn),!re(t))throw new TypeError("argument should be an object");const n=y(this,A);return vn(Ls(n,No(n,_n(n,y(this,rt),"month-day"),ni(n,t,["year"],[],[])),"constrain"),n)}static from(t,n=void 0){return xb(t,n)}}function qb(e,t){I(e,Kn);const n=y(e,rt);return Gu(e).isoToDate(n,{[t]:!0})[t]}function Vp(e){return wi(e,_m())}es(r0,"Temporal.PlainMonthDay");const QC={instant:()=>Ki(_m()),plainDateTimeISO:(e=Bc())=>fi(Vp(yn(e)),"iso8601"),plainDateISO:(e=Bc())=>vn(Vp(yn(e)).isoDate,"iso8601"),plainTimeISO:(e=Bc())=>Dr(Vp(yn(e)).time),timeZoneId:()=>Bc(),zonedDateTimeISO:(e=Bc())=>{const t=yn(e);return Ge(_m(),t,"iso8601")},[Symbol.toStringTag]:"Temporal.Now"};Object.defineProperty(QC,Symbol.toStringTag,{value:"Temporal.Now",writable:!1,enumerable:!1,configurable:!0});class rh{constructor(t=0,n=0,i=0,r=0,s=0,o=0){const a=t===void 0?0:st(t),c=n===void 0?0:st(n),l=i===void 0?0:st(i),u=r===void 0?0:st(r),h=s===void 0?0:st(s),d=o===void 0?0:st(o);Yf(a,c,l,u,h,d),wC(this,{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d})}get hour(){return I(this,ce),y(this,ie).hour}get minute(){return I(this,ce),y(this,ie).minute}get second(){return I(this,ce),y(this,ie).second}get millisecond(){return I(this,ce),y(this,ie).millisecond}get microsecond(){return I(this,ce),y(this,ie).microsecond}get nanosecond(){return I(this,ce),y(this,ie).nanosecond}with(t,n=void 0){if(I(this,ce),!re(t))throw new TypeError("invalid argument");xc(t);const i=um(t,"partial"),r=um(this);let{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=Object.assign(r,i);const h=St(K(n));return{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=Wf(s,o,a,c,l,u,h),new rh(s,o,a,c,l,u)}add(t){return I(this,ce),Hb("add",this,t)}subtract(t){return I(this,ce),Hb("subtract",this,t)}until(t,n=void 0){return I(this,ce),Lb("until",this,t,n)}since(t,n=void 0){return I(this,ce),Lb("since",this,t,n)}round(t){if(I(this,ce),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Bo("smallestUnit",t):K(t),i=Cc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Vr);return kc(i,{hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s],!1),Dr(ym(y(this,ie),i,s,r))}equals(t){I(this,ce);const n=vs(t);return bm(y(this,ie),y(n,ie))===0}toString(t=void 0){I(this,ce);const n=K(t),i=qu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:o,unit:a,increment:c}=Ku(s,i);return Eb(ym(y(this,ie),c,a,r),o)}toJSON(){return I(this,ce),Eb(y(this,ie),"auto")}toLocaleString(t=void 0,n=void 0){return I(this,ce),new gi(t,n).format(this)}valueOf(){Ys("PlainTime")}static from(t,n=void 0){return vs(t,n)}static compare(t,n){const i=vs(t),r=vs(n);return bm(y(i,ie),y(r,ie))}}es(rh,"Temporal.PlainTime");class s0{constructor(t,n,i="iso8601",r=1){const s=st(t),o=st(n),a=Cn(i===void 0?"iso8601":Se(i)),c=st(r);Fo(s,o,c),xC(this,{year:s,month:o,day:c},a)}get year(){return yr(this,"year")}get month(){return yr(this,"month")}get monthCode(){return yr(this,"monthCode")}get calendarId(){return I(this,Le),y(this,A)}get era(){return yr(this,"era")}get eraYear(){return yr(this,"eraYear")}get daysInMonth(){return yr(this,"daysInMonth")}get daysInYear(){return yr(this,"daysInYear")}get monthsInYear(){return yr(this,"monthsInYear")}get inLeapYear(){return yr(this,"inLeapYear")}with(t,n=void 0){if(I(this,Le),!re(t))throw new TypeError("invalid argument");xc(t);const i=y(this,A);let r=_n(i,y(this,rt),"year-month");return r=No(i,r,ni(i,t,["year","month","monthCode"],[],"partial")),Na(pu(i,r,St(K(n))),i)}add(t,n=void 0){return I(this,Le),Ub("add",this,t,n)}subtract(t,n=void 0){return I(this,Le),Ub("subtract",this,t,n)}until(t,n=void 0){return I(this,Le),Nb("until",this,t,n)}since(t,n=void 0){return I(this,Le),Nb("since",this,t,n)}equals(t){I(this,Le);const n=cl(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return I(this,Le),Db(this,Vu(K(t)))}toJSON(){return I(this,Le),Db(this)}toLocaleString(t=void 0,n=void 0){return I(this,Le),new gi(t,n).format(this)}valueOf(){Ys("PlainYearMonth")}toPlainDate(t){if(I(this,Le),!re(t))throw new TypeError("argument should be an object");const n=y(this,A);return vn(Ls(n,No(n,_n(n,y(this,rt),"year-month"),ni(n,t,["day"],[],[])),"constrain"),n)}static from(t,n=void 0){return cl(t,n)}static compare(t,n){const i=cl(t),r=cl(n);return or(y(i,rt),y(r,rt))}}function yr(e,t){I(e,Le);const n=y(e,rt);return Gu(e).isoToDate(n,{[t]:!0})[t]}es(s0,"Temporal.PlainYearMonth");const d5=gi.prototype.resolvedOptions;class o0{constructor(t,n,i="iso8601"){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");const r=Qd(t);let s=Se(n);const{tzName:o,offsetMinutes:a}=$s(s);if(a===void 0){const c=qd(o);if(!c)throw new RangeError(`unknown time zone ${o}`);s=c.identifier}else s=Yv(a);kC(this,r,s,Cn(i===void 0?"iso8601":Se(i)))}get calendarId(){return I(this,ft),y(this,A)}get timeZoneId(){return I(this,ft),y(this,Tt)}get year(){return on(this,"year")}get month(){return on(this,"month")}get monthCode(){return on(this,"monthCode")}get day(){return on(this,"day")}get hour(){return da(this,"hour")}get minute(){return da(this,"minute")}get second(){return da(this,"second")}get millisecond(){return da(this,"millisecond")}get microsecond(){return da(this,"microsecond")}get nanosecond(){return da(this,"nanosecond")}get era(){return on(this,"era")}get eraYear(){return on(this,"eraYear")}get epochMilliseconds(){return I(this,ft),xi(y(this,it),"floor")}get epochNanoseconds(){return I(this,ft),zC(y(this,it))}get dayOfWeek(){return on(this,"dayOfWeek")}get dayOfYear(){return on(this,"dayOfYear")}get weekOfYear(){return on(this,"weekOfYear")?.week}get yearOfWeek(){return on(this,"weekOfYear")?.year}get hoursInDay(){I(this,ft);const t=y(this,Tt),n=Bi(this).isoDate,i=jn(n.year,n.month,n.day+1),r=cs(t,n),s=cs(t,i);return zl(pt.fromEpochNsDiff(s,r),"hour")}get daysInWeek(){return on(this,"daysInWeek")}get daysInMonth(){return on(this,"daysInMonth")}get daysInYear(){return on(this,"daysInYear")}get monthsInYear(){return on(this,"monthsInYear")}get inLeapYear(){return on(this,"inLeapYear")}get offset(){return I(this,ft),hm($r(y(this,Tt),y(this,it)))}get offsetNanoseconds(){return I(this,ft),$r(y(this,Tt),y(this,it))}with(t,n=void 0){if(I(this,ft),!re(t))throw new TypeError("invalid zoned-date-time-like");xc(t);const i=y(this,A),r=y(this,Tt),s=$r(r,y(this,it)),o=Bi(this);let a={..._n(i,o.isoDate),...o.time,offset:hm(s)};a=No(i,a,ni(i,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset"],"partial"));const c=K(n),l=Fl(c),u=Vh(c,"prefer"),h=Xu(i,a,St(c)),d=Sc(a.offset);return Ge(Yd(h.isoDate,h.time,"option",d,r,l,u,!1),r,i)}withPlainTime(t=void 0){I(this,ft);const n=y(this,Tt),i=y(this,A),r=Bi(this).isoDate;let s;return s=t===void 0?cs(n,r):Ze(n,Mt(r,y(vs(t),ie)),"compatible"),Ge(s,n,i)}withTimeZone(t){I(this,ft);const n=yn(t);return Ge(y(this,it),n,y(this,A))}withCalendar(t){I(this,ft);const n=Zu(t);return Ge(y(this,it),y(this,Tt),n)}add(t,n=void 0){return I(this,ft),Yb("add",this,t,n)}subtract(t,n=void 0){return I(this,ft),Yb("subtract",this,t,n)}until(t,n=void 0){return I(this,ft),Fb("until",this,t,n)}since(t,n=void 0){return I(this,ft),Fb("since",this,t,n)}round(t){if(I(this,ft),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?Bo("smallestUnit",t):K(t),i=Cc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Vr,["day"]),o={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s];if(kc(i,o,o===1),s==="nanosecond"&&i===1)return Ge(y(this,it),y(this,Tt),y(this,A));const a=y(this,Tt),c=y(this,it),l=Bi(this);let u;if(s==="day"){const h=l.isoDate,d=jn(h.year,h.month,h.day+1),f=cs(a,h),p=cs(a,d),g=v.subtract(p,f);u=pt.fromEpochNsDiff(c,f).round(g,r).addToEpochNs(f)}else{const h=vm(l,i,s,r),d=$r(a,c);u=Yd(h.isoDate,h.time,"option",d,a,"compatible","prefer",!1)}return Ge(u,a,y(this,A))}equals(t){I(this,ft);const n=ll(t),i=y(this,it),r=y(n,it);return!!v.equal(v.BigInt(i),v.BigInt(r))&&!!SC(y(this,Tt),y(n,Tt))&&rr(y(this,A),y(n,A))}toString(t=void 0){I(this,ft);const n=K(t),i=Vu(n),r=qu(n),s=(function(d){return Fr(d,"offset",["auto","never"],"auto")})(n),o=Pi(n,"trunc"),a=Nn(n,"smallestUnit","time",void 0);if(a==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const c=(function(d){return Fr(d,"timeZoneName",["auto","never","critical"],"auto")})(n),{precision:l,unit:u,increment:h}=Ku(a,r);return $b(this,l,i,c,s,{unit:u,increment:h,roundingMode:o})}toLocaleString(t=void 0,n=void 0){I(this,ft);const i=K(n),r=Object.create(null);if((function(c,l,u,h){if(l==null)return;const d=Reflect.ownKeys(l);for(let f=0;f<d.length;f++){const p=d[f];if(!u.some((g=>Object.is(g,p)))&&Object.prototype.propertyIsEnumerable.call(l,p)){const g=l[p];c[p]=g}}})(r,i,["timeZone"]),i.timeZone!==void 0)throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");if(r.year===void 0&&r.month===void 0&&r.day===void 0&&r.era===void 0&&r.weekday===void 0&&r.dateStyle===void 0&&r.hour===void 0&&r.minute===void 0&&r.second===void 0&&r.fractionalSecondDigits===void 0&&r.timeStyle===void 0&&r.dayPeriod===void 0&&r.timeZoneName===void 0&&(r.timeZoneName="short"),r.timeZone=y(this,Tt),Tb(r.timeZone))throw new RangeError("toLocaleString does not currently support offset time zones");const s=new gi(t,r),o=d5.call(s).calendar,a=y(this,A);if(a!=="iso8601"&&o!=="iso8601"&&!rr(o,a))throw new RangeError(`cannot format ZonedDateTime with calendar ${a} in locale with calendar ${o}`);return s.format(Ki(y(this,it)))}toJSON(){return I(this,ft),$b(this,"auto")}valueOf(){Ys("ZonedDateTime")}startOfDay(){I(this,ft);const t=y(this,Tt);return Ge(cs(t,Bi(this).isoDate),t,y(this,A))}getTimeZoneTransition(t){I(this,ft);const n=y(this,Tt);if(t===void 0)throw new TypeError("options parameter is required");const i=Fr(typeof t=="string"?Bo("direction",t):K(t),"direction",["next","previous"],Vr);if(i===void 0)throw new TypeError("direction option is required");if(Tb(n)||n==="UTC")return null;const r=y(this,it),s=i==="next"?qv(n,r):fm(n,r);return s===null?null:Ge(s,n,y(this,A))}toInstant(){return I(this,ft),Ki(y(this,it))}toPlainDate(){return I(this,ft),vn(Bi(this).isoDate,y(this,A))}toPlainTime(){return I(this,ft),Dr(Bi(this).time)}toPlainDateTime(){return I(this,ft),fi(Bi(this),y(this,A))}static from(t,n=void 0){return ll(t,n)}static compare(t,n){const i=ll(t),r=ll(n),s=y(i,it),o=y(r,it);return v.lessThan(v.BigInt(s),v.BigInt(o))?-1:v.greaterThan(v.BigInt(s),v.BigInt(o))?1:0}}function Bi(e){return wi(y(e,Tt),y(e,it))}function on(e,t){I(e,ft);const n=Bi(e).isoDate;return Gu(e).isoToDate(n,{[t]:!0})[t]}function da(e,t){return I(e,ft),Bi(e).time[t]}es(o0,"Temporal.ZonedDateTime");var za=Object.freeze({__proto__:null,Duration:ac,Instant:e0,Now:QC,PlainDate:n0,PlainDateTime:i0,PlainMonthDay:r0,PlainTime:rh,PlainYearMonth:s0,ZonedDateTime:o0});const f5=[e0,n0,i0,ac,r0,rh,s0,o0];for(const e of f5){const t=Object.getOwnPropertyDescriptor(e,"prototype");(t.configurable||t.enumerable||t.writable)&&(t.configurable=!1,t.enumerable=!1,t.writable=!1,Object.defineProperty(e,"prototype",t))}function p5(e,t,n){return(t=y5(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qr(){return qr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)({}).hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},qr.apply(null,arguments)}function Kb(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,i)}return n}function ar(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Kb(Object(n),!0).forEach(function(i){p5(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Kb(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function g5(e,t){if(e==null)return{};var n,i,r=m5(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function m5(e,t){if(e==null)return{};var n={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.indexOf(i)!==-1)continue;n[i]=e[i]}return n}function v5(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function y5(e){var t=v5(e,"string");return typeof t=="symbol"?t:t+""}function wm(e){"@babel/helpers - typeof";return wm=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},wm(e)}var b5="1.15.7";function jr(e){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(e)}var ns=jr(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),sh=jr(/Edge/i),Gb=jr(/firefox/i),jl=jr(/safari/i)&&!jr(/chrome/i)&&!jr(/android/i),a0=jr(/iP(ad|od|hone)/i),ZC=jr(/chrome/i)&&jr(/android/i),JC={capture:!1,passive:!1};function Ct(e,t,n){e.addEventListener(t,n,!ns&&JC)}function yt(e,t,n){e.removeEventListener(t,n,!ns&&JC)}function Jd(e,t){if(t){if(t[0]===">"&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch{return!1}return!1}}function tk(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function Mi(e,t,n,i){if(e){n=n||document;do{if(t!=null&&(t[0]===">"?e.parentNode===n&&Jd(e,t):Jd(e,t))||i&&e===n)return e;if(e===n)break}while(e=tk(e))}return null}var Xb=/\s+/g;function Un(e,t,n){if(e&&t)if(e.classList)e.classList[n?"add":"remove"](t);else{var i=(" "+e.className+" ").replace(Xb," ").replace(" "+t+" "," ");e.className=(i+(n?" "+t:"")).replace(Xb," ")}}function tt(e,t,n){var i=e&&e.style;if(i){if(n===void 0)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(n=e.currentStyle),t===void 0?n:n[t];!(t in i)&&t.indexOf("webkit")===-1&&(t="-webkit-"+t),i[t]=n+(typeof n=="string"?"":"px")}}function ja(e,t){var n="";if(typeof e=="string")n=e;else do{var i=tt(e,"transform");i&&i!=="none"&&(n=i+" "+n)}while(!t&&(e=e.parentNode));var r=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return r&&new r(n)}function ek(e,t,n){if(e){var i=e.getElementsByTagName(t),r=0,s=i.length;if(n)for(;r<s;r++)n(i[r],r);return i}return[]}function Ji(){var e=document.scrollingElement;return e||document.documentElement}function ve(e,t,n,i,r){if(!(!e.getBoundingClientRect&&e!==window)){var s,o,a,c,l,u,h;if(e!==window&&e.parentNode&&e!==Ji()?(s=e.getBoundingClientRect(),o=s.top,a=s.left,c=s.bottom,l=s.right,u=s.height,h=s.width):(o=0,a=0,c=window.innerHeight,l=window.innerWidth,u=window.innerHeight,h=window.innerWidth),(t||n)&&e!==window&&(r=r||e.parentNode,!ns))do if(r&&r.getBoundingClientRect&&(tt(r,"transform")!=="none"||n&&tt(r,"position")!=="static")){var d=r.getBoundingClientRect();o-=d.top+parseInt(tt(r,"border-top-width")),a-=d.left+parseInt(tt(r,"border-left-width")),c=o+s.height,l=a+s.width;break}while(r=r.parentNode);if(i&&e!==window){var f=ja(r||e),p=f&&f.a,g=f&&f.d;f&&(o/=g,a/=p,h/=p,u/=g,c=o+u,l=a+h)}return{top:o,left:a,bottom:c,right:l,width:h,height:u}}}function Qb(e,t,n){for(var i=bs(e,!0),r=ve(e)[t];i;){var s=ve(i)[n],o=void 0;if(o=r>=s,!o)return i;if(i===Ji())break;i=bs(i,!1)}return!1}function cc(e,t,n,i){for(var r=0,s=0,o=e.children;s<o.length;){if(o[s].style.display!=="none"&&o[s]!==et.ghost&&(i||o[s]!==et.dragged)&&Mi(o[s],n.draggable,e,!1)){if(r===t)return o[s];r++}s++}return null}function c0(e,t){for(var n=e.lastElementChild;n&&(n===et.ghost||tt(n,"display")==="none"||t&&!Jd(n,t));)n=n.previousElementSibling;return n||null}function ci(e,t){var n=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)e.nodeName.toUpperCase()!=="TEMPLATE"&&e!==et.clone&&(!t||Jd(e,t))&&n++;return n}function Zb(e){var t=0,n=0,i=Ji();if(e)do{var r=ja(e),s=r.a,o=r.d;t+=e.scrollLeft*s,n+=e.scrollTop*o}while(e!==i&&(e=e.parentNode));return[t,n]}function _5(e,t){for(var n in e)if(e.hasOwnProperty(n)){for(var i in t)if(t.hasOwnProperty(i)&&t[i]===e[n][i])return Number(n)}return-1}function bs(e,t){if(!e||!e.getBoundingClientRect)return Ji();var n=e,i=!1;do if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var r=tt(n);if(n.clientWidth<n.scrollWidth&&(r.overflowX=="auto"||r.overflowX=="scroll")||n.clientHeight<n.scrollHeight&&(r.overflowY=="auto"||r.overflowY=="scroll")){if(!n.getBoundingClientRect||n===document.body)return Ji();if(i||t)return n;i=!0}}while(n=n.parentNode);return Ji()}function w5(e,t){if(e&&t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function qp(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}var Bl;function nk(e,t){return function(){if(!Bl){var n=arguments,i=this;n.length===1?e.call(i,n[0]):e.apply(i,n),Bl=setTimeout(function(){Bl=void 0},t)}}}function x5(){clearTimeout(Bl),Bl=void 0}function ik(e,t,n){e.scrollLeft+=t,e.scrollTop+=n}function rk(e){var t=window.Polymer,n=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):n?n(e).clone(!0)[0]:e.cloneNode(!0)}function sk(e,t,n){var i={};return Array.from(e.children).forEach(function(r){var s,o,a,c;if(!(!Mi(r,t.draggable,e,!1)||r.animated||r===n)){var l=ve(r);i.left=Math.min((s=i.left)!==null&&s!==void 0?s:1/0,l.left),i.top=Math.min((o=i.top)!==null&&o!==void 0?o:1/0,l.top),i.right=Math.max((a=i.right)!==null&&a!==void 0?a:-1/0,l.right),i.bottom=Math.max((c=i.bottom)!==null&&c!==void 0?c:-1/0,l.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var An="Sortable"+new Date().getTime();function C5(){var e=[],t;return{captureAnimationState:function(){if(e=[],!!this.options.animation){var i=[].slice.call(this.el.children);i.forEach(function(r){if(!(tt(r,"display")==="none"||r===et.ghost)){e.push({target:r,rect:ve(r)});var s=ar({},e[e.length-1].rect);if(r.thisAnimationDuration){var o=ja(r,!0);o&&(s.top-=o.f,s.left-=o.e)}r.fromRect=s}})}},addAnimationState:function(i){e.push(i)},removeAnimationState:function(i){e.splice(_5(e,{target:i}),1)},animateAll:function(i){var r=this;if(!this.options.animation){clearTimeout(t),typeof i=="function"&&i();return}var s=!1,o=0;e.forEach(function(a){var c=0,l=a.target,u=l.fromRect,h=ve(l),d=l.prevFromRect,f=l.prevToRect,p=a.rect,g=ja(l,!0);g&&(h.top-=g.f,h.left-=g.e),l.toRect=h,l.thisAnimationDuration&&qp(d,h)&&!qp(u,h)&&(p.top-h.top)/(p.left-h.left)===(u.top-h.top)/(u.left-h.left)&&(c=S5(p,d,f,r.options)),qp(h,u)||(l.prevFromRect=u,l.prevToRect=h,c||(c=r.options.animation),r.animate(l,p,h,c)),c&&(s=!0,o=Math.max(o,c),clearTimeout(l.animationResetTimer),l.animationResetTimer=setTimeout(function(){l.animationTime=0,l.prevFromRect=null,l.fromRect=null,l.prevToRect=null,l.thisAnimationDuration=null},c),l.thisAnimationDuration=c)}),clearTimeout(t),s?t=setTimeout(function(){typeof i=="function"&&i()},o):typeof i=="function"&&i(),e=[]},animate:function(i,r,s,o){if(o){tt(i,"transition",""),tt(i,"transform","");var a=ja(this.el),c=a&&a.a,l=a&&a.d,u=(r.left-s.left)/(c||1),h=(r.top-s.top)/(l||1);i.animatingX=!!u,i.animatingY=!!h,tt(i,"transform","translate3d("+u+"px,"+h+"px,0)"),this.forRepaintDummy=k5(i),tt(i,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),tt(i,"transform","translate3d(0,0,0)"),typeof i.animated=="number"&&clearTimeout(i.animated),i.animated=setTimeout(function(){tt(i,"transition",""),tt(i,"transform",""),i.animated=!1,i.animatingX=!1,i.animatingY=!1},o)}}}}function k5(e){return e.offsetWidth}function S5(e,t,n,i){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-n.top,2)+Math.pow(t.left-n.left,2))*i.animation}var fa=[],Kp={initializeByDefault:!0},oh={mount:function(t){for(var n in Kp)Kp.hasOwnProperty(n)&&!(n in t)&&(t[n]=Kp[n]);fa.forEach(function(i){if(i.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")}),fa.push(t)},pluginEvent:function(t,n,i){var r=this;this.eventCanceled=!1,i.cancel=function(){r.eventCanceled=!0};var s=t+"Global";fa.forEach(function(o){n[o.pluginName]&&(n[o.pluginName][s]&&n[o.pluginName][s](ar({sortable:n},i)),n.options[o.pluginName]&&n[o.pluginName][t]&&n[o.pluginName][t](ar({sortable:n},i)))})},initializePlugins:function(t,n,i,r){fa.forEach(function(a){var c=a.pluginName;if(!(!t.options[c]&&!a.initializeByDefault)){var l=new a(t,n,t.options);l.sortable=t,l.options=t.options,t[c]=l,qr(i,l.defaults)}});for(var s in t.options)if(t.options.hasOwnProperty(s)){var o=this.modifyOption(t,s,t.options[s]);typeof o<"u"&&(t.options[s]=o)}},getEventProperties:function(t,n){var i={};return fa.forEach(function(r){typeof r.eventProperties=="function"&&qr(i,r.eventProperties.call(n[r.pluginName],t))}),i},modifyOption:function(t,n,i){var r;return fa.forEach(function(s){t[s.pluginName]&&s.optionListeners&&typeof s.optionListeners[n]=="function"&&(r=s.optionListeners[n].call(t[s.pluginName],i))}),r}};function E5(e){var t=e.sortable,n=e.rootEl,i=e.name,r=e.targetEl,s=e.cloneEl,o=e.toEl,a=e.fromEl,c=e.oldIndex,l=e.newIndex,u=e.oldDraggableIndex,h=e.newDraggableIndex,d=e.originalEvent,f=e.putSortable,p=e.extraEventProperties;if(t=t||n&&n[An],!!t){var g,m=t.options,b="on"+i.charAt(0).toUpperCase()+i.substr(1);window.CustomEvent&&!ns&&!sh?g=new CustomEvent(i,{bubbles:!0,cancelable:!0}):(g=document.createEvent("Event"),g.initEvent(i,!0,!0)),g.to=o||n,g.from=a||n,g.item=r||n,g.clone=s,g.oldIndex=c,g.newIndex=l,g.oldDraggableIndex=u,g.newDraggableIndex=h,g.originalEvent=d,g.pullMode=f?f.lastPutMode:void 0;var _=ar(ar({},p),oh.getEventProperties(i,t));for(var C in _)g[C]=_[C];n&&n.dispatchEvent(g),m[b]&&m[b].call(t,g)}}var M5=["evt"],Mn=function(t,n){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=i.evt,s=g5(i,M5);oh.pluginEvent.bind(et)(t,n,ar({dragEl:N,parentEl:ae,ghostEl:ct,rootEl:qt,nextEl:co,lastDownEl:qh,cloneEl:ee,cloneHidden:ps,dragStarted:hl,putSortable:Re,activeSortable:et.active,originalEvent:r,oldIndex:Ta,oldDraggableIndex:Wl,newIndex:Yn,newDraggableIndex:us,hideGhostForTarget:lk,unhideGhostForTarget:uk,cloneNowHidden:function(){ps=!0},cloneNowShown:function(){ps=!1},dispatchSortableEvent:function(a){an({sortable:n,name:a,originalEvent:r})}},s))};function an(e){E5(ar({putSortable:Re,cloneEl:ee,targetEl:N,rootEl:qt,oldIndex:Ta,oldDraggableIndex:Wl,newIndex:Yn,newDraggableIndex:us},e))}var N,ae,ct,qt,co,qh,ee,ps,Ta,Yn,Wl,us,vh,Re,xa=!1,tf=!1,ef=[],to,Si,Gp,Xp,Jb,t_,hl,pa,Hl,Ul=!1,yh=!1,Kh,Ue,Qp=[],xm=!1,nf=[],Xf=typeof document<"u",bh=a0,e_=sh||ns?"cssFloat":"float",D5=Xf&&!ZC&&!a0&&"draggable"in document.createElement("div"),ok=(function(){if(Xf){if(ns)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto",e.style.pointerEvents==="auto"}})(),ak=function(t,n){var i=tt(t),r=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),s=cc(t,0,n),o=cc(t,1,n),a=s&&tt(s),c=o&&tt(o),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+ve(s).width,u=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+ve(o).width;if(i.display==="flex")return i.flexDirection==="column"||i.flexDirection==="column-reverse"?"vertical":"horizontal";if(i.display==="grid")return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(s&&a.float&&a.float!=="none"){var h=a.float==="left"?"left":"right";return o&&(c.clear==="both"||c.clear===h)?"vertical":"horizontal"}return s&&(a.display==="block"||a.display==="flex"||a.display==="table"||a.display==="grid"||l>=r&&i[e_]==="none"||o&&i[e_]==="none"&&l+u>r)?"vertical":"horizontal"},$5=function(t,n,i){var r=i?t.left:t.top,s=i?t.right:t.bottom,o=i?t.width:t.height,a=i?n.left:n.top,c=i?n.right:n.bottom,l=i?n.width:n.height;return r===a||s===c||r+o/2===a+l/2},T5=function(t,n){var i;return ef.some(function(r){var s=r[An].options.emptyInsertThreshold;if(!(!s||c0(r))){var o=ve(r),a=t>=o.left-s&&t<=o.right+s,c=n>=o.top-s&&n<=o.bottom+s;if(a&&c)return i=r}}),i},ck=function(t){function n(s,o){return function(a,c,l,u){var h=a.options.group.name&&c.options.group.name&&a.options.group.name===c.options.group.name;if(s==null&&(o||h))return!0;if(s==null||s===!1)return!1;if(o&&s==="clone")return s;if(typeof s=="function")return n(s(a,c,l,u),o)(a,c,l,u);var d=(o?a:c).options.group.name;return s===!0||typeof s=="string"&&s===d||s.join&&s.indexOf(d)>-1}}var i={},r=t.group;(!r||wm(r)!="object")&&(r={name:r}),i.name=r.name,i.checkPull=n(r.pull,!0),i.checkPut=n(r.put),i.revertClone=r.revertClone,t.group=i},lk=function(){!ok&&ct&&tt(ct,"display","none")},uk=function(){!ok&&ct&&tt(ct,"display","")};Xf&&!ZC&&document.addEventListener("click",function(e){if(tf)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),tf=!1,!1},!0);var eo=function(t){if(N){t=t.touches?t.touches[0]:t;var n=T5(t.clientX,t.clientY);if(n){var i={};for(var r in t)t.hasOwnProperty(r)&&(i[r]=t[r]);i.target=i.rootEl=n,i.preventDefault=void 0,i.stopPropagation=void 0,n[An]._onDragOver(i)}}},O5=function(t){N&&N.parentNode[An]._isOutsideThisEl(t.target)};function et(e,t){if(!(e&&e.nodeType&&e.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=qr({},t),e[An]=this;var n={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return ak(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(o,a){o.setData("Text",a.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:et.supportPointer!==!1&&"PointerEvent"in window&&(!jl||a0),emptyInsertThreshold:5};oh.initializePlugins(this,e,n);for(var i in n)!(i in t)&&(t[i]=n[i]);ck(t);for(var r in this)r.charAt(0)==="_"&&typeof this[r]=="function"&&(this[r]=this[r].bind(this));this.nativeDraggable=t.forceFallback?!1:D5,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?Ct(e,"pointerdown",this._onTapStart):(Ct(e,"mousedown",this._onTapStart),Ct(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(Ct(e,"dragover",this),Ct(e,"dragenter",this)),ef.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),qr(this,C5())}et.prototype={constructor:et,_isOutsideThisEl:function(t){!this.el.contains(t)&&t!==this.el&&(pa=null)},_getDirection:function(t,n){return typeof this.options.direction=="function"?this.options.direction.call(this,t,n,N):this.options.direction},_onTapStart:function(t){if(t.cancelable){var n=this,i=this.el,r=this.options,s=r.preventOnFilter,o=t.type,a=t.touches&&t.touches[0]||t.pointerType&&t.pointerType==="touch"&&t,c=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||c,u=r.filter;if(z5(i),!N&&!(/mousedown|pointerdown/.test(o)&&t.button!==0||r.disabled)&&!l.isContentEditable&&!(!this.nativeDraggable&&jl&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=Mi(c,r.draggable,i,!1),!(c&&c.animated)&&qh!==c)){if(Ta=ci(c),Wl=ci(c,r.draggable),typeof u=="function"){if(u.call(this,t,c,this)){an({sortable:n,rootEl:l,name:"filter",targetEl:c,toEl:i,fromEl:i}),Mn("filter",n,{evt:t}),s&&t.preventDefault();return}}else if(u&&(u=u.split(",").some(function(h){if(h=Mi(l,h.trim(),i,!1),h)return an({sortable:n,rootEl:h,name:"filter",targetEl:c,fromEl:i,toEl:i}),Mn("filter",n,{evt:t}),!0}),u)){s&&t.preventDefault();return}r.handle&&!Mi(l,r.handle,i,!1)||this._prepareDragStart(t,a,c)}}},_prepareDragStart:function(t,n,i){var r=this,s=r.el,o=r.options,a=s.ownerDocument,c;if(i&&!N&&i.parentNode===s){var l=ve(i);if(qt=s,N=i,ae=N.parentNode,co=N.nextSibling,qh=i,vh=o.group,et.dragged=N,to={target:N,clientX:(n||t).clientX,clientY:(n||t).clientY},Jb=to.clientX-l.left,t_=to.clientY-l.top,this._lastX=(n||t).clientX,this._lastY=(n||t).clientY,N.style["will-change"]="all",c=function(){if(Mn("delayEnded",r,{evt:t}),et.eventCanceled){r._onDrop();return}r._disableDelayedDragEvents(),!Gb&&r.nativeDraggable&&(N.draggable=!0),r._triggerDragStart(t,n),an({sortable:r,name:"choose",originalEvent:t}),Un(N,o.chosenClass,!0)},o.ignore.split(",").forEach(function(u){ek(N,u.trim(),Zp)}),Ct(a,"dragover",eo),Ct(a,"mousemove",eo),Ct(a,"touchmove",eo),o.supportPointer?(Ct(a,"pointerup",r._onDrop),!this.nativeDraggable&&Ct(a,"pointercancel",r._onDrop)):(Ct(a,"mouseup",r._onDrop),Ct(a,"touchend",r._onDrop),Ct(a,"touchcancel",r._onDrop)),Gb&&this.nativeDraggable&&(this.options.touchStartThreshold=4,N.draggable=!0),Mn("delayStart",this,{evt:t}),o.delay&&(!o.delayOnTouchOnly||n)&&(!this.nativeDraggable||!(sh||ns))){if(et.eventCanceled){this._onDrop();return}o.supportPointer?(Ct(a,"pointerup",r._disableDelayedDrag),Ct(a,"pointercancel",r._disableDelayedDrag)):(Ct(a,"mouseup",r._disableDelayedDrag),Ct(a,"touchend",r._disableDelayedDrag),Ct(a,"touchcancel",r._disableDelayedDrag)),Ct(a,"mousemove",r._delayedDragTouchMoveHandler),Ct(a,"touchmove",r._delayedDragTouchMoveHandler),o.supportPointer&&Ct(a,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=setTimeout(c,o.delay)}else c()}},_delayedDragTouchMoveHandler:function(t){var n=t.touches?t.touches[0]:t;Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){N&&Zp(N),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;yt(t,"mouseup",this._disableDelayedDrag),yt(t,"touchend",this._disableDelayedDrag),yt(t,"touchcancel",this._disableDelayedDrag),yt(t,"pointerup",this._disableDelayedDrag),yt(t,"pointercancel",this._disableDelayedDrag),yt(t,"mousemove",this._delayedDragTouchMoveHandler),yt(t,"touchmove",this._delayedDragTouchMoveHandler),yt(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,n){n=n||t.pointerType=="touch"&&t,!this.nativeDraggable||n?this.options.supportPointer?Ct(document,"pointermove",this._onTouchMove):n?Ct(document,"touchmove",this._onTouchMove):Ct(document,"mousemove",this._onTouchMove):(Ct(N,"dragend",this),Ct(qt,"dragstart",this._onDragStart));try{document.selection?Gh(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(t,n){if(xa=!1,qt&&N){Mn("dragStarted",this,{evt:n}),this.nativeDraggable&&Ct(document,"dragover",O5);var i=this.options;!t&&Un(N,i.dragClass,!1),Un(N,i.ghostClass,!0),et.active=this,t&&this._appendGhost(),an({sortable:this,name:"start",originalEvent:n})}else this._nulling()},_emulateDragOver:function(){if(Si){this._lastX=Si.clientX,this._lastY=Si.clientY,lk();for(var t=document.elementFromPoint(Si.clientX,Si.clientY),n=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(Si.clientX,Si.clientY),t!==n);)n=t;if(N.parentNode[An]._isOutsideThisEl(t),n)do{if(n[An]){var i=void 0;if(i=n[An]._onDragOver({clientX:Si.clientX,clientY:Si.clientY,target:t,rootEl:n}),i&&!this.options.dragoverBubble)break}t=n}while(n=tk(n));uk()}},_onTouchMove:function(t){if(to){var n=this.options,i=n.fallbackTolerance,r=n.fallbackOffset,s=t.touches?t.touches[0]:t,o=ct&&ja(ct,!0),a=ct&&o&&o.a,c=ct&&o&&o.d,l=bh&&Ue&&Zb(Ue),u=(s.clientX-to.clientX+r.x)/(a||1)+(l?l[0]-Qp[0]:0)/(a||1),h=(s.clientY-to.clientY+r.y)/(c||1)+(l?l[1]-Qp[1]:0)/(c||1);if(!et.active&&!xa){if(i&&Math.max(Math.abs(s.clientX-this._lastX),Math.abs(s.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(ct){o?(o.e+=u-(Gp||0),o.f+=h-(Xp||0)):o={a:1,b:0,c:0,d:1,e:u,f:h};var d="matrix(".concat(o.a,",").concat(o.b,",").concat(o.c,",").concat(o.d,",").concat(o.e,",").concat(o.f,")");tt(ct,"webkitTransform",d),tt(ct,"mozTransform",d),tt(ct,"msTransform",d),tt(ct,"transform",d),Gp=u,Xp=h,Si=s}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!ct){var t=this.options.fallbackOnBody?document.body:qt,n=ve(N,!0,bh,!0,t),i=this.options;if(bh){for(Ue=t;tt(Ue,"position")==="static"&&tt(Ue,"transform")==="none"&&Ue!==document;)Ue=Ue.parentNode;Ue!==document.body&&Ue!==document.documentElement?(Ue===document&&(Ue=Ji()),n.top+=Ue.scrollTop,n.left+=Ue.scrollLeft):Ue=Ji(),Qp=Zb(Ue)}ct=N.cloneNode(!0),Un(ct,i.ghostClass,!1),Un(ct,i.fallbackClass,!0),Un(ct,i.dragClass,!0),tt(ct,"transition",""),tt(ct,"transform",""),tt(ct,"box-sizing","border-box"),tt(ct,"margin",0),tt(ct,"top",n.top),tt(ct,"left",n.left),tt(ct,"width",n.width),tt(ct,"height",n.height),tt(ct,"opacity","0.8"),tt(ct,"position",bh?"absolute":"fixed"),tt(ct,"zIndex","100000"),tt(ct,"pointerEvents","none"),et.ghost=ct,t.appendChild(ct),tt(ct,"transform-origin",Jb/parseInt(ct.style.width)*100+"% "+t_/parseInt(ct.style.height)*100+"%")}},_onDragStart:function(t,n){var i=this,r=t.dataTransfer,s=i.options;if(Mn("dragStart",this,{evt:t}),et.eventCanceled){this._onDrop();return}Mn("setupClone",this),et.eventCanceled||(ee=rk(N),ee.removeAttribute("id"),ee.draggable=!1,ee.style["will-change"]="",this._hideClone(),Un(ee,this.options.chosenClass,!1),et.clone=ee),i.cloneId=Gh(function(){Mn("clone",i),!et.eventCanceled&&(i.options.removeCloneOnHide||qt.insertBefore(ee,N),i._hideClone(),an({sortable:i,name:"clone"}))}),!n&&Un(N,s.dragClass,!0),n?(tf=!0,i._loopId=setInterval(i._emulateDragOver,50)):(yt(document,"mouseup",i._onDrop),yt(document,"touchend",i._onDrop),yt(document,"touchcancel",i._onDrop),r&&(r.effectAllowed="move",s.setData&&s.setData.call(i,r,N)),Ct(document,"drop",i),tt(N,"transform","translateZ(0)")),xa=!0,i._dragStartId=Gh(i._dragStarted.bind(i,n,t)),Ct(document,"selectstart",i),hl=!0,window.getSelection().removeAllRanges(),jl&&tt(document.body,"user-select","none")},_onDragOver:function(t){var n=this.el,i=t.target,r,s,o,a=this.options,c=a.group,l=et.active,u=vh===c,h=a.sort,d=Re||l,f,p=this,g=!1;if(xm)return;function m(G,B){Mn(G,p,ar({evt:t,isOwner:u,axis:f?"vertical":"horizontal",revert:o,dragRect:r,targetRect:s,canSort:h,fromSortable:d,target:i,completed:_,onMove:function(W,q){return _h(qt,n,N,r,W,ve(W),t,q)},changed:C},B))}function b(){m("dragOverAnimationCapture"),p.captureAnimationState(),p!==d&&d.captureAnimationState()}function _(G){return m("dragOverCompleted",{insertion:G}),G&&(u?l._hideClone():l._showClone(p),p!==d&&(Un(N,Re?Re.options.ghostClass:l.options.ghostClass,!1),Un(N,a.ghostClass,!0)),Re!==p&&p!==et.active?Re=p:p===et.active&&Re&&(Re=null),d===p&&(p._ignoreWhileAnimating=i),p.animateAll(function(){m("dragOverAnimationComplete"),p._ignoreWhileAnimating=null}),p!==d&&(d.animateAll(),d._ignoreWhileAnimating=null)),(i===N&&!N.animated||i===n&&!i.animated)&&(pa=null),!a.dragoverBubble&&!t.rootEl&&i!==document&&(N.parentNode[An]._isOutsideThisEl(t.target),!G&&eo(t)),!a.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),g=!0}function C(){Yn=ci(N),us=ci(N,a.draggable),an({sortable:p,name:"change",toEl:n,newIndex:Yn,newDraggableIndex:us,originalEvent:t})}if(t.preventDefault!==void 0&&t.cancelable&&t.preventDefault(),i=Mi(i,a.draggable,n,!0),m("dragOver"),et.eventCanceled)return g;if(N.contains(t.target)||i.animated&&i.animatingX&&i.animatingY||p._ignoreWhileAnimating===i)return _(!1);if(tf=!1,l&&!a.disabled&&(u?h||(o=ae!==qt):Re===this||(this.lastPutMode=vh.checkPull(this,l,N,t))&&c.checkPut(this,l,N,t))){if(f=this._getDirection(t,i)==="vertical",r=ve(N),m("dragOverValid"),et.eventCanceled)return g;if(o)return ae=qt,b(),this._hideClone(),m("revert"),et.eventCanceled||(co?qt.insertBefore(N,co):qt.appendChild(N)),_(!0);var S=c0(n,a.draggable);if(!S||A5(t,f,this)&&!S.animated){if(S===N)return _(!1);if(S&&n===t.target&&(i=S),i&&(s=ve(i)),_h(qt,n,N,r,i,s,t,!!i)!==!1)return b(),S&&S.nextSibling?n.insertBefore(N,S.nextSibling):n.appendChild(N),ae=n,C(),_(!0)}else if(S&&R5(t,f,this)){var k=cc(n,0,a,!0);if(k===N)return _(!1);if(i=k,s=ve(i),_h(qt,n,N,r,i,s,t,!1)!==!1)return b(),n.insertBefore(N,k),ae=n,C(),_(!0)}else if(i.parentNode===n){s=ve(i);var $=0,D,w=N.parentNode!==n,x=!$5(N.animated&&N.toRect||r,i.animated&&i.toRect||s,f),M=f?"top":"left",O=Qb(i,"top","top")||Qb(N,"top","top"),T=O?O.scrollTop:void 0;pa!==i&&(D=s[M],Ul=!1,yh=!x&&a.invertSwap||w),$=L5(t,i,s,f,x?1:a.swapThreshold,a.invertedSwapThreshold==null?a.swapThreshold:a.invertedSwapThreshold,yh,pa===i);var R;if($!==0){var j=ci(N);do j-=$,R=ae.children[j];while(R&&(tt(R,"display")==="none"||R===ct))}if($===0||R===i)return _(!1);pa=i,Hl=$;var z=i.nextElementSibling,Y=!1;Y=$===1;var F=_h(qt,n,N,r,i,s,t,Y);if(F!==!1)return(F===1||F===-1)&&(Y=F===1),xm=!0,setTimeout(P5,30),b(),Y&&!z?n.appendChild(N):i.parentNode.insertBefore(N,Y?z:i),O&&ik(O,0,T-O.scrollTop),ae=N.parentNode,D!==void 0&&!yh&&(Kh=Math.abs(D-ve(i)[M])),C(),_(!0)}if(n.contains(N))return _(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){yt(document,"mousemove",this._onTouchMove),yt(document,"touchmove",this._onTouchMove),yt(document,"pointermove",this._onTouchMove),yt(document,"dragover",eo),yt(document,"mousemove",eo),yt(document,"touchmove",eo)},_offUpEvents:function(){var t=this.el.ownerDocument;yt(t,"mouseup",this._onDrop),yt(t,"touchend",this._onDrop),yt(t,"pointerup",this._onDrop),yt(t,"pointercancel",this._onDrop),yt(t,"touchcancel",this._onDrop),yt(document,"selectstart",this)},_onDrop:function(t){var n=this.el,i=this.options;if(Yn=ci(N),us=ci(N,i.draggable),Mn("drop",this,{evt:t}),ae=N&&N.parentNode,Yn=ci(N),us=ci(N,i.draggable),et.eventCanceled){this._nulling();return}xa=!1,yh=!1,Ul=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Cm(this.cloneId),Cm(this._dragStartId),this.nativeDraggable&&(yt(document,"drop",this),yt(n,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),jl&&tt(document.body,"user-select",""),tt(N,"transform",""),t&&(hl&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),ct&&ct.parentNode&&ct.parentNode.removeChild(ct),(qt===ae||Re&&Re.lastPutMode!=="clone")&&ee&&ee.parentNode&&ee.parentNode.removeChild(ee),N&&(this.nativeDraggable&&yt(N,"dragend",this),Zp(N),N.style["will-change"]="",hl&&!xa&&Un(N,Re?Re.options.ghostClass:this.options.ghostClass,!1),Un(N,this.options.chosenClass,!1),an({sortable:this,name:"unchoose",toEl:ae,newIndex:null,newDraggableIndex:null,originalEvent:t}),qt!==ae?(Yn>=0&&(an({rootEl:ae,name:"add",toEl:ae,fromEl:qt,originalEvent:t}),an({sortable:this,name:"remove",toEl:ae,originalEvent:t}),an({rootEl:ae,name:"sort",toEl:ae,fromEl:qt,originalEvent:t}),an({sortable:this,name:"sort",toEl:ae,originalEvent:t})),Re&&Re.save()):Yn!==Ta&&Yn>=0&&(an({sortable:this,name:"update",toEl:ae,originalEvent:t}),an({sortable:this,name:"sort",toEl:ae,originalEvent:t})),et.active&&((Yn==null||Yn===-1)&&(Yn=Ta,us=Wl),an({sortable:this,name:"end",toEl:ae,originalEvent:t}),this.save()))),this._nulling()},_nulling:function(){Mn("nulling",this),qt=N=ae=ct=co=ee=qh=ps=to=Si=hl=Yn=us=Ta=Wl=pa=Hl=Re=vh=et.dragged=et.ghost=et.clone=et.active=null;var t=this.el;nf.forEach(function(n){t.contains(n)&&(n.checked=!0)}),nf.length=Gp=Xp=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":N&&(this._onDragOver(t),I5(t));break;case"selectstart":t.preventDefault();break}},toArray:function(){for(var t=[],n,i=this.el.children,r=0,s=i.length,o=this.options;r<s;r++)n=i[r],Mi(n,o.draggable,this.el,!1)&&t.push(n.getAttribute(o.dataIdAttr)||F5(n));return t},sort:function(t,n){var i={},r=this.el;this.toArray().forEach(function(s,o){var a=r.children[o];Mi(a,this.options.draggable,r,!1)&&(i[s]=a)},this),n&&this.captureAnimationState(),t.forEach(function(s){i[s]&&(r.removeChild(i[s]),r.appendChild(i[s]))}),n&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,n){return Mi(t,n||this.options.draggable,this.el,!1)},option:function(t,n){var i=this.options;if(n===void 0)return i[t];var r=oh.modifyOption(this,t,n);typeof r<"u"?i[t]=r:i[t]=n,t==="group"&&ck(i)},destroy:function(){Mn("destroy",this);var t=this.el;t[An]=null,yt(t,"mousedown",this._onTapStart),yt(t,"touchstart",this._onTapStart),yt(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(yt(t,"dragover",this),yt(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(n){n.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),ef.splice(ef.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!ps){if(Mn("hideClone",this),et.eventCanceled)return;tt(ee,"display","none"),this.options.removeCloneOnHide&&ee.parentNode&&ee.parentNode.removeChild(ee),ps=!0}},_showClone:function(t){if(t.lastPutMode!=="clone"){this._hideClone();return}if(ps){if(Mn("showClone",this),et.eventCanceled)return;N.parentNode==qt&&!this.options.group.revertClone?qt.insertBefore(ee,N):co?qt.insertBefore(ee,co):qt.appendChild(ee),this.options.group.revertClone&&this.animate(N,ee),tt(ee,"display",""),ps=!1}}};function I5(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}function _h(e,t,n,i,r,s,o,a){var c,l=e[An],u=l.options.onMove,h;return window.CustomEvent&&!ns&&!sh?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=t,c.from=e,c.dragged=n,c.draggedRect=i,c.related=r||t,c.relatedRect=s||ve(t),c.willInsertAfter=a,c.originalEvent=o,e.dispatchEvent(c),u&&(h=u.call(l,c,o)),h}function Zp(e){e.draggable=!1}function P5(){xm=!1}function R5(e,t,n){var i=ve(cc(n.el,0,n.options,!0)),r=sk(n.el,n.options,ct),s=10;return t?e.clientX<r.left-s||e.clientY<i.top&&e.clientX<i.right:e.clientY<r.top-s||e.clientY<i.bottom&&e.clientX<i.left}function A5(e,t,n){var i=ve(c0(n.el,n.options.draggable)),r=sk(n.el,n.options,ct),s=10;return t?e.clientX>r.right+s||e.clientY>i.bottom&&e.clientX>i.left:e.clientY>r.bottom+s||e.clientX>i.right&&e.clientY>i.top}function L5(e,t,n,i,r,s,o,a){var c=i?e.clientY:e.clientX,l=i?n.height:n.width,u=i?n.top:n.left,h=i?n.bottom:n.right,d=!1;if(!o){if(a&&Kh<l*r){if(!Ul&&(Hl===1?c>u+l*s/2:c<h-l*s/2)&&(Ul=!0),Ul)d=!0;else if(Hl===1?c<u+Kh:c>h-Kh)return-Hl}else if(c>u+l*(1-r)/2&&c<h-l*(1-r)/2)return N5(t)}return d=d||o,d&&(c<u+l*s/2||c>h-l*s/2)?c>u+l/2?1:-1:0}function N5(e){return ci(N)<ci(e)?1:-1}function F5(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,n=t.length,i=0;n--;)i+=t.charCodeAt(n);return i.toString(36)}function z5(e){nf.length=0;for(var t=e.getElementsByTagName("input"),n=t.length;n--;){var i=t[n];i.checked&&nf.push(i)}}function Gh(e){return setTimeout(e,0)}function Cm(e){return clearTimeout(e)}Xf&&Ct(document,"touchmove",function(e){(et.active||xa)&&e.cancelable&&e.preventDefault()});et.utils={on:Ct,off:yt,css:tt,find:ek,is:function(t,n){return!!Mi(t,n,t,!1)},extend:w5,throttle:nk,closest:Mi,toggleClass:Un,clone:rk,index:ci,nextTick:Gh,cancelNextTick:Cm,detectDirection:ak,getChild:cc,expando:An};et.get=function(e){return e[An]};et.mount=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t[0].constructor===Array&&(t=t[0]),t.forEach(function(i){if(!i.prototype||!i.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));i.utils&&(et.utils=ar(ar({},et.utils),i.utils)),oh.mount(i)})};et.create=function(e,t){return new et(e,t)};et.version=b5;var ge=[],dl,km,Sm=!1,Jp,tg,rf,fl;function j5(){function e(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var t in this)t.charAt(0)==="_"&&typeof this[t]=="function"&&(this[t]=this[t].bind(this))}return e.prototype={dragStarted:function(n){var i=n.originalEvent;this.sortable.nativeDraggable?Ct(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Ct(document,"pointermove",this._handleFallbackAutoScroll):i.touches?Ct(document,"touchmove",this._handleFallbackAutoScroll):Ct(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(n){var i=n.originalEvent;!this.options.dragOverBubble&&!i.rootEl&&this._handleAutoScroll(i)},drop:function(){this.sortable.nativeDraggable?yt(document,"dragover",this._handleAutoScroll):(yt(document,"pointermove",this._handleFallbackAutoScroll),yt(document,"touchmove",this._handleFallbackAutoScroll),yt(document,"mousemove",this._handleFallbackAutoScroll)),n_(),Xh(),x5()},nulling:function(){rf=km=dl=Sm=fl=Jp=tg=null,ge.length=0},_handleFallbackAutoScroll:function(n){this._handleAutoScroll(n,!0)},_handleAutoScroll:function(n,i){var r=this,s=(n.touches?n.touches[0]:n).clientX,o=(n.touches?n.touches[0]:n).clientY,a=document.elementFromPoint(s,o);if(rf=n,i||this.options.forceAutoScrollFallback||sh||ns||jl){eg(n,this.options,a,i);var c=bs(a,!0);Sm&&(!fl||s!==Jp||o!==tg)&&(fl&&n_(),fl=setInterval(function(){var l=bs(document.elementFromPoint(s,o),!0);l!==c&&(c=l,Xh()),eg(n,r.options,l,i)},10),Jp=s,tg=o)}else{if(!this.options.bubbleScroll||bs(a,!0)===Ji()){Xh();return}eg(n,this.options,bs(a,!1),!1)}}},qr(e,{pluginName:"scroll",initializeByDefault:!0})}function Xh(){ge.forEach(function(e){clearInterval(e.pid)}),ge=[]}function n_(){clearInterval(fl)}var eg=nk(function(e,t,n,i){if(t.scroll){var r=(e.touches?e.touches[0]:e).clientX,s=(e.touches?e.touches[0]:e).clientY,o=t.scrollSensitivity,a=t.scrollSpeed,c=Ji(),l=!1,u;km!==n&&(km=n,Xh(),dl=t.scroll,u=t.scrollFn,dl===!0&&(dl=bs(n,!0)));var h=0,d=dl;do{var f=d,p=ve(f),g=p.top,m=p.bottom,b=p.left,_=p.right,C=p.width,S=p.height,k=void 0,$=void 0,D=f.scrollWidth,w=f.scrollHeight,x=tt(f),M=f.scrollLeft,O=f.scrollTop;f===c?(k=C<D&&(x.overflowX==="auto"||x.overflowX==="scroll"||x.overflowX==="visible"),$=S<w&&(x.overflowY==="auto"||x.overflowY==="scroll"||x.overflowY==="visible")):(k=C<D&&(x.overflowX==="auto"||x.overflowX==="scroll"),$=S<w&&(x.overflowY==="auto"||x.overflowY==="scroll"));var T=k&&(Math.abs(_-r)<=o&&M+C<D)-(Math.abs(b-r)<=o&&!!M),R=$&&(Math.abs(m-s)<=o&&O+S<w)-(Math.abs(g-s)<=o&&!!O);if(!ge[h])for(var j=0;j<=h;j++)ge[j]||(ge[j]={});(ge[h].vx!=T||ge[h].vy!=R||ge[h].el!==f)&&(ge[h].el=f,ge[h].vx=T,ge[h].vy=R,clearInterval(ge[h].pid),(T!=0||R!=0)&&(l=!0,ge[h].pid=setInterval((function(){i&&this.layer===0&&et.active._onTouchMove(rf);var z=ge[this.layer].vy?ge[this.layer].vy*a:0,Y=ge[this.layer].vx?ge[this.layer].vx*a:0;typeof u=="function"&&u.call(et.dragged.parentNode[An],Y,z,e,rf,ge[this.layer].el)!=="continue"||ik(ge[this.layer].el,Y,z)}).bind({layer:h}),24))),h++}while(t.bubbleScroll&&d!==c&&(d=bs(d,!1)));Sm=l}},30),hk=function(t){var n=t.originalEvent,i=t.putSortable,r=t.dragEl,s=t.activeSortable,o=t.dispatchSortableEvent,a=t.hideGhostForTarget,c=t.unhideGhostForTarget;if(n){var l=i||s;a();var u=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:n,h=document.elementFromPoint(u.clientX,u.clientY);c(),l&&!l.el.contains(h)&&(o("spill"),this.onSpill({dragEl:r,putSortable:i}))}};function l0(){}l0.prototype={startIndex:null,dragStart:function(t){var n=t.oldDraggableIndex;this.startIndex=n},onSpill:function(t){var n=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var r=cc(this.sortable.el,this.startIndex,this.options);r?this.sortable.el.insertBefore(n,r):this.sortable.el.appendChild(n),this.sortable.animateAll(),i&&i.animateAll()},drop:hk};qr(l0,{pluginName:"revertOnSpill"});function u0(){}u0.prototype={onSpill:function(t){var n=t.dragEl,i=t.putSortable,r=i||this.sortable;r.captureAnimationState(),n.parentNode&&n.parentNode.removeChild(n),r.animateAll()},drop:hk};qr(u0,{pluginName:"removeOnSpill"});et.mount(new j5);et.mount(u0,l0);class vi{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).dashboardCharts.subscribe(t)}static async all(){return(await(await Z()).dashboardCharts.all()).sort((i,r)=>i.position-r.position).map(i=>new vi(i))}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.dashboardCharts.put(i),new vi(i)}static async update(t,n){const i=await Z(),r=await i.dashboardCharts.get(t);await i.dashboardCharts.put({...r,...n})}static async remove(t){await(await Z()).dashboardCharts.remove(t)}static async reorder(t){const n=await Z();await Promise.all(t.map(async(i,r)=>{const s=await n.dashboardCharts.get(i);await n.dashboardCharts.put({...s,position:r})}))}}class cr{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).dashboardTables.subscribe(t)}static async all(){return(await(await Z()).dashboardTables.all()).sort((i,r)=>i.position-r.position).map(i=>new cr(i))}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.dashboardTables.put(i),new cr(i)}static async update(t,n){const i=await Z(),r=await i.dashboardTables.get(t);await i.dashboardTables.put({...r,...n})}static async remove(t){await(await Z()).dashboardTables.remove(t)}static async reorder(t){const n=await Z();await Promise.all(t.map(async(i,r)=>{const s=await n.dashboardTables.get(i);await n.dashboardTables.put({...s,position:r})}))}}const Dc=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,$c=dt`
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
`;var B5=Object.defineProperty,W5=Object.getOwnPropertyDescriptor,dk=e=>{throw TypeError(e)},ah=(e,t,n,i)=>{for(var r=i>1?void 0:i?W5(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&B5(t,n,r),r},H5=(e,t,n)=>t.has(e)||dk("Cannot "+n),U5=(e,t,n)=>t.has(e)?dk("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),$i=(e,t,n)=>(H5(e,t,"access private method"),n),Qn,Qf,fk,pk,pl,gk,mk;const Y5=[{value:"tag",label:"Tag"},{value:"merchant",label:"Merchant"},{value:"amount",label:"Amount"},{value:"description",label:"Description"}],vk={tag:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],merchant:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],amount:[{value:"lt",label:"<"},{value:"gt",label:">"},{value:"lte",label:"<="},{value:"gte",label:">="}],description:[{value:"contains",label:"contains"},{value:"excludes",label:"excludes"}]};let Ho=class extends mt{constructor(){super(...arguments),U5(this,Qn),this.condition={field:"tag",operator:"is",value:""},this.index=0,this.tags=[],this.merchants=[]}render(){const e=vk[this.condition.field];return E`
      <select @change=${$i(this,Qn,fk)}>
        ${Y5.map(t=>E`<option value=${t.value} ?selected=${this.condition.field===t.value}>${t.label}</option>`)}
      </select>
      <select @change=${$i(this,Qn,pk)}>
        ${e.map(t=>E`<option value=${t.value} ?selected=${this.condition.operator===t.value}>${t.label}</option>`)}
      </select>
      ${$i(this,Qn,mk).call(this)}
      <button class="icon-btn icon-btn--danger" title="Remove filter" aria-label="Remove filter" @click=${$i(this,Qn,gk)}>${ye(Dc)}</button>
    `}};Qn=new WeakSet;Qf=function(e){this.dispatchEvent(new CustomEvent("filter-changed",{detail:{index:this.index,condition:e}}))};fk=function(e){const t=e.target.value,n=vk[t];$i(this,Qn,Qf).call(this,{field:t,operator:n[0].value,value:""})};pk=function(e){const t=e.target.value;$i(this,Qn,Qf).call(this,{...this.condition,operator:t})};pl=function(e){const t=e.target.value;$i(this,Qn,Qf).call(this,{...this.condition,value:t})};gk=function(){this.dispatchEvent(new CustomEvent("filter-removed",{detail:{index:this.index}}))};mk=function(){const{field:e}=this.condition;return e==="tag"?E`
        <select @change=${$i(this,Qn,pl)}>
          <option value="">--</option>
          ${this.tags.map(t=>E`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="merchant"?E`
        <select @change=${$i(this,Qn,pl)}>
          <option value="">--</option>
          ${this.merchants.map(t=>E`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="amount"?E`
        <input
          type="number"
          placeholder="e.g. 0"
          .value=${this.condition.value}
          @input=${$i(this,Qn,pl)}
        />
      `:E`
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${$i(this,Qn,pl)}
      />
    `};Ho.styles=[$c,pr,dt`
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
    `];ah([H({type:Object})],Ho.prototype,"condition",2);ah([H({type:Number})],Ho.prototype,"index",2);ah([H({type:Array})],Ho.prototype,"tags",2);ah([H({type:Array})],Ho.prototype,"merchants",2);Ho=ah([Et("chart-filter-row")],Ho);var V5=Object.defineProperty,q5=Object.getOwnPropertyDescriptor,yk=e=>{throw TypeError(e)},Wn=(e,t,n,i)=>{for(var r=i>1?void 0:i?q5(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&V5(t,n,r),r},K5=(e,t,n)=>t.has(e)||yk("Cannot "+n),G5=(e,t,n)=>t.has(e)?yk("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),lo=(e,t,n)=>(K5(e,t,"access private method"),n),Cr,bk,_k,wk,xk,Ck,kk,Sk;const ng=new Set(["pie","doughnut"]);let tn=class extends mt{constructor(){super(...arguments),G5(this,Cr),this.transactions=[],this.tags=[],this.merchants=[],this._title="",this._chartType="bar",this._granularity="month",this._filters=[],this._excludedTagIds=[],this._excludedMerchantIds=[],this._legendPosition="top",this._showExclusions=!1,this._initialized=!1}updated(e){e.has("editingChart")&&this.editingChart&&!this._initialized&&(this._title=this.editingChart.title,this._chartType=this.editingChart.chartType,this._granularity=this.editingChart.granularity,this._filters=this.editingChart.filters??lo(this,Cr,bk).call(this,this.editingChart),this._excludedTagIds=this.editingChart.excludedTagIds??[],this._excludedMerchantIds=this.editingChart.excludedMerchantIds??[],this._legendPosition=this.editingChart.legendPosition??"top",this._initialized=!0)}render(){return E`
      <h4>${this.editingChart?"Edit Chart":"Add Chart"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${e=>{this._title=e.target.value}}
        />
        <label>Type:</label>
        <select @change=${e=>{this._chartType=e.target.value,ng.has(this._chartType)&&!["byTag","byMerchant","month"].includes(this._granularity)&&(this._granularity="byTag")}}>
          <option value="bar" ?selected=${this._chartType==="bar"}>Bar</option>
          <option value="line" ?selected=${this._chartType==="line"}>Line</option>
          <option value="pie" ?selected=${this._chartType==="pie"}>Pie</option>
          <option value="doughnut" ?selected=${this._chartType==="doughnut"}>Doughnut</option>
        </select>
        <label>${ng.has(this._chartType)?"Split by:":"Group by:"}</label>
        <select @change=${e=>{this._granularity=e.target.value}}>
          ${ng.has(this._chartType)?E`
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
            @filter-changed=${lo(this,Cr,_k)}
            @filter-removed=${lo(this,Cr,wk)}
          ></chart-filter-row>
        `)}
        <button class="add-filter" @click=${lo(this,Cr,xk)}>+ Add filter</button>
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
      ${lo(this,Cr,kk).call(this)}
      <button @click=${lo(this,Cr,Ck)}>${this.editingChart?"Update Chart":"Save to Dashboard"}</button>
    `}};Cr=new WeakSet;bk=function(e){const t=[];return e.tagId&&t.push({field:"tag",operator:"is",value:e.tagId}),e.merchantId&&t.push({field:"merchant",operator:"is",value:e.merchantId}),e.direction==="debit"?t.push({field:"amount",operator:"lt",value:"0"}):e.direction==="credit"&&t.push({field:"amount",operator:"gt",value:"0"}),e.descriptionFilter&&t.push({field:"description",operator:e.descriptionFilterMode==="include"?"contains":"excludes",value:e.descriptionFilter}),t};_k=function(e){const{index:t,condition:n}=e.detail;this._filters=this._filters.map((i,r)=>r===t?n:i)};wk=function(e){const{index:t}=e.detail;this._filters=this._filters.filter((n,i)=>i!==t)};xk=function(){this._filters=[...this._filters,{field:"tag",operator:"is",value:""}]};Ck=function(){const e=this._title.trim();if(!e)return;const t=this._filters.filter(n=>n.value.trim());this.dispatchEvent(new CustomEvent("chart-saved",{detail:{id:this.editingChart?.id,title:e,chartType:this._chartType,granularity:this._granularity,excludedTagIds:this._excludedTagIds.length>0?this._excludedTagIds:void 0,excludedMerchantIds:this._excludedMerchantIds.length>0?this._excludedMerchantIds:void 0,legendPosition:this._legendPosition,filters:t.length>0?t:void 0}})),this._title="",this._initialized=!1};kk=function(){if(this._granularity!=="byTag"&&this._granularity!=="byMerchant")return"";const e=this._granularity==="byTag"?this.tags:this.merchants,t=this._granularity==="byTag"?this._excludedTagIds:this._excludedMerchantIds,n=this._granularity==="byTag"?"tags":"merchants";return E`
      <details class="exclusions" ?open=${this._showExclusions} @toggle=${i=>{this._showExclusions=i.target.open}}>
        <summary>Exclude ${n}</summary>
        <div class="checkbox-list">
          ${e.map(i=>E`
            <label>
              <input
                type="checkbox"
                ?checked=${t.includes(i.id)}
                @change=${r=>lo(this,Cr,Sk).call(this,i.id,r.target.checked)}
              />
              ${i.name}
            </label>
          `)}
        </div>
      </details>
    `};Sk=function(e,t){this._granularity==="byTag"?this._excludedTagIds=t?[...this._excludedTagIds,e]:this._excludedTagIds.filter(n=>n!==e):this._excludedMerchantIds=t?[...this._excludedMerchantIds,e]:this._excludedMerchantIds.filter(n=>n!==e)};tn.styles=[Li,pr,dt`
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
    `];Wn([H({type:Array})],tn.prototype,"transactions",2);Wn([H({type:Array})],tn.prototype,"tags",2);Wn([H({type:Array})],tn.prototype,"merchants",2);Wn([H({type:Object})],tn.prototype,"editingChart",2);Wn([P()],tn.prototype,"_title",2);Wn([P()],tn.prototype,"_chartType",2);Wn([P()],tn.prototype,"_granularity",2);Wn([P()],tn.prototype,"_filters",2);Wn([P()],tn.prototype,"_excludedTagIds",2);Wn([P()],tn.prototype,"_excludedMerchantIds",2);Wn([P()],tn.prototype,"_legendPosition",2);Wn([P()],tn.prototype,"_showExclusions",2);Wn([P()],tn.prototype,"_initialized",2);tn=Wn([Et("chart-configurator")],tn);function ch(e){return e+.5|0}const _s=(e,t,n)=>Math.max(Math.min(e,n),t);function gl(e){return _s(ch(e*2.55),0,255)}function Ts(e){return _s(ch(e*255),0,255)}function Sr(e){return _s(ch(e/2.55)/100,0,1)}function i_(e){return _s(ch(e*100),0,100)}const ai={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Em=[..."0123456789ABCDEF"],X5=e=>Em[e&15],Q5=e=>Em[(e&240)>>4]+Em[e&15],wh=e=>(e&240)>>4===(e&15),Z5=e=>wh(e.r)&&wh(e.g)&&wh(e.b)&&wh(e.a);function J5(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&ai[e[1]]*17,g:255&ai[e[2]]*17,b:255&ai[e[3]]*17,a:t===5?ai[e[4]]*17:255}:(t===7||t===9)&&(n={r:ai[e[1]]<<4|ai[e[2]],g:ai[e[3]]<<4|ai[e[4]],b:ai[e[5]]<<4|ai[e[6]],a:t===9?ai[e[7]]<<4|ai[e[8]]:255})),n}const t3=(e,t)=>e<255?t(e):"";function e3(e){var t=Z5(e)?X5:Q5;return e?"#"+t(e.r)+t(e.g)+t(e.b)+t3(e.a,t):void 0}const n3=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Ek(e,t,n){const i=t*Math.min(n,1-n),r=(s,o=(s+e/30)%12)=>n-i*Math.max(Math.min(o-3,9-o,1),-1);return[r(0),r(8),r(4)]}function i3(e,t,n){const i=(r,s=(r+e/60)%6)=>n-n*t*Math.max(Math.min(s,4-s,1),0);return[i(5),i(3),i(1)]}function r3(e,t,n){const i=Ek(e,1,.5);let r;for(t+n>1&&(r=1/(t+n),t*=r,n*=r),r=0;r<3;r++)i[r]*=1-t-n,i[r]+=t;return i}function s3(e,t,n,i,r){return e===r?(t-n)/i+(t<n?6:0):t===r?(n-e)/i+2:(e-t)/i+4}function h0(e){const n=e.r/255,i=e.g/255,r=e.b/255,s=Math.max(n,i,r),o=Math.min(n,i,r),a=(s+o)/2;let c,l,u;return s!==o&&(u=s-o,l=a>.5?u/(2-s-o):u/(s+o),c=s3(n,i,r,u,s),c=c*60+.5),[c|0,l||0,a]}function d0(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(Ts)}function f0(e,t,n){return d0(Ek,e,t,n)}function o3(e,t,n){return d0(r3,e,t,n)}function a3(e,t,n){return d0(i3,e,t,n)}function Mk(e){return(e%360+360)%360}function c3(e){const t=n3.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?gl(+t[5]):Ts(+t[5]));const r=Mk(+t[2]),s=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?i=o3(r,s,o):t[1]==="hsv"?i=a3(r,s,o):i=f0(r,s,o),{r:i[0],g:i[1],b:i[2],a:n}}function l3(e,t){var n=h0(e);n[0]=Mk(n[0]+t),n=f0(n),e.r=n[0],e.g=n[1],e.b=n[2]}function u3(e){if(!e)return;const t=h0(e),n=t[0],i=i_(t[1]),r=i_(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${r}%, ${Sr(e.a)})`:`hsl(${n}, ${i}%, ${r}%)`}const r_={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},s_={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function h3(){const e={},t=Object.keys(s_),n=Object.keys(r_);let i,r,s,o,a;for(i=0;i<t.length;i++){for(o=a=t[i],r=0;r<n.length;r++)s=n[r],a=a.replace(s,r_[s]);s=parseInt(s_[o],16),e[a]=[s>>16&255,s>>8&255,s&255]}return e}let xh;function d3(e){xh||(xh=h3(),xh.transparent=[0,0,0,0]);const t=xh[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const f3=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function p3(e){const t=f3.exec(e);let n=255,i,r,s;if(t){if(t[7]!==i){const o=+t[7];n=t[8]?gl(o):_s(o*255,0,255)}return i=+t[1],r=+t[3],s=+t[5],i=255&(t[2]?gl(i):_s(i,0,255)),r=255&(t[4]?gl(r):_s(r,0,255)),s=255&(t[6]?gl(s):_s(s,0,255)),{r:i,g:r,b:s,a:n}}}function g3(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Sr(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const ig=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,ga=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function m3(e,t,n){const i=ga(Sr(e.r)),r=ga(Sr(e.g)),s=ga(Sr(e.b));return{r:Ts(ig(i+n*(ga(Sr(t.r))-i))),g:Ts(ig(r+n*(ga(Sr(t.g))-r))),b:Ts(ig(s+n*(ga(Sr(t.b))-s))),a:e.a+n*(t.a-e.a)}}function Ch(e,t,n){if(e){let i=h0(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=f0(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function Dk(e,t){return e&&Object.assign(t||{},e)}function o_(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Ts(e[3]))):(t=Dk(e,{r:0,g:0,b:0,a:1}),t.a=Ts(t.a)),t}function v3(e){return e.charAt(0)==="r"?p3(e):c3(e)}class wu{constructor(t){if(t instanceof wu)return t;const n=typeof t;let i;n==="object"?i=o_(t):n==="string"&&(i=J5(t)||d3(t)||v3(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Dk(this._rgb);return t&&(t.a=Sr(t.a)),t}set rgb(t){this._rgb=o_(t)}rgbString(){return this._valid?g3(this._rgb):void 0}hexString(){return this._valid?e3(this._rgb):void 0}hslString(){return this._valid?u3(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,r=t.rgb;let s;const o=n===s?.5:n,a=2*o-1,c=i.a-r.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;s=1-l,i.r=255&l*i.r+s*r.r+.5,i.g=255&l*i.g+s*r.g+.5,i.b=255&l*i.b+s*r.b+.5,i.a=o*i.a+(1-o)*r.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=m3(this._rgb,t._rgb,n)),this}clone(){return new wu(this.rgb)}alpha(t){return this._rgb.a=Ts(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=ch(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ch(this._rgb,2,t),this}darken(t){return Ch(this._rgb,2,-t),this}saturate(t){return Ch(this._rgb,1,t),this}desaturate(t){return Ch(this._rgb,1,-t),this}rotate(t){return l3(this._rgb,t),this}}function br(){}const y3=(()=>{let e=0;return()=>e++})();function vt(e){return e==null}function Xt(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function _t(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function ue(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function Vn(e,t){return ue(e)?e:t}function lt(e,t){return typeof e>"u"?t:e}const b3=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,$k=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function Wt(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function It(e,t,n,i){let r,s,o;if(Xt(e))for(s=e.length,r=0;r<s;r++)t.call(n,e[r],r);else if(_t(e))for(o=Object.keys(e),s=o.length,r=0;r<s;r++)t.call(n,e[o[r]],o[r])}function sf(e,t){let n,i,r,s;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(r=e[n],s=t[n],r.datasetIndex!==s.datasetIndex||r.index!==s.index)return!1;return!0}function of(e){if(Xt(e))return e.map(of);if(_t(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let r=0;for(;r<i;++r)t[n[r]]=of(e[n[r]]);return t}return e}function Tk(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function _3(e,t,n,i){if(!Tk(e))return;const r=t[e],s=n[e];_t(r)&&_t(s)?lc(r,s,i):t[e]=of(s)}function lc(e,t,n){const i=Xt(t)?t:[t],r=i.length;if(!_t(e))return e;n=n||{};const s=n.merger||_3;let o;for(let a=0;a<r;++a){if(o=i[a],!_t(o))continue;const c=Object.keys(o);for(let l=0,u=c.length;l<u;++l)s(c[l],e,o,n)}return e}function Yl(e,t){return lc(e,t,{merger:w3})}function w3(e,t,n){if(!Tk(e))return;const i=t[e],r=n[e];_t(i)&&_t(r)?Yl(i,r):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=of(r))}const a_={"":e=>e,x:e=>e.x,y:e=>e.y};function x3(e){const t=e.split("."),n=[];let i="";for(const r of t)i+=r,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function C3(e){const t=x3(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function Ns(e,t){return(a_[t]||(a_[t]=C3(t)))(e)}function p0(e){return e.charAt(0).toUpperCase()+e.slice(1)}const xu=e=>typeof e<"u",Fs=e=>typeof e=="function",c_=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function k3(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Dt=Math.PI,Yt=2*Dt,S3=Yt+Dt,af=Number.POSITIVE_INFINITY,E3=Dt/180,fe=Dt/2,no=Dt/4,l_=Dt*2/3,ws=Math.log10,tr=Math.sign;function Vl(e,t,n){return Math.abs(e-t)<n}function u_(e){const t=Math.round(e);e=Vl(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(ws(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function M3(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((r,s)=>r-s).pop(),t}function D3(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function uc(e){return!D3(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function $3(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function Ok(e,t,n){let i,r,s;for(i=0,r=e.length;i<r;i++)s=e[i][n],isNaN(s)||(t.min=Math.min(t.min,s),t.max=Math.max(t.max,s))}function Ti(e){return e*(Dt/180)}function g0(e){return e*(180/Dt)}function h_(e){if(!ue(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function Ik(e,t){const n=t.x-e.x,i=t.y-e.y,r=Math.sqrt(n*n+i*i);let s=Math.atan2(i,n);return s<-.5*Dt&&(s+=Yt),{angle:s,distance:r}}function Mm(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function T3(e,t){return(e-t+S3)%Yt-Dt}function Qe(e){return(e%Yt+Yt)%Yt}function Cu(e,t,n,i){const r=Qe(e),s=Qe(t),o=Qe(n),a=Qe(s-r),c=Qe(o-r),l=Qe(r-s),u=Qe(r-o);return r===s||r===o||i&&s===o||a>c&&l<u}function Pe(e,t,n){return Math.max(t,Math.min(n,e))}function O3(e){return Pe(e,-32768,32767)}function Tr(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function m0(e,t,n){n=n||(o=>e[o]<t);let i=e.length-1,r=0,s;for(;i-r>1;)s=r+i>>1,n(s)?r=s:i=s;return{lo:r,hi:i}}const Or=(e,t,n,i)=>m0(e,n,i?r=>{const s=e[r][t];return s<n||s===n&&e[r+1][t]===n}:r=>e[r][t]<n),I3=(e,t,n)=>m0(e,n,i=>e[i][t]>=n);function P3(e,t,n){let i=0,r=e.length;for(;i<r&&e[i]<t;)i++;for(;r>i&&e[r-1]>n;)r--;return i>0||r<e.length?e.slice(i,r):e}const Pk=["push","pop","shift","splice","unshift"];function R3(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Pk.forEach(n=>{const i="_onData"+p0(n),r=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...s){const o=r.apply(this,s);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...s)}),o}})})}function d_(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,r=i.indexOf(t);r!==-1&&i.splice(r,1),!(i.length>0)&&(Pk.forEach(s=>{delete e[s]}),delete e._chartjs)}function Rk(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Ak=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Lk(e,t){let n=[],i=!1;return function(...r){n=r,i||(i=!0,Ak.call(window,()=>{i=!1,e.apply(t,n)}))}}function A3(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const v0=e=>e==="start"?"left":e==="end"?"right":"center",qe=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,L3=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function Nk(e,t,n){const i=t.length;let r=0,s=i;if(e._sorted){const{iScale:o,vScale:a,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,u=o.axis,{min:h,max:d,minDefined:f,maxDefined:p}=o.getUserBounds();if(f){if(r=Math.min(Or(c,u,h).lo,n?i:Or(t,u,o.getPixelForValue(h)).lo),l){const g=c.slice(0,r+1).reverse().findIndex(m=>!vt(m[a.axis]));r-=Math.max(0,g)}r=Pe(r,0,i-1)}if(p){let g=Math.max(Or(c,o.axis,d,!0).hi+1,n?0:Or(t,u,o.getPixelForValue(d),!0).hi+1);if(l){const m=c.slice(g-1).findIndex(b=>!vt(b[a.axis]));g+=Math.max(0,m)}s=Pe(g,r,i)-r}else s=i-r}return{start:r,count:s}}function Fk(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,r={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=r,!0;const s=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,r),s}const kh=e=>e===0||e===1,f_=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*Yt/n)),p_=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*Yt/n)+1,ql={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*fe)+1,easeOutSine:e=>Math.sin(e*fe),easeInOutSine:e=>-.5*(Math.cos(Dt*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>kh(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>kh(e)?e:f_(e,.075,.3),easeOutElastic:e=>kh(e)?e:p_(e,.075,.3),easeInOutElastic(e){return kh(e)?e:e<.5?.5*f_(e*2,.1125,.45):.5+.5*p_(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-ql.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?ql.easeInBounce(e*2)*.5:ql.easeOutBounce(e*2-1)*.5+.5};function y0(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function g_(e){return y0(e)?e:new wu(e)}function rg(e){return y0(e)?e:new wu(e).saturate(.5).darken(.1).hexString()}const N3=["x","y","borderWidth","radius","tension"],F3=["color","borderColor","backgroundColor"];function z3(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:F3},numbers:{type:"number",properties:N3}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function j3(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const m_=new Map;function B3(e,t){t=t||{};const n=e+JSON.stringify(t);let i=m_.get(n);return i||(i=new Intl.NumberFormat(e,t),m_.set(n,i)),i}function lh(e,t,n){return B3(t,n).format(e)}const zk={values(e){return Xt(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let r,s=e;if(n.length>1){const l=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(l<1e-4||l>1e15)&&(r="scientific"),s=W3(e,n)}const o=ws(Math.abs(s)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:r,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(c,this.options.ticks.format),lh(e,i,c)},logarithmic(e,t,n){if(e===0)return"0";const i=n[t].significand||e/Math.pow(10,Math.floor(ws(e)));return[1,2,3,5,10,15].includes(i)||t>.8*n.length?zk.numeric.call(this,e,t,n):""}};function W3(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Zf={formatters:zk};function H3(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Zf.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Uo=Object.create(null),Dm=Object.create(null);function Kl(e,t){if(!t)return e;const n=t.split(".");for(let i=0,r=n.length;i<r;++i){const s=n[i];e=e[s]||(e[s]=Object.create(null))}return e}function sg(e,t,n){return typeof t=="string"?lc(Kl(e,t),n):lc(Kl(e,""),t)}class U3{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,r)=>rg(r.backgroundColor),this.hoverBorderColor=(i,r)=>rg(r.borderColor),this.hoverColor=(i,r)=>rg(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return sg(this,t,n)}get(t){return Kl(this,t)}describe(t,n){return sg(Dm,t,n)}override(t,n){return sg(Uo,t,n)}route(t,n,i,r){const s=Kl(this,t),o=Kl(this,i),a="_"+n;Object.defineProperties(s,{[a]:{value:s[n],writable:!0},[n]:{enumerable:!0,get(){const c=this[a],l=o[r];return _t(c)?Object.assign({},l,c):lt(c,l)},set(c){this[a]=c}}})}apply(t){t.forEach(n=>n(this))}}var Zt=new U3({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[z3,j3,H3]);function Y3(e){return!e||vt(e.size)||vt(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function cf(e,t,n,i,r){let s=t[r];return s||(s=t[r]=e.measureText(r).width,n.push(r)),s>i&&(i=s),i}function V3(e,t,n,i){i=i||{};let r=i.data=i.data||{},s=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(r=i.data={},s=i.garbageCollect=[],i.font=t),e.save(),e.font=t;let o=0;const a=n.length;let c,l,u,h,d;for(c=0;c<a;c++)if(h=n[c],h!=null&&!Xt(h))o=cf(e,r,s,o,h);else if(Xt(h))for(l=0,u=h.length;l<u;l++)d=h[l],d!=null&&!Xt(d)&&(o=cf(e,r,s,o,d));e.restore();const f=s.length/2;if(f>n.length){for(c=0;c<f;c++)delete r[s[c]];s.splice(0,f)}return o}function io(e,t,n){const i=e.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((t-r)*i)/i+r}function v_(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function $m(e,t,n,i){jk(e,t,n,i,null)}function jk(e,t,n,i,r){let s,o,a,c,l,u,h,d;const f=t.pointStyle,p=t.rotation,g=t.radius;let m=(p||0)*E3;if(f&&typeof f=="object"&&(s=f.toString(),s==="[object HTMLImageElement]"||s==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(m),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(g)||g<=0)){switch(e.beginPath(),f){default:r?e.ellipse(n,i,r/2,g,0,0,Yt):e.arc(n,i,g,0,Yt),e.closePath();break;case"triangle":u=r?r/2:g,e.moveTo(n+Math.sin(m)*u,i-Math.cos(m)*g),m+=l_,e.lineTo(n+Math.sin(m)*u,i-Math.cos(m)*g),m+=l_,e.lineTo(n+Math.sin(m)*u,i-Math.cos(m)*g),e.closePath();break;case"rectRounded":l=g*.516,c=g-l,o=Math.cos(m+no)*c,h=Math.cos(m+no)*(r?r/2-l:c),a=Math.sin(m+no)*c,d=Math.sin(m+no)*(r?r/2-l:c),e.arc(n-h,i-a,l,m-Dt,m-fe),e.arc(n+d,i-o,l,m-fe,m),e.arc(n+h,i+a,l,m,m+fe),e.arc(n-d,i+o,l,m+fe,m+Dt),e.closePath();break;case"rect":if(!p){c=Math.SQRT1_2*g,u=r?r/2:c,e.rect(n-u,i-c,2*u,2*c);break}m+=no;case"rectRot":h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+d,i-o),e.lineTo(n+h,i+a),e.lineTo(n-d,i+o),e.closePath();break;case"crossRot":m+=no;case"cross":h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"star":h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o),m+=no,h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"line":o=r?r/2:Math.cos(m)*g,a=Math.sin(m)*g,e.moveTo(n-o,i-a),e.lineTo(n+o,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(m)*(r?r/2:g),i+Math.sin(m)*g);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Ir(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function Jf(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function tp(e){e.restore()}function q3(e,t,n,i,r){if(!t)return e.lineTo(n.x,n.y);if(r==="middle"){const s=(t.x+n.x)/2;e.lineTo(s,t.y),e.lineTo(s,n.y)}else r==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function K3(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function G3(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),vt(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function X3(e,t,n,i,r){if(r.strikethrough||r.underline){const s=e.measureText(i),o=t-s.actualBoundingBoxLeft,a=t+s.actualBoundingBoxRight,c=n-s.actualBoundingBoxAscent,l=n+s.actualBoundingBoxDescent,u=r.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=r.decorationWidth||2,e.moveTo(o,u),e.lineTo(a,u),e.stroke()}}function Q3(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function Yo(e,t,n,i,r,s={}){const o=Xt(t)?t:[t],a=s.strokeWidth>0&&s.strokeColor!=="";let c,l;for(e.save(),e.font=r.string,G3(e,s),c=0;c<o.length;++c)l=o[c],s.backdrop&&Q3(e,s.backdrop),a&&(s.strokeColor&&(e.strokeStyle=s.strokeColor),vt(s.strokeWidth)||(e.lineWidth=s.strokeWidth),e.strokeText(l,n,i,s.maxWidth)),e.fillText(l,n,i,s.maxWidth),X3(e,n,i,l,s),i+=Number(r.lineHeight);e.restore()}function ku(e,t){const{x:n,y:i,w:r,h:s,radius:o}=t;e.arc(n+o.topLeft,i+o.topLeft,o.topLeft,1.5*Dt,Dt,!0),e.lineTo(n,i+s-o.bottomLeft),e.arc(n+o.bottomLeft,i+s-o.bottomLeft,o.bottomLeft,Dt,fe,!0),e.lineTo(n+r-o.bottomRight,i+s),e.arc(n+r-o.bottomRight,i+s-o.bottomRight,o.bottomRight,fe,0,!0),e.lineTo(n+r,i+o.topRight),e.arc(n+r-o.topRight,i+o.topRight,o.topRight,0,-fe,!0),e.lineTo(n+o.topLeft,i)}const Z3=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,J3=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function tN(e,t){const n=(""+e).match(Z3);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const eN=e=>+e||0;function b0(e,t){const n={},i=_t(t),r=i?Object.keys(t):t,s=_t(e)?i?o=>lt(e[o],e[t[o]]):o=>e[o]:()=>e;for(const o of r)n[o]=eN(s(o));return n}function Bk(e){return b0(e,{top:"y",right:"x",bottom:"y",left:"x"})}function So(e){return b0(e,["topLeft","topRight","bottomLeft","bottomRight"])}function en(e){const t=Bk(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Ce(e,t){e=e||{},t=t||Zt.font;let n=lt(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=lt(e.style,t.style);i&&!(""+i).match(J3)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const r={family:lt(e.family,t.family),lineHeight:tN(lt(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:lt(e.weight,t.weight),string:""};return r.string=Y3(r),r}function ml(e,t,n,i){let r,s,o;for(r=0,s=e.length;r<s;++r)if(o=e[r],o!==void 0&&o!==void 0)return o}function nN(e,t,n){const{min:i,max:r}=e,s=$k(t,(r-i)/2),o=(a,c)=>n&&a===0?0:a+c;return{min:o(i,-Math.abs(s)),max:o(r,s)}}function Vs(e,t){return Object.assign(Object.create(e),t)}function _0(e,t=[""],n,i,r=()=>e[0]){const s=n||e;typeof i>"u"&&(i=Yk("_fallback",e));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:s,_fallback:i,_getTarget:r,override:a=>_0([a,...e],t,s,i)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete e[0][c],!0},get(a,c){return Hk(a,c,()=>uN(c,t,e,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,c){return b_(a).includes(c)},ownKeys(a){return b_(a)},set(a,c,l){const u=a._storage||(a._storage=r());return a[c]=u[c]=l,delete a._keys,!0}})}function hc(e,t,n,i){const r={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Wk(e,i),setContext:s=>hc(e,s,n,i),override:s=>hc(e.override(s),t,n,i)};return new Proxy(r,{deleteProperty(s,o){return delete s[o],delete e[o],!0},get(s,o,a){return Hk(s,o,()=>rN(s,o,a))},getOwnPropertyDescriptor(s,o){return s._descriptors.allKeys?Reflect.has(e,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,o)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(s,o){return Reflect.has(e,o)},ownKeys(){return Reflect.ownKeys(e)},set(s,o,a){return e[o]=a,delete s[o],!0}})}function Wk(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:r=t.allKeys}=e;return{allKeys:r,scriptable:n,indexable:i,isScriptable:Fs(n)?n:()=>n,isIndexable:Fs(i)?i:()=>i}}const iN=(e,t)=>e?e+p0(t):t,w0=(e,t)=>_t(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Hk(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function rN(e,t,n){const{_proxy:i,_context:r,_subProxy:s,_descriptors:o}=e;let a=i[t];return Fs(a)&&o.isScriptable(t)&&(a=sN(t,a,e,n)),Xt(a)&&a.length&&(a=oN(t,a,e,o.isIndexable)),w0(t,a)&&(a=hc(a,r,s&&s[t],o)),a}function sN(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let c=t(s,o||i);return a.delete(e),w0(e,c)&&(c=x0(r._scopes,r,e,c)),c}function oN(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_descriptors:a}=n;if(typeof s.index<"u"&&i(e))return t[s.index%t.length];if(_t(t[0])){const c=t,l=r._scopes.filter(u=>u!==c);t=[];for(const u of c){const h=x0(l,r,e,u);t.push(hc(h,s,o&&o[e],a))}}return t}function Uk(e,t,n){return Fs(e)?e(t,n):e}const aN=(e,t)=>e===!0?t:typeof e=="string"?Ns(t,e):void 0;function cN(e,t,n,i,r){for(const s of t){const o=aN(n,s);if(o){e.add(o);const a=Uk(o._fallback,n,r);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(o===!1&&typeof i<"u"&&n!==i)return null}return!1}function x0(e,t,n,i){const r=t._rootScopes,s=Uk(t._fallback,n,i),o=[...e,...r],a=new Set;a.add(i);let c=y_(a,o,n,s||n,i);return c===null||typeof s<"u"&&s!==n&&(c=y_(a,o,s,c,i),c===null)?!1:_0(Array.from(a),[""],r,s,()=>lN(t,n,i))}function y_(e,t,n,i,r){for(;n;)n=cN(e,t,n,i,r);return n}function lN(e,t,n){const i=e._getTarget();t in i||(i[t]={});const r=i[t];return Xt(r)&&_t(n)?n:r||{}}function uN(e,t,n,i){let r;for(const s of t)if(r=Yk(iN(s,e),n),typeof r<"u")return w0(e,r)?x0(n,i,e,r):r}function Yk(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function b_(e){let t=e._keys;return t||(t=e._keys=hN(e._scopes)),t}function hN(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(r=>!r.startsWith("_")))t.add(i);return Array.from(t)}function Vk(e,t,n,i){const{iScale:r}=e,{key:s="r"}=this._parsing,o=new Array(i);let a,c,l,u;for(a=0,c=i;a<c;++a)l=a+n,u=t[l],o[a]={r:r.parse(Ns(u,s),l)};return o}const dN=Number.EPSILON||1e-14,dc=(e,t)=>t<e.length&&!e[t].skip&&e[t],qk=e=>e==="x"?"y":"x";function fN(e,t,n,i){const r=e.skip?t:e,s=t,o=n.skip?t:n,a=Mm(s,r),c=Mm(o,s);let l=a/(a+c),u=c/(a+c);l=isNaN(l)?0:l,u=isNaN(u)?0:u;const h=i*l,d=i*u;return{previous:{x:s.x-h*(o.x-r.x),y:s.y-h*(o.y-r.y)},next:{x:s.x+d*(o.x-r.x),y:s.y+d*(o.y-r.y)}}}function pN(e,t,n){const i=e.length;let r,s,o,a,c,l=dc(e,0);for(let u=0;u<i-1;++u)if(c=l,l=dc(e,u+1),!(!c||!l)){if(Vl(t[u],0,dN)){n[u]=n[u+1]=0;continue}r=n[u]/t[u],s=n[u+1]/t[u],a=Math.pow(r,2)+Math.pow(s,2),!(a<=9)&&(o=3/Math.sqrt(a),n[u]=r*o*t[u],n[u+1]=s*o*t[u])}}function gN(e,t,n="x"){const i=qk(n),r=e.length;let s,o,a,c=dc(e,0);for(let l=0;l<r;++l){if(o=a,a=c,c=dc(e,l+1),!a)continue;const u=a[n],h=a[i];o&&(s=(u-o[n])/3,a[`cp1${n}`]=u-s,a[`cp1${i}`]=h-s*t[l]),c&&(s=(c[n]-u)/3,a[`cp2${n}`]=u+s,a[`cp2${i}`]=h+s*t[l])}}function mN(e,t="x"){const n=qk(t),i=e.length,r=Array(i).fill(0),s=Array(i);let o,a,c,l=dc(e,0);for(o=0;o<i;++o)if(a=c,c=l,l=dc(e,o+1),!!c){if(l){const u=l[t]-c[t];r[o]=u!==0?(l[n]-c[n])/u:0}s[o]=a?l?tr(r[o-1])!==tr(r[o])?0:(r[o-1]+r[o])/2:r[o-1]:r[o]}pN(e,r,s),gN(e,s,t)}function Sh(e,t,n){return Math.max(Math.min(e,n),t)}function vN(e,t){let n,i,r,s,o,a=Ir(e[0],t);for(n=0,i=e.length;n<i;++n)o=s,s=a,a=n<i-1&&Ir(e[n+1],t),s&&(r=e[n],o&&(r.cp1x=Sh(r.cp1x,t.left,t.right),r.cp1y=Sh(r.cp1y,t.top,t.bottom)),a&&(r.cp2x=Sh(r.cp2x,t.left,t.right),r.cp2y=Sh(r.cp2y,t.top,t.bottom)))}function yN(e,t,n,i,r){let s,o,a,c;if(t.spanGaps&&(e=e.filter(l=>!l.skip)),t.cubicInterpolationMode==="monotone")mN(e,r);else{let l=i?e[e.length-1]:e[0];for(s=0,o=e.length;s<o;++s)a=e[s],c=fN(l,a,e[Math.min(s+1,o-(i?0:1))%o],t.tension),a.cp1x=c.previous.x,a.cp1y=c.previous.y,a.cp2x=c.next.x,a.cp2y=c.next.y,l=a}t.capBezierPoints&&vN(e,n)}function C0(){return typeof window<"u"&&typeof document<"u"}function k0(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function lf(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const ep=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function bN(e,t){return ep(e).getPropertyValue(t)}const _N=["top","right","bottom","left"];function Eo(e,t,n){const i={};n=n?"-"+n:"";for(let r=0;r<4;r++){const s=_N[r];i[s]=parseFloat(e[t+"-"+s+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const wN=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function xN(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:r,offsetY:s}=i;let o=!1,a,c;if(wN(r,s,e.target))a=r,c=s;else{const l=t.getBoundingClientRect();a=i.clientX-l.left,c=i.clientY-l.top,o=!0}return{x:a,y:c,box:o}}function uo(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,r=ep(n),s=r.boxSizing==="border-box",o=Eo(r,"padding"),a=Eo(r,"border","width"),{x:c,y:l,box:u}=xN(e,n),h=o.left+(u&&a.left),d=o.top+(u&&a.top);let{width:f,height:p}=t;return s&&(f-=o.width+a.width,p-=o.height+a.height),{x:Math.round((c-h)/f*n.width/i),y:Math.round((l-d)/p*n.height/i)}}function CN(e,t,n){let i,r;if(t===void 0||n===void 0){const s=e&&k0(e);if(!s)t=e.clientWidth,n=e.clientHeight;else{const o=s.getBoundingClientRect(),a=ep(s),c=Eo(a,"border","width"),l=Eo(a,"padding");t=o.width-l.width-c.width,n=o.height-l.height-c.height,i=lf(a.maxWidth,s,"clientWidth"),r=lf(a.maxHeight,s,"clientHeight")}}return{width:t,height:n,maxWidth:i||af,maxHeight:r||af}}const xs=e=>Math.round(e*10)/10;function kN(e,t,n,i){const r=ep(e),s=Eo(r,"margin"),o=lf(r.maxWidth,e,"clientWidth")||af,a=lf(r.maxHeight,e,"clientHeight")||af,c=CN(e,t,n);let{width:l,height:u}=c;if(r.boxSizing==="content-box"){const d=Eo(r,"border","width"),f=Eo(r,"padding");l-=f.width+d.width,u-=f.height+d.height}return l=Math.max(0,l-s.width),u=Math.max(0,i?l/i:u-s.height),l=xs(Math.min(l,o,c.maxWidth)),u=xs(Math.min(u,a,c.maxHeight)),l&&!u&&(u=xs(l/2)),(t!==void 0||n!==void 0)&&i&&c.height&&u>c.height&&(u=c.height,l=xs(Math.floor(u*i))),{width:l,height:u}}function __(e,t,n){const i=t||1,r=xs(e.height*i),s=xs(e.width*i);e.height=xs(e.height),e.width=xs(e.width);const o=e.canvas;return o.style&&(n||!o.style.height&&!o.style.width)&&(o.style.height=`${e.height}px`,o.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||o.height!==r||o.width!==s?(e.currentDevicePixelRatio=i,o.height=r,o.width=s,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const SN=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};C0()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function w_(e,t){const n=bN(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function ho(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function EN(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function MN(e,t,n,i){const r={x:e.cp2x,y:e.cp2y},s={x:t.cp1x,y:t.cp1y},o=ho(e,r,n),a=ho(r,s,n),c=ho(s,t,n),l=ho(o,a,n),u=ho(a,c,n);return ho(l,u,n)}const DN=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},$N=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Ba(e,t,n){return e?DN(t,n):$N()}function Kk(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function Gk(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function Xk(e){return e==="angle"?{between:Cu,compare:T3,normalize:Qe}:{between:Tr,compare:(t,n)=>t-n,normalize:t=>t}}function x_({start:e,end:t,count:n,loop:i,style:r}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:r}}function TN(e,t,n){const{property:i,start:r,end:s}=n,{between:o,normalize:a}=Xk(i),c=t.length;let{start:l,end:u,loop:h}=e,d,f;if(h){for(l+=c,u+=c,d=0,f=c;d<f&&o(a(t[l%c][i]),r,s);++d)l--,u--;l%=c,u%=c}return u<l&&(u+=c),{start:l,end:u,loop:h,style:e.style}}function Qk(e,t,n){if(!n)return[e];const{property:i,start:r,end:s}=n,o=t.length,{compare:a,between:c,normalize:l}=Xk(i),{start:u,end:h,loop:d,style:f}=TN(e,t,n),p=[];let g=!1,m=null,b,_,C;const S=()=>c(r,C,b)&&a(r,C)!==0,k=()=>a(s,b)===0||c(s,C,b),$=()=>g||S(),D=()=>!g||k();for(let w=u,x=u;w<=h;++w)_=t[w%o],!_.skip&&(b=l(_[i]),b!==C&&(g=c(b,r,s),m===null&&$()&&(m=a(b,r)===0?w:x),m!==null&&D()&&(p.push(x_({start:m,end:w,loop:d,count:o,style:f})),m=null),x=w,C=b));return m!==null&&p.push(x_({start:m,end:h,loop:d,count:o,style:f})),p}function Zk(e,t){const n=[],i=e.segments;for(let r=0;r<i.length;r++){const s=Qk(i[r],e.points,t);s.length&&n.push(...s)}return n}function ON(e,t,n,i){let r=0,s=t-1;if(n&&!i)for(;r<t&&!e[r].skip;)r++;for(;r<t&&e[r].skip;)r++;for(r%=t,n&&(s+=r);s>r&&e[s%t].skip;)s--;return s%=t,{start:r,end:s}}function IN(e,t,n,i){const r=e.length,s=[];let o=t,a=e[t],c;for(c=t+1;c<=n;++c){const l=e[c%r];l.skip||l.stop?a.skip||(i=!1,s.push({start:t%r,end:(c-1)%r,loop:i}),t=o=l.stop?c:null):(o=c,a.skip&&(t=c)),a=l}return o!==null&&s.push({start:t%r,end:o%r,loop:i}),s}function PN(e,t){const n=e.points,i=e.options.spanGaps,r=n.length;if(!r)return[];const s=!!e._loop,{start:o,end:a}=ON(n,r,s,i);if(i===!0)return C_(e,[{start:o,end:a,loop:s}],n,t);const c=a<o?a+r:a,l=!!e._fullLoop&&o===0&&a===r-1;return C_(e,IN(n,o,c,l),n,t)}function C_(e,t,n,i){return!i||!i.setContext||!n?t:RN(e,t,n,i)}function RN(e,t,n,i){const r=e._chart.getContext(),s=k_(e.options),{_datasetIndex:o,options:{spanGaps:a}}=e,c=n.length,l=[];let u=s,h=t[0].start,d=h;function f(p,g,m,b){const _=a?-1:1;if(p!==g){for(p+=c;n[p%c].skip;)p-=_;for(;n[g%c].skip;)g+=_;p%c!==g%c&&(l.push({start:p%c,end:g%c,loop:m,style:b}),u=b,h=g%c)}}for(const p of t){h=a?h:p.start;let g=n[h%c],m;for(d=h+1;d<=p.end;d++){const b=n[d%c];m=k_(i.setContext(Vs(r,{type:"segment",p0:g,p1:b,p0DataIndex:(d-1)%c,p1DataIndex:d%c,datasetIndex:o}))),AN(m,u)&&f(h,d-1,p.loop,u),g=b,u=m}h<d-1&&f(h,d-1,p.loop,u)}return l}function k_(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function AN(e,t){if(!t)return!1;const n=[],i=function(r,s){return y0(s)?(n.includes(s)||n.push(s),n.indexOf(s)):s};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Eh(e,t,n){return e.options.clip?e[n]:t[n]}function LN(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Eh(n,t,"left"),right:Eh(n,t,"right"),top:Eh(i,t,"top"),bottom:Eh(i,t,"bottom")}:t}function Jk(e,t){const n=t._clip;if(n.disabled)return!1;const i=LN(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}class NN{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,r){const s=n.listeners[r],o=n.duration;s.forEach(a=>a({chart:t,initial:n.initial,numSteps:o,currentStep:Math.min(i-n.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=Ak.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,r)=>{if(!i.running||!i.items.length)return;const s=i.items;let o=s.length-1,a=!1,c;for(;o>=0;--o)c=s[o],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),a=!0):(s[o]=s[s.length-1],s.pop());a&&(r.draw(),this._notify(r,i,t,"progress")),s.length||(i.running=!1,this._notify(r,i,t,"complete"),i.initial=!1),n+=s.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,r)=>Math.max(i,r._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let r=i.length-1;for(;r>=0;--r)i[r].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var _r=new NN;const S_="transparent",FN={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=g_(e||S_),r=i.valid&&g_(t||S_);return r&&r.valid?r.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class zN{constructor(t,n,i,r){const s=n[i];r=ml([t.to,r,s,t.from]);const o=ml([t.from,s,r]);this._active=!0,this._fn=t.fn||FN[t.type||typeof o],this._easing=ql[t.easing]||ql.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=o,this._to=r,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const r=this._target[this._prop],s=i-this._start,o=this._duration-s;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=s,this._loop=!!t.loop,this._to=ml([t.to,n,r,t.from]),this._from=ml([t.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,r=this._prop,s=this._from,o=this._loop,a=this._to;let c;if(this._active=s!==a&&(o||n<i),!this._active){this._target[r]=a,this._notify(!0);return}if(n<0){this._target[r]=s;return}c=n/i%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[r]=this._fn(s,a,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let r=0;r<i.length;r++)i[r][n]()}}class tS{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!_t(t))return;const n=Object.keys(Zt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(r=>{const s=t[r];if(!_t(s))return;const o={};for(const a of n)o[a]=s[a];(Xt(s.properties)&&s.properties||[r]).forEach(a=>{(a===r||!i.has(a))&&i.set(a,o)})})}_animateOptions(t,n){const i=n.options,r=BN(t,i);if(!r)return[];const s=this._createAnimations(r,i);return i.$shared&&jN(t.options.$animations,i).then(()=>{t.options=i},()=>{}),s}_createAnimations(t,n){const i=this._properties,r=[],s=t.$animations||(t.$animations={}),o=Object.keys(n),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const l=o[c];if(l.charAt(0)==="$")continue;if(l==="options"){r.push(...this._animateOptions(t,n));continue}const u=n[l];let h=s[l];const d=i.get(l);if(h)if(d&&h.active()){h.update(d,u,a);continue}else h.cancel();if(!d||!d.duration){t[l]=u;continue}s[l]=h=new zN(d,t,l,u),r.push(h)}return r}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return _r.add(this._chart,i),!0}}function jN(e,t){const n=[],i=Object.keys(t);for(let r=0;r<i.length;r++){const s=e[i[r]];s&&s.active()&&n.push(s.wait())}return Promise.all(n)}function BN(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function E_(e,t){const n=e&&e.options||{},i=n.reverse,r=n.min===void 0?t:0,s=n.max===void 0?t:0;return{start:i?s:r,end:i?r:s}}function WN(e,t,n){if(n===!1)return!1;const i=E_(e,n),r=E_(t,n);return{top:r.end,right:i.end,bottom:r.start,left:i.start}}function HN(e){let t,n,i,r;return _t(e)?(t=e.top,n=e.right,i=e.bottom,r=e.left):t=n=i=r=e,{top:t,right:n,bottom:i,left:r,disabled:e===!1}}function eS(e,t){const n=[],i=e._getSortedDatasetMetas(t);let r,s;for(r=0,s=i.length;r<s;++r)n.push(i[r].index);return n}function M_(e,t,n,i={}){const r=e.keys,s=i.mode==="single";let o,a,c,l;if(t===null)return;let u=!1;for(o=0,a=r.length;o<a;++o){if(c=+r[o],c===n){if(u=!0,i.all)continue;break}l=e.values[c],ue(l)&&(s||t===0||tr(t)===tr(l))&&(t+=l)}return!u&&!i.all?0:t}function UN(e,t){const{iScale:n,vScale:i}=t,r=n.axis==="x"?"x":"y",s=i.axis==="x"?"x":"y",o=Object.keys(e),a=new Array(o.length);let c,l,u;for(c=0,l=o.length;c<l;++c)u=o[c],a[c]={[r]:u,[s]:e[u]};return a}function og(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function YN(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function VN(e){const{min:t,max:n,minDefined:i,maxDefined:r}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function qN(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function D_(e,t,n,i){for(const r of t.getMatchingVisibleMetas(i).reverse()){const s=e[r.index];if(n&&s>0||!n&&s<0)return r.index}return null}function $_(e,t){const{chart:n,_cachedMeta:i}=e,r=n._stacks||(n._stacks={}),{iScale:s,vScale:o,index:a}=i,c=s.axis,l=o.axis,u=YN(s,o,i),h=t.length;let d;for(let f=0;f<h;++f){const p=t[f],{[c]:g,[l]:m}=p,b=p._stacks||(p._stacks={});d=b[l]=qN(r,u,g),d[a]=m,d._top=D_(d,o,!0,i.type),d._bottom=D_(d,o,!1,i.type);const _=d._visualValues||(d._visualValues={});_[a]=m}}function ag(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function KN(e,t){return Vs(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function GN(e,t,n){return Vs(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function Hc(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const r of t){const s=r._stacks;if(!s||s[i]===void 0||s[i][n]===void 0)return;delete s[i][n],s[i]._visualValues!==void 0&&s[i]._visualValues[n]!==void 0&&delete s[i]._visualValues[n]}}}const cg=e=>e==="reset"||e==="none",T_=(e,t)=>t?e:Object.assign({},e),XN=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:eS(n,!0),values:null};class qs{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=og(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Hc(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),r=(h,d,f,p)=>h==="x"?d:h==="r"?p:f,s=n.xAxisID=lt(i.xAxisID,ag(t,"x")),o=n.yAxisID=lt(i.yAxisID,ag(t,"y")),a=n.rAxisID=lt(i.rAxisID,ag(t,"r")),c=n.indexAxis,l=n.iAxisID=r(c,s,o,a),u=n.vAxisID=r(c,o,s,a);n.xScale=this.getScaleForId(s),n.yScale=this.getScaleForId(o),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(l),n.vScale=this.getScaleForId(u)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&d_(this._data,this),t._stacked&&Hc(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(_t(n)){const r=this._cachedMeta;this._data=UN(n,r)}else if(i!==n){if(i){d_(i,this);const r=this._cachedMeta;Hc(r),r._parsed=[]}n&&Object.isExtensible(n)&&R3(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let r=!1;this._dataCheck();const s=n._stacked;n._stacked=og(n.vScale,n),n.stack!==i.stack&&(r=!0,Hc(n),n.stack=i.stack),this._resyncElements(t),(r||s!==n._stacked)&&($_(this,n._parsed),n._stacked=og(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:r}=this,{iScale:s,_stacked:o}=i,a=s.axis;let c=t===0&&n===r.length?!0:i._sorted,l=t>0&&i._parsed[t-1],u,h,d;if(this._parsing===!1)i._parsed=r,i._sorted=!0,d=r;else{Xt(r[t])?d=this.parseArrayData(i,r,t,n):_t(r[t])?d=this.parseObjectData(i,r,t,n):d=this.parsePrimitiveData(i,r,t,n);const f=()=>h[a]===null||l&&h[a]<l[a];for(u=0;u<n;++u)i._parsed[u+t]=h=d[u],c&&(f()&&(c=!1),l=h);i._sorted=c}o&&$_(this,d)}parsePrimitiveData(t,n,i,r){const{iScale:s,vScale:o}=t,a=s.axis,c=o.axis,l=s.getLabels(),u=s===o,h=new Array(r);let d,f,p;for(d=0,f=r;d<f;++d)p=d+i,h[d]={[a]:u||s.parse(l[p],p),[c]:o.parse(n[p],p)};return h}parseArrayData(t,n,i,r){const{xScale:s,yScale:o}=t,a=new Array(r);let c,l,u,h;for(c=0,l=r;c<l;++c)u=c+i,h=n[u],a[c]={x:s.parse(h[0],u),y:o.parse(h[1],u)};return a}parseObjectData(t,n,i,r){const{xScale:s,yScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(r);let u,h,d,f;for(u=0,h=r;u<h;++u)d=u+i,f=n[d],l[u]={x:s.parse(Ns(f,a),d),y:o.parse(Ns(f,c),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const r=this.chart,s=this._cachedMeta,o=n[t.axis],a={keys:eS(r,!0),values:n._stacks[t.axis]._visualValues};return M_(a,o,s.index,{mode:i})}updateRangeFromParsed(t,n,i,r){const s=i[n.axis];let o=s===null?NaN:s;const a=r&&i._stacks[n.axis];r&&a&&(r.values=a,o=M_(r,s,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,n){const i=this._cachedMeta,r=i._parsed,s=i._sorted&&t===i.iScale,o=r.length,a=this._getOtherScale(t),c=XN(n,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:u,max:h}=VN(a);let d,f;function p(){f=r[d];const g=f[a.axis];return!ue(f[t.axis])||u>g||h<g}for(d=0;d<o&&!(!p()&&(this.updateRangeFromParsed(l,t,f,c),s));++d);if(s){for(d=o-1;d>=0;--d)if(!p()){this.updateRangeFromParsed(l,t,f,c);break}}return l}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let r,s,o;for(r=0,s=n.length;r<s;++r)o=n[r][t.axis],ue(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,r=n.vScale,s=this.getParsed(t);return{label:i?""+i.getLabelForValue(s[i.axis]):"",value:r?""+r.getLabelForValue(s[r.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=HN(lt(this.options.clip,WN(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,r=i.data||[],s=n.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||r.length-a,l=this.options.drawActiveElementsOnTop;let u;for(i.dataset&&i.dataset.draw(t,s,a,c),u=a;u<a+c;++u){const h=r[u];h.hidden||(h.active&&l?o.push(h):h.draw(t,s))}for(u=0;u<o.length;++u)o[u].draw(t,s)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const r=this.getDataset();let s;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];s=o.$context||(o.$context=GN(this.getContext(),t,o)),s.parsed=this.getParsed(t),s.raw=r.data[t],s.index=s.dataIndex=t}else s=this.$context||(this.$context=KN(this.chart.getContext(),this.index)),s.dataset=r,s.index=s.datasetIndex=this.index;return s.active=!!n,s.mode=i,s}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const r=n==="active",s=this._cachedDataOpts,o=t+"-"+n,a=s[o],c=this.enableOptionSharing&&xu(i);if(a)return T_(a,c);const l=this.chart.config,u=l.datasetElementScopeKeys(this._type,t),h=r?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),u),f=Object.keys(Zt.elements[t]),p=()=>this.getContext(i,r,n),g=l.resolveNamedOptions(d,f,p,h);return g.$shared&&(g.$shared=c,s[o]=Object.freeze(T_(g,c))),g}_resolveAnimations(t,n,i){const r=this.chart,s=this._cachedDataOpts,o=`animation-${n}`,a=s[o];if(a)return a;let c;if(r.options.animation!==!1){const u=this.chart.config,h=u.datasetAnimationScopeKeys(this._type,n),d=u.getOptionScopes(this.getDataset(),h);c=u.createResolver(d,this.getContext(t,i,n))}const l=new tS(r,c&&c.animations);return c&&c._cacheable&&(s[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||cg(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),r=this._sharedOptions,s=this.getSharedOptions(i),o=this.includeOptions(n,s)||s!==r;return this.updateSharedOptions(s,n,i),{sharedOptions:s,includeOptions:o}}updateElement(t,n,i,r){cg(r)?Object.assign(t,i):this._resolveAnimations(n,r).update(t,i)}updateSharedOptions(t,n,i){t&&!cg(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,r){t.active=r;const s=this.getStyle(n,r);this._resolveAnimations(n,i,r).update(t,{options:!r&&this.getSharedOptions(s)||s})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const r=i.length,s=n.length,o=Math.min(s,r);o&&this.parse(0,o),s>r?this._insertElements(r,s-r,t):s<r&&this._removeElements(s,r-s)}_insertElements(t,n,i=!0){const r=this._cachedMeta,s=r.data,o=t+n;let a;const c=l=>{for(l.length+=n,a=l.length-1;a>=o;a--)l[a]=l[a-n]};for(c(s),a=t;a<o;++a)s[a]=new this.dataElementType;this._parsing&&c(r._parsed),this.parse(t,n),i&&this.updateElements(s,t,n,"reset")}updateElements(t,n,i,r){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const r=i._parsed.splice(t,n);i._stacked&&Hc(i,r)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,r]=t;this[n](i,r)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function QN(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let i=[];for(let r=0,s=n.length;r<s;r++)i=i.concat(n[r].controller.getAllParsedValues(e));e._cache.$bar=Rk(i.sort((r,s)=>r-s))}return e._cache.$bar}function ZN(e){const t=e.iScale,n=QN(t,e.type);let i=t._length,r,s,o,a;const c=()=>{o===32767||o===-32768||(xu(a)&&(i=Math.min(i,Math.abs(o-a)||i)),a=o)};for(r=0,s=n.length;r<s;++r)o=t.getPixelForValue(n[r]),c();for(a=void 0,r=0,s=t.ticks.length;r<s;++r)o=t.getPixelForTick(r),c();return i}function JN(e,t,n,i){const r=n.barThickness;let s,o;return vt(r)?(s=t.min*n.categoryPercentage,o=n.barPercentage):(s=r*i,o=1),{chunk:s/i,ratio:o,start:t.pixels[e]-s/2}}function t6(e,t,n,i){const r=t.pixels,s=r[e];let o=e>0?r[e-1]:null,a=e<r.length-1?r[e+1]:null;const c=n.categoryPercentage;o===null&&(o=s-(a===null?t.end-t.start:a-s)),a===null&&(a=s+s-o);const l=s-(s-Math.min(o,a))/2*c;return{chunk:Math.abs(a-o)/2*c/i,ratio:n.barPercentage,start:l}}function e6(e,t,n,i){const r=n.parse(e[0],i),s=n.parse(e[1],i),o=Math.min(r,s),a=Math.max(r,s);let c=o,l=a;Math.abs(o)>Math.abs(a)&&(c=a,l=o),t[n.axis]=l,t._custom={barStart:c,barEnd:l,start:r,end:s,min:o,max:a}}function nS(e,t,n,i){return Xt(e)?e6(e,t,n,i):t[n.axis]=n.parse(e,i),t}function O_(e,t,n,i){const r=e.iScale,s=e.vScale,o=r.getLabels(),a=r===s,c=[];let l,u,h,d;for(l=n,u=n+i;l<u;++l)d=t[l],h={},h[r.axis]=a||r.parse(o[l],l),c.push(nS(d,h,s,l));return c}function lg(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function n6(e,t,n){return e!==0?tr(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function i6(e){let t,n,i,r,s;return e.horizontal?(t=e.base>e.x,n="left",i="right"):(t=e.base<e.y,n="bottom",i="top"),t?(r="end",s="start"):(r="start",s="end"),{start:n,end:i,reverse:t,top:r,bottom:s}}function r6(e,t,n,i){let r=t.borderSkipped;const s={};if(!r){e.borderSkipped=s;return}if(r===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:c,top:l,bottom:u}=i6(e);r==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===i?r=l:(n._bottom||0)===i?r=u:(s[I_(u,o,a,c)]=!0,r=l)),s[I_(r,o,a,c)]=!0,e.borderSkipped=s}function I_(e,t,n,i){return i?(e=s6(e,t,n),e=P_(e,n,t)):e=P_(e,t,n),e}function s6(e,t,n){return e===t?n:e===n?t:e}function P_(e,t,n){return e==="start"?t:e==="end"?n:e}function o6(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class a6 extends qs{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,n,i,r){return O_(t,n,i,r)}parseArrayData(t,n,i,r){return O_(t,n,i,r)}parseObjectData(t,n,i,r){const{iScale:s,vScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=s.axis==="x"?a:c,u=o.axis==="x"?a:c,h=[];let d,f,p,g;for(d=i,f=i+r;d<f;++d)g=n[d],p={},p[s.axis]=s.parse(Ns(g,l),d),h.push(nS(Ns(g,u),p,o,d));return h}updateRangeFromParsed(t,n,i,r){super.updateRangeFromParsed(t,n,i,r);const s=i._custom;s&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,s.min),t.max=Math.max(t.max,s.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:i,vScale:r}=n,s=this.getParsed(t),o=s._custom,a=lg(o)?"["+o.start+", "+o.end+"]":""+r.getLabelForValue(s[r.axis]);return{label:""+i.getLabelForValue(s[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,i,r){const s=r==="reset",{index:o,_cachedMeta:{vScale:a}}=this,c=a.getBasePixel(),l=a.isHorizontal(),u=this._getRuler(),{sharedOptions:h,includeOptions:d}=this._getSharedOptions(n,r);for(let f=n;f<n+i;f++){const p=this.getParsed(f),g=s||vt(p[a.axis])?{base:c,head:c}:this._calculateBarValuePixels(f),m=this._calculateBarIndexPixels(f,u),b=(p._stacks||{})[a.axis],_={horizontal:l,base:g.base,enableBorderRadius:!b||lg(p._custom)||o===b._top||o===b._bottom,x:l?g.head:m.center,y:l?m.center:g.head,height:l?m.size:Math.abs(g.size),width:l?Math.abs(g.size):m.size};d&&(_.options=h||this.resolveDataElementOptions(f,t[f].active?"active":r));const C=_.options||t[f].options;r6(_,C,b,o),o6(_,C,u.ratio),this.updateElement(t[f],f,_,r)}}_getStacks(t,n){const{iScale:i}=this._cachedMeta,r=i.getMatchingVisibleMetas(this._type).filter(u=>u.controller.options.grouped),s=i.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(n),c=a&&a[i.axis],l=u=>{const h=u._parsed.find(f=>f[i.axis]===c),d=h&&h[u.vScale.axis];if(vt(d)||isNaN(d))return!0};for(const u of r)if(!(n!==void 0&&l(u))&&((s===!1||o.indexOf(u.stack)===-1||s===void 0&&u.stack===void 0)&&o.push(u.stack),u.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[lt(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,i){const r=this._getStacks(t,i),s=n!==void 0?r.indexOf(n):-1;return s===-1?r.length-1:s}_getRuler(){const t=this.options,n=this._cachedMeta,i=n.iScale,r=[];let s,o;for(s=0,o=n.data.length;s<o;++s)r.push(i.getPixelForValue(this.getParsed(s)[i.axis],s));const a=t.barThickness;return{min:a||ZN(n),pixels:r,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:i,index:r},options:{base:s,minBarLength:o}}=this,a=s||0,c=this.getParsed(t),l=c._custom,u=lg(l);let h=c[n.axis],d=0,f=i?this.applyStack(n,c,i):h,p,g;f!==h&&(d=f-h,f=h),u&&(h=l.barStart,f=l.barEnd-l.barStart,h!==0&&tr(h)!==tr(l.barEnd)&&(d=0),d+=h);const m=!vt(s)&&!u?s:d;let b=n.getPixelForValue(m);if(this.chart.getDataVisibility(t)?p=n.getPixelForValue(d+f):p=b,g=p-b,Math.abs(g)<o){g=n6(g,n,a)*o,h===a&&(b-=g/2);const _=n.getPixelForDecimal(0),C=n.getPixelForDecimal(1),S=Math.min(_,C),k=Math.max(_,C);b=Math.max(Math.min(b,k),S),p=b+g,i&&!u&&(c._stacks[n.axis]._visualValues[r]=n.getValueForPixel(p)-n.getValueForPixel(b))}if(b===n.getPixelForValue(a)){const _=tr(g)*n.getLineWidthForValue(a)/2;b+=_,g-=_}return{size:g,base:b,head:p,center:p+g/2}}_calculateBarIndexPixels(t,n){const i=n.scale,r=this.options,s=r.skipNull,o=lt(r.maxBarThickness,1/0);let a,c;const l=this._getAxisCount();if(n.grouped){const u=s?this._getStackCount(t):n.stackCount,h=r.barThickness==="flex"?t6(t,n,r,u*l):JN(t,n,r,u*l),d=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(lt(d,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,s?t:void 0)+f;a=h.start+h.chunk*p+h.chunk/2,c=Math.min(o,h.chunk*h.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(o,n.min*n.ratio);return{base:a-c/2,head:a+c/2,center:a,size:c}}draw(){const t=this._cachedMeta,n=t.vScale,i=t.data,r=i.length;let s=0;for(;s<r;++s)this.getParsed(s)[n.axis]!==null&&!i[s].hidden&&i[s].draw(this._ctx)}}class c6 extends qs{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,i,r){const s=super.parsePrimitiveData(t,n,i,r);for(let o=0;o<s.length;o++)s[o]._custom=this.resolveDataElementOptions(o+i).radius;return s}parseArrayData(t,n,i,r){const s=super.parseArrayData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=lt(a[2],this.resolveDataElementOptions(o+i).radius)}return s}parseObjectData(t,n,i,r){const s=super.parseObjectData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=lt(a&&a.r&&+a.r,this.resolveDataElementOptions(o+i).radius)}return s}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let i=t.length-1;i>=0;--i)n=Math.max(n,t[i].size(this.resolveDataElementOptions(i))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y),l=o._custom;return{label:i[t]||"",value:"("+a+", "+c+(l?", "+l:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:c,includeOptions:l}=this._getSharedOptions(n,r),u=o.axis,h=a.axis;for(let d=n;d<n+i;d++){const f=t[d],p=!s&&this.getParsed(d),g={},m=g[u]=s?o.getPixelForDecimal(.5):o.getPixelForValue(p[u]),b=g[h]=s?a.getBasePixel():a.getPixelForValue(p[h]);g.skip=isNaN(m)||isNaN(b),l&&(g.options=c||this.resolveDataElementOptions(d,f.active?"active":r),s&&(g.options.radius=0)),this.updateElement(f,d,g,r)}}resolveDataElementOptions(t,n){const i=this.getParsed(t);let r=super.resolveDataElementOptions(t,n);r.$shared&&(r=Object.assign({},r,{$shared:!1}));const s=r.radius;return n!=="active"&&(r.radius=0),r.radius+=lt(i&&i._custom,s),r}}function l6(e,t,n){let i=1,r=1,s=0,o=0;if(t<Yt){const a=e,c=a+t,l=Math.cos(a),u=Math.sin(a),h=Math.cos(c),d=Math.sin(c),f=(C,S,k)=>Cu(C,a,c,!0)?1:Math.max(S,S*n,k,k*n),p=(C,S,k)=>Cu(C,a,c,!0)?-1:Math.min(S,S*n,k,k*n),g=f(0,l,h),m=f(fe,u,d),b=p(Dt,l,h),_=p(Dt+fe,u,d);i=(g-b)/2,r=(m-_)/2,s=-(g+b)/2,o=-(m+_)/2}return{ratioX:i,ratioY:r,offsetX:s,offsetY:o}}class S0 extends qs{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((c,l)=>{const h=t.getDatasetMeta(0).controller.getStyle(l);return{text:c,fillStyle:h.backgroundColor,fontColor:s,hidden:!t.getDataVisibility(l),lineDash:h.borderDash,lineDashOffset:h.borderDashOffset,lineJoin:h.borderJoinStyle,lineWidth:h.borderWidth,strokeStyle:h.borderColor,textAlign:r,pointStyle:i,borderRadius:o&&(a||h.borderRadius),index:l}}):[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}}};constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const i=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=i;else{let s=c=>+i[c];if(_t(i[t])){const{key:c="value"}=this._parsing;s=l=>+Ns(i[l],c)}let o,a;for(o=t,a=t+n;o<a;++o)r._parsed[o]=s(o)}}_getRotation(){return Ti(this.options.rotation-90)}_getCircumference(){return Ti(this.options.circumference)}_getRotationExtents(){let t=Yt,n=-Yt;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const r=this.chart.getDatasetMeta(i).controller,s=r._getRotation(),o=r._getCircumference();t=Math.min(t,s),n=Math.max(n,s+o)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:i}=n,r=this._cachedMeta,s=r.data,o=this.getMaxBorderWidth()+this.getMaxOffset(s)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),c=Math.min(b3(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:u,rotation:h}=this._getRotationExtents(),{ratioX:d,ratioY:f,offsetX:p,offsetY:g}=l6(h,u,c),m=(i.width-o)/d,b=(i.height-o)/f,_=Math.max(Math.min(m,b)/2,0),C=$k(this.options.radius,_),S=Math.max(C*c,0),k=(C-S)/this._getVisibleDatasetWeightTotal();this.offsetX=p*C,this.offsetY=g*C,r.total=this.calculateTotal(),this.outerRadius=C-k*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-k*l,0),this.updateElements(s,0,s.length,t)}_circumference(t,n){const i=this.options,r=this._cachedMeta,s=this._getCircumference();return n&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||r._parsed[t]===null||r.data[t].hidden?0:this.calculateCircumference(r._parsed[t]*s/Yt)}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,a=o.chartArea,l=o.options.animation,u=(a.left+a.right)/2,h=(a.top+a.bottom)/2,d=s&&l.animateScale,f=d?0:this.innerRadius,p=d?0:this.outerRadius,{sharedOptions:g,includeOptions:m}=this._getSharedOptions(n,r);let b=this._getRotation(),_;for(_=0;_<n;++_)b+=this._circumference(_,s);for(_=n;_<n+i;++_){const C=this._circumference(_,s),S=t[_],k={x:u+this.offsetX,y:h+this.offsetY,startAngle:b,endAngle:b+C,circumference:C,outerRadius:p,innerRadius:f};m&&(k.options=g||this.resolveDataElementOptions(_,S.active?"active":r)),b+=C,this.updateElement(S,_,k,r)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let i=0,r;for(r=0;r<n.length;r++){const s=t._parsed[r];s!==null&&!isNaN(s)&&this.chart.getDataVisibility(r)&&!n[r].hidden&&(i+=Math.abs(s))}return i}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?Yt*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=lh(n._parsed[t],i.options.locale);return{label:r[t]||"",value:s}}getMaxBorderWidth(t){let n=0;const i=this.chart;let r,s,o,a,c;if(!t){for(r=0,s=i.data.datasets.length;r<s;++r)if(i.isDatasetVisible(r)){o=i.getDatasetMeta(r),t=o.data,a=o.controller;break}}if(!t)return 0;for(r=0,s=t.length;r<s;++r)c=a.resolveDataElementOptions(r),c.borderAlign!=="inner"&&(n=Math.max(n,c.borderWidth||0,c.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let i=0,r=t.length;i<r;++i){const s=this.resolveDataElementOptions(i);n=Math.max(n,s.offset||0,s.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(n+=this._getRingWeight(i));return n}_getRingWeight(t){return Math.max(lt(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class u6 extends qs{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:r=[],_dataset:s}=n,o=this.chart._animationsDisabled;let{start:a,count:c}=Nk(n,r,o);this._drawStart=a,this._drawCount=c,Fk(n)&&(a=0,c=r.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!s._decimated,i.points=r;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:l},t),this.updateElements(r,a,c,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,{sharedOptions:u,includeOptions:h}=this._getSharedOptions(n,r),d=o.axis,f=a.axis,{spanGaps:p,segment:g}=this.options,m=uc(p)?p:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||s||r==="none",_=n+i,C=t.length;let S=n>0&&this.getParsed(n-1);for(let k=0;k<C;++k){const $=t[k],D=b?$:{};if(k<n||k>=_){D.skip=!0;continue}const w=this.getParsed(k),x=vt(w[f]),M=D[d]=o.getPixelForValue(w[d],k),O=D[f]=s||x?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,w,c):w[f],k);D.skip=isNaN(M)||isNaN(O)||x,D.stop=k>0&&Math.abs(w[d]-S[d])>m,g&&(D.parsed=w,D.raw=l.data[k]),h&&(D.options=u||this.resolveDataElementOptions(k,$.active?"active":r)),b||this.updateElement($,k,D,r),S=w}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,r=t.data||[];if(!r.length)return i;const s=r[0].size(this.resolveDataElementOptions(0)),o=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(i,s,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}class iS extends qs{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:i,color:r}}=t.legend.options;return n.labels.map((s,o)=>{const c=t.getDatasetMeta(0).controller.getStyle(o);return{text:s,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:r,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=lh(n._parsed[t].r,i.options.locale);return{label:r[t]||"",value:s}}parseObjectData(t,n,i,r){return Vk.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,r)=>{const s=this.getParsed(r).r;!isNaN(s)&&this.chart.getDataVisibility(r)&&(s<n.min&&(n.min=s),s>n.max&&(n.max=s))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,i=t.options,r=Math.min(n.right-n.left,n.bottom-n.top),s=Math.max(r/2,0),o=Math.max(i.cutoutPercentage?s/100*i.cutoutPercentage:1,0),a=(s-o)/t.getVisibleDatasetCount();this.outerRadius=s-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,c=o.options.animation,l=this._cachedMeta.rScale,u=l.xCenter,h=l.yCenter,d=l.getIndexAngle(0)-.5*Dt;let f=d,p;const g=360/this.countVisibleElements();for(p=0;p<n;++p)f+=this._computeAngle(p,r,g);for(p=n;p<n+i;p++){const m=t[p];let b=f,_=f+this._computeAngle(p,r,g),C=o.getDataVisibility(p)?l.getDistanceFromCenterForValue(this.getParsed(p).r):0;f=_,s&&(c.animateScale&&(C=0),c.animateRotate&&(b=_=d));const S={x:u,y:h,innerRadius:0,outerRadius:C,startAngle:b,endAngle:_,options:this.resolveDataElementOptions(p,m.active?"active":r)};this.updateElement(m,p,S,r)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((i,r)=>{!isNaN(this.getParsed(r).r)&&this.chart.getDataVisibility(r)&&n++}),n}_computeAngle(t,n,i){return this.chart.getDataVisibility(t)?Ti(this.resolveDataElementOptions(t,n).angle||i):0}}class h6 extends S0{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}class d6 extends qs{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const n=this._cachedMeta.vScale,i=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(i[n.axis])}}parseObjectData(t,n,i,r){return Vk.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta,i=n.dataset,r=n.data||[],s=n.iScale.getLabels();if(i.points=r,t!=="resize"){const o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);const a={_loop:!0,_fullLoop:s.length===r.length,options:o};this.updateElement(i,void 0,a,t)}this.updateElements(r,0,r.length,t)}updateElements(t,n,i,r){const s=this._cachedMeta.rScale,o=r==="reset";for(let a=n;a<n+i;a++){const c=t[a],l=this.resolveDataElementOptions(a,c.active?"active":r),u=s.getPointPositionForValue(a,this.getParsed(a).r),h=o?s.xCenter:u.x,d=o?s.yCenter:u.y,f={x:h,y:d,angle:u.angle,skip:isNaN(h)||isNaN(d),options:l};this.updateElement(c,a,f,r)}}}class f6 extends qs{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y);return{label:i[t]||"",value:"("+a+", "+c+")"}}update(t){const n=this._cachedMeta,{data:i=[]}=n,r=this.chart._animationsDisabled;let{start:s,count:o}=Nk(n,i,r);if(this._drawStart=s,this._drawCount=o,Fk(n)&&(s=0,o=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:c}=n;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!c._decimated,a.points=i;const l=this.resolveDatasetElementOptions(t);l.segment=this.options.segment,this.updateElement(a,void 0,{animated:!r,options:l},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(i,s,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,u=this.resolveDataElementOptions(n,r),h=this.getSharedOptions(u),d=this.includeOptions(r,h),f=o.axis,p=a.axis,{spanGaps:g,segment:m}=this.options,b=uc(g)?g:Number.POSITIVE_INFINITY,_=this.chart._animationsDisabled||s||r==="none";let C=n>0&&this.getParsed(n-1);for(let S=n;S<n+i;++S){const k=t[S],$=this.getParsed(S),D=_?k:{},w=vt($[p]),x=D[f]=o.getPixelForValue($[f],S),M=D[p]=s||w?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,$,c):$[p],S);D.skip=isNaN(x)||isNaN(M)||w,D.stop=S>0&&Math.abs($[f]-C[f])>b,m&&(D.parsed=$,D.raw=l.data[S]),d&&(D.options=h||this.resolveDataElementOptions(S,k.active?"active":r)),_||this.updateElement(k,S,D,r),C=$}this.updateSharedOptions(h,r,u)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let a=0;for(let c=n.length-1;c>=0;--c)a=Math.max(a,n[c].size(this.resolveDataElementOptions(c))/2);return a>0&&a}const i=t.dataset,r=i.options&&i.options.borderWidth||0;if(!n.length)return r;const s=n[0].size(this.resolveDataElementOptions(0)),o=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(r,s,o)/2}}var p6=Object.freeze({__proto__:null,BarController:a6,BubbleController:c6,DoughnutController:S0,LineController:u6,PieController:h6,PolarAreaController:iS,RadarController:d6,ScatterController:f6});function ro(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class E0{static override(t){Object.assign(E0.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return ro()}parse(){return ro()}format(){return ro()}add(){return ro()}diff(){return ro()}startOf(){return ro()}endOf(){return ro()}}var g6={_date:E0};function m6(e,t,n,i){const{controller:r,data:s,_sorted:o}=e,a=r._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&s.length){const l=a._reversePixels?I3:Or;if(i){if(r._sharedOptions){const u=s[0],h=typeof u.getRange=="function"&&u.getRange(t);if(h){const d=l(s,t,n-h),f=l(s,t,n+h);return{lo:d.lo,hi:f.hi}}}}else{const u=l(s,t,n);if(c){const{vScale:h}=r._cachedMeta,{_parsed:d}=e,f=d.slice(0,u.lo+1).reverse().findIndex(g=>!vt(g[h.axis]));u.lo-=Math.max(0,f);const p=d.slice(u.hi).findIndex(g=>!vt(g[h.axis]));u.hi+=Math.max(0,p)}return u}}return{lo:0,hi:s.length-1}}function np(e,t,n,i,r){const s=e.getSortedVisibleDatasetMetas(),o=n[t];for(let a=0,c=s.length;a<c;++a){const{index:l,data:u}=s[a],{lo:h,hi:d}=m6(s[a],t,o,r);for(let f=h;f<=d;++f){const p=u[f];p.skip||i(p,l,f)}}}function v6(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,r){const s=t?Math.abs(i.x-r.x):0,o=n?Math.abs(i.y-r.y):0;return Math.sqrt(Math.pow(s,2)+Math.pow(o,2))}}function ug(e,t,n,i,r){const s=[];return!r&&!e.isPointInArea(t)||np(e,n,t,function(a,c,l){!r&&!Ir(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&s.push({element:a,datasetIndex:c,index:l})},!0),s}function y6(e,t,n,i){let r=[];function s(o,a,c){const{startAngle:l,endAngle:u}=o.getProps(["startAngle","endAngle"],i),{angle:h}=Ik(o,{x:t.x,y:t.y});Cu(h,l,u)&&r.push({element:o,datasetIndex:a,index:c})}return np(e,n,t,s),r}function b6(e,t,n,i,r,s){let o=[];const a=v6(n);let c=Number.POSITIVE_INFINITY;function l(u,h,d){const f=u.inRange(t.x,t.y,r);if(i&&!f)return;const p=u.getCenterPoint(r);if(!(!!s||e.isPointInArea(p))&&!f)return;const m=a(t,p);m<c?(o=[{element:u,datasetIndex:h,index:d}],c=m):m===c&&o.push({element:u,datasetIndex:h,index:d})}return np(e,n,t,l),o}function hg(e,t,n,i,r,s){return!s&&!e.isPointInArea(t)?[]:n==="r"&&!i?y6(e,t,n,r):b6(e,t,n,i,r,s)}function R_(e,t,n,i,r){const s=[],o=n==="x"?"inXRange":"inYRange";let a=!1;return np(e,n,t,(c,l,u)=>{c[o]&&c[o](t[n],r)&&(s.push({element:c,datasetIndex:l,index:u}),a=a||c.inRange(t.x,t.y,r))}),i&&!a?[]:s}var _6={modes:{index(e,t,n,i){const r=uo(t,e),s=n.axis||"x",o=n.includeInvisible||!1,a=n.intersect?ug(e,r,s,i,o):hg(e,r,s,!1,i,o),c=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(l=>{const u=a[0].index,h=l.data[u];h&&!h.skip&&c.push({element:h,datasetIndex:l.index,index:u})}),c):[]},dataset(e,t,n,i){const r=uo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;let a=n.intersect?ug(e,r,s,i,o):hg(e,r,s,!1,i,o);if(a.length>0){const c=a[0].datasetIndex,l=e.getDatasetMeta(c).data;a=[];for(let u=0;u<l.length;++u)a.push({element:l[u],datasetIndex:c,index:u})}return a},point(e,t,n,i){const r=uo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return ug(e,r,s,i,o)},nearest(e,t,n,i){const r=uo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return hg(e,r,s,n.intersect,i,o)},x(e,t,n,i){const r=uo(t,e);return R_(e,r,"x",n.intersect,i)},y(e,t,n,i){const r=uo(t,e);return R_(e,r,"y",n.intersect,i)}}};const rS=["left","top","right","bottom"];function Uc(e,t){return e.filter(n=>n.pos===t)}function A_(e,t){return e.filter(n=>rS.indexOf(n.pos)===-1&&n.box.axis===t)}function Yc(e,t){return e.sort((n,i)=>{const r=t?i:n,s=t?n:i;return r.weight===s.weight?r.index-s.index:r.weight-s.weight})}function w6(e){const t=[];let n,i,r,s,o,a;for(n=0,i=(e||[]).length;n<i;++n)r=e[n],{position:s,options:{stack:o,stackWeight:a=1}}=r,t.push({index:n,box:r,pos:s,horizontal:r.isHorizontal(),weight:r.weight,stack:o&&s+o,stackWeight:a});return t}function x6(e){const t={};for(const n of e){const{stack:i,pos:r,stackWeight:s}=n;if(!i||!rS.includes(r))continue;const o=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=s}return t}function C6(e,t){const n=x6(e),{vBoxMaxWidth:i,hBoxMaxHeight:r}=t;let s,o,a;for(s=0,o=e.length;s<o;++s){a=e[s];const{fullSize:c}=a.box,l=n[a.stack],u=l&&a.stackWeight/l.weight;a.horizontal?(a.width=u?u*i:c&&t.availableWidth,a.height=r):(a.width=i,a.height=u?u*r:c&&t.availableHeight)}return n}function k6(e){const t=w6(e),n=Yc(t.filter(l=>l.box.fullSize),!0),i=Yc(Uc(t,"left"),!0),r=Yc(Uc(t,"right")),s=Yc(Uc(t,"top"),!0),o=Yc(Uc(t,"bottom")),a=A_(t,"x"),c=A_(t,"y");return{fullSize:n,leftAndTop:i.concat(s),rightAndBottom:r.concat(c).concat(o).concat(a),chartArea:Uc(t,"chartArea"),vertical:i.concat(r).concat(c),horizontal:s.concat(o).concat(a)}}function L_(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function sS(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function S6(e,t,n,i){const{pos:r,box:s}=n,o=e.maxPadding;if(!_t(r)){n.size&&(e[r]-=n.size);const h=i[n.stack]||{size:0,count:1};h.size=Math.max(h.size,n.horizontal?s.height:s.width),n.size=h.size/h.count,e[r]+=n.size}s.getPadding&&sS(o,s.getPadding());const a=Math.max(0,t.outerWidth-L_(o,e,"left","right")),c=Math.max(0,t.outerHeight-L_(o,e,"top","bottom")),l=a!==e.w,u=c!==e.h;return e.w=a,e.h=c,n.horizontal?{same:l,other:u}:{same:u,other:l}}function E6(e){const t=e.maxPadding;function n(i){const r=Math.max(t[i]-e[i],0);return e[i]+=r,r}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function M6(e,t){const n=t.maxPadding;function i(r){const s={left:0,top:0,right:0,bottom:0};return r.forEach(o=>{s[o]=Math.max(t[o],n[o])}),s}return i(e?["left","right"]:["top","bottom"])}function vl(e,t,n,i){const r=[];let s,o,a,c,l,u;for(s=0,o=e.length,l=0;s<o;++s){a=e[s],c=a.box,c.update(a.width||t.w,a.height||t.h,M6(a.horizontal,t));const{same:h,other:d}=S6(t,n,a,i);l|=h&&r.length,u=u||d,c.fullSize||r.push(a)}return l&&vl(r,t,n,i)||u}function Mh(e,t,n,i,r){e.top=n,e.left=t,e.right=t+i,e.bottom=n+r,e.width=i,e.height=r}function N_(e,t,n,i){const r=n.padding;let{x:s,y:o}=t;for(const a of e){const c=a.box,l=i[a.stack]||{placed:0,weight:1},u=a.stackWeight/l.weight||1;if(a.horizontal){const h=t.w*u,d=l.size||c.height;xu(l.start)&&(o=l.start),c.fullSize?Mh(c,r.left,o,n.outerWidth-r.right-r.left,d):Mh(c,t.left+l.placed,o,h,d),l.start=o,l.placed+=h,o=c.bottom}else{const h=t.h*u,d=l.size||c.width;xu(l.start)&&(s=l.start),c.fullSize?Mh(c,s,r.top,d,n.outerHeight-r.bottom-r.top):Mh(c,s,t.top+l.placed,d,h),l.start=s,l.placed+=h,s=c.right}}t.x=s,t.y=o}var Je={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const r=en(e.options.layout.padding),s=Math.max(t-r.width,0),o=Math.max(n-r.height,0),a=k6(e.boxes),c=a.vertical,l=a.horizontal;It(e.boxes,g=>{typeof g.beforeLayout=="function"&&g.beforeLayout()});const u=c.reduce((g,m)=>m.box.options&&m.box.options.display===!1?g:g+1,0)||1,h=Object.freeze({outerWidth:t,outerHeight:n,padding:r,availableWidth:s,availableHeight:o,vBoxMaxWidth:s/2/u,hBoxMaxHeight:o/2}),d=Object.assign({},r);sS(d,en(i));const f=Object.assign({maxPadding:d,w:s,h:o,x:r.left,y:r.top},r),p=C6(c.concat(l),h);vl(a.fullSize,f,h,p),vl(c,f,h,p),vl(l,f,h,p)&&vl(c,f,h,p),E6(f),N_(a.leftAndTop,f,h,p),f.x+=f.w,f.y+=f.h,N_(a.rightAndBottom,f,h,p),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},It(a.chartArea,g=>{const m=g.box;Object.assign(m,e.chartArea),m.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class oS{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,r){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,r?Math.floor(n/r):i)}}isAttached(t){return!0}updateConfig(t){}}class D6 extends oS{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Qh="$chartjs",$6={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},F_=e=>e===null||e==="";function T6(e,t){const n=e.style,i=e.getAttribute("height"),r=e.getAttribute("width");if(e[Qh]={initial:{height:i,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",F_(r)){const s=w_(e,"width");s!==void 0&&(e.width=s)}if(F_(i))if(e.style.height==="")e.height=e.width/(t||2);else{const s=w_(e,"height");s!==void 0&&(e.height=s)}return e}const aS=SN?{passive:!0}:!1;function O6(e,t,n){e&&e.addEventListener(t,n,aS)}function I6(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,aS)}function P6(e,t){const n=$6[e.type]||e.type,{x:i,y:r}=uo(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:r!==void 0?r:null}}function uf(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function R6(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||uf(a.addedNodes,i),o=o&&!uf(a.removedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function A6(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||uf(a.removedNodes,i),o=o&&!uf(a.addedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const Su=new Map;let z_=0;function cS(){const e=window.devicePixelRatio;e!==z_&&(z_=e,Su.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function L6(e,t){Su.size||window.addEventListener("resize",cS),Su.set(e,t)}function N6(e){Su.delete(e),Su.size||window.removeEventListener("resize",cS)}function F6(e,t,n){const i=e.canvas,r=i&&k0(i);if(!r)return;const s=Lk((a,c)=>{const l=r.clientWidth;n(a,c),l<r.clientWidth&&n()},window),o=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,u=c.contentRect.height;l===0&&u===0||s(l,u)});return o.observe(r),L6(e,s),o}function dg(e,t,n){n&&n.disconnect(),t==="resize"&&N6(e)}function z6(e,t,n){const i=e.canvas,r=Lk(s=>{e.ctx!==null&&n(P6(s,e))},e);return O6(i,t,r),r}class j6 extends oS{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(T6(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[Qh])return!1;const i=n[Qh].initial;["height","width"].forEach(s=>{const o=i[s];vt(o)?n.removeAttribute(s):n.setAttribute(s,o)});const r=i.style||{};return Object.keys(r).forEach(s=>{n.style[s]=r[s]}),n.width=n.width,delete n[Qh],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const r=t.$proxies||(t.$proxies={}),o={attach:R6,detach:A6,resize:F6}[n]||z6;r[n]=o(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),r=i[n];if(!r)return;({attach:dg,detach:dg,resize:dg}[n]||I6)(t,n,r),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,r){return kN(t,n,i,r)}isAttached(t){const n=t&&k0(t);return!!(n&&n.isConnected)}}function B6(e){return!C0()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?D6:j6}class is{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return uc(this.x)&&uc(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const r={};return t.forEach(s=>{r[s]=i[s]&&i[s].active()?i[s]._to:this[s]}),r}}function W6(e,t){const n=e.options.ticks,i=H6(e),r=Math.min(n.maxTicksLimit||i,i),s=n.major.enabled?Y6(t):[],o=s.length,a=s[0],c=s[o-1],l=[];if(o>r)return V6(t,l,s,o/r),l;const u=U6(s,t,r);if(o>0){let h,d;const f=o>1?Math.round((c-a)/(o-1)):null;for(Dh(t,l,u,vt(f)?0:a-f,a),h=0,d=o-1;h<d;h++)Dh(t,l,u,s[h],s[h+1]);return Dh(t,l,u,c,vt(f)?t.length:c+f),l}return Dh(t,l,u),l}function H6(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),r=e._maxLength/n;return Math.floor(Math.min(i,r))}function U6(e,t,n){const i=q6(e),r=t.length/n;if(!i)return Math.max(r,1);const s=M3(i);for(let o=0,a=s.length-1;o<a;o++){const c=s[o];if(c>r)return c}return Math.max(r,1)}function Y6(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function V6(e,t,n,i){let r=0,s=n[0],o;for(i=Math.ceil(i),o=0;o<e.length;o++)o===s&&(t.push(e[o]),r++,s=n[r*i])}function Dh(e,t,n,i,r){const s=lt(i,0),o=Math.min(lt(r,e.length),e.length);let a=0,c,l,u;for(n=Math.ceil(n),r&&(c=r-i,n=c/Math.floor(c/n)),u=s;u<0;)a++,u=Math.round(s+a*n);for(l=Math.max(s,0);l<o;l++)l===u&&(t.push(e[l]),a++,u=Math.round(s+a*n))}function q6(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const K6=e=>e==="left"?"right":e==="right"?"left":e,j_=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,B_=(e,t)=>Math.min(t||e,e);function W_(e,t){const n=[],i=e.length/t,r=e.length;let s=0;for(;s<r;s+=i)n.push(e[Math.floor(s)]);return n}function G6(e,t,n){const i=e.ticks.length,r=Math.min(t,i-1),s=e._startPixel,o=e._endPixel,a=1e-6;let c=e.getPixelForTick(r),l;if(!(n&&(i===1?l=Math.max(c-s,o-c):t===0?l=(e.getPixelForTick(1)-c)/2:l=(c-e.getPixelForTick(r-1))/2,c+=r<t?l:-l,c<s-a||c>o+a)))return c}function X6(e,t){It(e,n=>{const i=n.gc,r=i.length/2;let s;if(r>t){for(s=0;s<r;++s)delete n.data[i[s]];i.splice(0,r)}})}function Vc(e){return e.drawTicks?e.tickLength:0}function H_(e,t){if(!e.display)return 0;const n=Ce(e.font,t),i=en(e.padding);return(Xt(e.text)?e.text.length:1)*n.lineHeight+i.height}function Q6(e,t){return Vs(e,{scale:t,type:"scale"})}function Z6(e,t,n){return Vs(e,{tick:n,index:t,type:"tick"})}function J6(e,t,n){let i=v0(e);return(n&&t!=="right"||!n&&t==="right")&&(i=K6(i)),i}function tF(e,t,n,i){const{top:r,left:s,bottom:o,right:a,chart:c}=e,{chartArea:l,scales:u}=c;let h=0,d,f,p;const g=o-r,m=a-s;if(e.isHorizontal()){if(f=qe(i,s,a),_t(n)){const b=Object.keys(n)[0],_=n[b];p=u[b].getPixelForValue(_)+g-t}else n==="center"?p=(l.bottom+l.top)/2+g-t:p=j_(e,n,t);d=a-s}else{if(_t(n)){const b=Object.keys(n)[0],_=n[b];f=u[b].getPixelForValue(_)-m+t}else n==="center"?f=(l.left+l.right)/2-m+t:f=j_(e,n,t);p=qe(i,o,r),h=n==="left"?-fe:fe}return{titleX:f,titleY:p,maxWidth:d,rotation:h}}class ra extends is{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:r}=this;return t=Vn(t,Number.POSITIVE_INFINITY),n=Vn(n,Number.NEGATIVE_INFINITY),i=Vn(i,Number.POSITIVE_INFINITY),r=Vn(r,Number.NEGATIVE_INFINITY),{min:Vn(t,i),max:Vn(n,r),minDefined:ue(t),maxDefined:ue(n)}}getMinMax(t){let{min:n,max:i,minDefined:r,maxDefined:s}=this.getUserBounds(),o;if(r&&s)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)o=a[c].controller.getMinMax(this,t),r||(n=Math.min(n,o.min)),s||(i=Math.max(i,o.max));return n=s&&n>i?i:n,i=r&&n>i?n:i,{min:Vn(n,Vn(i,n)),max:Vn(i,Vn(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Wt(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:r,grace:s,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=nN(this,s,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?W_(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=W6(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Wt(this.options.afterUpdate,[this])}beforeSetDimensions(){Wt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Wt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),Wt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Wt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,r,s;for(i=0,r=t.length;i<r;i++)s=t[i],s.label=Wt(n.callback,[s.value,i,t],this)}afterTickToLabelConversion(){Wt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Wt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=B_(this.ticks.length,t.ticks.maxTicksLimit),r=n.minRotation||0,s=n.maxRotation;let o=r,a,c,l;if(!this._isVisible()||!n.display||r>=s||i<=1||!this.isHorizontal()){this.labelRotation=r;return}const u=this._getLabelSizes(),h=u.widest.width,d=u.highest.height,f=Pe(this.chart.width-h,0,this.maxWidth);a=t.offset?this.maxWidth/i:f/(i-1),h+6>a&&(a=f/(i-(t.offset?.5:1)),c=this.maxHeight-Vc(t.grid)-n.padding-H_(t.title,this.chart.options.font),l=Math.sqrt(h*h+d*d),o=g0(Math.min(Math.asin(Pe((u.highest.height+6)/a,-1,1)),Math.asin(Pe(c/l,-1,1))-Math.asin(Pe(d/l,-1,1)))),o=Math.max(r,Math.min(s,o))),this.labelRotation=o}afterCalculateLabelRotation(){Wt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Wt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:r,grid:s}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=H_(r,n.options.font);if(a?(t.width=this.maxWidth,t.height=Vc(s)+c):(t.height=this.maxHeight,t.width=Vc(s)+c),i.display&&this.ticks.length){const{first:l,last:u,widest:h,highest:d}=this._getLabelSizes(),f=i.padding*2,p=Ti(this.labelRotation),g=Math.cos(p),m=Math.sin(p);if(a){const b=i.mirror?0:m*h.width+g*d.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=i.mirror?0:g*h.width+m*d.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(l,u,m,g)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,r){const{ticks:{align:s,padding:o},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const u=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1);let d=0,f=0;c?l?(d=r*t.width,f=i*n.height):(d=i*t.height,f=r*n.width):s==="start"?f=n.width:s==="end"?d=t.width:s!=="inner"&&(d=t.width/2,f=n.width/2),this.paddingLeft=Math.max((d-u+o)*this.width/(this.width-u),0),this.paddingRight=Math.max((f-h+o)*this.width/(this.width-h),0)}else{let u=n.height/2,h=t.height/2;s==="start"?(u=0,h=t.height):s==="end"&&(u=n.height,h=0),this.paddingTop=u+o,this.paddingBottom=h+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Wt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)vt(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=W_(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:r,_longestTextCache:s}=this,o=[],a=[],c=Math.floor(n/B_(n,i));let l=0,u=0,h,d,f,p,g,m,b,_,C,S,k;for(h=0;h<n;h+=c){if(p=t[h].label,g=this._resolveTickFontOptions(h),r.font=m=g.string,b=s[m]=s[m]||{data:{},gc:[]},_=g.lineHeight,C=S=0,!vt(p)&&!Xt(p))C=cf(r,b.data,b.gc,C,p),S=_;else if(Xt(p))for(d=0,f=p.length;d<f;++d)k=p[d],!vt(k)&&!Xt(k)&&(C=cf(r,b.data,b.gc,C,k),S+=_);o.push(C),a.push(S),l=Math.max(C,l),u=Math.max(S,u)}X6(s,n);const $=o.indexOf(l),D=a.indexOf(u),w=x=>({width:o[x]||0,height:a[x]||0});return{first:w(0),last:w(n-1),widest:w($),highest:w(D),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return O3(this._alignToPixels?io(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=Z6(this.getContext(),t,i))}return this.$context||(this.$context=Q6(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=Ti(this.labelRotation),i=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),s=this._getLabelSizes(),o=t.autoSkipPadding||0,a=s?s.widest.width+o:0,c=s?s.highest.height+o:0;return this.isHorizontal()?c*i>a*r?a/i:c/r:c*r<a*i?c/i:a/r}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,r=this.options,{grid:s,position:o,border:a}=r,c=s.offset,l=this.isHorizontal(),h=this.ticks.length+(c?1:0),d=Vc(s),f=[],p=a.setContext(this.getContext()),g=p.display?p.width:0,m=g/2,b=function(Y){return io(i,Y,g)};let _,C,S,k,$,D,w,x,M,O,T,R;if(o==="top")_=b(this.bottom),D=this.bottom-d,x=_-m,O=b(t.top)+m,R=t.bottom;else if(o==="bottom")_=b(this.top),O=t.top,R=b(t.bottom)-m,D=_+m,x=this.top+d;else if(o==="left")_=b(this.right),$=this.right-d,w=_-m,M=b(t.left)+m,T=t.right;else if(o==="right")_=b(this.left),M=t.left,T=b(t.right)-m,$=_+m,w=this.left+d;else if(n==="x"){if(o==="center")_=b((t.top+t.bottom)/2+.5);else if(_t(o)){const Y=Object.keys(o)[0],F=o[Y];_=b(this.chart.scales[Y].getPixelForValue(F))}O=t.top,R=t.bottom,D=_+m,x=D+d}else if(n==="y"){if(o==="center")_=b((t.left+t.right)/2);else if(_t(o)){const Y=Object.keys(o)[0],F=o[Y];_=b(this.chart.scales[Y].getPixelForValue(F))}$=_-m,w=$-d,M=t.left,T=t.right}const j=lt(r.ticks.maxTicksLimit,h),z=Math.max(1,Math.ceil(h/j));for(C=0;C<h;C+=z){const Y=this.getContext(C),F=s.setContext(Y),G=a.setContext(Y),B=F.lineWidth,V=F.color,W=G.dash||[],q=G.dashOffset,L=F.tickWidth,ot=F.tickColor,kt=F.tickBorderDash||[],Lt=F.tickBorderDashOffset;S=G6(this,C,c),S!==void 0&&(k=io(i,S,B),l?$=w=M=T=k:D=x=O=R=k,f.push({tx1:$,ty1:D,tx2:w,ty2:x,x1:M,y1:O,x2:T,y2:R,width:B,color:V,borderDash:W,borderDashOffset:q,tickWidth:L,tickColor:ot,tickBorderDash:kt,tickBorderDashOffset:Lt}))}return this._ticksLength=h,this._borderValue=_,f}_computeLabelItems(t){const n=this.axis,i=this.options,{position:r,ticks:s}=i,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:u,mirror:h}=s,d=Vc(i.grid),f=d+u,p=h?-u:f,g=-Ti(this.labelRotation),m=[];let b,_,C,S,k,$,D,w,x,M,O,T,R="middle";if(r==="top")$=this.bottom-p,D=this._getXAxisLabelAlignment();else if(r==="bottom")$=this.top+p,D=this._getXAxisLabelAlignment();else if(r==="left"){const z=this._getYAxisLabelAlignment(d);D=z.textAlign,k=z.x}else if(r==="right"){const z=this._getYAxisLabelAlignment(d);D=z.textAlign,k=z.x}else if(n==="x"){if(r==="center")$=(t.top+t.bottom)/2+f;else if(_t(r)){const z=Object.keys(r)[0],Y=r[z];$=this.chart.scales[z].getPixelForValue(Y)+f}D=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")k=(t.left+t.right)/2-f;else if(_t(r)){const z=Object.keys(r)[0],Y=r[z];k=this.chart.scales[z].getPixelForValue(Y)}D=this._getYAxisLabelAlignment(d).textAlign}n==="y"&&(c==="start"?R="top":c==="end"&&(R="bottom"));const j=this._getLabelSizes();for(b=0,_=a.length;b<_;++b){C=a[b],S=C.label;const z=s.setContext(this.getContext(b));w=this.getPixelForTick(b)+s.labelOffset,x=this._resolveTickFontOptions(b),M=x.lineHeight,O=Xt(S)?S.length:1;const Y=O/2,F=z.color,G=z.textStrokeColor,B=z.textStrokeWidth;let V=D;o?(k=w,D==="inner"&&(b===_-1?V=this.options.reverse?"left":"right":b===0?V=this.options.reverse?"right":"left":V="center"),r==="top"?l==="near"||g!==0?T=-O*M+M/2:l==="center"?T=-j.highest.height/2-Y*M+M:T=-j.highest.height+M/2:l==="near"||g!==0?T=M/2:l==="center"?T=j.highest.height/2-Y*M:T=j.highest.height-O*M,h&&(T*=-1),g!==0&&!z.showLabelBackdrop&&(k+=M/2*Math.sin(g))):($=w,T=(1-O)*M/2);let W;if(z.showLabelBackdrop){const q=en(z.backdropPadding),L=j.heights[b],ot=j.widths[b];let kt=T-q.top,Lt=0-q.left;switch(R){case"middle":kt-=L/2;break;case"bottom":kt-=L;break}switch(D){case"center":Lt-=ot/2;break;case"right":Lt-=ot;break;case"inner":b===_-1?Lt-=ot:b>0&&(Lt-=ot/2);break}W={left:Lt,top:kt,width:ot+q.width,height:L+q.height,color:z.backdropColor}}m.push({label:S,font:x,textOffset:T,options:{rotation:g,color:F,strokeColor:G,strokeWidth:B,textAlign:V,textBaseline:R,translation:[k,$],backdrop:W}})}return m}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-Ti(this.labelRotation))return t==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:r,padding:s}}=this.options,o=this._getLabelSizes(),a=t+s,c=o.widest.width;let l,u;return n==="left"?r?(u=this.right+s,i==="near"?l="left":i==="center"?(l="center",u+=c/2):(l="right",u+=c)):(u=this.right-a,i==="near"?l="right":i==="center"?(l="center",u-=c/2):(l="left",u=this.left)):n==="right"?r?(u=this.left+s,i==="near"?l="right":i==="center"?(l="center",u-=c/2):(l="left",u-=c)):(u=this.left+a,i==="near"?l="left":i==="center"?(l="center",u+=c/2):(l="right",u=this.right)):l="right",{textAlign:l,x:u}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:r,width:s,height:o}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,r,s,o),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(s=>s.value===t);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let s,o;const a=(c,l,u)=>{!u.width||!u.color||(i.save(),i.lineWidth=u.width,i.strokeStyle=u.color,i.setLineDash(u.borderDash||[]),i.lineDashOffset=u.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(n.display)for(s=0,o=r.length;s<o;++s){const c=r[s];n.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),n.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:r}}=this,s=i.setContext(this.getContext()),o=i.display?s.width:0;if(!o)return;const a=r.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,u,h,d;this.isHorizontal()?(l=io(t,this.left,o)-o/2,u=io(t,this.right,a)+a/2,h=d=c):(h=io(t,this.top,o)-o/2,d=io(t,this.bottom,a)+a/2,l=u=c),n.save(),n.lineWidth=s.width,n.strokeStyle=s.color,n.beginPath(),n.moveTo(l,h),n.lineTo(u,d),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,r=this._computeLabelArea();r&&Jf(i,r);const s=this.getLabelItems(t);for(const o of s){const a=o.options,c=o.font,l=o.label,u=o.textOffset;Yo(i,l,0,u,c,a)}r&&tp(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:r}}=this;if(!i.display)return;const s=Ce(i.font),o=en(i.padding),a=i.align;let c=s.lineHeight/2;n==="bottom"||n==="center"||_t(n)?(c+=o.bottom,Xt(i.text)&&(c+=s.lineHeight*(i.text.length-1))):c+=o.top;const{titleX:l,titleY:u,maxWidth:h,rotation:d}=tF(this,c,n,a);Yo(t,i.text,0,0,s,{color:i.color,maxWidth:h,rotation:d,textAlign:J6(a,n,r),textBaseline:"middle",translation:[l,u]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=lt(t.grid&&t.grid.z,-1),r=lt(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==ra.prototype.draw?[{z:n,draw:s=>{this.draw(s)}}]:[{z:i,draw:s=>{this.drawBackground(),this.drawGrid(s),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:s=>{this.drawLabels(s)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",r=[];let s,o;for(s=0,o=n.length;s<o;++s){const a=n[s];a[i]===this.id&&(!t||a.type===t)&&r.push(a)}return r}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Ce(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class $h{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;iF(n)&&(i=this.register(n));const r=this.items,s=t.id,o=this.scope+"."+s;if(!s)throw new Error("class does not have id: "+t);return s in r||(r[s]=t,eF(t,o,i),this.override&&Zt.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,r=this.scope;i in n&&delete n[i],r&&i in Zt[r]&&(delete Zt[r][i],this.override&&delete Uo[i])}}function eF(e,t,n){const i=lc(Object.create(null),[n?Zt.get(n):{},Zt.get(t),e.defaults]);Zt.set(t,i),e.defaultRoutes&&nF(t,e.defaultRoutes),e.descriptors&&Zt.describe(t,e.descriptors)}function nF(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),r=i.pop(),s=[e].concat(i).join("."),o=t[n].split("."),a=o.pop(),c=o.join(".");Zt.route(s,r,c,a)})}function iF(e){return"id"in e&&"defaults"in e}class rF{constructor(){this.controllers=new $h(qs,"datasets",!0),this.elements=new $h(is,"elements"),this.plugins=new $h(Object,"plugins"),this.scales=new $h(ra,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(r=>{const s=i||this._getRegistryForType(r);i||s.isForType(r)||s===this.plugins&&r.id?this._exec(t,s,r):It(r,o=>{const a=i||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,n,i){const r=p0(t);Wt(i["before"+r],[],i),n[t](i),Wt(i["after"+r],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const r=n.get(t);if(r===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return r}}var Wi=new rF;class sF{constructor(){this._init=void 0}notify(t,n,i,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const s=r?this._descriptors(t).filter(r):this._descriptors(t),o=this._notify(s,t,n,i);return n==="afterDestroy"&&(this._notify(s,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,n,i,r){r=r||{};for(const s of t){const o=s.plugin,a=o[i],c=[n,r,s.options];if(Wt(a,c,o)===!1&&r.cancelable)return!1}return!0}invalidate(){vt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,r=lt(i.options&&i.options.plugins,{}),s=oF(i);return r===!1&&!n?[]:cF(t,s,r,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,r=(s,o)=>s.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(r(n,i),t,"stop"),this._notify(r(i,n),t,"start")}}function oF(e){const t={},n=[],i=Object.keys(Wi.plugins.items);for(let s=0;s<i.length;s++)n.push(Wi.getPlugin(i[s]));const r=e.plugins||[];for(let s=0;s<r.length;s++){const o=r[s];n.indexOf(o)===-1&&(n.push(o),t[o.id]=!0)}return{plugins:n,localIds:t}}function aF(e,t){return!t&&e===!1?null:e===!0?{}:e}function cF(e,{plugins:t,localIds:n},i,r){const s=[],o=e.getContext();for(const a of t){const c=a.id,l=aF(i[c],r);l!==null&&s.push({plugin:a,options:lF(e.config,{plugin:a,local:n[c]},l,o)})}return s}function lF(e,{plugin:t,local:n},i,r){const s=e.pluginScopeKeys(t),o=e.getOptionScopes(i,s);return n&&t.defaults&&o.push(t.defaults),e.createResolver(o,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Tm(e,t){const n=Zt.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function uF(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function hF(e,t){return e===t?"_index_":"_value_"}function U_(e){if(e==="x"||e==="y"||e==="r")return e}function dF(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function Om(e,...t){if(U_(e))return e;for(const n of t){const i=n.axis||dF(n.position)||e.length>1&&U_(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Y_(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function fF(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return Y_(e,"x",n[0])||Y_(e,"y",n[0])}return{}}function pF(e,t){const n=Uo[e.type]||{scales:{}},i=t.scales||{},r=Tm(e.type,t),s=Object.create(null);return Object.keys(i).forEach(o=>{const a=i[o];if(!_t(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=Om(o,a,fF(o,e),Zt.scales[a.type]),l=hF(c,r),u=n.scales||{};s[o]=Yl(Object.create(null),[{axis:c},a,u[c],u[l]])}),e.data.datasets.forEach(o=>{const a=o.type||e.type,c=o.indexAxis||Tm(a,t),u=(Uo[a]||{}).scales||{};Object.keys(u).forEach(h=>{const d=uF(h,c),f=o[d+"AxisID"]||d;s[f]=s[f]||Object.create(null),Yl(s[f],[{axis:d},i[f],u[h]])})}),Object.keys(s).forEach(o=>{const a=s[o];Yl(a,[Zt.scales[a.type],Zt.scale])}),s}function lS(e){const t=e.options||(e.options={});t.plugins=lt(t.plugins,{}),t.scales=pF(e,t)}function uS(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function gF(e){return e=e||{},e.data=uS(e.data),lS(e),e}const V_=new Map,hS=new Set;function Th(e,t){let n=V_.get(e);return n||(n=t(),V_.set(e,n),hS.add(n)),n}const qc=(e,t,n)=>{const i=Ns(t,n);i!==void 0&&e.add(i)};class mF{constructor(t){this._config=gF(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=uS(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),lS(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Th(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Th(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Th(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Th(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let r=i.get(t);return(!r||n)&&(r=new Map,i.set(t,r)),r}getOptionScopes(t,n,i){const{options:r,type:s}=this,o=this._cachedScopes(t,i),a=o.get(n);if(a)return a;const c=new Set;n.forEach(u=>{t&&(c.add(t),u.forEach(h=>qc(c,t,h))),u.forEach(h=>qc(c,r,h)),u.forEach(h=>qc(c,Uo[s]||{},h)),u.forEach(h=>qc(c,Zt,h)),u.forEach(h=>qc(c,Dm,h))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),hS.has(n)&&o.set(n,l),l}chartOptionScopes(){const{options:t,type:n}=this;return[t,Uo[n]||{},Zt.datasets[n]||{},{type:n},Zt,Dm]}resolveNamedOptions(t,n,i,r=[""]){const s={$shared:!0},{resolver:o,subPrefixes:a}=q_(this._resolverCache,t,r);let c=o;if(yF(o,n)){s.$shared=!1,i=Fs(i)?i():i;const l=this.createResolver(t,i,a);c=hc(o,i,l)}for(const l of n)s[l]=c[l];return s}createResolver(t,n,i=[""],r){const{resolver:s}=q_(this._resolverCache,t,i);return _t(n)?hc(s,n,void 0,r):s}}function q_(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const r=n.join();let s=i.get(r);return s||(s={resolver:_0(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(r,s)),s}const vF=e=>_t(e)&&Object.getOwnPropertyNames(e).some(t=>Fs(e[t]));function yF(e,t){const{isScriptable:n,isIndexable:i}=Wk(e);for(const r of t){const s=n(r),o=i(r),a=(o||s)&&e[r];if(s&&(Fs(a)||vF(a))||o&&Xt(a))return!0}return!1}var bF="4.5.1";const _F=["top","bottom","left","right","chartArea"];function K_(e,t){return e==="top"||e==="bottom"||_F.indexOf(e)===-1&&t==="x"}function G_(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function X_(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),Wt(n&&n.onComplete,[e],t)}function wF(e){const t=e.chart,n=t.options.animation;Wt(n&&n.onProgress,[e],t)}function dS(e){return C0()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Zh={},Q_=e=>{const t=dS(e);return Object.values(Zh).filter(n=>n.canvas===t).pop()};function xF(e,t,n){const i=Object.keys(e);for(const r of i){const s=+r;if(s>=t){const o=e[r];delete e[r],(n>0||s>t)&&(e[s+n]=o)}}}function CF(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class Eu{static defaults=Zt;static instances=Zh;static overrides=Uo;static registry=Wi;static version=bF;static getChart=Q_;static register(...t){Wi.add(...t),Z_()}static unregister(...t){Wi.remove(...t),Z_()}constructor(t,n){const i=this.config=new mF(n),r=dS(t),s=Q_(r);if(s)throw new Error("Canvas is already in use. Chart with ID '"+s.id+"' must be destroyed before the canvas with ID '"+s.canvas.id+"' can be reused.");const o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||B6(r)),this.platform.updateConfig(i);const a=this.platform.acquireContext(r,o.aspectRatio),c=a&&a.canvas,l=c&&c.height,u=c&&c.width;if(this.id=y3(),this.ctx=a,this.canvas=c,this.width=u,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new sF,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=A3(h=>this.update(h),o.resizeDelay||0),this._dataChanges=[],Zh[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}_r.listen(this,"complete",X_),_r.listen(this,"progress",wF),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:r,_aspectRatio:s}=this;return vt(t)?n&&s?s:r?i/r:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Wi}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():__(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return v_(this.canvas,this.ctx),this}stop(){return _r.stop(this),this}resize(t,n){_r.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,r=this.canvas,s=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(r,t,n,s),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,__(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),Wt(i.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};It(n,(i,r)=>{i.id=r})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,r=Object.keys(i).reduce((o,a)=>(o[a]=!1,o),{});let s=[];n&&(s=s.concat(Object.keys(n).map(o=>{const a=n[o],c=Om(o,a),l=c==="r",u=c==="x";return{options:a,dposition:l?"chartArea":u?"bottom":"left",dtype:l?"radialLinear":u?"category":"linear"}}))),It(s,o=>{const a=o.options,c=a.id,l=Om(c,a),u=lt(a.type,o.dtype);(a.position===void 0||K_(a.position,l)!==K_(o.dposition))&&(a.position=o.dposition),r[c]=!0;let h=null;if(c in i&&i[c].type===u)h=i[c];else{const d=Wi.getScale(u);h=new d({id:c,type:u,ctx:this.ctx,chart:this}),i[h.id]=h}h.init(a,t)}),It(r,(o,a)=>{o||delete i[a]}),It(i,o=>{Je.configure(this,o,o.options),Je.addBox(this,o)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((r,s)=>r.index-s.index),i>n){for(let r=n;r<i;++r)this._destroyDatasetMeta(r);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(G_("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,r)=>{n.filter(s=>s===i._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,r;for(this._removeUnreferencedMetasets(),i=0,r=n.length;i<r;i++){const s=n[i];let o=this.getDatasetMeta(i);const a=s.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=a,o.indexAxis=s.indexAxis||Tm(a,this.options),o.order=s.order||0,o.index=i,o.label=""+s.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const c=Wi.getController(a),{datasetElementType:l,dataElementType:u}=Zt.datasets[a];Object.assign(c,{dataElementType:Wi.getElement(u),datasetElementType:l&&Wi.getElement(l)}),o.controller=new c(this,i),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){It(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const s=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,u=this.data.datasets.length;l<u;l++){const{controller:h}=this.getDatasetMeta(l),d=!r&&s.indexOf(h)===-1;h.buildOrUpdateElements(d),o=Math.max(+h.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),r||It(s,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(G_("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){It(this.scales,t=>{Je.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!c_(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:r,count:s}of n){const o=i==="_removeElements"?-s:s;xF(t,r,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=s=>new Set(t.filter(o=>o[0]===s).map((o,a)=>a+","+o.splice(1).join(","))),r=i(0);for(let s=1;s<n;s++)if(!c_(r,i(s)))return;return Array.from(r).map(s=>s.split(",")).map(s=>({method:s[1],start:+s[2],count:+s[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Je.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],It(this.boxes,r=>{i&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,s)=>{r._idx=s}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,Fs(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),r={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(i.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(_r.has(this)?this.attached&&!_r.running(this)&&_r.start(this):(this.draw(),X_({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let r,s;for(r=0,s=n.length;r<s;++r){const o=n[r];(!t||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},r=Jk(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(r&&Jf(n,r),t.controller.draw(),r&&tp(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Ir(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,r){const s=_6.modes[n];return typeof s=="function"?s(this,t,i,r):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let r=i.filter(s=>s&&s._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(r)),r}getContext(){return this.$context||(this.$context=Vs(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const r=i?"show":"hide",s=this.getDatasetMeta(t),o=s.controller._resolveAnimations(void 0,r);xu(n)?(s.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(s,{visible:i}),this.update(a=>a.datasetIndex===t?r:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),_r.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),v_(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Zh[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(s,o)=>{n.addEventListener(this,s,o),t[s]=o},r=(s,o,a)=>{s.offsetX=o,s.offsetY=a,this._eventHandler(s)};It(this.options.events,s=>i(s,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(c,l)=>{n.addEventListener(this,c,l),t[c]=l},r=(c,l)=>{t[c]&&(n.removeEventListener(this,c,l),delete t[c])},s=(c,l)=>{this.canvas&&this.resize(c,l)};let o;const a=()=>{r("attach",a),this.attached=!0,this.resize(),i("resize",s),i("detach",o)};o=()=>{this.attached=!1,r("resize",s),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():o()}unbindEvents(){It(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},It(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const r=i?"set":"remove";let s,o,a,c;for(n==="dataset"&&(s=this.getDatasetMeta(t[0].datasetIndex),s.controller["_"+r+"DatasetHoverStyle"]()),a=0,c=t.length;a<c;++a){o=t[a];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[r+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:s,index:o})=>{const a=this.getDatasetMeta(s);if(!a)throw new Error("No dataset found at index "+s);return{datasetIndex:s,element:a.data[o],index:o}});!sf(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const r=this.options.hover,s=(c,l)=>c.filter(u=>!l.some(h=>u.datasetIndex===h.datasetIndex&&u.index===h.index)),o=s(n,t),a=i?t:s(t,n);o.length&&this.updateHoverStyle(o,r.mode,!1),a.length&&r.mode&&this.updateHoverStyle(a,r.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},r=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,r)===!1)return;const s=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,r),(s||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:r=[],options:s}=this,o=n,a=this._getActiveElements(t,r,i,o),c=k3(t),l=CF(t,this._lastEvent,i,c);i&&(this._lastEvent=null,Wt(s.onHover,[t,a,this],this),c&&Wt(s.onClick,[t,a,this],this));const u=!sf(a,r);return(u||n)&&(this._active=a,this._updateHoverStyles(a,r,n)),this._lastEvent=l,u}_getActiveElements(t,n,i,r){if(t.type==="mouseout")return[];if(!i)return n;const s=this.options.hover;return this.getElementsAtEventForMode(t,s.mode,s,r)}}function Z_(){return It(Eu.instances,e=>e._plugins.invalidate())}function kF(e,t,n){const{startAngle:i,x:r,y:s,outerRadius:o,innerRadius:a,options:c}=t,{borderWidth:l,borderJoinStyle:u}=c,h=Math.min(l/o,Qe(i-n));if(e.beginPath(),e.arc(r,s,o-l/2,i+h/2,n-h/2),a>0){const d=Math.min(l/a,Qe(i-n));e.arc(r,s,a+l/2,n-d/2,i+d/2,!0)}else{const d=Math.min(l/2,o*Qe(i-n));if(u==="round")e.arc(r,s,d,n-Dt/2,i+Dt/2,!0);else if(u==="bevel"){const f=2*d*d,p=-f*Math.cos(n+Dt/2)+r,g=-f*Math.sin(n+Dt/2)+s,m=f*Math.cos(i+Dt/2)+r,b=f*Math.sin(i+Dt/2)+s;e.lineTo(p,g),e.lineTo(m,b)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function SF(e,t,n){const{startAngle:i,pixelMargin:r,x:s,y:o,outerRadius:a,innerRadius:c}=t;let l=r/a;e.beginPath(),e.arc(s,o,a,i-l,n+l),c>r?(l=r/c,e.arc(s,o,c,n+l,i-l,!0)):e.arc(s,o,r,n+fe,i-fe),e.closePath(),e.clip()}function EF(e){return b0(e,["outerStart","outerEnd","innerStart","innerEnd"])}function MF(e,t,n,i){const r=EF(e.options.borderRadius),s=(n-t)/2,o=Math.min(s,i*t/2),a=c=>{const l=(n-Math.min(s,c))*i/2;return Pe(c,0,Math.min(s,l))};return{outerStart:a(r.outerStart),outerEnd:a(r.outerEnd),innerStart:Pe(r.innerStart,0,o),innerEnd:Pe(r.innerEnd,0,o)}}function ma(e,t,n,i){return{x:n+e*Math.cos(t),y:i+e*Math.sin(t)}}function hf(e,t,n,i,r,s){const{x:o,y:a,startAngle:c,pixelMargin:l,innerRadius:u}=t,h=Math.max(t.outerRadius+i+n-l,0),d=u>0?u+i+n+l:0;let f=0;const p=r-c;if(i){const z=u>0?u-i:0,Y=h>0?h-i:0,F=(z+Y)/2,G=F!==0?p*F/(F+i):p;f=(p-G)/2}const g=Math.max(.001,p*h-n/Dt)/h,m=(p-g)/2,b=c+m+f,_=r-m-f,{outerStart:C,outerEnd:S,innerStart:k,innerEnd:$}=MF(t,d,h,_-b),D=h-C,w=h-S,x=b+C/D,M=_-S/w,O=d+k,T=d+$,R=b+k/O,j=_-$/T;if(e.beginPath(),s){const z=(x+M)/2;if(e.arc(o,a,h,x,z),e.arc(o,a,h,z,M),S>0){const B=ma(w,M,o,a);e.arc(B.x,B.y,S,M,_+fe)}const Y=ma(T,_,o,a);if(e.lineTo(Y.x,Y.y),$>0){const B=ma(T,j,o,a);e.arc(B.x,B.y,$,_+fe,j+Math.PI)}const F=(_-$/d+(b+k/d))/2;if(e.arc(o,a,d,_-$/d,F,!0),e.arc(o,a,d,F,b+k/d,!0),k>0){const B=ma(O,R,o,a);e.arc(B.x,B.y,k,R+Math.PI,b-fe)}const G=ma(D,b,o,a);if(e.lineTo(G.x,G.y),C>0){const B=ma(D,x,o,a);e.arc(B.x,B.y,C,b-fe,x)}}else{e.moveTo(o,a);const z=Math.cos(x)*h+o,Y=Math.sin(x)*h+a;e.lineTo(z,Y);const F=Math.cos(M)*h+o,G=Math.sin(M)*h+a;e.lineTo(F,G)}e.closePath()}function DF(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a}=t;let c=t.endAngle;if(s){hf(e,t,n,i,c,r);for(let l=0;l<s;++l)e.fill();isNaN(a)||(c=o+(a%Yt||Yt))}return hf(e,t,n,i,c,r),e.fill(),c}function $F(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a,options:c}=t,{borderWidth:l,borderJoinStyle:u,borderDash:h,borderDashOffset:d,borderRadius:f}=c,p=c.borderAlign==="inner";if(!l)return;e.setLineDash(h||[]),e.lineDashOffset=d,p?(e.lineWidth=l*2,e.lineJoin=u||"round"):(e.lineWidth=l,e.lineJoin=u||"bevel");let g=t.endAngle;if(s){hf(e,t,n,i,g,r);for(let m=0;m<s;++m)e.stroke();isNaN(a)||(g=o+(a%Yt||Yt))}p&&SF(e,t,g),c.selfJoin&&g-o>=Dt&&f===0&&u!=="miter"&&kF(e,t,g),s||(hf(e,t,n,i,g,r),e.stroke())}class TF extends is{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.getProps(["x","y"],i),{angle:s,distance:o}=Ik(r,{x:t,y:n}),{startAngle:a,endAngle:c,innerRadius:l,outerRadius:u,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),d=(this.options.spacing+this.options.borderWidth)/2,f=lt(h,c-a),p=Cu(s,a,c)&&a!==c,g=f>=Yt||p,m=Tr(o,l+d,u+d);return g&&m}getCenterPoint(t){const{x:n,y:i,startAngle:r,endAngle:s,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:c,spacing:l}=this.options,u=(r+s)/2,h=(o+a+l+c)/2;return{x:n+Math.cos(u)*h,y:i+Math.sin(u)*h}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:n,circumference:i}=this,r=(n.offset||0)/4,s=(n.spacing||0)/2,o=n.circular;if(this.pixelMargin=n.borderAlign==="inner"?.33:0,this.fullCircles=i>Yt?Math.floor(i/Yt):0,i===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*r,Math.sin(a)*r);const c=1-Math.sin(Math.min(Dt,i||0)),l=r*c;t.fillStyle=n.backgroundColor,t.strokeStyle=n.borderColor,DF(t,this,l,s,o),$F(t,this,l,s,o),t.restore()}}function fS(e,t,n=t){e.lineCap=lt(n.borderCapStyle,t.borderCapStyle),e.setLineDash(lt(n.borderDash,t.borderDash)),e.lineDashOffset=lt(n.borderDashOffset,t.borderDashOffset),e.lineJoin=lt(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=lt(n.borderWidth,t.borderWidth),e.strokeStyle=lt(n.borderColor,t.borderColor)}function OF(e,t,n){e.lineTo(n.x,n.y)}function IF(e){return e.stepped?q3:e.tension||e.cubicInterpolationMode==="monotone"?K3:OF}function pS(e,t,n={}){const i=e.length,{start:r=0,end:s=i-1}=n,{start:o,end:a}=t,c=Math.max(r,o),l=Math.min(s,a),u=r<o&&s<o||r>a&&s>a;return{count:i,start:c,loop:t.loop,ilen:l<c&&!u?i+l-c:l-c}}function PF(e,t,n,i){const{points:r,options:s}=t,{count:o,start:a,loop:c,ilen:l}=pS(r,n,i),u=IF(s);let{move:h=!0,reverse:d}=i||{},f,p,g;for(f=0;f<=l;++f)p=r[(a+(d?l-f:f))%o],!p.skip&&(h?(e.moveTo(p.x,p.y),h=!1):u(e,g,p,d,s.stepped),g=p);return c&&(p=r[(a+(d?l:0))%o],u(e,g,p,d,s.stepped)),!!c}function RF(e,t,n,i){const r=t.points,{count:s,start:o,ilen:a}=pS(r,n,i),{move:c=!0,reverse:l}=i||{};let u=0,h=0,d,f,p,g,m,b;const _=S=>(o+(l?a-S:S))%s,C=()=>{g!==m&&(e.lineTo(u,m),e.lineTo(u,g),e.lineTo(u,b))};for(c&&(f=r[_(0)],e.moveTo(f.x,f.y)),d=0;d<=a;++d){if(f=r[_(d)],f.skip)continue;const S=f.x,k=f.y,$=S|0;$===p?(k<g?g=k:k>m&&(m=k),u=(h*u+S)/++h):(C(),e.lineTo(S,k),p=$,h=0,g=m=k),b=k}C()}function Im(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?RF:PF}function AF(e){return e.stepped?EN:e.tension||e.cubicInterpolationMode==="monotone"?MN:ho}function LF(e,t,n,i){let r=t._path;r||(r=t._path=new Path2D,t.path(r,n,i)&&r.closePath()),fS(e,t.options),e.stroke(r)}function NF(e,t,n,i){const{segments:r,options:s}=t,o=Im(t);for(const a of r)fS(e,s,a.style),e.beginPath(),o(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const FF=typeof Path2D=="function";function zF(e,t,n,i){FF&&!t.options.segment?LF(e,t,n,i):NF(e,t,n,i)}class ip extends is{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const r=i.spanGaps?this._loop:this._fullLoop;yN(this._points,i,t,r,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=PN(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,r=t[n],s=this.points,o=Zk(this,{property:n,start:r,end:r});if(!o.length)return;const a=[],c=AF(i);let l,u;for(l=0,u=o.length;l<u;++l){const{start:h,end:d}=o[l],f=s[h],p=s[d];if(f===p){a.push(f);continue}const g=Math.abs((r-f[n])/(p[n]-f[n])),m=c(f,p,g,i.stepped);m[n]=t[n],a.push(m)}return a.length===1?a[0]:a}pathSegment(t,n,i){return Im(this)(t,this,n,i)}path(t,n,i){const r=this.segments,s=Im(this);let o=this._loop;n=n||0,i=i||this.points.length-n;for(const a of r)o&=s(t,this,a,{start:n,end:n+i-1});return!!o}draw(t,n,i,r){const s=this.options||{};(this.points||[]).length&&s.borderWidth&&(t.save(),zF(t,this,i,r),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function J_(e,t,n,i){const r=e.options,{[n]:s}=e.getProps([n],i);return Math.abs(t-s)<r.radius+r.hitRadius}class jF extends is{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.options,{x:s,y:o}=this.getProps(["x","y"],i);return Math.pow(t-s,2)+Math.pow(n-o,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(t,n){return J_(this,t,"x",n)}inYRange(t,n){return J_(this,t,"y",n)}getCenterPoint(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}size(t){t=t||this.options||{};let n=t.radius||0;n=Math.max(n,n&&t.hoverRadius||0);const i=n&&t.borderWidth||0;return(n+i)*2}draw(t,n){const i=this.options;this.skip||i.radius<.1||!Ir(this,n,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,$m(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function gS(e,t){const{x:n,y:i,base:r,width:s,height:o}=e.getProps(["x","y","base","width","height"],t);let a,c,l,u,h;return e.horizontal?(h=o/2,a=Math.min(n,r),c=Math.max(n,r),l=i-h,u=i+h):(h=s/2,a=n-h,c=n+h,l=Math.min(i,r),u=Math.max(i,r)),{left:a,top:l,right:c,bottom:u}}function Cs(e,t,n,i){return e?0:Pe(t,n,i)}function BF(e,t,n){const i=e.options.borderWidth,r=e.borderSkipped,s=Bk(i);return{t:Cs(r.top,s.top,0,n),r:Cs(r.right,s.right,0,t),b:Cs(r.bottom,s.bottom,0,n),l:Cs(r.left,s.left,0,t)}}function WF(e,t,n){const{enableBorderRadius:i}=e.getProps(["enableBorderRadius"]),r=e.options.borderRadius,s=So(r),o=Math.min(t,n),a=e.borderSkipped,c=i||_t(r);return{topLeft:Cs(!c||a.top||a.left,s.topLeft,0,o),topRight:Cs(!c||a.top||a.right,s.topRight,0,o),bottomLeft:Cs(!c||a.bottom||a.left,s.bottomLeft,0,o),bottomRight:Cs(!c||a.bottom||a.right,s.bottomRight,0,o)}}function HF(e){const t=gS(e),n=t.right-t.left,i=t.bottom-t.top,r=BF(e,n/2,i/2),s=WF(e,n/2,i/2);return{outer:{x:t.left,y:t.top,w:n,h:i,radius:s},inner:{x:t.left+r.l,y:t.top+r.t,w:n-r.l-r.r,h:i-r.t-r.b,radius:{topLeft:Math.max(0,s.topLeft-Math.max(r.t,r.l)),topRight:Math.max(0,s.topRight-Math.max(r.t,r.r)),bottomLeft:Math.max(0,s.bottomLeft-Math.max(r.b,r.l)),bottomRight:Math.max(0,s.bottomRight-Math.max(r.b,r.r))}}}}function fg(e,t,n,i){const r=t===null,s=n===null,a=e&&!(r&&s)&&gS(e,i);return a&&(r||Tr(t,a.left,a.right))&&(s||Tr(n,a.top,a.bottom))}function UF(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function YF(e,t){e.rect(t.x,t.y,t.w,t.h)}function pg(e,t,n={}){const i=e.x!==n.x?-t:0,r=e.y!==n.y?-t:0,s=(e.x+e.w!==n.x+n.w?t:0)-i,o=(e.y+e.h!==n.y+n.h?t:0)-r;return{x:e.x+i,y:e.y+r,w:e.w+s,h:e.h+o,radius:e.radius}}class VF extends is{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:i,backgroundColor:r}}=this,{inner:s,outer:o}=HF(this),a=UF(o.radius)?ku:YF;t.save(),(o.w!==s.w||o.h!==s.h)&&(t.beginPath(),a(t,pg(o,n,s)),t.clip(),a(t,pg(s,-n,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,pg(s,n)),t.fillStyle=r,t.fill(),t.restore()}inRange(t,n,i){return fg(this,t,n,i)}inXRange(t,n){return fg(this,t,null,n)}inYRange(t,n){return fg(this,null,t,n)}getCenterPoint(t){const{x:n,y:i,base:r,horizontal:s}=this.getProps(["x","y","base","horizontal"],t);return{x:s?(n+r)/2:n,y:s?i:(i+r)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}var qF=Object.freeze({__proto__:null,ArcElement:TF,BarElement:VF,LineElement:ip,PointElement:jF});const Pm=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],tw=Pm.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function mS(e){return Pm[e%Pm.length]}function vS(e){return tw[e%tw.length]}function KF(e,t){return e.borderColor=mS(t),e.backgroundColor=vS(t),++t}function GF(e,t){return e.backgroundColor=e.data.map(()=>mS(t++)),t}function XF(e,t){return e.backgroundColor=e.data.map(()=>vS(t++)),t}function QF(e){let t=0;return(n,i)=>{const r=e.getDatasetMeta(i).controller;r instanceof S0?t=GF(n,t):r instanceof iS?t=XF(n,t):r&&(t=KF(n,t))}}function ew(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function ZF(e){return e&&(e.borderColor||e.backgroundColor)}function JF(){return Zt.borderColor!=="rgba(0,0,0,0.1)"||Zt.backgroundColor!=="rgba(0,0,0,0.1)"}var tz={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:i},options:r}=e.config,{elements:s}=r,o=ew(i)||ZF(r)||s&&ew(s)||JF();if(!n.forceOverride&&o)return;const a=QF(e);i.forEach(a)}};function ez(e,t,n,i,r){const s=r.samples||i;if(s>=n)return e.slice(t,t+n);const o=[],a=(n-2)/(s-2);let c=0;const l=t+n-1;let u=t,h,d,f,p,g;for(o[c++]=e[u],h=0;h<s-2;h++){let m=0,b=0,_;const C=Math.floor((h+1)*a)+1+t,S=Math.min(Math.floor((h+2)*a)+1,n)+t,k=S-C;for(_=C;_<S;_++)m+=e[_].x,b+=e[_].y;m/=k,b/=k;const $=Math.floor(h*a)+1+t,D=Math.min(Math.floor((h+1)*a)+1,n)+t,{x:w,y:x}=e[u];for(f=p=-1,_=$;_<D;_++)p=.5*Math.abs((w-m)*(e[_].y-x)-(w-e[_].x)*(b-x)),p>f&&(f=p,d=e[_],g=_);o[c++]=d,u=g}return o[c++]=e[l],o}function nz(e,t,n,i){let r=0,s=0,o,a,c,l,u,h,d,f,p,g;const m=[],b=t+n-1,_=e[t].x,S=e[b].x-_;for(o=t;o<t+n;++o){a=e[o],c=(a.x-_)/S*i,l=a.y;const k=c|0;if(k===u)l<p?(p=l,h=o):l>g&&(g=l,d=o),r=(s*r+a.x)/++s;else{const $=o-1;if(!vt(h)&&!vt(d)){const D=Math.min(h,d),w=Math.max(h,d);D!==f&&D!==$&&m.push({...e[D],x:r}),w!==f&&w!==$&&m.push({...e[w],x:r})}o>0&&$!==f&&m.push(e[$]),m.push(a),u=k,s=0,p=g=l,h=d=f=o}}return m}function yS(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function nw(e){e.data.datasets.forEach(t=>{yS(t)})}function iz(e,t){const n=t.length;let i=0,r;const{iScale:s}=e,{min:o,max:a,minDefined:c,maxDefined:l}=s.getUserBounds();return c&&(i=Pe(Or(t,s.axis,o).lo,0,n-1)),l?r=Pe(Or(t,s.axis,a).hi+1,i,n)-i:r=n-i,{start:i,count:r}}var rz={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){nw(e);return}const i=e.width;e.data.datasets.forEach((r,s)=>{const{_data:o,indexAxis:a}=r,c=e.getDatasetMeta(s),l=o||r.data;if(ml([a,e.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const u=e.scales[c.xAxisID];if(u.type!=="linear"&&u.type!=="time"||e.options.parsing)return;let{start:h,count:d}=iz(c,l);const f=n.threshold||4*i;if(d<=f){yS(r);return}vt(o)&&(r._data=l,delete r.data,Object.defineProperty(r,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(g){this._data=g}}));let p;switch(n.algorithm){case"lttb":p=ez(l,h,d,i,n);break;case"min-max":p=nz(l,h,d,i);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}r._decimated=p})},destroy(e){nw(e)}};function sz(e,t,n){const i=e.segments,r=e.points,s=t.points,o=[];for(const a of i){let{start:c,end:l}=a;l=rp(c,l,r);const u=Rm(n,r[c],r[l],a.loop);if(!t.segments){o.push({source:a,target:u,start:r[c],end:r[l]});continue}const h=Zk(t,u);for(const d of h){const f=Rm(n,s[d.start],s[d.end],d.loop),p=Qk(a,r,f);for(const g of p)o.push({source:g,target:d,start:{[n]:iw(u,f,"start",Math.max)},end:{[n]:iw(u,f,"end",Math.min)}})}}return o}function Rm(e,t,n,i){if(i)return;let r=t[e],s=n[e];return e==="angle"&&(r=Qe(r),s=Qe(s)),{property:e,start:r,end:s}}function oz(e,t){const{x:n=null,y:i=null}=e||{},r=t.points,s=[];return t.segments.forEach(({start:o,end:a})=>{a=rp(o,a,r);const c=r[o],l=r[a];i!==null?(s.push({x:c.x,y:i}),s.push({x:l.x,y:i})):n!==null&&(s.push({x:n,y:c.y}),s.push({x:n,y:l.y}))}),s}function rp(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function iw(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function bS(e,t){let n=[],i=!1;return Xt(e)?(i=!0,n=e):n=oz(e,t),n.length?new ip({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function rw(e){return e&&e.fill!==!1}function az(e,t,n){let r=e[t].fill;const s=[t];let o;if(!n)return r;for(;r!==!1&&s.indexOf(r)===-1;){if(!ue(r))return r;if(o=e[r],!o)return!1;if(o.visible)return r;s.push(r),r=o.fill}return!1}function cz(e,t,n){const i=dz(e);if(_t(i))return isNaN(i.value)?!1:i;let r=parseFloat(i);return ue(r)&&Math.floor(r)===r?lz(i[0],t,r,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function lz(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function uz(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:_t(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function hz(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:_t(e)?i=e.value:i=t.getBaseValue(),i}function dz(e){const t=e.options,n=t.fill;let i=lt(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function fz(e){const{scale:t,index:n,line:i}=e,r=[],s=i.segments,o=i.points,a=pz(t,n);a.push(bS({x:null,y:t.bottom},i));for(let c=0;c<s.length;c++){const l=s[c];for(let u=l.start;u<=l.end;u++)gz(r,o[u],a)}return new ip({points:r,options:{}})}function pz(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let r=0;r<i.length;r++){const s=i[r];if(s.index===t)break;s.hidden||n.unshift(s.dataset)}return n}function gz(e,t,n){const i=[];for(let r=0;r<n.length;r++){const s=n[r],{first:o,last:a,point:c}=mz(s,t,"x");if(!(!c||o&&a)){if(o)i.unshift(c);else if(e.push(c),!a)break}}e.push(...i)}function mz(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const r=i[n],s=e.segments,o=e.points;let a=!1,c=!1;for(let l=0;l<s.length;l++){const u=s[l],h=o[u.start][n],d=o[u.end][n];if(Tr(r,h,d)){a=r===h,c=r===d;break}}return{first:a,last:c,point:i}}class _S{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:r,y:s,radius:o}=this;return n=n||{start:0,end:Yt},t.arc(r,s,o,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:r}=this,s=t.angle;return{x:n+Math.cos(s)*r,y:i+Math.sin(s)*r,angle:s}}}function vz(e){const{chart:t,fill:n,line:i}=e;if(ue(n))return yz(t,n);if(n==="stack")return fz(e);if(n==="shape")return!0;const r=bz(e);return r instanceof _S?r:bS(r,i)}function yz(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function bz(e){return(e.scale||{}).getPointPositionForValue?wz(e):_z(e)}function _z(e){const{scale:t={},fill:n}=e,i=uz(n,t);if(ue(i)){const r=t.isHorizontal();return{x:r?i:null,y:r?null:i}}return null}function wz(e){const{scale:t,fill:n}=e,i=t.options,r=t.getLabels().length,s=i.reverse?t.max:t.min,o=hz(n,t,s),a=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,s);return new _S({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(o)})}for(let c=0;c<r;++c)a.push(t.getPointPositionForValue(c,o));return a}function gg(e,t,n){const i=vz(t),{chart:r,index:s,line:o,scale:a,axis:c}=t,l=o.options,u=l.fill,h=l.backgroundColor,{above:d=h,below:f=h}=u||{},p=r.getDatasetMeta(s),g=Jk(r,p);i&&o.points.length&&(Jf(e,n),xz(e,{line:o,target:i,above:d,below:f,area:n,scale:a,axis:c,clip:g}),tp(e))}function xz(e,t){const{line:n,target:i,above:r,below:s,area:o,scale:a,clip:c}=t,l=n._loop?"angle":t.axis;e.save();let u=s;s!==r&&(l==="x"?(sw(e,i,o.top),mg(e,{line:n,target:i,color:r,scale:a,property:l,clip:c}),e.restore(),e.save(),sw(e,i,o.bottom)):l==="y"&&(ow(e,i,o.left),mg(e,{line:n,target:i,color:s,scale:a,property:l,clip:c}),e.restore(),e.save(),ow(e,i,o.right),u=r)),mg(e,{line:n,target:i,color:u,scale:a,property:l,clip:c}),e.restore()}function sw(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,u=r[c],h=r[rp(c,l,r)];s?(e.moveTo(u.x,u.y),s=!1):(e.lineTo(u.x,n),e.lineTo(u.x,u.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(h.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function ow(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,u=r[c],h=r[rp(c,l,r)];s?(e.moveTo(u.x,u.y),s=!1):(e.lineTo(n,u.y),e.lineTo(u.x,u.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(n,h.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function mg(e,t){const{line:n,target:i,property:r,color:s,scale:o,clip:a}=t,c=sz(n,i,r);for(const{source:l,target:u,start:h,end:d}of c){const{style:{backgroundColor:f=s}={}}=l,p=i!==!0;e.save(),e.fillStyle=f,Cz(e,o,a,p&&Rm(r,h,d)),e.beginPath();const g=!!n.pathSegment(e,l);let m;if(p){g?e.closePath():aw(e,i,d,r);const b=!!i.pathSegment(e,u,{move:g,reverse:!0});m=g&&b,m||aw(e,i,h,r)}e.closePath(),e.fill(m?"evenodd":"nonzero"),e.restore()}}function Cz(e,t,n,i){const r=t.chart.chartArea,{property:s,start:o,end:a}=i||{};if(s==="x"||s==="y"){let c,l,u,h;s==="x"?(c=o,l=r.top,u=a,h=r.bottom):(c=r.left,l=o,u=r.right,h=a),e.beginPath(),n&&(c=Math.max(c,n.left),u=Math.min(u,n.right),l=Math.max(l,n.top),h=Math.min(h,n.bottom)),e.rect(c,l,u-c,h-l),e.clip()}}function aw(e,t,n,i){const r=t.interpolate(n,i);r&&e.lineTo(r.x,r.y)}var kz={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,r=[];let s,o,a,c;for(o=0;o<i;++o)s=e.getDatasetMeta(o),a=s.dataset,c=null,a&&a.options&&a instanceof ip&&(c={visible:e.isDatasetVisible(o),index:o,fill:cz(a,o,i),chart:e,axis:s.controller.options.indexAxis,scale:s.vScale,line:a}),s.$filler=c,r.push(c);for(o=0;o<i;++o)c=r[o],!(!c||c.fill===!1)&&(c.fill=az(r,o,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",r=e.getSortedVisibleDatasetMetas(),s=e.chartArea;for(let o=r.length-1;o>=0;--o){const a=r[o].$filler;a&&(a.line.updateControlPoints(s,a.axis),i&&a.fill&&gg(e.ctx,a,s))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let r=i.length-1;r>=0;--r){const s=i[r].$filler;rw(s)&&gg(e.ctx,s,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!rw(i)||n.drawTime!=="beforeDatasetDraw"||gg(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const cw=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},Sz=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class lw extends is{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=Wt(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,r)=>t.sort(i,r,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,r=Ce(i.font),s=r.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=cw(i,s);let l,u;n.font=r.string,this.isHorizontal()?(l=this.maxWidth,u=this._fitRows(o,s,a,c)+10):(u=this.maxHeight,l=this._fitCols(o,r,a,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(u,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,r){const{ctx:s,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],u=r+a;let h=t;s.textAlign="left",s.textBaseline="middle";let d=-1,f=-u;return this.legendItems.forEach((p,g)=>{const m=i+n/2+s.measureText(p.text).width;(g===0||l[l.length-1]+m+2*a>o)&&(h+=u,l[l.length-(g>0?0:1)]=0,f+=u,d++),c[g]={left:0,top:f,row:d,width:m,height:r},l[l.length-1]+=m+a}),h}_fitCols(t,n,i,r){const{ctx:s,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],u=o-t;let h=a,d=0,f=0,p=0,g=0;return this.legendItems.forEach((m,b)=>{const{itemWidth:_,itemHeight:C}=Ez(i,n,s,m,r);b>0&&f+C+2*a>u&&(h+=d+a,l.push({width:d,height:f}),p+=d+a,g++,d=f=0),c[b]={left:p,top:f,col:g,width:_,height:C},d=Math.max(d,_),f+=C+a}),h+=d,l.push({width:d,height:f}),h}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:r},rtl:s}}=this,o=Ba(s,this.left,this.width);if(this.isHorizontal()){let a=0,c=qe(i,this.left+r,this.right-this.lineWidths[a]);for(const l of n)a!==l.row&&(a=l.row,c=qe(i,this.left+r,this.right-this.lineWidths[a])),l.top+=this.top+t+r,l.left=o.leftForLtr(o.x(c),l.width),c+=l.width+r}else{let a=0,c=qe(i,this.top+t+r,this.bottom-this.columnSizes[a].height);for(const l of n)l.col!==a&&(a=l.col,c=qe(i,this.top+t+r,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+r,l.left=o.leftForLtr(o.x(l.left),l.width),c+=l.height+r}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Jf(t,this),this._draw(),tp(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:r}=this,{align:s,labels:o}=t,a=Zt.color,c=Ba(t.rtl,this.left,this.width),l=Ce(o.font),{padding:u}=o,h=l.size,d=h/2;let f;this.drawTitle(),r.textAlign=c.textAlign("left"),r.textBaseline="middle",r.lineWidth=.5,r.font=l.string;const{boxWidth:p,boxHeight:g,itemHeight:m}=cw(o,h),b=function($,D,w){if(isNaN(p)||p<=0||isNaN(g)||g<0)return;r.save();const x=lt(w.lineWidth,1);if(r.fillStyle=lt(w.fillStyle,a),r.lineCap=lt(w.lineCap,"butt"),r.lineDashOffset=lt(w.lineDashOffset,0),r.lineJoin=lt(w.lineJoin,"miter"),r.lineWidth=x,r.strokeStyle=lt(w.strokeStyle,a),r.setLineDash(lt(w.lineDash,[])),o.usePointStyle){const M={radius:g*Math.SQRT2/2,pointStyle:w.pointStyle,rotation:w.rotation,borderWidth:x},O=c.xPlus($,p/2),T=D+d;jk(r,M,O,T,o.pointStyleWidth&&p)}else{const M=D+Math.max((h-g)/2,0),O=c.leftForLtr($,p),T=So(w.borderRadius);r.beginPath(),Object.values(T).some(R=>R!==0)?ku(r,{x:O,y:M,w:p,h:g,radius:T}):r.rect(O,M,p,g),r.fill(),x!==0&&r.stroke()}r.restore()},_=function($,D,w){Yo(r,w.text,$,D+m/2,l,{strikethrough:w.hidden,textAlign:c.textAlign(w.textAlign)})},C=this.isHorizontal(),S=this._computeTitleHeight();C?f={x:qe(s,this.left+u,this.right-i[0]),y:this.top+u+S,line:0}:f={x:this.left+u,y:qe(s,this.top+S+u,this.bottom-n[0].height),line:0},Kk(this.ctx,t.textDirection);const k=m+u;this.legendItems.forEach(($,D)=>{r.strokeStyle=$.fontColor,r.fillStyle=$.fontColor;const w=r.measureText($.text).width,x=c.textAlign($.textAlign||($.textAlign=o.textAlign)),M=p+d+w;let O=f.x,T=f.y;c.setWidth(this.width),C?D>0&&O+M+u>this.right&&(T=f.y+=k,f.line++,O=f.x=qe(s,this.left+u,this.right-i[f.line])):D>0&&T+k>this.bottom&&(O=f.x=O+n[f.line].width+u,f.line++,T=f.y=qe(s,this.top+S+u,this.bottom-n[f.line].height));const R=c.x(O);if(b(R,T,$),O=L3(x,O+p+d,C?O+M:this.right,t.rtl),_(c.x(O),T,$),C)f.x+=M+u;else if(typeof $.text!="string"){const j=l.lineHeight;f.y+=wS($,j)+u}else f.y+=k}),Gk(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=Ce(n.font),r=en(n.padding);if(!n.display)return;const s=Ba(t.rtl,this.left,this.width),o=this.ctx,a=n.position,c=i.size/2,l=r.top+c;let u,h=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),u=this.top+l,h=qe(t.align,h,this.right-d);else{const p=this.columnSizes.reduce((g,m)=>Math.max(g,m.height),0);u=l+qe(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const f=qe(a,h,h+d);o.textAlign=s.textAlign(v0(a)),o.textBaseline="middle",o.strokeStyle=n.color,o.fillStyle=n.color,o.font=i.string,Yo(o,n.text,f,u,i)}_computeTitleHeight(){const t=this.options.title,n=Ce(t.font),i=en(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,r,s;if(Tr(t,this.left,this.right)&&Tr(n,this.top,this.bottom)){for(s=this.legendHitBoxes,i=0;i<s.length;++i)if(r=s[i],Tr(t,r.left,r.left+r.width)&&Tr(n,r.top,r.top+r.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!$z(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const r=this._hoveredItem,s=Sz(r,i);r&&!s&&Wt(n.onLeave,[t,r,this],this),this._hoveredItem=i,i&&!s&&Wt(n.onHover,[t,i,this],this)}else i&&Wt(n.onClick,[t,i,this],this)}}function Ez(e,t,n,i,r){const s=Mz(i,e,t,n),o=Dz(r,i,t.lineHeight);return{itemWidth:s,itemHeight:o}}function Mz(e,t,n,i){let r=e.text;return r&&typeof r!="string"&&(r=r.reduce((s,o)=>s.length>o.length?s:o)),t+n.size/2+i.measureText(r).width}function Dz(e,t,n){let i=e;return typeof t.text!="string"&&(i=wS(t,n)),i}function wS(e,t){const n=e.text?e.text.length:0;return t*n}function $z(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var Tz={id:"legend",_element:lw,start(e,t,n){const i=e.legend=new lw({ctx:e.ctx,options:n,chart:e});Je.configure(e,i,n),Je.addBox(e,i)},stop(e){Je.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;Je.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,r=n.chart;r.isDatasetVisible(i)?(r.hide(i),t.hidden=!0):(r.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(n?0:void 0),u=en(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:s,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(u.width+u.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:r||l.textAlign,borderRadius:o&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class M0 extends is{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const r=Xt(i.text)?i.text.length:1;this._padding=en(i.padding);const s=r*Ce(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=s:this.width=s}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:i,bottom:r,right:s,options:o}=this,a=o.align;let c=0,l,u,h;return this.isHorizontal()?(u=qe(a,i,s),h=n+t,l=s-i):(o.position==="left"?(u=i+t,h=qe(a,r,n),c=Dt*-.5):(u=s-t,h=qe(a,n,r),c=Dt*.5),l=r-n),{titleX:u,titleY:h,maxWidth:l,rotation:c}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const i=Ce(n.font),s=i.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:c,rotation:l}=this._drawArgs(s);Yo(t,n.text,0,0,i,{color:n.color,maxWidth:c,rotation:l,textAlign:v0(n.align),textBaseline:"middle",translation:[o,a]})}}function Oz(e,t){const n=new M0({ctx:e.ctx,options:t,chart:e});Je.configure(e,n,t),Je.addBox(e,n),e.titleBlock=n}var Iz={id:"title",_element:M0,start(e,t,n){Oz(e,n)},stop(e){const t=e.titleBlock;Je.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const i=e.titleBlock;Je.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Oh=new WeakMap;var Pz={id:"subtitle",start(e,t,n){const i=new M0({ctx:e.ctx,options:n,chart:e});Je.configure(e,i,n),Je.addBox(e,i),Oh.set(e,i)},stop(e){Je.removeBox(e,Oh.get(e)),Oh.delete(e)},beforeUpdate(e,t,n){const i=Oh.get(e);Je.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const yl={average(e){if(!e.length)return!1;let t,n,i=new Set,r=0,s=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const c=a.tooltipPosition();i.add(c.x),r+=c.y,++s}}return s===0||i.size===0?!1:{x:[...i].reduce((a,c)=>a+c)/i.size,y:r/s}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,r=Number.POSITIVE_INFINITY,s,o,a;for(s=0,o=e.length;s<o;++s){const c=e[s].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),u=Mm(t,l);u<r&&(r=u,a=c)}}if(a){const c=a.tooltipPosition();n=c.x,i=c.y}return{x:n,y:i}}};function ji(e,t){return t&&(Xt(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function wr(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function Rz(e,t){const{element:n,datasetIndex:i,index:r}=t,s=e.getDatasetMeta(i).controller,{label:o,value:a}=s.getLabelAndValue(r);return{chart:e,label:o,parsed:s.getParsed(r),raw:e.data.datasets[i].data[r],formattedValue:a,dataset:s.getDataset(),dataIndex:r,datasetIndex:i,element:n}}function uw(e,t){const n=e.chart.ctx,{body:i,footer:r,title:s}=e,{boxWidth:o,boxHeight:a}=t,c=Ce(t.bodyFont),l=Ce(t.titleFont),u=Ce(t.footerFont),h=s.length,d=r.length,f=i.length,p=en(t.padding);let g=p.height,m=0,b=i.reduce((S,k)=>S+k.before.length+k.lines.length+k.after.length,0);if(b+=e.beforeBody.length+e.afterBody.length,h&&(g+=h*l.lineHeight+(h-1)*t.titleSpacing+t.titleMarginBottom),b){const S=t.displayColors?Math.max(a,c.lineHeight):c.lineHeight;g+=f*S+(b-f)*c.lineHeight+(b-1)*t.bodySpacing}d&&(g+=t.footerMarginTop+d*u.lineHeight+(d-1)*t.footerSpacing);let _=0;const C=function(S){m=Math.max(m,n.measureText(S).width+_)};return n.save(),n.font=l.string,It(e.title,C),n.font=c.string,It(e.beforeBody.concat(e.afterBody),C),_=t.displayColors?o+2+t.boxPadding:0,It(i,S=>{It(S.before,C),It(S.lines,C),It(S.after,C)}),_=0,n.font=u.string,It(e.footer,C),n.restore(),m+=p.width,{width:m,height:g}}function Az(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function Lz(e,t,n,i){const{x:r,width:s}=i,o=n.caretSize+n.caretPadding;if(e==="left"&&r+s+o>t.width||e==="right"&&r-s-o<0)return!0}function Nz(e,t,n,i){const{x:r,width:s}=n,{width:o,chartArea:{left:a,right:c}}=e;let l="center";return i==="center"?l=r<=(a+c)/2?"left":"right":r<=s/2?l="left":r>=o-s/2&&(l="right"),Lz(l,e,t,n)&&(l="center"),l}function hw(e,t,n){const i=n.yAlign||t.yAlign||Az(e,n);return{xAlign:n.xAlign||t.xAlign||Nz(e,t,n,i),yAlign:i}}function Fz(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function zz(e,t,n){let{y:i,height:r}=e;return t==="top"?i+=n:t==="bottom"?i-=r+n:i-=r/2,i}function dw(e,t,n,i){const{caretSize:r,caretPadding:s,cornerRadius:o}=e,{xAlign:a,yAlign:c}=n,l=r+s,{topLeft:u,topRight:h,bottomLeft:d,bottomRight:f}=So(o);let p=Fz(t,a);const g=zz(t,c,l);return c==="center"?a==="left"?p+=l:a==="right"&&(p-=l):a==="left"?p-=Math.max(u,d)+r:a==="right"&&(p+=Math.max(h,f)+r),{x:Pe(p,0,i.width-t.width),y:Pe(g,0,i.height-t.height)}}function Ih(e,t,n){const i=en(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function fw(e){return ji([],wr(e))}function jz(e,t,n){return Vs(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function pw(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const xS={beforeTitle:br,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:br,beforeBody:br,beforeLabel:br,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return vt(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:br,afterBody:br,beforeFooter:br,footer:br,afterFooter:br};function Dn(e,t,n,i){const r=e[t].call(n,i);return typeof r>"u"?xS[t].call(n,i):r}class gw extends is{static positioners=yl;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),r=i.enabled&&n.options.animation&&i.animations,s=new tS(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(s)),s}getContext(){return this.$context||(this.$context=jz(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,r=Dn(i,"beforeTitle",this,t),s=Dn(i,"title",this,t),o=Dn(i,"afterTitle",this,t);let a=[];return a=ji(a,wr(r)),a=ji(a,wr(s)),a=ji(a,wr(o)),a}getBeforeBody(t,n){return fw(Dn(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,r=[];return It(t,s=>{const o={before:[],lines:[],after:[]},a=pw(i,s);ji(o.before,wr(Dn(a,"beforeLabel",this,s))),ji(o.lines,Dn(a,"label",this,s)),ji(o.after,wr(Dn(a,"afterLabel",this,s))),r.push(o)}),r}getAfterBody(t,n){return fw(Dn(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,r=Dn(i,"beforeFooter",this,t),s=Dn(i,"footer",this,t),o=Dn(i,"afterFooter",this,t);let a=[];return a=ji(a,wr(r)),a=ji(a,wr(s)),a=ji(a,wr(o)),a}_createItems(t){const n=this._active,i=this.chart.data,r=[],s=[],o=[];let a=[],c,l;for(c=0,l=n.length;c<l;++c)a.push(Rz(this.chart,n[c]));return t.filter&&(a=a.filter((u,h,d)=>t.filter(u,h,d,i))),t.itemSort&&(a=a.sort((u,h)=>t.itemSort(u,h,i))),It(a,u=>{const h=pw(t.callbacks,u);r.push(Dn(h,"labelColor",this,u)),s.push(Dn(h,"labelPointStyle",this,u)),o.push(Dn(h,"labelTextColor",this,u))}),this.labelColors=r,this.labelPointStyles=s,this.labelTextColors=o,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),r=this._active;let s,o=[];if(!r.length)this.opacity!==0&&(s={opacity:0});else{const a=yl[i.position].call(this,r,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const c=this._size=uw(this,i),l=Object.assign({},a,c),u=hw(this.chart,i,l),h=dw(i,l,u,this.chart);this.xAlign=u.xAlign,this.yAlign=u.yAlign,s={opacity:1,x:h.x,y:h.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,s&&this._resolveAnimations().update(this,s),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,r){const s=this.getCaretPosition(t,i,r);n.lineTo(s.x1,s.y1),n.lineTo(s.x2,s.y2),n.lineTo(s.x3,s.y3)}getCaretPosition(t,n,i){const{xAlign:r,yAlign:s}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:c,topRight:l,bottomLeft:u,bottomRight:h}=So(a),{x:d,y:f}=t,{width:p,height:g}=n;let m,b,_,C,S,k;return s==="center"?(S=f+g/2,r==="left"?(m=d,b=m-o,C=S+o,k=S-o):(m=d+p,b=m+o,C=S-o,k=S+o),_=m):(r==="left"?b=d+Math.max(c,u)+o:r==="right"?b=d+p-Math.max(l,h)-o:b=this.caretX,s==="top"?(C=f,S=C-o,m=b-o,_=b+o):(C=f+g,S=C+o,m=b+o,_=b-o),k=C),{x1:m,x2:b,x3:_,y1:C,y2:S,y3:k}}drawTitle(t,n,i){const r=this.title,s=r.length;let o,a,c;if(s){const l=Ba(i.rtl,this.x,this.width);for(t.x=Ih(this,i.titleAlign,i),n.textAlign=l.textAlign(i.titleAlign),n.textBaseline="middle",o=Ce(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=o.string,c=0;c<s;++c)n.fillText(r[c],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,c+1===s&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,r,s){const o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=s,u=Ce(s.bodyFont),h=Ih(this,"left",s),d=r.x(h),f=c<u.lineHeight?(u.lineHeight-c)/2:0,p=n.y+f;if(s.usePointStyle){const g={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},m=r.leftForLtr(d,l)+l/2,b=p+c/2;t.strokeStyle=s.multiKeyBackground,t.fillStyle=s.multiKeyBackground,$m(t,g,m,b),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,$m(t,g,m,b)}else{t.lineWidth=_t(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const g=r.leftForLtr(d,l),m=r.leftForLtr(r.xPlus(d,1),l-2),b=So(o.borderRadius);Object.values(b).some(_=>_!==0)?(t.beginPath(),t.fillStyle=s.multiKeyBackground,ku(t,{x:g,y:p,w:l,h:c,radius:b}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),ku(t,{x:m,y:p+1,w:l-2,h:c-2,radius:b}),t.fill()):(t.fillStyle=s.multiKeyBackground,t.fillRect(g,p,l,c),t.strokeRect(g,p,l,c),t.fillStyle=o.backgroundColor,t.fillRect(m,p+1,l-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:r}=this,{bodySpacing:s,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:u}=i,h=Ce(i.bodyFont);let d=h.lineHeight,f=0;const p=Ba(i.rtl,this.x,this.width),g=function(w){n.fillText(w,p.x(t.x+f),t.y+d/2),t.y+=d+s},m=p.textAlign(o);let b,_,C,S,k,$,D;for(n.textAlign=o,n.textBaseline="middle",n.font=h.string,t.x=Ih(this,m,i),n.fillStyle=i.bodyColor,It(this.beforeBody,g),f=a&&m!=="right"?o==="center"?l/2+u:l+2+u:0,S=0,$=r.length;S<$;++S){for(b=r[S],_=this.labelTextColors[S],n.fillStyle=_,It(b.before,g),C=b.lines,a&&C.length&&(this._drawColorBox(n,t,S,p,i),d=Math.max(h.lineHeight,c)),k=0,D=C.length;k<D;++k)g(C[k]),d=h.lineHeight;It(b.after,g)}f=0,d=h.lineHeight,It(this.afterBody,g),t.y-=s}drawFooter(t,n,i){const r=this.footer,s=r.length;let o,a;if(s){const c=Ba(i.rtl,this.x,this.width);for(t.x=Ih(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=c.textAlign(i.footerAlign),n.textBaseline="middle",o=Ce(i.footerFont),n.fillStyle=i.footerColor,n.font=o.string,a=0;a<s;++a)n.fillText(r[a],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,n,i,r){const{xAlign:s,yAlign:o}=this,{x:a,y:c}=t,{width:l,height:u}=i,{topLeft:h,topRight:d,bottomLeft:f,bottomRight:p}=So(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(a+h,c),o==="top"&&this.drawCaret(t,n,i,r),n.lineTo(a+l-d,c),n.quadraticCurveTo(a+l,c,a+l,c+d),o==="center"&&s==="right"&&this.drawCaret(t,n,i,r),n.lineTo(a+l,c+u-p),n.quadraticCurveTo(a+l,c+u,a+l-p,c+u),o==="bottom"&&this.drawCaret(t,n,i,r),n.lineTo(a+f,c+u),n.quadraticCurveTo(a,c+u,a,c+u-f),o==="center"&&s==="left"&&this.drawCaret(t,n,i,r),n.lineTo(a,c+h),n.quadraticCurveTo(a,c,a+h,c),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,r=i&&i.x,s=i&&i.y;if(r||s){const o=yl[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=uw(this,t),c=Object.assign({},o,this._size),l=hw(n,t,c),u=dw(t,c,l,n);(r._to!==u.x||s._to!==u.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,u))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},s={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=en(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(s,t,r,n),Kk(t,n.textDirection),s.y+=o.top,this.drawTitle(s,t,n),this.drawBody(s,t,n),this.drawFooter(s,t,n),Gk(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,r=t.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),s=!sf(i,r),o=this._positionChanged(r,n);(s||o)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,s=this._active||[],o=this._getActiveElements(t,s,n,i),a=this._positionChanged(o,t),c=n||!sf(o,s)||a;return c&&(this._active=o,(r.enabled||r.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),c}_getActiveElements(t,n,i,r){const s=this.options;if(t.type==="mouseout")return[];if(!r)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,s.mode,s,i);return s.reverse&&o.reverse(),o}_positionChanged(t,n){const{caretX:i,caretY:r,options:s}=this,o=yl[s.position].call(this,t,n);return o!==!1&&(i!==o.x||r!==o.y)}}var Bz={id:"tooltip",_element:gw,positioners:yl,afterInit(e,t,n){n&&(e.tooltip=new gw({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:xS},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Wz=Object.freeze({__proto__:null,Colors:tz,Decimation:rz,Filler:kz,Legend:Tz,SubTitle:Pz,Title:Iz,Tooltip:Bz});const Hz=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function Uz(e,t,n,i){const r=e.indexOf(t);if(r===-1)return Hz(e,t,n,i);const s=e.lastIndexOf(t);return r!==s?n:r}const Yz=(e,t)=>e===null?null:Pe(Math.round(e),0,t);function mw(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class Vz extends ra{static id="category";static defaults={ticks:{callback:mw}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:r,label:s}of n)i[r]===s&&i.splice(r,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(vt(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:Uz(i,t,lt(n,t),this._addedLabels),Yz(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:r}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(r=this.getLabels().length-1)),this.min=i,this.max=r}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,r=[];let s=this.getLabels();s=t===0&&n===s.length-1?s:s.slice(t,n+1),this._valueRange=Math.max(s.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let o=t;o<=n;o++)r.push({value:o});return r}getLabelForValue(t){return mw.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function qz(e,t){const n=[],{bounds:r,step:s,min:o,max:a,precision:c,count:l,maxTicks:u,maxDigits:h,includeBounds:d}=e,f=s||1,p=u-1,{min:g,max:m}=t,b=!vt(o),_=!vt(a),C=!vt(l),S=(m-g)/(h+1);let k=u_((m-g)/p/f)*f,$,D,w,x;if(k<1e-14&&!b&&!_)return[{value:g},{value:m}];x=Math.ceil(m/k)-Math.floor(g/k),x>p&&(k=u_(x*k/p/f)*f),vt(c)||($=Math.pow(10,c),k=Math.ceil(k*$)/$),r==="ticks"?(D=Math.floor(g/k)*k,w=Math.ceil(m/k)*k):(D=g,w=m),b&&_&&s&&$3((a-o)/s,k/1e3)?(x=Math.round(Math.min((a-o)/k,u)),k=(a-o)/x,D=o,w=a):C?(D=b?o:D,w=_?a:w,x=l-1,k=(w-D)/x):(x=(w-D)/k,Vl(x,Math.round(x),k/1e3)?x=Math.round(x):x=Math.ceil(x));const M=Math.max(h_(k),h_(D));$=Math.pow(10,vt(c)?M:c),D=Math.round(D*$)/$,w=Math.round(w*$)/$;let O=0;for(b&&(d&&D!==o?(n.push({value:o}),D<o&&O++,Vl(Math.round((D+O*k)*$)/$,o,vw(o,S,e))&&O++):D<o&&O++);O<x;++O){const T=Math.round((D+O*k)*$)/$;if(_&&T>a)break;n.push({value:T})}return _&&d&&w!==a?n.length&&Vl(n[n.length-1].value,a,vw(a,S,e))?n[n.length-1].value=a:n.push({value:a}):(!_||w===a)&&n.push({value:w}),n}function vw(e,t,{horizontal:n,minRotation:i}){const r=Ti(i),s=(n?Math.sin(r):Math.cos(r))||.001,o=.75*t*(""+e).length;return Math.min(t/s,o)}class df extends ra{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return vt(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:r,max:s}=this;const o=c=>r=n?r:c,a=c=>s=i?s:c;if(t){const c=tr(r),l=tr(s);c<0&&l<0?a(0):c>0&&l>0&&o(0)}if(r===s){let c=s===0?1:Math.abs(s*.05);a(s+c),t||o(r-c)}this.min=r,this.max=s}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,r;return i?(r=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const r={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},s=this._range||this,o=qz(r,s);return t.bounds==="ticks"&&Ok(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const r=(i-n)/Math.max(t.length-1,1)/2;n-=r,i+=r}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return lh(t,this.chart.options.locale,this.options.ticks.format)}}class Kz extends df{static id="linear";static defaults={ticks:{callback:Zf.formatters.numeric}};determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ue(t)?t:0,this.max=ue(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=Ti(this.options.ticks.minRotation),r=(t?Math.sin(i):Math.cos(i))||.001,s=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,s.lineHeight/r))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const Mu=e=>Math.floor(ws(e)),so=(e,t)=>Math.pow(10,Mu(e)+t);function yw(e){return e/Math.pow(10,Mu(e))===1}function bw(e,t,n){const i=Math.pow(10,n),r=Math.floor(e/i);return Math.ceil(t/i)-r}function Gz(e,t){const n=t-e;let i=Mu(n);for(;bw(e,t,i)>10;)i++;for(;bw(e,t,i)<10;)i--;return Math.min(i,Mu(e))}function Xz(e,{min:t,max:n}){t=Vn(e.min,t);const i=[],r=Mu(t);let s=Gz(t,n),o=s<0?Math.pow(10,Math.abs(s)):1;const a=Math.pow(10,s),c=r>s?Math.pow(10,r):0,l=Math.round((t-c)*o)/o,u=Math.floor((t-c)/a/10)*a*10;let h=Math.floor((l-u)/Math.pow(10,s)),d=Vn(e.min,Math.round((c+u+h*Math.pow(10,s))*o)/o);for(;d<n;)i.push({value:d,major:yw(d),significand:h}),h>=10?h=h<15?15:20:h++,h>=20&&(s++,h=2,o=s>=0?1:o),d=Math.round((c+u+h*Math.pow(10,s))*o)/o;const f=Vn(e.max,d);return i.push({value:f,major:yw(f),significand:h}),i}class Qz extends ra{static id="logarithmic";static defaults={ticks:{callback:Zf.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const i=df.prototype.parse.apply(this,[t,n]);if(i===0){this._zero=!0;return}return ue(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ue(t)?Math.max(0,t):null,this.max=ue(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!ue(this._userMin)&&(this.min=t===so(this.min,0)?so(this.min,-1):so(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let i=this.min,r=this.max;const s=a=>i=t?i:a,o=a=>r=n?r:a;i===r&&(i<=0?(s(1),o(10)):(s(so(i,-1)),o(so(r,1)))),i<=0&&s(so(r,-1)),r<=0&&o(so(i,1)),this.min=i,this.max=r}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},i=Xz(n,this);return t.bounds==="ticks"&&Ok(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":lh(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=ws(t),this._valueRange=ws(this.max)-ws(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(ws(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}function Am(e){const t=e.ticks;if(t.display&&e.display){const n=en(t.backdropPadding);return lt(t.font&&t.font.size,Zt.font.size)+n.height}return 0}function Zz(e,t,n){return n=Xt(n)?n:[n],{w:V3(e,t.string,n),h:n.length*t.lineHeight}}function _w(e,t,n,i,r){return e===i||e===r?{start:t-n/2,end:t+n/2}:e<i||e>r?{start:t-n,end:t}:{start:t,end:t+n}}function Jz(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),i=[],r=[],s=e._pointLabels.length,o=e.options.pointLabels,a=o.centerPointLabels?Dt/s:0;for(let c=0;c<s;c++){const l=o.setContext(e.getPointLabelContext(c));r[c]=l.padding;const u=e.getPointPosition(c,e.drawingArea+r[c],a),h=Ce(l.font),d=Zz(e.ctx,h,e._pointLabels[c]);i[c]=d;const f=Qe(e.getIndexAngle(c)+a),p=Math.round(g0(f)),g=_w(p,u.x,d.w,0,180),m=_w(p,u.y,d.h,90,270);tj(n,t,f,g,m)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=ij(e,i,r)}function tj(e,t,n,i,r){const s=Math.abs(Math.sin(n)),o=Math.abs(Math.cos(n));let a=0,c=0;i.start<t.l?(a=(t.l-i.start)/s,e.l=Math.min(e.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/s,e.r=Math.max(e.r,t.r+a)),r.start<t.t?(c=(t.t-r.start)/o,e.t=Math.min(e.t,t.t-c)):r.end>t.b&&(c=(r.end-t.b)/o,e.b=Math.max(e.b,t.b+c))}function ej(e,t,n){const i=e.drawingArea,{extra:r,additionalAngle:s,padding:o,size:a}=n,c=e.getPointPosition(t,i+r+o,s),l=Math.round(g0(Qe(c.angle+fe))),u=oj(c.y,a.h,l),h=rj(l),d=sj(c.x,a.w,h);return{visible:!0,x:c.x,y:u,textAlign:h,left:d,top:u,right:d+a.w,bottom:u+a.h}}function nj(e,t){if(!t)return!0;const{left:n,top:i,right:r,bottom:s}=e;return!(Ir({x:n,y:i},t)||Ir({x:n,y:s},t)||Ir({x:r,y:i},t)||Ir({x:r,y:s},t))}function ij(e,t,n){const i=[],r=e._pointLabels.length,s=e.options,{centerPointLabels:o,display:a}=s.pointLabels,c={extra:Am(s)/2,additionalAngle:o?Dt/r:0};let l;for(let u=0;u<r;u++){c.padding=n[u],c.size=t[u];const h=ej(e,u,c);i.push(h),a==="auto"&&(h.visible=nj(h,l),h.visible&&(l=h))}return i}function rj(e){return e===0||e===180?"center":e<180?"left":"right"}function sj(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function oj(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function aj(e,t,n){const{left:i,top:r,right:s,bottom:o}=n,{backdropColor:a}=t;if(!vt(a)){const c=So(t.borderRadius),l=en(t.backdropPadding);e.fillStyle=a;const u=i-l.left,h=r-l.top,d=s-i+l.width,f=o-r+l.height;Object.values(c).some(p=>p!==0)?(e.beginPath(),ku(e,{x:u,y:h,w:d,h:f,radius:c}),e.fill()):e.fillRect(u,h,d,f)}}function cj(e,t){const{ctx:n,options:{pointLabels:i}}=e;for(let r=t-1;r>=0;r--){const s=e._pointLabelItems[r];if(!s.visible)continue;const o=i.setContext(e.getPointLabelContext(r));aj(n,o,s);const a=Ce(o.font),{x:c,y:l,textAlign:u}=s;Yo(n,e._pointLabels[r],c,l+a.lineHeight/2,a,{color:o.color,textAlign:u,textBaseline:"middle"})}}function CS(e,t,n,i){const{ctx:r}=e;if(n)r.arc(e.xCenter,e.yCenter,t,0,Yt);else{let s=e.getPointPosition(0,t);r.moveTo(s.x,s.y);for(let o=1;o<i;o++)s=e.getPointPosition(o,t),r.lineTo(s.x,s.y)}}function lj(e,t,n,i,r){const s=e.ctx,o=t.circular,{color:a,lineWidth:c}=t;!o&&!i||!a||!c||n<0||(s.save(),s.strokeStyle=a,s.lineWidth=c,s.setLineDash(r.dash||[]),s.lineDashOffset=r.dashOffset,s.beginPath(),CS(e,n,o,i),s.closePath(),s.stroke(),s.restore())}function uj(e,t,n){return Vs(e,{label:n,index:t,type:"pointLabel"})}class hj extends df{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Zf.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=en(Am(this.options)/2),n=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=ue(t)&&!isNaN(t)?t:0,this.max=ue(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Am(this.options))}generateTickLabels(t){df.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,i)=>{const r=Wt(this.options.pointLabels.callback,[n,i],this);return r||r===0?r:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?Jz(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,i,r){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((i-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,i,r))}getIndexAngle(t){const n=Yt/(this._pointLabels.length||1),i=this.options.startAngle||0;return Qe(t*n+Ti(i))}getDistanceFromCenterForValue(t){if(vt(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(vt(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const i=n[t];return uj(this.getContext(),t,i)}}getPointPosition(t,n,i=0){const r=this.getIndexAngle(t)-fe+i;return{x:Math.cos(r)*n+this.xCenter,y:Math.sin(r)*n+this.yCenter,angle:r}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:i,right:r,bottom:s}=this._pointLabelItems[t];return{left:n,top:i,right:r,bottom:s}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),CS(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:i,grid:r,border:s}=n,o=this._pointLabels.length;let a,c,l;if(n.pointLabels.display&&cj(this,o),r.display&&this.ticks.forEach((u,h)=>{if(h!==0||h===0&&this.min<0){c=this.getDistanceFromCenterForValue(u.value);const d=this.getContext(h),f=r.setContext(d),p=s.setContext(d);lj(this,f,c,o,p)}}),i.display){for(t.save(),a=o-1;a>=0;a--){const u=i.setContext(this.getPointLabelContext(a)),{color:h,lineWidth:d}=u;!d||!h||(t.lineWidth=d,t.strokeStyle=h,t.setLineDash(u.borderDash),t.lineDashOffset=u.borderDashOffset,c=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),l=this.getPointPosition(a,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;const r=this.getIndexAngle(0);let s,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(r),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,c)=>{if(c===0&&this.min>=0&&!n.reverse)return;const l=i.setContext(this.getContext(c)),u=Ce(l.font);if(s=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){t.font=u.string,o=t.measureText(a.label).width,t.fillStyle=l.backdropColor;const h=en(l.backdropPadding);t.fillRect(-o/2-h.left,-s-u.size/2-h.top,o+h.width,u.size+h.height)}Yo(t,a.label,0,-s,u,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),t.restore()}drawTitle(){}}const sp={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Ln=Object.keys(sp);function ww(e,t){return e-t}function xw(e,t){if(vt(t))return null;const n=e._adapter,{parser:i,round:r,isoWeekday:s}=e._parseOpts;let o=t;return typeof i=="function"&&(o=i(o)),ue(o)||(o=typeof i=="string"?n.parse(o,i):n.parse(o)),o===null?null:(r&&(o=r==="week"&&(uc(s)||s===!0)?n.startOf(o,"isoWeek",s):n.startOf(o,r)),+o)}function Cw(e,t,n,i){const r=Ln.length;for(let s=Ln.indexOf(e);s<r-1;++s){const o=sp[Ln[s]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((n-t)/(a*o.size))<=i)return Ln[s]}return Ln[r-1]}function dj(e,t,n,i,r){for(let s=Ln.length-1;s>=Ln.indexOf(n);s--){const o=Ln[s];if(sp[o].common&&e._adapter.diff(r,i,o)>=t-1)return o}return Ln[n?Ln.indexOf(n):0]}function fj(e){for(let t=Ln.indexOf(e)+1,n=Ln.length;t<n;++t)if(sp[Ln[t]].common)return Ln[t]}function kw(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:r}=m0(n,t),s=n[i]>=t?n[i]:n[r];e[s]=!0}}function pj(e,t,n,i){const r=e._adapter,s=+r.startOf(t[0].value,i),o=t[t.length-1].value;let a,c;for(a=s;a<=o;a=+r.add(a,1,i))c=n[a],c>=0&&(t[c].major=!0);return t}function Sw(e,t,n){const i=[],r={},s=t.length;let o,a;for(o=0;o<s;++o)a=t[o],r[a]=o,i.push({value:a,major:!1});return s===0||!n?i:pj(e,i,r,n)}class Lm extends ra{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),r=this._adapter=new g6._date(t.adapters.date);r.init(n),Yl(i.displayFormats,r.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:xw(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:r,max:s,minDefined:o,maxDefined:a}=this.getUserBounds();function c(l){!o&&!isNaN(l.min)&&(r=Math.min(r,l.min)),!a&&!isNaN(l.max)&&(s=Math.max(s,l.max))}(!o||!a)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),r=ue(r)&&!isNaN(r)?r:+n.startOf(Date.now(),i),s=ue(s)&&!isNaN(s)?s:+n.endOf(Date.now(),i)+1,this.min=Math.min(r,s-1),this.max=Math.max(r+1,s)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,r=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const s=this.min,o=this.max,a=P3(r,s,o);return this._unit=n.unit||(i.autoSkip?Cw(n.minUnit,this.min,this.max,this._getLabelCapacity(s)):dj(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:fj(this._unit),this.initOffsets(r),t.reverse&&a.reverse(),Sw(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,r,s;this.options.offset&&t.length&&(r=this.getDecimalForValue(t[0]),t.length===1?n=1-r:n=(this.getDecimalForValue(t[1])-r)/2,s=this.getDecimalForValue(t[t.length-1]),t.length===1?i=s:i=(s-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;n=Pe(n,0,o),i=Pe(i,0,o),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,r=this.options,s=r.time,o=s.unit||Cw(s.minUnit,n,i,this._getLabelCapacity(n)),a=lt(r.ticks.stepSize,1),c=o==="week"?s.isoWeekday:!1,l=uc(c)||c===!0,u={};let h=n,d,f;if(l&&(h=+t.startOf(h,"isoWeek",c)),h=+t.startOf(h,l?"day":o),t.diff(i,n,o)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+o);const p=r.ticks.source==="data"&&this.getDataTimestamps();for(d=h,f=0;d<i;d=+t.add(d,a,o),f++)kw(u,d,p);return(d===i||r.bounds==="ticks"||f===1)&&kw(u,d,p),Object.keys(u).sort(ww).map(g=>+g)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const r=this.options.time.displayFormats,s=this._unit,o=n||r[s];return this._adapter.format(t,o)}_tickFormatFunction(t,n,i,r){const s=this.options,o=s.ticks.callback;if(o)return Wt(o,[t,n,i],this);const a=s.time.displayFormats,c=this._unit,l=this._majorUnit,u=c&&a[c],h=l&&a[l],d=i[n],f=l&&h&&d&&d.major;return this._adapter.format(t,r||(f?h:u))}generateTickLabels(t){let n,i,r;for(n=0,i=t.length;n<i;++n)r=t[n],r.label=this._tickFormatFunction(r.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,r=Ti(this.isHorizontal()?n.maxRotation:n.minRotation),s=Math.cos(r),o=Math.sin(r),a=this._resolveTickFontOptions(0).size;return{w:i*s+a*o,h:i*o+a*s}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,r=i[n.unit]||i.millisecond,s=this._tickFormatFunction(t,0,Sw(this,[t],this._majorUnit),r),o=this._getLabelSize(s),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,i=r.length;n<i;++n)t=t.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const r=this.getLabels();for(n=0,i=r.length;n<i;++n)t.push(xw(this,r[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Rk(t.sort(ww))}}function Ph(e,t,n){let i=0,r=e.length-1,s,o,a,c;n?(t>=e[i].pos&&t<=e[r].pos&&({lo:i,hi:r}=Or(e,"pos",t)),{pos:s,time:a}=e[i],{pos:o,time:c}=e[r]):(t>=e[i].time&&t<=e[r].time&&({lo:i,hi:r}=Or(e,"time",t)),{time:s,pos:a}=e[i],{time:o,pos:c}=e[r]);const l=o-s;return l?a+(c-a)*(t-s)/l:a}class gj extends Lm{static id="timeseries";static defaults=Lm.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Ph(n,this.min),this._tableRange=Ph(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,r=[],s=[];let o,a,c,l,u;for(o=0,a=t.length;o<a;++o)l=t[o],l>=n&&l<=i&&r.push(l);if(r.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(o=0,a=r.length;o<a;++o)u=r[o+1],c=r[o-1],l=r[o],Math.round((u+c)/2)!==l&&s.push({time:l,pos:o/(a-1)});return s}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((r,s)=>r-s)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Ph(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Ph(this._table,i*this._tableRange+this._minPos,!0)}}var mj=Object.freeze({__proto__:null,CategoryScale:Vz,LinearScale:Kz,LogarithmicScale:Qz,RadialLinearScale:hj,TimeScale:Lm,TimeSeriesScale:gj});const vj=[p6,qF,Wz,mj];var yj=Object.defineProperty,bj=Object.getOwnPropertyDescriptor,kS=e=>{throw TypeError(e)},uh=(e,t,n,i)=>{for(var r=i>1?void 0:i?bj(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&yj(t,n,r),r},_j=(e,t,n)=>t.has(e)||kS("Cannot "+n),wj=(e,t,n)=>t.has(e)?kS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Jh=(e,t,n)=>(_j(e,t,"access private method"),n),Oa,Nm,D0;Eu.register(...vj);Eu.defaults.animation=!1;let Vo=class extends mt{constructor(){super(...arguments),wj(this,Oa),this.chartType="bar",this.data={labels:[],datasets:[]},this.options={},this.ariaChartLabel="Chart"}render(){return E`
      <canvas aria-label=${this.ariaChartLabel} role="img"></canvas>
    `}updated(e){if(!this._chart){Jh(this,Oa,Nm).call(this);return}e.has("chartType")?(this._chart.destroy(),Jh(this,Oa,Nm).call(this)):(e.has("data")||e.has("options"))&&(this._chart.data=this.data,e.has("options")&&(this._chart.options=Jh(this,Oa,D0).call(this)),this._chart.update())}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>{if(!this._chart)return;const e=this.clientWidth,t=this.clientHeight;if(e===0||t===0)return;const n=window.devicePixelRatio,i=this._chart.canvas;i.style.width=`${e}px`,i.style.height=`${t}px`,i.width=Math.round(e*n),i.height=Math.round(t*n),this._chart.width=e,this._chart.height=t,this._chart.ctx.setTransform(n,0,0,n,0,0),this._chart.update()}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._chart?.destroy(),this._chart=void 0}};Oa=new WeakSet;Nm=function(){const t=this.shadowRoot.querySelector("canvas").getContext("2d");if(!t)return;Eu.defaults.color=getComputedStyle(document.documentElement).getPropertyValue("--budgee-text").trim();const n=this.chartType==="pie"||this.chartType==="doughnut";this._chart=new Eu(t,{type:this.chartType,data:this.data,options:Jh(this,Oa,D0).call(this),plugins:n?[{id:"squareChartArea",afterLayout(i){const r=i.chartArea,s=r.right-r.left,o=r.bottom-r.top;if(s===o)return;const a=i.legend,c=a?.position;if(s>o){const u=(s-o)/2;r.left+=u,r.right-=u,a&&c==="right"?(a.left-=u,a.right-=u):a&&c==="left"&&(a.left+=u,a.right+=u)}else{const u=(o-s)/2;r.top+=u,r.bottom-=u,a&&c==="bottom"?(a.top-=u,a.bottom-=u):a&&c==="top"&&(a.top+=u,a.bottom+=u)}}}]:[]})};D0=function(){return lc({responsive:!1,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{sort:(e,t)=>(e.text??"").localeCompare(t.text??"")}}}},this.options)};Vo.styles=dt`
    :host {
      display: block;
      position: relative;
      flex: 1;
      min-height: 0;
    }
  `;uh([H({type:String})],Vo.prototype,"chartType",2);uh([H({type:Object})],Vo.prototype,"data",2);uh([H({type:Object})],Vo.prototype,"options",2);uh([H({type:String,attribute:"aria-chart-label"})],Vo.prototype,"ariaChartLabel",2);Vo=uh([Et("chart-wrapper")],Vo);var xj=Object.defineProperty,Cj=Object.getOwnPropertyDescriptor,SS=e=>{throw TypeError(e)},ES=(e,t,n,i)=>{for(var r=i>1?void 0:i?Cj(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&xj(t,n,r),r},kj=(e,t,n)=>t.has(e)||SS("Cannot "+n),Sj=(e,t,n)=>t.has(e)?SS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ew=(e,t,n)=>(kj(e,t,"access private method"),n),td,MS,DS;const Ej=[{value:za.Duration.from({months:1}),label:"1M"},{value:za.Duration.from({months:6}),label:"6M"},{value:za.Duration.from({years:1}),label:"1Y"},{value:null,label:"All"}];class Mj extends Event{constructor(t){super("time-range-change",{bubbles:!0}),this.timeRange=t}}let ff=class extends mt{constructor(){super(...arguments),Sj(this,td),this.value=null}render(){return Ej.map(({value:e,label:t})=>E`<button
          class=${Ew(this,td,MS).call(this,e)?"active":""}
          @click=${()=>Ew(this,td,DS).call(this,e)}
        >${t}</button>`)}};td=new WeakSet;MS=function(e){if(this.value===null||e===null)return this.value===e;const t=za.Now.plainDateISO();return za.Duration.compare(this.value,e,{relativeTo:t})===0};DS=function(e){this.value=e,this.dispatchEvent(new Mj(e))};ff.styles=dt`
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
  `;ES([H({attribute:!1})],ff.prototype,"value",2);ff=ES([Et("time-range-picker")],ff);const op=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;function Fm(e,t){const n=new Map;for(const i of e)for(const r of t(i))n.set(r,(n.get(r)??0)+i.amount);return n}function Mw(e,t){const n=new Map;for(const i of t){const r=e.get(i.id);r!==void 0&&n.set(i.name,r)}return n}function Dj(e,t){switch(t){case"day":return e.slice(0,10);case"month":return e.slice(0,7);case"year":return e.slice(0,4)}}function Dw(e,t){return Fm(e,n=>[Dj(n.date,t)])}function $j(e,t){return e.filter(n=>{if(t.tagId!==void 0&&!n.tagIds.includes(t.tagId)||t.excludedTagId!==void 0&&n.tagIds.includes(t.excludedTagId)||t.merchantId!==void 0&&n.merchantId!==t.merchantId||t.excludedMerchantId!==void 0&&n.merchantId===t.excludedMerchantId||t.startDate&&n.date<t.startDate||t.endDate&&n.date>t.endDate)return!1;if(t.amountFilter){const{operator:i,value:r}=t.amountFilter;if(i==="lt"&&!(n.amount<r)||i==="gt"&&!(n.amount>r)||i==="lte"&&!(n.amount<=r)||i==="gte"&&!(n.amount>=r))return!1}if(t.descriptionFilter){const i=n.description.toLowerCase().includes(t.descriptionFilter.toLowerCase());if(t.descriptionFilterMode==="exclude"&&i||t.descriptionFilterMode==="include"&&!i)return!1}return!0})}function Tj(e,t){return t<2?e.map(n=>n):e.map((n,i)=>{const r=Math.max(0,i-t+1),s=e.slice(r,i+1).sort((a,c)=>a-c),o=Math.floor(s.length/2);return s.length%2===0?(s[o-1]+s[o])/2:s[o]})}function Oj(e){return Math.max(6,Math.min(12,Math.round(e*.1)))}function Ke(e,t){const n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();if(t==null)return n;const i=n.match(/^lch\(([^)]+)\)$/);return i?`lch(${i[1]} / ${t})`:`color-mix(in srgb, ${n} ${Math.round(t*100)}%, transparent)`}function Ij(e){const{allEntries:t,displayEntries:n,label:i,formatLabel:r}=e,s=t.map(([,g])=>g),o=Oj(s.length),a=Tj(s,o),c=n[0]?.[0],l=c?t.findIndex(([g])=>g===c):0,u=n.map(([,g])=>g),h=u.map(Math.abs),d=a.slice(l,l+n.length).map(Math.abs),f=r?n.map(([g])=>r(g)):n.map(([g])=>g),p=[{label:i,data:h,backgroundColor:u.map(g=>g<0?Ke("--budgee-negative",.5):Ke("--budgee-positive",.5)),hoverBackgroundColor:u.map(g=>g<0?Ke("--budgee-negative",.75):Ke("--budgee-positive",.75)),borderColor:u.map(g=>g<0?Ke("--budgee-negative"):Ke("--budgee-positive")),borderWidth:1,maxBarThickness:50}];return h.length>=2&&p.push({type:"line",label:`${i} (${o}-pt median)`,data:d,borderColor:Ke("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}),{labels:f,datasets:p}}const $S=dt`
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
`;function TS(e){return E`
    <div class="resize-handle" @pointerdown=${t=>e.startResize(t,{horizontal:!0})}></div>
    <div class="resize-handle-bottom" @pointerdown=${t=>e.startResize(t,{vertical:!0})}></div>
    <div class="resize-handle-corner" @pointerdown=${t=>e.startResize(t,{horizontal:!0,vertical:!0})}></div>
  `}function OS(e){class t extends e{constructor(){super(...arguments),this.maxColumns=12,this.maxRows=4}get _resizableConfig(){return{}}_onResized(i){}_onLiveColSpan(i){}startResize(i,{horizontal:r,vertical:s}){i.preventDefault(),i.stopPropagation();const o=i.currentTarget;o.setPointerCapture(i.pointerId);const a=this.closest(".chart-grid")??this.closest(".table-grid")??this.parentElement;if(!a)return;const c=a.getBoundingClientRect(),l=getComputedStyle(a),u=r?l.gridTemplateColumns.split(" ").length:0,h=s?parseFloat(l.gridTemplateRows.split(" ")[0])||200:0,d=s&&parseFloat(l.rowGap)||0,f=this._resizableConfig;let p=f.colSpan??1,g=f.rowSpan??1;const m=r&&s?"data-resizing-corner":r?"data-resizing":"data-resizing-vertical";this.setAttribute(m,"");const b=C=>{if(r){const k=(C.clientX-c.left)/c.width,$=Math.round(k*u),D=this.getBoundingClientRect().left-c.left,w=Math.round(D/c.width*u);p=Math.max(1,Math.min(u-w,$-w)),this.style.gridColumn=`span ${p}`,this._onLiveColSpan(p)}if(s){const S=this.getBoundingClientRect().top-c.top,$=C.clientY-c.top-S;g=Math.max(1,Math.round(($+d)/(h+d))),this.style.gridRow=`span ${g}`}},_=()=>{this.removeAttribute(m),this._onLiveColSpan(void 0),o.removeEventListener("pointermove",b),o.removeEventListener("pointerup",_),this._onResized({...r&&{colSpan:Math.max(1,Math.min(this.maxColumns,p))},...s&&{rowSpan:Math.max(1,Math.min(this.maxRows,g))}})};o.addEventListener("pointermove",b),o.addEventListener("pointerup",_)}}return t}var Pj=Object.defineProperty,Rj=Object.getOwnPropertyDescriptor,IS=e=>{throw TypeError(e)},Tc=(e,t,n,i)=>{for(var r=i>1?void 0:i?Rj(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Pj(t,n,r),r},PS=(e,t,n)=>t.has(e)||IS("Cannot "+n),$w=(e,t,n)=>(PS(e,t,"read from private field"),n?n.call(e):t.get(e)),Aj=(e,t,n)=>t.has(e)?IS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ks=(e,t,n)=>(PS(e,t,"access private method"),n),hi,RS,AS,zm,LS,NS,jm,FS,zS;const Tw=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ow(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,n,i]=e.split("-");return`${Tw[Number(n)-1]} ${Number(i)}, ${t}`}if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-");return`${Tw[Number(n)-1]} ${t}`}return e}function Lj(e){const t={};for(const n of e)switch(n.field){case"tag":n.operator==="is"&&(t.tagId=n.value),n.operator==="isNot"&&(t.excludedTagId=n.value);break;case"merchant":n.operator==="is"&&(t.merchantId=n.value),n.operator==="isNot"&&(t.excludedMerchantId=n.value);break;case"amount":t.amountFilter={operator:n.operator,value:Number(n.value)};break;case"description":t.descriptionFilter=n.value,t.descriptionFilterMode=n.operator==="contains"?"include":"exclude";break}return t}let zs=class extends OS(mt){constructor(){super(...arguments),Aj(this,hi),this.transactions=[],this.tags=[],this.merchants=[]}get _resizableConfig(){return this.config}_onResized(e){this.dispatchEvent(new CustomEvent("chart-resized",{detail:{id:this.config.id,...e}}))}_onLiveColSpan(e){this._liveColSpan=e}render(){return E`
      ${TS(this)}
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${ks(this,hi,FS)}>${ye(op)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${ks(this,hi,zS)}>${ye(Dc)}</button>
        </div>
      </div>
      <chart-wrapper
        .chartType=${this.config.chartType}
        .data=${$w(this,hi,RS)}
        .options=${$w(this,hi,AS)}
      ></chart-wrapper>
    `}};hi=new WeakSet;RS=function(){const e=this.config.filters?Lj(this.config.filters):{tagId:this.config.tagId,merchantId:this.config.merchantId,amountFilter:this.config.direction==="debit"?{operator:"lt",value:0}:this.config.direction==="credit"?{operator:"gt",value:0}:void 0,descriptionFilter:this.config.descriptionFilter,descriptionFilterMode:this.config.descriptionFilterMode},t=$j(this.transactions,e),{granularity:n}=this.config,i=n==="byTag"?Mw(Fm(t,f=>f.tagIds),ks(this,hi,zm).call(this,this.tags,this.config.excludedTagIds)):n==="byMerchant"?Mw(Fm(t,f=>f.merchantId?[f.merchantId]:[]),ks(this,hi,zm).call(this,this.merchants,this.config.excludedMerchantIds)):Dw(t,n),r=n==="byTag"||n==="byMerchant",s=this.config.chartType==="pie"||this.config.chartType==="doughnut";let o=[...i.entries()].sort(([f],[p])=>f.localeCompare(p));if(s&&(o=ks(this,hi,LS).call(this,o),o.sort(([,f],[,p])=>Math.abs(p)-Math.abs(f))),!r&&this.config.chartType==="bar"){const p=[...Dw(t,n).entries()].sort(([g],[m])=>g.localeCompare(m));return Ij({allEntries:p,displayEntries:o,label:this.config.title,formatLabel:Ow})}const a=this.config.chartType==="bar",c=o.map(([,f])=>f),l=s||a?c.map(Math.abs):c,u=s?ks(this,hi,NS).call(this,o):a?c.map(f=>f<0?Ke("--budgee-negative",.5):Ke("--budgee-positive",.5)):Ke("--budgee-primary",.5),h=s?Ke("--budgee-surface"):a?c.map(f=>f<0?Ke("--budgee-negative"):Ke("--budgee-positive")):Ke("--budgee-primary"),d=a?c.map(f=>f<0?Ke("--budgee-negative",.75):Ke("--budgee-positive",.75)):void 0;return{labels:o.map(([f])=>Ow(f)),datasets:[{label:this.config.title,data:l,backgroundColor:u,hoverBackgroundColor:d,borderColor:h,borderWidth:1,maxBarThickness:50}]}};AS=function(){const e=this.config.chartType==="pie"||this.config.chartType==="doughnut",t=this.config.legendPosition??"top",n=t==="hidden"?{display:!1}:{position:t},i=this._liveColSpan??this.config.colSpan??1,r=Math.max(2,Math.round(i/this.maxColumns*12));return{...e&&{interaction:{mode:"nearest",intersect:!0}},...!e&&{scales:{x:{ticks:{autoSkip:!0,maxTicksLimit:r}}}},plugins:{legend:n}}};zm=function(e,t){if(!t?.length)return e;const n=new Set(t);return e.filter(i=>!n.has(i.id))};LS=function(e){const t=e.reduce((s,[,o])=>s+Math.abs(o),0);if(t===0)return e;const n=t*.01,i=[];let r=0;for(const[s,o]of e)Math.abs(o)<n?r+=o:i.push([s,o]);return r!==0&&i.push(["other",r]),i};NS=function(e){if(this.config.granularity==="byTag"){const t=new Map(this.tags.map(n=>[n.name,n]));return e.map(([n])=>t.get(n)?.color??ks(this,hi,jm).call(this,n))}return e.map(([t])=>ks(this,hi,jm).call(this,t))};jm=function(e){let t=0;for(let i=0;i<e.length;i++)t=t*31+e.charCodeAt(i)|0;return`lch(55% 50 ${(t%360+360)%360})`};FS=function(){this.dispatchEvent(new CustomEvent("chart-edit",{detail:{chart:this.config}}))};zS=function(){this.dispatchEvent(new CustomEvent("chart-deleted",{detail:{id:this.config.id}}))};zs.styles=[$c,$S,dt`
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
    `];Tc([H({type:Object})],zs.prototype,"config",2);Tc([H({type:Array})],zs.prototype,"transactions",2);Tc([H({type:Array})],zs.prototype,"tags",2);Tc([H({type:Array})],zs.prototype,"merchants",2);Tc([P()],zs.prototype,"_liveColSpan",2);zs=Tc([Et("dashboard-chart-card")],zs);function Nj(e){if(!Fj())return e;const t=e.match(/lch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(t)return`lch(${100-Number(t[1])}% ${t[3]} ${t[4]})`;const{r:n,g:i,b:r}=zj(e),s=.2126*vg(n)+.7152*vg(i)+.0722*vg(r),o=s>.008856?116*Math.cbrt(s)-16:903.3*s,a=100-o,c=o>0?a/o:2,l=u=>Math.min(255,Math.max(0,Math.round(u*c+(c>1?30:0))));return`rgb(${l(n)}, ${l(i)}, ${l(r)})`}function Fj(){const e=document.documentElement.dataset.theme;return e==="dark"?!0:e==="light"?!1:window.matchMedia("(prefers-color-scheme: dark)").matches}function zj(e){const t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function vg(e){const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4}function jS(e){if(e.startsWith("#"))return jj(e);const t=Bj(e);if(t)return t;const n=e.match(/hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\s*\)/);return n?Wj(Number(n[1]),Number(n[2]),Number(n[3])):{r:0,g:0,b:0}}function jj(e){const t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function Bj(e){const t=e.match(/lch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(!t)return null;const n=Number(t[1]),i=Number(t[2]),s=Number(t[3])*Math.PI/180,o=i*Math.cos(s),a=i*Math.sin(s),c=(n+16)/116,l=o/500+c,u=c-a/200,h=.008856,d=903.3,f=l**3>h?l**3:(116*l-16)/d,p=n>d*h?((n+16)/116)**3:n/d,g=u**3>h?u**3:(116*u-16)/d,m=f*.95047,b=p*1,_=g*1.08883,C=3.2404542*m-1.5371385*b-.4985314*_,S=-.969266*m+1.8760108*b+.041556*_,k=.0556434*m-.2040259*b+1.0572252*_,$=D=>{const w=Math.max(0,Math.min(1,D));return w<=.0031308?12.92*w:1.055*w**(1/2.4)-.055};return{r:Math.round($(C)*255),g:Math.round($(S)*255),b:Math.round($(k)*255)}}function Wj(e,t,n){const i=t/100,r=n/100,s=(1-Math.abs(2*r-1))*i,o=s*(1-Math.abs(e/60%2-1)),a=r-s/2;let c=0,l=0,u=0;return e<60?(c=s,l=o):e<120?(c=o,l=s):e<180?(l=s,u=o):e<240?(l=o,u=s):e<300?(c=o,u=s):(c=s,u=o),{r:Math.round((c+a)*255),g:Math.round((l+a)*255),b:Math.round((u+a)*255)}}function BS(e){return Hj(e)>70?"black":"white"}function Hj(e){const t=e.match(/lch\(\s*([\d.]+)\s/);if(t)return Number(t[1]);const{r:n,g:i,b:r}=jS(e),[s,o,a]=[n,i,r].map(l=>{const u=l/255;return u<=.03928?u/12.92:((u+.055)/1.055)**2.4}),c=.2126*s+.7152*o+.0722*a;return c>.008856?116*Math.cbrt(c)-16:903.3*c}const Uj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Yj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Vj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,qj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Kj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Gj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Xj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Qj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Zj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Jj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,t8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,e8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,n8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,i8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,r8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,s8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,o8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,a8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,c8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,l8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,u8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,h8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,d8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,f8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,p8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,g8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,m8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,v8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,y8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,b8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,_8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,w8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,x8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,C8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,k8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,S8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,E8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,M8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,D8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,$8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,T8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,O8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,I8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,P8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,R8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,A8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,L8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,N8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,F8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,z8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,j8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,B8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,W8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,H8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,U8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Y8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,V8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,q8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,K8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,G8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,X8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
</svg>`,Q8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Z8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,J8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,t7=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,e7=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,n7=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,i7=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,r7=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var s7=Object.defineProperty,o7=Object.getOwnPropertyDescriptor,WS=e=>{throw TypeError(e)},ap=(e,t,n,i)=>{for(var r=i>1?void 0:i?o7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&s7(t,n,r),r},HS=(e,t,n)=>t.has(e)||WS("Cannot "+n),Kc=(e,t,n)=>(HS(e,t,"read from private field"),n?n.call(e):t.get(e)),yg=(e,t,n)=>t.has(e)?WS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),bl=(e,t,n)=>(HS(e,t,"access private method"),n),ed,nd,hs,US,$0,YS,VS,qS;const cp={apple:Uj,banknote:P2,beaker:Yj,beer:Vj,bell:qj,bike:Kj,"book-open":Gj,briefcase:Qj,bug:Zj,cake:Jj,calculator:t8,calendar:e8,camera:n8,car:i8,carrot:r8,"chef-hat":s8,"circle-dollar-sign":o8,"circle-plus":a8,clock:l8,cloud:u8,coffee:h8,"credit-card":d8,box:Xj,"cup-soda":f8,dumbbell:p8,flask:g8,gamepad:m8,gift:v8,globe:y8,"graduation-cap":b8,hamburger:_8,heart:w8,home:x8,joystick:C8,key:k8,lightbulb:S8,mail:E8,"map-pin":M8,milk:D8,monitor:$8,music:T8,newspaper:O8,paintbrush:I8,"paw-print":P8,phone:R8,pizza:A8,plane:L8,puzzle:N8,question:c8,receipt:F8,scale:z8,scissors:j8,"shield-check":B8,shirt:W8,"shopping-bag":H8,"shopping-cart":U8,sparkles:Y8,star:V8,store:R2,sun:q8,ticket:K8,trophy:G8,truck:X8,tv:Q8,user:Z8,users:J8,utensils:t7,wallet:e7,wifi:n7,wine:i7,wrench:op,zap:r7},Iw=Object.entries(cp);let fc=class extends mt{constructor(){super(...arguments),yg(this,hs),this.value="",this._open=!1,this._search="",yg(this,ed,e=>{if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._search="")}),yg(this,nd,()=>{this._open&&bl(this,hs,$0).call(this)})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",Kc(this,ed),!0),window.addEventListener("scroll",Kc(this,nd),!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",Kc(this,ed),!0),window.removeEventListener("scroll",Kc(this,nd),!0)}render(){const e=this.value?cp[this.value]:null;return E`
      <button
        class="trigger ${e?"":"placeholder"}"
        @click=${bl(this,hs,US)}
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
                ${Kc(this,hs,qS).map(([t,n])=>E`
                    <button
                      class="icon-option ${this.value===t?"selected":""}"
                      title=${t}
                      @click=${()=>bl(this,hs,YS).call(this,t)}
                    >
                      ${ye(n)}
                    </button>
                  `)}
              </div>
              ${this.value?E`<button class="clear-btn" @click=${bl(this,hs,VS)}>Clear icon</button>`:nt}
            </div>
          `:nt}
    `}};ed=new WeakMap;nd=new WeakMap;hs=new WeakSet;US=function(){this._open=!this._open,this._search="",this._open&&this.updateComplete.then(()=>bl(this,hs,$0).call(this))};$0=function(){const e=this.shadowRoot?.querySelector(".trigger"),t=this.shadowRoot?.querySelector(".popup");if(!e||!t)return;const n=e.getBoundingClientRect(),i=t.offsetHeight,r=window.innerHeight-n.bottom;r<i+4&&n.top>r?t.style.top=`${n.top-i-4}px`:t.style.top=`${n.bottom+4}px`,t.style.left=`${n.left}px`};YS=function(e){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:e}})),this._open=!1,this._search=""};VS=function(){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:""}})),this._open=!1,this._search=""};qS=function(){if(!this._search)return Iw;const e=this._search.toLowerCase();return Iw.filter(([t])=>t.includes(e))};fc.styles=dt`
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
  `;ap([H({type:String})],fc.prototype,"value",2);ap([P()],fc.prototype,"_open",2);ap([P()],fc.prototype,"_search",2);fc=ap([Et("icon-picker")],fc);var a7=Object.defineProperty,c7=Object.getOwnPropertyDescriptor,KS=e=>{throw TypeError(e)},T0=(e,t,n,i)=>{for(var r=i>1?void 0:i?c7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&a7(t,n,r),r},l7=(e,t,n)=>t.has(e)||KS("Cannot "+n),u7=(e,t,n)=>t.has(e)?KS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),h7=(e,t,n)=>(l7(e,t,"access private method"),n),Bm,GS;let Du=class extends mt{constructor(){super(...arguments),u7(this,Bm),this.tags=[],this.tagIds=[]}render(){return E`${this.tagIds.map(e=>{const t=this.tags.find(s=>s.id===e),n=t?.color?Nj(t.color):null,i=n??"var(--budgee-primary)",r=n?BS(n):"white";return E`<span class="tag-pill" style="background:${i};color:${r}">${h7(this,Bm,GS).call(this,e)}</span>`})}`}};Bm=new WeakSet;GS=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?cp[t.icon]:null;return n?E`<span class="pill-icon">${ye(n)}</span> ${t.name}`:t.name};Du.styles=dt`
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
  `;T0([H({type:Array})],Du.prototype,"tags",2);T0([H({type:Array})],Du.prototype,"tagIds",2);Du=T0([Et("tag-pills")],Du);var d7=Object.defineProperty,f7=Object.getOwnPropertyDescriptor,XS=e=>{throw TypeError(e)},Ks=(e,t,n,i)=>{for(var r=i>1?void 0:i?f7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&d7(t,n,r),r},p7=(e,t,n)=>t.has(e)||XS("Cannot "+n),g7=(e,t,n)=>t.has(e)?XS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),le=(e,t,n)=>(p7(e,t,"access private method"),n),Qt,QS,ZS,lp,JS,tE,up,hp,eE,nE,iE,rE,sE,oE,aE,cE,lE;let lr=class extends OS(mt){constructor(){super(...arguments),g7(this,Qt),this.transactions=[],this.tags=[],this.merchants=[],this.accounts=[],this._page=1,this._pageSize=10}get _resizableConfig(){return this.config}_onResized(e){this.dispatchEvent(new CustomEvent("table-resized",{detail:{id:this.config.id,...e}}))}render(){return E`
      ${TS(this)}
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${le(this,Qt,QS)}>${ye(op)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${le(this,Qt,ZS)}>${ye(Dc)}</button>
        </div>
      </div>
      ${le(this,Qt,lE).call(this)}
    `}};Qt=new WeakSet;QS=function(){this.dispatchEvent(new CustomEvent("table-edit",{detail:{table:this.config}}))};ZS=function(){this.dispatchEvent(new CustomEvent("table-deleted",{detail:{id:this.config.id}}))};lp=function(e){this._page=e.detail.page,this._pageSize=e.detail.pageSize};JS=function(e){return e?this.merchants.find(t=>t.id===e)?.name??"":""};tE=function(e){return e?this.accounts.find(t=>t.id===e)?.name??"":""};up=function(e){return{date:"Date",amount:"Amount",description:"Description",merchant:"Merchant",tags:"Tags",account:"Account",name:"Name",transactionCount:"Transactions",totalAmount:"Total Amount"}[e]};hp=function(e){return e==="amount"||e==="totalAmount"};eE=function(){const e=[...this.transactions].sort((r,s)=>s.date.localeCompare(r.date)),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,lp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,hp).call(this,r)?"col-amount":""}>${le(this,Qt,up).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,nE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};nE=function(e,t){switch(t){case"date":return E`<td>${e.date}</td>`;case"amount":return E`<td class="col-amount ${e.amount<0?"amount-negative":"amount-positive"}">${e.amount.toFixed(2)}</td>`;case"description":return E`<td>${e.description}</td>`;case"merchant":return E`<td>${le(this,Qt,JS).call(this,e.merchantId)}</td>`;case"tags":return E`<td><tag-pills .tags=${this.tags} .tagIds=${e.tagIds}></tag-pills></td>`;case"account":return E`<td>${le(this,Qt,tE).call(this,e.accountId)}</td>`;default:return E`
          <td></td>
        `}};iE=function(){const e=Rf(this.transactions,t=>[t.merchantId]);return this.merchants.map(t=>{const n=e.get(t.id);return{merchant:t,transactionCount:n?.count??0,totalAmount:n?.total??0}})};rE=function(){const e=le(this,Qt,iE).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,lp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,hp).call(this,r)?"col-amount":""}>${le(this,Qt,up).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,sE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};sE=function(e,t){switch(t){case"name":return E`<td>${e.merchant.name}</td>`;case"transactionCount":return E`<td>${e.transactionCount}</td>`;case"totalAmount":return E`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return E`
          <td></td>
        `}};oE=function(){const e=Rf(this.transactions,t=>t.tagIds);return this.tags.map(t=>{const n=e.get(t.id);return{tag:t,transactionCount:n?.count??0,totalAmount:n?.total??0}})};aE=function(){const e=le(this,Qt,oE).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,lp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,hp).call(this,r)?"col-amount":""}>${le(this,Qt,up).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,cE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};cE=function(e,t){switch(t){case"name":return E`<td>${e.tag.name}</td>`;case"transactionCount":return E`<td>${e.transactionCount}</td>`;case"totalAmount":return E`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return E`
          <td></td>
        `}};lE=function(){switch(this.config.model){case"transactions":return le(this,Qt,eE).call(this);case"merchants":return le(this,Qt,rE).call(this);case"tags":return le(this,Qt,aE).call(this);default:return nt}};lr.styles=[Jr,$c,$S,dt`
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
    `];Ks([H({type:Object})],lr.prototype,"config",2);Ks([H({type:Array})],lr.prototype,"transactions",2);Ks([H({type:Array})],lr.prototype,"tags",2);Ks([H({type:Array})],lr.prototype,"merchants",2);Ks([H({type:Array})],lr.prototype,"accounts",2);Ks([P()],lr.prototype,"_page",2);Ks([P()],lr.prototype,"_pageSize",2);lr=Ks([Et("dashboard-table-card")],lr);var m7=Object.defineProperty,v7=Object.getOwnPropertyDescriptor,uE=e=>{throw TypeError(e)},Gs=(e,t,n,i)=>{for(var r=i>1?void 0:i?v7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&m7(t,n,r),r},y7=(e,t,n)=>t.has(e)||uE("Cannot "+n),b7=(e,t,n)=>t.has(e)?uE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),bg=(e,t,n)=>(y7(e,t,"access private method"),n),_l,hE,dE,fE;const O0={transactions:[{id:"date",label:"Date"},{id:"amount",label:"Amount"},{id:"description",label:"Description"},{id:"merchant",label:"Merchant"},{id:"tags",label:"Tags"},{id:"account",label:"Account"}],merchants:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}],tags:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}]};function pE(e){return O0[e].map(t=>t.id)}let ur=class extends mt{constructor(){super(...arguments),b7(this,_l),this._title="",this._model="transactions",this._columns=pE("transactions"),this._colSpan=1,this._rowSpan=1,this._initialized=!1}updated(e){e.has("editingTable")&&this.editingTable&&!this._initialized&&(this._title=this.editingTable.title,this._model=this.editingTable.model,this._columns=[...this.editingTable.columns],this._colSpan=this.editingTable.colSpan??1,this._rowSpan=this.editingTable.rowSpan??1,this._initialized=!0)}render(){const e=O0[this._model];return E`
      <h4>${this.editingTable?"Edit Table":"Add Table"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${t=>{this._title=t.target.value}}
        />
        <label>Model:</label>
        <select @change=${t=>{bg(this,_l,hE).call(this,t.target.value)}}>
          <option value="transactions" ?selected=${this._model==="transactions"}>Transactions</option>
          <option value="merchants" ?selected=${this._model==="merchants"}>Merchants</option>
          <option value="tags" ?selected=${this._model==="tags"}>Tags</option>
        </select>
        <label>Width:</label>
        <select @change=${t=>{this._colSpan=Number(t.target.value)}}>
          <option value="1" ?selected=${this._colSpan===1}>1 col</option>
          <option value="2" ?selected=${this._colSpan===2}>2 col</option>
          <option value="3" ?selected=${this._colSpan===3}>3 col</option>
          <option value="4" ?selected=${this._colSpan===4}>4 col</option>
          <option value="5" ?selected=${this._colSpan===5}>5 col</option>
          <option value="6" ?selected=${this._colSpan===6}>6 col</option>
        </select>
        <label>Height:</label>
        <select @change=${t=>{this._rowSpan=Number(t.target.value)}}>
          <option value="1" ?selected=${this._rowSpan===1}>1 row</option>
          <option value="2" ?selected=${this._rowSpan===2}>2 rows</option>
          <option value="3" ?selected=${this._rowSpan===3}>3 rows</option>
          <option value="4" ?selected=${this._rowSpan===4}>4 rows</option>
        </select>
      </div>
      <label>Columns:</label>
      <div class="checkbox-list">
        ${e.map(t=>E`
          <label>
            <input
              type="checkbox"
              ?checked=${this._columns.includes(t.id)}
              @change=${n=>bg(this,_l,dE).call(this,t.id,n.target.checked)}
            />
            ${t.label}
          </label>
        `)}
      </div>
      <button @click=${bg(this,_l,fE)}>${this.editingTable?"Update Table":"Save to Dashboard"}</button>
    `}};_l=new WeakSet;hE=function(e){this._model=e,this._columns=pE(e)};dE=function(e,t){if(t){const n=O0[this._model].map(i=>i.id);this._columns=n.filter(i=>this._columns.includes(i)||i===e)}else this._columns=this._columns.filter(n=>n!==e)};fE=function(){const e=this._title.trim();!e||this._columns.length===0||(this.dispatchEvent(new CustomEvent("table-saved",{detail:{id:this.editingTable?.id,title:e,model:this._model,columns:this._columns,colSpan:this._colSpan,rowSpan:this._rowSpan}})),this._title="",this._initialized=!1)};ur.styles=[Li,pr,dt`
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
    `];Gs([H({type:Object})],ur.prototype,"editingTable",2);Gs([P()],ur.prototype,"_title",2);Gs([P()],ur.prototype,"_model",2);Gs([P()],ur.prototype,"_columns",2);Gs([P()],ur.prototype,"_colSpan",2);Gs([P()],ur.prototype,"_rowSpan",2);Gs([P()],ur.prototype,"_initialized",2);ur=Gs([Et("table-configurator")],ur);var _7=Object.defineProperty,w7=Object.getOwnPropertyDescriptor,gE=e=>{throw TypeError(e)},Hn=(e,t,n,i)=>{for(var r=i>1?void 0:i?w7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&_7(t,n,r),r},I0=(e,t,n)=>t.has(e)||gE("Cannot "+n),Pw=(e,t,n)=>(I0(e,t,"read from private field"),n?n.call(e):t.get(e)),Rw=(e,t,n)=>t.has(e)?gE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Aw=(e,t,n,i)=>(I0(e,t,"write to private field"),t.set(e,n),n),de=(e,t,n)=>(I0(e,t,"access private method"),n),wl,Kt,hr,Wm,mE,vE,yE,bE,_E,wE,xE,CE,kE,SE,EE;let nn=class extends mt{constructor(){super(...arguments),Rw(this,Kt),this._transactions=null,this._tags=[],this._merchants=[],this._accounts=[],this._charts=[],this._tables=[],this._timeRange=null,this.columns=12,this.rows=12,this._showChartConfigurator=!1,this._showTableConfigurator=!1,Rw(this,wl,[])}willUpdate(){this.style.setProperty("--grid-columns",String(this.columns)),this.style.setProperty("--grid-row-height",`${800/this.rows}px`)}connectedCallback(){super.connectedCallback(),de(this,Kt,hr).call(this);const e=Zo(()=>de(this,Kt,hr).call(this),300);Promise.all([_e.subscribe(e),pe.subscribe(e),Ie.subscribe(e),ke.subscribe(e),vi.subscribe(e),cr.subscribe(e)]).then(t=>{Aw(this,wl,t)})}disconnectedCallback(){super.disconnectedCallback(),this._chartSortable?.destroy(),this._tableSortable?.destroy();for(const e of Pw(this,wl))e.unsubscribe();Aw(this,wl,[])}updated(){de(this,Kt,Wm).call(this,".chart-grid","chart",e=>{this._chartSortable=e}),de(this,Kt,Wm).call(this,".table-grid","table",e=>{this._tableSortable=e})}render(){return this._transactions===null?E`
        <h3>Dashboard</h3>
        <p>Loading…</p>
      `:this._transactions.length===0?E`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `:E`
      <div class="dashboard-header">
        <h3>Dashboard</h3>
        <time-range-picker .value=${this._timeRange} @time-range-change=${de(this,Kt,bE)}></time-range-picker>
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
                  .transactions=${Pw(this,Kt,yE)}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  @chart-edit=${de(this,Kt,_E)}
                  @chart-resized=${de(this,Kt,wE)}
                  @chart-deleted=${de(this,Kt,xE)}
                ></dashboard-chart-card>
              `)}
            </div>
          `:nt}

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
                  @table-edit=${de(this,Kt,kE)}
                  @table-resized=${de(this,Kt,SE)}
                  @table-deleted=${de(this,Kt,EE)}
                ></dashboard-table-card>
              `)}
            </div>
          `:nt}

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
                @chart-saved=${de(this,Kt,vE)}
              ></chart-configurator>
            </budgee-modal>
          `:nt}

      ${this._showTableConfigurator?E`
            <budgee-modal
              heading=${this._editingTable?"Edit Table":"Add Table"}
              @modal-close=${()=>{this._showTableConfigurator=!1,this._editingTable=void 0}}
            >
              <table-configurator
                .editingTable=${this._editingTable}
                @table-saved=${de(this,Kt,CE)}
              ></table-configurator>
            </budgee-modal>
          `:nt}
    `}};wl=new WeakMap;Kt=new WeakSet;hr=async function(){this._transactions=await _e.all(),this._tags=await pe.all(),this._merchants=await Ie.all(),this._accounts=await ke.all(),this._charts=await vi.all(),this._tables=await cr.all(),this._charts.length===0&&(await vi.create({title:"Monthly Overview",chartType:"bar",granularity:"month",colSpan:this.columns,position:0}),this._charts=await vi.all())};Wm=function(e,t,n){const i=t==="chart"?this._chartSortable:this._tableSortable,r=this.shadowRoot?.querySelector(e);if(!r){i?.destroy(),n(void 0);return}i?.el!==r&&(i?.destroy(),n(et.create(r,{animation:150,onEnd:()=>de(this,Kt,mE).call(this,t)})))};mE=async function(e){const t=e==="chart"?".chart-grid":".table-grid",n=e==="chart"?"data-chart-id":"data-table-id",i=this.shadowRoot?.querySelector(t);if(!i)return;const r=i.querySelectorAll(`[${n}]`),s=[];r.forEach(o=>{const a=o.getAttribute(n);a&&s.push(a)}),e==="chart"?await vi.reorder(s):await cr.reorder(s),await de(this,Kt,hr).call(this)};vE=async function(e){const t=e.detail;t.id?await vi.update(t.id,{title:t.title,chartType:t.chartType,granularity:t.granularity,excludedTagIds:t.excludedTagIds,excludedMerchantIds:t.excludedMerchantIds,legendPosition:t.legendPosition,filters:t.filters}):await vi.create({...t,colSpan:this.columns,position:this._charts.length}),this._showChartConfigurator=!1,this._editingChart=void 0,await de(this,Kt,hr).call(this)};yE=function(){if(this._transactions===null)return null;if(this._timeRange===null)return this._transactions;const e=za.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(t=>t.date>=e)};bE=function(e){this._timeRange=e.timeRange};_E=function(e){this._editingChart=e.detail.chart,this._showChartConfigurator=!0};wE=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await vi.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await de(this,Kt,hr).call(this)};xE=async function(e){await vi.remove(e.detail.id),await de(this,Kt,hr).call(this)};CE=async function(e){const t=e.detail;t.id?await cr.update(t.id,{title:t.title,model:t.model,columns:t.columns,colSpan:t.colSpan,rowSpan:t.rowSpan}):await cr.create({...t,position:this._tables.length}),this._showTableConfigurator=!1,this._editingTable=void 0,await de(this,Kt,hr).call(this)};kE=function(e){this._editingTable=e.detail.table,this._showTableConfigurator=!0};SE=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await cr.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await de(this,Kt,hr).call(this)};EE=async function(e){await cr.remove(e.detail.id),await de(this,Kt,hr).call(this)};nn.styles=[Li,Jr,dt`
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
    `];Hn([P()],nn.prototype,"_transactions",2);Hn([P()],nn.prototype,"_tags",2);Hn([P()],nn.prototype,"_merchants",2);Hn([P()],nn.prototype,"_accounts",2);Hn([P()],nn.prototype,"_charts",2);Hn([P()],nn.prototype,"_tables",2);Hn([P()],nn.prototype,"_timeRange",2);Hn([H({type:Number})],nn.prototype,"columns",2);Hn([H({type:Number})],nn.prototype,"rows",2);Hn([P()],nn.prototype,"_showChartConfigurator",2);Hn([P()],nn.prototype,"_editingChart",2);Hn([P()],nn.prototype,"_showTableConfigurator",2);Hn([P()],nn.prototype,"_editingTable",2);nn=Hn([Et("budgee-dashboard")],nn);var x7=Object.defineProperty,C7=Object.getOwnPropertyDescriptor,ME=e=>{throw TypeError(e)},sa=(e,t,n,i)=>{for(var r=i>1?void 0:i?C7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&x7(t,n,r),r},P0=(e,t,n)=>t.has(e)||ME("Cannot "+n),k7=(e,t,n)=>(P0(e,t,"read from private field"),n?n.call(e):t.get(e)),Lw=(e,t,n)=>t.has(e)?ME("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Nw=(e,t,n,i)=>(P0(e,t,"write to private field"),t.set(e,n),n),$n=(e,t,n)=>(P0(e,t,"access private method"),n),xl,Ve,Hm,DE,$E,TE,OE,id,rd,IE,PE;let Kr=class extends mt{constructor(){super(...arguments),Lw(this,Ve),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",Lw(this,xl,[])}connectedCallback(){super.connectedCallback(),$n(this,Ve,Hm).call(this);const e=Zo(()=>$n(this,Ve,Hm).call(this),300);Promise.all([Ie.subscribe(e),_e.subscribe(e)]).then(t=>{Nw(this,xl,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of k7(this,xl))e.unsubscribe();Nw(this,xl,[])}render(){if(this._rows===null)return E`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;if(this._rows.length===0)return E`
        <budgee-empty-state
          heading="No merchants yet"
          description="Merchants are created automatically when you assign them to transactions or rules."
        ></budgee-empty-state>
      `;const e=this._rows.filter(r=>$n(this,Ve,OE).call(this,r)),t=$n(this,Ve,IE).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="merchants"
        ?filterable=${!0}
        @page-change=${$n(this,Ve,$E)}
        @filter-change=${$n(this,Ve,TE)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>$n(this,Ve,id).call(this,"name")}>
                Name${$n(this,Ve,rd).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>$n(this,Ve,id).call(this,"count")}>
                Transactions${$n(this,Ve,rd).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>$n(this,Ve,id).call(this,"spend")}>
                Total Spend${$n(this,Ve,rd).call(this,"spend")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>E`
              <tr @click=${()=>$n(this,Ve,PE).call(this,r.merchant.id)}>
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
    `}};xl=new WeakMap;Ve=new WeakSet;Hm=async function(){const e=await Ie.all();this._rows=e.map(t=>({merchant:t,transactionCount:null,totalSpend:null})),$n(this,Ve,DE).call(this)};DE=async function(){const e=await _e.all(),t=Rf(e,n=>[n.merchantId]);this._rows=this._rows.map(n=>{const i=t.get(n.merchant.id);return{...n,transactionCount:i?.count??0,totalSpend:i?.total??0}})};$E=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};TE=function(e){this._filter=e.detail.filter,this._currentPage=1};OE=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.merchant.name.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.totalSpend!=null&&e.totalSpend.toFixed(2).includes(t))};id=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};rd=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};IE=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.merchant.name.localeCompare(r.merchant.name):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="spend"&&(s=(i.totalSpend??0)-(r.totalSpend??0)),s*n})};PE=function(e){wc(`/merchants/${e}`)};Kr.styles=[Jr,dt`
      tbody tr {
        cursor: pointer;
      }
    `];sa([P()],Kr.prototype,"_rows",2);sa([P()],Kr.prototype,"_currentPage",2);sa([P()],Kr.prototype,"_pageSize",2);sa([P()],Kr.prototype,"_filter",2);sa([P()],Kr.prototype,"_sortCol",2);sa([P()],Kr.prototype,"_sortDir",2);Kr=sa([Et("merchant-list")],Kr);const S7=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;let Gc=null,Fw=!1;async function E7(){if(Gc)return Gc;const e=await Z();return Gc=(await e.merchantRules.all()).map(n=>new bn(n)),Fw||(Fw=!0,e.merchantRules.subscribe(()=>{Gc=null})),Gc}function dp(e,t={}){const n=e.accountId?t[e.accountId]:void 0;return{description:e.description.toLowerCase(),accountId:e.accountId,account:n?.name.toLowerCase()??e.accountId?.toLowerCase()}}function M7(e,t){if(e===void 0)return!1;switch(t.operator){case"contains":return e.includes(t.value);case"startsWith":return e.startsWith(t.value);case"equals":return e===t.value;case"regex":return t.regex.test(e)}}class bn{#t;constructor(t){Object.assign(this,t),this.#t=this.conditions.map(n=>({field:n.field,operator:n.operator,value:n.value.toLowerCase(),regex:n.operator==="regex"?new RegExp(n.value,"i"):void 0}))}matches(t){if(this.accountId&&this.accountId!==t.accountId)return!1;const n=i=>M7(t[i.field],i);return this.logic==="and"?this.#t.every(n):this.#t.some(n)}static async subscribe(t){return(await Z()).merchantRules.subscribe(t)}static async all(){return E7()}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.merchantRules.put(i),new bn(i)}static async put(t){const n=await Z();t.id?await n.merchantRules.put(t):await n.merchantRules.put({...t,id:ir()})}static async update(t,n){const i=await Z(),r=await i.merchantRules.get(t);await i.merchantRules.put({...r,...n})}static async remove(t){await(await Z()).merchantRules.remove(t)}static async applyToTransactions(t){const n=await Z(),i=await n.transactions.all(),r=ke.toLookup(await n.accounts.all()),s=new bn(t),o=[];for(const a of i)s.matches(dp(a,r))&&o.push({...a,merchantId:t.merchantId??a.merchantId,tagIds:[...new Set([...a.tagIds,...t.tagIds])]});return o.length>0&&await n.transactions.bulkDocs(o),o.length}}function Ci(e){document.dispatchEvent(new CustomEvent("budgee-toast",{detail:e}))}const D7=Object.freeze(Object.defineProperty({__proto__:null,showToast:Ci},Symbol.toStringTag,{value:"Module"})),fp=dt`
  :host([busy]) {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
`;function pp(e){class t extends e{constructor(){super(...arguments),this._busy=!1}async withBusy(i){this._busy=!0,this.toggleAttribute("busy",!0),this.requestUpdate();try{return await i()}finally{this._busy=!1,this.toggleAttribute("busy",!1),this.requestUpdate()}}get busy(){return this._busy}}return t}const $7=/^(SQ \*|TST\* |SP \*?|PAYPAL \*)/i,T7=/((St.\s+)?[^\s]+)?\s*,\s*\w{2}$/,O7=e=>e.replace($7,"").trim().replace(T7,"").trim().toLocaleLowerCase().split(" ").map(n=>n.charAt(0).toLocaleUpperCase()+n.slice(1)).join(" ");var I7=Object.defineProperty,P7=Object.getOwnPropertyDescriptor,RE=e=>{throw TypeError(e)},Oc=(e,t,n,i)=>{for(var r=i>1?void 0:i?P7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&I7(t,n,r),r},AE=(e,t,n)=>t.has(e)||RE("Cannot "+n),LE=(e,t,n)=>(AE(e,t,"read from private field"),n?n.call(e):t.get(e)),R7=(e,t,n)=>t.has(e)?RE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ca=(e,t,n)=>(AE(e,t,"access private method"),n),Hi,R0,NE,FE,zE,jE,A0;let js=class extends mt{constructor(){super(...arguments),R7(this,Hi),this.items=[],this.value="",this.placeholder="",this._highlightIndex=-1,this._open=!1}render(){const e=LE(this,Hi,R0),t=this.value.trim()&&e.some(i=>i.toLowerCase()===this.value.trim().toLowerCase()),n=this._open&&e.length>0&&!t;return E`
      <input
        type="text"
        .placeholder=${this.placeholder}
        .value=${this.value}
        @input=${Ca(this,Hi,NE)}
        @keydown=${Ca(this,Hi,FE)}
        @focus=${Ca(this,Hi,zE)}
        @blur=${Ca(this,Hi,jE)}
      />
      ${n?E`
          <div class="suggestions">
            ${e.map((i,r)=>E`
              <div
                class="suggestion ${r===this._highlightIndex?"highlighted":""}"
                @click=${()=>Ca(this,Hi,A0).call(this,i)}
              >
                ${i}
              </div>
            `)}
          </div>
        `:nt}
    `}};Hi=new WeakSet;R0=function(){const e=this.value.toLowerCase().trim();return e?this.items.filter(t=>t.toLowerCase().includes(e)):[]};NE=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t}})),this._highlightIndex=-1,this._open=t.trim().length>0};FE=function(e){const t=LE(this,Hi,R0);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,t.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"&&this._highlightIndex>=0&&this._highlightIndex<t.length?(e.preventDefault(),Ca(this,Hi,A0).call(this,t[this._highlightIndex])):e.key==="Escape"&&(this._open=!1)};zE=function(){this.value.trim().length>0&&(this._open=!0)};jE=function(){setTimeout(()=>{this._open=!1},150)};A0=function(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e}})),this._open=!1,this._highlightIndex=-1};js.styles=[pr,dt`
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
    `];Oc([H({type:Array})],js.prototype,"items",2);Oc([H({type:String})],js.prototype,"value",2);Oc([H({type:String})],js.prototype,"placeholder",2);Oc([P()],js.prototype,"_highlightIndex",2);Oc([P()],js.prototype,"_open",2);js=Oc([Et("autocomplete-input")],js);var A7=Object.defineProperty,L7=Object.getOwnPropertyDescriptor,BE=e=>{throw TypeError(e)},L0=(e,t,n,i)=>{for(var r=i>1?void 0:i?L7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&A7(t,n,r),r},WE=(e,t,n)=>t.has(e)||BE("Cannot "+n),zw=(e,t,n)=>(WE(e,t,"read from private field"),n?n.call(e):t.get(e)),N7=(e,t,n)=>t.has(e)?BE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),jw=(e,t,n)=>(WE(e,t,"access private method"),n),ka,HE,UE,YE,VE;let $u=class extends mt{constructor(){super(...arguments),N7(this,ka),this.merchants=[],this.value=""}render(){const e=zw(this,ka,UE),t=this.value.trim();return E`
      <div class="input-wrapper">
        <autocomplete-input
          .items=${zw(this,ka,HE)}
          .value=${this.value}
          placeholder="Merchant name (optional)"
          @value-changed=${jw(this,ka,YE)}
          @paste=${jw(this,ka,VE)}
        ></autocomplete-input>
        ${t?e?E`
                  <span class="status existing">existing</span>
                `:E`
                  <span class="status new">new</span>
                `:nt}
      </div>
    `}};ka=new WeakSet;HE=function(){return this.merchants.map(e=>e.name)};UE=function(){const e=this.value.trim().toLowerCase();return e.length>0&&this.merchants.some(t=>t.name.toLowerCase()===e)};YE=function(e){this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:e.detail.value}}))};VE=function(e){e.preventDefault();const n=(e.clipboardData?.getData("text")??"").toLowerCase().replace(/(?:^|\s)\S/g,r=>r.toUpperCase()),i=e.composedPath().find(r=>r instanceof HTMLInputElement);i&&(i.value=n),this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:n}}))};$u.styles=dt`
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
  `;L0([H({type:Array})],$u.prototype,"merchants",2);L0([H({type:String})],$u.prototype,"value",2);$u=L0([Et("merchant-autocomplete")],$u);var F7=Object.defineProperty,z7=Object.getOwnPropertyDescriptor,qE=e=>{throw TypeError(e)},oa=(e,t,n,i)=>{for(var r=i>1?void 0:i?z7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&F7(t,n,r),r},KE=(e,t,n)=>t.has(e)||qE("Cannot "+n),gs=(e,t,n)=>(KE(e,t,"read from private field"),n?n.call(e):t.get(e)),j7=(e,t,n)=>t.has(e)?qE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ne=(e,t,n)=>(KE(e,t,"access private method"),n),Ft,N0,bo,GE,F0,XE,QE,ZE,JE,tM,pf,gf,gp;let Gr=class extends mt{constructor(){super(...arguments),j7(this,Ft),this.tags=[],this.selectedTagIds=[],this.excludeIds=[],this._query="",this._highlightIndex=-1,this._open=!1}updated(e){e.has("_open")&&this._open&&this.updateComplete.then(()=>Ne(this,Ft,XE).call(this))}render(){const e=gs(this,Ft,N0);return E`
      <div class="input-wrapper" @click=${()=>this.shadowRoot?.querySelector("input")?.focus()}>
        ${this.selectedTagIds.map(t=>{const n=this.tags.find(s=>s.id===t),i=n?.color??"var(--budgee-primary)",r=n?.color?BS(n.color):"white";return E`
          <span class="tag-pill" style="background:${i};color:${r}" @click=${s=>{s.stopPropagation(),Ne(this,Ft,F0).call(this,t)}}>
            ${Ne(this,Ft,GE).call(this,t)} &times;
          </span>
        `})}
        <input
          type="text"
          placeholder=${this.selectedTagIds.length>0?"":"Add tag..."}
          .value=${this._query}
          @input=${Ne(this,Ft,QE)}
          @keydown=${Ne(this,Ft,ZE)}
          @focus=${Ne(this,Ft,JE)}
          @blur=${Ne(this,Ft,tM)}
        />
      </div>
      ${this._open&&(e.length>0||gs(this,Ft,bo))?E`
            <div class="suggestions">
              ${e.map((t,n)=>E`
                <div
                  class="suggestion ${n===this._highlightIndex?"highlighted":""}"
                  @click=${()=>Ne(this,Ft,pf).call(this,t)}
                >
                  ${t.name}
                </div>
              `)}
              ${gs(this,Ft,bo)?E`
                    <div
                      class="suggestion create ${e.length===this._highlightIndex?"highlighted":""}"
                      @click=${Ne(this,Ft,gf)}
                    >
                      Create "${this._query.trim()}"
                    </div>
                  `:nt}
            </div>
          `:nt}
    `}};Ft=new WeakSet;N0=function(){const e=this._query.toLowerCase();return this.tags.filter(t=>!this.selectedTagIds.includes(t.id)&&!this.excludeIds.includes(t.id)&&t.name.toLowerCase().includes(e)).sort((t,n)=>{const i=t.name.toLowerCase().startsWith(e)?0:1,r=n.name.toLowerCase().startsWith(e)?0:1;return i-r||t.name.localeCompare(n.name)})};bo=function(){const e=this._query.trim();return e?!this.tags.some(t=>t.name.toLowerCase()===e.toLowerCase()):!1};GE=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?cp[t.icon]:null;return n?E`<span class="pill-icon">${ye(n)}</span> ${t.name}`:t.name};F0=function(e){this.dispatchEvent(new CustomEvent("tag-removed",{detail:{tagId:e}}))};XE=function(){const e=this.shadowRoot?.querySelector("input"),t=this.shadowRoot?.querySelector(".suggestions");if(!e||!t)return;const n=e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.left}px`,t.style.width=`${n.width}px`};QE=function(e){this._query=e.target.value,this._highlightIndex=-1,this._open=this._query.length>0};ZE=function(e){const t=gs(this,Ft,N0),n=t.length+(gs(this,Ft,bo)?1:0);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,n-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"?(e.preventDefault(),this._highlightIndex>=0&&this._highlightIndex<t.length?Ne(this,Ft,pf).call(this,t[this._highlightIndex]):gs(this,Ft,bo)&&(this._highlightIndex===t.length||this._highlightIndex===-1)?Ne(this,Ft,gf).call(this):t.length===1&&!gs(this,Ft,bo)?Ne(this,Ft,pf).call(this,t[0]):gs(this,Ft,bo)&&Ne(this,Ft,gf).call(this)):e.key==="Backspace"&&this._query===""&&this.selectedTagIds.length>0?(e.preventDefault(),Ne(this,Ft,F0).call(this,this.selectedTagIds[this.selectedTagIds.length-1])):e.key==="Escape"&&Ne(this,Ft,gp).call(this)};JE=function(){this._query.length>0&&(this._open=!0)};tM=function(){setTimeout(()=>{this._open=!1},150)};pf=function(e){this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:e}})),Ne(this,Ft,gp).call(this)};gf=function(){const e=this._query.trim();e&&(this.dispatchEvent(new CustomEvent("tag-created",{detail:{name:e}})),Ne(this,Ft,gp).call(this))};gp=function(){this._query="",this._highlightIndex=-1,this._open=!1,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};Gr.styles=dt`
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
  `;oa([H({type:Array})],Gr.prototype,"tags",2);oa([H({type:Array})],Gr.prototype,"selectedTagIds",2);oa([H({type:Array})],Gr.prototype,"excludeIds",2);oa([P()],Gr.prototype,"_query",2);oa([P()],Gr.prototype,"_highlightIndex",2);oa([P()],Gr.prototype,"_open",2);Gr=oa([Et("tag-autocomplete")],Gr);var B7=Object.defineProperty,W7=Object.getOwnPropertyDescriptor,eM=e=>{throw TypeError(e)},mp=(e,t,n,i)=>{for(var r=i>1?void 0:i?W7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&B7(t,n,r),r},nM=(e,t,n)=>t.has(e)||eM("Cannot "+n),Bw=(e,t,n)=>(nM(e,t,"read from private field"),n?n.call(e):t.get(e)),H7=(e,t,n)=>t.has(e)?eM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Xc=(e,t,n)=>(nM(e,t,"access private method"),n),xr,iM,rM,sM,oM,aM,cM,lM;const U7=[{value:"description",label:"description"},{value:"account",label:"account"}],Y7=[{value:"contains",label:"contains"},{value:"startsWith",label:"starts with"},{value:"equals",label:"equals"},{value:"regex",label:"regex"}];let pc=class extends mt{constructor(){super(...arguments),H7(this,xr),this.condition={field:"description",operator:"equals",value:""},this.index=0,this.accounts=[]}render(){return E`
      <select @change=${Xc(this,xr,iM)}>
        ${U7.map(e=>E`
          <option value=${e.value} ?selected=${this.condition.field===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      <select @change=${Xc(this,xr,rM)}>
        ${Y7.map(e=>E`
          <option value=${e.value} ?selected=${this.condition.operator===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      ${Bw(this,xr,aM)?E`<autocomplete-input
            .items=${Bw(this,xr,cM)}
            .value=${this.condition.value}
            placeholder="account name"
            @value-changed=${Xc(this,xr,oM)}
          ></autocomplete-input>`:E`<input
            type="text"
            placeholder="value"
            .value=${this.condition.value}
            @input=${Xc(this,xr,sM)}
          />`}
      <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" @click=${Xc(this,xr,lM)}>${ye(Dc)}</button>
    `}};xr=new WeakSet;iM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,field:t}}}))};rM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,operator:t}}}))};sM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};oM=function(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};aM=function(){return this.condition.field==="account"&&this.condition.operator==="equals"};cM=function(){return this.accounts.map(e=>e.name)};lM=function(){this.dispatchEvent(new CustomEvent("condition-removed",{detail:{index:this.index}}))};pc.styles=[$c,pr,dt`
      :host {
        display: contents;
      }
      select,
      input {
        padding: 4px 8px;
      }
    `];mp([H({type:Object})],pc.prototype,"condition",2);mp([H({type:Number})],pc.prototype,"index",2);mp([H({type:Array})],pc.prototype,"accounts",2);pc=mp([Et("condition-row")],pc);var V7=Object.defineProperty,q7=Object.getOwnPropertyDescriptor,uM=e=>{throw TypeError(e)},kn=(e,t,n,i)=>{for(var r=i>1?void 0:i?q7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&V7(t,n,r),r},hM=(e,t,n)=>t.has(e)||uM("Cannot "+n),dM=(e,t,n)=>(hM(e,t,"read from private field"),n?n.call(e):t.get(e)),Ww=(e,t,n)=>t.has(e)?uM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Gt=(e,t,n)=>(hM(e,t,"access private method"),n),vp,Bt,fM,pM,gM,mM,vM,yM,bM,_M,Um,yp,z0,Ym,Vm,j0,wM,xM,CM;let Be=class extends mt{constructor(){super(...arguments),Ww(this,Bt),this.tags=[],this.merchants=[],this.rules=[],this.accounts=[],this.prefillDescription="",this.editingRule=null,this.editingMerchantName="",this._prefillPristine=!1,this._logic="or",this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._previewCount=null,Ww(this,vp,Zo(()=>Gt(this,Bt,fM).call(this),300))}updated(e){e.has("editingRule")&&this.editingRule?(this._conditions=[...this.editingRule.conditions],this._logic=this.editingRule.logic,this._selectedTagIds=[...this.editingRule.tagIds],this._merchantName=this.editingMerchantName,this._pendingTagNames=[]):e.has("prefillDescription")&&this.prefillDescription&&(this._conditions=[{field:"description",operator:"equals",value:this.prefillDescription}],this._logic="or",this._merchantName=O7(this.prefillDescription),this._prefillPristine=!0,this._pendingTagNames=[])}render(){const e=Gt(this,Bt,j0).call(this).length>0;return E`
      <div class="section-header">Conditions</div>
      <div class="form-grid">
        ${this._conditions.map((t,n)=>E`
          <condition-row
            .condition=${t}
            .index=${n}
            .accounts=${this.accounts}
            @condition-changed=${Gt(this,Bt,pM)}
            @condition-removed=${Gt(this,Bt,gM)}
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
      <button class="add-condition secondary" @click=${Gt(this,Bt,mM)}>+ Add Condition</button>
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
            <span class="tag-badge" @click=${()=>Gt(this,Bt,bM).call(this,t)}>
              ${t} &times;
            </span>
          `)}
          <tag-autocomplete
            .tags=${this.tags}
            .selectedTagIds=${this._selectedTagIds}
            @tag-selected=${Gt(this,Bt,vM)}
            @tag-created=${Gt(this,Bt,yM)}
            @tag-removed=${t=>Gt(this,Bt,_M).call(this,t.detail.tagId)}
          ></tag-autocomplete>
        </div>
      </div>
      ${e?Gt(this,Bt,CM).call(this):Gt(this,Bt,xM).call(this)}
      ${this._previewCount!==null?E`<p class="preview">${this._previewCount} transaction${this._previewCount===1?"":"s"} would match</p>`:""}
      <div class="save-row">
        <button class="secondary" ?disabled=${!Gt(this,Bt,Um).call(this)} @click=${()=>Gt(this,Bt,Ym).call(this,!1)}>${this.editingRule?"Save":"Create"}</button>
        <button ?disabled=${!Gt(this,Bt,Um).call(this)} @click=${()=>Gt(this,Bt,Ym).call(this,!0)}>${this.editingRule?"Save":"Create"} and apply</button>
      </div>
    `}};vp=new WeakMap;Bt=new WeakSet;fM=async function(){const e=Gt(this,Bt,yp).call(this);if(e.length===0){this._previewCount=null;return}const t=new bn({id:"",logic:this._logic,conditions:e,tagIds:[]}),n=await _e.all(),i=ke.toLookup(this.accounts);let r=0;for(const s of n)t.matches(dp(s,i))&&r++;this._previewCount=r};pM=function(e){const{index:t,condition:n}=e.detail;let i=n;this._prefillPristine&&t===0&&n.operator==="equals"&&n.value!==this._conditions[0]?.value&&(i={...n,operator:"contains"},this._prefillPristine=!1),this._conditions=this._conditions.map((r,s)=>s===t?i:r),dM(this,vp).call(this)};gM=function(e){const{index:t}=e.detail;this._conditions=this._conditions.filter((n,i)=>i!==t),dM(this,vp).call(this)};mM=function(){this._conditions=[...this._conditions,{field:"description",operator:"equals",value:""}]};vM=function(e){const t=e.detail.tag;this._selectedTagIds.includes(t.id)||(this._selectedTagIds=[...this._selectedTagIds,t.id])};yM=function(e){const t=e.detail.name;this._pendingTagNames.includes(t)||(this._pendingTagNames=[...this._pendingTagNames,t])};bM=function(e){this._pendingTagNames=this._pendingTagNames.filter(t=>t!==e)};_M=function(e){this._selectedTagIds=this._selectedTagIds.filter(t=>t!==e)};Um=function(){return this._merchantName.trim()!==""||this._selectedTagIds.length>0||this._pendingTagNames.length>0};yp=function(){return this._conditions.filter(e=>e.value.trim())};z0=function(){this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._logic="or"};Ym=function(e){const t=Gt(this,Bt,yp).call(this);t.length!==0&&(this.dispatchEvent(new CustomEvent("rule-saved",{detail:{id:this.editingRule?.id,logic:this._logic,conditions:t,tagIds:this._selectedTagIds,newTagNames:this._pendingTagNames,merchantName:this._merchantName.trim()||void 0,apply:e}})),Gt(this,Bt,z0).call(this))};Vm=function(e,t){const n=Gt(this,Bt,yp).call(this);n.length!==0&&(this.dispatchEvent(new CustomEvent("rule-merge",{detail:{existingRuleId:e.id,conditions:n,apply:t}})),Gt(this,Bt,z0).call(this))};j0=function(){if(!this._merchantName.trim())return[];const e=this.merchants.find(t=>t.name.toLowerCase()===this._merchantName.trim().toLowerCase());return e?this.rules.filter(t=>t.merchantId===e.id&&t.id!==this.editingRule?.id):[]};wM=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};xM=function(){return E`
      <div class="existing-rules spacer">
        <h5>Existing rules for this merchant</h5>
        <div class="existing-rule-item">
          <span class="existing-rule-conditions">placeholder</span>
          <button class="merge-btn">Merge</button>
        </div>
      </div>
    `};CM=function(){const e=Gt(this,Bt,j0).call(this);return e.length===0?nt:E`
      <div class="existing-rules">
        <h5>Existing rules for this merchant</h5>
        ${e.map(t=>E`
            <div class="existing-rule-item">
              <span class="existing-rule-conditions">${Gt(this,Bt,wM).call(this,t)}</span>
              ${t.tagIds.length>0?E`<tag-pills .tags=${this.tags} .tagIds=${t.tagIds}></tag-pills>`:nt}
              <button class="merge-btn secondary" @click=${()=>Gt(this,Bt,Vm).call(this,t,!1)}>Merge</button>
              <button class="merge-btn secondary" @click=${()=>Gt(this,Bt,Vm).call(this,t,!0)}>Merge and apply</button>
            </div>
          `)}
      </div>
    `};Be.styles=[Li,pr,dt`
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
    `];kn([H({type:Array})],Be.prototype,"tags",2);kn([H({type:Array})],Be.prototype,"merchants",2);kn([H({type:Array})],Be.prototype,"rules",2);kn([H({type:Array})],Be.prototype,"accounts",2);kn([H({type:String})],Be.prototype,"prefillDescription",2);kn([H({attribute:!1})],Be.prototype,"editingRule",2);kn([H({type:String})],Be.prototype,"editingMerchantName",2);kn([P()],Be.prototype,"_prefillPristine",2);kn([P()],Be.prototype,"_logic",2);kn([P()],Be.prototype,"_conditions",2);kn([P()],Be.prototype,"_selectedTagIds",2);kn([P()],Be.prototype,"_merchantName",2);kn([P()],Be.prototype,"_pendingTagNames",2);kn([P()],Be.prototype,"_previewCount",2);Be=kn([Et("rule-editor")],Be);var K7=Object.defineProperty,G7=Object.getOwnPropertyDescriptor,kM=e=>{throw TypeError(e)},B0=(e,t,n,i)=>{for(var r=i>1?void 0:i?G7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&K7(t,n,r),r},X7=(e,t,n)=>t.has(e)||kM("Cannot "+n),Q7=(e,t,n)=>t.has(e)?kM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Hw=(e,t,n)=>(X7(e,t,"access private method"),n),sd,qm;let Tu=class extends mt{constructor(){super(...arguments),Q7(this,sd),this.overlaps=[],this.merchants=new Map}render(){return this.overlaps.length===0?E`
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
              <td class="condition-summary">${Hw(this,sd,qm).call(this,e.ruleA)}</td>
              <td class="condition-summary">${Hw(this,sd,qm).call(this,e.ruleB)}</td>
              <td>${e.count}</td>
              <td class="samples">${e.samples.values().take(3).toArray().join(`

`)}</td>
            </tr>
          `)}
        </tbody>
      </table>
      </div>
    `}};sd=new WeakSet;qm=function(e){const t=e.merchantId?this.merchants.get(e.merchantId)??"":"",n=e.conditions.map(i=>`${i.operator} "${i.value}"`).join(e.logic==="and"?" AND ":" OR ");return t?`${t}: ${n}`:n};Tu.styles=[Jr,dt`
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
    `];B0([H({attribute:!1})],Tu.prototype,"overlaps",2);B0([H({attribute:!1})],Tu.prototype,"merchants",2);Tu=B0([Et("rule-overlap")],Tu);var Z7=Object.defineProperty,J7=Object.getOwnPropertyDescriptor,SM=e=>{throw TypeError(e)},we=(e,t,n,i)=>{for(var r=i>1?void 0:i?J7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Z7(t,n,r),r},W0=(e,t,n)=>t.has(e)||SM("Cannot "+n),tB=(e,t,n)=>(W0(e,t,"read from private field"),n?n.call(e):t.get(e)),Uw=(e,t,n)=>t.has(e)?SM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Yw=(e,t,n,i)=>(W0(e,t,"write to private field"),t.set(e,n),n),bt=(e,t,n)=>(W0(e,t,"access private method"),n),Cl,gt,gc,EM,MM,DM,$M,mf,vf,TM,OM,IM,PM,od,ad,RM,AM,LM,NM,H0,FM,zM,jM,BM,WM;let he=class extends pp(mt){constructor(){super(...arguments),Uw(this,gt),this._rules=[],this._tags=[],this._merchants=[],this._unmerchanted=[],this._accounts=[],this._prefillDescription="",this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._rulesPage=1,this._rulesPageSize=10,this._rulesFilter="",this._rulesSortCol="conditions",this._rulesSortDir="asc",this._unmerchantedPage=1,this._unmerchantedPageSize=20,this._unmerchantedFilter="",this._unmatchedRuleIds=new Set,this._overlapData=[],Uw(this,Cl,[])}connectedCallback(){super.connectedCallback(),bt(this,gt,gc).call(this);const e=Zo(()=>bt(this,gt,gc).call(this),300);Promise.all([bn.subscribe(e),pe.subscribe(e),Ie.subscribe(e),_e.subscribe(e)]).then(t=>{Yw(this,Cl,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of tB(this,Cl))e.unsubscribe();Yw(this,Cl,[])}render(){const e=new Map(this._merchants.map(t=>[t.id,t.name]));return E`
      <div class="sections-grid">
        ${bt(this,gt,BM).call(this)}
        ${bt(this,gt,jM).call(this)}
        <rule-overlap .overlaps=${this._overlapData} .merchants=${e}></rule-overlap>
        ${bt(this,gt,zM).call(this)}
      </div>

      ${bt(this,gt,WM).call(this)}
    `}};Cl=new WeakMap;gt=new WeakSet;gc=async function(){this._rules=await bn.all(),this._tags=await pe.all(),this._merchants=await Ie.all(),this._accounts=await ke.all();const e=ke.toLookup(this._accounts),t=await _e.all();this._unmerchanted=t.filter(o=>o.merchantId===void 0);const n=this._rules,i=new Set,r=new Map,s=t.map(o=>dp(o,e));for(let o=0;o<t.length;o++){const a=t[o],c=s[o],l=[];for(const u of n)u.matches(c)&&(i.add(u.id),l.push(u));if(l.length>=2)for(let u=0;u<l.length;u++)for(let h=u+1;h<l.length;h++){const d=[l[u].id,l[h].id].sort().join("-"),f=r.get(d);f?(f.count++,f.samples.add(a.description)):r.set(d,{ruleA:l[u],ruleB:l[h],count:1,samples:new Set([a.description])})}}this._unmatchedRuleIds=new Set(n.filter(o=>!i.has(o.id)).map(o=>o.id)),this._overlapData=[...r.values()].sort((o,a)=>a.count-o.count)};EM=async function(e){await this.withBusy(async()=>{const{id:t,logic:n,conditions:i,tagIds:r,newTagNames:s,merchantName:o,apply:a}=e.detail,c=[...r];if(s?.length)for(const d of s){const p=(await pe.byName(d))?.id??(await pe.create(d)).id;c.push(p)}let l;o&&(l=(await Ie.byName(o))?.id??(await Ie.create(o)).id);const u={logic:n,conditions:i,merchantId:l,tagIds:c};let h;t?(await bn.put({...u,id:t}),h=new bn({...u,id:t})):h=await bn.create(u),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",a&&await bn.applyToTransactions(h),Ci({message:t?"Rule updated":"Rule created",type:"success"}),await bt(this,gt,gc).call(this)})};MM=async function(e){await this.withBusy(async()=>{const{existingRuleId:t,conditions:n,apply:i}=e.detail,r=this._rules.find(o=>o.id===t);if(!r)return;const s={id:r.id,logic:"or",conditions:[...r.conditions,...n],merchantId:r.merchantId,accountId:r.accountId,tagIds:r.tagIds};await bn.put(s),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",i&&await bn.applyToTransactions(s),Ci({message:"Rules merged",type:"success"}),await bt(this,gt,gc).call(this)})};DM=async function(e){await this.withBusy(async()=>{await bn.remove(e),Ci({message:"Rule deleted",type:"success"}),await bt(this,gt,gc).call(this)})};$M=async function(e){let t="";e.merchantId&&(t=(await Ie.get(e.merchantId))?.name??""),this._editingRule=e,this._editingMerchantName=t,this._showEditor=!0};mf=function(e){return this._tags.find(t=>t.id===e)?.name??`#${e}`};vf=function(e){return e?this._merchants.find(t=>t.id===e)?.name??"":""};TM=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};OM=function(e){this._rulesPage=e.detail.page,this._rulesPageSize=e.detail.pageSize};IM=function(e){this._rulesFilter=e.detail.filter,this._rulesPage=1};PM=function(e){if(!this._rulesFilter)return!0;const t=this._rulesFilter.toLowerCase();return!!(e.conditions.some(n=>n.value.toLowerCase().includes(t))||e.merchantId&&this._merchants.find(i=>i.id===e.merchantId)?.name.toLowerCase().includes(t)||e.tagIds.some(n=>bt(this,gt,mf).call(this,n).toLowerCase().includes(t)))};od=function(e){this._rulesSortCol===e?this._rulesSortDir=this._rulesSortDir==="asc"?"desc":"asc":(this._rulesSortCol=e,this._rulesSortDir="asc"),this._rulesPage=1};ad=function(e){return this._rulesSortCol!==e?"":this._rulesSortDir==="asc"?" ▲":" ▼"};RM=function(e){const t=this._rulesSortCol,n=this._rulesSortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="conditions"){const o=i.conditions[0]?.value??"",a=r.conditions[0]?.value??"";s=o.localeCompare(a)}else if(t==="merchant")s=bt(this,gt,vf).call(this,i.merchantId).localeCompare(bt(this,gt,vf).call(this,r.merchantId));else if(t==="tags"){const o=i.tagIds.map(c=>bt(this,gt,mf).call(this,c)).join(","),a=r.tagIds.map(c=>bt(this,gt,mf).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};AM=function(e){this._unmerchantedPage=e.detail.page,this._unmerchantedPageSize=e.detail.pageSize};LM=function(e){this._unmerchantedFilter=e.detail.filter,this._unmerchantedPage=1};NM=function(e){this._prefillDescription=e.description,this._showEditor=!0};H0=function(e){return E`
      <tr>
        <td class="condition-summary">
          ${bt(this,gt,TM).call(this,e)}
          ${this._unmatchedRuleIds.has(e.id)?E`<span class="unmatched-warning" title="This rule matches no transactions">${ye(S7)} No matches</span>`:nt}
        </td>
        <td>${bt(this,gt,vf).call(this,e.merchantId)}</td>
        <td>
          ${e.tagIds.length>0?E`<tag-pills .tags=${this._tags} .tagIds=${e.tagIds}></tag-pills>`:"None"}
        </td>
        <td class="actions">
          <button class="icon-btn" title="Edit rule" aria-label="Edit rule" @click=${()=>bt(this,gt,$M).call(this,e)}>${ye(op)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete rule" aria-label="Delete rule" @click=${()=>bt(this,gt,DM).call(this,e.id)}>${ye(Dc)}</button>
        </td>
      </tr>
    `};FM=function(e){return E`
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
          ${e.map(t=>bt(this,gt,H0).call(this,t))}
        </tbody>
      </table>
    `};zM=function(){if(this._rules.length===0)return E`
        <budgee-empty-state
          heading="No rules yet"
          description="Create a rule to automatically assign merchants and tags to transactions."
        >
          <button @click=${()=>{this._showEditor=!0}}>Create Rule</button>
        </budgee-empty-state>
      `;const e=this._rules.filter(r=>bt(this,gt,PM).call(this,r)),t=bt(this,gt,RM).call(this,e),n=(this._rulesPage-1)*this._rulesPageSize,i=t.slice(n,n+this._rulesPageSize);return E`
      <div class="section">
        <h3>Existing Rules</h3>
        <paginated-table
          .totalItems=${e.length}
          .defaultPageSize=${10}
          storageKey="rules"
          ?filterable=${!0}
          @page-change=${bt(this,gt,OM)}
          @filter-change=${bt(this,gt,IM)}
        >
          <table>
            <thead>
              <tr>
                <th class="sortable" @click=${()=>bt(this,gt,od).call(this,"conditions")}>
                  Conditions${bt(this,gt,ad).call(this,"conditions")}
                </th>
                <th class="sortable" @click=${()=>bt(this,gt,od).call(this,"merchant")}>
                  Merchant${bt(this,gt,ad).call(this,"merchant")}
                </th>
                <th class="sortable" @click=${()=>bt(this,gt,od).call(this,"tags")}>
                  Tags${bt(this,gt,ad).call(this,"tags")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${i.map(r=>bt(this,gt,H0).call(this,r))}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};jM=function(){const e=this._rules.filter(n=>this._unmatchedRuleIds.has(n.id));if(e.length===0)return nt;const t=e.length;return E`
      <div class="section">
        <h3>Unmatched Rules</h3>
        <p>${t} rule${t===1?"":"s"} matching no transactions.</p>
        ${bt(this,gt,FM).call(this,e)}
      </div>
    `};BM=function(){if(this._unmerchanted.length===0)return nt;const e=this._unmerchantedFilter.toLowerCase(),t=e?this._unmerchanted.filter(r=>r.description.toLowerCase().includes(e)):this._unmerchanted,n=(this._unmerchantedPage-1)*this._unmerchantedPageSize,i=t.slice(n,n+this._unmerchantedPageSize);return E`
      <div class="section">
        <h3>Unmerchanted Transactions</h3>
        <paginated-table
          .totalItems=${t.length}
          .defaultPageSize=${20}
          storageKey="unmerchanted"
          ?filterable=${!0}
          @page-change=${bt(this,gt,AM)}
          @filter-change=${bt(this,gt,LM)}
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
                  <tr class="clickable-row" @click=${()=>bt(this,gt,NM).call(this,r)}>
                    <td>${r.date}</td>
                    <td>${r.description}</td>
                    <td class=${r.amount<0?"amount-negative":"amount-positive"}>${r.amount.toFixed(2)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};WM=function(){if(!this._showEditor)return nt;const e=this._editingRule?"Edit Rule":"Create Rule";return E`
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
          @rule-saved=${bt(this,gt,EM)}
          @rule-merge=${bt(this,gt,MM)}
        ></rule-editor>
      </budgee-modal>
    `};he.styles=[Li,fp,Jr,$c,dt`
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
    `];we([P()],he.prototype,"_rules",2);we([P()],he.prototype,"_tags",2);we([P()],he.prototype,"_merchants",2);we([P()],he.prototype,"_unmerchanted",2);we([P()],he.prototype,"_accounts",2);we([P()],he.prototype,"_prefillDescription",2);we([P()],he.prototype,"_showEditor",2);we([P()],he.prototype,"_editingRule",2);we([P()],he.prototype,"_editingMerchantName",2);we([P()],he.prototype,"_rulesPage",2);we([P()],he.prototype,"_rulesPageSize",2);we([P()],he.prototype,"_rulesFilter",2);we([P()],he.prototype,"_rulesSortCol",2);we([P()],he.prototype,"_rulesSortDir",2);we([P()],he.prototype,"_unmerchantedPage",2);we([P()],he.prototype,"_unmerchantedPageSize",2);we([P()],he.prototype,"_unmerchantedFilter",2);we([P()],he.prototype,"_unmatchedRuleIds",2);we([P()],he.prototype,"_overlapData",2);he=we([Et("rule-manager")],he);async function eB(){const e=await Z(),t={version:Yi,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=`budgee-export-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(i);const{showToast:s}=await Ia(async()=>{const{showToast:o}=await Promise.resolve().then(()=>D7);return{showToast:o}},void 0);s({message:"Database exported",type:"success"})}var nB=Object.defineProperty,iB=Object.getOwnPropertyDescriptor,HM=e=>{throw TypeError(e)},Ic=(e,t,n,i)=>{for(var r=i>1?void 0:i?iB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&nB(t,n,r),r},UM=(e,t,n)=>t.has(e)||HM("Cannot "+n),rB=(e,t,n)=>(UM(e,t,"read from private field"),n?n.call(e):t.get(e)),sB=(e,t,n)=>t.has(e)?HM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Qc=(e,t,n)=>(UM(e,t,"access private method"),n),os,YM,VM,qM,KM,GM,XM;let Bs=class extends mt{constructor(){super(...arguments),sB(this,os),this._url="",this._testResult=null,this._testError="",this._testedUrl="",this._theme="system"}connectedCallback(){super.connectedCallback(),this._url=localStorage.getItem("budgee-sync-url")??"";const e=localStorage.getItem("budgee-theme");this._theme=e==="light"||e==="dark"?e:"system"}render(){return E`
      <section>
        <h2>Appearance</h2>
        <div class="field">
          <label for="theme-select">Theme</label>
          <select id="theme-select" @change=${Qc(this,os,YM)}>
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
        <input type="file" accept=".json" @change=${Qc(this,os,XM)} />

        <h3>Export Database</h3>
        <p>Download a full backup of your data as JSON.</p>
        <button @click=${eB}>Export</button>
      </section>

      <section>
        <h2>Sync</h2>
        <p class="hint">Sync your data across devices using a sync server. Save a valid URL to enable sync; clear it to disable.</p>
        <div class="field">
          <label for="sync-url">Server URL</label>
          <input type="url" id="sync-url" .value=${this._url} @change=${Qc(this,os,VM)}
            placeholder="http://your-server:3001" />
          <p class="hint">The URL of your sync server.</p>
        </div>
        ${this._url?E`
              <div class="field">
                <button ?disabled=${this._testResult==="testing"} @click=${Qc(this,os,qM)}>
                  ${this._testResult==="testing"?"Testing...":"Test Connection"}
                </button>
                ${this._testResult==="success"?E`
                        <p class="test-result success">Connection successful.</p>
                      `:this._testResult==="error"?E`<p class="test-result error">Connection failed: ${this._testError}</p>`:nt}
              </div>
            `:nt}
        <div class="field">
          <button ?disabled=${!rB(this,os,KM)} @click=${Qc(this,os,GM)}>Save</button>
        </div>
      </section>
    `}};os=new WeakSet;YM=function(e){const t=e.target.value;this._theme=t,t==="system"?(localStorage.removeItem("budgee-theme"),delete document.documentElement.dataset.theme):(localStorage.setItem("budgee-theme",t),document.documentElement.dataset.theme=t)};VM=function(e){this._url=e.target.value,this._testResult=null,this._testError="",this._testedUrl=""};qM=async function(){this._testResult="testing",this._testError="";try{await y4(this._url),this._testResult="success",this._testedUrl=this._url,Ci({message:"Connection successful",type:"success"})}catch(e){this._testResult="error",this._testError=e instanceof Error?e.message:String(e),Ci({message:"Connection failed",type:"error"}),this._testedUrl=""}};KM=function(){const e=localStorage.getItem("budgee-sync-url")??"";return this._url===e?!1:this._url?this._testResult==="success"&&this._testedUrl===this._url:!0};GM=function(){localStorage.setItem("budgee-sync-url",this._url),localStorage.removeItem("budgee-ice-server"),localStorage.removeItem("budgee-turn-server"),this.dispatchEvent(new CustomEvent("budgee-sync-settings-changed",{bubbles:!0,composed:!0})),Ci({message:"Sync settings saved",type:"success"}),this.requestUpdate()};XM=async function(e){const t=e.target;if(!t.files?.length)return;if(!await _i.show({heading:"Import Database",message:"This will replace all existing data. Are you sure?",confirmLabel:"Import",danger:!0})){t.value="";return}Lv("Importing database...");try{await Jx(t.files[0]),t.value="",window.location.reload()}finally{Nv()}};Bs.styles=[Li,dt`
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
    `];Ic([P()],Bs.prototype,"_url",2);Ic([P()],Bs.prototype,"_testResult",2);Ic([P()],Bs.prototype,"_testError",2);Ic([P()],Bs.prototype,"_testedUrl",2);Ic([P()],Bs.prototype,"_theme",2);Bs=Ic([Et("budgee-settings")],Bs);var oB=Object.defineProperty,aB=Object.getOwnPropertyDescriptor,QM=e=>{throw TypeError(e)},ZM=(e,t,n,i)=>{for(var r=i>1?void 0:i?aB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&oB(t,n,r),r},JM=(e,t,n)=>t.has(e)||QM("Cannot "+n),cB=(e,t,n)=>(JM(e,t,"read from private field"),t.get(e)),lB=(e,t,n)=>t.has(e)?QM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),uB=(e,t,n,i)=>(JM(e,t,"write to private field"),t.set(e,n),n),cd;const hB={"not-configured":"Not configured",connecting:"Connecting",syncing:"Syncing",synced:"Synced",error:"Error"};let yf=class extends mt{constructor(){super(...arguments),this._status="not-configured",lB(this,cd)}connectedCallback(){super.connectedCallback(),uB(this,cd,_4.subscribe(e=>{this._status=e}))}disconnectedCallback(){super.disconnectedCallback(),cB(this,cd)?.unsubscribe()}render(){return E`<span class="dot ${this._status}"></span>${hB[this._status]}`}};cd=new WeakMap;yf.styles=dt`
    :host {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      color: var(--budgee-text-muted);
      padding: 0.5rem 1rem;
    }

    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      flex-shrink: 0;
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

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
  `;ZM([P()],yf.prototype,"_status",2);yf=ZM([Et("sync-status-indicator")],yf);function dB(e){if(e.startsWith("#"))return e;const{r:t,g:n,b:i}=jS(e),r=s=>s.toString(16).padStart(2,"0");return`#${r(t)}${r(n)}${r(i)}`}var fB=Object.defineProperty,pB=Object.getOwnPropertyDescriptor,tD=e=>{throw TypeError(e)},Xs=(e,t,n,i)=>{for(var r=i>1?void 0:i?pB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&fB(t,n,r),r},U0=(e,t,n)=>t.has(e)||tD("Cannot "+n),gB=(e,t,n)=>(U0(e,t,"read from private field"),n?n.call(e):t.get(e)),Vw=(e,t,n)=>t.has(e)?tD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),qw=(e,t,n,i)=>(U0(e,t,"write to private field"),t.set(e,n),n),De=(e,t,n)=>(U0(e,t,"access private method"),n),kl,me,qo,Y0,eD,nD,iD,rD,sD,oD,aD,cD,lD,uD;let dr=class extends pp(mt){constructor(){super(...arguments),Vw(this,me),this._tags=[],this._newTagName="",this._error="",this._filter="",this._currentPage=1,this._pageSize=25,this._sortDir="asc",Vw(this,kl,[])}connectedCallback(){super.connectedCallback(),De(this,me,qo).call(this);const e=Zo(()=>De(this,me,qo).call(this),300);pe.subscribe(e).then(t=>{qw(this,kl,[t])})}disconnectedCallback(){super.disconnectedCallback();for(const e of gB(this,kl))e.unsubscribe();qw(this,kl,[])}render(){return E`
      <div class="tag-form">
        <input
          type="text"
          placeholder="New tag name"
          .value=${this._newTagName}
          @input=${De(this,me,sD)}
          @keydown=${De(this,me,oD)}
        />
        <button @click=${De(this,me,Y0)}>Add</button>
      </div>
      ${this._error?E`<p class="error">${this._error}</p>`:""}
      ${this._tags.length===0?E`
              <budgee-empty-state
                heading="No tags yet"
                description="Create a tag above to get started."
              ></budgee-empty-state>
            `:""}
      ${(()=>{if(this._tags.length===0)return"";const e=this._filter.toLowerCase(),t=e?this._tags.filter(o=>o.name.toLowerCase().includes(e)):this._tags,n=De(this,me,uD).call(this,t),i=(this._currentPage-1)*this._pageSize,r=n.slice(i,i+this._pageSize),s=this._sortDir==="asc"?" ▲":" ▼";return E`
          <paginated-table
            .totalItems=${t.length}
            .defaultPageSize=${25}
            storageKey="tags"
            ?filterable=${!0}
            @page-change=${De(this,me,aD)}
            @filter-change=${De(this,me,cD)}
          >
            <table>
              <thead>
                <tr>
                  <th class="col-icon">Icon</th>
                  <th class="col-color">Color</th>
                  <th class="sortable" @click=${De(this,me,lD)}>Name${s}</th>
                  <th class="col-remove"></th>
                </tr>
              </thead>
              <tbody>
                ${r.map(o=>E`
                  <tr>
                    <td class="col-icon">
                      <icon-picker
                        .value=${o.icon??""}
                        @icon-selected=${a=>De(this,me,nD).call(this,o,a.detail.icon)}
                      ></icon-picker>
                    </td>
                    <td class="col-color">
                      <input
                        type="color"
                        class="color-swatch"
                        .value=${De(this,me,iD).call(this,o.color)}
                        @change=${a=>De(this,me,rD).call(this,o,a.target.value)}
                      />
                    </td>
                    <td>
                      ${o.name}
                    </td>
                    <td class="col-remove">
                      <button class="icon-btn icon-btn--danger" title="Remove tag" aria-label="Remove tag" @click=${()=>De(this,me,eD).call(this,o.id)}>
                        ${ye(Dc)}
                      </button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </paginated-table>
        `})()}
    `}};kl=new WeakMap;me=new WeakSet;qo=async function(){this._tags=await pe.all()};Y0=async function(){const e=this._newTagName.trim();if(!e)return;if(this._error="",await pe.byName(e)){this._error=`Tag "${e}" already exists.`;return}await this.withBusy(async()=>{await pe.create(e),this._newTagName="",Ci({message:"Tag created",type:"success"}),await De(this,me,qo).call(this)})};eD=async function(e){await this.withBusy(async()=>{await pe.remove(e),Ci({message:"Tag deleted",type:"success"}),await De(this,me,qo).call(this)})};nD=async function(e,t){await this.withBusy(async()=>{await pe.update(e.id,{icon:t||void 0}),await De(this,me,qo).call(this)})};iD=function(e){return e?dB(e):"#7eb8da"};rD=async function(e,t){await this.withBusy(async()=>{await pe.update(e.id,{color:t}),await De(this,me,qo).call(this)})};sD=function(e){this._newTagName=e.target.value};oD=function(e){e.key==="Enter"&&De(this,me,Y0).call(this)};aD=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};cD=function(e){this._filter=e.detail.filter,this._currentPage=1};lD=function(){this._sortDir=this._sortDir==="asc"?"desc":"asc",this._currentPage=1};uD=function(e){const t=this._sortDir==="asc"?1:-1;return[...e].sort((n,i)=>n.name.localeCompare(i.name)*t)};dr.styles=[Li,fp,Jr,$c,pr,dt`
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
    `];Xs([P()],dr.prototype,"_tags",2);Xs([P()],dr.prototype,"_newTagName",2);Xs([P()],dr.prototype,"_error",2);Xs([P()],dr.prototype,"_filter",2);Xs([P()],dr.prototype,"_currentPage",2);Xs([P()],dr.prototype,"_pageSize",2);Xs([P()],dr.prototype,"_sortDir",2);dr=Xs([Et("tag-manager")],dr);function mB(e,t){if(!t)return e;const n=e.toLowerCase(),i=t.toLowerCase(),r=n.indexOf(i);if(r===-1)return e;const s=e.slice(0,r),o=e.slice(r,r+t.length),a=e.slice(r+t.length);return E`${s}<mark>${o}</mark>${a}`}function vB(e,t,n={}){const i=dp(e,n);for(const r of t){if(!r.matches(i))continue;const s=[...new Set([...e.tagIds,...r.tagIds])],o=r.merchantId??e.merchantId;return{...e,tagIds:s,merchantId:o}}return e}async function yB(e,t,n){const i=await bn.all(),r=ke.toLookup(await ke.all()),s=t.account?await bB(e,t.account):void 0,o=e.map(a=>_B(a,t,s?.get(a[t.account])??n.accountId)).filter(a=>a!==void 0).map(a=>vB(a,i,r));return n.importMode==="replace"&&await _e.deleteAll(),await _e.bulkAdd(o),o.length}async function bB(e,t){const n=[...new Set(e.map(o=>o[t]).filter(Boolean))],i=await ke.all(),r=new Map;for(const o of i)r.set(o.name.toLowerCase(),o.id);const s=new Map;for(const o of n){const a=r.get(o.toLowerCase());if(a)s.set(o,a);else{const c=await ke.create({name:o});s.set(o,c.id),r.set(o.toLowerCase(),c.id)}}return s}function _B(e,t,n){const i=t.date?e[t.date]:void 0,r=t.amount?e[t.amount]:void 0,s=t.credit?e[t.credit]:void 0,o=t.description?e[t.description]:void 0;if(!i||!o)return;const a=r?Number.parseFloat(r):NaN,c=s?Number.parseFloat(s):NaN;if(Number.isNaN(a)&&Number.isNaN(c))return;const l=(Number.isNaN(a)?0:-a)+(Number.isNaN(c)?0:c);return{date:i,amount:l,description:o,tagIds:[],accountId:n}}var r9=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function wB(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ld={exports:{}};var xB=ld.exports,Kw;function CB(){return Kw||(Kw=1,(function(e,t){((n,i)=>{e.exports=i()})(xB,function n(){var i=typeof self<"u"?self:typeof window<"u"?window:i!==void 0?i:{},r,s=!i.document&&!!i.postMessage,o=i.IS_PAPA_WORKER||!1,a={},c=0,l={};function u(w){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(x){var M=k(x);M.chunkSize=parseInt(M.chunkSize),x.step||x.chunk||(M.chunkSize=null),this._handle=new g(M),(this._handle.streamer=this)._config=M}).call(this,w),this.parseChunk=function(x,M){var O=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<O){let R=this._config.newline;R||(T=this._config.quoteChar||'"',R=this._handle.guessLineEndings(x,T)),x=[...x.split(R).slice(O)].join(R)}this.isFirstChunk&&D(this._config.beforeFirstChunk)&&(T=this._config.beforeFirstChunk(x))!==void 0&&(x=T),this.isFirstChunk=!1,this._halted=!1;var O=this._partialLine+x,T=(this._partialLine="",this._handle.parse(O,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(x=T.meta.cursor,O=(this._finished||(this._partialLine=O.substring(x-this._baseIndex),this._baseIndex=x),T&&T.data&&(this._rowCount+=T.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),o)i.postMessage({results:T,workerId:l.WORKER_ID,finished:O});else if(D(this._config.chunk)&&!M){if(this._config.chunk(T,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=T=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(T.data),this._completeResults.errors=this._completeResults.errors.concat(T.errors),this._completeResults.meta=T.meta),this._completed||!O||!D(this._config.complete)||T&&T.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),O||T&&T.meta.paused||this._nextChunk(),T}this._halted=!0},this._sendError=function(x){D(this._config.error)?this._config.error(x):o&&this._config.error&&i.postMessage({workerId:l.WORKER_ID,error:x,finished:!1})}}function h(w){var x;(w=w||{}).chunkSize||(w.chunkSize=l.RemoteChunkSize),u.call(this,w),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(M){this._input=M,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(x=new XMLHttpRequest,this._config.withCredentials&&(x.withCredentials=this._config.withCredentials),s||(x.onload=$(this._chunkLoaded,this),x.onerror=$(this._chunkError,this)),x.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var M,O=this._config.downloadRequestHeaders;for(M in O)x.setRequestHeader(M,O[M])}var T;this._config.chunkSize&&(T=this._start+this._config.chunkSize-1,x.setRequestHeader("Range","bytes="+this._start+"-"+T));try{x.send(this._config.downloadRequestBody)}catch(R){this._chunkError(R.message)}s&&x.status===0&&this._chunkError()}},this._chunkLoaded=function(){x.readyState===4&&(x.status<200||400<=x.status?this._chunkError():(this._start+=this._config.chunkSize||x.responseText.length,this._finished=!this._config.chunkSize||this._start>=(M=>(M=M.getResponseHeader("Content-Range"))!==null?parseInt(M.substring(M.lastIndexOf("/")+1)):-1)(x),this.parseChunk(x.responseText)))},this._chunkError=function(M){M=x.statusText||M,this._sendError(new Error(M))}}function d(w){(w=w||{}).chunkSize||(w.chunkSize=l.LocalChunkSize),u.call(this,w);var x,M,O=typeof FileReader<"u";this.stream=function(T){this._input=T,M=T.slice||T.webkitSlice||T.mozSlice,O?((x=new FileReader).onload=$(this._chunkLoaded,this),x.onerror=$(this._chunkError,this)):x=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var T=this._input,R=(this._config.chunkSize&&(R=Math.min(this._start+this._config.chunkSize,this._input.size),T=M.call(T,this._start,R)),x.readAsText(T,this._config.encoding));O||this._chunkLoaded({target:{result:R}})},this._chunkLoaded=function(T){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(T.target.result)},this._chunkError=function(){this._sendError(x.error)}}function f(w){var x;u.call(this,w=w||{}),this.stream=function(M){return x=M,this._nextChunk()},this._nextChunk=function(){var M,O;if(!this._finished)return M=this._config.chunkSize,x=M?(O=x.substring(0,M),x.substring(M)):(O=x,""),this._finished=!x,this.parseChunk(O)}}function p(w){u.call(this,w=w||{});var x=[],M=!0,O=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(T){this._input=T,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){O&&x.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),x.length?this.parseChunk(x.shift()):M=!0},this._streamData=$(function(T){try{x.push(typeof T=="string"?T:T.toString(this._config.encoding)),M&&(M=!1,this._checkIsFinished(),this.parseChunk(x.shift()))}catch(R){this._streamError(R)}},this),this._streamError=$(function(T){this._streamCleanUp(),this._sendError(T)},this),this._streamEnd=$(function(){this._streamCleanUp(),O=!0,this._streamData("")},this),this._streamCleanUp=$(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function g(w){var x,M,O,T,R=Math.pow(2,53),j=-R,z=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,Y=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,F=this,G=0,B=0,V=!1,W=!1,q=[],L={data:[],errors:[],meta:{}};function ot(wt){return w.skipEmptyLines==="greedy"?wt.join("").trim()==="":wt.length===1&&wt[0].length===0}function kt(){if(L&&O&&(si("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),O=!1),w.skipEmptyLines&&(L.data=L.data.filter(function(at){return!ot(at)})),Lt()){let at=function(oe,xe){D(w.transformHeader)&&(oe=w.transformHeader(oe,xe)),q.push(oe)};if(L)if(Array.isArray(L.data[0])){for(var wt=0;Lt()&&wt<L.data.length;wt++)L.data[wt].forEach(at);L.data.splice(0,1)}else L.data.forEach(at)}function $t(at,oe){for(var xe=w.header?{}:[],Nt=0;Nt<at.length;Nt++){var zt=Nt,xt=at[Nt],xt=((ki,ut)=>(Jt=>(w.dynamicTypingFunction&&w.dynamicTyping[Jt]===void 0&&(w.dynamicTyping[Jt]=w.dynamicTypingFunction(Jt)),(w.dynamicTyping[Jt]||w.dynamicTyping)===!0))(ki)?ut==="true"||ut==="TRUE"||ut!=="false"&&ut!=="FALSE"&&((Jt=>{if(z.test(Jt)&&(Jt=parseFloat(Jt),j<Jt&&Jt<R))return 1})(ut)?parseFloat(ut):Y.test(ut)?new Date(ut):ut===""?null:ut):ut)(zt=w.header?Nt>=q.length?"__parsed_extra":q[Nt]:zt,xt=w.transform?w.transform(xt,zt):xt);zt==="__parsed_extra"?(xe[zt]=xe[zt]||[],xe[zt].push(xt)):xe[zt]=xt}return w.header&&(Nt>q.length?si("FieldMismatch","TooManyFields","Too many fields: expected "+q.length+" fields but parsed "+Nt,B+oe):Nt<q.length&&si("FieldMismatch","TooFewFields","Too few fields: expected "+q.length+" fields but parsed "+Nt,B+oe)),xe}var se;L&&(w.header||w.dynamicTyping||w.transform)&&(se=1,!L.data.length||Array.isArray(L.data[0])?(L.data=L.data.map($t),se=L.data.length):L.data=$t(L.data,0),w.header&&L.meta&&(L.meta.fields=q),B+=se)}function Lt(){return w.header&&q.length===0}function si(wt,$t,se,at){wt={type:wt,code:$t,message:se},at!==void 0&&(wt.row=at),L.errors.push(wt)}D(w.step)&&(T=w.step,w.step=function(wt){L=wt,Lt()?kt():(kt(),L.data.length!==0&&(G+=wt.data.length,w.preview&&G>w.preview?M.abort():(L.data=L.data[0],T(L,F))))}),this.parse=function(wt,$t,se){var at=w.quoteChar||'"',at=(w.newline||(w.newline=this.guessLineEndings(wt,at)),O=!1,w.delimiter?D(w.delimiter)&&(w.delimiter=w.delimiter(wt),L.meta.delimiter=w.delimiter):((at=((oe,xe,Nt,zt,xt)=>{var ki,ut,Jt,rs;xt=xt||[",","	","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var ca=0;ca<xt.length;ca++){for(var Ni,Pc=xt[ca],He=0,Fi=0,Ee=0,En=(Jt=void 0,new b({comments:zt,delimiter:Pc,newline:xe,preview:10}).parse(oe)),mr=0;mr<En.data.length;mr++)Nt&&ot(En.data[mr])?Ee++:(Ni=En.data[mr].length,Fi+=Ni,Jt===void 0?Jt=Ni:0<Ni&&(He+=Math.abs(Ni-Jt),Jt=Ni));0<En.data.length&&(Fi/=En.data.length-Ee),(ut===void 0||He<=ut)&&(rs===void 0||rs<Fi)&&1.99<Fi&&(ut=He,ki=Pc,rs=Fi)}return{successful:!!(w.delimiter=ki),bestDelimiter:ki}})(wt,w.newline,w.skipEmptyLines,w.comments,w.delimitersToGuess)).successful?w.delimiter=at.bestDelimiter:(O=!0,w.delimiter=l.DefaultDelimiter),L.meta.delimiter=w.delimiter),k(w));return w.preview&&w.header&&at.preview++,x=wt,M=new b(at),L=M.parse(x,$t,se),kt(),V?{meta:{paused:!0}}:L||{meta:{paused:!1}}},this.paused=function(){return V},this.pause=function(){V=!0,M.abort(),x=D(w.chunk)?"":x.substring(M.getCharIndex())},this.resume=function(){F.streamer._halted?(V=!1,F.streamer.parseChunk(x,!0)):setTimeout(F.resume,3)},this.aborted=function(){return W},this.abort=function(){W=!0,M.abort(),L.meta.aborted=!0,D(w.complete)&&w.complete(L),x=""},this.guessLineEndings=function(oe,at){oe=oe.substring(0,1048576);var at=new RegExp(m(at)+"([^]*?)"+m(at),"gm"),se=(oe=oe.replace(at,"")).split("\r"),at=oe.split(`
`),oe=1<at.length&&at[0].length<se[0].length;if(se.length===1||oe)return`
`;for(var xe=0,Nt=0;Nt<se.length;Nt++)se[Nt][0]===`
`&&xe++;return xe>=se.length/2?`\r
`:"\r"}}function m(w){return w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function b(w){var x=(w=w||{}).delimiter,M=w.newline,O=w.comments,T=w.step,R=w.preview,j=w.fastMode,z=null,Y=!1,F=w.quoteChar==null?'"':w.quoteChar,G=F;if(w.escapeChar!==void 0&&(G=w.escapeChar),(typeof x!="string"||-1<l.BAD_DELIMITERS.indexOf(x))&&(x=","),O===x)throw new Error("Comment character same as delimiter");O===!0?O="#":(typeof O!="string"||-1<l.BAD_DELIMITERS.indexOf(O))&&(O=!1),M!==`
`&&M!=="\r"&&M!==`\r
`&&(M=`
`);var B=0,V=!1;this.parse=function(W,q,L){if(typeof W!="string")throw new Error("Input must be a string");var ot=W.length,kt=x.length,Lt=M.length,si=O.length,wt=D(T),$t=[],se=[],at=[],oe=B=0;if(!W)return He();if(j||j!==!1&&W.indexOf(F)===-1){for(var xe=W.split(M),Nt=0;Nt<xe.length;Nt++){if(at=xe[Nt],B+=at.length,Nt!==xe.length-1)B+=M.length;else if(L)return He();if(!O||at.substring(0,si)!==O){if(wt){if($t=[],rs(at.split(x)),Fi(),V)return He()}else rs(at.split(x));if(R&&R<=Nt)return $t=$t.slice(0,R),He(!0)}}return He()}for(var zt=W.indexOf(x,B),xt=W.indexOf(M,B),ki=new RegExp(m(G)+m(F),"g"),ut=W.indexOf(F,B);;)if(W[B]===F)for(ut=B,B++;;){if((ut=W.indexOf(F,ut+1))===-1)return L||se.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:$t.length,index:B}),Ni();if(ut===ot-1)return Ni(W.substring(B,ut).replace(ki,F));if(F===G&&W[ut+1]===G)ut++;else if(F===G||ut===0||W[ut-1]!==G){zt!==-1&&zt<ut+1&&(zt=W.indexOf(x,ut+1));var Jt=ca((xt=xt!==-1&&xt<ut+1?W.indexOf(M,ut+1):xt)===-1?zt:Math.min(zt,xt));if(W.substr(ut+1+Jt,kt)===x){at.push(W.substring(B,ut).replace(ki,F)),W[B=ut+1+Jt+kt]!==F&&(ut=W.indexOf(F,B)),zt=W.indexOf(x,B),xt=W.indexOf(M,B);break}if(Jt=ca(xt),W.substring(ut+1+Jt,ut+1+Jt+Lt)===M){if(at.push(W.substring(B,ut).replace(ki,F)),Pc(ut+1+Jt+Lt),zt=W.indexOf(x,B),ut=W.indexOf(F,B),wt&&(Fi(),V))return He();if(R&&$t.length>=R)return He(!0);break}se.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:$t.length,index:B}),ut++}}else if(O&&at.length===0&&W.substring(B,B+si)===O){if(xt===-1)return He();B=xt+Lt,xt=W.indexOf(M,B),zt=W.indexOf(x,B)}else if(zt!==-1&&(zt<xt||xt===-1))at.push(W.substring(B,zt)),B=zt+kt,zt=W.indexOf(x,B);else{if(xt===-1)break;if(at.push(W.substring(B,xt)),Pc(xt+Lt),wt&&(Fi(),V))return He();if(R&&$t.length>=R)return He(!0)}return Ni();function rs(Ee){$t.push(Ee),oe=B}function ca(Ee){var En=0;return En=Ee!==-1&&(Ee=W.substring(ut+1,Ee))&&Ee.trim()===""?Ee.length:En}function Ni(Ee){return L||(Ee===void 0&&(Ee=W.substring(B)),at.push(Ee),B=ot,rs(at),wt&&Fi()),He()}function Pc(Ee){B=Ee,rs(at),at=[],xt=W.indexOf(M,B)}function He(Ee){if(w.header&&!q&&$t.length&&!Y){var En=$t[0],mr=Object.create(null),bp=new Set(En);let X0=!1;for(let la=0;la<En.length;la++){let zi=En[la];if(mr[zi=D(w.transformHeader)?w.transformHeader(zi,la):zi]){let Rc,Q0=mr[zi];for(;Rc=zi+"_"+Q0,Q0++,bp.has(Rc););bp.add(Rc),En[la]=Rc,mr[zi]++,X0=!0,(z=z===null?{}:z)[Rc]=zi}else mr[zi]=1,En[la]=zi;bp.add(zi)}X0&&console.warn("Duplicate headers found and renamed."),Y=!0}return{data:$t,errors:se,meta:{delimiter:x,linebreak:M,aborted:V,truncated:!!Ee,cursor:oe+(q||0),renamedHeaders:z}}}function Fi(){T(He()),$t=[],se=[]}},this.abort=function(){V=!0},this.getCharIndex=function(){return B}}function _(w){var x=w.data,M=a[x.workerId],O=!1;if(x.error)M.userError(x.error,x.file);else if(x.results&&x.results.data){var T={abort:function(){O=!0,C(x.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:S,resume:S};if(D(M.userStep)){for(var R=0;R<x.results.data.length&&(M.userStep({data:x.results.data[R],errors:x.results.errors,meta:x.results.meta},T),!O);R++);delete x.results}else D(M.userChunk)&&(M.userChunk(x.results,T,x.file),delete x.results)}x.finished&&!O&&C(x.workerId,x.results)}function C(w,x){var M=a[w];D(M.userComplete)&&M.userComplete(x),M.terminate(),delete a[w]}function S(){throw new Error("Not implemented.")}function k(w){if(typeof w!="object"||w===null)return w;var x,M=Array.isArray(w)?[]:{};for(x in w)M[x]=k(w[x]);return M}function $(w,x){return function(){w.apply(x,arguments)}}function D(w){return typeof w=="function"}return l.parse=function(w,x){var M=(x=x||{}).dynamicTyping||!1;if(D(M)&&(x.dynamicTypingFunction=M,M={}),x.dynamicTyping=M,x.transform=!!D(x.transform)&&x.transform,!x.worker||!l.WORKERS_SUPPORTED)return M=null,l.NODE_STREAM_INPUT,typeof w=="string"?(w=(O=>O.charCodeAt(0)!==65279?O:O.slice(1))(w),M=new(x.download?h:f)(x)):w.readable===!0&&D(w.read)&&D(w.on)?M=new p(x):(i.File&&w instanceof File||w instanceof Object)&&(M=new d(x)),M.stream(w);(M=(()=>{var O;return!!l.WORKERS_SUPPORTED&&(O=(()=>{var T=i.URL||i.webkitURL||null,R=n.toString();return l.BLOB_URL||(l.BLOB_URL=T.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",R,")();"],{type:"text/javascript"})))})(),(O=new i.Worker(O)).onmessage=_,O.id=c++,a[O.id]=O)})()).userStep=x.step,M.userChunk=x.chunk,M.userComplete=x.complete,M.userError=x.error,x.step=D(x.step),x.chunk=D(x.chunk),x.complete=D(x.complete),x.error=D(x.error),delete x.worker,M.postMessage({input:w,config:x,workerId:M.id})},l.unparse=function(w,x){var M=!1,O=!0,T=",",R=`\r
`,j='"',z=j+j,Y=!1,F=null,G=!1,B=((()=>{if(typeof x=="object"){if(typeof x.delimiter!="string"||l.BAD_DELIMITERS.filter(function(q){return x.delimiter.indexOf(q)!==-1}).length||(T=x.delimiter),typeof x.quotes!="boolean"&&typeof x.quotes!="function"&&!Array.isArray(x.quotes)||(M=x.quotes),typeof x.skipEmptyLines!="boolean"&&typeof x.skipEmptyLines!="string"||(Y=x.skipEmptyLines),typeof x.newline=="string"&&(R=x.newline),typeof x.quoteChar=="string"&&(j=x.quoteChar),typeof x.header=="boolean"&&(O=x.header),Array.isArray(x.columns)){if(x.columns.length===0)throw new Error("Option columns is empty");F=x.columns}x.escapeChar!==void 0&&(z=x.escapeChar+j),x.escapeFormulae instanceof RegExp?G=x.escapeFormulae:typeof x.escapeFormulae=="boolean"&&x.escapeFormulae&&(G=/^[=+\-@\t\r].*$/)}})(),new RegExp(m(j),"g"));if(typeof w=="string"&&(w=JSON.parse(w)),Array.isArray(w)){if(!w.length||Array.isArray(w[0]))return V(null,w,Y);if(typeof w[0]=="object")return V(F||Object.keys(w[0]),w,Y)}else if(typeof w=="object")return typeof w.data=="string"&&(w.data=JSON.parse(w.data)),Array.isArray(w.data)&&(w.fields||(w.fields=w.meta&&w.meta.fields||F),w.fields||(w.fields=Array.isArray(w.data[0])?w.fields:typeof w.data[0]=="object"?Object.keys(w.data[0]):[]),Array.isArray(w.data[0])||typeof w.data[0]=="object"||(w.data=[w.data])),V(w.fields||[],w.data||[],Y);throw new Error("Unable to serialize unrecognized input");function V(q,L,ot){var kt="",Lt=(typeof q=="string"&&(q=JSON.parse(q)),typeof L=="string"&&(L=JSON.parse(L)),Array.isArray(q)&&0<q.length),si=!Array.isArray(L[0]);if(Lt&&O){for(var wt=0;wt<q.length;wt++)0<wt&&(kt+=T),kt+=W(q[wt],wt);0<L.length&&(kt+=R)}for(var $t=0;$t<L.length;$t++){var se=(Lt?q:L[$t]).length,at=!1,oe=Lt?Object.keys(L[$t]).length===0:L[$t].length===0;if(ot&&!Lt&&(at=ot==="greedy"?L[$t].join("").trim()==="":L[$t].length===1&&L[$t][0].length===0),ot==="greedy"&&Lt){for(var xe=[],Nt=0;Nt<se;Nt++){var zt=si?q[Nt]:Nt;xe.push(L[$t][zt])}at=xe.join("").trim()===""}if(!at){for(var xt=0;xt<se;xt++){0<xt&&!oe&&(kt+=T);var ki=Lt&&si?q[xt]:xt;kt+=W(L[$t][ki],xt)}$t<L.length-1&&(!ot||0<se&&!oe)&&(kt+=R)}}return kt}function W(q,L){var ot,kt;return q==null?"":q.constructor===Date?JSON.stringify(q).slice(1,25):(kt=!1,G&&typeof q=="string"&&G.test(q)&&(q="'"+q,kt=!0),ot=q.toString().replace(B,z),(kt=kt||M===!0||typeof M=="function"&&M(q,L)||Array.isArray(M)&&M[L]||((Lt,si)=>{for(var wt=0;wt<si.length;wt++)if(-1<Lt.indexOf(si[wt]))return!0;return!1})(ot,l.BAD_DELIMITERS)||-1<ot.indexOf(T)||ot.charAt(0)===" "||ot.charAt(ot.length-1)===" ")?j+ot+j:ot)}},l.RECORD_SEP="",l.UNIT_SEP="",l.BYTE_ORDER_MARK="\uFEFF",l.BAD_DELIMITERS=["\r",`
`,'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!s&&!!i.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=b,l.ParserHandle=g,l.NetworkStreamer=h,l.FileStreamer=d,l.StringStreamer=f,l.ReadableStreamStreamer=p,i.jQuery&&((r=i.jQuery).fn.parse=function(w){var x=w.config||{},M=[];return this.each(function(R){if(!(r(this).prop("tagName").toUpperCase()==="INPUT"&&r(this).attr("type").toLowerCase()==="file"&&i.FileReader)||!this.files||this.files.length===0)return!0;for(var j=0;j<this.files.length;j++)M.push({file:this.files[j],inputElem:this,instanceConfig:r.extend({},x)})}),O(),this;function O(){if(M.length===0)D(w.complete)&&w.complete();else{var R,j,z,Y,F=M[0];if(D(w.before)){var G=w.before(F.file,F.inputElem);if(typeof G=="object"){if(G.action==="abort")return R="AbortError",j=F.file,z=F.inputElem,Y=G.reason,void(D(w.error)&&w.error({name:R},j,z,Y));if(G.action==="skip")return void T();typeof G.config=="object"&&(F.instanceConfig=r.extend(F.instanceConfig,G.config))}else if(G==="skip")return void T()}var B=F.instanceConfig.complete;F.instanceConfig.complete=function(V){D(B)&&B(V,F.file,F.inputElem),T()},l.parse(F.file,F.instanceConfig)}}function T(){M.splice(0,1),O()}}),o&&(i.onmessage=function(w){w=w.data,l.WORKER_ID===void 0&&w&&(l.WORKER_ID=w.workerId),typeof w.input=="string"?i.postMessage({workerId:l.WORKER_ID,results:l.parse(w.input,w.config),finished:!0}):(i.File&&w.input instanceof File||w.input instanceof Object)&&(w=l.parse(w.input,w.config))&&i.postMessage({workerId:l.WORKER_ID,results:w,finished:!0})}),(h.prototype=Object.create(u.prototype)).constructor=h,(d.prototype=Object.create(u.prototype)).constructor=d,(f.prototype=Object.create(f.prototype)).constructor=f,(p.prototype=Object.create(u.prototype)).constructor=p,l})})(ld)),ld.exports}var kB=CB();const SB=wB(kB),EB=e=>{const t=e.map(i=>i.toLocaleLowerCase()),n=i=>{const r=t.findIndex(s=>i.some(o=>s.includes(o)));return r!==-1?e[r]:void 0};return{date:n(["date","time"]),amount:n(["amount","value","cost","price","debit"]),credit:n(["credit","payment"]),description:n(["description","merchant","payee","name","memo"]),account:n(["account","source","card"])}},MB=e=>new Promise((t,n)=>{SB.parse(e,{header:!0,skipEmptyLines:!0,complete:({data:i,meta:r,errors:s})=>{const o=EB(r.fields||[]);t({data:i,meta:r,errors:s,suggestedMapping:o})},error:i=>{n(i)}})});var DB=Object.defineProperty,$B=Object.getOwnPropertyDescriptor,hD=e=>{throw TypeError(e)},aa=(e,t,n,i)=>{for(var r=i>1?void 0:i?$B(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&DB(t,n,r),r},TB=(e,t,n)=>t.has(e)||hD("Cannot "+n),OB=(e,t,n)=>t.has(e)?hD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ss=(e,t,n)=>(TB(e,t,"access private method"),n),Qi,dD,fD,pD,gD,mD,vD,yD,bD;const IB=[{key:"date",label:"Date"},{key:"amount",label:"Debit"},{key:"credit",label:"Credit"},{key:"description",label:"Description"},{key:"account",label:"Account"}];let Xr=class extends pp(mt){constructor(){super(...arguments),OB(this,Qi),this._step="upload",this._mapping={},this._accounts=[],this._accountName="",this._importMode="append"}async loadFile(e){await this.withBusy(async()=>{this._accounts=await ke.all(),this._result=await MB(e),this._mapping={...this._result.suggestedMapping},this._step="mapping"})}render(){return E`
      ${this._step==="upload"?Ss(this,Qi,yD).call(this):Ss(this,Qi,bD).call(this)}
    `}};Qi=new WeakSet;dD=async function(e){const t=e.target;!t.files||t.files.length===0||await this.loadFile(t.files[0])};fD=function(e){this._accountName=e.target.value};pD=function(e){this._importMode=e.target.value};gD=function(e,t){const i=t.target.value||void 0;this._mapping={...this._mapping,[e]:i}};mD=async function(){if(this._mapping.account)return;const e=this._accountName.trim();if(!e)return;const t=this._accounts.find(n=>n.name.toLowerCase()===e.toLowerCase());return t?t.id:(await ke.create({name:e})).id};vD=async function(){this._result&&await this.withBusy(async()=>{const e=!this._mapping.account,t=await Ss(this,Qi,mD).call(this);if(!(e&&t===void 0)){Lv("Importing transactions...");try{const n=await yB(this._result.data,this._mapping,{accountId:t,importMode:this._importMode});this.dispatchEvent(new CustomEvent("imported",{detail:{count:n}})),this._step="upload",this._result=void 0,this._mapping={},this._accountName="",this._importMode="append"}finally{Nv()}}})};yD=function(){return E`
      <label for="file-upload">Select a CSV file:</label>
      <input type="file" id="file-upload" accept=".csv" @change=${Ss(this,Qi,dD)} />
    `};bD=function(){if(!this._result)return nt;const e=this._result.meta.fields??[],t=this._result.data.slice(0,5);return E`
      <h4>Column Mapping</h4>
      <div class="mapping-form">
        ${IB.map(({key:n,label:i})=>E`
          <label>${i}:</label>
          <select @change=${r=>Ss(this,Qi,gD).call(this,n,r)}>
            <option value="">-- Unmapped --</option>
            ${e.map(r=>E`
              <option value=${r} ?selected=${this._mapping[n]===r}>${r}</option>
            `)}
          </select>
        `)}
      </div>

      ${this._mapping.account?nt:E`
        <h4>Account</h4>
        <div class="mapping-form">
          <label>Account:</label>
          <input
            type="text"
            list="account-options"
            .value=${this._accountName}
            @input=${Ss(this,Qi,fD)}
            placeholder="Type or select an account"
          />
          <datalist id="account-options">
            ${this._accounts.map(n=>E`<option value=${n.name}></option>`)}
          </datalist>
        </div>
      `}

      <div class="mapping-form">
        <label>Mode:</label>
        <select @change=${Ss(this,Qi,pD)}>
          <option value="append" ?selected=${this._importMode==="append"}>Append to existing</option>
          <option value="replace" ?selected=${this._importMode==="replace"}>Replace existing transactions</option>
        </select>
      </div>

      <button @click=${Ss(this,Qi,vD)}>Import</button>

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
    `};Xr.styles=[Li,pr,fp,Jr,dt`
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
    `];aa([P()],Xr.prototype,"_step",2);aa([P()],Xr.prototype,"_result",2);aa([P()],Xr.prototype,"_mapping",2);aa([P()],Xr.prototype,"_accounts",2);aa([P()],Xr.prototype,"_accountName",2);aa([P()],Xr.prototype,"_importMode",2);Xr=aa([Et("transaction-importer")],Xr);var PB=Object.defineProperty,RB=Object.getOwnPropertyDescriptor,_D=e=>{throw TypeError(e)},Sn=(e,t,n,i)=>{for(var r=i>1?void 0:i?RB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&PB(t,n,r),r},V0=(e,t,n)=>t.has(e)||_D("Cannot "+n),_g=(e,t,n)=>(V0(e,t,"read from private field"),n?n.call(e):t.get(e)),wg=(e,t,n)=>t.has(e)?_D("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Gw=(e,t,n,i)=>(V0(e,t,"write to private field"),t.set(e,n),n),J=(e,t,n)=>(V0(e,t,"access private method"),n),Sl,ud,X,Km,Ko,wD,Ou,xD,CD,kD,Sa,Ea,Gm,SD,ED,MD,DD,$D,TD,hh,OD,ID,q0,PD,RD,Xm,Qm,AD,LD;let We=class extends pp(mt){constructor(){super(...arguments),wg(this,X),this._transactions=null,this._tags=[],this._tagMap=new Map,this._merchants=new Map,this._merchantList=[],this._currentPage=1,this._pageSize=50,this._filter="",this._sortCol="date",this._sortDir="desc",this._selectedIds=new Set,this._excludeTagIds=new Set,this._noMerchant=!1,this._bulkMerchantName="",this._showImporter=!1,wg(this,Sl,[]),wg(this,ud,e=>{const t=e.detail.file;this._showImporter=!0,this.updateComplete.then(()=>{const n=this.shadowRoot?.querySelector("transaction-importer");n&&n.loadFile(t)})})}connectedCallback(){super.connectedCallback(),J(this,X,Ko).call(this),document.addEventListener("budgee-import-csv",_g(this,ud));const e=Zo(()=>J(this,X,Ko).call(this),300);Promise.all([_e.subscribe(e),pe.subscribe(e),Ie.subscribe(e)]).then(t=>{Gw(this,Sl,t)})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-import-csv",_g(this,ud));for(const e of _g(this,Sl))e.unsubscribe();Gw(this,Sl,[])}render(){if(this._transactions===null)return E`
        <budgee-skeleton variant="table" rows="8"></budgee-skeleton>
      `;if(this._transactions.length===0)return E`
        <budgee-empty-state
          heading="No transactions yet"
          description="Import a CSV file to get started."
        >
          <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>Import CSV</button>
        </budgee-empty-state>
        ${this._showImporter?E`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${J(this,X,Km)}></transaction-importer></budgee-modal>`:""}
      `;const e=this._transactions.filter(o=>J(this,X,kD).call(this,o)),t=J(this,X,ED).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize),r=i.map(o=>o.id),s=r.length>0&&r.every(o=>this._selectedIds.has(o));return E`
      <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>
        Import CSV
      </button>
      ${this._showImporter?E`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${J(this,X,Km)}></transaction-importer></budgee-modal>`:nt}
      ${J(this,X,AD).call(this)}
      ${J(this,X,LD).call(this)}
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${50}
        storageKey="transactions"
        ?filterable=${!0}
        @page-change=${J(this,X,xD)}
        @filter-change=${J(this,X,CD)}
      >
        <table>
          <thead>
            <tr>
              <th class="col-checkbox">
                <input
                  type="checkbox"
                  .checked=${s}
                  @change=${()=>J(this,X,TD).call(this,i)}
                />
              </th>
              <th class="sortable col-date" @click=${()=>J(this,X,Sa).call(this,"date")}>
                Date${J(this,X,Ea).call(this,"date")}
              </th>
              <th class="sortable" @click=${()=>J(this,X,Sa).call(this,"merchant")}>
                Merchant${J(this,X,Ea).call(this,"merchant")}
              </th>
              <th class="sortable" @click=${()=>J(this,X,Sa).call(this,"description")}>
                Description${J(this,X,Ea).call(this,"description")}
              </th>
              <th class="sortable col-amount" @click=${()=>J(this,X,Sa).call(this,"amount")}>
                Amount${J(this,X,Ea).call(this,"amount")}
              </th>
              <th class="sortable col-tags" @click=${()=>J(this,X,Sa).call(this,"tags")}>
                Tags${J(this,X,Ea).call(this,"tags")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(o=>E`
              <tr @click=${()=>J(this,X,DD).call(this,o.id)}>
                <td class="col-checkbox" @click=${a=>a.stopPropagation()}>
                  <input
                    type="checkbox"
                    .checked=${this._selectedIds.has(o.id)}
                    @change=${()=>J(this,X,$D).call(this,o.id)}
                  />
                </td>
                <td class="col-date">${J(this,X,SD).call(this,o.date)}</td>
                <td>${o.merchantId&&this._merchants.has(o.merchantId)?E`<a class="merchant-link" @click=${a=>{a.stopPropagation(),J(this,X,MD).call(this,o.merchantId)}}>${this._merchants.get(o.merchantId)}</a>`:""}</td>
                <td>${this._filter?mB(o.description,this._filter):o.description}</td>
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
    `}};Sl=new WeakMap;ud=new WeakMap;X=new WeakSet;Km=async function(){await this.withBusy(async()=>{this._showImporter=!1,await J(this,X,Ko).call(this)})};Ko=async function(){const[e,t,n]=await Promise.all([_e.all(),pe.all(),Ie.all()]);this._transactions=e,this._tags=t,this._tagMap=new Map(t.map(i=>[i.id,i])),this._merchants=new Map(n.map(i=>[i.id,i.name])),this._merchantList=n};wD=function(e){return this._tagMap.get(e)};Ou=function(e){return J(this,X,wD).call(this,e)?.name??`#${e}`};xD=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};CD=function(e){this._filter=e.detail.filter,this._currentPage=1};kD=function(e){if(this._noMerchant&&e.merchantId||e.tagIds.some(n=>this._excludeTagIds.has(n)))return!1;if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.description.toLowerCase().includes(t)||e.tagIds.some(n=>J(this,X,Ou).call(this,n).toLowerCase().includes(t))||e.merchantId&&this._merchants.get(e.merchantId)?.toLowerCase().includes(t)||e.date.includes(t)||e.amount.toFixed(2).includes(t))};Sa=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};Ea=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};Gm=function(e){return e?this._merchants.get(e)??"":""};SD=function(e){const[t,n,i]=e.split("-");return new Date(Number(t),Number(n)-1,Number(i)).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})};ED=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="date")s=i.date.localeCompare(r.date);else if(t==="merchant")s=J(this,X,Gm).call(this,i.merchantId).localeCompare(J(this,X,Gm).call(this,r.merchantId));else if(t==="description")s=i.description.localeCompare(r.description);else if(t==="amount")s=i.amount-r.amount;else if(t==="tags"){const o=i.tagIds.map(c=>J(this,X,Ou).call(this,c)).join(","),a=r.tagIds.map(c=>J(this,X,Ou).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};MD=function(e){wc(`/merchants/${e}`)};DD=function(e){wc(`/transactions/${e}`)};$D=function(e){const t=new Set(this._selectedIds);t.has(e)?t.delete(e):t.add(e),this._selectedIds=t};TD=function(e){const t=e.map(i=>i.id);if(t.every(i=>this._selectedIds.has(i))){const i=new Set(this._selectedIds);for(const r of t)i.delete(r);this._selectedIds=i}else this._selectedIds=new Set([...this._selectedIds,...t])};hh=function(){this._selectedIds=new Set,this._bulkMerchantName=""};OD=async function(e){const n=e.detail.tag.id;await J(this,X,q0).call(this,n)};ID=async function(e){const t=e.detail.name,n=await pe.create(t);await J(this,X,q0).call(this,n.id)};q0=async function(e){this._transactions&&await this.withBusy(async()=>{const t=this._transactions.filter(n=>this._selectedIds.has(n.id)&&!n.tagIds.includes(e)).map(n=>({...n,tagIds:[...n.tagIds,e]}));t.length>0&&await _e.bulkPut(t),Ci({message:`Tag applied to ${t.length} transaction(s)`,type:"success"}),J(this,X,hh).call(this),await J(this,X,Ko).call(this)})};PD=async function(){const e=this._bulkMerchantName.trim();!e||!this._transactions||await this.withBusy(async()=>{let t=this._merchantList.find(i=>i.name.toLowerCase()===e.toLowerCase());t||(t=await Ie.create(e));const n=this._transactions.filter(i=>this._selectedIds.has(i.id)).map(i=>({...i,merchantId:t.id}));n.length>0&&await _e.bulkPut(n),Ci({message:`Merchant assigned to ${n.length} transaction(s)`,type:"success"}),J(this,X,hh).call(this),await J(this,X,Ko).call(this)})};RD=async function(){if(!this._transactions)return;const e=this._selectedIds.size;await _i.show({heading:"Delete Transactions",message:`Delete ${e} selected transaction${e===1?"":"s"}? This cannot be undone.`,confirmLabel:"Delete",danger:!0})&&await this.withBusy(async()=>{const n=[...this._selectedIds];await _e.bulkRemove(n),Ci({message:`${n.length} transaction(s) deleted`,type:"success"}),J(this,X,hh).call(this),await J(this,X,Ko).call(this)})};Xm=function(e){const t=new Set(this._excludeTagIds);t.has(e)?t.delete(e):t.add(e),this._excludeTagIds=t,this._currentPage=1};Qm=function(){this._noMerchant=!this._noMerchant,this._currentPage=1};AD=function(){const e=this._excludeTagIds.size>0||this._noMerchant;return E`
      <div class="filter-bar">
        <div class="filter-group">
          <label>Exclude tag:</label>
          <select @change=${t=>{const n=t.target.value;n&&J(this,X,Xm).call(this,n),t.target.value=""}}>
            <option value="">Select…</option>
            ${this._tags.filter(t=>!this._excludeTagIds.has(t.id)).map(t=>E`<option value=${t.id}>${t.name}</option>`)}
          </select>
        </div>
        <div class="filter-group">
          <label>
            <input type="checkbox" .checked=${this._noMerchant} @change=${J(this,X,Qm)} />
            No merchant
          </label>
        </div>
        ${e?E`
            <div class="active-filters">
              ${[...this._excludeTagIds].map(t=>E`
                  <span class="filter-chip">
                    Not: ${J(this,X,Ou).call(this,t)}
                    <button class="chip-remove" @click=${()=>J(this,X,Xm).call(this,t)}>×</button>
                  </span>
                `)}
              ${this._noMerchant?E`<span class="filter-chip">
                    No merchant
                    <button class="chip-remove" @click=${J(this,X,Qm)}>×</button>
                  </span>`:nt}
            </div>
          `:nt}
      </div>
    `};LD=function(){return this._selectedIds.size===0?nt:E`
      <div class="bulk-bar">
        <span class="selected-count">${this._selectedIds.size} selected</span>
        <div class="bulk-action">
          <label>Tag:</label>
          <tag-autocomplete
            .tags=${this._tags}
            .selectedTagIds=${[]}
            .excludeIds=${[]}
            @tag-selected=${J(this,X,OD)}
            @tag-created=${J(this,X,ID)}
          ></tag-autocomplete>
        </div>
        <div class="bulk-action">
          <label>Merchant:</label>
          <merchant-autocomplete
            .merchants=${this._merchantList}
            .value=${this._bulkMerchantName}
            @merchant-changed=${e=>{this._bulkMerchantName=e.detail.name}}
          ></merchant-autocomplete>
          <button @click=${J(this,X,PD)} ?disabled=${!this._bulkMerchantName.trim()}>
            Set
          </button>
        </div>
        <button class="danger" @click=${J(this,X,RD)}>Delete selected</button>
        <button @click=${J(this,X,hh)}>Clear selection</button>
      </div>
    `};We.styles=[Li,fp,pr,Jr,dt`
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
    `];Sn([P()],We.prototype,"_transactions",2);Sn([P()],We.prototype,"_tags",2);Sn([P()],We.prototype,"_merchants",2);Sn([P()],We.prototype,"_merchantList",2);Sn([P()],We.prototype,"_currentPage",2);Sn([P()],We.prototype,"_pageSize",2);Sn([P()],We.prototype,"_filter",2);Sn([P()],We.prototype,"_sortCol",2);Sn([P()],We.prototype,"_sortDir",2);Sn([P()],We.prototype,"_selectedIds",2);Sn([P()],We.prototype,"_excludeTagIds",2);Sn([P()],We.prototype,"_noMerchant",2);Sn([P()],We.prototype,"_bulkMerchantName",2);Sn([P()],We.prototype,"_showImporter",2);We=Sn([Et("transaction-list")],We);var AB=Object.defineProperty,LB=Object.getOwnPropertyDescriptor,ND=e=>{throw TypeError(e)},K0=(e,t,n,i)=>{for(var r=i>1?void 0:i?LB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&AB(t,n,r),r},G0=(e,t,n)=>t.has(e)||ND("Cannot "+n),Tn=(e,t,n)=>(G0(e,t,"read from private field"),n?n.call(e):t.get(e)),ss=(e,t,n)=>t.has(e)?ND("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),bf=(e,t,n,i)=>(G0(e,t,"write to private field"),t.set(e,n),n),xg=(e,t,n)=>(G0(e,t,"access private method"),n),Xw=(e,t,n,i)=>({set _(r){bf(e,t,r)},get _(){return Tn(e,t,i)}}),Ma,Wa,El,Zm,hd,FD,dd,fd,pd,gd;let Iu=class extends mt{constructor(){super(...arguments),ss(this,El),this._dragOver=!1,this._showShortcuts=!1,ss(this,Ma,0),ss(this,Wa),this._router=new HD(this,[{path:"/",render:()=>E`
          <budgee-dashboard></budgee-dashboard>
        `},{path:"/transactions",render:()=>E`
          <transaction-list></transaction-list>
        `},{path:"/transactions/:id",render:({id:e})=>E`<transaction-detail .transactionId=${e}></transaction-detail>`,enter:async()=>(await Ia(()=>import("./TransactionDetail-ByBY5LBN.js"),[]),!0)},{path:"/accounts",render:()=>E`
          <account-list></account-list>
        `},{path:"/accounts/:id",render:({id:e})=>E`<account-detail .accountId=${e}></account-detail>`,enter:async()=>(await Ia(()=>import("./AccountDetail-CIo3lxRL.js"),[]),!0)},{path:"/merchants",render:()=>E`
          <merchant-list></merchant-list>
        `},{path:"/merchants/:id",render:({id:e})=>E`<merchant-detail .merchantId=${e}></merchant-detail>`,enter:async()=>(await Ia(()=>import("./MerchantDetail-BFVWv_u9.js"),[]),!0)},{path:"/tags",render:()=>E`
          <tag-manager></tag-manager>
        `},{path:"/rules",render:()=>E`
          <rule-manager></rule-manager>
        `},{path:"/settings",render:()=>E`
          <budgee-settings @budgee-sync-settings-changed=${()=>xg(this,El,Zm).call(this)}></budgee-settings>
        `}]),ss(this,hd,e=>{const t=e.target,n=t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable;e.key==="?"&&!n&&!e.metaKey&&!e.ctrlKey&&(e.preventDefault(),this._showShortcuts=!this._showShortcuts)}),ss(this,dd,e=>{e.preventDefault()}),ss(this,fd,e=>{e.preventDefault(),Xw(this,Ma)._++,this._dragOver=!0}),ss(this,pd,e=>{Xw(this,Ma)._--,Tn(this,Ma)===0&&(this._dragOver=!1)}),ss(this,gd,async e=>{e.preventDefault(),bf(this,Ma,0),this._dragOver=!1;const t=e.dataTransfer?.files[0];if(t){if(t.name.endsWith(".csv"))wc("/transactions"),await this.updateComplete,document.dispatchEvent(new CustomEvent("budgee-import-csv",{detail:{file:t}}));else if(t.name.endsWith(".json")){if(!await _i.show({heading:"Import Database",message:"This will replace all existing data. Are you sure?",confirmLabel:"Import",danger:!0}))return;Lv("Importing database...");try{await Jx(t),window.location.reload()}finally{Nv()}}}})}connectedCallback(){super.connectedCallback(),xg(this,El,FD).call(this),document.addEventListener("keydown",Tn(this,hd)),this.addEventListener("dragover",Tn(this,dd)),this.addEventListener("dragenter",Tn(this,fd)),this.addEventListener("dragleave",Tn(this,pd)),this.addEventListener("drop",Tn(this,gd)),R4(),Z().then(e=>n2(e)).catch(e=>{console.error(e);const t=e instanceof Zx,n=t?"The database schema is incompatible with this version of the app and can't be opened. You can export the raw data for safekeeping, then delete the database to get unstuck.":e instanceof Error?e.message:String(e);Xg(n,{isDatabaseError:t})}),xg(this,El,Zm).call(this)}disconnectedCallback(){var e;super.disconnectedCallback(),document.removeEventListener("keydown",Tn(this,hd)),this.removeEventListener("dragover",Tn(this,dd)),this.removeEventListener("dragenter",Tn(this,fd)),this.removeEventListener("dragleave",Tn(this,pd)),this.removeEventListener("drop",Tn(this,gd)),(e=Tn(this,Wa))==null||e.call(this)}navLink(e,t,n){const i=window.location.pathname,r=e==="/"?i==="/":i.startsWith(e);return E`<a href=${e} class=${ov({active:r})}>${ye(n)} ${t}</a>`}render(){return E`
      <h1 class="app-name">${ye(_2)} Budgee</h1>
      <nav>
        ${this.navLink("/","Dashboard",U4)}
        ${this.navLink("/transactions","Transactions",P2)}
        ${this.navLink("/accounts","Accounts",Y4)}
        ${this.navLink("/merchants","Merchants",R2)}
        ${this.navLink("/tags","Tags",K4)}
        ${this.navLink("/rules","Rules",V4)}
        ${this.navLink("/settings","Settings",q4)}
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
          </budgee-modal>`:nt}
      ${this._dragOver?E`
              <div class="drop-overlay">Drop file to import</div>
            `:nt}
    `}};Ma=new WeakMap;Wa=new WeakMap;El=new WeakSet;Zm=async function(){const e=Tn(this,Wa);bf(this,Wa,void 0),await e?.();let t;try{t=localStorage.getItem("budgee-sync-url")}catch{return}if(t)try{bf(this,Wa,await w4(t))}catch(n){console.error("Failed to start replication:",n)}};hd=new WeakMap;FD=function(){try{const e=localStorage.getItem("budgee-theme");e==="light"||e==="dark"?document.documentElement.dataset.theme=e:delete document.documentElement.dataset.theme}catch{}};dd=new WeakMap;fd=new WeakMap;pd=new WeakMap;gd=new WeakMap;Iu.styles=dt`
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
  `;K0([P()],Iu.prototype,"_dragOver",2);K0([P()],Iu.prototype,"_showShortcuts",2);Iu=K0([Et("budgee-app")],Iu);export{nt as A,pp as B,yd as C,eu as D,XB as E,Ya as F,QB as G,nx as H,oI as I,$l as J,Dl as K,n9 as L,Ie as M,Ri as N,B$ as O,U as P,$f as Q,JB as R,Fe as S,_e as T,Q as U,z$ as V,t9 as W,pe as a,E as b,Ke as c,Zo as d,Tj as e,Li as f,fp as g,dt as h,mt as i,H as j,Et as k,ke as l,Oj as m,wc as n,i9 as o,X4 as p,za as q,P as r,Ij as s,Jr as t,Dw as u,r9 as v,wB as w,yi as x,Vt as y,Ai as z};
