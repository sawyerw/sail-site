/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./wf-footer-links.js";
import "./wf-footer-credit.js";

class WfFooter extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-footer";
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
        }

        /* ── Main blue container ── */
        .footer {
          display: flex;
          width: 100%;
          min-height: 200px;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          gap: var(--ddd-spacing-5);
          background: #01315f;
          padding-top: var(--ddd-spacing-10);
          border-top: 3px solid white;
          box-sizing: border-box;
        }

        /* ── Row holding credit + links ── */
        .footer__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: var(--ddd-spacing-0) var(--ddd-spacing-26);
          box-sizing: border-box;
          flex: 1;
          padding-top: var(--ddd-spacing-5);
        }

        /* ── Yellow stripe ── */
        .footer__stripe {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          align-self: stretch;
          background: #FFEE86;
          position: relative;
          height: 50px;
          flex-shrink: 0;
          padding: 0 var(--ddd-spacing-26);
          box-sizing: border-box;
        }

        /* ── Copyright text ── */
        .footer__copyright {
          color: #EF4601;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-4xs);
          margin: var(--ddd-spacing-0);
          white-space: nowrap;
        }

        /* ── Tablet (≤ 900px) ── */
        @media (max-width: 900px) {
          .footer__content {
            padding: var(--ddd-spacing-5) var(--ddd-spacing-6);
            gap: var(--ddd-spacing-4);
          }

          .footer__stripe {
            padding: 0 var(--ddd-spacing-6);
          }
        }

        /* ── Mobile (≤ 600px) ── */
        @media (max-width: 600px) {
          .footer__content {
            flex-direction: column;
            align-items: flex-start;
            padding: var(--ddd-spacing-4) var(--ddd-spacing-4);
            gap: var(--ddd-spacing-4);
          }

          .footer__stripe {
            padding: 0 var(--ddd-spacing-4);
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="footer">
        <div class="footer__content">
          <wf-footer-credit></wf-footer-credit>
          <wf-footer-links></wf-footer-links>
        </div>

        <div class="footer__stripe">
          <p class="footer__copyright">
            © 2026 Windward Force. All rights reserved
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define(WfFooter.tag, WfFooter);