const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demo.bombay.live', // Set baseUrl under e2e
    chromeWebSecurity: false,  // Disable Chrome's web security
    env: {
      SEARCH: "identity checked"
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: false,
    reporter: "mochawesome",
    excludeSpecPattern: "**/examples/*.js", // Use excludeSpecPattern instead of ignoreTestFiles
  }
});
