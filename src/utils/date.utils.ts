// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_MS = 60 * 1000;

/**
 * Get day index from the beginning on timestamp (Jan 1, 1970)
 * It's not useful itself, but can be used for comparing two dates.
 * LOCAL time used
 *
 * @param date
 */
export function getDaySeq(date: Date): number {
    return Math.floor((date.getTime() - date.getTimezoneOffset() * MIN_MS) / DAY_MS);
}
