import{B as R,i as D,b as s,h as I,j as E,k as f,T as M,A as B,e as L,t as O,f as F,n as W,r as h,g as G,m as K,c as b,d as U}from"./index-CMV05wXu.js";var V=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,y=t=>{throw TypeError(t)},u=(t,a,e,r)=>{for(var d=r>1?void 0:r?Y(a,e):a,g=t.length-1,i;g>=0;g--)(i=t[g])&&(d=(r?i(a,e,d):i(d))||d);return r&&d&&V(a,e,d),d},$=(t,a,e)=>a.has(t)||y("Cannot "+e),p=(t,a,e)=>($(t,a,"read from private field"),e?e.call(t):a.get(t)),q=(t,a,e)=>a.has(t)?y("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,e),o=(t,a,e)=>($(t,a,"access private method"),e),n,v,x,_,m,w,k,S,T,C,A,P,z,N;let c=class extends R(D){constructor(){super(...arguments),q(this,n),this.accountId="",this._transactions=null,this._editingName=!1,this._timeRange=12,this._currentPage=1,this._pageSize=25}connectedCallback(){super.connectedCallback(),o(this,n,v).call(this)}render(){if(!this._account)return s`
        <p>Loading…</p>
      `;const t=p(this,n,_),a=t===null;return s`
      <span class="back-link" @click=${o(this,n,T)}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${this._editingName?s`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${o(this,n,A)}
                @blur=${()=>this._editingName=!1}
              />`:s`<span class="editable" @click=${()=>this._editingName=!0}
                >${this._account.name}</span
              >`}
        </h2>
        <div class="meta">
          Type:
          <select @change=${o(this,n,P)}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${I.map(e=>s`<option value=${e} ?selected=${this._account.type===e}>${E(e)}</option>`)}
          </select>
        </div>
      </div>

      ${a?o(this,n,z).call(this):o(this,n,N).call(this,t)}
    `}};n=new WeakSet;v=async function(){this.accountId&&(this._account=await f.get(this.accountId),o(this,n,x).call(this))};x=async function(){this._transactions=await M.forAccount(this.accountId)};_=function(){if(!this._transactions)return null;if(this._timeRange===0)return this._transactions;const t=new Date;t.setMonth(t.getMonth()-this._timeRange);const a=t.toISOString().slice(0,10);return this._transactions.filter(e=>e.date>=a)};m=function(){const t=new Map;for(const a of p(this,n,_)??[]){const e=a.date.slice(0,7);t.set(e,(t.get(e)??0)+a.amount)}return[...t.entries()].sort(([a],[e])=>a.localeCompare(e)).map(([a,e])=>({month:a,total:e}))};w=function(){const t=p(this,n,m),a=t.map(r=>r.total),e=K(a.length);return{labels:t.map(r=>r.month),datasets:[{label:this._account?.name??"Account",data:a,backgroundColor:b("--budgee-primary",.5),borderColor:b("--budgee-primary"),borderWidth:1},...a.length>=2?[{type:"line",label:`Moving Avg (${e}-mo)`,data:U(a,e),borderColor:b("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};k=function(t){this._timeRange=Number(t.target.value),this._currentPage=1};S=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};T=function(){window.history.pushState({},"","/accounts"),window.dispatchEvent(new PopStateEvent("popstate"))};C=function(t){window.history.pushState({},"",`/transactions/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};A=async function(t){if(t.key!=="Enter")return;const a=t.target;await this.withBusy(async()=>{await f.update(this.accountId,{name:a.value}),this._editingName=!1,await o(this,n,v).call(this)})};P=async function(t){const a=t.target.value;await this.withBusy(async()=>{await f.update(this.accountId,{type:a||void 0}),await o(this,n,v).call(this)})};z=function(){return s`
      <div class="summary-grid">
        ${[0,1,2,3].map(()=>s`
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
    `};N=function(t){const a=(this._currentPage-1)*this._pageSize,e=t.slice(a,a+this._pageSize),r=t.reduce((i,l)=>i+l.amount,0),d=t.filter(i=>i.amount>0).reduce((i,l)=>i+l.amount,0),g=t.filter(i=>i.amount<0).reduce((i,l)=>i+l.amount,0);return s`
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
          <div class="value amount-positive">${d.toFixed(2)}</div>
        </div>
        <div class="summary-card">
          <div class="label">Expenses</div>
          <div class="value amount-negative">${g.toFixed(2)}</div>
        </div>
      </div>

      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <select @change=${o(this,n,k)}>
              <option value="6" ?selected=${this._timeRange===6}>6 months</option>
              <option value="12" ?selected=${this._timeRange===12}>12 months</option>
              <option value="24" ?selected=${this._timeRange===24}>24 months</option>
              <option value="0" ?selected=${this._timeRange===0}>All time</option>
            </select>
          </h3>
          ${p(this,n,m).length>0?s`<chart-wrapper chartType="bar" .data=${p(this,n,w)}></chart-wrapper>`:s`
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
              ${p(this,n,m).map(({month:i,total:l})=>s`
                <tr>
                  <td>${i}</td>
                  <td class=${l<0?"amount-negative":"amount-positive"}>
                    ${l.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${p(this,n,m).length===0?s`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:B}
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
          @page-change=${o(this,n,S)}
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
              ${e.map(i=>s`
                <tr @click=${()=>o(this,n,C).call(this,i.id)}>
                  <td>${i.date}</td>
                  <td>${i.originalDescription}</td>
                  <td class=${i.amount<0?"amount-negative":"amount-positive"}>
                    ${i.amount.toFixed(2)}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};c.styles=[L,O,F`
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
    `];u([W({type:String})],c.prototype,"accountId",2);u([h()],c.prototype,"_account",2);u([h()],c.prototype,"_transactions",2);u([h()],c.prototype,"_editingName",2);u([h()],c.prototype,"_timeRange",2);u([h()],c.prototype,"_currentPage",2);u([h()],c.prototype,"_pageSize",2);c=u([G("account-detail")],c);export{c as AccountDetail};
