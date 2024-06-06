describe('Favourites functionality check', function() {

    it('verify that users can add and remove games to/from Favourites', () => {
        // Visit the main page
        cy.visit('https://demo.bombay.live/operator/bombaydemo/bombay-live-lobby/fun')
        cy.wait(5000) // wait for the page to load

        // Ensure iframe is loaded
        cy.frameLoaded()

        // Access the iframe content
        cy.iframe().within(() => {
            // Verify that necessary elements inside the iframe exist
            cy.get('.category-home').should('be.visible')
            cy.get('.balance-block').should('be.visible')
            cy.get('.category-highrollers').should('be.visible')

            // Add games to Favourites
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[1]/div/div[2]/div/div[1]/span').click()
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div/div[2]/div/div[1]/span').click()
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[3]/div/div[2]/div/div/span').click()

            // Verify that added games are visible in the Favourites category
            cy.get('.category-favourites').click()
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div/div[1]').should('exist')
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div/div[2]').should('exist')
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div/div[3]').should('exist')

            // Remove games from Favourites
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div/div/span').each(($el, index) => {
                cy.wrap($el).click()
                cy.wait(1000) // wait for the UI to update
            })

            // Verify that the removed games do not exist anymore
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div/div[1]').should('not.exist')
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div/div[2]').should('not.exist')
            cy.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div/div/div/div/div[3]').should('not.exist')
            cy.get('.no-tables-found').contains('Currently no tables added to favourites').should('be.visible')
        })
    })
})