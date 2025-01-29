// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type Listener<T> = (value: T) => any;
export type Subscription = { unsubscribe: () => void; };

export class TimerWatcher<T> {
  private listeners: Listener<T>[] = [];
  private _timer = null;
  private _hasValue = false;
  private _lastValue: T = null;

  constructor(
    private fn: () => Promise<T>,
    private interval: number,
  ) {
  }

  _next(value: T) {
    for (const _listener of this.listeners) {
      _listener(value);
    }
  }

  subscribe(listener: Listener<T>): Subscription {
    this.listeners.push(listener);

    if (this._hasValue) {
      listener(this._lastValue);
    }

    this._updateListeners(this.listeners.length === 1);

    return {
      unsubscribe: () => {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
        this._updateListeners();
      }
    };
  }

  _updateListeners(isFirstRun = false) {
    if (this.listeners.length > 0 && !this._timer) {
      // subscribed, no timer
      this._timer = setTimeout(() => {
        this._run().then(() => {
          this._timer = null;
          this._updateListeners()
        });
      }, isFirstRun ? 0 : this.interval);
    }

    if ( !this.listeners.length && this._timer) {
      // all unsubscribed. stop watching
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  _run() {
    return Promise.resolve()
      .then(() => this.fn())
      .then(value => {
        this._hasValue = true;
        this._lastValue = value;
        this._next(value);
      })
      .catch(e => {
        console.error(e);
      });
  }
}

