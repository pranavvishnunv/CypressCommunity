Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
  cy.get(selector).then(subject => {
  cy.fixture(fileName, 'base64').then(content => {
  const el = subject[0];
  const testFile = new File([content], fileName, { type: fileType });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(testFile);
  el.files = dataTransfer.files;
  });
  });
  });
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    console.log(err);
    return false
  })
  
Cypress.Commands.add('Admin_Login',()=>{
  cy.viewport(1920, 1080);
  // const url=Cypress.env('API_URL')
  cy.visit(Cypress.env('API_URL')+"/login");
  cy.get("#email").type(Cypress.env('USER_NAME'));
  cy.get("#login-password").type(Cypress.env('PASSWORD'));
  cy.intercept('POST', '/login').as('loginRequest');
  cy.get('[value="Login"]').should("be.visible").click();
  cy.wait('@loginRequest').then((interception) => {
        // Access the account ID from the response
  const accountId = interception.response.body.responseCommunityLogin.accounts[0].id;
    cy.wrap(accountId).as('accountId');
  });
  cy.get('body').then($body => {
    if ($body.find('#dropdownMenu1').length > 0) { 
      cy.get('#dropdownMenu1').should('be.visible').click(); 
      cy.get('[href="/admin"]').should('be.visible').click(); 
    }
  });
})
Cypress.Commands.add('Student_Login',()=>{
  cy.viewport(1920, 1080);
  const url=Cypress.env('API_URL')+"/login"
  cy.visit(url);
  cy.get('.navbar-buttons > div > .dynamic-link').should("be.visible").click();
  cy.get("#email").should("be.visible").type(Cypress.env('STUDENT_USER_NAME'));
  cy.get("#login-password").type(Cypress.env('PASSWORD'));
  cy.intercept('POST', '/login').as('loginRequest');
  cy.get("#login").should("be.visible").click();
  cy.wait('@loginRequest').then((interception) => {
    const accountId = interception.response.body.responseCommunityLogin.accounts[0].id;
    cy.log(accountId);
    cy.wrap(accountId).as('accountId');
  })
})

Cypress.Commands.add('Skip_MFA',()=>{
cy.get('body').then($body => {
  if ($body.find('.text-left > .skip-enable-mfa').length > 0) { 
    cy.get('.text-left > .skip-enable-mfa').should('be.visible').click(); 
  } else {
    cy.log('Element not found: .text-left > .skip-enable-mfa');
  }
})
})