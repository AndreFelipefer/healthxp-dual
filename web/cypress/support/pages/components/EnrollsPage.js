import navbar from "./NavBar";
import popup from "./PopUp";

class EnrollsPage {
  constructor() {
    this.navbar = navbar;
    this.popup = popup;
  }

  // Seleciona um item de uma lista suspensa
  selectItem(item, value) {
    cy.get(`.select_${item}`).click(); // Abre o menu suspenso

    cy.get(`input[aria-label="select_${item}"]`).type(value); // Digita o valor

    cy.contains(`div[id*=option]`, value).click(); // Seleciona a opção
  }

  // Preenche o formulário de pagamento com os detalhes fornecidos
  fillCard(student) {
    cy.get("#card_number").type("4242424242424242"); // Número do cartão
    cy.get("#card_holder").type(student.name); // Nome no cartão
    cy.get("#card_month").type("12"); // Mês de validade
    cy.get("#card_year").type("2025"); // Ano de validade
    cy.get("#card_cvv").type("123"); // Código CVV
  }

  // Submete o formulário de matrícula
  submit() {
    cy.contains("button", "Cadastrar").click(); // Clica no botão de cadastro
  }
}

export default new EnrollsPage();
