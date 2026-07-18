import LoginPage from '../pages/LoginPage'
import RecruitmentPage from '../pages/RecruitmentPage'
import testData from '../data/testData'

describe('Final Project - Recruitment dengan POM dan Intercept', () => {
  const loginPage = new LoginPage()
  const recruitmentPage = new RecruitmentPage()

  beforeEach(() => {
    loginPage.visit()

    loginPage.login(
      testData.login.validUsername,
      testData.login.validPassword
    )

    loginPage.verifyLoginSuccess()
  })

  it('TC-REC-001 - Membuka halaman Recruitment', () => {
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('getCandidates')

    recruitmentPage.open()

    cy.wait('@getCandidates')
      .its('response.statusCode')
      .should('eq', 200)

    recruitmentPage.verifyPage()
  })

  it('TC-REC-002 - Daftar kandidat berhasil dimuat', () => {
  cy.intercept(
    'GET',
    '**/api/v2/recruitment/candidates*'
  ).as('getCandidates')

  recruitmentPage.open()

  cy.wait('@getCandidates').then((interception) => {
    expect(interception.request.method).to.eq('GET')
    expect(interception.response.statusCode).to.eq(200)
    expect(interception.response.body).to.have.property('data')
    expect(interception.response.body.data).to.be.an('array')
  })

  cy.url().should('include', '/recruitment/viewCandidates')
})

  it('TC-REC-003 - Field nama kandidat dapat diisi', () => {
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('getCandidates')

    recruitmentPage.open()
    cy.wait('@getCandidates')

    recruitmentPage.inputCandidateName(
      testData.recruitment.candidateName
    )

    cy.get(
      recruitmentPage.selectors.candidateNameInput
    )
      .first()
      .should(
        'contain.value',
        testData.recruitment.candidateName
      )
  })

  it('TC-REC-004 - Mencari kandidat berdasarkan nama', () => {
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('searchCandidates')

    recruitmentPage.open()
    cy.wait('@searchCandidates')

    recruitmentPage.inputCandidateName(
      testData.recruitment.candidateName
    )

    recruitmentPage.selectFirstCandidateSuggestion()
    recruitmentPage.clickSearch()

    cy.wait('@searchCandidates')
      .its('response.statusCode')
      .should('eq', 200)

    recruitmentPage.verifyCandidateResults()
  })

  it('TC-REC-005 - Mencari kandidat berdasarkan job title', () => {
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('searchCandidates')

    recruitmentPage.open()
    cy.wait('@searchCandidates')

    recruitmentPage.selectFirstJobTitle()
    recruitmentPage.clickSearch()

    cy.wait('@searchCandidates')
      .its('request.method')
      .should('eq', 'GET')

    recruitmentPage.verifyCandidateResults()
  })

  it('TC-REC-006 - Reset filter kandidat', () => {
  cy.intercept(
    'GET',
    '**/api/v2/recruitment/candidates*'
  ).as('getCandidates')

  recruitmentPage.open()

  cy.wait('@getCandidates')
    .its('response.statusCode')
    .should('eq', 200)

  recruitmentPage.selectFirstJobTitle()

  recruitmentPage.clickReset()

  cy.get(recruitmentPage.selectors.dropdown)
    .eq(0)
    .should('contain.text', '-- Select --')
})

  it('TC-REC-007 - Membuka halaman Add Candidate', () => {
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('getCandidates')

    recruitmentPage.open()
    cy.wait('@getCandidates')

    recruitmentPage.clickAdd()
    recruitmentPage.verifyAddCandidatePage()
  })

  it('TC-REC-008 - Membuka halaman Vacancies', () => {
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/vacancies*'
    ).as('getVacancies')

    recruitmentPage.open()
    recruitmentPage.openVacancies()

    cy.wait('@getVacancies').then((interception) => {
      expect(interception.request.method).to.eq('GET')
      expect(interception.response.statusCode).to.eq(200)
    })

    recruitmentPage.verifyVacanciesPage()
  })
})
