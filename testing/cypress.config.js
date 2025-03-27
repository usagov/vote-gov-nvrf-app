/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'https://federalist-aef5b597-8e18-44b6-aeba-3fc3f17cdac1.sites.pages.cloud.gov/site/usagov/vote-gov-nvrf-app/',
    baseUrl: 'http://localhost:5173/',
    redirectionLimit: 100,
    video: false,
    viewportHeight: 800,
    viewportWidth: 1530,
    chromeWebSecurity: false,
    "retries": {
      "runMode": 2,
    },
    responsetimeout: 10000,
    "blockHosts": ["www.google-analytics.com", "ssl.google-analytics.com"],

    env: {
      "username": "vote-gov-prototype",
      "password": "password"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        log(message) {
          console.log(message)

          return null
        },
        table(message) {
          console.table(message)

          return null
        }
      })
    },
  },
});