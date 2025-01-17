// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Data received from api
 */
export interface WebcamInfo {
  GpsInfo: GpsInfo[];
// ContactInfos	{...}
  ImageGallery: ImageGallery[];
  // VideoItems
  Detail: { [languageCode: string]: Detail };
  WebCamProperties: WebcamProperties;
  HasLanguage: string[];
  // LicenseInfo
  Id: string;
  LastChange: string;// ($date-time)
  FirstImport: string;// ($date-time)
  Shortname: string;
  Active: boolean;
  // WebcamAssignedOn
  AreaIds: string[];
  SmgTags: string[];
  PublishedOn: string[];
  Mapping: { [roadId: string]: { "km": string } };
  WebcamId: string[];
  /**
   * @deprecated
   */
  Webcamurl: string;
  Source: string;
}

interface GpsInfo {
  /**
   * enum: position, viewpoint, startingandarrivalpoint, startingpoint, arrivalpoint, carparking, halfwaypoint, valleystationpoint, middlestationpoint, mountainstationpoint
   */
  Gpstype: string | 'position';
  Latitude: number;
  Longitude: number;
  Altitude: number;
  AltitudeUnitofMeasure: string;
}

interface ImageGallery {
  ImageName: string;
  ImageUrl: string;
  Width: number; // int32
  Height: number; // int32
  ImageSource: string;
  ImageTitle: {
    [key: string]: string;
  };
  ImageDesc: {
    [key: string]: string;
  };
  ImageAltText: {
    [key: string]: string;
  };
  IsInGallery: boolean;
  ListPosition: number; // int32
  ValidFrom: string; //$date-time
  ValidTo: string; //$date-time
  CopyRight: string;
  License: string;
  LicenseHolder: string;
  // ImageTags
}

interface Detail {
  Header: string;
  SubHeader: string;
  IntroText: string;
  BaseText: string;
  Title: string;
  AdditionalText: string;
  MetaTitle: string;
  MetaDesc: string;
  GetThereText: string;
  Language: string;
  Keywords: string[];
  ParkingInfo: string;
  PublicTransportationInfo: string;
  AuthorTip: string;
  SafetyInfo: string;
  EquipmentInfo: string;
}

interface WebcamProperties {
  WebcamUrl: string;
  StreamUrl: string;
  PreviewUrl: string;
  ViewAngleDegree: string;
  ZeroDirection: string;
  HtmlEmbed: string;
  TourCam: boolean;
  HasVR: boolean;
  ViewerType: string;
}
