const students = require('../fixtures/students.json')

Feature('login');

Scenario('Deve logar com sucesso', async ({ I, login, account }) => {
    const dataTest = students.success_login;

    I.resetStudent(dataTest.student)
    const enrollment_code = await I.createEnroll(dataTest)
    login.width(enrollment_code)
    account.userLoggedIn()

});


Scenario('Não deve logar com matricula inexistente', ({ I, login }) => {
    login.width('ABC123')
    I.popUpHaveText('Acesso não autorizado! Entre em contato com a central de atendimento')

});

Scenario('Não deve logar com plano Health', async ({ I, login }) => {
    const dataTest = students.not_login;

    I.resetStudent(dataTest.student)
    const enrollment_code = await I.createEnroll(dataTest)

    login.width(enrollment_code)
    I.popUpHaveText('Seu plano não possui permissão para uso do App! Entre em contato com a central de atendimento.')

})