// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * inspired by MicroEvent.js
 */
export class MicroSubject<T> {
  private _events: Array<(arg: T) => any> = [];

  bind(fn: (arg: T) => any) {
    this._events = this._events || [];
    this._events.push(fn);
  }

  unbind(fn: (arg: T) => any) {
    this._events = this._events || [];
    this._events.splice(this._events.indexOf(fn), 1);
  }

  trigger(data: T /* , args... */) {
    this._events = this._events || [];
    for (let i = 0; i < this._events.length; i++) {
      this._events[i].apply(this, [data]);
    }
  }
}



