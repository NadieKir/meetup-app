describe('View topics as a chief', () => {
  before(() => {
    cy.visit(`/meetups/topics`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('CHIEF_ID'));

        cy.get('[class*=MeetupTabContent] button').click();
        cy.get('input[name="subject"]').type('Lorem ipsum');
        cy.get('textarea[name="excerpt"]').type('Lorem ipsum dolor sit amet.');
        cy.get('button[type="submit"]').click();
      },
    });   
  });

  beforeEach(() => {
    cy.visit(`/meetups/topics`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('CHIEF_ID'));
        win.localStorage.setItem('locale', 'en-US');
      },
    });   
  });

  it('Can support topic', () => {
    cy.get('[class*="MeetupCard"]').first().click();

    cy.contains('button', 'Support topic').click();
    cy.get('[class*=VotedUsersPreview] div').first().should('have.text', 'CB');
  });
  
  it('Can cancel vote', () => {
    cy.get('[class*="MeetupCard"]').first().click();

    cy.contains('button', 'Cancel vote').click();
    cy.get('[class*=VotedUsersPreview] div').should('not.exist');
  });  

  it('Can approve topic', () => {
    cy.get('[class*="MeetupCard"]').first().click();

    cy.contains('button', 'Approve topic').click();
    cy.get('[class*="MeetupCard"]').first().find('h2').should('have.text', 'Lorem ipsum');
  });

  it('Can delete topic', () => {
    cy.get('a[href="/meetups/moderation"]').click();
    cy.get('[class*="MeetupCard"]').first().click();

    cy.contains('button', 'Delete').click();
    cy.get('[class*="MeetupCard"]').first().find('h2').should('not.have.text', 'Lorem ipsum');
  });
})

describe('View topics as an employee', () => {
  before(() => {
    cy.visit(`/meetups/topics`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('EMPLOYEE_ID'));

        cy.get('[class*=MeetupTabContent] button').click();
        cy.get('input[name="subject"]').type('Lorem ipsum');
        cy.get('textarea[name="excerpt"]').type('Lorem ipsum dolor sit amet.');
        cy.get('button[type="submit"]').click();
      },
    });   
  });

  beforeEach(() => {
    cy.visit(`/meetups/topics`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('EMPLOYEE_ID'));
        win.localStorage.setItem('locale', 'en-US');
      },
    });   
  });

  it('Can support topic', () => {
    cy.get('[class*="MeetupCard"]').first().click();

    cy.contains('button', 'Support topic').click();
    cy.get('[class*=VotedUsersPreview] div').first().should('have.text', 'EG');
  });
  
  it('Can cancel vote', () => {
    cy.get('[class*="MeetupCard"]').first().click();

    cy.contains('button', 'Cancel vote').click();
    cy.get('[class*=VotedUsersPreview] div').should('not.exist');
  });  

  it('Can delete topic if current user is an author of the topic', () => {
    cy.get('[class*="MeetupCard"]').first().click();

    cy.contains('button', 'Delete').click();
    cy.get('[class*="MeetupCard"]').first().find('h2').should('not.have.text', 'Lorem ipsum');
  });
})

describe('View topics as a guest', () => {
  beforeEach(() => {
    cy.visit(`/meetups/topics`, {
      onBeforeLoad(win) {
        win.localStorage.removeItem('user');
        win.localStorage.setItem('locale', 'en-US');
      },
    });   
  });

  it('Can view only', () => {
    cy.get('[class*="MeetupCard"]').first().click();

    cy.get('button').should('have.length', 1).and('have.text', 'Back')
  });
})

