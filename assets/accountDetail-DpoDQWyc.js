import{B as E,i as L,j as f,T as k,b as o,k as B,l as O,d as W,A as F,f as G,t as K,g as U,n as V,r as h,m as Y,c as _,e as q,h as H}from"./index-B1dGPar4.js";var J=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,S=t=>{throw TypeError(t)},p=(t,e,a,r)=>{for(var d=r>1?void 0:r?Q(e,a):e,g=t.length-1,s;g>=0;g--)(s=t[g])&&(d=(r?s(e,a,d):s(d))||d);return r&&d&&J(e,a,d),d},y=(t,e,a)=>e.has(t)||S("Cannot "+a),u=(t,e,a)=>(y(t,e,"read from private field"),a?a.call(t):e.get(t)),w=(t,e,a)=>e.has(t)?S("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),x=(t,e,a,r)=>(y(t,e,"write to private field"),e.set(t,a),a),n=(t,e,a)=>(y(t,e,"access private method"),a),m,i,b,T,$,v,C,P,A,z,N,R,D,I,M;let c=class extends E(L){constructor(){super(...arguments),w(this,i),this.accountId="",this._transactions=null,this._editingName=!1,this._timeRange=12,this._currentPage=1,this._pageSize=25,w(this,m,[])}connectedCallback(){super.connectedCallback(),n(this,i,b).call(this);const t=W(()=>n(this,i,b).call(this),300);Promise.all([f.subscribe(t),k.subscribe(t)]).then(e=>{x(this,m,e)})}disconnectedCallback(){super.disconnectedCallback();for(const t of u(this,m))t.unsubscribe();x(this,m,[])}render(){if(!this._account)return o`
        <p>Loading…</p>
      `;const t=u(this,i,$),e=t===null;return o`
      <span class="back-link" @click=${n(this,i,z)}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${this._editingName?o`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${n(this,i,R)}
                @blur=${()=>this._editingName=!1}
              />`:o`<span class="editable" @click=${()=>this._editingName=!0}
                >${this._account.name}</span
              >`}
        </h2>
        <div class="meta">
          Type:
          <select @change=${n(this,i,D)}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${B.map(a=>o`<option value=${a} ?selected=${this._account.type===a}>${O(a)}</option>`)}
          </select>
        </div>
      </div>

      ${e?n(this,i,I).call(this):n(this,i,M).call(this,t)}
    `}};m=new WeakMap;i=new WeakSet;b=async function(){this.accountId&&(this._account=await f.get(this.accountId),n(this,i,T).call(this))};T=async function(){this._transactions=await k.forAccount(this.accountId)};$=function(){if(!this._transactions)return null;if(this._timeRange===0)return this._transactions;const t=new Date;t.setMonth(t.getMonth()-this._timeRange);const e=t.toISOString().slice(0,10);return this._transactions.filter(a=>a.date>=e)};v=function(){const t=new Map;for(const e of u(this,i,$)??[]){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a)).map(([e,a])=>({month:e,total:a}))};C=function(){const t=u(this,i,v),e=t.map(r=>r.total),a=Y(e.length);return{labels:t.map(r=>r.month),datasets:[{label:this._account?.name??"Account",data:e,backgroundColor:_("--budgee-primary",.5),borderColor:_("--budgee-primary"),borderWidth:1},...e.length>=2?[{type:"line",label:`Moving Avg (${a}-mo)`,data:q(e,a),borderColor:_("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};P=function(t){this._timeRange=Number(t.target.value),this._currentPage=1};A=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};z=function(){window.history.pushState({},"","/accounts"),window.dispatchEvent(new PopStateEvent("popstate"))};N=function(t){window.history.pushState({},"",`/transactions/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};R=async function(t){if(t.key!=="Enter")return;const e=t.target;await this.withBusy(async()=>{await f.update(this.accountId,{name:e.value}),this._editingName=!1,await n(this,i,b).call(this)})};D=async function(t){const e=t.target.value;await this.withBusy(async()=>{await f.update(this.accountId,{type:e||void 0}),await n(this,i,b).call(this)})};I=function(){return o`
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
    `};M=function(t){const e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize),r=t.reduce((s,l)=>s+l.amount,0),d=t.filter(s=>s.amount>0).reduce((s,l)=>s+l.amount,0),g=t.filter(s=>s.amount<0).reduce((s,l)=>s+l.amount,0);return o`
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
            <select @change=${n(this,i,P)}>
              <option value="6" ?selected=${this._timeRange===6}>6 months</option>
              <option value="12" ?selected=${this._timeRange===12}>12 months</option>
              <option value="24" ?selected=${this._timeRange===24}>24 months</option>
              <option value="0" ?selected=${this._timeRange===0}>All time</option>
            </select>
          </h3>
          ${u(this,i,v).length>0?o`<chart-wrapper chartType="bar" .data=${u(this,i,C)}></chart-wrapper>`:o`
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
              ${u(this,i,v).map(({month:s,total:l})=>o`
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
                    `:F}
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
          @page-change=${n(this,i,A)}
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
                <tr @click=${()=>n(this,i,N).call(this,s.id)}>
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
    `};c.styles=[G,K,U`
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
    `];p([V({type:String})],c.prototype,"accountId",2);p([h()],c.prototype,"_account",2);p([h()],c.prototype,"_transactions",2);p([h()],c.prototype,"_editingName",2);p([h()],c.prototype,"_timeRange",2);p([h()],c.prototype,"_currentPage",2);p([h()],c.prototype,"_pageSize",2);c=p([H("account-detail")],c);export{c as AccountDetail};
