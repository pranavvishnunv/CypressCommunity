describe('Student post and notification', ()=>{
    it("Community creation as Admin", () => { 
        cy.Admin_Login()
        // cy.get('[data-link="community"]').should("be.visible").click();
        // cy.get("a.btn-new-community").invoke("removeAttr", "target").click()
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get(".feedTitle").should("be.visible");
        cy.get(".sideMenuTitle").should("be.visible");
        const n = Math.floor(Math.random() * (999 - 100)) + 1;
        cy.contains("Your Feed").should("be.visible");
  
          //--- Creating a category ----
  
        cy.get('[class="tabWrapper addIconBackground "]')
          .should("be.visible")
          .click();
        cy.contains("Create Category").should("be.visible").click();
        let catname = "Test Category " + n;
        cy.contains("Category Name")
          .siblings(".inputWrapper")
          .should("be.visible")
          .type(catname);
        let cattag = "Test Category tag " + n;
        cy.contains("Category Tagline/Subtitle")
          .siblings(".inputWrapper")
          .should("be.visible")
          .type(cattag);
        cy.get(".buttonWrapper > button").should("be.visible").click();
        cy.get("#notistack-snackbar").contains(
          "Category has been successfully created!"
        );
        cy.get(".linkSubHeader").should("contain.text", catname);
  
          //--- Create Community -----
  
        cy.get('[class="tabWrapper addIconBackground "]')
          .should("be.visible")
          .click();
        cy.contains("Add Community").should("be.visible").click();
        let communityname = "Post approval " + n;
        cy.get(".nameInputWrapper").should("be.visible").type(communityname);
        cy.get(".uploadImgButtonWrapper").should("be.visible").click();
        cy.get('[aria-label="melting face"] > .epr-emoji-native')
          .should("be.visible")
          .click();
        cy.get("div.currentValueWrapper").should("be.visible").click();
        cy.get('[class="categoryList active"]>ul>li')
          .last()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        cy.get(".pseudoCheckbox").eq(0).should("be.visible").click();
        cy.get(".pseudoCheckbox").eq(1).should("be.visible").click();
        cy.get(".pseudoCheckbox").eq(2).should("be.visible").click();
        cy.get(".pseudoCheckbox").eq(3).should("be.visible").click();
        cy.get(".pseudoCheckbox").eq(0).should("be.visible").click();
        cy.get(".pseudoCheckbox").eq(5).should("be.visible").click();
        cy.get(".buttonWrapper > button").should("be.visible").click();
        cy.get("#notistack-snackbar.go946087465")
          .last()
          .contains("Community has been created successfully!")
          .should("be.visible");
    })  
    it("Post creation as Student", () => {
        cy.Student_Login()
        // cy.get('[href="/new-community"]').should('be.visible').invoke("removeAttr", "target").click();
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get('.communityNameWrapper').contains('Post approval').click()
        cy.get('.headerText').should('be.visible').click()
        let a = "Test post for approval";
        cy.get('[data-placeholder="Add Title"]').should("be.visible").type(a);
        cy.get('[data-placeholder="Write Something..."]').type(a)
        cy.get(".buttonWrapper > button")
          .scrollIntoView()
          .should("be.visible")
          .click();
       

        cy.get('.headerText').should('be.visible').click()
        let b = "Test post for Decline";
        cy.get('[data-placeholder="Add Title"]').should("be.visible").type(b);
        cy.get('[data-placeholder="Write Something..."]').type(b)
        cy.get(".buttonWrapper > button")
          .scrollIntoView()
          .should("be.visible")
          .click();
        

        cy.get('.headerText').should('be.visible').click()
        let c = "Test post for Decline with feedback";
        cy.get('[data-placeholder="Add Title"]').should("be.visible").type(c);
        cy.get('[data-placeholder="Write Something..."]').type(c)
        cy.get(".buttonWrapper > button")
          .scrollIntoView()
          .should("be.visible")
          .click();
        cy.get('body')
          .find('.postContent').should('have.length', 0);
        

        cy.reload();
        cy.get("[class='postPreviewTitle false']>h1").contains(a);
        cy.get('.postPendingBtn').should('be.visible')
        cy.get("[class='postPreviewTitle false']>h1").contains(b);
        cy.get("[class='postPreviewTitle false']>h1").contains(c);


    })
    it("Managing as Admin", () => { 
        cy.Admin_Login()
        // cy.get('[data-link="community"]').should("be.visible").click();
        // cy.get("a.btn-new-community").invoke("removeAttr", "target").click()
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get('[href="/community-account/manage"] > .tabWrapper').should('be.visible').click()
        cy.get('[class="postPreviewTitle undefined"]').contains('Test post for approval')
        cy.get(':nth-child(1) > .actionButtons > .declineWithFeedback').should('be.visible').click()
        cy.get('.feedbackText').should('be.visible').type(' Sample feed back text to test approval')
        cy.get('button.decline').last().click()
        cy.get('body')
          .find('.postWrapper').should('have.length', 2);
        cy.get('body') 
          .find('.loading-wrapper').should('have.length', 0);
        cy.get('.decline').first().click()
        cy.get('body')
          .find('.postWrapper').should('have.length', 1);
        cy.get('body') 
          .find('.loading-wrapper').should('have.length', 0);
        cy.get('.approve').last().click()
        cy.get('body')
          .find('.postWrapper').should('have.length', 0);
        cy.get('body') 
          .find('.loading-wrapper').should('have.length', 0);

    }) 

     it("Post Edit for Reappoval as Student", () => {
        cy.Student_Login()
        // cy.get('[href="/new-community"]').should('be.visible').invoke("removeAttr", "target").click();
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get('.communityNameWrapper').contains('Post approval').click()
        cy.get('.communityKebabIcon').should('be.visible').click()
        cy.get('.itemWrapper ').contains('Your Content').should('be.visible').click()
        cy.get('#status-select').should('be.visible')
            .select('Pending Posts')
        cy.get('body')
          .find('.postWrapper').should('have.length', 0);
        cy.get('#status-select').should('be.visible')
          .select('Approved Posts')
        cy.get('body')
          .find('.postWrapper').should('have.length', 1);
        cy.get('#status-select').should('be.visible')
          .select('Declined Posts')
        cy.get('body')
          .find('.postWrapper').should('have.length', 1);
        cy.get('#status-select').should('be.visible')
          .select('Declined with feedback Posts')
        cy.wait(500)
        cy.get('body')
          .find('.postWrapper').should('have.length', 1);
        cy.get('.edit').should('be.visible').as('btn')
        cy.get('@btn').click()

        cy.get('[data-placeholder="Write Something..."]').type('   Re-Approve')
        cy.get('.primaryButton ').click()
        cy.get('body')
          .find('.postWrapper').should('have.length', 0);
        cy.get('#status-select').should('be.visible')
          .select('Pending Posts')
        cy.get('body')
          .find('.postWrapper').should('have.length', 1);

     })


     it("Re approve as Admin", () => { 
        cy.Admin_Login()
        // cy.get('[data-link="community"]').should("be.visible").click();
        // cy.get("a.btn-new-community").invoke("removeAttr", "target").click()
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get('[href="/community-account/manage"] > .tabWrapper').should('be.visible').click()
        cy.get('.postPreviewContent > div > p').should('have.text','Test post for Decline with feedback   Re-Approve')
        cy.get('.approve').first().click()
        cy.get('.approve').should('have.length', 0);
        
         // ----------- Delete existing Category-------------
         cy.get('[href="/community/feed"] > .tabWrapper > .labelWrapper').click()
         cy.get('.postCreator').should('be.visible')
         cy.contains("Test Category").then((elements) => {
            const count1 = elements.length;
            for (let i = 0; i < count1; i++) {
              cy.get("div.hovered").invoke("show");
              cy.get('[class="linkSubHeader"]>div.hovered')
                .last()
                .should('be.visible')
                .trigger("mouseover")
                .click();
              cy.get(':nth-child(3) > .itemWrapper').last().should('be.visible').click()
              cy.get(".inputWrapper > input").type("DELETE")
              cy.get(".confirmDeleteButton").click()
              cy.get("#notistack-snackbar").contains(
                "Category has been deleted successfully!")
                if(i>0){cy.wait(2000)}
            }
          });

    }) 

})