/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-regattas-page`
 *
 * Regattas page content area for the Windward Force site.
 *
 * @demo index.html
 * @element wf-regattas-page
 */
export class WfRegattasPage extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-regattas-page";
  }

  constructor() {
    super();
  }

  static get properties() {
    return {
      ...super.properties,
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
          min-height: 600px;
          box-sizing: border-box;
          background: #ffffff;
        }

        .page-content {
          width: 100%;
          min-height: 600px;
          box-sizing: border-box;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="page-content">
        <!-- Regattas page content goes here -->
      </div>
    `;
  }
}

globalThis.customElements.define(WfRegattasPage.tag, WfRegattasPage);