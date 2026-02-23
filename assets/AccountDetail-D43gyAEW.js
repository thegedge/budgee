import{B as O,i as W,j as _,T as S,b as r,k as F,l as V,d as G,A as K,f as U,t as Y,g as q,n as H,r as g,m as J,e as Q,c as y,h as X}from"./index-B9_8VI1M.js";var Z=Object.defineProperty,j=Object.getOwnPropertyDescriptor,T=t=>{throw TypeError(t)},h=(t,e,a,d)=>{for(var n=d>1?void 0:d?j(e,a):e,p=t.length-1,i;p>=0;p--)(i=t[p])&&(n=(d?i(e,a,n):i(n))||n);return d&&n&&Z(e,a,n),n},$=(t,e,a)=>e.has(t)||T("Cannot "+a),u=(t,e,a)=>($(t,e,"read from private field"),a?a.call(t):e.get(t)),w=(t,e,a)=>e.has(t)?T("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),k=(t,e,a,d)=>($(t,e,"write to private field"),e.set(t,a),a),o=(t,e,a)=>($(t,e,"access private method"),a),v,s,f,C,x,M,b,P,z,A,I,N,D,E,R,L;let l=class extends O(W){constructor(){super(...arguments),w(this,s),this.accountId="",this._transactions=null,this._editingName=!1,this._timeRange=12,this._currentPage=1,this._pageSize=25,w(this,v,[])}connectedCallback(){super.connectedCallback(),o(this,s,f).call(this);const t=G(()=>o(this,s,f).call(this),300);Promise.all([_.subscribe(t),S.subscribe(t)]).then(e=>{k(this,v,e)})}disconnectedCallback(){super.disconnectedCallback();for(const t of u(this,v))t.unsubscribe();k(this,v,[])}render(){if(!this._account)return r`
        <p>Loading…</p>
      `;const t=u(this,s,x),e=t===null;return r`
      <span class="back-link" @click=${o(this,s,I)}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${this._editingName?r`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${o(this,s,D)}
                @blur=${()=>this._editingName=!1}
              />`:r`<span class="editable" @click=${()=>this._editingName=!0}
                >${this._account.name}</span
              >`}
        </h2>
        <div class="meta">
          Type:
          <select @change=${o(this,s,E)}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${F.map(a=>r`<option value=${a} ?selected=${this._account.type===a}>${V(a)}</option>`)}
          </select>
        </div>
      </div>

      ${e?o(this,s,R).call(this):o(this,s,L).call(this,t)}
    `}};v=new WeakMap;s=new WeakSet;f=async function(){this.accountId&&(this._account=await _.get(this.accountId),o(this,s,C).call(this))};C=async function(){this._transactions=await S.forAccount(this.accountId)};x=function(){if(!this._transactions)return null;if(this._timeRange===0)return this._transactions;const t=new Date;t.setMonth(t.getMonth()-this._timeRange);const e=t.toISOString().slice(0,10);return this._transactions.filter(a=>a.date>=e)};M=function(){const t=new Map;for(const e of this._transactions??[]){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a)).map(([e,a])=>({month:e,total:a}))};b=function(){const t=new Map;for(const e of u(this,s,x)??[]){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a)).map(([e,a])=>({month:e,total:a}))};P=function(){const t=u(this,s,M),e=t.map(m=>m.total),a=J(e.length),d=Q(e,a),n=u(this,s,b),p=n[0]?.month,i=p?t.findIndex(m=>m.month===p):0,c=n.map(m=>m.total),B=d.slice(i,i+n.length);return{labels:n.map(m=>m.month),datasets:[{label:this._account?.name??"Account",data:c,backgroundColor:y("--budgee-primary",.5),borderColor:y("--budgee-primary"),borderWidth:1},...c.length>=2?[{type:"line",label:`Moving Avg (${a}-mo)`,data:B,borderColor:y("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};z=function(t){this._timeRange=Number(t.target.value),this._currentPage=1};A=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};I=function(){window.history.pushState({},"","/accounts"),window.dispatchEvent(new PopStateEvent("popstate"))};N=function(t){window.history.pushState({},"",`/transactions/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};D=async function(t){if(t.key!=="Enter")return;const e=t.target;await this.withBusy(async()=>{await _.update(this.accountId,{name:e.value}),this._editingName=!1,await o(this,s,f).call(this)})};E=async function(t){const e=t.target.value;await this.withBusy(async()=>{await _.update(this.accountId,{type:e||void 0}),await o(this,s,f).call(this)})};R=function(){return r`
      <div class="summary-grid">
        ${[0,1,2,3].map(()=>r`
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
    `};L=function(t){const e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize),d=t.reduce((i,c)=>i+c.amount,0),n=t.filter(i=>i.amount>0).reduce((i,c)=>i+c.amount,0),p=t.filter(i=>i.amount<0).reduce((i,c)=>i+c.amount,0);return r`
      <div class="summary-grid">
        <div class="summary-card">
          <div class="label">Balance</div>
          <div class="value ${d<0?"amount-negative":"amount-positive"}">
            ${d.toFixed(2)}
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
          <div class="value amount-negative">${p.toFixed(2)}</div>
        </div>
      </div>

      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <select @change=${o(this,s,z)}>
              <option value="6" ?selected=${this._timeRange===6}>6 months</option>
              <option value="12" ?selected=${this._timeRange===12}>12 months</option>
              <option value="24" ?selected=${this._timeRange===24}>24 months</option>
              <option value="0" ?selected=${this._timeRange===0}>All time</option>
            </select>
          </h3>
          ${u(this,s,b).length>0?r`<chart-wrapper chartType="bar" .data=${u(this,s,P)}></chart-wrapper>`:r`
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
              ${u(this,s,b).map(({month:i,total:c})=>r`
                <tr>
                  <td>${i}</td>
                  <td class=${c<0?"amount-negative":"amount-positive"}>
                    ${c.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${u(this,s,b).length===0?r`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:K}
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
          @page-change=${o(this,s,A)}
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
              ${a.map(i=>r`
                <tr @click=${()=>o(this,s,N).call(this,i.id)}>
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
    `};l.styles=[U,Y,q`
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
    `];h([H({type:String})],l.prototype,"accountId",2);h([g()],l.prototype,"_account",2);h([g()],l.prototype,"_transactions",2);h([g()],l.prototype,"_editingName",2);h([g()],l.prototype,"_timeRange",2);h([g()],l.prototype,"_currentPage",2);h([g()],l.prototype,"_pageSize",2);l=h([X("account-detail")],l);export{l as AccountDetail};
