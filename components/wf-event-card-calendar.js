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
  width: 100%;
  padding: var(--ddd-spacing-1) var(--ddd-spacing-0);
  justify-content: center;
  align-items: flex-start;
  gap: var(--ddd-spacing-3);
  box-sizing: border-box;
  flex-wrap: nowrap; /* prevent stacking */
}

.event-card-date {
  display: inline-flex;
  padding: var(--ddd-spacing-3);
  align-items: center;
  gap: var(--ddd-spacing-1);
  border-radius: var(--ddd-radius-md);
  background: light-dark(#01315f, #EF4601);
  flex: 1 1 auto; /* allow it to grow and wrap internally */
  min-width: 0;
  box-sizing: border-box;
}

.event-card-time {
  display: inline-flex;
  padding: var(--ddd-spacing-3);
  align-items: center;
  gap: var(--ddd-spacing-1);
  border-radius: 10px;
  background: light-dark(#01315f, #EF4601);
  flex: 0 0 auto; /* keep size, don’t force wrap */
  box-sizing: border-box;
}

.label {
  color: white;
  font-family: var(--ddd-font-primary);
  font-size: var(--ddd-font-size-3xs);
  font-style: normal;
  font-weight: var(--ddd-font-weight-bold);
  white-space: normal; /* allow wrapping inside date */
  word-break: break-word;
  overflow-wrap: break-word;
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