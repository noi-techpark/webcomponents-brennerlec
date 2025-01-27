#!/usr/bin/env node

// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

/*
 stencil 'dist-custom-elements' does not support assets copying, so we do it manually
 */
const fs = require('fs');
const path = require('path');

const assetsSrc = __dirname + '/../assets';
const assetsDst = __dirname + '/../dist/components';

fs.cpSync(assetsSrc, assetsDst, {recursive: true});

console.log('[copy-assets] done');

