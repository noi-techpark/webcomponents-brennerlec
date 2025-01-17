import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  // globalStyle: 'src/global/app.css',
  // globalScript: 'src/global/app.ts',
  // taskQueue: 'async',
  bundles: [
    {
      components: [
        'hello-world'
      ]
    },
  ],
  outputTargets: [
    {
      type: 'www',
      dir: 'dist',
      buildDir: '',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      // baseUrl: 'https://myapp.local/',
    },
  ],

  devServer: {
    port: 8998,
  }
};
