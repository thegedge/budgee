import{i as E,M as x,T as M,b as h,A as W,d as A,m as O,e as F,c as v,t as N,g as V,n as B,r as b,h as L}from"./index-B9_8VI1M.js";var G=Object.defineProperty,K=Object.getOwnPropertyDescriptor,k=t=>{throw TypeError(t)},l=(t,e,a,i)=>{for(var n=i>1?void 0:i?K(e,a):e,s=t.length-1,p;s>=0;s--)(p=t[s])&&(n=(i?p(e,a,n):p(n))||n);return i&&n&&G(e,a,n),n},f=(t,e,a)=>e.has(t)||k("Cannot "+a),o=(t,e,a)=>(f(t,e,"read from private field"),a?a.call(t):e.get(t)),w=(t,e,a)=>e.has(t)?k("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),S=(t,e,a,i)=>(f(t,e,"write to private field"),e.set(t,a),a),m=(t,e,a)=>(f(t,e,"access private method"),a),g,r,_,y,C,u,P,z,R,T,D;let c=class extends E{constructor(){super(...arguments),w(this,r),this.merchantId="",this._transactions=[],this._timeRange=12,this._currentPage=1,this._pageSize=25,w(this,g,[])}connectedCallback(){super.connectedCallback(),m(this,r,_).call(this);const t=A(()=>m(this,r,_).call(this),300);Promise.all([x.subscribe(t),M.subscribe(t)]).then(e=>{S(this,g,e)})}disconnectedCallback(){super.disconnectedCallback();for(const t of o(this,g))t.unsubscribe();S(this,g,[])}render(){if(!this._merchant)return h`
        <p>Loading…</p>
      `;const t=o(this,r,y),e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize),i=t.reduce((n,s)=>n+s.amount,0);return h`
      <span class="back-link" @click=${m(this,r,T)}>&larr; Back to merchants</span>

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
            <select @change=${m(this,r,z)}>
              <option value="6" ?selected=${this._timeRange===6}>6 months</option>
              <option value="12" ?selected=${this._timeRange===12}>12 months</option>
              <option value="24" ?selected=${this._timeRange===24}>24 months</option>
              <option value="0" ?selected=${this._timeRange===0}>All time</option>
            </select>
          </h3>
          ${o(this,r,u).length>0?h`<chart-wrapper chartType="bar" .data=${o(this,r,P)}></chart-wrapper>`:h`
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
              ${o(this,r,u).map(({month:n,total:s})=>h`
                <tr>
                  <td>${n}</td>
                  <td class=${s<0?"amount-negative":"amount-positive"}>
                    ${s.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${o(this,r,u).length===0?h`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:W}
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
          @page-change=${m(this,r,R)}
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
              ${a.map(n=>h`
                <tr @click=${()=>m(this,r,D).call(this,n.id)}>
                  <td>${n.date}</td>
                  <td>${n.originalDescription}</td>
                  <td class=${n.amount<0?"amount-negative":"amount-positive"}>
                    ${n.amount.toFixed(2)}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `}};g=new WeakMap;r=new WeakSet;_=async function(){if(!this.merchantId)return;const[t,e]=await Promise.all([x.get(this.merchantId),M.forMerchant(this.merchantId)]);this._merchant=t,this._transactions=e};y=function(){if(this._timeRange===0)return this._transactions;const t=new Date;t.setMonth(t.getMonth()-this._timeRange);const e=t.toISOString().slice(0,10);return this._transactions.filter(a=>a.date>=e)};C=function(){const t=new Map;for(const e of this._transactions){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a)).map(([e,a])=>({month:e,total:a}))};u=function(){const t=new Map;for(const e of o(this,r,y)){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a)).map(([e,a])=>({month:e,total:a}))};P=function(){const t=o(this,r,C),e=t.map(d=>d.total),a=O(e.length),i=F(e,a),n=o(this,r,u),s=n[0]?.month,p=s?t.findIndex(d=>d.month===s):0,$=n.map(d=>d.total),I=i.slice(p,p+n.length);return{labels:n.map(d=>d.month),datasets:[{label:this._merchant?.name??"Merchant",data:$,backgroundColor:v("--budgee-primary",.5),borderColor:v("--budgee-primary"),borderWidth:1},...$.length>=2?[{type:"line",label:`Moving Avg (${a}-mo)`,data:I,borderColor:v("--budgee-text-muted",.5),borderWidth:1.5,pointRadius:0,fill:!1,tension:.3}]:[]]}};z=function(t){this._timeRange=Number(t.target.value),this._currentPage=1};R=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};T=function(){window.history.pushState({},"","/Merchants"),window.dispatchEvent(new PopStateEvent("popstate"))};D=function(t){window.history.pushState({},"",`/transactions/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))};c.styles=[N,V`
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
    `];l([B({type:String})],c.prototype,"merchantId",2);l([b()],c.prototype,"_merchant",2);l([b()],c.prototype,"_transactions",2);l([b()],c.prototype,"_timeRange",2);l([b()],c.prototype,"_currentPage",2);l([b()],c.prototype,"_pageSize",2);c=l([L("merchant-detail")],c);export{c as MerchantDetail};
