describe('Add members to community',() => {
    it('Adding a user to community', () => {
        cy.Admin_Login()
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get(".feedTitle").should("be.visible");
        cy.get('.communityNameWrapper').contains('Private community').click()
        cy.get('.communityTabs > :nth-child(3)').click()
        cy.get('.memberPreview').last().scrollIntoView().should("be.visible");
        cy.get('body').then($body => {
          if ($body.find('.memberName').text().includes('Pranav Automation Student')) {               //checking is the student Pranav Automation Student is a member
        cy.xpath("//div[text()='Pranav Automation Student']/parent::div/div[@class='actionWrapper']").click()
        cy.xpath("//div[text()='Remove']").should('be.visible').click()
        cy.get('.confirmDeleteButton').should('be.visible').click()
        cy.get("#notistack-snackbar").contains("Users removed successfully !");  
             }   // User removed from a community
          })
        cy.contains('Add Members').click()
        cy.get('.searchInput').last().should('be.visible').type('Pranav Automation Student')
        cy.get('span').contains('Pranav Automation Student')
        cy.get('.addToCommunityListPopUp > div > button').first().should("be.visible").click();
        cy.get('.memberItem > button').should("be.visible")
        cy.get('.sendButton').should("be.visible").dblclick();
        cy.get("#notistack-snackbar")
            .contains("Users added successfully !")
            .should("be.visible");
        
    })


})
