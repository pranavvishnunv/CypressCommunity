describe('Student post and notification', ()=>{
    it("Login and creating a post as Student", () => {
        cy.Student_Login()
        // cy.get('[href="/new-community"]').invoke("removeAttr", "target").click()
        cy.visit(Cypress.env('API_URL')+"/community")
        const n = Math.floor(Math.random() * (999 - 100)) + 1;
        let a = "Pranav Student Test Post " + n;
        cy.get(':nth-child(1) > .postPreview > .postHeaderSectn').should('be.visible')
        cy.get('.headerText').should('be.visible').click()
        cy.get('[data-placeholder="Add Title"]').should("be.visible").type(a);
        cy.get('[data-placeholder="Write Something..."]').type(a)
        cy.get('@accountId').then((id) => {
          cy.log('Retrieved Account ID:', id);
          const accntId = "/api/v2/accounts/" + id + "/assets";
          cy.intercept("POST", accntId).as("Assets");
        })
        cy.get(".buttonWrapper > button")
          .scrollIntoView()
          .should("be.visible")
          .click();
        cy.get("[class='postPreviewTitle false']>h1").contains(a);
        cy.contains(a).last().scrollIntoView().should("be.visible");
  
        let comment_1 = "First Comment From student " + n;
        cy.get('[class="iconWrapper "]')
          .first()
          .scrollIntoView()
          .should("be.visible");
        cy.get('[data-placeholder="Write a Comment"]')
          .first()
          .scrollIntoView()
          .should("be.visible")
          .type(comment_1);
        cy.get('[class="iconWrapper active"]').should("be.visible").click();
        cy.contains(comment_1).scrollIntoView().should("be.visible");
  
          //--- Second Level Comment ( Reply )--------------
        let comment_2 = "Second Comment from student" + n;
        cy.contains("Reply").scrollIntoView().should("be.visible").click();
        cy.get(".nestedComments >div>div>div>div>div>.quill")
          .should("be.visible")
          .type(comment_2);
        cy.get('[class="iconWrapper active"]').should("be.visible").click();
        cy.contains(comment_2).scrollIntoView().should("be.visible");
  
          // ----- Like for Activity ------
        cy.get('[class="nameActionWrapper "]').first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        cy.get('[class="nameActionWrapper active"]').should("be.visible");
        cy.get(".likesInfo").first().scrollIntoView().should("be.visible").click();
        cy.get(".userInfoWrapper").should("be.visible");
        cy.get(".closeIcon").should("be.visible").click();
  
        
           // Edit Post
        cy.get(".postActionWrapper").first().scrollIntoView().click();
        cy.get(':nth-child(1) > .postPreview > .postHeaderSectn > .postContextMenuWrapper > .contextMenu > :nth-child(2) > .itemWrapper').click();
        cy.get('[data-placeholder="Write Something..."]')
          .should("be.visible")
          .type("   Updated");
        cy.get(".buttonWrapper > button")
          .scrollIntoView()
          .should("be.visible")
          .click();
        cy.get(".postPreviewContent>div>p").contains("Updated");
        cy.contains("Updated").should("be.visible");
  
           // ------------------Edit comment---------------------
        cy.get(".meatballIconWrapper").first().scrollIntoView().click();
        cy.contains("Edit Comment").should("be.visible").click();
        cy.get('[data-placeholder="Write a Comment"]')
          .first()
          .scrollIntoView()
          .should("be.visible")
          .type("Updated");
        cy.get('[class="iconWrapper active"]').scrollIntoView().should("be.visible").click();
        cy.contains(comment_1 + "Updated")
          .scrollIntoView()
          .should("be.visible");
      })
  
      it("Admin Post from notification", () => {
        // cy.visit(Cypress.env('API_URL'));
        cy.Admin_Login()
        // cy.get('[data-link="community"]').should("be.visible").click();
        // cy.get("a.btn-new-community").invoke("removeAttr", "target").click();
        cy.visit(Cypress.env('API_URL')+"/community")
        cy.get('.postCreator').should('be.visible')
        cy.get('.bellWrapper').should('be.visible').click()
        cy.get('.notificationSingleInfoItem').first().click()         //first post in notification
        cy.get('.postPreviewRefWrapper > .postPreview > .postHeaderSectn')
          .should('be.visible')
        cy.get('.postPreviewRefWrapper > .postPreview > .postHeaderSectn > .postPreviewWrapper > .postPreviewTitle > h1')                          
          .should('be.visible')
        cy.get('.postPreviewRefWrapper > .postPreview > .postHeaderSectn > .postPreviewWrapper > .actionsFooter > .likeAction').click()           //liking post
        cy.get('.postPreviewRefWrapper > .postPreview > .postCommentSectn > .commentPreviewWrapper > .commentBuilder > .commentPreview > .mainComment > .commentPreviewSide > .commentsActionsWrapper > :nth-child(2)')
          .click()        //Clicking reply button
        cy.get('.nestedComments > .commentEdit > .commentEditPreviewRightSide > .commentEditRightSide > .commentEditArea > .textEditor > .quill > .ql-container > .ql-editor > p')
          .should('be.visible')
          .type('Reply to comment of student')
        cy.get('.nestedComments > .commentEdit > .commentEditPreviewRightSide > .commentEditRightSide > .commentsToolsWrapper > .sendIcon > .iconWrapper')
          .should('be.visible')
          .click()
        cy.get('.nestedComment > .commentPreview > .mainComment > .commentPreviewSide > .contentActionWrapper > .contentWrapper')
          .should('be.visible')
          .should('contain','Reply to comment of student')
        cy.get('.closeSinglePostPopupBtn')
          .should('be.visible')
          .click();
        cy.get('.postActionWrapper')
          .first()
          .should('be.visible')
          .click();
        cy.get(':nth-child(1) > .postPreview > .postHeaderSectn > .postContextMenuWrapper > .contextMenu > :nth-child(4) > .itemWrapper')
          .should('be.visible')
          .click();
        cy.get('.confirmDeleteButton')
          .should('be.visible')
          .click();
        cy.get("#notistack-snackbar")
          .contains("Post has been deleted successfully!")
          .should("be.visible");
      })
})