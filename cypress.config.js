const { defineConfig } = require("cypress");
require('dotenv').config()
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  "video": true,
  e2e: {
    chromeWebSecurity: false,
    defaultCommandTimeout: 100000 
  },
  env:{...process.env}
});
