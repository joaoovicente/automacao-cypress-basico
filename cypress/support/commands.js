Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('João Vicente')
    cy.get('#lastName').type('Miranda')
    cy.get('#email').type('joaomiranda@cypress.com')
    cy.get('#open-text-area').type('Treinamento básico cypress')
    cy.contains('button', 'Enviar').click()
})