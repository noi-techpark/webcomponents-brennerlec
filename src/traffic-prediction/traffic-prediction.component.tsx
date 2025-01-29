// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, Element, forceUpdate, h, Host, Method, Prop, State, Watch } from "@stencil/core";
import { getLayoutClass, resolveLayoutAuto, ViewLayout } from "../data/breakpoints";
import { LanguageDataService } from "../data/language/language-data-service";
import { StencilComponent } from "../utils/StencilComponent";
import { TrafficPredictionDataService } from "../data/traffic-prediction/traffic-prediction-data-service";
import { CalendarDayContext } from "../blocks/calendar-month/calendar-month.component";
import { TrafficPredictionShort } from "../data/traffic-prediction/TrafficPredictionShort";
import { addMonths } from "date-fns/addMonths";
import { isSameMonth } from "date-fns/isSameMonth";
import { addDays } from "date-fns/addDays";
import { TrafficPredictionLocation } from "../data/traffic-prediction/TrafficPrediction";

@Component({
  tag: 'noi-traffic-prediction',
  styleUrl: 'traffic-prediction.css',
  shadow: true,
})
export class TrafficPredictionComponent implements StencilComponent {

  @Prop({mutable: true})
  location: TrafficPredictionLocation;

  @Prop({mutable: true})
  language = 'en';

  @Prop({mutable: true})
  layout: ViewLayout = 'auto';

  @State()
  layoutResolved: ViewLayout;

  @Prop({mutable: true})
  viewDate: Date = new Date();

  isCurrentMonth = true;

  @Element() el: HTMLElement;
  _calendar: HTMLElement;

  _predictionData: TrafficPredictionShort[] = [];
  _predictionDataGrouped: { [dayString: string]: TrafficPredictionShort } = {};

  @State()
  selectedPredictionDate?: Date;
  @State()
  selectedPrediction?: TrafficPredictionShort;

  sizeObserver: ResizeObserver = null;

  // note: services are overridden in tests
  trafficPredictionService: TrafficPredictionDataService;
  languageService: LanguageDataService;

  constructor() {
    this._onLanguageChanged = this._onLanguageChanged.bind(this);
    this.__renderCalendarCell = this.__renderCalendarCell.bind(this);
    this.init();
  }

  init() {
    // initialize services in 'init', so it can be overridden in tests
    this.languageService = LanguageDataService.getInstance('tp');
    this.trafficPredictionService = new TrafficPredictionDataService();
  }

  connectedCallback() {
    this.languageService.onLanguageChange.bind(this._onLanguageChanged);
    this.languageService.useLanguage(this.language);
    this._watchSize();
    this._fetchData();
  }

  @Watch('location')
  @Watch('viewDate')
  _fetchData() {
    // this.trafficPredictionService.getTrafficPredictionForDay(this.location, new Date()) // disable requests during development
    this.trafficPredictionService.getTrafficPredictionForMonth(this.location, this.viewDate, {withPadding: true})
      .then(r => {
        // this._predictionData = [r];
        this._predictionData = r;
        this._predictionDataGrouped = {};
        for (const p of this._predictionData) {
          if (this._predictionDataGrouped[p.date.toLocaleDateString()]) {
            console.warn('Multiple data records found for date:', p.date.toISOString());
          }
          this._predictionDataGrouped[p.date.toLocaleDateString()] = p;
        }
        console.log('Data received:', this._predictionDataGrouped);
        forceUpdate(this._calendar);
      });


    // close dialog
    this.selectedPredictionDate = null;
    this.selectedPrediction = null;
  }

  disconnectedCallback() {
    this.languageService.onLanguageChange.unbind(this._onLanguageChanged);
    this._unwatchSize();
  }

  _onLanguageChanged() {
    forceUpdate(this.el);
  }

  @Watch('language')
  onLanguageChange() {
    return this.languageService.useLanguage(this.language);
  }

  @Method()
  async selectDay(day: Date | null) {
    this.selectedPredictionDate = day;
    if ( !this.selectedPredictionDate) {
      this.selectedPrediction = null;
      return;
    }

    this.selectedPrediction = undefined; // "undefined" shows 'data loading' label
    return this.trafficPredictionService.getTrafficPredictionForDay(this.location, day)
      .then(p => {
        this.selectedPrediction = p || null; // "null" shows 'no data' label
      });

  }

