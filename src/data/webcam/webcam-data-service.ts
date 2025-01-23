// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListResponse } from "../ListResponse";
import { WebcamInfo } from "./WebcamInfo";
import { WebcamInfoShort } from "./WebcamInfoShort";
import { TimerWatcher } from "../../utils/TimerWatcher";
import { translateProperty } from "../language/translateProperty";

const RELOAD_INTERVAL = 1 * 60 * 1000;

export class WebcamDataService {

  // getCameraList(opts?:{pagesize?:number}) {
  getCameraList(lang: string) {
    const requestDate = new Date();
    return fetch('https://api.tourism.testingmachine.eu/v1/WebcamInfo?source=a22&pagesize=-1')
      .then(r => r.json() as Promise<ListResponse<WebcamInfo>>)
      .then(r => r.Items)
      .then(r => {
        return r
          .map(wc => _convertToShortInfo(wc, 'a22', requestDate, lang))
          .filter(v => !!v);
      })
      .then(r => {
        return r.sort((a, b) => a.distanceFromRoadStart - b.distanceFromRoadStart);
      });
  }

  cameraListWatcher(lang: string, interval = RELOAD_INTERVAL) {
    return new TimerWatcher(() => {
      return this.getCameraList(lang);
    }, interval);
  }

  getRoutePath() {
    return fetch('assets/data/a22-1km.json')
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

  // add dynamic value to image url to skip caching issue
  const u = new URL(image.ImageUrl);
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

