import{B as E,i as O,l as m,T as x,b as r,A as w,o as F,p as W,d as q,q as G,n as T,s as K,g as U,t as V,h as Y,j as H,r as u,u as S,k as J}from"./index-DOWBr1cA.js";function y(t){const a=t.match(/^(\d{4,})/);if(!a)return null;const e=a[1],n=Number(e.slice(0,4)),s=Number(e.slice(0,2));return e[0]==="4"?"Visa":s>=51&&s<=55||n>=2221&&n<=2720?"Mastercard":s===34||s===37?"Amex":n===6011||n>=6440&&n<=6499||s===65?"Discover":null}var Q=Object.defineProperty,X=Object.getOwnPropertyDescriptor,C=t=>{throw TypeError(t)},l=(t,a,e,n)=>{for(var s=n>1?void 0:n?X(a,e):a,v=t.length-1,b;v>=0;v--)(b=t[v])&&(s=(n?b(a,e,s):b(s))||s);return n&&s&&Q(a,e,s),s},_=(t,a,e)=>a.has(t)||C("Cannot "+e),d=(t,a,e)=>(_(t,a,"read from private field"),e?e.call(t):a.get(t)),$=(t,a,e)=>a.has(t)?C("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,e),k=(t,a,e,n)=>(_(t,a,"write to private field"),a.set(t,e),e),o=(t,a,e)=>(_(t,a,"access private method"),e),h,i,g,N,f,P,p,A,z,D,I,L,R,B,M;let c=class extends E(O){constructor(){super(...arguments),$(this,i),this.accountId="",this._transactions=null,this._editingName=!1,this._timeRange=null,this._currentPage=1,this._pageSize=25,$(this,h,[])}connectedCallback(){super.connectedCallback(),o(this,i,g).call(this);const t=q(()=>o(this,i,g).call(this),300);Promise.all([m.subscribe(t),x.subscribe(t)]).then(a=>{k(this,h,a)})}disconnectedCallback(){super.disconnectedCallback();for(const t of d(this,h))t.unsubscribe();k(this,h,[])}render(){if(!this._account)return r`
        <p>Loading…</p>
      `;const t=d(this,i,f),a=t===null;return r`
      <span class="back-link" @click=${o(this,i,D)}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${this._editingName?r`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${o(this,i,L)}
                @blur=${()=>this._editingName=!1}
              />`:r`<span class="editable" @click=${()=>this._editingName=!0}
                >${this._account.name}</span
              >`}
        </h2>
        <div class="meta">
          Type:
          <select @change=${o(this,i,R)}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${F.map(e=>r`<option value=${e} ?selected=${this._account.type===e}>${W(e)}</option>`)}
          </select>
          ${y(this._account.name)?r` (${y(this._account.name)})`:w}
        </div>
      </div>

      ${a?o(this,i,B).call(this):o(this,i,M).call(this,t)}
    `}};h=new WeakMap;i=new WeakSet;g=async function(){this.accountId&&(this._account=await m.get(this.accountId),o(this,i,N).call(this))};N=async function(){this._transactions=await x.forAccount(this.accountId)};f=function(){if(!this._transactions)return null;if(this._timeRange===null)return this._transactions;const t=G.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(a=>a.date>=t)};P=function(){return[...S(this._transactions??[],"month").entries()].sort(([t],[a])=>t.localeCompare(a))};p=function(){return[...S(d(this,i,f)??[],"month").entries()].sort(([t],[a])=>t.localeCompare(a))};A=function(t){this._timeRange=t.timeRange,this._currentPage=1};z=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};D=function(){T("/accounts")};I=function(t){T(`/transactions/${t}`)};L=async function(t){if(t.key!=="Enter")return;const a=t.target;await this.withBusy(async()=>{await m.update(this.accountId,{name:a.value}),this._editingName=!1,await o(this,i,g).call(this)})};R=async function(t){const a=t.target.value;await this.withBusy(async()=>{await m.update(this.accountId,{type:a||void 0}),await o(this,i,g).call(this)})};B=function(){return r`
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
    `};M=function(t){const a=(this._currentPage-1)*this._pageSize,e=t.slice(a,a+this._pageSize);return r`
      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <time-range-picker .value=${this._timeRange} @time-range-change=${o(this,i,A)}></time-range-picker>
          </h3>
          ${d(this,i,p).length>0?r`<chart-wrapper chartType="bar" .data=${K({allEntries:d(this,i,P),displayEntries:d(this,i,p),label:this._account?.name??"Account"})}></chart-wrapper>`:r`
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
              ${d(this,i,p).map(([n,s])=>r`
                <tr>
                  <td>${n}</td>
                  <td class=${s<0?"amount-negative":"amount-positive"}>
                    ${s.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${d(this,i,p).length===0?r`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:w}
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
          @page-change=${o(this,i,z)}
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
              ${e.map(n=>r`
                <tr @click=${()=>o(this,i,I).call(this,n.id)}>
                  <td>${n.date}</td>
                  <td>${n.description}</td>
                  <td class=${n.amount<0?"amount-negative":"amount-positive"}>
                    ${n.amount.toFixed(2)}
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </paginated-table>
      </div>
    `};c.styles=[U,V,Y`
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
        display: flex;
        flex-direction: column;
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
      time-range-picker {
        margin-left: 0.75rem;
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
    `];l([H({type:String})],c.prototype,"accountId",2);l([u()],c.prototype,"_account",2);l([u()],c.prototype,"_transactions",2);l([u()],c.prototype,"_editingName",2);l([u()],c.prototype,"_timeRange",2);l([u()],c.prototype,"_currentPage",2);l([u()],c.prototype,"_pageSize",2);c=l([J("account-detail")],c);export{c as AccountDetail};
