import{B as C,i as D,b as o,A as p,T as c,a as _,M as B,m as z,c as g,d as A,e as P,t as E,f as R,n as W,r as l,g as O}from"./index-ChNysiRj.js";var F=Object.defineProperty,L=Object.getOwnPropertyDescriptor,v=a=>{throw TypeError(a)},h=(a,t,e,n)=>{for(var d=n>1?void 0:n?L(t,e):t,u=a.length-1,m;u>=0;u--)(m=a[u])&&(d=(n?m(t,e,d):m(d))||d);return n&&d&&F(t,e,d),d},b=(a,t,e)=>t.has(a)||v("Cannot "+e),G=(a,t,e)=>(b(a,t,"read from private field"),e?e.call(a):t.get(a)),N=(a,t,e)=>t.has(a)?v("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e),r=(a,t,e)=>(b(a,t,"access private method"),e),i,f,y,w,x,$,I,T,S,k,M;let s=class extends C(D){constructor(){super(...arguments),N(this,i),this.transactionId="",this._tags=[],this._relatedTransactions=[],this._monthlySpend=[]}connectedCallback(){super.connectedCallback(),r(this,i,f).call(this)}render(){if(!this._transaction)return o`
        <p>Loading...</p>
      `;const a=this._transaction;return o`
      <span class="back-link" @click=${r(this,i,M)}>&larr; Back to transactions</span>

      <div class="header">
        <h2>${a.originalDescription}</h2>
        <div class="amount ${a.amount<0?"amount-negative":"amount-positive"}">
          ${a.amount.toFixed(2)}
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
          @tag-selected=${r(this,i,x)}
          @tag-created=${r(this,i,$)}
          @tag-removed=${t=>r(this,i,I).call(this,t.detail.tagId)}
        ></tag-autocomplete>
      </div>

      ${a.merchantId?p:o`
            <button class="create-rule" @click=${()=>r(this,i,k).call(this,a)}>
              Create Merchant Rule
            </button>
          `}

      <div class="section">
        <h3>Notes</h3>
        <textarea
          .value=${a.memo??""}
          @blur=${r(this,i,T)}
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
          `:p}

      ${this._monthlySpend.length>0?o`
            <div class="section">
              <h3>Monthly Merchant Spend</h3>
              <chart-wrapper
                chartType="bar"
                .data=${G(this,i,S)}
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
          `:p}
    `}};i=new WeakSet;f=async function(){this.transactionId&&(this._transaction=await c.get(this.transactionId),this._tags=await _.all(),this._transaction?.merchantId&&(this._merchant=await B.get(this._transaction.merchantId)),this._transaction&&(await r(this,i,y).call(this),await r(this,i,w).call(this)))};y=async function(){if(!this._transaction?.merchantId){this._relatedTransactions=[];return}const a=await c.forMerchant(this._transaction.merchantId);this._relatedTransactions=a.filter(t=>t._id!==this._transaction._id).slice(0,10)};w=async function(){if(!this._transaction?.merchantId){this._monthlySpend=[];return}const a=await c.forMerchantAll(this._transaction.merchantId),t=new Map;for(const e of a){const n=e.date.slice(0,7);t.set(n,(t.get(n)??0)+e.amount)}this._monthlySpend=[...t.entries()].sort(([e],[n])=>n.localeCompare(e)).map(([e,n])=>({month:e,total:n}))};x=async function(a){if(!this._transaction)return;const t=a.detail.tag;this._transaction.tagIds.includes(t._id)||await this.withBusy(async()=>{const e=[...this._transaction.tagIds,t._id];await c.update(this._transaction._id,{tagIds:e}),this._transaction={...this._transaction,tagIds:e}})};$=async function(a){this._transaction&&await this.withBusy(async()=>{const t=a.detail.name,e=await _.create(t),n=[...this._transaction.tagIds,e];await c.update(this._transaction._id,{tagIds:n}),this._transaction={...this._transaction,tagIds:n},this._tags=await _.all()})};I=async function(a){this._transaction&&await this.withBusy(async()=>{const t=this._transaction.tagIds.filter(e=>e!==a);await c.update(this._transaction._id,{tagIds:t}),this._transaction={...this._transaction,tagIds:t}})};T=async function(a){this._transaction&&await this.withBusy(async()=>{const t=a.target.value;await c.update(this._transaction._id,{memo:t}),this._transaction={...this._transaction,memo:t}})};S=function(){const a=[...this._monthlySpend].reverse(),t=a.map(n=>n.total),e=z(t.length);return{labels:a.map(n=>n.month),datasets:[{label:this._merchant?.name??"Merchant",data:t,backgroundColor:g("--budgee-primary",.5),borderColor:g("--budgee-primary"),borderWidth:1},...t.length>=2?[{type:"line",label:`Moving Avg (${e}-mo)`,data:A(t,e),borderColor:g("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};k=function(a){const t=new URLSearchParams({description:a.originalDescription});window.history.pushState({},"",`/rules?${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};M=function(){window.history.pushState({},"","/transactions"),window.dispatchEvent(new PopStateEvent("popstate"))};s.styles=[P,E,R`
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
    `];h([W({type:String})],s.prototype,"transactionId",2);h([l()],s.prototype,"_transaction",2);h([l()],s.prototype,"_tags",2);h([l()],s.prototype,"_merchant",2);h([l()],s.prototype,"_relatedTransactions",2);h([l()],s.prototype,"_monthlySpend",2);s=h([O("transaction-detail")],s);export{s as TransactionDetail};
