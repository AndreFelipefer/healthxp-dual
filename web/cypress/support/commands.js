Cypress.Commands.add("popUpHave", (text) => {
  cy.get(".swal2-content").should("be.visible").should("have.text", text);
});

Cypress.Commands.add("deleteStudent", (email) => {
  cy.task('deleteStudent', email);
});
