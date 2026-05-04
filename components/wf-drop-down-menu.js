/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `wf-drop-down-menu`
 *
 * Reusable dropdown menu component used in two contexts:
 *
 *   1. variant="mobile" — full-width hamburger menu. Programs item expands
 *      into a tree of sub-items when clicked; sub-items are hidden until then.
 *
 *   2. variant="programs" — narrow desktop submenu that appears directly
 *      beneath the Programs nav link when hovered.
 *
 * Props:
 *   - items:    Array of { label, slug, disabled } top-level items
 *   - subItems: Array of { label, slug, disabled } shown under Programs
 *   - open:     Boolean — controls overall visibility
 *   - variant:  "mobile" | "programs"
 *
 * Dispatches "dropdown-select" CustomEvent with { slug } on navigable click.
 *
 * @element wf-drop-down-menu
 */
export class WfDropDownMenu extends DDDSuper(LitElement) {
  static get tag() {
    return "wf-drop-down-menu";
  }

  constructor() {
    super();
    this.items = [];
    this.subItems = [];
    this.open = false;
    this.variant = "mobile";
    this._programsExpanded = false;
  }

  static get properties() {
    return {
      ...super.properties,
      items: { type: Array },
      subItems: { type: Array },
      open: { type: Boolean, reflect: true },
      variant: { type: String, reflect: true },
      _programsExpanded: { type: Boolean, state: true },
    };
  }

  _handleItemClick(e, item) {
    e.preventDefault();

    // In mobile, Programs toggles its sub-tree instead of navigating
    if (this.variant === "mobile" && item.slug === "programs") {
      this._programsExpanded = !this._programsExpanded;
      return;
    }

    // Disabled items do nothing
    if (item.disabled) return;

    this.dispatchEvent(
      new CustomEvent("dropdown-select", {
        detail: { slug: item.slug, item },
        bubbles: true,
        composed: true,
      })
    );
  }

  _renderSubItems() {
    return this.subItems.map((sub) => html`
        <a
        class="dropdown-item sub-item ${sub.disabled ? "disabled" : ""}"
        href=${sub.disabled ? "#" : "#" + sub.slug}
        @click=${(e) => this._handleSubItemClick(e, sub)}
        >
        ${sub.label}
        </a>
    `);
    }

    _handleSubItemClick(e, sub) {
    e.preventDefault();
    if (sub.disabled) return;
    this.dispatchEvent(
        new CustomEvent("dropdown-select", {
        detail: { slug: sub.slug, item: sub },
        bubbles: true,
        composed: true,
        })
    );
    }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: none;
        }

        :host([open]) {
          display: block;
        }

        /* ── Shared item base ── */
        .dropdown-item {
          display: block;
          color: white;
          text-decoration: none;
          font-family: var(--ddd-font-navigation, sans-serif);
          font-weight: var(--ddd-font-weight-bold);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          border-bottom: 1px solid #ffffff30;
          box-sizing: border-box;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: #ef4601;
          color: #ffffff;
        }

        .dropdown-item.active {
          background: #ef4601;
        }

        /* Disabled items hover red but no special cursor */
        .dropdown-item.disabled {
          opacity: 0.85;
        }

        /* ── Mobile variant ── */
        :host([variant="mobile"]) .dropdown-wrapper {
          width: 100%;
          background: #01315f;
          box-shadow: var(--ddd-boxShadow-sm);
          display: flex;
          flex-direction: column;
        }

        :host([variant="mobile"]) .dropdown-item {
          font-size: var(--ddd-font-size-m);
          padding: var(--ddd-spacing-5) var(--ddd-spacing-6);
        }

        /* Sub-items indented under Programs in mobile tree */
        :host([variant="mobile"]) .sub-item {
          font-size: var(--ddd-font-size-s);
          padding-left: var(--ddd-spacing-12);
          background: #012a50;
        }

        :host([variant="mobile"]) .sub-item:hover {
          background: #ef4601;
        }

        /* ── Programs desktop variant ── */
        :host([variant="programs"]) .dropdown-wrapper {
            background: #01315f;
            box-shadow: var(--ddd-boxShadow-sm);
            display: flex;
            flex-direction: column;
            min-width: 220px;
            border-top: 3px solid #ef4601;
            right: var(--ddd-spacing-0);
            left: auto;
            white-space: nowrap;
            width: max-content;
            }

        :host([variant="programs"]) .dropdown-item {
          font-size: var(--ddd-font-size-xs);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-5);
          white-space: nowrap;
        }
      `,
    ];
  }

  render() {
    if (this.variant === "programs") {
      // Desktop: flat list of all four sub-items
      return html`
        <div class="dropdown-wrapper" role="menu">
          ${this._renderSubItems()}
        </div>
      `;
    }

    // Mobile: top-level items, Programs expands sub-tree on click
    return html`
      <div class="dropdown-wrapper" role="menu">
        ${this.items.map((item) => html`
          <a
            class="dropdown-item ${item.active ? "active" : ""}"
            href=${item.slug === "programs" ? "#" : "#" + item.slug}
            @click=${(e) => this._handleItemClick(e, item)}
          >
            ${item.label}
          </a>
          ${item.slug === "programs" && this._programsExpanded
            ? this._renderSubItems()
            : ""}
        `)}
      </div>
    `;
  }
}

globalThis.customElements.define(WfDropDownMenu.tag, WfDropDownMenu);