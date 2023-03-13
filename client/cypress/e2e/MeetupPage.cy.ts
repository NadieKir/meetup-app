describe('Meetup Page as a chief', () => {
  beforeEach(() => {
    cy.visit('/meetups/topics', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('CHIEF_ID'));
      },
    });   
  });

  it('On moderation tab is accessible', () => {
    cy.get('a[href="/meetups/moderation"]').click();

    cy.url().should('include', '/meetups/moderation');
  });

  it('Creates a topic', () => {
    cy.get('[class*=MeetupTabContent] button').click();

    cy.get('input[name="subject"]').type('Lorem ipsum');
    cy.get('textarea[name="excerpt"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis pulvinar massa. Mauris commodo massa a quam bibendum, at laoreet metus luctus.');
    cy.get('button[type="submit"]').click();

    cy.get('[class*="MeetupCard"]').first().find('h2').should('have.text', 'Lorem ipsum');
  });
})

describe('Meetup Page as an employee', () => {
  beforeEach(() => {
    cy.visit('/meetups/topics', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', Cypress.env('EMPLOYEE_ID'));
      },
    });   
  });

  it('On moderation tab is not accessible', () => {
    cy.get('a[href="/meetups/moderation"]').should('not.exist');
    cy.visit('/meetups/moderation');

    cy.url().should('include', '/forbidden');
  });

  it('Creates a topic', () => {
    cy.get('[class*=MeetupTabContent] button').click();

    cy.get('input[name="subject"]').type('Lorem ipsum');
    cy.get('textarea[name="excerpt"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis pulvinar massa. Mauris commodo massa a quam bibendum, at laoreet metus luctus.');
    cy.get('button[type="submit"]').click();

    cy.get('[class*="MeetupCard"]').first().find('h2').should('have.text', 'Lorem ipsum');
  });
})

describe('Meetup Page as a guest', () => {
  beforeEach(() => {
    cy.visit('/meetups/topics', {
      onBeforeLoad(win) {
        win.localStorage.removeItem('user');
      },
    });   
  });

  it('On moderation tab is not accessible', () => {
    cy.get('a[href="/meetups/moderation"]').should('not.exist');
    cy.visit('/meetups/moderation');

    cy.url().should('include', '/forbidden');
  });

  it('Can\'t create a topic', () => {
    cy.get('[class*=MeetupTabContent] button').should('not.exist');
    cy.visit('/meetups/create');

    cy.url().should('include', '/forbidden');
  });
})