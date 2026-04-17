/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./wf-top-nav.js";

/**
 * `sail-site`
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
    this.addEventListener("page-change", (e) => {
    this.currentPage = e.detail.page; // use this to show/hide sections
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }


  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--sail-site-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
  return html`
    <wf-top-nav logo-src="./assets/Windward_Force_Logo_Red.png"></wf-top-nav>
    <div class="wrapper">
      <slot></slot>
    </div>
  `;
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