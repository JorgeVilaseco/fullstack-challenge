describe("Project search flow", () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      "next-auth.csrf-token",
      "next-auth.session-token"
    );
    cy.visit("/");
    cy.login();
    cy.wait(500);
    cy.deleteProject(19);
  });

  it("should be able to see deleted projects by user", () => {
    cy.contains("a", "Deleted Projects").click();
    cy.wait(500);
    cy.get(".project-item").should("have.length", 1);
    cy.get(".project-item").should(
      "contain.text",
      Cypress.env("COZERO_TEST_USER")
    );
  });
  it("should be able to reinstate a project previously deleted", () => {
    cy.contains("a", "Deleted Projects").click();
    cy.wait(500);
    cy.get(".project-item").should("have.length", 1);
    cy.get("#reinstate-project-btn").click();
    cy.contains("button", "Yes").click();
    cy.wait(500);
    cy.get(".project-item").should("have.length", 0);
  });
});
