import LoginPage from '../pages/LoginPage'
import testData from '../data/testData'

describe('Final Project - Login dengan POM dan Intercept', () => {
  const loginPage = new LoginPage()
  const data = testData.login

  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/web/index.php/auth/login'
    ).as('getLoginPage')

    loginPage.visit()
    cy.wait('@getLoginPage')
      .its('response.statusCode')
      .should('eq', 200)
  })

  it('TC-LOGIN-001 - Menampilkan komponen halaman login', () => {
    loginPage.verifyLoginPage()
  })

  it('TC-LOGIN-002 - Login berhasil dengan data benar', () => {
    cy.intercept(
      'POST',
      '**/web/index.php/auth/validate'
    ).as('postLogin')

    loginPage.login(
      data.validUsername,
      data.validPassword
    )

    cy.wait('@postLogin').then((interception) => {
      expect(interception.request.method).to.eq('POST')
      expect(interception.response.statusCode).to.be.oneOf([
        200, 302,
      ])
    })

    loginPage.verifyLoginSuccess()
  })

  it('TC-LOGIN-003 - Username dan password kosong', () => {
    loginPage.clickLogin()
    loginPage.verifyRequiredMessage(2)
  })

  it('TC-LOGIN-004 - Username kosong', () => {
    loginPage.inputPassword(data.validPassword)
    loginPage.clickLogin()
    loginPage.verifyRequiredMessage(1)
  })

  it('TC-LOGIN-005 - Password kosong', () => {
    loginPage.inputUsername(data.validUsername)
    loginPage.clickLogin()
    loginPage.verifyRequiredMessage(1)
  })

  it('TC-LOGIN-006 - Username salah', () => {
    cy.intercept(
      'POST',
      '**/web/index.php/auth/validate'
    ).as('invalidLogin')

    loginPage.login(
      data.invalidUsername,
      data.validPassword
    )

    cy.wait('@invalidLogin')
      .its('request.method')
      .should('eq', 'POST')

    loginPage.verifyInvalidCredentials()
  })

  it('TC-LOGIN-007 - Password salah', () => {
    cy.intercept(
      'POST',
      '**/web/index.php/auth/validate'
    ).as('invalidLogin')

    loginPage.login(
      data.validUsername,
      data.invalidPassword
    )

    cy.wait('@invalidLogin')
      .its('request.method')
      .should('eq', 'POST')

    loginPage.verifyInvalidCredentials()
  })

  it('TC-LOGIN-008 - Link Forgot Password', () => {
    loginPage.openForgotPassword()
    loginPage.verifyForgotPasswordPage()
  })
})
