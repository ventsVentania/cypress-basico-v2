/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {    
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formuário', function(){
        const longText = 'texto, texto, textotexto, texto, textotexto, texto, textotexto, texto, textotexto, texto, textotexto, texto, textotexto, texto, texto, texto, texto, textotexto, texto, textotexto, texto, textotexto, texto, textotexto, texto, textotexto, texto, textotexto, texto, textotexto, texto, texto'
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Ventura')
        cy.get('#email').type('guilherme@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter formulário o formulário com um email com formatação invalida', function(){
        cy.get('#email').type('guilherme#gmail.com')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })   

    it('campo de telefone continua vázio quando preenchido com valores não-numericos', function(){
        cy.get('#phone').type('abcdefghijlmnopqrstuvxz').should('have.value', '')
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()

    })

    it('seleciona um produto (mentoria)) por seu valor (youtube0',function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })

    it('seleciona um produto (mentoria)) por seu valor',function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')

    })

    it('seleciona um produto (mentoria)) por seu valor',function(){
        cy.get('#product').select(1).should('have.value', 'blog')

    })

    it('marca o tipo cada tipo de atendimento errado', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        cy.get('input[type="radio"][value="elogio"]')
            .check()
            .should('have.value', 'elogio')
        cy.get('input[type="radio"][value="ajuda"]')
            .check()
            .should('have.value', 'ajuda')
    })
    
    it('marca o tipo cada tipo de atendimento certo', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        })
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')        
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')


            })
    
})

it('seleciona um arquivo simulando drag and drop', function(){
    cy.get('input[type="file"]')
        .should('not.have.value')        
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')


        })

})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
         })
        
    })

    it.only('verifica que a politica de privacidade abre em outra aba sem a necessidade', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    
    })
})

