describe("Registration flow", () => {
  it("Visit CoZero challenge", () => {
    cy.visit("/");
  });

  it("Register new user", () => {
    // Search a 'Sign up' element
    cy.get("#signin").click();
    cy.get("#signup").click();

    // Enter a email and password and click 'Create account'
    cy.get('input[name="email"]').type("hola@hola.com");
    cy.get('input[name="password"]').type("hola");
    cy.get("button").contains("Create account").click();
    //Search 'Sign out' text

    cy.get("#signin").contains("Sign out");
    // Not allowed to access to /register

    cy.visit("/sign-up");
    cy.get("button").contains("Create account").should("not.exist");
  });
});
