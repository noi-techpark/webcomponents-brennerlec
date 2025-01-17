// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";

@Component({
  tag: 'noi-backdrop',
  styleUrl: 'backdrop.css',
  scoped: true,
})
export class BackdropComponent {

  @Event() backdropClick: EventEmitter<void>;

  @Prop()
  hidden = false;

  render() {
    return <Host class={this.hidden ? 'hidden' : ''}>
      <div class="content">
        <slot/>
      </div>
      <div class="backdrop" onClick={() => this.backdropClick.emit()}></div>
    </Host>
  }
}
