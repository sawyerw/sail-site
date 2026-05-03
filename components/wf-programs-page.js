/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-programs-page`
 *
 * Programs page content area for the Windward Force site.
 *
 * @demo index.html
 * @element wf-programs-page
 */
export class WfProgramsPage extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-programs-page";
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
          background: light-dark(white, #01315f);
        }

        /* ── Page Layout ── */
        .page-content {
          display: flex;
          padding: 30px;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          background: light-dark(white, #01315f);
          box-sizing: border-box;
          width: 100%;
        }

        /* ── Top Section: Text + Photo Side by Side ── */
        .youth-sailing-main {
          display: flex;
          width: 1380px;
          max-width: 100%;
          padding: var(--ddd-spacing-0) var(--ddd-spacing-10);
          justify-content: center;
          align-items: center;
          gap: 25px;
          box-sizing: border-box;
        }

        /* ── Left Text Box ── */
        .youth-sailing-main-text {
          display: flex;
          width: 531px;
          padding: 10px;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        .youth-heading {
          color: light-dark(#ef4601, #ffee86);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0;
        }

        .youth-subheading {
          color: light-dark(#01315f, white);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-m);
          margin: 0;
        }

        /* ── Right Photo ── */
        .youth-sailing-photo {
          flex: 1;
          min-width: 0;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          display: block;
          max-width: 100%;
          height: auto;
          
        }

        /* ── Description Text ── */
        .youth-description {
          width: 100%;
          max-width: 1380px;
          padding: var(--ddd-spacing-0) var(--ddd-spacing-15);
          box-sizing: border-box;
          color: var(--ddd-color-text-primary);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-s);
          margin: var(--ddd-spacing-0);
          line-height: 1.6;
        }

        /* ── Register Button ── */
        .register-btn {
          display: flex;
          width: 1380px;
          max-width: calc(100% - 80px);
          padding: var(--ddd-spacing-5) var(--ddd-spacing-25);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background: #ffee86;
          box-sizing: border-box;
          border: none;
          border-radius: 12px;
        }

        .register-btn:hover {
          background: #ef4601;
        }

        .register-btn:hover .register-text {
          color: #ffee86;
        }

        .register-text {
          color: #ef4601;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          margin: var(--ddd-spacing-0);
        }

        /* ── Tablet (≤ 900px) ── */
        @media (max-width: 900px) {
          .youth-sailing-main {
            width: 100%;
            gap: var(--ddd-spacing-5);
            align-items: center;
          }

          .youth-sailing-main-text {
            width: auto;
            flex: 1;
          }

          .youth-heading {
            font-size: var(--ddd-font-size-m);
          }

          .youth-subheading {
            font-size: var(--ddd-font-size-s);
          }

          .youth-sailing-photo {
            max-width: 340px;
          }

          .youth-description {
            padding: var(--ddd-spacing-0) var(--ddd-spacing-6);
          }

          .register-btn {
            max-width: calc(100% - 48px);
            padding: var(--ddd-spacing-6) var(--ddd-spacing-10);
          }
        }

        /* ── Mobile (≤ 600px) ── */
        @media (max-width: 600px) {
          .page-content {
            padding: var(--ddd-spacing-5) var(--ddd-spacing-4);
            gap: var(--ddd-spacing-6);
          }

          .youth-sailing-main {
            flex-direction: column;
            padding: 0;
            gap: var(--ddd-spacing-4);
            width: 100%;
          }

          .youth-sailing-main-text {
            width: 100%;
            padding: 0;
          }

          .youth-heading {
            font-size: var(--ddd-font-size-s);
          }

          .youth-subheading {
            font-size: var(--ddd-font-size-xs);
          }

          .youth-sailing-photo {
            width: 100%;
            max-width: 100%;
            aspect-ratio: 16 / 9;
          }

          .youth-description {
            padding: var(--ddd-spacing-0) var(--ddd-spacing-1);
            font-size: var(--ddd-font-size-xs);
          }

          .register-btn {
            max-width: 100%;
            padding: var(--ddd-spacing-4) var(--ddd-spacing-5);
          }

          .register-text {
            font-size: var(--ddd-font-size-m);
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="page-content">

        <!-- Top: Text + Photo -->
        <div class="youth-sailing-main">
          <div class="youth-sailing-main-text">
            <p class="youth-heading">Learn to sail this summer with our youth programs!</p>
            <p class="youth-subheading">Sessions run every two weeks between June - August</p>
          </div>
          <img
            class="youth-sailing-photo"
            src="../assets/sailing-kids.jpg"
            alt="Kids learning to sail on the water"
          />
        </div>

        <!-- Description Text -->
        <p class="youth-description">
          Our youth programs give kids a full two weeks on the water to learn the fundamentals
          of sailing in a hands-on, supportive environment. Led by experienced instructors from
          the Windward Force community, participants learn key boat terminology, essential safety
          skills—including how to safely capsize and recover—and the basics of racing. Sailors
          get experience in both smaller Sunfish and larger FJ boats, building confidence across
          different setups while developing teamwork and communication on the water. Each session
          runs all day and includes a scheduled lunch break, giving participants time to reset
          before getting back out to sail, learn, and improve.
        </p>

        <!-- Register Button -->
        <button class="register-btn" type="button">
          <p class="register-text">Register Now</p>
        </button>

      </div>
    `;
  }
}

globalThis.customElements.define(WfProgramsPage.tag, WfProgramsPage);