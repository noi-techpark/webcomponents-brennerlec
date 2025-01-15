#!/usr/bin/env node

// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const fs = require('fs');
const path = require('path');

const manifestFile = __dirname + '/../wcs-manifest.json';
const fileContent = fs.readFileSync(manifestFile, 'utf8');
const fileData = JSON.parse(fileContent);

//
const folderPath = path.normalize(path.join(__dirname, '../', fileData.dist.basePath));
console.log('[manifest] Add files from:', folderPath);
const dirContent = fs.readdirSync(folderPath);
const jsFiles = dirContent.filter(f => f.endsWith('.js'));

if (!jsFiles.length) {
  throw new Error('No files found');
}

if (process.argv.includes('-v') || process.argv.includes('--verbose')) {
  console.log(jsFiles);
}

//
fileData.dist.files = jsFiles;
fs.writeFileSync(manifestFile, JSON.stringify(fileData, null, 2));

console.log('[manifest] %s files found', jsFiles.length);

