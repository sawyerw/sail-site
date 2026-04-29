/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./wf-event-card-calendar.js";
import "./wf-event-card-details.js";

/**
 * `wf-event-card`
 *
 * Displays a single regatta event card populated from data.json.
 * Place on the regattas page; pass the event object directly as a property
 * or let wf-regattas-page handle fetching and stamp one card per entry.
 *
 * @demo index.html
 * @element wf-event-card
 */
class WfEventCard extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-event-card";
  }

  static get properties() {
    return {
      ...super.properties,
      // The full event object from data.json
      event: { type: Object },
    };
  }

  constructor() {
    super();
    this.event = {};
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block; /* prevents inline flex behavior that syncs heights */
          }

          .event-card {
            display: flex;
            width: 300px;
            padding: 20px 15px;
            flex-direction: column;
            align-items: center;
            border-radius: 30px;
            gap: var(--ddd-spacing-5);
            border: 8px solid #5f92a5;
            background: #fff;
            box-sizing: border-box;

            /* key fixes */
            height: auto;          /* allow independent height */
            align-self: flex-start; /* prevents stretching to match siblings */
          }

        wf-event-card-calendar {
          width: 100%;
        }

        .event-name {
          color: #000;
          text-align: center;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-m);
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      `,
    ];
  }

  render() {
    const {
      eventName = "",
      eventDate = "",
      eventTime = "",
      eventLocation = "",
      attendingTeams = [],
    } = this.event;

    return html`
      <div class="event-card">
        <wf-event-card-calendar
          eventDate=${eventDate}
          eventTime=${eventTime}
        ></wf-event-card-calendar>

        <span class="event-name">${eventName}</span>

        <wf-event-card-details
          eventLocation=${eventLocation}
          .attendingTeams=${attendingTeams}
        ></wf-event-card-details>
      </div>
    `;
  }
}

customElements.define(WfEventCard.tag, WfEventCard);