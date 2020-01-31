describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("Should click on Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains('li', "Tuesday").click()
    .should("have.class", "day-list__item--selected");
  })
});

