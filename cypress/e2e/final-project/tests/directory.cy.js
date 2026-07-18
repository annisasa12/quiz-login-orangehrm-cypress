import LoginPage from '../pages/LoginPage'
import DirectoryPage from '../pages/DirectoryPage'
import testData from '../data/testData'

describe('Final Project - Directory dengan POM dan Intercept', () => {
  const loginPage = new LoginPage()
  const directoryPage = new DirectoryPage()

  beforeEach(() => {
    loginPage.visit()

    loginPage.login(
      testData.login.validUsername,
      testData.login.validPassword
    )

    loginPage.verifyLoginSuccess()
  })

  it('TC-DIR-001 - Membuka halaman Directory', () => {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('getDirectory')

    directoryPage.open()

    cy.wait('@getDirectory')
      .its('response.statusCode')
      .should('eq', 200)

    directoryPage.verifyPage()
  })

  it('TC-DIR-002 - Data pegawai tampil', () => {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('getDirectory')

    directoryPage.open()

    cy.wait('@getDirectory').then((interception) => {
      expect(interception.request.method).to.eq('GET')
      expect(interception.response.statusCode).to.eq(200)
    })

    directoryPage.verifyCardsVisible()
  })

  it('TC-DIR-003 - Field nama pegawai dapat diisi', () => {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('getDirectory')

    directoryPage.open()
    cy.wait('@getDirectory')

    directoryPage.inputEmployeeName(
      testData.directory.employeeName
    )

    directoryPage.verifyEmployeeInputValue(
      testData.directory.employeeName
    )
  })

  it('TC-DIR-004 - Mencari berdasarkan nama pegawai', () => {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory')

    directoryPage.open()
    cy.wait('@searchDirectory')

    directoryPage.inputEmployeeName(
      testData.directory.employeeName
    )

    directoryPage.selectFirstEmployeeSuggestion()
    directoryPage.clickSearch()

    cy.wait('@searchDirectory')
      .its('response.statusCode')
      .should('eq', 200)

    directoryPage.verifyCardsVisible()
  })

  it('TC-DIR-005 - Mencari berdasarkan job title', () => {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory')

    directoryPage.open()
    cy.wait('@searchDirectory')

    directoryPage.selectFirstJobTitle()
    directoryPage.clickSearch()

    cy.wait('@searchDirectory')
      .its('request.method')
      .should('eq', 'GET')

    directoryPage.verifyCardsVisible()
  })

  it('TC-DIR-006 - Mencari berdasarkan location', () => {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory')

    directoryPage.open()
    cy.wait('@searchDirectory')

    directoryPage.selectFirstLocation()
    directoryPage.clickSearch()

    cy.wait('@searchDirectory')
      .its('response.statusCode')
      .should('eq', 200)

    directoryPage.verifyCardsVisible()
  })

  it('TC-DIR-007 - Reset filter Directory', () => {
  cy.intercept(
    'GET',
    '**/api/v2/directory/employees*'
  ).as('getDirectory')

  directoryPage.open()

  cy.wait('@getDirectory')
    .its('response.statusCode')
    .should('eq', 200)

  // Pilih Job Title
  directoryPage.selectFirstJobTitle()

  // Pastikan Job Title sudah terpilih
  cy.get(directoryPage.selectors.dropdown)
    .eq(0)
    .should('not.contain.text', '-- Select --')

  // Klik Reset
  directoryPage.clickReset()

  // Pastikan Job Title kembali kosong/default
  cy.get(directoryPage.selectors.dropdown)
    .eq(0)
    .should('contain.text', '-- Select --')
})

  it('TC-DIR-008 - Tombol Search dan Reset tersedia', () => {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('getDirectory')

    directoryPage.open()
    cy.wait('@getDirectory')

    cy.get(directoryPage.selectors.searchButton)
      .should('be.visible')
      .and('be.enabled')

    cy.get(directoryPage.selectors.resetButton)
      .should('be.visible')
      .and('be.enabled')
  })
})
