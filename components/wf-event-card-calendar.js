/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-event-card-calendar`
 *
 * Displays the date and time pills for an event card.
 *
 * @demo index.html
 * @element wf-event-card-calendar
 */
class WfEventCardCalendar extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-event-card-calendar";
  }

  static get properties() {
    return {
      ...super.properties,
      eventDate: { type: String },
      eventTime: { type: String },
    };
  }

  constructor() {
    super();
    this.eventDate = "";
    this.eventTime = "";
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          padding: 4px 15px;
          justify-content: center;
          align-items: flex-start;
          gap: var(--ddd-spacing-5);
        }

        .event-card-date {
          display: inline-flex;
          padding: 10px 20px;
          align-items: center;
          gap: var(--ddd-spacing-2);
          border-radius: 10px;
          background: #ef4601;
        }

        .event-card-time {
          display: inline-flex;
          padding: 10px 20px;
          align-items: center;
          gap: var(--ddd-spacing-2);
          border-radius: 10px;
          background: #01315f;
        }

        .label {
          color: #fff;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-3xs);
          font-style: normal;
          font-weight: 700;
          line-height: 20px;
          white-space: nowrap;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="event-card-date">
        <span class="label">${this.eventDate}</span>
      </div>
      <div class="event-card-time">
        <span class="label">${this.eventTime}</span>
      </div>
    `;
  }
}

customElements.define(WfEventCardCalendar.tag, WfEventCardCalendar);