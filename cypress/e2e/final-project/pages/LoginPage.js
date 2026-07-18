class LoginPage {
  selectors = {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    requiredMessage: '.oxd-input-field-error-message',
    invalidAlert: '.oxd-alert-content-text',
    forgotPassword: '.orangehrm-login-forgot-header',
    dashboardTitle: 'h6',
  }

  visit() {
  cy.visit({
    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    retryOnStatusCodeFailure: true,
    retryOnNetworkFailure: true,
  })
}

  inputUsername(username) {
    cy.get(this.selectors.username).clear().type(username)
  }

  inputPassword(password) {
    cy.get(this.selectors.password).clear().type(password)
  }

  clickLogin() {
    cy.get(this.selectors.loginButton).click()
  }

  login(username, password) {
    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
  }

  verifyLoginPage() {
    cy.get(this.selectors.username).should('be.visible')
    cy.get(this.selectors.password).should('be.visible')
    cy.get(this.selectors.loginButton)
      .should('be.visible')
      .and('contain.text', 'Login')
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard')
    cy.contains('h6', 'Dashboard').should('be.visible')
  }

  verifyRequiredMessage(total) {
    cy.get(this.selectors.requiredMessage)
      .should('have.length', total)
      .and('contain.text', 'Required')
  }

  verifyInvalidCredentials() {
    cy.get(this.selectors.invalidAlert)
      .should('be.visible')
      .and('contain.text', 'Invalid credentials')
  }

  verifyUsernameValue(username) {
    cy.get(this.selectors.username).should('have.value', username)
  }

  verifyPasswordHidden() {
    cy.get(this.selectors.password).should(
      'have.attr',
      'type',
      'password'
    )
  }

  openForgotPassword() {
    cy.get(this.selectors.forgotPassword).click()
  }

  verifyForgotPasswordPage() {
    cy.url().should('include', '/requestPasswordResetCode')
    cy.contains('h6', 'Reset Password').should('be.visible')
  }
}

export default LoginPage
