// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// mocks should come before other imports
import "../mocks";

import { h } from '@stencil/core';
import { BrennerlecComponent } from "./brennerlec.component";
import { newSpecPage } from "@stencil/core/testing";

describe('noi-brennerlec', () => {
  it('should render component', async () => {

    BrennerlecComponent.prototype._watchSize = () => null; // no ResizeObserver in mock

    const page = await newSpecPage({
      components: [BrennerlecComponent],
      template: () => (<noi-brennerlec></noi-brennerlec>),
    });

    expect(page.root.shadowRoot).toEqualHtml(`
      <noi-road-webcam-list class="layout__list" part="list" layout="mobile"></noi-road-webcam-list>
      <div class="layout__center">
        <noi-brennerlec-map part="map"></noi-brennerlec-map>
        <noi-backdrop hidden=""></noi-backdrop>
      </div>
    `);
    expect(page.root.classList.contains('layout')).toBe(true);

  });


});
