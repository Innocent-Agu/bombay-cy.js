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
            cy.contains('Royal Riches Roulette').get('div.lobby-item-component.roulette.multiplier-roulette-variation.rrr-001.front-page.custom-bg span.star-icon').click({multiple: true});
            cy.contains('Baruto Baccarat').get('#gameWrapperElements > div > div.generic-scrollable-container.lobby-component-scrollable-wrapper.default > div.generic-scrollable-container-inner.scrollable-container.scrollable > div > div > div > div.front-page-lists > div:nth-child(2) > div > div.carousel-slider > div > div.lobby-item-component.baccarat.classic-baccarat-variation.table-bb.front-page.custom-bg > span').click({multiple: true})
            cy.contains('Deu Green Roulette').get('#gameWrapperElements > div > div.generic-scrollable-container.lobby-component-scrollable-wrapper.default > div.generic-scrollable-container-inner.scrollable-container.scrollable > div > div > div > div.front-page-lists > div:nth-child(3) > div > div.carousel-slider > div > div > span').click({multiple: true})
            
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
