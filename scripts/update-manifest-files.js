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
const distPath = path.normalize(path.join(__dirname, '../', fileData.dist.basePath));
console.log('[manifest] Add files from:', distPath);
const dirContent = fs.readdirSync(distPath, {recursive: true, withFileTypes: true});

// determine files to include
const jsFiles = dirContent.filter(f => {
  if (!f.isFile()) {
    return false;
  }
  return !f.name.endsWith('.js.map');
});

if (!jsFiles.length) {
  throw new Error('No files found');
}

// get relative path
const relativePath = jsFiles.map(dirent => {
  const fullPath = (dirent.parentPath || dirent.path) + '/' + dirent.name;
  return path.relative(distPath, fullPath);
})

// print files to copy
if (process.argv.includes('-v') || process.argv.includes('--verbose')) {
  console.log(relativePath);
}

//
fileData.dist.files = relativePath;
fs.writeFileSync(manifestFile, JSON.stringify(fileData, null, 2));

console.log('[manifest] %s files found', relativePath.length);

