describe('Settings',() => {
    it('Settings', () => {
        cy.Admin_Login()
        // cy.get('[data-link="community"]').should("be.visible").click();
        // cy.get("a.btn-new-community").invoke("removeAttr", "target").click()
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get(".feedTitle").should("be.visible");
        cy.get(".sideMenuTitle").should("be.visible");
        cy.get('[href="/community-account/settings"] > .tabWrapper').should("be.visible").click();
        cy.get('.communityName').should('contain.text','Pranav')
        const n = Math.floor(Math.random() * (999 - 100)) + 1;
        cy.get('.siteTitleInput').should("be.visible").clear().type('Pranav'+n)
        // cy.get(':nth-child(1) > .customRadio > label > .pseudoCheckboxWrapper > .pseudoCheckbox').should("be.visible").click();
        cy.get(':nth-child(2) > .customRadio > label > .pseudoCheckboxWrapper > .pseudoCheckbox').should("be.visible").click();
        cy.get(':nth-child(1) > .customRadio > label > .pseudoCheckboxWrapper > .pseudoCheckbox').should("be.visible").click();
        cy.get('input[name="logo"]')
            .last()
            .selectFile("cypress/fixtures/assets/Images/1.jpg", { force: true })
        cy.get('.inputColorPickerWrapper > input').should("be.visible")
        cy.get('[class="primaryButton formSubmitButton"]').should("be.visible").click();
        cy.get("#notistack-snackbar")
            .contains("Account settings have been updated successfully!")
            .should("be.visible");
        cy.get('.communityName').should("contain.text" , n)
    })
    it('Accessing as public user', () => {
        cy.viewport(1920, 1080);
        cy.visit(Cypress.env('API_URL'));
        cy.get('body').then($body => {
            if ($body.find('[href="community/"]').length < 1) { 
                cy.Admin_Login()
                // cy.get('[data-link="community"]').should("be.visible").click();
                // cy.get("a.btn-new-community").invoke("removeAttr", "target").click()
                cy.visit(Cypress.env('API_URL')+"/community")
                cy.get(".feedTitle").should("be.visible");
                cy.get('[href="/community-account/settings"] > .tabWrapper').should("be.visible").click();
                cy.get(':nth-child(1) > .customRadio > label > .pseudoCheckboxWrapper > .pseudoCheckbox').should("be.visible").click();
                cy.get('.primaryButton').should("be.visible").click();
                cy.get("#notistack-snackbar")
                    .contains("Account settings have been updated successfully!")
                    .should("be.visible");
                cy.visit(Cypress.env('API_URL'));
                cy.get('#dropdownMenu1').should('be.visible').click(); 
                cy.get('.dropdown-menu > :nth-child(5) > a').should('be.visible').click(); 
                cy.get('[href="/login"]').should('be.visible')
            }
          });
        cy.get('[href="community/"]').should('be.visible').invoke("removeAttr", "target").click();
        cy.get(".feedTitle").should("be.visible");
        cy.get(".sideMenuTitle").should("be.visible");
        cy.get('.communityNameWrapper').contains('Private community').should("be.visible").click()
        cy.get('.title').contains('Community Locked').should("be.visible")
        cy.get('.communityNameWrapper').contains('Public Community').should("be.visible").click()
        cy.get('.textFieldWrapper').should('be.visible')
        cy.get('.postHeaderSectn').should('be.visible')
        cy.get('.likeAction').should("be.visible").first().click()
        cy.get('.loginRedirectPopupContainer').should('be.visible')
        cy.get('[href="community/"]').should('be.visible').invoke("removeAttr", "target").click();
        cy.get('.headerText').contains('Write Something...').should("be.visible").click()
        cy.get('.loginRedirectPopupContainer').should('be.visible')
        cy.get('[href="community/"]').should('be.visible').invoke("removeAttr", "target").click();
        cy.get('[data-placeholder="Write a Comment"]').first().scrollIntoView().should("be.visible").click()
        cy.get('.loginRedirectPopupContainer').should('be.visible')

    })
})