// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { TimerWatcher } from "../utils/TimerWatcher";
import { WebcamDataService } from "../data/webcam/webcam-data-service";


export function WebcamDataServiceMock() {

  const _cameraListWatcher = new TimerWatcher(() => Promise.reject('should not be called'), 1000);
  _cameraListWatcher.subscribe = () => {
    return {unsubscribe: () => null};
  };

  const getRoutePathMock = jest.fn(() => Promise.resolve([]));

  return {
    cameraListWatcher: () => _cameraListWatcher,
    getRoutePath: getRoutePathMock,
    getCameraList: () => Promise.reject('should not be called'),
  } as WebcamDataService;
}
