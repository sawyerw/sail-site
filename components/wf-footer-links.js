/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class WfFooterLinks extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-footer-links";
  }

  constructor() {
    super();
    this._navItems = [];
  }

  static get properties() {
    return {
      ...super.properties,
      _navItems: { type: Array, state: true },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._loadNavItems();
  }

  /**
   * Fetches the same data.json used by wf-top-nav and builds
   * the page link list, sorted by the "order" field.
   */
  async _loadNavItems() {
    try {
      const response = await fetch(new URL("./data.json", import.meta.url));
      const data = await response.json();
      this._navItems = [...data.items].sort(
        (a, b) => Number(a.order) - Number(b.order)
      );
    } catch (e) {
      console.warn("wf-footer-links: could not load data.json", e);
      this._navItems = [];
    }
  }

  /**
   * Dispatches a "page-change" CustomEvent — same pattern as wf-top-nav.
   */
  _handleNavClick(item) {
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: { page: item.slug, item },
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
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
          overflow: hidden;
        }

        .footer-links {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
        }

        .footer-links__browse {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: var(--ddd-spacing-5) var(--ddd-spacing-12);
          height: 150px;
          box-sizing: border-box;
        }

        .footer-links__pages {
          display: flex;
          flex-direction: column;
          color: #fff;
          text-align: right;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-3xs);
          font-weight: var(--ddd-font-weight-bold);
          line-height: 30px;
        }

        .footer-links__page-link {
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .footer-links__page-link:hover {
          color: #FFEE86;
        }

        .footer-links__connect {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 22px 47px;
          height: 172px;
          box-sizing: border-box;
          gap: var(--ddd-spacing-3);
        }

        .footer-links__social img {
          display: block;
          width: 28px;
          height: 28px;
          object-fit: contain;
          transition: opacity 0.2s ease;
        }

        .footer-links__social:hover img {
          opacity: 0.75;
        }
      `,
    ];
  }

  render() {
    const pageLinks = this._navItems.map(
      (item) => html`
        <span
          class="footer-links__page-link"
          @click=${() => this._handleNavClick(item)}
        >
          ${item.title}
        </span>
      `
    );

    return html`
      <div class="footer-links">
        <div class="footer-links__browse">
          <nav class="footer-links__pages">
            ${pageLinks}
          </nav>
        </div>
        <div class="footer-links__connect">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="footer-links__social">
            <img src="assets/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" class="footer-links__social">
            <img src="assets/tiktok-icon.png" alt="TikTok" />
          </a>
          <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer" class="footer-links__social">
            <img src="assets/x-icon.png" alt="X" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="footer-links__social">
            <img src="assets/youtube-icon.png" alt="YouTube" />
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define(WfFooterLinks.tag, WfFooterLinks);