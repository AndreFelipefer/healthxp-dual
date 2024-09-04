import students from "../fixtures/students.json"; // Importa os dados dos alunos de um arquivo JSON.
import StudentPage from "../support/pages/StudentPage"; // Importa a página de ações relacionadas aos alunos.

describe("Alunos", () => {
  // Teste que verifica se um novo aluno pode ser cadastrado com sucesso
  it("deve poder cadastrar um novo aluno", () => {
    const student = students.create; // Seleciona o aluno a ser criado a partir do JSON.
    // cy.deleteStudent(student.email); // Remove o aluno do banco de dados caso já exista.
    cy.deleteStudent(student.email)
    cy.adminLogin(); // Realiza o login como administrador.

    StudentPage.goToRegister(); // Navega até a página de registro de alunos.
    StudentPage.submitform(student); // Submete o formulário com os dados do novo aluno.
    StudentPage.popup.haveText("Dados cadastrados com sucesso."); // Verifica se a mensagem de sucesso foi exibida.
  });

  // Teste que verifica se o sistema impede o cadastro de um aluno com email duplicado
  it("Não deve cadastrar com email duplicado", () => {
    const student = students.duplicate; // Seleciona o aluno com email duplicado.
    // cy.task("resetStudent", student); // Reseta o estado do aluno no banco de dados.
    cy.resetStudent(student)

    cy.adminLogin(); // Realiza o login como administrador.
    StudentPage.goToRegister(); // Navega até a página de registro de alunos.

    StudentPage.submitform(student); // Tenta submeter o formulário com o email duplicado.
    StudentPage.popup.haveText("O email informado já foi cadastrado!"); // Verifica se a mensagem de erro foi exibida.
  });

  // Teste que verifica se é possível remover um aluno que não possui matrícula
  it("deve remover aluno sem matricula", () => {
    const student = students.remove; // Seleciona o aluno a ser removido.

    // cy.task("resetStudent", student); // Reseta o estado do aluno no banco de dados.
    cy.resetStudent(student)
    cy.adminLogin(); // Realiza o login como administrador.

    StudentPage.search(student.name); // Pesquisa o aluno pelo nome.
    StudentPage.remove(student.email); // Inicia a remoção do aluno.
    StudentPage.popup.confirm(); // Confirma a exclusão.
    StudentPage.popup.haveText("Exclusão realizada com sucesso."); // Verifica se a mensagem de sucesso foi exibida.
  });

  // Teste que verifica se o sistema impede o cadastro de um aluno quando campos obrigatórios estão vazios
  it("Todos os campos são obrigatórios", () => {
    const student = students.required; // Seleciona o conjunto de dados incompletos do aluno.
    cy.adminLogin(); // Realiza o login como administrador.

    StudentPage.goToRegister(); // Navega até a página de registro de alunos.
    StudentPage.submitform(student); // Tenta submeter o formulário com campos obrigatórios vazios.

    const textos = [
      "A altura é obrigatória",
      "O peso é obrigatório",
      "A idade é obrigatória",
      "O email é obrigatório",
      "Nome é obrigatório",
    ];
    
    // Verifica se todas as mensagens de erro referentes aos campos obrigatórios são exibidas.
    for (let i = 0; i < textos.length; i++) {
      cy.contains(textos[i]).should("be.visible");
    }
  });

  // Teste que verifica se o sistema impede o cadastro de um aluno com idade abaixo de 16 anos
  it("Não deve cadastrar aluno com menos de 16 anos", () => {
    const student = students.inval_AgeUnder16; // Seleciona o aluno com idade abaixo de 16 anos.
    cy.deleteStudent(student.email); // Remove o aluno do banco de dados caso já exista.

    cy.adminLogin(); // Realiza o login como administrador.
    StudentPage.goToRegister(); // Navega até a página de registro de alunos.

    StudentPage.submitform(student); // Tenta submeter o formulário com a idade inválida.
    StudentPage.popup.validFild("A idade mínima para treinar é 16 anos!"); // Verifica se a mensagem de erro foi exibida.
  });

  // Teste que verifica se o sistema impede o cadastro de um aluno com idade superior a 90 anos
  it("Não deve cadastrar aluno com idade superior a 90 anos", () => {
    const student = students.inv_AgeOver90; // Seleciona o aluno com idade superior a 90 anos.
    cy.deleteStudent(student.email); // Remove o aluno do banco de dados caso já exista.

    cy.adminLogin(); // Realiza o login como administrador.
    StudentPage.goToRegister(); // Navega até a página de registro de alunos.

    StudentPage.submitform(student); // Tenta submeter o formulário com a idade inválida.
    StudentPage.popup.validFild("A idade máxima para treinar é 90 anos!"); // Verifica se a mensagem de erro foi exibida.
  });

  // Teste que verifica se o sistema impede o cadastro de um aluno com altura inferior a 0
  it.skip("Não deve cadastrar aluno com altura inferior a 0", () => { 
    const student = students.inv_feet_tall; // Seleciona o aluno com altura inválida.

    cy.adminLogin(); // Realiza o login como administrador.
    StudentPage.goToRegister(); // Navega até a página de registro de alunos.

    StudentPage.submitform(student); // Tenta submeter o formulário com a altura inválida.
    StudentPage.popup.validFild("Altura mínima não permitida."); // Verifica se a mensagem de erro foi exibida.
  });

  // Teste que verifica se o sistema impede o cadastro de um aluno com peso negativo
  it.skip("Não deve cadastrar aluno com idade negativa", () => { 
    const student = students.inv_negativeWeight; // Seleciona o aluno com peso negativo.

    cy.adminLogin(); // Realiza o login como administrador.
    StudentPage.goToRegister(); // Navega até a página de registro de alunos.

    StudentPage.submitform(student); // Tenta submeter o formulário com o peso negativo.
    StudentPage.popup.validFild("Peso informado incorretamente"); // Verifica se a mensagem de erro foi exibida.
  });

  // Teste que verifica se o sistema impede o cadastro de um aluno com altura negativa
  it.skip("Não deve cadastrar aluno com altura negativa", () => { 
    const student = students.inv_negativeFeet_tall; // Seleciona o aluno com altura negativa.

    cy.adminLogin(); // Realiza o login como administrador.
    StudentPage.goToRegister(); // Navega até a página de registro de alunos.

    StudentPage.submitform(student); // Tenta submeter o formulário com a altura negativa.
    StudentPage.popup.validFild("Altura informada incorretamente"); // Verifica se a mensagem de erro foi exibida.
  });
});
