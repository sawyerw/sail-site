/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class WfFooterCredit extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-footer-credit";
  }

  static get styles() {
    return [
      super.styles,
      css`
        /* ── Host stacks logo and text vertically, aligned left ── */
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          flex-shrink: 0;
        }

        .footer-credit {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: var(--ddd-spacing-2);
        }

        /* ── Logo capped at 80px tall, proportional width ── */
        .footer-credit__logo {
          max-height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .footer-credit__text {
          width: 261px;
          color: #fff;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-bold);
          margin: var(--ddd-spacing-0);
        }

        /* ── Tablet (≤ 900px) ── */
        @media (max-width: 900px) {
          .footer-credit__logo {
            max-height: 60px;
          }

          .footer-credit__text {
            width: auto;
          }
        }

        /* ── Mobile (≤ 600px) ── */
        @media (max-width: 600px) {
          .footer-credit__logo {
            max-height: 50px;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="footer-credit">
        <img
          src="assets/Windward_Force_Logo_White.png"
          alt="Windward Force Logo"
          class="footer-credit__logo"
        />
        <p class="footer-credit__text">Powered by Sawyer Wright ;)</p>
      </div>
    `;
  }
}

customElements.define(WfFooterCredit.tag, WfFooterCredit);