/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./wf-team-card.js"; 

/**
 * `wf-teams-page`
 *
 * Teams page content area for the Windward Force site.
 *
 * @demo index.html
 * @element wf-teams-page
 */
export class WfTeamsPage extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-teams-page";
  }

  static get properties() {
    return {
      ...super.properties,
      teams: { type: Array },
    };
  }

  constructor() {
    super();
    this.teams = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch("./data.json")
      .then((r) => r.json())
      .then((data) => {
        this.teams = data.teams; 
      });
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
          background: light-dark(white, #01315f);
        }

        .page-content {
          width: 100%;
          min-height: 600px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--ddd-spacing-5);
          padding: var(--ddd-spacing-6);
        }
      `,
    ];
  }

  render() {
  return html`
    <div class="page-content">
      ${this.teams.map(
        (team) => html`<wf-team-card .team=${team}></wf-team-card>`
      )}
    </div>
  `;
}
}

globalThis.customElements.define(WfTeamsPage.tag, WfTeamsPage);
