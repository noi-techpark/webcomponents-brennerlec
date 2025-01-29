// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, Element, forceUpdate, h, Host, Prop, State, Watch } from "@stencil/core";
import { WebcamDataService } from "../data/webcam/webcam-data-service";
import { DivIcon, LayerGroup, Map, Marker, Polyline } from 'leaflet';
import { StencilComponent } from "../utils/StencilComponent";
import { getLayoutClass, resolveLayoutAuto, ViewLayout } from "../data/breakpoints";
import { WebcamInfoShort } from "../data/webcam/WebcamInfoShort";
import { Subscription } from "../utils/TimerWatcher";
import { LanguageDataService } from "../data/language/language-data-service";

@Component({
  tag: 'noi-road-webcam',
  styleUrl: 'road-webcam.css',
  shadow: true,
})
export class RoadWebcamComponent implements StencilComponent {

  @Prop({mutable: true})
  language = 'en';

  @Prop({mutable: true})
  layout: ViewLayout = 'auto';

  @State()
  layoutResolved: ViewLayout;

  sizeObserver: ResizeObserver = null;

  map: Map;
  markersLayer: LayerGroup;
  markerMap: { [cameraId: string]: Marker } = {};

  webcamListSub: Subscription = null;
  selectedCameraId: string = null;
  selectedMarker: Marker = null;

  @State()
  webcamArr: WebcamInfoShort[] | null = [];

  @State()
  selectedCameraInfo: WebcamInfoShort = null;

  @Element() el: HTMLElement;

  // note: services are overridden in tests
  webcamDataService: WebcamDataService;
  languageService: LanguageDataService;

  constructor() {
    this.onBackdropClick = this.onBackdropClick.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this._onLanguageChanged = this._onLanguageChanged.bind(this);
    this.mapReady = this.mapReady.bind(this);
    this.init();
  }

  init() {
    this.languageService = LanguageDataService.getInstance();
    this.webcamDataService = new WebcamDataService();
  }

  connectedCallback() {
    this.languageService.onLanguageChange.bind(this._onLanguageChanged);
    this.languageService.useLanguage(this.language);
    this._recalculateLayoutClass();
    this._watchSize();
  }

  disconnectedCallback() {
    this.languageService.onLanguageChange.unbind(this._onLanguageChanged);
    this.webcamListSub.unsubscribe();
    this._unwatchSize();
  }

  _onLanguageChanged() {
    // re-subscribe to data source
    if (this.webcamListSub) {
      this.webcamListSub.unsubscribe();
    }
    if (this.map) {
      this.webcamListSub = this.webcamDataService.cameraListWatcher(this.languageService.currentLanguage).subscribe(this._cameraDataReceived.bind(this));
    }
    forceUpdate(this.el);
  }

  @Watch('language')
  onLanguageChange() {
    return this.languageService.useLanguage(this.language);
  }

  async mapReady(event: CustomEvent<Map>) {
    this.map = event.detail;

    this.markersLayer = new LayerGroup();
    this.map.addLayer(this.markersLayer);

    // get route points
    const routePath = await this.webcamDataService.getRoutePath();
    const roadLine = new Polyline([], {className: 'noi-map-line'});
    for (const p of routePath) {
      roadLine.addLatLng(p);
    }
    this.map.addLayer(roadLine);

    // center on line
    const bounds = roadLine.getBounds();
    this.map.setView(bounds.getCenter());
    this.map.setZoom(8); // TODO: zoom to fill the line


    //
    this.webcamListSub = this.webcamDataService.cameraListWatcher(this.languageService.currentLanguage).subscribe(this._cameraDataReceived.bind(this));
  }

