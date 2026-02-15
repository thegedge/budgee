import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import academicCap from "heroicons/24/outline/academic-cap.svg?raw";
import banknotes from "heroicons/24/outline/banknotes.svg?raw";
import beaker from "heroicons/24/outline/beaker.svg?raw";
import bell from "heroicons/24/outline/bell.svg?raw";
import bolt from "heroicons/24/outline/bolt.svg?raw";
import bookOpen from "heroicons/24/outline/book-open.svg?raw";
import briefcase from "heroicons/24/outline/briefcase.svg?raw";
import buildingStorefront from "heroicons/24/outline/building-storefront.svg?raw";
import cake from "heroicons/24/outline/cake.svg?raw";
import calculator from "heroicons/24/outline/calculator.svg?raw";
import calendar from "heroicons/24/outline/calendar.svg?raw";
import camera from "heroicons/24/outline/camera.svg?raw";
import clock from "heroicons/24/outline/clock.svg?raw";
import cloud from "heroicons/24/outline/cloud.svg?raw";
import computerDesktop from "heroicons/24/outline/computer-desktop.svg?raw";
import creditCard from "heroicons/24/outline/credit-card.svg?raw";
import cube from "heroicons/24/outline/cube.svg?raw";
import currencyDollar from "heroicons/24/outline/currency-dollar.svg?raw";
import envelope from "heroicons/24/outline/envelope.svg?raw";
import film from "heroicons/24/outline/film.svg?raw";
import fire from "heroicons/24/outline/fire.svg?raw";
import gift from "heroicons/24/outline/gift.svg?raw";
import globeAlt from "heroicons/24/outline/globe-alt.svg?raw";
import heart from "heroicons/24/outline/heart.svg?raw";
import home from "heroicons/24/outline/home.svg?raw";
import key from "heroicons/24/outline/key.svg?raw";
import lightBulb from "heroicons/24/outline/light-bulb.svg?raw";
import mapPin from "heroicons/24/outline/map-pin.svg?raw";
import musicalNote from "heroicons/24/outline/musical-note.svg?raw";
import newspaper from "heroicons/24/outline/newspaper.svg?raw";
import paintBrush from "heroicons/24/outline/paint-brush.svg?raw";
import phone from "heroicons/24/outline/phone.svg?raw";
import puzzlePiece from "heroicons/24/outline/puzzle-piece.svg?raw";
import receiptPercent from "heroicons/24/outline/receipt-percent.svg?raw";
import scale from "heroicons/24/outline/scale.svg?raw";
import scissors from "heroicons/24/outline/scissors.svg?raw";
import shieldCheck from "heroicons/24/outline/shield-check.svg?raw";
import shoppingBag from "heroicons/24/outline/shopping-bag.svg?raw";
import shoppingCart from "heroicons/24/outline/shopping-cart.svg?raw";
import sparkles from "heroicons/24/outline/sparkles.svg?raw";
import star from "heroicons/24/outline/star.svg?raw";
import sun from "heroicons/24/outline/sun.svg?raw";
import ticket from "heroicons/24/outline/ticket.svg?raw";
import trophy from "heroicons/24/outline/trophy.svg?raw";
import truck from "heroicons/24/outline/truck.svg?raw";
import user from "heroicons/24/outline/user.svg?raw";
import users from "heroicons/24/outline/users.svg?raw";
import wifi from "heroicons/24/outline/wifi.svg?raw";
import wrench from "heroicons/24/outline/wrench.svg?raw";

export const ICON_MAP: Record<string, string> = {
  "academic-cap": academicCap,
  banknotes: banknotes,
  beaker: beaker,
  bell: bell,
  bolt: bolt,
  "book-open": bookOpen,
  briefcase: briefcase,
  "building-storefront": buildingStorefront,
  cake: cake,
  calculator: calculator,
  calendar: calendar,
  camera: camera,
  clock: clock,
  cloud: cloud,
  "computer-desktop": computerDesktop,
  "credit-card": creditCard,
  cube: cube,
  "currency-dollar": currencyDollar,
  envelope: envelope,
  film: film,
  fire: fire,
  gift: gift,
  "globe-alt": globeAlt,
  heart: heart,
  home: home,
  key: key,
  "light-bulb": lightBulb,
  "map-pin": mapPin,
  "musical-note": musicalNote,
  newspaper: newspaper,
  "paint-brush": paintBrush,
  phone: phone,
  "puzzle-piece": puzzlePiece,
  "receipt-percent": receiptPercent,
  scale: scale,
  scissors: scissors,
  "shield-check": shieldCheck,
  "shopping-bag": shoppingBag,
  "shopping-cart": shoppingCart,
  sparkles: sparkles,
  star: star,
  sun: sun,
  ticket: ticket,
  trophy: trophy,
  truck: truck,
  user: user,
  users: users,
  wifi: wifi,
  wrench: wrench,
};

