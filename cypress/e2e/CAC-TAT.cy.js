/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach (() => {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('João Vicente')
        cy.get('#lastName').type('Miranda')
        cy.get('#email').type('joaomiranda@cypress.com')
        cy.get('#open-text-area').type('Treinamento básico cypress')
        cy.contains('button', 'Enviar').click()

        cy.get('.success > strong').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('João Vicente')
        cy.get('#lastName').type('Miranda')
        cy.get('#email').type('joaomiranda@cypress,com')
        cy.get('#open-text-area').type('Treinamento básico cypress')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('teste numero')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('João Vicente')
        cy.get('#lastName').type('Miranda')
        cy.get('#email').type('joaomiranda@cypress.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Treinamento básico cypress')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('João Vicente')
            .should('have.value', 'João Vicente')
            .clear()
            .should('have.value', '')
        
        cy.get('#lastName')
            .type('Miranda')
            .should('have.value', 'Miranda')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('joaomiranda@cypress.com')
            .should('have.value', 'joaomiranda@cypress.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone-checkbox').click()
        cy.get('#phone')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')  // busca o elemento do checkbox (vai retornar 3 radios)
            .should('have.length', 3)  // valida que retornou 3 radios
            .each(function($radio) {   // each recebe um função de callback que recebe como argumento cada um dos elementos que forem selecionados
                cy.wrap($radio).check()  // wrap vai empacotar cada um desses radios 
                cy.wrap($radio).should('be.checked')  // valida se ele da um check em cada elemento do radio
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check()
            .should('be.checked') // valida que os checkboxes foram habilitados
            .last() // selecionar o ultimo elemento dos checkboxes
            .uncheck() // remover o check do ultimo elemento que já foi selecionado
            .should('not.be.checked') // validar que o ultimo elemento não esta com checkbox habilitado
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
            .should('not.have.value')  // valida que ainda não tem nenhum valor informado naquele elemento
            .selectFile('cypress/fixtures/example.json')  // seleciona o arquivo example.json
            .should(function($input) {  // no should passa uma função de callback e recebe como argumento um input
                expect($input[0].files[0].name).to.equal('example.json')  // valida que o input "0" tem uma propriedade files "0" e esse elemento tem um name que é igual a "example.json"
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})  // drag-drop simula como se estivesse arrastando o arquivo example.json
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')  // passa somente o nome do arquivo e muda o nome dele para sampleFile
        cy.get('#file-upload')
            .selectFile('@sampleFile')  // Seleciona o arquivo da pasta fixture utilizando o alias dele que foi criado "sampleFile"
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a').should('have.attr', 'target', '_blank')  // valida se o elemento tem um target= _blank
    })

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('a').invoke('removeAttr', 'target').click()  // invoke('removeAttr', target) para remover o target e o cypress conseguir acessar o link em nova aba
    
        cy.contains('Talking About Testing').should('be.visible')
    })

    it.only('testa a página da política de privacidade de forma independente', function() {
        cy.get('a').invoke('removeAttr', 'target').click()
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})