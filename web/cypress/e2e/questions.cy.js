import data from '../fixtures/questions.json'
import StudentPage from '../support/pages/StudentPage';

describe('receber perguntas', () =>{

    it('Deve poder receber uma notificação com uma pergunta do aluno', () => {
        const dataTest = data.notification;

        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.question)

        cy.adminLogin()
        StudentPage.navbar.openNotifications()
        StudentPage.Notifications.haveQuestion(dataTest.question)
    });
    

    it.only('Deve poder responder a pergunta de alunos', () => {
        const dataTest = data.teacher_answer;

        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.question)

        cy.adminLogin()

        StudentPage.navbar.openNotifications()
        StudentPage.Notifications.openQuestion(dataTest.question)
        StudentPage.Notifications.sendAnswer(dataTest.answer)
        StudentPage.popup.haveText('Resposta enviada com sucesso')
        cy.contains('button', 'OK').click()
    });
} )

