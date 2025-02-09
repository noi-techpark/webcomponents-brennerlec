// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListResponse } from "../ListResponse";
import { WebcamInfo } from "./WebcamInfo";
import { WebcamInfoShort } from "./WebcamInfoShort";
import { TimerWatcher } from "../../utils/TimerWatcher";
import { translateProperty } from "../language/translateProperty";
import { getAssetPath } from "../../utils/asset-path";

/**
 * Default interval to reload data
 * 1 minute
 */
const RELOAD_INTERVAL_DEFAULT = 60 * 1000;
/**
 * Minimum interval to reload data
 * 10 seconds
 */
const RELOAD_INTERVAL_MIN = 10 * 1000;

// origin is used to track usage and traffic patterns
const ORIGIN = 'webcomp-brennerlec';

export class WebcamDataService {

  // getCameraList(opts?:{pagesize?:number}) {
  getCameraList(lang: string) {
    const roadName = 'a22';
    const requestDate = new Date();
    return fetch(`https://api.tourism.testingmachine.eu/v1/WebcamInfo?origin=${ORIGIN}&source=${roadName}&pagesize=-1`)
      .then(r => r.json() as Promise<ListResponse<WebcamInfo>>)
      .then(r => r.Items)
      .then(r => {
        return r
          .map(wc => _convertToShortInfo(wc, roadName, requestDate, lang))
          .filter(v => !!v);
      })
      .then(r => {
        return r.sort((a, b) => a.distanceFromRoadStart - b.distanceFromRoadStart);
      });
  }

  cameraListWatcher(lang: string, interval = RELOAD_INTERVAL_DEFAULT) {
    interval = interval || RELOAD_INTERVAL_DEFAULT; // null value doesn't set default value, so we assign it manually
    if (interval < RELOAD_INTERVAL_MIN) {
      console.warn(`Reload interval cannot be less than ${RELOAD_INTERVAL_MIN}ms`);
      interval = RELOAD_INTERVAL_MIN;
    }
    return new TimerWatcher(() => {
      return this.getCameraList(lang);
    }, interval);
  }

  getRoutePath() {
    const dataPath = getAssetPath('data_a22-1km.json');
    // console.log('[WebcamDataService] dataPath', dataPath);
    return fetch(dataPath)
      .then(r => r.json() as Promise<Array<{ lat: number, lng: number }>>);
  }

}


function _convertToShortInfo(info: WebcamInfo, roadName: string, requestDate: Date, lang = 'it'): WebcamInfoShort {
  const position = (info.GpsInfo || []).find(gi => gi.Gpstype === 'position');
  if ( !position) {
    console.warn('Skip camera data with no camera position', info.Id);
    return null;
  }

  const image = (info.ImageGallery || []).find(ig => !!ig.ImageUrl);
  if ( !image) {
    console.warn('Skip camera data with no image', info.Id);
    return null;
  }

  const details = translateProperty(info.Detail, lang);
  const distanceStr = info.Mapping?.[roadName]?.km || '';
  const distance = parseInt(distanceStr, 10) || 0;

  // add dynamic value to image url to ignore cached value
  const u = new URL(image.ImageUrl);
  u.searchParams.append('origin', ORIGIN);
  u.searchParams.append('_', requestDate.getTime() + '');
  const urlNoCache = u.toString();

  return {
    id: info.Id,
    title: details.Title,
    description: details.BaseText || details.Title,
    distanceFromRoadStart: distance,
    image: {
      imageName: image.ImageName || details.Title,
      imageUrl: urlNoCache,
    },
    lastChange: requestDate,
    lastChangeLocalized: requestDate.toLocaleString(),
    position: {
      latitude: position.Latitude,
      longitude: position.Longitude,
    },

  }
}

