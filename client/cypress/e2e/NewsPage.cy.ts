describe('News Page as a chief', () => {
  beforeEach(() => {
    cy.visit('/news', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('CHIEF_ID'));
        win.localStorage.setItem('locale', 'en-US');
      },
    });   
  });

  it('Can create news', () => {
    cy.contains('button', '+ Create news').click();

    cy.get('input[name="title"]').type('Lorem ipsum');
    cy.get('textarea[name="content"]').type('Lorem ipsum dolor sit amet.');
    cy.get('button[type="submit"]').click();

    cy.get('[class*="NewsCard"]').first().find('h2').should('have.text', 'Lorem ipsum');
  });

  it('Can edit news', () => {
    cy.get('[class*="NewsCard"]').first().click();
    cy.contains('button', 'Edit').click();

    cy.get('input[name="title"]').type(' new');
    cy.get('button[type="submit"]').click();

    cy.get('h2').should('have.text', 'Lorem ipsum new');
  });

  it('Can delete news', () => {
    cy.get('[class*="NewsCard"]').first().click();
    cy.contains('button', 'Delete').click();

    cy.get('[class*="NewsCard"]').first().find('h2').should('not.have.text', 'Lorem ipsum new');
  });
})

describe('News Page as an employee', () => {
  beforeEach(() => {
    cy.visit('/news', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('EMPLOYEE_ID'));
        win.localStorage.setItem('locale', 'en-US');
      },
    });   
  });

  it('Can not create news', () => {
    cy.contains('button', '+ Create news').should('not.exist');

    cy.visit('/news/create');
    cy.url().should('include', '/forbidden');
  });

  it('Can view only', () => {
    cy.get('[class*="NewsCard"]').first().click();

    cy.get('section').find('button').should('have.length', 1).and('have.text', 'Back')
  });
})

describe('News Page as a guest', () => {
  beforeEach(() => {
    cy.visit('/news', {
      onBeforeLoad(win) {
        win.localStorage.removeItem('user');
        win.localStorage.setItem('locale', 'en-US');
      },
    });   
  });

  it('Can not create news', () => {
    cy.contains('button', '+ Create news').should('not.exist');

    cy.visit('/news/create');
    cy.url().should('include', '/forbidden');
  });

  it('Can view only', () => {
    cy.get('[class*="NewsCard"]').first().click();

    cy.get('section').find('button').should('have.length', 1).and('have.text', 'Back')
  });
})
