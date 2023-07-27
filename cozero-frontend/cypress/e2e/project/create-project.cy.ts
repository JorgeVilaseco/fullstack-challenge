// TODO: Generate random project information
describe("Project creation flow", () => {
  Cypress.Cookies.debug(true);

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      "next-auth.csrf-token",
      "next-auth.session-token"
    );
    cy.visit("/");
    cy.login();
    cy.wait(500);
  });

  it("should be available after the user is logged in", () => {
    cy.get("#new-project").click();
    cy.get('input[name="name"]').type("New project WENARDO");
    // Fill description
    cy.get('textarea[name="description"]').type("This is a new project");

    //Type a proposal in input with id listing-proposal-input
    cy.get("#listing-proposal-input").type("This is a new proposal");
    // Hit enter
    cy.get("#listing-proposal-input").type("{enter}");
    // Check if the proposal is in the list
    cy.get("#listing-proposals").contains("This is a new proposal");
    // Create another proposal
    cy.get("#listing-proposal-input").type("This is another proposal");
    cy.get("#listing-proposal-input").type("{enter}");
    // Check if the proposal is in the list
    cy.get("#listing-proposals").contains("This is another proposal");

    // Click on the 'Create project' button
    cy.get("button").contains("Create Project").click();
    // Wait for the page to load
    cy.wait(500);
    // Check if the url contains /projects
    cy.url().should("include", "/projects");
    // Check if the project name is in whole page
    cy.get("p").contains("New project");
  });
});
