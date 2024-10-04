class NavBar {
  userLoggedIn(name) {
    // Corrigi o nome do método para "userLoggedIn" para refletir melhor sua funcionalidade
    cy.contains(".logged-user", `Olá, ${name}`).should("be.visible");
  }

  goToEnrolls() {
    cy.get('a[href="/enrollments"]').click();
  }

  goToForm() {
    cy.get('a[href="/enrollments/new"]').click();
  }

  openNotifications(){
    cy.get('.notifications  button').click({force:true})
  }

  
}

export default new NavBar(); // Exporta uma instância da classe NavBar
