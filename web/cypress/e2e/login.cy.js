import users from "../fixtures/users.json";
import loginPage from "../support/pages/LoginPage";
import StudentPage from "../support/pages/StudentPage";

describe("login", () => {
  //IT (Caso de teste)
  it("Deve logar com o perfil do Admin", () => {
    // Dado que eu tenho um usuario admin cadastrado

    const user = users.admin;

    loginPage.doLogin(user)
    // cy.doLogin(user);
    StudentPage.navbar.userLoggedIn(user.name)
    // cy.fixture("users").then((users) => {
    //   cy.contains("aside .logged-user", "Olá, ", user.name).should(
    //     "be.visible"
    //   );
    // });
  });

  it("Não deve logar com senha incorreta", () => {
    const user = users.inv_pass;
    loginPage.doLogin(user)
    loginPage.popup.haveText("Suas credenciais são inválidas, por favor tente novamente!");
  });

  it("Não deve logar com email não cadastrado", () => {
    const user = users.email_not_found;
    loginPage.doLogin(user)
    loginPage.popup.haveText("Suas credenciais são inválidas, por favor tente novamente!");
  });

  it("Não deve logar com emails incorretos", () => {
    const emails = users.emails_incorretos;
    
    loginPage.go()
    
    emails.forEach((u) => {
      loginPage.fill(u)
      loginPage.submit()
      loginPage.popup.haveText("Insira um email válido.");
      loginPage.popup.Back()
    });


  });

  it("Não deve logar com e-mail em branco", () => {
    const user = users.empty_email;
    loginPage.doLogin(user)
    loginPage.popup.haveText("Os campos email e senha são obrigatórios.");
  });

  it("Verifica preenchimento de dados obrigatorios", () => {
    const user = users.empty_password;
    loginPage.doLogin(user)
    loginPage.popup.haveText("Os campos email e senha são obrigatórios.");
  });
});

