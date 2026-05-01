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
 * On mobile, nav links collapse into a hamburger dropdown.
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
    this._menuOpen = false;
  }

  static get properties() {
    return {
      ...super.properties,
      logoSrc: { type: String, attribute: "logo-src" },
      logoAlt: { type: String, attribute: "logo-alt" },
      activePage: { type: String, reflect: true },
      _logoHovered: { type: Boolean, state: true },
      _navItems: { type: Array, state: true },
      _menuOpen: { type: Boolean, state: true },
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
      const response = await fetch(new URL("../data.json", import.meta.url));
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
    this._menuOpen = false;
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
    this._menuOpen = false;
    globalThis.location.hash = "";
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: { page: "home", item: homeItem },
        bubbles: true,
        composed: true,
      })
    );
  }

  _toggleMenu() {
    this._menuOpen = !this._menuOpen;
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
          position: relative;
        }

        /* ── Left: logo frame ───────────────────────────────── */
        .logo-frame {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: var(--ddd-spacing-3);
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
          flex: 1;
          align-items: flex-end;
          align-content: flex-end;
          gap: var(--ddd-spacing-10);
          flex-shrink: 1;
          flex-wrap: wrap;
          justify-content: flex-end;
          min-width: 0;
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

        /* ── Hamburger button — hidden on desktop ───────────── */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--ddd-spacing-2);
          align-items: center;
          justify-content: center;
        }

        .hamburger-btn img {
          width: 36px;
          height: 36px;
        }

        /* ── Dropdown menu — hidden until open ──────────────── */
        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          right: var(--ddd-spacing-0);
          width: 100%;
          background: #01315f;
          flex-direction: column;
          z-index: 999;
          box-shadow: var(--ddd-boxShadow-sm);
        }

        .dropdown-menu.open {
          display: flex;
        }

        .dropdown-menu a {
          color: #ffffff;
          text-decoration: none;
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          padding: var(--ddd-spacing-5) var(--ddd-spacing-6);
          border-bottom: 1px solid var(--ddd-theme-default-slateLight);
          transition: background 0.15s ease;
        }

        .dropdown-menu a:last-child {
          border-bottom: none;
        }

        .dropdown-menu a:hover,
        .dropdown-menu a.active {
          background: #ef4601;
        }

        /* ── Shrink logo before links start wrapping ── */
        @media (max-width: 1100px) {
          .logo-btn img {
            max-height: 90px;
          }

          .nav-bar {
            padding: var(--ddd-spacing-1) var(--ddd-spacing-10);
          }
        }

        /* ── Tablet (≤ 950px) ── */
        @media (max-width: 950px) {
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

        /* ── Mobile (≤ 600px) — swap to hamburger ── */
        @media (max-width: 600px) {
          .nav-links {
            display: none;
          }

          .hamburger-btn {
            display: flex;
          }
        }
      `,
    ];
  }

  render() {
    const logoImg = this._logoHovered
      ? "./assets/Windward_Force_Logo_Blue.png"
      : "./assets/Windward_Force_Logo_Red.png";

    const nonHomeItems = this._navItems.filter((item) => item.slug !== "home");

    // Desktop nav links
    const navLinks = nonHomeItems.map(
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

    // Mobile dropdown links
    const dropdownLinks = nonHomeItems.map(
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

        <!-- Desktop nav links (rendered from JSON) -->
        <div class="nav-links">
          ${navLinks}
        </div>

        <!-- Hamburger button (mobile only) -->
        <button
          class="hamburger-btn"
          aria-label="Open navigation menu"
          aria-expanded=${this._menuOpen}
          @click=${this._toggleMenu}
        >
          <img src="./assets/icons8-hamburger-menu.svg" alt="Menu" />
        </button>

        <!-- Mobile dropdown -->
        <div class="dropdown-menu ${this._menuOpen ? "open" : ""}">
          ${dropdownLinks}
        </div>

      </nav>
    `;
  }
}

globalThis.customElements.define(WfTopNav.tag, WfTopNav);