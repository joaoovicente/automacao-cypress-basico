/// <reference types="Cypress" />

Cypress._.times(3, function() {   // Faz com que o teste de uma função de callback rode quantas vezes quiser, nesse caso "3"
    it('testa a página da política de privacidade de forma independente', function() {
        cy.visit('./src/index.html')

        cy.get('a').invoke('removeAttr', 'target').click()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})