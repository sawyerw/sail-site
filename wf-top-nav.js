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
 * Logo click navigates to Home. Nav links show active state
 * and a wavy wave underline on hover/active.
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
    // Track which page is active: "home" | "teams" | "regattas" | "programs"
    this.activePage = "home";
    this._logoHovered = false;
  }

  static get properties() {
    return {
      ...super.properties,
      logoSrc: { type: String, attribute: "logo-src" },
      logoAlt: { type: String, attribute: "logo-alt" },
      activePage: { type: String, reflect: true },
      _logoHovered: { type: Boolean, state: true },
    };
  }

  /**
   * Reads the URL hash and sets activePage accordingly.
   * No hash (or empty hash) = home.
   */
  _handleHashChange() {
    const hash = globalThis.location.hash.replace("#", "") || "home";
    this.activePage = hash;
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleHashChange();
    this._boundHashChange = this._handleHashChange.bind(this);
    globalThis.addEventListener("hashchange", this._boundHashChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    globalThis.removeEventListener("hashchange", this._boundHashChange);
  }

  _navigateTo(page) {
    this.activePage = page;
    // Fire a custom event so sail-site.js can swap the visible content
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: { page },
        bubbles: true,
        composed: true,
      })
    );
    globalThis.location.hash = page === "home" ? "" : page;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: sticky;
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

        /* Logo is a button so it's keyboard-accessible */
        .logo-btn {
          background: none;
          border: none;
          padding: 0;
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

        /* Base link style */
        .nav-links a {
          position: relative;
          color: #01315f;
          text-decoration: none;
          font-family: var(--ddd-font-navigation, sans-serif);
          font-size: var(--ddd-font-size-m);
          font-weight: var(--ddd-font-weight-bold);
          padding: var(--ddd-spacing-1) 0;
          /* Reserve space below text so the wave doesn't shift layout */
          padding-bottom: 10px;
          transition: color 0.2s ease;
        }

        /* Hover / focus */
        .nav-links a:hover,
        .nav-links a:focus-visible {
          color: #ef4601;
          outline: none;
        }

        .nav-links a:hover::after,
        .nav-links a:focus-visible::after {
          opacity: 1;
        }

        /* Active (current page) — stays red with wave */
        .nav-links a.active {
          color: #ef4601;
        }

        .nav-links a.active::after {
          opacity: 1;
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
    // Swap logo image on hover: red → blue
    const logoImg = this._logoHovered
      ? "./assets/Windward_Force_Logo_Blue.png"
      : "./assets/Windward_Force_Logo_Red.png";

    return html`
      <nav class="nav-bar" aria-label="Main navigation">

        <!-- Logo → Home -->
        <div class="logo-frame">
          <button
            class="logo-btn"
            aria-label="Go to Home"
            @click=${() => this._navigateTo("home")}
            @mouseenter=${() => { this._logoHovered = true; }}
            @mouseleave=${() => { this._logoHovered = false; }}
          >
            <img src="${logoImg}" alt="${this.logoAlt}" />
          </button>
        </div>

        <!-- Nav links -->
        <div class="nav-links">
          <a
            href="#teams"
            class=${this.activePage === "teams" ? "active" : ""}
            @click=${(e) => { e.preventDefault(); this._navigateTo("teams"); }}
          >Teams</a>
          <a
            href="#regattas"
            class=${this.activePage === "regattas" ? "active" : ""}
            @click=${(e) => { e.preventDefault(); this._navigateTo("regattas"); }}
          >Regattas</a>
          <a
            href="#programs"
            class=${this.activePage === "programs" ? "active" : ""}
            @click=${(e) => { e.preventDefault(); this._navigateTo("programs"); }}
          >Programs</a>
        </div>

      </nav>
    `;
  }
}

globalThis.customElements.define(WfTopNav.tag, WfTopNav);