import{B as W,i as O,T as c,a as m,M as I,b as o,A as p,f as b,d as E,m as L,c as f,e as G,n as k,g as N,h as U,t as V,j as q,k as F,r as u,l as H}from"./index-B9pduy55.js";var J=Object.defineProperty,K=Object.getOwnPropertyDescriptor,T=a=>{throw TypeError(a)},h=(a,t,e,n)=>{for(var d=n>1?void 0:n?K(t,e):t,g=a.length-1,_;g>=0;g--)(_=a[g])&&(d=(n?_(t,e,d):_(d))||d);return n&&d&&J(t,e,d),d},y=(a,t,e)=>t.has(a)||T("Cannot "+e),w=(a,t,e)=>(y(a,t,"read from private field"),e?e.call(a):t.get(a)),$=(a,t,e)=>t.has(a)?T("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e),x=(a,t,e,n)=>(y(a,t,"write to private field"),t.set(a,e),e),i=(a,t,e)=>(y(a,t,"access private method"),e),l,s,v,S,M,C,z,B,D,A,P,R;let r=class extends W(O){constructor(){super(...arguments),$(this,s),this.transactionId="",this._tags=[],this._relatedTransactions=[],this._monthlySpend=[],$(this,l,[])}connectedCallback(){super.connectedCallback(),i(this,s,v).call(this);const a=E(()=>i(this,s,v).call(this),300);Promise.all([c.subscribe(a),m.subscribe(a),I.subscribe(a)]).then(t=>{x(this,l,t)})}disconnectedCallback(){super.disconnectedCallback();for(const a of w(this,l))a.unsubscribe();x(this,l,[])}render(){if(!this._transaction)return o`
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="text" rows="4"></budgee-skeleton>
      `;const a=this._transaction;return o`
      <span class="back-link" @click=${i(this,s,R)}>&larr; Back to transactions</span>

      <div class="header">
        <h2>${a.description}</h2>
        <div class="amount ${a.amount<0?"amount-negative":"amount-positive"}">
          ${b(a.amount)}
        </div>
        <div class="meta">
          ${a.date}${this._merchant?o` &middot; ${this._merchant.name}`:p}
        </div>
      </div>

      <div class="section">
        <h3>Tags</h3>
        <tag-autocomplete
          .tags=${this._tags}
          .selectedTagIds=${a.tagIds}
          @tag-selected=${i(this,s,C)}
          @tag-created=${i(this,s,z)}
          @tag-removed=${t=>i(this,s,B).call(this,t.detail.tagId)}
        ></tag-autocomplete>
      </div>

      ${a.merchantId?p:o`
            <button class="create-rule" @click=${()=>i(this,s,P).call(this,a)}>
              Create Merchant Rule
            </button>
          `}

      <div class="section">
        <h3>Notes</h3>
        <textarea
          .value=${a.memo??""}
          @blur=${i(this,s,D)}
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
                      <td>${t.description}</td>
                      <td class="col-amount ${t.amount<0?"amount-negative":"amount-positive"}">
                        ${b(t.amount)}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `:p}

      ${this._monthlySpend.length>0?o`
            <div class="section">
              <h3>Monthly Merchant Spend</h3>
              <chart-wrapper
                chartType="bar"
                .data=${w(this,s,A)}
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
                        ${b(e)}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `:p}
    `}};l=new WeakMap;s=new WeakSet;v=async function(){this.transactionId&&(this._transaction=await c.get(this.transactionId),this._tags=await m.all(),this._transaction?.merchantId&&(this._merchant=await I.get(this._transaction.merchantId)),this._transaction&&(await i(this,s,S).call(this),await i(this,s,M).call(this)))};S=async function(){if(!this._transaction?.merchantId){this._relatedTransactions=[];return}const a=await c.forMerchant(this._transaction.merchantId);this._relatedTransactions=a.filter(t=>t.id!==this._transaction.id).slice(0,10)};M=async function(){if(!this._transaction?.merchantId){this._monthlySpend=[];return}const a=await c.forMerchant(this._transaction.merchantId),t=new Map;for(const e of a){const n=e.date.slice(0,7);t.set(n,(t.get(n)??0)+e.amount)}this._monthlySpend=[...t.entries()].sort(([e],[n])=>n.localeCompare(e)).map(([e,n])=>({month:e,total:n}))};C=async function(a){if(!this._transaction)return;const t=a.detail.tag;this._transaction.tagIds.includes(t.id)||await this.withBusy(async()=>{const e=[...this._transaction.tagIds,t.id];await c.update(this._transaction.id,{tagIds:e}),this._transaction={...this._transaction,tagIds:e}})};z=async function(a){this._transaction&&await this.withBusy(async()=>{const t=a.detail.name,e=await m.create(t),n=[...this._transaction.tagIds,e.id];await c.update(this._transaction.id,{tagIds:n}),this._transaction={...this._transaction,tagIds:n},this._tags=await m.all()})};B=async function(a){this._transaction&&await this.withBusy(async()=>{const t=this._transaction.tagIds.filter(e=>e!==a);await c.update(this._transaction.id,{tagIds:t}),this._transaction={...this._transaction,tagIds:t}})};D=async function(a){this._transaction&&await this.withBusy(async()=>{const t=a.target.value;await c.update(this._transaction.id,{memo:t}),this._transaction={...this._transaction,memo:t}})};A=function(){const a=[...this._monthlySpend].reverse(),t=a.map(n=>n.total),e=L(t.length);return{labels:a.map(n=>n.month),datasets:[{label:this._merchant?.name??"Merchant",data:t,backgroundColor:f("--budgee-primary",.5),borderColor:f("--budgee-primary"),borderWidth:1},...t.length>=2?[{type:"line",label:`Moving Avg (${e}-mo)`,data:G(t,e),borderColor:f("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};P=function(a){const t=new URLSearchParams({description:a.description});k(`/rules?${t}`)};R=function(){k("/transactions")};r.styles=[N,U,V,q`
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
        text-decoration: none;
        font-size: 0.9rem;
      }
      .back-link {
        color: var(--budgee-primary);
        cursor: pointer;
        text-decoration: underline;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: inline-block;
      }
    `];h([F({type:String})],r.prototype,"transactionId",2);h([u()],r.prototype,"_transaction",2);h([u()],r.prototype,"_tags",2);h([u()],r.prototype,"_merchant",2);h([u()],r.prototype,"_relatedTransactions",2);h([u()],r.prototype,"_monthlySpend",2);r=h([H("transaction-detail")],r);export{r as TransactionDetail};
