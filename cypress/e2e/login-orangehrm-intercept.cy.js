describe('Login Feature OrangeHRM dengan Intercept', () => {
  const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  const expectBodyContains = (body, text) => {
    const bodyText = typeof body === 'string' ? body : JSON.stringify(body)
    expect(bodyText).to.include(text)
  }

  it('TC001 - Menampilkan halaman login dan intercept halaman auth login', () => {
    cy.intercept('GET', '**/web/index.php/auth/login').as('getLoginPage')

    cy.visit(loginUrl)

    cy.wait('@getLoginPage').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })

    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('TC002 - Menampilkan form login dan intercept data bahasa', () => {
    cy.intercept('GET', '**/web/index.php/core/i18n/messages').as('getMessages')

    cy.visit(loginUrl)

    cy.wait('@getMessages').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })

    cy.contains('Login').should('be.visible')
    cy.contains('Username').should('be.visible')
    cy.contains('Password').should('be.visible')
  })

  it('TC003 - Login berhasil dengan username dan password benar', () => {
    cy.visit(loginUrl)

    cy.intercept('POST', '**/web/index.php/auth/validate').as('validLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@validLogin').then((interception) => {
      expect(interception.request.method).to.eq('POST')
      expectBodyContains(interception.request.body, 'Admin')
    })

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC004 - Login gagal jika username dan password kosong', () => {
    cy.intercept('GET', '**/web/index.php/auth/login').as('emptyLoginPage')

    cy.visit(loginUrl)

    cy.wait('@emptyLoginPage').then((interception) => {
      expect(interception.request.method).to.eq('GET')
    })

    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain', 'Required')
  })

  it('TC005 - Login gagal jika username kosong dan password diisi', () => {
    cy.intercept('GET', '**/web/index.php/core/i18n/messages').as('usernameRequiredMessage')

    cy.visit(loginUrl)

    cy.wait('@usernameRequiredMessage').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required')
  })

  it('TC006 - Login gagal jika username diisi dan password kosong', () => {
    cy.intercept('GET', '**/web/index.php/auth/login').as('passwordRequiredPage')

    cy.visit(loginUrl)

    cy.wait('@passwordRequiredPage').then((interception) => {
      expect(interception.response.headers['content-type']).to.include('text/html')
    })

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required')
  })

  it('TC007 - Login gagal jika username salah dan password benar', () => {
    cy.visit(loginUrl)

    cy.intercept('POST', '**/web/index.php/auth/validate').as('wrongUsernameLogin')

    cy.get('input[name="username"]').type('adminSalah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongUsernameLogin').then((interception) => {
      expect(interception.request.method).to.eq('POST')
      expectBodyContains(interception.request.body, 'adminSalah')
    })

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC008 - Login gagal jika username benar dan password salah', () => {
    cy.visit(loginUrl)

    cy.intercept('POST', '**/web/index.php/auth/validate').as('wrongPasswordLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('passwordSalah')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongPasswordLogin').then((interception) => {
      expect(interception.request.method).to.eq('POST')
      expectBodyContains(interception.request.body, 'passwordSalah')
    })

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })
})
