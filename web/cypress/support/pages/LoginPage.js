import popup from "./components/PopUp"; // Importa o componente de popup que será utilizado na classe

class LoginPage {
  constructor() {
    this.popup = popup; // Inicializa o popup no construtor da classe
  }

  go() {
    cy.visit('/'); // Visita a URL da aplicação onde a página de login está localizada
  }

  fill(user) {
    // Limpa os campos de email e senha antes de preenchê-los, utilizando a força para garantir que o campo seja limpo mesmo se estiver oculto ou desabilitado
    cy.get("input[name=email]").clear({ force: true }).as("email");
    cy.get("input[name=password]").clear({ force: true }).as("password");

    // Preenche o campo de email se o valor for fornecido, caso contrário, registra um log informando que o email está vazio
    user.email ? cy.get("@email").type(user.email) : cy.log('empty email');

    // Preenche o campo de senha se o valor for fornecido, caso contrário, registra um log informando que a senha está vazia
    user.password ? cy.get("@password").type(user.password) : cy.log('empty password');
  }

  doLogin(user) {
    this.go(); // Navega até a página de login
    this.fill(user); // Preenche os campos de login com os dados do usuário
    this.submit(); // Submete o formulário de login
  }

  submit() {
    cy.contains("button", "Entrar").click(); // Clica no botão "Entrar" para submeter o formulário de login
  }
}

export default new LoginPage(); // Exporta uma nova instância da classe LoginPage para uso em outros arquivos
