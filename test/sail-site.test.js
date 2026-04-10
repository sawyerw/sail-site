import { html, fixture, expect } from '@open-wc/testing';
import "../sail-site.js";

describe("SailSite test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <sail-site
        title="title"
      ></sail-site>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
