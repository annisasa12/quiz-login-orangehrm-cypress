class DirectoryPage {
  selectors = {
    directoryMenu: 'a[href*="/directory/viewDirectory"]',
    heading: 'h6',
    employeeInput: '.oxd-autocomplete-text-input input',
    dropdown: '.oxd-select-text',
    searchButton: 'button[type="submit"]',
    resetButton: 'button[type="reset"]',
    employeeCards: '.orangehrm-directory-card',
    cardHeader: '.orangehrm-directory-card-header',
    dialog: '.oxd-dialog-container-default--inner',
  }

  open() {
    cy.get(this.selectors.directoryMenu)
      .should('be.visible')
      .click()
  }

  verifyPage() {
    cy.url().should('include', '/directory/viewDirectory')
    cy.contains('h6', 'Directory').should('be.visible')
  }

  inputEmployeeName(name) {
    cy.get(this.selectors.employeeInput).clear().type(name)
  }

  selectFirstEmployeeSuggestion() {
    cy.get('.oxd-autocomplete-dropdown')
      .should('be.visible')
      .find('[role="option"]')
      .first()
      .click()
  }

  selectFirstJobTitle() {
    cy.get(this.selectors.dropdown).eq(0).click()

    cy.get('[role="listbox"] [role="option"]')
      .not(':contains("-- Select --")')
      .first()
      .click()
  }

  selectFirstLocation() {
    cy.get(this.selectors.dropdown).eq(1).click()

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

  verifyCardsVisible() {
    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.employeeCards).length > 0) {
        cy.get(this.selectors.employeeCards)
          .first()
          .should('be.visible')
      } else {
        cy.contains(/No Records Found/i).should('be.visible')
      }
    })
  }

  verifyEmployeeInputValue(value) {
    cy.get(this.selectors.employeeInput).should(
      'contain.value',
      value
    )
  }

  openFirstEmployeeCard() {
    cy.get(this.selectors.employeeCards)
      .first()
      .should('be.visible')
      .click()
  }

  verifyEmployeeDialog() {
    cy.get(this.selectors.dialog).should('be.visible')
  }
}

export default DirectoryPage
