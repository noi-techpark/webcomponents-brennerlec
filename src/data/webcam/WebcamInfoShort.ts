// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Simplified structure
 */
export interface WebcamInfoShort {
  id: string;
  position: {
    latitude: number;
    longitude: number;
  };
  distanceFromRoadStart: number;
  image: {
    imageName: string;
    imageUrl: string;
  };
  title: string;
  description: string;
  lastChange: Date;
  lastChangeLocalized: string;
}
