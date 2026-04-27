/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-event-card-details`
 *
 * Displays the location and attending teams dropdown for an event card.
 *
 * @demo index.html
 * @element wf-event-card-details
 */
class WfEventCardDetails extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-event-card-details";
  }

  static get properties() {
    return {
      ...super.properties,
      eventLocation: { type: String },
      attendingTeams: { type: Array },
      _open: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.eventLocation = "";
    this.attendingTeams = [];
    this._open = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          padding: 20px 15px;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--ddd-spacing-2);
          align-self: stretch;
          box-sizing: border-box;
        }

        .event-card-location {
          color: #000;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-xs);
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .event-card-teams {
          display: flex;
          width: 240px;
          height: 40px;
          padding: 0 20px;
          justify-content: space-between;
          align-items: center;
          border-radius: 10px;
          background: #ffee86;
          box-sizing: border-box;
          cursor: pointer;
          user-select: none;
        }

        .teams-label {
          color: #ef4601;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-xs);
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }

        .arrow-icon {
          display: flex;
          align-items: center;
          transition: transform 0.25s ease;
        }

        .arrow-icon.open {
          transform: rotate(180deg);
        }

        .arrow-icon svg {
          fill: none;
          stroke: #ef4601;
        }

        .dropdown-list {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-1);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-5) var(--ddd-spacing-1);
          width: 240px;
          box-sizing: border-box;
        }

        .dropdown-item {
          color: #000;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-3xs);
          font-weight: 400;
          line-height: 1.4;
          padding: 4px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }
      `,
    ];
  }

  _toggleDropdown() {
    this._open = !this._open;
  }

  render() {
    return html`
      <div class="event-card-location">📍 ${this.eventLocation}</div>

      <div class="event-card-teams" @click=${this._toggleDropdown}>
        <span class="teams-label">Attending Teams</span>
        <span class="arrow-icon ${this._open ? "open" : ""}">
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L8 8L15 1"
              stroke="#EF4601"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>

      ${this._open
        ? html`
            <div class="dropdown-list">
              ${this.attendingTeams.map(
                (team) => html`<div class="dropdown-item">${team}</div>`
              )}
            </div>
          `
        : ""}
    `;
  }
}

customElements.define(WfEventCardDetails.tag, WfEventCardDetails);