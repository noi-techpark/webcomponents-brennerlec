// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, h, Prop } from "@stencil/core";

export type IconName = 'close'
  | 'stations'
  | 'search'
  | 'chevron__left'
  | 'chevron__right'
  | 'today'
  ;

/**
 * (INTERNAL) render an icon.
 *
 * Icons are embedded inside the component (so far).
 *
 * Icon size can be changed by 'font-size' style
 */
@Component({
  tag: 'noi-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class IconComponent {

  /**
   * icon name
   */
  @Prop()
  name: IconName | string;

  render() {
    switch (this.name) {
      case 'close':
        return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="currentColor"/>
        </svg>);

      case 'stations':
        return (<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22.2903 0C23.2346 0 24 0.765445 24 1.70967V22.483C24 23.4272 23.2346 24.1927 22.2903 24.1927H9.4678C8.52358 24.1927 7.75813 23.4272 7.75813 22.483V19.3734H9.4678V22.483H22.2903V1.70967H9.4678V4.55942H7.75813V1.70967C7.75813 0.765445 8.52358 0 9.4678 0H22.2903ZM12.8721 5.6632C13.276 5.41883 13.8016 5.5482 14.046 5.95215C14.2903 6.3561 14.161 6.88166 13.757 7.12603L11.6315 8.41184C10.048 9.36979 8.03486 9.23736 6.59047 8.0802C5.71054 7.37526 4.48214 7.30053 3.52324 7.8936L1.30461 9.26581C0.903089 9.51415 0.376275 9.38997 0.127937 8.98845C-0.120401 8.58693 0.00377771 8.06011 0.405298 7.81178L2.62393 6.43957C4.19816 5.46592 6.21483 5.58861 7.65941 6.74592C8.54397 7.45457 9.77684 7.53567 10.7466 6.94901L12.8721 5.6632ZM14.046 9.79891C13.8016 9.39496 13.276 9.26559 12.8721 9.50996L10.7466 10.7958C9.77684 11.3824 8.54397 11.3013 7.65941 10.5927C6.21483 9.43536 4.19816 9.31267 2.62393 10.2863L0.405298 11.6585C0.00377771 11.9069 -0.120401 12.4337 0.127937 12.8352C0.376275 13.2367 0.903089 13.3609 1.30461 13.1126L3.52324 11.7404C4.48214 11.1473 5.71054 11.222 6.59047 11.927C8.03486 13.0841 10.048 13.2166 11.6315 12.2586L13.757 10.9728C14.161 10.7284 14.2903 10.2029 14.046 9.79891ZM12.8721 13.3567C13.276 13.1123 13.8016 13.2417 14.046 13.6457C14.2903 14.0496 14.161 14.5752 13.757 14.8195L11.6315 16.1054C10.048 17.0633 8.03486 16.9309 6.59047 15.7737C5.71054 15.0688 4.48214 14.994 3.52324 15.5871L1.30461 16.9593C0.903089 17.2077 0.376275 17.0835 0.127937 16.682C-0.120401 16.2804 0.00377771 15.7536 0.405298 15.5053L2.62393 14.1331C4.19816 13.1594 6.21483 13.2821 7.65941 14.4394C8.54397 15.1481 9.77684 15.2292 10.7466 14.6425L12.8721 13.3567ZM19.5122 6.40171C20.4564 6.40171 21.2218 5.63626 21.2218 4.69204C21.2218 3.74781 20.4564 2.98237 19.5122 2.98237C18.5679 2.98237 17.8025 3.74781 17.8025 4.69204C17.8025 5.63626 18.5679 6.40171 19.5122 6.40171ZM20.367 8.97411V20.5265H18.6573V20.5065H16.3065V19.2242H18.6573V17.942H16.7339V16.6597H18.6573V15.3775H16.3065V14.0952H18.6573V12.813H16.7339V11.5307H18.6573V10.2485H16.3065V8.96621H20.1532V8.97411H20.367Z"
                fill="currentColor"/>
        </svg>);
      case 'search':
        return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="currentColor"/>
        </svg>);
      case 'chevron__left':
        return (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 512 512">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48"
                d="M328 112L184 256l144 144"/>
        </svg>);
      case 'chevron__right':
        return (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-30 0 512 512">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48"
                d="M184 112l144 144-144 144"/>
        </svg>);
      case 'today':
        return (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <rect fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" x="48" y="80" width="416"
                height="384" rx="48"/>
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" stroke-linecap="round"
                d="M128 48v32M384 48v32"/>
          <rect fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" stroke-linecap="round"
                x="112" y="224" width="96" height="96" rx="13"/>
          <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" stroke-linecap="round"
                d="M464 160H48"/>
        </svg>);
    }
  }
}
