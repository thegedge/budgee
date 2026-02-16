import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import apple from "lucide-static/icons/apple.svg?raw";
import banknote from "lucide-static/icons/banknote.svg?raw";
import beaker from "lucide-static/icons/beaker.svg?raw";
import beer from "lucide-static/icons/beer.svg?raw";
import bell from "lucide-static/icons/bell.svg?raw";
import bike from "lucide-static/icons/bike.svg?raw";
import bookOpen from "lucide-static/icons/book-open.svg?raw";
import box from "lucide-static/icons/box.svg?raw";
import briefcase from "lucide-static/icons/briefcase.svg?raw";
import bug from "lucide-static/icons/bug.svg?raw";
import cake from "lucide-static/icons/cake.svg?raw";
import calculator from "lucide-static/icons/calculator.svg?raw";
import calendar from "lucide-static/icons/calendar.svg?raw";
import camera from "lucide-static/icons/camera.svg?raw";
import car from "lucide-static/icons/car.svg?raw";
import carrot from "lucide-static/icons/carrot.svg?raw";
import chefHat from "lucide-static/icons/chef-hat.svg?raw";
import circledDollar from "lucide-static/icons/circle-dollar-sign.svg?raw";
import circledPlus from "lucide-static/icons/circle-plus.svg?raw";
import question from "lucide-static/icons/circle-question-mark.svg?raw";
import clock from "lucide-static/icons/clock.svg?raw";
import cloud from "lucide-static/icons/cloud.svg?raw";
import coffee from "lucide-static/icons/coffee.svg?raw";
import creditCard from "lucide-static/icons/credit-card.svg?raw";
import cupSoda from "lucide-static/icons/cup-soda.svg?raw";
import dumbbell from "lucide-static/icons/dumbbell.svg?raw";
import flask from "lucide-static/icons/flask-conical.svg?raw";
import gamepad from "lucide-static/icons/gamepad-2.svg?raw";
import gift from "lucide-static/icons/gift.svg?raw";
import globe from "lucide-static/icons/globe.svg?raw";
import graduationCap from "lucide-static/icons/graduation-cap.svg?raw";
import hamburger from "lucide-static/icons/hamburger.svg?raw";
import heart from "lucide-static/icons/heart.svg?raw";
import home from "lucide-static/icons/home.svg?raw";
import joystick from "lucide-static/icons/joystick.svg?raw";
import key from "lucide-static/icons/key.svg?raw";
import lightbulb from "lucide-static/icons/lightbulb.svg?raw";
import mail from "lucide-static/icons/mail.svg?raw";
import mapPin from "lucide-static/icons/map-pin.svg?raw";
import milk from "lucide-static/icons/milk.svg?raw";
import monitor from "lucide-static/icons/monitor.svg?raw";
import music from "lucide-static/icons/music.svg?raw";
import newspaper from "lucide-static/icons/newspaper.svg?raw";
import paintbrush from "lucide-static/icons/paintbrush.svg?raw";
import pawPrint from "lucide-static/icons/paw-print.svg?raw";
import phone from "lucide-static/icons/phone.svg?raw";
import pizza from "lucide-static/icons/pizza.svg?raw";
import plane from "lucide-static/icons/plane.svg?raw";
import puzzle from "lucide-static/icons/puzzle.svg?raw";
import receipt from "lucide-static/icons/receipt.svg?raw";
import scale from "lucide-static/icons/scale.svg?raw";
import scissors from "lucide-static/icons/scissors.svg?raw";
import shieldCheck from "lucide-static/icons/shield-check.svg?raw";
import shirt from "lucide-static/icons/shirt.svg?raw";
import shoppingBag from "lucide-static/icons/shopping-bag.svg?raw";
import shoppingCart from "lucide-static/icons/shopping-cart.svg?raw";
import sparkles from "lucide-static/icons/sparkles.svg?raw";
import star from "lucide-static/icons/star.svg?raw";
import store from "lucide-static/icons/store.svg?raw";
import sun from "lucide-static/icons/sun.svg?raw";
import ticket from "lucide-static/icons/ticket.svg?raw";
import trophy from "lucide-static/icons/trophy.svg?raw";
import truck from "lucide-static/icons/truck.svg?raw";
import tv from "lucide-static/icons/tv.svg?raw";
import user from "lucide-static/icons/user.svg?raw";
import users from "lucide-static/icons/users.svg?raw";
import utensils from "lucide-static/icons/utensils.svg?raw";
import wallet from "lucide-static/icons/wallet.svg?raw";
import wifi from "lucide-static/icons/wifi.svg?raw";
import wine from "lucide-static/icons/wine.svg?raw";
import wrench from "lucide-static/icons/wrench.svg?raw";
import zap from "lucide-static/icons/zap.svg?raw";

