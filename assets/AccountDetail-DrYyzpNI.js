import{B as E,i as M,D as O,o as h,T as y,b as r,A as $,p as z,q,n as k,s as L,f,h as W,t as F,j as G,k as K,r as p,u as U,l as V,v as w}from"./index-BU_dxqAs.js";function _(e){const t=e.match(/^(\d{4,})/);if(!t)return null;const a=t[1],o=Number(a.slice(0,4)),i=Number(a.slice(0,2));return a[0]==="4"?"Visa":i>=51&&i<=55||o>=2221&&o<=2720?"Mastercard":i===34||i===37?"Amex":o===6011||o>=6440&&o<=6499||i===65?"Discover":null}var Y=Object.defineProperty,H=Object.getOwnPropertyDescriptor,x=e=>{throw TypeError(e)},l=(e,t,a,o)=>{for(var i=o>1?void 0:o?H(t,a):t,m=e.length-1,b;m>=0;m--)(b=e[m])&&(i=(o?b(t,a,i):b(i))||i);return o&&i&&Y(t,a,i),i},T=(e,t,a)=>t.has(e)||x("Cannot "+a),d=(e,t,a)=>(T(e,t,"read from private field"),a?a.call(e):t.get(e)),J=(e,t,a)=>t.has(e)?x("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),s=(e,t,a)=>(T(e,t,"access private method"),a),n,g,N,v,S,u,A,C,D,R,I,P,B;let c=class extends E(M){constructor(){super(),J(this,n),this.accountId="",this._transactions=null,this._editingName=!1,this._timeRange=null,new O(this,[h.subscribe,y.subscribe],()=>s(this,n,g).call(this))}render(){if(!this._account)return r`
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;const e=d(this,n,v),t=e===null;return r`
      <span class="back-link" @click=${s(this,n,C)}>&larr; Back to accounts</span>

      <div class="header">
        <h2>
          ${this._editingName?r`<input
                class="edit-input"
                .value=${this._account.name}
                @keydown=${s(this,n,R)}
                @blur=${()=>this._editingName=!1}
              />`:r`<span class="editable" @click=${()=>this._editingName=!0}
                >${this._account.name}</span
              >`}
        </h2>
        <div class="meta">
          Type:
          <select @change=${s(this,n,I)}>
            <option value="" ?selected=${!this._account.type}>Not set</option>
            ${z.map(a=>r`<option value=${a} ?selected=${this._account.type===a}>${q(a)}</option>`)}
          </select>
          ${_(this._account.name)?r` (${_(this._account.name)})`:$}
        </div>
      </div>

      ${t?s(this,n,P).call(this):s(this,n,B).call(this,e)}
    `}};n=new WeakSet;g=async function(){this.accountId&&(this._account=await h.get(this.accountId),s(this,n,N).call(this))};N=async function(){this._transactions=await y.forAccount(this.accountId)};v=function(){if(!this._transactions)return null;if(this._timeRange===null)return this._transactions;const e=U.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(t=>t.date>=e)};S=function(){return[...w(this._transactions??[],"month").entries()].sort(([e],[t])=>e.localeCompare(t))};u=function(){return[...w(d(this,n,v)??[],"month").entries()].sort(([e],[t])=>e.localeCompare(t))};A=function(e){this._timeRange=e.timeRange};C=function(){k("/accounts")};D=function(e){k(`/transactions/${e}`)};R=async function(e){if(e.key!=="Enter")return;const t=e.target;await this.withBusy(async()=>{await h.update(this.accountId,{name:t.value}),this._editingName=!1,await s(this,n,g).call(this)})};I=async function(e){const t=e.target.value;await this.withBusy(async()=>{await h.update(this.accountId,{type:t||void 0}),await s(this,n,g).call(this)})};P=function(){return r`
      <div class="top-row">
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
        <budgee-skeleton variant="card" rows="3"></budgee-skeleton>
      </div>
      <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
    `};B=function(e){return r`
      <div class="top-row">
        <div class="section">
          <h3>
            Monthly Activity
            <time-range-picker .value=${this._timeRange} @time-range-change=${s(this,n,A)}></time-range-picker>
          </h3>
          ${d(this,n,u).length>0?r`<chart-wrapper chartType="bar" .data=${L({allEntries:d(this,n,S),displayEntries:d(this,n,u),label:this._account?.name??"Account"})}></chart-wrapper>`:r`
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
              ${d(this,n,u).map(([t,a])=>r`
                <tr>
                  <td>${t}</td>
                  <td class=${a<0?"amount-negative":"amount-positive"}>
                    ${f(a)}
                  </td>
                </tr>
              `)}
              ${d(this,n,u).length===0?r`
                      <tr>
                        <td colspan="2">No data</td>
                      </tr>
                    `:$}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <paginated-table
          .items=${e}
          .defaultPageSize=${25}
          storageKey="account-transactions"
          .renderRow=${t=>r`
            <tr @click=${()=>s(this,n,D).call(this,t.id)}>
              <td>${t.date}</td>
              <td>${t.description}</td>
              <td class=${t.amount<0?"amount-negative":"amount-positive"}>
                ${f(t.amount)}
              </td>
            </tr>
          `}
        >
          <thead slot="header">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
        </paginated-table>
      </div>
    `};c.styles=[W,F,G`
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
    `];l([K({type:String})],c.prototype,"accountId",2);l([p()],c.prototype,"_account",2);l([p()],c.prototype,"_transactions",2);l([p()],c.prototype,"_editingName",2);l([p()],c.prototype,"_timeRange",2);c=l([V("account-detail")],c);export{c as AccountDetail};
