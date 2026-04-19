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
          height: 220px;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          gap: var(--ddd-spacing-5);
          background: #01315F;
          padding-top: var(--ddd-spacing-10);
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
          justify-content: center;
          align-items: center;
          gap: var(--ddd-spacing-3);
          align-self: stretch;
          background: #FFEE86;
          position: relative;
          height: 50px;
          flex-shrink: 0;
        }

        /* ── Copyright text ── */
        .footer__copyright {
          display: flex;
          width: 336px;
          height: 26px;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          left: var(--ddd-spacing-26);
          top: var(--ddd-spacing-3);
          color: #EF4601;
          font-family: var(--ddd-font-primary); 
          font-size: var(--ddd-font-size-4xs);
          margin: var(--ddd-spacing-0);
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