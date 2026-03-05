import{i as R,M as f,T as $,b as h,s as D,d as I,q as E,u as O,n as S,t as q,h as B,j as W,r as d,k as A}from"./index-DIfBJ-vK.js";var K=Object.defineProperty,L=Object.getOwnPropertyDescriptor,x=t=>{throw TypeError(t)},o=(t,e,a,i)=>{for(var c=i>1?void 0:i?L(e,a):e,g=t.length-1,u;g>=0;g--)(u=t[g])&&(c=(i?u(e,a,c):u(c))||c);return i&&c&&K(e,a,c),c},b=(t,e,a)=>e.has(t)||x("Cannot "+a),p=(t,e,a)=>(b(t,e,"read from private field"),a?a.call(t):e.get(t)),y=(t,e,a)=>e.has(t)?x("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),k=(t,e,a,i)=>(b(t,e,"write to private field"),e.set(t,a),a),s=(t,e,a)=>(b(t,e,"access private method"),a),l,n,m,v,N,_,w,P,C,M,z,T;let r=class extends R{constructor(){super(...arguments),y(this,n),this.merchantId="",this._transactions=[],this._timeRange=null,this._editingName=!1,this._draftName="",this._currentPage=1,this._pageSize=25,y(this,l,[])}connectedCallback(){super.connectedCallback(),s(this,n,m).call(this);const t=I(()=>s(this,n,m).call(this),300);Promise.all([f.subscribe(t),$.subscribe(t)]).then(e=>{k(this,l,e)})}disconnectedCallback(){super.disconnectedCallback();for(const t of p(this,l))t.unsubscribe();k(this,l,[])}updated(t){if(super.updated(t),t.has("merchantId")&&s(this,n,m).call(this),t.has("_editingName")&&this._editingName){const e=this.shadowRoot?.querySelector(".name-input");e?.focus(),e?.select()}}render(){if(!this._merchant)return h`
        <p>Loading…</p>
      `;const t=p(this,n,v),e=(this._currentPage-1)*this._pageSize,a=t.slice(e,e+this._pageSize);return h`
      <span class="back-link" @click=${s(this,n,z)}>&larr; Back to merchants</span>

      <div class="header">
        <h2>
          ${this._editingName?h`<input
                class="name-input"
                .value=${this._draftName}
                @input=${i=>{this._draftName=i.target.value}}
                @keydown=${s(this,n,M)}
              />`:h`${this._merchant.name} <button class="edit-name-btn" @click=${s(this,n,C)}>✎</button>`}
        </h2>
      </div>

      <div class="section">
        <h3>
          Monthly Spend
          <time-range-picker .value=${this._timeRange} @time-range-change=${s(this,n,w)}></time-range-picker>
        </h3>
        ${p(this,n,_).length>0?h`<chart-wrapper chartType="bar" .data=${D({allEntries:p(this,n,N),displayEntries:p(this,n,_),label:this._merchant?.name??"Merchant"})}></chart-wrapper>`:h`
                <p>No transactions in this period.</p>
              `}
      </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <paginated-table
          .totalItems=${t.length}
          .defaultPageSize=${25}
          storageKey="merchant-transactions"
          @page-change=${s(this,n,P)}
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
              ${a.map(i=>h`
                <tr @click=${()=>s(this,n,T).call(this,i.id)}>
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
    `}};l=new WeakMap;n=new WeakSet;m=async function(){if(!this.merchantId)return;const[t,e]=await Promise.all([f.get(this.merchantId),$.forMerchant(this.merchantId)]);this._merchant=t,this._transactions=e};v=function(){if(this._timeRange===null)return this._transactions;const t=E.Now.plainDateISO().subtract(this._timeRange).toString();return this._transactions.filter(e=>e.date>=t)};N=function(){const t=new Map;for(const e of this._transactions){const a=e.date.slice(0,7);t.set(a,(t.get(a)??0)+e.amount)}return[...t.entries()].sort(([e],[a])=>e.localeCompare(a))};_=function(){return[...O(p(this,n,v),"month").entries()].sort(([t],[e])=>t.localeCompare(e))};w=function(t){this._timeRange=t.timeRange,this._currentPage=1};P=function(t){this._currentPage=t.detail.page,this._pageSize=t.detail.pageSize};C=function(){this._editingName=!0,this._draftName=this._merchant?.name??""};M=function(t){if(t.key==="Enter"){const e=this._draftName.trim();e&&this._merchant&&f.update(this._merchant.id,{name:e}),this._editingName=!1}else t.key==="Escape"&&(this._editingName=!1)};z=function(){S("/merchants")};T=function(t){S(`/transactions/${t}`)};r.styles=[q,B`
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
        margin-bottom: 1rem;
      }
      .header h2 {
        margin-top: 0;
        margin-bottom: 0;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }
      .section chart-wrapper {
        flex: 1;
        min-height: 200px;
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
      .edit-name-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.75em;
        opacity: 0.5;
        padding: 0 0.25em;
      }
      .edit-name-btn:hover {
        opacity: 1;
      }
      .name-input {
        font: inherit;
        border: 1px solid var(--budgee-border);
        border-radius: 4px;
        padding: 0 0.25em;
        width: 100%;
        box-sizing: border-box;
      }
      tr {
        cursor: pointer;
      }
      tr:hover {
        background-color: var(--budgee-bg);
      }
    `];o([W({type:String})],r.prototype,"merchantId",2);o([d()],r.prototype,"_merchant",2);o([d()],r.prototype,"_transactions",2);o([d()],r.prototype,"_timeRange",2);o([d()],r.prototype,"_editingName",2);o([d()],r.prototype,"_draftName",2);o([d()],r.prototype,"_currentPage",2);o([d()],r.prototype,"_pageSize",2);r=o([A("merchant-detail")],r);export{r as MerchantDetail};
