// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { h } from '@stencil/core';
import { newSpecPage } from "@stencil/core/testing";
import { RoadWebcamListComponent } from "./road-webcam-list.component";
import { LanguageDataServiceMock } from "../../mocks/LanguageDataService.mock";

describe('noi-road-webcam-list', () => {
  it('should render component', async () => {

    RoadWebcamListComponent.prototype.init = function() {
      this.languageService = LanguageDataServiceMock();
    };

    const page = await newSpecPage({
      components: [RoadWebcamListComponent],
      template: () => (<noi-road-webcam-list></noi-road-webcam-list>),
    });


    expect(page.root).toEqualHtml(`
        <noi-road-webcam-list>
          <div class="title-wrapper">
            <div class="title ellipsis">
              <noi-icon class="title__icon" name="stations"></noi-icon>
              <span class="title__text">app.list.title</span>
            </div>
            <noi-input placeholder="app.list.search.placeholder"></noi-input>
          </div>
          <div class="list">
              <div class="no-data">app.list.empty</div>
          </div>
        </noi-road-webcam-list>
      `);
  });

  it('should render layout class: desktop', async () => {

    RoadWebcamListComponent.prototype.init = function() {
      this.languageService = LanguageDataServiceMock();
    };

    const page = await newSpecPage({
      components: [RoadWebcamListComponent],
      template: () => (<noi-road-webcam-list layout="desktop"></noi-road-webcam-list>),
    });

    expect(page.root.classList.contains('layout--desktop')).toBe(true);
  });

  it('should render layout class: tablet', async () => {

    RoadWebcamListComponent.prototype.init = function() {
      this.languageService = LanguageDataServiceMock();
    };

    const page = await newSpecPage({
      components: [RoadWebcamListComponent],
      template: () => (<noi-road-webcam-list layout="tablet"></noi-road-webcam-list>),
    });

    expect(page.root.classList.contains('layout--tablet')).toBe(true);
  });

  it('should render layout class: mobile', async () => {

    RoadWebcamListComponent.prototype.init = function() {
      this.languageService = LanguageDataServiceMock();
    };

    const page = await newSpecPage({
      components: [RoadWebcamListComponent],
      template: () => (<noi-road-webcam-list layout="mobile"></noi-road-webcam-list>),
    });


    expect(page.root.classList.contains('layout--mobile')).toBe(true);
  });
});
