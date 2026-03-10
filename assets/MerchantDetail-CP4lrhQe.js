import{i as D,D as R,M as f,T as b,b as s,s as C,f as T,n as v,j as E,k as I,r as h,u as P,v as O,l as z}from"./index-E45YVAoJ.js";var A=Object.defineProperty,B=Object.getOwnPropertyDescriptor,y=e=>{throw TypeError(e)},c=(e,t,a,m)=>{for(var i=m>1?void 0:m?B(t,a):t,l=e.length-1,p;l>=0;l--)(p=e[l])&&(i=(m?p(t,a,i):p(i))||i);return m&&i&&A(t,a,i),i},k=(e,t,a)=>t.has(e)||y("Cannot "+a),d=(e,t,a)=>(k(e,t,"read from private field"),a?a.call(e):t.get(e)),q=(e,t,a)=>t.has(e)?y("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),o=(e,t,a)=>(k(e,t,"access private method"),a),n,u,_,$,g,w,N,x,S,M;let r=class extends D{constructor(){super(),q(this,n),this.merchantId="",this._transactions=[],this._timeRange=null,this._editingName=!1,this._draftName="",new R(this,[f.subscribe,b.subscribe],()=>o(this,n,u).call(this))}updated(e){if(super.updated(e),e.has("merchantId")&&o(this,n,u).call(this),e.has("_editingName")&&this._editingName){const t=this.shadowRoot?.querySelector(".name-input");t?.focus(),t?.select()}}render(){if(!this._merchant)return s`
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;const e=d(this,n,_);return s`
      <span class="back-link" @click=${o(this,n,S)}>&larr; Back to merchants</span>

      <div class="header">
        <h2>
          ${this._editingName?s`<input
                class="name-input"
                .value=${this._draftName}
                @input=${t=>{this._draftName=t.target.value}}
                @keydown=${o(this,n,x)}
              />`:s`${this._merchant.name} <button class="edit-name-btn" @click=${o(this,n,N)}>✎</button>`}
        </h2>
      </div>

      <div class="section">
        <h3>
          Monthly Spend
          <time-range-picker .value=${this._timeRange} @time-range-change=${o(this,n,w)}></time-range-picker>
        </h3>
        ${d(this,n,g).length>0?s`<chart-wrapper chartType="bar" .data=${C({allEntries:d(this,n,$),displayEntries:d(this,n,g),label:this._merchant?.name??"Merchant"})}></chart-wrapper>`:s`
                <p>No transactions in this period.</p>
              `}
      </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <paginated-table
          .items=${e}
          .defaultPageSize=${25}
          storageKey="merchant-transactions"
          .columns=${["Date","Description","Amount"]}
          .renderRow=${t=>s`
            <tr @click=${()=>o(this,n,M).call(this,t.id)}>
              <td>${t.date}</td>
              <td>${t.description}</td>
              <td class=${t.amount<0?"amount-negative":"amount-positive"}>
                ${T(t.amount)}
              </td>
            </tr>
          `}
        ></paginated-table>
      </div>
    `}};n=new WeakSet;u=async function(){if(!this.merchantId)return;const[e,t]=await Promise.all([f.get(this.merchantId),b.forMerchant(this.merchantId)]);this._merchant=e,this._transactions=t};_=function(){if(this._timeRange===null)return this._transactions;const e=P.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(t=>t.date>=e)};$=function(){const e=new Map;for(const t of this._transactions){const a=t.date.slice(0,7);e.set(a,(e.get(a)??0)+t.amount)}return[...e.entries()].sort(([t],[a])=>t.localeCompare(a))};g=function(){return[...O(d(this,n,_),"month").entries()].sort(([e],[t])=>e.localeCompare(t))};w=function(e){this._timeRange=e.timeRange};N=function(){this._editingName=!0,this._draftName=this._merchant?.name??""};x=function(e){if(e.key==="Enter"){const t=this._draftName.trim();t&&this._merchant&&f.update(this._merchant.id,{name:t}),this._editingName=!1}else e.key==="Escape"&&(this._editingName=!1)};S=function(){v("/merchants")};M=function(e){v(`/transactions/${e}`)};r.styles=[E`
      :host {
        display: block;
      }
      .back-link {
        color: var(--budgee-primary);
        cursor: pointer;
        text-decoration: underline;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: inline-block;
      }
      .header {
        margin-bottom: 1rem;
      }
      .header h2 {
        margin-top: 0;
        margin-bottom: 0;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }
      .section chart-wrapper {
        flex: 1;
        min-height: 200px;
      }
      .section h3 {
        margin-top: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .section-transactions {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        margin-bottom: 1rem;
      }
      .section-transactions h3 {
        margin-top: 0;
      }
      time-range-picker {
        margin-left: 0.75rem;
      }
      .edit-name-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.75em;
        opacity: 0.5;
        padding: 0 0.25em;
      }
      .edit-name-btn:hover {
        opacity: 1;
      }
      .name-input {
        font: inherit;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        padding: 0 0.25em;
        width: 100%;
        box-sizing: border-box;
      }
      tr {
        cursor: pointer;
      }
      tr:hover {
        background-color: var(--budgee-bg);
      }
    `];c([I({type:String})],r.prototype,"merchantId",2);c([h()],r.prototype,"_merchant",2);c([h()],r.prototype,"_transactions",2);c([h()],r.prototype,"_timeRange",2);c([h()],r.prototype,"_editingName",2);c([h()],r.prototype,"_draftName",2);r=c([z("merchant-detail")],r);export{r as MerchantDetail};
