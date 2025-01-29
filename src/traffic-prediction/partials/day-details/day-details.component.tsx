// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, h, Host, Prop } from "@stencil/core";
import {
  TrafficPredictionDirection,
  TrafficPredictionTime,
  TrafficPredictionValue
} from "../../../data/traffic-prediction/TrafficPredictionShort";


const timeParts: TrafficPredictionTime[] = ['q1', 'q2', 'q3', 'q4'];
const timePartNames = {
  'q1': '0/6',
  'q2': '6/12',
  'q3': '12/18',
  'q4': '18/24',
}
const directionLabels = {
  'north': 'NORD',
  'south': 'SUD',
}

/**
 * (INTERNAL) part of 'noi-traffic-prediction'
 */
@Component({
  tag: 'noi-traffic-day-details',
  styleUrl: 'day-details.css',
  scoped: true,
})
export class DayDetailsComponent {

  @Prop({mutable: true})
  details: { [dayPart in TrafficPredictionTime]: TrafficPredictionValue };

  @Prop({mutable: true})
  direction: TrafficPredictionDirection;

  render() {
    return (<Host>
      <div class="dd__name">Direzione <b>{directionLabels[this.direction]}</b></div>
      <div class="dd__description">Verso Modena</div>
      <div class="dd__parts">
        {timeParts.map((timePart) => {
          return (<div class="part__label">
            <span>ore</span>
            <span>{timePartNames[timePart]}</span>
          </div>);
        })}
        {timeParts.map((timePart) => {
          return (<noi-traffic-level-box class="part__value" level={this.details?.[timePart]}></noi-traffic-level-box>);
        })}
      </div>
    </Host>);
  }
}
