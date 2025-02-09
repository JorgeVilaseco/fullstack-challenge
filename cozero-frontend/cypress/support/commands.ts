/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add("login", () => {
  cy.get("#new-project").click();
  // Fill email and password type inputs
  cy.get('input[name="email"]').type(Cypress.env("COZERO_TEST_USER"));
  cy.get('input[name="password"]').type(Cypress.env("COZERO_TEST_PASSWORD"));
  // Click on the submit type button
  cy.get("button").contains("Sign in").click();
});
Cypress.Commands.add("deleteProject", (id: number) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("COZERO_TEST_API")}/auth/login`,
    body: {
      email: Cypress.env("COZERO_TEST_USER"),
      password: Cypress.env("COZERO_TEST_PASSWORD"),
    },
  }).then(({ body }) => {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("COZERO_TEST_API")}/projects/${id}`,
      headers: {
        Authorization: `Bearer ${body.access_token}`,
      },
    });
  });
  cy.request;
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;

      deleteProject(id: number): Chainable<void>;
    }
  }
}
export {};
