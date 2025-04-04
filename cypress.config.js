const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
    
          return null
        },
        table(message) {
          console.table(message)
    
          return null
        },
        readHtmlFile(filename) {
          try {
            const data = fs.readFileSync(filename, 'utf8');
            return data; // Return the HTML content
          } catch (err) {
            return `Error reading file: ${err.message}`;
          }
        }
      })
    },
    baseUrl: 'http://localhost:8080',
    viewportWidth: 1280,
    viewportHeight: 850,
    screenshotOnRunFailure: false,
    video: false,
  },
});
