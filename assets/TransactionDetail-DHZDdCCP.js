import{B as E,i as R,T as c,a as m,M as $,b as o,A as u,d as W,m as A,c as b,e as O,f as F,t as L,g as G,n as N,r as p,h as U}from"./index-B9_8VI1M.js";var V=Object.defineProperty,q=Object.getOwnPropertyDescriptor,I=a=>{throw TypeError(a)},h=(a,t,e,n)=>{for(var d=n>1?void 0:n?q(t,e):t,g=a.length-1,_;g>=0;g--)(_=a[g])&&(d=(n?_(t,e,d):_(d))||d);return n&&d&&V(t,e,d),d},f=(a,t,e)=>t.has(a)||I("Cannot "+e),y=(a,t,e)=>(f(a,t,"read from private field"),e?e.call(a):t.get(a)),w=(a,t,e)=>t.has(a)?I("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e),x=(a,t,e,n)=>(f(a,t,"write to private field"),t.set(a,e),e),s=(a,t,e)=>(f(a,t,"access private method"),e),l,i,v,T,S,k,M,C,D,z,B,P;let r=class extends E(R){constructor(){super(...arguments),w(this,i),this.transactionId="",this._tags=[],this._relatedTransactions=[],this._monthlySpend=[],w(this,l,[])}connectedCallback(){super.connectedCallback(),s(this,i,v).call(this);const a=W(()=>s(this,i,v).call(this),300);Promise.all([c.subscribe(a),m.subscribe(a),$.subscribe(a)]).then(t=>{x(this,l,t)})}disconnectedCallback(){super.disconnectedCallback();for(const a of y(this,l))a.unsubscribe();x(this,l,[])}render(){if(!this._transaction)return o`
        <p>Loading...</p>
      `;const a=this._transaction;return o`
      <span class="back-link" @click=${s(this,i,P)}>&larr; Back to transactions</span>

      <div class="header">
        <h2>${a.originalDescription}</h2>
        <div class="amount ${a.amount<0?"amount-negative":"amount-positive"}">
          ${a.amount.toFixed(2)}
        </div>
        <div class="meta">
          ${a.date}${this._merchant?o` &middot; ${this._merchant.name}`:u}
        </div>
      </div>

      <div class="section">
        <h3>Tags</h3>
        <tag-autocomplete
          .tags=${this._tags}
          .selectedTagIds=${a.tagIds}
          @tag-selected=${s(this,i,k)}
          @tag-created=${s(this,i,M)}
          @tag-removed=${t=>s(this,i,C).call(this,t.detail.tagId)}
        ></tag-autocomplete>
      </div>

      ${a.merchantId?u:o`
            <button class="create-rule" @click=${()=>s(this,i,B).call(this,a)}>
              Create Merchant Rule
            </button>
          `}

      <div class="section">
        <h3>Notes</h3>
        <textarea
          .value=${a.memo??""}
          @blur=${s(this,i,D)}
          placeholder="Add notes..."
        ></textarea>
      </div>

      ${this._relatedTransactions.length>0?o`
            <div class="section">
              <h3>Related Transactions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th class="col-amount">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._relatedTransactions.map(t=>o`
                    <tr>
                      <td>${t.date}</td>
                      <td>${t.originalDescription}</td>
                      <td class="col-amount ${t.amount<0?"amount-negative":"amount-positive"}">
                        ${t.amount.toFixed(2)}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `:u}

      ${this._monthlySpend.length>0?o`
            <div class="section">
              <h3>Monthly Merchant Spend</h3>
              <chart-wrapper
                chartType="bar"
                .data=${y(this,i,z)}
              ></chart-wrapper>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th class="col-amount">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._monthlySpend.map(({month:t,total:e})=>o`
                    <tr>
                      <td>${t}</td>
                      <td class="col-amount ${e<0?"amount-negative":"amount-positive"}">
                        ${e.toFixed(2)}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `:u}
    `}};l=new WeakMap;i=new WeakSet;v=async function(){this.transactionId&&(this._transaction=await c.get(this.transactionId),this._tags=await m.all(),this._transaction?.merchantId&&(this._merchant=await $.get(this._transaction.merchantId)),this._transaction&&(await s(this,i,T).call(this),await s(this,i,S).call(this)))};T=async function(){if(!this._transaction?.merchantId){this._relatedTransactions=[];return}const a=await c.forMerchant(this._transaction.merchantId);this._relatedTransactions=a.filter(t=>t.id!==this._transaction.id).slice(0,10)};S=async function(){if(!this._transaction?.merchantId){this._monthlySpend=[];return}const a=await c.forMerchant(this._transaction.merchantId),t=new Map;for(const e of a){const n=e.date.slice(0,7);t.set(n,(t.get(n)??0)+e.amount)}this._monthlySpend=[...t.entries()].sort(([e],[n])=>n.localeCompare(e)).map(([e,n])=>({month:e,total:n}))};k=async function(a){if(!this._transaction)return;const t=a.detail.tag;this._transaction.tagIds.includes(t.id)||await this.withBusy(async()=>{const e=[...this._transaction.tagIds,t.id];await c.update(this._transaction.id,{tagIds:e}),this._transaction={...this._transaction,tagIds:e}})};M=async function(a){this._transaction&&await this.withBusy(async()=>{const t=a.detail.name,e=await m.create(t),n=[...this._transaction.tagIds,e];await c.update(this._transaction.id,{tagIds:n}),this._transaction={...this._transaction,tagIds:n},this._tags=await m.all()})};C=async function(a){this._transaction&&await this.withBusy(async()=>{const t=this._transaction.tagIds.filter(e=>e!==a);await c.update(this._transaction.id,{tagIds:t}),this._transaction={...this._transaction,tagIds:t}})};D=async function(a){this._transaction&&await this.withBusy(async()=>{const t=a.target.value;await c.update(this._transaction.id,{memo:t}),this._transaction={...this._transaction,memo:t}})};z=function(){const a=[...this._monthlySpend].reverse(),t=a.map(n=>n.total),e=A(t.length);return{labels:a.map(n=>n.month),datasets:[{label:this._merchant?.name??"Merchant",data:t,backgroundColor:b("--budgee-primary",.5),borderColor:b("--budgee-primary"),borderWidth:1},...t.length>=2?[{type:"line",label:`Moving Avg (${e}-mo)`,data:O(t,e),borderColor:b("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};B=function(a){const t=new URLSearchParams({description:a.originalDescription});window.history.pushState({},"",`/rules?${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};P=function(){window.history.pushState({},"","/Transactions"),window.dispatchEvent(new PopStateEvent("popstate"))};r.styles=[F,L,G`
      :host {
        display: block;
      }
      .header {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .header h2 {
        margin-top: 0;
      }
      .amount {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .meta {
        color: var(--budgee-text-muted);
        font-size: 0.9rem;
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
      .tag-badge {
        display: inline-block;
        background: var(--budgee-primary);
        color: white;
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 0.8rem;
        margin-right: 4px;
        cursor: pointer;
      }
      .tags-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      textarea {
        width: 100%;
        min-height: 60px;
        padding: 8px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        font-family: inherit;
        font-size: 0.9rem;
        resize: vertical;
        box-sizing: border-box;
      }
      .create-rule {
        display: inline-block;
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
        text-decoration: none;
        font-size: 0.9rem;
      }
      .create-rule:hover {
        background-color: var(--budgee-primary-hover);
      }
      .back-link {
        color: var(--budgee-primary);
        cursor: pointer;
        text-decoration: underline;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: inline-block;
      }
    `];h([N({type:String})],r.prototype,"transactionId",2);h([p()],r.prototype,"_transaction",2);h([p()],r.prototype,"_tags",2);h([p()],r.prototype,"_merchant",2);h([p()],r.prototype,"_relatedTransactions",2);h([p()],r.prototype,"_monthlySpend",2);r=h([U("transaction-detail")],r);export{r as TransactionDetail};
