import 'dotenv/config'
import users from '../fixtures/users.json'
import login from './pages/LoginPage'

Cypress.Commands.add("popUpHave", (text) => {
  cy.get(".swal2-content").should("be.visible").should("have.text", text);
});

Cypress.Commands.add("deleteStudent", (email) => {
  cy.task('deleteStudent', email);
});



Cypress.Commands.add('adminLogin', () => {
  const user = users.admin
  login.doLogin(user)
})

Cypress.Commands.add('createEnroll', (dataTest) => {

    cy.request({
      url: Cypress.env('apiHelper') + '/enrolls',
      method: 'POST',
      body:{
        email:dataTest.student.email,
        plan_id: dataTest.plan.id,
        price: dataTest.plan.price
      }
    }).then(response => {
      expect(response.status).to.eq(201)
    })
 
  // cy.task("selectStudentID", dataTest.student.email).then((result) => {
  //   const studentID = result.success[0].id; // Extraindo o ID do aluno

  //   const user = users.admin

  //   cy.log(studentID);

  //   cy.request({
  //     url: "http://localhost:3333/sessions",
  //     method: "POST",
  //     body: {
  //       email: user.email,
  //       password: user.password,
  //     }
  //   }).then(response => {
  //     cy.log(response.body.token);

  //     const payload = {
  //       student_id: studentID,  // Usando apenas o ID do aluno
  //       plan_id: dataTest.plan.id,
  //       credit_card: "4242",
  //     };

  //     cy.request({
  //       url: 'http://localhost:3333/enrollments',
  //       method: 'POST',
  //       body: payload,
  //       headers: {
  //         Authorization: 'Bearer ' + response.body.token
  //       }
  //     }).then(response => {
  //       expect(response.status).to.eq(201)
  //     })
  //   })
  // })
})

Cypress.Commands.add('resetStudent', (student) =>{
  cy.request({
    url: Cypress.env('apiHelper') + '/students',
    method: 'POST',
    body: student
  }).then(response => {
    expect(response.status).to.eq(201)
    cy.log(response.body.student_id)
    Cypress.env('studentId',response.body.student_id)
  })
})

Cypress.Commands.add('deleteStudent', (studentEmail) =>{
  cy.request({
    url: Cypress.env('apiHelper') + '/students/' + studentEmail,
    method: 'DELETE',
  }).then(response => {
    expect(response.status).to.eq(204)
  })
})


Cypress.Commands.add('createQuestion', (question) => {
  cy.request({
    url: `http://localhost:3333/students/${Cypress.env('studentId')}/help-orders`,
    method: 'POST',
    body: {question}
  }).then(response => {
    expect(response.status).to.eq(201)
  })
})