import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin";

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200',
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config);
    }
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: './',
          sourceRoot: 'src',
          buildOptions: {
            outputPath: 'dist/bundesliga-tabelle-ui',
            /** other options **/
          }
        }
      },
    },

    specPattern: '**/*.cy.ts'
  }

})
