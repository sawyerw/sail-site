/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-home-page`
 *
 * Home page content area for the Windward Force site.
 *
 * @demo index.html
 * @element wf-home-page
 */
export class WfHomePage extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-home-page";
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

        .page-content {
          width: 100%;
          min-height: 600px;
          box-sizing: border-box;
        }

        /* ── Hero Banner ── */
        .sail-hero-pic {
          display: flex;
          height: 400px;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          flex-shrink: 0;
          align-self: stretch;
          background: url("../assets/women-sailing.jpg") lightgray 50% / cover no-repeat;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* shade sits above dim layer */
        .sail-hero-shade {
          position: relative;
          display: flex;
          padding: var(--ddd-spacing-0) var(--ddd-spacing-25);
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: var(--ddd-spacing-3);
          flex: 1 0 0;
          align-self: stretch;
          background: #01315f99; /* 60% opacity */
          box-sizing: border-box;
        }

        /* text sits on top of everything */
        .sail-hero-text {
          position: relative;
          max-width: 718px;
          width: fit-content;
          color: white;
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-xxl);
          font-style: normal;
          font-weight: var(--ddd-font-weight-bold);
          line-height: 1.15;
          background: #01315fcc; /* 80% opacity */
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        }

        /* ── About Section ── */
        .about-section {
          display: flex;
          width: 100%;
          max-width: 1240px;
          min-height: 382px;
          padding: var(--ddd-spacing-10) var(--ddd-spacing-25);
          flex-direction: column;
          align-items: flex-start;
          gap: var(--ddd-spacing-4);
          flex-shrink: 0;
          box-sizing: border-box;
          margin: auto;
        }

        .about-heading {
          color: light-dark(#ef4601, #ffee86);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          margin: var(--ddd-spacing-0);
        }

        .about-body {
          color: var(--ddd-color-text-primary);
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-s);
        }

        /* ── Tablet (≤ 900px) ── */
        @media (max-width: 900px) {
          .sail-hero-shade {
            padding: 0 var(--ddd-spacing-12);
          }

          .about-section {
            padding: var(--ddd-spacing-4) var(--ddd-spacing-25);
          }
        }

        /* ── Mobile / iPhone (≤ 600px) ── */
        @media (max-width: 600px) {
          .sail-hero-pic {
            height: 260px;
          }

          .sail-hero-shade {
            padding: 0 var(--ddd-spacing-5);
          }

          .sail-hero-text {
            width: 100%;
            font-size: var(--ddd-font-size-m);
          }

          .about-section {
            padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          }

           .about-heading {
              font-size: var(--ddd-font-size-s);  
            }
            .about-body {
              font-size: var(--ddd-font-size-xs);  
            }
        }
      `,
    ];
  }

  render() {
  return html`
    <div class="page-content">
      <!-- Hero Banner -->
      <div class="sail-hero-pic" role="img" aria-label="Women sailing on the water">
        <div class="sail-hero-shade">
          <p class="sail-hero-text">
            Catch the Wind.<br />Find Your Course.
          </p>
        </div>
      </div>

      <!-- About Us Section -->
      <div class="about-section">
        <h2 class="about-heading">About Us</h2>
        <p class="about-body">
          Windward Force is a sailing league built for high school and college
          clubs, as well as individual students, who want to get on the water,
          learn fast, and race without the pressure of elite competition. We
          focus on the fundamentals—boat handling, teamwork, and race
          strategy—while keeping the experience social and accessible. Whether
          you're brand new or building confidence, Windward Force gives you a
          place to improve, compete, and find your love for sailing.
        </p>
      </div>
    </div>
  `;
}
}

globalThis.customElements.define(WfHomePage.tag, WfHomePage);