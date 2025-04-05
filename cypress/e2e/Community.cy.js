describe("Community", () => {
    it("Login and creating a post as Admin", () => { 
      cy.Admin_Login()
      // cy.get('[data-link="community"]').should("be.visible").click();
      // cy.get("a.btn-new-community").invoke("removeAttr", "target").click()
      cy.visit(Cypress.env('API_URL')+"/community")
      cy.get(".feedTitle").should("be.visible");
      cy.get(".sideMenuTitle").should("be.visible");
      const n = Math.floor(Math.random() * (999 - 100)) + 1;
      cy.contains("Your Feed").should("be.visible");
      cy.get('.sideMenu > nav').first().should("be.visible");

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
      let communityname = "Test Community " + n;
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
      cy.get(".pseudoCheckbox").eq(0).should("be.visible").click();
      cy.get(".pseudoCheckbox").eq(1).should("be.visible").click();
      cy.get(".pseudoCheckbox").eq(2).should("be.visible").click();
      cy.get(".pseudoCheckbox").eq(3).should("be.visible").click();
      cy.get(".pseudoCheckbox").eq(0).should("be.visible").click();
      cy.get(".buttonWrapper > button").should("be.visible").click();
      cy.get("#notistack-snackbar.go946087465")
        .last()
        .contains("Community has been created successfully!")
        .should("be.visible");
      
        // ----------- Posting an activity  ----------

      cy.get("div.burgerDropWrapper").invoke("css", "display", "block");
      cy.wait(1000);
      cy.get(".communityItemWrapper").last().scrollIntoView().click();
      cy.get(".headerText").should("be.visible").click();
      let a = "Pranav Test " + n;
      cy.get('[data-placeholder="Add Title"]').should("be.visible").type(a);
      cy.get('[data-placeholder="Write Something..."]')
        .should("be.visible")
        .type("Pranav test content https://www.newzenler.com/");
        cy.get('.linkPreviewTitle').should("be.visible");

        // Assets in post creation
      cy.get('@accountId').then((id) => {
          const accntId = "/api/v2/accounts/" + id + "/assets";
        cy.intercept("POST", accntId).as("Assets");
        
        cy.get(".postImagesUploader>input[type='file']")
          .last()
          .selectFile("cypress/fixtures/assets/Images/1.jpg", { force: true });
        cy.wait("@Assets").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.get(".postImagesUploader>input[type='file']")
          .last()
          .selectFile("cypress/fixtures/assets/Images/2.jpg", { force: true });
        cy.wait("@Assets", { timeout: 15000 }).then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.get(".postImagesUploader>input[type='file']")
          .last()
          .selectFile("cypress/fixtures/assets/Images/3.jpg", { force: true });
        cy.wait("@Assets", { timeout: 15000 }).then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
        // Add video in post
        cy.get('.leftSide > :nth-child(2)').click()
        cy.get('.popup-content > input').type('https://vimeo.com/1031792882')
        cy.get('.popup-buttons > .primaryButton').click()
        cy.get('.thumbnail-wrapper').scrollIntoView().invoke('attr', 'style', 'pointer-events: none;').should('be.visible')
        // Add gif in post
        cy.get('.leftSide > :nth-child(4)').click()
        cy.get('[data-testid="ImageItemImage"]').first().click()
      });
      cy.get(".postImagesUploader>input[type='file']")
        .last()
        .selectFile("cypress/fixtures/assets/Images/6.jpg", { force: true });
      cy.get("#notistack-snackbar.go946087465")
        .last()
        .contains("You can add only upto 5 attachments")
        .should("be.visible");

      cy.get(".buttonWrapper > button")
        .scrollIntoView()
        .should("be.visible")
        .click();
      cy.get("[class='postPreviewTitle false']>h1").contains(a);
      cy.contains(a).last().scrollIntoView().should("be.visible");

        //--------- First Level Comment-------------
      let comment_1 = "First Comment " + n;
      cy.get('[class="iconWrapper "]')
        .first()
        .scrollIntoView()
        .should("be.visible");
      cy.get('[data-placeholder="Write a Comment"]')
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(comment_1);
      cy.get(".postImagesUploader>input[type='file']")
        .first()
        .selectFile("cypress/fixtures/assets/Images/4.jpg", { force: true });
      cy.wait("@Assets").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
      cy.get('[class="iconWrapper active"]').should("be.visible").click();
      cy.contains(comment_1).scrollIntoView().should("be.visible");
      cy.get(".assetsPreview > img").scrollIntoView().should("be.visible");

        //------ Second Level Comment ( Reply )--------------
      let comment_2 = "Second Comment " + n;
      cy.contains("Reply").scrollIntoView().should("be.visible").click();
      cy.get(".nestedComments >div>div>div>div>div>.quill")
        .should("be.visible")
        .type(comment_2);
      cy.get(".postImagesUploader>input[type='file']")
        .first()
        .selectFile("cypress/fixtures/assets/Images/4.jpg", { force: true });
      cy.wait("@Assets").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
      cy.get('[class="iconWrapper active"]').should("be.visible").click();
      cy.contains(comment_2).should("be.visible");
      cy.get('.assetsPreview > img').eq(1).should('be.visible')

        // ----- Like for Activity ------
      cy.get('[class="nameActionWrapper "]')
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.get('[class="nameActionWrapper active"]').should("be.visible");
      cy.get(".likesInfo").scrollIntoView().should("be.visible")

        // ----- Like for First Comment ------
      cy.get('[class="actionWrapper undefined"]')
        .first()
        .should("be.visible")
        .click();
      cy.get('[class="actionWrapper liked"]').should("be.visible");
      cy.get(".likeCountWrapper").should("be.visible")

       // Like list 
       cy.get(".likesInfo").scrollIntoView().should("be.visible").click();
       cy.get(".userInfoWrapper").should("be.visible");
       cy.get(".closeIcon").should("be.visible").click();
       cy.get(".likeCountWrapper").eq(0).should("be.visible").click();
       cy.get(".userInfoWrapper").should("be.visible");
       cy.get(".closeIcon").should("be.visible").click();

        // ----- Like for Second Comment ------
      cy.get('.nestedComment > .commentPreview > .mainComment > .commentPreviewSide > .commentsActionsWrapper > .actionWrapper').should("be.visible").click();
      cy.get(".likeCountWrapper").eq(1).should("be.visible").click();
      cy.get('body').then($body => {
        if ($body.find('.userInfoWrapper').length > 0) { 
          cy.get('.closeIcon').should('be.visible').click(); 
          cy.get(".likeCountWrapper").eq(1).should("be.visible").click();
        }
      });
      cy.get(".userInfoWrapper").should("be.visible");
      cy.get(".closeIcon").should("be.visible").click();

        // Edit Post
      cy.get(".postActionWrapper").first().scrollIntoView().click();
      cy.contains("Edit Post").should("be.visible").click();
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
        .eq(0)
        .scrollIntoView()
        .should("be.visible")
        .type("Updated");
      cy.get('[class="iconWrapper active"]').scrollIntoView().should("be.visible").click();
      cy.contains(comment_1 + "Updated")
        .scrollIntoView()
        .should("be.visible");
      cy.wait(2000);

        // -----------------------------Edit child comment------------------
      cy.get(".meatballIconWrapper")
        .last()
        .scrollIntoView()
        .should("be.visible")
        .click();
      cy.get(
        ".nestedComment > .commentPreview > .mainComment > .commentPreviewSide > .contentActionWrapper > .meatballIconWrapper > .commentContextMenuWrapper > .contextMenu > :nth-child(1)"
      ).click();
      cy.get('[data-placeholder="Write a Comment"]')
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type("Updated");
      cy.get('[class="iconWrapper active"]').should("be.visible").click();
      cy.contains(comment_2 + "Updated")
        .scrollIntoView()
        .should("be.visible");

       // -------------Pin post to featured----------------
      cy.get(".postActionWrapper").scrollIntoView().should("be.visible").click();
      cy.get('.postContextMenuWrapper > .contextMenu > :nth-child(2) > .itemWrapper').scrollIntoView()
        .should("be.visible")
        .click();
      cy.get("#notistack-snackbar")
        .contains("Post has been pinned successfully!")
        .should("be.visible");
      cy.get('[tabindex="-1"] > .postPreview').scrollIntoView().should("be.visible");
    
      cy.get(".postActionWrapper").first().scrollIntoView().click();
      cy.get('[tabindex="-1"] > .postPreview > .postHeaderSectn > .postContextMenuWrapper > .contextMenu > :nth-child(2) > .itemWrapper').click()
      cy.get("#notistack-snackbar")
      .contains("Post has been unpinned successfully!")
      .should("be.visible");


        //----------deleting child comments----------------
      cy.get('.nestedComment > .commentPreview > .mainComment > .commentPreviewSide > .contentActionWrapper > .meatballIconWrapper').scrollIntoView().click()
      cy.get('.nestedComment > .commentPreview > .mainComment > .commentPreviewSide > .contentActionWrapper > .meatballIconWrapper > .commentContextMenuWrapper > .contextMenu > :nth-child(2) > .itemWrapper')
        .scrollIntoView().click()
      cy.get('.confirmDeleteButton').scrollIntoView().click()
      cy.get("#notistack-snackbar")
        .contains("Comment has been deleted successfully!")
        .should("be.visible");

      
        //----------deleting comments----------------

      cy.get(".meatballIconWrapper").last().scrollIntoView().click()
      cy.get('.commentContextMenuWrapper > .contextMenu > :nth-child(3) > .itemWrapper').scrollIntoView().click()
      cy.get('.confirmDeleteButton').scrollIntoView().click()
      cy.get("#notistack-snackbar")
      .contains("Comment has been deleted successfully!")
      .should("be.visible");

      
        // -------------Copy post link------------
      // cy.get('.postActionWrapper').last().should('be.visible').click();
      // cy.get('.contextMenu > :nth-child(3)').eq(0).should('be.visible').click();
      // cy.get("#notistack-snackbar")
      //   .contains("Link copied to clipboard")
      //   .should("be.visible");  

        //----------deleting post ----------------

      cy.get('.postActionWrapper').scrollIntoView().click()
      cy.get(':nth-child(5) > .itemWrapper').scrollIntoView().click()
      cy.get('.confirmDeleteButton').scrollIntoView().click()
      cy.get("#notistack-snackbar")
      .contains("Post has been deleted successfully!")
      .should("be.visible");


        // ----------- Delete existing community-------------
      
      cy.contains("Test Community").then((elements) => {
        const count = elements.length;
        for (let i = 0; i < count; i++) {
          cy.get("div.hovered").invoke("show");
          cy.get('.communityItem>div>[xmlns="http://www.w3.org/2000/svg"]')
            .last()
            .trigger("mouseover")
            .click();
          cy.get(':nth-child(3) > .itemWrapper').last().should('be.visible').click()
          cy.get(".inputWrapper > input").type("DELETE");
          cy.get(".confirmDeleteButton").click();
          cy.get("#notistack-snackbar").contains("Community has been deleted successfully!");
          if(i>0){cy.wait(2000)}
        }
      });

      // ----------- Delete existing Category-------------
        cy.contains("Test Category").then((elements) => {
          const count1 = elements.length;
          for (let i = 0; i < count1; i++) {
            cy.get("div.hovered").invoke("show");
            cy.get('[class="linkSubHeader"]>div.hovered')
              .last()
              .trigger("mouseover")
              .click();
            cy.get(':nth-child(3) > .itemWrapper').last().should('be.visible').click()
            cy.wait(1000)
            cy.get(".deleteConfirmWrapper>.inputWrapper>input").should('be.visible').type("DELETE");
            cy.get(".confirmDeleteButton").click();
            cy.get("#notistack-snackbar").contains(
              "Category has been deleted successfully!");
              if(i>0){cy.wait(2000)}
          }
        });
    });
})
