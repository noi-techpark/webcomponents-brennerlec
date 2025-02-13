// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ViewLayout } from "./data/breakpoints";
import { Map } from "leaflet";
import { IconName } from "./blocks/icon/icon.component";
import { WebcamInfoShort } from "./data/webcam/WebcamInfoShort";
export { ViewLayout } from "./data/breakpoints";
export { Map } from "leaflet";
export { IconName } from "./blocks/icon/icon.component";
export { WebcamInfoShort } from "./data/webcam/WebcamInfoShort";
export namespace Components {
    /**
     * (INTERNAL) Backdrop component.
     */
    interface NoiBackdrop {
        /**
          * Removing backdrop from DOM sometime can cause blink during layout recalculation. 'hidden' can be used to hide the backdrop without removing from DOM
          * @default false
         */
        "hidden": boolean;
    }
    /**
     * Road webcameras component
     */
    interface NoiBrennerlec {
        /**
          * Language
         */
        "language": string;
        /**
          * Layout appearance
         */
        "layout": ViewLayout;
        /**
          * Reload camera data (basically, it's images)
         */
        "refreshData": () => Promise<void>;
        /**
          * Data reload interval
         */
        "reloadInterval": number;
    }
    /**
     * (INTERNAL) render leaflet map
     */
    interface NoiBrennerlecMap {
    }
    /**
     * (INTERNAL) Backdrop component.
     */
    interface NoiButton {
        /**
          * button 'disabled' property
          * @default false
         */
        "disabled": boolean;
        /**
          * icon-only buttons has circle shape. The size of the button can be changed with "font-size" style
          * @default false
         */
        "iconOnly": boolean;
    }
    /**
     * (INTERNAL) render an icon.
     * Icons are embedded inside the component (so far).
     * Icon size can be changed by 'font-size' style
     */
    interface NoiIcon {
        /**
          * icon name
         */
        "name": IconName | string;
    }
    /**
     * (INTERNAL) render an input with prefix and clear button
     * Prefix are hardcoded to 'search' icon for now.
     */
    interface NoiInput {
        /**
          * Input placeholder
         */
        "placeholder": string;
    }
    /**
     * (INTERNAL) part of 'noi-brennerlec'
     */
    interface NoiRoadWebcamList {
        "idSelected": string;
        "layout": ViewLayout;
        "webcamArr": WebcamInfoShort[] | null;
    }
}
export interface NoiBackdropCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLNoiBackdropElement;
}
export interface NoiBrennerlecMapCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLNoiBrennerlecMapElement;
}
export interface NoiButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLNoiButtonElement;
}
export interface NoiInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLNoiInputElement;
}
export interface NoiRoadWebcamListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLNoiRoadWebcamListElement;
}
declare global {
    interface HTMLNoiBackdropElementEventMap {
        "backdropClick": void;
    }
    /**
     * (INTERNAL) Backdrop component.
     */
    interface HTMLNoiBackdropElement extends Components.NoiBackdrop, HTMLStencilElement {
        addEventListener<K extends keyof HTMLNoiBackdropElementEventMap>(type: K, listener: (this: HTMLNoiBackdropElement, ev: NoiBackdropCustomEvent<HTMLNoiBackdropElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLNoiBackdropElementEventMap>(type: K, listener: (this: HTMLNoiBackdropElement, ev: NoiBackdropCustomEvent<HTMLNoiBackdropElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLNoiBackdropElement: {
        prototype: HTMLNoiBackdropElement;
        new (): HTMLNoiBackdropElement;
    };
    /**
     * Road webcameras component
     */
    interface HTMLNoiBrennerlecElement extends Components.NoiBrennerlec, HTMLStencilElement {
    }
    var HTMLNoiBrennerlecElement: {
        prototype: HTMLNoiBrennerlecElement;
        new (): HTMLNoiBrennerlecElement;
    };
    interface HTMLNoiBrennerlecMapElementEventMap {
        "mapReady": Map;
    }
    /**
     * (INTERNAL) render leaflet map
     */
    interface HTMLNoiBrennerlecMapElement extends Components.NoiBrennerlecMap, HTMLStencilElement {
        addEventListener<K extends keyof HTMLNoiBrennerlecMapElementEventMap>(type: K, listener: (this: HTMLNoiBrennerlecMapElement, ev: NoiBrennerlecMapCustomEvent<HTMLNoiBrennerlecMapElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLNoiBrennerlecMapElementEventMap>(type: K, listener: (this: HTMLNoiBrennerlecMapElement, ev: NoiBrennerlecMapCustomEvent<HTMLNoiBrennerlecMapElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLNoiBrennerlecMapElement: {
        prototype: HTMLNoiBrennerlecMapElement;
        new (): HTMLNoiBrennerlecMapElement;
    };
    interface HTMLNoiButtonElementEventMap {
        "btnClick": MouseEvent;
    }
    /**
     * (INTERNAL) Backdrop component.
     */
    interface HTMLNoiButtonElement extends Components.NoiButton, HTMLStencilElement {
        addEventListener<K extends keyof HTMLNoiButtonElementEventMap>(type: K, listener: (this: HTMLNoiButtonElement, ev: NoiButtonCustomEvent<HTMLNoiButtonElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLNoiButtonElementEventMap>(type: K, listener: (this: HTMLNoiButtonElement, ev: NoiButtonCustomEvent<HTMLNoiButtonElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLNoiButtonElement: {
        prototype: HTMLNoiButtonElement;
        new (): HTMLNoiButtonElement;
    };
    /**
     * (INTERNAL) render an icon.
     * Icons are embedded inside the component (so far).
     * Icon size can be changed by 'font-size' style
     */
    interface HTMLNoiIconElement extends Components.NoiIcon, HTMLStencilElement {
    }
    var HTMLNoiIconElement: {
        prototype: HTMLNoiIconElement;
        new (): HTMLNoiIconElement;
    };
    interface HTMLNoiInputElementEventMap {
        "valueChange": string;
    }
    /**
     * (INTERNAL) render an input with prefix and clear button
     * Prefix are hardcoded to 'search' icon for now.
     */
    interface HTMLNoiInputElement extends Components.NoiInput, HTMLStencilElement {
        addEventListener<K extends keyof HTMLNoiInputElementEventMap>(type: K, listener: (this: HTMLNoiInputElement, ev: NoiInputCustomEvent<HTMLNoiInputElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLNoiInputElementEventMap>(type: K, listener: (this: HTMLNoiInputElement, ev: NoiInputCustomEvent<HTMLNoiInputElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLNoiInputElement: {
        prototype: HTMLNoiInputElement;
        new (): HTMLNoiInputElement;
    };
    interface HTMLNoiRoadWebcamListElementEventMap {
        "itemClick": WebcamInfoShort;
    }
    /**
     * (INTERNAL) part of 'noi-brennerlec'
     */
    interface HTMLNoiRoadWebcamListElement extends Components.NoiRoadWebcamList, HTMLStencilElement {
        addEventListener<K extends keyof HTMLNoiRoadWebcamListElementEventMap>(type: K, listener: (this: HTMLNoiRoadWebcamListElement, ev: NoiRoadWebcamListCustomEvent<HTMLNoiRoadWebcamListElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLNoiRoadWebcamListElementEventMap>(type: K, listener: (this: HTMLNoiRoadWebcamListElement, ev: NoiRoadWebcamListCustomEvent<HTMLNoiRoadWebcamListElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLNoiRoadWebcamListElement: {
        prototype: HTMLNoiRoadWebcamListElement;
        new (): HTMLNoiRoadWebcamListElement;
    };
    interface HTMLElementTagNameMap {
        "noi-backdrop": HTMLNoiBackdropElement;
        "noi-brennerlec": HTMLNoiBrennerlecElement;
        "noi-brennerlec-map": HTMLNoiBrennerlecMapElement;
        "noi-button": HTMLNoiButtonElement;
        "noi-icon": HTMLNoiIconElement;
        "noi-input": HTMLNoiInputElement;
        "noi-road-webcam-list": HTMLNoiRoadWebcamListElement;
    }
}
declare namespace LocalJSX {
    /**
     * (INTERNAL) Backdrop component.
     */
    interface NoiBackdrop {
        /**
          * Removing backdrop from DOM sometime can cause blink during layout recalculation. 'hidden' can be used to hide the backdrop without removing from DOM
          * @default false
         */
        "hidden"?: boolean;
        /**
          * Emitted when user clicks on the backdrop
         */
        "onBackdropClick"?: (event: NoiBackdropCustomEvent<void>) => void;
    }
    /**
     * Road webcameras component
     */
    interface NoiBrennerlec {
        /**
          * Language
         */
        "language"?: string;
        /**
          * Layout appearance
         */
        "layout"?: ViewLayout;
        /**
          * Data reload interval
         */
        "reloadInterval"?: number;
    }
    /**
     * (INTERNAL) render leaflet map
     */
    interface NoiBrennerlecMap {
        /**
          * Emitted when map is initialized and ready to draw on it
         */
        "onMapReady"?: (event: NoiBrennerlecMapCustomEvent<Map>) => void;
    }
    /**
     * (INTERNAL) Backdrop component.
     */
    interface NoiButton {
        /**
          * button 'disabled' property
          * @default false
         */
        "disabled"?: boolean;
        /**
          * icon-only buttons has circle shape. The size of the button can be changed with "font-size" style
          * @default false
         */
        "iconOnly"?: boolean;
        /**
          * Emitted when user clicks on the button
         */
        "onBtnClick"?: (event: NoiButtonCustomEvent<MouseEvent>) => void;
    }
    /**
     * (INTERNAL) render an icon.
     * Icons are embedded inside the component (so far).
     * Icon size can be changed by 'font-size' style
     */
    interface NoiIcon {
        /**
          * icon name
         */
        "name"?: IconName | string;
    }
    /**
     * (INTERNAL) render an input with prefix and clear button
     * Prefix are hardcoded to 'search' icon for now.
     */
    interface NoiInput {
        /**
          * Emitted when value is changed
         */
        "onValueChange"?: (event: NoiInputCustomEvent<string>) => void;
        /**
          * Input placeholder
         */
        "placeholder"?: string;
    }
    /**
     * (INTERNAL) part of 'noi-brennerlec'
     */
    interface NoiRoadWebcamList {
        "idSelected"?: string;
        "layout"?: ViewLayout;
        "onItemClick"?: (event: NoiRoadWebcamListCustomEvent<WebcamInfoShort>) => void;
        "webcamArr"?: WebcamInfoShort[] | null;
    }
    interface IntrinsicElements {
        "noi-backdrop": NoiBackdrop;
        "noi-brennerlec": NoiBrennerlec;
        "noi-brennerlec-map": NoiBrennerlecMap;
        "noi-button": NoiButton;
        "noi-icon": NoiIcon;
        "noi-input": NoiInput;
        "noi-road-webcam-list": NoiRoadWebcamList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            /**
             * (INTERNAL) Backdrop component.
             */
            "noi-backdrop": LocalJSX.NoiBackdrop & JSXBase.HTMLAttributes<HTMLNoiBackdropElement>;
            /**
             * Road webcameras component
             */
            "noi-brennerlec": LocalJSX.NoiBrennerlec & JSXBase.HTMLAttributes<HTMLNoiBrennerlecElement>;
            /**
             * (INTERNAL) render leaflet map
             */
            "noi-brennerlec-map": LocalJSX.NoiBrennerlecMap & JSXBase.HTMLAttributes<HTMLNoiBrennerlecMapElement>;
            /**
             * (INTERNAL) Backdrop component.
             */
            "noi-button": LocalJSX.NoiButton & JSXBase.HTMLAttributes<HTMLNoiButtonElement>;
            /**
             * (INTERNAL) render an icon.
             * Icons are embedded inside the component (so far).
             * Icon size can be changed by 'font-size' style
             */
            "noi-icon": LocalJSX.NoiIcon & JSXBase.HTMLAttributes<HTMLNoiIconElement>;
            /**
             * (INTERNAL) render an input with prefix and clear button
             * Prefix are hardcoded to 'search' icon for now.
             */
            "noi-input": LocalJSX.NoiInput & JSXBase.HTMLAttributes<HTMLNoiInputElement>;
            /**
             * (INTERNAL) part of 'noi-brennerlec'
             */
            "noi-road-webcam-list": LocalJSX.NoiRoadWebcamList & JSXBase.HTMLAttributes<HTMLNoiRoadWebcamListElement>;
        }
    }
}
