describe('Baccarat lobby betting functionality', ()=> {

    before(() => {
        cy.visit('https://demo.bombay.live/operator/bombaydemo/bombay-live-lobby/fun')
        cy.wait(5000)
        cy.frameLoaded()
    })

    it('Enable and disable lobby betting', ()=> {

        cy.iframe().within(()=> {

            // Verify that some elements inside the iframe exists after website has loaded
            cy.get('.category-home').should('exist')
            cy.get('.balance-block').should('exist')
            cy.get('.category-baccarat').should('exist')

            // Enable lobby betting and verify that some lobby betting elements exist
            cy.get('.category-baccarat').click()
            cy.get('.toggle-switch').should('be.visible').click()
            cy.get('.carousel-slider').should('be.visible')
            cy.get('.score-board-wrapper').should('be.visible')

            // Disable lobby betting and verify that some lobby betting elements no longer exist
            cy.xpath('/html/body/div/div[2]/div/div[2]/span/span').should('exist').click()
            cy.get('.carousel-slider').should('not.exist') 
            cy.get('.score-board-wrapper').should('not.exist')
            
        })
    })

    
})
