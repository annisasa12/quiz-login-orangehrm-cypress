class RecruitmentPage {
  selectors = {
    recruitmentMenu:
      'a[href*="/recruitment/viewRecruitmentModule"]',
    heading: 'h6',
    candidateTab:
      'a[href*="/recruitment/viewCandidates"]',
    vacancyTab:
      'a[href*="/recruitment/viewJobVacancy"]',
    candidateNameInput:
      'input[placeholder="Type for hints..."]',
    dropdown: '.oxd-select-text',
    searchButton: 'button[type="submit"]',
    resetButton: 'button[type="reset"]',
    addButton: 'button',
    tableRows: '.oxd-table-body .oxd-table-card',
    addCandidateHeading: 'h6',
  }

  open() {
    cy.get(this.selectors.recruitmentMenu)
      .should('be.visible')
      .click()
  }

  verifyPage() {
    cy.url().should('include', '/recruitment')
    cy.contains('h6', 'Recruitment').should('be.visible')
  }

  openCandidates() {
    cy.contains('a', 'Candidates').click()
  }

  openVacancies() {
    cy.contains('a', 'Vacancies').click()
  }

  inputCandidateName(name) {
    cy.get(this.selectors.candidateNameInput)
      .first()
      .clear()
      .type(name)
  }

  selectFirstCandidateSuggestion() {
    cy.get('.oxd-autocomplete-dropdown')
      .should('be.visible')
      .find('[role="option"]')
      .first()
      .click()
  }

  selectFirstJobTitle() {
  cy.get(this.selectors.dropdown)
    .eq(0)
    .click()

  cy.get('[role="listbox"] [role="option"]')
    .not(':contains("-- Select --")')
    .first()
    .should('be.visible')
    .click()
}

  selectFirstVacancy() {
    cy.get(this.selectors.dropdown).eq(1).click()

    cy.get('[role="listbox"] [role="option"]')
      .not(':contains("-- Select --")')
      .first()
      .click()
  }

  selectFirstStatus() {
    cy.get(this.selectors.dropdown).eq(3).click()

    cy.get('[role="listbox"] [role="option"]')
      .not(':contains("-- Select --")')
      .first()
      .click()
  }

  clickSearch() {
    cy.get(this.selectors.searchButton).click()
  }

  clickReset() {
  cy.get(this.selectors.resetButton)
    .should('be.visible')
    .and('be.enabled')
    .click()
}

  clickAdd() {
    cy.contains('button', 'Add').click()
  }

  verifyAddCandidatePage() {
    cy.url().should('include', '/addCandidate')
    cy.contains('h6', 'Add Candidate').should('be.visible')
  }

  verifyCandidateResults() {
    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.tableRows).length > 0) {
        cy.get(this.selectors.tableRows)
          .first()
          .should('be.visible')
      } else {
        cy.contains(/No Records Found/i).should('be.visible')
      }
    })
  }

  verifyCandidateInputEmpty() {
    cy.get(this.selectors.candidateNameInput)
      .first()
      .should('have.value', '')
  }

  verifyVacanciesPage() {
    cy.url().should('include', '/viewJobVacancy')
    cy.contains('h5', 'Vacancies').should('be.visible')
  }
}

export default RecruitmentPage
