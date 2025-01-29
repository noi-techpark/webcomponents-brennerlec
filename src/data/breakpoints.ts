// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const Breakpoints = {
  Mobile: 500,
  Tablet: 890,
}


export type ViewLayout = 'desktop' | 'tablet' | 'mobile' | 'auto';

export function getLayoutClass(offsetWidth: number, layout: ViewLayout) {
  switch (layout) {
    case "desktop":
      return 'layout layout--desktop';
    case "tablet":
      return 'layout layout--tablet';
    case "mobile":
      return 'layout layout--mobile';
  }

  // dynamic
  let layoutClass = 'layout';
  if (offsetWidth > Breakpoints.Tablet) {
    layoutClass += ' layout--desktop';
    return layoutClass;
  }
  if (offsetWidth > Breakpoints.Mobile) {
    layoutClass += ' layout--tablet';
    return layoutClass;
  }
  layoutClass += ' layout--mobile';
  return layoutClass;
}
