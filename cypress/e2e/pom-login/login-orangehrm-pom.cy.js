import LoginPage from './pages/LoginPage'
import loginData from './data/loginData'

describe('OrangeHRM Login Feature menggunakan POM', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visit()
  })

  it('TC001 - Menampilkan komponen utama halaman login', () => {
    cy.get(loginPage.usernameInput).should('be.visible')
    cy.get(loginPage.passwordInput).should('be.visible')
    cy.get(loginPage.loginButton)
      .should('be.visible')
      .and('contain.text', 'Login')
  })

  it('TC002 - Login berhasil dengan username dan password benar', () => {
    loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    )

    loginPage.verifyLoginSuccess()
  })

  it('TC003 - Login gagal jika username dan password kosong', () => {
    loginPage.clickLogin()
    loginPage.verifyRequiredMessages(2)
  })

  it('TC004 - Login gagal jika username kosong', () => {
    loginPage.enterPassword(loginData.validUser.password)
    loginPage.clickLogin()

    loginPage.verifyRequiredMessages(1)
  })

  it('TC005 - Login gagal jika password kosong', () => {
    loginPage.enterUsername(loginData.validUser.username)
    loginPage.clickLogin()

    loginPage.verifyRequiredMessages(1)
  })

  it('TC006 - Login gagal jika username salah', () => {
    loginPage.login(
      loginData.wrongUsername.username,
      loginData.wrongUsername.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC007 - Login gagal jika password salah', () => {
    loginPage.login(
      loginData.wrongPassword.username,
      loginData.wrongPassword.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC008 - Login gagal jika username dan password salah', () => {
    loginPage.login(
      loginData.invalidUser.username,
      loginData.invalidUser.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC009 - Field username dapat menerima data', () => {
    loginPage.enterUsername(loginData.validUser.username)

    loginPage.verifyUsernameValue(loginData.validUser.username)
  })

  it('TC010 - Field password dapat menerima dan menyembunyikan data', () => {
    loginPage.enterPassword(loginData.validUser.password)

    loginPage.verifyPasswordValue(loginData.validUser.password)
  })

  it('TC011 - Tombol Login terlihat dan dapat diklik', () => {
    cy.get(loginPage.loginButton)
      .should('be.visible')
      .and('be.enabled')
      .click()

    loginPage.verifyRequiredMessages(2)
  })

  it('TC012 - Link Forgot Password membuka halaman reset password', () => {
    loginPage.clickForgotPassword()
    loginPage.verifyForgotPasswordPage()
  })
})
