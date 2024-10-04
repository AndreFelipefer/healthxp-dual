const { I } = inject();

class login {
  constructor() {
    //insert your locators
    // this.button = '#button'
  }
  // insert your methods here

  width(enrollment_code){
    I.seeAppIsInstalled('com.papitorocks.healthxp')
    I.fillField('#ipAddress', '192.168.1.75')
    I.fillField('#enrollment_code', enrollment_code)
    I.click('#btnLogin')
  }
}

// For inheritance
module.exports = new login();

