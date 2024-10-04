import navbar from "./components/NavBar";
import popup from "./components/PopUp";
import Notifications from "./components/Notifications";

class StudentPage {

    constructor(){
        this.navbar = navbar
        this.popup = popup
        this.Notifications = Notifications
    }

    goToRegister(){
        cy.contains(".sc-gipzik", "Cadastrar").click();
    }

  submitform(student) {
    if (student.name) cy.get("#name").clear().type(student.name);
    if (student.email)cy.get("#email").clear().type(student.email);
    if (student.age)cy.get("#age").clear().type(student.age);
    if (student.weight)cy.get("#weight").clear().type(student.weight);
    if (student.feet_tall)cy.get("#feet_tall").clear().type(student.feet_tall);
    cy.get(".sc-gzVnrw").click();
  }

  search(name){
    cy.get('input[placeholder="Buscar por nome"]').type(name)

  }

  remove(email){
    cy.contains('tr', email, {timeout: 10000})
    .find('button')
    .click()
  }

  // validField(){
    
  // }

}

export default new StudentPage();
