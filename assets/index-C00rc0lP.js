(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const v1="modulepreload",b1=function(e){return"/"+e},mf={},fa=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=c(n.map(l=>{if(l=b1(l),l in mf)return;mf[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":v1,h||(d.as="script"),d.crossOrigin="",d.href=l,o&&d.setAttribute("nonce",o),document.head.appendChild(d),h)return new Promise((f,p)=>{d.addEventListener("load",f),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};const vf=new WeakMap,bf=e=>{if((n=>n.pattern!==void 0)(e))return e.pattern;let t=vf.get(e);return t===void 0&&vf.set(e,t=new URLPattern({pathname:e.path})),t};let _1=class{constructor(t,n,i){this.routes=[],this.o=[],this.t={},this.i=s=>{if(s.routes===this)return;const r=s.routes;this.o.push(r),r.h=this,s.stopImmediatePropagation(),s.onDisconnect=()=>{this.o?.splice(this.o.indexOf(r)>>>0,1)};const a=_f(this.t);a!==void 0&&r.goto(a)},(this.l=t).addController(this),this.routes=[...n],this.fallback=i?.fallback}link(t){if(t?.startsWith("/"))return t;if(t?.startsWith("."))throw Error("Not implemented");return t??=this.u,(this.h?.link()??"")+t}async goto(t){let n;if(this.routes.length===0&&this.fallback===void 0)n=t,this.u="",this.t={0:n};else{const i=this.p(t);if(i===void 0)throw Error("No route found for "+t);const s=bf(i).exec({pathname:t}),r=s?.pathname.groups??{};if(n=_f(r),typeof i.enter=="function"&&await i.enter(r)===!1)return;this.v=i,this.t=r,this.u=n===void 0?t:t.substring(0,t.length-n.length)}if(n!==void 0)for(const i of this.o)i.goto(n);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(t){const n=this.routes.find((i=>bf(i).test({pathname:t})));return n||this.fallback===void 0?n:this.fallback?{...this.fallback,path:"/*"}:void 0}hostConnected(){this.l.addEventListener(Fh.eventName,this.i);const t=new Fh(this);this.l.dispatchEvent(t),this._=t.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}};const _f=e=>{let t;for(const n of Object.keys(e))/\d+/.test(n)&&(t===void 0||n>t)&&(t=n);return t&&e[t]};let Fh=class Cm extends Event{constructor(t){super(Cm.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}};Fh.eventName="lit-routes-connected";const y1=location.origin||location.protocol+"//"+location.host;let w1=class extends _1{constructor(){super(...arguments),this.m=t=>{const n=t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey;if(t.defaultPrevented||n)return;const i=t.composedPath().find((a=>a.tagName==="A"));if(i===void 0||i.target!==""||i.hasAttribute("download")||i.getAttribute("rel")==="external")return;const s=i.href;if(s===""||s.startsWith("mailto:"))return;const r=window.location;i.origin===y1&&(t.preventDefault(),s!==r.href&&(window.history.pushState({},"",s),this.goto(i.pathname)))},this.R=t=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener("click",this.m),window.addEventListener("popstate",this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener("click",this.m),window.removeEventListener("popstate",this.R)}};const qo=globalThis,Vu=qo.ShadowRoot&&(qo.ShadyCSS===void 0||qo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Uu=Symbol(),yf=new WeakMap;let Mm=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Uu)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Vu&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=yf.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&yf.set(n,t))}return t}toString(){return this.cssText}};const x1=e=>new Mm(typeof e=="string"?e:e+"",void 0,Uu),mt=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1],e[0]);return new Mm(n,e,Uu)},S1=(e,t)=>{if(Vu)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=qo.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},wf=Vu?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return x1(n)})(e):e;const{is:k1,defineProperty:C1,getOwnPropertyDescriptor:M1,getOwnPropertyNames:E1,getOwnPropertySymbols:D1,getPrototypeOf:$1}=Object,ll=globalThis,xf=ll.trustedTypes,I1=xf?xf.emptyScript:"",P1=ll.reactiveElementPolyfillSupport,pa=(e,t)=>e,wc={toAttribute(e,t){switch(t){case Boolean:e=e?I1:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},qu=(e,t)=>!k1(e,t),Sf={attribute:!0,type:String,converter:wc,reflect:!1,useDefault:!1,hasChanged:qu};Symbol.metadata??=Symbol("metadata"),ll.litPropertyMetadata??=new WeakMap;let Gs=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Sf){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&C1(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:r}=M1(this.prototype,t)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){const o=s?.call(this);r?.call(this,a),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Sf}static _$Ei(){if(this.hasOwnProperty(pa("elementProperties")))return;const t=$1(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pa("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pa("properties"))){const n=this.properties,i=[...E1(n),...D1(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(wf(s))}else t!==void 0&&n.push(wf(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:wc).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:wc;this._$Em=s;const o=a.fromAttribute(n,r.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,n,i,s=!1,r){if(t!==void 0){const a=this.constructor;if(s===!1&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??qu)(r,n)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??n??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:a}=r,o=this[s];a!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,r,o)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};Gs.elementStyles=[],Gs.shadowRootOptions={mode:"open"},Gs[pa("elementProperties")]=new Map,Gs[pa("finalized")]=new Map,P1?.({ReactiveElement:Gs}),(ll.reactiveElementVersions??=[]).push("2.1.2");const Ku=globalThis,kf=e=>e,xc=Ku.trustedTypes,Cf=xc?xc.createPolicy("lit-html",{createHTML:e=>e}):void 0,Em="$lit$",bi=`lit$${Math.random().toFixed(9).slice(2)}$`,Dm="?"+bi,O1=`<${Dm}>`,bs=document,Ia=()=>bs.createComment(""),Pa=e=>e===null||typeof e!="object"&&typeof e!="function",Yu=Array.isArray,T1=e=>Yu(e)||typeof e?.[Symbol.iterator]=="function",Ul=`[ 	
\f\r]`,Nr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mf=/-->/g,Ef=/>/g,qi=RegExp(`>|${Ul}(?:([^\\s"'>=/]+)(${Ul}*=${Ul}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Df=/'/g,$f=/"/g,$m=/^(?:script|style|textarea|title)$/i,A1=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),k=A1(1),Ti=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),If=new WeakMap,hs=bs.createTreeWalker(bs,129);function Im(e,t){if(!Yu(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Cf!==void 0?Cf.createHTML(t):t}const R1=(e,t)=>{const n=e.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",a=Nr;for(let o=0;o<n;o++){const c=e[o];let l,h,u=-1,d=0;for(;d<c.length&&(a.lastIndex=d,h=a.exec(c),h!==null);)d=a.lastIndex,a===Nr?h[1]==="!--"?a=Mf:h[1]!==void 0?a=Ef:h[2]!==void 0?($m.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=qi):h[3]!==void 0&&(a=qi):a===qi?h[0]===">"?(a=s??Nr,u=-1):h[1]===void 0?u=-2:(u=a.lastIndex-h[2].length,l=h[1],a=h[3]===void 0?qi:h[3]==='"'?$f:Df):a===$f||a===Df?a=qi:a===Mf||a===Ef?a=Nr:(a=qi,s=void 0);const f=a===qi&&e[o+1].startsWith("/>")?" ":"";r+=a===Nr?c+O1:u>=0?(i.push(l),c.slice(0,u)+Em+c.slice(u)+bi+f):c+bi+(u===-2?o:f)}return[Im(e,r+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Oa{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let r=0,a=0;const o=t.length-1,c=this.parts,[l,h]=R1(t,n);if(this.el=Oa.createElement(l,i),hs.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=hs.nextNode())!==null&&c.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(Em)){const d=h[a++],f=s.getAttribute(u).split(bi),p=/([.?@])?(.*)/.exec(d);c.push({type:1,index:r,name:p[2],strings:f,ctor:p[1]==="."?N1:p[1]==="?"?F1:p[1]==="@"?B1:hl}),s.removeAttribute(u)}else u.startsWith(bi)&&(c.push({type:6,index:r}),s.removeAttribute(u));if($m.test(s.tagName)){const u=s.textContent.split(bi),d=u.length-1;if(d>0){s.textContent=xc?xc.emptyScript:"";for(let f=0;f<d;f++)s.append(u[f],Ia()),hs.nextNode(),c.push({type:2,index:++r});s.append(u[d],Ia())}}}else if(s.nodeType===8)if(s.data===Dm)c.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(bi,u+1))!==-1;)c.push({type:7,index:r}),u+=bi.length-1}r++}}static createElement(t,n){const i=bs.createElement("template");return i.innerHTML=t,i}}function ur(e,t,n=e,i){if(t===Ti)return t;let s=i!==void 0?n._$Co?.[i]:n._$Cl;const r=Pa(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=s:n._$Cl=s),s!==void 0&&(t=ur(e,s._$AS(e,t.values),s,i)),t}class L1{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=(t?.creationScope??bs).importNode(n,!0);hs.currentNode=s;let r=hs.nextNode(),a=0,o=0,c=i[0];for(;c!==void 0;){if(a===c.index){let l;c.type===2?l=new no(r,r.nextSibling,this,t):c.type===1?l=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(l=new z1(r,this,t)),this._$AV.push(l),c=i[++o]}a!==c?.index&&(r=hs.nextNode(),a++)}return hs.currentNode=bs,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class no{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=ur(this,t,n),Pa(t)?t===G||t==null||t===""?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==Ti&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):T1(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&Pa(this._$AH)?this._$AA.nextSibling.data=t:this.T(bs.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Oa.createElement(Im(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(n);else{const r=new L1(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=If.get(t.strings);return n===void 0&&If.set(t.strings,n=new Oa(t)),n}k(t){Yu(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const r of t)s===n.length?n.push(i=new no(this.O(Ia()),this.O(Ia()),this,this.options)):i=n[s],i._$AI(r),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=kf(t).nextSibling;kf(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class hl{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,n=this,i,s){const r=this.strings;let a=!1;if(r===void 0)t=ur(this,t,n,0),a=!Pa(t)||t!==this._$AH&&t!==Ti,a&&(this._$AH=t);else{const o=t;let c,l;for(t=r[0],c=0;c<r.length-1;c++)l=ur(this,o[i+c],n,c),l===Ti&&(l=this._$AH[c]),a||=!Pa(l)||l!==this._$AH[c],l===G?t=G:t!==G&&(t+=(l??"")+r[c+1]),this._$AH[c]=l}a&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class N1 extends hl{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class F1 extends hl{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class B1 extends hl{constructor(t,n,i,s,r){super(t,n,i,s,r),this.type=5}_$AI(t,n=this){if((t=ur(this,t,n,0)??G)===Ti)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class z1{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ur(this,t)}}const j1=Ku.litHtmlPolyfillSupport;j1?.(Oa,no),(Ku.litHtmlVersions??=[]).push("3.3.2");const W1=(e,t,n)=>{const i=n?.renderBefore??t;let s=i._$litPart$;if(s===void 0){const r=n?.renderBefore??null;i._$litPart$=s=new no(t.insertBefore(Ia(),r),r,void 0,n??{})}return s._$AI(e),s};const Xu=globalThis;let gt=class extends Gs{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=W1(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ti}};gt._$litElement$=!0,gt.finalized=!0,Xu.litElementHydrateSupport?.({LitElement:gt});const H1=Xu.litElementPolyfillSupport;H1?.({LitElement:gt});(Xu.litElementVersions??=[]).push("4.2.2");const $t=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const V1={attribute:!0,type:String,converter:wc,reflect:!1,hasChanged:qu},U1=(e=V1,t,n)=>{const{kind:i,metadata:s}=n;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),i==="accessor"){const{name:a}=n;return{set(o){const c=t.get.call(this);t.set.call(this,o),this.requestUpdate(a,c,e,!0,o)},init(o){return o!==void 0&&this.C(a,void 0,e,o),o}}}if(i==="setter"){const{name:a}=n;return function(o){const c=this[a];t.call(this,o),this.requestUpdate(a,c,e,!0,o)}}throw Error("Unsupported decorator location: "+i)};function Q(e){return(t,n)=>typeof n=="object"?U1(e,t,n):((i,s,r)=>{const a=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),a?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,n)}function I(e){return Q({...e,state:!0,attribute:!1})}const Pm={ATTRIBUTE:1,CHILD:2},Om=e=>(...t)=>({_$litDirective$:e,values:t});class Tm{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}}const q1=Om(class extends Tm{constructor(e){if(super(e),e.type!==Pm.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const n=e.element.classList;for(const i of this.st)i in t||(n.remove(i),this.st.delete(i));for(const i in t){const s=!!t[i];s===this.st.has(i)||this.nt?.has(i)||(s?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return Ti}});class Bh extends Tm{constructor(t){if(super(t),this.it=G,t.type!==Pm.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===G||t==null)return this._t=void 0,this.it=t;if(t===Ti)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Bh.directiveName="unsafeHTML",Bh.resultType=1;class zh extends Bh{}zh.directiveName="unsafeSVG",zh.resultType=2;const re=Om(zh);function Ta(e){"@babel/helpers - typeof";return Ta=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ta(e)}function K1(e,t){if(Ta(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(Ta(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function Y1(e){var t=K1(e,"string");return Ta(t)=="symbol"?t:t+""}function X1(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,Y1(i.key),i)}}function Bi(e,t,n){return t&&X1(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function G1(e){return e[e.length-1]}function Sc(e){return Array.isArray(e)?e.slice(0):[e]}function Q1(e,t){e=e.slice(0);for(var n=[];e.length;){var i=e.splice(0,t);n.push(i)}return n}function kc(e){return Array.isArray(e)}function J1(e){return e!=null}function ql(e,t){var n=0,i=-1;for(var s of e){i=i+1;var r=t(s,i);if(r)n=n+1;else break}return n}function _s(e,t){var n=t.length;if(n!==0){var i=e.length;e.length=i+t.length;for(var s=0;s<n;++s)e[i+s]=t[s]}}function HL(e){return e.filter(function(t,n,i){return i.indexOf(t)===n})}function Ai(e){for(var t="",n=0;n<e.length;n++){var i=e[n];if(i==="-")return parseInt(t,10);t+=i}throw new Error("malformatted revision: "+e)}function ti(e,t){var n=t?Ai(t._rev)+1:1;return n+"-"+e}function Z1(e){var t=e.split("."),n=t.length;return n===1?i=>i[e]:i=>{for(var s=i,r=0;r<n;++r){var a=t[r];if(s=s[a],typeof s>"u")return s}return s}}function Pt(e){return Object.assign({},e)}function tx(e){return Object.keys(e)[0]}function Cc(e,t=!1){if(!e)return e;if(!t&&Array.isArray(e))return e.sort((i,s)=>typeof i=="string"&&typeof s=="string"?i.localeCompare(s):typeof i=="object"?1:-1).map(i=>Cc(i,t));if(typeof e=="object"&&!Array.isArray(e)){var n={};return Object.keys(e).sort((i,s)=>i.localeCompare(s)).forEach(i=>{n[i]=Cc(e[i],t)}),n}return e}function jh(e){if(!e||e===null||typeof e!="object")return e;if(Array.isArray(e)){for(var t=new Array(e.length),n=t.length;n--;)t[n]=jh(e[n]);return t}var i={};for(var s in e)i[s]=jh(e[s]);return i}var Te=jh;function Xn(e,t,n){return Object.defineProperty(e,t,{get:function(){return n}}),n}var Gu=1;function Dr(){return{lwt:Gu}}function fn(){return""}function ex(e){return Object.assign({},e,{_meta:void 0,_deleted:void 0,_rev:void 0})}function nx(e,t,n){if(t.length!==n.length)return!1;for(var i=0,s=t.length;i<s;){var r=t[i],a=n[i];if(i++,r[e]!==a[e]||r._rev!==a._rev||r._meta.lwt!==a._meta.lwt)return!1}return!0}function Aa(e,t){return Aa=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,i){return n.__proto__=i,n},Aa(e,t)}function Qu(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Aa(e,t)}function Wh(e){return Wh=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Wh(e)}function ix(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}function Am(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Am=function(){return!!e})()}function sx(e,t,n){if(Am())return Reflect.construct.apply(null,arguments);var i=[null];i.push.apply(i,t);var s=new(e.bind.apply(e,i));return n&&Aa(s,n.prototype),s}function Mc(e){var t=typeof Map=="function"?new Map:void 0;return Mc=function(i){if(i===null||!ix(i))return i;if(typeof i!="function")throw new TypeError("Super expression must either be null or a function");if(t!==void 0){if(t.has(i))return t.get(i);t.set(i,s)}function s(){return sx(i,arguments,Wh(this).constructor)}return s.prototype=Object.create(i.prototype,{constructor:{value:s,enumerable:!1,writable:!0,configurable:!0}}),Aa(s,i)},Mc(e)}var xt={isDevMode(){return!1},deepFreezeWhenDevMode(e){return e},tunnelErrorMessage(e){return`
        RxDB Error-Code: `+e+`.
        Hint: Error messages are not included in RxDB core to reduce build size.
        To show the full error messages and to ensure that you do not make any mistakes when using RxDB,
        use the dev-mode plugin when you are in development mode: https://rxdb.info/dev-mode.html?console=error
        `}};function rx(e){var t="";return Object.keys(e).length===0||(t+="-".repeat(20)+`
`,t+=`Parameters:
`,t+=Object.keys(e).map(n=>{var i="[object Object]";try{n==="errors"?i=e[n].map(s=>JSON.stringify(s,Object.getOwnPropertyNames(s))):i=JSON.stringify(e[n],function(s,r){return r===void 0?null:r},2)}catch{}return n+": "+i}).join(`
`),t+=`
`),t}function Rm(e,t,n){return`
`+e+`
`+rx(n)}var ax=(function(e){function t(i,s,r={}){var a,o=Rm(s,i,r);return a=e.call(this,o)||this,a.code=i,a.message=o,a.url=Ju(i),a.parameters=r,a.rxdb=!0,a}Qu(t,e);var n=t.prototype;return n.toString=function(){return this.message},Bi(t,[{key:"name",get:function(){return"RxError ("+this.code+")"}},{key:"typeError",get:function(){return!1}}])})(Mc(Error)),ox=(function(e){function t(i,s,r={}){var a,o=Rm(s,i,r);return a=e.call(this,o)||this,a.code=i,a.message=o,a.url=Ju(i),a.parameters=r,a.rxdb=!0,a}Qu(t,e);var n=t.prototype;return n.toString=function(){return this.message},Bi(t,[{key:"name",get:function(){return"RxTypeError ("+this.code+")"}},{key:"typeError",get:function(){return!0}}])})(Mc(TypeError));function Ju(e){return"https://rxdb.info/errors.html?console=errors#"+e}function Lm(e){return`
Find out more about this error here: `+Ju(e)+` 
`}function F(e,t){return new ax(e,xt.tunnelErrorMessage(e)+Lm(e),t)}function Ec(e,t){return new ox(e,xt.tunnelErrorMessage(e)+Lm(e),t)}function dr(e){return e&&e.status===409?e:!1}var cx={409:"document write conflict",422:"schema validation error",510:"attachment data missing"};function Nm(e){return F("COL20",{name:cx[e.status],document:e.documentId,writeError:e})}var So;function lx(){if(So)return So;if(typeof crypto>"u"||typeof crypto.subtle>"u"||typeof crypto.subtle.digest!="function")throw F("UT8",{args:{typeof_crypto:typeof crypto,typeof_crypto_subtle:typeof crypto?.subtle,typeof_crypto_subtle_digest:typeof crypto?.subtle?.digest}});return So=crypto.subtle.digest.bind(crypto.subtle),So}async function hx(e){var t=new TextEncoder().encode(e),n=await lx()("SHA-256",t),i=Array.prototype.map.call(new Uint8Array(n),s=>("00"+s.toString(16)).slice(-2)).join("");return i}var Fm=hx;function ux(){return new Promise(e=>setTimeout(e,0))}function dx(e=0){return new Promise(t=>setTimeout(t,e))}function Bm(e){return e&&typeof e.then=="function"?e:Promise.resolve(e)}var Zu=Promise.resolve(!0),$n=Promise.resolve(!1),td=Promise.resolve(null),sn=Promise.resolve();function ul(e=1e4){return typeof requestIdleCallback=="function"?new Promise(t=>{requestIdleCallback(()=>t(),{timeout:e})}):dx(0)}var Kl=sn;function fx(e=void 0){return Kl=Kl.then(()=>ul(e)),Kl}function px(e,t){return e.reduce((n,i)=>n.then(i),Promise.resolve(t))}var gx=/\./g,Pf="abcdefghijklmnopqrstuvwxyz";function Rs(e=10){for(var t="",n=0;n<e;n++)t+=Pf.charAt(Math.floor(Math.random()*Pf.length));return t}function zm(e){e+="";var t=e.charAt(0).toUpperCase();return t+e.substr(1)}function Kr(e){for(;e.charAt(0)===".";)e=e.substr(1);for(;e.slice(-1)===".";)e=e.slice(0,-1);return e}function Ra(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,i;if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(i=n;i--!==0;)if(!Ra(e[i],t[i]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();var s=Object.keys(e);if(n=s.length,n!==Object.keys(t).length)return!1;for(i=n;i--!==0;)if(!Object.prototype.hasOwnProperty.call(t,s[i]))return!1;for(i=n;i--!==0;){var r=s[i];if(!Ra(e[r],t[r]))return!1}return!0}return e!==e&&t!==t}var Hh=e=>{var t=typeof e;return e!==null&&(t==="object"||t==="function")},Yl=new Set(["__proto__","prototype","constructor"]),mx=new Set("0123456789");function jm(e){var t=[],n="",i="start",s=!1;for(var r of e)switch(r){case"\\":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");s&&(n+=r),i="property",s=!s;break}case".":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="property";break}if(s){s=!1,n+=r;break}if(Yl.has(n))return[];t.push(n),n="",i="property";break}case"[":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="index";break}if(s){s=!1,n+=r;break}if(i==="property"){if(Yl.has(n))return[];t.push(n),n=""}i="index";break}case"]":{if(i==="index"){t.push(Number.parseInt(n,10)),n="",i="indexEnd";break}if(i==="indexEnd")throw new Error("Invalid character after an index")}default:{if(i==="index"&&!mx.has(r))throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");i==="start"&&(i="property"),s&&(s=!1,n+="\\"),n+=r}}switch(s&&(n+="\\"),i){case"property":{if(Yl.has(n))return[];t.push(n);break}case"index":throw new Error("Index was not closed");case"start":{t.push("");break}}return t}function Wm(e,t){if(typeof t!="number"&&Array.isArray(e)){var n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}function vx(e,t){if(Wm(e,t))throw new Error("Cannot use string index")}function fr(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!t.includes(".")&&!t.includes("["))return e[t];if(!Hh(e)||typeof t!="string")return n===void 0?e:n;var i=jm(t);if(i.length===0)return n;for(var s=0;s<i.length;s++){var r=i[s];if(Wm(e,r)?e=s===i.length-1?void 0:null:e=e[r],e==null){if(s!==i.length-1)return n;break}}return e===void 0?n:e}function VL(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!Hh(e)||typeof t!="string")return e;for(var i=e,s=jm(t),r=0;r<s.length;r++){var a=s[r];vx(e,a),r===s.length-1?e[a]=n:Hh(e[a])||(e[a]=typeof s[r+1]=="number"?[]:{}),e=e[a]}return i}function pr(e,t){var n=e.get(t);if(typeof n>"u")throw new Error("missing value from map "+t);return n}function rn(e,t,n,i){var s=e.get(t);return typeof s>"u"&&(s=n(),e.set(t,s)),s}function wt(e){var t=e.split("-"),n="RxDB";return t.forEach(i=>{n+=zm(i)}),n+="Plugin",new Error(`You are using a function which must be overwritten by a plugin.
        You should either prevent the usage of this function or add the plugin via:
            import { `+n+" } from 'rxdb/plugins/"+e+`';
            addRxPlugin(`+n+`);
        `)}function Dc(e){var t={name:e.name,message:e.message,rxdb:e.rxdb,parameters:e.parameters,extensions:e.extensions,code:e.code,url:e.url,stack:e.stack?e.stack.replace(/\n/g,` 
 `):void 0};return t}var Xl=0;function gn(){var e=Date.now();e=e+.01,e<=Xl&&(e=Xl+.01);var t=parseFloat(e.toFixed(2));return Xl=t,t}function V(e,t){if(!e)throw t||(t=""),new Error("ensureNotFalsy() is falsy: "+t);return e}var io={bufferSize:1,refCount:!0},bx="16.21.1",Gl={},_x="6da4936d1425ff3a5c44c02342c6daf791d266be3ae8479b8ec59e261df41b93",Of=16,Ql=$n,Tf=!1;async function yx(){return Tf||(Tf=!0,Ql=(async()=>!!(Gl.premium&&typeof Gl.premium=="string"&&await Fm(Gl.premium)===_x))()),Ql}var La={preAddRxPlugin:[],preCreateRxDatabase:[],createRxDatabase:[],preCreateRxCollection:[],createRxCollection:[],createRxState:[],postCloseRxCollection:[],postRemoveRxCollection:[],preCreateRxSchema:[],createRxSchema:[],prePrepareRxQuery:[],preCreateRxQuery:[],prePrepareQuery:[],createRxDocument:[],postCreateRxDocument:[],preCreateRxStorageInstance:[],preStorageWrite:[],preMigrateDocument:[],postMigrateDocument:[],preCloseRxDatabase:[],postRemoveRxDatabase:[],postCleanup:[],preReplicationMasterWrite:[],preReplicationMasterWriteDocumentsHandle:[]};function Ae(e,t){La[e].length>0&&La[e].forEach(n=>n(t))}async function ys(e,t){for(var n of La[e])await n(t)}function Na(e,t){var n=t;n=n.replace(gx,".properties."),n="properties."+n,n=Kr(n);var i=fr(e,n);return i}function wx(e,t,n){if(typeof t.primaryKey=="string")return n;var i=zi(t,n),s=n[e];if(s&&s!==i)throw F("DOC19",{args:{documentData:n,existingPrimary:s,newPrimary:i},schema:t});return n[e]=i,n}function mn(e){return typeof e=="string"?e:e.key}function xx(e){var t=mn(e.primaryKey),n=Na(e,t);return V(n.maxLength)}function zi(e,t){if(typeof e.primaryKey=="string")return t[e.primaryKey];var n=e.primaryKey;return n.fields.map(i=>{var s=fr(t,i);if(typeof s>"u")throw F("DOC18",{args:{field:i,documentData:t}});return s}).join(n.separator)}function Sx(e){var t=Cc(e,!0);return t}function kx(e){return["_deleted",e]}function dl(e){e=Pt(e);var t=mn(e.primaryKey);e.properties=Pt(e.properties),e.additionalProperties=!1,Object.prototype.hasOwnProperty.call(e,"keyCompression")||(e.keyCompression=!1),e.indexes=e.indexes?e.indexes.slice(0):[],e.required=e.required?e.required.slice(0):[],e.encrypted=e.encrypted?e.encrypted.slice(0):[],e.properties._rev={type:"string",minLength:1},e.properties._attachments={type:"object"},e.properties._deleted={type:"boolean"},e.properties._meta=Mx,e.required=e.required?e.required.slice(0):[],e.required.push("_deleted"),e.required.push("_rev"),e.required.push("_meta"),e.required.push("_attachments");var n=Hm(e);_s(e.required,n),e.required=e.required.filter(r=>!r.includes(".")).filter((r,a,o)=>o.indexOf(r)===a),e.version=e.version||0;var i=e.indexes.map(r=>{var a=kc(r)?r.slice(0):[r];return a.includes(t)||a.push(t),a[0]!=="_deleted"&&a.unshift("_deleted"),a});i.length===0&&i.push(kx(t)),i.push(["_meta.lwt",t]),e.internalIndexes&&e.internalIndexes.map(r=>{i.push(r)});var s=new Set;return i.filter(r=>{var a=r.join(",");return s.has(a)?!1:(s.add(a),!0)}),e.indexes=i,e}var Cx=1e15,Mx={type:"object",properties:{lwt:{type:"number",minimum:Gu,maximum:Cx,multipleOf:.01}},additionalProperties:!0,required:["lwt"]};function Hm(e){var t=Object.keys(e.properties).filter(i=>e.properties[i].final),n=mn(e.primaryKey);return t.push(n),typeof e.primaryKey!="string"&&e.primaryKey.fields.forEach(i=>t.push(i)),t}function Ex(e,t){for(var n=Object.keys(e.defaultValues),i=0;i<n.length;++i){var s=n[i];(!Object.prototype.hasOwnProperty.call(t,s)||typeof t[s]>"u")&&(t[s]=e.defaultValues[s])}return t}var Vm=(function(){function e(n,i){if(this.jsonSchema=n,this.hashFunction=i,this.indexes=Dx(this.jsonSchema),this.primaryPath=mn(this.jsonSchema.primaryKey),!n.properties[this.primaryPath].maxLength)throw F("SC39",{schema:n});this.finalFields=Hm(this.jsonSchema)}var t=e.prototype;return t.validateChange=function(i,s){this.finalFields.forEach(r=>{if(!Ra(i[r],s[r]))throw F("DOC9",{dataBefore:i,dataAfter:s,fieldName:r,schema:this.jsonSchema})})},t.getDocumentPrototype=function(){var i={},s=Na(this.jsonSchema,"");return Object.keys(s).forEach(r=>{var a=r;i.__defineGetter__(r,function(){if(!(!this.get||typeof this.get!="function")){var o=this.get(a);return o}}),Object.defineProperty(i,r+"$",{get:function(){return this.get$(a)},enumerable:!1,configurable:!1}),Object.defineProperty(i,r+"$$",{get:function(){return this.get$$(a)},enumerable:!1,configurable:!1}),Object.defineProperty(i,r+"_",{get:function(){return this.populate(a)},enumerable:!1,configurable:!1})}),Xn(this,"getDocumentPrototype",()=>i),i},t.getPrimaryOfDocumentData=function(i){return zi(this.jsonSchema,i)},Bi(e,[{key:"version",get:function(){return this.jsonSchema.version}},{key:"defaultValues",get:function(){var n={};return Object.entries(this.jsonSchema.properties).filter(([,i])=>Object.prototype.hasOwnProperty.call(i,"default")).forEach(([i,s])=>n[i]=s.default),Xn(this,"defaultValues",n)}},{key:"hash",get:function(){return Xn(this,"hash",this.hashFunction(JSON.stringify(this.jsonSchema)))}}])})();function Dx(e){return(e.indexes||[]).map(t=>kc(t)?t:[t])}function $x(e){var t=e.version?e.version:0,n=0;return new Array(t).fill(0).map(()=>n++)}function Ix(e,t,n=!0){n&&Ae("preCreateRxSchema",e);var i=dl(e);i=Sx(i),xt.deepFreezeWhenDevMode(i);var s=new Vm(i,t);return Ae("createRxSchema",s),s}function Gt(e){return typeof e=="function"}function Px(e){return Gt(e?.lift)}function Nn(e){return function(t){if(Px(t))return t.lift(function(n){try{return e(n,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}var Vh=function(e,t){return Vh=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(n[s]=i[s])},Vh(e,t)};function Ls(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");Vh(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function Ox(e,t,n,i){function s(r){return r instanceof n?r:new n(function(a){a(r)})}return new(n||(n=Promise))(function(r,a){function o(h){try{l(i.next(h))}catch(u){a(u)}}function c(h){try{l(i.throw(h))}catch(u){a(u)}}function l(h){h.done?r(h.value):s(h.value).then(o,c)}l((i=i.apply(e,t||[])).next())})}function Um(e,t){var n={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},i,s,r,a=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return a.next=o(0),a.throw=o(1),a.return=o(2),typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function o(l){return function(h){return c([l,h])}}function c(l){if(i)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(n=0)),n;)try{if(i=1,s&&(r=l[0]&2?s.return:l[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,l[1])).done)return r;switch(s=0,r&&(l=[l[0]&2,r.value]),l[0]){case 0:case 1:r=l;break;case 4:return n.label++,{value:l[1],done:!1};case 5:n.label++,s=l[1],l=[0];continue;case 7:l=n.ops.pop(),n.trys.pop();continue;default:if(r=n.trys,!(r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){n=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){n.label=l[1];break}if(l[0]===6&&n.label<r[1]){n.label=r[1],r=l;break}if(r&&n.label<r[2]){n.label=r[2],n.ops.push(l);break}r[2]&&n.ops.pop(),n.trys.pop();continue}l=t.call(e,n)}catch(h){l=[6,h],s=0}finally{i=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function gr(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],i=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function ws(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),s,r=[],a;try{for(;(t===void 0||t-- >0)&&!(s=i.next()).done;)r.push(s.value)}catch(o){a={error:o}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(a)throw a.error}}return r}function xs(e,t,n){if(n||arguments.length===2)for(var i=0,s=t.length,r;i<s;i++)(r||!(i in t))&&(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}function rr(e){return this instanceof rr?(this.v=e,this):new rr(e)}function Tx(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(e,t||[]),s,r=[];return s=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),o("next"),o("throw"),o("return",a),s[Symbol.asyncIterator]=function(){return this},s;function a(f){return function(p){return Promise.resolve(p).then(f,u)}}function o(f,p){i[f]&&(s[f]=function(g){return new Promise(function(m,b){r.push([f,g,m,b])>1||c(f,g)})},p&&(s[f]=p(s[f])))}function c(f,p){try{l(i[f](p))}catch(g){d(r[0][3],g)}}function l(f){f.value instanceof rr?Promise.resolve(f.value.v).then(h,u):d(r[0][2],f)}function h(f){c("next",f)}function u(f){c("throw",f)}function d(f,p){f(p),r.shift(),r.length&&c(r[0][0],r[0][1])}}function Ax(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof gr=="function"?gr(e):e[Symbol.iterator](),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(r){n[r]=e[r]&&function(a){return new Promise(function(o,c){a=e[r](a),s(o,c,a.done,a.value)})}}function s(r,a,o,c){Promise.resolve(c).then(function(l){r({value:l,done:o})},a)}}var qm=(function(e){return e&&typeof e.length=="number"&&typeof e!="function"});function Km(e){return Gt(e?.then)}function ed(e){var t=function(i){Error.call(i),i.stack=new Error().stack},n=e(t);return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Jl=ed(function(e){return function(n){e(this),this.message=n?n.length+` errors occurred during unsubscription:
`+n.map(function(i,s){return s+1+") "+i.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=n}});function Uh(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var fl=(function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var t,n,i,s,r;if(!this.closed){this.closed=!0;var a=this._parentage;if(a)if(this._parentage=null,Array.isArray(a))try{for(var o=gr(a),c=o.next();!c.done;c=o.next()){var l=c.value;l.remove(this)}}catch(g){t={error:g}}finally{try{c&&!c.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}else a.remove(this);var h=this.initialTeardown;if(Gt(h))try{h()}catch(g){r=g instanceof Jl?g.errors:[g]}var u=this._finalizers;if(u){this._finalizers=null;try{for(var d=gr(u),f=d.next();!f.done;f=d.next()){var p=f.value;try{Af(p)}catch(g){r=r??[],g instanceof Jl?r=xs(xs([],ws(r)),ws(g.errors)):r.push(g)}}}catch(g){i={error:g}}finally{try{f&&!f.done&&(s=d.return)&&s.call(d)}finally{if(i)throw i.error}}}if(r)throw new Jl(r)}},e.prototype.add=function(t){var n;if(t&&t!==this)if(this.closed)Af(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}},e.prototype._hasParent=function(t){var n=this._parentage;return n===t||Array.isArray(n)&&n.includes(t)},e.prototype._addParent=function(t){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t},e.prototype._removeParent=function(t){var n=this._parentage;n===t?this._parentage=null:Array.isArray(n)&&Uh(n,t)},e.prototype.remove=function(t){var n=this._finalizers;n&&Uh(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e})(),Ym=fl.EMPTY;function Xm(e){return e instanceof fl||e&&"closed"in e&&Gt(e.remove)&&Gt(e.add)&&Gt(e.unsubscribe)}function Af(e){Gt(e)?e():e.unsubscribe()}var Rx={Promise:void 0},Lx={setTimeout:function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];return setTimeout.apply(void 0,xs([e,t],ws(n)))},clearTimeout:function(e){return clearTimeout(e)},delegate:void 0};function Gm(e){Lx.setTimeout(function(){throw e})}function Rf(){}function Ko(e){e()}var nd=(function(e){Ls(t,e);function t(n){var i=e.call(this)||this;return i.isStopped=!1,n?(i.destination=n,Xm(n)&&n.add(i)):i.destination=Bx,i}return t.create=function(n,i,s){return new mr(n,i,s)},t.prototype.next=function(n){this.isStopped||this._next(n)},t.prototype.error=function(n){this.isStopped||(this.isStopped=!0,this._error(n))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(n){this.destination.next(n)},t.prototype._error=function(n){try{this.destination.error(n)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t})(fl),Nx=(function(){function e(t){this.partialObserver=t}return e.prototype.next=function(t){var n=this.partialObserver;if(n.next)try{n.next(t)}catch(i){ko(i)}},e.prototype.error=function(t){var n=this.partialObserver;if(n.error)try{n.error(t)}catch(i){ko(i)}else ko(t)},e.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(n){ko(n)}},e})(),mr=(function(e){Ls(t,e);function t(n,i,s){var r=e.call(this)||this,a;return Gt(n)||!n?a={next:n??void 0,error:i??void 0,complete:s??void 0}:a=n,r.destination=new Nx(a),r}return t})(nd);function ko(e){Gm(e)}function Fx(e){throw e}var Bx={closed:!0,next:Rf,error:Fx,complete:Rf},id=(function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"})();function so(e){return e}function zx(e){return e.length===0?so:e.length===1?e[0]:function(n){return e.reduce(function(i,s){return s(i)},n)}}var We=(function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(t,n,i){var s=this,r=Wx(t)?t:new mr(t,n,i);return Ko(function(){var a=s,o=a.operator,c=a.source;r.add(o?o.call(r,c):c?s._subscribe(r):s._trySubscribe(r))}),r},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(n){t.error(n)}},e.prototype.forEach=function(t,n){var i=this;return n=Lf(n),new n(function(s,r){var a=new mr({next:function(o){try{t(o)}catch(c){r(c),a.unsubscribe()}},error:r,complete:s});i.subscribe(a)})},e.prototype._subscribe=function(t){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(t)},e.prototype[id]=function(){return this},e.prototype.pipe=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return zx(t)(this)},e.prototype.toPromise=function(t){var n=this;return t=Lf(t),new t(function(i,s){var r;n.subscribe(function(a){return r=a},function(a){return s(a)},function(){return i(r)})})},e.create=function(t){return new e(t)},e})();function Lf(e){var t;return(t=e??Rx.Promise)!==null&&t!==void 0?t:Promise}function jx(e){return e&&Gt(e.next)&&Gt(e.error)&&Gt(e.complete)}function Wx(e){return e&&e instanceof nd||jx(e)&&Xm(e)}function Qm(e){return Gt(e[id])}function Jm(e){return Symbol.asyncIterator&&Gt(e?.[Symbol.asyncIterator])}function Zm(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function Hx(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var tv=Hx();function ev(e){return Gt(e?.[tv])}function nv(e){return Tx(this,arguments,function(){var n,i,s,r;return Um(this,function(a){switch(a.label){case 0:n=e.getReader(),a.label=1;case 1:a.trys.push([1,,9,10]),a.label=2;case 2:return[4,rr(n.read())];case 3:return i=a.sent(),s=i.value,r=i.done,r?[4,rr(void 0)]:[3,5];case 4:return[2,a.sent()];case 5:return[4,rr(s)];case 6:return[4,a.sent()];case 7:return a.sent(),[3,2];case 8:return[3,10];case 9:return n.releaseLock(),[7];case 10:return[2]}})})}function iv(e){return Gt(e?.getReader)}function li(e){if(e instanceof We)return e;if(e!=null){if(Qm(e))return Vx(e);if(qm(e))return Ux(e);if(Km(e))return qx(e);if(Jm(e))return sv(e);if(ev(e))return Kx(e);if(iv(e))return Yx(e)}throw Zm(e)}function Vx(e){return new We(function(t){var n=e[id]();if(Gt(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Ux(e){return new We(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function qx(e){return new We(function(t){e.then(function(n){t.closed||(t.next(n),t.complete())},function(n){return t.error(n)}).then(null,Gm)})}function Kx(e){return new We(function(t){var n,i;try{for(var s=gr(e),r=s.next();!r.done;r=s.next()){var a=r.value;if(t.next(a),t.closed)return}}catch(o){n={error:o}}finally{try{r&&!r.done&&(i=s.return)&&i.call(s)}finally{if(n)throw n.error}}t.complete()})}function sv(e){return new We(function(t){Xx(e,t).catch(function(n){return t.error(n)})})}function Yx(e){return sv(nv(e))}function Xx(e,t){var n,i,s,r;return Ox(this,void 0,void 0,function(){var a,o;return Um(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),n=Ax(e),c.label=1;case 1:return[4,n.next()];case 2:if(i=c.sent(),!!i.done)return[3,4];if(a=i.value,t.next(a),t.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return o=c.sent(),s={error:o},[3,11];case 6:return c.trys.push([6,,9,10]),i&&!i.done&&(r=n.return)?[4,r.call(n)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(s)throw s.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function ei(e,t,n,i,s){return new Gx(e,t,n,i,s)}var Gx=(function(e){Ls(t,e);function t(n,i,s,r,a,o){var c=e.call(this,n)||this;return c.onFinalize=a,c.shouldUnsubscribe=o,c._next=i?function(l){try{i(l)}catch(h){n.error(h)}}:e.prototype._next,c._error=r?function(l){try{r(l)}catch(h){n.error(h)}finally{this.unsubscribe()}}:e.prototype._error,c._complete=s?function(){try{s()}catch(l){n.error(l)}finally{this.unsubscribe()}}:e.prototype._complete,c}return t.prototype.unsubscribe=function(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var i=this.closed;e.prototype.unsubscribe.call(this),!i&&((n=this.onFinalize)===null||n===void 0||n.call(this))}},t})(nd),rv={now:function(){return(rv.delegate||Date).now()},delegate:void 0};function Qx(e){return e&&Gt(e.schedule)}function sd(e){return e[e.length-1]}function Jx(e){return Gt(sd(e))?e.pop():void 0}function $r(e){return Qx(sd(e))?e.pop():void 0}function av(e,t){return typeof sd(e)=="number"?e.pop():t}function $i(e,t,n,i,s){i===void 0&&(i=0),s===void 0&&(s=!1);var r=t.schedule(function(){n(),s?e.add(this.schedule(null,i)):this.unsubscribe()},i);if(e.add(r),!s)return r}var Zx=Array.isArray,t2=Object.getPrototypeOf,e2=Object.prototype,n2=Object.keys;function i2(e){if(e.length===1){var t=e[0];if(Zx(t))return{args:t,keys:null};if(s2(t)){var n=n2(t);return{args:n.map(function(i){return t[i]}),keys:n}}}return{args:e,keys:null}}function s2(e){return e&&typeof e=="object"&&t2(e)===e2}function ov(e,t){return t===void 0&&(t=0),Nn(function(n,i){n.subscribe(ei(i,function(s){return $i(i,e,function(){return i.next(s)},t)},function(){return $i(i,e,function(){return i.complete()},t)},function(s){return $i(i,e,function(){return i.error(s)},t)}))})}function cv(e,t){return t===void 0&&(t=0),Nn(function(n,i){i.add(e.schedule(function(){return n.subscribe(i)},t))})}function r2(e,t){return li(e).pipe(cv(t),ov(t))}function a2(e,t){return li(e).pipe(cv(t),ov(t))}function o2(e,t){return new We(function(n){var i=0;return t.schedule(function(){i===e.length?n.complete():(n.next(e[i++]),n.closed||this.schedule())})})}function c2(e,t){return new We(function(n){var i;return $i(n,t,function(){i=e[tv](),$i(n,t,function(){var s,r,a;try{s=i.next(),r=s.value,a=s.done}catch(o){n.error(o);return}a?n.complete():n.next(r)},0,!0)}),function(){return Gt(i?.return)&&i.return()}})}function lv(e,t){if(!e)throw new Error("Iterable cannot be null");return new We(function(n){$i(n,t,function(){var i=e[Symbol.asyncIterator]();$i(n,t,function(){i.next().then(function(s){s.done?n.complete():n.next(s.value)})},0,!0)})})}function l2(e,t){return lv(nv(e),t)}function h2(e,t){if(e!=null){if(Qm(e))return r2(e,t);if(qm(e))return o2(e,t);if(Km(e))return a2(e,t);if(Jm(e))return lv(e,t);if(ev(e))return c2(e,t);if(iv(e))return l2(e,t)}throw Zm(e)}function Ir(e,t){return t?h2(e,t):li(e)}function Dt(e,t){return Nn(function(n,i){var s=0;n.subscribe(ei(i,function(r){i.next(e.call(t,r,s++))}))})}var u2=Array.isArray;function d2(e,t){return u2(t)?e.apply(void 0,xs([],ws(t))):e(t)}function f2(e){return Dt(function(t){return d2(e,t)})}function p2(e,t){return e.reduce(function(n,i,s){return n[i]=t[s],n},{})}function rd(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=$r(e),i=Jx(e),s=i2(e),r=s.args,a=s.keys;if(r.length===0)return Ir([],n);var o=new We(g2(r,n,a?function(c){return p2(a,c)}:so));return i?o.pipe(f2(i)):o}function g2(e,t,n){return n===void 0&&(n=so),function(i){Nf(t,function(){for(var s=e.length,r=new Array(s),a=s,o=s,c=function(h){Nf(t,function(){var u=Ir(e[h],t),d=!1;u.subscribe(ei(i,function(f){r[h]=f,d||(d=!0,o--),o||i.next(n(r.slice()))},function(){--a||i.complete()}))},i)},l=0;l<s;l++)c(l)},i)}}function Nf(e,t,n){e?$i(n,e,t):t()}function m2(e,t,n,i,s,r,a,o){var c=[],l=0,h=0,u=!1,d=function(){u&&!c.length&&!l&&t.complete()},f=function(g){return l<i?p(g):c.push(g)},p=function(g){l++;var m=!1;li(n(g,h++)).subscribe(ei(t,function(b){t.next(b)},function(){m=!0},void 0,function(){if(m)try{l--;for(var b=function(){var _=c.shift();a||p(_)};c.length&&l<i;)b();d()}catch(_){t.error(_)}}))};return e.subscribe(ei(t,f,function(){u=!0,d()})),function(){}}function In(e,t,n){return n===void 0&&(n=1/0),Gt(t)?In(function(i,s){return Dt(function(r,a){return t(i,r,s,a)})(li(e(i,s)))},n):(typeof t=="number"&&(n=t),Nn(function(i,s){return m2(i,s,e,n)}))}function ad(e){return e===void 0&&(e=1/0),In(so,e)}function v2(){return ad(1)}var b2=ed(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),le=(function(e){Ls(t,e);function t(){var n=e.call(this)||this;return n.closed=!1,n.currentObservers=null,n.observers=[],n.isStopped=!1,n.hasError=!1,n.thrownError=null,n}return t.prototype.lift=function(n){var i=new Ff(this,this);return i.operator=n,i},t.prototype._throwIfClosed=function(){if(this.closed)throw new b2},t.prototype.next=function(n){var i=this;Ko(function(){var s,r;if(i._throwIfClosed(),!i.isStopped){i.currentObservers||(i.currentObservers=Array.from(i.observers));try{for(var a=gr(i.currentObservers),o=a.next();!o.done;o=a.next()){var c=o.value;c.next(n)}}catch(l){s={error:l}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(s)throw s.error}}}})},t.prototype.error=function(n){var i=this;Ko(function(){if(i._throwIfClosed(),!i.isStopped){i.hasError=i.isStopped=!0,i.thrownError=n;for(var s=i.observers;s.length;)s.shift().error(n)}})},t.prototype.complete=function(){var n=this;Ko(function(){if(n._throwIfClosed(),!n.isStopped){n.isStopped=!0;for(var i=n.observers;i.length;)i.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(n){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,n)},t.prototype._subscribe=function(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)},t.prototype._innerSubscribe=function(n){var i=this,s=this,r=s.hasError,a=s.isStopped,o=s.observers;return r||a?Ym:(this.currentObservers=null,o.push(n),new fl(function(){i.currentObservers=null,Uh(o,n)}))},t.prototype._checkFinalizedStatuses=function(n){var i=this,s=i.hasError,r=i.thrownError,a=i.isStopped;s?n.error(r):a&&n.complete()},t.prototype.asObservable=function(){var n=new We;return n.source=this,n},t.create=function(n,i){return new Ff(n,i)},t})(We),Ff=(function(e){Ls(t,e);function t(n,i){var s=e.call(this)||this;return s.destination=n,s.source=i,s}return t.prototype.next=function(n){var i,s;(s=(i=this.destination)===null||i===void 0?void 0:i.next)===null||s===void 0||s.call(i,n)},t.prototype.error=function(n){var i,s;(s=(i=this.destination)===null||i===void 0?void 0:i.error)===null||s===void 0||s.call(i,n)},t.prototype.complete=function(){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||i===void 0||i.call(n)},t.prototype._subscribe=function(n){var i,s;return(s=(i=this.source)===null||i===void 0?void 0:i.subscribe(n))!==null&&s!==void 0?s:Ym},t})(le);function Bf(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return v2()(Ir(e,$r(e)))}var _2=new We(function(e){return e.complete()});function zf(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=$r(e);return Ir(e,n)}function Fa(e,t){return t===void 0&&(t=so),e=e??y2,Nn(function(n,i){var s,r=!0;n.subscribe(ei(i,function(a){var o=t(a);(r||!e(s,o))&&(r=!1,s=o,i.next(a))}))})}function y2(e,t){return e===t}function pt(e,t){return Nn(function(n,i){var s=0;n.subscribe(ei(i,function(r){return e.call(t,r,s++)&&i.next(r)}))})}var w2=ed(function(e){return function(){e(this),this.name="EmptyError",this.message="no elements in sequence"}});function x2(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=$r(e),i=av(e,1/0);return Nn(function(s,r){ad(i)(Ir(xs([s],ws(e)),n)).subscribe(r)})}function S2(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return x2.apply(void 0,xs([],ws(e)))}var nn=(function(e){Ls(t,e);function t(n){var i=e.call(this)||this;return i._value=n,i}return Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),t.prototype._subscribe=function(n){var i=e.prototype._subscribe.call(this,n);return!i.closed&&n.next(this._value),i},t.prototype.getValue=function(){var n=this,i=n.hasError,s=n.thrownError,r=n._value;if(i)throw s;return this._throwIfClosed(),r},t.prototype.next=function(n){e.prototype.next.call(this,this._value=n)},t})(le),k2=(function(e){Ls(t,e);function t(n,i,s){n===void 0&&(n=1/0),i===void 0&&(i=1/0),s===void 0&&(s=rv);var r=e.call(this)||this;return r._bufferSize=n,r._windowTime=i,r._timestampProvider=s,r._buffer=[],r._infiniteTimeWindow=!0,r._infiniteTimeWindow=i===1/0,r._bufferSize=Math.max(1,n),r._windowTime=Math.max(1,i),r}return t.prototype.next=function(n){var i=this,s=i.isStopped,r=i._buffer,a=i._infiniteTimeWindow,o=i._timestampProvider,c=i._windowTime;s||(r.push(n),!a&&r.push(o.now()+c)),this._trimBuffer(),e.prototype.next.call(this,n)},t.prototype._subscribe=function(n){this._throwIfClosed(),this._trimBuffer();for(var i=this._innerSubscribe(n),s=this,r=s._infiniteTimeWindow,a=s._buffer,o=a.slice(),c=0;c<o.length&&!n.closed;c+=r?1:2)n.next(o[c]);return this._checkFinalizedStatuses(n),i},t.prototype._trimBuffer=function(){var n=this,i=n._bufferSize,s=n._timestampProvider,r=n._buffer,a=n._infiniteTimeWindow,o=(a?1:2)*i;if(i<1/0&&o<r.length&&r.splice(0,r.length-o),!a){for(var c=s.now(),l=0,h=1;h<r.length&&r[h]<=c;h+=2)l=h;l&&r.splice(0,l+1)}},t})(le);function C2(e){e===void 0&&(e={});var t=e.connector,n=t===void 0?function(){return new le}:t,i=e.resetOnError,s=i===void 0?!0:i,r=e.resetOnComplete,a=r===void 0?!0:r,o=e.resetOnRefCountZero,c=o===void 0?!0:o;return function(l){var h,u,d,f=0,p=!1,g=!1,m=function(){u?.unsubscribe(),u=void 0},b=function(){m(),h=d=void 0,p=g=!1},_=function(){var w=h;b(),w?.unsubscribe()};return Nn(function(w,C){f++,!g&&!p&&m();var x=d=d??n();C.add(function(){f--,f===0&&!g&&!p&&(u=Zl(_,c))}),x.subscribe(C),!h&&f>0&&(h=new mr({next:function(E){return x.next(E)},error:function(E){g=!0,m(),u=Zl(b,s,E),x.error(E)},complete:function(){p=!0,m(),u=Zl(b,a),x.complete()}}),li(w).subscribe(h))})(l)}}function Zl(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(t===!0){e();return}if(t!==!1){var s=new mr({next:function(){s.unsubscribe(),e()}});return li(t.apply(void 0,xs([],ws(n)))).subscribe(s)}}function ro(e,t,n){var i,s,r,a,o=!1;return e&&typeof e=="object"?(i=e.bufferSize,a=i===void 0?1/0:i,s=e.windowTime,t=s===void 0?1/0:s,r=e.refCount,o=r===void 0?!1:r,n=e.scheduler):a=e??1/0,C2({connector:function(){return new k2(a,t,n)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:o})}function ao(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=$r(e);return Nn(function(i,s){(n?Bf(e,i,n):Bf(e,i)).subscribe(s)})}function hv(e,t){return Nn(function(n,i){var s=null,r=0,a=!1,o=function(){return a&&!s&&i.complete()};n.subscribe(ei(i,function(c){s?.unsubscribe();var l=0,h=r++;li(e(c,h)).subscribe(s=ei(i,function(u){return i.next(t?t(c,u,h,l++):u)},function(){s=null,o()}))},function(){a=!0,o()}))})}function uv(e){return e.documentData?e.documentData:e.previousDocumentData}function M2(e){switch(e.operation){case"INSERT":return{operation:e.operation,id:e.documentId,doc:e.documentData,previous:null};case"UPDATE":return{operation:e.operation,id:e.documentId,doc:xt.deepFreezeWhenDevMode(e.documentData),previous:e.previousDocumentData?e.previousDocumentData:"UNKNOWN"};case"DELETE":return{operation:e.operation,id:e.documentId,doc:null,previous:e.previousDocumentData}}}var E2=new Map;function dv(e){return rn(E2,e,()=>{for(var t=new Array(e.events.length),n=e.events,i=e.collectionName,s=e.isLocal,r=xt.deepFreezeWhenDevMode,a=0;a<n.length;a++){var o=n[a];t[a]={documentId:o.documentId,collectionName:i,isLocal:s,operation:o.operation,documentData:r(o.documentData),previousDocumentData:r(o.previousDocumentData)}}return t})}function Gn(e,t){return new Promise(function(n,i){var s=new mr({next:function(r){n(r),s.unsubscribe()},error:i,complete:function(){i(new w2)}});e.subscribe(s)})}function qh(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=$r(e),i=av(e,1/0),s=e;return s.length?s.length===1?li(s[0]):ad(i)(Ir(s,n)):_2}var ga="￿",ma=Number.MIN_SAFE_INTEGER;function D2(e,t){var n=t.selector,i=e.indexes?e.indexes.slice(0):[];t.index&&(i=[t.index]);var s=!!t.sort.find(h=>Object.values(h)[0]==="desc"),r=new Set;Object.keys(n).forEach(h=>{var u=Na(e,h);u&&u.type==="boolean"&&Object.prototype.hasOwnProperty.call(n[h],"$eq")&&r.add(h)});var a=t.sort.map(h=>Object.keys(h)[0]),o=a.filter(h=>!r.has(h)).join(","),c=-1,l;if(i.forEach(h=>{var u=!0,d=!0,f=h.map(_=>{var w=n[_],C=w?Object.keys(w):[],x={};if(!w||!C.length){var E=d?ma:ga;x={startKey:E,endKey:u?ga:ma,inclusiveStart:!0,inclusiveEnd:!0}}else C.forEach(M=>{if(od.has(M)){var v=w[M],y=O2(M,v);x=Object.assign(x,y)}});return typeof x.startKey>"u"&&(x.startKey=ma),typeof x.endKey>"u"&&(x.endKey=ga),typeof x.inclusiveStart>"u"&&(x.inclusiveStart=!0),typeof x.inclusiveEnd>"u"&&(x.inclusiveEnd=!0),d&&!x.inclusiveStart&&(d=!1),u&&!x.inclusiveEnd&&(u=!1),x}),p=f.map(_=>_.startKey),g=f.map(_=>_.endKey),m={index:h,startKeys:p,endKeys:g,inclusiveEnd:u,inclusiveStart:d,sortSatisfiedByIndex:!s&&o===h.filter(_=>!r.has(_)).join(","),selectorSatisfiedByIndex:P2(h,t.selector,p,g)},b=T2(e,t,m);(b>=c||t.index)&&(c=b,l=m)}),!l)throw F("SNH",{query:t});return l}var od=new Set(["$eq","$gt","$gte","$lt","$lte"]),$2=new Set(["$eq","$gt","$gte"]),I2=new Set(["$eq","$lt","$lte"]);function P2(e,t,n,i){var s=Object.entries(t),r=s.find(([M,v])=>{if(!e.includes(M))return!0;var y=Object.entries(v).find(([S,$])=>!od.has(S));return y});if(r||t.$and||t.$or)return!1;var a=[],o=new Set;for(var[c,l]of Object.entries(t)){if(!e.includes(c))return!1;var h=Object.keys(l).filter(M=>$2.has(M));if(h.length>1)return!1;var u=h[0];if(u&&o.add(c),u!=="$eq"){if(a.length>0)return!1;a.push(u)}}var d=[],f=new Set;for(var[p,g]of Object.entries(t)){if(!e.includes(p))return!1;var m=Object.keys(g).filter(M=>I2.has(M));if(m.length>1)return!1;var b=m[0];if(b&&f.add(p),b!=="$eq"){if(d.length>0)return!1;d.push(b)}}var _=0;for(var w of e){for(var C of[o,f]){if(!C.has(w)&&C.size>0)return!1;C.delete(w)}var x=n[_],E=i[_];if(x!==E&&o.size>0&&f.size>0)return!1;_++}return!0}function O2(e,t){switch(e){case"$eq":return{startKey:t,endKey:t,inclusiveEnd:!0,inclusiveStart:!0};case"$lte":return{endKey:t,inclusiveEnd:!0};case"$gte":return{startKey:t,inclusiveStart:!0};case"$lt":return{endKey:t,inclusiveEnd:!1};case"$gt":return{startKey:t,inclusiveStart:!1};default:throw new Error("SNH")}}function T2(e,t,n){var i=0,s=h=>{h>0&&(i=i+h)},r=10,a=ql(n.startKeys,h=>h!==ma&&h!==ga);s(a*r);var o=ql(n.startKeys,h=>h!==ga&&h!==ma);s(o*r);var c=ql(n.startKeys,(h,u)=>h===n.endKeys[u]);s(c*r*1.5);var l=n.sortSatisfiedByIndex?5:0;return s(l),i}class pl extends Error{}const Ba=Symbol("missing"),fv=Object.freeze(new Error("mingo: cycle detected while processing object/array")),gl=e=>{const t=Yo(e);let n=0,i=t.length;for(;i;)n=(n<<5)-n^t.charCodeAt(--i);return n>>>0},xi=e=>typeof e!="object"&&typeof e!="function"||e===null,pv=e=>xi(e)||ja(e)||fs(e),gv={undefined:1,null:2,number:3,string:4,symbol:5,object:6,array:7,arraybuffer:8,boolean:9,date:10,regexp:11,function:12},Ri=(e,t)=>{e===Ba&&(e=void 0),t===Ba&&(t=void 0);const[n,i]=[e,t].map(s=>gv[za(s)]||0);return n!==i?n-i:Ii(e,t)?0:e<t?-1:e>t?1:0};class $c extends Map{#t=gl;#n=new Map;#e=t=>{const n=this.#t(t);return[(this.#n.get(n)||[]).find(i=>Ii(i,t)),n]};constructor(){super()}static init(t){const n=new $c;return t&&(n.#t=t),n}clear(){super.clear(),this.#n.clear()}delete(t){if(xi(t))return super.delete(t);const[n,i]=this.#e(t);return super.delete(n)?(this.#n.set(i,this.#n.get(i).filter(s=>!Ii(s,n))),!0):!1}get(t){if(xi(t))return super.get(t);const[n,i]=this.#e(t);return super.get(n)}has(t){if(xi(t))return super.has(t);const[n,i]=this.#e(t);return super.has(n)}set(t,n){if(xi(t))return super.set(t,n);const[i,s]=this.#e(t);if(super.has(i))super.set(i,n);else{super.set(t,n);const r=this.#n.get(s)||[];r.push(t),this.#n.set(s,r)}return this}get size(){return super.size}}function ie(e,t){if(!e)throw new pl(t)}const A2=Object.keys(gv).reduce((e,t)=>(e["[object "+t[0].toUpperCase()+t.substring(1)+"]"]=t,e),{});function za(e){const t=Object.prototype.toString.call(e);return t==="[object Object]"?e?.constructor?.name?.toLowerCase()||"object":A2[t]||t.substring(8,t.length-1).toLowerCase()}const ar=e=>typeof e=="boolean",pn=e=>typeof e=="string",R2=e=>typeof e=="symbol",Fe=e=>!isNaN(e)&&typeof e=="number",yt=Array.isArray;function xe(e){if(!e)return!1;const t=Object.getPrototypeOf(e);return(t===Object.prototype||t===null)&&za(e)==="object"}const mv=e=>!xi(e),ja=e=>e instanceof Date,fs=e=>e instanceof RegExp,cd=e=>typeof e=="function",He=e=>e==null,L2=(e,t=!0)=>!!e||t&&e==="",ld=e=>He(e)||pn(e)&&!e||yt(e)&&e.length===0||xe(e)&&Object.keys(e).length===0,oo=e=>yt(e)?e:[e],vr=(e,t)=>!!e&&Object.prototype.hasOwnProperty.call(e,t),N2=e=>typeof ArrayBuffer<"u"&&ArrayBuffer.isView(e),Wa=(e,t)=>{if(He(e)||ar(e)||Fe(e)||pn(e))return e;if(ja(e))return new Date(e);if(fs(e))return new RegExp(e);if(N2(e)){const n=e.constructor;return new n(e)}if(t instanceof Set||(t=new Set),t.has(e))throw fv;t.add(e);try{if(yt(e)){const n=new Array(e.length);for(let i=0;i<e.length;i++)n[i]=Wa(e[i],t);return n}if(xe(e)){const n={};for(const i of Object.keys(e))n[i]=Wa(e[i],t);return n}}finally{t.delete(e)}return e},jf=e=>e===Ba;function Kh(e,t){if(jf(e)||He(e))return t;if(jf(t)||He(t))return e;if(xi(e)||xi(t))return t;yt(e)&&yt(t)&&ie(e.length===t.length,"arrays must be of equal length to merge.");for(const n of Object.keys(t))e[n]=Kh(e[n],t[n]);return e}function F2(e,t=gl){const n=[$c.init(t),$c.init(t)];if(e.length===0)return[];if(e.some(i=>i.length===0))return[];if(e.length===1)return[...e];e[e.length-1].forEach(i=>n[0].set(i,!0));for(let i=e.length-2;i>-1;i--){if(e[i].forEach(s=>{n[0].has(s)&&n[1].set(s,!0)}),n[1].size===0)return[];n.reverse(),n[1].clear()}return Array.from(n[0].keys())}function vv(e,t=1){const n=new Array;function i(s,r){for(let a=0,o=s.length;a<o;a++)yt(s[a])&&(r>0||r<0)?i(s[a],Math.max(-1,r-1)):n.push(s[a])}return i(e,t),n}function B2(e){const t={};for(;e;){for(const n of Object.getOwnPropertyNames(e))n in t||(t[n]=e[n]);e=Object.getPrototypeOf(e)}return t}function bv(e){for(;e;){if(Object.getOwnPropertyNames(e).includes("toString"))return e.toString!==Object.prototype.toString;e=Object.getPrototypeOf(e)}return!1}function Ii(e,t){if(e===t||Object.is(e,t))return!0;if(e===null||t===null||typeof e!=typeof t||typeof e!="object"||e.constructor!==t.constructor)return!1;if(e instanceof Date)return+e==+t;if(e instanceof RegExp)return e.toString()===t.toString();const n=e.constructor;if(n===Array||n===Object){const i=Object.keys(e).sort(),s=Object.keys(t).sort();if(i.length!==s.length)return!1;for(let r=0,a=i[r];r<i.length;a=i[++r])if(a!==s[r]||!Ii(e[a],t[a]))return!1;return!0}return bv(e)&&e.toString()===t.toString()}const Yo=(e,t)=>{if(e===null)return"null";if(e===void 0)return"undefined";if(pn(e)||Fe(e)||ar(e))return JSON.stringify(e);if(ja(e))return e.toISOString();if(fs(e)||R2(e)||cd(e))return e.toString();if(t instanceof Set||(t=new Set),t.has(e))throw fv;try{if(t.add(e),yt(e))return"["+e.map(i=>Yo(i,t)).join(",")+"]";if(xe(e))return"{"+Object.keys(e).sort().map(s=>`${s}:${Yo(e[s],t)}`).join()+"}";const n=bv(e)?e.toString():Yo(B2(e),t);return za(e)+"("+n+")"}finally{t.delete(e)}};function z2(e,t){return He(e)?null:(t=t||gl,t(e))}function j2(e,t,n=gl){if(e.length<1)return new Map;const i=new Map,s=new Map;for(let r=0;r<e.length;r++){const a=e[r],o=t(a,r),c=z2(o,n);if(c===null)s.has(null)?s.get(null).push(a):s.set(null,[a]);else{const l=i.has(c)?i.get(c).find(h=>Ii(h,o)):null;He(l)?(s.set(o,[a]),i.has(c)?i.get(c).push(o):i.set(c,[o])):s.get(l).push(a)}}return s}function Yh(e,t){return mv(e)?e[t]:void 0}function W2(e,t){if(t<1)return e;for(;t--&&e.length===1;)e=e[0];return e}function Ss(e,t,n){let i=0;function s(a,o){let c=a;for(let l=0;l<o.length;l++){const h=o[l];if(/^\d+$/.exec(h)===null&&yt(c)){if(l===0&&i>0)break;i+=1;const d=o.slice(l);c=c.reduce((f,p)=>{const g=s(p,d);return g!==void 0&&f.push(g),f},[]);break}else c=Yh(c,h);if(c===void 0)break}return c}const r=pv(e)?e:s(e,t.split("."));return yt(r)&&n?.unwrapArray?W2(r,i):r}function va(e,t,n){const i=t.indexOf("."),s=i==-1?t:t.substring(0,i),r=t.substring(i+1),a=i!=-1;if(yt(e)){const l=/^\d+$/.test(s),h=l&&n?.preserveIndex?[...e]:[];if(l){const u=parseInt(s);let d=Yh(e,u);a&&(d=va(d,r,n)),n?.preserveIndex?h[u]=d:h.push(d)}else for(const u of e){const d=va(u,t,n);n?.preserveMissing?h.push(d??Ba):(d!=null||n?.preserveIndex)&&h.push(d)}return h}const o=n?.preserveKeys?{...e}:{};let c=Yh(e,s);if(a&&(c=va(c,r,n)),c!==void 0)return o[s]=c,o}function Xh(e){if(yt(e))for(let t=e.length-1;t>=0;t--)e[t]===Ba?e.splice(t,1):Xh(e[t]);else if(xe(e))for(const t in e)vr(e,t)&&Xh(e[t])}const Wf=/^\d+$/;function Ic(e,t,n,i){const s=t.split("."),r=s[0],a=s.slice(1).join(".");if(s.length===1)(xe(e)||yt(e)&&Wf.test(r))&&n(e,r);else{i?.buildGraph&&He(e[r])&&(e[r]={});const o=e[r];if(!o)return;const c=!!(s.length>1&&Wf.test(s[1]));yt(o)&&i?.descendArray&&!c?o.forEach(l=>Ic(l,a,n,i)):Ic(o,a,n,i)}}function H2(e,t,n){Ic(e,t,(i,s)=>{i[s]=cd(n)?n(i[s]):n},{buildGraph:!0})}function Hf(e,t,n){Ic(e,t,(i,s)=>{if(yt(i)){if(/^\d+$/.test(s))i.splice(parseInt(s),1);else if(n&&n.descendArray)for(const r of i)xe(r)&&delete r[s]}else xe(i)&&delete i[s]},n)}const V2=/^\$[a-zA-Z0-9_]+$/;function Ns(e){return V2.test(e)}function _v(e){if(pv(e))return fs(e)?{$regex:e}:{$eq:e};if(mv(e)){if(!Object.keys(e).some(Ns))return{$eq:e};if(vr(e,"$regex")){const t={...e};return t.$regex=new RegExp(e.$regex,e.$options),delete t.$options,t}}return e}var Gh=(e=>(e[e.CLONE_OFF=0]="CLONE_OFF",e[e.CLONE_INPUT=1]="CLONE_INPUT",e[e.CLONE_OUTPUT=2]="CLONE_OUTPUT",e[e.CLONE_ALL=3]="CLONE_ALL",e))(Gh||{});class ps{#t;#n;#e;constructor(t,n,i){this.#t=t,this.update(n,i)}static init(t,n,i){return t instanceof ps?new ps(t.#t,t.root??n,{...t.#e,...i,variables:Object.assign({},t.#e?.variables,i?.variables)}):new ps(t,n,i)}update(t,n){this.#n=t;const i=Object.assign({},this.#e?.variables,n?.variables);return Object.keys(i).length?this.#e={...n,variables:i}:this.#e=n??{},this}getOptions(){return Object.freeze({...this.#t,context:ks.from(this.#t.context)})}get root(){return this.#n}get local(){return this.#e}get idKey(){return this.#t.idKey}get collation(){return this.#t?.collation}get processingMode(){return this.#t?.processingMode||0}get useStrictMode(){return this.#t?.useStrictMode}get scriptEnabled(){return this.#t?.scriptEnabled}get useGlobalContext(){return this.#t?.useGlobalContext}get hashFunction(){return this.#t?.hashFunction}get collectionResolver(){return this.#t?.collectionResolver}get jsonSchemaValidator(){return this.#t?.jsonSchemaValidator}get variables(){return this.#t?.variables}get context(){return this.#t?.context}}function U2(e){return e instanceof ps?e.getOptions():Object.freeze({idKey:"_id",scriptEnabled:!0,useStrictMode:!0,useGlobalContext:!0,processingMode:0,...e,context:e?.context?ks.from(e?.context):ks.init()})}class ks{#t=new Map;constructor(){}static init(){return new ks}static from(t){const n=ks.init();return He(t)||t.#t.forEach((i,s)=>n.addOperators(s,i)),n}addOperators(t,n){this.#t.has(t)||this.#t.set(t,{});for(const[i,s]of Object.entries(n))this.getOperator(t,i)||(this.#t.get(t)[i]=s);return this}getOperator(t,n){return(this.#t.get(t)??{})[n]??null}addAccumulatorOps(t){return this.addOperators("accumulator",t)}addExpressionOps(t){return this.addOperators("expression",t)}addQueryOps(t){return this.addOperators("query",t)}addPipelineOps(t){return this.addOperators("pipeline",t)}addProjectionOps(t){return this.addOperators("projection",t)}addWindowOps(t){return this.addOperators("window",t)}}const ns=ks.init();function Vf(e,t){for(const[n,i]of Object.entries(t)){ie(cd(i)&&Ns(n),`'${n}' is not a valid operator`);const s=Ha(e,n,null);ie(!s||i===s,`${n} already exists for '${e}' operators. Cannot change operator function once registered.`)}switch(e){case"accumulator":ns.addAccumulatorOps(t);break;case"expression":ns.addExpressionOps(t);break;case"pipeline":ns.addPipelineOps(t);break;case"projection":ns.addProjectionOps(t);break;case"query":ns.addQueryOps(t);break;case"window":ns.addWindowOps(t);break}}function Ha(e,t,n){const{context:i,useGlobalContext:s}=n||{},r=i?i.getOperator(e,t):null;return!r&&s?ns.getOperator(e,t):r}function Qs(e,t,n,i){const s=ps.init(i,e);return n&&Ns(n)?yv(e,t,n,s):Pc(e,t,s)}const q2=["$$ROOT","$$CURRENT","$$REMOVE","$$NOW"];function Pc(e,t,n){if(pn(t)&&t.length>0&&t[0]==="$"){if(K2.includes(t))return t;let i=n.root;const s=t.split(".");if(q2.includes(s[0])){switch(s[0]){case"$$ROOT":break;case"$$CURRENT":i=e;break;case"$$REMOVE":i=void 0;break;case"$$NOW":i=new Date;break}t=t.slice(s[0].length+1)}else if(s[0].slice(0,2)==="$$"){i=Object.assign({},n.variables,{this:e},n?.local?.variables);const r=s[0].slice(2);ie(vr(i,r),`Use of undefined variable: ${r}`),t=t.slice(2)}else t=t.slice(1);return t===""?i:Ss(i,t)}if(yt(t))return t.map(i=>Pc(e,i,n));if(xe(t)){const i={},s=Object.entries(t);for(const[r,a]of s){if(Ns(r))return ie(s.length==1,"expression must have single operator."),yv(e,a,r,n);i[r]=Pc(e,a,n)}return i}return t}function yv(e,t,n,i){const s=Ha("expression",n,i);if(s)return s(e,t,i);const r=Ha("accumulator",n,i);return ie(!!r,`accumulator '${n}' is not registered.`),yt(e)||(e=Pc(e,t,i),t=null),ie(yt(e),`arguments must resolve to array for ${n}.`),r(e,t,i)}const K2=["$$KEEP","$$PRUNE","$$DESCEND"];function Va(e){return e instanceof Uf?e:new Uf(e)}function Y2(...e){let t=0;return Va(()=>{for(;t<e.length;){const n=e[t].next();if(!n.done)return n;t++}return{done:!0}})}function X2(e){return!!e&&typeof e=="object"&&e?.next instanceof Function}function G2(e,t){const n=e.slice(t+1);e.splice(t),Array.prototype.push.apply(e,n)}const Qh=new Error;function Q2(e,t,n){let i=!1,s=-1,r=0;return function(a){try{t:for(;!i;){let o=e();s++;let c=-1;const l=t.length;let h=!1;for(;++c<l;){const u=t[c];switch(u.action){case 0:o=u.func(o,s);break;case 1:if(!u.func(o,s))continue t;break;case 2:--u.count,u.count||(h=!0);break;case 3:--u.count,u.count||G2(t,c);continue t;default:break t}}if(i=h,a)n[r++]=o;else return{value:o,done:!1}}}catch(o){if(o!==Qh)throw o}return i=!0,{done:i}}}let Uf=class{constructor(t){this.#t=[],this.#n=[],this.isDone=!1;let n;if(t instanceof Function&&(t={next:t}),X2(t)){const i=t;n=()=>{const s=i.next();if(s.done)throw Qh;return s.value}}else if(yt(t)){const i=t,s=i.length;let r=0;n=()=>{if(r<s)return i[r++];throw Qh}}else if(!(t instanceof Function))throw new pl("Lazy must be initialized with an array, generator, or function.");this.#e=Q2(n,this.#t,this.#n)}#t;#n;#e;push(t,n){return typeof n=="function"?this.#t.push({action:t,func:n}):typeof n=="number"&&this.#t.push({action:t,count:n}),this}next(){return this.#e()}map(t){return this.push(0,t)}filter(t){return this.push(1,t)}take(t){return t>0?this.push(2,t):this}drop(t){return t>0?this.push(3,t):this}transform(t){const n=this;let i;return Va(()=>(i||(i=Va(t(n.value()))),i.next()))}value(){return this.isDone||(this.isDone=this.#e(!0).done),this.#n}each(t){for(;;){const n=this.next();if(n.done)break;if(t(n.value)===!1)return!1}return!0}reduce(t,n){let i=this.next();for(n===void 0&&!i.done&&(n=i.value,i=this.next());!i.done;)n=t(n,i.value),i=this.next();return n}size(){return this.reduce((t,n)=>++t,0)}[Symbol.iterator](){return this}};const J2=(e,t,n)=>e.take(t),wv=(e,t,n)=>ld(t)?e:(Sv(t,n),e.map(xv(t,ps.init(n))));function xv(e,t,n=!0){const i=t.idKey,s=Object.keys(e),r=new Array,a=new Array,o={};for(const f of s){const p=e[f];if(Fe(p)||ar(p))p?a.push(f):r.push(f);else if(yt(p))o[f]=g=>p.map(m=>Qs(g,m,null,t.update(g))??null);else if(xe(p)){const g=Object.keys(p),m=g.length==1?g[0]:"",b=Ha("projection",m,t);b?m==="$slice"&&!oo(p[m]).every(Fe)?o[f]=w=>Qs(w,p,f,t.update(w)):o[f]=w=>b(w,p[m],f,t.update(w)):Ns(m)?o[f]=_=>Qs(_,p[m],m,t):(Sv(p,t),o[f]=_=>{if(!vr(_,f))return Qs(_,p,null,t);n&&t.update(_);const w=Ss(_,f),C=xv(p,t,!1);return yt(w)?w.map(C):xe(w)?C(w):C(_)})}else o[f]=pn(p)&&p[0]==="$"?g=>Qs(g,p,f,t):g=>p}const c=Object.keys(o),l=r.includes(i);if(n&&l&&r.length===1&&!a.length&&!c.length)return f=>{const p={...f};return delete p[i],p};const u=n&&!l&&!a.includes(i),d={preserveMissing:!0};return f=>{const p={};if(r.length&&!a.length){Kh(p,f);for(const g of r)Hf(p,g,{descendArray:!0})}for(const g of a){const m=va(f,g,d)??{};Kh(p,m)}a.length&&Xh(p);for(const g of c){const m=o[g](f);m===void 0?Hf(p,g,{descendArray:!0}):H2(p,g,m)}return u&&vr(f,i)&&(p[i]=Ss(f,i)),p}}function Sv(e,t){let n=!1,i=!1;for(const[s,r]of Object.entries(e))ie(!s.startsWith("$"),"Field names may not start with '$'."),ie(!s.endsWith(".$"),"Positional projection operator '$' is not supported."),s!==t?.idKey&&(r===0||r===!1?n=!0:(r===1||r===!0)&&(i=!0),ie(!(n&&i),"Projection cannot have a mix of inclusion and exclusion."))}const Z2=(e,t,n)=>e.drop(t),kv=(e,t,n)=>{if(ld(t)||!xe(t))return e;let i=Ri;const s=n.collation;return xe(s)&&pn(s.locale)&&(i=eS(s)),e.transform(r=>{const a=Object.keys(t);for(const o of a.reverse()){const c=j2(r,u=>Ss(u,o),n.hashFunction),l=Array.from(c.keys()).sort(i);t[o]===-1&&l.reverse();let h=0;for(const u of l)for(const d of c.get(u))r[h++]=d;ie(h==r.length,"bug: counter must match collection size.")}return r})},tS={1:"base",2:"accent",3:"variant"};function eS(e){const t={sensitivity:tS[e.strength||3],caseFirst:e.caseFirst==="off"?"false":e.caseFirst||"false",numeric:e.numericOrdering||!1,ignorePunctuation:e.alternate==="shifted"};(e.caseLevel||!1)===!0&&(t.sensitivity==="base"&&(t.sensitivity="case"),t.sensitivity==="accent"&&(t.sensitivity="variant"));const n=new Intl.Collator(e.locale,t);return(i,s)=>{if(!pn(i)||!pn(s))return Ri(i,s);const r=n.compare(i,s);return r<0?-1:r>0?1:0}}const nS={$sort:kv,$skip:Z2,$limit:J2};class iS{#t;#n;#e;#s;#a={};#i=null;#r=[];constructor(t,n,i,s){this.#t=t,this.#n=n,this.#e=i,this.#s=s}fetch(){if(this.#i)return this.#i;this.#i=Va(this.#t).filter(this.#n);const t=this.#s.processingMode;t&Gh.CLONE_INPUT&&this.#i.map(Wa);for(const n of["$sort","$skip","$limit"])vr(this.#a,n)&&(this.#i=nS[n](this.#i,this.#a[n],this.#s));return Object.keys(this.#e).length&&(this.#i=wv(this.#i,this.#e,this.#s)),t&Gh.CLONE_OUTPUT&&this.#i.map(Wa),this.#i}fetchAll(){const t=Va([...this.#r]);return this.#r=[],Y2(t,this.fetch())}all(){return this.fetchAll().value()}count(){return this.all().length}skip(t){return this.#a.$skip=t,this}limit(t){return this.#a.$limit=t,this}sort(t){return this.#a.$sort=t,this}collation(t){return this.#s={...this.#s,collation:t},this}next(){if(this.#r.length>0)return this.#r.pop();const t=this.fetch().next();if(!t.done)return t.value}hasNext(){if(this.#r.length>0)return!0;const t=this.fetch().next();return t.done?!1:(this.#r.push(t.value),!0)}map(t){return this.all().map(t)}forEach(t){this.all().forEach(t)}[Symbol.iterator](){return this.fetchAll()}}const sS=new Set(Array.from(["$and","$or","$nor","$expr","$jsonSchema"]));class co{#t;#n;#e;constructor(t,n){this.#e=Wa(t),this.#n=U2(n),this.#t=[],this.compile()}compile(){ie(xe(this.#e),`query criteria must be an object: ${JSON.stringify(this.#e)}`);const t={};for(const[n,i]of Object.entries(this.#e)){if(n==="$where")ie(this.#n.scriptEnabled,"$where operator requires 'scriptEnabled' option to be true."),Object.assign(t,{field:n,expr:i});else if(sS.has(n))this.processOperator(n,n,i);else{ie(!Ns(n),`unknown top level operator: ${n}`);for(const[s,r]of Object.entries(_v(i)))this.processOperator(n,s,r)}t.field&&this.processOperator(t.field,t.field,t.expr)}}processOperator(t,n,i){const s=Ha("query",n,this.#n);ie(!!s,`unknown query operator ${n}`),this.#t.push(s(t,i,this.#n))}test(t){return this.#t.every(n=>n(t))}find(t,n){return new iS(t,i=>this.test(i),n||{},this.#n)}remove(t){return t.reduce((n,i)=>(this.test(i)||n.push(i),n),[])}}const rS=["monday","mon","tuesday","tue","wednesday","wed","thursday","thu","friday","fri","saturday","sat","sunday","sun"];new Set(rS);function qe(e){return(n,i,s)=>{const r={unwrapArray:!0},a=Math.max(1,n.split(".").length-1);return o=>{const c=Ss(o,n,r);return e(c,i,{...s,depth:a})}}}function Cv(e,t,n){return Ii(e,t)||He(e)&&He(t)?!0:yt(e)?e.some(i=>Ii(i,t))||vv(e,n?.depth).some(i=>Ii(i,t)):!1}function aS(e,t,n){return!Cv(e,t,n)}function Mv(e,t,n){return He(e)?t.some(i=>i===null):F2([oo(e),t],n?.hashFunction).length>0}function oS(e,t,n){return!Mv(e,t,n)}function cS(e,t,n){return ml(e,t,(i,s)=>Ri(i,s)<0)}function lS(e,t,n){return ml(e,t,(i,s)=>Ri(i,s)<=0)}function hS(e,t,n){return ml(e,t,(i,s)=>Ri(i,s)>0)}function uS(e,t,n){return ml(e,t,(i,s)=>Ri(i,s)>=0)}function dS(e,t,n){return oo(e).some(i=>t.length===2&&i%t[0]===t[1])}function fS(e,t,n){const i=oo(e),s=r=>pn(r)&&L2(t.exec(r),n?.useStrictMode);return i.some(s)||vv(i,1).some(s)}function pS(e,t,n){return Array.isArray(e)&&e.length===t}function gS(e){return Ns(e)&&["$and","$or","$nor"].indexOf(e)===-1}function mS(e,t,n){if(yt(e)&&!ld(e)){let i=a=>a,s=t;Object.keys(t).every(gS)&&(s={temp:t},i=a=>({temp:a}));const r=new co(s,n);for(let a=0,o=e.length;a<o;a++)if(r.test(i(e[a])))return!0}return!1}const qf=e=>e===null,vS={array:yt,boolean:ar,bool:ar,date:ja,number:Fe,int:Fe,long:Fe,double:Fe,decimal:Fe,null:qf,object:xe,regexp:fs,regex:fs,string:pn,undefined:He,function:e=>{throw new pl("unsupported type key `function`.")},1:Fe,2:pn,3:xe,4:yt,6:He,8:ar,9:ja,10:qf,11:fs,16:Fe,18:Fe,19:Fe};function Kf(e,t,n){const i=vS[t];return i?i(e):!1}function bS(e,t,n){return yt(t)?t.findIndex(i=>Kf(e,i))>=0:Kf(e,t)}function ml(e,t,n){return oo(e).some(i=>za(i)===za(t)&&n(i,t))}const Yf=(e,t)=>{const n={};return e.split("").forEach((i,s)=>n[i]=t*(s+1)),n};({...Yf("ABCDEFGHIKLM",1),...Yf("NOPQRSTUVWXY",-1)});const Xf={undefined:null,null:null,NaN:NaN,Infinity:new Error,"-Infinity":new Error};function Ke(e,t=Xf){const n=Object.assign({},Xf,t),i=new Set(Object.keys(n));return(s,r,a)=>{const o=Qs(s,r,null,a);if(i.has(`${o}`)){const c=n[`${o}`];if(c instanceof Error)throw new pl(`cannot apply $${e.name} to -inf, value must in (-inf,inf)`);return c}return e(o)}}Ke(Math.acos,{Infinity:1/0,0:new Error});Ke(Math.acosh,{Infinity:1/0,0:new Error});Ke(Math.asin);Ke(Math.asinh,{Infinity:1/0,"-Infinity":-1/0});Ke(Math.atan);Ke(Math.atanh,{1:1/0,"-1":-1/0});Ke(Math.cos);Ke(Math.cosh,{"-Infinity":1/0,Infinity:1/0});const _S=Math.PI/180;Ke(e=>e*_S,{Infinity:1/0,"-Infinity":1/0});const yS=180/Math.PI;Ke(e=>e*yS,{Infinity:1/0,"-Infinity":-1/0});Ke(Math.sin);Ke(Math.sinh,{"-Infinity":-1/0,Infinity:1/0});Ke(Math.tan);const wS=(e,t,n)=>{ie(yt(t),"Invalid expression: $and expects value to be an Array.");const i=t.map(s=>new co(s,n));return s=>i.every(r=>r.test(s))},Ev=(e,t,n)=>{ie(yt(t),"Invalid expression. $or expects value to be an Array");const i=t.map(s=>new co(s,n));return s=>i.some(r=>r.test(s))},xS=(e,t,n)=>{ie(yt(t),"Invalid expression. $nor expects value to be an array.");const i=Ev("$or",t,n);return s=>!i(s)},SS=(e,t,n)=>{const i={};i[e]=_v(t);const s=new co(i,n);return r=>!s.test(r)},kS=qe(Cv),CS=qe(hS),MS=qe(uS),ES=qe(Mv),DS=qe(cS),$S=qe(lS),IS=qe(aS),PS=qe(oS),OS=qe(dS),TS=qe(fS),AS=qe(mS),RS=qe(pS),LS=(e,t,n)=>{const i=e.includes("."),s=!!t;return!i||e.match(/\.\d+$/)?r=>Ss(r,e)!==void 0===s:r=>{const a=va(r,e,{preserveIndex:!0}),o=Ss(a,e.substring(0,e.lastIndexOf(".")));return yt(o)?o.some(c=>c!==void 0)===s:o!==void 0===s}},NS=qe(bS);var Gf=!1;function FS(e){return Gf||(Vf("pipeline",{$sort:kv,$project:wv}),Vf("query",{$and:wS,$eq:kS,$elemMatch:AS,$exists:LS,$gt:CS,$gte:MS,$in:ES,$lt:DS,$lte:$S,$ne:IS,$nin:PS,$mod:OS,$nor:xS,$not:SS,$or:Ev,$regex:TS,$size:RS,$type:NS}),Gf=!0),new co(e)}function or(e,t){var n=mn(e.primaryKey);t=Pt(t);var i=Te(t);if(typeof i.skip!="number"&&(i.skip=0),i.selector?(i.selector=i.selector,Object.entries(i.selector).forEach(([u,d])=>{(typeof d!="object"||d===null)&&(i.selector[u]={$eq:d})})):i.selector={},i.index){var s=Sc(i.index);s.includes(n)||s.push(n),i.index=s}if(i.sort){var h=i.sort.find(u=>tx(u)===n);h||(i.sort=i.sort.slice(0),i.sort.push({[n]:"asc"}))}else if(i.index)i.sort=i.index.map(u=>({[u]:"asc"}));else{if(e.indexes){var r=new Set;Object.entries(i.selector).forEach(([u,d])=>{var f=!1;typeof d=="object"&&d!==null?f=!!Object.keys(d).find(p=>od.has(p)):f=!0,f&&r.add(u)});var a=-1,o;e.indexes.forEach(u=>{var d=kc(u)?u:[u],f=d.findIndex(p=>!r.has(p));f>0&&f>a&&(a=f,o=d)}),o&&(i.sort=o.map(u=>({[u]:"asc"})))}if(!i.sort)if(e.indexes&&e.indexes.length>0){var c=e.indexes[0],l=kc(c)?c:[c];i.sort=l.map(u=>({[u]:"asc"}))}else i.sort=[{[n]:"asc"}]}return i}function BS(e,t){if(!t.sort)throw F("SNH",{query:t});var n=[];t.sort.forEach(s=>{var r=Object.keys(s)[0],a=Object.values(s)[0];n.push({key:r,direction:a,getValueFn:Z1(r)})});var i=(s,r)=>{for(var a=0;a<n.length;++a){var o=n[a],c=o.getValueFn(s),l=o.getValueFn(r);if(c!==l){var h=o.direction==="asc"?Ri(c,l):Ri(l,c);return h}}};return i}function Dv(e,t){if(!t.sort)throw F("SNH",{query:t});var n=FS(t.selector),i=s=>n.test(s);return i}async function Fr(e,t){var n=await e.exec();if(!n)return null;if(Array.isArray(n))return Promise.all(n.map(s=>t(s)));if(n instanceof Map)return Promise.all([...n.values()].map(s=>t(s)));var i=await t(n);return i}function vl(e,t){if(!t.sort)throw F("SNH",{query:t});var n=D2(e,t);return{query:t,queryPlan:n}}var zS="_rxdb_internal";async function Pr(e,t){var n=await e.findDocumentsById([t],!1),i=n[0];if(i)return i}async function br(e,t,n){var i=await e.bulkWrite([t],n);if(i.error.length>0){var s=i.error[0];throw s}else{var r=mn(e.schema.primaryKey),a=an(r,[t],i),o=a[0];return o}}function jS(e,t){var n=Pr(e,t),i=e.changeStream().pipe(Dt(s=>s.events.find(r=>r.documentId===t)),pt(s=>!!s),Dt(s=>Promise.resolve(V(s).documentData)),ao(n),hv(s=>s),pt(s=>!!s));return i}function Ua(e){return Object.assign({},...e.filter(t=>!!t))}function Oc(e,t,n,i){if(i)throw i.status===409?F("CONFLICT",{collection:e.name,id:t,writeError:i,data:n}):i.status===422?F("VD2",{collection:e.name,id:t,writeError:i,data:n}):i}function qL(e,t,n,i,s,r,a){for(var o=!!e.schema.attachments,c=[],l=[],h=[],u=Rs(10),d={id:u,events:[],checkpoint:null,context:s},f=d.events,p=[],g=[],m=[],b=n.size>0,_,w=i.length,C=function(){var E=i[x],M=E.document,v=E.previous,y=M[t],S=M._deleted,$=v&&v._deleted,D=void 0;b&&(D=n.get(y));var O;if(D){var W=D._rev;if(!v||v&&W!==v._rev){var R={isError:!0,status:409,documentId:y,writeRow:E,documentInDb:D};return h.push(R),1}var H=o?th(E):E;o&&(S?v&&Object.keys(v._attachments).forEach(P=>{g.push({documentId:y,attachmentId:P,digest:V(v)._attachments[P].digest})}):(Object.entries(M._attachments).find(([P,J])=>{var lt=v?v._attachments[P]:void 0;return!lt&&!J.data&&(O={documentId:y,documentInDb:D,isError:!0,status:510,writeRow:E,attachmentId:P}),!0}),O||Object.entries(M._attachments).forEach(([P,J])=>{var lt=v?v._attachments[P]:void 0;if(!lt)p.push({documentId:y,attachmentId:P,attachmentData:J,digest:J.digest});else{var St=H.document._attachments[P].digest;J.data&&lt.digest!==St&&m.push({documentId:y,attachmentId:P,attachmentData:J,digest:J.digest})}}))),O?h.push(O):(o?l.push(th(H)):l.push(H),_=H);var A=null,z=null,L=null;if($&&!S)L="INSERT",A=o?kn(M):M;else if(v&&!$&&!S)L="UPDATE",A=o?kn(M):M,z=v;else if(S)L="DELETE",A=V(M),z=v;else throw F("SNH",{args:{writeRow:E}});var j={documentId:y,documentData:A,previousDocumentData:z,operation:L};f.push(j)}else{var B=!!S;if(o&&Object.entries(M._attachments).forEach(([P,J])=>{J.data?p.push({documentId:y,attachmentId:P,attachmentData:J,digest:J.digest}):(O={documentId:y,isError:!0,status:510,writeRow:E,attachmentId:P},h.push(O))}),O||(o?c.push(th(E)):c.push(E),_=E),!B){var N={documentId:y,operation:"INSERT",documentData:o?kn(M):M,previousDocumentData:o&&v?kn(v):v};f.push(N)}}},x=0;x<w;x++)C();return{bulkInsertDocs:c,bulkUpdateDocs:l,newestRow:_,errors:h,eventBulk:d,attachmentsAdd:p,attachmentsRemove:g,attachmentsUpdate:m}}function th(e){return{previous:e.previous,document:kn(e.document)}}function WS(e){return atob(e).length}function HS(e){var t=e.data;if(!t)return e;var n={length:WS(t),digest:e.digest,type:e.type};return n}function kn(e){if(!e._attachments||Object.keys(e._attachments).length===0)return e;var t=Pt(e);return t._attachments={},Object.entries(e._attachments).forEach(([n,i])=>{t._attachments[n]=HS(i)}),t}function bl(e){return Object.assign({},e,{_meta:Pt(e._meta)})}function hd(e,t,n){xt.deepFreezeWhenDevMode(n);var i=mn(t.schema.primaryKey),s={originalStorageInstance:t,schema:t.schema,internals:t.internals,collectionName:t.collectionName,databaseName:t.databaseName,options:t.options,async bulkWrite(r,a){for(var o=e.token,c=new Array(r.length),l=gn(),h=0;h<r.length;h++){var u=r[h],d=bl(u.document);d._meta.lwt=l;var f=u.previous;d._rev=ti(o,f),c[h]={document:d,previous:f}}Ae("preStorageWrite",{storageInstance:this.originalStorageInstance,rows:c});var p=await e.lockedRun(()=>t.bulkWrite(c,a)),g={error:[]};Iv.set(g,c);var m=p.error.length===0?[]:p.error.filter(E=>E.status===409&&!E.writeRow.previous&&!E.writeRow.document._deleted&&V(E.documentInDb)._deleted?!0:(g.error.push(E),!1));if(m.length>0){var b=new Set,_=m.map(E=>(b.add(E.documentId),{previous:E.documentInDb,document:Object.assign({},E.writeRow.document,{_rev:ti(e.token,E.documentInDb)})})),w=await e.lockedRun(()=>t.bulkWrite(_,a));_s(g.error,w.error);var C=an(i,c,g,b),x=an(i,_,w);return _s(C,x),g}return g},query(r){return e.lockedRun(()=>t.query(r))},count(r){return e.lockedRun(()=>t.count(r))},findDocumentsById(r,a){return e.lockedRun(()=>t.findDocumentsById(r,a))},getAttachmentData(r,a,o){return e.lockedRun(()=>t.getAttachmentData(r,a,o))},getChangedDocumentsSince:t.getChangedDocumentsSince?(r,a)=>e.lockedRun(()=>t.getChangedDocumentsSince(V(r),a)):void 0,cleanup(r){return e.lockedRun(()=>t.cleanup(r))},remove(){return e.storageInstances.delete(s),e.lockedRun(()=>t.remove())},close(){return e.storageInstances.delete(s),e.lockedRun(()=>t.close())},changeStream(){return t.changeStream()}};return e.storageInstances.add(s),s}function KL(e){if(e.schema.keyCompression)throw F("UT5",{args:{params:e}});if(Tc(e.schema))throw F("UT6",{args:{params:e}});if(e.schema.attachments&&e.schema.attachments.compression)throw F("UT7",{args:{params:e}})}function Tc(e){return!!(e.encrypted&&e.encrypted.length>0||e.attachments&&e.attachments.encrypted)}function VS(e,t,n){var i=mn(e.schema.primaryKey),s=n?n.lwt:Gu,r=n?n.id:"";return or(e.schema,{selector:{$or:[{"_meta.lwt":{$gt:s}},{"_meta.lwt":{$eq:s},[i]:{$gt:n?r:""}}],"_meta.lwt":{$gte:s}},sort:[{"_meta.lwt":"asc"},{[i]:"asc"}],skip:0,limit:t})}async function $v(e,t,n){if(e.getChangedDocumentsSince)return e.getChangedDocumentsSince(t,n);var i=mn(e.schema.primaryKey),s=vl(e.schema,VS(e,t,n)),r=await e.query(s),a=r.documents,o=G1(a);return{documents:a,checkpoint:o?{id:o[i],lwt:o._meta.lwt}:n||{id:"",lwt:0}}}var Iv=new WeakMap,US=new WeakMap;function an(e,t,n,i){return rn(US,n,()=>{var s=[],r=Iv.get(n);if(r||(r=t),n.error.length>0||i){for(var a=i||new Set,o=0;o<n.error.length;o++){var c=n.error[o];a.add(c.documentId)}for(var l=0;l<r.length;l++){var h=r[l].document;a.has(h[e])||s.push(kn(h))}}else{s.length=t.length-n.error.length;for(var u=0;u<r.length;u++){var d=r[u].document;s[u]=kn(d)}}return s})}var Pv=(function(){function e(n,i,s,r){this.queueByDocId=new Map,this.isRunning=!1,this.storageInstance=n,this.primaryPath=i,this.preWrite=s,this.postWrite=r}var t=e.prototype;return t.addWrite=function(i,s){var r=i[this.primaryPath],a=rn(this.queueByDocId,r,()=>[]),o=new Promise((c,l)=>{var h={lastKnownDocumentState:i,modifier:s,resolve:c,reject:l};V(a).push(h),this.triggerRun()});return o},t.triggerRun=async function(){if(!(this.isRunning===!0||this.queueByDocId.size===0)){this.isRunning=!0;var i=[],s=this.queueByDocId;this.queueByDocId=new Map,await Promise.all(Array.from(s.entries()).map(async([a,o])=>{var c=qS(o.map(u=>u.lastKnownDocumentState)),l=c;for(var h of o)try{l=await h.modifier(Te(l))}catch(u){h.reject(u),h.reject=()=>{},h.resolve=()=>{}}try{await this.preWrite(l,c)}catch(u){o.forEach(d=>d.reject(u));return}i.push({previous:c,document:l})}));var r=i.length>0?await this.storageInstance.bulkWrite(i,"incremental-write"):{error:[]};return await Promise.all(an(this.primaryPath,i,r).map(a=>{var o=a[this.primaryPath];this.postWrite(a);var c=pr(s,o);c.forEach(l=>l.resolve(a))})),r.error.forEach(a=>{var o=a.documentId,c=pr(s,o),l=dr(a);if(l){var h=rn(this.queueByDocId,o,()=>[]);c.reverse().forEach(d=>{d.lastKnownDocumentState=V(l.documentInDb),V(h).unshift(d)})}else{var u=Nm(a);c.forEach(d=>d.reject(u))}}),this.isRunning=!1,this.triggerRun()}},e})();function Qf(e){var t=async n=>{var i=ex(n);i._deleted=n._deleted;var s=await e(i),r=Object.assign({},s,{_meta:n._meta,_attachments:n._attachments,_rev:n._rev,_deleted:typeof s._deleted<"u"?s._deleted:n._deleted});return typeof r._deleted>"u"&&(r._deleted=!1),r};return t}function qS(e){var t=e[0],n=Ai(t._rev);return e.forEach(i=>{var s=Ai(i._rev);s>n&&(t=i,n=s)}),t}var _l={get primaryPath(){var e=this;if(e.isInstanceOfRxDocument)return e.collection.schema.primaryPath},get primary(){var e=this;if(e.isInstanceOfRxDocument)return e._data[e.primaryPath]},get revision(){var e=this;if(e.isInstanceOfRxDocument)return e._data._rev},get deleted$(){var e=this;if(e.isInstanceOfRxDocument)return e.$.pipe(Dt(t=>t._data._deleted))},get deleted$$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.deleted$,e.getLatest().deleted,e.collection.database)},get deleted(){var e=this;if(e.isInstanceOfRxDocument)return e._data._deleted},getLatest(){var e=this.collection._docCache.getLatestDocumentData(this.primary);return this.collection._docCache.getCachedRxDocument(e)},get $(){var e=this,t=this.primary;return e.collection.eventBulks$.pipe(pt(n=>!n.isLocal),Dt(n=>n.events.find(i=>i.documentId===t)),pt(n=>!!n),Dt(n=>uv(V(n))),ao(e.collection._docCache.getLatestDocumentData(t)),Fa((n,i)=>n._rev===i._rev),Dt(n=>this.collection._docCache.getCachedRxDocument(n)),ro(io))},get $$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.$,e.getLatest()._data,e.collection.database)},get$(e){if(xt.isDevMode()){if(e.includes(".item."))throw F("DOC1",{path:e});if(e===this.primaryPath)throw F("DOC2");if(this.collection.schema.finalFields.includes(e))throw F("DOC3",{path:e});var t=Na(this.collection.schema.jsonSchema,e);if(!t)throw F("DOC4",{path:e})}return this.$.pipe(Dt(n=>fr(n,e)),Fa())},get$$(e){var t=this.get$(e),n=this.collection.database.getReactivityFactory();return n.fromObservable(t,this.getLatest().get(e),this.collection.database)},populate(e){var t=Na(this.collection.schema.jsonSchema,e),n=this.get(e);if(!n)return td;if(!t)throw F("DOC5",{path:e});if(!t.ref)throw F("DOC6",{path:e,schemaObj:t});var i=this.collection.database.collections[t.ref];if(!i)throw F("DOC7",{ref:t.ref,path:e,schemaObj:t});return t.type==="array"?i.findByIds(n).exec().then(s=>{var r=s.values();return Array.from(r)}):i.findOne(n).exec()},get(e){return Av(this,e)},toJSON(e=!1){if(e)return xt.deepFreezeWhenDevMode(this._data);var t=Pt(this._data);return delete t._rev,delete t._attachments,delete t._deleted,delete t._meta,xt.deepFreezeWhenDevMode(t)},toMutableJSON(e=!1){return Te(this.toJSON(e))},update(e){throw wt("update")},incrementalUpdate(e){throw wt("update")},updateCRDT(e){throw wt("crdt")},putAttachment(){throw wt("attachments")},putAttachmentBase64(){throw wt("attachments")},getAttachment(){throw wt("attachments")},allAttachments(){throw wt("attachments")},get allAttachments$(){throw wt("attachments")},async modify(e,t){var n=this._data,i=await Qf(e)(n);return this._saveData(i,n)},incrementalModify(e,t){return this.collection.incrementalWriteQueue.addWrite(this._data,Qf(e)).then(n=>this.collection._docCache.getCachedRxDocument(n))},patch(e){var t=this._data,n=Te(t);return Object.entries(e).forEach(([i,s])=>{n[i]=s}),this._saveData(n,t)},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e,t){if(e=Pt(e),this._data._deleted)throw F("DOC11",{id:this.primary,document:this});await Tv(this.collection,e,t);var n=[{previous:t,document:e}],i=await this.collection.storageInstance.bulkWrite(n,"rx-document-save-data"),s=i.error[0];return Oc(this.collection,this.primary,e,s),await this.collection._runHooks("post","save",e,this),this.collection._docCache.getCachedRxDocument(an(this.collection.schema.primaryPath,n,i)[0])},async remove(){if(this.deleted)return Promise.reject(F("DOC13",{document:this,id:this.primary}));var e=await this.collection.bulkRemove([this]);if(e.error.length>0){var t=e.error[0];Oc(this.collection,this.primary,this._data,t)}return e.success[0]},incrementalRemove(){return this.incrementalModify(async e=>(await this.collection._runHooks("pre","remove",e,this),e._deleted=!0,e)).then(async e=>(await this.collection._runHooks("post","remove",e._data,e),e))},close(){throw F("DOC14")}};function Ov(e=_l){var t=function(i,s){this.collection=i,this._data=s,this._propertyCache=new Map,this.isInstanceOfRxDocument=!0};return t.prototype=e,t}function KS(e,t,n){var i=new e(t,n);return Ae("createRxDocument",i),i}function Tv(e,t,n){return t._meta=Object.assign({},n._meta,t._meta),xt.isDevMode()&&e.schema.validateChange(n,t),e._runHooks("pre","save",t,n)}function Av(e,t){return rn(e._propertyCache,t,()=>{var n=fr(e._data,t);if(typeof n!="object"||n===null||Array.isArray(n))return xt.deepFreezeWhenDevMode(n);var i=new Proxy(Pt(n),{get(s,r){if(typeof r!="string")return s[r];var a=r.charAt(r.length-1);if(a==="$")if(r.endsWith("$$")){var o=r.slice(0,-2);return e.get$$(Kr(t+"."+o))}else{var c=r.slice(0,-1);return e.get$(Kr(t+"."+c))}else if(a==="_"){var l=r.slice(0,-1);return e.populate(Kr(t+"."+l))}else{var h=s[r];return typeof h=="number"||typeof h=="string"||typeof h=="boolean"?h:Av(e,Kr(t+"."+r))}}});return i})}function ud(e){return e[e.length-1]}function YS(e){const t=typeof e;return e!==null&&(t==="object"||t==="function")}function Jf(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!YS(e)||typeof t!="string")return e;const i=t.split(".");if(i.length===0)return n;for(let s=0;s<i.length;s++){const r=i[s];if(XS(e,r)?e=s===i.length-1?void 0:null:e=e[r],e==null){if(s!==i.length-1)return n;break}}return e===void 0?n:e}function XS(e,t){if(typeof t!="number"&&Array.isArray(e)){const n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}const Rv=e=>!!e.queryParams.limit,GS=e=>e.queryParams.limit===1,QS=e=>!!(e.queryParams.skip&&e.queryParams.skip>0),JS=e=>e.changeEvent.operation==="DELETE",ZS=e=>e.changeEvent.operation==="INSERT",tk=e=>e.changeEvent.operation==="UPDATE",ek=e=>Rv(e)&&e.previousResults.length>=e.queryParams.limit,nk=e=>{const t=e.queryParams.sortFields,n=e.changeEvent.previous,i=e.changeEvent.doc;if(!i)return!1;if(!n)return!0;for(let s=0;s<t.length;s++){const r=t[s],a=Jf(n,r),o=Jf(i,r);if(a!==o)return!0}return!1},ik=e=>{const t=e.changeEvent.id;if(e.keyDocumentMap)return e.keyDocumentMap.has(t);{const n=e.queryParams.primaryKey,i=e.previousResults;for(let s=0;s<i.length;s++)if(i[s][n]===t)return!0;return!1}},sk=e=>{const t=e.previousResults[0];return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},rk=e=>{const t=ud(e.previousResults);return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},ak=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},ok=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=ud(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},ck=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},lk=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=ud(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},hk=e=>{const t=e.changeEvent.previous;return t?e.queryParams.queryMatcher(t):!1},uk=e=>{const t=e.changeEvent.doc;return t?e.queryParams.queryMatcher(t):!1},dk=e=>e.previousResults.length===0,fk={0:ZS,1:tk,2:JS,3:Rv,4:GS,5:QS,6:dk,7:ek,8:sk,9:rk,10:nk,11:ik,12:ak,13:ok,14:ck,15:lk,16:hk,17:uk};function pk(e,t,n,i){var s=e.length,r=s-1,a=0;if(s===0)return e.push(t),0;for(var o;i<=r;)a=i+(r-i>>1),o=e[a],n(o,t)<=0?i=a+1:r=a-1;return n(o,t)<=0&&a++,e.splice(a,0,t),a}const gk=e=>{},dd=e=>{e.previousResults.unshift(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},fd=e=>{e.previousResults.push(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},pd=e=>{const t=e.previousResults.shift();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},gd=e=>{const t=e.previousResults.pop();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},mk=e=>{pd(e),fd(e)},vk=e=>{gd(e),dd(e)},bk=e=>{pd(e),dd(e)},_k=e=>{gd(e),fd(e)},Lv=e=>{e.keyDocumentMap&&e.keyDocumentMap.delete(e.changeEvent.id);const t=e.queryParams.primaryKey,n=e.previousResults;for(let i=0;i<n.length;i++)if(n[i][t]===e.changeEvent.id){n.splice(i,1);break}},yk=e=>{const t=e.changeEvent.doc,n=e.queryParams.primaryKey,i=e.previousResults;for(let s=0;s<i.length;s++)if(i[s][n]===e.changeEvent.id){i[s]=t,e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,t);break}},wk=e=>{const t={_id:"wrongHuman"+new Date().getTime()};e.previousResults.length=0,e.previousResults.push(t),e.keyDocumentMap&&(e.keyDocumentMap.clear(),e.keyDocumentMap.set(t._id,t))},Nv=e=>{const t=e.changeEvent.id,n=e.changeEvent.doc;if(e.keyDocumentMap){if(e.keyDocumentMap.has(t))return;e.keyDocumentMap.set(t,n)}else if(e.previousResults.find(s=>s[e.queryParams.primaryKey]===t))return;pk(e.previousResults,n,e.queryParams.sortComparator,0)},xk=e=>{Lv(e),Nv(e)},Sk=e=>{throw new Error("Action runFullQueryAgain must be implemented by yourself")},kk=e=>{throw new Error("Action unknownAction should never be called")},Ck=["doNothing","insertFirst","insertLast","removeFirstItem","removeLastItem","removeFirstInsertLast","removeLastInsertFirst","removeFirstInsertFirst","removeLastInsertLast","removeExisting","replaceExisting","alwaysWrong","insertAtSortPosition","removeExistingAndInsertAtSortPosition","runFullQueryAgain","unknownAction"],Mk={doNothing:gk,insertFirst:dd,insertLast:fd,removeFirstItem:pd,removeLastItem:gd,removeFirstInsertLast:mk,removeLastInsertFirst:vk,removeFirstInsertFirst:bk,removeLastInsertLast:_k,removeExisting:Lv,replaceExisting:yk,alwaysWrong:wk,insertAtSortPosition:Nv,removeExistingAndInsertAtSortPosition:xk,runFullQueryAgain:Sk,unknownAction:kk},Ek=40;function eh(e){return e.charCodeAt(0)-Ek}function Dk(e){return e?"1":"0"}function Zf(e,t){const n=[];for(let i=0,s=e.length;i<s;i+=t)n.push(e.substring(i,i+t));return n}function $k(e){const t=new Map,i=2+parseInt(e.charAt(0)+e.charAt(1),10)*2,s=e.substring(2,i),r=Zf(s,2);for(let g=0;g<r.length;g++){const m=r[g],b=m.charAt(0),_=eh(m.charAt(1));t.set(b,_)}const a=e.substring(i,e.length-3),o=Zf(a,4);for(let g=0;g<o.length;g++){const m=o[g],b=m.charAt(0),_=m.charAt(1),w=m.charAt(2),C=eh(m.charAt(3));if(!t.has(_))throw new Error("missing node with id "+_);if(!t.has(w))throw new Error("missing node with id "+w);const x=t.get(_),E=t.get(w),M={l:C,0:x,1:E};t.set(b,M)}const c=e.slice(-3),l=c.charAt(0),h=c.charAt(1),u=eh(c.charAt(2)),d=t.get(l),f=t.get(h);return{l:u,0:d,1:f}}function Ik(e,t,n){let i=e,s=e.l;for(;;){const r=t[s](n),a=Dk(r);if(i=i[a],typeof i=="number"||typeof i=="string")return i;s=i.l}}const Pk="14a1b,c+d2e5f0g/h.i4j*k-l)m(n6oeh6pnm6qen6ril6snh6tin6ubo9vce9wmh9xns9yne9zmi9{cm9|ad9}cp9~aq9ae9¡bf9¢bq9£cg9¤ck9¥cn9¦nd9§np9¨nq9©nf9ªng9«nm9¬nk9­mr9®ms9¯mt9°mj9±mk9²ml9³mn9´mc8µ³{8¶¯}8·°¤8¸³§8¹mn8º³«8»³m8¼m´4½z²4¾³w4¿zµ4À¯¶4Á°·4Â³º4Ã³¸4Äm¹4Åv¤7Æyn7ÇÀÁ7È~7É¥¤7ÊÃÄ7Ë¨n7Ìº¹7Í­°7Î®m7Ï¯°7Ð±m7Ñ³m7Ò¼m5ÓÄm5Ô¹m5Õ½°5Ö¾m5×¿°5ØÇÏ5ÙÂm5ÚÊÑ5Û±m5Üºm5ÝÌÑ5ÞÕÍ2ß|2à¡u2á£Å2âÖÎ2ã¦Æ2ä©x2åªÆ2æ×Ø2ç|È2è¡¢2é£É2ê¤¥2ëÙÚ2ì¦Ë2í©n2îªn2ïÛÐ2ðÜÝ2ñ¬n2òÒÓ/óan/ôbn/õcn/öÞâ/÷ßã/øàä/ùáå/úæë/ûçì/üèí/ýéî/þÍÎ/ÿÏÑ/ĀòÔ,ācn,Ăöï,ă¤ñ,Ąúð,ąêñ,ĆþÐ,ćÿÑ,Ĉac0ĉbc0Ċóõ0ċôā0Čßá0čà¤0Ďçé0ďèê0Đ÷ù0đøă0Ēûý0ēüą0ĔmÒ-ĕmĀ-ĖÞæ-ėČĎ-Ęčď-ęĂĄ-ĚĐĒ-ěđē-Ĝ²»-ĝÍÏ-ĞĆć-ğ²³-ĠĔĈ3ġĕĊ3ĢĖė3ģęĚ3ĤĢĝ(ĥĜğ(ĦģĞ(ħĠġ+Ĩĉċ+ĩĤĦ+ĪĘě+īħĨ1ĬĩĪ1ĭĬī*Įĥm*ĭĮ.";let nh;function Ok(){return nh||(nh=$k(Pk)),nh}const Tk=e=>Ik(Ok(),fk,e);function Ak(e){const t=Tk(e);return Ck[t]}function Rk(e,t,n,i,s){const r=Mk[e];return r({queryParams:t,changeEvent:n,previousResults:i,keyDocumentMap:s}),i}function Lk(e,t){return!t.sort||t.sort.length===0?[e]:t.sort.map(n=>Object.keys(n)[0])}var Nk=new WeakMap;function Fk(e){return rn(Nk,e,()=>{var t=e.collection,n=or(t.storageInstance.schema,Te(e.mangoQuery)),i=t.schema.primaryPath,s=BS(t.schema.jsonSchema,n),r=(l,h)=>{var u={docA:l,docB:h};return s(u.docA,u.docB)},a=Dv(t.schema.jsonSchema,n),o=l=>{var h={doc:l};return a(h.doc)},c={primaryKey:e.collection.schema.primaryPath,skip:n.skip,limit:n.limit,sortFields:Lk(i,n),sortComparator:r,queryMatcher:o};return c})}function Bk(e,t){if(!e.collection.database.eventReduce)return{runFullQueryAgain:!0};for(var n=Fk(e),i=V(e._result).docsData.slice(0),s=V(e._result).docsDataMap,r=!1,a=[],o=0;o<t.length;o++){var c=t[o],l=M2(c);l&&a.push(l)}var h=a.find(u=>{var d={queryParams:n,changeEvent:u,previousResults:i,keyDocumentMap:s},f=Ak(d);if(f==="runFullQueryAgain")return!0;if(f!=="doNothing")return r=!0,Rk(f,n,u,i,s),!1});return h?{runFullQueryAgain:!0}:{runFullQueryAgain:!1,changed:r,newResults:i}}var zk=(function(){function e(){this._map=new Map}var t=e.prototype;return t.getByQuery=function(i){var s=i.toString(),r=rn(this._map,s,()=>i);return r},e})();function jk(){return new zk}function tp(e,t){t.uncached=!0;var n=t.toString();e._map.delete(n)}function Wk(e){return e.refCount$.observers.length}var Hk=100,Vk=30*1e3,Uk=(e,t)=>(n,i)=>{if(!(i._map.size<e)){var s=gn()-t,r=[],a=Array.from(i._map.values());for(var o of a)if(!(Wk(o)>0)){if(o._lastEnsureEqual===0&&o._creationTime<s){tp(i,o);continue}r.push(o)}var c=r.length-e;if(!(c<=0)){var l=r.sort((u,d)=>u._lastEnsureEqual-d._lastEnsureEqual),h=l.slice(0,c);h.forEach(u=>tp(i,u))}}},Fv=Uk(Hk,Vk),ih=new WeakSet;function qk(e){ih.has(e)||(ih.add(e),ux().then(()=>fx(200)).then(()=>{e.closed||e.cacheReplacementPolicy(e,e._queryCache),ih.delete(e)}))}var Bv=(function(){function e(n,i,s){this.cacheItemByDocId=new Map,this.tasks=new Set,this.registry=typeof FinalizationRegistry=="function"?new FinalizationRegistry(r=>{var a=r.docId,o=this.cacheItemByDocId.get(a);o&&(o[0].delete(r.revisionHeight+r.lwt+""),o[0].size===0&&this.cacheItemByDocId.delete(a))}):void 0,this.primaryPath=n,this.changes$=i,this.documentCreator=s,i.subscribe(r=>{this.tasks.add(()=>{for(var a=this.cacheItemByDocId,o=0;o<r.length;o++){var c=r[o],l=a.get(c.documentId);if(l){var h=c.documentData;h||(h=c.previousDocumentData),l[1]=h}}}),this.tasks.size<=1&&ul().then(()=>{this.processTasks()})})}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(s=>s()),this.tasks.clear()}},t.getLatestDocumentData=function(i){this.processTasks();var s=pr(this.cacheItemByDocId,i);return s[1]},t.getLatestDocumentDataIfExists=function(i){this.processTasks();var s=this.cacheItemByDocId.get(i);if(s)return s[1]},Bi(e,[{key:"getCachedRxDocuments",get:function(){var n=ep(this);return Xn(this,"getCachedRxDocuments",n)}},{key:"getCachedRxDocument",get:function(){var n=ep(this);return Xn(this,"getCachedRxDocument",i=>n([i])[0])}}])})();function ep(e){var t=e.primaryPath,n=e.cacheItemByDocId,i=e.registry,s=xt.deepFreezeWhenDevMode,r=e.documentCreator,a=o=>{for(var c=new Array(o.length),l=[],h=0;h<o.length;h++){var u=o[h],d=u[t],f=Ai(u._rev),p=void 0,g=void 0,m=n.get(d);m?(p=m[0],g=p.get(f+u._meta.lwt+"")):(p=new Map,m=[p,u],n.set(d,m));var b=g?g.deref():void 0;b||(u=s(u),b=r(u),p.set(f+u._meta.lwt+"",Yk(b)),i&&l.push(b)),c[h]=b}return l.length>0&&i&&(e.tasks.add(()=>{for(var _=0;_<l.length;_++){var w=l[_];i.register(w,{docId:w.primary,revisionHeight:Ai(w.revision),lwt:w._data._meta.lwt})}}),e.tasks.size<=1&&ul().then(()=>{e.processTasks()})),c};return a}function Jh(e,t){var n=e.getCachedRxDocuments;return n(t)}var Kk=typeof WeakRef=="function",Yk=Kk?Xk:Gk;function Xk(e){return new WeakRef(e)}function Gk(e){return{deref(){return e}}}var np=(function(){function e(n,i,s){this.time=gn(),this.query=n,this.count=s,this.documents=Jh(this.query.collection._docCache,i)}var t=e.prototype;return t.getValue=function(i){var s=this.query.op;if(s==="count")return this.count;if(s==="findOne"){var r=this.documents.length===0?null:this.documents[0];if(!r&&i)throw F("QU10",{collection:this.query.collection.name,query:this.query.mangoQuery,op:s});return r}else return s==="findByIds"?this.docsMap:this.documents.slice(0)},Bi(e,[{key:"docsData",get:function(){return Xn(this,"docsData",this.documents.map(n=>n._data))}},{key:"docsDataMap",get:function(){var n=new Map;return this.documents.forEach(i=>{n.set(i.primary,i._data)}),Xn(this,"docsDataMap",n)}},{key:"docsMap",get:function(){for(var n=new Map,i=this.documents,s=0;s<i.length;s++){var r=i[s];n.set(r.primary,r)}return Xn(this,"docsMap",n)}}])})(),Qk=0,Jk=function(){return++Qk},zv=(function(){function e(n,i,s,r={}){this.id=Jk(),this._execOverDatabaseCount=0,this._creationTime=gn(),this._lastEnsureEqual=0,this.uncached=!1,this.refCount$=new nn(null),this._result=null,this._latestChangeEvent=-1,this._ensureEqualQueue=$n,this.op=n,this.mangoQuery=i,this.collection=s,this.other=r,i||(this.mangoQuery=Xo()),this.isFindOneByIdQuery=iC(this.collection.schema.primaryPath,i)}var t=e.prototype;return t._setResultData=function(i){if(typeof i>"u")throw F("QU18",{database:this.collection.database.name,collection:this.collection.name});if(typeof i=="number"){this._result=new np(this,[],i);return}else i instanceof Map&&(i=Array.from(i.values()));var s=new np(this,i,i.length);this._result=s},t._execOverDatabase=async function(){if(this._execOverDatabaseCount=this._execOverDatabaseCount+1,this.op==="count"){var i=this.getPreparedQuery(),s=await this.collection.storageInstance.count(i);if(s.mode==="slow"&&!this.collection.database.allowSlowCount)throw F("QU14",{collection:this.collection,queryObj:this.mangoQuery});return{result:s.count,counter:this.collection._changeEventBuffer.getCounter()}}if(this.op==="findByIds"){var r=V(this.mangoQuery.selector)[this.collection.schema.primaryPath].$in,a=new Map,o=[];if(r.forEach(h=>{var u=this.collection._docCache.getLatestDocumentDataIfExists(h);if(u){if(!u._deleted){var d=this.collection._docCache.getCachedRxDocument(u);a.set(h,d)}}else o.push(h)}),o.length>0){var c=await this.collection.storageInstance.findDocumentsById(o,!1);c.forEach(h=>{var u=this.collection._docCache.getCachedRxDocument(h);a.set(u.primary,u)})}return{result:a,counter:this.collection._changeEventBuffer.getCounter()}}var l=await nC(this);return{result:l.docs,counter:l.counter}},t.exec=async function(i){if(i&&this.op!=="findOne")throw F("QU9",{collection:this.collection.name,query:this.mangoQuery,op:this.op});await ip(this);var s=V(this._result);return s.getValue(i)},t.toString=function(){var i=Cc({op:this.op,query:or(this.collection.schema.jsonSchema,this.mangoQuery),other:this.other},!0),s=JSON.stringify(i);return this.toString=()=>s,s},t.getPreparedQuery=function(){var i={rxQuery:this,mangoQuery:or(this.collection.schema.jsonSchema,this.mangoQuery)};i.mangoQuery.selector._deleted={$eq:!1},i.mangoQuery.index&&i.mangoQuery.index.unshift("_deleted"),Ae("prePrepareQuery",i);var s=vl(this.collection.schema.jsonSchema,i.mangoQuery);return this.getPreparedQuery=()=>s,s},t.doesDocumentDataMatch=function(i){return i._deleted?!1:this.queryMatcher(i)},t.remove=async function(){var i=await this.exec();if(Array.isArray(i)){var s=await this.collection.bulkRemove(i);if(s.error.length>0)throw Nm(s.error[0]);return s.success}else return i.remove()},t.incrementalRemove=function(){return Fr(this.asRxQuery,i=>i.incrementalRemove())},t.update=function(i){throw wt("update")},t.patch=function(i){return Fr(this.asRxQuery,s=>s.patch(i))},t.incrementalPatch=function(i){return Fr(this.asRxQuery,s=>s.incrementalPatch(i))},t.modify=function(i){return Fr(this.asRxQuery,s=>s.modify(i))},t.incrementalModify=function(i){return Fr(this.asRxQuery,s=>s.incrementalModify(i))},t.where=function(i){throw wt("query-builder")},t.sort=function(i){throw wt("query-builder")},t.skip=function(i){throw wt("query-builder")},t.limit=function(i){throw wt("query-builder")},Bi(e,[{key:"$",get:function(){if(!this._$){var n=this.collection.eventBulks$.pipe(pt(i=>!i.isLocal),ao(null),In(()=>ip(this)),Dt(()=>this._result),ro(io),Fa((i,s)=>!!(i&&i.time===V(s).time)),pt(i=>!!i),Dt(i=>V(i).getValue()));this._$=qh(n,this.refCount$.pipe(pt(()=>!1)))}return this._$}},{key:"$$",get:function(){var n=this.collection.database.getReactivityFactory();return n.fromObservable(this.$,void 0,this.collection.database)}},{key:"queryMatcher",get:function(){var n=this.collection.schema.jsonSchema,i=or(this.collection.schema.jsonSchema,this.mangoQuery);return Xn(this,"queryMatcher",Dv(n,i))}},{key:"asRxQuery",get:function(){return this}}])})();function Xo(){return{selector:{}}}function Zk(e){return e.collection._queryCache.getByQuery(e)}function Br(e,t,n,i){Ae("preCreateRxQuery",{op:e,queryObj:t,collection:n,other:i});var s=new zv(e,t,n,i);return s=Zk(s),qk(n),s}function tC(e){var t=e.asRxQuery.collection._changeEventBuffer.getCounter();return e._latestChangeEvent>=t}async function ip(e){return e.collection.awaitBeforeReads.size>0&&await Promise.all(Array.from(e.collection.awaitBeforeReads).map(t=>t())),e._ensureEqualQueue=e._ensureEqualQueue.then(()=>eC(e)),e._ensureEqualQueue}function eC(e){if(e._lastEnsureEqual=gn(),e.collection.database.closed||tC(e))return $n;var t=!1,n=!1;if(e._latestChangeEvent===-1&&(n=!0),!n){var i=e.asRxQuery.collection._changeEventBuffer.getFrom(e._latestChangeEvent+1);if(i===null)n=!0;else{e._latestChangeEvent=e.asRxQuery.collection._changeEventBuffer.getCounter();var s=e.asRxQuery.collection._changeEventBuffer.reduceByLastOfDoc(i);if(e.op==="count"){var r=V(e._result).count,a=r;s.forEach(c=>{var l=c.previousDocumentData&&e.doesDocumentDataMatch(c.previousDocumentData),h=e.doesDocumentDataMatch(c.documentData);!l&&h&&a++,l&&!h&&a--}),a!==r&&(t=!0,e._setResultData(a))}else{var o=Bk(e,s);o.runFullQueryAgain?n=!0:o.changed&&(t=!0,e._setResultData(o.newResults))}}}return n?e._execOverDatabase().then(c=>{var l=c.result;return e._latestChangeEvent=c.counter,typeof l=="number"?((!e._result||l!==e._result.count)&&(t=!0,e._setResultData(l)),t):((!e._result||!nx(e.collection.schema.primaryPath,l,e._result.docsData))&&(t=!0,e._setResultData(l)),t)}):Promise.resolve(t)}async function nC(e){var t=[],n=e.collection;if(e.isFindOneByIdQuery)if(Array.isArray(e.isFindOneByIdQuery)){var i=e.isFindOneByIdQuery;if(i=i.filter(h=>{var u=e.collection._docCache.getLatestDocumentDataIfExists(h);return u?(u._deleted||t.push(u),!1):!0}),i.length>0){var s=await n.storageInstance.findDocumentsById(i,!1);_s(t,s)}}else{var r=e.isFindOneByIdQuery,a=e.collection._docCache.getLatestDocumentDataIfExists(r);if(!a){var o=await n.storageInstance.findDocumentsById([r],!1);o[0]&&(a=o[0])}a&&!a._deleted&&t.push(a)}else{var c=e.getPreparedQuery(),l=await n.storageInstance.query(c);t=l.documents}return{docs:t,counter:n._changeEventBuffer.getCounter()}}function iC(e,t){if(!t.skip&&t.selector&&Object.keys(t.selector).length===1&&t.selector[e]){var n=t.selector[e];if(typeof n=="string")return n;if(Object.keys(n).length===1&&typeof n.$eq=="string"||Object.keys(n).length===1&&Array.isArray(n.$eq)&&!n.$eq.find(i=>typeof i!="string"))return n.$eq}return!1}var Pi="collection",md="storage-token",Go="rx-migration-status",sC="rx-pipeline-checkpoint",rC="RxInternalDocument",vd=dl({version:0,title:rC,primaryKey:{key:"id",fields:["context","key"],separator:"|"},type:"object",properties:{id:{type:"string",maxLength:200},key:{type:"string"},context:{type:"string",enum:[Pi,md,Go,sC,"OTHER"]},data:{type:"object",additionalProperties:!0}},indexes:[],required:["key","context","data"],additionalProperties:!1,sharding:{shards:1,mode:"collection"}});function Cs(e,t){return zi(vd,{key:e,context:t})}async function jv(e){var t=vl(e.schema,{selector:{context:Pi,_deleted:{$eq:!1}},sort:[{id:"asc"}],skip:0}),n=await e.query(t),i=n.documents;return i}var Wv="storageToken",aC=Cs(Wv,md);async function oC(e){var t=Rs(10),n=e.password?await e.hashFunction(JSON.stringify(e.password)):void 0,i={id:aC,context:md,key:Wv,data:{rxdbVersion:e.rxdbVersion,token:t,instanceToken:e.token,passwordHash:n},_deleted:!1,_meta:Dr(),_rev:fn(),_attachments:{}},s=[{document:i}],r=await e.internalStore.bulkWrite(s,"internal-add-storage-token");if(!r.error[0])return an("id",s,r)[0];var a=V(r.error[0]);if(a.isError&&dr(a)){var o=a;if(!cC(o.documentInDb.data.rxdbVersion,e.rxdbVersion))throw F("DM5",{args:{database:e.name,databaseStateVersion:o.documentInDb.data.rxdbVersion,codeVersion:e.rxdbVersion}});if(n&&n!==o.documentInDb.data.passwordHash)throw F("DB1",{passwordHash:n,existingPasswordHash:o.documentInDb.data.passwordHash});var c=o.documentInDb;return V(c)}throw a}function cC(e,t){if(!e)return!1;var n=e.split(".")[0],i=t.split(".")[0];return n==="15"&&i==="16"?!0:n===i}async function Hv(e,t,n){if(e.schema.version!==n.version)throw F("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=Ac(e.name,e.schema.jsonSchema),s=Cs(i,Pi);;){var r=await Pr(e.database.internalStore,s),a=Te(V(r)),o=a.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(o)return;a.data.connectedStorages.push({collectionName:t,schema:n});try{await br(e.database.internalStore,{previous:V(r),document:a},"add-connected-storage-to-collection")}catch(c){if(!dr(c))throw c}}}async function lC(e,t,n){if(e.schema.version!==n.version)throw F("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=Ac(e.name,e.schema.jsonSchema),s=Cs(i,Pi);;){var r=await Pr(e.database.internalStore,s),a=Te(V(r)),o=a.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(!o)return;a.data.connectedStorages=a.data.connectedStorages.filter(c=>c.collectionName!==t);try{await br(e.database.internalStore,{previous:V(r),document:a},"remove-connected-storage-from-collection")}catch(c){if(!dr(c))throw c}}}function Ac(e,t){return e+"-"+t.version}function Co(e,t){return t=Pt(t),t=Ex(e,t),typeof e.jsonSchema.primaryKey!="string"&&(t=wx(e.primaryPath,e.jsonSchema,t)),t._meta=Dr(),Object.prototype.hasOwnProperty.call(t,"_deleted")||(t._deleted=!1),Object.prototype.hasOwnProperty.call(t,"_attachments")||(t._attachments={}),Object.prototype.hasOwnProperty.call(t,"_rev")||(t._rev=fn()),t}async function hC(e,t){t.multiInstance=e.multiInstance;var n=await e.storage.createStorageInstance(t);return n}async function Vv(e,t,n,i,s,r,a,o){var c=await jv(t),l=c.filter(f=>f.data.name===s),h=[];l.forEach(f=>{h.push({collectionName:f.data.name,schema:f.data.schema,isCollection:!0}),f.data.connectedStorages.forEach(p=>h.push({collectionName:p.collectionName,isCollection:!1,schema:p.schema}))});var u=new Set;if(h=h.filter(f=>{var p=f.collectionName+"||"+f.schema.version;return u.has(p)?!1:(u.add(p),!0)}),await Promise.all(h.map(async f=>{var p=await e.createStorageInstance({collectionName:f.collectionName,databaseInstanceToken:n,databaseName:i,multiInstance:r,options:{},schema:f.schema,password:a,devMode:xt.isDevMode()});await p.remove(),f.isCollection&&await ys("postRemoveRxCollection",{storage:e,databaseName:i,collectionName:s})})),o){var d=l.map(f=>{var p=bl(f);return p._deleted=!0,p._meta.lwt=gn(),p._rev=ti(n,f),{previous:f,document:p}});await t.bulkWrite(d,"rx-database-remove-collection-all")}}function Ge(e){if(e.closed)throw F("COL21",{collection:e.name,version:e.schema.version})}var uC=(function(){function e(n){this.subs=[],this.counter=0,this.eventCounterMap=new WeakMap,this.buffer=[],this.limit=100,this.tasks=new Set,this.collection=n,this.subs.push(this.collection.eventBulks$.pipe(pt(i=>!i.isLocal)).subscribe(i=>{this.tasks.add(()=>this._handleChangeEvents(i.events)),this.tasks.size<=1&&ul().then(()=>{this.processTasks()})}))}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(s=>s()),this.tasks.clear()}},t._handleChangeEvents=function(i){var s=this.counter;this.counter=this.counter+i.length,i.length>this.limit?this.buffer=i.slice(i.length*-1):(_s(this.buffer,i),this.buffer=this.buffer.slice(this.limit*-1));for(var r=s+1,a=this.eventCounterMap,o=0;o<i.length;o++){var c=i[o];a.set(c,r+o)}},t.getCounter=function(){return this.processTasks(),this.counter},t.getBuffer=function(){return this.processTasks(),this.buffer},t.getArrayIndexByPointer=function(i){this.processTasks();var s=this.buffer[0],r=this.eventCounterMap.get(s);if(i<r)return null;var a=i-r;return a},t.getFrom=function(i){this.processTasks();var s=[],r=this.getArrayIndexByPointer(i);if(r===null)return null;for(;;){var a=this.buffer[r];if(r++,a)s.push(a);else return s}},t.runFrom=function(i,s){this.processTasks();var r=this.getFrom(i);if(r===null)throw new Error("out of bounds");r.forEach(a=>s(a))},t.reduceByLastOfDoc=function(i){return this.processTasks(),i.slice(0)},t.close=function(){this.tasks.clear(),this.subs.forEach(i=>i.unsubscribe())},e})();function dC(e){return new uC(e)}var fC=new WeakMap;function pC(e){var t=e.schema.getDocumentPrototype(),n=vC(e),i=_l,s={};return[t,n,i].forEach(r=>{var a=Object.getOwnPropertyNames(r);a.forEach(o=>{var c=Object.getOwnPropertyDescriptor(r,o),l=!0;(o.startsWith("_")||o.endsWith("_")||o.startsWith("$")||o.endsWith("$"))&&(l=!1),typeof c.value=="function"?Object.defineProperty(s,o,{get(){return c.value.bind(this)},enumerable:l,configurable:!1}):(c.enumerable=l,c.configurable=!1,c.writable&&(c.writable=!1),Object.defineProperty(s,o,c))})}),s}function gC(e){return rn(fC,e,()=>Ov(pC(e)))}function mC(e,t,n){var i=KS(t,e,xt.deepFreezeWhenDevMode(n));return e._runHooksSync("post","create",n,i),Ae("postCreateRxDocument",i),i}function vC(e){var t={};return Object.entries(e.methods).forEach(([n,i])=>{t[n]=i}),t}var Rc={isEqual(e,t,n){e=sp(e),t=sp(t);var i=Ra(kn(e),kn(t));return i},resolve(e){return e.realMasterState}};function sp(e){return e._attachments||(e=Pt(e),e._attachments={}),e}var Uv=["pre","post"],qv=["insert","save","remove","create"],rp=!1,Js=new Set,Kv=(function(){function e(n,i,s,r,a={},o={},c={},l={},h={},u=Fv,d={},f=Rc){this.storageInstance={},this.timeouts=new Set,this.incrementalWriteQueue={},this.awaitBeforeReads=new Set,this._incrementalUpsertQueues=new Map,this.synced=!1,this.hooks={},this._subs=[],this._docCache={},this._queryCache=jk(),this.$={},this.checkpoint$={},this._changeEventBuffer={},this.eventBulks$={},this.onClose=[],this.closed=!1,this.onRemove=[],this.database=n,this.name=i,this.schema=s,this.internalStorageInstance=r,this.instanceCreationOptions=a,this.migrationStrategies=o,this.methods=c,this.attachments=l,this.options=h,this.cacheReplacementPolicy=u,this.statics=d,this.conflictHandler=f,bC(this.asRxCollection),n&&(this.eventBulks$=n.eventBulks$.pipe(pt(p=>p.collectionName===this.name))),this.database&&Js.add(this)}var t=e.prototype;return t.prepare=async function(){if(!await yx()){for(var i=0;i<10&&Js.size>Of;)i++,await this.promiseWait(30);if(Js.size>Of)throw F("COL23",{database:this.database.name,collection:this.name,args:{existing:Array.from(Js.values()).map(c=>({db:c.database?c.database.name:"",c:c.name}))}})}this.storageInstance=hd(this.database,this.internalStorageInstance,this.schema.jsonSchema),this.incrementalWriteQueue=new Pv(this.storageInstance,this.schema.primaryPath,(c,l)=>Tv(this,c,l),c=>this._runHooks("post","save",c)),this.$=this.eventBulks$.pipe(In(c=>dv(c))),this.checkpoint$=this.eventBulks$.pipe(Dt(c=>c.checkpoint)),this._changeEventBuffer=dC(this.asRxCollection);var s;this._docCache=new Bv(this.schema.primaryPath,this.eventBulks$.pipe(pt(c=>!c.isLocal),Dt(c=>c.events)),c=>(s||(s=gC(this.asRxCollection)),mC(this.asRxCollection,s,c)));var r=this.database.internalStore.changeStream().pipe(pt(c=>{var l=this.name+"-"+this.schema.version,h=c.events.find(u=>u.documentData.context==="collection"&&u.documentData.key===l&&u.operation==="DELETE");return!!h})).subscribe(async()=>{await this.close(),await Promise.all(this.onRemove.map(c=>c()))});this._subs.push(r);var a=await this.database.storageToken,o=this.storageInstance.changeStream().subscribe(c=>{var l={id:c.id,isLocal:!1,internal:!1,collectionName:this.name,storageToken:a,events:c.events,databaseToken:this.database.token,checkpoint:c.checkpoint,context:c.context};this.database.$emit(l)});return this._subs.push(o),sn},t.cleanup=function(i){throw Ge(this),wt("cleanup")},t.migrationNeeded=function(){throw wt("migration-schema")},t.getMigrationState=function(){throw wt("migration-schema")},t.startMigration=function(i=10){return Ge(this),this.getMigrationState().startMigration(i)},t.migratePromise=function(i=10){return this.getMigrationState().migratePromise(i)},t.insert=async function(i){Ge(this);var s=await this.bulkInsert([i]),r=s.error[0];Oc(this,i[this.schema.primaryPath],i,r);var a=V(s.success[0]);return a},t.insertIfNotExists=async function(i){var s=await this.bulkInsert([i]);if(s.error.length>0){var r=s.error[0];if(r.status===409){var a=r.documentInDb;return Jh(this._docCache,[a])[0]}else throw r}return s.success[0]},t.bulkInsert=async function(i){if(Ge(this),i.length===0)return{success:[],error:[]};var s=this.schema.primaryPath,r=new Set,a;if(this.hasHooks("pre","insert"))a=await Promise.all(i.map(m=>{var b=Co(this.schema,m);return this._runHooks("pre","insert",b).then(()=>(r.add(b[s]),{document:b}))}));else{a=new Array(i.length);for(var o=this.schema,c=0;c<i.length;c++){var l=i[c],h=Co(o,l);r.add(h[s]),a[c]={document:h}}}if(r.size!==i.length)throw F("COL22",{collection:this.name,args:{documents:i}});var u=await this.storageInstance.bulkWrite(a,"rx-collection-bulk-insert"),d,f=this,p={get success(){if(!d){var m=an(f.schema.primaryPath,a,u);d=Jh(f._docCache,m)}return d},error:u.error};if(this.hasHooks("post","insert")){var g=new Map;a.forEach(m=>{var b=m.document;g.set(b[s],b)}),await Promise.all(p.success.map(m=>this._runHooks("post","insert",g.get(m.primary),m)))}return p},t.bulkRemove=async function(i){Ge(this);var s=this.schema.primaryPath;if(i.length===0)return{success:[],error:[]};var r;typeof i[0]=="string"?r=await this.findByIds(i).exec():(r=new Map,i.forEach(f=>r.set(f.primary,f)));var a=[],o=new Map;Array.from(r.values()).forEach(f=>{var p=f.toMutableJSON(!0);a.push(p),o.set(f.primary,p)}),await Promise.all(a.map(f=>{var p=f[this.schema.primaryPath];return this._runHooks("pre","remove",f,r.get(p))}));var c=a.map(f=>{var p=Pt(f);return p._deleted=!0,{previous:f,document:p}}),l=await this.storageInstance.bulkWrite(c,"rx-collection-bulk-remove"),h=an(this.schema.primaryPath,c,l),u=[],d=h.map(f=>{var p=f[s],g=this._docCache.getCachedRxDocument(f);return u.push(g),p});return await Promise.all(d.map(f=>this._runHooks("post","remove",o.get(f),r.get(f)))),{success:u,error:l.error}},t.bulkUpsert=async function(i){Ge(this);var s=[],r=new Map;i.forEach(l=>{var h=Co(this.schema,l),u=h[this.schema.primaryPath];if(!u)throw F("COL3",{primaryPath:this.schema.primaryPath,data:h,schema:this.schema.jsonSchema});r.set(u,h),s.push(h)});var a=await this.bulkInsert(s),o=a.success.slice(0),c=[];return await Promise.all(a.error.map(async l=>{if(l.status!==409)c.push(l);else{var h=l.documentId,u=pr(r,h),d=V(l.documentInDb),f=this._docCache.getCachedRxDocuments([d])[0],p=await f.incrementalModify(()=>u);o.push(p)}})),{error:c,success:o}},t.upsert=async function(i){Ge(this);var s=await this.bulkUpsert([i]);return Oc(this.asRxCollection,i[this.schema.primaryPath],i,s.error[0]),s.success[0]},t.incrementalUpsert=function(i){Ge(this);var s=Co(this.schema,i),r=s[this.schema.primaryPath];if(!r)throw F("COL4",{data:i});var a=this._incrementalUpsertQueues.get(r);return a||(a=sn),a=a.then(()=>yC(this,r,s)).then(o=>o.inserted?o.doc:_C(o.doc,s)),this._incrementalUpsertQueues.set(r,a),a},t.find=function(i){Ge(this),Ae("prePrepareRxQuery",{op:"find",queryObj:i,collection:this}),i||(i=Xo());var s=Br("find",i,this);return s},t.findOne=function(i){Ge(this),Ae("prePrepareRxQuery",{op:"findOne",queryObj:i,collection:this});var s;if(typeof i=="string")s=Br("findOne",{selector:{[this.schema.primaryPath]:i},limit:1},this);else{if(i||(i=Xo()),i.limit)throw F("QU6");i=Pt(i),i.limit=1,s=Br("findOne",i,this)}return s},t.count=function(i){Ge(this),i||(i=Xo());var s=Br("count",i,this);return s},t.findByIds=function(i){Ge(this);var s={selector:{[this.schema.primaryPath]:{$in:i.slice(0)}}},r=Br("findByIds",s,this);return r},t.exportJSON=function(){throw wt("json-dump")},t.importJSON=function(i){throw wt("json-dump")},t.insertCRDT=function(i){throw wt("crdt")},t.addPipeline=function(i){throw wt("pipeline")},t.addHook=function(i,s,r,a=!1){if(typeof r!="function")throw Ec("COL7",{key:s,when:i});if(!Uv.includes(i))throw Ec("COL8",{key:s,when:i});if(!qv.includes(s))throw F("COL9",{key:s});if(i==="post"&&s==="create"&&a===!0)throw F("COL10",{when:i,key:s,parallel:a});var o=r.bind(this),c=a?"parallel":"series";this.hooks[s]=this.hooks[s]||{},this.hooks[s][i]=this.hooks[s][i]||{series:[],parallel:[]},this.hooks[s][i][c].push(o)},t.getHooks=function(i,s){return!this.hooks[s]||!this.hooks[s][i]?{series:[],parallel:[]}:this.hooks[s][i]},t.hasHooks=function(i,s){if(!this.hooks[s]||!this.hooks[s][i])return!1;var r=this.getHooks(i,s);return r?r.series.length>0||r.parallel.length>0:!1},t._runHooks=function(i,s,r,a){var o=this.getHooks(i,s);if(!o)return sn;var c=o.series.map(l=>()=>l(r,a));return px(c).then(()=>Promise.all(o.parallel.map(l=>l(r,a))))},t._runHooksSync=function(i,s,r,a){if(this.hasHooks(i,s)){var o=this.getHooks(i,s);o&&o.series.forEach(c=>c(r,a))}},t.promiseWait=function(i){var s=new Promise(r=>{var a=setTimeout(()=>{this.timeouts.delete(a),r()},i);this.timeouts.add(a)});return s},t.close=async function(){return this.closed?$n:(Js.delete(this),await Promise.all(this.onClose.map(i=>i())),this.closed=!0,Array.from(this.timeouts).forEach(i=>clearTimeout(i)),this._changeEventBuffer&&this._changeEventBuffer.close(),this.database.requestIdlePromise().then(()=>this.storageInstance.close()).then(()=>(this._subs.forEach(i=>i.unsubscribe()),delete this.database.collections[this.name],ys("postCloseRxCollection",this).then(()=>!0))))},t.remove=async function(){await this.close(),await Promise.all(this.onRemove.map(i=>i())),await Vv(this.database.storage,this.database.internalStore,this.database.token,this.database.name,this.name,this.database.multiInstance,this.database.password,this.database.hashFunction)},Bi(e,[{key:"insert$",get:function(){return this.$.pipe(pt(n=>n.operation==="INSERT"))}},{key:"update$",get:function(){return this.$.pipe(pt(n=>n.operation==="UPDATE"))}},{key:"remove$",get:function(){return this.$.pipe(pt(n=>n.operation==="DELETE"))}},{key:"asRxCollection",get:function(){return this}}])})();function bC(e){if(!rp){rp=!0;var t=Object.getPrototypeOf(e);qv.forEach(n=>{Uv.map(i=>{var s=i+zm(n);t[s]=function(r,a){return this.addHook(i,n,r,a)}})})}}function _C(e,t){return e.incrementalModify(n=>t)}function yC(e,t,n){var i=e._docCache.getLatestDocumentDataIfExists(t);return i?Promise.resolve({doc:e._docCache.getCachedRxDocuments([i])[0],inserted:!1}):e.findOne(t).exec().then(s=>s?{doc:s,inserted:!1}:e.insert(n).then(r=>({doc:r,inserted:!0})))}async function wC({database:e,name:t,schema:n,instanceCreationOptions:i={},migrationStrategies:s={},autoMigrate:r=!0,statics:a={},methods:o={},attachments:c={},options:l={},localDocuments:h=!1,cacheReplacementPolicy:u=Fv,conflictHandler:d=Rc}){var f={databaseInstanceToken:e.token,databaseName:e.name,collectionName:t,schema:n.jsonSchema,options:i,multiInstance:e.multiInstance,password:e.password,devMode:xt.isDevMode()};Ae("preCreateRxStorageInstance",f);var p=await hC(e,f),g=new Kv(e,t,n,p,i,s,o,c,l,u,a,d);try{await g.prepare(),Object.entries(a).forEach(([m,b])=>{Object.defineProperty(g,m,{get:()=>b.bind(g)})}),Ae("createRxCollection",{collection:g,creator:{name:t,schema:n,storageInstance:p,instanceCreationOptions:i,migrationStrategies:s,methods:o,attachments:c,options:l,cacheReplacementPolicy:u,localDocuments:h,statics:a}}),r&&g.schema.version!==0&&await g.migratePromise()}catch(m){throw Js.delete(g),await p.close(),m}return g}var Yv=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;this._parallels=t||1,this._qC=0,this._iC=new Set,this._lHN=0,this._hPM=new Map,this._pHM=new Map};Yv.prototype={isIdle:function(){return this._qC<this._parallels},lock:function(){this._qC++},unlock:function(){this._qC--,Zh(this)},wrapCall:function(t){var n=this;this._qC++;var i;try{i=t()}catch(s){throw this.unlock(),s}return!i.then||typeof i.then!="function"?(this.unlock(),i):i.then(function(s){return n.unlock(),s}).catch(function(s){throw n.unlock(),s})},requestIdlePromise:function(t){var n=this;t=t||{};var i,s=new Promise(function(o){return i=o}),r=function(){sh(n,s),i()};if(s._manRes=r,t.timeout){var a=setTimeout(function(){s._manRes()},t.timeout);s._timeoutObj=a}return this._iC.add(s),Zh(this),s},cancelIdlePromise:function(t){sh(this,t)},requestIdleCallback:function(t,n){var i=this._lHN++,s=this.requestIdlePromise(n);return this._hPM.set(i,s),this._pHM.set(s,i),s.then(function(){return t()}),i},cancelIdleCallback:function(t){var n=this._hPM.get(t);this.cancelIdlePromise(n)},clear:function(){var t=this;this._iC.forEach(function(n){return sh(t,n)}),this._qC=0,this._iC.clear(),this._hPM=new Map,this._pHM=new Map}};function xC(e){if(e._iC.size!==0){var t=e._iC.values(),n=t.next().value;n._manRes(),setTimeout(function(){return Zh(e)},0)}}function sh(e,t){if(t){if(t._timeoutObj&&clearTimeout(t._timeoutObj),e._pHM.has(t)){var n=e._pHM.get(t);e._hPM.delete(n),e._pHM.delete(t)}e._iC.delete(t)}}function Zh(e){e._tryIR||e._iC.size===0||(e._tryIR=!0,setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}xC(e),e._tryIR=!1},0)},0))}let SC=class{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){return this.map.has(t)}add(t){this.map.set(t,Xv()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,kC(this)},0))}clear(){this.map.clear()}};function kC(e){const t=Xv()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)return;const s=i[0];if(i[1]<t)e.map.delete(s);else return}}function Xv(){return Date.now()}var tu=new Set,ap=new Map,bd=(function(){function e(n,i,s,r,a,o,c=!1,l={},h,u,d,f,p,g){this.idleQueue=new Yv,this.rxdbVersion=bx,this.storageInstances=new Set,this._subs=[],this.startupErrors=[],this.onClose=[],this.closed=!1,this.collections={},this.states={},this.eventBulks$=new le,this.closePromise=null,this.observable$=this.eventBulks$.pipe(In(m=>dv(m))),this.storageToken=$n,this.storageTokenDocument=$n,this.emittedEventBulkIds=new SC(60*1e3),this.name=n,this.token=i,this.storage=s,this.instanceCreationOptions=r,this.password=a,this.multiInstance=o,this.eventReduce=c,this.options=l,this.internalStore=h,this.hashFunction=u,this.cleanupPolicy=d,this.allowSlowCount=f,this.reactivity=p,this.onClosed=g,this.name!=="pseudoInstance"&&(this.internalStore=hd(this.asRxDatabase,h,vd),this.storageTokenDocument=oC(this.asRxDatabase).catch(m=>this.startupErrors.push(m)),this.storageToken=this.storageTokenDocument.then(m=>m.data.token).catch(m=>this.startupErrors.push(m)))}var t=e.prototype;return t.getReactivityFactory=function(){if(!this.reactivity)throw F("DB14",{database:this.name});return this.reactivity},t.$emit=function(i){this.emittedEventBulkIds.has(i.id)||(this.emittedEventBulkIds.add(i.id),this.eventBulks$.next(i))},t.removeCollectionDoc=async function(i,s){var r=await Pr(this.internalStore,Cs(Ac(i,s),Pi));if(!r)throw F("SNH",{name:i,schema:s});var a=bl(r);a._deleted=!0,await this.internalStore.bulkWrite([{document:a,previous:r}],"rx-database-remove-collection")},t.addCollections=async function(i){var s={},r={},a=[],o={};await Promise.all(Object.entries(i).map(async([h,u])=>{var d=h,f=u.schema;s[d]=f;var p=Ix(f,this.hashFunction);if(r[d]=p,this.collections[h])throw F("DB3",{name:h});var g=Ac(h,f),m={id:Cs(g,Pi),key:g,context:Pi,data:{name:d,schemaHash:await p.hash,schema:p.jsonSchema,version:p.version,connectedStorages:[]},_deleted:!1,_meta:Dr(),_rev:fn(),_attachments:{}};a.push({document:m});var b=Object.assign({},u,{name:d,schema:p,database:this}),_=Pt(u);_.database=this,_.name=h,Ae("preCreateRxCollection",_),b.conflictHandler=_.conflictHandler,o[d]=b}));var c=await this.internalStore.bulkWrite(a,"rx-database-add-collection");await $C(this),await Promise.all(c.error.map(async h=>{if(h.status!==409)throw F("DB12",{database:this.name,writeError:h});var u=V(h.documentInDb),d=u.data.name,f=r[d];if(u.data.schemaHash!==await f.hash)throw F("DB6",{database:this.name,collection:d,previousSchemaHash:u.data.schemaHash,schemaHash:await f.hash,previousSchema:u.data.schema,schema:V(s[d])})}));var l={};return await Promise.all(Object.keys(i).map(async h=>{var u=o[h],d=await wC(u);l[h]=d,this.collections[h]=d,this[h]||Object.defineProperty(this,h,{get:()=>this.collections[h]})})),l},t.lockedRun=function(i){return this.idleQueue.wrapCall(i)},t.requestIdlePromise=function(){return this.idleQueue.requestIdlePromise()},t.exportJSON=function(i){throw wt("json-dump")},t.addState=function(i){throw wt("state")},t.importJSON=function(i){throw wt("json-dump")},t.backup=function(i){throw wt("backup")},t.leaderElector=function(){throw wt("leader-election")},t.isLeader=function(){throw wt("leader-election")},t.waitForLeadership=function(){throw wt("leader-election")},t.migrationStates=function(){throw wt("migration-schema")},t.close=function(){if(this.closePromise)return this.closePromise;var{promise:i,resolve:s}=Gv(),r=a=>{this.onClosed&&this.onClosed(),this.closed=!0,s(a)};return this.closePromise=i,(async()=>{if(await ys("preCloseRxDatabase",this),this.eventBulks$.complete(),this._subs.map(a=>a.unsubscribe()),this.name==="pseudoInstance"){r(!1);return}return this.requestIdlePromise().then(()=>Promise.all(this.onClose.map(a=>a()))).then(()=>Promise.all(Object.keys(this.collections).map(a=>this.collections[a]).map(a=>a.close()))).then(()=>this.internalStore.close()).then(()=>r(!0))})(),i},t.remove=function(){return this.close().then(()=>EC(this.name,this.storage,this.multiInstance,this.password))},Bi(e,[{key:"$",get:function(){return this.observable$}},{key:"asRxDatabase",get:function(){return this}}])})();function CC(e,t){if(tu.has(Qv(e,t)))throw F("DB8",{name:e,storage:t.name,link:"https://rxdb.info/rx-database.html#ignoreduplicate"})}function Gv(){var e,t,n=new Promise((i,s)=>{e=i,t=s});return{promise:n,resolve:e,reject:t}}function Qv(e,t){return t.name+"|"+e}async function Jv(e,t,n,i,s,r){var a=await t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:zS,schema:vd,options:i,multiInstance:s,password:r,devMode:xt.isDevMode()});return a}function MC({storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:s=!0,eventReduce:r=!0,ignoreDuplicate:a=!1,options:o={},cleanupPolicy:c,closeDuplicates:l=!1,allowSlowCount:h=!1,localDocuments:u=!1,hashFunction:d=Fm,reactivity:f}){Ae("preCreateRxDatabase",{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:s,eventReduce:r,ignoreDuplicate:a,options:o,localDocuments:u});var p=Qv(n,e),g=ap.get(p)||new Set,m=Gv(),b=Array.from(g),_=()=>{g.delete(m.promise),tu.delete(p)};return g.add(m.promise),ap.set(p,g),(async()=>{if(l&&await Promise.all(b.map(E=>E.catch(()=>null).then(M=>M&&M.close()))),a){if(!xt.isDevMode())throw F("DB9",{database:n})}else CC(n,e);tu.add(p);var w=Rs(10),C=await Jv(w,e,n,t,s,i),x=new bd(n,w,e,t,i,s,r,o,C,d,c,h,f,_);return await ys("createRxDatabase",{database:x,creator:{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:s,eventReduce:r,ignoreDuplicate:a,options:o,localDocuments:u}}),x})().then(w=>{m.resolve(w)}).catch(w=>{m.reject(w),_()}),m.promise}async function EC(e,t,n=!0,i){var s=Rs(10),r=await Jv(s,t,e,{},n,i),a=await jv(r),o=new Set;a.forEach(l=>o.add(l.data.name));var c=Array.from(o);return await Promise.all(c.map(l=>Vv(t,r,s,e,l,n,i))),await ys("postRemoveRxDatabase",{databaseName:e,storage:t}),await r.remove(),c}function DC(e){return e instanceof bd}async function $C(e){if(await e.storageToken,e.startupErrors[0])throw e.startupErrors[0]}var IC={RxSchema:Vm.prototype,RxDocument:_l,RxQuery:zv.prototype,RxCollection:Kv.prototype,RxDatabase:bd.prototype},rh=new Set,op=new Set;function _d(e){if(Ae("preAddRxPlugin",{plugin:e,plugins:rh}),!rh.has(e)){{if(op.has(e.name))throw F("PL3",{name:e.name,plugin:e});rh.add(e),op.add(e.name)}if(!e.rxdb)throw Ec("PL1",{plugin:e});e.init&&e.init(),e.prototypes&&Object.entries(e.prototypes).forEach(([t,n])=>n(IC[t])),e.overwritable&&Object.assign(xt,e.overwritable),e.hooks&&Object.entries(e.hooks).forEach(([t,n])=>{n.after&&La[t].push(n.after),n.before&&La[t].unshift(n.before)})}}async function Lc(e,t){var n=zi(e.input.metaInstance.schema,{isCheckpoint:"1",itemId:t}),i=await e.input.metaInstance.findDocumentsById([n],!1),s=i[0];if(e.lastCheckpointDoc[t]=s,s)return s.checkpointData}async function Nc(e,t,n){e.checkpointQueue=e.checkpointQueue.then(async()=>{var i=e.lastCheckpointDoc[t];if(n&&!e.events.canceled.getValue()&&(!i||JSON.stringify(i.checkpointData)!==JSON.stringify(n))){var s={id:"",isCheckpoint:"1",itemId:t,_deleted:!1,_attachments:{},checkpointData:n,_meta:Dr(),_rev:fn()};for(s.id=zi(e.input.metaInstance.schema,s);!e.events.canceled.getValue();){if(i&&(s.checkpointData=Ua([i.checkpointData,s.checkpointData])),s._meta.lwt=gn(),s._rev=ti(await e.checkpointKey,i),e.events.canceled.getValue())return;var r=[{previous:i,document:s}],a=await e.input.metaInstance.bulkWrite(r,"replication-set-checkpoint"),o=an(e.primaryPath,r,a)[0];if(o){e.lastCheckpointDoc[t]=o;return}else{var c=a.error[0];if(c.status!==409)throw c;i=V(c.documentInDb),s._rev=ti(await e.checkpointKey,i)}}}}),await e.checkpointQueue}async function PC(e){var t=await e.hashFunction([e.identifier,e.forkInstance.databaseName,e.forkInstance.collectionName].join("||"));return"rx_storage_replication_"+t}function cp(e,t,n,i,s){var r=Object.assign({},i,{_attachments:t&&i._attachments?i._attachments:{},_meta:n?i._meta:Object.assign({},s?s._meta:{},{lwt:gn()}),_rev:n?i._rev:fn()});return r._rev||(r._rev=ti(e,s)),r}function gi(e,t,n){var i=Pt(e);return t||delete i._attachments,n||(delete i._meta,delete i._rev),i}function eu(e,t){return e.hasAttachments?t.map(n=>{var i=Te(n.document);return i.docData=kn(i.docData),{document:i,previous:n.previous}}):t}function nu(e){for(;;)if(e.underlyingPersistentStorage)e=e.underlyingPersistentStorage;else return e}var Qo="RxReplicationProtocolMetaData";function iu(e,t){var n=xx(e),i={title:Qo,primaryKey:{key:"id",fields:["itemId","isCheckpoint"],separator:"|"},type:"object",version:e.version,additionalProperties:!1,properties:{id:{type:"string",minLength:1,maxLength:n+2},isCheckpoint:{type:"string",enum:["0","1"],minLength:1,maxLength:1},itemId:{type:"string",maxLength:n>4?n:4},checkpointData:{type:"object",additionalProperties:!0},docData:{type:"object",properties:e.properties},isResolvedConflict:{type:"string"}},keyCompression:e.keyCompression,required:["id","isCheckpoint","itemId"]};t&&(i.encrypted=["docData"]);var s=dl(i);return s}function Zv(e,t){return e.input.metaInstance.findDocumentsById(t.map(n=>{var i=zi(e.input.metaInstance.schema,{itemId:n,isCheckpoint:"0"});return i}),!0).then(n=>{var i={};return Object.values(n).forEach(s=>{i[s.itemId]={docData:s.docData,metaDocument:s}}),i})}async function Fc(e,t,n,i){var s=t[e.primaryPath],r=n?bl(n):{id:"",isCheckpoint:"0",itemId:s,docData:t,_attachments:{},_deleted:!1,_rev:fn(),_meta:{lwt:0}};r.docData=t,i&&(r.isResolvedConflict=i),r._meta.lwt=gn(),r.id=zi(e.input.metaInstance.schema,r),r._rev=ti(await e.checkpointKey,n);var a={previous:n,document:r};return a}async function OC(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.downstream){var t=await Lc(e,"down");t||await Nc(e,"down",e.input.initialCheckpoint.downstream)}var n=await e.input.hashFunction(e.input.identifier),i=e.input.replicationHandler,s=0,r=[];function a(p){e.stats.down.addNewTask=e.stats.down.addNewTask+1;var g={time:s++,task:p};r.push(g),e.streamQueue.down=e.streamQueue.down.then(()=>{for(var m=[];r.length>0;){e.events.active.down.next(!0);var b=V(r.shift());if(!(b.time<c)){if(b.task==="RESYNC")if(m.length===0){m.push(b.task);break}else break;m.push(b.task)}}if(m.length!==0)return m[0]==="RESYNC"?l():h(m)}).then(()=>{e.events.active.down.next(!1),!e.firstSyncDone.down.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.down.next(!0)})}if(a("RESYNC"),!e.events.canceled.getValue()){var o=i.masterChangeStream$.pipe(In(async p=>(await Gn(e.events.active.up.pipe(pt(g=>!g))),p))).subscribe(p=>{e.stats.down.masterChangeStreamEmit=e.stats.down.masterChangeStreamEmit+1,a(p)});Gn(e.events.canceled.pipe(pt(p=>!!p))).then(()=>o.unsubscribe())}var c=-1;async function l(){if(e.stats.down.downstreamResyncOnce=e.stats.down.downstreamResyncOnce+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>Lc(e,"down"));for(var p=await e.checkpointQueue,g=[];!e.events.canceled.getValue();){c=s++;var m=await i.masterChangesSince(p,e.input.pullBatchSize);if(m.documents.length===0||(p=Ua([p,m.checkpoint]),g.push(f(m.documents,p)),m.documents.length<e.input.pullBatchSize))break}await Promise.all(g)}}function h(p){e.stats.down.downstreamProcessChanges=e.stats.down.downstreamProcessChanges+1;var g=[],m=null;return p.forEach(b=>{if(b==="RESYNC")throw new Error("SNH");_s(g,b.documents),m=Ua([m,b.checkpoint])}),f(g,V(m))}var u=sn,d={docs:{}};function f(p,g){var m=e.primaryPath;return e.stats.down.persistFromMaster=e.stats.down.persistFromMaster+1,p.forEach(b=>{var _=b[m];d.docs[_]=b}),d.checkpoint=g,u=u.then(()=>{var b=d.docs;d.docs={};var _=d.checkpoint,w=Object.keys(b);if(e.events.canceled.getValue()||w.length===0)return sn;var C=[],x={},E={},M=[];return Promise.all([e.input.forkInstance.findDocumentsById(w,!0),Zv(e,w)]).then(([v,y])=>{var S=new Map;return v.forEach($=>S.set($[m],$)),Promise.all(w.map(async $=>{var D=S.get($),O=D?gi(D,e.hasAttachments,!1):void 0,B=b[$],N=y[$];N&&D&&N.metaDocument.isResolvedConflict===D._rev&&await e.streamQueue.up;var W=!N||!O?!1:e.input.conflictHandler.isEqual(N.docData,O,"downstream-check-if-equal-0");if(!W&&N&&N.docData._rev&&D&&D._meta[e.input.identifier]&&Ai(D._rev)===D._meta[e.input.identifier]&&(W=!0),D&&N&&W===!1||D&&!N)return sn;var R=O?e.input.conflictHandler.isEqual(B,O,"downstream-check-if-equal-1"):!1;if(O&&R)return(!N||W===!1)&&M.push(await Fc(e,O,N?N.metaDocument:void 0)),sn;var H=Object.assign({},B,D?{_meta:Pt(D._meta),_attachments:e.hasAttachments&&B._attachments?B._attachments:{},_rev:fn()}:{_meta:{lwt:gn()},_rev:fn(),_attachments:e.hasAttachments&&B._attachments?B._attachments:{}});if(B._rev){var A=D?Ai(D._rev)+1:1;H._meta[e.input.identifier]=A,e.input.keepMeta&&(H._rev=B._rev)}e.input.keepMeta&&B._meta&&(H._meta=B._meta);var z={previous:D,document:H};z.document._rev=z.document._rev?z.document._rev:ti(n,z.previous),C.push(z),x[$]=z,E[$]=await Fc(e,B,N?N.metaDocument:void 0)}))}).then(async()=>{if(C.length>0)return e.input.forkInstance.bulkWrite(C,await e.downstreamBulkWriteFlag).then(v=>{var y=an(e.primaryPath,C,v);y.forEach($=>{var D=$[m];e.events.processed.down.next(x[D]),M.push(E[D])});var S;if(v.error.forEach($=>{if($.status!==409){var D=F("RC_PULL",{writeError:$});e.events.error.next(D),S=D}}),S)throw S})}).then(()=>{if(M.length>0)return e.input.metaInstance.bulkWrite(eu(e,M),"replication-down-write-meta").then(v=>{v.error.forEach(y=>{e.events.error.next(F("RC_PULL",{id:y.documentId,writeError:y}))})})}).then(()=>{Nc(e,"down",_)})}).catch(b=>e.events.error.next(b)),u}}async function TC(e,t,n){var i=e.input.conflictHandler,s=i.isEqual(t.realMasterState,t.newDocumentState,"replication-resolve-conflict");if(!s){var r=await i.resolve(t,"replication-resolve-conflict"),a=Object.assign({},r,{_meta:Pt(n._meta),_rev:fn(),_attachments:Pt(n._attachments)});return a._meta.lwt=gn(),a._rev=ti(await e.checkpointKey,n),a}}async function su(e,t,n,i){if(!n._attachments||i&&!i._attachments)throw new Error("_attachments missing");var s=n[e],r=new Set(i&&i._attachments?Object.keys(i._attachments):[]);return await Promise.all(Object.entries(n._attachments).map(async([a,o])=>{if((!r.has(a)||i&&V(i._attachments)[a].digest!==o.digest)&&!o.data){var c=await t.getAttachmentData(s,a,o.digest);o.data=c}})),n}async function AC(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.upstream){var t=await Lc(e,"up");t||await Nc(e,"up",e.input.initialCheckpoint.upstream)}var n=e.input.replicationHandler;e.streamQueue.up=e.streamQueue.up.then(()=>h().then(()=>u()));var i=0,s=-1,r=[],a=$n,o={docs:{}},c=e.input.forkInstance.changeStream().subscribe(f=>{if(!e.events.paused.getValue())return e.stats.up.forkChangeStreamEmit=e.stats.up.forkChangeStreamEmit+1,r.push({task:f,time:i++}),e.events.active.up.getValue()||e.events.active.up.next(!0),e.input.waitBeforePersist?e.input.waitBeforePersist().then(()=>u()):u()}),l=n.masterChangeStream$.pipe(pt(f=>f==="RESYNC")).subscribe(()=>{r.push({task:"RESYNC",time:i++}),u()});Gn(e.events.canceled.pipe(pt(f=>!!f))).then(()=>{c.unsubscribe(),l.unsubscribe()});async function h(){if(e.stats.up.upstreamInitialSync=e.stats.up.upstreamInitialSync+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>Lc(e,"up"));for(var f=await e.checkpointQueue,p=new Set,g=async function(){s=i++,p.size>3&&await Promise.race(Array.from(p));var _=await $v(e.input.forkInstance,e.input.pushBatchSize,f);if(_.documents.length===0)return 1;f=Ua([f,_.checkpoint]);var w=d(_.documents,V(f));p.add(w),w.catch().then(()=>p.delete(w))};!e.events.canceled.getValue()&&!await g(););var m=await Promise.all(p),b=m.find(_=>!!_);b?await h():!e.firstSyncDone.up.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.up.next(!0)}}function u(){if(e.events.canceled.getValue()||r.length===0){e.events.active.up.next(!1);return}e.stats.up.processTasks=e.stats.up.processTasks+1,e.events.active.up.next(!0),e.streamQueue.up=e.streamQueue.up.then(async()=>{for(var f=[],p;r.length>0;){var g=V(r.shift());if(!(g.time<s)){if(g.task==="RESYNC"){e.events.active.up.next(!1),await h();return}g.task.context!==await e.downstreamBulkWriteFlag&&_s(f,g.task.events.map(m=>m.documentData)),p=Ua([p,g.task.checkpoint])}}if(await d(f,p),r.length===0)e.events.active.up.next(!1);else return u()})}function d(f,p){return e.stats.up.persistToMaster=e.stats.up.persistToMaster+1,f.forEach(g=>{var m=g[e.primaryPath];o.docs[m]=g}),o.checkpoint=p,a=a.then(async()=>{if(e.events.canceled.getValue())return!1;var g=o.docs;o.docs={};var m=o.checkpoint,b=Object.keys(g);function _(){return Nc(e,"up",m)}if(b.length===0)return _(),!1;var w=await Zv(e,b),C={},x=[],E={},M={};if(await Promise.all(b.map(async z=>{var L=g[z];M[z]=L;var j=gi(L,e.hasAttachments,!!e.input.keepMeta),P=w[z];P&&P.metaDocument.isResolvedConflict!==L._rev&&e.input.conflictHandler.isEqual(P.docData,j,"upstream-check-if-equal")||P&&P.docData._rev&&Ai(L._rev)===L._meta[e.input.identifier]||(x.push(z),C[z]={assumedMasterState:P?P.docData:void 0,newDocumentState:j},E[z]=await Fc(e,j,P?P.metaDocument:void 0))})),x.length===0)return _(),!1;var v=Object.values(C),y=new Set,S={},$=Q1(v,e.input.pushBatchSize);await Promise.all($.map(async z=>{e.hasAttachments&&await Promise.all(z.map(async j=>{j.newDocumentState=await su(e.primaryPath,e.input.forkInstance,Te(j.newDocumentState),j.assumedMasterState)}));var L=await n.masterWrite(z);L.forEach(j=>{var P=j[e.primaryPath];y.add(P),S[P]=j})}));var D=[];if(x.forEach(z=>{y.has(z)||(e.events.processed.up.next(C[z]),D.push(E[z]))}),e.events.canceled.getValue())return!1;D.length>0&&await e.input.metaInstance.bulkWrite(eu(e,D),"replication-up-write-meta");var O=!1;if(y.size>0){e.stats.up.persistToMasterHadConflicts=e.stats.up.persistToMasterHadConflicts+1;var B=[],N={};if(await Promise.all(Object.entries(S).map(([z,L])=>{var j=C[z],P={newDocumentState:j.newDocumentState,assumedMasterState:j.assumedMasterState,realMasterState:L};return TC(e,P,M[z]).then(async J=>{if(J){e.events.resolvedConflicts.next({input:P,output:J}),B.push({previous:M[z],document:J});var lt=w[z];N[z]=await Fc(e,V(L),lt?lt.metaDocument:void 0,J._rev)}})})),B.length>0){O=!0,e.stats.up.persistToMasterConflictWrites=e.stats.up.persistToMasterConflictWrites+1;var W=await e.input.forkInstance.bulkWrite(B,"replication-up-write-conflict"),R;if(W.error.forEach(z=>{if(z.status!==409){var L=F("RC_PUSH",{writeError:z});e.events.error.next(L),R=L}}),R)throw R;var H=[],A=an(e.primaryPath,B,W);A.forEach(z=>{var L=z[e.primaryPath];H.push(N[L])}),H.length>0&&await e.input.metaInstance.bulkWrite(eu(e,H),"replication-up-write-conflict-meta")}}return _(),O}).catch(g=>(e.events.error.next(g),!1)),a}}function t0(e){e=Pt(e),e.forkInstance=nu(e.forkInstance),e.metaInstance=nu(e.metaInstance);var t=PC(e),n={primaryPath:mn(e.forkInstance.schema.primaryKey),hasAttachments:!!e.forkInstance.schema.attachments,input:e,checkpointKey:t,downstreamBulkWriteFlag:t.then(i=>"replication-downstream-"+i),events:{canceled:new nn(!1),paused:new nn(!1),active:{down:new nn(!0),up:new nn(!0)},processed:{down:new le,up:new le},resolvedConflicts:new le,error:new le},stats:{down:{addNewTask:0,downstreamProcessChanges:0,downstreamResyncOnce:0,masterChangeStreamEmit:0,persistFromMaster:0},up:{forkChangeStreamEmit:0,persistToMaster:0,persistToMasterConflictWrites:0,persistToMasterHadConflicts:0,processTasks:0,upstreamInitialSync:0}},firstSyncDone:{down:new nn(!1),up:new nn(!1)},streamQueue:{down:sn,up:sn},checkpointQueue:sn,lastCheckpointDoc:{}};return OC(n),AC(n),n}function Jo(e){return Gn(rd([e.firstSyncDone.down.pipe(pt(t=>!!t)),e.firstSyncDone.up.pipe(pt(t=>!!t))])).then(()=>{})}function ru(e){return Promise.all([e.streamQueue.up,e.streamQueue.down,e.checkpointQueue])}function RC(e,t,n,i=!1){e=nu(e);var s=!!e.schema.attachments,r=mn(e.schema.primaryKey),a={masterChangeStream$:e.changeStream().pipe(In(async o=>{var c={checkpoint:o.checkpoint,documents:await Promise.all(o.events.map(async l=>{var h=gi(l.documentData,s,i);return s&&(h=await su(r,e,Te(h),void 0)),h}))};return c})),masterChangesSince(o,c){return $v(e,c,o).then(async l=>({checkpoint:l.documents.length>0?l.checkpoint:o,documents:await Promise.all(l.documents.map(async h=>{var u=gi(h,s,i);return s&&(u=await su(r,e,Te(u),void 0)),u}))}))},async masterWrite(o){var c={};o.forEach(g=>{var m=g.newDocumentState[r];c[m]=g});var l=Object.keys(c),h=await e.findDocumentsById(l,!0),u=new Map;h.forEach(g=>u.set(g[r],g));var d=[],f=[];if(await Promise.all(Object.entries(c).map(([g,m])=>{var b=u.get(g);b?b&&!m.assumedMasterState?d.push(gi(b,s,i)):t.isEqual(gi(b,s,i),V(m.assumedMasterState),"rxStorageInstanceToReplicationHandler-masterWrite")===!0?f.push({previous:b,document:cp(n,s,i,m.newDocumentState,b)}):d.push(gi(b,s,i)):f.push({document:cp(n,s,i,m.newDocumentState)})})),f.length>0){var p=await e.bulkWrite(f,"replication-master-write");p.error.forEach(g=>{if(g.status!==409)throw F("SNH",{name:"non conflict error",error:g});d.push(gi(V(g.documentInDb),s,i))})}return d}};return a}async function e0(e){e.events.canceled.next(!0),e.events.active.up.complete(),e.events.active.down.complete(),e.events.processed.up.complete(),e.events.processed.down.complete(),e.events.resolvedConflicts.complete(),e.events.canceled.complete(),await e.checkpointQueue}function LC(e){return e&&typeof e.then=="function"}Promise.resolve(!1);var NC=Promise.resolve(!0),Qn=Promise.resolve();function us(e,t){return e||(e=0),new Promise(function(n){return setTimeout(function(){return n(t)},e)})}function FC(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function lo(){return Math.random().toString(36).substring(2)}var ah=0;function ho(){var e=Date.now()*1e3;return e<=ah&&(e=ah+1),ah=e,e}function BC(){return typeof navigator<"u"&&typeof navigator.locks<"u"&&typeof navigator.locks.request=="function"}var zC=ho,jC="native";function WC(e){var t={time:ho(),messagesCallback:null,bc:new BroadcastChannel(e),subFns:[]};return t.bc.onmessage=function(n){t.messagesCallback&&t.messagesCallback(n.data)},t}function HC(e){e.bc.close(),e.subFns=[]}function VC(e,t){try{return e.bc.postMessage(t,!1),Qn}catch(n){return Promise.reject(n)}}function UC(e,t){e.messagesCallback=t}function qC(){if(typeof globalThis<"u"&&globalThis.Deno&&globalThis.Deno.args)return!0;if((typeof window<"u"||typeof self<"u")&&typeof BroadcastChannel=="function"){if(BroadcastChannel._pubkey)throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");return!0}else return!1}function KC(){return 150}var YC={create:WC,close:HC,onMessage:UC,postMessage:VC,canBeUsed:qC,type:jC,averageResponseTime:KC,microSeconds:zC};class n0{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){const n=this.map.get(t);return typeof n>"u"?!1:n<au()-this.ttl?(this.map.delete(t),!1):!0}add(t){this.map.delete(t),this.map.set(t,au()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,XC(this)},0))}clear(){this.map.clear()}}function XC(e){const t=au()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)break;const s=i[0];if(i[1]<t)e.map.delete(s);else break}}function au(){return Date.now()}function yd(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=JSON.parse(JSON.stringify(e));return typeof t.webWorkerSupport>"u"&&(t.webWorkerSupport=!0),t.idb||(t.idb={}),t.idb.ttl||(t.idb.ttl=1e3*45),t.idb.fallbackInterval||(t.idb.fallbackInterval=150),e.idb&&typeof e.idb.onclose=="function"&&(t.idb.onclose=e.idb.onclose),t.localstorage||(t.localstorage={}),t.localstorage.removeTimeout||(t.localstorage.removeTimeout=1e3*60),e.methods&&(t.methods=e.methods),t.node||(t.node={}),t.node.ttl||(t.node.ttl=1e3*60*2),t.node.maxParallelWrites||(t.node.maxParallelWrites=2048),typeof t.node.useFastPath>"u"&&(t.node.useFastPath=!0),t}var GC=ho,QC="pubkey.broadcast-channel-0-",ni="messages",yl={durability:"relaxed"},JC="idb";function i0(){if(typeof indexedDB<"u")return indexedDB;if(typeof window<"u"){if(typeof window.mozIndexedDB<"u")return window.mozIndexedDB;if(typeof window.webkitIndexedDB<"u")return window.webkitIndexedDB;if(typeof window.msIndexedDB<"u")return window.msIndexedDB}return!1}function wd(e){e.commit&&e.commit()}function ZC(e){var t=i0(),n=QC+e,i=t.open(n);return i.onupgradeneeded=function(s){var r=s.target.result;r.createObjectStore(ni,{keyPath:"id",autoIncrement:!0})},new Promise(function(s,r){i.onerror=function(a){return r(a)},i.onsuccess=function(){s(i.result)}})}function tM(e,t,n){var i=Date.now(),s={uuid:t,time:i,data:n},r=e.transaction([ni],"readwrite",yl);return new Promise(function(a,o){r.oncomplete=function(){return a()},r.onerror=function(l){return o(l)};var c=r.objectStore(ni);c.add(s),wd(r)})}function eM(e,t){var n=e.transaction(ni,"readonly",yl),i=n.objectStore(ni),s=[],r=IDBKeyRange.bound(t+1,1/0);if(i.getAll){var a=i.getAll(r);return new Promise(function(c,l){a.onerror=function(h){return l(h)},a.onsuccess=function(h){c(h.target.result)}})}function o(){try{return r=IDBKeyRange.bound(t+1,1/0),i.openCursor(r)}catch{return i.openCursor()}}return new Promise(function(c,l){var h=o();h.onerror=function(u){return l(u)},h.onsuccess=function(u){var d=u.target.result;d?d.value.id<t+1?d.continue(t+1):(s.push(d.value),d.continue()):(wd(n),c(s))}})}function nM(e,t){if(e.closed)return Promise.resolve([]);var n=e.db.transaction(ni,"readwrite",yl),i=n.objectStore(ni);return Promise.all(t.map(function(s){var r=i.delete(s);return new Promise(function(a){r.onsuccess=function(){return a()}})}))}function iM(e,t){var n=Date.now()-t,i=e.transaction(ni,"readonly",yl),s=i.objectStore(ni),r=[];return new Promise(function(a){s.openCursor().onsuccess=function(o){var c=o.target.result;if(c){var l=c.value;l.time<n?(r.push(l),c.continue()):(wd(i),a(r))}else a(r)}})}function sM(e){return iM(e.db,e.options.idb.ttl).then(function(t){return nM(e,t.map(function(n){return n.id}))})}function rM(e,t){return t=yd(t),ZC(e).then(function(n){var i={closed:!1,lastCursorId:0,channelName:e,options:t,uuid:lo(),eMIs:new n0(t.idb.ttl*2),writeBlockPromise:Qn,messagesCallback:null,readQueuePromises:[],db:n};return n.onclose=function(){i.closed=!0,t.idb.onclose&&t.idb.onclose()},s0(i),i})}function s0(e){e.closed||r0(e).then(function(){return us(e.options.idb.fallbackInterval)}).then(function(){return s0(e)})}function aM(e,t){return!(e.uuid===t.uuid||t.eMIs.has(e.id)||e.data.time<t.messagesCallbackTime)}function r0(e){return e.closed||!e.messagesCallback?Qn:eM(e.db,e.lastCursorId).then(function(t){var n=t.filter(function(i){return!!i}).map(function(i){return i.id>e.lastCursorId&&(e.lastCursorId=i.id),i}).filter(function(i){return aM(i,e)}).sort(function(i,s){return i.time-s.time});return n.forEach(function(i){e.messagesCallback&&(e.eMIs.add(i.id),e.messagesCallback(i.data))}),Qn})}function oM(e){e.closed=!0,e.db.close()}function cM(e,t){return e.writeBlockPromise=e.writeBlockPromise.then(function(){return tM(e.db,e.uuid,t)}).then(function(){FC(0,10)===0&&sM(e)}),e.writeBlockPromise}function lM(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t,r0(e)}function hM(){return!!i0()}function uM(e){return e.idb.fallbackInterval*2}var dM={create:rM,close:oM,onMessage:lM,postMessage:cM,canBeUsed:hM,type:JC,averageResponseTime:uM,microSeconds:GC},fM=ho,pM="pubkey.broadcastChannel-",gM="localstorage";function a0(){var e;if(typeof window>"u")return null;try{e=window.localStorage,e=window["ie8-eventlistener/storage"]||window.localStorage}catch{}return e}function o0(e){return pM+e}function mM(e,t){return new Promise(function(n){us().then(function(){var i=o0(e.channelName),s={token:lo(),time:Date.now(),data:t,uuid:e.uuid},r=JSON.stringify(s);a0().setItem(i,r);var a=document.createEvent("Event");a.initEvent("storage",!0,!0),a.key=i,a.newValue=r,window.dispatchEvent(a),n()})})}function vM(e,t){var n=o0(e),i=function(r){r.key===n&&t(JSON.parse(r.newValue))};return window.addEventListener("storage",i),i}function bM(e){window.removeEventListener("storage",e)}function _M(e,t){if(t=yd(t),!c0())throw new Error("BroadcastChannel: localstorage cannot be used");var n=lo(),i=new n0(t.localstorage.removeTimeout),s={channelName:e,uuid:n,eMIs:i};return s.listener=vM(e,function(r){s.messagesCallback&&r.uuid!==n&&(!r.token||i.has(r.token)||r.data.time&&r.data.time<s.messagesCallbackTime||(i.add(r.token),s.messagesCallback(r.data)))}),s}function yM(e){bM(e.listener)}function wM(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t}function c0(){var e=a0();if(!e)return!1;try{var t="__broadcastchannel_check";e.setItem(t,"works"),e.removeItem(t)}catch{return!1}return!0}function xM(){var e=120,t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")?e*2:e}var SM={create:_M,close:yM,onMessage:wM,postMessage:mM,canBeUsed:c0,type:gM,averageResponseTime:xM,microSeconds:fM},l0=ho,kM="simulate",xd=new Set;function CM(e){var t={time:l0(),name:e,messagesCallback:null};return xd.add(t),t}function MM(e){xd.delete(e)}var h0=5;function EM(e,t){return new Promise(function(n){return setTimeout(function(){var i=Array.from(xd);i.forEach(function(s){s.name===e.name&&s!==e&&s.messagesCallback&&s.time<t.time&&s.messagesCallback(t)}),n()},h0)})}function DM(e,t){e.messagesCallback=t}function $M(){return!0}function IM(){return h0}var PM={create:CM,close:MM,onMessage:DM,postMessage:EM,canBeUsed:$M,type:kM,averageResponseTime:IM,microSeconds:l0},lp=[YC,dM,SM];function OM(e){var t=[].concat(e.methods,lp).filter(Boolean);if(e.type){if(e.type==="simulate")return PM;var n=t.find(function(s){return s.type===e.type});if(n)return n;throw new Error("method-type "+e.type+" not found")}e.webWorkerSupport||(t=t.filter(function(s){return s.type!=="idb"}));var i=t.find(function(s){return s.canBeUsed()});if(i)return i;throw new Error("No usable method found in "+JSON.stringify(lp.map(function(s){return s.type})))}var u0=new Set,TM=0,wl=function(t,n){this.id=TM++,u0.add(this),this.name=t,this.options=yd(n),this.method=OM(this.options),this._iL=!1,this._onML=null,this._addEL={message:[],internal:[]},this._uMP=new Set,this._befC=[],this._prepP=null,AM(this)};wl._pubkey=!0;wl.prototype={postMessage:function(t){if(this.closed)throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed "+JSON.stringify(t));return hp(this,"message",t)},postInternal:function(t){return hp(this,"internal",t)},set onmessage(e){var t=this.method.microSeconds(),n={time:t,fn:e};dp(this,"message",this._onML),e&&typeof e=="function"?(this._onML=n,up(this,"message",n)):this._onML=null},addEventListener:function(t,n){var i=this.method.microSeconds(),s={time:i,fn:n};up(this,t,s)},removeEventListener:function(t,n){var i=this._addEL[t].find(function(s){return s.fn===n});dp(this,t,i)},close:function(){var t=this;if(!this.closed){u0.delete(this),this.closed=!0;var n=this._prepP?this._prepP:Qn;return this._onML=null,this._addEL.message=[],n.then(function(){return Promise.all(Array.from(t._uMP))}).then(function(){return Promise.all(t._befC.map(function(i){return i()}))}).then(function(){return t.method.close(t._state)})}},get type(){return this.method.type},get isClosed(){return this.closed}};function hp(e,t,n){var i=e.method.microSeconds(),s={time:i,type:t,data:n},r=e._prepP?e._prepP:Qn;return r.then(function(){var a=e.method.postMessage(e._state,s);return e._uMP.add(a),a.catch().then(function(){return e._uMP.delete(a)}),a})}function AM(e){var t=e.method.create(e.name,e.options);LC(t)?(e._prepP=t,t.then(function(n){e._state=n})):e._state=t}function d0(e){return e._addEL.message.length>0||e._addEL.internal.length>0}function up(e,t,n){e._addEL[t].push(n),RM(e)}function dp(e,t,n){e._addEL[t]=e._addEL[t].filter(function(i){return i!==n}),LM(e)}function RM(e){if(!e._iL&&d0(e)){var t=function(s){e._addEL[s.type].forEach(function(r){s.time>=r.time&&r.fn(s.data)})},n=e.method.microSeconds();e._prepP?e._prepP.then(function(){e._iL=!0,e.method.onMessage(e._state,t,n)}):(e._iL=!0,e.method.onMessage(e._state,t,n))}}function LM(e){if(e._iL&&!d0(e)){e._iL=!1;var t=e.method.microSeconds();e.method.onMessage(e._state,null,t)}}function NM(e){if(typeof WorkerGlobalScope=="function"&&self instanceof WorkerGlobalScope){var t=self.close.bind(self);self.close=function(){return e(),t()}}else{if(typeof window.addEventListener!="function")return;window.addEventListener("beforeunload",function(){e()},!0),window.addEventListener("unload",function(){e()},!0)}}function FM(e){process.on("exit",function(){return e()}),process.on("beforeExit",function(){return e().then(function(){return process.exit()})}),process.on("SIGINT",function(){return e().then(function(){return process.exit()})}),process.on("uncaughtException",function(t){return e().then(function(){console.trace(t),process.exit(101)})})}var BM=Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]",zM=BM?FM:NM,ba=new Set,fp=!1;function jM(){fp||(fp=!0,zM(HM))}function WM(e){if(jM(),typeof e!="function")throw new Error("Listener is no function");ba.add(e);var t={remove:function(){return ba.delete(e)},run:function(){return ba.delete(e),e()}};return t}function HM(){var e=[];return ba.forEach(function(t){e.push(t()),ba.delete(t)}),Promise.all(e)}function gs(e,t){var n={context:"leader",action:t,token:e.token};return e.broadcastChannel.postInternal(n)}function f0(e){e.isLeader=!0,e._hasLeader=!0;var t=WM(function(){return e.die()});e._unl.push(t);var n=function(s){s.context==="leader"&&s.action==="apply"&&gs(e,"tell"),s.context==="leader"&&s.action==="tell"&&!e._dpLC&&(e._dpLC=!0,e._dpL(),gs(e,"tell"))};return e.broadcastChannel.addEventListener("internal",n),e._lstns.push(n),gs(e,"tell")}var p0=function(t,n){var i=this;this.broadcastChannel=t,t._befC.push(function(){return i.die()}),this._options=n,this.isLeader=!1,this.isDead=!1,this.token=lo(),this._lstns=[],this._unl=[],this._dpL=function(){},this._dpLC=!1,this._wKMC={},this.lN="pubkey-bc||"+t.method.type+"||"+t.name};p0.prototype={hasLeader:function(){var t=this;return navigator.locks.query().then(function(n){var i=n.held?n.held.filter(function(s){return s.name===t.lN}):[];return!!(i&&i.length>0)})},awaitLeadership:function(){var t=this;if(!this._wLMP){this._wKMC.c=new AbortController;var n=new Promise(function(i,s){t._wKMC.res=i,t._wKMC.rej=s});this._wLMP=new Promise(function(i,s){navigator.locks.request(t.lN,{signal:t._wKMC.c.signal},function(){return t._wKMC.c=void 0,f0(t),i(),n}).catch(function(r){t._wKMC.rej&&t._wKMC.rej(r),s(r)})})}return this._wLMP},set onduplicate(e){},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this.isLeader=!1),this.isDead=!0,this._wKMC.res&&this._wKMC.res(),this._wKMC.c&&this._wKMC.c.abort("LeaderElectionWebLock.die() called"),gs(this,"death")}};var g0=function(t,n){var i=this;this.broadcastChannel=t,this._options=n,this.isLeader=!1,this._hasLeader=!1,this.isDead=!1,this.token=lo(),this._aplQ=Qn,this._aplQC=0,this._unl=[],this._lstns=[],this._dpL=function(){},this._dpLC=!1;var s=function(a){a.context==="leader"&&(a.action==="death"&&(i._hasLeader=!1),a.action==="tell"&&(i._hasLeader=!0))};this.broadcastChannel.addEventListener("internal",s),this._lstns.push(s)};g0.prototype={hasLeader:function(){return Promise.resolve(this._hasLeader)},applyOnce:function(t){var n=this;if(this.isLeader)return us(0,!0);if(this.isDead)return us(0,!1);if(this._aplQC>1)return this._aplQ;var i=function(){if(n.isLeader)return NC;var r=!1,a,o=new Promise(function(h){a=function(){r=!0,h()}}),c=function(u){u.context==="leader"&&u.token!=n.token&&(u.action==="apply"&&u.token>n.token&&a(),u.action==="tell"&&(a(),n._hasLeader=!0))};n.broadcastChannel.addEventListener("internal",c);var l=t?n._options.responseTime*4:n._options.responseTime;return gs(n,"apply").then(function(){return Promise.race([us(l),o.then(function(){return Promise.reject(new Error)})])}).then(function(){return gs(n,"apply")}).then(function(){return Promise.race([us(l),o.then(function(){return Promise.reject(new Error)})])}).catch(function(){}).then(function(){return n.broadcastChannel.removeEventListener("internal",c),r?!1:f0(n).then(function(){return!0})})};return this._aplQC=this._aplQC+1,this._aplQ=this._aplQ.then(function(){return i()}).then(function(){n._aplQC=n._aplQC-1}),this._aplQ.then(function(){return n.isLeader})},awaitLeadership:function(){return this._aLP||(this._aLP=VM(this)),this._aLP},set onduplicate(e){this._dpL=e},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this._hasLeader=!1,this.isLeader=!1),this.isDead=!0,gs(this,"death")}};function VM(e){return e.isLeader?Qn:new Promise(function(t){var n=!1;function i(){n||(n=!0,e.broadcastChannel.removeEventListener("internal",r),t(!0))}e.applyOnce().then(function(){e.isLeader&&i()});var s=function(){return us(e._options.fallbackInterval).then(function(){if(!(e.isDead||n))if(e.isLeader)i();else return e.applyOnce(!0).then(function(){e.isLeader?i():s()})})};s();var r=function(o){o.context==="leader"&&o.action==="death"&&(e._hasLeader=!1,e.applyOnce().then(function(){e.isLeader&&i()}))};e.broadcastChannel.addEventListener("internal",r),e._lstns.push(r)})}function UM(e,t){return e||(e={}),e=JSON.parse(JSON.stringify(e)),e.fallbackInterval||(e.fallbackInterval=3e3),e.responseTime||(e.responseTime=t.method.averageResponseTime(t.options)),e}function m0(e,t){if(e._leaderElector)throw new Error("BroadcastChannel already has a leader-elector");t=UM(t,e);var n=BC()?new p0(e,t):new g0(e,t);return e._befC.push(function(){return n.die()}),e._leaderElector=n,n}var Bc=new Map;function v0(e,t,n,i){var s=Bc.get(t);return s||(s={bc:new wl(["RxDB:",e,n].join("|")),refs:new Set},Bc.set(t,s)),s.refs.add(i),s.bc}function ou(e,t){var n=Bc.get(e);if(n&&(n.refs.delete(t),n.refs.size===0))return Bc.delete(e),n.bc.close()}function XL(e,t,n,i){if(t.multiInstance){var s=v0(e,t.databaseInstanceToken,n.databaseName,n),r=new le,a=d=>{d.storageName===e&&d.databaseName===t.databaseName&&d.collectionName===t.collectionName&&d.version===t.schema.version&&r.next(d.eventBulk)};s.addEventListener("message",a);var o=n.changeStream(),c=!1,l=o.subscribe(d=>{c||s.postMessage({storageName:e,databaseName:t.databaseName,collectionName:t.collectionName,version:t.schema.version,eventBulk:d})});n.changeStream=function(){return r.asObservable().pipe(S2(o))};var h=n.close.bind(n);n.close=async function(){return c=!0,l.unsubscribe(),s.removeEventListener("message",a),await ou(t.databaseInstanceToken,n),h()};var u=n.remove.bind(n);n.remove=async function(){return c=!0,l.unsubscribe(),s.removeEventListener("message",a),await ou(t.databaseInstanceToken,n),u()}}}async function b0(e){var t=$x(e.collection.schema.jsonSchema).map(r=>e.collection.name+"-"+r),n=await e.database.internalStore.findDocumentsById(t.map(r=>Cs(r,Pi)),!1),i={};n.forEach(r=>i[r.key]=r);var s=t.find(r=>i[r]);return s?i[s]:void 0}function qM(e,t,n){var i=Pt(n._attachments),s=Te(n),r=s._meta;delete s._meta,s._attachments=i;for(var a=t+1,o=Promise.resolve(s),c=function(){var l=a;o=o.then(h=>KM(e,l,h)),a++};a<=e.schema.version;)c();return o.then(l=>l===null?td:(r&&(l._meta=r),l))}function KM(e,t,n){if(n===null)return td;var i=e.migrationStrategies[t](n,e),s=Bm(i);return s}async function _0(e){if(e.collection.schema.version===0)return $n;var t=await b0(e);return!!t}var YM=200,y0=new WeakMap;function XM(e){var t=w0(e.database),n=t.getValue().slice(0);n.push(e),t.next(n)}function w0(e){return rn(y0,e,()=>new nn([]))}function GM(e){var t=y0.get(e);t&&t.complete()}var QM=(function(){function e(n,i,s=[n.name,"v",n.schema.version].join("-")){this.started=!1,this.canceled=!1,this.updateStatusHandlers=[],this.updateStatusQueue=Zu,this.collection=n,this.migrationStrategies=i,this.statusDocKey=s,this.database=n.database,this.oldCollectionMeta=b0(this),this.mustMigrate=_0(this),this.statusDocId=Cs(this.statusDocKey,Go),XM(this),this.$=jS(this.database.internalStore,this.statusDocId).pipe(pt(r=>!!r),Dt(r=>V(r).data),ro(io))}var t=e.prototype;return t.getStatus=function(){return Gn(this.$)},t.startMigration=async function(i=YM){var s=await this.mustMigrate;if(s){if(this.started)throw F("DM1");if(this.started=!0,this.database.multiInstance){this.broadcastChannel=new wl(["rx-migration-state",this.database.name,this.collection.name,this.collection.schema.version].join("|"));var r=m0(this.broadcastChannel);await r.awaitLeadership()}var a=await this.oldCollectionMeta,o=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:this.collection.name,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:V(a).data.schema,password:this.database.password,devMode:xt.isDevMode()}),c=await this.getConnectedStorageInstances(),l=await this.countAllDocuments([o].concat(c.map(u=>u.oldStorage)));await this.updateStatus(u=>(u.count.total=l,u));try{await Promise.all(c.map(async u=>{await Hv(this.collection,u.newStorage.collectionName,u.newStorage.schema),await this.migrateStorage(u.oldStorage,u.newStorage,i),await u.newStorage.close()})),await this.migrateStorage(o,this.collection.storageInstance.originalStorageInstance,i)}catch(u){await o.close(),await this.updateStatus(d=>(d.status="ERROR",d.error=Dc(u),d));return}try{await br(this.database.internalStore,{previous:a,document:Object.assign({},a,{_deleted:!0})},"rx-migration-remove-collection-meta")}catch(u){var h=dr(u);if(!(h&&h.documentInDb._deleted))throw u}await this.updateStatus(u=>(u.status="DONE",u)),this.broadcastChannel&&await this.broadcastChannel.close()}},t.updateStatus=function(i){return this.updateStatusHandlers.push(i),this.updateStatusQueue=this.updateStatusQueue.then(async()=>{if(this.updateStatusHandlers.length!==0){var s=this.updateStatusHandlers;for(this.updateStatusHandlers=[];;){var r=await Pr(this.database.internalStore,this.statusDocId),a=Te(r);r||(a={id:this.statusDocId,key:this.statusDocKey,context:Go,data:{collectionName:this.collection.name,status:"RUNNING",count:{total:0,handled:0,percent:0}},_deleted:!1,_meta:Dr(),_rev:fn(),_attachments:{}});var o=V(a).data;for(var c of s)o=c(o);if(o.count.percent=Math.round(o.count.handled/o.count.total*100),a&&r&&Ra(a.data,r.data))break;try{await br(this.database.internalStore,{previous:r,document:V(a)},Go);break}catch(l){if(!dr(l))throw l}}}}),this.updateStatusQueue},t.migrateStorage=async function(i,s,r){this.collection.onClose.push(()=>this.cancel()),this.database.onClose.push(()=>this.cancel());var a=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:"rx-migration-state-meta-"+i.collectionName+"-"+i.schema.version,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:iu(i.schema,Tc(i.schema)),password:this.database.password,devMode:xt.isDevMode()}),o=RC(s,Rc,this.database.token,!0),c=t0({keepMeta:!0,identifier:["rx-migration-state",i.collectionName,i.schema.version,this.collection.schema.version].join("-"),replicationHandler:{masterChangesSince(){return Promise.resolve({checkpoint:null,documents:[]})},masterWrite:async h=>{var u=await Promise.all(h.map(async f=>{var p=f.newDocumentState;if(s.schema.title===Qo&&(p=f.newDocumentState.docData,f.newDocumentState.isCheckpoint==="1"))return{assumedMasterState:void 0,newDocumentState:f.newDocumentState};var g=await qM(this.collection,i.schema.version,p);if(g===null)return null;var m={assumedMasterState:void 0,newDocumentState:s.schema.title===Qo?Object.assign({},f.newDocumentState,{docData:g}):g};return m}));u=u.filter(f=>!!f&&!!f.newDocumentState);var d=await o.masterWrite(u);return d},masterChangeStream$:new le().asObservable()},forkInstance:i,metaInstance:a,pushBatchSize:r,pullBatchSize:0,conflictHandler:Rc,hashFunction:this.database.hashFunction}),l=!1;if(c.events.error.subscribe(h=>l=h),c.events.processed.up.subscribe(()=>{this.updateStatus(h=>(h.count.handled=h.count.handled+1,h))}),await Jo(c),await ru(c),await this.updateStatusQueue,l)throw await a.close(),l;await Promise.all([i.remove(),a.remove()]),await this.cancel()},t.cancel=async function(){this.canceled=!0,this.replicationState&&await e0(this.replicationState),this.broadcastChannel&&await this.broadcastChannel.close()},t.countAllDocuments=async function(i){var s=0;return await Promise.all(i.map(async r=>{var a=vl(r.schema,or(r.schema,{selector:{}})),o=await r.count(a);s+=o.count})),s},t.getConnectedStorageInstances=async function(){var i=V(await this.oldCollectionMeta),s=[];return await Promise.all(await Promise.all(i.data.connectedStorages.map(async r=>{if(r.schema.title!==Qo)throw new Error("unknown migration handling for schema");var a=iu(Te(this.collection.schema.jsonSchema),Tc(r.schema));a.version=this.collection.schema.version;var[o,c]=await Promise.all([this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:xt.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:r.schema,password:this.database.password,collectionName:r.collectionName}),this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:xt.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:a,password:this.database.password,collectionName:r.collectionName})]);s.push({oldStorage:o,newStorage:c})}))),s},t.migratePromise=async function(i){this.startMigration(i);var s=await this.mustMigrate;if(!s)return{status:"DONE",collectionName:this.collection.name,count:{handled:0,percent:0,total:0}};var r=await Promise.race([Gn(this.$.pipe(pt(a=>a.status==="DONE"))),Gn(this.$.pipe(pt(a=>a.status==="ERROR")))]);if(r.status==="ERROR")throw F("DM4",{collection:this.collection.name,error:r.error});return r},e})(),zc=new WeakMap,cu=new WeakMap;function _a(e){var t=zc.get(e);if(!t){var n=e.database?e.database:e,i=e.database?e.name:"";throw F("LD8",{database:n.name,collection:i})}return t}function x0(e,t,n,i,s,r){return t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:JM(i),schema:S0,options:s,multiInstance:r,devMode:xt.isDevMode()})}function pp(e){var t=zc.get(e);if(t)return zc.delete(e),t.then(n=>n.storageInstance.close())}async function gp(e,t,n){var i=Rs(10),s=await x0(i,e,t,n,{},!1);await s.remove()}function JM(e){return"plugin-local-documents-"+e}var S0=dl({title:"RxLocalDocument",version:0,primaryKey:"id",type:"object",properties:{id:{type:"string",maxLength:128},data:{type:"object",additionalProperties:!0}},required:["id","data"]});async function mp(e,t){var n=await _a(this),i={id:e,data:t,_deleted:!1,_meta:Dr(),_rev:fn(),_attachments:{}};return br(n.storageInstance,{document:i},"local-document-insert").then(s=>n.docCache.getCachedRxDocument(s))}function vp(e,t){return this.getLocal(e).then(n=>{if(n)return n.incrementalModify(()=>t);var i=this.insertLocal(e,t);return i})}async function bp(e){var t=await _a(this),n=t.docCache,i=n.getLatestDocumentDataIfExists(e);return i?Promise.resolve(n.getCachedRxDocument(i)):Pr(t.storageInstance,e).then(s=>s?t.docCache.getCachedRxDocument(s):null)}function _p(e){return this.$.pipe(ao(null),In(async t=>{if(t)return{changeEvent:t};var n=await this.getLocal(e);return{doc:n}}),In(async t=>{if(t.changeEvent){var n=t.changeEvent;if(!n.isLocal||n.documentId!==e)return{use:!1};var i=await this.getLocal(e);return{use:!0,doc:i}}else return{use:!0,doc:t.doc}}),pt(t=>t.use),Dt(t=>t.doc))}var ZM=Ov(),tE=(function(e){function t(n,i,s){var r;return r=e.call(this,null,i)||this,r.id=n,r.parent=s,r}return Qu(t,e),t})(ZM),ya={get isLocal(){return!0},get allAttachments$(){throw F("LD1",{document:this})},get primaryPath(){return"id"},get primary(){return this.id},get $(){var e=this,t=pr(cu,this.parent),n=this.primary;return e.parent.eventBulks$.pipe(pt(i=>!!i.isLocal),Dt(i=>i.events.find(s=>s.documentId===n)),pt(i=>!!i),Dt(i=>uv(V(i))),ao(t.docCache.getLatestDocumentData(this.primary)),Fa((i,s)=>i._rev===s._rev),Dt(i=>t.docCache.getCachedRxDocument(i)),ro(io))},get $$(){var e=this,t=oh(e),n=t.getReactivityFactory();return n.fromObservable(e.$,e.getLatest()._data,t)},get deleted$$(){var e=this,t=oh(e),n=t.getReactivityFactory();return n.fromObservable(e.deleted$,e.getLatest().deleted,t)},getLatest(){var e=pr(cu,this.parent),t=e.docCache.getLatestDocumentData(this.primary);return e.docCache.getCachedRxDocument(t)},get(e){if(e="data."+e,!!this._data){if(typeof e!="string")throw Ec("LD2",{objPath:e});var t=fr(this._data,e);return t=xt.deepFreezeWhenDevMode(t),t}},get$(e){if(e="data."+e,xt.isDevMode()){if(e.includes(".item."))throw F("LD3",{objPath:e});if(e===this.primaryPath)throw F("LD4")}return this.$.pipe(Dt(t=>t._data),Dt(t=>fr(t,e)),Fa())},get$$(e){var t=oh(this),n=t.getReactivityFactory();return n.fromObservable(this.get$(e),this.getLatest().get(e),t)},async incrementalModify(e){var t=await _a(this.parent);return t.incrementalWriteQueue.addWrite(this._data,async n=>(n.data=await e(n.data,this),n)).then(n=>t.docCache.getCachedRxDocument(n))},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e){var t=await _a(this.parent),n=this._data;e.id=this.id;var i=[{previous:n,document:e}];return t.storageInstance.bulkWrite(i,"local-document-save-data").then(s=>{if(s.error[0])throw s.error[0];var r=an(this.collection.schema.primaryPath,i,s)[0];e=Pt(e),e._rev=r._rev})},async remove(){var e=await _a(this.parent),t=Pt(this._data);return t._deleted=!0,br(e.storageInstance,{previous:this._data,document:t},"local-document-remove").then(n=>e.docCache.getCachedRxDocument(n))}},yp=!1,eE=()=>{if(!yp){yp=!0;var e=_l,t=Object.getOwnPropertyNames(e);t.forEach(i=>{var s=Object.getOwnPropertyDescriptor(ya,i);if(!s){var r=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(ya,i,r)}});var n=i=>()=>{throw F("LD6",{functionName:i})};["populate","update","putAttachment","putAttachmentBase64","getAttachment","allAttachments"].forEach(i=>ya[i]=n(i))}};function nE(e,t){eE();var n=new tE(e.id,e,t);return Object.setPrototypeOf(n,ya),n.prototype=ya,n}function oh(e){var t=e.parent;return DC(t)?t:t.database}function wp(e){var t=e.database?e.database:e,n=e.database?e.name:"",i=(async()=>{var s=await x0(t.token,t.storage,t.name,n,t.instanceCreationOptions,t.multiInstance);s=hd(t,s,S0);var r=new Bv("id",t.eventBulks$.pipe(pt(h=>{var u=!1;return(n===""&&!h.collectionName||n!==""&&h.collectionName===n)&&(u=!0),u&&h.isLocal}),Dt(h=>h.events)),h=>nE(h,e)),a=new Pv(s,"id",()=>{},()=>{}),o=await t.storageToken,c=s.changeStream().subscribe(h=>{for(var u=new Array(h.events.length),d=h.events,f=e.database?e.name:void 0,p=0;p<d.length;p++){var g=d[p];u[p]={documentId:g.documentId,collectionName:f,isLocal:!0,operation:g.operation,documentData:xt.deepFreezeWhenDevMode(g.documentData),previousDocumentData:xt.deepFreezeWhenDevMode(g.previousDocumentData)}}var m={id:h.id,isLocal:!0,internal:!1,collectionName:e.database?e.name:void 0,storageToken:o,events:u,databaseToken:t.token,checkpoint:h.checkpoint,context:h.context};t.$emit(m)});e._subs.push(c);var l={database:t,parent:e,storageInstance:s,docCache:r,incrementalWriteQueue:a};return cu.set(e,l),l})();zc.set(e,i)}var iE={name:"local-documents",rxdb:!0,prototypes:{RxCollection:e=>{e.insertLocal=mp,e.upsertLocal=vp,e.getLocal=bp,e.getLocal$=_p},RxDatabase:e=>{e.insertLocal=mp,e.upsertLocal=vp,e.getLocal=bp,e.getLocal$=_p}},hooks:{createRxDatabase:{before:e=>{e.creator.localDocuments&&wp(e.database)}},createRxCollection:{before:e=>{e.creator.localDocuments&&wp(e.collection)}},preCloseRxDatabase:{after:e=>pp(e)},postCloseRxCollection:{after:e=>pp(e)},postRemoveRxDatabase:{after:e=>gp(e.storage,e.databaseName,"")},postRemoveRxCollection:{after:e=>gp(e.storage,e.databaseName,e.collectionName)}},overwritable:{}},sE=new WeakMap,rE={name:"migration-schema",rxdb:!0,init(){_d(iE)},hooks:{preCloseRxDatabase:{after:GM}},prototypes:{RxDatabase:e=>{e.migrationStates=function(){return w0(this).pipe(ro(io))}},RxCollection:e=>{e.getMigrationState=function(){return rn(sE,this,()=>new QM(this.asRxCollection,this.migrationStrategies))},e.migrationNeeded=function(){return this.schema.version===0?$n:_0(this.getMigrationState())}}}},aE=rE;_d(aE);const hi={type:"string",maxLength:100},oE={version:0,primaryKey:"id",type:"object",properties:{id:hi,date:{type:"string",maxLength:10},amount:{type:"number"},originalDescription:{type:"string"},memo:{type:"string"},merchantId:{type:"string",maxLength:100},accountId:{type:"string",maxLength:100},tagIds:{type:"array",items:{type:"string"}}},required:["id","date","amount","originalDescription","tagIds"],indexes:["date"]},cE={version:0,primaryKey:"id",type:"object",properties:{id:hi,name:{type:"string",maxLength:200},icon:{type:"string"},color:{type:"string"}},required:["id","name"],indexes:["name"]},lE={version:0,primaryKey:"id",type:"object",properties:{id:hi,name:{type:"string",maxLength:200}},required:["id","name"],indexes:["name"]},hE={version:0,primaryKey:"id",type:"object",properties:{id:hi,name:{type:"string"},type:{type:"string"}},required:["id","name"]},uE={version:0,primaryKey:"id",type:"object",properties:{id:hi,logic:{type:"string"},conditions:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}},merchantId:{type:"string"},accountId:{type:"string"},tagIds:{type:"array",items:{type:"string"}}},required:["id","logic","conditions","tagIds"]},dE={version:0,primaryKey:"id",type:"object",properties:{id:hi,title:{type:"string"},chartType:{type:"string"},granularity:{type:"string"},startDate:{type:"string"},endDate:{type:"string"},tagId:{type:"string"},merchantId:{type:"string"},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"},excludedTagIds:{type:"array",items:{type:"string"}},excludedMerchantIds:{type:"array",items:{type:"string"}},direction:{type:"string"},descriptionFilter:{type:"string"},descriptionFilterMode:{type:"string"},legendPosition:{type:"string"},filters:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}}},required:["id","title","chartType","granularity","position"]},fE={version:0,primaryKey:"id",type:"object",properties:{id:hi,title:{type:"string"},model:{type:"string"},columns:{type:"array",items:{type:"string"}},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"}},required:["id","title","model","columns","position"]},pE={version:0,primaryKey:"id",type:"object",properties:{id:hi,value:{type:"number"}},required:["id","value"]},gE={version:0,primaryKey:"id",type:"object",properties:{id:hi,data:{type:"string"}},required:["id"]};class zn{#t;constructor(t){this.#t=t}get rxCollection(){return this.#t}async get(t){const n=await this.#t.findOne(t).exec();if(!n)throw new Error(`Document not found: ${t}`);return n.toJSON(!0)}async put(t){return await this.#t.upsert(t),{id:t.id}}async bulkDocs(t){await this.#t.bulkUpsert(t)}async remove(t){const n=await this.#t.findOne(t).exec();n&&await n.remove()}async find(t){return(await this.#t.find(t).exec()).map(i=>i.toJSON(!0))}async all(){return(await this.#t.find().exec()).map(n=>n.toJSON(!0))}async clear(){const t=await this.#t.find().exec();await Promise.all(t.map(n=>n.remove()))}async count(){return this.#t.count().exec()}subscribe(t){const n=this.#t.$.subscribe(t);return{unsubscribe:()=>n.unsubscribe()}}}async function mE(e){const n=new TextEncoder().encode(e);if(typeof crypto<"u"&&crypto.subtle?.digest){const s=await crypto.subtle.digest("SHA-256",n),r=new Uint8Array(s);return Array.from(r,a=>a.toString(16).padStart(2,"0")).join("")}let i=2166136261;for(let s=0;s<n.length;s++)i^=n[s],i=Math.imul(i,16777619);return(i>>>0).toString(16).padStart(8,"0")}async function vE(e,t="budgee"){const n=await MC({name:t,storage:e,hashFunction:mE});return await n.addCollections({transactions:{schema:oE},tags:{schema:cE},merchants:{schema:lE},accounts:{schema:hE},merchant_rules:{schema:uE},dashboard_charts:{schema:dE},dashboard_tables:{schema:fE},meta:{schema:pE},backups:{schema:gE}}),{rxdb:n,transactions:new zn(n.transactions),tags:new zn(n.tags),merchants:new zn(n.merchants),accounts:new zn(n.accounts),merchantRules:new zn(n.merchant_rules),dashboardCharts:new zn(n.dashboard_charts),dashboardTables:new zn(n.dashboard_tables),meta:new zn(n.meta),backups:new zn(n.backups)}}async function bE(){const{getRxStorageDexie:e}=await fa(async()=>{const{getRxStorageDexie:t}=await import("./index-0XWg_WuP.js");return{getRxStorageDexie:t}},[]);return vE(e())}const _E=bE().then(e=>e);function U(){return _E}function Pn(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=new Uint8Array(16);crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Ki(e){if(!e)return{docs:[],idMap:new Map};const t=new Map;return{docs:e.map(i=>{if(i.id)return i;const r=String(i._id??""),a=Pn();return r&&t.set(r,a),{...i,id:a}}),idMap:t}}function zr(e,t){return t&&(e.get(t)??t)}function Mo(e,t){return t&&t.map(n=>e.get(n)??n)}async function k0(e){const t=await e.text(),n=JSON.parse(t),{migrateExport:i,LATEST_VERSION:s}=await fa(async()=>{const{migrateExport:_,LATEST_VERSION:w}=await Promise.resolve().then(()=>ME);return{migrateExport:_,LATEST_VERSION:w}},void 0),r=i(n),a=await U();await a.transactions.clear(),await a.tags.clear(),await a.merchants.clear(),await a.accounts.clear(),await a.merchantRules.clear(),await a.dashboardCharts.clear(),await a.dashboardTables.clear();const{docs:o,idMap:c}=Ki(r.tags),{docs:l,idMap:h}=Ki(r.merchants),{docs:u,idMap:d}=Ki(r.accounts),f=c.size>0||h.size>0||d.size>0,{docs:p}=Ki(r.transactions),{docs:g}=Ki(r.merchantRules),{docs:m}=Ki(r.dashboardCharts),{docs:b}=Ki(r.dashboardTables);if(f){for(const _ of p)_.merchantId=zr(h,_.merchantId),_.accountId=zr(d,_.accountId),_.tagIds=Mo(c,_.tagIds)??_.tagIds;for(const _ of g)_.merchantId=zr(h,_.merchantId),_.tagIds=Mo(c,_.tagIds)??_.tagIds;for(const _ of m)_.tagId=zr(c,_.tagId),_.merchantId=zr(h,_.merchantId),_.excludedTagIds=Mo(c,_.excludedTagIds),_.excludedMerchantIds=Mo(h,_.excludedMerchantIds)}p.length&&await a.transactions.bulkDocs(p),o.length&&await a.tags.bulkDocs(o),l.length&&await a.merchants.bulkDocs(l),u.length&&await a.accounts.bulkDocs(u),g.length&&await a.merchantRules.bulkDocs(g),m.length&&await a.dashboardCharts.bulkDocs(m),b.length&&await a.dashboardTables.bulkDocs(b);try{const _=await a.meta.get("schema_version");await a.meta.put({..._,value:s})}catch{await a.meta.put({id:"schema_version",value:s})}}const C0=[],Sn=C0.length;function M0(e){let t=e.version??Sn,n=e;for(;t<Sn;)n=C0[t](n),t=n.version??t+1;return n}async function yE(e){return{version:Sn,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()}}async function wE(e,t){const n=`backup_${new Date().toISOString()}`;await e.backups.put({id:n,data:JSON.stringify(t)}),await xE(e,10)}async function xE(e,t){const n=await e.backups.all();if(n.length<=t)return;const s=n.sort((r,a)=>a.id.localeCompare(r.id)).slice(t);for(const r of s)await e.backups.remove(r.id)}async function SE(e){try{return(await e.meta.get("schema_version")).value}catch{return null}}async function kE(e,t){await e.meta.put({id:"schema_version",value:t})}async function CE(e,t){await e.transactions.clear(),await e.tags.clear(),await e.merchants.clear(),await e.accounts.clear(),await e.merchantRules.clear(),await e.dashboardCharts.clear(),await e.dashboardTables.clear(),t.transactions?.length&&await e.transactions.bulkDocs(t.transactions),t.tags?.length&&await e.tags.bulkDocs(t.tags),t.merchants?.length&&await e.merchants.bulkDocs(t.merchants),t.accounts?.length&&await e.accounts.bulkDocs(t.accounts),t.merchantRules?.length&&await e.merchantRules.bulkDocs(t.merchantRules),t.dashboardCharts?.length&&await e.dashboardCharts.bulkDocs(t.dashboardCharts),t.dashboardTables?.length&&await e.dashboardTables.bulkDocs(t.dashboardTables)}async function E0(e){const t=await SE(e);if(t!=null&&t>=Sn)return;const n=await yE(e);if(n.version=t??Sn,console.log(`[migrate] Current data at version ${n.version}`),(n.version??Sn)<Sn){await wE(e,n),console.log("[migrate] Backup saved");const i=M0(n);console.log(`[migrate] Migrated to version ${i.version}`),await CE(e,i)}await kE(e,Sn),console.log("[migrate] Migration complete")}const ME=Object.freeze(Object.defineProperty({__proto__:null,LATEST_VERSION:Sn,migrateDatabase:E0,migrateExport:M0},Symbol.toStringTag,{value:"Module"}));var D0=new WeakMap,EE=new WeakMap;function xp(e){return rn(EE,e,()=>m0(e))}function DE(){var e=v0(this.storage.name,this.token,this.name,this),t=this.close.bind(this);this.close=function(){return ou(this.token,this),t()};var n=xp(e);return n||(n=xp(e),D0.set(this,n)),this.leaderElector=()=>n,n}function $E(){return this.multiInstance?this.leaderElector().isLeader:!0}function IE(){return this.multiInstance?this.leaderElector().awaitLeadership().then(()=>!0):Zu}function PE(e){var t=D0.get(e);t&&t.die()}var OE=!0,TE={RxDatabase:e=>{e.leaderElector=DE,e.isLeader=$E,e.waitForLeadership=IE}},AE={name:"leader-election",rxdb:OE,prototypes:TE,hooks:{preCloseRxDatabase:{after:PE}}},Sp=e=>Promise.resolve(e);function kp(e,t){if(e==="_deleted")return t;t=Pt(t);var n=!!t._deleted;return t[e]=n,delete t._deleted,t}function ch(e,t,n){return n.map(i=>{var s=Pt(i);if(t!=="_deleted"){var r=!!s[t];s._deleted=r,delete s[t]}else s._deleted=!!s._deleted;var a=e.schema.primaryPath;return s[a]=zi(e.schema.jsonSchema,s),s})}function Cp(e,t){if(typeof window>"u"||typeof window!="object"||typeof window.addEventListener>"u"||navigator.onLine)return e.promiseWait(t);var n,i=new Promise(s=>{n=()=>{window.removeEventListener("online",n),s()},window.addEventListener("online",n)});return Promise.race([i,e.promiseWait(t)]).then(()=>{window.removeEventListener("online",n)})}function RE(e){function t(){if(!(typeof document>"u"||typeof document.dispatchEvent!="function")){var i=new Event("mousemove");document.dispatchEvent(i)}}var n=setInterval(t,20*1e3);e.onCancel.push(()=>clearInterval(n))}var LE=new WeakMap,NE=(function(){function e(n,i,s,r,a,o,c,l,h){this.subs=[],this.subjects={received:new le,sent:new le,error:new le,canceled:new nn(!1),active:new nn(!1)},this.received$=this.subjects.received.asObservable(),this.sent$=this.subjects.sent.asObservable(),this.error$=this.subjects.error.asObservable(),this.canceled$=this.subjects.canceled.asObservable(),this.active$=this.subjects.active.asObservable(),this.wasStarted=!1,this.startQueue=sn,this.onCancel=[],this.callOnStart=void 0,this.remoteEvents$=new le,this.replicationIdentifier=n,this.collection=i,this.deletedField=s,this.pull=r,this.push=a,this.live=o,this.retryTime=c,this.autoStart=l,this.toggleOnDocumentVisible=h,this.metaInfoPromise=(async()=>{var f="rx-replication-meta-"+await i.database.hashFunction([this.collection.name,this.replicationIdentifier].join("-")),p=iu(this.collection.schema.jsonSchema,Tc(this.collection.schema.jsonSchema));return{collectionName:f,schema:p}})();var u=rn(LE,i,()=>[]);u.push(this),this.collection.onClose.push(()=>this.cancel()),Object.keys(this.subjects).forEach(f=>{Object.defineProperty(this,f+"$",{get:function(){return this.subjects[f].asObservable()}})});var d=new Promise(f=>{this.callOnStart=f});this.startPromise=d}var t=e.prototype;return t.start=function(){return this.startQueue=this.startQueue.then(()=>this._start()),this.startQueue},t._start=async function(){if(!this.isStopped()){if(this.internalReplicationState&&this.internalReplicationState.events.paused.next(!1),this.wasStarted){this.reSync();return}this.wasStarted=!0,this.toggleOnDocumentVisible||RE(this);var i=this.pull&&this.pull.modifier?this.pull.modifier:Sp,s=this.push&&this.push.modifier?this.push.modifier:Sp,r=this.collection.database,a=await this.metaInfoPromise,[o]=await Promise.all([this.collection.database.storage.createStorageInstance({databaseName:r.name,collectionName:a.collectionName,databaseInstanceToken:r.token,multiInstance:r.multiInstance,options:{},schema:a.schema,password:r.password,devMode:xt.isDevMode()}),Hv(this.collection,a.collectionName,a.schema)]);this.metaInstance=o,this.internalReplicationState=t0({pushBatchSize:this.push&&this.push.batchSize?this.push.batchSize:100,pullBatchSize:this.pull&&this.pull.batchSize?this.pull.batchSize:100,initialCheckpoint:{upstream:this.push?this.push.initialCheckpoint:void 0,downstream:this.pull?this.pull.initialCheckpoint:void 0},forkInstance:this.collection.storageInstance,metaInstance:this.metaInstance,hashFunction:r.hashFunction,identifier:"rxdbreplication"+this.replicationIdentifier,conflictHandler:this.collection.conflictHandler,replicationHandler:{masterChangeStream$:this.remoteEvents$.asObservable().pipe(pt(c=>!!this.pull),In(async c=>{if(c==="RESYNC")return c;var l=Pt(c);return l.documents=ch(this.collection,this.deletedField,l.documents),l.documents=await Promise.all(l.documents.map(h=>i(h))),l})),masterChangesSince:async(c,l)=>{if(!this.pull)return{checkpoint:null,documents:[]};for(var h=!1,u={};!h&&!this.isStoppedOrPaused();)try{u=await this.pull.handler(c,l),h=!0}catch(p){var d=F("RC_PULL",{checkpoint:c,errors:Sc(p).map(g=>Dc(g)),direction:"pull"});this.subjects.error.next(d),await Cp(this.collection,V(this.retryTime))}if(this.isStoppedOrPaused())return{checkpoint:null,documents:[]};var f=Pt(u);return f.documents=ch(this.collection,this.deletedField,f.documents),f.documents=await Promise.all(f.documents.map(p=>i(p))),f},masterWrite:async c=>{if(!this.push)return[];var l=!1;await ys("preReplicationMasterWrite",{rows:c,collection:this.collection});var h=await Promise.all(c.map(async g=>(g.newDocumentState=await s(g.newDocumentState),g.newDocumentState===null?null:(g.assumedMasterState&&(g.assumedMasterState=await s(g.assumedMasterState)),this.deletedField!=="_deleted"&&(g.newDocumentState=kp(this.deletedField,g.newDocumentState),g.assumedMasterState&&(g.assumedMasterState=kp(this.deletedField,g.assumedMasterState))),g)))),u=h.filter(J1),d=null;for(u.length===0&&(l=!0,d=[]);!l&&!this.isStoppedOrPaused();)try{if(d=await this.push.handler(u),!Array.isArray(d))throw F("RC_PUSH_NO_AR",{pushRows:c,direction:"push",args:{result:d}});l=!0}catch(g){var f=g.rxdb?g:F("RC_PUSH",{pushRows:c,errors:Sc(g).map(m=>Dc(m)),direction:"push"});this.subjects.error.next(f),await Cp(this.collection,V(this.retryTime))}if(this.isStoppedOrPaused())return[];await ys("preReplicationMasterWriteDocumentsHandle",{result:d,collection:this.collection});var p=ch(this.collection,this.deletedField,V(d));return p}}}),this.subs.push(this.internalReplicationState.events.error.subscribe(c=>{this.subjects.error.next(c)}),this.internalReplicationState.events.processed.down.subscribe(c=>this.subjects.received.next(c.document)),this.internalReplicationState.events.processed.up.subscribe(c=>{this.subjects.sent.next(c.newDocumentState)}),rd([this.internalReplicationState.events.active.down,this.internalReplicationState.events.active.up]).subscribe(([c,l])=>{var h=c||l;this.subjects.active.next(h)})),this.pull&&this.pull.stream$&&this.live&&this.subs.push(this.pull.stream$.subscribe({next:c=>{this.isStoppedOrPaused()||this.remoteEvents$.next(c)},error:c=>{this.subjects.error.next(c)}})),this.live||(await Jo(this.internalReplicationState),await ru(this.internalReplicationState),await this._cancel()),this.callOnStart()}},t.pause=function(){return this.startQueue=this.startQueue.then(()=>{this.internalReplicationState&&this.internalReplicationState.events.paused.next(!0)}),this.startQueue},t.isPaused=function(){return!!(this.internalReplicationState&&this.internalReplicationState.events.paused.getValue())},t.isStopped=function(){return!!this.subjects.canceled.getValue()},t.isStoppedOrPaused=function(){return this.isPaused()||this.isStopped()},t.awaitInitialReplication=async function(){return await this.startPromise,Jo(V(this.internalReplicationState))},t.awaitInSync=async function(){await this.startPromise,await Jo(V(this.internalReplicationState));for(var i=2;i>0;)i--,await this.collection.database.requestIdlePromise(),await ru(V(this.internalReplicationState));return!0},t.reSync=function(){this.remoteEvents$.next("RESYNC")},t.emitEvent=function(i){this.remoteEvents$.next(i)},t.cancel=async function(){this.startQueue=this.startQueue.catch(()=>{}).then(async()=>{await this._cancel()}),await this.startQueue},t._cancel=async function(i=!1){if(this.isStopped())return $n;var s=this.onCancel.map(r=>Bm(r()));return this.internalReplicationState&&await e0(this.internalReplicationState),this.metaInstance&&!i&&s.push(V(this.internalReplicationState).checkpointQueue.then(()=>V(this.metaInstance).close())),this.subs.forEach(r=>r.unsubscribe()),this.subjects.canceled.next(!0),this.subjects.active.complete(),this.subjects.canceled.complete(),this.subjects.error.complete(),this.subjects.received.complete(),this.subjects.sent.complete(),Promise.all(s)},t.remove=async function(){return this.startQueue=this.startQueue.then(async()=>{var i=await this.metaInfoPromise;await this._cancel(!0),await V(this.internalReplicationState).checkpointQueue.then(()=>V(this.metaInstance).remove()),await lC(this.collection,i.collectionName,i.schema)}),this.startQueue},e})();function FE({replicationIdentifier:e,collection:t,deletedField:n="_deleted",pull:i,push:s,live:r=!0,retryTime:a=1e3*5,waitForLeadership:o=!0,autoStart:c=!0,toggleOnDocumentVisible:l=!1}){if(_d(AE),!i&&!s)throw F("UT3",{collection:t.name,args:{replicationIdentifier:e}});var h=new NE(e,t,n,i,s,r,a,c,l);if(l&&typeof document<"u"&&typeof document.addEventListener=="function"&&typeof document.visibilityState=="string"){var u=()=>{if(!h.isStopped()){var d=document.visibilityState==="visible";d?h.start():t.database.isLeader()||h.pause()}};document.addEventListener("visibilitychange",u),h.onCancel.push(()=>document.removeEventListener("visibilitychange",u))}return BE(o,h),h}function BE(e,t){var n=e&&t.collection.database.multiInstance,i=n?t.collection.database.waitForLeadership():Zu;return i.then(()=>{t.isStopped()||t.autoStart&&t.start()})}var lu=function(e,t){return lu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var s in i)i.hasOwnProperty(s)&&(n[s]=i[s])},lu(e,t)};function $0(e,t){lu(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function zE(e){var t=typeof Symbol=="function"&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function jE(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),s,r=[],a;try{for(;(t===void 0||t-- >0)&&!(s=i.next()).done;)r.push(s.value)}catch(o){a={error:o}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(a)throw a.error}}return r}function WE(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(jE(arguments[t]));return e}var I0=(function(){function e(t,n){this.target=n,this.type=t}return e})(),HE=(function(e){$0(t,e);function t(n,i){var s=e.call(this,"error",i)||this;return s.message=n.message,s.error=n,s}return t})(I0),VE=(function(e){$0(t,e);function t(n,i,s){n===void 0&&(n=1e3),i===void 0&&(i="");var r=e.call(this,"close",s)||this;return r.wasClean=!0,r.code=n,r.reason=i,r}return t})(I0);var UE=function(){if(typeof WebSocket<"u")return WebSocket},qE=function(e){return typeof e<"u"&&!!e&&e.CLOSING===2},Yi={maxReconnectionDelay:1e4,minReconnectionDelay:1e3+Math.random()*4e3,minUptime:5e3,reconnectionDelayGrowFactor:1.3,connectionTimeout:4e3,maxRetries:1/0,maxEnqueuedMessages:1/0},KE=(function(){function e(t,n,i){var s=this;i===void 0&&(i={}),this._listeners={error:[],message:[],open:[],close:[]},this._retryCount=-1,this._shouldReconnect=!0,this._connectLock=!1,this._binaryType="blob",this._closeCalled=!1,this._messageQueue=[],this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this._handleOpen=function(r){s._debug("open event");var a=s._options.minUptime,o=a===void 0?Yi.minUptime:a;clearTimeout(s._connectTimeout),s._uptimeTimeout=setTimeout(function(){return s._acceptOpen()},o),s._ws.binaryType=s._binaryType,s._messageQueue.forEach(function(c){return s._ws.send(c)}),s._messageQueue=[],s.onopen&&s.onopen(r),s._listeners.open.forEach(function(c){return s._callEventListener(r,c)})},this._handleMessage=function(r){s._debug("message event"),s.onmessage&&s.onmessage(r),s._listeners.message.forEach(function(a){return s._callEventListener(r,a)})},this._handleError=function(r){s._debug("error event",r.message),s._disconnect(void 0,r.message==="TIMEOUT"?"timeout":void 0),s.onerror&&s.onerror(r),s._debug("exec error listeners"),s._listeners.error.forEach(function(a){return s._callEventListener(r,a)}),s._connect()},this._handleClose=function(r){s._debug("close event"),s._clearTimeouts(),s._shouldReconnect&&s._connect(),s.onclose&&s.onclose(r),s._listeners.close.forEach(function(a){return s._callEventListener(r,a)})},this._url=t,this._protocols=n,this._options=i,this._options.startClosed&&(this._shouldReconnect=!1),this._connect()}return Object.defineProperty(e,"CONNECTING",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(e,"OPEN",{get:function(){return 1},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSING",{get:function(){return 2},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSED",{get:function(){return 3},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CONNECTING",{get:function(){return e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"OPEN",{get:function(){return e.OPEN},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSING",{get:function(){return e.CLOSING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSED",{get:function(){return e.CLOSED},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"binaryType",{get:function(){return this._ws?this._ws.binaryType:this._binaryType},set:function(t){this._binaryType=t,this._ws&&(this._ws.binaryType=t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"retryCount",{get:function(){return Math.max(this._retryCount,0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var t=this._messageQueue.reduce(function(n,i){return typeof i=="string"?n+=i.length:i instanceof Blob?n+=i.size:n+=i.byteLength,n},0);return t+(this._ws?this._ws.bufferedAmount:0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this._ws?this._ws.extensions:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this._ws?this._ws.protocol:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this._ws?this._ws.readyState:this._options.startClosed?e.CLOSED:e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this._ws?this._ws.url:""},enumerable:!0,configurable:!0}),e.prototype.close=function(t,n){if(t===void 0&&(t=1e3),this._closeCalled=!0,this._shouldReconnect=!1,this._clearTimeouts(),!this._ws){this._debug("close enqueued: no ws instance");return}if(this._ws.readyState===this.CLOSED){this._debug("close: already closed");return}this._ws.close(t,n)},e.prototype.reconnect=function(t,n){this._shouldReconnect=!0,this._closeCalled=!1,this._retryCount=-1,!this._ws||this._ws.readyState===this.CLOSED?this._connect():(this._disconnect(t,n),this._connect())},e.prototype.send=function(t){if(this._ws&&this._ws.readyState===this.OPEN)this._debug("send",t),this._ws.send(t);else{var n=this._options.maxEnqueuedMessages,i=n===void 0?Yi.maxEnqueuedMessages:n;this._messageQueue.length<i&&(this._debug("enqueue",t),this._messageQueue.push(t))}},e.prototype.addEventListener=function(t,n){this._listeners[t]&&this._listeners[t].push(n)},e.prototype.dispatchEvent=function(t){var n,i,s=this._listeners[t.type];if(s)try{for(var r=zE(s),a=r.next();!a.done;a=r.next()){var o=a.value;this._callEventListener(t,o)}}catch(c){n={error:c}}finally{try{a&&!a.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}return!0},e.prototype.removeEventListener=function(t,n){this._listeners[t]&&(this._listeners[t]=this._listeners[t].filter(function(i){return i!==n}))},e.prototype._debug=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this._options.debug&&console.log.apply(console,WE(["RWS>"],t))},e.prototype._getNextDelay=function(){var t=this._options,n=t.reconnectionDelayGrowFactor,i=n===void 0?Yi.reconnectionDelayGrowFactor:n,s=t.minReconnectionDelay,r=s===void 0?Yi.minReconnectionDelay:s,a=t.maxReconnectionDelay,o=a===void 0?Yi.maxReconnectionDelay:a,c=0;return this._retryCount>0&&(c=r*Math.pow(i,this._retryCount-1),c>o&&(c=o)),this._debug("next delay",c),c},e.prototype._wait=function(){var t=this;return new Promise(function(n){setTimeout(n,t._getNextDelay())})},e.prototype._getNextUrl=function(t){if(typeof t=="string")return Promise.resolve(t);if(typeof t=="function"){var n=t();if(typeof n=="string")return Promise.resolve(n);if(n.then)return n}throw Error("Invalid URL")},e.prototype._connect=function(){var t=this;if(!(this._connectLock||!this._shouldReconnect)){this._connectLock=!0;var n=this._options,i=n.maxRetries,s=i===void 0?Yi.maxRetries:i,r=n.connectionTimeout,a=r===void 0?Yi.connectionTimeout:r,o=n.WebSocket,c=o===void 0?UE():o;if(this._retryCount>=s){this._debug("max retries reached",this._retryCount,">=",s);return}if(this._retryCount++,this._debug("connect",this._retryCount),this._removeListeners(),!qE(c))throw Error("No valid WebSocket class provided");this._wait().then(function(){return t._getNextUrl(t._url)}).then(function(l){t._closeCalled||(t._debug("connect",{url:l,protocols:t._protocols}),t._ws=t._protocols?new c(l,t._protocols):new c(l),t._ws.binaryType=t._binaryType,t._connectLock=!1,t._addListeners(),t._connectTimeout=setTimeout(function(){return t._handleTimeout()},a))})}},e.prototype._handleTimeout=function(){this._debug("timeout event"),this._handleError(new HE(Error("TIMEOUT"),this))},e.prototype._disconnect=function(t,n){if(t===void 0&&(t=1e3),this._clearTimeouts(),!!this._ws){this._removeListeners();try{this._ws.close(t,n),this._handleClose(new VE(t,n,this))}catch{}}},e.prototype._acceptOpen=function(){this._debug("accept open"),this._retryCount=0},e.prototype._callEventListener=function(t,n){"handleEvent"in n?n.handleEvent(t):n(t)},e.prototype._removeListeners=function(){this._ws&&(this._debug("removeListeners"),this._ws.removeEventListener("open",this._handleOpen),this._ws.removeEventListener("close",this._handleClose),this._ws.removeEventListener("message",this._handleMessage),this._ws.removeEventListener("error",this._handleError))},e.prototype._addListeners=function(){this._ws&&(this._debug("addListeners"),this._ws.addEventListener("open",this._handleOpen),this._ws.addEventListener("close",this._handleClose),this._ws.addEventListener("message",this._handleMessage),this._ws.addEventListener("error",this._handleError))},e.prototype._clearTimeouts=function(){clearTimeout(this._connectTimeout),clearTimeout(this._uptimeTimeout)},e})(),ls=null;typeof WebSocket<"u"?ls=WebSocket:typeof MozWebSocket<"u"?ls=MozWebSocket:typeof global<"u"?ls=global.WebSocket||global.MozWebSocket:typeof window<"u"?ls=window.WebSocket||window.MozWebSocket:typeof self<"u"&&(ls=self.WebSocket||self.MozWebSocket);function YE(e){var t=typeof e<"u"&&!!e&&e.CLOSING===2;if(!t)throw console.dir(e),new Error("websocket not valid")}async function XE(e){YE(ls);var t=new KE(e.url,[],{WebSocket:ls}),n=new nn(!1),i=new le,s=new le;return t.onerror=r=>{var a=F("RC_STREAM",{errors:Sc(r).map(o=>Dc(o)),direction:"pull"});s.next(a)},await new Promise(r=>{t.onopen=()=>{if(e.headers){var a={collection:e.collection.name,id:Rs(10),params:[e.headers],method:"auth"};t.send(JSON.stringify(a))}n.next(!0),r()}}),t.onclose=()=>{n.next(!1)},t.onmessage=r=>{var a=JSON.parse(r.data);i.next(a)},{url:e.url,socket:t,connected$:n,message$:i,error$:s}}async function GE(e){var t=await XE(e),n=t.socket,i=t.message$,s=0,r=Rs(10);function a(){var c=s++;return e.collection.database.token+"|"+r+"|"+c}var o=FE({collection:e.collection,replicationIdentifier:e.replicationIdentifier,live:e.live,pull:{batchSize:e.batchSize,stream$:i.pipe(pt(c=>c.id==="stream"&&c.collection===e.collection.name),Dt(c=>c.result)),async handler(c,l){var h=a(),u={id:h,collection:e.collection.name,method:"masterChangesSince",params:[c,l]};n.send(JSON.stringify(u));var d=await Gn(i.pipe(pt(f=>f.id===h),Dt(f=>f.result)));return d}},push:{batchSize:e.batchSize,handler(c){var l=a(),h={id:l,collection:e.collection.name,method:"masterWrite",params:[c]};return n.send(JSON.stringify(h)),Gn(i.pipe(pt(u=>u.id===l),Dt(u=>u.result)))}}});return t.error$.subscribe(c=>o.subjects.error.next(c)),t.connected$.subscribe(c=>{if(c){o.reSync();var l={id:"stream",collection:e.collection.name,method:"masterChangeStream$",params:[]};n.send(JSON.stringify(l))}}),e.collection.onClose.push(()=>t.socket.close()),o}async function QE(e){const t=await fetch(`${e}/health`);if(!t.ok)throw new Error(`Server returned ${t.status} ${t.statusText}`)}const JE=["transactions","tags","merchants","accounts","merchant_rules","dashboard_charts","dashboard_tables"],Zo=new nn({state:"not-configured"}),ZE=Zo.pipe(hv(e=>{if(e.state==="not-configured")return zf("not-configured");if(e.state==="connecting")return zf("connecting");const{replications:t}=e,n=qh(...t.map(s=>s.error$)).pipe(Dt(()=>"error")),i=rd(t.map(s=>s.active$)).pipe(Dt(s=>s.some(Boolean)?"syncing":"synced"));return qh(i,n)}));async function tD(e){Zo.next({state:"connecting"});const n=(await U()).rxdb,i=e.replace(/^http/,"ws")+"/ws",s=await Promise.all(JE.map(async r=>{const a=n[r],o=`budgee--${r}`;try{await fetch(`${e}/databases`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:o,schema:a.schema.jsonSchema})})}catch(c){console.warn(`Failed to register schema for ${r}:`,c)}return GE({collection:a,replicationIdentifier:o,url:`${i}/${o}`,live:!0})}));return Zo.next({state:"connected",replications:s}),async()=>{Zo.next({state:"not-configured"}),await Promise.all(s.map(r=>r.cancel().catch(console.error)))}}const P0=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var eD=Object.defineProperty,nD=Object.getOwnPropertyDescriptor,O0=(e,t,n,i)=>{for(var s=i>1?void 0:i?nD(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&eD(t,n,s),s};let jc=class extends gt{constructor(){super(...arguments),this.message=""}render(){return k`
      <div class="icon">${re(P0)}</div>
      <div class="message">${this.message}</div>
    `}};jc.styles=mt`
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
  `;O0([Q()],jc.prototype,"message",2);jc=O0([$t("budgee-loading-overlay")],jc);let _i=null;function Sd(e){if(_i){_i.message=e;return}_i=document.createElement("budgee-loading-overlay"),_i.message=e,document.body.appendChild(_i)}function kd(){_i&&(_i.remove(),_i=null)}const T0=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,iD=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,sD=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,rD=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,aD=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,A0=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,oD=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;class Li{constructor(){}static async subscribe(t){return(await U()).accounts.subscribe(t)}static async all(){return(await U()).accounts.all()}static async get(t){const n=await U();try{return await n.accounts.get(t)}catch{return}}static async create(t){const n=await U(),i=Pn();return await n.accounts.put({...t,id:i}),i}static async update(t,n){const i=await U(),s=await i.accounts.get(t);await i.accounts.put({...s,...n})}static async remove(t){await(await U()).accounts.remove(t)}}class Se{constructor(){}static async subscribe(t){return(await U()).transactions.subscribe(t)}static async all(){return(await U()).transactions.all()}static async get(t){const n=await U();try{return await n.transactions.get(t)}catch{return}}static async update(t,n){const i=await U(),s=await i.transactions.get(t);await i.transactions.put({...s,...n})}static async bulkPut(t){await(await U()).transactions.bulkDocs(t.map(i=>({...i,id:i.id??Pn()})))}static async bulkAdd(t){await(await U()).transactions.bulkDocs(t.map(i=>({...i,id:Pn()})))}static async forMerchant(t){return(await(await U()).transactions.all()).filter(s=>s.merchantId===t).sort((s,r)=>r.date.localeCompare(s.date))}static async forAccount(t){return(await(await U()).transactions.all()).filter(s=>s.accountId===t).sort((s,r)=>r.date.localeCompare(s.date))}static async deleteAll(){const t=await U(),n=await t.transactions.all();return await Promise.all(n.map(i=>t.transactions.remove(i.id))),n.length}static async deleteForAccount(t){const n=await U(),s=(await n.transactions.all()).filter(r=>r.accountId===t);return await Promise.all(s.map(r=>n.transactions.remove(r.id))),s.length}}const GL=["chequing","savings","credit_card","investment"],cD={chequing:"Chequing",savings:"Savings",credit_card:"Credit Card",investment:"Investment"};function lD(e){return cD[e]}function Or(e,t){let n;return()=>{clearTimeout(n),n=setTimeout(e,t)}}const Fn=mt`
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
`;var hD=Object.defineProperty,uD=Object.getOwnPropertyDescriptor,R0=e=>{throw TypeError(e)},Fs=(e,t,n,i)=>{for(var s=i>1?void 0:i?uD(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&hD(t,n,s),s},dD=(e,t,n)=>t.has(e)||R0("Cannot "+n),fD=(e,t,n)=>t.has(e)?R0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),hn=(e,t,n)=>(dD(e,t,"access private method"),n),Be,_r,L0,N0,F0,B0,hu;let ii=class extends gt{constructor(){super(...arguments),fD(this,Be),this.totalItems=0,this.defaultPageSize=10,this.storageKey="",this.filterable=!1,this._currentPage=1,this._pageSize=0,this._filterDebounce=null}connectedCallback(){if(super.connectedCallback(),this.storageKey)try{const e=localStorage.getItem(`budgee:pageSize:${this.storageKey}`);e&&(this._pageSize=Number(e))}catch{}}get _effectivePageSize(){return this._pageSize||this.defaultPageSize}get _totalPages(){return Math.max(1,Math.ceil(this.totalItems/this._effectivePageSize))}firstUpdated(){hn(this,Be,_r).call(this)}willUpdate(e){e.has("totalItems")&&(this._currentPage=1)}reset(){this._currentPage=1,hn(this,Be,_r).call(this)}render(){return k`
      ${hn(this,Be,hu).call(this)}
      <slot></slot>
      ${hn(this,Be,hu).call(this)}
    `}};Be=new WeakSet;_r=function(){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:this._currentPage,pageSize:this._effectivePageSize},bubbles:!0,composed:!0}))};L0=function(e){if(this._pageSize=Number(e.target.value),this._currentPage=1,this.storageKey)try{localStorage.setItem(`budgee:pageSize:${this.storageKey}`,String(this._pageSize))}catch{}hn(this,Be,_r).call(this)};N0=function(){this._currentPage>1&&(this._currentPage--,hn(this,Be,_r).call(this))};F0=function(){this._currentPage<this._totalPages&&(this._currentPage++,hn(this,Be,_r).call(this))};B0=function(e){const t=e.target.value;this._filterDebounce!==null&&clearTimeout(this._filterDebounce),this._filterDebounce=setTimeout(()=>{this._filterDebounce=null,this._currentPage=1,this.dispatchEvent(new CustomEvent("filter-change",{detail:{filter:t},bubbles:!0,composed:!0}))},200)};hu=function(){const e=this._effectivePageSize,t=(this._currentPage-1)*e+1,n=Math.min(this._currentPage*e,this.totalItems);return k`
      <div class="pagination-bar">
        <div class="pagination-controls">
          ${this.filterable?k`<input
                class="filter-input"
                type="text"
                placeholder="Filter..."
                @input=${hn(this,Be,B0)}
              />`:""}
          <label>
            Rows per page:
            <select @change=${hn(this,Be,L0)}>
              ${[10,25,50,100].map(i=>k`<option value=${i} ?selected=${i===e}>${i}</option>`)}
            </select>
          </label>
        </div>
        <span>Showing ${t}–${n} of ${this.totalItems}</span>
        <div class="pagination-controls">
          <button class="secondary" ?disabled=${this._currentPage<=1} @click=${hn(this,Be,N0)}>Prev</button>
          <button class="secondary" ?disabled=${this._currentPage>=this._totalPages} @click=${hn(this,Be,F0)}>Next</button>
        </div>
      </div>
    `};ii.styles=[Fn,mt`
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
    `];Fs([Q({type:Number})],ii.prototype,"totalItems",2);Fs([Q({type:Number})],ii.prototype,"defaultPageSize",2);Fs([Q()],ii.prototype,"storageKey",2);Fs([Q({type:Boolean})],ii.prototype,"filterable",2);Fs([I()],ii.prototype,"_currentPage",2);Fs([I()],ii.prototype,"_pageSize",2);ii=Fs([$t("paginated-table")],ii);const ui=mt`
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
`;var pD=Object.defineProperty,gD=Object.getOwnPropertyDescriptor,z0=e=>{throw TypeError(e)},Bs=(e,t,n,i)=>{for(var s=i>1?void 0:i?gD(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&pD(t,n,s),s},Cd=(e,t,n)=>t.has(e)||z0("Cannot "+n),mD=(e,t,n)=>(Cd(e,t,"read from private field"),n?n.call(e):t.get(e)),Mp=(e,t,n)=>t.has(e)?z0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ep=(e,t,n,i)=>(Cd(e,t,"write to private field"),t.set(e,n),n),pe=(e,t,n)=>(Cd(e,t,"access private method"),n),Yr,ee,uu,j0,W0,H0,V0,Xr,Gr,U0,q0;let si=class extends gt{constructor(){super(...arguments),Mp(this,ee),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",Mp(this,Yr,[])}connectedCallback(){super.connectedCallback(),pe(this,ee,uu).call(this);const e=Or(()=>pe(this,ee,uu).call(this),300);Promise.all([Li.subscribe(e),Se.subscribe(e)]).then(t=>{Ep(this,Yr,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of mD(this,Yr))e.unsubscribe();Ep(this,Yr,[])}render(){if(this._rows===null)return k`
        <p>Loading…</p>
      `;if(this._rows.length===0)return k`
        <p>No accounts found.</p>
      `;const e=this._rows.filter(s=>pe(this,ee,V0).call(this,s)),t=pe(this,ee,U0).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return k`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="accounts"
        ?filterable=${!0}
        @page-change=${pe(this,ee,W0)}
        @filter-change=${pe(this,ee,H0)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>pe(this,ee,Xr).call(this,"name")}>
                Name${pe(this,ee,Gr).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>pe(this,ee,Xr).call(this,"type")}>
                Type${pe(this,ee,Gr).call(this,"type")}
              </th>
              <th class="sortable" @click=${()=>pe(this,ee,Xr).call(this,"count")}>
                Transactions${pe(this,ee,Gr).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>pe(this,ee,Xr).call(this,"balance")}>
                Balance${pe(this,ee,Gr).call(this,"balance")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(s=>k`
              <tr @click=${()=>pe(this,ee,q0).call(this,s.account.id)}>
                <td>${s.account.name}</td>
                <td>${s.account.type?lD(s.account.type):""}</td>
                <td>${s.transactionCount??"…"}</td>
                <td class="col-amount ${s.balance!=null&&s.balance<0?"amount-negative":s.balance!=null?"amount-positive":""}">
                  ${s.balance!=null?s.balance.toFixed(2):"…"}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};Yr=new WeakMap;ee=new WeakSet;uu=async function(){const e=await Li.all();this._rows=e.map(t=>({account:t,transactionCount:null,balance:null})),pe(this,ee,j0).call(this)};j0=async function(){const e=await Se.all(),t=new Map,n=new Map;for(const i of e)i.accountId!=null&&(t.set(i.accountId,(t.get(i.accountId)??0)+1),n.set(i.accountId,(n.get(i.accountId)??0)+i.amount));this._rows=this._rows.map(i=>({...i,transactionCount:t.get(i.account.id)??0,balance:n.get(i.account.id)??0}))};W0=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};H0=function(e){this._filter=e.detail.filter,this._currentPage=1};V0=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.account.name.toLowerCase().includes(t)||e.account.type?.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.balance!=null&&e.balance.toFixed(2).includes(t))};Xr=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};Gr=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};U0=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,s)=>{let r=0;return t==="name"?r=i.account.name.localeCompare(s.account.name):t==="type"?r=(i.account.type??"").localeCompare(s.account.type??""):t==="count"?r=(i.transactionCount??0)-(s.transactionCount??0):t==="balance"&&(r=(i.balance??0)-(s.balance??0)),r*n})};q0=function(e){window.history.pushState({},"",`/accounts/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};si.styles=[ui,mt`
      tbody tr {
        cursor: pointer;
      }
    `];Bs([I()],si.prototype,"_rows",2);Bs([I()],si.prototype,"_currentPage",2);Bs([I()],si.prototype,"_pageSize",2);Bs([I()],si.prototype,"_filter",2);Bs([I()],si.prototype,"_sortCol",2);Bs([I()],si.prototype,"_sortDir",2);si=Bs([$t("account-list")],si);function vD(e,t,n){return(t=wD(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ri(){return ri=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)({}).hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},ri.apply(null,arguments)}function Dp(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,i)}return n}function On(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Dp(Object(n),!0).forEach(function(i){vD(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Dp(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function bD(e,t){if(e==null)return{};var n,i,s=_D(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}function _D(e,t){if(e==null)return{};var n={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.indexOf(i)!==-1)continue;n[i]=e[i]}return n}function yD(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function wD(e){var t=yD(e,"string");return typeof t=="symbol"?t:t+""}function du(e){"@babel/helpers - typeof";return du=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},du(e)}var xD="1.15.7";function Jn(e){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(e)}var di=Jn(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),uo=Jn(/Edge/i),$p=Jn(/firefox/i),wa=Jn(/safari/i)&&!Jn(/chrome/i)&&!Jn(/android/i),Md=Jn(/iP(ad|od|hone)/i),K0=Jn(/chrome/i)&&Jn(/android/i),Y0={capture:!1,passive:!1};function ct(e,t,n){e.addEventListener(t,n,!di&&Y0)}function st(e,t,n){e.removeEventListener(t,n,!di&&Y0)}function Wc(e,t){if(t){if(t[0]===">"&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch{return!1}return!1}}function X0(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function ln(e,t,n,i){if(e){n=n||document;do{if(t!=null&&(t[0]===">"?e.parentNode===n&&Wc(e,t):Wc(e,t))||i&&e===n)return e;if(e===n)break}while(e=X0(e))}return null}var Ip=/\s+/g;function Re(e,t,n){if(e&&t)if(e.classList)e.classList[n?"add":"remove"](t);else{var i=(" "+e.className+" ").replace(Ip," ").replace(" "+t+" "," ");e.className=(i+(n?" "+t:"")).replace(Ip," ")}}function q(e,t,n){var i=e&&e.style;if(i){if(n===void 0)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(n=e.currentStyle),t===void 0?n:n[t];!(t in i)&&t.indexOf("webkit")===-1&&(t="-webkit-"+t),i[t]=n+(typeof n=="string"?"":"px")}}function cr(e,t){var n="";if(typeof e=="string")n=e;else do{var i=q(e,"transform");i&&i!=="none"&&(n=i+" "+n)}while(!t&&(e=e.parentNode));var s=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return s&&new s(n)}function G0(e,t,n){if(e){var i=e.getElementsByTagName(t),s=0,r=i.length;if(n)for(;s<r;s++)n(i[s],s);return i}return[]}function Mn(){var e=document.scrollingElement;return e||document.documentElement}function Xt(e,t,n,i,s){if(!(!e.getBoundingClientRect&&e!==window)){var r,a,o,c,l,h,u;if(e!==window&&e.parentNode&&e!==Mn()?(r=e.getBoundingClientRect(),a=r.top,o=r.left,c=r.bottom,l=r.right,h=r.height,u=r.width):(a=0,o=0,c=window.innerHeight,l=window.innerWidth,h=window.innerHeight,u=window.innerWidth),(t||n)&&e!==window&&(s=s||e.parentNode,!di))do if(s&&s.getBoundingClientRect&&(q(s,"transform")!=="none"||n&&q(s,"position")!=="static")){var d=s.getBoundingClientRect();a-=d.top+parseInt(q(s,"border-top-width")),o-=d.left+parseInt(q(s,"border-left-width")),c=a+r.height,l=o+r.width;break}while(s=s.parentNode);if(i&&e!==window){var f=cr(s||e),p=f&&f.a,g=f&&f.d;f&&(a/=g,o/=p,u/=p,h/=g,c=a+h,l=o+u)}return{top:a,left:o,bottom:c,right:l,width:u,height:h}}}function Pp(e,t,n){for(var i=Si(e,!0),s=Xt(e)[t];i;){var r=Xt(i)[n],a=void 0;if(a=s>=r,!a)return i;if(i===Mn())break;i=Si(i,!1)}return!1}function yr(e,t,n,i){for(var s=0,r=0,a=e.children;r<a.length;){if(a[r].style.display!=="none"&&a[r]!==K.ghost&&(i||a[r]!==K.dragged)&&ln(a[r],n.draggable,e,!1)){if(s===t)return a[r];s++}r++}return null}function Ed(e,t){for(var n=e.lastElementChild;n&&(n===K.ghost||q(n,"display")==="none"||t&&!Wc(n,t));)n=n.previousElementSibling;return n||null}function Ze(e,t){var n=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)e.nodeName.toUpperCase()!=="TEMPLATE"&&e!==K.clone&&(!t||Wc(e,t))&&n++;return n}function Op(e){var t=0,n=0,i=Mn();if(e)do{var s=cr(e),r=s.a,a=s.d;t+=e.scrollLeft*r,n+=e.scrollTop*a}while(e!==i&&(e=e.parentNode));return[t,n]}function SD(e,t){for(var n in e)if(e.hasOwnProperty(n)){for(var i in t)if(t.hasOwnProperty(i)&&t[i]===e[n][i])return Number(n)}return-1}function Si(e,t){if(!e||!e.getBoundingClientRect)return Mn();var n=e,i=!1;do if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var s=q(n);if(n.clientWidth<n.scrollWidth&&(s.overflowX=="auto"||s.overflowX=="scroll")||n.clientHeight<n.scrollHeight&&(s.overflowY=="auto"||s.overflowY=="scroll")){if(!n.getBoundingClientRect||n===document.body)return Mn();if(i||t)return n;i=!0}}while(n=n.parentNode);return Mn()}function kD(e,t){if(e&&t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function lh(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}var xa;function Q0(e,t){return function(){if(!xa){var n=arguments,i=this;n.length===1?e.call(i,n[0]):e.apply(i,n),xa=setTimeout(function(){xa=void 0},t)}}}function CD(){clearTimeout(xa),xa=void 0}function J0(e,t,n){e.scrollLeft+=t,e.scrollTop+=n}function Z0(e){var t=window.Polymer,n=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):n?n(e).clone(!0)[0]:e.cloneNode(!0)}function tb(e,t,n){var i={};return Array.from(e.children).forEach(function(s){var r,a,o,c;if(!(!ln(s,t.draggable,e,!1)||s.animated||s===n)){var l=Xt(s);i.left=Math.min((r=i.left)!==null&&r!==void 0?r:1/0,l.left),i.top=Math.min((a=i.top)!==null&&a!==void 0?a:1/0,l.top),i.right=Math.max((o=i.right)!==null&&o!==void 0?o:-1/0,l.right),i.bottom=Math.max((c=i.bottom)!==null&&c!==void 0?c:-1/0,l.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var Pe="Sortable"+new Date().getTime();function MD(){var e=[],t;return{captureAnimationState:function(){if(e=[],!!this.options.animation){var i=[].slice.call(this.el.children);i.forEach(function(s){if(!(q(s,"display")==="none"||s===K.ghost)){e.push({target:s,rect:Xt(s)});var r=On({},e[e.length-1].rect);if(s.thisAnimationDuration){var a=cr(s,!0);a&&(r.top-=a.f,r.left-=a.e)}s.fromRect=r}})}},addAnimationState:function(i){e.push(i)},removeAnimationState:function(i){e.splice(SD(e,{target:i}),1)},animateAll:function(i){var s=this;if(!this.options.animation){clearTimeout(t),typeof i=="function"&&i();return}var r=!1,a=0;e.forEach(function(o){var c=0,l=o.target,h=l.fromRect,u=Xt(l),d=l.prevFromRect,f=l.prevToRect,p=o.rect,g=cr(l,!0);g&&(u.top-=g.f,u.left-=g.e),l.toRect=u,l.thisAnimationDuration&&lh(d,u)&&!lh(h,u)&&(p.top-u.top)/(p.left-u.left)===(h.top-u.top)/(h.left-u.left)&&(c=DD(p,d,f,s.options)),lh(u,h)||(l.prevFromRect=h,l.prevToRect=u,c||(c=s.options.animation),s.animate(l,p,u,c)),c&&(r=!0,a=Math.max(a,c),clearTimeout(l.animationResetTimer),l.animationResetTimer=setTimeout(function(){l.animationTime=0,l.prevFromRect=null,l.fromRect=null,l.prevToRect=null,l.thisAnimationDuration=null},c),l.thisAnimationDuration=c)}),clearTimeout(t),r?t=setTimeout(function(){typeof i=="function"&&i()},a):typeof i=="function"&&i(),e=[]},animate:function(i,s,r,a){if(a){q(i,"transition",""),q(i,"transform","");var o=cr(this.el),c=o&&o.a,l=o&&o.d,h=(s.left-r.left)/(c||1),u=(s.top-r.top)/(l||1);i.animatingX=!!h,i.animatingY=!!u,q(i,"transform","translate3d("+h+"px,"+u+"px,0)"),this.forRepaintDummy=ED(i),q(i,"transition","transform "+a+"ms"+(this.options.easing?" "+this.options.easing:"")),q(i,"transform","translate3d(0,0,0)"),typeof i.animated=="number"&&clearTimeout(i.animated),i.animated=setTimeout(function(){q(i,"transition",""),q(i,"transform",""),i.animated=!1,i.animatingX=!1,i.animatingY=!1},a)}}}}function ED(e){return e.offsetWidth}function DD(e,t,n,i){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-n.top,2)+Math.pow(t.left-n.left,2))*i.animation}var qs=[],hh={initializeByDefault:!0},fo={mount:function(t){for(var n in hh)hh.hasOwnProperty(n)&&!(n in t)&&(t[n]=hh[n]);qs.forEach(function(i){if(i.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")}),qs.push(t)},pluginEvent:function(t,n,i){var s=this;this.eventCanceled=!1,i.cancel=function(){s.eventCanceled=!0};var r=t+"Global";qs.forEach(function(a){n[a.pluginName]&&(n[a.pluginName][r]&&n[a.pluginName][r](On({sortable:n},i)),n.options[a.pluginName]&&n[a.pluginName][t]&&n[a.pluginName][t](On({sortable:n},i)))})},initializePlugins:function(t,n,i,s){qs.forEach(function(o){var c=o.pluginName;if(!(!t.options[c]&&!o.initializeByDefault)){var l=new o(t,n,t.options);l.sortable=t,l.options=t.options,t[c]=l,ri(i,l.defaults)}});for(var r in t.options)if(t.options.hasOwnProperty(r)){var a=this.modifyOption(t,r,t.options[r]);typeof a<"u"&&(t.options[r]=a)}},getEventProperties:function(t,n){var i={};return qs.forEach(function(s){typeof s.eventProperties=="function"&&ri(i,s.eventProperties.call(n[s.pluginName],t))}),i},modifyOption:function(t,n,i){var s;return qs.forEach(function(r){t[r.pluginName]&&r.optionListeners&&typeof r.optionListeners[n]=="function"&&(s=r.optionListeners[n].call(t[r.pluginName],i))}),s}};function $D(e){var t=e.sortable,n=e.rootEl,i=e.name,s=e.targetEl,r=e.cloneEl,a=e.toEl,o=e.fromEl,c=e.oldIndex,l=e.newIndex,h=e.oldDraggableIndex,u=e.newDraggableIndex,d=e.originalEvent,f=e.putSortable,p=e.extraEventProperties;if(t=t||n&&n[Pe],!!t){var g,m=t.options,b="on"+i.charAt(0).toUpperCase()+i.substr(1);window.CustomEvent&&!di&&!uo?g=new CustomEvent(i,{bubbles:!0,cancelable:!0}):(g=document.createEvent("Event"),g.initEvent(i,!0,!0)),g.to=a||n,g.from=o||n,g.item=s||n,g.clone=r,g.oldIndex=c,g.newIndex=l,g.oldDraggableIndex=h,g.newDraggableIndex=u,g.originalEvent=d,g.pullMode=f?f.lastPutMode:void 0;var _=On(On({},p),fo.getEventProperties(i,t));for(var w in _)g[w]=_[w];n&&n.dispatchEvent(g),m[b]&&m[b].call(t,g)}}var ID=["evt"],De=function(t,n){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=i.evt,r=bD(i,ID);fo.pluginEvent.bind(K)(t,n,On({dragEl:T,parentEl:zt,ghostEl:tt,rootEl:Ot,nextEl:is,lastDownEl:tc,cloneEl:Nt,cloneHidden:yi,dragStarted:Qr,putSortable:ae,activeSortable:K.active,originalEvent:s,oldIndex:sr,oldDraggableIndex:Sa,newIndex:Le,newDraggableIndex:mi,hideGhostForTarget:sb,unhideGhostForTarget:rb,cloneNowHidden:function(){yi=!0},cloneNowShown:function(){yi=!1},dispatchSortableEvent:function(o){we({sortable:n,name:o,originalEvent:s})}},r))};function we(e){$D(On({putSortable:ae,cloneEl:Nt,targetEl:T,rootEl:Ot,oldIndex:sr,oldDraggableIndex:Sa,newIndex:Le,newDraggableIndex:mi},e))}var T,zt,tt,Ot,is,tc,Nt,yi,sr,Le,Sa,mi,Eo,ae,Zs=!1,Hc=!1,Vc=[],Xi,cn,uh,dh,Tp,Ap,Qr,Ks,ka,Ca=!1,Do=!1,ec,fe,fh=[],fu=!1,Uc=[],xl=typeof document<"u",$o=Md,Rp=uo||di?"cssFloat":"float",PD=xl&&!K0&&!Md&&"draggable"in document.createElement("div"),eb=(function(){if(xl){if(di)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto",e.style.pointerEvents==="auto"}})(),nb=function(t,n){var i=q(t),s=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),r=yr(t,0,n),a=yr(t,1,n),o=r&&q(r),c=a&&q(a),l=o&&parseInt(o.marginLeft)+parseInt(o.marginRight)+Xt(r).width,h=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+Xt(a).width;if(i.display==="flex")return i.flexDirection==="column"||i.flexDirection==="column-reverse"?"vertical":"horizontal";if(i.display==="grid")return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(r&&o.float&&o.float!=="none"){var u=o.float==="left"?"left":"right";return a&&(c.clear==="both"||c.clear===u)?"vertical":"horizontal"}return r&&(o.display==="block"||o.display==="flex"||o.display==="table"||o.display==="grid"||l>=s&&i[Rp]==="none"||a&&i[Rp]==="none"&&l+h>s)?"vertical":"horizontal"},OD=function(t,n,i){var s=i?t.left:t.top,r=i?t.right:t.bottom,a=i?t.width:t.height,o=i?n.left:n.top,c=i?n.right:n.bottom,l=i?n.width:n.height;return s===o||r===c||s+a/2===o+l/2},TD=function(t,n){var i;return Vc.some(function(s){var r=s[Pe].options.emptyInsertThreshold;if(!(!r||Ed(s))){var a=Xt(s),o=t>=a.left-r&&t<=a.right+r,c=n>=a.top-r&&n<=a.bottom+r;if(o&&c)return i=s}}),i},ib=function(t){function n(r,a){return function(o,c,l,h){var u=o.options.group.name&&c.options.group.name&&o.options.group.name===c.options.group.name;if(r==null&&(a||u))return!0;if(r==null||r===!1)return!1;if(a&&r==="clone")return r;if(typeof r=="function")return n(r(o,c,l,h),a)(o,c,l,h);var d=(a?o:c).options.group.name;return r===!0||typeof r=="string"&&r===d||r.join&&r.indexOf(d)>-1}}var i={},s=t.group;(!s||du(s)!="object")&&(s={name:s}),i.name=s.name,i.checkPull=n(s.pull,!0),i.checkPut=n(s.put),i.revertClone=s.revertClone,t.group=i},sb=function(){!eb&&tt&&q(tt,"display","none")},rb=function(){!eb&&tt&&q(tt,"display","")};xl&&!K0&&document.addEventListener("click",function(e){if(Hc)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),Hc=!1,!1},!0);var Gi=function(t){if(T){t=t.touches?t.touches[0]:t;var n=TD(t.clientX,t.clientY);if(n){var i={};for(var s in t)t.hasOwnProperty(s)&&(i[s]=t[s]);i.target=i.rootEl=n,i.preventDefault=void 0,i.stopPropagation=void 0,n[Pe]._onDragOver(i)}}},AD=function(t){T&&T.parentNode[Pe]._isOutsideThisEl(t.target)};function K(e,t){if(!(e&&e.nodeType&&e.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=ri({},t),e[Pe]=this;var n={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return nb(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(a,o){a.setData("Text",o.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:K.supportPointer!==!1&&"PointerEvent"in window&&(!wa||Md),emptyInsertThreshold:5};fo.initializePlugins(this,e,n);for(var i in n)!(i in t)&&(t[i]=n[i]);ib(t);for(var s in this)s.charAt(0)==="_"&&typeof this[s]=="function"&&(this[s]=this[s].bind(this));this.nativeDraggable=t.forceFallback?!1:PD,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?ct(e,"pointerdown",this._onTapStart):(ct(e,"mousedown",this._onTapStart),ct(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(ct(e,"dragover",this),ct(e,"dragenter",this)),Vc.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),ri(this,MD())}K.prototype={constructor:K,_isOutsideThisEl:function(t){!this.el.contains(t)&&t!==this.el&&(Ks=null)},_getDirection:function(t,n){return typeof this.options.direction=="function"?this.options.direction.call(this,t,n,T):this.options.direction},_onTapStart:function(t){if(t.cancelable){var n=this,i=this.el,s=this.options,r=s.preventOnFilter,a=t.type,o=t.touches&&t.touches[0]||t.pointerType&&t.pointerType==="touch"&&t,c=(o||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||c,h=s.filter;if(WD(i),!T&&!(/mousedown|pointerdown/.test(a)&&t.button!==0||s.disabled)&&!l.isContentEditable&&!(!this.nativeDraggable&&wa&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=ln(c,s.draggable,i,!1),!(c&&c.animated)&&tc!==c)){if(sr=Ze(c),Sa=Ze(c,s.draggable),typeof h=="function"){if(h.call(this,t,c,this)){we({sortable:n,rootEl:l,name:"filter",targetEl:c,toEl:i,fromEl:i}),De("filter",n,{evt:t}),r&&t.preventDefault();return}}else if(h&&(h=h.split(",").some(function(u){if(u=ln(l,u.trim(),i,!1),u)return we({sortable:n,rootEl:u,name:"filter",targetEl:c,fromEl:i,toEl:i}),De("filter",n,{evt:t}),!0}),h)){r&&t.preventDefault();return}s.handle&&!ln(l,s.handle,i,!1)||this._prepareDragStart(t,o,c)}}},_prepareDragStart:function(t,n,i){var s=this,r=s.el,a=s.options,o=r.ownerDocument,c;if(i&&!T&&i.parentNode===r){var l=Xt(i);if(Ot=r,T=i,zt=T.parentNode,is=T.nextSibling,tc=i,Eo=a.group,K.dragged=T,Xi={target:T,clientX:(n||t).clientX,clientY:(n||t).clientY},Tp=Xi.clientX-l.left,Ap=Xi.clientY-l.top,this._lastX=(n||t).clientX,this._lastY=(n||t).clientY,T.style["will-change"]="all",c=function(){if(De("delayEnded",s,{evt:t}),K.eventCanceled){s._onDrop();return}s._disableDelayedDragEvents(),!$p&&s.nativeDraggable&&(T.draggable=!0),s._triggerDragStart(t,n),we({sortable:s,name:"choose",originalEvent:t}),Re(T,a.chosenClass,!0)},a.ignore.split(",").forEach(function(h){G0(T,h.trim(),ph)}),ct(o,"dragover",Gi),ct(o,"mousemove",Gi),ct(o,"touchmove",Gi),a.supportPointer?(ct(o,"pointerup",s._onDrop),!this.nativeDraggable&&ct(o,"pointercancel",s._onDrop)):(ct(o,"mouseup",s._onDrop),ct(o,"touchend",s._onDrop),ct(o,"touchcancel",s._onDrop)),$p&&this.nativeDraggable&&(this.options.touchStartThreshold=4,T.draggable=!0),De("delayStart",this,{evt:t}),a.delay&&(!a.delayOnTouchOnly||n)&&(!this.nativeDraggable||!(uo||di))){if(K.eventCanceled){this._onDrop();return}a.supportPointer?(ct(o,"pointerup",s._disableDelayedDrag),ct(o,"pointercancel",s._disableDelayedDrag)):(ct(o,"mouseup",s._disableDelayedDrag),ct(o,"touchend",s._disableDelayedDrag),ct(o,"touchcancel",s._disableDelayedDrag)),ct(o,"mousemove",s._delayedDragTouchMoveHandler),ct(o,"touchmove",s._delayedDragTouchMoveHandler),a.supportPointer&&ct(o,"pointermove",s._delayedDragTouchMoveHandler),s._dragStartTimer=setTimeout(c,a.delay)}else c()}},_delayedDragTouchMoveHandler:function(t){var n=t.touches?t.touches[0]:t;Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){T&&ph(T),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;st(t,"mouseup",this._disableDelayedDrag),st(t,"touchend",this._disableDelayedDrag),st(t,"touchcancel",this._disableDelayedDrag),st(t,"pointerup",this._disableDelayedDrag),st(t,"pointercancel",this._disableDelayedDrag),st(t,"mousemove",this._delayedDragTouchMoveHandler),st(t,"touchmove",this._delayedDragTouchMoveHandler),st(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,n){n=n||t.pointerType=="touch"&&t,!this.nativeDraggable||n?this.options.supportPointer?ct(document,"pointermove",this._onTouchMove):n?ct(document,"touchmove",this._onTouchMove):ct(document,"mousemove",this._onTouchMove):(ct(T,"dragend",this),ct(Ot,"dragstart",this._onDragStart));try{document.selection?nc(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(t,n){if(Zs=!1,Ot&&T){De("dragStarted",this,{evt:n}),this.nativeDraggable&&ct(document,"dragover",AD);var i=this.options;!t&&Re(T,i.dragClass,!1),Re(T,i.ghostClass,!0),K.active=this,t&&this._appendGhost(),we({sortable:this,name:"start",originalEvent:n})}else this._nulling()},_emulateDragOver:function(){if(cn){this._lastX=cn.clientX,this._lastY=cn.clientY,sb();for(var t=document.elementFromPoint(cn.clientX,cn.clientY),n=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(cn.clientX,cn.clientY),t!==n);)n=t;if(T.parentNode[Pe]._isOutsideThisEl(t),n)do{if(n[Pe]){var i=void 0;if(i=n[Pe]._onDragOver({clientX:cn.clientX,clientY:cn.clientY,target:t,rootEl:n}),i&&!this.options.dragoverBubble)break}t=n}while(n=X0(n));rb()}},_onTouchMove:function(t){if(Xi){var n=this.options,i=n.fallbackTolerance,s=n.fallbackOffset,r=t.touches?t.touches[0]:t,a=tt&&cr(tt,!0),o=tt&&a&&a.a,c=tt&&a&&a.d,l=$o&&fe&&Op(fe),h=(r.clientX-Xi.clientX+s.x)/(o||1)+(l?l[0]-fh[0]:0)/(o||1),u=(r.clientY-Xi.clientY+s.y)/(c||1)+(l?l[1]-fh[1]:0)/(c||1);if(!K.active&&!Zs){if(i&&Math.max(Math.abs(r.clientX-this._lastX),Math.abs(r.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(tt){a?(a.e+=h-(uh||0),a.f+=u-(dh||0)):a={a:1,b:0,c:0,d:1,e:h,f:u};var d="matrix(".concat(a.a,",").concat(a.b,",").concat(a.c,",").concat(a.d,",").concat(a.e,",").concat(a.f,")");q(tt,"webkitTransform",d),q(tt,"mozTransform",d),q(tt,"msTransform",d),q(tt,"transform",d),uh=h,dh=u,cn=r}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!tt){var t=this.options.fallbackOnBody?document.body:Ot,n=Xt(T,!0,$o,!0,t),i=this.options;if($o){for(fe=t;q(fe,"position")==="static"&&q(fe,"transform")==="none"&&fe!==document;)fe=fe.parentNode;fe!==document.body&&fe!==document.documentElement?(fe===document&&(fe=Mn()),n.top+=fe.scrollTop,n.left+=fe.scrollLeft):fe=Mn(),fh=Op(fe)}tt=T.cloneNode(!0),Re(tt,i.ghostClass,!1),Re(tt,i.fallbackClass,!0),Re(tt,i.dragClass,!0),q(tt,"transition",""),q(tt,"transform",""),q(tt,"box-sizing","border-box"),q(tt,"margin",0),q(tt,"top",n.top),q(tt,"left",n.left),q(tt,"width",n.width),q(tt,"height",n.height),q(tt,"opacity","0.8"),q(tt,"position",$o?"absolute":"fixed"),q(tt,"zIndex","100000"),q(tt,"pointerEvents","none"),K.ghost=tt,t.appendChild(tt),q(tt,"transform-origin",Tp/parseInt(tt.style.width)*100+"% "+Ap/parseInt(tt.style.height)*100+"%")}},_onDragStart:function(t,n){var i=this,s=t.dataTransfer,r=i.options;if(De("dragStart",this,{evt:t}),K.eventCanceled){this._onDrop();return}De("setupClone",this),K.eventCanceled||(Nt=Z0(T),Nt.removeAttribute("id"),Nt.draggable=!1,Nt.style["will-change"]="",this._hideClone(),Re(Nt,this.options.chosenClass,!1),K.clone=Nt),i.cloneId=nc(function(){De("clone",i),!K.eventCanceled&&(i.options.removeCloneOnHide||Ot.insertBefore(Nt,T),i._hideClone(),we({sortable:i,name:"clone"}))}),!n&&Re(T,r.dragClass,!0),n?(Hc=!0,i._loopId=setInterval(i._emulateDragOver,50)):(st(document,"mouseup",i._onDrop),st(document,"touchend",i._onDrop),st(document,"touchcancel",i._onDrop),s&&(s.effectAllowed="move",r.setData&&r.setData.call(i,s,T)),ct(document,"drop",i),q(T,"transform","translateZ(0)")),Zs=!0,i._dragStartId=nc(i._dragStarted.bind(i,n,t)),ct(document,"selectstart",i),Qr=!0,window.getSelection().removeAllRanges(),wa&&q(document.body,"user-select","none")},_onDragOver:function(t){var n=this.el,i=t.target,s,r,a,o=this.options,c=o.group,l=K.active,h=Eo===c,u=o.sort,d=ae||l,f,p=this,g=!1;if(fu)return;function m(H,A){De(H,p,On({evt:t,isOwner:h,axis:f?"vertical":"horizontal",revert:a,dragRect:s,targetRect:r,canSort:u,fromSortable:d,target:i,completed:_,onMove:function(L,j){return Io(Ot,n,T,s,L,Xt(L),t,j)},changed:w},A))}function b(){m("dragOverAnimationCapture"),p.captureAnimationState(),p!==d&&d.captureAnimationState()}function _(H){return m("dragOverCompleted",{insertion:H}),H&&(h?l._hideClone():l._showClone(p),p!==d&&(Re(T,ae?ae.options.ghostClass:l.options.ghostClass,!1),Re(T,o.ghostClass,!0)),ae!==p&&p!==K.active?ae=p:p===K.active&&ae&&(ae=null),d===p&&(p._ignoreWhileAnimating=i),p.animateAll(function(){m("dragOverAnimationComplete"),p._ignoreWhileAnimating=null}),p!==d&&(d.animateAll(),d._ignoreWhileAnimating=null)),(i===T&&!T.animated||i===n&&!i.animated)&&(Ks=null),!o.dragoverBubble&&!t.rootEl&&i!==document&&(T.parentNode[Pe]._isOutsideThisEl(t.target),!H&&Gi(t)),!o.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),g=!0}function w(){Le=Ze(T),mi=Ze(T,o.draggable),we({sortable:p,name:"change",toEl:n,newIndex:Le,newDraggableIndex:mi,originalEvent:t})}if(t.preventDefault!==void 0&&t.cancelable&&t.preventDefault(),i=ln(i,o.draggable,n,!0),m("dragOver"),K.eventCanceled)return g;if(T.contains(t.target)||i.animated&&i.animatingX&&i.animatingY||p._ignoreWhileAnimating===i)return _(!1);if(Hc=!1,l&&!o.disabled&&(h?u||(a=zt!==Ot):ae===this||(this.lastPutMode=Eo.checkPull(this,l,T,t))&&c.checkPut(this,l,T,t))){if(f=this._getDirection(t,i)==="vertical",s=Xt(T),m("dragOverValid"),K.eventCanceled)return g;if(a)return zt=Ot,b(),this._hideClone(),m("revert"),K.eventCanceled||(is?Ot.insertBefore(T,is):Ot.appendChild(T)),_(!0);var C=Ed(n,o.draggable);if(!C||FD(t,f,this)&&!C.animated){if(C===T)return _(!1);if(C&&n===t.target&&(i=C),i&&(r=Xt(i)),Io(Ot,n,T,s,i,r,t,!!i)!==!1)return b(),C&&C.nextSibling?n.insertBefore(T,C.nextSibling):n.appendChild(T),zt=n,w(),_(!0)}else if(C&&ND(t,f,this)){var x=yr(n,0,o,!0);if(x===T)return _(!1);if(i=x,r=Xt(i),Io(Ot,n,T,s,i,r,t,!1)!==!1)return b(),n.insertBefore(T,x),zt=n,w(),_(!0)}else if(i.parentNode===n){r=Xt(i);var E=0,M,v=T.parentNode!==n,y=!OD(T.animated&&T.toRect||s,i.animated&&i.toRect||r,f),S=f?"top":"left",$=Pp(i,"top","top")||Pp(T,"top","top"),D=$?$.scrollTop:void 0;Ks!==i&&(M=r[S],Ca=!1,Do=!y&&o.invertSwap||v),E=BD(t,i,r,f,y?1:o.swapThreshold,o.invertedSwapThreshold==null?o.swapThreshold:o.invertedSwapThreshold,Do,Ks===i);var O;if(E!==0){var B=Ze(T);do B-=E,O=zt.children[B];while(O&&(q(O,"display")==="none"||O===tt))}if(E===0||O===i)return _(!1);Ks=i,ka=E;var N=i.nextElementSibling,W=!1;W=E===1;var R=Io(Ot,n,T,s,i,r,t,W);if(R!==!1)return(R===1||R===-1)&&(W=R===1),fu=!0,setTimeout(LD,30),b(),W&&!N?n.appendChild(T):i.parentNode.insertBefore(T,W?N:i),$&&J0($,0,D-$.scrollTop),zt=T.parentNode,M!==void 0&&!Do&&(ec=Math.abs(M-Xt(i)[S])),w(),_(!0)}if(n.contains(T))return _(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){st(document,"mousemove",this._onTouchMove),st(document,"touchmove",this._onTouchMove),st(document,"pointermove",this._onTouchMove),st(document,"dragover",Gi),st(document,"mousemove",Gi),st(document,"touchmove",Gi)},_offUpEvents:function(){var t=this.el.ownerDocument;st(t,"mouseup",this._onDrop),st(t,"touchend",this._onDrop),st(t,"pointerup",this._onDrop),st(t,"pointercancel",this._onDrop),st(t,"touchcancel",this._onDrop),st(document,"selectstart",this)},_onDrop:function(t){var n=this.el,i=this.options;if(Le=Ze(T),mi=Ze(T,i.draggable),De("drop",this,{evt:t}),zt=T&&T.parentNode,Le=Ze(T),mi=Ze(T,i.draggable),K.eventCanceled){this._nulling();return}Zs=!1,Do=!1,Ca=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),pu(this.cloneId),pu(this._dragStartId),this.nativeDraggable&&(st(document,"drop",this),st(n,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),wa&&q(document.body,"user-select",""),q(T,"transform",""),t&&(Qr&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),tt&&tt.parentNode&&tt.parentNode.removeChild(tt),(Ot===zt||ae&&ae.lastPutMode!=="clone")&&Nt&&Nt.parentNode&&Nt.parentNode.removeChild(Nt),T&&(this.nativeDraggable&&st(T,"dragend",this),ph(T),T.style["will-change"]="",Qr&&!Zs&&Re(T,ae?ae.options.ghostClass:this.options.ghostClass,!1),Re(T,this.options.chosenClass,!1),we({sortable:this,name:"unchoose",toEl:zt,newIndex:null,newDraggableIndex:null,originalEvent:t}),Ot!==zt?(Le>=0&&(we({rootEl:zt,name:"add",toEl:zt,fromEl:Ot,originalEvent:t}),we({sortable:this,name:"remove",toEl:zt,originalEvent:t}),we({rootEl:zt,name:"sort",toEl:zt,fromEl:Ot,originalEvent:t}),we({sortable:this,name:"sort",toEl:zt,originalEvent:t})),ae&&ae.save()):Le!==sr&&Le>=0&&(we({sortable:this,name:"update",toEl:zt,originalEvent:t}),we({sortable:this,name:"sort",toEl:zt,originalEvent:t})),K.active&&((Le==null||Le===-1)&&(Le=sr,mi=Sa),we({sortable:this,name:"end",toEl:zt,originalEvent:t}),this.save()))),this._nulling()},_nulling:function(){De("nulling",this),Ot=T=zt=tt=is=Nt=tc=yi=Xi=cn=Qr=Le=mi=sr=Sa=Ks=ka=ae=Eo=K.dragged=K.ghost=K.clone=K.active=null;var t=this.el;Uc.forEach(function(n){t.contains(n)&&(n.checked=!0)}),Uc.length=uh=dh=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":T&&(this._onDragOver(t),RD(t));break;case"selectstart":t.preventDefault();break}},toArray:function(){for(var t=[],n,i=this.el.children,s=0,r=i.length,a=this.options;s<r;s++)n=i[s],ln(n,a.draggable,this.el,!1)&&t.push(n.getAttribute(a.dataIdAttr)||jD(n));return t},sort:function(t,n){var i={},s=this.el;this.toArray().forEach(function(r,a){var o=s.children[a];ln(o,this.options.draggable,s,!1)&&(i[r]=o)},this),n&&this.captureAnimationState(),t.forEach(function(r){i[r]&&(s.removeChild(i[r]),s.appendChild(i[r]))}),n&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,n){return ln(t,n||this.options.draggable,this.el,!1)},option:function(t,n){var i=this.options;if(n===void 0)return i[t];var s=fo.modifyOption(this,t,n);typeof s<"u"?i[t]=s:i[t]=n,t==="group"&&ib(i)},destroy:function(){De("destroy",this);var t=this.el;t[Pe]=null,st(t,"mousedown",this._onTapStart),st(t,"touchstart",this._onTapStart),st(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(st(t,"dragover",this),st(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(n){n.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Vc.splice(Vc.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!yi){if(De("hideClone",this),K.eventCanceled)return;q(Nt,"display","none"),this.options.removeCloneOnHide&&Nt.parentNode&&Nt.parentNode.removeChild(Nt),yi=!0}},_showClone:function(t){if(t.lastPutMode!=="clone"){this._hideClone();return}if(yi){if(De("showClone",this),K.eventCanceled)return;T.parentNode==Ot&&!this.options.group.revertClone?Ot.insertBefore(Nt,T):is?Ot.insertBefore(Nt,is):Ot.appendChild(Nt),this.options.group.revertClone&&this.animate(T,Nt),q(Nt,"display",""),yi=!1}}};function RD(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}function Io(e,t,n,i,s,r,a,o){var c,l=e[Pe],h=l.options.onMove,u;return window.CustomEvent&&!di&&!uo?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=t,c.from=e,c.dragged=n,c.draggedRect=i,c.related=s||t,c.relatedRect=r||Xt(t),c.willInsertAfter=o,c.originalEvent=a,e.dispatchEvent(c),h&&(u=h.call(l,c,a)),u}function ph(e){e.draggable=!1}function LD(){fu=!1}function ND(e,t,n){var i=Xt(yr(n.el,0,n.options,!0)),s=tb(n.el,n.options,tt),r=10;return t?e.clientX<s.left-r||e.clientY<i.top&&e.clientX<i.right:e.clientY<s.top-r||e.clientY<i.bottom&&e.clientX<i.left}function FD(e,t,n){var i=Xt(Ed(n.el,n.options.draggable)),s=tb(n.el,n.options,tt),r=10;return t?e.clientX>s.right+r||e.clientY>i.bottom&&e.clientX>i.left:e.clientY>s.bottom+r||e.clientX>i.right&&e.clientY>i.top}function BD(e,t,n,i,s,r,a,o){var c=i?e.clientY:e.clientX,l=i?n.height:n.width,h=i?n.top:n.left,u=i?n.bottom:n.right,d=!1;if(!a){if(o&&ec<l*s){if(!Ca&&(ka===1?c>h+l*r/2:c<u-l*r/2)&&(Ca=!0),Ca)d=!0;else if(ka===1?c<h+ec:c>u-ec)return-ka}else if(c>h+l*(1-s)/2&&c<u-l*(1-s)/2)return zD(t)}return d=d||a,d&&(c<h+l*r/2||c>u-l*r/2)?c>h+l/2?1:-1:0}function zD(e){return Ze(T)<Ze(e)?1:-1}function jD(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,n=t.length,i=0;n--;)i+=t.charCodeAt(n);return i.toString(36)}function WD(e){Uc.length=0;for(var t=e.getElementsByTagName("input"),n=t.length;n--;){var i=t[n];i.checked&&Uc.push(i)}}function nc(e){return setTimeout(e,0)}function pu(e){return clearTimeout(e)}xl&&ct(document,"touchmove",function(e){(K.active||Zs)&&e.cancelable&&e.preventDefault()});K.utils={on:ct,off:st,css:q,find:G0,is:function(t,n){return!!ln(t,n,t,!1)},extend:kD,throttle:Q0,closest:ln,toggleClass:Re,clone:Z0,index:Ze,nextTick:nc,cancelNextTick:pu,detectDirection:nb,getChild:yr,expando:Pe};K.get=function(e){return e[Pe]};K.mount=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t[0].constructor===Array&&(t=t[0]),t.forEach(function(i){if(!i.prototype||!i.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));i.utils&&(K.utils=On(On({},K.utils),i.utils)),fo.mount(i)})};K.create=function(e,t){return new K(e,t)};K.version=xD;var qt=[],Jr,gu,mu=!1,gh,mh,qc,Zr;function HD(){function e(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var t in this)t.charAt(0)==="_"&&typeof this[t]=="function"&&(this[t]=this[t].bind(this))}return e.prototype={dragStarted:function(n){var i=n.originalEvent;this.sortable.nativeDraggable?ct(document,"dragover",this._handleAutoScroll):this.options.supportPointer?ct(document,"pointermove",this._handleFallbackAutoScroll):i.touches?ct(document,"touchmove",this._handleFallbackAutoScroll):ct(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(n){var i=n.originalEvent;!this.options.dragOverBubble&&!i.rootEl&&this._handleAutoScroll(i)},drop:function(){this.sortable.nativeDraggable?st(document,"dragover",this._handleAutoScroll):(st(document,"pointermove",this._handleFallbackAutoScroll),st(document,"touchmove",this._handleFallbackAutoScroll),st(document,"mousemove",this._handleFallbackAutoScroll)),Lp(),ic(),CD()},nulling:function(){qc=gu=Jr=mu=Zr=gh=mh=null,qt.length=0},_handleFallbackAutoScroll:function(n){this._handleAutoScroll(n,!0)},_handleAutoScroll:function(n,i){var s=this,r=(n.touches?n.touches[0]:n).clientX,a=(n.touches?n.touches[0]:n).clientY,o=document.elementFromPoint(r,a);if(qc=n,i||this.options.forceAutoScrollFallback||uo||di||wa){vh(n,this.options,o,i);var c=Si(o,!0);mu&&(!Zr||r!==gh||a!==mh)&&(Zr&&Lp(),Zr=setInterval(function(){var l=Si(document.elementFromPoint(r,a),!0);l!==c&&(c=l,ic()),vh(n,s.options,l,i)},10),gh=r,mh=a)}else{if(!this.options.bubbleScroll||Si(o,!0)===Mn()){ic();return}vh(n,this.options,Si(o,!1),!1)}}},ri(e,{pluginName:"scroll",initializeByDefault:!0})}function ic(){qt.forEach(function(e){clearInterval(e.pid)}),qt=[]}function Lp(){clearInterval(Zr)}var vh=Q0(function(e,t,n,i){if(t.scroll){var s=(e.touches?e.touches[0]:e).clientX,r=(e.touches?e.touches[0]:e).clientY,a=t.scrollSensitivity,o=t.scrollSpeed,c=Mn(),l=!1,h;gu!==n&&(gu=n,ic(),Jr=t.scroll,h=t.scrollFn,Jr===!0&&(Jr=Si(n,!0)));var u=0,d=Jr;do{var f=d,p=Xt(f),g=p.top,m=p.bottom,b=p.left,_=p.right,w=p.width,C=p.height,x=void 0,E=void 0,M=f.scrollWidth,v=f.scrollHeight,y=q(f),S=f.scrollLeft,$=f.scrollTop;f===c?(x=w<M&&(y.overflowX==="auto"||y.overflowX==="scroll"||y.overflowX==="visible"),E=C<v&&(y.overflowY==="auto"||y.overflowY==="scroll"||y.overflowY==="visible")):(x=w<M&&(y.overflowX==="auto"||y.overflowX==="scroll"),E=C<v&&(y.overflowY==="auto"||y.overflowY==="scroll"));var D=x&&(Math.abs(_-s)<=a&&S+w<M)-(Math.abs(b-s)<=a&&!!S),O=E&&(Math.abs(m-r)<=a&&$+C<v)-(Math.abs(g-r)<=a&&!!$);if(!qt[u])for(var B=0;B<=u;B++)qt[B]||(qt[B]={});(qt[u].vx!=D||qt[u].vy!=O||qt[u].el!==f)&&(qt[u].el=f,qt[u].vx=D,qt[u].vy=O,clearInterval(qt[u].pid),(D!=0||O!=0)&&(l=!0,qt[u].pid=setInterval((function(){i&&this.layer===0&&K.active._onTouchMove(qc);var N=qt[this.layer].vy?qt[this.layer].vy*o:0,W=qt[this.layer].vx?qt[this.layer].vx*o:0;typeof h=="function"&&h.call(K.dragged.parentNode[Pe],W,N,e,qc,qt[this.layer].el)!=="continue"||J0(qt[this.layer].el,W,N)}).bind({layer:u}),24))),u++}while(t.bubbleScroll&&d!==c&&(d=Si(d,!1)));mu=l}},30),ab=function(t){var n=t.originalEvent,i=t.putSortable,s=t.dragEl,r=t.activeSortable,a=t.dispatchSortableEvent,o=t.hideGhostForTarget,c=t.unhideGhostForTarget;if(n){var l=i||r;o();var h=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:n,u=document.elementFromPoint(h.clientX,h.clientY);c(),l&&!l.el.contains(u)&&(a("spill"),this.onSpill({dragEl:s,putSortable:i}))}};function Dd(){}Dd.prototype={startIndex:null,dragStart:function(t){var n=t.oldDraggableIndex;this.startIndex=n},onSpill:function(t){var n=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var s=yr(this.sortable.el,this.startIndex,this.options);s?this.sortable.el.insertBefore(n,s):this.sortable.el.appendChild(n),this.sortable.animateAll(),i&&i.animateAll()},drop:ab};ri(Dd,{pluginName:"revertOnSpill"});function $d(){}$d.prototype={onSpill:function(t){var n=t.dragEl,i=t.putSortable,s=i||this.sortable;s.captureAnimationState(),n.parentNode&&n.parentNode.removeChild(n),s.animateAll()},drop:ab};ri($d,{pluginName:"removeOnSpill"});K.mount(new HD);K.mount($d,Dd);class Zn{constructor(){}static async subscribe(t){return(await U()).dashboardCharts.subscribe(t)}static async all(){return(await(await U()).dashboardCharts.all()).sort((i,s)=>i.position-s.position)}static async create(t){const n=await U(),i=Pn();return await n.dashboardCharts.put({...t,id:i}),i}static async update(t,n){const i=await U(),s=await i.dashboardCharts.get(t);await i.dashboardCharts.put({...s,...n})}static async remove(t){await(await U()).dashboardCharts.remove(t)}static async reorder(t){const n=await U();await Promise.all(t.map(async(i,s)=>{const r=await n.dashboardCharts.get(i);await n.dashboardCharts.put({...r,position:s})}))}}class Ms{constructor(){}static async subscribe(t){return(await U()).dashboardTables.subscribe(t)}static async all(){return(await(await U()).dashboardTables.all()).sort((i,s)=>i.position-s.position)}static async create(t){const n=await U(),i=Pn();return await n.dashboardTables.put({...t,id:i}),i}static async update(t,n){const i=await U(),s=await i.dashboardTables.get(t);await i.dashboardTables.put({...s,...n})}static async remove(t){await(await U()).dashboardTables.remove(t)}static async reorder(t){const n=await U();await Promise.all(t.map(async(i,s)=>{const r=await n.dashboardTables.get(i);await n.dashboardTables.put({...r,position:s})}))}}class Ve{constructor(){}static async subscribe(t){return(await U()).merchants.subscribe(t)}static async all(){return(await U()).merchants.all()}static async get(t){const n=await U();try{return await n.merchants.get(t)}catch{return}}static async create(t){const n=await U(),i=Pn();return await n.merchants.put({id:i,name:t}),i}static async update(t,n){const i=await U(),s=await i.merchants.get(t);await i.merchants.put({...s,...n})}static async remove(t){await(await U()).merchants.remove(t)}static async byName(t){return(await(await U()).merchants.all()).find(s=>s.name.toLowerCase()===t.toLowerCase())}}function VD(){const e=40+Math.floor(Math.random()*20),t=20+Math.floor(Math.random()*30),n=Math.floor(Math.random()*360);return`lch(${e} ${t} ${n})`}class _e{constructor(){}static async subscribe(t){return(await U()).tags.subscribe(t)}static async all(){return(await U()).tags.all()}static async create(t,n){const i=await U(),s=Pn();return await i.tags.put({id:s,name:t,color:VD(),...n}),s}static async update(t,n){const i=await U(),s=await i.tags.get(t);await i.tags.put({...s,...n})}static async remove(t){await(await U()).tags.remove(t)}static async byName(t){return(await(await U()).tags.all()).find(s=>s.name.toLowerCase()===t.toLowerCase())}}const Tr=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Ar=mt`
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
`;var UD=Object.defineProperty,qD=Object.getOwnPropertyDescriptor,ob=e=>{throw TypeError(e)},po=(e,t,n,i)=>{for(var s=i>1?void 0:i?qD(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&UD(t,n,s),s},KD=(e,t,n)=>t.has(e)||ob("Cannot "+n),YD=(e,t,n)=>t.has(e)?ob("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),un=(e,t,n)=>(KD(e,t,"access private method"),n),ze,Sl,cb,lb,ta,hb,ub;const XD=[{value:"tag",label:"Tag"},{value:"merchant",label:"Merchant"},{value:"amount",label:"Amount"},{value:"description",label:"Description"}],db={tag:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],merchant:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],amount:[{value:"lt",label:"<"},{value:"gt",label:">"},{value:"lte",label:"<="},{value:"gte",label:">="}],description:[{value:"contains",label:"contains"},{value:"excludes",label:"excludes"}]};let Es=class extends gt{constructor(){super(...arguments),YD(this,ze),this.condition={field:"tag",operator:"is",value:""},this.index=0,this.tags=[],this.merchants=[]}render(){const e=db[this.condition.field];return k`
      <select @change=${un(this,ze,cb)}>
        ${XD.map(t=>k`<option value=${t.value} ?selected=${this.condition.field===t.value}>${t.label}</option>`)}
      </select>
      <select @change=${un(this,ze,lb)}>
        ${e.map(t=>k`<option value=${t.value} ?selected=${this.condition.operator===t.value}>${t.label}</option>`)}
      </select>
      ${un(this,ze,ub).call(this)}
      <button class="icon-btn icon-btn--danger" title="Remove filter" aria-label="Remove filter" @click=${un(this,ze,hb)}>${re(Tr)}</button>
    `}};ze=new WeakSet;Sl=function(e){this.dispatchEvent(new CustomEvent("filter-changed",{detail:{index:this.index,condition:e}}))};cb=function(e){const t=e.target.value,n=db[t];un(this,ze,Sl).call(this,{field:t,operator:n[0].value,value:""})};lb=function(e){const t=e.target.value;un(this,ze,Sl).call(this,{...this.condition,operator:t})};ta=function(e){const t=e.target.value;un(this,ze,Sl).call(this,{...this.condition,value:t})};hb=function(){this.dispatchEvent(new CustomEvent("filter-removed",{detail:{index:this.index}}))};ub=function(){const{field:e}=this.condition;return e==="tag"?k`
        <select @change=${un(this,ze,ta)}>
          <option value="">--</option>
          ${this.tags.map(t=>k`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="merchant"?k`
        <select @change=${un(this,ze,ta)}>
          <option value="">--</option>
          ${this.merchants.map(t=>k`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="amount"?k`
        <input
          type="number"
          placeholder="e.g. 0"
          .value=${this.condition.value}
          @input=${un(this,ze,ta)}
        />
      `:k`
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${un(this,ze,ta)}
      />
    `};Es.styles=[Ar,mt`
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
    `];po([Q({type:Object})],Es.prototype,"condition",2);po([Q({type:Number})],Es.prototype,"index",2);po([Q({type:Array})],Es.prototype,"tags",2);po([Q({type:Array})],Es.prototype,"merchants",2);Es=po([$t("chart-filter-row")],Es);var GD=Object.defineProperty,QD=Object.getOwnPropertyDescriptor,fb=e=>{throw TypeError(e)},Ce=(e,t,n,i)=>{for(var s=i>1?void 0:i?QD(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&GD(t,n,s),s},JD=(e,t,n)=>t.has(e)||fb("Cannot "+n),ZD=(e,t,n)=>t.has(e)?fb("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ss=(e,t,n)=>(JD(e,t,"access private method"),n),Vn,pb,gb,mb,vb,bb,_b,yb;const bh=new Set(["pie","doughnut"]);let he=class extends gt{constructor(){super(...arguments),ZD(this,Vn),this.transactions=[],this.tags=[],this.merchants=[],this._title="",this._chartType="bar",this._granularity="month",this._startDate="",this._filters=[],this._excludedTagIds=[],this._excludedMerchantIds=[],this._legendPosition="top",this._showExclusions=!1,this._initialized=!1}updated(e){e.has("editingChart")&&this.editingChart&&!this._initialized&&(this._title=this.editingChart.title,this._chartType=this.editingChart.chartType,this._granularity=this.editingChart.granularity,this._startDate=this.editingChart.startDate??"",this._filters=this.editingChart.filters??ss(this,Vn,pb).call(this,this.editingChart),this._excludedTagIds=this.editingChart.excludedTagIds??[],this._excludedMerchantIds=this.editingChart.excludedMerchantIds??[],this._legendPosition=this.editingChart.legendPosition??"top",this._initialized=!0)}render(){return k`
      <h4>${this.editingChart?"Edit Chart":"Add Chart"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${e=>{this._title=e.target.value}}
        />
        <label>Type:</label>
        <select @change=${e=>{this._chartType=e.target.value,bh.has(this._chartType)&&!["byTag","byMerchant","month"].includes(this._granularity)&&(this._granularity="byTag")}}>
          <option value="bar" ?selected=${this._chartType==="bar"}>Bar</option>
          <option value="line" ?selected=${this._chartType==="line"}>Line</option>
          <option value="pie" ?selected=${this._chartType==="pie"}>Pie</option>
          <option value="doughnut" ?selected=${this._chartType==="doughnut"}>Doughnut</option>
        </select>
        <label>${bh.has(this._chartType)?"Split by:":"Group by:"}</label>
        <select @change=${e=>{this._granularity=e.target.value}}>
          ${bh.has(this._chartType)?k`
              <option value="byTag" ?selected=${this._granularity==="byTag"}>Tag</option>
              <option value="byMerchant" ?selected=${this._granularity==="byMerchant"}>Merchant</option>
              <option value="month" ?selected=${this._granularity==="month"}>Month</option>
            `:k`
              <option value="day" ?selected=${this._granularity==="day"}>Day</option>
              <option value="month" ?selected=${this._granularity==="month"}>Month</option>
              <option value="year" ?selected=${this._granularity==="year"}>Year</option>
              <option value="byTag" ?selected=${this._granularity==="byTag"}>Tag</option>
              <option value="byMerchant" ?selected=${this._granularity==="byMerchant"}>Merchant</option>
            `}
        </select>
        <label>Start date:</label>
        <input
          type="text"
          placeholder="e.g. 3 months ago"
          .value=${this._startDate}
          @input=${e=>{this._startDate=e.target.value}}
        />
      </div>
      <div class="filters">
        ${this._filters.map((e,t)=>k`
          <chart-filter-row
            .condition=${e}
            .index=${t}
            .tags=${this.tags}
            .merchants=${this.merchants}
            @filter-changed=${ss(this,Vn,gb)}
            @filter-removed=${ss(this,Vn,mb)}
          ></chart-filter-row>
        `)}
        <button class="add-filter" @click=${ss(this,Vn,vb)}>+ Add filter</button>
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
      ${ss(this,Vn,_b).call(this)}
      <button @click=${ss(this,Vn,bb)}>${this.editingChart?"Update Chart":"Save to Dashboard"}</button>
    `}};Vn=new WeakSet;pb=function(e){const t=[];return e.tagId&&t.push({field:"tag",operator:"is",value:e.tagId}),e.merchantId&&t.push({field:"merchant",operator:"is",value:e.merchantId}),e.direction==="debit"?t.push({field:"amount",operator:"lt",value:"0"}):e.direction==="credit"&&t.push({field:"amount",operator:"gt",value:"0"}),e.descriptionFilter&&t.push({field:"description",operator:e.descriptionFilterMode==="include"?"contains":"excludes",value:e.descriptionFilter}),t};gb=function(e){const{index:t,condition:n}=e.detail;this._filters=this._filters.map((i,s)=>s===t?n:i)};mb=function(e){const{index:t}=e.detail;this._filters=this._filters.filter((n,i)=>i!==t)};vb=function(){this._filters=[...this._filters,{field:"tag",operator:"is",value:""}]};bb=function(){const e=this._title.trim();if(!e)return;const t=this._filters.filter(n=>n.value.trim());this.dispatchEvent(new CustomEvent("chart-saved",{detail:{id:this.editingChart?.id,title:e,chartType:this._chartType,granularity:this._granularity,startDate:this._startDate||void 0,excludedTagIds:this._excludedTagIds.length>0?this._excludedTagIds:void 0,excludedMerchantIds:this._excludedMerchantIds.length>0?this._excludedMerchantIds:void 0,legendPosition:this._legendPosition,filters:t.length>0?t:void 0}})),this._title="",this._initialized=!1};_b=function(){if(this._granularity!=="byTag"&&this._granularity!=="byMerchant")return"";const e=this._granularity==="byTag"?this.tags:this.merchants,t=this._granularity==="byTag"?this._excludedTagIds:this._excludedMerchantIds,n=this._granularity==="byTag"?"tags":"merchants";return k`
      <details class="exclusions" ?open=${this._showExclusions} @toggle=${i=>{this._showExclusions=i.target.open}}>
        <summary>Exclude ${n}</summary>
        <div class="checkbox-list">
          ${e.map(i=>k`
            <label>
              <input
                type="checkbox"
                ?checked=${t.includes(i.id)}
                @change=${s=>ss(this,Vn,yb).call(this,i.id,s.target.checked)}
              />
              ${i.name}
            </label>
          `)}
        </div>
      </details>
    `};yb=function(e,t){this._granularity==="byTag"?this._excludedTagIds=t?[...this._excludedTagIds,e]:this._excludedTagIds.filter(n=>n!==e):this._excludedMerchantIds=t?[...this._excludedMerchantIds,e]:this._excludedMerchantIds.filter(n=>n!==e)};he.styles=[Fn,mt`
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
    `];Ce([Q({type:Array})],he.prototype,"transactions",2);Ce([Q({type:Array})],he.prototype,"tags",2);Ce([Q({type:Array})],he.prototype,"merchants",2);Ce([Q({type:Object})],he.prototype,"editingChart",2);Ce([I()],he.prototype,"_title",2);Ce([I()],he.prototype,"_chartType",2);Ce([I()],he.prototype,"_granularity",2);Ce([I()],he.prototype,"_startDate",2);Ce([I()],he.prototype,"_filters",2);Ce([I()],he.prototype,"_excludedTagIds",2);Ce([I()],he.prototype,"_excludedMerchantIds",2);Ce([I()],he.prototype,"_legendPosition",2);Ce([I()],he.prototype,"_showExclusions",2);Ce([I()],he.prototype,"_initialized",2);he=Ce([$t("chart-configurator")],he);function go(e){return e+.5|0}const ki=(e,t,n)=>Math.max(Math.min(e,n),t);function ea(e){return ki(go(e*2.55),0,255)}function Oi(e){return ki(go(e*255),0,255)}function Un(e){return ki(go(e/2.55)/100,0,1)}function Np(e){return ki(go(e*100),0,100)}const Qe={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},vu=[..."0123456789ABCDEF"],t$=e=>vu[e&15],e$=e=>vu[(e&240)>>4]+vu[e&15],Po=e=>(e&240)>>4===(e&15),n$=e=>Po(e.r)&&Po(e.g)&&Po(e.b)&&Po(e.a);function i$(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&Qe[e[1]]*17,g:255&Qe[e[2]]*17,b:255&Qe[e[3]]*17,a:t===5?Qe[e[4]]*17:255}:(t===7||t===9)&&(n={r:Qe[e[1]]<<4|Qe[e[2]],g:Qe[e[3]]<<4|Qe[e[4]],b:Qe[e[5]]<<4|Qe[e[6]],a:t===9?Qe[e[7]]<<4|Qe[e[8]]:255})),n}const s$=(e,t)=>e<255?t(e):"";function r$(e){var t=n$(e)?t$:e$;return e?"#"+t(e.r)+t(e.g)+t(e.b)+s$(e.a,t):void 0}const a$=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function wb(e,t,n){const i=t*Math.min(n,1-n),s=(r,a=(r+e/30)%12)=>n-i*Math.max(Math.min(a-3,9-a,1),-1);return[s(0),s(8),s(4)]}function o$(e,t,n){const i=(s,r=(s+e/60)%6)=>n-n*t*Math.max(Math.min(r,4-r,1),0);return[i(5),i(3),i(1)]}function c$(e,t,n){const i=wb(e,1,.5);let s;for(t+n>1&&(s=1/(t+n),t*=s,n*=s),s=0;s<3;s++)i[s]*=1-t-n,i[s]+=t;return i}function l$(e,t,n,i,s){return e===s?(t-n)/i+(t<n?6:0):t===s?(n-e)/i+2:(e-t)/i+4}function Id(e){const n=e.r/255,i=e.g/255,s=e.b/255,r=Math.max(n,i,s),a=Math.min(n,i,s),o=(r+a)/2;let c,l,h;return r!==a&&(h=r-a,l=o>.5?h/(2-r-a):h/(r+a),c=l$(n,i,s,h,r),c=c*60+.5),[c|0,l||0,o]}function Pd(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(Oi)}function Od(e,t,n){return Pd(wb,e,t,n)}function h$(e,t,n){return Pd(c$,e,t,n)}function u$(e,t,n){return Pd(o$,e,t,n)}function xb(e){return(e%360+360)%360}function d$(e){const t=a$.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?ea(+t[5]):Oi(+t[5]));const s=xb(+t[2]),r=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?i=h$(s,r,a):t[1]==="hsv"?i=u$(s,r,a):i=Od(s,r,a),{r:i[0],g:i[1],b:i[2],a:n}}function f$(e,t){var n=Id(e);n[0]=xb(n[0]+t),n=Od(n),e.r=n[0],e.g=n[1],e.b=n[2]}function p$(e){if(!e)return;const t=Id(e),n=t[0],i=Np(t[1]),s=Np(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${s}%, ${Un(e.a)})`:`hsl(${n}, ${i}%, ${s}%)`}const Fp={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Bp={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function g$(){const e={},t=Object.keys(Bp),n=Object.keys(Fp);let i,s,r,a,o;for(i=0;i<t.length;i++){for(a=o=t[i],s=0;s<n.length;s++)r=n[s],o=o.replace(r,Fp[r]);r=parseInt(Bp[a],16),e[o]=[r>>16&255,r>>8&255,r&255]}return e}let Oo;function m$(e){Oo||(Oo=g$(),Oo.transparent=[0,0,0,0]);const t=Oo[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const v$=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function b$(e){const t=v$.exec(e);let n=255,i,s,r;if(t){if(t[7]!==i){const a=+t[7];n=t[8]?ea(a):ki(a*255,0,255)}return i=+t[1],s=+t[3],r=+t[5],i=255&(t[2]?ea(i):ki(i,0,255)),s=255&(t[4]?ea(s):ki(s,0,255)),r=255&(t[6]?ea(r):ki(r,0,255)),{r:i,g:s,b:r,a:n}}}function _$(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Un(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const _h=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Ys=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function y$(e,t,n){const i=Ys(Un(e.r)),s=Ys(Un(e.g)),r=Ys(Un(e.b));return{r:Oi(_h(i+n*(Ys(Un(t.r))-i))),g:Oi(_h(s+n*(Ys(Un(t.g))-s))),b:Oi(_h(r+n*(Ys(Un(t.b))-r))),a:e.a+n*(t.a-e.a)}}function To(e,t,n){if(e){let i=Id(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=Od(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function Sb(e,t){return e&&Object.assign(t||{},e)}function zp(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Oi(e[3]))):(t=Sb(e,{r:0,g:0,b:0,a:1}),t.a=Oi(t.a)),t}function w$(e){return e.charAt(0)==="r"?b$(e):d$(e)}class qa{constructor(t){if(t instanceof qa)return t;const n=typeof t;let i;n==="object"?i=zp(t):n==="string"&&(i=i$(t)||m$(t)||w$(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Sb(this._rgb);return t&&(t.a=Un(t.a)),t}set rgb(t){this._rgb=zp(t)}rgbString(){return this._valid?_$(this._rgb):void 0}hexString(){return this._valid?r$(this._rgb):void 0}hslString(){return this._valid?p$(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,s=t.rgb;let r;const a=n===r?.5:n,o=2*a-1,c=i.a-s.a,l=((o*c===-1?o:(o+c)/(1+o*c))+1)/2;r=1-l,i.r=255&l*i.r+r*s.r+.5,i.g=255&l*i.g+r*s.g+.5,i.b=255&l*i.b+r*s.b+.5,i.a=a*i.a+(1-a)*s.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=y$(this._rgb,t._rgb,n)),this}clone(){return new qa(this.rgb)}alpha(t){return this._rgb.a=Oi(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=go(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return To(this._rgb,2,t),this}darken(t){return To(this._rgb,2,-t),this}saturate(t){return To(this._rgb,1,t),this}desaturate(t){return To(this._rgb,1,-t),this}rotate(t){return f$(this._rgb,t),this}}function jn(){}const x$=(()=>{let e=0;return()=>e++})();function it(e){return e==null}function At(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function rt(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function Ht(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function Ne(e,t){return Ht(e)?e:t}function et(e,t){return typeof e>"u"?t:e}const S$=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,kb=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function Et(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function bt(e,t,n,i){let s,r,a;if(At(e))for(r=e.length,s=0;s<r;s++)t.call(n,e[s],s);else if(rt(e))for(a=Object.keys(e),r=a.length,s=0;s<r;s++)t.call(n,e[a[s]],a[s])}function Kc(e,t){let n,i,s,r;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(s=e[n],r=t[n],s.datasetIndex!==r.datasetIndex||s.index!==r.index)return!1;return!0}function Yc(e){if(At(e))return e.map(Yc);if(rt(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let s=0;for(;s<i;++s)t[n[s]]=Yc(e[n[s]]);return t}return e}function Cb(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function k$(e,t,n,i){if(!Cb(e))return;const s=t[e],r=n[e];rt(s)&&rt(r)?Ka(s,r,i):t[e]=Yc(r)}function Ka(e,t,n){const i=At(t)?t:[t],s=i.length;if(!rt(e))return e;n=n||{};const r=n.merger||k$;let a;for(let o=0;o<s;++o){if(a=i[o],!rt(a))continue;const c=Object.keys(a);for(let l=0,h=c.length;l<h;++l)r(c[l],e,a,n)}return e}function Ma(e,t){return Ka(e,t,{merger:C$})}function C$(e,t,n){if(!Cb(e))return;const i=t[e],s=n[e];rt(i)&&rt(s)?Ma(i,s):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Yc(s))}const jp={"":e=>e,x:e=>e.x,y:e=>e.y};function M$(e){const t=e.split("."),n=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function E$(e){const t=M$(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function Ni(e,t){return(jp[t]||(jp[t]=E$(t)))(e)}function Td(e){return e.charAt(0).toUpperCase()+e.slice(1)}const Ya=e=>typeof e<"u",Fi=e=>typeof e=="function",Wp=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function D$(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const ht=Math.PI,It=2*ht,$$=It+ht,Xc=Number.POSITIVE_INFINITY,I$=ht/180,Vt=ht/2,Qi=ht/4,Hp=ht*2/3,Ci=Math.log10,En=Math.sign;function Ea(e,t,n){return Math.abs(e-t)<n}function Vp(e){const t=Math.round(e);e=Ea(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(Ci(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function P$(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((s,r)=>s-r).pop(),t}function O$(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function wr(e){return!O$(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function T$(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function Mb(e,t,n){let i,s,r;for(i=0,s=e.length;i<s;i++)r=e[i][n],isNaN(r)||(t.min=Math.min(t.min,r),t.max=Math.max(t.max,r))}function dn(e){return e*(ht/180)}function Ad(e){return e*(180/ht)}function Up(e){if(!Ht(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function Eb(e,t){const n=t.x-e.x,i=t.y-e.y,s=Math.sqrt(n*n+i*i);let r=Math.atan2(i,n);return r<-.5*ht&&(r+=It),{angle:r,distance:s}}function bu(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function A$(e,t){return(e-t+$$)%It-ht}function ve(e){return(e%It+It)%It}function Xa(e,t,n,i){const s=ve(e),r=ve(t),a=ve(n),o=ve(r-s),c=ve(a-s),l=ve(s-r),h=ve(s-a);return s===r||s===a||i&&r===a||o>c&&l<h}function se(e,t,n){return Math.max(t,Math.min(n,e))}function R$(e){return se(e,-32768,32767)}function qn(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function Rd(e,t,n){n=n||(a=>e[a]<t);let i=e.length-1,s=0,r;for(;i-s>1;)r=s+i>>1,n(r)?s=r:i=r;return{lo:s,hi:i}}const Kn=(e,t,n,i)=>Rd(e,n,i?s=>{const r=e[s][t];return r<n||r===n&&e[s+1][t]===n}:s=>e[s][t]<n),L$=(e,t,n)=>Rd(e,n,i=>e[i][t]>=n);function N$(e,t,n){let i=0,s=e.length;for(;i<s&&e[i]<t;)i++;for(;s>i&&e[s-1]>n;)s--;return i>0||s<e.length?e.slice(i,s):e}const Db=["push","pop","shift","splice","unshift"];function F$(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Db.forEach(n=>{const i="_onData"+Td(n),s=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...r){const a=s.apply(this,r);return e._chartjs.listeners.forEach(o=>{typeof o[i]=="function"&&o[i](...r)}),a}})})}function qp(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(Db.forEach(r=>{delete e[r]}),delete e._chartjs)}function $b(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Ib=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Pb(e,t){let n=[],i=!1;return function(...s){n=s,i||(i=!0,Ib.call(window,()=>{i=!1,e.apply(t,n)}))}}function B$(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const Ld=e=>e==="start"?"left":e==="end"?"right":"center",me=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,z$=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function Ob(e,t,n){const i=t.length;let s=0,r=i;if(e._sorted){const{iScale:a,vScale:o,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,h=a.axis,{min:u,max:d,minDefined:f,maxDefined:p}=a.getUserBounds();if(f){if(s=Math.min(Kn(c,h,u).lo,n?i:Kn(t,h,a.getPixelForValue(u)).lo),l){const g=c.slice(0,s+1).reverse().findIndex(m=>!it(m[o.axis]));s-=Math.max(0,g)}s=se(s,0,i-1)}if(p){let g=Math.max(Kn(c,a.axis,d,!0).hi+1,n?0:Kn(t,h,a.getPixelForValue(d),!0).hi+1);if(l){const m=c.slice(g-1).findIndex(b=>!it(b[o.axis]));g+=Math.max(0,m)}r=se(g,s,i)-s}else r=i-s}return{start:s,count:r}}function Tb(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,s={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=s,!0;const r=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,s),r}const Ao=e=>e===0||e===1,Kp=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*It/n)),Yp=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*It/n)+1,Da={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*Vt)+1,easeOutSine:e=>Math.sin(e*Vt),easeInOutSine:e=>-.5*(Math.cos(ht*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>Ao(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Ao(e)?e:Kp(e,.075,.3),easeOutElastic:e=>Ao(e)?e:Yp(e,.075,.3),easeInOutElastic(e){return Ao(e)?e:e<.5?.5*Kp(e*2,.1125,.45):.5+.5*Yp(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Da.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?Da.easeInBounce(e*2)*.5:Da.easeOutBounce(e*2-1)*.5+.5};function Nd(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Xp(e){return Nd(e)?e:new qa(e)}function yh(e){return Nd(e)?e:new qa(e).saturate(.5).darken(.1).hexString()}const j$=["x","y","borderWidth","radius","tension"],W$=["color","borderColor","backgroundColor"];function H$(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:W$},numbers:{type:"number",properties:j$}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function V$(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Gp=new Map;function U$(e,t){t=t||{};const n=e+JSON.stringify(t);let i=Gp.get(n);return i||(i=new Intl.NumberFormat(e,t),Gp.set(n,i)),i}function mo(e,t,n){return U$(t,n).format(e)}const Ab={values(e){return At(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let s,r=e;if(n.length>1){const l=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(l<1e-4||l>1e15)&&(s="scientific"),r=q$(e,n)}const a=Ci(Math.abs(r)),o=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),c={notation:s,minimumFractionDigits:o,maximumFractionDigits:o};return Object.assign(c,this.options.ticks.format),mo(e,i,c)},logarithmic(e,t,n){if(e===0)return"0";const i=n[t].significand||e/Math.pow(10,Math.floor(Ci(e)));return[1,2,3,5,10,15].includes(i)||t>.8*n.length?Ab.numeric.call(this,e,t,n):""}};function q$(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var kl={formatters:Ab};function K$(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:kl.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Ds=Object.create(null),_u=Object.create(null);function $a(e,t){if(!t)return e;const n=t.split(".");for(let i=0,s=n.length;i<s;++i){const r=n[i];e=e[r]||(e[r]=Object.create(null))}return e}function wh(e,t,n){return typeof t=="string"?Ka($a(e,t),n):Ka($a(e,""),t)}class Y${constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>yh(s.backgroundColor),this.hoverBorderColor=(i,s)=>yh(s.borderColor),this.hoverColor=(i,s)=>yh(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return wh(this,t,n)}get(t){return $a(this,t)}describe(t,n){return wh(_u,t,n)}override(t,n){return wh(Ds,t,n)}route(t,n,i,s){const r=$a(this,t),a=$a(this,i),o="_"+n;Object.defineProperties(r,{[o]:{value:r[n],writable:!0},[n]:{enumerable:!0,get(){const c=this[o],l=a[s];return rt(c)?Object.assign({},l,c):et(c,l)},set(c){this[o]=c}}})}apply(t){t.forEach(n=>n(this))}}var Rt=new Y$({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[H$,V$,K$]);function X$(e){return!e||it(e.size)||it(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function Gc(e,t,n,i,s){let r=t[s];return r||(r=t[s]=e.measureText(s).width,n.push(s)),r>i&&(i=r),i}function G$(e,t,n,i){i=i||{};let s=i.data=i.data||{},r=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},r=i.garbageCollect=[],i.font=t),e.save(),e.font=t;let a=0;const o=n.length;let c,l,h,u,d;for(c=0;c<o;c++)if(u=n[c],u!=null&&!At(u))a=Gc(e,s,r,a,u);else if(At(u))for(l=0,h=u.length;l<h;l++)d=u[l],d!=null&&!At(d)&&(a=Gc(e,s,r,a,d));e.restore();const f=r.length/2;if(f>n.length){for(c=0;c<f;c++)delete s[r[c]];r.splice(0,f)}return a}function Ji(e,t,n){const i=e.currentDevicePixelRatio,s=n!==0?Math.max(n/2,.5):0;return Math.round((t-s)*i)/i+s}function Qp(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function yu(e,t,n,i){Rb(e,t,n,i,null)}function Rb(e,t,n,i,s){let r,a,o,c,l,h,u,d;const f=t.pointStyle,p=t.rotation,g=t.radius;let m=(p||0)*I$;if(f&&typeof f=="object"&&(r=f.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(m),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(g)||g<=0)){switch(e.beginPath(),f){default:s?e.ellipse(n,i,s/2,g,0,0,It):e.arc(n,i,g,0,It),e.closePath();break;case"triangle":h=s?s/2:g,e.moveTo(n+Math.sin(m)*h,i-Math.cos(m)*g),m+=Hp,e.lineTo(n+Math.sin(m)*h,i-Math.cos(m)*g),m+=Hp,e.lineTo(n+Math.sin(m)*h,i-Math.cos(m)*g),e.closePath();break;case"rectRounded":l=g*.516,c=g-l,a=Math.cos(m+Qi)*c,u=Math.cos(m+Qi)*(s?s/2-l:c),o=Math.sin(m+Qi)*c,d=Math.sin(m+Qi)*(s?s/2-l:c),e.arc(n-u,i-o,l,m-ht,m-Vt),e.arc(n+d,i-a,l,m-Vt,m),e.arc(n+u,i+o,l,m,m+Vt),e.arc(n-d,i+a,l,m+Vt,m+ht),e.closePath();break;case"rect":if(!p){c=Math.SQRT1_2*g,h=s?s/2:c,e.rect(n-h,i-c,2*h,2*c);break}m+=Qi;case"rectRot":u=Math.cos(m)*(s?s/2:g),a=Math.cos(m)*g,o=Math.sin(m)*g,d=Math.sin(m)*(s?s/2:g),e.moveTo(n-u,i-o),e.lineTo(n+d,i-a),e.lineTo(n+u,i+o),e.lineTo(n-d,i+a),e.closePath();break;case"crossRot":m+=Qi;case"cross":u=Math.cos(m)*(s?s/2:g),a=Math.cos(m)*g,o=Math.sin(m)*g,d=Math.sin(m)*(s?s/2:g),e.moveTo(n-u,i-o),e.lineTo(n+u,i+o),e.moveTo(n+d,i-a),e.lineTo(n-d,i+a);break;case"star":u=Math.cos(m)*(s?s/2:g),a=Math.cos(m)*g,o=Math.sin(m)*g,d=Math.sin(m)*(s?s/2:g),e.moveTo(n-u,i-o),e.lineTo(n+u,i+o),e.moveTo(n+d,i-a),e.lineTo(n-d,i+a),m+=Qi,u=Math.cos(m)*(s?s/2:g),a=Math.cos(m)*g,o=Math.sin(m)*g,d=Math.sin(m)*(s?s/2:g),e.moveTo(n-u,i-o),e.lineTo(n+u,i+o),e.moveTo(n+d,i-a),e.lineTo(n-d,i+a);break;case"line":a=s?s/2:Math.cos(m)*g,o=Math.sin(m)*g,e.moveTo(n-a,i-o),e.lineTo(n+a,i+o);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(m)*(s?s/2:g),i+Math.sin(m)*g);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Yn(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function Cl(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Ml(e){e.restore()}function Q$(e,t,n,i,s){if(!t)return e.lineTo(n.x,n.y);if(s==="middle"){const r=(t.x+n.x)/2;e.lineTo(r,t.y),e.lineTo(r,n.y)}else s==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function J$(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function Z$(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),it(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function tI(e,t,n,i,s){if(s.strikethrough||s.underline){const r=e.measureText(i),a=t-r.actualBoundingBoxLeft,o=t+r.actualBoundingBoxRight,c=n-r.actualBoundingBoxAscent,l=n+r.actualBoundingBoxDescent,h=s.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=s.decorationWidth||2,e.moveTo(a,h),e.lineTo(o,h),e.stroke()}}function eI(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function $s(e,t,n,i,s,r={}){const a=At(t)?t:[t],o=r.strokeWidth>0&&r.strokeColor!=="";let c,l;for(e.save(),e.font=s.string,Z$(e,r),c=0;c<a.length;++c)l=a[c],r.backdrop&&eI(e,r.backdrop),o&&(r.strokeColor&&(e.strokeStyle=r.strokeColor),it(r.strokeWidth)||(e.lineWidth=r.strokeWidth),e.strokeText(l,n,i,r.maxWidth)),e.fillText(l,n,i,r.maxWidth),tI(e,n,i,l,r),i+=Number(s.lineHeight);e.restore()}function Ga(e,t){const{x:n,y:i,w:s,h:r,radius:a}=t;e.arc(n+a.topLeft,i+a.topLeft,a.topLeft,1.5*ht,ht,!0),e.lineTo(n,i+r-a.bottomLeft),e.arc(n+a.bottomLeft,i+r-a.bottomLeft,a.bottomLeft,ht,Vt,!0),e.lineTo(n+s-a.bottomRight,i+r),e.arc(n+s-a.bottomRight,i+r-a.bottomRight,a.bottomRight,Vt,0,!0),e.lineTo(n+s,i+a.topRight),e.arc(n+s-a.topRight,i+a.topRight,a.topRight,0,-Vt,!0),e.lineTo(n+a.topLeft,i)}const nI=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,iI=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function sI(e,t){const n=(""+e).match(nI);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const rI=e=>+e||0;function Fd(e,t){const n={},i=rt(t),s=i?Object.keys(t):t,r=rt(e)?i?a=>et(e[a],e[t[a]]):a=>e[a]:()=>e;for(const a of s)n[a]=rI(r(a));return n}function Lb(e){return Fd(e,{top:"y",right:"x",bottom:"y",left:"x"})}function ms(e){return Fd(e,["topLeft","topRight","bottomLeft","bottomRight"])}function ye(e){const t=Lb(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Jt(e,t){e=e||{},t=t||Rt.font;let n=et(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=et(e.style,t.style);i&&!(""+i).match(iI)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:et(e.family,t.family),lineHeight:sI(et(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:et(e.weight,t.weight),string:""};return s.string=X$(s),s}function na(e,t,n,i){let s,r,a;for(s=0,r=e.length;s<r;++s)if(a=e[s],a!==void 0&&a!==void 0)return a}function aI(e,t,n){const{min:i,max:s}=e,r=kb(t,(s-i)/2),a=(o,c)=>n&&o===0?0:o+c;return{min:a(i,-Math.abs(r)),max:a(s,r)}}function ji(e,t){return Object.assign(Object.create(e),t)}function Bd(e,t=[""],n,i,s=()=>e[0]){const r=n||e;typeof i>"u"&&(i=zb("_fallback",e));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:r,_fallback:i,_getTarget:s,override:o=>Bd([o,...e],t,r,i)};return new Proxy(a,{deleteProperty(o,c){return delete o[c],delete o._keys,delete e[0][c],!0},get(o,c){return Fb(o,c,()=>pI(c,t,e,o))},getOwnPropertyDescriptor(o,c){return Reflect.getOwnPropertyDescriptor(o._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(o,c){return Zp(o).includes(c)},ownKeys(o){return Zp(o)},set(o,c,l){const h=o._storage||(o._storage=s());return o[c]=h[c]=l,delete o._keys,!0}})}function xr(e,t,n,i){const s={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Nb(e,i),setContext:r=>xr(e,r,n,i),override:r=>xr(e.override(r),t,n,i)};return new Proxy(s,{deleteProperty(r,a){return delete r[a],delete e[a],!0},get(r,a,o){return Fb(r,a,()=>cI(r,a,o))},getOwnPropertyDescriptor(r,a){return r._descriptors.allKeys?Reflect.has(e,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,a)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(r,a){return Reflect.has(e,a)},ownKeys(){return Reflect.ownKeys(e)},set(r,a,o){return e[a]=o,delete r[a],!0}})}function Nb(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=e;return{allKeys:s,scriptable:n,indexable:i,isScriptable:Fi(n)?n:()=>n,isIndexable:Fi(i)?i:()=>i}}const oI=(e,t)=>e?e+Td(t):t,zd=(e,t)=>rt(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Fb(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function cI(e,t,n){const{_proxy:i,_context:s,_subProxy:r,_descriptors:a}=e;let o=i[t];return Fi(o)&&a.isScriptable(t)&&(o=lI(t,o,e,n)),At(o)&&o.length&&(o=hI(t,o,e,a.isIndexable)),zd(t,o)&&(o=xr(o,s,r&&r[t],a)),o}function lI(e,t,n,i){const{_proxy:s,_context:r,_subProxy:a,_stack:o}=n;if(o.has(e))throw new Error("Recursion detected: "+Array.from(o).join("->")+"->"+e);o.add(e);let c=t(r,a||i);return o.delete(e),zd(e,c)&&(c=jd(s._scopes,s,e,c)),c}function hI(e,t,n,i){const{_proxy:s,_context:r,_subProxy:a,_descriptors:o}=n;if(typeof r.index<"u"&&i(e))return t[r.index%t.length];if(rt(t[0])){const c=t,l=s._scopes.filter(h=>h!==c);t=[];for(const h of c){const u=jd(l,s,e,h);t.push(xr(u,r,a&&a[e],o))}}return t}function Bb(e,t,n){return Fi(e)?e(t,n):e}const uI=(e,t)=>e===!0?t:typeof e=="string"?Ni(t,e):void 0;function dI(e,t,n,i,s){for(const r of t){const a=uI(n,r);if(a){e.add(a);const o=Bb(a._fallback,n,s);if(typeof o<"u"&&o!==n&&o!==i)return o}else if(a===!1&&typeof i<"u"&&n!==i)return null}return!1}function jd(e,t,n,i){const s=t._rootScopes,r=Bb(t._fallback,n,i),a=[...e,...s],o=new Set;o.add(i);let c=Jp(o,a,n,r||n,i);return c===null||typeof r<"u"&&r!==n&&(c=Jp(o,a,r,c,i),c===null)?!1:Bd(Array.from(o),[""],s,r,()=>fI(t,n,i))}function Jp(e,t,n,i,s){for(;n;)n=dI(e,t,n,i,s);return n}function fI(e,t,n){const i=e._getTarget();t in i||(i[t]={});const s=i[t];return At(s)&&rt(n)?n:s||{}}function pI(e,t,n,i){let s;for(const r of t)if(s=zb(oI(r,e),n),typeof s<"u")return zd(e,s)?jd(n,i,e,s):s}function zb(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function Zp(e){let t=e._keys;return t||(t=e._keys=gI(e._scopes)),t}function gI(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function jb(e,t,n,i){const{iScale:s}=e,{key:r="r"}=this._parsing,a=new Array(i);let o,c,l,h;for(o=0,c=i;o<c;++o)l=o+n,h=t[l],a[o]={r:s.parse(Ni(h,r),l)};return a}const mI=Number.EPSILON||1e-14,Sr=(e,t)=>t<e.length&&!e[t].skip&&e[t],Wb=e=>e==="x"?"y":"x";function vI(e,t,n,i){const s=e.skip?t:e,r=t,a=n.skip?t:n,o=bu(r,s),c=bu(a,r);let l=o/(o+c),h=c/(o+c);l=isNaN(l)?0:l,h=isNaN(h)?0:h;const u=i*l,d=i*h;return{previous:{x:r.x-u*(a.x-s.x),y:r.y-u*(a.y-s.y)},next:{x:r.x+d*(a.x-s.x),y:r.y+d*(a.y-s.y)}}}function bI(e,t,n){const i=e.length;let s,r,a,o,c,l=Sr(e,0);for(let h=0;h<i-1;++h)if(c=l,l=Sr(e,h+1),!(!c||!l)){if(Ea(t[h],0,mI)){n[h]=n[h+1]=0;continue}s=n[h]/t[h],r=n[h+1]/t[h],o=Math.pow(s,2)+Math.pow(r,2),!(o<=9)&&(a=3/Math.sqrt(o),n[h]=s*a*t[h],n[h+1]=r*a*t[h])}}function _I(e,t,n="x"){const i=Wb(n),s=e.length;let r,a,o,c=Sr(e,0);for(let l=0;l<s;++l){if(a=o,o=c,c=Sr(e,l+1),!o)continue;const h=o[n],u=o[i];a&&(r=(h-a[n])/3,o[`cp1${n}`]=h-r,o[`cp1${i}`]=u-r*t[l]),c&&(r=(c[n]-h)/3,o[`cp2${n}`]=h+r,o[`cp2${i}`]=u+r*t[l])}}function yI(e,t="x"){const n=Wb(t),i=e.length,s=Array(i).fill(0),r=Array(i);let a,o,c,l=Sr(e,0);for(a=0;a<i;++a)if(o=c,c=l,l=Sr(e,a+1),!!c){if(l){const h=l[t]-c[t];s[a]=h!==0?(l[n]-c[n])/h:0}r[a]=o?l?En(s[a-1])!==En(s[a])?0:(s[a-1]+s[a])/2:s[a-1]:s[a]}bI(e,s,r),_I(e,r,t)}function Ro(e,t,n){return Math.max(Math.min(e,n),t)}function wI(e,t){let n,i,s,r,a,o=Yn(e[0],t);for(n=0,i=e.length;n<i;++n)a=r,r=o,o=n<i-1&&Yn(e[n+1],t),r&&(s=e[n],a&&(s.cp1x=Ro(s.cp1x,t.left,t.right),s.cp1y=Ro(s.cp1y,t.top,t.bottom)),o&&(s.cp2x=Ro(s.cp2x,t.left,t.right),s.cp2y=Ro(s.cp2y,t.top,t.bottom)))}function xI(e,t,n,i,s){let r,a,o,c;if(t.spanGaps&&(e=e.filter(l=>!l.skip)),t.cubicInterpolationMode==="monotone")yI(e,s);else{let l=i?e[e.length-1]:e[0];for(r=0,a=e.length;r<a;++r)o=e[r],c=vI(l,o,e[Math.min(r+1,a-(i?0:1))%a],t.tension),o.cp1x=c.previous.x,o.cp1y=c.previous.y,o.cp2x=c.next.x,o.cp2y=c.next.y,l=o}t.capBezierPoints&&wI(e,n)}function Wd(){return typeof window<"u"&&typeof document<"u"}function Hd(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Qc(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const El=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function SI(e,t){return El(e).getPropertyValue(t)}const kI=["top","right","bottom","left"];function vs(e,t,n){const i={};n=n?"-"+n:"";for(let s=0;s<4;s++){const r=kI[s];i[r]=parseFloat(e[t+"-"+r+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const CI=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function MI(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:s,offsetY:r}=i;let a=!1,o,c;if(CI(s,r,e.target))o=s,c=r;else{const l=t.getBoundingClientRect();o=i.clientX-l.left,c=i.clientY-l.top,a=!0}return{x:o,y:c,box:a}}function rs(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,s=El(n),r=s.boxSizing==="border-box",a=vs(s,"padding"),o=vs(s,"border","width"),{x:c,y:l,box:h}=MI(e,n),u=a.left+(h&&o.left),d=a.top+(h&&o.top);let{width:f,height:p}=t;return r&&(f-=a.width+o.width,p-=a.height+o.height),{x:Math.round((c-u)/f*n.width/i),y:Math.round((l-d)/p*n.height/i)}}function EI(e,t,n){let i,s;if(t===void 0||n===void 0){const r=e&&Hd(e);if(!r)t=e.clientWidth,n=e.clientHeight;else{const a=r.getBoundingClientRect(),o=El(r),c=vs(o,"border","width"),l=vs(o,"padding");t=a.width-l.width-c.width,n=a.height-l.height-c.height,i=Qc(o.maxWidth,r,"clientWidth"),s=Qc(o.maxHeight,r,"clientHeight")}}return{width:t,height:n,maxWidth:i||Xc,maxHeight:s||Xc}}const Mi=e=>Math.round(e*10)/10;function DI(e,t,n,i){const s=El(e),r=vs(s,"margin"),a=Qc(s.maxWidth,e,"clientWidth")||Xc,o=Qc(s.maxHeight,e,"clientHeight")||Xc,c=EI(e,t,n);let{width:l,height:h}=c;if(s.boxSizing==="content-box"){const d=vs(s,"border","width"),f=vs(s,"padding");l-=f.width+d.width,h-=f.height+d.height}return l=Math.max(0,l-r.width),h=Math.max(0,i?l/i:h-r.height),l=Mi(Math.min(l,a,c.maxWidth)),h=Mi(Math.min(h,o,c.maxHeight)),l&&!h&&(h=Mi(l/2)),(t!==void 0||n!==void 0)&&i&&c.height&&h>c.height&&(h=c.height,l=Mi(Math.floor(h*i))),{width:l,height:h}}function tg(e,t,n){const i=t||1,s=Mi(e.height*i),r=Mi(e.width*i);e.height=Mi(e.height),e.width=Mi(e.width);const a=e.canvas;return a.style&&(n||!a.style.height&&!a.style.width)&&(a.style.height=`${e.height}px`,a.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||a.height!==s||a.width!==r?(e.currentDevicePixelRatio=i,a.height=s,a.width=r,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const $I=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};Wd()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function eg(e,t){const n=SI(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function as(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function II(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function PI(e,t,n,i){const s={x:e.cp2x,y:e.cp2y},r={x:t.cp1x,y:t.cp1y},a=as(e,s,n),o=as(s,r,n),c=as(r,t,n),l=as(a,o,n),h=as(o,c,n);return as(l,h,n)}const OI=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},TI=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function lr(e,t,n){return e?OI(t,n):TI()}function Hb(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function Vb(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function Ub(e){return e==="angle"?{between:Xa,compare:A$,normalize:ve}:{between:qn,compare:(t,n)=>t-n,normalize:t=>t}}function ng({start:e,end:t,count:n,loop:i,style:s}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:s}}function AI(e,t,n){const{property:i,start:s,end:r}=n,{between:a,normalize:o}=Ub(i),c=t.length;let{start:l,end:h,loop:u}=e,d,f;if(u){for(l+=c,h+=c,d=0,f=c;d<f&&a(o(t[l%c][i]),s,r);++d)l--,h--;l%=c,h%=c}return h<l&&(h+=c),{start:l,end:h,loop:u,style:e.style}}function qb(e,t,n){if(!n)return[e];const{property:i,start:s,end:r}=n,a=t.length,{compare:o,between:c,normalize:l}=Ub(i),{start:h,end:u,loop:d,style:f}=AI(e,t,n),p=[];let g=!1,m=null,b,_,w;const C=()=>c(s,w,b)&&o(s,w)!==0,x=()=>o(r,b)===0||c(r,w,b),E=()=>g||C(),M=()=>!g||x();for(let v=h,y=h;v<=u;++v)_=t[v%a],!_.skip&&(b=l(_[i]),b!==w&&(g=c(b,s,r),m===null&&E()&&(m=o(b,s)===0?v:y),m!==null&&M()&&(p.push(ng({start:m,end:v,loop:d,count:a,style:f})),m=null),y=v,w=b));return m!==null&&p.push(ng({start:m,end:u,loop:d,count:a,style:f})),p}function Kb(e,t){const n=[],i=e.segments;for(let s=0;s<i.length;s++){const r=qb(i[s],e.points,t);r.length&&n.push(...r)}return n}function RI(e,t,n,i){let s=0,r=t-1;if(n&&!i)for(;s<t&&!e[s].skip;)s++;for(;s<t&&e[s].skip;)s++;for(s%=t,n&&(r+=s);r>s&&e[r%t].skip;)r--;return r%=t,{start:s,end:r}}function LI(e,t,n,i){const s=e.length,r=[];let a=t,o=e[t],c;for(c=t+1;c<=n;++c){const l=e[c%s];l.skip||l.stop?o.skip||(i=!1,r.push({start:t%s,end:(c-1)%s,loop:i}),t=a=l.stop?c:null):(a=c,o.skip&&(t=c)),o=l}return a!==null&&r.push({start:t%s,end:a%s,loop:i}),r}function NI(e,t){const n=e.points,i=e.options.spanGaps,s=n.length;if(!s)return[];const r=!!e._loop,{start:a,end:o}=RI(n,s,r,i);if(i===!0)return ig(e,[{start:a,end:o,loop:r}],n,t);const c=o<a?o+s:o,l=!!e._fullLoop&&a===0&&o===s-1;return ig(e,LI(n,a,c,l),n,t)}function ig(e,t,n,i){return!i||!i.setContext||!n?t:FI(e,t,n,i)}function FI(e,t,n,i){const s=e._chart.getContext(),r=sg(e.options),{_datasetIndex:a,options:{spanGaps:o}}=e,c=n.length,l=[];let h=r,u=t[0].start,d=u;function f(p,g,m,b){const _=o?-1:1;if(p!==g){for(p+=c;n[p%c].skip;)p-=_;for(;n[g%c].skip;)g+=_;p%c!==g%c&&(l.push({start:p%c,end:g%c,loop:m,style:b}),h=b,u=g%c)}}for(const p of t){u=o?u:p.start;let g=n[u%c],m;for(d=u+1;d<=p.end;d++){const b=n[d%c];m=sg(i.setContext(ji(s,{type:"segment",p0:g,p1:b,p0DataIndex:(d-1)%c,p1DataIndex:d%c,datasetIndex:a}))),BI(m,h)&&f(u,d-1,p.loop,h),g=b,h=m}u<d-1&&f(u,d-1,p.loop,h)}return l}function sg(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function BI(e,t){if(!t)return!1;const n=[],i=function(s,r){return Nd(r)?(n.includes(r)||n.push(r),n.indexOf(r)):r};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Lo(e,t,n){return e.options.clip?e[n]:t[n]}function zI(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Lo(n,t,"left"),right:Lo(n,t,"right"),top:Lo(i,t,"top"),bottom:Lo(i,t,"bottom")}:t}function Yb(e,t){const n=t._clip;if(n.disabled)return!1;const i=zI(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}class jI{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,s){const r=n.listeners[s],a=n.duration;r.forEach(o=>o({chart:t,initial:n.initial,numSteps:a,currentStep:Math.min(i-n.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Ib.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const r=i.items;let a=r.length-1,o=!1,c;for(;a>=0;--a)c=r[a],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),o=!0):(r[a]=r[r.length-1],r.pop());o&&(s.draw(),this._notify(s,i,t,"progress")),r.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),n+=r.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Wn=new jI;const rg="transparent",WI={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=Xp(e||rg),s=i.valid&&Xp(t||rg);return s&&s.valid?s.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class HI{constructor(t,n,i,s){const r=n[i];s=na([t.to,s,r,t.from]);const a=na([t.from,r,s]);this._active=!0,this._fn=t.fn||WI[t.type||typeof a],this._easing=Da[t.easing]||Da.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=a,this._to=s,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const s=this._target[this._prop],r=i-this._start,a=this._duration-r;this._start=i,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=na([t.to,n,s,t.from]),this._from=na([t.from,s,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,s=this._prop,r=this._from,a=this._loop,o=this._to;let c;if(this._active=r!==o&&(a||n<i),!this._active){this._target[s]=o,this._notify(!0);return}if(n<0){this._target[s]=r;return}c=n/i%2,c=a&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[s]=this._fn(r,o,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][n]()}}class Xb{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!rt(t))return;const n=Object.keys(Rt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const r=t[s];if(!rt(r))return;const a={};for(const o of n)a[o]=r[o];(At(r.properties)&&r.properties||[s]).forEach(o=>{(o===s||!i.has(o))&&i.set(o,a)})})}_animateOptions(t,n){const i=n.options,s=UI(t,i);if(!s)return[];const r=this._createAnimations(s,i);return i.$shared&&VI(t.options.$animations,i).then(()=>{t.options=i},()=>{}),r}_createAnimations(t,n){const i=this._properties,s=[],r=t.$animations||(t.$animations={}),a=Object.keys(n),o=Date.now();let c;for(c=a.length-1;c>=0;--c){const l=a[c];if(l.charAt(0)==="$")continue;if(l==="options"){s.push(...this._animateOptions(t,n));continue}const h=n[l];let u=r[l];const d=i.get(l);if(u)if(d&&u.active()){u.update(d,h,o);continue}else u.cancel();if(!d||!d.duration){t[l]=h;continue}r[l]=u=new HI(d,t,l,h),s.push(u)}return s}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return Wn.add(this._chart,i),!0}}function VI(e,t){const n=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const r=e[i[s]];r&&r.active()&&n.push(r.wait())}return Promise.all(n)}function UI(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function ag(e,t){const n=e&&e.options||{},i=n.reverse,s=n.min===void 0?t:0,r=n.max===void 0?t:0;return{start:i?r:s,end:i?s:r}}function qI(e,t,n){if(n===!1)return!1;const i=ag(e,n),s=ag(t,n);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function KI(e){let t,n,i,s;return rt(e)?(t=e.top,n=e.right,i=e.bottom,s=e.left):t=n=i=s=e,{top:t,right:n,bottom:i,left:s,disabled:e===!1}}function Gb(e,t){const n=[],i=e._getSortedDatasetMetas(t);let s,r;for(s=0,r=i.length;s<r;++s)n.push(i[s].index);return n}function og(e,t,n,i={}){const s=e.keys,r=i.mode==="single";let a,o,c,l;if(t===null)return;let h=!1;for(a=0,o=s.length;a<o;++a){if(c=+s[a],c===n){if(h=!0,i.all)continue;break}l=e.values[c],Ht(l)&&(r||t===0||En(t)===En(l))&&(t+=l)}return!h&&!i.all?0:t}function YI(e,t){const{iScale:n,vScale:i}=t,s=n.axis==="x"?"x":"y",r=i.axis==="x"?"x":"y",a=Object.keys(e),o=new Array(a.length);let c,l,h;for(c=0,l=a.length;c<l;++c)h=a[c],o[c]={[s]:h,[r]:e[h]};return o}function xh(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function XI(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function GI(e){const{min:t,max:n,minDefined:i,maxDefined:s}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?n:Number.POSITIVE_INFINITY}}function QI(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function cg(e,t,n,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const r=e[s.index];if(n&&r>0||!n&&r<0)return s.index}return null}function lg(e,t){const{chart:n,_cachedMeta:i}=e,s=n._stacks||(n._stacks={}),{iScale:r,vScale:a,index:o}=i,c=r.axis,l=a.axis,h=XI(r,a,i),u=t.length;let d;for(let f=0;f<u;++f){const p=t[f],{[c]:g,[l]:m}=p,b=p._stacks||(p._stacks={});d=b[l]=QI(s,h,g),d[o]=m,d._top=cg(d,a,!0,i.type),d._bottom=cg(d,a,!1,i.type);const _=d._visualValues||(d._visualValues={});_[o]=m}}function Sh(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function JI(e,t){return ji(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function ZI(e,t,n){return ji(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function jr(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const s of t){const r=s._stacks;if(!r||r[i]===void 0||r[i][n]===void 0)return;delete r[i][n],r[i]._visualValues!==void 0&&r[i]._visualValues[n]!==void 0&&delete r[i]._visualValues[n]}}}const kh=e=>e==="reset"||e==="none",hg=(e,t)=>t?e:Object.assign({},e),tP=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:Gb(n,!0),values:null};class Wi{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=xh(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&jr(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),s=(u,d,f,p)=>u==="x"?d:u==="r"?p:f,r=n.xAxisID=et(i.xAxisID,Sh(t,"x")),a=n.yAxisID=et(i.yAxisID,Sh(t,"y")),o=n.rAxisID=et(i.rAxisID,Sh(t,"r")),c=n.indexAxis,l=n.iAxisID=s(c,r,a,o),h=n.vAxisID=s(c,a,r,o);n.xScale=this.getScaleForId(r),n.yScale=this.getScaleForId(a),n.rScale=this.getScaleForId(o),n.iScale=this.getScaleForId(l),n.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&qp(this._data,this),t._stacked&&jr(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(rt(n)){const s=this._cachedMeta;this._data=YI(n,s)}else if(i!==n){if(i){qp(i,this);const s=this._cachedMeta;jr(s),s._parsed=[]}n&&Object.isExtensible(n)&&F$(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const r=n._stacked;n._stacked=xh(n.vScale,n),n.stack!==i.stack&&(s=!0,jr(n),n.stack=i.stack),this._resyncElements(t),(s||r!==n._stacked)&&(lg(this,n._parsed),n._stacked=xh(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:s}=this,{iScale:r,_stacked:a}=i,o=r.axis;let c=t===0&&n===s.length?!0:i._sorted,l=t>0&&i._parsed[t-1],h,u,d;if(this._parsing===!1)i._parsed=s,i._sorted=!0,d=s;else{At(s[t])?d=this.parseArrayData(i,s,t,n):rt(s[t])?d=this.parseObjectData(i,s,t,n):d=this.parsePrimitiveData(i,s,t,n);const f=()=>u[o]===null||l&&u[o]<l[o];for(h=0;h<n;++h)i._parsed[h+t]=u=d[h],c&&(f()&&(c=!1),l=u);i._sorted=c}a&&lg(this,d)}parsePrimitiveData(t,n,i,s){const{iScale:r,vScale:a}=t,o=r.axis,c=a.axis,l=r.getLabels(),h=r===a,u=new Array(s);let d,f,p;for(d=0,f=s;d<f;++d)p=d+i,u[d]={[o]:h||r.parse(l[p],p),[c]:a.parse(n[p],p)};return u}parseArrayData(t,n,i,s){const{xScale:r,yScale:a}=t,o=new Array(s);let c,l,h,u;for(c=0,l=s;c<l;++c)h=c+i,u=n[h],o[c]={x:r.parse(u[0],h),y:a.parse(u[1],h)};return o}parseObjectData(t,n,i,s){const{xScale:r,yScale:a}=t,{xAxisKey:o="x",yAxisKey:c="y"}=this._parsing,l=new Array(s);let h,u,d,f;for(h=0,u=s;h<u;++h)d=h+i,f=n[d],l[h]={x:r.parse(Ni(f,o),d),y:a.parse(Ni(f,c),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const s=this.chart,r=this._cachedMeta,a=n[t.axis],o={keys:Gb(s,!0),values:n._stacks[t.axis]._visualValues};return og(o,a,r.index,{mode:i})}updateRangeFromParsed(t,n,i,s){const r=i[n.axis];let a=r===null?NaN:r;const o=s&&i._stacks[n.axis];s&&o&&(s.values=o,a=og(s,r,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,n){const i=this._cachedMeta,s=i._parsed,r=i._sorted&&t===i.iScale,a=s.length,o=this._getOtherScale(t),c=tP(n,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:u}=GI(o);let d,f;function p(){f=s[d];const g=f[o.axis];return!Ht(f[t.axis])||h>g||u<g}for(d=0;d<a&&!(!p()&&(this.updateRangeFromParsed(l,t,f,c),r));++d);if(r){for(d=a-1;d>=0;--d)if(!p()){this.updateRangeFromParsed(l,t,f,c);break}}return l}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let s,r,a;for(s=0,r=n.length;s<r;++s)a=n[s][t.axis],Ht(a)&&i.push(a);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,s=n.vScale,r=this.getParsed(t);return{label:i?""+i.getLabelForValue(r[i.axis]):"",value:s?""+s.getLabelForValue(r[s.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=KI(et(this.options.clip,qI(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,s=i.data||[],r=n.chartArea,a=[],o=this._drawStart||0,c=this._drawCount||s.length-o,l=this.options.drawActiveElementsOnTop;let h;for(i.dataset&&i.dataset.draw(t,r,o,c),h=o;h<o+c;++h){const u=s[h];u.hidden||(u.active&&l?a.push(u):u.draw(t,r))}for(h=0;h<a.length;++h)a[h].draw(t,r)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const s=this.getDataset();let r;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];r=a.$context||(a.$context=ZI(this.getContext(),t,a)),r.parsed=this.getParsed(t),r.raw=s.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=JI(this.chart.getContext(),this.index)),r.dataset=s,r.index=r.datasetIndex=this.index;return r.active=!!n,r.mode=i,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const s=n==="active",r=this._cachedDataOpts,a=t+"-"+n,o=r[a],c=this.enableOptionSharing&&Ya(i);if(o)return hg(o,c);const l=this.chart.config,h=l.datasetElementScopeKeys(this._type,t),u=s?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),h),f=Object.keys(Rt.elements[t]),p=()=>this.getContext(i,s,n),g=l.resolveNamedOptions(d,f,p,u);return g.$shared&&(g.$shared=c,r[a]=Object.freeze(hg(g,c))),g}_resolveAnimations(t,n,i){const s=this.chart,r=this._cachedDataOpts,a=`animation-${n}`,o=r[a];if(o)return o;let c;if(s.options.animation!==!1){const h=this.chart.config,u=h.datasetAnimationScopeKeys(this._type,n),d=h.getOptionScopes(this.getDataset(),u);c=h.createResolver(d,this.getContext(t,i,n))}const l=new Xb(s,c&&c.animations);return c&&c._cacheable&&(r[a]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||kh(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),s=this._sharedOptions,r=this.getSharedOptions(i),a=this.includeOptions(n,r)||r!==s;return this.updateSharedOptions(r,n,i),{sharedOptions:r,includeOptions:a}}updateElement(t,n,i,s){kh(s)?Object.assign(t,i):this._resolveAnimations(n,s).update(t,i)}updateSharedOptions(t,n,i){t&&!kh(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,s){t.active=s;const r=this.getStyle(n,s);this._resolveAnimations(n,i,s).update(t,{options:!s&&this.getSharedOptions(r)||r})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[o,c,l]of this._syncList)this[o](c,l);this._syncList=[];const s=i.length,r=n.length,a=Math.min(r,s);a&&this.parse(0,a),r>s?this._insertElements(s,r-s,t):r<s&&this._removeElements(r,s-r)}_insertElements(t,n,i=!0){const s=this._cachedMeta,r=s.data,a=t+n;let o;const c=l=>{for(l.length+=n,o=l.length-1;o>=a;o--)l[o]=l[o-n]};for(c(r),o=t;o<a;++o)r[o]=new this.dataElementType;this._parsing&&c(s._parsed),this.parse(t,n),i&&this.updateElements(r,t,n,"reset")}updateElements(t,n,i,s){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,n);i._stacked&&jr(i,s)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,s]=t;this[n](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function eP(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let i=[];for(let s=0,r=n.length;s<r;s++)i=i.concat(n[s].controller.getAllParsedValues(e));e._cache.$bar=$b(i.sort((s,r)=>s-r))}return e._cache.$bar}function nP(e){const t=e.iScale,n=eP(t,e.type);let i=t._length,s,r,a,o;const c=()=>{a===32767||a===-32768||(Ya(o)&&(i=Math.min(i,Math.abs(a-o)||i)),o=a)};for(s=0,r=n.length;s<r;++s)a=t.getPixelForValue(n[s]),c();for(o=void 0,s=0,r=t.ticks.length;s<r;++s)a=t.getPixelForTick(s),c();return i}function iP(e,t,n,i){const s=n.barThickness;let r,a;return it(s)?(r=t.min*n.categoryPercentage,a=n.barPercentage):(r=s*i,a=1),{chunk:r/i,ratio:a,start:t.pixels[e]-r/2}}function sP(e,t,n,i){const s=t.pixels,r=s[e];let a=e>0?s[e-1]:null,o=e<s.length-1?s[e+1]:null;const c=n.categoryPercentage;a===null&&(a=r-(o===null?t.end-t.start:o-r)),o===null&&(o=r+r-a);const l=r-(r-Math.min(a,o))/2*c;return{chunk:Math.abs(o-a)/2*c/i,ratio:n.barPercentage,start:l}}function rP(e,t,n,i){const s=n.parse(e[0],i),r=n.parse(e[1],i),a=Math.min(s,r),o=Math.max(s,r);let c=a,l=o;Math.abs(a)>Math.abs(o)&&(c=o,l=a),t[n.axis]=l,t._custom={barStart:c,barEnd:l,start:s,end:r,min:a,max:o}}function Qb(e,t,n,i){return At(e)?rP(e,t,n,i):t[n.axis]=n.parse(e,i),t}function ug(e,t,n,i){const s=e.iScale,r=e.vScale,a=s.getLabels(),o=s===r,c=[];let l,h,u,d;for(l=n,h=n+i;l<h;++l)d=t[l],u={},u[s.axis]=o||s.parse(a[l],l),c.push(Qb(d,u,r,l));return c}function Ch(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function aP(e,t,n){return e!==0?En(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function oP(e){let t,n,i,s,r;return e.horizontal?(t=e.base>e.x,n="left",i="right"):(t=e.base<e.y,n="bottom",i="top"),t?(s="end",r="start"):(s="start",r="end"),{start:n,end:i,reverse:t,top:s,bottom:r}}function cP(e,t,n,i){let s=t.borderSkipped;const r={};if(!s){e.borderSkipped=r;return}if(s===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:o,reverse:c,top:l,bottom:h}=oP(e);s==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===i?s=l:(n._bottom||0)===i?s=h:(r[dg(h,a,o,c)]=!0,s=l)),r[dg(s,a,o,c)]=!0,e.borderSkipped=r}function dg(e,t,n,i){return i?(e=lP(e,t,n),e=fg(e,n,t)):e=fg(e,t,n),e}function lP(e,t,n){return e===t?n:e===n?t:e}function fg(e,t,n){return e==="start"?t:e==="end"?n:e}function hP(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class uP extends Wi{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,n,i,s){return ug(t,n,i,s)}parseArrayData(t,n,i,s){return ug(t,n,i,s)}parseObjectData(t,n,i,s){const{iScale:r,vScale:a}=t,{xAxisKey:o="x",yAxisKey:c="y"}=this._parsing,l=r.axis==="x"?o:c,h=a.axis==="x"?o:c,u=[];let d,f,p,g;for(d=i,f=i+s;d<f;++d)g=n[d],p={},p[r.axis]=r.parse(Ni(g,l),d),u.push(Qb(Ni(g,h),p,a,d));return u}updateRangeFromParsed(t,n,i,s){super.updateRangeFromParsed(t,n,i,s);const r=i._custom;r&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,r.min),t.max=Math.max(t.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:i,vScale:s}=n,r=this.getParsed(t),a=r._custom,o=Ch(a)?"["+a.start+", "+a.end+"]":""+s.getLabelForValue(r[s.axis]);return{label:""+i.getLabelForValue(r[i.axis]),value:o}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,i,s){const r=s==="reset",{index:a,_cachedMeta:{vScale:o}}=this,c=o.getBasePixel(),l=o.isHorizontal(),h=this._getRuler(),{sharedOptions:u,includeOptions:d}=this._getSharedOptions(n,s);for(let f=n;f<n+i;f++){const p=this.getParsed(f),g=r||it(p[o.axis])?{base:c,head:c}:this._calculateBarValuePixels(f),m=this._calculateBarIndexPixels(f,h),b=(p._stacks||{})[o.axis],_={horizontal:l,base:g.base,enableBorderRadius:!b||Ch(p._custom)||a===b._top||a===b._bottom,x:l?g.head:m.center,y:l?m.center:g.head,height:l?m.size:Math.abs(g.size),width:l?Math.abs(g.size):m.size};d&&(_.options=u||this.resolveDataElementOptions(f,t[f].active?"active":s));const w=_.options||t[f].options;cP(_,w,b,a),hP(_,w,h.ratio),this.updateElement(t[f],f,_,s)}}_getStacks(t,n){const{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),r=i.options.stacked,a=[],o=this._cachedMeta.controller.getParsed(n),c=o&&o[i.axis],l=h=>{const u=h._parsed.find(f=>f[i.axis]===c),d=u&&u[h.vScale.axis];if(it(d)||isNaN(d))return!0};for(const h of s)if(!(n!==void 0&&l(h))&&((r===!1||a.indexOf(h.stack)===-1||r===void 0&&h.stack===void 0)&&a.push(h.stack),h.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[et(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,i){const s=this._getStacks(t,i),r=n!==void 0?s.indexOf(n):-1;return r===-1?s.length-1:r}_getRuler(){const t=this.options,n=this._cachedMeta,i=n.iScale,s=[];let r,a;for(r=0,a=n.data.length;r<a;++r)s.push(i.getPixelForValue(this.getParsed(r)[i.axis],r));const o=t.barThickness;return{min:o||nP(n),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:o?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:i,index:s},options:{base:r,minBarLength:a}}=this,o=r||0,c=this.getParsed(t),l=c._custom,h=Ch(l);let u=c[n.axis],d=0,f=i?this.applyStack(n,c,i):u,p,g;f!==u&&(d=f-u,f=u),h&&(u=l.barStart,f=l.barEnd-l.barStart,u!==0&&En(u)!==En(l.barEnd)&&(d=0),d+=u);const m=!it(r)&&!h?r:d;let b=n.getPixelForValue(m);if(this.chart.getDataVisibility(t)?p=n.getPixelForValue(d+f):p=b,g=p-b,Math.abs(g)<a){g=aP(g,n,o)*a,u===o&&(b-=g/2);const _=n.getPixelForDecimal(0),w=n.getPixelForDecimal(1),C=Math.min(_,w),x=Math.max(_,w);b=Math.max(Math.min(b,x),C),p=b+g,i&&!h&&(c._stacks[n.axis]._visualValues[s]=n.getValueForPixel(p)-n.getValueForPixel(b))}if(b===n.getPixelForValue(o)){const _=En(g)*n.getLineWidthForValue(o)/2;b+=_,g-=_}return{size:g,base:b,head:p,center:p+g/2}}_calculateBarIndexPixels(t,n){const i=n.scale,s=this.options,r=s.skipNull,a=et(s.maxBarThickness,1/0);let o,c;const l=this._getAxisCount();if(n.grouped){const h=r?this._getStackCount(t):n.stackCount,u=s.barThickness==="flex"?sP(t,n,s,h*l):iP(t,n,s,h*l),d=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(et(d,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,r?t:void 0)+f;o=u.start+u.chunk*p+u.chunk/2,c=Math.min(a,u.chunk*u.ratio)}else o=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(a,n.min*n.ratio);return{base:o-c/2,head:o+c/2,center:o,size:c}}draw(){const t=this._cachedMeta,n=t.vScale,i=t.data,s=i.length;let r=0;for(;r<s;++r)this.getParsed(r)[n.axis]!==null&&!i[r].hidden&&i[r].draw(this._ctx)}}class dP extends Wi{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,i,s){const r=super.parsePrimitiveData(t,n,i,s);for(let a=0;a<r.length;a++)r[a]._custom=this.resolveDataElementOptions(a+i).radius;return r}parseArrayData(t,n,i,s){const r=super.parseArrayData(t,n,i,s);for(let a=0;a<r.length;a++){const o=n[i+a];r[a]._custom=et(o[2],this.resolveDataElementOptions(a+i).radius)}return r}parseObjectData(t,n,i,s){const r=super.parseObjectData(t,n,i,s);for(let a=0;a<r.length;a++){const o=n[i+a];r[a]._custom=et(o&&o.r&&+o.r,this.resolveDataElementOptions(a+i).radius)}return r}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let i=t.length-1;i>=0;--i)n=Math.max(n,t[i].size(this.resolveDataElementOptions(i))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=n,a=this.getParsed(t),o=s.getLabelForValue(a.x),c=r.getLabelForValue(a.y),l=a._custom;return{label:i[t]||"",value:"("+o+", "+c+(l?", "+l:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,i,s){const r=s==="reset",{iScale:a,vScale:o}=this._cachedMeta,{sharedOptions:c,includeOptions:l}=this._getSharedOptions(n,s),h=a.axis,u=o.axis;for(let d=n;d<n+i;d++){const f=t[d],p=!r&&this.getParsed(d),g={},m=g[h]=r?a.getPixelForDecimal(.5):a.getPixelForValue(p[h]),b=g[u]=r?o.getBasePixel():o.getPixelForValue(p[u]);g.skip=isNaN(m)||isNaN(b),l&&(g.options=c||this.resolveDataElementOptions(d,f.active?"active":s),r&&(g.options.radius=0)),this.updateElement(f,d,g,s)}}resolveDataElementOptions(t,n){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,n);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const r=s.radius;return n!=="active"&&(s.radius=0),s.radius+=et(i&&i._custom,r),s}}function fP(e,t,n){let i=1,s=1,r=0,a=0;if(t<It){const o=e,c=o+t,l=Math.cos(o),h=Math.sin(o),u=Math.cos(c),d=Math.sin(c),f=(w,C,x)=>Xa(w,o,c,!0)?1:Math.max(C,C*n,x,x*n),p=(w,C,x)=>Xa(w,o,c,!0)?-1:Math.min(C,C*n,x,x*n),g=f(0,l,u),m=f(Vt,h,d),b=p(ht,l,u),_=p(ht+Vt,h,d);i=(g-b)/2,s=(m-_)/2,r=-(g+b)/2,a=-(m+_)/2}return{ratioX:i,ratioY:s,offsetX:r,offsetY:a}}class Vd extends Wi{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:i,textAlign:s,color:r,useBorderRadius:a,borderRadius:o}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((c,l)=>{const u=t.getDatasetMeta(0).controller.getStyle(l);return{text:c,fillStyle:u.backgroundColor,fontColor:r,hidden:!t.getDataVisibility(l),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:s,pointStyle:i,borderRadius:a&&(o||u.borderRadius),index:l}}):[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}}};constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let r=c=>+i[c];if(rt(i[t])){const{key:c="value"}=this._parsing;r=l=>+Ni(i[l],c)}let a,o;for(a=t,o=t+n;a<o;++a)s._parsed[a]=r(a)}}_getRotation(){return dn(this.options.rotation-90)}_getCircumference(){return dn(this.options.circumference)}_getRotationExtents(){let t=It,n=-It;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,r=s._getRotation(),a=s._getCircumference();t=Math.min(t,r),n=Math.max(n,r+a)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:i}=n,s=this._cachedMeta,r=s.data,a=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,o=Math.max((Math.min(i.width,i.height)-a)/2,0),c=Math.min(S$(this.options.cutout,o),1),l=this._getRingWeight(this.index),{circumference:h,rotation:u}=this._getRotationExtents(),{ratioX:d,ratioY:f,offsetX:p,offsetY:g}=fP(u,h,c),m=(i.width-a)/d,b=(i.height-a)/f,_=Math.max(Math.min(m,b)/2,0),w=kb(this.options.radius,_),C=Math.max(w*c,0),x=(w-C)/this._getVisibleDatasetWeightTotal();this.offsetX=p*w,this.offsetY=g*w,s.total=this.calculateTotal(),this.outerRadius=w-x*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-x*l,0),this.updateElements(r,0,r.length,t)}_circumference(t,n){const i=this.options,s=this._cachedMeta,r=this._getCircumference();return n&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*r/It)}updateElements(t,n,i,s){const r=s==="reset",a=this.chart,o=a.chartArea,l=a.options.animation,h=(o.left+o.right)/2,u=(o.top+o.bottom)/2,d=r&&l.animateScale,f=d?0:this.innerRadius,p=d?0:this.outerRadius,{sharedOptions:g,includeOptions:m}=this._getSharedOptions(n,s);let b=this._getRotation(),_;for(_=0;_<n;++_)b+=this._circumference(_,r);for(_=n;_<n+i;++_){const w=this._circumference(_,r),C=t[_],x={x:h+this.offsetX,y:u+this.offsetY,startAngle:b,endAngle:b+w,circumference:w,outerRadius:p,innerRadius:f};m&&(x.options=g||this.resolveDataElementOptions(_,C.active?"active":s)),b+=w,this.updateElement(C,_,x,s)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let i=0,s;for(s=0;s<n.length;s++){const r=t._parsed[s];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(s)&&!n[s].hidden&&(i+=Math.abs(r))}return i}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?It*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=mo(n._parsed[t],i.options.locale);return{label:s[t]||"",value:r}}getMaxBorderWidth(t){let n=0;const i=this.chart;let s,r,a,o,c;if(!t){for(s=0,r=i.data.datasets.length;s<r;++s)if(i.isDatasetVisible(s)){a=i.getDatasetMeta(s),t=a.data,o=a.controller;break}}if(!t)return 0;for(s=0,r=t.length;s<r;++s)c=o.resolveDataElementOptions(s),c.borderAlign!=="inner"&&(n=Math.max(n,c.borderWidth||0,c.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let i=0,s=t.length;i<s;++i){const r=this.resolveDataElementOptions(i);n=Math.max(n,r.offset||0,r.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(n+=this._getRingWeight(i));return n}_getRingWeight(t){return Math.max(et(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class pP extends Wi{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:s=[],_dataset:r}=n,a=this.chart._animationsDisabled;let{start:o,count:c}=Ob(n,s,a);this._drawStart=o,this._drawCount=c,Tb(n)&&(o=0,c=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!r._decimated,i.points=s;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!a,options:l},t),this.updateElements(s,o,c,t)}updateElements(t,n,i,s){const r=s==="reset",{iScale:a,vScale:o,_stacked:c,_dataset:l}=this._cachedMeta,{sharedOptions:h,includeOptions:u}=this._getSharedOptions(n,s),d=a.axis,f=o.axis,{spanGaps:p,segment:g}=this.options,m=wr(p)?p:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||r||s==="none",_=n+i,w=t.length;let C=n>0&&this.getParsed(n-1);for(let x=0;x<w;++x){const E=t[x],M=b?E:{};if(x<n||x>=_){M.skip=!0;continue}const v=this.getParsed(x),y=it(v[f]),S=M[d]=a.getPixelForValue(v[d],x),$=M[f]=r||y?o.getBasePixel():o.getPixelForValue(c?this.applyStack(o,v,c):v[f],x);M.skip=isNaN(S)||isNaN($)||y,M.stop=x>0&&Math.abs(v[d]-C[d])>m,g&&(M.parsed=v,M.raw=l.data[x]),u&&(M.options=h||this.resolveDataElementOptions(x,E.active?"active":s)),b||this.updateElement(E,x,M,s),C=v}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const r=s[0].size(this.resolveDataElementOptions(0)),a=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,r,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}class Jb extends Wi{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return n.labels.map((r,a)=>{const c=t.getDatasetMeta(0).controller.getStyle(a);return{text:r,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:s,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=mo(n._parsed[t].r,i.options.locale);return{label:s[t]||"",value:r}}parseObjectData(t,n,i,s){return jb.bind(this)(t,n,i,s)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,s)=>{const r=this.getParsed(s).r;!isNaN(r)&&this.chart.getDataVisibility(s)&&(r<n.min&&(n.min=r),r>n.max&&(n.max=r))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,i=t.options,s=Math.min(n.right-n.left,n.bottom-n.top),r=Math.max(s/2,0),a=Math.max(i.cutoutPercentage?r/100*i.cutoutPercentage:1,0),o=(r-a)/t.getVisibleDatasetCount();this.outerRadius=r-o*this.index,this.innerRadius=this.outerRadius-o}updateElements(t,n,i,s){const r=s==="reset",a=this.chart,c=a.options.animation,l=this._cachedMeta.rScale,h=l.xCenter,u=l.yCenter,d=l.getIndexAngle(0)-.5*ht;let f=d,p;const g=360/this.countVisibleElements();for(p=0;p<n;++p)f+=this._computeAngle(p,s,g);for(p=n;p<n+i;p++){const m=t[p];let b=f,_=f+this._computeAngle(p,s,g),w=a.getDataVisibility(p)?l.getDistanceFromCenterForValue(this.getParsed(p).r):0;f=_,r&&(c.animateScale&&(w=0),c.animateRotate&&(b=_=d));const C={x:h,y:u,innerRadius:0,outerRadius:w,startAngle:b,endAngle:_,options:this.resolveDataElementOptions(p,m.active?"active":s)};this.updateElement(m,p,C,s)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((i,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&n++}),n}_computeAngle(t,n,i){return this.chart.getDataVisibility(t)?dn(this.resolveDataElementOptions(t,n).angle||i):0}}class gP extends Vd{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}class mP extends Wi{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const n=this._cachedMeta.vScale,i=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(i[n.axis])}}parseObjectData(t,n,i,s){return jb.bind(this)(t,n,i,s)}update(t){const n=this._cachedMeta,i=n.dataset,s=n.data||[],r=n.iScale.getLabels();if(i.points=s,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const o={_loop:!0,_fullLoop:r.length===s.length,options:a};this.updateElement(i,void 0,o,t)}this.updateElements(s,0,s.length,t)}updateElements(t,n,i,s){const r=this._cachedMeta.rScale,a=s==="reset";for(let o=n;o<n+i;o++){const c=t[o],l=this.resolveDataElementOptions(o,c.active?"active":s),h=r.getPointPositionForValue(o,this.getParsed(o).r),u=a?r.xCenter:h.x,d=a?r.yCenter:h.y,f={x:u,y:d,angle:h.angle,skip:isNaN(u)||isNaN(d),options:l};this.updateElement(c,o,f,s)}}}class vP extends Wi{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=n,a=this.getParsed(t),o=s.getLabelForValue(a.x),c=r.getLabelForValue(a.y);return{label:i[t]||"",value:"("+o+", "+c+")"}}update(t){const n=this._cachedMeta,{data:i=[]}=n,s=this.chart._animationsDisabled;let{start:r,count:a}=Ob(n,i,s);if(this._drawStart=r,this._drawCount=a,Tb(n)&&(r=0,a=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:o,_dataset:c}=n;o._chart=this.chart,o._datasetIndex=this.index,o._decimated=!!c._decimated,o.points=i;const l=this.resolveDatasetElementOptions(t);l.segment=this.options.segment,this.updateElement(o,void 0,{animated:!s,options:l},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(i,r,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,i,s){const r=s==="reset",{iScale:a,vScale:o,_stacked:c,_dataset:l}=this._cachedMeta,h=this.resolveDataElementOptions(n,s),u=this.getSharedOptions(h),d=this.includeOptions(s,u),f=a.axis,p=o.axis,{spanGaps:g,segment:m}=this.options,b=wr(g)?g:Number.POSITIVE_INFINITY,_=this.chart._animationsDisabled||r||s==="none";let w=n>0&&this.getParsed(n-1);for(let C=n;C<n+i;++C){const x=t[C],E=this.getParsed(C),M=_?x:{},v=it(E[p]),y=M[f]=a.getPixelForValue(E[f],C),S=M[p]=r||v?o.getBasePixel():o.getPixelForValue(c?this.applyStack(o,E,c):E[p],C);M.skip=isNaN(y)||isNaN(S)||v,M.stop=C>0&&Math.abs(E[f]-w[f])>b,m&&(M.parsed=E,M.raw=l.data[C]),d&&(M.options=u||this.resolveDataElementOptions(C,x.active?"active":s)),_||this.updateElement(x,C,M,s),w=E}this.updateSharedOptions(u,s,h)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let o=0;for(let c=n.length-1;c>=0;--c)o=Math.max(o,n[c].size(this.resolveDataElementOptions(c))/2);return o>0&&o}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!n.length)return s;const r=n[0].size(this.resolveDataElementOptions(0)),a=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(s,r,a)/2}}var bP=Object.freeze({__proto__:null,BarController:uP,BubbleController:dP,DoughnutController:Vd,LineController:pP,PieController:gP,PolarAreaController:Jb,RadarController:mP,ScatterController:vP});function Zi(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Ud{static override(t){Object.assign(Ud.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return Zi()}parse(){return Zi()}format(){return Zi()}add(){return Zi()}diff(){return Zi()}startOf(){return Zi()}endOf(){return Zi()}}var _P={_date:Ud};function yP(e,t,n,i){const{controller:s,data:r,_sorted:a}=e,o=s._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(o&&t===o.axis&&t!=="r"&&a&&r.length){const l=o._reversePixels?L$:Kn;if(i){if(s._sharedOptions){const h=r[0],u=typeof h.getRange=="function"&&h.getRange(t);if(u){const d=l(r,t,n-u),f=l(r,t,n+u);return{lo:d.lo,hi:f.hi}}}}else{const h=l(r,t,n);if(c){const{vScale:u}=s._cachedMeta,{_parsed:d}=e,f=d.slice(0,h.lo+1).reverse().findIndex(g=>!it(g[u.axis]));h.lo-=Math.max(0,f);const p=d.slice(h.hi).findIndex(g=>!it(g[u.axis]));h.hi+=Math.max(0,p)}return h}}return{lo:0,hi:r.length-1}}function Dl(e,t,n,i,s){const r=e.getSortedVisibleDatasetMetas(),a=n[t];for(let o=0,c=r.length;o<c;++o){const{index:l,data:h}=r[o],{lo:u,hi:d}=yP(r[o],t,a,s);for(let f=u;f<=d;++f){const p=h[f];p.skip||i(p,l,f)}}}function wP(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,s){const r=t?Math.abs(i.x-s.x):0,a=n?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(a,2))}}function Mh(e,t,n,i,s){const r=[];return!s&&!e.isPointInArea(t)||Dl(e,n,t,function(o,c,l){!s&&!Yn(o,e.chartArea,0)||o.inRange(t.x,t.y,i)&&r.push({element:o,datasetIndex:c,index:l})},!0),r}function xP(e,t,n,i){let s=[];function r(a,o,c){const{startAngle:l,endAngle:h}=a.getProps(["startAngle","endAngle"],i),{angle:u}=Eb(a,{x:t.x,y:t.y});Xa(u,l,h)&&s.push({element:a,datasetIndex:o,index:c})}return Dl(e,n,t,r),s}function SP(e,t,n,i,s,r){let a=[];const o=wP(n);let c=Number.POSITIVE_INFINITY;function l(h,u,d){const f=h.inRange(t.x,t.y,s);if(i&&!f)return;const p=h.getCenterPoint(s);if(!(!!r||e.isPointInArea(p))&&!f)return;const m=o(t,p);m<c?(a=[{element:h,datasetIndex:u,index:d}],c=m):m===c&&a.push({element:h,datasetIndex:u,index:d})}return Dl(e,n,t,l),a}function Eh(e,t,n,i,s,r){return!r&&!e.isPointInArea(t)?[]:n==="r"&&!i?xP(e,t,n,s):SP(e,t,n,i,s,r)}function pg(e,t,n,i,s){const r=[],a=n==="x"?"inXRange":"inYRange";let o=!1;return Dl(e,n,t,(c,l,h)=>{c[a]&&c[a](t[n],s)&&(r.push({element:c,datasetIndex:l,index:h}),o=o||c.inRange(t.x,t.y,s))}),i&&!o?[]:r}var kP={modes:{index(e,t,n,i){const s=rs(t,e),r=n.axis||"x",a=n.includeInvisible||!1,o=n.intersect?Mh(e,s,r,i,a):Eh(e,s,r,!1,i,a),c=[];return o.length?(e.getSortedVisibleDatasetMetas().forEach(l=>{const h=o[0].index,u=l.data[h];u&&!u.skip&&c.push({element:u,datasetIndex:l.index,index:h})}),c):[]},dataset(e,t,n,i){const s=rs(t,e),r=n.axis||"xy",a=n.includeInvisible||!1;let o=n.intersect?Mh(e,s,r,i,a):Eh(e,s,r,!1,i,a);if(o.length>0){const c=o[0].datasetIndex,l=e.getDatasetMeta(c).data;o=[];for(let h=0;h<l.length;++h)o.push({element:l[h],datasetIndex:c,index:h})}return o},point(e,t,n,i){const s=rs(t,e),r=n.axis||"xy",a=n.includeInvisible||!1;return Mh(e,s,r,i,a)},nearest(e,t,n,i){const s=rs(t,e),r=n.axis||"xy",a=n.includeInvisible||!1;return Eh(e,s,r,n.intersect,i,a)},x(e,t,n,i){const s=rs(t,e);return pg(e,s,"x",n.intersect,i)},y(e,t,n,i){const s=rs(t,e);return pg(e,s,"y",n.intersect,i)}}};const Zb=["left","top","right","bottom"];function Wr(e,t){return e.filter(n=>n.pos===t)}function gg(e,t){return e.filter(n=>Zb.indexOf(n.pos)===-1&&n.box.axis===t)}function Hr(e,t){return e.sort((n,i)=>{const s=t?i:n,r=t?n:i;return s.weight===r.weight?s.index-r.index:s.weight-r.weight})}function CP(e){const t=[];let n,i,s,r,a,o;for(n=0,i=(e||[]).length;n<i;++n)s=e[n],{position:r,options:{stack:a,stackWeight:o=1}}=s,t.push({index:n,box:s,pos:r,horizontal:s.isHorizontal(),weight:s.weight,stack:a&&r+a,stackWeight:o});return t}function MP(e){const t={};for(const n of e){const{stack:i,pos:s,stackWeight:r}=n;if(!i||!Zb.includes(s))continue;const a=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=r}return t}function EP(e,t){const n=MP(e),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let r,a,o;for(r=0,a=e.length;r<a;++r){o=e[r];const{fullSize:c}=o.box,l=n[o.stack],h=l&&o.stackWeight/l.weight;o.horizontal?(o.width=h?h*i:c&&t.availableWidth,o.height=s):(o.width=i,o.height=h?h*s:c&&t.availableHeight)}return n}function DP(e){const t=CP(e),n=Hr(t.filter(l=>l.box.fullSize),!0),i=Hr(Wr(t,"left"),!0),s=Hr(Wr(t,"right")),r=Hr(Wr(t,"top"),!0),a=Hr(Wr(t,"bottom")),o=gg(t,"x"),c=gg(t,"y");return{fullSize:n,leftAndTop:i.concat(r),rightAndBottom:s.concat(c).concat(a).concat(o),chartArea:Wr(t,"chartArea"),vertical:i.concat(s).concat(c),horizontal:r.concat(a).concat(o)}}function mg(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function t_(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function $P(e,t,n,i){const{pos:s,box:r}=n,a=e.maxPadding;if(!rt(s)){n.size&&(e[s]-=n.size);const u=i[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?r.height:r.width),n.size=u.size/u.count,e[s]+=n.size}r.getPadding&&t_(a,r.getPadding());const o=Math.max(0,t.outerWidth-mg(a,e,"left","right")),c=Math.max(0,t.outerHeight-mg(a,e,"top","bottom")),l=o!==e.w,h=c!==e.h;return e.w=o,e.h=c,n.horizontal?{same:l,other:h}:{same:h,other:l}}function IP(e){const t=e.maxPadding;function n(i){const s=Math.max(t[i]-e[i],0);return e[i]+=s,s}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function PP(e,t){const n=t.maxPadding;function i(s){const r={left:0,top:0,right:0,bottom:0};return s.forEach(a=>{r[a]=Math.max(t[a],n[a])}),r}return i(e?["left","right"]:["top","bottom"])}function ia(e,t,n,i){const s=[];let r,a,o,c,l,h;for(r=0,a=e.length,l=0;r<a;++r){o=e[r],c=o.box,c.update(o.width||t.w,o.height||t.h,PP(o.horizontal,t));const{same:u,other:d}=$P(t,n,o,i);l|=u&&s.length,h=h||d,c.fullSize||s.push(o)}return l&&ia(s,t,n,i)||h}function No(e,t,n,i,s){e.top=n,e.left=t,e.right=t+i,e.bottom=n+s,e.width=i,e.height=s}function vg(e,t,n,i){const s=n.padding;let{x:r,y:a}=t;for(const o of e){const c=o.box,l=i[o.stack]||{placed:0,weight:1},h=o.stackWeight/l.weight||1;if(o.horizontal){const u=t.w*h,d=l.size||c.height;Ya(l.start)&&(a=l.start),c.fullSize?No(c,s.left,a,n.outerWidth-s.right-s.left,d):No(c,t.left+l.placed,a,u,d),l.start=a,l.placed+=u,a=c.bottom}else{const u=t.h*h,d=l.size||c.width;Ya(l.start)&&(r=l.start),c.fullSize?No(c,r,s.top,d,n.outerHeight-s.bottom-s.top):No(c,r,t.top+l.placed,d,u),l.start=r,l.placed+=u,r=c.right}}t.x=r,t.y=a}var be={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const s=ye(e.options.layout.padding),r=Math.max(t-s.width,0),a=Math.max(n-s.height,0),o=DP(e.boxes),c=o.vertical,l=o.horizontal;bt(e.boxes,g=>{typeof g.beforeLayout=="function"&&g.beforeLayout()});const h=c.reduce((g,m)=>m.box.options&&m.box.options.display===!1?g:g+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:s,availableWidth:r,availableHeight:a,vBoxMaxWidth:r/2/h,hBoxMaxHeight:a/2}),d=Object.assign({},s);t_(d,ye(i));const f=Object.assign({maxPadding:d,w:r,h:a,x:s.left,y:s.top},s),p=EP(c.concat(l),u);ia(o.fullSize,f,u,p),ia(c,f,u,p),ia(l,f,u,p)&&ia(c,f,u,p),IP(f),vg(o.leftAndTop,f,u,p),f.x+=f.w,f.y+=f.h,vg(o.rightAndBottom,f,u,p),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},bt(o.chartArea,g=>{const m=g.box;Object.assign(m,e.chartArea),m.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class e_{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,s){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,s?Math.floor(n/s):i)}}isAttached(t){return!0}updateConfig(t){}}class OP extends e_{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const sc="$chartjs",TP={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},bg=e=>e===null||e==="";function AP(e,t){const n=e.style,i=e.getAttribute("height"),s=e.getAttribute("width");if(e[sc]={initial:{height:i,width:s,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",bg(s)){const r=eg(e,"width");r!==void 0&&(e.width=r)}if(bg(i))if(e.style.height==="")e.height=e.width/(t||2);else{const r=eg(e,"height");r!==void 0&&(e.height=r)}return e}const n_=$I?{passive:!0}:!1;function RP(e,t,n){e&&e.addEventListener(t,n,n_)}function LP(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,n_)}function NP(e,t){const n=TP[e.type]||e.type,{x:i,y:s}=rs(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:s!==void 0?s:null}}function Jc(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function FP(e,t,n){const i=e.canvas,s=new MutationObserver(r=>{let a=!1;for(const o of r)a=a||Jc(o.addedNodes,i),a=a&&!Jc(o.removedNodes,i);a&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}function BP(e,t,n){const i=e.canvas,s=new MutationObserver(r=>{let a=!1;for(const o of r)a=a||Jc(o.removedNodes,i),a=a&&!Jc(o.addedNodes,i);a&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}const Qa=new Map;let _g=0;function i_(){const e=window.devicePixelRatio;e!==_g&&(_g=e,Qa.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function zP(e,t){Qa.size||window.addEventListener("resize",i_),Qa.set(e,t)}function jP(e){Qa.delete(e),Qa.size||window.removeEventListener("resize",i_)}function WP(e,t,n){const i=e.canvas,s=i&&Hd(i);if(!s)return;const r=Pb((o,c)=>{const l=s.clientWidth;n(o,c),l<s.clientWidth&&n()},window),a=new ResizeObserver(o=>{const c=o[0],l=c.contentRect.width,h=c.contentRect.height;l===0&&h===0||r(l,h)});return a.observe(s),zP(e,r),a}function Dh(e,t,n){n&&n.disconnect(),t==="resize"&&jP(e)}function HP(e,t,n){const i=e.canvas,s=Pb(r=>{e.ctx!==null&&n(NP(r,e))},e);return RP(i,t,s),s}class VP extends e_{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(AP(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[sc])return!1;const i=n[sc].initial;["height","width"].forEach(r=>{const a=i[r];it(a)?n.removeAttribute(r):n.setAttribute(r,a)});const s=i.style||{};return Object.keys(s).forEach(r=>{n.style[r]=s[r]}),n.width=n.width,delete n[sc],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const s=t.$proxies||(t.$proxies={}),a={attach:FP,detach:BP,resize:WP}[n]||HP;s[n]=a(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),s=i[n];if(!s)return;({attach:Dh,detach:Dh,resize:Dh}[n]||LP)(t,n,s),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,s){return DI(t,n,i,s)}isAttached(t){const n=t&&Hd(t);return!!(n&&n.isConnected)}}function UP(e){return!Wd()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?OP:VP}class fi{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return wr(this.x)&&wr(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const s={};return t.forEach(r=>{s[r]=i[r]&&i[r].active()?i[r]._to:this[r]}),s}}function qP(e,t){const n=e.options.ticks,i=KP(e),s=Math.min(n.maxTicksLimit||i,i),r=n.major.enabled?XP(t):[],a=r.length,o=r[0],c=r[a-1],l=[];if(a>s)return GP(t,l,r,a/s),l;const h=YP(r,t,s);if(a>0){let u,d;const f=a>1?Math.round((c-o)/(a-1)):null;for(Fo(t,l,h,it(f)?0:o-f,o),u=0,d=a-1;u<d;u++)Fo(t,l,h,r[u],r[u+1]);return Fo(t,l,h,c,it(f)?t.length:c+f),l}return Fo(t,l,h),l}function KP(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),s=e._maxLength/n;return Math.floor(Math.min(i,s))}function YP(e,t,n){const i=QP(e),s=t.length/n;if(!i)return Math.max(s,1);const r=P$(i);for(let a=0,o=r.length-1;a<o;a++){const c=r[a];if(c>s)return c}return Math.max(s,1)}function XP(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function GP(e,t,n,i){let s=0,r=n[0],a;for(i=Math.ceil(i),a=0;a<e.length;a++)a===r&&(t.push(e[a]),s++,r=n[s*i])}function Fo(e,t,n,i,s){const r=et(i,0),a=Math.min(et(s,e.length),e.length);let o=0,c,l,h;for(n=Math.ceil(n),s&&(c=s-i,n=c/Math.floor(c/n)),h=r;h<0;)o++,h=Math.round(r+o*n);for(l=Math.max(r,0);l<a;l++)l===h&&(t.push(e[l]),o++,h=Math.round(r+o*n))}function QP(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const JP=e=>e==="left"?"right":e==="right"?"left":e,yg=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,wg=(e,t)=>Math.min(t||e,e);function xg(e,t){const n=[],i=e.length/t,s=e.length;let r=0;for(;r<s;r+=i)n.push(e[Math.floor(r)]);return n}function ZP(e,t,n){const i=e.ticks.length,s=Math.min(t,i-1),r=e._startPixel,a=e._endPixel,o=1e-6;let c=e.getPixelForTick(s),l;if(!(n&&(i===1?l=Math.max(c-r,a-c):t===0?l=(e.getPixelForTick(1)-c)/2:l=(c-e.getPixelForTick(s-1))/2,c+=s<t?l:-l,c<r-o||c>a+o)))return c}function tO(e,t){bt(e,n=>{const i=n.gc,s=i.length/2;let r;if(s>t){for(r=0;r<s;++r)delete n.data[i[r]];i.splice(0,s)}})}function Vr(e){return e.drawTicks?e.tickLength:0}function Sg(e,t){if(!e.display)return 0;const n=Jt(e.font,t),i=ye(e.padding);return(At(e.text)?e.text.length:1)*n.lineHeight+i.height}function eO(e,t){return ji(e,{scale:t,type:"scale"})}function nO(e,t,n){return ji(e,{tick:n,index:t,type:"tick"})}function iO(e,t,n){let i=Ld(e);return(n&&t!=="right"||!n&&t==="right")&&(i=JP(i)),i}function sO(e,t,n,i){const{top:s,left:r,bottom:a,right:o,chart:c}=e,{chartArea:l,scales:h}=c;let u=0,d,f,p;const g=a-s,m=o-r;if(e.isHorizontal()){if(f=me(i,r,o),rt(n)){const b=Object.keys(n)[0],_=n[b];p=h[b].getPixelForValue(_)+g-t}else n==="center"?p=(l.bottom+l.top)/2+g-t:p=yg(e,n,t);d=o-r}else{if(rt(n)){const b=Object.keys(n)[0],_=n[b];f=h[b].getPixelForValue(_)-m+t}else n==="center"?f=(l.left+l.right)/2-m+t:f=yg(e,n,t);p=me(i,a,s),u=n==="left"?-Vt:Vt}return{titleX:f,titleY:p,maxWidth:d,rotation:u}}class zs extends fi{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:s}=this;return t=Ne(t,Number.POSITIVE_INFINITY),n=Ne(n,Number.NEGATIVE_INFINITY),i=Ne(i,Number.POSITIVE_INFINITY),s=Ne(s,Number.NEGATIVE_INFINITY),{min:Ne(t,i),max:Ne(n,s),minDefined:Ht(t),maxDefined:Ht(n)}}getMinMax(t){let{min:n,max:i,minDefined:s,maxDefined:r}=this.getUserBounds(),a;if(s&&r)return{min:n,max:i};const o=this.getMatchingVisibleMetas();for(let c=0,l=o.length;c<l;++c)a=o[c].controller.getMinMax(this,t),s||(n=Math.min(n,a.min)),r||(i=Math.max(i,a.max));return n=r&&n>i?i:n,i=s&&n>i?n:i,{min:Ne(n,Ne(i,n)),max:Ne(i,Ne(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Et(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:s,grace:r,ticks:a}=this.options,o=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=aI(this,r,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=o<this.ticks.length;this._convertTicksToLabels(c?xg(this.ticks,o):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=qP(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Et(this.options.afterUpdate,[this])}beforeSetDimensions(){Et(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Et(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),Et(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Et(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,s,r;for(i=0,s=t.length;i<s;i++)r=t[i],r.label=Et(n.callback,[r.value,i,t],this)}afterTickToLabelConversion(){Et(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Et(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=wg(this.ticks.length,t.ticks.maxTicksLimit),s=n.minRotation||0,r=n.maxRotation;let a=s,o,c,l;if(!this._isVisible()||!n.display||s>=r||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const h=this._getLabelSizes(),u=h.widest.width,d=h.highest.height,f=se(this.chart.width-u,0,this.maxWidth);o=t.offset?this.maxWidth/i:f/(i-1),u+6>o&&(o=f/(i-(t.offset?.5:1)),c=this.maxHeight-Vr(t.grid)-n.padding-Sg(t.title,this.chart.options.font),l=Math.sqrt(u*u+d*d),a=Ad(Math.min(Math.asin(se((h.highest.height+6)/o,-1,1)),Math.asin(se(c/l,-1,1))-Math.asin(se(d/l,-1,1)))),a=Math.max(s,Math.min(r,a))),this.labelRotation=a}afterCalculateLabelRotation(){Et(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Et(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:s,grid:r}}=this,a=this._isVisible(),o=this.isHorizontal();if(a){const c=Sg(s,n.options.font);if(o?(t.width=this.maxWidth,t.height=Vr(r)+c):(t.height=this.maxHeight,t.width=Vr(r)+c),i.display&&this.ticks.length){const{first:l,last:h,widest:u,highest:d}=this._getLabelSizes(),f=i.padding*2,p=dn(this.labelRotation),g=Math.cos(p),m=Math.sin(p);if(o){const b=i.mirror?0:m*u.width+g*d.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=i.mirror?0:g*u.width+m*d.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(l,h,m,g)}}this._handleMargins(),o?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,s){const{ticks:{align:r,padding:a},position:o}=this.options,c=this.labelRotation!==0,l=o!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let d=0,f=0;c?l?(d=s*t.width,f=i*n.height):(d=i*t.height,f=s*n.width):r==="start"?f=n.width:r==="end"?d=t.width:r!=="inner"&&(d=t.width/2,f=n.width/2),this.paddingLeft=Math.max((d-h+a)*this.width/(this.width-h),0),this.paddingRight=Math.max((f-u+a)*this.width/(this.width-u),0)}else{let h=n.height/2,u=t.height/2;r==="start"?(h=0,u=t.height):r==="end"&&(h=n.height,u=0),this.paddingTop=h+a,this.paddingBottom=u+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Et(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)it(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=xg(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:s,_longestTextCache:r}=this,a=[],o=[],c=Math.floor(n/wg(n,i));let l=0,h=0,u,d,f,p,g,m,b,_,w,C,x;for(u=0;u<n;u+=c){if(p=t[u].label,g=this._resolveTickFontOptions(u),s.font=m=g.string,b=r[m]=r[m]||{data:{},gc:[]},_=g.lineHeight,w=C=0,!it(p)&&!At(p))w=Gc(s,b.data,b.gc,w,p),C=_;else if(At(p))for(d=0,f=p.length;d<f;++d)x=p[d],!it(x)&&!At(x)&&(w=Gc(s,b.data,b.gc,w,x),C+=_);a.push(w),o.push(C),l=Math.max(w,l),h=Math.max(C,h)}tO(r,n);const E=a.indexOf(l),M=o.indexOf(h),v=y=>({width:a[y]||0,height:o[y]||0});return{first:v(0),last:v(n-1),widest:v(E),highest:v(M),widths:a,heights:o}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return R$(this._alignToPixels?Ji(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=nO(this.getContext(),t,i))}return this.$context||(this.$context=eO(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=dn(this.labelRotation),i=Math.abs(Math.cos(n)),s=Math.abs(Math.sin(n)),r=this._getLabelSizes(),a=t.autoSkipPadding||0,o=r?r.widest.width+a:0,c=r?r.highest.height+a:0;return this.isHorizontal()?c*i>o*s?o/i:c/s:c*s<o*i?c/i:o/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,s=this.options,{grid:r,position:a,border:o}=s,c=r.offset,l=this.isHorizontal(),u=this.ticks.length+(c?1:0),d=Vr(r),f=[],p=o.setContext(this.getContext()),g=p.display?p.width:0,m=g/2,b=function(W){return Ji(i,W,g)};let _,w,C,x,E,M,v,y,S,$,D,O;if(a==="top")_=b(this.bottom),M=this.bottom-d,y=_-m,$=b(t.top)+m,O=t.bottom;else if(a==="bottom")_=b(this.top),$=t.top,O=b(t.bottom)-m,M=_+m,y=this.top+d;else if(a==="left")_=b(this.right),E=this.right-d,v=_-m,S=b(t.left)+m,D=t.right;else if(a==="right")_=b(this.left),S=t.left,D=b(t.right)-m,E=_+m,v=this.left+d;else if(n==="x"){if(a==="center")_=b((t.top+t.bottom)/2+.5);else if(rt(a)){const W=Object.keys(a)[0],R=a[W];_=b(this.chart.scales[W].getPixelForValue(R))}$=t.top,O=t.bottom,M=_+m,y=M+d}else if(n==="y"){if(a==="center")_=b((t.left+t.right)/2);else if(rt(a)){const W=Object.keys(a)[0],R=a[W];_=b(this.chart.scales[W].getPixelForValue(R))}E=_-m,v=E-d,S=t.left,D=t.right}const B=et(s.ticks.maxTicksLimit,u),N=Math.max(1,Math.ceil(u/B));for(w=0;w<u;w+=N){const W=this.getContext(w),R=r.setContext(W),H=o.setContext(W),A=R.lineWidth,z=R.color,L=H.dash||[],j=H.dashOffset,P=R.tickWidth,J=R.tickColor,lt=R.tickBorderDash||[],St=R.tickBorderDashOffset;C=ZP(this,w,c),C!==void 0&&(x=Ji(i,C,A),l?E=v=S=D=x:M=y=$=O=x,f.push({tx1:E,ty1:M,tx2:v,ty2:y,x1:S,y1:$,x2:D,y2:O,width:A,color:z,borderDash:L,borderDashOffset:j,tickWidth:P,tickColor:J,tickBorderDash:lt,tickBorderDashOffset:St}))}return this._ticksLength=u,this._borderValue=_,f}_computeLabelItems(t){const n=this.axis,i=this.options,{position:s,ticks:r}=i,a=this.isHorizontal(),o=this.ticks,{align:c,crossAlign:l,padding:h,mirror:u}=r,d=Vr(i.grid),f=d+h,p=u?-h:f,g=-dn(this.labelRotation),m=[];let b,_,w,C,x,E,M,v,y,S,$,D,O="middle";if(s==="top")E=this.bottom-p,M=this._getXAxisLabelAlignment();else if(s==="bottom")E=this.top+p,M=this._getXAxisLabelAlignment();else if(s==="left"){const N=this._getYAxisLabelAlignment(d);M=N.textAlign,x=N.x}else if(s==="right"){const N=this._getYAxisLabelAlignment(d);M=N.textAlign,x=N.x}else if(n==="x"){if(s==="center")E=(t.top+t.bottom)/2+f;else if(rt(s)){const N=Object.keys(s)[0],W=s[N];E=this.chart.scales[N].getPixelForValue(W)+f}M=this._getXAxisLabelAlignment()}else if(n==="y"){if(s==="center")x=(t.left+t.right)/2-f;else if(rt(s)){const N=Object.keys(s)[0],W=s[N];x=this.chart.scales[N].getPixelForValue(W)}M=this._getYAxisLabelAlignment(d).textAlign}n==="y"&&(c==="start"?O="top":c==="end"&&(O="bottom"));const B=this._getLabelSizes();for(b=0,_=o.length;b<_;++b){w=o[b],C=w.label;const N=r.setContext(this.getContext(b));v=this.getPixelForTick(b)+r.labelOffset,y=this._resolveTickFontOptions(b),S=y.lineHeight,$=At(C)?C.length:1;const W=$/2,R=N.color,H=N.textStrokeColor,A=N.textStrokeWidth;let z=M;a?(x=v,M==="inner"&&(b===_-1?z=this.options.reverse?"left":"right":b===0?z=this.options.reverse?"right":"left":z="center"),s==="top"?l==="near"||g!==0?D=-$*S+S/2:l==="center"?D=-B.highest.height/2-W*S+S:D=-B.highest.height+S/2:l==="near"||g!==0?D=S/2:l==="center"?D=B.highest.height/2-W*S:D=B.highest.height-$*S,u&&(D*=-1),g!==0&&!N.showLabelBackdrop&&(x+=S/2*Math.sin(g))):(E=v,D=(1-$)*S/2);let L;if(N.showLabelBackdrop){const j=ye(N.backdropPadding),P=B.heights[b],J=B.widths[b];let lt=D-j.top,St=0-j.left;switch(O){case"middle":lt-=P/2;break;case"bottom":lt-=P;break}switch(M){case"center":St-=J/2;break;case"right":St-=J;break;case"inner":b===_-1?St-=J:b>0&&(St-=J/2);break}L={left:St,top:lt,width:J+j.width,height:P+j.height,color:N.backdropColor}}m.push({label:C,font:y,textOffset:D,options:{rotation:g,color:R,strokeColor:H,strokeWidth:A,textAlign:z,textBaseline:O,translation:[x,E],backdrop:L}})}return m}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-dn(this.labelRotation))return t==="top"?"left":"right";let s="center";return n.align==="start"?s="left":n.align==="end"?s="right":n.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:s,padding:r}}=this.options,a=this._getLabelSizes(),o=t+r,c=a.widest.width;let l,h;return n==="left"?s?(h=this.right+r,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h+=c)):(h=this.right-o,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h=this.left)):n==="right"?s?(h=this.left+r,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h-=c)):(h=this.left+o,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h=this.right)):l="right",{textAlign:l,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:s,width:r,height:a}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,s,r,a),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const s=this.ticks.findIndex(r=>r.value===t);return s>=0?n.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let r,a;const o=(c,l,h)=>{!h.width||!h.color||(i.save(),i.lineWidth=h.width,i.strokeStyle=h.color,i.setLineDash(h.borderDash||[]),i.lineDashOffset=h.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(n.display)for(r=0,a=s.length;r<a;++r){const c=s[r];n.drawOnChartArea&&o({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),n.drawTicks&&o({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:s}}=this,r=i.setContext(this.getContext()),a=i.display?r.width:0;if(!a)return;const o=s.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,h,u,d;this.isHorizontal()?(l=Ji(t,this.left,a)-a/2,h=Ji(t,this.right,o)+o/2,u=d=c):(u=Ji(t,this.top,a)-a/2,d=Ji(t,this.bottom,o)+o/2,l=h=c),n.save(),n.lineWidth=r.width,n.strokeStyle=r.color,n.beginPath(),n.moveTo(l,u),n.lineTo(h,d),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Cl(i,s);const r=this.getLabelItems(t);for(const a of r){const o=a.options,c=a.font,l=a.label,h=a.textOffset;$s(i,l,0,h,c,o)}s&&Ml(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:s}}=this;if(!i.display)return;const r=Jt(i.font),a=ye(i.padding),o=i.align;let c=r.lineHeight/2;n==="bottom"||n==="center"||rt(n)?(c+=a.bottom,At(i.text)&&(c+=r.lineHeight*(i.text.length-1))):c+=a.top;const{titleX:l,titleY:h,maxWidth:u,rotation:d}=sO(this,c,n,o);$s(t,i.text,0,0,r,{color:i.color,maxWidth:u,rotation:d,textAlign:iO(o,n,s),textBaseline:"middle",translation:[l,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=et(t.grid&&t.grid.z,-1),s=et(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==zs.prototype.draw?[{z:n,draw:r=>{this.draw(r)}}]:[{z:i,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:n,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let r,a;for(r=0,a=n.length;r<a;++r){const o=n[r];o[i]===this.id&&(!t||o.type===t)&&s.push(o)}return s}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Jt(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Bo{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;oO(n)&&(i=this.register(n));const s=this.items,r=t.id,a=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in s||(s[r]=t,rO(t,a,i),this.override&&Rt.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,s=this.scope;i in n&&delete n[i],s&&i in Rt[s]&&(delete Rt[s][i],this.override&&delete Ds[i])}}function rO(e,t,n){const i=Ka(Object.create(null),[n?Rt.get(n):{},Rt.get(t),e.defaults]);Rt.set(t,i),e.defaultRoutes&&aO(t,e.defaultRoutes),e.descriptors&&Rt.describe(t,e.descriptors)}function aO(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),s=i.pop(),r=[e].concat(i).join("."),a=t[n].split("."),o=a.pop(),c=a.join(".");Rt.route(r,s,c,o)})}function oO(e){return"id"in e&&"defaults"in e}class cO{constructor(){this.controllers=new Bo(Wi,"datasets",!0),this.elements=new Bo(fi,"elements"),this.plugins=new Bo(Object,"plugins"),this.scales=new Bo(zs,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(s=>{const r=i||this._getRegistryForType(s);i||r.isForType(s)||r===this.plugins&&s.id?this._exec(t,r,s):bt(s,a=>{const o=i||this._getRegistryForType(a);this._exec(t,o,a)})})}_exec(t,n,i){const s=Td(t);Et(i["before"+s],[],i),n[t](i),Et(i["after"+s],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const s=n.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var xn=new cO;class lO{constructor(){this._init=void 0}notify(t,n,i,s){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const r=s?this._descriptors(t).filter(s):this._descriptors(t),a=this._notify(r,t,n,i);return n==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),a}_notify(t,n,i,s){s=s||{};for(const r of t){const a=r.plugin,o=a[i],c=[n,s,r.options];if(Et(o,c,a)===!1&&s.cancelable)return!1}return!0}invalidate(){it(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,s=et(i.options&&i.options.plugins,{}),r=hO(i);return s===!1&&!n?[]:dO(t,r,s,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,s=(r,a)=>r.filter(o=>!a.some(c=>o.plugin.id===c.plugin.id));this._notify(s(n,i),t,"stop"),this._notify(s(i,n),t,"start")}}function hO(e){const t={},n=[],i=Object.keys(xn.plugins.items);for(let r=0;r<i.length;r++)n.push(xn.getPlugin(i[r]));const s=e.plugins||[];for(let r=0;r<s.length;r++){const a=s[r];n.indexOf(a)===-1&&(n.push(a),t[a.id]=!0)}return{plugins:n,localIds:t}}function uO(e,t){return!t&&e===!1?null:e===!0?{}:e}function dO(e,{plugins:t,localIds:n},i,s){const r=[],a=e.getContext();for(const o of t){const c=o.id,l=uO(i[c],s);l!==null&&r.push({plugin:o,options:fO(e.config,{plugin:o,local:n[c]},l,a)})}return r}function fO(e,{plugin:t,local:n},i,s){const r=e.pluginScopeKeys(t),a=e.getOptionScopes(i,r);return n&&t.defaults&&a.push(t.defaults),e.createResolver(a,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function wu(e,t){const n=Rt.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function pO(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function gO(e,t){return e===t?"_index_":"_value_"}function kg(e){if(e==="x"||e==="y"||e==="r")return e}function mO(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function xu(e,...t){if(kg(e))return e;for(const n of t){const i=n.axis||mO(n.position)||e.length>1&&kg(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Cg(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function vO(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return Cg(e,"x",n[0])||Cg(e,"y",n[0])}return{}}function bO(e,t){const n=Ds[e.type]||{scales:{}},i=t.scales||{},s=wu(e.type,t),r=Object.create(null);return Object.keys(i).forEach(a=>{const o=i[a];if(!rt(o))return console.error(`Invalid scale configuration for scale: ${a}`);if(o._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const c=xu(a,o,vO(a,e),Rt.scales[o.type]),l=gO(c,s),h=n.scales||{};r[a]=Ma(Object.create(null),[{axis:c},o,h[c],h[l]])}),e.data.datasets.forEach(a=>{const o=a.type||e.type,c=a.indexAxis||wu(o,t),h=(Ds[o]||{}).scales||{};Object.keys(h).forEach(u=>{const d=pO(u,c),f=a[d+"AxisID"]||d;r[f]=r[f]||Object.create(null),Ma(r[f],[{axis:d},i[f],h[u]])})}),Object.keys(r).forEach(a=>{const o=r[a];Ma(o,[Rt.scales[o.type],Rt.scale])}),r}function s_(e){const t=e.options||(e.options={});t.plugins=et(t.plugins,{}),t.scales=bO(e,t)}function r_(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function _O(e){return e=e||{},e.data=r_(e.data),s_(e),e}const Mg=new Map,a_=new Set;function zo(e,t){let n=Mg.get(e);return n||(n=t(),Mg.set(e,n),a_.add(n)),n}const Ur=(e,t,n)=>{const i=Ni(t,n);i!==void 0&&e.add(i)};class yO{constructor(t){this._config=_O(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=r_(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),s_(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return zo(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return zo(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return zo(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return zo(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let s=i.get(t);return(!s||n)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,n,i){const{options:s,type:r}=this,a=this._cachedScopes(t,i),o=a.get(n);if(o)return o;const c=new Set;n.forEach(h=>{t&&(c.add(t),h.forEach(u=>Ur(c,t,u))),h.forEach(u=>Ur(c,s,u)),h.forEach(u=>Ur(c,Ds[r]||{},u)),h.forEach(u=>Ur(c,Rt,u)),h.forEach(u=>Ur(c,_u,u))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),a_.has(n)&&a.set(n,l),l}chartOptionScopes(){const{options:t,type:n}=this;return[t,Ds[n]||{},Rt.datasets[n]||{},{type:n},Rt,_u]}resolveNamedOptions(t,n,i,s=[""]){const r={$shared:!0},{resolver:a,subPrefixes:o}=Eg(this._resolverCache,t,s);let c=a;if(xO(a,n)){r.$shared=!1,i=Fi(i)?i():i;const l=this.createResolver(t,i,o);c=xr(a,i,l)}for(const l of n)r[l]=c[l];return r}createResolver(t,n,i=[""],s){const{resolver:r}=Eg(this._resolverCache,t,i);return rt(n)?xr(r,n,void 0,s):r}}function Eg(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const s=n.join();let r=i.get(s);return r||(r={resolver:Bd(t,n),subPrefixes:n.filter(o=>!o.toLowerCase().includes("hover"))},i.set(s,r)),r}const wO=e=>rt(e)&&Object.getOwnPropertyNames(e).some(t=>Fi(e[t]));function xO(e,t){const{isScriptable:n,isIndexable:i}=Nb(e);for(const s of t){const r=n(s),a=i(s),o=(a||r)&&e[s];if(r&&(Fi(o)||wO(o))||a&&At(o))return!0}return!1}var SO="4.5.1";const kO=["top","bottom","left","right","chartArea"];function Dg(e,t){return e==="top"||e==="bottom"||kO.indexOf(e)===-1&&t==="x"}function $g(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function Ig(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),Et(n&&n.onComplete,[e],t)}function CO(e){const t=e.chart,n=t.options.animation;Et(n&&n.onProgress,[e],t)}function o_(e){return Wd()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const rc={},Pg=e=>{const t=o_(e);return Object.values(rc).filter(n=>n.canvas===t).pop()};function MO(e,t,n){const i=Object.keys(e);for(const s of i){const r=+s;if(r>=t){const a=e[s];delete e[s],(n>0||r>t)&&(e[r+n]=a)}}}function EO(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class qd{static defaults=Rt;static instances=rc;static overrides=Ds;static registry=xn;static version=SO;static getChart=Pg;static register(...t){xn.add(...t),Og()}static unregister(...t){xn.remove(...t),Og()}constructor(t,n){const i=this.config=new yO(n),s=o_(t),r=Pg(s);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const a=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||UP(s)),this.platform.updateConfig(i);const o=this.platform.acquireContext(s,a.aspectRatio),c=o&&o.canvas,l=c&&c.height,h=c&&c.width;if(this.id=x$(),this.ctx=o,this.canvas=c,this.width=h,this.height=l,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new lO,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=B$(u=>this.update(u),a.resizeDelay||0),this._dataChanges=[],rc[this.id]=this,!o||!c){console.error("Failed to create chart: can't acquire context from the given item");return}Wn.listen(this,"complete",Ig),Wn.listen(this,"progress",CO),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:s,_aspectRatio:r}=this;return it(t)?n&&r?r:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return xn}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():tg(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Qp(this.canvas,this.ctx),this}stop(){return Wn.stop(this),this}resize(t,n){Wn.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,s=this.canvas,r=i.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(s,t,n,r),o=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,tg(this,o,!0)&&(this.notifyPlugins("resize",{size:a}),Et(i.onResize,[this,a],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};bt(n,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,s=Object.keys(i).reduce((a,o)=>(a[o]=!1,a),{});let r=[];n&&(r=r.concat(Object.keys(n).map(a=>{const o=n[a],c=xu(a,o),l=c==="r",h=c==="x";return{options:o,dposition:l?"chartArea":h?"bottom":"left",dtype:l?"radialLinear":h?"category":"linear"}}))),bt(r,a=>{const o=a.options,c=o.id,l=xu(c,o),h=et(o.type,a.dtype);(o.position===void 0||Dg(o.position,l)!==Dg(a.dposition))&&(o.position=a.dposition),s[c]=!0;let u=null;if(c in i&&i[c].type===h)u=i[c];else{const d=xn.getScale(h);u=new d({id:c,type:h,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(o,t)}),bt(s,(a,o)=>{a||delete i[o]}),bt(i,a=>{be.configure(this,a,a.options),be.addBox(this,a)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((s,r)=>s.index-r.index),i>n){for(let s=n;s<i;++s)this._destroyDatasetMeta(s);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort($g("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,s)=>{n.filter(r=>r===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=n.length;i<s;i++){const r=n[i];let a=this.getDatasetMeta(i);const o=r.type||this.config.type;if(a.type&&a.type!==o&&(this._destroyDatasetMeta(i),a=this.getDatasetMeta(i)),a.type=o,a.indexAxis=r.indexAxis||wu(o,this.options),a.order=r.order||0,a.index=i,a.label=""+r.label,a.visible=this.isDatasetVisible(i),a.controller)a.controller.updateIndex(i),a.controller.linkScales();else{const c=xn.getController(o),{datasetElementType:l,dataElementType:h}=Rt.datasets[o];Object.assign(c,{dataElementType:xn.getElement(h),datasetElementType:l&&xn.getElement(l)}),a.controller=new c(this,i),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){bt(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let l=0,h=this.data.datasets.length;l<h;l++){const{controller:u}=this.getDatasetMeta(l),d=!s&&r.indexOf(u)===-1;u.buildOrUpdateElements(d),a=Math.max(+u.getMaxOverflow(),a)}a=this._minPadding=i.layout.autoPadding?a:0,this._updateLayout(a),s||bt(r,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort($g("z","_idx"));const{_active:o,_lastEvent:c}=this;c?this._eventHandler(c,!0):o.length&&this._updateHoverStyles(o,o,!0),this.render()}_updateScales(){bt(this.scales,t=>{be.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!Wp(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:r}of n){const a=i==="_removeElements"?-r:r;MO(t,s,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=r=>new Set(t.filter(a=>a[0]===r).map((a,o)=>o+","+a.splice(1).join(","))),s=i(0);for(let r=1;r<n;r++)if(!Wp(s,i(r)))return;return Array.from(s).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;be.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],bt(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,r)=>{s._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,Fi(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(n),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Wn.has(this)?this.attached&&!Wn.running(this)&&Wn.start(this):(this.draw(),Ig({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let s,r;for(s=0,r=n.length;s<r;++s){const a=n[s];(!t||a.visible)&&i.push(a)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=Yb(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Cl(n,s),t.controller.draw(),s&&Ml(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Yn(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,s){const r=kP.modes[n];return typeof r=="function"?r(this,t,i,s):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let s=i.filter(r=>r&&r._dataset===n).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=ji(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const s=i?"show":"hide",r=this.getDatasetMeta(t),a=r.controller._resolveAnimations(void 0,s);Ya(n)?(r.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),a.update(r,{visible:i}),this.update(o=>o.datasetIndex===t?s:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),Wn.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Qp(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete rc[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(r,a)=>{n.addEventListener(this,r,a),t[r]=a},s=(r,a,o)=>{r.offsetX=a,r.offsetY=o,this._eventHandler(r)};bt(this.options.events,r=>i(r,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(c,l)=>{n.addEventListener(this,c,l),t[c]=l},s=(c,l)=>{t[c]&&(n.removeEventListener(this,c,l),delete t[c])},r=(c,l)=>{this.canvas&&this.resize(c,l)};let a;const o=()=>{s("attach",o),this.attached=!0,this.resize(),i("resize",r),i("detach",a)};a=()=>{this.attached=!1,s("resize",r),this._stop(),this._resize(0,0),i("attach",o)},n.isAttached(this.canvas)?o():a()}unbindEvents(){bt(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},bt(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const s=i?"set":"remove";let r,a,o,c;for(n==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+s+"DatasetHoverStyle"]()),o=0,c=t.length;o<c;++o){a=t[o];const l=a&&this.getDatasetMeta(a.datasetIndex).controller;l&&l[s+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:r,index:a})=>{const o=this.getDatasetMeta(r);if(!o)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:o.data[a],index:a}});!Kc(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const s=this.options.hover,r=(c,l)=>c.filter(h=>!l.some(u=>h.datasetIndex===u.datasetIndex&&h.index===u.index)),a=r(n,t),o=i?t:r(t,n);a.length&&this.updateHoverStyle(a,s.mode,!1),o.length&&s.mode&&this.updateHoverStyle(o,s.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},s=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const r=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(r||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:s=[],options:r}=this,a=n,o=this._getActiveElements(t,s,i,a),c=D$(t),l=EO(t,this._lastEvent,i,c);i&&(this._lastEvent=null,Et(r.onHover,[t,o,this],this),c&&Et(r.onClick,[t,o,this],this));const h=!Kc(o,s);return(h||n)&&(this._active=o,this._updateHoverStyles(o,s,n)),this._lastEvent=l,h}_getActiveElements(t,n,i,s){if(t.type==="mouseout")return[];if(!i)return n;const r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,s)}}function Og(){return bt(qd.instances,e=>e._plugins.invalidate())}function DO(e,t,n){const{startAngle:i,x:s,y:r,outerRadius:a,innerRadius:o,options:c}=t,{borderWidth:l,borderJoinStyle:h}=c,u=Math.min(l/a,ve(i-n));if(e.beginPath(),e.arc(s,r,a-l/2,i+u/2,n-u/2),o>0){const d=Math.min(l/o,ve(i-n));e.arc(s,r,o+l/2,n-d/2,i+d/2,!0)}else{const d=Math.min(l/2,a*ve(i-n));if(h==="round")e.arc(s,r,d,n-ht/2,i+ht/2,!0);else if(h==="bevel"){const f=2*d*d,p=-f*Math.cos(n+ht/2)+s,g=-f*Math.sin(n+ht/2)+r,m=f*Math.cos(i+ht/2)+s,b=f*Math.sin(i+ht/2)+r;e.lineTo(p,g),e.lineTo(m,b)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function $O(e,t,n){const{startAngle:i,pixelMargin:s,x:r,y:a,outerRadius:o,innerRadius:c}=t;let l=s/o;e.beginPath(),e.arc(r,a,o,i-l,n+l),c>s?(l=s/c,e.arc(r,a,c,n+l,i-l,!0)):e.arc(r,a,s,n+Vt,i-Vt),e.closePath(),e.clip()}function IO(e){return Fd(e,["outerStart","outerEnd","innerStart","innerEnd"])}function PO(e,t,n,i){const s=IO(e.options.borderRadius),r=(n-t)/2,a=Math.min(r,i*t/2),o=c=>{const l=(n-Math.min(r,c))*i/2;return se(c,0,Math.min(r,l))};return{outerStart:o(s.outerStart),outerEnd:o(s.outerEnd),innerStart:se(s.innerStart,0,a),innerEnd:se(s.innerEnd,0,a)}}function Xs(e,t,n,i){return{x:n+e*Math.cos(t),y:i+e*Math.sin(t)}}function Zc(e,t,n,i,s,r){const{x:a,y:o,startAngle:c,pixelMargin:l,innerRadius:h}=t,u=Math.max(t.outerRadius+i+n-l,0),d=h>0?h+i+n+l:0;let f=0;const p=s-c;if(i){const N=h>0?h-i:0,W=u>0?u-i:0,R=(N+W)/2,H=R!==0?p*R/(R+i):p;f=(p-H)/2}const g=Math.max(.001,p*u-n/ht)/u,m=(p-g)/2,b=c+m+f,_=s-m-f,{outerStart:w,outerEnd:C,innerStart:x,innerEnd:E}=PO(t,d,u,_-b),M=u-w,v=u-C,y=b+w/M,S=_-C/v,$=d+x,D=d+E,O=b+x/$,B=_-E/D;if(e.beginPath(),r){const N=(y+S)/2;if(e.arc(a,o,u,y,N),e.arc(a,o,u,N,S),C>0){const A=Xs(v,S,a,o);e.arc(A.x,A.y,C,S,_+Vt)}const W=Xs(D,_,a,o);if(e.lineTo(W.x,W.y),E>0){const A=Xs(D,B,a,o);e.arc(A.x,A.y,E,_+Vt,B+Math.PI)}const R=(_-E/d+(b+x/d))/2;if(e.arc(a,o,d,_-E/d,R,!0),e.arc(a,o,d,R,b+x/d,!0),x>0){const A=Xs($,O,a,o);e.arc(A.x,A.y,x,O+Math.PI,b-Vt)}const H=Xs(M,b,a,o);if(e.lineTo(H.x,H.y),w>0){const A=Xs(M,y,a,o);e.arc(A.x,A.y,w,b-Vt,y)}}else{e.moveTo(a,o);const N=Math.cos(y)*u+a,W=Math.sin(y)*u+o;e.lineTo(N,W);const R=Math.cos(S)*u+a,H=Math.sin(S)*u+o;e.lineTo(R,H)}e.closePath()}function OO(e,t,n,i,s){const{fullCircles:r,startAngle:a,circumference:o}=t;let c=t.endAngle;if(r){Zc(e,t,n,i,c,s);for(let l=0;l<r;++l)e.fill();isNaN(o)||(c=a+(o%It||It))}return Zc(e,t,n,i,c,s),e.fill(),c}function TO(e,t,n,i,s){const{fullCircles:r,startAngle:a,circumference:o,options:c}=t,{borderWidth:l,borderJoinStyle:h,borderDash:u,borderDashOffset:d,borderRadius:f}=c,p=c.borderAlign==="inner";if(!l)return;e.setLineDash(u||[]),e.lineDashOffset=d,p?(e.lineWidth=l*2,e.lineJoin=h||"round"):(e.lineWidth=l,e.lineJoin=h||"bevel");let g=t.endAngle;if(r){Zc(e,t,n,i,g,s);for(let m=0;m<r;++m)e.stroke();isNaN(o)||(g=a+(o%It||It))}p&&$O(e,t,g),c.selfJoin&&g-a>=ht&&f===0&&h!=="miter"&&DO(e,t,g),r||(Zc(e,t,n,i,g,s),e.stroke())}class AO extends fi{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,n,i){const s=this.getProps(["x","y"],i),{angle:r,distance:a}=Eb(s,{x:t,y:n}),{startAngle:o,endAngle:c,innerRadius:l,outerRadius:h,circumference:u}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),d=(this.options.spacing+this.options.borderWidth)/2,f=et(u,c-o),p=Xa(r,o,c)&&o!==c,g=f>=It||p,m=qn(a,l+d,h+d);return g&&m}getCenterPoint(t){const{x:n,y:i,startAngle:s,endAngle:r,innerRadius:a,outerRadius:o}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:c,spacing:l}=this.options,h=(s+r)/2,u=(a+o+l+c)/2;return{x:n+Math.cos(h)*u,y:i+Math.sin(h)*u}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:n,circumference:i}=this,s=(n.offset||0)/4,r=(n.spacing||0)/2,a=n.circular;if(this.pixelMargin=n.borderAlign==="inner"?.33:0,this.fullCircles=i>It?Math.floor(i/It):0,i===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const o=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(o)*s,Math.sin(o)*s);const c=1-Math.sin(Math.min(ht,i||0)),l=s*c;t.fillStyle=n.backgroundColor,t.strokeStyle=n.borderColor,OO(t,this,l,r,a),TO(t,this,l,r,a),t.restore()}}function c_(e,t,n=t){e.lineCap=et(n.borderCapStyle,t.borderCapStyle),e.setLineDash(et(n.borderDash,t.borderDash)),e.lineDashOffset=et(n.borderDashOffset,t.borderDashOffset),e.lineJoin=et(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=et(n.borderWidth,t.borderWidth),e.strokeStyle=et(n.borderColor,t.borderColor)}function RO(e,t,n){e.lineTo(n.x,n.y)}function LO(e){return e.stepped?Q$:e.tension||e.cubicInterpolationMode==="monotone"?J$:RO}function l_(e,t,n={}){const i=e.length,{start:s=0,end:r=i-1}=n,{start:a,end:o}=t,c=Math.max(s,a),l=Math.min(r,o),h=s<a&&r<a||s>o&&r>o;return{count:i,start:c,loop:t.loop,ilen:l<c&&!h?i+l-c:l-c}}function NO(e,t,n,i){const{points:s,options:r}=t,{count:a,start:o,loop:c,ilen:l}=l_(s,n,i),h=LO(r);let{move:u=!0,reverse:d}=i||{},f,p,g;for(f=0;f<=l;++f)p=s[(o+(d?l-f:f))%a],!p.skip&&(u?(e.moveTo(p.x,p.y),u=!1):h(e,g,p,d,r.stepped),g=p);return c&&(p=s[(o+(d?l:0))%a],h(e,g,p,d,r.stepped)),!!c}function FO(e,t,n,i){const s=t.points,{count:r,start:a,ilen:o}=l_(s,n,i),{move:c=!0,reverse:l}=i||{};let h=0,u=0,d,f,p,g,m,b;const _=C=>(a+(l?o-C:C))%r,w=()=>{g!==m&&(e.lineTo(h,m),e.lineTo(h,g),e.lineTo(h,b))};for(c&&(f=s[_(0)],e.moveTo(f.x,f.y)),d=0;d<=o;++d){if(f=s[_(d)],f.skip)continue;const C=f.x,x=f.y,E=C|0;E===p?(x<g?g=x:x>m&&(m=x),h=(u*h+C)/++u):(w(),e.lineTo(C,x),p=E,u=0,g=m=x),b=x}w()}function Su(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?FO:NO}function BO(e){return e.stepped?II:e.tension||e.cubicInterpolationMode==="monotone"?PI:as}function zO(e,t,n,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,n,i)&&s.closePath()),c_(e,t.options),e.stroke(s)}function jO(e,t,n,i){const{segments:s,options:r}=t,a=Su(t);for(const o of s)c_(e,r,o.style),e.beginPath(),a(e,t,o,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const WO=typeof Path2D=="function";function HO(e,t,n,i){WO&&!t.options.segment?zO(e,t,n,i):jO(e,t,n,i)}class $l extends fi{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;xI(this._points,i,t,s,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=NI(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,s=t[n],r=this.points,a=Kb(this,{property:n,start:s,end:s});if(!a.length)return;const o=[],c=BO(i);let l,h;for(l=0,h=a.length;l<h;++l){const{start:u,end:d}=a[l],f=r[u],p=r[d];if(f===p){o.push(f);continue}const g=Math.abs((s-f[n])/(p[n]-f[n])),m=c(f,p,g,i.stepped);m[n]=t[n],o.push(m)}return o.length===1?o[0]:o}pathSegment(t,n,i){return Su(this)(t,this,n,i)}path(t,n,i){const s=this.segments,r=Su(this);let a=this._loop;n=n||0,i=i||this.points.length-n;for(const o of s)a&=r(t,this,o,{start:n,end:n+i-1});return!!a}draw(t,n,i,s){const r=this.options||{};(this.points||[]).length&&r.borderWidth&&(t.save(),HO(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function Tg(e,t,n,i){const s=e.options,{[n]:r}=e.getProps([n],i);return Math.abs(t-r)<s.radius+s.hitRadius}class VO extends fi{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,n,i){const s=this.options,{x:r,y:a}=this.getProps(["x","y"],i);return Math.pow(t-r,2)+Math.pow(n-a,2)<Math.pow(s.hitRadius+s.radius,2)}inXRange(t,n){return Tg(this,t,"x",n)}inYRange(t,n){return Tg(this,t,"y",n)}getCenterPoint(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}size(t){t=t||this.options||{};let n=t.radius||0;n=Math.max(n,n&&t.hoverRadius||0);const i=n&&t.borderWidth||0;return(n+i)*2}draw(t,n){const i=this.options;this.skip||i.radius<.1||!Yn(this,n,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,yu(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function h_(e,t){const{x:n,y:i,base:s,width:r,height:a}=e.getProps(["x","y","base","width","height"],t);let o,c,l,h,u;return e.horizontal?(u=a/2,o=Math.min(n,s),c=Math.max(n,s),l=i-u,h=i+u):(u=r/2,o=n-u,c=n+u,l=Math.min(i,s),h=Math.max(i,s)),{left:o,top:l,right:c,bottom:h}}function Ei(e,t,n,i){return e?0:se(t,n,i)}function UO(e,t,n){const i=e.options.borderWidth,s=e.borderSkipped,r=Lb(i);return{t:Ei(s.top,r.top,0,n),r:Ei(s.right,r.right,0,t),b:Ei(s.bottom,r.bottom,0,n),l:Ei(s.left,r.left,0,t)}}function qO(e,t,n){const{enableBorderRadius:i}=e.getProps(["enableBorderRadius"]),s=e.options.borderRadius,r=ms(s),a=Math.min(t,n),o=e.borderSkipped,c=i||rt(s);return{topLeft:Ei(!c||o.top||o.left,r.topLeft,0,a),topRight:Ei(!c||o.top||o.right,r.topRight,0,a),bottomLeft:Ei(!c||o.bottom||o.left,r.bottomLeft,0,a),bottomRight:Ei(!c||o.bottom||o.right,r.bottomRight,0,a)}}function KO(e){const t=h_(e),n=t.right-t.left,i=t.bottom-t.top,s=UO(e,n/2,i/2),r=qO(e,n/2,i/2);return{outer:{x:t.left,y:t.top,w:n,h:i,radius:r},inner:{x:t.left+s.l,y:t.top+s.t,w:n-s.l-s.r,h:i-s.t-s.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,r.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(s.b,s.r))}}}}function $h(e,t,n,i){const s=t===null,r=n===null,o=e&&!(s&&r)&&h_(e,i);return o&&(s||qn(t,o.left,o.right))&&(r||qn(n,o.top,o.bottom))}function YO(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function XO(e,t){e.rect(t.x,t.y,t.w,t.h)}function Ih(e,t,n={}){const i=e.x!==n.x?-t:0,s=e.y!==n.y?-t:0,r=(e.x+e.w!==n.x+n.w?t:0)-i,a=(e.y+e.h!==n.y+n.h?t:0)-s;return{x:e.x+i,y:e.y+s,w:e.w+r,h:e.h+a,radius:e.radius}}class GO extends fi{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:i,backgroundColor:s}}=this,{inner:r,outer:a}=KO(this),o=YO(a.radius)?Ga:XO;t.save(),(a.w!==r.w||a.h!==r.h)&&(t.beginPath(),o(t,Ih(a,n,r)),t.clip(),o(t,Ih(r,-n,a)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),o(t,Ih(r,n)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,n,i){return $h(this,t,n,i)}inXRange(t,n){return $h(this,t,null,n)}inYRange(t,n){return $h(this,null,t,n)}getCenterPoint(t){const{x:n,y:i,base:s,horizontal:r}=this.getProps(["x","y","base","horizontal"],t);return{x:r?(n+s)/2:n,y:r?i:(i+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}var QO=Object.freeze({__proto__:null,ArcElement:AO,BarElement:GO,LineElement:$l,PointElement:VO});const ku=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Ag=ku.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function u_(e){return ku[e%ku.length]}function d_(e){return Ag[e%Ag.length]}function JO(e,t){return e.borderColor=u_(t),e.backgroundColor=d_(t),++t}function ZO(e,t){return e.backgroundColor=e.data.map(()=>u_(t++)),t}function tT(e,t){return e.backgroundColor=e.data.map(()=>d_(t++)),t}function eT(e){let t=0;return(n,i)=>{const s=e.getDatasetMeta(i).controller;s instanceof Vd?t=ZO(n,t):s instanceof Jb?t=tT(n,t):s&&(t=JO(n,t))}}function Rg(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function nT(e){return e&&(e.borderColor||e.backgroundColor)}function iT(){return Rt.borderColor!=="rgba(0,0,0,0.1)"||Rt.backgroundColor!=="rgba(0,0,0,0.1)"}var sT={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:i},options:s}=e.config,{elements:r}=s,a=Rg(i)||nT(s)||r&&Rg(r)||iT();if(!n.forceOverride&&a)return;const o=eT(e);i.forEach(o)}};function rT(e,t,n,i,s){const r=s.samples||i;if(r>=n)return e.slice(t,t+n);const a=[],o=(n-2)/(r-2);let c=0;const l=t+n-1;let h=t,u,d,f,p,g;for(a[c++]=e[h],u=0;u<r-2;u++){let m=0,b=0,_;const w=Math.floor((u+1)*o)+1+t,C=Math.min(Math.floor((u+2)*o)+1,n)+t,x=C-w;for(_=w;_<C;_++)m+=e[_].x,b+=e[_].y;m/=x,b/=x;const E=Math.floor(u*o)+1+t,M=Math.min(Math.floor((u+1)*o)+1,n)+t,{x:v,y}=e[h];for(f=p=-1,_=E;_<M;_++)p=.5*Math.abs((v-m)*(e[_].y-y)-(v-e[_].x)*(b-y)),p>f&&(f=p,d=e[_],g=_);a[c++]=d,h=g}return a[c++]=e[l],a}function aT(e,t,n,i){let s=0,r=0,a,o,c,l,h,u,d,f,p,g;const m=[],b=t+n-1,_=e[t].x,C=e[b].x-_;for(a=t;a<t+n;++a){o=e[a],c=(o.x-_)/C*i,l=o.y;const x=c|0;if(x===h)l<p?(p=l,u=a):l>g&&(g=l,d=a),s=(r*s+o.x)/++r;else{const E=a-1;if(!it(u)&&!it(d)){const M=Math.min(u,d),v=Math.max(u,d);M!==f&&M!==E&&m.push({...e[M],x:s}),v!==f&&v!==E&&m.push({...e[v],x:s})}a>0&&E!==f&&m.push(e[E]),m.push(o),h=x,r=0,p=g=l,u=d=f=a}}return m}function f_(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Lg(e){e.data.datasets.forEach(t=>{f_(t)})}function oT(e,t){const n=t.length;let i=0,s;const{iScale:r}=e,{min:a,max:o,minDefined:c,maxDefined:l}=r.getUserBounds();return c&&(i=se(Kn(t,r.axis,a).lo,0,n-1)),l?s=se(Kn(t,r.axis,o).hi+1,i,n)-i:s=n-i,{start:i,count:s}}var cT={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){Lg(e);return}const i=e.width;e.data.datasets.forEach((s,r)=>{const{_data:a,indexAxis:o}=s,c=e.getDatasetMeta(r),l=a||s.data;if(na([o,e.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const h=e.scales[c.xAxisID];if(h.type!=="linear"&&h.type!=="time"||e.options.parsing)return;let{start:u,count:d}=oT(c,l);const f=n.threshold||4*i;if(d<=f){f_(s);return}it(a)&&(s._data=l,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(g){this._data=g}}));let p;switch(n.algorithm){case"lttb":p=rT(l,u,d,i,n);break;case"min-max":p=aT(l,u,d,i);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}s._decimated=p})},destroy(e){Lg(e)}};function lT(e,t,n){const i=e.segments,s=e.points,r=t.points,a=[];for(const o of i){let{start:c,end:l}=o;l=Il(c,l,s);const h=Cu(n,s[c],s[l],o.loop);if(!t.segments){a.push({source:o,target:h,start:s[c],end:s[l]});continue}const u=Kb(t,h);for(const d of u){const f=Cu(n,r[d.start],r[d.end],d.loop),p=qb(o,s,f);for(const g of p)a.push({source:g,target:d,start:{[n]:Ng(h,f,"start",Math.max)},end:{[n]:Ng(h,f,"end",Math.min)}})}}return a}function Cu(e,t,n,i){if(i)return;let s=t[e],r=n[e];return e==="angle"&&(s=ve(s),r=ve(r)),{property:e,start:s,end:r}}function hT(e,t){const{x:n=null,y:i=null}=e||{},s=t.points,r=[];return t.segments.forEach(({start:a,end:o})=>{o=Il(a,o,s);const c=s[a],l=s[o];i!==null?(r.push({x:c.x,y:i}),r.push({x:l.x,y:i})):n!==null&&(r.push({x:n,y:c.y}),r.push({x:n,y:l.y}))}),r}function Il(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function Ng(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function p_(e,t){let n=[],i=!1;return At(e)?(i=!0,n=e):n=hT(e,t),n.length?new $l({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function Fg(e){return e&&e.fill!==!1}function uT(e,t,n){let s=e[t].fill;const r=[t];let a;if(!n)return s;for(;s!==!1&&r.indexOf(s)===-1;){if(!Ht(s))return s;if(a=e[s],!a)return!1;if(a.visible)return s;r.push(s),s=a.fill}return!1}function dT(e,t,n){const i=mT(e);if(rt(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return Ht(s)&&Math.floor(s)===s?fT(i[0],t,s,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function fT(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function pT(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:rt(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function gT(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:rt(e)?i=e.value:i=t.getBaseValue(),i}function mT(e){const t=e.options,n=t.fill;let i=et(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function vT(e){const{scale:t,index:n,line:i}=e,s=[],r=i.segments,a=i.points,o=bT(t,n);o.push(p_({x:null,y:t.bottom},i));for(let c=0;c<r.length;c++){const l=r[c];for(let h=l.start;h<=l.end;h++)_T(s,a[h],o)}return new $l({points:s,options:{}})}function bT(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const r=i[s];if(r.index===t)break;r.hidden||n.unshift(r.dataset)}return n}function _T(e,t,n){const i=[];for(let s=0;s<n.length;s++){const r=n[s],{first:a,last:o,point:c}=yT(r,t,"x");if(!(!c||a&&o)){if(a)i.unshift(c);else if(e.push(c),!o)break}}e.push(...i)}function yT(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const s=i[n],r=e.segments,a=e.points;let o=!1,c=!1;for(let l=0;l<r.length;l++){const h=r[l],u=a[h.start][n],d=a[h.end][n];if(qn(s,u,d)){o=s===u,c=s===d;break}}return{first:o,last:c,point:i}}class g_{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:s,y:r,radius:a}=this;return n=n||{start:0,end:It},t.arc(s,r,a,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:s}=this,r=t.angle;return{x:n+Math.cos(r)*s,y:i+Math.sin(r)*s,angle:r}}}function wT(e){const{chart:t,fill:n,line:i}=e;if(Ht(n))return xT(t,n);if(n==="stack")return vT(e);if(n==="shape")return!0;const s=ST(e);return s instanceof g_?s:p_(s,i)}function xT(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function ST(e){return(e.scale||{}).getPointPositionForValue?CT(e):kT(e)}function kT(e){const{scale:t={},fill:n}=e,i=pT(n,t);if(Ht(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function CT(e){const{scale:t,fill:n}=e,i=t.options,s=t.getLabels().length,r=i.reverse?t.max:t.min,a=gT(n,t,r),o=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,r);return new g_({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(a)})}for(let c=0;c<s;++c)o.push(t.getPointPositionForValue(c,a));return o}function Ph(e,t,n){const i=wT(t),{chart:s,index:r,line:a,scale:o,axis:c}=t,l=a.options,h=l.fill,u=l.backgroundColor,{above:d=u,below:f=u}=h||{},p=s.getDatasetMeta(r),g=Yb(s,p);i&&a.points.length&&(Cl(e,n),MT(e,{line:a,target:i,above:d,below:f,area:n,scale:o,axis:c,clip:g}),Ml(e))}function MT(e,t){const{line:n,target:i,above:s,below:r,area:a,scale:o,clip:c}=t,l=n._loop?"angle":t.axis;e.save();let h=r;r!==s&&(l==="x"?(Bg(e,i,a.top),Oh(e,{line:n,target:i,color:s,scale:o,property:l,clip:c}),e.restore(),e.save(),Bg(e,i,a.bottom)):l==="y"&&(zg(e,i,a.left),Oh(e,{line:n,target:i,color:r,scale:o,property:l,clip:c}),e.restore(),e.save(),zg(e,i,a.right),h=s)),Oh(e,{line:n,target:i,color:h,scale:o,property:l,clip:c}),e.restore()}function Bg(e,t,n){const{segments:i,points:s}=t;let r=!0,a=!1;e.beginPath();for(const o of i){const{start:c,end:l}=o,h=s[c],u=s[Il(c,l,s)];r?(e.moveTo(h.x,h.y),r=!1):(e.lineTo(h.x,n),e.lineTo(h.x,h.y)),a=!!t.pathSegment(e,o,{move:a}),a?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function zg(e,t,n){const{segments:i,points:s}=t;let r=!0,a=!1;e.beginPath();for(const o of i){const{start:c,end:l}=o,h=s[c],u=s[Il(c,l,s)];r?(e.moveTo(h.x,h.y),r=!1):(e.lineTo(n,h.y),e.lineTo(h.x,h.y)),a=!!t.pathSegment(e,o,{move:a}),a?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function Oh(e,t){const{line:n,target:i,property:s,color:r,scale:a,clip:o}=t,c=lT(n,i,s);for(const{source:l,target:h,start:u,end:d}of c){const{style:{backgroundColor:f=r}={}}=l,p=i!==!0;e.save(),e.fillStyle=f,ET(e,a,o,p&&Cu(s,u,d)),e.beginPath();const g=!!n.pathSegment(e,l);let m;if(p){g?e.closePath():jg(e,i,d,s);const b=!!i.pathSegment(e,h,{move:g,reverse:!0});m=g&&b,m||jg(e,i,u,s)}e.closePath(),e.fill(m?"evenodd":"nonzero"),e.restore()}}function ET(e,t,n,i){const s=t.chart.chartArea,{property:r,start:a,end:o}=i||{};if(r==="x"||r==="y"){let c,l,h,u;r==="x"?(c=a,l=s.top,h=o,u=s.bottom):(c=s.left,l=a,h=s.right,u=o),e.beginPath(),n&&(c=Math.max(c,n.left),h=Math.min(h,n.right),l=Math.max(l,n.top),u=Math.min(u,n.bottom)),e.rect(c,l,h-c,u-l),e.clip()}}function jg(e,t,n,i){const s=t.interpolate(n,i);s&&e.lineTo(s.x,s.y)}var DT={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,s=[];let r,a,o,c;for(a=0;a<i;++a)r=e.getDatasetMeta(a),o=r.dataset,c=null,o&&o.options&&o instanceof $l&&(c={visible:e.isDatasetVisible(a),index:a,fill:dT(o,a,i),chart:e,axis:r.controller.options.indexAxis,scale:r.vScale,line:o}),r.$filler=c,s.push(c);for(a=0;a<i;++a)c=s[a],!(!c||c.fill===!1)&&(c.fill=uT(s,a,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",s=e.getSortedVisibleDatasetMetas(),r=e.chartArea;for(let a=s.length-1;a>=0;--a){const o=s[a].$filler;o&&(o.line.updateControlPoints(r,o.axis),i&&o.fill&&Ph(e.ctx,o,r))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const r=i[s].$filler;Fg(r)&&Ph(e.ctx,r,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!Fg(i)||n.drawTime!=="beforeDatasetDraw"||Ph(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Wg=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},$T=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class Hg extends fi{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=Et(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=Jt(i.font),r=s.size,a=this._computeTitleHeight(),{boxWidth:o,itemHeight:c}=Wg(i,r);let l,h;n.font=s.string,this.isHorizontal()?(l=this.maxWidth,h=this._fitRows(a,r,o,c)+10):(h=this.maxHeight,l=this._fitCols(a,s,o,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,s){const{ctx:r,maxWidth:a,options:{labels:{padding:o}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],h=s+o;let u=t;r.textAlign="left",r.textBaseline="middle";let d=-1,f=-h;return this.legendItems.forEach((p,g)=>{const m=i+n/2+r.measureText(p.text).width;(g===0||l[l.length-1]+m+2*o>a)&&(u+=h,l[l.length-(g>0?0:1)]=0,f+=h,d++),c[g]={left:0,top:f,row:d,width:m,height:s},l[l.length-1]+=m+o}),u}_fitCols(t,n,i,s){const{ctx:r,maxHeight:a,options:{labels:{padding:o}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],h=a-t;let u=o,d=0,f=0,p=0,g=0;return this.legendItems.forEach((m,b)=>{const{itemWidth:_,itemHeight:w}=IT(i,n,r,m,s);b>0&&f+w+2*o>h&&(u+=d+o,l.push({width:d,height:f}),p+=d+o,g++,d=f=0),c[b]={left:p,top:f,col:g,width:_,height:w},d=Math.max(d,_),f+=w+o}),u+=d,l.push({width:d,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:s},rtl:r}}=this,a=lr(r,this.left,this.width);if(this.isHorizontal()){let o=0,c=me(i,this.left+s,this.right-this.lineWidths[o]);for(const l of n)o!==l.row&&(o=l.row,c=me(i,this.left+s,this.right-this.lineWidths[o])),l.top+=this.top+t+s,l.left=a.leftForLtr(a.x(c),l.width),c+=l.width+s}else{let o=0,c=me(i,this.top+t+s,this.bottom-this.columnSizes[o].height);for(const l of n)l.col!==o&&(o=l.col,c=me(i,this.top+t+s,this.bottom-this.columnSizes[o].height)),l.top=c,l.left+=this.left+s,l.left=a.leftForLtr(a.x(l.left),l.width),c+=l.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Cl(t,this),this._draw(),Ml(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:s}=this,{align:r,labels:a}=t,o=Rt.color,c=lr(t.rtl,this.left,this.width),l=Jt(a.font),{padding:h}=a,u=l.size,d=u/2;let f;this.drawTitle(),s.textAlign=c.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=l.string;const{boxWidth:p,boxHeight:g,itemHeight:m}=Wg(a,u),b=function(E,M,v){if(isNaN(p)||p<=0||isNaN(g)||g<0)return;s.save();const y=et(v.lineWidth,1);if(s.fillStyle=et(v.fillStyle,o),s.lineCap=et(v.lineCap,"butt"),s.lineDashOffset=et(v.lineDashOffset,0),s.lineJoin=et(v.lineJoin,"miter"),s.lineWidth=y,s.strokeStyle=et(v.strokeStyle,o),s.setLineDash(et(v.lineDash,[])),a.usePointStyle){const S={radius:g*Math.SQRT2/2,pointStyle:v.pointStyle,rotation:v.rotation,borderWidth:y},$=c.xPlus(E,p/2),D=M+d;Rb(s,S,$,D,a.pointStyleWidth&&p)}else{const S=M+Math.max((u-g)/2,0),$=c.leftForLtr(E,p),D=ms(v.borderRadius);s.beginPath(),Object.values(D).some(O=>O!==0)?Ga(s,{x:$,y:S,w:p,h:g,radius:D}):s.rect($,S,p,g),s.fill(),y!==0&&s.stroke()}s.restore()},_=function(E,M,v){$s(s,v.text,E,M+m/2,l,{strikethrough:v.hidden,textAlign:c.textAlign(v.textAlign)})},w=this.isHorizontal(),C=this._computeTitleHeight();w?f={x:me(r,this.left+h,this.right-i[0]),y:this.top+h+C,line:0}:f={x:this.left+h,y:me(r,this.top+C+h,this.bottom-n[0].height),line:0},Hb(this.ctx,t.textDirection);const x=m+h;this.legendItems.forEach((E,M)=>{s.strokeStyle=E.fontColor,s.fillStyle=E.fontColor;const v=s.measureText(E.text).width,y=c.textAlign(E.textAlign||(E.textAlign=a.textAlign)),S=p+d+v;let $=f.x,D=f.y;c.setWidth(this.width),w?M>0&&$+S+h>this.right&&(D=f.y+=x,f.line++,$=f.x=me(r,this.left+h,this.right-i[f.line])):M>0&&D+x>this.bottom&&($=f.x=$+n[f.line].width+h,f.line++,D=f.y=me(r,this.top+C+h,this.bottom-n[f.line].height));const O=c.x($);if(b(O,D,E),$=z$(y,$+p+d,w?$+S:this.right,t.rtl),_(c.x($),D,E),w)f.x+=S+h;else if(typeof E.text!="string"){const B=l.lineHeight;f.y+=m_(E,B)+h}else f.y+=x}),Vb(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=Jt(n.font),s=ye(n.padding);if(!n.display)return;const r=lr(t.rtl,this.left,this.width),a=this.ctx,o=n.position,c=i.size/2,l=s.top+c;let h,u=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),h=this.top+l,u=me(t.align,u,this.right-d);else{const p=this.columnSizes.reduce((g,m)=>Math.max(g,m.height),0);h=l+me(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const f=me(o,u,u+d);a.textAlign=r.textAlign(Ld(o)),a.textBaseline="middle",a.strokeStyle=n.color,a.fillStyle=n.color,a.font=i.string,$s(a,n.text,f,h,i)}_computeTitleHeight(){const t=this.options.title,n=Jt(t.font),i=ye(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,s,r;if(qn(t,this.left,this.right)&&qn(n,this.top,this.bottom)){for(r=this.legendHitBoxes,i=0;i<r.length;++i)if(s=r[i],qn(t,s.left,s.left+s.width)&&qn(n,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!TT(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,r=$T(s,i);s&&!r&&Et(n.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!r&&Et(n.onHover,[t,i,this],this)}else i&&Et(n.onClick,[t,i,this],this)}}function IT(e,t,n,i,s){const r=PT(i,e,t,n),a=OT(s,i,t.lineHeight);return{itemWidth:r,itemHeight:a}}function PT(e,t,n,i){let s=e.text;return s&&typeof s!="string"&&(s=s.reduce((r,a)=>r.length>a.length?r:a)),t+n.size/2+i.measureText(s).width}function OT(e,t,n){let i=e;return typeof t.text!="string"&&(i=m_(t,n)),i}function m_(e,t){const n=e.text?e.text.length:0;return t*n}function TT(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var AT={id:"legend",_element:Hg,start(e,t,n){const i=e.legend=new Hg({ctx:e.ctx,options:n,chart:e});be.configure(e,i,n),be.addBox(e,i)},stop(e){be.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;be.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,s=n.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:s,color:r,useBorderRadius:a,borderRadius:o}}=e.legend.options;return e._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(n?0:void 0),h=ye(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:r,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:s||l.textAlign,borderRadius:a&&(o||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class Kd extends fi{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const s=At(i.text)?i.text.length:1;this._padding=ye(i.padding);const r=s*Jt(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:i,bottom:s,right:r,options:a}=this,o=a.align;let c=0,l,h,u;return this.isHorizontal()?(h=me(o,i,r),u=n+t,l=r-i):(a.position==="left"?(h=i+t,u=me(o,s,n),c=ht*-.5):(h=r-t,u=me(o,n,s),c=ht*.5),l=s-n),{titleX:h,titleY:u,maxWidth:l,rotation:c}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const i=Jt(n.font),r=i.lineHeight/2+this._padding.top,{titleX:a,titleY:o,maxWidth:c,rotation:l}=this._drawArgs(r);$s(t,n.text,0,0,i,{color:n.color,maxWidth:c,rotation:l,textAlign:Ld(n.align),textBaseline:"middle",translation:[a,o]})}}function RT(e,t){const n=new Kd({ctx:e.ctx,options:t,chart:e});be.configure(e,n,t),be.addBox(e,n),e.titleBlock=n}var LT={id:"title",_element:Kd,start(e,t,n){RT(e,n)},stop(e){const t=e.titleBlock;be.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const i=e.titleBlock;be.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const jo=new WeakMap;var NT={id:"subtitle",start(e,t,n){const i=new Kd({ctx:e.ctx,options:n,chart:e});be.configure(e,i,n),be.addBox(e,i),jo.set(e,i)},stop(e){be.removeBox(e,jo.get(e)),jo.delete(e)},beforeUpdate(e,t,n){const i=jo.get(e);be.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const sa={average(e){if(!e.length)return!1;let t,n,i=new Set,s=0,r=0;for(t=0,n=e.length;t<n;++t){const o=e[t].element;if(o&&o.hasValue()){const c=o.tooltipPosition();i.add(c.x),s+=c.y,++r}}return r===0||i.size===0?!1:{x:[...i].reduce((o,c)=>o+c)/i.size,y:s/r}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,s=Number.POSITIVE_INFINITY,r,a,o;for(r=0,a=e.length;r<a;++r){const c=e[r].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),h=bu(t,l);h<s&&(s=h,o=c)}}if(o){const c=o.tooltipPosition();n=c.x,i=c.y}return{x:n,y:i}}};function wn(e,t){return t&&(At(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Hn(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function FT(e,t){const{element:n,datasetIndex:i,index:s}=t,r=e.getDatasetMeta(i).controller,{label:a,value:o}=r.getLabelAndValue(s);return{chart:e,label:a,parsed:r.getParsed(s),raw:e.data.datasets[i].data[s],formattedValue:o,dataset:r.getDataset(),dataIndex:s,datasetIndex:i,element:n}}function Vg(e,t){const n=e.chart.ctx,{body:i,footer:s,title:r}=e,{boxWidth:a,boxHeight:o}=t,c=Jt(t.bodyFont),l=Jt(t.titleFont),h=Jt(t.footerFont),u=r.length,d=s.length,f=i.length,p=ye(t.padding);let g=p.height,m=0,b=i.reduce((C,x)=>C+x.before.length+x.lines.length+x.after.length,0);if(b+=e.beforeBody.length+e.afterBody.length,u&&(g+=u*l.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),b){const C=t.displayColors?Math.max(o,c.lineHeight):c.lineHeight;g+=f*C+(b-f)*c.lineHeight+(b-1)*t.bodySpacing}d&&(g+=t.footerMarginTop+d*h.lineHeight+(d-1)*t.footerSpacing);let _=0;const w=function(C){m=Math.max(m,n.measureText(C).width+_)};return n.save(),n.font=l.string,bt(e.title,w),n.font=c.string,bt(e.beforeBody.concat(e.afterBody),w),_=t.displayColors?a+2+t.boxPadding:0,bt(i,C=>{bt(C.before,w),bt(C.lines,w),bt(C.after,w)}),_=0,n.font=h.string,bt(e.footer,w),n.restore(),m+=p.width,{width:m,height:g}}function BT(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function zT(e,t,n,i){const{x:s,width:r}=i,a=n.caretSize+n.caretPadding;if(e==="left"&&s+r+a>t.width||e==="right"&&s-r-a<0)return!0}function jT(e,t,n,i){const{x:s,width:r}=n,{width:a,chartArea:{left:o,right:c}}=e;let l="center";return i==="center"?l=s<=(o+c)/2?"left":"right":s<=r/2?l="left":s>=a-r/2&&(l="right"),zT(l,e,t,n)&&(l="center"),l}function Ug(e,t,n){const i=n.yAlign||t.yAlign||BT(e,n);return{xAlign:n.xAlign||t.xAlign||jT(e,t,n,i),yAlign:i}}function WT(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function HT(e,t,n){let{y:i,height:s}=e;return t==="top"?i+=n:t==="bottom"?i-=s+n:i-=s/2,i}function qg(e,t,n,i){const{caretSize:s,caretPadding:r,cornerRadius:a}=e,{xAlign:o,yAlign:c}=n,l=s+r,{topLeft:h,topRight:u,bottomLeft:d,bottomRight:f}=ms(a);let p=WT(t,o);const g=HT(t,c,l);return c==="center"?o==="left"?p+=l:o==="right"&&(p-=l):o==="left"?p-=Math.max(h,d)+s:o==="right"&&(p+=Math.max(u,f)+s),{x:se(p,0,i.width-t.width),y:se(g,0,i.height-t.height)}}function Wo(e,t,n){const i=ye(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function Kg(e){return wn([],Hn(e))}function VT(e,t,n){return ji(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function Yg(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const v_={beforeTitle:jn,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:jn,beforeBody:jn,beforeLabel:jn,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return it(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:jn,afterBody:jn,beforeFooter:jn,footer:jn,afterFooter:jn};function $e(e,t,n,i){const s=e[t].call(n,i);return typeof s>"u"?v_[t].call(n,i):s}class Xg extends fi{static positioners=sa;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&n.options.animation&&i.animations,r=new Xb(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=VT(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,s=$e(i,"beforeTitle",this,t),r=$e(i,"title",this,t),a=$e(i,"afterTitle",this,t);let o=[];return o=wn(o,Hn(s)),o=wn(o,Hn(r)),o=wn(o,Hn(a)),o}getBeforeBody(t,n){return Kg($e(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,s=[];return bt(t,r=>{const a={before:[],lines:[],after:[]},o=Yg(i,r);wn(a.before,Hn($e(o,"beforeLabel",this,r))),wn(a.lines,$e(o,"label",this,r)),wn(a.after,Hn($e(o,"afterLabel",this,r))),s.push(a)}),s}getAfterBody(t,n){return Kg($e(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,s=$e(i,"beforeFooter",this,t),r=$e(i,"footer",this,t),a=$e(i,"afterFooter",this,t);let o=[];return o=wn(o,Hn(s)),o=wn(o,Hn(r)),o=wn(o,Hn(a)),o}_createItems(t){const n=this._active,i=this.chart.data,s=[],r=[],a=[];let o=[],c,l;for(c=0,l=n.length;c<l;++c)o.push(FT(this.chart,n[c]));return t.filter&&(o=o.filter((h,u,d)=>t.filter(h,u,d,i))),t.itemSort&&(o=o.sort((h,u)=>t.itemSort(h,u,i))),bt(o,h=>{const u=Yg(t.callbacks,h);s.push($e(u,"labelColor",this,h)),r.push($e(u,"labelPointStyle",this,h)),a.push($e(u,"labelTextColor",this,h))}),this.labelColors=s,this.labelPointStyles=r,this.labelTextColors=a,this.dataPoints=o,o}update(t,n){const i=this.options.setContext(this.getContext()),s=this._active;let r,a=[];if(!s.length)this.opacity!==0&&(r={opacity:0});else{const o=sa[i.position].call(this,s,this._eventPosition);a=this._createItems(i),this.title=this.getTitle(a,i),this.beforeBody=this.getBeforeBody(a,i),this.body=this.getBody(a,i),this.afterBody=this.getAfterBody(a,i),this.footer=this.getFooter(a,i);const c=this._size=Vg(this,i),l=Object.assign({},o,c),h=Ug(this.chart,i,l),u=qg(i,l,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,r={opacity:1,x:u.x,y:u.y,width:c.width,height:c.height,caretX:o.x,caretY:o.y}}this._tooltipItems=a,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,s){const r=this.getCaretPosition(t,i,s);n.lineTo(r.x1,r.y1),n.lineTo(r.x2,r.y2),n.lineTo(r.x3,r.y3)}getCaretPosition(t,n,i){const{xAlign:s,yAlign:r}=this,{caretSize:a,cornerRadius:o}=i,{topLeft:c,topRight:l,bottomLeft:h,bottomRight:u}=ms(o),{x:d,y:f}=t,{width:p,height:g}=n;let m,b,_,w,C,x;return r==="center"?(C=f+g/2,s==="left"?(m=d,b=m-a,w=C+a,x=C-a):(m=d+p,b=m+a,w=C-a,x=C+a),_=m):(s==="left"?b=d+Math.max(c,h)+a:s==="right"?b=d+p-Math.max(l,u)-a:b=this.caretX,r==="top"?(w=f,C=w-a,m=b-a,_=b+a):(w=f+g,C=w+a,m=b+a,_=b-a),x=w),{x1:m,x2:b,x3:_,y1:w,y2:C,y3:x}}drawTitle(t,n,i){const s=this.title,r=s.length;let a,o,c;if(r){const l=lr(i.rtl,this.x,this.width);for(t.x=Wo(this,i.titleAlign,i),n.textAlign=l.textAlign(i.titleAlign),n.textBaseline="middle",a=Jt(i.titleFont),o=i.titleSpacing,n.fillStyle=i.titleColor,n.font=a.string,c=0;c<r;++c)n.fillText(s[c],l.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+o,c+1===r&&(t.y+=i.titleMarginBottom-o)}}_drawColorBox(t,n,i,s,r){const a=this.labelColors[i],o=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=r,h=Jt(r.bodyFont),u=Wo(this,"left",r),d=s.x(u),f=c<h.lineHeight?(h.lineHeight-c)/2:0,p=n.y+f;if(r.usePointStyle){const g={radius:Math.min(l,c)/2,pointStyle:o.pointStyle,rotation:o.rotation,borderWidth:1},m=s.leftForLtr(d,l)+l/2,b=p+c/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,yu(t,g,m,b),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,yu(t,g,m,b)}else{t.lineWidth=rt(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const g=s.leftForLtr(d,l),m=s.leftForLtr(s.xPlus(d,1),l-2),b=ms(a.borderRadius);Object.values(b).some(_=>_!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,Ga(t,{x:g,y:p,w:l,h:c,radius:b}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),Ga(t,{x:m,y:p+1,w:l-2,h:c-2,radius:b}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(g,p,l,c),t.strokeRect(g,p,l,c),t.fillStyle=a.backgroundColor,t.fillRect(m,p+1,l-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:s}=this,{bodySpacing:r,bodyAlign:a,displayColors:o,boxHeight:c,boxWidth:l,boxPadding:h}=i,u=Jt(i.bodyFont);let d=u.lineHeight,f=0;const p=lr(i.rtl,this.x,this.width),g=function(v){n.fillText(v,p.x(t.x+f),t.y+d/2),t.y+=d+r},m=p.textAlign(a);let b,_,w,C,x,E,M;for(n.textAlign=a,n.textBaseline="middle",n.font=u.string,t.x=Wo(this,m,i),n.fillStyle=i.bodyColor,bt(this.beforeBody,g),f=o&&m!=="right"?a==="center"?l/2+h:l+2+h:0,C=0,E=s.length;C<E;++C){for(b=s[C],_=this.labelTextColors[C],n.fillStyle=_,bt(b.before,g),w=b.lines,o&&w.length&&(this._drawColorBox(n,t,C,p,i),d=Math.max(u.lineHeight,c)),x=0,M=w.length;x<M;++x)g(w[x]),d=u.lineHeight;bt(b.after,g)}f=0,d=u.lineHeight,bt(this.afterBody,g),t.y-=r}drawFooter(t,n,i){const s=this.footer,r=s.length;let a,o;if(r){const c=lr(i.rtl,this.x,this.width);for(t.x=Wo(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=c.textAlign(i.footerAlign),n.textBaseline="middle",a=Jt(i.footerFont),n.fillStyle=i.footerColor,n.font=a.string,o=0;o<r;++o)n.fillText(s[o],c.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+i.footerSpacing}}drawBackground(t,n,i,s){const{xAlign:r,yAlign:a}=this,{x:o,y:c}=t,{width:l,height:h}=i,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:p}=ms(s.cornerRadius);n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.beginPath(),n.moveTo(o+u,c),a==="top"&&this.drawCaret(t,n,i,s),n.lineTo(o+l-d,c),n.quadraticCurveTo(o+l,c,o+l,c+d),a==="center"&&r==="right"&&this.drawCaret(t,n,i,s),n.lineTo(o+l,c+h-p),n.quadraticCurveTo(o+l,c+h,o+l-p,c+h),a==="bottom"&&this.drawCaret(t,n,i,s),n.lineTo(o+f,c+h),n.quadraticCurveTo(o,c+h,o,c+h-f),a==="center"&&r==="left"&&this.drawCaret(t,n,i,s),n.lineTo(o,c+u),n.quadraticCurveTo(o,c,o+u,c),n.closePath(),n.fill(),s.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,s=i&&i.x,r=i&&i.y;if(s||r){const a=sa[t.position].call(this,this._active,this._eventPosition);if(!a)return;const o=this._size=Vg(this,t),c=Object.assign({},a,this._size),l=Ug(n,t,c),h=qg(t,c,l,n);(s._to!==h.x||r._to!==h.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=o.width,this.height=o.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const s={width:this.width,height:this.height},r={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const a=ye(n.padding),o=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&o&&(t.save(),t.globalAlpha=i,this.drawBackground(r,t,s,n),Hb(t,n.textDirection),r.y+=a.top,this.drawTitle(r,t,n),this.drawBody(r,t,n),this.drawFooter(r,t,n),Vb(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,s=t.map(({datasetIndex:o,index:c})=>{const l=this.chart.getDatasetMeta(o);if(!l)throw new Error("Cannot find a dataset at index "+o);return{datasetIndex:o,element:l.data[c],index:c}}),r=!Kc(i,s),a=this._positionChanged(s,n);(r||a)&&(this._active=s,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,r=this._active||[],a=this._getActiveElements(t,r,n,i),o=this._positionChanged(a,t),c=n||!Kc(a,r)||o;return c&&(this._active=a,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),c}_getActiveElements(t,n,i,s){const r=this.options;if(t.type==="mouseout")return[];if(!s)return n.filter(o=>this.chart.data.datasets[o.datasetIndex]&&this.chart.getDatasetMeta(o.datasetIndex).controller.getParsed(o.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,r.mode,r,i);return r.reverse&&a.reverse(),a}_positionChanged(t,n){const{caretX:i,caretY:s,options:r}=this,a=sa[r.position].call(this,t,n);return a!==!1&&(i!==a.x||s!==a.y)}}var UT={id:"tooltip",_element:Xg,positioners:sa,afterInit(e,t,n){n&&(e.tooltip=new Xg({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:v_},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},qT=Object.freeze({__proto__:null,Colors:sT,Decimation:cT,Filler:DT,Legend:AT,SubTitle:NT,Title:LT,Tooltip:UT});const KT=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function YT(e,t,n,i){const s=e.indexOf(t);if(s===-1)return KT(e,t,n,i);const r=e.lastIndexOf(t);return s!==r?n:s}const XT=(e,t)=>e===null?null:se(Math.round(e),0,t);function Gg(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class GT extends zs{static id="category";static defaults={ticks:{callback:Gg}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:s,label:r}of n)i[s]===r&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(it(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:YT(i,t,et(n,t),this._addedLabels),XT(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,s=[];let r=this.getLabels();r=t===0&&n===r.length-1?r:r.slice(t,n+1),this._valueRange=Math.max(r.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let a=t;a<=n;a++)s.push({value:a});return s}getLabelForValue(t){return Gg.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function QT(e,t){const n=[],{bounds:s,step:r,min:a,max:o,precision:c,count:l,maxTicks:h,maxDigits:u,includeBounds:d}=e,f=r||1,p=h-1,{min:g,max:m}=t,b=!it(a),_=!it(o),w=!it(l),C=(m-g)/(u+1);let x=Vp((m-g)/p/f)*f,E,M,v,y;if(x<1e-14&&!b&&!_)return[{value:g},{value:m}];y=Math.ceil(m/x)-Math.floor(g/x),y>p&&(x=Vp(y*x/p/f)*f),it(c)||(E=Math.pow(10,c),x=Math.ceil(x*E)/E),s==="ticks"?(M=Math.floor(g/x)*x,v=Math.ceil(m/x)*x):(M=g,v=m),b&&_&&r&&T$((o-a)/r,x/1e3)?(y=Math.round(Math.min((o-a)/x,h)),x=(o-a)/y,M=a,v=o):w?(M=b?a:M,v=_?o:v,y=l-1,x=(v-M)/y):(y=(v-M)/x,Ea(y,Math.round(y),x/1e3)?y=Math.round(y):y=Math.ceil(y));const S=Math.max(Up(x),Up(M));E=Math.pow(10,it(c)?S:c),M=Math.round(M*E)/E,v=Math.round(v*E)/E;let $=0;for(b&&(d&&M!==a?(n.push({value:a}),M<a&&$++,Ea(Math.round((M+$*x)*E)/E,a,Qg(a,C,e))&&$++):M<a&&$++);$<y;++$){const D=Math.round((M+$*x)*E)/E;if(_&&D>o)break;n.push({value:D})}return _&&d&&v!==o?n.length&&Ea(n[n.length-1].value,o,Qg(o,C,e))?n[n.length-1].value=o:n.push({value:o}):(!_||v===o)&&n.push({value:v}),n}function Qg(e,t,{horizontal:n,minRotation:i}){const s=dn(i),r=(n?Math.sin(s):Math.cos(s))||.001,a=.75*t*(""+e).length;return Math.min(t/r,a)}class tl extends zs{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return it(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:s,max:r}=this;const a=c=>s=n?s:c,o=c=>r=i?r:c;if(t){const c=En(s),l=En(r);c<0&&l<0?o(0):c>0&&l>0&&a(0)}if(s===r){let c=r===0?1:Math.abs(r*.05);o(r+c),t||a(s-c)}this.min=s,this.max=r}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),n=n||11),n&&(s=Math.min(n,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},r=this._range||this,a=QT(s,r);return t.bounds==="ticks"&&Mb(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-n)/Math.max(t.length-1,1)/2;n-=s,i+=s}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return mo(t,this.chart.options.locale,this.options.ticks.format)}}class JT extends tl{static id="linear";static defaults={ticks:{callback:kl.formatters.numeric}};determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=Ht(t)?t:0,this.max=Ht(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=dn(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,r.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const Ja=e=>Math.floor(Ci(e)),ts=(e,t)=>Math.pow(10,Ja(e)+t);function Jg(e){return e/Math.pow(10,Ja(e))===1}function Zg(e,t,n){const i=Math.pow(10,n),s=Math.floor(e/i);return Math.ceil(t/i)-s}function ZT(e,t){const n=t-e;let i=Ja(n);for(;Zg(e,t,i)>10;)i++;for(;Zg(e,t,i)<10;)i--;return Math.min(i,Ja(e))}function tA(e,{min:t,max:n}){t=Ne(e.min,t);const i=[],s=Ja(t);let r=ZT(t,n),a=r<0?Math.pow(10,Math.abs(r)):1;const o=Math.pow(10,r),c=s>r?Math.pow(10,s):0,l=Math.round((t-c)*a)/a,h=Math.floor((t-c)/o/10)*o*10;let u=Math.floor((l-h)/Math.pow(10,r)),d=Ne(e.min,Math.round((c+h+u*Math.pow(10,r))*a)/a);for(;d<n;)i.push({value:d,major:Jg(d),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(r++,u=2,a=r>=0?1:a),d=Math.round((c+h+u*Math.pow(10,r))*a)/a;const f=Ne(e.max,d);return i.push({value:f,major:Jg(f),significand:u}),i}class eA extends zs{static id="logarithmic";static defaults={ticks:{callback:kl.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const i=tl.prototype.parse.apply(this,[t,n]);if(i===0){this._zero=!0;return}return Ht(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=Ht(t)?Math.max(0,t):null,this.max=Ht(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!Ht(this._userMin)&&(this.min=t===ts(this.min,0)?ts(this.min,-1):ts(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let i=this.min,s=this.max;const r=o=>i=t?i:o,a=o=>s=n?s:o;i===s&&(i<=0?(r(1),a(10)):(r(ts(i,-1)),a(ts(s,1)))),i<=0&&r(ts(s,-1)),s<=0&&a(ts(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},i=tA(n,this);return t.bounds==="ticks"&&Mb(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":mo(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Ci(t),this._valueRange=Ci(this.max)-Ci(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Ci(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}function Mu(e){const t=e.ticks;if(t.display&&e.display){const n=ye(t.backdropPadding);return et(t.font&&t.font.size,Rt.font.size)+n.height}return 0}function nA(e,t,n){return n=At(n)?n:[n],{w:G$(e,t.string,n),h:n.length*t.lineHeight}}function tm(e,t,n,i,s){return e===i||e===s?{start:t-n/2,end:t+n/2}:e<i||e>s?{start:t-n,end:t}:{start:t,end:t+n}}function iA(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),i=[],s=[],r=e._pointLabels.length,a=e.options.pointLabels,o=a.centerPointLabels?ht/r:0;for(let c=0;c<r;c++){const l=a.setContext(e.getPointLabelContext(c));s[c]=l.padding;const h=e.getPointPosition(c,e.drawingArea+s[c],o),u=Jt(l.font),d=nA(e.ctx,u,e._pointLabels[c]);i[c]=d;const f=ve(e.getIndexAngle(c)+o),p=Math.round(Ad(f)),g=tm(p,h.x,d.w,0,180),m=tm(p,h.y,d.h,90,270);sA(n,t,f,g,m)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=oA(e,i,s)}function sA(e,t,n,i,s){const r=Math.abs(Math.sin(n)),a=Math.abs(Math.cos(n));let o=0,c=0;i.start<t.l?(o=(t.l-i.start)/r,e.l=Math.min(e.l,t.l-o)):i.end>t.r&&(o=(i.end-t.r)/r,e.r=Math.max(e.r,t.r+o)),s.start<t.t?(c=(t.t-s.start)/a,e.t=Math.min(e.t,t.t-c)):s.end>t.b&&(c=(s.end-t.b)/a,e.b=Math.max(e.b,t.b+c))}function rA(e,t,n){const i=e.drawingArea,{extra:s,additionalAngle:r,padding:a,size:o}=n,c=e.getPointPosition(t,i+s+a,r),l=Math.round(Ad(ve(c.angle+Vt))),h=hA(c.y,o.h,l),u=cA(l),d=lA(c.x,o.w,u);return{visible:!0,x:c.x,y:h,textAlign:u,left:d,top:h,right:d+o.w,bottom:h+o.h}}function aA(e,t){if(!t)return!0;const{left:n,top:i,right:s,bottom:r}=e;return!(Yn({x:n,y:i},t)||Yn({x:n,y:r},t)||Yn({x:s,y:i},t)||Yn({x:s,y:r},t))}function oA(e,t,n){const i=[],s=e._pointLabels.length,r=e.options,{centerPointLabels:a,display:o}=r.pointLabels,c={extra:Mu(r)/2,additionalAngle:a?ht/s:0};let l;for(let h=0;h<s;h++){c.padding=n[h],c.size=t[h];const u=rA(e,h,c);i.push(u),o==="auto"&&(u.visible=aA(u,l),u.visible&&(l=u))}return i}function cA(e){return e===0||e===180?"center":e<180?"left":"right"}function lA(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function hA(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function uA(e,t,n){const{left:i,top:s,right:r,bottom:a}=n,{backdropColor:o}=t;if(!it(o)){const c=ms(t.borderRadius),l=ye(t.backdropPadding);e.fillStyle=o;const h=i-l.left,u=s-l.top,d=r-i+l.width,f=a-s+l.height;Object.values(c).some(p=>p!==0)?(e.beginPath(),Ga(e,{x:h,y:u,w:d,h:f,radius:c}),e.fill()):e.fillRect(h,u,d,f)}}function dA(e,t){const{ctx:n,options:{pointLabels:i}}=e;for(let s=t-1;s>=0;s--){const r=e._pointLabelItems[s];if(!r.visible)continue;const a=i.setContext(e.getPointLabelContext(s));uA(n,a,r);const o=Jt(a.font),{x:c,y:l,textAlign:h}=r;$s(n,e._pointLabels[s],c,l+o.lineHeight/2,o,{color:a.color,textAlign:h,textBaseline:"middle"})}}function b_(e,t,n,i){const{ctx:s}=e;if(n)s.arc(e.xCenter,e.yCenter,t,0,It);else{let r=e.getPointPosition(0,t);s.moveTo(r.x,r.y);for(let a=1;a<i;a++)r=e.getPointPosition(a,t),s.lineTo(r.x,r.y)}}function fA(e,t,n,i,s){const r=e.ctx,a=t.circular,{color:o,lineWidth:c}=t;!a&&!i||!o||!c||n<0||(r.save(),r.strokeStyle=o,r.lineWidth=c,r.setLineDash(s.dash||[]),r.lineDashOffset=s.dashOffset,r.beginPath(),b_(e,n,a,i),r.closePath(),r.stroke(),r.restore())}function pA(e,t,n){return ji(e,{label:n,index:t,type:"pointLabel"})}class gA extends tl{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:kl.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=ye(Mu(this.options)/2),n=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=Ht(t)&&!isNaN(t)?t:0,this.max=Ht(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Mu(this.options))}generateTickLabels(t){tl.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,i)=>{const s=Et(this.options.pointLabels.callback,[n,i],this);return s||s===0?s:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?iA(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,i,s){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,i,s))}getIndexAngle(t){const n=It/(this._pointLabels.length||1),i=this.options.startAngle||0;return ve(t*n+dn(i))}getDistanceFromCenterForValue(t){if(it(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(it(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const i=n[t];return pA(this.getContext(),t,i)}}getPointPosition(t,n,i=0){const s=this.getIndexAngle(t)-Vt+i;return{x:Math.cos(s)*n+this.xCenter,y:Math.sin(s)*n+this.yCenter,angle:s}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:i,right:s,bottom:r}=this._pointLabelItems[t];return{left:n,top:i,right:s,bottom:r}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),b_(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:i,grid:s,border:r}=n,a=this._pointLabels.length;let o,c,l;if(n.pointLabels.display&&dA(this,a),s.display&&this.ticks.forEach((h,u)=>{if(u!==0||u===0&&this.min<0){c=this.getDistanceFromCenterForValue(h.value);const d=this.getContext(u),f=s.setContext(d),p=r.setContext(d);fA(this,f,c,a,p)}}),i.display){for(t.save(),o=a-1;o>=0;o--){const h=i.setContext(this.getPointLabelContext(o)),{color:u,lineWidth:d}=h;!d||!u||(t.lineWidth=d,t.strokeStyle=u,t.setLineDash(h.borderDash),t.lineDashOffset=h.borderDashOffset,c=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),l=this.getPointPosition(o,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let r,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((o,c)=>{if(c===0&&this.min>=0&&!n.reverse)return;const l=i.setContext(this.getContext(c)),h=Jt(l.font);if(r=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){t.font=h.string,a=t.measureText(o.label).width,t.fillStyle=l.backdropColor;const u=ye(l.backdropPadding);t.fillRect(-a/2-u.left,-r-h.size/2-u.top,a+u.width,h.size+u.height)}$s(t,o.label,0,-r,h,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),t.restore()}drawTitle(){}}const Pl={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Oe=Object.keys(Pl);function em(e,t){return e-t}function nm(e,t){if(it(t))return null;const n=e._adapter,{parser:i,round:s,isoWeekday:r}=e._parseOpts;let a=t;return typeof i=="function"&&(a=i(a)),Ht(a)||(a=typeof i=="string"?n.parse(a,i):n.parse(a)),a===null?null:(s&&(a=s==="week"&&(wr(r)||r===!0)?n.startOf(a,"isoWeek",r):n.startOf(a,s)),+a)}function im(e,t,n,i){const s=Oe.length;for(let r=Oe.indexOf(e);r<s-1;++r){const a=Pl[Oe[r]],o=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((n-t)/(o*a.size))<=i)return Oe[r]}return Oe[s-1]}function mA(e,t,n,i,s){for(let r=Oe.length-1;r>=Oe.indexOf(n);r--){const a=Oe[r];if(Pl[a].common&&e._adapter.diff(s,i,a)>=t-1)return a}return Oe[n?Oe.indexOf(n):0]}function vA(e){for(let t=Oe.indexOf(e)+1,n=Oe.length;t<n;++t)if(Pl[Oe[t]].common)return Oe[t]}function sm(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:s}=Rd(n,t),r=n[i]>=t?n[i]:n[s];e[r]=!0}}function bA(e,t,n,i){const s=e._adapter,r=+s.startOf(t[0].value,i),a=t[t.length-1].value;let o,c;for(o=r;o<=a;o=+s.add(o,1,i))c=n[o],c>=0&&(t[c].major=!0);return t}function rm(e,t,n){const i=[],s={},r=t.length;let a,o;for(a=0;a<r;++a)o=t[a],s[o]=a,i.push({value:o,major:!1});return r===0||!n?i:bA(e,i,s,n)}class Eu extends zs{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),s=this._adapter=new _P._date(t.adapters.date);s.init(n),Ma(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:nm(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:s,max:r,minDefined:a,maxDefined:o}=this.getUserBounds();function c(l){!a&&!isNaN(l.min)&&(s=Math.min(s,l.min)),!o&&!isNaN(l.max)&&(r=Math.max(r,l.max))}(!a||!o)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),s=Ht(s)&&!isNaN(s)?s:+n.startOf(Date.now(),i),r=Ht(r)&&!isNaN(r)?r:+n.endOf(Date.now(),i)+1,this.min=Math.min(s,r-1),this.max=Math.max(s+1,r)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const r=this.min,a=this.max,o=N$(s,r,a);return this._unit=n.unit||(i.autoSkip?im(n.minUnit,this.min,this.max,this._getLabelCapacity(r)):mA(this,o.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:vA(this._unit),this.initOffsets(s),t.reverse&&o.reverse(),rm(this,o,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,s,r;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?n=1-s:n=(this.getDecimalForValue(t[1])-s)/2,r=this.getDecimalForValue(t[t.length-1]),t.length===1?i=r:i=(r-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;n=se(n,0,a),i=se(i,0,a),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,s=this.options,r=s.time,a=r.unit||im(r.minUnit,n,i,this._getLabelCapacity(n)),o=et(s.ticks.stepSize,1),c=a==="week"?r.isoWeekday:!1,l=wr(c)||c===!0,h={};let u=n,d,f;if(l&&(u=+t.startOf(u,"isoWeek",c)),u=+t.startOf(u,l?"day":a),t.diff(i,n,a)>1e5*o)throw new Error(n+" and "+i+" are too far apart with stepSize of "+o+" "+a);const p=s.ticks.source==="data"&&this.getDataTimestamps();for(d=u,f=0;d<i;d=+t.add(d,o,a),f++)sm(h,d,p);return(d===i||s.bounds==="ticks"||f===1)&&sm(h,d,p),Object.keys(h).sort(em).map(g=>+g)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const s=this.options.time.displayFormats,r=this._unit,a=n||s[r];return this._adapter.format(t,a)}_tickFormatFunction(t,n,i,s){const r=this.options,a=r.ticks.callback;if(a)return Et(a,[t,n,i],this);const o=r.time.displayFormats,c=this._unit,l=this._majorUnit,h=c&&o[c],u=l&&o[l],d=i[n],f=l&&u&&d&&d.major;return this._adapter.format(t,s||(f?u:h))}generateTickLabels(t){let n,i,s;for(n=0,i=t.length;n<i;++n)s=t[n],s.label=this._tickFormatFunction(s.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,s=dn(this.isHorizontal()?n.maxRotation:n.minRotation),r=Math.cos(s),a=Math.sin(s),o=this._resolveTickFontOptions(0).size;return{w:i*r+o*a,h:i*a+o*r}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,s=i[n.unit]||i.millisecond,r=this._tickFormatFunction(t,0,rm(this,[t],this._majorUnit),s),a=this._getLabelSize(r),o=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return o>0?o:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(n=0,i=s.length;n<i;++n)t=t.concat(s[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const s=this.getLabels();for(n=0,i=s.length;n<i;++n)t.push(nm(this,s[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return $b(t.sort(em))}}function Ho(e,t,n){let i=0,s=e.length-1,r,a,o,c;n?(t>=e[i].pos&&t<=e[s].pos&&({lo:i,hi:s}=Kn(e,"pos",t)),{pos:r,time:o}=e[i],{pos:a,time:c}=e[s]):(t>=e[i].time&&t<=e[s].time&&({lo:i,hi:s}=Kn(e,"time",t)),{time:r,pos:o}=e[i],{time:a,pos:c}=e[s]);const l=a-r;return l?o+(c-o)*(t-r)/l:o}class _A extends Eu{static id="timeseries";static defaults=Eu.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Ho(n,this.min),this._tableRange=Ho(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,s=[],r=[];let a,o,c,l,h;for(a=0,o=t.length;a<o;++a)l=t[a],l>=n&&l<=i&&s.push(l);if(s.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(a=0,o=s.length;a<o;++a)h=s[a+1],c=s[a-1],l=s[a],Math.round((h+c)/2)!==l&&r.push({time:l,pos:a/(o-1)});return r}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((s,r)=>s-r)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Ho(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Ho(this._table,i*this._tableRange+this._minPos,!0)}}var yA=Object.freeze({__proto__:null,CategoryScale:GT,LinearScale:JT,LogarithmicScale:eA,RadialLinearScale:gA,TimeScale:Eu,TimeSeriesScale:_A});const wA=[bP,QO,qT,yA];var xA=Object.defineProperty,SA=Object.getOwnPropertyDescriptor,__=e=>{throw TypeError(e)},Ol=(e,t,n,i)=>{for(var s=i>1?void 0:i?SA(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&xA(t,n,s),s},kA=(e,t,n)=>t.has(e)||__("Cannot "+n),CA=(e,t,n)=>t.has(e)?__("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),am=(e,t,n)=>(kA(e,t,"access private method"),n),ac,Du;qd.register(...wA);let kr=class extends gt{constructor(){super(...arguments),CA(this,ac),this.chartType="bar",this.data={labels:[],datasets:[]},this.options={}}render(){return k`
      <canvas></canvas>
    `}updated(e){if(!this._chart){am(this,ac,Du).call(this);return}e.has("chartType")?(this._chart.destroy(),am(this,ac,Du).call(this)):(e.has("data")||e.has("options"))&&(this._chart.data=this.data,e.has("options")&&(this._chart.options=this.options),this._chart.update())}disconnectedCallback(){super.disconnectedCallback(),this._chart?.destroy(),this._chart=void 0}};ac=new WeakSet;Du=function(){const t=this.shadowRoot.querySelector("canvas").getContext("2d");t&&(this._chart=new qd(t,{type:this.chartType,data:this.data,options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{sort:(n,i)=>(n.text??"").localeCompare(i.text??"")}}},...this.options}}))};kr.styles=mt`
    :host {
      display: block;
      position: relative;
    }
  `;Ol([Q({type:String})],kr.prototype,"chartType",2);Ol([Q({type:Object})],kr.prototype,"data",2);Ol([Q({type:Object})],kr.prototype,"options",2);kr=Ol([$t("chart-wrapper")],kr);const MA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var EA=Object.defineProperty,DA=Object.getOwnPropertyDescriptor,y_=e=>{throw TypeError(e)},w_=(e,t,n,i)=>{for(var s=i>1?void 0:i?DA(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&EA(t,n,s),s},$A=(e,t,n)=>t.has(e)||y_("Cannot "+n),IA=(e,t,n)=>t.has(e)?y_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),PA=(e,t,n)=>($A(e,t,"access private method"),n),$u,x_;let el=class extends gt{constructor(){super(...arguments),IA(this,$u),this.heading=""}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.shadowRoot?.getElementById("popover");e?.showPopover?.(),e?.addEventListener("toggle",t=>{t.newState==="closed"&&this.dispatchEvent(new CustomEvent("modal-close"))})})}render(){return k`
      <div id="popover" popover="auto">
        <div class="header">
          <h3>${this.heading}</h3>
          <button class="close" aria-label="Close" @click=${PA(this,$u,x_)}>${re(MA)}</button>
        </div>
        <slot></slot>
      </div>
    `}};$u=new WeakSet;x_=function(){this.shadowRoot?.getElementById("popover")?.hidePopover?.()};el.styles=mt`
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
  `;w_([Q({type:String})],el.prototype,"heading",2);el=w_([$t("budgee-modal")],el);const Tl=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,OA=/^(\d+)\s+(day|week|month|year)s?\s+ago$/i;function TA(e){const t=e.trim();if(!t)return;if(/^\d{4}-\d{2}-\d{2}$/.test(t))return t;const n=t.match(OA);if(!n)return;const i=parseInt(n[1],10),s=n[2].toLowerCase(),r=new Date;switch(s){case"day":r.setDate(r.getDate()-i);break;case"week":r.setDate(r.getDate()-i*7);break;case"month":r.setMonth(r.getMonth()-i);break;case"year":r.setFullYear(r.getFullYear()-i);break}return r.toISOString().slice(0,10)}function AA(e,t,n){const i=n?new Set(n):void 0,s=new Map;for(const a of e)a.merchantId!==void 0&&s.set(a.merchantId,(s.get(a.merchantId)??0)+a.amount);const r=new Map;for(const a of t){if(i?.has(a.id))continue;const o=s.get(a.id);o!==void 0&&r.set(a.name,o)}return r}function RA(e,t){switch(t){case"day":return e.slice(0,10);case"month":return e.slice(0,7);case"year":return e.slice(0,4)}}function om(e,t){const n=new Map;for(const i of e){const s=RA(i.date,t);n.set(s,(n.get(s)??0)+i.amount)}return n}function LA(e,t,n){const i=n?new Set(n):void 0,s=new Map;for(const a of e)for(const o of a.tagIds)s.set(o,(s.get(o)??0)+a.amount);const r=new Map;for(const a of t){if(i?.has(a.id))continue;const o=s.get(a.id);o!==void 0&&r.set(a.name,o)}return r}function cm(e,t){return e.filter(n=>{if(t.tagId!==void 0&&!n.tagIds.includes(t.tagId)||t.excludedTagId!==void 0&&n.tagIds.includes(t.excludedTagId)||t.merchantId!==void 0&&n.merchantId!==t.merchantId||t.excludedMerchantId!==void 0&&n.merchantId===t.excludedMerchantId||t.startDate&&n.date<t.startDate||t.endDate&&n.date>t.endDate)return!1;if(t.amountFilter){const{operator:i,value:s}=t.amountFilter;if(i==="lt"&&!(n.amount<s)||i==="gt"&&!(n.amount>s)||i==="lte"&&!(n.amount<=s)||i==="gte"&&!(n.amount>=s))return!1}if(t.descriptionFilter){const i=n.originalDescription.toLowerCase().includes(t.descriptionFilter.toLowerCase());if(t.descriptionFilterMode==="exclude"&&i||t.descriptionFilterMode==="include"&&!i)return!1}return!0})}function NA(e,t){return t<2?e.map(n=>n):e.map((n,i)=>{const s=Math.max(0,i-t+1),r=e.slice(s,i+1).sort((o,c)=>o-c),a=Math.floor(r.length/2);return r.length%2===0?(r[a-1]+r[a])/2:r[a]})}function FA(e){return Math.max(6,Math.min(12,Math.round(e*.1)))}function en(e,t){const n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();if(t==null)return n;const i=n.match(/^lch\(([^)]+)\)$/);return i?`lch(${i[1]} / ${t})`:`color-mix(in srgb, ${n} ${Math.round(t*100)}%, transparent)`}function BA(e){const{allEntries:t,displayEntries:n,label:i,formatLabel:s}=e,r=t.map(([,g])=>g),a=FA(r.length),o=NA(r,a),c=n[0]?.[0],l=c?t.findIndex(([g])=>g===c):0,h=n.map(([,g])=>g),u=h.map(Math.abs),d=o.slice(l,l+n.length).map(Math.abs),f=s?n.map(([g])=>s(g)):n.map(([g])=>g),p=[{label:i,data:u,backgroundColor:h.map(g=>g<0?en("--budgee-negative",.5):en("--budgee-positive",.5)),borderColor:h.map(g=>g<0?en("--budgee-negative"):en("--budgee-positive")),borderWidth:1,maxBarThickness:50}];return u.length>=2&&p.push({type:"line",label:`${i} (${a}-pt median)`,data:d,borderColor:en("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}),{labels:f,datasets:p}}var zA=Object.defineProperty,jA=Object.getOwnPropertyDescriptor,S_=e=>{throw TypeError(e)},vo=(e,t,n,i)=>{for(var s=i>1?void 0:i?jA(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&zA(t,n,s),s},k_=(e,t,n)=>t.has(e)||S_("Cannot "+n),lm=(e,t,n)=>(k_(e,t,"read from private field"),n?n.call(e):t.get(e)),WA=(e,t,n)=>t.has(e)?S_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),je=(e,t,n)=>(k_(e,t,"access private method"),n),ce,C_,M_,E_,D_,Iu,$_,I_,P_,O_,T_,A_,Al;const hm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function um(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,n,i]=e.split("-");return`${hm[Number(n)-1]} ${Number(i)}, ${t}`}if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-");return`${hm[Number(n)-1]} ${t}`}return e}function HA(e){const t={};for(const n of e)switch(n.field){case"tag":n.operator==="is"&&(t.tagId=n.value),n.operator==="isNot"&&(t.excludedTagId=n.value);break;case"merchant":n.operator==="is"&&(t.merchantId=n.value),n.operator==="isNot"&&(t.excludedMerchantId=n.value);break;case"amount":t.amountFilter={operator:n.operator,value:Number(n.value)};break;case"description":t.descriptionFilter=n.value,t.descriptionFilterMode=n.operator==="contains"?"include":"exclude";break}return t}let Is=class extends gt{constructor(){super(...arguments),WA(this,ce),this.transactions=[],this.tags=[],this.merchants=[]}render(){return k`
      <div class="resize-handle" @pointerdown=${je(this,ce,O_)}></div>
      <div class="resize-handle-bottom" @pointerdown=${je(this,ce,T_)}></div>
      <div class="resize-handle-corner" @pointerdown=${je(this,ce,A_)}></div>
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${je(this,ce,$_)}>${re(Tl)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${je(this,ce,I_)}>${re(Tr)}</button>
        </div>
      </div>
      <chart-wrapper
        .chartType=${this.config.chartType}
        .data=${lm(this,ce,C_)}
        .options=${lm(this,ce,M_)}
      ></chart-wrapper>
    `}};ce=new WeakSet;C_=function(){const e=this.config.startDate?TA(this.config.startDate):void 0,t=this.config.filters?HA(this.config.filters):{tagId:this.config.tagId,merchantId:this.config.merchantId,amountFilter:this.config.direction==="debit"?{operator:"lt",value:0}:this.config.direction==="credit"?{operator:"gt",value:0}:void 0,descriptionFilter:this.config.descriptionFilter,descriptionFilterMode:this.config.descriptionFilterMode},n=cm(this.transactions,{...t,startDate:e}),{granularity:i}=this.config,s=i==="byTag"?LA(n,this.tags,this.config.excludedTagIds):i==="byMerchant"?AA(n,this.merchants,this.config.excludedMerchantIds):om(n,i),r=i==="byTag"||i==="byMerchant",a=this.config.chartType==="pie"||this.config.chartType==="doughnut";let o=[...s.entries()].sort(([f],[p])=>f.localeCompare(p));if(a&&(o=je(this,ce,E_).call(this,o),o.sort(([,f],[,p])=>Math.abs(p)-Math.abs(f))),!r&&this.config.chartType==="bar"){const f=cm(this.transactions,t),g=[...om(f,i).entries()].sort(([m],[b])=>m.localeCompare(b));return BA({allEntries:g,displayEntries:o,label:this.config.title,formatLabel:um})}const c=this.config.chartType==="bar",l=o.map(([,f])=>f),h=a||c?l.map(Math.abs):l,u=a?je(this,ce,D_).call(this,o):c?l.map(f=>f<0?en("--budgee-negative",.5):en("--budgee-positive",.5)):en("--budgee-primary",.5),d=a?en("--budgee-surface"):c?l.map(f=>f<0?en("--budgee-negative"):en("--budgee-positive")):en("--budgee-primary");return{labels:o.map(([f])=>um(f)),datasets:[{label:this.config.title,data:h,backgroundColor:u,borderColor:d,borderWidth:1,maxBarThickness:50}]}};M_=function(){const e=this.config.legendPosition??"top";return e==="hidden"?{plugins:{legend:{display:!1}}}:{plugins:{legend:{position:e}}}};E_=function(e){const t=e.reduce((r,[,a])=>r+Math.abs(a),0);if(t===0)return e;const n=t*.01,i=[];let s=0;for(const[r,a]of e)Math.abs(a)<n?s+=a:i.push([r,a]);return s!==0&&i.push(["other",s]),i};D_=function(e){if(this.config.granularity==="byTag"){const t=new Map(this.tags.map(n=>[n.name,n]));return e.map(([n])=>t.get(n)?.color??je(this,ce,Iu).call(this,n))}return e.map(([t])=>je(this,ce,Iu).call(this,t))};Iu=function(e){let t=0;for(let i=0;i<e.length;i++)t=t*31+e.charCodeAt(i)|0;return`lch(55% 50 ${(t%360+360)%360})`};$_=function(){this.dispatchEvent(new CustomEvent("chart-edit",{detail:{chart:this.config}}))};I_=function(){this.dispatchEvent(new CustomEvent("chart-deleted",{detail:{id:this.config.id}}))};P_=function(e){this.dispatchEvent(new CustomEvent("chart-resized",{detail:{id:this.config.id,...e}}))};O_=function(e){je(this,ce,Al).call(this,e,{horizontal:!0})};T_=function(e){je(this,ce,Al).call(this,e,{vertical:!0})};A_=function(e){je(this,ce,Al).call(this,e,{horizontal:!0,vertical:!0})};Al=function(e,{horizontal:t,vertical:n}){e.preventDefault(),e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const s=this.closest(".chart-grid")??this.parentElement;if(!s)return;const r=s.getBoundingClientRect(),a=getComputedStyle(s),o=t?a.gridTemplateColumns.split(" ").length:0,c=n?parseFloat(a.gridTemplateRows.split(" ")[0])||200:0,l=n&&parseFloat(a.rowGap)||0;let h=this.config.colSpan??1,u=this.config.rowSpan??1;const d=t&&n?"data-resizing-corner":t?"data-resizing":"data-resizing-vertical";this.setAttribute(d,"");const f=g=>{if(t){const b=(g.clientX-r.left)/r.width,_=Math.round(b*o),w=this.getBoundingClientRect().left-r.left,C=Math.round(w/r.width*o);h=Math.max(1,Math.min(o-C,_-C)),this.style.gridColumn=`span ${h}`}if(n){const m=this.getBoundingClientRect().top-r.top,_=g.clientY-r.top-m;u=Math.max(1,Math.round((_+l)/(c+l))),this.style.gridRow=`span ${u}`}},p=()=>{this.removeAttribute(d),i.removeEventListener("pointermove",f),i.removeEventListener("pointerup",p),je(this,ce,P_).call(this,{...t&&{colSpan:Math.max(1,Math.min(6,h))},...n&&{rowSpan:Math.max(1,Math.min(4,u))}})};i.addEventListener("pointermove",f),i.addEventListener("pointerup",p)};Is.styles=[Ar,mt`
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
    `];vo([Q({type:Object})],Is.prototype,"config",2);vo([Q({type:Array})],Is.prototype,"transactions",2);vo([Q({type:Array})],Is.prototype,"tags",2);vo([Q({type:Array})],Is.prototype,"merchants",2);Is=vo([$t("dashboard-chart-card")],Is);function R_(e){if(e.startsWith("#"))return VA(e);const t=UA(e);if(t)return t;const n=e.match(/hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\s*\)/);return n?qA(Number(n[1]),Number(n[2]),Number(n[3])):{r:0,g:0,b:0}}function VA(e){const t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function UA(e){const t=e.match(/lch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(!t)return null;const n=Number(t[1]),i=Number(t[2]),r=Number(t[3])*Math.PI/180,a=i*Math.cos(r),o=i*Math.sin(r),c=(n+16)/116,l=a/500+c,h=c-o/200,u=.008856,d=903.3,f=l**3>u?l**3:(116*l-16)/d,p=n>d*u?((n+16)/116)**3:n/d,g=h**3>u?h**3:(116*h-16)/d,m=f*.95047,b=p*1,_=g*1.08883,w=3.2404542*m-1.5371385*b-.4985314*_,C=-.969266*m+1.8760108*b+.041556*_,x=.0556434*m-.2040259*b+1.0572252*_,E=M=>{const v=Math.max(0,Math.min(1,M));return v<=.0031308?12.92*v:1.055*v**(1/2.4)-.055};return{r:Math.round(E(w)*255),g:Math.round(E(C)*255),b:Math.round(E(x)*255)}}function qA(e,t,n){const i=t/100,s=n/100,r=(1-Math.abs(2*s-1))*i,a=r*(1-Math.abs(e/60%2-1)),o=s-r/2;let c=0,l=0,h=0;return e<60?(c=r,l=a):e<120?(c=a,l=r):e<180?(l=r,h=a):e<240?(l=a,h=r):e<300?(c=a,h=r):(c=r,h=a),{r:Math.round((c+o)*255),g:Math.round((l+o)*255),b:Math.round((h+o)*255)}}function L_(e){return KA(e)>70?"black":"white"}function KA(e){const t=e.match(/lch\(\s*([\d.]+)\s/);if(t)return Number(t[1]);const{r:n,g:i,b:s}=R_(e),[r,a,o]=[n,i,s].map(l=>{const h=l/255;return h<=.03928?h/12.92:((h+.055)/1.055)**2.4}),c=.2126*r+.7152*a+.0722*o;return c>.008856?116*Math.cbrt(c)-16:903.3*c}const YA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,XA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,GA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,QA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,JA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ZA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,tR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,eR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,nR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,iR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,sR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,rR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,aR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,oR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,cR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,lR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,hR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,uR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,dR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,fR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,pR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,gR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,mR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,vR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,bR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,_R=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,yR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,wR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,xR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,SR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,kR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,CR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,MR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ER=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,DR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,$R=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,IR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,PR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,OR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,TR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,AR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,RR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,LR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,NR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,FR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,BR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,zR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,jR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,WR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,HR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,VR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,UR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,qR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,KR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,YR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,XR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,GR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,QR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,JR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ZR=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,t4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
</svg>`,e4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,n4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,i4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,s4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,r4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,a4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,o4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,c4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var l4=Object.defineProperty,h4=Object.getOwnPropertyDescriptor,N_=e=>{throw TypeError(e)},Rl=(e,t,n,i)=>{for(var s=i>1?void 0:i?h4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&l4(t,n,s),s},F_=(e,t,n)=>t.has(e)||N_("Cannot "+n),qr=(e,t,n)=>(F_(e,t,"read from private field"),n?n.call(e):t.get(e)),Th=(e,t,n)=>t.has(e)?N_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ra=(e,t,n)=>(F_(e,t,"access private method"),n),oc,cc,vi,B_,Yd,z_,j_,W_;const Ll={apple:YA,banknote:T0,beaker:XA,beer:GA,bell:QA,bike:JA,"book-open":ZA,briefcase:eR,bug:nR,cake:iR,calculator:sR,calendar:rR,camera:aR,car:oR,carrot:cR,"chef-hat":lR,"circle-dollar-sign":hR,"circle-plus":uR,clock:fR,cloud:pR,coffee:gR,"credit-card":mR,box:tR,"cup-soda":vR,dumbbell:bR,flask:_R,gamepad:yR,gift:wR,globe:xR,"graduation-cap":SR,hamburger:kR,heart:CR,home:MR,joystick:ER,key:DR,lightbulb:$R,mail:IR,"map-pin":PR,milk:OR,monitor:TR,music:AR,newspaper:RR,paintbrush:LR,"paw-print":NR,phone:FR,pizza:BR,plane:zR,puzzle:jR,question:dR,receipt:WR,scale:HR,scissors:VR,"shield-check":UR,shirt:qR,"shopping-bag":KR,"shopping-cart":YR,sparkles:XR,star:GR,store:A0,sun:QR,ticket:JR,trophy:ZR,truck:t4,tv:e4,user:n4,users:i4,utensils:s4,wallet:r4,wifi:a4,wine:o4,wrench:Tl,zap:c4},dm=Object.entries(Ll);let Cr=class extends gt{constructor(){super(...arguments),Th(this,vi),this.value="",this._open=!1,this._search="",Th(this,oc,e=>{if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._search="")}),Th(this,cc,()=>{this._open&&ra(this,vi,Yd).call(this)})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",qr(this,oc),!0),window.addEventListener("scroll",qr(this,cc),!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",qr(this,oc),!0),window.removeEventListener("scroll",qr(this,cc),!0)}render(){const e=this.value?Ll[this.value]:null;return k`
      <button
        class="trigger ${e?"":"placeholder"}"
        @click=${ra(this,vi,B_)}
        title="Pick icon"
      >
        ${e?re(e):"?"}
      </button>
      ${this._open?k`
            <div class="popup">
              <input
                class="search"
                type="text"
                placeholder="Search icons..."
                .value=${this._search}
                @input=${t=>{this._search=t.target.value}}
              />
              <div class="grid">
                ${qr(this,vi,W_).map(([t,n])=>k`
                    <button
                      class="icon-option ${this.value===t?"selected":""}"
                      title=${t}
                      @click=${()=>ra(this,vi,z_).call(this,t)}
                    >
                      ${re(n)}
                    </button>
                  `)}
              </div>
              ${this.value?k`<button class="clear-btn" @click=${ra(this,vi,j_)}>Clear icon</button>`:G}
            </div>
          `:G}
    `}};oc=new WeakMap;cc=new WeakMap;vi=new WeakSet;B_=function(){this._open=!this._open,this._search="",this._open&&this.updateComplete.then(()=>ra(this,vi,Yd).call(this))};Yd=function(){const e=this.shadowRoot?.querySelector(".trigger"),t=this.shadowRoot?.querySelector(".popup");if(!e||!t)return;const n=e.getBoundingClientRect(),i=t.offsetHeight,s=window.innerHeight-n.bottom;s<i+4&&n.top>s?t.style.top=`${n.top-i-4}px`:t.style.top=`${n.bottom+4}px`,t.style.left=`${n.left}px`};z_=function(e){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:e}})),this._open=!1,this._search=""};j_=function(){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:""}})),this._open=!1,this._search=""};W_=function(){if(!this._search)return dm;const e=this._search.toLowerCase();return dm.filter(([t])=>t.includes(e))};Cr.styles=mt`
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
  `;Rl([Q({type:String})],Cr.prototype,"value",2);Rl([I()],Cr.prototype,"_open",2);Rl([I()],Cr.prototype,"_search",2);Cr=Rl([$t("icon-picker")],Cr);var u4=Object.defineProperty,d4=Object.getOwnPropertyDescriptor,H_=e=>{throw TypeError(e)},Xd=(e,t,n,i)=>{for(var s=i>1?void 0:i?d4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&u4(t,n,s),s},f4=(e,t,n)=>t.has(e)||H_("Cannot "+n),p4=(e,t,n)=>t.has(e)?H_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),g4=(e,t,n)=>(f4(e,t,"access private method"),n),Pu,V_;let Za=class extends gt{constructor(){super(...arguments),p4(this,Pu),this.tags=[],this.tagIds=[]}render(){return k`${this.tagIds.map(e=>{const t=this.tags.find(s=>s.id===e),n=t?.color??"var(--budgee-primary)",i=t?.color?L_(t.color):"white";return k`<span class="tag-pill" style="background:${n};color:${i}">${g4(this,Pu,V_).call(this,e)}</span>`})}`}};Pu=new WeakSet;V_=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?Ll[t.icon]:null;return n?k`<span class="pill-icon">${re(n)}</span> ${t.name}`:t.name};Za.styles=mt`
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
  `;Xd([Q({type:Array})],Za.prototype,"tags",2);Xd([Q({type:Array})],Za.prototype,"tagIds",2);Za=Xd([$t("tag-pills")],Za);var m4=Object.defineProperty,v4=Object.getOwnPropertyDescriptor,U_=e=>{throw TypeError(e)},Hi=(e,t,n,i)=>{for(var s=i>1?void 0:i?v4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&m4(t,n,s),s},b4=(e,t,n)=>t.has(e)||U_("Cannot "+n),_4=(e,t,n)=>t.has(e)?U_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),_t=(e,t,n)=>(b4(e,t,"access private method"),n),ft,q_,K_,Y_,X_,G_,Q_,Nl,Fl,J_,Z_,Bl,zl,ty,ey,ny,iy,sy,ry,ay,oy,cy;let Tn=class extends gt{constructor(){super(...arguments),_4(this,ft),this.transactions=[],this.tags=[],this.merchants=[],this.accounts=[],this._page=1,this._pageSize=10}render(){return k`
      <div class="resize-handle" @pointerdown=${_t(this,ft,X_)}></div>
      <div class="resize-handle-bottom" @pointerdown=${_t(this,ft,G_)}></div>
      <div class="resize-handle-corner" @pointerdown=${_t(this,ft,Q_)}></div>
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${_t(this,ft,q_)}>${re(Tl)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${_t(this,ft,K_)}>${re(Tr)}</button>
        </div>
      </div>
      ${_t(this,ft,cy).call(this)}
    `}};ft=new WeakSet;q_=function(){this.dispatchEvent(new CustomEvent("table-edit",{detail:{table:this.config}}))};K_=function(){this.dispatchEvent(new CustomEvent("table-deleted",{detail:{id:this.config.id}}))};Y_=function(e){this.dispatchEvent(new CustomEvent("table-resized",{detail:{id:this.config.id,...e}}))};X_=function(e){_t(this,ft,Nl).call(this,e,{horizontal:!0})};G_=function(e){_t(this,ft,Nl).call(this,e,{vertical:!0})};Q_=function(e){_t(this,ft,Nl).call(this,e,{horizontal:!0,vertical:!0})};Nl=function(e,{horizontal:t,vertical:n}){e.preventDefault(),e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const s=this.closest(".table-grid")??this.parentElement;if(!s)return;const r=s.getBoundingClientRect(),a=getComputedStyle(s),o=t?a.gridTemplateColumns.split(" ").length:0,c=n?parseFloat(a.gridTemplateRows.split(" ")[0])||200:0,l=n&&parseFloat(a.rowGap)||0;let h=this.config.colSpan??1,u=this.config.rowSpan??1;const d=t&&n?"data-resizing-corner":t?"data-resizing":"data-resizing-vertical";this.setAttribute(d,"");const f=g=>{if(t){const b=(g.clientX-r.left)/r.width,_=Math.round(b*o),w=this.getBoundingClientRect().left-r.left,C=Math.round(w/r.width*o);h=Math.max(1,Math.min(o-C,_-C)),this.style.gridColumn=`span ${h}`}if(n){const m=this.getBoundingClientRect().top-r.top,_=g.clientY-r.top-m;u=Math.max(1,Math.round((_+l)/(c+l))),this.style.gridRow=`span ${u}`}},p=()=>{this.removeAttribute(d),i.removeEventListener("pointermove",f),i.removeEventListener("pointerup",p),_t(this,ft,Y_).call(this,{...t&&{colSpan:Math.max(1,Math.min(6,h))},...n&&{rowSpan:Math.max(1,Math.min(4,u))}})};i.addEventListener("pointermove",f),i.addEventListener("pointerup",p)};Fl=function(e){this._page=e.detail.page,this._pageSize=e.detail.pageSize};J_=function(e){return e?this.merchants.find(t=>t.id===e)?.name??"":""};Z_=function(e){return e?this.accounts.find(t=>t.id===e)?.name??"":""};Bl=function(e){return{date:"Date",amount:"Amount",description:"Description",merchant:"Merchant",tags:"Tags",account:"Account",name:"Name",transactionCount:"Transactions",totalAmount:"Total Amount"}[e]};zl=function(e){return e==="amount"||e==="totalAmount"};ty=function(){const e=[...this.transactions].sort((s,r)=>r.date.localeCompare(s.date)),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return k`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${_t(this,ft,Fl)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(s=>k`
                <th class=${_t(this,ft,zl).call(this,s)?"col-amount":""}>${_t(this,ft,Bl).call(this,s)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(s=>k`
              <tr>
                ${i.map(r=>_t(this,ft,ey).call(this,s,r))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};ey=function(e,t){switch(t){case"date":return k`<td>${e.date}</td>`;case"amount":return k`<td class="col-amount ${e.amount<0?"amount-negative":"amount-positive"}">${e.amount.toFixed(2)}</td>`;case"description":return k`<td>${e.originalDescription}</td>`;case"merchant":return k`<td>${_t(this,ft,J_).call(this,e.merchantId)}</td>`;case"tags":return k`<td><tag-pills .tags=${this.tags} .tagIds=${e.tagIds}></tag-pills></td>`;case"account":return k`<td>${_t(this,ft,Z_).call(this,e.accountId)}</td>`;default:return k`
          <td></td>
        `}};ny=function(){const e=new Map,t=new Map;for(const n of this.transactions)n.merchantId!=null&&(e.set(n.merchantId,(e.get(n.merchantId)??0)+1),t.set(n.merchantId,(t.get(n.merchantId)??0)+n.amount));return this.merchants.map(n=>({merchant:n,transactionCount:e.get(n.id)??0,totalAmount:t.get(n.id)??0}))};iy=function(){const e=_t(this,ft,ny).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return k`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${_t(this,ft,Fl)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(s=>k`
                <th class=${_t(this,ft,zl).call(this,s)?"col-amount":""}>${_t(this,ft,Bl).call(this,s)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(s=>k`
              <tr>
                ${i.map(r=>_t(this,ft,sy).call(this,s,r))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};sy=function(e,t){switch(t){case"name":return k`<td>${e.merchant.name}</td>`;case"transactionCount":return k`<td>${e.transactionCount}</td>`;case"totalAmount":return k`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return k`
          <td></td>
        `}};ry=function(){const e=new Map,t=new Map;for(const n of this.transactions)for(const i of n.tagIds)e.set(i,(e.get(i)??0)+1),t.set(i,(t.get(i)??0)+n.amount);return this.tags.map(n=>({tag:n,transactionCount:e.get(n.id)??0,totalAmount:t.get(n.id)??0}))};ay=function(){const e=_t(this,ft,ry).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return k`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${_t(this,ft,Fl)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(s=>k`
                <th class=${_t(this,ft,zl).call(this,s)?"col-amount":""}>${_t(this,ft,Bl).call(this,s)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(s=>k`
              <tr>
                ${i.map(r=>_t(this,ft,oy).call(this,s,r))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};oy=function(e,t){switch(t){case"name":return k`<td>${e.tag.name}</td>`;case"transactionCount":return k`<td>${e.transactionCount}</td>`;case"totalAmount":return k`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return k`
          <td></td>
        `}};cy=function(){switch(this.config.model){case"transactions":return _t(this,ft,ty).call(this);case"merchants":return _t(this,ft,iy).call(this);case"tags":return _t(this,ft,ay).call(this);default:return G}};Tn.styles=[ui,Ar,mt`
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
    `];Hi([Q({type:Object})],Tn.prototype,"config",2);Hi([Q({type:Array})],Tn.prototype,"transactions",2);Hi([Q({type:Array})],Tn.prototype,"tags",2);Hi([Q({type:Array})],Tn.prototype,"merchants",2);Hi([Q({type:Array})],Tn.prototype,"accounts",2);Hi([I()],Tn.prototype,"_page",2);Hi([I()],Tn.prototype,"_pageSize",2);Tn=Hi([$t("dashboard-table-card")],Tn);var y4=Object.defineProperty,w4=Object.getOwnPropertyDescriptor,ly=e=>{throw TypeError(e)},Vi=(e,t,n,i)=>{for(var s=i>1?void 0:i?w4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&y4(t,n,s),s},x4=(e,t,n)=>t.has(e)||ly("Cannot "+n),S4=(e,t,n)=>t.has(e)?ly("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ah=(e,t,n)=>(x4(e,t,"access private method"),n),aa,hy,uy,dy;const Gd={transactions:[{id:"date",label:"Date"},{id:"amount",label:"Amount"},{id:"description",label:"Description"},{id:"merchant",label:"Merchant"},{id:"tags",label:"Tags"},{id:"account",label:"Account"}],merchants:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}],tags:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}]};function fy(e){return Gd[e].map(t=>t.id)}let An=class extends gt{constructor(){super(...arguments),S4(this,aa),this._title="",this._model="transactions",this._columns=fy("transactions"),this._colSpan=1,this._rowSpan=1,this._initialized=!1}updated(e){e.has("editingTable")&&this.editingTable&&!this._initialized&&(this._title=this.editingTable.title,this._model=this.editingTable.model,this._columns=[...this.editingTable.columns],this._colSpan=this.editingTable.colSpan??1,this._rowSpan=this.editingTable.rowSpan??1,this._initialized=!0)}render(){const e=Gd[this._model];return k`
      <h4>${this.editingTable?"Edit Table":"Add Table"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${t=>{this._title=t.target.value}}
        />
        <label>Model:</label>
        <select @change=${t=>{Ah(this,aa,hy).call(this,t.target.value)}}>
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
        ${e.map(t=>k`
          <label>
            <input
              type="checkbox"
              ?checked=${this._columns.includes(t.id)}
              @change=${n=>Ah(this,aa,uy).call(this,t.id,n.target.checked)}
            />
            ${t.label}
          </label>
        `)}
      </div>
      <button @click=${Ah(this,aa,dy)}>${this.editingTable?"Update Table":"Save to Dashboard"}</button>
    `}};aa=new WeakSet;hy=function(e){this._model=e,this._columns=fy(e)};uy=function(e,t){if(t){const n=Gd[this._model].map(i=>i.id);this._columns=n.filter(i=>this._columns.includes(i)||i===e)}else this._columns=this._columns.filter(n=>n!==e)};dy=function(){const e=this._title.trim();!e||this._columns.length===0||(this.dispatchEvent(new CustomEvent("table-saved",{detail:{id:this.editingTable?.id,title:e,model:this._model,columns:this._columns,colSpan:this._colSpan,rowSpan:this._rowSpan}})),this._title="",this._initialized=!1)};An.styles=[Fn,mt`
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
    `];Vi([Q({type:Object})],An.prototype,"editingTable",2);Vi([I()],An.prototype,"_title",2);Vi([I()],An.prototype,"_model",2);Vi([I()],An.prototype,"_columns",2);Vi([I()],An.prototype,"_colSpan",2);Vi([I()],An.prototype,"_rowSpan",2);Vi([I()],An.prototype,"_initialized",2);An=Vi([$t("table-configurator")],An);var k4=Object.defineProperty,C4=Object.getOwnPropertyDescriptor,py=e=>{throw TypeError(e)},vn=(e,t,n,i)=>{for(var s=i>1?void 0:i?C4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&k4(t,n,s),s},Qd=(e,t,n)=>t.has(e)||py("Cannot "+n),M4=(e,t,n)=>(Qd(e,t,"read from private field"),n?n.call(e):t.get(e)),fm=(e,t,n)=>t.has(e)?py("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),pm=(e,t,n,i)=>(Qd(e,t,"write to private field"),t.set(e,n),n),Yt=(e,t,n)=>(Qd(e,t,"access private method"),n),oa,Wt,Rn,Ou,gy,my,vy,by,_y,yy,wy,xy,Sy;let Ue=class extends gt{constructor(){super(...arguments),fm(this,Wt),this._transactions=null,this._tags=[],this._merchants=[],this._accounts=[],this._charts=[],this._tables=[],this._showChartConfigurator=!1,this._showTableConfigurator=!1,fm(this,oa,[])}connectedCallback(){super.connectedCallback(),Yt(this,Wt,Rn).call(this);const e=Or(()=>Yt(this,Wt,Rn).call(this),300);Promise.all([Se.subscribe(e),_e.subscribe(e),Ve.subscribe(e),Li.subscribe(e),Zn.subscribe(e),Ms.subscribe(e)]).then(t=>{pm(this,oa,t)})}disconnectedCallback(){super.disconnectedCallback(),this._chartSortable?.destroy(),this._tableSortable?.destroy();for(const e of M4(this,oa))e.unsubscribe();pm(this,oa,[])}updated(){Yt(this,Wt,Ou).call(this,".chart-grid","chart",e=>{this._chartSortable=e}),Yt(this,Wt,Ou).call(this,".table-grid","table",e=>{this._tableSortable=e})}render(){return this._transactions===null?k`
        <h3>Dashboard</h3>
        <p>Loading…</p>
      `:this._transactions.length===0?k`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `:k`
      <h3>Dashboard</h3>

      ${this._charts.length>0?k`
            <div class="chart-grid">
              ${this._charts.map(e=>k`
                <dashboard-chart-card
                  data-chart-id=${e.id}
                  style="grid-column: span ${e.colSpan??1}; grid-row: span ${e.rowSpan??1}"
                  .config=${e}
                  .transactions=${this._transactions}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  @chart-edit=${Yt(this,Wt,vy)}
                  @chart-resized=${Yt(this,Wt,by)}
                  @chart-deleted=${Yt(this,Wt,_y)}
                ></dashboard-chart-card>
              `)}
            </div>
          `:G}

      ${this._tables.length>0?k`
            <div class="table-grid">
              ${this._tables.map(e=>k`
                <dashboard-table-card
                  data-table-id=${e.id}
                  style="grid-column: span ${e.colSpan??1}; grid-row: span ${e.rowSpan??1}"
                  .config=${e}
                  .transactions=${this._transactions}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  .accounts=${this._accounts}
                  @table-edit=${Yt(this,Wt,wy)}
                  @table-resized=${Yt(this,Wt,xy)}
                  @table-deleted=${Yt(this,Wt,Sy)}
                ></dashboard-table-card>
              `)}
            </div>
          `:G}

      <div class="button-bar">
        <button @click=${()=>{this._showChartConfigurator=!0,this._editingChart=void 0}}>
          Add Chart
        </button>
        <button @click=${()=>{this._showTableConfigurator=!0,this._editingTable=void 0}}>
          Add Table
        </button>
      </div>

      ${this._showChartConfigurator?k`
            <budgee-modal
              heading=${this._editingChart?"Edit Chart":"Add Chart"}
              @modal-close=${()=>{this._showChartConfigurator=!1,this._editingChart=void 0}}
            >
              <chart-configurator
                .transactions=${this._transactions}
                .tags=${this._tags}
                .merchants=${this._merchants}
                .editingChart=${this._editingChart}
                @chart-saved=${Yt(this,Wt,my)}
              ></chart-configurator>
            </budgee-modal>
          `:G}

      ${this._showTableConfigurator?k`
            <budgee-modal
              heading=${this._editingTable?"Edit Table":"Add Table"}
              @modal-close=${()=>{this._showTableConfigurator=!1,this._editingTable=void 0}}
            >
              <table-configurator
                .editingTable=${this._editingTable}
                @table-saved=${Yt(this,Wt,yy)}
              ></table-configurator>
            </budgee-modal>
          `:G}
    `}};oa=new WeakMap;Wt=new WeakSet;Rn=async function(){this._transactions=await Se.all(),this._tags=await _e.all(),this._merchants=await Ve.all(),this._accounts=await Li.all(),this._charts=await Zn.all(),this._tables=await Ms.all(),this._charts.length===0&&(await Zn.create({title:"Monthly Overview",chartType:"bar",granularity:"month",colSpan:6,position:0}),this._charts=await Zn.all())};Ou=function(e,t,n){const i=t==="chart"?this._chartSortable:this._tableSortable,s=this.shadowRoot?.querySelector(e);if(!s){i?.destroy(),n(void 0);return}i?.el!==s&&(i?.destroy(),n(K.create(s,{animation:150,onEnd:()=>Yt(this,Wt,gy).call(this,t)})))};gy=async function(e){const t=e==="chart"?".chart-grid":".table-grid",n=e==="chart"?"data-chart-id":"data-table-id",i=this.shadowRoot?.querySelector(t);if(!i)return;const s=i.querySelectorAll(`[${n}]`),r=[];s.forEach(a=>{const o=a.getAttribute(n);o&&r.push(o)}),e==="chart"?await Zn.reorder(r):await Ms.reorder(r),await Yt(this,Wt,Rn).call(this)};my=async function(e){const t=e.detail;t.id?await Zn.update(t.id,{title:t.title,chartType:t.chartType,granularity:t.granularity,startDate:t.startDate,excludedTagIds:t.excludedTagIds,excludedMerchantIds:t.excludedMerchantIds,legendPosition:t.legendPosition,filters:t.filters}):await Zn.create({...t,colSpan:6,position:this._charts.length}),this._showChartConfigurator=!1,this._editingChart=void 0,await Yt(this,Wt,Rn).call(this)};vy=function(e){this._editingChart=e.detail.chart,this._showChartConfigurator=!0};by=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await Zn.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await Yt(this,Wt,Rn).call(this)};_y=async function(e){await Zn.remove(e.detail.id),await Yt(this,Wt,Rn).call(this)};yy=async function(e){const t=e.detail;t.id?await Ms.update(t.id,{title:t.title,model:t.model,columns:t.columns,colSpan:t.colSpan,rowSpan:t.rowSpan}):await Ms.create({...t,position:this._tables.length}),this._showTableConfigurator=!1,this._editingTable=void 0,await Yt(this,Wt,Rn).call(this)};wy=function(e){this._editingTable=e.detail.table,this._showTableConfigurator=!0};xy=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await Ms.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await Yt(this,Wt,Rn).call(this)};Sy=async function(e){await Ms.remove(e.detail.id),await Yt(this,Wt,Rn).call(this)};Ue.styles=[Fn,ui,mt`
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
      .chart-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 200px;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      @media (min-width: 700px) {
        .chart-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (min-width: 1200px) {
        .chart-grid {
          grid-template-columns: repeat(6, 1fr);
        }
      }
      .table-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 200px;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      @media (min-width: 700px) {
        .table-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (min-width: 1200px) {
        .table-grid {
          grid-template-columns: repeat(6, 1fr);
        }
      }
      button {
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
      }
      .button-bar {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
    `];vn([I()],Ue.prototype,"_transactions",2);vn([I()],Ue.prototype,"_tags",2);vn([I()],Ue.prototype,"_merchants",2);vn([I()],Ue.prototype,"_accounts",2);vn([I()],Ue.prototype,"_charts",2);vn([I()],Ue.prototype,"_tables",2);vn([I()],Ue.prototype,"_showChartConfigurator",2);vn([I()],Ue.prototype,"_editingChart",2);vn([I()],Ue.prototype,"_showTableConfigurator",2);vn([I()],Ue.prototype,"_editingTable",2);Ue=vn([$t("budgee-dashboard")],Ue);var E4=Object.defineProperty,D4=Object.getOwnPropertyDescriptor,ky=e=>{throw TypeError(e)},js=(e,t,n,i)=>{for(var s=i>1?void 0:i?D4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&E4(t,n,s),s},Jd=(e,t,n)=>t.has(e)||ky("Cannot "+n),$4=(e,t,n)=>(Jd(e,t,"read from private field"),n?n.call(e):t.get(e)),gm=(e,t,n)=>t.has(e)?ky("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),mm=(e,t,n,i)=>(Jd(e,t,"write to private field"),t.set(e,n),n),Ie=(e,t,n)=>(Jd(e,t,"access private method"),n),ca,ge,Tu,Cy,My,Ey,Dy,lc,hc,$y,Iy;let ai=class extends gt{constructor(){super(...arguments),gm(this,ge),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",gm(this,ca,[])}connectedCallback(){super.connectedCallback(),Ie(this,ge,Tu).call(this);const e=Or(()=>Ie(this,ge,Tu).call(this),300);Promise.all([Ve.subscribe(e),Se.subscribe(e)]).then(t=>{mm(this,ca,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of $4(this,ca))e.unsubscribe();mm(this,ca,[])}render(){if(this._rows===null)return k`
        <p>Loading…</p>
      `;if(this._rows.length===0)return k`
        <p>No merchants found.</p>
      `;const e=this._rows.filter(s=>Ie(this,ge,Dy).call(this,s)),t=Ie(this,ge,$y).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return k`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="merchants"
        ?filterable=${!0}
        @page-change=${Ie(this,ge,My)}
        @filter-change=${Ie(this,ge,Ey)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>Ie(this,ge,lc).call(this,"name")}>
                Name${Ie(this,ge,hc).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>Ie(this,ge,lc).call(this,"count")}>
                Transactions${Ie(this,ge,hc).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>Ie(this,ge,lc).call(this,"spend")}>
                Total Spend${Ie(this,ge,hc).call(this,"spend")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(s=>k`
              <tr @click=${()=>Ie(this,ge,Iy).call(this,s.merchant.id)}>
                <td>${s.merchant.name}</td>
                <td>${s.transactionCount??"…"}</td>
                <td class="col-amount ${s.totalSpend!=null&&s.totalSpend<0?"amount-negative":"amount-positive"}">
                  ${s.totalSpend!=null?s.totalSpend.toFixed(2):"…"}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};ca=new WeakMap;ge=new WeakSet;Tu=async function(){const e=await Ve.all();this._rows=e.map(t=>({merchant:t,transactionCount:null,totalSpend:null})),Ie(this,ge,Cy).call(this)};Cy=async function(){const e=await Se.all(),t=new Map,n=new Map;for(const i of e)i.merchantId!=null&&(t.set(i.merchantId,(t.get(i.merchantId)??0)+1),n.set(i.merchantId,(n.get(i.merchantId)??0)+i.amount));this._rows=this._rows.map(i=>({...i,transactionCount:t.get(i.merchant.id)??0,totalSpend:n.get(i.merchant.id)??0}))};My=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};Ey=function(e){this._filter=e.detail.filter,this._currentPage=1};Dy=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.merchant.name.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.totalSpend!=null&&e.totalSpend.toFixed(2).includes(t))};lc=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};hc=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};$y=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,s)=>{let r=0;return t==="name"?r=i.merchant.name.localeCompare(s.merchant.name):t==="count"?r=(i.transactionCount??0)-(s.transactionCount??0):t==="spend"&&(r=(i.totalSpend??0)-(s.totalSpend??0)),r*n})};Iy=function(e){window.history.pushState({},"",`/merchants/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};ai.styles=[ui,mt`
      tbody tr {
        cursor: pointer;
      }
    `];js([I()],ai.prototype,"_rows",2);js([I()],ai.prototype,"_currentPage",2);js([I()],ai.prototype,"_pageSize",2);js([I()],ai.prototype,"_filter",2);js([I()],ai.prototype,"_sortCol",2);js([I()],ai.prototype,"_sortDir",2);ai=js([$t("merchant-list")],ai);const I4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;function P4(e,t){const n=t.value.toLowerCase();switch(t.operator){case"contains":return e.includes(n);case"startsWith":return e.startsWith(n);case"equals":return e===n;case"regex":return new RegExp(t.value,"i").test(e)}}function jl(e,t,n){if(t.accountId&&t.accountId!==n)return!1;const i=t.logic==="and"?"every":"some";return t.conditions[i](s=>P4(e,s))}class Dn{constructor(){}static async subscribe(t){return(await U()).merchantRules.subscribe(t)}static async all(){return(await U()).merchantRules.all()}static async create(t){const n=await U(),i=Pn();return await n.merchantRules.put({...t,id:i}),i}static async put(t){const n=await U();t.id?await n.merchantRules.put(t):await n.merchantRules.put({...t,id:Pn()})}static async update(t,n){const i=await U(),s=await i.merchantRules.get(t);await i.merchantRules.put({...s,...n})}static async remove(t){await(await U()).merchantRules.remove(t)}static async applyToTransactions(t){const n=await U(),i=await n.transactions.all(),s=[];for(const r of i){const a=r.originalDescription.toLowerCase();jl(a,t)&&s.push({...r,merchantId:t.merchantId??r.merchantId,tagIds:[...new Set([...r.tagIds,...t.tagIds])]})}return s.length>0&&await n.transactions.bulkDocs(s),s.length}}const bo=mt`
  :host([busy]) {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
`;function _o(e){class t extends e{constructor(){super(...arguments),this._busy=!1}async withBusy(i){this._busy=!0,this.toggleAttribute("busy",!0),this.requestUpdate();try{return await i()}finally{this._busy=!1,this.toggleAttribute("busy",!1),this.requestUpdate()}}get busy(){return this._busy}}return t}const O4=/^(SQ \*|TST\* |SP \*?|PAYPAL \*)/i,T4=/((St.\s+)?[^\s]+)?\s*,\s*\w{2}$/,A4=e=>e.replace(O4,"").trim().replace(T4,"").trim().toLocaleLowerCase().split(" ").map(n=>n.charAt(0).toLocaleUpperCase()+n.slice(1)).join(" ");var R4=Object.defineProperty,L4=Object.getOwnPropertyDescriptor,Py=e=>{throw TypeError(e)},yo=(e,t,n,i)=>{for(var s=i>1?void 0:i?L4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&R4(t,n,s),s},Oy=(e,t,n)=>t.has(e)||Py("Cannot "+n),Au=(e,t,n)=>(Oy(e,t,"read from private field"),n?n.call(e):t.get(e)),N4=(e,t,n)=>t.has(e)?Py("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),os=(e,t,n)=>(Oy(e,t,"access private method"),n),tn,Zd,Ty,Ay,Ry,Ly,Ny,tf,Fy;let Ps=class extends gt{constructor(){super(...arguments),N4(this,tn),this.merchants=[],this.value="",this._highlightIndex=-1,this._open=!1}render(){const e=Au(this,tn,Zd),t=Au(this,tn,Fy),n=this._open&&e.length>0&&!t,i=this.value.trim();return k`
      <div class="input-wrapper">
        <input
          type="text"
          placeholder="Merchant name (optional)"
          .value=${this.value}
          @input=${os(this,tn,Ty)}
          @paste=${os(this,tn,Ay)}
          @keydown=${os(this,tn,Ry)}
          @focus=${os(this,tn,Ly)}
          @blur=${os(this,tn,Ny)}
        />
        ${i?t?k`
                  <span class="status existing">existing</span>
                `:k`
                  <span class="status new">new</span>
                `:G}
      </div>
      ${n?k`
          <div class="suggestions">
            ${e.map((s,r)=>k`
              <div
                class="suggestion ${r===this._highlightIndex?"highlighted":""}"
                @click=${()=>os(this,tn,tf).call(this,s)}
              >
                ${s.name}
              </div>
            `)}
          </div>
        `:G}
    `}};tn=new WeakSet;Zd=function(){const e=this.value.toLowerCase().trim();return e?this.merchants.filter(t=>t.name.toLowerCase().includes(e)):[]};Ty=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:t}})),this._highlightIndex=-1,this._open=t.trim().length>0};Ay=function(e){e.preventDefault();const n=(e.clipboardData?.getData("text")??"").toLowerCase().replace(/(?:^|\s)\S/g,s=>s.toUpperCase()),i=e.target;i.value=n,this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:n}})),this._highlightIndex=-1,this._open=n.trim().length>0};Ry=function(e){const t=Au(this,tn,Zd);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,t.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"&&this._highlightIndex>=0&&this._highlightIndex<t.length?(e.preventDefault(),os(this,tn,tf).call(this,t[this._highlightIndex])):e.key==="Escape"&&(this._open=!1)};Ly=function(){this.value.trim().length>0&&(this._open=!0)};Ny=function(){setTimeout(()=>{this._open=!1},150)};tf=function(e){this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:e.name}})),this._open=!1,this._highlightIndex=-1};Fy=function(){const e=this.value.trim().toLowerCase();return e.length>0&&this.merchants.some(t=>t.name.toLowerCase()===e)};Ps.styles=mt`
    :host {
      display: inline-block;
      position: relative;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    input {
      padding: 4px 8px;
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
  `;yo([Q({type:Array})],Ps.prototype,"merchants",2);yo([Q({type:String})],Ps.prototype,"value",2);yo([I()],Ps.prototype,"_highlightIndex",2);yo([I()],Ps.prototype,"_open",2);Ps=yo([$t("merchant-autocomplete")],Ps);var F4=Object.defineProperty,B4=Object.getOwnPropertyDescriptor,By=e=>{throw TypeError(e)},Ws=(e,t,n,i)=>{for(var s=i>1?void 0:i?B4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&F4(t,n,s),s},zy=(e,t,n)=>t.has(e)||By("Cannot "+n),wi=(e,t,n)=>(zy(e,t,"read from private field"),n?n.call(e):t.get(e)),z4=(e,t,n)=>t.has(e)?By("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),oe=(e,t,n)=>(zy(e,t,"access private method"),n),Ct,ef,ds,jy,nf,Wy,Hy,Vy,Uy,qy,nl,il,Wl;let oi=class extends gt{constructor(){super(...arguments),z4(this,Ct),this.tags=[],this.selectedTagIds=[],this.excludeIds=[],this._query="",this._highlightIndex=-1,this._open=!1}updated(e){e.has("_open")&&this._open&&this.updateComplete.then(()=>oe(this,Ct,Wy).call(this))}render(){const e=wi(this,Ct,ef);return k`
      <div class="input-wrapper" @click=${()=>this.shadowRoot?.querySelector("input")?.focus()}>
        ${this.selectedTagIds.map(t=>{const n=this.tags.find(r=>r.id===t),i=n?.color??"var(--budgee-primary)",s=n?.color?L_(n.color):"white";return k`
          <span class="tag-pill" style="background:${i};color:${s}" @click=${r=>{r.stopPropagation(),oe(this,Ct,nf).call(this,t)}}>
            ${oe(this,Ct,jy).call(this,t)} &times;
          </span>
        `})}
        <input
          type="text"
          placeholder=${this.selectedTagIds.length>0?"":"Add tag..."}
          .value=${this._query}
          @input=${oe(this,Ct,Hy)}
          @keydown=${oe(this,Ct,Vy)}
          @focus=${oe(this,Ct,Uy)}
          @blur=${oe(this,Ct,qy)}
        />
      </div>
      ${this._open&&(e.length>0||wi(this,Ct,ds))?k`
            <div class="suggestions">
              ${e.map((t,n)=>k`
                <div
                  class="suggestion ${n===this._highlightIndex?"highlighted":""}"
                  @click=${()=>oe(this,Ct,nl).call(this,t)}
                >
                  ${t.name}
                </div>
              `)}
              ${wi(this,Ct,ds)?k`
                    <div
                      class="suggestion create ${e.length===this._highlightIndex?"highlighted":""}"
                      @click=${oe(this,Ct,il)}
                    >
                      Create "${this._query.trim()}"
                    </div>
                  `:G}
            </div>
          `:G}
    `}};Ct=new WeakSet;ef=function(){const e=this._query.toLowerCase();return this.tags.filter(t=>!this.selectedTagIds.includes(t.id)&&!this.excludeIds.includes(t.id)&&t.name.toLowerCase().includes(e)).sort((t,n)=>{const i=t.name.toLowerCase().startsWith(e)?0:1,s=n.name.toLowerCase().startsWith(e)?0:1;return i-s||t.name.localeCompare(n.name)})};ds=function(){const e=this._query.trim();return e?!this.tags.some(t=>t.name.toLowerCase()===e.toLowerCase()):!1};jy=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?Ll[t.icon]:null;return n?k`<span class="pill-icon">${re(n)}</span> ${t.name}`:t.name};nf=function(e){this.dispatchEvent(new CustomEvent("tag-removed",{detail:{tagId:e}}))};Wy=function(){const e=this.shadowRoot?.querySelector("input"),t=this.shadowRoot?.querySelector(".suggestions");if(!e||!t)return;const n=e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.left}px`,t.style.width=`${n.width}px`};Hy=function(e){this._query=e.target.value,this._highlightIndex=-1,this._open=this._query.length>0};Vy=function(e){const t=wi(this,Ct,ef),n=t.length+(wi(this,Ct,ds)?1:0);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,n-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"?(e.preventDefault(),this._highlightIndex>=0&&this._highlightIndex<t.length?oe(this,Ct,nl).call(this,t[this._highlightIndex]):wi(this,Ct,ds)&&(this._highlightIndex===t.length||this._highlightIndex===-1)?oe(this,Ct,il).call(this):t.length===1&&!wi(this,Ct,ds)?oe(this,Ct,nl).call(this,t[0]):wi(this,Ct,ds)&&oe(this,Ct,il).call(this)):e.key==="Backspace"&&this._query===""&&this.selectedTagIds.length>0?(e.preventDefault(),oe(this,Ct,nf).call(this,this.selectedTagIds[this.selectedTagIds.length-1])):e.key==="Escape"&&oe(this,Ct,Wl).call(this)};Uy=function(){this._query.length>0&&(this._open=!0)};qy=function(){setTimeout(()=>{this._open=!1},150)};nl=function(e){this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:e}})),oe(this,Ct,Wl).call(this)};il=function(){const e=this._query.trim();e&&(this.dispatchEvent(new CustomEvent("tag-created",{detail:{name:e}})),oe(this,Ct,Wl).call(this))};Wl=function(){this._query="",this._highlightIndex=-1,this._open=!1,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};oi.styles=mt`
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
  `;Ws([Q({type:Array})],oi.prototype,"tags",2);Ws([Q({type:Array})],oi.prototype,"selectedTagIds",2);Ws([Q({type:Array})],oi.prototype,"excludeIds",2);Ws([I()],oi.prototype,"_query",2);Ws([I()],oi.prototype,"_highlightIndex",2);Ws([I()],oi.prototype,"_open",2);oi=Ws([$t("tag-autocomplete")],oi);var j4=Object.defineProperty,W4=Object.getOwnPropertyDescriptor,Ky=e=>{throw TypeError(e)},sf=(e,t,n,i)=>{for(var s=i>1?void 0:i?W4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&j4(t,n,s),s},H4=(e,t,n)=>t.has(e)||Ky("Cannot "+n),V4=(e,t,n)=>t.has(e)?Ky("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Rh=(e,t,n)=>(H4(e,t,"access private method"),n),la,Yy,Xy,Gy;const U4=[{value:"contains",label:"contains"},{value:"startsWith",label:"starts with"},{value:"equals",label:"equals"},{value:"regex",label:"regex"}];let to=class extends gt{constructor(){super(...arguments),V4(this,la),this.condition={field:"description",operator:"equals",value:""},this.index=0}render(){return k`
      <span>description</span>
      <select @change=${Rh(this,la,Yy)}>
        ${U4.map(e=>k`
          <option value=${e.value} ?selected=${this.condition.operator===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${Rh(this,la,Xy)}
      />
      <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" @click=${Rh(this,la,Gy)}>${re(Tr)}</button>
    `}};la=new WeakSet;Yy=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,operator:t}}}))};Xy=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};Gy=function(){this.dispatchEvent(new CustomEvent("condition-removed",{detail:{index:this.index}}))};to.styles=[Ar,mt`
      :host {
        display: contents;
      }
      select,
      input {
        padding: 4px 8px;
      }
    `];sf([Q({type:Object})],to.prototype,"condition",2);sf([Q({type:Number})],to.prototype,"index",2);to=sf([$t("condition-row")],to);var q4=Object.defineProperty,K4=Object.getOwnPropertyDescriptor,Qy=e=>{throw TypeError(e)},Ye=(e,t,n,i)=>{for(var s=i>1?void 0:i?K4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&q4(t,n,s),s},Y4=(e,t,n)=>t.has(e)||Qy("Cannot "+n),X4=(e,t,n)=>t.has(e)?Qy("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),jt=(e,t,n)=>(Y4(e,t,"access private method"),n),Tt,Jy,Zy,tw,ew,nw,iw,sw,Ru,rf,af,Lu,Nu,of,rw,aw,ow;let ke=class extends gt{constructor(){super(...arguments),X4(this,Tt),this.tags=[],this.merchants=[],this.rules=[],this.prefillDescription="",this.editingRule=null,this.editingMerchantName="",this._prefillPristine=!1,this._logic="or",this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[]}updated(e){e.has("editingRule")&&this.editingRule?(this._conditions=[...this.editingRule.conditions],this._logic=this.editingRule.logic,this._selectedTagIds=[...this.editingRule.tagIds],this._merchantName=this.editingMerchantName,this._pendingTagNames=[]):e.has("prefillDescription")&&this.prefillDescription&&(this._conditions=[{field:"description",operator:"equals",value:this.prefillDescription}],this._merchantName=A4(this.prefillDescription),this._prefillPristine=!0,this._pendingTagNames=[])}render(){const e=jt(this,Tt,of).call(this).length>0;return k`
      <div class="section-header">Conditions</div>
      <div class="form-grid">
        ${this._conditions.map((t,n)=>k`
          <condition-row
            .condition=${t}
            .index=${n}
            @condition-changed=${jt(this,Tt,Jy)}
            @condition-removed=${jt(this,Tt,Zy)}
          ></condition-row>
        `)}
      </div>
      ${this._conditions.length>1?k`
            <div class="form-row">
              <label>Logic:</label>
              <select @change=${t=>{this._logic=t.target.value}}>
                <option value="and" ?selected=${this._logic==="and"}>All match (AND)</option>
                <option value="or" ?selected=${this._logic==="or"}>Any match (OR)</option>
              </select>
            </div>
          `:""}
      <button class="add-condition secondary" @click=${jt(this,Tt,tw)}>+ Add Condition</button>
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
          ${this._pendingTagNames.map(t=>k`
            <span class="tag-badge" @click=${()=>jt(this,Tt,iw).call(this,t)}>
              ${t} &times;
            </span>
          `)}
          <tag-autocomplete
            .tags=${this.tags}
            .selectedTagIds=${this._selectedTagIds}
            @tag-selected=${jt(this,Tt,ew)}
            @tag-created=${jt(this,Tt,nw)}
            @tag-removed=${t=>jt(this,Tt,sw).call(this,t.detail.tagId)}
          ></tag-autocomplete>
        </div>
      </div>
      ${e?jt(this,Tt,ow).call(this):jt(this,Tt,aw).call(this)}
      <div class="save-row">
        <button class="secondary" ?disabled=${!jt(this,Tt,Ru).call(this)} @click=${()=>jt(this,Tt,Lu).call(this,!1)}>${this.editingRule?"Save":"Create"}</button>
        <button ?disabled=${!jt(this,Tt,Ru).call(this)} @click=${()=>jt(this,Tt,Lu).call(this,!0)}>${this.editingRule?"Save":"Create"} and apply</button>
      </div>
    `}};Tt=new WeakSet;Jy=function(e){const{index:t,condition:n}=e.detail;let i=n;this._prefillPristine&&t===0&&n.operator==="equals"&&n.value!==this._conditions[0]?.value&&(i={...n,operator:"contains"},this._prefillPristine=!1),this._conditions=this._conditions.map((s,r)=>r===t?i:s)};Zy=function(e){const{index:t}=e.detail;this._conditions=this._conditions.filter((n,i)=>i!==t)};tw=function(){this._conditions=[...this._conditions,{field:"description",operator:"equals",value:""}]};ew=function(e){const t=e.detail.tag;this._selectedTagIds.includes(t.id)||(this._selectedTagIds=[...this._selectedTagIds,t.id])};nw=function(e){const t=e.detail.name;this._pendingTagNames.includes(t)||(this._pendingTagNames=[...this._pendingTagNames,t])};iw=function(e){this._pendingTagNames=this._pendingTagNames.filter(t=>t!==e)};sw=function(e){this._selectedTagIds=this._selectedTagIds.filter(t=>t!==e)};Ru=function(){return this._merchantName.trim()!==""||this._selectedTagIds.length>0||this._pendingTagNames.length>0};rf=function(){return this._conditions.filter(e=>e.value.trim())};af=function(){this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._logic="or"};Lu=function(e){const t=jt(this,Tt,rf).call(this);t.length!==0&&(this.dispatchEvent(new CustomEvent("rule-saved",{detail:{id:this.editingRule?.id,logic:this._logic,conditions:t,tagIds:this._selectedTagIds,newTagNames:this._pendingTagNames,merchantName:this._merchantName.trim()||void 0,apply:e}})),jt(this,Tt,af).call(this))};Nu=function(e,t){const n=jt(this,Tt,rf).call(this);n.length!==0&&(this.dispatchEvent(new CustomEvent("rule-merge",{detail:{existingRuleId:e.id,conditions:n,apply:t}})),jt(this,Tt,af).call(this))};of=function(){if(!this._merchantName.trim())return[];const e=this.merchants.find(t=>t.name.toLowerCase()===this._merchantName.trim().toLowerCase());return e?this.rules.filter(t=>t.merchantId===e.id&&t.id!==this.editingRule?.id):[]};rw=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};aw=function(){return k`
      <div class="existing-rules spacer">
        <h5>Existing rules for this merchant</h5>
        <div class="existing-rule-item">
          <span class="existing-rule-conditions">placeholder</span>
          <button class="merge-btn">Merge</button>
        </div>
      </div>
    `};ow=function(){const e=jt(this,Tt,of).call(this);return e.length===0?G:k`
      <div class="existing-rules">
        <h5>Existing rules for this merchant</h5>
        ${e.map(t=>k`
            <div class="existing-rule-item">
              <span class="existing-rule-conditions">${jt(this,Tt,rw).call(this,t)}</span>
              ${t.tagIds.length>0?k`<tag-pills .tags=${this.tags} .tagIds=${t.tagIds}></tag-pills>`:G}
              <button class="merge-btn secondary" @click=${()=>jt(this,Tt,Nu).call(this,t,!1)}>Merge</button>
              <button class="merge-btn secondary" @click=${()=>jt(this,Tt,Nu).call(this,t,!0)}>Merge and apply</button>
            </div>
          `)}
      </div>
    `};ke.styles=[Fn,mt`
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
        background: var(--budgee-background, #f5f5f5);
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
      .save-row {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      .spacer {
        visibility: hidden;
      }
    `];Ye([Q({type:Array})],ke.prototype,"tags",2);Ye([Q({type:Array})],ke.prototype,"merchants",2);Ye([Q({type:Array})],ke.prototype,"rules",2);Ye([Q({type:String})],ke.prototype,"prefillDescription",2);Ye([Q({attribute:!1})],ke.prototype,"editingRule",2);Ye([Q({type:String})],ke.prototype,"editingMerchantName",2);Ye([I()],ke.prototype,"_prefillPristine",2);Ye([I()],ke.prototype,"_logic",2);Ye([I()],ke.prototype,"_conditions",2);Ye([I()],ke.prototype,"_selectedTagIds",2);Ye([I()],ke.prototype,"_merchantName",2);Ye([I()],ke.prototype,"_pendingTagNames",2);ke=Ye([$t("rule-editor")],ke);var G4=Object.defineProperty,Q4=Object.getOwnPropertyDescriptor,cw=e=>{throw TypeError(e)},wo=(e,t,n,i)=>{for(var s=i>1?void 0:i?Q4(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&G4(t,n,s),s},J4=(e,t,n)=>t.has(e)||cw("Cannot "+n),Z4=(e,t,n)=>t.has(e)?cw("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Vo=(e,t,n)=>(J4(e,t,"access private method"),n),tr,Fu,Bu;let Os=class extends _o(gt){constructor(){super(...arguments),Z4(this,tr),this.refreshTrigger=0,this._overlaps=[],this._merchants=new Map,this._loading=!0}connectedCallback(){super.connectedCallback(),Vo(this,tr,Fu).call(this)}willUpdate(e){e.has("refreshTrigger")&&e.get("refreshTrigger")!==void 0&&Vo(this,tr,Fu).call(this)}render(){return this._loading?k`
        <p>Analyzing rules...</p>
      `:this._overlaps.length===0?k`
        <h2>Rule Overlap</h2>
        <p>No overlapping rules found.</p>
      `:k`
      <h2>Rule Overlap</h2>
      <p>${this._overlaps.length} overlapping rule pair${this._overlaps.length===1?"":"s"} found.</p>
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
          ${this._overlaps.map(e=>k`
            <tr>
              <td class="condition-summary">${Vo(this,tr,Bu).call(this,e.ruleA)}</td>
              <td class="condition-summary">${Vo(this,tr,Bu).call(this,e.ruleB)}</td>
              <td>${e.count}</td>
              <td class="samples">${e.samples.values().take(3).toArray().join(`

`)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `}};tr=new WeakSet;Fu=async function(){await this.withBusy(async()=>{const[e,t,n]=await Promise.all([Dn.all(),Se.all(),Ve.all()]);this._merchants=new Map(n.map(s=>[s.id,s.name]));const i=new Map;for(const s of t){const r=s.originalDescription.toLowerCase(),a=e.filter(o=>jl(r,o));if(!(a.length<2))for(let o=0;o<a.length;o++)for(let c=o+1;c<a.length;c++){const l=[a[o].id,a[c].id].sort().join("-"),h=i.get(l);h?(h.count++,h.samples.add(s.originalDescription)):i.set(l,{ruleA:a[o],ruleB:a[c],count:1,samples:new Set([s.originalDescription])})}}this._overlaps=[...i.values()].sort((s,r)=>r.count-s.count),this._loading=!1})};Bu=function(e){const t=e.merchantId?this._merchants.get(e.merchantId)??"":"",n=e.conditions.map(i=>`${i.operator} "${i.value}"`).join(e.logic==="and"?" AND ":" OR ");return t?`${t}: ${n}`:n};Os.styles=[bo,ui,mt`
      :host {
        display: block;
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
    `];wo([Q({type:Number})],Os.prototype,"refreshTrigger",2);wo([I()],Os.prototype,"_overlaps",2);wo([I()],Os.prototype,"_merchants",2);wo([I()],Os.prototype,"_loading",2);Os=wo([$t("rule-overlap")],Os);var tL=Object.defineProperty,eL=Object.getOwnPropertyDescriptor,lw=e=>{throw TypeError(e)},Zt=(e,t,n,i)=>{for(var s=i>1?void 0:i?eL(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&tL(t,n,s),s},cf=(e,t,n)=>t.has(e)||lw("Cannot "+n),nL=(e,t,n)=>(cf(e,t,"read from private field"),n?n.call(e):t.get(e)),vm=(e,t,n)=>t.has(e)?lw("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),bm=(e,t,n,i)=>(cf(e,t,"write to private field"),t.set(e,n),n),vt=(e,t,n)=>(cf(e,t,"access private method"),n),ha,dt,Mr,hw,uw,dw,fw,sl,rl,pw,gw,mw,vw,uc,dc,bw,_w,yw,ww;let Ut=class extends _o(gt){constructor(){super(...arguments),vm(this,dt),this._rules=[],this._tags=[],this._merchants=[],this._unmerchanted=[],this._prefillDescription="",this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._rulesPage=1,this._rulesPageSize=10,this._rulesFilter="",this._rulesSortCol="conditions",this._rulesSortDir="asc",this._unmerchantedPage=1,this._unmerchantedPageSize=20,this._unmerchantedFilter="",this._unmatchedRuleIds=new Set,this._overlapRefresh=0,vm(this,ha,[])}connectedCallback(){super.connectedCallback(),vt(this,dt,Mr).call(this);const e=Or(()=>vt(this,dt,Mr).call(this),300);Promise.all([Dn.subscribe(e),_e.subscribe(e),Ve.subscribe(e),Se.subscribe(e)]).then(t=>{bm(this,ha,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of nL(this,ha))e.unsubscribe();bm(this,ha,[])}render(){return k`
      <h2>Merchant Rules</h2>

      <div class="sections-grid">
      ${this._rules.length>0?k`
            <div class="section">
              <h3>Existing Rules</h3>
              ${(()=>{const e=this._rules.filter(n=>vt(this,dt,vw).call(this,n)),t=vt(this,dt,bw).call(this,e);return k`
                  <paginated-table
                    .totalItems=${e.length}
                    .defaultPageSize=${10}
                    storageKey="rules"
                    ?filterable=${!0}
                    @page-change=${vt(this,dt,gw)}
                    @filter-change=${vt(this,dt,mw)}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th class="sortable" @click=${()=>vt(this,dt,uc).call(this,"conditions")}>
                            Conditions${vt(this,dt,dc).call(this,"conditions")}
                          </th>
                          <th class="sortable" @click=${()=>vt(this,dt,uc).call(this,"merchant")}>
                            Merchant${vt(this,dt,dc).call(this,"merchant")}
                          </th>
                          <th class="sortable" @click=${()=>vt(this,dt,uc).call(this,"tags")}>
                            Tags${vt(this,dt,dc).call(this,"tags")}
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${t.slice((this._rulesPage-1)*this._rulesPageSize,this._rulesPage*this._rulesPageSize).map(n=>k`
                              <tr>
                                <td class="condition-summary">
                                  ${vt(this,dt,pw).call(this,n)}
                                  ${this._unmatchedRuleIds.has(n.id)?k`<span class="unmatched-warning" title="This rule matches no transactions">${re(I4)} No matches</span>`:G}
                                </td>
                                <td>${vt(this,dt,rl).call(this,n.merchantId)}</td>
                                <td>
                                  ${n.tagIds.length>0?k`<tag-pills .tags=${this._tags} .tagIds=${n.tagIds}></tag-pills>`:"None"}
                                </td>
                                <td class="actions">
                                  <button class="icon-btn" title="Edit rule" aria-label="Edit rule" @click=${()=>vt(this,dt,fw).call(this,n)}>${re(Tl)}</button>
                                  <button class="icon-btn icon-btn--danger" title="Delete rule" aria-label="Delete rule" @click=${()=>vt(this,dt,dw).call(this,n.id)}>${re(Tr)}</button>
                                </td>
                              </tr>
                            `)}
                      </tbody>
                    </table>
                  </paginated-table>
                `})()}
            </div>
          `:k`
              <p>No rules defined.</p>
            `}

      ${this._unmerchanted.length>0?k`
            <div class="section">
              <h3>Unmerchanted Transactions</h3>
              ${(()=>{const e=this._unmerchantedFilter.toLowerCase(),t=e?this._unmerchanted.filter(n=>n.originalDescription.toLowerCase().includes(e)):this._unmerchanted;return k`
                  <paginated-table
                    .totalItems=${t.length}
                    .defaultPageSize=${20}
                    storageKey="unmerchanted"
                    ?filterable=${!0}
                    @page-change=${vt(this,dt,_w)}
                    @filter-change=${vt(this,dt,yw)}
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
                        ${t.slice((this._unmerchantedPage-1)*this._unmerchantedPageSize,this._unmerchantedPage*this._unmerchantedPageSize).map(n=>k`
                          <tr class="clickable-row" @click=${()=>vt(this,dt,ww).call(this,n)}>
                            <td>${n.date}</td>
                            <td>${n.originalDescription}</td>
                            <td class=${n.amount<0?"amount-negative":"amount-positive"}>${n.amount.toFixed(2)}</td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </paginated-table>
                `})()}
            </div>
          `:G}

      </div>

      ${this._showEditor?k`
            <budgee-modal
              heading=${this._editingRule?"Edit Rule":"Create Rule"}
              @modal-close=${()=>{this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription=""}}
            >
              <rule-editor
                .tags=${this._tags}
                .merchants=${this._merchants}
                .rules=${this._rules}
                .prefillDescription=${this._prefillDescription}
                .editingRule=${this._editingRule}
                .editingMerchantName=${this._editingMerchantName}
                @rule-saved=${vt(this,dt,hw)}
                @rule-merge=${vt(this,dt,uw)}
              ></rule-editor>
            </budgee-modal>
          `:G}

      <rule-overlap .refreshTrigger=${this._overlapRefresh}></rule-overlap>
    `}};ha=new WeakMap;dt=new WeakSet;Mr=async function(){this._rules=await Dn.all(),this._tags=await _e.all(),this._merchants=await Ve.all();const e=await Se.all();this._unmerchanted=e.filter(i=>i.merchantId===void 0);const t=e.map(i=>i.originalDescription.toLowerCase()),n=new Set;for(const i of this._rules)t.some(s=>jl(s,i))||n.add(i.id);this._unmatchedRuleIds=n,this._overlapRefresh++};hw=async function(e){await this.withBusy(async()=>{const{id:t,logic:n,conditions:i,tagIds:s,newTagNames:r,merchantName:a,apply:o}=e.detail,c=[...s];if(r?.length)for(const u of r){const f=(await _e.byName(u))?.id??await _e.create(u);c.push(f)}let l;a&&(l=(await Ve.byName(a))?.id??await Ve.create(a));const h=t?{id:t,logic:n,conditions:i,merchantId:l,tagIds:c}:{logic:n,conditions:i,merchantId:l,tagIds:c};t?await Dn.put(h):h.id=await Dn.create(h),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",o&&await Dn.applyToTransactions(h),await vt(this,dt,Mr).call(this)})};uw=async function(e){await this.withBusy(async()=>{const{existingRuleId:t,conditions:n,apply:i}=e.detail,s=this._rules.find(a=>a.id===t);if(!s)return;const r={...s,logic:"or",conditions:[...s.conditions,...n]};await Dn.put(r),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",i&&await Dn.applyToTransactions(r),await vt(this,dt,Mr).call(this)})};dw=async function(e){await this.withBusy(async()=>{await Dn.remove(e),await vt(this,dt,Mr).call(this)})};fw=async function(e){let t="";e.merchantId&&(t=(await Ve.get(e.merchantId))?.name??""),this._editingRule=e,this._editingMerchantName=t,this._showEditor=!0};sl=function(e){return this._tags.find(t=>t.id===e)?.name??`#${e}`};rl=function(e){return e?this._merchants.find(t=>t.id===e)?.name??"":""};pw=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};gw=function(e){this._rulesPage=e.detail.page,this._rulesPageSize=e.detail.pageSize};mw=function(e){this._rulesFilter=e.detail.filter,this._rulesPage=1};vw=function(e){if(!this._rulesFilter)return!0;const t=this._rulesFilter.toLowerCase();return!!(e.conditions.some(n=>n.value.toLowerCase().includes(t))||e.merchantId&&this._merchants.find(i=>i.id===e.merchantId)?.name.toLowerCase().includes(t)||e.tagIds.some(n=>vt(this,dt,sl).call(this,n).toLowerCase().includes(t)))};uc=function(e){this._rulesSortCol===e?this._rulesSortDir=this._rulesSortDir==="asc"?"desc":"asc":(this._rulesSortCol=e,this._rulesSortDir="asc"),this._rulesPage=1};dc=function(e){return this._rulesSortCol!==e?"":this._rulesSortDir==="asc"?" ▲":" ▼"};bw=function(e){const t=this._rulesSortCol,n=this._rulesSortDir==="asc"?1:-1;return[...e].sort((i,s)=>{let r=0;if(t==="conditions"){const a=i.conditions[0]?.value??"",o=s.conditions[0]?.value??"";r=a.localeCompare(o)}else if(t==="merchant")r=vt(this,dt,rl).call(this,i.merchantId).localeCompare(vt(this,dt,rl).call(this,s.merchantId));else if(t==="tags"){const a=i.tagIds.map(c=>vt(this,dt,sl).call(this,c)).join(","),o=s.tagIds.map(c=>vt(this,dt,sl).call(this,c)).join(",");r=a.localeCompare(o)}return r*n})};_w=function(e){this._unmerchantedPage=e.detail.page,this._unmerchantedPageSize=e.detail.pageSize};yw=function(e){this._unmerchantedFilter=e.detail.filter,this._unmerchantedPage=1};ww=function(e){this._prefillDescription=e.originalDescription,this._showEditor=!0};Ut.styles=[Fn,bo,ui,Ar,mt`
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
        .sections-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `];Zt([I()],Ut.prototype,"_rules",2);Zt([I()],Ut.prototype,"_tags",2);Zt([I()],Ut.prototype,"_merchants",2);Zt([I()],Ut.prototype,"_unmerchanted",2);Zt([I()],Ut.prototype,"_prefillDescription",2);Zt([I()],Ut.prototype,"_showEditor",2);Zt([I()],Ut.prototype,"_editingRule",2);Zt([I()],Ut.prototype,"_editingMerchantName",2);Zt([I()],Ut.prototype,"_rulesPage",2);Zt([I()],Ut.prototype,"_rulesPageSize",2);Zt([I()],Ut.prototype,"_rulesFilter",2);Zt([I()],Ut.prototype,"_rulesSortCol",2);Zt([I()],Ut.prototype,"_rulesSortDir",2);Zt([I()],Ut.prototype,"_unmerchantedPage",2);Zt([I()],Ut.prototype,"_unmerchantedPageSize",2);Zt([I()],Ut.prototype,"_unmerchantedFilter",2);Zt([I()],Ut.prototype,"_unmatchedRuleIds",2);Zt([I()],Ut.prototype,"_overlapRefresh",2);Ut=Zt([$t("rule-manager")],Ut);async function iL(){const e=await U(),t={version:Sn,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=`budgee-export-${new Date().toISOString().slice(0,10)}.json`,s.click(),URL.revokeObjectURL(i)}var sL=Object.defineProperty,rL=Object.getOwnPropertyDescriptor,xw=e=>{throw TypeError(e)},xo=(e,t,n,i)=>{for(var s=i>1?void 0:i?rL(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&sL(t,n,s),s},Sw=(e,t,n)=>t.has(e)||xw("Cannot "+n),aL=(e,t,n)=>(Sw(e,t,"read from private field"),n?n.call(e):t.get(e)),oL=(e,t,n)=>t.has(e)?xw("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Uo=(e,t,n)=>(Sw(e,t,"access private method"),n),cs,kw,Cw,Mw,Ew,Dw;let Ts=class extends gt{constructor(){super(...arguments),oL(this,cs),this._url="",this._testResult=null,this._testError="",this._testedUrl=""}connectedCallback(){super.connectedCallback(),this._url=localStorage.getItem("budgee-sync-url")??""}render(){return k`
      <section>
        <h2>Import / Export</h2>
        <h3>Import Database</h3>
        <p>Restore from a full JSON backup. This will replace all existing data.</p>
        <input type="file" accept=".json" @change=${Uo(this,cs,Dw)} />

        <h3>Export Database</h3>
        <p>Download a full backup of your data as JSON.</p>
        <button @click=${iL}>Export</button>
      </section>

      <section>
        <h2>Sync</h2>
        <p class="hint">Sync your data across devices using a sync server. Save a valid URL to enable sync; clear it to disable.</p>
        <div class="field">
          <label for="sync-url">Server URL</label>
          <input type="url" id="sync-url" .value=${this._url} @change=${Uo(this,cs,kw)}
            placeholder="http://your-server:3001" />
          <p class="hint">The URL of your sync server.</p>
        </div>
        ${this._url?k`
              <div class="field">
                <button ?disabled=${this._testResult==="testing"} @click=${Uo(this,cs,Cw)}>
                  ${this._testResult==="testing"?"Testing...":"Test Connection"}
                </button>
                ${this._testResult==="success"?k`
                        <p class="test-result success">Connection successful.</p>
                      `:this._testResult==="error"?k`<p class="test-result error">Connection failed: ${this._testError}</p>`:G}
              </div>
            `:G}
        <div class="field">
          <button ?disabled=${!aL(this,cs,Mw)} @click=${Uo(this,cs,Ew)}>Save</button>
        </div>
      </section>
    `}};cs=new WeakSet;kw=function(e){this._url=e.target.value,this._testResult=null,this._testError="",this._testedUrl=""};Cw=async function(){this._testResult="testing",this._testError="";try{await QE(this._url),this._testResult="success",this._testedUrl=this._url}catch(e){this._testResult="error",this._testError=e instanceof Error?e.message:String(e),this._testedUrl=""}};Mw=function(){const e=localStorage.getItem("budgee-sync-url")??"";return this._url===e?!1:this._url?this._testResult==="success"&&this._testedUrl===this._url:!0};Ew=function(){localStorage.setItem("budgee-sync-url",this._url),localStorage.removeItem("budgee-ice-server"),localStorage.removeItem("budgee-turn-server"),this.dispatchEvent(new CustomEvent("budgee-sync-settings-changed",{bubbles:!0,composed:!0})),this.requestUpdate()};Dw=async function(e){const t=e.target;if(t.files?.length){if(!confirm("This will replace all existing data. Are you sure?")){t.value="";return}Sd("Importing database...");try{await k0(t.files[0]),t.value="",window.location.reload()}finally{kd()}}};Ts.styles=[Fn,mt`
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
    `];xo([I()],Ts.prototype,"_url",2);xo([I()],Ts.prototype,"_testResult",2);xo([I()],Ts.prototype,"_testError",2);xo([I()],Ts.prototype,"_testedUrl",2);Ts=xo([$t("budgee-settings")],Ts);var cL=Object.defineProperty,lL=Object.getOwnPropertyDescriptor,$w=e=>{throw TypeError(e)},Iw=(e,t,n,i)=>{for(var s=i>1?void 0:i?lL(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&cL(t,n,s),s},Pw=(e,t,n)=>t.has(e)||$w("Cannot "+n),hL=(e,t,n)=>(Pw(e,t,"read from private field"),t.get(e)),uL=(e,t,n)=>t.has(e)?$w("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),dL=(e,t,n,i)=>(Pw(e,t,"write to private field"),t.set(e,n),n),fc;const fL={"not-configured":"Not configured",connecting:"Connecting",syncing:"Syncing",synced:"Synced",error:"Error"};let al=class extends gt{constructor(){super(...arguments),this._status="not-configured",uL(this,fc)}connectedCallback(){super.connectedCallback(),dL(this,fc,ZE.subscribe(e=>{this._status=e}))}disconnectedCallback(){super.disconnectedCallback(),hL(this,fc)?.unsubscribe()}render(){return k`<span class="dot ${this._status}"></span>${fL[this._status]}`}};fc=new WeakMap;al.styles=mt`
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
  `;Iw([I()],al.prototype,"_status",2);al=Iw([$t("sync-status-indicator")],al);function pL(e){if(e.startsWith("#"))return e;const{r:t,g:n,b:i}=R_(e),s=r=>r.toString(16).padStart(2,"0");return`#${s(t)}${s(n)}${s(i)}`}var gL=Object.defineProperty,mL=Object.getOwnPropertyDescriptor,Ow=e=>{throw TypeError(e)},Ui=(e,t,n,i)=>{for(var s=i>1?void 0:i?mL(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&gL(t,n,s),s},lf=(e,t,n)=>t.has(e)||Ow("Cannot "+n),vL=(e,t,n)=>(lf(e,t,"read from private field"),n?n.call(e):t.get(e)),_m=(e,t,n)=>t.has(e)?Ow("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ym=(e,t,n,i)=>(lf(e,t,"write to private field"),t.set(e,n),n),ne=(e,t,n)=>(lf(e,t,"access private method"),n),ua,Kt,As,hf,Tw,Aw,Rw,Lw,Nw,Fw,Bw,zw,jw,Ww;let Ln=class extends _o(gt){constructor(){super(...arguments),_m(this,Kt),this._tags=[],this._newTagName="",this._error="",this._filter="",this._currentPage=1,this._pageSize=25,this._sortDir="asc",_m(this,ua,[])}connectedCallback(){super.connectedCallback(),ne(this,Kt,As).call(this);const e=Or(()=>ne(this,Kt,As).call(this),300);_e.subscribe(e).then(t=>{ym(this,ua,[t])})}disconnectedCallback(){super.disconnectedCallback();for(const e of vL(this,ua))e.unsubscribe();ym(this,ua,[])}render(){return k`
      <h3>Tags</h3>
      <div class="tag-form">
        <input
          type="text"
          placeholder="New tag name"
          .value=${this._newTagName}
          @input=${ne(this,Kt,Nw)}
          @keydown=${ne(this,Kt,Fw)}
        />
        <button @click=${ne(this,Kt,hf)}>Add</button>
      </div>
      ${this._error?k`<p class="error">${this._error}</p>`:""}
      ${(()=>{const e=this._filter.toLowerCase(),t=e?this._tags.filter(a=>a.name.toLowerCase().includes(e)):this._tags,n=ne(this,Kt,Ww).call(this,t),i=(this._currentPage-1)*this._pageSize,s=n.slice(i,i+this._pageSize),r=this._sortDir==="asc"?" ▲":" ▼";return k`
          <paginated-table
            .totalItems=${t.length}
            .defaultPageSize=${25}
            storageKey="tags"
            ?filterable=${!0}
            @page-change=${ne(this,Kt,Bw)}
            @filter-change=${ne(this,Kt,zw)}
          >
            <table>
              <thead>
                <tr>
                  <th class="col-icon">Icon</th>
                  <th class="col-color">Color</th>
                  <th class="sortable" @click=${ne(this,Kt,jw)}>Name${r}</th>
                  <th class="col-remove"></th>
                </tr>
              </thead>
              <tbody>
                ${s.map(a=>k`
                  <tr>
                    <td class="col-icon">
                      <icon-picker
                        .value=${a.icon??""}
                        @icon-selected=${o=>ne(this,Kt,Aw).call(this,a,o.detail.icon)}
                      ></icon-picker>
                    </td>
                    <td class="col-color">
                      <input
                        type="color"
                        class="color-swatch"
                        .value=${ne(this,Kt,Rw).call(this,a.color)}
                        @change=${o=>ne(this,Kt,Lw).call(this,a,o.target.value)}
                      />
                    </td>
                    <td>
                      ${a.name}
                    </td>
                    <td class="col-remove">
                      <button class="icon-btn icon-btn--danger" title="Remove tag" aria-label="Remove tag" @click=${()=>ne(this,Kt,Tw).call(this,a.id)}>
                        ${re(Tr)}
                      </button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </paginated-table>
        `})()}
    `}};ua=new WeakMap;Kt=new WeakSet;As=async function(){this._tags=await _e.all()};hf=async function(){const e=this._newTagName.trim();if(!e)return;if(this._error="",await _e.byName(e)){this._error=`Tag "${e}" already exists.`;return}await this.withBusy(async()=>{await _e.create(e),this._newTagName="",await ne(this,Kt,As).call(this)})};Tw=async function(e){await this.withBusy(async()=>{await _e.remove(e),await ne(this,Kt,As).call(this)})};Aw=async function(e,t){await this.withBusy(async()=>{await _e.update(e.id,{icon:t||void 0}),await ne(this,Kt,As).call(this)})};Rw=function(e){return e?pL(e):"#7eb8da"};Lw=async function(e,t){await this.withBusy(async()=>{await _e.update(e.id,{color:t}),await ne(this,Kt,As).call(this)})};Nw=function(e){this._newTagName=e.target.value};Fw=function(e){e.key==="Enter"&&ne(this,Kt,hf).call(this)};Bw=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};zw=function(e){this._filter=e.detail.filter,this._currentPage=1};jw=function(){this._sortDir=this._sortDir==="asc"?"desc":"asc",this._currentPage=1};Ww=function(e){const t=this._sortDir==="asc"?1:-1;return[...e].sort((n,i)=>n.name.localeCompare(i.name)*t)};Ln.styles=[Fn,bo,ui,Ar,mt`
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
    `];Ui([I()],Ln.prototype,"_tags",2);Ui([I()],Ln.prototype,"_newTagName",2);Ui([I()],Ln.prototype,"_error",2);Ui([I()],Ln.prototype,"_filter",2);Ui([I()],Ln.prototype,"_currentPage",2);Ui([I()],Ln.prototype,"_pageSize",2);Ui([I()],Ln.prototype,"_sortDir",2);Ln=Ui([$t("tag-manager")],Ln);function bL(e,t){const n=e.originalDescription.toLowerCase();for(const i of t){if(!jl(n,i))continue;const s=[...new Set([...e.tagIds,...i.tagIds])],r=i.merchantId??e.merchantId;return{...e,tagIds:s,merchantId:r}}return e}async function _L(e,t,n){const i=await Dn.all(),s=t.account?await yL(e,t.account):void 0,r=e.map(a=>wL(a,t,s?.get(a[t.account])??n.accountId)).filter(a=>a!==void 0).map(a=>bL(a,i));return n.importMode==="replace"&&await Se.deleteAll(),await Se.bulkAdd(r),r.length}async function yL(e,t){const n=[...new Set(e.map(a=>a[t]).filter(Boolean))],i=await Li.all(),s=new Map;for(const a of i)s.set(a.name.toLowerCase(),a.id);const r=new Map;for(const a of n){const o=s.get(a.toLowerCase());if(o)r.set(a,o);else{const c=await Li.create({name:a});r.set(a,c),s.set(a.toLowerCase(),c)}}return r}function wL(e,t,n){const i=t.date?e[t.date]:void 0,s=t.amount?e[t.amount]:void 0,r=t.credit?e[t.credit]:void 0,a=t.description?e[t.description]:void 0;if(!i||!a)return;const o=s?Number.parseFloat(s):NaN,c=r?Number.parseFloat(r):NaN;if(Number.isNaN(o)&&Number.isNaN(c))return;const l=(Number.isNaN(o)?0:-o)+(Number.isNaN(c)?0:c);return{date:i,amount:l,originalDescription:a,tagIds:[],accountId:n}}var QL=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function xL(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var pc={exports:{}};var SL=pc.exports,wm;function kL(){return wm||(wm=1,(function(e,t){((n,i)=>{e.exports=i()})(SL,function n(){var i=typeof self<"u"?self:typeof window<"u"?window:i!==void 0?i:{},s,r=!i.document&&!!i.postMessage,a=i.IS_PAPA_WORKER||!1,o={},c=0,l={};function h(v){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(y){var S=x(y);S.chunkSize=parseInt(S.chunkSize),y.step||y.chunk||(S.chunkSize=null),this._handle=new g(S),(this._handle.streamer=this)._config=S}).call(this,v),this.parseChunk=function(y,S){var $=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<$){let O=this._config.newline;O||(D=this._config.quoteChar||'"',O=this._handle.guessLineEndings(y,D)),y=[...y.split(O).slice($)].join(O)}this.isFirstChunk&&M(this._config.beforeFirstChunk)&&(D=this._config.beforeFirstChunk(y))!==void 0&&(y=D),this.isFirstChunk=!1,this._halted=!1;var $=this._partialLine+y,D=(this._partialLine="",this._handle.parse($,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(y=D.meta.cursor,$=(this._finished||(this._partialLine=$.substring(y-this._baseIndex),this._baseIndex=y),D&&D.data&&(this._rowCount+=D.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),a)i.postMessage({results:D,workerId:l.WORKER_ID,finished:$});else if(M(this._config.chunk)&&!S){if(this._config.chunk(D,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=D=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(D.data),this._completeResults.errors=this._completeResults.errors.concat(D.errors),this._completeResults.meta=D.meta),this._completed||!$||!M(this._config.complete)||D&&D.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),$||D&&D.meta.paused||this._nextChunk(),D}this._halted=!0},this._sendError=function(y){M(this._config.error)?this._config.error(y):a&&this._config.error&&i.postMessage({workerId:l.WORKER_ID,error:y,finished:!1})}}function u(v){var y;(v=v||{}).chunkSize||(v.chunkSize=l.RemoteChunkSize),h.call(this,v),this._nextChunk=r?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(S){this._input=S,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(y=new XMLHttpRequest,this._config.withCredentials&&(y.withCredentials=this._config.withCredentials),r||(y.onload=E(this._chunkLoaded,this),y.onerror=E(this._chunkError,this)),y.open(this._config.downloadRequestBody?"POST":"GET",this._input,!r),this._config.downloadRequestHeaders){var S,$=this._config.downloadRequestHeaders;for(S in $)y.setRequestHeader(S,$[S])}var D;this._config.chunkSize&&(D=this._start+this._config.chunkSize-1,y.setRequestHeader("Range","bytes="+this._start+"-"+D));try{y.send(this._config.downloadRequestBody)}catch(O){this._chunkError(O.message)}r&&y.status===0&&this._chunkError()}},this._chunkLoaded=function(){y.readyState===4&&(y.status<200||400<=y.status?this._chunkError():(this._start+=this._config.chunkSize||y.responseText.length,this._finished=!this._config.chunkSize||this._start>=(S=>(S=S.getResponseHeader("Content-Range"))!==null?parseInt(S.substring(S.lastIndexOf("/")+1)):-1)(y),this.parseChunk(y.responseText)))},this._chunkError=function(S){S=y.statusText||S,this._sendError(new Error(S))}}function d(v){(v=v||{}).chunkSize||(v.chunkSize=l.LocalChunkSize),h.call(this,v);var y,S,$=typeof FileReader<"u";this.stream=function(D){this._input=D,S=D.slice||D.webkitSlice||D.mozSlice,$?((y=new FileReader).onload=E(this._chunkLoaded,this),y.onerror=E(this._chunkError,this)):y=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var D=this._input,O=(this._config.chunkSize&&(O=Math.min(this._start+this._config.chunkSize,this._input.size),D=S.call(D,this._start,O)),y.readAsText(D,this._config.encoding));$||this._chunkLoaded({target:{result:O}})},this._chunkLoaded=function(D){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(D.target.result)},this._chunkError=function(){this._sendError(y.error)}}function f(v){var y;h.call(this,v=v||{}),this.stream=function(S){return y=S,this._nextChunk()},this._nextChunk=function(){var S,$;if(!this._finished)return S=this._config.chunkSize,y=S?($=y.substring(0,S),y.substring(S)):($=y,""),this._finished=!y,this.parseChunk($)}}function p(v){h.call(this,v=v||{});var y=[],S=!0,$=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(D){this._input=D,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){$&&y.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),y.length?this.parseChunk(y.shift()):S=!0},this._streamData=E(function(D){try{y.push(typeof D=="string"?D:D.toString(this._config.encoding)),S&&(S=!1,this._checkIsFinished(),this.parseChunk(y.shift()))}catch(O){this._streamError(O)}},this),this._streamError=E(function(D){this._streamCleanUp(),this._sendError(D)},this),this._streamEnd=E(function(){this._streamCleanUp(),$=!0,this._streamData("")},this),this._streamCleanUp=E(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function g(v){var y,S,$,D,O=Math.pow(2,53),B=-O,N=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,W=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,R=this,H=0,A=0,z=!1,L=!1,j=[],P={data:[],errors:[],meta:{}};function J(at){return v.skipEmptyLines==="greedy"?at.join("").trim()==="":at.length===1&&at[0].length===0}function lt(){if(P&&$&&(Xe("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),$=!1),v.skipEmptyLines&&(P.data=P.data.filter(function(Z){return!J(Z)})),St()){let Z=function(Bt,Qt){M(v.transformHeader)&&(Bt=v.transformHeader(Bt,Qt)),j.push(Bt)};if(P)if(Array.isArray(P.data[0])){for(var at=0;St()&&at<P.data.length;at++)P.data[at].forEach(Z);P.data.splice(0,1)}else P.data.forEach(Z)}function ut(Z,Bt){for(var Qt=v.header?{}:[],kt=0;kt<Z.length;kt++){var Mt=kt,ot=Z[kt],ot=((on,nt)=>(Lt=>(v.dynamicTypingFunction&&v.dynamicTyping[Lt]===void 0&&(v.dynamicTyping[Lt]=v.dynamicTypingFunction(Lt)),(v.dynamicTyping[Lt]||v.dynamicTyping)===!0))(on)?nt==="true"||nt==="TRUE"||nt!=="false"&&nt!=="FALSE"&&((Lt=>{if(N.test(Lt)&&(Lt=parseFloat(Lt),B<Lt&&Lt<O))return 1})(nt)?parseFloat(nt):W.test(nt)?new Date(nt):nt===""?null:nt):nt)(Mt=v.header?kt>=j.length?"__parsed_extra":j[kt]:Mt,ot=v.transform?v.transform(ot,Mt):ot);Mt==="__parsed_extra"?(Qt[Mt]=Qt[Mt]||[],Qt[Mt].push(ot)):Qt[Mt]=ot}return v.header&&(kt>j.length?Xe("FieldMismatch","TooManyFields","Too many fields: expected "+j.length+" fields but parsed "+kt,A+Bt):kt<j.length&&Xe("FieldMismatch","TooFewFields","Too few fields: expected "+j.length+" fields but parsed "+kt,A+Bt)),Qt}var Ft;P&&(v.header||v.dynamicTyping||v.transform)&&(Ft=1,!P.data.length||Array.isArray(P.data[0])?(P.data=P.data.map(ut),Ft=P.data.length):P.data=ut(P.data,0),v.header&&P.meta&&(P.meta.fields=j),A+=Ft)}function St(){return v.header&&j.length===0}function Xe(at,ut,Ft,Z){at={type:at,code:ut,message:Ft},Z!==void 0&&(at.row=Z),P.errors.push(at)}M(v.step)&&(D=v.step,v.step=function(at){P=at,St()?lt():(lt(),P.data.length!==0&&(H+=at.data.length,v.preview&&H>v.preview?S.abort():(P.data=P.data[0],D(P,R))))}),this.parse=function(at,ut,Ft){var Z=v.quoteChar||'"',Z=(v.newline||(v.newline=this.guessLineEndings(at,Z)),$=!1,v.delimiter?M(v.delimiter)&&(v.delimiter=v.delimiter(at),P.meta.delimiter=v.delimiter):((Z=((Bt,Qt,kt,Mt,ot)=>{var on,nt,Lt,pi;ot=ot||[",","	","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var Vs=0;Vs<ot.length;Vs++){for(var bn,Rr=ot[Vs],de=0,_n=0,te=0,Ee=(Lt=void 0,new b({comments:Mt,delimiter:Rr,newline:Qt,preview:10}).parse(Bt)),Bn=0;Bn<Ee.data.length;Bn++)kt&&J(Ee.data[Bn])?te++:(bn=Ee.data[Bn].length,_n+=bn,Lt===void 0?Lt=bn:0<bn&&(de+=Math.abs(bn-Lt),Lt=bn));0<Ee.data.length&&(_n/=Ee.data.length-te),(nt===void 0||de<=nt)&&(pi===void 0||pi<_n)&&1.99<_n&&(nt=de,on=Rr,pi=_n)}return{successful:!!(v.delimiter=on),bestDelimiter:on}})(at,v.newline,v.skipEmptyLines,v.comments,v.delimitersToGuess)).successful?v.delimiter=Z.bestDelimiter:($=!0,v.delimiter=l.DefaultDelimiter),P.meta.delimiter=v.delimiter),x(v));return v.preview&&v.header&&Z.preview++,y=at,S=new b(Z),P=S.parse(y,ut,Ft),lt(),z?{meta:{paused:!0}}:P||{meta:{paused:!1}}},this.paused=function(){return z},this.pause=function(){z=!0,S.abort(),y=M(v.chunk)?"":y.substring(S.getCharIndex())},this.resume=function(){R.streamer._halted?(z=!1,R.streamer.parseChunk(y,!0)):setTimeout(R.resume,3)},this.aborted=function(){return L},this.abort=function(){L=!0,S.abort(),P.meta.aborted=!0,M(v.complete)&&v.complete(P),y=""},this.guessLineEndings=function(Bt,Z){Bt=Bt.substring(0,1048576);var Z=new RegExp(m(Z)+"([^]*?)"+m(Z),"gm"),Ft=(Bt=Bt.replace(Z,"")).split("\r"),Z=Bt.split(`
`),Bt=1<Z.length&&Z[0].length<Ft[0].length;if(Ft.length===1||Bt)return`
`;for(var Qt=0,kt=0;kt<Ft.length;kt++)Ft[kt][0]===`
`&&Qt++;return Qt>=Ft.length/2?`\r
`:"\r"}}function m(v){return v.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function b(v){var y=(v=v||{}).delimiter,S=v.newline,$=v.comments,D=v.step,O=v.preview,B=v.fastMode,N=null,W=!1,R=v.quoteChar==null?'"':v.quoteChar,H=R;if(v.escapeChar!==void 0&&(H=v.escapeChar),(typeof y!="string"||-1<l.BAD_DELIMITERS.indexOf(y))&&(y=","),$===y)throw new Error("Comment character same as delimiter");$===!0?$="#":(typeof $!="string"||-1<l.BAD_DELIMITERS.indexOf($))&&($=!1),S!==`
`&&S!=="\r"&&S!==`\r
`&&(S=`
`);var A=0,z=!1;this.parse=function(L,j,P){if(typeof L!="string")throw new Error("Input must be a string");var J=L.length,lt=y.length,St=S.length,Xe=$.length,at=M(D),ut=[],Ft=[],Z=[],Bt=A=0;if(!L)return de();if(B||B!==!1&&L.indexOf(R)===-1){for(var Qt=L.split(S),kt=0;kt<Qt.length;kt++){if(Z=Qt[kt],A+=Z.length,kt!==Qt.length-1)A+=S.length;else if(P)return de();if(!$||Z.substring(0,Xe)!==$){if(at){if(ut=[],pi(Z.split(y)),_n(),z)return de()}else pi(Z.split(y));if(O&&O<=kt)return ut=ut.slice(0,O),de(!0)}}return de()}for(var Mt=L.indexOf(y,A),ot=L.indexOf(S,A),on=new RegExp(m(H)+m(R),"g"),nt=L.indexOf(R,A);;)if(L[A]===R)for(nt=A,A++;;){if((nt=L.indexOf(R,nt+1))===-1)return P||Ft.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:ut.length,index:A}),bn();if(nt===J-1)return bn(L.substring(A,nt).replace(on,R));if(R===H&&L[nt+1]===H)nt++;else if(R===H||nt===0||L[nt-1]!==H){Mt!==-1&&Mt<nt+1&&(Mt=L.indexOf(y,nt+1));var Lt=Vs((ot=ot!==-1&&ot<nt+1?L.indexOf(S,nt+1):ot)===-1?Mt:Math.min(Mt,ot));if(L.substr(nt+1+Lt,lt)===y){Z.push(L.substring(A,nt).replace(on,R)),L[A=nt+1+Lt+lt]!==R&&(nt=L.indexOf(R,A)),Mt=L.indexOf(y,A),ot=L.indexOf(S,A);break}if(Lt=Vs(ot),L.substring(nt+1+Lt,nt+1+Lt+St)===S){if(Z.push(L.substring(A,nt).replace(on,R)),Rr(nt+1+Lt+St),Mt=L.indexOf(y,A),nt=L.indexOf(R,A),at&&(_n(),z))return de();if(O&&ut.length>=O)return de(!0);break}Ft.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:ut.length,index:A}),nt++}}else if($&&Z.length===0&&L.substring(A,A+Xe)===$){if(ot===-1)return de();A=ot+St,ot=L.indexOf(S,A),Mt=L.indexOf(y,A)}else if(Mt!==-1&&(Mt<ot||ot===-1))Z.push(L.substring(A,Mt)),A=Mt+lt,Mt=L.indexOf(y,A);else{if(ot===-1)break;if(Z.push(L.substring(A,ot)),Rr(ot+St),at&&(_n(),z))return de();if(O&&ut.length>=O)return de(!0)}return bn();function pi(te){ut.push(te),Bt=A}function Vs(te){var Ee=0;return Ee=te!==-1&&(te=L.substring(nt+1,te))&&te.trim()===""?te.length:Ee}function bn(te){return P||(te===void 0&&(te=L.substring(A)),Z.push(te),A=J,pi(Z),at&&_n()),de()}function Rr(te){A=te,pi(Z),Z=[],ot=L.indexOf(S,A)}function de(te){if(v.header&&!j&&ut.length&&!W){var Ee=ut[0],Bn=Object.create(null),Vl=new Set(Ee);let pf=!1;for(let Us=0;Us<Ee.length;Us++){let yn=Ee[Us];if(Bn[yn=M(v.transformHeader)?v.transformHeader(yn,Us):yn]){let Lr,gf=Bn[yn];for(;Lr=yn+"_"+gf,gf++,Vl.has(Lr););Vl.add(Lr),Ee[Us]=Lr,Bn[yn]++,pf=!0,(N=N===null?{}:N)[Lr]=yn}else Bn[yn]=1,Ee[Us]=yn;Vl.add(yn)}pf&&console.warn("Duplicate headers found and renamed."),W=!0}return{data:ut,errors:Ft,meta:{delimiter:y,linebreak:S,aborted:z,truncated:!!te,cursor:Bt+(j||0),renamedHeaders:N}}}function _n(){D(de()),ut=[],Ft=[]}},this.abort=function(){z=!0},this.getCharIndex=function(){return A}}function _(v){var y=v.data,S=o[y.workerId],$=!1;if(y.error)S.userError(y.error,y.file);else if(y.results&&y.results.data){var D={abort:function(){$=!0,w(y.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:C,resume:C};if(M(S.userStep)){for(var O=0;O<y.results.data.length&&(S.userStep({data:y.results.data[O],errors:y.results.errors,meta:y.results.meta},D),!$);O++);delete y.results}else M(S.userChunk)&&(S.userChunk(y.results,D,y.file),delete y.results)}y.finished&&!$&&w(y.workerId,y.results)}function w(v,y){var S=o[v];M(S.userComplete)&&S.userComplete(y),S.terminate(),delete o[v]}function C(){throw new Error("Not implemented.")}function x(v){if(typeof v!="object"||v===null)return v;var y,S=Array.isArray(v)?[]:{};for(y in v)S[y]=x(v[y]);return S}function E(v,y){return function(){v.apply(y,arguments)}}function M(v){return typeof v=="function"}return l.parse=function(v,y){var S=(y=y||{}).dynamicTyping||!1;if(M(S)&&(y.dynamicTypingFunction=S,S={}),y.dynamicTyping=S,y.transform=!!M(y.transform)&&y.transform,!y.worker||!l.WORKERS_SUPPORTED)return S=null,l.NODE_STREAM_INPUT,typeof v=="string"?(v=($=>$.charCodeAt(0)!==65279?$:$.slice(1))(v),S=new(y.download?u:f)(y)):v.readable===!0&&M(v.read)&&M(v.on)?S=new p(y):(i.File&&v instanceof File||v instanceof Object)&&(S=new d(y)),S.stream(v);(S=(()=>{var $;return!!l.WORKERS_SUPPORTED&&($=(()=>{var D=i.URL||i.webkitURL||null,O=n.toString();return l.BLOB_URL||(l.BLOB_URL=D.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",O,")();"],{type:"text/javascript"})))})(),($=new i.Worker($)).onmessage=_,$.id=c++,o[$.id]=$)})()).userStep=y.step,S.userChunk=y.chunk,S.userComplete=y.complete,S.userError=y.error,y.step=M(y.step),y.chunk=M(y.chunk),y.complete=M(y.complete),y.error=M(y.error),delete y.worker,S.postMessage({input:v,config:y,workerId:S.id})},l.unparse=function(v,y){var S=!1,$=!0,D=",",O=`\r
`,B='"',N=B+B,W=!1,R=null,H=!1,A=((()=>{if(typeof y=="object"){if(typeof y.delimiter!="string"||l.BAD_DELIMITERS.filter(function(j){return y.delimiter.indexOf(j)!==-1}).length||(D=y.delimiter),typeof y.quotes!="boolean"&&typeof y.quotes!="function"&&!Array.isArray(y.quotes)||(S=y.quotes),typeof y.skipEmptyLines!="boolean"&&typeof y.skipEmptyLines!="string"||(W=y.skipEmptyLines),typeof y.newline=="string"&&(O=y.newline),typeof y.quoteChar=="string"&&(B=y.quoteChar),typeof y.header=="boolean"&&($=y.header),Array.isArray(y.columns)){if(y.columns.length===0)throw new Error("Option columns is empty");R=y.columns}y.escapeChar!==void 0&&(N=y.escapeChar+B),y.escapeFormulae instanceof RegExp?H=y.escapeFormulae:typeof y.escapeFormulae=="boolean"&&y.escapeFormulae&&(H=/^[=+\-@\t\r].*$/)}})(),new RegExp(m(B),"g"));if(typeof v=="string"&&(v=JSON.parse(v)),Array.isArray(v)){if(!v.length||Array.isArray(v[0]))return z(null,v,W);if(typeof v[0]=="object")return z(R||Object.keys(v[0]),v,W)}else if(typeof v=="object")return typeof v.data=="string"&&(v.data=JSON.parse(v.data)),Array.isArray(v.data)&&(v.fields||(v.fields=v.meta&&v.meta.fields||R),v.fields||(v.fields=Array.isArray(v.data[0])?v.fields:typeof v.data[0]=="object"?Object.keys(v.data[0]):[]),Array.isArray(v.data[0])||typeof v.data[0]=="object"||(v.data=[v.data])),z(v.fields||[],v.data||[],W);throw new Error("Unable to serialize unrecognized input");function z(j,P,J){var lt="",St=(typeof j=="string"&&(j=JSON.parse(j)),typeof P=="string"&&(P=JSON.parse(P)),Array.isArray(j)&&0<j.length),Xe=!Array.isArray(P[0]);if(St&&$){for(var at=0;at<j.length;at++)0<at&&(lt+=D),lt+=L(j[at],at);0<P.length&&(lt+=O)}for(var ut=0;ut<P.length;ut++){var Ft=(St?j:P[ut]).length,Z=!1,Bt=St?Object.keys(P[ut]).length===0:P[ut].length===0;if(J&&!St&&(Z=J==="greedy"?P[ut].join("").trim()==="":P[ut].length===1&&P[ut][0].length===0),J==="greedy"&&St){for(var Qt=[],kt=0;kt<Ft;kt++){var Mt=Xe?j[kt]:kt;Qt.push(P[ut][Mt])}Z=Qt.join("").trim()===""}if(!Z){for(var ot=0;ot<Ft;ot++){0<ot&&!Bt&&(lt+=D);var on=St&&Xe?j[ot]:ot;lt+=L(P[ut][on],ot)}ut<P.length-1&&(!J||0<Ft&&!Bt)&&(lt+=O)}}return lt}function L(j,P){var J,lt;return j==null?"":j.constructor===Date?JSON.stringify(j).slice(1,25):(lt=!1,H&&typeof j=="string"&&H.test(j)&&(j="'"+j,lt=!0),J=j.toString().replace(A,N),(lt=lt||S===!0||typeof S=="function"&&S(j,P)||Array.isArray(S)&&S[P]||((St,Xe)=>{for(var at=0;at<Xe.length;at++)if(-1<St.indexOf(Xe[at]))return!0;return!1})(J,l.BAD_DELIMITERS)||-1<J.indexOf(D)||J.charAt(0)===" "||J.charAt(J.length-1)===" ")?B+J+B:J)}},l.RECORD_SEP="",l.UNIT_SEP="",l.BYTE_ORDER_MARK="\uFEFF",l.BAD_DELIMITERS=["\r",`
`,'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!r&&!!i.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=b,l.ParserHandle=g,l.NetworkStreamer=u,l.FileStreamer=d,l.StringStreamer=f,l.ReadableStreamStreamer=p,i.jQuery&&((s=i.jQuery).fn.parse=function(v){var y=v.config||{},S=[];return this.each(function(O){if(!(s(this).prop("tagName").toUpperCase()==="INPUT"&&s(this).attr("type").toLowerCase()==="file"&&i.FileReader)||!this.files||this.files.length===0)return!0;for(var B=0;B<this.files.length;B++)S.push({file:this.files[B],inputElem:this,instanceConfig:s.extend({},y)})}),$(),this;function $(){if(S.length===0)M(v.complete)&&v.complete();else{var O,B,N,W,R=S[0];if(M(v.before)){var H=v.before(R.file,R.inputElem);if(typeof H=="object"){if(H.action==="abort")return O="AbortError",B=R.file,N=R.inputElem,W=H.reason,void(M(v.error)&&v.error({name:O},B,N,W));if(H.action==="skip")return void D();typeof H.config=="object"&&(R.instanceConfig=s.extend(R.instanceConfig,H.config))}else if(H==="skip")return void D()}var A=R.instanceConfig.complete;R.instanceConfig.complete=function(z){M(A)&&A(z,R.file,R.inputElem),D()},l.parse(R.file,R.instanceConfig)}}function D(){S.splice(0,1),$()}}),a&&(i.onmessage=function(v){v=v.data,l.WORKER_ID===void 0&&v&&(l.WORKER_ID=v.workerId),typeof v.input=="string"?i.postMessage({workerId:l.WORKER_ID,results:l.parse(v.input,v.config),finished:!0}):(i.File&&v.input instanceof File||v.input instanceof Object)&&(v=l.parse(v.input,v.config))&&i.postMessage({workerId:l.WORKER_ID,results:v,finished:!0})}),(u.prototype=Object.create(h.prototype)).constructor=u,(d.prototype=Object.create(h.prototype)).constructor=d,(f.prototype=Object.create(f.prototype)).constructor=f,(p.prototype=Object.create(h.prototype)).constructor=p,l})})(pc)),pc.exports}var CL=kL();const ML=xL(CL),EL=e=>{const t=e.map(i=>i.toLocaleLowerCase()),n=i=>{const s=t.findIndex(r=>i.some(a=>r.includes(a)));return s!==-1?e[s]:void 0};return{date:n(["date","time"]),amount:n(["amount","value","cost","price","debit"]),credit:n(["credit","payment"]),description:n(["description","merchant","payee","name","memo"]),account:n(["account","source","card"])}},DL=e=>new Promise((t,n)=>{ML.parse(e,{header:!0,skipEmptyLines:!0,complete:({data:i,meta:s,errors:r})=>{const a=EL(s.fields||[]);t({data:i,meta:s,errors:r,suggestedMapping:a})},error:i=>{n(i)}})});var $L=Object.defineProperty,IL=Object.getOwnPropertyDescriptor,Hw=e=>{throw TypeError(e)},Hs=(e,t,n,i)=>{for(var s=i>1?void 0:i?IL(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&$L(t,n,s),s},PL=(e,t,n)=>t.has(e)||Hw("Cannot "+n),OL=(e,t,n)=>t.has(e)?Hw("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Di=(e,t,n)=>(PL(e,t,"access private method"),n),Cn,Vw,Uw,qw,Kw,Yw,Xw,Gw,Qw;const TL=[{key:"date",label:"Date"},{key:"amount",label:"Debit"},{key:"credit",label:"Credit"},{key:"description",label:"Description"},{key:"account",label:"Account"}];let ci=class extends _o(gt){constructor(){super(...arguments),OL(this,Cn),this._step="upload",this._mapping={},this._accounts=[],this._accountName="",this._importMode="append"}async loadFile(e){await this.withBusy(async()=>{this._accounts=await Li.all(),this._result=await DL(e),this._mapping={...this._result.suggestedMapping},this._step="mapping"})}render(){return k`
      ${this._step==="upload"?Di(this,Cn,Gw).call(this):Di(this,Cn,Qw).call(this)}
    `}};Cn=new WeakSet;Vw=async function(e){const t=e.target;!t.files||t.files.length===0||await this.loadFile(t.files[0])};Uw=function(e){this._accountName=e.target.value};qw=function(e){this._importMode=e.target.value};Kw=function(e,t){const i=t.target.value||void 0;this._mapping={...this._mapping,[e]:i}};Yw=async function(){if(this._mapping.account)return;const e=this._accountName.trim();if(!e)return;const t=this._accounts.find(n=>n.name.toLowerCase()===e.toLowerCase());return t?t.id:Li.create({name:e})};Xw=async function(){this._result&&await this.withBusy(async()=>{const e=!this._mapping.account,t=await Di(this,Cn,Yw).call(this);if(!(e&&t===void 0)){Sd("Importing transactions...");try{const n=await _L(this._result.data,this._mapping,{accountId:t,importMode:this._importMode});this.dispatchEvent(new CustomEvent("imported",{detail:{count:n}})),this._step="upload",this._result=void 0,this._mapping={},this._accountName="",this._importMode="append"}finally{kd()}}})};Gw=function(){return k`
      <label for="file-upload">Select a CSV file:</label>
      <input type="file" id="file-upload" accept=".csv" @change=${Di(this,Cn,Vw)} />
    `};Qw=function(){if(!this._result)return G;const e=this._result.meta.fields??[],t=this._result.data.slice(0,5);return k`
      <h4>Column Mapping</h4>
      <div class="mapping-form">
        ${TL.map(({key:n,label:i})=>k`
          <label>${i}:</label>
          <select @change=${s=>Di(this,Cn,Kw).call(this,n,s)}>
            <option value="">-- Unmapped --</option>
            ${e.map(s=>k`
              <option value=${s} ?selected=${this._mapping[n]===s}>${s}</option>
            `)}
          </select>
        `)}
      </div>

      ${this._mapping.account?G:k`
        <h4>Account</h4>
        <div class="mapping-form">
          <label>Account:</label>
          <input
            type="text"
            list="account-options"
            .value=${this._accountName}
            @input=${Di(this,Cn,Uw)}
            placeholder="Type or select an account"
          />
          <datalist id="account-options">
            ${this._accounts.map(n=>k`<option value=${n.name}></option>`)}
          </datalist>
        </div>
      `}

      <div class="mapping-form">
        <label>Mode:</label>
        <select @change=${Di(this,Cn,qw)}>
          <option value="append" ?selected=${this._importMode==="append"}>Append to existing</option>
          <option value="replace" ?selected=${this._importMode==="replace"}>Replace existing transactions</option>
        </select>
      </div>

      <button @click=${Di(this,Cn,Xw)}>Import</button>

      <h4>Preview</h4>
      <div class="preview">
        <table>
          <thead>
            <tr>${e.map(n=>k`<th>${n}</th>`)}</tr>
          </thead>
          <tbody>
            ${t.map(n=>k`
              <tr>${e.map(i=>k`<td>${n[i]}</td>`)}</tr>
            `)}
          </tbody>
        </table>
      </div>
    `};ci.styles=[Fn,bo,ui,mt`
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
    `];Hs([I()],ci.prototype,"_step",2);Hs([I()],ci.prototype,"_result",2);Hs([I()],ci.prototype,"_mapping",2);Hs([I()],ci.prototype,"_accounts",2);Hs([I()],ci.prototype,"_accountName",2);Hs([I()],ci.prototype,"_importMode",2);ci=Hs([$t("transaction-importer")],ci);var AL=Object.defineProperty,RL=Object.getOwnPropertyDescriptor,Jw=e=>{throw TypeError(e)},Me=(e,t,n,i)=>{for(var s=i>1?void 0:i?RL(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&AL(t,n,s),s},uf=(e,t,n)=>t.has(e)||Jw("Cannot "+n),Lh=(e,t,n)=>(uf(e,t,"read from private field"),n?n.call(e):t.get(e)),Nh=(e,t,n)=>t.has(e)?Jw("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),xm=(e,t,n,i)=>(uf(e,t,"write to private field"),t.set(e,n),n),X=(e,t,n)=>(uf(e,t,"access private method"),n),da,gc,Y,Zw,Er,t1,eo,e1,n1,i1,er,nr,zu,s1,r1,a1,o1,c1,l1,Hl,h1,u1,df,d1,ju,Wu,f1,p1;let ue=class extends _o(gt){constructor(){super(...arguments),Nh(this,Y),this._transactions=null,this._tags=[],this._tagMap=new Map,this._merchants=new Map,this._merchantList=[],this._currentPage=1,this._pageSize=50,this._filter="",this._sortCol="date",this._sortDir="desc",this._selectedIds=new Set,this._excludeTagIds=new Set,this._noMerchant=!1,this._bulkMerchantName="",this._showImporter=!1,Nh(this,da,[]),Nh(this,gc,e=>{const t=e.detail.file;this._showImporter=!0,this.updateComplete.then(()=>{const n=this.shadowRoot?.querySelector("transaction-importer");n&&n.loadFile(t)})})}connectedCallback(){super.connectedCallback(),X(this,Y,Er).call(this),document.addEventListener("budgee-import-csv",Lh(this,gc));const e=Or(()=>X(this,Y,Er).call(this),300);Promise.all([Se.subscribe(e),_e.subscribe(e),Ve.subscribe(e)]).then(t=>{xm(this,da,t)})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-import-csv",Lh(this,gc));for(const e of Lh(this,da))e.unsubscribe();xm(this,da,[])}render(){if(this._transactions===null)return k`
        <p>Loading…</p>
      `;if(this._transactions.length===0)return k`
        <p>No transactions found.</p>
      `;const e=this._transactions.filter(a=>X(this,Y,i1).call(this,a)),t=X(this,Y,r1).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize),s=i.map(a=>a.id),r=s.length>0&&s.every(a=>this._selectedIds.has(a));return k`
      <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>
        Import CSV
      </button>
      ${this._showImporter?k`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${X(this,Y,Zw)}></transaction-importer></budgee-modal>`:G}
      ${X(this,Y,f1).call(this)}
      ${X(this,Y,p1).call(this)}
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${50}
        storageKey="transactions"
        ?filterable=${!0}
        @page-change=${X(this,Y,e1)}
        @filter-change=${X(this,Y,n1)}
      >
        <table>
          <thead>
            <tr>
              <th class="col-checkbox">
                <input
                  type="checkbox"
                  .checked=${r}
                  @change=${()=>X(this,Y,l1).call(this,i)}
                />
              </th>
              <th class="sortable col-date" @click=${()=>X(this,Y,er).call(this,"date")}>
                Date${X(this,Y,nr).call(this,"date")}
              </th>
              <th class="sortable" @click=${()=>X(this,Y,er).call(this,"merchant")}>
                Merchant${X(this,Y,nr).call(this,"merchant")}
              </th>
              <th class="sortable" @click=${()=>X(this,Y,er).call(this,"description")}>
                Description${X(this,Y,nr).call(this,"description")}
              </th>
              <th class="sortable col-amount" @click=${()=>X(this,Y,er).call(this,"amount")}>
                Amount${X(this,Y,nr).call(this,"amount")}
              </th>
              <th class="sortable col-tags" @click=${()=>X(this,Y,er).call(this,"tags")}>
                Tags${X(this,Y,nr).call(this,"tags")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(a=>k`
              <tr @click=${()=>X(this,Y,o1).call(this,a.id)}>
                <td class="col-checkbox" @click=${o=>o.stopPropagation()}>
                  <input
                    type="checkbox"
                    .checked=${this._selectedIds.has(a.id)}
                    @change=${()=>X(this,Y,c1).call(this,a.id)}
                  />
                </td>
                <td class="col-date">${X(this,Y,s1).call(this,a.date)}</td>
                <td>${a.merchantId&&this._merchants.has(a.merchantId)?k`<a class="merchant-link" @click=${o=>{o.stopPropagation(),X(this,Y,a1).call(this,a.merchantId)}}>${this._merchants.get(a.merchantId)}</a>`:""}</td>
                <td>${a.originalDescription}</td>
                <td class="col-amount ${a.amount<0?"amount-negative":"amount-positive"}">
                  ${a.amount.toFixed(2)}
                </td>
                <td class="col-tags">
                  <tag-pills .tags=${this._tags} .tagIds=${a.tagIds}></tag-pills>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};da=new WeakMap;gc=new WeakMap;Y=new WeakSet;Zw=async function(){await this.withBusy(async()=>{this._showImporter=!1,await X(this,Y,Er).call(this)})};Er=async function(){const[e,t,n]=await Promise.all([Se.all(),_e.all(),Ve.all()]);this._transactions=e,this._tags=t,this._tagMap=new Map(t.map(i=>[i.id,i])),this._merchants=new Map(n.map(i=>[i.id,i.name])),this._merchantList=n};t1=function(e){return this._tagMap.get(e)};eo=function(e){return X(this,Y,t1).call(this,e)?.name??`#${e}`};e1=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};n1=function(e){this._filter=e.detail.filter,this._currentPage=1};i1=function(e){if(this._noMerchant&&e.merchantId||e.tagIds.some(n=>this._excludeTagIds.has(n)))return!1;if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.originalDescription.toLowerCase().includes(t)||e.tagIds.some(n=>X(this,Y,eo).call(this,n).toLowerCase().includes(t))||e.merchantId&&this._merchants.get(e.merchantId)?.toLowerCase().includes(t)||e.date.includes(t)||e.amount.toFixed(2).includes(t))};er=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};nr=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};zu=function(e){return e?this._merchants.get(e)??"":""};s1=function(e){const[t,n,i]=e.split("-");return new Date(Number(t),Number(n)-1,Number(i)).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})};r1=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,s)=>{let r=0;if(t==="date")r=i.date.localeCompare(s.date);else if(t==="merchant")r=X(this,Y,zu).call(this,i.merchantId).localeCompare(X(this,Y,zu).call(this,s.merchantId));else if(t==="description")r=i.originalDescription.localeCompare(s.originalDescription);else if(t==="amount")r=i.amount-s.amount;else if(t==="tags"){const a=i.tagIds.map(c=>X(this,Y,eo).call(this,c)).join(","),o=s.tagIds.map(c=>X(this,Y,eo).call(this,c)).join(",");r=a.localeCompare(o)}return r*n})};a1=function(e){window.history.pushState({},"",`/merchants/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};o1=function(e){window.history.pushState({},"",`/transactions/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};c1=function(e){const t=new Set(this._selectedIds);t.has(e)?t.delete(e):t.add(e),this._selectedIds=t};l1=function(e){const t=e.map(i=>i.id);if(t.every(i=>this._selectedIds.has(i))){const i=new Set(this._selectedIds);for(const s of t)i.delete(s);this._selectedIds=i}else this._selectedIds=new Set([...this._selectedIds,...t])};Hl=function(){this._selectedIds=new Set,this._bulkMerchantName=""};h1=async function(e){const n=e.detail.tag.id;await X(this,Y,df).call(this,n)};u1=async function(e){const t=e.detail.name,n=await _e.create(t);await X(this,Y,df).call(this,n)};df=async function(e){this._transactions&&await this.withBusy(async()=>{const t=this._transactions.filter(n=>this._selectedIds.has(n.id)&&!n.tagIds.includes(e)).map(n=>({...n,tagIds:[...n.tagIds,e]}));t.length>0&&await Se.bulkPut(t),X(this,Y,Hl).call(this),await X(this,Y,Er).call(this)})};d1=async function(){const e=this._bulkMerchantName.trim();!e||!this._transactions||await this.withBusy(async()=>{let t=this._merchantList.find(i=>i.name.toLowerCase()===e.toLowerCase());t||(t={id:await Ve.create(e),name:e});const n=this._transactions.filter(i=>this._selectedIds.has(i.id)).map(i=>({...i,merchantId:t.id}));n.length>0&&await Se.bulkPut(n),X(this,Y,Hl).call(this),await X(this,Y,Er).call(this)})};ju=function(e){const t=new Set(this._excludeTagIds);t.has(e)?t.delete(e):t.add(e),this._excludeTagIds=t,this._currentPage=1};Wu=function(){this._noMerchant=!this._noMerchant,this._currentPage=1};f1=function(){const e=this._excludeTagIds.size>0||this._noMerchant;return k`
      <div class="filter-bar">
        <div class="filter-group">
          <label>Exclude tag:</label>
          <select @change=${t=>{const n=t.target.value;n&&X(this,Y,ju).call(this,n),t.target.value=""}}>
            <option value="">Select…</option>
            ${this._tags.filter(t=>!this._excludeTagIds.has(t.id)).map(t=>k`<option value=${t.id}>${t.name}</option>`)}
          </select>
        </div>
        <div class="filter-group">
          <label>
            <input type="checkbox" .checked=${this._noMerchant} @change=${X(this,Y,Wu)} />
            No merchant
          </label>
        </div>
        ${e?k`
            <div class="active-filters">
              ${[...this._excludeTagIds].map(t=>k`
                  <span class="filter-chip">
                    Not: ${X(this,Y,eo).call(this,t)}
                    <button class="chip-remove" @click=${()=>X(this,Y,ju).call(this,t)}>×</button>
                  </span>
                `)}
              ${this._noMerchant?k`<span class="filter-chip">
                    No merchant
                    <button class="chip-remove" @click=${X(this,Y,Wu)}>×</button>
                  </span>`:G}
            </div>
          `:G}
      </div>
    `};p1=function(){return this._selectedIds.size===0?G:k`
      <div class="bulk-bar">
        <span class="selected-count">${this._selectedIds.size} selected</span>
        <div class="bulk-action">
          <label>Tag:</label>
          <tag-autocomplete
            .tags=${this._tags}
            .selectedTagIds=${[]}
            .excludeIds=${[]}
            @tag-selected=${X(this,Y,h1)}
            @tag-created=${X(this,Y,u1)}
          ></tag-autocomplete>
        </div>
        <div class="bulk-action">
          <label>Merchant:</label>
          <merchant-autocomplete
            .merchants=${this._merchantList}
            .value=${this._bulkMerchantName}
            @merchant-changed=${e=>{this._bulkMerchantName=e.detail.name}}
          ></merchant-autocomplete>
          <button @click=${X(this,Y,d1)} ?disabled=${!this._bulkMerchantName.trim()}>
            Set
          </button>
        </div>
        <button @click=${X(this,Y,Hl)}>Clear selection</button>
      </div>
    `};ue.styles=[Fn,bo,ui,mt`
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
    `];Me([I()],ue.prototype,"_transactions",2);Me([I()],ue.prototype,"_tags",2);Me([I()],ue.prototype,"_merchants",2);Me([I()],ue.prototype,"_merchantList",2);Me([I()],ue.prototype,"_currentPage",2);Me([I()],ue.prototype,"_pageSize",2);Me([I()],ue.prototype,"_filter",2);Me([I()],ue.prototype,"_sortCol",2);Me([I()],ue.prototype,"_sortDir",2);Me([I()],ue.prototype,"_selectedIds",2);Me([I()],ue.prototype,"_excludeTagIds",2);Me([I()],ue.prototype,"_noMerchant",2);Me([I()],ue.prototype,"_bulkMerchantName",2);Me([I()],ue.prototype,"_showImporter",2);ue=Me([$t("transaction-list")],ue);var LL=Object.defineProperty,NL=Object.getOwnPropertyDescriptor,g1=e=>{throw TypeError(e)},m1=(e,t,n,i)=>{for(var s=i>1?void 0:i?NL(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&LL(t,n,s),s},ff=(e,t,n)=>t.has(e)||g1("Cannot "+n),Je=(e,t,n)=>(ff(e,t,"read from private field"),n?n.call(e):t.get(e)),es=(e,t,n)=>t.has(e)?g1("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ol=(e,t,n,i)=>(ff(e,t,"write to private field"),t.set(e,n),n),Sm=(e,t,n)=>(ff(e,t,"access private method"),n),km=(e,t,n,i)=>({set _(s){ol(e,t,s)},get _(){return Je(e,t,i)}}),ir,hr,mc,Hu,vc,bc,_c,yc;let cl=class extends gt{constructor(){super(...arguments),es(this,mc),this._dragOver=!1,es(this,ir,0),es(this,hr),this._router=new w1(this,[{path:"/",render:()=>k`
          <budgee-dashboard></budgee-dashboard>
        `},{path:"/Transactions",render:()=>k`
          <transaction-list></transaction-list>
        `},{path:"/transactions/:id",render:({id:e})=>k`<transaction-detail .transactionId=${e}></transaction-detail>`,enter:async()=>(await fa(()=>import("./TransactionDetail-CXy1xs1x.js"),[]),!0)},{path:"/accounts",render:()=>k`
          <account-list></account-list>
        `},{path:"/accounts/:id",render:({id:e})=>k`<account-detail .accountId=${e}></account-detail>`,enter:async()=>(await fa(()=>import("./AccountDetail-CmerXmNZ.js"),[]),!0)},{path:"/Merchants",render:()=>k`
          <merchant-list></merchant-list>
        `},{path:"/merchants/:id",render:({id:e})=>k`<merchant-detail .merchantId=${e}></merchant-detail>`,enter:async()=>(await fa(()=>import("./MerchantDetail-DdpSvSeT.js"),[]),!0)},{path:"/Tags",render:()=>k`
          <tag-manager></tag-manager>
        `},{path:"/rules",render:()=>k`
          <rule-manager></rule-manager>
        `},{path:"/settings",render:()=>k`
          <budgee-settings @budgee-sync-settings-changed=${()=>Sm(this,mc,Hu).call(this)}></budgee-settings>
        `}]),es(this,vc,e=>{e.preventDefault()}),es(this,bc,e=>{e.preventDefault(),km(this,ir)._++,this._dragOver=!0}),es(this,_c,e=>{km(this,ir)._--,Je(this,ir)===0&&(this._dragOver=!1)}),es(this,yc,async e=>{e.preventDefault(),ol(this,ir,0),this._dragOver=!1;const t=e.dataTransfer?.files[0];if(t){if(t.name.endsWith(".csv"))window.history.pushState({},"","/Transactions"),window.dispatchEvent(new PopStateEvent("popstate")),await this.updateComplete,document.dispatchEvent(new CustomEvent("budgee-import-csv",{detail:{file:t}}));else if(t.name.endsWith(".json")){if(!confirm("This will replace all existing data. Are you sure?"))return;Sd("Importing database...");try{await k0(t),window.location.reload()}finally{kd()}}}})}connectedCallback(){super.connectedCallback(),this.addEventListener("dragover",Je(this,vc)),this.addEventListener("dragenter",Je(this,bc)),this.addEventListener("dragleave",Je(this,_c)),this.addEventListener("drop",Je(this,yc)),U().then(e=>E0(e)).catch(console.error),Sm(this,mc,Hu).call(this)}disconnectedCallback(){var e;super.disconnectedCallback(),this.removeEventListener("dragover",Je(this,vc)),this.removeEventListener("dragenter",Je(this,bc)),this.removeEventListener("dragleave",Je(this,_c)),this.removeEventListener("drop",Je(this,yc)),(e=Je(this,hr))==null||e.call(this)}navLink(e,t,n){const i=window.location.pathname,s=e==="/"?i==="/":i.startsWith(e);return k`<a href=${e} class=${q1({active:s})}>${re(n)} ${t}</a>`}render(){return k`
      <h1 class="app-name">${re(P0)} Budgee</h1>
      <nav>
        ${this.navLink("/","Dashboard",iD)}
        ${this.navLink("/Transactions","Transactions",T0)}
        ${this.navLink("/accounts","Accounts",sD)}
        ${this.navLink("/Merchants","Merchants",A0)}
        ${this.navLink("/Tags","Tags",oD)}
        ${this.navLink("/rules","Rules",rD)}
        ${this.navLink("/settings","Settings",aD)}
        <div style="flex:1"></div>
        <sync-status-indicator></sync-status-indicator>
      </nav>
      <main>${this._router.outlet()}</main>
      ${this._dragOver?k`
              <div class="drop-overlay">Drop file to import</div>
            `:G}
    `}};ir=new WeakMap;hr=new WeakMap;mc=new WeakSet;Hu=async function(){const e=Je(this,hr);ol(this,hr,void 0),await e?.();let t;try{t=localStorage.getItem("budgee-sync-url")}catch{return}if(t)try{ol(this,hr,await tD(t))}catch(n){console.error("Failed to start replication:",n)}};vc=new WeakMap;bc=new WeakMap;_c=new WeakMap;yc=new WeakMap;cl.styles=mt`
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
      background: rgba(0, 0, 0, 0.6);
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
  `;m1([I()],cl.prototype,"_dragOver",2);cl=m1([$t("budgee-app")],cl);export{G as A,_o as B,fr as C,VL as D,Dv as E,BS as F,ga as G,XL as H,ma as I,gn as J,yx as K,F as L,Ve as M,bl as N,qL as O,V as P,KL as Q,bx as R,le as S,Se as T,_e as a,k as b,en as c,Or as d,NA as e,Fn as f,bo as g,mt as h,gt as i,$t as j,Li as k,GL as l,FA as m,Q as n,lD as o,BA as p,QL as q,I as r,xL as s,ui as t,rn as u,Pt as v,mn as w,Sc as x,Na as y,HL as z};
