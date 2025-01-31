// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// mocks should come before other imports
import "../mocks";

import { h } from '@stencil/core';
import { RoadWebcamComponent } from "./road-webcam.component";
import { newSpecPage } from "@stencil/core/testing";

describe('noi-road-webcam', () => {
  it('should render component', async () => {

    RoadWebcamComponent.prototype._watchSize = () => null; // no ResizeObserver in mock

    const page = await newSpecPage({
      components: [RoadWebcamComponent],
      template: () => (<noi-road-webcam></noi-road-webcam>),
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
