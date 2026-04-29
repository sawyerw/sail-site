/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./wf-event-card.js";

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

  static get properties() {
    return {
      ...super.properties,
      // Populated by fetching data.json on connect
      _events: { type: Array, state: true },
    };
  }

  constructor() {
    super();
    this._events = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      const response = await fetch("./data.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      this._events = json.events ?? [];
    } catch (err) {
      console.error("wf-regattas-page: failed to load events", err);
    }
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

        .cards-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-6);
          padding: var(--ddd-spacing-10) var(--ddd-spacing-10);
          justify-content: flex-start;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="page-content">
        <div class="cards-grid">
          ${this._events.map(
            (event) => html`<wf-event-card .event=${event}></wf-event-card>`
          )}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(WfRegattasPage.tag, WfRegattasPage);