<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# noi-road-webcam



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                          | Default  |
| ---------- | ---------- | ----------- | --------------------------------------------- | -------- |
| `language` | `language` |             | `string`                                      | `'en'`   |
| `layout`   | `layout`   |             | `"auto" \| "desktop" \| "mobile" \| "tablet"` | `'auto'` |


## Shadow Parts

| Part      | Description |
| --------- | ----------- |
| `"list"`  |             |
| `"map"`   |             |
| `"popup"` |             |


## CSS Custom Properties

| Name                  | Description                 |
| --------------------- | --------------------------- |
| `--color-background`  | Background color            |
| `--color-marker`      | Map marker color            |
| `--color-primary`     | Primary color               |
| `--color-primary-rgb` | Primary color in RGB format |
| `--color-secondary`   | Secondary color             |
| `--color-text`        | Text color                  |


## Dependencies

### Depends on

- [noi-road-webcam-list](./partials/road-webcam-list)
- [noi-brennerlec-map](../blocks/map)
- [noi-backdrop](../blocks/backdrop)
- [noi-button](../blocks/button)
- [noi-icon](../blocks/icon)

### Graph
```mermaid
graph TD;
  noi-road-webcam --> noi-road-webcam-list
  noi-road-webcam --> noi-brennerlec-map
  noi-road-webcam --> noi-backdrop
  noi-road-webcam --> noi-button
  noi-road-webcam --> noi-icon
  noi-road-webcam-list --> noi-icon
  noi-road-webcam-list --> noi-input
  noi-input --> noi-icon
  noi-input --> noi-button
  style noi-road-webcam fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
