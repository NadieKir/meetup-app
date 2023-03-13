describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');   
  });

  it('Authorizes user', () => {
    cy.get('input[name="username"]').type('chief').should('have.value', 'chief');
    cy.get('input[name="password"]').type('private').should('have.value', 'private');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/meetups/topics');
    cy.get('[class*=UserPreview_name]').contains('chief');
  });

  it('Shows error notification if credentials are wrong', () => {
    cy.get('input[name="username"]').type('wrongName');
    cy.get('input[name="password"]').type('private');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');
    cy.get('[class*=Notification]').should('be.visible');
  });

  it('Allows to login as a guest', () => {
    cy.get('button[type="button"]').click();

    cy.url().should('include', '/meetups/topics');
    cy.get('header').find('[class*=loginBtn]');
  });
})