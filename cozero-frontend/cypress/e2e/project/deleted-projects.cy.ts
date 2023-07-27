describe("Project search flow", () => {
  Cypress.Cookies.deleted(true);

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      "next-auth.csrf-token",
      "next-auth.session-token"
    );
    cy.visit("/");
    cy.login();
    cy.wait(500);
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
});
