import{i as k,b as c,A as M,M as P,T as C,t as R,f as T,n as z,r as g,m as D,c as u,d as A,g as I}from"./index-BoI0uVOU.js";var E=Object.defineProperty,O=Object.getOwnPropertyDescriptor,b=t=>{throw TypeError(t)},h=(t,e,a,i)=>{for(var r=i>1?void 0:i?O(e,a):e,s=t.length-1,m;s>=0;s--)(m=t[s])&&(r=(i?m(e,a,r):m(r))||r);return i&&r&&E(e,a,r),r},_=(t,e,a)=>e.has(t)||b("Cannot "+a),d=(t,e,a)=>(_(t,e,"read from private field"),a?a.call(t):e.get(t)),W=(t,e,a)=>e.has(t)?b("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),p=(t,e,a)=>(_(t,e,"access private method"),a),n,f,v,l,y,$,w,S,x;let o=class extends k{constructor(){super(...arguments),W(this,n),this.merchantId="",this._transactions=[],this._timeRange=12,this._currentPage=1,this._pageSize=25}connectedCallback(){super.connectedCallback(),p(this,n,f).call(this)}render(){if(!this._merchant)return c`
        <p>Loading…</p>
      `;const t=d(this,n,v),e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize),i=t.reduce((r,s)=>r+s.amount,0);return c`
      <span class="back-link" @click=${p(this,n,S)}>&larr; Back to merchants</span>

      <div class="header">
        <h2>${this._merchant.name}</h2>
        <div class="meta">
          ${t.length} transactions &middot;
          <span class=${i<0?"amount-negative":"amount-positive"}>
            ${i.toFixed(2)} total
          </span>
        </div>
      </div>

      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Spend
            <select @change=${p(this,n,$)}>
              <option value="6" ?selected=${this._timeRange===6}>6 months</option>
              <option value="12" ?selected=${this._timeRange===12}>12 months</option>
              <option value="24" ?selected=${this._timeRange===24}>24 months</option>
              <option value="0" ?selected=${this._timeRange===0}>All time</option>
            </select>
          </h3>
          ${d(this,n,l).length>0?c`<chart-wrapper chartType="bar" .data=${d(this,n,y)}></chart-wrapper>`:c`
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
              ${d(this,n,l).map(({month:r,total:s})=>c`
                <tr>
                  <td>${r}</td>
                  <td class=${s<0?"amount-negative":"amount-positive"}>
                    ${s.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${d(this,n,l).length===0?c`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:M}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <paginated-table
          .totalItems=${t.length}
          .defaultPageSize=${25}
          storageKey="merchant-transactions"
          @page-change=${p(this,n,w)}
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
              ${a.map(r=>c`
                <tr @click=${()=>p(this,n,x).call(this,r._id)}>
                  <td>${r.date}</td>
                  <td>${r.originalDescription}</td>
                  <td class=${r.amount<0?"amount-negative":"amount-positive"}>
                    ${r.amount.toFixed(2)}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `}};n=new WeakSet;f=async function(){if(!this.merchantId)return;const[t,e]=await Promise.all([P.get(this.merchantId),C.forMerchant(this.merchantId)]);this._merchant=t,this._transactions=e};v=function(){if(this._timeRange===0)return this._transactions;const t=new Date;t.setMonth(t.getMonth()-this._timeRange);const e=t.toISOString().slice(0,10);return this._transactions.filter(a=>a.date>=e)};l=function(){const t=new Map;for(const e of d(this,n,v)){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a)).map(([e,a])=>({month:e,total:a}))};y=function(){const t=d(this,n,l),e=t.map(i=>i.total),a=D(e.length);return{labels:t.map(i=>i.month),datasets:[{label:this._merchant?.name??"Merchant",data:e,backgroundColor:u("--budgee-primary",.5),borderColor:u("--budgee-primary"),borderWidth:1},...e.length>=2?[{type:"line",label:`Moving Avg (${a}-mo)`,data:A(e,a),borderColor:u("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};$=function(t){this._timeRange=Number(t.target.value),this._currentPage=1};w=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};S=function(){window.history.pushState({},"","/merchants"),window.dispatchEvent(new PopStateEvent("popstate"))};x=function(t){window.history.pushState({},"",`/transactions/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};o.styles=[R,T`
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
    `];h([z({type:String})],o.prototype,"merchantId",2);h([g()],o.prototype,"_merchant",2);h([g()],o.prototype,"_transactions",2);h([g()],o.prototype,"_timeRange",2);h([g()],o.prototype,"_currentPage",2);h([g()],o.prototype,"_pageSize",2);o=h([I("merchant-detail")],o);export{o as MerchantDetail};
