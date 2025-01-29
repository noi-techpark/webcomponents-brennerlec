#!/usr/bin/env node

// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

/*
 stencil 'dist-custom-elements' does not support assets copying, so we do it manually
 */
const fs = require('fs');
const path = require('path');
const rollup = require('rollup');

const LOGTAG = 'generate-bundles';

///
(async function () {

  console.log(`[${LOGTAG}] generate bundles`);
  console.log(`[${LOGTAG}] using "rollup" v${rollup.VERSION}`);

  const bundlesConfigFile = __dirname + '/../bundle-config/bundles.json';
  const fileContent = fs.readFileSync(bundlesConfigFile, 'utf8');
  const fileData = JSON.parse(fileContent);
  // console.log(fileData);

  for (let i = 0; i < fileData.length; i++) {
    const bundleConfig = fileData[i];
    await generateBundle(bundleConfig, bundleConfig.name || ('job-' + i));
  }
  console.log(`[${LOGTAG}] done`);
})().catch(e => {
  console.error(e);
  process.exit(1);
});

/**
 * @param config {object}
 * @param config.entryPoint {string} bundle entry point
 * @param config.outputDir {string} bundle folder
 * @param config.manifest {string} wcs-manifest
 * @param [config.copy] {Array<{src:string, dst:string}>} copy assets
 * @param jobName {string} job name
 */
async function generateBundle(config, jobName) {
  console.log(`[${LOGTAG}] (${jobName}) start`);

  const entryPoint = path.normalize(path.join(__dirname, '../', config.entryPoint));
  const entryFilename = path.basename(config.entryPoint);

  const targetDir = path.normalize(path.join(__dirname, '../', config.outputDir));
  const targetFile = path.join(targetDir, entryFilename);

  // clear output folder
  fs.rmSync(targetDir, {recursive: true});

  // console.log(`[${LOGTAG}] bundle component "${entryPoint}" into "${targetFile}"`);

  //// create a bundle
  await rollup.rollup({
    input: entryPoint,
    treeshake: false, // already shaken by stencil
  }).then(b => b.write({
    file: targetFile,
  }));

  //// copy assets
  if (config.copy?.length) {
    for (const copyConfig of config.copy) {

      const srcFile = path.normalize(path.join(__dirname, '../', copyConfig.src));
      const srcFilename = path.basename(srcFile);
      const dstFile = path.join(targetDir, copyConfig.dst, srcFilename);

      console.log(`[${LOGTAG}]   copy "${srcFilename}"`);
      fs.cpSync(srcFile, dstFile, {recursive: true});
    }
  }

  //// update manifest
  // TBD
  // may be not needed, as it has fixed names

  //// copy manifest
  const manifestFile = path.normalize(path.join(__dirname, '../', config.manifest));
  console.log(`[${LOGTAG}]   copy manifest "${manifestFile}"`);
  const manifestDest = path.join(targetDir, 'wcs-manifest.json');
  fs.cpSync(manifestFile, manifestDest, {recursive: true});

  console.log(`[${LOGTAG}] (${jobName}) done `);
}
