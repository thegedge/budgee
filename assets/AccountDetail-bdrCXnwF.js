import{B as O,i as F,l as m,T as w,b as o,A as x,o as L,p as W,d as q,q as G,n as T,s as K,g as U,t as V,h as Y,j as H,r as u,u as S,k as J}from"./index-DUbKPKkx.js";function y(t){const e=t.match(/^(\d{4,})/);if(!e)return null;const a=e[1],i=Number(a.slice(0,4)),r=Number(a.slice(0,2));return a[0]==="4"?"Visa":r>=51&&r<=55||i>=2221&&i<=2720?"Mastercard":r===34||r===37?"Amex":i===6011||i>=6440&&i<=6499||r===65?"Discover":null}var Q=Object.defineProperty,X=Object.getOwnPropertyDescriptor,C=t=>{throw TypeError(t)},l=(t,e,a,i)=>{for(var r=i>1?void 0:i?X(e,a):e,b=t.length-1,v;b>=0;b--)(v=t[b])&&(r=(i?v(e,a,r):v(r))||r);return i&&r&&Q(e,a,r),r},_=(t,e,a)=>e.has(t)||C("Cannot "+a),d=(t,e,a)=>(_(t,e,"read from private field"),a?a.call(t):e.get(t)),k=(t,e,a)=>e.has(t)?C("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),$=(t,e,a,i)=>(_(t,e,"write to private field"),e.set(t,a),a),s=(t,e,a)=>(_(t,e,"access private method"),a),h,n,g,N,f,P,p,A,z,D,I,R,B,M,E;let c=class extends O(F){constructor(){super(...arguments),k(this,n),this.accountId="",this._transactions=null,this._editingName=!1,this._timeRange=null,this._currentPage=1,this._pageSize=25,k(this,h,[])}connectedCallback(){super.connectedCallback(),s(this,n,g).call(this);const t=q(()=>s(this,n,g).call(this),300);Promise.all([m.subscribe(t),w.subscribe(t)]).then(e=>{$(this,h,e)})}disconnectedCallback(){super.disconnectedCallback();for(const t of d(this,h))t.unsubscribe();$(this,h,[])}render(){if(!this._account)return o`
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;const t=d(this,n,f),e=t===null;return o`
      <span class="back-link" @click=${s(this,n,D)}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${this._editingName?o`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${s(this,n,R)}
                @blur=${()=>this._editingName=!1}
              />`:o`<span class="editable" @click=${()=>this._editingName=!0}
                >${this._account.name}</span
              >`}
        </h2>
        <div class="meta">
          Type:
          <select @change=${s(this,n,B)}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${L.map(a=>o`<option value=${a} ?selected=${this._account.type===a}>${W(a)}</option>`)}
          </select>
          ${y(this._account.name)?o` (${y(this._account.name)})`:x}
        </div>
      </div>

      ${e?s(this,n,M).call(this):s(this,n,E).call(this,t)}
    `}};h=new WeakMap;n=new WeakSet;g=async function(){this.accountId&&(this._account=await m.get(this.accountId),s(this,n,N).call(this))};N=async function(){this._transactions=await w.forAccount(this.accountId)};f=function(){if(!this._transactions)return null;if(this._timeRange===null)return this._transactions;const t=G.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(e=>e.date>=t)};P=function(){return[...S(this._transactions??[],"month").entries()].sort(([t],[e])=>t.localeCompare(e))};p=function(){return[...S(d(this,n,f)??[],"month").entries()].sort(([t],[e])=>t.localeCompare(e))};A=function(t){this._timeRange=t.timeRange,this._currentPage=1};z=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};D=function(){T("/accounts")};I=function(t){T(`/transactions/${t}`)};R=async function(t){if(t.key!=="Enter")return;const e=t.target;await this.withBusy(async()=>{await m.update(this.accountId,{name:e.value}),this._editingName=!1,await s(this,n,g).call(this)})};B=async function(t){const e=t.target.value;await this.withBusy(async()=>{await m.update(this.accountId,{type:e||void 0}),await s(this,n,g).call(this)})};M=function(){return o`
      <div class="top-row">
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
      </div>
      <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
    `};E=function(t){const e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize);return o`
      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <time-range-picker .value=${this._timeRange} @time-range-change=${s(this,n,A)}></time-range-picker>
          </h3>
          ${d(this,n,p).length>0?o`<chart-wrapper chartType="bar" .data=${K({allEntries:d(this,n,P),displayEntries:d(this,n,p),label:this._account?.name??"Account"})}></chart-wrapper>`:o`
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
              ${d(this,n,p).map(([i,r])=>o`
                <tr>
                  <td>${i}</td>
                  <td class=${r<0?"amount-negative":"amount-positive"}>
                    ${r.toFixed(2)}
                  </td>
                </tr>
              `)}
              ${d(this,n,p).length===0?o`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:x}
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
          @page-change=${s(this,n,z)}
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
              ${a.map(i=>o`
                <tr @click=${()=>s(this,n,I).call(this,i.id)}>
                  <td>${i.date}</td>
                  <td>${i.description}</td>
                  <td class=${i.amount<0?"amount-negative":"amount-positive"}>
                    ${i.amount.toFixed(2)}
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
