describe('Login Feature - OrangeHRM', () => {
  const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(loginUrl)
  })

  it('TC001 - Menampilkan halaman login OrangeHRM', () => {
    cy.get('.orangehrm-login-branding img').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('TC002 - Login berhasil dengan username dan password benar', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC003 - Login gagal jika username dan password kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain', 'Required')
  })

  it('TC004 - Login gagal jika username kosong dan password diisi', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required')
  })

  it('TC005 - Login gagal jika username diisi dan password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required')
  })

  it('TC006 - Login gagal jika username salah dan password benar', () => {
    cy.get('input[name="username"]').type('adminSalah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC007 - Login gagal jika username benar dan password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('passwordSalah')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC008 - Login gagal jika username dan password salah', () => {
    cy.get('input[name="username"]').type('userSalah')
    cy.get('input[name="password"]').type('passwordSalah')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC009 - Field username dapat diisi', () => {
    cy.get('input[name="username"]')
      .type('Admin')
      .should('have.value', 'Admin')
  })

  it('TC010 - Field password dapat diisi', () => {
    cy.get('input[name="password"]')
      .type('admin123')
      .should('have.value', 'admin123')
      .and('have.attr', 'type', 'password')
  })

  it('TC011 - Tombol login memiliki tipe submit', () => {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('contain', 'Login')
  })

  it('TC012 - Link Forgot Password dapat dibuka', () => {
    cy.contains('Forgot your password?').click()

    cy.url().should('include', '/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
  })
})
