/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-team-card`
 *
 * Displays a single team card populated from data.json.
 * Place on the teams page; pass the team object directly as a property
 * or let wf-teams-page handle fetching and stamp one card per entry.
 *
 * @demo index.html
 * @element wf-team-card
 */
class WfTeamCard extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-team-card";
  }

  static get properties() {
    return {
      ...super.properties,
      // The full team object from data.json
      team: { type: Object },
    };
  }

  constructor() {
    super();
    this.team = {};
  }

  static get styles() {
    return [
      super.styles,
      css`
        /* ── Host ─────────────────────────────────────────────── */
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Desktop / Tablet bar ─────────────────────────────── */
        .team-card {
          display: flex;
          width: 100%;
          max-width: 1325px;
          min-height: 124px;
          height: auto;
          padding: var(--ddd-spacing-6) var(--ddd-spacing-10);
          justify-content: space-between;
          align-items: center;
          gap: var(--ddd-spacing-5);
          border-radius: var(--ddd-radius-xl);
          border: 8px solid light-dark(#01315f, white);
          background: light-dark(white, #01315f);
          box-sizing: border-box;
          margin: 0 auto;
          flex-wrap: nowrap;
        }

        /* ── Logo box ─────────────────────────────────────────── */
        .logo-box {
          flex: 0 0 72px;
          width: 72px;
          height: 72px;
          border-radius: var(--ddd-radius-sm);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: light-dark(#f4f4f4, #012a52);
        }

        .logo-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* ── Name block (team name + commodore stacked) ───────── */
        .name-block {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--ddd-spacing-1);
          flex: 1 1 auto;
          min-width: 0;
        }

        .team-name {
          color: light-dark(#ef4601, #ffee86);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-ml);
          font-weight: var(--ddd-font-weight-bold);
          word-break: break-word;
        }

        /* ── Commodore ────────────────────────────────────────── */
        .commodore {
          color: var(--ddd-color-primary);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          word-break: break-word;
        }

        /* ── Location stack ───────────────────────────────────── */
        .team-location-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-2);
          flex: 0 1 auto;
          min-width: 0;
        }

        .team-location-stack span {
          color: var(--ddd-color-primary);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-4xs);
          text-align: center;
          word-break: break-word;
        }

        /* ── Contact stack ────────────────────────────────────── */
        .team-contact-stack {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          border-radius: var(--ddd-radius-sm);
          background: #ffee86;
          min-height: 86px;
          flex: 0 1 auto;
          min-width: 0;
        }

        .contact-label {
          color: #ef4601;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-bold);
        }

        .contact-info {
          color: black;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-medium);
          word-break: break-all;
        }

        /* ── Mobile card ──────────────────────────────────────── */
        @media (max-width: 600px) {
          .team-card {
            flex-direction: column;
            width: 100%;
            max-width: 340px;
            min-height: 409px;
            height: auto;
            padding: var(--ddd-spacing-6) var(--ddd-spacing-8);
            justify-content: flex-start;
            align-items: center;
            gap: var(--ddd-spacing-5);
          }

          .logo-box {
            flex: 0 0 120px;
            width: 120px;
            height: 120px;
          }

          .name-block {
            align-items: center;
            text-align: center;
          }

          .team-name {
            font-size: var(--ddd-font-size-xs);
          }

          .commodore {
            font-size: var(--ddd-font-size-s);
          }

          .team-location-stack {
            align-items: center;
            text-align: center;
          }

          .team-location-stack span {
            font-size: var(--ddd-font-size-4xs);
          }

          .team-contact-stack {
            align-items: center;
            width: 100%;
          }
        }
      `,
    ];
  }

  render() {
    const {
      teamName = "",
      teamCity = "",
      clubLocation = "",
      clubAddress = "",
      email = "",
      instagram = "",
      commodore = "",
      logo = "",
    } = this.team;

    return html`
      <div class="team-card">
        <!-- Logo -->
        <div class="logo-box">
          <img
            src=${logo}
            alt="${teamName} logo"
            loading="lazy"
            width="72"
            height="72"
          />
        </div>

        <!-- Team Name + Commodore -->
        <div class="name-block">
          <span class="team-name">${teamName}</span>
          <span class="commodore">Commodore: ${commodore}</span>
        </div>

        <!-- Location Stack -->
        <div class="team-location-stack">
          <span>${teamCity}</span>
          <span>${clubLocation}</span>
          <span>${clubAddress}</span>
        </div>

        <!-- Contact Stack -->
        <div class="team-contact-stack">
          <span class="contact-label">Contact</span>
          <span class="contact-info">${instagram}</span>
          <span class="contact-info">${email}</span>
        </div>
      </div>
    `;
  }
}

customElements.define(WfTeamCard.tag, WfTeamCard);