module.exports = function() {
  return actor({

    popUpHaveText(text){
      this.see(text, '#android:id/message')
    },

    resetStudent(student){
      this.sendPostRequest('/students', student)
      this.seeResponseCodeIsSuccessful()  // Correção na função
    },

    async createEnroll(dataTest){
      const response = await this.sendPostRequest('/enrolls', {
        email: dataTest.student.email,
        plan_id: dataTest.plan.id,
        price: dataTest.plan.price
      })
      this.seeResponseCodeIsSuccessful()  // Correção na função

      return response.data.enrollment_code
    }

  });
}
