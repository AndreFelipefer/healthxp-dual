import users from "../fixtures/users.json";
import login from "../support/pages/LoginPage";
import students from "../fixtures/students.json";
import StudentPage from "../support/pages/StudentPage";

describe("Alunos", () => {
  it("deve poder cadastrar um novo aluno", () => {
    const user = users.admin;
    const student = students.create;

    cy.deleteStudent(student.email);
    login.doLogin(user);
    StudentPage.goToRegister();

    StudentPage.submitform(student);
    StudentPage.popup.haveText("Dados cadastrados com sucesso.");
  });

  it("Não deve cadastrar com email duplicado", () => {
    const user = users.admin;
    const student = students.duplicate;
    cy.task("resetStudent", student);

    login.doLogin(user);
    StudentPage.goToRegister();

    StudentPage.submitform(student);
    StudentPage.popup.haveText("O email informado já foi cadastrado!");
  });

  it("deve remover aluno sem matricula", () => {
    const student = students.remove;
    const user = users.admin;

    cy.task("resetStudent", student);
    login.doLogin(user);
    // td[text()="johndoe@gmail.com"]/..//button
    StudentPage.search(student.name)
    StudentPage.remove(student.email)
    StudentPage.popup.confirm()
    StudentPage.popup.haveText('Exclusão realizada com sucesso.')
  });

  it.only('Todos os campos são obrigatórios', () => {
    const student = students.required
    const user = users.admin;
    login.doLogin(user);
    StudentPage.goToRegister()
    StudentPage.submitform(student)
    const textos = ["A altura é obrigatória", "O peso é obrigatório", "A idade é obrigatória", "O email é obrigatório", "Nome é obrigatório"]
    for (let i = 0; i < textos.length; i++) {
      cy.contains(textos[i]).should('be.visible');
    }
    
    
  });
});
