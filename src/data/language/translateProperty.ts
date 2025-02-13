// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export function translateProperty<T>(obj: { [lang: string]: T }, lang: string) {
  if ( !obj) {
    return null;
  }
  let proposal = obj[lang];
  if ( !proposal) {
    console.warn('Cannot find language', lang);
    // try to use default language
    proposal = obj['en'];

    if ( !proposal) {
      // try to use first available language
      const langPresent = Object.keys(obj);
      proposal = obj[langPresent[0]];
    }
  }
  return proposal as T;
}
