// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, Element, Event, EventEmitter, forceUpdate, h, Host, Prop, State, Watch } from "@stencil/core";
import { prepareSearchString } from "../../../utils/quickSearch";
import { WebcamInfoShort } from "../../../data/webcam/WebcamInfoShort";
import { LanguageDataService } from "../../../data/language/language-data-service";
import { getLayoutClass, ViewLayout } from "../../../data/breakpoints";

/**
 * (INTERNAL) part of 'noi-road-webcam'
 */
@Component({
  tag: 'noi-road-webcam-list',
  styleUrl: 'road-webcam-list.css',
  scoped: true,
})
export class RoadWebcamListComponent {

  @Prop({mutable: true})
  webcamArr: WebcamInfoShort[] | null = null;

  @Prop({mutable: true})
  idSelected: string = null;

  @Prop({mutable: true})
  layout: ViewLayout;

  @State()
  searchString: string = null;

  @State()
  webcamArrFiltered: WebcamInfoShort[] = [];

  @Event()
  itemClick: EventEmitter<WebcamInfoShort>;

  @Element() el: HTMLElement;

  languageService: LanguageDataService;

  constructor() {
    this._renderItem = this._renderItem.bind(this);
    this._onLanguageChanged = this._onLanguageChanged.bind(this);
    this.init();
  }

  init() {
    this.languageService = LanguageDataService.getInstance();
  }

  connectedCallback() {
    this.languageService.onLanguageChange.bind(this._onLanguageChanged);
  }

  disconnectedCallback() {
    this.languageService.onLanguageChange.unbind(this._onLanguageChanged);
  }

  _onLanguageChanged() {
    forceUpdate(this.el);
  }

  filterData(searchString: string) {
    this.searchString = searchString;
  }

  @Watch('searchString')
  @Watch('webcamArr')
  onDataChange() {
    if ( !this.searchString) {
      this.webcamArrFiltered = this.webcamArr;
      return;
    }

    const searchToken = prepareSearchString(this.searchString);
    this.webcamArrFiltered = [];
    for (const wc of this.webcamArr) {
      const wcToken = prepareSearchString(wc.title);
      if (wcToken.includes(searchToken)) {
        this.webcamArrFiltered.push(wc);
      }
    }
  }

  render() {
    return <Host class={getLayoutClass(this.layout)}>
      <div class="title-wrapper">
        <div class="title ellipsis">
          <noi-icon class="title__icon" name="stations"></noi-icon>
          <span class="title__text">{this.languageService.translate('app.list.title')}</span>
        </div>
        <noi-input class="title__search"
                   placeholder={this.languageService.translate('app.list.search.placeholder')}
                   onValueChange={v => this.filterData(v.detail)}></noi-input>
      </div>
      <div class="list">
        {this.webcamArrFiltered.map(this._renderItem)}
        {this.webcamArrFiltered.length ? '' :
          <div class="no-data">{this.languageService.translate('app.list.empty')}</div>}
      </div>
    </Host>
  }

  _renderItem(camera: WebcamInfoShort) {
    let itemClass = 'item';
    if (this.idSelected === camera.id) {
      itemClass += ' item--selected';
    }
    return (<button type="button"
                    class={itemClass}
                    onClick={() => this.itemClick.emit(camera)}>
      <div class="item__wrapper">
        <div class="item__title">{camera.title}</div>
        <div class="item__description ellipsis">{camera.lastChangeLocalized}</div>
      </div>
      <div class="item__image" style={{backgroundImage: 'url("' + camera.image.imageUrl + '")'}}></div>
    </button>);
  }
}