export const ICON_MAP: Record<string, string> = {
  apple: apple,
  banknote: banknote,
  beaker: beaker,
  beer: beer,
  bell: bell,
  bike: bike,
  "book-open": bookOpen,
  briefcase: briefcase,
  bug: bug,
  cake: cake,
  calculator: calculator,
  calendar: calendar,
  camera: camera,
  car: car,
  carrot: carrot,
  "chef-hat": chefHat,
  "circle-dollar-sign": circledDollar,
  "circle-plus": circledPlus,
  clock: clock,
  cloud: cloud,
  coffee: coffee,
  "credit-card": creditCard,
  box: box,
  "cup-soda": cupSoda,
  dumbbell: dumbbell,
  flask: flask,
  gamepad: gamepad,
  gift: gift,
  globe: globe,
  "graduation-cap": graduationCap,
  hamburger: hamburger,
  heart: heart,
  home: home,
  joystick: joystick,
  key: key,
  lightbulb: lightbulb,
  mail: mail,
  "map-pin": mapPin,
  milk: milk,
  monitor: monitor,
  music: music,
  newspaper: newspaper,
  paintbrush: paintbrush,
  "paw-print": pawPrint,
  phone: phone,
  pizza: pizza,
  plane: plane,
  puzzle: puzzle,
  question: question,
  receipt: receipt,
  scale: scale,
  scissors: scissors,
  "shield-check": shieldCheck,
  shirt: shirt,
  "shopping-bag": shoppingBag,
  "shopping-cart": shoppingCart,
  sparkles: sparkles,
  star: star,
  store: store,
  sun: sun,
  ticket: ticket,
  trophy: trophy,
  truck: truck,
  tv: tv,
  user: user,
  users: users,
  utensils: utensils,
  wallet: wallet,
  wifi: wifi,
  wine: wine,
  wrench: wrench,
  zap: zap,
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
      border: 1px solid var(--budgee-border, lch(89.2% 0 none));
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
      background-color: var(--budgee-bg, lch(98.3% 0 none));
    }
    .trigger svg {
      width: 1.2rem;
      height: 1.2rem;
    }
    .trigger.placeholder {
      color: var(--budgee-text-muted, lch(56.7% 0 none));
    }
    .popup {
      position: fixed;
      z-index: 1200;
      background: var(--budgee-surface, lch(100% 0 none));
      border: 1px solid var(--budgee-border, lch(89.2% 0 none));
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
      border: 1px solid var(--budgee-border, lch(89.2% 0 none));
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
      background-color: var(--budgee-bg, lch(98.3% 0 none));
      border-color: var(--budgee-border, lch(89.2% 0 none));
    }
    .icon-option.selected {
      background-color: var(--budgee-primary, lch(72.1% 25.1 246.4));
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
      border: 1px solid var(--budgee-border, lch(89.2% 0 none));
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      color: var(--budgee-text-muted, lch(56.7% 0 none));
    }
    .clear-btn:hover {
      background-color: var(--budgee-bg, lch(98.3% 0 none));
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

  #boundScroll = () => {
    if (this._open) this.#positionPopup();
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.#boundDocClick, true);
    window.addEventListener("scroll", this.#boundScroll, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.#boundDocClick, true);
    window.removeEventListener("scroll", this.#boundScroll, true);
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
    const popupHeight = popup.offsetHeight;
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow < popupHeight + 4 && rect.top > spaceBelow) {
      popup.style.top = `${rect.top - popupHeight - 4}px`;
    } else {
      popup.style.top = `${rect.bottom + 4}px`;
    }
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
