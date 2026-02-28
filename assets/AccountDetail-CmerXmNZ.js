import{B as L,i as B,k as f,T as k,b as o,A as S,l as F,o as O,d as W,p as G,g as K,t as U,h as V,n as Y,r as h,j as q}from"./index-C00rc0lP.js";function $(t){const e=t.match(/^(\d{4,})/);if(!e)return null;const a=e[1],r=Number(a.slice(0,4)),n=Number(a.slice(0,2));return a[0]==="4"?"Visa":n>=51&&n<=55||r>=2221&&r<=2720?"Mastercard":n===34||n===37?"Amex":r===6011||r>=6440&&r<=6499||n===65?"Discover":null}var H=Object.defineProperty,J=Object.getOwnPropertyDescriptor,T=t=>{throw TypeError(t)},p=(t,e,a,r)=>{for(var n=r>1?void 0:r?J(e,a):e,m=t.length-1,s;m>=0;m--)(s=t[m])&&(n=(r?s(e,a,n):s(n))||n);return r&&n&&H(e,a,n),n},_=(t,e,a)=>e.has(t)||T("Cannot "+a),u=(t,e,a)=>(_(t,e,"read from private field"),a?a.call(t):e.get(t)),x=(t,e,a)=>e.has(t)?T("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),w=(t,e,a,r)=>(_(t,e,"write to private field"),e.set(t,a),a),c=(t,e,a)=>(_(t,e,"access private method"),a),g,i,b,C,y,P,v,N,z,M,A,D,E,I,R;let d=class extends L(B){constructor(){super(...arguments),x(this,i),this.accountId="",this._transactions=null,this._editingName=!1,this._timeRange=12,this._currentPage=1,this._pageSize=25,x(this,g,[])}connectedCallback(){super.connectedCallback(),c(this,i,b).call(this);const t=W(()=>c(this,i,b).call(this),300);Promise.all([f.subscribe(t),k.subscribe(t)]).then(e=>{w(this,g,e)})}disconnectedCallback(){super.disconnectedCallback();for(const t of u(this,g))t.unsubscribe();w(this,g,[])}render(){if(!this._account)return o`
        <p>Loading…</p>
      `;const t=u(this,i,y),e=t===null;return o`
      <span class="back-link" @click=${c(this,i,M)}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${this._editingName?o`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${c(this,i,D)}
                @blur=${()=>this._editingName=!1}
              />`:o`<span class="editable" @click=${()=>this._editingName=!0}
                >${this._account.name}</span
              >`}
        </h2>
        <div class="meta">
          Type:
          <select @change=${c(this,i,E)}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${F.map(a=>o`<option value=${a} ?selected=${this._account.type===a}>${O(a)}</option>`)}
          </select>
          ${$(this._account.name)?o` (${$(this._account.name)})`:S}
        </div>
      </div>

      ${e?c(this,i,I).call(this):c(this,i,R).call(this,t)}
    `}};g=new WeakMap;i=new WeakSet;b=async function(){this.accountId&&(this._account=await f.get(this.accountId),c(this,i,C).call(this))};C=async function(){this._transactions=await k.forAccount(this.accountId)};y=function(){if(!this._transactions)return null;if(this._timeRange===0)return this._transactions;const t=new Date;t.setMonth(t.getMonth()-this._timeRange);const e=t.toISOString().slice(0,10);return this._transactions.filter(a=>a.date>=e)};P=function(){const t=new Map;for(const e of this._transactions??[]){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a))};v=function(){const t=new Map;for(const e of u(this,i,y)??[]){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a))};N=function(t){this._timeRange=Number(t.target.value),this._currentPage=1};z=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};M=function(){window.history.pushState({},"","/accounts"),window.dispatchEvent(new PopStateEvent("popstate"))};A=function(t){window.history.pushState({},"",`/transactions/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};D=async function(t){if(t.key!=="Enter")return;const e=t.target;await this.withBusy(async()=>{await f.update(this.accountId,{name:e.value}),this._editingName=!1,await c(this,i,b).call(this)})};E=async function(t){const e=t.target.value;await this.withBusy(async()=>{await f.update(this.accountId,{type:e||void 0}),await c(this,i,b).call(this)})};I=function(){return o`
      <div class="summary-grid">
        ${[0,1,2,3].map(()=>o`
            <div class="summary-card">
              <div class="label loading">Loading…</div>
            </div>
          `)}
      </div>
      <div class="top-row">
        <div class="section"><p class="loading">Loading chart…</p></div>
        <div class="section"><p class="loading">Loading summary…</p></div>
      </div>
      <div class="section-transactions"><p class="loading">Loading transactions…</p></div>
    `};R=function(t){const e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize),r=t.reduce((s,l)=>s+l.amount,0),n=t.filter(s=>s.amount>0).reduce((s,l)=>s+l.amount,0),m=t.filter(s=>s.amount<0).reduce((s,l)=>s+l.amount,0);return o`
      <div class="summary-grid">
        <div class="summary-card">
          <div class="label">Balance</div>
          <div class="value ${r<0?"amount-negative":"amount-positive"}">
            ${r.toFixed(2)}
          </div>
        </div>
        <div class="summary-card">
          <div class="label">Transactions</div>
          <div class="value">${t.length}</div>
        </div>
        <div class="summary-card">
          <div class="label">Income</div>
          <div class="value amount-positive">${n.toFixed(2)}</div>
        </div>
        <div class="summary-card">
          <div class="label">Expenses</div>
          <div class="value amount-negative">${m.toFixed(2)}</div>
        </div>
      </div>

      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <select @change=${c(this,i,N)}>
              <option value="6" ?selected=${this._timeRange===6}>6 months</option>
              <option value="12" ?selected=${this._timeRange===12}>12 months</option>
              <option value="24" ?selected=${this._timeRange===24}>24 months</option>
              <option value="0" ?selected=${this._timeRange===0}>All time</option>
            </select>
          </h3>
          ${u(this,i,v).length>0?o`<chart-wrapper chartType="bar" .data=${G({allEntries:u(this,i,P),displayEntries:u(this,i,v),label:this._account?.name??"Account"})}></chart-wrapper>`:o`
                  <p>No transactions in this period.</p>
                `}
        </div>

        <div class="section">
          <h3>Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${u(this,i,v).map(([s,l])=>o`
                <tr>
                  <td>${s}</td>
                  <td class=${l<0?"amount-negative":"amount-positive"}>
                    ${l.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${u(this,i,v).length===0?o`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:S}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <paginated-table
          .totalItems=${t.length}
          .defaultPageSize=${25}
          storageKey="account-transactions"
          @page-change=${c(this,i,z)}
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
              ${a.map(s=>o`
                <tr @click=${()=>c(this,i,A).call(this,s.id)}>
                  <td>${s.date}</td>
                  <td>${s.originalDescription}</td>
                  <td class=${s.amount<0?"amount-negative":"amount-positive"}>
                    ${s.amount.toFixed(2)}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};d.styles=[K,U,V`
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
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .header h2 {
        margin-top: 0;
        margin-bottom: 0.25rem;
      }
      .meta {
        color: var(--budgee-text-muted);
        font-size: 0.9rem;
      }
      .editable {
        cursor: pointer;
        border-bottom: 1px dashed var(--budgee-text-muted);
      }
      .editable:hover {
        color: var(--budgee-primary);
      }
      .edit-input {
        font-size: inherit;
        font-family: inherit;
        padding: 2px 4px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        color: var(--budgee-text);
      }
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .summary-card {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        text-align: center;
      }
      .summary-card .label {
        color: var(--budgee-text-muted);
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
      }
      .summary-card .value {
        font-size: 1.25rem;
        font-weight: bold;
        font-variant-numeric: tabular-nums;
      }
      .top-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
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
      select {
        padding: 2px 6px;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        background: var(--budgee-surface);
        font-size: 0.875rem;
      }
      tr {
        cursor: pointer;
      }
      tr:hover {
        background-color: var(--budgee-bg);
      }
      .loading {
        color: var(--budgee-text-muted);
        font-style: italic;
      }
    `];p([Y({type:String})],d.prototype,"accountId",2);p([h()],d.prototype,"_account",2);p([h()],d.prototype,"_transactions",2);p([h()],d.prototype,"_editingName",2);p([h()],d.prototype,"_timeRange",2);p([h()],d.prototype,"_currentPage",2);p([h()],d.prototype,"_pageSize",2);d=p([q("account-detail")],d);export{d as AccountDetail};
