// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: 'noi-loading',
  styleUrl: 'loading.css',
  shadow: true,
})
export class LoadingComponent {

  @Prop({mutable: true})
  isLoading = false;

  render() {
    return (<Host>
      <div part="loading-content" class={"content " + (this.isLoading ? 'hidden' : '')}>
        <slot/>
      </div>
      <div part="loading-label" class={"loading " + (this.isLoading ? '' : 'hidden')}>
        <slot name="loading"/>
      </div>
    </Host>);
  }
}
