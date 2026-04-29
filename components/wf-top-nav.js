/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-top-nav`
 *
 * Yellow bar with logo on left, nav links on right.
 * Logo click navigates to Home. Nav links show active state.
 * Navigation items are driven by a JSON data structure.
 *
 * @demo index.html
 * @element wf-top-nav
 */
export class WfTopNav extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-top-nav";
  }

  constructor() {
    super();
    this.logoSrc = "./assets/Windward_Force_Logo_Red.png";
    this.logoAlt = "Windward Force Logo";
    this.activePage = "home";
    this._logoHovered = false;
    this._navItems = [];
  }

  static get properties() {
    return {
      ...super.properties,
      logoSrc: { type: String, attribute: "logo-src" },
      logoAlt: { type: String, attribute: "logo-alt" },
      activePage: { type: String, reflect: true },
      _logoHovered: { type: Boolean, state: true },
      _navItems: { type: Array, state: true },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._loadNavItems();
  }

  /**
   * Fetches the JSON data file and builds the nav items array,
   * sorted by the "order" field. The home item is excluded from
   * the rendered links (the logo handles home navigation).
   */
  async _loadNavItems() {
    try {
      const response = await fetch("../data.json");
      const data = await response.json();
      this._navItems = [...data.items].sort(
        (a, b) => Number(a.order) - Number(b.order)
      );
    } catch (e) {
      console.warn("wf-top-nav: could not load data.json", e);
      this._navItems = [];
    }
  }

  /**
   * Dispatches a "page-change" CustomEvent with the selected page slug,
   * and updates the active page state.
   */
 _handleNavClick(e, item) {
  e.preventDefault();
  this.activePage = item.slug;
  globalThis.location.hash = item.slug === "home" ? "" : item.slug;
  this.dispatchEvent(
    new CustomEvent("page-change", {
      detail: { page: item.slug, item },
      bubbles: true,
      composed: true,
    })
  );
}

_handleLogoClick() {
  const homeItem = this._navItems.find((i) => i.slug === "home") || {
    slug: "home",
    id: "wf-page-home",
    title: "Home",
  };
  this.activePage = "home";
  globalThis.location.hash = "";
  this.dispatchEvent(
    new CustomEvent("page-change", {
      detail: { page: "home", item: homeItem },
      bubbles: true,
      composed: true,
    })
  );
}

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          top: var(--ddd-spacing-0);
          z-index: 1000;
          width: 100%;
        }

        /* ── Outer bar ───────────────────────────────────────── */
        .nav-bar {
          display: flex;
          width: 100%;
          height: 160px;
          padding: var(--ddd-spacing-1) var(--ddd-spacing-25);
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          background: #ffee86;
          box-shadow: var(--ddd-boxShadow-sm);
        }

        /* ── Left: logo frame ───────────────────────────────── */
        .logo-frame {
          display: flex;
          width: 420px;
          align-items: center;
          gap: var(--ddd-spacing-3);
          flex-shrink: 0;
        }

        .logo-btn {
          background: none;
          border: none;
          padding: var(--ddd-spacing-0);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .logo-btn img {
          max-height: 130px;
          width: auto;
          object-fit: contain;
          transition: opacity 0.15s ease;
        }

        /* ── Right: nav links frame ─────────────────────────── */
        .nav-links {
          display: flex;
          width: 594px;
          align-items: flex-end;
          align-content: flex-end;
          gap: var(--ddd-spacing-10);
          flex-shrink: 0;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .nav-links a {
          position: relative;
          color: #01315f;
          text-decoration: none;
          font-family: var(--ddd-font-navigation, sans-serif);
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          padding: var(--ddd-spacing-1) 0;
          transition: color 0.2s ease;
        }

        .nav-links a:hover,
        .nav-links a:focus-visible {
          color: #ef4601;
          outline: none;
        }

        .nav-links a.active {
          color: #ef4601;
        }

        /* ── Responsive ─────────────────────────────────────── */
        @media (max-width: 900px) {
          .nav-bar {
            height: auto;
            min-height: 80px;
            padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
            flex-wrap: wrap;
            gap: var(--ddd-spacing-3);
          }

          .logo-frame {
            width: auto;
            max-width: 260px;
          }

          .logo-btn img {
            max-height: 60px;
          }

          .nav-links {
            width: auto;
            gap: var(--ddd-spacing-6);
            justify-content: flex-end;
          }

          .nav-links a {
            font-size: 1rem;
          }
        }
      `,
    ];
  }

  render() {
    const logoImg = this._logoHovered
      ? "./assets/Windward_Force_Logo_Blue.png"
      : "./assets/Windward_Force_Logo_Red.png";

    // Render all non-home items as nav links
    const navLinks = this._navItems
      .filter((item) => item.slug !== "home")
      .map(
        (item) => html`
          <a
            href="#${item.slug}"
            class=${this.activePage === item.slug ? "active" : ""}
            data-slug=${item.slug}
            @click=${(e) => this._handleNavClick(e, item)}
          >
            ${item.title}
          </a>
        `
      );

    return html`
      <nav class="nav-bar" aria-label="Main navigation">

        <!-- Logo → Home -->
        <div class="logo-frame">
          <button
            class="logo-btn"
            aria-label="Go to Home"
            @click=${this._handleLogoClick}
            @mouseenter=${() => { this._logoHovered = true; }}
            @mouseleave=${() => { this._logoHovered = false; }}
          >
            <img src="${logoImg}" alt="${this.logoAlt}" />
          </button>
        </div>

        <!-- Nav links (rendered from JSON) -->
        <div class="nav-links">
          ${navLinks}
        </div>

      </nav>
    `;
  }
}

globalThis.customElements.define(WfTopNav.tag, WfTopNav);