  _cameraDataReceived(webcamArr: WebcamInfoShort[]) {
    this.webcamArr = webcamArr;

    for (let i = 0; i < webcamArr.length; i++) {
      const camera = webcamArr[i];

      if ( !camera.id) {
        console.warn('Item skipped: missing camera ID');
        continue;
      }
      if (this.markerMap[camera.id]) {
        // marker already present on the map.
        // there is no update of marker label
        // also, removing camera is not supported
        continue;
      }

      //// create map marker
      const markerPosition = (i % 2 === 0) ? 'noi-marker--right' : 'noi-marker--left';
      const markerIcon = new DivIcon({
        html: `
            <div class="noi-marker__icon"></div>
            <div class="noi-marker__label">${camera.title}</div>
          `,
        className: 'noi-marker ' + markerPosition,
        // className: markerID + " icona-multipla-" + nMarkers + " direzione-" + IDTratta.toLowerCase(),

        iconSize: [16, 16], // size of the icon
        iconAnchor: [8, 8] // point of the icon which will correspond to marker's location
      });

      const marker = new Marker({lat: camera.position.latitude, lng: camera.position.longitude}, {icon: markerIcon});
      this.markerMap[camera.id] = marker;
      marker.addEventListener('click', () => {
        this._selectCamera(camera.id);
      });
      this.markersLayer.addLayer(marker);
    }

    // update selected camera info
    this.selectedCameraInfo = this.webcamArr.find(wc => wc.id === this.selectedCameraId);
  }

  _selectCamera(cameraId?: string) {
    // remove selection
    if (this.selectedMarker) {
      this.selectedMarker.getElement().classList.remove('selected');
    }

    // assign new data
    this.selectedCameraId = cameraId;
    this.selectedMarker = this.markerMap[this.selectedCameraId];
    this.selectedCameraInfo = this.webcamArr.find(wc => wc.id === this.selectedCameraId);

    // add selection
    if (this.selectedMarker) {
      this.selectedMarker.getElement().classList.add('selected');
    }
  }

  onBackdropClick() {
    this._selectCamera(null);
  }

  itemClick(event: CustomEvent<WebcamInfoShort>) {
    this._selectCamera(event.detail.id);
  }

  @Watch('layout')
  _recalculateLayoutClass() {
    this.layoutResolved = resolveLayoutAuto(this.el.offsetWidth, this.layout);
  }

  _watchSize() {
    if (typeof window.ResizeObserver === 'function') {
      this.sizeObserver = new ResizeObserver(() => {
        this._recalculateLayoutClass();
      });
      this.sizeObserver.observe(this.el);
    } else {
      console.warn('ResizeObserver is not supported');
    }
  }

  _unwatchSize() {
    if (this.sizeObserver) {
      this.sizeObserver.unobserve(this.el);
      this.sizeObserver = null;
    }
  }


  render() {
    return (
      <Host class={getLayoutClass(this.layoutResolved)}>
        <noi-road-webcam-list class="layout__list"
                              part="list"
                              layout={this.layoutResolved}
                              idSelected={this.selectedCameraInfo?.id}
                              webcamArr={this.webcamArr}
                              onItemClick={e => this.itemClick(e)}></noi-road-webcam-list>
        <div class="layout__center">
          <noi-brennerlec-map part="map" onMapReady={e => this.mapReady(e)}></noi-brennerlec-map>
          <noi-backdrop hidden={ !this.selectedCameraInfo} onBackdropClick={() => this.onBackdropClick()}>
            {this.selectedCameraInfo ? this._renderPopup() : null}
          </noi-backdrop>
        </div>
      </Host>
    );
  }

  _renderPopup() {
    return (<div class="popup" part="popup">
      <div class="popup__title">
        <span class="popup__title-text">{this.selectedCameraInfo.title}</span>
        <noi-button class="popup__close-btn" iconOnly={true} onBtnClick={() => this._selectCamera(null)}>
          <noi-icon name="close"></noi-icon>
        </noi-button>
      </div>
      <div class="popup__subtitle">{this.selectedCameraInfo.description}</div>
      {/*<div class="popup__image" style={{backgroundImage: 'url("' + this.selectedCameraInfo.Webcamurl + '")'}}></div>*/}
      <img class="popup__image"
           src={this.selectedCameraInfo.image.imageUrl}
           alt={this.selectedCameraInfo.image.imageName}/>
      <div class="popup__subtitle">{this.selectedCameraInfo.lastChangeLocalized}</div>
    </div>);
  }
}
