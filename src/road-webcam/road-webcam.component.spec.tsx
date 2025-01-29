// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { h } from '@stencil/core';
import { RoadWebcamComponent } from "./road-webcam.component";
import { newSpecPage } from "@stencil/core/testing";
import { LanguageDataServiceMock } from "../mocks/LanguageDataService.mock";
import { WebcamDataServiceMock } from "../mocks/WebcamDataService.mock";

describe('noi-road-webcam', () => {
  it('should render component', async () => {

    RoadWebcamComponent.prototype.init = function() {
      this.languageService = LanguageDataServiceMock();
      this.webcamDataService = WebcamDataServiceMock();
    };

    RoadWebcamComponent.prototype._watchSize = () => null; // no ResizeObserver in mock

    const page = await newSpecPage({
      components: [RoadWebcamComponent],
      template: () => (<noi-road-webcam></noi-road-webcam>),
    });

    expect(page.root.shadowRoot).toEqualHtml(`
      <noi-road-webcam-list class="layout__list" layoutclass="layout" part="list"></noi-road-webcam-list>
      <div class="layout__center">
        <noi-brennerlec-map part="map"></noi-brennerlec-map>
        <noi-backdrop hidden=""></noi-backdrop>
      </div>
    `);
    expect(page.root.classList.contains('layout')).toBe(true);

  });


});
