// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { TimerWatcher } from "../../../utils/TimerWatcher";


export class WebcamDataService {
  cameraListWatcher() {
    return new TimerWatcher(() => Promise.reject('not expected'), 1000);
  }

  getRoutePath() {
    return jest.fn(() => Promise.resolve([]));
  }

  getCameraList() {
    return Promise.reject('not expected');
  }
}
