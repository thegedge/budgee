import{i as T,M as w,T as S,b as d,A as z,d as D,m as A,c as b,e as I,t as E,g as W,n as O,r as m,h as F}from"./index-B1dGPar4.js";var N=Object.defineProperty,B=Object.getOwnPropertyDescriptor,x=t=>{throw TypeError(t)},h=(t,e,a,i)=>{for(var r=i>1?void 0:i?B(e,a):e,o=t.length-1,u;o>=0;o--)(u=t[o])&&(r=(i?u(e,a,r):u(r))||r);return i&&r&&N(e,a,r),r},_=(t,e,a)=>e.has(t)||x("Cannot "+a),c=(t,e,a)=>(_(t,e,"read from private field"),a?a.call(t):e.get(t)),y=(t,e,a)=>e.has(t)?x("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),$=(t,e,a,i)=>(_(t,e,"write to private field"),e.set(t,a),a),p=(t,e,a)=>(_(t,e,"access private method"),a),l,n,v,f,g,k,M,P,C,R;let s=class extends T{constructor(){super(...arguments),y(this,n),this.merchantId="",this._transactions=[],this._timeRange=12,this._currentPage=1,this._pageSize=25,y(this,l,[])}connectedCallback(){super.connectedCallback(),p(this,n,v).call(this);const t=D(()=>p(this,n,v).call(this),300);Promise.all([w.subscribe(t),S.subscribe(t)]).then(e=>{$(this,l,e)})}disconnectedCallback(){super.disconnectedCallback();for(const t of c(this,l))t.unsubscribe();$(this,l,[])}render(){if(!this._merchant)return d`
        <p>Loading…</p>
      `;const t=c(this,n,f),e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize),i=t.reduce((r,o)=>r+o.amount,0);return d`
      <span class="back-link" @click=${p(this,n,C)}>&larr; Back to merchants</span>

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
            <select @change=${p(this,n,M)}>
              <option value="6" ?selected=${this._timeRange===6}>6 months</option>
              <option value="12" ?selected=${this._timeRange===12}>12 months</option>
              <option value="24" ?selected=${this._timeRange===24}>24 months</option>
              <option value="0" ?selected=${this._timeRange===0}>All time</option>
            </select>
          </h3>
          ${c(this,n,g).length>0?d`<chart-wrapper chartType="bar" .data=${c(this,n,k)}></chart-wrapper>`:d`
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
              ${c(this,n,g).map(({month:r,total:o})=>d`
                <tr>
                  <td>${r}</td>
                  <td class=${o<0?"amount-negative":"amount-positive"}>
                    ${o.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${c(this,n,g).length===0?d`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:z}
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
          @page-change=${p(this,n,P)}
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
              ${a.map(r=>d`
                <tr @click=${()=>p(this,n,R).call(this,r.id)}>
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
    `}};l=new WeakMap;n=new WeakSet;v=async function(){if(!this.merchantId)return;const[t,e]=await Promise.all([w.get(this.merchantId),S.forMerchant(this.merchantId)]);this._merchant=t,this._transactions=e};f=function(){if(this._timeRange===0)return this._transactions;const t=new Date;t.setMonth(t.getMonth()-this._timeRange);const e=t.toISOString().slice(0,10);return this._transactions.filter(a=>a.date>=e)};g=function(){const t=new Map;for(const e of c(this,n,f)){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a)).map(([e,a])=>({month:e,total:a}))};k=function(){const t=c(this,n,g),e=t.map(i=>i.total),a=A(e.length);return{labels:t.map(i=>i.month),datasets:[{label:this._merchant?.name??"Merchant",data:e,backgroundColor:b("--budgee-primary",.5),borderColor:b("--budgee-primary"),borderWidth:1},...e.length>=2?[{type:"line",label:`Moving Avg (${a}-mo)`,data:I(e,a),borderColor:b("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};M=function(t){this._timeRange=Number(t.target.value),this._currentPage=1};P=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};C=function(){window.history.pushState({},"","/merchants"),window.dispatchEvent(new PopStateEvent("popstate"))};R=function(t){window.history.pushState({},"",`/transactions/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};s.styles=[E,W`
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
    `];h([O({type:String})],s.prototype,"merchantId",2);h([m()],s.prototype,"_merchant",2);h([m()],s.prototype,"_transactions",2);h([m()],s.prototype,"_timeRange",2);h([m()],s.prototype,"_currentPage",2);h([m()],s.prototype,"_pageSize",2);s=h([F("merchant-detail")],s);export{s as MerchantDetail};