const ICON_ENTRIES = Object.entries(ICON_MAP);

declare global {
  interface HTMLElementTagNameMap {
    "icon-picker": IconPicker;
  }
}

@customElement("icon-picker")
export class IconPicker extends LitElement {
  @property({ type: String })
  value = "";

  @state()
  private _open = false;

  @state()
  private _search = "";

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }
    .trigger {
      background: none;
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 4px;
      padding: 4px;
      cursor: pointer;
      color: inherit;
      width: 2.2rem;
      height: 2.2rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .trigger:hover {
      background-color: var(--budgee-bg, #fafafa);
    }
    .trigger svg {
      width: 1.2rem;
      height: 1.2rem;
    }
    .trigger.placeholder {
      color: var(--budgee-text-muted, #888);
    }
    .popup {
      position: fixed;
      z-index: 1200;
      background: var(--budgee-surface, #fff);
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      padding: 0.5rem;
      width: 280px;
    }
    .search {
      width: 100%;
      box-sizing: border-box;
      padding: 4px 8px;
      margin-bottom: 0.5rem;
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 4px;
      font-size: 0.85rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 2px;
      max-height: 200px;
      overflow-y: auto;
    }
    .icon-option {
      background: none;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }
    .icon-option:hover {
      background-color: var(--budgee-bg, #fafafa);
      border-color: var(--budgee-border, #e0e0e0);
    }
    .icon-option.selected {
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
    }
    .icon-option svg {
      width: 1.2rem;
      height: 1.2rem;
    }
    .clear-btn {
      width: 100%;
      margin-top: 0.5rem;
      padding: 4px;
      background: none;
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      color: var(--budgee-text-muted, #888);
    }
    .clear-btn:hover {
      background-color: var(--budgee-bg, #fafafa);
    }
  `;

  #boundDocClick = (e: Event) => {
    if (!this._open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._open = false;
      this._search = "";
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.#boundDocClick, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.#boundDocClick, true);
  }

  #toggle() {
    this._open = !this._open;
    this._search = "";
    if (this._open) {
      this.updateComplete.then(() => this.#positionPopup());
    }
  }

  #positionPopup() {
    const trigger = this.shadowRoot?.querySelector(".trigger");
    const popup = this.shadowRoot?.querySelector(".popup") as HTMLElement | null;
    if (!trigger || !popup) return;
    const rect = trigger.getBoundingClientRect();
    popup.style.top = `${rect.bottom + 4}px`;
    popup.style.left = `${rect.left}px`;
  }

  #select(name: string) {
    this.dispatchEvent(new CustomEvent("icon-selected", { detail: { icon: name } }));
    this._open = false;
    this._search = "";
  }

  #clear() {
    this.dispatchEvent(new CustomEvent("icon-selected", { detail: { icon: "" } }));
    this._open = false;
    this._search = "";
  }

  get #filtered() {
    if (!this._search) return ICON_ENTRIES;
    const q = this._search.toLowerCase();
    return ICON_ENTRIES.filter(([name]) => name.includes(q));
  }

  render() {
    const svg = this.value ? ICON_MAP[this.value] : null;

    return html`
      <button
        class="trigger ${svg ? "" : "placeholder"}"
        @click=${this.#toggle}
        title="Pick icon"
      >
        ${svg ? unsafeSVG(svg) : "?"}
      </button>
      ${
        this._open
          ? html`
            <div class="popup">
              <input
                class="search"
                type="text"
                placeholder="Search icons..."
                .value=${this._search}
                @input=${(e: Event) => {
                  this._search = (e.target as HTMLInputElement).value;
                }}
              />
              <div class="grid">
                ${this.#filtered.map(
                  ([name, raw]) => html`
                    <button
                      class="icon-option ${this.value === name ? "selected" : ""}"
                      title=${name}
                      @click=${() => this.#select(name)}
                    >
                      ${unsafeSVG(raw)}
                    </button>
                  `,
                )}
              </div>
              ${
                this.value
                  ? html`<button class="clear-btn" @click=${this.#clear}>Clear icon</button>`
                  : nothing
              }
            </div>
          `
          : nothing
      }
    `;
  }
}
