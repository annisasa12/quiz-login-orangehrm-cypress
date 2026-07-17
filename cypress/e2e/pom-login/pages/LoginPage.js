class LoginPage {
  usernameInput = 'input[name="username"]'
  passwordInput = 'input[name="password"]'
  loginButton = 'button[type="submit"]'
  requiredMessage = '.oxd-input-field-error-message'
  invalidCredentialAlert = '.oxd-alert-content-text'
  forgotPasswordLink = '.orangehrm-login-forgot-header'

  visit() {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    )
  }

  enterUsername(username) {
    cy.get(this.usernameInput).clear().type(username)
  }

  enterPassword(password) {
    cy.get(this.passwordInput).clear().type(password)
  }

  clickLogin() {
    cy.get(this.loginButton).click()
  }

  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLogin()
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  }

  verifyInvalidCredentials() {
    cy.get(this.invalidCredentialAlert)
      .should('be.visible')
      .and('contain.text', 'Invalid credentials')
  }

  verifyRequiredMessages(totalMessage) {
    cy.get(this.requiredMessage)
      .should('have.length', totalMessage)
      .and('contain.text', 'Required')
  }

  verifyUsernameValue(username) {
    cy.get(this.usernameInput).should('have.value', username)
  }

  verifyPasswordValue(password) {
    cy.get(this.passwordInput)
      .should('have.value', password)
      .and('have.attr', 'type', 'password')
  }

  clickForgotPassword() {
    cy.get(this.forgotPasswordLink).click()
  }

  verifyForgotPasswordPage() {
    cy.url().should('include', '/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
  }
}

export default LoginPage