  _changeSelectedDate(change: number) {
    if ( !this.selectedPredictionDate) {
      this.selectedPredictionDate = new Date();
    }
    return this.selectDay(addDays(this.selectedPredictionDate, change));
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

  @Method()
  async changeViewMonth(change: number) {
    this.viewDate = addMonths(this.viewDate, change);
    this.isCurrentMonth = isSameMonth(this.viewDate, new Date());
    forceUpdate(this.el);
  }

  @Method()
  async resetToCurrentMonth() {
    this.viewDate = new Date();
    this.isCurrentMonth = true;
    forceUpdate(this.el);
  }


  render() {
    return (
      <Host class={getLayoutClass(this.layoutResolved)}>
        <div class="layout__scroll">
          {this._renderTitle()}
          <div class="layout__center">
            <noi-calendar-month part="calendar"
                                viewDate={this.viewDate}
                                language={this.language}
                                itemRenderer={this.__renderCalendarCell}
                                ref={ref => this._calendar = ref}></noi-calendar-month>

          </div>
          {this._renderFooter()}
        </div>
        <noi-backdrop hidden={ !this.selectedPredictionDate} onBackdropClick={() => this.selectDay(null)}>
          {this.selectedPredictionDate ? this._renderPopup() : null}
        </noi-backdrop>
      </Host>
    );
  }

  __renderCalendarCell(d: CalendarDayContext) {
    const pData = this._predictionDataGrouped[d.date.toLocaleDateString()];

    // disable requests during development
    // const pData = this._predictionData[0];

    return (<noi-button class="day__btn" disabled={ !pData} onBtnClick={() => this.selectDay(d.date)}>
      <div class="day">
        <div class="day__day">{d.date.getDate()}</div>
        <div class="day__busy">
          <noi-traffic-level-box level={pData?.direction?.south?.summary}>S</noi-traffic-level-box>
          <noi-traffic-level-box level={pData?.direction?.north?.summary}>N</noi-traffic-level-box>
        </div>
      </div>
    </noi-button>);
  }

  _renderTitle() {
    const viewMonthName = this.viewDate.toLocaleString(this.language, {month: 'long'});
    return (<div class="layout__title" part="title">
      <div class="title__label">
        <span class="title__month">{viewMonthName}</span>
        <span class="title__year">{this.viewDate.getFullYear()}</span>
      </div>
      <noi-button class="title__btn"
                  title="Previous month"
                  iconOnly={true}
                  onBtnClick={() => this.changeViewMonth(-1)}>
        <noi-icon name="chevron__left"></noi-icon>
      </noi-button>
      <noi-button class="title__btn"
                  title="Next month"
                  iconOnly={true}
                  onBtnClick={() => this.changeViewMonth(1)}>
        <noi-icon name="chevron__right"></noi-icon>
      </noi-button>
      {this.isCurrentMonth ? null : (
        <noi-button class="title__btn"
                    title="Show current month"
                    iconOnly={true}
                    onBtnClick={() => this.resetToCurrentMonth()}>
          <noi-icon name="today"></noi-icon>
        </noi-button>)}
    </div>);
  }

  _renderPopup() {
    const selectedDate = this.selectedPredictionDate;
    const popupMonthName = selectedDate.toLocaleString(this.language, {month: 'long'});
    const popupWeekdayName = selectedDate.toLocaleString(this.language, {weekday: 'long'});

    return (<div class="popup" part="popup">
      <div class="popup__title">
        <noi-button class="popup__title-btn"
                    title="Previous month"
                    iconOnly={true}
                    onBtnClick={() => this._changeSelectedDate(-1)}>
          <noi-icon name="chevron__left"></noi-icon>
        </noi-button>
        <div class="popup__title-text">
          <span class="popup__title-weekday">{popupWeekdayName} </span>
          <span class="popup__title-date">{selectedDate.getDate()} </span>
          <span class="popup__title-month">{popupMonthName} </span>
          <span class="popup__title-year">{selectedDate.getFullYear()}</span>
        </div>
        <noi-button class="popup__title-btn"
                    title="Next month"
                    iconOnly={true}
                    onBtnClick={() => this._changeSelectedDate(1)}>
          <noi-icon name="chevron__right"></noi-icon>
        </noi-button>

      </div>
      <noi-loading isLoading={ !this.selectedPrediction}>
        <div class="popup__content">
          <div>
            <noi-traffic-day-details
              direction="south"
              details={this.selectedPrediction?.direction?.south?.details}></noi-traffic-day-details>
          </div>
          <div>
            <noi-traffic-day-details
              direction="north"
              details={this.selectedPrediction?.direction?.north?.details}></noi-traffic-day-details>
          </div>
        </div>

        <div slot="loading" class="popup__content loading">
          {this.selectedPrediction === null ? (
            <div class="loading-label">No data</div>
          ) : (
            <div class="loading-label">Loading data...</div>
          )}
        </div>
      </noi-loading>
      <div class="popup__footer">
        <noi-button class="popup__close-btn" onBtnClick={() => this.selectDay(null)}>
          Chiudi
        </noi-button>
      </div>
    </div>);
  }

  _renderFooter() {
    return (<div class="layout__footer" part="footer">
      <div class="legend">
        <div class="legend__item" title="Verso Brennero">
          <b class="legend__icon">N</b>
          <div class="legend__item-content">
            Verso Brennero
          </div>
        </div>
        <div class="legend__item" title="Verso Modena">
          <b class="legend__icon">S</b>
          <div class="legend__item-content">
            Verso Modena
          </div>
        </div>
        <noi-traffic-level-box class="legend__item" level="critical">
          <div class="legend__item-content">Critico</div>
        </noi-traffic-level-box>
        <noi-traffic-level-box class="legend__item" level="heavy">
          <div class="legend__item-content">Intenso</div>
        </noi-traffic-level-box>
        <noi-traffic-level-box class="legend__item" level="severe">
          <div class="legend__item-content">Sostenuto</div>
        </noi-traffic-level-box>
        <noi-traffic-level-box class="legend__item" level="regular">
          <div class="legend__item-content">Regolare</div>
        </noi-traffic-level-box>
      </div>
    </div>);
  }


}
