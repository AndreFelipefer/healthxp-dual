import popup from "./components/PopUp";

class LoginPage {
  constructor() {
    this.popup = popup;
  }

  go() {
    cy.visit("http://localhost:3000");
  }

  fill(user) {
    if (user.email) {
      cy.get("input[name=email]").clear().type(user.email);
    }

    if (user.password) {
      cy.get("input[name=password]").clear().type(user.password);
    }
  }

  doLogin(user) {
    this.go();
    this.fill(user);
    this.submit();
  }

  submit() {
    cy.contains("button", "Entrar").click();
  }
}

export default new LoginPage();
