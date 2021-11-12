import { wait, waitFor } from "@testing-library/dom";

it("visits the app", () => {
  cy.visit("/");
});

it("accepts input", () => {
  const input = "Deli";
  cy.get('input[type="text"]').type(input).should("have.value", input);
});

it("search deli restaurants", () => {
  cy.get('input[type="submit"]').click();
  cy.get('.restaurant-card')
    .should('have.length', 5)
});

it("filter best rating", () => {
    cy.get('.filter-component .MuiRating-root').children().last().click({force: true})
    cy.wait(500)
    cy.get('.restaurant-card').first().find('.MuiTypography-root').first().should("have.text", "Bang Delicious");
});