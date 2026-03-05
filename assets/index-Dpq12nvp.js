(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const ND="modulepreload",FD=function(e){return"/"+e},X0={},Oa=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=FD(l),l in X0)return;X0[l]=!0;const u=l.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":ND,u||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),u)return new Promise((f,p)=>{d.addEventListener("load",f),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};const Q0=new WeakMap,Z0=e=>{if((n=>n.pattern!==void 0)(e))return e.pattern;let t=Q0.get(e);return t===void 0&&Q0.set(e,t=new URLPattern({pathname:e.path})),t};let zD=class{constructor(t,n,i){this.routes=[],this.o=[],this.t={},this.i=r=>{if(r.routes===this)return;const s=r.routes;this.o.push(s),s.h=this,r.stopImmediatePropagation(),r.onDisconnect=()=>{this.o?.splice(this.o.indexOf(s)>>>0,1)};const o=J0(this.t);o!==void 0&&s.goto(o)},(this.l=t).addController(this),this.routes=[...n],this.fallback=i?.fallback}link(t){if(t?.startsWith("/"))return t;if(t?.startsWith("."))throw Error("Not implemented");return t??=this.u,(this.h?.link()??"")+t}async goto(t){let n;if(this.routes.length===0&&this.fallback===void 0)n=t,this.u="",this.t={0:n};else{const i=this.p(t);if(i===void 0)throw Error("No route found for "+t);const r=Z0(i).exec({pathname:t}),s=r?.pathname.groups??{};if(n=J0(s),typeof i.enter=="function"&&await i.enter(s)===!1)return;this.v=i,this.t=s,this.u=n===void 0?t:t.substring(0,t.length-n.length)}if(n!==void 0)for(const i of this.o)i.goto(n);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(t){const n=this.routes.find((i=>Z0(i).test({pathname:t})));return n||this.fallback===void 0?n:this.fallback?{...this.fallback,path:"/*"}:void 0}hostConnected(){this.l.addEventListener(wg.eventName,this.i);const t=new wg(this);this.l.dispatchEvent(t),this._=t.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}};const J0=e=>{let t;for(const n of Object.keys(e))/\d+/.test(n)&&(t===void 0||n>t)&&(t=n);return t&&e[t]};let wg=class Gw extends Event{constructor(t){super(Gw.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}};wg.eventName="lit-routes-connected";const jD=location.origin||location.protocol+"//"+location.host;let BD=class extends zD{constructor(){super(...arguments),this.m=t=>{const n=t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey;if(t.defaultPrevented||n)return;const i=t.composedPath().find((o=>o.tagName==="A"));if(i===void 0||i.target!==""||i.hasAttribute("download")||i.getAttribute("rel")==="external")return;const r=i.href;if(r===""||r.startsWith("mailto:"))return;const s=window.location;i.origin===jD&&(t.preventDefault(),r!==s.href&&(window.history.pushState({},"",r),this.goto(i.pathname)))},this.R=t=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener("click",this.m),window.addEventListener("popstate",this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener("click",this.m),window.removeEventListener("popstate",this.R)}};const Ih=globalThis,Qm=Ih.ShadowRoot&&(Ih.ShadyCSS===void 0||Ih.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zm=Symbol(),ty=new WeakMap;let Xw=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Zm)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Qm&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=ty.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ty.set(n,t))}return t}toString(){return this.cssText}};const WD=e=>new Xw(typeof e=="string"?e:e+"",void 0,Zm),pt=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new Xw(n,e,Zm)},HD=(e,t)=>{if(Qm)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),r=Ih.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}},ey=Qm?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return WD(n)})(e):e;const{is:UD,defineProperty:YD,getOwnPropertyDescriptor:qD,getOwnPropertyNames:VD,getOwnPropertySymbols:KD,getPrototypeOf:GD}=Object,yf=globalThis,ny=yf.trustedTypes,XD=ny?ny.emptyScript:"",QD=yf.reactiveElementPolyfillSupport,El=(e,t)=>e,pd={toAttribute(e,t){switch(t){case Boolean:e=e?XD:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Jm=(e,t)=>!UD(e,t),iy={attribute:!0,type:String,converter:pd,reflect:!1,useDefault:!1,hasChanged:Jm};Symbol.metadata??=Symbol("metadata"),yf.litPropertyMetadata??=new WeakMap;let ma=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=iy){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,n);r!==void 0&&YD(this.prototype,t,r)}}static getPropertyDescriptor(t,n,i){const{get:r,set:s}=qD(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:r,set(o){const a=r?.call(this);s?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??iy}static _$Ei(){if(this.hasOwnProperty(El("elementProperties")))return;const t=GD(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(El("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(El("properties"))){const n=this.properties,i=[...VD(n),...KD(n)];for(const r of i)this.createProperty(r,n[r])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,r]of n)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const r=this._$Eu(n,i);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)n.unshift(ey(r))}else t!==void 0&&n.push(ey(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return HD(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:pd).toAttribute(n,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,n){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:pd;this._$Em=r;const a=o.fromAttribute(n,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,n,i,r=!1,s){if(t!==void 0){const o=this.constructor;if(r===!1&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??Jm)(s,n)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),s!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};ma.elementStyles=[],ma.shadowRootOptions={mode:"open"},ma[El("elementProperties")]=new Map,ma[El("finalized")]=new Map,QD?.({ReactiveElement:ma}),(yf.reactiveElementVersions??=[]).push("2.1.2");const tv=globalThis,ry=e=>e,gd=tv.trustedTypes,sy=gd?gd.createPolicy("lit-html",{createHTML:e=>e}):void 0,Qw="$lit$",hs=`lit$${Math.random().toFixed(9).slice(2)}$`,Zw="?"+hs,ZD=`<${Zw}>`,Eo=document,Kl=()=>Eo.createComment(""),Gl=e=>e===null||typeof e!="object"&&typeof e!="function",ev=Array.isArray,JD=e=>ev(e)||typeof e?.[Symbol.iterator]=="function",bp=`[ 	
\f\r]`,Rc=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oy=/-->/g,ay=/>/g,Xs=RegExp(`>|${bp}(?:([^\\s"'>=/]+)(${bp}*=${bp}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),cy=/'/g,ly=/"/g,Jw=/^(?:script|style|textarea|title)$/i,t$=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),E=t$(1),Ts=Symbol.for("lit-noChange"),nt=Symbol.for("lit-nothing"),uy=new WeakMap,po=Eo.createTreeWalker(Eo,129);function t1(e,t){if(!ev(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return sy!==void 0?sy.createHTML(t):t}const e$=(e,t)=>{const n=e.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",o=Rc;for(let a=0;a<n;a++){const c=e[a];let l,u,h=-1,d=0;for(;d<c.length&&(o.lastIndex=d,u=o.exec(c),u!==null);)d=o.lastIndex,o===Rc?u[1]==="!--"?o=oy:u[1]!==void 0?o=ay:u[2]!==void 0?(Jw.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=Xs):u[3]!==void 0&&(o=Xs):o===Xs?u[0]===">"?(o=r??Rc,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?Xs:u[3]==='"'?ly:cy):o===ly||o===cy?o=Xs:o===oy||o===ay?o=Rc:(o=Xs,r=void 0);const f=o===Xs&&e[a+1].startsWith("/>")?" ":"";s+=o===Rc?c+ZD:h>=0?(i.push(l),c.slice(0,h)+Qw+c.slice(h)+hs+f):c+hs+(h===-2?a:f)}return[t1(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let xg=class e1{constructor({strings:t,_$litType$:n},i){let r;this.parts=[];let s=0,o=0;const a=t.length-1,c=this.parts,[l,u]=e$(t,n);if(this.el=e1.createElement(l,i),po.currentNode=this.el.content,n===2||n===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=po.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(Qw)){const d=u[o++],f=r.getAttribute(h).split(hs),p=/([.?@])?(.*)/.exec(d);c.push({type:1,index:s,name:p[2],strings:f,ctor:p[1]==="."?i$:p[1]==="?"?r$:p[1]==="@"?s$:bf}),r.removeAttribute(h)}else h.startsWith(hs)&&(c.push({type:6,index:s}),r.removeAttribute(h));if(Jw.test(r.tagName)){const h=r.textContent.split(hs),d=h.length-1;if(d>0){r.textContent=gd?gd.emptyScript:"";for(let f=0;f<d;f++)r.append(h[f],Kl()),po.nextNode(),c.push({type:2,index:++s});r.append(h[d],Kl())}}}else if(r.nodeType===8)if(r.data===Zw)c.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(hs,h+1))!==-1;)c.push({type:7,index:s}),h+=hs.length-1}s++}}static createElement(t,n){const i=Eo.createElement("template");return i.innerHTML=t,i}};function Wa(e,t,n=e,i){if(t===Ts)return t;let r=i!==void 0?n._$Co?.[i]:n._$Cl;const s=Gl(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=r:n._$Cl=r),r!==void 0&&(t=Wa(e,r._$AS(e,t.values),r,i)),t}let n$=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,r=(t?.creationScope??Eo).importNode(n,!0);po.currentNode=r;let s=po.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new nv(s,s.nextSibling,this,t):c.type===1?l=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(l=new o$(s,this,t)),this._$AV.push(l),c=i[++a]}o!==c?.index&&(s=po.nextNode(),o++)}return po.currentNode=Eo,r}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}},nv=class n1{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,r){this.type=2,this._$AH=nt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Wa(this,t,n),Gl(t)?t===nt||t==null||t===""?(this._$AH!==nt&&this._$AR(),this._$AH=nt):t!==this._$AH&&t!==Ts&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):JD(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==nt&&Gl(this._$AH)?this._$AA.nextSibling.data=t:this.T(Eo.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=xg.createElement(t1(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(n);else{const s=new n$(r,this),o=s.u(this.options);s.p(n),this.T(o),this._$AH=s}}_$AC(t){let n=uy.get(t.strings);return n===void 0&&uy.set(t.strings,n=new xg(t)),n}k(t){ev(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,r=0;for(const s of t)r===n.length?n.push(i=new n1(this.O(Kl()),this.O(Kl()),this,this.options)):i=n[r],i._$AI(s),r++;r<n.length&&(this._$AR(i&&i._$AB.nextSibling,r),n.length=r)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=ry(t).nextSibling;ry(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},bf=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,r,s){this.type=1,this._$AH=nt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=nt}_$AI(t,n=this,i,r){const s=this.strings;let o=!1;if(s===void 0)t=Wa(this,t,n,0),o=!Gl(t)||t!==this._$AH&&t!==Ts,o&&(this._$AH=t);else{const a=t;let c,l;for(t=s[0],c=0;c<s.length-1;c++)l=Wa(this,a[i+c],n,c),l===Ts&&(l=this._$AH[c]),o||=!Gl(l)||l!==this._$AH[c],l===nt?t=nt:t!==nt&&(t+=(l??"")+s[c+1]),this._$AH[c]=l}o&&!r&&this.j(t)}j(t){t===nt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},i$=class extends bf{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===nt?void 0:t}},r$=class extends bf{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==nt)}},s$=class extends bf{constructor(t,n,i,r,s){super(t,n,i,r,s),this.type=5}_$AI(t,n=this){if((t=Wa(this,t,n,0)??nt)===Ts)return;const i=this._$AH,r=t===nt&&i!==nt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==nt&&(i===nt||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},o$=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Wa(this,t)}};const a$=tv.litHtmlPolyfillSupport;a$?.(xg,nv),(tv.litHtmlVersions??=[]).push("3.3.2");const c$=(e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const s=n?.renderBefore??null;i._$litPart$=r=new nv(t.insertBefore(Kl(),s),s,void 0,n??{})}return r._$AI(e),r};const iv=globalThis;let mt=class extends ma{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=c$(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ts}};mt._$litElement$=!0,mt.finalized=!0,iv.litElementHydrateSupport?.({LitElement:mt});const l$=iv.litElementPolyfillSupport;l$?.({LitElement:mt});(iv.litElementVersions??=[]).push("4.2.2");const Et=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const u$={attribute:!0,type:String,converter:pd,reflect:!1,hasChanged:Jm},h$=(e=u$,t,n)=>{const{kind:i,metadata:r}=n;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,e,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const c=this[o];t.call(this,a),this.requestUpdate(o,c,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function H(e){return(t,n)=>typeof n=="object"?h$(e,t,n):((i,r,s)=>{const o=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),o?Object.getOwnPropertyDescriptor(r,s):void 0})(e,t,n)}function P(e){return H({...e,state:!0,attribute:!1})}const i1={ATTRIBUTE:1,CHILD:2},r1=e=>(...t)=>({_$litDirective$:e,values:t});let s1=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const rv=r1(class extends s1{constructor(e){if(super(e),e.type!==i1.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}const n=e.element.classList;for(const i of this.st)i in t||(n.remove(i),this.st.delete(i));for(const i in t){const r=!!t[i];r===this.st.has(i)||this.nt?.has(i)||(r?(n.add(i),this.st.add(i)):(n.remove(i),this.st.delete(i)))}return Ts}});class Cg extends s1{constructor(t){if(super(t),this.it=nt,t.type!==i1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===nt||t==null)return this._t=void 0,this.it=t;if(t===Ts)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Cg.directiveName="unsafeHTML",Cg.resultType=1;let kg=class extends Cg{};kg.directiveName="unsafeSVG",kg.resultType=2;const ye=r1(kg);function Xl(e){"@babel/helpers - typeof";return Xl=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Xl(e)}function d$(e,t){if(Xl(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(Xl(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function f$(e){var t=d$(e,"string");return Xl(t)=="symbol"?t:t+""}function p$(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,f$(i.key),i)}}function Bs(e,t,n){return t&&p$(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function g$(e){return e[e.length-1]}function md(e){return Array.isArray(e)?e.slice(0):[e]}function m$(e,t){e=e.slice(0);for(var n=[];e.length;){var i=e.splice(0,t);n.push(i)}return n}function vd(e){return Array.isArray(e)}function v$(e){return e!=null}function _p(e,t){var n=0,i=-1;for(var r of e){i=i+1;var s=t(r,i);if(s)n=n+1;else break}return n}function Mo(e,t){var n=t.length;if(n!==0){var i=e.length;e.length=i+t.length;for(var r=0;r<n;++r)e[i+r]=t[r]}}function YB(e){return e.filter(function(t,n,i){return i.indexOf(t)===n})}function Os(e){for(var t="",n=0;n<e.length;n++){var i=e[n];if(i==="-")return parseInt(t,10);t+=i}throw new Error("malformatted revision: "+e)}function jr(e,t){var n=t?Os(t._rev)+1:1;return n+"-"+e}function y$(e){var t=e.split("."),n=t.length;return n===1?i=>i[e]:i=>{for(var r=i,s=0;s<n;++s){var o=t[s];if(r=r[o],typeof r>"u")return r}return r}}function qt(e){return Object.assign({},e)}function b$(e){return Object.keys(e)[0]}function yd(e,t=!1){if(!e)return e;if(!t&&Array.isArray(e))return e.sort((i,r)=>typeof i=="string"&&typeof r=="string"?i.localeCompare(r):typeof i=="object"?1:-1).map(i=>yd(i,t));if(typeof e=="object"&&!Array.isArray(e)){var n={};return Object.keys(e).sort((i,r)=>i.localeCompare(r)).forEach(i=>{n[i]=yd(e[i],t)}),n}return e}function Sg(e){if(!e||e===null||typeof e!="object")return e;if(Array.isArray(e)){for(var t=new Array(e.length),n=t.length;n--;)t[n]=Sg(e[n]);return t}var i={};for(var r in e)i[r]=Sg(e[r]);return i}var Fn=Sg;function Ir(e,t,n){return Object.defineProperty(e,t,{get:function(){return n}}),n}var sv=1;function gc(){return{lwt:sv}}function Oi(){return""}function _$(e){return Object.assign({},e,{_meta:void 0,_deleted:void 0,_rev:void 0})}function w$(e,t,n){if(t.length!==n.length)return!1;for(var i=0,r=t.length;i<r;){var s=t[i],o=n[i];if(i++,s[e]!==o[e]||s._rev!==o._rev||s._meta.lwt!==o._meta.lwt)return!1}return!0}function Ql(e,t){return Ql=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,i){return n.__proto__=i,n},Ql(e,t)}function ov(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Ql(e,t)}function Eg(e){return Eg=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Eg(e)}function x$(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}function o1(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(o1=function(){return!!e})()}function C$(e,t,n){if(o1())return Reflect.construct.apply(null,arguments);var i=[null];i.push.apply(i,t);var r=new(e.bind.apply(e,i));return n&&Ql(r,n.prototype),r}function bd(e){var t=typeof Map=="function"?new Map:void 0;return bd=function(i){if(i===null||!x$(i))return i;if(typeof i!="function")throw new TypeError("Super expression must either be null or a function");if(t!==void 0){if(t.has(i))return t.get(i);t.set(i,r)}function r(){return C$(i,arguments,Eg(this).constructor)}return r.prototype=Object.create(i.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),Ql(r,i)},bd(e)}var At={isDevMode(){return!1},deepFreezeWhenDevMode(e){return e},tunnelErrorMessage(e){return`
        RxDB Error-Code: `+e+`.
        Hint: Error messages are not included in RxDB core to reduce build size.
        To show the full error messages and to ensure that you do not make any mistakes when using RxDB,
        use the dev-mode plugin when you are in development mode: https://rxdb.info/dev-mode.html?console=error
        `}};function k$(e){var t="";return Object.keys(e).length===0||(t+="-".repeat(20)+`
`,t+=`Parameters:
`,t+=Object.keys(e).map(n=>{var i="[object Object]";try{n==="errors"?i=e[n].map(r=>JSON.stringify(r,Object.getOwnPropertyNames(r))):i=JSON.stringify(e[n],function(r,s){return s===void 0?null:s},2)}catch{}return n+": "+i}).join(`
`),t+=`
`),t}function a1(e,t,n){return`
`+e+`
`+k$(n)}var S$=(function(e){function t(i,r,s={}){var o,a=a1(r,i,s);return o=e.call(this,a)||this,o.code=i,o.message=a,o.url=av(i),o.parameters=s,o.rxdb=!0,o}ov(t,e);var n=t.prototype;return n.toString=function(){return this.message},Bs(t,[{key:"name",get:function(){return"RxError ("+this.code+")"}},{key:"typeError",get:function(){return!1}}])})(bd(Error)),E$=(function(e){function t(i,r,s={}){var o,a=a1(r,i,s);return o=e.call(this,a)||this,o.code=i,o.message=a,o.url=av(i),o.parameters=s,o.rxdb=!0,o}ov(t,e);var n=t.prototype;return n.toString=function(){return this.message},Bs(t,[{key:"name",get:function(){return"RxTypeError ("+this.code+")"}},{key:"typeError",get:function(){return!0}}])})(bd(TypeError));function av(e){return"https://rxdb.info/errors.html?console=errors#"+e}function c1(e){return`
Find out more about this error here: `+av(e)+` 
`}function U(e,t){return new S$(e,At.tunnelErrorMessage(e)+c1(e),t)}function _d(e,t){return new E$(e,At.tunnelErrorMessage(e)+c1(e),t)}function Ha(e){return e&&e.status===409?e:!1}var M$={409:"document write conflict",422:"schema validation error",510:"attachment data missing"};function l1(e){return U("COL20",{name:M$[e.status],document:e.documentId,writeError:e})}var uh;function D$(){if(uh)return uh;if(typeof crypto>"u"||typeof crypto.subtle>"u"||typeof crypto.subtle.digest!="function")throw U("UT8",{args:{typeof_crypto:typeof crypto,typeof_crypto_subtle:typeof crypto?.subtle,typeof_crypto_subtle_digest:typeof crypto?.subtle?.digest}});return uh=crypto.subtle.digest.bind(crypto.subtle),uh}async function $$(e){var t=new TextEncoder().encode(e),n=await D$()("SHA-256",t),i=Array.prototype.map.call(new Uint8Array(n),r=>("00"+r.toString(16)).slice(-2)).join("");return i}var u1=$$;function T$(){return new Promise(e=>setTimeout(e,0))}function O$(e=0){return new Promise(t=>setTimeout(t,e))}function h1(e){return e&&typeof e.then=="function"?e:Promise.resolve(e)}var cv=Promise.resolve(!0),er=Promise.resolve(!1),lv=Promise.resolve(null),di=Promise.resolve();function _f(e=1e4){return typeof requestIdleCallback=="function"?new Promise(t=>{requestIdleCallback(()=>t(),{timeout:e})}):O$(0)}var wp=di;function I$(e=void 0){return wp=wp.then(()=>_f(e)),wp}function P$(e,t){return e.reduce((n,i)=>n.then(i),Promise.resolve(t))}var R$=/\./g,hy="abcdefghijklmnopqrstuvwxyz";function Ko(e=10){for(var t="",n=0;n<e;n++)t+=hy.charAt(Math.floor(Math.random()*hy.length));return t}function d1(e){e+="";var t=e.charAt(0).toUpperCase();return t+e.substr(1)}function Qc(e){for(;e.charAt(0)===".";)e=e.substr(1);for(;e.slice(-1)===".";)e=e.slice(0,-1);return e}function Zl(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,i;if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(i=n;i--!==0;)if(!Zl(e[i],t[i]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();var r=Object.keys(e);if(n=r.length,n!==Object.keys(t).length)return!1;for(i=n;i--!==0;)if(!Object.prototype.hasOwnProperty.call(t,r[i]))return!1;for(i=n;i--!==0;){var s=r[i];if(!Zl(e[s],t[s]))return!1}return!0}return e!==e&&t!==t}var Mg=e=>{var t=typeof e;return e!==null&&(t==="object"||t==="function")},xp=new Set(["__proto__","prototype","constructor"]),A$=new Set("0123456789");function f1(e){var t=[],n="",i="start",r=!1;for(var s of e)switch(s){case"\\":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");r&&(n+=s),i="property",r=!r;break}case".":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="property";break}if(r){r=!1,n+=s;break}if(xp.has(n))return[];t.push(n),n="",i="property";break}case"[":{if(i==="index")throw new Error("Invalid character in an index");if(i==="indexEnd"){i="index";break}if(r){r=!1,n+=s;break}if(i==="property"){if(xp.has(n))return[];t.push(n),n=""}i="index";break}case"]":{if(i==="index"){t.push(Number.parseInt(n,10)),n="",i="indexEnd";break}if(i==="indexEnd")throw new Error("Invalid character after an index")}default:{if(i==="index"&&!A$.has(s))throw new Error("Invalid character in an index");if(i==="indexEnd")throw new Error("Invalid character after an index");i==="start"&&(i="property"),r&&(r=!1,n+="\\"),n+=s}}switch(r&&(n+="\\"),i){case"property":{if(xp.has(n))return[];t.push(n);break}case"index":throw new Error("Index was not closed");case"start":{t.push("");break}}return t}function p1(e,t){if(typeof t!="number"&&Array.isArray(e)){var n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}function L$(e,t){if(p1(e,t))throw new Error("Cannot use string index")}function Ua(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!t.includes(".")&&!t.includes("["))return e[t];if(!Mg(e)||typeof t!="string")return n===void 0?e:n;var i=f1(t);if(i.length===0)return n;for(var r=0;r<i.length;r++){var s=i[r];if(p1(e,s)?e=r===i.length-1?void 0:null:e=e[s],e==null){if(r!==i.length-1)return n;break}}return e===void 0?n:e}function qB(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!Mg(e)||typeof t!="string")return e;for(var i=e,r=f1(t),s=0;s<r.length;s++){var o=r[s];L$(e,o),s===r.length-1?e[o]=n:Mg(e[o])||(e[o]=typeof r[s+1]=="number"?[]:{}),e=e[o]}return i}function Ya(e,t){var n=e.get(t);if(typeof n>"u")throw new Error("missing value from map "+t);return n}function yi(e,t,n,i){var r=e.get(t);return typeof r>"u"&&(r=n(),e.set(t,r)),r}function Rt(e){var t=e.split("-"),n="RxDB";return t.forEach(i=>{n+=d1(i)}),n+="Plugin",new Error(`You are using a function which must be overwritten by a plugin.
        You should either prevent the usage of this function or add the plugin via:
            import { `+n+" } from 'rxdb/plugins/"+e+`';
            addRxPlugin(`+n+`);
        `)}function wd(e){var t={name:e.name,message:e.message,rxdb:e.rxdb,parameters:e.parameters,extensions:e.extensions,code:e.code,url:e.url,stack:e.stack?e.stack.replace(/\n/g,` 
 `):void 0};return t}var Cp=0;function Ri(){var e=Date.now();e=e+.01,e<=Cp&&(e=Cp+.01);var t=parseFloat(e.toFixed(2));return Cp=t,t}function Q(e,t){if(!e)throw t||(t=""),new Error("ensureNotFalsy() is falsy: "+t);return e}var Ou={bufferSize:1,refCount:!0},N$="16.21.1",kp={},F$="6da4936d1425ff3a5c44c02342c6daf791d266be3ae8479b8ec59e261df41b93",dy=16,Sp=er,fy=!1;async function z$(){return fy||(fy=!0,Sp=(async()=>!!(kp.premium&&typeof kp.premium=="string"&&await u1(kp.premium)===F$))()),Sp}var Jl={preAddRxPlugin:[],preCreateRxDatabase:[],createRxDatabase:[],preCreateRxCollection:[],createRxCollection:[],createRxState:[],postCloseRxCollection:[],postRemoveRxCollection:[],preCreateRxSchema:[],createRxSchema:[],prePrepareRxQuery:[],preCreateRxQuery:[],prePrepareQuery:[],createRxDocument:[],postCreateRxDocument:[],preCreateRxStorageInstance:[],preStorageWrite:[],preMigrateDocument:[],postMigrateDocument:[],preCloseRxDatabase:[],postRemoveRxDatabase:[],postCleanup:[],preReplicationMasterWrite:[],preReplicationMasterWriteDocumentsHandle:[]};function zn(e,t){Jl[e].length>0&&Jl[e].forEach(n=>n(t))}async function Do(e,t){for(var n of Jl[e])await n(t)}function tu(e,t){var n=t;n=n.replace(R$,".properties."),n="properties."+n,n=Qc(n);var i=Ua(e,n);return i}function j$(e,t,n){if(typeof t.primaryKey=="string")return n;var i=Ws(t,n),r=n[e];if(r&&r!==i)throw U("DOC19",{args:{documentData:n,existingPrimary:r,newPrimary:i},schema:t});return n[e]=i,n}function Ai(e){return typeof e=="string"?e:e.key}function B$(e){var t=Ai(e.primaryKey),n=tu(e,t);return Q(n.maxLength)}function Ws(e,t){if(typeof e.primaryKey=="string")return t[e.primaryKey];var n=e.primaryKey;return n.fields.map(i=>{var r=Ua(t,i);if(typeof r>"u")throw U("DOC18",{args:{field:i,documentData:t}});return r}).join(n.separator)}function W$(e){var t=yd(e,!0);return t}function H$(e){return["_deleted",e]}function wf(e){e=qt(e);var t=Ai(e.primaryKey);e.properties=qt(e.properties),e.additionalProperties=!1,Object.prototype.hasOwnProperty.call(e,"keyCompression")||(e.keyCompression=!1),e.indexes=e.indexes?e.indexes.slice(0):[],e.required=e.required?e.required.slice(0):[],e.encrypted=e.encrypted?e.encrypted.slice(0):[],e.properties._rev={type:"string",minLength:1},e.properties._attachments={type:"object"},e.properties._deleted={type:"boolean"},e.properties._meta=Y$,e.required=e.required?e.required.slice(0):[],e.required.push("_deleted"),e.required.push("_rev"),e.required.push("_meta"),e.required.push("_attachments");var n=g1(e);Mo(e.required,n),e.required=e.required.filter(s=>!s.includes(".")).filter((s,o,a)=>a.indexOf(s)===o),e.version=e.version||0;var i=e.indexes.map(s=>{var o=vd(s)?s.slice(0):[s];return o.includes(t)||o.push(t),o[0]!=="_deleted"&&o.unshift("_deleted"),o});i.length===0&&i.push(H$(t)),i.push(["_meta.lwt",t]),e.internalIndexes&&e.internalIndexes.map(s=>{i.push(s)});var r=new Set;return i.filter(s=>{var o=s.join(",");return r.has(o)?!1:(r.add(o),!0)}),e.indexes=i,e}var U$=1e15,Y$={type:"object",properties:{lwt:{type:"number",minimum:sv,maximum:U$,multipleOf:.01}},additionalProperties:!0,required:["lwt"]};function g1(e){var t=Object.keys(e.properties).filter(i=>e.properties[i].final),n=Ai(e.primaryKey);return t.push(n),typeof e.primaryKey!="string"&&e.primaryKey.fields.forEach(i=>t.push(i)),t}function q$(e,t){for(var n=Object.keys(e.defaultValues),i=0;i<n.length;++i){var r=n[i];(!Object.prototype.hasOwnProperty.call(t,r)||typeof t[r]>"u")&&(t[r]=e.defaultValues[r])}return t}var m1=(function(){function e(n,i){if(this.jsonSchema=n,this.hashFunction=i,this.indexes=V$(this.jsonSchema),this.primaryPath=Ai(this.jsonSchema.primaryKey),!n.properties[this.primaryPath].maxLength)throw U("SC39",{schema:n});this.finalFields=g1(this.jsonSchema)}var t=e.prototype;return t.validateChange=function(i,r){this.finalFields.forEach(s=>{if(!Zl(i[s],r[s]))throw U("DOC9",{dataBefore:i,dataAfter:r,fieldName:s,schema:this.jsonSchema})})},t.getDocumentPrototype=function(){var i={},r=tu(this.jsonSchema,"");return Object.keys(r).forEach(s=>{var o=s;i.__defineGetter__(s,function(){if(!(!this.get||typeof this.get!="function")){var a=this.get(o);return a}}),Object.defineProperty(i,s+"$",{get:function(){return this.get$(o)},enumerable:!1,configurable:!1}),Object.defineProperty(i,s+"$$",{get:function(){return this.get$$(o)},enumerable:!1,configurable:!1}),Object.defineProperty(i,s+"_",{get:function(){return this.populate(o)},enumerable:!1,configurable:!1})}),Ir(this,"getDocumentPrototype",()=>i),i},t.getPrimaryOfDocumentData=function(i){return Ws(this.jsonSchema,i)},Bs(e,[{key:"version",get:function(){return this.jsonSchema.version}},{key:"defaultValues",get:function(){var n={};return Object.entries(this.jsonSchema.properties).filter(([,i])=>Object.prototype.hasOwnProperty.call(i,"default")).forEach(([i,r])=>n[i]=r.default),Ir(this,"defaultValues",n)}},{key:"hash",get:function(){return Ir(this,"hash",this.hashFunction(JSON.stringify(this.jsonSchema)))}}])})();function V$(e){return(e.indexes||[]).map(t=>vd(t)?t:[t])}function K$(e){var t=e.version?e.version:0,n=0;return new Array(t).fill(0).map(()=>n++)}function G$(e,t,n=!0){n&&zn("preCreateRxSchema",e);var i=wf(e);i=W$(i),At.deepFreezeWhenDevMode(i);var r=new m1(i,t);return zn("createRxSchema",r),r}function be(e){return typeof e=="function"}function X$(e){return be(e?.lift)}function fr(e){return function(t){if(X$(t))return t.lift(function(n){try{return e(n,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}var Dg=function(e,t){return Dg=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])},Dg(e,t)};function Go(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");Dg(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function Q$(e,t,n,i){function r(s){return s instanceof n?s:new n(function(o){o(s)})}return new(n||(n=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(h){o(h)}}function c(u){try{l(i.throw(u))}catch(h){o(h)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(e,t||[])).next())})}function v1(e,t){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},i,r,s,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=a(0),o.throw=a(1),o.return=a(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(l){return function(u){return c([l,u])}}function c(l){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(n=0)),n;)try{if(i=1,r&&(s=l[0]&2?r.return:l[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,l[1])).done)return s;switch(r=0,s&&(l=[l[0]&2,s.value]),l[0]){case 0:case 1:s=l;break;case 4:return n.label++,{value:l[1],done:!1};case 5:n.label++,r=l[1],l=[0];continue;case 7:l=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(l[0]===6||l[0]===2)){n=0;continue}if(l[0]===3&&(!s||l[1]>s[0]&&l[1]<s[3])){n.label=l[1];break}if(l[0]===6&&n.label<s[1]){n.label=s[1],s=l;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(l);break}s[2]&&n.ops.pop(),n.trys.pop();continue}l=t.call(e,n)}catch(u){l=[6,u],r=0}finally{i=s=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function qa(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],i=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function $o(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),r,s=[],o;try{for(;(t===void 0||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}function To(e,t,n){if(n||arguments.length===2)for(var i=0,r=t.length,s;i<r;i++)(s||!(i in t))&&(s||(s=Array.prototype.slice.call(t,0,i)),s[i]=t[i]);return e.concat(s||Array.prototype.slice.call(t))}function Ia(e){return this instanceof Ia?(this.v=e,this):new Ia(e)}function Z$(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(e,t||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(f){return function(p){return Promise.resolve(p).then(f,h)}}function a(f,p){i[f]&&(r[f]=function(g){return new Promise(function(m,b){s.push([f,g,m,b])>1||c(f,g)})},p&&(r[f]=p(r[f])))}function c(f,p){try{l(i[f](p))}catch(g){d(s[0][3],g)}}function l(f){f.value instanceof Ia?Promise.resolve(f.value.v).then(u,h):d(s[0][2],f)}function u(f){c("next",f)}function h(f){c("throw",f)}function d(f,p){f(p),s.shift(),s.length&&c(s[0][0],s[0][1])}}function J$(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof qa=="function"?qa(e):e[Symbol.iterator](),n={},i("next"),i("throw"),i("return"),n[Symbol.asyncIterator]=function(){return this},n);function i(s){n[s]=e[s]&&function(o){return new Promise(function(a,c){o=e[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var y1=(function(e){return e&&typeof e.length=="number"&&typeof e!="function"});function b1(e){return be(e?.then)}function uv(e){var t=function(i){Error.call(i),i.stack=new Error().stack},n=e(t);return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Ep=uv(function(e){return function(n){e(this),this.message=n?n.length+` errors occurred during unsubscription:
`+n.map(function(i,r){return r+1+") "+i.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=n}});function $g(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var xf=(function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var t,n,i,r,s;if(!this.closed){this.closed=!0;var o=this._parentage;if(o)if(this._parentage=null,Array.isArray(o))try{for(var a=qa(o),c=a.next();!c.done;c=a.next()){var l=c.value;l.remove(this)}}catch(g){t={error:g}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(t)throw t.error}}else o.remove(this);var u=this.initialTeardown;if(be(u))try{u()}catch(g){s=g instanceof Ep?g.errors:[g]}var h=this._finalizers;if(h){this._finalizers=null;try{for(var d=qa(h),f=d.next();!f.done;f=d.next()){var p=f.value;try{py(p)}catch(g){s=s??[],g instanceof Ep?s=To(To([],$o(s)),$o(g.errors)):s.push(g)}}}catch(g){i={error:g}}finally{try{f&&!f.done&&(r=d.return)&&r.call(d)}finally{if(i)throw i.error}}}if(s)throw new Ep(s)}},e.prototype.add=function(t){var n;if(t&&t!==this)if(this.closed)py(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}},e.prototype._hasParent=function(t){var n=this._parentage;return n===t||Array.isArray(n)&&n.includes(t)},e.prototype._addParent=function(t){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t},e.prototype._removeParent=function(t){var n=this._parentage;n===t?this._parentage=null:Array.isArray(n)&&$g(n,t)},e.prototype.remove=function(t){var n=this._finalizers;n&&$g(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e})(),_1=xf.EMPTY;function w1(e){return e instanceof xf||e&&"closed"in e&&be(e.remove)&&be(e.add)&&be(e.unsubscribe)}function py(e){be(e)?e():e.unsubscribe()}var tT={Promise:void 0},eT={setTimeout:function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];return setTimeout.apply(void 0,To([e,t],$o(n)))},clearTimeout:function(e){return clearTimeout(e)},delegate:void 0};function x1(e){eT.setTimeout(function(){throw e})}function gy(){}function Ph(e){e()}var hv=(function(e){Go(t,e);function t(n){var i=e.call(this)||this;return i.isStopped=!1,n?(i.destination=n,w1(n)&&n.add(i)):i.destination=rT,i}return t.create=function(n,i,r){return new Va(n,i,r)},t.prototype.next=function(n){this.isStopped||this._next(n)},t.prototype.error=function(n){this.isStopped||(this.isStopped=!0,this._error(n))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(n){this.destination.next(n)},t.prototype._error=function(n){try{this.destination.error(n)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t})(xf),nT=(function(){function e(t){this.partialObserver=t}return e.prototype.next=function(t){var n=this.partialObserver;if(n.next)try{n.next(t)}catch(i){hh(i)}},e.prototype.error=function(t){var n=this.partialObserver;if(n.error)try{n.error(t)}catch(i){hh(i)}else hh(t)},e.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(n){hh(n)}},e})(),Va=(function(e){Go(t,e);function t(n,i,r){var s=e.call(this)||this,o;return be(n)||!n?o={next:n??void 0,error:i??void 0,complete:r??void 0}:o=n,s.destination=new nT(o),s}return t})(hv);function hh(e){x1(e)}function iT(e){throw e}var rT={closed:!0,next:gy,error:iT,complete:gy},dv=(function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"})();function Iu(e){return e}function sT(e){return e.length===0?Iu:e.length===1?e[0]:function(n){return e.reduce(function(i,r){return r(i)},n)}}var ti=(function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(t,n,i){var r=this,s=aT(t)?t:new Va(t,n,i);return Ph(function(){var o=r,a=o.operator,c=o.source;s.add(a?a.call(s,c):c?r._subscribe(s):r._trySubscribe(s))}),s},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(n){t.error(n)}},e.prototype.forEach=function(t,n){var i=this;return n=my(n),new n(function(r,s){var o=new Va({next:function(a){try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});i.subscribe(o)})},e.prototype._subscribe=function(t){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(t)},e.prototype[dv]=function(){return this},e.prototype.pipe=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return sT(t)(this)},e.prototype.toPromise=function(t){var n=this;return t=my(t),new t(function(i,r){var s;n.subscribe(function(o){return s=o},function(o){return r(o)},function(){return i(s)})})},e.create=function(t){return new e(t)},e})();function my(e){var t;return(t=e??tT.Promise)!==null&&t!==void 0?t:Promise}function oT(e){return e&&be(e.next)&&be(e.error)&&be(e.complete)}function aT(e){return e&&e instanceof hv||oT(e)&&w1(e)}function C1(e){return be(e[dv])}function k1(e){return Symbol.asyncIterator&&be(e?.[Symbol.asyncIterator])}function S1(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function cT(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var E1=cT();function M1(e){return be(e?.[E1])}function D1(e){return Z$(this,arguments,function(){var n,i,r,s;return v1(this,function(o){switch(o.label){case 0:n=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,Ia(n.read())];case 3:return i=o.sent(),r=i.value,s=i.done,s?[4,Ia(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return[4,Ia(r)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return n.releaseLock(),[7];case 10:return[2]}})})}function $1(e){return be(e?.getReader)}function Xr(e){if(e instanceof ti)return e;if(e!=null){if(C1(e))return lT(e);if(y1(e))return uT(e);if(b1(e))return hT(e);if(k1(e))return T1(e);if(M1(e))return dT(e);if($1(e))return fT(e)}throw S1(e)}function lT(e){return new ti(function(t){var n=e[dv]();if(be(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function uT(e){return new ti(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function hT(e){return new ti(function(t){e.then(function(n){t.closed||(t.next(n),t.complete())},function(n){return t.error(n)}).then(null,x1)})}function dT(e){return new ti(function(t){var n,i;try{for(var r=qa(e),s=r.next();!s.done;s=r.next()){var o=s.value;if(t.next(o),t.closed)return}}catch(a){n={error:a}}finally{try{s&&!s.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}t.complete()})}function T1(e){return new ti(function(t){pT(e,t).catch(function(n){return t.error(n)})})}function fT(e){return T1(D1(e))}function pT(e,t){var n,i,r,s;return Q$(this,void 0,void 0,function(){var o,a;return v1(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),n=J$(e),c.label=1;case 1:return[4,n.next()];case 2:if(i=c.sent(),!!i.done)return[3,4];if(o=i.value,t.next(o),t.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=c.sent(),r={error:a},[3,11];case 6:return c.trys.push([6,,9,10]),i&&!i.done&&(s=n.return)?[4,s.call(n)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(r)throw r.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function Br(e,t,n,i,r){return new gT(e,t,n,i,r)}var gT=(function(e){Go(t,e);function t(n,i,r,s,o,a){var c=e.call(this,n)||this;return c.onFinalize=o,c.shouldUnsubscribe=a,c._next=i?function(l){try{i(l)}catch(u){n.error(u)}}:e.prototype._next,c._error=s?function(l){try{s(l)}catch(u){n.error(u)}finally{this.unsubscribe()}}:e.prototype._error,c._complete=r?function(){try{r()}catch(l){n.error(l)}finally{this.unsubscribe()}}:e.prototype._complete,c}return t.prototype.unsubscribe=function(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var i=this.closed;e.prototype.unsubscribe.call(this),!i&&((n=this.onFinalize)===null||n===void 0||n.call(this))}},t})(hv),O1={now:function(){return(O1.delegate||Date).now()},delegate:void 0};function mT(e){return e&&be(e.schedule)}function fv(e){return e[e.length-1]}function vT(e){return be(fv(e))?e.pop():void 0}function mc(e){return mT(fv(e))?e.pop():void 0}function I1(e,t){return typeof fv(e)=="number"?e.pop():t}function Ss(e,t,n,i,r){i===void 0&&(i=0),r===void 0&&(r=!1);var s=t.schedule(function(){n(),r?e.add(this.schedule(null,i)):this.unsubscribe()},i);if(e.add(s),!r)return s}var yT=Array.isArray,bT=Object.getPrototypeOf,_T=Object.prototype,wT=Object.keys;function xT(e){if(e.length===1){var t=e[0];if(yT(t))return{args:t,keys:null};if(CT(t)){var n=wT(t);return{args:n.map(function(i){return t[i]}),keys:n}}}return{args:e,keys:null}}function CT(e){return e&&typeof e=="object"&&bT(e)===_T}function P1(e,t){return t===void 0&&(t=0),fr(function(n,i){n.subscribe(Br(i,function(r){return Ss(i,e,function(){return i.next(r)},t)},function(){return Ss(i,e,function(){return i.complete()},t)},function(r){return Ss(i,e,function(){return i.error(r)},t)}))})}function R1(e,t){return t===void 0&&(t=0),fr(function(n,i){i.add(e.schedule(function(){return n.subscribe(i)},t))})}function kT(e,t){return Xr(e).pipe(R1(t),P1(t))}function ST(e,t){return Xr(e).pipe(R1(t),P1(t))}function ET(e,t){return new ti(function(n){var i=0;return t.schedule(function(){i===e.length?n.complete():(n.next(e[i++]),n.closed||this.schedule())})})}function MT(e,t){return new ti(function(n){var i;return Ss(n,t,function(){i=e[E1](),Ss(n,t,function(){var r,s,o;try{r=i.next(),s=r.value,o=r.done}catch(a){n.error(a);return}o?n.complete():n.next(s)},0,!0)}),function(){return be(i?.return)&&i.return()}})}function A1(e,t){if(!e)throw new Error("Iterable cannot be null");return new ti(function(n){Ss(n,t,function(){var i=e[Symbol.asyncIterator]();Ss(n,t,function(){i.next().then(function(r){r.done?n.complete():n.next(r.value)})},0,!0)})})}function DT(e,t){return A1(D1(e),t)}function $T(e,t){if(e!=null){if(C1(e))return kT(e,t);if(y1(e))return ET(e,t);if(b1(e))return ST(e,t);if(k1(e))return A1(e,t);if(M1(e))return MT(e,t);if($1(e))return DT(e,t)}throw S1(e)}function vc(e,t){return t?$T(e,t):Xr(e)}function Ht(e,t){return fr(function(n,i){var r=0;n.subscribe(Br(i,function(s){i.next(e.call(t,s,r++))}))})}var TT=Array.isArray;function OT(e,t){return TT(t)?e.apply(void 0,To([],$o(t))):e(t)}function IT(e){return Ht(function(t){return OT(e,t)})}function PT(e,t){return e.reduce(function(n,i,r){return n[i]=t[r],n},{})}function pv(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=mc(e),i=vT(e),r=xT(e),s=r.args,o=r.keys;if(s.length===0)return vc([],n);var a=new ti(RT(s,n,o?function(c){return PT(o,c)}:Iu));return i?a.pipe(IT(i)):a}function RT(e,t,n){return n===void 0&&(n=Iu),function(i){vy(t,function(){for(var r=e.length,s=new Array(r),o=r,a=r,c=function(u){vy(t,function(){var h=vc(e[u],t),d=!1;h.subscribe(Br(i,function(f){s[u]=f,d||(d=!0,a--),a||i.next(n(s.slice()))},function(){--o||i.complete()}))},i)},l=0;l<r;l++)c(l)},i)}}function vy(e,t,n){e?Ss(n,e,t):t()}function AT(e,t,n,i,r,s,o,a){var c=[],l=0,u=0,h=!1,d=function(){h&&!c.length&&!l&&t.complete()},f=function(g){return l<i?p(g):c.push(g)},p=function(g){l++;var m=!1;Xr(n(g,u++)).subscribe(Br(t,function(b){t.next(b)},function(){m=!0},void 0,function(){if(m)try{l--;for(var b=function(){var _=c.shift();o||p(_)};c.length&&l<i;)b();d()}catch(_){t.error(_)}}))};return e.subscribe(Br(t,f,function(){h=!0,d()})),function(){}}function nr(e,t,n){return n===void 0&&(n=1/0),be(t)?nr(function(i,r){return Ht(function(s,o){return t(i,s,r,o)})(Xr(e(i,r)))},n):(typeof t=="number"&&(n=t),fr(function(i,r){return AT(i,r,e,n)}))}function gv(e){return e===void 0&&(e=1/0),nr(Iu,e)}function LT(){return gv(1)}var NT=uv(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Fe=(function(e){Go(t,e);function t(){var n=e.call(this)||this;return n.closed=!1,n.currentObservers=null,n.observers=[],n.isStopped=!1,n.hasError=!1,n.thrownError=null,n}return t.prototype.lift=function(n){var i=new yy(this,this);return i.operator=n,i},t.prototype._throwIfClosed=function(){if(this.closed)throw new NT},t.prototype.next=function(n){var i=this;Ph(function(){var r,s;if(i._throwIfClosed(),!i.isStopped){i.currentObservers||(i.currentObservers=Array.from(i.observers));try{for(var o=qa(i.currentObservers),a=o.next();!a.done;a=o.next()){var c=a.value;c.next(n)}}catch(l){r={error:l}}finally{try{a&&!a.done&&(s=o.return)&&s.call(o)}finally{if(r)throw r.error}}}})},t.prototype.error=function(n){var i=this;Ph(function(){if(i._throwIfClosed(),!i.isStopped){i.hasError=i.isStopped=!0,i.thrownError=n;for(var r=i.observers;r.length;)r.shift().error(n)}})},t.prototype.complete=function(){var n=this;Ph(function(){if(n._throwIfClosed(),!n.isStopped){n.isStopped=!0;for(var i=n.observers;i.length;)i.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(n){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,n)},t.prototype._subscribe=function(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)},t.prototype._innerSubscribe=function(n){var i=this,r=this,s=r.hasError,o=r.isStopped,a=r.observers;return s||o?_1:(this.currentObservers=null,a.push(n),new xf(function(){i.currentObservers=null,$g(a,n)}))},t.prototype._checkFinalizedStatuses=function(n){var i=this,r=i.hasError,s=i.thrownError,o=i.isStopped;r?n.error(s):o&&n.complete()},t.prototype.asObservable=function(){var n=new ti;return n.source=this,n},t.create=function(n,i){return new yy(n,i)},t})(ti),yy=(function(e){Go(t,e);function t(n,i){var r=e.call(this)||this;return r.destination=n,r.source=i,r}return t.prototype.next=function(n){var i,r;(r=(i=this.destination)===null||i===void 0?void 0:i.next)===null||r===void 0||r.call(i,n)},t.prototype.error=function(n){var i,r;(r=(i=this.destination)===null||i===void 0?void 0:i.error)===null||r===void 0||r.call(i,n)},t.prototype.complete=function(){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||i===void 0||i.call(n)},t.prototype._subscribe=function(n){var i,r;return(r=(i=this.source)===null||i===void 0?void 0:i.subscribe(n))!==null&&r!==void 0?r:_1},t})(Fe);function by(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return LT()(vc(e,mc(e)))}var FT=new ti(function(e){return e.complete()});function _y(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=mc(e);return vc(e,n)}function eu(e,t){return t===void 0&&(t=Iu),e=e??zT,fr(function(n,i){var r,s=!0;n.subscribe(Br(i,function(o){var a=t(o);(s||!e(r,a))&&(s=!1,r=a,i.next(o))}))})}function zT(e,t){return e===t}function Ot(e,t){return fr(function(n,i){var r=0;n.subscribe(Br(i,function(s){return e.call(t,s,r++)&&i.next(s)}))})}var jT=uv(function(e){return function(){e(this),this.name="EmptyError",this.message="no elements in sequence"}});function BT(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=mc(e),i=I1(e,1/0);return fr(function(r,s){gv(i)(vc(To([r],$o(e)),n)).subscribe(s)})}function WT(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return BT.apply(void 0,To([],$o(e)))}var ui=(function(e){Go(t,e);function t(n){var i=e.call(this)||this;return i._value=n,i}return Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),t.prototype._subscribe=function(n){var i=e.prototype._subscribe.call(this,n);return!i.closed&&n.next(this._value),i},t.prototype.getValue=function(){var n=this,i=n.hasError,r=n.thrownError,s=n._value;if(i)throw r;return this._throwIfClosed(),s},t.prototype.next=function(n){e.prototype.next.call(this,this._value=n)},t})(Fe),HT=(function(e){Go(t,e);function t(n,i,r){n===void 0&&(n=1/0),i===void 0&&(i=1/0),r===void 0&&(r=O1);var s=e.call(this)||this;return s._bufferSize=n,s._windowTime=i,s._timestampProvider=r,s._buffer=[],s._infiniteTimeWindow=!0,s._infiniteTimeWindow=i===1/0,s._bufferSize=Math.max(1,n),s._windowTime=Math.max(1,i),s}return t.prototype.next=function(n){var i=this,r=i.isStopped,s=i._buffer,o=i._infiniteTimeWindow,a=i._timestampProvider,c=i._windowTime;r||(s.push(n),!o&&s.push(a.now()+c)),this._trimBuffer(),e.prototype.next.call(this,n)},t.prototype._subscribe=function(n){this._throwIfClosed(),this._trimBuffer();for(var i=this._innerSubscribe(n),r=this,s=r._infiniteTimeWindow,o=r._buffer,a=o.slice(),c=0;c<a.length&&!n.closed;c+=s?1:2)n.next(a[c]);return this._checkFinalizedStatuses(n),i},t.prototype._trimBuffer=function(){var n=this,i=n._bufferSize,r=n._timestampProvider,s=n._buffer,o=n._infiniteTimeWindow,a=(o?1:2)*i;if(i<1/0&&a<s.length&&s.splice(0,s.length-a),!o){for(var c=r.now(),l=0,u=1;u<s.length&&s[u]<=c;u+=2)l=u;l&&s.splice(0,l+1)}},t})(Fe);function UT(e){e===void 0&&(e={});var t=e.connector,n=t===void 0?function(){return new Fe}:t,i=e.resetOnError,r=i===void 0?!0:i,s=e.resetOnComplete,o=s===void 0?!0:s,a=e.resetOnRefCountZero,c=a===void 0?!0:a;return function(l){var u,h,d,f=0,p=!1,g=!1,m=function(){h?.unsubscribe(),h=void 0},b=function(){m(),u=d=void 0,p=g=!1},_=function(){var C=u;b(),C?.unsubscribe()};return fr(function(C,S){f++,!g&&!p&&m();var k=d=d??n();S.add(function(){f--,f===0&&!g&&!p&&(h=Mp(_,c))}),k.subscribe(S),!u&&f>0&&(u=new Va({next:function($){return k.next($)},error:function($){g=!0,m(),h=Mp(b,r,$),k.error($)},complete:function(){p=!0,m(),h=Mp(b,o),k.complete()}}),Xr(C).subscribe(u))})(l)}}function Mp(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(t===!0){e();return}if(t!==!1){var r=new Va({next:function(){r.unsubscribe(),e()}});return Xr(t.apply(void 0,To([],$o(n)))).subscribe(r)}}function Pu(e,t,n){var i,r,s,o,a=!1;return e&&typeof e=="object"?(i=e.bufferSize,o=i===void 0?1/0:i,r=e.windowTime,t=r===void 0?1/0:r,s=e.refCount,a=s===void 0?!1:s,n=e.scheduler):o=e??1/0,UT({connector:function(){return new HT(o,t,n)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:a})}function Ru(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=mc(e);return fr(function(i,r){(n?by(e,i,n):by(e,i)).subscribe(r)})}function L1(e,t){return fr(function(n,i){var r=null,s=0,o=!1,a=function(){return o&&!r&&i.complete()};n.subscribe(Br(i,function(c){r?.unsubscribe();var l=0,u=s++;Xr(e(c,u)).subscribe(r=Br(i,function(h){return i.next(t?t(c,h,u,l++):h)},function(){r=null,a()}))},function(){o=!0,a()}))})}function N1(e){return e.documentData?e.documentData:e.previousDocumentData}function YT(e){switch(e.operation){case"INSERT":return{operation:e.operation,id:e.documentId,doc:e.documentData,previous:null};case"UPDATE":return{operation:e.operation,id:e.documentId,doc:At.deepFreezeWhenDevMode(e.documentData),previous:e.previousDocumentData?e.previousDocumentData:"UNKNOWN"};case"DELETE":return{operation:e.operation,id:e.documentId,doc:null,previous:e.previousDocumentData}}}var qT=new Map;function F1(e){return yi(qT,e,()=>{for(var t=new Array(e.events.length),n=e.events,i=e.collectionName,r=e.isLocal,s=At.deepFreezeWhenDevMode,o=0;o<n.length;o++){var a=n[o];t[o]={documentId:a.documentId,collectionName:i,isLocal:r,operation:a.operation,documentData:s(a.documentData),previousDocumentData:s(a.previousDocumentData)}}return t})}function Pr(e,t){return new Promise(function(n,i){var r=new Va({next:function(s){n(s),r.unsubscribe()},error:i,complete:function(){i(new jT)}});e.subscribe(r)})}function Tg(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=mc(e),i=I1(e,1/0),r=e;return r.length?r.length===1?Xr(r[0]):gv(i)(vc(r,n)):FT}var Ml="￿",Dl=Number.MIN_SAFE_INTEGER;function VT(e,t){var n=t.selector,i=e.indexes?e.indexes.slice(0):[];t.index&&(i=[t.index]);var r=!!t.sort.find(u=>Object.values(u)[0]==="desc"),s=new Set;Object.keys(n).forEach(u=>{var h=tu(e,u);h&&h.type==="boolean"&&Object.prototype.hasOwnProperty.call(n[u],"$eq")&&s.add(u)});var o=t.sort.map(u=>Object.keys(u)[0]),a=o.filter(u=>!s.has(u)).join(","),c=-1,l;if(i.forEach(u=>{var h=!0,d=!0,f=u.map(_=>{var C=n[_],S=C?Object.keys(C):[],k={};if(!C||!S.length){var $=d?Dl:Ml;k={startKey:$,endKey:h?Ml:Dl,inclusiveStart:!0,inclusiveEnd:!0}}else S.forEach(D=>{if(mv.has(D)){var w=C[D],x=QT(D,w);k=Object.assign(k,x)}});return typeof k.startKey>"u"&&(k.startKey=Dl),typeof k.endKey>"u"&&(k.endKey=Ml),typeof k.inclusiveStart>"u"&&(k.inclusiveStart=!0),typeof k.inclusiveEnd>"u"&&(k.inclusiveEnd=!0),d&&!k.inclusiveStart&&(d=!1),h&&!k.inclusiveEnd&&(h=!1),k}),p=f.map(_=>_.startKey),g=f.map(_=>_.endKey),m={index:u,startKeys:p,endKeys:g,inclusiveEnd:h,inclusiveStart:d,sortSatisfiedByIndex:!r&&a===u.filter(_=>!s.has(_)).join(","),selectorSatisfiedByIndex:XT(u,t.selector,p,g)},b=ZT(e,t,m);(b>=c||t.index)&&(c=b,l=m)}),!l)throw U("SNH",{query:t});return l}var mv=new Set(["$eq","$gt","$gte","$lt","$lte"]),KT=new Set(["$eq","$gt","$gte"]),GT=new Set(["$eq","$lt","$lte"]);function XT(e,t,n,i){var r=Object.entries(t),s=r.find(([D,w])=>{if(!e.includes(D))return!0;var x=Object.entries(w).find(([M,O])=>!mv.has(M));return x});if(s||t.$and||t.$or)return!1;var o=[],a=new Set;for(var[c,l]of Object.entries(t)){if(!e.includes(c))return!1;var u=Object.keys(l).filter(D=>KT.has(D));if(u.length>1)return!1;var h=u[0];if(h&&a.add(c),h!=="$eq"){if(o.length>0)return!1;o.push(h)}}var d=[],f=new Set;for(var[p,g]of Object.entries(t)){if(!e.includes(p))return!1;var m=Object.keys(g).filter(D=>GT.has(D));if(m.length>1)return!1;var b=m[0];if(b&&f.add(p),b!=="$eq"){if(d.length>0)return!1;d.push(b)}}var _=0;for(var C of e){for(var S of[a,f]){if(!S.has(C)&&S.size>0)return!1;S.delete(C)}var k=n[_],$=i[_];if(k!==$&&a.size>0&&f.size>0)return!1;_++}return!0}function QT(e,t){switch(e){case"$eq":return{startKey:t,endKey:t,inclusiveEnd:!0,inclusiveStart:!0};case"$lte":return{endKey:t,inclusiveEnd:!0};case"$gte":return{startKey:t,inclusiveStart:!0};case"$lt":return{endKey:t,inclusiveEnd:!1};case"$gt":return{startKey:t,inclusiveStart:!1};default:throw new Error("SNH")}}function ZT(e,t,n){var i=0,r=u=>{u>0&&(i=i+u)},s=10,o=_p(n.startKeys,u=>u!==Dl&&u!==Ml);r(o*s);var a=_p(n.startKeys,u=>u!==Ml&&u!==Dl);r(a*s);var c=_p(n.startKeys,(u,h)=>u===n.endKeys[h]);r(c*s*1.5);var l=n.sortSatisfiedByIndex?5:0;return r(l),i}class Cf extends Error{}const nu=Symbol("missing"),z1=Object.freeze(new Error("mingo: cycle detected while processing object/array")),kf=e=>{const t=Rh(e);let n=0,i=t.length;for(;i;)n=(n<<5)-n^t.charCodeAt(--i);return n>>>0},gs=e=>typeof e!="object"&&typeof e!="function"||e===null,j1=e=>gs(e)||ru(e)||bo(e),B1={undefined:1,null:2,number:3,string:4,symbol:5,object:6,array:7,arraybuffer:8,boolean:9,date:10,regexp:11,function:12},Is=(e,t)=>{e===nu&&(e=void 0),t===nu&&(t=void 0);const[n,i]=[e,t].map(r=>B1[iu(r)]||0);return n!==i?n-i:Es(e,t)?0:e<t?-1:e>t?1:0};class xd extends Map{#t=kf;#n=new Map;#e=t=>{const n=this.#t(t);return[(this.#n.get(n)||[]).find(i=>Es(i,t)),n]};constructor(){super()}static init(t){const n=new xd;return t&&(n.#t=t),n}clear(){super.clear(),this.#n.clear()}delete(t){if(gs(t))return super.delete(t);const[n,i]=this.#e(t);return super.delete(n)?(this.#n.set(i,this.#n.get(i).filter(r=>!Es(r,n))),!0):!1}get(t){if(gs(t))return super.get(t);const[n,i]=this.#e(t);return super.get(n)}has(t){if(gs(t))return super.has(t);const[n,i]=this.#e(t);return super.has(n)}set(t,n){if(gs(t))return super.set(t,n);const[i,r]=this.#e(t);if(super.has(i))super.set(i,n);else{super.set(t,n);const s=this.#n.get(r)||[];s.push(t),this.#n.set(r,s)}return this}get size(){return super.size}}function Oe(e,t){if(!e)throw new Cf(t)}const JT=Object.keys(B1).reduce((e,t)=>(e["[object "+t[0].toUpperCase()+t.substring(1)+"]"]=t,e),{});function iu(e){const t=Object.prototype.toString.call(e);return t==="[object Object]"?e?.constructor?.name?.toLowerCase()||"object":JT[t]||t.substring(8,t.length-1).toLowerCase()}const Pa=e=>typeof e=="boolean",Ii=e=>typeof e=="string",tO=e=>typeof e=="symbol",Vn=e=>!isNaN(e)&&typeof e=="number",Pt=Array.isArray;function wn(e){if(!e)return!1;const t=Object.getPrototypeOf(e);return(t===Object.prototype||t===null)&&iu(e)==="object"}const W1=e=>!gs(e),ru=e=>e instanceof Date,bo=e=>e instanceof RegExp,vv=e=>typeof e=="function",ei=e=>e==null,eO=(e,t=!0)=>!!e||t&&e==="",yv=e=>ei(e)||Ii(e)&&!e||Pt(e)&&e.length===0||wn(e)&&Object.keys(e).length===0,Au=e=>Pt(e)?e:[e],Ka=(e,t)=>!!e&&Object.prototype.hasOwnProperty.call(e,t),nO=e=>typeof ArrayBuffer<"u"&&ArrayBuffer.isView(e),su=(e,t)=>{if(ei(e)||Pa(e)||Vn(e)||Ii(e))return e;if(ru(e))return new Date(e);if(bo(e))return new RegExp(e);if(nO(e)){const n=e.constructor;return new n(e)}if(t instanceof Set||(t=new Set),t.has(e))throw z1;t.add(e);try{if(Pt(e)){const n=new Array(e.length);for(let i=0;i<e.length;i++)n[i]=su(e[i],t);return n}if(wn(e)){const n={};for(const i of Object.keys(e))n[i]=su(e[i],t);return n}}finally{t.delete(e)}return e},wy=e=>e===nu;function Og(e,t){if(wy(e)||ei(e))return t;if(wy(t)||ei(t))return e;if(gs(e)||gs(t))return t;Pt(e)&&Pt(t)&&Oe(e.length===t.length,"arrays must be of equal length to merge.");for(const n of Object.keys(t))e[n]=Og(e[n],t[n]);return e}function iO(e,t=kf){const n=[xd.init(t),xd.init(t)];if(e.length===0)return[];if(e.some(i=>i.length===0))return[];if(e.length===1)return[...e];e[e.length-1].forEach(i=>n[0].set(i,!0));for(let i=e.length-2;i>-1;i--){if(e[i].forEach(r=>{n[0].has(r)&&n[1].set(r,!0)}),n[1].size===0)return[];n.reverse(),n[1].clear()}return Array.from(n[0].keys())}function H1(e,t=1){const n=new Array;function i(r,s){for(let o=0,a=r.length;o<a;o++)Pt(r[o])&&(s>0||s<0)?i(r[o],Math.max(-1,s-1)):n.push(r[o])}return i(e,t),n}function rO(e){const t={};for(;e;){for(const n of Object.getOwnPropertyNames(e))n in t||(t[n]=e[n]);e=Object.getPrototypeOf(e)}return t}function U1(e){for(;e;){if(Object.getOwnPropertyNames(e).includes("toString"))return e.toString!==Object.prototype.toString;e=Object.getPrototypeOf(e)}return!1}function Es(e,t){if(e===t||Object.is(e,t))return!0;if(e===null||t===null||typeof e!=typeof t||typeof e!="object"||e.constructor!==t.constructor)return!1;if(e instanceof Date)return+e==+t;if(e instanceof RegExp)return e.toString()===t.toString();const n=e.constructor;if(n===Array||n===Object){const i=Object.keys(e).sort(),r=Object.keys(t).sort();if(i.length!==r.length)return!1;for(let s=0,o=i[s];s<i.length;o=i[++s])if(o!==r[s]||!Es(e[o],t[o]))return!1;return!0}return U1(e)&&e.toString()===t.toString()}const Rh=(e,t)=>{if(e===null)return"null";if(e===void 0)return"undefined";if(Ii(e)||Vn(e)||Pa(e))return JSON.stringify(e);if(ru(e))return e.toISOString();if(bo(e)||tO(e)||vv(e))return e.toString();if(t instanceof Set||(t=new Set),t.has(e))throw z1;try{if(t.add(e),Pt(e))return"["+e.map(i=>Rh(i,t)).join(",")+"]";if(wn(e))return"{"+Object.keys(e).sort().map(r=>`${r}:${Rh(e[r],t)}`).join()+"}";const n=U1(e)?e.toString():Rh(rO(e),t);return iu(e)+"("+n+")"}finally{t.delete(e)}};function sO(e,t){return ei(e)?null:(t=t||kf,t(e))}function oO(e,t,n=kf){if(e.length<1)return new Map;const i=new Map,r=new Map;for(let s=0;s<e.length;s++){const o=e[s],a=t(o,s),c=sO(a,n);if(c===null)r.has(null)?r.get(null).push(o):r.set(null,[o]);else{const l=i.has(c)?i.get(c).find(u=>Es(u,a)):null;ei(l)?(r.set(a,[o]),i.has(c)?i.get(c).push(a):i.set(c,[a])):r.get(l).push(o)}}return r}function Ig(e,t){return W1(e)?e[t]:void 0}function aO(e,t){if(t<1)return e;for(;t--&&e.length===1;)e=e[0];return e}function Oo(e,t,n){let i=0;function r(o,a){let c=o;for(let l=0;l<a.length;l++){const u=a[l];if(/^\d+$/.exec(u)===null&&Pt(c)){if(l===0&&i>0)break;i+=1;const d=a.slice(l);c=c.reduce((f,p)=>{const g=r(p,d);return g!==void 0&&f.push(g),f},[]);break}else c=Ig(c,u);if(c===void 0)break}return c}const s=j1(e)?e:r(e,t.split("."));return Pt(s)&&n?.unwrapArray?aO(s,i):s}function $l(e,t,n){const i=t.indexOf("."),r=i==-1?t:t.substring(0,i),s=t.substring(i+1),o=i!=-1;if(Pt(e)){const l=/^\d+$/.test(r),u=l&&n?.preserveIndex?[...e]:[];if(l){const h=parseInt(r);let d=Ig(e,h);o&&(d=$l(d,s,n)),n?.preserveIndex?u[h]=d:u.push(d)}else for(const h of e){const d=$l(h,t,n);n?.preserveMissing?u.push(d??nu):(d!=null||n?.preserveIndex)&&u.push(d)}return u}const a=n?.preserveKeys?{...e}:{};let c=Ig(e,r);if(o&&(c=$l(c,s,n)),c!==void 0)return a[r]=c,a}function Pg(e){if(Pt(e))for(let t=e.length-1;t>=0;t--)e[t]===nu?e.splice(t,1):Pg(e[t]);else if(wn(e))for(const t in e)Ka(e,t)&&Pg(e[t])}const xy=/^\d+$/;function Cd(e,t,n,i){const r=t.split("."),s=r[0],o=r.slice(1).join(".");if(r.length===1)(wn(e)||Pt(e)&&xy.test(s))&&n(e,s);else{i?.buildGraph&&ei(e[s])&&(e[s]={});const a=e[s];if(!a)return;const c=!!(r.length>1&&xy.test(r[1]));Pt(a)&&i?.descendArray&&!c?a.forEach(l=>Cd(l,o,n,i)):Cd(a,o,n,i)}}function cO(e,t,n){Cd(e,t,(i,r)=>{i[r]=vv(n)?n(i[r]):n},{buildGraph:!0})}function Cy(e,t,n){Cd(e,t,(i,r)=>{if(Pt(i)){if(/^\d+$/.test(r))i.splice(parseInt(r),1);else if(n&&n.descendArray)for(const s of i)wn(s)&&delete s[r]}else wn(i)&&delete i[r]},n)}const lO=/^\$[a-zA-Z0-9_]+$/;function Xo(e){return lO.test(e)}function Y1(e){if(j1(e))return bo(e)?{$regex:e}:{$eq:e};if(W1(e)){if(!Object.keys(e).some(Xo))return{$eq:e};if(Ka(e,"$regex")){const t={...e};return t.$regex=new RegExp(e.$regex,e.$options),delete t.$options,t}}return e}var Rg=(e=>(e[e.CLONE_OFF=0]="CLONE_OFF",e[e.CLONE_INPUT=1]="CLONE_INPUT",e[e.CLONE_OUTPUT=2]="CLONE_OUTPUT",e[e.CLONE_ALL=3]="CLONE_ALL",e))(Rg||{});class _o{#t;#n;#e;constructor(t,n,i){this.#t=t,this.update(n,i)}static init(t,n,i){return t instanceof _o?new _o(t.#t,t.root??n,{...t.#e,...i,variables:Object.assign({},t.#e?.variables,i?.variables)}):new _o(t,n,i)}update(t,n){this.#n=t;const i=Object.assign({},this.#e?.variables,n?.variables);return Object.keys(i).length?this.#e={...n,variables:i}:this.#e=n??{},this}getOptions(){return Object.freeze({...this.#t,context:Io.from(this.#t.context)})}get root(){return this.#n}get local(){return this.#e}get idKey(){return this.#t.idKey}get collation(){return this.#t?.collation}get processingMode(){return this.#t?.processingMode||0}get useStrictMode(){return this.#t?.useStrictMode}get scriptEnabled(){return this.#t?.scriptEnabled}get useGlobalContext(){return this.#t?.useGlobalContext}get hashFunction(){return this.#t?.hashFunction}get collectionResolver(){return this.#t?.collectionResolver}get jsonSchemaValidator(){return this.#t?.jsonSchemaValidator}get variables(){return this.#t?.variables}get context(){return this.#t?.context}}function uO(e){return e instanceof _o?e.getOptions():Object.freeze({idKey:"_id",scriptEnabled:!0,useStrictMode:!0,useGlobalContext:!0,processingMode:0,...e,context:e?.context?Io.from(e?.context):Io.init()})}class Io{#t=new Map;constructor(){}static init(){return new Io}static from(t){const n=Io.init();return ei(t)||t.#t.forEach((i,r)=>n.addOperators(r,i)),n}addOperators(t,n){this.#t.has(t)||this.#t.set(t,{});for(const[i,r]of Object.entries(n))this.getOperator(t,i)||(this.#t.get(t)[i]=r);return this}getOperator(t,n){return(this.#t.get(t)??{})[n]??null}addAccumulatorOps(t){return this.addOperators("accumulator",t)}addExpressionOps(t){return this.addOperators("expression",t)}addQueryOps(t){return this.addOperators("query",t)}addPipelineOps(t){return this.addOperators("pipeline",t)}addProjectionOps(t){return this.addOperators("projection",t)}addWindowOps(t){return this.addOperators("window",t)}}const so=Io.init();function ky(e,t){for(const[n,i]of Object.entries(t)){Oe(vv(i)&&Xo(n),`'${n}' is not a valid operator`);const r=ou(e,n,null);Oe(!r||i===r,`${n} already exists for '${e}' operators. Cannot change operator function once registered.`)}switch(e){case"accumulator":so.addAccumulatorOps(t);break;case"expression":so.addExpressionOps(t);break;case"pipeline":so.addPipelineOps(t);break;case"projection":so.addProjectionOps(t);break;case"query":so.addQueryOps(t);break;case"window":so.addWindowOps(t);break}}function ou(e,t,n){const{context:i,useGlobalContext:r}=n||{},s=i?i.getOperator(e,t):null;return!s&&r?so.getOperator(e,t):s}function va(e,t,n,i){const r=_o.init(i,e);return n&&Xo(n)?q1(e,t,n,r):kd(e,t,r)}const hO=["$$ROOT","$$CURRENT","$$REMOVE","$$NOW"];function kd(e,t,n){if(Ii(t)&&t.length>0&&t[0]==="$"){if(dO.includes(t))return t;let i=n.root;const r=t.split(".");if(hO.includes(r[0])){switch(r[0]){case"$$ROOT":break;case"$$CURRENT":i=e;break;case"$$REMOVE":i=void 0;break;case"$$NOW":i=new Date;break}t=t.slice(r[0].length+1)}else if(r[0].slice(0,2)==="$$"){i=Object.assign({},n.variables,{this:e},n?.local?.variables);const s=r[0].slice(2);Oe(Ka(i,s),`Use of undefined variable: ${s}`),t=t.slice(2)}else t=t.slice(1);return t===""?i:Oo(i,t)}if(Pt(t))return t.map(i=>kd(e,i,n));if(wn(t)){const i={},r=Object.entries(t);for(const[s,o]of r){if(Xo(s))return Oe(r.length==1,"expression must have single operator."),q1(e,o,s,n);i[s]=kd(e,o,n)}return i}return t}function q1(e,t,n,i){const r=ou("expression",n,i);if(r)return r(e,t,i);const s=ou("accumulator",n,i);return Oe(!!s,`accumulator '${n}' is not registered.`),Pt(e)||(e=kd(e,t,i),t=null),Oe(Pt(e),`arguments must resolve to array for ${n}.`),s(e,t,i)}const dO=["$$KEEP","$$PRUNE","$$DESCEND"];function au(e){return e instanceof Sy?e:new Sy(e)}function fO(...e){let t=0;return au(()=>{for(;t<e.length;){const n=e[t].next();if(!n.done)return n;t++}return{done:!0}})}function pO(e){return!!e&&typeof e=="object"&&e?.next instanceof Function}function gO(e,t){const n=e.slice(t+1);e.splice(t),Array.prototype.push.apply(e,n)}const Ag=new Error;function mO(e,t,n){let i=!1,r=-1,s=0;return function(o){try{t:for(;!i;){let a=e();r++;let c=-1;const l=t.length;let u=!1;for(;++c<l;){const h=t[c];switch(h.action){case 0:a=h.func(a,r);break;case 1:if(!h.func(a,r))continue t;break;case 2:--h.count,h.count||(u=!0);break;case 3:--h.count,h.count||gO(t,c);continue t;default:break t}}if(i=u,o)n[s++]=a;else return{value:a,done:!1}}}catch(a){if(a!==Ag)throw a}return i=!0,{done:i}}}let Sy=class{constructor(t){this.#t=[],this.#n=[],this.isDone=!1;let n;if(t instanceof Function&&(t={next:t}),pO(t)){const i=t;n=()=>{const r=i.next();if(r.done)throw Ag;return r.value}}else if(Pt(t)){const i=t,r=i.length;let s=0;n=()=>{if(s<r)return i[s++];throw Ag}}else if(!(t instanceof Function))throw new Cf("Lazy must be initialized with an array, generator, or function.");this.#e=mO(n,this.#t,this.#n)}#t;#n;#e;push(t,n){return typeof n=="function"?this.#t.push({action:t,func:n}):typeof n=="number"&&this.#t.push({action:t,count:n}),this}next(){return this.#e()}map(t){return this.push(0,t)}filter(t){return this.push(1,t)}take(t){return t>0?this.push(2,t):this}drop(t){return t>0?this.push(3,t):this}transform(t){const n=this;let i;return au(()=>(i||(i=au(t(n.value()))),i.next()))}value(){return this.isDone||(this.isDone=this.#e(!0).done),this.#n}each(t){for(;;){const n=this.next();if(n.done)break;if(t(n.value)===!1)return!1}return!0}reduce(t,n){let i=this.next();for(n===void 0&&!i.done&&(n=i.value,i=this.next());!i.done;)n=t(n,i.value),i=this.next();return n}size(){return this.reduce((t,n)=>++t,0)}[Symbol.iterator](){return this}};const vO=(e,t,n)=>e.take(t),V1=(e,t,n)=>yv(t)?e:(G1(t,n),e.map(K1(t,_o.init(n))));function K1(e,t,n=!0){const i=t.idKey,r=Object.keys(e),s=new Array,o=new Array,a={};for(const f of r){const p=e[f];if(Vn(p)||Pa(p))p?o.push(f):s.push(f);else if(Pt(p))a[f]=g=>p.map(m=>va(g,m,null,t.update(g))??null);else if(wn(p)){const g=Object.keys(p),m=g.length==1?g[0]:"",b=ou("projection",m,t);b?m==="$slice"&&!Au(p[m]).every(Vn)?a[f]=C=>va(C,p,f,t.update(C)):a[f]=C=>b(C,p[m],f,t.update(C)):Xo(m)?a[f]=_=>va(_,p[m],m,t):(G1(p,t),a[f]=_=>{if(!Ka(_,f))return va(_,p,null,t);n&&t.update(_);const C=Oo(_,f),S=K1(p,t,!1);return Pt(C)?C.map(S):wn(C)?S(C):S(_)})}else a[f]=Ii(p)&&p[0]==="$"?g=>va(g,p,f,t):g=>p}const c=Object.keys(a),l=s.includes(i);if(n&&l&&s.length===1&&!o.length&&!c.length)return f=>{const p={...f};return delete p[i],p};const h=n&&!l&&!o.includes(i),d={preserveMissing:!0};return f=>{const p={};if(s.length&&!o.length){Og(p,f);for(const g of s)Cy(p,g,{descendArray:!0})}for(const g of o){const m=$l(f,g,d)??{};Og(p,m)}o.length&&Pg(p);for(const g of c){const m=a[g](f);m===void 0?Cy(p,g,{descendArray:!0}):cO(p,g,m)}return h&&Ka(f,i)&&(p[i]=Oo(f,i)),p}}function G1(e,t){let n=!1,i=!1;for(const[r,s]of Object.entries(e))Oe(!r.startsWith("$"),"Field names may not start with '$'."),Oe(!r.endsWith(".$"),"Positional projection operator '$' is not supported."),r!==t?.idKey&&(s===0||s===!1?n=!0:(s===1||s===!0)&&(i=!0),Oe(!(n&&i),"Projection cannot have a mix of inclusion and exclusion."))}const yO=(e,t,n)=>e.drop(t),X1=(e,t,n)=>{if(yv(t)||!wn(t))return e;let i=Is;const r=n.collation;return wn(r)&&Ii(r.locale)&&(i=_O(r)),e.transform(s=>{const o=Object.keys(t);for(const a of o.reverse()){const c=oO(s,h=>Oo(h,a),n.hashFunction),l=Array.from(c.keys()).sort(i);t[a]===-1&&l.reverse();let u=0;for(const h of l)for(const d of c.get(h))s[u++]=d;Oe(u==s.length,"bug: counter must match collection size.")}return s})},bO={1:"base",2:"accent",3:"variant"};function _O(e){const t={sensitivity:bO[e.strength||3],caseFirst:e.caseFirst==="off"?"false":e.caseFirst||"false",numeric:e.numericOrdering||!1,ignorePunctuation:e.alternate==="shifted"};(e.caseLevel||!1)===!0&&(t.sensitivity==="base"&&(t.sensitivity="case"),t.sensitivity==="accent"&&(t.sensitivity="variant"));const n=new Intl.Collator(e.locale,t);return(i,r)=>{if(!Ii(i)||!Ii(r))return Is(i,r);const s=n.compare(i,r);return s<0?-1:s>0?1:0}}const wO={$sort:X1,$skip:yO,$limit:vO};class xO{#t;#n;#e;#r;#o={};#i=null;#s=[];constructor(t,n,i,r){this.#t=t,this.#n=n,this.#e=i,this.#r=r}fetch(){if(this.#i)return this.#i;this.#i=au(this.#t).filter(this.#n);const t=this.#r.processingMode;t&Rg.CLONE_INPUT&&this.#i.map(su);for(const n of["$sort","$skip","$limit"])Ka(this.#o,n)&&(this.#i=wO[n](this.#i,this.#o[n],this.#r));return Object.keys(this.#e).length&&(this.#i=V1(this.#i,this.#e,this.#r)),t&Rg.CLONE_OUTPUT&&this.#i.map(su),this.#i}fetchAll(){const t=au([...this.#s]);return this.#s=[],fO(t,this.fetch())}all(){return this.fetchAll().value()}count(){return this.all().length}skip(t){return this.#o.$skip=t,this}limit(t){return this.#o.$limit=t,this}sort(t){return this.#o.$sort=t,this}collation(t){return this.#r={...this.#r,collation:t},this}next(){if(this.#s.length>0)return this.#s.pop();const t=this.fetch().next();if(!t.done)return t.value}hasNext(){if(this.#s.length>0)return!0;const t=this.fetch().next();return t.done?!1:(this.#s.push(t.value),!0)}map(t){return this.all().map(t)}forEach(t){this.all().forEach(t)}[Symbol.iterator](){return this.fetchAll()}}const CO=new Set(Array.from(["$and","$or","$nor","$expr","$jsonSchema"]));class Lu{#t;#n;#e;constructor(t,n){this.#e=su(t),this.#n=uO(n),this.#t=[],this.compile()}compile(){Oe(wn(this.#e),`query criteria must be an object: ${JSON.stringify(this.#e)}`);const t={};for(const[n,i]of Object.entries(this.#e)){if(n==="$where")Oe(this.#n.scriptEnabled,"$where operator requires 'scriptEnabled' option to be true."),Object.assign(t,{field:n,expr:i});else if(CO.has(n))this.processOperator(n,n,i);else{Oe(!Xo(n),`unknown top level operator: ${n}`);for(const[r,s]of Object.entries(Y1(i)))this.processOperator(n,r,s)}t.field&&this.processOperator(t.field,t.field,t.expr)}}processOperator(t,n,i){const r=ou("query",n,this.#n);Oe(!!r,`unknown query operator ${n}`),this.#t.push(r(t,i,this.#n))}test(t){return this.#t.every(n=>n(t))}find(t,n){return new xO(t,i=>this.test(i),n||{},this.#n)}remove(t){return t.reduce((n,i)=>(this.test(i)||n.push(i),n),[])}}const kO=["monday","mon","tuesday","tue","wednesday","wed","thursday","thu","friday","fri","saturday","sat","sunday","sun"];new Set(kO);function ii(e){return(n,i,r)=>{const s={unwrapArray:!0},o=Math.max(1,n.split(".").length-1);return a=>{const c=Oo(a,n,s);return e(c,i,{...r,depth:o})}}}function Q1(e,t,n){return Es(e,t)||ei(e)&&ei(t)?!0:Pt(e)?e.some(i=>Es(i,t))||H1(e,n?.depth).some(i=>Es(i,t)):!1}function SO(e,t,n){return!Q1(e,t,n)}function Z1(e,t,n){return ei(e)?t.some(i=>i===null):iO([Au(e),t],n?.hashFunction).length>0}function EO(e,t,n){return!Z1(e,t,n)}function MO(e,t,n){return Sf(e,t,(i,r)=>Is(i,r)<0)}function DO(e,t,n){return Sf(e,t,(i,r)=>Is(i,r)<=0)}function $O(e,t,n){return Sf(e,t,(i,r)=>Is(i,r)>0)}function TO(e,t,n){return Sf(e,t,(i,r)=>Is(i,r)>=0)}function OO(e,t,n){return Au(e).some(i=>t.length===2&&i%t[0]===t[1])}function IO(e,t,n){const i=Au(e),r=s=>Ii(s)&&eO(t.exec(s),n?.useStrictMode);return i.some(r)||H1(i,1).some(r)}function PO(e,t,n){return Array.isArray(e)&&e.length===t}function RO(e){return Xo(e)&&["$and","$or","$nor"].indexOf(e)===-1}function AO(e,t,n){if(Pt(e)&&!yv(e)){let i=o=>o,r=t;Object.keys(t).every(RO)&&(r={temp:t},i=o=>({temp:o}));const s=new Lu(r,n);for(let o=0,a=e.length;o<a;o++)if(s.test(i(e[o])))return!0}return!1}const Ey=e=>e===null,LO={array:Pt,boolean:Pa,bool:Pa,date:ru,number:Vn,int:Vn,long:Vn,double:Vn,decimal:Vn,null:Ey,object:wn,regexp:bo,regex:bo,string:Ii,undefined:ei,function:e=>{throw new Cf("unsupported type key `function`.")},1:Vn,2:Ii,3:wn,4:Pt,6:ei,8:Pa,9:ru,10:Ey,11:bo,16:Vn,18:Vn,19:Vn};function My(e,t,n){const i=LO[t];return i?i(e):!1}function NO(e,t,n){return Pt(t)?t.findIndex(i=>My(e,i))>=0:My(e,t)}function Sf(e,t,n){return Au(e).some(i=>iu(i)===iu(t)&&n(i,t))}const Dy=(e,t)=>{const n={};return e.split("").forEach((i,r)=>n[i]=t*(r+1)),n};({...Dy("ABCDEFGHIKLM",1),...Dy("NOPQRSTUVWXY",-1)});const $y={undefined:null,null:null,NaN:NaN,Infinity:new Error,"-Infinity":new Error};function ri(e,t=$y){const n=Object.assign({},$y,t),i=new Set(Object.keys(n));return(r,s,o)=>{const a=va(r,s,null,o);if(i.has(`${a}`)){const c=n[`${a}`];if(c instanceof Error)throw new Cf(`cannot apply $${e.name} to -inf, value must in (-inf,inf)`);return c}return e(a)}}ri(Math.acos,{Infinity:1/0,0:new Error});ri(Math.acosh,{Infinity:1/0,0:new Error});ri(Math.asin);ri(Math.asinh,{Infinity:1/0,"-Infinity":-1/0});ri(Math.atan);ri(Math.atanh,{1:1/0,"-1":-1/0});ri(Math.cos);ri(Math.cosh,{"-Infinity":1/0,Infinity:1/0});const FO=Math.PI/180;ri(e=>e*FO,{Infinity:1/0,"-Infinity":1/0});const zO=180/Math.PI;ri(e=>e*zO,{Infinity:1/0,"-Infinity":-1/0});ri(Math.sin);ri(Math.sinh,{"-Infinity":-1/0,Infinity:1/0});ri(Math.tan);const jO=(e,t,n)=>{Oe(Pt(t),"Invalid expression: $and expects value to be an Array.");const i=t.map(r=>new Lu(r,n));return r=>i.every(s=>s.test(r))},J1=(e,t,n)=>{Oe(Pt(t),"Invalid expression. $or expects value to be an Array");const i=t.map(r=>new Lu(r,n));return r=>i.some(s=>s.test(r))},BO=(e,t,n)=>{Oe(Pt(t),"Invalid expression. $nor expects value to be an array.");const i=J1("$or",t,n);return r=>!i(r)},WO=(e,t,n)=>{const i={};i[e]=Y1(t);const r=new Lu(i,n);return s=>!r.test(s)},HO=ii(Q1),UO=ii($O),YO=ii(TO),qO=ii(Z1),VO=ii(MO),KO=ii(DO),GO=ii(SO),XO=ii(EO),QO=ii(OO),ZO=ii(IO),JO=ii(AO),tI=ii(PO),eI=(e,t,n)=>{const i=e.includes("."),r=!!t;return!i||e.match(/\.\d+$/)?s=>Oo(s,e)!==void 0===r:s=>{const o=$l(s,e,{preserveIndex:!0}),a=Oo(o,e.substring(0,e.lastIndexOf(".")));return Pt(a)?a.some(c=>c!==void 0)===r:a!==void 0===r}},nI=ii(NO);var Ty=!1;function iI(e){return Ty||(ky("pipeline",{$sort:X1,$project:V1}),ky("query",{$and:jO,$eq:HO,$elemMatch:JO,$exists:eI,$gt:UO,$gte:YO,$in:qO,$lt:VO,$lte:KO,$ne:GO,$nin:XO,$mod:QO,$nor:BO,$not:WO,$or:J1,$regex:ZO,$size:tI,$type:nI}),Ty=!0),new Lu(e)}function Ra(e,t){var n=Ai(e.primaryKey);t=qt(t);var i=Fn(t);if(typeof i.skip!="number"&&(i.skip=0),i.selector?(i.selector=i.selector,Object.entries(i.selector).forEach(([h,d])=>{(typeof d!="object"||d===null)&&(i.selector[h]={$eq:d})})):i.selector={},i.index){var r=md(i.index);r.includes(n)||r.push(n),i.index=r}if(i.sort){var u=i.sort.find(h=>b$(h)===n);u||(i.sort=i.sort.slice(0),i.sort.push({[n]:"asc"}))}else if(i.index)i.sort=i.index.map(h=>({[h]:"asc"}));else{if(e.indexes){var s=new Set;Object.entries(i.selector).forEach(([h,d])=>{var f=!1;typeof d=="object"&&d!==null?f=!!Object.keys(d).find(p=>mv.has(p)):f=!0,f&&s.add(h)});var o=-1,a;e.indexes.forEach(h=>{var d=vd(h)?h:[h],f=d.findIndex(p=>!s.has(p));f>0&&f>o&&(o=f,a=d)}),a&&(i.sort=a.map(h=>({[h]:"asc"})))}if(!i.sort)if(e.indexes&&e.indexes.length>0){var c=e.indexes[0],l=vd(c)?c:[c];i.sort=l.map(h=>({[h]:"asc"}))}else i.sort=[{[n]:"asc"}]}return i}function rI(e,t){if(!t.sort)throw U("SNH",{query:t});var n=[];t.sort.forEach(r=>{var s=Object.keys(r)[0],o=Object.values(r)[0];n.push({key:s,direction:o,getValueFn:y$(s)})});var i=(r,s)=>{for(var o=0;o<n.length;++o){var a=n[o],c=a.getValueFn(r),l=a.getValueFn(s);if(c!==l){var u=a.direction==="asc"?Is(c,l):Is(l,c);return u}}};return i}function tx(e,t){if(!t.sort)throw U("SNH",{query:t});var n=iI(t.selector),i=r=>n.test(r);return i}async function Ac(e,t){var n=await e.exec();if(!n)return null;if(Array.isArray(n))return Promise.all(n.map(r=>t(r)));if(n instanceof Map)return Promise.all([...n.values()].map(r=>t(r)));var i=await t(n);return i}function Ef(e,t){if(!t.sort)throw U("SNH",{query:t});var n=VT(e,t);return{query:t,queryPlan:n}}var sI="_rxdb_internal";async function yc(e,t){var n=await e.findDocumentsById([t],!1),i=n[0];if(i)return i}async function Ga(e,t,n){var i=await e.bulkWrite([t],n);if(i.error.length>0){var r=i.error[0];throw r}else{var s=Ai(e.schema.primaryKey),o=bi(s,[t],i),a=o[0];return a}}function oI(e,t){var n=yc(e,t),i=e.changeStream().pipe(Ht(r=>r.events.find(s=>s.documentId===t)),Ot(r=>!!r),Ht(r=>Promise.resolve(Q(r).documentData)),Ru(n),L1(r=>r),Ot(r=>!!r));return i}function cu(e){return Object.assign({},...e.filter(t=>!!t))}function Sd(e,t,n,i){if(i)throw i.status===409?U("CONFLICT",{collection:e.name,id:t,writeError:i,data:n}):i.status===422?U("VD2",{collection:e.name,id:t,writeError:i,data:n}):i}function KB(e,t,n,i,r,s,o){for(var a=!!e.schema.attachments,c=[],l=[],u=[],h=Ko(10),d={id:h,events:[],checkpoint:null,context:r},f=d.events,p=[],g=[],m=[],b=n.size>0,_,C=i.length,S=function(){var $=i[k],D=$.document,w=$.previous,x=D[t],M=D._deleted,O=w&&w._deleted,T=void 0;b&&(T=n.get(x));var R;if(T){var Y=T._rev;if(!w||w&&Y!==w._rev){var F={isError:!0,status:409,documentId:x,writeRow:$,documentInDb:T};return u.push(F),1}var G=a?Dp($):$;a&&(M?w&&Object.keys(w._attachments).forEach(L=>{g.push({documentId:x,attachmentId:L,digest:Q(w)._attachments[L].digest})}):(Object.entries(D._attachments).find(([L,ot])=>{var kt=w?w._attachments[L]:void 0;return!kt&&!ot.data&&(R={documentId:x,documentInDb:T,isError:!0,status:510,writeRow:$,attachmentId:L}),!0}),R||Object.entries(D._attachments).forEach(([L,ot])=>{var kt=w?w._attachments[L]:void 0;if(!kt)p.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest});else{var Lt=G.document._attachments[L].digest;ot.data&&kt.digest!==Lt&&m.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest})}}))),R?u.push(R):(a?l.push(Dp(G)):l.push(G),_=G);var B=null,q=null,W=null;if(O&&!M)W="INSERT",B=a?Vi(D):D;else if(w&&!O&&!M)W="UPDATE",B=a?Vi(D):D,q=w;else if(M)W="DELETE",B=Q(D),q=w;else throw U("SNH",{args:{writeRow:$}});var V={documentId:x,documentData:B,previousDocumentData:q,operation:W};f.push(V)}else{var j=!!M;if(a&&Object.entries(D._attachments).forEach(([L,ot])=>{ot.data?p.push({documentId:x,attachmentId:L,attachmentData:ot,digest:ot.digest}):(R={documentId:x,isError:!0,status:510,writeRow:$,attachmentId:L},u.push(R))}),R||(a?c.push(Dp($)):c.push($),_=$),!j){var z={documentId:x,operation:"INSERT",documentData:a?Vi(D):D,previousDocumentData:a&&w?Vi(w):w};f.push(z)}}},k=0;k<C;k++)S();return{bulkInsertDocs:c,bulkUpdateDocs:l,newestRow:_,errors:u,eventBulk:d,attachmentsAdd:p,attachmentsRemove:g,attachmentsUpdate:m}}function Dp(e){return{previous:e.previous,document:Vi(e.document)}}function aI(e){return atob(e).length}function cI(e){var t=e.data;if(!t)return e;var n={length:aI(t),digest:e.digest,type:e.type};return n}function Vi(e){if(!e._attachments||Object.keys(e._attachments).length===0)return e;var t=qt(e);return t._attachments={},Object.entries(e._attachments).forEach(([n,i])=>{t._attachments[n]=cI(i)}),t}function Mf(e){return Object.assign({},e,{_meta:qt(e._meta)})}function bv(e,t,n){At.deepFreezeWhenDevMode(n);var i=Ai(t.schema.primaryKey),r={originalStorageInstance:t,schema:t.schema,internals:t.internals,collectionName:t.collectionName,databaseName:t.databaseName,options:t.options,async bulkWrite(s,o){for(var a=e.token,c=new Array(s.length),l=Ri(),u=0;u<s.length;u++){var h=s[u],d=Mf(h.document);d._meta.lwt=l;var f=h.previous;d._rev=jr(a,f),c[u]={document:d,previous:f}}zn("preStorageWrite",{storageInstance:this.originalStorageInstance,rows:c});var p=await e.lockedRun(()=>t.bulkWrite(c,o)),g={error:[]};nx.set(g,c);var m=p.error.length===0?[]:p.error.filter($=>$.status===409&&!$.writeRow.previous&&!$.writeRow.document._deleted&&Q($.documentInDb)._deleted?!0:(g.error.push($),!1));if(m.length>0){var b=new Set,_=m.map($=>(b.add($.documentId),{previous:$.documentInDb,document:Object.assign({},$.writeRow.document,{_rev:jr(e.token,$.documentInDb)})})),C=await e.lockedRun(()=>t.bulkWrite(_,o));Mo(g.error,C.error);var S=bi(i,c,g,b),k=bi(i,_,C);return Mo(S,k),g}return g},query(s){return e.lockedRun(()=>t.query(s))},count(s){return e.lockedRun(()=>t.count(s))},findDocumentsById(s,o){return e.lockedRun(()=>t.findDocumentsById(s,o))},getAttachmentData(s,o,a){return e.lockedRun(()=>t.getAttachmentData(s,o,a))},getChangedDocumentsSince:t.getChangedDocumentsSince?(s,o)=>e.lockedRun(()=>t.getChangedDocumentsSince(Q(s),o)):void 0,cleanup(s){return e.lockedRun(()=>t.cleanup(s))},remove(){return e.storageInstances.delete(r),e.lockedRun(()=>t.remove())},close(){return e.storageInstances.delete(r),e.lockedRun(()=>t.close())},changeStream(){return t.changeStream()}};return e.storageInstances.add(r),r}function GB(e){if(e.schema.keyCompression)throw U("UT5",{args:{params:e}});if(Ed(e.schema))throw U("UT6",{args:{params:e}});if(e.schema.attachments&&e.schema.attachments.compression)throw U("UT7",{args:{params:e}})}function Ed(e){return!!(e.encrypted&&e.encrypted.length>0||e.attachments&&e.attachments.encrypted)}function lI(e,t,n){var i=Ai(e.schema.primaryKey),r=n?n.lwt:sv,s=n?n.id:"";return Ra(e.schema,{selector:{$or:[{"_meta.lwt":{$gt:r}},{"_meta.lwt":{$eq:r},[i]:{$gt:n?s:""}}],"_meta.lwt":{$gte:r}},sort:[{"_meta.lwt":"asc"},{[i]:"asc"}],skip:0,limit:t})}async function ex(e,t,n){if(e.getChangedDocumentsSince)return e.getChangedDocumentsSince(t,n);var i=Ai(e.schema.primaryKey),r=Ef(e.schema,lI(e,t,n)),s=await e.query(r),o=s.documents,a=g$(o);return{documents:o,checkpoint:a?{id:a[i],lwt:a._meta.lwt}:n||{id:"",lwt:0}}}var nx=new WeakMap,uI=new WeakMap;function bi(e,t,n,i){return yi(uI,n,()=>{var r=[],s=nx.get(n);if(s||(s=t),n.error.length>0||i){for(var o=i||new Set,a=0;a<n.error.length;a++){var c=n.error[a];o.add(c.documentId)}for(var l=0;l<s.length;l++){var u=s[l].document;o.has(u[e])||r.push(Vi(u))}}else{r.length=t.length-n.error.length;for(var h=0;h<s.length;h++){var d=s[h].document;r[h]=Vi(d)}}return r})}var ix=(function(){function e(n,i,r,s){this.queueByDocId=new Map,this.isRunning=!1,this.storageInstance=n,this.primaryPath=i,this.preWrite=r,this.postWrite=s}var t=e.prototype;return t.addWrite=function(i,r){var s=i[this.primaryPath],o=yi(this.queueByDocId,s,()=>[]),a=new Promise((c,l)=>{var u={lastKnownDocumentState:i,modifier:r,resolve:c,reject:l};Q(o).push(u),this.triggerRun()});return a},t.triggerRun=async function(){if(!(this.isRunning===!0||this.queueByDocId.size===0)){this.isRunning=!0;var i=[],r=this.queueByDocId;this.queueByDocId=new Map,await Promise.all(Array.from(r.entries()).map(async([o,a])=>{var c=hI(a.map(h=>h.lastKnownDocumentState)),l=c;for(var u of a)try{l=await u.modifier(Fn(l))}catch(h){u.reject(h),u.reject=()=>{},u.resolve=()=>{}}try{await this.preWrite(l,c)}catch(h){a.forEach(d=>d.reject(h));return}i.push({previous:c,document:l})}));var s=i.length>0?await this.storageInstance.bulkWrite(i,"incremental-write"):{error:[]};return await Promise.all(bi(this.primaryPath,i,s).map(o=>{var a=o[this.primaryPath];this.postWrite(o);var c=Ya(r,a);c.forEach(l=>l.resolve(o))})),s.error.forEach(o=>{var a=o.documentId,c=Ya(r,a),l=Ha(o);if(l){var u=yi(this.queueByDocId,a,()=>[]);c.reverse().forEach(d=>{d.lastKnownDocumentState=Q(l.documentInDb),Q(u).unshift(d)})}else{var h=l1(o);c.forEach(d=>d.reject(h))}}),this.isRunning=!1,this.triggerRun()}},e})();function Oy(e){var t=async n=>{var i=_$(n);i._deleted=n._deleted;var r=await e(i),s=Object.assign({},r,{_meta:n._meta,_attachments:n._attachments,_rev:n._rev,_deleted:typeof r._deleted<"u"?r._deleted:n._deleted});return typeof s._deleted>"u"&&(s._deleted=!1),s};return t}function hI(e){var t=e[0],n=Os(t._rev);return e.forEach(i=>{var r=Os(i._rev);r>n&&(t=i,n=r)}),t}var Df={get primaryPath(){var e=this;if(e.isInstanceOfRxDocument)return e.collection.schema.primaryPath},get primary(){var e=this;if(e.isInstanceOfRxDocument)return e._data[e.primaryPath]},get revision(){var e=this;if(e.isInstanceOfRxDocument)return e._data._rev},get deleted$(){var e=this;if(e.isInstanceOfRxDocument)return e.$.pipe(Ht(t=>t._data._deleted))},get deleted$$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.deleted$,e.getLatest().deleted,e.collection.database)},get deleted(){var e=this;if(e.isInstanceOfRxDocument)return e._data._deleted},getLatest(){var e=this.collection._docCache.getLatestDocumentData(this.primary);return this.collection._docCache.getCachedRxDocument(e)},get $(){var e=this,t=this.primary;return e.collection.eventBulks$.pipe(Ot(n=>!n.isLocal),Ht(n=>n.events.find(i=>i.documentId===t)),Ot(n=>!!n),Ht(n=>N1(Q(n))),Ru(e.collection._docCache.getLatestDocumentData(t)),eu((n,i)=>n._rev===i._rev),Ht(n=>this.collection._docCache.getCachedRxDocument(n)),Pu(Ou))},get $$(){var e=this,t=e.collection.database.getReactivityFactory();return t.fromObservable(e.$,e.getLatest()._data,e.collection.database)},get$(e){if(At.isDevMode()){if(e.includes(".item."))throw U("DOC1",{path:e});if(e===this.primaryPath)throw U("DOC2");if(this.collection.schema.finalFields.includes(e))throw U("DOC3",{path:e});var t=tu(this.collection.schema.jsonSchema,e);if(!t)throw U("DOC4",{path:e})}return this.$.pipe(Ht(n=>Ua(n,e)),eu())},get$$(e){var t=this.get$(e),n=this.collection.database.getReactivityFactory();return n.fromObservable(t,this.getLatest().get(e),this.collection.database)},populate(e){var t=tu(this.collection.schema.jsonSchema,e),n=this.get(e);if(!n)return lv;if(!t)throw U("DOC5",{path:e});if(!t.ref)throw U("DOC6",{path:e,schemaObj:t});var i=this.collection.database.collections[t.ref];if(!i)throw U("DOC7",{ref:t.ref,path:e,schemaObj:t});return t.type==="array"?i.findByIds(n).exec().then(r=>{var s=r.values();return Array.from(s)}):i.findOne(n).exec()},get(e){return ox(this,e)},toJSON(e=!1){if(e)return At.deepFreezeWhenDevMode(this._data);var t=qt(this._data);return delete t._rev,delete t._attachments,delete t._deleted,delete t._meta,At.deepFreezeWhenDevMode(t)},toMutableJSON(e=!1){return Fn(this.toJSON(e))},update(e){throw Rt("update")},incrementalUpdate(e){throw Rt("update")},updateCRDT(e){throw Rt("crdt")},putAttachment(){throw Rt("attachments")},putAttachmentBase64(){throw Rt("attachments")},getAttachment(){throw Rt("attachments")},allAttachments(){throw Rt("attachments")},get allAttachments$(){throw Rt("attachments")},async modify(e,t){var n=this._data,i=await Oy(e)(n);return this._saveData(i,n)},incrementalModify(e,t){return this.collection.incrementalWriteQueue.addWrite(this._data,Oy(e)).then(n=>this.collection._docCache.getCachedRxDocument(n))},patch(e){var t=this._data,n=Fn(t);return Object.entries(e).forEach(([i,r])=>{n[i]=r}),this._saveData(n,t)},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e,t){if(e=qt(e),this._data._deleted)throw U("DOC11",{id:this.primary,document:this});await sx(this.collection,e,t);var n=[{previous:t,document:e}],i=await this.collection.storageInstance.bulkWrite(n,"rx-document-save-data"),r=i.error[0];return Sd(this.collection,this.primary,e,r),await this.collection._runHooks("post","save",e,this),this.collection._docCache.getCachedRxDocument(bi(this.collection.schema.primaryPath,n,i)[0])},async remove(){if(this.deleted)return Promise.reject(U("DOC13",{document:this,id:this.primary}));var e=await this.collection.bulkRemove([this]);if(e.error.length>0){var t=e.error[0];Sd(this.collection,this.primary,this._data,t)}return e.success[0]},incrementalRemove(){return this.incrementalModify(async e=>(await this.collection._runHooks("pre","remove",e,this),e._deleted=!0,e)).then(async e=>(await this.collection._runHooks("post","remove",e._data,e),e))},close(){throw U("DOC14")}};function rx(e=Df){var t=function(i,r){this.collection=i,this._data=r,this._propertyCache=new Map,this.isInstanceOfRxDocument=!0};return t.prototype=e,t}function dI(e,t,n){var i=new e(t,n);return zn("createRxDocument",i),i}function sx(e,t,n){return t._meta=Object.assign({},n._meta,t._meta),At.isDevMode()&&e.schema.validateChange(n,t),e._runHooks("pre","save",t,n)}function ox(e,t){return yi(e._propertyCache,t,()=>{var n=Ua(e._data,t);if(typeof n!="object"||n===null||Array.isArray(n))return At.deepFreezeWhenDevMode(n);var i=new Proxy(qt(n),{get(r,s){if(typeof s!="string")return r[s];var o=s.charAt(s.length-1);if(o==="$")if(s.endsWith("$$")){var a=s.slice(0,-2);return e.get$$(Qc(t+"."+a))}else{var c=s.slice(0,-1);return e.get$(Qc(t+"."+c))}else if(o==="_"){var l=s.slice(0,-1);return e.populate(Qc(t+"."+l))}else{var u=r[s];return typeof u=="number"||typeof u=="string"||typeof u=="boolean"?u:ox(e,Qc(t+"."+s))}}});return i})}function _v(e){return e[e.length-1]}function fI(e){const t=typeof e;return e!==null&&(t==="object"||t==="function")}function Iy(e,t,n){if(Array.isArray(t)&&(t=t.join(".")),!fI(e)||typeof t!="string")return e;const i=t.split(".");if(i.length===0)return n;for(let r=0;r<i.length;r++){const s=i[r];if(pI(e,s)?e=r===i.length-1?void 0:null:e=e[s],e==null){if(r!==i.length-1)return n;break}}return e===void 0?n:e}function pI(e,t){if(typeof t!="number"&&Array.isArray(e)){const n=Number.parseInt(t,10);return Number.isInteger(n)&&e[n]===e[t]}return!1}const ax=e=>!!e.queryParams.limit,gI=e=>e.queryParams.limit===1,mI=e=>!!(e.queryParams.skip&&e.queryParams.skip>0),vI=e=>e.changeEvent.operation==="DELETE",yI=e=>e.changeEvent.operation==="INSERT",bI=e=>e.changeEvent.operation==="UPDATE",_I=e=>ax(e)&&e.previousResults.length>=e.queryParams.limit,wI=e=>{const t=e.queryParams.sortFields,n=e.changeEvent.previous,i=e.changeEvent.doc;if(!i)return!1;if(!n)return!0;for(let r=0;r<t.length;r++){const s=t[r],o=Iy(n,s),a=Iy(i,s);if(o!==a)return!0}return!1},xI=e=>{const t=e.changeEvent.id;if(e.keyDocumentMap)return e.keyDocumentMap.has(t);{const n=e.queryParams.primaryKey,i=e.previousResults;for(let r=0;r<i.length;r++)if(i[r][n]===t)return!0;return!1}},CI=e=>{const t=e.previousResults[0];return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},kI=e=>{const t=_v(e.previousResults);return!!(t&&t[e.queryParams.primaryKey]===e.changeEvent.id)},SI=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},EI=e=>{const t=e.changeEvent.previous;if(!t)return!1;const n=_v(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},MI=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=e.previousResults[0];return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)<0:!1},DI=e=>{const t=e.changeEvent.doc;if(!t)return!1;const n=_v(e.previousResults);return n?n[e.queryParams.primaryKey]===e.changeEvent.id?!0:e.queryParams.sortComparator(t,n)>0:!1},$I=e=>{const t=e.changeEvent.previous;return t?e.queryParams.queryMatcher(t):!1},TI=e=>{const t=e.changeEvent.doc;return t?e.queryParams.queryMatcher(t):!1},OI=e=>e.previousResults.length===0,II={0:yI,1:bI,2:vI,3:ax,4:gI,5:mI,6:OI,7:_I,8:CI,9:kI,10:wI,11:xI,12:SI,13:EI,14:MI,15:DI,16:$I,17:TI};function PI(e,t,n,i){var r=e.length,s=r-1,o=0;if(r===0)return e.push(t),0;for(var a;i<=s;)o=i+(s-i>>1),a=e[o],n(a,t)<=0?i=o+1:s=o-1;return n(a,t)<=0&&o++,e.splice(o,0,t),o}const RI=e=>{},wv=e=>{e.previousResults.unshift(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},xv=e=>{e.previousResults.push(e.changeEvent.doc),e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,e.changeEvent.doc)},Cv=e=>{const t=e.previousResults.shift();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},kv=e=>{const t=e.previousResults.pop();e.keyDocumentMap&&t&&e.keyDocumentMap.delete(t[e.queryParams.primaryKey])},AI=e=>{Cv(e),xv(e)},LI=e=>{kv(e),wv(e)},NI=e=>{Cv(e),wv(e)},FI=e=>{kv(e),xv(e)},cx=e=>{e.keyDocumentMap&&e.keyDocumentMap.delete(e.changeEvent.id);const t=e.queryParams.primaryKey,n=e.previousResults;for(let i=0;i<n.length;i++)if(n[i][t]===e.changeEvent.id){n.splice(i,1);break}},zI=e=>{const t=e.changeEvent.doc,n=e.queryParams.primaryKey,i=e.previousResults;for(let r=0;r<i.length;r++)if(i[r][n]===e.changeEvent.id){i[r]=t,e.keyDocumentMap&&e.keyDocumentMap.set(e.changeEvent.id,t);break}},jI=e=>{const t={_id:"wrongHuman"+new Date().getTime()};e.previousResults.length=0,e.previousResults.push(t),e.keyDocumentMap&&(e.keyDocumentMap.clear(),e.keyDocumentMap.set(t._id,t))},lx=e=>{const t=e.changeEvent.id,n=e.changeEvent.doc;if(e.keyDocumentMap){if(e.keyDocumentMap.has(t))return;e.keyDocumentMap.set(t,n)}else if(e.previousResults.find(r=>r[e.queryParams.primaryKey]===t))return;PI(e.previousResults,n,e.queryParams.sortComparator,0)},BI=e=>{cx(e),lx(e)},WI=e=>{throw new Error("Action runFullQueryAgain must be implemented by yourself")},HI=e=>{throw new Error("Action unknownAction should never be called")},UI=["doNothing","insertFirst","insertLast","removeFirstItem","removeLastItem","removeFirstInsertLast","removeLastInsertFirst","removeFirstInsertFirst","removeLastInsertLast","removeExisting","replaceExisting","alwaysWrong","insertAtSortPosition","removeExistingAndInsertAtSortPosition","runFullQueryAgain","unknownAction"],YI={doNothing:RI,insertFirst:wv,insertLast:xv,removeFirstItem:Cv,removeLastItem:kv,removeFirstInsertLast:AI,removeLastInsertFirst:LI,removeFirstInsertFirst:NI,removeLastInsertLast:FI,removeExisting:cx,replaceExisting:zI,alwaysWrong:jI,insertAtSortPosition:lx,removeExistingAndInsertAtSortPosition:BI,runFullQueryAgain:WI,unknownAction:HI},qI=40;function $p(e){return e.charCodeAt(0)-qI}function VI(e){return e?"1":"0"}function Py(e,t){const n=[];for(let i=0,r=e.length;i<r;i+=t)n.push(e.substring(i,i+t));return n}function KI(e){const t=new Map,i=2+parseInt(e.charAt(0)+e.charAt(1),10)*2,r=e.substring(2,i),s=Py(r,2);for(let g=0;g<s.length;g++){const m=s[g],b=m.charAt(0),_=$p(m.charAt(1));t.set(b,_)}const o=e.substring(i,e.length-3),a=Py(o,4);for(let g=0;g<a.length;g++){const m=a[g],b=m.charAt(0),_=m.charAt(1),C=m.charAt(2),S=$p(m.charAt(3));if(!t.has(_))throw new Error("missing node with id "+_);if(!t.has(C))throw new Error("missing node with id "+C);const k=t.get(_),$=t.get(C),D={l:S,0:k,1:$};t.set(b,D)}const c=e.slice(-3),l=c.charAt(0),u=c.charAt(1),h=$p(c.charAt(2)),d=t.get(l),f=t.get(u);return{l:h,0:d,1:f}}function GI(e,t,n){let i=e,r=e.l;for(;;){const s=t[r](n),o=VI(s);if(i=i[o],typeof i=="number"||typeof i=="string")return i;r=i.l}}const XI="14a1b,c+d2e5f0g/h.i4j*k-l)m(n6oeh6pnm6qen6ril6snh6tin6ubo9vce9wmh9xns9yne9zmi9{cm9|ad9}cp9~aq9ae9¡bf9¢bq9£cg9¤ck9¥cn9¦nd9§np9¨nq9©nf9ªng9«nm9¬nk9­mr9®ms9¯mt9°mj9±mk9²ml9³mn9´mc8µ³{8¶¯}8·°¤8¸³§8¹mn8º³«8»³m8¼m´4½z²4¾³w4¿zµ4À¯¶4Á°·4Â³º4Ã³¸4Äm¹4Åv¤7Æyn7ÇÀÁ7È~7É¥¤7ÊÃÄ7Ë¨n7Ìº¹7Í­°7Î®m7Ï¯°7Ð±m7Ñ³m7Ò¼m5ÓÄm5Ô¹m5Õ½°5Ö¾m5×¿°5ØÇÏ5ÙÂm5ÚÊÑ5Û±m5Üºm5ÝÌÑ5ÞÕÍ2ß|2à¡u2á£Å2âÖÎ2ã¦Æ2ä©x2åªÆ2æ×Ø2ç|È2è¡¢2é£É2ê¤¥2ëÙÚ2ì¦Ë2í©n2îªn2ïÛÐ2ðÜÝ2ñ¬n2òÒÓ/óan/ôbn/õcn/öÞâ/÷ßã/øàä/ùáå/úæë/ûçì/üèí/ýéî/þÍÎ/ÿÏÑ/ĀòÔ,ācn,Ăöï,ă¤ñ,Ąúð,ąêñ,ĆþÐ,ćÿÑ,Ĉac0ĉbc0Ċóõ0ċôā0Čßá0čà¤0Ďçé0ďèê0Đ÷ù0đøă0Ēûý0ēüą0ĔmÒ-ĕmĀ-ĖÞæ-ėČĎ-Ęčď-ęĂĄ-ĚĐĒ-ěđē-Ĝ²»-ĝÍÏ-ĞĆć-ğ²³-ĠĔĈ3ġĕĊ3ĢĖė3ģęĚ3ĤĢĝ(ĥĜğ(ĦģĞ(ħĠġ+Ĩĉċ+ĩĤĦ+ĪĘě+īħĨ1ĬĩĪ1ĭĬī*Įĥm*ĭĮ.";let Tp;function QI(){return Tp||(Tp=KI(XI)),Tp}const ZI=e=>GI(QI(),II,e);function JI(e){const t=ZI(e);return UI[t]}function tP(e,t,n,i,r){const s=YI[e];return s({queryParams:t,changeEvent:n,previousResults:i,keyDocumentMap:r}),i}function eP(e,t){return!t.sort||t.sort.length===0?[e]:t.sort.map(n=>Object.keys(n)[0])}var nP=new WeakMap;function iP(e){return yi(nP,e,()=>{var t=e.collection,n=Ra(t.storageInstance.schema,Fn(e.mangoQuery)),i=t.schema.primaryPath,r=rI(t.schema.jsonSchema,n),s=(l,u)=>{var h={docA:l,docB:u};return r(h.docA,h.docB)},o=tx(t.schema.jsonSchema,n),a=l=>{var u={doc:l};return o(u.doc)},c={primaryKey:e.collection.schema.primaryPath,skip:n.skip,limit:n.limit,sortFields:eP(i,n),sortComparator:s,queryMatcher:a};return c})}function rP(e,t){if(!e.collection.database.eventReduce)return{runFullQueryAgain:!0};for(var n=iP(e),i=Q(e._result).docsData.slice(0),r=Q(e._result).docsDataMap,s=!1,o=[],a=0;a<t.length;a++){var c=t[a],l=YT(c);l&&o.push(l)}var u=o.find(h=>{var d={queryParams:n,changeEvent:h,previousResults:i,keyDocumentMap:r},f=JI(d);if(f==="runFullQueryAgain")return!0;if(f!=="doNothing")return s=!0,tP(f,n,h,i,r),!1});return u?{runFullQueryAgain:!0}:{runFullQueryAgain:!1,changed:s,newResults:i}}var sP=(function(){function e(){this._map=new Map}var t=e.prototype;return t.getByQuery=function(i){var r=i.toString(),s=yi(this._map,r,()=>i);return s},e})();function oP(){return new sP}function Ry(e,t){t.uncached=!0;var n=t.toString();e._map.delete(n)}function aP(e){return e.refCount$.observers.length}var cP=100,lP=30*1e3,uP=(e,t)=>(n,i)=>{if(!(i._map.size<e)){var r=Ri()-t,s=[],o=Array.from(i._map.values());for(var a of o)if(!(aP(a)>0)){if(a._lastEnsureEqual===0&&a._creationTime<r){Ry(i,a);continue}s.push(a)}var c=s.length-e;if(!(c<=0)){var l=s.sort((h,d)=>h._lastEnsureEqual-d._lastEnsureEqual),u=l.slice(0,c);u.forEach(h=>Ry(i,h))}}},ux=uP(cP,lP),Op=new WeakSet;function hP(e){Op.has(e)||(Op.add(e),T$().then(()=>I$(200)).then(()=>{e.closed||e.cacheReplacementPolicy(e,e._queryCache),Op.delete(e)}))}var hx=(function(){function e(n,i,r){this.cacheItemByDocId=new Map,this.tasks=new Set,this.registry=typeof FinalizationRegistry=="function"?new FinalizationRegistry(s=>{var o=s.docId,a=this.cacheItemByDocId.get(o);a&&(a[0].delete(s.revisionHeight+s.lwt+""),a[0].size===0&&this.cacheItemByDocId.delete(o))}):void 0,this.primaryPath=n,this.changes$=i,this.documentCreator=r,i.subscribe(s=>{this.tasks.add(()=>{for(var o=this.cacheItemByDocId,a=0;a<s.length;a++){var c=s[a],l=o.get(c.documentId);if(l){var u=c.documentData;u||(u=c.previousDocumentData),l[1]=u}}}),this.tasks.size<=1&&_f().then(()=>{this.processTasks()})})}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(r=>r()),this.tasks.clear()}},t.getLatestDocumentData=function(i){this.processTasks();var r=Ya(this.cacheItemByDocId,i);return r[1]},t.getLatestDocumentDataIfExists=function(i){this.processTasks();var r=this.cacheItemByDocId.get(i);if(r)return r[1]},Bs(e,[{key:"getCachedRxDocuments",get:function(){var n=Ay(this);return Ir(this,"getCachedRxDocuments",n)}},{key:"getCachedRxDocument",get:function(){var n=Ay(this);return Ir(this,"getCachedRxDocument",i=>n([i])[0])}}])})();function Ay(e){var t=e.primaryPath,n=e.cacheItemByDocId,i=e.registry,r=At.deepFreezeWhenDevMode,s=e.documentCreator,o=a=>{for(var c=new Array(a.length),l=[],u=0;u<a.length;u++){var h=a[u],d=h[t],f=Os(h._rev),p=void 0,g=void 0,m=n.get(d);m?(p=m[0],g=p.get(f+h._meta.lwt+"")):(p=new Map,m=[p,h],n.set(d,m));var b=g?g.deref():void 0;b||(h=r(h),b=s(h),p.set(f+h._meta.lwt+"",fP(b)),i&&l.push(b)),c[u]=b}return l.length>0&&i&&(e.tasks.add(()=>{for(var _=0;_<l.length;_++){var C=l[_];i.register(C,{docId:C.primary,revisionHeight:Os(C.revision),lwt:C._data._meta.lwt})}}),e.tasks.size<=1&&_f().then(()=>{e.processTasks()})),c};return o}function Lg(e,t){var n=e.getCachedRxDocuments;return n(t)}var dP=typeof WeakRef=="function",fP=dP?pP:gP;function pP(e){return new WeakRef(e)}function gP(e){return{deref(){return e}}}var Ly=(function(){function e(n,i,r){this.time=Ri(),this.query=n,this.count=r,this.documents=Lg(this.query.collection._docCache,i)}var t=e.prototype;return t.getValue=function(i){var r=this.query.op;if(r==="count")return this.count;if(r==="findOne"){var s=this.documents.length===0?null:this.documents[0];if(!s&&i)throw U("QU10",{collection:this.query.collection.name,query:this.query.mangoQuery,op:r});return s}else return r==="findByIds"?this.docsMap:this.documents.slice(0)},Bs(e,[{key:"docsData",get:function(){return Ir(this,"docsData",this.documents.map(n=>n._data))}},{key:"docsDataMap",get:function(){var n=new Map;return this.documents.forEach(i=>{n.set(i.primary,i._data)}),Ir(this,"docsDataMap",n)}},{key:"docsMap",get:function(){for(var n=new Map,i=this.documents,r=0;r<i.length;r++){var s=i[r];n.set(s.primary,s)}return Ir(this,"docsMap",n)}}])})(),mP=0,vP=function(){return++mP},dx=(function(){function e(n,i,r,s={}){this.id=vP(),this._execOverDatabaseCount=0,this._creationTime=Ri(),this._lastEnsureEqual=0,this.uncached=!1,this.refCount$=new ui(null),this._result=null,this._latestChangeEvent=-1,this._ensureEqualQueue=er,this.op=n,this.mangoQuery=i,this.collection=r,this.other=s,i||(this.mangoQuery=Ah()),this.isFindOneByIdQuery=xP(this.collection.schema.primaryPath,i)}var t=e.prototype;return t._setResultData=function(i){if(typeof i>"u")throw U("QU18",{database:this.collection.database.name,collection:this.collection.name});if(typeof i=="number"){this._result=new Ly(this,[],i);return}else i instanceof Map&&(i=Array.from(i.values()));var r=new Ly(this,i,i.length);this._result=r},t._execOverDatabase=async function(){if(this._execOverDatabaseCount=this._execOverDatabaseCount+1,this.op==="count"){var i=this.getPreparedQuery(),r=await this.collection.storageInstance.count(i);if(r.mode==="slow"&&!this.collection.database.allowSlowCount)throw U("QU14",{collection:this.collection,queryObj:this.mangoQuery});return{result:r.count,counter:this.collection._changeEventBuffer.getCounter()}}if(this.op==="findByIds"){var s=Q(this.mangoQuery.selector)[this.collection.schema.primaryPath].$in,o=new Map,a=[];if(s.forEach(u=>{var h=this.collection._docCache.getLatestDocumentDataIfExists(u);if(h){if(!h._deleted){var d=this.collection._docCache.getCachedRxDocument(h);o.set(u,d)}}else a.push(u)}),a.length>0){var c=await this.collection.storageInstance.findDocumentsById(a,!1);c.forEach(u=>{var h=this.collection._docCache.getCachedRxDocument(u);o.set(h.primary,h)})}return{result:o,counter:this.collection._changeEventBuffer.getCounter()}}var l=await wP(this);return{result:l.docs,counter:l.counter}},t.exec=async function(i){if(i&&this.op!=="findOne")throw U("QU9",{collection:this.collection.name,query:this.mangoQuery,op:this.op});await Ny(this);var r=Q(this._result);return r.getValue(i)},t.toString=function(){var i=yd({op:this.op,query:Ra(this.collection.schema.jsonSchema,this.mangoQuery),other:this.other},!0),r=JSON.stringify(i);return this.toString=()=>r,r},t.getPreparedQuery=function(){var i={rxQuery:this,mangoQuery:Ra(this.collection.schema.jsonSchema,this.mangoQuery)};i.mangoQuery.selector._deleted={$eq:!1},i.mangoQuery.index&&i.mangoQuery.index.unshift("_deleted"),zn("prePrepareQuery",i);var r=Ef(this.collection.schema.jsonSchema,i.mangoQuery);return this.getPreparedQuery=()=>r,r},t.doesDocumentDataMatch=function(i){return i._deleted?!1:this.queryMatcher(i)},t.remove=async function(){var i=await this.exec();if(Array.isArray(i)){var r=await this.collection.bulkRemove(i);if(r.error.length>0)throw l1(r.error[0]);return r.success}else return i.remove()},t.incrementalRemove=function(){return Ac(this.asRxQuery,i=>i.incrementalRemove())},t.update=function(i){throw Rt("update")},t.patch=function(i){return Ac(this.asRxQuery,r=>r.patch(i))},t.incrementalPatch=function(i){return Ac(this.asRxQuery,r=>r.incrementalPatch(i))},t.modify=function(i){return Ac(this.asRxQuery,r=>r.modify(i))},t.incrementalModify=function(i){return Ac(this.asRxQuery,r=>r.incrementalModify(i))},t.where=function(i){throw Rt("query-builder")},t.sort=function(i){throw Rt("query-builder")},t.skip=function(i){throw Rt("query-builder")},t.limit=function(i){throw Rt("query-builder")},Bs(e,[{key:"$",get:function(){if(!this._$){var n=this.collection.eventBulks$.pipe(Ot(i=>!i.isLocal),Ru(null),nr(()=>Ny(this)),Ht(()=>this._result),Pu(Ou),eu((i,r)=>!!(i&&i.time===Q(r).time)),Ot(i=>!!i),Ht(i=>Q(i).getValue()));this._$=Tg(n,this.refCount$.pipe(Ot(()=>!1)))}return this._$}},{key:"$$",get:function(){var n=this.collection.database.getReactivityFactory();return n.fromObservable(this.$,void 0,this.collection.database)}},{key:"queryMatcher",get:function(){var n=this.collection.schema.jsonSchema,i=Ra(this.collection.schema.jsonSchema,this.mangoQuery);return Ir(this,"queryMatcher",tx(n,i))}},{key:"asRxQuery",get:function(){return this}}])})();function Ah(){return{selector:{}}}function yP(e){return e.collection._queryCache.getByQuery(e)}function Lc(e,t,n,i){zn("preCreateRxQuery",{op:e,queryObj:t,collection:n,other:i});var r=new dx(e,t,n,i);return r=yP(r),hP(n),r}function bP(e){var t=e.asRxQuery.collection._changeEventBuffer.getCounter();return e._latestChangeEvent>=t}async function Ny(e){return e.collection.awaitBeforeReads.size>0&&await Promise.all(Array.from(e.collection.awaitBeforeReads).map(t=>t())),e._ensureEqualQueue=e._ensureEqualQueue.then(()=>_P(e)),e._ensureEqualQueue}function _P(e){if(e._lastEnsureEqual=Ri(),e.collection.database.closed||bP(e))return er;var t=!1,n=!1;if(e._latestChangeEvent===-1&&(n=!0),!n){var i=e.asRxQuery.collection._changeEventBuffer.getFrom(e._latestChangeEvent+1);if(i===null)n=!0;else{e._latestChangeEvent=e.asRxQuery.collection._changeEventBuffer.getCounter();var r=e.asRxQuery.collection._changeEventBuffer.reduceByLastOfDoc(i);if(e.op==="count"){var s=Q(e._result).count,o=s;r.forEach(c=>{var l=c.previousDocumentData&&e.doesDocumentDataMatch(c.previousDocumentData),u=e.doesDocumentDataMatch(c.documentData);!l&&u&&o++,l&&!u&&o--}),o!==s&&(t=!0,e._setResultData(o))}else{var a=rP(e,r);a.runFullQueryAgain?n=!0:a.changed&&(t=!0,e._setResultData(a.newResults))}}}return n?e._execOverDatabase().then(c=>{var l=c.result;return e._latestChangeEvent=c.counter,typeof l=="number"?((!e._result||l!==e._result.count)&&(t=!0,e._setResultData(l)),t):((!e._result||!w$(e.collection.schema.primaryPath,l,e._result.docsData))&&(t=!0,e._setResultData(l)),t)}):Promise.resolve(t)}async function wP(e){var t=[],n=e.collection;if(e.isFindOneByIdQuery)if(Array.isArray(e.isFindOneByIdQuery)){var i=e.isFindOneByIdQuery;if(i=i.filter(u=>{var h=e.collection._docCache.getLatestDocumentDataIfExists(u);return h?(h._deleted||t.push(h),!1):!0}),i.length>0){var r=await n.storageInstance.findDocumentsById(i,!1);Mo(t,r)}}else{var s=e.isFindOneByIdQuery,o=e.collection._docCache.getLatestDocumentDataIfExists(s);if(!o){var a=await n.storageInstance.findDocumentsById([s],!1);a[0]&&(o=a[0])}o&&!o._deleted&&t.push(o)}else{var c=e.getPreparedQuery(),l=await n.storageInstance.query(c);t=l.documents}return{docs:t,counter:n._changeEventBuffer.getCounter()}}function xP(e,t){if(!t.skip&&t.selector&&Object.keys(t.selector).length===1&&t.selector[e]){var n=t.selector[e];if(typeof n=="string")return n;if(Object.keys(n).length===1&&typeof n.$eq=="string"||Object.keys(n).length===1&&Array.isArray(n.$eq)&&!n.$eq.find(i=>typeof i!="string"))return n.$eq}return!1}var Ms="collection",Sv="storage-token",Lh="rx-migration-status",CP="rx-pipeline-checkpoint",kP="RxInternalDocument",Ev=wf({version:0,title:kP,primaryKey:{key:"id",fields:["context","key"],separator:"|"},type:"object",properties:{id:{type:"string",maxLength:200},key:{type:"string"},context:{type:"string",enum:[Ms,Sv,Lh,CP,"OTHER"]},data:{type:"object",additionalProperties:!0}},indexes:[],required:["key","context","data"],additionalProperties:!1,sharding:{shards:1,mode:"collection"}});function Po(e,t){return Ws(Ev,{key:e,context:t})}async function fx(e){var t=Ef(e.schema,{selector:{context:Ms,_deleted:{$eq:!1}},sort:[{id:"asc"}],skip:0}),n=await e.query(t),i=n.documents;return i}var px="storageToken",SP=Po(px,Sv);async function EP(e){var t=Ko(10),n=e.password?await e.hashFunction(JSON.stringify(e.password)):void 0,i={id:SP,context:Sv,key:px,data:{rxdbVersion:e.rxdbVersion,token:t,instanceToken:e.token,passwordHash:n},_deleted:!1,_meta:gc(),_rev:Oi(),_attachments:{}},r=[{document:i}],s=await e.internalStore.bulkWrite(r,"internal-add-storage-token");if(!s.error[0])return bi("id",r,s)[0];var o=Q(s.error[0]);if(o.isError&&Ha(o)){var a=o;if(!MP(a.documentInDb.data.rxdbVersion,e.rxdbVersion))throw U("DM5",{args:{database:e.name,databaseStateVersion:a.documentInDb.data.rxdbVersion,codeVersion:e.rxdbVersion}});if(n&&n!==a.documentInDb.data.passwordHash)throw U("DB1",{passwordHash:n,existingPasswordHash:a.documentInDb.data.passwordHash});var c=a.documentInDb;return Q(c)}throw o}function MP(e,t){if(!e)return!1;var n=e.split(".")[0],i=t.split(".")[0];return n==="15"&&i==="16"?!0:n===i}async function gx(e,t,n){if(e.schema.version!==n.version)throw U("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=Md(e.name,e.schema.jsonSchema),r=Po(i,Ms);;){var s=await yc(e.database.internalStore,r),o=Fn(Q(s)),a=o.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(a)return;o.data.connectedStorages.push({collectionName:t,schema:n});try{await Ga(e.database.internalStore,{previous:Q(s),document:o},"add-connected-storage-to-collection")}catch(c){if(!Ha(c))throw c}}}async function DP(e,t,n){if(e.schema.version!==n.version)throw U("SNH",{schema:n,version:e.schema.version,name:e.name,collection:e,args:{storageCollectionName:t}});for(var i=Md(e.name,e.schema.jsonSchema),r=Po(i,Ms);;){var s=await yc(e.database.internalStore,r),o=Fn(Q(s)),a=o.data.connectedStorages.find(c=>c.collectionName===t&&c.schema.version===n.version);if(!a)return;o.data.connectedStorages=o.data.connectedStorages.filter(c=>c.collectionName!==t);try{await Ga(e.database.internalStore,{previous:Q(s),document:o},"remove-connected-storage-from-collection")}catch(c){if(!Ha(c))throw c}}}function Md(e,t){return e+"-"+t.version}function dh(e,t){return t=qt(t),t=q$(e,t),typeof e.jsonSchema.primaryKey!="string"&&(t=j$(e.primaryPath,e.jsonSchema,t)),t._meta=gc(),Object.prototype.hasOwnProperty.call(t,"_deleted")||(t._deleted=!1),Object.prototype.hasOwnProperty.call(t,"_attachments")||(t._attachments={}),Object.prototype.hasOwnProperty.call(t,"_rev")||(t._rev=Oi()),t}async function $P(e,t){t.multiInstance=e.multiInstance;var n=await e.storage.createStorageInstance(t);return n}async function mx(e,t,n,i,r,s,o,a){var c=await fx(t),l=c.filter(f=>f.data.name===r),u=[];l.forEach(f=>{u.push({collectionName:f.data.name,schema:f.data.schema,isCollection:!0}),f.data.connectedStorages.forEach(p=>u.push({collectionName:p.collectionName,isCollection:!1,schema:p.schema}))});var h=new Set;if(u=u.filter(f=>{var p=f.collectionName+"||"+f.schema.version;return h.has(p)?!1:(h.add(p),!0)}),await Promise.all(u.map(async f=>{var p=await e.createStorageInstance({collectionName:f.collectionName,databaseInstanceToken:n,databaseName:i,multiInstance:s,options:{},schema:f.schema,password:o,devMode:At.isDevMode()});await p.remove(),f.isCollection&&await Do("postRemoveRxCollection",{storage:e,databaseName:i,collectionName:r})})),a){var d=l.map(f=>{var p=Mf(f);return p._deleted=!0,p._meta.lwt=Ri(),p._rev=jr(n,f),{previous:f,document:p}});await t.bulkWrite(d,"rx-database-remove-collection-all")}}function oi(e){if(e.closed)throw U("COL21",{collection:e.name,version:e.schema.version})}var TP=(function(){function e(n){this.subs=[],this.counter=0,this.eventCounterMap=new WeakMap,this.buffer=[],this.limit=100,this.tasks=new Set,this.collection=n,this.subs.push(this.collection.eventBulks$.pipe(Ot(i=>!i.isLocal)).subscribe(i=>{this.tasks.add(()=>this._handleChangeEvents(i.events)),this.tasks.size<=1&&_f().then(()=>{this.processTasks()})}))}var t=e.prototype;return t.processTasks=function(){if(this.tasks.size!==0){var i=Array.from(this.tasks);i.forEach(r=>r()),this.tasks.clear()}},t._handleChangeEvents=function(i){var r=this.counter;this.counter=this.counter+i.length,i.length>this.limit?this.buffer=i.slice(i.length*-1):(Mo(this.buffer,i),this.buffer=this.buffer.slice(this.limit*-1));for(var s=r+1,o=this.eventCounterMap,a=0;a<i.length;a++){var c=i[a];o.set(c,s+a)}},t.getCounter=function(){return this.processTasks(),this.counter},t.getBuffer=function(){return this.processTasks(),this.buffer},t.getArrayIndexByPointer=function(i){this.processTasks();var r=this.buffer[0],s=this.eventCounterMap.get(r);if(i<s)return null;var o=i-s;return o},t.getFrom=function(i){this.processTasks();var r=[],s=this.getArrayIndexByPointer(i);if(s===null)return null;for(;;){var o=this.buffer[s];if(s++,o)r.push(o);else return r}},t.runFrom=function(i,r){this.processTasks();var s=this.getFrom(i);if(s===null)throw new Error("out of bounds");s.forEach(o=>r(o))},t.reduceByLastOfDoc=function(i){return this.processTasks(),i.slice(0)},t.close=function(){this.tasks.clear(),this.subs.forEach(i=>i.unsubscribe())},e})();function OP(e){return new TP(e)}var IP=new WeakMap;function PP(e){var t=e.schema.getDocumentPrototype(),n=LP(e),i=Df,r={};return[t,n,i].forEach(s=>{var o=Object.getOwnPropertyNames(s);o.forEach(a=>{var c=Object.getOwnPropertyDescriptor(s,a),l=!0;(a.startsWith("_")||a.endsWith("_")||a.startsWith("$")||a.endsWith("$"))&&(l=!1),typeof c.value=="function"?Object.defineProperty(r,a,{get(){return c.value.bind(this)},enumerable:l,configurable:!1}):(c.enumerable=l,c.configurable=!1,c.writable&&(c.writable=!1),Object.defineProperty(r,a,c))})}),r}function RP(e){return yi(IP,e,()=>rx(PP(e)))}function AP(e,t,n){var i=dI(t,e,At.deepFreezeWhenDevMode(n));return e._runHooksSync("post","create",n,i),zn("postCreateRxDocument",i),i}function LP(e){var t={};return Object.entries(e.methods).forEach(([n,i])=>{t[n]=i}),t}var Dd={isEqual(e,t,n){e=Fy(e),t=Fy(t);var i=Zl(Vi(e),Vi(t));return i},resolve(e){return e.realMasterState}};function Fy(e){return e._attachments||(e=qt(e),e._attachments={}),e}var vx=["pre","post"],yx=["insert","save","remove","create"],zy=!1,ya=new Set,bx=(function(){function e(n,i,r,s,o={},a={},c={},l={},u={},h=ux,d={},f=Dd){this.storageInstance={},this.timeouts=new Set,this.incrementalWriteQueue={},this.awaitBeforeReads=new Set,this._incrementalUpsertQueues=new Map,this.synced=!1,this.hooks={},this._subs=[],this._docCache={},this._queryCache=oP(),this.$={},this.checkpoint$={},this._changeEventBuffer={},this.eventBulks$={},this.onClose=[],this.closed=!1,this.onRemove=[],this.database=n,this.name=i,this.schema=r,this.internalStorageInstance=s,this.instanceCreationOptions=o,this.migrationStrategies=a,this.methods=c,this.attachments=l,this.options=u,this.cacheReplacementPolicy=h,this.statics=d,this.conflictHandler=f,NP(this.asRxCollection),n&&(this.eventBulks$=n.eventBulks$.pipe(Ot(p=>p.collectionName===this.name))),this.database&&ya.add(this)}var t=e.prototype;return t.prepare=async function(){if(!await z$()){for(var i=0;i<10&&ya.size>dy;)i++,await this.promiseWait(30);if(ya.size>dy)throw U("COL23",{database:this.database.name,collection:this.name,args:{existing:Array.from(ya.values()).map(c=>({db:c.database?c.database.name:"",c:c.name}))}})}this.storageInstance=bv(this.database,this.internalStorageInstance,this.schema.jsonSchema),this.incrementalWriteQueue=new ix(this.storageInstance,this.schema.primaryPath,(c,l)=>sx(this,c,l),c=>this._runHooks("post","save",c)),this.$=this.eventBulks$.pipe(nr(c=>F1(c))),this.checkpoint$=this.eventBulks$.pipe(Ht(c=>c.checkpoint)),this._changeEventBuffer=OP(this.asRxCollection);var r;this._docCache=new hx(this.schema.primaryPath,this.eventBulks$.pipe(Ot(c=>!c.isLocal),Ht(c=>c.events)),c=>(r||(r=RP(this.asRxCollection)),AP(this.asRxCollection,r,c)));var s=this.database.internalStore.changeStream().pipe(Ot(c=>{var l=this.name+"-"+this.schema.version,u=c.events.find(h=>h.documentData.context==="collection"&&h.documentData.key===l&&h.operation==="DELETE");return!!u})).subscribe(async()=>{await this.close(),await Promise.all(this.onRemove.map(c=>c()))});this._subs.push(s);var o=await this.database.storageToken,a=this.storageInstance.changeStream().subscribe(c=>{var l={id:c.id,isLocal:!1,internal:!1,collectionName:this.name,storageToken:o,events:c.events,databaseToken:this.database.token,checkpoint:c.checkpoint,context:c.context};this.database.$emit(l)});return this._subs.push(a),di},t.cleanup=function(i){throw oi(this),Rt("cleanup")},t.migrationNeeded=function(){throw Rt("migration-schema")},t.getMigrationState=function(){throw Rt("migration-schema")},t.startMigration=function(i=10){return oi(this),this.getMigrationState().startMigration(i)},t.migratePromise=function(i=10){return this.getMigrationState().migratePromise(i)},t.insert=async function(i){oi(this);var r=await this.bulkInsert([i]),s=r.error[0];Sd(this,i[this.schema.primaryPath],i,s);var o=Q(r.success[0]);return o},t.insertIfNotExists=async function(i){var r=await this.bulkInsert([i]);if(r.error.length>0){var s=r.error[0];if(s.status===409){var o=s.documentInDb;return Lg(this._docCache,[o])[0]}else throw s}return r.success[0]},t.bulkInsert=async function(i){if(oi(this),i.length===0)return{success:[],error:[]};var r=this.schema.primaryPath,s=new Set,o;if(this.hasHooks("pre","insert"))o=await Promise.all(i.map(m=>{var b=dh(this.schema,m);return this._runHooks("pre","insert",b).then(()=>(s.add(b[r]),{document:b}))}));else{o=new Array(i.length);for(var a=this.schema,c=0;c<i.length;c++){var l=i[c],u=dh(a,l);s.add(u[r]),o[c]={document:u}}}if(s.size!==i.length)throw U("COL22",{collection:this.name,args:{documents:i}});var h=await this.storageInstance.bulkWrite(o,"rx-collection-bulk-insert"),d,f=this,p={get success(){if(!d){var m=bi(f.schema.primaryPath,o,h);d=Lg(f._docCache,m)}return d},error:h.error};if(this.hasHooks("post","insert")){var g=new Map;o.forEach(m=>{var b=m.document;g.set(b[r],b)}),await Promise.all(p.success.map(m=>this._runHooks("post","insert",g.get(m.primary),m)))}return p},t.bulkRemove=async function(i){oi(this);var r=this.schema.primaryPath;if(i.length===0)return{success:[],error:[]};var s;typeof i[0]=="string"?s=await this.findByIds(i).exec():(s=new Map,i.forEach(f=>s.set(f.primary,f)));var o=[],a=new Map;Array.from(s.values()).forEach(f=>{var p=f.toMutableJSON(!0);o.push(p),a.set(f.primary,p)}),await Promise.all(o.map(f=>{var p=f[this.schema.primaryPath];return this._runHooks("pre","remove",f,s.get(p))}));var c=o.map(f=>{var p=qt(f);return p._deleted=!0,{previous:f,document:p}}),l=await this.storageInstance.bulkWrite(c,"rx-collection-bulk-remove"),u=bi(this.schema.primaryPath,c,l),h=[],d=u.map(f=>{var p=f[r],g=this._docCache.getCachedRxDocument(f);return h.push(g),p});return await Promise.all(d.map(f=>this._runHooks("post","remove",a.get(f),s.get(f)))),{success:h,error:l.error}},t.bulkUpsert=async function(i){oi(this);var r=[],s=new Map;i.forEach(l=>{var u=dh(this.schema,l),h=u[this.schema.primaryPath];if(!h)throw U("COL3",{primaryPath:this.schema.primaryPath,data:u,schema:this.schema.jsonSchema});s.set(h,u),r.push(u)});var o=await this.bulkInsert(r),a=o.success.slice(0),c=[];return await Promise.all(o.error.map(async l=>{if(l.status!==409)c.push(l);else{var u=l.documentId,h=Ya(s,u),d=Q(l.documentInDb),f=this._docCache.getCachedRxDocuments([d])[0],p=await f.incrementalModify(()=>h);a.push(p)}})),{error:c,success:a}},t.upsert=async function(i){oi(this);var r=await this.bulkUpsert([i]);return Sd(this.asRxCollection,i[this.schema.primaryPath],i,r.error[0]),r.success[0]},t.incrementalUpsert=function(i){oi(this);var r=dh(this.schema,i),s=r[this.schema.primaryPath];if(!s)throw U("COL4",{data:i});var o=this._incrementalUpsertQueues.get(s);return o||(o=di),o=o.then(()=>zP(this,s,r)).then(a=>a.inserted?a.doc:FP(a.doc,r)),this._incrementalUpsertQueues.set(s,o),o},t.find=function(i){oi(this),zn("prePrepareRxQuery",{op:"find",queryObj:i,collection:this}),i||(i=Ah());var r=Lc("find",i,this);return r},t.findOne=function(i){oi(this),zn("prePrepareRxQuery",{op:"findOne",queryObj:i,collection:this});var r;if(typeof i=="string")r=Lc("findOne",{selector:{[this.schema.primaryPath]:i},limit:1},this);else{if(i||(i=Ah()),i.limit)throw U("QU6");i=qt(i),i.limit=1,r=Lc("findOne",i,this)}return r},t.count=function(i){oi(this),i||(i=Ah());var r=Lc("count",i,this);return r},t.findByIds=function(i){oi(this);var r={selector:{[this.schema.primaryPath]:{$in:i.slice(0)}}},s=Lc("findByIds",r,this);return s},t.exportJSON=function(){throw Rt("json-dump")},t.importJSON=function(i){throw Rt("json-dump")},t.insertCRDT=function(i){throw Rt("crdt")},t.addPipeline=function(i){throw Rt("pipeline")},t.addHook=function(i,r,s,o=!1){if(typeof s!="function")throw _d("COL7",{key:r,when:i});if(!vx.includes(i))throw _d("COL8",{key:r,when:i});if(!yx.includes(r))throw U("COL9",{key:r});if(i==="post"&&r==="create"&&o===!0)throw U("COL10",{when:i,key:r,parallel:o});var a=s.bind(this),c=o?"parallel":"series";this.hooks[r]=this.hooks[r]||{},this.hooks[r][i]=this.hooks[r][i]||{series:[],parallel:[]},this.hooks[r][i][c].push(a)},t.getHooks=function(i,r){return!this.hooks[r]||!this.hooks[r][i]?{series:[],parallel:[]}:this.hooks[r][i]},t.hasHooks=function(i,r){if(!this.hooks[r]||!this.hooks[r][i])return!1;var s=this.getHooks(i,r);return s?s.series.length>0||s.parallel.length>0:!1},t._runHooks=function(i,r,s,o){var a=this.getHooks(i,r);if(!a)return di;var c=a.series.map(l=>()=>l(s,o));return P$(c).then(()=>Promise.all(a.parallel.map(l=>l(s,o))))},t._runHooksSync=function(i,r,s,o){if(this.hasHooks(i,r)){var a=this.getHooks(i,r);a&&a.series.forEach(c=>c(s,o))}},t.promiseWait=function(i){var r=new Promise(s=>{var o=setTimeout(()=>{this.timeouts.delete(o),s()},i);this.timeouts.add(o)});return r},t.close=async function(){return this.closed?er:(ya.delete(this),await Promise.all(this.onClose.map(i=>i())),this.closed=!0,Array.from(this.timeouts).forEach(i=>clearTimeout(i)),this._changeEventBuffer&&this._changeEventBuffer.close(),this.database.requestIdlePromise().then(()=>this.storageInstance.close()).then(()=>(this._subs.forEach(i=>i.unsubscribe()),delete this.database.collections[this.name],Do("postCloseRxCollection",this).then(()=>!0))))},t.remove=async function(){await this.close(),await Promise.all(this.onRemove.map(i=>i())),await mx(this.database.storage,this.database.internalStore,this.database.token,this.database.name,this.name,this.database.multiInstance,this.database.password,this.database.hashFunction)},Bs(e,[{key:"insert$",get:function(){return this.$.pipe(Ot(n=>n.operation==="INSERT"))}},{key:"update$",get:function(){return this.$.pipe(Ot(n=>n.operation==="UPDATE"))}},{key:"remove$",get:function(){return this.$.pipe(Ot(n=>n.operation==="DELETE"))}},{key:"asRxCollection",get:function(){return this}}])})();function NP(e){if(!zy){zy=!0;var t=Object.getPrototypeOf(e);yx.forEach(n=>{vx.map(i=>{var r=i+d1(n);t[r]=function(s,o){return this.addHook(i,n,s,o)}})})}}function FP(e,t){return e.incrementalModify(n=>t)}function zP(e,t,n){var i=e._docCache.getLatestDocumentDataIfExists(t);return i?Promise.resolve({doc:e._docCache.getCachedRxDocuments([i])[0],inserted:!1}):e.findOne(t).exec().then(r=>r?{doc:r,inserted:!1}:e.insert(n).then(s=>({doc:s,inserted:!0})))}async function jP({database:e,name:t,schema:n,instanceCreationOptions:i={},migrationStrategies:r={},autoMigrate:s=!0,statics:o={},methods:a={},attachments:c={},options:l={},localDocuments:u=!1,cacheReplacementPolicy:h=ux,conflictHandler:d=Dd}){var f={databaseInstanceToken:e.token,databaseName:e.name,collectionName:t,schema:n.jsonSchema,options:i,multiInstance:e.multiInstance,password:e.password,devMode:At.isDevMode()};zn("preCreateRxStorageInstance",f);var p=await $P(e,f),g=new bx(e,t,n,p,i,r,a,c,l,h,o,d);try{await g.prepare(),Object.entries(o).forEach(([m,b])=>{Object.defineProperty(g,m,{get:()=>b.bind(g)})}),zn("createRxCollection",{collection:g,creator:{name:t,schema:n,storageInstance:p,instanceCreationOptions:i,migrationStrategies:r,methods:a,attachments:c,options:l,cacheReplacementPolicy:h,localDocuments:u,statics:o}}),s&&g.schema.version!==0&&await g.migratePromise()}catch(m){throw ya.delete(g),await p.close(),m}return g}var _x=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;this._parallels=t||1,this._qC=0,this._iC=new Set,this._lHN=0,this._hPM=new Map,this._pHM=new Map};_x.prototype={isIdle:function(){return this._qC<this._parallels},lock:function(){this._qC++},unlock:function(){this._qC--,Ng(this)},wrapCall:function(t){var n=this;this._qC++;var i;try{i=t()}catch(r){throw this.unlock(),r}return!i.then||typeof i.then!="function"?(this.unlock(),i):i.then(function(r){return n.unlock(),r}).catch(function(r){throw n.unlock(),r})},requestIdlePromise:function(t){var n=this;t=t||{};var i,r=new Promise(function(a){return i=a}),s=function(){Ip(n,r),i()};if(r._manRes=s,t.timeout){var o=setTimeout(function(){r._manRes()},t.timeout);r._timeoutObj=o}return this._iC.add(r),Ng(this),r},cancelIdlePromise:function(t){Ip(this,t)},requestIdleCallback:function(t,n){var i=this._lHN++,r=this.requestIdlePromise(n);return this._hPM.set(i,r),this._pHM.set(r,i),r.then(function(){return t()}),i},cancelIdleCallback:function(t){var n=this._hPM.get(t);this.cancelIdlePromise(n)},clear:function(){var t=this;this._iC.forEach(function(n){return Ip(t,n)}),this._qC=0,this._iC.clear(),this._hPM=new Map,this._pHM=new Map}};function BP(e){if(e._iC.size!==0){var t=e._iC.values(),n=t.next().value;n._manRes(),setTimeout(function(){return Ng(e)},0)}}function Ip(e,t){if(t){if(t._timeoutObj&&clearTimeout(t._timeoutObj),e._pHM.has(t)){var n=e._pHM.get(t);e._hPM.delete(n),e._pHM.delete(t)}e._iC.delete(t)}}function Ng(e){e._tryIR||e._iC.size===0||(e._tryIR=!0,setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}setTimeout(function(){if(!e.isIdle()){e._tryIR=!1;return}BP(e),e._tryIR=!1},0)},0))}let WP=class{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){return this.map.has(t)}add(t){this.map.set(t,wx()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,HP(this)},0))}clear(){this.map.clear()}};function HP(e){const t=wx()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)return;const r=i[0];if(i[1]<t)e.map.delete(r);else return}}function wx(){return Date.now()}var Fg=new Set,jy=new Map,Mv=(function(){function e(n,i,r,s,o,a,c=!1,l={},u,h,d,f,p,g){this.idleQueue=new _x,this.rxdbVersion=N$,this.storageInstances=new Set,this._subs=[],this.startupErrors=[],this.onClose=[],this.closed=!1,this.collections={},this.states={},this.eventBulks$=new Fe,this.closePromise=null,this.observable$=this.eventBulks$.pipe(nr(m=>F1(m))),this.storageToken=er,this.storageTokenDocument=er,this.emittedEventBulkIds=new WP(60*1e3),this.name=n,this.token=i,this.storage=r,this.instanceCreationOptions=s,this.password=o,this.multiInstance=a,this.eventReduce=c,this.options=l,this.internalStore=u,this.hashFunction=h,this.cleanupPolicy=d,this.allowSlowCount=f,this.reactivity=p,this.onClosed=g,this.name!=="pseudoInstance"&&(this.internalStore=bv(this.asRxDatabase,u,Ev),this.storageTokenDocument=EP(this.asRxDatabase).catch(m=>this.startupErrors.push(m)),this.storageToken=this.storageTokenDocument.then(m=>m.data.token).catch(m=>this.startupErrors.push(m)))}var t=e.prototype;return t.getReactivityFactory=function(){if(!this.reactivity)throw U("DB14",{database:this.name});return this.reactivity},t.$emit=function(i){this.emittedEventBulkIds.has(i.id)||(this.emittedEventBulkIds.add(i.id),this.eventBulks$.next(i))},t.removeCollectionDoc=async function(i,r){var s=await yc(this.internalStore,Po(Md(i,r),Ms));if(!s)throw U("SNH",{name:i,schema:r});var o=Mf(s);o._deleted=!0,await this.internalStore.bulkWrite([{document:o,previous:s}],"rx-database-remove-collection")},t.addCollections=async function(i){var r={},s={},o=[],a={};await Promise.all(Object.entries(i).map(async([u,h])=>{var d=u,f=h.schema;r[d]=f;var p=G$(f,this.hashFunction);if(s[d]=p,this.collections[u])throw U("DB3",{name:u});var g=Md(u,f),m={id:Po(g,Ms),key:g,context:Ms,data:{name:d,schemaHash:await p.hash,schema:p.jsonSchema,version:p.version,connectedStorages:[]},_deleted:!1,_meta:gc(),_rev:Oi(),_attachments:{}};o.push({document:m});var b=Object.assign({},h,{name:d,schema:p,database:this}),_=qt(h);_.database=this,_.name=u,zn("preCreateRxCollection",_),b.conflictHandler=_.conflictHandler,a[d]=b}));var c=await this.internalStore.bulkWrite(o,"rx-database-add-collection");await KP(this),await Promise.all(c.error.map(async u=>{if(u.status!==409)throw U("DB12",{database:this.name,writeError:u});var h=Q(u.documentInDb),d=h.data.name,f=s[d];if(h.data.schemaHash!==await f.hash)throw U("DB6",{database:this.name,collection:d,previousSchemaHash:h.data.schemaHash,schemaHash:await f.hash,previousSchema:h.data.schema,schema:Q(r[d])})}));var l={};return await Promise.all(Object.keys(i).map(async u=>{var h=a[u],d=await jP(h);l[u]=d,this.collections[u]=d,this[u]||Object.defineProperty(this,u,{get:()=>this.collections[u]})})),l},t.lockedRun=function(i){return this.idleQueue.wrapCall(i)},t.requestIdlePromise=function(){return this.idleQueue.requestIdlePromise()},t.exportJSON=function(i){throw Rt("json-dump")},t.addState=function(i){throw Rt("state")},t.importJSON=function(i){throw Rt("json-dump")},t.backup=function(i){throw Rt("backup")},t.leaderElector=function(){throw Rt("leader-election")},t.isLeader=function(){throw Rt("leader-election")},t.waitForLeadership=function(){throw Rt("leader-election")},t.migrationStates=function(){throw Rt("migration-schema")},t.close=function(){if(this.closePromise)return this.closePromise;var{promise:i,resolve:r}=xx(),s=o=>{this.onClosed&&this.onClosed(),this.closed=!0,r(o)};return this.closePromise=i,(async()=>{if(await Do("preCloseRxDatabase",this),this.eventBulks$.complete(),this._subs.map(o=>o.unsubscribe()),this.name==="pseudoInstance"){s(!1);return}return this.requestIdlePromise().then(()=>Promise.all(this.onClose.map(o=>o()))).then(()=>Promise.all(Object.keys(this.collections).map(o=>this.collections[o]).map(o=>o.close()))).then(()=>this.internalStore.close()).then(()=>s(!0))})(),i},t.remove=function(){return this.close().then(()=>qP(this.name,this.storage,this.multiInstance,this.password))},Bs(e,[{key:"$",get:function(){return this.observable$}},{key:"asRxDatabase",get:function(){return this}}])})();function UP(e,t){if(Fg.has(Cx(e,t)))throw U("DB8",{name:e,storage:t.name,link:"https://rxdb.info/rx-database.html#ignoreduplicate"})}function xx(){var e,t,n=new Promise((i,r)=>{e=i,t=r});return{promise:n,resolve:e,reject:t}}function Cx(e,t){return t.name+"|"+e}async function kx(e,t,n,i,r,s){var o=await t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:sI,schema:Ev,options:i,multiInstance:r,password:s,devMode:At.isDevMode()});return o}function YP({storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r=!0,eventReduce:s=!0,ignoreDuplicate:o=!1,options:a={},cleanupPolicy:c,closeDuplicates:l=!1,allowSlowCount:u=!1,localDocuments:h=!1,hashFunction:d=u1,reactivity:f}){zn("preCreateRxDatabase",{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r,eventReduce:s,ignoreDuplicate:o,options:a,localDocuments:h});var p=Cx(n,e),g=jy.get(p)||new Set,m=xx(),b=Array.from(g),_=()=>{g.delete(m.promise),Fg.delete(p)};return g.add(m.promise),jy.set(p,g),(async()=>{if(l&&await Promise.all(b.map($=>$.catch(()=>null).then(D=>D&&D.close()))),o){if(!At.isDevMode())throw U("DB9",{database:n})}else UP(n,e);Fg.add(p);var C=Ko(10),S=await kx(C,e,n,t,r,i),k=new Mv(n,C,e,t,i,r,s,a,S,d,c,u,f,_);return await Do("createRxDatabase",{database:k,creator:{storage:e,instanceCreationOptions:t,name:n,password:i,multiInstance:r,eventReduce:s,ignoreDuplicate:o,options:a,localDocuments:h}}),k})().then(C=>{m.resolve(C)}).catch(C=>{m.reject(C),_()}),m.promise}async function qP(e,t,n=!0,i){var r=Ko(10),s=await kx(r,t,e,{},n,i),o=await fx(s),a=new Set;o.forEach(l=>a.add(l.data.name));var c=Array.from(a);return await Promise.all(c.map(l=>mx(t,s,r,e,l,n,i))),await Do("postRemoveRxDatabase",{databaseName:e,storage:t}),await s.remove(),c}function VP(e){return e instanceof Mv}async function KP(e){if(await e.storageToken,e.startupErrors[0])throw e.startupErrors[0]}var GP={RxSchema:m1.prototype,RxDocument:Df,RxQuery:dx.prototype,RxCollection:bx.prototype,RxDatabase:Mv.prototype},Pp=new Set,By=new Set;function Dv(e){if(zn("preAddRxPlugin",{plugin:e,plugins:Pp}),!Pp.has(e)){{if(By.has(e.name))throw U("PL3",{name:e.name,plugin:e});Pp.add(e),By.add(e.name)}if(!e.rxdb)throw _d("PL1",{plugin:e});e.init&&e.init(),e.prototypes&&Object.entries(e.prototypes).forEach(([t,n])=>n(GP[t])),e.overwritable&&Object.assign(At,e.overwritable),e.hooks&&Object.entries(e.hooks).forEach(([t,n])=>{n.after&&Jl[t].push(n.after),n.before&&Jl[t].unshift(n.before)})}}async function $d(e,t){var n=Ws(e.input.metaInstance.schema,{isCheckpoint:"1",itemId:t}),i=await e.input.metaInstance.findDocumentsById([n],!1),r=i[0];if(e.lastCheckpointDoc[t]=r,r)return r.checkpointData}async function Td(e,t,n){e.checkpointQueue=e.checkpointQueue.then(async()=>{var i=e.lastCheckpointDoc[t];if(n&&!e.events.canceled.getValue()&&(!i||JSON.stringify(i.checkpointData)!==JSON.stringify(n))){var r={id:"",isCheckpoint:"1",itemId:t,_deleted:!1,_attachments:{},checkpointData:n,_meta:gc(),_rev:Oi()};for(r.id=Ws(e.input.metaInstance.schema,r);!e.events.canceled.getValue();){if(i&&(r.checkpointData=cu([i.checkpointData,r.checkpointData])),r._meta.lwt=Ri(),r._rev=jr(await e.checkpointKey,i),e.events.canceled.getValue())return;var s=[{previous:i,document:r}],o=await e.input.metaInstance.bulkWrite(s,"replication-set-checkpoint"),a=bi(e.primaryPath,s,o)[0];if(a){e.lastCheckpointDoc[t]=a;return}else{var c=o.error[0];if(c.status!==409)throw c;i=Q(c.documentInDb),r._rev=jr(await e.checkpointKey,i)}}}}),await e.checkpointQueue}async function XP(e){var t=await e.hashFunction([e.identifier,e.forkInstance.databaseName,e.forkInstance.collectionName].join("||"));return"rx_storage_replication_"+t}function Wy(e,t,n,i,r){var s=Object.assign({},i,{_attachments:t&&i._attachments?i._attachments:{},_meta:n?i._meta:Object.assign({},r?r._meta:{},{lwt:Ri()}),_rev:n?i._rev:Oi()});return s._rev||(s._rev=jr(e,r)),s}function os(e,t,n){var i=qt(e);return t||delete i._attachments,n||(delete i._meta,delete i._rev),i}function zg(e,t){return e.hasAttachments?t.map(n=>{var i=Fn(n.document);return i.docData=Vi(i.docData),{document:i,previous:n.previous}}):t}function jg(e){for(;;)if(e.underlyingPersistentStorage)e=e.underlyingPersistentStorage;else return e}var Nh="RxReplicationProtocolMetaData";function Bg(e,t){var n=B$(e),i={title:Nh,primaryKey:{key:"id",fields:["itemId","isCheckpoint"],separator:"|"},type:"object",version:e.version,additionalProperties:!1,properties:{id:{type:"string",minLength:1,maxLength:n+2},isCheckpoint:{type:"string",enum:["0","1"],minLength:1,maxLength:1},itemId:{type:"string",maxLength:n>4?n:4},checkpointData:{type:"object",additionalProperties:!0},docData:{type:"object",properties:e.properties},isResolvedConflict:{type:"string"}},keyCompression:e.keyCompression,required:["id","isCheckpoint","itemId"]};t&&(i.encrypted=["docData"]);var r=wf(i);return r}function Sx(e,t){return e.input.metaInstance.findDocumentsById(t.map(n=>{var i=Ws(e.input.metaInstance.schema,{itemId:n,isCheckpoint:"0"});return i}),!0).then(n=>{var i={};return Object.values(n).forEach(r=>{i[r.itemId]={docData:r.docData,metaDocument:r}}),i})}async function Od(e,t,n,i){var r=t[e.primaryPath],s=n?Mf(n):{id:"",isCheckpoint:"0",itemId:r,docData:t,_attachments:{},_deleted:!1,_rev:Oi(),_meta:{lwt:0}};s.docData=t,i&&(s.isResolvedConflict=i),s._meta.lwt=Ri(),s.id=Ws(e.input.metaInstance.schema,s),s._rev=jr(await e.checkpointKey,n);var o={previous:n,document:s};return o}async function QP(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.downstream){var t=await $d(e,"down");t||await Td(e,"down",e.input.initialCheckpoint.downstream)}var n=await e.input.hashFunction(e.input.identifier),i=e.input.replicationHandler,r=0,s=[];function o(p){e.stats.down.addNewTask=e.stats.down.addNewTask+1;var g={time:r++,task:p};s.push(g),e.streamQueue.down=e.streamQueue.down.then(()=>{for(var m=[];s.length>0;){e.events.active.down.next(!0);var b=Q(s.shift());if(!(b.time<c)){if(b.task==="RESYNC")if(m.length===0){m.push(b.task);break}else break;m.push(b.task)}}if(m.length!==0)return m[0]==="RESYNC"?l():u(m)}).then(()=>{e.events.active.down.next(!1),!e.firstSyncDone.down.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.down.next(!0)})}if(o("RESYNC"),!e.events.canceled.getValue()){var a=i.masterChangeStream$.pipe(nr(async p=>(await Pr(e.events.active.up.pipe(Ot(g=>!g))),p))).subscribe(p=>{e.stats.down.masterChangeStreamEmit=e.stats.down.masterChangeStreamEmit+1,o(p)});Pr(e.events.canceled.pipe(Ot(p=>!!p))).then(()=>a.unsubscribe())}var c=-1;async function l(){if(e.stats.down.downstreamResyncOnce=e.stats.down.downstreamResyncOnce+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>$d(e,"down"));for(var p=await e.checkpointQueue,g=[];!e.events.canceled.getValue();){c=r++;var m=await i.masterChangesSince(p,e.input.pullBatchSize);if(m.documents.length===0||(p=cu([p,m.checkpoint]),g.push(f(m.documents,p)),m.documents.length<e.input.pullBatchSize))break}await Promise.all(g)}}function u(p){e.stats.down.downstreamProcessChanges=e.stats.down.downstreamProcessChanges+1;var g=[],m=null;return p.forEach(b=>{if(b==="RESYNC")throw new Error("SNH");Mo(g,b.documents),m=cu([m,b.checkpoint])}),f(g,Q(m))}var h=di,d={docs:{}};function f(p,g){var m=e.primaryPath;return e.stats.down.persistFromMaster=e.stats.down.persistFromMaster+1,p.forEach(b=>{var _=b[m];d.docs[_]=b}),d.checkpoint=g,h=h.then(()=>{var b=d.docs;d.docs={};var _=d.checkpoint,C=Object.keys(b);if(e.events.canceled.getValue()||C.length===0)return di;var S=[],k={},$={},D=[];return Promise.all([e.input.forkInstance.findDocumentsById(C,!0),Sx(e,C)]).then(([w,x])=>{var M=new Map;return w.forEach(O=>M.set(O[m],O)),Promise.all(C.map(async O=>{var T=M.get(O),R=T?os(T,e.hasAttachments,!1):void 0,j=b[O],z=x[O];z&&T&&z.metaDocument.isResolvedConflict===T._rev&&await e.streamQueue.up;var Y=!z||!R?!1:e.input.conflictHandler.isEqual(z.docData,R,"downstream-check-if-equal-0");if(!Y&&z&&z.docData._rev&&T&&T._meta[e.input.identifier]&&Os(T._rev)===T._meta[e.input.identifier]&&(Y=!0),T&&z&&Y===!1||T&&!z)return di;var F=R?e.input.conflictHandler.isEqual(j,R,"downstream-check-if-equal-1"):!1;if(R&&F)return(!z||Y===!1)&&D.push(await Od(e,R,z?z.metaDocument:void 0)),di;var G=Object.assign({},j,T?{_meta:qt(T._meta),_attachments:e.hasAttachments&&j._attachments?j._attachments:{},_rev:Oi()}:{_meta:{lwt:Ri()},_rev:Oi(),_attachments:e.hasAttachments&&j._attachments?j._attachments:{}});if(j._rev){var B=T?Os(T._rev)+1:1;G._meta[e.input.identifier]=B,e.input.keepMeta&&(G._rev=j._rev)}e.input.keepMeta&&j._meta&&(G._meta=j._meta);var q={previous:T,document:G};q.document._rev=q.document._rev?q.document._rev:jr(n,q.previous),S.push(q),k[O]=q,$[O]=await Od(e,j,z?z.metaDocument:void 0)}))}).then(async()=>{if(S.length>0)return e.input.forkInstance.bulkWrite(S,await e.downstreamBulkWriteFlag).then(w=>{var x=bi(e.primaryPath,S,w);x.forEach(O=>{var T=O[m];e.events.processed.down.next(k[T]),D.push($[T])});var M;if(w.error.forEach(O=>{if(O.status!==409){var T=U("RC_PULL",{writeError:O});e.events.error.next(T),M=T}}),M)throw M})}).then(()=>{if(D.length>0)return e.input.metaInstance.bulkWrite(zg(e,D),"replication-down-write-meta").then(w=>{w.error.forEach(x=>{e.events.error.next(U("RC_PULL",{id:x.documentId,writeError:x}))})})}).then(()=>{Td(e,"down",_)})}).catch(b=>e.events.error.next(b)),h}}async function ZP(e,t,n){var i=e.input.conflictHandler,r=i.isEqual(t.realMasterState,t.newDocumentState,"replication-resolve-conflict");if(!r){var s=await i.resolve(t,"replication-resolve-conflict"),o=Object.assign({},s,{_meta:qt(n._meta),_rev:Oi(),_attachments:qt(n._attachments)});return o._meta.lwt=Ri(),o._rev=jr(await e.checkpointKey,n),o}}async function Wg(e,t,n,i){if(!n._attachments||i&&!i._attachments)throw new Error("_attachments missing");var r=n[e],s=new Set(i&&i._attachments?Object.keys(i._attachments):[]);return await Promise.all(Object.entries(n._attachments).map(async([o,a])=>{if((!s.has(o)||i&&Q(i._attachments)[o].digest!==a.digest)&&!a.data){var c=await t.getAttachmentData(r,o,a.digest);a.data=c}})),n}async function JP(e){if(e.input.initialCheckpoint&&e.input.initialCheckpoint.upstream){var t=await $d(e,"up");t||await Td(e,"up",e.input.initialCheckpoint.upstream)}var n=e.input.replicationHandler;e.streamQueue.up=e.streamQueue.up.then(()=>u().then(()=>h()));var i=0,r=-1,s=[],o=er,a={docs:{}},c=e.input.forkInstance.changeStream().subscribe(f=>{if(!e.events.paused.getValue())return e.stats.up.forkChangeStreamEmit=e.stats.up.forkChangeStreamEmit+1,s.push({task:f,time:i++}),e.events.active.up.getValue()||e.events.active.up.next(!0),e.input.waitBeforePersist?e.input.waitBeforePersist().then(()=>h()):h()}),l=n.masterChangeStream$.pipe(Ot(f=>f==="RESYNC")).subscribe(()=>{s.push({task:"RESYNC",time:i++}),h()});Pr(e.events.canceled.pipe(Ot(f=>!!f))).then(()=>{c.unsubscribe(),l.unsubscribe()});async function u(){if(e.stats.up.upstreamInitialSync=e.stats.up.upstreamInitialSync+1,!e.events.canceled.getValue()){e.checkpointQueue=e.checkpointQueue.then(()=>$d(e,"up"));for(var f=await e.checkpointQueue,p=new Set,g=async function(){r=i++,p.size>3&&await Promise.race(Array.from(p));var _=await ex(e.input.forkInstance,e.input.pushBatchSize,f);if(_.documents.length===0)return 1;f=cu([f,_.checkpoint]);var C=d(_.documents,Q(f));p.add(C),C.catch().then(()=>p.delete(C))};!e.events.canceled.getValue()&&!await g(););var m=await Promise.all(p),b=m.find(_=>!!_);b?await u():!e.firstSyncDone.up.getValue()&&!e.events.canceled.getValue()&&e.firstSyncDone.up.next(!0)}}function h(){if(e.events.canceled.getValue()||s.length===0){e.events.active.up.next(!1);return}e.stats.up.processTasks=e.stats.up.processTasks+1,e.events.active.up.next(!0),e.streamQueue.up=e.streamQueue.up.then(async()=>{for(var f=[],p;s.length>0;){var g=Q(s.shift());if(!(g.time<r)){if(g.task==="RESYNC"){e.events.active.up.next(!1),await u();return}g.task.context!==await e.downstreamBulkWriteFlag&&Mo(f,g.task.events.map(m=>m.documentData)),p=cu([p,g.task.checkpoint])}}if(await d(f,p),s.length===0)e.events.active.up.next(!1);else return h()})}function d(f,p){return e.stats.up.persistToMaster=e.stats.up.persistToMaster+1,f.forEach(g=>{var m=g[e.primaryPath];a.docs[m]=g}),a.checkpoint=p,o=o.then(async()=>{if(e.events.canceled.getValue())return!1;var g=a.docs;a.docs={};var m=a.checkpoint,b=Object.keys(g);function _(){return Td(e,"up",m)}if(b.length===0)return _(),!1;var C=await Sx(e,b),S={},k=[],$={},D={};if(await Promise.all(b.map(async q=>{var W=g[q];D[q]=W;var V=os(W,e.hasAttachments,!!e.input.keepMeta),L=C[q];L&&L.metaDocument.isResolvedConflict!==W._rev&&e.input.conflictHandler.isEqual(L.docData,V,"upstream-check-if-equal")||L&&L.docData._rev&&Os(W._rev)===W._meta[e.input.identifier]||(k.push(q),S[q]={assumedMasterState:L?L.docData:void 0,newDocumentState:V},$[q]=await Od(e,V,L?L.metaDocument:void 0))})),k.length===0)return _(),!1;var w=Object.values(S),x=new Set,M={},O=m$(w,e.input.pushBatchSize);await Promise.all(O.map(async q=>{e.hasAttachments&&await Promise.all(q.map(async V=>{V.newDocumentState=await Wg(e.primaryPath,e.input.forkInstance,Fn(V.newDocumentState),V.assumedMasterState)}));var W=await n.masterWrite(q);W.forEach(V=>{var L=V[e.primaryPath];x.add(L),M[L]=V})}));var T=[];if(k.forEach(q=>{x.has(q)||(e.events.processed.up.next(S[q]),T.push($[q]))}),e.events.canceled.getValue())return!1;T.length>0&&await e.input.metaInstance.bulkWrite(zg(e,T),"replication-up-write-meta");var R=!1;if(x.size>0){e.stats.up.persistToMasterHadConflicts=e.stats.up.persistToMasterHadConflicts+1;var j=[],z={};if(await Promise.all(Object.entries(M).map(([q,W])=>{var V=S[q],L={newDocumentState:V.newDocumentState,assumedMasterState:V.assumedMasterState,realMasterState:W};return ZP(e,L,D[q]).then(async ot=>{if(ot){e.events.resolvedConflicts.next({input:L,output:ot}),j.push({previous:D[q],document:ot});var kt=C[q];z[q]=await Od(e,Q(W),kt?kt.metaDocument:void 0,ot._rev)}})})),j.length>0){R=!0,e.stats.up.persistToMasterConflictWrites=e.stats.up.persistToMasterConflictWrites+1;var Y=await e.input.forkInstance.bulkWrite(j,"replication-up-write-conflict"),F;if(Y.error.forEach(q=>{if(q.status!==409){var W=U("RC_PUSH",{writeError:q});e.events.error.next(W),F=W}}),F)throw F;var G=[],B=bi(e.primaryPath,j,Y);B.forEach(q=>{var W=q[e.primaryPath];G.push(z[W])}),G.length>0&&await e.input.metaInstance.bulkWrite(zg(e,G),"replication-up-write-conflict-meta")}}return _(),R}).catch(g=>(e.events.error.next(g),!1)),o}}function Ex(e){e=qt(e),e.forkInstance=jg(e.forkInstance),e.metaInstance=jg(e.metaInstance);var t=XP(e),n={primaryPath:Ai(e.forkInstance.schema.primaryKey),hasAttachments:!!e.forkInstance.schema.attachments,input:e,checkpointKey:t,downstreamBulkWriteFlag:t.then(i=>"replication-downstream-"+i),events:{canceled:new ui(!1),paused:new ui(!1),active:{down:new ui(!0),up:new ui(!0)},processed:{down:new Fe,up:new Fe},resolvedConflicts:new Fe,error:new Fe},stats:{down:{addNewTask:0,downstreamProcessChanges:0,downstreamResyncOnce:0,masterChangeStreamEmit:0,persistFromMaster:0},up:{forkChangeStreamEmit:0,persistToMaster:0,persistToMasterConflictWrites:0,persistToMasterHadConflicts:0,processTasks:0,upstreamInitialSync:0}},firstSyncDone:{down:new ui(!1),up:new ui(!1)},streamQueue:{down:di,up:di},checkpointQueue:di,lastCheckpointDoc:{}};return QP(n),JP(n),n}function Fh(e){return Pr(pv([e.firstSyncDone.down.pipe(Ot(t=>!!t)),e.firstSyncDone.up.pipe(Ot(t=>!!t))])).then(()=>{})}function Hg(e){return Promise.all([e.streamQueue.up,e.streamQueue.down,e.checkpointQueue])}function tR(e,t,n,i=!1){e=jg(e);var r=!!e.schema.attachments,s=Ai(e.schema.primaryKey),o={masterChangeStream$:e.changeStream().pipe(nr(async a=>{var c={checkpoint:a.checkpoint,documents:await Promise.all(a.events.map(async l=>{var u=os(l.documentData,r,i);return r&&(u=await Wg(s,e,Fn(u),void 0)),u}))};return c})),masterChangesSince(a,c){return ex(e,c,a).then(async l=>({checkpoint:l.documents.length>0?l.checkpoint:a,documents:await Promise.all(l.documents.map(async u=>{var h=os(u,r,i);return r&&(h=await Wg(s,e,Fn(h),void 0)),h}))}))},async masterWrite(a){var c={};a.forEach(g=>{var m=g.newDocumentState[s];c[m]=g});var l=Object.keys(c),u=await e.findDocumentsById(l,!0),h=new Map;u.forEach(g=>h.set(g[s],g));var d=[],f=[];if(await Promise.all(Object.entries(c).map(([g,m])=>{var b=h.get(g);b?b&&!m.assumedMasterState?d.push(os(b,r,i)):t.isEqual(os(b,r,i),Q(m.assumedMasterState),"rxStorageInstanceToReplicationHandler-masterWrite")===!0?f.push({previous:b,document:Wy(n,r,i,m.newDocumentState,b)}):d.push(os(b,r,i)):f.push({document:Wy(n,r,i,m.newDocumentState)})})),f.length>0){var p=await e.bulkWrite(f,"replication-master-write");p.error.forEach(g=>{if(g.status!==409)throw U("SNH",{name:"non conflict error",error:g});d.push(os(Q(g.documentInDb),r,i))})}return d}};return o}async function Mx(e){e.events.canceled.next(!0),e.events.active.up.complete(),e.events.active.down.complete(),e.events.processed.up.complete(),e.events.processed.down.complete(),e.events.resolvedConflicts.complete(),e.events.canceled.complete(),await e.checkpointQueue}function eR(e){return e&&typeof e.then=="function"}Promise.resolve(!1);var nR=Promise.resolve(!0),Rr=Promise.resolve();function go(e,t){return e||(e=0),new Promise(function(n){return setTimeout(function(){return n(t)},e)})}function iR(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function Nu(){return Math.random().toString(36).substring(2)}var Rp=0;function Fu(){var e=Date.now()*1e3;return e<=Rp&&(e=Rp+1),Rp=e,e}function rR(){return typeof navigator<"u"&&typeof navigator.locks<"u"&&typeof navigator.locks.request=="function"}var sR=Fu,oR="native";function aR(e){var t={time:Fu(),messagesCallback:null,bc:new BroadcastChannel(e),subFns:[]};return t.bc.onmessage=function(n){t.messagesCallback&&t.messagesCallback(n.data)},t}function cR(e){e.bc.close(),e.subFns=[]}function lR(e,t){try{return e.bc.postMessage(t,!1),Rr}catch(n){return Promise.reject(n)}}function uR(e,t){e.messagesCallback=t}function hR(){if(typeof globalThis<"u"&&globalThis.Deno&&globalThis.Deno.args)return!0;if((typeof window<"u"||typeof self<"u")&&typeof BroadcastChannel=="function"){if(BroadcastChannel._pubkey)throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");return!0}else return!1}function dR(){return 150}var fR={create:aR,close:cR,onMessage:uR,postMessage:lR,canBeUsed:hR,type:oR,averageResponseTime:dR,microSeconds:sR};class Dx{ttl;map=new Map;_to=!1;constructor(t){this.ttl=t}has(t){const n=this.map.get(t);return typeof n>"u"?!1:n<Ug()-this.ttl?(this.map.delete(t),!1):!0}add(t){this.map.delete(t),this.map.set(t,Ug()),this._to||(this._to=!0,setTimeout(()=>{this._to=!1,pR(this)},0))}clear(){this.map.clear()}}function pR(e){const t=Ug()-e.ttl,n=e.map[Symbol.iterator]();for(;;){const i=n.next().value;if(!i)break;const r=i[0];if(i[1]<t)e.map.delete(r);else break}}function Ug(){return Date.now()}function $v(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=JSON.parse(JSON.stringify(e));return typeof t.webWorkerSupport>"u"&&(t.webWorkerSupport=!0),t.idb||(t.idb={}),t.idb.ttl||(t.idb.ttl=1e3*45),t.idb.fallbackInterval||(t.idb.fallbackInterval=150),e.idb&&typeof e.idb.onclose=="function"&&(t.idb.onclose=e.idb.onclose),t.localstorage||(t.localstorage={}),t.localstorage.removeTimeout||(t.localstorage.removeTimeout=1e3*60),e.methods&&(t.methods=e.methods),t.node||(t.node={}),t.node.ttl||(t.node.ttl=1e3*60*2),t.node.maxParallelWrites||(t.node.maxParallelWrites=2048),typeof t.node.useFastPath>"u"&&(t.node.useFastPath=!0),t}var gR=Fu,mR="pubkey.broadcast-channel-0-",Wr="messages",$f={durability:"relaxed"},vR="idb";function $x(){if(typeof indexedDB<"u")return indexedDB;if(typeof window<"u"){if(typeof window.mozIndexedDB<"u")return window.mozIndexedDB;if(typeof window.webkitIndexedDB<"u")return window.webkitIndexedDB;if(typeof window.msIndexedDB<"u")return window.msIndexedDB}return!1}function Tv(e){e.commit&&e.commit()}function yR(e){var t=$x(),n=mR+e,i=t.open(n);return i.onupgradeneeded=function(r){var s=r.target.result;s.createObjectStore(Wr,{keyPath:"id",autoIncrement:!0})},new Promise(function(r,s){i.onerror=function(o){return s(o)},i.onsuccess=function(){r(i.result)}})}function bR(e,t,n){var i=Date.now(),r={uuid:t,time:i,data:n},s=e.transaction([Wr],"readwrite",$f);return new Promise(function(o,a){s.oncomplete=function(){return o()},s.onerror=function(l){return a(l)};var c=s.objectStore(Wr);c.add(r),Tv(s)})}function _R(e,t){var n=e.transaction(Wr,"readonly",$f),i=n.objectStore(Wr),r=[],s=IDBKeyRange.bound(t+1,1/0);if(i.getAll){var o=i.getAll(s);return new Promise(function(c,l){o.onerror=function(u){return l(u)},o.onsuccess=function(u){c(u.target.result)}})}function a(){try{return s=IDBKeyRange.bound(t+1,1/0),i.openCursor(s)}catch{return i.openCursor()}}return new Promise(function(c,l){var u=a();u.onerror=function(h){return l(h)},u.onsuccess=function(h){var d=h.target.result;d?d.value.id<t+1?d.continue(t+1):(r.push(d.value),d.continue()):(Tv(n),c(r))}})}function wR(e,t){if(e.closed)return Promise.resolve([]);var n=e.db.transaction(Wr,"readwrite",$f),i=n.objectStore(Wr);return Promise.all(t.map(function(r){var s=i.delete(r);return new Promise(function(o){s.onsuccess=function(){return o()}})}))}function xR(e,t){var n=Date.now()-t,i=e.transaction(Wr,"readonly",$f),r=i.objectStore(Wr),s=[];return new Promise(function(o){r.openCursor().onsuccess=function(a){var c=a.target.result;if(c){var l=c.value;l.time<n?(s.push(l),c.continue()):(Tv(i),o(s))}else o(s)}})}function CR(e){return xR(e.db,e.options.idb.ttl).then(function(t){return wR(e,t.map(function(n){return n.id}))})}function kR(e,t){return t=$v(t),yR(e).then(function(n){var i={closed:!1,lastCursorId:0,channelName:e,options:t,uuid:Nu(),eMIs:new Dx(t.idb.ttl*2),writeBlockPromise:Rr,messagesCallback:null,readQueuePromises:[],db:n};return n.onclose=function(){i.closed=!0,t.idb.onclose&&t.idb.onclose()},Tx(i),i})}function Tx(e){e.closed||Ox(e).then(function(){return go(e.options.idb.fallbackInterval)}).then(function(){return Tx(e)})}function SR(e,t){return!(e.uuid===t.uuid||t.eMIs.has(e.id)||e.data.time<t.messagesCallbackTime)}function Ox(e){return e.closed||!e.messagesCallback?Rr:_R(e.db,e.lastCursorId).then(function(t){var n=t.filter(function(i){return!!i}).map(function(i){return i.id>e.lastCursorId&&(e.lastCursorId=i.id),i}).filter(function(i){return SR(i,e)}).sort(function(i,r){return i.time-r.time});return n.forEach(function(i){e.messagesCallback&&(e.eMIs.add(i.id),e.messagesCallback(i.data))}),Rr})}function ER(e){e.closed=!0,e.db.close()}function MR(e,t){return e.writeBlockPromise=e.writeBlockPromise.then(function(){return bR(e.db,e.uuid,t)}).then(function(){iR(0,10)===0&&CR(e)}),e.writeBlockPromise}function DR(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t,Ox(e)}function $R(){return!!$x()}function TR(e){return e.idb.fallbackInterval*2}var OR={create:kR,close:ER,onMessage:DR,postMessage:MR,canBeUsed:$R,type:vR,averageResponseTime:TR,microSeconds:gR},IR=Fu,PR="pubkey.broadcastChannel-",RR="localstorage";function Ix(){var e;if(typeof window>"u")return null;try{e=window.localStorage,e=window["ie8-eventlistener/storage"]||window.localStorage}catch{}return e}function Px(e){return PR+e}function AR(e,t){return new Promise(function(n){go().then(function(){var i=Px(e.channelName),r={token:Nu(),time:Date.now(),data:t,uuid:e.uuid},s=JSON.stringify(r);Ix().setItem(i,s);var o=document.createEvent("Event");o.initEvent("storage",!0,!0),o.key=i,o.newValue=s,window.dispatchEvent(o),n()})})}function LR(e,t){var n=Px(e),i=function(s){s.key===n&&t(JSON.parse(s.newValue))};return window.addEventListener("storage",i),i}function NR(e){window.removeEventListener("storage",e)}function FR(e,t){if(t=$v(t),!Rx())throw new Error("BroadcastChannel: localstorage cannot be used");var n=Nu(),i=new Dx(t.localstorage.removeTimeout),r={channelName:e,uuid:n,eMIs:i};return r.listener=LR(e,function(s){r.messagesCallback&&s.uuid!==n&&(!s.token||i.has(s.token)||s.data.time&&s.data.time<r.messagesCallbackTime||(i.add(s.token),r.messagesCallback(s.data)))}),r}function zR(e){NR(e.listener)}function jR(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t}function Rx(){var e=Ix();if(!e)return!1;try{var t="__broadcastchannel_check";e.setItem(t,"works"),e.removeItem(t)}catch{return!1}return!0}function BR(){var e=120,t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")?e*2:e}var WR={create:FR,close:zR,onMessage:jR,postMessage:AR,canBeUsed:Rx,type:RR,averageResponseTime:BR,microSeconds:IR},Ax=Fu,HR="simulate",Ov=new Set;function UR(e){var t={time:Ax(),name:e,messagesCallback:null};return Ov.add(t),t}function YR(e){Ov.delete(e)}var Lx=5;function qR(e,t){return new Promise(function(n){return setTimeout(function(){var i=Array.from(Ov);i.forEach(function(r){r.name===e.name&&r!==e&&r.messagesCallback&&r.time<t.time&&r.messagesCallback(t)}),n()},Lx)})}function VR(e,t){e.messagesCallback=t}function KR(){return!0}function GR(){return Lx}var XR={create:UR,close:YR,onMessage:VR,postMessage:qR,canBeUsed:KR,type:HR,averageResponseTime:GR,microSeconds:Ax},Hy=[fR,OR,WR];function QR(e){var t=[].concat(e.methods,Hy).filter(Boolean);if(e.type){if(e.type==="simulate")return XR;var n=t.find(function(r){return r.type===e.type});if(n)return n;throw new Error("method-type "+e.type+" not found")}e.webWorkerSupport||(t=t.filter(function(r){return r.type!=="idb"}));var i=t.find(function(r){return r.canBeUsed()});if(i)return i;throw new Error("No usable method found in "+JSON.stringify(Hy.map(function(r){return r.type})))}var Nx=new Set,ZR=0,Tf=function(t,n){this.id=ZR++,Nx.add(this),this.name=t,this.options=$v(n),this.method=QR(this.options),this._iL=!1,this._onML=null,this._addEL={message:[],internal:[]},this._uMP=new Set,this._befC=[],this._prepP=null,JR(this)};Tf._pubkey=!0;Tf.prototype={postMessage:function(t){if(this.closed)throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed "+JSON.stringify(t));return Uy(this,"message",t)},postInternal:function(t){return Uy(this,"internal",t)},set onmessage(e){var t=this.method.microSeconds(),n={time:t,fn:e};qy(this,"message",this._onML),e&&typeof e=="function"?(this._onML=n,Yy(this,"message",n)):this._onML=null},addEventListener:function(t,n){var i=this.method.microSeconds(),r={time:i,fn:n};Yy(this,t,r)},removeEventListener:function(t,n){var i=this._addEL[t].find(function(r){return r.fn===n});qy(this,t,i)},close:function(){var t=this;if(!this.closed){Nx.delete(this),this.closed=!0;var n=this._prepP?this._prepP:Rr;return this._onML=null,this._addEL.message=[],n.then(function(){return Promise.all(Array.from(t._uMP))}).then(function(){return Promise.all(t._befC.map(function(i){return i()}))}).then(function(){return t.method.close(t._state)})}},get type(){return this.method.type},get isClosed(){return this.closed}};function Uy(e,t,n){var i=e.method.microSeconds(),r={time:i,type:t,data:n},s=e._prepP?e._prepP:Rr;return s.then(function(){var o=e.method.postMessage(e._state,r);return e._uMP.add(o),o.catch().then(function(){return e._uMP.delete(o)}),o})}function JR(e){var t=e.method.create(e.name,e.options);eR(t)?(e._prepP=t,t.then(function(n){e._state=n})):e._state=t}function Fx(e){return e._addEL.message.length>0||e._addEL.internal.length>0}function Yy(e,t,n){e._addEL[t].push(n),tA(e)}function qy(e,t,n){e._addEL[t]=e._addEL[t].filter(function(i){return i!==n}),eA(e)}function tA(e){if(!e._iL&&Fx(e)){var t=function(r){e._addEL[r.type].forEach(function(s){r.time>=s.time&&s.fn(r.data)})},n=e.method.microSeconds();e._prepP?e._prepP.then(function(){e._iL=!0,e.method.onMessage(e._state,t,n)}):(e._iL=!0,e.method.onMessage(e._state,t,n))}}function eA(e){if(e._iL&&!Fx(e)){e._iL=!1;var t=e.method.microSeconds();e.method.onMessage(e._state,null,t)}}function nA(e){if(typeof WorkerGlobalScope=="function"&&self instanceof WorkerGlobalScope){var t=self.close.bind(self);self.close=function(){return e(),t()}}else{if(typeof window.addEventListener!="function")return;window.addEventListener("beforeunload",function(){e()},!0),window.addEventListener("unload",function(){e()},!0)}}function iA(e){process.on("exit",function(){return e()}),process.on("beforeExit",function(){return e().then(function(){return process.exit()})}),process.on("SIGINT",function(){return e().then(function(){return process.exit()})}),process.on("uncaughtException",function(t){return e().then(function(){console.trace(t),process.exit(101)})})}var rA=Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]",sA=rA?iA:nA,Tl=new Set,Vy=!1;function oA(){Vy||(Vy=!0,sA(cA))}function aA(e){if(oA(),typeof e!="function")throw new Error("Listener is no function");Tl.add(e);var t={remove:function(){return Tl.delete(e)},run:function(){return Tl.delete(e),e()}};return t}function cA(){var e=[];return Tl.forEach(function(t){e.push(t()),Tl.delete(t)}),Promise.all(e)}function wo(e,t){var n={context:"leader",action:t,token:e.token};return e.broadcastChannel.postInternal(n)}function zx(e){e.isLeader=!0,e._hasLeader=!0;var t=aA(function(){return e.die()});e._unl.push(t);var n=function(r){r.context==="leader"&&r.action==="apply"&&wo(e,"tell"),r.context==="leader"&&r.action==="tell"&&!e._dpLC&&(e._dpLC=!0,e._dpL(),wo(e,"tell"))};return e.broadcastChannel.addEventListener("internal",n),e._lstns.push(n),wo(e,"tell")}var jx=function(t,n){var i=this;this.broadcastChannel=t,t._befC.push(function(){return i.die()}),this._options=n,this.isLeader=!1,this.isDead=!1,this.token=Nu(),this._lstns=[],this._unl=[],this._dpL=function(){},this._dpLC=!1,this._wKMC={},this.lN="pubkey-bc||"+t.method.type+"||"+t.name};jx.prototype={hasLeader:function(){var t=this;return navigator.locks.query().then(function(n){var i=n.held?n.held.filter(function(r){return r.name===t.lN}):[];return!!(i&&i.length>0)})},awaitLeadership:function(){var t=this;if(!this._wLMP){this._wKMC.c=new AbortController;var n=new Promise(function(i,r){t._wKMC.res=i,t._wKMC.rej=r});this._wLMP=new Promise(function(i,r){navigator.locks.request(t.lN,{signal:t._wKMC.c.signal},function(){return t._wKMC.c=void 0,zx(t),i(),n}).catch(function(s){t._wKMC.rej&&t._wKMC.rej(s),r(s)})})}return this._wLMP},set onduplicate(e){},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this.isLeader=!1),this.isDead=!0,this._wKMC.res&&this._wKMC.res(),this._wKMC.c&&this._wKMC.c.abort("LeaderElectionWebLock.die() called"),wo(this,"death")}};var Bx=function(t,n){var i=this;this.broadcastChannel=t,this._options=n,this.isLeader=!1,this._hasLeader=!1,this.isDead=!1,this.token=Nu(),this._aplQ=Rr,this._aplQC=0,this._unl=[],this._lstns=[],this._dpL=function(){},this._dpLC=!1;var r=function(o){o.context==="leader"&&(o.action==="death"&&(i._hasLeader=!1),o.action==="tell"&&(i._hasLeader=!0))};this.broadcastChannel.addEventListener("internal",r),this._lstns.push(r)};Bx.prototype={hasLeader:function(){return Promise.resolve(this._hasLeader)},applyOnce:function(t){var n=this;if(this.isLeader)return go(0,!0);if(this.isDead)return go(0,!1);if(this._aplQC>1)return this._aplQ;var i=function(){if(n.isLeader)return nR;var s=!1,o,a=new Promise(function(u){o=function(){s=!0,u()}}),c=function(h){h.context==="leader"&&h.token!=n.token&&(h.action==="apply"&&h.token>n.token&&o(),h.action==="tell"&&(o(),n._hasLeader=!0))};n.broadcastChannel.addEventListener("internal",c);var l=t?n._options.responseTime*4:n._options.responseTime;return wo(n,"apply").then(function(){return Promise.race([go(l),a.then(function(){return Promise.reject(new Error)})])}).then(function(){return wo(n,"apply")}).then(function(){return Promise.race([go(l),a.then(function(){return Promise.reject(new Error)})])}).catch(function(){}).then(function(){return n.broadcastChannel.removeEventListener("internal",c),s?!1:zx(n).then(function(){return!0})})};return this._aplQC=this._aplQC+1,this._aplQ=this._aplQ.then(function(){return i()}).then(function(){n._aplQC=n._aplQC-1}),this._aplQ.then(function(){return n.isLeader})},awaitLeadership:function(){return this._aLP||(this._aLP=lA(this)),this._aLP},set onduplicate(e){this._dpL=e},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this._hasLeader=!1,this.isLeader=!1),this.isDead=!0,wo(this,"death")}};function lA(e){return e.isLeader?Rr:new Promise(function(t){var n=!1;function i(){n||(n=!0,e.broadcastChannel.removeEventListener("internal",s),t(!0))}e.applyOnce().then(function(){e.isLeader&&i()});var r=function(){return go(e._options.fallbackInterval).then(function(){if(!(e.isDead||n))if(e.isLeader)i();else return e.applyOnce(!0).then(function(){e.isLeader?i():r()})})};r();var s=function(a){a.context==="leader"&&a.action==="death"&&(e._hasLeader=!1,e.applyOnce().then(function(){e.isLeader&&i()}))};e.broadcastChannel.addEventListener("internal",s),e._lstns.push(s)})}function uA(e,t){return e||(e={}),e=JSON.parse(JSON.stringify(e)),e.fallbackInterval||(e.fallbackInterval=3e3),e.responseTime||(e.responseTime=t.method.averageResponseTime(t.options)),e}function Wx(e,t){if(e._leaderElector)throw new Error("BroadcastChannel already has a leader-elector");t=uA(t,e);var n=rR()?new jx(e,t):new Bx(e,t);return e._befC.push(function(){return n.die()}),e._leaderElector=n,n}var Id=new Map;function Hx(e,t,n,i){var r=Id.get(t);return r||(r={bc:new Tf(["RxDB:",e,n].join("|")),refs:new Set},Id.set(t,r)),r.refs.add(i),r.bc}function Yg(e,t){var n=Id.get(e);if(n&&(n.refs.delete(t),n.refs.size===0))return Id.delete(e),n.bc.close()}function QB(e,t,n,i){if(t.multiInstance){var r=Hx(e,t.databaseInstanceToken,n.databaseName,n),s=new Fe,o=d=>{d.storageName===e&&d.databaseName===t.databaseName&&d.collectionName===t.collectionName&&d.version===t.schema.version&&s.next(d.eventBulk)};r.addEventListener("message",o);var a=n.changeStream(),c=!1,l=a.subscribe(d=>{c||r.postMessage({storageName:e,databaseName:t.databaseName,collectionName:t.collectionName,version:t.schema.version,eventBulk:d})});n.changeStream=function(){return s.asObservable().pipe(WT(a))};var u=n.close.bind(n);n.close=async function(){return c=!0,l.unsubscribe(),r.removeEventListener("message",o),await Yg(t.databaseInstanceToken,n),u()};var h=n.remove.bind(n);n.remove=async function(){return c=!0,l.unsubscribe(),r.removeEventListener("message",o),await Yg(t.databaseInstanceToken,n),h()}}}async function Ux(e){var t=K$(e.collection.schema.jsonSchema).map(s=>e.collection.name+"-"+s),n=await e.database.internalStore.findDocumentsById(t.map(s=>Po(s,Ms)),!1),i={};n.forEach(s=>i[s.key]=s);var r=t.find(s=>i[s]);return r?i[r]:void 0}function hA(e,t,n){var i=qt(n._attachments),r=Fn(n),s=r._meta;delete r._meta,r._attachments=i;for(var o=t+1,a=Promise.resolve(r),c=function(){var l=o;a=a.then(u=>dA(e,l,u)),o++};o<=e.schema.version;)c();return a.then(l=>l===null?lv:(s&&(l._meta=s),l))}function dA(e,t,n){if(n===null)return lv;var i=e.migrationStrategies[t](n,e),r=h1(i);return r}async function Yx(e){if(e.collection.schema.version===0)return er;var t=await Ux(e);return!!t}var fA=200,qx=new WeakMap;function pA(e){var t=Vx(e.database),n=t.getValue().slice(0);n.push(e),t.next(n)}function Vx(e){return yi(qx,e,()=>new ui([]))}function gA(e){var t=qx.get(e);t&&t.complete()}var mA=(function(){function e(n,i,r=[n.name,"v",n.schema.version].join("-")){this.started=!1,this.canceled=!1,this.updateStatusHandlers=[],this.updateStatusQueue=cv,this.collection=n,this.migrationStrategies=i,this.statusDocKey=r,this.database=n.database,this.oldCollectionMeta=Ux(this),this.mustMigrate=Yx(this),this.statusDocId=Po(this.statusDocKey,Lh),pA(this),this.$=oI(this.database.internalStore,this.statusDocId).pipe(Ot(s=>!!s),Ht(s=>Q(s).data),Pu(Ou))}var t=e.prototype;return t.getStatus=function(){return Pr(this.$)},t.startMigration=async function(i=fA){var r=await this.mustMigrate;if(r){if(this.started)throw U("DM1");if(this.started=!0,this.database.multiInstance){this.broadcastChannel=new Tf(["rx-migration-state",this.database.name,this.collection.name,this.collection.schema.version].join("|"));var s=Wx(this.broadcastChannel);await s.awaitLeadership()}var o=await this.oldCollectionMeta,a=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:this.collection.name,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:Q(o).data.schema,password:this.database.password,devMode:At.isDevMode()}),c=await this.getConnectedStorageInstances(),l=await this.countAllDocuments([a].concat(c.map(h=>h.oldStorage)));await this.updateStatus(h=>(h.count.total=l,h));try{await Promise.all(c.map(async h=>{await gx(this.collection,h.newStorage.collectionName,h.newStorage.schema),await this.migrateStorage(h.oldStorage,h.newStorage,i),await h.newStorage.close()})),await this.migrateStorage(a,this.collection.storageInstance.originalStorageInstance,i)}catch(h){await a.close(),await this.updateStatus(d=>(d.status="ERROR",d.error=wd(h),d));return}try{await Ga(this.database.internalStore,{previous:o,document:Object.assign({},o,{_deleted:!0})},"rx-migration-remove-collection-meta")}catch(h){var u=Ha(h);if(!(u&&u.documentInDb._deleted))throw h}await this.updateStatus(h=>(h.status="DONE",h)),this.broadcastChannel&&await this.broadcastChannel.close()}},t.updateStatus=function(i){return this.updateStatusHandlers.push(i),this.updateStatusQueue=this.updateStatusQueue.then(async()=>{if(this.updateStatusHandlers.length!==0){var r=this.updateStatusHandlers;for(this.updateStatusHandlers=[];;){var s=await yc(this.database.internalStore,this.statusDocId),o=Fn(s);s||(o={id:this.statusDocId,key:this.statusDocKey,context:Lh,data:{collectionName:this.collection.name,status:"RUNNING",count:{total:0,handled:0,percent:0}},_deleted:!1,_meta:gc(),_rev:Oi(),_attachments:{}});var a=Q(o).data;for(var c of r)a=c(a);if(a.count.percent=Math.round(a.count.handled/a.count.total*100),o&&s&&Zl(o.data,s.data))break;try{await Ga(this.database.internalStore,{previous:s,document:Q(o)},Lh);break}catch(l){if(!Ha(l))throw l}}}}),this.updateStatusQueue},t.migrateStorage=async function(i,r,s){this.collection.onClose.push(()=>this.cancel()),this.database.onClose.push(()=>this.cancel());var o=await this.database.storage.createStorageInstance({databaseName:this.database.name,collectionName:"rx-migration-state-meta-"+i.collectionName+"-"+i.schema.version,databaseInstanceToken:this.database.token,multiInstance:this.database.multiInstance,options:{},schema:Bg(i.schema,Ed(i.schema)),password:this.database.password,devMode:At.isDevMode()}),a=tR(r,Dd,this.database.token,!0),c=Ex({keepMeta:!0,identifier:["rx-migration-state",i.collectionName,i.schema.version,this.collection.schema.version].join("-"),replicationHandler:{masterChangesSince(){return Promise.resolve({checkpoint:null,documents:[]})},masterWrite:async u=>{var h=await Promise.all(u.map(async f=>{var p=f.newDocumentState;if(r.schema.title===Nh&&(p=f.newDocumentState.docData,f.newDocumentState.isCheckpoint==="1"))return{assumedMasterState:void 0,newDocumentState:f.newDocumentState};var g=await hA(this.collection,i.schema.version,p);if(g===null)return null;var m={assumedMasterState:void 0,newDocumentState:r.schema.title===Nh?Object.assign({},f.newDocumentState,{docData:g}):g};return m}));h=h.filter(f=>!!f&&!!f.newDocumentState);var d=await a.masterWrite(h);return d},masterChangeStream$:new Fe().asObservable()},forkInstance:i,metaInstance:o,pushBatchSize:s,pullBatchSize:0,conflictHandler:Dd,hashFunction:this.database.hashFunction}),l=!1;if(c.events.error.subscribe(u=>l=u),c.events.processed.up.subscribe(()=>{this.updateStatus(u=>(u.count.handled=u.count.handled+1,u))}),await Fh(c),await Hg(c),await this.updateStatusQueue,l)throw await o.close(),l;await Promise.all([i.remove(),o.remove()]),await this.cancel()},t.cancel=async function(){this.canceled=!0,this.replicationState&&await Mx(this.replicationState),this.broadcastChannel&&await this.broadcastChannel.close()},t.countAllDocuments=async function(i){var r=0;return await Promise.all(i.map(async s=>{var o=Ef(s.schema,Ra(s.schema,{selector:{}})),a=await s.count(o);r+=a.count})),r},t.getConnectedStorageInstances=async function(){var i=Q(await this.oldCollectionMeta),r=[];return await Promise.all(await Promise.all(i.data.connectedStorages.map(async s=>{if(s.schema.title!==Nh)throw new Error("unknown migration handling for schema");var o=Bg(Fn(this.collection.schema.jsonSchema),Ed(s.schema));o.version=this.collection.schema.version;var[a,c]=await Promise.all([this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:At.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:s.schema,password:this.database.password,collectionName:s.collectionName}),this.database.storage.createStorageInstance({databaseInstanceToken:this.database.token,databaseName:this.database.name,devMode:At.isDevMode(),multiInstance:this.database.multiInstance,options:{},schema:o,password:this.database.password,collectionName:s.collectionName})]);r.push({oldStorage:a,newStorage:c})}))),r},t.migratePromise=async function(i){this.startMigration(i);var r=await this.mustMigrate;if(!r)return{status:"DONE",collectionName:this.collection.name,count:{handled:0,percent:0,total:0}};var s=await Promise.race([Pr(this.$.pipe(Ot(o=>o.status==="DONE"))),Pr(this.$.pipe(Ot(o=>o.status==="ERROR")))]);if(s.status==="ERROR")throw U("DM4",{collection:this.collection.name,error:s.error});return s},e})(),Pd=new WeakMap,qg=new WeakMap;function Ol(e){var t=Pd.get(e);if(!t){var n=e.database?e.database:e,i=e.database?e.name:"";throw U("LD8",{database:n.name,collection:i})}return t}function Kx(e,t,n,i,r,s){return t.createStorageInstance({databaseInstanceToken:e,databaseName:n,collectionName:vA(i),schema:Gx,options:r,multiInstance:s,devMode:At.isDevMode()})}function Ky(e){var t=Pd.get(e);if(t)return Pd.delete(e),t.then(n=>n.storageInstance.close())}async function Gy(e,t,n){var i=Ko(10),r=await Kx(i,e,t,n,{},!1);await r.remove()}function vA(e){return"plugin-local-documents-"+e}var Gx=wf({title:"RxLocalDocument",version:0,primaryKey:"id",type:"object",properties:{id:{type:"string",maxLength:128},data:{type:"object",additionalProperties:!0}},required:["id","data"]});async function Xy(e,t){var n=await Ol(this),i={id:e,data:t,_deleted:!1,_meta:gc(),_rev:Oi(),_attachments:{}};return Ga(n.storageInstance,{document:i},"local-document-insert").then(r=>n.docCache.getCachedRxDocument(r))}function Qy(e,t){return this.getLocal(e).then(n=>{if(n)return n.incrementalModify(()=>t);var i=this.insertLocal(e,t);return i})}async function Zy(e){var t=await Ol(this),n=t.docCache,i=n.getLatestDocumentDataIfExists(e);return i?Promise.resolve(n.getCachedRxDocument(i)):yc(t.storageInstance,e).then(r=>r?t.docCache.getCachedRxDocument(r):null)}function Jy(e){return this.$.pipe(Ru(null),nr(async t=>{if(t)return{changeEvent:t};var n=await this.getLocal(e);return{doc:n}}),nr(async t=>{if(t.changeEvent){var n=t.changeEvent;if(!n.isLocal||n.documentId!==e)return{use:!1};var i=await this.getLocal(e);return{use:!0,doc:i}}else return{use:!0,doc:t.doc}}),Ot(t=>t.use),Ht(t=>t.doc))}var yA=rx(),bA=(function(e){function t(n,i,r){var s;return s=e.call(this,null,i)||this,s.id=n,s.parent=r,s}return ov(t,e),t})(yA),Il={get isLocal(){return!0},get allAttachments$(){throw U("LD1",{document:this})},get primaryPath(){return"id"},get primary(){return this.id},get $(){var e=this,t=Ya(qg,this.parent),n=this.primary;return e.parent.eventBulks$.pipe(Ot(i=>!!i.isLocal),Ht(i=>i.events.find(r=>r.documentId===n)),Ot(i=>!!i),Ht(i=>N1(Q(i))),Ru(t.docCache.getLatestDocumentData(this.primary)),eu((i,r)=>i._rev===r._rev),Ht(i=>t.docCache.getCachedRxDocument(i)),Pu(Ou))},get $$(){var e=this,t=Ap(e),n=t.getReactivityFactory();return n.fromObservable(e.$,e.getLatest()._data,t)},get deleted$$(){var e=this,t=Ap(e),n=t.getReactivityFactory();return n.fromObservable(e.deleted$,e.getLatest().deleted,t)},getLatest(){var e=Ya(qg,this.parent),t=e.docCache.getLatestDocumentData(this.primary);return e.docCache.getCachedRxDocument(t)},get(e){if(e="data."+e,!!this._data){if(typeof e!="string")throw _d("LD2",{objPath:e});var t=Ua(this._data,e);return t=At.deepFreezeWhenDevMode(t),t}},get$(e){if(e="data."+e,At.isDevMode()){if(e.includes(".item."))throw U("LD3",{objPath:e});if(e===this.primaryPath)throw U("LD4")}return this.$.pipe(Ht(t=>t._data),Ht(t=>Ua(t,e)),eu())},get$$(e){var t=Ap(this),n=t.getReactivityFactory();return n.fromObservable(this.get$(e),this.getLatest().get(e),t)},async incrementalModify(e){var t=await Ol(this.parent);return t.incrementalWriteQueue.addWrite(this._data,async n=>(n.data=await e(n.data,this),n)).then(n=>t.docCache.getCachedRxDocument(n))},incrementalPatch(e){return this.incrementalModify(t=>(Object.entries(e).forEach(([n,i])=>{t[n]=i}),t))},async _saveData(e){var t=await Ol(this.parent),n=this._data;e.id=this.id;var i=[{previous:n,document:e}];return t.storageInstance.bulkWrite(i,"local-document-save-data").then(r=>{if(r.error[0])throw r.error[0];var s=bi(this.collection.schema.primaryPath,i,r)[0];e=qt(e),e._rev=s._rev})},async remove(){var e=await Ol(this.parent),t=qt(this._data);return t._deleted=!0,Ga(e.storageInstance,{previous:this._data,document:t},"local-document-remove").then(n=>e.docCache.getCachedRxDocument(n))}},tb=!1,_A=()=>{if(!tb){tb=!0;var e=Df,t=Object.getOwnPropertyNames(e);t.forEach(i=>{var r=Object.getOwnPropertyDescriptor(Il,i);if(!r){var s=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(Il,i,s)}});var n=i=>()=>{throw U("LD6",{functionName:i})};["populate","update","putAttachment","putAttachmentBase64","getAttachment","allAttachments"].forEach(i=>Il[i]=n(i))}};function wA(e,t){_A();var n=new bA(e.id,e,t);return Object.setPrototypeOf(n,Il),n.prototype=Il,n}function Ap(e){var t=e.parent;return VP(t)?t:t.database}function eb(e){var t=e.database?e.database:e,n=e.database?e.name:"",i=(async()=>{var r=await Kx(t.token,t.storage,t.name,n,t.instanceCreationOptions,t.multiInstance);r=bv(t,r,Gx);var s=new hx("id",t.eventBulks$.pipe(Ot(u=>{var h=!1;return(n===""&&!u.collectionName||n!==""&&u.collectionName===n)&&(h=!0),h&&u.isLocal}),Ht(u=>u.events)),u=>wA(u,e)),o=new ix(r,"id",()=>{},()=>{}),a=await t.storageToken,c=r.changeStream().subscribe(u=>{for(var h=new Array(u.events.length),d=u.events,f=e.database?e.name:void 0,p=0;p<d.length;p++){var g=d[p];h[p]={documentId:g.documentId,collectionName:f,isLocal:!0,operation:g.operation,documentData:At.deepFreezeWhenDevMode(g.documentData),previousDocumentData:At.deepFreezeWhenDevMode(g.previousDocumentData)}}var m={id:u.id,isLocal:!0,internal:!1,collectionName:e.database?e.name:void 0,storageToken:a,events:h,databaseToken:t.token,checkpoint:u.checkpoint,context:u.context};t.$emit(m)});e._subs.push(c);var l={database:t,parent:e,storageInstance:r,docCache:s,incrementalWriteQueue:o};return qg.set(e,l),l})();Pd.set(e,i)}var xA={name:"local-documents",rxdb:!0,prototypes:{RxCollection:e=>{e.insertLocal=Xy,e.upsertLocal=Qy,e.getLocal=Zy,e.getLocal$=Jy},RxDatabase:e=>{e.insertLocal=Xy,e.upsertLocal=Qy,e.getLocal=Zy,e.getLocal$=Jy}},hooks:{createRxDatabase:{before:e=>{e.creator.localDocuments&&eb(e.database)}},createRxCollection:{before:e=>{e.creator.localDocuments&&eb(e.collection)}},preCloseRxDatabase:{after:e=>Ky(e)},postCloseRxCollection:{after:e=>Ky(e)},postRemoveRxDatabase:{after:e=>Gy(e.storage,e.databaseName,"")},postRemoveRxCollection:{after:e=>Gy(e.storage,e.databaseName,e.collectionName)}},overwritable:{}},CA=new WeakMap,kA={name:"migration-schema",rxdb:!0,init(){Dv(xA)},hooks:{preCloseRxDatabase:{after:gA}},prototypes:{RxDatabase:e=>{e.migrationStates=function(){return Vx(this).pipe(Pu(Ou))}},RxCollection:e=>{e.getMigrationState=function(){return yi(CA,this,()=>new mA(this.asRxCollection,this.migrationStrategies))},e.migrationNeeded=function(){return this.schema.version===0?er:Yx(this.getMigrationState())}}}},SA=kA;Dv(SA);class Xx extends Error{constructor(t,n){super(t),this.name="SchemaVersionError",this.cause=n}}const Qr={type:"string",maxLength:100},EA={version:1,primaryKey:"id",type:"object",properties:{id:Qr,date:{type:"string",maxLength:10},amount:{type:"number"},description:{type:"string"},memo:{type:"string"},merchantId:{type:"string",maxLength:100},accountId:{type:"string",maxLength:100},tagIds:{type:"array",items:{type:"string"}}},required:["id","date","amount","description","tagIds"],indexes:["date"]},MA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,name:{type:"string",maxLength:200},icon:{type:"string"},color:{type:"string"}},required:["id","name"],indexes:["name"]},DA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,name:{type:"string",maxLength:200}},required:["id","name"],indexes:["name"]},$A={version:0,primaryKey:"id",type:"object",properties:{id:Qr,name:{type:"string"},type:{type:"string"}},required:["id","name"]},TA={version:1,primaryKey:"id",type:"object",properties:{id:Qr,logic:{type:"string"},conditions:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}},merchantId:{type:"string"},accountId:{type:"string"},tagIds:{type:"array",items:{type:"string"}}},required:["id","logic","conditions","tagIds"]},OA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,title:{type:"string"},chartType:{type:"string"},granularity:{type:"string"},startDate:{type:"string"},endDate:{type:"string"},tagId:{type:"string"},merchantId:{type:"string"},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"},excludedTagIds:{type:"array",items:{type:"string"}},excludedMerchantIds:{type:"array",items:{type:"string"}},direction:{type:"string"},descriptionFilter:{type:"string"},descriptionFilterMode:{type:"string"},legendPosition:{type:"string"},filters:{type:"array",items:{type:"object",properties:{field:{type:"string"},operator:{type:"string"},value:{type:"string"}}}}},required:["id","title","chartType","granularity","position"]},IA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,title:{type:"string"},model:{type:"string"},columns:{type:"array",items:{type:"string"}},position:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"}},required:["id","title","model","columns","position"]},PA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,value:{type:"number"}},required:["id","value"]},RA={version:0,primaryKey:"id",type:"object",properties:{id:Qr,data:{type:"string"}},required:["id"]};class mr{#t;constructor(t){this.#t=t}get rxCollection(){return this.#t}async get(t){const n=await this.#t.findOne(t).exec();if(!n)throw new Error(`Document not found: ${t}`);return n.toJSON(!0)}async put(t){return await this.#t.upsert(t),{id:t.id}}async bulkDocs(t){await this.#t.bulkUpsert(t)}async remove(t){const n=await this.#t.findOne(t).exec();n&&await n.remove()}async find(t){return(await this.#t.find(t).exec()).map(i=>i.toJSON(!0))}async all(){return(await this.#t.find().exec()).map(n=>n.toJSON(!0))}async clear(){const t=await this.#t.find().exec();await Promise.all(t.map(n=>n.remove()))}async count(){return this.#t.count().exec()}subscribe(t){const n=this.#t.$.subscribe(t);return{unsubscribe:()=>n.unsubscribe()}}}async function AA(e){const n=new TextEncoder().encode(e);if(typeof crypto<"u"&&crypto.subtle?.digest){const r=await crypto.subtle.digest("SHA-256",n),s=new Uint8Array(r);return Array.from(s,o=>o.toString(16).padStart(2,"0")).join("")}let i=2166136261;for(let r=0;r<n.length;r++)i^=n[r],i=Math.imul(i,16777619);return(i>>>0).toString(16).padStart(8,"0")}async function LA(e,t="budgee"){const n=await YP({name:t,storage:e,hashFunction:AA});try{await n.addCollections({transactions:{schema:EA,migrationStrategies:{1:i=>(i.description=i.originalDescription,delete i.originalDescription,i)}},tags:{schema:MA},merchants:{schema:DA},accounts:{schema:$A},merchant_rules:{schema:TA,migrationStrategies:{1:i=>i}},dashboard_charts:{schema:OA},dashboard_tables:{schema:IA},meta:{schema:PA},backups:{schema:RA}})}catch(i){throw(i instanceof Error?i.message:String(i)).includes("DB6")?new Xx("Database schema version mismatch (DB6)",i):i}return{rxdb:n,transactions:new mr(n.transactions),tags:new mr(n.tags),merchants:new mr(n.merchants),accounts:new mr(n.accounts),merchantRules:new mr(n.merchant_rules),dashboardCharts:new mr(n.dashboard_charts),dashboardTables:new mr(n.dashboard_tables),meta:new mr(n.meta),backups:new mr(n.backups)}}async function NA(){const{getRxStorageDexie:e}=await Oa(async()=>{const{getRxStorageDexie:t}=await import("./index-BYISYEZb.js");return{getRxStorageDexie:t}},[]);return LA(e())}const FA=NA().then(e=>e);function Z(){return FA}function ir(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=new Uint8Array(16);crypto.getRandomValues(e),e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Qs(e){if(!e)return{docs:[],idMap:new Map};const t=new Map;return{docs:e.map(i=>{if(i.id)return i;const s=String(i._id??""),o=ir();return s&&t.set(s,o),{...i,id:o}}),idMap:t}}function Nc(e,t){return t&&(e.get(t)??t)}function fh(e,t){return t&&t.map(n=>e.get(n)??n)}async function Qx(e){const t=await e.text(),n=JSON.parse(t),{migrateExport:i,LATEST_VERSION:r}=await Oa(async()=>{const{migrateExport:_,LATEST_VERSION:C}=await Promise.resolve().then(()=>YA);return{migrateExport:_,LATEST_VERSION:C}},void 0),s=i(n),o=await Z();await o.transactions.clear(),await o.tags.clear(),await o.merchants.clear(),await o.accounts.clear(),await o.merchantRules.clear(),await o.dashboardCharts.clear(),await o.dashboardTables.clear();const{docs:a,idMap:c}=Qs(s.tags),{docs:l,idMap:u}=Qs(s.merchants),{docs:h,idMap:d}=Qs(s.accounts),f=c.size>0||u.size>0||d.size>0,{docs:p}=Qs(s.transactions),{docs:g}=Qs(s.merchantRules),{docs:m}=Qs(s.dashboardCharts),{docs:b}=Qs(s.dashboardTables);if(f){for(const _ of p)_.merchantId=Nc(u,_.merchantId),_.accountId=Nc(d,_.accountId),_.tagIds=fh(c,_.tagIds)??_.tagIds;for(const _ of g)_.merchantId=Nc(u,_.merchantId),_.tagIds=fh(c,_.tagIds)??_.tagIds;for(const _ of m)_.tagId=Nc(c,_.tagId),_.merchantId=Nc(u,_.merchantId),_.excludedTagIds=fh(c,_.excludedTagIds),_.excludedMerchantIds=fh(u,_.excludedMerchantIds)}p.length&&await o.transactions.bulkDocs(p),a.length&&await o.tags.bulkDocs(a),l.length&&await o.merchants.bulkDocs(l),h.length&&await o.accounts.bulkDocs(h),g.length&&await o.merchantRules.bulkDocs(g),m.length&&await o.dashboardCharts.bulkDocs(m),b.length&&await o.dashboardTables.bulkDocs(b);try{const _=await o.meta.get("schema_version");await o.meta.put({..._,value:r})}catch{await o.meta.put({id:"schema_version",value:r})}}const Zx=[],Yi=Zx.length;function Jx(e){let t=e.version??Yi,n=e;for(;t<Yi;)n=Zx[t](n),t=n.version??t+1;return n}async function zA(e){return{version:Yi,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()}}async function jA(e,t){const n=`backup_${new Date().toISOString()}`;await e.backups.put({id:n,data:JSON.stringify(t)}),await BA(e,10)}async function BA(e,t){const n=await e.backups.all();if(n.length<=t)return;const r=n.sort((s,o)=>o.id.localeCompare(s.id)).slice(t);for(const s of r)await e.backups.remove(s.id)}async function WA(e){try{return(await e.meta.get("schema_version")).value}catch{return null}}async function HA(e,t){await e.meta.put({id:"schema_version",value:t})}async function UA(e,t){await e.transactions.clear(),await e.tags.clear(),await e.merchants.clear(),await e.accounts.clear(),await e.merchantRules.clear(),await e.dashboardCharts.clear(),await e.dashboardTables.clear(),t.transactions?.length&&await e.transactions.bulkDocs(t.transactions),t.tags?.length&&await e.tags.bulkDocs(t.tags),t.merchants?.length&&await e.merchants.bulkDocs(t.merchants),t.accounts?.length&&await e.accounts.bulkDocs(t.accounts),t.merchantRules?.length&&await e.merchantRules.bulkDocs(t.merchantRules),t.dashboardCharts?.length&&await e.dashboardCharts.bulkDocs(t.dashboardCharts),t.dashboardTables?.length&&await e.dashboardTables.bulkDocs(t.dashboardTables)}async function t2(e){const t=await WA(e);if(t!=null&&t>=Yi)return;const n=await zA(e);if(n.version=t??Yi,console.log(`[migrate] Current data at version ${n.version}`),(n.version??Yi)<Yi){await jA(e,n),console.log("[migrate] Backup saved");const i=Jx(n);console.log(`[migrate] Migrated to version ${i.version}`),await UA(e,i)}await HA(e,Yi),console.log("[migrate] Migration complete")}const YA=Object.freeze(Object.defineProperty({__proto__:null,LATEST_VERSION:Yi,migrateDatabase:t2,migrateExport:Jx},Symbol.toStringTag,{value:"Module"}));var e2=new WeakMap,qA=new WeakMap;function nb(e){return yi(qA,e,()=>Wx(e))}function VA(){var e=Hx(this.storage.name,this.token,this.name,this),t=this.close.bind(this);this.close=function(){return Yg(this.token,this),t()};var n=nb(e);return n||(n=nb(e),e2.set(this,n)),this.leaderElector=()=>n,n}function KA(){return this.multiInstance?this.leaderElector().isLeader:!0}function GA(){return this.multiInstance?this.leaderElector().awaitLeadership().then(()=>!0):cv}function XA(e){var t=e2.get(e);t&&t.die()}var QA=!0,ZA={RxDatabase:e=>{e.leaderElector=VA,e.isLeader=KA,e.waitForLeadership=GA}},JA={name:"leader-election",rxdb:QA,prototypes:ZA,hooks:{preCloseRxDatabase:{after:XA}}},ib=e=>Promise.resolve(e);function rb(e,t){if(e==="_deleted")return t;t=qt(t);var n=!!t._deleted;return t[e]=n,delete t._deleted,t}function Lp(e,t,n){return n.map(i=>{var r=qt(i);if(t!=="_deleted"){var s=!!r[t];r._deleted=s,delete r[t]}else r._deleted=!!r._deleted;var o=e.schema.primaryPath;return r[o]=Ws(e.schema.jsonSchema,r),r})}function sb(e,t){if(typeof window>"u"||typeof window!="object"||typeof window.addEventListener>"u"||navigator.onLine)return e.promiseWait(t);var n,i=new Promise(r=>{n=()=>{window.removeEventListener("online",n),r()},window.addEventListener("online",n)});return Promise.race([i,e.promiseWait(t)]).then(()=>{window.removeEventListener("online",n)})}function t4(e){function t(){if(!(typeof document>"u"||typeof document.dispatchEvent!="function")){var i=new Event("mousemove");document.dispatchEvent(i)}}var n=setInterval(t,20*1e3);e.onCancel.push(()=>clearInterval(n))}var e4=new WeakMap,n4=(function(){function e(n,i,r,s,o,a,c,l,u){this.subs=[],this.subjects={received:new Fe,sent:new Fe,error:new Fe,canceled:new ui(!1),active:new ui(!1)},this.received$=this.subjects.received.asObservable(),this.sent$=this.subjects.sent.asObservable(),this.error$=this.subjects.error.asObservable(),this.canceled$=this.subjects.canceled.asObservable(),this.active$=this.subjects.active.asObservable(),this.wasStarted=!1,this.startQueue=di,this.onCancel=[],this.callOnStart=void 0,this.remoteEvents$=new Fe,this.replicationIdentifier=n,this.collection=i,this.deletedField=r,this.pull=s,this.push=o,this.live=a,this.retryTime=c,this.autoStart=l,this.toggleOnDocumentVisible=u,this.metaInfoPromise=(async()=>{var f="rx-replication-meta-"+await i.database.hashFunction([this.collection.name,this.replicationIdentifier].join("-")),p=Bg(this.collection.schema.jsonSchema,Ed(this.collection.schema.jsonSchema));return{collectionName:f,schema:p}})();var h=yi(e4,i,()=>[]);h.push(this),this.collection.onClose.push(()=>this.cancel()),Object.keys(this.subjects).forEach(f=>{Object.defineProperty(this,f+"$",{get:function(){return this.subjects[f].asObservable()}})});var d=new Promise(f=>{this.callOnStart=f});this.startPromise=d}var t=e.prototype;return t.start=function(){return this.startQueue=this.startQueue.then(()=>this._start()),this.startQueue},t._start=async function(){if(!this.isStopped()){if(this.internalReplicationState&&this.internalReplicationState.events.paused.next(!1),this.wasStarted){this.reSync();return}this.wasStarted=!0,this.toggleOnDocumentVisible||t4(this);var i=this.pull&&this.pull.modifier?this.pull.modifier:ib,r=this.push&&this.push.modifier?this.push.modifier:ib,s=this.collection.database,o=await this.metaInfoPromise,[a]=await Promise.all([this.collection.database.storage.createStorageInstance({databaseName:s.name,collectionName:o.collectionName,databaseInstanceToken:s.token,multiInstance:s.multiInstance,options:{},schema:o.schema,password:s.password,devMode:At.isDevMode()}),gx(this.collection,o.collectionName,o.schema)]);this.metaInstance=a,this.internalReplicationState=Ex({pushBatchSize:this.push&&this.push.batchSize?this.push.batchSize:100,pullBatchSize:this.pull&&this.pull.batchSize?this.pull.batchSize:100,initialCheckpoint:{upstream:this.push?this.push.initialCheckpoint:void 0,downstream:this.pull?this.pull.initialCheckpoint:void 0},forkInstance:this.collection.storageInstance,metaInstance:this.metaInstance,hashFunction:s.hashFunction,identifier:"rxdbreplication"+this.replicationIdentifier,conflictHandler:this.collection.conflictHandler,replicationHandler:{masterChangeStream$:this.remoteEvents$.asObservable().pipe(Ot(c=>!!this.pull),nr(async c=>{if(c==="RESYNC")return c;var l=qt(c);return l.documents=Lp(this.collection,this.deletedField,l.documents),l.documents=await Promise.all(l.documents.map(u=>i(u))),l})),masterChangesSince:async(c,l)=>{if(!this.pull)return{checkpoint:null,documents:[]};for(var u=!1,h={};!u&&!this.isStoppedOrPaused();)try{h=await this.pull.handler(c,l),u=!0}catch(p){var d=U("RC_PULL",{checkpoint:c,errors:md(p).map(g=>wd(g)),direction:"pull"});this.subjects.error.next(d),await sb(this.collection,Q(this.retryTime))}if(this.isStoppedOrPaused())return{checkpoint:null,documents:[]};var f=qt(h);return f.documents=Lp(this.collection,this.deletedField,f.documents),f.documents=await Promise.all(f.documents.map(p=>i(p))),f},masterWrite:async c=>{if(!this.push)return[];var l=!1;await Do("preReplicationMasterWrite",{rows:c,collection:this.collection});var u=await Promise.all(c.map(async g=>(g.newDocumentState=await r(g.newDocumentState),g.newDocumentState===null?null:(g.assumedMasterState&&(g.assumedMasterState=await r(g.assumedMasterState)),this.deletedField!=="_deleted"&&(g.newDocumentState=rb(this.deletedField,g.newDocumentState),g.assumedMasterState&&(g.assumedMasterState=rb(this.deletedField,g.assumedMasterState))),g)))),h=u.filter(v$),d=null;for(h.length===0&&(l=!0,d=[]);!l&&!this.isStoppedOrPaused();)try{if(d=await this.push.handler(h),!Array.isArray(d))throw U("RC_PUSH_NO_AR",{pushRows:c,direction:"push",args:{result:d}});l=!0}catch(g){var f=g.rxdb?g:U("RC_PUSH",{pushRows:c,errors:md(g).map(m=>wd(m)),direction:"push"});this.subjects.error.next(f),await sb(this.collection,Q(this.retryTime))}if(this.isStoppedOrPaused())return[];await Do("preReplicationMasterWriteDocumentsHandle",{result:d,collection:this.collection});var p=Lp(this.collection,this.deletedField,Q(d));return p}}}),this.subs.push(this.internalReplicationState.events.error.subscribe(c=>{this.subjects.error.next(c)}),this.internalReplicationState.events.processed.down.subscribe(c=>this.subjects.received.next(c.document)),this.internalReplicationState.events.processed.up.subscribe(c=>{this.subjects.sent.next(c.newDocumentState)}),pv([this.internalReplicationState.events.active.down,this.internalReplicationState.events.active.up]).subscribe(([c,l])=>{var u=c||l;this.subjects.active.next(u)})),this.pull&&this.pull.stream$&&this.live&&this.subs.push(this.pull.stream$.subscribe({next:c=>{this.isStoppedOrPaused()||this.remoteEvents$.next(c)},error:c=>{this.subjects.error.next(c)}})),this.live||(await Fh(this.internalReplicationState),await Hg(this.internalReplicationState),await this._cancel()),this.callOnStart()}},t.pause=function(){return this.startQueue=this.startQueue.then(()=>{this.internalReplicationState&&this.internalReplicationState.events.paused.next(!0)}),this.startQueue},t.isPaused=function(){return!!(this.internalReplicationState&&this.internalReplicationState.events.paused.getValue())},t.isStopped=function(){return!!this.subjects.canceled.getValue()},t.isStoppedOrPaused=function(){return this.isPaused()||this.isStopped()},t.awaitInitialReplication=async function(){return await this.startPromise,Fh(Q(this.internalReplicationState))},t.awaitInSync=async function(){await this.startPromise,await Fh(Q(this.internalReplicationState));for(var i=2;i>0;)i--,await this.collection.database.requestIdlePromise(),await Hg(Q(this.internalReplicationState));return!0},t.reSync=function(){this.remoteEvents$.next("RESYNC")},t.emitEvent=function(i){this.remoteEvents$.next(i)},t.cancel=async function(){this.startQueue=this.startQueue.catch(()=>{}).then(async()=>{await this._cancel()}),await this.startQueue},t._cancel=async function(i=!1){if(this.isStopped())return er;var r=this.onCancel.map(s=>h1(s()));return this.internalReplicationState&&await Mx(this.internalReplicationState),this.metaInstance&&!i&&r.push(Q(this.internalReplicationState).checkpointQueue.then(()=>Q(this.metaInstance).close())),this.subs.forEach(s=>s.unsubscribe()),this.subjects.canceled.next(!0),this.subjects.active.complete(),this.subjects.canceled.complete(),this.subjects.error.complete(),this.subjects.received.complete(),this.subjects.sent.complete(),Promise.all(r)},t.remove=async function(){return this.startQueue=this.startQueue.then(async()=>{var i=await this.metaInfoPromise;await this._cancel(!0),await Q(this.internalReplicationState).checkpointQueue.then(()=>Q(this.metaInstance).remove()),await DP(this.collection,i.collectionName,i.schema)}),this.startQueue},e})();function i4({replicationIdentifier:e,collection:t,deletedField:n="_deleted",pull:i,push:r,live:s=!0,retryTime:o=1e3*5,waitForLeadership:a=!0,autoStart:c=!0,toggleOnDocumentVisible:l=!1}){if(Dv(JA),!i&&!r)throw U("UT3",{collection:t.name,args:{replicationIdentifier:e}});var u=new n4(e,t,n,i,r,s,o,c,l);if(l&&typeof document<"u"&&typeof document.addEventListener=="function"&&typeof document.visibilityState=="string"){var h=()=>{if(!u.isStopped()){var d=document.visibilityState==="visible";d?u.start():t.database.isLeader()||u.pause()}};document.addEventListener("visibilitychange",h),u.onCancel.push(()=>document.removeEventListener("visibilitychange",h))}return r4(a,u),u}function r4(e,t){var n=e&&t.collection.database.multiInstance,i=n?t.collection.database.waitForLeadership():cv;return i.then(()=>{t.isStopped()||t.autoStart&&t.start()})}var Vg=function(e,t){return Vg=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)i.hasOwnProperty(r)&&(n[r]=i[r])},Vg(e,t)};function n2(e,t){Vg(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function s4(e){var t=typeof Symbol=="function"&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function o4(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var i=n.call(e),r,s=[],o;try{for(;(t===void 0||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}function a4(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(o4(arguments[t]));return e}var i2=(function(){function e(t,n){this.target=n,this.type=t}return e})(),c4=(function(e){n2(t,e);function t(n,i){var r=e.call(this,"error",i)||this;return r.message=n.message,r.error=n,r}return t})(i2),l4=(function(e){n2(t,e);function t(n,i,r){n===void 0&&(n=1e3),i===void 0&&(i="");var s=e.call(this,"close",r)||this;return s.wasClean=!0,s.code=n,s.reason=i,s}return t})(i2);var u4=function(){if(typeof WebSocket<"u")return WebSocket},h4=function(e){return typeof e<"u"&&!!e&&e.CLOSING===2},Zs={maxReconnectionDelay:1e4,minReconnectionDelay:1e3+Math.random()*4e3,minUptime:5e3,reconnectionDelayGrowFactor:1.3,connectionTimeout:4e3,maxRetries:1/0,maxEnqueuedMessages:1/0},d4=(function(){function e(t,n,i){var r=this;i===void 0&&(i={}),this._listeners={error:[],message:[],open:[],close:[]},this._retryCount=-1,this._shouldReconnect=!0,this._connectLock=!1,this._binaryType="blob",this._closeCalled=!1,this._messageQueue=[],this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this._handleOpen=function(s){r._debug("open event");var o=r._options.minUptime,a=o===void 0?Zs.minUptime:o;clearTimeout(r._connectTimeout),r._uptimeTimeout=setTimeout(function(){return r._acceptOpen()},a),r._ws.binaryType=r._binaryType,r._messageQueue.forEach(function(c){return r._ws.send(c)}),r._messageQueue=[],r.onopen&&r.onopen(s),r._listeners.open.forEach(function(c){return r._callEventListener(s,c)})},this._handleMessage=function(s){r._debug("message event"),r.onmessage&&r.onmessage(s),r._listeners.message.forEach(function(o){return r._callEventListener(s,o)})},this._handleError=function(s){r._debug("error event",s.message),r._disconnect(void 0,s.message==="TIMEOUT"?"timeout":void 0),r.onerror&&r.onerror(s),r._debug("exec error listeners"),r._listeners.error.forEach(function(o){return r._callEventListener(s,o)}),r._connect()},this._handleClose=function(s){r._debug("close event"),r._clearTimeouts(),r._shouldReconnect&&r._connect(),r.onclose&&r.onclose(s),r._listeners.close.forEach(function(o){return r._callEventListener(s,o)})},this._url=t,this._protocols=n,this._options=i,this._options.startClosed&&(this._shouldReconnect=!1),this._connect()}return Object.defineProperty(e,"CONNECTING",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(e,"OPEN",{get:function(){return 1},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSING",{get:function(){return 2},enumerable:!0,configurable:!0}),Object.defineProperty(e,"CLOSED",{get:function(){return 3},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CONNECTING",{get:function(){return e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"OPEN",{get:function(){return e.OPEN},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSING",{get:function(){return e.CLOSING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"CLOSED",{get:function(){return e.CLOSED},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"binaryType",{get:function(){return this._ws?this._ws.binaryType:this._binaryType},set:function(t){this._binaryType=t,this._ws&&(this._ws.binaryType=t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"retryCount",{get:function(){return Math.max(this._retryCount,0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var t=this._messageQueue.reduce(function(n,i){return typeof i=="string"?n+=i.length:i instanceof Blob?n+=i.size:n+=i.byteLength,n},0);return t+(this._ws?this._ws.bufferedAmount:0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this._ws?this._ws.extensions:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this._ws?this._ws.protocol:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this._ws?this._ws.readyState:this._options.startClosed?e.CLOSED:e.CONNECTING},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"url",{get:function(){return this._ws?this._ws.url:""},enumerable:!0,configurable:!0}),e.prototype.close=function(t,n){if(t===void 0&&(t=1e3),this._closeCalled=!0,this._shouldReconnect=!1,this._clearTimeouts(),!this._ws){this._debug("close enqueued: no ws instance");return}if(this._ws.readyState===this.CLOSED){this._debug("close: already closed");return}this._ws.close(t,n)},e.prototype.reconnect=function(t,n){this._shouldReconnect=!0,this._closeCalled=!1,this._retryCount=-1,!this._ws||this._ws.readyState===this.CLOSED?this._connect():(this._disconnect(t,n),this._connect())},e.prototype.send=function(t){if(this._ws&&this._ws.readyState===this.OPEN)this._debug("send",t),this._ws.send(t);else{var n=this._options.maxEnqueuedMessages,i=n===void 0?Zs.maxEnqueuedMessages:n;this._messageQueue.length<i&&(this._debug("enqueue",t),this._messageQueue.push(t))}},e.prototype.addEventListener=function(t,n){this._listeners[t]&&this._listeners[t].push(n)},e.prototype.dispatchEvent=function(t){var n,i,r=this._listeners[t.type];if(r)try{for(var s=s4(r),o=s.next();!o.done;o=s.next()){var a=o.value;this._callEventListener(t,a)}}catch(c){n={error:c}}finally{try{o&&!o.done&&(i=s.return)&&i.call(s)}finally{if(n)throw n.error}}return!0},e.prototype.removeEventListener=function(t,n){this._listeners[t]&&(this._listeners[t]=this._listeners[t].filter(function(i){return i!==n}))},e.prototype._debug=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this._options.debug&&console.log.apply(console,a4(["RWS>"],t))},e.prototype._getNextDelay=function(){var t=this._options,n=t.reconnectionDelayGrowFactor,i=n===void 0?Zs.reconnectionDelayGrowFactor:n,r=t.minReconnectionDelay,s=r===void 0?Zs.minReconnectionDelay:r,o=t.maxReconnectionDelay,a=o===void 0?Zs.maxReconnectionDelay:o,c=0;return this._retryCount>0&&(c=s*Math.pow(i,this._retryCount-1),c>a&&(c=a)),this._debug("next delay",c),c},e.prototype._wait=function(){var t=this;return new Promise(function(n){setTimeout(n,t._getNextDelay())})},e.prototype._getNextUrl=function(t){if(typeof t=="string")return Promise.resolve(t);if(typeof t=="function"){var n=t();if(typeof n=="string")return Promise.resolve(n);if(n.then)return n}throw Error("Invalid URL")},e.prototype._connect=function(){var t=this;if(!(this._connectLock||!this._shouldReconnect)){this._connectLock=!0;var n=this._options,i=n.maxRetries,r=i===void 0?Zs.maxRetries:i,s=n.connectionTimeout,o=s===void 0?Zs.connectionTimeout:s,a=n.WebSocket,c=a===void 0?u4():a;if(this._retryCount>=r){this._debug("max retries reached",this._retryCount,">=",r);return}if(this._retryCount++,this._debug("connect",this._retryCount),this._removeListeners(),!h4(c))throw Error("No valid WebSocket class provided");this._wait().then(function(){return t._getNextUrl(t._url)}).then(function(l){t._closeCalled||(t._debug("connect",{url:l,protocols:t._protocols}),t._ws=t._protocols?new c(l,t._protocols):new c(l),t._ws.binaryType=t._binaryType,t._connectLock=!1,t._addListeners(),t._connectTimeout=setTimeout(function(){return t._handleTimeout()},o))})}},e.prototype._handleTimeout=function(){this._debug("timeout event"),this._handleError(new c4(Error("TIMEOUT"),this))},e.prototype._disconnect=function(t,n){if(t===void 0&&(t=1e3),this._clearTimeouts(),!!this._ws){this._removeListeners();try{this._ws.close(t,n),this._handleClose(new l4(t,n,this))}catch{}}},e.prototype._acceptOpen=function(){this._debug("accept open"),this._retryCount=0},e.prototype._callEventListener=function(t,n){"handleEvent"in n?n.handleEvent(t):n(t)},e.prototype._removeListeners=function(){this._ws&&(this._debug("removeListeners"),this._ws.removeEventListener("open",this._handleOpen),this._ws.removeEventListener("close",this._handleClose),this._ws.removeEventListener("message",this._handleMessage),this._ws.removeEventListener("error",this._handleError))},e.prototype._addListeners=function(){this._ws&&(this._debug("addListeners"),this._ws.addEventListener("open",this._handleOpen),this._ws.addEventListener("close",this._handleClose),this._ws.addEventListener("message",this._handleMessage),this._ws.addEventListener("error",this._handleError))},e.prototype._clearTimeouts=function(){clearTimeout(this._connectTimeout),clearTimeout(this._uptimeTimeout)},e})(),ho=null;typeof WebSocket<"u"?ho=WebSocket:typeof MozWebSocket<"u"?ho=MozWebSocket:typeof global<"u"?ho=global.WebSocket||global.MozWebSocket:typeof window<"u"?ho=window.WebSocket||window.MozWebSocket:typeof self<"u"&&(ho=self.WebSocket||self.MozWebSocket);function f4(e){var t=typeof e<"u"&&!!e&&e.CLOSING===2;if(!t)throw console.dir(e),new Error("websocket not valid")}async function p4(e){f4(ho);var t=new d4(e.url,[],{WebSocket:ho}),n=new ui(!1),i=new Fe,r=new Fe;return t.onerror=s=>{var o=U("RC_STREAM",{errors:md(s).map(a=>wd(a)),direction:"pull"});r.next(o)},await new Promise(s=>{t.onopen=()=>{if(e.headers){var o={collection:e.collection.name,id:Ko(10),params:[e.headers],method:"auth"};t.send(JSON.stringify(o))}n.next(!0),s()}}),t.onclose=()=>{n.next(!1)},t.onmessage=s=>{var o=JSON.parse(s.data);i.next(o)},{url:e.url,socket:t,connected$:n,message$:i,error$:r}}async function g4(e){var t=await p4(e),n=t.socket,i=t.message$,r=0,s=Ko(10);function o(){var c=r++;return e.collection.database.token+"|"+s+"|"+c}var a=i4({collection:e.collection,replicationIdentifier:e.replicationIdentifier,live:e.live,pull:{batchSize:e.batchSize,stream$:i.pipe(Ot(c=>c.id==="stream"&&c.collection===e.collection.name),Ht(c=>c.result)),async handler(c,l){var u=o(),h={id:u,collection:e.collection.name,method:"masterChangesSince",params:[c,l]};n.send(JSON.stringify(h));var d=await Pr(i.pipe(Ot(f=>f.id===u),Ht(f=>f.result)));return d}},push:{batchSize:e.batchSize,handler(c){var l=o(),u={id:l,collection:e.collection.name,method:"masterWrite",params:[c]};return n.send(JSON.stringify(u)),Pr(i.pipe(Ot(h=>h.id===l),Ht(h=>h.result)))}}});return t.error$.subscribe(c=>a.subjects.error.next(c)),t.connected$.subscribe(c=>{if(c){a.reSync();var l={id:"stream",collection:e.collection.name,method:"masterChangeStream$",params:[]};n.send(JSON.stringify(l))}}),e.collection.onClose.push(()=>t.socket.close()),a}async function m4(e){const t=await fetch(`${e}/health`);if(!t.ok)throw new Error(`Server returned ${t.status} ${t.statusText}`)}const v4=["transactions","tags","merchants","accounts","merchant_rules","dashboard_charts","dashboard_tables"],zh=new ui({state:"not-configured"}),y4=zh.pipe(L1(e=>{if(e.state==="not-configured")return _y("not-configured");if(e.state==="connecting")return _y("connecting");const{replications:t}=e,n=Tg(...t.map(r=>r.error$)).pipe(Ht(()=>"error")),i=pv(t.map(r=>r.active$)).pipe(Ht(r=>r.some(Boolean)?"syncing":"synced"));return Tg(i,n)}));async function b4(e){zh.next({state:"connecting"});const n=(await Z()).rxdb,i=e.replace(/^http/,"ws")+"/ws",r=await Promise.all(v4.map(async s=>{const o=n[s],a=`budgee--${s}`;try{await fetch(`${e}/databases`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:a,schema:o.schema.jsonSchema})})}catch(c){console.warn(`Failed to register schema for ${s}:`,c)}return g4({collection:o,replicationIdentifier:a,url:`${i}/${a}`,live:!0})}));return zh.next({state:"connected",replications:r}),async()=>{zh.next({state:"not-configured"}),await Promise.all(r.map(s=>s.cancel().catch(console.error)))}}const Li=pt`
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
`,r2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var _4=Object.defineProperty,w4=Object.getOwnPropertyDescriptor,s2=e=>{throw TypeError(e)},o2=(e,t,n,i)=>{for(var r=i>1?void 0:i?w4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&_4(t,n,r),r},x4=(e,t,n)=>t.has(e)||s2("Cannot "+n),C4=(e,t,n)=>t.has(e)?s2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ob=(e,t,n)=>(x4(e,t,"access private method"),n),jh,a2,c2;let Rd=class extends mt{constructor(){super(...arguments),C4(this,jh),this.heading=""}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.shadowRoot?.getElementById("popover");e?.showPopover?.(),e?.addEventListener("toggle",t=>{t.newState==="closed"&&this.dispatchEvent(new CustomEvent("modal-close"))}),ob(this,jh,a2).call(this)})}render(){return E`
      <div id="popover" popover="auto" role="dialog" aria-modal="true" aria-label=${this.heading}>
        <div class="header">
          <h3>${this.heading}</h3>
          <button class="close" aria-label="Close" @click=${ob(this,jh,c2)}>${ye(r2)}</button>
        </div>
        <slot></slot>
      </div>
    `}};jh=new WeakSet;a2=function(){const e=this.shadowRoot?.getElementById("popover");e&&e.addEventListener("keydown",t=>{if(t.key!=="Tab")return;const n='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',i=[...Array.from(e.querySelectorAll(n)),...Array.from(this.querySelectorAll(n))];if(i.length===0)return;const r=i[0],s=i[i.length-1];t.shiftKey&&document.activeElement===r?(t.preventDefault(),s.focus()):!t.shiftKey&&document.activeElement===s&&(t.preventDefault(),r.focus())})};c2=function(){this.shadowRoot?.getElementById("popover")?.hidePopover?.()};Rd.styles=pt`
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
  `;o2([H({type:String})],Rd.prototype,"heading",2);Rd=o2([Et("budgee-modal")],Rd);var k4=Object.defineProperty,S4=Object.getOwnPropertyDescriptor,l2=e=>{throw TypeError(e)},bc=(e,t,n,i)=>{for(var r=i>1?void 0:i?S4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&k4(t,n,r),r},Iv=(e,t,n)=>t.has(e)||l2("Cannot "+n),Pv=(e,t,n)=>(Iv(e,t,"read from private field"),n?n.call(e):t.get(e)),ab=(e,t,n)=>t.has(e)?l2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),E4=(e,t,n,i)=>(Iv(e,t,"write to private field"),t.set(e,n),n),Np=(e,t,n)=>(Iv(e,t,"access private method"),n),Xa,Zc,u2,h2,d2;let _i=class extends mt{constructor(){super(...arguments),ab(this,Zc),this.heading="Are you sure?",this.message="",this.confirmLabel="Confirm",this.cancelLabel="Cancel",this.danger=!1,ab(this,Xa)}static show(e){return new Promise(t=>{const n=document.createElement("budgee-confirm-dialog");e.heading&&(n.heading=e.heading),n.message=e.message,e.confirmLabel&&(n.confirmLabel=e.confirmLabel),e.cancelLabel&&(n.cancelLabel=e.cancelLabel),e.danger&&(n.danger=e.danger),E4(n,Xa,i=>{n.remove(),t(i)}),document.body.appendChild(n)})}render(){return E`
      <budgee-modal heading=${this.heading} @modal-close=${Np(this,Zc,d2)}>
        <div class="message">${this.message}</div>
        <div class="actions">
          <button class="secondary" @click=${Np(this,Zc,h2)}>${this.cancelLabel}</button>
          <button class=${this.danger?"danger":""} @click=${Np(this,Zc,u2)}>
            ${this.confirmLabel}
          </button>
        </div>
      </budgee-modal>
    `}};Xa=new WeakMap;Zc=new WeakSet;u2=function(){var e;(e=Pv(this,Xa))==null||e.call(this,!0)};h2=function(){var e;(e=Pv(this,Xa))==null||e.call(this,!1)};d2=function(){var e;(e=Pv(this,Xa))==null||e.call(this,!1)};_i.styles=[Li,pt`
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
    `];bc([H()],_i.prototype,"heading",2);bc([H()],_i.prototype,"message",2);bc([H({attribute:"confirm-label"})],_i.prototype,"confirmLabel",2);bc([H({attribute:"cancel-label"})],_i.prototype,"cancelLabel",2);bc([H({type:Boolean})],_i.prototype,"danger",2);_i=bc([Et("budgee-confirm-dialog")],_i);var M4=Object.defineProperty,D4=Object.getOwnPropertyDescriptor,f2=e=>{throw TypeError(e)},zu=(e,t,n,i)=>{for(var r=i>1?void 0:i?D4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&M4(t,n,r),r},$4=(e,t,n)=>t.has(e)||f2("Cannot "+n),T4=(e,t,n)=>t.has(e)?f2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ad=(e,t,n)=>($4(e,t,"access private method"),n),Aa,p2,g2,m2,v2;let Ro=class extends mt{constructor(){super(...arguments),T4(this,Aa),this.error="An unexpected error occurred.",this.isDatabaseError=!1,this._exporting=!1,this._deleting=!1}render(){return E`
      <div class="card">
        <h2>${this.isDatabaseError?"Database Error":"Something Went Wrong"}</h2>
        <p>${this.error}</p>
        <div class="actions">
          ${this.isDatabaseError?Ad(this,Aa,p2).call(this):Ad(this,Aa,g2).call(this)}
        </div>
      </div>
    `}};Aa=new WeakSet;p2=function(){return E`
      <button class="export-btn" ?disabled=${this._exporting} @click=${Ad(this,Aa,m2)}>
        ${this._exporting?"Exporting…":"Export raw data"}
      </button>
      <button class="delete-btn" ?disabled=${this._deleting} @click=${Ad(this,Aa,v2)}>
        ${this._deleting?"Deleting…":"Delete database and reload"}
      </button>
    `};g2=function(){return E`
      <button class="reload-btn" @click=${()=>window.location.reload()}>Reload</button>
    `};m2=async function(){this._exporting=!0;try{const e=await O4(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`budgee-raw-export-${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(n)}catch(e){console.error("Export failed:",e),alert("Export failed. Check the browser console for details.")}finally{this._exporting=!1}};v2=async function(){if(await _i.show({heading:"Delete Database",message:"This will permanently delete all local data. Are you sure?",confirmLabel:"Delete",danger:!0})){this._deleting=!0;try{const n=(await indexedDB.databases()).filter(i=>i.name?.startsWith("budgee"));await Promise.all(n.map(i=>new Promise((r,s)=>{const o=indexedDB.deleteDatabase(i.name);o.onsuccess=()=>r(),o.onerror=()=>s(o.error)}))),window.location.reload()}catch(t){console.error("Delete failed:",t),alert("Delete failed. Check the browser console for details."),this._deleting=!1}}};Ro.styles=pt`
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
  `;zu([H()],Ro.prototype,"error",2);zu([H({type:Boolean})],Ro.prototype,"isDatabaseError",2);zu([P()],Ro.prototype,"_exporting",2);zu([P()],Ro.prototype,"_deleting",2);Ro=zu([Et("budgee-error-overlay")],Ro);async function O4(){const t=(await indexedDB.databases()).filter(i=>i.name?.startsWith("budgee")),n={};for(const i of t){const r=i.name,s=await new Promise((c,l)=>{const u=indexedDB.open(r);u.onsuccess=()=>c(u.result),u.onerror=()=>l(u.error)}),o={},a=Array.from(s.objectStoreNames);if(a.length>0){const c=s.transaction(a,"readonly");for(const l of a)o[l]=await new Promise((u,h)=>{const d=c.objectStore(l).getAll();d.onsuccess=()=>u(d.result),d.onerror=()=>h(d.error)})}s.close(),n[r]=o}return n}function Kg(e,t){if(document.querySelector("budgee-error-overlay"))return;const i=document.createElement("budgee-error-overlay");i.error=e,i.isDatabaseError=t?.isDatabaseError??!1,document.body.appendChild(i)}function I4(){window.addEventListener("error",e=>{const t=e.message||"An unknown error occurred.";Kg(t)}),window.addEventListener("unhandledrejection",e=>{const t=e.reason,n=t instanceof Error?t.message:t?String(t):"An unhandled promise rejection occurred.";Kg(n)})}const y2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var P4=Object.defineProperty,R4=Object.getOwnPropertyDescriptor,b2=(e,t,n,i)=>{for(var r=i>1?void 0:i?R4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&P4(t,n,r),r};let Ld=class extends mt{constructor(){super(...arguments),this.message=""}render(){return E`
      <div class="icon">${ye(y2)}</div>
      <div class="message">${this.message}</div>
    `}};Ld.styles=pt`
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
  `;b2([H()],Ld.prototype,"message",2);Ld=b2([Et("budgee-loading-overlay")],Ld);let ds=null;function Rv(e){if(ds){ds.message=e;return}ds=document.createElement("budgee-loading-overlay"),ds.message=e,document.body.appendChild(ds)}function Av(){ds&&(ds.remove(),ds=null)}let Fc=null,cb=!1;async function Fp(){if(Fc)return Fc;const e=await Z();return Fc=(await e.transactions.all()).map(n=>new _e(n)),cb||(cb=!0,e.transactions.subscribe(()=>{Fc=null})),Fc}class _e{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).transactions.subscribe(t)}static async all(){return Fp()}static async get(t){const n=await Z();try{return new _e(await n.transactions.get(t))}catch{return}}static async update(t,n){const i=await Z(),r=await i.transactions.get(t);await i.transactions.put({...r,...n})}static async bulkPut(t){await(await Z()).transactions.bulkDocs(t.map(i=>({...i,id:i.id??ir()})))}static async bulkAdd(t){await(await Z()).transactions.bulkDocs(t.map(i=>({...i,id:ir()})))}static async forMerchant(t){return(await Fp()).filter(i=>i.merchantId===t).sort((i,r)=>r.date.localeCompare(i.date))}static async forAccount(t){return(await Fp()).filter(i=>i.accountId===t).sort((i,r)=>r.date.localeCompare(i.date))}static async bulkRemove(t){const n=await Z();await Promise.all(t.map(i=>n.transactions.remove(i)))}static async deleteAll(){const t=await Z(),n=await t.transactions.all();return await Promise.all(n.map(i=>t.transactions.remove(i.id))),n.length}static async deleteForAccount(t){const n=await Z(),r=(await n.transactions.all()).filter(s=>s.accountId===t);return await Promise.all(r.map(s=>n.transactions.remove(s.id))),r.length}}class Ie{constructor(t){this.id=t.id,this.name=t.name}static async subscribe(t){return(await Z()).merchants.subscribe(t)}static async all(){return(await(await Z()).merchants.all()).map(n=>new Ie(n))}static async get(t){const n=await Z();try{return new Ie(await n.merchants.get(t))}catch{return}}static async create(t){const n=await Z(),i={id:ir(),name:t};return await n.merchants.put(i),new Ie(i)}static async update(t,n){const i=await Z(),r=await i.merchants.get(t);await i.merchants.put({...r,...n})}static async remove(t){await(await Z()).merchants.remove(t)}static async byName(t){const r=(await(await Z()).merchants.all()).find(s=>s.name.toLowerCase()===t.toLowerCase());return r?new Ie(r):void 0}}function A4(){const e=40+Math.floor(Math.random()*20),t=20+Math.floor(Math.random()*30),n=Math.floor(Math.random()*360);return`lch(${e} ${t} ${n})`}class pe{constructor(t){this.id=t.id,this.name=t.name,this.icon=t.icon,this.color=t.color}static async subscribe(t){return(await Z()).tags.subscribe(t)}static async all(){return(await(await Z()).tags.all()).map(n=>new pe(n))}static async create(t,n){const i=await Z(),r={id:ir(),name:t,color:A4(),...n};return await i.tags.put(r),new pe(r)}static async update(t,n){const i=await Z(),r=await i.tags.get(t);await i.tags.put({...r,...n})}static async remove(t){await(await Z()).tags.remove(t)}static async byName(t){const r=(await(await Z()).tags.all()).find(s=>s.name.toLowerCase()===t.toLowerCase());return r?new pe(r):void 0}}class ke{constructor(t){this.id=t.id,this.name=t.name,this.type=t.type}static async subscribe(t){return(await Z()).accounts.subscribe(t)}static async all(){return(await(await Z()).accounts.all()).map(n=>new ke(n))}static async get(t){const n=await Z();try{return new ke(await n.accounts.get(t))}catch{return}}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.accounts.put(i),new ke(i)}static async update(t,n){const i=await Z(),r=await i.accounts.get(t);await i.accounts.put({...r,...n})}static async remove(t){await(await Z()).accounts.remove(t)}static toLookup(t){const n={};for(const i of t)n[i.id]=i;return n}}function _c(e){window.history.pushState({},"",e),window.dispatchEvent(new PopStateEvent("popstate"))}var L4=Object.defineProperty,N4=Object.getOwnPropertyDescriptor,_2=e=>{throw TypeError(e)},ju=(e,t,n,i)=>{for(var r=i>1?void 0:i?N4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&L4(t,n,r),r},Lv=(e,t,n)=>t.has(e)||_2("Cannot "+n),Gg=(e,t,n)=>(Lv(e,t,"read from private field"),n?n.call(e):t.get(e)),zp=(e,t,n)=>t.has(e)?_2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),F4=(e,t,n,i)=>(Lv(e,t,"write to private field"),t.set(e,n),n),li=(e,t,n)=>(Lv(e,t,"access private method"),n),Nd,Bh,On,w2,Of,x2,C2,k2,Nv,S2,E2,M2;let Ao=class extends mt{constructor(){super(...arguments),zp(this,On),this._open=!1,this._query="",this._results=[],this._activeIndex=0,zp(this,Nd),zp(this,Bh,e=>{(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),li(this,On,w2).call(this))})}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",Gg(this,Bh))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",Gg(this,Bh))}render(){if(!this._open)return nt;const e=li(this,On,E2).call(this);let t=0;return E`
      <div @click=${li(this,On,S2)}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Search">
          <input
            type="text"
            placeholder="Search transactions, merchants, tags, accounts…"
            .value=${this._query}
            @input=${li(this,On,x2)}
            @keydown=${li(this,On,k2)}
            aria-label="Search"
          />
          <div class="results">
            ${this._results.length===0&&this._query.trim()?E`
                    <div class="empty">No results found</div>
                  `:""}
            ${[...e.entries()].map(([n,i])=>E`
                <div class="group-label">${li(this,On,M2).call(this,n)}</div>
                ${i.map(r=>{const s=t++;return E`
                    <div
                      class=${rv({result:!0,active:s===this._activeIndex})}
                      @click=${()=>li(this,On,Nv).call(this,r)}
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
    `}};Nd=new WeakMap;Bh=new WeakMap;On=new WeakSet;w2=function(){this._open=!0,this.setAttribute("open",""),this._query="",this._results=[],this._activeIndex=0,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};Of=function(){this._open=!1,this.removeAttribute("open"),this._query="",this._results=[]};x2=function(e){this._query=e.target.value,this._activeIndex=0,clearTimeout(Gg(this,Nd)),this._query.trim()?F4(this,Nd,setTimeout(()=>li(this,On,C2).call(this),150)):this._results=[]};C2=async function(){const e=this._query.trim().toLowerCase();if(!e)return;const t=[],[n,i,r,s]=await Promise.all([_e.all(),Ie.all(),pe.all(),ke.all()]);for(const a of i)a.name.toLowerCase().includes(e)&&t.push({type:"merchant",id:a.id,label:a.name,href:`/merchants/${a.id}`});for(const a of r)a.name.toLowerCase().includes(e)&&t.push({type:"tag",id:a.id,label:a.name,href:"/tags"});for(const a of s)a.name.toLowerCase().includes(e)&&t.push({type:"account",id:a.id,label:a.name,href:`/accounts/${a.id}`});let o=0;for(const a of n){if(o>=5)break;a.description.toLowerCase().includes(e)&&(t.push({type:"transaction",id:a.id,label:a.description,detail:`${a.date} · ${a.amount.toFixed(2)}`,href:`/transactions/${a.id}`}),o++)}this._results=t};k2=function(e){e.key==="Escape"?li(this,On,Of).call(this):e.key==="ArrowDown"?(e.preventDefault(),this._activeIndex=Math.min(this._activeIndex+1,this._results.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._activeIndex=Math.max(this._activeIndex-1,0)):e.key==="Enter"&&this._results[this._activeIndex]&&li(this,On,Nv).call(this,this._results[this._activeIndex])};Nv=function(e){li(this,On,Of).call(this),_c(e.href)};S2=function(e){e.target===e.currentTarget&&li(this,On,Of).call(this)};E2=function(){const e=new Map;for(const t of this._results){const n=e.get(t.type)??[];n.push(t),e.set(t.type,n)}return e};M2=function(e){return{merchant:"Merchants",tag:"Tags",account:"Accounts",transaction:"Transactions"}[e]??e};Ao.styles=pt`
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
  `;ju([P()],Ao.prototype,"_open",2);ju([P()],Ao.prototype,"_query",2);ju([P()],Ao.prototype,"_results",2);ju([P()],Ao.prototype,"_activeIndex",2);Ao=ju([Et("budgee-global-search")],Ao);var z4=Object.defineProperty,j4=Object.getOwnPropertyDescriptor,D2=e=>{throw TypeError(e)},$2=(e,t,n,i)=>{for(var r=i>1?void 0:i?j4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&z4(t,n,r),r},T2=(e,t,n)=>t.has(e)||D2("Cannot "+n),fo=(e,t,n)=>(T2(e,t,"read from private field"),n?n.call(e):t.get(e)),jp=(e,t,n)=>t.has(e)?D2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),lb=(e,t,n)=>(T2(e,t,"access private method"),n),mo,Wh,Hh,Xg;let B4=0,Fd=class extends mt{constructor(){super(...arguments),jp(this,Hh),this._toasts=[],jp(this,mo,new Map),jp(this,Wh,e=>{const{message:t,type:n="info",duration:i=4e3}=e.detail,r=B4++;this._toasts=[...this._toasts,{id:r,message:t,type:n,dismissing:!1}],fo(this,mo).set(r,setTimeout(()=>lb(this,Hh,Xg).call(this,r),i))})}connectedCallback(){super.connectedCallback(),document.addEventListener("budgee-toast",fo(this,Wh))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-toast",fo(this,Wh));for(const e of fo(this,mo).values())clearTimeout(e);fo(this,mo).clear()}render(){return E`
      <div aria-live="polite" aria-atomic="false">
        ${this._toasts.map(e=>E`
            <div class=${rv({toast:!0,[e.type]:!0,dismissing:e.dismissing})}>
              <span class="message">${e.message}</span>
              <button class="close" aria-label="Dismiss" @click=${()=>lb(this,Hh,Xg).call(this,e.id)}>
                ${ye(r2)}
              </button>
            </div>
          `)}
      </div>
    `}};mo=new WeakMap;Wh=new WeakMap;Hh=new WeakSet;Xg=function(e){const t=fo(this,mo).get(e);t&&clearTimeout(t),fo(this,mo).delete(e),this._toasts=this._toasts.map(n=>n.id===e?{...n,dismissing:!0}:n),setTimeout(()=>{this._toasts=this._toasts.filter(n=>n.id!==e)},200)};Fd.styles=pt`
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
  `;$2([P()],Fd.prototype,"_toasts",2);Fd=$2([Et("budgee-toast-manager")],Fd);const O2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,W4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,H4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,U4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Y4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,I2=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,q4=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;function If(e,t){const n=new Map;for(const i of e)for(const r of t(i)){if(r==null)continue;const s=n.get(r)??{count:0,total:0};s.count++,s.total+=i.amount,n.set(r,s)}return n}const ZB=["chequing","savings","credit_card","investment"],V4={chequing:"Chequing",savings:"Savings",credit_card:"Credit Card",investment:"Investment"};function K4(e){return V4[e]}function Qo(e,t){let n;return()=>{clearTimeout(n),n=setTimeout(e,t)}}var G4=Object.defineProperty,X4=Object.getOwnPropertyDescriptor,Pf=(e,t,n,i)=>{for(var r=i>1?void 0:i?X4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&G4(t,n,r),r};let Qa=class extends mt{constructor(){super(...arguments),this.icon="",this.heading="",this.description=""}render(){return E`
      ${this.icon?E`<div class="icon">${ye(this.icon)}</div>`:""}
      <h3>${this.heading}</h3>
      <p>${this.description}</p>
      <slot></slot>
    `}};Qa.styles=pt`
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
  `;Pf([H()],Qa.prototype,"icon",2);Pf([H()],Qa.prototype,"heading",2);Pf([H()],Qa.prototype,"description",2);Qa=Pf([Et("budgee-empty-state")],Qa);var Q4=Object.defineProperty,Z4=Object.getOwnPropertyDescriptor,P2=e=>{throw TypeError(e)},Zo=(e,t,n,i)=>{for(var r=i>1?void 0:i?Z4(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Q4(t,n,r),r},J4=(e,t,n)=>t.has(e)||P2("Cannot "+n),tL=(e,t,n)=>t.has(e)?P2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Di=(e,t,n)=>(J4(e,t,"access private method"),n),Gn,Za,R2,A2,L2,N2,Qg;let Hr=class extends mt{constructor(){super(...arguments),tL(this,Gn),this.totalItems=0,this.defaultPageSize=10,this.storageKey="",this.filterable=!1,this._currentPage=1,this._pageSize=0,this._filterDebounce=null}connectedCallback(){if(super.connectedCallback(),this.storageKey)try{const e=localStorage.getItem(`budgee:pageSize:${this.storageKey}`);e&&(this._pageSize=Number(e))}catch{}}get _effectivePageSize(){return this._pageSize||this.defaultPageSize}get _totalPages(){return Math.max(1,Math.ceil(this.totalItems/this._effectivePageSize))}firstUpdated(){Di(this,Gn,Za).call(this)}willUpdate(e){e.has("totalItems")&&(this._currentPage=1)}reset(){this._currentPage=1,Di(this,Gn,Za).call(this)}render(){return E`
      ${Di(this,Gn,Qg).call(this)}
      <slot></slot>
      ${Di(this,Gn,Qg).call(this)}
    `}};Gn=new WeakSet;Za=function(){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:this._currentPage,pageSize:this._effectivePageSize},bubbles:!0,composed:!0}))};R2=function(e){if(this._pageSize=Number(e.target.value),this._currentPage=1,this.storageKey)try{localStorage.setItem(`budgee:pageSize:${this.storageKey}`,String(this._pageSize))}catch{}Di(this,Gn,Za).call(this)};A2=function(){this._currentPage>1&&(this._currentPage--,Di(this,Gn,Za).call(this))};L2=function(){this._currentPage<this._totalPages&&(this._currentPage++,Di(this,Gn,Za).call(this))};N2=function(e){const t=e.target.value;this._filterDebounce!==null&&clearTimeout(this._filterDebounce),this._filterDebounce=setTimeout(()=>{this._filterDebounce=null,this._currentPage=1,this.dispatchEvent(new CustomEvent("filter-change",{detail:{filter:t},bubbles:!0,composed:!0}))},200)};Qg=function(){const e=this._effectivePageSize,t=(this._currentPage-1)*e+1,n=Math.min(this._currentPage*e,this.totalItems);return E`
      <div class="pagination-bar">
        <div class="pagination-controls">
          ${this.filterable?E`<input
                class="filter-input"
                type="text"
                placeholder="Filter..."
                aria-label="Filter table"
                @input=${Di(this,Gn,N2)}
              />`:""}
          <label>
            Rows per page:
            <select @change=${Di(this,Gn,R2)}>
              ${[10,25,50,100].map(i=>E`<option value=${i} ?selected=${i===e}>${i}</option>`)}
            </select>
          </label>
        </div>
        <span>Showing ${t}–${n} of ${this.totalItems}</span>
        <div class="pagination-controls">
          <button class="secondary" aria-label="Previous page" ?disabled=${this._currentPage<=1} @click=${Di(this,Gn,A2)}>Prev</button>
          <button class="secondary" aria-label="Next page" ?disabled=${this._currentPage>=this._totalPages} @click=${Di(this,Gn,L2)}>Next</button>
        </div>
      </div>
    `};Hr.styles=[Li,pt`
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
    `];Zo([H({type:Number})],Hr.prototype,"totalItems",2);Zo([H({type:Number})],Hr.prototype,"defaultPageSize",2);Zo([H()],Hr.prototype,"storageKey",2);Zo([H({type:Boolean})],Hr.prototype,"filterable",2);Zo([P()],Hr.prototype,"_currentPage",2);Zo([P()],Hr.prototype,"_pageSize",2);Hr=Zo([Et("paginated-table")],Hr);var eL=Object.defineProperty,nL=Object.getOwnPropertyDescriptor,Fv=(e,t,n,i)=>{for(var r=i>1?void 0:i?nL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&eL(t,n,r),r};let lu=class extends mt{constructor(){super(...arguments),this.variant="table",this.rows=5}render(){const e=Array.from({length:this.rows});return this.variant==="table"?E`
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
    `}};lu.styles=pt`
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
  `;Fv([H()],lu.prototype,"variant",2);Fv([H({type:Number})],lu.prototype,"rows",2);lu=Fv([Et("budgee-skeleton")],lu);const Zr=pt`
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
`;var iL=Object.defineProperty,rL=Object.getOwnPropertyDescriptor,F2=e=>{throw TypeError(e)},Jo=(e,t,n,i)=>{for(var r=i>1?void 0:i?rL(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&iL(t,n,r),r},zv=(e,t,n)=>t.has(e)||F2("Cannot "+n),sL=(e,t,n)=>(zv(e,t,"read from private field"),n?n.call(e):t.get(e)),ub=(e,t,n)=>t.has(e)?F2("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),hb=(e,t,n,i)=>(zv(e,t,"write to private field"),t.set(e,n),n),Ye=(e,t,n)=>(zv(e,t,"access private method"),n),Jc,Me,Zg,z2,j2,B2,W2,tl,el,H2,U2;let Ur=class extends mt{constructor(){super(...arguments),ub(this,Me),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",ub(this,Jc,[])}connectedCallback(){super.connectedCallback(),Ye(this,Me,Zg).call(this);const e=Qo(()=>Ye(this,Me,Zg).call(this),300);Promise.all([ke.subscribe(e),_e.subscribe(e)]).then(t=>{hb(this,Jc,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of sL(this,Jc))e.unsubscribe();hb(this,Jc,[])}render(){if(this._rows===null)return E`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;if(this._rows.length===0)return E`
        <budgee-empty-state
          heading="No accounts yet"
          description="Accounts are created when you import transactions from a CSV."
        ></budgee-empty-state>
      `;const e=this._rows.filter(r=>Ye(this,Me,W2).call(this,r)),t=Ye(this,Me,H2).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="accounts"
        ?filterable=${!0}
        @page-change=${Ye(this,Me,j2)}
        @filter-change=${Ye(this,Me,B2)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>Ye(this,Me,tl).call(this,"name")}>
                Name${Ye(this,Me,el).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>Ye(this,Me,tl).call(this,"type")}>
                Type${Ye(this,Me,el).call(this,"type")}
              </th>
              <th class="sortable" @click=${()=>Ye(this,Me,tl).call(this,"count")}>
                Transactions${Ye(this,Me,el).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>Ye(this,Me,tl).call(this,"balance")}>
                Balance${Ye(this,Me,el).call(this,"balance")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>E`
              <tr @click=${()=>Ye(this,Me,U2).call(this,r.account.id)}>
                <td>${r.account.name}</td>
                <td>${r.account.type?K4(r.account.type):""}</td>
                <td>${r.transactionCount??"…"}</td>
                <td class="col-amount ${r.balance!=null&&r.balance<0?"amount-negative":r.balance!=null?"amount-positive":""}">
                  ${r.balance!=null?r.balance.toFixed(2):"…"}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `}};Jc=new WeakMap;Me=new WeakSet;Zg=async function(){const e=await ke.all();this._rows=e.map(t=>({account:t,transactionCount:null,balance:null})),Ye(this,Me,z2).call(this)};z2=async function(){const e=await _e.all(),t=If(e,n=>[n.accountId]);this._rows=this._rows.map(n=>{const i=t.get(n.account.id);return{...n,transactionCount:i?.count??0,balance:i?.total??0}})};j2=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};B2=function(e){this._filter=e.detail.filter,this._currentPage=1};W2=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.account.name.toLowerCase().includes(t)||e.account.type?.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.balance!=null&&e.balance.toFixed(2).includes(t))};tl=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};el=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};H2=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.account.name.localeCompare(r.account.name):t==="type"?s=(i.account.type??"").localeCompare(r.account.type??""):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="balance"&&(s=(i.balance??0)-(r.balance??0)),s*n})};U2=function(e){_c(`/accounts/${e}`)};Ur.styles=[Zr,pt`
      tbody tr {
        cursor: pointer;
      }
    `];Jo([P()],Ur.prototype,"_rows",2);Jo([P()],Ur.prototype,"_currentPage",2);Jo([P()],Ur.prototype,"_pageSize",2);Jo([P()],Ur.prototype,"_filter",2);Jo([P()],Ur.prototype,"_sortCol",2);Jo([P()],Ur.prototype,"_sortDir",2);Ur=Jo([Et("account-list")],Ur);class v extends Array{constructor(t,n){if(super(t),this.sign=n,Object.setPrototypeOf(this,v.prototype),t>v.__kMaxLength)throw new RangeError("Maximum BigInt size exceeded")}static BigInt(t){var n=Math.floor,i=Number.isFinite;if(typeof t=="number"){if(t===0)return v.__zero();if(v.__isOneDigitInt(t))return 0>t?v.__oneDigit(-t,!0):v.__oneDigit(t,!1);if(!i(t)||n(t)!==t)throw new RangeError("The number "+t+" cannot be converted to BigInt because it is not an integer");return v.__fromDouble(t)}if(typeof t=="string"){const r=v.__fromString(t);if(r===null)throw new SyntaxError("Cannot convert "+t+" to a BigInt");return r}if(typeof t=="boolean")return t===!0?v.__oneDigit(1,!1):v.__zero();if(typeof t=="object"){if(t.constructor===v)return t;const r=v.__toPrimitive(t);return v.BigInt(r)}throw new TypeError("Cannot convert "+t+" to a BigInt")}toDebugString(){const t=["BigInt["];for(const n of this)t.push((n&&(n>>>0).toString(16))+", ");return t.push("]"),t.join("")}toString(t=10){if(2>t||36<t)throw new RangeError("toString() radix argument must be between 2 and 36");return this.length===0?"0":(t&t-1)==0?v.__toStringBasePowerOfTwo(this,t):v.__toStringGeneric(this,t,!1)}valueOf(){throw new Error("Convert JSBI instances to native numbers using `toNumber`.")}static toNumber(t){const n=t.length;if(n===0)return 0;if(n===1){const m=t.__unsignedDigit(0);return t.sign?-m:m}const i=t.__digit(n-1),r=v.__clz30(i),s=30*n-r;if(1024<s)return t.sign?-1/0:1/0;let o=s-1,a=i,c=n-1;const l=r+3;let u=l===32?0:a<<l;u>>>=12;const h=l-12;let d=12<=l?0:a<<20+l,f=20+l;for(0<h&&0<c&&(c--,a=t.__digit(c),u|=a>>>30-h,d=a<<h+2,f=h+2);0<f&&0<c;)c--,a=t.__digit(c),d|=30<=f?a<<f-30:a>>>30-f,f-=30;const p=v.__decideRounding(t,f,c,a);if((p===1||p===0&&(1&d)==1)&&(d=d+1>>>0,d===0&&(u++,u>>>20!=0&&(u=0,o++,1023<o))))return t.sign?-1/0:1/0;const g=t.sign?-2147483648:0;return o=o+1023<<20,v.__kBitConversionInts[v.__kBitConversionIntHigh]=g|o|u,v.__kBitConversionInts[v.__kBitConversionIntLow]=d,v.__kBitConversionDouble[0]}static unaryMinus(t){if(t.length===0)return t;const n=t.__copy();return n.sign=!t.sign,n}static bitwiseNot(t){return t.sign?v.__absoluteSubOne(t).__trim():v.__absoluteAddOne(t,!0)}static exponentiate(t,n){if(n.sign)throw new RangeError("Exponent must be positive");if(n.length===0)return v.__oneDigit(1,!1);if(t.length===0)return t;if(t.length===1&&t.__digit(0)===1)return t.sign&&(1&n.__digit(0))==0?v.unaryMinus(t):t;if(1<n.length)throw new RangeError("BigInt too big");let i=n.__unsignedDigit(0);if(i===1)return t;if(i>=v.__kMaxLengthBits)throw new RangeError("BigInt too big");if(t.length===1&&t.__digit(0)===2){const o=1+(0|i/30),a=t.sign&&(1&i)!=0,c=new v(o,a);c.__initializeDigits();const l=1<<i%30;return c.__setDigit(o-1,l),c}let r=null,s=t;for((1&i)!=0&&(r=t),i>>=1;i!==0;i>>=1)s=v.multiply(s,s),(1&i)!=0&&(r===null?r=s:r=v.multiply(r,s));return r}static multiply(t,n){if(t.length===0)return t;if(n.length===0)return n;let i=t.length+n.length;30<=t.__clzmsd()+n.__clzmsd()&&i--;const r=new v(i,t.sign!==n.sign);r.__initializeDigits();for(let s=0;s<t.length;s++)v.__multiplyAccumulate(n,t.__digit(s),r,s);return r.__trim()}static divide(t,n){if(n.length===0)throw new RangeError("Division by zero");if(0>v.__absoluteCompare(t,n))return v.__zero();const i=t.sign!==n.sign,r=n.__unsignedDigit(0);let s;if(n.length===1&&32767>=r){if(r===1)return i===t.sign?t:v.unaryMinus(t);s=v.__absoluteDivSmall(t,r,null)}else s=v.__absoluteDivLarge(t,n,!0,!1);return s.sign=i,s.__trim()}static remainder(t,n){if(n.length===0)throw new RangeError("Division by zero");if(0>v.__absoluteCompare(t,n))return t;const i=n.__unsignedDigit(0);if(n.length===1&&32767>=i){if(i===1)return v.__zero();const s=v.__absoluteModSmall(t,i);return s===0?v.__zero():v.__oneDigit(s,t.sign)}const r=v.__absoluteDivLarge(t,n,!1,!0);return r.sign=t.sign,r.__trim()}static add(t,n){const i=t.sign;return i===n.sign?v.__absoluteAdd(t,n,i):0<=v.__absoluteCompare(t,n)?v.__absoluteSub(t,n,i):v.__absoluteSub(n,t,!i)}static subtract(t,n){const i=t.sign;return i===n.sign?0<=v.__absoluteCompare(t,n)?v.__absoluteSub(t,n,i):v.__absoluteSub(n,t,!i):v.__absoluteAdd(t,n,i)}static leftShift(t,n){return n.length===0||t.length===0?t:n.sign?v.__rightShiftByAbsolute(t,n):v.__leftShiftByAbsolute(t,n)}static signedRightShift(t,n){return n.length===0||t.length===0?t:n.sign?v.__leftShiftByAbsolute(t,n):v.__rightShiftByAbsolute(t,n)}static unsignedRightShift(){throw new TypeError("BigInts have no unsigned right shift; use >> instead")}static lessThan(t,n){return 0>v.__compareToBigInt(t,n)}static lessThanOrEqual(t,n){return 0>=v.__compareToBigInt(t,n)}static greaterThan(t,n){return 0<v.__compareToBigInt(t,n)}static greaterThanOrEqual(t,n){return 0<=v.__compareToBigInt(t,n)}static equal(t,n){if(t.sign!==n.sign||t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t.__digit(i)!==n.__digit(i))return!1;return!0}static notEqual(t,n){return!v.equal(t,n)}static bitwiseAnd(t,n){var i=Math.max;if(!t.sign&&!n.sign)return v.__absoluteAnd(t,n).__trim();if(t.sign&&n.sign){const r=i(t.length,n.length)+1;let s=v.__absoluteSubOne(t,r);const o=v.__absoluteSubOne(n);return s=v.__absoluteOr(s,o,s),v.__absoluteAddOne(s,!0,s).__trim()}return t.sign&&([t,n]=[n,t]),v.__absoluteAndNot(t,v.__absoluteSubOne(n)).__trim()}static bitwiseXor(t,n){var i=Math.max;if(!t.sign&&!n.sign)return v.__absoluteXor(t,n).__trim();if(t.sign&&n.sign){const o=i(t.length,n.length),a=v.__absoluteSubOne(t,o),c=v.__absoluteSubOne(n);return v.__absoluteXor(a,c,a).__trim()}const r=i(t.length,n.length)+1;t.sign&&([t,n]=[n,t]);let s=v.__absoluteSubOne(n,r);return s=v.__absoluteXor(s,t,s),v.__absoluteAddOne(s,!0,s).__trim()}static bitwiseOr(t,n){var i=Math.max;const r=i(t.length,n.length);if(!t.sign&&!n.sign)return v.__absoluteOr(t,n).__trim();if(t.sign&&n.sign){let o=v.__absoluteSubOne(t,r);const a=v.__absoluteSubOne(n);return o=v.__absoluteAnd(o,a,o),v.__absoluteAddOne(o,!0,o).__trim()}t.sign&&([t,n]=[n,t]);let s=v.__absoluteSubOne(n,r);return s=v.__absoluteAndNot(s,t,s),v.__absoluteAddOne(s,!0,s).__trim()}static asIntN(t,n){var i=Math.floor;if(n.length===0)return n;if(t=i(t),0>t)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(t===0)return v.__zero();if(t>=v.__kMaxLengthBits)return n;const r=0|(t+29)/30;if(n.length<r)return n;const s=n.__unsignedDigit(r-1),o=1<<(t-1)%30;if(n.length===r&&s<o)return n;if((s&o)!==o)return v.__truncateToNBits(t,n);if(!n.sign)return v.__truncateAndSubFromPowerOfTwo(t,n,!0);if((s&o-1)==0){for(let a=r-2;0<=a;a--)if(n.__digit(a)!==0)return v.__truncateAndSubFromPowerOfTwo(t,n,!1);return n.length===r&&s===o?n:v.__truncateToNBits(t,n)}return v.__truncateAndSubFromPowerOfTwo(t,n,!1)}static asUintN(t,n){var i=Math.floor;if(n.length===0)return n;if(t=i(t),0>t)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(t===0)return v.__zero();if(n.sign){if(t>v.__kMaxLengthBits)throw new RangeError("BigInt too big");return v.__truncateAndSubFromPowerOfTwo(t,n,!1)}if(t>=v.__kMaxLengthBits)return n;const r=0|(t+29)/30;if(n.length<r)return n;const s=t%30;return n.length==r&&(s===0||!(n.__digit(r-1)>>>s))?n:v.__truncateToNBits(t,n)}static ADD(t,n){if(t=v.__toPrimitive(t),n=v.__toPrimitive(n),typeof t=="string")return typeof n!="string"&&(n=n.toString()),t+n;if(typeof n=="string")return t.toString()+n;if(t=v.__toNumeric(t),n=v.__toNumeric(n),v.__isBigInt(t)&&v.__isBigInt(n))return v.add(t,n);if(typeof t=="number"&&typeof n=="number")return t+n;throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")}static LT(t,n){return v.__compare(t,n,0)}static LE(t,n){return v.__compare(t,n,1)}static GT(t,n){return v.__compare(t,n,2)}static GE(t,n){return v.__compare(t,n,3)}static EQ(t,n){for(;;){if(v.__isBigInt(t))return v.__isBigInt(n)?v.equal(t,n):v.EQ(n,t);if(typeof t=="number"){if(v.__isBigInt(n))return v.__equalToNumber(n,t);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="string"){if(v.__isBigInt(n))return t=v.__fromString(t),t!==null&&v.equal(t,n);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="boolean"){if(v.__isBigInt(n))return v.__equalToNumber(n,+t);if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="symbol"){if(v.__isBigInt(n))return!1;if(typeof n!="object")return t==n;n=v.__toPrimitive(n)}else if(typeof t=="object"){if(typeof n=="object"&&n.constructor!==v)return t==n;t=v.__toPrimitive(t)}else return t==n}}static NE(t,n){return!v.EQ(t,n)}static DataViewGetBigInt64(t,n,i=!1){return v.asIntN(64,v.DataViewGetBigUint64(t,n,i))}static DataViewGetBigUint64(t,n,i=!1){const[r,s]=i?[4,0]:[0,4],o=t.getUint32(n+r,i),a=t.getUint32(n+s,i),c=new v(3,!1);return c.__setDigit(0,1073741823&a),c.__setDigit(1,(268435455&o)<<2|a>>>30),c.__setDigit(2,o>>>28),c.__trim()}static DataViewSetBigInt64(t,n,i,r=!1){v.DataViewSetBigUint64(t,n,i,r)}static DataViewSetBigUint64(t,n,i,r=!1){i=v.asUintN(64,i);let s=0,o=0;if(0<i.length&&(o=i.__digit(0),1<i.length)){const l=i.__digit(1);o|=l<<30,s=l>>>2,2<i.length&&(s|=i.__digit(2)<<28)}const[a,c]=r?[4,0]:[0,4];t.setUint32(n+a,s,r),t.setUint32(n+c,o,r)}static __zero(){return new v(0,!1)}static __oneDigit(t,n){const i=new v(1,n);return i.__setDigit(0,t),i}__copy(){const t=new v(this.length,this.sign);for(let n=0;n<this.length;n++)t[n]=this[n];return t}__trim(){let t=this.length,n=this[t-1];for(;n===0;)t--,n=this[t-1],this.pop();return t===0&&(this.sign=!1),this}__initializeDigits(){for(let t=0;t<this.length;t++)this[t]=0}static __decideRounding(t,n,i,r){if(0<n)return-1;let s;if(0>n)s=-n-1;else{if(i===0)return-1;i--,r=t.__digit(i),s=29}let o=1<<s;if((r&o)==0)return-1;if(o-=1,(r&o)!=0)return 1;for(;0<i;)if(i--,t.__digit(i)!==0)return 1;return 0}static __fromDouble(t){v.__kBitConversionDouble[0]=t;const n=2047&v.__kBitConversionInts[v.__kBitConversionIntHigh]>>>20,i=n-1023,r=(0|i/30)+1,s=new v(r,0>t);let o=1048575&v.__kBitConversionInts[v.__kBitConversionIntHigh]|1048576,a=v.__kBitConversionInts[v.__kBitConversionIntLow];const c=20,l=i%30;let u,h=0;if(l<20){const d=c-l;h=d+32,u=o>>>d,o=o<<32-d|a>>>d,a<<=32-d}else if(l===20)h=32,u=o,o=a,a=0;else{const d=l-c;h=32-d,u=o<<d|a>>>32-d,o=a<<d,a=0}s.__setDigit(r-1,u);for(let d=r-2;0<=d;d--)0<h?(h-=30,u=o>>>2,o=o<<30|a>>>2,a<<=30):u=0,s.__setDigit(d,u);return s.__trim()}static __isWhitespace(t){return 13>=t&&9<=t||(159>=t?t==32:131071>=t?t==160||t==5760:196607>=t?(t&=131071,10>=t||t==40||t==41||t==47||t==95||t==4096):t==65279)}static __fromString(t,n=0){let i=0;const r=t.length;let s=0;if(s===r)return v.__zero();let o=t.charCodeAt(s);for(;v.__isWhitespace(o);){if(++s===r)return v.__zero();o=t.charCodeAt(s)}if(o===43){if(++s===r)return null;o=t.charCodeAt(s),i=1}else if(o===45){if(++s===r)return null;o=t.charCodeAt(s),i=-1}if(n===0){if(n=10,o===48){if(++s===r)return v.__zero();if(o=t.charCodeAt(s),o===88||o===120){if(n=16,++s===r)return null;o=t.charCodeAt(s)}else if(o===79||o===111){if(n=8,++s===r)return null;o=t.charCodeAt(s)}else if(o===66||o===98){if(n=2,++s===r)return null;o=t.charCodeAt(s)}}}else if(n===16&&o===48){if(++s===r)return v.__zero();if(o=t.charCodeAt(s),o===88||o===120){if(++s===r)return null;o=t.charCodeAt(s)}}if(i!=0&&n!==10)return null;for(;o===48;){if(++s===r)return v.__zero();o=t.charCodeAt(s)}const a=r-s;let c=v.__kMaxBitsPerChar[n],l=v.__kBitsPerCharTableMultiplier-1;if(a>1073741824/c)return null;const u=c*a+l>>>v.__kBitsPerCharTableShift,h=new v(0|(u+29)/30,!1),d=10>n?n:10,f=10<n?n-10:0;if((n&n-1)==0){c>>=v.__kBitsPerCharTableShift;const p=[],g=[];let m=!1;do{let b=0,_=0;for(;;){let C;if(o-48>>>0<d)C=o-48;else if((32|o)-97>>>0<f)C=(32|o)-87;else{m=!0;break}if(_+=c,b=b<<c|C,++s===r){m=!0;break}if(o=t.charCodeAt(s),30<_+c)break}p.push(b),g.push(_)}while(!m);v.__fillFromParts(h,p,g)}else{h.__initializeDigits();let p=!1,g=0;do{let m=0,b=1;for(;;){let C;if(o-48>>>0<d)C=o-48;else if((32|o)-97>>>0<f)C=(32|o)-87;else{p=!0;break}const S=b*n;if(1073741823<S)break;if(b=S,m=m*n+C,g++,++s===r){p=!0;break}o=t.charCodeAt(s)}l=30*v.__kBitsPerCharTableMultiplier-1;const _=0|(c*g+l>>>v.__kBitsPerCharTableShift)/30;h.__inplaceMultiplyAdd(b,m,_)}while(!p)}if(s!==r){if(!v.__isWhitespace(o))return null;for(s++;s<r;s++)if(o=t.charCodeAt(s),!v.__isWhitespace(o))return null}return h.sign=i==-1,h.__trim()}static __fillFromParts(t,n,i){let r=0,s=0,o=0;for(let a=n.length-1;0<=a;a--){const c=n[a],l=i[a];s|=c<<o,o+=l,o===30?(t.__setDigit(r++,s),o=0,s=0):30<o&&(t.__setDigit(r++,1073741823&s),o-=30,s=c>>>l-o)}if(s!==0){if(r>=t.length)throw new Error("implementation bug");t.__setDigit(r++,s)}for(;r<t.length;r++)t.__setDigit(r,0)}static __toStringBasePowerOfTwo(t,n){const i=t.length;let r=n-1;r=(85&r>>>1)+(85&r),r=(51&r>>>2)+(51&r),r=(15&r>>>4)+(15&r);const s=r,o=n-1,a=t.__digit(i-1),c=v.__clz30(a);let l=0|(30*i-c+s-1)/s;if(t.sign&&l++,268435456<l)throw new Error("string too long");const u=Array(l);let h=l-1,d=0,f=0;for(let g=0;g<i-1;g++){const m=t.__digit(g),b=(d|m<<f)&o;u[h--]=v.__kConversionChars[b];const _=s-f;for(d=m>>>_,f=30-_;f>=s;)u[h--]=v.__kConversionChars[d&o],d>>>=s,f-=s}const p=(d|a<<f)&o;for(u[h--]=v.__kConversionChars[p],d=a>>>s-f;d!==0;)u[h--]=v.__kConversionChars[d&o],d>>>=s;if(t.sign&&(u[h--]="-"),h!=-1)throw new Error("implementation bug");return u.join("")}static __toStringGeneric(t,n,i){const r=t.length;if(r===0)return"";if(r===1){let g=t.__unsignedDigit(0).toString(n);return i===!1&&t.sign&&(g="-"+g),g}const s=30*r-v.__clz30(t.__digit(r-1)),o=v.__kMaxBitsPerChar[n],a=o-1;let c=s*v.__kBitsPerCharTableMultiplier;c+=a-1,c=0|c/a;const l=c+1>>1,u=v.exponentiate(v.__oneDigit(n,!1),v.__oneDigit(l,!1));let h,d;const f=u.__unsignedDigit(0);if(u.length===1&&32767>=f){h=new v(t.length,!1),h.__initializeDigits();let g=0;for(let m=2*t.length-1;0<=m;m--){const b=g<<15|t.__halfDigit(m);h.__setHalfDigit(m,0|b/f),g=0|b%f}d=g.toString(n)}else{const g=v.__absoluteDivLarge(t,u,!0,!0);h=g.quotient;const m=g.remainder.__trim();d=v.__toStringGeneric(m,n,!0)}h.__trim();let p=v.__toStringGeneric(h,n,!0);for(;d.length<l;)d="0"+d;return i===!1&&t.sign&&(p="-"+p),p+d}static __unequalSign(t){return t?-1:1}static __absoluteGreater(t){return t?-1:1}static __absoluteLess(t){return t?1:-1}static __compareToBigInt(t,n){const i=t.sign;if(i!==n.sign)return v.__unequalSign(i);const r=v.__absoluteCompare(t,n);return 0<r?v.__absoluteGreater(i):0>r?v.__absoluteLess(i):0}static __compareToNumber(t,n){if(v.__isOneDigitInt(n)){const i=t.sign,r=0>n;if(i!==r)return v.__unequalSign(i);if(t.length===0){if(r)throw new Error("implementation bug");return n===0?0:-1}if(1<t.length)return v.__absoluteGreater(i);const s=Math.abs(n),o=t.__unsignedDigit(0);return o>s?v.__absoluteGreater(i):o<s?v.__absoluteLess(i):0}return v.__compareToDouble(t,n)}static __compareToDouble(t,n){if(n!==n)return n;if(n===1/0)return-1;if(n===-1/0)return 1;const i=t.sign;if(i!==0>n)return v.__unequalSign(i);if(n===0)throw new Error("implementation bug: should be handled elsewhere");if(t.length===0)return-1;v.__kBitConversionDouble[0]=n;const r=2047&v.__kBitConversionInts[v.__kBitConversionIntHigh]>>>20;if(r==2047)throw new Error("implementation bug: handled elsewhere");const s=r-1023;if(0>s)return v.__absoluteGreater(i);const o=t.length;let a=t.__digit(o-1);const c=v.__clz30(a),l=30*o-c,u=s+1;if(l<u)return v.__absoluteLess(i);if(l>u)return v.__absoluteGreater(i);let h=1048576|1048575&v.__kBitConversionInts[v.__kBitConversionIntHigh],d=v.__kBitConversionInts[v.__kBitConversionIntLow];const f=20,p=29-c;if(p!==(0|(l-1)%30))throw new Error("implementation bug");let g,m=0;if(20>p){const b=f-p;m=b+32,g=h>>>b,h=h<<32-b|d>>>b,d<<=32-b}else if(p===20)m=32,g=h,h=d,d=0;else{const b=p-f;m=32-b,g=h<<b|d>>>32-b,h=d<<b,d=0}if(a>>>=0,g>>>=0,a>g)return v.__absoluteGreater(i);if(a<g)return v.__absoluteLess(i);for(let b=o-2;0<=b;b--){0<m?(m-=30,g=h>>>2,h=h<<30|d>>>2,d<<=30):g=0;const _=t.__unsignedDigit(b);if(_>g)return v.__absoluteGreater(i);if(_<g)return v.__absoluteLess(i)}if(h!==0||d!==0){if(m===0)throw new Error("implementation bug");return v.__absoluteLess(i)}return 0}static __equalToNumber(t,n){var i=Math.abs;return v.__isOneDigitInt(n)?n===0?t.length===0:t.length===1&&t.sign===0>n&&t.__unsignedDigit(0)===i(n):v.__compareToDouble(t,n)===0}static __comparisonResultToBool(t,n){return n===0?0>t:n===1?0>=t:n===2?0<t:n===3?0<=t:void 0}static __compare(t,n,i){if(t=v.__toPrimitive(t),n=v.__toPrimitive(n),typeof t=="string"&&typeof n=="string")switch(i){case 0:return t<n;case 1:return t<=n;case 2:return t>n;case 3:return t>=n}if(v.__isBigInt(t)&&typeof n=="string")return n=v.__fromString(n),n!==null&&v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(typeof t=="string"&&v.__isBigInt(n))return t=v.__fromString(t),t!==null&&v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(t=v.__toNumeric(t),n=v.__toNumeric(n),v.__isBigInt(t)){if(v.__isBigInt(n))return v.__comparisonResultToBool(v.__compareToBigInt(t,n),i);if(typeof n!="number")throw new Error("implementation bug");return v.__comparisonResultToBool(v.__compareToNumber(t,n),i)}if(typeof t!="number")throw new Error("implementation bug");if(v.__isBigInt(n))return v.__comparisonResultToBool(v.__compareToNumber(n,t),2^i);if(typeof n!="number")throw new Error("implementation bug");return i===0?t<n:i===1?t<=n:i===2?t>n:i===3?t>=n:void 0}__clzmsd(){return v.__clz30(this.__digit(this.length-1))}static __absoluteAdd(t,n,i){if(t.length<n.length)return v.__absoluteAdd(n,t,i);if(t.length===0)return t;if(n.length===0)return t.sign===i?t:v.unaryMinus(t);let r=t.length;(t.__clzmsd()===0||n.length===t.length&&n.__clzmsd()===0)&&r++;const s=new v(r,i);let o=0,a=0;for(;a<n.length;a++){const c=t.__digit(a)+n.__digit(a)+o;o=c>>>30,s.__setDigit(a,1073741823&c)}for(;a<t.length;a++){const c=t.__digit(a)+o;o=c>>>30,s.__setDigit(a,1073741823&c)}return a<s.length&&s.__setDigit(a,o),s.__trim()}static __absoluteSub(t,n,i){if(t.length===0)return t;if(n.length===0)return t.sign===i?t:v.unaryMinus(t);const r=new v(t.length,i);let s=0,o=0;for(;o<n.length;o++){const a=t.__digit(o)-n.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}for(;o<t.length;o++){const a=t.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}return r.__trim()}static __absoluteAddOne(t,n,i=null){const r=t.length;i===null?i=new v(r,n):i.sign=n;let s=1;for(let o=0;o<r;o++){const a=t.__digit(o)+s;s=a>>>30,i.__setDigit(o,1073741823&a)}return s!=0&&i.__setDigitGrow(r,1),i}static __absoluteSubOne(t,n){const i=t.length;n=n||i;const r=new v(n,!1);let s=1;for(let o=0;o<i;o++){const a=t.__digit(o)-s;s=1&a>>>30,r.__setDigit(o,1073741823&a)}if(s!=0)throw new Error("implementation bug");for(let o=i;o<n;o++)r.__setDigit(o,0);return r}static __absoluteAnd(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=o;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)&n.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteAndNot(t,n,i=null){const r=t.length,s=n.length;let o=s;r<s&&(o=r);let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)&~n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteOr(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)|n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteXor(t,n,i=null){let r=t.length,s=n.length,o=s;if(r<s){o=r;const l=t,u=r;t=n,r=s,n=l,s=u}let a=r;i===null?i=new v(a,!1):a=i.length;let c=0;for(;c<o;c++)i.__setDigit(c,t.__digit(c)^n.__digit(c));for(;c<r;c++)i.__setDigit(c,t.__digit(c));for(;c<a;c++)i.__setDigit(c,0);return i}static __absoluteCompare(t,n){const i=t.length-n.length;if(i!=0)return i;let r=t.length-1;for(;0<=r&&t.__digit(r)===n.__digit(r);)r--;return 0>r?0:t.__unsignedDigit(r)>n.__unsignedDigit(r)?1:-1}static __multiplyAccumulate(t,n,i,r){if(n===0)return;const s=32767&n,o=n>>>15;let a=0,c=0;for(let l,u=0;u<t.length;u++,r++){l=i.__digit(r);const h=t.__digit(u),d=32767&h,f=h>>>15,p=v.__imul(d,s),g=v.__imul(d,o),m=v.__imul(f,s),b=v.__imul(f,o);l+=c+p+a,a=l>>>30,l&=1073741823,l+=((32767&g)<<15)+((32767&m)<<15),a+=l>>>30,c=b+(g>>>15)+(m>>>15),i.__setDigit(r,1073741823&l)}for(;a!=0||c!==0;r++){let l=i.__digit(r);l+=a+c,c=0,a=l>>>30,i.__setDigit(r,1073741823&l)}}static __internalMultiplyAdd(t,n,i,r,s){let o=i,a=0;for(let c=0;c<r;c++){const l=t.__digit(c),u=v.__imul(32767&l,n),h=v.__imul(l>>>15,n),d=u+((32767&h)<<15)+a+o;o=d>>>30,a=h>>>15,s.__setDigit(c,1073741823&d)}if(s.length>r)for(s.__setDigit(r++,o+a);r<s.length;)s.__setDigit(r++,0);else if(o+a!==0)throw new Error("implementation bug")}__inplaceMultiplyAdd(t,n,i){i>this.length&&(i=this.length);const r=32767&t,s=t>>>15;let o=0,a=n;for(let c=0;c<i;c++){const l=this.__digit(c),u=32767&l,h=l>>>15,d=v.__imul(u,r),f=v.__imul(u,s),p=v.__imul(h,r),g=v.__imul(h,s);let m=a+d+o;o=m>>>30,m&=1073741823,m+=((32767&f)<<15)+((32767&p)<<15),o+=m>>>30,a=g+(f>>>15)+(p>>>15),this.__setDigit(c,1073741823&m)}if(o!=0||a!==0)throw new Error("implementation bug")}static __absoluteDivSmall(t,n,i=null){i===null&&(i=new v(t.length,!1));let r=0;for(let s,o=2*t.length-1;0<=o;o-=2){s=(r<<15|t.__halfDigit(o))>>>0;const a=0|s/n;r=0|s%n,s=(r<<15|t.__halfDigit(o-1))>>>0;const c=0|s/n;r=0|s%n,i.__setDigit(o>>>1,a<<15|c)}return i}static __absoluteModSmall(t,n){let i=0;for(let r=2*t.length-1;0<=r;r--)i=0|((i<<15|t.__halfDigit(r))>>>0)%n;return i}static __absoluteDivLarge(t,n,i,r){const s=n.__halfDigitLength(),o=n.length,a=t.__halfDigitLength()-s;let c=null;i&&(c=new v(a+2>>>1,!1),c.__initializeDigits());const l=new v(s+2>>>1,!1);l.__initializeDigits();const u=v.__clz15(n.__halfDigit(s-1));0<u&&(n=v.__specialLeftShift(n,u,0));const h=v.__specialLeftShift(t,u,1),d=n.__halfDigit(s-1);let f=0;for(let p,g=a;0<=g;g--){p=32767;const m=h.__halfDigit(g+s);if(m!==d){const _=(m<<15|h.__halfDigit(g+s-1))>>>0;p=0|_/d;let C=0|_%d;const S=n.__halfDigit(s-2),k=h.__halfDigit(g+s-2);for(;v.__imul(p,S)>>>0>(C<<16|k)>>>0&&(p--,C+=d,!(32767<C)););}v.__internalMultiplyAdd(n,p,0,o,l);let b=h.__inplaceSub(l,g,s+1);b!==0&&(b=h.__inplaceAdd(n,g,s),h.__setHalfDigit(g+s,32767&h.__halfDigit(g+s)+b),p--),i&&(1&g?f=p<<15:c.__setDigit(g>>>1,f|p))}if(r)return h.__inplaceRightShift(u),i?{quotient:c,remainder:h}:h;if(i)return c;throw new Error("unreachable")}static __clz15(t){return v.__clz30(t)-15}__inplaceAdd(t,n,i){let r=0;for(let s=0;s<i;s++){const o=this.__halfDigit(n+s)+t.__halfDigit(s)+r;r=o>>>15,this.__setHalfDigit(n+s,32767&o)}return r}__inplaceSub(t,n,i){let r=0;if(1&n){n>>=1;let s=this.__digit(n),o=32767&s,a=0;for(;a<i-1>>>1;a++){const u=t.__digit(a),h=(s>>>15)-(32767&u)-r;r=1&h>>>15,this.__setDigit(n+a,(32767&h)<<15|32767&o),s=this.__digit(n+a+1),o=(32767&s)-(u>>>15)-r,r=1&o>>>15}const c=t.__digit(a),l=(s>>>15)-(32767&c)-r;if(r=1&l>>>15,this.__setDigit(n+a,(32767&l)<<15|32767&o),n+a+1>=this.length)throw new RangeError("out of bounds");(1&i)==0&&(s=this.__digit(n+a+1),o=(32767&s)-(c>>>15)-r,r=1&o>>>15,this.__setDigit(n+t.length,1073709056&s|32767&o))}else{n>>=1;let s=0;for(;s<t.length-1;s++){const u=this.__digit(n+s),h=t.__digit(s),d=(32767&u)-(32767&h)-r;r=1&d>>>15;const f=(u>>>15)-(h>>>15)-r;r=1&f>>>15,this.__setDigit(n+s,(32767&f)<<15|32767&d)}const o=this.__digit(n+s),a=t.__digit(s),c=(32767&o)-(32767&a)-r;r=1&c>>>15;let l=0;(1&i)==0&&(l=(o>>>15)-(a>>>15)-r,r=1&l>>>15),this.__setDigit(n+s,(32767&l)<<15|32767&c)}return r}__inplaceRightShift(t){if(t===0)return;let n=this.__digit(0)>>>t;const i=this.length-1;for(let r=0;r<i;r++){const s=this.__digit(r+1);this.__setDigit(r,1073741823&s<<30-t|n),n=s>>>t}this.__setDigit(i,n)}static __specialLeftShift(t,n,i){const r=t.length,s=new v(r+i,!1);if(n===0){for(let a=0;a<r;a++)s.__setDigit(a,t.__digit(a));return 0<i&&s.__setDigit(r,0),s}let o=0;for(let a=0;a<r;a++){const c=t.__digit(a);s.__setDigit(a,1073741823&c<<n|o),o=c>>>30-n}return 0<i&&s.__setDigit(r,o),s}static __leftShiftByAbsolute(t,n){const i=v.__toShiftAmount(n);if(0>i)throw new RangeError("BigInt too big");const r=0|i/30,s=i%30,o=t.length,a=s!==0&&t.__digit(o-1)>>>30-s!=0,c=o+r+(a?1:0),l=new v(c,t.sign);if(s===0){let u=0;for(;u<r;u++)l.__setDigit(u,0);for(;u<c;u++)l.__setDigit(u,t.__digit(u-r))}else{let u=0;for(let h=0;h<r;h++)l.__setDigit(h,0);for(let h=0;h<o;h++){const d=t.__digit(h);l.__setDigit(h+r,1073741823&d<<s|u),u=d>>>30-s}if(a)l.__setDigit(o+r,u);else if(u!==0)throw new Error("implementation bug")}return l.__trim()}static __rightShiftByAbsolute(t,n){const i=t.length,r=t.sign,s=v.__toShiftAmount(n);if(0>s)return v.__rightShiftByMaximum(r);const o=0|s/30,a=s%30;let c=i-o;if(0>=c)return v.__rightShiftByMaximum(r);let l=!1;if(r){if((t.__digit(o)&(1<<a)-1)!=0)l=!0;else for(let h=0;h<o;h++)if(t.__digit(h)!==0){l=!0;break}}l&&a===0&&~t.__digit(i-1)==0&&c++;let u=new v(c,r);if(a===0){u.__setDigit(c-1,0);for(let h=o;h<i;h++)u.__setDigit(h-o,t.__digit(h))}else{let h=t.__digit(o)>>>a;const d=i-o-1;for(let f=0;f<d;f++){const p=t.__digit(f+o+1);u.__setDigit(f,1073741823&p<<30-a|h),h=p>>>a}u.__setDigit(d,h)}return l&&(u=v.__absoluteAddOne(u,!0,u)),u.__trim()}static __rightShiftByMaximum(t){return t?v.__oneDigit(1,!0):v.__zero()}static __toShiftAmount(t){if(1<t.length)return-1;const n=t.__unsignedDigit(0);return n>v.__kMaxLengthBits?-1:n}static __toPrimitive(t,n="default"){if(typeof t!="object"||t.constructor===v)return t;if(typeof Symbol<"u"&&typeof Symbol.toPrimitive=="symbol"&&t[Symbol.toPrimitive]){const s=t[Symbol.toPrimitive](n);if(typeof s!="object")return s;throw new TypeError("Cannot convert object to primitive value")}const i=t.valueOf;if(i){const s=i.call(t);if(typeof s!="object")return s}const r=t.toString;if(r){const s=r.call(t);if(typeof s!="object")return s}throw new TypeError("Cannot convert object to primitive value")}static __toNumeric(t){return v.__isBigInt(t)?t:+t}static __isBigInt(t){return typeof t=="object"&&t!==null&&t.constructor===v}static __truncateToNBits(t,n){const i=0|(t+29)/30,r=new v(i,n.sign),s=i-1;for(let a=0;a<s;a++)r.__setDigit(a,n.__digit(a));let o=n.__digit(s);if(t%30!=0){const a=32-t%30;o=o<<a>>>a}return r.__setDigit(s,o),r.__trim()}static __truncateAndSubFromPowerOfTwo(t,n,i){var r=Math.min;const s=0|(t+29)/30,o=new v(s,i);let a=0;const c=s-1;let l=0;for(const f=r(c,n.length);a<f;a++){const p=0-n.__digit(a)-l;l=1&p>>>30,o.__setDigit(a,1073741823&p)}for(;a<c;a++)o.__setDigit(a,0|1073741823&-l);let u=c<n.length?n.__digit(c):0;const h=t%30;let d;if(h==0)d=0-u-l,d&=1073741823;else{const f=32-h;u=u<<f>>>f;const p=1<<32-f;d=p-u-l,d&=p-1}return o.__setDigit(c,d),o.__trim()}__digit(t){return this[t]}__unsignedDigit(t){return this[t]>>>0}__setDigit(t,n){this[t]=0|n}__setDigitGrow(t,n){this[t]=0|n}__halfDigitLength(){const t=this.length;return 32767>=this.__unsignedDigit(t-1)?2*t-1:2*t}__halfDigit(t){return 32767&this[t>>>1]>>>15*(1&t)}__setHalfDigit(t,n){const i=t>>>1,r=this.__digit(i),s=1&t?32767&r|n<<15:1073709056&r|32767&n;this.__setDigit(i,s)}static __digitPow(t,n){let i=1;for(;0<n;)1&n&&(i*=t),n>>>=1,t*=t;return i}static __detectBigEndian(){return v.__kBitConversionDouble[0]=-0,v.__kBitConversionInts[0]!==0}static __isOneDigitInt(t){return(1073741823&t)===t}}v.__kMaxLength=33554432,v.__kMaxLengthBits=v.__kMaxLength<<5,v.__kMaxBitsPerChar=[0,0,32,51,64,75,83,90,96,102,107,111,115,119,122,126,128,131,134,136,139,141,143,145,147,149,151,153,154,156,158,159,160,162,163,165,166],v.__kBitsPerCharTableShift=5,v.__kBitsPerCharTableMultiplier=1<<v.__kBitsPerCharTableShift,v.__kConversionChars=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],v.__kBitConversionBuffer=new ArrayBuffer(8),v.__kBitConversionDouble=new Float64Array(v.__kBitConversionBuffer),v.__kBitConversionInts=new Int32Array(v.__kBitConversionBuffer),v.__kBitConversionIntHigh=v.__detectBigEndian()?0:1,v.__kBitConversionIntLow=v.__detectBigEndian()?1:0,v.__clz30=Math.clz32?function(e){return Math.clz32(e)-2}:function(e){return e===0?30:0|29-(0|Math.log(e>>>0)/Math.LN2)},v.__imul=Math.imul||function(e,t){return 0|e*t};const Xn=v.BigInt(0),uu=v.BigInt(1),jv=v.BigInt(2),oL=v.BigInt(10),aL=v.BigInt(24),cL=v.BigInt(60),lL=v.BigInt(1e3),Bu=v.BigInt(1e6),Pl=v.BigInt(1e9),Y2=v.multiply(v.BigInt(3600),Pl),uL=v.multiply(cL,Pl),Ps=v.multiply(Y2,aL);function Cr(e){return typeof e=="bigint"?v.BigInt(e.toString(10)):e}function q2(e){return v.equal(v.remainder(e,jv),Xn)}function oo(e){return v.lessThan(e,Xn)?v.unaryMinus(e):e}function zd(e,t){return v.lessThan(e,t)?-1:v.greaterThan(e,t)?1:0}function nl(e,t){return{quotient:v.divide(e,t),remainder:v.remainder(e,t)}}var db,fb;const it="slot-epochNanoSeconds",rt="slot-iso-date",Ut="slot-iso-date-time",ie="slot-time",A="slot-calendar",V2="slot-date-brand",K2="slot-year-month-brand",G2="slot-month-day-brand",Tt="slot-time-zone",cn="slot-years",ln="slot-months",In="slot-weeks",un="slot-days",hn="slot-hours",dn="slot-minutes",fn="slot-seconds",pn="slot-milliseconds",gn="slot-microseconds",Pn="slot-nanoseconds",X2="date",Q2="ym",Z2="md",J2="time",tC="datetime",eC="instant",ta="original",ba="timezone-canonical",Jg="timezone-original",il="calendar-id",nC="locale",tm="options",iC=new WeakMap,em=Symbol.for("@@Temporal__GetSlots");(db=globalThis)[em]||(db[em]=function(e){return iC.get(e)});const Rf=globalThis[em],nm=Symbol.for("@@Temporal__CreateSlots");(fb=globalThis)[nm]||(fb[nm]=function(e){iC.set(e,Object.create(null))});const Jr=globalThis[nm];function xn(e,...t){if(!e||typeof e!="object")return!1;const n=Rf(e);return!!n&&t.every((i=>i in n))}function y(e,t){const n=Rf(e)?.[t];if(n===void 0)throw new TypeError(`Missing internal slot ${t}`);return n}function ht(e,t,n){const i=Rf(e);if(i===void 0)throw new TypeError("Missing slots for the given container");if(i[t])throw new TypeError(`${t} already has set`);i[t]=n}const im={};function ts(e,t){Object.defineProperty(e.prototype,Symbol.toStringTag,{value:t,writable:!1,enumerable:!1,configurable:!0});const n=Object.getOwnPropertyNames(e);for(let r=0;r<n.length;r++){const s=n[r],o=Object.getOwnPropertyDescriptor(e,s);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e,s,o))}const i=Object.getOwnPropertyNames(e.prototype);for(let r=0;r<i.length;r++){const s=i[r],o=Object.getOwnPropertyDescriptor(e.prototype,s);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e.prototype,s,o))}rm(t,e),rm(`${t}.prototype`,e.prototype)}function rm(e,t){const n=`%${e}%`;if(im[n]!==void 0)throw new Error(`intrinsic ${e} already exists`);im[n]=t}function je(e){return im[e]}function Ma(e,t){let n=e;if(n===0)return{div:n,mod:n};const i=Math.sign(n);n=Math.abs(n);const r=Math.trunc(1+Math.log10(n));if(t>=r)return{div:0*i,mod:i*n};if(t===0)return{div:i*n,mod:0*i};const s=n.toPrecision(r);return{div:i*Number.parseInt(s.slice(0,r-t),10),mod:i*Number.parseInt(s.slice(r-t),10)}}function Bp(e,t,n){let i=e,r=n;if(i===0)return r;const s=Math.sign(i)||Math.sign(r);i=Math.abs(i),r=Math.abs(r);const o=i.toPrecision(Math.trunc(1+Math.log10(i)));if(r===0)return s*Number.parseInt(o+"0".repeat(t),10);const a=o+r.toPrecision(Math.trunc(1+Math.log10(r))).padStart(t,"0");return s*Number.parseInt(a,10)}function Af(e,t){const n=t==="negative";switch(e){case"ceil":return n?"zero":"infinity";case"floor":return n?"infinity":"zero";case"expand":return"infinity";case"trunc":return"zero";case"halfCeil":return n?"half-zero":"half-infinity";case"halfFloor":return n?"half-infinity":"half-zero";case"halfExpand":return"half-infinity";case"halfTrunc":return"half-zero";case"halfEven":return"half-even"}}function Lf(e,t,n,i,r){return r==="zero"?e:r==="infinity"?t:n<0?e:n>0?t:r==="half-zero"?e:r==="half-infinity"?t:i?e:t}class ft{constructor(t){this.totalNs=Cr(t),this.sec=v.toNumber(v.divide(this.totalNs,Pl)),this.subsec=v.toNumber(v.remainder(this.totalNs,Pl))}static validateNew(t,n){if(v.greaterThan(oo(t),ft.MAX))throw new RangeError(`${n} of duration time units cannot exceed ${ft.MAX} s`);return new ft(t)}static fromEpochNsDiff(t,n){const i=v.subtract(Cr(t),Cr(n));return new ft(i)}static fromComponents(t,n,i,r,s,o){const a=v.add(v.add(v.add(v.add(v.add(v.BigInt(o),v.multiply(v.BigInt(s),lL)),v.multiply(v.BigInt(r),Bu)),v.multiply(v.BigInt(i),Pl)),v.multiply(v.BigInt(n),uL)),v.multiply(v.BigInt(t),Y2));return ft.validateNew(a,"total")}abs(){return new ft(oo(this.totalNs))}add(t){return ft.validateNew(v.add(this.totalNs,t.totalNs),"sum")}add24HourDays(t){return ft.validateNew(v.add(this.totalNs,v.multiply(v.BigInt(t),Ps)),"sum")}addToEpochNs(t){return v.add(Cr(t),this.totalNs)}cmp(t){return zd(this.totalNs,t.totalNs)}divmod(t){const{quotient:n,remainder:i}=nl(this.totalNs,v.BigInt(t));return{quotient:v.toNumber(n),remainder:new ft(i)}}fdiv(t){const n=Cr(t),i=v.BigInt(n);let{quotient:r,remainder:s}=nl(this.totalNs,i);const o=[];let a;const c=(v.lessThan(this.totalNs,Xn)?-1:1)*Math.sign(v.toNumber(n));for(;!v.equal(s,Xn)&&o.length<50;)s=v.multiply(s,oL),{quotient:a,remainder:s}=nl(s,i),o.push(Math.abs(v.toNumber(a)));return c*+(oo(r).toString()+"."+o.join(""))}isZero(){return v.equal(this.totalNs,Xn)}round(t,n){const i=Cr(t);if(v.equal(i,uu))return this;const{quotient:r,remainder:s}=nl(this.totalNs,i),o=v.lessThan(this.totalNs,Xn)?"negative":"positive",a=v.multiply(oo(r),i),c=v.add(a,i),l=zd(oo(v.multiply(s,jv)),i),u=Af(n,o),h=v.equal(oo(this.totalNs),a)?a:Lf(a,c,l,q2(r),u),d=o==="positive"?h:v.unaryMinus(h);return ft.validateNew(d,"rounding")}sign(){return this.cmp(new ft(Xn))}subtract(t){return ft.validateNew(v.subtract(this.totalNs,t.totalNs),"difference")}}ft.MAX=v.BigInt("9007199254740991999999999"),ft.ZERO=new ft(Xn);const pb=/[A-Za-z._][A-Za-z._0-9+-]*/,Wu=new RegExp(`(?:${/(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/.source}|(?:${pb.source})(?:\\/(?:${pb.source}))*)`),rC=/(?:[+-]\d{6}|\d{4})/,jd=/(?:0[1-9]|1[0-2])/,sm=/(?:0[1-9]|[12]\d|3[01])/,hL=new RegExp(`(${rC.source})(?:-(${jd.source})-(${sm.source})|(${jd.source})(${sm.source}))`),sC=/(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/,oC=/((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/,aC=new RegExp(`([zZ])|${oC.source}?`),Ja=/\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g,dL=new RegExp([`^${hL.source}`,`(?:(?:[tT]|\\s+)${sC.source}(?:${aC.source})?)?`,`(?:\\[!?(${Wu.source})\\])?`,`((?:${Ja.source})*)$`].join("")),fL=new RegExp([`^[tT]?${sC.source}`,`(?:${aC.source})?`,`(?:\\[!?${Wu.source}\\])?`,`((?:${Ja.source})*)$`].join("")),pL=new RegExp(`^(${rC.source})-?(${jd.source})(?:\\[!?${Wu.source}\\])?((?:${Ja.source})*)$`),gL=new RegExp(`^(?:--)?(${jd.source})-?(${sm.source})(?:\\[!?${Wu.source}\\])?((?:${Ja.source})*)$`),Wp=/(\d+)(?:[.,](\d{1,9}))?/,mL=new RegExp(`(?:${Wp.source}H)?(?:${Wp.source}M)?(?:${Wp.source}S)?`),vL=new RegExp(`^([+-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${mL.source})?$`,"i"),Rs=864e5,Bd=1e6*Rs,yL=6e10,cC=1e8*Rs,tc=Xi(cC),hu=v.unaryMinus(tc),bL=v.add(v.subtract(hu,Ps),uu),_L=v.subtract(v.add(tc,Ps),uu),wL=146097*Rs,gb=-271821,mb=275760,Rl=Date.UTC(1847,0,1),xL=["iso8601","hebrew","islamic","islamic-umalqura","islamic-tbla","islamic-civil","islamic-rgsa","islamicc","persian","ethiopic","ethioaa","ethiopic-amete-alem","coptic","chinese","dangi","roc","indian","buddhist","japanese","gregory"],CL=new Set(["ACT","AET","AGT","ART","AST","BET","BST","CAT","CNT","CST","CTT","EAT","ECT","IET","IST","JST","MIT","NET","NST","PLT","PNT","PRT","PST","SST","VST"]);function re(e){return typeof e=="object"&&e!==null||typeof e=="function"}function Nf(e){if(typeof e=="bigint")throw new TypeError("Cannot convert BigInt to number");return Number(e)}function Ff(e){if(typeof e=="symbol")throw new TypeError("Cannot convert a Symbol value to a String");return String(e)}function st(e){const t=Nf(e);if(t===0)return 0;if(Number.isNaN(t)||t===1/0||t===-1/0)throw new RangeError("invalid number value");const n=Math.trunc(t);return n===0?0:n}function vb(e,t){const n=st(e);if(n<=0)throw t!==void 0?new RangeError(`property '${t}' cannot be a a number less than one`):new RangeError("Cannot convert a number less than one to a positive integer");return n}function Ei(e){const t=Nf(e);if(Number.isNaN(t))throw new RangeError("not a number");if(t===1/0||t===-1/0)throw new RangeError("infinity is out of range");if(!(function(n){if(typeof n!="number"||Number.isNaN(n)||n===1/0||n===-1/0)return!1;const i=Math.abs(n);return Math.floor(i)===i})(t))throw new RangeError(`unsupported fractional value ${e}`);return t===0?0:t}function du(e,t){return String(e).padStart(t,"0")}function Se(e){if(typeof e!="string")throw new TypeError(`expected a string, not ${String(e)}`);return e}function om(e,t){if(re(e)){const n=e?.toString();if(typeof n=="string"||typeof n=="number")return n;throw new TypeError("Cannot convert object to primitive value")}return e}const am=["era","eraYear","year","month","monthCode","day","hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],kL={era:Ff,eraYear:st,year:st,month:vb,monthCode:function(e){const t=Se(om(e));if(t.length<3||t.length>4||t[0]!=="M"||"0123456789".indexOf(t[1])===-1||"0123456789".indexOf(t[2])===-1||t[1]+t[2]==="00"&&t[3]!=="L"||t[3]!=="L"&&t[3]!==void 0)throw new RangeError(`bad month code ${t}; must match M01-M99 or M00L-M99L`);return t},day:vb,hour:st,minute:st,second:st,millisecond:st,microsecond:st,nanosecond:st,offset:function(e){const t=Se(om(e));return kc(t),t},timeZone:yn},SL={hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},ec=[["years","year","date"],["months","month","date"],["weeks","week","date"],["days","day","date"],["hours","hour","time"],["minutes","minute","time"],["seconds","second","time"],["milliseconds","millisecond","time"],["microseconds","microsecond","time"],["nanoseconds","nanosecond","time"]],yb=Object.fromEntries(ec.map((e=>[e[0],e[1]]))),EL=Object.fromEntries(ec.map((([e,t])=>[t,e]))),Al=ec.map((([,e])=>e)),nc={day:Bd,hour:36e11,minute:6e10,second:1e9,millisecond:1e6,microsecond:1e3,nanosecond:1},Wd=["days","hours","microseconds","milliseconds","minutes","months","nanoseconds","seconds","weeks","years"],ML=Intl.DateTimeFormat,bb=new Map;function lC(e){const t=vu(e);let n=bb.get(t);return n===void 0&&(n=new ML("en-us",{timeZone:t,hour12:!1,era:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}),bb.set(t,n)),n}function Ae(e){return xn(e,it)&&!xn(e,Tt,A)}function te(e){return xn(e,cn,ln,un,hn,dn,fn,pn,gn,Pn)}function ne(e){return xn(e,V2)}function ce(e){return xn(e,ie)}function jt(e){return xn(e,Ut)}function Le(e){return xn(e,K2)}function Kn(e){return xn(e,G2)}function dt(e){return xn(e,it,Tt,A)}function I(e,t){if(!t(e))throw new TypeError("invalid receiver: method called with the wrong type of this-object")}function wc(e){if(xn(e,A)||xn(e,Tt))throw new TypeError("with() does not support a calendar or timeZone property");if(ce(e))throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");if(e.calendar!==void 0)throw new TypeError("with() does not support a calendar property");if(e.timeZone!==void 0)throw new TypeError("with() does not support a timeZone property")}function Hu(e,t){return t==="never"||t==="auto"&&e==="iso8601"?"":`[${t==="critical"?"!":""}u-ca=${e}]`}function zf(e){let t,n,i=!1;for(Ja.lastIndex=0;n=Ja.exec(e);){const{1:r,2:s,3:o}=n;if(s==="u-ca"){if(t===void 0)t=o,i=r==="!";else if(r==="!"||i)throw new RangeError(`Invalid annotations in ${e}: more than one u-ca present with critical flag`)}else if(r==="!")throw new RangeError(`Unrecognized annotation: !${s}=${o}`)}return t}function pr(e){const t=dL.exec(e);if(!t)throw new RangeError(`invalid RFC 9557 string: ${e}`);const n=zf(t[16]);let i=t[1];if(i==="-000000")throw new RangeError(`invalid RFC 9557 string: ${e}`);const r=+i,s=+(t[2]??t[4]??1),o=+(t[3]??t[5]??1),a=t[6]!==void 0,c=+(t[6]??0),l=+(t[7]??t[10]??0);let u=+(t[8]??t[11]??0);u===60&&(u=59);const h=(t[9]??t[12]??"")+"000000000",d=+h.slice(0,3),f=+h.slice(3,6),p=+h.slice(6,9);let g,m=!1;t[13]?(g=void 0,m=!0):t[14]&&(g=t[14]);const b=t[15];return qv(r,s,o,c,l,u,d,f,p),{year:r,month:s,day:o,time:a?{hour:c,minute:l,second:u,millisecond:d,microsecond:f,nanosecond:p}:"start-of-day",tzAnnotation:b,offset:g,z:m,calendar:n}}function uC(e){const t=fL.exec(e);let n,i,r,s,o,a,c;if(t){c=zf(t[10]),n=+(t[1]??0),i=+(t[2]??t[5]??0),r=+(t[3]??t[6]??0),r===60&&(r=59);const l=(t[4]??t[7]??"")+"000000000";if(s=+l.slice(0,3),o=+l.slice(3,6),a=+l.slice(6,9),t[8])throw new RangeError("Z designator not supported for PlainTime")}else{let l,u;if({time:l,z:u,calendar:c}=pr(e),l==="start-of-day")throw new RangeError(`time is missing in string: ${e}`);if(u)throw new RangeError("Z designator not supported for PlainTime");({hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a}=l)}if(Hf(n,i,r,s,o,a),/[tT ][0-9][0-9]/.test(e))return{hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a,calendar:c};try{const{month:l,day:u}=Wv(e);No(1972,l,u)}catch{try{const{year:l,month:u}=Bv(e);No(l,u,1)}catch{return{hour:n,minute:i,second:r,millisecond:s,microsecond:o,nanosecond:a,calendar:c}}}throw new RangeError(`invalid RFC 9557 time-only string ${e}; may need a T prefix`)}function Bv(e){const t=pL.exec(e);let n,i,r,s;if(t){r=zf(t[3]);let o=t[1];if(o==="-000000")throw new RangeError(`invalid RFC 9557 string: ${e}`);if(n=+o,i=+t[2],s=1,r!==void 0&&r!=="iso8601")throw new RangeError("YYYY-MM format is only valid with iso8601 calendar")}else{let o;if({year:n,month:i,calendar:r,day:s,z:o}=pr(e),o)throw new RangeError("Z designator not supported for PlainYearMonth")}return{year:n,month:i,calendar:r,referenceISODay:s}}function Wv(e){const t=gL.exec(e);let n,i,r,s;if(t){if(r=zf(t[3]),n=+t[1],i=+t[2],r!==void 0&&r!=="iso8601")throw new RangeError("MM-DD format is only valid with iso8601 calendar")}else{let o;if({month:n,day:i,calendar:r,year:s,z:o}=pr(e),o)throw new RangeError("Z designator not supported for PlainMonthDay")}return{month:n,day:i,calendar:r,referenceISOYear:s}}const hC=new RegExp(`^${Wu.source}$`,"i"),dC=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/.source}$`);function fC(e){const t=$L.test(e)?"Seconds not allowed in offset time zone":"Invalid time zone";throw new RangeError(`${t}: ${e}`)}function Ds(e){return hC.test(e)||fC(e),dC.test(e)?{offsetMinutes:kc(e)/6e10}:{tzName:e}}function Ll(e,t,n,i){let r=e,s=t,o=n;switch(i){case"reject":No(r,s,o);break;case"constrain":({year:r,month:s,day:o}=TC(r,s,o))}return{year:r,month:s,day:o}}function jf(e,t,n,i,r,s,o){let a=e,c=t,l=n,u=i,h=r,d=s;switch(o){case"reject":Hf(a,c,l,u,h,d);break;case"constrain":a=mn(a,0,23),c=mn(c,0,59),l=mn(l,0,59),u=mn(u,0,999),h=mn(h,0,999),d=mn(d,0,999)}return{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}function pC(e){if(!re(e))throw new TypeError("invalid duration-like");const t={years:void 0,months:void 0,weeks:void 0,days:void 0,hours:void 0,minutes:void 0,seconds:void 0,milliseconds:void 0,microseconds:void 0,nanoseconds:void 0};let n=!1;for(let i=0;i<Wd.length;i++){const r=Wd[i],s=e[r];s!==void 0&&(n=!0,t[r]=Ei(s))}if(!n)throw new TypeError("invalid duration-like");return t}function Xe({years:e,months:t,weeks:n,days:i},r,s,o){return{years:e,months:o??t,weeks:s??n,days:r??i}}function Mt(e,t){return{isoDate:e,time:t}}function St(e){return Nr(e,"overflow",["constrain","reject"],"constrain")}function Nl(e){return Nr(e,"disambiguation",["compatible","earlier","later","reject"],"compatible")}function Pi(e,t){return Nr(e,"roundingMode",["ceil","floor","expand","trunc","halfCeil","halfFloor","halfExpand","halfTrunc","halfEven"],t)}function Uh(e,t){return Nr(e,"offset",["prefer","use","ignore","reject"],t)}function Uu(e){return Nr(e,"calendarName",["auto","always","never","critical"],"auto")}function xc(e){let t=e.roundingIncrement;if(t===void 0)return 1;const n=st(t);if(n<1||n>1e9)throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t}`);return n}function Cc(e,t,n){const i=n?t:t-1;if(e>i)throw new RangeError(`roundingIncrement must be at least 1 and less than ${i}, not ${e}`);if(t%e!=0)throw new RangeError(`Rounding increment must divide evenly into ${t}`)}function Yu(e){const t=e.fractionalSecondDigits;if(t===void 0)return"auto";if(typeof t!="number"){if(Ff(t)!=="auto")throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return"auto"}const n=Math.floor(t);if(!Number.isFinite(n)||n<0||n>9)throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return n}function qu(e,t){switch(e){case"minute":return{precision:"minute",unit:"minute",increment:1};case"second":return{precision:0,unit:"second",increment:1};case"millisecond":return{precision:3,unit:"millisecond",increment:1};case"microsecond":return{precision:6,unit:"microsecond",increment:1};case"nanosecond":return{precision:9,unit:"nanosecond",increment:1}}switch(t){case"auto":return{precision:t,unit:"nanosecond",increment:1};case 0:return{precision:t,unit:"second",increment:1};case 1:case 2:case 3:return{precision:t,unit:"millisecond",increment:10**(3-t)};case 4:case 5:case 6:return{precision:t,unit:"microsecond",increment:10**(6-t)};case 7:case 8:case 9:return{precision:t,unit:"nanosecond",increment:10**(9-t)};default:throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`)}}const Yr=Symbol("~required~");function Nn(e,t,n,i,r=[]){let s=[];for(let l=0;l<ec.length;l++){const u=ec[l],h=u[1],d=u[2];n!=="datetime"&&n!==d||s.push(h)}s=s.concat(r);let o=i;o===Yr?o=void 0:o!==void 0&&s.push(o);let a=[];a=a.concat(s);for(let l=0;l<s.length;l++){const u=s[l],h=EL[u];h!==void 0&&a.push(h)}let c=Nr(e,t,a,o);if(c===void 0&&i===Yr)throw new RangeError(`${t} is required`);return c&&c in yb?yb[c]:c}function Hp(e){const t=e.relativeTo;if(t===void 0)return{};let n,i,r,s,o,a="option",c=!1;if(re(t)){if(dt(t))return{zonedRelativeTo:t};if(ne(t))return{plainRelativeTo:t};if(jt(t))return{plainRelativeTo:vn(y(t,Ut).isoDate,y(t,A))};r=Qu(t);const l=ni(r,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],[]);({isoDate:n,time:i}=Ku(r,l,"constrain")),{offset:o,timeZone:s}=l,o===void 0&&(a="wall")}else{let l,u,h,d,f;if({year:h,month:d,day:f,time:i,calendar:r,tzAnnotation:l,offset:o,z:u}=pr(Se(t)),l)s=yn(l),u?a="exact":o||(a="wall"),c=!0;else if(u)throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");r||(r="iso8601"),r=Cn(r),n={year:h,month:d,day:f}}return s===void 0?{plainRelativeTo:vn(n,r)}:{zonedRelativeTo:Ge(Hd(n,i,a,a==="option"?kc(o):0,s,"compatible","reject",c),s,r)}}function Sr(e){return y(e,cn)!==0?"year":y(e,ln)!==0?"month":y(e,In)!==0?"week":y(e,un)!==0?"day":y(e,hn)!==0?"hour":y(e,dn)!==0?"minute":y(e,fn)!==0?"second":y(e,pn)!==0?"millisecond":y(e,gn)!==0?"microsecond":"nanosecond"}function Ar(e,t){return Al.indexOf(e)>Al.indexOf(t)?t:e}function Ui(e){return e==="year"||e==="month"||e==="week"}function Er(e){return Ui(e)||e==="day"?"date":"time"}function Hs(e){return je("%calendarImpl%")(e)}function Vu(e){return je("%calendarImpl%")(y(e,A))}function _n(e,t,n="date"){const i=Object.create(null),r=Hs(e).isoToDate(t,{year:!0,monthCode:!0,day:!0});return i.monthCode=r.monthCode,n!=="month-day"&&n!=="date"||(i.day=r.day),n!=="year-month"&&n!=="date"||(i.year=r.year),i}function ni(e,t,n,i,r){const s=Hs(e).extraFields(n),o=n.concat(i,s),a=Object.create(null);let c=!1;o.sort();for(let l=0;l<o.length;l++){const u=o[l],h=t[u];if(h!==void 0)c=!0,a[u]=(0,kL[u])(h);else if(r!=="partial"){if(r.includes(u))throw new TypeError(`required property '${u}' missing or undefined`);a[u]=SL[u]}}if(r==="partial"&&!c)throw new TypeError("no supported properties found");return a}function cm(e,t="complete"){const n=["hour","microsecond","millisecond","minute","nanosecond","second"];let i=!1;const r=Object.create(null);for(let s=0;s<n.length;s++){const o=n[s],a=e[o];a!==void 0?(r[o]=st(a),i=!0):t==="complete"&&(r[o]=0)}if(!i)throw new TypeError("invalid time-like");return r}function rl(e,t){if(re(e)){if(ne(e))return St(K(t)),vn(y(e,rt),y(e,A));if(dt(e)){const c=wi(y(e,Tt),y(e,it));return St(K(t)),vn(c.isoDate,y(e,A))}if(jt(e))return St(K(t)),vn(y(e,Ut).isoDate,y(e,A));const a=Qu(e);return vn(As(a,ni(a,e,["year","month","monthCode","day"],[],[]),St(K(t))),a)}let{year:n,month:i,day:r,calendar:s,z:o}=pr(Se(e));if(o)throw new RangeError("Z designator not supported for PlainDate");return s||(s="iso8601"),s=Cn(s),St(K(t)),vn({year:n,month:i,day:r},s)}function Ku(e,t,n){return Mt(As(e,t,n),jf(t.hour,t.minute,t.second,t.millisecond,t.microsecond,t.nanosecond,n))}function sl(e,t){let n,i,r;if(re(e)){if(jt(e))return St(K(t)),fi(y(e,Ut),y(e,A));if(dt(e)){const a=wi(y(e,Tt),y(e,it));return St(K(t)),fi(a,y(e,A))}if(ne(e))return St(K(t)),fi(Mt(y(e,rt),{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),y(e,A));r=Qu(e);const s=ni(r,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],[]),o=St(K(t));({isoDate:n,time:i}=Ku(r,s,o))}else{let s,o,a,c;if({year:o,month:a,day:c,time:i,calendar:r,z:s}=pr(Se(e)),s)throw new RangeError("Z designator not supported for PlainDateTime");i==="start-of-day"&&(i={deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),qv(o,a,c,i.hour,i.minute,i.second,i.millisecond,i.microsecond,i.nanosecond),r||(r="iso8601"),r=Cn(r),St(K(t)),n={year:o,month:a,day:c}}return fi(Mt(n,i),r)}function mi(e){const t=je("%Temporal.Duration%");if(te(e))return new t(y(e,cn),y(e,ln),y(e,In),y(e,un),y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn));if(!re(e))return(function(r){const{years:s,months:o,weeks:a,days:c,hours:l,minutes:u,seconds:h,milliseconds:d,microseconds:f,nanoseconds:p}=(function(g){const m=vL.exec(g);if(!m)throw new RangeError(`invalid duration: ${g}`);if(m.every(((G,B)=>B<2||G===void 0)))throw new RangeError(`invalid duration: ${g}`);const b=m[1]==="-"?-1:1,_=m[2]===void 0?0:st(m[2])*b,C=m[3]===void 0?0:st(m[3])*b,S=m[4]===void 0?0:st(m[4])*b,k=m[5]===void 0?0:st(m[5])*b,$=m[6]===void 0?0:st(m[6])*b,D=m[7],w=m[8],x=m[9],M=m[10],O=m[11];let T=0,R=0,j=0;if(D!==void 0){if(w??x??M??O)throw new RangeError("only the smallest unit can be fractional");j=3600*st((D+"000000000").slice(0,9))*b}else if(T=w===void 0?0:st(w)*b,x!==void 0){if(M??O)throw new RangeError("only the smallest unit can be fractional");j=60*st((x+"000000000").slice(0,9))*b}else R=M===void 0?0:st(M)*b,O!==void 0&&(j=st((O+"000000000").slice(0,9))*b);const z=j%1e3,Y=Math.trunc(j/1e3)%1e3,F=Math.trunc(j/1e6)%1e3;return R+=Math.trunc(j/1e9)%60,T+=Math.trunc(j/6e10),Uf(_,C,S,k,$,T,R,F,Y,z),{years:_,months:C,weeks:S,days:k,hours:$,minutes:T,seconds:R,milliseconds:F,microseconds:Y,nanoseconds:z}})(r);return new(je("%Temporal.Duration%"))(s,o,a,c,l,u,h,d,f,p)})(Se(e));const n={years:0,months:0,weeks:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};let i=pC(e);for(let r=0;r<Wd.length;r++){const s=Wd[r],o=i[s];o!==void 0&&(n[s]=o)}return new t(n.years,n.months,n.weeks,n.days,n.hours,n.minutes,n.seconds,n.milliseconds,n.microseconds,n.nanoseconds)}function ol(e){let t;if(re(e)){if(Ae(e)||dt(e))return Ki(y(e,it));t=om(e)}else t=e;const{year:n,month:i,day:r,time:s,offset:o,z:a}=(function(g){const m=pr(g);if(!m.z&&!m.offset)throw new RangeError("Temporal.Instant requires a time zone offset");return m})(Se(t)),{hour:c=0,minute:l=0,second:u=0,millisecond:h=0,microsecond:d=0,nanosecond:f=0}=s==="start-of-day"?{}:s,p=mu(n,i,r,c,l,u,h,d,f-(a?0:kc(o)));return Na(p.isoDate),Ki(ze(p))}function _b(e,t){if(re(e)){if(Kn(e))return St(K(t)),Da(y(e,rt),y(e,A));let a;return xn(e,A)?a=y(e,A):(a=e.calendar,a===void 0&&(a="iso8601"),a=Xu(a)),Da(Ud(a,ni(a,e,["year","month","monthCode","day"],[],[]),St(K(t))),a)}let{month:n,day:i,referenceISOYear:r,calendar:s}=Wv(Se(e));if(s===void 0&&(s="iso8601"),s=Cn(s),St(K(t)),s==="iso8601")return Da({year:1972,month:n,day:i},s);let o={year:r,month:n,day:i};return ea(o),o=Ud(s,_n(s,o,"month-day"),"constrain"),Da(o,s)}function ms(e,t){let n;if(re(e)){if(ce(e))return St(K(t)),Mr(y(e,ie));if(jt(e))return St(K(t)),Mr(y(e,Ut).time);if(dt(e)){const l=wi(y(e,Tt),y(e,it));return St(K(t)),Mr(l.time)}const{hour:i,minute:r,second:s,millisecond:o,microsecond:a,nanosecond:c}=cm(e);n=jf(i,r,s,o,a,c,St(K(t)))}else n=uC(Se(e)),St(K(t));return Mr(n)}function gC(e){return e===void 0?{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}:y(ms(e),ie)}function al(e,t){if(re(e)){if(Le(e))return St(K(t)),La(y(e,rt),y(e,A));const a=Qu(e);return La(fu(a,ni(a,e,["year","month","monthCode"],[],[]),St(K(t))),a)}let{year:n,month:i,referenceISODay:r,calendar:s}=Bv(Se(e));s===void 0&&(s="iso8601"),s=Cn(s),St(K(t));let o={year:n,month:i,day:r};return Vv(o),o=fu(s,_n(s,o,"year-month"),"constrain"),La(o,s)}function Hd(e,t,n,i,r,s,o,a){if(t==="start-of-day")return as(r,e);const c=Mt(e,t);if(n==="wall"||o==="ignore")return Ze(r,c,s);if(n==="exact"||o==="use"){const h=mu(e.year,e.month,e.day,t.hour,t.minute,t.second,t.millisecond,t.microsecond,t.nanosecond-i);Na(h.isoDate);const d=ze(h);return sr(d),d}Na(e);const l=ze(c),u=pu(r,c);for(let h=0;h<u.length;h++){const d=u[h],f=v.toNumber(v.subtract(l,d)),p=vs(f,6e10,"halfExpand");if(f===i||a&&p===i)return d}if(o==="reject"){const h=lm(i),d=gu(c,"iso8601","auto");throw new RangeError(`Offset ${h} is invalid for ${d} in ${r}`)}return kC(u,r,c,s)}function cl(e,t){let n,i,r,s,o,a,c,l=!1,u="option";if(re(e)){if(dt(e)){const g=K(t);return Nl(g),Uh(g,"reject"),St(g),Ge(y(e,it),y(e,Tt),y(e,A))}o=Qu(e);const d=ni(o,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],["timeZone"]);({offset:s,timeZone:r}=d),s===void 0&&(u="wall");const f=K(t);a=Nl(f),c=Uh(f,"reject");const p=St(f);({isoDate:n,time:i}=Ku(o,d,p))}else{let d,f,p,g,m;({year:p,month:g,day:m,time:i,tzAnnotation:d,offset:s,z:f,calendar:o}=(function(_){const C=pr(_);if(!C.tzAnnotation)throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");return C})(Se(e))),r=yn(d),f?u="exact":s||(u="wall"),o||(o="iso8601"),o=Cn(o),l=!0;const b=K(t);a=Nl(b),c=Uh(b,"reject"),St(b),n={year:p,month:g,day:m}}let h=0;return u==="option"&&(h=kc(s)),Ge(Hd(n,i,u,h,r,a,c,l),r,o)}function mC(e,t,n){ea(t),Jr(e),ht(e,rt,t),ht(e,A,n),ht(e,V2,!0)}function vn(e,t){const n=je("%Temporal.PlainDate%"),i=Object.create(n.prototype);return mC(i,e,t),i}function vC(e,t,n){Fo(t),Jr(e),ht(e,Ut,t),ht(e,A,n)}function fi(e,t){const n=je("%Temporal.PlainDateTime%"),i=Object.create(n.prototype);return vC(i,e,t),i}function yC(e,t,n){ea(t),Jr(e),ht(e,rt,t),ht(e,A,n),ht(e,G2,!0)}function Da(e,t){const n=je("%Temporal.PlainMonthDay%"),i=Object.create(n.prototype);return yC(i,e,t),i}function bC(e,t){Jr(e),ht(e,ie,t)}function Mr(e){const t=je("%Temporal.PlainTime%"),n=Object.create(t.prototype);return bC(n,e),n}function _C(e,t,n){Vv(t),Jr(e),ht(e,rt,t),ht(e,A,n),ht(e,K2,!0)}function La(e,t){const n=je("%Temporal.PlainYearMonth%"),i=Object.create(n.prototype);return _C(i,e,t),i}function wC(e,t){sr(t),Jr(e),ht(e,it,t)}function Ki(e){const t=je("%Temporal.Instant%"),n=Object.create(t.prototype);return wC(n,e),n}function xC(e,t,n,i){sr(t),Jr(e),ht(e,it,t),ht(e,Tt,n),ht(e,A,i)}function Ge(e,t,n="iso8601"){const i=je("%Temporal.ZonedDateTime%"),r=Object.create(i.prototype);return xC(r,e,t,n),r}function wb(e){return am.filter((t=>e[t]!==void 0))}function Lo(e,t,n){const i=wb(n),r=Hs(e).fieldKeysToIgnore(i),s=Object.create(null),o=wb(t);for(let a=0;a<am.length;a++){let c;const l=am[a];o.includes(l)&&!r.includes(l)&&(c=t[l]),i.includes(l)&&(c=n[l]),c!==void 0&&(s[l]=c)}return s}function Zn(e,t,n,i){const r=Hs(e).dateAdd(t,n,i);return ea(r),r}function Gu(e,t,n,i){return Hs(e).dateUntil(t,n,i)}function Xu(e){if(re(e)&&xn(e,A))return y(e,A);const t=Se(e);try{return Cn(t)}catch{}let n;try{({calendar:n}=pr(t))}catch{try{({calendar:n}=uC(t))}catch{try{({calendar:n}=Bv(t))}catch{({calendar:n}=Wv(t))}}}return n||(n="iso8601"),Cn(n)}function Qu(e){if(xn(e,A))return y(e,A);const{calendar:t}=e;return t===void 0?"iso8601":Xu(t)}function rr(e,t){return Cn(e)===Cn(t)}function As(e,t,n){const i=Hs(e);i.resolveFields(t,"date");const r=i.dateToISO(t,n);return ea(r),r}function fu(e,t,n){const i=Hs(e);i.resolveFields(t,"year-month"),t.day=1;const r=i.dateToISO(t,n);return Vv(r),r}function Ud(e,t,n){const i=Hs(e);i.resolveFields(t,"month-day");const r=i.monthDayToISOReferenceDate(t,n);return ea(r),r}function yn(e){if(re(e)&&dt(e))return y(e,Tt);const t=Se(e);if(t==="UTC")return"UTC";const{tzName:n,offsetMinutes:i}=(function(s){const{tzAnnotation:o,offset:a,z:c}=(function(l){if(hC.test(l))return{tzAnnotation:l,offset:void 0,z:!1};try{const{tzAnnotation:u,offset:h,z:d}=pr(l);if(d||u||h)return{tzAnnotation:u,offset:h,z:d}}catch{}fC(l)})(s);return o?Ds(o):c?Ds("UTC"):a?Ds(a):void 0})(t);if(i!==void 0)return Hv(i);const r=Yd(n);if(!r)throw new RangeError(`Unrecognized time zone ${n}`);return r.identifier}function CC(e,t){if(e===t)return!0;const n=Ds(e).offsetMinutes,i=Ds(t).offsetMinutes;if(n===void 0&&i===void 0){const r=Yd(t);if(!r)return!1;const s=Yd(e);return!!s&&s.primaryIdentifier===r.primaryIdentifier}return n===i}function Dr(e,t){const n=Ds(e).offsetMinutes;return n!==void 0?6e10*n:um(e,t)}function lm(e){const t=e<0?"-":"+",n=Math.abs(e),i=Math.floor(n/36e11),r=Math.floor(n/6e10)%60,s=Math.floor(n/1e9)%60,o=n%1e9;return`${t}${Bf(i,r,s,o,s===0&&o===0?"minute":"auto")}`}function wi(e,t){const n=Dr(e,t);let{isoDate:{year:i,month:r,day:s},time:{hour:o,minute:a,second:c,millisecond:l,microsecond:u,nanosecond:h}}=MC(t);return mu(i,r,s,o,a,c,l,u,h+n)}function Ze(e,t,n){return kC(pu(e,t),e,t,n)}function kC(e,t,n,i){const r=e.length;if(r===1)return e[0];if(r)switch(i){case"compatible":case"earlier":return e[0];case"later":return e[r-1];case"reject":throw new RangeError("multiple instants found")}if(i==="reject")throw new RangeError("multiple instants found");const s=ze(n),o=v.subtract(s,Ps);sr(o);const a=Dr(t,o),c=v.add(s,Ps);sr(c);const l=Dr(t,c)-a;switch(i){case"earlier":{const u=ft.fromComponents(0,0,0,0,0,-l),h=ic(n.time,u);return pu(t,Mt(jn(n.isoDate.year,n.isoDate.month,n.isoDate.day+h.deltaDays),h))[0]}case"compatible":case"later":{const u=ft.fromComponents(0,0,0,0,0,l),h=ic(n.time,u),d=pu(t,Mt(jn(n.isoDate.year,n.isoDate.month,n.isoDate.day+h.deltaDays),h));return d[d.length-1]}}}function pu(e,t){if(e==="UTC")return Na(t.isoDate),[ze(t)];const n=Ds(e).offsetMinutes;if(n!==void 0){const i=mu(t.isoDate.year,t.isoDate.month,t.isoDate.day,t.time.hour,t.time.minute-n,t.time.second,t.time.millisecond,t.time.microsecond,t.time.nanosecond);Na(i.isoDate);const r=ze(i);return sr(r),[r]}return Na(t.isoDate),(function(i,r){let s=ze(r),o=v.subtract(s,Ps);v.lessThan(o,hu)&&(o=s);let a=v.add(s,Ps);v.greaterThan(a,tc)&&(a=s);const c=um(i,o),l=um(i,a);return(c===l?[c]:[c,l]).map((h=>{const d=v.subtract(s,v.BigInt(h)),f=(function(p,g){const{epochMilliseconds:m,time:{millisecond:b,microsecond:_,nanosecond:C}}=MC(g),{year:S,month:k,day:$,hour:D,minute:w,second:x}=DC(p,m);return mu(S,k,$,D,w,x,b,_,C)})(i,d);if(rc(r,f)===0)return sr(d),d})).filter((h=>h!==void 0))})(e,t)}function as(e,t){const n=Mt(t,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),i=pu(e,n);if(i.length)return i[0];const r=ze(n),s=v.subtract(r,Ps);return sr(s),Yv(e,s)}function Zu(e){let t;return t=e<0||e>9999?(e<0?"-":"+")+du(Math.abs(e),6):du(e,4),t}function Jn(e){return du(e,2)}function SC(e,t){let n;if(t==="auto"){if(e===0)return"";n=du(e,9).replace(/0+$/,"")}else{if(t===0)return"";n=du(e,9).slice(0,t)}return`.${n}`}function Bf(e,t,n,i,r){let s=`${Jn(e)}:${Jn(t)}`;return r==="minute"||(s+=`:${Jn(n)}`,s+=SC(i,r)),s}function xb(e,t,n){let i=t;i===void 0&&(i="UTC");const r=y(e,it),s=gu(wi(i,r),"iso8601",n,"never");let o="Z";return t!==void 0&&(o=EC(Dr(i,r))),`${s}${o}`}function ph(e,t){const n=y(e,cn),i=y(e,ln),r=y(e,In),s=y(e,un),o=y(e,hn),a=y(e,dn),c=Vd(e);let l="";n!==0&&(l+=`${Math.abs(n)}Y`),i!==0&&(l+=`${Math.abs(i)}M`),r!==0&&(l+=`${Math.abs(r)}W`),s!==0&&(l+=`${Math.abs(s)}D`);let u="";o!==0&&(u+=`${Math.abs(o)}H`),a!==0&&(u+=`${Math.abs(a)}M`);const h=ft.fromComponents(0,0,y(e,fn),y(e,pn),y(e,gn),y(e,Pn));h.isZero()&&!["second","millisecond","microsecond","nanosecond"].includes(Sr(e))&&t==="auto"||(u+=`${Math.abs(h.sec)}${SC(Math.abs(h.subsec),t)}S`);let d=`${c<0?"-":""}P${l}`;return u&&(d=`${d}T${u}`),d}function Cb(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);return`${Zu(n)}-${Jn(i)}-${Jn(r)}${Hu(y(e,A),t)}`}function kb({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o){return Bf(e,t,n,1e6*i+1e3*r+s,o)}function gu(e,t,n,i="auto"){const{isoDate:{year:r,month:s,day:o},time:{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}=e;return`${Zu(r)}-${Jn(s)}-${Jn(o)}T${Bf(a,c,l,1e6*u+1e3*h+d,n)}${Hu(t,i)}`}function Sb(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);let s=`${Jn(i)}-${Jn(r)}`;const o=y(e,A);t!=="always"&&t!=="critical"&&o==="iso8601"||(s=`${Zu(n)}-${s}`);const a=Hu(o,t);return a&&(s+=a),s}function Eb(e,t="auto"){const{year:n,month:i,day:r}=y(e,rt);let s=`${Zu(n)}-${Jn(i)}`;const o=y(e,A);t!=="always"&&t!=="critical"&&o==="iso8601"||(s+=`-${Jn(r)}`);const a=Hu(o,t);return a&&(s+=a),s}function Mb(e,t,n="auto",i="auto",r="auto",s=void 0){let o=y(e,it);if(s){const{unit:u,increment:h,roundingMode:d}=s;o=pm(o,h,u,d)}const a=y(e,Tt),c=Dr(a,o);let l=gu(wi(a,o),"iso8601",t,"never");return r!=="never"&&(l+=EC(c)),i!=="never"&&(l+=`[${i==="critical"?"!":""}${a}]`),l+=Hu(y(e,A),n),l}function Db(e){return dC.test(e)}function kc(e){const t=TL.exec(e);if(!t)throw new RangeError(`invalid time zone offset: ${e}; must match ±HH:MM[:SS.SSSSSSSSS]`);return(t[1]==="-"?-1:1)*(1e9*(60*(60*+t[2]+ +(t[3]||0))+ +(t[4]||0))+ +((t[5]||0)+"000000000").slice(0,9))}let zc;const DL=Object.assign(Object.create(null),{"/":!0,"-":!0,_:!0});function Yd(e){if(zc===void 0){const s=Intl.supportedValuesOf?.("timeZone");if(s){zc=new Map;for(let o=0;o<s.length;o++){const a=s[o];zc.set(vu(a),a)}}else zc=null}const t=vu(e);let n=zc?.get(t);if(n)return{identifier:n,primaryIdentifier:n};try{n=lC(e).resolvedOptions().timeZone}catch{return}if(t==="antarctica/south_pole"&&(n="Antarctica/McMurdo"),CL.has(e))throw new RangeError(`${e} is a legacy time zone identifier from ICU. Use ${n} instead`);const i=[...t].map(((s,o)=>o===0||DL[t[o-1]]?s.toUpperCase():s)).join("").split("/");if(i.length===1)return t==="gb-eire"?{identifier:"GB-Eire",primaryIdentifier:n}:{identifier:t.length<=3||/[-0-9]/.test(t)?t.toUpperCase():i[0],primaryIdentifier:n};if(i[0]==="Etc")return{identifier:`Etc/${["Zulu","Greenwich","Universal"].includes(i[1])?i[1]:i[1].toUpperCase()}`,primaryIdentifier:n};if(i[0]==="Us")return{identifier:`US/${i[1]}`,primaryIdentifier:n};const r=new Map([["Act","ACT"],["Lhi","LHI"],["Nsw","NSW"],["Dar_Es_Salaam","Dar_es_Salaam"],["Port_Of_Spain","Port_of_Spain"],["Port-Au-Prince","Port-au-Prince"],["Isle_Of_Man","Isle_of_Man"],["Comodrivadavia","ComodRivadavia"],["Knox_In","Knox_IN"],["Dumontdurville","DumontDUrville"],["Mcmurdo","McMurdo"],["Denoronha","DeNoronha"],["Easterisland","EasterIsland"],["Bajanorte","BajaNorte"],["Bajasur","BajaSur"]]);return i[1]=r.get(i[1])??i[1],i.length>2&&(i[2]=r.get(i[2])??i[2]),{identifier:i.join("/"),primaryIdentifier:n}}function xo(e,t){const{year:n,month:i,day:r,hour:s,minute:o,second:a}=DC(e,t);let c=t%1e3;return c<0&&(c+=1e3),1e6*(Uv({isoDate:{year:n,month:i,day:r},time:{hour:s,minute:o,second:a,millisecond:c}})-t)}function um(e,t){return xo(e,xi(t,"floor"))}function Hv(e){const t=e<0?"-":"+",n=Math.abs(e);return`${t}${Bf(Math.floor(n/60),n%60,0,0,"minute")}`}function EC(e){return Hv(vs(e,yL,"halfExpand")/6e10)}function Uv({isoDate:{year:e,month:t,day:n},time:{hour:i,minute:r,second:s,millisecond:o}}){const a=e%400,c=(e-a)/400,l=new Date;return l.setUTCHours(i,r,s,o),l.setUTCFullYear(a,t-1,n),l.getTime()+wL*c}function ze(e){const t=Uv(e),n=1e3*e.time.microsecond+e.time.nanosecond;return v.add(Xi(t),v.BigInt(n))}function MC(e){let t=xi(e,"trunc"),n=v.toNumber(v.remainder(e,Bu));n<0&&(n+=1e6,t-=1);const i=Math.floor(n/1e3)%1e3,r=n%1e3,s=new Date(t);return{epochMilliseconds:t,isoDate:{year:s.getUTCFullYear(),month:s.getUTCMonth()+1,day:s.getUTCDate()},time:{hour:s.getUTCHours(),minute:s.getUTCMinutes(),second:s.getUTCSeconds(),millisecond:s.getUTCMilliseconds(),microsecond:i,nanosecond:r}}}function Yv(e,t){if(e==="UTC")return null;const n=xi(t,"floor");if(n<Rl)return Yv(e,Xi(Rl));const i=Date.now(),r=Math.max(n,i)+366*Rs*3;let s=n,o=xo(e,s),a=s,c=o;for(;o===c&&s<r;){if(a=s+2*Rs*7,a>cC)return null;c=xo(e,a),o===c&&(s=a)}return o===c?null:Xi(FC((l=>xo(e,l)),s,a,o,c))}function hm(e,t){if(e==="UTC")return null;const n=xi(t,"ceil"),i=Date.now(),r=i+366*Rs*3;if(n>r){const l=hm(e,Xi(r));if(l===null||v.lessThan(l,Xi(i)))return l}if(e==="Africa/Casablanca"||e==="Africa/El_Aaiun"){const l=Date.UTC(2088,0,1);if(l<n)return hm(e,Xi(l))}let s=n-1;if(s<Rl)return null;let o=xo(e,s),a=s,c=o;for(;o===c&&s>Rl;){if(a=s-2*Rs*7,a<Rl)return null;c=xo(e,a),o===c&&(s=a)}return o===c?null:Xi(FC((l=>xo(e,l)),a,s,c,o))}function DC(e,t){return(function(n){const i=n.split(/[^\w]+/);if(i.length!==7)throw new RangeError(`expected 7 parts in "${n}`);const r=+i[0],s=+i[1];let o=+i[2];const a=i[3];if(a[0]==="b"||a[0]==="B")o=1-o;else if(a[0]!=="a"&&a[0]!=="A")throw new RangeError(`Unknown era ${a} in "${n}`);const c=i[4]==="24"?0:+i[4],l=+i[5],u=+i[6];if(!(Number.isFinite(o)&&Number.isFinite(r)&&Number.isFinite(s)&&Number.isFinite(c)&&Number.isFinite(l)&&Number.isFinite(u)))throw new RangeError(`Invalid number in "${n}`);return{year:o,month:r,day:s,hour:c,minute:l,second:u}})(lC(e).format(t))}function qd(e){return e!==void 0&&!(e%4!=0||e%100==0&&e%400!=0)}function Co(e,t){return{standard:[31,28,31,30,31,30,31,31,30,31,30,31],leapyear:[31,29,31,30,31,30,31,31,30,31,30,31]}[qd(e)?"leapyear":"standard"][t-1]}function Vd(e){const t=[y(e,cn),y(e,ln),y(e,In),y(e,un),y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn)];for(let n=0;n<t.length;n++){const i=t[n];if(i!==0)return i<0?-1:1}return 0}function Wf(e){const t=["years","months","weeks","days"];for(let n=0;n<t.length;n++){const i=e[t[n]];if(i!==0)return i<0?-1:1}return 0}function $C(e){const t=Wf(e.date);return t!==0?t:e.time.sign()}function vo(e,t){let n=e,i=t;if(!Number.isFinite(n)||!Number.isFinite(i))throw new RangeError("infinity is out of range");return i-=1,n+=Math.floor(i/12),i%=12,i<0&&(i+=12),i+=1,{year:n,month:i}}function jn(e,t,n){let i=e,r=t,s=n;if(!Number.isFinite(s))throw new RangeError("infinity is out of range");({year:i,month:r}=vo(i,r));const o=146097;if(Math.abs(s)>o){const l=Math.trunc(s/o);i+=400*l,s-=l*o}let a=0,c=r>2?i:i-1;for(;a=qd(c)?366:365,s<-a;)i-=1,c-=1,s+=a;for(c+=1;a=qd(c)?366:365,s>a;)i+=1,c+=1,s-=a;for(;s<1;)({year:i,month:r}=vo(i,r-1)),s+=Co(i,r);for(;s>Co(i,r);)s-=Co(i,r),{year:i,month:r}=vo(i,r+1);return{year:i,month:r,day:s}}function mu(e,t,n,i,r,s,o,a,c){const l=cs(i,r,s,o,a,c);return Mt(jn(e,t,n+l.deltaDays),l)}function cs(e,t,n,i,r,s){let o,a=e,c=t,l=n,u=i,h=r,d=s;({div:o,mod:d}=Ma(d,3)),h+=o,d<0&&(h-=1,d+=1e3),{div:o,mod:h}=Ma(h,3),u+=o,h<0&&(u-=1,h+=1e3),l+=Math.trunc(u/1e3),u%=1e3,u<0&&(l-=1,u+=1e3),c+=Math.trunc(l/60),l%=60,l<0&&(c-=1,l+=60),a+=Math.trunc(c/60),c%=60,c<0&&(a-=1,c+=60);let f=Math.trunc(a/24);return a%=24,a<0&&(f-=1,a+=24),f+=0,a+=0,c+=0,l+=0,u+=0,h+=0,d+=0,{deltaDays:f,hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d}}function $b(e,t){const n=Xe(e,0);if(Wf(n)===0)return e.days;const i=y(t,rt),r=Zn(y(t,A),i,n,"constrain"),s=zo(i.year,i.month-1,i.day),o=zo(r.year,r.month-1,r.day)-s;return e.days+o}function Bn(e){return new(je("%Temporal.Duration%"))(-y(e,cn),-y(e,ln),-y(e,In),-y(e,un),-y(e,hn),-y(e,dn),-y(e,fn),-y(e,pn),-y(e,gn),-y(e,Pn))}function mn(e,t,n){return Math.min(n,Math.max(t,e))}function TC(e,t,n){const i=mn(t,1,12);return{year:e,month:i,day:mn(n,1,Co(e,i))}}function Te(e,t,n){if(e<t||e>n)throw new RangeError(`value out of range: ${t} <= ${e} <= ${n}`)}function No(e,t,n){Te(t,1,12),Te(n,1,Co(e,t))}function ea(e){Fo(Mt(e,{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}))}function Hf(e,t,n,i,r,s){Te(e,0,23),Te(t,0,59),Te(n,0,59),Te(i,0,999),Te(r,0,999),Te(s,0,999)}function qv(e,t,n,i,r,s,o,a,c){No(e,t,n),Hf(i,r,s,o,a,c)}function Fo(e){const t=ze(e);(v.lessThan(t,bL)||v.greaterThan(t,_L))&&sr(t)}function dm(e){ze(e)}function sr(e){if(v.lessThan(e,hu)||v.greaterThan(e,tc))throw new RangeError("date/time value is outside of supported range")}function Vv({year:e,month:t}){Te(e,gb,mb),e===gb?Te(t,4,12):e===mb&&Te(t,1,9)}function Uf(e,t,n,i,r,s,o,a,c,l){let u=0;const h=[e,t,n,i,r,s,o,a,c,l];for(let b=0;b<h.length;b++){const _=h[b];if(_===1/0||_===-1/0)throw new RangeError("infinite values not allowed as duration fields");if(_!==0){const C=_<0?-1:1;if(u!==0&&C!==u)throw new RangeError("mixed-sign values not allowed as duration fields");u=C}}if(Math.abs(e)>=2**32||Math.abs(t)>=2**32||Math.abs(n)>=2**32)throw new RangeError("years, months, and weeks must be < 2³²");const d=Ma(a,3),f=Ma(c,6),p=Ma(l,9),g=Ma(1e6*d.mod+1e3*f.mod+p.mod,9).div,m=86400*i+3600*r+60*s+o+d.div+f.div+p.div+g;if(!Number.isSafeInteger(m))throw new RangeError("total of duration time units cannot exceed 9007199254740991.999999999 s")}function _a(e){return{date:{years:y(e,cn),months:y(e,ln),weeks:y(e,In),days:y(e,un)},time:ft.fromComponents(y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn))}}function Gi(e){const t=ft.fromComponents(y(e,hn),y(e,dn),y(e,fn),y(e,pn),y(e,gn),y(e,Pn)).add24HourDays(y(e,un));return{date:{years:y(e,cn),months:y(e,ln),weeks:y(e,In),days:0},time:t}}function OC(e){const t=Gi(e),n=Math.trunc(t.time.sec/86400);return Uf(t.date.years,t.date.months,t.date.weeks,n,0,0,0,0,0,0),{...t.date,days:n}}function pi(e,t){const n=e.time.sign();let i=e.time.abs().subsec,r=0,s=0,o=e.time.abs().sec,a=0,c=0,l=0;switch(t){case"year":case"month":case"week":case"day":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60,c=Math.trunc(a/60),a%=60,l=Math.trunc(c/24),c%=24;break;case"hour":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60,c=Math.trunc(a/60),a%=60;break;case"minute":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3,a=Math.trunc(o/60),o%=60;break;case"second":r=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(r/1e3),r%=1e3,o+=Math.trunc(s/1e3),s%=1e3;break;case"millisecond":r=Math.trunc(i/1e3),i%=1e3,s=Bp(o,3,Math.trunc(r/1e3)),r%=1e3,o=0;break;case"microsecond":r=Bp(o,6,Math.trunc(i/1e3)),i%=1e3,o=0;break;case"nanosecond":i=Bp(o,9,i),o=0}return new(je("%Temporal.Duration%"))(e.date.years,e.date.months,e.date.weeks,e.date.days+n*l,n*c,n*a,n*o,n*s,n*r,n*i)}function Lr(e,t){return Wf(e),t.sign(),{date:e,time:t}}function zo(e,t,n){return Uv({isoDate:{year:e,month:t+1,day:n},time:{hour:0,minute:0,second:0,millisecond:0}})/Rs}function Na({year:e,month:t,day:n}){if(Math.abs(zo(e,t-1,n))>1e8)throw new RangeError("date/time value is outside the supported range")}function Kv(e,t){const n=t.hour-e.hour,i=t.minute-e.minute,r=t.second-e.second,s=t.millisecond-e.millisecond,o=t.microsecond-e.microsecond,a=t.nanosecond-e.nanosecond;return ft.fromComponents(n,i,r,s,o,a)}function Gv(e,t,n,i,r){let s=ft.fromEpochNsDiff(t,e);return s=Kd(s,n,i,r),Lr({years:0,months:0,weeks:0,days:0},s)}function IC(e,t,n,i){dm(e),dm(t);let r=Kv(e.time,t.time);const s=r.sign(),o=or(e.isoDate,t.isoDate);let a=t.isoDate;o===s&&(a=jn(a.year,a.month,a.day+s),r=r.add24HourDays(-s));const c=Ar("day",i),l=Gu(n,e.isoDate,a,c);return i!==c&&(r=r.add24HourDays(l.days),l.days=0),Lr(l,r)}function PC(e,t,n,i,r){const s=v.subtract(t,e);if(v.equal(s,Xn))return{date:{years:0,months:0,weeks:0,days:0},time:ft.ZERO};const o=v.lessThan(s,Xn)?-1:1,a=wi(n,e),c=wi(n,t);let l,u=0,h=o===1?2:1,d=Kv(a.time,c.time);for(d.sign()===-o&&u++;u<=h;u++){l=Mt(jn(c.isoDate.year,c.isoDate.month,c.isoDate.day-u*o),a.time);const p=Ze(n,l,"compatible");if(d=ft.fromEpochNsDiff(t,p),d.sign()!==-o)break}const f=Ar("day",r);return Lr(Gu(i,a.isoDate,l.isoDate,f),d)}function RC(e,t,n,i,r,s,o,a,c){let l,u,h,d,f=t;switch(a){case"year":{const T=vs(f.date.years,o,"trunc");l=T,u=T+o*e,h={years:l,months:0,weeks:0,days:0},d={...h,years:u};break}case"month":{const T=vs(f.date.months,o,"trunc");l=T,u=T+o*e,h=Xe(f.date,0,0,l),d=Xe(f.date,0,0,u);break}case"week":{const T=Xe(f.date,0,0),R=Zn(s,i.isoDate,T,"constrain"),j=Gu(s,R,jn(R.year,R.month,R.day+f.date.days),"week"),z=vs(f.date.weeks+j.weeks,o,"trunc");l=z,u=z+o*e,h=Xe(f.date,0,l),d=Xe(f.date,0,u);break}case"day":{const T=vs(f.date.days,o,"trunc");l=T,u=T+o*e,h=Xe(f.date,l),d=Xe(f.date,u);break}}const p=Zn(s,i.isoDate,h,"constrain"),g=Zn(s,i.isoDate,d,"constrain");let m,b;const _=Mt(p,i.time),C=Mt(g,i.time);r?(m=Ze(r,_,"compatible"),b=Ze(r,C,"compatible")):(m=ze(_),b=ze(C));const S=ft.fromEpochNsDiff(n,m),k=ft.fromEpochNsDiff(b,m),$=Af(c,e<0?"negative":"positive"),D=S.add(S).abs().subtract(k.abs()).sign(),w=Math.abs(l)/o%2==0,x=S.isZero()?Math.abs(l):S.cmp(k)?Lf(Math.abs(l),Math.abs(u),D,w,$):Math.abs(u),M=new ft(v.add(v.multiply(k.totalNs,v.BigInt(l)),v.multiply(S.totalNs,v.BigInt(o*e)))).fdiv(k.totalNs),O=x===Math.abs(u);return f={date:O?d:h,time:ft.ZERO},{nudgeResult:{duration:f,nudgedEpochNs:O?b:m,didExpandCalendarUnit:O},total:M}}function Yf(e,t,n,i,r,s,o,a,c){let l=e;const u=Ui(a)||i&&a==="day",h=$C(l)<0?-1:1;let d;return u?{nudgeResult:d}=RC(h,l,t,n,i,r,o,a,c):d=i?(function(f,p,g,m,b,_,C,S){let k=p;const $=Zn(b,g.isoDate,k.date,"constrain"),D=Mt($,g.time),w=Mt(jn($.year,$.month,$.day+f),g.time),x=Ze(m,D,"compatible"),M=Ze(m,w,"compatible"),O=ft.fromEpochNsDiff(M,x);if(O.sign()!==f)throw new RangeError("time zone returned inconsistent Instants");const T=v.BigInt(nc[C]*_);let R=k.time.round(T,S);const j=R.subtract(O),z=j.sign()!==-f;let Y,F;return z?(Y=f,R=j.round(T,S),F=R.addToEpochNs(M)):(Y=0,F=R.addToEpochNs(x)),{duration:Lr(Xe(k.date,k.date.days+Y),R),nudgedEpochNs:F,didExpandCalendarUnit:z}})(h,l,n,i,r,o,a,c):(function(f,p,g,m,b,_){let C=f;const S=C.time.add24HourDays(C.date.days),k=S.round(v.BigInt(m*nc[b]),_),$=k.subtract(S),{quotient:D}=S.divmod(Bd),{quotient:w}=k.divmod(Bd),x=Math.sign(w-D)===S.sign(),M=$.addToEpochNs(p);let O=0,T=k;return Er(g)==="date"&&(O=w,T=k.add(ft.fromComponents(24*-w,0,0,0,0,0))),{duration:{date:Xe(C.date,O),time:T},nudgedEpochNs:M,didExpandCalendarUnit:x}})(l,t,s,o,a,c),l=d.duration,d.didExpandCalendarUnit&&a!=="week"&&(l=(function(f,p,g,m,b,_,C,S){let k=p;if(S===C)return k;const $=Al.indexOf(C);for(let D=Al.indexOf(S)-1;D>=$;D--){const w=Al[D];if(w==="week"&&C!=="week")continue;let x;switch(w){case"year":x={years:k.date.years+f,months:0,weeks:0,days:0};break;case"month":{const T=k.date.months+f;x=Xe(k.date,0,0,T);break}case"week":{const T=k.date.weeks+f;x=Xe(k.date,0,T);break}}const M=Mt(Zn(_,m.isoDate,x,"constrain"),m.time);let O;if(O=b?Ze(b,M,"compatible"):ze(M),zd(g,O)===-f)break;k={date:x,time:ft.ZERO}}return k})(h,l,d.nudgedEpochNs,n,i,r,s,Ar(a,"day"))),l}function Tb(e,t,n,i,r,s){return Ui(s)||i&&s==="day"?RC($C(e)<0?-1:1,e,t,n,i,r,1,s,"trunc").total:Fl(e.time.add24HourDays(e.date.days),s)}function AC(e,t,n,i,r,s,o){if(rc(e,t)==0)return{date:{years:0,months:0,weeks:0,days:0},time:ft.ZERO};Fo(e),Fo(t);const a=IC(e,t,n,i);return s==="nanosecond"&&r===1?a:Yf(a,ze(t),e,null,n,i,r,s,o)}function LC(e,t,n,i,r,s,o,a){if(Er(r)==="time")return Gv(e,t,s,o,a);const c=PC(e,t,n,i,r);return o==="nanosecond"&&s===1?c:Yf(c,t,wi(n,e),n,i,r,s,o,a)}function Sc(e,t,n,i,r,s){const o=ec.reduce(((f,p)=>{const g=p[0],m=p[1],b=p[2];return n!=="datetime"&&b!==n||i.includes(m)||f.push(m,g),f}),[]);let a=Nn(t,"largestUnit",n,"auto");if(i.includes(a))throw new RangeError(`largestUnit must be one of ${o.join(", ")}, not ${a}`);const c=xc(t);let l=Pi(t,"trunc");e==="since"&&(l=(function(f){switch(f){case"ceil":return"floor";case"floor":return"ceil";case"halfCeil":return"halfFloor";case"halfFloor":return"halfCeil";default:return f}})(l));const u=Nn(t,"smallestUnit",n,r);if(i.includes(u))throw new RangeError(`smallestUnit must be one of ${o.join(", ")}, not ${u}`);const h=Ar(s,u);if(a==="auto"&&(a=h),Ar(a,u)!==a)throw new RangeError(`largestUnit ${a} cannot be smaller than smallestUnit ${u}`);const d={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[u];return d!==void 0&&Cc(c,d,!1),{largestUnit:a,roundingIncrement:c,roundingMode:l,smallestUnit:u}}function Ob(e,t,n,i){const r=ol(n),s=Sc(e,K(i),"time",[],"nanosecond","second");let o=pi(Gv(y(t,it),y(r,it),s.roundingIncrement,s.smallestUnit,s.roundingMode),s.largestUnit);return e==="since"&&(o=Bn(o)),o}function Ib(e,t,n,i){const r=rl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Sc(e,K(i),"date",[],"day","day"),c=je("%Temporal.Duration%"),l=y(t,rt),u=y(r,rt);if(or(l,u)===0)return new c;let h={date:Gu(s,l,u,a.largestUnit),time:ft.ZERO};if(a.smallestUnit!=="day"||a.roundingIncrement!==1){const f=Mt(l,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});h=Yf(h,ze(Mt(u,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),f,null,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode)}let d=pi(h,"day");return e==="since"&&(d=Bn(d)),d}function Pb(e,t,n,i){const r=sl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Sc(e,K(i),"datetime",[],"nanosecond","day"),c=je("%Temporal.Duration%"),l=y(t,Ut),u=y(r,Ut);if(rc(l,u)===0)return new c;let h=pi(AC(l,u,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode),a.largestUnit);return e==="since"&&(h=Bn(h)),h}function Rb(e,t,n,i){const r=ms(n),s=Sc(e,K(i),"time",[],"nanosecond","hour");let o=Kv(y(t,ie),y(r,ie));o=Kd(o,s.roundingIncrement,s.smallestUnit,s.roundingMode);let a=pi(Lr({years:0,months:0,weeks:0,days:0},o),s.largestUnit);return e==="since"&&(a=Bn(a)),a}function Ab(e,t,n,i){const r=al(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between months of ${s} and ${o} calendars`);const a=Sc(e,K(i),"date",["week","day"],"month","year"),c=je("%Temporal.Duration%");if(or(y(t,rt),y(r,rt))==0)return new c;const l=_n(s,y(t,rt),"year-month");l.day=1;const u=As(s,l,"constrain"),h=_n(s,y(r,rt),"year-month");h.day=1;const d=As(s,h,"constrain");let f={date:Xe(Gu(s,u,d,a.largestUnit),0,0),time:ft.ZERO};if(a.smallestUnit!=="month"||a.roundingIncrement!==1){const g=Mt(u,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});f=Yf(f,ze(Mt(d,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),g,null,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode)}let p=pi(f,"day");return e==="since"&&(p=Bn(p)),p}function Lb(e,t,n,i){const r=cl(n),s=y(t,A),o=y(r,A);if(!rr(s,o))throw new RangeError(`cannot compute difference between dates of ${s} and ${o} calendars`);const a=Sc(e,K(i),"datetime",[],"nanosecond","hour"),c=y(t,it),l=y(r,it),u=je("%Temporal.Duration%");let h;if(Er(a.largestUnit)!=="date")h=pi(Gv(c,l,a.roundingIncrement,a.smallestUnit,a.roundingMode),a.largestUnit);else{const d=y(t,Tt);if(!CC(d,y(r,Tt)))throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");if(v.equal(c,l))return new u;h=pi(LC(c,l,d,s,a.largestUnit,a.roundingIncrement,a.smallestUnit,a.roundingMode),"hour")}return e==="since"&&(h=Bn(h)),h}function ic({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o){let a=n,c=s;return a+=o.sec,c+=o.subsec,cs(e,t,a,i,r,c)}function fm(e,t){const n=t.addToEpochNs(e);return sr(n),n}function ll(e,t,n,i,r="constrain"){if(Wf(i.date)===0)return fm(e,i.time);const s=wi(t,e);return fm(Ze(t,Mt(Zn(n,s.isoDate,i.date,r),s.time),"compatible"),i.time)}function Nb(e,t,n){let i=mi(n);e==="subtract"&&(i=Bn(i));const r=Ar(Sr(t),Sr(i));if(Ui(r))throw new RangeError("For years, months, or weeks arithmetic, use date arithmetic relative to a starting point");const s=Gi(t),o=Gi(i);return pi(Lr({years:0,months:0,weeks:0,days:0},s.time.add(o.time)),r)}function Fb(e,t,n){let i=mi(n);e==="subtract"&&(i=Bn(i));const r=Sr(i);if(Er(r)==="date")throw new RangeError(`Duration field ${r} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);const s=Gi(i);return Ki(fm(y(t,it),s.time))}function zb(e,t,n,i){const r=y(t,A);let s=mi(n);e==="subtract"&&(s=Bn(s));const o=OC(s),a=St(K(i));return vn(Zn(r,y(t,rt),o,a),r)}function jb(e,t,n,i){let r=mi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=y(t,A),a=Gi(r),c=y(t,Ut),l=ic(c.time,a.time),u=Xe(a.date,l.deltaDays);return Uf(u.years,u.months,u.weeks,u.days,0,0,0,0,0,0),fi(Mt(Zn(o,c.isoDate,u,s),l),o)}function Bb(e,t,n){let i=mi(n);e==="subtract"&&(i=Bn(i));const r=Gi(i),{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=ic(y(t,ie),r.time);return Mr(jf(s,o,a,c,l,u,"reject"))}function Wb(e,t,n,i){let r=mi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=Vd(r),a=y(t,A),c=_n(a,y(t,rt),"year-month");c.day=1;let l=As(a,c,"constrain");if(o<0){const h=Zn(a,l,{months:1},"constrain");l=jn(h.year,h.month,h.day-1)}const u=OC(r);return ea(l),La(fu(a,_n(a,Zn(a,l,u,s),"year-month"),s),a)}function Hb(e,t,n,i){let r=mi(n);e==="subtract"&&(r=Bn(r));const s=St(K(i)),o=y(t,Tt),a=y(t,A),c=_a(r);return Ge(ll(y(t,it),o,a,c,s),o,a)}function vs(e,t,n){const i=Math.trunc(e/t),r=e%t,s=e<0?"negative":"positive",o=Math.abs(i),a=o+1,c=Rn(Math.abs(2*r)-t),l=o%2==0,u=Af(n,s),h=r===0?o:Lf(o,a,c,l,u);return t*(s==="positive"?h:-h)}function pm(e,t,n,i){const r=nc[n]*t;return(function(s,o,a){const c=Cr(s),l=Cr(o),u=v.divide(c,l),h=v.remainder(c,l),d=Af(a,"positive");let f,p;v.lessThan(c,Xn)?(f=v.subtract(u,uu),p=u):(f=u,p=v.add(u,uu));const g=zd(oo(v.multiply(h,jv)),l)*(v.lessThan(c,Xn)?-1:1)+0,m=v.equal(h,Xn)?u:Lf(f,p,g,q2(f),d);return v.multiply(m,l)})(e,v.BigInt(r),i)}function gm(e,t,n,i){dm(e);const{year:r,month:s,day:o}=e.isoDate,a=mm(e.time,t,n,i);return Mt(jn(r,s,o+a.deltaDays),a)}function mm({hour:e,minute:t,second:n,millisecond:i,microsecond:r,nanosecond:s},o,a,c){let l;switch(a){case"day":case"hour":l=1e3*(1e3*(1e3*(60*(60*e+t)+n)+i)+r)+s;break;case"minute":l=1e3*(1e3*(1e3*(60*t+n)+i)+r)+s;break;case"second":l=1e3*(1e3*(1e3*n+i)+r)+s;break;case"millisecond":l=1e3*(1e3*i+r)+s;break;case"microsecond":l=1e3*r+s;break;case"nanosecond":l=s}const u=nc[a],h=vs(l,u*o,c)/u;switch(a){case"day":return{deltaDays:h,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0};case"hour":return cs(h,0,0,0,0,0);case"minute":return cs(e,h,0,0,0,0);case"second":return cs(e,t,h,0,0,0);case"millisecond":return cs(e,t,n,h,0,0);case"microsecond":return cs(e,t,n,i,h,0);case"nanosecond":return cs(e,t,n,i,r,h);default:throw new Error(`Invalid unit ${a}`)}}function Kd(e,t,n,i){const r=nc[n];return e.round(v.BigInt(r*t),i)}function Fl(e,t){const n=nc[t];return e.fdiv(v.BigInt(n))}function or(e,t){return e.year!==t.year?Rn(e.year-t.year):e.month!==t.month?Rn(e.month-t.month):e.day!==t.day?Rn(e.day-t.day):0}function vm(e,t){return e.hour!==t.hour?Rn(e.hour-t.hour):e.minute!==t.minute?Rn(e.minute-t.minute):e.second!==t.second?Rn(e.second-t.second):e.millisecond!==t.millisecond?Rn(e.millisecond-t.millisecond):e.microsecond!==t.microsecond?Rn(e.microsecond-t.microsecond):e.nanosecond!==t.nanosecond?Rn(e.nanosecond-t.nanosecond):0}function rc(e,t){const n=or(e.isoDate,t.isoDate);return n!==0?n:vm(e.time,t.time)}function NC(e){const t=Gd(e);return globalThis.BigInt!==void 0?globalThis.BigInt(t.toString(10)):t}function xi(e,t){const n=Cr(e),{quotient:i,remainder:r}=nl(n,Bu);let s=v.toNumber(i);return t==="floor"&&v.toNumber(r)<0&&(s-=1),t==="ceil"&&v.toNumber(r)>0&&(s+=1),s}function Xi(e){if(!Number.isInteger(e))throw new RangeError("epoch milliseconds must be an integer");return v.multiply(v.BigInt(e),Bu)}function Gd(e){let t=e;if(typeof e=="object"){const n=e[Symbol.toPrimitive];n&&typeof n=="function"&&(t=n.call(e,"number"))}if(typeof t=="number")throw new TypeError("cannot convert number to bigint");return typeof t=="bigint"?v.BigInt(t.toString(10)):v.BigInt(t)}const ym=(()=>{let e=v.BigInt(Date.now()%1e6);return()=>{const t=Date.now(),n=v.BigInt(t),i=v.add(Xi(t),e);return e=v.remainder(n,Bu),v.greaterThan(i,tc)?tc:v.lessThan(i,hu)?hu:i}})();function jc(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}function Rn(e){return e<0?-1:e>0?1:e}function K(e){if(e===void 0)return Object.create(null);if(re(e)&&e!==null)return e;throw new TypeError("Options parameter must be an object, not "+(e===null?"null":typeof e))}function jo(e,t){const n=Object.create(null);return n[e]=t,n}function Nr(e,t,n,i){let r=e[t];if(r!==void 0){if(r=Ff(r),!n.includes(r))throw new RangeError(`${t} must be one of ${n.join(", ")}, not ${r}`);return r}if(i===Yr)throw new RangeError(`${t} option is required`);return i}function Cn(e){const t=vu(e);if(!xL.includes(vu(t)))throw new RangeError(`invalid calendar identifier ${t}`);switch(t){case"ethiopic-amete-alem":return"ethioaa";case"islamicc":return"islamic-civil"}return t}function vu(e){let t="";for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);t+=i>=65&&i<=90?String.fromCharCode(i+32):String.fromCharCode(i)}return t}function Us(e){throw new TypeError(`Do not use built-in arithmetic operators with Temporal objects. When comparing, use ${e==="PlainMonthDay"?"Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))":`Temporal.${e}.compare(obj1, obj2)`}, not obj1 > obj2. When coercing to strings, use \`\${obj}\` or String(obj), not '' + obj. When coercing to numbers, use properties or methods of the object, not \`+obj\`. When concatenating with strings, use \`\${str}\${obj}\` or str.concat(obj), not str + obj. In React, coerce to a string before rendering a Temporal object.`)}const $L=new RegExp(`^${oC.source}$`),TL=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/.source}$`);function FC(e,t,n,i=e(t),r=e(n)){let s=t,o=n,a=i,c=r;for(;o-s>1;){let l=Math.trunc((s+o)/2);const u=e(l);u===a?(s=l,a=u):u===c&&(o=l,c=u)}return o}function zC(e){return[...e]}function jC(e,t){if(e!=="gregory"&&e!=="iso8601")return;const n=Ju[e];let i=t.year;const{dayOfWeek:r,dayOfYear:s,daysInYear:o}=n.isoToDate(t,{dayOfWeek:!0,dayOfYear:!0,daysInYear:!0}),a=n.getFirstDayOfWeek(),c=n.getMinimalDaysInFirstWeek();let l=(r+7-a)%7,u=(r-s+7001-a)%7,h=Math.floor((s-1+u)/7);if(7-u>=c&&++h,h==0)h=(function(d,f,p,g){let m=(g-d-p+1)%7;m<0&&(m+=7);let b=Math.floor((p+m-1)/7);return 7-m>=f&&++b,b})(a,c,s+n.isoToDate(n.dateAdd(t,{years:-1},"constrain"),{daysInYear:!0}).daysInYear,r),i--;else if(s>=o-5){let d=(l+o-s)%7;d<0&&(d+=7),6-d>=c&&s+7-l>o&&(h=1,i++)}return{week:h,year:i}}function Ub(e,t,n,i,r){if(t!==r.year){if(e*(t-r.year)>0)return!0}else if(n!==r.month){if(e*(n-r.month)>0)return!0}else if(i!==r.day&&e*(i-r.day)>0)return!0;return!1}const Ju={};function Bo(e){if(!e.startsWith("M"))throw new RangeError(`Invalid month code: ${e}.  Month codes must start with M.`);const t=+e.slice(1);if(Number.isNaN(t))throw new RangeError(`Invalid month code: ${e}`);return t}function Zi(e,t=!1){return`M${`${e}`.padStart(2,"0")}${t?"L":""}`}function Xv(e,t=void 0,n=12){let{month:i,monthCode:r}=e;if(r===void 0){if(i===void 0)throw new TypeError("Either month or monthCode are required");t==="reject"&&Te(i,1,n),t==="constrain"&&(i=mn(i,1,n)),r=Zi(i)}else{const s=Bo(r);if(r!==Zi(s))throw new RangeError(`Invalid month code: ${r}`);if(i!==void 0&&i!==s)throw new RangeError(`monthCode ${r} and month ${i} must match if both are present`);if(i=s,i<1||i>n)throw new RangeError(`Invalid monthCode: ${r}`)}return{...e,month:i,monthCode:r}}Ju.iso8601={resolveFields(e,t){if((t==="date"||t==="year-month")&&e.year===void 0)throw new TypeError("year is required");if((t==="date"||t==="month-day")&&e.day===void 0)throw new TypeError("day is required");Object.assign(e,Xv(e))},dateToISO:(e,t)=>Ll(e.year,e.month,e.day,t),monthDayToISOReferenceDate(e,t){const{month:n,day:i}=Ll(e.year??1972,e.month,e.day,t);return{month:n,day:i,year:1972}},extraFields:()=>[],fieldKeysToIgnore(e){const t=new Set;for(let n=0;n<e.length;n++){const i=e[n];t.add(i),i==="month"?t.add("monthCode"):i==="monthCode"&&t.add("month")}return zC(t)},dateAdd(e,{years:t=0,months:n=0,weeks:i=0,days:r=0},s){let{year:o,month:a,day:c}=e;return o+=t,a+=n,{year:o,month:a}=vo(o,a),{year:o,month:a,day:c}=Ll(o,a,c,s),c+=r+7*i,jn(o,a,c)},dateUntil(e,t,n){const i=-or(e,t);if(i===0)return{years:0,months:0,weeks:0,days:0};let r,s=0,o=0;if(n==="year"||n==="month"){let u=t.year-e.year;for(u!==0&&(u-=i);!Ub(i,e.year+u,e.month,e.day,t);)s=u,u+=i;let h=i;for(r=vo(e.year+s,e.month+h);!Ub(i,r.year,r.month,e.day,t);)o=h,h+=i,r=vo(r.year,r.month+i);n==="month"&&(o+=12*s,s=0)}r=vo(e.year+s,e.month+o);const a=TC(r.year,r.month,e.day);let c=0,l=zo(t.year,t.month-1,t.day)-zo(a.year,a.month-1,a.day);return n==="week"&&(c=Math.trunc(l/7),l%=7),{years:s,months:o,weeks:c,days:l}},isoToDate({year:e,month:t,day:n},i){const r={era:void 0,eraYear:void 0,year:e,month:t,day:n,daysInWeek:7,monthsInYear:12};if(i.monthCode&&(r.monthCode=Zi(t)),i.dayOfWeek){const s=t+(t<3?10:-2),o=e-(t<3?1:0),a=Math.floor(o/100),c=o-100*a,l=(n+Math.floor(2.6*s-.2)+(c+Math.floor(c/4))+(Math.floor(a/4)-2*a))%7;r.dayOfWeek=l+(l<=0?7:0)}if(i.dayOfYear){let s=n;for(let o=t-1;o>0;o--)s+=Co(e,o);r.dayOfYear=s}return i.weekOfYear&&(r.weekOfYear=jC("iso8601",{year:e,month:t,day:n})),i.daysInMonth&&(r.daysInMonth=Co(e,t)),(i.daysInYear||i.inLeapYear)&&(r.inLeapYear=qd(e),r.daysInYear=r.inLeapYear?366:365),r},getFirstDayOfWeek:()=>1,getMinimalDaysInFirstWeek:()=>4};class $e{constructor(t){if(this.map=new Map,this.calls=0,this.hits=0,this.misses=0,t!==void 0){let n=0;for(const i of t.map.entries()){if(++n>$e.MAX_CACHE_ENTRIES)break;this.map.set(...i)}}}get(t){const n=this.map.get(t);return n&&(this.hits++,this.report()),this.calls++,n}set(t,n){this.map.set(t,n),this.misses++,this.report()}report(){}setObject(t){if($e.objectMap.get(t))throw new RangeError("object already cached");$e.objectMap.set(t,this),this.report()}static getCacheForObject(t){let n=$e.objectMap.get(t);return n||(n=new $e,$e.objectMap.set(t,n)),n}}function BC({isoYear:e,isoMonth:t,isoDay:n}){return`${Zu(e)}-${Jn(t)}-${Jn(n)}T00:00Z`}function Up(e,t){return{years:e.year-t.year,months:e.month-t.month,days:e.day-t.day}}$e.objectMap=new WeakMap,$e.MAX_CACHE_ENTRIES=1e3;class na{constructor(){this.eras=[],this.hasEra=!1,this.erasBeginMidYear=!1}getFormatter(){return this.formatter===void 0&&(this.formatter=new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`,{day:"numeric",month:"numeric",year:"numeric",era:"short",timeZone:"UTC"})),this.formatter}getCalendarParts(t){let n=this.getFormatter(),i=new Date(t);if(t==="-271821-04-19T00:00Z"){const r=n.resolvedOptions();n=new Intl.DateTimeFormat(r.locale,{...r,timeZone:"Etc/GMT+1"}),i=new Date("-271821-04-20T00:00Z")}try{return n.formatToParts(i)}catch{throw new RangeError(`Invalid ISO date: ${t}`)}}isoToCalendarDate(t,n){const{year:i,month:r,day:s}=t,o=JSON.stringify({func:"isoToCalendarDate",isoYear:i,isoMonth:r,isoDay:s,id:this.id}),a=n.get(o);if(a)return a;const c=BC({isoYear:i,isoMonth:r,isoDay:s}),l=this.getCalendarParts(c),u={};for(let d=0;d<l.length;d++){const{type:f,value:p}=l[d];if(f!=="year"&&f!=="relatedYear"||(this.hasEra?u.eraYear=+p:u.year=+p),f==="month"){const g=/^([0-9]*)(.*?)$/.exec(p);if(!g||g.length!=3||!g[1]&&!g[2])throw new RangeError(`Unexpected month: ${p}`);if(u.month=g[1]?+g[1]:1,u.month<1)throw new RangeError(`Invalid month ${p} from ${c}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);if(u.month>13)throw new RangeError(`Invalid month ${p} from ${c}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);g[2]&&(u.monthExtra=g[2])}f==="day"&&(u.day=+p),this.hasEra&&f==="era"&&p!=null&&p!==""&&(u.era=p.split(" (")[0].normalize("NFD").replace(/[^-0-9 \p{L}]/gu,"").replace(/ /g,"-").toLowerCase())}if(this.hasEra&&u.eraYear===void 0)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);if(this.hasEra){const d=this.eras.find((f=>u.era===f.genericName));d&&(u.era=d.code)}if(this.reviseIntlEra){const{era:d,eraYear:f}=this.reviseIntlEra(u,t);u.era=d,u.eraYear=f}this.checkIcuBugs&&this.checkIcuBugs(t);const h=this.adjustCalendarDate(u,n,"constrain",!0);if(h.year===void 0)throw new RangeError(`Missing year converting ${JSON.stringify(t)}`);if(h.month===void 0)throw new RangeError(`Missing month converting ${JSON.stringify(t)}`);if(h.day===void 0)throw new RangeError(`Missing day converting ${JSON.stringify(t)}`);return n.set(o,h),["constrain","reject"].forEach((d=>{const f=JSON.stringify({func:"calendarToIsoDate",year:h.year,month:h.month,day:h.day,overflow:d,id:this.id});n.set(f,t)})),h}validateCalendarDate(t){const{month:n,year:i,day:r,eraYear:s,monthCode:o,monthExtra:a}=t;if(a!==void 0)throw new RangeError("Unexpected `monthExtra` value");if(i===void 0&&s===void 0)throw new TypeError("year or eraYear is required");if(n===void 0&&o===void 0)throw new TypeError("month or monthCode is required");if(r===void 0)throw new RangeError("Missing day");if(o!==void 0){if(typeof o!="string")throw new RangeError("monthCode must be a string, not "+typeof o);if(!/^M([01]?\d)(L?)$/.test(o))throw new RangeError(`Invalid monthCode: ${o}`)}if(this.hasEra&&t.era===void 0!=(t.eraYear===void 0))throw new TypeError("properties era and eraYear must be provided together")}adjustCalendarDate(t,n=void 0,i="constrain",r=!1){if(this.calendarType==="lunisolar")throw new RangeError("Override required for lunisolar calendars");let s=t;this.validateCalendarDate(s);const o=this.monthsInYear(s,n);let{month:a,monthCode:c}=s;return{month:a,monthCode:c}=Xv(s,i,o),{...s,month:a,monthCode:c}}regulateMonthDayNaive(t,n,i){const r=this.monthsInYear(t,i);let{month:s,day:o}=t;return n==="reject"?(Te(s,1,r),Te(o,1,this.maximumMonthLength(t))):(s=mn(s,1,r),o=mn(o,1,this.maximumMonthLength({...t,month:s}))),{...t,month:s,day:o}}calendarToIsoDate(t,n="constrain",i){const r=t;let s=this.adjustCalendarDate(t,i,n,!1);s=this.regulateMonthDayNaive(s,n,i);const{year:o,month:a,day:c}=s,l=JSON.stringify({func:"calendarToIsoDate",year:o,month:a,day:c,overflow:n,id:this.id});let u,h=i.get(l);if(h||r.year!==void 0&&r.month!==void 0&&r.day!==void 0&&(r.year!==s.year||r.month!==s.month||r.day!==s.day)&&(u=JSON.stringify({func:"calendarToIsoDate",year:r.year,month:r.month,day:r.day,overflow:n,id:this.id}),h=i.get(u),h))return h;let d=this.estimateIsoDate({year:o,month:a,day:c});const f=_=>{let C=this.addDaysIso(d,_);if(s.day>this.minimumMonthLength(s)){let S=this.isoToCalendarDate(C,i);for(;S.month!==a||S.year!==o;){if(n==="reject")throw new RangeError(`day ${c} does not exist in month ${a} of year ${o}`);C=this.addDaysIso(C,-1),S=this.isoToCalendarDate(C,i)}}return C};let p=0,g=this.isoToCalendarDate(d,i),m=Up(s,g);if(m.years!==0||m.months!==0||m.days!==0){const _=365*m.years+30*m.months+m.days;d=this.addDaysIso(d,_),g=this.isoToCalendarDate(d,i),m=Up(s,g),m.years===0&&m.months===0?d=f(m.days):p=this.compareCalendarDates(s,g)}let b=8;for(;p;){d=this.addDaysIso(d,p*b);const _=g;g=this.isoToCalendarDate(d,i);const C=p;if(p=this.compareCalendarDates(s,g),p){if(m=Up(s,g),m.years===0&&m.months===0)d=f(m.days),p=0;else if(C&&p!==C)if(b>1)b/=2;else{if(n==="reject")throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({...r})}`);this.compareCalendarDates(g,_)>0&&(d=this.addDaysIso(d,-1)),p=0}}}if(i.set(l,d),u&&i.set(u,d),s.year===void 0||s.month===void 0||s.day===void 0||s.monthCode===void 0||this.hasEra&&(s.era===void 0||s.eraYear===void 0))throw new RangeError("Unexpected missing property");return d}compareCalendarDates(t,n){return t.year!==n.year?Rn(t.year-n.year):t.month!==n.month?Rn(t.month-n.month):t.day!==n.day?Rn(t.day-n.day):0}regulateDate(t,n="constrain",i){const r=this.calendarToIsoDate(t,n,i);return this.isoToCalendarDate(r,i)}addDaysIso(t,n){return jn(t.year,t.month,t.day+n)}addDaysCalendar(t,n,i){const r=this.calendarToIsoDate(t,"constrain",i),s=this.addDaysIso(r,n);return this.isoToCalendarDate(s,i)}addMonthsCalendar(t,n,i,r){let s=t;const{day:o}=s;for(let a=0,c=Math.abs(n);a<c;a++){const{month:l}=s,u=s,h=n<0?-Math.max(o,this.daysInPreviousMonth(s,r)):this.daysInMonth(s,r),d=this.calendarToIsoDate(s,"constrain",r);let f=this.addDaysIso(d,h);if(s=this.isoToCalendarDate(f,r),n>0){const p=this.monthsInYear(u,r);for(;s.month-1!=l%p;)f=this.addDaysIso(f,-1),s=this.isoToCalendarDate(f,r)}s.day!==o&&(s=this.regulateDate({...s,day:o},"constrain",r))}if(i==="reject"&&s.day!==o)throw new RangeError(`Day ${o} does not exist in resulting calendar month`);return s}addCalendar(t,{years:n=0,months:i=0,weeks:r=0,days:s=0},o,a){const{year:c,day:l,monthCode:u}=t,h=this.adjustCalendarDate({year:c+n,monthCode:u,day:l},a),d=this.addMonthsCalendar(h,i,o,a),f=s+7*r;return this.addDaysCalendar(d,f,a)}untilCalendar(t,n,i,r){let s=0,o=0,a=0,c=0;switch(i){case"day":s=this.calendarDaysUntil(t,n,r);break;case"week":{const l=this.calendarDaysUntil(t,n,r);s=l%7,o=(l-s)/7;break}case"month":case"year":{const l=this.compareCalendarDates(n,t);if(!l)return{years:0,months:0,weeks:0,days:0};const u=n.year-t.year,h=n.day-t.day;if(i==="year"&&u){let p=0;n.monthCode>t.monthCode&&(p=1),n.monthCode<t.monthCode&&(p=-1),p||(p=Math.sign(h)),c=p*l<0?u-l:u}let d,f=c?this.addCalendar(t,{years:c},"constrain",r):t;do a+=l,d=f,f=this.addMonthsCalendar(d,l,"constrain",r),f.day!==t.day&&(f=this.regulateDate({...f,day:t.day},"constrain",r));while(this.compareCalendarDates(n,f)*l>=0);a-=l,s=this.calendarDaysUntil(d,n,r);break}}return{years:c,months:a,weeks:o,days:s}}daysInMonth(t,n){const{day:i}=t,r=this.maximumMonthLength(t),s=this.minimumMonthLength(t);if(s===r)return s;const o=i<=r-s?r:s,a=this.calendarToIsoDate(t,"constrain",n),c=this.addDaysIso(a,o),l=this.isoToCalendarDate(c,n),u=this.addDaysIso(c,-l.day);return this.isoToCalendarDate(u,n).day}daysInPreviousMonth(t,n){const{day:i,month:r,year:s}=t;let o={year:r>1?s:s-1,month:r,day:1};const a=r>1?r-1:this.monthsInYear(o,n);o={...o,month:a};const c=this.minimumMonthLength(o),l=this.maximumMonthLength(o);if(c===l)return l;const u=this.calendarToIsoDate(t,"constrain",n),h=this.addDaysIso(u,-i);return this.isoToCalendarDate(h,n).day}startOfCalendarYear(t){return{year:t.year,month:1,monthCode:"M01",day:1}}startOfCalendarMonth(t){return{year:t.year,month:t.month,day:1}}calendarDaysUntil(t,n,i){const r=this.calendarToIsoDate(t,"constrain",i),s=this.calendarToIsoDate(n,"constrain",i);return zo(s.year,s.month-1,s.day)-zo(r.year,r.month-1,r.day)}monthDaySearchStartYear(t,n){return 1972}monthDayFromFields(t,n,i){let r,s,o,a,c,{era:l,eraYear:u,year:h,month:d,monthCode:f,day:p}=t;if(d!==void 0&&h===void 0&&(!this.hasEra||l===void 0||u===void 0))throw new TypeError("when month is present, year (or era and eraYear) are required");(f===void 0||h!==void 0||this.hasEra&&u!==void 0)&&({monthCode:f,day:p}=this.isoToCalendarDate(this.calendarToIsoDate(t,n,i),i));const g={year:this.monthDaySearchStartYear(f,p),month:12,day:31},m=this.isoToCalendarDate(g,i),b=m.monthCode>f||m.monthCode===f&&m.day>=p?m.year:m.year-1;for(let _=0;_<20;_++){const C=this.adjustCalendarDate({day:p,monthCode:f,year:b-_},i),S=this.calendarToIsoDate(C,"constrain",i),k=this.isoToCalendarDate(S,i);if({year:r,month:s,day:o}=S,k.monthCode===f&&k.day===p)return{month:s,day:o,year:r};if(n==="constrain"){const $=this.maxLengthOfMonthCodeInAnyYear(k.monthCode);if(k.monthCode===f&&k.day===$&&p>$)return{month:s,day:o,year:r};(a===void 0||k.monthCode===a.monthCode&&k.day>a.day)&&(a=k,c=S)}}if(n==="constrain"&&c!==void 0)return c;throw new RangeError(`No recent ${this.id} year with monthCode ${f} and day ${p}`)}getFirstDayOfWeek(){}getMinimalDaysInFirstWeek(){}}class OL extends na{constructor(){super(...arguments),this.id="hebrew",this.calendarType="lunisolar",this.months={Tishri:{leap:1,regular:1,monthCode:"M01",days:30},Heshvan:{leap:2,regular:2,monthCode:"M02",days:{min:29,max:30}},Kislev:{leap:3,regular:3,monthCode:"M03",days:{min:29,max:30}},Tevet:{leap:4,regular:4,monthCode:"M04",days:29},Shevat:{leap:5,regular:5,monthCode:"M05",days:30},Adar:{leap:void 0,regular:6,monthCode:"M06",days:29},"Adar I":{leap:6,regular:void 0,monthCode:"M05L",days:30},"Adar II":{leap:7,regular:void 0,monthCode:"M06",days:29},Nisan:{leap:8,regular:7,monthCode:"M07",days:30},Iyar:{leap:9,regular:8,monthCode:"M08",days:29},Sivan:{leap:10,regular:9,monthCode:"M09",days:30},Tamuz:{leap:11,regular:10,monthCode:"M10",days:29},Av:{leap:12,regular:11,monthCode:"M11",days:30},Elul:{leap:13,regular:12,monthCode:"M12",days:29}}}inLeapYear(t){const{year:n}=t;return(7*n+1)%19<7}monthsInYear(t){return this.inLeapYear(t)?13:12}minimumMonthLength(t){return this.minMaxMonthLength(t,"min")}maximumMonthLength(t){return this.minMaxMonthLength(t,"max")}minMaxMonthLength(t,n){const{month:i,year:r}=t,s=this.getMonthCode(r,i),o=Object.entries(this.months).find((c=>c[1].monthCode===s));if(o===void 0)throw new RangeError(`unmatched Hebrew month: ${i}`);const a=o[1].days;return typeof a=="number"?a:a[n]}maxLengthOfMonthCodeInAnyYear(t){return["M04","M06","M08","M10","M12"].includes(t)?29:30}estimateIsoDate(t){const{year:n}=t;return{year:n-3760,month:1,day:1}}getMonthCode(t,n){return this.inLeapYear({year:t})?n===6?Zi(5,!0):Zi(n<6?n:n-1):Zi(n)}adjustCalendarDate(t,n,i="constrain",r=!1){let{year:s,month:o,monthCode:a,day:c,monthExtra:l}=t;if(s===void 0)throw new TypeError("Missing property: year");if(r){if(l){const u=this.months[l];if(!u)throw new RangeError(`Unrecognized month from formatToParts: ${l}`);o=this.inLeapYear({year:s})?u.leap:u.regular}return a=this.getMonthCode(s,o),{year:s,month:o,day:c,monthCode:a}}if(this.validateCalendarDate(t),o===void 0)if(a.endsWith("L")){if(a!=="M05L")throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${a}`);if(o=6,!this.inLeapYear({year:s})){if(i==="reject")throw new RangeError(`Hebrew monthCode M05L is invalid in year ${s} which is not a leap year`);o=6,a="M06"}}else{o=Bo(a),this.inLeapYear({year:s})&&o>=6&&o++;const u=this.monthsInYear({year:s});if(o<1||o>u)throw new RangeError(`Invalid monthCode: ${a}`)}else if(i==="reject"?(Te(o,1,this.monthsInYear({year:s})),Te(c,1,this.maximumMonthLength({year:s,month:o}))):(o=mn(o,1,this.monthsInYear({year:s})),c=mn(c,1,this.maximumMonthLength({year:s,month:o}))),a===void 0)a=this.getMonthCode(s,o);else if(this.getMonthCode(s,o)!==a)throw new RangeError(`monthCode ${a} doesn't correspond to month ${o} in Hebrew year ${s}`);return{...t,day:c,month:o,monthCode:a,year:s}}}class Ec extends na{constructor(){super(...arguments),this.calendarType="lunar",this.DAYS_PER_ISLAMIC_YEAR=354+11/30,this.DAYS_PER_ISO_YEAR=365.2425}inLeapYear(t,n){const i={year:t.year,month:1,monthCode:"M01",day:1},r={year:t.year+1,month:1,monthCode:"M01",day:1};return this.calendarDaysUntil(i,r,n)===355}monthsInYear(){return 12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(){return 30}estimateIsoDate(t){const{year:n}=this.adjustCalendarDate(t);return{year:Math.floor(n*this.DAYS_PER_ISLAMIC_YEAR/this.DAYS_PER_ISO_YEAR)+622,month:1,day:1}}}class IL extends Ec{constructor(){super(...arguments),this.id="islamic"}}class PL extends Ec{constructor(){super(...arguments),this.id="islamic-umalqura"}}class RL extends Ec{constructor(){super(...arguments),this.id="islamic-tbla"}}class AL extends Ec{constructor(){super(...arguments),this.id="islamic-civil"}}class LL extends Ec{constructor(){super(...arguments),this.id="islamic-rgsa"}}class NL extends Ec{constructor(){super(...arguments),this.id="islamicc"}}class FL extends na{constructor(){super(...arguments),this.id="persian",this.calendarType="solar"}inLeapYear(t,n){return this.daysInMonth({year:t.year,month:12,day:1},n)===30}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===12?29:n<=6?31:30}maximumMonthLength(t){const{month:n}=t;return n===12?30:n<=6?31:30}maxLengthOfMonthCodeInAnyYear(t){return Bo(t)<=6?31:30}estimateIsoDate(t){const{year:n}=this.adjustCalendarDate(t);return{year:n+621,month:1,day:1}}}class zL extends na{constructor(){super(...arguments),this.id="indian",this.calendarType="solar",this.months={1:{length:30,month:3,day:22,leap:{length:31,month:3,day:21}},2:{length:31,month:4,day:21},3:{length:31,month:5,day:22},4:{length:31,month:6,day:22},5:{length:31,month:7,day:23},6:{length:31,month:8,day:23},7:{length:30,month:9,day:23},8:{length:30,month:10,day:23},9:{length:30,month:11,day:22},10:{length:30,month:12,day:22},11:{length:30,month:1,nextYear:!0,day:21},12:{length:30,month:2,nextYear:!0,day:20}},this.vulnerableToBceBug=new Date("0000-01-01T00:00Z").toLocaleDateString("en-US-u-ca-indian",{timeZone:"UTC"})!=="10/11/-79 Saka"}inLeapYear(t){return Qv(t.year+78)}monthsInYear(){return 12}minimumMonthLength(t){return this.getMonthInfo(t).length}maximumMonthLength(t){return this.getMonthInfo(t).length}maxLengthOfMonthCodeInAnyYear(t){const n=Bo(t);let i=this.months[n];return i=i.leap??i,i.length}getMonthInfo(t){const{month:n}=t;let i=this.months[n];if(i===void 0)throw new RangeError(`Invalid month: ${n}`);return this.inLeapYear(t)&&i.leap&&(i=i.leap),i}estimateIsoDate(t){const n=this.adjustCalendarDate(t),i=this.getMonthInfo(n);return jn(n.year+78+(i.nextYear?1:0),i.month,i.day+n.day-1)}checkIcuBugs(t){if(this.vulnerableToBceBug&&t.year<1)throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`)}}function Qv(e){return e%4==0&&(e%100!=0||e%400==0)}class WC extends na{constructor(t,n){super(),this.calendarType="solar",this.id=t,this.isoEpoch=n}inLeapYear(t){const{year:n}=this.estimateIsoDate({month:1,day:1,year:t.year});return Qv(n)}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===2?this.inLeapYear(t)?29:28:[4,6,9,11].indexOf(n)>=0?30:31}maximumMonthLength(t){return this.minimumMonthLength(t)}maxLengthOfMonthCodeInAnyYear(t){return[31,29,31,30,31,30,31,31,30,31,30,31][Bo(t)-1]}estimateIsoDate(t){const n=this.adjustCalendarDate(t);return Ll(n.year+this.isoEpoch.year,n.month+this.isoEpoch.month,n.day+this.isoEpoch.day,"constrain")}}class HC extends na{constructor(t,n){super(),this.hasEra=!0,this.calendarType="solar",this.id=t;const{eras:i,anchorEra:r}=(function(s){let o,a=s;if(a.length===0)throw new RangeError("Invalid era data: eras are required");if(a.length===1&&a[0].reverseOf)throw new RangeError("Invalid era data: anchor era cannot count years backwards");if(a.length===1&&!a[0].code)throw new RangeError("Invalid era data: at least one named era is required");if(a.filter((l=>l.reverseOf!=null)).length>1)throw new RangeError("Invalid era data: only one era can count years backwards");a.forEach((l=>{if(l.isAnchor||!l.anchorEpoch&&!l.reverseOf){if(o)throw new RangeError("Invalid era data: cannot have multiple anchor eras");o=l,l.anchorEpoch={year:l.hasYearZero?0:1}}else if(!l.code)throw new RangeError("If era name is blank, it must be the anchor era")})),a=a.filter((l=>l.code)),a.forEach((l=>{const{reverseOf:u}=l;if(u){const h=a.find((d=>d.code===u));if(h===void 0)throw new RangeError(`Invalid era data: unmatched reverseOf era: ${u}`);l.reverseOf=h,l.anchorEpoch=h.anchorEpoch,l.isoEpoch=h.isoEpoch}l.anchorEpoch.month===void 0&&(l.anchorEpoch.month=1),l.anchorEpoch.day===void 0&&(l.anchorEpoch.day=1)})),a.sort(((l,u)=>{if(l.reverseOf)return 1;if(u.reverseOf)return-1;if(!l.isoEpoch||!u.isoEpoch)throw new RangeError("Invalid era data: missing ISO epoch");return u.isoEpoch.year-l.isoEpoch.year}));const c=a[a.length-1].reverseOf;if(c&&c!==a[a.length-2])throw new RangeError("Invalid era data: invalid reverse-sign era");return a.forEach(((l,u)=>{l.genericName="era"+(a.length-1-u)})),{eras:a,anchorEra:o||a[0]}})(n);this.anchorEra=r,this.eras=i}inLeapYear(t){const{year:n}=this.estimateIsoDate({month:1,day:1,year:t.year});return Qv(n)}monthsInYear(){return 12}minimumMonthLength(t){const{month:n}=t;return n===2?this.inLeapYear(t)?29:28:[4,6,9,11].indexOf(n)>=0?30:31}maximumMonthLength(t){return this.minimumMonthLength(t)}maxLengthOfMonthCodeInAnyYear(t){return[31,29,31,30,31,30,31,31,30,31,30,31][Bo(t)-1]}completeEraYear(t){const n=(a,c,l)=>{const u=t[a];if(u!=null&&u!=c&&!(l||[]).includes(u)){const h=l?.[0];throw new RangeError(`Input ${a} ${u} doesn't match calculated value ${h?`${c} (also called ${h})`:c}`)}},i=a=>{let c;const l={...t,year:a},u=this.eras.find(((h,d)=>{if(d===this.eras.length-1){if(h.reverseOf){if(a>0)throw new RangeError(`Signed year ${a} is invalid for era ${h.code}`);return c=h.anchorEpoch.year-a,!0}return c=a-h.anchorEpoch.year+(h.hasYearZero?0:1),!0}return this.compareCalendarDates(l,h.anchorEpoch)>=0&&(c=a-h.anchorEpoch.year+(h.hasYearZero?0:1),!0)}));if(!u)throw new RangeError(`Year ${a} was not matched by any era`);return{eraYear:c,era:u.code,eraNames:u.names}};let{year:r,eraYear:s,era:o}=t;if(r!=null){const a=i(r);({eraYear:s,era:o}=a),n("era",o,a?.eraNames),n("eraYear",s)}else{if(s==null)throw new RangeError("Either year or eraYear and era are required");{if(o===void 0)throw new RangeError("era and eraYear must be provided together");const a=this.eras.find((({code:c,names:l=[]})=>c===o||l.includes(o)));if(!a)throw new RangeError(`Era ${o} (ISO year ${s}) was not matched by any era`);r=a.reverseOf?a.anchorEpoch.year-s:s+a.anchorEpoch.year-(a.hasYearZero?0:1),n("year",r),{eraYear:s,era:o}=i(r)}}return{...t,year:r,eraYear:s,era:o}}adjustCalendarDate(t,n,i="constrain"){let r=t;const{month:s,monthCode:o}=r;return s===void 0&&(r={...r,month:Bo(o)}),this.validateCalendarDate(r),r=this.completeEraYear(r),super.adjustCalendarDate(r,n,i)}estimateIsoDate(t){const n=this.adjustCalendarDate(t),{year:i,month:r,day:s}=n,{anchorEra:o}=this;return Ll(i+o.isoEpoch.year-(o.hasYearZero?0:1),r,s,"constrain")}}class Zv extends HC{constructor(t,n){super(t,n)}isoToCalendarDate(t){const{year:n,month:i,day:r}=t,s=Zi(i),o=n-this.anchorEra.isoEpoch.year+1;return this.completeEraYear({year:o,month:i,monthCode:s,day:r})}}const qi={inLeapYear(e){const{year:t}=e;return(t+1)%4==0},monthsInYear:()=>13,minimumMonthLength(e){const{month:t}=e;return t===13?this.inLeapYear(e)?6:5:30},maximumMonthLength(e){return this.minimumMonthLength(e)},maxLengthOfMonthCodeInAnyYear:e=>e==="M13"?6:30};class jL extends WC{constructor(t,n){super(t,n),this.inLeapYear=qi.inLeapYear,this.monthsInYear=qi.monthsInYear,this.minimumMonthLength=qi.minimumMonthLength,this.maximumMonthLength=qi.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=qi.maxLengthOfMonthCodeInAnyYear}}class UC extends HC{constructor(t,n){super(t,n),this.inLeapYear=qi.inLeapYear,this.monthsInYear=qi.monthsInYear,this.minimumMonthLength=qi.minimumMonthLength,this.maximumMonthLength=qi.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=qi.maxLengthOfMonthCodeInAnyYear}}class BL extends jL{constructor(){super("ethioaa",{year:-5492,month:7,day:17})}}class WL extends UC{constructor(){super("coptic",[{code:"coptic",isoEpoch:{year:284,month:8,day:29}},{code:"coptic-inverse",reverseOf:"coptic"}])}}class HL extends UC{constructor(){super("ethiopic",[{code:"ethioaa",names:["ethiopic-amete-alem","mundi"],isoEpoch:{year:-5492,month:7,day:17}},{code:"ethiopic",names:["incar"],isoEpoch:{year:8,month:8,day:27},anchorEpoch:{year:5501}}])}}class UL extends Zv{constructor(){super("roc",[{code:"roc",names:["minguo"],isoEpoch:{year:1912,month:1,day:1}},{code:"roc-inverse",names:["before-roc"],reverseOf:"roc"}])}}class YL extends WC{constructor(){super("buddhist",{year:-543,month:1,day:1})}}class qL extends Zv{constructor(){super("gregory",[{code:"gregory",names:["ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"gregory-inverse",names:["be","bce"],reverseOf:"gregory"}])}reviseIntlEra(t){let{era:n,eraYear:i}=t;return n==="b"&&(n="gregory-inverse"),n==="a"&&(n="gregory"),{era:n,eraYear:i}}getFirstDayOfWeek(){return 1}getMinimalDaysInFirstWeek(){return 1}}class VL extends Zv{constructor(){super("japanese",[{code:"reiwa",isoEpoch:{year:2019,month:5,day:1},anchorEpoch:{year:2019,month:5,day:1}},{code:"heisei",isoEpoch:{year:1989,month:1,day:8},anchorEpoch:{year:1989,month:1,day:8}},{code:"showa",isoEpoch:{year:1926,month:12,day:25},anchorEpoch:{year:1926,month:12,day:25}},{code:"taisho",isoEpoch:{year:1912,month:7,day:30},anchorEpoch:{year:1912,month:7,day:30}},{code:"meiji",isoEpoch:{year:1868,month:9,day:8},anchorEpoch:{year:1868,month:9,day:8}},{code:"japanese",names:["japanese","gregory","ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"japanese-inverse",names:["japanese-inverse","gregory-inverse","bc","bce"],reverseOf:"japanese"}]),this.erasBeginMidYear=!0}reviseIntlEra(t,n){const{era:i,eraYear:r}=t,{year:s}=n;return this.eras.find((o=>o.code===i))?{era:i,eraYear:r}:s<1?{era:"japanese-inverse",eraYear:1-s}:{era:"japanese",eraYear:s}}}class YC extends na{constructor(){super(...arguments),this.calendarType="lunisolar"}inLeapYear(t,n){const i=this.getMonthList(t.year,n);return Object.entries(i).length===13}monthsInYear(t,n){return this.inLeapYear(t,n)?13:12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(t){return["M01L","M09L","M10L","M11L","M12L"].includes(t)?29:30}monthDaySearchStartYear(t,n){const i={M01L:[1651,1651],M02L:[1947,1765],M03L:[1966,1955],M04L:[1963,1944],M05L:[1971,1952],M06L:[1960,1941],M07L:[1968,1938],M08L:[1957,1718],M09L:[1832,1832],M10L:[1870,1870],M11L:[1814,1814],M12L:[1890,1890]}[t]??[1972,1972];return n<30?i[0]:i[1]}getMonthList(t,n){if(t===void 0)throw new TypeError("Missing year");const i=JSON.stringify({func:"getMonthList",calendarYear:t,id:this.id}),r=n.get(i);if(r)return r;const s=this.getFormatter(),o=(m,b)=>{const _=BC({isoYear:m,isoMonth:2,isoDay:1}),C=new Date(_);C.setUTCDate(b+1);const S=s.formatToParts(C),k=S.find((x=>x.type==="month")).value,$=+S.find((x=>x.type==="day")).value,D=S.find((x=>x.type==="relatedYear"));let w;if(D===void 0)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);return w=+D.value,{calendarMonthString:k,calendarDay:$,calendarYearToVerify:w}};let a=17,{calendarMonthString:c,calendarDay:l,calendarYearToVerify:u}=o(t,a);c!=="1"&&(a+=29,{calendarMonthString:c,calendarDay:l}=o(t,a)),a-=l-5;const h={};let d,f,p=1,g=!1;do({calendarMonthString:c,calendarDay:l,calendarYearToVerify:u}=o(t,a)),d&&(h[f].daysInMonth=d+30-l),u!==t?g=!0:(h[c]={monthIndex:p++},a+=30),d=l,f=c;while(!g);return h[f].daysInMonth=d+30-l,n.set(i,h),h}estimateIsoDate(t){const{year:n,month:i}=t;return{year:n,month:i>=12?12:i+1,day:1}}adjustCalendarDate(t,n,i="constrain",r=!1){let{year:s,month:o,monthExtra:a,day:c,monthCode:l}=t;if(s===void 0)throw new TypeError("Missing property: year");if(r){if(a&&a!=="bis")throw new RangeError(`Unexpected leap month suffix: ${a}`);const u=Zi(o,a!==void 0),h=`${o}${a||""}`,d=this.getMonthList(s,n)[h];if(d===void 0)throw new RangeError(`Unmatched month ${h} in Chinese year ${s}`);return o=d.monthIndex,{year:s,month:o,day:c,monthCode:u}}if(this.validateCalendarDate(t),o===void 0){const u=this.getMonthList(s,n);let h=l.replace(/^M|L$/g,(f=>f==="L"?"bis":""));h[0]==="0"&&(h=h.slice(1));let d=u[h];if(o=d&&d.monthIndex,o===void 0&&l.endsWith("L")&&l!="M13L"&&i==="constrain"){const f=+l.replace(/^M0?|L$/g,"");d=u[f],d&&(o=d.monthIndex,l=Zi(f))}if(o===void 0)throw new RangeError(`Unmatched month ${l} in Chinese year ${s}`)}else if(l===void 0){const u=this.getMonthList(s,n),h=Object.entries(u),d=h.length;i==="reject"?(Te(o,1,d),Te(c,1,this.maximumMonthLength())):(o=mn(o,1,d),c=mn(c,1,this.maximumMonthLength()));const f=h.find((p=>p[1].monthIndex===o));if(f===void 0)throw new RangeError(`Invalid month ${o} in Chinese year ${s}`);l=Zi(+f[0].replace("bis",""),f[0].indexOf("bis")!==-1)}else{const u=this.getMonthList(s,n);let h=l.replace(/^M|L$/g,(f=>f==="L"?"bis":""));h[0]==="0"&&(h=h.slice(1));const d=u[h];if(!d)throw new RangeError(`Unmatched monthCode ${l} in Chinese year ${s}`);if(o!==d.monthIndex)throw new RangeError(`monthCode ${l} doesn't correspond to month ${o} in Chinese year ${s}`)}return{...t,year:s,month:o,monthCode:l,day:c}}}class KL extends YC{constructor(){super(...arguments),this.id="chinese"}}class GL extends YC{constructor(){super(...arguments),this.id="dangi"}}class XL{constructor(t){this.helper=t}extraFields(t){return this.helper.hasEra&&t.includes("year")?["era","eraYear"]:[]}resolveFields(t){if(this.helper.calendarType!=="lunisolar"){const n=new $e;Xv(t,void 0,this.helper.monthsInYear({year:t.year??1972},n))}}dateToISO(t,n){const i=new $e,r=this.helper.calendarToIsoDate(t,n,i);return i.setObject(r),r}monthDayToISOReferenceDate(t,n){const i=new $e,r=this.helper.monthDayFromFields(t,n,i);return i.setObject(r),r}fieldKeysToIgnore(t){const n=new Set;for(let i=0;i<t.length;i++){const r=t[i];switch(n.add(r),r){case"era":n.add("eraYear"),n.add("year");break;case"eraYear":n.add("era"),n.add("year");break;case"year":n.add("era"),n.add("eraYear");break;case"month":n.add("monthCode"),this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"));break;case"monthCode":n.add("month"),this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"));break;case"day":this.helper.erasBeginMidYear&&(n.add("era"),n.add("eraYear"))}}return zC(n)}dateAdd(t,{years:n,months:i,weeks:r,days:s},o){const a=$e.getCacheForObject(t),c=this.helper.isoToCalendarDate(t,a),l=this.helper.addCalendar(c,{years:n,months:i,weeks:r,days:s},o,a),u=this.helper.calendarToIsoDate(l,"constrain",a);return $e.getCacheForObject(u)||new $e(a).setObject(u),u}dateUntil(t,n,i){const r=$e.getCacheForObject(t),s=$e.getCacheForObject(n),o=this.helper.isoToCalendarDate(t,r),a=this.helper.isoToCalendarDate(n,s);return this.helper.untilCalendar(o,a,i,r)}isoToDate(t,n){const i=$e.getCacheForObject(t),r=this.helper.isoToCalendarDate(t,i);if(n.dayOfWeek&&(r.dayOfWeek=Ju.iso8601.isoToDate(t,{dayOfWeek:!0}).dayOfWeek),n.dayOfYear){const s=this.helper.startOfCalendarYear(r),o=this.helper.calendarDaysUntil(s,r,i);r.dayOfYear=o+1}if(n.weekOfYear&&(r.weekOfYear=jC(this.helper.id,t)),r.daysInWeek=7,n.daysInMonth&&(r.daysInMonth=this.helper.daysInMonth(r,i)),n.daysInYear){const s=this.helper.startOfCalendarYear(r),o=this.helper.addCalendar(s,{years:1},"constrain",i);r.daysInYear=this.helper.calendarDaysUntil(s,o,i)}return n.monthsInYear&&(r.monthsInYear=this.helper.monthsInYear(r,i)),n.inLeapYear&&(r.inLeapYear=this.helper.inLeapYear(r,i)),r}getFirstDayOfWeek(){return this.helper.getFirstDayOfWeek()}getMinimalDaysInFirstWeek(){return this.helper.getMinimalDaysInFirstWeek()}}for(const e of[OL,FL,HL,BL,WL,KL,GL,UL,zL,YL,qL,VL,IL,PL,RL,AL,LL,NL]){const t=new e;Ju[t.id]=new XL(t)}rm("calendarImpl",(function(e){return Ju[e]}));const yu=Intl.DateTimeFormat;function la(e,t){let n=y(e,t);return typeof n=="function"&&(n=new yu(y(e,nC),n(y(e,tm))),(function(i,r,s){const o=Rf(i);if(o===void 0)throw new TypeError("Missing slots for the given container");if(o[r]===void 0)throw new TypeError(`tried to reset ${r} which was not set`);o[r]=s})(e,t,n)),n}function Bc(e){return xn(e,ta)}class bu{constructor(t=void 0,n=void 0){(function(i,r,s){const o=s!==void 0;let a;if(o){const h=["localeMatcher","calendar","numberingSystem","hour12","hourCycle","timeZone","weekday","era","year","month","day","dayPeriod","hour","minute","second","fractionalSecondDigits","timeZoneName","formatMatcher","dateStyle","timeStyle"];a=(function(f){if(f==null)throw new TypeError(`Expected object not ${f}`);return Object(f)})(s);const d=Object.create(null);for(let f=0;f<h.length;f++){const p=h[f];Object.prototype.hasOwnProperty.call(a,p)&&(d[p]=a[p])}a=d}else a=Object.create(null);const c=new yu(r,a),l=c.resolvedOptions();if(Jr(i),o){const h=Object.assign(Object.create(null),l);for(const d in h)Object.prototype.hasOwnProperty.call(a,d)||delete h[d];h.hour12=a.hour12,h.hourCycle=a.hourCycle,ht(i,tm,h)}else ht(i,tm,a);ht(i,nC,l.locale),ht(i,ta,c),ht(i,ba,l.timeZone),ht(i,il,l.calendar),ht(i,X2,s5),ht(i,Q2,i5),ht(i,Z2,r5),ht(i,J2,n5),ht(i,tC,o5),ht(i,eC,a5);const u=o?a.timeZone:void 0;if(u===void 0)ht(i,Jg,l.timeZone);else{const h=Ff(u);if(h.startsWith("−"))throw new RangeError("Unicode minus (U+2212) is not supported in time zone offsets");ht(i,Jg,yn(h))}})(this,t,n)}get format(){I(this,Bc);const t=ZL.bind(this);return Object.defineProperties(t,{length:{value:1,enumerable:!1,writable:!1,configurable:!0},name:{value:"",enumerable:!1,writable:!1,configurable:!0}}),t}formatRange(t,n){return I(this,Bc),t5.call(this,t,n)}formatToParts(t,...n){return I(this,Bc),JL.call(this,t,...n)}formatRangeToParts(t,n){return I(this,Bc),e5.call(this,t,n)}resolvedOptions(){return I(this,Bc),QL.call(this)}}"formatToParts"in yu.prototype||delete bu.prototype.formatToParts,"formatRangeToParts"in yu.prototype||delete bu.prototype.formatRangeToParts;const gi=function(e=void 0,t=void 0){return new bu(e,t)};function QL(){const e=y(this,ta).resolvedOptions();return e.timeZone=y(this,Jg),e}function ZL(e,...t){let n,i,r=sc(e,this);return r.formatter?(n=r.formatter,i=[xi(r.epochNs,"floor")]):(n=y(this,ta),i=[e,...t]),n.format(...i)}function JL(e,...t){let n,i,r=sc(e,this);return r.formatter?(n=r.formatter,i=[xi(r.epochNs,"floor")]):(n=y(this,ta),i=[e,...t]),n.formatToParts(...i)}function t5(e,t){if(e===void 0||t===void 0)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=Xd(e),i=Xd(t);let r,s=[n,i];if(Fr(n)!==Fr(i))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");if(Fr(n)){if(!qC(n,i))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");const{epochNs:o,formatter:a}=sc(n,this),{epochNs:c,formatter:l}=sc(i,this);a&&(r=a,s=[xi(o,"floor"),xi(c,"floor")])}return r||(r=y(this,ta)),r.formatRange(...s)}function e5(e,t){if(e===void 0||t===void 0)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=Xd(e),i=Xd(t);let r,s=[n,i];if(Fr(n)!==Fr(i))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");if(Fr(n)){if(!qC(n,i))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");const{epochNs:o,formatter:a}=sc(n,this),{epochNs:c,formatter:l}=sc(i,this);a&&(r=a,s=[xi(o,"floor"),xi(c,"floor")])}return r||(r=y(this,ta)),r.formatRangeToParts(...s)}function th(e={},t={}){const n=Object.assign({},e),i=["year","month","day","hour","minute","second","weekday","dayPeriod","timeZoneName","dateStyle","timeStyle"];for(let r=0;r<i.length;r++){const s=i[r];n[s]=s in t?t[s]:n[s],n[s]!==!1&&n[s]!==void 0||delete n[s]}return n}function n5(e){const t=th(e,{year:!1,month:!1,day:!1,weekday:!1,timeZoneName:!1,dateStyle:!1});if(t.timeStyle!=="long"&&t.timeStyle!=="full"||(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"})),!Vf(t)){if(eh(e))throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(e)}]`);Object.assign(t,{hour:"numeric",minute:"numeric",second:"numeric"})}return t}function i5(e){const t={short:{year:"2-digit",month:"numeric"},medium:{year:"numeric",month:"short"},long:{year:"numeric",month:"long"},full:{year:"numeric",month:"long"}},n=th(e,{day:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const i=n.dateStyle;delete n.dateStyle,Object.assign(n,t[i])}if(!("year"in n||"month"in n||"era"in n)){if(eh(e))throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(e)}]`);Object.assign(n,{year:"numeric",month:"numeric"})}return n}function r5(e){const t={short:{month:"numeric",day:"numeric"},medium:{month:"short",day:"numeric"},long:{month:"long",day:"numeric"},full:{month:"long",day:"numeric"}},n=th(e,{year:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const i=n.dateStyle;delete n.dateStyle,Object.assign(n,t[i])}if(!("month"in n)&&!("day"in n)){if(eh(e))throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(e)}]`);Object.assign(n,{month:"numeric",day:"numeric"})}return n}function s5(e){const t=th(e,{hour:!1,minute:!1,second:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if(!qf(t)){if(eh(e))throw new TypeError(`cannot format PlainDate with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric"})}return t}function o5(e){const t=th(e,{timeZoneName:!1});if((t.timeStyle==="long"||t.timeStyle==="full")&&(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"}),t.dateStyle)&&(Object.assign(t,{short:{year:"numeric",month:"numeric",day:"numeric"},medium:{year:"numeric",month:"short",day:"numeric"},long:{year:"numeric",month:"long",day:"numeric"},full:{year:"numeric",month:"long",day:"numeric",weekday:"long"}}[t.dateStyle]),delete t.dateStyle),!Vf(t)&&!qf(t)){if(eh(e))throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}return t}function a5(e){let t=e;return Vf(t)||qf(t)||(t=Object.assign({},t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),t}function qf(e){return"year"in e||"month"in e||"day"in e||"weekday"in e||"dateStyle"in e||"era"in e}function Vf(e){return"hour"in e||"minute"in e||"second"in e||"timeStyle"in e||"dayPeriod"in e||"fractionalSecondDigits"in e}function eh(e){return qf(e)||Vf(e)||"dateStyle"in e||"timeStyle"in e||"timeZoneName"in e}function Fr(e){return ne(e)||ce(e)||jt(e)||dt(e)||Le(e)||Kn(e)||Ae(e)}function Xd(e){return Fr(e)?e:Nf(e)}function qC(e,t){return!(!Fr(e)||!Fr(t)||ce(e)&&!ce(t)||ne(e)&&!ne(t)||jt(e)&&!jt(t)||dt(e)&&!dt(t)||Le(e)&&!Le(t)||Kn(e)&&!Kn(t)||Ae(e)&&!Ae(t))}function sc(e,t){if(ce(e)){const n={isoDate:{year:1970,month:1,day:1},time:y(e,ie)};return{epochNs:Ze(y(t,ba),n,"compatible"),formatter:la(t,J2)}}if(Le(e)){const n=y(e,A),i=y(t,il);if(n!==i)throw new RangeError(`cannot format PlainYearMonth with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,ba),r,"compatible"),formatter:la(t,Q2)}}if(Kn(e)){const n=y(e,A),i=y(t,il);if(n!==i)throw new RangeError(`cannot format PlainMonthDay with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,ba),r,"compatible"),formatter:la(t,Z2)}}if(ne(e)){const n=y(e,A),i=y(t,il);if(n!=="iso8601"&&n!==i)throw new RangeError(`cannot format PlainDate with calendar ${n} in locale with calendar ${i}`);const r=Mt(y(e,rt),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:Ze(y(t,ba),r,"compatible"),formatter:la(t,X2)}}if(jt(e)){const n=y(e,A),i=y(t,il);if(n!=="iso8601"&&n!==i)throw new RangeError(`cannot format PlainDateTime with calendar ${n} in locale with calendar ${i}`);const r=y(e,Ut);return{epochNs:Ze(y(t,ba),r,"compatible"),formatter:la(t,tC)}}if(dt(e))throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");return Ae(e)?{epochNs:y(e,it),formatter:la(t,eC)}:{}}function VC(e){const t=Object.create(null);return t.years=y(e,cn),t.months=y(e,ln),t.weeks=y(e,In),t.days=y(e,un),t.hours=y(e,hn),t.minutes=y(e,dn),t.seconds=y(e,fn),t.milliseconds=y(e,pn),t.microseconds=y(e,gn),t.nanoseconds=y(e,Pn),t}bu.prototype.constructor=gi,Object.defineProperty(gi,"prototype",{value:bu.prototype,writable:!1,enumerable:!1,configurable:!1}),gi.supportedLocalesOf=yu.supportedLocalesOf,ts(gi,"Intl.DateTimeFormat");const{format:c5,formatToParts:l5}=Intl.DurationFormat?.prototype??Object.create(null);function KC(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=VC(mi(e));return c5.call(this,t)}Intl.DurationFormat?.prototype&&(Intl.DurationFormat.prototype.format=KC,Intl.DurationFormat.prototype.formatToParts=function(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=VC(mi(e));return l5.call(this,t)});class Jv{constructor(t){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");wC(this,Gd(t))}get epochMilliseconds(){return I(this,Ae),xi(y(this,it),"floor")}get epochNanoseconds(){return I(this,Ae),NC(v.BigInt(y(this,it)))}add(t){return I(this,Ae),Fb("add",this,t)}subtract(t){return I(this,Ae),Fb("subtract",this,t)}until(t,n=void 0){return I(this,Ae),Ob("until",this,t,n)}since(t,n=void 0){return I(this,Ae),Ob("since",this,t,n)}round(t){if(I(this,Ae),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?jo("smallestUnit",t):K(t),i=xc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr);return Cc(i,{hour:24,minute:1440,second:86400,millisecond:864e5,microsecond:864e8,nanosecond:864e11}[s],!0),Ki(pm(y(this,it),i,s,r))}equals(t){I(this,Ae);const n=ol(t),i=y(this,it),r=y(n,it);return v.equal(v.BigInt(i),v.BigInt(r))}toString(t=void 0){I(this,Ae);const n=K(t),i=Yu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');let o=n.timeZone;o!==void 0&&(o=yn(o));const{precision:a,unit:c,increment:l}=qu(s,i);return xb(Ki(pm(y(this,it),l,c,r)),o,a)}toJSON(){return I(this,Ae),xb(this,void 0,"auto")}toLocaleString(t=void 0,n=void 0){return I(this,Ae),new gi(t,n).format(this)}valueOf(){Us("Instant")}toZonedDateTimeISO(t){I(this,Ae);const n=yn(t);return Ge(y(this,it),n,"iso8601")}static fromEpochMilliseconds(t){return Ki(Xi(Nf(t)))}static fromEpochNanoseconds(t){return Ki(Gd(t))}static from(t){return ol(t)}static compare(t,n){const i=ol(t),r=ol(n),s=y(i,it),o=y(r,it);return v.lessThan(s,o)?-1:v.greaterThan(s,o)?1:0}}ts(Jv,"Temporal.Instant");class t0{constructor(t,n,i,r="iso8601"){const s=st(t),o=st(n),a=st(i),c=Cn(r===void 0?"iso8601":Se(r));No(s,o,a),mC(this,{year:s,month:o,day:a},c)}get calendarId(){return I(this,ne),y(this,A)}get era(){return rn(this,"era")}get eraYear(){return rn(this,"eraYear")}get year(){return rn(this,"year")}get month(){return rn(this,"month")}get monthCode(){return rn(this,"monthCode")}get day(){return rn(this,"day")}get dayOfWeek(){return rn(this,"dayOfWeek")}get dayOfYear(){return rn(this,"dayOfYear")}get weekOfYear(){return rn(this,"weekOfYear")?.week}get yearOfWeek(){return rn(this,"weekOfYear")?.year}get daysInWeek(){return rn(this,"daysInWeek")}get daysInMonth(){return rn(this,"daysInMonth")}get daysInYear(){return rn(this,"daysInYear")}get monthsInYear(){return rn(this,"monthsInYear")}get inLeapYear(){return rn(this,"inLeapYear")}with(t,n=void 0){if(I(this,ne),!re(t))throw new TypeError("invalid argument");wc(t);const i=y(this,A);let r=_n(i,y(this,rt));return r=Lo(i,r,ni(i,t,["year","month","monthCode","day"],[],"partial")),vn(As(i,r,St(K(n))),i)}withCalendar(t){I(this,ne);const n=Xu(t);return vn(y(this,rt),n)}add(t,n=void 0){return I(this,ne),zb("add",this,t,n)}subtract(t,n=void 0){return I(this,ne),zb("subtract",this,t,n)}until(t,n=void 0){return I(this,ne),Ib("until",this,t,n)}since(t,n=void 0){return I(this,ne),Ib("since",this,t,n)}equals(t){I(this,ne);const n=rl(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return I(this,ne),Cb(this,Uu(K(t)))}toJSON(){return I(this,ne),Cb(this)}toLocaleString(t=void 0,n=void 0){return I(this,ne),new gi(t,n).format(this)}valueOf(){Us("PlainDate")}toPlainDateTime(t=void 0){I(this,ne);const n=gC(t);return fi(Mt(y(this,rt),n),y(this,A))}toZonedDateTime(t){let n,i;if(I(this,ne),re(t)){const o=t.timeZone;o===void 0?n=yn(t):(n=yn(o),i=t.plainTime)}else n=yn(t);const r=y(this,rt);let s;return i===void 0?s=as(n,r):(i=ms(i),s=Ze(n,Mt(r,y(i,ie)),"compatible")),Ge(s,n,y(this,A))}toPlainYearMonth(){I(this,ne);const t=y(this,A);return La(fu(t,_n(t,y(this,rt)),"constrain"),t)}toPlainMonthDay(){I(this,ne);const t=y(this,A);return Da(Ud(t,_n(t,y(this,rt)),"constrain"),t)}static from(t,n=void 0){return rl(t,n)}static compare(t,n){const i=rl(t),r=rl(n);return or(y(i,rt),y(r,rt))}}function rn(e,t){I(e,ne);const n=y(e,rt);return Vu(e).isoToDate(n,{[t]:!0})[t]}ts(t0,"Temporal.PlainDate");class e0{constructor(t,n,i,r=0,s=0,o=0,a=0,c=0,l=0,u="iso8601"){const h=st(t),d=st(n),f=st(i),p=r===void 0?0:st(r),g=s===void 0?0:st(s),m=o===void 0?0:st(o),b=a===void 0?0:st(a),_=c===void 0?0:st(c),C=l===void 0?0:st(l),S=Cn(u===void 0?"iso8601":Se(u));qv(h,d,f,p,g,m,b,_,C),vC(this,{isoDate:{year:h,month:d,day:f},time:{hour:p,minute:g,second:m,millisecond:b,microsecond:_,nanosecond:C}},S)}get calendarId(){return I(this,jt),y(this,A)}get year(){return sn(this,"year")}get month(){return sn(this,"month")}get monthCode(){return sn(this,"monthCode")}get day(){return sn(this,"day")}get hour(){return ua(this,"hour")}get minute(){return ua(this,"minute")}get second(){return ua(this,"second")}get millisecond(){return ua(this,"millisecond")}get microsecond(){return ua(this,"microsecond")}get nanosecond(){return ua(this,"nanosecond")}get era(){return sn(this,"era")}get eraYear(){return sn(this,"eraYear")}get dayOfWeek(){return sn(this,"dayOfWeek")}get dayOfYear(){return sn(this,"dayOfYear")}get weekOfYear(){return sn(this,"weekOfYear")?.week}get yearOfWeek(){return sn(this,"weekOfYear")?.year}get daysInWeek(){return sn(this,"daysInWeek")}get daysInYear(){return sn(this,"daysInYear")}get daysInMonth(){return sn(this,"daysInMonth")}get monthsInYear(){return sn(this,"monthsInYear")}get inLeapYear(){return sn(this,"inLeapYear")}with(t,n=void 0){if(I(this,jt),!re(t))throw new TypeError("invalid argument");wc(t);const i=y(this,A),r=y(this,Ut);let s={..._n(i,r.isoDate),...r.time};return s=Lo(i,s,ni(i,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],"partial")),fi(Ku(i,s,St(K(n))),i)}withPlainTime(t=void 0){I(this,jt);const n=gC(t);return fi(Mt(y(this,Ut).isoDate,n),y(this,A))}withCalendar(t){I(this,jt);const n=Xu(t);return fi(y(this,Ut),n)}add(t,n=void 0){return I(this,jt),jb("add",this,t,n)}subtract(t,n=void 0){return I(this,jt),jb("subtract",this,t,n)}until(t,n=void 0){return I(this,jt),Pb("until",this,t,n)}since(t,n=void 0){return I(this,jt),Pb("since",this,t,n)}round(t){if(I(this,jt),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?jo("smallestUnit",t):K(t),i=xc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr,["day"]),o={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s];Cc(i,o,o===1);const a=y(this,Ut);return fi(i===1&&s==="nanosecond"?a:gm(a,i,s,r),y(this,A))}equals(t){I(this,jt);const n=sl(t);return rc(y(this,Ut),y(n,Ut))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){I(this,jt);const n=K(t),i=Uu(n),r=Yu(n),s=Pi(n,"trunc"),o=Nn(n,"smallestUnit","time",void 0);if(o==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:a,unit:c,increment:l}=qu(o,r),u=gm(y(this,Ut),l,c,s);return Fo(u),gu(u,y(this,A),a,i)}toJSON(){return I(this,jt),gu(y(this,Ut),y(this,A),"auto")}toLocaleString(t=void 0,n=void 0){return I(this,jt),new gi(t,n).format(this)}valueOf(){Us("PlainDateTime")}toZonedDateTime(t,n=void 0){I(this,jt);const i=yn(t),r=Nl(K(n));return Ge(Ze(i,y(this,Ut),r),i,y(this,A))}toPlainDate(){return I(this,jt),vn(y(this,Ut).isoDate,y(this,A))}toPlainTime(){return I(this,jt),Mr(y(this,Ut).time)}static from(t,n=void 0){return sl(t,n)}static compare(t,n){const i=sl(t),r=sl(n);return rc(y(i,Ut),y(r,Ut))}}function sn(e,t){I(e,jt);const n=y(e,Ut).isoDate;return Vu(e).isoToDate(n,{[t]:!0})[t]}function ua(e,t){return I(e,jt),y(e,Ut).time[t]}ts(e0,"Temporal.PlainDateTime");class oc{constructor(t=0,n=0,i=0,r=0,s=0,o=0,a=0,c=0,l=0,u=0){const h=t===void 0?0:Ei(t),d=n===void 0?0:Ei(n),f=i===void 0?0:Ei(i),p=r===void 0?0:Ei(r),g=s===void 0?0:Ei(s),m=o===void 0?0:Ei(o),b=a===void 0?0:Ei(a),_=c===void 0?0:Ei(c),C=l===void 0?0:Ei(l),S=u===void 0?0:Ei(u);Uf(h,d,f,p,g,m,b,_,C,S),Jr(this),ht(this,cn,h),ht(this,ln,d),ht(this,In,f),ht(this,un,p),ht(this,hn,g),ht(this,dn,m),ht(this,fn,b),ht(this,pn,_),ht(this,gn,C),ht(this,Pn,S)}get years(){return I(this,te),y(this,cn)}get months(){return I(this,te),y(this,ln)}get weeks(){return I(this,te),y(this,In)}get days(){return I(this,te),y(this,un)}get hours(){return I(this,te),y(this,hn)}get minutes(){return I(this,te),y(this,dn)}get seconds(){return I(this,te),y(this,fn)}get milliseconds(){return I(this,te),y(this,pn)}get microseconds(){return I(this,te),y(this,gn)}get nanoseconds(){return I(this,te),y(this,Pn)}get sign(){return I(this,te),Vd(this)}get blank(){return I(this,te),Vd(this)===0}with(t){I(this,te);const n=pC(t),{years:i=y(this,cn),months:r=y(this,ln),weeks:s=y(this,In),days:o=y(this,un),hours:a=y(this,hn),minutes:c=y(this,dn),seconds:l=y(this,fn),milliseconds:u=y(this,pn),microseconds:h=y(this,gn),nanoseconds:d=y(this,Pn)}=n;return new oc(i,r,s,o,a,c,l,u,h,d)}negated(){return I(this,te),Bn(this)}abs(){return I(this,te),new oc(Math.abs(y(this,cn)),Math.abs(y(this,ln)),Math.abs(y(this,In)),Math.abs(y(this,un)),Math.abs(y(this,hn)),Math.abs(y(this,dn)),Math.abs(y(this,fn)),Math.abs(y(this,pn)),Math.abs(y(this,gn)),Math.abs(y(this,Pn)))}add(t){return I(this,te),Nb("add",this,t)}subtract(t){return I(this,te),Nb("subtract",this,t)}round(t){if(I(this,te),t===void 0)throw new TypeError("options parameter is required");const n=Sr(this),i=typeof t=="string"?jo("smallestUnit",t):K(t);let r=Nn(i,"largestUnit","datetime",void 0,["auto"]),{plainRelativeTo:s,zonedRelativeTo:o}=Hp(i);const a=xc(i),c=Pi(i,"halfExpand");let l=Nn(i,"smallestUnit","datetime",void 0),u=!0;l||(u=!1,l="nanosecond");const h=Ar(n,l);let d=!0;if(r||(d=!1,r=h),r==="auto"&&(r=h),!u&&!d)throw new RangeError("at least one of smallestUnit or largestUnit is required");if(Ar(r,l)!==r)throw new RangeError(`largestUnit ${r} cannot be smaller than smallestUnit ${l}`);const f={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[l];if(f!==void 0&&Cc(a,f,!1),a>1&&Er(l)==="date"&&r!==l)throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");if(o){let g=_a(this);const m=y(o,Tt),b=y(o,A),_=y(o,it);return g=LC(_,ll(_,m,b,g),m,b,r,a,l,c),Er(r)==="date"&&(r="hour"),pi(g,r)}if(s){let g=Gi(this);const m=ic({hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},g.time),b=y(s,rt),_=y(s,A),C=Zn(_,b,Xe(g.date,m.deltaDays),"constrain");return g=AC(Mt(b,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Mt(C,m),_,r,a,l,c),pi(g,r)}if(Ui(n))throw new RangeError(`a starting point is required for ${n}s balancing`);if(Ui(r))throw new RangeError(`a starting point is required for ${r}s balancing`);let p=Gi(this);if(l==="day"){const{quotient:g,remainder:m}=p.time.divmod(Bd);let b=p.date.days+g+Fl(m,"day");b=vs(b,a,c),p=Lr({years:0,months:0,weeks:0,days:b},ft.ZERO)}else p=Lr({years:0,months:0,weeks:0,days:0},Kd(p.time,a,l,c));return pi(p,r)}total(t){if(I(this,te),t===void 0)throw new TypeError("options argument is required");const n=typeof t=="string"?jo("unit",t):K(t);let{plainRelativeTo:i,zonedRelativeTo:r}=Hp(n);const s=Nn(n,"unit","datetime",Yr);if(r){const a=_a(this),c=y(r,Tt),l=y(r,A),u=y(r,it);return(function(h,d,f,p,g){return Er(g)==="time"?Fl(ft.fromEpochNsDiff(d,h),g):Tb(PC(h,d,f,p,g),d,wi(f,h),f,p,g)})(u,ll(u,c,l,a),c,l,s)}if(i){const a=Gi(this);let c=ic({hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},a.time);const l=y(i,rt),u=y(i,A),h=Zn(u,l,Xe(a.date,c.deltaDays),"constrain");return(function(d,f,p,g){if(rc(d,f)==0)return 0;Fo(d),Fo(f);const m=IC(d,f,p,g);return g==="nanosecond"?v.toNumber(m.time.totalNs):Tb(m,ze(f),d,null,p,g)})(Mt(l,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Mt(h,c),u,s)}const o=Sr(this);if(Ui(o))throw new RangeError(`a starting point is required for ${o}s total`);if(Ui(s))throw new RangeError(`a starting point is required for ${s}s total`);return Fl(Gi(this).time,s)}toString(t=void 0){I(this,te);const n=K(t),i=Yu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour"||s==="minute")throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');const{precision:o,unit:a,increment:c}=qu(s,i);if(a==="nanosecond"&&c===1)return ph(this,o);const l=Sr(this);let u=_a(this);const h=Kd(u.time,c,a,r);return u=Lr(u.date,h),ph(pi(u,Ar(l,"second")),o)}toJSON(){return I(this,te),ph(this,"auto")}toLocaleString(t=void 0,n=void 0){if(I(this,te),typeof Intl.DurationFormat=="function"){const i=new Intl.DurationFormat(t,n);return KC.call(i,this)}return console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."),ph(this,"auto")}valueOf(){Us("Duration")}static from(t){return mi(t)}static compare(t,n,i=void 0){const r=mi(t),s=mi(n),o=K(i),{plainRelativeTo:a,zonedRelativeTo:c}=Hp(o);if(y(r,cn)===y(s,cn)&&y(r,ln)===y(s,ln)&&y(r,In)===y(s,In)&&y(r,un)===y(s,un)&&y(r,hn)===y(s,hn)&&y(r,dn)===y(s,dn)&&y(r,fn)===y(s,fn)&&y(r,pn)===y(s,pn)&&y(r,gn)===y(s,gn)&&y(r,Pn)===y(s,Pn))return 0;const l=Sr(r),u=Sr(s),h=_a(r),d=_a(s);if(c&&(Er(l)==="date"||Er(u)==="date")){const b=y(c,Tt),_=y(c,A),C=y(c,it),S=ll(C,b,_,h),k=ll(C,b,_,d);return Rn(v.toNumber(v.subtract(S,k)))}let f=h.date.days,p=d.date.days;if(Ui(l)||Ui(u)){if(!a)throw new RangeError("A starting point is required for years, months, or weeks comparison");f=$b(h.date,a),p=$b(d.date,a)}const g=h.time.add24HourDays(f),m=d.time.add24HourDays(p);return g.cmp(m)}}ts(oc,"Temporal.Duration");class n0{constructor(t,n,i="iso8601",r=1972){const s=st(t),o=st(n),a=Cn(i===void 0?"iso8601":Se(i)),c=st(r);No(c,s,o),yC(this,{year:c,month:s,day:o},a)}get monthCode(){return Yb(this,"monthCode")}get day(){return Yb(this,"day")}get calendarId(){return I(this,Kn),y(this,A)}with(t,n=void 0){if(I(this,Kn),!re(t))throw new TypeError("invalid argument");wc(t);const i=y(this,A);let r=_n(i,y(this,rt),"month-day");return r=Lo(i,r,ni(i,t,["year","month","monthCode","day"],[],"partial")),Da(Ud(i,r,St(K(n))),i)}equals(t){I(this,Kn);const n=_b(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return I(this,Kn),Sb(this,Uu(K(t)))}toJSON(){return I(this,Kn),Sb(this)}toLocaleString(t=void 0,n=void 0){return I(this,Kn),new gi(t,n).format(this)}valueOf(){Us("PlainMonthDay")}toPlainDate(t){if(I(this,Kn),!re(t))throw new TypeError("argument should be an object");const n=y(this,A);return vn(As(n,Lo(n,_n(n,y(this,rt),"month-day"),ni(n,t,["year"],[],[])),"constrain"),n)}static from(t,n=void 0){return _b(t,n)}}function Yb(e,t){I(e,Kn);const n=y(e,rt);return Vu(e).isoToDate(n,{[t]:!0})[t]}function Yp(e){return wi(e,ym())}ts(n0,"Temporal.PlainMonthDay");const GC={instant:()=>Ki(ym()),plainDateTimeISO:(e=jc())=>fi(Yp(yn(e)),"iso8601"),plainDateISO:(e=jc())=>vn(Yp(yn(e)).isoDate,"iso8601"),plainTimeISO:(e=jc())=>Mr(Yp(yn(e)).time),timeZoneId:()=>jc(),zonedDateTimeISO:(e=jc())=>{const t=yn(e);return Ge(ym(),t,"iso8601")},[Symbol.toStringTag]:"Temporal.Now"};Object.defineProperty(GC,Symbol.toStringTag,{value:"Temporal.Now",writable:!1,enumerable:!1,configurable:!0});class nh{constructor(t=0,n=0,i=0,r=0,s=0,o=0){const a=t===void 0?0:st(t),c=n===void 0?0:st(n),l=i===void 0?0:st(i),u=r===void 0?0:st(r),h=s===void 0?0:st(s),d=o===void 0?0:st(o);Hf(a,c,l,u,h,d),bC(this,{hour:a,minute:c,second:l,millisecond:u,microsecond:h,nanosecond:d})}get hour(){return I(this,ce),y(this,ie).hour}get minute(){return I(this,ce),y(this,ie).minute}get second(){return I(this,ce),y(this,ie).second}get millisecond(){return I(this,ce),y(this,ie).millisecond}get microsecond(){return I(this,ce),y(this,ie).microsecond}get nanosecond(){return I(this,ce),y(this,ie).nanosecond}with(t,n=void 0){if(I(this,ce),!re(t))throw new TypeError("invalid argument");wc(t);const i=cm(t,"partial"),r=cm(this);let{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=Object.assign(r,i);const h=St(K(n));return{hour:s,minute:o,second:a,millisecond:c,microsecond:l,nanosecond:u}=jf(s,o,a,c,l,u,h),new nh(s,o,a,c,l,u)}add(t){return I(this,ce),Bb("add",this,t)}subtract(t){return I(this,ce),Bb("subtract",this,t)}until(t,n=void 0){return I(this,ce),Rb("until",this,t,n)}since(t,n=void 0){return I(this,ce),Rb("since",this,t,n)}round(t){if(I(this,ce),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?jo("smallestUnit",t):K(t),i=xc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr);return Cc(i,{hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s],!1),Mr(mm(y(this,ie),i,s,r))}equals(t){I(this,ce);const n=ms(t);return vm(y(this,ie),y(n,ie))===0}toString(t=void 0){I(this,ce);const n=K(t),i=Yu(n),r=Pi(n,"trunc"),s=Nn(n,"smallestUnit","time",void 0);if(s==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:o,unit:a,increment:c}=qu(s,i);return kb(mm(y(this,ie),c,a,r),o)}toJSON(){return I(this,ce),kb(y(this,ie),"auto")}toLocaleString(t=void 0,n=void 0){return I(this,ce),new gi(t,n).format(this)}valueOf(){Us("PlainTime")}static from(t,n=void 0){return ms(t,n)}static compare(t,n){const i=ms(t),r=ms(n);return vm(y(i,ie),y(r,ie))}}ts(nh,"Temporal.PlainTime");class i0{constructor(t,n,i="iso8601",r=1){const s=st(t),o=st(n),a=Cn(i===void 0?"iso8601":Se(i)),c=st(r);No(s,o,c),_C(this,{year:s,month:o,day:c},a)}get year(){return vr(this,"year")}get month(){return vr(this,"month")}get monthCode(){return vr(this,"monthCode")}get calendarId(){return I(this,Le),y(this,A)}get era(){return vr(this,"era")}get eraYear(){return vr(this,"eraYear")}get daysInMonth(){return vr(this,"daysInMonth")}get daysInYear(){return vr(this,"daysInYear")}get monthsInYear(){return vr(this,"monthsInYear")}get inLeapYear(){return vr(this,"inLeapYear")}with(t,n=void 0){if(I(this,Le),!re(t))throw new TypeError("invalid argument");wc(t);const i=y(this,A);let r=_n(i,y(this,rt),"year-month");return r=Lo(i,r,ni(i,t,["year","month","monthCode"],[],"partial")),La(fu(i,r,St(K(n))),i)}add(t,n=void 0){return I(this,Le),Wb("add",this,t,n)}subtract(t,n=void 0){return I(this,Le),Wb("subtract",this,t,n)}until(t,n=void 0){return I(this,Le),Ab("until",this,t,n)}since(t,n=void 0){return I(this,Le),Ab("since",this,t,n)}equals(t){I(this,Le);const n=al(t);return or(y(this,rt),y(n,rt))===0&&rr(y(this,A),y(n,A))}toString(t=void 0){return I(this,Le),Eb(this,Uu(K(t)))}toJSON(){return I(this,Le),Eb(this)}toLocaleString(t=void 0,n=void 0){return I(this,Le),new gi(t,n).format(this)}valueOf(){Us("PlainYearMonth")}toPlainDate(t){if(I(this,Le),!re(t))throw new TypeError("argument should be an object");const n=y(this,A);return vn(As(n,Lo(n,_n(n,y(this,rt),"year-month"),ni(n,t,["day"],[],[])),"constrain"),n)}static from(t,n=void 0){return al(t,n)}static compare(t,n){const i=al(t),r=al(n);return or(y(i,rt),y(r,rt))}}function vr(e,t){I(e,Le);const n=y(e,rt);return Vu(e).isoToDate(n,{[t]:!0})[t]}ts(i0,"Temporal.PlainYearMonth");const u5=gi.prototype.resolvedOptions;class r0{constructor(t,n,i="iso8601"){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");const r=Gd(t);let s=Se(n);const{tzName:o,offsetMinutes:a}=Ds(s);if(a===void 0){const c=Yd(o);if(!c)throw new RangeError(`unknown time zone ${o}`);s=c.identifier}else s=Hv(a);xC(this,r,s,Cn(i===void 0?"iso8601":Se(i)))}get calendarId(){return I(this,dt),y(this,A)}get timeZoneId(){return I(this,dt),y(this,Tt)}get year(){return on(this,"year")}get month(){return on(this,"month")}get monthCode(){return on(this,"monthCode")}get day(){return on(this,"day")}get hour(){return ha(this,"hour")}get minute(){return ha(this,"minute")}get second(){return ha(this,"second")}get millisecond(){return ha(this,"millisecond")}get microsecond(){return ha(this,"microsecond")}get nanosecond(){return ha(this,"nanosecond")}get era(){return on(this,"era")}get eraYear(){return on(this,"eraYear")}get epochMilliseconds(){return I(this,dt),xi(y(this,it),"floor")}get epochNanoseconds(){return I(this,dt),NC(y(this,it))}get dayOfWeek(){return on(this,"dayOfWeek")}get dayOfYear(){return on(this,"dayOfYear")}get weekOfYear(){return on(this,"weekOfYear")?.week}get yearOfWeek(){return on(this,"weekOfYear")?.year}get hoursInDay(){I(this,dt);const t=y(this,Tt),n=Bi(this).isoDate,i=jn(n.year,n.month,n.day+1),r=as(t,n),s=as(t,i);return Fl(ft.fromEpochNsDiff(s,r),"hour")}get daysInWeek(){return on(this,"daysInWeek")}get daysInMonth(){return on(this,"daysInMonth")}get daysInYear(){return on(this,"daysInYear")}get monthsInYear(){return on(this,"monthsInYear")}get inLeapYear(){return on(this,"inLeapYear")}get offset(){return I(this,dt),lm(Dr(y(this,Tt),y(this,it)))}get offsetNanoseconds(){return I(this,dt),Dr(y(this,Tt),y(this,it))}with(t,n=void 0){if(I(this,dt),!re(t))throw new TypeError("invalid zoned-date-time-like");wc(t);const i=y(this,A),r=y(this,Tt),s=Dr(r,y(this,it)),o=Bi(this);let a={..._n(i,o.isoDate),...o.time,offset:lm(s)};a=Lo(i,a,ni(i,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset"],"partial"));const c=K(n),l=Nl(c),u=Uh(c,"prefer"),h=Ku(i,a,St(c)),d=kc(a.offset);return Ge(Hd(h.isoDate,h.time,"option",d,r,l,u,!1),r,i)}withPlainTime(t=void 0){I(this,dt);const n=y(this,Tt),i=y(this,A),r=Bi(this).isoDate;let s;return s=t===void 0?as(n,r):Ze(n,Mt(r,y(ms(t),ie)),"compatible"),Ge(s,n,i)}withTimeZone(t){I(this,dt);const n=yn(t);return Ge(y(this,it),n,y(this,A))}withCalendar(t){I(this,dt);const n=Xu(t);return Ge(y(this,it),y(this,Tt),n)}add(t,n=void 0){return I(this,dt),Hb("add",this,t,n)}subtract(t,n=void 0){return I(this,dt),Hb("subtract",this,t,n)}until(t,n=void 0){return I(this,dt),Lb("until",this,t,n)}since(t,n=void 0){return I(this,dt),Lb("since",this,t,n)}round(t){if(I(this,dt),t===void 0)throw new TypeError("options parameter is required");const n=typeof t=="string"?jo("smallestUnit",t):K(t),i=xc(n),r=Pi(n,"halfExpand"),s=Nn(n,"smallestUnit","time",Yr,["day"]),o={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[s];if(Cc(i,o,o===1),s==="nanosecond"&&i===1)return Ge(y(this,it),y(this,Tt),y(this,A));const a=y(this,Tt),c=y(this,it),l=Bi(this);let u;if(s==="day"){const h=l.isoDate,d=jn(h.year,h.month,h.day+1),f=as(a,h),p=as(a,d),g=v.subtract(p,f);u=ft.fromEpochNsDiff(c,f).round(g,r).addToEpochNs(f)}else{const h=gm(l,i,s,r),d=Dr(a,c);u=Hd(h.isoDate,h.time,"option",d,a,"compatible","prefer",!1)}return Ge(u,a,y(this,A))}equals(t){I(this,dt);const n=cl(t),i=y(this,it),r=y(n,it);return!!v.equal(v.BigInt(i),v.BigInt(r))&&!!CC(y(this,Tt),y(n,Tt))&&rr(y(this,A),y(n,A))}toString(t=void 0){I(this,dt);const n=K(t),i=Uu(n),r=Yu(n),s=(function(d){return Nr(d,"offset",["auto","never"],"auto")})(n),o=Pi(n,"trunc"),a=Nn(n,"smallestUnit","time",void 0);if(a==="hour")throw new RangeError('smallestUnit must be a time unit other than "hour"');const c=(function(d){return Nr(d,"timeZoneName",["auto","never","critical"],"auto")})(n),{precision:l,unit:u,increment:h}=qu(a,r);return Mb(this,l,i,c,s,{unit:u,increment:h,roundingMode:o})}toLocaleString(t=void 0,n=void 0){I(this,dt);const i=K(n),r=Object.create(null);if((function(c,l,u,h){if(l==null)return;const d=Reflect.ownKeys(l);for(let f=0;f<d.length;f++){const p=d[f];if(!u.some((g=>Object.is(g,p)))&&Object.prototype.propertyIsEnumerable.call(l,p)){const g=l[p];c[p]=g}}})(r,i,["timeZone"]),i.timeZone!==void 0)throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");if(r.year===void 0&&r.month===void 0&&r.day===void 0&&r.era===void 0&&r.weekday===void 0&&r.dateStyle===void 0&&r.hour===void 0&&r.minute===void 0&&r.second===void 0&&r.fractionalSecondDigits===void 0&&r.timeStyle===void 0&&r.dayPeriod===void 0&&r.timeZoneName===void 0&&(r.timeZoneName="short"),r.timeZone=y(this,Tt),Db(r.timeZone))throw new RangeError("toLocaleString does not currently support offset time zones");const s=new gi(t,r),o=u5.call(s).calendar,a=y(this,A);if(a!=="iso8601"&&o!=="iso8601"&&!rr(o,a))throw new RangeError(`cannot format ZonedDateTime with calendar ${a} in locale with calendar ${o}`);return s.format(Ki(y(this,it)))}toJSON(){return I(this,dt),Mb(this,"auto")}valueOf(){Us("ZonedDateTime")}startOfDay(){I(this,dt);const t=y(this,Tt);return Ge(as(t,Bi(this).isoDate),t,y(this,A))}getTimeZoneTransition(t){I(this,dt);const n=y(this,Tt);if(t===void 0)throw new TypeError("options parameter is required");const i=Nr(typeof t=="string"?jo("direction",t):K(t),"direction",["next","previous"],Yr);if(i===void 0)throw new TypeError("direction option is required");if(Db(n)||n==="UTC")return null;const r=y(this,it),s=i==="next"?Yv(n,r):hm(n,r);return s===null?null:Ge(s,n,y(this,A))}toInstant(){return I(this,dt),Ki(y(this,it))}toPlainDate(){return I(this,dt),vn(Bi(this).isoDate,y(this,A))}toPlainTime(){return I(this,dt),Mr(Bi(this).time)}toPlainDateTime(){return I(this,dt),fi(Bi(this),y(this,A))}static from(t,n=void 0){return cl(t,n)}static compare(t,n){const i=cl(t),r=cl(n),s=y(i,it),o=y(r,it);return v.lessThan(v.BigInt(s),v.BigInt(o))?-1:v.greaterThan(v.BigInt(s),v.BigInt(o))?1:0}}function Bi(e){return wi(y(e,Tt),y(e,it))}function on(e,t){I(e,dt);const n=Bi(e).isoDate;return Vu(e).isoToDate(n,{[t]:!0})[t]}function ha(e,t){return I(e,dt),Bi(e).time[t]}ts(r0,"Temporal.ZonedDateTime");var Fa=Object.freeze({__proto__:null,Duration:oc,Instant:Jv,Now:GC,PlainDate:t0,PlainDateTime:e0,PlainMonthDay:n0,PlainTime:nh,PlainYearMonth:i0,ZonedDateTime:r0});const h5=[Jv,t0,e0,oc,n0,nh,i0,r0];for(const e of h5){const t=Object.getOwnPropertyDescriptor(e,"prototype");(t.configurable||t.enumerable||t.writable)&&(t.configurable=!1,t.enumerable=!1,t.writable=!1,Object.defineProperty(e,"prototype",t))}function d5(e,t,n){return(t=m5(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qr(){return qr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)({}).hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},qr.apply(null,arguments)}function qb(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,i)}return n}function ar(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?qb(Object(n),!0).forEach(function(i){d5(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):qb(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function f5(e,t){if(e==null)return{};var n,i,r=p5(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function p5(e,t){if(e==null)return{};var n={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.indexOf(i)!==-1)continue;n[i]=e[i]}return n}function g5(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function m5(e){var t=g5(e,"string");return typeof t=="symbol"?t:t+""}function bm(e){"@babel/helpers - typeof";return bm=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},bm(e)}var v5="1.15.7";function zr(e){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(e)}var es=zr(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),ih=zr(/Edge/i),Vb=zr(/firefox/i),zl=zr(/safari/i)&&!zr(/chrome/i)&&!zr(/android/i),s0=zr(/iP(ad|od|hone)/i),XC=zr(/chrome/i)&&zr(/android/i),QC={capture:!1,passive:!1};function Ct(e,t,n){e.addEventListener(t,n,!es&&QC)}function yt(e,t,n){e.removeEventListener(t,n,!es&&QC)}function Qd(e,t){if(t){if(t[0]===">"&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch{return!1}return!1}}function ZC(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function Mi(e,t,n,i){if(e){n=n||document;do{if(t!=null&&(t[0]===">"?e.parentNode===n&&Qd(e,t):Qd(e,t))||i&&e===n)return e;if(e===n)break}while(e=ZC(e))}return null}var Kb=/\s+/g;function Un(e,t,n){if(e&&t)if(e.classList)e.classList[n?"add":"remove"](t);else{var i=(" "+e.className+" ").replace(Kb," ").replace(" "+t+" "," ");e.className=(i+(n?" "+t:"")).replace(Kb," ")}}function tt(e,t,n){var i=e&&e.style;if(i){if(n===void 0)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(n=e.currentStyle),t===void 0?n:n[t];!(t in i)&&t.indexOf("webkit")===-1&&(t="-webkit-"+t),i[t]=n+(typeof n=="string"?"":"px")}}function za(e,t){var n="";if(typeof e=="string")n=e;else do{var i=tt(e,"transform");i&&i!=="none"&&(n=i+" "+n)}while(!t&&(e=e.parentNode));var r=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return r&&new r(n)}function JC(e,t,n){if(e){var i=e.getElementsByTagName(t),r=0,s=i.length;if(n)for(;r<s;r++)n(i[r],r);return i}return[]}function Ji(){var e=document.scrollingElement;return e||document.documentElement}function ve(e,t,n,i,r){if(!(!e.getBoundingClientRect&&e!==window)){var s,o,a,c,l,u,h;if(e!==window&&e.parentNode&&e!==Ji()?(s=e.getBoundingClientRect(),o=s.top,a=s.left,c=s.bottom,l=s.right,u=s.height,h=s.width):(o=0,a=0,c=window.innerHeight,l=window.innerWidth,u=window.innerHeight,h=window.innerWidth),(t||n)&&e!==window&&(r=r||e.parentNode,!es))do if(r&&r.getBoundingClientRect&&(tt(r,"transform")!=="none"||n&&tt(r,"position")!=="static")){var d=r.getBoundingClientRect();o-=d.top+parseInt(tt(r,"border-top-width")),a-=d.left+parseInt(tt(r,"border-left-width")),c=o+s.height,l=a+s.width;break}while(r=r.parentNode);if(i&&e!==window){var f=za(r||e),p=f&&f.a,g=f&&f.d;f&&(o/=g,a/=p,h/=p,u/=g,c=o+u,l=a+h)}return{top:o,left:a,bottom:c,right:l,width:h,height:u}}}function Gb(e,t,n){for(var i=ys(e,!0),r=ve(e)[t];i;){var s=ve(i)[n],o=void 0;if(o=r>=s,!o)return i;if(i===Ji())break;i=ys(i,!1)}return!1}function ac(e,t,n,i){for(var r=0,s=0,o=e.children;s<o.length;){if(o[s].style.display!=="none"&&o[s]!==et.ghost&&(i||o[s]!==et.dragged)&&Mi(o[s],n.draggable,e,!1)){if(r===t)return o[s];r++}s++}return null}function o0(e,t){for(var n=e.lastElementChild;n&&(n===et.ghost||tt(n,"display")==="none"||t&&!Qd(n,t));)n=n.previousElementSibling;return n||null}function ci(e,t){var n=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)e.nodeName.toUpperCase()!=="TEMPLATE"&&e!==et.clone&&(!t||Qd(e,t))&&n++;return n}function Xb(e){var t=0,n=0,i=Ji();if(e)do{var r=za(e),s=r.a,o=r.d;t+=e.scrollLeft*s,n+=e.scrollTop*o}while(e!==i&&(e=e.parentNode));return[t,n]}function y5(e,t){for(var n in e)if(e.hasOwnProperty(n)){for(var i in t)if(t.hasOwnProperty(i)&&t[i]===e[n][i])return Number(n)}return-1}function ys(e,t){if(!e||!e.getBoundingClientRect)return Ji();var n=e,i=!1;do if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var r=tt(n);if(n.clientWidth<n.scrollWidth&&(r.overflowX=="auto"||r.overflowX=="scroll")||n.clientHeight<n.scrollHeight&&(r.overflowY=="auto"||r.overflowY=="scroll")){if(!n.getBoundingClientRect||n===document.body)return Ji();if(i||t)return n;i=!0}}while(n=n.parentNode);return Ji()}function b5(e,t){if(e&&t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function qp(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}var jl;function tk(e,t){return function(){if(!jl){var n=arguments,i=this;n.length===1?e.call(i,n[0]):e.apply(i,n),jl=setTimeout(function(){jl=void 0},t)}}}function _5(){clearTimeout(jl),jl=void 0}function ek(e,t,n){e.scrollLeft+=t,e.scrollTop+=n}function nk(e){var t=window.Polymer,n=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):n?n(e).clone(!0)[0]:e.cloneNode(!0)}function ik(e,t,n){var i={};return Array.from(e.children).forEach(function(r){var s,o,a,c;if(!(!Mi(r,t.draggable,e,!1)||r.animated||r===n)){var l=ve(r);i.left=Math.min((s=i.left)!==null&&s!==void 0?s:1/0,l.left),i.top=Math.min((o=i.top)!==null&&o!==void 0?o:1/0,l.top),i.right=Math.max((a=i.right)!==null&&a!==void 0?a:-1/0,l.right),i.bottom=Math.max((c=i.bottom)!==null&&c!==void 0?c:-1/0,l.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var An="Sortable"+new Date().getTime();function w5(){var e=[],t;return{captureAnimationState:function(){if(e=[],!!this.options.animation){var i=[].slice.call(this.el.children);i.forEach(function(r){if(!(tt(r,"display")==="none"||r===et.ghost)){e.push({target:r,rect:ve(r)});var s=ar({},e[e.length-1].rect);if(r.thisAnimationDuration){var o=za(r,!0);o&&(s.top-=o.f,s.left-=o.e)}r.fromRect=s}})}},addAnimationState:function(i){e.push(i)},removeAnimationState:function(i){e.splice(y5(e,{target:i}),1)},animateAll:function(i){var r=this;if(!this.options.animation){clearTimeout(t),typeof i=="function"&&i();return}var s=!1,o=0;e.forEach(function(a){var c=0,l=a.target,u=l.fromRect,h=ve(l),d=l.prevFromRect,f=l.prevToRect,p=a.rect,g=za(l,!0);g&&(h.top-=g.f,h.left-=g.e),l.toRect=h,l.thisAnimationDuration&&qp(d,h)&&!qp(u,h)&&(p.top-h.top)/(p.left-h.left)===(u.top-h.top)/(u.left-h.left)&&(c=C5(p,d,f,r.options)),qp(h,u)||(l.prevFromRect=u,l.prevToRect=h,c||(c=r.options.animation),r.animate(l,p,h,c)),c&&(s=!0,o=Math.max(o,c),clearTimeout(l.animationResetTimer),l.animationResetTimer=setTimeout(function(){l.animationTime=0,l.prevFromRect=null,l.fromRect=null,l.prevToRect=null,l.thisAnimationDuration=null},c),l.thisAnimationDuration=c)}),clearTimeout(t),s?t=setTimeout(function(){typeof i=="function"&&i()},o):typeof i=="function"&&i(),e=[]},animate:function(i,r,s,o){if(o){tt(i,"transition",""),tt(i,"transform","");var a=za(this.el),c=a&&a.a,l=a&&a.d,u=(r.left-s.left)/(c||1),h=(r.top-s.top)/(l||1);i.animatingX=!!u,i.animatingY=!!h,tt(i,"transform","translate3d("+u+"px,"+h+"px,0)"),this.forRepaintDummy=x5(i),tt(i,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),tt(i,"transform","translate3d(0,0,0)"),typeof i.animated=="number"&&clearTimeout(i.animated),i.animated=setTimeout(function(){tt(i,"transition",""),tt(i,"transform",""),i.animated=!1,i.animatingX=!1,i.animatingY=!1},o)}}}}function x5(e){return e.offsetWidth}function C5(e,t,n,i){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-n.top,2)+Math.pow(t.left-n.left,2))*i.animation}var da=[],Vp={initializeByDefault:!0},rh={mount:function(t){for(var n in Vp)Vp.hasOwnProperty(n)&&!(n in t)&&(t[n]=Vp[n]);da.forEach(function(i){if(i.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")}),da.push(t)},pluginEvent:function(t,n,i){var r=this;this.eventCanceled=!1,i.cancel=function(){r.eventCanceled=!0};var s=t+"Global";da.forEach(function(o){n[o.pluginName]&&(n[o.pluginName][s]&&n[o.pluginName][s](ar({sortable:n},i)),n.options[o.pluginName]&&n[o.pluginName][t]&&n[o.pluginName][t](ar({sortable:n},i)))})},initializePlugins:function(t,n,i,r){da.forEach(function(a){var c=a.pluginName;if(!(!t.options[c]&&!a.initializeByDefault)){var l=new a(t,n,t.options);l.sortable=t,l.options=t.options,t[c]=l,qr(i,l.defaults)}});for(var s in t.options)if(t.options.hasOwnProperty(s)){var o=this.modifyOption(t,s,t.options[s]);typeof o<"u"&&(t.options[s]=o)}},getEventProperties:function(t,n){var i={};return da.forEach(function(r){typeof r.eventProperties=="function"&&qr(i,r.eventProperties.call(n[r.pluginName],t))}),i},modifyOption:function(t,n,i){var r;return da.forEach(function(s){t[s.pluginName]&&s.optionListeners&&typeof s.optionListeners[n]=="function"&&(r=s.optionListeners[n].call(t[s.pluginName],i))}),r}};function k5(e){var t=e.sortable,n=e.rootEl,i=e.name,r=e.targetEl,s=e.cloneEl,o=e.toEl,a=e.fromEl,c=e.oldIndex,l=e.newIndex,u=e.oldDraggableIndex,h=e.newDraggableIndex,d=e.originalEvent,f=e.putSortable,p=e.extraEventProperties;if(t=t||n&&n[An],!!t){var g,m=t.options,b="on"+i.charAt(0).toUpperCase()+i.substr(1);window.CustomEvent&&!es&&!ih?g=new CustomEvent(i,{bubbles:!0,cancelable:!0}):(g=document.createEvent("Event"),g.initEvent(i,!0,!0)),g.to=o||n,g.from=a||n,g.item=r||n,g.clone=s,g.oldIndex=c,g.newIndex=l,g.oldDraggableIndex=u,g.newDraggableIndex=h,g.originalEvent=d,g.pullMode=f?f.lastPutMode:void 0;var _=ar(ar({},p),rh.getEventProperties(i,t));for(var C in _)g[C]=_[C];n&&n.dispatchEvent(g),m[b]&&m[b].call(t,g)}}var S5=["evt"],Mn=function(t,n){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=i.evt,s=f5(i,S5);rh.pluginEvent.bind(et)(t,n,ar({dragEl:N,parentEl:ae,ghostEl:ct,rootEl:Vt,nextEl:ao,lastDownEl:Yh,cloneEl:ee,cloneHidden:fs,dragStarted:ul,putSortable:Re,activeSortable:et.active,originalEvent:r,oldIndex:$a,oldDraggableIndex:Bl,newIndex:Yn,newDraggableIndex:ls,hideGhostForTarget:ak,unhideGhostForTarget:ck,cloneNowHidden:function(){fs=!0},cloneNowShown:function(){fs=!1},dispatchSortableEvent:function(a){an({sortable:n,name:a,originalEvent:r})}},s))};function an(e){k5(ar({putSortable:Re,cloneEl:ee,targetEl:N,rootEl:Vt,oldIndex:$a,oldDraggableIndex:Bl,newIndex:Yn,newDraggableIndex:ls},e))}var N,ae,ct,Vt,ao,Yh,ee,fs,$a,Yn,Bl,ls,gh,Re,wa=!1,Zd=!1,Jd=[],Js,Si,Kp,Gp,Qb,Zb,ul,fa,Wl,Hl=!1,mh=!1,qh,Ue,Xp=[],_m=!1,tf=[],Kf=typeof document<"u",vh=s0,Jb=ih||es?"cssFloat":"float",E5=Kf&&!XC&&!s0&&"draggable"in document.createElement("div"),rk=(function(){if(Kf){if(es)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto",e.style.pointerEvents==="auto"}})(),sk=function(t,n){var i=tt(t),r=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),s=ac(t,0,n),o=ac(t,1,n),a=s&&tt(s),c=o&&tt(o),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+ve(s).width,u=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+ve(o).width;if(i.display==="flex")return i.flexDirection==="column"||i.flexDirection==="column-reverse"?"vertical":"horizontal";if(i.display==="grid")return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(s&&a.float&&a.float!=="none"){var h=a.float==="left"?"left":"right";return o&&(c.clear==="both"||c.clear===h)?"vertical":"horizontal"}return s&&(a.display==="block"||a.display==="flex"||a.display==="table"||a.display==="grid"||l>=r&&i[Jb]==="none"||o&&i[Jb]==="none"&&l+u>r)?"vertical":"horizontal"},M5=function(t,n,i){var r=i?t.left:t.top,s=i?t.right:t.bottom,o=i?t.width:t.height,a=i?n.left:n.top,c=i?n.right:n.bottom,l=i?n.width:n.height;return r===a||s===c||r+o/2===a+l/2},D5=function(t,n){var i;return Jd.some(function(r){var s=r[An].options.emptyInsertThreshold;if(!(!s||o0(r))){var o=ve(r),a=t>=o.left-s&&t<=o.right+s,c=n>=o.top-s&&n<=o.bottom+s;if(a&&c)return i=r}}),i},ok=function(t){function n(s,o){return function(a,c,l,u){var h=a.options.group.name&&c.options.group.name&&a.options.group.name===c.options.group.name;if(s==null&&(o||h))return!0;if(s==null||s===!1)return!1;if(o&&s==="clone")return s;if(typeof s=="function")return n(s(a,c,l,u),o)(a,c,l,u);var d=(o?a:c).options.group.name;return s===!0||typeof s=="string"&&s===d||s.join&&s.indexOf(d)>-1}}var i={},r=t.group;(!r||bm(r)!="object")&&(r={name:r}),i.name=r.name,i.checkPull=n(r.pull,!0),i.checkPut=n(r.put),i.revertClone=r.revertClone,t.group=i},ak=function(){!rk&&ct&&tt(ct,"display","none")},ck=function(){!rk&&ct&&tt(ct,"display","")};Kf&&!XC&&document.addEventListener("click",function(e){if(Zd)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),Zd=!1,!1},!0);var to=function(t){if(N){t=t.touches?t.touches[0]:t;var n=D5(t.clientX,t.clientY);if(n){var i={};for(var r in t)t.hasOwnProperty(r)&&(i[r]=t[r]);i.target=i.rootEl=n,i.preventDefault=void 0,i.stopPropagation=void 0,n[An]._onDragOver(i)}}},$5=function(t){N&&N.parentNode[An]._isOutsideThisEl(t.target)};function et(e,t){if(!(e&&e.nodeType&&e.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=qr({},t),e[An]=this;var n={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return sk(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(o,a){o.setData("Text",a.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:et.supportPointer!==!1&&"PointerEvent"in window&&(!zl||s0),emptyInsertThreshold:5};rh.initializePlugins(this,e,n);for(var i in n)!(i in t)&&(t[i]=n[i]);ok(t);for(var r in this)r.charAt(0)==="_"&&typeof this[r]=="function"&&(this[r]=this[r].bind(this));this.nativeDraggable=t.forceFallback?!1:E5,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?Ct(e,"pointerdown",this._onTapStart):(Ct(e,"mousedown",this._onTapStart),Ct(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(Ct(e,"dragover",this),Ct(e,"dragenter",this)),Jd.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),qr(this,w5())}et.prototype={constructor:et,_isOutsideThisEl:function(t){!this.el.contains(t)&&t!==this.el&&(fa=null)},_getDirection:function(t,n){return typeof this.options.direction=="function"?this.options.direction.call(this,t,n,N):this.options.direction},_onTapStart:function(t){if(t.cancelable){var n=this,i=this.el,r=this.options,s=r.preventOnFilter,o=t.type,a=t.touches&&t.touches[0]||t.pointerType&&t.pointerType==="touch"&&t,c=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||c,u=r.filter;if(N5(i),!N&&!(/mousedown|pointerdown/.test(o)&&t.button!==0||r.disabled)&&!l.isContentEditable&&!(!this.nativeDraggable&&zl&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=Mi(c,r.draggable,i,!1),!(c&&c.animated)&&Yh!==c)){if($a=ci(c),Bl=ci(c,r.draggable),typeof u=="function"){if(u.call(this,t,c,this)){an({sortable:n,rootEl:l,name:"filter",targetEl:c,toEl:i,fromEl:i}),Mn("filter",n,{evt:t}),s&&t.preventDefault();return}}else if(u&&(u=u.split(",").some(function(h){if(h=Mi(l,h.trim(),i,!1),h)return an({sortable:n,rootEl:h,name:"filter",targetEl:c,fromEl:i,toEl:i}),Mn("filter",n,{evt:t}),!0}),u)){s&&t.preventDefault();return}r.handle&&!Mi(l,r.handle,i,!1)||this._prepareDragStart(t,a,c)}}},_prepareDragStart:function(t,n,i){var r=this,s=r.el,o=r.options,a=s.ownerDocument,c;if(i&&!N&&i.parentNode===s){var l=ve(i);if(Vt=s,N=i,ae=N.parentNode,ao=N.nextSibling,Yh=i,gh=o.group,et.dragged=N,Js={target:N,clientX:(n||t).clientX,clientY:(n||t).clientY},Qb=Js.clientX-l.left,Zb=Js.clientY-l.top,this._lastX=(n||t).clientX,this._lastY=(n||t).clientY,N.style["will-change"]="all",c=function(){if(Mn("delayEnded",r,{evt:t}),et.eventCanceled){r._onDrop();return}r._disableDelayedDragEvents(),!Vb&&r.nativeDraggable&&(N.draggable=!0),r._triggerDragStart(t,n),an({sortable:r,name:"choose",originalEvent:t}),Un(N,o.chosenClass,!0)},o.ignore.split(",").forEach(function(u){JC(N,u.trim(),Qp)}),Ct(a,"dragover",to),Ct(a,"mousemove",to),Ct(a,"touchmove",to),o.supportPointer?(Ct(a,"pointerup",r._onDrop),!this.nativeDraggable&&Ct(a,"pointercancel",r._onDrop)):(Ct(a,"mouseup",r._onDrop),Ct(a,"touchend",r._onDrop),Ct(a,"touchcancel",r._onDrop)),Vb&&this.nativeDraggable&&(this.options.touchStartThreshold=4,N.draggable=!0),Mn("delayStart",this,{evt:t}),o.delay&&(!o.delayOnTouchOnly||n)&&(!this.nativeDraggable||!(ih||es))){if(et.eventCanceled){this._onDrop();return}o.supportPointer?(Ct(a,"pointerup",r._disableDelayedDrag),Ct(a,"pointercancel",r._disableDelayedDrag)):(Ct(a,"mouseup",r._disableDelayedDrag),Ct(a,"touchend",r._disableDelayedDrag),Ct(a,"touchcancel",r._disableDelayedDrag)),Ct(a,"mousemove",r._delayedDragTouchMoveHandler),Ct(a,"touchmove",r._delayedDragTouchMoveHandler),o.supportPointer&&Ct(a,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=setTimeout(c,o.delay)}else c()}},_delayedDragTouchMoveHandler:function(t){var n=t.touches?t.touches[0]:t;Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){N&&Qp(N),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;yt(t,"mouseup",this._disableDelayedDrag),yt(t,"touchend",this._disableDelayedDrag),yt(t,"touchcancel",this._disableDelayedDrag),yt(t,"pointerup",this._disableDelayedDrag),yt(t,"pointercancel",this._disableDelayedDrag),yt(t,"mousemove",this._delayedDragTouchMoveHandler),yt(t,"touchmove",this._delayedDragTouchMoveHandler),yt(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,n){n=n||t.pointerType=="touch"&&t,!this.nativeDraggable||n?this.options.supportPointer?Ct(document,"pointermove",this._onTouchMove):n?Ct(document,"touchmove",this._onTouchMove):Ct(document,"mousemove",this._onTouchMove):(Ct(N,"dragend",this),Ct(Vt,"dragstart",this._onDragStart));try{document.selection?Vh(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(t,n){if(wa=!1,Vt&&N){Mn("dragStarted",this,{evt:n}),this.nativeDraggable&&Ct(document,"dragover",$5);var i=this.options;!t&&Un(N,i.dragClass,!1),Un(N,i.ghostClass,!0),et.active=this,t&&this._appendGhost(),an({sortable:this,name:"start",originalEvent:n})}else this._nulling()},_emulateDragOver:function(){if(Si){this._lastX=Si.clientX,this._lastY=Si.clientY,ak();for(var t=document.elementFromPoint(Si.clientX,Si.clientY),n=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(Si.clientX,Si.clientY),t!==n);)n=t;if(N.parentNode[An]._isOutsideThisEl(t),n)do{if(n[An]){var i=void 0;if(i=n[An]._onDragOver({clientX:Si.clientX,clientY:Si.clientY,target:t,rootEl:n}),i&&!this.options.dragoverBubble)break}t=n}while(n=ZC(n));ck()}},_onTouchMove:function(t){if(Js){var n=this.options,i=n.fallbackTolerance,r=n.fallbackOffset,s=t.touches?t.touches[0]:t,o=ct&&za(ct,!0),a=ct&&o&&o.a,c=ct&&o&&o.d,l=vh&&Ue&&Xb(Ue),u=(s.clientX-Js.clientX+r.x)/(a||1)+(l?l[0]-Xp[0]:0)/(a||1),h=(s.clientY-Js.clientY+r.y)/(c||1)+(l?l[1]-Xp[1]:0)/(c||1);if(!et.active&&!wa){if(i&&Math.max(Math.abs(s.clientX-this._lastX),Math.abs(s.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(ct){o?(o.e+=u-(Kp||0),o.f+=h-(Gp||0)):o={a:1,b:0,c:0,d:1,e:u,f:h};var d="matrix(".concat(o.a,",").concat(o.b,",").concat(o.c,",").concat(o.d,",").concat(o.e,",").concat(o.f,")");tt(ct,"webkitTransform",d),tt(ct,"mozTransform",d),tt(ct,"msTransform",d),tt(ct,"transform",d),Kp=u,Gp=h,Si=s}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!ct){var t=this.options.fallbackOnBody?document.body:Vt,n=ve(N,!0,vh,!0,t),i=this.options;if(vh){for(Ue=t;tt(Ue,"position")==="static"&&tt(Ue,"transform")==="none"&&Ue!==document;)Ue=Ue.parentNode;Ue!==document.body&&Ue!==document.documentElement?(Ue===document&&(Ue=Ji()),n.top+=Ue.scrollTop,n.left+=Ue.scrollLeft):Ue=Ji(),Xp=Xb(Ue)}ct=N.cloneNode(!0),Un(ct,i.ghostClass,!1),Un(ct,i.fallbackClass,!0),Un(ct,i.dragClass,!0),tt(ct,"transition",""),tt(ct,"transform",""),tt(ct,"box-sizing","border-box"),tt(ct,"margin",0),tt(ct,"top",n.top),tt(ct,"left",n.left),tt(ct,"width",n.width),tt(ct,"height",n.height),tt(ct,"opacity","0.8"),tt(ct,"position",vh?"absolute":"fixed"),tt(ct,"zIndex","100000"),tt(ct,"pointerEvents","none"),et.ghost=ct,t.appendChild(ct),tt(ct,"transform-origin",Qb/parseInt(ct.style.width)*100+"% "+Zb/parseInt(ct.style.height)*100+"%")}},_onDragStart:function(t,n){var i=this,r=t.dataTransfer,s=i.options;if(Mn("dragStart",this,{evt:t}),et.eventCanceled){this._onDrop();return}Mn("setupClone",this),et.eventCanceled||(ee=nk(N),ee.removeAttribute("id"),ee.draggable=!1,ee.style["will-change"]="",this._hideClone(),Un(ee,this.options.chosenClass,!1),et.clone=ee),i.cloneId=Vh(function(){Mn("clone",i),!et.eventCanceled&&(i.options.removeCloneOnHide||Vt.insertBefore(ee,N),i._hideClone(),an({sortable:i,name:"clone"}))}),!n&&Un(N,s.dragClass,!0),n?(Zd=!0,i._loopId=setInterval(i._emulateDragOver,50)):(yt(document,"mouseup",i._onDrop),yt(document,"touchend",i._onDrop),yt(document,"touchcancel",i._onDrop),r&&(r.effectAllowed="move",s.setData&&s.setData.call(i,r,N)),Ct(document,"drop",i),tt(N,"transform","translateZ(0)")),wa=!0,i._dragStartId=Vh(i._dragStarted.bind(i,n,t)),Ct(document,"selectstart",i),ul=!0,window.getSelection().removeAllRanges(),zl&&tt(document.body,"user-select","none")},_onDragOver:function(t){var n=this.el,i=t.target,r,s,o,a=this.options,c=a.group,l=et.active,u=gh===c,h=a.sort,d=Re||l,f,p=this,g=!1;if(_m)return;function m(G,B){Mn(G,p,ar({evt:t,isOwner:u,axis:f?"vertical":"horizontal",revert:o,dragRect:r,targetRect:s,canSort:h,fromSortable:d,target:i,completed:_,onMove:function(W,V){return yh(Vt,n,N,r,W,ve(W),t,V)},changed:C},B))}function b(){m("dragOverAnimationCapture"),p.captureAnimationState(),p!==d&&d.captureAnimationState()}function _(G){return m("dragOverCompleted",{insertion:G}),G&&(u?l._hideClone():l._showClone(p),p!==d&&(Un(N,Re?Re.options.ghostClass:l.options.ghostClass,!1),Un(N,a.ghostClass,!0)),Re!==p&&p!==et.active?Re=p:p===et.active&&Re&&(Re=null),d===p&&(p._ignoreWhileAnimating=i),p.animateAll(function(){m("dragOverAnimationComplete"),p._ignoreWhileAnimating=null}),p!==d&&(d.animateAll(),d._ignoreWhileAnimating=null)),(i===N&&!N.animated||i===n&&!i.animated)&&(fa=null),!a.dragoverBubble&&!t.rootEl&&i!==document&&(N.parentNode[An]._isOutsideThisEl(t.target),!G&&to(t)),!a.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),g=!0}function C(){Yn=ci(N),ls=ci(N,a.draggable),an({sortable:p,name:"change",toEl:n,newIndex:Yn,newDraggableIndex:ls,originalEvent:t})}if(t.preventDefault!==void 0&&t.cancelable&&t.preventDefault(),i=Mi(i,a.draggable,n,!0),m("dragOver"),et.eventCanceled)return g;if(N.contains(t.target)||i.animated&&i.animatingX&&i.animatingY||p._ignoreWhileAnimating===i)return _(!1);if(Zd=!1,l&&!a.disabled&&(u?h||(o=ae!==Vt):Re===this||(this.lastPutMode=gh.checkPull(this,l,N,t))&&c.checkPut(this,l,N,t))){if(f=this._getDirection(t,i)==="vertical",r=ve(N),m("dragOverValid"),et.eventCanceled)return g;if(o)return ae=Vt,b(),this._hideClone(),m("revert"),et.eventCanceled||(ao?Vt.insertBefore(N,ao):Vt.appendChild(N)),_(!0);var S=o0(n,a.draggable);if(!S||P5(t,f,this)&&!S.animated){if(S===N)return _(!1);if(S&&n===t.target&&(i=S),i&&(s=ve(i)),yh(Vt,n,N,r,i,s,t,!!i)!==!1)return b(),S&&S.nextSibling?n.insertBefore(N,S.nextSibling):n.appendChild(N),ae=n,C(),_(!0)}else if(S&&I5(t,f,this)){var k=ac(n,0,a,!0);if(k===N)return _(!1);if(i=k,s=ve(i),yh(Vt,n,N,r,i,s,t,!1)!==!1)return b(),n.insertBefore(N,k),ae=n,C(),_(!0)}else if(i.parentNode===n){s=ve(i);var $=0,D,w=N.parentNode!==n,x=!M5(N.animated&&N.toRect||r,i.animated&&i.toRect||s,f),M=f?"top":"left",O=Gb(i,"top","top")||Gb(N,"top","top"),T=O?O.scrollTop:void 0;fa!==i&&(D=s[M],Hl=!1,mh=!x&&a.invertSwap||w),$=R5(t,i,s,f,x?1:a.swapThreshold,a.invertedSwapThreshold==null?a.swapThreshold:a.invertedSwapThreshold,mh,fa===i);var R;if($!==0){var j=ci(N);do j-=$,R=ae.children[j];while(R&&(tt(R,"display")==="none"||R===ct))}if($===0||R===i)return _(!1);fa=i,Wl=$;var z=i.nextElementSibling,Y=!1;Y=$===1;var F=yh(Vt,n,N,r,i,s,t,Y);if(F!==!1)return(F===1||F===-1)&&(Y=F===1),_m=!0,setTimeout(O5,30),b(),Y&&!z?n.appendChild(N):i.parentNode.insertBefore(N,Y?z:i),O&&ek(O,0,T-O.scrollTop),ae=N.parentNode,D!==void 0&&!mh&&(qh=Math.abs(D-ve(i)[M])),C(),_(!0)}if(n.contains(N))return _(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){yt(document,"mousemove",this._onTouchMove),yt(document,"touchmove",this._onTouchMove),yt(document,"pointermove",this._onTouchMove),yt(document,"dragover",to),yt(document,"mousemove",to),yt(document,"touchmove",to)},_offUpEvents:function(){var t=this.el.ownerDocument;yt(t,"mouseup",this._onDrop),yt(t,"touchend",this._onDrop),yt(t,"pointerup",this._onDrop),yt(t,"pointercancel",this._onDrop),yt(t,"touchcancel",this._onDrop),yt(document,"selectstart",this)},_onDrop:function(t){var n=this.el,i=this.options;if(Yn=ci(N),ls=ci(N,i.draggable),Mn("drop",this,{evt:t}),ae=N&&N.parentNode,Yn=ci(N),ls=ci(N,i.draggable),et.eventCanceled){this._nulling();return}wa=!1,mh=!1,Hl=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),wm(this.cloneId),wm(this._dragStartId),this.nativeDraggable&&(yt(document,"drop",this),yt(n,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),zl&&tt(document.body,"user-select",""),tt(N,"transform",""),t&&(ul&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),ct&&ct.parentNode&&ct.parentNode.removeChild(ct),(Vt===ae||Re&&Re.lastPutMode!=="clone")&&ee&&ee.parentNode&&ee.parentNode.removeChild(ee),N&&(this.nativeDraggable&&yt(N,"dragend",this),Qp(N),N.style["will-change"]="",ul&&!wa&&Un(N,Re?Re.options.ghostClass:this.options.ghostClass,!1),Un(N,this.options.chosenClass,!1),an({sortable:this,name:"unchoose",toEl:ae,newIndex:null,newDraggableIndex:null,originalEvent:t}),Vt!==ae?(Yn>=0&&(an({rootEl:ae,name:"add",toEl:ae,fromEl:Vt,originalEvent:t}),an({sortable:this,name:"remove",toEl:ae,originalEvent:t}),an({rootEl:ae,name:"sort",toEl:ae,fromEl:Vt,originalEvent:t}),an({sortable:this,name:"sort",toEl:ae,originalEvent:t})),Re&&Re.save()):Yn!==$a&&Yn>=0&&(an({sortable:this,name:"update",toEl:ae,originalEvent:t}),an({sortable:this,name:"sort",toEl:ae,originalEvent:t})),et.active&&((Yn==null||Yn===-1)&&(Yn=$a,ls=Bl),an({sortable:this,name:"end",toEl:ae,originalEvent:t}),this.save()))),this._nulling()},_nulling:function(){Mn("nulling",this),Vt=N=ae=ct=ao=ee=Yh=fs=Js=Si=ul=Yn=ls=$a=Bl=fa=Wl=Re=gh=et.dragged=et.ghost=et.clone=et.active=null;var t=this.el;tf.forEach(function(n){t.contains(n)&&(n.checked=!0)}),tf.length=Kp=Gp=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":N&&(this._onDragOver(t),T5(t));break;case"selectstart":t.preventDefault();break}},toArray:function(){for(var t=[],n,i=this.el.children,r=0,s=i.length,o=this.options;r<s;r++)n=i[r],Mi(n,o.draggable,this.el,!1)&&t.push(n.getAttribute(o.dataIdAttr)||L5(n));return t},sort:function(t,n){var i={},r=this.el;this.toArray().forEach(function(s,o){var a=r.children[o];Mi(a,this.options.draggable,r,!1)&&(i[s]=a)},this),n&&this.captureAnimationState(),t.forEach(function(s){i[s]&&(r.removeChild(i[s]),r.appendChild(i[s]))}),n&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,n){return Mi(t,n||this.options.draggable,this.el,!1)},option:function(t,n){var i=this.options;if(n===void 0)return i[t];var r=rh.modifyOption(this,t,n);typeof r<"u"?i[t]=r:i[t]=n,t==="group"&&ok(i)},destroy:function(){Mn("destroy",this);var t=this.el;t[An]=null,yt(t,"mousedown",this._onTapStart),yt(t,"touchstart",this._onTapStart),yt(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(yt(t,"dragover",this),yt(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(n){n.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Jd.splice(Jd.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!fs){if(Mn("hideClone",this),et.eventCanceled)return;tt(ee,"display","none"),this.options.removeCloneOnHide&&ee.parentNode&&ee.parentNode.removeChild(ee),fs=!0}},_showClone:function(t){if(t.lastPutMode!=="clone"){this._hideClone();return}if(fs){if(Mn("showClone",this),et.eventCanceled)return;N.parentNode==Vt&&!this.options.group.revertClone?Vt.insertBefore(ee,N):ao?Vt.insertBefore(ee,ao):Vt.appendChild(ee),this.options.group.revertClone&&this.animate(N,ee),tt(ee,"display",""),fs=!1}}};function T5(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}function yh(e,t,n,i,r,s,o,a){var c,l=e[An],u=l.options.onMove,h;return window.CustomEvent&&!es&&!ih?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=t,c.from=e,c.dragged=n,c.draggedRect=i,c.related=r||t,c.relatedRect=s||ve(t),c.willInsertAfter=a,c.originalEvent=o,e.dispatchEvent(c),u&&(h=u.call(l,c,o)),h}function Qp(e){e.draggable=!1}function O5(){_m=!1}function I5(e,t,n){var i=ve(ac(n.el,0,n.options,!0)),r=ik(n.el,n.options,ct),s=10;return t?e.clientX<r.left-s||e.clientY<i.top&&e.clientX<i.right:e.clientY<r.top-s||e.clientY<i.bottom&&e.clientX<i.left}function P5(e,t,n){var i=ve(o0(n.el,n.options.draggable)),r=ik(n.el,n.options,ct),s=10;return t?e.clientX>r.right+s||e.clientY>i.bottom&&e.clientX>i.left:e.clientY>r.bottom+s||e.clientX>i.right&&e.clientY>i.top}function R5(e,t,n,i,r,s,o,a){var c=i?e.clientY:e.clientX,l=i?n.height:n.width,u=i?n.top:n.left,h=i?n.bottom:n.right,d=!1;if(!o){if(a&&qh<l*r){if(!Hl&&(Wl===1?c>u+l*s/2:c<h-l*s/2)&&(Hl=!0),Hl)d=!0;else if(Wl===1?c<u+qh:c>h-qh)return-Wl}else if(c>u+l*(1-r)/2&&c<h-l*(1-r)/2)return A5(t)}return d=d||o,d&&(c<u+l*s/2||c>h-l*s/2)?c>u+l/2?1:-1:0}function A5(e){return ci(N)<ci(e)?1:-1}function L5(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,n=t.length,i=0;n--;)i+=t.charCodeAt(n);return i.toString(36)}function N5(e){tf.length=0;for(var t=e.getElementsByTagName("input"),n=t.length;n--;){var i=t[n];i.checked&&tf.push(i)}}function Vh(e){return setTimeout(e,0)}function wm(e){return clearTimeout(e)}Kf&&Ct(document,"touchmove",function(e){(et.active||wa)&&e.cancelable&&e.preventDefault()});et.utils={on:Ct,off:yt,css:tt,find:JC,is:function(t,n){return!!Mi(t,n,t,!1)},extend:b5,throttle:tk,closest:Mi,toggleClass:Un,clone:nk,index:ci,nextTick:Vh,cancelNextTick:wm,detectDirection:sk,getChild:ac,expando:An};et.get=function(e){return e[An]};et.mount=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t[0].constructor===Array&&(t=t[0]),t.forEach(function(i){if(!i.prototype||!i.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));i.utils&&(et.utils=ar(ar({},et.utils),i.utils)),rh.mount(i)})};et.create=function(e,t){return new et(e,t)};et.version=v5;var ge=[],hl,xm,Cm=!1,Zp,Jp,ef,dl;function F5(){function e(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var t in this)t.charAt(0)==="_"&&typeof this[t]=="function"&&(this[t]=this[t].bind(this))}return e.prototype={dragStarted:function(n){var i=n.originalEvent;this.sortable.nativeDraggable?Ct(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Ct(document,"pointermove",this._handleFallbackAutoScroll):i.touches?Ct(document,"touchmove",this._handleFallbackAutoScroll):Ct(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(n){var i=n.originalEvent;!this.options.dragOverBubble&&!i.rootEl&&this._handleAutoScroll(i)},drop:function(){this.sortable.nativeDraggable?yt(document,"dragover",this._handleAutoScroll):(yt(document,"pointermove",this._handleFallbackAutoScroll),yt(document,"touchmove",this._handleFallbackAutoScroll),yt(document,"mousemove",this._handleFallbackAutoScroll)),t_(),Kh(),_5()},nulling:function(){ef=xm=hl=Cm=dl=Zp=Jp=null,ge.length=0},_handleFallbackAutoScroll:function(n){this._handleAutoScroll(n,!0)},_handleAutoScroll:function(n,i){var r=this,s=(n.touches?n.touches[0]:n).clientX,o=(n.touches?n.touches[0]:n).clientY,a=document.elementFromPoint(s,o);if(ef=n,i||this.options.forceAutoScrollFallback||ih||es||zl){tg(n,this.options,a,i);var c=ys(a,!0);Cm&&(!dl||s!==Zp||o!==Jp)&&(dl&&t_(),dl=setInterval(function(){var l=ys(document.elementFromPoint(s,o),!0);l!==c&&(c=l,Kh()),tg(n,r.options,l,i)},10),Zp=s,Jp=o)}else{if(!this.options.bubbleScroll||ys(a,!0)===Ji()){Kh();return}tg(n,this.options,ys(a,!1),!1)}}},qr(e,{pluginName:"scroll",initializeByDefault:!0})}function Kh(){ge.forEach(function(e){clearInterval(e.pid)}),ge=[]}function t_(){clearInterval(dl)}var tg=tk(function(e,t,n,i){if(t.scroll){var r=(e.touches?e.touches[0]:e).clientX,s=(e.touches?e.touches[0]:e).clientY,o=t.scrollSensitivity,a=t.scrollSpeed,c=Ji(),l=!1,u;xm!==n&&(xm=n,Kh(),hl=t.scroll,u=t.scrollFn,hl===!0&&(hl=ys(n,!0)));var h=0,d=hl;do{var f=d,p=ve(f),g=p.top,m=p.bottom,b=p.left,_=p.right,C=p.width,S=p.height,k=void 0,$=void 0,D=f.scrollWidth,w=f.scrollHeight,x=tt(f),M=f.scrollLeft,O=f.scrollTop;f===c?(k=C<D&&(x.overflowX==="auto"||x.overflowX==="scroll"||x.overflowX==="visible"),$=S<w&&(x.overflowY==="auto"||x.overflowY==="scroll"||x.overflowY==="visible")):(k=C<D&&(x.overflowX==="auto"||x.overflowX==="scroll"),$=S<w&&(x.overflowY==="auto"||x.overflowY==="scroll"));var T=k&&(Math.abs(_-r)<=o&&M+C<D)-(Math.abs(b-r)<=o&&!!M),R=$&&(Math.abs(m-s)<=o&&O+S<w)-(Math.abs(g-s)<=o&&!!O);if(!ge[h])for(var j=0;j<=h;j++)ge[j]||(ge[j]={});(ge[h].vx!=T||ge[h].vy!=R||ge[h].el!==f)&&(ge[h].el=f,ge[h].vx=T,ge[h].vy=R,clearInterval(ge[h].pid),(T!=0||R!=0)&&(l=!0,ge[h].pid=setInterval((function(){i&&this.layer===0&&et.active._onTouchMove(ef);var z=ge[this.layer].vy?ge[this.layer].vy*a:0,Y=ge[this.layer].vx?ge[this.layer].vx*a:0;typeof u=="function"&&u.call(et.dragged.parentNode[An],Y,z,e,ef,ge[this.layer].el)!=="continue"||ek(ge[this.layer].el,Y,z)}).bind({layer:h}),24))),h++}while(t.bubbleScroll&&d!==c&&(d=ys(d,!1)));Cm=l}},30),lk=function(t){var n=t.originalEvent,i=t.putSortable,r=t.dragEl,s=t.activeSortable,o=t.dispatchSortableEvent,a=t.hideGhostForTarget,c=t.unhideGhostForTarget;if(n){var l=i||s;a();var u=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:n,h=document.elementFromPoint(u.clientX,u.clientY);c(),l&&!l.el.contains(h)&&(o("spill"),this.onSpill({dragEl:r,putSortable:i}))}};function a0(){}a0.prototype={startIndex:null,dragStart:function(t){var n=t.oldDraggableIndex;this.startIndex=n},onSpill:function(t){var n=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var r=ac(this.sortable.el,this.startIndex,this.options);r?this.sortable.el.insertBefore(n,r):this.sortable.el.appendChild(n),this.sortable.animateAll(),i&&i.animateAll()},drop:lk};qr(a0,{pluginName:"revertOnSpill"});function c0(){}c0.prototype={onSpill:function(t){var n=t.dragEl,i=t.putSortable,r=i||this.sortable;r.captureAnimationState(),n.parentNode&&n.parentNode.removeChild(n),r.animateAll()},drop:lk};qr(c0,{pluginName:"removeOnSpill"});et.mount(new F5);et.mount(c0,a0);class vi{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).dashboardCharts.subscribe(t)}static async all(){return(await(await Z()).dashboardCharts.all()).sort((i,r)=>i.position-r.position).map(i=>new vi(i))}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.dashboardCharts.put(i),new vi(i)}static async update(t,n){const i=await Z(),r=await i.dashboardCharts.get(t);await i.dashboardCharts.put({...r,...n})}static async remove(t){await(await Z()).dashboardCharts.remove(t)}static async reorder(t){const n=await Z();await Promise.all(t.map(async(i,r)=>{const s=await n.dashboardCharts.get(i);await n.dashboardCharts.put({...s,position:r})}))}}class cr{constructor(t){Object.assign(this,t)}static async subscribe(t){return(await Z()).dashboardTables.subscribe(t)}static async all(){return(await(await Z()).dashboardTables.all()).sort((i,r)=>i.position-r.position).map(i=>new cr(i))}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.dashboardTables.put(i),new cr(i)}static async update(t,n){const i=await Z(),r=await i.dashboardTables.get(t);await i.dashboardTables.put({...r,...n})}static async remove(t){await(await Z()).dashboardTables.remove(t)}static async reorder(t){const n=await Z();await Promise.all(t.map(async(i,r)=>{const s=await n.dashboardTables.get(i);await n.dashboardTables.put({...s,position:r})}))}}const Mc=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Dc=pt`
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
`;var z5=Object.defineProperty,j5=Object.getOwnPropertyDescriptor,uk=e=>{throw TypeError(e)},sh=(e,t,n,i)=>{for(var r=i>1?void 0:i?j5(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&z5(t,n,r),r},B5=(e,t,n)=>t.has(e)||uk("Cannot "+n),W5=(e,t,n)=>t.has(e)?uk("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),$i=(e,t,n)=>(B5(e,t,"access private method"),n),Qn,Gf,hk,dk,fl,fk,pk;const H5=[{value:"tag",label:"Tag"},{value:"merchant",label:"Merchant"},{value:"amount",label:"Amount"},{value:"description",label:"Description"}],gk={tag:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],merchant:[{value:"is",label:"is"},{value:"isNot",label:"is not"}],amount:[{value:"lt",label:"<"},{value:"gt",label:">"},{value:"lte",label:"<="},{value:"gte",label:">="}],description:[{value:"contains",label:"contains"},{value:"excludes",label:"excludes"}]};let Wo=class extends mt{constructor(){super(...arguments),W5(this,Qn),this.condition={field:"tag",operator:"is",value:""},this.index=0,this.tags=[],this.merchants=[]}render(){const e=gk[this.condition.field];return E`
      <select @change=${$i(this,Qn,hk)}>
        ${H5.map(t=>E`<option value=${t.value} ?selected=${this.condition.field===t.value}>${t.label}</option>`)}
      </select>
      <select @change=${$i(this,Qn,dk)}>
        ${e.map(t=>E`<option value=${t.value} ?selected=${this.condition.operator===t.value}>${t.label}</option>`)}
      </select>
      ${$i(this,Qn,pk).call(this)}
      <button class="icon-btn icon-btn--danger" title="Remove filter" aria-label="Remove filter" @click=${$i(this,Qn,fk)}>${ye(Mc)}</button>
    `}};Qn=new WeakSet;Gf=function(e){this.dispatchEvent(new CustomEvent("filter-changed",{detail:{index:this.index,condition:e}}))};hk=function(e){const t=e.target.value,n=gk[t];$i(this,Qn,Gf).call(this,{field:t,operator:n[0].value,value:""})};dk=function(e){const t=e.target.value;$i(this,Qn,Gf).call(this,{...this.condition,operator:t})};fl=function(e){const t=e.target.value;$i(this,Qn,Gf).call(this,{...this.condition,value:t})};fk=function(){this.dispatchEvent(new CustomEvent("filter-removed",{detail:{index:this.index}}))};pk=function(){const{field:e}=this.condition;return e==="tag"?E`
        <select @change=${$i(this,Qn,fl)}>
          <option value="">--</option>
          ${this.tags.map(t=>E`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="merchant"?E`
        <select @change=${$i(this,Qn,fl)}>
          <option value="">--</option>
          ${this.merchants.map(t=>E`<option value=${t.id} ?selected=${this.condition.value===t.id}>${t.name}</option>`)}
        </select>
      `:e==="amount"?E`
        <input
          type="number"
          placeholder="e.g. 0"
          .value=${this.condition.value}
          @input=${$i(this,Qn,fl)}
        />
      `:E`
      <input
        type="text"
        placeholder="value"
        .value=${this.condition.value}
        @input=${$i(this,Qn,fl)}
      />
    `};Wo.styles=[Dc,pt`
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
    `];sh([H({type:Object})],Wo.prototype,"condition",2);sh([H({type:Number})],Wo.prototype,"index",2);sh([H({type:Array})],Wo.prototype,"tags",2);sh([H({type:Array})],Wo.prototype,"merchants",2);Wo=sh([Et("chart-filter-row")],Wo);var U5=Object.defineProperty,Y5=Object.getOwnPropertyDescriptor,mk=e=>{throw TypeError(e)},Wn=(e,t,n,i)=>{for(var r=i>1?void 0:i?Y5(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&U5(t,n,r),r},q5=(e,t,n)=>t.has(e)||mk("Cannot "+n),V5=(e,t,n)=>t.has(e)?mk("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),co=(e,t,n)=>(q5(e,t,"access private method"),n),xr,vk,yk,bk,_k,wk,xk,Ck;const eg=new Set(["pie","doughnut"]);let tn=class extends mt{constructor(){super(...arguments),V5(this,xr),this.transactions=[],this.tags=[],this.merchants=[],this._title="",this._chartType="bar",this._granularity="month",this._filters=[],this._excludedTagIds=[],this._excludedMerchantIds=[],this._legendPosition="top",this._showExclusions=!1,this._initialized=!1}updated(e){e.has("editingChart")&&this.editingChart&&!this._initialized&&(this._title=this.editingChart.title,this._chartType=this.editingChart.chartType,this._granularity=this.editingChart.granularity,this._filters=this.editingChart.filters??co(this,xr,vk).call(this,this.editingChart),this._excludedTagIds=this.editingChart.excludedTagIds??[],this._excludedMerchantIds=this.editingChart.excludedMerchantIds??[],this._legendPosition=this.editingChart.legendPosition??"top",this._initialized=!0)}render(){return E`
      <h4>${this.editingChart?"Edit Chart":"Add Chart"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${e=>{this._title=e.target.value}}
        />
        <label>Type:</label>
        <select @change=${e=>{this._chartType=e.target.value,eg.has(this._chartType)&&!["byTag","byMerchant","month"].includes(this._granularity)&&(this._granularity="byTag")}}>
          <option value="bar" ?selected=${this._chartType==="bar"}>Bar</option>
          <option value="line" ?selected=${this._chartType==="line"}>Line</option>
          <option value="pie" ?selected=${this._chartType==="pie"}>Pie</option>
          <option value="doughnut" ?selected=${this._chartType==="doughnut"}>Doughnut</option>
        </select>
        <label>${eg.has(this._chartType)?"Split by:":"Group by:"}</label>
        <select @change=${e=>{this._granularity=e.target.value}}>
          ${eg.has(this._chartType)?E`
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
            @filter-changed=${co(this,xr,yk)}
            @filter-removed=${co(this,xr,bk)}
          ></chart-filter-row>
        `)}
        <button class="add-filter" @click=${co(this,xr,_k)}>+ Add filter</button>
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
      ${co(this,xr,xk).call(this)}
      <button @click=${co(this,xr,wk)}>${this.editingChart?"Update Chart":"Save to Dashboard"}</button>
    `}};xr=new WeakSet;vk=function(e){const t=[];return e.tagId&&t.push({field:"tag",operator:"is",value:e.tagId}),e.merchantId&&t.push({field:"merchant",operator:"is",value:e.merchantId}),e.direction==="debit"?t.push({field:"amount",operator:"lt",value:"0"}):e.direction==="credit"&&t.push({field:"amount",operator:"gt",value:"0"}),e.descriptionFilter&&t.push({field:"description",operator:e.descriptionFilterMode==="include"?"contains":"excludes",value:e.descriptionFilter}),t};yk=function(e){const{index:t,condition:n}=e.detail;this._filters=this._filters.map((i,r)=>r===t?n:i)};bk=function(e){const{index:t}=e.detail;this._filters=this._filters.filter((n,i)=>i!==t)};_k=function(){this._filters=[...this._filters,{field:"tag",operator:"is",value:""}]};wk=function(){const e=this._title.trim();if(!e)return;const t=this._filters.filter(n=>n.value.trim());this.dispatchEvent(new CustomEvent("chart-saved",{detail:{id:this.editingChart?.id,title:e,chartType:this._chartType,granularity:this._granularity,excludedTagIds:this._excludedTagIds.length>0?this._excludedTagIds:void 0,excludedMerchantIds:this._excludedMerchantIds.length>0?this._excludedMerchantIds:void 0,legendPosition:this._legendPosition,filters:t.length>0?t:void 0}})),this._title="",this._initialized=!1};xk=function(){if(this._granularity!=="byTag"&&this._granularity!=="byMerchant")return"";const e=this._granularity==="byTag"?this.tags:this.merchants,t=this._granularity==="byTag"?this._excludedTagIds:this._excludedMerchantIds,n=this._granularity==="byTag"?"tags":"merchants";return E`
      <details class="exclusions" ?open=${this._showExclusions} @toggle=${i=>{this._showExclusions=i.target.open}}>
        <summary>Exclude ${n}</summary>
        <div class="checkbox-list">
          ${e.map(i=>E`
            <label>
              <input
                type="checkbox"
                ?checked=${t.includes(i.id)}
                @change=${r=>co(this,xr,Ck).call(this,i.id,r.target.checked)}
              />
              ${i.name}
            </label>
          `)}
        </div>
      </details>
    `};Ck=function(e,t){this._granularity==="byTag"?this._excludedTagIds=t?[...this._excludedTagIds,e]:this._excludedTagIds.filter(n=>n!==e):this._excludedMerchantIds=t?[...this._excludedMerchantIds,e]:this._excludedMerchantIds.filter(n=>n!==e)};tn.styles=[Li,pt`
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
    `];Wn([H({type:Array})],tn.prototype,"transactions",2);Wn([H({type:Array})],tn.prototype,"tags",2);Wn([H({type:Array})],tn.prototype,"merchants",2);Wn([H({type:Object})],tn.prototype,"editingChart",2);Wn([P()],tn.prototype,"_title",2);Wn([P()],tn.prototype,"_chartType",2);Wn([P()],tn.prototype,"_granularity",2);Wn([P()],tn.prototype,"_filters",2);Wn([P()],tn.prototype,"_excludedTagIds",2);Wn([P()],tn.prototype,"_excludedMerchantIds",2);Wn([P()],tn.prototype,"_legendPosition",2);Wn([P()],tn.prototype,"_showExclusions",2);Wn([P()],tn.prototype,"_initialized",2);tn=Wn([Et("chart-configurator")],tn);function oh(e){return e+.5|0}const bs=(e,t,n)=>Math.max(Math.min(e,n),t);function pl(e){return bs(oh(e*2.55),0,255)}function $s(e){return bs(oh(e*255),0,255)}function kr(e){return bs(oh(e/2.55)/100,0,1)}function e_(e){return bs(oh(e*100),0,100)}const ai={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},km=[..."0123456789ABCDEF"],K5=e=>km[e&15],G5=e=>km[(e&240)>>4]+km[e&15],bh=e=>(e&240)>>4===(e&15),X5=e=>bh(e.r)&&bh(e.g)&&bh(e.b)&&bh(e.a);function Q5(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&ai[e[1]]*17,g:255&ai[e[2]]*17,b:255&ai[e[3]]*17,a:t===5?ai[e[4]]*17:255}:(t===7||t===9)&&(n={r:ai[e[1]]<<4|ai[e[2]],g:ai[e[3]]<<4|ai[e[4]],b:ai[e[5]]<<4|ai[e[6]],a:t===9?ai[e[7]]<<4|ai[e[8]]:255})),n}const Z5=(e,t)=>e<255?t(e):"";function J5(e){var t=X5(e)?K5:G5;return e?"#"+t(e.r)+t(e.g)+t(e.b)+Z5(e.a,t):void 0}const t3=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function kk(e,t,n){const i=t*Math.min(n,1-n),r=(s,o=(s+e/30)%12)=>n-i*Math.max(Math.min(o-3,9-o,1),-1);return[r(0),r(8),r(4)]}function e3(e,t,n){const i=(r,s=(r+e/60)%6)=>n-n*t*Math.max(Math.min(s,4-s,1),0);return[i(5),i(3),i(1)]}function n3(e,t,n){const i=kk(e,1,.5);let r;for(t+n>1&&(r=1/(t+n),t*=r,n*=r),r=0;r<3;r++)i[r]*=1-t-n,i[r]+=t;return i}function i3(e,t,n,i,r){return e===r?(t-n)/i+(t<n?6:0):t===r?(n-e)/i+2:(e-t)/i+4}function l0(e){const n=e.r/255,i=e.g/255,r=e.b/255,s=Math.max(n,i,r),o=Math.min(n,i,r),a=(s+o)/2;let c,l,u;return s!==o&&(u=s-o,l=a>.5?u/(2-s-o):u/(s+o),c=i3(n,i,r,u,s),c=c*60+.5),[c|0,l||0,a]}function u0(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map($s)}function h0(e,t,n){return u0(kk,e,t,n)}function r3(e,t,n){return u0(n3,e,t,n)}function s3(e,t,n){return u0(e3,e,t,n)}function Sk(e){return(e%360+360)%360}function o3(e){const t=t3.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?pl(+t[5]):$s(+t[5]));const r=Sk(+t[2]),s=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?i=r3(r,s,o):t[1]==="hsv"?i=s3(r,s,o):i=h0(r,s,o),{r:i[0],g:i[1],b:i[2],a:n}}function a3(e,t){var n=l0(e);n[0]=Sk(n[0]+t),n=h0(n),e.r=n[0],e.g=n[1],e.b=n[2]}function c3(e){if(!e)return;const t=l0(e),n=t[0],i=e_(t[1]),r=e_(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${r}%, ${kr(e.a)})`:`hsl(${n}, ${i}%, ${r}%)`}const n_={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},i_={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function l3(){const e={},t=Object.keys(i_),n=Object.keys(n_);let i,r,s,o,a;for(i=0;i<t.length;i++){for(o=a=t[i],r=0;r<n.length;r++)s=n[r],a=a.replace(s,n_[s]);s=parseInt(i_[o],16),e[a]=[s>>16&255,s>>8&255,s&255]}return e}let _h;function u3(e){_h||(_h=l3(),_h.transparent=[0,0,0,0]);const t=_h[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const h3=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function d3(e){const t=h3.exec(e);let n=255,i,r,s;if(t){if(t[7]!==i){const o=+t[7];n=t[8]?pl(o):bs(o*255,0,255)}return i=+t[1],r=+t[3],s=+t[5],i=255&(t[2]?pl(i):bs(i,0,255)),r=255&(t[4]?pl(r):bs(r,0,255)),s=255&(t[6]?pl(s):bs(s,0,255)),{r:i,g:r,b:s,a:n}}}function f3(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${kr(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const ng=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,pa=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function p3(e,t,n){const i=pa(kr(e.r)),r=pa(kr(e.g)),s=pa(kr(e.b));return{r:$s(ng(i+n*(pa(kr(t.r))-i))),g:$s(ng(r+n*(pa(kr(t.g))-r))),b:$s(ng(s+n*(pa(kr(t.b))-s))),a:e.a+n*(t.a-e.a)}}function wh(e,t,n){if(e){let i=l0(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=h0(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function Ek(e,t){return e&&Object.assign(t||{},e)}function r_(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=$s(e[3]))):(t=Ek(e,{r:0,g:0,b:0,a:1}),t.a=$s(t.a)),t}function g3(e){return e.charAt(0)==="r"?d3(e):o3(e)}class _u{constructor(t){if(t instanceof _u)return t;const n=typeof t;let i;n==="object"?i=r_(t):n==="string"&&(i=Q5(t)||u3(t)||g3(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Ek(this._rgb);return t&&(t.a=kr(t.a)),t}set rgb(t){this._rgb=r_(t)}rgbString(){return this._valid?f3(this._rgb):void 0}hexString(){return this._valid?J5(this._rgb):void 0}hslString(){return this._valid?c3(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,r=t.rgb;let s;const o=n===s?.5:n,a=2*o-1,c=i.a-r.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;s=1-l,i.r=255&l*i.r+s*r.r+.5,i.g=255&l*i.g+s*r.g+.5,i.b=255&l*i.b+s*r.b+.5,i.a=o*i.a+(1-o)*r.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=p3(this._rgb,t._rgb,n)),this}clone(){return new _u(this.rgb)}alpha(t){return this._rgb.a=$s(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=oh(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return wh(this._rgb,2,t),this}darken(t){return wh(this._rgb,2,-t),this}saturate(t){return wh(this._rgb,1,t),this}desaturate(t){return wh(this._rgb,1,-t),this}rotate(t){return a3(this._rgb,t),this}}function yr(){}const m3=(()=>{let e=0;return()=>e++})();function vt(e){return e==null}function Xt(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function _t(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function ue(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function qn(e,t){return ue(e)?e:t}function lt(e,t){return typeof e>"u"?t:e}const v3=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,Mk=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function Wt(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function It(e,t,n,i){let r,s,o;if(Xt(e))for(s=e.length,r=0;r<s;r++)t.call(n,e[r],r);else if(_t(e))for(o=Object.keys(e),s=o.length,r=0;r<s;r++)t.call(n,e[o[r]],o[r])}function nf(e,t){let n,i,r,s;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(r=e[n],s=t[n],r.datasetIndex!==s.datasetIndex||r.index!==s.index)return!1;return!0}function rf(e){if(Xt(e))return e.map(rf);if(_t(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let r=0;for(;r<i;++r)t[n[r]]=rf(e[n[r]]);return t}return e}function Dk(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function y3(e,t,n,i){if(!Dk(e))return;const r=t[e],s=n[e];_t(r)&&_t(s)?cc(r,s,i):t[e]=rf(s)}function cc(e,t,n){const i=Xt(t)?t:[t],r=i.length;if(!_t(e))return e;n=n||{};const s=n.merger||y3;let o;for(let a=0;a<r;++a){if(o=i[a],!_t(o))continue;const c=Object.keys(o);for(let l=0,u=c.length;l<u;++l)s(c[l],e,o,n)}return e}function Ul(e,t){return cc(e,t,{merger:b3})}function b3(e,t,n){if(!Dk(e))return;const i=t[e],r=n[e];_t(i)&&_t(r)?Ul(i,r):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=rf(r))}const s_={"":e=>e,x:e=>e.x,y:e=>e.y};function _3(e){const t=e.split("."),n=[];let i="";for(const r of t)i+=r,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function w3(e){const t=_3(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function Ls(e,t){return(s_[t]||(s_[t]=w3(t)))(e)}function d0(e){return e.charAt(0).toUpperCase()+e.slice(1)}const wu=e=>typeof e<"u",Ns=e=>typeof e=="function",o_=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function x3(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Dt=Math.PI,Yt=2*Dt,C3=Yt+Dt,sf=Number.POSITIVE_INFINITY,k3=Dt/180,fe=Dt/2,eo=Dt/4,a_=Dt*2/3,_s=Math.log10,tr=Math.sign;function Yl(e,t,n){return Math.abs(e-t)<n}function c_(e){const t=Math.round(e);e=Yl(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(_s(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function S3(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((r,s)=>r-s).pop(),t}function E3(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function lc(e){return!E3(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function M3(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function $k(e,t,n){let i,r,s;for(i=0,r=e.length;i<r;i++)s=e[i][n],isNaN(s)||(t.min=Math.min(t.min,s),t.max=Math.max(t.max,s))}function Ti(e){return e*(Dt/180)}function f0(e){return e*(180/Dt)}function l_(e){if(!ue(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function Tk(e,t){const n=t.x-e.x,i=t.y-e.y,r=Math.sqrt(n*n+i*i);let s=Math.atan2(i,n);return s<-.5*Dt&&(s+=Yt),{angle:s,distance:r}}function Sm(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function D3(e,t){return(e-t+C3)%Yt-Dt}function Qe(e){return(e%Yt+Yt)%Yt}function xu(e,t,n,i){const r=Qe(e),s=Qe(t),o=Qe(n),a=Qe(s-r),c=Qe(o-r),l=Qe(r-s),u=Qe(r-o);return r===s||r===o||i&&s===o||a>c&&l<u}function Pe(e,t,n){return Math.max(t,Math.min(n,e))}function $3(e){return Pe(e,-32768,32767)}function $r(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function p0(e,t,n){n=n||(o=>e[o]<t);let i=e.length-1,r=0,s;for(;i-r>1;)s=r+i>>1,n(s)?r=s:i=s;return{lo:r,hi:i}}const Tr=(e,t,n,i)=>p0(e,n,i?r=>{const s=e[r][t];return s<n||s===n&&e[r+1][t]===n}:r=>e[r][t]<n),T3=(e,t,n)=>p0(e,n,i=>e[i][t]>=n);function O3(e,t,n){let i=0,r=e.length;for(;i<r&&e[i]<t;)i++;for(;r>i&&e[r-1]>n;)r--;return i>0||r<e.length?e.slice(i,r):e}const Ok=["push","pop","shift","splice","unshift"];function I3(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Ok.forEach(n=>{const i="_onData"+d0(n),r=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...s){const o=r.apply(this,s);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...s)}),o}})})}function u_(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,r=i.indexOf(t);r!==-1&&i.splice(r,1),!(i.length>0)&&(Ok.forEach(s=>{delete e[s]}),delete e._chartjs)}function Ik(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Pk=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Rk(e,t){let n=[],i=!1;return function(...r){n=r,i||(i=!0,Pk.call(window,()=>{i=!1,e.apply(t,n)}))}}function P3(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const g0=e=>e==="start"?"left":e==="end"?"right":"center",Ve=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,R3=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function Ak(e,t,n){const i=t.length;let r=0,s=i;if(e._sorted){const{iScale:o,vScale:a,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,u=o.axis,{min:h,max:d,minDefined:f,maxDefined:p}=o.getUserBounds();if(f){if(r=Math.min(Tr(c,u,h).lo,n?i:Tr(t,u,o.getPixelForValue(h)).lo),l){const g=c.slice(0,r+1).reverse().findIndex(m=>!vt(m[a.axis]));r-=Math.max(0,g)}r=Pe(r,0,i-1)}if(p){let g=Math.max(Tr(c,o.axis,d,!0).hi+1,n?0:Tr(t,u,o.getPixelForValue(d),!0).hi+1);if(l){const m=c.slice(g-1).findIndex(b=>!vt(b[a.axis]));g+=Math.max(0,m)}s=Pe(g,r,i)-r}else s=i-r}return{start:r,count:s}}function Lk(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,r={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=r,!0;const s=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,r),s}const xh=e=>e===0||e===1,h_=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*Yt/n)),d_=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*Yt/n)+1,ql={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*fe)+1,easeOutSine:e=>Math.sin(e*fe),easeInOutSine:e=>-.5*(Math.cos(Dt*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>xh(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>xh(e)?e:h_(e,.075,.3),easeOutElastic:e=>xh(e)?e:d_(e,.075,.3),easeInOutElastic(e){return xh(e)?e:e<.5?.5*h_(e*2,.1125,.45):.5+.5*d_(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-ql.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?ql.easeInBounce(e*2)*.5:ql.easeOutBounce(e*2-1)*.5+.5};function m0(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function f_(e){return m0(e)?e:new _u(e)}function ig(e){return m0(e)?e:new _u(e).saturate(.5).darken(.1).hexString()}const A3=["x","y","borderWidth","radius","tension"],L3=["color","borderColor","backgroundColor"];function N3(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:L3},numbers:{type:"number",properties:A3}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function F3(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const p_=new Map;function z3(e,t){t=t||{};const n=e+JSON.stringify(t);let i=p_.get(n);return i||(i=new Intl.NumberFormat(e,t),p_.set(n,i)),i}function ah(e,t,n){return z3(t,n).format(e)}const Nk={values(e){return Xt(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let r,s=e;if(n.length>1){const l=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(l<1e-4||l>1e15)&&(r="scientific"),s=j3(e,n)}const o=_s(Math.abs(s)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:r,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(c,this.options.ticks.format),ah(e,i,c)},logarithmic(e,t,n){if(e===0)return"0";const i=n[t].significand||e/Math.pow(10,Math.floor(_s(e)));return[1,2,3,5,10,15].includes(i)||t>.8*n.length?Nk.numeric.call(this,e,t,n):""}};function j3(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Xf={formatters:Nk};function B3(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Xf.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Ho=Object.create(null),Em=Object.create(null);function Vl(e,t){if(!t)return e;const n=t.split(".");for(let i=0,r=n.length;i<r;++i){const s=n[i];e=e[s]||(e[s]=Object.create(null))}return e}function rg(e,t,n){return typeof t=="string"?cc(Vl(e,t),n):cc(Vl(e,""),t)}class W3{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,r)=>ig(r.backgroundColor),this.hoverBorderColor=(i,r)=>ig(r.borderColor),this.hoverColor=(i,r)=>ig(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return rg(this,t,n)}get(t){return Vl(this,t)}describe(t,n){return rg(Em,t,n)}override(t,n){return rg(Ho,t,n)}route(t,n,i,r){const s=Vl(this,t),o=Vl(this,i),a="_"+n;Object.defineProperties(s,{[a]:{value:s[n],writable:!0},[n]:{enumerable:!0,get(){const c=this[a],l=o[r];return _t(c)?Object.assign({},l,c):lt(c,l)},set(c){this[a]=c}}})}apply(t){t.forEach(n=>n(this))}}var Zt=new W3({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[N3,F3,B3]);function H3(e){return!e||vt(e.size)||vt(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function of(e,t,n,i,r){let s=t[r];return s||(s=t[r]=e.measureText(r).width,n.push(r)),s>i&&(i=s),i}function U3(e,t,n,i){i=i||{};let r=i.data=i.data||{},s=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(r=i.data={},s=i.garbageCollect=[],i.font=t),e.save(),e.font=t;let o=0;const a=n.length;let c,l,u,h,d;for(c=0;c<a;c++)if(h=n[c],h!=null&&!Xt(h))o=of(e,r,s,o,h);else if(Xt(h))for(l=0,u=h.length;l<u;l++)d=h[l],d!=null&&!Xt(d)&&(o=of(e,r,s,o,d));e.restore();const f=s.length/2;if(f>n.length){for(c=0;c<f;c++)delete r[s[c]];s.splice(0,f)}return o}function no(e,t,n){const i=e.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((t-r)*i)/i+r}function g_(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function Mm(e,t,n,i){Fk(e,t,n,i,null)}function Fk(e,t,n,i,r){let s,o,a,c,l,u,h,d;const f=t.pointStyle,p=t.rotation,g=t.radius;let m=(p||0)*k3;if(f&&typeof f=="object"&&(s=f.toString(),s==="[object HTMLImageElement]"||s==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(m),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(g)||g<=0)){switch(e.beginPath(),f){default:r?e.ellipse(n,i,r/2,g,0,0,Yt):e.arc(n,i,g,0,Yt),e.closePath();break;case"triangle":u=r?r/2:g,e.moveTo(n+Math.sin(m)*u,i-Math.cos(m)*g),m+=a_,e.lineTo(n+Math.sin(m)*u,i-Math.cos(m)*g),m+=a_,e.lineTo(n+Math.sin(m)*u,i-Math.cos(m)*g),e.closePath();break;case"rectRounded":l=g*.516,c=g-l,o=Math.cos(m+eo)*c,h=Math.cos(m+eo)*(r?r/2-l:c),a=Math.sin(m+eo)*c,d=Math.sin(m+eo)*(r?r/2-l:c),e.arc(n-h,i-a,l,m-Dt,m-fe),e.arc(n+d,i-o,l,m-fe,m),e.arc(n+h,i+a,l,m,m+fe),e.arc(n-d,i+o,l,m+fe,m+Dt),e.closePath();break;case"rect":if(!p){c=Math.SQRT1_2*g,u=r?r/2:c,e.rect(n-u,i-c,2*u,2*c);break}m+=eo;case"rectRot":h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+d,i-o),e.lineTo(n+h,i+a),e.lineTo(n-d,i+o),e.closePath();break;case"crossRot":m+=eo;case"cross":h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"star":h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o),m+=eo,h=Math.cos(m)*(r?r/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,d=Math.sin(m)*(r?r/2:g),e.moveTo(n-h,i-a),e.lineTo(n+h,i+a),e.moveTo(n+d,i-o),e.lineTo(n-d,i+o);break;case"line":o=r?r/2:Math.cos(m)*g,a=Math.sin(m)*g,e.moveTo(n-o,i-a),e.lineTo(n+o,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(m)*(r?r/2:g),i+Math.sin(m)*g);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Or(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function Qf(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Zf(e){e.restore()}function Y3(e,t,n,i,r){if(!t)return e.lineTo(n.x,n.y);if(r==="middle"){const s=(t.x+n.x)/2;e.lineTo(s,t.y),e.lineTo(s,n.y)}else r==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function q3(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function V3(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),vt(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function K3(e,t,n,i,r){if(r.strikethrough||r.underline){const s=e.measureText(i),o=t-s.actualBoundingBoxLeft,a=t+s.actualBoundingBoxRight,c=n-s.actualBoundingBoxAscent,l=n+s.actualBoundingBoxDescent,u=r.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=r.decorationWidth||2,e.moveTo(o,u),e.lineTo(a,u),e.stroke()}}function G3(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function Uo(e,t,n,i,r,s={}){const o=Xt(t)?t:[t],a=s.strokeWidth>0&&s.strokeColor!=="";let c,l;for(e.save(),e.font=r.string,V3(e,s),c=0;c<o.length;++c)l=o[c],s.backdrop&&G3(e,s.backdrop),a&&(s.strokeColor&&(e.strokeStyle=s.strokeColor),vt(s.strokeWidth)||(e.lineWidth=s.strokeWidth),e.strokeText(l,n,i,s.maxWidth)),e.fillText(l,n,i,s.maxWidth),K3(e,n,i,l,s),i+=Number(r.lineHeight);e.restore()}function Cu(e,t){const{x:n,y:i,w:r,h:s,radius:o}=t;e.arc(n+o.topLeft,i+o.topLeft,o.topLeft,1.5*Dt,Dt,!0),e.lineTo(n,i+s-o.bottomLeft),e.arc(n+o.bottomLeft,i+s-o.bottomLeft,o.bottomLeft,Dt,fe,!0),e.lineTo(n+r-o.bottomRight,i+s),e.arc(n+r-o.bottomRight,i+s-o.bottomRight,o.bottomRight,fe,0,!0),e.lineTo(n+r,i+o.topRight),e.arc(n+r-o.topRight,i+o.topRight,o.topRight,0,-fe,!0),e.lineTo(n+o.topLeft,i)}const X3=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Q3=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Z3(e,t){const n=(""+e).match(X3);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const J3=e=>+e||0;function v0(e,t){const n={},i=_t(t),r=i?Object.keys(t):t,s=_t(e)?i?o=>lt(e[o],e[t[o]]):o=>e[o]:()=>e;for(const o of r)n[o]=J3(s(o));return n}function zk(e){return v0(e,{top:"y",right:"x",bottom:"y",left:"x"})}function ko(e){return v0(e,["topLeft","topRight","bottomLeft","bottomRight"])}function en(e){const t=zk(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Ce(e,t){e=e||{},t=t||Zt.font;let n=lt(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=lt(e.style,t.style);i&&!(""+i).match(Q3)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const r={family:lt(e.family,t.family),lineHeight:Z3(lt(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:lt(e.weight,t.weight),string:""};return r.string=H3(r),r}function gl(e,t,n,i){let r,s,o;for(r=0,s=e.length;r<s;++r)if(o=e[r],o!==void 0&&o!==void 0)return o}function tN(e,t,n){const{min:i,max:r}=e,s=Mk(t,(r-i)/2),o=(a,c)=>n&&a===0?0:a+c;return{min:o(i,-Math.abs(s)),max:o(r,s)}}function Ys(e,t){return Object.assign(Object.create(e),t)}function y0(e,t=[""],n,i,r=()=>e[0]){const s=n||e;typeof i>"u"&&(i=Hk("_fallback",e));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:s,_fallback:i,_getTarget:r,override:a=>y0([a,...e],t,s,i)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete e[0][c],!0},get(a,c){return Bk(a,c,()=>cN(c,t,e,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,c){return v_(a).includes(c)},ownKeys(a){return v_(a)},set(a,c,l){const u=a._storage||(a._storage=r());return a[c]=u[c]=l,delete a._keys,!0}})}function uc(e,t,n,i){const r={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:jk(e,i),setContext:s=>uc(e,s,n,i),override:s=>uc(e.override(s),t,n,i)};return new Proxy(r,{deleteProperty(s,o){return delete s[o],delete e[o],!0},get(s,o,a){return Bk(s,o,()=>nN(s,o,a))},getOwnPropertyDescriptor(s,o){return s._descriptors.allKeys?Reflect.has(e,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,o)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(s,o){return Reflect.has(e,o)},ownKeys(){return Reflect.ownKeys(e)},set(s,o,a){return e[o]=a,delete s[o],!0}})}function jk(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:r=t.allKeys}=e;return{allKeys:r,scriptable:n,indexable:i,isScriptable:Ns(n)?n:()=>n,isIndexable:Ns(i)?i:()=>i}}const eN=(e,t)=>e?e+d0(t):t,b0=(e,t)=>_t(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Bk(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function nN(e,t,n){const{_proxy:i,_context:r,_subProxy:s,_descriptors:o}=e;let a=i[t];return Ns(a)&&o.isScriptable(t)&&(a=iN(t,a,e,n)),Xt(a)&&a.length&&(a=rN(t,a,e,o.isIndexable)),b0(t,a)&&(a=uc(a,r,s&&s[t],o)),a}function iN(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let c=t(s,o||i);return a.delete(e),b0(e,c)&&(c=_0(r._scopes,r,e,c)),c}function rN(e,t,n,i){const{_proxy:r,_context:s,_subProxy:o,_descriptors:a}=n;if(typeof s.index<"u"&&i(e))return t[s.index%t.length];if(_t(t[0])){const c=t,l=r._scopes.filter(u=>u!==c);t=[];for(const u of c){const h=_0(l,r,e,u);t.push(uc(h,s,o&&o[e],a))}}return t}function Wk(e,t,n){return Ns(e)?e(t,n):e}const sN=(e,t)=>e===!0?t:typeof e=="string"?Ls(t,e):void 0;function oN(e,t,n,i,r){for(const s of t){const o=sN(n,s);if(o){e.add(o);const a=Wk(o._fallback,n,r);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(o===!1&&typeof i<"u"&&n!==i)return null}return!1}function _0(e,t,n,i){const r=t._rootScopes,s=Wk(t._fallback,n,i),o=[...e,...r],a=new Set;a.add(i);let c=m_(a,o,n,s||n,i);return c===null||typeof s<"u"&&s!==n&&(c=m_(a,o,s,c,i),c===null)?!1:y0(Array.from(a),[""],r,s,()=>aN(t,n,i))}function m_(e,t,n,i,r){for(;n;)n=oN(e,t,n,i,r);return n}function aN(e,t,n){const i=e._getTarget();t in i||(i[t]={});const r=i[t];return Xt(r)&&_t(n)?n:r||{}}function cN(e,t,n,i){let r;for(const s of t)if(r=Hk(eN(s,e),n),typeof r<"u")return b0(e,r)?_0(n,i,e,r):r}function Hk(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function v_(e){let t=e._keys;return t||(t=e._keys=lN(e._scopes)),t}function lN(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(r=>!r.startsWith("_")))t.add(i);return Array.from(t)}function Uk(e,t,n,i){const{iScale:r}=e,{key:s="r"}=this._parsing,o=new Array(i);let a,c,l,u;for(a=0,c=i;a<c;++a)l=a+n,u=t[l],o[a]={r:r.parse(Ls(u,s),l)};return o}const uN=Number.EPSILON||1e-14,hc=(e,t)=>t<e.length&&!e[t].skip&&e[t],Yk=e=>e==="x"?"y":"x";function hN(e,t,n,i){const r=e.skip?t:e,s=t,o=n.skip?t:n,a=Sm(s,r),c=Sm(o,s);let l=a/(a+c),u=c/(a+c);l=isNaN(l)?0:l,u=isNaN(u)?0:u;const h=i*l,d=i*u;return{previous:{x:s.x-h*(o.x-r.x),y:s.y-h*(o.y-r.y)},next:{x:s.x+d*(o.x-r.x),y:s.y+d*(o.y-r.y)}}}function dN(e,t,n){const i=e.length;let r,s,o,a,c,l=hc(e,0);for(let u=0;u<i-1;++u)if(c=l,l=hc(e,u+1),!(!c||!l)){if(Yl(t[u],0,uN)){n[u]=n[u+1]=0;continue}r=n[u]/t[u],s=n[u+1]/t[u],a=Math.pow(r,2)+Math.pow(s,2),!(a<=9)&&(o=3/Math.sqrt(a),n[u]=r*o*t[u],n[u+1]=s*o*t[u])}}function fN(e,t,n="x"){const i=Yk(n),r=e.length;let s,o,a,c=hc(e,0);for(let l=0;l<r;++l){if(o=a,a=c,c=hc(e,l+1),!a)continue;const u=a[n],h=a[i];o&&(s=(u-o[n])/3,a[`cp1${n}`]=u-s,a[`cp1${i}`]=h-s*t[l]),c&&(s=(c[n]-u)/3,a[`cp2${n}`]=u+s,a[`cp2${i}`]=h+s*t[l])}}function pN(e,t="x"){const n=Yk(t),i=e.length,r=Array(i).fill(0),s=Array(i);let o,a,c,l=hc(e,0);for(o=0;o<i;++o)if(a=c,c=l,l=hc(e,o+1),!!c){if(l){const u=l[t]-c[t];r[o]=u!==0?(l[n]-c[n])/u:0}s[o]=a?l?tr(r[o-1])!==tr(r[o])?0:(r[o-1]+r[o])/2:r[o-1]:r[o]}dN(e,r,s),fN(e,s,t)}function Ch(e,t,n){return Math.max(Math.min(e,n),t)}function gN(e,t){let n,i,r,s,o,a=Or(e[0],t);for(n=0,i=e.length;n<i;++n)o=s,s=a,a=n<i-1&&Or(e[n+1],t),s&&(r=e[n],o&&(r.cp1x=Ch(r.cp1x,t.left,t.right),r.cp1y=Ch(r.cp1y,t.top,t.bottom)),a&&(r.cp2x=Ch(r.cp2x,t.left,t.right),r.cp2y=Ch(r.cp2y,t.top,t.bottom)))}function mN(e,t,n,i,r){let s,o,a,c;if(t.spanGaps&&(e=e.filter(l=>!l.skip)),t.cubicInterpolationMode==="monotone")pN(e,r);else{let l=i?e[e.length-1]:e[0];for(s=0,o=e.length;s<o;++s)a=e[s],c=hN(l,a,e[Math.min(s+1,o-(i?0:1))%o],t.tension),a.cp1x=c.previous.x,a.cp1y=c.previous.y,a.cp2x=c.next.x,a.cp2y=c.next.y,l=a}t.capBezierPoints&&gN(e,n)}function w0(){return typeof window<"u"&&typeof document<"u"}function x0(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function af(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const Jf=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function vN(e,t){return Jf(e).getPropertyValue(t)}const yN=["top","right","bottom","left"];function So(e,t,n){const i={};n=n?"-"+n:"";for(let r=0;r<4;r++){const s=yN[r];i[s]=parseFloat(e[t+"-"+s+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const bN=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function _N(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:r,offsetY:s}=i;let o=!1,a,c;if(bN(r,s,e.target))a=r,c=s;else{const l=t.getBoundingClientRect();a=i.clientX-l.left,c=i.clientY-l.top,o=!0}return{x:a,y:c,box:o}}function lo(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,r=Jf(n),s=r.boxSizing==="border-box",o=So(r,"padding"),a=So(r,"border","width"),{x:c,y:l,box:u}=_N(e,n),h=o.left+(u&&a.left),d=o.top+(u&&a.top);let{width:f,height:p}=t;return s&&(f-=o.width+a.width,p-=o.height+a.height),{x:Math.round((c-h)/f*n.width/i),y:Math.round((l-d)/p*n.height/i)}}function wN(e,t,n){let i,r;if(t===void 0||n===void 0){const s=e&&x0(e);if(!s)t=e.clientWidth,n=e.clientHeight;else{const o=s.getBoundingClientRect(),a=Jf(s),c=So(a,"border","width"),l=So(a,"padding");t=o.width-l.width-c.width,n=o.height-l.height-c.height,i=af(a.maxWidth,s,"clientWidth"),r=af(a.maxHeight,s,"clientHeight")}}return{width:t,height:n,maxWidth:i||sf,maxHeight:r||sf}}const ws=e=>Math.round(e*10)/10;function xN(e,t,n,i){const r=Jf(e),s=So(r,"margin"),o=af(r.maxWidth,e,"clientWidth")||sf,a=af(r.maxHeight,e,"clientHeight")||sf,c=wN(e,t,n);let{width:l,height:u}=c;if(r.boxSizing==="content-box"){const d=So(r,"border","width"),f=So(r,"padding");l-=f.width+d.width,u-=f.height+d.height}return l=Math.max(0,l-s.width),u=Math.max(0,i?l/i:u-s.height),l=ws(Math.min(l,o,c.maxWidth)),u=ws(Math.min(u,a,c.maxHeight)),l&&!u&&(u=ws(l/2)),(t!==void 0||n!==void 0)&&i&&c.height&&u>c.height&&(u=c.height,l=ws(Math.floor(u*i))),{width:l,height:u}}function y_(e,t,n){const i=t||1,r=ws(e.height*i),s=ws(e.width*i);e.height=ws(e.height),e.width=ws(e.width);const o=e.canvas;return o.style&&(n||!o.style.height&&!o.style.width)&&(o.style.height=`${e.height}px`,o.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||o.height!==r||o.width!==s?(e.currentDevicePixelRatio=i,o.height=r,o.width=s,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const CN=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};w0()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function b_(e,t){const n=vN(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function uo(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function kN(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function SN(e,t,n,i){const r={x:e.cp2x,y:e.cp2y},s={x:t.cp1x,y:t.cp1y},o=uo(e,r,n),a=uo(r,s,n),c=uo(s,t,n),l=uo(o,a,n),u=uo(a,c,n);return uo(l,u,n)}const EN=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},MN=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function ja(e,t,n){return e?EN(t,n):MN()}function qk(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function Vk(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function Kk(e){return e==="angle"?{between:xu,compare:D3,normalize:Qe}:{between:$r,compare:(t,n)=>t-n,normalize:t=>t}}function __({start:e,end:t,count:n,loop:i,style:r}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:r}}function DN(e,t,n){const{property:i,start:r,end:s}=n,{between:o,normalize:a}=Kk(i),c=t.length;let{start:l,end:u,loop:h}=e,d,f;if(h){for(l+=c,u+=c,d=0,f=c;d<f&&o(a(t[l%c][i]),r,s);++d)l--,u--;l%=c,u%=c}return u<l&&(u+=c),{start:l,end:u,loop:h,style:e.style}}function Gk(e,t,n){if(!n)return[e];const{property:i,start:r,end:s}=n,o=t.length,{compare:a,between:c,normalize:l}=Kk(i),{start:u,end:h,loop:d,style:f}=DN(e,t,n),p=[];let g=!1,m=null,b,_,C;const S=()=>c(r,C,b)&&a(r,C)!==0,k=()=>a(s,b)===0||c(s,C,b),$=()=>g||S(),D=()=>!g||k();for(let w=u,x=u;w<=h;++w)_=t[w%o],!_.skip&&(b=l(_[i]),b!==C&&(g=c(b,r,s),m===null&&$()&&(m=a(b,r)===0?w:x),m!==null&&D()&&(p.push(__({start:m,end:w,loop:d,count:o,style:f})),m=null),x=w,C=b));return m!==null&&p.push(__({start:m,end:h,loop:d,count:o,style:f})),p}function Xk(e,t){const n=[],i=e.segments;for(let r=0;r<i.length;r++){const s=Gk(i[r],e.points,t);s.length&&n.push(...s)}return n}function $N(e,t,n,i){let r=0,s=t-1;if(n&&!i)for(;r<t&&!e[r].skip;)r++;for(;r<t&&e[r].skip;)r++;for(r%=t,n&&(s+=r);s>r&&e[s%t].skip;)s--;return s%=t,{start:r,end:s}}function TN(e,t,n,i){const r=e.length,s=[];let o=t,a=e[t],c;for(c=t+1;c<=n;++c){const l=e[c%r];l.skip||l.stop?a.skip||(i=!1,s.push({start:t%r,end:(c-1)%r,loop:i}),t=o=l.stop?c:null):(o=c,a.skip&&(t=c)),a=l}return o!==null&&s.push({start:t%r,end:o%r,loop:i}),s}function ON(e,t){const n=e.points,i=e.options.spanGaps,r=n.length;if(!r)return[];const s=!!e._loop,{start:o,end:a}=$N(n,r,s,i);if(i===!0)return w_(e,[{start:o,end:a,loop:s}],n,t);const c=a<o?a+r:a,l=!!e._fullLoop&&o===0&&a===r-1;return w_(e,TN(n,o,c,l),n,t)}function w_(e,t,n,i){return!i||!i.setContext||!n?t:IN(e,t,n,i)}function IN(e,t,n,i){const r=e._chart.getContext(),s=x_(e.options),{_datasetIndex:o,options:{spanGaps:a}}=e,c=n.length,l=[];let u=s,h=t[0].start,d=h;function f(p,g,m,b){const _=a?-1:1;if(p!==g){for(p+=c;n[p%c].skip;)p-=_;for(;n[g%c].skip;)g+=_;p%c!==g%c&&(l.push({start:p%c,end:g%c,loop:m,style:b}),u=b,h=g%c)}}for(const p of t){h=a?h:p.start;let g=n[h%c],m;for(d=h+1;d<=p.end;d++){const b=n[d%c];m=x_(i.setContext(Ys(r,{type:"segment",p0:g,p1:b,p0DataIndex:(d-1)%c,p1DataIndex:d%c,datasetIndex:o}))),PN(m,u)&&f(h,d-1,p.loop,u),g=b,u=m}h<d-1&&f(h,d-1,p.loop,u)}return l}function x_(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function PN(e,t){if(!t)return!1;const n=[],i=function(r,s){return m0(s)?(n.includes(s)||n.push(s),n.indexOf(s)):s};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function kh(e,t,n){return e.options.clip?e[n]:t[n]}function RN(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:kh(n,t,"left"),right:kh(n,t,"right"),top:kh(i,t,"top"),bottom:kh(i,t,"bottom")}:t}function Qk(e,t){const n=t._clip;if(n.disabled)return!1;const i=RN(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}class AN{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,r){const s=n.listeners[r],o=n.duration;s.forEach(a=>a({chart:t,initial:n.initial,numSteps:o,currentStep:Math.min(i-n.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=Pk.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,r)=>{if(!i.running||!i.items.length)return;const s=i.items;let o=s.length-1,a=!1,c;for(;o>=0;--o)c=s[o],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),a=!0):(s[o]=s[s.length-1],s.pop());a&&(r.draw(),this._notify(r,i,t,"progress")),s.length||(i.running=!1,this._notify(r,i,t,"complete"),i.initial=!1),n+=s.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,r)=>Math.max(i,r._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let r=i.length-1;for(;r>=0;--r)i[r].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var br=new AN;const C_="transparent",LN={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=f_(e||C_),r=i.valid&&f_(t||C_);return r&&r.valid?r.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class NN{constructor(t,n,i,r){const s=n[i];r=gl([t.to,r,s,t.from]);const o=gl([t.from,s,r]);this._active=!0,this._fn=t.fn||LN[t.type||typeof o],this._easing=ql[t.easing]||ql.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=o,this._to=r,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const r=this._target[this._prop],s=i-this._start,o=this._duration-s;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=s,this._loop=!!t.loop,this._to=gl([t.to,n,r,t.from]),this._from=gl([t.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,r=this._prop,s=this._from,o=this._loop,a=this._to;let c;if(this._active=s!==a&&(o||n<i),!this._active){this._target[r]=a,this._notify(!0);return}if(n<0){this._target[r]=s;return}c=n/i%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[r]=this._fn(s,a,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let r=0;r<i.length;r++)i[r][n]()}}class Zk{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!_t(t))return;const n=Object.keys(Zt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(r=>{const s=t[r];if(!_t(s))return;const o={};for(const a of n)o[a]=s[a];(Xt(s.properties)&&s.properties||[r]).forEach(a=>{(a===r||!i.has(a))&&i.set(a,o)})})}_animateOptions(t,n){const i=n.options,r=zN(t,i);if(!r)return[];const s=this._createAnimations(r,i);return i.$shared&&FN(t.options.$animations,i).then(()=>{t.options=i},()=>{}),s}_createAnimations(t,n){const i=this._properties,r=[],s=t.$animations||(t.$animations={}),o=Object.keys(n),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const l=o[c];if(l.charAt(0)==="$")continue;if(l==="options"){r.push(...this._animateOptions(t,n));continue}const u=n[l];let h=s[l];const d=i.get(l);if(h)if(d&&h.active()){h.update(d,u,a);continue}else h.cancel();if(!d||!d.duration){t[l]=u;continue}s[l]=h=new NN(d,t,l,u),r.push(h)}return r}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return br.add(this._chart,i),!0}}function FN(e,t){const n=[],i=Object.keys(t);for(let r=0;r<i.length;r++){const s=e[i[r]];s&&s.active()&&n.push(s.wait())}return Promise.all(n)}function zN(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function k_(e,t){const n=e&&e.options||{},i=n.reverse,r=n.min===void 0?t:0,s=n.max===void 0?t:0;return{start:i?s:r,end:i?r:s}}function jN(e,t,n){if(n===!1)return!1;const i=k_(e,n),r=k_(t,n);return{top:r.end,right:i.end,bottom:r.start,left:i.start}}function BN(e){let t,n,i,r;return _t(e)?(t=e.top,n=e.right,i=e.bottom,r=e.left):t=n=i=r=e,{top:t,right:n,bottom:i,left:r,disabled:e===!1}}function Jk(e,t){const n=[],i=e._getSortedDatasetMetas(t);let r,s;for(r=0,s=i.length;r<s;++r)n.push(i[r].index);return n}function S_(e,t,n,i={}){const r=e.keys,s=i.mode==="single";let o,a,c,l;if(t===null)return;let u=!1;for(o=0,a=r.length;o<a;++o){if(c=+r[o],c===n){if(u=!0,i.all)continue;break}l=e.values[c],ue(l)&&(s||t===0||tr(t)===tr(l))&&(t+=l)}return!u&&!i.all?0:t}function WN(e,t){const{iScale:n,vScale:i}=t,r=n.axis==="x"?"x":"y",s=i.axis==="x"?"x":"y",o=Object.keys(e),a=new Array(o.length);let c,l,u;for(c=0,l=o.length;c<l;++c)u=o[c],a[c]={[r]:u,[s]:e[u]};return a}function sg(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function HN(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function UN(e){const{min:t,max:n,minDefined:i,maxDefined:r}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function YN(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function E_(e,t,n,i){for(const r of t.getMatchingVisibleMetas(i).reverse()){const s=e[r.index];if(n&&s>0||!n&&s<0)return r.index}return null}function M_(e,t){const{chart:n,_cachedMeta:i}=e,r=n._stacks||(n._stacks={}),{iScale:s,vScale:o,index:a}=i,c=s.axis,l=o.axis,u=HN(s,o,i),h=t.length;let d;for(let f=0;f<h;++f){const p=t[f],{[c]:g,[l]:m}=p,b=p._stacks||(p._stacks={});d=b[l]=YN(r,u,g),d[a]=m,d._top=E_(d,o,!0,i.type),d._bottom=E_(d,o,!1,i.type);const _=d._visualValues||(d._visualValues={});_[a]=m}}function og(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function qN(e,t){return Ys(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function VN(e,t,n){return Ys(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function Wc(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const r of t){const s=r._stacks;if(!s||s[i]===void 0||s[i][n]===void 0)return;delete s[i][n],s[i]._visualValues!==void 0&&s[i]._visualValues[n]!==void 0&&delete s[i]._visualValues[n]}}}const ag=e=>e==="reset"||e==="none",D_=(e,t)=>t?e:Object.assign({},e),KN=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:Jk(n,!0),values:null};class qs{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=sg(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Wc(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),r=(h,d,f,p)=>h==="x"?d:h==="r"?p:f,s=n.xAxisID=lt(i.xAxisID,og(t,"x")),o=n.yAxisID=lt(i.yAxisID,og(t,"y")),a=n.rAxisID=lt(i.rAxisID,og(t,"r")),c=n.indexAxis,l=n.iAxisID=r(c,s,o,a),u=n.vAxisID=r(c,o,s,a);n.xScale=this.getScaleForId(s),n.yScale=this.getScaleForId(o),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(l),n.vScale=this.getScaleForId(u)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&u_(this._data,this),t._stacked&&Wc(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(_t(n)){const r=this._cachedMeta;this._data=WN(n,r)}else if(i!==n){if(i){u_(i,this);const r=this._cachedMeta;Wc(r),r._parsed=[]}n&&Object.isExtensible(n)&&I3(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let r=!1;this._dataCheck();const s=n._stacked;n._stacked=sg(n.vScale,n),n.stack!==i.stack&&(r=!0,Wc(n),n.stack=i.stack),this._resyncElements(t),(r||s!==n._stacked)&&(M_(this,n._parsed),n._stacked=sg(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:r}=this,{iScale:s,_stacked:o}=i,a=s.axis;let c=t===0&&n===r.length?!0:i._sorted,l=t>0&&i._parsed[t-1],u,h,d;if(this._parsing===!1)i._parsed=r,i._sorted=!0,d=r;else{Xt(r[t])?d=this.parseArrayData(i,r,t,n):_t(r[t])?d=this.parseObjectData(i,r,t,n):d=this.parsePrimitiveData(i,r,t,n);const f=()=>h[a]===null||l&&h[a]<l[a];for(u=0;u<n;++u)i._parsed[u+t]=h=d[u],c&&(f()&&(c=!1),l=h);i._sorted=c}o&&M_(this,d)}parsePrimitiveData(t,n,i,r){const{iScale:s,vScale:o}=t,a=s.axis,c=o.axis,l=s.getLabels(),u=s===o,h=new Array(r);let d,f,p;for(d=0,f=r;d<f;++d)p=d+i,h[d]={[a]:u||s.parse(l[p],p),[c]:o.parse(n[p],p)};return h}parseArrayData(t,n,i,r){const{xScale:s,yScale:o}=t,a=new Array(r);let c,l,u,h;for(c=0,l=r;c<l;++c)u=c+i,h=n[u],a[c]={x:s.parse(h[0],u),y:o.parse(h[1],u)};return a}parseObjectData(t,n,i,r){const{xScale:s,yScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(r);let u,h,d,f;for(u=0,h=r;u<h;++u)d=u+i,f=n[d],l[u]={x:s.parse(Ls(f,a),d),y:o.parse(Ls(f,c),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const r=this.chart,s=this._cachedMeta,o=n[t.axis],a={keys:Jk(r,!0),values:n._stacks[t.axis]._visualValues};return S_(a,o,s.index,{mode:i})}updateRangeFromParsed(t,n,i,r){const s=i[n.axis];let o=s===null?NaN:s;const a=r&&i._stacks[n.axis];r&&a&&(r.values=a,o=S_(r,s,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,n){const i=this._cachedMeta,r=i._parsed,s=i._sorted&&t===i.iScale,o=r.length,a=this._getOtherScale(t),c=KN(n,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:u,max:h}=UN(a);let d,f;function p(){f=r[d];const g=f[a.axis];return!ue(f[t.axis])||u>g||h<g}for(d=0;d<o&&!(!p()&&(this.updateRangeFromParsed(l,t,f,c),s));++d);if(s){for(d=o-1;d>=0;--d)if(!p()){this.updateRangeFromParsed(l,t,f,c);break}}return l}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let r,s,o;for(r=0,s=n.length;r<s;++r)o=n[r][t.axis],ue(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,r=n.vScale,s=this.getParsed(t);return{label:i?""+i.getLabelForValue(s[i.axis]):"",value:r?""+r.getLabelForValue(s[r.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=BN(lt(this.options.clip,jN(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,r=i.data||[],s=n.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||r.length-a,l=this.options.drawActiveElementsOnTop;let u;for(i.dataset&&i.dataset.draw(t,s,a,c),u=a;u<a+c;++u){const h=r[u];h.hidden||(h.active&&l?o.push(h):h.draw(t,s))}for(u=0;u<o.length;++u)o[u].draw(t,s)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const r=this.getDataset();let s;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];s=o.$context||(o.$context=VN(this.getContext(),t,o)),s.parsed=this.getParsed(t),s.raw=r.data[t],s.index=s.dataIndex=t}else s=this.$context||(this.$context=qN(this.chart.getContext(),this.index)),s.dataset=r,s.index=s.datasetIndex=this.index;return s.active=!!n,s.mode=i,s}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const r=n==="active",s=this._cachedDataOpts,o=t+"-"+n,a=s[o],c=this.enableOptionSharing&&wu(i);if(a)return D_(a,c);const l=this.chart.config,u=l.datasetElementScopeKeys(this._type,t),h=r?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),u),f=Object.keys(Zt.elements[t]),p=()=>this.getContext(i,r,n),g=l.resolveNamedOptions(d,f,p,h);return g.$shared&&(g.$shared=c,s[o]=Object.freeze(D_(g,c))),g}_resolveAnimations(t,n,i){const r=this.chart,s=this._cachedDataOpts,o=`animation-${n}`,a=s[o];if(a)return a;let c;if(r.options.animation!==!1){const u=this.chart.config,h=u.datasetAnimationScopeKeys(this._type,n),d=u.getOptionScopes(this.getDataset(),h);c=u.createResolver(d,this.getContext(t,i,n))}const l=new Zk(r,c&&c.animations);return c&&c._cacheable&&(s[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||ag(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),r=this._sharedOptions,s=this.getSharedOptions(i),o=this.includeOptions(n,s)||s!==r;return this.updateSharedOptions(s,n,i),{sharedOptions:s,includeOptions:o}}updateElement(t,n,i,r){ag(r)?Object.assign(t,i):this._resolveAnimations(n,r).update(t,i)}updateSharedOptions(t,n,i){t&&!ag(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,r){t.active=r;const s=this.getStyle(n,r);this._resolveAnimations(n,i,r).update(t,{options:!r&&this.getSharedOptions(s)||s})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const r=i.length,s=n.length,o=Math.min(s,r);o&&this.parse(0,o),s>r?this._insertElements(r,s-r,t):s<r&&this._removeElements(s,r-s)}_insertElements(t,n,i=!0){const r=this._cachedMeta,s=r.data,o=t+n;let a;const c=l=>{for(l.length+=n,a=l.length-1;a>=o;a--)l[a]=l[a-n]};for(c(s),a=t;a<o;++a)s[a]=new this.dataElementType;this._parsing&&c(r._parsed),this.parse(t,n),i&&this.updateElements(s,t,n,"reset")}updateElements(t,n,i,r){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const r=i._parsed.splice(t,n);i._stacked&&Wc(i,r)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,r]=t;this[n](i,r)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function GN(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let i=[];for(let r=0,s=n.length;r<s;r++)i=i.concat(n[r].controller.getAllParsedValues(e));e._cache.$bar=Ik(i.sort((r,s)=>r-s))}return e._cache.$bar}function XN(e){const t=e.iScale,n=GN(t,e.type);let i=t._length,r,s,o,a;const c=()=>{o===32767||o===-32768||(wu(a)&&(i=Math.min(i,Math.abs(o-a)||i)),a=o)};for(r=0,s=n.length;r<s;++r)o=t.getPixelForValue(n[r]),c();for(a=void 0,r=0,s=t.ticks.length;r<s;++r)o=t.getPixelForTick(r),c();return i}function QN(e,t,n,i){const r=n.barThickness;let s,o;return vt(r)?(s=t.min*n.categoryPercentage,o=n.barPercentage):(s=r*i,o=1),{chunk:s/i,ratio:o,start:t.pixels[e]-s/2}}function ZN(e,t,n,i){const r=t.pixels,s=r[e];let o=e>0?r[e-1]:null,a=e<r.length-1?r[e+1]:null;const c=n.categoryPercentage;o===null&&(o=s-(a===null?t.end-t.start:a-s)),a===null&&(a=s+s-o);const l=s-(s-Math.min(o,a))/2*c;return{chunk:Math.abs(a-o)/2*c/i,ratio:n.barPercentage,start:l}}function JN(e,t,n,i){const r=n.parse(e[0],i),s=n.parse(e[1],i),o=Math.min(r,s),a=Math.max(r,s);let c=o,l=a;Math.abs(o)>Math.abs(a)&&(c=a,l=o),t[n.axis]=l,t._custom={barStart:c,barEnd:l,start:r,end:s,min:o,max:a}}function tS(e,t,n,i){return Xt(e)?JN(e,t,n,i):t[n.axis]=n.parse(e,i),t}function $_(e,t,n,i){const r=e.iScale,s=e.vScale,o=r.getLabels(),a=r===s,c=[];let l,u,h,d;for(l=n,u=n+i;l<u;++l)d=t[l],h={},h[r.axis]=a||r.parse(o[l],l),c.push(tS(d,h,s,l));return c}function cg(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function t6(e,t,n){return e!==0?tr(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function e6(e){let t,n,i,r,s;return e.horizontal?(t=e.base>e.x,n="left",i="right"):(t=e.base<e.y,n="bottom",i="top"),t?(r="end",s="start"):(r="start",s="end"),{start:n,end:i,reverse:t,top:r,bottom:s}}function n6(e,t,n,i){let r=t.borderSkipped;const s={};if(!r){e.borderSkipped=s;return}if(r===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:c,top:l,bottom:u}=e6(e);r==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===i?r=l:(n._bottom||0)===i?r=u:(s[T_(u,o,a,c)]=!0,r=l)),s[T_(r,o,a,c)]=!0,e.borderSkipped=s}function T_(e,t,n,i){return i?(e=i6(e,t,n),e=O_(e,n,t)):e=O_(e,t,n),e}function i6(e,t,n){return e===t?n:e===n?t:e}function O_(e,t,n){return e==="start"?t:e==="end"?n:e}function r6(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class s6 extends qs{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,n,i,r){return $_(t,n,i,r)}parseArrayData(t,n,i,r){return $_(t,n,i,r)}parseObjectData(t,n,i,r){const{iScale:s,vScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=s.axis==="x"?a:c,u=o.axis==="x"?a:c,h=[];let d,f,p,g;for(d=i,f=i+r;d<f;++d)g=n[d],p={},p[s.axis]=s.parse(Ls(g,l),d),h.push(tS(Ls(g,u),p,o,d));return h}updateRangeFromParsed(t,n,i,r){super.updateRangeFromParsed(t,n,i,r);const s=i._custom;s&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,s.min),t.max=Math.max(t.max,s.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:i,vScale:r}=n,s=this.getParsed(t),o=s._custom,a=cg(o)?"["+o.start+", "+o.end+"]":""+r.getLabelForValue(s[r.axis]);return{label:""+i.getLabelForValue(s[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,i,r){const s=r==="reset",{index:o,_cachedMeta:{vScale:a}}=this,c=a.getBasePixel(),l=a.isHorizontal(),u=this._getRuler(),{sharedOptions:h,includeOptions:d}=this._getSharedOptions(n,r);for(let f=n;f<n+i;f++){const p=this.getParsed(f),g=s||vt(p[a.axis])?{base:c,head:c}:this._calculateBarValuePixels(f),m=this._calculateBarIndexPixels(f,u),b=(p._stacks||{})[a.axis],_={horizontal:l,base:g.base,enableBorderRadius:!b||cg(p._custom)||o===b._top||o===b._bottom,x:l?g.head:m.center,y:l?m.center:g.head,height:l?m.size:Math.abs(g.size),width:l?Math.abs(g.size):m.size};d&&(_.options=h||this.resolveDataElementOptions(f,t[f].active?"active":r));const C=_.options||t[f].options;n6(_,C,b,o),r6(_,C,u.ratio),this.updateElement(t[f],f,_,r)}}_getStacks(t,n){const{iScale:i}=this._cachedMeta,r=i.getMatchingVisibleMetas(this._type).filter(u=>u.controller.options.grouped),s=i.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(n),c=a&&a[i.axis],l=u=>{const h=u._parsed.find(f=>f[i.axis]===c),d=h&&h[u.vScale.axis];if(vt(d)||isNaN(d))return!0};for(const u of r)if(!(n!==void 0&&l(u))&&((s===!1||o.indexOf(u.stack)===-1||s===void 0&&u.stack===void 0)&&o.push(u.stack),u.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[lt(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,i){const r=this._getStacks(t,i),s=n!==void 0?r.indexOf(n):-1;return s===-1?r.length-1:s}_getRuler(){const t=this.options,n=this._cachedMeta,i=n.iScale,r=[];let s,o;for(s=0,o=n.data.length;s<o;++s)r.push(i.getPixelForValue(this.getParsed(s)[i.axis],s));const a=t.barThickness;return{min:a||XN(n),pixels:r,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:i,index:r},options:{base:s,minBarLength:o}}=this,a=s||0,c=this.getParsed(t),l=c._custom,u=cg(l);let h=c[n.axis],d=0,f=i?this.applyStack(n,c,i):h,p,g;f!==h&&(d=f-h,f=h),u&&(h=l.barStart,f=l.barEnd-l.barStart,h!==0&&tr(h)!==tr(l.barEnd)&&(d=0),d+=h);const m=!vt(s)&&!u?s:d;let b=n.getPixelForValue(m);if(this.chart.getDataVisibility(t)?p=n.getPixelForValue(d+f):p=b,g=p-b,Math.abs(g)<o){g=t6(g,n,a)*o,h===a&&(b-=g/2);const _=n.getPixelForDecimal(0),C=n.getPixelForDecimal(1),S=Math.min(_,C),k=Math.max(_,C);b=Math.max(Math.min(b,k),S),p=b+g,i&&!u&&(c._stacks[n.axis]._visualValues[r]=n.getValueForPixel(p)-n.getValueForPixel(b))}if(b===n.getPixelForValue(a)){const _=tr(g)*n.getLineWidthForValue(a)/2;b+=_,g-=_}return{size:g,base:b,head:p,center:p+g/2}}_calculateBarIndexPixels(t,n){const i=n.scale,r=this.options,s=r.skipNull,o=lt(r.maxBarThickness,1/0);let a,c;const l=this._getAxisCount();if(n.grouped){const u=s?this._getStackCount(t):n.stackCount,h=r.barThickness==="flex"?ZN(t,n,r,u*l):QN(t,n,r,u*l),d=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(lt(d,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,s?t:void 0)+f;a=h.start+h.chunk*p+h.chunk/2,c=Math.min(o,h.chunk*h.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(o,n.min*n.ratio);return{base:a-c/2,head:a+c/2,center:a,size:c}}draw(){const t=this._cachedMeta,n=t.vScale,i=t.data,r=i.length;let s=0;for(;s<r;++s)this.getParsed(s)[n.axis]!==null&&!i[s].hidden&&i[s].draw(this._ctx)}}class o6 extends qs{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,i,r){const s=super.parsePrimitiveData(t,n,i,r);for(let o=0;o<s.length;o++)s[o]._custom=this.resolveDataElementOptions(o+i).radius;return s}parseArrayData(t,n,i,r){const s=super.parseArrayData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=lt(a[2],this.resolveDataElementOptions(o+i).radius)}return s}parseObjectData(t,n,i,r){const s=super.parseObjectData(t,n,i,r);for(let o=0;o<s.length;o++){const a=n[i+o];s[o]._custom=lt(a&&a.r&&+a.r,this.resolveDataElementOptions(o+i).radius)}return s}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let i=t.length-1;i>=0;--i)n=Math.max(n,t[i].size(this.resolveDataElementOptions(i))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y),l=o._custom;return{label:i[t]||"",value:"("+a+", "+c+(l?", "+l:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:c,includeOptions:l}=this._getSharedOptions(n,r),u=o.axis,h=a.axis;for(let d=n;d<n+i;d++){const f=t[d],p=!s&&this.getParsed(d),g={},m=g[u]=s?o.getPixelForDecimal(.5):o.getPixelForValue(p[u]),b=g[h]=s?a.getBasePixel():a.getPixelForValue(p[h]);g.skip=isNaN(m)||isNaN(b),l&&(g.options=c||this.resolveDataElementOptions(d,f.active?"active":r),s&&(g.options.radius=0)),this.updateElement(f,d,g,r)}}resolveDataElementOptions(t,n){const i=this.getParsed(t);let r=super.resolveDataElementOptions(t,n);r.$shared&&(r=Object.assign({},r,{$shared:!1}));const s=r.radius;return n!=="active"&&(r.radius=0),r.radius+=lt(i&&i._custom,s),r}}function a6(e,t,n){let i=1,r=1,s=0,o=0;if(t<Yt){const a=e,c=a+t,l=Math.cos(a),u=Math.sin(a),h=Math.cos(c),d=Math.sin(c),f=(C,S,k)=>xu(C,a,c,!0)?1:Math.max(S,S*n,k,k*n),p=(C,S,k)=>xu(C,a,c,!0)?-1:Math.min(S,S*n,k,k*n),g=f(0,l,h),m=f(fe,u,d),b=p(Dt,l,h),_=p(Dt+fe,u,d);i=(g-b)/2,r=(m-_)/2,s=-(g+b)/2,o=-(m+_)/2}return{ratioX:i,ratioY:r,offsetX:s,offsetY:o}}class C0 extends qs{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((c,l)=>{const h=t.getDatasetMeta(0).controller.getStyle(l);return{text:c,fillStyle:h.backgroundColor,fontColor:s,hidden:!t.getDataVisibility(l),lineDash:h.borderDash,lineDashOffset:h.borderDashOffset,lineJoin:h.borderJoinStyle,lineWidth:h.borderWidth,strokeStyle:h.borderColor,textAlign:r,pointStyle:i,borderRadius:o&&(a||h.borderRadius),index:l}}):[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}}};constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const i=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=i;else{let s=c=>+i[c];if(_t(i[t])){const{key:c="value"}=this._parsing;s=l=>+Ls(i[l],c)}let o,a;for(o=t,a=t+n;o<a;++o)r._parsed[o]=s(o)}}_getRotation(){return Ti(this.options.rotation-90)}_getCircumference(){return Ti(this.options.circumference)}_getRotationExtents(){let t=Yt,n=-Yt;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const r=this.chart.getDatasetMeta(i).controller,s=r._getRotation(),o=r._getCircumference();t=Math.min(t,s),n=Math.max(n,s+o)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:i}=n,r=this._cachedMeta,s=r.data,o=this.getMaxBorderWidth()+this.getMaxOffset(s)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),c=Math.min(v3(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:u,rotation:h}=this._getRotationExtents(),{ratioX:d,ratioY:f,offsetX:p,offsetY:g}=a6(h,u,c),m=(i.width-o)/d,b=(i.height-o)/f,_=Math.max(Math.min(m,b)/2,0),C=Mk(this.options.radius,_),S=Math.max(C*c,0),k=(C-S)/this._getVisibleDatasetWeightTotal();this.offsetX=p*C,this.offsetY=g*C,r.total=this.calculateTotal(),this.outerRadius=C-k*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-k*l,0),this.updateElements(s,0,s.length,t)}_circumference(t,n){const i=this.options,r=this._cachedMeta,s=this._getCircumference();return n&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||r._parsed[t]===null||r.data[t].hidden?0:this.calculateCircumference(r._parsed[t]*s/Yt)}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,a=o.chartArea,l=o.options.animation,u=(a.left+a.right)/2,h=(a.top+a.bottom)/2,d=s&&l.animateScale,f=d?0:this.innerRadius,p=d?0:this.outerRadius,{sharedOptions:g,includeOptions:m}=this._getSharedOptions(n,r);let b=this._getRotation(),_;for(_=0;_<n;++_)b+=this._circumference(_,s);for(_=n;_<n+i;++_){const C=this._circumference(_,s),S=t[_],k={x:u+this.offsetX,y:h+this.offsetY,startAngle:b,endAngle:b+C,circumference:C,outerRadius:p,innerRadius:f};m&&(k.options=g||this.resolveDataElementOptions(_,S.active?"active":r)),b+=C,this.updateElement(S,_,k,r)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let i=0,r;for(r=0;r<n.length;r++){const s=t._parsed[r];s!==null&&!isNaN(s)&&this.chart.getDataVisibility(r)&&!n[r].hidden&&(i+=Math.abs(s))}return i}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?Yt*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=ah(n._parsed[t],i.options.locale);return{label:r[t]||"",value:s}}getMaxBorderWidth(t){let n=0;const i=this.chart;let r,s,o,a,c;if(!t){for(r=0,s=i.data.datasets.length;r<s;++r)if(i.isDatasetVisible(r)){o=i.getDatasetMeta(r),t=o.data,a=o.controller;break}}if(!t)return 0;for(r=0,s=t.length;r<s;++r)c=a.resolveDataElementOptions(r),c.borderAlign!=="inner"&&(n=Math.max(n,c.borderWidth||0,c.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let i=0,r=t.length;i<r;++i){const s=this.resolveDataElementOptions(i);n=Math.max(n,s.offset||0,s.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(n+=this._getRingWeight(i));return n}_getRingWeight(t){return Math.max(lt(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class c6 extends qs{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:r=[],_dataset:s}=n,o=this.chart._animationsDisabled;let{start:a,count:c}=Ak(n,r,o);this._drawStart=a,this._drawCount=c,Lk(n)&&(a=0,c=r.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!s._decimated,i.points=r;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:l},t),this.updateElements(r,a,c,t)}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,{sharedOptions:u,includeOptions:h}=this._getSharedOptions(n,r),d=o.axis,f=a.axis,{spanGaps:p,segment:g}=this.options,m=lc(p)?p:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||s||r==="none",_=n+i,C=t.length;let S=n>0&&this.getParsed(n-1);for(let k=0;k<C;++k){const $=t[k],D=b?$:{};if(k<n||k>=_){D.skip=!0;continue}const w=this.getParsed(k),x=vt(w[f]),M=D[d]=o.getPixelForValue(w[d],k),O=D[f]=s||x?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,w,c):w[f],k);D.skip=isNaN(M)||isNaN(O)||x,D.stop=k>0&&Math.abs(w[d]-S[d])>m,g&&(D.parsed=w,D.raw=l.data[k]),h&&(D.options=u||this.resolveDataElementOptions(k,$.active?"active":r)),b||this.updateElement($,k,D,r),S=w}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,r=t.data||[];if(!r.length)return i;const s=r[0].size(this.resolveDataElementOptions(0)),o=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(i,s,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}class eS extends qs{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:i,color:r}}=t.legend.options;return n.labels.map((s,o)=>{const c=t.getDatasetMeta(0).controller.getStyle(o);return{text:s,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:r,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,r=i.data.labels||[],s=ah(n._parsed[t].r,i.options.locale);return{label:r[t]||"",value:s}}parseObjectData(t,n,i,r){return Uk.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,r)=>{const s=this.getParsed(r).r;!isNaN(s)&&this.chart.getDataVisibility(r)&&(s<n.min&&(n.min=s),s>n.max&&(n.max=s))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,i=t.options,r=Math.min(n.right-n.left,n.bottom-n.top),s=Math.max(r/2,0),o=Math.max(i.cutoutPercentage?s/100*i.cutoutPercentage:1,0),a=(s-o)/t.getVisibleDatasetCount();this.outerRadius=s-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,n,i,r){const s=r==="reset",o=this.chart,c=o.options.animation,l=this._cachedMeta.rScale,u=l.xCenter,h=l.yCenter,d=l.getIndexAngle(0)-.5*Dt;let f=d,p;const g=360/this.countVisibleElements();for(p=0;p<n;++p)f+=this._computeAngle(p,r,g);for(p=n;p<n+i;p++){const m=t[p];let b=f,_=f+this._computeAngle(p,r,g),C=o.getDataVisibility(p)?l.getDistanceFromCenterForValue(this.getParsed(p).r):0;f=_,s&&(c.animateScale&&(C=0),c.animateRotate&&(b=_=d));const S={x:u,y:h,innerRadius:0,outerRadius:C,startAngle:b,endAngle:_,options:this.resolveDataElementOptions(p,m.active?"active":r)};this.updateElement(m,p,S,r)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((i,r)=>{!isNaN(this.getParsed(r).r)&&this.chart.getDataVisibility(r)&&n++}),n}_computeAngle(t,n,i){return this.chart.getDataVisibility(t)?Ti(this.resolveDataElementOptions(t,n).angle||i):0}}class l6 extends C0{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}class u6 extends qs{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const n=this._cachedMeta.vScale,i=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(i[n.axis])}}parseObjectData(t,n,i,r){return Uk.bind(this)(t,n,i,r)}update(t){const n=this._cachedMeta,i=n.dataset,r=n.data||[],s=n.iScale.getLabels();if(i.points=r,t!=="resize"){const o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);const a={_loop:!0,_fullLoop:s.length===r.length,options:o};this.updateElement(i,void 0,a,t)}this.updateElements(r,0,r.length,t)}updateElements(t,n,i,r){const s=this._cachedMeta.rScale,o=r==="reset";for(let a=n;a<n+i;a++){const c=t[a],l=this.resolveDataElementOptions(a,c.active?"active":r),u=s.getPointPositionForValue(a,this.getParsed(a).r),h=o?s.xCenter:u.x,d=o?s.yCenter:u.y,f={x:h,y:d,angle:u.angle,skip:isNaN(h)||isNaN(d),options:l};this.updateElement(c,a,f,r)}}}class h6 extends qs{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:r,yScale:s}=n,o=this.getParsed(t),a=r.getLabelForValue(o.x),c=s.getLabelForValue(o.y);return{label:i[t]||"",value:"("+a+", "+c+")"}}update(t){const n=this._cachedMeta,{data:i=[]}=n,r=this.chart._animationsDisabled;let{start:s,count:o}=Ak(n,i,r);if(this._drawStart=s,this._drawCount=o,Lk(n)&&(s=0,o=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:c}=n;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!c._decimated,a.points=i;const l=this.resolveDatasetElementOptions(t);l.segment=this.options.segment,this.updateElement(a,void 0,{animated:!r,options:l},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(i,s,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,i,r){const s=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,u=this.resolveDataElementOptions(n,r),h=this.getSharedOptions(u),d=this.includeOptions(r,h),f=o.axis,p=a.axis,{spanGaps:g,segment:m}=this.options,b=lc(g)?g:Number.POSITIVE_INFINITY,_=this.chart._animationsDisabled||s||r==="none";let C=n>0&&this.getParsed(n-1);for(let S=n;S<n+i;++S){const k=t[S],$=this.getParsed(S),D=_?k:{},w=vt($[p]),x=D[f]=o.getPixelForValue($[f],S),M=D[p]=s||w?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,$,c):$[p],S);D.skip=isNaN(x)||isNaN(M)||w,D.stop=S>0&&Math.abs($[f]-C[f])>b,m&&(D.parsed=$,D.raw=l.data[S]),d&&(D.options=h||this.resolveDataElementOptions(S,k.active?"active":r)),_||this.updateElement(k,S,D,r),C=$}this.updateSharedOptions(h,r,u)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let a=0;for(let c=n.length-1;c>=0;--c)a=Math.max(a,n[c].size(this.resolveDataElementOptions(c))/2);return a>0&&a}const i=t.dataset,r=i.options&&i.options.borderWidth||0;if(!n.length)return r;const s=n[0].size(this.resolveDataElementOptions(0)),o=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(r,s,o)/2}}var d6=Object.freeze({__proto__:null,BarController:s6,BubbleController:o6,DoughnutController:C0,LineController:c6,PieController:l6,PolarAreaController:eS,RadarController:u6,ScatterController:h6});function io(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class k0{static override(t){Object.assign(k0.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return io()}parse(){return io()}format(){return io()}add(){return io()}diff(){return io()}startOf(){return io()}endOf(){return io()}}var f6={_date:k0};function p6(e,t,n,i){const{controller:r,data:s,_sorted:o}=e,a=r._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&s.length){const l=a._reversePixels?T3:Tr;if(i){if(r._sharedOptions){const u=s[0],h=typeof u.getRange=="function"&&u.getRange(t);if(h){const d=l(s,t,n-h),f=l(s,t,n+h);return{lo:d.lo,hi:f.hi}}}}else{const u=l(s,t,n);if(c){const{vScale:h}=r._cachedMeta,{_parsed:d}=e,f=d.slice(0,u.lo+1).reverse().findIndex(g=>!vt(g[h.axis]));u.lo-=Math.max(0,f);const p=d.slice(u.hi).findIndex(g=>!vt(g[h.axis]));u.hi+=Math.max(0,p)}return u}}return{lo:0,hi:s.length-1}}function tp(e,t,n,i,r){const s=e.getSortedVisibleDatasetMetas(),o=n[t];for(let a=0,c=s.length;a<c;++a){const{index:l,data:u}=s[a],{lo:h,hi:d}=p6(s[a],t,o,r);for(let f=h;f<=d;++f){const p=u[f];p.skip||i(p,l,f)}}}function g6(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,r){const s=t?Math.abs(i.x-r.x):0,o=n?Math.abs(i.y-r.y):0;return Math.sqrt(Math.pow(s,2)+Math.pow(o,2))}}function lg(e,t,n,i,r){const s=[];return!r&&!e.isPointInArea(t)||tp(e,n,t,function(a,c,l){!r&&!Or(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&s.push({element:a,datasetIndex:c,index:l})},!0),s}function m6(e,t,n,i){let r=[];function s(o,a,c){const{startAngle:l,endAngle:u}=o.getProps(["startAngle","endAngle"],i),{angle:h}=Tk(o,{x:t.x,y:t.y});xu(h,l,u)&&r.push({element:o,datasetIndex:a,index:c})}return tp(e,n,t,s),r}function v6(e,t,n,i,r,s){let o=[];const a=g6(n);let c=Number.POSITIVE_INFINITY;function l(u,h,d){const f=u.inRange(t.x,t.y,r);if(i&&!f)return;const p=u.getCenterPoint(r);if(!(!!s||e.isPointInArea(p))&&!f)return;const m=a(t,p);m<c?(o=[{element:u,datasetIndex:h,index:d}],c=m):m===c&&o.push({element:u,datasetIndex:h,index:d})}return tp(e,n,t,l),o}function ug(e,t,n,i,r,s){return!s&&!e.isPointInArea(t)?[]:n==="r"&&!i?m6(e,t,n,r):v6(e,t,n,i,r,s)}function I_(e,t,n,i,r){const s=[],o=n==="x"?"inXRange":"inYRange";let a=!1;return tp(e,n,t,(c,l,u)=>{c[o]&&c[o](t[n],r)&&(s.push({element:c,datasetIndex:l,index:u}),a=a||c.inRange(t.x,t.y,r))}),i&&!a?[]:s}var y6={modes:{index(e,t,n,i){const r=lo(t,e),s=n.axis||"x",o=n.includeInvisible||!1,a=n.intersect?lg(e,r,s,i,o):ug(e,r,s,!1,i,o),c=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(l=>{const u=a[0].index,h=l.data[u];h&&!h.skip&&c.push({element:h,datasetIndex:l.index,index:u})}),c):[]},dataset(e,t,n,i){const r=lo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;let a=n.intersect?lg(e,r,s,i,o):ug(e,r,s,!1,i,o);if(a.length>0){const c=a[0].datasetIndex,l=e.getDatasetMeta(c).data;a=[];for(let u=0;u<l.length;++u)a.push({element:l[u],datasetIndex:c,index:u})}return a},point(e,t,n,i){const r=lo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return lg(e,r,s,i,o)},nearest(e,t,n,i){const r=lo(t,e),s=n.axis||"xy",o=n.includeInvisible||!1;return ug(e,r,s,n.intersect,i,o)},x(e,t,n,i){const r=lo(t,e);return I_(e,r,"x",n.intersect,i)},y(e,t,n,i){const r=lo(t,e);return I_(e,r,"y",n.intersect,i)}}};const nS=["left","top","right","bottom"];function Hc(e,t){return e.filter(n=>n.pos===t)}function P_(e,t){return e.filter(n=>nS.indexOf(n.pos)===-1&&n.box.axis===t)}function Uc(e,t){return e.sort((n,i)=>{const r=t?i:n,s=t?n:i;return r.weight===s.weight?r.index-s.index:r.weight-s.weight})}function b6(e){const t=[];let n,i,r,s,o,a;for(n=0,i=(e||[]).length;n<i;++n)r=e[n],{position:s,options:{stack:o,stackWeight:a=1}}=r,t.push({index:n,box:r,pos:s,horizontal:r.isHorizontal(),weight:r.weight,stack:o&&s+o,stackWeight:a});return t}function _6(e){const t={};for(const n of e){const{stack:i,pos:r,stackWeight:s}=n;if(!i||!nS.includes(r))continue;const o=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=s}return t}function w6(e,t){const n=_6(e),{vBoxMaxWidth:i,hBoxMaxHeight:r}=t;let s,o,a;for(s=0,o=e.length;s<o;++s){a=e[s];const{fullSize:c}=a.box,l=n[a.stack],u=l&&a.stackWeight/l.weight;a.horizontal?(a.width=u?u*i:c&&t.availableWidth,a.height=r):(a.width=i,a.height=u?u*r:c&&t.availableHeight)}return n}function x6(e){const t=b6(e),n=Uc(t.filter(l=>l.box.fullSize),!0),i=Uc(Hc(t,"left"),!0),r=Uc(Hc(t,"right")),s=Uc(Hc(t,"top"),!0),o=Uc(Hc(t,"bottom")),a=P_(t,"x"),c=P_(t,"y");return{fullSize:n,leftAndTop:i.concat(s),rightAndBottom:r.concat(c).concat(o).concat(a),chartArea:Hc(t,"chartArea"),vertical:i.concat(r).concat(c),horizontal:s.concat(o).concat(a)}}function R_(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function iS(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function C6(e,t,n,i){const{pos:r,box:s}=n,o=e.maxPadding;if(!_t(r)){n.size&&(e[r]-=n.size);const h=i[n.stack]||{size:0,count:1};h.size=Math.max(h.size,n.horizontal?s.height:s.width),n.size=h.size/h.count,e[r]+=n.size}s.getPadding&&iS(o,s.getPadding());const a=Math.max(0,t.outerWidth-R_(o,e,"left","right")),c=Math.max(0,t.outerHeight-R_(o,e,"top","bottom")),l=a!==e.w,u=c!==e.h;return e.w=a,e.h=c,n.horizontal?{same:l,other:u}:{same:u,other:l}}function k6(e){const t=e.maxPadding;function n(i){const r=Math.max(t[i]-e[i],0);return e[i]+=r,r}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function S6(e,t){const n=t.maxPadding;function i(r){const s={left:0,top:0,right:0,bottom:0};return r.forEach(o=>{s[o]=Math.max(t[o],n[o])}),s}return i(e?["left","right"]:["top","bottom"])}function ml(e,t,n,i){const r=[];let s,o,a,c,l,u;for(s=0,o=e.length,l=0;s<o;++s){a=e[s],c=a.box,c.update(a.width||t.w,a.height||t.h,S6(a.horizontal,t));const{same:h,other:d}=C6(t,n,a,i);l|=h&&r.length,u=u||d,c.fullSize||r.push(a)}return l&&ml(r,t,n,i)||u}function Sh(e,t,n,i,r){e.top=n,e.left=t,e.right=t+i,e.bottom=n+r,e.width=i,e.height=r}function A_(e,t,n,i){const r=n.padding;let{x:s,y:o}=t;for(const a of e){const c=a.box,l=i[a.stack]||{placed:0,weight:1},u=a.stackWeight/l.weight||1;if(a.horizontal){const h=t.w*u,d=l.size||c.height;wu(l.start)&&(o=l.start),c.fullSize?Sh(c,r.left,o,n.outerWidth-r.right-r.left,d):Sh(c,t.left+l.placed,o,h,d),l.start=o,l.placed+=h,o=c.bottom}else{const h=t.h*u,d=l.size||c.width;wu(l.start)&&(s=l.start),c.fullSize?Sh(c,s,r.top,d,n.outerHeight-r.bottom-r.top):Sh(c,s,t.top+l.placed,d,h),l.start=s,l.placed+=h,s=c.right}}t.x=s,t.y=o}var Je={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const r=en(e.options.layout.padding),s=Math.max(t-r.width,0),o=Math.max(n-r.height,0),a=x6(e.boxes),c=a.vertical,l=a.horizontal;It(e.boxes,g=>{typeof g.beforeLayout=="function"&&g.beforeLayout()});const u=c.reduce((g,m)=>m.box.options&&m.box.options.display===!1?g:g+1,0)||1,h=Object.freeze({outerWidth:t,outerHeight:n,padding:r,availableWidth:s,availableHeight:o,vBoxMaxWidth:s/2/u,hBoxMaxHeight:o/2}),d=Object.assign({},r);iS(d,en(i));const f=Object.assign({maxPadding:d,w:s,h:o,x:r.left,y:r.top},r),p=w6(c.concat(l),h);ml(a.fullSize,f,h,p),ml(c,f,h,p),ml(l,f,h,p)&&ml(c,f,h,p),k6(f),A_(a.leftAndTop,f,h,p),f.x+=f.w,f.y+=f.h,A_(a.rightAndBottom,f,h,p),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},It(a.chartArea,g=>{const m=g.box;Object.assign(m,e.chartArea),m.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class rS{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,r){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,r?Math.floor(n/r):i)}}isAttached(t){return!0}updateConfig(t){}}class E6 extends rS{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Gh="$chartjs",M6={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},L_=e=>e===null||e==="";function D6(e,t){const n=e.style,i=e.getAttribute("height"),r=e.getAttribute("width");if(e[Gh]={initial:{height:i,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",L_(r)){const s=b_(e,"width");s!==void 0&&(e.width=s)}if(L_(i))if(e.style.height==="")e.height=e.width/(t||2);else{const s=b_(e,"height");s!==void 0&&(e.height=s)}return e}const sS=CN?{passive:!0}:!1;function $6(e,t,n){e&&e.addEventListener(t,n,sS)}function T6(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,sS)}function O6(e,t){const n=M6[e.type]||e.type,{x:i,y:r}=lo(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:r!==void 0?r:null}}function cf(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function I6(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||cf(a.addedNodes,i),o=o&&!cf(a.removedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function P6(e,t,n){const i=e.canvas,r=new MutationObserver(s=>{let o=!1;for(const a of s)o=o||cf(a.removedNodes,i),o=o&&!cf(a.addedNodes,i);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const ku=new Map;let N_=0;function oS(){const e=window.devicePixelRatio;e!==N_&&(N_=e,ku.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function R6(e,t){ku.size||window.addEventListener("resize",oS),ku.set(e,t)}function A6(e){ku.delete(e),ku.size||window.removeEventListener("resize",oS)}function L6(e,t,n){const i=e.canvas,r=i&&x0(i);if(!r)return;const s=Rk((a,c)=>{const l=r.clientWidth;n(a,c),l<r.clientWidth&&n()},window),o=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,u=c.contentRect.height;l===0&&u===0||s(l,u)});return o.observe(r),R6(e,s),o}function hg(e,t,n){n&&n.disconnect(),t==="resize"&&A6(e)}function N6(e,t,n){const i=e.canvas,r=Rk(s=>{e.ctx!==null&&n(O6(s,e))},e);return $6(i,t,r),r}class F6 extends rS{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(D6(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[Gh])return!1;const i=n[Gh].initial;["height","width"].forEach(s=>{const o=i[s];vt(o)?n.removeAttribute(s):n.setAttribute(s,o)});const r=i.style||{};return Object.keys(r).forEach(s=>{n.style[s]=r[s]}),n.width=n.width,delete n[Gh],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const r=t.$proxies||(t.$proxies={}),o={attach:I6,detach:P6,resize:L6}[n]||N6;r[n]=o(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),r=i[n];if(!r)return;({attach:hg,detach:hg,resize:hg}[n]||T6)(t,n,r),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,r){return xN(t,n,i,r)}isAttached(t){const n=t&&x0(t);return!!(n&&n.isConnected)}}function z6(e){return!w0()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?E6:F6}class ns{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return lc(this.x)&&lc(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const r={};return t.forEach(s=>{r[s]=i[s]&&i[s].active()?i[s]._to:this[s]}),r}}function j6(e,t){const n=e.options.ticks,i=B6(e),r=Math.min(n.maxTicksLimit||i,i),s=n.major.enabled?H6(t):[],o=s.length,a=s[0],c=s[o-1],l=[];if(o>r)return U6(t,l,s,o/r),l;const u=W6(s,t,r);if(o>0){let h,d;const f=o>1?Math.round((c-a)/(o-1)):null;for(Eh(t,l,u,vt(f)?0:a-f,a),h=0,d=o-1;h<d;h++)Eh(t,l,u,s[h],s[h+1]);return Eh(t,l,u,c,vt(f)?t.length:c+f),l}return Eh(t,l,u),l}function B6(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),r=e._maxLength/n;return Math.floor(Math.min(i,r))}function W6(e,t,n){const i=Y6(e),r=t.length/n;if(!i)return Math.max(r,1);const s=S3(i);for(let o=0,a=s.length-1;o<a;o++){const c=s[o];if(c>r)return c}return Math.max(r,1)}function H6(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function U6(e,t,n,i){let r=0,s=n[0],o;for(i=Math.ceil(i),o=0;o<e.length;o++)o===s&&(t.push(e[o]),r++,s=n[r*i])}function Eh(e,t,n,i,r){const s=lt(i,0),o=Math.min(lt(r,e.length),e.length);let a=0,c,l,u;for(n=Math.ceil(n),r&&(c=r-i,n=c/Math.floor(c/n)),u=s;u<0;)a++,u=Math.round(s+a*n);for(l=Math.max(s,0);l<o;l++)l===u&&(t.push(e[l]),a++,u=Math.round(s+a*n))}function Y6(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const q6=e=>e==="left"?"right":e==="right"?"left":e,F_=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,z_=(e,t)=>Math.min(t||e,e);function j_(e,t){const n=[],i=e.length/t,r=e.length;let s=0;for(;s<r;s+=i)n.push(e[Math.floor(s)]);return n}function V6(e,t,n){const i=e.ticks.length,r=Math.min(t,i-1),s=e._startPixel,o=e._endPixel,a=1e-6;let c=e.getPixelForTick(r),l;if(!(n&&(i===1?l=Math.max(c-s,o-c):t===0?l=(e.getPixelForTick(1)-c)/2:l=(c-e.getPixelForTick(r-1))/2,c+=r<t?l:-l,c<s-a||c>o+a)))return c}function K6(e,t){It(e,n=>{const i=n.gc,r=i.length/2;let s;if(r>t){for(s=0;s<r;++s)delete n.data[i[s]];i.splice(0,r)}})}function Yc(e){return e.drawTicks?e.tickLength:0}function B_(e,t){if(!e.display)return 0;const n=Ce(e.font,t),i=en(e.padding);return(Xt(e.text)?e.text.length:1)*n.lineHeight+i.height}function G6(e,t){return Ys(e,{scale:t,type:"scale"})}function X6(e,t,n){return Ys(e,{tick:n,index:t,type:"tick"})}function Q6(e,t,n){let i=g0(e);return(n&&t!=="right"||!n&&t==="right")&&(i=q6(i)),i}function Z6(e,t,n,i){const{top:r,left:s,bottom:o,right:a,chart:c}=e,{chartArea:l,scales:u}=c;let h=0,d,f,p;const g=o-r,m=a-s;if(e.isHorizontal()){if(f=Ve(i,s,a),_t(n)){const b=Object.keys(n)[0],_=n[b];p=u[b].getPixelForValue(_)+g-t}else n==="center"?p=(l.bottom+l.top)/2+g-t:p=F_(e,n,t);d=a-s}else{if(_t(n)){const b=Object.keys(n)[0],_=n[b];f=u[b].getPixelForValue(_)-m+t}else n==="center"?f=(l.left+l.right)/2-m+t:f=F_(e,n,t);p=Ve(i,o,r),h=n==="left"?-fe:fe}return{titleX:f,titleY:p,maxWidth:d,rotation:h}}class ia extends ns{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:r}=this;return t=qn(t,Number.POSITIVE_INFINITY),n=qn(n,Number.NEGATIVE_INFINITY),i=qn(i,Number.POSITIVE_INFINITY),r=qn(r,Number.NEGATIVE_INFINITY),{min:qn(t,i),max:qn(n,r),minDefined:ue(t),maxDefined:ue(n)}}getMinMax(t){let{min:n,max:i,minDefined:r,maxDefined:s}=this.getUserBounds(),o;if(r&&s)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)o=a[c].controller.getMinMax(this,t),r||(n=Math.min(n,o.min)),s||(i=Math.max(i,o.max));return n=s&&n>i?i:n,i=r&&n>i?n:i,{min:qn(n,qn(i,n)),max:qn(i,qn(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Wt(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:r,grace:s,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=tN(this,s,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?j_(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=j6(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Wt(this.options.afterUpdate,[this])}beforeSetDimensions(){Wt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Wt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),Wt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Wt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,r,s;for(i=0,r=t.length;i<r;i++)s=t[i],s.label=Wt(n.callback,[s.value,i,t],this)}afterTickToLabelConversion(){Wt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Wt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=z_(this.ticks.length,t.ticks.maxTicksLimit),r=n.minRotation||0,s=n.maxRotation;let o=r,a,c,l;if(!this._isVisible()||!n.display||r>=s||i<=1||!this.isHorizontal()){this.labelRotation=r;return}const u=this._getLabelSizes(),h=u.widest.width,d=u.highest.height,f=Pe(this.chart.width-h,0,this.maxWidth);a=t.offset?this.maxWidth/i:f/(i-1),h+6>a&&(a=f/(i-(t.offset?.5:1)),c=this.maxHeight-Yc(t.grid)-n.padding-B_(t.title,this.chart.options.font),l=Math.sqrt(h*h+d*d),o=f0(Math.min(Math.asin(Pe((u.highest.height+6)/a,-1,1)),Math.asin(Pe(c/l,-1,1))-Math.asin(Pe(d/l,-1,1)))),o=Math.max(r,Math.min(s,o))),this.labelRotation=o}afterCalculateLabelRotation(){Wt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Wt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:r,grid:s}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=B_(r,n.options.font);if(a?(t.width=this.maxWidth,t.height=Yc(s)+c):(t.height=this.maxHeight,t.width=Yc(s)+c),i.display&&this.ticks.length){const{first:l,last:u,widest:h,highest:d}=this._getLabelSizes(),f=i.padding*2,p=Ti(this.labelRotation),g=Math.cos(p),m=Math.sin(p);if(a){const b=i.mirror?0:m*h.width+g*d.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=i.mirror?0:g*h.width+m*d.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(l,u,m,g)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,r){const{ticks:{align:s,padding:o},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const u=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1);let d=0,f=0;c?l?(d=r*t.width,f=i*n.height):(d=i*t.height,f=r*n.width):s==="start"?f=n.width:s==="end"?d=t.width:s!=="inner"&&(d=t.width/2,f=n.width/2),this.paddingLeft=Math.max((d-u+o)*this.width/(this.width-u),0),this.paddingRight=Math.max((f-h+o)*this.width/(this.width-h),0)}else{let u=n.height/2,h=t.height/2;s==="start"?(u=0,h=t.height):s==="end"&&(u=n.height,h=0),this.paddingTop=u+o,this.paddingBottom=h+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Wt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)vt(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=j_(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:r,_longestTextCache:s}=this,o=[],a=[],c=Math.floor(n/z_(n,i));let l=0,u=0,h,d,f,p,g,m,b,_,C,S,k;for(h=0;h<n;h+=c){if(p=t[h].label,g=this._resolveTickFontOptions(h),r.font=m=g.string,b=s[m]=s[m]||{data:{},gc:[]},_=g.lineHeight,C=S=0,!vt(p)&&!Xt(p))C=of(r,b.data,b.gc,C,p),S=_;else if(Xt(p))for(d=0,f=p.length;d<f;++d)k=p[d],!vt(k)&&!Xt(k)&&(C=of(r,b.data,b.gc,C,k),S+=_);o.push(C),a.push(S),l=Math.max(C,l),u=Math.max(S,u)}K6(s,n);const $=o.indexOf(l),D=a.indexOf(u),w=x=>({width:o[x]||0,height:a[x]||0});return{first:w(0),last:w(n-1),widest:w($),highest:w(D),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return $3(this._alignToPixels?no(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=X6(this.getContext(),t,i))}return this.$context||(this.$context=G6(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=Ti(this.labelRotation),i=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),s=this._getLabelSizes(),o=t.autoSkipPadding||0,a=s?s.widest.width+o:0,c=s?s.highest.height+o:0;return this.isHorizontal()?c*i>a*r?a/i:c/r:c*r<a*i?c/i:a/r}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,r=this.options,{grid:s,position:o,border:a}=r,c=s.offset,l=this.isHorizontal(),h=this.ticks.length+(c?1:0),d=Yc(s),f=[],p=a.setContext(this.getContext()),g=p.display?p.width:0,m=g/2,b=function(Y){return no(i,Y,g)};let _,C,S,k,$,D,w,x,M,O,T,R;if(o==="top")_=b(this.bottom),D=this.bottom-d,x=_-m,O=b(t.top)+m,R=t.bottom;else if(o==="bottom")_=b(this.top),O=t.top,R=b(t.bottom)-m,D=_+m,x=this.top+d;else if(o==="left")_=b(this.right),$=this.right-d,w=_-m,M=b(t.left)+m,T=t.right;else if(o==="right")_=b(this.left),M=t.left,T=b(t.right)-m,$=_+m,w=this.left+d;else if(n==="x"){if(o==="center")_=b((t.top+t.bottom)/2+.5);else if(_t(o)){const Y=Object.keys(o)[0],F=o[Y];_=b(this.chart.scales[Y].getPixelForValue(F))}O=t.top,R=t.bottom,D=_+m,x=D+d}else if(n==="y"){if(o==="center")_=b((t.left+t.right)/2);else if(_t(o)){const Y=Object.keys(o)[0],F=o[Y];_=b(this.chart.scales[Y].getPixelForValue(F))}$=_-m,w=$-d,M=t.left,T=t.right}const j=lt(r.ticks.maxTicksLimit,h),z=Math.max(1,Math.ceil(h/j));for(C=0;C<h;C+=z){const Y=this.getContext(C),F=s.setContext(Y),G=a.setContext(Y),B=F.lineWidth,q=F.color,W=G.dash||[],V=G.dashOffset,L=F.tickWidth,ot=F.tickColor,kt=F.tickBorderDash||[],Lt=F.tickBorderDashOffset;S=V6(this,C,c),S!==void 0&&(k=no(i,S,B),l?$=w=M=T=k:D=x=O=R=k,f.push({tx1:$,ty1:D,tx2:w,ty2:x,x1:M,y1:O,x2:T,y2:R,width:B,color:q,borderDash:W,borderDashOffset:V,tickWidth:L,tickColor:ot,tickBorderDash:kt,tickBorderDashOffset:Lt}))}return this._ticksLength=h,this._borderValue=_,f}_computeLabelItems(t){const n=this.axis,i=this.options,{position:r,ticks:s}=i,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:u,mirror:h}=s,d=Yc(i.grid),f=d+u,p=h?-u:f,g=-Ti(this.labelRotation),m=[];let b,_,C,S,k,$,D,w,x,M,O,T,R="middle";if(r==="top")$=this.bottom-p,D=this._getXAxisLabelAlignment();else if(r==="bottom")$=this.top+p,D=this._getXAxisLabelAlignment();else if(r==="left"){const z=this._getYAxisLabelAlignment(d);D=z.textAlign,k=z.x}else if(r==="right"){const z=this._getYAxisLabelAlignment(d);D=z.textAlign,k=z.x}else if(n==="x"){if(r==="center")$=(t.top+t.bottom)/2+f;else if(_t(r)){const z=Object.keys(r)[0],Y=r[z];$=this.chart.scales[z].getPixelForValue(Y)+f}D=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")k=(t.left+t.right)/2-f;else if(_t(r)){const z=Object.keys(r)[0],Y=r[z];k=this.chart.scales[z].getPixelForValue(Y)}D=this._getYAxisLabelAlignment(d).textAlign}n==="y"&&(c==="start"?R="top":c==="end"&&(R="bottom"));const j=this._getLabelSizes();for(b=0,_=a.length;b<_;++b){C=a[b],S=C.label;const z=s.setContext(this.getContext(b));w=this.getPixelForTick(b)+s.labelOffset,x=this._resolveTickFontOptions(b),M=x.lineHeight,O=Xt(S)?S.length:1;const Y=O/2,F=z.color,G=z.textStrokeColor,B=z.textStrokeWidth;let q=D;o?(k=w,D==="inner"&&(b===_-1?q=this.options.reverse?"left":"right":b===0?q=this.options.reverse?"right":"left":q="center"),r==="top"?l==="near"||g!==0?T=-O*M+M/2:l==="center"?T=-j.highest.height/2-Y*M+M:T=-j.highest.height+M/2:l==="near"||g!==0?T=M/2:l==="center"?T=j.highest.height/2-Y*M:T=j.highest.height-O*M,h&&(T*=-1),g!==0&&!z.showLabelBackdrop&&(k+=M/2*Math.sin(g))):($=w,T=(1-O)*M/2);let W;if(z.showLabelBackdrop){const V=en(z.backdropPadding),L=j.heights[b],ot=j.widths[b];let kt=T-V.top,Lt=0-V.left;switch(R){case"middle":kt-=L/2;break;case"bottom":kt-=L;break}switch(D){case"center":Lt-=ot/2;break;case"right":Lt-=ot;break;case"inner":b===_-1?Lt-=ot:b>0&&(Lt-=ot/2);break}W={left:Lt,top:kt,width:ot+V.width,height:L+V.height,color:z.backdropColor}}m.push({label:S,font:x,textOffset:T,options:{rotation:g,color:F,strokeColor:G,strokeWidth:B,textAlign:q,textBaseline:R,translation:[k,$],backdrop:W}})}return m}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-Ti(this.labelRotation))return t==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:r,padding:s}}=this.options,o=this._getLabelSizes(),a=t+s,c=o.widest.width;let l,u;return n==="left"?r?(u=this.right+s,i==="near"?l="left":i==="center"?(l="center",u+=c/2):(l="right",u+=c)):(u=this.right-a,i==="near"?l="right":i==="center"?(l="center",u-=c/2):(l="left",u=this.left)):n==="right"?r?(u=this.left+s,i==="near"?l="right":i==="center"?(l="center",u-=c/2):(l="left",u-=c)):(u=this.left+a,i==="near"?l="left":i==="center"?(l="center",u+=c/2):(l="right",u=this.right)):l="right",{textAlign:l,x:u}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:r,width:s,height:o}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,r,s,o),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(s=>s.value===t);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let s,o;const a=(c,l,u)=>{!u.width||!u.color||(i.save(),i.lineWidth=u.width,i.strokeStyle=u.color,i.setLineDash(u.borderDash||[]),i.lineDashOffset=u.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(n.display)for(s=0,o=r.length;s<o;++s){const c=r[s];n.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),n.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:r}}=this,s=i.setContext(this.getContext()),o=i.display?s.width:0;if(!o)return;const a=r.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,u,h,d;this.isHorizontal()?(l=no(t,this.left,o)-o/2,u=no(t,this.right,a)+a/2,h=d=c):(h=no(t,this.top,o)-o/2,d=no(t,this.bottom,a)+a/2,l=u=c),n.save(),n.lineWidth=s.width,n.strokeStyle=s.color,n.beginPath(),n.moveTo(l,h),n.lineTo(u,d),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,r=this._computeLabelArea();r&&Qf(i,r);const s=this.getLabelItems(t);for(const o of s){const a=o.options,c=o.font,l=o.label,u=o.textOffset;Uo(i,l,0,u,c,a)}r&&Zf(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:r}}=this;if(!i.display)return;const s=Ce(i.font),o=en(i.padding),a=i.align;let c=s.lineHeight/2;n==="bottom"||n==="center"||_t(n)?(c+=o.bottom,Xt(i.text)&&(c+=s.lineHeight*(i.text.length-1))):c+=o.top;const{titleX:l,titleY:u,maxWidth:h,rotation:d}=Z6(this,c,n,a);Uo(t,i.text,0,0,s,{color:i.color,maxWidth:h,rotation:d,textAlign:Q6(a,n,r),textBaseline:"middle",translation:[l,u]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=lt(t.grid&&t.grid.z,-1),r=lt(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==ia.prototype.draw?[{z:n,draw:s=>{this.draw(s)}}]:[{z:i,draw:s=>{this.drawBackground(),this.drawGrid(s),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:s=>{this.drawLabels(s)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",r=[];let s,o;for(s=0,o=n.length;s<o;++s){const a=n[s];a[i]===this.id&&(!t||a.type===t)&&r.push(a)}return r}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Ce(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Mh{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;eF(n)&&(i=this.register(n));const r=this.items,s=t.id,o=this.scope+"."+s;if(!s)throw new Error("class does not have id: "+t);return s in r||(r[s]=t,J6(t,o,i),this.override&&Zt.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,r=this.scope;i in n&&delete n[i],r&&i in Zt[r]&&(delete Zt[r][i],this.override&&delete Ho[i])}}function J6(e,t,n){const i=cc(Object.create(null),[n?Zt.get(n):{},Zt.get(t),e.defaults]);Zt.set(t,i),e.defaultRoutes&&tF(t,e.defaultRoutes),e.descriptors&&Zt.describe(t,e.descriptors)}function tF(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),r=i.pop(),s=[e].concat(i).join("."),o=t[n].split("."),a=o.pop(),c=o.join(".");Zt.route(s,r,c,a)})}function eF(e){return"id"in e&&"defaults"in e}class nF{constructor(){this.controllers=new Mh(qs,"datasets",!0),this.elements=new Mh(ns,"elements"),this.plugins=new Mh(Object,"plugins"),this.scales=new Mh(ia,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(r=>{const s=i||this._getRegistryForType(r);i||s.isForType(r)||s===this.plugins&&r.id?this._exec(t,s,r):It(r,o=>{const a=i||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,n,i){const r=d0(t);Wt(i["before"+r],[],i),n[t](i),Wt(i["after"+r],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const r=n.get(t);if(r===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return r}}var Wi=new nF;class iF{constructor(){this._init=void 0}notify(t,n,i,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const s=r?this._descriptors(t).filter(r):this._descriptors(t),o=this._notify(s,t,n,i);return n==="afterDestroy"&&(this._notify(s,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,n,i,r){r=r||{};for(const s of t){const o=s.plugin,a=o[i],c=[n,r,s.options];if(Wt(a,c,o)===!1&&r.cancelable)return!1}return!0}invalidate(){vt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,r=lt(i.options&&i.options.plugins,{}),s=rF(i);return r===!1&&!n?[]:oF(t,s,r,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,r=(s,o)=>s.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(r(n,i),t,"stop"),this._notify(r(i,n),t,"start")}}function rF(e){const t={},n=[],i=Object.keys(Wi.plugins.items);for(let s=0;s<i.length;s++)n.push(Wi.getPlugin(i[s]));const r=e.plugins||[];for(let s=0;s<r.length;s++){const o=r[s];n.indexOf(o)===-1&&(n.push(o),t[o.id]=!0)}return{plugins:n,localIds:t}}function sF(e,t){return!t&&e===!1?null:e===!0?{}:e}function oF(e,{plugins:t,localIds:n},i,r){const s=[],o=e.getContext();for(const a of t){const c=a.id,l=sF(i[c],r);l!==null&&s.push({plugin:a,options:aF(e.config,{plugin:a,local:n[c]},l,o)})}return s}function aF(e,{plugin:t,local:n},i,r){const s=e.pluginScopeKeys(t),o=e.getOptionScopes(i,s);return n&&t.defaults&&o.push(t.defaults),e.createResolver(o,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Dm(e,t){const n=Zt.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function cF(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function lF(e,t){return e===t?"_index_":"_value_"}function W_(e){if(e==="x"||e==="y"||e==="r")return e}function uF(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function $m(e,...t){if(W_(e))return e;for(const n of t){const i=n.axis||uF(n.position)||e.length>1&&W_(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function H_(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function hF(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return H_(e,"x",n[0])||H_(e,"y",n[0])}return{}}function dF(e,t){const n=Ho[e.type]||{scales:{}},i=t.scales||{},r=Dm(e.type,t),s=Object.create(null);return Object.keys(i).forEach(o=>{const a=i[o];if(!_t(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=$m(o,a,hF(o,e),Zt.scales[a.type]),l=lF(c,r),u=n.scales||{};s[o]=Ul(Object.create(null),[{axis:c},a,u[c],u[l]])}),e.data.datasets.forEach(o=>{const a=o.type||e.type,c=o.indexAxis||Dm(a,t),u=(Ho[a]||{}).scales||{};Object.keys(u).forEach(h=>{const d=cF(h,c),f=o[d+"AxisID"]||d;s[f]=s[f]||Object.create(null),Ul(s[f],[{axis:d},i[f],u[h]])})}),Object.keys(s).forEach(o=>{const a=s[o];Ul(a,[Zt.scales[a.type],Zt.scale])}),s}function aS(e){const t=e.options||(e.options={});t.plugins=lt(t.plugins,{}),t.scales=dF(e,t)}function cS(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function fF(e){return e=e||{},e.data=cS(e.data),aS(e),e}const U_=new Map,lS=new Set;function Dh(e,t){let n=U_.get(e);return n||(n=t(),U_.set(e,n),lS.add(n)),n}const qc=(e,t,n)=>{const i=Ls(t,n);i!==void 0&&e.add(i)};class pF{constructor(t){this._config=fF(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=cS(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),aS(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Dh(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Dh(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Dh(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Dh(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let r=i.get(t);return(!r||n)&&(r=new Map,i.set(t,r)),r}getOptionScopes(t,n,i){const{options:r,type:s}=this,o=this._cachedScopes(t,i),a=o.get(n);if(a)return a;const c=new Set;n.forEach(u=>{t&&(c.add(t),u.forEach(h=>qc(c,t,h))),u.forEach(h=>qc(c,r,h)),u.forEach(h=>qc(c,Ho[s]||{},h)),u.forEach(h=>qc(c,Zt,h)),u.forEach(h=>qc(c,Em,h))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),lS.has(n)&&o.set(n,l),l}chartOptionScopes(){const{options:t,type:n}=this;return[t,Ho[n]||{},Zt.datasets[n]||{},{type:n},Zt,Em]}resolveNamedOptions(t,n,i,r=[""]){const s={$shared:!0},{resolver:o,subPrefixes:a}=Y_(this._resolverCache,t,r);let c=o;if(mF(o,n)){s.$shared=!1,i=Ns(i)?i():i;const l=this.createResolver(t,i,a);c=uc(o,i,l)}for(const l of n)s[l]=c[l];return s}createResolver(t,n,i=[""],r){const{resolver:s}=Y_(this._resolverCache,t,i);return _t(n)?uc(s,n,void 0,r):s}}function Y_(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const r=n.join();let s=i.get(r);return s||(s={resolver:y0(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(r,s)),s}const gF=e=>_t(e)&&Object.getOwnPropertyNames(e).some(t=>Ns(e[t]));function mF(e,t){const{isScriptable:n,isIndexable:i}=jk(e);for(const r of t){const s=n(r),o=i(r),a=(o||s)&&e[r];if(s&&(Ns(a)||gF(a))||o&&Xt(a))return!0}return!1}var vF="4.5.1";const yF=["top","bottom","left","right","chartArea"];function q_(e,t){return e==="top"||e==="bottom"||yF.indexOf(e)===-1&&t==="x"}function V_(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function K_(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),Wt(n&&n.onComplete,[e],t)}function bF(e){const t=e.chart,n=t.options.animation;Wt(n&&n.onProgress,[e],t)}function uS(e){return w0()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Xh={},G_=e=>{const t=uS(e);return Object.values(Xh).filter(n=>n.canvas===t).pop()};function _F(e,t,n){const i=Object.keys(e);for(const r of i){const s=+r;if(s>=t){const o=e[r];delete e[r],(n>0||s>t)&&(e[s+n]=o)}}}function wF(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class ep{static defaults=Zt;static instances=Xh;static overrides=Ho;static registry=Wi;static version=vF;static getChart=G_;static register(...t){Wi.add(...t),X_()}static unregister(...t){Wi.remove(...t),X_()}constructor(t,n){const i=this.config=new pF(n),r=uS(t),s=G_(r);if(s)throw new Error("Canvas is already in use. Chart with ID '"+s.id+"' must be destroyed before the canvas with ID '"+s.canvas.id+"' can be reused.");const o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||z6(r)),this.platform.updateConfig(i);const a=this.platform.acquireContext(r,o.aspectRatio),c=a&&a.canvas,l=c&&c.height,u=c&&c.width;if(this.id=m3(),this.ctx=a,this.canvas=c,this.width=u,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new iF,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=P3(h=>this.update(h),o.resizeDelay||0),this._dataChanges=[],Xh[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}br.listen(this,"complete",K_),br.listen(this,"progress",bF),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:r,_aspectRatio:s}=this;return vt(t)?n&&s?s:r?i/r:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Wi}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():y_(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return g_(this.canvas,this.ctx),this}stop(){return br.stop(this),this}resize(t,n){br.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,r=this.canvas,s=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(r,t,n,s),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,y_(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),Wt(i.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};It(n,(i,r)=>{i.id=r})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,r=Object.keys(i).reduce((o,a)=>(o[a]=!1,o),{});let s=[];n&&(s=s.concat(Object.keys(n).map(o=>{const a=n[o],c=$m(o,a),l=c==="r",u=c==="x";return{options:a,dposition:l?"chartArea":u?"bottom":"left",dtype:l?"radialLinear":u?"category":"linear"}}))),It(s,o=>{const a=o.options,c=a.id,l=$m(c,a),u=lt(a.type,o.dtype);(a.position===void 0||q_(a.position,l)!==q_(o.dposition))&&(a.position=o.dposition),r[c]=!0;let h=null;if(c in i&&i[c].type===u)h=i[c];else{const d=Wi.getScale(u);h=new d({id:c,type:u,ctx:this.ctx,chart:this}),i[h.id]=h}h.init(a,t)}),It(r,(o,a)=>{o||delete i[a]}),It(i,o=>{Je.configure(this,o,o.options),Je.addBox(this,o)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((r,s)=>r.index-s.index),i>n){for(let r=n;r<i;++r)this._destroyDatasetMeta(r);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(V_("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,r)=>{n.filter(s=>s===i._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,r;for(this._removeUnreferencedMetasets(),i=0,r=n.length;i<r;i++){const s=n[i];let o=this.getDatasetMeta(i);const a=s.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=a,o.indexAxis=s.indexAxis||Dm(a,this.options),o.order=s.order||0,o.index=i,o.label=""+s.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const c=Wi.getController(a),{datasetElementType:l,dataElementType:u}=Zt.datasets[a];Object.assign(c,{dataElementType:Wi.getElement(u),datasetElementType:l&&Wi.getElement(l)}),o.controller=new c(this,i),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){It(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const s=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,u=this.data.datasets.length;l<u;l++){const{controller:h}=this.getDatasetMeta(l),d=!r&&s.indexOf(h)===-1;h.buildOrUpdateElements(d),o=Math.max(+h.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),r||It(s,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(V_("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){It(this.scales,t=>{Je.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!o_(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:r,count:s}of n){const o=i==="_removeElements"?-s:s;_F(t,r,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=s=>new Set(t.filter(o=>o[0]===s).map((o,a)=>a+","+o.splice(1).join(","))),r=i(0);for(let s=1;s<n;s++)if(!o_(r,i(s)))return;return Array.from(r).map(s=>s.split(",")).map(s=>({method:s[1],start:+s[2],count:+s[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Je.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],It(this.boxes,r=>{i&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,s)=>{r._idx=s}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,Ns(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),r={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(i.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(br.has(this)?this.attached&&!br.running(this)&&br.start(this):(this.draw(),K_({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let r,s;for(r=0,s=n.length;r<s;++r){const o=n[r];(!t||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},r=Qk(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(r&&Qf(n,r),t.controller.draw(),r&&Zf(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Or(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,r){const s=y6.modes[n];return typeof s=="function"?s(this,t,i,r):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let r=i.filter(s=>s&&s._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(r)),r}getContext(){return this.$context||(this.$context=Ys(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const r=i?"show":"hide",s=this.getDatasetMeta(t),o=s.controller._resolveAnimations(void 0,r);wu(n)?(s.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(s,{visible:i}),this.update(a=>a.datasetIndex===t?r:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),br.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),g_(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Xh[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(s,o)=>{n.addEventListener(this,s,o),t[s]=o},r=(s,o,a)=>{s.offsetX=o,s.offsetY=a,this._eventHandler(s)};It(this.options.events,s=>i(s,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(c,l)=>{n.addEventListener(this,c,l),t[c]=l},r=(c,l)=>{t[c]&&(n.removeEventListener(this,c,l),delete t[c])},s=(c,l)=>{this.canvas&&this.resize(c,l)};let o;const a=()=>{r("attach",a),this.attached=!0,this.resize(),i("resize",s),i("detach",o)};o=()=>{this.attached=!1,r("resize",s),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():o()}unbindEvents(){It(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},It(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const r=i?"set":"remove";let s,o,a,c;for(n==="dataset"&&(s=this.getDatasetMeta(t[0].datasetIndex),s.controller["_"+r+"DatasetHoverStyle"]()),a=0,c=t.length;a<c;++a){o=t[a];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[r+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:s,index:o})=>{const a=this.getDatasetMeta(s);if(!a)throw new Error("No dataset found at index "+s);return{datasetIndex:s,element:a.data[o],index:o}});!nf(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const r=this.options.hover,s=(c,l)=>c.filter(u=>!l.some(h=>u.datasetIndex===h.datasetIndex&&u.index===h.index)),o=s(n,t),a=i?t:s(t,n);o.length&&this.updateHoverStyle(o,r.mode,!1),a.length&&r.mode&&this.updateHoverStyle(a,r.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},r=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,r)===!1)return;const s=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,r),(s||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:r=[],options:s}=this,o=n,a=this._getActiveElements(t,r,i,o),c=x3(t),l=wF(t,this._lastEvent,i,c);i&&(this._lastEvent=null,Wt(s.onHover,[t,a,this],this),c&&Wt(s.onClick,[t,a,this],this));const u=!nf(a,r);return(u||n)&&(this._active=a,this._updateHoverStyles(a,r,n)),this._lastEvent=l,u}_getActiveElements(t,n,i,r){if(t.type==="mouseout")return[];if(!i)return n;const s=this.options.hover;return this.getElementsAtEventForMode(t,s.mode,s,r)}}function X_(){return It(ep.instances,e=>e._plugins.invalidate())}function xF(e,t,n){const{startAngle:i,x:r,y:s,outerRadius:o,innerRadius:a,options:c}=t,{borderWidth:l,borderJoinStyle:u}=c,h=Math.min(l/o,Qe(i-n));if(e.beginPath(),e.arc(r,s,o-l/2,i+h/2,n-h/2),a>0){const d=Math.min(l/a,Qe(i-n));e.arc(r,s,a+l/2,n-d/2,i+d/2,!0)}else{const d=Math.min(l/2,o*Qe(i-n));if(u==="round")e.arc(r,s,d,n-Dt/2,i+Dt/2,!0);else if(u==="bevel"){const f=2*d*d,p=-f*Math.cos(n+Dt/2)+r,g=-f*Math.sin(n+Dt/2)+s,m=f*Math.cos(i+Dt/2)+r,b=f*Math.sin(i+Dt/2)+s;e.lineTo(p,g),e.lineTo(m,b)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function CF(e,t,n){const{startAngle:i,pixelMargin:r,x:s,y:o,outerRadius:a,innerRadius:c}=t;let l=r/a;e.beginPath(),e.arc(s,o,a,i-l,n+l),c>r?(l=r/c,e.arc(s,o,c,n+l,i-l,!0)):e.arc(s,o,r,n+fe,i-fe),e.closePath(),e.clip()}function kF(e){return v0(e,["outerStart","outerEnd","innerStart","innerEnd"])}function SF(e,t,n,i){const r=kF(e.options.borderRadius),s=(n-t)/2,o=Math.min(s,i*t/2),a=c=>{const l=(n-Math.min(s,c))*i/2;return Pe(c,0,Math.min(s,l))};return{outerStart:a(r.outerStart),outerEnd:a(r.outerEnd),innerStart:Pe(r.innerStart,0,o),innerEnd:Pe(r.innerEnd,0,o)}}function ga(e,t,n,i){return{x:n+e*Math.cos(t),y:i+e*Math.sin(t)}}function lf(e,t,n,i,r,s){const{x:o,y:a,startAngle:c,pixelMargin:l,innerRadius:u}=t,h=Math.max(t.outerRadius+i+n-l,0),d=u>0?u+i+n+l:0;let f=0;const p=r-c;if(i){const z=u>0?u-i:0,Y=h>0?h-i:0,F=(z+Y)/2,G=F!==0?p*F/(F+i):p;f=(p-G)/2}const g=Math.max(.001,p*h-n/Dt)/h,m=(p-g)/2,b=c+m+f,_=r-m-f,{outerStart:C,outerEnd:S,innerStart:k,innerEnd:$}=SF(t,d,h,_-b),D=h-C,w=h-S,x=b+C/D,M=_-S/w,O=d+k,T=d+$,R=b+k/O,j=_-$/T;if(e.beginPath(),s){const z=(x+M)/2;if(e.arc(o,a,h,x,z),e.arc(o,a,h,z,M),S>0){const B=ga(w,M,o,a);e.arc(B.x,B.y,S,M,_+fe)}const Y=ga(T,_,o,a);if(e.lineTo(Y.x,Y.y),$>0){const B=ga(T,j,o,a);e.arc(B.x,B.y,$,_+fe,j+Math.PI)}const F=(_-$/d+(b+k/d))/2;if(e.arc(o,a,d,_-$/d,F,!0),e.arc(o,a,d,F,b+k/d,!0),k>0){const B=ga(O,R,o,a);e.arc(B.x,B.y,k,R+Math.PI,b-fe)}const G=ga(D,b,o,a);if(e.lineTo(G.x,G.y),C>0){const B=ga(D,x,o,a);e.arc(B.x,B.y,C,b-fe,x)}}else{e.moveTo(o,a);const z=Math.cos(x)*h+o,Y=Math.sin(x)*h+a;e.lineTo(z,Y);const F=Math.cos(M)*h+o,G=Math.sin(M)*h+a;e.lineTo(F,G)}e.closePath()}function EF(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a}=t;let c=t.endAngle;if(s){lf(e,t,n,i,c,r);for(let l=0;l<s;++l)e.fill();isNaN(a)||(c=o+(a%Yt||Yt))}return lf(e,t,n,i,c,r),e.fill(),c}function MF(e,t,n,i,r){const{fullCircles:s,startAngle:o,circumference:a,options:c}=t,{borderWidth:l,borderJoinStyle:u,borderDash:h,borderDashOffset:d,borderRadius:f}=c,p=c.borderAlign==="inner";if(!l)return;e.setLineDash(h||[]),e.lineDashOffset=d,p?(e.lineWidth=l*2,e.lineJoin=u||"round"):(e.lineWidth=l,e.lineJoin=u||"bevel");let g=t.endAngle;if(s){lf(e,t,n,i,g,r);for(let m=0;m<s;++m)e.stroke();isNaN(a)||(g=o+(a%Yt||Yt))}p&&CF(e,t,g),c.selfJoin&&g-o>=Dt&&f===0&&u!=="miter"&&xF(e,t,g),s||(lf(e,t,n,i,g,r),e.stroke())}class DF extends ns{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.getProps(["x","y"],i),{angle:s,distance:o}=Tk(r,{x:t,y:n}),{startAngle:a,endAngle:c,innerRadius:l,outerRadius:u,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),d=(this.options.spacing+this.options.borderWidth)/2,f=lt(h,c-a),p=xu(s,a,c)&&a!==c,g=f>=Yt||p,m=$r(o,l+d,u+d);return g&&m}getCenterPoint(t){const{x:n,y:i,startAngle:r,endAngle:s,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:c,spacing:l}=this.options,u=(r+s)/2,h=(o+a+l+c)/2;return{x:n+Math.cos(u)*h,y:i+Math.sin(u)*h}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:n,circumference:i}=this,r=(n.offset||0)/4,s=(n.spacing||0)/2,o=n.circular;if(this.pixelMargin=n.borderAlign==="inner"?.33:0,this.fullCircles=i>Yt?Math.floor(i/Yt):0,i===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*r,Math.sin(a)*r);const c=1-Math.sin(Math.min(Dt,i||0)),l=r*c;t.fillStyle=n.backgroundColor,t.strokeStyle=n.borderColor,EF(t,this,l,s,o),MF(t,this,l,s,o),t.restore()}}function hS(e,t,n=t){e.lineCap=lt(n.borderCapStyle,t.borderCapStyle),e.setLineDash(lt(n.borderDash,t.borderDash)),e.lineDashOffset=lt(n.borderDashOffset,t.borderDashOffset),e.lineJoin=lt(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=lt(n.borderWidth,t.borderWidth),e.strokeStyle=lt(n.borderColor,t.borderColor)}function $F(e,t,n){e.lineTo(n.x,n.y)}function TF(e){return e.stepped?Y3:e.tension||e.cubicInterpolationMode==="monotone"?q3:$F}function dS(e,t,n={}){const i=e.length,{start:r=0,end:s=i-1}=n,{start:o,end:a}=t,c=Math.max(r,o),l=Math.min(s,a),u=r<o&&s<o||r>a&&s>a;return{count:i,start:c,loop:t.loop,ilen:l<c&&!u?i+l-c:l-c}}function OF(e,t,n,i){const{points:r,options:s}=t,{count:o,start:a,loop:c,ilen:l}=dS(r,n,i),u=TF(s);let{move:h=!0,reverse:d}=i||{},f,p,g;for(f=0;f<=l;++f)p=r[(a+(d?l-f:f))%o],!p.skip&&(h?(e.moveTo(p.x,p.y),h=!1):u(e,g,p,d,s.stepped),g=p);return c&&(p=r[(a+(d?l:0))%o],u(e,g,p,d,s.stepped)),!!c}function IF(e,t,n,i){const r=t.points,{count:s,start:o,ilen:a}=dS(r,n,i),{move:c=!0,reverse:l}=i||{};let u=0,h=0,d,f,p,g,m,b;const _=S=>(o+(l?a-S:S))%s,C=()=>{g!==m&&(e.lineTo(u,m),e.lineTo(u,g),e.lineTo(u,b))};for(c&&(f=r[_(0)],e.moveTo(f.x,f.y)),d=0;d<=a;++d){if(f=r[_(d)],f.skip)continue;const S=f.x,k=f.y,$=S|0;$===p?(k<g?g=k:k>m&&(m=k),u=(h*u+S)/++h):(C(),e.lineTo(S,k),p=$,h=0,g=m=k),b=k}C()}function Tm(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?IF:OF}function PF(e){return e.stepped?kN:e.tension||e.cubicInterpolationMode==="monotone"?SN:uo}function RF(e,t,n,i){let r=t._path;r||(r=t._path=new Path2D,t.path(r,n,i)&&r.closePath()),hS(e,t.options),e.stroke(r)}function AF(e,t,n,i){const{segments:r,options:s}=t,o=Tm(t);for(const a of r)hS(e,s,a.style),e.beginPath(),o(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const LF=typeof Path2D=="function";function NF(e,t,n,i){LF&&!t.options.segment?RF(e,t,n,i):AF(e,t,n,i)}class np extends ns{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const r=i.spanGaps?this._loop:this._fullLoop;mN(this._points,i,t,r,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=ON(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,r=t[n],s=this.points,o=Xk(this,{property:n,start:r,end:r});if(!o.length)return;const a=[],c=PF(i);let l,u;for(l=0,u=o.length;l<u;++l){const{start:h,end:d}=o[l],f=s[h],p=s[d];if(f===p){a.push(f);continue}const g=Math.abs((r-f[n])/(p[n]-f[n])),m=c(f,p,g,i.stepped);m[n]=t[n],a.push(m)}return a.length===1?a[0]:a}pathSegment(t,n,i){return Tm(this)(t,this,n,i)}path(t,n,i){const r=this.segments,s=Tm(this);let o=this._loop;n=n||0,i=i||this.points.length-n;for(const a of r)o&=s(t,this,a,{start:n,end:n+i-1});return!!o}draw(t,n,i,r){const s=this.options||{};(this.points||[]).length&&s.borderWidth&&(t.save(),NF(t,this,i,r),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function Q_(e,t,n,i){const r=e.options,{[n]:s}=e.getProps([n],i);return Math.abs(t-s)<r.radius+r.hitRadius}class FF extends ns{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,n,i){const r=this.options,{x:s,y:o}=this.getProps(["x","y"],i);return Math.pow(t-s,2)+Math.pow(n-o,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(t,n){return Q_(this,t,"x",n)}inYRange(t,n){return Q_(this,t,"y",n)}getCenterPoint(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}size(t){t=t||this.options||{};let n=t.radius||0;n=Math.max(n,n&&t.hoverRadius||0);const i=n&&t.borderWidth||0;return(n+i)*2}draw(t,n){const i=this.options;this.skip||i.radius<.1||!Or(this,n,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,Mm(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function fS(e,t){const{x:n,y:i,base:r,width:s,height:o}=e.getProps(["x","y","base","width","height"],t);let a,c,l,u,h;return e.horizontal?(h=o/2,a=Math.min(n,r),c=Math.max(n,r),l=i-h,u=i+h):(h=s/2,a=n-h,c=n+h,l=Math.min(i,r),u=Math.max(i,r)),{left:a,top:l,right:c,bottom:u}}function xs(e,t,n,i){return e?0:Pe(t,n,i)}function zF(e,t,n){const i=e.options.borderWidth,r=e.borderSkipped,s=zk(i);return{t:xs(r.top,s.top,0,n),r:xs(r.right,s.right,0,t),b:xs(r.bottom,s.bottom,0,n),l:xs(r.left,s.left,0,t)}}function jF(e,t,n){const{enableBorderRadius:i}=e.getProps(["enableBorderRadius"]),r=e.options.borderRadius,s=ko(r),o=Math.min(t,n),a=e.borderSkipped,c=i||_t(r);return{topLeft:xs(!c||a.top||a.left,s.topLeft,0,o),topRight:xs(!c||a.top||a.right,s.topRight,0,o),bottomLeft:xs(!c||a.bottom||a.left,s.bottomLeft,0,o),bottomRight:xs(!c||a.bottom||a.right,s.bottomRight,0,o)}}function BF(e){const t=fS(e),n=t.right-t.left,i=t.bottom-t.top,r=zF(e,n/2,i/2),s=jF(e,n/2,i/2);return{outer:{x:t.left,y:t.top,w:n,h:i,radius:s},inner:{x:t.left+r.l,y:t.top+r.t,w:n-r.l-r.r,h:i-r.t-r.b,radius:{topLeft:Math.max(0,s.topLeft-Math.max(r.t,r.l)),topRight:Math.max(0,s.topRight-Math.max(r.t,r.r)),bottomLeft:Math.max(0,s.bottomLeft-Math.max(r.b,r.l)),bottomRight:Math.max(0,s.bottomRight-Math.max(r.b,r.r))}}}}function dg(e,t,n,i){const r=t===null,s=n===null,a=e&&!(r&&s)&&fS(e,i);return a&&(r||$r(t,a.left,a.right))&&(s||$r(n,a.top,a.bottom))}function WF(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function HF(e,t){e.rect(t.x,t.y,t.w,t.h)}function fg(e,t,n={}){const i=e.x!==n.x?-t:0,r=e.y!==n.y?-t:0,s=(e.x+e.w!==n.x+n.w?t:0)-i,o=(e.y+e.h!==n.y+n.h?t:0)-r;return{x:e.x+i,y:e.y+r,w:e.w+s,h:e.h+o,radius:e.radius}}class UF extends ns{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:i,backgroundColor:r}}=this,{inner:s,outer:o}=BF(this),a=WF(o.radius)?Cu:HF;t.save(),(o.w!==s.w||o.h!==s.h)&&(t.beginPath(),a(t,fg(o,n,s)),t.clip(),a(t,fg(s,-n,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,fg(s,n)),t.fillStyle=r,t.fill(),t.restore()}inRange(t,n,i){return dg(this,t,n,i)}inXRange(t,n){return dg(this,t,null,n)}inYRange(t,n){return dg(this,null,t,n)}getCenterPoint(t){const{x:n,y:i,base:r,horizontal:s}=this.getProps(["x","y","base","horizontal"],t);return{x:s?(n+r)/2:n,y:s?i:(i+r)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}var YF=Object.freeze({__proto__:null,ArcElement:DF,BarElement:UF,LineElement:np,PointElement:FF});const Om=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Z_=Om.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function pS(e){return Om[e%Om.length]}function gS(e){return Z_[e%Z_.length]}function qF(e,t){return e.borderColor=pS(t),e.backgroundColor=gS(t),++t}function VF(e,t){return e.backgroundColor=e.data.map(()=>pS(t++)),t}function KF(e,t){return e.backgroundColor=e.data.map(()=>gS(t++)),t}function GF(e){let t=0;return(n,i)=>{const r=e.getDatasetMeta(i).controller;r instanceof C0?t=VF(n,t):r instanceof eS?t=KF(n,t):r&&(t=qF(n,t))}}function J_(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function XF(e){return e&&(e.borderColor||e.backgroundColor)}function QF(){return Zt.borderColor!=="rgba(0,0,0,0.1)"||Zt.backgroundColor!=="rgba(0,0,0,0.1)"}var ZF={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:i},options:r}=e.config,{elements:s}=r,o=J_(i)||XF(r)||s&&J_(s)||QF();if(!n.forceOverride&&o)return;const a=GF(e);i.forEach(a)}};function JF(e,t,n,i,r){const s=r.samples||i;if(s>=n)return e.slice(t,t+n);const o=[],a=(n-2)/(s-2);let c=0;const l=t+n-1;let u=t,h,d,f,p,g;for(o[c++]=e[u],h=0;h<s-2;h++){let m=0,b=0,_;const C=Math.floor((h+1)*a)+1+t,S=Math.min(Math.floor((h+2)*a)+1,n)+t,k=S-C;for(_=C;_<S;_++)m+=e[_].x,b+=e[_].y;m/=k,b/=k;const $=Math.floor(h*a)+1+t,D=Math.min(Math.floor((h+1)*a)+1,n)+t,{x:w,y:x}=e[u];for(f=p=-1,_=$;_<D;_++)p=.5*Math.abs((w-m)*(e[_].y-x)-(w-e[_].x)*(b-x)),p>f&&(f=p,d=e[_],g=_);o[c++]=d,u=g}return o[c++]=e[l],o}function tz(e,t,n,i){let r=0,s=0,o,a,c,l,u,h,d,f,p,g;const m=[],b=t+n-1,_=e[t].x,S=e[b].x-_;for(o=t;o<t+n;++o){a=e[o],c=(a.x-_)/S*i,l=a.y;const k=c|0;if(k===u)l<p?(p=l,h=o):l>g&&(g=l,d=o),r=(s*r+a.x)/++s;else{const $=o-1;if(!vt(h)&&!vt(d)){const D=Math.min(h,d),w=Math.max(h,d);D!==f&&D!==$&&m.push({...e[D],x:r}),w!==f&&w!==$&&m.push({...e[w],x:r})}o>0&&$!==f&&m.push(e[$]),m.push(a),u=k,s=0,p=g=l,h=d=f=o}}return m}function mS(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function tw(e){e.data.datasets.forEach(t=>{mS(t)})}function ez(e,t){const n=t.length;let i=0,r;const{iScale:s}=e,{min:o,max:a,minDefined:c,maxDefined:l}=s.getUserBounds();return c&&(i=Pe(Tr(t,s.axis,o).lo,0,n-1)),l?r=Pe(Tr(t,s.axis,a).hi+1,i,n)-i:r=n-i,{start:i,count:r}}var nz={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){tw(e);return}const i=e.width;e.data.datasets.forEach((r,s)=>{const{_data:o,indexAxis:a}=r,c=e.getDatasetMeta(s),l=o||r.data;if(gl([a,e.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const u=e.scales[c.xAxisID];if(u.type!=="linear"&&u.type!=="time"||e.options.parsing)return;let{start:h,count:d}=ez(c,l);const f=n.threshold||4*i;if(d<=f){mS(r);return}vt(o)&&(r._data=l,delete r.data,Object.defineProperty(r,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(g){this._data=g}}));let p;switch(n.algorithm){case"lttb":p=JF(l,h,d,i,n);break;case"min-max":p=tz(l,h,d,i);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}r._decimated=p})},destroy(e){tw(e)}};function iz(e,t,n){const i=e.segments,r=e.points,s=t.points,o=[];for(const a of i){let{start:c,end:l}=a;l=ip(c,l,r);const u=Im(n,r[c],r[l],a.loop);if(!t.segments){o.push({source:a,target:u,start:r[c],end:r[l]});continue}const h=Xk(t,u);for(const d of h){const f=Im(n,s[d.start],s[d.end],d.loop),p=Gk(a,r,f);for(const g of p)o.push({source:g,target:d,start:{[n]:ew(u,f,"start",Math.max)},end:{[n]:ew(u,f,"end",Math.min)}})}}return o}function Im(e,t,n,i){if(i)return;let r=t[e],s=n[e];return e==="angle"&&(r=Qe(r),s=Qe(s)),{property:e,start:r,end:s}}function rz(e,t){const{x:n=null,y:i=null}=e||{},r=t.points,s=[];return t.segments.forEach(({start:o,end:a})=>{a=ip(o,a,r);const c=r[o],l=r[a];i!==null?(s.push({x:c.x,y:i}),s.push({x:l.x,y:i})):n!==null&&(s.push({x:n,y:c.y}),s.push({x:n,y:l.y}))}),s}function ip(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function ew(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function vS(e,t){let n=[],i=!1;return Xt(e)?(i=!0,n=e):n=rz(e,t),n.length?new np({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function nw(e){return e&&e.fill!==!1}function sz(e,t,n){let r=e[t].fill;const s=[t];let o;if(!n)return r;for(;r!==!1&&s.indexOf(r)===-1;){if(!ue(r))return r;if(o=e[r],!o)return!1;if(o.visible)return r;s.push(r),r=o.fill}return!1}function oz(e,t,n){const i=uz(e);if(_t(i))return isNaN(i.value)?!1:i;let r=parseFloat(i);return ue(r)&&Math.floor(r)===r?az(i[0],t,r,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function az(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function cz(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:_t(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function lz(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:_t(e)?i=e.value:i=t.getBaseValue(),i}function uz(e){const t=e.options,n=t.fill;let i=lt(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function hz(e){const{scale:t,index:n,line:i}=e,r=[],s=i.segments,o=i.points,a=dz(t,n);a.push(vS({x:null,y:t.bottom},i));for(let c=0;c<s.length;c++){const l=s[c];for(let u=l.start;u<=l.end;u++)fz(r,o[u],a)}return new np({points:r,options:{}})}function dz(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let r=0;r<i.length;r++){const s=i[r];if(s.index===t)break;s.hidden||n.unshift(s.dataset)}return n}function fz(e,t,n){const i=[];for(let r=0;r<n.length;r++){const s=n[r],{first:o,last:a,point:c}=pz(s,t,"x");if(!(!c||o&&a)){if(o)i.unshift(c);else if(e.push(c),!a)break}}e.push(...i)}function pz(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const r=i[n],s=e.segments,o=e.points;let a=!1,c=!1;for(let l=0;l<s.length;l++){const u=s[l],h=o[u.start][n],d=o[u.end][n];if($r(r,h,d)){a=r===h,c=r===d;break}}return{first:a,last:c,point:i}}class yS{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:r,y:s,radius:o}=this;return n=n||{start:0,end:Yt},t.arc(r,s,o,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:r}=this,s=t.angle;return{x:n+Math.cos(s)*r,y:i+Math.sin(s)*r,angle:s}}}function gz(e){const{chart:t,fill:n,line:i}=e;if(ue(n))return mz(t,n);if(n==="stack")return hz(e);if(n==="shape")return!0;const r=vz(e);return r instanceof yS?r:vS(r,i)}function mz(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function vz(e){return(e.scale||{}).getPointPositionForValue?bz(e):yz(e)}function yz(e){const{scale:t={},fill:n}=e,i=cz(n,t);if(ue(i)){const r=t.isHorizontal();return{x:r?i:null,y:r?null:i}}return null}function bz(e){const{scale:t,fill:n}=e,i=t.options,r=t.getLabels().length,s=i.reverse?t.max:t.min,o=lz(n,t,s),a=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,s);return new yS({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(o)})}for(let c=0;c<r;++c)a.push(t.getPointPositionForValue(c,o));return a}function pg(e,t,n){const i=gz(t),{chart:r,index:s,line:o,scale:a,axis:c}=t,l=o.options,u=l.fill,h=l.backgroundColor,{above:d=h,below:f=h}=u||{},p=r.getDatasetMeta(s),g=Qk(r,p);i&&o.points.length&&(Qf(e,n),_z(e,{line:o,target:i,above:d,below:f,area:n,scale:a,axis:c,clip:g}),Zf(e))}function _z(e,t){const{line:n,target:i,above:r,below:s,area:o,scale:a,clip:c}=t,l=n._loop?"angle":t.axis;e.save();let u=s;s!==r&&(l==="x"?(iw(e,i,o.top),gg(e,{line:n,target:i,color:r,scale:a,property:l,clip:c}),e.restore(),e.save(),iw(e,i,o.bottom)):l==="y"&&(rw(e,i,o.left),gg(e,{line:n,target:i,color:s,scale:a,property:l,clip:c}),e.restore(),e.save(),rw(e,i,o.right),u=r)),gg(e,{line:n,target:i,color:u,scale:a,property:l,clip:c}),e.restore()}function iw(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,u=r[c],h=r[ip(c,l,r)];s?(e.moveTo(u.x,u.y),s=!1):(e.lineTo(u.x,n),e.lineTo(u.x,u.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(h.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function rw(e,t,n){const{segments:i,points:r}=t;let s=!0,o=!1;e.beginPath();for(const a of i){const{start:c,end:l}=a,u=r[c],h=r[ip(c,l,r)];s?(e.moveTo(u.x,u.y),s=!1):(e.lineTo(n,u.y),e.lineTo(u.x,u.y)),o=!!t.pathSegment(e,a,{move:o}),o?e.closePath():e.lineTo(n,h.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function gg(e,t){const{line:n,target:i,property:r,color:s,scale:o,clip:a}=t,c=iz(n,i,r);for(const{source:l,target:u,start:h,end:d}of c){const{style:{backgroundColor:f=s}={}}=l,p=i!==!0;e.save(),e.fillStyle=f,wz(e,o,a,p&&Im(r,h,d)),e.beginPath();const g=!!n.pathSegment(e,l);let m;if(p){g?e.closePath():sw(e,i,d,r);const b=!!i.pathSegment(e,u,{move:g,reverse:!0});m=g&&b,m||sw(e,i,h,r)}e.closePath(),e.fill(m?"evenodd":"nonzero"),e.restore()}}function wz(e,t,n,i){const r=t.chart.chartArea,{property:s,start:o,end:a}=i||{};if(s==="x"||s==="y"){let c,l,u,h;s==="x"?(c=o,l=r.top,u=a,h=r.bottom):(c=r.left,l=o,u=r.right,h=a),e.beginPath(),n&&(c=Math.max(c,n.left),u=Math.min(u,n.right),l=Math.max(l,n.top),h=Math.min(h,n.bottom)),e.rect(c,l,u-c,h-l),e.clip()}}function sw(e,t,n,i){const r=t.interpolate(n,i);r&&e.lineTo(r.x,r.y)}var xz={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,r=[];let s,o,a,c;for(o=0;o<i;++o)s=e.getDatasetMeta(o),a=s.dataset,c=null,a&&a.options&&a instanceof np&&(c={visible:e.isDatasetVisible(o),index:o,fill:oz(a,o,i),chart:e,axis:s.controller.options.indexAxis,scale:s.vScale,line:a}),s.$filler=c,r.push(c);for(o=0;o<i;++o)c=r[o],!(!c||c.fill===!1)&&(c.fill=sz(r,o,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",r=e.getSortedVisibleDatasetMetas(),s=e.chartArea;for(let o=r.length-1;o>=0;--o){const a=r[o].$filler;a&&(a.line.updateControlPoints(s,a.axis),i&&a.fill&&pg(e.ctx,a,s))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let r=i.length-1;r>=0;--r){const s=i[r].$filler;nw(s)&&pg(e.ctx,s,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!nw(i)||n.drawTime!=="beforeDatasetDraw"||pg(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const ow=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},Cz=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class aw extends ns{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=Wt(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,r)=>t.sort(i,r,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,r=Ce(i.font),s=r.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=ow(i,s);let l,u;n.font=r.string,this.isHorizontal()?(l=this.maxWidth,u=this._fitRows(o,s,a,c)+10):(u=this.maxHeight,l=this._fitCols(o,r,a,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(u,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,r){const{ctx:s,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],u=r+a;let h=t;s.textAlign="left",s.textBaseline="middle";let d=-1,f=-u;return this.legendItems.forEach((p,g)=>{const m=i+n/2+s.measureText(p.text).width;(g===0||l[l.length-1]+m+2*a>o)&&(h+=u,l[l.length-(g>0?0:1)]=0,f+=u,d++),c[g]={left:0,top:f,row:d,width:m,height:r},l[l.length-1]+=m+a}),h}_fitCols(t,n,i,r){const{ctx:s,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],u=o-t;let h=a,d=0,f=0,p=0,g=0;return this.legendItems.forEach((m,b)=>{const{itemWidth:_,itemHeight:C}=kz(i,n,s,m,r);b>0&&f+C+2*a>u&&(h+=d+a,l.push({width:d,height:f}),p+=d+a,g++,d=f=0),c[b]={left:p,top:f,col:g,width:_,height:C},d=Math.max(d,_),f+=C+a}),h+=d,l.push({width:d,height:f}),h}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:r},rtl:s}}=this,o=ja(s,this.left,this.width);if(this.isHorizontal()){let a=0,c=Ve(i,this.left+r,this.right-this.lineWidths[a]);for(const l of n)a!==l.row&&(a=l.row,c=Ve(i,this.left+r,this.right-this.lineWidths[a])),l.top+=this.top+t+r,l.left=o.leftForLtr(o.x(c),l.width),c+=l.width+r}else{let a=0,c=Ve(i,this.top+t+r,this.bottom-this.columnSizes[a].height);for(const l of n)l.col!==a&&(a=l.col,c=Ve(i,this.top+t+r,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+r,l.left=o.leftForLtr(o.x(l.left),l.width),c+=l.height+r}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Qf(t,this),this._draw(),Zf(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:r}=this,{align:s,labels:o}=t,a=Zt.color,c=ja(t.rtl,this.left,this.width),l=Ce(o.font),{padding:u}=o,h=l.size,d=h/2;let f;this.drawTitle(),r.textAlign=c.textAlign("left"),r.textBaseline="middle",r.lineWidth=.5,r.font=l.string;const{boxWidth:p,boxHeight:g,itemHeight:m}=ow(o,h),b=function($,D,w){if(isNaN(p)||p<=0||isNaN(g)||g<0)return;r.save();const x=lt(w.lineWidth,1);if(r.fillStyle=lt(w.fillStyle,a),r.lineCap=lt(w.lineCap,"butt"),r.lineDashOffset=lt(w.lineDashOffset,0),r.lineJoin=lt(w.lineJoin,"miter"),r.lineWidth=x,r.strokeStyle=lt(w.strokeStyle,a),r.setLineDash(lt(w.lineDash,[])),o.usePointStyle){const M={radius:g*Math.SQRT2/2,pointStyle:w.pointStyle,rotation:w.rotation,borderWidth:x},O=c.xPlus($,p/2),T=D+d;Fk(r,M,O,T,o.pointStyleWidth&&p)}else{const M=D+Math.max((h-g)/2,0),O=c.leftForLtr($,p),T=ko(w.borderRadius);r.beginPath(),Object.values(T).some(R=>R!==0)?Cu(r,{x:O,y:M,w:p,h:g,radius:T}):r.rect(O,M,p,g),r.fill(),x!==0&&r.stroke()}r.restore()},_=function($,D,w){Uo(r,w.text,$,D+m/2,l,{strikethrough:w.hidden,textAlign:c.textAlign(w.textAlign)})},C=this.isHorizontal(),S=this._computeTitleHeight();C?f={x:Ve(s,this.left+u,this.right-i[0]),y:this.top+u+S,line:0}:f={x:this.left+u,y:Ve(s,this.top+S+u,this.bottom-n[0].height),line:0},qk(this.ctx,t.textDirection);const k=m+u;this.legendItems.forEach(($,D)=>{r.strokeStyle=$.fontColor,r.fillStyle=$.fontColor;const w=r.measureText($.text).width,x=c.textAlign($.textAlign||($.textAlign=o.textAlign)),M=p+d+w;let O=f.x,T=f.y;c.setWidth(this.width),C?D>0&&O+M+u>this.right&&(T=f.y+=k,f.line++,O=f.x=Ve(s,this.left+u,this.right-i[f.line])):D>0&&T+k>this.bottom&&(O=f.x=O+n[f.line].width+u,f.line++,T=f.y=Ve(s,this.top+S+u,this.bottom-n[f.line].height));const R=c.x(O);if(b(R,T,$),O=R3(x,O+p+d,C?O+M:this.right,t.rtl),_(c.x(O),T,$),C)f.x+=M+u;else if(typeof $.text!="string"){const j=l.lineHeight;f.y+=bS($,j)+u}else f.y+=k}),Vk(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=Ce(n.font),r=en(n.padding);if(!n.display)return;const s=ja(t.rtl,this.left,this.width),o=this.ctx,a=n.position,c=i.size/2,l=r.top+c;let u,h=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),u=this.top+l,h=Ve(t.align,h,this.right-d);else{const p=this.columnSizes.reduce((g,m)=>Math.max(g,m.height),0);u=l+Ve(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const f=Ve(a,h,h+d);o.textAlign=s.textAlign(g0(a)),o.textBaseline="middle",o.strokeStyle=n.color,o.fillStyle=n.color,o.font=i.string,Uo(o,n.text,f,u,i)}_computeTitleHeight(){const t=this.options.title,n=Ce(t.font),i=en(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,r,s;if($r(t,this.left,this.right)&&$r(n,this.top,this.bottom)){for(s=this.legendHitBoxes,i=0;i<s.length;++i)if(r=s[i],$r(t,r.left,r.left+r.width)&&$r(n,r.top,r.top+r.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!Mz(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const r=this._hoveredItem,s=Cz(r,i);r&&!s&&Wt(n.onLeave,[t,r,this],this),this._hoveredItem=i,i&&!s&&Wt(n.onHover,[t,i,this],this)}else i&&Wt(n.onClick,[t,i,this],this)}}function kz(e,t,n,i,r){const s=Sz(i,e,t,n),o=Ez(r,i,t.lineHeight);return{itemWidth:s,itemHeight:o}}function Sz(e,t,n,i){let r=e.text;return r&&typeof r!="string"&&(r=r.reduce((s,o)=>s.length>o.length?s:o)),t+n.size/2+i.measureText(r).width}function Ez(e,t,n){let i=e;return typeof t.text!="string"&&(i=bS(t,n)),i}function bS(e,t){const n=e.text?e.text.length:0;return t*n}function Mz(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var Dz={id:"legend",_element:aw,start(e,t,n){const i=e.legend=new aw({ctx:e.ctx,options:n,chart:e});Je.configure(e,i,n),Je.addBox(e,i)},stop(e){Je.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;Je.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,r=n.chart;r.isDatasetVisible(i)?(r.hide(i),t.hidden=!0):(r.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:r,color:s,useBorderRadius:o,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(n?0:void 0),u=en(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:s,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(u.width+u.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:r||l.textAlign,borderRadius:o&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class S0 extends ns{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const r=Xt(i.text)?i.text.length:1;this._padding=en(i.padding);const s=r*Ce(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=s:this.width=s}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:i,bottom:r,right:s,options:o}=this,a=o.align;let c=0,l,u,h;return this.isHorizontal()?(u=Ve(a,i,s),h=n+t,l=s-i):(o.position==="left"?(u=i+t,h=Ve(a,r,n),c=Dt*-.5):(u=s-t,h=Ve(a,n,r),c=Dt*.5),l=r-n),{titleX:u,titleY:h,maxWidth:l,rotation:c}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const i=Ce(n.font),s=i.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:c,rotation:l}=this._drawArgs(s);Uo(t,n.text,0,0,i,{color:n.color,maxWidth:c,rotation:l,textAlign:g0(n.align),textBaseline:"middle",translation:[o,a]})}}function $z(e,t){const n=new S0({ctx:e.ctx,options:t,chart:e});Je.configure(e,n,t),Je.addBox(e,n),e.titleBlock=n}var Tz={id:"title",_element:S0,start(e,t,n){$z(e,n)},stop(e){const t=e.titleBlock;Je.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const i=e.titleBlock;Je.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const $h=new WeakMap;var Oz={id:"subtitle",start(e,t,n){const i=new S0({ctx:e.ctx,options:n,chart:e});Je.configure(e,i,n),Je.addBox(e,i),$h.set(e,i)},stop(e){Je.removeBox(e,$h.get(e)),$h.delete(e)},beforeUpdate(e,t,n){const i=$h.get(e);Je.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const vl={average(e){if(!e.length)return!1;let t,n,i=new Set,r=0,s=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const c=a.tooltipPosition();i.add(c.x),r+=c.y,++s}}return s===0||i.size===0?!1:{x:[...i].reduce((a,c)=>a+c)/i.size,y:r/s}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,r=Number.POSITIVE_INFINITY,s,o,a;for(s=0,o=e.length;s<o;++s){const c=e[s].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),u=Sm(t,l);u<r&&(r=u,a=c)}}if(a){const c=a.tooltipPosition();n=c.x,i=c.y}return{x:n,y:i}}};function ji(e,t){return t&&(Xt(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function _r(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function Iz(e,t){const{element:n,datasetIndex:i,index:r}=t,s=e.getDatasetMeta(i).controller,{label:o,value:a}=s.getLabelAndValue(r);return{chart:e,label:o,parsed:s.getParsed(r),raw:e.data.datasets[i].data[r],formattedValue:a,dataset:s.getDataset(),dataIndex:r,datasetIndex:i,element:n}}function cw(e,t){const n=e.chart.ctx,{body:i,footer:r,title:s}=e,{boxWidth:o,boxHeight:a}=t,c=Ce(t.bodyFont),l=Ce(t.titleFont),u=Ce(t.footerFont),h=s.length,d=r.length,f=i.length,p=en(t.padding);let g=p.height,m=0,b=i.reduce((S,k)=>S+k.before.length+k.lines.length+k.after.length,0);if(b+=e.beforeBody.length+e.afterBody.length,h&&(g+=h*l.lineHeight+(h-1)*t.titleSpacing+t.titleMarginBottom),b){const S=t.displayColors?Math.max(a,c.lineHeight):c.lineHeight;g+=f*S+(b-f)*c.lineHeight+(b-1)*t.bodySpacing}d&&(g+=t.footerMarginTop+d*u.lineHeight+(d-1)*t.footerSpacing);let _=0;const C=function(S){m=Math.max(m,n.measureText(S).width+_)};return n.save(),n.font=l.string,It(e.title,C),n.font=c.string,It(e.beforeBody.concat(e.afterBody),C),_=t.displayColors?o+2+t.boxPadding:0,It(i,S=>{It(S.before,C),It(S.lines,C),It(S.after,C)}),_=0,n.font=u.string,It(e.footer,C),n.restore(),m+=p.width,{width:m,height:g}}function Pz(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function Rz(e,t,n,i){const{x:r,width:s}=i,o=n.caretSize+n.caretPadding;if(e==="left"&&r+s+o>t.width||e==="right"&&r-s-o<0)return!0}function Az(e,t,n,i){const{x:r,width:s}=n,{width:o,chartArea:{left:a,right:c}}=e;let l="center";return i==="center"?l=r<=(a+c)/2?"left":"right":r<=s/2?l="left":r>=o-s/2&&(l="right"),Rz(l,e,t,n)&&(l="center"),l}function lw(e,t,n){const i=n.yAlign||t.yAlign||Pz(e,n);return{xAlign:n.xAlign||t.xAlign||Az(e,t,n,i),yAlign:i}}function Lz(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function Nz(e,t,n){let{y:i,height:r}=e;return t==="top"?i+=n:t==="bottom"?i-=r+n:i-=r/2,i}function uw(e,t,n,i){const{caretSize:r,caretPadding:s,cornerRadius:o}=e,{xAlign:a,yAlign:c}=n,l=r+s,{topLeft:u,topRight:h,bottomLeft:d,bottomRight:f}=ko(o);let p=Lz(t,a);const g=Nz(t,c,l);return c==="center"?a==="left"?p+=l:a==="right"&&(p-=l):a==="left"?p-=Math.max(u,d)+r:a==="right"&&(p+=Math.max(h,f)+r),{x:Pe(p,0,i.width-t.width),y:Pe(g,0,i.height-t.height)}}function Th(e,t,n){const i=en(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function hw(e){return ji([],_r(e))}function Fz(e,t,n){return Ys(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function dw(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const _S={beforeTitle:yr,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:yr,beforeBody:yr,beforeLabel:yr,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return vt(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:yr,afterBody:yr,beforeFooter:yr,footer:yr,afterFooter:yr};function Dn(e,t,n,i){const r=e[t].call(n,i);return typeof r>"u"?_S[t].call(n,i):r}class fw extends ns{static positioners=vl;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),r=i.enabled&&n.options.animation&&i.animations,s=new Zk(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(s)),s}getContext(){return this.$context||(this.$context=Fz(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,r=Dn(i,"beforeTitle",this,t),s=Dn(i,"title",this,t),o=Dn(i,"afterTitle",this,t);let a=[];return a=ji(a,_r(r)),a=ji(a,_r(s)),a=ji(a,_r(o)),a}getBeforeBody(t,n){return hw(Dn(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,r=[];return It(t,s=>{const o={before:[],lines:[],after:[]},a=dw(i,s);ji(o.before,_r(Dn(a,"beforeLabel",this,s))),ji(o.lines,Dn(a,"label",this,s)),ji(o.after,_r(Dn(a,"afterLabel",this,s))),r.push(o)}),r}getAfterBody(t,n){return hw(Dn(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,r=Dn(i,"beforeFooter",this,t),s=Dn(i,"footer",this,t),o=Dn(i,"afterFooter",this,t);let a=[];return a=ji(a,_r(r)),a=ji(a,_r(s)),a=ji(a,_r(o)),a}_createItems(t){const n=this._active,i=this.chart.data,r=[],s=[],o=[];let a=[],c,l;for(c=0,l=n.length;c<l;++c)a.push(Iz(this.chart,n[c]));return t.filter&&(a=a.filter((u,h,d)=>t.filter(u,h,d,i))),t.itemSort&&(a=a.sort((u,h)=>t.itemSort(u,h,i))),It(a,u=>{const h=dw(t.callbacks,u);r.push(Dn(h,"labelColor",this,u)),s.push(Dn(h,"labelPointStyle",this,u)),o.push(Dn(h,"labelTextColor",this,u))}),this.labelColors=r,this.labelPointStyles=s,this.labelTextColors=o,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),r=this._active;let s,o=[];if(!r.length)this.opacity!==0&&(s={opacity:0});else{const a=vl[i.position].call(this,r,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const c=this._size=cw(this,i),l=Object.assign({},a,c),u=lw(this.chart,i,l),h=uw(i,l,u,this.chart);this.xAlign=u.xAlign,this.yAlign=u.yAlign,s={opacity:1,x:h.x,y:h.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,s&&this._resolveAnimations().update(this,s),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,r){const s=this.getCaretPosition(t,i,r);n.lineTo(s.x1,s.y1),n.lineTo(s.x2,s.y2),n.lineTo(s.x3,s.y3)}getCaretPosition(t,n,i){const{xAlign:r,yAlign:s}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:c,topRight:l,bottomLeft:u,bottomRight:h}=ko(a),{x:d,y:f}=t,{width:p,height:g}=n;let m,b,_,C,S,k;return s==="center"?(S=f+g/2,r==="left"?(m=d,b=m-o,C=S+o,k=S-o):(m=d+p,b=m+o,C=S-o,k=S+o),_=m):(r==="left"?b=d+Math.max(c,u)+o:r==="right"?b=d+p-Math.max(l,h)-o:b=this.caretX,s==="top"?(C=f,S=C-o,m=b-o,_=b+o):(C=f+g,S=C+o,m=b+o,_=b-o),k=C),{x1:m,x2:b,x3:_,y1:C,y2:S,y3:k}}drawTitle(t,n,i){const r=this.title,s=r.length;let o,a,c;if(s){const l=ja(i.rtl,this.x,this.width);for(t.x=Th(this,i.titleAlign,i),n.textAlign=l.textAlign(i.titleAlign),n.textBaseline="middle",o=Ce(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=o.string,c=0;c<s;++c)n.fillText(r[c],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,c+1===s&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,r,s){const o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=s,u=Ce(s.bodyFont),h=Th(this,"left",s),d=r.x(h),f=c<u.lineHeight?(u.lineHeight-c)/2:0,p=n.y+f;if(s.usePointStyle){const g={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},m=r.leftForLtr(d,l)+l/2,b=p+c/2;t.strokeStyle=s.multiKeyBackground,t.fillStyle=s.multiKeyBackground,Mm(t,g,m,b),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,Mm(t,g,m,b)}else{t.lineWidth=_t(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const g=r.leftForLtr(d,l),m=r.leftForLtr(r.xPlus(d,1),l-2),b=ko(o.borderRadius);Object.values(b).some(_=>_!==0)?(t.beginPath(),t.fillStyle=s.multiKeyBackground,Cu(t,{x:g,y:p,w:l,h:c,radius:b}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),Cu(t,{x:m,y:p+1,w:l-2,h:c-2,radius:b}),t.fill()):(t.fillStyle=s.multiKeyBackground,t.fillRect(g,p,l,c),t.strokeRect(g,p,l,c),t.fillStyle=o.backgroundColor,t.fillRect(m,p+1,l-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:r}=this,{bodySpacing:s,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:u}=i,h=Ce(i.bodyFont);let d=h.lineHeight,f=0;const p=ja(i.rtl,this.x,this.width),g=function(w){n.fillText(w,p.x(t.x+f),t.y+d/2),t.y+=d+s},m=p.textAlign(o);let b,_,C,S,k,$,D;for(n.textAlign=o,n.textBaseline="middle",n.font=h.string,t.x=Th(this,m,i),n.fillStyle=i.bodyColor,It(this.beforeBody,g),f=a&&m!=="right"?o==="center"?l/2+u:l+2+u:0,S=0,$=r.length;S<$;++S){for(b=r[S],_=this.labelTextColors[S],n.fillStyle=_,It(b.before,g),C=b.lines,a&&C.length&&(this._drawColorBox(n,t,S,p,i),d=Math.max(h.lineHeight,c)),k=0,D=C.length;k<D;++k)g(C[k]),d=h.lineHeight;It(b.after,g)}f=0,d=h.lineHeight,It(this.afterBody,g),t.y-=s}drawFooter(t,n,i){const r=this.footer,s=r.length;let o,a;if(s){const c=ja(i.rtl,this.x,this.width);for(t.x=Th(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=c.textAlign(i.footerAlign),n.textBaseline="middle",o=Ce(i.footerFont),n.fillStyle=i.footerColor,n.font=o.string,a=0;a<s;++a)n.fillText(r[a],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,n,i,r){const{xAlign:s,yAlign:o}=this,{x:a,y:c}=t,{width:l,height:u}=i,{topLeft:h,topRight:d,bottomLeft:f,bottomRight:p}=ko(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(a+h,c),o==="top"&&this.drawCaret(t,n,i,r),n.lineTo(a+l-d,c),n.quadraticCurveTo(a+l,c,a+l,c+d),o==="center"&&s==="right"&&this.drawCaret(t,n,i,r),n.lineTo(a+l,c+u-p),n.quadraticCurveTo(a+l,c+u,a+l-p,c+u),o==="bottom"&&this.drawCaret(t,n,i,r),n.lineTo(a+f,c+u),n.quadraticCurveTo(a,c+u,a,c+u-f),o==="center"&&s==="left"&&this.drawCaret(t,n,i,r),n.lineTo(a,c+h),n.quadraticCurveTo(a,c,a+h,c),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,r=i&&i.x,s=i&&i.y;if(r||s){const o=vl[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=cw(this,t),c=Object.assign({},o,this._size),l=lw(n,t,c),u=uw(t,c,l,n);(r._to!==u.x||s._to!==u.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,u))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},s={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=en(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(s,t,r,n),qk(t,n.textDirection),s.y+=o.top,this.drawTitle(s,t,n),this.drawBody(s,t,n),this.drawFooter(s,t,n),Vk(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,r=t.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),s=!nf(i,r),o=this._positionChanged(r,n);(s||o)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,s=this._active||[],o=this._getActiveElements(t,s,n,i),a=this._positionChanged(o,t),c=n||!nf(o,s)||a;return c&&(this._active=o,(r.enabled||r.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),c}_getActiveElements(t,n,i,r){const s=this.options;if(t.type==="mouseout")return[];if(!r)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,s.mode,s,i);return s.reverse&&o.reverse(),o}_positionChanged(t,n){const{caretX:i,caretY:r,options:s}=this,o=vl[s.position].call(this,t,n);return o!==!1&&(i!==o.x||r!==o.y)}}var zz={id:"tooltip",_element:fw,positioners:vl,afterInit(e,t,n){n&&(e.tooltip=new fw({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:_S},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},jz=Object.freeze({__proto__:null,Colors:ZF,Decimation:nz,Filler:xz,Legend:Dz,SubTitle:Oz,Title:Tz,Tooltip:zz});const Bz=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function Wz(e,t,n,i){const r=e.indexOf(t);if(r===-1)return Bz(e,t,n,i);const s=e.lastIndexOf(t);return r!==s?n:r}const Hz=(e,t)=>e===null?null:Pe(Math.round(e),0,t);function pw(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class Uz extends ia{static id="category";static defaults={ticks:{callback:pw}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:r,label:s}of n)i[r]===s&&i.splice(r,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(vt(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:Wz(i,t,lt(n,t),this._addedLabels),Hz(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:r}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(r=this.getLabels().length-1)),this.min=i,this.max=r}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,r=[];let s=this.getLabels();s=t===0&&n===s.length-1?s:s.slice(t,n+1),this._valueRange=Math.max(s.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let o=t;o<=n;o++)r.push({value:o});return r}getLabelForValue(t){return pw.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function Yz(e,t){const n=[],{bounds:r,step:s,min:o,max:a,precision:c,count:l,maxTicks:u,maxDigits:h,includeBounds:d}=e,f=s||1,p=u-1,{min:g,max:m}=t,b=!vt(o),_=!vt(a),C=!vt(l),S=(m-g)/(h+1);let k=c_((m-g)/p/f)*f,$,D,w,x;if(k<1e-14&&!b&&!_)return[{value:g},{value:m}];x=Math.ceil(m/k)-Math.floor(g/k),x>p&&(k=c_(x*k/p/f)*f),vt(c)||($=Math.pow(10,c),k=Math.ceil(k*$)/$),r==="ticks"?(D=Math.floor(g/k)*k,w=Math.ceil(m/k)*k):(D=g,w=m),b&&_&&s&&M3((a-o)/s,k/1e3)?(x=Math.round(Math.min((a-o)/k,u)),k=(a-o)/x,D=o,w=a):C?(D=b?o:D,w=_?a:w,x=l-1,k=(w-D)/x):(x=(w-D)/k,Yl(x,Math.round(x),k/1e3)?x=Math.round(x):x=Math.ceil(x));const M=Math.max(l_(k),l_(D));$=Math.pow(10,vt(c)?M:c),D=Math.round(D*$)/$,w=Math.round(w*$)/$;let O=0;for(b&&(d&&D!==o?(n.push({value:o}),D<o&&O++,Yl(Math.round((D+O*k)*$)/$,o,gw(o,S,e))&&O++):D<o&&O++);O<x;++O){const T=Math.round((D+O*k)*$)/$;if(_&&T>a)break;n.push({value:T})}return _&&d&&w!==a?n.length&&Yl(n[n.length-1].value,a,gw(a,S,e))?n[n.length-1].value=a:n.push({value:a}):(!_||w===a)&&n.push({value:w}),n}function gw(e,t,{horizontal:n,minRotation:i}){const r=Ti(i),s=(n?Math.sin(r):Math.cos(r))||.001,o=.75*t*(""+e).length;return Math.min(t/s,o)}class uf extends ia{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return vt(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:r,max:s}=this;const o=c=>r=n?r:c,a=c=>s=i?s:c;if(t){const c=tr(r),l=tr(s);c<0&&l<0?a(0):c>0&&l>0&&o(0)}if(r===s){let c=s===0?1:Math.abs(s*.05);a(s+c),t||o(r-c)}this.min=r,this.max=s}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,r;return i?(r=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const r={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},s=this._range||this,o=Yz(r,s);return t.bounds==="ticks"&&$k(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const r=(i-n)/Math.max(t.length-1,1)/2;n-=r,i+=r}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return ah(t,this.chart.options.locale,this.options.ticks.format)}}class qz extends uf{static id="linear";static defaults={ticks:{callback:Xf.formatters.numeric}};determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ue(t)?t:0,this.max=ue(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=Ti(this.options.ticks.minRotation),r=(t?Math.sin(i):Math.cos(i))||.001,s=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,s.lineHeight/r))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const Su=e=>Math.floor(_s(e)),ro=(e,t)=>Math.pow(10,Su(e)+t);function mw(e){return e/Math.pow(10,Su(e))===1}function vw(e,t,n){const i=Math.pow(10,n),r=Math.floor(e/i);return Math.ceil(t/i)-r}function Vz(e,t){const n=t-e;let i=Su(n);for(;vw(e,t,i)>10;)i++;for(;vw(e,t,i)<10;)i--;return Math.min(i,Su(e))}function Kz(e,{min:t,max:n}){t=qn(e.min,t);const i=[],r=Su(t);let s=Vz(t,n),o=s<0?Math.pow(10,Math.abs(s)):1;const a=Math.pow(10,s),c=r>s?Math.pow(10,r):0,l=Math.round((t-c)*o)/o,u=Math.floor((t-c)/a/10)*a*10;let h=Math.floor((l-u)/Math.pow(10,s)),d=qn(e.min,Math.round((c+u+h*Math.pow(10,s))*o)/o);for(;d<n;)i.push({value:d,major:mw(d),significand:h}),h>=10?h=h<15?15:20:h++,h>=20&&(s++,h=2,o=s>=0?1:o),d=Math.round((c+u+h*Math.pow(10,s))*o)/o;const f=qn(e.max,d);return i.push({value:f,major:mw(f),significand:h}),i}class Gz extends ia{static id="logarithmic";static defaults={ticks:{callback:Xf.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const i=uf.prototype.parse.apply(this,[t,n]);if(i===0){this._zero=!0;return}return ue(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ue(t)?Math.max(0,t):null,this.max=ue(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!ue(this._userMin)&&(this.min=t===ro(this.min,0)?ro(this.min,-1):ro(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let i=this.min,r=this.max;const s=a=>i=t?i:a,o=a=>r=n?r:a;i===r&&(i<=0?(s(1),o(10)):(s(ro(i,-1)),o(ro(r,1)))),i<=0&&s(ro(r,-1)),r<=0&&o(ro(i,1)),this.min=i,this.max=r}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},i=Kz(n,this);return t.bounds==="ticks"&&$k(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":ah(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=_s(t),this._valueRange=_s(this.max)-_s(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(_s(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}function Pm(e){const t=e.ticks;if(t.display&&e.display){const n=en(t.backdropPadding);return lt(t.font&&t.font.size,Zt.font.size)+n.height}return 0}function Xz(e,t,n){return n=Xt(n)?n:[n],{w:U3(e,t.string,n),h:n.length*t.lineHeight}}function yw(e,t,n,i,r){return e===i||e===r?{start:t-n/2,end:t+n/2}:e<i||e>r?{start:t-n,end:t}:{start:t,end:t+n}}function Qz(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),i=[],r=[],s=e._pointLabels.length,o=e.options.pointLabels,a=o.centerPointLabels?Dt/s:0;for(let c=0;c<s;c++){const l=o.setContext(e.getPointLabelContext(c));r[c]=l.padding;const u=e.getPointPosition(c,e.drawingArea+r[c],a),h=Ce(l.font),d=Xz(e.ctx,h,e._pointLabels[c]);i[c]=d;const f=Qe(e.getIndexAngle(c)+a),p=Math.round(f0(f)),g=yw(p,u.x,d.w,0,180),m=yw(p,u.y,d.h,90,270);Zz(n,t,f,g,m)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=ej(e,i,r)}function Zz(e,t,n,i,r){const s=Math.abs(Math.sin(n)),o=Math.abs(Math.cos(n));let a=0,c=0;i.start<t.l?(a=(t.l-i.start)/s,e.l=Math.min(e.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/s,e.r=Math.max(e.r,t.r+a)),r.start<t.t?(c=(t.t-r.start)/o,e.t=Math.min(e.t,t.t-c)):r.end>t.b&&(c=(r.end-t.b)/o,e.b=Math.max(e.b,t.b+c))}function Jz(e,t,n){const i=e.drawingArea,{extra:r,additionalAngle:s,padding:o,size:a}=n,c=e.getPointPosition(t,i+r+o,s),l=Math.round(f0(Qe(c.angle+fe))),u=rj(c.y,a.h,l),h=nj(l),d=ij(c.x,a.w,h);return{visible:!0,x:c.x,y:u,textAlign:h,left:d,top:u,right:d+a.w,bottom:u+a.h}}function tj(e,t){if(!t)return!0;const{left:n,top:i,right:r,bottom:s}=e;return!(Or({x:n,y:i},t)||Or({x:n,y:s},t)||Or({x:r,y:i},t)||Or({x:r,y:s},t))}function ej(e,t,n){const i=[],r=e._pointLabels.length,s=e.options,{centerPointLabels:o,display:a}=s.pointLabels,c={extra:Pm(s)/2,additionalAngle:o?Dt/r:0};let l;for(let u=0;u<r;u++){c.padding=n[u],c.size=t[u];const h=Jz(e,u,c);i.push(h),a==="auto"&&(h.visible=tj(h,l),h.visible&&(l=h))}return i}function nj(e){return e===0||e===180?"center":e<180?"left":"right"}function ij(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function rj(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function sj(e,t,n){const{left:i,top:r,right:s,bottom:o}=n,{backdropColor:a}=t;if(!vt(a)){const c=ko(t.borderRadius),l=en(t.backdropPadding);e.fillStyle=a;const u=i-l.left,h=r-l.top,d=s-i+l.width,f=o-r+l.height;Object.values(c).some(p=>p!==0)?(e.beginPath(),Cu(e,{x:u,y:h,w:d,h:f,radius:c}),e.fill()):e.fillRect(u,h,d,f)}}function oj(e,t){const{ctx:n,options:{pointLabels:i}}=e;for(let r=t-1;r>=0;r--){const s=e._pointLabelItems[r];if(!s.visible)continue;const o=i.setContext(e.getPointLabelContext(r));sj(n,o,s);const a=Ce(o.font),{x:c,y:l,textAlign:u}=s;Uo(n,e._pointLabels[r],c,l+a.lineHeight/2,a,{color:o.color,textAlign:u,textBaseline:"middle"})}}function wS(e,t,n,i){const{ctx:r}=e;if(n)r.arc(e.xCenter,e.yCenter,t,0,Yt);else{let s=e.getPointPosition(0,t);r.moveTo(s.x,s.y);for(let o=1;o<i;o++)s=e.getPointPosition(o,t),r.lineTo(s.x,s.y)}}function aj(e,t,n,i,r){const s=e.ctx,o=t.circular,{color:a,lineWidth:c}=t;!o&&!i||!a||!c||n<0||(s.save(),s.strokeStyle=a,s.lineWidth=c,s.setLineDash(r.dash||[]),s.lineDashOffset=r.dashOffset,s.beginPath(),wS(e,n,o,i),s.closePath(),s.stroke(),s.restore())}function cj(e,t,n){return Ys(e,{label:n,index:t,type:"pointLabel"})}class lj extends uf{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Xf.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=en(Pm(this.options)/2),n=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=ue(t)&&!isNaN(t)?t:0,this.max=ue(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Pm(this.options))}generateTickLabels(t){uf.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,i)=>{const r=Wt(this.options.pointLabels.callback,[n,i],this);return r||r===0?r:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?Qz(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,i,r){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((i-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,i,r))}getIndexAngle(t){const n=Yt/(this._pointLabels.length||1),i=this.options.startAngle||0;return Qe(t*n+Ti(i))}getDistanceFromCenterForValue(t){if(vt(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(vt(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const i=n[t];return cj(this.getContext(),t,i)}}getPointPosition(t,n,i=0){const r=this.getIndexAngle(t)-fe+i;return{x:Math.cos(r)*n+this.xCenter,y:Math.sin(r)*n+this.yCenter,angle:r}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:i,right:r,bottom:s}=this._pointLabelItems[t];return{left:n,top:i,right:r,bottom:s}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),wS(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:i,grid:r,border:s}=n,o=this._pointLabels.length;let a,c,l;if(n.pointLabels.display&&oj(this,o),r.display&&this.ticks.forEach((u,h)=>{if(h!==0||h===0&&this.min<0){c=this.getDistanceFromCenterForValue(u.value);const d=this.getContext(h),f=r.setContext(d),p=s.setContext(d);aj(this,f,c,o,p)}}),i.display){for(t.save(),a=o-1;a>=0;a--){const u=i.setContext(this.getPointLabelContext(a)),{color:h,lineWidth:d}=u;!d||!h||(t.lineWidth=d,t.strokeStyle=h,t.setLineDash(u.borderDash),t.lineDashOffset=u.borderDashOffset,c=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),l=this.getPointPosition(a,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;const r=this.getIndexAngle(0);let s,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(r),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,c)=>{if(c===0&&this.min>=0&&!n.reverse)return;const l=i.setContext(this.getContext(c)),u=Ce(l.font);if(s=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){t.font=u.string,o=t.measureText(a.label).width,t.fillStyle=l.backdropColor;const h=en(l.backdropPadding);t.fillRect(-o/2-h.left,-s-u.size/2-h.top,o+h.width,u.size+h.height)}Uo(t,a.label,0,-s,u,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),t.restore()}drawTitle(){}}const rp={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Ln=Object.keys(rp);function bw(e,t){return e-t}function _w(e,t){if(vt(t))return null;const n=e._adapter,{parser:i,round:r,isoWeekday:s}=e._parseOpts;let o=t;return typeof i=="function"&&(o=i(o)),ue(o)||(o=typeof i=="string"?n.parse(o,i):n.parse(o)),o===null?null:(r&&(o=r==="week"&&(lc(s)||s===!0)?n.startOf(o,"isoWeek",s):n.startOf(o,r)),+o)}function ww(e,t,n,i){const r=Ln.length;for(let s=Ln.indexOf(e);s<r-1;++s){const o=rp[Ln[s]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((n-t)/(a*o.size))<=i)return Ln[s]}return Ln[r-1]}function uj(e,t,n,i,r){for(let s=Ln.length-1;s>=Ln.indexOf(n);s--){const o=Ln[s];if(rp[o].common&&e._adapter.diff(r,i,o)>=t-1)return o}return Ln[n?Ln.indexOf(n):0]}function hj(e){for(let t=Ln.indexOf(e)+1,n=Ln.length;t<n;++t)if(rp[Ln[t]].common)return Ln[t]}function xw(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:r}=p0(n,t),s=n[i]>=t?n[i]:n[r];e[s]=!0}}function dj(e,t,n,i){const r=e._adapter,s=+r.startOf(t[0].value,i),o=t[t.length-1].value;let a,c;for(a=s;a<=o;a=+r.add(a,1,i))c=n[a],c>=0&&(t[c].major=!0);return t}function Cw(e,t,n){const i=[],r={},s=t.length;let o,a;for(o=0;o<s;++o)a=t[o],r[a]=o,i.push({value:a,major:!1});return s===0||!n?i:dj(e,i,r,n)}class Rm extends ia{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),r=this._adapter=new f6._date(t.adapters.date);r.init(n),Ul(i.displayFormats,r.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:_w(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:r,max:s,minDefined:o,maxDefined:a}=this.getUserBounds();function c(l){!o&&!isNaN(l.min)&&(r=Math.min(r,l.min)),!a&&!isNaN(l.max)&&(s=Math.max(s,l.max))}(!o||!a)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),r=ue(r)&&!isNaN(r)?r:+n.startOf(Date.now(),i),s=ue(s)&&!isNaN(s)?s:+n.endOf(Date.now(),i)+1,this.min=Math.min(r,s-1),this.max=Math.max(r+1,s)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,r=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const s=this.min,o=this.max,a=O3(r,s,o);return this._unit=n.unit||(i.autoSkip?ww(n.minUnit,this.min,this.max,this._getLabelCapacity(s)):uj(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:hj(this._unit),this.initOffsets(r),t.reverse&&a.reverse(),Cw(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,r,s;this.options.offset&&t.length&&(r=this.getDecimalForValue(t[0]),t.length===1?n=1-r:n=(this.getDecimalForValue(t[1])-r)/2,s=this.getDecimalForValue(t[t.length-1]),t.length===1?i=s:i=(s-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;n=Pe(n,0,o),i=Pe(i,0,o),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,r=this.options,s=r.time,o=s.unit||ww(s.minUnit,n,i,this._getLabelCapacity(n)),a=lt(r.ticks.stepSize,1),c=o==="week"?s.isoWeekday:!1,l=lc(c)||c===!0,u={};let h=n,d,f;if(l&&(h=+t.startOf(h,"isoWeek",c)),h=+t.startOf(h,l?"day":o),t.diff(i,n,o)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+o);const p=r.ticks.source==="data"&&this.getDataTimestamps();for(d=h,f=0;d<i;d=+t.add(d,a,o),f++)xw(u,d,p);return(d===i||r.bounds==="ticks"||f===1)&&xw(u,d,p),Object.keys(u).sort(bw).map(g=>+g)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const r=this.options.time.displayFormats,s=this._unit,o=n||r[s];return this._adapter.format(t,o)}_tickFormatFunction(t,n,i,r){const s=this.options,o=s.ticks.callback;if(o)return Wt(o,[t,n,i],this);const a=s.time.displayFormats,c=this._unit,l=this._majorUnit,u=c&&a[c],h=l&&a[l],d=i[n],f=l&&h&&d&&d.major;return this._adapter.format(t,r||(f?h:u))}generateTickLabels(t){let n,i,r;for(n=0,i=t.length;n<i;++n)r=t[n],r.label=this._tickFormatFunction(r.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,r=Ti(this.isHorizontal()?n.maxRotation:n.minRotation),s=Math.cos(r),o=Math.sin(r),a=this._resolveTickFontOptions(0).size;return{w:i*s+a*o,h:i*o+a*s}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,r=i[n.unit]||i.millisecond,s=this._tickFormatFunction(t,0,Cw(this,[t],this._majorUnit),r),o=this._getLabelSize(s),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,i=r.length;n<i;++n)t=t.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const r=this.getLabels();for(n=0,i=r.length;n<i;++n)t.push(_w(this,r[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Ik(t.sort(bw))}}function Oh(e,t,n){let i=0,r=e.length-1,s,o,a,c;n?(t>=e[i].pos&&t<=e[r].pos&&({lo:i,hi:r}=Tr(e,"pos",t)),{pos:s,time:a}=e[i],{pos:o,time:c}=e[r]):(t>=e[i].time&&t<=e[r].time&&({lo:i,hi:r}=Tr(e,"time",t)),{time:s,pos:a}=e[i],{time:o,pos:c}=e[r]);const l=o-s;return l?a+(c-a)*(t-s)/l:a}class fj extends Rm{static id="timeseries";static defaults=Rm.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Oh(n,this.min),this._tableRange=Oh(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,r=[],s=[];let o,a,c,l,u;for(o=0,a=t.length;o<a;++o)l=t[o],l>=n&&l<=i&&r.push(l);if(r.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(o=0,a=r.length;o<a;++o)u=r[o+1],c=r[o-1],l=r[o],Math.round((u+c)/2)!==l&&s.push({time:l,pos:o/(a-1)});return s}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((r,s)=>r-s)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Oh(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Oh(this._table,i*this._tableRange+this._minPos,!0)}}var pj=Object.freeze({__proto__:null,CategoryScale:Uz,LinearScale:qz,LogarithmicScale:Gz,RadialLinearScale:lj,TimeScale:Rm,TimeSeriesScale:fj});const gj=[d6,YF,jz,pj];var mj=Object.defineProperty,vj=Object.getOwnPropertyDescriptor,xS=e=>{throw TypeError(e)},ch=(e,t,n,i)=>{for(var r=i>1?void 0:i?vj(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&mj(t,n,r),r},yj=(e,t,n)=>t.has(e)||xS("Cannot "+n),bj=(e,t,n)=>t.has(e)?xS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Qh=(e,t,n)=>(yj(e,t,"access private method"),n),Ta,Am,E0;ep.register(...gj);ep.defaults.animation=!1;let Yo=class extends mt{constructor(){super(...arguments),bj(this,Ta),this.chartType="bar",this.data={labels:[],datasets:[]},this.options={},this.ariaChartLabel="Chart"}render(){return E`
      <canvas aria-label=${this.ariaChartLabel} role="img"></canvas>
    `}updated(e){if(!this._chart){Qh(this,Ta,Am).call(this);return}e.has("chartType")?(this._chart.destroy(),Qh(this,Ta,Am).call(this)):(e.has("data")||e.has("options"))&&(this._chart.data=this.data,e.has("options")&&(this._chart.options=Qh(this,Ta,E0).call(this)),this._chart.update())}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>{if(!this._chart)return;const e=this.clientWidth,t=this.clientHeight;if(e===0||t===0)return;const n=window.devicePixelRatio,i=this._chart.canvas;i.style.width=`${e}px`,i.style.height=`${t}px`,i.width=Math.round(e*n),i.height=Math.round(t*n),this._chart.width=e,this._chart.height=t,this._chart.ctx.setTransform(n,0,0,n,0,0),this._chart.update()}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._chart?.destroy(),this._chart=void 0}};Ta=new WeakSet;Am=function(){const t=this.shadowRoot.querySelector("canvas").getContext("2d");if(!t)return;const n=this.chartType==="pie"||this.chartType==="doughnut";this._chart=new ep(t,{type:this.chartType,data:this.data,options:Qh(this,Ta,E0).call(this),plugins:n?[{id:"squareChartArea",afterLayout(i){const r=i.chartArea,s=r.right-r.left,o=r.bottom-r.top;if(s===o)return;const a=i.legend,c=a?.position;if(s>o){const u=(s-o)/2;r.left+=u,r.right-=u,a&&c==="right"?(a.left-=u,a.right-=u):a&&c==="left"&&(a.left+=u,a.right+=u)}else{const u=(o-s)/2;r.top+=u,r.bottom-=u,a&&c==="bottom"?(a.top-=u,a.bottom-=u):a&&c==="top"&&(a.top+=u,a.bottom+=u)}}}]:[]})};E0=function(){return cc({responsive:!1,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{sort:(e,t)=>(e.text??"").localeCompare(t.text??"")}}}},this.options)};Yo.styles=pt`
    :host {
      display: block;
      position: relative;
      flex: 1;
      min-height: 0;
    }
  `;ch([H({type:String})],Yo.prototype,"chartType",2);ch([H({type:Object})],Yo.prototype,"data",2);ch([H({type:Object})],Yo.prototype,"options",2);ch([H({type:String,attribute:"aria-chart-label"})],Yo.prototype,"ariaChartLabel",2);Yo=ch([Et("chart-wrapper")],Yo);var _j=Object.defineProperty,wj=Object.getOwnPropertyDescriptor,CS=e=>{throw TypeError(e)},kS=(e,t,n,i)=>{for(var r=i>1?void 0:i?wj(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&_j(t,n,r),r},xj=(e,t,n)=>t.has(e)||CS("Cannot "+n),Cj=(e,t,n)=>t.has(e)?CS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),kw=(e,t,n)=>(xj(e,t,"access private method"),n),Zh,SS,ES;const kj=[{value:Fa.Duration.from({months:1}),label:"1M"},{value:Fa.Duration.from({months:6}),label:"6M"},{value:Fa.Duration.from({years:1}),label:"1Y"},{value:null,label:"All"}];class Sj extends Event{constructor(t){super("time-range-change",{bubbles:!0}),this.timeRange=t}}let hf=class extends mt{constructor(){super(...arguments),Cj(this,Zh),this.value=null}render(){return kj.map(({value:e,label:t})=>E`<button
          class=${kw(this,Zh,SS).call(this,e)?"active":""}
          @click=${()=>kw(this,Zh,ES).call(this,e)}
        >${t}</button>`)}};Zh=new WeakSet;SS=function(e){if(this.value===null||e===null)return this.value===e;const t=Fa.Now.plainDateISO();return Fa.Duration.compare(this.value,e,{relativeTo:t})===0};ES=function(e){this.value=e,this.dispatchEvent(new Sj(e))};hf.styles=pt`
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
  `;kS([H({attribute:!1})],hf.prototype,"value",2);hf=kS([Et("time-range-picker")],hf);const sp=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;function Lm(e,t){const n=new Map;for(const i of e)for(const r of t(i))n.set(r,(n.get(r)??0)+i.amount);return n}function Sw(e,t){const n=new Map;for(const i of t){const r=e.get(i.id);r!==void 0&&n.set(i.name,r)}return n}function Ej(e,t){switch(t){case"day":return e.slice(0,10);case"month":return e.slice(0,7);case"year":return e.slice(0,4)}}function Ew(e,t){return Lm(e,n=>[Ej(n.date,t)])}function Mj(e,t){return e.filter(n=>{if(t.tagId!==void 0&&!n.tagIds.includes(t.tagId)||t.excludedTagId!==void 0&&n.tagIds.includes(t.excludedTagId)||t.merchantId!==void 0&&n.merchantId!==t.merchantId||t.excludedMerchantId!==void 0&&n.merchantId===t.excludedMerchantId||t.startDate&&n.date<t.startDate||t.endDate&&n.date>t.endDate)return!1;if(t.amountFilter){const{operator:i,value:r}=t.amountFilter;if(i==="lt"&&!(n.amount<r)||i==="gt"&&!(n.amount>r)||i==="lte"&&!(n.amount<=r)||i==="gte"&&!(n.amount>=r))return!1}if(t.descriptionFilter){const i=n.description.toLowerCase().includes(t.descriptionFilter.toLowerCase());if(t.descriptionFilterMode==="exclude"&&i||t.descriptionFilterMode==="include"&&!i)return!1}return!0})}function Dj(e,t){return t<2?e.map(n=>n):e.map((n,i)=>{const r=Math.max(0,i-t+1),s=e.slice(r,i+1).sort((a,c)=>a-c),o=Math.floor(s.length/2);return s.length%2===0?(s[o-1]+s[o])/2:s[o]})}function $j(e){return Math.max(6,Math.min(12,Math.round(e*.1)))}function Ke(e,t){const n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();if(t==null)return n;const i=n.match(/^lch\(([^)]+)\)$/);return i?`lch(${i[1]} / ${t})`:`color-mix(in srgb, ${n} ${Math.round(t*100)}%, transparent)`}function Tj(e){const{allEntries:t,displayEntries:n,label:i,formatLabel:r}=e,s=t.map(([,g])=>g),o=$j(s.length),a=Dj(s,o),c=n[0]?.[0],l=c?t.findIndex(([g])=>g===c):0,u=n.map(([,g])=>g),h=u.map(Math.abs),d=a.slice(l,l+n.length).map(Math.abs),f=r?n.map(([g])=>r(g)):n.map(([g])=>g),p=[{label:i,data:h,backgroundColor:u.map(g=>g<0?Ke("--budgee-negative",.5):Ke("--budgee-positive",.5)),hoverBackgroundColor:u.map(g=>g<0?Ke("--budgee-negative",.75):Ke("--budgee-positive",.75)),borderColor:u.map(g=>g<0?Ke("--budgee-negative"):Ke("--budgee-positive")),borderWidth:1,maxBarThickness:50}];return h.length>=2&&p.push({type:"line",label:`${i} (${o}-pt median)`,data:d,borderColor:Ke("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}),{labels:f,datasets:p}}const MS=pt`
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
`;function DS(e){return E`
    <div class="resize-handle" @pointerdown=${t=>e.startResize(t,{horizontal:!0})}></div>
    <div class="resize-handle-bottom" @pointerdown=${t=>e.startResize(t,{vertical:!0})}></div>
    <div class="resize-handle-corner" @pointerdown=${t=>e.startResize(t,{horizontal:!0,vertical:!0})}></div>
  `}function $S(e){class t extends e{constructor(){super(...arguments),this.maxColumns=12,this.maxRows=4}get _resizableConfig(){return{}}_onResized(i){}_onLiveColSpan(i){}startResize(i,{horizontal:r,vertical:s}){i.preventDefault(),i.stopPropagation();const o=i.currentTarget;o.setPointerCapture(i.pointerId);const a=this.closest(".chart-grid")??this.closest(".table-grid")??this.parentElement;if(!a)return;const c=a.getBoundingClientRect(),l=getComputedStyle(a),u=r?l.gridTemplateColumns.split(" ").length:0,h=s?parseFloat(l.gridTemplateRows.split(" ")[0])||200:0,d=s&&parseFloat(l.rowGap)||0,f=this._resizableConfig;let p=f.colSpan??1,g=f.rowSpan??1;const m=r&&s?"data-resizing-corner":r?"data-resizing":"data-resizing-vertical";this.setAttribute(m,"");const b=C=>{if(r){const k=(C.clientX-c.left)/c.width,$=Math.round(k*u),D=this.getBoundingClientRect().left-c.left,w=Math.round(D/c.width*u);p=Math.max(1,Math.min(u-w,$-w)),this.style.gridColumn=`span ${p}`,this._onLiveColSpan(p)}if(s){const S=this.getBoundingClientRect().top-c.top,$=C.clientY-c.top-S;g=Math.max(1,Math.round(($+d)/(h+d))),this.style.gridRow=`span ${g}`}},_=()=>{this.removeAttribute(m),this._onLiveColSpan(void 0),o.removeEventListener("pointermove",b),o.removeEventListener("pointerup",_),this._onResized({...r&&{colSpan:Math.max(1,Math.min(this.maxColumns,p))},...s&&{rowSpan:Math.max(1,Math.min(this.maxRows,g))}})};o.addEventListener("pointermove",b),o.addEventListener("pointerup",_)}}return t}var Oj=Object.defineProperty,Ij=Object.getOwnPropertyDescriptor,TS=e=>{throw TypeError(e)},$c=(e,t,n,i)=>{for(var r=i>1?void 0:i?Ij(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Oj(t,n,r),r},OS=(e,t,n)=>t.has(e)||TS("Cannot "+n),Mw=(e,t,n)=>(OS(e,t,"read from private field"),n?n.call(e):t.get(e)),Pj=(e,t,n)=>t.has(e)?TS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Cs=(e,t,n)=>(OS(e,t,"access private method"),n),hi,IS,PS,Nm,RS,AS,Fm,LS,NS;const Dw=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function $w(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,n,i]=e.split("-");return`${Dw[Number(n)-1]} ${Number(i)}, ${t}`}if(/^\d{4}-\d{2}$/.test(e)){const[t,n]=e.split("-");return`${Dw[Number(n)-1]} ${t}`}return e}function Rj(e){const t={};for(const n of e)switch(n.field){case"tag":n.operator==="is"&&(t.tagId=n.value),n.operator==="isNot"&&(t.excludedTagId=n.value);break;case"merchant":n.operator==="is"&&(t.merchantId=n.value),n.operator==="isNot"&&(t.excludedMerchantId=n.value);break;case"amount":t.amountFilter={operator:n.operator,value:Number(n.value)};break;case"description":t.descriptionFilter=n.value,t.descriptionFilterMode=n.operator==="contains"?"include":"exclude";break}return t}let Fs=class extends $S(mt){constructor(){super(...arguments),Pj(this,hi),this.transactions=[],this.tags=[],this.merchants=[]}get _resizableConfig(){return this.config}_onResized(e){this.dispatchEvent(new CustomEvent("chart-resized",{detail:{id:this.config.id,...e}}))}_onLiveColSpan(e){this._liveColSpan=e}render(){return E`
      ${DS(this)}
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${Cs(this,hi,LS)}>${ye(sp)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${Cs(this,hi,NS)}>${ye(Mc)}</button>
        </div>
      </div>
      <chart-wrapper
        .chartType=${this.config.chartType}
        .data=${Mw(this,hi,IS)}
        .options=${Mw(this,hi,PS)}
      ></chart-wrapper>
    `}};hi=new WeakSet;IS=function(){const e=this.config.filters?Rj(this.config.filters):{tagId:this.config.tagId,merchantId:this.config.merchantId,amountFilter:this.config.direction==="debit"?{operator:"lt",value:0}:this.config.direction==="credit"?{operator:"gt",value:0}:void 0,descriptionFilter:this.config.descriptionFilter,descriptionFilterMode:this.config.descriptionFilterMode},t=Mj(this.transactions,e),{granularity:n}=this.config,i=n==="byTag"?Sw(Lm(t,f=>f.tagIds),Cs(this,hi,Nm).call(this,this.tags,this.config.excludedTagIds)):n==="byMerchant"?Sw(Lm(t,f=>f.merchantId?[f.merchantId]:[]),Cs(this,hi,Nm).call(this,this.merchants,this.config.excludedMerchantIds)):Ew(t,n),r=n==="byTag"||n==="byMerchant",s=this.config.chartType==="pie"||this.config.chartType==="doughnut";let o=[...i.entries()].sort(([f],[p])=>f.localeCompare(p));if(s&&(o=Cs(this,hi,RS).call(this,o),o.sort(([,f],[,p])=>Math.abs(p)-Math.abs(f))),!r&&this.config.chartType==="bar"){const p=[...Ew(t,n).entries()].sort(([g],[m])=>g.localeCompare(m));return Tj({allEntries:p,displayEntries:o,label:this.config.title,formatLabel:$w})}const a=this.config.chartType==="bar",c=o.map(([,f])=>f),l=s||a?c.map(Math.abs):c,u=s?Cs(this,hi,AS).call(this,o):a?c.map(f=>f<0?Ke("--budgee-negative",.5):Ke("--budgee-positive",.5)):Ke("--budgee-primary",.5),h=s?Ke("--budgee-surface"):a?c.map(f=>f<0?Ke("--budgee-negative"):Ke("--budgee-positive")):Ke("--budgee-primary"),d=a?c.map(f=>f<0?Ke("--budgee-negative",.75):Ke("--budgee-positive",.75)):void 0;return{labels:o.map(([f])=>$w(f)),datasets:[{label:this.config.title,data:l,backgroundColor:u,hoverBackgroundColor:d,borderColor:h,borderWidth:1,maxBarThickness:50}]}};PS=function(){const e=this.config.chartType==="pie"||this.config.chartType==="doughnut",t=this.config.legendPosition??"top",n=t==="hidden"?{display:!1}:{position:t},i=this._liveColSpan??this.config.colSpan??1,r=Math.max(2,Math.round(i/this.maxColumns*12));return{...e&&{interaction:{mode:"nearest",intersect:!0}},...!e&&{scales:{x:{ticks:{autoSkip:!0,maxTicksLimit:r}}}},plugins:{legend:n}}};Nm=function(e,t){if(!t?.length)return e;const n=new Set(t);return e.filter(i=>!n.has(i.id))};RS=function(e){const t=e.reduce((s,[,o])=>s+Math.abs(o),0);if(t===0)return e;const n=t*.01,i=[];let r=0;for(const[s,o]of e)Math.abs(o)<n?r+=o:i.push([s,o]);return r!==0&&i.push(["other",r]),i};AS=function(e){if(this.config.granularity==="byTag"){const t=new Map(this.tags.map(n=>[n.name,n]));return e.map(([n])=>t.get(n)?.color??Cs(this,hi,Fm).call(this,n))}return e.map(([t])=>Cs(this,hi,Fm).call(this,t))};Fm=function(e){let t=0;for(let i=0;i<e.length;i++)t=t*31+e.charCodeAt(i)|0;return`lch(55% 50 ${(t%360+360)%360})`};LS=function(){this.dispatchEvent(new CustomEvent("chart-edit",{detail:{chart:this.config}}))};NS=function(){this.dispatchEvent(new CustomEvent("chart-deleted",{detail:{id:this.config.id}}))};Fs.styles=[Dc,MS,pt`
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
    `];$c([H({type:Object})],Fs.prototype,"config",2);$c([H({type:Array})],Fs.prototype,"transactions",2);$c([H({type:Array})],Fs.prototype,"tags",2);$c([H({type:Array})],Fs.prototype,"merchants",2);$c([P()],Fs.prototype,"_liveColSpan",2);Fs=$c([Et("dashboard-chart-card")],Fs);function FS(e){if(e.startsWith("#"))return Aj(e);const t=Lj(e);if(t)return t;const n=e.match(/hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\s*\)/);return n?Nj(Number(n[1]),Number(n[2]),Number(n[3])):{r:0,g:0,b:0}}function Aj(e){const t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function Lj(e){const t=e.match(/lch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);if(!t)return null;const n=Number(t[1]),i=Number(t[2]),s=Number(t[3])*Math.PI/180,o=i*Math.cos(s),a=i*Math.sin(s),c=(n+16)/116,l=o/500+c,u=c-a/200,h=.008856,d=903.3,f=l**3>h?l**3:(116*l-16)/d,p=n>d*h?((n+16)/116)**3:n/d,g=u**3>h?u**3:(116*u-16)/d,m=f*.95047,b=p*1,_=g*1.08883,C=3.2404542*m-1.5371385*b-.4985314*_,S=-.969266*m+1.8760108*b+.041556*_,k=.0556434*m-.2040259*b+1.0572252*_,$=D=>{const w=Math.max(0,Math.min(1,D));return w<=.0031308?12.92*w:1.055*w**(1/2.4)-.055};return{r:Math.round($(C)*255),g:Math.round($(S)*255),b:Math.round($(k)*255)}}function Nj(e,t,n){const i=t/100,r=n/100,s=(1-Math.abs(2*r-1))*i,o=s*(1-Math.abs(e/60%2-1)),a=r-s/2;let c=0,l=0,u=0;return e<60?(c=s,l=o):e<120?(c=o,l=s):e<180?(l=s,u=o):e<240?(l=o,u=s):e<300?(c=o,u=s):(c=s,u=o),{r:Math.round((c+a)*255),g:Math.round((l+a)*255),b:Math.round((u+a)*255)}}function zS(e){return Fj(e)>70?"black":"white"}function Fj(e){const t=e.match(/lch\(\s*([\d.]+)\s/);if(t)return Number(t[1]);const{r:n,g:i,b:r}=FS(e),[s,o,a]=[n,i,r].map(l=>{const u=l/255;return u<=.03928?u/12.92:((u+.055)/1.055)**2.4}),c=.2126*s+.7152*o+.0722*a;return c>.008856?116*Math.cbrt(c)-16:903.3*c}const zj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,jj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Bj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Wj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Hj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Uj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Yj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,qj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Vj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Kj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Gj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Xj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Qj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Zj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Jj=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,t8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,e8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,n8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,i8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,r8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,s8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,o8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,a8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,c8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,l8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,u8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,h8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,d8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,f8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,p8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,g8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,m8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,v8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,y8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,b8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,_8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,w8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,x8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,C8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,k8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,S8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,E8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,M8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,D8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,$8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,T8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,O8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,I8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,P8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,R8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,A8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,L8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,N8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,F8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,z8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,j8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,B8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,W8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,H8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,U8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Y8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
</svg>`,q8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,V8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,K8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,G8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,X8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Q8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,Z8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`,J8=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;var t7=Object.defineProperty,e7=Object.getOwnPropertyDescriptor,jS=e=>{throw TypeError(e)},op=(e,t,n,i)=>{for(var r=i>1?void 0:i?e7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&t7(t,n,r),r},BS=(e,t,n)=>t.has(e)||jS("Cannot "+n),Vc=(e,t,n)=>(BS(e,t,"read from private field"),n?n.call(e):t.get(e)),mg=(e,t,n)=>t.has(e)?jS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),yl=(e,t,n)=>(BS(e,t,"access private method"),n),Jh,td,us,WS,M0,HS,US,YS;const ap={apple:zj,banknote:O2,beaker:jj,beer:Bj,bell:Wj,bike:Hj,"book-open":Uj,briefcase:qj,bug:Vj,cake:Kj,calculator:Gj,calendar:Xj,camera:Qj,car:Zj,carrot:Jj,"chef-hat":t8,"circle-dollar-sign":e8,"circle-plus":n8,clock:r8,cloud:s8,coffee:o8,"credit-card":a8,box:Yj,"cup-soda":c8,dumbbell:l8,flask:u8,gamepad:h8,gift:d8,globe:f8,"graduation-cap":p8,hamburger:g8,heart:m8,home:v8,joystick:y8,key:b8,lightbulb:_8,mail:w8,"map-pin":x8,milk:C8,monitor:k8,music:S8,newspaper:E8,paintbrush:M8,"paw-print":D8,phone:$8,pizza:T8,plane:O8,puzzle:I8,question:i8,receipt:P8,scale:R8,scissors:A8,"shield-check":L8,shirt:N8,"shopping-bag":F8,"shopping-cart":z8,sparkles:j8,star:B8,store:I2,sun:W8,ticket:H8,trophy:U8,truck:Y8,tv:q8,user:V8,users:K8,utensils:G8,wallet:X8,wifi:Q8,wine:Z8,wrench:sp,zap:J8},Tw=Object.entries(ap);let dc=class extends mt{constructor(){super(...arguments),mg(this,us),this.value="",this._open=!1,this._search="",mg(this,Jh,e=>{if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._search="")}),mg(this,td,()=>{this._open&&yl(this,us,M0).call(this)})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",Vc(this,Jh),!0),window.addEventListener("scroll",Vc(this,td),!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",Vc(this,Jh),!0),window.removeEventListener("scroll",Vc(this,td),!0)}render(){const e=this.value?ap[this.value]:null;return E`
      <button
        class="trigger ${e?"":"placeholder"}"
        @click=${yl(this,us,WS)}
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
                ${Vc(this,us,YS).map(([t,n])=>E`
                    <button
                      class="icon-option ${this.value===t?"selected":""}"
                      title=${t}
                      @click=${()=>yl(this,us,HS).call(this,t)}
                    >
                      ${ye(n)}
                    </button>
                  `)}
              </div>
              ${this.value?E`<button class="clear-btn" @click=${yl(this,us,US)}>Clear icon</button>`:nt}
            </div>
          `:nt}
    `}};Jh=new WeakMap;td=new WeakMap;us=new WeakSet;WS=function(){this._open=!this._open,this._search="",this._open&&this.updateComplete.then(()=>yl(this,us,M0).call(this))};M0=function(){const e=this.shadowRoot?.querySelector(".trigger"),t=this.shadowRoot?.querySelector(".popup");if(!e||!t)return;const n=e.getBoundingClientRect(),i=t.offsetHeight,r=window.innerHeight-n.bottom;r<i+4&&n.top>r?t.style.top=`${n.top-i-4}px`:t.style.top=`${n.bottom+4}px`,t.style.left=`${n.left}px`};HS=function(e){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:e}})),this._open=!1,this._search=""};US=function(){this.dispatchEvent(new CustomEvent("icon-selected",{detail:{icon:""}})),this._open=!1,this._search=""};YS=function(){if(!this._search)return Tw;const e=this._search.toLowerCase();return Tw.filter(([t])=>t.includes(e))};dc.styles=pt`
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
  `;op([H({type:String})],dc.prototype,"value",2);op([P()],dc.prototype,"_open",2);op([P()],dc.prototype,"_search",2);dc=op([Et("icon-picker")],dc);var n7=Object.defineProperty,i7=Object.getOwnPropertyDescriptor,qS=e=>{throw TypeError(e)},D0=(e,t,n,i)=>{for(var r=i>1?void 0:i?i7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&n7(t,n,r),r},r7=(e,t,n)=>t.has(e)||qS("Cannot "+n),s7=(e,t,n)=>t.has(e)?qS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),o7=(e,t,n)=>(r7(e,t,"access private method"),n),zm,VS;let Eu=class extends mt{constructor(){super(...arguments),s7(this,zm),this.tags=[],this.tagIds=[]}render(){return E`${this.tagIds.map(e=>{const t=this.tags.find(r=>r.id===e),n=t?.color??"var(--budgee-primary)",i=t?.color?zS(t.color):"white";return E`<span class="tag-pill" style="background:${n};color:${i}">${o7(this,zm,VS).call(this,e)}</span>`})}`}};zm=new WeakSet;VS=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?ap[t.icon]:null;return n?E`<span class="pill-icon">${ye(n)}</span> ${t.name}`:t.name};Eu.styles=pt`
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
  `;D0([H({type:Array})],Eu.prototype,"tags",2);D0([H({type:Array})],Eu.prototype,"tagIds",2);Eu=D0([Et("tag-pills")],Eu);var a7=Object.defineProperty,c7=Object.getOwnPropertyDescriptor,KS=e=>{throw TypeError(e)},Vs=(e,t,n,i)=>{for(var r=i>1?void 0:i?c7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&a7(t,n,r),r},l7=(e,t,n)=>t.has(e)||KS("Cannot "+n),u7=(e,t,n)=>t.has(e)?KS("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),le=(e,t,n)=>(l7(e,t,"access private method"),n),Qt,GS,XS,cp,QS,ZS,lp,up,JS,tE,eE,nE,iE,rE,sE,oE,aE;let lr=class extends $S(mt){constructor(){super(...arguments),u7(this,Qt),this.transactions=[],this.tags=[],this.merchants=[],this.accounts=[],this._page=1,this._pageSize=10}get _resizableConfig(){return this.config}_onResized(e){this.dispatchEvent(new CustomEvent("table-resized",{detail:{id:this.config.id,...e}}))}render(){return E`
      ${DS(this)}
      <div class="header">
        <h4>${this.config.title}</h4>
        <div class="actions">
          <button class="icon-btn" title="Edit" aria-label="Edit" @click=${le(this,Qt,GS)}>${ye(sp)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete" aria-label="Delete" @click=${le(this,Qt,XS)}>${ye(Mc)}</button>
        </div>
      </div>
      ${le(this,Qt,aE).call(this)}
    `}};Qt=new WeakSet;GS=function(){this.dispatchEvent(new CustomEvent("table-edit",{detail:{table:this.config}}))};XS=function(){this.dispatchEvent(new CustomEvent("table-deleted",{detail:{id:this.config.id}}))};cp=function(e){this._page=e.detail.page,this._pageSize=e.detail.pageSize};QS=function(e){return e?this.merchants.find(t=>t.id===e)?.name??"":""};ZS=function(e){return e?this.accounts.find(t=>t.id===e)?.name??"":""};lp=function(e){return{date:"Date",amount:"Amount",description:"Description",merchant:"Merchant",tags:"Tags",account:"Account",name:"Name",transactionCount:"Transactions",totalAmount:"Total Amount"}[e]};up=function(e){return e==="amount"||e==="totalAmount"};JS=function(){const e=[...this.transactions].sort((r,s)=>s.date.localeCompare(r.date)),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,cp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,up).call(this,r)?"col-amount":""}>${le(this,Qt,lp).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,tE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};tE=function(e,t){switch(t){case"date":return E`<td>${e.date}</td>`;case"amount":return E`<td class="col-amount ${e.amount<0?"amount-negative":"amount-positive"}">${e.amount.toFixed(2)}</td>`;case"description":return E`<td>${e.description}</td>`;case"merchant":return E`<td>${le(this,Qt,QS).call(this,e.merchantId)}</td>`;case"tags":return E`<td><tag-pills .tags=${this.tags} .tagIds=${e.tagIds}></tag-pills></td>`;case"account":return E`<td>${le(this,Qt,ZS).call(this,e.accountId)}</td>`;default:return E`
          <td></td>
        `}};eE=function(){const e=If(this.transactions,t=>[t.merchantId]);return this.merchants.map(t=>{const n=e.get(t.id);return{merchant:t,transactionCount:n?.count??0,totalAmount:n?.total??0}})};nE=function(){const e=le(this,Qt,eE).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,cp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,up).call(this,r)?"col-amount":""}>${le(this,Qt,lp).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,iE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};iE=function(e,t){switch(t){case"name":return E`<td>${e.merchant.name}</td>`;case"transactionCount":return E`<td>${e.transactionCount}</td>`;case"totalAmount":return E`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return E`
          <td></td>
        `}};rE=function(){const e=If(this.transactions,t=>t.tagIds);return this.tags.map(t=>{const n=e.get(t.id);return{tag:t,transactionCount:n?.count??0,totalAmount:n?.total??0}})};sE=function(){const e=le(this,Qt,rE).call(this),t=(this._page-1)*this._pageSize,n=e.slice(t,t+this._pageSize),i=this.config.columns;return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${10}
        storageKey="dashboard-table-${this.config.id}"
        @page-change=${le(this,Qt,cp)}
      >
        <table>
          <thead>
            <tr>
              ${i.map(r=>E`
                <th class=${le(this,Qt,up).call(this,r)?"col-amount":""}>${le(this,Qt,lp).call(this,r)}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${n.map(r=>E`
              <tr>
                ${i.map(s=>le(this,Qt,oE).call(this,r,s))}
              </tr>
            `)}
          </tbody>
        </table>
      </paginated-table>
    `};oE=function(e,t){switch(t){case"name":return E`<td>${e.tag.name}</td>`;case"transactionCount":return E`<td>${e.transactionCount}</td>`;case"totalAmount":return E`<td class="col-amount ${e.totalAmount<0?"amount-negative":"amount-positive"}">${e.totalAmount.toFixed(2)}</td>`;default:return E`
          <td></td>
        `}};aE=function(){switch(this.config.model){case"transactions":return le(this,Qt,JS).call(this);case"merchants":return le(this,Qt,nE).call(this);case"tags":return le(this,Qt,sE).call(this);default:return nt}};lr.styles=[Zr,Dc,MS,pt`
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
    `];Vs([H({type:Object})],lr.prototype,"config",2);Vs([H({type:Array})],lr.prototype,"transactions",2);Vs([H({type:Array})],lr.prototype,"tags",2);Vs([H({type:Array})],lr.prototype,"merchants",2);Vs([H({type:Array})],lr.prototype,"accounts",2);Vs([P()],lr.prototype,"_page",2);Vs([P()],lr.prototype,"_pageSize",2);lr=Vs([Et("dashboard-table-card")],lr);var h7=Object.defineProperty,d7=Object.getOwnPropertyDescriptor,cE=e=>{throw TypeError(e)},Ks=(e,t,n,i)=>{for(var r=i>1?void 0:i?d7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&h7(t,n,r),r},f7=(e,t,n)=>t.has(e)||cE("Cannot "+n),p7=(e,t,n)=>t.has(e)?cE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),vg=(e,t,n)=>(f7(e,t,"access private method"),n),bl,lE,uE,hE;const $0={transactions:[{id:"date",label:"Date"},{id:"amount",label:"Amount"},{id:"description",label:"Description"},{id:"merchant",label:"Merchant"},{id:"tags",label:"Tags"},{id:"account",label:"Account"}],merchants:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}],tags:[{id:"name",label:"Name"},{id:"transactionCount",label:"Transaction Count"},{id:"totalAmount",label:"Total Amount"}]};function dE(e){return $0[e].map(t=>t.id)}let ur=class extends mt{constructor(){super(...arguments),p7(this,bl),this._title="",this._model="transactions",this._columns=dE("transactions"),this._colSpan=1,this._rowSpan=1,this._initialized=!1}updated(e){e.has("editingTable")&&this.editingTable&&!this._initialized&&(this._title=this.editingTable.title,this._model=this.editingTable.model,this._columns=[...this.editingTable.columns],this._colSpan=this.editingTable.colSpan??1,this._rowSpan=this.editingTable.rowSpan??1,this._initialized=!0)}render(){const e=$0[this._model];return E`
      <h4>${this.editingTable?"Edit Table":"Add Table"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${t=>{this._title=t.target.value}}
        />
        <label>Model:</label>
        <select @change=${t=>{vg(this,bl,lE).call(this,t.target.value)}}>
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
              @change=${n=>vg(this,bl,uE).call(this,t.id,n.target.checked)}
            />
            ${t.label}
          </label>
        `)}
      </div>
      <button @click=${vg(this,bl,hE)}>${this.editingTable?"Update Table":"Save to Dashboard"}</button>
    `}};bl=new WeakSet;lE=function(e){this._model=e,this._columns=dE(e)};uE=function(e,t){if(t){const n=$0[this._model].map(i=>i.id);this._columns=n.filter(i=>this._columns.includes(i)||i===e)}else this._columns=this._columns.filter(n=>n!==e)};hE=function(){const e=this._title.trim();!e||this._columns.length===0||(this.dispatchEvent(new CustomEvent("table-saved",{detail:{id:this.editingTable?.id,title:e,model:this._model,columns:this._columns,colSpan:this._colSpan,rowSpan:this._rowSpan}})),this._title="",this._initialized=!1)};ur.styles=[Li,pt`
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
    `];Ks([H({type:Object})],ur.prototype,"editingTable",2);Ks([P()],ur.prototype,"_title",2);Ks([P()],ur.prototype,"_model",2);Ks([P()],ur.prototype,"_columns",2);Ks([P()],ur.prototype,"_colSpan",2);Ks([P()],ur.prototype,"_rowSpan",2);Ks([P()],ur.prototype,"_initialized",2);ur=Ks([Et("table-configurator")],ur);var g7=Object.defineProperty,m7=Object.getOwnPropertyDescriptor,fE=e=>{throw TypeError(e)},Hn=(e,t,n,i)=>{for(var r=i>1?void 0:i?m7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&g7(t,n,r),r},T0=(e,t,n)=>t.has(e)||fE("Cannot "+n),Ow=(e,t,n)=>(T0(e,t,"read from private field"),n?n.call(e):t.get(e)),Iw=(e,t,n)=>t.has(e)?fE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Pw=(e,t,n,i)=>(T0(e,t,"write to private field"),t.set(e,n),n),de=(e,t,n)=>(T0(e,t,"access private method"),n),_l,Kt,hr,jm,pE,gE,mE,vE,yE,bE,_E,wE,xE,CE,kE;let nn=class extends mt{constructor(){super(...arguments),Iw(this,Kt),this._transactions=null,this._tags=[],this._merchants=[],this._accounts=[],this._charts=[],this._tables=[],this._timeRange=null,this.columns=12,this.rows=12,this._showChartConfigurator=!1,this._showTableConfigurator=!1,Iw(this,_l,[])}willUpdate(){this.style.setProperty("--grid-columns",String(this.columns)),this.style.setProperty("--grid-row-height",`${800/this.rows}px`)}connectedCallback(){super.connectedCallback(),de(this,Kt,hr).call(this);const e=Qo(()=>de(this,Kt,hr).call(this),300);Promise.all([_e.subscribe(e),pe.subscribe(e),Ie.subscribe(e),ke.subscribe(e),vi.subscribe(e),cr.subscribe(e)]).then(t=>{Pw(this,_l,t)})}disconnectedCallback(){super.disconnectedCallback(),this._chartSortable?.destroy(),this._tableSortable?.destroy();for(const e of Ow(this,_l))e.unsubscribe();Pw(this,_l,[])}updated(){de(this,Kt,jm).call(this,".chart-grid","chart",e=>{this._chartSortable=e}),de(this,Kt,jm).call(this,".table-grid","table",e=>{this._tableSortable=e})}render(){return this._transactions===null?E`
        <h3>Dashboard</h3>
        <p>Loading…</p>
      `:this._transactions.length===0?E`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `:E`
      <div class="dashboard-header">
        <h3>Dashboard</h3>
        <time-range-picker .value=${this._timeRange} @time-range-change=${de(this,Kt,vE)}></time-range-picker>
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
                  .transactions=${Ow(this,Kt,mE)}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  @chart-edit=${de(this,Kt,yE)}
                  @chart-resized=${de(this,Kt,bE)}
                  @chart-deleted=${de(this,Kt,_E)}
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
                  @table-edit=${de(this,Kt,xE)}
                  @table-resized=${de(this,Kt,CE)}
                  @table-deleted=${de(this,Kt,kE)}
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
                @chart-saved=${de(this,Kt,gE)}
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
                @table-saved=${de(this,Kt,wE)}
              ></table-configurator>
            </budgee-modal>
          `:nt}
    `}};_l=new WeakMap;Kt=new WeakSet;hr=async function(){this._transactions=await _e.all(),this._tags=await pe.all(),this._merchants=await Ie.all(),this._accounts=await ke.all(),this._charts=await vi.all(),this._tables=await cr.all(),this._charts.length===0&&(await vi.create({title:"Monthly Overview",chartType:"bar",granularity:"month",colSpan:this.columns,position:0}),this._charts=await vi.all())};jm=function(e,t,n){const i=t==="chart"?this._chartSortable:this._tableSortable,r=this.shadowRoot?.querySelector(e);if(!r){i?.destroy(),n(void 0);return}i?.el!==r&&(i?.destroy(),n(et.create(r,{animation:150,onEnd:()=>de(this,Kt,pE).call(this,t)})))};pE=async function(e){const t=e==="chart"?".chart-grid":".table-grid",n=e==="chart"?"data-chart-id":"data-table-id",i=this.shadowRoot?.querySelector(t);if(!i)return;const r=i.querySelectorAll(`[${n}]`),s=[];r.forEach(o=>{const a=o.getAttribute(n);a&&s.push(a)}),e==="chart"?await vi.reorder(s):await cr.reorder(s),await de(this,Kt,hr).call(this)};gE=async function(e){const t=e.detail;t.id?await vi.update(t.id,{title:t.title,chartType:t.chartType,granularity:t.granularity,excludedTagIds:t.excludedTagIds,excludedMerchantIds:t.excludedMerchantIds,legendPosition:t.legendPosition,filters:t.filters}):await vi.create({...t,colSpan:this.columns,position:this._charts.length}),this._showChartConfigurator=!1,this._editingChart=void 0,await de(this,Kt,hr).call(this)};mE=function(){if(this._transactions===null)return null;if(this._timeRange===null)return this._transactions;const e=Fa.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(t=>t.date>=e)};vE=function(e){this._timeRange=e.timeRange};yE=function(e){this._editingChart=e.detail.chart,this._showChartConfigurator=!0};bE=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await vi.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await de(this,Kt,hr).call(this)};_E=async function(e){await vi.remove(e.detail.id),await de(this,Kt,hr).call(this)};wE=async function(e){const t=e.detail;t.id?await cr.update(t.id,{title:t.title,model:t.model,columns:t.columns,colSpan:t.colSpan,rowSpan:t.rowSpan}):await cr.create({...t,position:this._tables.length}),this._showTableConfigurator=!1,this._editingTable=void 0,await de(this,Kt,hr).call(this)};xE=function(e){this._editingTable=e.detail.table,this._showTableConfigurator=!0};CE=async function(e){const{id:t,colSpan:n,rowSpan:i}=e.detail;await cr.update(t,{...n!==void 0&&{colSpan:n},...i!==void 0&&{rowSpan:i}}),await de(this,Kt,hr).call(this)};kE=async function(e){await cr.remove(e.detail.id),await de(this,Kt,hr).call(this)};nn.styles=[Li,Zr,pt`
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
    `];Hn([P()],nn.prototype,"_transactions",2);Hn([P()],nn.prototype,"_tags",2);Hn([P()],nn.prototype,"_merchants",2);Hn([P()],nn.prototype,"_accounts",2);Hn([P()],nn.prototype,"_charts",2);Hn([P()],nn.prototype,"_tables",2);Hn([P()],nn.prototype,"_timeRange",2);Hn([H({type:Number})],nn.prototype,"columns",2);Hn([H({type:Number})],nn.prototype,"rows",2);Hn([P()],nn.prototype,"_showChartConfigurator",2);Hn([P()],nn.prototype,"_editingChart",2);Hn([P()],nn.prototype,"_showTableConfigurator",2);Hn([P()],nn.prototype,"_editingTable",2);nn=Hn([Et("budgee-dashboard")],nn);var v7=Object.defineProperty,y7=Object.getOwnPropertyDescriptor,SE=e=>{throw TypeError(e)},ra=(e,t,n,i)=>{for(var r=i>1?void 0:i?y7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&v7(t,n,r),r},O0=(e,t,n)=>t.has(e)||SE("Cannot "+n),b7=(e,t,n)=>(O0(e,t,"read from private field"),n?n.call(e):t.get(e)),Rw=(e,t,n)=>t.has(e)?SE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Aw=(e,t,n,i)=>(O0(e,t,"write to private field"),t.set(e,n),n),$n=(e,t,n)=>(O0(e,t,"access private method"),n),wl,qe,Bm,EE,ME,DE,$E,ed,nd,TE,OE;let Vr=class extends mt{constructor(){super(...arguments),Rw(this,qe),this._rows=null,this._currentPage=1,this._pageSize=25,this._filter="",this._sortCol="name",this._sortDir="asc",Rw(this,wl,[])}connectedCallback(){super.connectedCallback(),$n(this,qe,Bm).call(this);const e=Qo(()=>$n(this,qe,Bm).call(this),300);Promise.all([Ie.subscribe(e),_e.subscribe(e)]).then(t=>{Aw(this,wl,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of b7(this,wl))e.unsubscribe();Aw(this,wl,[])}render(){if(this._rows===null)return E`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;if(this._rows.length===0)return E`
        <budgee-empty-state
          heading="No merchants yet"
          description="Merchants are created automatically when you assign them to transactions or rules."
        ></budgee-empty-state>
      `;const e=this._rows.filter(r=>$n(this,qe,$E).call(this,r)),t=$n(this,qe,TE).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize);return E`
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${25}
        storageKey="merchants"
        ?filterable=${!0}
        @page-change=${$n(this,qe,ME)}
        @filter-change=${$n(this,qe,DE)}
      >
        <table>
          <thead>
            <tr>
              <th class="sortable" @click=${()=>$n(this,qe,ed).call(this,"name")}>
                Name${$n(this,qe,nd).call(this,"name")}
              </th>
              <th class="sortable" @click=${()=>$n(this,qe,ed).call(this,"count")}>
                Transactions${$n(this,qe,nd).call(this,"count")}
              </th>
              <th class="sortable col-amount" @click=${()=>$n(this,qe,ed).call(this,"spend")}>
                Total Spend${$n(this,qe,nd).call(this,"spend")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(r=>E`
              <tr @click=${()=>$n(this,qe,OE).call(this,r.merchant.id)}>
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
    `}};wl=new WeakMap;qe=new WeakSet;Bm=async function(){const e=await Ie.all();this._rows=e.map(t=>({merchant:t,transactionCount:null,totalSpend:null})),$n(this,qe,EE).call(this)};EE=async function(){const e=await _e.all(),t=If(e,n=>[n.merchantId]);this._rows=this._rows.map(n=>{const i=t.get(n.merchant.id);return{...n,transactionCount:i?.count??0,totalSpend:i?.total??0}})};ME=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};DE=function(e){this._filter=e.detail.filter,this._currentPage=1};$E=function(e){if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.merchant.name.toLowerCase().includes(t)||e.transactionCount!=null&&String(e.transactionCount).includes(t)||e.totalSpend!=null&&e.totalSpend.toFixed(2).includes(t))};ed=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};nd=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};TE=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;return t==="name"?s=i.merchant.name.localeCompare(r.merchant.name):t==="count"?s=(i.transactionCount??0)-(r.transactionCount??0):t==="spend"&&(s=(i.totalSpend??0)-(r.totalSpend??0)),s*n})};OE=function(e){_c(`/merchants/${e}`)};Vr.styles=[Zr,pt`
      tbody tr {
        cursor: pointer;
      }
    `];ra([P()],Vr.prototype,"_rows",2);ra([P()],Vr.prototype,"_currentPage",2);ra([P()],Vr.prototype,"_pageSize",2);ra([P()],Vr.prototype,"_filter",2);ra([P()],Vr.prototype,"_sortCol",2);ra([P()],Vr.prototype,"_sortDir",2);Vr=ra([Et("merchant-list")],Vr);const _7=`<!-- @license lucide-static v0.564.0 - ISC -->
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
`;let Kc=null,Lw=!1;async function w7(){if(Kc)return Kc;const e=await Z();return Kc=(await e.merchantRules.all()).map(n=>new bn(n)),Lw||(Lw=!0,e.merchantRules.subscribe(()=>{Kc=null})),Kc}function hp(e,t={}){const n=e.accountId?t[e.accountId]:void 0;return{description:e.description.toLowerCase(),accountId:e.accountId,account:n?.name.toLowerCase()??e.accountId?.toLowerCase()}}function x7(e,t){if(e===void 0)return!1;switch(t.operator){case"contains":return e.includes(t.value);case"startsWith":return e.startsWith(t.value);case"equals":return e===t.value;case"regex":return t.regex.test(e)}}class bn{#t;constructor(t){Object.assign(this,t),this.#t=this.conditions.map(n=>({field:n.field,operator:n.operator,value:n.value.toLowerCase(),regex:n.operator==="regex"?new RegExp(n.value,"i"):void 0}))}matches(t){if(this.accountId&&this.accountId!==t.accountId)return!1;const n=i=>x7(t[i.field],i);return this.logic==="and"?this.#t.every(n):this.#t.some(n)}static async subscribe(t){return(await Z()).merchantRules.subscribe(t)}static async all(){return w7()}static async create(t){const n=await Z(),i={...t,id:ir()};return await n.merchantRules.put(i),new bn(i)}static async put(t){const n=await Z();t.id?await n.merchantRules.put(t):await n.merchantRules.put({...t,id:ir()})}static async update(t,n){const i=await Z(),r=await i.merchantRules.get(t);await i.merchantRules.put({...r,...n})}static async remove(t){await(await Z()).merchantRules.remove(t)}static async applyToTransactions(t){const n=await Z(),i=await n.transactions.all(),r=ke.toLookup(await n.accounts.all()),s=new bn(t),o=[];for(const a of i)s.matches(hp(a,r))&&o.push({...a,merchantId:t.merchantId??a.merchantId,tagIds:[...new Set([...a.tagIds,...t.tagIds])]});return o.length>0&&await n.transactions.bulkDocs(o),o.length}}function Ci(e){document.dispatchEvent(new CustomEvent("budgee-toast",{detail:e}))}const C7=Object.freeze(Object.defineProperty({__proto__:null,showToast:Ci},Symbol.toStringTag,{value:"Module"})),dp=pt`
  :host([busy]) {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
`;function fp(e){class t extends e{constructor(){super(...arguments),this._busy=!1}async withBusy(i){this._busy=!0,this.toggleAttribute("busy",!0),this.requestUpdate();try{return await i()}finally{this._busy=!1,this.toggleAttribute("busy",!1),this.requestUpdate()}}get busy(){return this._busy}}return t}const k7=/^(SQ \*|TST\* |SP \*?|PAYPAL \*)/i,S7=/((St.\s+)?[^\s]+)?\s*,\s*\w{2}$/,E7=e=>e.replace(k7,"").trim().replace(S7,"").trim().toLocaleLowerCase().split(" ").map(n=>n.charAt(0).toLocaleUpperCase()+n.slice(1)).join(" ");var M7=Object.defineProperty,D7=Object.getOwnPropertyDescriptor,IE=e=>{throw TypeError(e)},Tc=(e,t,n,i)=>{for(var r=i>1?void 0:i?D7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&M7(t,n,r),r},PE=(e,t,n)=>t.has(e)||IE("Cannot "+n),RE=(e,t,n)=>(PE(e,t,"read from private field"),n?n.call(e):t.get(e)),$7=(e,t,n)=>t.has(e)?IE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),xa=(e,t,n)=>(PE(e,t,"access private method"),n),Hi,I0,AE,LE,NE,FE,P0;let zs=class extends mt{constructor(){super(...arguments),$7(this,Hi),this.items=[],this.value="",this.placeholder="",this._highlightIndex=-1,this._open=!1}render(){const e=RE(this,Hi,I0),t=this.value.trim()&&e.some(i=>i.toLowerCase()===this.value.trim().toLowerCase()),n=this._open&&e.length>0&&!t;return E`
      <input
        type="text"
        .placeholder=${this.placeholder}
        .value=${this.value}
        @input=${xa(this,Hi,AE)}
        @keydown=${xa(this,Hi,LE)}
        @focus=${xa(this,Hi,NE)}
        @blur=${xa(this,Hi,FE)}
      />
      ${n?E`
          <div class="suggestions">
            ${e.map((i,r)=>E`
              <div
                class="suggestion ${r===this._highlightIndex?"highlighted":""}"
                @click=${()=>xa(this,Hi,P0).call(this,i)}
              >
                ${i}
              </div>
            `)}
          </div>
        `:nt}
    `}};Hi=new WeakSet;I0=function(){const e=this.value.toLowerCase().trim();return e?this.items.filter(t=>t.toLowerCase().includes(e)):[]};AE=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t}})),this._highlightIndex=-1,this._open=t.trim().length>0};LE=function(e){const t=RE(this,Hi,I0);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,t.length-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"&&this._highlightIndex>=0&&this._highlightIndex<t.length?(e.preventDefault(),xa(this,Hi,P0).call(this,t[this._highlightIndex])):e.key==="Escape"&&(this._open=!1)};NE=function(){this.value.trim().length>0&&(this._open=!0)};FE=function(){setTimeout(()=>{this._open=!1},150)};P0=function(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e}})),this._open=!1,this._highlightIndex=-1};zs.styles=pt`
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
  `;Tc([H({type:Array})],zs.prototype,"items",2);Tc([H({type:String})],zs.prototype,"value",2);Tc([H({type:String})],zs.prototype,"placeholder",2);Tc([P()],zs.prototype,"_highlightIndex",2);Tc([P()],zs.prototype,"_open",2);zs=Tc([Et("autocomplete-input")],zs);var T7=Object.defineProperty,O7=Object.getOwnPropertyDescriptor,zE=e=>{throw TypeError(e)},R0=(e,t,n,i)=>{for(var r=i>1?void 0:i?O7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&T7(t,n,r),r},jE=(e,t,n)=>t.has(e)||zE("Cannot "+n),Nw=(e,t,n)=>(jE(e,t,"read from private field"),n?n.call(e):t.get(e)),I7=(e,t,n)=>t.has(e)?zE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Fw=(e,t,n)=>(jE(e,t,"access private method"),n),Ca,BE,WE,HE,UE;let Mu=class extends mt{constructor(){super(...arguments),I7(this,Ca),this.merchants=[],this.value=""}render(){const e=Nw(this,Ca,WE),t=this.value.trim();return E`
      <div class="input-wrapper">
        <autocomplete-input
          .items=${Nw(this,Ca,BE)}
          .value=${this.value}
          placeholder="Merchant name (optional)"
          @value-changed=${Fw(this,Ca,HE)}
          @paste=${Fw(this,Ca,UE)}
        ></autocomplete-input>
        ${t?e?E`
                  <span class="status existing">existing</span>
                `:E`
                  <span class="status new">new</span>
                `:nt}
      </div>
    `}};Ca=new WeakSet;BE=function(){return this.merchants.map(e=>e.name)};WE=function(){const e=this.value.trim().toLowerCase();return e.length>0&&this.merchants.some(t=>t.name.toLowerCase()===e)};HE=function(e){this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:e.detail.value}}))};UE=function(e){e.preventDefault();const n=(e.clipboardData?.getData("text")??"").toLowerCase().replace(/(?:^|\s)\S/g,r=>r.toUpperCase()),i=e.composedPath().find(r=>r instanceof HTMLInputElement);i&&(i.value=n),this.dispatchEvent(new CustomEvent("merchant-changed",{detail:{name:n}}))};Mu.styles=pt`
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
  `;R0([H({type:Array})],Mu.prototype,"merchants",2);R0([H({type:String})],Mu.prototype,"value",2);Mu=R0([Et("merchant-autocomplete")],Mu);var P7=Object.defineProperty,R7=Object.getOwnPropertyDescriptor,YE=e=>{throw TypeError(e)},sa=(e,t,n,i)=>{for(var r=i>1?void 0:i?R7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&P7(t,n,r),r},qE=(e,t,n)=>t.has(e)||YE("Cannot "+n),ps=(e,t,n)=>(qE(e,t,"read from private field"),n?n.call(e):t.get(e)),A7=(e,t,n)=>t.has(e)?YE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Ne=(e,t,n)=>(qE(e,t,"access private method"),n),Ft,A0,yo,VE,L0,KE,GE,XE,QE,ZE,df,ff,pp;let Kr=class extends mt{constructor(){super(...arguments),A7(this,Ft),this.tags=[],this.selectedTagIds=[],this.excludeIds=[],this._query="",this._highlightIndex=-1,this._open=!1}updated(e){e.has("_open")&&this._open&&this.updateComplete.then(()=>Ne(this,Ft,KE).call(this))}render(){const e=ps(this,Ft,A0);return E`
      <div class="input-wrapper" @click=${()=>this.shadowRoot?.querySelector("input")?.focus()}>
        ${this.selectedTagIds.map(t=>{const n=this.tags.find(s=>s.id===t),i=n?.color??"var(--budgee-primary)",r=n?.color?zS(n.color):"white";return E`
          <span class="tag-pill" style="background:${i};color:${r}" @click=${s=>{s.stopPropagation(),Ne(this,Ft,L0).call(this,t)}}>
            ${Ne(this,Ft,VE).call(this,t)} &times;
          </span>
        `})}
        <input
          type="text"
          placeholder=${this.selectedTagIds.length>0?"":"Add tag..."}
          .value=${this._query}
          @input=${Ne(this,Ft,GE)}
          @keydown=${Ne(this,Ft,XE)}
          @focus=${Ne(this,Ft,QE)}
          @blur=${Ne(this,Ft,ZE)}
        />
      </div>
      ${this._open&&(e.length>0||ps(this,Ft,yo))?E`
            <div class="suggestions">
              ${e.map((t,n)=>E`
                <div
                  class="suggestion ${n===this._highlightIndex?"highlighted":""}"
                  @click=${()=>Ne(this,Ft,df).call(this,t)}
                >
                  ${t.name}
                </div>
              `)}
              ${ps(this,Ft,yo)?E`
                    <div
                      class="suggestion create ${e.length===this._highlightIndex?"highlighted":""}"
                      @click=${Ne(this,Ft,ff)}
                    >
                      Create "${this._query.trim()}"
                    </div>
                  `:nt}
            </div>
          `:nt}
    `}};Ft=new WeakSet;A0=function(){const e=this._query.toLowerCase();return this.tags.filter(t=>!this.selectedTagIds.includes(t.id)&&!this.excludeIds.includes(t.id)&&t.name.toLowerCase().includes(e)).sort((t,n)=>{const i=t.name.toLowerCase().startsWith(e)?0:1,r=n.name.toLowerCase().startsWith(e)?0:1;return i-r||t.name.localeCompare(n.name)})};yo=function(){const e=this._query.trim();return e?!this.tags.some(t=>t.name.toLowerCase()===e.toLowerCase()):!1};VE=function(e){const t=this.tags.find(i=>i.id===e);if(!t)return`#${e}`;const n=t.icon?ap[t.icon]:null;return n?E`<span class="pill-icon">${ye(n)}</span> ${t.name}`:t.name};L0=function(e){this.dispatchEvent(new CustomEvent("tag-removed",{detail:{tagId:e}}))};KE=function(){const e=this.shadowRoot?.querySelector("input"),t=this.shadowRoot?.querySelector(".suggestions");if(!e||!t)return;const n=e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.left}px`,t.style.width=`${n.width}px`};GE=function(e){this._query=e.target.value,this._highlightIndex=-1,this._open=this._query.length>0};XE=function(e){const t=ps(this,Ft,A0),n=t.length+(ps(this,Ft,yo)?1:0);e.key==="ArrowDown"?(e.preventDefault(),this._highlightIndex=Math.min(this._highlightIndex+1,n-1)):e.key==="ArrowUp"?(e.preventDefault(),this._highlightIndex=Math.max(this._highlightIndex-1,-1)):e.key==="Enter"?(e.preventDefault(),this._highlightIndex>=0&&this._highlightIndex<t.length?Ne(this,Ft,df).call(this,t[this._highlightIndex]):ps(this,Ft,yo)&&(this._highlightIndex===t.length||this._highlightIndex===-1)?Ne(this,Ft,ff).call(this):t.length===1&&!ps(this,Ft,yo)?Ne(this,Ft,df).call(this,t[0]):ps(this,Ft,yo)&&Ne(this,Ft,ff).call(this)):e.key==="Backspace"&&this._query===""&&this.selectedTagIds.length>0?(e.preventDefault(),Ne(this,Ft,L0).call(this,this.selectedTagIds[this.selectedTagIds.length-1])):e.key==="Escape"&&Ne(this,Ft,pp).call(this)};QE=function(){this._query.length>0&&(this._open=!0)};ZE=function(){setTimeout(()=>{this._open=!1},150)};df=function(e){this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:e}})),Ne(this,Ft,pp).call(this)};ff=function(){const e=this._query.trim();e&&(this.dispatchEvent(new CustomEvent("tag-created",{detail:{name:e}})),Ne(this,Ft,pp).call(this))};pp=function(){this._query="",this._highlightIndex=-1,this._open=!1,this.updateComplete.then(()=>{this.shadowRoot?.querySelector("input")?.focus()})};Kr.styles=pt`
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
  `;sa([H({type:Array})],Kr.prototype,"tags",2);sa([H({type:Array})],Kr.prototype,"selectedTagIds",2);sa([H({type:Array})],Kr.prototype,"excludeIds",2);sa([P()],Kr.prototype,"_query",2);sa([P()],Kr.prototype,"_highlightIndex",2);sa([P()],Kr.prototype,"_open",2);Kr=sa([Et("tag-autocomplete")],Kr);var L7=Object.defineProperty,N7=Object.getOwnPropertyDescriptor,JE=e=>{throw TypeError(e)},gp=(e,t,n,i)=>{for(var r=i>1?void 0:i?N7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&L7(t,n,r),r},tM=(e,t,n)=>t.has(e)||JE("Cannot "+n),zw=(e,t,n)=>(tM(e,t,"read from private field"),n?n.call(e):t.get(e)),F7=(e,t,n)=>t.has(e)?JE("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Gc=(e,t,n)=>(tM(e,t,"access private method"),n),wr,eM,nM,iM,rM,sM,oM,aM;const z7=[{value:"description",label:"description"},{value:"account",label:"account"}],j7=[{value:"contains",label:"contains"},{value:"startsWith",label:"starts with"},{value:"equals",label:"equals"},{value:"regex",label:"regex"}];let fc=class extends mt{constructor(){super(...arguments),F7(this,wr),this.condition={field:"description",operator:"equals",value:""},this.index=0,this.accounts=[]}render(){return E`
      <select @change=${Gc(this,wr,eM)}>
        ${z7.map(e=>E`
          <option value=${e.value} ?selected=${this.condition.field===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      <select @change=${Gc(this,wr,nM)}>
        ${j7.map(e=>E`
          <option value=${e.value} ?selected=${this.condition.operator===e.value}>
            ${e.label}
          </option>
        `)}
      </select>
      ${zw(this,wr,sM)?E`<autocomplete-input
            .items=${zw(this,wr,oM)}
            .value=${this.condition.value}
            placeholder="account name"
            @value-changed=${Gc(this,wr,rM)}
          ></autocomplete-input>`:E`<input
            type="text"
            placeholder="value"
            .value=${this.condition.value}
            @input=${Gc(this,wr,iM)}
          />`}
      <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" @click=${Gc(this,wr,aM)}>${ye(Mc)}</button>
    `}};wr=new WeakSet;eM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,field:t}}}))};nM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,operator:t}}}))};iM=function(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};rM=function(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("condition-changed",{detail:{index:this.index,condition:{...this.condition,value:t}}}))};sM=function(){return this.condition.field==="account"&&this.condition.operator==="equals"};oM=function(){return this.accounts.map(e=>e.name)};aM=function(){this.dispatchEvent(new CustomEvent("condition-removed",{detail:{index:this.index}}))};fc.styles=[Dc,pt`
      :host {
        display: contents;
      }
      select,
      input {
        padding: 4px 8px;
      }
    `];gp([H({type:Object})],fc.prototype,"condition",2);gp([H({type:Number})],fc.prototype,"index",2);gp([H({type:Array})],fc.prototype,"accounts",2);fc=gp([Et("condition-row")],fc);var B7=Object.defineProperty,W7=Object.getOwnPropertyDescriptor,cM=e=>{throw TypeError(e)},kn=(e,t,n,i)=>{for(var r=i>1?void 0:i?W7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&B7(t,n,r),r},lM=(e,t,n)=>t.has(e)||cM("Cannot "+n),uM=(e,t,n)=>(lM(e,t,"read from private field"),n?n.call(e):t.get(e)),jw=(e,t,n)=>t.has(e)?cM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Gt=(e,t,n)=>(lM(e,t,"access private method"),n),mp,Bt,hM,dM,fM,pM,gM,mM,vM,yM,Wm,vp,N0,Hm,Um,F0,bM,_M,wM;let Be=class extends mt{constructor(){super(...arguments),jw(this,Bt),this.tags=[],this.merchants=[],this.rules=[],this.accounts=[],this.prefillDescription="",this.editingRule=null,this.editingMerchantName="",this._prefillPristine=!1,this._logic="or",this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._previewCount=null,jw(this,mp,Qo(()=>Gt(this,Bt,hM).call(this),300))}updated(e){e.has("editingRule")&&this.editingRule?(this._conditions=[...this.editingRule.conditions],this._logic=this.editingRule.logic,this._selectedTagIds=[...this.editingRule.tagIds],this._merchantName=this.editingMerchantName,this._pendingTagNames=[]):e.has("prefillDescription")&&this.prefillDescription&&(this._conditions=[{field:"description",operator:"equals",value:this.prefillDescription}],this._logic="or",this._merchantName=E7(this.prefillDescription),this._prefillPristine=!0,this._pendingTagNames=[])}render(){const e=Gt(this,Bt,F0).call(this).length>0;return E`
      <div class="section-header">Conditions</div>
      <div class="form-grid">
        ${this._conditions.map((t,n)=>E`
          <condition-row
            .condition=${t}
            .index=${n}
            .accounts=${this.accounts}
            @condition-changed=${Gt(this,Bt,dM)}
            @condition-removed=${Gt(this,Bt,fM)}
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
      <button class="add-condition secondary" @click=${Gt(this,Bt,pM)}>+ Add Condition</button>
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
            <span class="tag-badge" @click=${()=>Gt(this,Bt,vM).call(this,t)}>
              ${t} &times;
            </span>
          `)}
          <tag-autocomplete
            .tags=${this.tags}
            .selectedTagIds=${this._selectedTagIds}
            @tag-selected=${Gt(this,Bt,gM)}
            @tag-created=${Gt(this,Bt,mM)}
            @tag-removed=${t=>Gt(this,Bt,yM).call(this,t.detail.tagId)}
          ></tag-autocomplete>
        </div>
      </div>
      ${e?Gt(this,Bt,wM).call(this):Gt(this,Bt,_M).call(this)}
      ${this._previewCount!==null?E`<p class="preview">${this._previewCount} transaction${this._previewCount===1?"":"s"} would match</p>`:""}
      <div class="save-row">
        <button class="secondary" ?disabled=${!Gt(this,Bt,Wm).call(this)} @click=${()=>Gt(this,Bt,Hm).call(this,!1)}>${this.editingRule?"Save":"Create"}</button>
        <button ?disabled=${!Gt(this,Bt,Wm).call(this)} @click=${()=>Gt(this,Bt,Hm).call(this,!0)}>${this.editingRule?"Save":"Create"} and apply</button>
      </div>
    `}};mp=new WeakMap;Bt=new WeakSet;hM=async function(){const e=Gt(this,Bt,vp).call(this);if(e.length===0){this._previewCount=null;return}const t=new bn({id:"",logic:this._logic,conditions:e,tagIds:[]}),n=await _e.all(),i=ke.toLookup(this.accounts);let r=0;for(const s of n)t.matches(hp(s,i))&&r++;this._previewCount=r};dM=function(e){const{index:t,condition:n}=e.detail;let i=n;this._prefillPristine&&t===0&&n.operator==="equals"&&n.value!==this._conditions[0]?.value&&(i={...n,operator:"contains"},this._prefillPristine=!1),this._conditions=this._conditions.map((r,s)=>s===t?i:r),uM(this,mp).call(this)};fM=function(e){const{index:t}=e.detail;this._conditions=this._conditions.filter((n,i)=>i!==t),uM(this,mp).call(this)};pM=function(){this._conditions=[...this._conditions,{field:"description",operator:"equals",value:""}]};gM=function(e){const t=e.detail.tag;this._selectedTagIds.includes(t.id)||(this._selectedTagIds=[...this._selectedTagIds,t.id])};mM=function(e){const t=e.detail.name;this._pendingTagNames.includes(t)||(this._pendingTagNames=[...this._pendingTagNames,t])};vM=function(e){this._pendingTagNames=this._pendingTagNames.filter(t=>t!==e)};yM=function(e){this._selectedTagIds=this._selectedTagIds.filter(t=>t!==e)};Wm=function(){return this._merchantName.trim()!==""||this._selectedTagIds.length>0||this._pendingTagNames.length>0};vp=function(){return this._conditions.filter(e=>e.value.trim())};N0=function(){this._conditions=[{field:"description",operator:"equals",value:""}],this._selectedTagIds=[],this._merchantName="",this._pendingTagNames=[],this._logic="or"};Hm=function(e){const t=Gt(this,Bt,vp).call(this);t.length!==0&&(this.dispatchEvent(new CustomEvent("rule-saved",{detail:{id:this.editingRule?.id,logic:this._logic,conditions:t,tagIds:this._selectedTagIds,newTagNames:this._pendingTagNames,merchantName:this._merchantName.trim()||void 0,apply:e}})),Gt(this,Bt,N0).call(this))};Um=function(e,t){const n=Gt(this,Bt,vp).call(this);n.length!==0&&(this.dispatchEvent(new CustomEvent("rule-merge",{detail:{existingRuleId:e.id,conditions:n,apply:t}})),Gt(this,Bt,N0).call(this))};F0=function(){if(!this._merchantName.trim())return[];const e=this.merchants.find(t=>t.name.toLowerCase()===this._merchantName.trim().toLowerCase());return e?this.rules.filter(t=>t.merchantId===e.id&&t.id!==this.editingRule?.id):[]};bM=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};_M=function(){return E`
      <div class="existing-rules spacer">
        <h5>Existing rules for this merchant</h5>
        <div class="existing-rule-item">
          <span class="existing-rule-conditions">placeholder</span>
          <button class="merge-btn">Merge</button>
        </div>
      </div>
    `};wM=function(){const e=Gt(this,Bt,F0).call(this);return e.length===0?nt:E`
      <div class="existing-rules">
        <h5>Existing rules for this merchant</h5>
        ${e.map(t=>E`
            <div class="existing-rule-item">
              <span class="existing-rule-conditions">${Gt(this,Bt,bM).call(this,t)}</span>
              ${t.tagIds.length>0?E`<tag-pills .tags=${this.tags} .tagIds=${t.tagIds}></tag-pills>`:nt}
              <button class="merge-btn secondary" @click=${()=>Gt(this,Bt,Um).call(this,t,!1)}>Merge</button>
              <button class="merge-btn secondary" @click=${()=>Gt(this,Bt,Um).call(this,t,!0)}>Merge and apply</button>
            </div>
          `)}
      </div>
    `};Be.styles=[Li,pt`
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
    `];kn([H({type:Array})],Be.prototype,"tags",2);kn([H({type:Array})],Be.prototype,"merchants",2);kn([H({type:Array})],Be.prototype,"rules",2);kn([H({type:Array})],Be.prototype,"accounts",2);kn([H({type:String})],Be.prototype,"prefillDescription",2);kn([H({attribute:!1})],Be.prototype,"editingRule",2);kn([H({type:String})],Be.prototype,"editingMerchantName",2);kn([P()],Be.prototype,"_prefillPristine",2);kn([P()],Be.prototype,"_logic",2);kn([P()],Be.prototype,"_conditions",2);kn([P()],Be.prototype,"_selectedTagIds",2);kn([P()],Be.prototype,"_merchantName",2);kn([P()],Be.prototype,"_pendingTagNames",2);kn([P()],Be.prototype,"_previewCount",2);Be=kn([Et("rule-editor")],Be);var H7=Object.defineProperty,U7=Object.getOwnPropertyDescriptor,xM=e=>{throw TypeError(e)},z0=(e,t,n,i)=>{for(var r=i>1?void 0:i?U7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&H7(t,n,r),r},Y7=(e,t,n)=>t.has(e)||xM("Cannot "+n),q7=(e,t,n)=>t.has(e)?xM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Bw=(e,t,n)=>(Y7(e,t,"access private method"),n),id,Ym;let Du=class extends mt{constructor(){super(...arguments),q7(this,id),this.overlaps=[],this.merchants=new Map}render(){return this.overlaps.length===0?E`
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
              <td class="condition-summary">${Bw(this,id,Ym).call(this,e.ruleA)}</td>
              <td class="condition-summary">${Bw(this,id,Ym).call(this,e.ruleB)}</td>
              <td>${e.count}</td>
              <td class="samples">${e.samples.values().take(3).toArray().join(`

`)}</td>
            </tr>
          `)}
        </tbody>
      </table>
      </div>
    `}};id=new WeakSet;Ym=function(e){const t=e.merchantId?this.merchants.get(e.merchantId)??"":"",n=e.conditions.map(i=>`${i.operator} "${i.value}"`).join(e.logic==="and"?" AND ":" OR ");return t?`${t}: ${n}`:n};Du.styles=[Zr,pt`
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
    `];z0([H({attribute:!1})],Du.prototype,"overlaps",2);z0([H({attribute:!1})],Du.prototype,"merchants",2);Du=z0([Et("rule-overlap")],Du);var V7=Object.defineProperty,K7=Object.getOwnPropertyDescriptor,CM=e=>{throw TypeError(e)},we=(e,t,n,i)=>{for(var r=i>1?void 0:i?K7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&V7(t,n,r),r},j0=(e,t,n)=>t.has(e)||CM("Cannot "+n),G7=(e,t,n)=>(j0(e,t,"read from private field"),n?n.call(e):t.get(e)),Ww=(e,t,n)=>t.has(e)?CM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Hw=(e,t,n,i)=>(j0(e,t,"write to private field"),t.set(e,n),n),bt=(e,t,n)=>(j0(e,t,"access private method"),n),xl,gt,pc,kM,SM,EM,MM,pf,gf,DM,$M,TM,OM,rd,sd,IM,PM,RM,AM,B0,LM,NM,FM,zM,jM;let he=class extends fp(mt){constructor(){super(...arguments),Ww(this,gt),this._rules=[],this._tags=[],this._merchants=[],this._unmerchanted=[],this._accounts=[],this._prefillDescription="",this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._rulesPage=1,this._rulesPageSize=10,this._rulesFilter="",this._rulesSortCol="conditions",this._rulesSortDir="asc",this._unmerchantedPage=1,this._unmerchantedPageSize=20,this._unmerchantedFilter="",this._unmatchedRuleIds=new Set,this._overlapData=[],Ww(this,xl,[])}connectedCallback(){super.connectedCallback(),bt(this,gt,pc).call(this);const e=Qo(()=>bt(this,gt,pc).call(this),300);Promise.all([bn.subscribe(e),pe.subscribe(e),Ie.subscribe(e),_e.subscribe(e)]).then(t=>{Hw(this,xl,t)})}disconnectedCallback(){super.disconnectedCallback();for(const e of G7(this,xl))e.unsubscribe();Hw(this,xl,[])}render(){const e=new Map(this._merchants.map(t=>[t.id,t.name]));return E`
      <h2>Merchant Rules</h2>

      <div class="sections-grid">
        ${bt(this,gt,zM).call(this)}
        ${bt(this,gt,FM).call(this)}
        <rule-overlap .overlaps=${this._overlapData} .merchants=${e}></rule-overlap>
        ${bt(this,gt,NM).call(this)}
      </div>

      ${bt(this,gt,jM).call(this)}
    `}};xl=new WeakMap;gt=new WeakSet;pc=async function(){this._rules=await bn.all(),this._tags=await pe.all(),this._merchants=await Ie.all(),this._accounts=await ke.all();const e=ke.toLookup(this._accounts),t=await _e.all();this._unmerchanted=t.filter(o=>o.merchantId===void 0);const n=this._rules,i=new Set,r=new Map,s=t.map(o=>hp(o,e));for(let o=0;o<t.length;o++){const a=t[o],c=s[o],l=[];for(const u of n)u.matches(c)&&(i.add(u.id),l.push(u));if(l.length>=2)for(let u=0;u<l.length;u++)for(let h=u+1;h<l.length;h++){const d=[l[u].id,l[h].id].sort().join("-"),f=r.get(d);f?(f.count++,f.samples.add(a.description)):r.set(d,{ruleA:l[u],ruleB:l[h],count:1,samples:new Set([a.description])})}}this._unmatchedRuleIds=new Set(n.filter(o=>!i.has(o.id)).map(o=>o.id)),this._overlapData=[...r.values()].sort((o,a)=>a.count-o.count)};kM=async function(e){await this.withBusy(async()=>{const{id:t,logic:n,conditions:i,tagIds:r,newTagNames:s,merchantName:o,apply:a}=e.detail,c=[...r];if(s?.length)for(const d of s){const p=(await pe.byName(d))?.id??(await pe.create(d)).id;c.push(p)}let l;o&&(l=(await Ie.byName(o))?.id??(await Ie.create(o)).id);const u={logic:n,conditions:i,merchantId:l,tagIds:c};let h;t?(await bn.put({...u,id:t}),h=new bn({...u,id:t})):h=await bn.create(u),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",a&&await bn.applyToTransactions(h),Ci({message:t?"Rule updated":"Rule created",type:"success"}),await bt(this,gt,pc).call(this)})};SM=async function(e){await this.withBusy(async()=>{const{existingRuleId:t,conditions:n,apply:i}=e.detail,r=this._rules.find(o=>o.id===t);if(!r)return;const s={id:r.id,logic:"or",conditions:[...r.conditions,...n],merchantId:r.merchantId,accountId:r.accountId,tagIds:r.tagIds};await bn.put(s),this._showEditor=!1,this._editingRule=null,this._editingMerchantName="",this._prefillDescription="",i&&await bn.applyToTransactions(s),Ci({message:"Rules merged",type:"success"}),await bt(this,gt,pc).call(this)})};EM=async function(e){await this.withBusy(async()=>{await bn.remove(e),Ci({message:"Rule deleted",type:"success"}),await bt(this,gt,pc).call(this)})};MM=async function(e){let t="";e.merchantId&&(t=(await Ie.get(e.merchantId))?.name??""),this._editingRule=e,this._editingMerchantName=t,this._showEditor=!0};pf=function(e){return this._tags.find(t=>t.id===e)?.name??`#${e}`};gf=function(e){return e?this._merchants.find(t=>t.id===e)?.name??"":""};DM=function(e){return e.conditions.map(t=>`${t.operator} "${t.value}"`).join(e.logic==="and"?" AND ":" OR ")};$M=function(e){this._rulesPage=e.detail.page,this._rulesPageSize=e.detail.pageSize};TM=function(e){this._rulesFilter=e.detail.filter,this._rulesPage=1};OM=function(e){if(!this._rulesFilter)return!0;const t=this._rulesFilter.toLowerCase();return!!(e.conditions.some(n=>n.value.toLowerCase().includes(t))||e.merchantId&&this._merchants.find(i=>i.id===e.merchantId)?.name.toLowerCase().includes(t)||e.tagIds.some(n=>bt(this,gt,pf).call(this,n).toLowerCase().includes(t)))};rd=function(e){this._rulesSortCol===e?this._rulesSortDir=this._rulesSortDir==="asc"?"desc":"asc":(this._rulesSortCol=e,this._rulesSortDir="asc"),this._rulesPage=1};sd=function(e){return this._rulesSortCol!==e?"":this._rulesSortDir==="asc"?" ▲":" ▼"};IM=function(e){const t=this._rulesSortCol,n=this._rulesSortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="conditions"){const o=i.conditions[0]?.value??"",a=r.conditions[0]?.value??"";s=o.localeCompare(a)}else if(t==="merchant")s=bt(this,gt,gf).call(this,i.merchantId).localeCompare(bt(this,gt,gf).call(this,r.merchantId));else if(t==="tags"){const o=i.tagIds.map(c=>bt(this,gt,pf).call(this,c)).join(","),a=r.tagIds.map(c=>bt(this,gt,pf).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};PM=function(e){this._unmerchantedPage=e.detail.page,this._unmerchantedPageSize=e.detail.pageSize};RM=function(e){this._unmerchantedFilter=e.detail.filter,this._unmerchantedPage=1};AM=function(e){this._prefillDescription=e.description,this._showEditor=!0};B0=function(e){return E`
      <tr>
        <td class="condition-summary">
          ${bt(this,gt,DM).call(this,e)}
          ${this._unmatchedRuleIds.has(e.id)?E`<span class="unmatched-warning" title="This rule matches no transactions">${ye(_7)} No matches</span>`:nt}
        </td>
        <td>${bt(this,gt,gf).call(this,e.merchantId)}</td>
        <td>
          ${e.tagIds.length>0?E`<tag-pills .tags=${this._tags} .tagIds=${e.tagIds}></tag-pills>`:"None"}
        </td>
        <td class="actions">
          <button class="icon-btn" title="Edit rule" aria-label="Edit rule" @click=${()=>bt(this,gt,MM).call(this,e)}>${ye(sp)}</button>
          <button class="icon-btn icon-btn--danger" title="Delete rule" aria-label="Delete rule" @click=${()=>bt(this,gt,EM).call(this,e.id)}>${ye(Mc)}</button>
        </td>
      </tr>
    `};LM=function(e){return E`
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
          ${e.map(t=>bt(this,gt,B0).call(this,t))}
        </tbody>
      </table>
    `};NM=function(){if(this._rules.length===0)return E`
        <budgee-empty-state
          heading="No rules yet"
          description="Create a rule to automatically assign merchants and tags to transactions."
        >
          <button @click=${()=>{this._showEditor=!0}}>Create Rule</button>
        </budgee-empty-state>
      `;const e=this._rules.filter(r=>bt(this,gt,OM).call(this,r)),t=bt(this,gt,IM).call(this,e),n=(this._rulesPage-1)*this._rulesPageSize,i=t.slice(n,n+this._rulesPageSize);return E`
      <div class="section">
        <h3>Existing Rules</h3>
        <paginated-table
          .totalItems=${e.length}
          .defaultPageSize=${10}
          storageKey="rules"
          ?filterable=${!0}
          @page-change=${bt(this,gt,$M)}
          @filter-change=${bt(this,gt,TM)}
        >
          <table>
            <thead>
              <tr>
                <th class="sortable" @click=${()=>bt(this,gt,rd).call(this,"conditions")}>
                  Conditions${bt(this,gt,sd).call(this,"conditions")}
                </th>
                <th class="sortable" @click=${()=>bt(this,gt,rd).call(this,"merchant")}>
                  Merchant${bt(this,gt,sd).call(this,"merchant")}
                </th>
                <th class="sortable" @click=${()=>bt(this,gt,rd).call(this,"tags")}>
                  Tags${bt(this,gt,sd).call(this,"tags")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${i.map(r=>bt(this,gt,B0).call(this,r))}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};FM=function(){const e=this._rules.filter(n=>this._unmatchedRuleIds.has(n.id));if(e.length===0)return nt;const t=e.length;return E`
      <div class="section">
        <h3>Unmatched Rules</h3>
        <p>${t} rule${t===1?"":"s"} matching no transactions.</p>
        ${bt(this,gt,LM).call(this,e)}
      </div>
    `};zM=function(){if(this._unmerchanted.length===0)return nt;const e=this._unmerchantedFilter.toLowerCase(),t=e?this._unmerchanted.filter(r=>r.description.toLowerCase().includes(e)):this._unmerchanted,n=(this._unmerchantedPage-1)*this._unmerchantedPageSize,i=t.slice(n,n+this._unmerchantedPageSize);return E`
      <div class="section">
        <h3>Unmerchanted Transactions</h3>
        <paginated-table
          .totalItems=${t.length}
          .defaultPageSize=${20}
          storageKey="unmerchanted"
          ?filterable=${!0}
          @page-change=${bt(this,gt,PM)}
          @filter-change=${bt(this,gt,RM)}
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
                  <tr class="clickable-row" @click=${()=>bt(this,gt,AM).call(this,r)}>
                    <td>${r.date}</td>
                    <td>${r.description}</td>
                    <td class=${r.amount<0?"amount-negative":"amount-positive"}>${r.amount.toFixed(2)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};jM=function(){if(!this._showEditor)return nt;const e=this._editingRule?"Edit Rule":"Create Rule";return E`
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
          @rule-saved=${bt(this,gt,kM)}
          @rule-merge=${bt(this,gt,SM)}
        ></rule-editor>
      </budgee-modal>
    `};he.styles=[Li,dp,Zr,Dc,pt`
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
    `];we([P()],he.prototype,"_rules",2);we([P()],he.prototype,"_tags",2);we([P()],he.prototype,"_merchants",2);we([P()],he.prototype,"_unmerchanted",2);we([P()],he.prototype,"_accounts",2);we([P()],he.prototype,"_prefillDescription",2);we([P()],he.prototype,"_showEditor",2);we([P()],he.prototype,"_editingRule",2);we([P()],he.prototype,"_editingMerchantName",2);we([P()],he.prototype,"_rulesPage",2);we([P()],he.prototype,"_rulesPageSize",2);we([P()],he.prototype,"_rulesFilter",2);we([P()],he.prototype,"_rulesSortCol",2);we([P()],he.prototype,"_rulesSortDir",2);we([P()],he.prototype,"_unmerchantedPage",2);we([P()],he.prototype,"_unmerchantedPageSize",2);we([P()],he.prototype,"_unmerchantedFilter",2);we([P()],he.prototype,"_unmatchedRuleIds",2);we([P()],he.prototype,"_overlapData",2);he=we([Et("rule-manager")],he);async function X7(){const e=await Z(),t={version:Yi,transactions:await e.transactions.all(),tags:await e.tags.all(),merchants:await e.merchants.all(),accounts:await e.accounts.all(),merchantRules:await e.merchantRules.all(),dashboardCharts:await e.dashboardCharts.all(),dashboardTables:await e.dashboardTables.all()},n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=`budgee-export-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(i);const{showToast:s}=await Oa(async()=>{const{showToast:o}=await Promise.resolve().then(()=>C7);return{showToast:o}},void 0);s({message:"Database exported",type:"success"})}var Q7=Object.defineProperty,Z7=Object.getOwnPropertyDescriptor,BM=e=>{throw TypeError(e)},Oc=(e,t,n,i)=>{for(var r=i>1?void 0:i?Z7(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&Q7(t,n,r),r},WM=(e,t,n)=>t.has(e)||BM("Cannot "+n),J7=(e,t,n)=>(WM(e,t,"read from private field"),n?n.call(e):t.get(e)),tB=(e,t,n)=>t.has(e)?BM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Xc=(e,t,n)=>(WM(e,t,"access private method"),n),ss,HM,UM,YM,qM,VM,KM;let js=class extends mt{constructor(){super(...arguments),tB(this,ss),this._url="",this._testResult=null,this._testError="",this._testedUrl="",this._theme="system"}connectedCallback(){super.connectedCallback(),this._url=localStorage.getItem("budgee-sync-url")??"";const e=localStorage.getItem("budgee-theme");this._theme=e==="light"||e==="dark"?e:"system"}render(){return E`
      <section>
        <h2>Appearance</h2>
        <div class="field">
          <label for="theme-select">Theme</label>
          <select id="theme-select" @change=${Xc(this,ss,HM)}>
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
        <input type="file" accept=".json" @change=${Xc(this,ss,KM)} />

        <h3>Export Database</h3>
        <p>Download a full backup of your data as JSON.</p>
        <button @click=${X7}>Export</button>
      </section>

      <section>
        <h2>Sync</h2>
        <p class="hint">Sync your data across devices using a sync server. Save a valid URL to enable sync; clear it to disable.</p>
        <div class="field">
          <label for="sync-url">Server URL</label>
          <input type="url" id="sync-url" .value=${this._url} @change=${Xc(this,ss,UM)}
            placeholder="http://your-server:3001" />
          <p class="hint">The URL of your sync server.</p>
        </div>
        ${this._url?E`
              <div class="field">
                <button ?disabled=${this._testResult==="testing"} @click=${Xc(this,ss,YM)}>
                  ${this._testResult==="testing"?"Testing...":"Test Connection"}
                </button>
                ${this._testResult==="success"?E`
                        <p class="test-result success">Connection successful.</p>
                      `:this._testResult==="error"?E`<p class="test-result error">Connection failed: ${this._testError}</p>`:nt}
              </div>
            `:nt}
        <div class="field">
          <button ?disabled=${!J7(this,ss,qM)} @click=${Xc(this,ss,VM)}>Save</button>
        </div>
      </section>
    `}};ss=new WeakSet;HM=function(e){const t=e.target.value;this._theme=t,t==="system"?(localStorage.removeItem("budgee-theme"),delete document.documentElement.dataset.theme):(localStorage.setItem("budgee-theme",t),document.documentElement.dataset.theme=t)};UM=function(e){this._url=e.target.value,this._testResult=null,this._testError="",this._testedUrl=""};YM=async function(){this._testResult="testing",this._testError="";try{await m4(this._url),this._testResult="success",this._testedUrl=this._url,Ci({message:"Connection successful",type:"success"})}catch(e){this._testResult="error",this._testError=e instanceof Error?e.message:String(e),Ci({message:"Connection failed",type:"error"}),this._testedUrl=""}};qM=function(){const e=localStorage.getItem("budgee-sync-url")??"";return this._url===e?!1:this._url?this._testResult==="success"&&this._testedUrl===this._url:!0};VM=function(){localStorage.setItem("budgee-sync-url",this._url),localStorage.removeItem("budgee-ice-server"),localStorage.removeItem("budgee-turn-server"),this.dispatchEvent(new CustomEvent("budgee-sync-settings-changed",{bubbles:!0,composed:!0})),Ci({message:"Sync settings saved",type:"success"}),this.requestUpdate()};KM=async function(e){const t=e.target;if(!t.files?.length)return;if(!await _i.show({heading:"Import Database",message:"This will replace all existing data. Are you sure?",confirmLabel:"Import",danger:!0})){t.value="";return}Rv("Importing database...");try{await Qx(t.files[0]),t.value="",window.location.reload()}finally{Av()}};js.styles=[Li,pt`
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
    `];Oc([P()],js.prototype,"_url",2);Oc([P()],js.prototype,"_testResult",2);Oc([P()],js.prototype,"_testError",2);Oc([P()],js.prototype,"_testedUrl",2);Oc([P()],js.prototype,"_theme",2);js=Oc([Et("budgee-settings")],js);var eB=Object.defineProperty,nB=Object.getOwnPropertyDescriptor,GM=e=>{throw TypeError(e)},XM=(e,t,n,i)=>{for(var r=i>1?void 0:i?nB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&eB(t,n,r),r},QM=(e,t,n)=>t.has(e)||GM("Cannot "+n),iB=(e,t,n)=>(QM(e,t,"read from private field"),t.get(e)),rB=(e,t,n)=>t.has(e)?GM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),sB=(e,t,n,i)=>(QM(e,t,"write to private field"),t.set(e,n),n),od;const oB={"not-configured":"Not configured",connecting:"Connecting",syncing:"Syncing",synced:"Synced",error:"Error"};let mf=class extends mt{constructor(){super(...arguments),this._status="not-configured",rB(this,od)}connectedCallback(){super.connectedCallback(),sB(this,od,y4.subscribe(e=>{this._status=e}))}disconnectedCallback(){super.disconnectedCallback(),iB(this,od)?.unsubscribe()}render(){return E`<span class="dot ${this._status}"></span>${oB[this._status]}`}};od=new WeakMap;mf.styles=pt`
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
  `;XM([P()],mf.prototype,"_status",2);mf=XM([Et("sync-status-indicator")],mf);function aB(e){if(e.startsWith("#"))return e;const{r:t,g:n,b:i}=FS(e),r=s=>s.toString(16).padStart(2,"0");return`#${r(t)}${r(n)}${r(i)}`}var cB=Object.defineProperty,lB=Object.getOwnPropertyDescriptor,ZM=e=>{throw TypeError(e)},Gs=(e,t,n,i)=>{for(var r=i>1?void 0:i?lB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&cB(t,n,r),r},W0=(e,t,n)=>t.has(e)||ZM("Cannot "+n),uB=(e,t,n)=>(W0(e,t,"read from private field"),n?n.call(e):t.get(e)),Uw=(e,t,n)=>t.has(e)?ZM("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Yw=(e,t,n,i)=>(W0(e,t,"write to private field"),t.set(e,n),n),De=(e,t,n)=>(W0(e,t,"access private method"),n),Cl,me,qo,H0,JM,tD,eD,nD,iD,rD,sD,oD,aD,cD;let dr=class extends fp(mt){constructor(){super(...arguments),Uw(this,me),this._tags=[],this._newTagName="",this._error="",this._filter="",this._currentPage=1,this._pageSize=25,this._sortDir="asc",Uw(this,Cl,[])}connectedCallback(){super.connectedCallback(),De(this,me,qo).call(this);const e=Qo(()=>De(this,me,qo).call(this),300);pe.subscribe(e).then(t=>{Yw(this,Cl,[t])})}disconnectedCallback(){super.disconnectedCallback();for(const e of uB(this,Cl))e.unsubscribe();Yw(this,Cl,[])}render(){return E`
      <h3>Tags</h3>
      <div class="tag-form">
        <input
          type="text"
          placeholder="New tag name"
          .value=${this._newTagName}
          @input=${De(this,me,iD)}
          @keydown=${De(this,me,rD)}
        />
        <button @click=${De(this,me,H0)}>Add</button>
      </div>
      ${this._error?E`<p class="error">${this._error}</p>`:""}
      ${this._tags.length===0?E`
              <budgee-empty-state
                heading="No tags yet"
                description="Create a tag above to get started."
              ></budgee-empty-state>
            `:""}
      ${(()=>{if(this._tags.length===0)return"";const e=this._filter.toLowerCase(),t=e?this._tags.filter(o=>o.name.toLowerCase().includes(e)):this._tags,n=De(this,me,cD).call(this,t),i=(this._currentPage-1)*this._pageSize,r=n.slice(i,i+this._pageSize),s=this._sortDir==="asc"?" ▲":" ▼";return E`
          <paginated-table
            .totalItems=${t.length}
            .defaultPageSize=${25}
            storageKey="tags"
            ?filterable=${!0}
            @page-change=${De(this,me,sD)}
            @filter-change=${De(this,me,oD)}
          >
            <table>
              <thead>
                <tr>
                  <th class="col-icon">Icon</th>
                  <th class="col-color">Color</th>
                  <th class="sortable" @click=${De(this,me,aD)}>Name${s}</th>
                  <th class="col-remove"></th>
                </tr>
              </thead>
              <tbody>
                ${r.map(o=>E`
                  <tr>
                    <td class="col-icon">
                      <icon-picker
                        .value=${o.icon??""}
                        @icon-selected=${a=>De(this,me,tD).call(this,o,a.detail.icon)}
                      ></icon-picker>
                    </td>
                    <td class="col-color">
                      <input
                        type="color"
                        class="color-swatch"
                        .value=${De(this,me,eD).call(this,o.color)}
                        @change=${a=>De(this,me,nD).call(this,o,a.target.value)}
                      />
                    </td>
                    <td>
                      ${o.name}
                    </td>
                    <td class="col-remove">
                      <button class="icon-btn icon-btn--danger" title="Remove tag" aria-label="Remove tag" @click=${()=>De(this,me,JM).call(this,o.id)}>
                        ${ye(Mc)}
                      </button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </paginated-table>
        `})()}
    `}};Cl=new WeakMap;me=new WeakSet;qo=async function(){this._tags=await pe.all()};H0=async function(){const e=this._newTagName.trim();if(!e)return;if(this._error="",await pe.byName(e)){this._error=`Tag "${e}" already exists.`;return}await this.withBusy(async()=>{await pe.create(e),this._newTagName="",Ci({message:"Tag created",type:"success"}),await De(this,me,qo).call(this)})};JM=async function(e){await this.withBusy(async()=>{await pe.remove(e),Ci({message:"Tag deleted",type:"success"}),await De(this,me,qo).call(this)})};tD=async function(e,t){await this.withBusy(async()=>{await pe.update(e.id,{icon:t||void 0}),await De(this,me,qo).call(this)})};eD=function(e){return e?aB(e):"#7eb8da"};nD=async function(e,t){await this.withBusy(async()=>{await pe.update(e.id,{color:t}),await De(this,me,qo).call(this)})};iD=function(e){this._newTagName=e.target.value};rD=function(e){e.key==="Enter"&&De(this,me,H0).call(this)};sD=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};oD=function(e){this._filter=e.detail.filter,this._currentPage=1};aD=function(){this._sortDir=this._sortDir==="asc"?"desc":"asc",this._currentPage=1};cD=function(e){const t=this._sortDir==="asc"?1:-1;return[...e].sort((n,i)=>n.name.localeCompare(i.name)*t)};dr.styles=[Li,dp,Zr,Dc,pt`
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
    `];Gs([P()],dr.prototype,"_tags",2);Gs([P()],dr.prototype,"_newTagName",2);Gs([P()],dr.prototype,"_error",2);Gs([P()],dr.prototype,"_filter",2);Gs([P()],dr.prototype,"_currentPage",2);Gs([P()],dr.prototype,"_pageSize",2);Gs([P()],dr.prototype,"_sortDir",2);dr=Gs([Et("tag-manager")],dr);function hB(e,t){if(!t)return e;const n=e.toLowerCase(),i=t.toLowerCase(),r=n.indexOf(i);if(r===-1)return e;const s=e.slice(0,r),o=e.slice(r,r+t.length),a=e.slice(r+t.length);return E`${s}<mark>${o}</mark>${a}`}function dB(e,t,n={}){const i=hp(e,n);for(const r of t){if(!r.matches(i))continue;const s=[...new Set([...e.tagIds,...r.tagIds])],o=r.merchantId??e.merchantId;return{...e,tagIds:s,merchantId:o}}return e}async function fB(e,t,n){const i=await bn.all(),r=ke.toLookup(await ke.all()),s=t.account?await pB(e,t.account):void 0,o=e.map(a=>gB(a,t,s?.get(a[t.account])??n.accountId)).filter(a=>a!==void 0).map(a=>dB(a,i,r));return n.importMode==="replace"&&await _e.deleteAll(),await _e.bulkAdd(o),o.length}async function pB(e,t){const n=[...new Set(e.map(o=>o[t]).filter(Boolean))],i=await ke.all(),r=new Map;for(const o of i)r.set(o.name.toLowerCase(),o.id);const s=new Map;for(const o of n){const a=r.get(o.toLowerCase());if(a)s.set(o,a);else{const c=await ke.create({name:o});s.set(o,c.id),r.set(o.toLowerCase(),c.id)}}return s}function gB(e,t,n){const i=t.date?e[t.date]:void 0,r=t.amount?e[t.amount]:void 0,s=t.credit?e[t.credit]:void 0,o=t.description?e[t.description]:void 0;if(!i||!o)return;const a=r?Number.parseFloat(r):NaN,c=s?Number.parseFloat(s):NaN;if(Number.isNaN(a)&&Number.isNaN(c))return;const l=(Number.isNaN(a)?0:-a)+(Number.isNaN(c)?0:c);return{date:i,amount:l,description:o,tagIds:[],accountId:n}}var JB=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function mB(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ad={exports:{}};var vB=ad.exports,qw;function yB(){return qw||(qw=1,(function(e,t){((n,i)=>{e.exports=i()})(vB,function n(){var i=typeof self<"u"?self:typeof window<"u"?window:i!==void 0?i:{},r,s=!i.document&&!!i.postMessage,o=i.IS_PAPA_WORKER||!1,a={},c=0,l={};function u(w){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(x){var M=k(x);M.chunkSize=parseInt(M.chunkSize),x.step||x.chunk||(M.chunkSize=null),this._handle=new g(M),(this._handle.streamer=this)._config=M}).call(this,w),this.parseChunk=function(x,M){var O=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<O){let R=this._config.newline;R||(T=this._config.quoteChar||'"',R=this._handle.guessLineEndings(x,T)),x=[...x.split(R).slice(O)].join(R)}this.isFirstChunk&&D(this._config.beforeFirstChunk)&&(T=this._config.beforeFirstChunk(x))!==void 0&&(x=T),this.isFirstChunk=!1,this._halted=!1;var O=this._partialLine+x,T=(this._partialLine="",this._handle.parse(O,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(x=T.meta.cursor,O=(this._finished||(this._partialLine=O.substring(x-this._baseIndex),this._baseIndex=x),T&&T.data&&(this._rowCount+=T.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),o)i.postMessage({results:T,workerId:l.WORKER_ID,finished:O});else if(D(this._config.chunk)&&!M){if(this._config.chunk(T,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=T=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(T.data),this._completeResults.errors=this._completeResults.errors.concat(T.errors),this._completeResults.meta=T.meta),this._completed||!O||!D(this._config.complete)||T&&T.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),O||T&&T.meta.paused||this._nextChunk(),T}this._halted=!0},this._sendError=function(x){D(this._config.error)?this._config.error(x):o&&this._config.error&&i.postMessage({workerId:l.WORKER_ID,error:x,finished:!1})}}function h(w){var x;(w=w||{}).chunkSize||(w.chunkSize=l.RemoteChunkSize),u.call(this,w),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(M){this._input=M,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(x=new XMLHttpRequest,this._config.withCredentials&&(x.withCredentials=this._config.withCredentials),s||(x.onload=$(this._chunkLoaded,this),x.onerror=$(this._chunkError,this)),x.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var M,O=this._config.downloadRequestHeaders;for(M in O)x.setRequestHeader(M,O[M])}var T;this._config.chunkSize&&(T=this._start+this._config.chunkSize-1,x.setRequestHeader("Range","bytes="+this._start+"-"+T));try{x.send(this._config.downloadRequestBody)}catch(R){this._chunkError(R.message)}s&&x.status===0&&this._chunkError()}},this._chunkLoaded=function(){x.readyState===4&&(x.status<200||400<=x.status?this._chunkError():(this._start+=this._config.chunkSize||x.responseText.length,this._finished=!this._config.chunkSize||this._start>=(M=>(M=M.getResponseHeader("Content-Range"))!==null?parseInt(M.substring(M.lastIndexOf("/")+1)):-1)(x),this.parseChunk(x.responseText)))},this._chunkError=function(M){M=x.statusText||M,this._sendError(new Error(M))}}function d(w){(w=w||{}).chunkSize||(w.chunkSize=l.LocalChunkSize),u.call(this,w);var x,M,O=typeof FileReader<"u";this.stream=function(T){this._input=T,M=T.slice||T.webkitSlice||T.mozSlice,O?((x=new FileReader).onload=$(this._chunkLoaded,this),x.onerror=$(this._chunkError,this)):x=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var T=this._input,R=(this._config.chunkSize&&(R=Math.min(this._start+this._config.chunkSize,this._input.size),T=M.call(T,this._start,R)),x.readAsText(T,this._config.encoding));O||this._chunkLoaded({target:{result:R}})},this._chunkLoaded=function(T){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(T.target.result)},this._chunkError=function(){this._sendError(x.error)}}function f(w){var x;u.call(this,w=w||{}),this.stream=function(M){return x=M,this._nextChunk()},this._nextChunk=function(){var M,O;if(!this._finished)return M=this._config.chunkSize,x=M?(O=x.substring(0,M),x.substring(M)):(O=x,""),this._finished=!x,this.parseChunk(O)}}function p(w){u.call(this,w=w||{});var x=[],M=!0,O=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(T){this._input=T,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){O&&x.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),x.length?this.parseChunk(x.shift()):M=!0},this._streamData=$(function(T){try{x.push(typeof T=="string"?T:T.toString(this._config.encoding)),M&&(M=!1,this._checkIsFinished(),this.parseChunk(x.shift()))}catch(R){this._streamError(R)}},this),this._streamError=$(function(T){this._streamCleanUp(),this._sendError(T)},this),this._streamEnd=$(function(){this._streamCleanUp(),O=!0,this._streamData("")},this),this._streamCleanUp=$(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function g(w){var x,M,O,T,R=Math.pow(2,53),j=-R,z=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,Y=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,F=this,G=0,B=0,q=!1,W=!1,V=[],L={data:[],errors:[],meta:{}};function ot(wt){return w.skipEmptyLines==="greedy"?wt.join("").trim()==="":wt.length===1&&wt[0].length===0}function kt(){if(L&&O&&(si("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),O=!1),w.skipEmptyLines&&(L.data=L.data.filter(function(at){return!ot(at)})),Lt()){let at=function(oe,xe){D(w.transformHeader)&&(oe=w.transformHeader(oe,xe)),V.push(oe)};if(L)if(Array.isArray(L.data[0])){for(var wt=0;Lt()&&wt<L.data.length;wt++)L.data[wt].forEach(at);L.data.splice(0,1)}else L.data.forEach(at)}function $t(at,oe){for(var xe=w.header?{}:[],Nt=0;Nt<at.length;Nt++){var zt=Nt,xt=at[Nt],xt=((ki,ut)=>(Jt=>(w.dynamicTypingFunction&&w.dynamicTyping[Jt]===void 0&&(w.dynamicTyping[Jt]=w.dynamicTypingFunction(Jt)),(w.dynamicTyping[Jt]||w.dynamicTyping)===!0))(ki)?ut==="true"||ut==="TRUE"||ut!=="false"&&ut!=="FALSE"&&((Jt=>{if(z.test(Jt)&&(Jt=parseFloat(Jt),j<Jt&&Jt<R))return 1})(ut)?parseFloat(ut):Y.test(ut)?new Date(ut):ut===""?null:ut):ut)(zt=w.header?Nt>=V.length?"__parsed_extra":V[Nt]:zt,xt=w.transform?w.transform(xt,zt):xt);zt==="__parsed_extra"?(xe[zt]=xe[zt]||[],xe[zt].push(xt)):xe[zt]=xt}return w.header&&(Nt>V.length?si("FieldMismatch","TooManyFields","Too many fields: expected "+V.length+" fields but parsed "+Nt,B+oe):Nt<V.length&&si("FieldMismatch","TooFewFields","Too few fields: expected "+V.length+" fields but parsed "+Nt,B+oe)),xe}var se;L&&(w.header||w.dynamicTyping||w.transform)&&(se=1,!L.data.length||Array.isArray(L.data[0])?(L.data=L.data.map($t),se=L.data.length):L.data=$t(L.data,0),w.header&&L.meta&&(L.meta.fields=V),B+=se)}function Lt(){return w.header&&V.length===0}function si(wt,$t,se,at){wt={type:wt,code:$t,message:se},at!==void 0&&(wt.row=at),L.errors.push(wt)}D(w.step)&&(T=w.step,w.step=function(wt){L=wt,Lt()?kt():(kt(),L.data.length!==0&&(G+=wt.data.length,w.preview&&G>w.preview?M.abort():(L.data=L.data[0],T(L,F))))}),this.parse=function(wt,$t,se){var at=w.quoteChar||'"',at=(w.newline||(w.newline=this.guessLineEndings(wt,at)),O=!1,w.delimiter?D(w.delimiter)&&(w.delimiter=w.delimiter(wt),L.meta.delimiter=w.delimiter):((at=((oe,xe,Nt,zt,xt)=>{var ki,ut,Jt,is;xt=xt||[",","	","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var aa=0;aa<xt.length;aa++){for(var Ni,Ic=xt[aa],He=0,Fi=0,Ee=0,En=(Jt=void 0,new b({comments:zt,delimiter:Ic,newline:xe,preview:10}).parse(oe)),gr=0;gr<En.data.length;gr++)Nt&&ot(En.data[gr])?Ee++:(Ni=En.data[gr].length,Fi+=Ni,Jt===void 0?Jt=Ni:0<Ni&&(He+=Math.abs(Ni-Jt),Jt=Ni));0<En.data.length&&(Fi/=En.data.length-Ee),(ut===void 0||He<=ut)&&(is===void 0||is<Fi)&&1.99<Fi&&(ut=He,ki=Ic,is=Fi)}return{successful:!!(w.delimiter=ki),bestDelimiter:ki}})(wt,w.newline,w.skipEmptyLines,w.comments,w.delimitersToGuess)).successful?w.delimiter=at.bestDelimiter:(O=!0,w.delimiter=l.DefaultDelimiter),L.meta.delimiter=w.delimiter),k(w));return w.preview&&w.header&&at.preview++,x=wt,M=new b(at),L=M.parse(x,$t,se),kt(),q?{meta:{paused:!0}}:L||{meta:{paused:!1}}},this.paused=function(){return q},this.pause=function(){q=!0,M.abort(),x=D(w.chunk)?"":x.substring(M.getCharIndex())},this.resume=function(){F.streamer._halted?(q=!1,F.streamer.parseChunk(x,!0)):setTimeout(F.resume,3)},this.aborted=function(){return W},this.abort=function(){W=!0,M.abort(),L.meta.aborted=!0,D(w.complete)&&w.complete(L),x=""},this.guessLineEndings=function(oe,at){oe=oe.substring(0,1048576);var at=new RegExp(m(at)+"([^]*?)"+m(at),"gm"),se=(oe=oe.replace(at,"")).split("\r"),at=oe.split(`
`),oe=1<at.length&&at[0].length<se[0].length;if(se.length===1||oe)return`
`;for(var xe=0,Nt=0;Nt<se.length;Nt++)se[Nt][0]===`
`&&xe++;return xe>=se.length/2?`\r
`:"\r"}}function m(w){return w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function b(w){var x=(w=w||{}).delimiter,M=w.newline,O=w.comments,T=w.step,R=w.preview,j=w.fastMode,z=null,Y=!1,F=w.quoteChar==null?'"':w.quoteChar,G=F;if(w.escapeChar!==void 0&&(G=w.escapeChar),(typeof x!="string"||-1<l.BAD_DELIMITERS.indexOf(x))&&(x=","),O===x)throw new Error("Comment character same as delimiter");O===!0?O="#":(typeof O!="string"||-1<l.BAD_DELIMITERS.indexOf(O))&&(O=!1),M!==`
`&&M!=="\r"&&M!==`\r
`&&(M=`
`);var B=0,q=!1;this.parse=function(W,V,L){if(typeof W!="string")throw new Error("Input must be a string");var ot=W.length,kt=x.length,Lt=M.length,si=O.length,wt=D(T),$t=[],se=[],at=[],oe=B=0;if(!W)return He();if(j||j!==!1&&W.indexOf(F)===-1){for(var xe=W.split(M),Nt=0;Nt<xe.length;Nt++){if(at=xe[Nt],B+=at.length,Nt!==xe.length-1)B+=M.length;else if(L)return He();if(!O||at.substring(0,si)!==O){if(wt){if($t=[],is(at.split(x)),Fi(),q)return He()}else is(at.split(x));if(R&&R<=Nt)return $t=$t.slice(0,R),He(!0)}}return He()}for(var zt=W.indexOf(x,B),xt=W.indexOf(M,B),ki=new RegExp(m(G)+m(F),"g"),ut=W.indexOf(F,B);;)if(W[B]===F)for(ut=B,B++;;){if((ut=W.indexOf(F,ut+1))===-1)return L||se.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:$t.length,index:B}),Ni();if(ut===ot-1)return Ni(W.substring(B,ut).replace(ki,F));if(F===G&&W[ut+1]===G)ut++;else if(F===G||ut===0||W[ut-1]!==G){zt!==-1&&zt<ut+1&&(zt=W.indexOf(x,ut+1));var Jt=aa((xt=xt!==-1&&xt<ut+1?W.indexOf(M,ut+1):xt)===-1?zt:Math.min(zt,xt));if(W.substr(ut+1+Jt,kt)===x){at.push(W.substring(B,ut).replace(ki,F)),W[B=ut+1+Jt+kt]!==F&&(ut=W.indexOf(F,B)),zt=W.indexOf(x,B),xt=W.indexOf(M,B);break}if(Jt=aa(xt),W.substring(ut+1+Jt,ut+1+Jt+Lt)===M){if(at.push(W.substring(B,ut).replace(ki,F)),Ic(ut+1+Jt+Lt),zt=W.indexOf(x,B),ut=W.indexOf(F,B),wt&&(Fi(),q))return He();if(R&&$t.length>=R)return He(!0);break}se.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:$t.length,index:B}),ut++}}else if(O&&at.length===0&&W.substring(B,B+si)===O){if(xt===-1)return He();B=xt+Lt,xt=W.indexOf(M,B),zt=W.indexOf(x,B)}else if(zt!==-1&&(zt<xt||xt===-1))at.push(W.substring(B,zt)),B=zt+kt,zt=W.indexOf(x,B);else{if(xt===-1)break;if(at.push(W.substring(B,xt)),Ic(xt+Lt),wt&&(Fi(),q))return He();if(R&&$t.length>=R)return He(!0)}return Ni();function is(Ee){$t.push(Ee),oe=B}function aa(Ee){var En=0;return En=Ee!==-1&&(Ee=W.substring(ut+1,Ee))&&Ee.trim()===""?Ee.length:En}function Ni(Ee){return L||(Ee===void 0&&(Ee=W.substring(B)),at.push(Ee),B=ot,is(at),wt&&Fi()),He()}function Ic(Ee){B=Ee,is(at),at=[],xt=W.indexOf(M,B)}function He(Ee){if(w.header&&!V&&$t.length&&!Y){var En=$t[0],gr=Object.create(null),yp=new Set(En);let K0=!1;for(let ca=0;ca<En.length;ca++){let zi=En[ca];if(gr[zi=D(w.transformHeader)?w.transformHeader(zi,ca):zi]){let Pc,G0=gr[zi];for(;Pc=zi+"_"+G0,G0++,yp.has(Pc););yp.add(Pc),En[ca]=Pc,gr[zi]++,K0=!0,(z=z===null?{}:z)[Pc]=zi}else gr[zi]=1,En[ca]=zi;yp.add(zi)}K0&&console.warn("Duplicate headers found and renamed."),Y=!0}return{data:$t,errors:se,meta:{delimiter:x,linebreak:M,aborted:q,truncated:!!Ee,cursor:oe+(V||0),renamedHeaders:z}}}function Fi(){T(He()),$t=[],se=[]}},this.abort=function(){q=!0},this.getCharIndex=function(){return B}}function _(w){var x=w.data,M=a[x.workerId],O=!1;if(x.error)M.userError(x.error,x.file);else if(x.results&&x.results.data){var T={abort:function(){O=!0,C(x.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:S,resume:S};if(D(M.userStep)){for(var R=0;R<x.results.data.length&&(M.userStep({data:x.results.data[R],errors:x.results.errors,meta:x.results.meta},T),!O);R++);delete x.results}else D(M.userChunk)&&(M.userChunk(x.results,T,x.file),delete x.results)}x.finished&&!O&&C(x.workerId,x.results)}function C(w,x){var M=a[w];D(M.userComplete)&&M.userComplete(x),M.terminate(),delete a[w]}function S(){throw new Error("Not implemented.")}function k(w){if(typeof w!="object"||w===null)return w;var x,M=Array.isArray(w)?[]:{};for(x in w)M[x]=k(w[x]);return M}function $(w,x){return function(){w.apply(x,arguments)}}function D(w){return typeof w=="function"}return l.parse=function(w,x){var M=(x=x||{}).dynamicTyping||!1;if(D(M)&&(x.dynamicTypingFunction=M,M={}),x.dynamicTyping=M,x.transform=!!D(x.transform)&&x.transform,!x.worker||!l.WORKERS_SUPPORTED)return M=null,l.NODE_STREAM_INPUT,typeof w=="string"?(w=(O=>O.charCodeAt(0)!==65279?O:O.slice(1))(w),M=new(x.download?h:f)(x)):w.readable===!0&&D(w.read)&&D(w.on)?M=new p(x):(i.File&&w instanceof File||w instanceof Object)&&(M=new d(x)),M.stream(w);(M=(()=>{var O;return!!l.WORKERS_SUPPORTED&&(O=(()=>{var T=i.URL||i.webkitURL||null,R=n.toString();return l.BLOB_URL||(l.BLOB_URL=T.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",R,")();"],{type:"text/javascript"})))})(),(O=new i.Worker(O)).onmessage=_,O.id=c++,a[O.id]=O)})()).userStep=x.step,M.userChunk=x.chunk,M.userComplete=x.complete,M.userError=x.error,x.step=D(x.step),x.chunk=D(x.chunk),x.complete=D(x.complete),x.error=D(x.error),delete x.worker,M.postMessage({input:w,config:x,workerId:M.id})},l.unparse=function(w,x){var M=!1,O=!0,T=",",R=`\r
`,j='"',z=j+j,Y=!1,F=null,G=!1,B=((()=>{if(typeof x=="object"){if(typeof x.delimiter!="string"||l.BAD_DELIMITERS.filter(function(V){return x.delimiter.indexOf(V)!==-1}).length||(T=x.delimiter),typeof x.quotes!="boolean"&&typeof x.quotes!="function"&&!Array.isArray(x.quotes)||(M=x.quotes),typeof x.skipEmptyLines!="boolean"&&typeof x.skipEmptyLines!="string"||(Y=x.skipEmptyLines),typeof x.newline=="string"&&(R=x.newline),typeof x.quoteChar=="string"&&(j=x.quoteChar),typeof x.header=="boolean"&&(O=x.header),Array.isArray(x.columns)){if(x.columns.length===0)throw new Error("Option columns is empty");F=x.columns}x.escapeChar!==void 0&&(z=x.escapeChar+j),x.escapeFormulae instanceof RegExp?G=x.escapeFormulae:typeof x.escapeFormulae=="boolean"&&x.escapeFormulae&&(G=/^[=+\-@\t\r].*$/)}})(),new RegExp(m(j),"g"));if(typeof w=="string"&&(w=JSON.parse(w)),Array.isArray(w)){if(!w.length||Array.isArray(w[0]))return q(null,w,Y);if(typeof w[0]=="object")return q(F||Object.keys(w[0]),w,Y)}else if(typeof w=="object")return typeof w.data=="string"&&(w.data=JSON.parse(w.data)),Array.isArray(w.data)&&(w.fields||(w.fields=w.meta&&w.meta.fields||F),w.fields||(w.fields=Array.isArray(w.data[0])?w.fields:typeof w.data[0]=="object"?Object.keys(w.data[0]):[]),Array.isArray(w.data[0])||typeof w.data[0]=="object"||(w.data=[w.data])),q(w.fields||[],w.data||[],Y);throw new Error("Unable to serialize unrecognized input");function q(V,L,ot){var kt="",Lt=(typeof V=="string"&&(V=JSON.parse(V)),typeof L=="string"&&(L=JSON.parse(L)),Array.isArray(V)&&0<V.length),si=!Array.isArray(L[0]);if(Lt&&O){for(var wt=0;wt<V.length;wt++)0<wt&&(kt+=T),kt+=W(V[wt],wt);0<L.length&&(kt+=R)}for(var $t=0;$t<L.length;$t++){var se=(Lt?V:L[$t]).length,at=!1,oe=Lt?Object.keys(L[$t]).length===0:L[$t].length===0;if(ot&&!Lt&&(at=ot==="greedy"?L[$t].join("").trim()==="":L[$t].length===1&&L[$t][0].length===0),ot==="greedy"&&Lt){for(var xe=[],Nt=0;Nt<se;Nt++){var zt=si?V[Nt]:Nt;xe.push(L[$t][zt])}at=xe.join("").trim()===""}if(!at){for(var xt=0;xt<se;xt++){0<xt&&!oe&&(kt+=T);var ki=Lt&&si?V[xt]:xt;kt+=W(L[$t][ki],xt)}$t<L.length-1&&(!ot||0<se&&!oe)&&(kt+=R)}}return kt}function W(V,L){var ot,kt;return V==null?"":V.constructor===Date?JSON.stringify(V).slice(1,25):(kt=!1,G&&typeof V=="string"&&G.test(V)&&(V="'"+V,kt=!0),ot=V.toString().replace(B,z),(kt=kt||M===!0||typeof M=="function"&&M(V,L)||Array.isArray(M)&&M[L]||((Lt,si)=>{for(var wt=0;wt<si.length;wt++)if(-1<Lt.indexOf(si[wt]))return!0;return!1})(ot,l.BAD_DELIMITERS)||-1<ot.indexOf(T)||ot.charAt(0)===" "||ot.charAt(ot.length-1)===" ")?j+ot+j:ot)}},l.RECORD_SEP="",l.UNIT_SEP="",l.BYTE_ORDER_MARK="\uFEFF",l.BAD_DELIMITERS=["\r",`
`,'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!s&&!!i.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=b,l.ParserHandle=g,l.NetworkStreamer=h,l.FileStreamer=d,l.StringStreamer=f,l.ReadableStreamStreamer=p,i.jQuery&&((r=i.jQuery).fn.parse=function(w){var x=w.config||{},M=[];return this.each(function(R){if(!(r(this).prop("tagName").toUpperCase()==="INPUT"&&r(this).attr("type").toLowerCase()==="file"&&i.FileReader)||!this.files||this.files.length===0)return!0;for(var j=0;j<this.files.length;j++)M.push({file:this.files[j],inputElem:this,instanceConfig:r.extend({},x)})}),O(),this;function O(){if(M.length===0)D(w.complete)&&w.complete();else{var R,j,z,Y,F=M[0];if(D(w.before)){var G=w.before(F.file,F.inputElem);if(typeof G=="object"){if(G.action==="abort")return R="AbortError",j=F.file,z=F.inputElem,Y=G.reason,void(D(w.error)&&w.error({name:R},j,z,Y));if(G.action==="skip")return void T();typeof G.config=="object"&&(F.instanceConfig=r.extend(F.instanceConfig,G.config))}else if(G==="skip")return void T()}var B=F.instanceConfig.complete;F.instanceConfig.complete=function(q){D(B)&&B(q,F.file,F.inputElem),T()},l.parse(F.file,F.instanceConfig)}}function T(){M.splice(0,1),O()}}),o&&(i.onmessage=function(w){w=w.data,l.WORKER_ID===void 0&&w&&(l.WORKER_ID=w.workerId),typeof w.input=="string"?i.postMessage({workerId:l.WORKER_ID,results:l.parse(w.input,w.config),finished:!0}):(i.File&&w.input instanceof File||w.input instanceof Object)&&(w=l.parse(w.input,w.config))&&i.postMessage({workerId:l.WORKER_ID,results:w,finished:!0})}),(h.prototype=Object.create(u.prototype)).constructor=h,(d.prototype=Object.create(u.prototype)).constructor=d,(f.prototype=Object.create(f.prototype)).constructor=f,(p.prototype=Object.create(u.prototype)).constructor=p,l})})(ad)),ad.exports}var bB=yB();const _B=mB(bB),wB=e=>{const t=e.map(i=>i.toLocaleLowerCase()),n=i=>{const r=t.findIndex(s=>i.some(o=>s.includes(o)));return r!==-1?e[r]:void 0};return{date:n(["date","time"]),amount:n(["amount","value","cost","price","debit"]),credit:n(["credit","payment"]),description:n(["description","merchant","payee","name","memo"]),account:n(["account","source","card"])}},xB=e=>new Promise((t,n)=>{_B.parse(e,{header:!0,skipEmptyLines:!0,complete:({data:i,meta:r,errors:s})=>{const o=wB(r.fields||[]);t({data:i,meta:r,errors:s,suggestedMapping:o})},error:i=>{n(i)}})});var CB=Object.defineProperty,kB=Object.getOwnPropertyDescriptor,lD=e=>{throw TypeError(e)},oa=(e,t,n,i)=>{for(var r=i>1?void 0:i?kB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&CB(t,n,r),r},SB=(e,t,n)=>t.has(e)||lD("Cannot "+n),EB=(e,t,n)=>t.has(e)?lD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ks=(e,t,n)=>(SB(e,t,"access private method"),n),Qi,uD,hD,dD,fD,pD,gD,mD,vD;const MB=[{key:"date",label:"Date"},{key:"amount",label:"Debit"},{key:"credit",label:"Credit"},{key:"description",label:"Description"},{key:"account",label:"Account"}];let Gr=class extends fp(mt){constructor(){super(...arguments),EB(this,Qi),this._step="upload",this._mapping={},this._accounts=[],this._accountName="",this._importMode="append"}async loadFile(e){await this.withBusy(async()=>{this._accounts=await ke.all(),this._result=await xB(e),this._mapping={...this._result.suggestedMapping},this._step="mapping"})}render(){return E`
      ${this._step==="upload"?ks(this,Qi,mD).call(this):ks(this,Qi,vD).call(this)}
    `}};Qi=new WeakSet;uD=async function(e){const t=e.target;!t.files||t.files.length===0||await this.loadFile(t.files[0])};hD=function(e){this._accountName=e.target.value};dD=function(e){this._importMode=e.target.value};fD=function(e,t){const i=t.target.value||void 0;this._mapping={...this._mapping,[e]:i}};pD=async function(){if(this._mapping.account)return;const e=this._accountName.trim();if(!e)return;const t=this._accounts.find(n=>n.name.toLowerCase()===e.toLowerCase());return t?t.id:(await ke.create({name:e})).id};gD=async function(){this._result&&await this.withBusy(async()=>{const e=!this._mapping.account,t=await ks(this,Qi,pD).call(this);if(!(e&&t===void 0)){Rv("Importing transactions...");try{const n=await fB(this._result.data,this._mapping,{accountId:t,importMode:this._importMode});this.dispatchEvent(new CustomEvent("imported",{detail:{count:n}})),this._step="upload",this._result=void 0,this._mapping={},this._accountName="",this._importMode="append"}finally{Av()}}})};mD=function(){return E`
      <label for="file-upload">Select a CSV file:</label>
      <input type="file" id="file-upload" accept=".csv" @change=${ks(this,Qi,uD)} />
    `};vD=function(){if(!this._result)return nt;const e=this._result.meta.fields??[],t=this._result.data.slice(0,5);return E`
      <h4>Column Mapping</h4>
      <div class="mapping-form">
        ${MB.map(({key:n,label:i})=>E`
          <label>${i}:</label>
          <select @change=${r=>ks(this,Qi,fD).call(this,n,r)}>
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
            @input=${ks(this,Qi,hD)}
            placeholder="Type or select an account"
          />
          <datalist id="account-options">
            ${this._accounts.map(n=>E`<option value=${n.name}></option>`)}
          </datalist>
        </div>
      `}

      <div class="mapping-form">
        <label>Mode:</label>
        <select @change=${ks(this,Qi,dD)}>
          <option value="append" ?selected=${this._importMode==="append"}>Append to existing</option>
          <option value="replace" ?selected=${this._importMode==="replace"}>Replace existing transactions</option>
        </select>
      </div>

      <button @click=${ks(this,Qi,gD)}>Import</button>

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
    `};Gr.styles=[Li,dp,Zr,pt`
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
    `];oa([P()],Gr.prototype,"_step",2);oa([P()],Gr.prototype,"_result",2);oa([P()],Gr.prototype,"_mapping",2);oa([P()],Gr.prototype,"_accounts",2);oa([P()],Gr.prototype,"_accountName",2);oa([P()],Gr.prototype,"_importMode",2);Gr=oa([Et("transaction-importer")],Gr);var DB=Object.defineProperty,$B=Object.getOwnPropertyDescriptor,yD=e=>{throw TypeError(e)},Sn=(e,t,n,i)=>{for(var r=i>1?void 0:i?$B(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&DB(t,n,r),r},U0=(e,t,n)=>t.has(e)||yD("Cannot "+n),yg=(e,t,n)=>(U0(e,t,"read from private field"),n?n.call(e):t.get(e)),bg=(e,t,n)=>t.has(e)?yD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),Vw=(e,t,n,i)=>(U0(e,t,"write to private field"),t.set(e,n),n),J=(e,t,n)=>(U0(e,t,"access private method"),n),kl,cd,X,qm,Vo,bD,$u,_D,wD,xD,ka,Sa,Vm,CD,kD,SD,ED,MD,DD,lh,$D,TD,Y0,OD,ID,Km,Gm,PD,RD;let We=class extends fp(mt){constructor(){super(...arguments),bg(this,X),this._transactions=null,this._tags=[],this._tagMap=new Map,this._merchants=new Map,this._merchantList=[],this._currentPage=1,this._pageSize=50,this._filter="",this._sortCol="date",this._sortDir="desc",this._selectedIds=new Set,this._excludeTagIds=new Set,this._noMerchant=!1,this._bulkMerchantName="",this._showImporter=!1,bg(this,kl,[]),bg(this,cd,e=>{const t=e.detail.file;this._showImporter=!0,this.updateComplete.then(()=>{const n=this.shadowRoot?.querySelector("transaction-importer");n&&n.loadFile(t)})})}connectedCallback(){super.connectedCallback(),J(this,X,Vo).call(this),document.addEventListener("budgee-import-csv",yg(this,cd));const e=Qo(()=>J(this,X,Vo).call(this),300);Promise.all([_e.subscribe(e),pe.subscribe(e),Ie.subscribe(e)]).then(t=>{Vw(this,kl,t)})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("budgee-import-csv",yg(this,cd));for(const e of yg(this,kl))e.unsubscribe();Vw(this,kl,[])}render(){if(this._transactions===null)return E`
        <budgee-skeleton variant="table" rows="8"></budgee-skeleton>
      `;if(this._transactions.length===0)return E`
        <budgee-empty-state
          heading="No transactions yet"
          description="Import a CSV file to get started."
        >
          <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>Import CSV</button>
        </budgee-empty-state>
        ${this._showImporter?E`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${J(this,X,qm)}></transaction-importer></budgee-modal>`:""}
      `;const e=this._transactions.filter(o=>J(this,X,xD).call(this,o)),t=J(this,X,kD).call(this,e),n=(this._currentPage-1)*this._pageSize,i=t.slice(n,n+this._pageSize),r=i.map(o=>o.id),s=r.length>0&&r.every(o=>this._selectedIds.has(o));return E`
      <button class="import-toggle" @click=${()=>{this._showImporter=!0}}>
        Import CSV
      </button>
      ${this._showImporter?E`<budgee-modal heading="Import Transactions" @modal-close=${()=>{this._showImporter=!1}}><transaction-importer @imported=${J(this,X,qm)}></transaction-importer></budgee-modal>`:nt}
      ${J(this,X,PD).call(this)}
      ${J(this,X,RD).call(this)}
      <paginated-table
        .totalItems=${e.length}
        .defaultPageSize=${50}
        storageKey="transactions"
        ?filterable=${!0}
        @page-change=${J(this,X,_D)}
        @filter-change=${J(this,X,wD)}
      >
        <table>
          <thead>
            <tr>
              <th class="col-checkbox">
                <input
                  type="checkbox"
                  .checked=${s}
                  @change=${()=>J(this,X,DD).call(this,i)}
                />
              </th>
              <th class="sortable col-date" @click=${()=>J(this,X,ka).call(this,"date")}>
                Date${J(this,X,Sa).call(this,"date")}
              </th>
              <th class="sortable" @click=${()=>J(this,X,ka).call(this,"merchant")}>
                Merchant${J(this,X,Sa).call(this,"merchant")}
              </th>
              <th class="sortable" @click=${()=>J(this,X,ka).call(this,"description")}>
                Description${J(this,X,Sa).call(this,"description")}
              </th>
              <th class="sortable col-amount" @click=${()=>J(this,X,ka).call(this,"amount")}>
                Amount${J(this,X,Sa).call(this,"amount")}
              </th>
              <th class="sortable col-tags" @click=${()=>J(this,X,ka).call(this,"tags")}>
                Tags${J(this,X,Sa).call(this,"tags")}
              </th>
            </tr>
          </thead>
          <tbody>
            ${i.map(o=>E`
              <tr @click=${()=>J(this,X,ED).call(this,o.id)}>
                <td class="col-checkbox" @click=${a=>a.stopPropagation()}>
                  <input
                    type="checkbox"
                    .checked=${this._selectedIds.has(o.id)}
                    @change=${()=>J(this,X,MD).call(this,o.id)}
                  />
                </td>
                <td class="col-date">${J(this,X,CD).call(this,o.date)}</td>
                <td>${o.merchantId&&this._merchants.has(o.merchantId)?E`<a class="merchant-link" @click=${a=>{a.stopPropagation(),J(this,X,SD).call(this,o.merchantId)}}>${this._merchants.get(o.merchantId)}</a>`:""}</td>
                <td>${this._filter?hB(o.description,this._filter):o.description}</td>
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
    `}};kl=new WeakMap;cd=new WeakMap;X=new WeakSet;qm=async function(){await this.withBusy(async()=>{this._showImporter=!1,await J(this,X,Vo).call(this)})};Vo=async function(){const[e,t,n]=await Promise.all([_e.all(),pe.all(),Ie.all()]);this._transactions=e,this._tags=t,this._tagMap=new Map(t.map(i=>[i.id,i])),this._merchants=new Map(n.map(i=>[i.id,i.name])),this._merchantList=n};bD=function(e){return this._tagMap.get(e)};$u=function(e){return J(this,X,bD).call(this,e)?.name??`#${e}`};_D=function(e){this._currentPage=e.detail.page,this._pageSize=e.detail.pageSize};wD=function(e){this._filter=e.detail.filter,this._currentPage=1};xD=function(e){if(this._noMerchant&&e.merchantId||e.tagIds.some(n=>this._excludeTagIds.has(n)))return!1;if(!this._filter)return!0;const t=this._filter.toLowerCase();return!!(e.description.toLowerCase().includes(t)||e.tagIds.some(n=>J(this,X,$u).call(this,n).toLowerCase().includes(t))||e.merchantId&&this._merchants.get(e.merchantId)?.toLowerCase().includes(t)||e.date.includes(t)||e.amount.toFixed(2).includes(t))};ka=function(e){this._sortCol===e?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sortCol=e,this._sortDir="asc"),this._currentPage=1};Sa=function(e){return this._sortCol!==e?"":this._sortDir==="asc"?" ▲":" ▼"};Vm=function(e){return e?this._merchants.get(e)??"":""};CD=function(e){const[t,n,i]=e.split("-");return new Date(Number(t),Number(n)-1,Number(i)).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})};kD=function(e){const t=this._sortCol,n=this._sortDir==="asc"?1:-1;return[...e].sort((i,r)=>{let s=0;if(t==="date")s=i.date.localeCompare(r.date);else if(t==="merchant")s=J(this,X,Vm).call(this,i.merchantId).localeCompare(J(this,X,Vm).call(this,r.merchantId));else if(t==="description")s=i.description.localeCompare(r.description);else if(t==="amount")s=i.amount-r.amount;else if(t==="tags"){const o=i.tagIds.map(c=>J(this,X,$u).call(this,c)).join(","),a=r.tagIds.map(c=>J(this,X,$u).call(this,c)).join(",");s=o.localeCompare(a)}return s*n})};SD=function(e){_c(`/merchants/${e}`)};ED=function(e){_c(`/transactions/${e}`)};MD=function(e){const t=new Set(this._selectedIds);t.has(e)?t.delete(e):t.add(e),this._selectedIds=t};DD=function(e){const t=e.map(i=>i.id);if(t.every(i=>this._selectedIds.has(i))){const i=new Set(this._selectedIds);for(const r of t)i.delete(r);this._selectedIds=i}else this._selectedIds=new Set([...this._selectedIds,...t])};lh=function(){this._selectedIds=new Set,this._bulkMerchantName=""};$D=async function(e){const n=e.detail.tag.id;await J(this,X,Y0).call(this,n)};TD=async function(e){const t=e.detail.name,n=await pe.create(t);await J(this,X,Y0).call(this,n.id)};Y0=async function(e){this._transactions&&await this.withBusy(async()=>{const t=this._transactions.filter(n=>this._selectedIds.has(n.id)&&!n.tagIds.includes(e)).map(n=>({...n,tagIds:[...n.tagIds,e]}));t.length>0&&await _e.bulkPut(t),Ci({message:`Tag applied to ${t.length} transaction(s)`,type:"success"}),J(this,X,lh).call(this),await J(this,X,Vo).call(this)})};OD=async function(){const e=this._bulkMerchantName.trim();!e||!this._transactions||await this.withBusy(async()=>{let t=this._merchantList.find(i=>i.name.toLowerCase()===e.toLowerCase());t||(t=await Ie.create(e));const n=this._transactions.filter(i=>this._selectedIds.has(i.id)).map(i=>({...i,merchantId:t.id}));n.length>0&&await _e.bulkPut(n),Ci({message:`Merchant assigned to ${n.length} transaction(s)`,type:"success"}),J(this,X,lh).call(this),await J(this,X,Vo).call(this)})};ID=async function(){if(!this._transactions)return;const e=this._selectedIds.size;await _i.show({heading:"Delete Transactions",message:`Delete ${e} selected transaction${e===1?"":"s"}? This cannot be undone.`,confirmLabel:"Delete",danger:!0})&&await this.withBusy(async()=>{const n=[...this._selectedIds];await _e.bulkRemove(n),Ci({message:`${n.length} transaction(s) deleted`,type:"success"}),J(this,X,lh).call(this),await J(this,X,Vo).call(this)})};Km=function(e){const t=new Set(this._excludeTagIds);t.has(e)?t.delete(e):t.add(e),this._excludeTagIds=t,this._currentPage=1};Gm=function(){this._noMerchant=!this._noMerchant,this._currentPage=1};PD=function(){const e=this._excludeTagIds.size>0||this._noMerchant;return E`
      <div class="filter-bar">
        <div class="filter-group">
          <label>Exclude tag:</label>
          <select @change=${t=>{const n=t.target.value;n&&J(this,X,Km).call(this,n),t.target.value=""}}>
            <option value="">Select…</option>
            ${this._tags.filter(t=>!this._excludeTagIds.has(t.id)).map(t=>E`<option value=${t.id}>${t.name}</option>`)}
          </select>
        </div>
        <div class="filter-group">
          <label>
            <input type="checkbox" .checked=${this._noMerchant} @change=${J(this,X,Gm)} />
            No merchant
          </label>
        </div>
        ${e?E`
            <div class="active-filters">
              ${[...this._excludeTagIds].map(t=>E`
                  <span class="filter-chip">
                    Not: ${J(this,X,$u).call(this,t)}
                    <button class="chip-remove" @click=${()=>J(this,X,Km).call(this,t)}>×</button>
                  </span>
                `)}
              ${this._noMerchant?E`<span class="filter-chip">
                    No merchant
                    <button class="chip-remove" @click=${J(this,X,Gm)}>×</button>
                  </span>`:nt}
            </div>
          `:nt}
      </div>
    `};RD=function(){return this._selectedIds.size===0?nt:E`
      <div class="bulk-bar">
        <span class="selected-count">${this._selectedIds.size} selected</span>
        <div class="bulk-action">
          <label>Tag:</label>
          <tag-autocomplete
            .tags=${this._tags}
            .selectedTagIds=${[]}
            .excludeIds=${[]}
            @tag-selected=${J(this,X,$D)}
            @tag-created=${J(this,X,TD)}
          ></tag-autocomplete>
        </div>
        <div class="bulk-action">
          <label>Merchant:</label>
          <merchant-autocomplete
            .merchants=${this._merchantList}
            .value=${this._bulkMerchantName}
            @merchant-changed=${e=>{this._bulkMerchantName=e.detail.name}}
          ></merchant-autocomplete>
          <button @click=${J(this,X,OD)} ?disabled=${!this._bulkMerchantName.trim()}>
            Set
          </button>
        </div>
        <button class="danger" @click=${J(this,X,ID)}>Delete selected</button>
        <button @click=${J(this,X,lh)}>Clear selection</button>
      </div>
    `};We.styles=[Li,dp,Zr,pt`
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
    `];Sn([P()],We.prototype,"_transactions",2);Sn([P()],We.prototype,"_tags",2);Sn([P()],We.prototype,"_merchants",2);Sn([P()],We.prototype,"_merchantList",2);Sn([P()],We.prototype,"_currentPage",2);Sn([P()],We.prototype,"_pageSize",2);Sn([P()],We.prototype,"_filter",2);Sn([P()],We.prototype,"_sortCol",2);Sn([P()],We.prototype,"_sortDir",2);Sn([P()],We.prototype,"_selectedIds",2);Sn([P()],We.prototype,"_excludeTagIds",2);Sn([P()],We.prototype,"_noMerchant",2);Sn([P()],We.prototype,"_bulkMerchantName",2);Sn([P()],We.prototype,"_showImporter",2);We=Sn([Et("transaction-list")],We);var TB=Object.defineProperty,OB=Object.getOwnPropertyDescriptor,AD=e=>{throw TypeError(e)},q0=(e,t,n,i)=>{for(var r=i>1?void 0:i?OB(t,n):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(r=(i?o(t,n,r):o(r))||r);return i&&r&&TB(t,n,r),r},V0=(e,t,n)=>t.has(e)||AD("Cannot "+n),Tn=(e,t,n)=>(V0(e,t,"read from private field"),n?n.call(e):t.get(e)),rs=(e,t,n)=>t.has(e)?AD("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),vf=(e,t,n,i)=>(V0(e,t,"write to private field"),t.set(e,n),n),_g=(e,t,n)=>(V0(e,t,"access private method"),n),Kw=(e,t,n,i)=>({set _(r){vf(e,t,r)},get _(){return Tn(e,t,i)}}),Ea,Ba,Sl,Xm,ld,LD,ud,hd,dd,fd;let Tu=class extends mt{constructor(){super(...arguments),rs(this,Sl),this._dragOver=!1,this._showShortcuts=!1,rs(this,Ea,0),rs(this,Ba),this._router=new BD(this,[{path:"/",render:()=>E`
          <budgee-dashboard></budgee-dashboard>
        `},{path:"/transactions",render:()=>E`
          <transaction-list></transaction-list>
        `},{path:"/transactions/:id",render:({id:e})=>E`<transaction-detail .transactionId=${e}></transaction-detail>`,enter:async()=>(await Oa(()=>import("./TransactionDetail-D32hKjVv.js"),[]),!0)},{path:"/accounts",render:()=>E`
          <account-list></account-list>
        `},{path:"/accounts/:id",render:({id:e})=>E`<account-detail .accountId=${e}></account-detail>`,enter:async()=>(await Oa(()=>import("./AccountDetail-DrNjdzGD.js"),[]),!0)},{path:"/merchants",render:()=>E`
          <merchant-list></merchant-list>
        `},{path:"/merchants/:id",render:({id:e})=>E`<merchant-detail .merchantId=${e}></merchant-detail>`,enter:async()=>(await Oa(()=>import("./MerchantDetail-p76L0MXy.js"),[]),!0)},{path:"/tags",render:()=>E`
          <tag-manager></tag-manager>
        `},{path:"/rules",render:()=>E`
          <rule-manager></rule-manager>
        `},{path:"/settings",render:()=>E`
          <budgee-settings @budgee-sync-settings-changed=${()=>_g(this,Sl,Xm).call(this)}></budgee-settings>
        `}]),rs(this,ld,e=>{const t=e.target,n=t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable;e.key==="?"&&!n&&!e.metaKey&&!e.ctrlKey&&(e.preventDefault(),this._showShortcuts=!this._showShortcuts)}),rs(this,ud,e=>{e.preventDefault()}),rs(this,hd,e=>{e.preventDefault(),Kw(this,Ea)._++,this._dragOver=!0}),rs(this,dd,e=>{Kw(this,Ea)._--,Tn(this,Ea)===0&&(this._dragOver=!1)}),rs(this,fd,async e=>{e.preventDefault(),vf(this,Ea,0),this._dragOver=!1;const t=e.dataTransfer?.files[0];if(t){if(t.name.endsWith(".csv"))_c("/transactions"),await this.updateComplete,document.dispatchEvent(new CustomEvent("budgee-import-csv",{detail:{file:t}}));else if(t.name.endsWith(".json")){if(!await _i.show({heading:"Import Database",message:"This will replace all existing data. Are you sure?",confirmLabel:"Import",danger:!0}))return;Rv("Importing database...");try{await Qx(t),window.location.reload()}finally{Av()}}}})}connectedCallback(){super.connectedCallback(),_g(this,Sl,LD).call(this),document.addEventListener("keydown",Tn(this,ld)),this.addEventListener("dragover",Tn(this,ud)),this.addEventListener("dragenter",Tn(this,hd)),this.addEventListener("dragleave",Tn(this,dd)),this.addEventListener("drop",Tn(this,fd)),I4(),Z().then(e=>t2(e)).catch(e=>{console.error(e);const t=e instanceof Xx,n=t?"The database schema is incompatible with this version of the app and can't be opened. You can export the raw data for safekeeping, then delete the database to get unstuck.":e instanceof Error?e.message:String(e);Kg(n,{isDatabaseError:t})}),_g(this,Sl,Xm).call(this)}disconnectedCallback(){var e;super.disconnectedCallback(),document.removeEventListener("keydown",Tn(this,ld)),this.removeEventListener("dragover",Tn(this,ud)),this.removeEventListener("dragenter",Tn(this,hd)),this.removeEventListener("dragleave",Tn(this,dd)),this.removeEventListener("drop",Tn(this,fd)),(e=Tn(this,Ba))==null||e.call(this)}navLink(e,t,n){const i=window.location.pathname,r=e==="/"?i==="/":i.startsWith(e);return E`<a href=${e} class=${rv({active:r})}>${ye(n)} ${t}</a>`}render(){return E`
      <h1 class="app-name">${ye(y2)} Budgee</h1>
      <nav>
        ${this.navLink("/","Dashboard",W4)}
        ${this.navLink("/transactions","Transactions",O2)}
        ${this.navLink("/accounts","Accounts",H4)}
        ${this.navLink("/merchants","Merchants",I2)}
        ${this.navLink("/tags","Tags",q4)}
        ${this.navLink("/rules","Rules",U4)}
        ${this.navLink("/settings","Settings",Y4)}
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
    `}};Ea=new WeakMap;Ba=new WeakMap;Sl=new WeakSet;Xm=async function(){const e=Tn(this,Ba);vf(this,Ba,void 0),await e?.();let t;try{t=localStorage.getItem("budgee-sync-url")}catch{return}if(t)try{vf(this,Ba,await b4(t))}catch(n){console.error("Failed to start replication:",n)}};ld=new WeakMap;LD=function(){try{const e=localStorage.getItem("budgee-theme");e==="light"||e==="dark"?document.documentElement.dataset.theme=e:delete document.documentElement.dataset.theme}catch{}};ud=new WeakMap;hd=new WeakMap;dd=new WeakMap;fd=new WeakMap;Tu.styles=pt`
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
  `;q0([P()],Tu.prototype,"_dragOver",2);q0([P()],Tu.prototype,"_showShortcuts",2);Tu=q0([Et("budgee-app")],Tu);export{nt as A,fp as B,md as C,tu as D,YB as E,Ua as F,qB as G,tx as H,rI as I,Dl as J,Ml as K,QB as L,Ie as M,Ri as N,z$ as O,U as P,Mf as Q,KB as R,Fe as S,_e as T,Q as U,N$ as V,GB as W,pe as a,E as b,Ke as c,Qo as d,Dj as e,Li as f,dp as g,pt as h,mt as i,H as j,Et as k,ke as l,$j as m,_c as n,ZB as o,K4 as p,Fa as q,P as r,Tj as s,Zr as t,Ew as u,JB as v,mB as w,yi as x,qt as y,Ai as z};
