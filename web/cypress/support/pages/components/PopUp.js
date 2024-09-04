class Popup{
    content() {
        return cy.get("#swal2-content");
      }
      
      haveText(text) {
        cy.get("#swal2-content").should("be.visible").should("have.text", text) ;
      }
      
      validFild(text){
        cy.get(".sc-fAjcbJ > span").should("be.visible").should("have.text", text) ;
      }

      Back() {
        cy.contains("button", "Voltar").click();
      }

      confirm(){
        cy.get('.swal2-confirm').click()
      }
}


export default new Popup()