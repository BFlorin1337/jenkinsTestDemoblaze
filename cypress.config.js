const { defineConfig } = require("cypress");
const multiReporters = require("@jesus.guerrero/cypress-multi-reporters");
const xunitReporter = require("@cypress/xunit");
const jsonReporter = require("cypress-multi-reporters/lib/reporters/json-reporter");

module.exports = defineConfig({
  // Other Cypress configuration options...

  // Plugins configuration
  plugins: [
    multiReporters({
      reporters: {
        xunit: {
          reporter: xunitReporter,
          outputFile: "results/xunit.xml",
        },
        json: {
          reporter: jsonReporter,
          outputFile: "results/json/results.json",
        },
      },
    }),
  ],

  // End-to-end test configuration
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
