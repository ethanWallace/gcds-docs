/// <reference types="cypress" />

const frLinks = require('../../src/fr/fr.json');

const pagesFr = [];

// Create index of French pages
Object.keys(frLinks.links).forEach(key => {
  const url = frLinks.links[key];
  if (
    !url.includes('developpement-en-cours') &&
    !url.includes('https') &&
    !url.includes('mailto') &&
    !url.includes('demo')
  ) {
    let regex = /composants\/[a-z]/;
    const pageName = key.replace(/([A-Z])/g, ' $1');
    if (regex.test(url)) {
      pagesFr.push({
        name: `${pageName} - use case`,
        url,
      });
      pagesFr.push({
        name: `${pageName} - design`,
        url: `${url}/design/`,
      });
      pagesFr.push({
        name: `${pageName} - code`,
        url: `${url}/code/`,
      });
    } else {
      pagesFr.push({
        name: `${pageName}`,
        url,
      });
    }
  }
});

describe(`A11Y test French documentation site`, () => {
  after
  for (const page of pagesFr) {
    it(`${page.name}: ${page.url}`, () => {
      cy.visit(page.url, { timeout: 30000 });
      cy.get('.hydrated').then(() => {
        if (page.name === 'page Templates Basic Preview') {
          cy.document().then((doc) => {
            const htmlContent = doc.documentElement.innerHTMl;
            cy.task('log', htmlContent); // Logs in Cypress UI
            let scripts = doc.documentElement.querySelectorAll('script');
            scripts.forEach(script => cy.task('log', script))
          });
        }
        cy.injectAxe();
        cy.checkA11y(null, null, cy.terminalLog);
        // skip theme and topic menu since links are pulled from external source
        if (!page.url.includes('menu-thematique')) {
          cy.scanDeadLinks();
        }
      });
    });
  }
});
