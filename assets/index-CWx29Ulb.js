(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const fy="modulepreload",py=function(e){return"/"+e},Sh={},Hi=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=py(l),l in Sh)return;Sh[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":fy,h||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),h)return new Promise((f,v)=>{d.addEventListener("load",f),d.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};const Ch=new WeakMap,$h=e=>{if((n=>n.pattern!==void 0)(e))return e.pattern;let t=Ch.get(e);return t===void 0&&Ch.set(e,t=new URLPattern({pathname:e.path})),t};let gy=class{constructor(t,n,i){this.routes=[],this.o=[],this.t={},this.i=r=>{if(r.routes===this)return;const s=r.routes;this.o.push(s),s.h=this,r.stopImmediatePropagation(),r.onDisconnect=()=>{this.o?.splice(this.o.indexOf(s)>>>0,1)};const o=Mh(this.t);o!==void 0&&s.goto(o)},(this.l=t).addController(this),this.routes=[...n],this.fallback=i?.fallback}link(t){if(t?.startsWith("/"))return t;if(t?.startsWith("."))throw Error("Not implemented");return t??=this.u,(this.h?.link()??"")+t}async goto(t){let n;if(this.routes.length===0&&this.fallback===void 0)n=t,this.u="",this.t={0:n};else{const i=this.p(t);if(i===void 0)throw Error("No route found for "+t);const r=$h(i).exec({pathname:t}),s=r?.pathname.groups??{};if(n=Mh(s),typeof i.enter=="function"&&await i.enter(s)===!1)return;this.v=i,this.t=s,this.u=n===void 0?t:t.substring(0,t.length-n.length)}if(n!==void 0)for(const i of this.o)i.goto(n);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(t){const n=this.routes.find((i=>$h(i).test({pathname:t})));return n||this.fallback===void 0?n:this.fallback?{...this.fallback,path:"/*"}:void 0}hostConnected(){this.l.addEventListener(al.eventName,this.i);const t=new al(this);this.l.dispatchEvent(t),this._=t.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}};const Mh=e=>{let t;for(const n of Object.keys(e))/\d+/.test(n)&&(t===void 0||n>t)&&(t=n);return t&&e[t]};let al=class pp extends Event{constructor(t){super(pp.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}};al.eventName="lit-routes-connected";const my=location.origin||location.protocol+"//"+location.host;let vy=class extends gy{constructor(){super(...arguments),this.m=t=>{const n=t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey;if(t.defaultPrevented||n)return;const i=t.composedPath().find((o=>o.tagName==="A"));if(i===void 0||i.target!==""||i.hasAttribute("download")||i.getAttribute("rel")==="external")return;const r=i.href;if(r===""||r.startsWith("mailto:"))return;const s=window.location;i.origin===my&&(t.preventDefault(),r!==s.href&&(window.history.pushState({},"",r),this.goto(i.pathname)))},this.R=t=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener("click",this.m),window.addEventListener("popstate",this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener("click",this.m),window.removeEventListener("popstate",this.R)}};const Bo=globalThis,pu=Bo.ShadowRoot&&(Bo.ShadyCSS===void 0||Bo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gu=Symbol(),Ah=new WeakMap;let gp=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==gu)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(pu&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Ah.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ah.set(n,t))}return t}toString(){return this.cssText}};const _y=e=>new gp(typeof e=="string"?e:e+"",void 0,gu),Et=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new gp(n,e,gu)},yy=(e,t)=>{if(pu)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),r=Bo.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}},Eh=pu?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return _y(n)})(e):e;const{is:by,defineProperty:wy,getOwnPropertyDescriptor:xy,getOwnPropertyNames:ky,getOwnPropertySymbols:Sy,getPrototypeOf:Cy}=Object,Na=globalThis,Th=Na.trustedTypes,$y=Th?Th.emptyScript:"",My=Na.reactiveElementPolyfillSupport,ws=(e,t)=>e,aa={toAttribute(e,t){switch(t){case Boolean:e=e?$y:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},mu=(e,t)=>!by(e,t),Dh={attribute:!0,type:String,converter:aa,reflect:!1,useDefault:!1,hasChanged:mu};Symbol.metadata??=Symbol("metadata"),Na.litPropertyMetadata??=new WeakMap;let wr=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Dh){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,n);r!==void 0&&wy(this.prototype,t,r)}}static getPropertyDescriptor(t,n,i){const{get:r,set:s}=xy(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:r,set(o){const a=r?.call(this);s?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Dh}static _$Ei(){if(this.hasOwnProperty(ws("elementProperties")))return;const t=Cy(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ws("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ws("properties"))){const n=this.properties,i=[...ky(n),...Sy(n)];for(const r of i)this.createProperty(r,n[r])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,r]of n)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const r=this._$Eu(n,i);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)n.unshift(Eh(r))}else t!==void 0&&n.push(Eh(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yy(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:aa).toAttribute(n,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,n){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:aa;this._$Em=r;const a=o.fromAttribute(n,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,n,i,r=!1,s){if(t!==void 0){const o=this.constructor;if(r===!1&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??mu)(s,n)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),s!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};wr.elementStyles=[],wr.shadowRootOptions={mode:"open"},wr[ws("elementProperties")]=new Map,wr[ws("finalized")]=new Map,My?.({ReactiveElement:wr}),(Na.reactiveElementVersions??=[]).push("2.1.2");const vu=globalThis,Oh=e=>e,ca=vu.trustedTypes,Ph=ca?ca.createPolicy("lit-html",{createHTML:e=>e}):void 0,mp="$lit$",ni=`lit$${Math.random().toFixed(9).slice(2)}$`,vp="?"+ni,Ay=`<${vp}>`,Xi=document,Ps=()=>Xi.createComment(""),Is=e=>e===null||typeof e!="object"&&typeof e!="function",_u=Array.isArray,Ey=e=>_u(e)||typeof e?.[Symbol.iterator]=="function",dc=`[ 	
\f\r]`,Jr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ih=/-->/g,Rh=/>/g,wi=RegExp(`>|${dc}(?:([^\\s"'>=/]+)(${dc}*=${dc}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Lh=/'/g,Bh=/"/g,_p=/^(?:script|style|textarea|title)$/i,Ty=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),z=Ty(1),fi=Symbol.for("lit-noChange"),pt=Symbol.for("lit-nothing"),Nh=new WeakMap,ji=Xi.createTreeWalker(Xi,129);function yp(e,t){if(!_u(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ph!==void 0?Ph.createHTML(t):t}const Dy=(e,t)=>{const n=e.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",o=Jr;for(let a=0;a<n;a++){const c=e[a];let l,h,u=-1,d=0;for(;d<c.length&&(o.lastIndex=d,h=o.exec(c),h!==null);)d=o.lastIndex,o===Jr?h[1]==="!--"?o=Ih:h[1]!==void 0?o=Rh:h[2]!==void 0?(_p.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=wi):h[3]!==void 0&&(o=wi):o===wi?h[0]===">"?(o=r??Jr,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,l=h[1],o=h[3]===void 0?wi:h[3]==='"'?Bh:Lh):o===Bh||o===Lh?o=wi:o===Ih||o===Rh?o=Jr:(o=wi,r=void 0);const f=o===wi&&e[a+1].startsWith("/>")?" ":"";s+=o===Jr?c+Ay:u>=0?(i.push(l),c.slice(0,u)+mp+c.slice(u)+ni+f):c+ni+(u===-2?a:f)}return[yp(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Rs{constructor({strings:t,_$litType$:n},i){let r;this.parts=[];let s=0,o=0;const a=t.length-1,c=this.parts,[l,h]=Dy(t,n);if(this.el=Rs.createElement(l,i),ji.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=ji.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(mp)){const d=h[o++],f=r.getAttribute(u).split(ni),v=/([.?@])?(.*)/.exec(d);c.push({type:1,index:s,name:v[2],strings:f,ctor:v[1]==="."?Py:v[1]==="?"?Iy:v[1]==="@"?Ry:za}),r.removeAttribute(u)}else u.startsWith(ni)&&(c.push({type:6,index:s}),r.removeAttribute(u));if(_p.test(r.tagName)){const u=r.textContent.split(ni),d=u.length-1;if(d>0){r.textContent=ca?ca.emptyScript:"";for(let f=0;f<d;f++)r.append(u[f],Ps()),ji.nextNode(),c.push({type:2,index:++s});r.append(u[d],Ps())}}}else if(r.nodeType===8)if(r.data===vp)c.push({type:2,index:s});else{let u=-1;for(;(u=r.data.indexOf(ni,u+1))!==-1;)c.push({type:7,index:s}),u+=ni.length-1}s++}}static createElement(t,n){const i=Xi.createElement("template");return i.innerHTML=t,i}}function Ir(e,t,n=e,i){if(t===fi)return t;let r=i!==void 0?n._$Co?.[i]:n._$Cl;const s=Is(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=r:n._$Cl=r),r!==void 0&&(t=Ir(e,r._$AS(e,t.values),r,i)),t}class Oy{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,r=(t?.creationScope??Xi).importNode(n,!0);ji.currentNode=r;let s=ji.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new Xs(s,s.nextSibling,this,t):c.type===1?l=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(l=new Ly(s,this,t)),this._$AV.push(l),c=i[++a]}o!==c?.index&&(s=ji.nextNode(),o++)}return ji.currentNode=Xi,r}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class Xs{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,r){this.type=2,this._$AH=pt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Ir(this,t,n),Is(t)?t===pt||t==null||t===""?(this._$AH!==pt&&this._$AR(),this._$AH=pt):t!==this._$AH&&t!==fi&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ey(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==pt&&Is(this._$AH)?this._$AA.nextSibling.data=t:this.T(Xi.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Rs.createElement(yp(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(n);else{const s=new Oy(r,this),o=s.u(this.options);s.p(n),this.T(o),this._$AH=s}}_$AC(t){let n=Nh.get(t.strings);return n===void 0&&Nh.set(t.strings,n=new Rs(t)),n}k(t){_u(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,r=0;for(const s of t)r===n.length?n.push(i=new Xs(this.O(Ps()),this.O(Ps()),this,this.options)):i=n[r],i._$AI(s),r++;r<n.length&&(this._$AR(i&&i._$AB.nextSibling,r),n.length=r)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=Oh(t).nextSibling;Oh(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class za{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,r,s){this.type=1,this._$AH=pt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=pt}_$AI(t,n=this,i,r){const s=this.strings;let o=!1;if(s===void 0)t=Ir(this,t,n,0),o=!Is(t)||t!==this._$AH&&t!==fi,o&&(this._$AH=t);else{const a=t;let c,l;for(t=s[0],c=0;c<s.length-1;c++)l=Ir(this,a[i+c],n,c),l===fi&&(l=this._$AH[c]),o||=!Is(l)||l!==this._$AH[c],l===pt?t=pt:t!==pt&&(t+=(l??"")+s[c+1]),this._$AH[c]=l}o&&!r&&this.j(t)}j(t){t===pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Py extends za{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===pt?void 0:t}}class Iy extends za{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==pt)}}class Ry extends za{constructor(t,n,i,r,s){super(t,n,i,r,s),this.type=5}_$AI(t,n=this){if((t=Ir(this,t,n,0)??pt)===fi)return;const i=this._$AH,r=t===pt&&i!==pt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==pt&&(i===pt||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ly{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ir(this,t)}}const By=vu.litHtmlPolyfillSupport;By?.(Rs,Xs),(vu.litHtmlVersions??=[]).push("3.3.2");const Ny=(e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const s=n?.renderBefore??null;i._$litPart$=r=new Xs(t.insertBefore(Ps(),s),s,void 0,n??{})}return r._$AI(e),r};const yu=globalThis;let At=class extends wr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ny(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return fi}};At._$litElement$=!0,At.finalized=!0,yu.litElementHydrateSupport?.({LitElement:At});const zy=yu.litElementPolyfillSupport;zy?.({LitElement:At});(yu.litElementVersions??=[]).push("4.2.2");const zt=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const jy={attribute:!0,type:String,converter:aa,reflect:!1,hasChanged:mu},Fy=(e=jy,t,n)=>{const{kind:i,metadata:r}=n;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,e,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const c=this[o];t.call(this,a),this.requestUpdate(o,c,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function mt(e){return(t,n)=>typeof n=="object"?Fy(e,t,n):((i,r,s)=>{const o=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),o?Object.getOwnPropertyDescriptor(r,s):void 0})(e,t,n)}function q(e){return mt({...e,state:!0,attribute:!1})}const bp={ATTRIBUTE:1,CHILD:2},wp=e=>(...t)=>({_$litDirective$:e,values:t});let xp=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const qy=wp(class extends xp{constructor(e){if(super(e),e.type!==bp.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const n=e.element.classList;for(const i of this.st)i in t||(n.remove(i),this.st.delete(i));for(const i in t){const r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return fi}});class cl extends xp{constructor(t){if(super(t),this.it=pt,t.type!==bp.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===pt||t==null)return this._t=void 0,this.it=t;if(t===fi)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}cl.directiveName="unsafeHTML",cl.resultType=1;class ll extends cl{}ll.directiveName="unsafeSVG",ll.resultType=2;const Ae=wp(ll);function ja(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var fc={exports:{}},zh;function Wy(){return zh||(zh=1,(function(e,t){(function(n){e.exports=n()})(function(n){var i=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function r(_,y){var g=_[0],p=_[1],m=_[2],x=_[3];g+=(p&m|~p&x)+y[0]-680876936|0,g=(g<<7|g>>>25)+p|0,x+=(g&p|~g&m)+y[1]-389564586|0,x=(x<<12|x>>>20)+g|0,m+=(x&g|~x&p)+y[2]+606105819|0,m=(m<<17|m>>>15)+x|0,p+=(m&x|~m&g)+y[3]-1044525330|0,p=(p<<22|p>>>10)+m|0,g+=(p&m|~p&x)+y[4]-176418897|0,g=(g<<7|g>>>25)+p|0,x+=(g&p|~g&m)+y[5]+1200080426|0,x=(x<<12|x>>>20)+g|0,m+=(x&g|~x&p)+y[6]-1473231341|0,m=(m<<17|m>>>15)+x|0,p+=(m&x|~m&g)+y[7]-45705983|0,p=(p<<22|p>>>10)+m|0,g+=(p&m|~p&x)+y[8]+1770035416|0,g=(g<<7|g>>>25)+p|0,x+=(g&p|~g&m)+y[9]-1958414417|0,x=(x<<12|x>>>20)+g|0,m+=(x&g|~x&p)+y[10]-42063|0,m=(m<<17|m>>>15)+x|0,p+=(m&x|~m&g)+y[11]-1990404162|0,p=(p<<22|p>>>10)+m|0,g+=(p&m|~p&x)+y[12]+1804603682|0,g=(g<<7|g>>>25)+p|0,x+=(g&p|~g&m)+y[13]-40341101|0,x=(x<<12|x>>>20)+g|0,m+=(x&g|~x&p)+y[14]-1502002290|0,m=(m<<17|m>>>15)+x|0,p+=(m&x|~m&g)+y[15]+1236535329|0,p=(p<<22|p>>>10)+m|0,g+=(p&x|m&~x)+y[1]-165796510|0,g=(g<<5|g>>>27)+p|0,x+=(g&m|p&~m)+y[6]-1069501632|0,x=(x<<9|x>>>23)+g|0,m+=(x&p|g&~p)+y[11]+643717713|0,m=(m<<14|m>>>18)+x|0,p+=(m&g|x&~g)+y[0]-373897302|0,p=(p<<20|p>>>12)+m|0,g+=(p&x|m&~x)+y[5]-701558691|0,g=(g<<5|g>>>27)+p|0,x+=(g&m|p&~m)+y[10]+38016083|0,x=(x<<9|x>>>23)+g|0,m+=(x&p|g&~p)+y[15]-660478335|0,m=(m<<14|m>>>18)+x|0,p+=(m&g|x&~g)+y[4]-405537848|0,p=(p<<20|p>>>12)+m|0,g+=(p&x|m&~x)+y[9]+568446438|0,g=(g<<5|g>>>27)+p|0,x+=(g&m|p&~m)+y[14]-1019803690|0,x=(x<<9|x>>>23)+g|0,m+=(x&p|g&~p)+y[3]-187363961|0,m=(m<<14|m>>>18)+x|0,p+=(m&g|x&~g)+y[8]+1163531501|0,p=(p<<20|p>>>12)+m|0,g+=(p&x|m&~x)+y[13]-1444681467|0,g=(g<<5|g>>>27)+p|0,x+=(g&m|p&~m)+y[2]-51403784|0,x=(x<<9|x>>>23)+g|0,m+=(x&p|g&~p)+y[7]+1735328473|0,m=(m<<14|m>>>18)+x|0,p+=(m&g|x&~g)+y[12]-1926607734|0,p=(p<<20|p>>>12)+m|0,g+=(p^m^x)+y[5]-378558|0,g=(g<<4|g>>>28)+p|0,x+=(g^p^m)+y[8]-2022574463|0,x=(x<<11|x>>>21)+g|0,m+=(x^g^p)+y[11]+1839030562|0,m=(m<<16|m>>>16)+x|0,p+=(m^x^g)+y[14]-35309556|0,p=(p<<23|p>>>9)+m|0,g+=(p^m^x)+y[1]-1530992060|0,g=(g<<4|g>>>28)+p|0,x+=(g^p^m)+y[4]+1272893353|0,x=(x<<11|x>>>21)+g|0,m+=(x^g^p)+y[7]-155497632|0,m=(m<<16|m>>>16)+x|0,p+=(m^x^g)+y[10]-1094730640|0,p=(p<<23|p>>>9)+m|0,g+=(p^m^x)+y[13]+681279174|0,g=(g<<4|g>>>28)+p|0,x+=(g^p^m)+y[0]-358537222|0,x=(x<<11|x>>>21)+g|0,m+=(x^g^p)+y[3]-722521979|0,m=(m<<16|m>>>16)+x|0,p+=(m^x^g)+y[6]+76029189|0,p=(p<<23|p>>>9)+m|0,g+=(p^m^x)+y[9]-640364487|0,g=(g<<4|g>>>28)+p|0,x+=(g^p^m)+y[12]-421815835|0,x=(x<<11|x>>>21)+g|0,m+=(x^g^p)+y[15]+530742520|0,m=(m<<16|m>>>16)+x|0,p+=(m^x^g)+y[2]-995338651|0,p=(p<<23|p>>>9)+m|0,g+=(m^(p|~x))+y[0]-198630844|0,g=(g<<6|g>>>26)+p|0,x+=(p^(g|~m))+y[7]+1126891415|0,x=(x<<10|x>>>22)+g|0,m+=(g^(x|~p))+y[14]-1416354905|0,m=(m<<15|m>>>17)+x|0,p+=(x^(m|~g))+y[5]-57434055|0,p=(p<<21|p>>>11)+m|0,g+=(m^(p|~x))+y[12]+1700485571|0,g=(g<<6|g>>>26)+p|0,x+=(p^(g|~m))+y[3]-1894986606|0,x=(x<<10|x>>>22)+g|0,m+=(g^(x|~p))+y[10]-1051523|0,m=(m<<15|m>>>17)+x|0,p+=(x^(m|~g))+y[1]-2054922799|0,p=(p<<21|p>>>11)+m|0,g+=(m^(p|~x))+y[8]+1873313359|0,g=(g<<6|g>>>26)+p|0,x+=(p^(g|~m))+y[15]-30611744|0,x=(x<<10|x>>>22)+g|0,m+=(g^(x|~p))+y[6]-1560198380|0,m=(m<<15|m>>>17)+x|0,p+=(x^(m|~g))+y[13]+1309151649|0,p=(p<<21|p>>>11)+m|0,g+=(m^(p|~x))+y[4]-145523070|0,g=(g<<6|g>>>26)+p|0,x+=(p^(g|~m))+y[11]-1120210379|0,x=(x<<10|x>>>22)+g|0,m+=(g^(x|~p))+y[2]+718787259|0,m=(m<<15|m>>>17)+x|0,p+=(x^(m|~g))+y[9]-343485551|0,p=(p<<21|p>>>11)+m|0,_[0]=g+_[0]|0,_[1]=p+_[1]|0,_[2]=m+_[2]|0,_[3]=x+_[3]|0}function s(_){var y=[],g;for(g=0;g<64;g+=4)y[g>>2]=_.charCodeAt(g)+(_.charCodeAt(g+1)<<8)+(_.charCodeAt(g+2)<<16)+(_.charCodeAt(g+3)<<24);return y}function o(_){var y=[],g;for(g=0;g<64;g+=4)y[g>>2]=_[g]+(_[g+1]<<8)+(_[g+2]<<16)+(_[g+3]<<24);return y}function a(_){var y=_.length,g=[1732584193,-271733879,-1732584194,271733878],p,m,x,M,k,S;for(p=64;p<=y;p+=64)r(g,s(_.substring(p-64,p)));for(_=_.substring(p-64),m=_.length,x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],p=0;p<m;p+=1)x[p>>2]|=_.charCodeAt(p)<<(p%4<<3);if(x[p>>2]|=128<<(p%4<<3),p>55)for(r(g,x),p=0;p<16;p+=1)x[p]=0;return M=y*8,M=M.toString(16).match(/(.*?)(.{0,8})$/),k=parseInt(M[2],16),S=parseInt(M[1],16)||0,x[14]=k,x[15]=S,r(g,x),g}function c(_){var y=_.length,g=[1732584193,-271733879,-1732584194,271733878],p,m,x,M,k,S;for(p=64;p<=y;p+=64)r(g,o(_.subarray(p-64,p)));for(_=p-64<y?_.subarray(p-64):new Uint8Array(0),m=_.length,x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],p=0;p<m;p+=1)x[p>>2]|=_[p]<<(p%4<<3);if(x[p>>2]|=128<<(p%4<<3),p>55)for(r(g,x),p=0;p<16;p+=1)x[p]=0;return M=y*8,M=M.toString(16).match(/(.*?)(.{0,8})$/),k=parseInt(M[2],16),S=parseInt(M[1],16)||0,x[14]=k,x[15]=S,r(g,x),g}function l(_){var y="",g;for(g=0;g<4;g+=1)y+=i[_>>g*8+4&15]+i[_>>g*8&15];return y}function h(_){var y;for(y=0;y<_.length;y+=1)_[y]=l(_[y]);return _.join("")}h(a("hello")),typeof ArrayBuffer<"u"&&!ArrayBuffer.prototype.slice&&(function(){function _(y,g){return y=y|0||0,y<0?Math.max(y+g,0):Math.min(y,g)}ArrayBuffer.prototype.slice=function(y,g){var p=this.byteLength,m=_(y,p),x=p,M,k,S,E;return g!==n&&(x=_(g,p)),m>x?new ArrayBuffer(0):(M=x-m,k=new ArrayBuffer(M),S=new Uint8Array(k),E=new Uint8Array(this,m,M),S.set(E),k)}})();function u(_){return/[\u0080-\uFFFF]/.test(_)&&(_=unescape(encodeURIComponent(_))),_}function d(_,y){var g=_.length,p=new ArrayBuffer(g),m=new Uint8Array(p),x;for(x=0;x<g;x+=1)m[x]=_.charCodeAt(x);return y?m:p}function f(_){return String.fromCharCode.apply(null,new Uint8Array(_))}function v(_,y,g){var p=new Uint8Array(_.byteLength+y.byteLength);return p.set(new Uint8Array(_)),p.set(new Uint8Array(y),_.byteLength),p}function w(_){var y=[],g=_.length,p;for(p=0;p<g-1;p+=2)y.push(parseInt(_.substr(p,2),16));return String.fromCharCode.apply(String,y)}function b(){this.reset()}return b.prototype.append=function(_){return this.appendBinary(u(_)),this},b.prototype.appendBinary=function(_){this._buff+=_,this._length+=_.length;var y=this._buff.length,g;for(g=64;g<=y;g+=64)r(this._hash,s(this._buff.substring(g-64,g)));return this._buff=this._buff.substring(g-64),this},b.prototype.end=function(_){var y=this._buff,g=y.length,p,m=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],x;for(p=0;p<g;p+=1)m[p>>2]|=y.charCodeAt(p)<<(p%4<<3);return this._finish(m,g),x=h(this._hash),_&&(x=w(x)),this.reset(),x},b.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},b.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},b.prototype.setState=function(_){return this._buff=_.buff,this._length=_.length,this._hash=_.hash,this},b.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},b.prototype._finish=function(_,y){var g=y,p,m,x;if(_[g>>2]|=128<<(g%4<<3),g>55)for(r(this._hash,_),g=0;g<16;g+=1)_[g]=0;p=this._length*8,p=p.toString(16).match(/(.*?)(.{0,8})$/),m=parseInt(p[2],16),x=parseInt(p[1],16)||0,_[14]=m,_[15]=x,r(this._hash,_)},b.hash=function(_,y){return b.hashBinary(u(_),y)},b.hashBinary=function(_,y){var g=a(_),p=h(g);return y?w(p):p},b.ArrayBuffer=function(){this.reset()},b.ArrayBuffer.prototype.append=function(_){var y=v(this._buff.buffer,_),g=y.length,p;for(this._length+=_.byteLength,p=64;p<=g;p+=64)r(this._hash,o(y.subarray(p-64,p)));return this._buff=p-64<g?new Uint8Array(y.buffer.slice(p-64)):new Uint8Array(0),this},b.ArrayBuffer.prototype.end=function(_){var y=this._buff,g=y.length,p=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],m,x;for(m=0;m<g;m+=1)p[m>>2]|=y[m]<<(m%4<<3);return this._finish(p,g),x=h(this._hash),_&&(x=w(x)),this.reset(),x},b.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},b.ArrayBuffer.prototype.getState=function(){var _=b.prototype.getState.call(this);return _.buff=f(_.buff),_},b.ArrayBuffer.prototype.setState=function(_){return _.buff=d(_.buff,!0),b.prototype.setState.call(this,_)},b.ArrayBuffer.prototype.destroy=b.prototype.destroy,b.ArrayBuffer.prototype._finish=b.prototype._finish,b.ArrayBuffer.hash=function(_,y){var g=c(new Uint8Array(_)),p=h(g);return y?w(p):p},b})})(fc)),fc.exports}var Hy=Wy();const la=ja(Hy);var fo,Vy=new Uint8Array(16);function Uy(){if(!fo&&(fo=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!fo))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return fo(Vy)}const Ky=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function Yy(e){return typeof e=="string"&&Ky.test(e)}var ue=[];for(var pc=0;pc<256;++pc)ue.push((pc+256).toString(16).substr(1));function Xy(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=(ue[e[t+0]]+ue[e[t+1]]+ue[e[t+2]]+ue[e[t+3]]+"-"+ue[e[t+4]]+ue[e[t+5]]+"-"+ue[e[t+6]]+ue[e[t+7]]+"-"+ue[e[t+8]]+ue[e[t+9]]+"-"+ue[e[t+10]]+ue[e[t+11]]+ue[e[t+12]]+ue[e[t+13]]+ue[e[t+14]]+ue[e[t+15]]).toLowerCase();if(!Yy(n))throw TypeError("Stringified UUID is invalid");return n}function bu(e,t,n){e=e||{};var i=e.random||(e.rng||Uy)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){n=n||0;for(var r=0;r<16;++r)t[n+r]=i[r];return t}return Xy(i)}var po={},jh;function Gy(){if(jh)return po;jh=1,po.stringify=function(n){var i=[];i.push({obj:n});for(var r="",s,o,a,c,l,h,u,d,f,v,w;s=i.pop();)if(o=s.obj,a=s.prefix||"",c=s.val||"",r+=a,c)r+=c;else if(typeof o!="object")r+=typeof o>"u"?null:JSON.stringify(o);else if(o===null)r+="null";else if(Array.isArray(o)){for(i.push({val:"]"}),l=o.length-1;l>=0;l--)h=l===0?"":",",i.push({obj:o[l],prefix:h});i.push({val:"["})}else{u=[];for(d in o)o.hasOwnProperty(d)&&u.push(d);for(i.push({val:"}"}),l=u.length-1;l>=0;l--)f=u[l],v=o[f],w=l>0?",":"",w+=JSON.stringify(f)+":",i.push({obj:v,prefix:w});i.push({val:"{"})}return r};function e(t,n,i){var r=i[i.length-1];t===r.element&&(i.pop(),r=i[i.length-1]);var s=r.element,o=r.index;if(Array.isArray(s))s.push(t);else if(o===n.length-2){var a=n.pop();s[a]=t}else n.push(t)}return po.parse=function(t){for(var n=[],i=[],r=0,s,o,a,c,l,h,u,d,f;;){if(s=t[r++],s==="}"||s==="]"||typeof s>"u"){if(n.length===1)return n.pop();e(n.pop(),n,i);continue}switch(s){case" ":case"	":case`
`:case":":case",":break;case"n":r+=3,e(null,n,i);break;case"t":r+=3,e(!0,n,i);break;case"f":r+=4,e(!1,n,i);break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":for(o="",r--;;)if(a=t[r++],/[\d\.\-e\+]/.test(a))o+=a;else{r--;break}e(parseFloat(o),n,i);break;case'"':for(c="",l=void 0,h=0;u=t[r++],u!=='"'||l==="\\"&&h%2===1;)c+=u,l=u,l==="\\"?h++:h=0;e(JSON.parse('"'+c+'"'),n,i);break;case"[":d={element:[],index:n.length},n.push(d.element),i.push(d);break;case"{":f={element:{},index:n.length},n.push(f.element),i.push(f);break;default:throw new Error("unexpectedly reached end of input: "+s)}}},po}var Qy=Gy();const kp=ja(Qy);var go={exports:{}},Fh;function Jy(){if(Fh)return go.exports;Fh=1;var e=typeof Reflect=="object"?Reflect:null,t=e&&typeof e.apply=="function"?e.apply:function(m,x,M){return Function.prototype.apply.call(m,x,M)},n;e&&typeof e.ownKeys=="function"?n=e.ownKeys:Object.getOwnPropertySymbols?n=function(m){return Object.getOwnPropertyNames(m).concat(Object.getOwnPropertySymbols(m))}:n=function(m){return Object.getOwnPropertyNames(m)};function i(p){console&&console.warn&&console.warn(p)}var r=Number.isNaN||function(m){return m!==m};function s(){s.init.call(this)}go.exports=s,go.exports.once=_,s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var o=10;function a(p){if(typeof p!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof p)}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(p){if(typeof p!="number"||p<0||r(p))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+p+".");o=p}}),s.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(m){if(typeof m!="number"||m<0||r(m))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+m+".");return this._maxListeners=m,this};function c(p){return p._maxListeners===void 0?s.defaultMaxListeners:p._maxListeners}s.prototype.getMaxListeners=function(){return c(this)},s.prototype.emit=function(m){for(var x=[],M=1;M<arguments.length;M++)x.push(arguments[M]);var k=m==="error",S=this._events;if(S!==void 0)k=k&&S.error===void 0;else if(!k)return!1;if(k){var E;if(x.length>0&&(E=x[0]),E instanceof Error)throw E;var P=new Error("Unhandled error."+(E?" ("+E.message+")":""));throw P.context=E,P}var B=S[m];if(B===void 0)return!1;if(typeof B=="function")t(B,this,x);else for(var j=B.length,H=v(B,j),M=0;M<j;++M)t(H[M],this,x);return!0};function l(p,m,x,M){var k,S,E;if(a(x),S=p._events,S===void 0?(S=p._events=Object.create(null),p._eventsCount=0):(S.newListener!==void 0&&(p.emit("newListener",m,x.listener?x.listener:x),S=p._events),E=S[m]),E===void 0)E=S[m]=x,++p._eventsCount;else if(typeof E=="function"?E=S[m]=M?[x,E]:[E,x]:M?E.unshift(x):E.push(x),k=c(p),k>0&&E.length>k&&!E.warned){E.warned=!0;var P=new Error("Possible EventEmitter memory leak detected. "+E.length+" "+String(m)+" listeners added. Use emitter.setMaxListeners() to increase limit");P.name="MaxListenersExceededWarning",P.emitter=p,P.type=m,P.count=E.length,i(P)}return p}s.prototype.addListener=function(m,x){return l(this,m,x,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(m,x){return l(this,m,x,!0)};function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function u(p,m,x){var M={fired:!1,wrapFn:void 0,target:p,type:m,listener:x},k=h.bind(M);return k.listener=x,M.wrapFn=k,k}s.prototype.once=function(m,x){return a(x),this.on(m,u(this,m,x)),this},s.prototype.prependOnceListener=function(m,x){return a(x),this.prependListener(m,u(this,m,x)),this},s.prototype.removeListener=function(m,x){var M,k,S,E,P;if(a(x),k=this._events,k===void 0)return this;if(M=k[m],M===void 0)return this;if(M===x||M.listener===x)--this._eventsCount===0?this._events=Object.create(null):(delete k[m],k.removeListener&&this.emit("removeListener",m,M.listener||x));else if(typeof M!="function"){for(S=-1,E=M.length-1;E>=0;E--)if(M[E]===x||M[E].listener===x){P=M[E].listener,S=E;break}if(S<0)return this;S===0?M.shift():w(M,S),M.length===1&&(k[m]=M[0]),k.removeListener!==void 0&&this.emit("removeListener",m,P||x)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(m){var x,M,k;if(M=this._events,M===void 0)return this;if(M.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):M[m]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete M[m]),this;if(arguments.length===0){var S=Object.keys(M),E;for(k=0;k<S.length;++k)E=S[k],E!=="removeListener"&&this.removeAllListeners(E);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(x=M[m],typeof x=="function")this.removeListener(m,x);else if(x!==void 0)for(k=x.length-1;k>=0;k--)this.removeListener(m,x[k]);return this};function d(p,m,x){var M=p._events;if(M===void 0)return[];var k=M[m];return k===void 0?[]:typeof k=="function"?x?[k.listener||k]:[k]:x?b(k):v(k,k.length)}s.prototype.listeners=function(m){return d(this,m,!0)},s.prototype.rawListeners=function(m){return d(this,m,!1)},s.listenerCount=function(p,m){return typeof p.listenerCount=="function"?p.listenerCount(m):f.call(p,m)},s.prototype.listenerCount=f;function f(p){var m=this._events;if(m!==void 0){var x=m[p];if(typeof x=="function")return 1;if(x!==void 0)return x.length}return 0}s.prototype.eventNames=function(){return this._eventsCount>0?n(this._events):[]};function v(p,m){for(var x=new Array(m),M=0;M<m;++M)x[M]=p[M];return x}function w(p,m){for(;m+1<p.length;m++)p[m]=p[m+1];p.pop()}function b(p){for(var m=new Array(p.length),x=0;x<m.length;++x)m[x]=p[x].listener||p[x];return m}function _(p,m){return new Promise(function(x,M){function k(E){p.removeListener(m,S),M(E)}function S(){typeof p.removeListener=="function"&&p.removeListener("error",k),x([].slice.call(arguments))}g(p,m,S,{once:!0}),m!=="error"&&y(p,k,{once:!0})})}function y(p,m,x){typeof p.on=="function"&&g(p,"error",m,x)}function g(p,m,x,M){if(typeof p.on=="function")M.once?p.once(m,x):p.on(m,x);else if(typeof p.addEventListener=="function")p.addEventListener(m,function k(S){M.once&&p.removeEventListener(m,k),x(S)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof p)}return go.exports}var Zy=Jy();const jn=ja(Zy);function tb(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer||typeof Blob<"u"&&e instanceof Blob}function eb(e){return e instanceof ArrayBuffer?e.slice(0):e.slice(0,e.size,e.type)}var Sp=Function.prototype.toString,nb=Sp.call(Object);function ib(e){var t=Object.getPrototypeOf(e);if(t===null)return!0;var n=t.constructor;return typeof n=="function"&&n instanceof n&&Sp.call(n)==nb}function ne(e){var t,n,i;if(!e||typeof e!="object")return e;if(Array.isArray(e)){for(t=[],n=0,i=e.length;n<i;n++)t[n]=ne(e[n]);return t}if(e instanceof Date&&isFinite(e))return e.toISOString();if(tb(e))return eb(e);if(!ib(e))return e;t={};for(n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=ne(e[n]);typeof r<"u"&&(t[n]=r)}return t}function Cp(e){var t=!1;return function(...n){if(t)throw new Error("once called more than once");t=!0,e.apply(this,n)}}function $p(e){return function(...t){t=ne(t);var n=this,i=typeof t[t.length-1]=="function"?t.pop():!1,r=new Promise(function(s,o){var a;try{var c=Cp(function(l,h){l?o(l):s(h)});t.push(c),a=e.apply(n,t),a&&typeof a.then=="function"&&s(a)}catch(l){o(l)}});return i&&r.then(function(s){i(null,s)},i),r}}function rb(e,t,n){if(e.constructor.listeners("debug").length){for(var i=["api",e.name,t],r=0;r<n.length-1;r++)i.push(n[r]);e.constructor.emit("debug",i);var s=n[n.length-1];n[n.length-1]=function(o,a){var c=["api",e.name,t];c=c.concat(o?["error",o]:["success",a]),e.constructor.emit("debug",c),s(o,a)}}}function Wt(e,t){return $p(function(...n){if(this._closed)return Promise.reject(new Error("database is closed"));if(this._destroyed)return Promise.reject(new Error("database is destroyed"));var i=this;return rb(i,e,n),this.taskqueue.isReady?t.apply(this,n):new Promise(function(r,s){i.taskqueue.addTask(function(o){o?s(o):r(i[e].apply(i,n))})})})}function Gs(e,t){for(var n={},i=0,r=t.length;i<r;i++){var s=t[i];s in e&&(n[s]=e[s])}return n}var sb=6;function qh(e){return e}function ob(e){return[{ok:e}]}function Mp(e,t,n){var i=t.docs,r=new Map;i.forEach(function(w){r.has(w.id)?r.get(w.id).push(w):r.set(w.id,[w])});var s=r.size,o=0,a=new Array(s);function c(){var w=[];a.forEach(function(b){b.docs.forEach(function(_){w.push({id:b.id,docs:[_]})})}),n(null,{results:w})}function l(){++o===s&&c()}function h(w,b,_){a[w]={id:b,docs:_},l()}var u=[];r.forEach(function(w,b){u.push(b)});var d=0;function f(){if(!(d>=u.length)){var w=Math.min(d+sb,u.length),b=u.slice(d,w);v(b,d),d+=b.length}}function v(w,b){w.forEach(function(_,y){var g=b+y,p=r.get(_),m=Gs(p[0],["atts_since","attachments"]);m.open_revs=p.map(function(M){return M.rev}),m.open_revs=m.open_revs.filter(qh);var x=qh;m.open_revs.length===0&&(delete m.open_revs,x=ob),["revs","attachments","binary","ajax","latest"].forEach(function(M){M in t&&(m[M]=t[M])}),e.get(_,m,function(M,k){var S;M?S=[{error:M}]:S=x(k),h(g,_,S),f()})})}f()}var ul;try{localStorage.setItem("_pouch_check_localstorage",1),ul=!!localStorage.getItem("_pouch_check_localstorage")}catch{ul=!1}function ua(){return ul}const wn=typeof queueMicrotask=="function"?queueMicrotask:function(t){Promise.resolve().then(t)};class ab extends jn{constructor(){super(),this._listeners={},ua()&&addEventListener("storage",t=>{this.emit(t.key)})}addListener(t,n,i,r){if(this._listeners[n])return;var s=!1,o=this;function a(){if(!o._listeners[n])return;if(s){s="waiting";return}s=!0;var c=Gs(r,["style","include_docs","attachments","conflicts","filter","doc_ids","view","since","query_params","binary","return_docs"]);function l(){s=!1}i.changes(c).on("change",function(h){h.seq>r.since&&!r.cancelled&&(r.since=h.seq,r.onChange(h))}).on("complete",function(){s==="waiting"&&wn(a),s=!1}).on("error",l)}this._listeners[n]=a,this.on(t,a)}removeListener(t,n){n in this._listeners&&(super.removeListener(t,this._listeners[n]),delete this._listeners[n])}notifyLocalWindows(t){ua()&&(localStorage[t]=localStorage[t]==="a"?"b":"a")}notify(t){this.emit(t),this.notifyLocalWindows(t)}}function Qe(e){if(typeof console<"u"&&typeof console[e]=="function"){var t=Array.prototype.slice.call(arguments,1);console[e].apply(console,t)}}function cb(e,t){var n=6e5;e=parseInt(e,10)||0,t=parseInt(t,10),t!==t||t<=e?t=(e||1)<<1:t=t+1,t>n&&(e=n>>1,t=n);var i=Math.random(),r=t-e;return~~(r*i+e)}function lb(e){var t=0;return e||(t=2e3),cb(e,t)}function hl(e,t){Qe("info","The above "+e+" is totally normal. "+t)}let It=class extends Error{constructor(t,n,i){super(),this.status=t,this.name=n,this.message=i,this.error=!0}toString(){return JSON.stringify({status:this.status,name:this.name,message:this.message,reason:this.reason})}};new It(401,"unauthorized","Name or password is incorrect.");var ub=new It(400,"bad_request","Missing JSON list of 'docs'"),Xe=new It(404,"not_found","missing"),Rr=new It(409,"conflict","Document update conflict"),Ap=new It(400,"bad_request","_id field must contain a string"),hb=new It(412,"missing_id","_id is required for puts"),db=new It(400,"bad_request","Only reserved document ids may start with underscore.");new It(412,"precondition_failed","Database not open");var wu=new It(500,"unknown_error","Database encountered an unknown error"),Ep=new It(500,"badarg","Some query argument is invalid");new It(400,"invalid_request","Request was invalid");var fb=new It(400,"query_parse_error","Some query parameter is invalid"),Wh=new It(500,"doc_validation","Bad special document member"),Fa=new It(400,"bad_request","Something wrong with the request"),gc=new It(400,"bad_request","Document must be a JSON object");new It(404,"not_found","Database not found");var xu=new It(500,"indexed_db_went_bad","unknown");new It(500,"web_sql_went_bad","unknown");new It(500,"levelDB_went_went_bad","unknown");new It(403,"forbidden","Forbidden by design doc validate_doc_update function");var No=new It(400,"bad_request","Invalid rev format");new It(412,"file_exists","The database could not be created, the file already exists.");var pb=new It(412,"missing_stub","A pre-existing attachment stub wasn't found");new It(413,"invalid_url","Provided URL is invalid");function dt(e,t){function n(i){for(var r=Object.getOwnPropertyNames(e),s=0,o=r.length;s<o;s++)typeof e[r[s]]!="function"&&(this[r[s]]=e[r[s]]);this.stack===void 0&&(this.stack=new Error().stack),i!==void 0&&(this.reason=i)}return n.prototype=It.prototype,new n(t)}function Lr(e){if(typeof e!="object"){var t=e;e=wu,e.data=t}return"error"in e&&e.error==="conflict"&&(e.name="conflict",e.status=409),"name"in e||(e.name=e.error||"unknown"),"status"in e||(e.status=500),"message"in e||(e.message=e.message||e.reason),"stack"in e||(e.stack=new Error().stack),e}function gb(e,t,n){try{return!e(t,n)}catch(r){var i="Filter function threw: "+r.toString();return dt(Fa,i)}}function ku(e){var t={},n=e.filter&&typeof e.filter=="function";return t.query=e.query_params,function(r){r.doc||(r.doc={});var s=n&&gb(e.filter,r.doc,t);if(typeof s=="object")return s;if(s)return!1;if(!e.include_docs)delete r.doc;else if(!e.attachments)for(var o in r.doc._attachments)Object.prototype.hasOwnProperty.call(r.doc._attachments,o)&&(r.doc._attachments[o].stub=!0);return!0}}function Tp(e){var t;if(e?typeof e!="string"?t=dt(Ap):/^_/.test(e)&&!/^_(design|local)/.test(e)&&(t=dt(db)):t=dt(hb),t)throw t}function vn(e){return typeof e._remote=="boolean"?e._remote:typeof e.type=="function"?(Qe("warn","db.type() is deprecated and will be removed in a future version of PouchDB"),e.type()==="http"):!1}function mb(e,t){return"listenerCount"in e?e.listenerCount(t):jn.listenerCount(e,t)}function dl(e){if(!e)return null;var t=e.split("/");return t.length===2?t:t.length===1?[e,e]:null}function Hh(e){var t=dl(e);return t?t.join("/"):null}var Vh=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],Uh="queryKey",vb=/(?:^|&)([^&=]*)=?([^&]*)/g,_b=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;function Dp(e){for(var t=_b.exec(e),n={},i=14;i--;){var r=Vh[i],s=t[i]||"",o=["user","password"].indexOf(r)!==-1;n[r]=o?decodeURIComponent(s):s}return n[Uh]={},n[Vh[12]].replace(vb,function(a,c,l){c&&(n[Uh][c]=l)}),n}function Su(e,t){var n=[],i=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n.push(r),i.push(t[r]));return n.push(e),Function.apply(null,n).apply(null,i)}function ha(e,t,n){return e.get(t).catch(function(i){if(i.status!==404)throw i;return{}}).then(function(i){var r=i._rev,s=n(i);return s?(s._id=t,s._rev=r,yb(e,s,n)):{updated:!1,rev:r}})}function yb(e,t,n){return e.put(t).then(function(i){return{updated:!0,rev:i.rev}},function(i){if(i.status!==409)throw i;return ha(e,t._id,n)})}var Cu=function(e){return atob(e)},Qs=function(e){return btoa(e)};function $u(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(s){if(s.name!=="TypeError")throw s;for(var n=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,i=new n,r=0;r<e.length;r+=1)i.append(e[r]);return i.getBlob(t.type)}}function bb(e){for(var t=e.length,n=new ArrayBuffer(t),i=new Uint8Array(n),r=0;r<t;r++)i[r]=e.charCodeAt(r);return n}function Mu(e,t){return $u([bb(e)],{type:t})}function Au(e,t){return Mu(Cu(e),t)}function wb(e){for(var t="",n=new Uint8Array(e),i=n.byteLength,r=0;r<i;r++)t+=String.fromCharCode(n[r]);return t}function Op(e,t){var n=new FileReader,i=typeof n.readAsBinaryString=="function";n.onloadend=function(r){var s=r.target.result||"";if(i)return t(s);t(wb(s))},i?n.readAsBinaryString(e):n.readAsArrayBuffer(e)}function Pp(e,t){Op(e,function(n){t(n)})}function Eu(e,t){Pp(e,function(n){t(Qs(n))})}function xb(e,t){var n=new FileReader;n.onloadend=function(i){var r=i.target.result||new ArrayBuffer(0);t(r)},n.readAsArrayBuffer(e)}var kb=self.setImmediate||self.setTimeout,Sb=32768;function Cb(e){return Qs(e)}function $b(e,t,n,i,r){(n>0||i<t.size)&&(t=t.slice(n,i)),xb(t,function(s){e.append(s),r()})}function Mb(e,t,n,i,r){(n>0||i<t.length)&&(t=t.substring(n,i)),e.appendBinary(t),r()}function Tu(e,t){var n=typeof e=="string",i=n?e.length:e.size,r=Math.min(Sb,i),s=Math.ceil(i/r),o=0,a=n?new la:new la.ArrayBuffer,c=n?Mb:$b;function l(){kb(u)}function h(){var d=a.end(!0),f=Cb(d);t(f),a.destroy()}function u(){var d=o*r,f=d+r;o++,o<s?c(a,e,d,f,l):c(a,e,d,f,h)}u()}function Ip(e){return la.hash(e)}function Rp(e,t){if(!t)return bu().replace(/-/g,"").toLowerCase();var n=Object.assign({},e);return delete n._rev_tree,Ip(JSON.stringify(n))}var qa=bu;function Gi(e){for(var t,n,i,r=e.rev_tree.slice(),s;s=r.pop();){var o=s.ids,a=o[2],c=s.pos;if(a.length){for(var l=0,h=a.length;l<h;l++)r.push({pos:c+1,ids:a[l]});continue}var u=!!o[1].deleted,d=o[0];(!t||(i!==u?i:n!==c?n<c:t<d))&&(t=d,n=c,i=u)}return n+"-"+t}function Qi(e,t){for(var n=e.slice(),i;i=n.pop();)for(var r=i.pos,s=i.ids,o=s[2],a=t(o.length===0,r,s[0],i.ctx,s[1]),c=0,l=o.length;c<l;c++)n.push({pos:r+1,ids:o[c],ctx:a})}function Ab(e,t){return e.pos-t.pos}function Du(e){var t=[];Qi(e,function(r,s,o,a,c){r&&t.push({rev:s+"-"+o,pos:s,opts:c})}),t.sort(Ab).reverse();for(var n=0,i=t.length;n<i;n++)delete t[n].pos;return t}function Ou(e){for(var t=Gi(e),n=Du(e.rev_tree),i=[],r=0,s=n.length;r<s;r++){var o=n[r];o.rev!==t&&!o.opts.deleted&&i.push(o.rev)}return i}function Eb(e){var t=[];return Qi(e.rev_tree,function(n,i,r,s,o){o.status==="available"&&!n&&(t.push(i+"-"+r),o.status="missing")}),t}function Tb(e,t){let n=[];const i=e.slice();let r;for(;r=i.pop();){const{pos:s,ids:o}=r,a=`${s}-${o[0]}`,c=o[2];if(n.push(a),a===t){if(c.length!==0)throw new Error("The requested revision is not a leaf");return n.reverse()}(c.length===0||c.length>1)&&(n=[]);for(let l=0,h=c.length;l<h;l++)i.push({pos:s+1,ids:c[l]})}if(n.length===0)throw new Error("The requested revision does not exist");return n.reverse()}function Lp(e){for(var t=[],n=e.slice(),i;i=n.pop();){var r=i.pos,s=i.ids,o=s[0],a=s[1],c=s[2],l=c.length===0,h=i.history?i.history.slice():[];h.push({id:o,opts:a}),l&&t.push({pos:r+1-h.length,ids:h});for(var u=0,d=c.length;u<d;u++)n.push({pos:r+1,ids:c[u],history:h})}return t.reverse()}function Db(e,t){return e.pos-t.pos}function Ob(e,t,n){for(var i=0,r=e.length,s;i<r;)s=i+r>>>1,n(e[s],t)<0?i=s+1:r=s;return i}function Pb(e,t,n){var i=Ob(e,t,n);e.splice(i,0,t)}function Kh(e,t){for(var n,i,r=t,s=e.length;r<s;r++){var o=e[r],a=[o.id,o.opts,[]];i?(i[2].push(a),i=a):n=i=a}return n}function Ib(e,t){return e[0]<t[0]?-1:1}function Yh(e,t){for(var n=[{tree1:e,tree2:t}],i=!1;n.length>0;){var r=n.pop(),s=r.tree1,o=r.tree2;(s[1].status||o[1].status)&&(s[1].status=s[1].status==="available"||o[1].status==="available"?"available":"missing");for(var a=0;a<o[2].length;a++){if(!s[2][0]){i="new_leaf",s[2][0]=o[2][a];continue}for(var c=!1,l=0;l<s[2].length;l++)s[2][l][0]===o[2][a][0]&&(n.push({tree1:s[2][l],tree2:o[2][a]}),c=!0);c||(i="new_branch",Pb(s[2],o[2][a],Ib))}}return{conflicts:i,tree:e}}function Bp(e,t,n){var i=[],r=!1,s=!1,o;if(!e.length)return{tree:[t],conflicts:"new_leaf"};for(var a=0,c=e.length;a<c;a++){var l=e[a];if(l.pos===t.pos&&l.ids[0]===t.ids[0])o=Yh(l.ids,t.ids),i.push({pos:l.pos,ids:o.tree}),r=r||o.conflicts,s=!0;else if(n!==!0){var h=l.pos<t.pos?l:t,u=l.pos<t.pos?t:l,d=u.pos-h.pos,f=[],v=[];for(v.push({ids:h.ids,diff:d,parent:null,parentIdx:null});v.length>0;){var w=v.pop();if(w.diff===0){w.ids[0]===u.ids[0]&&f.push(w);continue}for(var b=w.ids[2],_=0,y=b.length;_<y;_++)v.push({ids:b[_],diff:w.diff-1,parent:w.ids,parentIdx:_})}var g=f[0];g?(o=Yh(g.ids,u.ids),g.parent[2][g.parentIdx]=o.tree,i.push({pos:h.pos,ids:h.ids}),r=r||o.conflicts,s=!0):i.push(l)}else i.push(l)}return s||i.push(t),i.sort(Db),{tree:i,conflicts:r||"internal_node"}}function Rb(e,t){for(var n=Lp(e),i,r,s=0,o=n.length;s<o;s++){var a=n[s],c=a.ids,l;if(c.length>t){i||(i={});var h=c.length-t;l={pos:a.pos+h,ids:Kh(c,h)};for(var u=0;u<h;u++){var d=a.pos+u+"-"+c[u].id;i[d]=!0}}else l={pos:a.pos,ids:Kh(c,0)};r?r=Bp(r,l,!0).tree:r=[l]}return i&&Qi(r,function(f,v,w){delete i[v+"-"+w]}),{tree:r,revs:i?Object.keys(i):[]}}function Np(e,t,n){var i=Bp(e,t),r=Rb(i.tree,n);return{tree:r.tree,stemmedRevs:r.revs,conflicts:i.conflicts}}function Lb(e,t){for(var n=e.slice(),i=t.split("-"),r=parseInt(i[0],10),s=i[1],o;o=n.pop();){if(o.pos===r&&o.ids[0]===s)return!0;for(var a=o.ids[2],c=0,l=a.length;c<l;c++)n.push({pos:o.pos+1,ids:a[c]})}return!1}function Bb(e){return e.ids}function In(e,t){t||(t=Gi(e));for(var n=t.substring(t.indexOf("-")+1),i=e.rev_tree.map(Bb),r;r=i.pop();){if(r[0]===n)return!!r[1].deleted;i=i.concat(r[2])}}function Vi(e){return typeof e=="string"&&e.startsWith("_local/")}function Nb(e,t){for(var n=t.rev_tree.slice(),i;i=n.pop();){var r=i.pos,s=i.ids,o=s[0],a=s[1],c=s[2],l=c.length===0,h=i.history?i.history.slice():[];if(h.push({id:o,pos:r,opts:a}),l)for(var u=0,d=h.length;u<d;u++){var f=h[u],v=f.pos+"-"+f.id;if(v===e)return r+"-"+o}for(var w=0,b=c.length;w<b;w++)n.push({pos:r+1,ids:c[w],history:h})}throw new Error("Unable to resolve latest revision for id "+t.id+", rev "+e)}function zb(e,t,n,i){try{e.emit("change",t,n,i)}catch(r){Qe("error",'Error in .on("change", function):',r)}}function jb(e,t,n){var i=[{rev:e._rev}];n.style==="all_docs"&&(i=Du(t.rev_tree).map(function(s){return{rev:s.rev}}));var r={id:t.id,changes:i,doc:e};return In(t,e._rev)&&(r.deleted=!0),n.conflicts&&(r.doc._conflicts=Ou(t),r.doc._conflicts.length||delete r.doc._conflicts),r}class Fb extends jn{constructor(t,n,i){super(),this.db=t,n=n?ne(n):{};var r=n.complete=Cp((a,c)=>{a?mb(this,"error")>0&&this.emit("error",a):this.emit("complete",c),this.removeAllListeners(),t.removeListener("destroyed",s)});i&&(this.on("complete",function(a){i(null,a)}),this.on("error",i));const s=()=>{this.cancel()};t.once("destroyed",s),n.onChange=(a,c,l)=>{this.isCancelled||zb(this,a,c,l)};var o=new Promise(function(a,c){n.complete=function(l,h){l?c(l):a(h)}});this.once("cancel",function(){t.removeListener("destroyed",s),n.complete(null,{status:"cancelled"})}),this.then=o.then.bind(o),this.catch=o.catch.bind(o),this.then(function(a){r(null,a)},r),t.taskqueue.isReady?this.validateChanges(n):t.taskqueue.addTask(a=>{a?n.complete(a):this.isCancelled?this.emit("cancel"):this.validateChanges(n)})}cancel(){this.isCancelled=!0,this.db.taskqueue.isReady&&this.emit("cancel")}validateChanges(t){var n=t.complete;ct._changesFilterPlugin?ct._changesFilterPlugin.validate(t,i=>{if(i)return n(i);this.doChanges(t)}):this.doChanges(t)}doChanges(t){var n=t.complete;if(t=ne(t),"live"in t&&!("continuous"in t)&&(t.continuous=t.live),t.processChange=jb,t.since==="latest"&&(t.since="now"),t.since||(t.since=0),t.since==="now"){this.db.info().then(r=>{if(this.isCancelled){n(null,{status:"cancelled"});return}t.since=r.update_seq,this.doChanges(t)},n);return}if(ct._changesFilterPlugin){if(ct._changesFilterPlugin.normalize(t),ct._changesFilterPlugin.shouldFilter(this,t))return ct._changesFilterPlugin.filter(this,t)}else["doc_ids","filter","selector","view"].forEach(function(r){r in t&&Qe("warn",'The "'+r+'" option was passed in to changes/replicate, but pouchdb-changes-filter plugin is not installed, so it was ignored. Please install the plugin to enable filtering.')});"descending"in t||(t.descending=!1),t.limit=t.limit===0?1:t.limit,t.complete=n;var i=this.db._changes(t);if(i&&typeof i.cancel=="function"){const r=this.cancel;this.cancel=(...s)=>{i.cancel(),r.apply(this,s)}}}}function mc(e,t){return function(n,i){n||i[0]&&i[0].error?(n=n||i[0],n.docId=t,e(n)):e(null,i.length?i[0]:i)}}function qb(e){for(var t=0;t<e.length;t++){var n=e[t];if(n._deleted)delete n._attachments;else if(n._attachments)for(var i=Object.keys(n._attachments),r=0;r<i.length;r++){var s=i[r];n._attachments[s]=Gs(n._attachments[s],["data","digest","content_type","length","revpos","stub"])}}}function Wb(e,t){if(e._id===t._id){const n=e._revisions?e._revisions.start:0,i=t._revisions?t._revisions.start:0;return n-i}return e._id<t._id?-1:1}function Hb(e){var t={},n=[];return Qi(e,function(i,r,s,o){var a=r+"-"+s;return i&&(t[a]=0),o!==void 0&&n.push({from:o,to:a}),a}),n.reverse(),n.forEach(function(i){t[i.from]===void 0?t[i.from]=1+t[i.to]:t[i.from]=Math.min(t[i.from],1+t[i.to])}),t}function Vb(e){var t="limit"in e?e.keys.slice(e.skip,e.limit+e.skip):e.skip>0?e.keys.slice(e.skip):e.keys;e.keys=t,e.skip=0,delete e.limit,e.descending&&(t.reverse(),e.descending=!1)}function zp(e){var t=e._compactionQueue[0],n=t.opts,i=t.callback;e.get("_local/compaction").catch(function(){return!1}).then(function(r){r&&r.last_seq&&(n.last_seq=r.last_seq),e._compact(n,function(s,o){s?i(s):i(null,o),wn(function(){e._compactionQueue.shift(),e._compactionQueue.length&&zp(e)})})})}function Ub(e,t,n){return e.get("_local/purges").then(function(i){const r=i.purgeSeq+1;return i.purges.push({docId:t,rev:n,purgeSeq:r}),i.purges.length>self.purged_infos_limit&&i.purges.splice(0,i.purges.length-self.purged_infos_limit),i.purgeSeq=r,i}).catch(function(i){if(i.status!==404)throw i;return{_id:"_local/purges",purges:[{docId:t,rev:n,purgeSeq:0}],purgeSeq:0}}).then(function(i){return e.put(i)})}function Kb(e){return e.charAt(0)==="_"?e+" is not a valid attachment name, attachment names cannot start with '_'":!1}function vc(e){return e===null||typeof e!="object"||Array.isArray(e)}const Yb=/^\d+-[^-]*$/;function _c(e){return typeof e=="string"&&Yb.test(e)}class jp extends jn{_setup(){this.post=Wt("post",function(t,n,i){if(typeof n=="function"&&(i=n,n={}),vc(t))return i(dt(gc));this.bulkDocs({docs:[t]},n,mc(i,t._id))}).bind(this),this.put=Wt("put",function(t,n,i){if(typeof n=="function"&&(i=n,n={}),vc(t))return i(dt(gc));if(Tp(t._id),"_rev"in t&&!_c(t._rev))return i(dt(No));if(Vi(t._id)&&typeof this._putLocal=="function")return t._deleted?this._removeLocal(t,i):this._putLocal(t,i);const r=o=>{typeof this._put=="function"&&n.new_edits!==!1?this._put(t,n,o):this.bulkDocs({docs:[t]},n,mc(o,t._id))};n.force&&t._rev?(s(),r(function(o){var a=o?null:{ok:!0,id:t._id,rev:t._rev};i(o,a)})):r(i);function s(){var o=t._rev.split("-"),a=o[1],c=parseInt(o[0],10),l=c+1,h=Rp();t._revisions={start:l,ids:[h,a]},t._rev=l+"-"+h,n.new_edits=!1}}).bind(this),this.putAttachment=Wt("putAttachment",function(t,n,i,r,s){var o=this;typeof s=="function"&&(s=r,r=i,i=null),typeof s>"u"&&(s=r,r=i,i=null),s||Qe("warn","Attachment",n,"on document",t,"is missing content_type");function a(c){var l="_rev"in c?parseInt(c._rev,10):0;return c._attachments=c._attachments||{},c._attachments[n]={content_type:s,data:r,revpos:++l},o.put(c)}return o.get(t).then(function(c){if(c._rev!==i)throw dt(Rr);return a(c)},function(c){if(c.reason===Xe.message)return a({_id:t});throw c})}).bind(this),this.removeAttachment=Wt("removeAttachment",function(t,n,i,r){this.get(t,(s,o)=>{if(s){r(s);return}if(o._rev!==i){r(dt(Rr));return}if(!o._attachments)return r();delete o._attachments[n],Object.keys(o._attachments).length===0&&delete o._attachments,this.put(o,r)})}).bind(this),this.remove=Wt("remove",function(t,n,i,r){var s;typeof n=="string"?(s={_id:t,_rev:n},typeof i=="function"&&(r=i,i={})):(s=t,typeof n=="function"?(r=n,i={}):(r=i,i=n)),i=i||{},i.was_delete=!0;var o={_id:s._id,_rev:s._rev||i.rev};if(o._deleted=!0,Vi(o._id)&&typeof this._removeLocal=="function")return this._removeLocal(s,r);this.bulkDocs({docs:[o]},i,mc(r,o._id))}).bind(this),this.revsDiff=Wt("revsDiff",function(t,n,i){typeof n=="function"&&(i=n,n={});var r=Object.keys(t);if(!r.length)return i(null,{});var s=0,o=new Map;function a(l,h){o.has(l)||o.set(l,{missing:[]}),o.get(l).missing.push(h)}function c(l,h){var u=t[l].slice(0);Qi(h,function(d,f,v,w,b){var _=f+"-"+v,y=u.indexOf(_);y!==-1&&(u.splice(y,1),b.status!=="available"&&a(l,_))}),u.forEach(function(d){a(l,d)})}r.forEach(function(l){this._getRevisionTree(l,function(h,u){if(h&&h.status===404&&h.message==="missing")o.set(l,{missing:t[l]});else{if(h)return i(h);c(l,u)}if(++s===r.length){var d={};return o.forEach(function(f,v){d[v]=f}),i(null,d)}})},this)}).bind(this),this.bulkGet=Wt("bulkGet",function(t,n){Mp(this,t,n)}).bind(this),this.compactDocument=Wt("compactDocument",function(t,n,i){this._getRevisionTree(t,(r,s)=>{if(r)return i(r);var o=Hb(s),a=[],c=[];Object.keys(o).forEach(function(l){o[l]>n&&a.push(l)}),Qi(s,function(l,h,u,d,f){var v=h+"-"+u;f.status==="available"&&a.indexOf(v)!==-1&&c.push(v)}),this._doCompaction(t,c,i)})}).bind(this),this.compact=Wt("compact",function(t,n){typeof t=="function"&&(n=t,t={}),t=t||{},this._compactionQueue=this._compactionQueue||[],this._compactionQueue.push({opts:t,callback:n}),this._compactionQueue.length===1&&zp(this)}).bind(this),this.get=Wt("get",function(t,n,i){if(typeof n=="function"&&(i=n,n={}),n=n||{},typeof t!="string")return i(dt(Ap));if(Vi(t)&&typeof this._getLocal=="function")return this._getLocal(t,i);var r=[];const s=()=>{var c=[],l=r.length;if(!l)return i(null,c);r.forEach(h=>{this.get(t,{rev:h,revs:n.revs,latest:n.latest,attachments:n.attachments,binary:n.binary},function(u,d){if(u)c.push({missing:h});else{for(var f,v=0,w=c.length;v<w;v++)if(c[v].ok&&c[v].ok._rev===d._rev){f=!0;break}f||c.push({ok:d})}l--,l||i(null,c)})})};if(n.open_revs){if(n.open_revs==="all")this._getRevisionTree(t,function(c,l){if(c)return i(c);r=Du(l).map(function(h){return h.rev}),s()});else if(Array.isArray(n.open_revs)){r=n.open_revs;for(var o=0;o<r.length;o++){var a=r[o];if(!_c(a))return i(dt(No))}s()}else return i(dt(wu,"function_clause"));return}return this._get(t,n,(c,l)=>{if(c)return c.docId=t,i(c);var h=l.doc,u=l.metadata,d=l.ctx;if(n.conflicts){var f=Ou(u);f.length&&(h._conflicts=f)}if(In(u,h._rev)&&(h._deleted=!0),n.revs||n.revs_info){for(var v=h._rev.split("-"),w=parseInt(v[0],10),b=v[1],_=Lp(u.rev_tree),y=null,g=0;g<_.length;g++){var p=_[g];const j=p.ids.findIndex(H=>H.id===b);var m=j===w-1;(m||!y&&j!==-1)&&(y=p)}if(!y)return c=new Error("invalid rev tree"),c.docId=t,i(c);const P=h._rev.split("-")[1],B=y.ids.findIndex(j=>j.id===P)+1;var x=y.ids.length-B;if(y.ids.splice(B,x),y.ids.reverse(),n.revs&&(h._revisions={start:y.pos+y.ids.length-1,ids:y.ids.map(function(j){return j.id})}),n.revs_info){var M=y.pos+y.ids.length;h._revs_info=y.ids.map(function(j){return M--,{rev:M+"-"+j.id,status:j.opts.status}})}}if(n.attachments&&h._attachments){var k=h._attachments,S=Object.keys(k).length;if(S===0)return i(null,h);Object.keys(k).forEach(P=>{this._getAttachment(h._id,P,k[P],{binary:n.binary,metadata:u,ctx:d},function(B,j){var H=h._attachments[P];H.data=j,delete H.stub,delete H.length,--S||i(null,h)})})}else{if(h._attachments)for(var E in h._attachments)Object.prototype.hasOwnProperty.call(h._attachments,E)&&(h._attachments[E].stub=!0);i(null,h)}})}).bind(this),this.getAttachment=Wt("getAttachment",function(t,n,i,r){i instanceof Function&&(r=i,i={}),this._get(t,i,(s,o)=>{if(s)return r(s);if(o.doc._attachments&&o.doc._attachments[n])i.ctx=o.ctx,i.binary=!0,i.metadata=o.metadata,this._getAttachment(t,n,o.doc._attachments[n],i,r);else return r(dt(Xe))})}).bind(this),this.allDocs=Wt("allDocs",function(t,n){if(typeof t=="function"&&(n=t,t={}),t.skip=typeof t.skip<"u"?t.skip:0,t.start_key&&(t.startkey=t.start_key),t.end_key&&(t.endkey=t.end_key),"keys"in t){if(!Array.isArray(t.keys))return n(new TypeError("options.keys must be an array"));var i=["startkey","endkey","key"].filter(function(r){return r in t})[0];if(i){n(dt(fb,"Query parameter `"+i+"` is not compatible with multi-get"));return}if(!vn(this)&&(Vb(t),t.keys.length===0))return this._allDocs({limit:0},n)}return this._allDocs(t,n)}).bind(this),this.close=Wt("close",function(t){return this._closed=!0,this.emit("closed"),this._close(t)}).bind(this),this.info=Wt("info",function(t){this._info((n,i)=>{if(n)return t(n);i.db_name=i.db_name||this.name,i.auto_compaction=!!(this.auto_compaction&&!vn(this)),i.adapter=this.adapter,t(null,i)})}).bind(this),this.id=Wt("id",function(t){return this._id(t)}).bind(this),this.bulkDocs=Wt("bulkDocs",function(t,n,i){if(typeof n=="function"&&(i=n,n={}),n=n||{},Array.isArray(t)&&(t={docs:t}),!t||!t.docs||!Array.isArray(t.docs))return i(dt(ub));for(var r=0;r<t.docs.length;++r){const c=t.docs[r];if(vc(c))return i(dt(gc));if("_rev"in c&&!_c(c._rev))return i(dt(No))}var s;if(t.docs.forEach(function(c){c._attachments&&Object.keys(c._attachments).forEach(function(l){s=s||Kb(l),c._attachments[l].content_type||Qe("warn","Attachment",l,"on document",c._id,"is missing content_type")})}),s)return i(dt(Fa,s));"new_edits"in n||("new_edits"in t?n.new_edits=t.new_edits:n.new_edits=!0);var o=this;!n.new_edits&&!vn(o)&&t.docs.sort(Wb),qb(t.docs);var a=t.docs.map(function(c){return c._id});this._bulkDocs(t,n,function(c,l){if(c)return i(c);if(n.new_edits||(l=l.filter(function(d){return d.error})),!vn(o))for(var h=0,u=l.length;h<u;h++)l[h].id=l[h].id||a[h];i(null,l)})}).bind(this),this.registerDependentDatabase=Wt("registerDependentDatabase",function(t,n){var i=ne(this.__opts);this.__opts.view_adapter&&(i.adapter=this.__opts.view_adapter);var r=new this.constructor(t,i);function s(o){return o.dependentDbs=o.dependentDbs||{},o.dependentDbs[t]?!1:(o.dependentDbs[t]=!0,o)}ha(this,"_local/_pouch_dependentDbs",s).then(function(){n(null,{db:r})}).catch(n)}).bind(this),this.destroy=Wt("destroy",function(t,n){typeof t=="function"&&(n=t,t={});var i="use_prefix"in this?this.use_prefix:!0;const r=()=>{this._destroy(t,(s,o)=>{if(s)return n(s);this._destroyed=!0,this.emit("destroyed"),n(null,o||{ok:!0})})};if(vn(this))return r();this.get("_local/_pouch_dependentDbs",(s,o)=>{if(s)return s.status!==404?n(s):r();var a=o.dependentDbs,c=this.constructor,l=Object.keys(a).map(h=>{var u=i?h.replace(new RegExp("^"+c.prefix),""):h;return new c(u,this.__opts).destroy()});Promise.all(l).then(r,n)})}).bind(this)}_compact(t,n){var i={return_docs:!1,last_seq:t.last_seq||0,since:t.last_seq||0},r=[],s,o=0;const a=h=>{this.activeTasks.update(s,{completed_items:++o}),r.push(this.compactDocument(h.id,0))},c=h=>{this.activeTasks.remove(s,h),n(h)},l=h=>{var u=h.last_seq;Promise.all(r).then(()=>ha(this,"_local/compaction",d=>!d.last_seq||d.last_seq<u?(d.last_seq=u,d):!1)).then(()=>{this.activeTasks.remove(s),n(null,{ok:!0})}).catch(c)};this.info().then(h=>{s=this.activeTasks.add({name:"database_compaction",total_items:h.update_seq-i.last_seq}),this.changes(i).on("change",a).on("complete",l).on("error",c)})}changes(t,n){return typeof t=="function"&&(n=t,t={}),t=t||{},t.return_docs="return_docs"in t?t.return_docs:!t.live,new Fb(this,t,n)}type(){return typeof this._type=="function"?this._type():this.adapter}}jp.prototype.purge=Wt("_purge",function(e,t,n){if(typeof this._purge>"u")return n(dt(wu,"Purge is not implemented in the "+this.adapter+" adapter."));var i=this;i._getRevisionTree(e,(r,s)=>{if(r)return n(r);if(!s)return n(dt(Xe));let o;try{o=Tb(s,t)}catch(a){return n(a.message||a)}i._purge(e,o,(a,c)=>{if(a)return n(a);Ub(i,e,t).then(function(){return n(null,c)})})})});let Xb=class{constructor(){this.isReady=!1,this.failed=!1,this.queue=[]}execute(){var t;if(this.failed)for(;t=this.queue.shift();)t(this.failed);else for(;t=this.queue.shift();)t()}fail(t){this.failed=t,this.execute()}ready(t){this.isReady=!0,this.db=t,this.execute()}addTask(t){this.queue.push(t),this.failed&&this.execute()}};function Gb(e,t){var n=e.match(/([a-z-]*):\/\/(.*)/);if(n)return{name:/https?/.test(n[1])?n[1]+"://"+n[2]:n[2],adapter:n[1]};var i=ct.adapters,r=ct.preferredAdapters,s=ct.prefix,o=t.adapter;if(!o)for(var a=0;a<r.length;++a){if(o=r[a],o==="idb"&&"websql"in i&&ua()&&localStorage["_pouch__websqldb_"+s+e]){Qe("log",'PouchDB is downgrading "'+e+'" to WebSQL to avoid data loss, because it was already opened with WebSQL.');continue}break}var c=i[o],l=c&&"use_prefix"in c?c.use_prefix:!0;return{name:l?s+e:e,adapter:o}}function Qb(e,t){e.prototype=Object.create(t.prototype,{constructor:{value:e}})}function Fp(e,t){let n=function(...i){if(!(this instanceof n))return new n(...i);t.apply(this,i)};return Qb(n,e),n}function Jb(e){function t(i){e.removeListener("closed",n),i||e.constructor.emit("destroyed",e.name)}function n(){e.removeListener("destroyed",t),e.constructor.emit("unref",e)}e.once("destroyed",t),e.once("closed",n),e.constructor.emit("ref",e)}class Xh extends jp{constructor(t,n){super(),this._setup(t,n)}_setup(t,n){if(super._setup(),n=n||{},t&&typeof t=="object"&&(n=t,t=n.name,delete n.name),n.deterministic_revs===void 0&&(n.deterministic_revs=!0),this.__opts=n=ne(n),this.auto_compaction=n.auto_compaction,this.purged_infos_limit=n.purged_infos_limit||1e3,this.prefix=ct.prefix,typeof t!="string")throw new Error("Missing/invalid DB name");var i=(n.prefix||"")+t,r=Gb(i,n);if(n.name=r.name,n.adapter=n.adapter||r.adapter,this.name=t,this._adapter=n.adapter,ct.emit("debug",["adapter","Picked adapter: ",n.adapter]),!ct.adapters[n.adapter]||!ct.adapters[n.adapter].valid())throw new Error("Invalid Adapter: "+n.adapter);if(n.view_adapter&&(!ct.adapters[n.view_adapter]||!ct.adapters[n.view_adapter].valid()))throw new Error("Invalid View Adapter: "+n.view_adapter);this.taskqueue=new Xb,this.adapter=n.adapter,ct.adapters[n.adapter].call(this,n,s=>{if(s)return this.taskqueue.fail(s);Jb(this),this.emit("created",this),ct.emit("created",this.name),this.taskqueue.ready(this)})}}const ct=Fp(Xh,function(e,t){Xh.prototype._setup.call(this,e,t)});var qp=fetch,Er=Headers;class Zb{constructor(){this.tasks={}}list(){return Object.values(this.tasks)}add(t){const n=bu();return this.tasks[n]={id:n,name:t.name,total_items:t.total_items,created_at:new Date().toJSON()},n}get(t){return this.tasks[t]}remove(t,n){return delete this.tasks[t],this.tasks}update(t,n){const i=this.tasks[t];if(typeof i<"u"){const r={id:i.id,name:i.name,created_at:i.created_at,total_items:n.total_items||i.total_items,completed_items:n.completed_items||i.completed_items,updated_at:new Date().toJSON()};this.tasks[t]=r}return this.tasks}}ct.adapters={};ct.preferredAdapters=[];ct.prefix="_pouch_";var Gh=new jn;function tw(e){Object.keys(jn.prototype).forEach(function(n){typeof jn.prototype[n]=="function"&&(e[n]=Gh[n].bind(Gh))});var t=e._destructionListeners=new Map;e.on("ref",function(i){t.has(i.name)||t.set(i.name,[]),t.get(i.name).push(i)}),e.on("unref",function(i){if(t.has(i.name)){var r=t.get(i.name),s=r.indexOf(i);s<0||(r.splice(s,1),r.length>1?t.set(i.name,r):t.delete(i.name))}}),e.on("destroyed",function(i){if(t.has(i)){var r=t.get(i);t.delete(i),r.forEach(function(s){s.emit("destroyed",!0)})}})}tw(ct);ct.adapter=function(e,t,n){t.valid()&&(ct.adapters[e]=t,n&&ct.preferredAdapters.push(e))};ct.plugin=function(e){if(typeof e=="function")e(ct);else{if(typeof e!="object"||Object.keys(e).length===0)throw new Error('Invalid plugin: got "'+e+'", expected an object or a function');Object.keys(e).forEach(function(t){ct.prototype[t]=e[t]})}return this.__defaults&&(ct.__defaults=Object.assign({},this.__defaults)),ct};ct.defaults=function(e){let t=Fp(ct,function(n,i){i=i||{},n&&typeof n=="object"&&(i=n,n=i.name,delete i.name),i=Object.assign({},t.__defaults,i),ct.call(this,n,i)});return t.preferredAdapters=ct.preferredAdapters.slice(),Object.keys(ct).forEach(function(n){n in t||(t[n]=ct[n])}),t.__defaults=Object.assign({},this.__defaults,e),t};ct.fetch=function(e,t){return qp(e,t)};ct.prototype.activeTasks=ct.activeTasks=new Zb;var ew="9.0.0";function Pu(e,t){for(var n=e,i=0,r=t.length;i<r;i++){var s=t[i];if(n=n[s],!n)break}return n}function nw(e,t){return e<t?-1:e>t?1:0}function Iu(e){for(var t=[],n="",i=0,r=e.length;i<r;i++){var s=e[i];i>0&&e[i-1]==="\\"&&(s==="$"||s===".")?n=n.substring(0,n.length-1)+s:s==="."?(t.push(n),n=""):n+=s}return t.push(n),t}var iw=["$or","$nor","$not"];function Wp(e){return iw.indexOf(e)>-1}function Hp(e){return Object.keys(e)[0]}function rw(e){return e[Hp(e)]}function Ls(e){var t={},n={$or:!0,$nor:!0};return e.forEach(function(i){Object.keys(i).forEach(function(r){var s=i[r];if(typeof s!="object"&&(s={$eq:s}),Wp(r))if(s instanceof Array){if(n[r]){n[r]=!1,t[r]=s;return}var o=[];t[r].forEach(function(c){Object.keys(s).forEach(function(l){var h=s[l],u=Math.max(Object.keys(c).length,Object.keys(h).length),d=Ls([c,h]);Object.keys(d).length<=u||o.push(d)})}),t[r]=o}else t[r]=Ls([s]);else{var a=t[r]=t[r]||{};Object.keys(s).forEach(function(c){var l=s[c];if(c==="$gt"||c==="$gte")return sw(c,l,a);if(c==="$lt"||c==="$lte")return ow(c,l,a);if(c==="$ne")return aw(l,a);if(c==="$eq")return cw(l,a);if(c==="$regex")return lw(l,a);a[c]=l})}})}),t}function sw(e,t,n){typeof n.$eq<"u"||(typeof n.$gte<"u"?e==="$gte"?t>n.$gte&&(n.$gte=t):t>=n.$gte&&(delete n.$gte,n.$gt=t):typeof n.$gt<"u"?e==="$gte"?t>n.$gt&&(delete n.$gt,n.$gte=t):t>n.$gt&&(n.$gt=t):n[e]=t)}function ow(e,t,n){typeof n.$eq<"u"||(typeof n.$lte<"u"?e==="$lte"?t<n.$lte&&(n.$lte=t):t<=n.$lte&&(delete n.$lte,n.$lt=t):typeof n.$lt<"u"?e==="$lte"?t<n.$lt&&(delete n.$lt,n.$lte=t):t<n.$lt&&(n.$lt=t):n[e]=t)}function aw(e,t){"$ne"in t?t.$ne.push(e):t.$ne=[e]}function cw(e,t){delete t.$gt,delete t.$gte,delete t.$lt,delete t.$lte,delete t.$ne,t.$eq=e}function lw(e,t){"$regex"in t?t.$regex.push(e):t.$regex=[e]}function Vp(e){for(var t in e){if(Array.isArray(e))for(var n in e)e[n].$and&&(e[n]=Ls(e[n].$and));var i=e[t];typeof i=="object"&&Vp(i)}return e}function Up(e,t){for(var n in e){n==="$and"&&(t=!0);var i=e[n];typeof i=="object"&&(t=Up(i,t))}return t}function uw(e){var t=ne(e);Up(t,!1)&&(t=Vp(t),"$and"in t&&(t=Ls(t.$and))),["$or","$nor"].forEach(function(o){o in t&&t[o].forEach(function(a){for(var c=Object.keys(a),l=0;l<c.length;l++){var h=c[l],u=a[h];(typeof u!="object"||u===null)&&(a[h]={$eq:u})}})}),"$not"in t&&(t.$not=Ls([t.$not]));for(var n=Object.keys(t),i=0;i<n.length;i++){var r=n[i],s=t[r];(typeof s!="object"||s===null)&&(s={$eq:s}),t[r]=s}return fl(t),t}function fl(e){Object.keys(e).forEach(function(t){var n=e[t];Array.isArray(n)?n.forEach(function(i){i&&typeof i=="object"&&fl(i)}):t==="$ne"?e.$ne=[n]:t==="$regex"?e.$regex=[n]:n&&typeof n=="object"&&fl(n)})}function hw(e,t,n){for(var i="",r=n-e.length;i.length<r;)i+=t;return i}function dw(e,t,n){var i=hw(e,t,n);return i+e}var Kp=-324,pl=3,gl="";function Vt(e,t){if(e===t)return 0;e=Ji(e),t=Ji(t);var n=ml(e),i=ml(t);if(n-i!==0)return n-i;switch(typeof e){case"number":return e-t;case"boolean":return e<t?-1:1;case"string":return _w(e,t)}return Array.isArray(e)?vw(e,t):yw(e,t)}function Ji(e){switch(typeof e){case"undefined":return null;case"number":return e===1/0||e===-1/0||isNaN(e)?null:e;case"object":var t=e;if(Array.isArray(e)){var n=e.length;e=new Array(n);for(var i=0;i<n;i++)e[i]=Ji(t[i])}else{if(e instanceof Date)return e.toJSON();if(e!==null){e={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){var s=t[r];typeof s<"u"&&(e[r]=Ji(s))}}}}return e}function fw(e){if(e!==null)switch(typeof e){case"boolean":return e?1:0;case"number":return bw(e);case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"");case"object":var t=Array.isArray(e),n=t?e:Object.keys(e),i=-1,r=n.length,s="";if(t)for(;++i<r;)s+=nn(n[i]);else for(;++i<r;){var o=n[i];s+=nn(o)+nn(e[o])}return s}return""}function nn(e){var t="\0";return e=Ji(e),ml(e)+gl+fw(e)+t}function pw(e,t){var n=t,i,r=e[t]==="1";if(r)i=0,t++;else{var s=e[t]==="0";t++;var o="",a=e.substring(t,t+pl),c=parseInt(a,10)+Kp;for(s&&(c=-c),t+=pl;;){var l=e[t];if(l==="\0")break;o+=l,t++}o=o.split("."),o.length===1?i=parseInt(o,10):i=parseFloat(o[0]+"."+o[1]),s&&(i=i-10),c!==0&&(i=parseFloat(i+"e"+c))}return{num:i,length:t-n}}function gw(e,t){var n=e.pop();if(t.length){var i=t[t.length-1];n===i.element&&(t.pop(),i=t[t.length-1]);var r=i.element,s=i.index;if(Array.isArray(r))r.push(n);else if(s===e.length-2){var o=e.pop();r[o]=n}else e.push(n)}}function mw(e){for(var t=[],n=[],i=0;;){var r=e[i++];if(r==="\0"){if(t.length===1)return t.pop();gw(t,n);continue}switch(r){case"1":t.push(null);break;case"2":t.push(e[i]==="1"),i++;break;case"3":var s=pw(e,i);t.push(s.num),i+=s.length;break;case"4":for(var o="";;){var a=e[i];if(a==="\0")break;o+=a,i++}o=o.replace(/\u0001\u0001/g,"\0").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(o);break;case"5":var c={element:[],index:t.length};t.push(c.element),n.push(c);break;case"6":var l={element:{},index:t.length};t.push(l.element),n.push(l);break;default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+r)}}}function vw(e,t){for(var n=Math.min(e.length,t.length),i=0;i<n;i++){var r=Vt(e[i],t[i]);if(r!==0)return r}return e.length===t.length?0:e.length>t.length?1:-1}function _w(e,t){return e===t?0:e>t?1:-1}function yw(e,t){for(var n=Object.keys(e),i=Object.keys(t),r=Math.min(n.length,i.length),s=0;s<r;s++){var o=Vt(n[s],i[s]);if(o!==0||(o=Vt(e[n[s]],t[i[s]]),o!==0))return o}return n.length===i.length?0:n.length>i.length?1:-1}function ml(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e);if(~n)return e===null?1:Array.isArray(e)?5:n<3?n+2:n+3;if(Array.isArray(e))return 5}function bw(e){if(e===0)return"1";var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),i=e<0,r=i?"0":"2",s=(i?-n:n)-Kp,o=dw(s.toString(),"0",pl);r+=gl+o;var a=Math.abs(parseFloat(t[0]));i&&(a=10-a);var c=a.toFixed(20);return c=c.replace(/\.?0+$/,""),r+=gl+c,r}function ww(e){function t(n){return e.map(function(i){var r=Hp(i),s=Iu(r),o=Pu(n,s);return o})}return function(n,i){var r=t(n.doc),s=t(i.doc),o=Vt(r,s);return o!==0?o:nw(n.doc._id,i.doc._id)}}function xw(e,t,n){if(e=e.filter(function(o){return Tr(o.doc,t.selector,n)}),t.sort){var i=ww(t.sort);e=e.sort(i),typeof t.sort[0]!="string"&&rw(t.sort[0])==="desc"&&(e=e.reverse())}if("limit"in t||"skip"in t){var r=t.skip||0,s=("limit"in t?t.limit:e.length)+r;e=e.slice(r,s)}return e}function Tr(e,t,n){return n.every(function(i){var r=t[i],s=Iu(i),o=Pu(e,s);return Wp(i)?kw(i,r,e):da(r,e,s,o)})}function da(e,t,n,i){return e?typeof e=="object"?Object.keys(e).every(function(r){var s=e[r];if(r.indexOf("$")===0)return Qh(r,t,s,n,i);var o=Iu(r);if(i===void 0&&typeof s!="object"&&o.length>0)return!1;var a=Pu(i,o);return typeof s=="object"?da(s,t,n,a):Qh("$eq",t,s,o,a)}):e===i:!0}function kw(e,t,n){return e==="$or"?t.some(function(i){return Tr(n,i,Object.keys(i))}):e==="$not"?!Tr(n,t,Object.keys(t)):!t.find(function(i){return Tr(n,i,Object.keys(i))})}function Qh(e,t,n,i,r){if(!Zh[e])throw new Error('unknown operator "'+e+'" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');return Zh[e](t,n,i,r)}function Zr(e){return typeof e<"u"&&e!==null}function xi(e){return typeof e<"u"}function Sw(e,t){if(typeof e!="number"||parseInt(e,10)!==e)return!1;var n=t[0],i=t[1];return e%n===i}function Jh(e,t){return t.some(function(n){return e instanceof Array?e.some(function(i){return Vt(n,i)===0}):Vt(n,e)===0})}function Cw(e,t){return t.every(function(n){return e.some(function(i){return Vt(n,i)===0})})}function $w(e,t){return e.length===t}function Mw(e,t){var n=new RegExp(t);return n.test(e)}function Aw(e,t){switch(t){case"null":return e===null;case"boolean":return typeof e=="boolean";case"number":return typeof e=="number";case"string":return typeof e=="string";case"array":return e instanceof Array;case"object":return{}.toString.call(e)==="[object Object]"}}var Zh={$elemMatch:function(e,t,n,i){return!Array.isArray(i)||i.length===0?!1:typeof i[0]=="object"&&i[0]!==null?i.some(function(r){return Tr(r,t,Object.keys(t))}):i.some(function(r){return da(t,e,n,r)})},$allMatch:function(e,t,n,i){return!Array.isArray(i)||i.length===0?!1:typeof i[0]=="object"&&i[0]!==null?i.every(function(r){return Tr(r,t,Object.keys(t))}):i.every(function(r){return da(t,e,n,r)})},$eq:function(e,t,n,i){return xi(i)&&Vt(i,t)===0},$gte:function(e,t,n,i){return xi(i)&&Vt(i,t)>=0},$gt:function(e,t,n,i){return xi(i)&&Vt(i,t)>0},$lte:function(e,t,n,i){return xi(i)&&Vt(i,t)<=0},$lt:function(e,t,n,i){return xi(i)&&Vt(i,t)<0},$exists:function(e,t,n,i){return t?xi(i):!xi(i)},$mod:function(e,t,n,i){return Zr(i)&&Sw(i,t)},$ne:function(e,t,n,i){return t.every(function(r){return Vt(i,r)!==0})},$in:function(e,t,n,i){return Zr(i)&&Jh(i,t)},$nin:function(e,t,n,i){return Zr(i)&&!Jh(i,t)},$size:function(e,t,n,i){return Zr(i)&&Array.isArray(i)&&$w(i,t)},$all:function(e,t,n,i){return Array.isArray(i)&&Cw(i,t)},$regex:function(e,t,n,i){return Zr(i)&&typeof i=="string"&&t.every(function(r){return Mw(i,r)})},$type:function(e,t,n,i){return Aw(i,t)}};function Ew(e,t){if(typeof t!="object")throw new Error("Selector error: expected a JSON object");t=uw(t);var n={doc:e},i=xw([n],{selector:t},Object.keys(t));return i&&i.length===1}function Tw(e){return Su(`"use strict";
return `+e+";",{})}function Dw(e){var t=["return function(doc) {",'  "use strict";',"  var emitted = false;","  var emit = function (a, b) {","    emitted = true;","  };","  var view = "+e+";","  view(doc);","  if (emitted) {","    return true;","  }","};"].join(`
`);return Su(t,{})}function Ow(e,t){if(e.selector&&e.filter&&e.filter!=="_selector"){var n=typeof e.filter=="string"?e.filter:"function";return t(new Error('selector invalid for filter "'+n+'"'))}t()}function Pw(e){e.view&&!e.filter&&(e.filter="_view"),e.selector&&!e.filter&&(e.filter="_selector"),e.filter&&typeof e.filter=="string"&&(e.filter==="_view"?e.view=Hh(e.view):e.filter=Hh(e.filter))}function Iw(e,t){return t.filter&&typeof t.filter=="string"&&!t.doc_ids&&!vn(e.db)}function Rw(e,t){var n=t.complete;if(t.filter==="_view"){if(!t.view||typeof t.view!="string"){var i=dt(Fa,"`view` filter parameter not found or invalid.");return n(i)}var r=dl(t.view);e.db.get("_design/"+r[0],function(o,a){if(e.isCancelled)return n(null,{status:"cancelled"});if(o)return n(Lr(o));var c=a&&a.views&&a.views[r[1]]&&a.views[r[1]].map;if(!c)return n(dt(Xe,a.views?"missing json key: "+r[1]:"missing json key: views"));t.filter=Dw(c),e.doChanges(t)})}else if(t.selector)t.filter=function(o){return Ew(o,t.selector)},e.doChanges(t);else{var s=dl(t.filter);e.db.get("_design/"+s[0],function(o,a){if(e.isCancelled)return n(null,{status:"cancelled"});if(o)return n(Lr(o));var c=a&&a.filters&&a.filters[s[1]];if(!c)return n(dt(Xe,a&&a.filters?"missing json key: "+s[1]:"missing json key: filters"));t.filter=Tw(c),e.doChanges(t)})}}function Lw(e){e._changesFilterPlugin={validate:Ow,normalize:Pw,shouldFilter:Iw,filter:Rw}}ct.plugin(Lw);ct.version=ew;function Bw(e,t,n){return new Promise(function(i){var r=$u([""]);let s;{const o=n;s=e.objectStore(t).put(r,o)}s.onsuccess=function(){var o=navigator.userAgent.match(/Chrome\/(\d+)/),a=navigator.userAgent.match(/Edge\//);i(a||!o||parseInt(o[1],10)>=43)},s.onerror=e.onabort=function(o){o.preventDefault(),o.stopPropagation(),i(!1)}}).catch(function(){return!1})}function Yp(e){return e.reduce(function(t,n){return t[n]=!0,t},{})}var Nw=Yp(["_id","_rev","_access","_attachments","_deleted","_revisions","_revs_info","_conflicts","_deleted_conflicts","_local_seq","_rev_tree","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats","_removed"]),zw=Yp(["_access","_attachments","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"]);function td(e){if(!/^\d+-/.test(e))return dt(No);var t=e.indexOf("-"),n=e.substring(0,t),i=e.substring(t+1);return{prefix:parseInt(n,10),id:i}}function jw(e,t){for(var n=e.start-e.ids.length+1,i=e.ids,r=[i[0],t,[]],s=1,o=i.length;s<o;s++)r=[i[s],{status:"missing"},[r]];return[{pos:n,ids:r}]}function Xp(e,t,n){n||(n={deterministic_revs:!0});var i,r,s,o={status:"available"};if(e._deleted&&(o.deleted=!0),t)if(e._id||(e._id=qa()),r=Rp(e,n.deterministic_revs),e._rev){if(s=td(e._rev),s.error)return s;e._rev_tree=[{pos:s.prefix,ids:[s.id,{status:"missing"},[[r,o,[]]]]}],i=s.prefix+1}else e._rev_tree=[{pos:1,ids:[r,o,[]]}],i=1;else if(e._revisions&&(e._rev_tree=jw(e._revisions,o),i=e._revisions.start,r=e._revisions.ids[0]),!e._rev_tree){if(s=td(e._rev),s.error)return s;i=s.prefix,r=s.id,e._rev_tree=[{pos:i,ids:[r,o,[]]}]}Tp(e._id),e._rev=i+"-"+r;var a={metadata:{},data:{}};for(var c in e)if(Object.prototype.hasOwnProperty.call(e,c)){var l=c[0]==="_";if(l&&!Nw[c]){var h=dt(Wh,c);throw h.message=Wh.message+": "+c,h}else l&&!zw[c]?a.metadata[c.slice(1)]=e[c]:a.data[c]=e[c]}return a}function Fw(e){try{return Cu(e)}catch{var t=dt(Ep,"Attachment is not a valid base64 string");return{error:t}}}function qw(e,t,n){var i=Fw(e.data);if(i.error)return n(i.error);e.length=i.length,t==="blob"?e.data=Mu(i,e.content_type):t==="base64"?e.data=Qs(i):e.data=i,Tu(i,function(r){e.digest="md5-"+r,n()})}function Ww(e,t,n){Tu(e.data,function(i){e.digest="md5-"+i,e.length=e.data.size||e.data.length||0,t==="binary"?Pp(e.data,function(r){e.data=r,n()}):t==="base64"?Eu(e.data,function(r){e.data=r,n()}):n()})}function Hw(e,t,n){if(e.stub)return n();typeof e.data=="string"?qw(e,t,n):Ww(e,t,n)}function Vw(e,t,n){if(!e.length)return n();var i=0,r;e.forEach(function(o){var a=o.data&&o.data._attachments?Object.keys(o.data._attachments):[],c=0;if(!a.length)return s();function l(u){r=u,c++,c===a.length&&s()}for(var h in o.data._attachments)Object.prototype.hasOwnProperty.call(o.data._attachments,h)&&Hw(o.data._attachments[h],t,l)});function s(){i++,e.length===i&&(r?n(r):n())}}function Uw(e,t,n,i,r,s,o,a){if(Lb(t.rev_tree,n.metadata.rev)&&!a)return i[r]=n,s();var c=t.winningRev||Gi(t),l="deleted"in t?t.deleted:In(t,c),h="deleted"in n.metadata?n.metadata.deleted:In(n.metadata),u=/^1-/.test(n.metadata.rev);if(l&&!h&&a&&u){var d=n.data;d._rev=c,d._id=n.metadata.id,n=Xp(d,a)}var f=Np(t.rev_tree,n.metadata.rev_tree[0],e),v=a&&(l&&h&&f.conflicts!=="new_leaf"||!l&&f.conflicts!=="new_leaf"||l&&!h&&f.conflicts==="new_branch");if(v){var w=dt(Rr);return i[r]=w,s()}var b=n.metadata.rev;n.metadata.rev_tree=f.tree,n.stemmedRevs=f.stemmedRevs||[],t.rev_map&&(n.metadata.rev_map=t.rev_map);var _=Gi(n.metadata),y=In(n.metadata,_),g=l===y?0:l<y?-1:1,p;b===_?p=y:p=In(n.metadata,b),o(n,_,y,p,!0,g,r,s)}function Kw(e){return e.metadata.rev_tree[0].ids[1].status==="missing"}function Yw(e,t,n,i,r,s,o,a,c){e=e||1e3;function l(w,b,_){var y=Gi(w.metadata),g=In(w.metadata,y);if("was_delete"in a&&g)return s[b]=dt(Xe,"deleted"),_();var p=h&&Kw(w);if(p){var m=dt(Rr);return s[b]=m,_()}var x=g?0:1;o(w,y,g,g,!1,x,b,_)}var h=a.new_edits,u=new Map,d=0,f=t.length;function v(){++d===f&&c&&c()}t.forEach(function(w,b){if(w._id&&Vi(w._id)){var _=w._deleted?"_removeLocal":"_putLocal";n[_](w,{ctx:r},function(g,p){s[b]=g||p,v()});return}var y=w.metadata.id;u.has(y)?(f--,u.get(y).push([w,b])):u.set(y,[[w,b]])}),u.forEach(function(w,b){var _=0;function y(){++_<w.length?g():v()}function g(){var p=w[_],m=p[0],x=p[1];if(i.has(b))Uw(e,i.get(b),m,s,x,y,o,h);else{var M=Np([],m.metadata.rev_tree[0],e);m.metadata.rev_tree=M.tree,m.stemmedRevs=M.stemmedRevs||[],l(m,x,y)}}g()})}var Xw=5,Xt="document-store",pe="by-sequence",Ge="attach-store",Fi="attach-seq-store",Me="meta-store",dn="local-store",yc="detect-blob-support";function Gw(e){try{return JSON.parse(e)}catch{return kp.parse(e)}}function Qw(e){try{return JSON.stringify(e)}catch{return kp.stringify(e)}}function mn(e){return function(t){var n="unknown_error";t.target&&t.target.error&&(n=t.target.error.name||t.target.error.message),e(dt(xu,n,t.type))}}function vl(e,t,n){return{data:Qw(e),winningRev:t,deletedOrLocal:n?"1":"0",seq:e.seq,id:e.id}}function qi(e){if(!e)return null;var t=Gw(e.data);return t.winningRev=e.winningRev,t.deleted=e.deletedOrLocal==="1",t.seq=e.seq,t}function fa(e){if(!e)return e;var t=e._doc_id_rev.lastIndexOf(":");return e._id=e._doc_id_rev.substring(0,t-1),e._rev=e._doc_id_rev.substring(t+1),delete e._doc_id_rev,e}function Gp(e,t,n,i){n?i(e?typeof e!="string"?e:Au(e,t):$u([""],{type:t})):e?typeof e!="string"?Op(e,function(r){i(Qs(r))}):i(e):i("")}function Qp(e,t,n,i){var r=Object.keys(e._attachments||{});if(!r.length)return i&&i();var s=0;function o(){++s===r.length&&i&&i()}function a(c,l){var h=c._attachments[l],u=h.digest,d=n.objectStore(Ge).get(u);d.onsuccess=function(f){h.body=f.target.result.body,o()}}r.forEach(function(c){t.attachments&&t.include_docs?a(e,c):(e._attachments[c].stub=!0,o())})}function _l(e,t){return Promise.all(e.map(function(n){if(n.doc&&n.doc._attachments){var i=Object.keys(n.doc._attachments);return Promise.all(i.map(function(r){var s=n.doc._attachments[r];if("body"in s){var o=s.body,a=s.content_type;return new Promise(function(c){Gp(o,a,t,function(l){n.doc._attachments[r]=Object.assign(Gs(s,["digest","content_type"]),{data:l}),c()})})}}))}}))}function Jp(e,t,n){var i=[],r=n.objectStore(pe),s=n.objectStore(Ge),o=n.objectStore(Fi),a=e.length;function c(){a--,a||l()}function l(){i.length&&i.forEach(function(h){var u=o.index("digestSeq").count(IDBKeyRange.bound(h+"::",h+"::￿",!1,!1));u.onsuccess=function(d){var f=d.target.result;f||s.delete(h)}})}e.forEach(function(h){var u=r.index("_doc_id_rev"),d=t+"::"+h;u.getKey(d).onsuccess=function(f){var v=f.target.result;if(typeof v!="number")return c();r.delete(v);var w=o.index("seq").openCursor(IDBKeyRange.only(v));w.onsuccess=function(b){var _=b.target.result;if(_){var y=_.value.digestSeq.split("::")[0];i.push(y),o.delete(_.primaryKey),_.continue()}else c()}}})}function rn(e,t,n){try{return{txn:e.transaction(t,n)}}catch(i){return{error:i}}}var xs=new ab;function Jw(e,t,n,i,r,s){for(var o=t.docs,a,c,l,h,u,d,f,v,w=0,b=o.length;w<b;w++){var _=o[w];_._id&&Vi(_._id)||(_=o[w]=Xp(_,n.new_edits,e),_.error&&!f&&(f=_))}if(f)return s(f);var y=!1,g=0,p=new Array(o.length),m=new Map,x=!1,M=i._meta.blobSupport?"blob":"base64";Vw(o,M,function(A){if(A)return s(A);k()});function k(){var A=[Xt,pe,Ge,dn,Fi,Me],O=rn(r,A,"readwrite");if(O.error)return s(O.error);a=O.txn,a.onabort=mn(s),a.ontimeout=mn(s),a.oncomplete=j,c=a.objectStore(Xt),l=a.objectStore(pe),h=a.objectStore(Ge),u=a.objectStore(Fi),d=a.objectStore(Me),d.get(Me).onsuccess=function(L){v=L.target.result,P()},Q(function(L){if(L)return x=!0,s(L);B()})}function S(){y=!0,P()}function E(){Yw(e.revs_limit,o,i,m,a,p,J,n,S)}function P(){!v||!y||(v.docCount+=g,d.put(v))}function B(){if(!o.length)return;var A=0;function O(){++A===o.length&&E()}function L(N){var F=qi(N.target.result);F&&m.set(F.id,F),O()}for(var V=0,R=o.length;V<R;V++){var D=o[V];if(D._id&&Vi(D._id)){O();continue}var I=c.get(D.metadata.id);I.onsuccess=L}}function j(){x||(xs.notify(i._meta.name),s(null,p))}function H(A,O){var L=h.get(A);L.onsuccess=function(V){if(V.target.result)O();else{var R=dt(pb,"unknown stub attachment with digest "+A);R.status=412,O(R)}}}function Q(A){var O=[];if(o.forEach(function(D){D.data&&D.data._attachments&&Object.keys(D.data._attachments).forEach(function(I){var N=D.data._attachments[I];N.stub&&O.push(N.digest)})}),!O.length)return A();var L=0,V;function R(){++L===O.length&&A(V)}O.forEach(function(D){H(D,function(I){I&&!V&&(V=I),R()})})}function J(A,O,L,V,R,D,I,N){A.metadata.winningRev=O,A.metadata.deleted=L;var F=A.data;F._id=A.metadata.id,F._rev=A.metadata.rev,V&&(F._deleted=!0);var W=F._attachments&&Object.keys(F._attachments).length;if(W)return $(A,O,L,R,I,N);g+=D,P(),U(A,O,L,R,I,N)}function U(A,O,L,V,R,D){var I=A.data,N=A.metadata;I._doc_id_rev=N.id+"::"+N.rev,delete I._id,delete I._rev;function F(rt){var st=A.stemmedRevs||[];V&&i.auto_compaction&&(st=st.concat(Eb(A.metadata))),st&&st.length&&Jp(st,A.metadata.id,a),N.seq=rt.target.result;var gt=vl(N,O,L),Y=c.put(gt);Y.onsuccess=X}function W(rt){rt.preventDefault(),rt.stopPropagation();var st=l.index("_doc_id_rev"),gt=st.getKey(I._doc_id_rev);gt.onsuccess=function(Y){var tt=l.put(I,Y.target.result);tt.onsuccess=F}}function X(){p[R]={ok:!0,id:N.id,rev:N.rev},m.set(A.metadata.id,A.metadata),C(A,N.seq,D)}var et=l.put(I);et.onsuccess=F,et.onerror=W}function $(A,O,L,V,R,D){var I=A.data,N=0,F=Object.keys(I._attachments);function W(){N===F.length&&U(A,O,L,V,R,D)}function X(){N++,W()}F.forEach(function(et){var rt=A.data._attachments[et];if(rt.stub)N++,W();else{var st=rt.data;delete rt.data,rt.revpos=parseInt(O,10);var gt=rt.digest;T(gt,st,X)}})}function C(A,O,L){var V=0,R=Object.keys(A.data._attachments||{});if(!R.length)return L();function D(){++V===R.length&&L()}function I(F){var W=A.data._attachments[F].digest,X=u.put({seq:O,digestSeq:W+"::"+O});X.onsuccess=D,X.onerror=function(et){et.preventDefault(),et.stopPropagation(),D()}}for(var N=0;N<R.length;N++)I(R[N])}function T(A,O,L){var V=h.count(A);V.onsuccess=function(R){var D=R.target.result;if(D)return L();var I={digest:A,body:O},N=h.put(I);N.onsuccess=L}}}function Zp(e,t,n,i,r){i===-1&&(i=1e3);var s=typeof e.getAll=="function"&&typeof e.getAllKeys=="function"&&i>1&&!n,o,a,c;function l(f){a=f.target.result,o&&r(o,a,c)}function h(f){o=f.target.result,a&&r(o,a,c)}function u(){if(!o.length)return r();var f=o[o.length-1],v;if(t&&t.upper)try{v=IDBKeyRange.bound(f,t.upper,!0,t.upperOpen)}catch(w){if(w.name==="DataError"&&w.code===0)return r()}else v=IDBKeyRange.lowerBound(f,!0);t=v,o=null,a=null,e.getAll(t,i).onsuccess=l,e.getAllKeys(t,i).onsuccess=h}function d(f){var v=f.target.result;if(!v)return r();r([v.key],[v.value],v)}s?(c={continue:u},e.getAll(t,i).onsuccess=l,e.getAllKeys(t,i).onsuccess=h):n?e.openCursor(t,"prev").onsuccess=d:e.openCursor(t).onsuccess=d}function Zw(e,t,n){if(typeof e.getAll=="function"){e.getAll(t).onsuccess=n;return}var i=[];function r(s){var o=s.target.result;o?(i.push(o.value),o.continue()):n({target:{result:i}})}e.openCursor(t).onsuccess=r}function t1(e,t,n){var i=new Array(e.length),r=0;e.forEach(function(s,o){t.get(s).onsuccess=function(a){a.target.result?i[o]=a.target.result:i[o]={key:s,error:"not_found"},r++,r===e.length&&n(e,i,{})}})}function e1(e,t,n,i,r){try{if(e&&t)return r?IDBKeyRange.bound(t,e,!n,!1):IDBKeyRange.bound(e,t,!1,!n);if(e)return r?IDBKeyRange.upperBound(e):IDBKeyRange.lowerBound(e);if(t)return r?IDBKeyRange.lowerBound(t,!n):IDBKeyRange.upperBound(t,!n);if(i)return IDBKeyRange.only(i)}catch(s){return{error:s}}return null}function n1(e,t,n){var i="startkey"in e?e.startkey:!1,r="endkey"in e?e.endkey:!1,s="key"in e?e.key:!1,o="keys"in e?e.keys:!1,a=e.skip||0,c=typeof e.limit=="number"?e.limit:-1,l=e.inclusive_end!==!1,h,u;if(!o&&(h=e1(i,r,l,s,e.descending),u=h&&h.error,u&&!(u.name==="DataError"&&u.code===0)))return n(dt(xu,u.name,u.message));var d=[Xt,pe,Me];e.attachments&&d.push(Ge);var f=rn(t,d,"readonly");if(f.error)return n(f.error);var v=f.txn;v.oncomplete=B,v.onabort=mn(n);var w=v.objectStore(Xt),b=v.objectStore(pe),_=v.objectStore(Me),y=b.index("_doc_id_rev"),g=[],p,m;_.get(Me).onsuccess=function(j){p=j.target.result.docCount},e.update_seq&&(b.openKeyCursor(null,"prev").onsuccess=j=>{var H=j.target.result;H&&H.key&&(m=H.key)});function x(j,H,Q){var J=j.id+"::"+Q;y.get(J).onsuccess=function($){if(H.doc=fa($.target.result)||{},e.conflicts){var C=Ou(j);C.length&&(H.doc._conflicts=C)}Qp(H.doc,e,v)}}function M(j,H){var Q={id:H.id,key:H.id,value:{rev:j}},J=H.deleted;J?o&&(g.push(Q),Q.value.deleted=!0,Q.doc=null):a--<=0&&(g.push(Q),e.include_docs&&x(H,Q,j))}function k(j){for(var H=0,Q=j.length;H<Q&&g.length!==c;H++){var J=j[H];if(J.error&&o){g.push(J);continue}var U=qi(J),$=U.winningRev;M($,U)}}function S(j,H,Q){Q&&(k(H),g.length<c&&Q.continue())}function E(j){var H=j.target.result;e.descending&&(H=H.reverse()),k(H)}function P(){var j={total_rows:p,offset:e.skip,rows:g};e.update_seq&&m!==void 0&&(j.update_seq=m),n(null,j)}function B(){e.attachments?_l(g,e.binary).then(P):P()}if(!(u||c===0)){if(o)return t1(o,w,S);if(c===-1)return Zw(w,h,E);Zp(w,h,e.descending,c+a,S)}}function i1(e,t){var n=e.objectStore(Xt).index("deletedOrLocal");n.count(IDBKeyRange.only("0")).onsuccess=function(i){t(i.target.result)}}var yl=!1,bl=[];function r1(e,t,n,i){try{e(t,n)}catch(r){i.emit("error",r)}}function ed(){yl||!bl.length||(yl=!0,bl.shift()())}function s1(e,t,n){bl.push(function(){e(function(s,o){r1(t,s,o,n),yl=!1,wn(function(){ed()})})}),ed()}function o1(e,t,n,i){if(e=ne(e),e.continuous){var r=n+":"+qa();return xs.addListener(n,r,t,e),xs.notify(n),{cancel:function(){xs.removeListener(n,r)}}}var s=e.doc_ids&&new Set(e.doc_ids);e.since=e.since||0;var o=e.since,a="limit"in e?e.limit:-1;a===0&&(a=1);var c=[],l=0,h=ku(e),u=new Map,d,f,v,w;function b(k,S,E){if(!E||!k.length)return;var P=new Array(k.length),B=new Array(k.length);function j(J,U){var $=e.processChange(U,J,e);o=$.seq=J.seq;var C=h($);return typeof C=="object"?Promise.reject(C):C?(l++,e.return_docs&&c.push($),e.attachments&&e.include_docs?new Promise(function(T){Qp(U,e,d,function(){_l([$],e.binary).then(function(){T($)})})}):Promise.resolve($)):Promise.resolve()}function H(){for(var J=[],U=0,$=P.length;U<$&&l!==a;U++){var C=P[U];if(C){var T=B[U];J.push(j(T,C))}}Promise.all(J).then(function(A){for(var O=0,L=A.length;O<L;O++)A[O]&&e.onChange(A[O])}).catch(e.complete),l!==a&&E.continue()}var Q=0;S.forEach(function(J,U){var $=fa(J),C=k[U];y($,C,function(T,A){B[U]=T,P[U]=A,++Q===k.length&&H()})})}function _(k,S,E,P){if(E.seq!==S)return P();if(E.winningRev===k._rev)return P(E,k);var B=k._id+"::"+E.winningRev,j=w.get(B);j.onsuccess=function(H){P(E,fa(H.target.result))}}function y(k,S,E){if(s&&!s.has(k._id))return E();var P=u.get(k._id);if(P)return _(k,S,P,E);v.get(k._id).onsuccess=function(B){P=qi(B.target.result),u.set(k._id,P),_(k,S,P,E)}}function g(){e.complete(null,{results:c,last_seq:o})}function p(){!e.continuous&&e.attachments?_l(c).then(g):g()}var m=[Xt,pe];e.attachments&&m.push(Ge);var x=rn(i,m,"readonly");if(x.error)return e.complete(x.error);d=x.txn,d.onabort=mn(e.complete),d.oncomplete=p,f=d.objectStore(pe),v=d.objectStore(Xt),w=f.index("_doc_id_rev");var M=e.since&&!e.descending?IDBKeyRange.lowerBound(e.since,!0):null;Zp(f,M,e.descending,a,b)}var mr=new Map,bc,wc=new Map;function tg(e,t){var n=this;s1(function(i){a1(n,e,i)},t,n.constructor)}function a1(e,t,n){var i=t.name,r=null,s=null;e._meta=null;function o(b){return function(_,y){_&&_ instanceof Error&&!_.reason&&s&&(_.reason=s),b(_,y)}}function a(b){var _=b.createObjectStore(Xt,{keyPath:"id"});b.createObjectStore(pe,{autoIncrement:!0}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0}),b.createObjectStore(Ge,{keyPath:"digest"}),b.createObjectStore(Me,{keyPath:"id",autoIncrement:!1}),b.createObjectStore(yc),_.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),b.createObjectStore(dn,{keyPath:"_id"});var y=b.createObjectStore(Fi,{autoIncrement:!0});y.createIndex("seq","seq"),y.createIndex("digestSeq","digestSeq",{unique:!0})}function c(b,_){var y=b.objectStore(Xt);y.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),y.openCursor().onsuccess=function(g){var p=g.target.result;if(p){var m=p.value,x=In(m);m.deletedOrLocal=x?"1":"0",y.put(m),p.continue()}else _()}}function l(b){b.createObjectStore(dn,{keyPath:"_id"}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0})}function h(b,_){var y=b.objectStore(dn),g=b.objectStore(Xt),p=b.objectStore(pe),m=g.openCursor();m.onsuccess=function(x){var M=x.target.result;if(M){var k=M.value,S=k.id,E=Vi(S),P=Gi(k);if(E){var B=S+"::"+P,j=S+"::",H=S+"::~",Q=p.index("_doc_id_rev"),J=IDBKeyRange.bound(j,H,!1,!1),U=Q.openCursor(J);U.onsuccess=function($){if(U=$.target.result,!U)g.delete(M.primaryKey),M.continue();else{var C=U.value;C._doc_id_rev===B&&y.put(C),p.delete(U.primaryKey),U.continue()}}}else M.continue()}else _&&_()}}function u(b){var _=b.createObjectStore(Fi,{autoIncrement:!0});_.createIndex("seq","seq"),_.createIndex("digestSeq","digestSeq",{unique:!0})}function d(b,_){var y=b.objectStore(pe),g=b.objectStore(Ge),p=b.objectStore(Fi),m=g.count();m.onsuccess=function(x){var M=x.target.result;if(!M)return _();y.openCursor().onsuccess=function(k){var S=k.target.result;if(!S)return _();for(var E=S.value,P=S.primaryKey,B=Object.keys(E._attachments||{}),j={},H=0;H<B.length;H++){var Q=E._attachments[B[H]];j[Q.digest]=!0}var J=Object.keys(j);for(H=0;H<J.length;H++){var U=J[H];p.put({seq:P,digestSeq:U+"::"+P})}S.continue()}}}function f(b){function _(m){return m.data?qi(m):(m.deleted=m.deletedOrLocal==="1",m)}var y=b.objectStore(pe),g=b.objectStore(Xt),p=g.openCursor();p.onsuccess=function(m){var x=m.target.result;if(!x)return;var M=_(x.value);M.winningRev=M.winningRev||Gi(M);function k(){var E=M.id+"::",P=M.id+"::￿",B=y.index("_doc_id_rev").openCursor(IDBKeyRange.bound(E,P)),j=0;B.onsuccess=function(H){var Q=H.target.result;if(!Q)return M.seq=j,S();var J=Q.primaryKey;J>j&&(j=J),Q.continue()}}function S(){var E=vl(M,M.winningRev,M.deleted),P=g.put(E);P.onsuccess=function(){x.continue()}}if(M.seq)return S();k()}}e._remote=!1,e.type=function(){return"idb"},e._id=$p(function(b){b(null,e._meta.instanceId)}),e._bulkDocs=function(_,y,g){Jw(t,_,y,e,r,o(g))},e._get=function(_,y,g){var p,m,x,M=y.ctx;if(!M){var k=rn(r,[Xt,pe,Ge],"readonly");if(k.error)return g(k.error);M=k.txn}function S(){g(x,{doc:p,metadata:m,ctx:M})}M.objectStore(Xt).get(_).onsuccess=function(E){if(m=qi(E.target.result),!m)return x=dt(Xe,"missing"),S();var P;if(y.rev)P=y.latest?Nb(y.rev,m):y.rev;else{P=m.winningRev;var B=In(m);if(B)return x=dt(Xe,"deleted"),S()}var j=M.objectStore(pe),H=m.id+"::"+P;j.index("_doc_id_rev").get(H).onsuccess=function(Q){if(p=Q.target.result,p&&(p=fa(p)),!p)return x=dt(Xe,"missing"),S();S()}}},e._getAttachment=function(b,_,y,g,p){var m;if(g.ctx)m=g.ctx;else{var x=rn(r,[Xt,pe,Ge],"readonly");if(x.error)return p(x.error);m=x.txn}var M=y.digest,k=y.content_type;m.objectStore(Ge).get(M).onsuccess=function(S){var E=S.target.result.body;Gp(E,k,g.binary,function(P){p(null,P)})}},e._info=function(_){var y,g,p=rn(r,[Me,pe],"readonly");if(p.error)return _(p.error);var m=p.txn;m.objectStore(Me).get(Me).onsuccess=function(x){g=x.target.result.docCount},m.objectStore(pe).openKeyCursor(null,"prev").onsuccess=function(x){var M=x.target.result;y=M?M.key:0},m.oncomplete=function(){_(null,{doc_count:g,update_seq:y,idb_attachment_format:e._meta.blobSupport?"binary":"base64"})}},e._allDocs=function(_,y){n1(_,r,o(y))},e._changes=function(_){return o1(_,e,i,r)},e._close=function(b){r.close(),mr.delete(i),b()},e._getRevisionTree=function(b,_){var y=rn(r,[Xt],"readonly");if(y.error)return _(y.error);var g=y.txn,p=g.objectStore(Xt).get(b);p.onsuccess=function(m){var x=qi(m.target.result);x?_(null,x.rev_tree):_(dt(Xe))}},e._doCompaction=function(b,_,y){var g=[Xt,pe,Ge,Fi],p=rn(r,g,"readwrite");if(p.error)return y(p.error);var m=p.txn,x=m.objectStore(Xt);x.get(b).onsuccess=function(M){var k=qi(M.target.result);Qi(k.rev_tree,function(P,B,j,H,Q){var J=B+"-"+j;_.indexOf(J)!==-1&&(Q.status="missing")}),Jp(_,b,m);var S=k.winningRev,E=k.deleted;m.objectStore(Xt).put(vl(k,S,E))},m.onabort=mn(y),m.oncomplete=function(){y()}},e._getLocal=function(b,_){var y=rn(r,[dn],"readonly");if(y.error)return _(y.error);var g=y.txn,p=g.objectStore(dn).get(b);p.onerror=mn(_),p.onsuccess=function(m){var x=m.target.result;x?(delete x._doc_id_rev,_(null,x)):_(dt(Xe))}},e._putLocal=function(b,_,y){typeof _=="function"&&(y=_,_={}),delete b._revisions;var g=b._rev,p=b._id;g?b._rev="0-"+(parseInt(g.split("-")[1],10)+1):b._rev="0-1";var m=_.ctx,x;if(!m){var M=rn(r,[dn],"readwrite");if(M.error)return y(M.error);m=M.txn,m.onerror=mn(y),m.oncomplete=function(){x&&y(null,x)}}var k=m.objectStore(dn),S;g?(S=k.get(p),S.onsuccess=function(E){var P=E.target.result;if(!P||P._rev!==g)y(dt(Rr));else{var B=k.put(b);B.onsuccess=function(){x={ok:!0,id:b._id,rev:b._rev},_.ctx&&y(null,x)}}}):(S=k.add(b),S.onerror=function(E){y(dt(Rr)),E.preventDefault(),E.stopPropagation()},S.onsuccess=function(){x={ok:!0,id:b._id,rev:b._rev},_.ctx&&y(null,x)})},e._removeLocal=function(b,_,y){typeof _=="function"&&(y=_,_={});var g=_.ctx;if(!g){var p=rn(r,[dn],"readwrite");if(p.error)return y(p.error);g=p.txn,g.oncomplete=function(){m&&y(null,m)}}var m,x=b._id,M=g.objectStore(dn),k=M.get(x);k.onerror=mn(y),k.onsuccess=function(S){var E=S.target.result;!E||E._rev!==b._rev?y(dt(Xe)):(M.delete(x),m={ok:!0,id:x,rev:"0-0"},_.ctx&&y(null,m))}},e._destroy=function(b,_){xs.removeAllListeners(i);var y=wc.get(i);y&&y.result&&(y.result.close(),mr.delete(i));var g=indexedDB.deleteDatabase(i);g.onsuccess=function(){wc.delete(i),ua()&&i in localStorage&&delete localStorage[i],_(null,{ok:!0})},g.onerror=mn(_)};var v=mr.get(i);if(v)return r=v.idb,e._meta=v.global,wn(function(){n(null,e)});var w=indexedDB.open(i,Xw);wc.set(i,w),w.onupgradeneeded=function(b){var _=b.target.result;if(b.oldVersion<1)return a(_);var y=b.currentTarget.transaction;b.oldVersion<3&&l(_),b.oldVersion<4&&u(_);var g=[c,h,d,f],p=b.oldVersion;function m(){var x=g[p-1];p++,x&&x(y,m)}m()},w.onsuccess=function(b){r=b.target.result,r.onversionchange=function(){r.close(),mr.delete(i)},r.onabort=function(S){Qe("error","Database has a global failure",S.target.error),s=S.target.error,r.close(),mr.delete(i)};var _=r.transaction([Me,yc,Xt],"readwrite"),y=!1,g,p,m,x;function M(){typeof m>"u"||!y||(e._meta={name:i,instanceId:x,blobSupport:m},mr.set(i,{idb:r,global:e._meta}),n(null,e))}function k(){if(!(typeof p>"u"||typeof g>"u")){var S=i+"_id";S in g?x=g[S]:g[S]=x=qa(),g.docCount=p,_.objectStore(Me).put(g)}}_.objectStore(Me).get(Me).onsuccess=function(S){g=S.target.result||{id:Me},k()},i1(_,function(S){p=S,k()}),bc||(bc=Bw(_,yc,"key")),bc.then(function(S){m=S,M()}),_.oncomplete=function(){y=!0,M()},_.onabort=mn(n)},w.onerror=function(b){var _=b.target.error&&b.target.error.message;_?_.indexOf("stored database is a higher version")!==-1&&(_=new Error('This DB was created with the newer "indexeddb" adapter, but you are trying to open it with the older "idb" adapter')):_="Failed to open indexedDB, are you in private browsing mode?",Qe("error",_),n(dt(xu,_))}}tg.valid=function(){try{return typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}};function c1(e){e.adapter("idb",tg,!0)}function l1(e,t){return new Promise(function(n,i){var r=0,s=0,o=0,a=e.length,c;function l(){r++,e[s++]().then(u,d)}function h(){++o===a?c?i(c):n():f()}function u(){r--,h()}function d(v){r--,c=c||v,h()}function f(){for(;r<t&&s<a;)l()}f()})}const u1=25,h1=50,mo=5e3,d1=1e4,xc={};function kc(e){const t=e.doc||e.ok,n=t&&t._attachments;n&&Object.keys(n).forEach(function(i){const r=n[i];r.data=Au(r.data,r.content_type)})}function ki(e){return/^_design/.test(e)?"_design/"+encodeURIComponent(e.slice(8)):e.startsWith("_local/")?"_local/"+encodeURIComponent(e.slice(7)):encodeURIComponent(e)}function nd(e){return!e._attachments||!Object.keys(e._attachments)?Promise.resolve():Promise.all(Object.keys(e._attachments).map(function(t){const n=e._attachments[t];if(n.data&&typeof n.data!="string")return new Promise(function(i){Eu(n.data,i)}).then(function(i){n.data=i})}))}function f1(e){if(!e.prefix)return!1;const t=Dp(e.prefix).protocol;return t==="http"||t==="https"}function p1(e,t){if(f1(t)){const r=t.name.substr(t.prefix.length);e=t.prefix.replace(/\/?$/,"/")+encodeURIComponent(r)}const n=Dp(e);(n.user||n.password)&&(n.auth={username:n.user,password:n.password});const i=n.path.replace(/(^\/|\/$)/g,"").split("/");return n.db=i.pop(),n.db.indexOf("%")===-1&&(n.db=encodeURIComponent(n.db)),n.path=i.join("/"),n}function Zt(e,t){return zo(e,e.db+"/"+t)}function zo(e,t){const n=e.path?"/":"";return e.protocol+"://"+e.host+(e.port?":"+e.port:"")+"/"+e.path+n+t}function vo(e){const t=Object.keys(e);return t.length===0?"":"?"+t.map(n=>n+"="+encodeURIComponent(e[n])).join("&")}function g1(e){const t=typeof navigator<"u"&&navigator.userAgent?navigator.userAgent.toLowerCase():"",n=t.indexOf("msie")!==-1,i=t.indexOf("trident")!==-1,r=t.indexOf("edge")!==-1,s=!("method"in e)||e.method==="GET";return(n||i||r)&&s}function wl(e,t){const n=this,i=p1(e.name,e),r=Zt(i,"");e=ne(e);const s=async function(u,d){if(d=d||{},d.headers=d.headers||new Er,d.credentials="include",e.auth||i.auth){const w=e.auth||i.auth,b=w.username+":"+w.password,_=Qs(unescape(encodeURIComponent(b)));d.headers.set("Authorization","Basic "+_)}const f=e.headers||{};return Object.keys(f).forEach(function(w){d.headers.append(w,f[w])}),g1(d)&&(u+=(u.indexOf("?")===-1?"?":"&")+"_nonce="+Date.now()),await(e.fetch||qp)(u,d)};function o(u,d){return Wt(u,function(...f){l().then(function(){return d.apply(this,f)}).catch(function(v){f.pop()(v)})}).bind(n)}async function a(u,d){const f={};d=d||{},d.headers=d.headers||new Er,d.headers.get("Content-Type")||d.headers.set("Content-Type","application/json"),d.headers.get("Accept")||d.headers.set("Accept","application/json");const v=await s(u,d);f.ok=v.ok,f.status=v.status;const w=await v.json();if(f.data=w,!f.ok)throw f.data.status=f.status,Lr(f.data);return Array.isArray(f.data)&&(f.data=f.data.map(function(b){return b.error||b.missing?Lr(b):b})),f}let c;async function l(){return e.skip_setup?Promise.resolve():c||(c=a(r).catch(function(u){return u&&u.status&&u.status===404?(hl(404,"PouchDB is just detecting if the remote exists."),a(r,{method:"PUT"})):Promise.reject(u)}).catch(function(u){return u&&u.status&&u.status===412?!0:Promise.reject(u)}),c.catch(function(){c=null}),c)}wn(function(){t(null,n)}),n._remote=!0,n.type=function(){return"http"},n.id=o("id",async function(u){let d;try{d=await(await s(zo(i,""))).json()}catch{d={}}const f=d&&d.uuid?d.uuid+i.db:Zt(i,"");u(null,f)}),n.compact=o("compact",async function(u,d){typeof u=="function"&&(d=u,u={}),u=ne(u),await a(Zt(i,"_compact"),{method:"POST"});function f(){n.info(function(v,w){w&&!w.compact_running?d(null,{ok:!0}):setTimeout(f,u.interval||200)})}f()}),n.bulkGet=Wt("bulkGet",function(u,d){const f=this;async function v(y){const g={};u.revs&&(g.revs=!0),u.attachments&&(g.attachments=!0),u.latest&&(g.latest=!0);try{const p=await a(Zt(i,"_bulk_get"+vo(g)),{method:"POST",body:JSON.stringify({docs:u.docs})});u.attachments&&u.binary&&p.data.results.forEach(function(m){m.docs.forEach(kc)}),y(null,p.data)}catch(p){y(p)}}function w(){const y=h1,g=Math.ceil(u.docs.length/y);let p=0;const m=new Array(g);function x(M){return function(k,S){m[M]=S.results,++p===g&&d(null,{results:m.flat()})}}for(let M=0;M<g;M++){const k=Gs(u,["revs","attachments","binary","latest"]);k.docs=u.docs.slice(M*y,Math.min(u.docs.length,(M+1)*y)),Mp(f,k,x(M))}}const b=zo(i,""),_=xc[b];typeof _!="boolean"?v(function(y,g){y?(xc[b]=!1,hl(y.status,"PouchDB is just detecting if the remote supports the _bulk_get API."),w()):(xc[b]=!0,d(null,g))}):_?v(d):w()}),n._info=async function(u){try{await l();const f=await(await s(Zt(i,""))).json();f.host=Zt(i,""),u(null,f)}catch(d){u(d)}},n.fetch=async function(u,d){await l();const f=u.substring(0,1)==="/"?zo(i,u.substring(1)):Zt(i,u);return s(f,d)},n.get=o("get",async function(u,d,f){typeof d=="function"&&(f=d,d={}),d=ne(d);const v={};d.revs&&(v.revs=!0),d.revs_info&&(v.revs_info=!0),d.latest&&(v.latest=!0),d.open_revs&&(d.open_revs!=="all"&&(d.open_revs=JSON.stringify(d.open_revs)),v.open_revs=d.open_revs),d.rev&&(v.rev=d.rev),d.conflicts&&(v.conflicts=d.conflicts),d.update_seq&&(v.update_seq=d.update_seq),u=ki(u);function w(y){const g=y._attachments,p=g&&Object.keys(g);if(!g||!p.length)return;async function m(M){const k=g[M],S=ki(y._id)+"/"+h(M)+"?rev="+y._rev,E=await s(Zt(i,S));let P;"buffer"in E?P=await E.buffer():P=await E.blob();let B;if(d.binary){const j=Object.getOwnPropertyDescriptor(P.__proto__,"type");(!j||j.set)&&(P.type=k.content_type),B=P}else B=await new Promise(function(j){Eu(P,j)});delete k.stub,delete k.length,k.data=B}const x=p.map(function(M){return function(){return m(M)}});return l1(x,5)}function b(y){return Array.isArray(y)?Promise.all(y.map(function(g){if(g.ok)return w(g.ok)})):w(y)}const _=Zt(i,u+vo(v));try{const y=await a(_);d.attachments&&await b(y.data),f(null,y.data)}catch(y){y.docId=u,f(y)}}),n.remove=o("remove",async function(u,d,f,v){let w;typeof d=="string"?(w={_id:u,_rev:d},typeof f=="function"&&(v=f,f={})):(w=u,typeof d=="function"?(v=d,f={}):(v=f,f=d));const b=w._rev||f.rev,_=Zt(i,ki(w._id))+"?rev="+b;try{const y=await a(_,{method:"DELETE"});v(null,y.data)}catch(y){v(y)}});function h(u){return u.split("/").map(encodeURIComponent).join("/")}n.getAttachment=o("getAttachment",async function(u,d,f,v){typeof f=="function"&&(v=f,f={});const w=f.rev?"?rev="+f.rev:"",b=Zt(i,ki(u))+"/"+h(d)+w;let _;try{const y=await s(b,{method:"GET"});if(!y.ok)throw y;_=y.headers.get("content-type");let g;if(typeof process<"u"&&!process.browser&&typeof y.buffer=="function"?g=await y.buffer():g=await y.blob(),typeof process<"u"&&!process.browser){const p=Object.getOwnPropertyDescriptor(g.__proto__,"type");(!p||p.set)&&(g.type=_)}v(null,g)}catch(y){v(y)}}),n.removeAttachment=o("removeAttachment",async function(u,d,f,v){const w=Zt(i,ki(u)+"/"+h(d))+"?rev="+f;try{const b=await a(w,{method:"DELETE"});v(null,b.data)}catch(b){v(b)}}),n.putAttachment=o("putAttachment",async function(u,d,f,v,w,b){typeof w=="function"&&(b=w,w=v,v=f,f=null);const _=ki(u)+"/"+h(d);let y=Zt(i,_);if(f&&(y+="?rev="+f),typeof v=="string"){let g;try{g=Cu(v)}catch{return b(dt(Ep,"Attachment is not a valid base64 string"))}v=g?Mu(g,w):""}try{const g=await a(y,{headers:new Er({"Content-Type":w}),method:"PUT",body:v});b(null,g.data)}catch(g){b(g)}}),n._bulkDocs=async function(u,d,f){u.new_edits=d.new_edits;try{await l(),await Promise.all(u.docs.map(nd));const v=await a(Zt(i,"_bulk_docs"),{method:"POST",body:JSON.stringify(u)});f(null,v.data)}catch(v){f(v)}},n._put=async function(u,d,f){try{await l(),await nd(u);const v=await a(Zt(i,ki(u._id)),{method:"PUT",body:JSON.stringify(u)});f(null,v.data)}catch(v){v.docId=u&&u._id,f(v)}},n.allDocs=o("allDocs",async function(u,d){typeof u=="function"&&(d=u,u={}),u=ne(u);const f={};let v,w="GET";u.conflicts&&(f.conflicts=!0),u.update_seq&&(f.update_seq=!0),u.descending&&(f.descending=!0),u.include_docs&&(f.include_docs=!0),u.attachments&&(f.attachments=!0),u.key&&(f.key=JSON.stringify(u.key)),u.start_key&&(u.startkey=u.start_key),u.startkey&&(f.startkey=JSON.stringify(u.startkey)),u.end_key&&(u.endkey=u.end_key),u.endkey&&(f.endkey=JSON.stringify(u.endkey)),typeof u.inclusive_end<"u"&&(f.inclusive_end=!!u.inclusive_end),typeof u.limit<"u"&&(f.limit=u.limit),typeof u.skip<"u"&&(f.skip=u.skip);const b=vo(f);typeof u.keys<"u"&&(w="POST",v={keys:u.keys});try{const _=await a(Zt(i,"_all_docs"+b),{method:w,body:JSON.stringify(v)});u.include_docs&&u.attachments&&u.binary&&_.data.rows.forEach(kc),d(null,_.data)}catch(_){d(_)}}),n._changes=function(u){const d="batch_size"in u?u.batch_size:u1;u=ne(u),u.continuous&&!("heartbeat"in u)&&(u.heartbeat=d1);let f="timeout"in u?u.timeout:30*1e3;"timeout"in u&&u.timeout&&f-u.timeout<mo&&(f=u.timeout+mo),"heartbeat"in u&&u.heartbeat&&f-u.heartbeat<mo&&(f=u.heartbeat+mo);const v={};"timeout"in u&&u.timeout&&(v.timeout=u.timeout);const w=typeof u.limit<"u"?u.limit:!1;let b=w;if(u.style&&(v.style=u.style),(u.include_docs||u.filter&&typeof u.filter=="function")&&(v.include_docs=!0),u.attachments&&(v.attachments=!0),u.continuous&&(v.feed="longpoll"),u.seq_interval&&(v.seq_interval=u.seq_interval),u.conflicts&&(v.conflicts=!0),u.descending&&(v.descending=!0),u.update_seq&&(v.update_seq=!0),"heartbeat"in u&&u.heartbeat&&(v.heartbeat=u.heartbeat),u.filter&&typeof u.filter=="string"&&(v.filter=u.filter),u.view&&typeof u.view=="string"&&(v.filter="_view",v.view=u.view),u.query_params&&typeof u.query_params=="object")for(const k in u.query_params)Object.prototype.hasOwnProperty.call(u.query_params,k)&&(v[k]=u.query_params[k]);let _="GET",y;u.doc_ids?(v.filter="_doc_ids",_="POST",y={doc_ids:u.doc_ids}):u.selector&&(v.filter="_selector",_="POST",y={selector:u.selector});const g=new AbortController;let p;const m=async function(k,S){if(u.aborted)return;v.since=k,typeof v.since=="object"&&(v.since=JSON.stringify(v.since)),u.descending?w&&(v.limit=b):v.limit=!w||b>d?d:b;const E=Zt(i,"_changes"+vo(v)),P={signal:g.signal,method:_,body:JSON.stringify(y)};if(p=k,!u.aborted)try{await l();const B=await a(E,P);S(null,B.data)}catch(B){S(B)}},x={results:[]},M=function(k,S){if(u.aborted)return;let E=0;if(S&&S.results){E=S.results.length,x.last_seq=S.last_seq;let B=null,j=null;typeof S.pending=="number"&&(B=S.pending),(typeof x.last_seq=="string"||typeof x.last_seq=="number")&&(j=x.last_seq),u.query_params,S.results=S.results.filter(function(H){b--;const Q=ku(u)(H);return Q&&(u.include_docs&&u.attachments&&u.binary&&kc(H),u.return_docs&&x.results.push(H),u.onChange(H,B,j)),Q})}else if(k){u.aborted=!0,u.complete(k);return}S&&S.last_seq&&(p=S.last_seq);const P=w&&b<=0||S&&E<d||u.descending;u.continuous&&!(w&&b<=0)||!P?wn(function(){m(p,M)}):u.complete(null,x)};return m(u.since||0,M),{cancel:function(){u.aborted=!0,g.abort()}}},n.revsDiff=o("revsDiff",async function(u,d,f){typeof d=="function"&&(f=d,d={});try{const v=await a(Zt(i,"_revs_diff"),{method:"POST",body:JSON.stringify(u)});f(null,v.data)}catch(v){f(v)}}),n._close=function(u){u()},n._destroy=async function(u,d){try{const f=await a(Zt(i,""),{method:"DELETE"});d(null,f)}catch(f){f.status===404?d(null,{ok:!0}):d(f)}}}wl.valid=function(){return!0};function m1(e){e.adapter("http",wl,!1),e.adapter("https",wl,!1)}let ts=class eg extends Error{constructor(t){super(),this.status=400,this.name="query_parse_error",this.message=t,this.error=!0;try{Error.captureStackTrace(this,eg)}catch{}}},ng=class ig extends Error{constructor(t){super(),this.status=404,this.name="not_found",this.message=t,this.error=!0;try{Error.captureStackTrace(this,ig)}catch{}}},rg=class sg extends Error{constructor(t){super(),this.status=500,this.name="invalid_value",this.message=t,this.error=!0;try{Error.captureStackTrace(this,sg)}catch{}}};function og(e,t){return t&&e.then(function(n){wn(function(){t(null,n)})},function(n){wn(function(){t(n)})}),e}function v1(e){return function(...t){var n=t.pop(),i=e.apply(this,t);return typeof n=="function"&&og(i,n),i}}function _1(e,t){return e.then(function(n){return t().then(function(){return n})},function(n){return t().then(function(){throw n})})}function Sc(e,t){return function(){var n=arguments,i=this;return e.add(function(){return t.apply(i,n)})}}function id(e){var t=new Set(e),n=new Array(t.size),i=-1;return t.forEach(function(r){n[++i]=r}),n}function Cc(e){var t=new Array(e.size),n=-1;return e.forEach(function(i,r){t[++n]=r}),t}function rd(e){var t="builtin "+e+" function requires map values to be numbers or number arrays";return new rg(t)}function xl(e){for(var t=0,n=0,i=e.length;n<i;n++){var r=e[n];if(typeof r!="number")if(Array.isArray(r)){t=typeof t=="number"?[t]:t;for(var s=0,o=r.length;s<o;s++){var a=r[s];if(typeof a!="number")throw rd("_sum");typeof t[s]>"u"?t.push(a):t[s]+=a}}else throw rd("_sum");else typeof t=="number"?t+=r:t[0]+=r}return t}var y1=Qe.bind(null,"log"),b1=Array.isArray,w1=JSON.parse;function ag(e,t){return Su("return ("+e.replace(/;\s*$/,"")+");",{emit:t,sum:xl,log:y1,isArray:b1,toJSON:w1})}let kl=class{constructor(){this.promise=Promise.resolve()}add(t){return this.promise=this.promise.catch(()=>{}).then(()=>t()),this.promise}finish(){return this.promise}};function sd(e){if(!e)return"undefined";switch(typeof e){case"function":return e.toString();case"string":return e.toString();default:return JSON.stringify(e)}}function x1(e,t){return sd(e)+sd(t)+"undefined"}async function od(e,t,n,i,r,s){const o=x1(n,i);let a;if(!r&&(a=e._cachedViews=e._cachedViews||{},a[o]))return a[o];const c=e.info().then(async function(l){const h=l.db_name+"-mrview-"+(r?"temp":Ip(o));function u(b){b.views=b.views||{};let _=t;_.indexOf("/")===-1&&(_=t+"/"+t);const y=b.views[_]=b.views[_]||{};if(!y[h])return y[h]=!0,b}await ha(e,"_local/"+s,u);const f=(await e.registerDependentDatabase(h)).db;f.auto_compaction=!0;const v={name:h,db:f,sourceDB:e,adapter:e.adapter,mapFun:n,reduceFun:i};let w;try{w=await v.db.get("_local/lastSeq")}catch(b){if(b.status!==404)throw b}return v.seq=w?w.seq:0,a&&v.db.once("destroyed",function(){delete a[o]}),v});return a&&(a[o]=c),c}const ad={},cd=new kl,k1=50;function $c(e){return e.indexOf("/")===-1?[e,e]:e.split("/")}function S1(e){return e.length===1&&/^1-/.test(e[0].rev)}function ld(e,t,n){try{e.emit("error",t)}catch{Qe("error",`The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`),Qe("error",t,n)}}function C1(e,t,n,i){function r($,C,T){try{C(T)}catch(A){ld($,A,{fun:C,doc:T})}}function s($,C,T,A,O){try{return{output:C(T,A,O)}}catch(L){return ld($,L,{fun:C,keys:T,values:A,rereduce:O}),{error:L}}}function o($,C){const T=Vt($.key,C.key);return T!==0?T:Vt($.value,C.value)}function a($,C,T){return T=T||0,typeof C=="number"?$.slice(T,C+T):T>0?$.slice(T):$}function c($){const C=$.value;return C&&typeof C=="object"&&C._id||$.id}function l($){for(const C of $.rows){const T=C.doc&&C.doc._attachments;if(T)for(const A of Object.keys(T)){const O=T[A];T[A].data=Au(O.data,O.content_type)}}}function h($){return function(C){return $.include_docs&&$.attachments&&$.binary&&l(C),C}}function u($,C,T,A){let O=C[$];typeof O<"u"&&(A&&(O=encodeURIComponent(JSON.stringify(O))),T.push($+"="+O))}function d($){if(typeof $<"u"){const C=Number($);return!isNaN(C)&&C===parseInt($,10)?C:$}}function f($){return $.group_level=d($.group_level),$.limit=d($.limit),$.skip=d($.skip),$}function v($){if($){if(typeof $!="number")return new ts(`Invalid value for integer: "${$}"`);if($<0)return new ts(`Invalid value for positive integer: "${$}"`)}}function w($,C){const T=$.descending?"endkey":"startkey",A=$.descending?"startkey":"endkey";if(typeof $[T]<"u"&&typeof $[A]<"u"&&Vt($[T],$[A])>0)throw new ts("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");if(C.reduce&&$.reduce!==!1){if($.include_docs)throw new ts("{include_docs:true} is invalid for reduce");if($.keys&&$.keys.length>1&&!$.group&&!$.group_level)throw new ts("Multi-key fetches for reduce views must use {group: true}")}for(const O of["group_level","limit","skip"]){const L=v($[O]);if(L)throw L}}async function b($,C,T){let A=[],O,L="GET",V;if(u("reduce",T,A),u("include_docs",T,A),u("attachments",T,A),u("limit",T,A),u("descending",T,A),u("group",T,A),u("group_level",T,A),u("skip",T,A),u("stale",T,A),u("conflicts",T,A),u("startkey",T,A,!0),u("start_key",T,A,!0),u("endkey",T,A,!0),u("end_key",T,A,!0),u("inclusive_end",T,A),u("key",T,A,!0),u("update_seq",T,A),A=A.join("&"),A=A===""?"":"?"+A,typeof T.keys<"u"){const N=`keys=${encodeURIComponent(JSON.stringify(T.keys))}`;N.length+A.length+1<=2e3?A+=(A[0]==="?"?"&":"?")+N:(L="POST",typeof C=="string"?O={keys:T.keys}:C.keys=T.keys)}if(typeof C=="string"){const I=$c(C),N=await $.fetch("_design/"+I[0]+"/_view/"+I[1]+A,{headers:new Er({"Content-Type":"application/json"}),method:L,body:JSON.stringify(O)});V=N.ok;const F=await N.json();if(!V)throw F.status=N.status,Lr(F);for(const W of F.rows)if(W.value&&W.value.error&&W.value.error==="builtin_reduce_error")throw new Error(W.reason);return new Promise(function(W){W(F)}).then(h(T))}O=O||{};for(const I of Object.keys(C))Array.isArray(C[I])?O[I]=C[I]:O[I]=C[I].toString();const R=await $.fetch("_temp_view"+A,{headers:new Er({"Content-Type":"application/json"}),method:"POST",body:JSON.stringify(O)});V=R.ok;const D=await R.json();if(!V)throw D.status=R.status,Lr(D);return new Promise(function(I){I(D)}).then(h(T))}function _($,C,T){return new Promise(function(A,O){$._query(C,T,function(L,V){if(L)return O(L);A(V)})})}function y($){return new Promise(function(C,T){$._viewCleanup(function(A,O){if(A)return T(A);C(O)})})}function g($){return function(C){if(C.status===404)return $;throw C}}async function p($,C,T){const A="_local/doc_"+$,O={_id:A,keys:[]},L=T.get($),V=L[0],R=L[1];function D(){return S1(R)?Promise.resolve(O):C.db.get(A).catch(g(O))}function I(X){return X.keys.length?C.db.allDocs({keys:X.keys,include_docs:!0}):Promise.resolve({rows:[]})}function N(X,et){const rt=[],st=new Set;for(const Y of et.rows){const tt=Y.doc;if(tt&&(rt.push(tt),st.add(tt._id),tt._deleted=!V.has(tt._id),!tt._deleted)){const K=V.get(tt._id);"value"in K&&(tt.value=K.value)}}const gt=Cc(V);for(const Y of gt)if(!st.has(Y)){const tt={_id:Y},K=V.get(Y);"value"in K&&(tt.value=K.value),rt.push(tt)}return X.keys=id(gt.concat(X.keys)),rt.push(X),rt}const F=await D(),W=await I(F);return N(F,W)}function m($){return $.sourceDB.get("_local/purges").then(function(C){const T=C.purgeSeq;return $.db.get("_local/purgeSeq").then(function(A){return A._rev}).catch(g(void 0)).then(function(A){return $.db.put({_id:"_local/purgeSeq",_rev:A,purgeSeq:T})})}).catch(function(C){if(C.status!==404)throw C})}function x($,C,T){var A="_local/lastSeq";return $.db.get(A).catch(g({_id:A,seq:0})).then(function(O){var L=Cc(C);return Promise.all(L.map(function(V){return p(V,$,C)})).then(function(V){var R=V.flat();return O.seq=T,R.push(O),$.db.bulkDocs({docs:R})}).then(()=>m($))})}function M($){const C=typeof $=="string"?$:$.name;let T=ad[C];return T||(T=ad[C]=new kl),T}async function k($,C){return Sc(M($),function(){return S($,C)})()}async function S($,C){let T,A,O;function L(Y,tt){const K={id:A._id,key:Ji(Y)};typeof tt<"u"&&tt!==null&&(K.value=Ji(tt)),T.push(K)}const V=t($.mapFun,L);let R=$.seq||0;function D(){return $.sourceDB.info().then(function(Y){O=$.sourceDB.activeTasks.add({name:"view_indexing",total_items:Y.update_seq-R})})}function I(Y,tt){return function(){return x($,Y,tt)}}let N=0;const F={view:$.name,indexed_docs:N};$.sourceDB.emit("indexing",F);const W=new kl;async function X(){const Y=await $.sourceDB.changes({return_docs:!0,conflicts:!0,include_docs:!0,style:"all_docs",since:R,limit:C.changes_batch_size}),tt=await et();return rt(Y,tt)}function et(){return $.db.get("_local/purgeSeq").then(function(Y){return Y.purgeSeq}).catch(g(-1)).then(function(Y){return $.sourceDB.get("_local/purges").then(function(tt){const K=tt.purges.filter(function(wt,ut){return ut>Y}).map(wt=>wt.docId),ot=K.filter(function(wt,ut){return K.indexOf(wt)===ut});return Promise.all(ot.map(function(wt){return $.sourceDB.get(wt).then(function(ut){return{docId:wt,doc:ut}}).catch(g({docId:wt}))}))}).catch(g([]))})}function rt(Y,tt){const K=Y.results;if(!K.length&&!tt.length)return;for(const ut of tt)if(K.findIndex(function(le){return le.id===ut.docId})<0){const le={_id:ut.docId,doc:{_id:ut.docId,_deleted:1},changes:[]};ut.doc&&(le.doc=ut.doc,le.changes.push({rev:ut.doc._rev})),K.push(le)}const ot=st(K);W.add(I(ot,R)),N=N+K.length;const wt={view:$.name,last_seq:Y.last_seq,results_count:K.length,indexed_docs:N};if($.sourceDB.emit("indexing",wt),$.sourceDB.activeTasks.update(O,{completed_items:N}),!(K.length<C.changes_batch_size))return X()}function st(Y){const tt=new Map;for(const K of Y){if(K.doc._id[0]!=="_"){T=[],A=K.doc,A._deleted||r($.sourceDB,V,A),T.sort(o);const ot=gt(T);tt.set(K.doc._id,[ot,K.changes])}R=K.seq}return tt}function gt(Y){const tt=new Map;let K;for(let ot=0,wt=Y.length;ot<wt;ot++){const ut=Y[ot],se=[ut.key,ut.id];ot>0&&Vt(ut.key,K)===0&&se.push(ot),tt.set(nn(se),ut),K=ut.key}return tt}try{await D(),await X(),await W.finish(),$.seq=R,$.sourceDB.activeTasks.remove(O)}catch(Y){$.sourceDB.activeTasks.remove(O,Y)}}function E($,C,T){T.group_level===0&&delete T.group_level;const A=T.group||T.group_level,O=n($.reduceFun),L=[],V=isNaN(T.group_level)?Number.POSITIVE_INFINITY:T.group_level;for(const R of C){const D=L[L.length-1];let I=A?R.key:null;if(A&&Array.isArray(I)&&(I=I.slice(0,V)),D&&Vt(D.groupKey,I)===0){D.keys.push([R.key,R.id]),D.values.push(R.value);continue}L.push({keys:[[R.key,R.id]],values:[R.value],groupKey:I})}C=[];for(const R of L){const D=s($.sourceDB,O,R.keys,R.values,!1);if(D.error&&D.error instanceof rg)throw D.error;C.push({value:D.error?null:D.output,key:R.groupKey})}return{rows:a(C,T.limit,T.skip)}}function P($,C){return Sc(M($),function(){return B($,C)})()}async function B($,C){let T;const A=$.reduceFun&&C.reduce!==!1,O=C.skip||0;typeof C.keys<"u"&&!C.keys.length&&(C.limit=0,delete C.keys);async function L(R){R.include_docs=!0;const D=await $.db.allDocs(R);return T=D.total_rows,D.rows.map(function(I){if("value"in I.doc&&typeof I.doc.value=="object"&&I.doc.value!==null){const F=Object.keys(I.doc.value).sort(),W=["id","key","value"];if(!(F<W||F>W))return I.doc.value}const N=mw(I.doc._id);return{key:N[0],id:N[1],value:"value"in I.doc?I.doc.value:null}})}async function V(R){let D;if(A?D=E($,R,C):typeof C.keys>"u"?D={total_rows:T,offset:O,rows:R}:D={total_rows:T,offset:O,rows:a(R,C.limit,C.skip)},C.update_seq&&(D.update_seq=$.seq),C.include_docs){const I=id(R.map(c)),N=await $.sourceDB.allDocs({keys:I,include_docs:!0,conflicts:C.conflicts,attachments:C.attachments,binary:C.binary}),F=new Map;for(const W of N.rows)F.set(W.id,W.doc);for(const W of R){const X=c(W),et=F.get(X);et&&(W.doc=et)}}return D}if(typeof C.keys<"u"){const D=C.keys.map(function(F){const W={startkey:nn([F]),endkey:nn([F,{}])};return C.update_seq&&(W.update_seq=!0),L(W)}),N=(await Promise.all(D)).flat();return V(N)}else{const R={descending:C.descending};C.update_seq&&(R.update_seq=!0);let D,I;if("start_key"in C&&(D=C.start_key),"startkey"in C&&(D=C.startkey),"end_key"in C&&(I=C.end_key),"endkey"in C&&(I=C.endkey),typeof D<"u"&&(R.startkey=C.descending?nn([D,{}]):nn([D])),typeof I<"u"){let F=C.inclusive_end!==!1;C.descending&&(F=!F),R.endkey=nn(F?[I,{}]:[I])}if(typeof C.key<"u"){const F=nn([C.key]),W=nn([C.key,{}]);R.descending?(R.endkey=F,R.startkey=W):(R.startkey=F,R.endkey=W)}A||(typeof C.limit=="number"&&(R.limit=C.limit),R.skip=O);const N=await L(R);return V(N)}}async function j($){return(await $.fetch("_view_cleanup",{headers:new Er({"Content-Type":"application/json"}),method:"POST"})).json()}async function H($){try{const C=await $.get("_local/"+e),T=new Map;for(const D of Object.keys(C.views)){const I=$c(D),N="_design/"+I[0],F=I[1];let W=T.get(N);W||(W=new Set,T.set(N,W)),W.add(F)}const A={keys:Cc(T),include_docs:!0},O=await $.allDocs(A),L={};for(const D of O.rows){const I=D.key.substring(8);for(const N of T.get(D.key)){let F=I+"/"+N;C.views[F]||(F=N);const W=Object.keys(C.views[F]),X=D.doc&&D.doc.views&&D.doc.views[N];for(const et of W)L[et]=L[et]||X}}const R=Object.keys(L).filter(function(D){return!L[D]}).map(function(D){return Sc(M(D),function(){return new $.constructor(D,$.__opts).destroy()})()});return Promise.all(R).then(function(){return{ok:!0}})}catch(C){if(C.status===404)return{ok:!0};throw C}}async function Q($,C,T){if(typeof $._query=="function")return _($,C,T);if(vn($))return b($,C,T);const A={changes_batch_size:$.__opts.view_update_changes_batch_size||k1};if(typeof C!="string")return w(T,C),cd.add(async function(){const O=await od($,"temp_view/temp_view",C.map,C.reduce,!0,e);return _1(k(O,A).then(function(){return P(O,T)}),function(){return O.db.destroy()})}),cd.finish();{const O=C,L=$c(O),V=L[0],R=L[1],D=await $.get("_design/"+V);if(C=D.views&&D.views[R],!C)throw new ng(`ddoc ${D._id} has no view named ${R}`);i(D,R),w(T,C);const I=await od($,O,C.map,C.reduce,!1,e);return T.stale==="ok"||T.stale==="update_after"?(T.stale==="update_after"&&wn(function(){k(I,A)}),P(I,T)):(await k(I,A),P(I,T))}}function J($,C,T){const A=this;typeof C=="function"&&(T=C,C={}),C=C?f(C):{},typeof $=="function"&&($={map:$});const O=Promise.resolve().then(function(){return Q(A,$,C)});return og(O,T),O}const U=v1(function(){const $=this;return typeof $._viewCleanup=="function"?y($):vn($)?j($):H($)});return{query:J,viewCleanup:U}}var Mc={_sum:function(e,t){return xl(t)},_count:function(e,t){return t.length},_stats:function(e,t){function n(i){for(var r=0,s=0,o=i.length;s<o;s++){var a=i[s];r+=a*a}return r}return{sum:xl(t),min:Math.min.apply(null,t),max:Math.max.apply(null,t),count:t.length,sumsqr:n(t)}}};function $1(e){if(/^_sum/.test(e))return Mc._sum;if(/^_count/.test(e))return Mc._count;if(/^_stats/.test(e))return Mc._stats;if(/^_/.test(e))throw new Error(e+" is not a supported reduce function.")}function M1(e,t){if(typeof e=="function"&&e.length===2){var n=e;return function(i){return n(i,t)}}else return ag(e.toString(),t)}function A1(e){var t=e.toString(),n=$1(t);return n||ag(t)}function E1(e,t){var n=e.views&&e.views[t];if(typeof n.map!="string")throw new ng("ddoc "+e._id+" has no string view named "+t+", instead found object of type: "+typeof n.map)}var T1="mrviews",cg=C1(T1,M1,A1,E1);function D1(e,t,n){return cg.query.call(this,e,t,n)}function O1(e){return cg.viewCleanup.call(this,e)}var P1={query:D1,viewCleanup:O1};function I1(e,t,n){return!e._attachments||!e._attachments[n]||e._attachments[n].digest!==t._attachments[n].digest}function ud(e,t){var n=Object.keys(t._attachments);return Promise.all(n.map(function(i){return e.getAttachment(t._id,i,{rev:t._rev})}))}function R1(e,t,n){var i=vn(t)&&!vn(e),r=Object.keys(n._attachments);return i?e.get(n._id).then(function(s){return Promise.all(r.map(function(o){return I1(s,n,o)?t.getAttachment(n._id,o):e.getAttachment(s._id,o)}))}).catch(function(s){if(s.status!==404)throw s;return ud(t,n)}):ud(t,n)}function L1(e){var t=[];return Object.keys(e).forEach(function(n){var i=e[n].missing;i.forEach(function(r){t.push({id:n,rev:r})})}),{docs:t,revs:!0,latest:!0}}function B1(e,t,n,i){n=ne(n);var r=[],s=!0;function o(){var c=L1(n);if(c.docs.length)return e.bulkGet(c).then(function(l){if(i.cancelled)throw new Error("cancelled");return Promise.all(l.results.map(function(h){return Promise.all(h.docs.map(function(u){var d=u.ok;return u.error&&(s=!1),!d||!d._attachments?d:R1(t,e,d).then(f=>{var v=Object.keys(d._attachments);return f.forEach(function(w,b){var _=d._attachments[v[b]];delete _.stub,delete _.length,_.data=w}),d})}))})).then(function(h){r=r.concat(h.flat().filter(Boolean))})})}function a(){return{ok:s,docs:r}}return Promise.resolve().then(o).then(a)}var hd=1,dd="pouchdb",N1=5,en=0;function Sl(e,t,n,i,r){return e.get(t).catch(function(s){if(s.status===404)return(e.adapter==="http"||e.adapter==="https")&&hl(404,"PouchDB is just checking if a remote checkpoint exists."),{session_id:i,_id:t,history:[],replicator:dd,version:hd};throw s}).then(function(s){if(!r.cancelled&&s.last_seq!==n)return s.history=(s.history||[]).filter(function(o){return o.session_id!==i}),s.history.unshift({last_seq:n,session_id:i}),s.history=s.history.slice(0,N1),s.version=hd,s.replicator=dd,s.session_id=i,s.last_seq=n,e.put(s).catch(function(o){if(o.status===409)return Sl(e,t,n,i,r);throw o})})}class fd{constructor(t,n,i,r,s={writeSourceCheckpoint:!0,writeTargetCheckpoint:!0}){this.src=t,this.target=n,this.id=i,this.returnValue=r,this.opts=s,typeof s.writeSourceCheckpoint>"u"&&(s.writeSourceCheckpoint=!0),typeof s.writeTargetCheckpoint>"u"&&(s.writeTargetCheckpoint=!0)}writeCheckpoint(t,n){var i=this;return this.updateTarget(t,n).then(function(){return i.updateSource(t,n)})}updateTarget(t,n){return this.opts.writeTargetCheckpoint?Sl(this.target,this.id,t,n,this.returnValue):Promise.resolve(!0)}updateSource(t,n){if(this.opts.writeSourceCheckpoint){var i=this;return Sl(this.src,this.id,t,n,this.returnValue).catch(function(r){if(gd(r))return i.opts.writeSourceCheckpoint=!1,!0;throw r})}else return Promise.resolve(!0)}getCheckpoint(){var t=this;return!t.opts.writeSourceCheckpoint&&!t.opts.writeTargetCheckpoint?Promise.resolve(en):t.opts&&t.opts.writeSourceCheckpoint&&!t.opts.writeTargetCheckpoint?t.src.get(t.id).then(function(n){return n.last_seq||en}).catch(function(n){if(n.status!==404)throw n;return en}):t.target.get(t.id).then(function(n){return t.opts&&t.opts.writeTargetCheckpoint&&!t.opts.writeSourceCheckpoint?n.last_seq||en:t.src.get(t.id).then(function(i){if(n.version!==i.version)return en;var r;return n.version?r=n.version.toString():r="undefined",r in pd?pd[r](n,i):en},function(i){if(i.status===404&&n.last_seq)return t.src.put({_id:t.id,last_seq:en}).then(function(){return en},function(r){return gd(r)?(t.opts.writeSourceCheckpoint=!1,n.last_seq):en});throw i})}).catch(function(n){if(n.status!==404)throw n;return en})}}var pd={undefined:function(e,t){return Vt(e.last_seq,t.last_seq)===0?t.last_seq:0},1:function(e,t){return z1(t,e).last_seq}};function z1(e,t){return e.session_id===t.session_id?{last_seq:e.last_seq,history:e.history}:lg(e.history,t.history)}function lg(e,t){var n=e[0],i=e.slice(1),r=t[0],s=t.slice(1);if(!n||t.length===0)return{last_seq:en,history:[]};var o=n.session_id;if(Cl(o,t))return{last_seq:n.last_seq,history:e};var a=r.session_id;return Cl(a,i)?{last_seq:r.last_seq,history:s}:lg(i,s)}function Cl(e,t){var n=t[0],i=t.slice(1);return!e||t.length===0?!1:e===n.session_id?!0:Cl(e,i)}function gd(e){return typeof e.status=="number"&&Math.floor(e.status/100)===4}function ug(e,t,n,i,r){return this instanceof fd?ug:new fd(e,t,n,i,r)}var md=0;function j1(e,t,n,i){if(e.retry===!1){t.emit("error",n),t.removeAllListeners();return}if(typeof e.back_off_function!="function"&&(e.back_off_function=lb),t.emit("requestError",n),t.state==="active"||t.state==="pending"){t.emit("paused",n),t.state="stopped";var r=function(){e.current_back_off=md},s=function(){t.removeListener("active",r)};t.once("paused",s),t.once("active",r)}e.current_back_off=e.current_back_off||md,e.current_back_off=e.back_off_function(e.current_back_off),setTimeout(i,e.current_back_off)}function F1(e){return Object.keys(e).sort(Vt).reduce(function(t,n){return t[n]=e[n],t},{})}function q1(e,t,n){var i=n.doc_ids?n.doc_ids.sort(Vt):"",r=n.filter?n.filter.toString():"",s="",o="",a="";return n.selector&&(a=JSON.stringify(n.selector)),n.filter&&n.query_params&&(s=JSON.stringify(F1(n.query_params))),n.filter&&n.filter==="_view"&&(o=n.view.toString()),Promise.all([e.id(),t.id()]).then(function(c){var l=c[0]+c[1]+r+o+s+i+a;return new Promise(function(h){Tu(l,h)})}).then(function(c){return c=c.replace(/\//g,".").replace(/\+/g,"_"),"_local/"+c})}function hg(e,t,n,i,r){var s=[],o,a={seq:0,changes:[],docs:[]},c=!1,l=!1,h=!1,u=0,d=0,f=n.continuous||n.live||!1,v=n.batch_size||100,w=n.batches_limit||10,b=n.style||"all_docs",_=!1,y=n.doc_ids,g=n.selector,p,m,x=[],M=qa(),k;r=r||{ok:!0,start_time:new Date().toISOString(),docs_read:0,docs_written:0,doc_write_failures:0,errors:[]};var S={};i.ready(e,t);function E(){return m?Promise.resolve():q1(e,t,n).then(function(D){p=D;var I={};n.checkpoint===!1?I={writeSourceCheckpoint:!1,writeTargetCheckpoint:!1}:n.checkpoint==="source"?I={writeSourceCheckpoint:!0,writeTargetCheckpoint:!1}:n.checkpoint==="target"?I={writeSourceCheckpoint:!1,writeTargetCheckpoint:!0}:I={writeSourceCheckpoint:!0,writeTargetCheckpoint:!0},m=new ug(e,t,p,i,I)})}function P(){if(x=[],o.docs.length!==0){var D=o.docs,I={timeout:n.timeout};return t.bulkDocs({docs:D,new_edits:!1},I).then(function(N){if(i.cancelled)throw $(),new Error("cancelled");var F=Object.create(null);N.forEach(function(X){X.error&&(F[X.id]=X)});var W=Object.keys(F).length;r.doc_write_failures+=W,r.docs_written+=D.length-W,D.forEach(function(X){var et=F[X._id];if(et){r.errors.push(et);var rt=(et.name||"").toLowerCase();if(rt==="unauthorized"||rt==="forbidden")i.emit("denied",ne(et));else throw et}else x.push(X)})},function(N){throw r.doc_write_failures+=D.length,N})}}function B(){if(o.error)throw new Error("There was a problem getting docs.");r.last_seq=d=o.seq;var D=ne(r);return x.length&&(D.docs=x,typeof o.pending=="number"&&(D.pending=o.pending,delete o.pending),i.emit("change",D)),c=!0,e.info().then(function(I){var N=e.activeTasks.get(k);if(!(!o||!N)){var F=N.completed_items||0,W=parseInt(I.update_seq,10)-parseInt(u,10);e.activeTasks.update(k,{completed_items:F+o.changes.length,total_items:W})}}),m.writeCheckpoint(o.seq,M).then(function(){if(i.emit("checkpoint",{checkpoint:o.seq}),c=!1,i.cancelled)throw $(),new Error("cancelled");o=void 0,O()}).catch(function(I){throw R(I),I})}function j(){var D={};return o.changes.forEach(function(I){i.emit("checkpoint",{revs_diff:I}),I.id!=="_user/"&&(D[I.id]=I.changes.map(function(N){return N.rev}))}),t.revsDiff(D).then(function(I){if(i.cancelled)throw $(),new Error("cancelled");o.diffs=I})}function H(){return B1(e,t,o.diffs,i).then(function(D){o.error=!D.ok,D.docs.forEach(function(I){delete o.diffs[I._id],r.docs_read++,o.docs.push(I)})})}function Q(){if(!(i.cancelled||o)){if(s.length===0){J(!0);return}o=s.shift(),i.emit("checkpoint",{start_next_batch:o.seq}),j().then(H).then(P).then(B).then(Q).catch(function(D){U("batch processing terminated with error",D)})}}function J(D){if(a.changes.length===0){s.length===0&&!o&&((f&&S.live||l)&&(i.state="pending",i.emit("paused")),l&&$());return}(D||l||a.changes.length>=v)&&(s.push(a),a={seq:0,changes:[],docs:[]},(i.state==="pending"||i.state==="stopped")&&(i.state="active",i.emit("active")),Q())}function U(D,I){h||(I.message||(I.message=D),r.ok=!1,r.status="aborting",s=[],a={seq:0,changes:[],docs:[]},$(I))}function $(D){if(!h&&!(i.cancelled&&(r.status="cancelled",c)))if(r.status=r.status||"complete",r.end_time=new Date().toISOString(),r.last_seq=d,h=!0,e.activeTasks.remove(k,D),D){D=dt(D),D.result=r;var I=(D.name||"").toLowerCase();I==="unauthorized"||I==="forbidden"?(i.emit("error",D),i.removeAllListeners()):j1(n,i,D,function(){hg(e,t,n,i)})}else i.emit("complete",r),i.removeAllListeners()}function C(D,I,N){if(i.cancelled)return $();typeof I=="number"&&(a.pending=I);var F=ku(n)(D);if(!F){var W=e.activeTasks.get(k);if(W){var X=W.completed_items||0;e.activeTasks.update(k,{completed_items:++X})}return}a.seq=D.seq||N,a.changes.push(D),i.emit("checkpoint",{pending_batch:a.seq}),wn(function(){J(s.length===0&&S.live)})}function T(D){if(_=!1,i.cancelled)return $();if(D.results.length>0)S.since=D.results[D.results.length-1].seq,O(),J(!0);else{var I=function(){f?(S.live=!0,O()):l=!0,J(!0)};!o&&D.results.length===0?(c=!0,m.writeCheckpoint(D.last_seq,M).then(function(){if(c=!1,r.last_seq=d=D.last_seq,i.cancelled)throw $(),new Error("cancelled");I()}).catch(R)):I()}}function A(D){if(_=!1,i.cancelled)return $();U("changes rejected",D)}function O(){if(!(!_&&!l&&s.length<w))return;_=!0;function D(){N.cancel()}function I(){i.removeListener("cancel",D)}i._changes&&(i.removeListener("cancel",i._abortChanges),i._changes.cancel()),i.once("cancel",D);var N=e.changes(S).on("change",C);N.then(I,I),N.then(T).catch(A),n.retry&&(i._changes=N,i._abortChanges=D)}function L(D){return e.info().then(function(I){var N=typeof n.since>"u"?parseInt(I.update_seq,10)-parseInt(D,10):parseInt(I.update_seq,10);return k=e.activeTasks.add({name:`${f?"continuous ":""}replication from ${I.db_name}`,total_items:N}),D})}function V(){E().then(function(){if(i.cancelled){$();return}return m.getCheckpoint().then(L).then(function(D){d=D,u=D,S={since:d,limit:v,batch_size:v,style:b,doc_ids:y,selector:g,return_docs:!0},n.filter&&(typeof n.filter!="string"?S.include_docs=!0:S.filter=n.filter),"heartbeat"in n&&(S.heartbeat=n.heartbeat),"timeout"in n&&(S.timeout=n.timeout),n.query_params&&(S.query_params=n.query_params),n.view&&(S.view=n.view),O()})}).catch(function(D){U("getCheckpoint rejected with ",D)})}function R(D){c=!1,U("writeCheckpoint completed with error",D)}if(i.cancelled){$();return}i._addedListeners||(i.once("cancel",$),typeof n.complete=="function"&&(i.once("error",n.complete),i.once("complete",function(D){n.complete(null,D)})),i._addedListeners=!0),typeof n.since>"u"?V():E().then(function(){return c=!0,m.writeCheckpoint(n.since,M)}).then(function(){if(c=!1,i.cancelled){$();return}d=n.since,V()}).catch(R)}class W1 extends jn{constructor(){super(),this.cancelled=!1,this.state="pending";const t=new Promise((n,i)=>{this.once("complete",n),this.once("error",i)});this.then=function(n,i){return t.then(n,i)},this.catch=function(n){return t.catch(n)},this.catch(function(){})}cancel(){this.cancelled=!0,this.state="cancelled",this.emit("cancel")}ready(t,n){if(this._readyCalled)return;this._readyCalled=!0;const i=()=>{this.cancel()};t.once("destroyed",i),n.once("destroyed",i);function r(){t.removeListener("destroyed",i),n.removeListener("destroyed",i)}this.once("complete",r),this.once("error",r)}}function pa(e,t){var n=t.PouchConstructor;return typeof e=="string"?new n(e,t):e}function $l(e,t,n,i){if(typeof n=="function"&&(i=n,n={}),typeof n>"u"&&(n={}),n.doc_ids&&!Array.isArray(n.doc_ids))throw dt(Fa,"`doc_ids` filter parameter is not a list.");n.complete=i,n=ne(n),n.continuous=n.continuous||n.live,n.retry="retry"in n?n.retry:!1,n.PouchConstructor=n.PouchConstructor||this;var r=new W1(n),s=pa(e,n),o=pa(t,n);return hg(s,o,n,r),r}function H1(e,t,n,i){return typeof n=="function"&&(i=n,n={}),typeof n>"u"&&(n={}),n=ne(n),n.PouchConstructor=n.PouchConstructor||this,e=pa(e,n),t=pa(t,n),new V1(e,t,n,i)}class V1 extends jn{constructor(t,n,i,r){super(),this.canceled=!1;const s=i.push?Object.assign({},i,i.push):i,o=i.pull?Object.assign({},i,i.pull):i;this.push=$l(t,n,s),this.pull=$l(n,t,o),this.pushPaused=!0,this.pullPaused=!0;const a=g=>{this.emit("change",{direction:"pull",change:g})},c=g=>{this.emit("change",{direction:"push",change:g})},l=g=>{this.emit("denied",{direction:"push",doc:g})},h=g=>{this.emit("denied",{direction:"pull",doc:g})},u=()=>{this.pushPaused=!0,this.pullPaused&&this.emit("paused")},d=()=>{this.pullPaused=!0,this.pushPaused&&this.emit("paused")},f=()=>{this.pushPaused=!1,this.pullPaused&&this.emit("active",{direction:"push"})},v=()=>{this.pullPaused=!1,this.pushPaused&&this.emit("active",{direction:"pull"})};let w={};const b=g=>(p,m)=>{(p==="change"&&(m===a||m===c)||p==="denied"&&(m===h||m===l)||p==="paused"&&(m===d||m===u)||p==="active"&&(m===v||m===f))&&(p in w||(w[p]={}),w[p][g]=!0,Object.keys(w[p]).length===2&&this.removeAllListeners(p))};i.live&&(this.push.on("complete",this.pull.cancel.bind(this.pull)),this.pull.on("complete",this.push.cancel.bind(this.push)));function _(g,p,m){g.listeners(p).indexOf(m)==-1&&g.on(p,m)}this.on("newListener",function(g){g==="change"?(_(this.pull,"change",a),_(this.push,"change",c)):g==="denied"?(_(this.pull,"denied",h),_(this.push,"denied",l)):g==="active"?(_(this.pull,"active",v),_(this.push,"active",f)):g==="paused"&&(_(this.pull,"paused",d),_(this.push,"paused",u))}),this.on("removeListener",function(g){g==="change"?(this.pull.removeListener("change",a),this.push.removeListener("change",c)):g==="denied"?(this.pull.removeListener("denied",h),this.push.removeListener("denied",l)):g==="active"?(this.pull.removeListener("active",v),this.push.removeListener("active",f)):g==="paused"&&(this.pull.removeListener("paused",d),this.push.removeListener("paused",u))}),this.pull.on("removeListener",b("pull")),this.push.on("removeListener",b("push"));const y=Promise.all([this.push,this.pull]).then(g=>{const p={push:g[0],pull:g[1]};return this.emit("complete",p),r&&r(null,p),this.removeAllListeners(),p},g=>{if(this.cancel(),r?r(g):this.emit("error",g),this.removeAllListeners(),r)throw g});this.then=function(g,p){return y.then(g,p)},this.catch=function(g){return y.catch(g)}}cancel(){this.canceled||(this.canceled=!0,this.push.cancel(),this.pull.cancel())}}function U1(e){e.replicate=$l,e.sync=H1,Object.defineProperty(e.prototype,"replicate",{get:function(){var t=this;return typeof this.replicateMethods>"u"&&(this.replicateMethods={from:function(n,i,r){return t.constructor.replicate(n,t,i,r)},to:function(n,i,r){return t.constructor.replicate(t,n,i,r)}}),this.replicateMethods}}),e.prototype.sync=function(t,n,i){return this.constructor.sync(this,t,n,i)}}ct.plugin(c1).plugin(m1).plugin(P1).plugin(U1);class Rt extends Error{constructor(t,n,i){super(),this.status=t,this.name=n,this.message=i,this.error=!0}toString(){return JSON.stringify({status:this.status,name:this.name,message:this.message,reason:this.reason})}}new Rt(401,"unauthorized","Name or password is incorrect.");new Rt(400,"bad_request","Missing JSON list of 'docs'");new Rt(404,"not_found","missing");new Rt(409,"conflict","Document update conflict");new Rt(400,"bad_request","_id field must contain a string");new Rt(412,"missing_id","_id is required for puts");new Rt(400,"bad_request","Only reserved document ids may start with underscore.");new Rt(412,"precondition_failed","Database not open");var K1=new Rt(500,"unknown_error","Database encountered an unknown error");new Rt(500,"badarg","Some query argument is invalid");new Rt(400,"invalid_request","Request was invalid");new Rt(400,"query_parse_error","Some query parameter is invalid");new Rt(500,"doc_validation","Bad special document member");new Rt(400,"bad_request","Something wrong with the request");new Rt(400,"bad_request","Document must be a JSON object");new Rt(404,"not_found","Database not found");new Rt(500,"indexed_db_went_bad","unknown");new Rt(500,"web_sql_went_bad","unknown");new Rt(500,"levelDB_went_went_bad","unknown");new Rt(403,"forbidden","Forbidden by design doc validate_doc_update function");new Rt(400,"bad_request","Invalid rev format");new Rt(412,"file_exists","The database could not be created, the file already exists.");new Rt(412,"missing_stub","A pre-existing attachment stub wasn't found");new Rt(413,"invalid_url","Provided URL is invalid");function Y1(e,t){function n(i){for(var r=Object.getOwnPropertyNames(e),s=0,o=r.length;s<o;s++)typeof e[r[s]]!="function"&&(this[r[s]]=e[r[s]]);this.stack===void 0&&(this.stack=new Error().stack),i!==void 0&&(this.reason=i)}return n.prototype=Rt.prototype,new n(t)}function Ml(e){if(typeof e!="object"){var t=e;e=K1,e.data=t}return"error"in e&&e.error==="conflict"&&(e.name="conflict",e.status=409),"name"in e||(e.name=e.error||"unknown"),"status"in e||(e.status=500),"message"in e||(e.message=e.message||e.reason),"stack"in e||(e.stack=new Error().stack),e}var jo=Headers,X1=function(e){return atob(e)};function G1(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(s){if(s.name!=="TypeError")throw s;for(var n=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,i=new n,r=0;r<e.length;r+=1)i.append(e[r]);return i.getBlob(t.type)}}function Q1(e){for(var t=e.length,n=new ArrayBuffer(t),i=new Uint8Array(n),r=0;r<t;r++)i[r]=e.charCodeAt(r);return n}function J1(e,t){return G1([Q1(e)],{type:t})}function Z1(e,t){return J1(X1(e),t)}function tx(e,t,n){for(var i="",r=n-e.length;i.length<r;)i+=t;return i}function ex(e,t,n){var i=tx(e,t,n);return i+e}var dg=-324,Al=3,El="";function Qt(e,t){if(e===t)return 0;e=Zi(e),t=Zi(t);var n=Tl(e),i=Tl(t);if(n-i!==0)return n-i;switch(typeof e){case"number":return e-t;case"boolean":return e<t?-1:1;case"string":return ax(e,t)}return Array.isArray(e)?ox(e,t):cx(e,t)}function Zi(e){switch(typeof e){case"undefined":return null;case"number":return e===1/0||e===-1/0||isNaN(e)?null:e;case"object":var t=e;if(Array.isArray(e)){var n=e.length;e=new Array(n);for(var i=0;i<n;i++)e[i]=Zi(t[i])}else{if(e instanceof Date)return e.toJSON();if(e!==null){e={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){var s=t[r];typeof s<"u"&&(e[r]=Zi(s))}}}}return e}function nx(e){if(e!==null)switch(typeof e){case"boolean":return e?1:0;case"number":return lx(e);case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"");case"object":var t=Array.isArray(e),n=t?e:Object.keys(e),i=-1,r=n.length,s="";if(t)for(;++i<r;)s+=sn(n[i]);else for(;++i<r;){var o=n[i];s+=sn(o)+sn(e[o])}return s}return""}function sn(e){var t="\0";return e=Zi(e),Tl(e)+El+nx(e)+t}function ix(e,t){var n=t,i,r=e[t]==="1";if(r)i=0,t++;else{var s=e[t]==="0";t++;var o="",a=e.substring(t,t+Al),c=parseInt(a,10)+dg;for(s&&(c=-c),t+=Al;;){var l=e[t];if(l==="\0")break;o+=l,t++}o=o.split("."),o.length===1?i=parseInt(o,10):i=parseFloat(o[0]+"."+o[1]),s&&(i=i-10),c!==0&&(i=parseFloat(i+"e"+c))}return{num:i,length:t-n}}function rx(e,t){var n=e.pop();if(t.length){var i=t[t.length-1];n===i.element&&(t.pop(),i=t[t.length-1]);var r=i.element,s=i.index;if(Array.isArray(r))r.push(n);else if(s===e.length-2){var o=e.pop();r[o]=n}else e.push(n)}}function sx(e){for(var t=[],n=[],i=0;;){var r=e[i++];if(r==="\0"){if(t.length===1)return t.pop();rx(t,n);continue}switch(r){case"1":t.push(null);break;case"2":t.push(e[i]==="1"),i++;break;case"3":var s=ix(e,i);t.push(s.num),i+=s.length;break;case"4":for(var o="";;){var a=e[i];if(a==="\0")break;o+=a,i++}o=o.replace(/\u0001\u0001/g,"\0").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(o);break;case"5":var c={element:[],index:t.length};t.push(c.element),n.push(c);break;case"6":var l={element:{},index:t.length};t.push(l.element),n.push(l);break;default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+r)}}}function ox(e,t){for(var n=Math.min(e.length,t.length),i=0;i<n;i++){var r=Qt(e[i],t[i]);if(r!==0)return r}return e.length===t.length?0:e.length>t.length?1:-1}function ax(e,t){return e===t?0:e>t?1:-1}function cx(e,t){for(var n=Object.keys(e),i=Object.keys(t),r=Math.min(n.length,i.length),s=0;s<r;s++){var o=Qt(n[s],i[s]);if(o!==0||(o=Qt(e[n[s]],t[i[s]]),o!==0))return o}return n.length===i.length?0:n.length>i.length?1:-1}function Tl(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e);if(~n)return e===null?1:Array.isArray(e)?5:n<3?n+2:n+3;if(Array.isArray(e))return 5}function lx(e){if(e===0)return"1";var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),i=e<0,r=i?"0":"2",s=(i?-n:n)-dg,o=ex(s.toString(),"0",Al);r+=El+o;var a=Math.abs(parseFloat(t[0]));i&&(a=10-a);var c=a.toFixed(20);return c=c.replace(/\.?0+$/,""),r+=El+c,r}function fg(e){return la.hash(e)}function ux(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer||typeof Blob<"u"&&e instanceof Blob}function hx(e){return e instanceof ArrayBuffer?e.slice(0):e.slice(0,e.size,e.type)}var pg=Function.prototype.toString,dx=pg.call(Object);function fx(e){var t=Object.getPrototypeOf(e);if(t===null)return!0;var n=t.constructor;return typeof n=="function"&&n instanceof n&&pg.call(n)==dx}function tr(e){var t,n,i;if(!e||typeof e!="object")return e;if(Array.isArray(e)){for(t=[],n=0,i=e.length;n<i;n++)t[n]=tr(e[n]);return t}if(e instanceof Date&&isFinite(e))return e.toISOString();if(ux(e))return hx(e);if(!fx(e))return e;t={};for(n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=tr(e[n]);typeof r<"u"&&(t[n]=r)}return t}var vd;try{localStorage.setItem("_pouch_check_localstorage",1),vd=!!localStorage.getItem("_pouch_check_localstorage")}catch{vd=!1}const Dl=typeof queueMicrotask=="function"?queueMicrotask:function(t){Promise.resolve().then(t)};function Ol(e){if(typeof console<"u"&&typeof console[e]=="function"){var t=Array.prototype.slice.call(arguments,1);console[e].apply(console,t)}}function er(e){return typeof e._remote=="boolean"?e._remote:typeof e.type=="function"?(Ol("warn","db.type() is deprecated and will be removed in a future version of PouchDB"),e.type()==="http"):!1}function Wa(e,t,n){return e.get(t).catch(function(i){if(i.status!==404)throw i;return{}}).then(function(i){var r=i._rev,s=n(i);return s?(s._id=t,s._rev=r,px(e,s,n)):{updated:!1,rev:r}})}function px(e,t,n){return e.put(t).then(function(i){return{updated:!0,rev:i.rev}},function(i){if(i.status!==409)throw i;return Wa(e,t._id,n)})}class zi extends Error{constructor(t){super(),this.status=400,this.name="query_parse_error",this.message=t,this.error=!0;try{Error.captureStackTrace(this,zi)}catch{}}}class Ru extends Error{constructor(t){super(),this.status=404,this.name="not_found",this.message=t,this.error=!0;try{Error.captureStackTrace(this,Ru)}catch{}}}class Lu extends Error{constructor(t){super(),this.status=500,this.name="invalid_value",this.message=t,this.error=!0;try{Error.captureStackTrace(this,Lu)}catch{}}}function gg(e,t){return t&&e.then(function(n){Dl(function(){t(null,n)})},function(n){Dl(function(){t(n)})}),e}function gx(e){return function(...t){var n=t.pop(),i=e.apply(this,t);return typeof n=="function"&&gg(i,n),i}}function mx(e,t){return e.then(function(n){return t().then(function(){return n})},function(n){return t().then(function(){throw n})})}function Ac(e,t){return function(){var n=arguments,i=this;return e.add(function(){return t.apply(i,n)})}}function _d(e){var t=new Set(e),n=new Array(t.size),i=-1;return t.forEach(function(r){n[++i]=r}),n}function Ec(e){var t=new Array(e.size),n=-1;return e.forEach(function(i,r){t[++n]=r}),t}class Pl{constructor(){this.promise=Promise.resolve()}add(t){return this.promise=this.promise.catch(()=>{}).then(()=>t()),this.promise}finish(){return this.promise}}function yd(e){if(!e)return"undefined";switch(typeof e){case"function":return e.toString();case"string":return e.toString();default:return JSON.stringify(e)}}function vx(e,t){return yd(e)+yd(t)+"undefined"}async function bd(e,t,n,i,r,s){const o=vx(n,i);let a;if(!r&&(a=e._cachedViews=e._cachedViews||{},a[o]))return a[o];const c=e.info().then(async function(l){const h=l.db_name+"-mrview-"+(r?"temp":fg(o));function u(b){b.views=b.views||{};let _=t;_.indexOf("/")===-1&&(_=t+"/"+t);const y=b.views[_]=b.views[_]||{};if(!y[h])return y[h]=!0,b}await Wa(e,"_local/"+s,u);const f=(await e.registerDependentDatabase(h)).db;f.auto_compaction=!0;const v={name:h,db:f,sourceDB:e,adapter:e.adapter,mapFun:n,reduceFun:i};let w;try{w=await v.db.get("_local/lastSeq")}catch(b){if(b.status!==404)throw b}return v.seq=w?w.seq:0,a&&v.db.once("destroyed",function(){delete a[o]}),v});return a&&(a[o]=c),c}const wd={},xd=new Pl,_x=50;function Tc(e){return e.indexOf("/")===-1?[e,e]:e.split("/")}function yx(e){return e.length===1&&/^1-/.test(e[0].rev)}function kd(e,t,n){try{e.emit("error",t)}catch{Ol("error",`The user's map/reduce function threw an uncaught error.
You can debug this error by doing:
myDatabase.on('error', function (err) { debugger; });
Please double-check your map/reduce function.`),Ol("error",t,n)}}function bx(e,t,n,i){function r($,C,T){try{C(T)}catch(A){kd($,A,{fun:C,doc:T})}}function s($,C,T,A,O){try{return{output:C(T,A,O)}}catch(L){return kd($,L,{fun:C,keys:T,values:A,rereduce:O}),{error:L}}}function o($,C){const T=Qt($.key,C.key);return T!==0?T:Qt($.value,C.value)}function a($,C,T){return T=T||0,typeof C=="number"?$.slice(T,C+T):T>0?$.slice(T):$}function c($){const C=$.value;return C&&typeof C=="object"&&C._id||$.id}function l($){for(const C of $.rows){const T=C.doc&&C.doc._attachments;if(T)for(const A of Object.keys(T)){const O=T[A];T[A].data=Z1(O.data,O.content_type)}}}function h($){return function(C){return $.include_docs&&$.attachments&&$.binary&&l(C),C}}function u($,C,T,A){let O=C[$];typeof O<"u"&&(A&&(O=encodeURIComponent(JSON.stringify(O))),T.push($+"="+O))}function d($){if(typeof $<"u"){const C=Number($);return!isNaN(C)&&C===parseInt($,10)?C:$}}function f($){return $.group_level=d($.group_level),$.limit=d($.limit),$.skip=d($.skip),$}function v($){if($){if(typeof $!="number")return new zi(`Invalid value for integer: "${$}"`);if($<0)return new zi(`Invalid value for positive integer: "${$}"`)}}function w($,C){const T=$.descending?"endkey":"startkey",A=$.descending?"startkey":"endkey";if(typeof $[T]<"u"&&typeof $[A]<"u"&&Qt($[T],$[A])>0)throw new zi("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");if(C.reduce&&$.reduce!==!1){if($.include_docs)throw new zi("{include_docs:true} is invalid for reduce");if($.keys&&$.keys.length>1&&!$.group&&!$.group_level)throw new zi("Multi-key fetches for reduce views must use {group: true}")}for(const O of["group_level","limit","skip"]){const L=v($[O]);if(L)throw L}}async function b($,C,T){let A=[],O,L="GET",V;if(u("reduce",T,A),u("include_docs",T,A),u("attachments",T,A),u("limit",T,A),u("descending",T,A),u("group",T,A),u("group_level",T,A),u("skip",T,A),u("stale",T,A),u("conflicts",T,A),u("startkey",T,A,!0),u("start_key",T,A,!0),u("endkey",T,A,!0),u("end_key",T,A,!0),u("inclusive_end",T,A),u("key",T,A,!0),u("update_seq",T,A),A=A.join("&"),A=A===""?"":"?"+A,typeof T.keys<"u"){const N=`keys=${encodeURIComponent(JSON.stringify(T.keys))}`;N.length+A.length+1<=2e3?A+=(A[0]==="?"?"&":"?")+N:(L="POST",typeof C=="string"?O={keys:T.keys}:C.keys=T.keys)}if(typeof C=="string"){const I=Tc(C),N=await $.fetch("_design/"+I[0]+"/_view/"+I[1]+A,{headers:new jo({"Content-Type":"application/json"}),method:L,body:JSON.stringify(O)});V=N.ok;const F=await N.json();if(!V)throw F.status=N.status,Ml(F);for(const W of F.rows)if(W.value&&W.value.error&&W.value.error==="builtin_reduce_error")throw new Error(W.reason);return new Promise(function(W){W(F)}).then(h(T))}O=O||{};for(const I of Object.keys(C))Array.isArray(C[I])?O[I]=C[I]:O[I]=C[I].toString();const R=await $.fetch("_temp_view"+A,{headers:new jo({"Content-Type":"application/json"}),method:"POST",body:JSON.stringify(O)});V=R.ok;const D=await R.json();if(!V)throw D.status=R.status,Ml(D);return new Promise(function(I){I(D)}).then(h(T))}function _($,C,T){return new Promise(function(A,O){$._query(C,T,function(L,V){if(L)return O(L);A(V)})})}function y($){return new Promise(function(C,T){$._viewCleanup(function(A,O){if(A)return T(A);C(O)})})}function g($){return function(C){if(C.status===404)return $;throw C}}async function p($,C,T){const A="_local/doc_"+$,O={_id:A,keys:[]},L=T.get($),V=L[0],R=L[1];function D(){return yx(R)?Promise.resolve(O):C.db.get(A).catch(g(O))}function I(X){return X.keys.length?C.db.allDocs({keys:X.keys,include_docs:!0}):Promise.resolve({rows:[]})}function N(X,et){const rt=[],st=new Set;for(const Y of et.rows){const tt=Y.doc;if(tt&&(rt.push(tt),st.add(tt._id),tt._deleted=!V.has(tt._id),!tt._deleted)){const K=V.get(tt._id);"value"in K&&(tt.value=K.value)}}const gt=Ec(V);for(const Y of gt)if(!st.has(Y)){const tt={_id:Y},K=V.get(Y);"value"in K&&(tt.value=K.value),rt.push(tt)}return X.keys=_d(gt.concat(X.keys)),rt.push(X),rt}const F=await D(),W=await I(F);return N(F,W)}function m($){return $.sourceDB.get("_local/purges").then(function(C){const T=C.purgeSeq;return $.db.get("_local/purgeSeq").then(function(A){return A._rev}).catch(g(void 0)).then(function(A){return $.db.put({_id:"_local/purgeSeq",_rev:A,purgeSeq:T})})}).catch(function(C){if(C.status!==404)throw C})}function x($,C,T){var A="_local/lastSeq";return $.db.get(A).catch(g({_id:A,seq:0})).then(function(O){var L=Ec(C);return Promise.all(L.map(function(V){return p(V,$,C)})).then(function(V){var R=V.flat();return O.seq=T,R.push(O),$.db.bulkDocs({docs:R})}).then(()=>m($))})}function M($){const C=typeof $=="string"?$:$.name;let T=wd[C];return T||(T=wd[C]=new Pl),T}async function k($,C){return Ac(M($),function(){return S($,C)})()}async function S($,C){let T,A,O;function L(Y,tt){const K={id:A._id,key:Zi(Y)};typeof tt<"u"&&tt!==null&&(K.value=Zi(tt)),T.push(K)}const V=t($.mapFun,L);let R=$.seq||0;function D(){return $.sourceDB.info().then(function(Y){O=$.sourceDB.activeTasks.add({name:"view_indexing",total_items:Y.update_seq-R})})}function I(Y,tt){return function(){return x($,Y,tt)}}let N=0;const F={view:$.name,indexed_docs:N};$.sourceDB.emit("indexing",F);const W=new Pl;async function X(){const Y=await $.sourceDB.changes({return_docs:!0,conflicts:!0,include_docs:!0,style:"all_docs",since:R,limit:C.changes_batch_size}),tt=await et();return rt(Y,tt)}function et(){return $.db.get("_local/purgeSeq").then(function(Y){return Y.purgeSeq}).catch(g(-1)).then(function(Y){return $.sourceDB.get("_local/purges").then(function(tt){const K=tt.purges.filter(function(wt,ut){return ut>Y}).map(wt=>wt.docId),ot=K.filter(function(wt,ut){return K.indexOf(wt)===ut});return Promise.all(ot.map(function(wt){return $.sourceDB.get(wt).then(function(ut){return{docId:wt,doc:ut}}).catch(g({docId:wt}))}))}).catch(g([]))})}function rt(Y,tt){const K=Y.results;if(!K.length&&!tt.length)return;for(const ut of tt)if(K.findIndex(function(le){return le.id===ut.docId})<0){const le={_id:ut.docId,doc:{_id:ut.docId,_deleted:1},changes:[]};ut.doc&&(le.doc=ut.doc,le.changes.push({rev:ut.doc._rev})),K.push(le)}const ot=st(K);W.add(I(ot,R)),N=N+K.length;const wt={view:$.name,last_seq:Y.last_seq,results_count:K.length,indexed_docs:N};if($.sourceDB.emit("indexing",wt),$.sourceDB.activeTasks.update(O,{completed_items:N}),!(K.length<C.changes_batch_size))return X()}function st(Y){const tt=new Map;for(const K of Y){if(K.doc._id[0]!=="_"){T=[],A=K.doc,A._deleted||r($.sourceDB,V,A),T.sort(o);const ot=gt(T);tt.set(K.doc._id,[ot,K.changes])}R=K.seq}return tt}function gt(Y){const tt=new Map;let K;for(let ot=0,wt=Y.length;ot<wt;ot++){const ut=Y[ot],se=[ut.key,ut.id];ot>0&&Qt(ut.key,K)===0&&se.push(ot),tt.set(sn(se),ut),K=ut.key}return tt}try{await D(),await X(),await W.finish(),$.seq=R,$.sourceDB.activeTasks.remove(O)}catch(Y){$.sourceDB.activeTasks.remove(O,Y)}}function E($,C,T){T.group_level===0&&delete T.group_level;const A=T.group||T.group_level,O=n($.reduceFun),L=[],V=isNaN(T.group_level)?Number.POSITIVE_INFINITY:T.group_level;for(const R of C){const D=L[L.length-1];let I=A?R.key:null;if(A&&Array.isArray(I)&&(I=I.slice(0,V)),D&&Qt(D.groupKey,I)===0){D.keys.push([R.key,R.id]),D.values.push(R.value);continue}L.push({keys:[[R.key,R.id]],values:[R.value],groupKey:I})}C=[];for(const R of L){const D=s($.sourceDB,O,R.keys,R.values,!1);if(D.error&&D.error instanceof Lu)throw D.error;C.push({value:D.error?null:D.output,key:R.groupKey})}return{rows:a(C,T.limit,T.skip)}}function P($,C){return Ac(M($),function(){return B($,C)})()}async function B($,C){let T;const A=$.reduceFun&&C.reduce!==!1,O=C.skip||0;typeof C.keys<"u"&&!C.keys.length&&(C.limit=0,delete C.keys);async function L(R){R.include_docs=!0;const D=await $.db.allDocs(R);return T=D.total_rows,D.rows.map(function(I){if("value"in I.doc&&typeof I.doc.value=="object"&&I.doc.value!==null){const F=Object.keys(I.doc.value).sort(),W=["id","key","value"];if(!(F<W||F>W))return I.doc.value}const N=sx(I.doc._id);return{key:N[0],id:N[1],value:"value"in I.doc?I.doc.value:null}})}async function V(R){let D;if(A?D=E($,R,C):typeof C.keys>"u"?D={total_rows:T,offset:O,rows:R}:D={total_rows:T,offset:O,rows:a(R,C.limit,C.skip)},C.update_seq&&(D.update_seq=$.seq),C.include_docs){const I=_d(R.map(c)),N=await $.sourceDB.allDocs({keys:I,include_docs:!0,conflicts:C.conflicts,attachments:C.attachments,binary:C.binary}),F=new Map;for(const W of N.rows)F.set(W.id,W.doc);for(const W of R){const X=c(W),et=F.get(X);et&&(W.doc=et)}}return D}if(typeof C.keys<"u"){const D=C.keys.map(function(F){const W={startkey:sn([F]),endkey:sn([F,{}])};return C.update_seq&&(W.update_seq=!0),L(W)}),N=(await Promise.all(D)).flat();return V(N)}else{const R={descending:C.descending};C.update_seq&&(R.update_seq=!0);let D,I;if("start_key"in C&&(D=C.start_key),"startkey"in C&&(D=C.startkey),"end_key"in C&&(I=C.end_key),"endkey"in C&&(I=C.endkey),typeof D<"u"&&(R.startkey=C.descending?sn([D,{}]):sn([D])),typeof I<"u"){let F=C.inclusive_end!==!1;C.descending&&(F=!F),R.endkey=sn(F?[I,{}]:[I])}if(typeof C.key<"u"){const F=sn([C.key]),W=sn([C.key,{}]);R.descending?(R.endkey=F,R.startkey=W):(R.startkey=F,R.endkey=W)}A||(typeof C.limit=="number"&&(R.limit=C.limit),R.skip=O);const N=await L(R);return V(N)}}async function j($){return(await $.fetch("_view_cleanup",{headers:new jo({"Content-Type":"application/json"}),method:"POST"})).json()}async function H($){try{const C=await $.get("_local/"+e),T=new Map;for(const D of Object.keys(C.views)){const I=Tc(D),N="_design/"+I[0],F=I[1];let W=T.get(N);W||(W=new Set,T.set(N,W)),W.add(F)}const A={keys:Ec(T),include_docs:!0},O=await $.allDocs(A),L={};for(const D of O.rows){const I=D.key.substring(8);for(const N of T.get(D.key)){let F=I+"/"+N;C.views[F]||(F=N);const W=Object.keys(C.views[F]),X=D.doc&&D.doc.views&&D.doc.views[N];for(const et of W)L[et]=L[et]||X}}const R=Object.keys(L).filter(function(D){return!L[D]}).map(function(D){return Ac(M(D),function(){return new $.constructor(D,$.__opts).destroy()})()});return Promise.all(R).then(function(){return{ok:!0}})}catch(C){if(C.status===404)return{ok:!0};throw C}}async function Q($,C,T){if(typeof $._query=="function")return _($,C,T);if(er($))return b($,C,T);const A={changes_batch_size:$.__opts.view_update_changes_batch_size||_x};if(typeof C!="string")return w(T,C),xd.add(async function(){const O=await bd($,"temp_view/temp_view",C.map,C.reduce,!0,e);return mx(k(O,A).then(function(){return P(O,T)}),function(){return O.db.destroy()})}),xd.finish();{const O=C,L=Tc(O),V=L[0],R=L[1],D=await $.get("_design/"+V);if(C=D.views&&D.views[R],!C)throw new Ru(`ddoc ${D._id} has no view named ${R}`);i(D,R),w(T,C);const I=await bd($,O,C.map,C.reduce,!1,e);return T.stale==="ok"||T.stale==="update_after"?(T.stale==="update_after"&&Dl(function(){k(I,A)}),P(I,T)):(await k(I,A),P(I,T))}}function J($,C,T){const A=this;typeof C=="function"&&(T=C,C={}),C=C?f(C):{},typeof $=="function"&&($={map:$});const O=Promise.resolve().then(function(){return Q(A,$,C)});return gg(O,T),O}const U=gx(function(){const $=this;return typeof $._viewCleanup=="function"?y($):er($)?j($):H($)});return{query:J,viewCleanup:U}}function Js(e,t){for(var n=e,i=0,r=t.length;i<r;i++){var s=t[i];if(n=n[s],!n)break}return n}function wx(e,t,n){for(var i=0,r=t.length;i<r-1;i++){var s=t[i];e=e[s]=e[s]||{}}e[t[r-1]]=n}function Bu(e,t){return e<t?-1:e>t?1:0}function cr(e){for(var t=[],n="",i=0,r=e.length;i<r;i++){var s=e[i];i>0&&e[i-1]==="\\"&&(s==="$"||s===".")?n=n.substring(0,n.length-1)+s:s==="."?(t.push(n),n=""):n+=s}return t.push(n),t}var xx=["$or","$nor","$not"];function mg(e){return xx.indexOf(e)>-1}function We(e){return Object.keys(e)[0]}function Nu(e){return e[We(e)]}function Bs(e){var t={},n={$or:!0,$nor:!0};return e.forEach(function(i){Object.keys(i).forEach(function(r){var s=i[r];if(typeof s!="object"&&(s={$eq:s}),mg(r))if(s instanceof Array){if(n[r]){n[r]=!1,t[r]=s;return}var o=[];t[r].forEach(function(c){Object.keys(s).forEach(function(l){var h=s[l],u=Math.max(Object.keys(c).length,Object.keys(h).length),d=Bs([c,h]);Object.keys(d).length<=u||o.push(d)})}),t[r]=o}else t[r]=Bs([s]);else{var a=t[r]=t[r]||{};Object.keys(s).forEach(function(c){var l=s[c];if(c==="$gt"||c==="$gte")return kx(c,l,a);if(c==="$lt"||c==="$lte")return Sx(c,l,a);if(c==="$ne")return Cx(l,a);if(c==="$eq")return $x(l,a);if(c==="$regex")return Mx(l,a);a[c]=l})}})}),t}function kx(e,t,n){typeof n.$eq<"u"||(typeof n.$gte<"u"?e==="$gte"?t>n.$gte&&(n.$gte=t):t>=n.$gte&&(delete n.$gte,n.$gt=t):typeof n.$gt<"u"?e==="$gte"?t>n.$gt&&(delete n.$gt,n.$gte=t):t>n.$gt&&(n.$gt=t):n[e]=t)}function Sx(e,t,n){typeof n.$eq<"u"||(typeof n.$lte<"u"?e==="$lte"?t<n.$lte&&(n.$lte=t):t<=n.$lte&&(delete n.$lte,n.$lt=t):typeof n.$lt<"u"?e==="$lte"?t<n.$lt&&(delete n.$lt,n.$lte=t):t<n.$lt&&(n.$lt=t):n[e]=t)}function Cx(e,t){"$ne"in t?t.$ne.push(e):t.$ne=[e]}function $x(e,t){delete t.$gt,delete t.$gte,delete t.$lt,delete t.$lte,delete t.$ne,t.$eq=e}function Mx(e,t){"$regex"in t?t.$regex.push(e):t.$regex=[e]}function vg(e){for(var t in e){if(Array.isArray(e))for(var n in e)e[n].$and&&(e[n]=Bs(e[n].$and));var i=e[t];typeof i=="object"&&vg(i)}return e}function _g(e,t){for(var n in e){n==="$and"&&(t=!0);var i=e[n];typeof i=="object"&&(t=_g(i,t))}return t}function zu(e){var t=tr(e);_g(t,!1)&&(t=vg(t),"$and"in t&&(t=Bs(t.$and))),["$or","$nor"].forEach(function(o){o in t&&t[o].forEach(function(a){for(var c=Object.keys(a),l=0;l<c.length;l++){var h=c[l],u=a[h];(typeof u!="object"||u===null)&&(a[h]={$eq:u})}})}),"$not"in t&&(t.$not=Bs([t.$not]));for(var n=Object.keys(t),i=0;i<n.length;i++){var r=n[i],s=t[r];(typeof s!="object"||s===null)&&(s={$eq:s}),t[r]=s}return Il(t),t}function Il(e){Object.keys(e).forEach(function(t){var n=e[t];Array.isArray(n)?n.forEach(function(i){i&&typeof i=="object"&&Il(i)}):t==="$ne"?e.$ne=[n]:t==="$regex"?e.$regex=[n]:n&&typeof n=="object"&&Il(n)})}function Ax(e){function t(n){return e.map(function(i){var r=We(i),s=cr(r),o=Js(n,s);return o})}return function(n,i){var r=t(n.doc),s=t(i.doc),o=Qt(r,s);return o!==0?o:Bu(n.doc._id,i.doc._id)}}function yg(e,t,n){if(e=e.filter(function(o){return Dr(o.doc,t.selector,n)}),t.sort){var i=Ax(t.sort);e=e.sort(i),typeof t.sort[0]!="string"&&Nu(t.sort[0])==="desc"&&(e=e.reverse())}if("limit"in t||"skip"in t){var r=t.skip||0,s=("limit"in t?t.limit:e.length)+r;e=e.slice(r,s)}return e}function Dr(e,t,n){return n.every(function(i){var r=t[i],s=cr(i),o=Js(e,s);return mg(i)?Ex(i,r,e):ga(r,e,s,o)})}function ga(e,t,n,i){return e?typeof e=="object"?Object.keys(e).every(function(r){var s=e[r];if(r.indexOf("$")===0)return Sd(r,t,s,n,i);var o=cr(r);if(i===void 0&&typeof s!="object"&&o.length>0)return!1;var a=Js(i,o);return typeof s=="object"?ga(s,t,n,a):Sd("$eq",t,s,o,a)}):e===i:!0}function Ex(e,t,n){return e==="$or"?t.some(function(i){return Dr(n,i,Object.keys(i))}):e==="$not"?!Dr(n,t,Object.keys(t)):!t.find(function(i){return Dr(n,i,Object.keys(i))})}function Sd(e,t,n,i,r){if(!$d[e])throw new Error('unknown operator "'+e+'" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');return $d[e](t,n,i,r)}function es(e){return typeof e<"u"&&e!==null}function Si(e){return typeof e<"u"}function Tx(e,t){if(typeof e!="number"||parseInt(e,10)!==e)return!1;var n=t[0],i=t[1];return e%n===i}function Cd(e,t){return t.some(function(n){return e instanceof Array?e.some(function(i){return Qt(n,i)===0}):Qt(n,e)===0})}function Dx(e,t){return t.every(function(n){return e.some(function(i){return Qt(n,i)===0})})}function Ox(e,t){return e.length===t}function Px(e,t){var n=new RegExp(t);return n.test(e)}function Ix(e,t){switch(t){case"null":return e===null;case"boolean":return typeof e=="boolean";case"number":return typeof e=="number";case"string":return typeof e=="string";case"array":return e instanceof Array;case"object":return{}.toString.call(e)==="[object Object]"}}var $d={$elemMatch:function(e,t,n,i){return!Array.isArray(i)||i.length===0?!1:typeof i[0]=="object"&&i[0]!==null?i.some(function(r){return Dr(r,t,Object.keys(t))}):i.some(function(r){return ga(t,e,n,r)})},$allMatch:function(e,t,n,i){return!Array.isArray(i)||i.length===0?!1:typeof i[0]=="object"&&i[0]!==null?i.every(function(r){return Dr(r,t,Object.keys(t))}):i.every(function(r){return ga(t,e,n,r)})},$eq:function(e,t,n,i){return Si(i)&&Qt(i,t)===0},$gte:function(e,t,n,i){return Si(i)&&Qt(i,t)>=0},$gt:function(e,t,n,i){return Si(i)&&Qt(i,t)>0},$lte:function(e,t,n,i){return Si(i)&&Qt(i,t)<=0},$lt:function(e,t,n,i){return Si(i)&&Qt(i,t)<0},$exists:function(e,t,n,i){return t?Si(i):!Si(i)},$mod:function(e,t,n,i){return es(i)&&Tx(i,t)},$ne:function(e,t,n,i){return t.every(function(r){return Qt(i,r)!==0})},$in:function(e,t,n,i){return es(i)&&Cd(i,t)},$nin:function(e,t,n,i){return es(i)&&!Cd(i,t)},$size:function(e,t,n,i){return es(i)&&Array.isArray(i)&&Ox(i,t)},$all:function(e,t,n,i){return Array.isArray(i)&&Dx(i,t)},$regex:function(e,t,n,i){return es(i)&&typeof i=="string"&&t.every(function(r){return Px(i,r)})},$type:function(e,t,n,i){return Ix(i,t)}};function Ha(e,t){if(typeof t!="object")throw new Error("Selector error: expected a JSON object");t=zu(t);var n={doc:e},i=yg([n],{selector:t},Object.keys(t));return i&&i.length===1}const Rx=(...e)=>e.flat(1/0),bg=(...e)=>{let t=[];for(const n of e)Array.isArray(n)?t=t.concat(bg(...n)):t.push(n);return t},wg=typeof Array.prototype.flat=="function"?Rx:bg;function ju(e){const t={};for(const n of e)Object.assign(t,n);return t}function Lx(e,t){const n={};for(const i of t){const r=cr(i),s=Js(e,r);typeof s<"u"&&wx(n,r,s)}return n}function xg(e,t){for(let n=0,i=Math.min(e.length,t.length);n<i;n++)if(e[n]!==t[n])return!1;return!0}function Bx(e,t){return e.length>t.length?!1:xg(e,t)}function Nx(e,t){e=e.slice();for(const n of t){if(!e.length)break;const i=e.indexOf(n);if(i===-1)return!1;e.splice(i,1)}return!0}function zx(e){const t={};for(const n of e)t[n]=!0;return t}function jx(e,t){let n=null,i=-1;for(const r of e){const s=t(r);s>i&&(i=s,n=r)}return n}function Md(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Fx(e){return Array.from(new Set(e))}function Zs(e){return function(...t){const n=t[t.length-1];if(typeof n=="function"){const i=n.bind(null,null),r=n.bind(null);e.apply(this,t.slice(0,-1)).then(i,r)}else return e.apply(this,t)}}function kg(e){e=tr(e),e.index||(e.index={});for(const t of["type","name","ddoc"])e.index[t]&&(e[t]=e.index[t],delete e.index[t]);return e.fields&&(e.index.fields=e.fields,delete e.fields),e.type||(e.type="json"),e}function ma(e){return typeof e=="object"&&e!==null}function qx(e,t,n){let i="",r=t,s=!0;if(["$in","$nin","$or","$and","$mod","$nor","$all"].indexOf(e)!==-1&&(Array.isArray(t)||(i="Query operator "+e+" must be an array.")),["$not","$elemMatch","$allMatch"].indexOf(e)!==-1&&(!Array.isArray(t)&&ma(t)||(i="Query operator "+e+" must be an object.")),e==="$mod"&&Array.isArray(t))if(t.length!==2)i="Query operator $mod must be in the format [divisor, remainder], where divisor and remainder are both integers.";else{const o=t[0],a=t[1];o===0&&(i="Query operator $mod's divisor cannot be 0, cannot divide by zero.",s=!1),(typeof o!="number"||parseInt(o,10)!==o)&&(i="Query operator $mod's divisor is not an integer.",r=o),parseInt(a,10)!==a&&(i="Query operator $mod's remainder is not an integer.",r=a)}if(e==="$exists"&&typeof t!="boolean"&&(i="Query operator $exists must be a boolean."),e==="$type"){const o=["null","boolean","number","string","array","object"],a='"'+o.slice(0,o.length-1).join('", "')+'", or "'+o[o.length-1]+'"';(typeof t!="string"||o.indexOf(t)==-1)&&(i="Query operator $type must be a string. Supported values: "+a+".")}if(e==="$size"&&parseInt(t,10)!==t&&(i="Query operator $size must be a integer."),e==="$regex"&&typeof t!="string"&&(n?i="Query operator $regex must be a string.":t instanceof RegExp||(i="Query operator $regex must be a string or an instance of a javascript regular expression.")),i){if(s){const o=r===null?" ":Array.isArray(r)?" array":" "+typeof r,a=ma(r)?JSON.stringify(r,null,"	"):r;i+=" Received"+o+": "+a}throw new Error(i)}}const Wx=["$all","$allMatch","$and","$elemMatch","$exists","$in","$mod","$nin","$nor","$not","$or","$regex","$size","$type"],Hx=["$in","$nin","$mod","$all"],Vx=["$eq","$gt","$gte","$lt","$lte"];function va(e,t){if(Array.isArray(e))for(const n of e)ma(n)&&va(n,t);else for(const[n,i]of Object.entries(e))Wx.indexOf(n)!==-1&&qx(n,i,t),Vx.indexOf(n)===-1&&Hx.indexOf(n)===-1&&ma(i)&&va(i,t)}async function to(e,t,n){n.body&&(n.body=JSON.stringify(n.body),n.headers=new jo({"Content-type":"application/json"}));const i=await e.fetch(t,n),r=await i.json();if(!i.ok){r.status=i.status;const s=Y1(r);throw Ml(s)}return r}async function Ux(e,t){return await to(e,"_index",{method:"POST",body:kg(t)})}async function Kx(e,t){return va(t.selector,!0),await to(e,"_find",{method:"POST",body:t})}async function Yx(e,t){return await to(e,"_explain",{method:"POST",body:t})}async function Xx(e){return await to(e,"_index",{method:"GET"})}async function Gx(e,t){const n=t.ddoc,i=t.type||"json",r=t.name;if(!n)throw new Error("you must provide an index's ddoc");if(!r)throw new Error("you must provide an index's name");const s="_index/"+[n,i,r].map(encodeURIComponent).join("/");return await to(e,s,{method:"DELETE"})}function Sg(e,t){for(const n of t)if(e=e[n],e===void 0)return;return e}function Qx(e,t,n){return function(i){if(n&&!Ha(i,n))return;const r=[];for(const s of e){const o=Sg(i,cr(s));if(o===void 0)return;r.push(o)}t(r)}}function Jx(e,t,n){const i=cr(e);return function(r){if(n&&!Ha(r,n))return;const s=Sg(r,i);s!==void 0&&t(s)}}function Zx(e,t,n){return function(i){n&&!Ha(i,n)||t(i[e])}}function t2(e,t,n){return function(i){if(n&&!Ha(i,n))return;const r=e.map(s=>i[s]);t(r)}}function e2(e){return e.every(t=>t.indexOf(".")===-1)}function n2(e,t,n){const i=e2(e),r=e.length===1;return i?r?Zx(e[0],t,n):t2(e,t,n):r?Jx(e[0],t,n):Qx(e,t,n)}function i2(e,t){const n=Object.keys(e.fields),i=e.partial_filter_selector;return n2(n,t,i)}function r2(){throw new Error("reduce not supported")}function s2(e,t){const n=e.views[t];if(!n.map||!n.map.fields)throw new Error("ddoc "+e._id+" with view "+t+" doesn't have map.fields defined. maybe it wasn't created by this plugin?")}const Dc=bx("indexes",i2,r2,s2);function Fu(e){return e._customFindAbstractMapper?{query:function(n,i){const r=Dc.query.bind(this);return e._customFindAbstractMapper.query.call(this,n,i,r)},viewCleanup:function(){const n=Dc.viewCleanup.bind(this);return e._customFindAbstractMapper.viewCleanup.call(this,n)}}:Dc}function o2(e){if(!Array.isArray(e))throw new Error("invalid sort json - should be an array");return e.map(function(t){if(typeof t=="string"){const n={};return n[t]="asc",n}else return t})}const a2=/^_design\//;function c2(e){let t=[];return typeof e=="string"?t.push(e):t=e,t.map(function(n){return n.replace(a2,"")})}function Cg(e){return e.fields=e.fields.map(function(t){if(typeof t=="string"){const n={};return n[t]="asc",n}return t}),e.partial_filter_selector&&(e.partial_filter_selector=zu(e.partial_filter_selector)),e}function l2(e,t){return t.def.fields.map(n=>{const i=We(n);return Js(e,cr(i))})}function u2(e,t,n){const i=n.def.fields;let r=0;for(const s of e){let o=l2(s.doc,n);if(i.length===1)o=o[0];else for(;o.length>t.length;)o.pop();if(Math.abs(Qt(o,t))>0)break;++r}return r>0?e.slice(r):e}function h2(e){const t=tr(e);return delete t.startkey,delete t.endkey,delete t.inclusive_start,delete t.inclusive_end,"endkey"in e&&(t.startkey=e.endkey),"startkey"in e&&(t.endkey=e.startkey),"inclusive_start"in e&&(t.inclusive_end=e.inclusive_start),"inclusive_end"in e&&(t.inclusive_start=e.inclusive_end),t}function d2(e){const t=e.fields.filter(function(n){return Nu(n)==="asc"});if(t.length!==0&&t.length!==e.fields.length)throw new Error("unsupported mixed sorting")}function f2(e,t){if(t.defaultUsed&&e.sort){const n=e.sort.filter(function(i){return Object.keys(i)[0]!=="_id"}).map(function(i){return Object.keys(i)[0]});if(n.length>0)throw new Error('Cannot sort on field(s) "'+n.join(",")+'" when using the default index')}t.defaultUsed}function p2(e){if(typeof e.selector!="object")throw new Error("you must provide a selector when you find()")}function g2(e,t){const n=Object.keys(e),i=t?t.map(We):[];let r;return n.length>=i.length?r=n:r=i,i.length===0?{fields:r}:(r=r.sort(function(s,o){let a=i.indexOf(s);a===-1&&(a=Number.MAX_VALUE);let c=i.indexOf(o);return c===-1&&(c=Number.MAX_VALUE),a<c?-1:a>c?1:0}),{fields:r,sortOrder:t.map(We)})}async function m2(e,t){t=kg(t);const n=tr(t.index);t.index=Cg(t.index),d2(t.index);let i;function r(){return i||(i=fg(JSON.stringify(t)))}const s=t.name||"idx-"+r(),o=t.ddoc||"idx-"+r(),a="_design/"+o;let c=!1,l=!1;function h(d){return d._rev&&d.language!=="query"&&(c=!0),d.language="query",d.views=d.views||{},l=!!d.views[s],l?!1:(d.views[s]={map:{fields:ju(t.index.fields),partial_filter_selector:t.index.partial_filter_selector},reduce:"_count",options:{def:n}},d)}if(e.constructor.emit("debug",["find","creating index",a]),await Wa(e,a,h),c)throw new Error('invalid language for ddoc with id "'+a+'" (should be "query")');const u=o+"/"+s;return await Fu(e).query.call(e,u,{limit:0,reduce:!1}),{id:a,name:s,result:l?"exists":"created"}}async function $g(e){const t=await e.allDocs({startkey:"_design/",endkey:"_design/￿",include_docs:!0}),n={indexes:[{ddoc:null,name:"_all_docs",type:"special",def:{fields:[{_id:"asc"}]}}]};return n.indexes=wg(n.indexes,t.rows.filter(function(i){return i.doc.language==="query"}).map(function(i){return(i.doc.views!==void 0?Object.keys(i.doc.views):[]).map(function(s){const o=i.doc.views[s];return{ddoc:i.id,name:s,type:"json",def:Cg(o.options.def)}})})),n.indexes.sort(function(i,r){return Bu(i.name,r.name)}),n.total_rows=n.indexes.length,n}const _a=null,Rl={"￿":{}},v2={queryOpts:{limit:0,startkey:Rl,endkey:_a},inMemoryFields:[]};function _2(e,t){return e.def.fields.some(n=>We(n)===t)}function y2(e,t){const n=e[t];return We(n)!=="$eq"}function Mg(e,t){const n=t.def.fields.map(We);return e.slice().sort(function(i,r){let s=n.indexOf(i),o=n.indexOf(r);return s===-1&&(s=Number.MAX_VALUE),o===-1&&(o=Number.MAX_VALUE),Bu(s,o)})}function b2(e,t,n){n=Mg(n,e);let i=!1;for(let r=0,s=n.length;r<s;r++){const o=n[r];if(i||!_2(e,o))return n.slice(r);r<s-1&&y2(t,o)&&(i=!0)}return[]}function w2(e){const t=[];for(const[n,i]of Object.entries(e))for(const r of Object.keys(i))r==="$ne"&&t.push(n);return t}function x2(e,t,n,i){const r=wg(e,b2(t,n,i),w2(n));return Mg(Fx(r),t)}function k2(e,t,n){if(t){const i=Bx(t,e),r=xg(n,e);return i&&r}return Nx(n,e)}const S2=["$eq","$gt","$gte","$lt","$lte"];function Ag(e){return S2.indexOf(e)===-1}function C2(e,t){const n=e[0],i=t[n];return typeof i>"u"?!0:!(Object.keys(i).length===1&&We(i)==="$ne")}function $2(e,t,n,i){const r=e.def.fields.map(We);return k2(r,t,n)?C2(r,i):!1}function M2(e,t,n,i){return i.filter(function(r){return $2(r,n,t,e)})}function A2(e,t,n,i,r){const s=M2(e,t,n,i);if(s.length===0){if(r)throw{error:"no_usable_index",message:"There is no index available for this selector."};const c=i[0];return c.defaultUsed=!0,c}if(s.length===1&&!r)return s[0];const o=zx(t);function a(c){const l=c.def.fields.map(We);let h=0;for(const u of l)o[u]&&h++;return h}if(r){const c="_design/"+r[0],l=r.length===2?r[1]:!1,h=s.find(function(u){return!!(l&&u.ddoc===c&&l===u.name||u.ddoc===c)});if(!h)throw{error:"unknown_error",message:"Could not find that index or could not use that index for the query"};return h}return jx(s,a)}function E2(e,t){switch(e){case"$eq":return{key:t};case"$lte":return{endkey:t};case"$gte":return{startkey:t};case"$lt":return{endkey:t,inclusive_end:!1};case"$gt":return{startkey:t,inclusive_start:!1}}return{startkey:_a}}function T2(e,t){const n=We(t.def.fields[0]),i=e[n]||{},r=[],s=Object.keys(i);let o;for(const a of s){Ag(a)&&r.push(n);const c=i[a],l=E2(a,c);o?o=ju([o,l]):o=l}return{queryOpts:o,inMemoryFields:r}}function D2(e,t){switch(e){case"$eq":return{startkey:t,endkey:t};case"$lte":return{endkey:t};case"$gte":return{startkey:t};case"$lt":return{endkey:t,inclusive_end:!1};case"$gt":return{startkey:t,inclusive_start:!1}}}function O2(e,t){const n=t.def.fields.map(We);let i=[];const r=[],s=[];let o,a;function c(h){o!==!1&&r.push(_a),a!==!1&&s.push(Rl),i=n.slice(h)}for(let h=0,u=n.length;h<u;h++){const d=n[h],f=e[d];if(!f||!Object.keys(f).length){c(h);break}else if(Object.keys(f).some(Ag)){c(h);break}else if(h>0){const b="$gt"in f||"$gte"in f||"$lt"in f||"$lte"in f,_=Object.keys(e[n[h-1]]),y=Md(_,["$eq"]),g=Md(_,Object.keys(f));if(b&&!y&&!g){c(h);break}}const v=Object.keys(f);let w=null;for(const b of v){const _=f[b],y=D2(b,_);w?w=ju([w,y]):w=y}r.push("startkey"in w?w.startkey:_a),s.push("endkey"in w?w.endkey:Rl),"inclusive_start"in w&&(o=w.inclusive_start),"inclusive_end"in w&&(a=w.inclusive_end)}const l={startkey:r,endkey:s};return typeof o<"u"&&(l.inclusive_start=o),typeof a<"u"&&(l.inclusive_end=a),{queryOpts:l,inMemoryFields:i}}function P2(e){return Object.keys(e).map(function(n){return e[n]}).some(function(n){return typeof n=="object"&&Object.keys(n).length===0})}function I2(e){return{queryOpts:{startkey:null},inMemoryFields:[Object.keys(e)]}}function R2(e,t){return t.defaultUsed?I2(e):t.def.fields.length===1?T2(e,t):O2(e,t)}function L2(e,t){const n=e.selector,i=e.sort;if(P2(n))return Object.assign({},v2,{index:t[0]});const r=g2(n,i),s=r.fields,o=r.sortOrder,a=A2(n,s,o,t,e.use_index),c=R2(n,a),l=c.queryOpts,h=c.inMemoryFields,u=x2(h,a,n,s);return{queryOpts:l,index:a,inMemoryFields:u}}function B2(e){return e.ddoc.substring(8)+"/"+e.name}async function N2(e,t){const n=tr(t);n.descending?("endkey"in n&&typeof n.endkey!="string"&&(n.endkey=""),"startkey"in n&&typeof n.startkey!="string"&&(n.limit=0)):("startkey"in n&&typeof n.startkey!="string"&&(n.startkey=""),"endkey"in n&&typeof n.endkey!="string"&&(n.limit=0)),"key"in n&&typeof n.key!="string"&&(n.limit=0),n.limit>0&&n.indexes_count&&(n.original_limit=n.limit,n.limit+=n.indexes_count);const i=await e.allDocs(n);return i.rows=i.rows.filter(function(r){return!/^_design\//.test(r.id)}),n.original_limit&&(n.limit=n.original_limit),i.rows=i.rows.slice(0,n.limit),i}async function z2(e,t,n){return n.name==="_all_docs"?N2(e,t):Fu(e).query.call(e,B2(n),t)}async function Eg(e,t,n){t.selector&&(va(t.selector,!1),t.selector=zu(t.selector)),t.sort&&(t.sort=o2(t.sort)),t.use_index&&(t.use_index=c2(t.use_index)),"limit"in t||(t.limit=25),p2(t);const i=await $g(e);e.constructor.emit("debug",["find","planning query",t]);const r=L2(t,i.indexes);e.constructor.emit("debug",["find","query plan",r]);const s=r.index;f2(t,s);let o=Object.assign({include_docs:!0,reduce:!1,indexes_count:i.total_rows},r.queryOpts);if("startkey"in o&&"endkey"in o&&Qt(o.startkey,o.endkey)>0)return{docs:[]};if(t.sort&&typeof t.sort[0]!="string"&&Nu(t.sort[0])==="desc"&&(o.descending=!0,o=h2(o)),r.inMemoryFields.length||(o.limit=t.limit,"skip"in t&&(o.skip=t.skip)),n)return Promise.resolve(r,o);const c=await z2(e,o,s);o.inclusive_start===!1&&(c.rows=u2(c.rows,o.startkey,s)),r.inMemoryFields.length&&(c.rows=yg(c.rows,t,r.inMemoryFields));const l={docs:c.rows.map(function(h){const u=h.doc;return t.fields?Lx(u,t.fields):u})};return s.defaultUsed&&(l.warning="No matching index found, create an index to optimize query time."),l}async function j2(e,t){const n=await Eg(e,t,!0);return{dbname:e.name,index:n.index,selector:t.selector,range:{start_key:n.queryOpts.startkey,end_key:n.queryOpts.endkey},opts:{use_index:t.use_index||[],bookmark:"nil",limit:t.limit,skip:t.skip,sort:t.sort||{},fields:t.fields,conflicts:!1,r:[49]},limit:t.limit,skip:t.skip||0,fields:t.fields}}async function F2(e,t){if(!t.ddoc)throw new Error("you must supply an index.ddoc when deleting");if(!t.name)throw new Error("you must supply an index.name when deleting");const n=t.ddoc,i=t.name;function r(s){return Object.keys(s.views).length===1&&s.views[i]?{_id:n,_deleted:!0}:(delete s.views[i],s)}return await Wa(e,n,r),await Fu(e).viewCleanup.apply(e),{ok:!0}}const Kr={};Kr.createIndex=Zs(async function(e){if(typeof e!="object")throw new Error("you must provide an index to create");return(er(this)?Ux:m2)(this,e)});Kr.find=Zs(async function(e){if(typeof e!="object")throw new Error("you must provide search parameters to find()");return(er(this)?Kx:Eg)(this,e)});Kr.explain=Zs(async function(e){if(typeof e!="object")throw new Error("you must provide search parameters to explain()");return(er(this)?Yx:j2)(this,e)});Kr.getIndexes=Zs(async function(){return(er(this)?Xx:$g)(this)});Kr.deleteIndex=Zs(async function(e){if(typeof e!="object")throw new Error("you must provide an index to delete");return(er(this)?Gx:F2)(this,e)});ct.plugin(Kr);class An{#t;#e;constructor(t,n){this.#t=t,this.#e=n}get raw(){return this.#t}get docType(){return this.#e}async get(t){return this.#t.get(t)}async put(t){return this.#t.put({...t,docType:this.#e})}async bulkDocs(t){return this.#t.bulkDocs(t.map(n=>({...n,docType:this.#e})))}async remove(t){return this.#t.remove(t)}async find(t){return await this.#t.find({limit:Number.MAX_SAFE_INTEGER,...t,selector:{...t.selector,docType:this.#e}})}async allDocs(t){const i=(await this.#t.find({selector:{docType:this.#e},limit:Number.MAX_SAFE_INTEGER})).docs;return{offset:0,total_rows:i.length,rows:i.map(r=>({id:r._id,key:r._id,value:{rev:r._rev},doc:r}))}}async createIndex(t){return this.#t.createIndex({index:{fields:["docType",...t.index.fields]}})}}function q2(e){const t="budgee",n=new ct(t,{});return{transactions:new An(n,"transaction"),tags:new An(n,"tag"),merchants:new An(n,"merchant"),accounts:new An(n,"account"),merchantRules:new An(n,"merchantRule"),dashboardCharts:new An(n,"dashboardChart"),dashboardTables:new An(n,"dashboardTable"),meta:new An(n,"meta"),backups:new An(n,"backup")}}function Tg(e){return e.transactions.raw}async function W2(e){await Tg(e).createIndex({index:{fields:["docType"]}}),await e.transactions.createIndex({index:{fields:["merchantId"]}}),await e.transactions.createIndex({index:{fields:["accountId"]}}),await e.tags.createIndex({index:{fields:["name"]}}),await e.merchants.createIndex({index:{fields:["name"]}})}const G=q2();W2(G);async function Ot(e){return(await e.allDocs({include_docs:!0})).rows.map(n=>n.doc).filter(n=>n!==void 0&&!n._id.startsWith("_design/"))}async function Pe(e){const t=await Ot(e);await e.bulkDocs(t.map(n=>({...n,_deleted:!0})))}function Ci(e){return e.map(({_rev:t,...n})=>n)}async function Dg(e){const t=await e.text(),n=JSON.parse(t),{migrateExport:i}=await Hi(async()=>{const{migrateExport:o}=await Promise.resolve().then(()=>Oc);return{migrateExport:o}},void 0),r=i(n);await Pe(G.transactions),await Pe(G.tags),await Pe(G.merchants),await Pe(G.accounts),await Pe(G.merchantRules),await Pe(G.dashboardCharts),await Pe(G.dashboardTables),r.transactions?.length&&await G.transactions.bulkDocs(Ci(r.transactions)),r.tags?.length&&await G.tags.bulkDocs(Ci(r.tags)),r.merchants?.length&&await G.merchants.bulkDocs(Ci(r.merchants)),r.accounts?.length&&await G.accounts.bulkDocs(Ci(r.accounts)),r.merchantRules?.length&&await G.merchantRules.bulkDocs(Ci(r.merchantRules)),r.dashboardCharts?.length&&await G.dashboardCharts.bulkDocs(Ci(r.dashboardCharts)),r.dashboardTables?.length&&await G.dashboardTables.bulkDocs(Ci(r.dashboardTables));const s=G.meta;try{const o=await s.get("schema_version");await s.put({...o,value:(await Hi(async()=>{const{LATEST_VERSION:a}=await Promise.resolve().then(()=>Oc);return{LATEST_VERSION:a}},void 0)).LATEST_VERSION})}catch{const{LATEST_VERSION:o}=await Hi(async()=>{const{LATEST_VERSION:a}=await Promise.resolve().then(()=>Oc);return{LATEST_VERSION:a}},void 0);await s.put({_id:"schema_version",value:o})}}function Ie(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=new Uint8Array(16);crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const Ll="BudgeeDatabase",Og=["tags","merchants","accounts"],H2=[...Og,"transactions","merchantRules","dashboardCharts","dashboardTables"];function V2(e){return new Promise((t,n)=>{const i=indexedDB.open(e);i.onsuccess=()=>t(i.result),i.onerror=()=>n(i.error)})}function U2(e,t){return new Promise((n,i)=>{if(!e.objectStoreNames.contains(t)){n([]);return}const o=e.transaction(t,"readonly").objectStore(t).getAll();o.onsuccess=()=>n(o.result??[]),o.onerror=()=>i(o.error)})}function Pg(e){return new Promise(t=>{const n=indexedDB.open(e);let i=!0;n.onupgradeneeded=()=>{i=!1},n.onsuccess=()=>{n.result.close(),i||indexedDB.deleteDatabase(e),t(i)},n.onerror=()=>t(!1)})}async function K2(){if(!await Pg(Ll))return null;const t=await V2(Ll),n={};for(const i of H2)n[i]=await U2(t,i);return t.close(),{version:0,...n}}function Y2(){indexedDB.deleteDatabase(Ll)}function ns(e,t){if(typeof t=="number")return e.get(t)}function _o(e,t){return Array.isArray(t)?t.map(n=>e.get(n)).filter(n=>n!=null):[]}function Ig(e){const t=e,n={};for(const u of Og){const d=new Map;for(const f of t[u]??[])d.set(f.id,Ie());n[u]=d}const i=(u,d)=>u.map(f=>{const{id:v,...w}=f;return{...w,_id:d.get(v)}}),r=i(t.tags??[],n.tags),s=i(t.merchants??[],n.merchants),o=i(t.accounts??[],n.accounts),a=(t.transactions??[]).map(u=>{const{id:d,merchantId:f,accountId:v,tagIds:w,...b}=u;return{...b,_id:Ie(),merchantId:ns(n.merchants,f),accountId:ns(n.accounts,v),tagIds:_o(n.tags,w)}}),c=(t.merchantRules??[]).map(u=>{const{id:d,merchantId:f,tagIds:v,...w}=u;return{...w,_id:Ie(),merchantId:ns(n.merchants,f),tagIds:_o(n.tags,v)}}),l=(t.dashboardCharts??[]).map(u=>{const{id:d,tagId:f,merchantId:v,excludedTagIds:w,excludedMerchantIds:b,..._}=u;return{..._,_id:Ie(),tagId:ns(n.tags,f),merchantId:ns(n.merchants,v),excludedTagIds:_o(n.tags,w),excludedMerchantIds:_o(n.merchants,b)}}),h=(t.dashboardTables??[]).map(u=>{const{id:d,...f}=u;return{...f,_id:Ie()}});return{version:1,transactions:a,tags:r,merchants:s,accounts:o,merchantRules:c,dashboardCharts:l,dashboardTables:h}}const X2=Object.freeze(Object.defineProperty({__proto__:null,databaseExists:Pg,deleteDexieDatabase:Y2,migrateV0toV1:Ig,readDexieData:K2},Symbol.toStringTag,{value:"Module"})),Rg=[Ig],Ui=Rg.length;function Lg(e){let t=e.version??1,n=e;for(;t<Ui;)n=Rg[t](n),t=n.version??t+1;return n}function $i(e){return e.map(({_rev:t,...n})=>n)}async function G2(e){return{version:Ui,transactions:$i(await Ot(e.transactions)),tags:$i(await Ot(e.tags)),merchants:$i(await Ot(e.merchants)),accounts:$i(await Ot(e.accounts)),merchantRules:$i(await Ot(e.merchantRules)),dashboardCharts:$i(await Ot(e.dashboardCharts)),dashboardTables:$i(await Ot(e.dashboardTables))}}async function Q2(e,t){const n=`backup_${new Date().toISOString()}`;await e.backups.put({_id:n,...t})}async function J2(e){try{return(await e.meta.get("schema_version")).value}catch{return null}}async function Bg(e,t){try{const n=await e.meta.get("schema_version");await e.meta.put({...n,value:t})}catch{await e.meta.put({_id:"schema_version",value:t})}}async function Z2(e,t){await Pe(e.transactions),await Pe(e.tags),await Pe(e.merchants),await Pe(e.accounts),await Pe(e.merchantRules),await Pe(e.dashboardCharts),await Pe(e.dashboardTables),t.transactions?.length&&await e.transactions.bulkDocs(t.transactions),t.tags?.length&&await e.tags.bulkDocs(t.tags),t.merchants?.length&&await e.merchants.bulkDocs(t.merchants),t.accounts?.length&&await e.accounts.bulkDocs(t.accounts),t.merchantRules?.length&&await e.merchantRules.bulkDocs(t.merchantRules),t.dashboardCharts?.length&&await e.dashboardCharts.bulkDocs(t.dashboardCharts),t.dashboardTables?.length&&await e.dashboardTables.bulkDocs(t.dashboardTables)}const tk=["budgee_transactions","budgee_tags","budgee_merchants","budgee_accounts","budgee_merchant_rules","budgee_dashboard_charts","budgee_dashboard_tables"],ek={budgee_transactions:"transactions",budgee_tags:"tags",budgee_merchants:"merchants",budgee_accounts:"accounts",budgee_merchant_rules:"merchantRules",budgee_dashboard_charts:"dashboardCharts",budgee_dashboard_tables:"dashboardTables"};async function nk(e){const t=new ct("budgee_meta");let n=!1;try{if((await t.allDocs({include_docs:!0})).rows.length===0)return!1;n=!0,console.log("[migrate] Found old multi-database layout, migrating to single database");try{const o=(await t.get("schema_version")).value;await Bg(e,o)}catch{}for(const s of tk){const o=ek[s],a=new ct(s);try{const l=(await a.allDocs({include_docs:!0})).rows.filter(h=>h.doc&&!h.id.startsWith("_design/")).map(h=>{const{_rev:u,...d}=h.doc;return d});l.length>0&&(await e[o].bulkDocs(l),console.log(`[migrate] Copied ${l.length} docs from ${s}`))}finally{await a.destroy()}}const r=new ct("budgee_backups");try{const o=(await r.allDocs({include_docs:!0})).rows.filter(a=>a.doc&&!a.id.startsWith("_design/")).map(a=>{const{_rev:c,...l}=a.doc;return l});o.length>0&&await e.backups.bulkDocs(o)}finally{await r.destroy()}await t.destroy(),console.log("[migrate] Old databases removed")}catch{try{await t.destroy()}catch{}return!1}return n}async function Ng(e){await nk(e);const{readDexieData:t,deleteDexieDatabase:n}=await Hi(async()=>{const{readDexieData:o,deleteDexieDatabase:a}=await Promise.resolve().then(()=>X2);return{readDexieData:o,deleteDexieDatabase:a}},void 0),i=await t(),r=await J2(e);if(!i&&r!=null&&r>=Ui)return;let s;i?(s=i,console.log("[migrate] Found Dexie data at version 0")):(s=await G2(e),s.version=r??1,console.log(`[migrate] Current data at version ${s.version}`)),(s.version??1)<Ui&&(await Q2(e,s),console.log("[migrate] Backup saved"),s=Lg(s),console.log(`[migrate] Migrated to version ${s.version}`),await Z2(e,s)),await Bg(e,Ui),i&&(n(),console.log("[migrate] Dexie database deleted")),console.log("[migrate] Migration complete")}const Oc=Object.freeze(Object.defineProperty({__proto__:null,LATEST_VERSION:Ui,migrateDatabase:Ng,migrateExport:Lg},Symbol.toStringTag,{value:"Module"}));async function ik(e){const t=await fetch(`${e}/budgee`);if(t.status===404)throw new Error("Database 'budgee' does not exist on the remote server");if(!t.ok)throw new Error(`Server returned ${t.status} ${t.statusText}`)}function rk(e){const t=Tg(G),n=new ct(`${e}/budgee`),i=t.sync(n,{live:!0,retry:!0});return()=>i.cancel()}const zg=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,sk=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ok=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-download"
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
  <path d="M12 15V3" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="m7 10 5 5 5-5" />
</svg>
`,ak=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ck=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,jg=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,lk=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,uk=`<!-- @license lucide-static v0.564.0 - ISC -->
<svg
  class="lucide lucide-refresh-cw"
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
  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
  <path d="M21 3v5h-5" />
  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
  <path d="M8 16H3v5" />
</svg>
`,hk=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;class Br{constructor(){}static async all(){return Ot(G.accounts)}static async get(t){try{return await G.accounts.get(t)}catch{return}}static async create(t){const n=Ie();return await G.accounts.put({...t,_id:n}),n}static async update(t,n){const i=await G.accounts.get(t);await G.accounts.put({...i,...n})}static async remove(t){const n=await G.accounts.get(t);await G.accounts.remove(n)}}class xn{constructor(){}static async all(){return Ot(G.transactions)}static async get(t){try{return await G.transactions.get(t)}catch{return}}static async update(t,n){const i=await G.transactions.get(t);await G.transactions.put({...i,...n})}static async bulkPut(t){await G.transactions.bulkDocs(t.map(n=>({...n,_id:n._id??Ie()})))}static async bulkAdd(t){await G.transactions.bulkDocs(t.map(n=>({...n,_id:Ie()})))}static async forMerchant(t){return(await G.transactions.find({selector:{merchantId:t}})).docs.sort((i,r)=>r.date.localeCompare(i.date))}static async forMerchantAll(t){return(await G.transactions.find({selector:{merchantId:t}})).docs}static async forAccount(t){return(await G.transactions.find({selector:{accountId:t}})).docs.sort((i,r)=>r.date.localeCompare(i.date))}static async deleteAll(){const n=(await G.transactions.allDocs({include_docs:!0})).rows.filter(i=>i.doc&&!i.id.startsWith("_")).map(i=>i.doc);return await G.transactions.bulkDocs(n.map(i=>({...i,_deleted:!0}))),n.length}static async deleteForAccount(t){const n=await G.transactions.find({selector:{accountId:t}});return await G.transactions.bulkDocs(n.docs.map(i=>({...i,_deleted:!0}))),n.docs.length}}const KD=["chequing","savings","credit_card","investment"],dk={chequing:"Chequing",savings:"Savings",credit_card:"Credit Card",investment:"Investment"};function fk(e){return dk[e]}var pk=Object.defineProperty,gk=Object.getOwnPropertyDescriptor,Fg=e=>{throw TypeError(e)},lr=(e,t,n,i)=>{for(var r=i>1?void 0:i?gk(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&pk(t,n,r),r},mk=(e,t,n)=>t.has(e)||Fg("Cannot "+n),vk=(e,t,n)=>t.has(e)?Fg("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),On=(e,t,n)=>(mk(e,t,"access private method"),n),on,Nr,qg,Wg,Hg,Vg;let Fn=class extends At{constructor(){super(...arguments),vk(this,on),this.totalItems=0,this.defaultPageSize=10,this.storageKey="",this.filterable=!1,this._currentPage=1,this._pageSize=0,this._filterDebounce=null}connectedCallback(){if(super.connectedCallback(),this.storageKey)try{const e=localStorage.getItem(`budgee:pageSize:${this.storageKey}`);e&&(this._pageSize=Number(e))}catch{}}get _effectivePageSize(){return this._pageSize||this.defaultPageSize}get _totalPages(){return Math.max(1,Math.ceil(this.totalItems/this._effectivePageSize))}willUpdate(e){e.has("totalItems")&&(this._currentPage=1),e.has("defaultPageSize")&&this._pageSize===0&&On(this,on,Nr).call(this)}reset(){this._currentPage=1,On(this,on,Nr).call(this)}render(){const e=this._effectivePageSize,t=(this._currentPage-1)*e+1,n=Math.min(this._currentPage*e,this.totalItems);return z`
      <div class="pagination-bar">
        <div class="pagination-controls">
          ${this.filterable?z`<input
                class="filter-input"
                type="text"
                placeholder="Filter..."
                @input=${On(this,on,Vg)}
              />`:""}
          <label>
            Rows per page:
            <select @change=${On(this,on,qg)}>
              ${[10,25,50,100].map(i=>z`<option value=${i} ?selected=${i===e}>${i}</option>`)}
            </select>
          </label>
        </div>
        <span>Showing ${t}–${n} of ${this.totalItems}</span>
        <div class="pagination-controls">
          <button ?disabled=${this._currentPage<=1} @click=${On(this,on,Wg)}>Prev</button>
          <button ?disabled=${this._currentPage>=this._totalPages} @click=${On(this,on,Hg)}>Next</button>
        </div>
      </div>
      <slot></slot>
    `}};on=new WeakSet;Nr=function(){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:this._currentPage,pageSize:this._effectivePageSize},bubbles:!0,composed:!0}))};qg=function(e){if(this._pageSize=Number(e.target.value),this._currentPage=1,this.storageKey)try{localStorage.setItem(`budgee:pageSize:${this.storageKey}`,String(this._pageSize))}catch{}On(this,on,Nr).call(this)};Wg=function(){this._currentPage>1&&(this._currentPage--,On(this,on,Nr).call(this))};Hg=function(){this._currentPage<this._totalPages&&(this._currentPage++,On(this,on,Nr).call(this))};Vg=function(e){const t=e.target.value;this._filterDebounce!==null&&clearTimeout(this._filterDebounce),this._filterDebounce=setTimeout(()=>{this._filterDebounce=null,this._currentPage=1,this.dispatchEvent(new CustomEvent("filter-change",{detail:{filter:t},bubbles:!0,composed:!0}))},200)};Fn.styles=Et`
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
  `;lr([mt({type:Number})],Fn.prototype,"totalItems",2);lr([mt({type:Number})],Fn.prototype,"defaultPageSize",2);lr([mt()],Fn.prototype,"storageKey",2);lr([mt({type:Boolean})],Fn.prototype,"filterable",2);lr([q()],Fn.prototype,"_currentPage",2);lr([q()],Fn.prototype,"_pageSize",2);Fn=lr([zt("paginated-table")],Fn);const Yn=Et`
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
`;var _k=Object.defineProperty,yk=Object.getOwnPropertyDescriptor,Ug=e=>{throw TypeError(e)},ur=(e,t,n,i)=>{for(var r=i>1?void 0:i?yk(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&_k(t,n,r),r},bk=(e,t,n)=>t.has(e)||Ug("Cannot "+n),wk=(e,t,n)=>t.has(e)?Ug("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Se=(e,t,n)=>(bk(e,t,"access private method"),n),he,Kg,Yg,Xg,Gg,Qg,ls,us,Jg,Zg;let qn=class extends At{constructor(){super(...arguments),wk(this,he),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc"}connectedCallback(){super.connectedCallback(),Se(this,he,Kg).call(this)}render(){if(this._rows===null)return z`
        <p>Loading…</p>
      `;if(this._rows.length===0)return z`
        <p>No accounts found.</p>
      `;const e=this._rows.filter(r=>Se(this,he,Qg).call(this,r)),t=Se(this,he,Jg).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return z`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="accounts"
        ?filterable=${!0}
        @page-change=${Se(this,he,Xg)}
        @filter-change=${Se(this,he,Gg)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>Se(this,he,ls).call(this,"name")}>
                Name${Se(this,he,us).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>Se(this,he,ls).call(this,"type")}>
                Type${Se(this,he,us).call(this,"type")}
              </th>
              <th class="sortable" @click=${()=>Se(this,he,ls).call(this,"count")}>
                Transactions${Se(this,he,us).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>Se(this,he,ls).call(this,"balance")}>
                Balance${Se(this,he,us).call(this,"balance")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>z`
              <tr @click=${()=>Se(this,he,Zg).call(this,r.account._id)}>
                <td>${r.account.name}</td>
                <td>${r.account.type?fk(r.account.type):""}</td>
                <td>${r.transactionCount??"…"}</td>
                <td class="col-amount ${r.balance!=null&&r.balance<0?"amount-negative":r.balance!=null?"amount-positive":""}">
                  ${r.balance!=null?r.balance.toFixed(2):"…"}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};he=new WeakSet;Kg=async function(){const e=await Br.all();this._rows=e.map(t=>({account:t,transactionCount:null,balance:null})),Se(this,he,Yg).call(this)};Yg=async function(){const e=await xn.all(),t=new Map,n=new Map;for(const i of e)i.accountId!=null&&(t.set(i.accountId,(t.get(i.accountId)??0)+1),n.set(i.accountId,(n.get(i.accountId)??0)+i.amount));this._rows=this._rows.map(i=>({...i,transactionCount:t.get(i.account._id)??0,balance:n.get(i.account._id)??0}))};Xg=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};Gg=function(e){this._filter=e.detail.filter,this._currentPage=1};Qg=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.account.name.toLowerCase().includes(t)||e.account.type?.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.balance!=null&&e.balance.toFixed(2).includes(t))};ls=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};us=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};Jg=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.account.name.localeCompare(r.account.name):t==="type"?s=(i.account.type??"").localeCompare(r.account.type??""):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="balance"&&(s=(i.balance??0)-(r.balance??0)),s*n})};Zg=function(e){window.history.pushState({},"",`/accounts/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};qn.styles=[Yn,Et`
      tbody tr {
        cursor: pointer;
      }
    `];ur([q()],qn.prototype,"_rows",2);ur([q()],qn.prototype,"_currentPage",2);ur([q()],qn.prototype,"_pageSize",2);ur([q()],qn.prototype,"_filter",2);ur([q()],qn.prototype,"_sortCol",2);ur([q()],qn.prototype,"_sortDir",2);qn=ur([zt("account-list")],qn);function xk(e,t,n){return(t=$k(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Wn(){return Wn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)({}).hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},Wn.apply(null,arguments)}function Ad(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,i)}return n}function kn(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ad(Object(n),!0).forEach(function(i){xk(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ad(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function kk(e,t){if(e==null)return{};var n,i,r=Sk(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function Sk(e,t){if(e==null)return{};var n={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.indexOf(i)!==-1)continue;n[i]=e[i]}return n}function Ck(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function $k(e){var t=Ck(e,"string");return typeof t=="symbol"?t:t+""}function Bl(e){"@babel/helpers - typeof";return Bl=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Bl(e)}var Mk="1.15.7";function zn(e){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(e)}var Xn=zn(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),eo=zn(/Edge/i),Ed=zn(/firefox/i),ks=zn(/safari/i)&&!zn(/chrome/i)&&!zn(/android/i),qu=zn(/iP(ad|od|hone)/i),tm=zn(/chrome/i)&&zn(/android/i),em={capture:!1,passive:!1};function bt(e,t,n){e.addEventListener(t,n,!Xn&&em)}function _t(e,t,n){e.removeEventListener(t,n,!Xn&&em)}function ya(e,t){if(t){if(t[0]===">"&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch{return!1}return!1}}function nm(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function an(e,t,n,i){if(e){n=n||document;do{if(t!=null&&(t[0]===">"?e.parentNode===n&&ya(e,t):ya(e,t))||i&&e===n)return e;if(e===n)break}while(e=nm(e))}return null}var Td=/\s+/g;function Ne(e,t,n){if(e&&t)if(e.classList)e.classList[n?"add":"remove"](t);else{var i=(" "+e.className+" ").replace(Td," ").replace(" "+t+" "," ");e.className=(i+(n?" "+t:"")).replace(Td," ")}}function nt(e,t,n){var i=e&&e.style;if(i){if(n===void 0)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(n=e.currentStyle),t===void 0?n:n[t];!(t in i)&&t.indexOf("webkit")===-1&&(t="-webkit-"+t),i[t]=n+(typeof n=="string"?"":"px")}}function Or(e,t){var n="";if(typeof e=="string")n=e;else do{var i=nt(e,"transform");i&&i!=="none"&&(n=i+" "+n)}while(!t&&(e=e.parentNode));var r=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return r&&new r(n)}function im(e,t,n){if(e){var i=e.getElementsByTagName(t),r=0,s=i.length;if(n)for(;r<s;r++)n(i[r],r);return i}return[]}function yn(){var e=document.scrollingElement;return e||document.documentElement}function Gt(e,t,n,i,r){if(!(!e.getBoundingClientRect&&e!==window)){var s,o,a,c,l,h,u;if(e!==window&&e.parentNode&&e!==yn()?(s=e.getBoundingClientRect(),o=s.top,a=s.left,c=s.bottom,l=s.right,h=s.height,u=s.width):(o=0,a=0,c=window.innerHeight,l=window.innerWidth,h=window.innerHeight,u=window.innerWidth),(t||n)&&e!==window&&(r=r||e.parentNode,!Xn))do if(r&&r.getBoundingClientRect&&(nt(r,"transform")!=="none"||n&&nt(r,"position")!=="static")){var d=r.getBoundingClientRect();o-=d.top+parseInt(nt(r,"border-top-width")),a-=d.left+parseInt(nt(r,"border-left-width")),c=o+s.height,l=a+s.width;break}while(r=r.parentNode);if(i&&e!==window){var f=Or(r||e),v=f&&f.a,w=f&&f.d;f&&(o/=w,a/=v,u/=v,h/=w,c=o+h,l=a+u)}return{top:o,left:a,bottom:c,right:l,width:u,height:h}}}function Dd(e,t,n){for(var i=si(e,!0),r=Gt(e)[t];i;){var s=Gt(i)[n],o=void 0;if(o=r>=s,!o)return i;if(i===yn())break;i=si(i,!1)}return!1}function zr(e,t,n,i){for(var r=0,s=0,o=e.children;s<o.length;){if(o[s].style.display!=="none"&&o[s]!==it.ghost&&(i||o[s]!==it.dragged)&&an(o[s],n.draggable,e,!1)){if(r===t)return o[s];r++}s++}return null}function Wu(e,t){for(var n=e.lastElementChild;n&&(n===it.ghost||nt(n,"display")==="none"||t&&!ya(n,t));)n=n.previousElementSibling;return n||null}function Ke(e,t){var n=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)e.nodeName.toUpperCase()!=="TEMPLATE"&&e!==it.clone&&(!t||ya(e,t))&&n++;return n}function Od(e){var t=0,n=0,i=yn();if(e)do{var r=Or(e),s=r.a,o=r.d;t+=e.scrollLeft*s,n+=e.scrollTop*o}while(e!==i&&(e=e.parentNode));return[t,n]}function Ak(e,t){for(var n in e)if(e.hasOwnProperty(n)){for(var i in t)if(t.hasOwnProperty(i)&&t[i]===e[n][i])return Number(n)}return-1}function si(e,t){if(!e||!e.getBoundingClientRect)return yn();var n=e,i=!1;do if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var r=nt(n);if(n.clientWidth<n.scrollWidth&&(r.overflowX=="auto"||r.overflowX=="scroll")||n.clientHeight<n.scrollHeight&&(r.overflowY=="auto"||r.overflowY=="scroll")){if(!n.getBoundingClientRect||n===document.body)return yn();if(i||t)return n;i=!0}}while(n=n.parentNode);return yn()}function Ek(e,t){if(e&&t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function Pc(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}var Ss;function rm(e,t){return function(){if(!Ss){var n=arguments,i=this;n.length===1?e.call(i,n[0]):e.apply(i,n),Ss=setTimeout(function(){Ss=void 0},t)}}}function Tk(){clearTimeout(Ss),Ss=void 0}function sm(e,t,n){e.scrollLeft+=t,e.scrollTop+=n}function om(e){var t=window.Polymer,n=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):n?n(e).clone(!0)[0]:e.cloneNode(!0)}function am(e,t,n){var i={};return Array.from(e.children).forEach(function(r){var s,o,a,c;if(!(!an(r,t.draggable,e,!1)||r.animated||r===n)){var l=Gt(r);i.left=Math.min((s=i.left)!==null&&s!==void 0?s:1/0,l.left),i.top=Math.min((o=i.top)!==null&&o!==void 0?o:1/0,l.top),i.right=Math.max((a=i.right)!==null&&a!==void 0?a:-1/0,l.right),i.bottom=Math.max((c=i.bottom)!==null&&c!==void 0?c:-1/0,l.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var Re="Sortable"+new Date().getTime();function Dk(){var e=[],t;return{captureAnimationState:function(){if(e=[],!!this.options.animation){var i=[].slice.call(this.el.children);i.forEach(function(r){if(!(nt(r,"display")==="none"||r===it.ghost)){e.push({target:r,rect:Gt(r)});var s=kn({},e[e.length-1].rect);if(r.thisAnimationDuration){var o=Or(r,!0);o&&(s.top-=o.f,s.left-=o.e)}r.fromRect=s}})}},addAnimationState:function(i){e.push(i)},removeAnimationState:function(i){e.splice(Ak(e,{target:i}),1)},animateAll:function(i){var r=this;if(!this.options.animation){clearTimeout(t),typeof i=="function"&&i();return}var s=!1,o=0;e.forEach(function(a){var c=0,l=a.target,h=l.fromRect,u=Gt(l),d=l.prevFromRect,f=l.prevToRect,v=a.rect,w=Or(l,!0);w&&(u.top-=w.f,u.left-=w.e),l.toRect=u,l.thisAnimationDuration&&Pc(d,u)&&!Pc(h,u)&&(v.top-u.top)/(v.left-u.left)===(h.top-u.top)/(h.left-u.left)&&(c=Pk(v,d,f,r.options)),Pc(u,h)||(l.prevFromRect=h,l.prevToRect=u,c||(c=r.options.animation),r.animate(l,v,u,c)),c&&(s=!0,o=Math.max(o,c),clearTimeout(l.animationResetTimer),l.animationResetTimer=setTimeout(function(){l.animationTime=0,l.prevFromRect=null,l.fromRect=null,l.prevToRect=null,l.thisAnimationDuration=null},c),l.thisAnimationDuration=c)}),clearTimeout(t),s?t=setTimeout(function(){typeof i=="function"&&i()},o):typeof i=="function"&&i(),e=[]},animate:function(i,r,s,o){if(o){nt(i,"transition",""),nt(i,"transform","");var a=Or(this.el),c=a&&a.a,l=a&&a.d,h=(r.left-s.left)/(c||1),u=(r.top-s.top)/(l||1);i.animatingX=!!h,i.animatingY=!!u,nt(i,"transform","translate3d("+h+"px,"+u+"px,0)"),this.forRepaintDummy=Ok(i),nt(i,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),nt(i,"transform","translate3d(0,0,0)"),typeof i.animated=="number"&&clearTimeout(i.animated),i.animated=setTimeout(function(){nt(i,"transition",""),nt(i,"transform",""),i.animated=!1,i.animatingX=!1,i.animatingY=!1},o)}}}}function Ok(e){return e.offsetWidth}function Pk(e,t,n,i){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-n.top,2)+Math.pow(t.left-n.left,2))*i.animation}var vr=[],Ic={initializeByDefault:!0},no={mount:function(t){for(var n in Ic)Ic.hasOwnProperty(n)&&!(n in t)&&(t[n]=Ic[n]);vr.forEach(function(i){if(i.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")}),vr.push(t)},pluginEvent:function(t,n,i){var r=this;this.eventCanceled=!1,i.cancel=function(){r.eventCanceled=!0};var s=t+"Global";vr.forEach(function(o){n[o.pluginName]&&(n[o.pluginName][s]&&n[o.pluginName][s](kn({sortable:n},i)),n.options[o.pluginName]&&n[o.pluginName][t]&&n[o.pluginName][t](kn({sortable:n},i)))})},initializePlugins:function(t,n,i,r){vr.forEach(function(a){var c=a.pluginName;if(!(!t.options[c]&&!a.initializeByDefault)){var l=new a(t,n,t.options);l.sortable=t,l.options=t.options,t[c]=l,Wn(i,l.defaults)}});for(var s in t.options)if(t.options.hasOwnProperty(s)){var o=this.modifyOption(t,s,t.options[s]);typeof o<"u"&&(t.options[s]=o)}},getEventProperties:function(t,n){var i={};return vr.forEach(function(r){typeof r.eventProperties=="function"&&Wn(i,r.eventProperties.call(n[r.pluginName],t))}),i},modifyOption:function(t,n,i){var r;return vr.forEach(function(s){t[s.pluginName]&&s.optionListeners&&typeof s.optionListeners[n]=="function"&&(r=s.optionListeners[n].call(t[s.pluginName],i))}),r}};function Ik(e){var t=e.sortable,n=e.rootEl,i=e.name,r=e.targetEl,s=e.cloneEl,o=e.toEl,a=e.fromEl,c=e.oldIndex,l=e.newIndex,h=e.oldDraggableIndex,u=e.newDraggableIndex,d=e.originalEvent,f=e.putSortable,v=e.extraEventProperties;if(t=t||n&&n[Re],!!t){var w,b=t.options,_="on"+i.charAt(0).toUpperCase()+i.substr(1);window.CustomEvent&&!Xn&&!eo?w=new CustomEvent(i,{bubbles:!0,cancelable:!0}):(w=document.createEvent("Event"),w.initEvent(i,!0,!0)),w.to=o||n,w.from=a||n,w.item=r||n,w.clone=s,w.oldIndex=c,w.newIndex=l,w.oldDraggableIndex=h,w.newDraggableIndex=u,w.originalEvent=d,w.pullMode=f?f.lastPutMode:void 0;var y=kn(kn({},v),no.getEventProperties(i,t));for(var g in y)w[g]=y[g];n&&n.dispatchEvent(w),b[_]&&b[_].call(t,w)}}var Rk=["evt"],De=function(t,n){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=i.evt,s=kk(i,Rk);no.pluginEvent.bind(it)(t,n,kn({dragEl:Z,parentEl:Ft,ghostEl:ht,rootEl:Lt,nextEl:Ri,lastDownEl:Fo,cloneEl:jt,cloneHidden:ii,dragStarted:hs,putSortable:de,activeSortable:it.active,originalEvent:r,oldIndex:Ar,oldDraggableIndex:Cs,newIndex:je,newDraggableIndex:ti,hideGhostForTarget:hm,unhideGhostForTarget:dm,cloneNowHidden:function(){ii=!0},cloneNowShown:function(){ii=!1},dispatchSortableEvent:function(a){Ce({sortable:n,name:a,originalEvent:r})}},s))};function Ce(e){Ik(kn({putSortable:de,cloneEl:jt,targetEl:Z,rootEl:Lt,oldIndex:Ar,oldDraggableIndex:Cs,newIndex:je,newDraggableIndex:ti},e))}var Z,Ft,ht,Lt,Ri,Fo,jt,ii,Ar,je,Cs,ti,yo,de,xr=!1,ba=!1,wa=[],Mi,tn,Rc,Lc,Pd,Id,hs,_r,$s,Ms=!1,bo=!1,qo,ve,Bc=[],Nl=!1,xa=[],Va=typeof document<"u",wo=qu,Rd=eo||Xn?"cssFloat":"float",Lk=Va&&!tm&&!qu&&"draggable"in document.createElement("div"),cm=(function(){if(Va){if(Xn)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto",e.style.pointerEvents==="auto"}})(),lm=function(t,n){var i=nt(t),r=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),s=zr(t,0,n),o=zr(t,1,n),a=s&&nt(s),c=o&&nt(o),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+Gt(s).width,h=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+Gt(o).width;if(i.display==="flex")return i.flexDirection==="column"||i.flexDirection==="column-reverse"?"vertical":"horizontal";if(i.display==="grid")return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(s&&a.float&&a.float!=="none"){var u=a.float==="left"?"left":"right";return o&&(c.clear==="both"||c.clear===u)?"vertical":"horizontal"}return s&&(a.display==="block"||a.display==="flex"||a.display==="table"||a.display==="grid"||l>=r&&i[Rd]==="none"||o&&i[Rd]==="none"&&l+h>r)?"vertical":"horizontal"},Bk=function(t,n,i){var r=i?t.left:t.top,s=i?t.right:t.bottom,o=i?t.width:t.height,a=i?n.left:n.top,c=i?n.right:n.bottom,l=i?n.width:n.height;return r===a||s===c||r+o/2===a+l/2},Nk=function(t,n){var i;return wa.some(function(r){var s=r[Re].options.emptyInsertThreshold;if(!(!s||Wu(r))){var o=Gt(r),a=t>=o.left-s&&t<=o.right+s,c=n>=o.top-s&&n<=o.bottom+s;if(a&&c)return i=r}}),i},um=function(t){function n(s,o){return function(a,c,l,h){var u=a.options.group.name&&c.options.group.name&&a.options.group.name===c.options.group.name;if(s==null&&(o||u))return!0;if(s==null||s===!1)return!1;if(o&&s==="clone")return s;if(typeof s=="function")return n(s(a,c,l,h),o)(a,c,l,h);var d=(o?a:c).options.group.name;return s===!0||typeof s=="string"&&s===d||s.join&&s.indexOf(d)>-1}}var i={},r=t.group;(!r||Bl(r)!="object")&&(r={name:r}),i.name=r.name,i.checkPull=n(r.pull,!0),i.checkPut=n(r.put),i.revertClone=r.revertClone,t.group=i},hm=function(){!cm&&ht&&nt(ht,"display","none")},dm=function(){!cm&&ht&&nt(ht,"display","")};Va&&!tm&&document.addEventListener("click",function(e){if(ba)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),ba=!1,!1},!0);var Ai=function(t){if(Z){t=t.touches?t.touches[0]:t;var n=Nk(t.clientX,t.clientY);if(n){var i={};for(var r in t)t.hasOwnProperty(r)&&(i[r]=t[r]);i.target=i.rootEl=n,i.preventDefault=void 0,i.stopPropagation=void 0,n[Re]._onDragOver(i)}}},zk=function(t){Z&&Z.parentNode[Re]._isOutsideThisEl(t.target)};function it(e,t){if(!(e&&e.nodeType&&e.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=Wn({},t),e[Re]=this;var n={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return lm(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(o,a){o.setData("Text",a.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:it.supportPointer!==!1&&"PointerEvent"in window&&(!ks||qu),emptyInsertThreshold:5};no.initializePlugins(this,e,n);for(var i in n)!(i in t)&&(t[i]=n[i]);um(t);for(var r in this)r.charAt(0)==="_"&&typeof this[r]=="function"&&(this[r]=this[r].bind(this));this.nativeDraggable=t.forceFallback?!1:Lk,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?bt(e,"pointerdown",this._onTapStart):(bt(e,"mousedown",this._onTapStart),bt(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(bt(e,"dragover",this),bt(e,"dragenter",this)),wa.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),Wn(this,Dk())}it.prototype={constructor:it,_isOutsideThisEl:function(t){!this.el.contains(t)&&t!==this.el&&(_r=null)},_getDirection:function(t,n){return typeof this.options.direction=="function"?this.options.direction.call(this,t,n,Z):this.options.direction},_onTapStart:function(t){if(t.cancelable){var n=this,i=this.el,r=this.options,s=r.preventOnFilter,o=t.type,a=t.touches&&t.touches[0]||t.pointerType&&t.pointerType==="touch"&&t,c=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||c,h=r.filter;if(Kk(i),!Z&&!(/mousedown|pointerdown/.test(o)&&t.button!==0||r.disabled)&&!l.isContentEditable&&!(!this.nativeDraggable&&ks&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=an(c,r.draggable,i,!1),!(c&&c.animated)&&Fo!==c)){if(Ar=Ke(c),Cs=Ke(c,r.draggable),typeof h=="function"){if(h.call(this,t,c,this)){Ce({sortable:n,rootEl:l,name:"filter",targetEl:c,toEl:i,fromEl:i}),De("filter",n,{evt:t}),s&&t.preventDefault();return}}else if(h&&(h=h.split(",").some(function(u){if(u=an(l,u.trim(),i,!1),u)return Ce({sortable:n,rootEl:u,name:"filter",targetEl:c,fromEl:i,toEl:i}),De("filter",n,{evt:t}),!0}),h)){s&&t.preventDefault();return}r.handle&&!an(l,r.handle,i,!1)||this._prepareDragStart(t,a,c)}}},_prepareDragStart:function(t,n,i){var r=this,s=r.el,o=r.options,a=s.ownerDocument,c;if(i&&!Z&&i.parentNode===s){var l=Gt(i);if(Lt=s,Z=i,Ft=Z.parentNode,Ri=Z.nextSibling,Fo=i,yo=o.group,it.dragged=Z,Mi={target:Z,clientX:(n||t).clientX,clientY:(n||t).clientY},Pd=Mi.clientX-l.left,Id=Mi.clientY-l.top,this._lastX=(n||t).clientX,this._lastY=(n||t).clientY,Z.style["will-change"]="all",c=function(){if(De("delayEnded",r,{evt:t}),it.eventCanceled){r._onDrop();return}r._disableDelayedDragEvents(),!Ed&&r.nativeDraggable&&(Z.draggable=!0),r._triggerDragStart(t,n),Ce({sortable:r,name:"choose",originalEvent:t}),Ne(Z,o.chosenClass,!0)},o.ignore.split(",").forEach(function(h){im(Z,h.trim(),Nc)}),bt(a,"dragover",Ai),bt(a,"mousemove",Ai),bt(a,"touchmove",Ai),o.supportPointer?(bt(a,"pointerup",r._onDrop),!this.nativeDraggable&&bt(a,"pointercancel",r._onDrop)):(bt(a,"mouseup",r._onDrop),bt(a,"touchend",r._onDrop),bt(a,"touchcancel",r._onDrop)),Ed&&this.nativeDraggable&&(this.options.touchStartThreshold=4,Z.draggable=!0),De("delayStart",this,{evt:t}),o.delay&&(!o.delayOnTouchOnly||n)&&(!this.nativeDraggable||!(eo||Xn))){if(it.eventCanceled){this._onDrop();return}o.supportPointer?(bt(a,"pointerup",r._disableDelayedDrag),bt(a,"pointercancel",r._disableDelayedDrag)):(bt(a,"mouseup",r._disableDelayedDrag),bt(a,"touchend",r._disableDelayedDrag),bt(a,"touchcancel",r._disableDelayedDrag)),bt(a,"mousemove",r._delayedDragTouchMoveHandler),bt(a,"touchmove",r._delayedDragTouchMoveHandler),o.supportPointer&&bt(a,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=setTimeout(c,o.delay)}else c()}},_delayedDragTouchMoveHandler:function(t){var n=t.touches?t.touches[0]:t;Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){Z&&Nc(Z),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;_t(t,"mouseup",this._disableDelayedDrag),_t(t,"touchend",this._disableDelayedDrag),_t(t,"touchcancel",this._disableDelayedDrag),_t(t,"pointerup",this._disableDelayedDrag),_t(t,"pointercancel",this._disableDelayedDrag),_t(t,"mousemove",this._delayedDragTouchMoveHandler),_t(t,"touchmove",this._delayedDragTouchMoveHandler),_t(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,n){n=n||t.pointerType=="touch"&&t,!this.nativeDraggable||n?this.options.supportPointer?bt(document,"pointermove",this._onTouchMove):n?bt(document,"touchmove",this._onTouchMove):bt(document,"mousemove",this._onTouchMove):(bt(Z,"dragend",this),bt(Lt,"dragstart",this._onDragStart));try{document.selection?Wo(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(t,n){if(xr=!1,Lt&&Z){De("dragStarted",this,{evt:n}),this.nativeDraggable&&bt(document,"dragover",zk);var i=this.options;!t&&Ne(Z,i.dragClass,!1),Ne(Z,i.ghostClass,!0),it.active=this,t&&this._appendGhost(),Ce({sortable:this,name:"start",originalEvent:n})}else this._nulling()},_emulateDragOver:function(){if(tn){this._lastX=tn.clientX,this._lastY=tn.clientY,hm();for(var t=document.elementFromPoint(tn.clientX,tn.clientY),n=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(tn.clientX,tn.clientY),t!==n);)n=t;if(Z.parentNode[Re]._isOutsideThisEl(t),n)do{if(n[Re]){var i=void 0;if(i=n[Re]._onDragOver({clientX:tn.clientX,clientY:tn.clientY,target:t,rootEl:n}),i&&!this.options.dragoverBubble)break}t=n}while(n=nm(n));dm()}},_onTouchMove:function(t){if(Mi){var n=this.options,i=n.fallbackTolerance,r=n.fallbackOffset,s=t.touches?t.touches[0]:t,o=ht&&Or(ht,!0),a=ht&&o&&o.a,c=ht&&o&&o.d,l=wo&&ve&&Od(ve),h=(s.clientX-Mi.clientX+r.x)/(a||1)+(l?l[0]-Bc[0]:0)/(a||1),u=(s.clientY-Mi.clientY+r.y)/(c||1)+(l?l[1]-Bc[1]:0)/(c||1);if(!it.active&&!xr){if(i&&Math.max(Math.abs(s.clientX-this._lastX),Math.abs(s.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(ht){o?(o.e+=h-(Rc||0),o.f+=u-(Lc||0)):o={a:1,b:0,c:0,d:1,e:h,f:u};var d="matrix(".concat(o.a,",").concat(o.b,",").concat(o.c,",").concat(o.d,",").concat(o.e,",").concat(o.f,")");nt(ht,"webkitTransform",d),nt(ht,"mozTransform",d),nt(ht,"msTransform",d),nt(ht,"transform",d),Rc=h,Lc=u,tn=s}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!ht){var t=this.options.fallbackOnBody?document.body:Lt,n=Gt(Z,!0,wo,!0,t),i=this.options;if(wo){for(ve=t;nt(ve,"position")==="static"&&nt(ve,"transform")==="none"&&ve!==document;)ve=ve.parentNode;ve!==document.body&&ve!==document.documentElement?(ve===document&&(ve=yn()),n.top+=ve.scrollTop,n.left+=ve.scrollLeft):ve=yn(),Bc=Od(ve)}ht=Z.cloneNode(!0),Ne(ht,i.ghostClass,!1),Ne(ht,i.fallbackClass,!0),Ne(ht,i.dragClass,!0),nt(ht,"transition",""),nt(ht,"transform",""),nt(ht,"box-sizing","border-box"),nt(ht,"margin",0),nt(ht,"top",n.top),nt(ht,"left",n.left),nt(ht,"width",n.width),nt(ht,"height",n.height),nt(ht,"opacity","0.8"),nt(ht,"position",wo?"absolute":"fixed"),nt(ht,"zIndex","100000"),nt(ht,"pointerEvents","none"),it.ghost=ht,t.appendChild(ht),nt(ht,"transform-origin",Pd/parseInt(ht.style.width)*100+"% "+Id/parseInt(ht.style.height)*100+"%")}},_onDragStart:function(t,n){var i=this,r=t.dataTransfer,s=i.options;if(De("dragStart",this,{evt:t}),it.eventCanceled){this._onDrop();return}De("setupClone",this),it.eventCanceled||(jt=om(Z),jt.removeAttribute("id"),jt.draggable=!1,jt.style["will-change"]="",this._hideClone(),Ne(jt,this.options.chosenClass,!1),it.clone=jt),i.cloneId=Wo(function(){De("clone",i),!it.eventCanceled&&(i.options.removeCloneOnHide||Lt.insertBefore(jt,Z),i._hideClone(),Ce({sortable:i,name:"clone"}))}),!n&&Ne(Z,s.dragClass,!0),n?(ba=!0,i._loopId=setInterval(i._emulateDragOver,50)):(_t(document,"mouseup",i._onDrop),_t(document,"touchend",i._onDrop),_t(document,"touchcancel",i._onDrop),r&&(r.effectAllowed="move",s.setData&&s.setData.call(i,r,Z)),bt(document,"drop",i),nt(Z,"transform","translateZ(0)")),xr=!0,i._dragStartId=Wo(i._dragStarted.bind(i,n,t)),bt(document,"selectstart",i),hs=!0,window.getSelection().removeAllRanges(),ks&&nt(document.body,"user-select","none")},_onDragOver:function(t){var n=this.el,i=t.target,r,s,o,a=this.options,c=a.group,l=it.active,h=yo===c,u=a.sort,d=de||l,f,v=this,w=!1;if(Nl)return;function b($,C){De($,v,kn({evt:t,isOwner:h,axis:f?"vertical":"horizontal",revert:o,dragRect:r,targetRect:s,canSort:u,fromSortable:d,target:i,completed:y,onMove:function(A,O){return xo(Lt,n,Z,r,A,Gt(A),t,O)},changed:g},C))}function _(){b("dragOverAnimationCapture"),v.captureAnimationState(),v!==d&&d.captureAnimationState()}function y($){return b("dragOverCompleted",{insertion:$}),$&&(h?l._hideClone():l._showClone(v),v!==d&&(Ne(Z,de?de.options.ghostClass:l.options.ghostClass,!1),Ne(Z,a.ghostClass,!0)),de!==v&&v!==it.active?de=v:v===it.active&&de&&(de=null),d===v&&(v._ignoreWhileAnimating=i),v.animateAll(function(){b("dragOverAnimationComplete"),v._ignoreWhileAnimating=null}),v!==d&&(d.animateAll(),d._ignoreWhileAnimating=null)),(i===Z&&!Z.animated||i===n&&!i.animated)&&(_r=null),!a.dragoverBubble&&!t.rootEl&&i!==document&&(Z.parentNode[Re]._isOutsideThisEl(t.target),!$&&Ai(t)),!a.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),w=!0}function g(){je=Ke(Z),ti=Ke(Z,a.draggable),Ce({sortable:v,name:"change",toEl:n,newIndex:je,newDraggableIndex:ti,originalEvent:t})}if(t.preventDefault!==void 0&&t.cancelable&&t.preventDefault(),i=an(i,a.draggable,n,!0),b("dragOver"),it.eventCanceled)return w;if(Z.contains(t.target)||i.animated&&i.animatingX&&i.animatingY||v._ignoreWhileAnimating===i)return y(!1);if(ba=!1,l&&!a.disabled&&(h?u||(o=Ft!==Lt):de===this||(this.lastPutMode=yo.checkPull(this,l,Z,t))&&c.checkPut(this,l,Z,t))){if(f=this._getDirection(t,i)==="vertical",r=Gt(Z),b("dragOverValid"),it.eventCanceled)return w;if(o)return Ft=Lt,_(),this._hideClone(),b("revert"),it.eventCanceled||(Ri?Lt.insertBefore(Z,Ri):Lt.appendChild(Z)),y(!0);var p=Wu(n,a.draggable);if(!p||Wk(t,f,this)&&!p.animated){if(p===Z)return y(!1);if(p&&n===t.target&&(i=p),i&&(s=Gt(i)),xo(Lt,n,Z,r,i,s,t,!!i)!==!1)return _(),p&&p.nextSibling?n.insertBefore(Z,p.nextSibling):n.appendChild(Z),Ft=n,g(),y(!0)}else if(p&&qk(t,f,this)){var m=zr(n,0,a,!0);if(m===Z)return y(!1);if(i=m,s=Gt(i),xo(Lt,n,Z,r,i,s,t,!1)!==!1)return _(),n.insertBefore(Z,m),Ft=n,g(),y(!0)}else if(i.parentNode===n){s=Gt(i);var x=0,M,k=Z.parentNode!==n,S=!Bk(Z.animated&&Z.toRect||r,i.animated&&i.toRect||s,f),E=f?"top":"left",P=Dd(i,"top","top")||Dd(Z,"top","top"),B=P?P.scrollTop:void 0;_r!==i&&(M=s[E],Ms=!1,bo=!S&&a.invertSwap||k),x=Hk(t,i,s,f,S?1:a.swapThreshold,a.invertedSwapThreshold==null?a.swapThreshold:a.invertedSwapThreshold,bo,_r===i);var j;if(x!==0){var H=Ke(Z);do H-=x,j=Ft.children[H];while(j&&(nt(j,"display")==="none"||j===ht))}if(x===0||j===i)return y(!1);_r=i,$s=x;var Q=i.nextElementSibling,J=!1;J=x===1;var U=xo(Lt,n,Z,r,i,s,t,J);if(U!==!1)return(U===1||U===-1)&&(J=U===1),Nl=!0,setTimeout(Fk,30),_(),J&&!Q?n.appendChild(Z):i.parentNode.insertBefore(Z,J?Q:i),P&&sm(P,0,B-P.scrollTop),Ft=Z.parentNode,M!==void 0&&!bo&&(qo=Math.abs(M-Gt(i)[E])),g(),y(!0)}if(n.contains(Z))return y(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){_t(document,"mousemove",this._onTouchMove),_t(document,"touchmove",this._onTouchMove),_t(document,"pointermove",this._onTouchMove),_t(document,"dragover",Ai),_t(document,"mousemove",Ai),_t(document,"touchmove",Ai)},_offUpEvents:function(){var t=this.el.ownerDocument;_t(t,"mouseup",this._onDrop),_t(t,"touchend",this._onDrop),_t(t,"pointerup",this._onDrop),_t(t,"pointercancel",this._onDrop),_t(t,"touchcancel",this._onDrop),_t(document,"selectstart",this)},_onDrop:function(t){var n=this.el,i=this.options;if(je=Ke(Z),ti=Ke(Z,i.draggable),De("drop",this,{evt:t}),Ft=Z&&Z.parentNode,je=Ke(Z),ti=Ke(Z,i.draggable),it.eventCanceled){this._nulling();return}xr=!1,bo=!1,Ms=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),zl(this.cloneId),zl(this._dragStartId),this.nativeDraggable&&(_t(document,"drop",this),_t(n,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),ks&&nt(document.body,"user-select",""),nt(Z,"transform",""),t&&(hs&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),ht&&ht.parentNode&&ht.parentNode.removeChild(ht),(Lt===Ft||de&&de.lastPutMode!=="clone")&&jt&&jt.parentNode&&jt.parentNode.removeChild(jt),Z&&(this.nativeDraggable&&_t(Z,"dragend",this),Nc(Z),Z.style["will-change"]="",hs&&!xr&&Ne(Z,de?de.options.ghostClass:this.options.ghostClass,!1),Ne(Z,this.options.chosenClass,!1),Ce({sortable:this,name:"unchoose",toEl:Ft,newIndex:null,newDraggableIndex:null,originalEvent:t}),Lt!==Ft?(je>=0&&(Ce({rootEl:Ft,name:"add",toEl:Ft,fromEl:Lt,originalEvent:t}),Ce({sortable:this,name:"remove",toEl:Ft,originalEvent:t}),Ce({rootEl:Ft,name:"sort",toEl:Ft,fromEl:Lt,originalEvent:t}),Ce({sortable:this,name:"sort",toEl:Ft,originalEvent:t})),de&&de.save()):je!==Ar&&je>=0&&(Ce({sortable:this,name:"update",toEl:Ft,originalEvent:t}),Ce({sortable:this,name:"sort",toEl:Ft,originalEvent:t})),it.active&&((je==null||je===-1)&&(je=Ar,ti=Cs),Ce({sortable:this,name:"end",toEl:Ft,originalEvent:t}),this.save()))),this._nulling()},_nulling:function(){De("nulling",this),Lt=Z=Ft=ht=Ri=jt=Fo=ii=Mi=tn=hs=je=ti=Ar=Cs=_r=$s=de=yo=it.dragged=it.ghost=it.clone=it.active=null;var t=this.el;xa.forEach(function(n){t.contains(n)&&(n.checked=!0)}),xa.length=Rc=Lc=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":Z&&(this._onDragOver(t),jk(t));break;case"selectstart":t.preventDefault();break}},toArray:function(){for(var t=[],n,i=this.el.children,r=0,s=i.length,o=this.options;r<s;r++)n=i[r],an(n,o.draggable,this.el,!1)&&t.push(n.getAttribute(o.dataIdAttr)||Uk(n));return t},sort:function(t,n){var i={},r=this.el;this.toArray().forEach(function(s,o){var a=r.children[o];an(a,this.options.draggable,r,!1)&&(i[s]=a)},this),n&&this.captureAnimationState(),t.forEach(function(s){i[s]&&(r.removeChild(i[s]),r.appendChild(i[s]))}),n&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,n){return an(t,n||this.options.draggable,this.el,!1)},option:function(t,n){var i=this.options;if(n===void 0)return i[t];var r=no.modifyOption(this,t,n);typeof r<"u"?i[t]=r:i[t]=n,t==="group"&&um(i)},destroy:function(){De("destroy",this);var t=this.el;t[Re]=null,_t(t,"mousedown",this._onTapStart),_t(t,"touchstart",this._onTapStart),_t(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(_t(t,"dragover",this),_t(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(n){n.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),wa.splice(wa.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!ii){if(De("hideClone",this),it.eventCanceled)return;nt(jt,"display","none"),this.options.removeCloneOnHide&&jt.parentNode&&jt.parentNode.removeChild(jt),ii=!0}},_showClone:function(t){if(t.lastPutMode!=="clone"){this._hideClone();return}if(ii){if(De("showClone",this),it.eventCanceled)return;Z.parentNode==Lt&&!this.options.group.revertClone?Lt.insertBefore(jt,Z):Ri?Lt.insertBefore(jt,Ri):Lt.appendChild(jt),this.options.group.revertClone&&this.animate(Z,jt),nt(jt,"display",""),ii=!1}}};function jk(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}function xo(e,t,n,i,r,s,o,a){var c,l=e[Re],h=l.options.onMove,u;return window.CustomEvent&&!Xn&&!eo?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=t,c.from=e,c.dragged=n,c.draggedRect=i,c.related=r||t,c.relatedRect=s||Gt(t),c.willInsertAfter=a,c.originalEvent=o,e.dispatchEvent(c),h&&(u=h.call(l,c,o)),u}function Nc(e){e.draggable=!1}function Fk(){Nl=!1}function qk(e,t,n){var i=Gt(zr(n.el,0,n.options,!0)),r=am(n.el,n.options,ht),s=10;return t?e.clientX<r.left-s||e.clientY<i.top&&e.clientX<i.right:e.clientY<r.top-s||e.clientY<i.bottom&&e.clientX<i.left}function Wk(e,t,n){var i=Gt(Wu(n.el,n.options.draggable)),r=am(n.el,n.options,ht),s=10;return t?e.clientX>r.right+s||e.clientY>i.bottom&&e.clientX>i.left:e.clientY>r.bottom+s||e.clientX>i.right&&e.clientY>i.top}function Hk(e,t,n,i,r,s,o,a){var c=i?e.clientY:e.clientX,l=i?n.height:n.width,h=i?n.top:n.left,u=i?n.bottom:n.right,d=!1;if(!o){if(a&&qo<l*r){if(!Ms&&($s===1?c>h+l*s/2:c<u-l*s/2)&&(Ms=!0),Ms)d=!0;else if($s===1?c<h+qo:c>u-qo)return-$s}else if(c>h+l*(1-r)/2&&c<u-l*(1-r)/2)return Vk(t)}return d=d||o,d&&(c<h+l*s/2||c>u-l*s/2)?c>h+l/2?1:-1:0}function Vk(e){return Ke(Z)<Ke(e)?1:-1}function Uk(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,n=t.length,i=0;n--;)i+=t.charCodeAt(n);return i.toString(36)}function Kk(e){xa.length=0;for(var t=e.getElementsByTagName("input"),n=t.length;n--;){var i=t[n];i.checked&&xa.push(i)}}function Wo(e){return setTimeout(e,0)}function zl(e){return clearTimeout(e)}Va&&bt(document,"touchmove",function(e){(it.active||xr)&&e.cancelable&&e.preventDefault()});it.utils={on:bt,off:_t,css:nt,find:im,is:function(t,n){return!!an(t,n,t,!1)},extend:Ek,throttle:rm,closest:an,toggleClass:Ne,clone:om,index:Ke,nextTick:Wo,cancelNextTick:zl,detectDirection:lm,getChild:zr,expando:Re};it.get=function(e){return e[Re]};it.mount=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t[0].constructor===Array&&(t=t[0]),t.forEach(function(i){if(!i.prototype||!i.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));i.utils&&(it.utils=kn(kn({},it.utils),i.utils)),no.mount(i)})};it.create=function(e,t){return new it(e,t)};it.version=Mk;var Yt=[],ds,jl,Fl=!1,zc,jc,ka,fs;function Yk(){function e(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var t in this)t.charAt(0)==="_"&&typeof this[t]=="function"&&(this[t]=this[t].bind(this))}return e.prototype={dragStarted:function(n){var i=n.originalEvent;this.sortable.nativeDraggable?bt(document,"dragover",this._handleAutoScroll):this.options.supportPointer?bt(document,"pointermove",this._handleFallbackAutoScroll):i.touches?bt(document,"touchmove",this._handleFallbackAutoScroll):bt(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(n){var i=n.originalEvent;!this.options.dragOverBubble&&!i.rootEl&&this._handleAutoScroll(i)},drop:function(){this.sortable.nativeDraggable?_t(document,"dragover",this._handleAutoScroll):(_t(document,"pointermove",this._handleFallbackAutoScroll),_t(document,"touchmove",this._handleFallbackAutoScroll),_t(document,"mousemove",this._handleFallbackAutoScroll)),Ld(),Ho(),Tk()},nulling:function(){ka=jl=ds=Fl=fs=zc=jc=null,Yt.length=0},_handleFallbackAutoScroll:function(n){this._handleAutoScroll(n,!0)},_handleAutoScroll:function(n,i){var r=this,s=(n.touches?n.touches[0]:n).clientX,o=(n.touches?n.touches[0]:n).clientY,a=document.elementFromPoint(s,o);if(ka=n,i||this.options.forceAutoScrollFallback||eo||Xn||ks){Fc(n,this.options,a,i);var c=si(a,!0);Fl&&(!fs||s!==zc||o!==jc)&&(fs&&Ld(),fs=setInterval(function(){var l=si(document.elementFromPoint(s,o),!0);l!==c&&(c=l,Ho()),Fc(n,r.options,l,i)},10),zc=s,jc=o)}else{if(!this.options.bubbleScroll||si(a,!0)===yn()){Ho();return}Fc(n,this.options,si(a,!1),!1)}}},Wn(e,{pluginName:"scroll",initializeByDefault:!0})}function Ho(){Yt.forEach(function(e){clearInterval(e.pid)}),Yt=[]}function Ld(){clearInterval(fs)}var Fc=rm(function(e,t,n,i){if(t.scroll){var r=(e.touches?e.touches[0]:e).clientX,s=(e.touches?e.touches[0]:e).clientY,o=t.scrollSensitivity,a=t.scrollSpeed,c=yn(),l=!1,h;jl!==n&&(jl=n,Ho(),ds=t.scroll,h=t.scrollFn,ds===!0&&(ds=si(n,!0)));var u=0,d=ds;do{var f=d,v=Gt(f),w=v.top,b=v.bottom,_=v.left,y=v.right,g=v.width,p=v.height,m=void 0,x=void 0,M=f.scrollWidth,k=f.scrollHeight,S=nt(f),E=f.scrollLeft,P=f.scrollTop;f===c?(m=g<M&&(S.overflowX==="auto"||S.overflowX==="scroll"||S.overflowX==="visible"),x=p<k&&(S.overflowY==="auto"||S.overflowY==="scroll"||S.overflowY==="visible")):(m=g<M&&(S.overflowX==="auto"||S.overflowX==="scroll"),x=p<k&&(S.overflowY==="auto"||S.overflowY==="scroll"));var B=m&&(Math.abs(y-r)<=o&&E+g<M)-(Math.abs(_-r)<=o&&!!E),j=x&&(Math.abs(b-s)<=o&&P+p<k)-(Math.abs(w-s)<=o&&!!P);if(!Yt[u])for(var H=0;H<=u;H++)Yt[H]||(Yt[H]={});(Yt[u].vx!=B||Yt[u].vy!=j||Yt[u].el!==f)&&(Yt[u].el=f,Yt[u].vx=B,Yt[u].vy=j,clearInterval(Yt[u].pid),(B!=0||j!=0)&&(l=!0,Yt[u].pid=setInterval((function(){i&&this.layer===0&&it.active._onTouchMove(ka);var Q=Yt[this.layer].vy?Yt[this.layer].vy*a:0,J=Yt[this.layer].vx?Yt[this.layer].vx*a:0;typeof h=="function"&&h.call(it.dragged.parentNode[Re],J,Q,e,ka,Yt[this.layer].el)!=="continue"||sm(Yt[this.layer].el,J,Q)}).bind({layer:u}),24))),u++}while(t.bubbleScroll&&d!==c&&(d=si(d,!1)));Fl=l}},30),fm=function(t){var n=t.originalEvent,i=t.putSortable,r=t.dragEl,s=t.activeSortable,o=t.dispatchSortableEvent,a=t.hideGhostForTarget,c=t.unhideGhostForTarget;if(n){var l=i||s;a();var h=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:n,u=document.elementFromPoint(h.clientX,h.clientY);c(),l&&!l.el.contains(u)&&(o("spill"),this.onSpill({dragEl:r,putSortable:i}))}};function Hu(){}Hu.prototype={startIndex:null,dragStart:function(t){var n=t.oldDraggableIndex;this.startIndex=n},onSpill:function(t){var n=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var r=zr(this.sortable.el,this.startIndex,this.options);r?this.sortable.el.insertBefore(n,r):this.sortable.el.appendChild(n),this.sortable.animateAll(),i&&i.animateAll()},drop:fm};Wn(Hu,{pluginName:"revertOnSpill"});function Vu(){}Vu.prototype={onSpill:function(t){var n=t.dragEl,i=t.putSortable,r=i||this.sortable;r.captureAnimationState(),n.parentNode&&n.parentNode.removeChild(n),r.animateAll()},drop:fm};Wn(Vu,{pluginName:"removeOnSpill"});it.mount(new Yk);it.mount(Vu,Hu);class hi{constructor(){}static async all(){return(await Ot(G.dashboardCharts)).sort((t,n)=>t.position-n.position)}static async create(t){const n=Ie();return await G.dashboardCharts.put({...t,_id:n}),n}static async update(t,n){const i=await G.dashboardCharts.get(t);await G.dashboardCharts.put({...i,...n})}static async remove(t){const n=await G.dashboardCharts.get(t);await G.dashboardCharts.remove(n)}static async reorder(t){await Promise.all(t.map(async(n,i)=>{const r=await G.dashboardCharts.get(n);await G.dashboardCharts.put({...r,position:i})}))}}class jr{constructor(){}static async all(){return(await Ot(G.dashboardTables)).sort((t,n)=>t.position-n.position)}static async create(t){const n=Ie();return await G.dashboardTables.put({...t,_id:n}),n}static async update(t,n){const i=await G.dashboardTables.get(t);await G.dashboardTables.put({...i,...n})}static async remove(t){const n=await G.dashboardTables.get(t);await G.dashboardTables.remove(n)}static async reorder(t){await Promise.all(t.map(async(n,i)=>{const r=await G.dashboardTables.get(n);await G.dashboardTables.put({...r,position:i})}))}}class Hn{constructor(){}static async all(){return Ot(G.merchants)}static async get(t){try{return await G.merchants.get(t)}catch{return}}static async create(t){const n=Ie();return await G.merchants.put({_id:n,name:t}),n}static async update(t,n){const i=await G.merchants.get(t);await G.merchants.put({...i,...n})}static async remove(t){const n=await G.merchants.get(t);await G.merchants.remove(n)}static async byName(t){return(await Ot(G.merchants)).find(i=>i.name.toLowerCase()===t.toLowerCase())}}function Xk(){const e=40+Math.floor(Math.random()*20),t=20+Math.floor(Math.random()*30),n=Math.floor(Math.random()*360);return`lch(${e} ${t} ${n})`}function pm(e){return Gk(e)>70?"black":"white"}function Gk(e){const t=e.match(/lch\(\s*([\d.]+)\s/);if(t)return Number(t[1]);const{r:n,g:i,b:r}=gm(e),[s,o,a]=[n,i,r].map(l=>{const h=l/255;return h<=.03928?h/12.92:((h+.055)/1.055)**2.4}),c=.2126*s+.7152*o+.0722*a;return c>.008856?116*Math.cbrt(c)-16:903.3*c}function gm(e){if(e.startsWith("#"))return Qk(e);const t=Zk(e);if(t)return t;const n=e.match(/hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\s*\)/);return n?tS(Number(n[1]),Number(n[2]),Number(n[3])):{r:0,g:0,b:0}}function Qk(e){const t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function Jk(e){if(e.startsWith("#"))return e;const{r:t,g:n,b:i}=gm(e),r=s=>s.toString(16).padStart(2,"0");return`#${r(t)}${r(n)}${r(i)}`}function Zk(e){const t=e.match(/lch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(!t)return null;const n=Number(t[1]),i=Number(t[2]),s=Number(t[3])*Math.PI/180,o=i*Math.cos(s),a=i*Math.sin(s),c=(n+16)/116,l=o/500+c,h=c-a/200,u=.008856,d=903.3,f=l**3>u?l**3:(116*l-16)/d,v=n>d*u?((n+16)/116)**3:n/d,w=h**3>u?h**3:(116*h-16)/d,b=f*.95047,_=v*1,y=w*1.08883,g=3.2404542*b-1.5371385*_-.4985314*y,p=-.969266*b+1.8760108*_+.041556*y,m=.0556434*b-.2040259*_+1.0572252*y,x=M=>{const k=Math.max(0,Math.min(1,M));return k<=.0031308?12.92*k:1.055*k**(1/2.4)-.055};return{r:Math.round(x(g)*255),g:Math.round(x(p)*255),b:Math.round(x(m)*255)}}function tS(e,t,n){const i=t/100,r=n/100,s=(1-Math.abs(2*r-1))*i,o=s*(1-Math.abs(e/60%2-1)),a=r-s/2;let c=0,l=0,h=0;return e<60?(c=s,l=o):e<120?(c=o,l=s):e<180?(l=s,h=o):e<240?(l=o,h=s):e<300?(c=o,h=s):(c=s,h=o),{r:Math.round((c+a)*255),g:Math.round((l+a)*255),b:Math.round((h+a)*255)}}class Je{constructor(){}static async all(){return Ot(G.tags)}static async create(t,n){const i=Ie();return await G.tags.put({_id:i,name:t,color:Xk(),...n}),i}static async update(t,n){const i=await G.tags.get(t);await G.tags.put({...i,...n})}static async remove(t){const n=await G.tags.get(t);await G.tags.remove(n)}static async byName(t){return(await Ot(G.tags)).find(i=>i.name.toLowerCase()===t.toLowerCase())}}var eS=Object.defineProperty,nS=Object.getOwnPropertyDescriptor,mm=e=>{throw TypeError(e)},ce=(e,t,n,i)=>{for(var r=i>1?void 0:i?nS(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&eS(t,n,r),r},iS=(e,t,n)=>t.has(e)||mm("Cannot "+n),rS=(e,t,n)=>t.has(e)?mm("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ql=(e,t,n)=>(iS(e,t,"access private method"),n),As,vm,_m,ym;const qc=new Set(["pie","doughnut"]);let Jt=class extends At{constructor(){super(...arguments),rS(this,As),this.transactions=[],this.tags=[],this.merchants=[],this._title="",this._chartType="bar",this._granularity="month",this._startDate="",this._endDate="",this._colSpan=1,this._rowSpan=1,this._excludedTagIds=[],this._excludedMerchantIds=[],this._showExclusions=!1,this._initialized=!1}updated(e){e.has("editingChart")&&this.editingChart&&!this._initialized&&(this._title=this.editingChart.title,this._chartType=this.editingChart.chartType,this._granularity=this.editingChart.granularity,this._startDate=this.editingChart.startDate??"",this._endDate=this.editingChart.endDate??"",this._tagId=this.editingChart.tagId,this._merchantId=this.editingChart.merchantId,this._colSpan=this.editingChart.colSpan??1,this._rowSpan=this.editingChart.rowSpan??1,this._excludedTagIds=this.editingChart.excludedTagIds??[],this._excludedMerchantIds=this.editingChart.excludedMerchantIds??[],this._initialized=!0)}render(){return z`
      <h4>${this.editingChart?"Edit Chart":"Add Chart"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${e=>{this._title=e.target.value}}
        />
        <label>Type:</label>
        <select @change=${e=>{this._chartType=e.target.value,qc.has(this._chartType)&&!["byTag","byMerchant","month"].includes(this._granularity)&&(this._granularity="byTag")}}>
          <option value="bar" ?selected=${this._chartType==="bar"}>Bar</option>
          <option value="line" ?selected=${this._chartType==="line"}>Line</option>
          <option value="pie" ?selected=${this._chartType==="pie"}>Pie</option>
          <option value="doughnut" ?selected=${this._chartType==="doughnut"}>Doughnut</option>
        </select>
        <label>${qc.has(this._chartType)?"Split by:":"Granularity:"}</label>
        <select @change=${e=>{this._granularity=e.target.value}}>
          ${qc.has(this._chartType)?z`
              <option value="byTag" ?selected=${this._granularity==="byTag"}>Tag</option>
              <option value="byMerchant" ?selected=${this._granularity==="byMerchant"}>Merchant</option>
              <option value="month" ?selected=${this._granularity==="month"}>Month</option>
            `:z`
              <option value="day" ?selected=${this._granularity==="day"}>Day</option>
              <option value="month" ?selected=${this._granularity==="month"}>Month</option>
              <option value="year" ?selected=${this._granularity==="year"}>Year</option>
              <option value="byTag" ?selected=${this._granularity==="byTag"}>By Tag</option>
              <option value="byMerchant" ?selected=${this._granularity==="byMerchant"}>By Merchant</option>
            `}
        </select>
        <label>Start date:</label>
        <input
          type="date"
          .value=${this._startDate}
          @input=${e=>{this._startDate=e.target.value}}
        />
        <label>End date:</label>
        <input
          type="date"
          .value=${this._endDate}
          @input=${e=>{this._endDate=e.target.value}}
        />
        <label>Tag:</label>
        <select @change=${e=>{const t=e.target.value;this._tagId=t||void 0}}>
          <option value="">All</option>
          ${this.tags.map(e=>z`<option value=${e._id} ?selected=${this._tagId===e._id}>${e.name}</option>`)}
        </select>
        <label>Merchant:</label>
        <select @change=${e=>{const t=e.target.value;this._merchantId=t||void 0}}>
          <option value="">All</option>
          ${this.merchants.map(e=>z`<option value=${e._id} ?selected=${this._merchantId===e._id}>${e.name}</option>`)}
        </select>
        <label>Width:</label>
        <select @change=${e=>{this._colSpan=Number(e.target.value)}}>
          <option value="1" ?selected=${this._colSpan===1}>1 col</option>
          <option value="2" ?selected=${this._colSpan===2}>2 col</option>
          <option value="3" ?selected=${this._colSpan===3}>3 col</option>
          <option value="4" ?selected=${this._colSpan===4}>4 col</option>
          <option value="5" ?selected=${this._colSpan===5}>5 col</option>
          <option value="6" ?selected=${this._colSpan===6}>6 col</option>
        </select>
        <label>Height:</label>
        <select @change=${e=>{this._rowSpan=Number(e.target.value)}}>
          <option value="1" ?selected=${this._rowSpan===1}>1 row</option>
          <option value="2" ?selected=${this._rowSpan===2}>2 rows</option>
          <option value="3" ?selected=${this._rowSpan===3}>3 rows</option>
          <option value="4" ?selected=${this._rowSpan===4}>4 rows</option>
        </select>
      </div>
      ${ql(this,As,_m).call(this)}
      <button @click=${ql(this,As,vm)}>${this.editingChart?"Update Chart":"Save to Dashboard"}</button>
    `}};As=new WeakSet;vm=function(){const e=this._title.trim();e&&(this.dispatchEvent(new CustomEvent("chart-saved",{detail:{id:this.editingChart?._id,title:e,chartType:this._chartType,granularity:this._granularity,startDate:this._startDate||void 0,endDate:this._endDate||void 0,tagId:this._tagId,merchantId:this._merchantId,colSpan:this._colSpan,rowSpan:this._rowSpan,excludedTagIds:this._excludedTagIds.length>0?this._excludedTagIds:void 0,excludedMerchantIds:this._excludedMerchantIds.length>0?this._excludedMerchantIds:void 0}})),this._title="",this._initialized=!1)};_m=function(){if(this._granularity!=="byTag"&&this._granularity!=="byMerchant")return"";const e=this._granularity==="byTag"?this.tags:this.merchants,t=this._granularity==="byTag"?this._excludedTagIds:this._excludedMerchantIds,n=this._granularity==="byTag"?"tags":"merchants";return z`
      <details class="exclusions" ?open=${this._showExclusions} @toggle=${i=>{this._showExclusions=i.target.open}}>
        <summary>Exclude ${n}</summary>
        <div class="checkbox-list">
          ${e.map(i=>z`
            <label>
              <input
                type="checkbox"
                ?checked=${t.includes(i._id)}
                @change=${r=>ql(this,As,ym).call(this,i._id,r.target.checked)}
              />
              ${i.name}
            </label>
          `)}
        </div>
      </details>
    `};ym=function(e,t){this._granularity==="byTag"?this._excludedTagIds=t?[...this._excludedTagIds,e]:this._excludedTagIds.filter(n=>n!==e):this._excludedMerchantIds=t?[...this._excludedMerchantIds,e]:this._excludedMerchantIds.filter(n=>n!==e)};Jt.styles=Et`
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
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary);
      color: white;
      border: none;
      border-radius: 4px;
      margin-right: 0.5rem;
    }
    button:hover {
      background-color: var(--budgee-primary-hover);
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
  `;ce([mt({type:Array})],Jt.prototype,"transactions",2);ce([mt({type:Array})],Jt.prototype,"tags",2);ce([mt({type:Array})],Jt.prototype,"merchants",2);ce([mt({type:Object})],Jt.prototype,"editingChart",2);ce([q()],Jt.prototype,"_title",2);ce([q()],Jt.prototype,"_chartType",2);ce([q()],Jt.prototype,"_granularity",2);ce([q()],Jt.prototype,"_startDate",2);ce([q()],Jt.prototype,"_endDate",2);ce([q()],Jt.prototype,"_tagId",2);ce([q()],Jt.prototype,"_merchantId",2);ce([q()],Jt.prototype,"_colSpan",2);ce([q()],Jt.prototype,"_rowSpan",2);ce([q()],Jt.prototype,"_excludedTagIds",2);ce([q()],Jt.prototype,"_excludedMerchantIds",2);ce([q()],Jt.prototype,"_showExclusions",2);ce([q()],Jt.prototype,"_initialized",2);Jt=ce([zt("chart-configurator")],Jt);function io(e){return e+.5|0}const oi=(e,t,n)=>Math.max(Math.min(e,n),t);function ps(e){return oi(io(e*2.55),0,255)}function di(e){return oi(io(e*255),0,255)}function Pn(e){return oi(io(e/2.55)/100,0,1)}function Bd(e){return oi(io(e*100),0,100)}const Ve={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Wl=[..."0123456789ABCDEF"],sS=e=>Wl[e&15],oS=e=>Wl[(e&240)>>4]+Wl[e&15],ko=e=>(e&240)>>4===(e&15),aS=e=>ko(e.r)&&ko(e.g)&&ko(e.b)&&ko(e.a);function cS(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&Ve[e[1]]*17,g:255&Ve[e[2]]*17,b:255&Ve[e[3]]*17,a:t===5?Ve[e[4]]*17:255}:(t===7||t===9)&&(n={r:Ve[e[1]]<<4|Ve[e[2]],g:Ve[e[3]]<<4|Ve[e[4]],b:Ve[e[5]]<<4|Ve[e[6]],a:t===9?Ve[e[7]]<<4|Ve[e[8]]:255})),n}const lS=(e,t)=>e<255?t(e):"";function uS(e){var t=aS(e)?sS:oS;return e?"#"+t(e.r)+t(e.g)+t(e.b)+lS(e.a,t):void 0}const hS=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function bm(e,t,n){const i=t*Math.min(n,1-n),r=(s,o=(s+e/30)%12)=>n-i*Math.max(Math.min(o-3,9-o,1),-1);return[r(0),r(8),r(4)]}function dS(e,t,n){const i=(r,s=(r+e/60)%6)=>n-n*t*Math.max(Math.min(s,4-s,1),0);return[i(5),i(3),i(1)]}function fS(e,t,n){const i=bm(e,1,.5);let r;for(t+n>1&&(r=1/(t+n),t*=r,n*=r),r=0;r<3;r++)i[r]*=1-t-n,i[r]+=t;return i}function pS(e,t,n,i,r){return e===r?(t-n)/i+(t<n?6:0):t===r?(n-e)/i+2:(e-t)/i+4}function Uu(e){const n=e.r/255,i=e.g/255,r=e.b/255,s=Math.max(n,i,r),o=Math.min(n,i,r),a=(s+o)/2;let c,l,h;return s!==o&&(h=s-o,l=a>.5?h/(2-s-o):h/(s+o),c=pS(n,i,r,h,s),c=c*60+.5),[c|0,l||0,a]}function Ku(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(di)}function Yu(e,t,n){return Ku(bm,e,t,n)}function gS(e,t,n){return Ku(fS,e,t,n)}function mS(e,t,n){return Ku(dS,e,t,n)}function wm(e){return(e%360+360)%360}function vS(e){const t=hS.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?ps(+t[5]):di(+t[5]));const r=wm(+t[2]),s=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?i=gS(r,s,o):t[1]==="hsv"?i=mS(r,s,o):i=Yu(r,s,o),{r:i[0],g:i[1],b:i[2],a:n}}function _S(e,t){var n=Uu(e);n[0]=wm(n[0]+t),n=Yu(n),e.r=n[0],e.g=n[1],e.b=n[2]}function yS(e){if(!e)return;const t=Uu(e),n=t[0],i=Bd(t[1]),r=Bd(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${r}%, ${Pn(e.a)})`:`hsl(${n}, ${i}%, ${r}%)`}const Nd={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},zd={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function bS(){const e={},t=Object.keys(zd),n=Object.keys(Nd);let i,r,s,o,a;for(i=0;i<t.length;i++){for(o=a=t[i],r=0;r<n.length;r++)s=n[r],a=a.replace(s,Nd[s]);s=parseInt(zd[o],16),e[a]=[s>>16&255,s>>8&255,s&255]}return e}let So;function wS(e){So||(So=bS(),So.transparent=[0,0,0,0]);const t=So[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const xS=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function kS(e){const t=xS.exec(e);let n=255,i,r,s;if(t){if(t[7]!==i){const o=+t[7];n=t[8]?ps(o):oi(o*255,0,255)}return i=+t[1],r=+t[3],s=+t[5],i=255&(t[2]?ps(i):oi(i,0,255)),r=255&(t[4]?ps(r):oi(r,0,255)),s=255&(t[6]?ps(s):oi(s,0,255)),{r:i,g:r,b:s,a:n}}}function SS(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Pn(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const Wc=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,yr=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function CS(e,t,n){const i=yr(Pn(e.r)),r=yr(Pn(e.g)),s=yr(Pn(e.b));return{r:di(Wc(i+n*(yr(Pn(t.r))-i))),g:di(Wc(r+n*(yr(Pn(t.g))-r))),b:di(Wc(s+n*(yr(Pn(t.b))-s))),a:e.a+n*(t.a-e.a)}}function Co(e,t,n){if(e){let i=Uu(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=Yu(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function xm(e,t){return e&&Object.assign(t||{},e)}function jd(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=di(e[3]))):(t=xm(e,{r:0,g:0,b:0,a:1}),t.a=di(t.a)),t}function $S(e){return e.charAt(0)==="r"?kS(e):vS(e)}class Ns{constructor(t){if(t instanceof Ns)return t;const n=typeof t;let i;n==="object"?i=jd(t):n==="string"&&(i=cS(t)||wS(t)||$S(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=xm(this._rgb);return t&&(t.a=Pn(t.a)),t}set rgb(t){this._rgb=jd(t)}rgbString(){return this._valid?SS(this._rgb):void 0}hexString(){return this._valid?uS(this._rgb):void 0}hslString(){return this._valid?yS(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,r=t.rgb;let s;const o=n===s?.5:n,a=2*o-1,c=i.a-r.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;s=1-l,i.r=255&l*i.r+s*r.r+.5,i.g=255&l*i.g+s*r.g+.5,i.b=255&l*i.b+s*r.b+.5,i.a=o*i.a+(1-o)*r.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=CS(this._rgb,t._rgb,n)),this}clone(){return new Ns(this.rgb)}alpha(t){return this._rgb.a=di(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=io(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Co(this._rgb,2,t),this}darken(t){return Co(this._rgb,2,-t),this}saturate(t){return Co(this._rgb,1,t),this}desaturate(t){return Co(this._rgb,1,-t),this}rotate(t){return _S(this._rgb,t),this}}function En(){}const MS=(()=>{let e=0;return()=>e++})();function vt(e){return e==null}function Bt(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function yt(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function qt(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function Fe(e,t){return qt(e)?e:t}function ft(e,t){return typeof e>"u"?t:e}const AS=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,km=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function Dt(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function Mt(e,t,n,i){let r,s,o;if(Bt(e))for(s=e.length,r=0;r<s;r++)t.call(n,e[r],r);else if(yt(e))for(o=Object.keys(e),s=o.length,r=0;r<s;r++)t.call(n,e[o[r]],o[r])}function Sa(e,t){let n,i,r,s;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(r=e[n],s=t[n],r.datasetIndex!==s.datasetIndex||r.index!==s.index)return!1;return!0}function Ca(e){if(Bt(e))return e.map(Ca);if(yt(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let r=0;for(;r<i;++r)t[n[r]]=Ca(e[n[r]]);return t}return e}function Sm(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function ES(e,t,n,i){if(!Sm(e))return;const r=t[e],s=n[e];yt(r)&&yt(s)?zs(r,s,i):t[e]=Ca(s)}function zs(e,t,n){const i=Bt(t)?t:[t],r=i.length;if(!yt(e))return e;n=n||{};const s=n.merger||ES;let o;for(let a=0;a<r;++a){if(o=i[a],!yt(o))continue;const c=Object.keys(o);for(let l=0,h=c.length;l<h;++l)s(c[l],e,o,n)}return e}function Es(e,t){return zs(e,t,{merger:TS})}function TS(e,t,n){if(!Sm(e))return;const i=t[e],r=n[e];yt(i)&&yt(r)?Es(i,r):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Ca(r))}const Fd={"":e=>e,x:e=>e.x,y:e=>e.y};function DS(e){const t=e.split("."),n=[];let i="";for(const r of t)i+=r,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function OS(e){const t=DS(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function pi(e,t){return(Fd[t]||(Fd[t]=OS(t)))(e)}function Xu(e){return e.charAt(0).toUpperCase()+e.slice(1)}const js=e=>typeof e<"u",gi=e=>typeof e=="function",qd=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function PS(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const kt=Math.PI,Pt=2*kt,IS=Pt+kt,$a=Number.POSITIVE_INFINITY,RS=kt/180,Ut=kt/2,Ei=kt/4,Wd=kt*2/3,ai=Math.log10,bn=Math.sign;function Ts(e,t,n){return Math.abs(e-t)<n}function Hd(e){const t=Math.round(e);e=Ts(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(ai(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function LS(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((r,s)=>r-s).pop(),t}function BS(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function Fr(e){return!BS(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function NS(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function Cm(e,t,n){let i,r,s;for(i=0,r=e.length;i<r;i++)s=e[i][n],isNaN(s)||(t.min=Math.min(t.min,s),t.max=Math.max(t.max,s))}function cn(e){return e*(kt/180)}function Gu(e){return e*(180/kt)}function Vd(e){if(!qt(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function $m(e,t){const n=t.x-e.x,i=t.y-e.y,r=Math.sqrt(n*n+i*i);let s=Math.atan2(i,n);return s<-.5*kt&&(s+=Pt),{angle:s,distance:r}}function Hl(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function zS(e,t){return(e-t+IS)%Pt-kt}function be(e){return(e%Pt+Pt)%Pt}function Fs(e,t,n,i){const r=be(e),s=be(t),o=be(n),a=be(s-r),c=be(o-r),l=be(r-s),h=be(r-o);return r===s||r===o||i&&s===o||a>c&&l<h}function ae(e,t,n){return Math.max(t,Math.min(n,e))}function jS(e){return ae(e,-32768,32767)}function Rn(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function Qu(e,t,n){n=n||(o=>e[o]<t);let i=e.length-1,r=0,s;for(;i-r>1;)s=r+i>>1,n(s)?r=s:i=s;return{lo:r,hi:i}}const Ln=(e,t,n,i)=>Qu(e,n,i?r=>{const s=e[r][t];return s<n||s===n&&e[r+1][t]===n}:r=>e[r][t]<n),FS=(e,t,n)=>Qu(e,n,i=>e[i][t]>=n);function qS(e,t,n){let i=0,r=e.length;for(;i<r&&e[i]<t;)i++;for(;r>i&&e[r-1]>n;)r--;return i>0||r<e.length?e.slice(i,r):e}const Mm=["push","pop","shift","splice","unshift"];function WS(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Mm.forEach(n=>{const i="_onData"+Xu(n),r=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...s){const o=r.apply(this,s);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...s)}),o}})})}function Ud(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,r=i.indexOf(t);r!==-1&&i.splice(r,1),!(i.length>0)&&(Mm.forEach(s=>{delete e[s]}),delete e._chartjs)}function Am(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Em=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Tm(e,t){let n=[],i=!1;return function(...r){n=r,i||(i=!0,Em.call(window,()=>{i=!1,e.apply(t,n)}))}}function HS(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const Ju=e=>e==="start"?"left":e==="end"?"right":"center",_e=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,VS=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function Dm(e,t,n){const i=t.length;let r=0,s=i;if(e._sorted){const{iScale:o,vScale:a,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,h=o.axis,{min:u,max:d,minDefined:f,maxDefined:v}=o.getUserBounds();if(f){if(r=Math.min(Ln(c,h,u).lo,n?i:Ln(t,h,o.getPixelForValue(u)).lo),l){const w=c.slice(0,r+1).reverse().findIndex(b=>!vt(b[a.axis]));r-=Math.max(0,w)}r=ae(r,0,i-1)}if(v){let w=Math.max(Ln(c,o.axis,d,!0).hi+1,n?0:Ln(t,h,o.getPixelForValue(d),!0).hi+1);if(l){const b=c.slice(w-1).findIndex(_=>!vt(_[a.axis]));w+=Math.max(0,b)}s=ae(w,r,i)-r}else s=i-r}return{start:r,count:s}}function Om(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,r={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=r,!0;const s=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,r),s}const $o=e=>e===0||e===1,Kd=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*Pt/n)),Yd=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*Pt/n)+1,Ds={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*Ut)+1,easeOutSine:e=>Math.sin(e*Ut),easeInOutSine:e=>-.5*(Math.cos(kt*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>$o(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>$o(e)?e:Kd(e,.075,.3),easeOutElastic:e=>$o(e)?e:Yd(e,.075,.3),easeInOutElastic(e){return $o(e)?e:e<.5?.5*Kd(e*2,.1125,.45):.5+.5*Yd(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Ds.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?Ds.easeInBounce(e*2)*.5:Ds.easeOutBounce(e*2-1)*.5+.5};function Zu(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Xd(e){return Zu(e)?e:new Ns(e)}function Hc(e){return Zu(e)?e:new Ns(e).saturate(.5).darken(.1).hexString()}const US=["x","y","borderWidth","radius","tension"],KS=["color","borderColor","backgroundColor"];function YS(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:KS},numbers:{type:"number",properties:US}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function XS(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Gd=new Map;function GS(e,t){t=t||{};const n=e+JSON.stringify(t);let i=Gd.get(n);return i||(i=new Intl.NumberFormat(e,t),Gd.set(n,i)),i}function ro(e,t,n){return GS(t,n).format(e)}const Pm={values(e){return Bt(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let r,s=e;if(n.length>1){const l=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(l<1e-4||l>1e15)&&(r="scientific"),s=QS(e,n)}const o=ai(Math.abs(s)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:r,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(c,this.options.ticks.format),ro(e,i,c)},logarithmic(e,t,n){if(e===0)return"0";const i=n[t].significand||e/Math.pow(10,Math.floor(ai(e)));return[1,2,3,5,10,15].includes(i)||t>.8*n.length?Pm.numeric.call(this,e,t,n):""}};function QS(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Ua={formatters:Pm};function JS(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ua.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const nr=Object.create(null),Vl=Object.create(null);function Os(e,t){if(!t)return e;const n=t.split(".");for(let i=0,r=n.length;i<r;++i){const s=n[i];e=e[s]||(e[s]=Object.create(null))}return e}function Vc(e,t,n){return typeof t=="string"?zs(Os(e,t),n):zs(Os(e,""),t)}class ZS{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,r)=>Hc(r.backgroundColor),this.hoverBorderColor=(i,r)=>Hc(r.borderColor),this.hoverColor=(i,r)=>Hc(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return Vc(this,t,n)}get(t){return Os(this,t)}describe(t,n){return Vc(Vl,t,n)}override(t,n){return Vc(nr,t,n)}route(t,n,i,r){const s=Os(this,t),o=Os(this,i),a="_"+n;Object.defineProperties(s,{[a]:{value:s[n],writable:!0},[n]:{enumerable:!0,get(){const c=this[a],l=o[r];return yt(c)?Object.assign({},l,c):ft(c,l)},set(c){this[a]=c}}})}apply(t){t.forEach(n=>n(this))}}var Nt=new ZS({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[YS,XS,JS]);function tC(e){return!e||vt(e.size)||vt(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function Ma(e,t,n,i,r){let s=t[r];return s||(s=t[r]=e.measureText(r).width,n.push(r)),s>i&&(i=s),i}function eC(e,t,n,i){i=i||{};let r=i.data=i.data||{},s=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(r=i.data={},s=i.garbageCollect=[],i.font=t),e.save(),e.font=t;let o=0;const a=n.length;let c,l,h,u,d;for(c=0;c<a;c++)if(u=n[c],u!=null&&!Bt(u))o=Ma(e,r,s,o,u);else if(Bt(u))for(l=0,h=u.length;l<h;l++)d=u[l],d!=null&&!Bt(d)&&(o=Ma(e,r,s,o,d));e.restore();const f=s.length/2;if(f>n.length){for(c=0;c<f;c++)delete r[s[c]];s.splice(0,f)}return o}function Ti(e,t,n){const i=e.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((t-r)*i)/i+r}function Qd(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function Ul(e,t,n,i){Im(e,t,n,i,null)}function Im(e,t,n,i,r){let s,o,a,c,l,h,u,d;const f=t.pointStyle,v=t.rotation,w=t.radius;let b=(v||0)*RS;if(f&&typeof f=="object"&&(s=f.toString(),s==="[object HTMLImageElement]"||s==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(b),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(w)||w<=0)){switch(e.beginPath(),f){default:r?e.ellipse(n,i,r/2,w,0,0,Pt):e.arc(n,i,w,0,Pt),e.closePath();break;case"triangle":h=r?r/2:w,e.moveTo(n+Math.sin(b)*h,i-Math.cos(b)*w),b+=Wd,e.lineTo(n+Math.sin(b)*h,i-Math.cos(b)*w),b+=Wd,e.lineTo(n+Math.sin(b)*h,i-Math.cos(b)*w),e.closePath();break;case"rectRounded":l=w*.516,c=w-l,o=Math.cos(b+Ei)*c,u=Math.cos(b+Ei)*(r?r/2-l:c),a=Math.sin(b+Ei)*c,d=Math.sin(b+Ei)*(r?r/2-l:c),e.arc(n-u,i-a,l,b-kt,b-Ut),e.arc(n+d,i-o,l,b-Ut,b),e.arc(n+u,i+a,l,b,b+Ut),e.arc(n-d,i+o,l,b+Ut,b+kt),e.closePath();break;case"rect":if(!v){c=Math.SQRT1_2*w,h=r?r/2:c,e.rect(n-h,i-c,2*h,2*c);break}b+=Ei;case"rectRot":u=Math.cos(b)*(r?r/2:w),o=Math.cos(b)*w,a=Math.sin(b)*w,d=Math.sin(b)*(r?r/2:w),e.moveTo(n-u,i-a),e.lineTo(n+d,i-o),e.lineTo(n+u,i+a),e.lineTo(n-d,i+o),e.closePath();break;case"crossRot":b+=Ei;case"cross":u=Math.cos(b)*(r?r/2:w),o=Math.cos(b)*w,a=Math.sin(b)*w,d=Math.sin(b)*(r?r/2:w),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"star":u=Math.cos(b)*(r?r/2:w),o=Math.cos(b)*w,a=Math.sin(b)*w,d=Math.sin(b)*(r?r/2:w),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o),b+=Ei,u=Math.cos(b)*(r?r/2:w),o=Math.cos(b)*w,a=Math.sin(b)*w,d=Math.sin(b)*(r?r/2:w),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"line":o=r?r/2:Math.cos(b)*w,a=Math.sin(b)*w,e.moveTo(n-o,i-a),e.lineTo(n+o,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(b)*(r?r/2:w),i+Math.sin(b)*w);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Bn(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function Ka(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Ya(e){e.restore()}function nC(e,t,n,i,r){if(!t)return e.lineTo(n.x,n.y);if(r==="middle"){const s=(t.x+n.x)/2;e.lineTo(s,t.y),e.lineTo(s,n.y)}else r==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function iC(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function rC(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),vt(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function sC(e,t,n,i,r){if(r.strikethrough||r.underline){const s=e.measureText(i),o=t-s.actualBoundingBoxLeft,a=t+s.actualBoundingBoxRight,c=n-s.actualBoundingBoxAscent,l=n+s.actualBoundingBoxDescent,h=r.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=r.decorationWidth||2,e.moveTo(o,h),e.lineTo(a,h),e.stroke()}}function oC(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function ir(e,t,n,i,r,s={}){const o=Bt(t)?t:[t],a=s.strokeWidth>0&&s.strokeColor!=="";let c,l;for(e.save(),e.font=r.string,rC(e,s),c=0;c<o.length;++c)l=o[c],s.backdrop&&oC(e,s.backdrop),a&&(s.strokeColor&&(e.strokeStyle=s.strokeColor),vt(s.strokeWidth)||(e.lineWidth=s.strokeWidth),e.strokeText(l,n,i,s.maxWidth)),e.fillText(l,n,i,s.maxWidth),sC(e,n,i,l,s),i+=Number(r.lineHeight);e.restore()}function qs(e,t){const{x:n,y:i,w:r,h:s,radius:o}=t;e.arc(n+o.topLeft,i+o.topLeft,o.topLeft,1.5*kt,kt,!0),e.lineTo(n,i+s-o.bottomLeft),e.arc(n+o.bottomLeft,i+s-o.bottomLeft,o.bottomLeft,kt,Ut,!0),e.lineTo(n+r-o.bottomRight,i+s),e.arc(n+r-o.bottomRight,i+s-o.bottomRight,o.bottomRight,Ut,0,!0),e.lineTo(n+r,i+o.topRight),e.arc(n+r-o.topRight,i+o.topRight,o.topRight,0,-Ut,!0),e.lineTo(n+o.topLeft,i)}const aC=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,cC=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function lC(e,t){const n=(""+e).match(aC);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const uC=e=>+e||0;function th(e,t){const n={},i=yt(t),r=i?Object.keys(t):t,s=yt(e)?i?o=>ft(e[o],e[t[o]]):o=>e[o]:()=>e;for(const o of r)n[o]=uC(s(o));return n}function Rm(e){return th(e,{top:"y",right:"x",bottom:"y",left:"x"})}function Ki(e){return th(e,["topLeft","topRight","bottomLeft","bottomRight"])}function ke(e){const t=Rm(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function ie(e,t){e=e||{},t=t||Nt.font;let n=ft(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=ft(e.style,t.style);i&&!(""+i).match(cC)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const r={family:ft(e.family,t.family),lineHeight:lC(ft(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:ft(e.weight,t.weight),string:""};return r.string=tC(r),r}function gs(e,t,n,i){let r,s,o;for(r=0,s=e.length;r<s;++r)if(o=e[r],o!==void 0&&o!==void 0)return o}function hC(e,t,n){const{min:i,max:r}=e,s=km(t,(r-i)/2),o=(a,c)=>n&&a===0?0:a+c;return{min:o(i,-Math.abs(s)),max:o(r,s)}}function mi(e,t){return Object.assign(Object.create(e),t)}function eh(e,t=[""],n,i,r=()=>e[0]){const s=n||e;typeof i>"u"&&(i=zm("_fallback",e));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:s,_fallback:i,_getTarget:r,override:a=>eh([a,...e],t,s,i)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete e[0][c],!0},get(a,c){return Bm(a,c,()=>yC(c,t,e,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,c){return Zd(a).includes(c)},ownKeys(a){return Zd(a)},set(a,c,l){const h=a._storage||(a._storage=r());return a[c]=h[c]=l,delete a._keys,!0}})}function qr(e,t,n,i){const r={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Lm(e,i),setContext:s=>qr(e,s,n,i),override:s=>qr(e.override(s),t,n,i)};return new Proxy(r,{deleteProperty(s,o){return delete s[o],delete e[o],!0},get(s,o,a){return Bm(s,o,()=>fC(s,o,a))},getOwnPropertyDescriptor(s,o){return s._descriptors.allKeys?Reflect.has(e,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,o)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(s,o){return Reflect.has(e,o)},ownKeys(){return Reflect.ownKeys(e)},set(s,o,a){return e[o]=a,delete s[o],!0}})}function Lm(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:r=t.allKeys}=e;return{allKeys:r,scriptable:n,indexable:i,isScriptable:gi(n)?n:()=>n,isIndexable:gi(i)?i:()=>i}}const dC=(e,t)=>e?e+Xu(t):t,nh=(e,t)=>yt(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Bm(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function fC(e,t,n){const{_proxy:i,_context:r,_subProxy:s,_descriptors:o}=e;let a=i[t];return gi(a)&&o.isScriptable(t)&&(a=pC(t,a,e,n)),Bt(a)&&a.length&&(a=gC(t,a,e,o.isIndexable)),nh(t,a)&&(a=qr(a,r,s&&s[t],o)),a}function pC(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let c=t(s,o||i);return a.delete(e),nh(e,c)&&(c=ih(r._scopes,r,e,c)),c}function gC(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_descriptors:a}=n;if(typeof s.index<"u"&&i(e))return t[s.index%t.length];if(yt(t[0])){const c=t,l=r._scopes.filter(h=>h!==c);t=[];for(const h of c){const u=ih(l,r,e,h);t.push(qr(u,s,o&&o[e],a))}}return t}function Nm(e,t,n){return gi(e)?e(t,n):e}const mC=(e,t)=>e===!0?t:typeof e=="string"?pi(t,e):void 0;function vC(e,t,n,i,r){for(const s of t){const o=mC(n,s);if(o){e.add(o);const a=Nm(o._fallback,n,r);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(o===!1&&typeof i<"u"&&n!==i)return null}return!1}function ih(e,t,n,i){const r=t._rootScopes,s=Nm(t._fallback,n,i),o=[...e,...r],a=new Set;a.add(i);let c=Jd(a,o,n,s||n,i);return c===null||typeof s<"u"&&s!==n&&(c=Jd(a,o,s,c,i),c===null)?!1:eh(Array.from(a),[""],r,s,()=>_C(t,n,i))}function Jd(e,t,n,i,r){for(;n;)n=vC(e,t,n,i,r);return n}function _C(e,t,n){const i=e._getTarget();t in i||(i[t]={});const r=i[t];return Bt(r)&&yt(n)?n:r||{}}function yC(e,t,n,i){let r;for(const s of t)if(r=zm(dC(s,e),n),typeof r<"u")return nh(e,r)?ih(n,i,e,r):r}function zm(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function Zd(e){let t=e._keys;return t||(t=e._keys=bC(e._scopes)),t}function bC(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(r=>!r.startsWith("_")))t.add(i);return Array.from(t)}function jm(e,t,n,i){const{iScale:r}=e,{key:s="r"}=this._parsing,o=new Array(i);let a,c,l,h;for(a=0,c=i;a<c;++a)l=a+n,h=t[l],o[a]={r:r.parse(pi(h,s),l)};return o}const wC=Number.EPSILON||1e-14,Wr=(e,t)=>t<e.length&&!e[t].skip&&e[t],Fm=e=>e==="x"?"y":"x";function xC(e,t,n,i){const r=e.skip?t:e,s=t,o=n.skip?t:n,a=Hl(s,r),c=Hl(o,s);let l=a/(a+c),h=c/(a+c);l=isNaN(l)?0:l,h=isNaN(h)?0:h;const u=i*l,d=i*h;return{previous:{x:s.x-u*(o.x-r.x),y:s.y-u*(o.y-r.y)},next:{x:s.x+d*(o.x-r.x),y:s.y+d*(o.y-r.y)}}}function kC(e,t,n){const i=e.length;let r,s,o,a,c,l=Wr(e,0);for(let h=0;h<i-1;++h)if(c=l,l=Wr(e,h+1),!(!c||!l)){if(Ts(t[h],0,wC)){n[h]=n[h+1]=0;continue}r=n[h]/t[h],s=n[h+1]/t[h],a=Math.pow(r,2)+Math.pow(s,2),!(a<=9)&&(o=3/Math.sqrt(a),n[h]=r*o*t[h],n[h+1]=s*o*t[h])}}function SC(e,t,n="x"){const i=Fm(n),r=e.length;let s,o,a,c=Wr(e,0);for(let l=0;l<r;++l){if(o=a,a=c,c=Wr(e,l+1),!a)continue;const h=a[n],u=a[i];o&&(s=(h-o[n])/3,a[`cp1${n}`]=h-s,a[`cp1${i}`]=u-s*t[l]),c&&(s=(c[n]-h)/3,a[`cp2${n}`]=h+s,a[`cp2${i}`]=u+s*t[l])}}function CC(e,t="x"){const n=Fm(t),i=e.length,r=Array(i).fill(0),s=Array(i);let o,a,c,l=Wr(e,0);for(o=0;o<i;++o)if(a=c,c=l,l=Wr(e,o+1),!!c){if(l){const h=l[t]-c[t];r[o]=h!==0?(l[n]-c[n])/h:0}s[o]=a?l?bn(r[o-1])!==bn(r[o])?0:(r[o-1]+r[o])/2:r[o-1]:r[o]}kC(e,r,s),SC(e,s,t)}function Mo(e,t,n){return Math.max(Math.min(e,n),t)}function $C(e,t){let n,i,r,s,o,a=Bn(e[0],t);for(n=0,i=e.length;n<i;++n)o=s,s=a,a=n<i-1&&Bn(e[n+1],t),s&&(r=e[n],o&&(r.cp1x=Mo(r.cp1x,t.left,t.right),r.cp1y=Mo(r.cp1y,t.top,t.bottom)),a&&(r.cp2x=Mo(r.cp2x,t.left,t.right),r.cp2y=Mo(r.cp2y,t.top,t.bottom)))}function MC(e,t,n,i,r){let s,o,a,c;if(t.spanGaps&&(e=e.filter(l=>!l.skip)),t.cubicInterpolationMode==="monotone")CC(e,r);else{let l=i?e[e.length-1]:e[0];for(s=0,o=e.length;s<o;++s)a=e[s],c=xC(l,a,e[Math.min(s+1,o-(i?0:1))%o],t.tension),a.cp1x=c.previous.x,a.cp1y=c.previous.y,a.cp2x=c.next.x,a.cp2y=c.next.y,l=a}t.capBezierPoints&&$C(e,n)}function rh(){return typeof window<"u"&&typeof document<"u"}function sh(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Aa(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const Xa=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function AC(e,t){return Xa(e).getPropertyValue(t)}const EC=["top","right","bottom","left"];function Yi(e,t,n){const i={};n=n?"-"+n:"";for(let r=0;r<4;r++){const s=EC[r];i[s]=parseFloat(e[t+"-"+s+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const TC=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function DC(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:r,offsetY:s}=i;let o=!1,a,c;if(TC(r,s,e.target))a=r,c=s;else{const l=t.getBoundingClientRect();a=i.clientX-l.left,c=i.clientY-l.top,o=!0}return{x:a,y:c,box:o}}function Li(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,r=Xa(n),s=r.boxSizing==="border-box",o=Yi(r,"padding"),a=Yi(r,"border","width"),{x:c,y:l,box:h}=DC(e,n),u=o.left+(h&&a.left),d=o.top+(h&&a.top);let{width:f,height:v}=t;return s&&(f-=o.width+a.width,v-=o.height+a.height),{x:Math.round((c-u)/f*n.width/i),y:Math.round((l-d)/v*n.height/i)}}function OC(e,t,n){let i,r;if(t===void 0||n===void 0){const s=e&&sh(e);if(!s)t=e.clientWidth,n=e.clientHeight;else{const o=s.getBoundingClientRect(),a=Xa(s),c=Yi(a,"border","width"),l=Yi(a,"padding");t=o.width-l.width-c.width,n=o.height-l.height-c.height,i=Aa(a.maxWidth,s,"clientWidth"),r=Aa(a.maxHeight,s,"clientHeight")}}return{width:t,height:n,maxWidth:i||$a,maxHeight:r||$a}}const ci=e=>Math.round(e*10)/10;function PC(e,t,n,i){const r=Xa(e),s=Yi(r,"margin"),o=Aa(r.maxWidth,e,"clientWidth")||$a,a=Aa(r.maxHeight,e,"clientHeight")||$a,c=OC(e,t,n);let{width:l,height:h}=c;if(r.boxSizing==="content-box"){const d=Yi(r,"border","width"),f=Yi(r,"padding");l-=f.width+d.width,h-=f.height+d.height}return l=Math.max(0,l-s.width),h=Math.max(0,i?l/i:h-s.height),l=ci(Math.min(l,o,c.maxWidth)),h=ci(Math.min(h,a,c.maxHeight)),l&&!h&&(h=ci(l/2)),(t!==void 0||n!==void 0)&&i&&c.height&&h>c.height&&(h=c.height,l=ci(Math.floor(h*i))),{width:l,height:h}}function tf(e,t,n){const i=t||1,r=ci(e.height*i),s=ci(e.width*i);e.height=ci(e.height),e.width=ci(e.width);const o=e.canvas;return o.style&&(n||!o.style.height&&!o.style.width)&&(o.style.height=`${e.height}px`,o.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||o.height!==r||o.width!==s?(e.currentDevicePixelRatio=i,o.height=r,o.width=s,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const IC=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};rh()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function ef(e,t){const n=AC(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function Bi(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function RC(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function LC(e,t,n,i){const r={x:e.cp2x,y:e.cp2y},s={x:t.cp1x,y:t.cp1y},o=Bi(e,r,n),a=Bi(r,s,n),c=Bi(s,t,n),l=Bi(o,a,n),h=Bi(a,c,n);return Bi(l,h,n)}const BC=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},NC=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Pr(e,t,n){return e?BC(t,n):NC()}function qm(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function Wm(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function Hm(e){return e==="angle"?{between:Fs,compare:zS,normalize:be}:{between:Rn,compare:(t,n)=>t-n,normalize:t=>t}}function nf({start:e,end:t,count:n,loop:i,style:r}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:r}}function zC(e,t,n){const{property:i,start:r,end:s}=n,{between:o,normalize:a}=Hm(i),c=t.length;let{start:l,end:h,loop:u}=e,d,f;if(u){for(l+=c,h+=c,d=0,f=c;d<f&&o(a(t[l%c][i]),r,s);++d)l--,h--;l%=c,h%=c}return h<l&&(h+=c),{start:l,end:h,loop:u,style:e.style}}function Vm(e,t,n){if(!n)return[e];const{property:i,start:r,end:s}=n,o=t.length,{compare:a,between:c,normalize:l}=Hm(i),{start:h,end:u,loop:d,style:f}=zC(e,t,n),v=[];let w=!1,b=null,_,y,g;const p=()=>c(r,g,_)&&a(r,g)!==0,m=()=>a(s,_)===0||c(s,g,_),x=()=>w||p(),M=()=>!w||m();for(let k=h,S=h;k<=u;++k)y=t[k%o],!y.skip&&(_=l(y[i]),_!==g&&(w=c(_,r,s),b===null&&x()&&(b=a(_,r)===0?k:S),b!==null&&M()&&(v.push(nf({start:b,end:k,loop:d,count:o,style:f})),b=null),S=k,g=_));return b!==null&&v.push(nf({start:b,end:u,loop:d,count:o,style:f})),v}function Um(e,t){const n=[],i=e.segments;for(let r=0;r<i.length;r++){const s=Vm(i[r],e.points,t);s.length&&n.push(...s)}return n}function jC(e,t,n,i){let r=0,s=t-1;if(n&&!i)for(;r<t&&!e[r].skip;)r++;for(;r<t&&e[r].skip;)r++;for(r%=t,n&&(s+=r);s>r&&e[s%t].skip;)s--;return s%=t,{start:r,end:s}}function FC(e,t,n,i){const r=e.length,s=[];let o=t,a=e[t],c;for(c=t+1;c<=n;++c){const l=e[c%r];l.skip||l.stop?a.skip||(i=!1,s.push({start:t%r,end:(c-1)%r,loop:i}),t=o=l.stop?c:null):(o=c,a.skip&&(t=c)),a=l}return o!==null&&s.push({start:t%r,end:o%r,loop:i}),s}function qC(e,t){const n=e.points,i=e.options.spanGaps,r=n.length;if(!r)return[];const s=!!e._loop,{start:o,end:a}=jC(n,r,s,i);if(i===!0)return rf(e,[{start:o,end:a,loop:s}],n,t);const c=a<o?a+r:a,l=!!e._fullLoop&&o===0&&a===r-1;return rf(e,FC(n,o,c,l),n,t)}function rf(e,t,n,i){return!i||!i.setContext||!n?t:WC(e,t,n,i)}function WC(e,t,n,i){const r=e._chart.getContext(),s=sf(e.options),{_datasetIndex:o,options:{spanGaps:a}}=e,c=n.length,l=[];let h=s,u=t[0].start,d=u;function f(v,w,b,_){const y=a?-1:1;if(v!==w){for(v+=c;n[v%c].skip;)v-=y;for(;n[w%c].skip;)w+=y;v%c!==w%c&&(l.push({start:v%c,end:w%c,loop:b,style:_}),h=_,u=w%c)}}for(const v of t){u=a?u:v.start;let w=n[u%c],b;for(d=u+1;d<=v.end;d++){const _=n[d%c];b=sf(i.setContext(mi(r,{type:"segment",p0:w,p1:_,p0DataIndex:(d-1)%c,p1DataIndex:d%c,datasetIndex:o}))),HC(b,h)&&f(u,d-1,v.loop,h),w=_,h=b}u<d-1&&f(u,d-1,v.loop,h)}return l}function sf(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function HC(e,t){if(!t)return!1;const n=[],i=function(r,s){return Zu(s)?(n.includes(s)||n.push(s),n.indexOf(s)):s};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Ao(e,t,n){return e.options.clip?e[n]:t[n]}function VC(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Ao(n,t,"left"),right:Ao(n,t,"right"),top:Ao(i,t,"top"),bottom:Ao(i,t,"bottom")}:t}function Km(e,t){const n=t._clip;if(n.disabled)return!1;const i=VC(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}class UC{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,r){const s=n.listeners[r],o=n.duration;s.forEach(a=>a({chart:t,initial:n.initial,numSteps:o,currentStep:Math.min(i-n.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=Em.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,r)=>{if(!i.running||!i.items.length)return;const s=i.items;let o=s.length-1,a=!1,c;for(;o>=0;--o)c=s[o],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),a=!0):(s[o]=s[s.length-1],s.pop());a&&(r.draw(),this._notify(r,i,t,"progress")),s.length||(i.running=!1,this._notify(r,i,t,"complete"),i.initial=!1),n+=s.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,r)=>Math.max(i,r._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let r=i.length-1;for(;r>=0;--r)i[r].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Tn=new UC;const of="transparent",KC={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=Xd(e||of),r=i.valid&&Xd(t||of);return r&&r.valid?r.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class YC{constructor(t,n,i,r){const s=n[i];r=gs([t.to,r,s,t.from]);const o=gs([t.from,s,r]);this._active=!0,this._fn=t.fn||KC[t.type||typeof o],this._easing=Ds[t.easing]||Ds.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=o,this._to=r,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const r=this._target[this._prop],s=i-this._start,o=this._duration-s;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=s,this._loop=!!t.loop,this._to=gs([t.to,n,r,t.from]),this._from=gs([t.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,r=this._prop,s=this._from,o=this._loop,a=this._to;let c;if(this._active=s!==a&&(o||n<i),!this._active){this._target[r]=a,this._notify(!0);return}if(n<0){this._target[r]=s;return}c=n/i%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[r]=this._fn(s,a,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let r=0;r<i.length;r++)i[r][n]()}}class Ym{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!yt(t))return;const n=Object.keys(Nt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(r=>{const s=t[r];if(!yt(s))return;const o={};for(const a of n)o[a]=s[a];(Bt(s.properties)&&s.properties||[r]).forEach(a=>{(a===r||!i.has(a))&&i.set(a,o)})})}_animateOptions(t,n){const i=n.options,r=GC(t,i);if(!r)return[];const s=this._createAnimations(r,i);return i.$shared&&XC(t.options.$animations,i).then(()=>{t.options=i},()=>{}),s}_createAnimations(t,n){const i=this._properties,r=[],s=t.$animations||(t.$animations={}),o=Object.keys(n),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const l=o[c];if(l.charAt(0)==="$")continue;if(l==="options"){r.push(...this._animateOptions(t,n));continue}const h=n[l];let u=s[l];const d=i.get(l);if(u)if(d&&u.active()){u.update(d,h,a);continue}else u.cancel();if(!d||!d.duration){t[l]=h;continue}s[l]=u=new YC(d,t,l,h),r.push(u)}return r}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return Tn.add(this._chart,i),!0}}function XC(e,t){const n=[],i=Object.keys(t);for(let r=0;r<i.length;r++){const s=e[i[r]];s&&s.active()&&n.push(s.wait())}return Promise.all(n)}function GC(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function af(e,t){const n=e&&e.options||{},i=n.reverse,r=n.min===void 0?t:0,s=n.max===void 0?t:0;return{start:i?s:r,end:i?r:s}}function QC(e,t,n){if(n===!1)return!1;const i=af(e,n),r=af(t,n);return{top:r.end,right:i.end,bottom:r.start,left:i.start}}function JC(e){let t,n,i,r;return yt(e)?(t=e.top,n=e.right,i=e.bottom,r=e.left):t=n=i=r=e,{top:t,right:n,bottom:i,left:r,disabled:e===!1}}function Xm(e,t){const n=[],i=e._getSortedDatasetMetas(t);let r,s;for(r=0,s=i.length;r<s;++r)n.push(i[r].index);return n}function cf(e,t,n,i={}){const r=e.keys,s=i.mode==="single";let o,a,c,l;if(t===null)return;let h=!1;for(o=0,a=r.length;o<a;++o){if(c=+r[o],c===n){if(h=!0,i.all)continue;break}l=e.values[c],qt(l)&&(s||t===0||bn(t)===bn(l))&&(t+=l)}return!h&&!i.all?0:t}function ZC(e,t){const{iScale:n,vScale:i}=t,r=n.axis==="x"?"x":"y",s=i.axis==="x"?"x":"y",o=Object.keys(e),a=new Array(o.length);let c,l,h;for(c=0,l=o.length;c<l;++c)h=o[c],a[c]={[r]:h,[s]:e[h]};return a}function Uc(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function t$(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function e$(e){const{min:t,max:n,minDefined:i,maxDefined:r}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function n$(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function lf(e,t,n,i){for(const r of t.getMatchingVisibleMetas(i).reverse()){const s=e[r.index];if(n&&s>0||!n&&s<0)return r.index}return null}function uf(e,t){const{chart:n,_cachedMeta:i}=e,r=n._stacks||(n._stacks={}),{iScale:s,vScale:o,index:a}=i,c=s.axis,l=o.axis,h=t$(s,o,i),u=t.length;let d;for(let f=0;f<u;++f){const v=t[f],{[c]:w,[l]:b}=v,_=v._stacks||(v._stacks={});d=_[l]=n$(r,h,w),d[a]=b,d._top=lf(d,o,!0,i.type),d._bottom=lf(d,o,!1,i.type);const y=d._visualValues||(d._visualValues={});y[a]=b}}function Kc(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function i$(e,t){return mi(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function r$(e,t,n){return mi(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function is(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const r of t){const s=r._stacks;if(!s||s[i]===void 0||s[i][n]===void 0)return;delete s[i][n],s[i]._visualValues!==void 0&&s[i]._visualValues[n]!==void 0&&delete s[i]._visualValues[n]}}}const Yc=e=>e==="reset"||e==="none",hf=(e,t)=>t?e:Object.assign({},e),s$=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:Xm(n,!0),values:null};class vi{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Uc(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&is(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),r=(u,d,f,v)=>u==="x"?d:u==="r"?v:f,s=n.xAxisID=ft(i.xAxisID,Kc(t,"x")),o=n.yAxisID=ft(i.yAxisID,Kc(t,"y")),a=n.rAxisID=ft(i.rAxisID,Kc(t,"r")),c=n.indexAxis,l=n.iAxisID=r(c,s,o,a),h=n.vAxisID=r(c,o,s,a);n.xScale=this.getScaleForId(s),n.yScale=this.getScaleForId(o),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(l),n.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Ud(this._data,this),t._stacked&&is(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(yt(n)){const r=this._cachedMeta;this._data=ZC(n,r)}else if(i!==n){if(i){Ud(i,this);const r=this._cachedMeta;is(r),r._parsed=[]}n&&Object.isExtensible(n)&&WS(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let r=!1;this._dataCheck();const s=n._stacked;n._stacked=Uc(n.vScale,n),n.stack!==i.stack&&(r=!0,is(n),n.stack=i.stack),this._resyncElements(t),(r||s!==n._stacked)&&(uf(this,n._parsed),n._stacked=Uc(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:r}=this,{iScale:s,_stacked:o}=i,a=s.axis;let c=t===0&&n===r.length?!0:i._sorted,l=t>0&&i._parsed[t-1],h,u,d;if(this._parsing===!1)i._parsed=r,i._sorted=!0,d=r;else{Bt(r[t])?d=this.parseArrayData(i,r,t,n):yt(r[t])?d=this.parseObjectData(i,r,t,n):d=this.parsePrimitiveData(i,r,t,n);const f=()=>u[a]===null||l&&u[a]<l[a];for(h=0;h<n;++h)i._parsed[h+t]=u=d[h],c&&(f()&&(c=!1),l=u);i._sorted=c}o&&uf(this,d)}parsePrimitiveData(t,n,i,r){const{iScale:s,vScale:o}=t,a=s.axis,c=o.axis,l=s.getLabels(),h=s===o,u=new Array(r);let d,f,v;for(d=0,f=r;d<f;++d)v=d+i,u[d]={[a]:h||s.parse(l[v],v),[c]:o.parse(n[v],v)};return u}parseArrayData(t,n,i,r){const{xScale:s,yScale:o}=t,a=new Array(r);let c,l,h,u;for(c=0,l=r;c<l;++c)h=c+i,u=n[h],a[c]={x:s.parse(u[0],h),y:o.parse(u[1],h)};return a}parseObjectData(t,n,i,r){const{xScale:s,yScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(r);let h,u,d,f;for(h=0,u=r;h<u;++h)d=h+i,f=n[d],l[h]={x:s.parse(pi(f,a),d),y:o.parse(pi(f,c),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const r=this.chart,s=this._cachedMeta,o=n[t.axis],a={keys:Xm(r,!0),values:n._stacks[t.axis]._visualValues};return cf(a,o,s.index,{mode:i})}updateRangeFromParsed(t,n,i,r){const s=i[n.axis];let o=s===null?NaN:s;const a=r&&i._stacks[n.axis];r&&a&&(r.values=a,o=cf(r,s,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,n){const i=this._cachedMeta,r=i._parsed,s=i._sorted&&t===i.iScale,o=r.length,a=this._getOtherScale(t),c=s$(n,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:u}=e$(a);let d,f;function v(){f=r[d];const w=f[a.axis];return!qt(f[t.axis])||h>w||u<w}for(d=0;d<o&&!(!v()&&(this.updateRangeFromParsed(l,t,f,c),s));++d);if(s){for(d=o-1;d>=0;--d)if(!v()){this.updateRangeFromParsed(l,t,f,c);break}}return l}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let r,s,o;for(r=0,s=n.length;r<s;++r)o=n[r][t.axis],qt(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,r=n.vScale,s=this.getParsed(t);return{label:i?""+i.getLabelForValue(s[i.axis]):"",value:r?""+r.getLabelForValue(s[r.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=JC(ft(this.options.clip,QC(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,r=i.data||[],s=n.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||r.length-a,l=this.options.drawActiveElementsOnTop;let h;for(i.dataset&&i.dataset.draw(t,s,a,c),h=a;h<a+c;++h){const u=r[h];u.hidden||(u.active&&l?o.push(u):u.draw(t,s))}for(h=0;h<o.length;++h)o[h].draw(t,s)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const r=this.getDataset();let s;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];s=o.$context||(o.$context=r$(this.getContext(),t,o)),s.parsed=this.getParsed(t),s.raw=r.data[t],s.index=s.dataIndex=t}else s=this.$context||(this.$context=i$(this.chart.getContext(),this.index)),s.dataset=r,s.index=s.datasetIndex=this.index;return s.active=!!n,s.mode=i,s}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const r=n==="active",s=this._cachedDataOpts,o=t+"-"+n,a=s[o],c=this.enableOptionSharing&&js(i);if(a)return hf(a,c);const l=this.chart.config,h=l.datasetElementScopeKeys(this._type,t),u=r?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),h),f=Object.keys(Nt.elements[t]),v=()=>this.getContext(i,r,n),w=l.resolveNamedOptions(d,f,v,u);return w.$shared&&(w.$shared=c,s[o]=Object.freeze(hf(w,c))),w}_resolveAnimations(t,n,i){const r=this.chart,s=this._cachedDataOpts,o=`animation-${n}`,a=s[o];if(a)return a;let c;if(r.options.animation!==!1){const h=this.chart.config,u=h.datasetAnimationScopeKeys(this._type,n),d=h.getOptionScopes(this.getDataset(),u);c=h.createResolver(d,this.getContext(t,i,n))}const l=new Ym(r,c&&c.animations);return c&&c._cacheable&&(s[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||Yc(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),r=this._sharedOptions,s=this.getSharedOptions(i),o=this.includeOptions(n,s)||s!==r;return this.updateSharedOptions(s,n,i),{sharedOptions:s,includeOptions:o}}updateElement(t,n,i,r){Yc(r)?Object.assign(t,i):this._resolveAnimations(n,r).update(t,i)}updateSharedOptions(t,n,i){t&&!Yc(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,r){t.active=r;const s=this.getStyle(n,r);this._resolveAnimations(n,i,r).update(t,{options:!r&&this.getSharedOptions(s)||s})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const r=i.length,s=n.length,o=Math.min(s,r);o&&this.parse(0,o),s>r?this._insertElements(r,s-r,t):s<r&&this._removeElements(s,r-s)}_insertElements(t,n,i=!0){const r=this._cachedMeta,s=r.data,o=t+n;let a;const c=l=>{for(l.length+=n,a=l.length-1;a>=o;a--)l[a]=l[a-n]};for(c(s),a=t;a<o;++a)s[a]=new this.dataElementType;this._parsing&&c(r._parsed),this.parse(t,n),i&&this.updateElements(s,t,n,"reset")}updateElements(t,n,i,r){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const r=i._parsed.splice(t,n);i._stacked&&is(i,r)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,r]=t;this[n](i,r)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function o$(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let i=[];for(let r=0,s=n.length;r<s;r++)i=i.concat(n[r].controller.getAllParsedValues(e));e._cache.$bar=Am(i.sort((r,s)=>r-s))}return e._cache.$bar}function a$(e){const t=e.iScale,n=o$(t,e.type);let i=t._length,r,s,o,a;const c=()=>{o===32767||o===-32768||(js(a)&&(i=Math.min(i,Math.abs(o-a)||i)),a=o)};for(r=0,s=n.length;r<s;++r)o=t.getPixelForValue(n[r]),c();for(a=void 0,r=0,s=t.ticks.length;r<s;++r)o=t.getPixelForTick(r),c();return i}function c$(e,t,n,i){const r=n.barThickness;let s,o;return vt(r)?(s=t.min*n.categoryPercentage,o=n.barPercentage):(s=r*i,o=1),{chunk:s/i,ratio:o,start:t.pixels[e]-s/2}}function l$(e,t,n,i){const r=t.pixels,s=r[e];let o=e>0?r[e-1]:null,a=e<r.length-1?r[e+1]:null;const c=n.categoryPercentage;o===null&&(o=s-(a===null?t.end-t.start:a-s)),a===null&&(a=s+s-o);const l=s-(s-Math.min(o,a))/2*c;return{chunk:Math.abs(a-o)/2*c/i,ratio:n.barPercentage,start:l}}function u$(e,t,n,i){const r=n.parse(e[0],i),s=n.parse(e[1],i),o=Math.min(r,s),a=Math.max(r,s);let c=o,l=a;Math.abs(o)>Math.abs(a)&&(c=a,l=o),t[n.axis]=l,t._custom={barStart:c,barEnd:l,start:r,end:s,min:o,max:a}}function Gm(e,t,n,i){return Bt(e)?u$(e,t,n,i):t[n.axis]=n.parse(e,i),t}function df(e,t,n,i){const r=e.iScale,s=e.vScale,o=r.getLabels(),a=r===s,c=[];let l,h,u,d;for(l=n,h=n+i;l<h;++l)d=t[l],u={},u[r.axis]=a||r.parse(o[l],l),c.push(Gm(d,u,s,l));return c}function Xc(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function h$(e,t,n){return e!==0?bn(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function d$(e){let t,n,i,r,s;return e.horizontal?(t=e.base>e.x,n="left",i="right"):(t=e.base<e.y,n="bottom",i="top"),t?(r="end",s="start"):(r="start",s="end"),{start:n,end:i,reverse:t,top:r,bottom:s}}function f$(e,t,n,i){let r=t.borderSkipped;const s={};if(!r){e.borderSkipped=s;return}if(r===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:c,top:l,bottom:h}=d$(e);r==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===i?r=l:(n._bottom||0)===i?r=h:(s[ff(h,o,a,c)]=!0,r=l)),s[ff(r,o,a,c)]=!0,e.borderSkipped=s}function ff(e,t,n,i){return i?(e=p$(e,t,n),e=pf(e,n,t)):e=pf(e,t,n),e}function p$(e,t,n){return e===t?n:e===n?t:e}function pf(e,t,n){return e==="start"?t:e==="end"?n:e}function g$(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class m$ extends vi{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,n,i,r){return df(t,n,i,r)}parseArrayData(t,n,i,r){return df(t,n,i,r)}parseObjectData(t,n,i,r){const{iScale:s,vScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=s.axis==="x"?a:c,h=o.axis==="x"?a:c,u=[];let d,f,v,w;for(d=i,f=i+r;d<f;++d)w=n[d],v={},v[s.axis]=s.parse(pi(w,l),d),u.push(Gm(pi(w,h),v,o,d));return u}updateRangeFromParsed(t,n,i,r){super.updateRangeFromParsed(t,n,i,r);const s=i._custom;s&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,s.min),t.max=Math.max(t.max,s.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:i,vScale:r}=n,s=this.getParsed(t),o=s._custom,a=Xc(o)?"["+o.start+", "+o.end+"]":""+r.getLabelForValue(s[r.axis]);return{label:""+i.getLabelForValue(s[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,i,r){const s=r==="reset",{index:o,_cachedMeta:{vScale:a}}=this,c=a.getBasePixel(),l=a.isHorizontal(),h=this._getRuler(),{sharedOptions:u,includeOptions:d}=this._getSharedOptions(n,r);for(let f=n;f<n+i;f++){const v=this.getParsed(f),w=s||vt(v[a.axis])?{base:c,head:c}:this._calculateBarValuePixels(f),b=this._calculateBarIndexPixels(f,h),_=(v._stacks||{})[a.axis],y={horizontal:l,base:w.base,enableBorderRadius:!_||Xc(v._custom)||o===_._top||o===_._bottom,x:l?w.head:b.center,y:l?b.center:w.head,height:l?b.size:Math.abs(w.size),width:l?Math.abs(w.size):b.size};d&&(y.options=u||this.resolveDataElementOptions(f,t[f].active?"active":r));const g=y.options||t[f].options;f$(y,g,_,o),g$(y,g,h.ratio),this.updateElement(t[f],f,y,r)}}_getStacks(t,n){const{iScale:i}=this._cachedMeta,r=i.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),s=i.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(n),c=a&&a[i.axis],l=h=>{const u=h._parsed.find(f=>f[i.axis]===c),d=u&&u[h.vScale.axis];if(vt(d)||isNaN(d))return!0};for(const h of r)if(!(n!==void 0&&l(h))&&((s===!1||o.indexOf(h.stack)===-1||s===void 0&&h.stack===void 0)&&o.push(h.stack),h.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[ft(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,i){const r=this._getStacks(t,i),s=n!==void 0?r.indexOf(n):-1;return s===-1?r.length-1:s}_getRuler(){const t=this.options,n=this._cachedMeta,i=n.iScale,r=[];let s,o;for(s=0,o=n.data.length;s<o;++s)r.push(i.getPixelForValue(this.getParsed(s)[i.axis],s));const a=t.barThickness;return{min:a||a$(n),pixels:r,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:i,index:r},options:{base:s,minBarLength:o}}=this,a=s||0,c=this.getParsed(t),l=c._custom,h=Xc(l);let u=c[n.axis],d=0,f=i?this.applyStack(n,c,i):u,v,w;f!==u&&(d=f-u,f=u),h&&(u=l.barStart,f=l.barEnd-l.barStart,u!==0&&bn(u)!==bn(l.barEnd)&&(d=0),d+=u);const b=!vt(s)&&!h?s:d;let _=n.getPixelForValue(b);if(this.chart.getDataVisibility(t)?v=n.getPixelForValue(d+f):v=_,w=v-_,Math.abs(w)<o){w=h$(w,n,a)*o,u===a&&(_-=w/2);const y=n.getPixelForDecimal(0),g=n.getPixelForDecimal(1),p=Math.min(y,g),m=Math.max(y,g);_=Math.max(Math.min(_,m),p),v=_+w,i&&!h&&(c._stacks[n.axis]._visualValues[r]=n.getValueForPixel(v)-n.getValueForPixel(_))}if(_===n.getPixelForValue(a)){const y=bn(w)*n.getLineWidthForValue(a)/2;_+=y,w-=y}return{size:w,base:_,head:v,center:v+w/2}}_calculateBarIndexPixels(t,n){const i=n.scale,r=this.options,s=r.skipNull,o=ft(r.maxBarThickness,1/0);let a,c;const l=this._getAxisCount();if(n.grouped){const h=s?this._getStackCount(t):n.stackCount,u=r.barThickness==="flex"?l$(t,n,r,h*l):c$(t,n,r,h*l),d=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(ft(d,this.getFirstScaleIdForIndexAxis())),v=this._getStackIndex(this.index,this._cachedMeta.stack,s?t:void 0)+f;a=u.start+u.chunk*v+u.chunk/2,c=Math.min(o,u.chunk*u.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(o,n.min*n.ratio);return{base:a-c/2,head:a+c/2,center:a,size:c}}draw(){const t=this._cachedMeta,n=t.vScale,i=t.data,r=i.length;let s=0;for(;s<r;++s)this.getParsed(s)[n.axis]!==null&&!i[s].hidden&&i[s].draw(this._ctx)}}class v$ extends vi{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,i,r){const s=super.parsePrimitiveData(t,n,i,r);for(let o=0;o<s.length;o++)s[o]._custom=this.resolveDataElementOptions(o+i).radius;return s}parseArrayData(t,n,i,r){const s=super.parseArrayData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=ft(a[2],this.resolveDataElementOptions(o+i).radius)}return s}parseObjectData(t,n,i,r){const s=super.parseObjectData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=ft(a&&a.r&&+a.r,this.resolveDataElementOptions(o+i).radius)}return s}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let i=t.length-1;i>=0;--i)n=Math.max(n,t[i].size(this.resolveDataElementOptions(i))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y),l=o._custom;return{label:i[t]||"",value:"("+a+", "+c+(l?", "+l:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:c,includeOptions:l}=this._getSharedOptions(n,r),h=o.axis,u=a.axis;for(let d=n;d<n+i;d++){const f=t[d],v=!s&&this.getParsed(d),w={},b=w[h]=s?o.getPixelForDecimal(.5):o.getPixelForValue(v[h]),_=w[u]=s?a.getBasePixel():a.getPixelForValue(v[u]);w.skip=isNaN(b)||isNaN(_),l&&(w.options=c||this.resolveDataElementOptions(d,f.active?"active":r),s&&(w.options.radius=0)),this.updateElement(f,d,w,r)}}resolveDataElementOptions(t,n){const i=this.getParsed(t);let r=super.resolveDataElementOptions(t,n);r.$shared&&(r=Object.assign({},r,{$shared:!1}));const s=r.radius;return n!=="active"&&(r.radius=0),r.radius+=ft(i&&i._custom,s),r}}function _$(e,t,n){let i=1,r=1,s=0,o=0;if(t<Pt){const a=e,c=a+t,l=Math.cos(a),h=Math.sin(a),u=Math.cos(c),d=Math.sin(c),f=(g,p,m)=>Fs(g,a,c,!0)?1:Math.max(p,p*n,m,m*n),v=(g,p,m)=>Fs(g,a,c,!0)?-1:Math.min(p,p*n,m,m*n),w=f(0,l,u),b=f(Ut,h,d),_=v(kt,l,u),y=v(kt+Ut,h,d);i=(w-_)/2,r=(b-y)/2,s=-(w+_)/2,o=-(b+y)/2}return{ratioX:i,ratioY:r,offsetX:s,offsetY:o}}class oh extends vi{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((c,l)=>{const u=t.getDatasetMeta(0).controller.getStyle(l);return{text:c,fillStyle:u.backgroundColor,fontColor:s,hidden:!t.getDataVisibility(l),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:r,pointStyle:i,borderRadius:o&&(a||u.borderRadius),index:l}}):[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}}};constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const i=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=i;else{let s=c=>+i[c];if(yt(i[t])){const{key:c="value"}=this._parsing;s=l=>+pi(i[l],c)}let o,a;for(o=t,a=t+n;o<a;++o)r._parsed[o]=s(o)}}_getRotation(){return cn(this.options.rotation-90)}_getCircumference(){return cn(this.options.circumference)}_getRotationExtents(){let t=Pt,n=-Pt;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const r=this.chart.getDatasetMeta(i).controller,s=r._getRotation(),o=r._getCircumference();t=Math.min(t,s),n=Math.max(n,s+o)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:i}=n,r=this._cachedMeta,s=r.data,o=this.getMaxBorderWidth()+this.getMaxOffset(s)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),c=Math.min(AS(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:h,rotation:u}=this._getRotationExtents(),{ratioX:d,ratioY:f,offsetX:v,offsetY:w}=_$(u,h,c),b=(i.width-o)/d,_=(i.height-o)/f,y=Math.max(Math.min(b,_)/2,0),g=km(this.options.radius,y),p=Math.max(g*c,0),m=(g-p)/this._getVisibleDatasetWeightTotal();this.offsetX=v*g,this.offsetY=w*g,r.total=this.calculateTotal(),this.outerRadius=g-m*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-m*l,0),this.updateElements(s,0,s.length,t)}_circumference(t,n){const i=this.options,r=this._cachedMeta,s=this._getCircumference();return n&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||r._parsed[t]===null||r.data[t].hidden?0:this.calculateCircumference(r._parsed[t]*s/Pt)}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,a=o.chartArea,l=o.options.animation,h=(a.left+a.right)/2,u=(a.top+a.bottom)/2,d=s&&l.animateScale,f=d?0:this.innerRadius,v=d?0:this.outerRadius,{sharedOptions:w,includeOptions:b}=this._getSharedOptions(n,r);let _=this._getRotation(),y;for(y=0;y<n;++y)_+=this._circumference(y,s);for(y=n;y<n+i;++y){const g=this._circumference(y,s),p=t[y],m={x:h+this.offsetX,y:u+this.offsetY,startAngle:_,endAngle:_+g,circumference:g,outerRadius:v,innerRadius:f};b&&(m.options=w||this.resolveDataElementOptions(y,p.active?"active":r)),_+=g,this.updateElement(p,y,m,r)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let i=0,r;for(r=0;r<n.length;r++){const s=t._parsed[r];s!==null&&!isNaN(s)&&this.chart.getDataVisibility(r)&&!n[r].hidden&&(i+=Math.abs(s))}return i}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?Pt*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=ro(n._parsed[t],i.options.locale);return{label:r[t]||"",value:s}}getMaxBorderWidth(t){let n=0;const i=this.chart;let r,s,o,a,c;if(!t){for(r=0,s=i.data.datasets.length;r<s;++r)if(i.isDatasetVisible(r)){o=i.getDatasetMeta(r),t=o.data,a=o.controller;break}}if(!t)return 0;for(r=0,s=t.length;r<s;++r)c=a.resolveDataElementOptions(r),c.borderAlign!=="inner"&&(n=Math.max(n,c.borderWidth||0,c.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let i=0,r=t.length;i<r;++i){const s=this.resolveDataElementOptions(i);n=Math.max(n,s.offset||0,s.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(n+=this._getRingWeight(i));return n}_getRingWeight(t){return Math.max(ft(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class y$ extends vi{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:r=[],_dataset:s}=n,o=this.chart._animationsDisabled;let{start:a,count:c}=Dm(n,r,o);this._drawStart=a,this._drawCount=c,Om(n)&&(a=0,c=r.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!s._decimated,i.points=r;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:l},t),this.updateElements(r,a,c,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,{sharedOptions:h,includeOptions:u}=this._getSharedOptions(n,r),d=o.axis,f=a.axis,{spanGaps:v,segment:w}=this.options,b=Fr(v)?v:Number.POSITIVE_INFINITY,_=this.chart._animationsDisabled||s||r==="none",y=n+i,g=t.length;let p=n>0&&this.getParsed(n-1);for(let m=0;m<g;++m){const x=t[m],M=_?x:{};if(m<n||m>=y){M.skip=!0;continue}const k=this.getParsed(m),S=vt(k[f]),E=M[d]=o.getPixelForValue(k[d],m),P=M[f]=s||S?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,k,c):k[f],m);M.skip=isNaN(E)||isNaN(P)||S,M.stop=m>0&&Math.abs(k[d]-p[d])>b,w&&(M.parsed=k,M.raw=l.data[m]),u&&(M.options=h||this.resolveDataElementOptions(m,x.active?"active":r)),_||this.updateElement(x,m,M,r),p=k}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,r=t.data||[];if(!r.length)return i;const s=r[0].size(this.resolveDataElementOptions(0)),o=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(i,s,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}class Qm extends vi{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:i,color:r}}=t.legend.options;return n.labels.map((s,o)=>{const c=t.getDatasetMeta(0).controller.getStyle(o);return{text:s,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:r,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=ro(n._parsed[t].r,i.options.locale);return{label:r[t]||"",value:s}}parseObjectData(t,n,i,r){return jm.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,r)=>{const s=this.getParsed(r).r;!isNaN(s)&&this.chart.getDataVisibility(r)&&(s<n.min&&(n.min=s),s>n.max&&(n.max=s))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,i=t.options,r=Math.min(n.right-n.left,n.bottom-n.top),s=Math.max(r/2,0),o=Math.max(i.cutoutPercentage?s/100*i.cutoutPercentage:1,0),a=(s-o)/t.getVisibleDatasetCount();this.outerRadius=s-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,c=o.options.animation,l=this._cachedMeta.rScale,h=l.xCenter,u=l.yCenter,d=l.getIndexAngle(0)-.5*kt;let f=d,v;const w=360/this.countVisibleElements();for(v=0;v<n;++v)f+=this._computeAngle(v,r,w);for(v=n;v<n+i;v++){const b=t[v];let _=f,y=f+this._computeAngle(v,r,w),g=o.getDataVisibility(v)?l.getDistanceFromCenterForValue(this.getParsed(v).r):0;f=y,s&&(c.animateScale&&(g=0),c.animateRotate&&(_=y=d));const p={x:h,y:u,innerRadius:0,outerRadius:g,startAngle:_,endAngle:y,options:this.resolveDataElementOptions(v,b.active?"active":r)};this.updateElement(b,v,p,r)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((i,r)=>{!isNaN(this.getParsed(r).r)&&this.chart.getDataVisibility(r)&&n++}),n}_computeAngle(t,n,i){return this.chart.getDataVisibility(t)?cn(this.resolveDataElementOptions(t,n).angle||i):0}}class b$ extends oh{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}class w$ extends vi{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const n=this._cachedMeta.vScale,i=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(i[n.axis])}}parseObjectData(t,n,i,r){return jm.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta,i=n.dataset,r=n.data||[],s=n.iScale.getLabels();if(i.points=r,t!=="resize"){const o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);const a={_loop:!0,_fullLoop:s.length===r.length,options:o};this.updateElement(i,void 0,a,t)}this.updateElements(r,0,r.length,t)}updateElements(t,n,i,r){const s=this._cachedMeta.rScale,o=r==="reset";for(let a=n;a<n+i;a++){const c=t[a],l=this.resolveDataElementOptions(a,c.active?"active":r),h=s.getPointPositionForValue(a,this.getParsed(a).r),u=o?s.xCenter:h.x,d=o?s.yCenter:h.y,f={x:u,y:d,angle:h.angle,skip:isNaN(u)||isNaN(d),options:l};this.updateElement(c,a,f,r)}}}class x$ extends vi{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y);return{label:i[t]||"",value:"("+a+", "+c+")"}}update(t){const n=this._cachedMeta,{data:i=[]}=n,r=this.chart._animationsDisabled;let{start:s,count:o}=Dm(n,i,r);if(this._drawStart=s,this._drawCount=o,Om(n)&&(s=0,o=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:c}=n;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!c._decimated,a.points=i;const l=this.resolveDatasetElementOptions(t);l.segment=this.options.segment,this.updateElement(a,void 0,{animated:!r,options:l},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(i,s,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,h=this.resolveDataElementOptions(n,r),u=this.getSharedOptions(h),d=this.includeOptions(r,u),f=o.axis,v=a.axis,{spanGaps:w,segment:b}=this.options,_=Fr(w)?w:Number.POSITIVE_INFINITY,y=this.chart._animationsDisabled||s||r==="none";let g=n>0&&this.getParsed(n-1);for(let p=n;p<n+i;++p){const m=t[p],x=this.getParsed(p),M=y?m:{},k=vt(x[v]),S=M[f]=o.getPixelForValue(x[f],p),E=M[v]=s||k?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,x,c):x[v],p);M.skip=isNaN(S)||isNaN(E)||k,M.stop=p>0&&Math.abs(x[f]-g[f])>_,b&&(M.parsed=x,M.raw=l.data[p]),d&&(M.options=u||this.resolveDataElementOptions(p,m.active?"active":r)),y||this.updateElement(m,p,M,r),g=x}this.updateSharedOptions(u,r,h)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let a=0;for(let c=n.length-1;c>=0;--c)a=Math.max(a,n[c].size(this.resolveDataElementOptions(c))/2);return a>0&&a}const i=t.dataset,r=i.options&&i.options.borderWidth||0;if(!n.length)return r;const s=n[0].size(this.resolveDataElementOptions(0)),o=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(r,s,o)/2}}var k$=Object.freeze({__proto__:null,BarController:m$,BubbleController:v$,DoughnutController:oh,LineController:y$,PieController:b$,PolarAreaController:Qm,RadarController:w$,ScatterController:x$});function Di(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class ah{static override(t){Object.assign(ah.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return Di()}parse(){return Di()}format(){return Di()}add(){return Di()}diff(){return Di()}startOf(){return Di()}endOf(){return Di()}}var S$={_date:ah};function C$(e,t,n,i){const{controller:r,data:s,_sorted:o}=e,a=r._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&s.length){const l=a._reversePixels?FS:Ln;if(i){if(r._sharedOptions){const h=s[0],u=typeof h.getRange=="function"&&h.getRange(t);if(u){const d=l(s,t,n-u),f=l(s,t,n+u);return{lo:d.lo,hi:f.hi}}}}else{const h=l(s,t,n);if(c){const{vScale:u}=r._cachedMeta,{_parsed:d}=e,f=d.slice(0,h.lo+1).reverse().findIndex(w=>!vt(w[u.axis]));h.lo-=Math.max(0,f);const v=d.slice(h.hi).findIndex(w=>!vt(w[u.axis]));h.hi+=Math.max(0,v)}return h}}return{lo:0,hi:s.length-1}}function Ga(e,t,n,i,r){const s=e.getSortedVisibleDatasetMetas(),o=n[t];for(let a=0,c=s.length;a<c;++a){const{index:l,data:h}=s[a],{lo:u,hi:d}=C$(s[a],t,o,r);for(let f=u;f<=d;++f){const v=h[f];v.skip||i(v,l,f)}}}function $$(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,r){const s=t?Math.abs(i.x-r.x):0,o=n?Math.abs(i.y-r.y):0;return Math.sqrt(Math.pow(s,2)+Math.pow(o,2))}}function Gc(e,t,n,i,r){const s=[];return!r&&!e.isPointInArea(t)||Ga(e,n,t,function(a,c,l){!r&&!Bn(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&s.push({element:a,datasetIndex:c,index:l})},!0),s}function M$(e,t,n,i){let r=[];function s(o,a,c){const{startAngle:l,endAngle:h}=o.getProps(["startAngle","endAngle"],i),{angle:u}=$m(o,{x:t.x,y:t.y});Fs(u,l,h)&&r.push({element:o,datasetIndex:a,index:c})}return Ga(e,n,t,s),r}function A$(e,t,n,i,r,s){let o=[];const a=$$(n);let c=Number.POSITIVE_INFINITY;function l(h,u,d){const f=h.inRange(t.x,t.y,r);if(i&&!f)return;const v=h.getCenterPoint(r);if(!(!!s||e.isPointInArea(v))&&!f)return;const b=a(t,v);b<c?(o=[{element:h,datasetIndex:u,index:d}],c=b):b===c&&o.push({element:h,datasetIndex:u,index:d})}return Ga(e,n,t,l),o}function Qc(e,t,n,i,r,s){return!s&&!e.isPointInArea(t)?[]:n==="r"&&!i?M$(e,t,n,r):A$(e,t,n,i,r,s)}function gf(e,t,n,i,r){const s=[],o=n==="x"?"inXRange":"inYRange";let a=!1;return Ga(e,n,t,(c,l,h)=>{c[o]&&c[o](t[n],r)&&(s.push({element:c,datasetIndex:l,index:h}),a=a||c.inRange(t.x,t.y,r))}),i&&!a?[]:s}var E$={modes:{index(e,t,n,i){const r=Li(t,e),s=n.axis||"x",o=n.includeInvisible||!1,a=n.intersect?Gc(e,r,s,i,o):Qc(e,r,s,!1,i,o),c=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(l=>{const h=a[0].index,u=l.data[h];u&&!u.skip&&c.push({element:u,datasetIndex:l.index,index:h})}),c):[]},dataset(e,t,n,i){const r=Li(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;let a=n.intersect?Gc(e,r,s,i,o):Qc(e,r,s,!1,i,o);if(a.length>0){const c=a[0].datasetIndex,l=e.getDatasetMeta(c).data;a=[];for(let h=0;h<l.length;++h)a.push({element:l[h],datasetIndex:c,index:h})}return a},point(e,t,n,i){const r=Li(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return Gc(e,r,s,i,o)},nearest(e,t,n,i){const r=Li(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return Qc(e,r,s,n.intersect,i,o)},x(e,t,n,i){const r=Li(t,e);return gf(e,r,"x",n.intersect,i)},y(e,t,n,i){const r=Li(t,e);return gf(e,r,"y",n.intersect,i)}}};const Jm=["left","top","right","bottom"];function rs(e,t){return e.filter(n=>n.pos===t)}function mf(e,t){return e.filter(n=>Jm.indexOf(n.pos)===-1&&n.box.axis===t)}function ss(e,t){return e.sort((n,i)=>{const r=t?i:n,s=t?n:i;return r.weight===s.weight?r.index-s.index:r.weight-s.weight})}function T$(e){const t=[];let n,i,r,s,o,a;for(n=0,i=(e||[]).length;n<i;++n)r=e[n],{position:s,options:{stack:o,stackWeight:a=1}}=r,t.push({index:n,box:r,pos:s,horizontal:r.isHorizontal(),weight:r.weight,stack:o&&s+o,stackWeight:a});return t}function D$(e){const t={};for(const n of e){const{stack:i,pos:r,stackWeight:s}=n;if(!i||!Jm.includes(r))continue;const o=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=s}return t}function O$(e,t){const n=D$(e),{vBoxMaxWidth:i,hBoxMaxHeight:r}=t;let s,o,a;for(s=0,o=e.length;s<o;++s){a=e[s];const{fullSize:c}=a.box,l=n[a.stack],h=l&&a.stackWeight/l.weight;a.horizontal?(a.width=h?h*i:c&&t.availableWidth,a.height=r):(a.width=i,a.height=h?h*r:c&&t.availableHeight)}return n}function P$(e){const t=T$(e),n=ss(t.filter(l=>l.box.fullSize),!0),i=ss(rs(t,"left"),!0),r=ss(rs(t,"right")),s=ss(rs(t,"top"),!0),o=ss(rs(t,"bottom")),a=mf(t,"x"),c=mf(t,"y");return{fullSize:n,leftAndTop:i.concat(s),rightAndBottom:r.concat(c).concat(o).concat(a),chartArea:rs(t,"chartArea"),vertical:i.concat(r).concat(c),horizontal:s.concat(o).concat(a)}}function vf(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function Zm(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function I$(e,t,n,i){const{pos:r,box:s}=n,o=e.maxPadding;if(!yt(r)){n.size&&(e[r]-=n.size);const u=i[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?s.height:s.width),n.size=u.size/u.count,e[r]+=n.size}s.getPadding&&Zm(o,s.getPadding());const a=Math.max(0,t.outerWidth-vf(o,e,"left","right")),c=Math.max(0,t.outerHeight-vf(o,e,"top","bottom")),l=a!==e.w,h=c!==e.h;return e.w=a,e.h=c,n.horizontal?{same:l,other:h}:{same:h,other:l}}function R$(e){const t=e.maxPadding;function n(i){const r=Math.max(t[i]-e[i],0);return e[i]+=r,r}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function L$(e,t){const n=t.maxPadding;function i(r){const s={left:0,top:0,right:0,bottom:0};return r.forEach(o=>{s[o]=Math.max(t[o],n[o])}),s}return i(e?["left","right"]:["top","bottom"])}function ms(e,t,n,i){const r=[];let s,o,a,c,l,h;for(s=0,o=e.length,l=0;s<o;++s){a=e[s],c=a.box,c.update(a.width||t.w,a.height||t.h,L$(a.horizontal,t));const{same:u,other:d}=I$(t,n,a,i);l|=u&&r.length,h=h||d,c.fullSize||r.push(a)}return l&&ms(r,t,n,i)||h}function Eo(e,t,n,i,r){e.top=n,e.left=t,e.right=t+i,e.bottom=n+r,e.width=i,e.height=r}function _f(e,t,n,i){const r=n.padding;let{x:s,y:o}=t;for(const a of e){const c=a.box,l=i[a.stack]||{placed:0,weight:1},h=a.stackWeight/l.weight||1;if(a.horizontal){const u=t.w*h,d=l.size||c.height;js(l.start)&&(o=l.start),c.fullSize?Eo(c,r.left,o,n.outerWidth-r.right-r.left,d):Eo(c,t.left+l.placed,o,u,d),l.start=o,l.placed+=u,o=c.bottom}else{const u=t.h*h,d=l.size||c.width;js(l.start)&&(s=l.start),c.fullSize?Eo(c,s,r.top,d,n.outerHeight-r.bottom-r.top):Eo(c,s,t.top+l.placed,d,u),l.start=s,l.placed+=u,s=c.right}}t.x=s,t.y=o}var xe={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const r=ke(e.options.layout.padding),s=Math.max(t-r.width,0),o=Math.max(n-r.height,0),a=P$(e.boxes),c=a.vertical,l=a.horizontal;Mt(e.boxes,w=>{typeof w.beforeLayout=="function"&&w.beforeLayout()});const h=c.reduce((w,b)=>b.box.options&&b.box.options.display===!1?w:w+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:r,availableWidth:s,availableHeight:o,vBoxMaxWidth:s/2/h,hBoxMaxHeight:o/2}),d=Object.assign({},r);Zm(d,ke(i));const f=Object.assign({maxPadding:d,w:s,h:o,x:r.left,y:r.top},r),v=O$(c.concat(l),u);ms(a.fullSize,f,u,v),ms(c,f,u,v),ms(l,f,u,v)&&ms(c,f,u,v),R$(f),_f(a.leftAndTop,f,u,v),f.x+=f.w,f.y+=f.h,_f(a.rightAndBottom,f,u,v),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},Mt(a.chartArea,w=>{const b=w.box;Object.assign(b,e.chartArea),b.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class tv{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,r){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,r?Math.floor(n/r):i)}}isAttached(t){return!0}updateConfig(t){}}class B$ extends tv{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Vo="$chartjs",N$={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},yf=e=>e===null||e==="";function z$(e,t){const n=e.style,i=e.getAttribute("height"),r=e.getAttribute("width");if(e[Vo]={initial:{height:i,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",yf(r)){const s=ef(e,"width");s!==void 0&&(e.width=s)}if(yf(i))if(e.style.height==="")e.height=e.width/(t||2);else{const s=ef(e,"height");s!==void 0&&(e.height=s)}return e}const ev=IC?{passive:!0}:!1;function j$(e,t,n){e&&e.addEventListener(t,n,ev)}function F$(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,ev)}function q$(e,t){const n=N$[e.type]||e.type,{x:i,y:r}=Li(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:r!==void 0?r:null}}function Ea(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function W$(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||Ea(a.addedNodes,i),o=o&&!Ea(a.removedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function H$(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||Ea(a.removedNodes,i),o=o&&!Ea(a.addedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const Ws=new Map;let bf=0;function nv(){const e=window.devicePixelRatio;e!==bf&&(bf=e,Ws.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function V$(e,t){Ws.size||window.addEventListener("resize",nv),Ws.set(e,t)}function U$(e){Ws.delete(e),Ws.size||window.removeEventListener("resize",nv)}function K$(e,t,n){const i=e.canvas,r=i&&sh(i);if(!r)return;const s=Tm((a,c)=>{const l=r.clientWidth;n(a,c),l<r.clientWidth&&n()},window),o=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,h=c.contentRect.height;l===0&&h===0||s(l,h)});return o.observe(r),V$(e,s),o}function Jc(e,t,n){n&&n.disconnect(),t==="resize"&&U$(e)}function Y$(e,t,n){const i=e.canvas,r=Tm(s=>{e.ctx!==null&&n(q$(s,e))},e);return j$(i,t,r),r}class X$ extends tv{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(z$(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[Vo])return!1;const i=n[Vo].initial;["height","width"].forEach(s=>{const o=i[s];vt(o)?n.removeAttribute(s):n.setAttribute(s,o)});const r=i.style||{};return Object.keys(r).forEach(s=>{n.style[s]=r[s]}),n.width=n.width,delete n[Vo],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const r=t.$proxies||(t.$proxies={}),o={attach:W$,detach:H$,resize:K$}[n]||Y$;r[n]=o(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),r=i[n];if(!r)return;({attach:Jc,detach:Jc,resize:Jc}[n]||F$)(t,n,r),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,r){return PC(t,n,i,r)}isAttached(t){const n=t&&sh(t);return!!(n&&n.isConnected)}}function G$(e){return!rh()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?B$:X$}class Gn{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return Fr(this.x)&&Fr(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const r={};return t.forEach(s=>{r[s]=i[s]&&i[s].active()?i[s]._to:this[s]}),r}}function Q$(e,t){const n=e.options.ticks,i=J$(e),r=Math.min(n.maxTicksLimit||i,i),s=n.major.enabled?t4(t):[],o=s.length,a=s[0],c=s[o-1],l=[];if(o>r)return e4(t,l,s,o/r),l;const h=Z$(s,t,r);if(o>0){let u,d;const f=o>1?Math.round((c-a)/(o-1)):null;for(To(t,l,h,vt(f)?0:a-f,a),u=0,d=o-1;u<d;u++)To(t,l,h,s[u],s[u+1]);return To(t,l,h,c,vt(f)?t.length:c+f),l}return To(t,l,h),l}function J$(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),r=e._maxLength/n;return Math.floor(Math.min(i,r))}function Z$(e,t,n){const i=n4(e),r=t.length/n;if(!i)return Math.max(r,1);const s=LS(i);for(let o=0,a=s.length-1;o<a;o++){const c=s[o];if(c>r)return c}return Math.max(r,1)}function t4(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function e4(e,t,n,i){let r=0,s=n[0],o;for(i=Math.ceil(i),o=0;o<e.length;o++)o===s&&(t.push(e[o]),r++,s=n[r*i])}function To(e,t,n,i,r){const s=ft(i,0),o=Math.min(ft(r,e.length),e.length);let a=0,c,l,h;for(n=Math.ceil(n),r&&(c=r-i,n=c/Math.floor(c/n)),h=s;h<0;)a++,h=Math.round(s+a*n);for(l=Math.max(s,0);l<o;l++)l===h&&(t.push(e[l]),a++,h=Math.round(s+a*n))}function n4(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const i4=e=>e==="left"?"right":e==="right"?"left":e,wf=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,xf=(e,t)=>Math.min(t||e,e);function kf(e,t){const n=[],i=e.length/t,r=e.length;let s=0;for(;s<r;s+=i)n.push(e[Math.floor(s)]);return n}function r4(e,t,n){const i=e.ticks.length,r=Math.min(t,i-1),s=e._startPixel,o=e._endPixel,a=1e-6;let c=e.getPixelForTick(r),l;if(!(n&&(i===1?l=Math.max(c-s,o-c):t===0?l=(e.getPixelForTick(1)-c)/2:l=(c-e.getPixelForTick(r-1))/2,c+=r<t?l:-l,c<s-a||c>o+a)))return c}function s4(e,t){Mt(e,n=>{const i=n.gc,r=i.length/2;let s;if(r>t){for(s=0;s<r;++s)delete n.data[i[s]];i.splice(0,r)}})}function os(e){return e.drawTicks?e.tickLength:0}function Sf(e,t){if(!e.display)return 0;const n=ie(e.font,t),i=ke(e.padding);return(Bt(e.text)?e.text.length:1)*n.lineHeight+i.height}function o4(e,t){return mi(e,{scale:t,type:"scale"})}function a4(e,t,n){return mi(e,{tick:n,index:t,type:"tick"})}function c4(e,t,n){let i=Ju(e);return(n&&t!=="right"||!n&&t==="right")&&(i=i4(i)),i}function l4(e,t,n,i){const{top:r,left:s,bottom:o,right:a,chart:c}=e,{chartArea:l,scales:h}=c;let u=0,d,f,v;const w=o-r,b=a-s;if(e.isHorizontal()){if(f=_e(i,s,a),yt(n)){const _=Object.keys(n)[0],y=n[_];v=h[_].getPixelForValue(y)+w-t}else n==="center"?v=(l.bottom+l.top)/2+w-t:v=wf(e,n,t);d=a-s}else{if(yt(n)){const _=Object.keys(n)[0],y=n[_];f=h[_].getPixelForValue(y)-b+t}else n==="center"?f=(l.left+l.right)/2-b+t:f=wf(e,n,t);v=_e(i,o,r),u=n==="left"?-Ut:Ut}return{titleX:f,titleY:v,maxWidth:d,rotation:u}}class hr extends Gn{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:r}=this;return t=Fe(t,Number.POSITIVE_INFINITY),n=Fe(n,Number.NEGATIVE_INFINITY),i=Fe(i,Number.POSITIVE_INFINITY),r=Fe(r,Number.NEGATIVE_INFINITY),{min:Fe(t,i),max:Fe(n,r),minDefined:qt(t),maxDefined:qt(n)}}getMinMax(t){let{min:n,max:i,minDefined:r,maxDefined:s}=this.getUserBounds(),o;if(r&&s)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)o=a[c].controller.getMinMax(this,t),r||(n=Math.min(n,o.min)),s||(i=Math.max(i,o.max));return n=s&&n>i?i:n,i=r&&n>i?n:i,{min:Fe(n,Fe(i,n)),max:Fe(i,Fe(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Dt(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:r,grace:s,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=hC(this,s,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?kf(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=Q$(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Dt(this.options.afterUpdate,[this])}beforeSetDimensions(){Dt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Dt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),Dt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Dt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,r,s;for(i=0,r=t.length;i<r;i++)s=t[i],s.label=Dt(n.callback,[s.value,i,t],this)}afterTickToLabelConversion(){Dt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Dt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=xf(this.ticks.length,t.ticks.maxTicksLimit),r=n.minRotation||0,s=n.maxRotation;let o=r,a,c,l;if(!this._isVisible()||!n.display||r>=s||i<=1||!this.isHorizontal()){this.labelRotation=r;return}const h=this._getLabelSizes(),u=h.widest.width,d=h.highest.height,f=ae(this.chart.width-u,0,this.maxWidth);a=t.offset?this.maxWidth/i:f/(i-1),u+6>a&&(a=f/(i-(t.offset?.5:1)),c=this.maxHeight-os(t.grid)-n.padding-Sf(t.title,this.chart.options.font),l=Math.sqrt(u*u+d*d),o=Gu(Math.min(Math.asin(ae((h.highest.height+6)/a,-1,1)),Math.asin(ae(c/l,-1,1))-Math.asin(ae(d/l,-1,1)))),o=Math.max(r,Math.min(s,o))),this.labelRotation=o}afterCalculateLabelRotation(){Dt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Dt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:r,grid:s}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=Sf(r,n.options.font);if(a?(t.width=this.maxWidth,t.height=os(s)+c):(t.height=this.maxHeight,t.width=os(s)+c),i.display&&this.ticks.length){const{first:l,last:h,widest:u,highest:d}=this._getLabelSizes(),f=i.padding*2,v=cn(this.labelRotation),w=Math.cos(v),b=Math.sin(v);if(a){const _=i.mirror?0:b*u.width+w*d.height;t.height=Math.min(this.maxHeight,t.height+_+f)}else{const _=i.mirror?0:w*u.width+b*d.height;t.width=Math.min(this.maxWidth,t.width+_+f)}this._calculatePadding(l,h,b,w)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,r){const{ticks:{align:s,padding:o},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let d=0,f=0;c?l?(d=r*t.width,f=i*n.height):(d=i*t.height,f=r*n.width):s==="start"?f=n.width:s==="end"?d=t.width:s!=="inner"&&(d=t.width/2,f=n.width/2),this.paddingLeft=Math.max((d-h+o)*this.width/(this.width-h),0),this.paddingRight=Math.max((f-u+o)*this.width/(this.width-u),0)}else{let h=n.height/2,u=t.height/2;s==="start"?(h=0,u=t.height):s==="end"&&(h=n.height,u=0),this.paddingTop=h+o,this.paddingBottom=u+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Dt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)vt(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=kf(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:r,_longestTextCache:s}=this,o=[],a=[],c=Math.floor(n/xf(n,i));let l=0,h=0,u,d,f,v,w,b,_,y,g,p,m;for(u=0;u<n;u+=c){if(v=t[u].label,w=this._resolveTickFontOptions(u),r.font=b=w.string,_=s[b]=s[b]||{data:{},gc:[]},y=w.lineHeight,g=p=0,!vt(v)&&!Bt(v))g=Ma(r,_.data,_.gc,g,v),p=y;else if(Bt(v))for(d=0,f=v.length;d<f;++d)m=v[d],!vt(m)&&!Bt(m)&&(g=Ma(r,_.data,_.gc,g,m),p+=y);o.push(g),a.push(p),l=Math.max(g,l),h=Math.max(p,h)}s4(s,n);const x=o.indexOf(l),M=a.indexOf(h),k=S=>({width:o[S]||0,height:a[S]||0});return{first:k(0),last:k(n-1),widest:k(x),highest:k(M),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return jS(this._alignToPixels?Ti(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=a4(this.getContext(),t,i))}return this.$context||(this.$context=o4(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=cn(this.labelRotation),i=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),s=this._getLabelSizes(),o=t.autoSkipPadding||0,a=s?s.widest.width+o:0,c=s?s.highest.height+o:0;return this.isHorizontal()?c*i>a*r?a/i:c/r:c*r<a*i?c/i:a/r}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,r=this.options,{grid:s,position:o,border:a}=r,c=s.offset,l=this.isHorizontal(),u=this.ticks.length+(c?1:0),d=os(s),f=[],v=a.setContext(this.getContext()),w=v.display?v.width:0,b=w/2,_=function(J){return Ti(i,J,w)};let y,g,p,m,x,M,k,S,E,P,B,j;if(o==="top")y=_(this.bottom),M=this.bottom-d,S=y-b,P=_(t.top)+b,j=t.bottom;else if(o==="bottom")y=_(this.top),P=t.top,j=_(t.bottom)-b,M=y+b,S=this.top+d;else if(o==="left")y=_(this.right),x=this.right-d,k=y-b,E=_(t.left)+b,B=t.right;else if(o==="right")y=_(this.left),E=t.left,B=_(t.right)-b,x=y+b,k=this.left+d;else if(n==="x"){if(o==="center")y=_((t.top+t.bottom)/2+.5);else if(yt(o)){const J=Object.keys(o)[0],U=o[J];y=_(this.chart.scales[J].getPixelForValue(U))}P=t.top,j=t.bottom,M=y+b,S=M+d}else if(n==="y"){if(o==="center")y=_((t.left+t.right)/2);else if(yt(o)){const J=Object.keys(o)[0],U=o[J];y=_(this.chart.scales[J].getPixelForValue(U))}x=y-b,k=x-d,E=t.left,B=t.right}const H=ft(r.ticks.maxTicksLimit,u),Q=Math.max(1,Math.ceil(u/H));for(g=0;g<u;g+=Q){const J=this.getContext(g),U=s.setContext(J),$=a.setContext(J),C=U.lineWidth,T=U.color,A=$.dash||[],O=$.dashOffset,L=U.tickWidth,V=U.tickColor,R=U.tickBorderDash||[],D=U.tickBorderDashOffset;p=r4(this,g,c),p!==void 0&&(m=Ti(i,p,C),l?x=k=E=B=m:M=S=P=j=m,f.push({tx1:x,ty1:M,tx2:k,ty2:S,x1:E,y1:P,x2:B,y2:j,width:C,color:T,borderDash:A,borderDashOffset:O,tickWidth:L,tickColor:V,tickBorderDash:R,tickBorderDashOffset:D}))}return this._ticksLength=u,this._borderValue=y,f}_computeLabelItems(t){const n=this.axis,i=this.options,{position:r,ticks:s}=i,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:h,mirror:u}=s,d=os(i.grid),f=d+h,v=u?-h:f,w=-cn(this.labelRotation),b=[];let _,y,g,p,m,x,M,k,S,E,P,B,j="middle";if(r==="top")x=this.bottom-v,M=this._getXAxisLabelAlignment();else if(r==="bottom")x=this.top+v,M=this._getXAxisLabelAlignment();else if(r==="left"){const Q=this._getYAxisLabelAlignment(d);M=Q.textAlign,m=Q.x}else if(r==="right"){const Q=this._getYAxisLabelAlignment(d);M=Q.textAlign,m=Q.x}else if(n==="x"){if(r==="center")x=(t.top+t.bottom)/2+f;else if(yt(r)){const Q=Object.keys(r)[0],J=r[Q];x=this.chart.scales[Q].getPixelForValue(J)+f}M=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")m=(t.left+t.right)/2-f;else if(yt(r)){const Q=Object.keys(r)[0],J=r[Q];m=this.chart.scales[Q].getPixelForValue(J)}M=this._getYAxisLabelAlignment(d).textAlign}n==="y"&&(c==="start"?j="top":c==="end"&&(j="bottom"));const H=this._getLabelSizes();for(_=0,y=a.length;_<y;++_){g=a[_],p=g.label;const Q=s.setContext(this.getContext(_));k=this.getPixelForTick(_)+s.labelOffset,S=this._resolveTickFontOptions(_),E=S.lineHeight,P=Bt(p)?p.length:1;const J=P/2,U=Q.color,$=Q.textStrokeColor,C=Q.textStrokeWidth;let T=M;o?(m=k,M==="inner"&&(_===y-1?T=this.options.reverse?"left":"right":_===0?T=this.options.reverse?"right":"left":T="center"),r==="top"?l==="near"||w!==0?B=-P*E+E/2:l==="center"?B=-H.highest.height/2-J*E+E:B=-H.highest.height+E/2:l==="near"||w!==0?B=E/2:l==="center"?B=H.highest.height/2-J*E:B=H.highest.height-P*E,u&&(B*=-1),w!==0&&!Q.showLabelBackdrop&&(m+=E/2*Math.sin(w))):(x=k,B=(1-P)*E/2);let A;if(Q.showLabelBackdrop){const O=ke(Q.backdropPadding),L=H.heights[_],V=H.widths[_];let R=B-O.top,D=0-O.left;switch(j){case"middle":R-=L/2;break;case"bottom":R-=L;break}switch(M){case"center":D-=V/2;break;case"right":D-=V;break;case"inner":_===y-1?D-=V:_>0&&(D-=V/2);break}A={left:D,top:R,width:V+O.width,height:L+O.height,color:Q.backdropColor}}b.push({label:p,font:S,textOffset:B,options:{rotation:w,color:U,strokeColor:$,strokeWidth:C,textAlign:T,textBaseline:j,translation:[m,x],backdrop:A}})}return b}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-cn(this.labelRotation))return t==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:r,padding:s}}=this.options,o=this._getLabelSizes(),a=t+s,c=o.widest.width;let l,h;return n==="left"?r?(h=this.right+s,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h+=c)):(h=this.right-a,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h=this.left)):n==="right"?r?(h=this.left+s,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h-=c)):(h=this.left+a,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h=this.right)):l="right",{textAlign:l,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:r,width:s,height:o}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,r,s,o),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(s=>s.value===t);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let s,o;const a=(c,l,h)=>{!h.width||!h.color||(i.save(),i.lineWidth=h.width,i.strokeStyle=h.color,i.setLineDash(h.borderDash||[]),i.lineDashOffset=h.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(n.display)for(s=0,o=r.length;s<o;++s){const c=r[s];n.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),n.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:r}}=this,s=i.setContext(this.getContext()),o=i.display?s.width:0;if(!o)return;const a=r.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,h,u,d;this.isHorizontal()?(l=Ti(t,this.left,o)-o/2,h=Ti(t,this.right,a)+a/2,u=d=c):(u=Ti(t,this.top,o)-o/2,d=Ti(t,this.bottom,a)+a/2,l=h=c),n.save(),n.lineWidth=s.width,n.strokeStyle=s.color,n.beginPath(),n.moveTo(l,u),n.lineTo(h,d),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,r=this._computeLabelArea();r&&Ka(i,r);const s=this.getLabelItems(t);for(const o of s){const a=o.options,c=o.font,l=o.label,h=o.textOffset;ir(i,l,0,h,c,a)}r&&Ya(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:r}}=this;if(!i.display)return;const s=ie(i.font),o=ke(i.padding),a=i.align;let c=s.lineHeight/2;n==="bottom"||n==="center"||yt(n)?(c+=o.bottom,Bt(i.text)&&(c+=s.lineHeight*(i.text.length-1))):c+=o.top;const{titleX:l,titleY:h,maxWidth:u,rotation:d}=l4(this,c,n,a);ir(t,i.text,0,0,s,{color:i.color,maxWidth:u,rotation:d,textAlign:c4(a,n,r),textBaseline:"middle",translation:[l,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=ft(t.grid&&t.grid.z,-1),r=ft(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==hr.prototype.draw?[{z:n,draw:s=>{this.draw(s)}}]:[{z:i,draw:s=>{this.drawBackground(),this.drawGrid(s),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:s=>{this.drawLabels(s)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",r=[];let s,o;for(s=0,o=n.length;s<o;++s){const a=n[s];a[i]===this.id&&(!t||a.type===t)&&r.push(a)}return r}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return ie(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Do{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;d4(n)&&(i=this.register(n));const r=this.items,s=t.id,o=this.scope+"."+s;if(!s)throw new Error("class does not have id: "+t);return s in r||(r[s]=t,u4(t,o,i),this.override&&Nt.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,r=this.scope;i in n&&delete n[i],r&&i in Nt[r]&&(delete Nt[r][i],this.override&&delete nr[i])}}function u4(e,t,n){const i=zs(Object.create(null),[n?Nt.get(n):{},Nt.get(t),e.defaults]);Nt.set(t,i),e.defaultRoutes&&h4(t,e.defaultRoutes),e.descriptors&&Nt.describe(t,e.descriptors)}function h4(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),r=i.pop(),s=[e].concat(i).join("."),o=t[n].split("."),a=o.pop(),c=o.join(".");Nt.route(s,r,c,a)})}function d4(e){return"id"in e&&"defaults"in e}class f4{constructor(){this.controllers=new Do(vi,"datasets",!0),this.elements=new Do(Gn,"elements"),this.plugins=new Do(Object,"plugins"),this.scales=new Do(hr,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(r=>{const s=i||this._getRegistryForType(r);i||s.isForType(r)||s===this.plugins&&r.id?this._exec(t,s,r):Mt(r,o=>{const a=i||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,n,i){const r=Xu(t);Dt(i["before"+r],[],i),n[t](i),Dt(i["after"+r],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const r=n.get(t);if(r===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return r}}var gn=new f4;class p4{constructor(){this._init=void 0}notify(t,n,i,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const s=r?this._descriptors(t).filter(r):this._descriptors(t),o=this._notify(s,t,n,i);return n==="afterDestroy"&&(this._notify(s,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,n,i,r){r=r||{};for(const s of t){const o=s.plugin,a=o[i],c=[n,r,s.options];if(Dt(a,c,o)===!1&&r.cancelable)return!1}return!0}invalidate(){vt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,r=ft(i.options&&i.options.plugins,{}),s=g4(i);return r===!1&&!n?[]:v4(t,s,r,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,r=(s,o)=>s.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(r(n,i),t,"stop"),this._notify(r(i,n),t,"start")}}function g4(e){const t={},n=[],i=Object.keys(gn.plugins.items);for(let s=0;s<i.length;s++)n.push(gn.getPlugin(i[s]));const r=e.plugins||[];for(let s=0;s<r.length;s++){const o=r[s];n.indexOf(o)===-1&&(n.push(o),t[o.id]=!0)}return{plugins:n,localIds:t}}function m4(e,t){return!t&&e===!1?null:e===!0?{}:e}function v4(e,{plugins:t,localIds:n},i,r){const s=[],o=e.getContext();for(const a of t){const c=a.id,l=m4(i[c],r);l!==null&&s.push({plugin:a,options:_4(e.config,{plugin:a,local:n[c]},l,o)})}return s}function _4(e,{plugin:t,local:n},i,r){const s=e.pluginScopeKeys(t),o=e.getOptionScopes(i,s);return n&&t.defaults&&o.push(t.defaults),e.createResolver(o,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Kl(e,t){const n=Nt.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function y4(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function b4(e,t){return e===t?"_index_":"_value_"}function Cf(e){if(e==="x"||e==="y"||e==="r")return e}function w4(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function Yl(e,...t){if(Cf(e))return e;for(const n of t){const i=n.axis||w4(n.position)||e.length>1&&Cf(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function $f(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function x4(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return $f(e,"x",n[0])||$f(e,"y",n[0])}return{}}function k4(e,t){const n=nr[e.type]||{scales:{}},i=t.scales||{},r=Kl(e.type,t),s=Object.create(null);return Object.keys(i).forEach(o=>{const a=i[o];if(!yt(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=Yl(o,a,x4(o,e),Nt.scales[a.type]),l=b4(c,r),h=n.scales||{};s[o]=Es(Object.create(null),[{axis:c},a,h[c],h[l]])}),e.data.datasets.forEach(o=>{const a=o.type||e.type,c=o.indexAxis||Kl(a,t),h=(nr[a]||{}).scales||{};Object.keys(h).forEach(u=>{const d=y4(u,c),f=o[d+"AxisID"]||d;s[f]=s[f]||Object.create(null),Es(s[f],[{axis:d},i[f],h[u]])})}),Object.keys(s).forEach(o=>{const a=s[o];Es(a,[Nt.scales[a.type],Nt.scale])}),s}function iv(e){const t=e.options||(e.options={});t.plugins=ft(t.plugins,{}),t.scales=k4(e,t)}function rv(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function S4(e){return e=e||{},e.data=rv(e.data),iv(e),e}const Mf=new Map,sv=new Set;function Oo(e,t){let n=Mf.get(e);return n||(n=t(),Mf.set(e,n),sv.add(n)),n}const as=(e,t,n)=>{const i=pi(t,n);i!==void 0&&e.add(i)};class C4{constructor(t){this._config=S4(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=rv(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),iv(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Oo(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Oo(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Oo(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Oo(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let r=i.get(t);return(!r||n)&&(r=new Map,i.set(t,r)),r}getOptionScopes(t,n,i){const{options:r,type:s}=this,o=this._cachedScopes(t,i),a=o.get(n);if(a)return a;const c=new Set;n.forEach(h=>{t&&(c.add(t),h.forEach(u=>as(c,t,u))),h.forEach(u=>as(c,r,u)),h.forEach(u=>as(c,nr[s]||{},u)),h.forEach(u=>as(c,Nt,u)),h.forEach(u=>as(c,Vl,u))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),sv.has(n)&&o.set(n,l),l}chartOptionScopes(){const{options:t,type:n}=this;return[t,nr[n]||{},Nt.datasets[n]||{},{type:n},Nt,Vl]}resolveNamedOptions(t,n,i,r=[""]){const s={$shared:!0},{resolver:o,subPrefixes:a}=Af(this._resolverCache,t,r);let c=o;if(M4(o,n)){s.$shared=!1,i=gi(i)?i():i;const l=this.createResolver(t,i,a);c=qr(o,i,l)}for(const l of n)s[l]=c[l];return s}createResolver(t,n,i=[""],r){const{resolver:s}=Af(this._resolverCache,t,i);return yt(n)?qr(s,n,void 0,r):s}}function Af(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const r=n.join();let s=i.get(r);return s||(s={resolver:eh(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(r,s)),s}const $4=e=>yt(e)&&Object.getOwnPropertyNames(e).some(t=>gi(e[t]));function M4(e,t){const{isScriptable:n,isIndexable:i}=Lm(e);for(const r of t){const s=n(r),o=i(r),a=(o||s)&&e[r];if(s&&(gi(a)||$4(a))||o&&Bt(a))return!0}return!1}var A4="4.5.1";const E4=["top","bottom","left","right","chartArea"];function Ef(e,t){return e==="top"||e==="bottom"||E4.indexOf(e)===-1&&t==="x"}function Tf(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function Df(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),Dt(n&&n.onComplete,[e],t)}function T4(e){const t=e.chart,n=t.options.animation;Dt(n&&n.onProgress,[e],t)}function ov(e){return rh()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Uo={},Of=e=>{const t=ov(e);return Object.values(Uo).filter(n=>n.canvas===t).pop()};function D4(e,t,n){const i=Object.keys(e);for(const r of i){const s=+r;if(s>=t){const o=e[r];delete e[r],(n>0||s>t)&&(e[s+n]=o)}}}function O4(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class ch{static defaults=Nt;static instances=Uo;static overrides=nr;static registry=gn;static version=A4;static getChart=Of;static register(...t){gn.add(...t),Pf()}static unregister(...t){gn.remove(...t),Pf()}constructor(t,n){const i=this.config=new C4(n),r=ov(t),s=Of(r);if(s)throw new Error("Canvas is already in use. Chart with ID '"+s.id+"' must be destroyed before the canvas with ID '"+s.canvas.id+"' can be reused.");const o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||G$(r)),this.platform.updateConfig(i);const a=this.platform.acquireContext(r,o.aspectRatio),c=a&&a.canvas,l=c&&c.height,h=c&&c.width;if(this.id=MS(),this.ctx=a,this.canvas=c,this.width=h,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new p4,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=HS(u=>this.update(u),o.resizeDelay||0),this._dataChanges=[],Uo[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}Tn.listen(this,"complete",Df),Tn.listen(this,"progress",T4),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:r,_aspectRatio:s}=this;return vt(t)?n&&s?s:r?i/r:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return gn}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():tf(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Qd(this.canvas,this.ctx),this}stop(){return Tn.stop(this),this}resize(t,n){Tn.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,r=this.canvas,s=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(r,t,n,s),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,tf(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),Dt(i.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};Mt(n,(i,r)=>{i.id=r})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,r=Object.keys(i).reduce((o,a)=>(o[a]=!1,o),{});let s=[];n&&(s=s.concat(Object.keys(n).map(o=>{const a=n[o],c=Yl(o,a),l=c==="r",h=c==="x";return{options:a,dposition:l?"chartArea":h?"bottom":"left",dtype:l?"radialLinear":h?"category":"linear"}}))),Mt(s,o=>{const a=o.options,c=a.id,l=Yl(c,a),h=ft(a.type,o.dtype);(a.position===void 0||Ef(a.position,l)!==Ef(o.dposition))&&(a.position=o.dposition),r[c]=!0;let u=null;if(c in i&&i[c].type===h)u=i[c];else{const d=gn.getScale(h);u=new d({id:c,type:h,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(a,t)}),Mt(r,(o,a)=>{o||delete i[a]}),Mt(i,o=>{xe.configure(this,o,o.options),xe.addBox(this,o)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((r,s)=>r.index-s.index),i>n){for(let r=n;r<i;++r)this._destroyDatasetMeta(r);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(Tf("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,r)=>{n.filter(s=>s===i._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,r;for(this._removeUnreferencedMetasets(),i=0,r=n.length;i<r;i++){const s=n[i];let o=this.getDatasetMeta(i);const a=s.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=a,o.indexAxis=s.indexAxis||Kl(a,this.options),o.order=s.order||0,o.index=i,o.label=""+s.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const c=gn.getController(a),{datasetElementType:l,dataElementType:h}=Nt.datasets[a];Object.assign(c,{dataElementType:gn.getElement(h),datasetElementType:l&&gn.getElement(l)}),o.controller=new c(this,i),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){Mt(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const s=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,h=this.data.datasets.length;l<h;l++){const{controller:u}=this.getDatasetMeta(l),d=!r&&s.indexOf(u)===-1;u.buildOrUpdateElements(d),o=Math.max(+u.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),r||Mt(s,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Tf("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){Mt(this.scales,t=>{xe.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!qd(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:r,count:s}of n){const o=i==="_removeElements"?-s:s;D4(t,r,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=s=>new Set(t.filter(o=>o[0]===s).map((o,a)=>a+","+o.splice(1).join(","))),r=i(0);for(let s=1;s<n;s++)if(!qd(r,i(s)))return;return Array.from(r).map(s=>s.split(",")).map(s=>({method:s[1],start:+s[2],count:+s[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;xe.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],Mt(this.boxes,r=>{i&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,s)=>{r._idx=s}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,gi(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),r={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(i.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Tn.has(this)?this.attached&&!Tn.running(this)&&Tn.start(this):(this.draw(),Df({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let r,s;for(r=0,s=n.length;r<s;++r){const o=n[r];(!t||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},r=Km(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(r&&Ka(n,r),t.controller.draw(),r&&Ya(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Bn(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,r){const s=E$.modes[n];return typeof s=="function"?s(this,t,i,r):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let r=i.filter(s=>s&&s._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(r)),r}getContext(){return this.$context||(this.$context=mi(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const r=i?"show":"hide",s=this.getDatasetMeta(t),o=s.controller._resolveAnimations(void 0,r);js(n)?(s.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(s,{visible:i}),this.update(a=>a.datasetIndex===t?r:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),Tn.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Qd(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Uo[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(s,o)=>{n.addEventListener(this,s,o),t[s]=o},r=(s,o,a)=>{s.offsetX=o,s.offsetY=a,this._eventHandler(s)};Mt(this.options.events,s=>i(s,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(c,l)=>{n.addEventListener(this,c,l),t[c]=l},r=(c,l)=>{t[c]&&(n.removeEventListener(this,c,l),delete t[c])},s=(c,l)=>{this.canvas&&this.resize(c,l)};let o;const a=()=>{r("attach",a),this.attached=!0,this.resize(),i("resize",s),i("detach",o)};o=()=>{this.attached=!1,r("resize",s),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():o()}unbindEvents(){Mt(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},Mt(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const r=i?"set":"remove";let s,o,a,c;for(n==="dataset"&&(s=this.getDatasetMeta(t[0].datasetIndex),s.controller["_"+r+"DatasetHoverStyle"]()),a=0,c=t.length;a<c;++a){o=t[a];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[r+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:s,index:o})=>{const a=this.getDatasetMeta(s);if(!a)throw new Error("No dataset found at index "+s);return{datasetIndex:s,element:a.data[o],index:o}});!Sa(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const r=this.options.hover,s=(c,l)=>c.filter(h=>!l.some(u=>h.datasetIndex===u.datasetIndex&&h.index===u.index)),o=s(n,t),a=i?t:s(t,n);o.length&&this.updateHoverStyle(o,r.mode,!1),a.length&&r.mode&&this.updateHoverStyle(a,r.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},r=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,r)===!1)return;const s=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,r),(s||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:r=[],options:s}=this,o=n,a=this._getActiveElements(t,r,i,o),c=PS(t),l=O4(t,this._lastEvent,i,c);i&&(this._lastEvent=null,Dt(s.onHover,[t,a,this],this),c&&Dt(s.onClick,[t,a,this],this));const h=!Sa(a,r);return(h||n)&&(this._active=a,this._updateHoverStyles(a,r,n)),this._lastEvent=l,h}_getActiveElements(t,n,i,r){if(t.type==="mouseout")return[];if(!i)return n;const s=this.options.hover;return this.getElementsAtEventForMode(t,s.mode,s,r)}}function Pf(){return Mt(ch.instances,e=>e._plugins.invalidate())}function P4(e,t,n){const{startAngle:i,x:r,y:s,outerRadius:o,innerRadius:a,options:c}=t,{borderWidth:l,borderJoinStyle:h}=c,u=Math.min(l/o,be(i-n));if(e.beginPath(),e.arc(r,s,o-l/2,i+u/2,n-u/2),a>0){const d=Math.min(l/a,be(i-n));e.arc(r,s,a+l/2,n-d/2,i+d/2,!0)}else{const d=Math.min(l/2,o*be(i-n));if(h==="round")e.arc(r,s,d,n-kt/2,i+kt/2,!0);else if(h==="bevel"){const f=2*d*d,v=-f*Math.cos(n+kt/2)+r,w=-f*Math.sin(n+kt/2)+s,b=f*Math.cos(i+kt/2)+r,_=f*Math.sin(i+kt/2)+s;e.lineTo(v,w),e.lineTo(b,_)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function I4(e,t,n){const{startAngle:i,pixelMargin:r,x:s,y:o,outerRadius:a,innerRadius:c}=t;let l=r/a;e.beginPath(),e.arc(s,o,a,i-l,n+l),c>r?(l=r/c,e.arc(s,o,c,n+l,i-l,!0)):e.arc(s,o,r,n+Ut,i-Ut),e.closePath(),e.clip()}function R4(e){return th(e,["outerStart","outerEnd","innerStart","innerEnd"])}function L4(e,t,n,i){const r=R4(e.options.borderRadius),s=(n-t)/2,o=Math.min(s,i*t/2),a=c=>{const l=(n-Math.min(s,c))*i/2;return ae(c,0,Math.min(s,l))};return{outerStart:a(r.outerStart),outerEnd:a(r.outerEnd),innerStart:ae(r.innerStart,0,o),innerEnd:ae(r.innerEnd,0,o)}}function br(e,t,n,i){return{x:n+e*Math.cos(t),y:i+e*Math.sin(t)}}function Ta(e,t,n,i,r,s){const{x:o,y:a,startAngle:c,pixelMargin:l,innerRadius:h}=t,u=Math.max(t.outerRadius+i+n-l,0),d=h>0?h+i+n+l:0;let f=0;const v=r-c;if(i){const Q=h>0?h-i:0,J=u>0?u-i:0,U=(Q+J)/2,$=U!==0?v*U/(U+i):v;f=(v-$)/2}const w=Math.max(.001,v*u-n/kt)/u,b=(v-w)/2,_=c+b+f,y=r-b-f,{outerStart:g,outerEnd:p,innerStart:m,innerEnd:x}=L4(t,d,u,y-_),M=u-g,k=u-p,S=_+g/M,E=y-p/k,P=d+m,B=d+x,j=_+m/P,H=y-x/B;if(e.beginPath(),s){const Q=(S+E)/2;if(e.arc(o,a,u,S,Q),e.arc(o,a,u,Q,E),p>0){const C=br(k,E,o,a);e.arc(C.x,C.y,p,E,y+Ut)}const J=br(B,y,o,a);if(e.lineTo(J.x,J.y),x>0){const C=br(B,H,o,a);e.arc(C.x,C.y,x,y+Ut,H+Math.PI)}const U=(y-x/d+(_+m/d))/2;if(e.arc(o,a,d,y-x/d,U,!0),e.arc(o,a,d,U,_+m/d,!0),m>0){const C=br(P,j,o,a);e.arc(C.x,C.y,m,j+Math.PI,_-Ut)}const $=br(M,_,o,a);if(e.lineTo($.x,$.y),g>0){const C=br(M,S,o,a);e.arc(C.x,C.y,g,_-Ut,S)}}else{e.moveTo(o,a);const Q=Math.cos(S)*u+o,J=Math.sin(S)*u+a;e.lineTo(Q,J);const U=Math.cos(E)*u+o,$=Math.sin(E)*u+a;e.lineTo(U,$)}e.closePath()}function B4(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a}=t;let c=t.endAngle;if(s){Ta(e,t,n,i,c,r);for(let l=0;l<s;++l)e.fill();isNaN(a)||(c=o+(a%Pt||Pt))}return Ta(e,t,n,i,c,r),e.fill(),c}function N4(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a,options:c}=t,{borderWidth:l,borderJoinStyle:h,borderDash:u,borderDashOffset:d,borderRadius:f}=c,v=c.borderAlign==="inner";if(!l)return;e.setLineDash(u||[]),e.lineDashOffset=d,v?(e.lineWidth=l*2,e.lineJoin=h||"round"):(e.lineWidth=l,e.lineJoin=h||"bevel");let w=t.endAngle;if(s){Ta(e,t,n,i,w,r);for(let b=0;b<s;++b)e.stroke();isNaN(a)||(w=o+(a%Pt||Pt))}v&&I4(e,t,w),c.selfJoin&&w-o>=kt&&f===0&&h!=="miter"&&P4(e,t,w),s||(Ta(e,t,n,i,w,r),e.stroke())}class z4 extends Gn{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.getProps(["x","y"],i),{angle:s,distance:o}=$m(r,{x:t,y:n}),{startAngle:a,endAngle:c,innerRadius:l,outerRadius:h,circumference:u}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),d=(this.options.spacing+this.options.borderWidth)/2,f=ft(u,c-a),v=Fs(s,a,c)&&a!==c,w=f>=Pt||v,b=Rn(o,l+d,h+d);return w&&b}getCenterPoint(t){const{x:n,y:i,startAngle:r,endAngle:s,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:c,spacing:l}=this.options,h=(r+s)/2,u=(o+a+l+c)/2;return{x:n+Math.cos(h)*u,y:i+Math.sin(h)*u}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:n,circumference:i}=this,r=(n.offset||0)/4,s=(n.spacing||0)/2,o=n.circular;if(this.pixelMargin=n.borderAlign==="inner"?.33:0,this.fullCircles=i>Pt?Math.floor(i/Pt):0,i===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*r,Math.sin(a)*r);const c=1-Math.sin(Math.min(kt,i||0)),l=r*c;t.fillStyle=n.backgroundColor,t.strokeStyle=n.borderColor,B4(t,this,l,s,o),N4(t,this,l,s,o),t.restore()}}function av(e,t,n=t){e.lineCap=ft(n.borderCapStyle,t.borderCapStyle),e.setLineDash(ft(n.borderDash,t.borderDash)),e.lineDashOffset=ft(n.borderDashOffset,t.borderDashOffset),e.lineJoin=ft(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=ft(n.borderWidth,t.borderWidth),e.strokeStyle=ft(n.borderColor,t.borderColor)}function j4(e,t,n){e.lineTo(n.x,n.y)}function F4(e){return e.stepped?nC:e.tension||e.cubicInterpolationMode==="monotone"?iC:j4}function cv(e,t,n={}){const i=e.length,{start:r=0,end:s=i-1}=n,{start:o,end:a}=t,c=Math.max(r,o),l=Math.min(s,a),h=r<o&&s<o||r>a&&s>a;return{count:i,start:c,loop:t.loop,ilen:l<c&&!h?i+l-c:l-c}}function q4(e,t,n,i){const{points:r,options:s}=t,{count:o,start:a,loop:c,ilen:l}=cv(r,n,i),h=F4(s);let{move:u=!0,reverse:d}=i||{},f,v,w;for(f=0;f<=l;++f)v=r[(a+(d?l-f:f))%o],!v.skip&&(u?(e.moveTo(v.x,v.y),u=!1):h(e,w,v,d,s.stepped),w=v);return c&&(v=r[(a+(d?l:0))%o],h(e,w,v,d,s.stepped)),!!c}function W4(e,t,n,i){const r=t.points,{count:s,start:o,ilen:a}=cv(r,n,i),{move:c=!0,reverse:l}=i||{};let h=0,u=0,d,f,v,w,b,_;const y=p=>(o+(l?a-p:p))%s,g=()=>{w!==b&&(e.lineTo(h,b),e.lineTo(h,w),e.lineTo(h,_))};for(c&&(f=r[y(0)],e.moveTo(f.x,f.y)),d=0;d<=a;++d){if(f=r[y(d)],f.skip)continue;const p=f.x,m=f.y,x=p|0;x===v?(m<w?w=m:m>b&&(b=m),h=(u*h+p)/++u):(g(),e.lineTo(p,m),v=x,u=0,w=b=m),_=m}g()}function Xl(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?W4:q4}function H4(e){return e.stepped?RC:e.tension||e.cubicInterpolationMode==="monotone"?LC:Bi}function V4(e,t,n,i){let r=t._path;r||(r=t._path=new Path2D,t.path(r,n,i)&&r.closePath()),av(e,t.options),e.stroke(r)}function U4(e,t,n,i){const{segments:r,options:s}=t,o=Xl(t);for(const a of r)av(e,s,a.style),e.beginPath(),o(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const K4=typeof Path2D=="function";function Y4(e,t,n,i){K4&&!t.options.segment?V4(e,t,n,i):U4(e,t,n,i)}class Qa extends Gn{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const r=i.spanGaps?this._loop:this._fullLoop;MC(this._points,i,t,r,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=qC(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,r=t[n],s=this.points,o=Um(this,{property:n,start:r,end:r});if(!o.length)return;const a=[],c=H4(i);let l,h;for(l=0,h=o.length;l<h;++l){const{start:u,end:d}=o[l],f=s[u],v=s[d];if(f===v){a.push(f);continue}const w=Math.abs((r-f[n])/(v[n]-f[n])),b=c(f,v,w,i.stepped);b[n]=t[n],a.push(b)}return a.length===1?a[0]:a}pathSegment(t,n,i){return Xl(this)(t,this,n,i)}path(t,n,i){const r=this.segments,s=Xl(this);let o=this._loop;n=n||0,i=i||this.points.length-n;for(const a of r)o&=s(t,this,a,{start:n,end:n+i-1});return!!o}draw(t,n,i,r){const s=this.options||{};(this.points||[]).length&&s.borderWidth&&(t.save(),Y4(t,this,i,r),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function If(e,t,n,i){const r=e.options,{[n]:s}=e.getProps([n],i);return Math.abs(t-s)<r.radius+r.hitRadius}class X4 extends Gn{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.options,{x:s,y:o}=this.getProps(["x","y"],i);return Math.pow(t-s,2)+Math.pow(n-o,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(t,n){return If(this,t,"x",n)}inYRange(t,n){return If(this,t,"y",n)}getCenterPoint(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}size(t){t=t||this.options||{};let n=t.radius||0;n=Math.max(n,n&&t.hoverRadius||0);const i=n&&t.borderWidth||0;return(n+i)*2}draw(t,n){const i=this.options;this.skip||i.radius<.1||!Bn(this,n,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,Ul(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function lv(e,t){const{x:n,y:i,base:r,width:s,height:o}=e.getProps(["x","y","base","width","height"],t);let a,c,l,h,u;return e.horizontal?(u=o/2,a=Math.min(n,r),c=Math.max(n,r),l=i-u,h=i+u):(u=s/2,a=n-u,c=n+u,l=Math.min(i,r),h=Math.max(i,r)),{left:a,top:l,right:c,bottom:h}}function li(e,t,n,i){return e?0:ae(t,n,i)}function G4(e,t,n){const i=e.options.borderWidth,r=e.borderSkipped,s=Rm(i);return{t:li(r.top,s.top,0,n),r:li(r.right,s.right,0,t),b:li(r.bottom,s.bottom,0,n),l:li(r.left,s.left,0,t)}}function Q4(e,t,n){const{enableBorderRadius:i}=e.getProps(["enableBorderRadius"]),r=e.options.borderRadius,s=Ki(r),o=Math.min(t,n),a=e.borderSkipped,c=i||yt(r);return{topLeft:li(!c||a.top||a.left,s.topLeft,0,o),topRight:li(!c||a.top||a.right,s.topRight,0,o),bottomLeft:li(!c||a.bottom||a.left,s.bottomLeft,0,o),bottomRight:li(!c||a.bottom||a.right,s.bottomRight,0,o)}}function J4(e){const t=lv(e),n=t.right-t.left,i=t.bottom-t.top,r=G4(e,n/2,i/2),s=Q4(e,n/2,i/2);return{outer:{x:t.left,y:t.top,w:n,h:i,radius:s},inner:{x:t.left+r.l,y:t.top+r.t,w:n-r.l-r.r,h:i-r.t-r.b,radius:{topLeft:Math.max(0,s.topLeft-Math.max(r.t,r.l)),topRight:Math.max(0,s.topRight-Math.max(r.t,r.r)),bottomLeft:Math.max(0,s.bottomLeft-Math.max(r.b,r.l)),bottomRight:Math.max(0,s.bottomRight-Math.max(r.b,r.r))}}}}function Zc(e,t,n,i){const r=t===null,s=n===null,a=e&&!(r&&s)&&lv(e,i);return a&&(r||Rn(t,a.left,a.right))&&(s||Rn(n,a.top,a.bottom))}function Z4(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function tM(e,t){e.rect(t.x,t.y,t.w,t.h)}function tl(e,t,n={}){const i=e.x!==n.x?-t:0,r=e.y!==n.y?-t:0,s=(e.x+e.w!==n.x+n.w?t:0)-i,o=(e.y+e.h!==n.y+n.h?t:0)-r;return{x:e.x+i,y:e.y+r,w:e.w+s,h:e.h+o,radius:e.radius}}class eM extends Gn{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:i,backgroundColor:r}}=this,{inner:s,outer:o}=J4(this),a=Z4(o.radius)?qs:tM;t.save(),(o.w!==s.w||o.h!==s.h)&&(t.beginPath(),a(t,tl(o,n,s)),t.clip(),a(t,tl(s,-n,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,tl(s,n)),t.fillStyle=r,t.fill(),t.restore()}inRange(t,n,i){return Zc(this,t,n,i)}inXRange(t,n){return Zc(this,t,null,n)}inYRange(t,n){return Zc(this,null,t,n)}getCenterPoint(t){const{x:n,y:i,base:r,horizontal:s}=this.getProps(["x","y","base","horizontal"],t);return{x:s?(n+r)/2:n,y:s?i:(i+r)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}var nM=Object.freeze({__proto__:null,ArcElement:z4,BarElement:eM,LineElement:Qa,PointElement:X4});const Gl=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Rf=Gl.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function uv(e){return Gl[e%Gl.length]}function hv(e){return Rf[e%Rf.length]}function iM(e,t){return e.borderColor=uv(t),e.backgroundColor=hv(t),++t}function rM(e,t){return e.backgroundColor=e.data.map(()=>uv(t++)),t}function sM(e,t){return e.backgroundColor=e.data.map(()=>hv(t++)),t}function oM(e){let t=0;return(n,i)=>{const r=e.getDatasetMeta(i).controller;r instanceof oh?t=rM(n,t):r instanceof Qm?t=sM(n,t):r&&(t=iM(n,t))}}function Lf(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function aM(e){return e&&(e.borderColor||e.backgroundColor)}function cM(){return Nt.borderColor!=="rgba(0,0,0,0.1)"||Nt.backgroundColor!=="rgba(0,0,0,0.1)"}var lM={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:i},options:r}=e.config,{elements:s}=r,o=Lf(i)||aM(r)||s&&Lf(s)||cM();if(!n.forceOverride&&o)return;const a=oM(e);i.forEach(a)}};function uM(e,t,n,i,r){const s=r.samples||i;if(s>=n)return e.slice(t,t+n);const o=[],a=(n-2)/(s-2);let c=0;const l=t+n-1;let h=t,u,d,f,v,w;for(o[c++]=e[h],u=0;u<s-2;u++){let b=0,_=0,y;const g=Math.floor((u+1)*a)+1+t,p=Math.min(Math.floor((u+2)*a)+1,n)+t,m=p-g;for(y=g;y<p;y++)b+=e[y].x,_+=e[y].y;b/=m,_/=m;const x=Math.floor(u*a)+1+t,M=Math.min(Math.floor((u+1)*a)+1,n)+t,{x:k,y:S}=e[h];for(f=v=-1,y=x;y<M;y++)v=.5*Math.abs((k-b)*(e[y].y-S)-(k-e[y].x)*(_-S)),v>f&&(f=v,d=e[y],w=y);o[c++]=d,h=w}return o[c++]=e[l],o}function hM(e,t,n,i){let r=0,s=0,o,a,c,l,h,u,d,f,v,w;const b=[],_=t+n-1,y=e[t].x,p=e[_].x-y;for(o=t;o<t+n;++o){a=e[o],c=(a.x-y)/p*i,l=a.y;const m=c|0;if(m===h)l<v?(v=l,u=o):l>w&&(w=l,d=o),r=(s*r+a.x)/++s;else{const x=o-1;if(!vt(u)&&!vt(d)){const M=Math.min(u,d),k=Math.max(u,d);M!==f&&M!==x&&b.push({...e[M],x:r}),k!==f&&k!==x&&b.push({...e[k],x:r})}o>0&&x!==f&&b.push(e[x]),b.push(a),h=m,s=0,v=w=l,u=d=f=o}}return b}function dv(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Bf(e){e.data.datasets.forEach(t=>{dv(t)})}function dM(e,t){const n=t.length;let i=0,r;const{iScale:s}=e,{min:o,max:a,minDefined:c,maxDefined:l}=s.getUserBounds();return c&&(i=ae(Ln(t,s.axis,o).lo,0,n-1)),l?r=ae(Ln(t,s.axis,a).hi+1,i,n)-i:r=n-i,{start:i,count:r}}var fM={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){Bf(e);return}const i=e.width;e.data.datasets.forEach((r,s)=>{const{_data:o,indexAxis:a}=r,c=e.getDatasetMeta(s),l=o||r.data;if(gs([a,e.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const h=e.scales[c.xAxisID];if(h.type!=="linear"&&h.type!=="time"||e.options.parsing)return;let{start:u,count:d}=dM(c,l);const f=n.threshold||4*i;if(d<=f){dv(r);return}vt(o)&&(r._data=l,delete r.data,Object.defineProperty(r,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(w){this._data=w}}));let v;switch(n.algorithm){case"lttb":v=uM(l,u,d,i,n);break;case"min-max":v=hM(l,u,d,i);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}r._decimated=v})},destroy(e){Bf(e)}};function pM(e,t,n){const i=e.segments,r=e.points,s=t.points,o=[];for(const a of i){let{start:c,end:l}=a;l=Ja(c,l,r);const h=Ql(n,r[c],r[l],a.loop);if(!t.segments){o.push({source:a,target:h,start:r[c],end:r[l]});continue}const u=Um(t,h);for(const d of u){const f=Ql(n,s[d.start],s[d.end],d.loop),v=Vm(a,r,f);for(const w of v)o.push({source:w,target:d,start:{[n]:Nf(h,f,"start",Math.max)},end:{[n]:Nf(h,f,"end",Math.min)}})}}return o}function Ql(e,t,n,i){if(i)return;let r=t[e],s=n[e];return e==="angle"&&(r=be(r),s=be(s)),{property:e,start:r,end:s}}function gM(e,t){const{x:n=null,y:i=null}=e||{},r=t.points,s=[];return t.segments.forEach(({start:o,end:a})=>{a=Ja(o,a,r);const c=r[o],l=r[a];i!==null?(s.push({x:c.x,y:i}),s.push({x:l.x,y:i})):n!==null&&(s.push({x:n,y:c.y}),s.push({x:n,y:l.y}))}),s}function Ja(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function Nf(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function fv(e,t){let n=[],i=!1;return Bt(e)?(i=!0,n=e):n=gM(e,t),n.length?new Qa({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function zf(e){return e&&e.fill!==!1}function mM(e,t,n){let r=e[t].fill;const s=[t];let o;if(!n)return r;for(;r!==!1&&s.indexOf(r)===-1;){if(!qt(r))return r;if(o=e[r],!o)return!1;if(o.visible)return r;s.push(r),r=o.fill}return!1}function vM(e,t,n){const i=wM(e);if(yt(i))return isNaN(i.value)?!1:i;let r=parseFloat(i);return qt(r)&&Math.floor(r)===r?_M(i[0],t,r,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function _M(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function yM(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:yt(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function bM(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:yt(e)?i=e.value:i=t.getBaseValue(),i}function wM(e){const t=e.options,n=t.fill;let i=ft(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function xM(e){const{scale:t,index:n,line:i}=e,r=[],s=i.segments,o=i.points,a=kM(t,n);a.push(fv({x:null,y:t.bottom},i));for(let c=0;c<s.length;c++){const l=s[c];for(let h=l.start;h<=l.end;h++)SM(r,o[h],a)}return new Qa({points:r,options:{}})}function kM(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let r=0;r<i.length;r++){const s=i[r];if(s.index===t)break;s.hidden||n.unshift(s.dataset)}return n}function SM(e,t,n){const i=[];for(let r=0;r<n.length;r++){const s=n[r],{first:o,last:a,point:c}=CM(s,t,"x");if(!(!c||o&&a)){if(o)i.unshift(c);else if(e.push(c),!a)break}}e.push(...i)}function CM(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const r=i[n],s=e.segments,o=e.points;let a=!1,c=!1;for(let l=0;l<s.length;l++){const h=s[l],u=o[h.start][n],d=o[h.end][n];if(Rn(r,u,d)){a=r===u,c=r===d;break}}return{first:a,last:c,point:i}}class pv{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:r,y:s,radius:o}=this;return n=n||{start:0,end:Pt},t.arc(r,s,o,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:r}=this,s=t.angle;return{x:n+Math.cos(s)*r,y:i+Math.sin(s)*r,angle:s}}}function $M(e){const{chart:t,fill:n,line:i}=e;if(qt(n))return MM(t,n);if(n==="stack")return xM(e);if(n==="shape")return!0;const r=AM(e);return r instanceof pv?r:fv(r,i)}function MM(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function AM(e){return(e.scale||{}).getPointPositionForValue?TM(e):EM(e)}function EM(e){const{scale:t={},fill:n}=e,i=yM(n,t);if(qt(i)){const r=t.isHorizontal();return{x:r?i:null,y:r?null:i}}return null}function TM(e){const{scale:t,fill:n}=e,i=t.options,r=t.getLabels().length,s=i.reverse?t.max:t.min,o=bM(n,t,s),a=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,s);return new pv({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(o)})}for(let c=0;c<r;++c)a.push(t.getPointPositionForValue(c,o));return a}function el(e,t,n){const i=$M(t),{chart:r,index:s,line:o,scale:a,axis:c}=t,l=o.options,h=l.fill,u=l.backgroundColor,{above:d=u,below:f=u}=h||{},v=r.getDatasetMeta(s),w=Km(r,v);i&&o.points.length&&(Ka(e,n),DM(e,{line:o,target:i,above:d,below:f,area:n,scale:a,axis:c,clip:w}),Ya(e))}function DM(e,t){const{line:n,target:i,above:r,below:s,area:o,scale:a,clip:c}=t,l=n._loop?"angle":t.axis;e.save();let h=s;s!==r&&(l==="x"?(jf(e,i,o.top),nl(e,{line:n,target:i,color:r,scale:a,property:l,clip:c}),e.restore(),e.save(),jf(e,i,o.bottom)):l==="y"&&(Ff(e,i,o.left),nl(e,{line:n,target:i,color:s,scale:a,property:l,clip:c}),e.restore(),e.save(),Ff(e,i,o.right),h=r)),nl(e,{line:n,target:i,color:h,scale:a,property:l,clip:c}),e.restore()}function jf(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,h=r[c],u=r[Ja(c,l,r)];s?(e.moveTo(h.x,h.y),s=!1):(e.lineTo(h.x,n),e.lineTo(h.x,h.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function Ff(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,h=r[c],u=r[Ja(c,l,r)];s?(e.moveTo(h.x,h.y),s=!1):(e.lineTo(n,h.y),e.lineTo(h.x,h.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function nl(e,t){const{line:n,target:i,property:r,color:s,scale:o,clip:a}=t,c=pM(n,i,r);for(const{source:l,target:h,start:u,end:d}of c){const{style:{backgroundColor:f=s}={}}=l,v=i!==!0;e.save(),e.fillStyle=f,OM(e,o,a,v&&Ql(r,u,d)),e.beginPath();const w=!!n.pathSegment(e,l);let b;if(v){w?e.closePath():qf(e,i,d,r);const _=!!i.pathSegment(e,h,{move:w,reverse:!0});b=w&&_,b||qf(e,i,u,r)}e.closePath(),e.fill(b?"evenodd":"nonzero"),e.restore()}}function OM(e,t,n,i){const r=t.chart.chartArea,{property:s,start:o,end:a}=i||{};if(s==="x"||s==="y"){let c,l,h,u;s==="x"?(c=o,l=r.top,h=a,u=r.bottom):(c=r.left,l=o,h=r.right,u=a),e.beginPath(),n&&(c=Math.max(c,n.left),h=Math.min(h,n.right),l=Math.max(l,n.top),u=Math.min(u,n.bottom)),e.rect(c,l,h-c,u-l),e.clip()}}function qf(e,t,n,i){const r=t.interpolate(n,i);r&&e.lineTo(r.x,r.y)}var PM={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,r=[];let s,o,a,c;for(o=0;o<i;++o)s=e.getDatasetMeta(o),a=s.dataset,c=null,a&&a.options&&a instanceof Qa&&(c={visible:e.isDatasetVisible(o),index:o,fill:vM(a,o,i),chart:e,axis:s.controller.options.indexAxis,scale:s.vScale,line:a}),s.$filler=c,r.push(c);for(o=0;o<i;++o)c=r[o],!(!c||c.fill===!1)&&(c.fill=mM(r,o,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",r=e.getSortedVisibleDatasetMetas(),s=e.chartArea;for(let o=r.length-1;o>=0;--o){const a=r[o].$filler;a&&(a.line.updateControlPoints(s,a.axis),i&&a.fill&&el(e.ctx,a,s))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let r=i.length-1;r>=0;--r){const s=i[r].$filler;zf(s)&&el(e.ctx,s,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!zf(i)||n.drawTime!=="beforeDatasetDraw"||el(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Wf=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},IM=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class Hf extends Gn{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=Dt(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,r)=>t.sort(i,r,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,r=ie(i.font),s=r.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=Wf(i,s);let l,h;n.font=r.string,this.isHorizontal()?(l=this.maxWidth,h=this._fitRows(o,s,a,c)+10):(h=this.maxHeight,l=this._fitCols(o,r,a,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,r){const{ctx:s,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],h=r+a;let u=t;s.textAlign="left",s.textBaseline="middle";let d=-1,f=-h;return this.legendItems.forEach((v,w)=>{const b=i+n/2+s.measureText(v.text).width;(w===0||l[l.length-1]+b+2*a>o)&&(u+=h,l[l.length-(w>0?0:1)]=0,f+=h,d++),c[w]={left:0,top:f,row:d,width:b,height:r},l[l.length-1]+=b+a}),u}_fitCols(t,n,i,r){const{ctx:s,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],h=o-t;let u=a,d=0,f=0,v=0,w=0;return this.legendItems.forEach((b,_)=>{const{itemWidth:y,itemHeight:g}=RM(i,n,s,b,r);_>0&&f+g+2*a>h&&(u+=d+a,l.push({width:d,height:f}),v+=d+a,w++,d=f=0),c[_]={left:v,top:f,col:w,width:y,height:g},d=Math.max(d,y),f+=g+a}),u+=d,l.push({width:d,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:r},rtl:s}}=this,o=Pr(s,this.left,this.width);if(this.isHorizontal()){let a=0,c=_e(i,this.left+r,this.right-this.lineWidths[a]);for(const l of n)a!==l.row&&(a=l.row,c=_e(i,this.left+r,this.right-this.lineWidths[a])),l.top+=this.top+t+r,l.left=o.leftForLtr(o.x(c),l.width),c+=l.width+r}else{let a=0,c=_e(i,this.top+t+r,this.bottom-this.columnSizes[a].height);for(const l of n)l.col!==a&&(a=l.col,c=_e(i,this.top+t+r,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+r,l.left=o.leftForLtr(o.x(l.left),l.width),c+=l.height+r}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Ka(t,this),this._draw(),Ya(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:r}=this,{align:s,labels:o}=t,a=Nt.color,c=Pr(t.rtl,this.left,this.width),l=ie(o.font),{padding:h}=o,u=l.size,d=u/2;let f;this.drawTitle(),r.textAlign=c.textAlign("left"),r.textBaseline="middle",r.lineWidth=.5,r.font=l.string;const{boxWidth:v,boxHeight:w,itemHeight:b}=Wf(o,u),_=function(x,M,k){if(isNaN(v)||v<=0||isNaN(w)||w<0)return;r.save();const S=ft(k.lineWidth,1);if(r.fillStyle=ft(k.fillStyle,a),r.lineCap=ft(k.lineCap,"butt"),r.lineDashOffset=ft(k.lineDashOffset,0),r.lineJoin=ft(k.lineJoin,"miter"),r.lineWidth=S,r.strokeStyle=ft(k.strokeStyle,a),r.setLineDash(ft(k.lineDash,[])),o.usePointStyle){const E={radius:w*Math.SQRT2/2,pointStyle:k.pointStyle,rotation:k.rotation,borderWidth:S},P=c.xPlus(x,v/2),B=M+d;Im(r,E,P,B,o.pointStyleWidth&&v)}else{const E=M+Math.max((u-w)/2,0),P=c.leftForLtr(x,v),B=Ki(k.borderRadius);r.beginPath(),Object.values(B).some(j=>j!==0)?qs(r,{x:P,y:E,w:v,h:w,radius:B}):r.rect(P,E,v,w),r.fill(),S!==0&&r.stroke()}r.restore()},y=function(x,M,k){ir(r,k.text,x,M+b/2,l,{strikethrough:k.hidden,textAlign:c.textAlign(k.textAlign)})},g=this.isHorizontal(),p=this._computeTitleHeight();g?f={x:_e(s,this.left+h,this.right-i[0]),y:this.top+h+p,line:0}:f={x:this.left+h,y:_e(s,this.top+p+h,this.bottom-n[0].height),line:0},qm(this.ctx,t.textDirection);const m=b+h;this.legendItems.forEach((x,M)=>{r.strokeStyle=x.fontColor,r.fillStyle=x.fontColor;const k=r.measureText(x.text).width,S=c.textAlign(x.textAlign||(x.textAlign=o.textAlign)),E=v+d+k;let P=f.x,B=f.y;c.setWidth(this.width),g?M>0&&P+E+h>this.right&&(B=f.y+=m,f.line++,P=f.x=_e(s,this.left+h,this.right-i[f.line])):M>0&&B+m>this.bottom&&(P=f.x=P+n[f.line].width+h,f.line++,B=f.y=_e(s,this.top+p+h,this.bottom-n[f.line].height));const j=c.x(P);if(_(j,B,x),P=VS(S,P+v+d,g?P+E:this.right,t.rtl),y(c.x(P),B,x),g)f.x+=E+h;else if(typeof x.text!="string"){const H=l.lineHeight;f.y+=gv(x,H)+h}else f.y+=m}),Wm(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=ie(n.font),r=ke(n.padding);if(!n.display)return;const s=Pr(t.rtl,this.left,this.width),o=this.ctx,a=n.position,c=i.size/2,l=r.top+c;let h,u=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),h=this.top+l,u=_e(t.align,u,this.right-d);else{const v=this.columnSizes.reduce((w,b)=>Math.max(w,b.height),0);h=l+_e(t.align,this.top,this.bottom-v-t.labels.padding-this._computeTitleHeight())}const f=_e(a,u,u+d);o.textAlign=s.textAlign(Ju(a)),o.textBaseline="middle",o.strokeStyle=n.color,o.fillStyle=n.color,o.font=i.string,ir(o,n.text,f,h,i)}_computeTitleHeight(){const t=this.options.title,n=ie(t.font),i=ke(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,r,s;if(Rn(t,this.left,this.right)&&Rn(n,this.top,this.bottom)){for(s=this.legendHitBoxes,i=0;i<s.length;++i)if(r=s[i],Rn(t,r.left,r.left+r.width)&&Rn(n,r.top,r.top+r.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!NM(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const r=this._hoveredItem,s=IM(r,i);r&&!s&&Dt(n.onLeave,[t,r,this],this),this._hoveredItem=i,i&&!s&&Dt(n.onHover,[t,i,this],this)}else i&&Dt(n.onClick,[t,i,this],this)}}function RM(e,t,n,i,r){const s=LM(i,e,t,n),o=BM(r,i,t.lineHeight);return{itemWidth:s,itemHeight:o}}function LM(e,t,n,i){let r=e.text;return r&&typeof r!="string"&&(r=r.reduce((s,o)=>s.length>o.length?s:o)),t+n.size/2+i.measureText(r).width}function BM(e,t,n){let i=e;return typeof t.text!="string"&&(i=gv(t,n)),i}function gv(e,t){const n=e.text?e.text.length:0;return t*n}function NM(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var zM={id:"legend",_element:Hf,start(e,t,n){const i=e.legend=new Hf({ctx:e.ctx,options:n,chart:e});xe.configure(e,i,n),xe.addBox(e,i)},stop(e){xe.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;xe.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,r=n.chart;r.isDatasetVisible(i)?(r.hide(i),t.hidden=!0):(r.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(n?0:void 0),h=ke(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:s,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:r||l.textAlign,borderRadius:o&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class lh extends Gn{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const r=Bt(i.text)?i.text.length:1;this._padding=ke(i.padding);const s=r*ie(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=s:this.width=s}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:i,bottom:r,right:s,options:o}=this,a=o.align;let c=0,l,h,u;return this.isHorizontal()?(h=_e(a,i,s),u=n+t,l=s-i):(o.position==="left"?(h=i+t,u=_e(a,r,n),c=kt*-.5):(h=s-t,u=_e(a,n,r),c=kt*.5),l=r-n),{titleX:h,titleY:u,maxWidth:l,rotation:c}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const i=ie(n.font),s=i.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:c,rotation:l}=this._drawArgs(s);ir(t,n.text,0,0,i,{color:n.color,maxWidth:c,rotation:l,textAlign:Ju(n.align),textBaseline:"middle",translation:[o,a]})}}function jM(e,t){const n=new lh({ctx:e.ctx,options:t,chart:e});xe.configure(e,n,t),xe.addBox(e,n),e.titleBlock=n}var FM={id:"title",_element:lh,start(e,t,n){jM(e,n)},stop(e){const t=e.titleBlock;xe.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const i=e.titleBlock;xe.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Po=new WeakMap;var qM={id:"subtitle",start(e,t,n){const i=new lh({ctx:e.ctx,options:n,chart:e});xe.configure(e,i,n),xe.addBox(e,i),Po.set(e,i)},stop(e){xe.removeBox(e,Po.get(e)),Po.delete(e)},beforeUpdate(e,t,n){const i=Po.get(e);xe.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const vs={average(e){if(!e.length)return!1;let t,n,i=new Set,r=0,s=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const c=a.tooltipPosition();i.add(c.x),r+=c.y,++s}}return s===0||i.size===0?!1:{x:[...i].reduce((a,c)=>a+c)/i.size,y:r/s}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,r=Number.POSITIVE_INFINITY,s,o,a;for(s=0,o=e.length;s<o;++s){const c=e[s].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),h=Hl(t,l);h<r&&(r=h,a=c)}}if(a){const c=a.tooltipPosition();n=c.x,i=c.y}return{x:n,y:i}}};function fn(e,t){return t&&(Bt(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Dn(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function WM(e,t){const{element:n,datasetIndex:i,index:r}=t,s=e.getDatasetMeta(i).controller,{label:o,value:a}=s.getLabelAndValue(r);return{chart:e,label:o,parsed:s.getParsed(r),raw:e.data.datasets[i].data[r],formattedValue:a,dataset:s.getDataset(),dataIndex:r,datasetIndex:i,element:n}}function Vf(e,t){const n=e.chart.ctx,{body:i,footer:r,title:s}=e,{boxWidth:o,boxHeight:a}=t,c=ie(t.bodyFont),l=ie(t.titleFont),h=ie(t.footerFont),u=s.length,d=r.length,f=i.length,v=ke(t.padding);let w=v.height,b=0,_=i.reduce((p,m)=>p+m.before.length+m.lines.length+m.after.length,0);if(_+=e.beforeBody.length+e.afterBody.length,u&&(w+=u*l.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),_){const p=t.displayColors?Math.max(a,c.lineHeight):c.lineHeight;w+=f*p+(_-f)*c.lineHeight+(_-1)*t.bodySpacing}d&&(w+=t.footerMarginTop+d*h.lineHeight+(d-1)*t.footerSpacing);let y=0;const g=function(p){b=Math.max(b,n.measureText(p).width+y)};return n.save(),n.font=l.string,Mt(e.title,g),n.font=c.string,Mt(e.beforeBody.concat(e.afterBody),g),y=t.displayColors?o+2+t.boxPadding:0,Mt(i,p=>{Mt(p.before,g),Mt(p.lines,g),Mt(p.after,g)}),y=0,n.font=h.string,Mt(e.footer,g),n.restore(),b+=v.width,{width:b,height:w}}function HM(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function VM(e,t,n,i){const{x:r,width:s}=i,o=n.caretSize+n.caretPadding;if(e==="left"&&r+s+o>t.width||e==="right"&&r-s-o<0)return!0}function UM(e,t,n,i){const{x:r,width:s}=n,{width:o,chartArea:{left:a,right:c}}=e;let l="center";return i==="center"?l=r<=(a+c)/2?"left":"right":r<=s/2?l="left":r>=o-s/2&&(l="right"),VM(l,e,t,n)&&(l="center"),l}function Uf(e,t,n){const i=n.yAlign||t.yAlign||HM(e,n);return{xAlign:n.xAlign||t.xAlign||UM(e,t,n,i),yAlign:i}}function KM(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function YM(e,t,n){let{y:i,height:r}=e;return t==="top"?i+=n:t==="bottom"?i-=r+n:i-=r/2,i}function Kf(e,t,n,i){const{caretSize:r,caretPadding:s,cornerRadius:o}=e,{xAlign:a,yAlign:c}=n,l=r+s,{topLeft:h,topRight:u,bottomLeft:d,bottomRight:f}=Ki(o);let v=KM(t,a);const w=YM(t,c,l);return c==="center"?a==="left"?v+=l:a==="right"&&(v-=l):a==="left"?v-=Math.max(h,d)+r:a==="right"&&(v+=Math.max(u,f)+r),{x:ae(v,0,i.width-t.width),y:ae(w,0,i.height-t.height)}}function Io(e,t,n){const i=ke(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function Yf(e){return fn([],Dn(e))}function XM(e,t,n){return mi(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function Xf(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const mv={beforeTitle:En,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:En,beforeBody:En,beforeLabel:En,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return vt(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:En,afterBody:En,beforeFooter:En,footer:En,afterFooter:En};function Oe(e,t,n,i){const r=e[t].call(n,i);return typeof r>"u"?mv[t].call(n,i):r}class Gf extends Gn{static positioners=vs;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),r=i.enabled&&n.options.animation&&i.animations,s=new Ym(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(s)),s}getContext(){return this.$context||(this.$context=XM(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,r=Oe(i,"beforeTitle",this,t),s=Oe(i,"title",this,t),o=Oe(i,"afterTitle",this,t);let a=[];return a=fn(a,Dn(r)),a=fn(a,Dn(s)),a=fn(a,Dn(o)),a}getBeforeBody(t,n){return Yf(Oe(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,r=[];return Mt(t,s=>{const o={before:[],lines:[],after:[]},a=Xf(i,s);fn(o.before,Dn(Oe(a,"beforeLabel",this,s))),fn(o.lines,Oe(a,"label",this,s)),fn(o.after,Dn(Oe(a,"afterLabel",this,s))),r.push(o)}),r}getAfterBody(t,n){return Yf(Oe(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,r=Oe(i,"beforeFooter",this,t),s=Oe(i,"footer",this,t),o=Oe(i,"afterFooter",this,t);let a=[];return a=fn(a,Dn(r)),a=fn(a,Dn(s)),a=fn(a,Dn(o)),a}_createItems(t){const n=this._active,i=this.chart.data,r=[],s=[],o=[];let a=[],c,l;for(c=0,l=n.length;c<l;++c)a.push(WM(this.chart,n[c]));return t.filter&&(a=a.filter((h,u,d)=>t.filter(h,u,d,i))),t.itemSort&&(a=a.sort((h,u)=>t.itemSort(h,u,i))),Mt(a,h=>{const u=Xf(t.callbacks,h);r.push(Oe(u,"labelColor",this,h)),s.push(Oe(u,"labelPointStyle",this,h)),o.push(Oe(u,"labelTextColor",this,h))}),this.labelColors=r,this.labelPointStyles=s,this.labelTextColors=o,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),r=this._active;let s,o=[];if(!r.length)this.opacity!==0&&(s={opacity:0});else{const a=vs[i.position].call(this,r,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const c=this._size=Vf(this,i),l=Object.assign({},a,c),h=Uf(this.chart,i,l),u=Kf(i,l,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,s={opacity:1,x:u.x,y:u.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,s&&this._resolveAnimations().update(this,s),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,r){const s=this.getCaretPosition(t,i,r);n.lineTo(s.x1,s.y1),n.lineTo(s.x2,s.y2),n.lineTo(s.x3,s.y3)}getCaretPosition(t,n,i){const{xAlign:r,yAlign:s}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:c,topRight:l,bottomLeft:h,bottomRight:u}=Ki(a),{x:d,y:f}=t,{width:v,height:w}=n;let b,_,y,g,p,m;return s==="center"?(p=f+w/2,r==="left"?(b=d,_=b-o,g=p+o,m=p-o):(b=d+v,_=b+o,g=p-o,m=p+o),y=b):(r==="left"?_=d+Math.max(c,h)+o:r==="right"?_=d+v-Math.max(l,u)-o:_=this.caretX,s==="top"?(g=f,p=g-o,b=_-o,y=_+o):(g=f+w,p=g+o,b=_+o,y=_-o),m=g),{x1:b,x2:_,x3:y,y1:g,y2:p,y3:m}}drawTitle(t,n,i){const r=this.title,s=r.length;let o,a,c;if(s){const l=Pr(i.rtl,this.x,this.width);for(t.x=Io(this,i.titleAlign,i),n.textAlign=l.textAlign(i.titleAlign),n.textBaseline="middle",o=ie(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=o.string,c=0;c<s;++c)n.fillText(r[c],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,c+1===s&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,r,s){const o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=s,h=ie(s.bodyFont),u=Io(this,"left",s),d=r.x(u),f=c<h.lineHeight?(h.lineHeight-c)/2:0,v=n.y+f;if(s.usePointStyle){const w={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},b=r.leftForLtr(d,l)+l/2,_=v+c/2;t.strokeStyle=s.multiKeyBackground,t.fillStyle=s.multiKeyBackground,Ul(t,w,b,_),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,Ul(t,w,b,_)}else{t.lineWidth=yt(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const w=r.leftForLtr(d,l),b=r.leftForLtr(r.xPlus(d,1),l-2),_=Ki(o.borderRadius);Object.values(_).some(y=>y!==0)?(t.beginPath(),t.fillStyle=s.multiKeyBackground,qs(t,{x:w,y:v,w:l,h:c,radius:_}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),qs(t,{x:b,y:v+1,w:l-2,h:c-2,radius:_}),t.fill()):(t.fillStyle=s.multiKeyBackground,t.fillRect(w,v,l,c),t.strokeRect(w,v,l,c),t.fillStyle=o.backgroundColor,t.fillRect(b,v+1,l-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:r}=this,{bodySpacing:s,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:h}=i,u=ie(i.bodyFont);let d=u.lineHeight,f=0;const v=Pr(i.rtl,this.x,this.width),w=function(k){n.fillText(k,v.x(t.x+f),t.y+d/2),t.y+=d+s},b=v.textAlign(o);let _,y,g,p,m,x,M;for(n.textAlign=o,n.textBaseline="middle",n.font=u.string,t.x=Io(this,b,i),n.fillStyle=i.bodyColor,Mt(this.beforeBody,w),f=a&&b!=="right"?o==="center"?l/2+h:l+2+h:0,p=0,x=r.length;p<x;++p){for(_=r[p],y=this.labelTextColors[p],n.fillStyle=y,Mt(_.before,w),g=_.lines,a&&g.length&&(this._drawColorBox(n,t,p,v,i),d=Math.max(u.lineHeight,c)),m=0,M=g.length;m<M;++m)w(g[m]),d=u.lineHeight;Mt(_.after,w)}f=0,d=u.lineHeight,Mt(this.afterBody,w),t.y-=s}drawFooter(t,n,i){const r=this.footer,s=r.length;let o,a;if(s){const c=Pr(i.rtl,this.x,this.width);for(t.x=Io(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=c.textAlign(i.footerAlign),n.textBaseline="middle",o=ie(i.footerFont),n.fillStyle=i.footerColor,n.font=o.string,a=0;a<s;++a)n.fillText(r[a],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,n,i,r){const{xAlign:s,yAlign:o}=this,{x:a,y:c}=t,{width:l,height:h}=i,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:v}=Ki(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(a+u,c),o==="top"&&this.drawCaret(t,n,i,r),n.lineTo(a+l-d,c),n.quadraticCurveTo(a+l,c,a+l,c+d),o==="center"&&s==="right"&&this.drawCaret(t,n,i,r),n.lineTo(a+l,c+h-v),n.quadraticCurveTo(a+l,c+h,a+l-v,c+h),o==="bottom"&&this.drawCaret(t,n,i,r),n.lineTo(a+f,c+h),n.quadraticCurveTo(a,c+h,a,c+h-f),o==="center"&&s==="left"&&this.drawCaret(t,n,i,r),n.lineTo(a,c+u),n.quadraticCurveTo(a,c,a+u,c),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,r=i&&i.x,s=i&&i.y;if(r||s){const o=vs[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=Vf(this,t),c=Object.assign({},o,this._size),l=Uf(n,t,c),h=Kf(t,c,l,n);(r._to!==h.x||s._to!==h.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},s={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=ke(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(s,t,r,n),qm(t,n.textDirection),s.y+=o.top,this.drawTitle(s,t,n),this.drawBody(s,t,n),this.drawFooter(s,t,n),Wm(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,r=t.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),s=!Sa(i,r),o=this._positionChanged(r,n);(s||o)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,s=this._active||[],o=this._getActiveElements(t,s,n,i),a=this._positionChanged(o,t),c=n||!Sa(o,s)||a;return c&&(this._active=o,(r.enabled||r.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),c}_getActiveElements(t,n,i,r){const s=this.options;if(t.type==="mouseout")return[];if(!r)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,s.mode,s,i);return s.reverse&&o.reverse(),o}_positionChanged(t,n){const{caretX:i,caretY:r,options:s}=this,o=vs[s.position].call(this,t,n);return o!==!1&&(i!==o.x||r!==o.y)}}var GM={id:"tooltip",_element:Gf,positioners:vs,afterInit(e,t,n){n&&(e.tooltip=new Gf({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:mv},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},QM=Object.freeze({__proto__:null,Colors:lM,Decimation:fM,Filler:PM,Legend:zM,SubTitle:qM,Title:FM,Tooltip:GM});const JM=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function ZM(e,t,n,i){const r=e.indexOf(t);if(r===-1)return JM(e,t,n,i);const s=e.lastIndexOf(t);return r!==s?n:r}const tA=(e,t)=>e===null?null:ae(Math.round(e),0,t);function Qf(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class eA extends hr{static id="category";static defaults={ticks:{callback:Qf}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:r,label:s}of n)i[r]===s&&i.splice(r,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(vt(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:ZM(i,t,ft(n,t),this._addedLabels),tA(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:r}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(r=this.getLabels().length-1)),this.min=i,this.max=r}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,r=[];let s=this.getLabels();s=t===0&&n===s.length-1?s:s.slice(t,n+1),this._valueRange=Math.max(s.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let o=t;o<=n;o++)r.push({value:o});return r}getLabelForValue(t){return Qf.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function nA(e,t){const n=[],{bounds:r,step:s,min:o,max:a,precision:c,count:l,maxTicks:h,maxDigits:u,includeBounds:d}=e,f=s||1,v=h-1,{min:w,max:b}=t,_=!vt(o),y=!vt(a),g=!vt(l),p=(b-w)/(u+1);let m=Hd((b-w)/v/f)*f,x,M,k,S;if(m<1e-14&&!_&&!y)return[{value:w},{value:b}];S=Math.ceil(b/m)-Math.floor(w/m),S>v&&(m=Hd(S*m/v/f)*f),vt(c)||(x=Math.pow(10,c),m=Math.ceil(m*x)/x),r==="ticks"?(M=Math.floor(w/m)*m,k=Math.ceil(b/m)*m):(M=w,k=b),_&&y&&s&&NS((a-o)/s,m/1e3)?(S=Math.round(Math.min((a-o)/m,h)),m=(a-o)/S,M=o,k=a):g?(M=_?o:M,k=y?a:k,S=l-1,m=(k-M)/S):(S=(k-M)/m,Ts(S,Math.round(S),m/1e3)?S=Math.round(S):S=Math.ceil(S));const E=Math.max(Vd(m),Vd(M));x=Math.pow(10,vt(c)?E:c),M=Math.round(M*x)/x,k=Math.round(k*x)/x;let P=0;for(_&&(d&&M!==o?(n.push({value:o}),M<o&&P++,Ts(Math.round((M+P*m)*x)/x,o,Jf(o,p,e))&&P++):M<o&&P++);P<S;++P){const B=Math.round((M+P*m)*x)/x;if(y&&B>a)break;n.push({value:B})}return y&&d&&k!==a?n.length&&Ts(n[n.length-1].value,a,Jf(a,p,e))?n[n.length-1].value=a:n.push({value:a}):(!y||k===a)&&n.push({value:k}),n}function Jf(e,t,{horizontal:n,minRotation:i}){const r=cn(i),s=(n?Math.sin(r):Math.cos(r))||.001,o=.75*t*(""+e).length;return Math.min(t/s,o)}class Da extends hr{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return vt(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:r,max:s}=this;const o=c=>r=n?r:c,a=c=>s=i?s:c;if(t){const c=bn(r),l=bn(s);c<0&&l<0?a(0):c>0&&l>0&&o(0)}if(r===s){let c=s===0?1:Math.abs(s*.05);a(s+c),t||o(r-c)}this.min=r,this.max=s}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,r;return i?(r=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const r={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},s=this._range||this,o=nA(r,s);return t.bounds==="ticks"&&Cm(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const r=(i-n)/Math.max(t.length-1,1)/2;n-=r,i+=r}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return ro(t,this.chart.options.locale,this.options.ticks.format)}}class iA extends Da{static id="linear";static defaults={ticks:{callback:Ua.formatters.numeric}};determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=qt(t)?t:0,this.max=qt(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=cn(this.options.ticks.minRotation),r=(t?Math.sin(i):Math.cos(i))||.001,s=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,s.lineHeight/r))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const Hs=e=>Math.floor(ai(e)),Oi=(e,t)=>Math.pow(10,Hs(e)+t);function Zf(e){return e/Math.pow(10,Hs(e))===1}function tp(e,t,n){const i=Math.pow(10,n),r=Math.floor(e/i);return Math.ceil(t/i)-r}function rA(e,t){const n=t-e;let i=Hs(n);for(;tp(e,t,i)>10;)i++;for(;tp(e,t,i)<10;)i--;return Math.min(i,Hs(e))}function sA(e,{min:t,max:n}){t=Fe(e.min,t);const i=[],r=Hs(t);let s=rA(t,n),o=s<0?Math.pow(10,Math.abs(s)):1;const a=Math.pow(10,s),c=r>s?Math.pow(10,r):0,l=Math.round((t-c)*o)/o,h=Math.floor((t-c)/a/10)*a*10;let u=Math.floor((l-h)/Math.pow(10,s)),d=Fe(e.min,Math.round((c+h+u*Math.pow(10,s))*o)/o);for(;d<n;)i.push({value:d,major:Zf(d),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(s++,u=2,o=s>=0?1:o),d=Math.round((c+h+u*Math.pow(10,s))*o)/o;const f=Fe(e.max,d);return i.push({value:f,major:Zf(f),significand:u}),i}class oA extends hr{static id="logarithmic";static defaults={ticks:{callback:Ua.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const i=Da.prototype.parse.apply(this,[t,n]);if(i===0){this._zero=!0;return}return qt(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=qt(t)?Math.max(0,t):null,this.max=qt(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!qt(this._userMin)&&(this.min=t===Oi(this.min,0)?Oi(this.min,-1):Oi(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let i=this.min,r=this.max;const s=a=>i=t?i:a,o=a=>r=n?r:a;i===r&&(i<=0?(s(1),o(10)):(s(Oi(i,-1)),o(Oi(r,1)))),i<=0&&s(Oi(r,-1)),r<=0&&o(Oi(i,1)),this.min=i,this.max=r}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},i=sA(n,this);return t.bounds==="ticks"&&Cm(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":ro(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=ai(t),this._valueRange=ai(this.max)-ai(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(ai(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}function Jl(e){const t=e.ticks;if(t.display&&e.display){const n=ke(t.backdropPadding);return ft(t.font&&t.font.size,Nt.font.size)+n.height}return 0}function aA(e,t,n){return n=Bt(n)?n:[n],{w:eC(e,t.string,n),h:n.length*t.lineHeight}}function ep(e,t,n,i,r){return e===i||e===r?{start:t-n/2,end:t+n/2}:e<i||e>r?{start:t-n,end:t}:{start:t,end:t+n}}function cA(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),i=[],r=[],s=e._pointLabels.length,o=e.options.pointLabels,a=o.centerPointLabels?kt/s:0;for(let c=0;c<s;c++){const l=o.setContext(e.getPointLabelContext(c));r[c]=l.padding;const h=e.getPointPosition(c,e.drawingArea+r[c],a),u=ie(l.font),d=aA(e.ctx,u,e._pointLabels[c]);i[c]=d;const f=be(e.getIndexAngle(c)+a),v=Math.round(Gu(f)),w=ep(v,h.x,d.w,0,180),b=ep(v,h.y,d.h,90,270);lA(n,t,f,w,b)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=dA(e,i,r)}function lA(e,t,n,i,r){const s=Math.abs(Math.sin(n)),o=Math.abs(Math.cos(n));let a=0,c=0;i.start<t.l?(a=(t.l-i.start)/s,e.l=Math.min(e.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/s,e.r=Math.max(e.r,t.r+a)),r.start<t.t?(c=(t.t-r.start)/o,e.t=Math.min(e.t,t.t-c)):r.end>t.b&&(c=(r.end-t.b)/o,e.b=Math.max(e.b,t.b+c))}function uA(e,t,n){const i=e.drawingArea,{extra:r,additionalAngle:s,padding:o,size:a}=n,c=e.getPointPosition(t,i+r+o,s),l=Math.round(Gu(be(c.angle+Ut))),h=gA(c.y,a.h,l),u=fA(l),d=pA(c.x,a.w,u);return{visible:!0,x:c.x,y:h,textAlign:u,left:d,top:h,right:d+a.w,bottom:h+a.h}}function hA(e,t){if(!t)return!0;const{left:n,top:i,right:r,bottom:s}=e;return!(Bn({x:n,y:i},t)||Bn({x:n,y:s},t)||Bn({x:r,y:i},t)||Bn({x:r,y:s},t))}function dA(e,t,n){const i=[],r=e._pointLabels.length,s=e.options,{centerPointLabels:o,display:a}=s.pointLabels,c={extra:Jl(s)/2,additionalAngle:o?kt/r:0};let l;for(let h=0;h<r;h++){c.padding=n[h],c.size=t[h];const u=uA(e,h,c);i.push(u),a==="auto"&&(u.visible=hA(u,l),u.visible&&(l=u))}return i}function fA(e){return e===0||e===180?"center":e<180?"left":"right"}function pA(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function gA(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function mA(e,t,n){const{left:i,top:r,right:s,bottom:o}=n,{backdropColor:a}=t;if(!vt(a)){const c=Ki(t.borderRadius),l=ke(t.backdropPadding);e.fillStyle=a;const h=i-l.left,u=r-l.top,d=s-i+l.width,f=o-r+l.height;Object.values(c).some(v=>v!==0)?(e.beginPath(),qs(e,{x:h,y:u,w:d,h:f,radius:c}),e.fill()):e.fillRect(h,u,d,f)}}function vA(e,t){const{ctx:n,options:{pointLabels:i}}=e;for(let r=t-1;r>=0;r--){const s=e._pointLabelItems[r];if(!s.visible)continue;const o=i.setContext(e.getPointLabelContext(r));mA(n,o,s);const a=ie(o.font),{x:c,y:l,textAlign:h}=s;ir(n,e._pointLabels[r],c,l+a.lineHeight/2,a,{color:o.color,textAlign:h,textBaseline:"middle"})}}function vv(e,t,n,i){const{ctx:r}=e;if(n)r.arc(e.xCenter,e.yCenter,t,0,Pt);else{let s=e.getPointPosition(0,t);r.moveTo(s.x,s.y);for(let o=1;o<i;o++)s=e.getPointPosition(o,t),r.lineTo(s.x,s.y)}}function _A(e,t,n,i,r){const s=e.ctx,o=t.circular,{color:a,lineWidth:c}=t;!o&&!i||!a||!c||n<0||(s.save(),s.strokeStyle=a,s.lineWidth=c,s.setLineDash(r.dash||[]),s.lineDashOffset=r.dashOffset,s.beginPath(),vv(e,n,o,i),s.closePath(),s.stroke(),s.restore())}function yA(e,t,n){return mi(e,{label:n,index:t,type:"pointLabel"})}class bA extends Da{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Ua.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=ke(Jl(this.options)/2),n=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=qt(t)&&!isNaN(t)?t:0,this.max=qt(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Jl(this.options))}generateTickLabels(t){Da.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,i)=>{const r=Dt(this.options.pointLabels.callback,[n,i],this);return r||r===0?r:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?cA(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,i,r){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((i-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,i,r))}getIndexAngle(t){const n=Pt/(this._pointLabels.length||1),i=this.options.startAngle||0;return be(t*n+cn(i))}getDistanceFromCenterForValue(t){if(vt(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(vt(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const i=n[t];return yA(this.getContext(),t,i)}}getPointPosition(t,n,i=0){const r=this.getIndexAngle(t)-Ut+i;return{x:Math.cos(r)*n+this.xCenter,y:Math.sin(r)*n+this.yCenter,angle:r}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:i,right:r,bottom:s}=this._pointLabelItems[t];return{left:n,top:i,right:r,bottom:s}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),vv(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:i,grid:r,border:s}=n,o=this._pointLabels.length;let a,c,l;if(n.pointLabels.display&&vA(this,o),r.display&&this.ticks.forEach((h,u)=>{if(u!==0||u===0&&this.min<0){c=this.getDistanceFromCenterForValue(h.value);const d=this.getContext(u),f=r.setContext(d),v=s.setContext(d);_A(this,f,c,o,v)}}),i.display){for(t.save(),a=o-1;a>=0;a--){const h=i.setContext(this.getPointLabelContext(a)),{color:u,lineWidth:d}=h;!d||!u||(t.lineWidth=d,t.strokeStyle=u,t.setLineDash(h.borderDash),t.lineDashOffset=h.borderDashOffset,c=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),l=this.getPointPosition(a,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;const r=this.getIndexAngle(0);let s,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(r),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,c)=>{if(c===0&&this.min>=0&&!n.reverse)return;const l=i.setContext(this.getContext(c)),h=ie(l.font);if(s=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){t.font=h.string,o=t.measureText(a.label).width,t.fillStyle=l.backdropColor;const u=ke(l.backdropPadding);t.fillRect(-o/2-u.left,-s-h.size/2-u.top,o+u.width,h.size+u.height)}ir(t,a.label,0,-s,h,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),t.restore()}drawTitle(){}}const Za={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Le=Object.keys(Za);function np(e,t){return e-t}function ip(e,t){if(vt(t))return null;const n=e._adapter,{parser:i,round:r,isoWeekday:s}=e._parseOpts;let o=t;return typeof i=="function"&&(o=i(o)),qt(o)||(o=typeof i=="string"?n.parse(o,i):n.parse(o)),o===null?null:(r&&(o=r==="week"&&(Fr(s)||s===!0)?n.startOf(o,"isoWeek",s):n.startOf(o,r)),+o)}function rp(e,t,n,i){const r=Le.length;for(let s=Le.indexOf(e);s<r-1;++s){const o=Za[Le[s]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((n-t)/(a*o.size))<=i)return Le[s]}return Le[r-1]}function wA(e,t,n,i,r){for(let s=Le.length-1;s>=Le.indexOf(n);s--){const o=Le[s];if(Za[o].common&&e._adapter.diff(r,i,o)>=t-1)return o}return Le[n?Le.indexOf(n):0]}function xA(e){for(let t=Le.indexOf(e)+1,n=Le.length;t<n;++t)if(Za[Le[t]].common)return Le[t]}function sp(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:r}=Qu(n,t),s=n[i]>=t?n[i]:n[r];e[s]=!0}}function kA(e,t,n,i){const r=e._adapter,s=+r.startOf(t[0].value,i),o=t[t.length-1].value;let a,c;for(a=s;a<=o;a=+r.add(a,1,i))c=n[a],c>=0&&(t[c].major=!0);return t}function op(e,t,n){const i=[],r={},s=t.length;let o,a;for(o=0;o<s;++o)a=t[o],r[a]=o,i.push({value:a,major:!1});return s===0||!n?i:kA(e,i,r,n)}class Zl extends hr{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),r=this._adapter=new S$._date(t.adapters.date);r.init(n),Es(i.displayFormats,r.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:ip(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:r,max:s,minDefined:o,maxDefined:a}=this.getUserBounds();function c(l){!o&&!isNaN(l.min)&&(r=Math.min(r,l.min)),!a&&!isNaN(l.max)&&(s=Math.max(s,l.max))}(!o||!a)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),r=qt(r)&&!isNaN(r)?r:+n.startOf(Date.now(),i),s=qt(s)&&!isNaN(s)?s:+n.endOf(Date.now(),i)+1,this.min=Math.min(r,s-1),this.max=Math.max(r+1,s)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,r=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const s=this.min,o=this.max,a=qS(r,s,o);return this._unit=n.unit||(i.autoSkip?rp(n.minUnit,this.min,this.max,this._getLabelCapacity(s)):wA(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:xA(this._unit),this.initOffsets(r),t.reverse&&a.reverse(),op(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,r,s;this.options.offset&&t.length&&(r=this.getDecimalForValue(t[0]),t.length===1?n=1-r:n=(this.getDecimalForValue(t[1])-r)/2,s=this.getDecimalForValue(t[t.length-1]),t.length===1?i=s:i=(s-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;n=ae(n,0,o),i=ae(i,0,o),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,r=this.options,s=r.time,o=s.unit||rp(s.minUnit,n,i,this._getLabelCapacity(n)),a=ft(r.ticks.stepSize,1),c=o==="week"?s.isoWeekday:!1,l=Fr(c)||c===!0,h={};let u=n,d,f;if(l&&(u=+t.startOf(u,"isoWeek",c)),u=+t.startOf(u,l?"day":o),t.diff(i,n,o)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+o);const v=r.ticks.source==="data"&&this.getDataTimestamps();for(d=u,f=0;d<i;d=+t.add(d,a,o),f++)sp(h,d,v);return(d===i||r.bounds==="ticks"||f===1)&&sp(h,d,v),Object.keys(h).sort(np).map(w=>+w)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const r=this.options.time.displayFormats,s=this._unit,o=n||r[s];return this._adapter.format(t,o)}_tickFormatFunction(t,n,i,r){const s=this.options,o=s.ticks.callback;if(o)return Dt(o,[t,n,i],this);const a=s.time.displayFormats,c=this._unit,l=this._majorUnit,h=c&&a[c],u=l&&a[l],d=i[n],f=l&&u&&d&&d.major;return this._adapter.format(t,r||(f?u:h))}generateTickLabels(t){let n,i,r;for(n=0,i=t.length;n<i;++n)r=t[n],r.label=this._tickFormatFunction(r.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,r=cn(this.isHorizontal()?n.maxRotation:n.minRotation),s=Math.cos(r),o=Math.sin(r),a=this._resolveTickFontOptions(0).size;return{w:i*s+a*o,h:i*o+a*s}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,r=i[n.unit]||i.millisecond,s=this._tickFormatFunction(t,0,op(this,[t],this._majorUnit),r),o=this._getLabelSize(s),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,i=r.length;n<i;++n)t=t.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const r=this.getLabels();for(n=0,i=r.length;n<i;++n)t.push(ip(this,r[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Am(t.sort(np))}}function Ro(e,t,n){let i=0,r=e.length-1,s,o,a,c;n?(t>=e[i].pos&&t<=e[r].pos&&({lo:i,hi:r}=Ln(e,"pos",t)),{pos:s,time:a}=e[i],{pos:o,time:c}=e[r]):(t>=e[i].time&&t<=e[r].time&&({lo:i,hi:r}=Ln(e,"time",t)),{time:s,pos:a}=e[i],{time:o,pos:c}=e[r]);const l=o-s;return l?a+(c-a)*(t-s)/l:a}class SA extends Zl{static id="timeseries";static defaults=Zl.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Ro(n,this.min),this._tableRange=Ro(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,r=[],s=[];let o,a,c,l,h;for(o=0,a=t.length;o<a;++o)l=t[o],l>=n&&l<=i&&r.push(l);if(r.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(o=0,a=r.length;o<a;++o)h=r[o+1],c=r[o-1],l=r[o],Math.round((h+c)/2)!==l&&s.push({time:l,pos:o/(a-1)});return s}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((r,s)=>r-s)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Ro(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Ro(this._table,i*this._tableRange+this._minPos,!0)}}var CA=Object.freeze({__proto__:null,CategoryScale:eA,LinearScale:iA,LogarithmicScale:oA,RadialLinearScale:bA,TimeScale:Zl,TimeSeriesScale:SA});const $A=[k$,nM,QM,CA];var MA=Object.defineProperty,AA=Object.getOwnPropertyDescriptor,_v=e=>{throw TypeError(e)},tc=(e,t,n,i)=>{for(var r=i>1?void 0:i?AA(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&MA(t,n,r),r},EA=(e,t,n)=>t.has(e)||_v("Cannot "+n),TA=(e,t,n)=>t.has(e)?_v("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ap=(e,t,n)=>(EA(e,t,"access private method"),n),Ko,tu;ch.register(...$A);let Hr=class extends At{constructor(){super(...arguments),TA(this,Ko),this.chartType="bar",this.data={labels:[],datasets:[]},this.options={}}render(){return z`
      <canvas></canvas>
    `}firstUpdated(){ap(this,Ko,tu).call(this)}updated(e){(e.has("data")||e.has("chartType")||e.has("options"))&&this._chart&&(e.has("chartType")?(this._chart.destroy(),ap(this,Ko,tu).call(this)):(this._chart.data=this.data,e.has("options")&&(this._chart.options=this.options),this._chart.update()))}disconnectedCallback(){super.disconnectedCallback(),this._chart?.destroy(),this._chart=void 0}};Ko=new WeakSet;tu=function(){const t=this.shadowRoot.querySelector("canvas").getContext("2d");t&&(this._chart=new ch(t,{type:this.chartType,data:this.data,options:{responsive:!0,maintainAspectRatio:!0,...this.options}}))};Hr.styles=Et`
    :host {
      display: block;
      position: relative;
    }
  `;tc([mt({type:String})],Hr.prototype,"chartType",2);tc([mt({type:Object})],Hr.prototype,"data",2);tc([mt({type:Object})],Hr.prototype,"options",2);Hr=tc([zt("chart-wrapper")],Hr);const DA=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var OA=Object.defineProperty,PA=Object.getOwnPropertyDescriptor,yv=e=>{throw TypeError(e)},bv=(e,t,n,i)=>{for(var r=i>1?void 0:i?PA(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&OA(t,n,r),r},IA=(e,t,n)=>t.has(e)||yv("Cannot "+n),RA=(e,t,n)=>t.has(e)?yv("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),LA=(e,t,n)=>(IA(e,t,"access private method"),n),eu,wv;let Oa=class extends At{constructor(){super(...arguments),RA(this,eu),this.heading=""}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.shadowRoot?.getElementById("popover");e?.showPopover?.(),e?.addEventListener("toggle",t=>{t.newState==="closed"&&this.dispatchEvent(new CustomEvent("modal-close"))})})}render(){return z`
      <div id="popover" popover="auto">
        <div class="header">
          <h3>${this.heading}</h3>
          <button class="close" aria-label="Close" @click=${LA(this,eu,wv)}>${Ae(DA)}</button>
        </div>
        <slot></slot>
      </div>
    `}};eu=new WeakSet;wv=function(){this.shadowRoot?.getElementById("popover")?.hidePopover?.()};Oa.styles=Et`
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
  `;bv([mt({type:String})],Oa.prototype,"heading",2);Oa=bv([zt("budgee-modal")],Oa);const ec=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,so=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,oo=Et`
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
    transition: color 0.15s;
  }
  .icon-btn:hover {
    color: var(--budgee-text);
  }
  .icon-btn svg {
    width: 20px;
    height: 20px;
  }
  .icon-btn--danger:hover {
    color: var(--budgee-danger);
    background-color: color-mix(in lch, var(--budgee-danger) 15%, transparent);
  }
`;function BA(e,t){switch(t){case"day":return e.slice(0,10);case"month":return e.slice(0,7);case"year":return e.slice(0,4)}}function NA(e,t,n){const i=n?new Set(n):void 0,r=new Map;for(const o of e)for(const a of o.tagIds)r.set(a,(r.get(a)??0)+o.amount);const s=new Map;for(const o of t){if(i?.has(o._id))continue;const a=r.get(o._id);a!==void 0&&s.set(o.name,a)}return s}function zA(e,t,n){const i=n?new Set(n):void 0,r=new Map;for(const o of e)o.merchantId!==void 0&&r.set(o.merchantId,(r.get(o.merchantId)??0)+o.amount);const s=new Map;for(const o of t){if(i?.has(o._id))continue;const a=r.get(o._id);a!==void 0&&s.set(o.name,a)}return s}function jA(e,t){const n=new Map;for(const i of e){const r=BA(i.date,t);n.set(r,(n.get(r)??0)+i.amount)}return n}function FA(e,t){return e.filter(n=>!(t.tagId!==void 0&&!n.tagIds.includes(t.tagId)||t.merchantId!==void 0&&n.merchantId!==t.merchantId||t.startDate&&n.date<t.startDate||t.endDate&&n.date>t.endDate))}function qA(e,t){return t<2?e.map(n=>n):e.map((n,i)=>i<t-1?null:e.slice(i-t+1,i+1).reduce((s,o)=>s+o,0)/t)}function WA(e){return Math.max(2,Math.min(12,Math.round(e*.1)))}function Jn(e,t){const n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();if(t==null)return n;const i=n.match(/^lch\(([^)]+)\)$/);return i?`lch(${i[1]} / ${t})`:`color-mix(in srgb, ${n} ${Math.round(t*100)}%, transparent)`}var HA=Object.defineProperty,VA=Object.getOwnPropertyDescriptor,xv=e=>{throw TypeError(e)},ao=(e,t,n,i)=>{for(var r=i>1?void 0:i?VA(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&HA(t,n,r),r},kv=(e,t,n)=>t.has(e)||xv("Cannot "+n),UA=(e,t,n)=>(kv(e,t,"read from private field"),n?n.call(e):t.get(e)),KA=(e,t,n)=>t.has(e)?xv("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),qe=(e,t,n)=>(kv(e,t,"access private method"),n),we,Sv,Cv,$v,nu,Mv,Av,Ev,Tv,Dv,Ov,nc;let rr=class extends At{constructor(){super(...arguments),KA(this,we),this.transactions=[],this.tags=[],this.merchants=[]}render(){return z`
      <div class="resize-handle" @pointerdown=${qe(this,we,Tv)}></div>
      <div class="resize-handle-bottom" @pointerdown=${qe(this,we,Dv)}></div>
      <div class="resize-handle-corner" @pointerdown=${qe(this,we,Ov)}></div>
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" aria-label="Edit" @click=${qe(this,we,Mv)}>${Ae(ec)}</button>
          <button class="icon-btn icon-btn--danger" aria-label="Delete" @click=${qe(this,we,Av)}>${Ae(so)}</button>
        </div>
      </div>
      <chart-wrapper
        .chartType=${this.config.chartType}
        .data=${UA(this,we,Sv)}
      ></chart-wrapper>
    `}};we=new WeakSet;Sv=function(){const e=FA(this.transactions,{tagId:this.config.tagId,merchantId:this.config.merchantId,startDate:this.config.startDate,endDate:this.config.endDate}),{granularity:t}=this.config,n=t==="byTag"?NA(e,this.tags,this.config.excludedTagIds):t==="byMerchant"?zA(e,this.merchants,this.config.excludedMerchantIds):jA(e,t),i=t==="byTag"||t==="byMerchant",r=this.config.chartType==="pie"||this.config.chartType==="doughnut";let s=[...n.entries()].sort(([d],[f])=>d.localeCompare(f));r&&(s=qe(this,we,Cv).call(this,s),s.sort(([,d],[,f])=>Math.abs(f)-Math.abs(d)));const o=s.map(([,d])=>d),a=this.config.chartType==="bar",c=a?o.map(Math.abs):o,l=r?qe(this,we,$v).call(this,s):a?o.map(d=>d<0?Jn("--budgee-negative",.5):Jn("--budgee-positive",.5)):Jn("--budgee-primary",.5),h=r?Jn("--budgee-surface"):a?o.map(d=>d<0?Jn("--budgee-negative"):Jn("--budgee-positive")):Jn("--budgee-primary"),u=[{label:this.config.title,data:c,backgroundColor:l,borderColor:h,borderWidth:r?2:1}];if(!i&&this.config.chartType==="bar"&&c.length>=2){const d=WA(c.length);u.push({type:"line",label:`${this.config.title} (${d}-pt avg)`,data:qA(c,d),borderColor:Jn("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3})}return{labels:s.map(([d])=>d),datasets:u}};Cv=function(e){const t=e.reduce((s,[,o])=>s+Math.abs(o),0);if(t===0)return e;const n=t*.01,i=[];let r=0;for(const[s,o]of e)Math.abs(o)<n?r+=o:i.push([s,o]);return r!==0&&i.push(["Other",r]),i};$v=function(e){if(this.config.granularity==="byTag"){const t=new Map(this.tags.map(n=>[n.name,n]));return e.map(([n])=>t.get(n)?.color??qe(this,we,nu).call(this,n))}return e.map(([t])=>qe(this,we,nu).call(this,t))};nu=function(e){let t=0;for(let i=0;i<e.length;i++)t=t*31+e.charCodeAt(i)|0;return`lch(55% 50 ${(t%360+360)%360})`};Mv=function(){this.dispatchEvent(new CustomEvent("chart-edit",{detail:{chart:this.config}}))};Av=function(){this.dispatchEvent(new CustomEvent("chart-deleted",{detail:{id:this.config._id}}))};Ev=function(e){this.dispatchEvent(new CustomEvent("chart-resized",{detail:{id:this.config._id,...e}}))};Tv=function(e){qe(this,we,nc).call(this,e,{horizontal:!0})};Dv=function(e){qe(this,we,nc).call(this,e,{vertical:!0})};Ov=function(e){qe(this,we,nc).call(this,e,{horizontal:!0,vertical:!0})};nc=function(e,{horizontal:t,vertical:n}){e.preventDefault(),e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const r=this.closest(".chart-grid")??this.parentElement;if(!r)return;const s=r.getBoundingClientRect(),o=getComputedStyle(r),a=t?o.gridTemplateColumns.split(" ").length:0,c=n?parseFloat(o.gridTemplateRows.split(" ")[0])||200:0,l=n&&parseFloat(o.rowGap)||0;let h=this.config.colSpan??1,u=this.config.rowSpan??1;const d=t&&n?"data-resizing-corner":t?"data-resizing":"data-resizing-vertical";this.setAttribute(d,"");const f=w=>{if(t){const _=(w.clientX-s.left)/s.width,y=Math.round(_*a),g=this.getBoundingClientRect().left-s.left,p=Math.round(g/s.width*a);h=Math.max(1,Math.min(a-p,y-p)),this.style.gridColumn=`span ${h}`}if(n){const b=this.getBoundingClientRect().top-s.top,y=w.clientY-s.top-b;u=Math.max(1,Math.round((y+l)/(c+l))),this.style.gridRow=`span ${u}`}},v=()=>{this.removeAttribute(d),i.removeEventListener("pointermove",f),i.removeEventListener("pointerup",v),qe(this,we,Ev).call(this,{...t&&{colSpan:Math.max(1,Math.min(6,h))},...n&&{rowSpan:Math.max(1,Math.min(4,u))}})};i.addEventListener("pointermove",f),i.addEventListener("pointerup",v)};rr.styles=[oo,Et`
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
    `];ao([mt({type:Object})],rr.prototype,"config",2);ao([mt({type:Array})],rr.prototype,"transactions",2);ao([mt({type:Array})],rr.prototype,"tags",2);ao([mt({type:Array})],rr.prototype,"merchants",2);rr=ao([zt("dashboard-chart-card")],rr);var YA=Object.defineProperty,XA=Object.getOwnPropertyDescriptor,Pv=e=>{throw TypeError(e)},_i=(e,t,n,i)=>{for(var r=i>1?void 0:i?XA(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&YA(t,n,r),r},GA=(e,t,n)=>t.has(e)||Pv("Cannot "+n),QA=(e,t,n)=>t.has(e)?Pv("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ct=(e,t,n)=>(GA(e,t,"access private method"),n),xt,Iv,Rv,Lv,Bv,Nv,zv,ic,rc,jv,Fv,qv,sc,oc,Wv,Hv,Vv,Uv,Kv,Yv,Xv,Gv,Qv;let Sn=class extends At{constructor(){super(...arguments),QA(this,xt),this.transactions=[],this.tags=[],this.merchants=[],this.accounts=[],this._page=1,this._pageSize=10}render(){return z`
      <div class="resize-handle" @pointerdown=${Ct(this,xt,Bv)}></div>
      <div class="resize-handle-bottom" @pointerdown=${Ct(this,xt,Nv)}></div>
      <div class="resize-handle-corner" @pointerdown=${Ct(this,xt,zv)}></div>
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" aria-label="Edit" @click=${Ct(this,xt,Iv)}>${Ae(ec)}</button>
          <button class="icon-btn icon-btn--danger" aria-label="Delete" @click=${Ct(this,xt,Rv)}>${Ae(so)}</button>
        </div>
      </div>
      ${Ct(this,xt,Qv).call(this)}
    `}};xt=new WeakSet;Iv=function(){this.dispatchEvent(new CustomEvent("table-edit",{detail:{table:this.config}}))};Rv=function(){this.dispatchEvent(new CustomEvent("table-deleted",{detail:{id:this.config._id}}))};Lv=function(e){this.dispatchEvent(new CustomEvent("table-resized",{detail:{id:this.config._id,...e}}))};Bv=function(e){Ct(this,xt,ic).call(this,e,{horizontal:!0})};Nv=function(e){Ct(this,xt,ic).call(this,e,{vertical:!0})};zv=function(e){Ct(this,xt,ic).call(this,e,{horizontal:!0,vertical:!0})};ic=function(e,{horizontal:t,vertical:n}){e.preventDefault(),e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const r=this.closest(".table-grid")??this.parentElement;if(!r)return;const s=r.getBoundingClientRect(),o=getComputedStyle(r),a=t?o.gridTemplateColumns.split(" ").length:0,c=n?parseFloat(o.gridTemplateRows.split(" ")[0])||200:0,l=n&&parseFloat(o.rowGap)||0;let h=this.config.colSpan??1,u=this.config.rowSpan??1;const d=t&&n?"data-resizing-corner":t?"data-resizing":"data-resizing-vertical";this.setAttribute(d,"");const f=w=>{if(t){const _=(w.clientX-s.left)/s.width,y=Math.round(_*a),g=this.getBoundingClientRect().left-s.left,p=Math.round(g/s.width*a);h=Math.max(1,Math.min(a-p,y-p)),this.style.gridColumn=`span ${h}`}if(n){const b=this.getBoundingClientRect().top-s.top,y=w.clientY-s.top-b;u=Math.max(1,Math.round((y+l)/(c+l))),this.style.gridRow=`span ${u}`}},v=()=>{this.removeAttribute(d),i.removeEventListener("pointermove",f),i.removeEventListener("pointerup",v),Ct(this,xt,Lv).call(this,{...t&&{colSpan:Math.max(1,Math.min(6,h))},...n&&{rowSpan:Math.max(1,Math.min(4,u))}})};i.addEventListener("pointermove",f),i.addEventListener("pointerup",v)};rc=function(e){this._page=e.detail.page,this._pageSize=e.detail.pageSize};jv=function(e){return e?this.merchants.find(t=>t._id===e)?.name??"":""};Fv=function(e){return e?this.accounts.find(t=>t._id===e)?.name??"":""};qv=function(e){return e.map(t=>this.tags.find(n=>n._id===t)?.name??`#${t}`).join(", ")};sc=function(e){return{date:"Date",amount:"Amount",description:"Description",merchant:"Merchant",tags:"Tags",account:"Account",name:"Name",transactionCount:"Transactions",totalAmount:"Total Amount"}[e]};oc=function(e){return e==="amount"||e==="totalAmount"};Wv=function(){const e=[...this.transactions].sort((r,s)=>s.date.localeCompare(r.date)),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return z`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config._id}"
        @page-change=${Ct(this,xt,rc)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>z`
                <th class=${Ct(this,xt,oc).call(this,r)?"col-amount":""}>${Ct(this,xt,sc).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>z`
              <tr>
                ${i.map(s=>Ct(this,xt,Hv).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};Hv=function(e,t){switch(t){case"date":return z`<td>${e.date}</td>`;case"amount":return z`<td class="col-amount ${e.amount<0?"amount-negative":"amount-positive"}">${e.amount.toFixed(2)}</td>`;case"description":return z`<td>${e.originalDescription}</td>`;case"merchant":return z`<td>${Ct(this,xt,jv).call(this,e.merchantId)}</td>`;case"tags":return z`<td>${Ct(this,xt,qv).call(this,e.tagIds)}</td>`;case"account":return z`<td>${Ct(this,xt,Fv).call(this,e.accountId)}</td>`;default:return z`
          <td></td>
        `}};Vv=function(){const e=new Map,t=new Map;for(const n of this.transactions)n.merchantId!=null&&(e.set(n.merchantId,(e.get(n.merchantId)??0)+1),t.set(n.merchantId,(t.get(n.merchantId)??0)+n.amount));return this.merchants.map(n=>({merchant:n,transactionCount:e.get(n._id)??0,totalAmount:t.get(n._id)??0}))};Uv=function(){const e=Ct(this,xt,Vv).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return z`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config._id}"
        @page-change=${Ct(this,xt,rc)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>z`
                <th class=${Ct(this,xt,oc).call(this,r)?"col-amount":""}>${Ct(this,xt,sc).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>z`
              <tr>
                ${i.map(s=>Ct(this,xt,Kv).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};Kv=function(e,t){switch(t){case"name":return z`<td>${e.merchant.name}</td>`;case"transactionCount":return z`<td>${e.transactionCount}</td>`;case"totalAmount":return z`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return z`
          <td></td>
        `}};Yv=function(){const e=new Map,t=new Map;for(const n of this.transactions)for(const i of n.tagIds)e.set(i,(e.get(i)??0)+1),t.set(i,(t.get(i)??0)+n.amount);return this.tags.map(n=>({tag:n,transactionCount:e.get(n._id)??0,totalAmount:t.get(n._id)??0}))};Xv=function(){const e=Ct(this,xt,Yv).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return z`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config._id}"
        @page-change=${Ct(this,xt,rc)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>z`
                <th class=${Ct(this,xt,oc).call(this,r)?"col-amount":""}>${Ct(this,xt,sc).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>z`
              <tr>
                ${i.map(s=>Ct(this,xt,Gv).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};Gv=function(e,t){switch(t){case"name":return z`<td>${e.tag.name}</td>`;case"transactionCount":return z`<td>${e.transactionCount}</td>`;case"totalAmount":return z`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return z`
          <td></td>
        `}};Qv=function(){switch(this.config.model){case"transactions":return Ct(this,xt,Wv).call(this);case"merchants":return Ct(this,xt,Uv).call(this);case"tags":return Ct(this,xt,Xv).call(this);default:return pt}};Sn.styles=[Yn,oo,Et`
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
    `];_i([mt({type:Object})],Sn.prototype,"config",2);_i([mt({type:Array})],Sn.prototype,"transactions",2);_i([mt({type:Array})],Sn.prototype,"tags",2);_i([mt({type:Array})],Sn.prototype,"merchants",2);_i([mt({type:Array})],Sn.prototype,"accounts",2);_i([q()],Sn.prototype,"_page",2);_i([q()],Sn.prototype,"_pageSize",2);Sn=_i([zt("dashboard-table-card")],Sn);var JA=Object.defineProperty,ZA=Object.getOwnPropertyDescriptor,Jv=e=>{throw TypeError(e)},yi=(e,t,n,i)=>{for(var r=i>1?void 0:i?ZA(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&JA(t,n,r),r},tE=(e,t,n)=>t.has(e)||Jv("Cannot "+n),eE=(e,t,n)=>t.has(e)?Jv("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),il=(e,t,n)=>(tE(e,t,"access private method"),n),_s,Zv,t0,e0;const uh={transactions:[{id:"date",label:"Date"},{id:"amount",label:"Amount"},{id:"description",label:"Description"},{id:"merchant",label:"Merchant"},{id:"tags",label:"Tags"},{id:"account",label:"Account"}],merchants:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}],tags:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}]};function n0(e){return uh[e].map(t=>t.id)}let Cn=class extends At{constructor(){super(...arguments),eE(this,_s),this._title="",this._model="transactions",this._columns=n0("transactions"),this._colSpan=1,this._rowSpan=1,this._initialized=!1}updated(e){e.has("editingTable")&&this.editingTable&&!this._initialized&&(this._title=this.editingTable.title,this._model=this.editingTable.model,this._columns=[...this.editingTable.columns],this._colSpan=this.editingTable.colSpan??1,this._rowSpan=this.editingTable.rowSpan??1,this._initialized=!0)}render(){const e=uh[this._model];return z`
      <h4>${this.editingTable?"Edit Table":"Add Table"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${t=>{this._title=t.target.value}}
        />
        <label>Model:</label>
        <select @change=${t=>{il(this,_s,Zv).call(this,t.target.value)}}>
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
        ${e.map(t=>z`
          <label>
            <input
              type="checkbox"
              ?checked=${this._columns.includes(t.id)}
              @change=${n=>il(this,_s,t0).call(this,t.id,n.target.checked)}
            />
            ${t.label}
          </label>
        `)}
      </div>
      <button @click=${il(this,_s,e0)}>${this.editingTable?"Update Table":"Save to Dashboard"}</button>
    `}};_s=new WeakSet;Zv=function(e){this._model=e,this._columns=n0(e)};t0=function(e,t){if(t){const n=uh[this._model].map(i=>i.id);this._columns=n.filter(i=>this._columns.includes(i)||i===e)}else this._columns=this._columns.filter(n=>n!==e)};e0=function(){const e=this._title.trim();!e||this._columns.length===0||(this.dispatchEvent(new CustomEvent("table-saved",{detail:{id:this.editingTable?._id,title:e,model:this._model,columns:this._columns,colSpan:this._colSpan,rowSpan:this._rowSpan}})),this._title="",this._initialized=!1)};Cn.styles=Et`
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
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary);
      color: white;
      border: none;
      border-radius: 4px;
      margin-right: 0.5rem;
    }
    button:hover {
      background-color: var(--budgee-primary-hover);
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
  `;yi([mt({type:Object})],Cn.prototype,"editingTable",2);yi([q()],Cn.prototype,"_title",2);yi([q()],Cn.prototype,"_model",2);yi([q()],Cn.prototype,"_columns",2);yi([q()],Cn.prototype,"_colSpan",2);yi([q()],Cn.prototype,"_rowSpan",2);yi([q()],Cn.prototype,"_initialized",2);Cn=yi([zt("table-configurator")],Cn);var nE=Object.defineProperty,iE=Object.getOwnPropertyDescriptor,i0=e=>{throw TypeError(e)},ln=(e,t,n,i)=>{for(var r=i>1?void 0:i?iE(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&nE(t,n,r),r},rE=(e,t,n)=>t.has(e)||i0("Cannot "+n),sE=(e,t,n)=>t.has(e)?i0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ee=(e,t,n)=>(rE(e,t,"access private method"),n),Ht,Qn,iu,r0,s0,o0,a0,c0,l0,u0,h0,d0;let He=class extends At{constructor(){super(...arguments),sE(this,Ht),this._transactions=null,this._tags=[],this._merchants=[],this._accounts=[],this._charts=[],this._tables=[],this._showChartConfigurator=!1,this._showTableConfigurator=!1}connectedCallback(){super.connectedCallback(),ee(this,Ht,Qn).call(this)}disconnectedCallback(){super.disconnectedCallback(),this._chartSortable?.destroy(),this._tableSortable?.destroy()}updated(){ee(this,Ht,iu).call(this,".chart-grid","chart",e=>{this._chartSortable=e}),ee(this,Ht,iu).call(this,".table-grid","table",e=>{this._tableSortable=e})}render(){return this._transactions===null?z`
        <h3>Dashboard</h3>
        <p>Loading…</p>
      `:this._transactions.length===0?z`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `:z`
      <h3>Dashboard</h3>

      ${this._charts.length>0?z`
            <div class="chart-grid">
              ${this._charts.map(e=>z`
                <dashboard-chart-card
                  data-chart-id=${e._id}
                  style="grid-column: span ${e.colSpan??1}; grid-row: span ${e.rowSpan??1}"
                  .config=${e}
                  .transactions=${this._transactions}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  @chart-edit=${ee(this,Ht,o0)}
                  @chart-resized=${ee(this,Ht,a0)}
                  @chart-deleted=${ee(this,Ht,c0)}
                ></dashboard-chart-card>
              `)}
            </div>
          `:pt}

      ${this._tables.length>0?z`
            <div class="table-grid">
              ${this._tables.map(e=>z`
                <dashboard-table-card
                  data-table-id=${e._id}
                  style="grid-column: span ${e.colSpan??1}; grid-row: span ${e.rowSpan??1}"
                  .config=${e}
                  .transactions=${this._transactions}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  .accounts=${this._accounts}
                  @table-edit=${ee(this,Ht,u0)}
                  @table-resized=${ee(this,Ht,h0)}
                  @table-deleted=${ee(this,Ht,d0)}
                ></dashboard-table-card>
              `)}
            </div>
          `:pt}

      <div class="button-bar">
        <button @click=${()=>{this._showChartConfigurator=!0,this._editingChart=void 0}}>
          Add Chart
        </button>
        <button @click=${()=>{this._showTableConfigurator=!0,this._editingTable=void 0}}>
          Add Table
        </button>
      </div>

      ${this._showChartConfigurator?z`
            <budgee-modal
              heading=${this._editingChart?"Edit Chart":"Add Chart"}
              @modal-close=${()=>{this._showChartConfigurator=!1,this._editingChart=void 0}}
            >
              <chart-configurator
                .transactions=${this._transactions}
                .tags=${this._tags}
                .merchants=${this._merchants}
                .editingChart=${this._editingChart}
                @chart-saved=${ee(this,Ht,s0)}
              ></chart-configurator>
            </budgee-modal>
          `:pt}

      ${this._showTableConfigurator?z`
            <budgee-modal
              heading=${this._editingTable?"Edit Table":"Add Table"}
              @modal-close=${()=>{this._showTableConfigurator=!1,this._editingTable=void 0}}
            >
              <table-configurator
                .editingTable=${this._editingTable}
                @table-saved=${ee(this,Ht,l0)}
              ></table-configurator>
            </budgee-modal>
          `:pt}
    `}};Ht=new WeakSet;Qn=async function(){this._transactions=await xn.all(),this._tags=await Je.all(),this._merchants=await Hn.all(),this._accounts=await Br.all(),this._charts=await hi.all(),this._tables=await jr.all(),this._charts.length===0&&(await hi.create({title:"Monthly Overview",chartType:"bar",granularity:"month",colSpan:6,position:0}),this._charts=await hi.all())};iu=function(e,t,n){const i=t==="chart"?this._chartSortable:this._tableSortable,r=this.shadowRoot?.querySelector(e);if(!r){i?.destroy(),n(void 0);return}i?.el!==r&&(i?.destroy(),n(it.create(r,{animation:150,onEnd:()=>ee(this,Ht,r0).call(this,t)})))};r0=async function(e){const t=e==="chart"?".chart-grid":".table-grid",n=e==="chart"?"data-chart-id":"data-table-id",i=this.shadowRoot?.querySelector(t);if(!i)return;const r=i.querySelectorAll(`[${n}]`),s=[];r.forEach(o=>{const a=o.getAttribute(n);a&&s.push(a)}),e==="chart"?await hi.reorder(s):await jr.reorder(s),await ee(this,Ht,Qn).call(this)};s0=async function(e){const t=e.detail;t.id?await hi.update(t.id,{title:t.title,chartType:t.chartType,granularity:t.granularity,startDate:t.startDate,endDate:t.endDate,tagId:t.tagId,merchantId:t.merchantId,colSpan:t.colSpan,rowSpan:t.rowSpan,excludedTagIds:t.excludedTagIds,excludedMerchantIds:t.excludedMerchantIds}):await hi.create({...t,position:this._charts.length}),this._showChartConfigurator=!1,this._editingChart=void 0,await ee(this,Ht,Qn).call(this)};o0=function(e){this._editingChart=e.detail.chart,this._showChartConfigurator=!0};a0=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await hi.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await ee(this,Ht,Qn).call(this)};c0=async function(e){await hi.remove(e.detail.id),await ee(this,Ht,Qn).call(this)};l0=async function(e){const t=e.detail;t.id?await jr.update(t.id,{title:t.title,model:t.model,columns:t.columns,colSpan:t.colSpan,rowSpan:t.rowSpan}):await jr.create({...t,position:this._tables.length}),this._showTableConfigurator=!1,this._editingTable=void 0,await ee(this,Ht,Qn).call(this)};u0=function(e){this._editingTable=e.detail.table,this._showTableConfigurator=!0};h0=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await jr.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await ee(this,Ht,Qn).call(this)};d0=async function(e){await jr.remove(e.detail.id),await ee(this,Ht,Qn).call(this)};He.styles=[Yn,Et`
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
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
      .button-bar {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
    `];ln([q()],He.prototype,"_transactions",2);ln([q()],He.prototype,"_tags",2);ln([q()],He.prototype,"_merchants",2);ln([q()],He.prototype,"_accounts",2);ln([q()],He.prototype,"_charts",2);ln([q()],He.prototype,"_tables",2);ln([q()],He.prototype,"_showChartConfigurator",2);ln([q()],He.prototype,"_editingChart",2);ln([q()],He.prototype,"_showTableConfigurator",2);ln([q()],He.prototype,"_editingTable",2);He=ln([zt("budgee-dashboard")],He);function Pi(e){return e.map(({_rev:t,...n})=>n)}async function oE(){const e={version:Ui,transactions:Pi(await Ot(G.transactions)),tags:Pi(await Ot(G.tags)),merchants:Pi(await Ot(G.merchants)),accounts:Pi(await Ot(G.accounts)),merchantRules:Pi(await Ot(G.merchantRules)),dashboardCharts:Pi(await Ot(G.dashboardCharts)),dashboardTables:Pi(await Ot(G.dashboardTables))},t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`budgee-export-${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(n)}const Yr=Et`
  :host([busy]) {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
`;function Xr(e){class t extends e{constructor(){super(...arguments),this._busy=!1}async withBusy(i){this._busy=!0,this.toggleAttribute("busy",!0),this.requestUpdate();try{return await i()}finally{this._busy=!1,this.toggleAttribute("busy",!1),this.requestUpdate()}}get busy(){return this._busy}}return t}var aE=Object.getOwnPropertyDescriptor,f0=e=>{throw TypeError(e)},cE=(e,t,n,i)=>{for(var r=i>1?void 0:i?aE(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=o(r)||r);return r},lE=(e,t,n)=>t.has(e)||f0("Cannot "+n),uE=(e,t,n)=>t.has(e)?f0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),hE=(e,t,n)=>(lE(e,t,"access private method"),n),ru,p0;let su=class extends Xr(At){constructor(){super(...arguments),uE(this,ru)}render(){return z`
      <h2>Import Database</h2>
      <p>Restore from a full JSON backup. This will replace all existing data.</p>
      <input type="file" accept=".json" @change=${hE(this,ru,p0)} />

      <h2>Export Database</h2>
      <p>Download a full backup of your data as JSON.</p>
      <button @click=${oE}>Export</button>
    `}};ru=new WeakSet;p0=async function(e){const t=e.target;if(t.files?.length){if(!confirm("This will replace all existing data. Are you sure?")){t.value="";return}await this.withBusy(async()=>{await Dg(t.files[0]),t.value="",window.location.reload()})}};su.styles=[Yr,Et`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
    `];su=cE([zt("database-manager")],su);var dE=Object.defineProperty,fE=Object.getOwnPropertyDescriptor,g0=e=>{throw TypeError(e)},dr=(e,t,n,i)=>{for(var r=i>1?void 0:i?fE(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&dE(t,n,r),r},pE=(e,t,n)=>t.has(e)||g0("Cannot "+n),gE=(e,t,n)=>t.has(e)?g0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ze=(e,t,n)=>(pE(e,t,"access private method"),n),$e,m0,v0,_0,y0,b0,Yo,Xo,w0,x0;let Vn=class extends At{constructor(){super(...arguments),gE(this,$e),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc"}connectedCallback(){super.connectedCallback(),ze(this,$e,m0).call(this)}render(){if(this._rows===null)return z`
        <p>Loading…</p>
      `;if(this._rows.length===0)return z`
        <p>No merchants found.</p>
      `;const e=this._rows.filter(r=>ze(this,$e,b0).call(this,r)),t=ze(this,$e,w0).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return z`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="merchants"
        ?filterable=${!0}
        @page-change=${ze(this,$e,_0)}
        @filter-change=${ze(this,$e,y0)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>ze(this,$e,Yo).call(this,"name")}>
                Name${ze(this,$e,Xo).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>ze(this,$e,Yo).call(this,"count")}>
                Transactions${ze(this,$e,Xo).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>ze(this,$e,Yo).call(this,"spend")}>
                Total Spend${ze(this,$e,Xo).call(this,"spend")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>z`
              <tr @click=${()=>ze(this,$e,x0).call(this,r.merchant._id)}>
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
    `}};$e=new WeakSet;m0=async function(){const e=await Hn.all();this._rows=e.map(t=>({merchant:t,transactionCount:null,totalSpend:null})),ze(this,$e,v0).call(this)};v0=async function(){const e=await xn.all(),t=new Map,n=new Map;for(const i of e)i.merchantId!=null&&(t.set(i.merchantId,(t.get(i.merchantId)??0)+1),n.set(i.merchantId,(n.get(i.merchantId)??0)+i.amount));this._rows=this._rows.map(i=>({...i,transactionCount:t.get(i.merchant._id)??0,totalSpend:n.get(i.merchant._id)??0}))};_0=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};y0=function(e){this._filter=e.detail.filter,this._currentPage=1};b0=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.merchant.name.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.totalSpend!=null&&e.totalSpend.toFixed(2).includes(t))};Yo=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};Xo=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};w0=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.merchant.name.localeCompare(r.merchant.name):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="spend"&&(s=(i.totalSpend??0)-(r.totalSpend??0)),s*n})};x0=function(e){window.history.pushState({},"",`/merchants/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};Vn.styles=[Yn,Et`
      tbody tr {
        cursor: pointer;
      }
    `];dr([q()],Vn.prototype,"_rows",2);dr([q()],Vn.prototype,"_currentPage",2);dr([q()],Vn.prototype,"_pageSize",2);dr([q()],Vn.prototype,"_filter",2);dr([q()],Vn.prototype,"_sortCol",2);dr([q()],Vn.prototype,"_sortDir",2);Vn=dr([zt("merchant-list")],Vn);function mE(e,t){const n=t.value.toLowerCase();switch(t.operator){case"contains":return e.includes(n);case"startsWith":return e.startsWith(n);case"equals":return e===n;case"regex":return new RegExp(t.value,"i").test(e)}}function hh(e,t){const n=t.logic==="and"?"every":"some";return t.conditions[n](i=>mE(e,i))}function vE(e,t){const n=e.originalDescription.toLowerCase();for(const i of t){if(!hh(n,i))continue;const r=[...new Set([...e.tagIds,...i.tagIds])],s=i.merchantId??e.merchantId;return{...e,tagIds:r,merchantId:s}}return e}class Nn{constructor(){}static async all(){return Ot(G.merchantRules)}static async create(t){const n=Ie();return await G.merchantRules.put({...t,_id:n}),n}static async put(t){if(t._id){const n=await G.merchantRules.get(t._id);await G.merchantRules.put({...t,_id:t._id,_rev:n._rev})}else await G.merchantRules.put({...t,_id:Ie()})}static async update(t,n){const i=await G.merchantRules.get(t);await G.merchantRules.put({...i,...n})}static async remove(t){const n=await G.merchantRules.get(t);await G.merchantRules.remove(n)}static async applyToTransactions(t){const n=await Ot(G.transactions),i=[];for(const r of n){const s=r.originalDescription.toLowerCase();hh(s,t)&&i.push({...r,merchantId:t.merchantId??r.merchantId,tagIds:[...new Set([...r.tagIds,...t.tagIds])]})}return i.length>0&&await G.transactions.bulkDocs(i),i.length}}const _E=/^(SQ \*|TST\* |SP \*?|PAYPAL \*)/i,yE=/,\s*\w{2}$/,bE=e=>e.replace(_E,"").trim().replace(yE,"").trim().toLocaleLowerCase().split(" ").map(n=>n.charAt(0).toLocaleUpperCase()+n.slice(1)).join(" ");var wE=Object.defineProperty,xE=Object.getOwnPropertyDescriptor,k0=e=>{throw TypeError(e)},co=(e,t,n,i)=>{for(var r=i>1?void 0:i?xE(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&wE(t,n,r),r},S0=(e,t,n)=>t.has(e)||k0("Cannot "+n),ou=(e,t,n)=>(S0(e,t,"read from private field"),n?n.call(e):t.get(e)),kE=(e,t,n)=>t.has(e)?k0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ni=(e,t,n)=>(S0(e,t,"access private method"),n),Ye,dh,C0,$0,M0,A0,E0,fh,T0;let sr=class extends At{constructor(){super(...arguments),kE(this,Ye),this.merchants=[],this.value="",this._highlightIndex=-1,this._open=!1}render(){const e=ou(this,Ye,dh),t=ou(this,Ye,T0),n=this._open&&e.length>0&&!t,i=this.value.trim();return z`
      <div class="input-wrapper">
        <input
          type="text"
          placeholder="Merchant name (optional)"
          .value=${this.value}
          @input=${Ni(this,Ye,C0)}
          @paste=${Ni(this,Ye,$0)}
          @keydown=${Ni(this,Ye,M0)}
          @focus=${Ni(this,Ye,A0)}
          @blur=${Ni(this,Ye,E0)}
        />
        ${i?t?z`
                  <span class="status existing">existing</span>
                `:z`
                  <span class="status new">new</span>
                `:pt}
      </div>
      ${n?z`
          <div class="suggestions">
            ${e.map((r,s)=>z`
              <div
                class="suggestion ${s===this._highlightIndex?"highlighted":""}"
                @click=${()=>Ni(this,Ye,fh).call(this,r)}
              >
                ${r.name}
              </div>
            `)}
          </div>
        `:pt}
    `}};Ye=new WeakSet;dh=function(){const e=this.value.toLowerCase().trim();return e?this.merchants.filter(t=>t.name.toLowerCase().includes(e)):[]};C0=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:t}})),this._highlightIndex=-1,this._open=t.trim().length>0};$0=function(e){e.preventDefault();const n=(e.clipboardData?.getData("text")??"").toLowerCase().replace(/(?:^|\s)\S/g,r=>r.toUpperCase()),i=e.target;i.value=n,this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:n}})),this._highlightIndex=-1,this._open=n.trim().length>0};M0=function(e){const t=ou(this,Ye,dh);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,t.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"&&this._highlightIndex>=0&&this._highlightIndex<t.length?(e.preventDefault(),Ni(this,Ye,fh).call(this,t[this._highlightIndex])):e.key==="Escape"&&(this._open=!1)};A0=function(){this.value.trim().length>0&&(this._open=!0)};E0=function(){setTimeout(()=>{this._open=!1},150)};fh=function(e){this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:e.name}})),this._open=!1,this._highlightIndex=-1};T0=function(){const e=this.value.trim().toLowerCase();return e.length>0&&this.merchants.some(t=>t.name.toLowerCase()===e)};sr.styles=Et`
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
  `;co([mt({type:Array})],sr.prototype,"merchants",2);co([mt({type:String})],sr.prototype,"value",2);co([q()],sr.prototype,"_highlightIndex",2);co([q()],sr.prototype,"_open",2);sr=co([zt("merchant-autocomplete")],sr);const SE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,CE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,$E=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ME=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,AE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,EE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,TE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,DE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,OE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,PE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,IE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,RE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,LE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,BE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,NE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,zE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,jE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,FE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,qE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,WE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,HE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,VE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,UE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,KE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,YE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,XE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,GE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,QE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,JE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ZE=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,tT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,eT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,nT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,iT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,rT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,sT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,oT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,aT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,cT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,lT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,uT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,hT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,dT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,fT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,pT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,gT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,mT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,vT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,_T=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,yT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,bT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,wT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,xT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,kT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ST=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,CT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,$T=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,MT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,AT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,ET=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,TT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
</svg>`,DT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,OT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,PT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,IT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,RT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,LT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,BT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,NT=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var zT=Object.defineProperty,jT=Object.getOwnPropertyDescriptor,D0=e=>{throw TypeError(e)},ac=(e,t,n,i)=>{for(var r=i>1?void 0:i?jT(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&zT(t,n,r),r},O0=(e,t,n)=>t.has(e)||D0("Cannot "+n),cs=(e,t,n)=>(O0(e,t,"read from private field"),n?n.call(e):t.get(e)),rl=(e,t,n)=>t.has(e)?D0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ys=(e,t,n)=>(O0(e,t,"access private method"),n),Go,Qo,ei,P0,ph,I0,R0,L0;const cc={apple:SE,banknote:zg,beaker:CE,beer:$E,bell:ME,bike:AE,"book-open":EE,briefcase:DE,bug:OE,cake:PE,calculator:IE,calendar:RE,camera:LE,car:BE,carrot:NE,"chef-hat":zE,"circle-dollar-sign":jE,"circle-plus":FE,clock:WE,cloud:HE,coffee:VE,"credit-card":UE,box:TE,"cup-soda":KE,dumbbell:YE,flask:XE,gamepad:GE,gift:QE,globe:JE,"graduation-cap":ZE,hamburger:tT,heart:eT,home:nT,joystick:iT,key:rT,lightbulb:sT,mail:oT,"map-pin":aT,milk:cT,monitor:lT,music:uT,newspaper:hT,paintbrush:dT,"paw-print":fT,phone:pT,pizza:gT,plane:mT,puzzle:vT,question:qE,receipt:_T,scale:yT,scissors:bT,"shield-check":wT,shirt:xT,"shopping-bag":kT,"shopping-cart":ST,sparkles:CT,star:$T,store:jg,sun:MT,ticket:AT,trophy:ET,truck:TT,tv:DT,user:OT,users:PT,utensils:IT,wallet:RT,wifi:LT,wine:BT,wrench:ec,zap:NT},cp=Object.entries(cc);let Vr=class extends At{constructor(){super(...arguments),rl(this,ei),this.value="",this._open=!1,this._search="",rl(this,Go,e=>{if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._search="")}),rl(this,Qo,()=>{this._open&&ys(this,ei,ph).call(this)})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",cs(this,Go),!0),window.addEventListener("scroll",cs(this,Qo),!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",cs(this,Go),!0),window.removeEventListener("scroll",cs(this,Qo),!0)}render(){const e=this.value?cc[this.value]:null;return z`
      <button
        class="trigger ${e?"":"placeholder"}"
        @click=${ys(this,ei,P0)}
        title="Pick icon"
      >
        ${e?Ae(e):"?"}
      </button>
      ${this._open?z`
            <div class="popup">
              <input
                class="search"
                type="text"
                placeholder="Search icons..."
                .value=${this._search}
                @input=${t=>{this._search=t.target.value}}
              />
              <div class="grid">
                ${cs(this,ei,L0).map(([t,n])=>z`
                    <button
                      class="icon-option ${this.value===t?"selected":""}"
                      title=${t}
                      @click=${()=>ys(this,ei,I0).call(this,t)}
                    >
                      ${Ae(n)}
                    </button>
                  `)}
              </div>
              ${this.value?z`<button class="clear-btn" @click=${ys(this,ei,R0)}>Clear icon</button>`:pt}
            </div>
          `:pt}
    `}};Go=new WeakMap;Qo=new WeakMap;ei=new WeakSet;P0=function(){this._open=!this._open,this._search="",this._open&&this.updateComplete.then(()=>ys(this,ei,ph).call(this))};ph=function(){const e=this.shadowRoot?.querySelector(".trigger"),t=this.shadowRoot?.querySelector(".popup");if(!e||!t)return;const n=e.getBoundingClientRect(),i=t.offsetHeight,r=window.innerHeight-n.bottom;r<i+4&&n.top>r?t.style.top=`${n.top-i-4}px`:t.style.top=`${n.bottom+4}px`,t.style.left=`${n.left}px`};I0=function(e){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:e}})),this._open=!1,this._search=""};R0=function(){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:""}})),this._open=!1,this._search=""};L0=function(){if(!this._search)return cp;const e=this._search.toLowerCase();return cp.filter(([t])=>t.includes(e))};Vr.styles=Et`
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
  `;ac([mt({type:String})],Vr.prototype,"value",2);ac([q()],Vr.prototype,"_open",2);ac([q()],Vr.prototype,"_search",2);Vr=ac([zt("icon-picker")],Vr);var FT=Object.defineProperty,qT=Object.getOwnPropertyDescriptor,B0=e=>{throw TypeError(e)},fr=(e,t,n,i)=>{for(var r=i>1?void 0:i?qT(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&FT(t,n,r),r},N0=(e,t,n)=>t.has(e)||B0("Cannot "+n),ri=(e,t,n)=>(N0(e,t,"read from private field"),n?n.call(e):t.get(e)),WT=(e,t,n)=>t.has(e)?B0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ye=(e,t,n)=>(N0(e,t,"access private method"),n),Tt,gh,Wi,z0,j0,F0,q0,W0,H0,V0,Pa,Ia,lc;let Un=class extends At{constructor(){super(...arguments),WT(this,Tt),this.tags=[],this.selectedTagIds=[],this.excludeIds=[],this._query="",this._highlightIndex=-1,this._open=!1}updated(e){e.has("_open")&&this._open&&this.updateComplete.then(()=>ye(this,Tt,F0).call(this))}render(){const e=ri(this,Tt,gh);return z`
      <div class="input-wrapper" @click=${()=>this.shadowRoot?.querySelector("input")?.focus()}>
        ${this.selectedTagIds.map(t=>{const n=this.tags.find(s=>s._id===t),i=n?.color??"var(--budgee-primary)",r=n?.color?pm(n.color):"white";return z`
          <span class="tag-pill" style="background:${i};color:${r}" @click=${s=>{s.stopPropagation(),ye(this,Tt,j0).call(this,t)}}>
            ${ye(this,Tt,z0).call(this,t)} &times;
          </span>
        `})}
        <input
          type="text"
          placeholder=${this.selectedTagIds.length>0?"":"Add tag..."}
          .value=${this._query}
          @input=${ye(this,Tt,q0)}
          @keydown=${ye(this,Tt,W0)}
          @focus=${ye(this,Tt,H0)}
          @blur=${ye(this,Tt,V0)}
        />
      </div>
      ${this._open&&(e.length>0||ri(this,Tt,Wi))?z`
            <div class="suggestions">
              ${e.map((t,n)=>z`
                <div
                  class="suggestion ${n===this._highlightIndex?"highlighted":""}"
                  @click=${()=>ye(this,Tt,Pa).call(this,t)}
                >
                  ${t.name}
                </div>
              `)}
              ${ri(this,Tt,Wi)?z`
                    <div
                      class="suggestion create ${e.length===this._highlightIndex?"highlighted":""}"
                      @click=${ye(this,Tt,Ia)}
                    >
                      Create "${this._query.trim()}"
                    </div>
                  `:pt}
            </div>
          `:pt}
    `}};Tt=new WeakSet;gh=function(){const e=this._query.toLowerCase();return this.tags.filter(t=>!this.selectedTagIds.includes(t._id)&&!this.excludeIds.includes(t._id)&&t.name.toLowerCase().includes(e)).sort((t,n)=>{const i=t.name.toLowerCase().startsWith(e)?0:1,r=n.name.toLowerCase().startsWith(e)?0:1;return i-r||t.name.localeCompare(n.name)})};Wi=function(){const e=this._query.trim();return e?!this.tags.some(t=>t.name.toLowerCase()===e.toLowerCase()):!1};z0=function(e){const t=this.tags.find(i=>i._id===e);if(!t)return`#${e}`;const n=t.icon?cc[t.icon]:null;return n?z`<span class="pill-icon">${Ae(n)}</span> ${t.name}`:t.name};j0=function(e){this.dispatchEvent(new CustomEvent("tag-removed",{detail:{tagId:e}}))};F0=function(){const e=this.shadowRoot?.querySelector("input"),t=this.shadowRoot?.querySelector(".suggestions");if(!e||!t)return;const n=e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.left}px`,t.style.width=`${n.width}px`};q0=function(e){this._query=e.target.value,this._highlightIndex=-1,this._open=this._query.length>0};W0=function(e){const t=ri(this,Tt,gh),n=t.length+(ri(this,Tt,Wi)?1:0);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,n-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"?(e.preventDefault(),this._highlightIndex>=0&&this._highlightIndex<t.length?ye(this,Tt,Pa).call(this,t[this._highlightIndex]):ri(this,Tt,Wi)&&(this._highlightIndex===t.length||this._highlightIndex===-1)?ye(this,Tt,Ia).call(this):t.length===1&&!ri(this,Tt,Wi)?ye(this,Tt,Pa).call(this,t[0]):ri(this,Tt,Wi)&&ye(this,Tt,Ia).call(this)):e.key==="Escape"&&ye(this,Tt,lc).call(this)};H0=function(){this._query.length>0&&(this._open=!0)};V0=function(){setTimeout(()=>{this._open=!1},150)};Pa=function(e){this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:e}})),ye(this,Tt,lc).call(this)};Ia=function(){const e=this._query.trim();e&&(this.dispatchEvent(new CustomEvent("tag-created",{detail:{name:e}})),ye(this,Tt,lc).call(this))};lc=function(){this._query="",this._highlightIndex=-1,this._open=!1,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};Un.styles=Et`
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
  `;fr([mt({type:Array})],Un.prototype,"tags",2);fr([mt({type:Array})],Un.prototype,"selectedTagIds",2);fr([mt({type:Array})],Un.prototype,"excludeIds",2);fr([q()],Un.prototype,"_query",2);fr([q()],Un.prototype,"_highlightIndex",2);fr([q()],Un.prototype,"_open",2);Un=fr([zt("tag-autocomplete")],Un);var HT=Object.defineProperty,VT=Object.getOwnPropertyDescriptor,U0=e=>{throw TypeError(e)},mh=(e,t,n,i)=>{for(var r=i>1?void 0:i?VT(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&HT(t,n,r),r},UT=(e,t,n)=>t.has(e)||U0("Cannot "+n),KT=(e,t,n)=>t.has(e)?U0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),sl=(e,t,n)=>(UT(e,t,"access private method"),n),bs,K0,Y0,X0;const YT=[{value:"contains",label:"contains"},{value:"startsWith",label:"starts with"},{value:"equals",label:"equals"},{value:"regex",label:"regex"}];let Vs=class extends At{constructor(){super(...arguments),KT(this,bs),this.condition={field:"description",operator:"equals",value:""},this.index=0}render(){return z`
      <span>description</span>
      <select @change=${sl(this,bs,K0)}>
        ${YT.map(e=>z`
          <option value=${e.value} ?selected=${this.condition.operator===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${sl(this,bs,Y0)}
      />
      <button class="icon-btn icon-btn--danger" aria-label="Remove condition" @click=${sl(this,bs,X0)}>${Ae(so)}</button>
    `}};bs=new WeakSet;K0=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,operator:t}}}))};Y0=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};X0=function(){this.dispatchEvent(new CustomEvent("condition-removed",{detail:{index:this.index}}))};Vs.styles=[oo,Et`
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
    `];mh([mt({type:Object})],Vs.prototype,"condition",2);mh([mt({type:Number})],Vs.prototype,"index",2);Vs=mh([zt("condition-row")],Vs);var XT=Object.defineProperty,GT=Object.getOwnPropertyDescriptor,G0=e=>{throw TypeError(e)},Ze=(e,t,n,i)=>{for(var r=i>1?void 0:i?GT(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&XT(t,n,r),r},QT=(e,t,n)=>t.has(e)||G0("Cannot "+n),JT=(e,t,n)=>t.has(e)?G0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Zn=(e,t,n)=>(QT(e,t,"access private method"),n),pn,Q0,J0,Z0,t_,e_,n_,i_,r_;let Be=class extends At{constructor(){super(...arguments),JT(this,pn),this.tags=[],this.merchants=[],this.prefillDescription="",this.editingRule=null,this.editingMerchantName="",this._prefillPristine=!1,this._logic="or",this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[]}updated(e){e.has("editingRule")&&this.editingRule?(this._conditions=[...this.editingRule.conditions],this._logic=this.editingRule.logic,this._selectedTagIds=[...this.editingRule.tagIds],this._merchantName=this.editingMerchantName,this._pendingTagNames=[]):e.has("prefillDescription")&&this.prefillDescription&&(this._conditions=[{field:"description",operator:"equals",value:this.prefillDescription}],this._merchantName=bE(this.prefillDescription),this._prefillPristine=!0,this._pendingTagNames=[])}render(){return z`
      <h4>${this.editingRule?"Edit Rule":"Create Rule"}</h4>
      <div class="conditions">
        ${this._conditions.map((e,t)=>z`
          <condition-row
            .condition=${e}
            .index=${t}
            @condition-changed=${Zn(this,pn,Q0)}
            @condition-removed=${Zn(this,pn,J0)}
          ></condition-row>
        `)}
      </div>
      ${this._conditions.length>1?z`
            <div class="form-row">
              <label>Logic:</label>
              <select @change=${e=>{this._logic=e.target.value}}>
                <option value="and" ?selected=${this._logic==="and"}>All match (AND)</option>
                <option value="or" ?selected=${this._logic==="or"}>Any match (OR)</option>
              </select>
            </div>
          `:""}
      <button class="add-condition" @click=${Zn(this,pn,Z0)}>+ Add Condition</button>
      <div class="form-row">
        <label>Merchant:</label>
        <merchant-autocomplete
          .merchants=${this.merchants}
          .value=${this._merchantName}
          @merchant-changed=${e=>{this._merchantName=e.detail.name}}
        ></merchant-autocomplete>
      </div>
      <div class="form-row tags-row">
        <label>Tags:</label>
        ${this._pendingTagNames.map(e=>z`
          <span class="tag-badge" @click=${()=>Zn(this,pn,n_).call(this,e)}>
            ${e} &times;
          </span>
        `)}
        <tag-autocomplete
          .tags=${this.tags}
          .selectedTagIds=${this._selectedTagIds}
          @tag-selected=${Zn(this,pn,t_)}
          @tag-created=${Zn(this,pn,e_)}
          @tag-removed=${e=>Zn(this,pn,i_).call(this,e.detail.tagId)}
        ></tag-autocomplete>
      </div>
      <button @click=${Zn(this,pn,r_)}>Save Rule</button>
    `}};pn=new WeakSet;Q0=function(e){const{index:t,condition:n}=e.detail;let i=n;this._prefillPristine&&t===0&&n.operator==="equals"&&n.value!==this._conditions[0]?.value&&(i={...n,operator:"contains"},this._prefillPristine=!1),this._conditions=this._conditions.map((r,s)=>s===t?i:r)};J0=function(e){const{index:t}=e.detail;this._conditions=this._conditions.filter((n,i)=>i!==t)};Z0=function(){this._conditions=[...this._conditions,{field:"description",operator:"equals",value:""}]};t_=function(e){const t=e.detail.tag;this._selectedTagIds.includes(t._id)||(this._selectedTagIds=[...this._selectedTagIds,t._id])};e_=function(e){const t=e.detail.name;this._pendingTagNames.includes(t)||(this._pendingTagNames=[...this._pendingTagNames,t])};n_=function(e){this._pendingTagNames=this._pendingTagNames.filter(t=>t!==e)};i_=function(e){this._selectedTagIds=this._selectedTagIds.filter(t=>t!==e)};r_=function(){const e=this._conditions.filter(t=>t.value.trim());e.length!==0&&(this.dispatchEvent(new CustomEvent("rule-saved",{detail:{id:this.editingRule?._id,logic:this._logic,conditions:e,tagIds:this._selectedTagIds,newTagNames:this._pendingTagNames,merchantName:this._merchantName.trim()||void 0}})),this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._logic="or")};Be.styles=Et`
    :host {
      display: block;
      border: 1px solid var(--budgee-border);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface);
    }
    .form-row {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .conditions {
      margin-bottom: 0.5rem;
    }
    select,
    input {
      padding: 4px 8px;
    }
    button {
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary);
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: var(--budgee-primary-hover);
    }
    .add-condition {
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    .tags-row {
      flex-wrap: wrap;
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
    h4 {
      margin: 0 0 0.5rem;
    }
  `;Ze([mt({type:Array})],Be.prototype,"tags",2);Ze([mt({type:Array})],Be.prototype,"merchants",2);Ze([mt({type:String})],Be.prototype,"prefillDescription",2);Ze([mt({attribute:!1})],Be.prototype,"editingRule",2);Ze([mt({type:String})],Be.prototype,"editingMerchantName",2);Ze([q()],Be.prototype,"_prefillPristine",2);Ze([q()],Be.prototype,"_logic",2);Ze([q()],Be.prototype,"_conditions",2);Ze([q()],Be.prototype,"_selectedTagIds",2);Ze([q()],Be.prototype,"_merchantName",2);Ze([q()],Be.prototype,"_pendingTagNames",2);Be=Ze([zt("rule-editor")],Be);var ZT=Object.defineProperty,tD=Object.getOwnPropertyDescriptor,s_=e=>{throw TypeError(e)},lo=(e,t,n,i)=>{for(var r=i>1?void 0:i?tD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&ZT(t,n,r),r},eD=(e,t,n)=>t.has(e)||s_("Cannot "+n),nD=(e,t,n)=>t.has(e)?s_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Lo=(e,t,n)=>(eD(e,t,"access private method"),n),kr,au,cu;let or=class extends Xr(At){constructor(){super(...arguments),nD(this,kr),this.refreshTrigger=0,this._overlaps=[],this._merchants=new Map,this._loading=!0}connectedCallback(){super.connectedCallback(),Lo(this,kr,au).call(this)}willUpdate(e){e.has("refreshTrigger")&&e.get("refreshTrigger")!==void 0&&Lo(this,kr,au).call(this)}render(){return this._loading?z`
        <p>Analyzing rules...</p>
      `:this._overlaps.length===0?z`
        <h2>Rule Overlap</h2>
        <p>No overlapping rules found.</p>
      `:z`
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
          ${this._overlaps.map(e=>z`
            <tr>
              <td class="condition-summary">${Lo(this,kr,cu).call(this,e.ruleA)}</td>
              <td class="condition-summary">${Lo(this,kr,cu).call(this,e.ruleB)}</td>
              <td>${e.count}</td>
              <td class="samples">${e.samples.values().take(3).toArray().join(`

`)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `}};kr=new WeakSet;au=async function(){await this.withBusy(async()=>{const[e,t,n]=await Promise.all([Nn.all(),xn.all(),Hn.all()]);this._merchants=new Map(n.map(r=>[r._id,r.name]));const i=new Map;for(const r of t){const s=r.originalDescription.toLowerCase(),o=e.filter(a=>hh(s,a));if(!(o.length<2))for(let a=0;a<o.length;a++)for(let c=a+1;c<o.length;c++){const l=[o[a]._id,o[c]._id].sort().join("-"),h=i.get(l);h?(h.count++,h.samples.add(r.originalDescription)):i.set(l,{ruleA:o[a],ruleB:o[c],count:1,samples:new Set([r.originalDescription])})}}this._overlaps=[...i.values()].sort((r,s)=>s.count-r.count),this._loading=!1})};cu=function(e){const t=e.merchantId?this._merchants.get(e.merchantId)??"":"",n=e.conditions.map(i=>`${i.operator} "${i.value}"`).join(e.logic==="and"?" AND ":" OR ");return t?`${t}: ${n}`:n};or.styles=[Yr,Yn,Et`
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
    `];lo([mt({type:Number})],or.prototype,"refreshTrigger",2);lo([q()],or.prototype,"_overlaps",2);lo([q()],or.prototype,"_merchants",2);lo([q()],or.prototype,"_loading",2);or=lo([zt("rule-overlap")],or);var iD=Object.defineProperty,rD=Object.getOwnPropertyDescriptor,o_=e=>{throw TypeError(e)},re=(e,t,n,i)=>{for(var r=i>1?void 0:i?rD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&iD(t,n,r),r},sD=(e,t,n)=>t.has(e)||o_("Cannot "+n),oD=(e,t,n)=>t.has(e)?o_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),$t=(e,t,n)=>(sD(e,t,"access private method"),n),St,Ur,a_,c_,l_,u_,Ra,La,h_,d_,f_,p_,Jo,Zo,g_,m_,v_,__;let Kt=class extends Xr(At){constructor(){super(...arguments),oD(this,St),this._rules=[],this._tags=[],this._merchants=[],this._unmerchanted=[],this._prefillDescription="",this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._pendingRerunRule=null,this._rulesPage=1,this._rulesPageSize=10,this._rulesFilter="",this._rulesSortCol="conditions",this._rulesSortDir="asc",this._unmerchantedPage=1,this._unmerchantedPageSize=20,this._unmerchantedFilter="",this._overlapRefresh=0}connectedCallback(){super.connectedCallback(),$t(this,St,Ur).call(this)}render(){return z`
      <h2>Merchant Rules</h2>

      <div class="sections-grid">
      ${this._rules.length>0?z`
            <div class="section">
              <h3>Existing Rules</h3>
              ${(()=>{const e=this._rules.filter(n=>$t(this,St,p_).call(this,n)),t=$t(this,St,g_).call(this,e);return z`
                  <paginated-table
                    .totalItems=${e.length}
                    .defaultPageSize=${10}
                    storageKey="rules"
                    ?filterable=${!0}
                    @page-change=${$t(this,St,d_)}
                    @filter-change=${$t(this,St,f_)}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th class="sortable" @click=${()=>$t(this,St,Jo).call(this,"conditions")}>
                            Conditions${$t(this,St,Zo).call(this,"conditions")}
                          </th>
                          <th class="sortable" @click=${()=>$t(this,St,Jo).call(this,"merchant")}>
                            Merchant${$t(this,St,Zo).call(this,"merchant")}
                          </th>
                          <th class="sortable" @click=${()=>$t(this,St,Jo).call(this,"tags")}>
                            Tags${$t(this,St,Zo).call(this,"tags")}
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${t.slice((this._rulesPage-1)*this._rulesPageSize,this._rulesPage*this._rulesPageSize).map(n=>z`
                              <tr>
                                <td class="condition-summary">${$t(this,St,h_).call(this,n)}</td>
                                <td>${$t(this,St,La).call(this,n.merchantId)}</td>
                                <td>
                                  ${n.tagIds.map(i=>$t(this,St,u_).call(this,i)).join(", ")||"None"}
                                </td>
                                <td>
                                  <button class="icon-btn" aria-label="Edit rule" @click=${()=>$t(this,St,l_).call(this,n)}>${Ae(ec)}</button>
                                  <button class="icon-btn icon-btn--danger" aria-label="Delete rule" @click=${()=>$t(this,St,c_).call(this,n._id)}>${Ae(so)}</button>
                                </td>
                              </tr>
                            `)}
                      </tbody>
                    </table>
                  </paginated-table>
                `})()}
            </div>
          `:z`
              <p>No rules defined.</p>
            `}

      ${this._showEditor?z`
            <budgee-modal
              heading=${this._editingRule?"Edit Rule":"Create Rule"}
              @modal-close=${()=>{this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription=""}}
            >
              <rule-editor
                .tags=${this._tags}
                .merchants=${this._merchants}
                .prefillDescription=${this._prefillDescription}
                .editingRule=${this._editingRule}
                .editingMerchantName=${this._editingMerchantName}
                @rule-saved=${$t(this,St,a_)}
              ></rule-editor>
            </budgee-modal>
          `:pt}

      ${this._pendingRerunRule?z`
            <budgee-modal
              heading="Apply Rule"
              @modal-close=${()=>{this._pendingRerunRule=null}}
            >
              <p>Apply this rule to existing unmerchanted transactions?</p>
              <div class="confirm-actions">
                <button @click=${async()=>{await Nn.applyToTransactions(this._pendingRerunRule),this._pendingRerunRule=null,await $t(this,St,Ur).call(this)}}>Apply</button>
                <button class="secondary-btn" @click=${()=>{this._pendingRerunRule=null}}>Skip</button>
              </div>
            </budgee-modal>
          `:pt}

      ${this._unmerchanted.length>0?z`
            <div class="section">
              <h3>Unmerchanted Transactions</h3>
              ${(()=>{const e=this._unmerchantedFilter.toLowerCase(),t=e?this._unmerchanted.filter(n=>n.originalDescription.toLowerCase().includes(e)):this._unmerchanted;return z`
                  <paginated-table
                    .totalItems=${t.length}
                    .defaultPageSize=${20}
                    storageKey="unmerchanted"
                    ?filterable=${!0}
                    @page-change=${$t(this,St,m_)}
                    @filter-change=${$t(this,St,v_)}
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
                        ${t.slice((this._unmerchantedPage-1)*this._unmerchantedPageSize,this._unmerchantedPage*this._unmerchantedPageSize).map(n=>z`
                          <tr class="clickable-row" @click=${()=>$t(this,St,__).call(this,n)}>
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
          `:pt}

      <rule-overlap .refreshTrigger=${this._overlapRefresh}></rule-overlap>
      </div>
    `}};St=new WeakSet;Ur=async function(){this._rules=await Nn.all(),this._tags=await Je.all(),this._merchants=await Hn.all();const e=await xn.all();this._unmerchanted=e.filter(t=>t.merchantId===void 0),this._overlapRefresh++};a_=async function(e){await this.withBusy(async()=>{const{id:t,logic:n,conditions:i,tagIds:r,newTagNames:s,merchantName:o}=e.detail,a=[...r];if(s?.length)for(const h of s){const d=(await Je.byName(h))?._id??await Je.create(h);a.push(d)}let c;if(o&&(c=(await Hn.byName(o))?._id??await Hn.create(o)),!t&&c){const h=this._rules.find(u=>u.merchantId===c);if(h){const u=[...h.conditions,...i],d=[...new Set([...h.tagIds,...a])],f=h.conditions.length<=1?"or":h.logic,v={...h,logic:f,conditions:u,tagIds:d};await Nn.put(v),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",this._pendingRerunRule=v,await $t(this,St,Ur).call(this);return}}const l=t?{_id:t,logic:n,conditions:i,merchantId:c,tagIds:a}:{logic:n,conditions:i,merchantId:c,tagIds:a};t?(await Nn.put(l),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",this._pendingRerunRule=l):(l._id=await Nn.create(l),await Nn.applyToTransactions(l),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription=""),await $t(this,St,Ur).call(this)})};c_=async function(e){await this.withBusy(async()=>{await Nn.remove(e),await $t(this,St,Ur).call(this)})};l_=async function(e){let t="";e.merchantId&&(t=(await Hn.get(e.merchantId))?.name??""),this._editingRule=e,this._editingMerchantName=t,this._showEditor=!0};u_=function(e){const t=this._tags.find(n=>n._id===e);return t?t.icon?`${t.icon} ${t.name}`:t.name:`#${e}`};Ra=function(e){return this._tags.find(t=>t._id===e)?.name??`#${e}`};La=function(e){return e?this._merchants.find(t=>t._id===e)?.name??"":""};h_=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};d_=function(e){this._rulesPage=e.detail.page,this._rulesPageSize=e.detail.pageSize};f_=function(e){this._rulesFilter=e.detail.filter,this._rulesPage=1};p_=function(e){if(!this._rulesFilter)return!0;const t=this._rulesFilter.toLowerCase();return!!(e.conditions.some(n=>n.value.toLowerCase().includes(t))||e.merchantId&&this._merchants.find(i=>i._id===e.merchantId)?.name.toLowerCase().includes(t)||e.tagIds.some(n=>$t(this,St,Ra).call(this,n).toLowerCase().includes(t)))};Jo=function(e){this._rulesSortCol===e?this._rulesSortDir=this._rulesSortDir==="asc"?"desc":"asc":(this._rulesSortCol=e,this._rulesSortDir="asc"),this._rulesPage=1};Zo=function(e){return this._rulesSortCol!==e?"":this._rulesSortDir==="asc"?" ▲":" ▼"};g_=function(e){const t=this._rulesSortCol,n=this._rulesSortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="conditions"){const o=i.conditions[0]?.value??"",a=r.conditions[0]?.value??"";s=o.localeCompare(a)}else if(t==="merchant")s=$t(this,St,La).call(this,i.merchantId).localeCompare($t(this,St,La).call(this,r.merchantId));else if(t==="tags"){const o=i.tagIds.map(c=>$t(this,St,Ra).call(this,c)).join(","),a=r.tagIds.map(c=>$t(this,St,Ra).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};m_=function(e){this._unmerchantedPage=e.detail.page,this._unmerchantedPageSize=e.detail.pageSize};v_=function(e){this._unmerchantedFilter=e.detail.filter,this._unmerchantedPage=1};__=function(e){this._prefillDescription=e.originalDescription,this._showEditor=!0};Kt.styles=[Yr,Yn,oo,Et`
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
      button {
        padding: 4px 12px;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
      .secondary-btn {
        background-color: var(--budgee-danger);
      }
      .secondary-btn:hover {
        background-color: var(--budgee-danger-hover);
      }
      .confirm-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      .condition-summary {
        font-size: 0.85rem;
        color: var(--budgee-text-muted);
      }
      .sections-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 1200px) {
        .sections-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `];re([q()],Kt.prototype,"_rules",2);re([q()],Kt.prototype,"_tags",2);re([q()],Kt.prototype,"_merchants",2);re([q()],Kt.prototype,"_unmerchanted",2);re([q()],Kt.prototype,"_prefillDescription",2);re([q()],Kt.prototype,"_showEditor",2);re([q()],Kt.prototype,"_editingRule",2);re([q()],Kt.prototype,"_editingMerchantName",2);re([q()],Kt.prototype,"_pendingRerunRule",2);re([q()],Kt.prototype,"_rulesPage",2);re([q()],Kt.prototype,"_rulesPageSize",2);re([q()],Kt.prototype,"_rulesFilter",2);re([q()],Kt.prototype,"_rulesSortCol",2);re([q()],Kt.prototype,"_rulesSortDir",2);re([q()],Kt.prototype,"_unmerchantedPage",2);re([q()],Kt.prototype,"_unmerchantedPageSize",2);re([q()],Kt.prototype,"_unmerchantedFilter",2);re([q()],Kt.prototype,"_overlapRefresh",2);Kt=re([zt("rule-manager")],Kt);var aD=Object.defineProperty,cD=Object.getOwnPropertyDescriptor,y_=e=>{throw TypeError(e)},uo=(e,t,n,i)=>{for(var r=i>1?void 0:i?cD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&aD(t,n,r),r},b_=(e,t,n)=>t.has(e)||y_("Cannot "+n),lD=(e,t,n)=>(b_(e,t,"read from private field"),n?n.call(e):t.get(e)),uD=(e,t,n)=>t.has(e)?y_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ol=(e,t,n)=>(b_(e,t,"access private method"),n),Sr,w_,x_,k_,S_;let ar=class extends At{constructor(){super(...arguments),uD(this,Sr),this._url="",this._testResult=null,this._testError="",this._testedUrl=""}connectedCallback(){super.connectedCallback(),this._url=localStorage.getItem("budgee-sync-url")??""}render(){return z`
      <h2>Sync Settings</h2>
      <p class="hint">Sync your data across devices using CouchDB replication. Save a valid URL to enable sync; clear it to disable.</p>
      <div class="field">
        <label for="sync-url">CouchDB URL</label>
        <input type="url" id="sync-url" .value=${this._url} @change=${ol(this,Sr,w_)}
          placeholder="http://your-server:5984" />
        <p class="hint">The URL of your CouchDB server.</p>
      </div>
      ${this._url?z`
            <div class="field">
              <button ?disabled=${this._testResult==="testing"} @click=${ol(this,Sr,x_)}>
                ${this._testResult==="testing"?"Testing...":"Test Connection"}
              </button>
              ${this._testResult==="success"?z`
                      <p class="test-result success">Connection successful.</p>
                    `:this._testResult==="error"?z`<p class="test-result error">Connection failed: ${this._testError}</p>`:pt}
            </div>
          `:pt}
      <div class="field">
        <button ?disabled=${!lD(this,Sr,k_)} @click=${ol(this,Sr,S_)}>Save</button>
      </div>
    `}};Sr=new WeakSet;w_=function(e){this._url=e.target.value,this._testResult=null,this._testError="",this._testedUrl=""};x_=async function(){this._testResult="testing",this._testError="";try{await ik(this._url),this._testResult="success",this._testedUrl=this._url}catch(e){this._testResult="error",this._testError=e instanceof Error?e.message:String(e),this._testedUrl=""}};k_=function(){const e=localStorage.getItem("budgee-sync-url")??"";return this._url===e?!1:this._url?this._testResult==="success"&&this._testedUrl===this._url:!0};S_=function(){localStorage.setItem("budgee-sync-url",this._url),this.dispatchEvent(new CustomEvent("budgee-sync-settings-changed",{bubbles:!0,composed:!0})),this.requestUpdate()};ar.styles=Et`
    :host {
      display: block;
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
      padding: 0.4rem 0.8rem;
      border: 1px solid var(--budgee-border);
      border-radius: 4px;
      background: var(--budgee-surface);
      color: var(--budgee-text);
      cursor: pointer;
      font-size: 0.9rem;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
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
  `;uo([q()],ar.prototype,"_url",2);uo([q()],ar.prototype,"_testResult",2);uo([q()],ar.prototype,"_testError",2);uo([q()],ar.prototype,"_testedUrl",2);ar=uo([zt("budgee-settings")],ar);var hD=Object.defineProperty,dD=Object.getOwnPropertyDescriptor,C_=e=>{throw TypeError(e)},bi=(e,t,n,i)=>{for(var r=i>1?void 0:i?dD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&hD(t,n,r),r},fD=(e,t,n)=>t.has(e)||C_("Cannot "+n),pD=(e,t,n)=>t.has(e)?C_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),fe=(e,t,n)=>(fD(e,t,"access private method"),n),te,Gr,vh,$_,M_,A_,E_,T_,D_,O_,P_,I_,R_;let $n=class extends Xr(At){constructor(){super(...arguments),pD(this,te),this._tags=[],this._newTagName="",this._error="",this._filter="",this._currentPage=1,this._pageSize=25,this._sortDir="asc"}connectedCallback(){super.connectedCallback(),fe(this,te,Gr).call(this)}render(){return z`
      <h3>Tags</h3>
      <div class="tag-form">
        <input
          type="text"
          placeholder="New tag name"
          .value=${this._newTagName}
          @input=${fe(this,te,T_)}
          @keydown=${fe(this,te,D_)}
        />
        <button @click=${fe(this,te,vh)}>Add</button>
      </div>
      ${this._error?z`<p class="error">${this._error}</p>`:""}
      ${(()=>{const e=this._filter.toLowerCase(),t=e?this._tags.filter(o=>o.name.toLowerCase().includes(e)):this._tags,n=fe(this,te,R_).call(this,t),i=(this._currentPage-1)*this._pageSize,r=n.slice(i,i+this._pageSize),s=this._sortDir==="asc"?" ▲":" ▼";return z`
          <paginated-table
            .totalItems=${t.length}
            .defaultPageSize=${25}
            storageKey="tags"
            ?filterable=${!0}
            @page-change=${fe(this,te,O_)}
            @filter-change=${fe(this,te,P_)}
          >
            <table>
              <thead>
                <tr>
                  <th class="col-icon">Icon</th>
                  <th class="col-color">Color</th>
                  <th class="sortable" @click=${fe(this,te,I_)}>Name${s}</th>
                  <th class="col-remove"></th>
                </tr>
              </thead>
              <tbody>
                ${r.map(o=>z`
                  <tr>
                    <td class="col-icon">
                      <icon-picker
                        .value=${o.icon??""}
                        @icon-selected=${a=>fe(this,te,M_).call(this,o,a.detail.icon)}
                      ></icon-picker>
                    </td>
                    <td class="col-color">
                      <input
                        type="color"
                        class="color-swatch"
                        .value=${fe(this,te,A_).call(this,o.color)}
                        @change=${a=>fe(this,te,E_).call(this,o,a.target.value)}
                      />
                    </td>
                    <td>
                      ${o.name}
                    </td>
                    <td class="col-remove">
                      <button class="icon-btn icon-btn--danger" aria-label="Remove tag" @click=${()=>fe(this,te,$_).call(this,o._id)}>
                        ${Ae(so)}
                      </button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </paginated-table>
        `})()}
    `}};te=new WeakSet;Gr=async function(){this._tags=await Je.all()};vh=async function(){const e=this._newTagName.trim();if(!e)return;if(this._error="",await Je.byName(e)){this._error=`Tag "${e}" already exists.`;return}await this.withBusy(async()=>{await Je.create(e),this._newTagName="",await fe(this,te,Gr).call(this)})};$_=async function(e){await this.withBusy(async()=>{await Je.remove(e),await fe(this,te,Gr).call(this)})};M_=async function(e,t){await this.withBusy(async()=>{await Je.update(e._id,{icon:t||void 0}),await fe(this,te,Gr).call(this)})};A_=function(e){return e?Jk(e):"#7eb8da"};E_=async function(e,t){await this.withBusy(async()=>{await Je.update(e._id,{color:t}),await fe(this,te,Gr).call(this)})};T_=function(e){this._newTagName=e.target.value};D_=function(e){e.key==="Enter"&&fe(this,te,vh).call(this)};O_=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};P_=function(e){this._filter=e.detail.filter,this._currentPage=1};I_=function(){this._sortDir=this._sortDir==="asc"?"desc":"asc",this._currentPage=1};R_=function(e){const t=this._sortDir==="asc"?1:-1;return[...e].sort((n,i)=>n.name.localeCompare(i.name)*t)};$n.styles=[Yr,Yn,oo,Et`
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
      button {
        padding: 4px 12px;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
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
    `];bi([q()],$n.prototype,"_tags",2);bi([q()],$n.prototype,"_newTagName",2);bi([q()],$n.prototype,"_error",2);bi([q()],$n.prototype,"_filter",2);bi([q()],$n.prototype,"_currentPage",2);bi([q()],$n.prototype,"_pageSize",2);bi([q()],$n.prototype,"_sortDir",2);$n=bi([zt("tag-manager")],$n);var gD=Object.defineProperty,mD=Object.getOwnPropertyDescriptor,L_=e=>{throw TypeError(e)},_h=(e,t,n,i)=>{for(var r=i>1?void 0:i?mD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&gD(t,n,r),r},vD=(e,t,n)=>t.has(e)||L_("Cannot "+n),_D=(e,t,n)=>t.has(e)?L_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),yD=(e,t,n)=>(vD(e,t,"access private method"),n),lu,B_;let Us=class extends At{constructor(){super(...arguments),_D(this,lu),this.tags=[],this.tagIds=[]}render(){return z`${this.tagIds.map(e=>{const t=this.tags.find(r=>r._id===e),n=t?.color??"var(--budgee-primary)",i=t?.color?pm(t.color):"white";return z`<span class="tag-pill" style="background:${n};color:${i}">${yD(this,lu,B_).call(this,e)}</span>`})}`}};lu=new WeakSet;B_=function(e){const t=this.tags.find(i=>i._id===e);if(!t)return`#${e}`;const n=t.icon?cc[t.icon]:null;return n?z`<span class="pill-icon">${Ae(n)}</span> ${t.name}`:t.name};Us.styles=Et`
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 2px;
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
  `;_h([mt({type:Array})],Us.prototype,"tags",2);_h([mt({type:Array})],Us.prototype,"tagIds",2);Us=_h([zt("tag-pills")],Us);async function bD(e,t,n){const i=await Nn.all(),r=t.account?await wD(e,t.account):void 0,s=e.map(o=>xD(o,t,r?.get(o[t.account])??n.accountId)).filter(o=>o!==void 0).map(o=>vE(o,i));return n.importMode==="replace"&&await xn.deleteAll(),await xn.bulkAdd(s),s.length}async function wD(e,t){const n=[...new Set(e.map(o=>o[t]).filter(Boolean))],i=await Br.all(),r=new Map;for(const o of i)r.set(o.name.toLowerCase(),o._id);const s=new Map;for(const o of n){const a=r.get(o.toLowerCase());if(a)s.set(o,a);else{const c=await Br.create({name:o});s.set(o,c),r.set(o.toLowerCase(),c)}}return s}function xD(e,t,n){const i=t.date?e[t.date]:void 0,r=t.amount?e[t.amount]:void 0,s=t.credit?e[t.credit]:void 0,o=t.description?e[t.description]:void 0;if(!i||!o)return;const a=r?Number.parseFloat(r):NaN,c=s?Number.parseFloat(s):NaN;if(Number.isNaN(a)&&Number.isNaN(c))return;const l=(Number.isNaN(a)?0:-a)+(Number.isNaN(c)?0:c);return{date:i,amount:l,originalDescription:o,tagIds:[],accountId:n}}var ta={exports:{}};var kD=ta.exports,lp;function SD(){return lp||(lp=1,(function(e,t){((n,i)=>{e.exports=i()})(kD,function n(){var i=typeof self<"u"?self:typeof window<"u"?window:i!==void 0?i:{},r,s=!i.document&&!!i.postMessage,o=i.IS_PAPA_WORKER||!1,a={},c=0,l={};function h(k){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(S){var E=m(S);E.chunkSize=parseInt(E.chunkSize),S.step||S.chunk||(E.chunkSize=null),this._handle=new w(E),(this._handle.streamer=this)._config=E}).call(this,k),this.parseChunk=function(S,E){var P=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<P){let j=this._config.newline;j||(B=this._config.quoteChar||'"',j=this._handle.guessLineEndings(S,B)),S=[...S.split(j).slice(P)].join(j)}this.isFirstChunk&&M(this._config.beforeFirstChunk)&&(B=this._config.beforeFirstChunk(S))!==void 0&&(S=B),this.isFirstChunk=!1,this._halted=!1;var P=this._partialLine+S,B=(this._partialLine="",this._handle.parse(P,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(S=B.meta.cursor,P=(this._finished||(this._partialLine=P.substring(S-this._baseIndex),this._baseIndex=S),B&&B.data&&(this._rowCount+=B.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),o)i.postMessage({results:B,workerId:l.WORKER_ID,finished:P});else if(M(this._config.chunk)&&!E){if(this._config.chunk(B,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=B=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(B.data),this._completeResults.errors=this._completeResults.errors.concat(B.errors),this._completeResults.meta=B.meta),this._completed||!P||!M(this._config.complete)||B&&B.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),P||B&&B.meta.paused||this._nextChunk(),B}this._halted=!0},this._sendError=function(S){M(this._config.error)?this._config.error(S):o&&this._config.error&&i.postMessage({workerId:l.WORKER_ID,error:S,finished:!1})}}function u(k){var S;(k=k||{}).chunkSize||(k.chunkSize=l.RemoteChunkSize),h.call(this,k),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(E){this._input=E,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(S=new XMLHttpRequest,this._config.withCredentials&&(S.withCredentials=this._config.withCredentials),s||(S.onload=x(this._chunkLoaded,this),S.onerror=x(this._chunkError,this)),S.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var E,P=this._config.downloadRequestHeaders;for(E in P)S.setRequestHeader(E,P[E])}var B;this._config.chunkSize&&(B=this._start+this._config.chunkSize-1,S.setRequestHeader("Range","bytes="+this._start+"-"+B));try{S.send(this._config.downloadRequestBody)}catch(j){this._chunkError(j.message)}s&&S.status===0&&this._chunkError()}},this._chunkLoaded=function(){S.readyState===4&&(S.status<200||400<=S.status?this._chunkError():(this._start+=this._config.chunkSize||S.responseText.length,this._finished=!this._config.chunkSize||this._start>=(E=>(E=E.getResponseHeader("Content-Range"))!==null?parseInt(E.substring(E.lastIndexOf("/")+1)):-1)(S),this.parseChunk(S.responseText)))},this._chunkError=function(E){E=S.statusText||E,this._sendError(new Error(E))}}function d(k){(k=k||{}).chunkSize||(k.chunkSize=l.LocalChunkSize),h.call(this,k);var S,E,P=typeof FileReader<"u";this.stream=function(B){this._input=B,E=B.slice||B.webkitSlice||B.mozSlice,P?((S=new FileReader).onload=x(this._chunkLoaded,this),S.onerror=x(this._chunkError,this)):S=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var B=this._input,j=(this._config.chunkSize&&(j=Math.min(this._start+this._config.chunkSize,this._input.size),B=E.call(B,this._start,j)),S.readAsText(B,this._config.encoding));P||this._chunkLoaded({target:{result:j}})},this._chunkLoaded=function(B){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(B.target.result)},this._chunkError=function(){this._sendError(S.error)}}function f(k){var S;h.call(this,k=k||{}),this.stream=function(E){return S=E,this._nextChunk()},this._nextChunk=function(){var E,P;if(!this._finished)return E=this._config.chunkSize,S=E?(P=S.substring(0,E),S.substring(E)):(P=S,""),this._finished=!S,this.parseChunk(P)}}function v(k){h.call(this,k=k||{});var S=[],E=!0,P=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(B){this._input=B,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){P&&S.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),S.length?this.parseChunk(S.shift()):E=!0},this._streamData=x(function(B){try{S.push(typeof B=="string"?B:B.toString(this._config.encoding)),E&&(E=!1,this._checkIsFinished(),this.parseChunk(S.shift()))}catch(j){this._streamError(j)}},this),this._streamError=x(function(B){this._streamCleanUp(),this._sendError(B)},this),this._streamEnd=x(function(){this._streamCleanUp(),P=!0,this._streamData("")},this),this._streamCleanUp=x(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function w(k){var S,E,P,B,j=Math.pow(2,53),H=-j,Q=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,J=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,U=this,$=0,C=0,T=!1,A=!1,O=[],L={data:[],errors:[],meta:{}};function V(N){return k.skipEmptyLines==="greedy"?N.join("").trim()==="":N.length===1&&N[0].length===0}function R(){if(L&&P&&(I("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),P=!1),k.skipEmptyLines&&(L.data=L.data.filter(function(X){return!V(X)})),D()){let X=function(et,rt){M(k.transformHeader)&&(et=k.transformHeader(et,rt)),O.push(et)};if(L)if(Array.isArray(L.data[0])){for(var N=0;D()&&N<L.data.length;N++)L.data[N].forEach(X);L.data.splice(0,1)}else L.data.forEach(X)}function F(X,et){for(var rt=k.header?{}:[],st=0;st<X.length;st++){var gt=st,Y=X[st],Y=((tt,K)=>(ot=>(k.dynamicTypingFunction&&k.dynamicTyping[ot]===void 0&&(k.dynamicTyping[ot]=k.dynamicTypingFunction(ot)),(k.dynamicTyping[ot]||k.dynamicTyping)===!0))(tt)?K==="true"||K==="TRUE"||K!=="false"&&K!=="FALSE"&&((ot=>{if(Q.test(ot)&&(ot=parseFloat(ot),H<ot&&ot<j))return 1})(K)?parseFloat(K):J.test(K)?new Date(K):K===""?null:K):K)(gt=k.header?st>=O.length?"__parsed_extra":O[st]:gt,Y=k.transform?k.transform(Y,gt):Y);gt==="__parsed_extra"?(rt[gt]=rt[gt]||[],rt[gt].push(Y)):rt[gt]=Y}return k.header&&(st>O.length?I("FieldMismatch","TooManyFields","Too many fields: expected "+O.length+" fields but parsed "+st,C+et):st<O.length&&I("FieldMismatch","TooFewFields","Too few fields: expected "+O.length+" fields but parsed "+st,C+et)),rt}var W;L&&(k.header||k.dynamicTyping||k.transform)&&(W=1,!L.data.length||Array.isArray(L.data[0])?(L.data=L.data.map(F),W=L.data.length):L.data=F(L.data,0),k.header&&L.meta&&(L.meta.fields=O),C+=W)}function D(){return k.header&&O.length===0}function I(N,F,W,X){N={type:N,code:F,message:W},X!==void 0&&(N.row=X),L.errors.push(N)}M(k.step)&&(B=k.step,k.step=function(N){L=N,D()?R():(R(),L.data.length!==0&&($+=N.data.length,k.preview&&$>k.preview?E.abort():(L.data=L.data[0],B(L,U))))}),this.parse=function(N,F,W){var X=k.quoteChar||'"',X=(k.newline||(k.newline=this.guessLineEndings(N,X)),P=!1,k.delimiter?M(k.delimiter)&&(k.delimiter=k.delimiter(N),L.meta.delimiter=k.delimiter):((X=((et,rt,st,gt,Y)=>{var tt,K,ot,wt;Y=Y||[",","	","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var ut=0;ut<Y.length;ut++){for(var se,le=Y[ut],me=0,un=0,oe=0,Te=(ot=void 0,new _({comments:gt,delimiter:le,newline:rt,preview:10}).parse(et)),Mn=0;Mn<Te.data.length;Mn++)st&&V(Te.data[Mn])?oe++:(se=Te.data[Mn].length,un+=se,ot===void 0?ot=se:0<se&&(me+=Math.abs(se-ot),ot=se));0<Te.data.length&&(un/=Te.data.length-oe),(K===void 0||me<=K)&&(wt===void 0||wt<un)&&1.99<un&&(K=me,tt=le,wt=un)}return{successful:!!(k.delimiter=tt),bestDelimiter:tt}})(N,k.newline,k.skipEmptyLines,k.comments,k.delimitersToGuess)).successful?k.delimiter=X.bestDelimiter:(P=!0,k.delimiter=l.DefaultDelimiter),L.meta.delimiter=k.delimiter),m(k));return k.preview&&k.header&&X.preview++,S=N,E=new _(X),L=E.parse(S,F,W),R(),T?{meta:{paused:!0}}:L||{meta:{paused:!1}}},this.paused=function(){return T},this.pause=function(){T=!0,E.abort(),S=M(k.chunk)?"":S.substring(E.getCharIndex())},this.resume=function(){U.streamer._halted?(T=!1,U.streamer.parseChunk(S,!0)):setTimeout(U.resume,3)},this.aborted=function(){return A},this.abort=function(){A=!0,E.abort(),L.meta.aborted=!0,M(k.complete)&&k.complete(L),S=""},this.guessLineEndings=function(et,X){et=et.substring(0,1048576);var X=new RegExp(b(X)+"([^]*?)"+b(X),"gm"),W=(et=et.replace(X,"")).split("\r"),X=et.split(`
`),et=1<X.length&&X[0].length<W[0].length;if(W.length===1||et)return`
`;for(var rt=0,st=0;st<W.length;st++)W[st][0]===`
`&&rt++;return rt>=W.length/2?`\r
`:"\r"}}function b(k){return k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _(k){var S=(k=k||{}).delimiter,E=k.newline,P=k.comments,B=k.step,j=k.preview,H=k.fastMode,Q=null,J=!1,U=k.quoteChar==null?'"':k.quoteChar,$=U;if(k.escapeChar!==void 0&&($=k.escapeChar),(typeof S!="string"||-1<l.BAD_DELIMITERS.indexOf(S))&&(S=","),P===S)throw new Error("Comment character same as delimiter");P===!0?P="#":(typeof P!="string"||-1<l.BAD_DELIMITERS.indexOf(P))&&(P=!1),E!==`
`&&E!=="\r"&&E!==`\r
`&&(E=`
`);var C=0,T=!1;this.parse=function(A,O,L){if(typeof A!="string")throw new Error("Input must be a string");var V=A.length,R=S.length,D=E.length,I=P.length,N=M(B),F=[],W=[],X=[],et=C=0;if(!A)return me();if(H||H!==!1&&A.indexOf(U)===-1){for(var rt=A.split(E),st=0;st<rt.length;st++){if(X=rt[st],C+=X.length,st!==rt.length-1)C+=E.length;else if(L)return me();if(!P||X.substring(0,I)!==P){if(N){if(F=[],wt(X.split(S)),un(),T)return me()}else wt(X.split(S));if(j&&j<=st)return F=F.slice(0,j),me(!0)}}return me()}for(var gt=A.indexOf(S,C),Y=A.indexOf(E,C),tt=new RegExp(b($)+b(U),"g"),K=A.indexOf(U,C);;)if(A[C]===U)for(K=C,C++;;){if((K=A.indexOf(U,K+1))===-1)return L||W.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:F.length,index:C}),se();if(K===V-1)return se(A.substring(C,K).replace(tt,U));if(U===$&&A[K+1]===$)K++;else if(U===$||K===0||A[K-1]!==$){gt!==-1&&gt<K+1&&(gt=A.indexOf(S,K+1));var ot=ut((Y=Y!==-1&&Y<K+1?A.indexOf(E,K+1):Y)===-1?gt:Math.min(gt,Y));if(A.substr(K+1+ot,R)===S){X.push(A.substring(C,K).replace(tt,U)),A[C=K+1+ot+R]!==U&&(K=A.indexOf(U,C)),gt=A.indexOf(S,C),Y=A.indexOf(E,C);break}if(ot=ut(Y),A.substring(K+1+ot,K+1+ot+D)===E){if(X.push(A.substring(C,K).replace(tt,U)),le(K+1+ot+D),gt=A.indexOf(S,C),K=A.indexOf(U,C),N&&(un(),T))return me();if(j&&F.length>=j)return me(!0);break}W.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:F.length,index:C}),K++}}else if(P&&X.length===0&&A.substring(C,C+I)===P){if(Y===-1)return me();C=Y+D,Y=A.indexOf(E,C),gt=A.indexOf(S,C)}else if(gt!==-1&&(gt<Y||Y===-1))X.push(A.substring(C,gt)),C=gt+R,gt=A.indexOf(S,C);else{if(Y===-1)break;if(X.push(A.substring(C,Y)),le(Y+D),N&&(un(),T))return me();if(j&&F.length>=j)return me(!0)}return se();function wt(oe){F.push(oe),et=C}function ut(oe){var Te=0;return Te=oe!==-1&&(oe=A.substring(K+1,oe))&&oe.trim()===""?oe.length:Te}function se(oe){return L||(oe===void 0&&(oe=A.substring(C)),X.push(oe),C=V,wt(X),N&&un()),me()}function le(oe){C=oe,wt(X),X=[],Y=A.indexOf(E,C)}function me(oe){if(k.header&&!O&&F.length&&!J){var Te=F[0],Mn=Object.create(null),hc=new Set(Te);let xh=!1;for(let gr=0;gr<Te.length;gr++){let hn=Te[gr];if(Mn[hn=M(k.transformHeader)?k.transformHeader(hn,gr):hn]){let Qr,kh=Mn[hn];for(;Qr=hn+"_"+kh,kh++,hc.has(Qr););hc.add(Qr),Te[gr]=Qr,Mn[hn]++,xh=!0,(Q=Q===null?{}:Q)[Qr]=hn}else Mn[hn]=1,Te[gr]=hn;hc.add(hn)}xh&&console.warn("Duplicate headers found and renamed."),J=!0}return{data:F,errors:W,meta:{delimiter:S,linebreak:E,aborted:T,truncated:!!oe,cursor:et+(O||0),renamedHeaders:Q}}}function un(){B(me()),F=[],W=[]}},this.abort=function(){T=!0},this.getCharIndex=function(){return C}}function y(k){var S=k.data,E=a[S.workerId],P=!1;if(S.error)E.userError(S.error,S.file);else if(S.results&&S.results.data){var B={abort:function(){P=!0,g(S.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:p,resume:p};if(M(E.userStep)){for(var j=0;j<S.results.data.length&&(E.userStep({data:S.results.data[j],errors:S.results.errors,meta:S.results.meta},B),!P);j++);delete S.results}else M(E.userChunk)&&(E.userChunk(S.results,B,S.file),delete S.results)}S.finished&&!P&&g(S.workerId,S.results)}function g(k,S){var E=a[k];M(E.userComplete)&&E.userComplete(S),E.terminate(),delete a[k]}function p(){throw new Error("Not implemented.")}function m(k){if(typeof k!="object"||k===null)return k;var S,E=Array.isArray(k)?[]:{};for(S in k)E[S]=m(k[S]);return E}function x(k,S){return function(){k.apply(S,arguments)}}function M(k){return typeof k=="function"}return l.parse=function(k,S){var E=(S=S||{}).dynamicTyping||!1;if(M(E)&&(S.dynamicTypingFunction=E,E={}),S.dynamicTyping=E,S.transform=!!M(S.transform)&&S.transform,!S.worker||!l.WORKERS_SUPPORTED)return E=null,l.NODE_STREAM_INPUT,typeof k=="string"?(k=(P=>P.charCodeAt(0)!==65279?P:P.slice(1))(k),E=new(S.download?u:f)(S)):k.readable===!0&&M(k.read)&&M(k.on)?E=new v(S):(i.File&&k instanceof File||k instanceof Object)&&(E=new d(S)),E.stream(k);(E=(()=>{var P;return!!l.WORKERS_SUPPORTED&&(P=(()=>{var B=i.URL||i.webkitURL||null,j=n.toString();return l.BLOB_URL||(l.BLOB_URL=B.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",j,")();"],{type:"text/javascript"})))})(),(P=new i.Worker(P)).onmessage=y,P.id=c++,a[P.id]=P)})()).userStep=S.step,E.userChunk=S.chunk,E.userComplete=S.complete,E.userError=S.error,S.step=M(S.step),S.chunk=M(S.chunk),S.complete=M(S.complete),S.error=M(S.error),delete S.worker,E.postMessage({input:k,config:S,workerId:E.id})},l.unparse=function(k,S){var E=!1,P=!0,B=",",j=`\r
`,H='"',Q=H+H,J=!1,U=null,$=!1,C=((()=>{if(typeof S=="object"){if(typeof S.delimiter!="string"||l.BAD_DELIMITERS.filter(function(O){return S.delimiter.indexOf(O)!==-1}).length||(B=S.delimiter),typeof S.quotes!="boolean"&&typeof S.quotes!="function"&&!Array.isArray(S.quotes)||(E=S.quotes),typeof S.skipEmptyLines!="boolean"&&typeof S.skipEmptyLines!="string"||(J=S.skipEmptyLines),typeof S.newline=="string"&&(j=S.newline),typeof S.quoteChar=="string"&&(H=S.quoteChar),typeof S.header=="boolean"&&(P=S.header),Array.isArray(S.columns)){if(S.columns.length===0)throw new Error("Option columns is empty");U=S.columns}S.escapeChar!==void 0&&(Q=S.escapeChar+H),S.escapeFormulae instanceof RegExp?$=S.escapeFormulae:typeof S.escapeFormulae=="boolean"&&S.escapeFormulae&&($=/^[=+\-@\t\r].*$/)}})(),new RegExp(b(H),"g"));if(typeof k=="string"&&(k=JSON.parse(k)),Array.isArray(k)){if(!k.length||Array.isArray(k[0]))return T(null,k,J);if(typeof k[0]=="object")return T(U||Object.keys(k[0]),k,J)}else if(typeof k=="object")return typeof k.data=="string"&&(k.data=JSON.parse(k.data)),Array.isArray(k.data)&&(k.fields||(k.fields=k.meta&&k.meta.fields||U),k.fields||(k.fields=Array.isArray(k.data[0])?k.fields:typeof k.data[0]=="object"?Object.keys(k.data[0]):[]),Array.isArray(k.data[0])||typeof k.data[0]=="object"||(k.data=[k.data])),T(k.fields||[],k.data||[],J);throw new Error("Unable to serialize unrecognized input");function T(O,L,V){var R="",D=(typeof O=="string"&&(O=JSON.parse(O)),typeof L=="string"&&(L=JSON.parse(L)),Array.isArray(O)&&0<O.length),I=!Array.isArray(L[0]);if(D&&P){for(var N=0;N<O.length;N++)0<N&&(R+=B),R+=A(O[N],N);0<L.length&&(R+=j)}for(var F=0;F<L.length;F++){var W=(D?O:L[F]).length,X=!1,et=D?Object.keys(L[F]).length===0:L[F].length===0;if(V&&!D&&(X=V==="greedy"?L[F].join("").trim()==="":L[F].length===1&&L[F][0].length===0),V==="greedy"&&D){for(var rt=[],st=0;st<W;st++){var gt=I?O[st]:st;rt.push(L[F][gt])}X=rt.join("").trim()===""}if(!X){for(var Y=0;Y<W;Y++){0<Y&&!et&&(R+=B);var tt=D&&I?O[Y]:Y;R+=A(L[F][tt],Y)}F<L.length-1&&(!V||0<W&&!et)&&(R+=j)}}return R}function A(O,L){var V,R;return O==null?"":O.constructor===Date?JSON.stringify(O).slice(1,25):(R=!1,$&&typeof O=="string"&&$.test(O)&&(O="'"+O,R=!0),V=O.toString().replace(C,Q),(R=R||E===!0||typeof E=="function"&&E(O,L)||Array.isArray(E)&&E[L]||((D,I)=>{for(var N=0;N<I.length;N++)if(-1<D.indexOf(I[N]))return!0;return!1})(V,l.BAD_DELIMITERS)||-1<V.indexOf(B)||V.charAt(0)===" "||V.charAt(V.length-1)===" ")?H+V+H:V)}},l.RECORD_SEP="",l.UNIT_SEP="",l.BYTE_ORDER_MARK="\uFEFF",l.BAD_DELIMITERS=["\r",`
`,'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!s&&!!i.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=_,l.ParserHandle=w,l.NetworkStreamer=u,l.FileStreamer=d,l.StringStreamer=f,l.ReadableStreamStreamer=v,i.jQuery&&((r=i.jQuery).fn.parse=function(k){var S=k.config||{},E=[];return this.each(function(j){if(!(r(this).prop("tagName").toUpperCase()==="INPUT"&&r(this).attr("type").toLowerCase()==="file"&&i.FileReader)||!this.files||this.files.length===0)return!0;for(var H=0;H<this.files.length;H++)E.push({file:this.files[H],inputElem:this,instanceConfig:r.extend({},S)})}),P(),this;function P(){if(E.length===0)M(k.complete)&&k.complete();else{var j,H,Q,J,U=E[0];if(M(k.before)){var $=k.before(U.file,U.inputElem);if(typeof $=="object"){if($.action==="abort")return j="AbortError",H=U.file,Q=U.inputElem,J=$.reason,void(M(k.error)&&k.error({name:j},H,Q,J));if($.action==="skip")return void B();typeof $.config=="object"&&(U.instanceConfig=r.extend(U.instanceConfig,$.config))}else if($==="skip")return void B()}var C=U.instanceConfig.complete;U.instanceConfig.complete=function(T){M(C)&&C(T,U.file,U.inputElem),B()},l.parse(U.file,U.instanceConfig)}}function B(){E.splice(0,1),P()}}),o&&(i.onmessage=function(k){k=k.data,l.WORKER_ID===void 0&&k&&(l.WORKER_ID=k.workerId),typeof k.input=="string"?i.postMessage({workerId:l.WORKER_ID,results:l.parse(k.input,k.config),finished:!0}):(i.File&&k.input instanceof File||k.input instanceof Object)&&(k=l.parse(k.input,k.config))&&i.postMessage({workerId:l.WORKER_ID,results:k,finished:!0})}),(u.prototype=Object.create(h.prototype)).constructor=u,(d.prototype=Object.create(h.prototype)).constructor=d,(f.prototype=Object.create(f.prototype)).constructor=f,(v.prototype=Object.create(h.prototype)).constructor=v,l})})(ta)),ta.exports}var CD=SD();const $D=ja(CD),MD=e=>{const t=e.map(i=>i.toLocaleLowerCase()),n=i=>{const r=t.findIndex(s=>i.some(o=>s.includes(o)));return r!==-1?e[r]:void 0};return{date:n(["date","time"]),amount:n(["amount","value","cost","price","debit"]),credit:n(["credit","payment"]),description:n(["description","merchant","payee","name","memo"]),account:n(["account","source","card"])}},AD=e=>new Promise((t,n)=>{$D.parse(e,{header:!0,skipEmptyLines:!0,complete:({data:i,meta:r,errors:s})=>{const o=MD(r.fields||[]);t({data:i,meta:r,errors:s,suggestedMapping:o})},error:i=>{n(i)}})});var ED=Object.defineProperty,TD=Object.getOwnPropertyDescriptor,N_=e=>{throw TypeError(e)},pr=(e,t,n,i)=>{for(var r=i>1?void 0:i?TD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&ED(t,n,r),r},DD=(e,t,n)=>t.has(e)||N_("Cannot "+n),OD=(e,t,n)=>t.has(e)?N_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ui=(e,t,n)=>(DD(e,t,"access private method"),n),_n,z_,j_,F_,q_,W_,H_,V_,U_;const PD=[{key:"date",label:"Date"},{key:"amount",label:"Debit"},{key:"credit",label:"Credit"},{key:"description",label:"Description"},{key:"account",label:"Account"}];let Kn=class extends Xr(At){constructor(){super(...arguments),OD(this,_n),this._step="upload",this._mapping={},this._accounts=[],this._accountName="",this._importMode="append"}async loadFile(e){await this.withBusy(async()=>{this._accounts=await Br.all(),this._result=await AD(e),this._mapping={...this._result.suggestedMapping},this._step="mapping"})}render(){return z`
      ${this._step==="upload"?ui(this,_n,V_).call(this):ui(this,_n,U_).call(this)}
    `}};_n=new WeakSet;z_=async function(e){const t=e.target;!t.files||t.files.length===0||await this.loadFile(t.files[0])};j_=function(e){this._accountName=e.target.value};F_=function(e){this._importMode=e.target.value};q_=function(e,t){const i=t.target.value||void 0;this._mapping={...this._mapping,[e]:i}};W_=async function(){if(this._mapping.account)return;const e=this._accountName.trim();if(!e)return;const t=this._accounts.find(n=>n.name.toLowerCase()===e.toLowerCase());return t?t._id:Br.create({name:e})};H_=async function(){this._result&&await this.withBusy(async()=>{const e=!this._mapping.account,t=await ui(this,_n,W_).call(this);if(e&&t===void 0)return;const n=await bD(this._result.data,this._mapping,{accountId:t,importMode:this._importMode});this.dispatchEvent(new CustomEvent("imported",{detail:{count:n}})),this._step="upload",this._result=void 0,this._mapping={},this._accountName="",this._importMode="append"})};V_=function(){return z`
      <label for="file-upload">Select a CSV file:</label>
      <input type="file" id="file-upload" accept=".csv" @change=${ui(this,_n,z_)} />
    `};U_=function(){if(!this._result)return pt;const e=this._result.meta.fields??[],t=this._result.data.slice(0,5);return z`
      <h4>Column Mapping</h4>
      <div class="mapping-form">
        ${PD.map(({key:n,label:i})=>z`
          <label>${i}:</label>
          <select @change=${r=>ui(this,_n,q_).call(this,n,r)}>
            <option value="">-- Unmapped --</option>
            ${e.map(r=>z`
              <option value=${r} ?selected=${this._mapping[n]===r}>${r}</option>
            `)}
          </select>
        `)}
      </div>

      ${this._mapping.account?pt:z`
        <h4>Account</h4>
        <div class="mapping-form">
          <label>Account:</label>
          <input
            type="text"
            list="account-options"
            .value=${this._accountName}
            @input=${ui(this,_n,j_)}
            placeholder="Type or select an account"
          />
          <datalist id="account-options">
            ${this._accounts.map(n=>z`<option value=${n.name}></option>`)}
          </datalist>
        </div>
      `}

      <div class="mapping-form">
        <label>Mode:</label>
        <select @change=${ui(this,_n,F_)}>
          <option value="append" ?selected=${this._importMode==="append"}>Append to existing</option>
          <option value="replace" ?selected=${this._importMode==="replace"}>Replace existing transactions</option>
        </select>
      </div>

      <button @click=${ui(this,_n,H_)}>Import</button>

      <h4>Preview</h4>
      <div class="preview">
        <table>
          <thead>
            <tr>${e.map(n=>z`<th>${n}</th>`)}</tr>
          </thead>
          <tbody>
            ${t.map(n=>z`
              <tr>${e.map(i=>z`<td>${n[i]}</td>`)}</tr>
            `)}
          </tbody>
        </table>
      </div>
    `};Kn.styles=[Yr,Yn,Et`
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
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
    `];pr([q()],Kn.prototype,"_step",2);pr([q()],Kn.prototype,"_result",2);pr([q()],Kn.prototype,"_mapping",2);pr([q()],Kn.prototype,"_accounts",2);pr([q()],Kn.prototype,"_accountName",2);pr([q()],Kn.prototype,"_importMode",2);Kn=pr([zt("transaction-importer")],Kn);var ID=Object.defineProperty,RD=Object.getOwnPropertyDescriptor,K_=e=>{throw TypeError(e)},Ee=(e,t,n,i)=>{for(var r=i>1?void 0:i?RD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&ID(t,n,r),r},Y_=(e,t,n)=>t.has(e)||K_("Cannot "+n),up=(e,t,n)=>(Y_(e,t,"read from private field"),n?n.call(e):t.get(e)),hp=(e,t,n)=>t.has(e)?K_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),lt=(e,t,n)=>(Y_(e,t,"access private method"),n),ea,at,X_,ho,G_,Ks,Q_,J_,Z_,Cr,$r,uu,ty,ey,ny,iy,ry,sy,uc,oy,ay,yh,cy,hu,du,ly,uy;let ge=class extends Xr(At){constructor(){super(...arguments),hp(this,at),this._transactions=null,this._tags=[],this._merchants=new Map,this._merchantList=[],this._currentPage=1,this._pageSize=50,this._filter="",this._sortCol="date",this._sortDir="desc",this._selectedIds=new Set,this._excludeTagIds=new Set,this._noMerchant=!1,this._bulkMerchantName="",this._showImporter=!1,hp(this,ea,e=>{const t=e.detail.file;this._showImporter=!0,this.updateComplete.then(()=>{const n=this.shadowRoot?.querySelector("transaction-importer");n&&n.loadFile(t)})})}connectedCallback(){super.connectedCallback(),lt(this,at,ho).call(this),document.addEventListener("budgee-import-csv",up(this,ea))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-import-csv",up(this,ea))}render(){if(this._transactions===null)return z`
        <p>Loading…</p>
      `;if(this._transactions.length===0)return z`
        <p>No transactions found.</p>
      `;const e=this._transactions.filter(o=>lt(this,at,Z_).call(this,o)),t=lt(this,at,ey).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize),r=i.map(o=>o._id),s=r.length>0&&r.every(o=>this._selectedIds.has(o));return z`
      <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>
        Import CSV
      </button>
      ${this._showImporter?z`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${lt(this,at,X_)}></transaction-importer></budgee-modal>`:pt}
      ${lt(this,at,ly).call(this)}
      ${lt(this,at,uy).call(this)}
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${50}
        storageKey="transactions"
        ?filterable=${!0}
        @page-change=${lt(this,at,Q_)}
        @filter-change=${lt(this,at,J_)}
      >
        <table>
          <thead>
            <tr>
              <th class="col-checkbox">
                <input
                  type="checkbox"
                  .checked=${s}
                  @change=${()=>lt(this,at,sy).call(this,i)}
                />
              </th>
              <th class="sortable col-date" @click=${()=>lt(this,at,Cr).call(this,"date")}>
                Date${lt(this,at,$r).call(this,"date")}
              </th>
              <th class="sortable" @click=${()=>lt(this,at,Cr).call(this,"merchant")}>
                Merchant${lt(this,at,$r).call(this,"merchant")}
              </th>
              <th class="sortable" @click=${()=>lt(this,at,Cr).call(this,"description")}>
                Description${lt(this,at,$r).call(this,"description")}
              </th>
              <th class="sortable col-amount" @click=${()=>lt(this,at,Cr).call(this,"amount")}>
                Amount${lt(this,at,$r).call(this,"amount")}
              </th>
              <th class="sortable col-tags" @click=${()=>lt(this,at,Cr).call(this,"tags")}>
                Tags${lt(this,at,$r).call(this,"tags")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(o=>z`
              <tr @click=${()=>lt(this,at,iy).call(this,o._id)}>
                <td class="col-checkbox" @click=${a=>a.stopPropagation()}>
                  <input
                    type="checkbox"
                    .checked=${this._selectedIds.has(o._id)}
                    @change=${()=>lt(this,at,ry).call(this,o._id)}
                  />
                </td>
                <td class="col-date">${lt(this,at,ty).call(this,o.date)}</td>
                <td>${o.merchantId&&this._merchants.has(o.merchantId)?z`<a class="merchant-link" @click=${a=>{a.stopPropagation(),lt(this,at,ny).call(this,o.merchantId)}}>${this._merchants.get(o.merchantId)}</a>`:""}</td>
                <td>${o.originalDescription}</td>
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
    `}};ea=new WeakMap;at=new WeakSet;X_=async function(){await this.withBusy(async()=>{this._showImporter=!1,await lt(this,at,ho).call(this)})};ho=async function(){this._transactions=await xn.all(),this._tags=await Je.all();const e=await Hn.all();this._merchants=new Map(e.map(t=>[t._id,t.name])),this._merchantList=e};G_=function(e){return this._tags.find(t=>t._id===e)};Ks=function(e){return lt(this,at,G_).call(this,e)?.name??`#${e}`};Q_=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};J_=function(e){this._filter=e.detail.filter,this._currentPage=1};Z_=function(e){if(this._noMerchant&&e.merchantId||e.tagIds.some(n=>this._excludeTagIds.has(n)))return!1;if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.originalDescription.toLowerCase().includes(t)||e.tagIds.some(n=>lt(this,at,Ks).call(this,n).toLowerCase().includes(t))||e.merchantId&&this._merchants.get(e.merchantId)?.toLowerCase().includes(t)||e.date.includes(t)||e.amount.toFixed(2).includes(t))};Cr=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};$r=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};uu=function(e){return e?this._merchants.get(e)??"":""};ty=function(e){const[t,n,i]=e.split("-");return new Date(Number(t),Number(n)-1,Number(i)).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})};ey=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="date")s=i.date.localeCompare(r.date);else if(t==="merchant")s=lt(this,at,uu).call(this,i.merchantId).localeCompare(lt(this,at,uu).call(this,r.merchantId));else if(t==="description")s=i.originalDescription.localeCompare(r.originalDescription);else if(t==="amount")s=i.amount-r.amount;else if(t==="tags"){const o=i.tagIds.map(c=>lt(this,at,Ks).call(this,c)).join(","),a=r.tagIds.map(c=>lt(this,at,Ks).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};ny=function(e){window.history.pushState({},"",`/merchants/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};iy=function(e){window.history.pushState({},"",`/transactions/${e}`),window.dispatchEvent(new PopStateEvent("popstate"))};ry=function(e){const t=new Set(this._selectedIds);t.has(e)?t.delete(e):t.add(e),this._selectedIds=t};sy=function(e){const t=e.map(i=>i._id);if(t.every(i=>this._selectedIds.has(i))){const i=new Set(this._selectedIds);for(const r of t)i.delete(r);this._selectedIds=i}else this._selectedIds=new Set([...this._selectedIds,...t])};uc=function(){this._selectedIds=new Set,this._bulkMerchantName=""};oy=async function(e){const n=e.detail.tag._id;await lt(this,at,yh).call(this,n)};ay=async function(e){const t=e.detail.name,n=await Je.create(t);await lt(this,at,yh).call(this,n)};yh=async function(e){this._transactions&&await this.withBusy(async()=>{const t=this._transactions.filter(n=>this._selectedIds.has(n._id));for(const n of t)n.tagIds.includes(e)||await xn.update(n._id,{tagIds:[...n.tagIds,e]});lt(this,at,uc).call(this),await lt(this,at,ho).call(this)})};cy=async function(){const e=this._bulkMerchantName.trim();!e||!this._transactions||await this.withBusy(async()=>{let t=this._merchantList.find(n=>n.name.toLowerCase()===e.toLowerCase());t||(t={_id:await Hn.create(e),name:e});for(const n of this._selectedIds)await xn.update(n,{merchantId:t._id});lt(this,at,uc).call(this),await lt(this,at,ho).call(this)})};hu=function(e){const t=new Set(this._excludeTagIds);t.has(e)?t.delete(e):t.add(e),this._excludeTagIds=t,this._currentPage=1};du=function(){this._noMerchant=!this._noMerchant,this._currentPage=1};ly=function(){const e=this._excludeTagIds.size>0||this._noMerchant;return z`
      <div class="filter-bar">
        <div class="filter-group">
          <label>Exclude tag:</label>
          <select @change=${t=>{const n=t.target.value;n&&lt(this,at,hu).call(this,n),t.target.value=""}}>
            <option value="">Select…</option>
            ${this._tags.filter(t=>!this._excludeTagIds.has(t._id)).map(t=>z`<option value=${t._id}>${t.name}</option>`)}
          </select>
        </div>
        <div class="filter-group">
          <label>
            <input type="checkbox" .checked=${this._noMerchant} @change=${lt(this,at,du)} />
            No merchant
          </label>
        </div>
        ${e?z`
            <div class="active-filters">
              ${[...this._excludeTagIds].map(t=>z`
                  <span class="filter-chip">
                    Not: ${lt(this,at,Ks).call(this,t)}
                    <button class="chip-remove" @click=${()=>lt(this,at,hu).call(this,t)}>×</button>
                  </span>
                `)}
              ${this._noMerchant?z`<span class="filter-chip">
                    No merchant
                    <button class="chip-remove" @click=${lt(this,at,du)}>×</button>
                  </span>`:pt}
            </div>
          `:pt}
      </div>
    `};uy=function(){return this._selectedIds.size===0?pt:z`
      <div class="bulk-bar">
        <span class="selected-count">${this._selectedIds.size} selected</span>
        <div class="bulk-action">
          <label>Tag:</label>
          <tag-autocomplete
            .tags=${this._tags}
            .selectedTagIds=${[]}
            .excludeIds=${[]}
            @tag-selected=${lt(this,at,oy)}
            @tag-created=${lt(this,at,ay)}
          ></tag-autocomplete>
        </div>
        <div class="bulk-action">
          <label>Merchant:</label>
          <merchant-autocomplete
            .merchants=${this._merchantList}
            .value=${this._bulkMerchantName}
            @merchant-changed=${e=>{this._bulkMerchantName=e.detail.name}}
          ></merchant-autocomplete>
          <button @click=${lt(this,at,cy)} ?disabled=${!this._bulkMerchantName.trim()}>
            Set
          </button>
        </div>
        <button @click=${lt(this,at,uc)}>Clear selection</button>
      </div>
    `};ge.styles=[Yr,Yn,Et`
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
      .col-tags tag-pills {
        display: block;
        width: 100%;
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
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
      }
      .import-toggle:hover {
        background-color: var(--budgee-primary-hover);
      }
    `];Ee([q()],ge.prototype,"_transactions",2);Ee([q()],ge.prototype,"_tags",2);Ee([q()],ge.prototype,"_merchants",2);Ee([q()],ge.prototype,"_merchantList",2);Ee([q()],ge.prototype,"_currentPage",2);Ee([q()],ge.prototype,"_pageSize",2);Ee([q()],ge.prototype,"_filter",2);Ee([q()],ge.prototype,"_sortCol",2);Ee([q()],ge.prototype,"_sortDir",2);Ee([q()],ge.prototype,"_selectedIds",2);Ee([q()],ge.prototype,"_excludeTagIds",2);Ee([q()],ge.prototype,"_noMerchant",2);Ee([q()],ge.prototype,"_bulkMerchantName",2);Ee([q()],ge.prototype,"_showImporter",2);ge=Ee([zt("transaction-list")],ge);var LD=Object.defineProperty,BD=Object.getOwnPropertyDescriptor,hy=e=>{throw TypeError(e)},dy=(e,t,n,i)=>{for(var r=i>1?void 0:i?BD(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&LD(t,n,r),r},bh=(e,t,n)=>t.has(e)||hy("Cannot "+n),Ue=(e,t,n)=>(bh(e,t,"read from private field"),n?n.call(e):t.get(e)),Ii=(e,t,n)=>t.has(e)?hy("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),wh=(e,t,n,i)=>(bh(e,t,"write to private field"),t.set(e,n),n),dp=(e,t,n)=>(bh(e,t,"access private method"),n),fp=(e,t,n,i)=>({set _(r){wh(e,t,r)},get _(){return Ue(e,t,i)}}),Mr,Ys,na,fu,ia,ra,sa,oa;let Ba=class extends At{constructor(){super(...arguments),Ii(this,na),this._dragOver=!1,Ii(this,Mr,0),Ii(this,Ys),this._router=new vy(this,[{path:"/",render:()=>z`
          <budgee-dashboard></budgee-dashboard>
        `},{path:"/transactions",render:()=>z`
          <transaction-list></transaction-list>
        `},{path:"/transactions/:id",render:({id:e})=>z`<transaction-detail .transactionId=${e}></transaction-detail>`,enter:async()=>(await Hi(()=>import("./transactionDetail-BNnBifrM.js"),[]),!0)},{path:"/accounts",render:()=>z`
          <account-list></account-list>
        `},{path:"/accounts/:id",render:({id:e})=>z`<account-detail .accountId=${e}></account-detail>`,enter:async()=>(await Hi(()=>import("./accountDetail-IOoysPId.js"),[]),!0)},{path:"/merchants",render:()=>z`
          <merchant-list></merchant-list>
        `},{path:"/merchants/:id",render:({id:e})=>z`<merchant-detail .merchantId=${e}></merchant-detail>`,enter:async()=>(await Hi(()=>import("./merchantDetail-B5j5TYMg.js"),[]),!0)},{path:"/tags",render:()=>z`
          <tag-manager></tag-manager>
        `},{path:"/rules",render:()=>z`
          <rule-manager></rule-manager>
        `},{path:"/import",render:()=>z`
          <database-manager></database-manager>
        `},{path:"/settings",render:()=>z`
          <budgee-settings @budgee-sync-settings-changed=${()=>dp(this,na,fu).call(this)}></budgee-settings>
        `}]),Ii(this,ia,e=>{e.preventDefault()}),Ii(this,ra,e=>{e.preventDefault(),fp(this,Mr)._++,this._dragOver=!0}),Ii(this,sa,e=>{fp(this,Mr)._--,Ue(this,Mr)===0&&(this._dragOver=!1)}),Ii(this,oa,async e=>{e.preventDefault(),wh(this,Mr,0),this._dragOver=!1;const t=e.dataTransfer?.files[0];if(t){if(t.name.endsWith(".csv"))window.history.pushState({},"","/transactions"),window.dispatchEvent(new PopStateEvent("popstate")),await this.updateComplete,document.dispatchEvent(new CustomEvent("budgee-import-csv",{detail:{file:t}}));else if(t.name.endsWith(".json")){if(!confirm("This will replace all existing data. Are you sure?"))return;await Dg(t),window.location.reload()}}})}connectedCallback(){super.connectedCallback(),this.addEventListener("dragover",Ue(this,ia)),this.addEventListener("dragenter",Ue(this,ra)),this.addEventListener("dragleave",Ue(this,sa)),this.addEventListener("drop",Ue(this,oa)),Ng(G).catch(console.error),dp(this,na,fu).call(this)}disconnectedCallback(){var e;super.disconnectedCallback(),this.removeEventListener("dragover",Ue(this,ia)),this.removeEventListener("dragenter",Ue(this,ra)),this.removeEventListener("dragleave",Ue(this,sa)),this.removeEventListener("drop",Ue(this,oa)),(e=Ue(this,Ys))==null||e.call(this)}navLink(e,t,n){const i=window.location.pathname,r=e==="/"?i==="/":i.startsWith(e);return z`<a href=${e} class=${qy({active:r})}>${Ae(n)} ${t}</a>`}render(){return z`
      <nav>
        <div class="app-name">${Ae(lk)} Budgee</div>
        ${this.navLink("/","Dashboard",sk)}
        ${this.navLink("/transactions","Transactions",zg)}
        ${this.navLink("/accounts","Accounts",ak)}
        ${this.navLink("/merchants","Merchants",jg)}
        ${this.navLink("/tags","Tags",hk)}
        ${this.navLink("/rules","Rules",ck)}
        ${this.navLink("/import","Database",ok)}
        ${this.navLink("/settings","Sync",uk)}
      </nav>
      <div class="container">
        ${this._router.outlet()}
      </div>
      ${this._dragOver?z`
              <div class="drop-overlay"><span>Drop file to import</span></div>
            `:pt}
    `}};Mr=new WeakMap;Ys=new WeakMap;na=new WeakSet;fu=function(){var e;(e=Ue(this,Ys))==null||e.call(this);let t;try{t=localStorage.getItem("budgee-sync-url")}catch{return}t&&wh(this,Ys,rk(t))};ia=new WeakMap;ra=new WeakMap;sa=new WeakMap;oa=new WeakMap;Ba.styles=Et`
    :host {
      display: flex;
      min-height: 100vh;
      color: var(--budgee-text);
      font-family: sans-serif;
    }

    svg.lucide {
      display: inline-block;
      width: 1rem;
      height: 1rem;
    }

    .app-name {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem 1rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--budgee-text);
      text-decoration: none;
      border-bottom: 1px solid var(--budgee-border);
      margin-bottom: 0.5rem;
    }

    .app-name svg.lucide {
      width: 1.5rem;
      height: 1.5rem;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: var(--budgee-surface);
      border-right: 1px solid var(--budgee-border);
      padding: 1rem 0;
      width: 180px;
      flex-shrink: 0;
    }

    nav a,
    nav button {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: var(--budgee-text-muted);
      font-size: 0.9rem;
      border-left: 3px solid transparent;
      background: none;
      border-top: none;
      border-right: none;
      border-bottom: none;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      transition:
        color 0.15s,
        border-color 0.15s;
    }

    nav a:hover,
    nav button:hover {
      color: var(--budgee-primary);
    }

    nav a.active {
      color: var(--budgee-primary);
      border-left-color: var(--budgee-primary);
    }

    .container {
      flex: 1;
      min-width: 0;
      padding: 1.5rem 2rem;
    }

    @media (max-width: 768px) {
      :host {
        flex-direction: column;
      }

      nav {
        flex-direction: row;
        flex-wrap: wrap;
        width: auto;
        border-right: none;
        border-bottom: 1px solid var(--budgee-border);
        padding: 0 0.5rem;
      }

      nav a,
      nav button {
        border-left: none;
        border-bottom: 2px solid transparent;
        padding: 0.5rem 0.75rem;
      }

      nav a.active {
        border-bottom-color: var(--budgee-primary);
      }

      .container {
        padding: 1rem;
      }
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
    }

    .drop-overlay span {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }
  `;dy([q()],Ba.prototype,"_dragOver",2);Ba=dy([zt("budgee-app")],Ba);export{pt as A,Xr as B,Hn as M,xn as T,Je as a,z as b,Jn as c,qA as d,Yr as e,Et as f,zt as g,KD as h,At as i,fk as j,Br as k,WA as m,mt as n,q as r,Yn as t};
