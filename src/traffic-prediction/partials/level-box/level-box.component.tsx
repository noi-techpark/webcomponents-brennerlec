// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, h, Host, Prop } from "@stencil/core";
import { TrafficPredictionValue } from "../../../data/traffic-prediction/TrafficPredictionShort";

const titles = {
  "regular": "Regular",
  "severe": "Severe",
  "heavy": "Heavy",
  "critical": "Critical",
  "none": "No data",
}

@Component({
  tag: 'noi-traffic-level-box',
  styleUrl: 'level-box.css',
  scoped: true,
})
export class LevelBoxComponent {

  @Prop({mutable: true})
  level: TrafficPredictionValue;

  render() {
    const className = 'busy busy--' + (this.level || 'none');
    return (<Host class={className} title={titles[this.level || 'none']}>
      <slot/>
    </Host>);
  }
}
