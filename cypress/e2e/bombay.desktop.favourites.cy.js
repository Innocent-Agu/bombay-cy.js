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
            cy.get('.lobby-item-component').contains('.table-name', 'Royal Riches Roulette').parents('.lobby-item-component').find('.star-icon').click({ force: true });
            cy.get('.lobby-item-component').contains('.table-name', 'Baruto Baccarat').parents('.lobby-item-component').find('.star-icon').click({ force: true });
            cy.get('.lobby-item-component').contains('.table-name', 'Deu Green Roulette').parents('.lobby-item-component').find('.star-icon').click({ force: true });
            
            // Verify that added games are visible in the Favourites category
            cy.get('.category-favourites').click()
            cy.get('[class="table-name"]').contains('Royal Riches Roulette').should('be.visible')
            cy.get('[class="table-name"]').contains('Baruto Baccarat').should('be.visible')
            cy.get('[class="table-name"]').contains('Deu Green Roulette').should('be.visible')

            // Remove games from Favourites
            cy.get('[data-testid="FavouriteButton"]').each(($el, index) => {
                cy.wrap($el).click()
                cy.wait(1000) // wait for the UI to update
            })

            // Verify that the removed games do not exist anymore
            cy.get('.category-favourites').click()
            cy.get('Royal Riches Roulette').should('not.exist')
            cy.get('Baruto Baccarat').should('not.exist')
            cy.get('Deu Green Roulette').should('not.exist')
            cy.get('.no-tables-found').contains('Currently no tables added to favourites').should('be.visible')
        })
    })
})
