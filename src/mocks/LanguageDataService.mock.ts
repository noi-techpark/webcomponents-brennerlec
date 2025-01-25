// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MicroSubject } from "../utils/MicroSubject";
import { LanguageDataService } from "../data/language/language-data-service";


export function LanguageDataServiceMock() {
  return {
    currentLanguage: 'en',
    onLanguageChange: new MicroSubject<string>(),
    useLanguage: (lang: string) => {this.onLanguageChange.trigger(lang)},
    translate: (token: string) => token,
  } as LanguageDataService;
}
