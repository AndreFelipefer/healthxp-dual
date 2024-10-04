const { I } = inject();

class account {
  constructor() {
    //insert your locators
    // this.button = '#button'
  }
  // insert your methods here

  userLoggedIn(){
    I.see('Minha conta')
  }
}

// For inheritance
module.exports = new account();

