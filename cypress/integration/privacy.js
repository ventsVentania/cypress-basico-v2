it('Testa a pagina da policia de privacidade ',function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking')
})