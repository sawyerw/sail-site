/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./components/wf-top-nav.js";
import "./components/wf-footer.js";
import "./components/wf-home-page.js";
import "./components/wf-teams-page.js";
import "./components/wf-regattas-page.js";
import "./components/wf-programs-page.js";

/**
 * `sail-site`
 *
 * Root shell element. Renders wf-top-nav at the top, the active page
 * in the middle, and wf-footer at the bottom. Listens for "page-change"
 * events bubbling up from wf-top-nav and swaps the visible page element.
 *
 * @demo index.html
 * @element sail-site
 */
export class SailSite extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "sail-site";
  }

  constructor() {
  super();
  this.title = "";
  this.activePage = globalThis.location.hash.replace("#", "") || "home";
  this.t = this.t || {};
  this.t = {
    ...this.t,
    title: "Title",
  };
  this.registerLocalization({
    context: this,
    localesPath:
      new URL("./locales/sail-site.ar.json", import.meta.url).href +
      "/../",
  });
}

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      activePage: { type: String, reflect: true },
    };
  }

  connectedCallback() {
  super.connectedCallback();
  this._boundPageChange = this._handlePageChange.bind(this);
  this._boundHashChange = () => {
    this.activePage = globalThis.location.hash.replace("#", "") || "home";
  };
  this.addEventListener("page-change", this._boundPageChange);
  globalThis.addEventListener("hashchange", this._boundHashChange);
}

disconnectedCallback() {
  super.disconnectedCallback();
  this.removeEventListener("page-change", this._boundPageChange);
  globalThis.removeEventListener("hashchange", this._boundHashChange);
}

  /**
   * Receives "page-change" CustomEvent from wf-top-nav and
   * updates activePage to swap the rendered content element.
   */
  _handlePageChange(e) {
    this.activePage = e.detail.page;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          color: var(--ddd-theme-primary);
          background-color: transparent;
          font-family: var(--ddd-font-navigation);
        }

        /* Page content sits between nav and footer with no gap */
        .page-slot {
          flex: 1 0 auto;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .page-slot > * {
          flex: 1 0 auto;
        }
      `,
    ];
  }

  render() {
    return html`
      <wf-top-nav
        logo-src="./assets/Windward_Force_Logo_Red.png"
        .activePage=${this.activePage}
      ></wf-top-nav>

      <div class="page-slot">
        ${this._renderPage()}
      </div>

      <wf-footer></wf-footer>
    `;
  }

  /**
   * Returns the correct page element based on activePage.
   * Uses an explicit switch so Lit can efficiently diff templates.
   */
  _renderPage() {
    switch (this.activePage) {
      case "teams":
        return html`<wf-teams-page></wf-teams-page>`;
      case "regattas":
        return html`<wf-regattas-page></wf-regattas-page>`;
      case "programs":
        return html`<wf-programs-page></wf-programs-page>`;
      case "home":
      default:
        return html`<wf-home-page></wf-home-page>`;
    }
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(SailSite.tag, SailSite);