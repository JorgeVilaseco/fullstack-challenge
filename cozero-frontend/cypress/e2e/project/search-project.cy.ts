describe("Project search flow", () => {
  Cypress.Cookies.debug(true);

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      "next-auth.csrf-token",
      "next-auth.session-token"
    );
    cy.visit("/");
  });

  it("should be able to search for projects by text", () => {
    cy.contains("a", "Projects").click();
    cy.get("#search-btn").click();
    cy.wait(1000);
    cy.get("#search-input").type("lorem").type("{enter}");
    cy.wait(500);
    cy.get(".project-item").should("have.length", 3);
  });
  it("should be able to search for projects from other pages", () => {
    cy.get("#search-btn").click();
    cy.wait(1000);
    cy.get("#search-input").type("lorem").type("{enter}");
    cy.wait(500);
    cy.get(".project-item").should("have.length", 3);
  });
  it("should be able to delete the search", () => {
    cy.get("#search-btn").click();
    cy.wait(1000);
    cy.get("#search-input").type("lorem").type("{enter}");
    cy.get(".project-item").should("have.length", 3);

    cy.get("#search-input").type("{esc}");
    cy.get(".project-item").should("have.length.greaterThan", 3);
  });
});
