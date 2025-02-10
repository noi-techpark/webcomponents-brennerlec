// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MicroSubject } from "../../../utils/MicroSubject";

export class LanguageDataService {

  private static instance: LanguageDataService;

  public currentLanguage: 'en';

  public onLanguageChange = new MicroSubject<string>();

  /**
   * @private
   */
  constructor(_appPrefix: string) {
  }

  static getInstance(appPrefix: string) {
    if ( !LanguageDataService.instance) {
      LanguageDataService.instance = new LanguageDataService(appPrefix);
    }
    return LanguageDataService.instance;
  }

  useLanguage(lang: string) {
    this.onLanguageChange.trigger(lang);
  }

  translate(token: string) {
    return 'T:' + token; // using 'T' prefix also verifies mock usage
  }

  attachToComponent(_component: any, _el: HTMLElement) {

  }
}
