import data from "../fixtures/enrollments.json";
import EnrollsPage from "../support/pages/components/EnrollsPage";

describe("Matriculas", () => {
  it("Deve poder matricular um novo aluno", () => {
    const dataTest = data.create;
    // cy.task('deleteEnroll')
    // cy.task("resetStudent", dataTest.student);
    cy.resetStudent(dataTest.student)
    // Realiza o login administrativo
    cy.adminLogin();

    // Navega para a página de matrículas e acessa o formulário
    EnrollsPage.navbar.goToEnrolls();
    EnrollsPage.navbar.goToForm();

    // Seleciona o aluno e o plano
    EnrollsPage.selectItem("student", dataTest.student.name);
    EnrollsPage.selectItem("plan", dataTest.plan.name);

    // Preenche os detalhes do pagamento e submete o formulário
    EnrollsPage.fillCard(dataTest.student);
    EnrollsPage.submit();

    // Verifica se a mensagem de sucesso está visível
    EnrollsPage.popup.haveText("Matrícula cadastrada com sucesso.");
  });

  it("Não deve criar matrícula duplicada", () => {
    const dataTest = data.duplicate;
  
    // cy.task("resetStudent", dataTest.student);
    cy.resetStudent(dataTest.student)
    cy.createEnroll(dataTest)

    cy.adminLogin();

    // Navega para a página de matrículas e acessa o formulário
    EnrollsPage.navbar.goToEnrolls();
    EnrollsPage.navbar.goToForm();

    // Seleciona o aluno e o plano
    EnrollsPage.selectItem("student", dataTest.student.name);
    EnrollsPage.selectItem("plan", dataTest.plan.name);

    // Preenche os detalhes do pagamento e submete o formulário
    EnrollsPage.fillCard(dataTest.student);
    EnrollsPage.submit();
    EnrollsPage.popup.haveText("O aluno já possui matrícula cadastrada!");

  })
  
});
